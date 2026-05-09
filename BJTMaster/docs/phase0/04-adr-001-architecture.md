# ADR-001 — Architecture Decision Record
# BJT Master — Technical Architecture
> Phase 0 Deliverable | Created: 2026-05-10 | Updated: 2026-05-10
> Status: APPROVED — Local-first development, cloud deferred post-launch

---

## 0. Nguyên tắc ưu tiên chi phí (Cost Policy)

> **Quyết định của System Manager (2026-05-10)**:
> - Toàn bộ development dùng **free / local** — không phát sinh chi phí
> - Cloud services (AWS, Stripe, paid APIs) sẽ **đầu tư sau khi hoàn thiện app mobile**
> - AI Tutor dùng **mock response** khi dev, tích hợp Claude API khi launch

### Mapping: Production → Local Dev

| Production (post-launch) | Local Dev (hiện tại) | Chi phí local |
|--------------------------|----------------------|--------------|
| AWS RDS PostgreSQL | Docker: `postgres:16-alpine` | Free |
| AWS ElastiCache Redis | Docker: `redis:7-alpine` | Free |
| AWS S3 | Docker: MinIO | Free |
| AWS SES (email) | Docker: Mailhog | Free |
| AWS CloudFront CDN | localhost static | Free |
| AWS ECS / Lambda | `pnpm dev` local | Free |
| Claude API (AI Tutor) | Mock JSON response | Free |
| Stripe (payment) | Defer to post-launch | Free |
| Sentry (monitoring) | Console logs local | Free |
| Datadog APM | Defer | Free |
| Mixpanel Analytics | Defer | Free |
| App Store / Play Store | Expo Go / Dev build | Free |

---

## 1. Context & Constraints

| Constraint | Detail |
|------------|--------|
| **Team size** | 2 developers (Gemini + CodeX) + 1 architect (Claude) |
| **Timeline** | 24 tuần MVP |
| **Budget** | Startup, cost-sensitive — serverless/managed services ưu tiên |
| **Platform** | iOS + Android + Web |
| **Scale target** | 10,000 concurrent users Year 1 |
| **Data residency** | Nhật Bản (APPI compliance) → AWS ap-northeast-1 (Tokyo) |

---

