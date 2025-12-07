# Kora Backend Implementation Plan

## Overview

Build a Fastify backend with Supabase (Auth + Database), LangChain for AI orchestration, deployed on Railway.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Mobile App (Expo)                          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Fastify Backend (Railway)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────┐ │
│  │   Auth      │  │   Users     │  │ Transactions│  │     AI     │ │
│  │  Middleware │  │   Routes    │  │   Routes    │  │   Routes   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └────────────┘ │
│                                    │                               │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    LangChain Orchestration                   │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │   │
│  │  │ Whisper │  │ Mistral │  │ElevenLabs│  │ Prompt Manager │ │   │
│  │  │  Tool   │  │  Tool   │  │   Tool   │  │                │ │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Supabase                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐ │
│  │    Auth     │  │  Database   │  │        Storage               │ │
│  │  (JWT/RLS)  │  │ (PostgreSQL)│  │  (Audio files - optional)   │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
kora-backend/
├── src/
│   ├── index.ts                 # Entry point
│   ├── app.ts                   # Fastify app setup
│   ├── config/
│   │   ├── env.ts               # Environment variables
│   │   └── supabase.ts          # Supabase client
│   ├── routes/
│   │   ├── index.ts             # Route registration
│   │   ├── auth.routes.ts       # Auth endpoints
│   │   ├── users.routes.ts      # User profile endpoints
│   │   ├── transactions.routes.ts # Transaction endpoints
│   │   └── ai.routes.ts         # AI conversation endpoints
│   ├── services/
│   │   ├── auth.service.ts      # Auth logic
│   │   ├── user.service.ts      # User CRUD
│   │   ├── transaction.service.ts # Transaction CRUD
│   │   └── ai/
│   │       ├── index.ts         # AI orchestration
│   │       ├── chains/
│   │       │   ├── onboarding.chain.ts
│   │       │   └── conversation.chain.ts
│   │       ├── tools/
│   │       │   ├── whisper.tool.ts
│   │       │   ├── mistral.tool.ts
│   │       │   └── elevenlabs.tool.ts
│   │       └── prompts/
│   │           ├── onboarding.prompts.ts
│   │           └── conversation.prompts.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts   # JWT verification
│   │   └── error.middleware.ts  # Error handling
│   ├── schemas/
│   │   ├── user.schema.ts       # Zod schemas
│   │   ├── transaction.schema.ts
│   │   └── ai.schema.ts
│   └── types/
│       └── index.ts             # TypeScript types
├── supabase/
│   └── migrations/
│       ├── 001_users.sql
│       ├── 002_transactions.sql
│       └── 003_fixed_expenses.sql
├── package.json
├── tsconfig.json
├── .env.example
├── Dockerfile
└── railway.json
```

## Database Schema (Supabase/PostgreSQL)

### Table: profiles
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  income DECIMAL(12,2),
  payday INTEGER CHECK (payday >= 1 AND payday <= 31),
  current_balance DECIMAL(12,2),
  savings_goal DECIMAL(12,2),
  currency TEXT DEFAULT 'NGN' CHECK (currency IN ('NGN', 'GBP')),
  has_onboarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can only access their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### Table: fixed_expenses
```sql
CREATE TABLE fixed_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  due_day INTEGER CHECK (due_day >= 1 AND due_day <= 31),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE fixed_expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own expenses" ON fixed_expenses
  FOR ALL USING (auth.uid() = user_id);
```

### Table: transactions
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(12,2) NOT NULL,
  category TEXT NOT NULL DEFAULT 'Uncategorized',
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own transactions" ON transactions
  FOR ALL USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_transactions_user_date ON transactions(user_id, date DESC);
```

### Table: conversation_history (optional, for pattern analysis)
```sql
CREATE TABLE conversation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  intent TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE conversation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own history" ON conversation_history
  FOR SELECT USING (auth.uid() = user_id);
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register new user (email/password) |
| POST | `/auth/login` | Login, returns JWT |
| POST | `/auth/logout` | Invalidate session |
| POST | `/auth/refresh` | Refresh JWT token |
| GET | `/auth/me` | Get current user |

### User Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/profile` | Get user profile |
| PUT | `/users/profile` | Update profile (income, payday, etc.) |
| POST | `/users/complete-onboarding` | Mark onboarding complete |
| DELETE | `/users/account` | Delete account and all data |

### Fixed Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/expenses` | List all fixed expenses |
| POST | `/users/expenses` | Add fixed expense |
| PUT | `/users/expenses/:id` | Update expense |
| DELETE | `/users/expenses/:id` | Delete expense |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/transactions` | List transactions (paginated) |
| POST | `/transactions` | Add transaction |
| GET | `/transactions/:id` | Get single transaction |
| DELETE | `/transactions/:id` | Delete transaction |
| GET | `/transactions/stats` | Get spending stats |

### AI Conversation
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai/transcribe` | Upload audio, get transcription |
| POST | `/ai/chat` | Send text, get AI response |
| POST | `/ai/voice` | Full voice flow (audio in, audio out) |
| POST | `/ai/onboarding` | Onboarding conversation step |
| GET | `/ai/tts` | Text-to-speech conversion |

