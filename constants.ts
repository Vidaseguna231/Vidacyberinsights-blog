
import { Article } from './types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Mastering the Art of Password Hygiene',
    audience: 'student',
    tags: ['Passwords', 'MFA', 'Basics'],
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    imagePrompt: 'Password manager interface displaying multiple strong, unique passwords; clear lock icon overlay; clean UI; no brand names; neutral dark theme; high contrast; professional tone.',
    altText: 'Password manager interface displaying strong, unique passwords with security lock symbol.',
    author: 'Sarah Jenkins',
    publishDate: 'Oct 12, 2023',
    summary: 'Stop using "password123". Learn how to create unbreakable passwords and why MFA is your best friend.',
    seoDescription: 'A student guide to password hygiene: Learn how to create strong passphrases, use password managers, and enable MFA to secure your digital life.',
    seoKeywords: ['password security', 'password manager', 'student cybersecurity', 'MFA', 'digital safety'],
    content: `
## Why Your Password Matters

Imagine your digital life is a house. Inside, you keep your private messages, your school grades, your photos, and maybe even your bank details. Your password is the key to the front door. If you leave the key under the mat (or use "123456"), anyone can walk in.

In 2023 alone, billions of credentials were stolen in data breaches. The scary part? Most people didn't even know their keys had been copied until it was too late. But here is the good news: securing your digital house is actually pretty simple if you follow a few golden rules.

### The Problem with "Password123"

We get it. Remembering passwords is hard. That's why "123456", "password", and "qwerty" appear on the list of most common passwords every single year. But hackers know this too. They use automated programs that can guess these simple passwords in less than a second.

Even slightly more complex passwords like "Sarah2004!" are vulnerable to what's called a **Dictionary Attack**, where hackers use lists of common words and dates to crack your code.

### The Solution: Passphrases

Instead of a short, complex password that is hard to remember (like \`Tr0ub4dor&3\`), use a **Passphrase**. A passphrase is a string of random words that creates a story in your head but is nonsense to a computer.

**Example:**
*   **Weak:** \`P@ssword!\` (Cracked instantly)
*   **Better:** \`Blue-Elephant-Dancing-Sunset\` (Takes centuries to crack)

**Why it works:** Length is mathematically more important than complexity. Each extra character adds exponentially to the difficulty of cracking the password.

### The Golden Rules of Hygiene

1.  **Length beats complexity**: Aim for at least 16 characters.
2.  **Unique every time**: Never, ever reuse passwords across sites. If one site (like a gaming forum) gets hacked, hackers will try that same email and password on your email, your bank, and your social media.
3.  **Use a Manager**: You can't remember 50 unique passphrases. Tools like **Bitwarden**, **1Password**, or Google's built-in Password Manager save your life. You only need to remember *one* strong master password, and the manager handles the rest.

### Multi-Factor Authentication (MFA)

MFA is like adding a deadbolt to your door. Even if someone steals your key (your password), they can't open the door without your fingerprint or a code from your phone. 

**Action Item:** Go to your email and social media settings right now and turn on "Two-Factor Authentication". It is the single most effective step you can take to secure your account.

### Key Takeaways
*   Stop using short, guessable passwords.
*   Switch to long passphrases (4+ random words).
*   Use a Password Manager to generate and store unique keys for every site.
*   Enable MFA everywhere.

### Recommended Next Reads
*   **What is Multi-Factor Authentication (MFA)?** - A deep dive into your second layer of defense.
*   **Phishing 101** - Learn how hackers try to steal those passwords you just strengthened.
    `,
    contentBeginner: `
## Your Digital Key

Think of a password like a key to your house. You wouldn't give your house key to a stranger, right? Or leave it under the doormat where anyone could find it? That is what happens when you use easy passwords like "123456".

### How to Make a Super Password
Don't use a single word. Use a sentence!
*   **Bad:** \`Pizza1\`
*   **Good:** \`I-love-eating-pizza-on-Fridays\`

The second one is much harder for bad guys to guess, but easy for you to remember.

### One Key Per Door
Don't use the same password for Instagram, TikTok, and your Email. If a thief gets the key to your Instagram, you don't want them opening your Email too!

### Use a "Vault"
There are free apps called **Password Managers**. They are like a safe. You put all your passwords inside, and you only need to remember the code to the safe. It makes life so much easier!

### What is MFA?
Multi-Factor Authentication (MFA) is like a second lock. After you type your password, your phone gets a special code. It stops hackers even if they know your password!
    `,
    contentAdvanced: `
## Enterprise Authentication Standards

Password hygiene is the first line of defense in Identity and Access Management (IAM). Weak credentials remain a primary vector for initial access in breaches, often leading to privilege escalation.

### Policy Recommendations for CISOs
1.  **NIST SP 800-63B Guidelines**: Shift away from arbitrary complexity rules (e.g., requiring 1 uppercase, 1 symbol) which lead to predictable patterns (e.g., \`Spring2024!\`). Instead, enforce length (>12 characters) and screen against compromised password lists.
2.  **Credential Stuffing Mitigation**: Enforce unique credentials. Implement tools that check against known breached password databases (e.g., Have I Been Pwned API integration) during the sign-up or password change process.
3.  **Enterprise Password Managers (EPM)**: Mandate the use of SOC2 compliant EPMs for all employees. This reduces the risk of "shadow IT" where employees store credentials in spreadsheets or sticky notes.

### The Future: Passwordless
Move towards FIDO2/WebAuthn standards.
*   **Passkeys**: Replace shared secrets (passwords) with public-key cryptography.
*   **Hardware Keys**: YubiKeys offer phishing-resistant authentication that SMS OTP cannot match.

### MFA Implementation Strategy
Enforce MFA for all remote access and administrative accounts. Prefer Push Notifications or Hardware Tokens over SMS, which is susceptible to SIM swapping and SS7 interception.
    `
  },
  {
    id: '2',
    title: 'Ransomware & Resilience: A Business Guide',
    audience: 'business',
    tags: ['Ransomware', 'Cloud Security', 'Compliance'],
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    imagePrompt: 'Executive dashboard showing ransomware incident response workflow and backup recovery plan.',
    altText: 'Business dashboard illustrating ransomware response and resilience planning.',
    author: 'Dr. Aris Thorne',
    publishDate: 'Nov 05, 2023',
    summary: 'An executive overview of modern ransomware threats and how cloud security posture management (CSPM) reduces risk.',
    seoDescription: 'A guide for business leaders on preventing ransomware attacks, implementing Zero Trust, and ensuring data resilience through robust backups.',
    seoKeywords: ['ransomware', 'business continuity', 'cyber resilience', 'backup strategy', 'zero trust'],
    content: `
## The Modern Threat Landscape

Ransomware is no longer just about encryption; it's about data exfiltration and extortion. In the past, hackers would simply lock your files and demand $500 to unlock them. Today, groups like LockBit and BlackCat operate like multinational corporations. They steal your sensitive customer data first, *then* encrypt your systems. Even if you have backups, they threaten to leak your data publicly unless you pay.

For businesses, the cost isn't just the ransom—it's the downtime, the legal fees, the reputational damage, and the loss of customer trust.

### The Core Pillars of Resilience

You cannot prevent 100% of attacks, but you can ensure your business survives them. This concept is called **Cyber Resilience**.

#### 1. Zero Trust Architecture
The traditional "castle and moat" security model is dead. Once a hacker gets past your firewall (often via a phishing email), they shouldn't have free reign.
*   **Verify explicitly**: Always authenticate and authorize based on all available data points.
*   **Use least privileged access**: Limit user access with Just-In-Time and Just-Enough-Access (JIT/JEA). Marketing doesn't need access to Engineering's code, and Engineering doesn't need access to HR's payroll.
*   **Assume breach**: Design your network with the assumption that an intruder is already inside. Minimize blast radius with micro-segmentation.

#### 2. The 3-2-1 Backup Rule
Backups are your insurance policy. But a backup connected to your network will get encrypted just like your live data.
*   **3** copies of your data (1 primary, 2 backups).
*   **2** different types of media (e.g., Cloud + Local NAS).
*   **1** copy stored **off-site and offline** (Immutable).

**Immutable backups** are critical. These are backups that cannot be modified or deleted for a set period, even by an admin. If ransomware hits, you wipe the systems and restore from the clean, immutable copy.

#### 3. Incident Response (IR) Plan
When the screen goes red, panic is your enemy. You need a plan *before* the crisis.
*   **Who do you call?** (Legal, Insurance, Forensics).
*   **How do you communicate?** (If email is down, do you have a WhatsApp group?).
*   **To pay or not to pay?** This is a business decision that should be discussed with legal counsel and insurers beforehand.

### Cloud Security Posture Management (CSPM)
Misconfiguration is the #1 cause of cloud breaches. Leaving an AWS S3 bucket open to the public is like leaving your warehouse doors wide open. Automated CSPM tools scan your environment 24/7 to detect risks like:
*   Unencrypted storage.
*   Lack of MFA on root accounts.
*   Over-permissive IAM roles.

### Recommended Next Reads
*   **Small Business Cyber Defense Checklist** - Actionable steps to implement these strategies on a budget.
*   **Phishing 101** - Train your employees to spot the entry point of most ransomware attacks.
    `,
    contentBeginner: `
## What is Ransomware?

Imagine a bad guy sneaks into your office, puts an unbreakable lock on all your filing cabinets, and swallows the key. Then, they tell you: "Pay me $10,000 and I'll give you a copy of the key." That is Ransomware.

### How to Stay Safe
*   **Don't Click**: Most ransomware starts with a fake email. If you don't know the sender, don't open the attachment!
*   **Double Check**: Don't trust every person who tries to log in. Make sure they are who they say they are.
*   **Limit Access**: Only give employees access to the files they actually need to do their job.

### The Magic of Backups
The best defense is a "Backup". This means keeping a copy of all your work somewhere else—like on a hard drive that you unplug and hide in a drawer.
If the bad guys lock your computer, you don't have to pay them. You just wipe the computer clean and plug in your hard drive to get your files back!

### Cloud Safety
Using the "Cloud" just means saving files on the internet. Sometimes people forget to put a password on these files. We need to use tools that check for these mistakes automatically.
    `,
    contentAdvanced: `
## Executive Strategy: Ransomware Resilience

Ransomware actors are evolving from simple encryption to double-extortion schemes where data is exfiltrated before encryption.

### Strategic Response
1.  **Air-Gapped Backups**: Ensure critical data backups are immutable and offline. Use "Write Once, Read Many" (WORM) storage technology.
2.  **Tabletop Exercises**: Regularly conduct incident response drills involving IT, Legal, and PR. Simulate a full encryption event. How long does it take to restore? What is your RTO (Recovery Time Objective)?
3.  **Cyber Insurance**: Verify coverage limits for ransom payments, business interruption, and legal liability.

### Architecture: Zero Trust
Implement micro-segmentation to prevent lateral movement. If one server is infected, the damage should not spread to the entire network. Use MFA for every internal access request, not just the perimeter.
    `
  },
  {
    id: '3',
    title: 'Keeping Kids Safe: A Parent’s Guide to Social Media',
    audience: 'parent',
    tags: ['Cyberbullying', 'Parental Controls', 'Social Media'],
    readTime: '7 min',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80',
    imagePrompt: 'Parent guiding a child on a laptop with social media privacy settings visible on screen.',
    altText: 'Parent helping child adjust social media privacy settings on a laptop.',
    author: 'Maria Gonzales',
    publishDate: 'Sept 28, 2023',
    summary: 'Practical tips for managing screen time, spotting cyberbullying, and configuring privacy settings for your children.',
    seoDescription: 'A comprehensive guide for parents on digital safety, covering social media privacy settings, cyberbullying detection, and creating family tech agreements.',
    seoKeywords: ['parental controls', 'internet safety for kids', 'cyberbullying', 'social media privacy', 'digital parenting'],
    content: `
## The Digital Playground

The internet is an amazing library, a cinema, and a playground all rolled into one. But just like a physical playground, it has risks. Strangers, bullies, and inappropriate content are present, but locking your child indoors forever isn't the solution.

The goal of digital parenting isn't **surveillance**; it's **guidance**. We want to raise children who can make smart decisions online even when we aren't looking over their shoulders.

### 1. Open Communication: The First Line of Defense
Before you install any blocking software, talk to your kids.
*   **Start Early**: Ask them about their favorite games. Who are they playing with? What makes it fun?
*   **Be Curious, Not Critical**: If they see you as a partner rather than a warden, they are more likely to come to you if they see something scary.
*   **Create a Family Tech Agreement**: Sit down together and agree on rules. "No phones at the dinner table" should apply to parents too!

### 2. Locking Down the Settings
Social media apps are public by default. Let's change that. Sit down with your child and go through these settings together:

**Instagram & TikTok:**
*   **Private Account**: Ensure only approved followers can see their posts.
*   **Direct Messages**: Set to "Friends Only" or "No one" to prevent strangers from sliding into their DMs.
*   **Comments**: Enable filters to hide offensive words and bullying comments automatically.

**Snapchat:**
*   **Ghost Mode**: Turn this ON. Otherwise, the "Snap Map" broadcasts your child's exact physical location to their entire friends list.

### 3. Spotting Cyberbullying
Cyberbullying is persistent—it follows kids home in their pockets. Look for these signs:
*   Sudden reluctance to use devices or go to school.
*   Visible distress after checking a notification.
*   Withdrawing from family and friends.

**What to do:**
*   **Don't React**: Tell your child not to respond to the bully.
*   **Record**: Take screenshots of the messages.
*   **Report**: Use the app's reporting tools to flag the user.
*   **Block**: Block the bully immediately.

### 4. Parental Control Tools
Tools like **Google Family Link** or **Apple Screen Time** allow you to:
*   Set daily time limits for specific apps.
*   Approve or block new app downloads.
*   Filter adult content in browsers.

Use these tools as training wheels, with the goal of eventually taking them off as your child matures.

### Recommended Next Reads
*   **Teaching Digital Citizenship in Schools** - See what your kids are learning in the classroom about this topic.
*   **Mastering Password Hygiene** - Teach your teens how to lock their accounts so friends can't "hack" them as a prank.
    `,
    contentBeginner: `
## Keeping Kids Safe Online

The internet is fun, but it has strangers. Here is how to keep your kids safe without being the "bad guy."

### Talk to Them
*   **Ask Questions**: Ask "What games did you play today?" just like you ask about school.
*   **Set Rules**: Decide together when to put the iPads away, like during dinner. Stick to the rules yourself!

### Fix the Settings
Most apps show your child's info to everyone. Let's fix that:
1.  **Instagram**: Go to settings and turn on **Private Account**. Now strangers can't see their photos.
2.  **TikTok**: Turn on **Family Pairing**. It links your phone to theirs so you can help them stay safe.
3.  **Location**: Turn off location tracking. People on the internet don't need to know where your house is.

### Bullying
If your child seems sad after using their phone, someone might be being mean to them. Tell them: "If someone says something mean, come tell me. You won't get in trouble."
    `,
    contentAdvanced: `
## Digital Rights Management for Minors

Navigating the legal and technical landscape of child safety online requires a multi-layered approach involving technical controls and behavioral monitoring.

### Technical Controls & COPPA
Ensure platforms comply with **COPPA** (Children's Online Privacy Protection Act).
*   **Network Level**: Implement DNS filtering (e.g., OpenDNS Family Shield/NextDNS) to block malicious domains and adult content at the router level.
*   **Device Management**: Utilize MDM (Mobile Device Management) profiles like Apple Screen Time or Google Family Link for granular app permissions.

### Privacy Engineering
Audit application permissions. Many "free" games exfiltrate metadata. Restrict:
1.  **Geolocation**: Set to "Approximate" or "Never". Apps often sell location data to brokers.
2.  **Microphone/Camera**: Revoke background access privileges.
3.  **Cross-app tracking**: On iOS, ensure "Ask App Not to Track" is enabled to prevent ad-id profiling (IDFA).

### Mental Health Vectors
Monitor for algorithmic radicalization and body image issues. Social media algorithms prioritize engagement, often amplifying polarizing or depressive content. Regular audits of the "For You" feed are recommended.
    `
  },
  {
    id: '4',
    title: 'Teaching Digital Citizenship in Schools',
    audience: 'educator',
    tags: ['Education', 'Digital Citizenship', 'Resources'],
    readTime: '6 min',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    imagePrompt: 'Teacher leading a classroom discussion on digital safety with posters about online privacy.',
    altText: 'Teacher guiding students in a classroom digital citizenship lesson with safety posters.',
    author: 'James Wilson',
    publishDate: 'Jan 15, 2024',
    summary: 'Lesson plans and interactive activities to engage students in conversations about their digital footprint and safety.',
    seoDescription: 'A toolkit for educators to teach digital citizenship, covering age-appropriate lesson plans from K-12 on privacy, cyberbullying, and ethical hacking.',
    seoKeywords: ['digital citizenship', 'cyber safety curriculum', 'k-12 cybersecurity', 'teaching tech safety', 'classroom resources'],
    content: `
## Integrating Safety into Curriculum

Cybersecurity isn't just a computer science topic; it's a life skill. In a world where 8-year-olds have smartphones, schools have a responsibility to teach students how to be good citizens of the digital world.

Digital Citizenship goes beyond "safety". It is about respect, privacy, critical thinking, and understanding the permanence of our online actions.

### Age-Appropriate Discussions

#### K-5: The Basics (Stranger Danger)
*   **Concept**: The internet is a real place with real people.
*   **Key Lesson**: "Passwords are like underpants." (Keep them private, change them often, don't share them with friends).
*   **Activity**: Draw a picture of a "Digital Footprint". Explain that everything they click leaves a mark.

#### 6-8: Middle School (Identity & Bullying)
*   **Concept**: Online actions have offline consequences.
*   **Key Lesson**: Cyberbullying and the "Grandma Rule" (Don't post anything you wouldn't want your grandma to see).
*   **Activity**: **The Fake News Detective**. Show students a viral social media post and have them fact-check it using lateral reading techniques.

#### 9-12: High School (Ethics & Future)
*   **Concept**: Data privacy, reputation management, and careers.
*   **Key Lesson**: How social media posts affect college admissions and job applications. Introduction to ethical hacking and the Computer Fraud and Abuse Act.
*   **Activity**: Debate: "Should encryption be breakable by the government?" This fosters critical thinking about privacy vs. security.

### Interactive Activity: "Spot the Phish"
Gamification makes retention higher. Create a "Spot the Phish" challenge:
1.  Print out 5 emails (3 real, 2 phishing).
2.  Have students circle the "Red Flags":
    *   Urgent language ("Act now!").
    *   Mismatched URLs (paypal-support.com vs paypal.com).
    *   Generic greetings ("Dear Customer").
3.  The first team to identify all fakes wins.

### Recommended Next Reads
*   **Keeping Kids Safe on Social Media** - Share this resource with parents during PTA meetings.
*   **Phishing 101** - A great pre-reading assignment for your high school students.
    `,
    contentBeginner: `
## Safety in the Classroom

Teachers play a huge role in keeping kids safe online. You don't need to be a tech expert to teach this!

### Simple Lessons for Young Kids
*   **Secrets**: Teach them that passwords are like secrets. You don't tell anyone except your parents.
*   **Being Nice**: Explain that being mean online is the same as being mean on the playground. Words hurt, even on a screen.

### Fun Activity: The Fake Email Game
Print out a real email and a fake "scam" email. Ask students to play detective and circle the mistakes in the fake one (like spelling errors or weird links). It makes learning fun!

### Resources
There are great free videos from "Common Sense Media" that you can show in class to start the conversation.
    `,
    contentAdvanced: `
## Pedagogy for Digital Citizenship

Integrating cybersecurity into K-12 education requires alignment with standards such as **ISTE** (International Society for Technology in Education).

### Curriculum Framework
1.  **Digital Footprint Analysis**: Students research their own online presence (OSINT light) to understand data permanence and the aggregation of metadata.
2.  **Ethical Implications**: Debates on privacy vs. security, the ethics of white-hat hacking, and the legal ramifications of DDoS or unauthorized access.
3.  **Technical Literacy**: Understanding HTTP vs HTTPS, recognizing valid SSL certificates, and basic encryption concepts (Symmetric vs Asymmetric).

### Resource Allocation
Utilize free resources from **CISA's NICCS** (National Initiative for Cybersecurity Careers and Studies) and **GenCyber** to build robust lesson plans that meet state technology standards. Consider hosting a "Capture The Flag" (CTF) event for high schoolers to identify talent for future cyber careers.
    `
  },
  {
    id: '7',
    title: 'What is Multi-Factor Authentication (MFA)?',
    audience: 'all',
    tags: ['MFA', 'Basics', 'Security Tools'],
    readTime: '5 min',
    imageUrl: 'https://images.unsplash.com/photo-1618060932014-4deda4932554?auto=format&fit=crop&w=1200&q=80',
    imagePrompt: 'Login screen showing MFA with password entry and phone verification code side by side.',
    altText: 'Login interface demonstrating multi-factor authentication with password and phone verification.',
    author: 'Vidacyberinsights Team',
    publishDate: 'Mar 10, 2024',
    summary: 'Passwords aren\'t enough anymore. Learn how MFA adds a second lock to your digital door and why you need it enabled everywhere.',
    seoDescription: 'A complete guide to Multi-Factor Authentication (MFA/2FA). Learn what it is, the different types of authentication factors, and how to set it up.',
    seoKeywords: ['MFA', '2FA', 'two-factor authentication', 'account security', 'login protection'],
    content: `
## The Second Lock on Your Door

Passwords are getting weaker. Not because we are bad at making them (though "password123" doesn't help), but because hackers are getting better at stealing them. Data breaches happen every day. If a hacker gets your password, is your account gone?

Not if you have **MFA**.

### What is MFA?
Multi-Factor Authentication (MFA), sometimes called 2FA, adds a second step to your login process. It requires you to prove your identity in two different ways:
1.  **Something you know**: Your Password.
2.  **Something you have**: Your phone, a USB key, or your fingerprint.

Even if a hacker in another country steals your password, they can't log in because they don't have your phone in their hand.

### Types of MFA (From Good to Best)

#### 1. SMS Text Messages (Good)
You type your password, and the site texts you a 6-digit code.
*   **Pros**: Easy to use, works on every phone.
*   **Cons**: Can be intercepted by "SIM Swapping" attacks.
*   **Verdict**: Better than nothing, but upgrade if you can.

#### 2. Authenticator Apps (Better)
Apps like **Google Authenticator**, **Microsoft Authenticator**, or **Authy** generate a new code every 30 seconds, even if you are offline.
*   **Pros**: More secure than SMS, works offline.
*   **Cons**: If you lose your phone, you need backup codes to get back in.

#### 3. Hardware Keys (Best)
A physical USB key (like a YubiKey) that you plug into your computer or tap on your phone.
*   **Pros**: Phishing-resistant. A hacker cannot trick you into typing a code into a fake site because there is no code to type!
*   **Cons**: Costs money to buy the key.

### How to Enable It
Go to the "Security" or "Privacy" settings of your important accounts (Email, Banking, Social Media). Look for "Two-Step Verification" or "Two-Factor Authentication" and turn it on. Follow the prompts to scan the QR code with your Authenticator app.

### Recommended Next Reads
*   **Mastering the Art of Password Hygiene** - Make your first factor (password) as strong as your second.
*   **Small Business Cyber Defense Checklist** - Ensure your company requires MFA for all employees.
    `,
    contentBeginner: `
## Double Checking It's You

Imagine you have a secret clubhouse. To get in, you need two things:
1.  The secret password.
2.  The secret key.

If someone hears the password but doesn't have the key, they can't get in. That is what **MFA** is for your computer accounts.

### How it Works
When you log in to your email or game:
1.  You type your password (The secret word).
2.  The app sends a special code to your phone (The secret key).
3.  You type the code, and you are in!

### Why Do I Need It?
Bad guys are good at guessing passwords. But they can't steal your actual phone! MFA stops them from stealing your account even if they guess your password.

### Action Step
Ask your parents to help you turn on "Two-Factor Authentication" for your favorite games like Fortnite or Roblox. It keeps your skins and points safe!
    `,
    contentAdvanced: `
## The Mechanics of Strong Authentication

Single-factor authentication (SFA) is obsolete. Modern security standards (NIST 800-63B) mandate the use of MFA to verify identity assurance levels (IAL).

### Authentication Factors
1.  **Knowledge**: Something you know (Password, PIN).
2.  **Possession**: Something you have (Smartphone, Hardware Token, Smart Card).
3.  **Inherence**: Something you are (Biometrics: Fingerprint, FaceID, Retina).
4.  **Context**: Where you are/What you are doing (IP Reputation, Geolocation, Device Fingerprint).

### Vulnerabilities in MFA
Not all MFA is created equal.
*   **MFA Fatigue/Push Bombing**: Attackers spam push notifications hoping the user accidentally accepts one (e.g., Lapsus$ attacks).
*   **AiTM (Adversary-in-the-Middle)**: Phishing sites that proxy the MFA session token in real-time.

### Mitigation: FIDO2 & WebAuthn
To combat sophisticated attacks, organizations should move towards FIDO2 standards.
*   **Passkeys**: Public/Private key pairs sync across devices.
*   **Hardware Security Keys**: The private key never leaves the device. The origin is cryptographically bound, making it immune to phishing sites that use slightly different domains.
    `
  },
  {
    id: '5',
    title: 'Phishing 101: Don\'t Take the Bait',
    audience: 'student',
    tags: ['Phishing', 'Email', 'Scams'],
    readTime: '3 min',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    imagePrompt: 'A hacker silhouette in a hoodie working on a laptop with binary code background.',
    altText: 'Silhouette of a person in a hoodie typing on a laptop with digital code overlays.',
    author: 'Tech Team',
    publishDate: 'Feb 02, 2024',
    summary: 'Learn how to spot fake emails and texts that try to steal your login info. If it looks too good to be true, it probably is.',
    content: `
## Something Smells Fishy

Phishing is when scammers pretend to be someone you trust (like your bank or Netflix) to get your password.

### Red Flags
* **Typos**: "Netfllix" instead of "Netflix".
* **Urgency**: "Your account will be deleted in 1 hour!"
* **Suspicious Links**: Hover over links before clicking.

### What to do?
Report it as spam and delete it. Never click links in unexpected emails.
    `,
    contentBeginner: `
## Don't Get Tricked!

"Phishing" is a trick where bad guys send fake emails. They want you to click a link so they can steal your password.

### How to Spot a Fake
1. **Spelling Mistakes**: Bad guys often spell words wrong.
2. **Scary Warnings**: They might say "Your account is banned!" to scare you. Don't panic.
3. **Weird Links**: If you don't know who sent it, don't click it.

### Stay Safe
If you get a weird email, tell a parent or teacher. Delete the email and forget about it!
    `,
    contentAdvanced: `
## Advanced Phishing Vectors

Phishing remains the primary entry point for APTs (Advanced Persistent Threats). Modern attacks go beyond generic spam.

### Spear Phishing & Whaling
Targeted attacks against specific individuals or C-suite executives using OSINT (Open Source Intelligence) to craft convincing narratives.

### Technical Indicators (IOCs)
* **Homoglyphs**: Using look-alike characters in domains (e.g., using Cyrillic 'a' in amazon.com).
* **Punytags**: Obfuscated URLs.
* **DKIM/SPF Failures**: Emails originating from unauthorized IP ranges.

### Mitigation Strategies
Implement FIDO2 hardware keys to neutralize credential harvesting attacks. Even if a user is fooled by the site, the hardware token cannot be Phished.
    `
  },
  {
    id: '6',
    title: 'Small Business Cyber Defense Checklist',
    audience: 'business',
    tags: ['Basics', 'Checklist', 'Strategy'],
    readTime: '8 min',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    imagePrompt: 'A diverse group of business colleagues discussing a document in a bright office.',
    altText: 'Business professionals having a meeting in a conference room.',
    author: 'Dr. Aris Thorne',
    publishDate: 'Feb 10, 2024',
    summary: 'A step-by-step checklist to secure your small business assets without breaking the bank.',
    content: `
## Security on a Budget

You don't need a million-dollar budget to be secure.

### The Checklist
1. **Enable MFA** on all business email accounts.
2. **Patch Management**: Turn on auto-updates for all OS and software.
3. **Backups**: Implement the 3-2-1 backup rule (3 copies, 2 media types, 1 offsite).
4. **Employee Training**: Train staff to recognize CEO fraud and invoice scams.
    `,
    contentBeginner: `
## Protecting Your Business

Keeping your business safe doesn't have to be hard or expensive. Follow these simple steps.

### Simple Steps
1. **Two Locks are Better than One**: Turn on "Multi-Factor Authentication" (MFA) for email. It sends a code to your phone when you log in.
2. **Update Everything**: When your computer says "Update Available", do it immediately. These updates fix security holes.
3. **Save Copies**: Keep copies of your important files on a hard drive AND in the cloud.
4. **Teach Your Team**: Tell your employees never to buy gift cards if "the boss" emails them asking for it.
    `,
    contentAdvanced: `
## SMB Cybersecurity Framework

Implementing a security posture based on the NIST CSF (Cybersecurity Framework) Identify, Protect, Detect, Respond, Recover.

### Implementation Strategy
1. **Asset Management**: Maintain an automated inventory of all hardware and software assets. You cannot protect what you don't know you have.
2. **Vulnerability Management**: Schedule weekly automated scans and prioritize patching based on CVSS scores.
3. **Disaster Recovery (DR)**: Test your backups quarterly. A backup is not a backup unless a restore has been verified.
4. **Endpoint Detection and Response (EDR)**: Deploy lightweight EDR agents instead of legacy antivirus for behavior-based threat detection.
    `
  }
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'hi', name: 'हिन्दी' },
];