## 2. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  Mobile (iOS)   │  │ Mobile (Android)│  │  Web (Next.js)  │  │
│  │  React Native   │  │  React Native   │  │ Admin + Landing │  │
│  │  Expo SDK 51    │  │  Expo SDK 51    │  │  Next.js 14     │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           └─────────────────────┼─────────────────────┘          │
└─────────────────────────────────┼────────────────────────────────┘
                                  │ HTTPS / REST
                    ┌─────────────▼─────────────┐
                    │       CloudFront CDN       │
                    │    + WAF (rate limiting)   │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │      API Gateway (AWS)     │
                    │    /api/v1/* routing       │
                    └──────┬──────────┬──────────┘
                           │          │
              ┌────────────▼───┐  ┌───▼────────────┐
              │  NestJS App    │  │  Lambda         │
              │  (ECS Fargate) │  │  (ai-service)   │
              │  auth, learn,  │  │  Claude API     │
              │  mock, content │  │  calls          │
              └────────┬───────┘  └───┬─────────────┘
                       │              │
         ┌─────────────┼──────────────┼──────────────┐
         │             │              │              │
    ┌────▼────┐   ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
    │  RDS    │   │ Redis   │   │   S3    │   │OpenSearch│
    │Postgres │   │(Cache + │   │(Audio + │   │(Vocab   │
    │  16+    │   │Leaderbd)│   │ Images) │   │ search) │
    └─────────┘   └─────────┘   └─────────┘   └─────────┘
```

---

## 3. Monorepo Structure

```
bjt/                              ← pnpm workspace root
├── apps/
│   ├── mobile/                   ← React Native (Expo)
│   │   ├── src/
│   │   │   ├── screens/          ← màn hình theo module
│   │   │   │   ├── auth/
│   │   │   │   ├── home/
│   │   │   │   ├── keigo/        ← A2 module
│   │   │   │   ├── reading/      ← B3 module
│   │   │   │   ├── vocab/        ← A1 module
│   │   │   │   ├── grammar/      ← A3 module
│   │   │   │   ├── listening/    ← B1 module (sau cùng)
│   │   │   │   ├── listening-reading/ ← B2 module
│   │   │   │   ├── mock-test/
│   │   │   │   ├── ai-tutor/
│   │   │   │   ├── profile/
│   │   │   │   └── subscription/
│   │   │   ├── components/       ← shared UI components (mobile-specific)
│   │   │   ├── navigation/       ← React Navigation setup
│   │   │   ├── stores/           ← Zustand stores
│   │   │   ├── hooks/            ← custom hooks
│   │   │   └── utils/
│   │   ├── app.json
│   │   └── package.json
│   │
│   ├── api/                      ← NestJS backend
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/
│   │   │   │   ├── user/
│   │   │   │   ├── content/      ← questions, vocab, keigo, grammar
│   │   │   │   ├── learning/     ← SRS, answers, progress
│   │   │   │   ├── mock-test/
│   │   │   │   ├── ai/
│   │   │   │   └── subscription/
│   │   │   ├── common/           ← interceptors, filters, decorators
│   │   │   ├── config/
│   │   │   └── main.ts
│   │   ├── migrations/
│   │   └── package.json
│   │
│   └── web/                      ← Next.js
│       ├── app/
│       │   ├── (marketing)/      ← landing, pricing, about
│       │   └── (admin)/          ← content management
│       └── package.json
│
├── packages/
│   ├── core/                     ← Business logic (no framework deps)
│   │   ├── src/
│   │   │   ├── srs.ts            ← SM-2 algorithm (TDD ≥90%)
│   │   │   ├── scoring.ts        ← BJT 0-800 scoring (TDD ≥90%)
│   │   │   ├── level-prediction.ts
│   │   │   └── weak-point.ts
│   │   └── package.json
│   │
│   ├── ui/                       ← Shared React Native components
│   │   ├── src/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ChoiceButton.tsx
│   │   │   ├── AudioPlayer.tsx
│   │   │   ├── JLevelBadge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── FuriganaText.tsx
│   │   └── package.json
│   │
│   ├── types/                    ← Shared TypeScript types
│   │   ├── src/
│   │   │   ├── user.ts
│   │   │   ├── question.ts
│   │   │   ├── srs.ts
│   │   │   ├── mock-test.ts
│   │   │   └── api.ts            ← Request/Response types
│   │   └── package.json
│   │
│   ├── i18n/                     ← Translation files
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   ├── ja.json
│   │   │   └── vi.json
│   │   └── package.json
│   │
│   └── config/                   ← Shared tool configs
│       ├── eslint-preset.js
│       ├── tsconfig.base.json
│       └── prettier.config.js
│
├── docs/
│   ├── phase0/                   ← deliverables này
│   ├── api/                      ← OpenAPI spec (auto-generated)
│   ├── adr/                      ← Architecture Decision Records
│   └── runbook/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                ← lint + test + build on PR
│       ├── deploy-staging.yml    ← auto deploy khi merge main
│       └── deploy-prod.yml       ← manual trigger
│
├── CLAUDE.md
├── package.json                  ← pnpm workspace config
└── turbo.json                    ← Turborepo pipeline
```

---

## 4. Technology Decisions

### ADR-001-A: React Native + Expo (không bare RN)

**Decision**: Dùng Expo SDK (managed workflow) thay vì bare React Native.

**Rationale**:
- EAS Build: cloud build iOS/Android không cần Mac local
- OTA updates: push fix nhỏ mà không cần store review
- expo-av: audio player tested, không phải tự config native
- expo-iap: IAP đơn giản hơn react-native-iap
- Team size nhỏ → tối ưu dev velocity

**Trade-off**: Nếu cần native module không có trong Expo → eject. Rủi ro thấp với use case của BJT Master.

---

### ADR-001-B: NestJS cho Backend (không Express thuần)

**Decision**: NestJS 10+ thay vì Express.js thuần.

**Rationale**:
- DI (Dependency Injection) → testable dễ hơn
- Module system → clear boundaries giữa domain
- Built-in: validation pipe, guard, interceptor → không phải tự viết middleware
- OpenAPI auto-generate từ decorators → API docs miễn phí
- TypeScript-first

**Trade-off**: Learning curve nếu dev chỉ biết Express. Overhead nhỏ cho simple endpoints. → Chấp nhận.

---

### ADR-001-C: PostgreSQL (không MongoDB/DynamoDB)

**Decision**: PostgreSQL 16+ trên AWS RDS.

**Rationale**:
- Relational data: users → subscriptions → sessions → answers → SRS reviews
- ACID transactions quan trọng cho payment + SRS state
- JSONB cho flexible fields (recommendations, event properties) mà không sacrifice query power
- pgvector extension (Phase 2): nếu cần AI similarity search
- Team familiar với SQL

**Trade-off**: Scaling write-heavy → cần read replicas ở Y2. Acceptable cho 10K MAU Y1.

---

### ADR-001-D: Zustand (không Redux)

**Decision**: Zustand cho client state management.

**Rationale**:
- Boilerplate ít hơn Redux 80%
- TypeScript inference tốt
- Không cần Provider wrapping
- Persist middleware: offline state dễ
- TanStack Query xử lý server state → Zustand chỉ cần UI state

**Trade-off**: DevTools kém hơn Redux DevTools. → Chấp nhận, team nhỏ.

---

### ADR-001-E: WatermelonDB cho Offline

**Decision**: WatermelonDB cho offline-first mobile data.

**Rationale**:
- Sync engine built-in (backend agnostic, dùng với NestJS API)
- SQLite dưới nền → fast query trên device
- Reactive queries → UI auto-update khi data change
- Battle-tested: dùng trong Nozbe, Hey

**Trade-off**: Setup phức tạp hơn AsyncStorage. Phù hợp với offline scope của BJT Master (SRS queue, practice câu hỏi, user progress).

---

### ADR-001-F: AI Service — Claude API (Anthropic)

**Decision**: Dùng Claude Sonnet cho AI tutor (explain + recommend).

**Rationale**:
- Hiểu tiếng Nhật tốt (Keigo, business context)
- Output quality cao cho explanation mode
- Prompt caching → giảm cost cho same question repeated
- Flexible multilingual (JP/EN/VI trong cùng prompt)

**Cost estimate**:
- Claude Sonnet: ~$3/1M input tokens, ~$15/1M output tokens
- Avg explain: ~500 input + ~300 output = ~$0.006/call
- Cache hit rate 80% → effective $0.001/call
- 10K users × 5 explains/day = 50K calls/day = $50/day → $1,500/tháng khi scale
- Free tier giới hạn 5 AI queries/user/day → control cost

**Implementation**: AWS Lambda (cold start không ảnh hưởng — explain chạy async sau khi user thấy result).

---

### ADR-001-G: Turbo Repo cho Monorepo

**Decision**: Turborepo cho monorepo task orchestration.

**Rationale**:
- Cache build artifacts → CI nhanh hơn 60%
- Remote cache → Gemini và CodeX chia sẻ cache
- Pipeline config đơn giản (turbo.json)
- pnpm workspace tích hợp tốt

---

## 5. API Design

### Base URL
```
Production:  https://api.bjtmaster.app/api/v1
Staging:     https://api.staging.bjtmaster.app/api/v1
```

### Authentication
```
Headers:
  Authorization: Bearer <access_token>   (JWT, 15 phút)
  X-Refresh-Token: <refresh_token>       (30 ngày, rotation)
  X-Platform: ios | android | web
  X-App-Version: 1.0.0
```

### Response Format
```json
// Success
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "cursor": "eyJpZCI6I..."
  }
}

// Error
{
  "error": {
    "code": "QUESTION_NOT_FOUND",
    "message": "Question with id xxx not found",
    "details": {}
  }
}
```

### Key Endpoints (MVP)

```
AUTH
  POST /auth/sign-up
  POST /auth/sign-in
  POST /auth/refresh
  POST /auth/sign-out
  POST /auth/oauth/google
  POST /auth/oauth/apple
  POST /auth/forgot-password
  POST /auth/reset-password

USER
  GET  /users/me
  PATCH /users/me
  GET  /users/me/stats

CONTENT (authenticated)
  GET  /questions?section=reading&level=J3&limit=10
  GET  /vocab?topic=meeting&level=J2&limit=20
  GET  /grammar?level=J2&limit=20
  GET  /keigo?situation=phone&level=J3

LEARNING
  POST /learning/answers          (submit câu trả lời)
  GET  /learning/srs/queue        (daily SRS queue)
  POST /learning/srs/review       (submit SRS quality 0-5)
  GET  /learning/progress
  GET  /learning/weak-areas

MOCK TEST
  POST /mock-tests/sessions               (start)
  GET  /mock-tests/sessions/:id
  PATCH /mock-tests/sessions/:id/answers  (auto-save)
  POST /mock-tests/sessions/:id/submit
  GET  /mock-tests/history

AI
  POST /ai/explain              (explain đáp án)
  GET  /ai/recommendations      (suggested modules)

SUBSCRIPTION
  GET  /subscriptions/plans
  POST /subscriptions/verify-receipt  (iOS/Android IAP)
  POST /subscriptions/stripe/create-session
  GET  /subscriptions/me
  POST /subscriptions/cancel
```

---

## 6. Infrastructure

### AWS Services Used

| Service | Purpose | Tier |
|---------|---------|------|
| ECS Fargate | Run NestJS containers | t3.small × 2 (auto-scale) |
| RDS PostgreSQL | Primary database | db.t3.medium, Multi-AZ |
| ElastiCache Redis | Cache + leaderboard | cache.t3.micro |
| S3 | Audio, images, exports | Standard |
| CloudFront | CDN for S3 + API | |
| WAF | Rate limiting, OWASP rules | |
| Lambda | AI service (ai-service) | 512MB, 30s timeout |
| API Gateway | Route to ECS/Lambda | |
| SES | Transactional emails | |
| SNS + FCM/APNs | Push notifications | |
| Secrets Manager | API keys, DB passwords | |
| CloudWatch | Logs + Alarms | |

### Cost Estimate (MVP, ~1K users)

| Service | Est. Monthly |
|---------|-------------|
| RDS db.t3.medium | $50 |
| ECS Fargate (2 tasks) | $30 |
| ElastiCache cache.t3.micro | $15 |
| S3 + CloudFront (1TB) | $25 |
| Lambda (AI service) | $10 |
| API Gateway | $5 |
| Claude API (1K users × 5/day) | $150 |
| **Total** | **~$285/month** |

Break-even: ~30 Premium users ($9/mo) = $270 → viable từ sớm.

---

## 7. CI/CD Pipeline

```
Developer push → GitHub PR
  ↓
GitHub Actions: ci.yml
  [1] pnpm install (cached)
  [2] Turborepo: lint all packages
  [3] Turborepo: typecheck all packages
  [4] Turborepo: test (unit + integration)
  [5] EAS build check (mobile)
  [6] Next.js build check (web)
  → PR comment: test results + coverage

Merge to main
  ↓
GitHub Actions: deploy-staging.yml
  [1] Build Docker image (api)
  [2] Push to ECR
  [3] ECS deploy (rolling update)
  [4] EAS Update (OTA for mobile staging)
  [5] Notify Slack

Manual trigger (release)
  ↓
GitHub Actions: deploy-prod.yml
  [1] Same as staging
  [2] EAS Submit (App Store + Play Store)
  [3] Create GitHub Release
  [4] Notify team
```

---

## 8. Security Architecture

```
Layer 1 — Edge (CloudFront + WAF):
  - Rate limiting: 100 req/min/IP (login: 5/min)
  - OWASP Core Rule Set
  - Geo-blocking nếu cần

Layer 2 — API Gateway:
  - JWT validation (trước khi forward tới ECS)
  - Request size limit: 1MB

Layer 3 — Application (NestJS):
  - Zod validation tất cả input
  - Role-based guard (user / admin)
  - SQL: TypeORM parameterized queries (không string concat)
  - Helmet.js headers

Layer 4 — Data:
  - RDS: VPC private subnet, không public
  - Secrets: AWS Secrets Manager (không .env trong container)
  - Encryption at rest: RDS + S3 + ElastiCache

Monitoring:
  - Sentry: error tracking (mobile + API)
  - Datadog: APM, metrics, alerts
  - Alert on: p95 > 2s, error rate > 1%, failed payments
```

---

## 9. Offline Architecture (Mobile)

```
WatermelonDB (local SQLite)
  ├── vocab_items         ← sync toàn bộ vocab (500 records, ~2MB)
  ├── keigo_items         ← sync toàn bộ keigo (150 records)
  ├── grammar_items       ← sync toàn bộ grammar
  ├── cached_questions    ← 50 câu practice mới nhất
  ├── srs_reviews         ← local SRS state (sync 2-way)
  └── pending_answers     ← answers khi offline, sync khi online

Sync strategy:
  - Vocab/grammar/keigo: full sync khi install + weekly incremental
  - SRS reviews: bidirectional sync, conflict resolution: server wins
  - Pending answers: upload queue, retry on reconnect
  - Images/audio: CDN cache (CloudFront Cache-Control: max-age=86400)

Offline indicators:
  - S-SYS-01 offline banner (NetworkInfo listener)
  - Disable features needing server: AI explain, mock test submit
  - Queue actions và notify user "Sẽ đồng bộ khi có mạng"
```

---

## 10. Approval Required

Trước khi bắt đầu Sprint 3 (Phase 1), cần System Manager confirm:

| Decision | Option A | Option B | Recommend |
|---------|---------|---------|----------|
| Expo tier | Managed (nhanh) | Bare RN (flexible) | **Managed** |
| Backend hosting | ECS Fargate | App Runner | **ECS Fargate** |
| AI model | Claude Sonnet | GPT-4o | **Claude Sonnet** |
| DB backup | Daily snapshot | PITR (Point-in-time) | **PITR** ($+15/mo) |
| Analytics | Mixpanel | Amplitude | **Mixpanel** ($0 free tier) |

---

## 11. Local Development Setup

### Yêu cầu máy

```
- Docker Desktop (Windows/Mac/Linux)
- Node.js 20+ + pnpm 9+
- Expo Go app trên điện thoại (test mobile)
```

### Khởi động môi trường local

```bash
# 1. Clone repo + install
git clone <repo>
cd bjt
pnpm install

# 2. Copy env
cp .env.example .env.local
# (sửa secret nếu cần, defaults là đủ cho dev)

# 3. Start Docker services (DB + Redis + MinIO + Mailhog)
docker compose up -d

# Kiểm tra đang chạy:
docker compose ps

# 4. Chạy migration
pnpm --filter api migration:run

# 5. Seed data (keigo + vocab + câu hỏi mẫu)
pnpm --filter api seed:dev

# 6. Start dev servers (tất cả cùng lúc)
pnpm dev
# → API:    http://localhost:3000
# → Admin:  http://localhost:3001
# → Mobile: Expo QR code (scan bằng Expo Go)
```

### Local service URLs

| Service | URL | Dùng để |
|---------|-----|---------|
| API (NestJS) | http://localhost:3000 | Backend |
| API Docs | http://localhost:3000/api/docs | Swagger UI |
| Admin Web | http://localhost:3001 | Upload content |
| MinIO Console | http://localhost:9001 | Xem audio/image |
| Mailhog | http://localhost:8025 | Xem email gửi đi |
| pgAdmin | http://localhost:5050 | Xem DB (optional) |
| Design Prototype | file://docs/design/index.html | Xem mockups |

### AI Tutor — Mock Mode

Khi `AI_MOCK_MODE=true` (default trong `.env.local`), AI service trả về response cố định từ file `apps/api/src/modules/ai/mock-responses/`:

```
mock-responses/
├── explain-sonkeigo.json
├── explain-reading-vocab.json
├── explain-keigo-trap.json
└── recommend-default.json
```

→ Khi sẵn sàng tích hợp Claude API: set `AI_MOCK_MODE=false` + điền `ANTHROPIC_API_KEY`.

---

**Status**: APPROVED (Local-first). Cloud migration plan documented in Section 6 — execute post-launch.
