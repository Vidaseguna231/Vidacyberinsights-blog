
export type UserRole = 'student' | 'business' | 'parent' | 'educator' | 'all';

export type Language = 'en' | 'es' | 'fr' | 'sw' | 'hi';

export interface Article {
  id: string;
  title: string;
  audience: UserRole;
  tags: string[];
  summary: string;
  content: string; // Default/Original content
  contentBeginner?: string; // Pre-generated Beginner version
  contentAdvanced?: string; // Pre-generated Advanced/Business version
  readTime: string;
  imageUrl: string;
  imagePrompt?: string; // The prompt used/intended for generating the image
  altText: string; // Accessibility description
  imageCaption?: string; // Caption providing context for the image
  author: string;
  publishDate: string;
  seoDescription?: string;
  seoKeywords?: string[];
  series?: string; // Series name for grouping
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface SearchResult {
  articleId: string;
  relevanceScore: number;
  reason: string;
}

// Recommendation Engine Types

export interface UserProfile {
  id: string;
  role: UserRole;
  language: Language;
  savedTopics: string[];
  completedArticleIds: string[];
  // Simple map of topic -> score (0-100)
  quizScores?: Record<string, number>; 
}

export interface Recommendation {
  articleId: string;
  title: string;
  reason: string;
  nextStep: string;
  score: number;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  debug: {
    appliedRules: string[];
    filteredIds: string[];
    scores: Record<string, number>;
  }
}