## LangChain Integration

### Conversation Chain
```typescript
// src/services/ai/chains/conversation.chain.ts
import { ChatMistralAI } from "@langchain/mistralai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

export const createConversationChain = () => {
  const llm = new ChatMistralAI({
    model: "mistral-small-latest",
    temperature: 0.7,
  });

  // Intent classification chain
  const intentChain = RunnableSequence.from([
    intentPrompt,
    llm,
    outputParser,
  ]);

  // Response generation chain
  const responseChain = RunnableSequence.from([
    conversationPrompt,
    llm,
    outputParser,
  ]);

  return { intentChain, responseChain };
};
```

### Voice Processing Pipeline
```typescript
// src/services/ai/index.ts
export class AIOrchestrator {
  async processVoice(audioBuffer: Buffer, context: UserContext) {
    // 1. Transcribe with Whisper
    const text = await this.whisperTool.transcribe(audioBuffer);

    // 2. Classify intent
    const intent = await this.intentChain.invoke({ message: text });

    // 3. Generate response
    const response = await this.responseChain.invoke({
      intent,
      userMessage: text,
      ...context,
    });

    // 4. Generate speech (optional)
    const audioResponse = await this.elevenLabsTool.synthesize(response.text);

    return { text, response, audioResponse };
  }
}
```

## Implementation Phases

### Phase 1: Foundation (Core Setup)
1. Initialize Fastify project with TypeScript
2. Set up Supabase project and database schema
3. Implement auth middleware (JWT verification)
4. Create basic CRUD endpoints for profiles and transactions
5. Set up error handling and logging

### Phase 2: Data Sync
1. Implement user profile sync endpoints
2. Implement transaction sync with pagination
3. Implement fixed expenses CRUD
4. Add offline-first sync strategy (last-write-wins or conflict resolution)

### Phase 3: AI Orchestration
1. Set up LangChain with Mistral
2. Port onboarding prompts to LangChain templates
3. Port conversation prompts to LangChain templates
4. Implement Whisper transcription endpoint
5. Implement ElevenLabs TTS endpoint
6. Create full voice pipeline endpoint

### Phase 4: Mobile Integration
1. Create API client for React Native app
2. Update stores to sync with backend
3. Replace direct AI API calls with backend endpoints
4. Add auth flow (login/signup screens)
5. Handle offline mode gracefully

### Phase 5: Production Readiness
1. Add rate limiting
2. Add request validation (Zod schemas)
3. Set up monitoring (health checks, metrics)
4. Configure Railway deployment
5. Set up CI/CD pipeline

## Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# AI Services
OPENAI_API_KEY=sk-...
MISTRAL_API_KEY=...
ELEVENLABS_API_KEY=...
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM

# Optional
LOG_LEVEL=info
CORS_ORIGIN=*
```

## Mobile App Changes Required

### New Dependencies
```json
{
  "@supabase/supabase-js": "^2.x",
  "expo-secure-store": "~14.0.0"
}
```

### Store Updates
- Add `userId` to user store
- Add sync actions to push/pull from backend
- Store auth tokens in SecureStore
- Add sync status (synced/pending/error)

### New Screens
- `/auth/login.tsx` - Login screen
- `/auth/signup.tsx` - Signup screen
- `/auth/forgot-password.tsx` - Password reset

### API Client
```typescript
// services/api-client.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

export const api = {
  async chat(message: string) {
    const { data: { session } } = await supabase.auth.getSession();
    return fetch(`${API_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session?.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
  },
  // ... other methods
};
```

## Security Considerations

1. **API Keys**: All AI API keys stored server-side only
2. **Row Level Security**: Supabase RLS ensures users can only access their own data
3. **JWT Validation**: All protected routes verify JWT tokens
4. **Rate Limiting**: Prevent abuse of AI endpoints
5. **Input Validation**: Zod schemas validate all inputs
6. **HTTPS Only**: Railway provides automatic SSL

## Estimated File Count

| Category | Files |
|----------|-------|
| Config | 3 |
| Routes | 5 |
| Services | 8 |
| Middleware | 2 |
| Schemas | 3 |
| Types | 1 |
| Migrations | 4 |
| Root files | 6 |
| **Total** | **~32 files** |

## Next Steps

After plan approval:
1. Create `kora-backend/` directory structure
2. Initialize npm project with dependencies
3. Set up TypeScript configuration
4. Create Supabase migrations
5. Implement Phase 1 (Foundation)
6. Continue through remaining phases

---

**Ready for implementation?** Approve this plan to begin building the backend.
