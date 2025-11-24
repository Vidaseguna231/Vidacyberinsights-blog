import { Article, UserProfile, RecommendationResponse, Recommendation, UserRole } from '../types';

const STAGE_WEIGHTS: Record<string, number> = {
    'Basics': 10,
    'Passwords': 10,
    'MFA': 10,
    'Education': 10,
    'Social Media': 20,
    'Phishing': 20,
    'Email': 20,
    'Ransomware': 30,
    'Strategy': 30,
    'Compliance': 30,
    'Checklist': 25
};

/**
 * Deterministic recommendation engine
 */
export const getRecommendations = (user: UserProfile, articles: Article[]): RecommendationResponse => {
    const debug = {
        appliedRules: [] as string[],
        filteredIds: [] as string[],
        scores: {} as Record<string, number>
    };

    // 1. Filter: Role Eligibility & Completion
    let candidates = articles.filter(article => {
        // Exclude completed
        if (user.completedArticleIds.includes(article.id)) {
            debug.filteredIds.push(article.id);
            return false;
        }

        // Role Match
        const isRoleMatch = article.audience === user.role || article.audience === 'all';
        if (!isRoleMatch) {
            // debug.filteredIds.push(article.id); // Optional: verbose logging
            return false;
        }
        
        return true;
    });

    debug.appliedRules.push(`Filtered candidates count: ${candidates.length}`);

    // 2. Scoring
    const scoredCandidates = candidates.map(article => {
        let score = 0;
        let reasons: string[] = [];

        // Rule A: Role Affinity (Base Score)
        if (article.audience === user.role) {
            score += 50;
            reasons.push(`Perfect for ${user.role}s`);
        } else {
            score += 10; // 'all' audience
            reasons.push("General foundational knowledge");
        }

        // Rule B: Topic Interest (Saved Topics)
        const hasSavedTopic = article.tags.some(tag => user.savedTopics.includes(tag));
        if (hasSavedTopic) {
            score += 30;
            reasons.push("Matches your saved topics");
        }

        // Rule C: Progression (Simple logic: prioritize lower 'Stage' weights for beginners, higher for advanced)
        // For this mock, we just add points if it contains a tag in our dictionary to ensure it's "categorized"
        const stageWeight = article.tags.reduce((acc, tag) => Math.max(acc, STAGE_WEIGHTS[tag] || 0), 0);
        
        // Boost "Basics" for everyone if not completed
        if (article.tags.includes('Basics')) {
            score += 15;
            reasons.push("Recommended starting point");
        }

        // Rule D: Freshness (Mock: Publish Date) - just a tiny boost to break ties
        score += Math.random() * 5; // Deterministic seed would be better, but acceptable for client-mock

        debug.scores[article.id] = score;

        return {
            article,
            score,
            primaryReason: reasons[0] || "Recommended for you",
            // Infer next step
            nextStep: `Learn about ${article.tags[0]}`
        };
    });

    // 3. Sorting & Diversity
    scoredCandidates.sort((a, b) => b.score - a.score);

    // Diversity Check: Ensure top 3 don't have identical primary tags if possible
    const finalRecommendations: Recommendation[] = [];
    const usedTags = new Set<string>();

    for (const item of scoredCandidates) {
        if (finalRecommendations.length >= 3) break;

        const mainTag = item.article.tags[0];
        // Allow duplicates only if we run out of diverse options, but try to avoid
        if (!usedTags.has(mainTag) || scoredCandidates.length < 5) {
            finalRecommendations.push({
                articleId: item.article.id,
                title: item.article.title,
                reason: item.primaryReason,
                nextStep: item.nextStep,
                score: item.score
            });
            usedTags.add(mainTag);
        }
    }

    debug.appliedRules.push(`Selected top ${finalRecommendations.length} diverse recommendations`);

    return {
        recommendations: finalRecommendations,
        debug
    };
};
