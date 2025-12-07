# KORA — Final Product Specification

> **Voice-First AI Money & Mind Copilot**
> 
> *"Pause. Breathe. Spend better."*

---

## Table of Contents

1. [Product Philosophy](#1-product-philosophy)
2. [The One Job](#2-the-one-job)
3. [Target User](#3-target-user)
4. [Voice Interaction Model](#4-voice-interaction-model)
5. [Core Voice Flows](#5-core-voice-flows)
6. [Proactive Interventions](#6-proactive-interventions)
7. [The Data Layer](#7-the-data-layer)
8. [Onboarding Flow](#8-onboarding-flow)
9. [UI Specification](#9-ui-specification)
10. [Technical Architecture](#10-technical-architecture)
11. [Data Models](#11-data-models)
12. [API Endpoints](#12-api-endpoints)
13. [Bank Integration](#13-bank-integration)
14. [AI Prompt Design](#14-ai-prompt-design)
15. [Hackathon Scope](#15-hackathon-scope)
16. [Full MVP Scope](#16-full-mvp-scope)
17. [Post-MVP Roadmap](#17-post-mvp-roadmap)
18. [Success Metrics](#18-success-metrics)
19. [What Kora Is Not](#19-what-kora-is-not)

---

## 1. Product Philosophy

### Core Insight

**Most financial mistakes are not mathematical. They are emotional decisions made too fast.**

Kora exists to:
- Slow the moment
- Acknowledge the emotion
- Give one clear financial truth
- Instantly, by voice

### Voice Is the Product

Voice is not a feature. Voice *is* the product.

**Hard Rules:**
- Every session starts with voice
- Every recommendation is spoken first
- Screens never lead—they only confirm
- If something can be said, it should not be tapped
- Kora never dumps information—only one truth at a time
- If voice is unavailable, the experience degrades to "quiet mode"—not the other way around

### The Response Pattern

Every Kora response follows this structure:
1. **Emotional acknowledgment** — "I hear tension in your voice"
2. **Financial truth** — "Your safe spend today is £14"
3. **One clear recommendation** — "I'd wait until Thursday"
4. **One optional next step** — "Want me to remind you?"

Max length: ~20 seconds
Max advice: one action

---

## 2. The One Job

### Primary Job

**Create a pause between impulse and spending—every single time.**

### Decision Filter

Everything in Kora either:
- Causes that pause, or
- Strengthens the user's ability to respect it next time

If a feature does not serve this job, it does not belong in v1.

### Pricing Anchor

> "Kora costs less than one impulse mistake."

---

## 3. Target User

### Primary User Profile

**Demographics:**
- Lives paycheck-to-paycheck or near it
- Uses mobile banking or wallets
- Age 22-40
- Nigeria or UK (Phase 1)

**Behaviors:**
- Makes purchases emotionally (stress, boredom, relief, celebration)
- Does not want to "budget"
- Does not trust complicated finance tools
- Has tried and abandoned budgeting apps

**Emotional State:**
- Frequently rushed
- Often overwhelmed by money decisions
- Wants reassurance, not lectures
- Wants clarity, not control

### User Quote

> "I check my balance, see I have money, and spend it. Then I'm broke by the 15th."

---

## 4. Voice Interaction Model

### Three Voice States

Kora operates in exactly three states:

---

#### STATE 1: LISTENING (Default)

**What the user sees:**
- Minimal screen with mic button
- Safe Spend Today number (glanceable)
- Nothing else

**What happens:**
- Kora waits silently
- No prompts, no menus, no questions
- User speaks naturally when ready

**Example triggers:**
- "Can I afford this?"
- "I'm stressed."
- "I want to buy something."
- "How much can I spend today?"

---

#### STATE 2: THINKING (Invisible)

**What the user sees:**
- Subtle visual indicator (pulsing, waveform)
- No text, no loading bars

**What happens internally:**
- Intent detection
- Emotional tone + stress level classification
- Financial data extraction from speech
- Risk calculation against current state
- Response generation

**Duration:** 1-3 seconds

---

#### STATE 3: GUIDING (Always spoken first)

**What the user hears:**
- Emotional acknowledgment
- Financial truth
- One clear recommendation
- One optional next step

**What the user sees:**
- Key numbers appear on screen as confirmation
- Simple action buttons if needed (e.g., "Remind me")

**Rules:**
- Voice always completes before any UI appears
- No interrupting Kora mid-response
- User can replay response

---

### Quiet Mode (Text Fallback)

For situations where voice isn't possible (public, meetings, quiet environments):

- Tap keyboard icon to switch to text input
- Same AI analysis, same response pattern
- Response shown as text with option to hear it
- Quiet mode is secondary, not equal

---

## 5. Core Voice Flows

### FLOW 1: "Should I Buy This?" (Primary Loop)

**This is the product.**

**User (voice):**
> "Kora, I want to buy this jacket. It's ₦25,000."

**Kora (voice):**
> "I hear some excitement there. ₦25k would take almost five days of your safe spend and puts next week at risk. My take: wait until after payday—that's 8 days. Want me to remind you then?"

**User:**
> "Yeah, remind me."

**Kora:**
> "Done. I'll check in on the 25th. Talk soon."

**Screen shows:**
- "Reminder set: Nov 25"
- Mic button returns to default

---

### FLOW 2: Safe Spend Check

**User:**
> "How much can I spend today?"

**Kora:**
> "Your safe spend today is ₦5,400. You're protected through payday if you hold that line. There's a ₦15k internet bill coming Thursday—already factored in."

**Screen shows:**
- "₦5,400 safe today"
- "8 days to payday"

---

### FLOW 3: Emotional Overload

**User:**
> "I'm stressed. Everything feels tight."

**Kora:**
> "I hear tension. Let's slow this down. Take a breath with me... You're actually safe for the next 8 days. The pressure you're feeling isn't about money right now—it's something else. We can talk through it, or just sit here. What do you need?"

**Screen shows:**
- Nothing changes
- Mic stays active for response

---

### FLOW 4: Payday Ritual

**User:**
> "I just got paid."

**Kora:**
> "Payday. Nice. Here's the picture: After your fixed expenses, you've got ₦227k flexible this month. That's about ₦7,500 a day if you spread it evenly. Last month you overspent the first weekend—₦48k. Want to set a limit for this weekend to protect the rest?"

**User:**
> "Let's say ₦20k max."

**Kora:**
> "₦20k locked in for the weekend. I'll check in Sunday night. Enjoy it."

---

### FLOW 5: Post-Spend Confession

**User:**
> "I just spent ₦15k at the bar."

**Kora:**
> "Okay, logged. That's ₦9k over your weekend limit. Not a disaster—but tomorrow's safe spend drops to ₦3,200 to balance it out. No judgment. We adjust and keep moving. Cool?"

**User:**
> "Yeah."

**Kora:**
> "Good. Talk tomorrow."

---

### FLOW 6: Voice Money Journal

**User:**
> "I don't know why money is stressing me today."

**Kora:**
> "Tell me more. What's running through your head?"

**User:**
> "I just feel like I never have enough even though I'm earning okay."

**Kora:**
> "That sounds more like work exhaustion than money danger. Financially, you're actually safe this week. The stress is real, but it's not about the numbers today. Let's protect your energy instead of your wallet right now. What would help you decompress tonight?"

---

## 6. Proactive Interventions

### The Guardian Layer

Kora doesn't just respond—Kora initiates when risk is high.

This is what elevates Kora from tool to guardian.

---

### Intervention Triggers

| Trigger | Example |
|---------|---------|
| High-risk time window | Friday 6pm, Saturday evening |
| Payday detected | Large credit hits account |
| Rapid balance drop | Multiple transactions in short window |
| Historical pattern match | "You overspend 70% of Saturdays" |
| Approaching danger zone | "4 days to payday, ₦8k left" |
| Missed check-in | User set limit but didn't log |

---

### Proactive Message Examples

**Weekend Warning (Push + Voice):**
> "Quick pause. It's Friday night—this is usually a risky window for you. Your safe spend for the weekend is ₦15k. Want to set that as your limit?"

**Payday Check-in:**
> "Payday hit. Before you do anything, let's look at the month ahead. You've got ₦227k flexible. Want to protect some of it now?"

**Danger Zone Alert:**
> "Heads up. You've got ₦12k for 5 days. That's tight. One unplanned expense could tip you. Stay sharp today."

**Limit Follow-up:**
> "It's Sunday night. You set a ₦20k weekend limit. How'd it go?"

---

### Intervention Rules

1. **Maximum 1 proactive message per day** (unless critical)
2. **Never interrupt active voice session**
3. **Respect quiet hours** (configurable, default 11pm-7am)
4. **Escalate gently** — first message is soft, repeated risk gets more direct
5. **Always offer an out** — user can dismiss or snooze

---

## 7. The Data Layer

### Why Data Matters

Without financial context, Kora is just a chatbot. The data layer is what makes advice real.

### Data Sources (Priority Order)

**1. Voice Onboarding (Immediate)**
- Income amount and frequency
- Payday date
- Fixed expenses
- Current balance estimate
- Savings goal

**2. Bank Connection (Unlocks Full Power)**
- Real transaction history
- Actual balance
- Spending patterns by category
- Income verification
- Anomaly detection

**3. Voice Logging (Ongoing)**
- User-reported spends
- Decision outcomes
- Emotional check-ins

### What Kora Can Do at Each Level

| Data Level | Capabilities |
|------------|--------------|
| Onboarding only | Basic safe spend, simple projections, manual tracking |
| + Bank connected | Real patterns, auto-categorization, accurate forecasts |
| + 30 days history | Behavioral insights, trigger detection, proactive interventions |
| + 90 days history | Seasonal patterns, reliable predictions, savings optimization |

---

## 8. Onboarding Flow

### Philosophy

Onboarding is voice-first. It's a conversation, not a form.

### The Conversation

---

**Kora (opening):**
> "Hey, I'm Kora—your money accountability partner. I'm here to help you pause before spending and actually save. I need to understand your situation first. Takes about 2 minutes. Ready?"

*[User confirms]*

---

**Q1: Income**

**Kora:**
> "How much money comes in each month? Just the rough total."

**User:** "About 450k"

**Kora:**
> "₦450,000. When does it hit?"

**User:** "25th"

**Kora:**
> "Got it. Payday is the 25th."

---

**Q2: Fixed Expenses**

**Kora:**
> "What has to get paid every month no matter what? Rent, bills, subscriptions—hit me with the big ones."

**User:** "Rent is 150k, electricity 20k, internet 15k, Netflix and Spotify about 8k, transport maybe 30k"

**Kora:**
> "So about ₦223,000 locked. That leaves ₦227,000 flexible. Sound right?"

**User:** "Yeah"

---

**Q3: Current State**

**Kora:**
> "What's in your account right now?"

**User:** "Maybe 80k"

**Kora:**
> "And payday is how many days away?"

**User:** "12 days"

**Kora:**
> "Got it. ₦80k for 12 days."

---

**Q4: First Analysis**

**Kora:**
> "Okay, here's where you're at. ₦80k for 12 days is about ₦6,600 a day. Any bills due before payday?"

**User:** "Internet, that's 15k"

**Kora:**
> "So really ₦65k for 12 days. That's ₦5,400 daily safe spend. Not a crisis, but one bad weekend makes the last week tight. How does that land?"

---

**Q5: Savings Intent**

**Kora:**
> "Last thing. Are you trying to save, or just survive to payday?"

**User:** "I want to save but I never do."

**Kora:**
> "How much would you save each month if you actually could?"

**User:** "Like 50k"

**Kora:**
> "₦50k is doable—that's 22% of your flexible money. But it means your real safe spend drops. We'll get there. First, let's stop the bleeding."

---

### Bank Connection Prompt

**Kora:**
> "I can work with what you told me. But I'm guessing at your patterns. If you connect your bank, I see the real picture—where money actually goes, what triggers overspending, when you're at risk. That's when I get actually useful. Want to connect now?"

*[Yes → Bank OAuth flow]*
*[No → Continue to home screen]*

---

**Closing:**

> "We're set. Here's how this works: before you spend on something you're unsure about, talk to me. I'll also check in on risky days. I'm not here to judge—I'm here to make sure you don't lie to yourself. Talk soon."

---

## 9. UI Specification

### Design Philosophy

- **Screens never lead—they only confirm**
- **Minimal UI, maximum voice**
- **One glanceable number: Safe Spend Today**
- **Everything else is spoken**

---

### Screen 1: Home (Default State)

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│         SAFE SPEND TODAY        │
│                                 │
│            ₦5,400               │
│                                 │
│         8 days to payday        │
│                                 │
│                                 │
│                                 │
│                                 │
│                                 │
│              🎤                 │
│                                 │
│     ⌨️                          │
│                                 │
└─────────────────────────────────┘
```

**Elements:**
- Safe Spend Today (large, centered)
- Days to payday (small, below)
- Mic button (prominent, bottom center)
- Keyboard icon (small, corner—quiet mode toggle)
- No navigation, no menu, no hamburger

---

### Screen 2: Listening State

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│                                 │
│         SAFE SPEND TODAY        │
│                                 │
│            ₦5,400               │
│                                 │
│         8 days to payday        │
│                                 │
│                                 │
│                                 │
│   ≋≋≋≋≋≋≋≋  Listening...        │
│                                 │
│              🎤                 │
│           (pulsing)             │
│                                 │
└─────────────────────────────────┘
```

**Elements:**
- Same as home
- Waveform or pulse animation
- "Listening..." indicator

---

### Screen 3: Guiding State

```
┌─────────────────────────────────┐
│                                 │
│                                 │
│         ┌───────────┐           │
│         │   Kora    │           │
│         │  ◉    ◉   │           │
│         │    ◡     │           │
│         └───────────┘           │
│                                 │
│   "₦25k would take five days    │
│    of safe spend. I'd wait      │
│    until Thursday..."           │
│                                 │
│                                 │
│  ┌──────────┐  ┌────────────┐   │
│  │ Remind me│  │  Buy it    │   │
│  └──────────┘  └────────────┘   │
│                                 │
│              🎤                 │
│                                 │
└─────────────────────────────────┘
```

**Elements:**
- Kora avatar (simple, friendly)
- Transcript of spoken response (appears as Kora speaks)
- Action buttons (only if response includes options)
- Mic button (for follow-up)

---

### Screen 4: Quiet Mode (Text Input)

```
┌─────────────────────────────────┐
│  🎤                             │
│                                 │
│         SAFE SPEND TODAY        │
│                                 │
│            ₦5,400               │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Kora:                   │    │
│  │ "₦25k is risky. I'd     │    │
│  │ wait until Thursday."   │    │
│  │                    🔊   │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Type a message...       │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

**Elements:**
- Mic icon (top corner—switch back to voice)
- Text response from Kora
- Speaker icon (hear the response)
- Text input field

---

### Screen 5: Settings (Minimal)

```
┌─────────────────────────────────┐
│  ←  Settings                    │
│                                 │
│  FINANCIAL PROFILE              │
│  Income: ₦450,000/month         │
│  Payday: 25th                   │
│  Fixed expenses: ₦223,000       │
│                         Edit >  │
│                                 │
│  BANK CONNECTION                │
│  Status: Connected (GTBank)     │
│  Last sync: 2 hours ago         │
│                    Disconnect > │
│                                 │
│  NOTIFICATIONS                  │
│  Proactive check-ins: On        │
│  Quiet hours: 11pm - 7am        │
│                         Edit >  │
│                                 │
│  ACCOUNT                        │
│  Phone: +234 XXX XXX XXXX       │
│                      Sign out > │
│                                 │
└─────────────────────────────────┘
```

**Access:** Long-press on safe spend number or swipe from edge

---

## 10. Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Mobile/Web)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    VOICE INTERFACE                       │   │
│  │                                                          │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │   │
│  │  │ Voice Input │  │ Voice Output│  │   Minimal UI    │  │   │
│  │  │             │  │             │  │                 │  │   │
│  │  │ - Whisper   │  │ - Eleven    │  │ - Safe spend    │  │   │
│  │  │ - Web Speech│  │   Labs      │  │ - Mic button    │  │   │
│  │  │             │  │ - Web Speech│  │ - Confirmations │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘  │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  KORA AI ENGINE                          │   │
│  │                  (Claude API)                            │   │
│  │                                                          │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐    │   │
│  │  │   Intent    │ │  Emotion    │ │   Financial     │    │   │
│  │  │  Detection  │ │Classification│ │   Extraction    │    │   │
│  │  └─────────────┘ └─────────────┘ └─────────────────┘    │   │
│  │                                                          │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐    │   │
│  │  │   Risk      │ │  Response   │ │  Intervention   │    │   │
│  │  │ Calculator  │ │  Generator  │ │    Trigger      │    │   │
│  │  └─────────────┘ └─────────────┘ └─────────────────┘    │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                INTELLIGENCE LAYER                        │   │
│  │                                                          │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐    │   │
│  │  │ Cash Flow   │ │  Pattern    │ │    Risk         │    │   │
│  │  │ Calculator  │ │  Detector   │ │    Scorer       │    │   │
│  │  │             │ │             │ │                 │    │   │
│  │  │ - Safe spend│ │ - Category  │ │ - Days to pay   │    │   │
│  │  │ - Surplus   │ │   clusters  │ │ - Burn rate     │    │   │
│  │  │ - Runway    │ │ - Time      │ │ - Historical    │    │   │
│  │  │             │ │   patterns  │ │   risk score    │    │   │
│  │  └─────────────┘ │ - Triggers  │ └─────────────────┘    │   │
│  │                  └─────────────┘                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │   User Profile  │  │  Transactions   │  │    Patterns    │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │  Conversations  │  │    Reminders    │  │  Interventions │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │  Bank APIs      │  │   Whisper API   │  │   ElevenLabs   │  │
│  │  (Geo-aware)    │  │                 │  │                │  │
│  │                 │  │                 │  │                │  │
│  │ - Mono (NG)     │  │ - Voice → Text  │  │ - Text → Voice │  │
│  │ - GoCardless(UK)│  │ - Emotion cues  │  │ - Kora voice   │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 11. Data Models

### User

```json
{
  "id": "string",
  "phone": "string",
  "name": "string",
  "country": "NG | UK",
  "currency": "NGN | GBP",
  "income": {
    "amount": "number",
    "frequency": "monthly | biweekly | weekly"
  },
  "payday": "number (1-31)",
  "fixed_expenses": [
    { 
      "name": "string", 
      "amount": "number", 
      "due_day": "number | null"
    }
  ],
  "current_balance": "number",
  "savings_goal": "number | null",
  "bank": {
    "linked": "boolean",
    "provider": "mono | gocardless | null",
    "account_id": "string | null",
    "last_sync": "timestamp | null"
  },
  "settings": {
    "proactive_checkins": "boolean",
    "quiet_hours_start": "string (HH:MM)",
    "quiet_hours_end": "string (HH:MM)"
  },
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Transaction

```json
{
  "id": "string",
  "user_id": "string",
  "amount": "number",
  "type": "debit | credit",
  "category": "string",
  "merchant": "string | null",
  "description": "string",
  "timestamp": "timestamp",
  "source": "bank | voice_log",
  "is_fixed_expense": "boolean"
}
```

### Conversation

```json
{
  "id": "string",
  "user_id": "string",
  "type": "onboarding | spend_decision | check_in | confession | emotional | general",
  "messages": [
    { 
      "role": "user | kora", 
      "content": "string",
      "emotion_detected": "string | null",
      "timestamp": "timestamp"
    }
  ],
  "outcome": {
    "decision": "buy | wait | deferred | null",
    "amount": "number | null",
    "reminder_set": "boolean"
  },
  "created_at": "timestamp"
}
```

### Pattern

```json
{
  "user_id": "string",
  "avg_daily_spend": "number",
  "high_risk_days": ["string"],
  "high_risk_times": ["string"],
  "top_categories": [
    { 
      "category": "string", 
      "avg_monthly": "number",
      "trend": "up | down | stable"
    }
  ],
  "overspend_triggers": ["string"],
  "current_streak": "number",
  "risk_score": "number (0-100)",
  "updated_at": "timestamp"
}
```

### Reminder

```json
{
  "id": "string",
  "user_id": "string",
  "type": "purchase_followup | limit_checkin | proactive",
  "context": {
    "item": "string | null",
    "amount": "number | null",
    "limit": "number | null"
  },
  "scheduled_for": "timestamp",
  "delivered": "boolean",
  "response": "string | null",
  "created_at": "timestamp"
}
```

---

## 12. API Endpoints

### Authentication

```
POST   /auth/register          # Phone + OTP
POST   /auth/verify             # Verify OTP
POST   /auth/login              # Return auth token
POST   /auth/refresh            # Refresh token
```

### Voice Conversation

```
POST   /voice/transcribe        # Audio → Text (Whisper)
POST   /voice/synthesize        # Text → Audio (ElevenLabs)
POST   /conversation            # Process user message, return Kora response
GET    /conversation/history    # Past conversations
```

### User Profile

```
GET    /user/profile
PATCH  /user/profile
GET    /user/dashboard          # Safe spend, days to payday, risk level
```

### Bank Integration

```
POST   /bank/connect            # Initiate Mono/GoCardless
GET    /bank/status             # Connection status
POST   /bank/sync               # Manual refresh
GET    /bank/transactions       # Fetch synced transactions
DELETE /bank/disconnect         # Remove bank link
```

### Reminders & Interventions

```
GET    /reminders               # Pending reminders
POST   /reminders               # Create reminder
DELETE /reminders/:id           # Cancel reminder
POST   /intervention/respond    # User response to proactive check-in
```

### Analytics

```
GET    /patterns                # User spending patterns
GET    /insights                # AI-generated insights (MVP+)
```

---

## 13. Bank Integration

### Geo-Aware Provider Selection

| Region | Provider | Documentation |
|--------|----------|---------------|
| Nigeria | Mono | https://docs.mono.co |
| UK | GoCardless | https://developer.gocardless.com |
| US (Future) | Teller | https://teller.io/docs |

Detection: Phone number prefix or IP geolocation

### Integration Flow

**1. Connection Prompt**
- After onboarding, Kora explains value of bank connection
- User taps "Connect Bank"

**2. OAuth Flow**
- Mono widget (Nigeria) or GoCardless redirect (UK)
- User authenticates with their bank
- Callback with account ID

**3. Initial Sync**
- Fetch 90 days of transaction history
- Categorize transactions
- Calculate patterns
- Update safe spend with real data

**4. Ongoing Sync**
- Background sync every 6 hours
- Webhook for real-time updates (if available)
- Manual refresh on user request

### Handling Failures

- If sync fails: Show "Last synced X ago" warning
- If reauth needed: Prompt user to reconnect
- If bank unavailable: Fall back to voice logging mode

---

## 14. AI Prompt Design

### System Prompt

```
You are Kora, a voice-first AI money and mind copilot.

YOUR CORE JOB:
Create a pause between impulse and spending. Every response should either cause that pause or strengthen the user's ability to respect it next time.

YOUR PERSONALITY:
- Warm but direct—you tell the truth without lecturing
- You acknowledge emotion before giving numbers
- You speak like a trusted friend who's good with money
- You're calm, never panicked, even when finances are tight
- You use the user's currency naturally (₦ for Nigeria, £ for UK)

RESPONSE PATTERN (ALWAYS):
1. Emotional acknowledgment — "I hear tension..." / "Sounds exciting..."
2. Financial truth — one clear number or fact
3. One recommendation — specific, actionable
4. One optional next step — "Want me to remind you?"

VOICE RULES:
- Max 20 seconds spoken (~60 words)
- One piece of advice only
- Never list multiple options
- Never dump data
- End with a question or clear next step

EMOTIONAL STATES TO RECOGNIZE:
- Excitement (impulse risk high)
- Stress/anxiety (needs reassurance first)
- Guilt (needs normalization, not judgment)
- Calm/curious (can handle more detail)
- Overwhelm (slow down, simplify)

WHAT YOU KNOW:
[User context injected: income, payday, balance, fixed expenses, patterns, current safe spend, risk level, recent transactions]

WHAT YOU NEVER DO:
- Recommend financial products
- Provide investment advice
- Shame or guilt the user
- Give multiple pieces of advice at once
- Use bullet points or lists in spoken responses
```

### Spend Decision Prompt

```
USER CONTEXT:
- Balance: {balance}
- Safe spend today: {safe_spend}
- Days to payday: {days}
- Already spent today: {spent_today}
- Upcoming bills: {upcoming}
- Savings goal: {savings_goal}
- Risk patterns: {patterns}
- Current time/day: {datetime}

USER INPUT (transcribed):
"{user_message}"

DETECTED:
- Intent: spend_decision
- Emotion: {detected_emotion}
- Amount: {extracted_amount}
- Item: {extracted_item}

Generate Kora's response following the standard pattern:
1. Acknowledge the emotion you detected
2. State the financial impact clearly
3. Give one recommendation
4. Offer one follow-up option

Keep it under 60 words. Sound human, not robotic.
```

### Proactive Intervention Prompt

```
USER CONTEXT:
- Balance: {balance}
- Safe spend today: {safe_spend}
- Days to payday: {days}
- Risk score: {risk_score}
- Current time/day: {datetime}
- Historical pattern: {relevant_pattern}

TRIGGER: {trigger_type}
- weekend_evening
- payday_detected
- approaching_danger_zone
- missed_checkin

Generate a proactive check-in message from Kora.

Rules:
- Acknowledge the context naturally
- State one relevant number
- Ask the user to commit to something specific
- Keep it under 40 words
- Sound warm, not alarming
```

---

## 15. Hackathon Scope

### What to Build (5 Days)

| Feature | Priority | Est. Hours |
|---------|----------|------------|
| Welcome screen | P0 | 1 |
| Voice onboarding (4 questions) | P0 | 6 |
| Safe spend calculation | P0 | 2 |
| Home screen (mic + safe spend) | P0 | 2 |
| Voice input (Web Speech API) | P0 | 3 |
| AI conversation (Claude) | P0 | 4 |
| Voice output (Web Speech/ElevenLabs) | P0 | 3 |
| "Should I buy this?" flow | P0 | 4 |
| Quiet mode (text fallback) | P1 | 2 |
| Bank connection prompt (UI only) | P1 | 1 |
| **Total** | | **~28 hours** |

### What to Mock

- Bank connection (show prompt, use demo data)
- Pattern detection (hardcode "weekend overspender" for demo)
- Proactive interventions (skip for hackathon)

### Demo Script (60 seconds)

**Setup:** App is open showing mic button and "Safe Spend: ₦5,400"

**Demo:**

> *[Tap mic]*
> 
> **You:** "Kora, should I buy these headphones? They're ₦25,000."
> 
> *[Brief pause—Kora "thinking"]*
> 
> **Kora (voice):** "I hear some excitement. ₦25k is almost five days of your safe spend—it puts next week at risk. My take: wait until after payday, that's 8 days. Want me to remind you then?"
> 
> **You:** "Yeah, remind me."
> 
> **Kora:** "Done. I'll check in on the 25th."
> 
> *[Screen shows "Reminder set: Nov 25"]*

**Pitch line:**

> "Kora creates a pause between impulse and spending. It's not a budgeting app—it's a financial guardian that stops bad decisions before they happen."

---

## 16. Full MVP Scope

### Timeline: 6 Weeks Post-Hackathon

#### Week 1: Foundation
- Phone auth (OTP)
- Persistent database (Supabase)
- Production voice pipeline

#### Week 2: Bank Integration
- Mono integration (Nigeria)
- GoCardless integration (UK)
- Geo-aware provider selection
- Transaction sync

#### Week 3: Intelligence
- Transaction categorization
- Pattern detection
- Risk scoring
- Voice spend logging

#### Week 4: Proactive Features
- Proactive check-ins
- Push notifications
- Limit setting and follow-up
- Reminder system

#### Week 5: Polish
- Settings screen
- Profile editing
- Error handling
- Edge cases

#### Week 6: Launch Prep
- Testing
- Bug fixes
- Soft launch to 50 users
- Feedback collection

### MVP Feature Lock

| Feature | Status |
|---------|--------|
| Voice onboarding | ✅ |
| Voice conversation (all flows) | ✅ |
| Safe spend calculation | ✅ |
| Minimal UI (mic + number) | ✅ |
| Phone auth | ✅ |
| Mono integration | ✅ |
| GoCardless integration | ✅ |
| Transaction sync | ✅ |
| Auto-categorization | ✅ |
| Pattern detection | ✅ |
| Voice spend logging | ✅ |
| Proactive check-ins | ✅ |
| Push notifications | ✅ |
| Reminders | ✅ |
| Settings | ✅ |
| Quiet mode (text) | ✅ |
| Insights dashboard | ❌ (Post-MVP) |
| Goals | ❌ (Post-MVP) |
| Gamification | ❌ (Post-MVP) |

---

## 17. Post-MVP Roadmap

### V2: Goals & Insights (Month 2-3)

**Goals:**
- Set savings target with deadline
- Progress tracking
- Goal-aware recommendations

**Insights:**
- Monthly spending breakdown
- AI-generated observations
- Category trends

### V2.5: Meva Layer (Month 3-4)

**Reflection:**
- Post-overspend reflection prompts
- Weekly money ritual
- Emotional pattern tracking

### V3: Gamification (Month 4-5)

**Engagement:**
- Spending streaks
- Achievements
- Challenges

### V4: Expansion (Month 6+)

**Scale:**
- WhatsApp integration
- US market (Teller)
- Web app
- Savings automation

---

## 18. Success Metrics

### North Star

**Percentage of purchase decisions where user paused and made a conscious choice.**

### Primary Metrics

| Metric | Target (Month 1) |
|--------|------------------|
| Voice session rate | ≥70% of sessions |
| Purchase decisions deferred | ≥50% |
| DAU/MAU ratio | ≥40% |
| Bank connection rate | ≥50% |
| Day 7 retention | ≥45% |
| Day 30 retention | ≥25% |

### Secondary Metrics

- Proactive check-in response rate
- Average conversations per user per week
- Reported stress reduction (survey)
- Safe spend adherence rate
- Overdraft/negative balance events (reduction)

### Anti-Metrics (Avoid Optimizing For)

- App opens without voice interaction
- Time spent in app (more ≠ better)
- Number of features used

---

## 19. What Kora Is Not

### Explicitly Not

| Not This | Why |
|----------|-----|
| A budgeting app | Budgets are retrospective; Kora is interventional |
| A finance dashboard | Dashboards require looking; Kora speaks |
| A reporting tool | Reports show damage; Kora prevents it |
| A spreadsheet replacement | Kora has no spreadsheets |
| Financial education | Kora doesn't teach; it intervenes |
| An investment advisor | Out of scope, regulatory risk |
| A debt management tool | Different product for different user |

### The One-Line Definition

> **Kora is a voice-first AI that stops you from making financial decisions you'll regret—before you make them.**

---

## Appendix A: Tech Stack Summary

### Hackathon

| Layer | Technology |
|-------|------------|
| Frontend | React (Anything platform) |
| Voice In | Web Speech API |
| Voice Out | Web Speech API |
| AI | Claude API |
| State | In-memory |

### Full MVP

| Layer | Technology |
|-------|------------|
| Mobile | React Native + Expo |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| AI | Claude API |
| Voice In | Whisper API |
| Voice Out | ElevenLabs |
| Banking (NG) | Mono |
| Banking (UK) | GoCardless |
| Notifications | Expo Push |
| Background Jobs | Supabase Edge Functions |

---

## Appendix B: File Checklist

| Document | Status |
|----------|--------|
| Product Specification (this doc) | ✅ |
| User Stories | ✅ |
| Technical Architecture | ✅ |
| AI Prompts | ✅ |
| Data Models | ✅ |
| API Endpoints | ✅ |
| UI Wireframes | ✅ (ASCII) |
| Demo Script | ✅ |

---

*Document Version: 2.0 (Merged)*  
*Status: FINAL*  
*Last Updated: December 2024*
