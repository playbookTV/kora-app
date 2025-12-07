# KORA — User Stories & Feature Specification

> **Version:** 1.0  
> **Last Updated:** December 2024  
> **Status:** Locked for MVP

---

## Table of Contents

1. [Product Summary](#product-summary)
2. [User Personas](#user-personas)
3. [Feature Tiers](#feature-tiers)
4. [User Stories: Hackathon](#user-stories-hackathon)
5. [User Stories: Full MVP](#user-stories-full-mvp)
6. [User Stories: Post-MVP](#user-stories-post-mvp)
7. [Feature Lock Summary](#feature-lock-summary)
8. [Out of Scope](#out-of-scope)

---

## Product Summary

### The One Job

**Create a pause between impulse and spending — every time.**

### Core Value Proposition

A voice-powered AI accountability partner that intervenes before you spend, not after.

### Pricing Anchor

> "Kora costs less than one impulse mistake."

---

## User Personas

### Primary: The Spendthrift (80% of users)

**Name:** Tolu, 28, Lagos  
**Income:** ₦400k/month  
**Behavior:** Earns decent money but has ₦12k in savings after 4 years of working  
**Pain:** Knows they overspend but can't stop in the moment  
**Quote:** "I check my balance, see I have money, and spend it. Then I'm broke by the 15th."

### Secondary: The Anxious Saver (20% of users)

**Name:** Sarah, 31, London  
**Income:** £3,200/month  
**Behavior:** Saves but with constant stress and guilt  
**Pain:** Doesn't know what's "safe" to spend without jeopardizing goals  
**Quote:** "I want to buy things but I'm always scared I shouldn't."

---

## Feature Tiers

### Tier 1: Hackathon (Ship by Jan 2nd)

Core demo flow only. Proves the concept works.

### Tier 2: Full MVP (Weeks 1-6 post-hackathon)

Complete product ready for paying users.

### Tier 3: Post-MVP (V2+)

Retention, growth, and expansion features.

---

## User Stories: Hackathon

### Epic: Onboarding

---

#### US-H01: First Launch

**As a** new user  
**I want to** understand what Kora does in under 10 seconds  
**So that** I can decide whether to continue

**Acceptance Criteria:**
- [ ] Welcome screen loads in <2 seconds
- [ ] Single headline explains value proposition
- [ ] One CTA button: "Get Started"
- [ ] No signup required to start onboarding

**Priority:** P0  
**Estimate:** 2 hours

---

#### US-H02: Voice Onboarding — Income

**As a** new user  
**I want to** tell Kora my income using my voice  
**So that** I don't have to type or navigate forms

**Acceptance Criteria:**
- [ ] Kora asks: "How much money comes in each month?"
- [ ] User can tap to speak
- [ ] Voice is transcribed and amount extracted
- [ ] Kora confirms: "Got it—₦X monthly"
- [ ] Kora asks follow-up: "Is that one paycheck or multiple?"
- [ ] Kora asks: "When does it hit? Give me the date."

**Priority:** P0  
**Estimate:** 4 hours

---

#### US-H03: Voice Onboarding — Fixed Expenses

**As a** new user  
**I want to** tell Kora my fixed expenses conversationally  
**So that** Kora understands my non-negotiable costs

**Acceptance Criteria:**
- [ ] Kora asks: "What are your fixed monthly expenses? Rent, utilities, subscriptions..."
- [ ] User speaks freely (e.g., "Rent is 150k, internet 15k, Netflix 8k")
- [ ] Kora parses multiple expenses from single utterance
- [ ] Kora confirms total: "So roughly ₦X locked every month"
- [ ] Kora asks: "Anything else? Transport, debt payments?"

**Priority:** P0  
**Estimate:** 4 hours

---

#### US-H04: Voice Onboarding — Current State

**As a** new user  
**I want to** tell Kora my current balance and days to payday  
**So that** Kora can calculate my immediate situation

**Acceptance Criteria:**
- [ ] Kora asks: "What's in your account right now?"
- [ ] User speaks amount
- [ ] Kora asks: "When's your next payday?"
- [ ] Kora calculates days remaining
- [ ] Kora asks about upcoming bills before payday

**Priority:** P0  
**Estimate:** 3 hours

---

#### US-H05: First Analysis

**As a** new user who completed onboarding  
**I want to** see my safe spend calculation immediately  
**So that** I understand the value Kora provides

**Acceptance Criteria:**
- [ ] Kora calculates: (Balance - Upcoming bills) / Days to payday
- [ ] Kora speaks the analysis naturally
- [ ] Kora provides context: "Not a crisis, but not loose either"
- [ ] Kora asks how it feels (emotional check)

**Priority:** P0  
**Estimate:** 3 hours

---

#### US-H06: Savings Goal Capture

**As a** new user  
**I want to** tell Kora my savings goal  
**So that** Kora can factor this into recommendations

**Acceptance Criteria:**
- [ ] Kora asks: "Do you want to save money, or just survive to payday?"
- [ ] If save: "How much would you want to save each month?"
- [ ] Kora acknowledges goal and sets expectation
- [ ] Savings goal stored in user profile

**Priority:** P1  
**Estimate:** 2 hours

---

### Epic: Core Interaction — Spend Decision

---

#### US-H07: "Should I Buy This?" — Voice Input

**As a** user about to make a purchase  
**I want to** ask Kora if I should buy something  
**So that** I get real-time context before deciding

**Acceptance Criteria:**
- [ ] User taps mic and speaks (e.g., "Should I buy this ₦25k jacket?")
- [ ] Voice transcribed accurately
- [ ] Amount and item extracted from speech
- [ ] Works with various phrasings ("Can I afford...", "I want to get...", "Thinking about buying...")

**Priority:** P0  
**Estimate:** 4 hours

---

#### US-H08: "Should I Buy This?" — AI Analysis

**As a** user who asked about a purchase  
**I want to** receive contextual analysis  
**So that** I can make an informed decision

**Acceptance Criteria:**
- [ ] Kora calculates impact on safe spend
- [ ] Kora references days to payday
- [ ] Kora mentions savings goal impact (if set)
- [ ] Kora provides clear recommendation (buy/wait/alternative)
- [ ] Kora asks for user's decision

**Priority:** P0  
**Estimate:** 4 hours

---

#### US-H09: "Should I Buy This?" — Voice Response

**As a** user who asked about a purchase  
**I want to** hear Kora's response spoken aloud  
**So that** the interaction feels natural and conversational

**Acceptance Criteria:**
- [ ] Response converted to speech
- [ ] Voice sounds natural, not robotic
- [ ] Response is concise (under 20 seconds)
- [ ] User can interrupt or replay

**Priority:** P0  
**Estimate:** 3 hours

---

#### US-H10: Decision Logging

**As a** user who received a recommendation  
**I want to** tell Kora my decision  
**So that** the interaction is complete

**Acceptance Criteria:**
- [ ] User can say "I'll buy it" or "I'll wait"
- [ ] Alternatively, tap button for quick response
- [ ] Kora acknowledges decision appropriately
- [ ] Decision logged for pattern analysis (future)

**Priority:** P1  
**Estimate:** 2 hours

---

### Epic: Dashboard

---

#### US-H11: Home Screen — Safe Spend Display

**As a** user opening the app  
**I want to** see my safe spend today immediately  
**So that** I know my spending limit at a glance

**Acceptance Criteria:**
- [ ] Safe spend today displayed prominently
- [ ] Days to payday shown
- [ ] Current balance visible
- [ ] Updates based on logged transactions

**Priority:** P0  
**Estimate:** 3 hours

---

#### US-H12: Home Screen — Quick Action

**As a** user on the home screen  
**I want to** quickly start a spend decision conversation  
**So that** I can get advice without navigating

**Acceptance Criteria:**
- [ ] Large mic button on home screen
- [ ] Hint text: "Should I buy this?"
- [ ] Single tap initiates voice input
- [ ] Visual feedback while listening

**Priority:** P0  
**Estimate:** 2 hours

---

### Epic: Text Fallback

---

#### US-H13: Text Input Option

**As a** user who can't speak (public, quiet environment)  
**I want to** type my question instead of speaking  
**So that** I can still use Kora anywhere

**Acceptance Criteria:**
- [ ] Keyboard icon visible near mic button
- [ ] Tapping opens text input field
- [ ] Same AI analysis as voice input
- [ ] Response shown as text (with option to hear it)

**Priority:** P1  
**Estimate:** 3 hours

---

### Hackathon Feature Lock

| Feature | Status | Notes |
|---------|--------|-------|
| Voice onboarding (5 questions) | ✅ In | Core demo |
| Safe spend calculation | ✅ In | Core demo |
| "Should I buy X" voice flow | ✅ In | Core demo |
| Voice output (TTS) | ✅ In | Core demo |
| Basic dashboard | ✅ In | Core demo |
| Text fallback | ✅ In | Essential UX |
| Bank connection | ⚠️ Prompt only | Show vision, mock data |
| Post-spend logging | ❌ Out | MVP feature |
| Proactive check-ins | ❌ Out | MVP feature |
| Pattern detection | ❌ Out | MVP feature |

---

## User Stories: Full MVP

### Epic: Authentication

---

#### US-M01: Phone Number Registration

**As a** new user  
**I want to** register with my phone number  
**So that** my data is saved and secure

**Acceptance Criteria:**
- [ ] User enters phone number
- [ ] OTP sent via SMS
- [ ] OTP verified
- [ ] Account created
- [ ] User proceeds to onboarding

**Priority:** P0  
**Estimate:** 6 hours

---

#### US-M02: Returning User Login

**As a** returning user  
**I want to** log in with my phone number  
**So that** I can access my data

**Acceptance Criteria:**
- [ ] User enters phone number
- [ ] OTP sent and verified
- [ ] User lands on home dashboard
- [ ] All previous data loaded

**Priority:** P0  
**Estimate:** 4 hours

---

### Epic: Bank Integration

---

#### US-M03: Bank Connection Prompt

**As a** user who completed onboarding  
**I want to** understand why connecting my bank helps  
**So that** I can make an informed decision

**Acceptance Criteria:**
- [ ] Clear value proposition displayed
- [ ] Benefits listed (patterns, accuracy, auto-tracking)
- [ ] "Connect Bank" CTA prominent
- [ ] "Skip for now" option available
- [ ] No pressure tactics

**Priority:** P0  
**Estimate:** 2 hours

---

#### US-M04: Bank Connection — Nigeria (Mono)

**As a** Nigerian user  
**I want to** connect my bank account via Mono  
**So that** Kora can see my real transactions

**Acceptance Criteria:**
- [ ] Mono widget opens in-app
- [ ] User selects bank and authenticates
- [ ] Account linked successfully
- [ ] Initial transaction sync (90 days)
- [ ] Success confirmation shown

**Priority:** P0  
**Estimate:** 8 hours

---

#### US-M05: Bank Connection — UK (GoCardless)

**As a** UK user  
**I want to** connect my bank account via Open Banking  
**So that** Kora can see my real transactions

**Acceptance Criteria:**
- [ ] GoCardless flow initiated
- [ ] User redirected to bank for authorization
- [ ] Callback handled correctly
- [ ] Account linked successfully
- [ ] Initial transaction sync (90 days)

**Priority:** P0  
**Estimate:** 8 hours

---

#### US-M06: Geo-Aware Provider Selection

**As a** user  
**I want to** see only relevant bank connection options  
**So that** I'm not confused by foreign providers

**Acceptance Criteria:**
- [ ] App detects user country (from phone number or IP)
- [ ] Nigeria: Show Mono only
- [ ] UK: Show GoCardless only
- [ ] Provider selection stored in user profile

**Priority:** P1  
**Estimate:** 3 hours

---

#### US-M07: Transaction Sync

**As a** user with connected bank  
**I want to** have my transactions synced automatically  
**So that** Kora always has current data

**Acceptance Criteria:**
- [ ] Background sync every 6 hours
- [ ] Manual refresh available
- [ ] "Last synced" timestamp displayed
- [ ] Sync failures handled gracefully
- [ ] Re-authorization prompts when needed

**Priority:** P0  
**Estimate:** 6 hours

---

#### US-M08: Transaction Categorization

**As a** user with synced transactions  
**I want to** have my transactions auto-categorized  
**So that** Kora understands where my money goes

**Acceptance Criteria:**
- [ ] Categories: Food, Transport, Entertainment, Shopping, Bills, Transfer, Other
- [ ] Merchant-based categorization
- [ ] Description-based fallback
- [ ] User can correct miscategorized transactions
- [ ] Corrections improve future categorization

**Priority:** P0  
**Estimate:** 8 hours

---

### Epic: Post-Spend Logging

---

#### US-M09: Voice Spend Logging

**As a** user who just spent money  
**I want to** tell Kora what I spent via voice  
**So that** my spending is tracked without the bank

**Acceptance Criteria:**
- [ ] User says "I just spent ₦8k at the restaurant"
- [ ] Amount and category extracted
- [ ] Transaction logged
- [ ] Safe spend recalculated
- [ ] Kora provides feedback on impact

**Priority:** P0  
**Estimate:** 4 hours

---

#### US-M10: Spend Logging Recalibration

**As a** user who logged a spend  
**I want to** see how it affects my remaining budget  
**So that** I can adjust my behavior

**Acceptance Criteria:**
- [ ] Kora shows impact on daily safe spend
- [ ] If overspent: Kora adjusts tomorrow's budget
- [ ] No guilt, just recalibration
- [ ] Clear acknowledgment from Kora

**Priority:** P0  
**Estimate:** 3 hours

---

### Epic: Pattern Detection

---

#### US-M11: Spending Pattern Analysis

**As a** user with 2+ weeks of transaction data  
**I want to** have Kora detect my spending patterns  
**So that** advice becomes personalized

**Acceptance Criteria:**
- [ ] Daily average spend calculated
- [ ] Category breakdown computed
- [ ] High-spend days identified (e.g., weekends)
- [ ] Patterns update weekly

**Priority:** P0  
**Estimate:** 8 hours

---

#### US-M12: Risk Period Detection

**As a** user with spending history  
**I want to** have Kora identify my risky times  
**So that** I can be warned proactively

**Acceptance Criteria:**
- [ ] Detect: Weekend overspending
- [ ] Detect: Payday splurge
- [ ] Detect: Late-night spending
- [ ] Detect: Category spikes (e.g., delivery apps)
- [ ] Risk periods stored for check-in triggers

**Priority:** P1  
**Estimate:** 6 hours

---

### Epic: Proactive Check-ins

---

#### US-M13: Weekend Check-in

**As a** user entering a historically high-spend period  
**I want to** receive a proactive check-in from Kora  
**So that** I can set a limit before I overspend

**Acceptance Criteria:**
- [ ] Push notification on Friday afternoon/evening
- [ ] Kora references past weekend spending
- [ ] Kora asks: "What's your limit this weekend?"
- [ ] User commits to amount via voice or text
- [ ] Limit stored for follow-up

**Priority:** P1  
**Estimate:** 6 hours

---

#### US-M14: Payday Check-in

**As a** user who just got paid  
**I want to** receive a check-in from Kora  
**So that** I don't blow my paycheck immediately

**Acceptance Criteria:**
- [ ] Triggered when large credit detected (likely salary)
- [ ] Kora acknowledges payday
- [ ] Kora reminds of savings goal
- [ ] Kora suggests moving money to savings
- [ ] User can dismiss or engage

**Priority:** P1  
**Estimate:** 4 hours

---

#### US-M15: Limit Follow-up

**As a** user who set a spending limit  
**I want to** receive a follow-up from Kora  
**So that** I'm held accountable

**Acceptance Criteria:**
- [ ] Check-in 24-48 hours after limit set
- [ ] Kora asks how it went
- [ ] If under: Celebration/acknowledgment
- [ ] If over: No guilt, recalibration, pattern note

**Priority:** P1  
**Estimate:** 4 hours

---

### Epic: Insights Dashboard

---

#### US-M16: Monthly Spending Breakdown

**As a** user with bank connected  
**I want to** see where my money went this month  
**So that** I understand my spending habits

**Acceptance Criteria:**
- [ ] Category breakdown with amounts
- [ ] Visual bar chart or similar
- [ ] Comparison to previous month (if available)
- [ ] Tap category for transaction list

**Priority:** P1  
**Estimate:** 6 hours

---

#### US-M17: AI-Generated Insights

**As a** user viewing insights  
**I want to** see personalized observations from Kora  
**So that** I get actionable advice

**Acceptance Criteria:**
- [ ] Insights like: "₦18k of food spend is delivery apps"
- [ ] Suggestions like: "Cooking 2 more nights saves ₦8k/month"
- [ ] Risk patterns highlighted
- [ ] Insights update weekly

**Priority:** P1  
**Estimate:** 6 hours

---

### Epic: Settings & Profile

---

#### US-M18: Edit Financial Profile

**As a** user whose situation changed  
**I want to** update my income, payday, or expenses  
**So that** Kora's calculations stay accurate

**Acceptance Criteria:**
- [ ] Settings screen accessible from home
- [ ] Edit: Income amount and frequency
- [ ] Edit: Payday date
- [ ] Edit: Fixed expenses (add/remove/modify)
- [ ] Edit: Savings goal
- [ ] Changes reflect immediately in calculations

**Priority:** P1  
**Estimate:** 4 hours

---

#### US-M19: Disconnect Bank

**As a** user who wants to remove bank access  
**I want to** disconnect my bank account  
**So that** I control my data

**Acceptance Criteria:**
- [ ] Disconnect option in settings
- [ ] Confirmation prompt
- [ ] Bank link removed
- [ ] Historical transactions retained (anonymized)
- [ ] App continues working with manual mode

**Priority:** P2  
**Estimate:** 2 hours

---

#### US-M20: Currency & Region Settings

**As a** user  
**I want to** confirm my currency and region  
**So that** Kora displays correct formatting

**Acceptance Criteria:**
- [ ] Currency auto-detected from phone/bank
- [ ] Manual override available
- [ ] Supported: NGN, GBP
- [ ] All amounts formatted correctly

**Priority:** P2  
**Estimate:** 2 hours

---

### MVP Feature Lock

| Feature | Status | Priority |
|---------|--------|----------|
| Phone auth (OTP) | ✅ In | P0 |
| Persistent data storage | ✅ In | P0 |
| Mono integration (Nigeria) | ✅ In | P0 |
| GoCardless integration (UK) | ✅ In | P0 |
| Geo-aware provider selection | ✅ In | P1 |
| Transaction sync | ✅ In | P0 |
| Transaction categorization | ✅ In | P0 |
| Voice spend logging | ✅ In | P0 |
| Spend logging recalibration | ✅ In | P0 |
| Pattern detection | ✅ In | P0 |
| Risk period detection | ✅ In | P1 |
| Weekend check-in | ✅ In | P1 |
| Payday check-in | ✅ In | P1 |
| Limit follow-up | ✅ In | P1 |
| Monthly breakdown | ✅ In | P1 |
| AI insights | ✅ In | P1 |
| Edit profile | ✅ In | P1 |
| Disconnect bank | ✅ In | P2 |
| Currency settings | ✅ In | P2 |

---

## User Stories: Post-MVP

### Epic: Goals

---

#### US-P01: Set Savings Goal

**As a** user who wants to save  
**I want to** set a specific savings goal with deadline  
**So that** Kora can help me reach it

**Acceptance Criteria:**
- [ ] User sets target amount
- [ ] User sets target date
- [ ] Kora calculates required monthly savings
- [ ] Goal visible on dashboard

**Priority:** P2  
**Estimate:** 4 hours

---

#### US-P02: Goal Progress Tracking

**As a** user with a savings goal  
**I want to** see my progress toward the goal  
**So that** I stay motivated

**Acceptance Criteria:**
- [ ] Visual progress indicator
- [ ] Amount saved vs target
- [ ] On-track / behind indicator
- [ ] Projected completion date

**Priority:** P2  
**Estimate:** 4 hours

---

#### US-P03: Goal-Aware Recommendations

**As a** user with a savings goal  
**I want to** have Kora factor my goal into spend decisions  
**So that** I stay on track

**Acceptance Criteria:**
- [ ] "Should I buy this?" references goal impact
- [ ] "This puts your March goal at risk"
- [ ] Suggestions to adjust if behind

**Priority:** P2  
**Estimate:** 3 hours

---

### Epic: Gamification

---

#### US-P04: Spending Streaks

**As a** user  
**I want to** see how many days I've stayed under safe spend  
**So that** I'm motivated to continue

**Acceptance Criteria:**
- [ ] Streak counter on dashboard
- [ ] Streak increments daily if under safe spend
- [ ] Streak resets on overspend day
- [ ] Milestone celebrations (7 days, 30 days, etc.)

**Priority:** P3  
**Estimate:** 4 hours

---

#### US-P05: Achievements

**As a** user  
**I want to** earn achievements for good behavior  
**So that** I feel rewarded

**Acceptance Criteria:**
- [ ] Achievement: "First week under budget"
- [ ] Achievement: "Saved ₦X this month"
- [ ] Achievement: "Said no to 5 impulse purchases"
- [ ] Achievements displayed in profile
- [ ] Optional share to social

**Priority:** P3  
**Estimate:** 6 hours

---

#### US-P06: Challenges

**As a** user  
**I want to** take on weekly challenges  
**So that** I have specific goals to hit

**Acceptance Criteria:**
- [ ] Challenge: "No delivery apps this week"
- [ ] Challenge: "Stay under ₦X this weekend"
- [ ] Challenge: "Log every spend for 7 days"
- [ ] Challenge completion tracked
- [ ] Rewards for completion (badges, streaks)

**Priority:** P3  
**Estimate:** 8 hours

---

### Epic: Meva Reflection Layer

---

#### US-P07: Post-Overspend Reflection

**As a** user who overspent  
**I want to** receive a gentle reflection prompt later  
**So that** I can understand why it happened

**Acceptance Criteria:**
- [ ] Triggered 6-12 hours after overspend logged
- [ ] Kora asks: "Want to unpack that spend?"
- [ ] If yes: Guided reflection questions
- [ ] What were you feeling? What triggered it?
- [ ] Insight stored for pattern analysis

**Priority:** P3  
**Estimate:** 6 hours

---

#### US-P08: Weekly Reflection Ritual

**As a** user  
**I want to** have a weekly check-in ritual  
**So that** I can reflect on my money week

**Acceptance Criteria:**
- [ ] Prompted Sunday evening
- [ ] Summary of week: spent, saved, patterns
- [ ] Kora asks: "How do you feel about this week?"
- [ ] User reflects via voice
- [ ] Kora acknowledges and sets intention for next week

**Priority:** P3  
**Estimate:** 6 hours

---

### Epic: Advanced Features

---

#### US-P09: Savings Automation Suggestion

**As a** user with surplus  
**I want to** have Kora suggest moving money to savings  
**So that** I protect money from myself

**Acceptance Criteria:**
- [ ] Detect surplus after bills paid
- [ ] Suggest specific amount to move
- [ ] Provide link/instructions to transfer
- [ ] (Future: Auto-transfer integration)

**Priority:** P2  
**Estimate:** 4 hours

---

#### US-P10: Subscription Audit

**As a** user with connected bank  
**I want to** see all my recurring subscriptions  
**So that** I can cancel unused ones

**Acceptance Criteria:**
- [ ] Detect recurring charges
- [ ] List with amounts and frequency
- [ ] Flag subscriptions not used recently
- [ ] Total monthly subscription cost

**Priority:** P3  
**Estimate:** 6 hours

---

#### US-P11: WhatsApp Integration

**As a** user who prefers WhatsApp  
**I want to** interact with Kora via WhatsApp  
**So that** I don't need to open another app

**Acceptance Criteria:**
- [ ] WhatsApp Business API integration
- [ ] Core flows available: "Should I buy X", logging
- [ ] Check-ins delivered via WhatsApp
- [ ] Voice notes supported

**Priority:** P2  
**Estimate:** 16 hours

---

### Post-MVP Feature Lock

| Feature | Status | Priority | Version |
|---------|--------|----------|---------|
| Savings goals | ✅ Planned | P2 | V2 |
| Goal progress tracking | ✅ Planned | P2 | V2 |
| Goal-aware recommendations | ✅ Planned | P2 | V2 |
| Spending streaks | ✅ Planned | P3 | V2 |
| Achievements | ✅ Planned | P3 | V2 |
| Challenges | ✅ Planned | P3 | V2 |
| Post-overspend reflection (Meva) | ✅ Planned | P3 | V2 |
| Weekly reflection ritual (Meva) | ✅ Planned | P3 | V2 |
| Savings automation | ✅ Planned | P2 | V2 |
| Subscription audit | ✅ Planned | P3 | V2 |
| WhatsApp integration | ✅ Planned | P2 | V2 |

---

## Feature Lock Summary

### Hackathon (Jan 2nd) — 13 User Stories

| ID | Feature | Priority |
|----|---------|----------|
| US-H01 | First launch | P0 |
| US-H02 | Voice onboarding — Income | P0 |
| US-H03 | Voice onboarding — Expenses | P0 |
| US-H04 | Voice onboarding — Current state | P0 |
| US-H05 | First analysis | P0 |
| US-H06 | Savings goal capture | P1 |
| US-H07 | "Should I buy this?" — Voice input | P0 |
| US-H08 | "Should I buy this?" — AI analysis | P0 |
| US-H09 | "Should I buy this?" — Voice response | P0 |
| US-H10 | Decision logging | P1 |
| US-H11 | Home screen — Safe spend display | P0 |
| US-H12 | Home screen — Quick action | P0 |
| US-H13 | Text fallback | P1 |

**Total P0:** 10 stories  
**Total P1:** 3 stories

---

### Full MVP (Weeks 1-6) — 20 User Stories

| ID | Feature | Priority |
|----|---------|----------|
| US-M01 | Phone registration | P0 |
| US-M02 | Returning user login | P0 |
| US-M03 | Bank connection prompt | P0 |
| US-M04 | Mono integration (Nigeria) | P0 |
| US-M05 | GoCardless integration (UK) | P0 |
| US-M06 | Geo-aware provider selection | P1 |
| US-M07 | Transaction sync | P0 |
| US-M08 | Transaction categorization | P0 |
| US-M09 | Voice spend logging | P0 |
| US-M10 | Spend logging recalibration | P0 |
| US-M11 | Spending pattern analysis | P0 |
| US-M12 | Risk period detection | P1 |
| US-M13 | Weekend check-in | P1 |
| US-M14 | Payday check-in | P1 |
| US-M15 | Limit follow-up | P1 |
| US-M16 | Monthly spending breakdown | P1 |
| US-M17 | AI-generated insights | P1 |
| US-M18 | Edit financial profile | P1 |
| US-M19 | Disconnect bank | P2 |
| US-M20 | Currency & region settings | P2 |

**Total P0:** 10 stories  
**Total P1:** 8 stories  
**Total P2:** 2 stories

---

### Post-MVP (V2+) — 11 User Stories

| ID | Feature | Priority |
|----|---------|----------|
| US-P01 | Set savings goal | P2 |
| US-P02 | Goal progress tracking | P2 |
| US-P03 | Goal-aware recommendations | P2 |
| US-P04 | Spending streaks | P3 |
| US-P05 | Achievements | P3 |
| US-P06 | Challenges | P3 |
| US-P07 | Post-overspend reflection (Meva) | P3 |
| US-P08 | Weekly reflection ritual (Meva) | P3 |
| US-P09 | Savings automation suggestion | P2 |
| US-P10 | Subscription audit | P3 |
| US-P11 | WhatsApp integration | P2 |

**Total P2:** 4 stories  
**Total P3:** 7 stories

---

## Out of Scope

The following are explicitly **NOT** in any current roadmap:

| Feature | Reason |
|---------|--------|
| Investment advice | Regulatory complexity, not core job |
| Debt management tools | Different product, different user |
| Bill payment | Commodity feature, no differentiation |
| Money transfers | Banks do this better |
| Credit score | Not available in all markets |
| Multi-currency | Complexity vs value |
| Family/shared accounts | V3 at earliest |
| Desktop/web app | Mobile-first for MVP |
| Teller integration (US) | Post-MVP market |
| Cryptocurrency tracking | Not core user |
| Receipt scanning | Low value vs complexity |
| Budgeting categories | Anti-pattern for this product |

---

## Appendix: Story Point Reference

| Estimate | Meaning |
|----------|---------|
| 2 hours | Simple UI, no backend |
| 3-4 hours | UI + basic backend |
| 6 hours | Integration or complex logic |
| 8 hours | External API + error handling |
| 16 hours | Major feature with multiple components |

---

*Document Version: 1.0*  
*Status: LOCKED*  
*Last Updated: December 2024*
