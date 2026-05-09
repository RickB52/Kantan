# CLAUDE.md — BJT Master / プロジェクト憲章

> **Project**: BJT Master — Business Japanese Proficiency Test Training App
> **Version**: v1.1
> **Last updated**: 2026-05-10
> **Owner**: System Manager (Approver) | Claude (Tech Lead/Architect) | Gemini & CodeX (Developers)
> **Repo path**: `D:\Dynh\BJT`
> **App name (confirmed)**: **BJT Master**
> **Kick-off**: 2026-05-10 (ngày mai)

---

## 0. Cách dùng tài liệu này (Đọc trước khi làm gì)

`CLAUDE.md` là **single source of truth** cho dự án. Mọi quyết định khác phải khớp với file này; nếu lệch, sửa file này trước rồi mới code.

### 0.1. Cơ chế làm việc giữa các vai trò

```
┌─────────────────────────────────────────────────────────────┐
│  System Manager (User)                                       │
│  • Định hướng business, ngân sách, scope cuối cùng           │
│  • Approve mọi deliverable lớn (design, sprint plan, release)│
│  • Quyết định khi có conflict không tự giải quyết được       │
└──────────────────┬──────────────────────────────────────────┘
                   │ Approve / Feedback
                   ▼
┌─────────────────────────────────────────────────────────────┐
│  Claude (Tech Lead / Architect / Bộ não)                     │
│  • Define phương châm, kiến trúc, convention                 │
│  • Thiết kế tổng thể (DB, API, UI/UX flow)                   │
│  • Chia task cho Gemini & CodeX (2 luồng song song)          │
│  • Review code/output, đảm bảo chất lượng                    │
│  • Tổng hợp báo cáo cho System Manager                       │
└────────┬───────────────────────────┬────────────────────────┘
         │ Task A                     │ Task B
         ▼                            ▼
┌──────────────────┐         ┌──────────────────┐
│  Gemini (Dev #1) │         │  CodeX (Dev #2)  │
│  • Coding task A │         │  • Coding task B │
│  • Unit test     │         │  • Unit test     │
│  • Self-review   │         │  • Self-review   │
└──────────────────┘         └──────────────────┘
```

### 0.1b. Dispatch command (Kantan multi-agent system)

```powershell
# Chạy từ D:\Dynh\Claude-Gemini
powershell -ExecutionPolicy Bypass -File ".\scripts\assign.ps1" `
    -Engineers <codex|geminiultra|codex,geminiultra> -Project bjtmaster
```

Task files: `D:\Dynh\Claude-Gemini\current\task-{worker}-bjtmaster.md`
⚠️ Overwrite task file cũ trước khi dispatch — tránh chạy nhầm task session trước!

Workers:
- **CodeX** (`codex`) → NestJS API endpoints, unit logic, fix nhỏ, precision
- **GeminiUltra** (`gemini`) → Multi-file scaffold, Next.js pages, DB schema, heavy token

Full multi-agent spec: `D:\Kantan\CLAUDE.md` → section 🧠 Multi-Agent

---

### 0.2. Nguyên tắc giao task (Claude → Gemini/CodeX)

1. **Task phải độc lập**: 2 task song song không được đụng cùng file/module để tránh merge conflict.
2. **Task phải có**: Mục tiêu • Input • Output expected • Acceptance criteria • Test cases tối thiểu.
3. **Estimate đi kèm**: Đơn vị 人日 (người-ngày) để tracking.
4. **Review checklist**: Code phải pass checklist Section 5 trước khi merge.

### 0.3. Quy tắc giao tiếp & báo cáo (報・連・相)

- **報 (Báo cáo)**: Cuối mỗi sprint → Claude tổng hợp → System Manager.
- **連 (Liên lạc)**: Daily 1 lần (Gemini/CodeX → Claude) trong sprint.
- **相 (Xin ý kiến)**: Khi blocker > 0.5 ngày → escalate ngay, không chờ daily.
- **Không surprise**: Bad news báo sớm + có 2 option phương án xử lý.

### 0.4. Quy tắc cập nhật `CLAUDE.md`

- Bất kỳ thay đổi nào về scope/architecture/convention → Claude cập nhật file này → System Manager approve → toàn team đọc lại.
- Mỗi lần update: tăng version (v1.0 → v1.1 → ...) và ghi changelog ở Section 11.

---

## 1. Tổng quan dự án (プロジェクト概要)

### 1.1. Bối cảnh (背景)

BJT (Business Japanese Proficiency Test) là kỳ thi do Japan Kanji Aptitude Testing Foundation tổ chức, đo năng lực tiếng Nhật thương mại thực dụng. Đặc điểm:

- **Cấu trúc**: 3 phần — Listening (聴解) ~45 phút • Listening & Reading (聴読解) ~30 phút • Reading (読解) ~30 phút.
- **Tổng thời gian**: ~105 phút, ~80 câu, format trắc nghiệm 4 lựa chọn, CBT qua Pearson VUE.
- **Thang điểm**: 0–800 (không pass/fail), 6 rank J5 → J1+ (J1+ cao nhất).
- **Giá trị**: Đạt ≥480 điểm được +15 điểm trong "Highly Skilled Foreign Professionals" của Japan Immigration; ≥400 điểm tương đương yêu cầu visa Engineer/Specialist mới (CEFR B2).

**Vấn đề hiện tại của thị trường**:
- Tài liệu BJT chính thức ít, đề thi mẫu giới hạn.
- Các app JLPT đang dẫn đầu (Bunpro, WaniKani, Renshuu, JLPTLord) nhưng **chưa có app chuyên BJT** — đây chính là khoảng trống thị trường.
- Người học cần luyện đặc biệt: nghe hiểu cuộc họp/điện thoại, đọc email/báo cáo doanh nghiệp, biểu đồ kinh doanh, keigo (敬語) thực dụng.

### 1.2. Mục tiêu dự án (目的)

| # | Mục tiêu | KPI |
|---|---------|-----|
| 1 | Xây app training BJT đầu tiên trên thị trường có đầy đủ 3 section (聴解 / 聴読解 / 読解) | MVP launch trong Q3 |
| 2 | Bám sát format đề thi thật, có mock test full 105 phút | ≥3 mock test full + 500+ câu practice |
| 3 | Nội dung doanh nghiệp thực tế (keigo, email, meeting, biểu đồ) | Phủ J5–J1+ |
| 4 | Trải nghiệm học cá nhân hóa (SRS + AI tutor) | Daily streak ≥30%, retention M2 ≥40% |
| 5 | Monetize bền vững | Free trial → Premium (subscription) |

### 1.3. Target user (ターゲット)

- **Primary**: Người đi làm/sinh viên đã có nền JLPT N3 trở lên, cần BJT cho công việc/visa Nhật.
- **Secondary**: Comtor/PM/IT đang làm với khách Nhật muốn nâng business Japanese.
- **Tertiary**: Sinh viên ngành tiếng Nhật thương mại tại VN/CN/HQ/Đông Nam Á.

### 1.4. Scope (スコープ)

**In scope (MVP)**:
- 3 section practice (聴解 / 聴読解 / 読解)
- Vocabulary (business keywords) + Grammar (business expressions) modules
- Mock test full + chấm điểm tự động + level prediction (J5–J1+)
- SRS (Spaced Repetition System) cho từ vựng/grammar
- Học progress tracking, daily streak, leaderboard
- AI tutor (giải thích đáp án, gợi ý điểm yếu)
- Multi-platform: iOS + Android (React Native), Web (responsive)
- Multi-language UI: Tiếng Nhật + Anh + Việt (i18n từ đầu)
- Subscription (Free / Premium) + payment (in-app + Stripe web)

**Out of scope (Phase 2 trở đi)**:
- Speaking practice (BJT không có speaking, nhưng sẽ thêm để tăng giá trị)
- Live tutor/1-on-1 với giáo viên thật
- Corporate plan (B2B)
- VR/AR immersion

### 1.5. Tham chiếu thị trường (Benchmark)

| App | Điểm mạnh để học hỏi | Điểm tránh |
|-----|----------------------|-----------|
| **Bunpro** | Grammar SRS theo level, AI explain | UI đơn điệu |
| **WaniKani** | Mnemonic + radical learning kanji rất sâu | Chỉ tập trung kanji |
| **Renshuu** | All-in-one, gamification dễ thương | UI rối, settings quá nhiều |
| **JLPTLord** | SRS aligned theo JLPT level chuẩn | Không có grammar/listening |
| **Duolingo Max** | Gamification + AI roleplay | Không sâu cho JLPT/BJT |
| **Todaii** | Real news với furigana toggle, JLPT tag | Reading-only |

→ **Định hướng app ta**: Lấy điểm mạnh Bunpro (SRS grammar) + Renshuu (gamification) + Duolingo Max (AI conversation) + đặc thù BJT (mock test thật, business context, biểu đồ/email/meeting).

---

## 2. Phương châm dự án (プロジェクト方針)

### 2.1. Phương châm sản phẩm (プロダクト方針)

1. **Authentic over fancy** — Nội dung sát đề thi BJT thật, không "fake business" như nhiều app khác.
2. **Mobile-first, offline-friendly** — Dân đi làm Nhật học trên tàu điện → offline mode bắt buộc cho practice.
3. **Adaptive learning** — Hệ thống nhận diện điểm yếu người học, đề xuất bài học cá nhân hóa.
4. **Gamification có chủ ý** — Streak, XP, badge — nhưng không làm loãng việc học (tránh lỗi của Duolingo).
5. **Privacy-first** — Không bán dữ liệu, không ad bên thứ 3 trong trải nghiệm học.

### 2.2. Phương châm kỹ thuật (技術方針)

1. **Cross-platform với codebase chung** — React Native + Web (Next.js) chia sẻ business logic qua TypeScript shared package.
2. **API-first** — Backend là REST + GraphQL, mọi client (mobile/web/admin) dùng chung.
3. **Cloud-native, serverless first** — AWS Lambda/API Gateway/DynamoDB/S3 cho cost optimization và scaling.
4. **CI/CD ngày 1** — Setup pipeline trước khi viết feature đầu tiên.
5. **Test-driven cho core logic** — Scoring engine, SRS algorithm bắt buộc TDD.
6. **i18n từ đầu** — Không hardcode string tiếng Anh/Nhật/Việt.
7. **Accessibility** — WCAG 2.1 AA cho web, Mobile A11y cho RN.

### 2.3. Phương châm vận hành (運用方針)

1. **Sprint 2 tuần** — Đủ ngắn để feedback nhanh, đủ dài để có deliverable.
2. **Demo cuối sprint** — Bắt buộc, không có demo = task chưa Done.
3. **Definition of Done rõ ràng** — Section 5.4 quy định.
4. **Risk log update tuần** — Section 10.

---

## 3. Master Schedule (マスタースケジュール)

### 3.1. Phase tổng thể

Tổng thời gian: **6 tháng** (24 tuần) cho MVP. Tính từ tuần đầu là **Tuần 1**.

```
Tháng 1   Tháng 2   Tháng 3   Tháng 4   Tháng 5   Tháng 6
─────────────────────────────────────────────────────────
[Phase 0: Discovery & Design]
  Tuần 1-3
        [Phase 1: Foundation]
          Tuần 4-7
                [Phase 2: Core Learning]
                  Tuần 8-13
                        [Phase 3: Mock Test & AI]
                          Tuần 14-17
                              [Phase 4: Polish & Launch Prep]
                                Tuần 18-22
                                    [Phase 5: Launch]
                                      Tuần 23-24
```

### 3.2. Bảng Master Schedule chi tiết

| Phase | Tuần | Tên Phase | Mục tiêu chính | Deliverable | Milestone |
|-------|------|-----------|----------------|-------------|-----------|
| **0** | 1–3 | Discovery & Design | Hiểu BJT, design UX/UI, kiến trúc | Spec book, Figma, Architecture doc | M0: Design Approved |
| **1** | 4–7 | Foundation | Setup infra, auth, base UI | Working skeleton: login, navigation, DB | M1: Skeleton Demo |
| **2** | 8–13 | Core Learning | 3 section practice + SRS + Vocab/Grammar | Practice mode chạy được full | M2: Practice MVP |
| **3** | 14–17 | Mock Test & AI | Mock test full, AI tutor, scoring engine | Mock test 105 phút + auto scoring | M3: Mock Test Demo |
| **4** | 18–22 | Polish & Launch Prep | Bug fix, perf, payment, store submission | Beta release, store listing | M4: Beta Ready |
| **5** | 23–24 | Launch | Production deploy, marketing prep | v1.0 live | M5: Production Launch |

### 3.3. Milestone & Approval Gate

Mỗi milestone là **gate cứng** — System Manager phải approve mới sang phase tiếp.

| Milestone | Tuần | Approval Criteria | Người approve |
|-----------|------|-------------------|---------------|
| M0: Design Approved | End W3 | Figma full flow + Spec book + Tech architecture được duyệt | System Manager |
| M1: Skeleton Demo | End W7 | App chạy được, login, navigate, DB connect | System Manager |
| M2: Practice MVP | End W13 | 3 section practice hoạt động, có ít nhất 100 câu sample | System Manager |
| M3: Mock Test Demo | End W17 | Mock test full chạy + auto scoring + AI tutor cơ bản | System Manager |
| M4: Beta Ready | End W22 | Pass beta test (≥30 user), bug critical = 0 | System Manager |
| M5: Production Launch | End W24 | Store approve, monitoring xanh 72h | System Manager |

### 3.4. Risk buffer

- Mỗi phase: **+15% buffer** (đã include trong số tuần ở 3.2).
- Buffer chung dự án: thêm **2 tuần** (Tuần 25–26) để absorb scope creep / store rejection.

---

## 4. Sprint Plan (スプリント計画)

### 4.1. Quy tắc Sprint

- **Độ dài**: 2 tuần / sprint → 12 sprint cho 24 tuần.
- **Sprint event** (timezone JST):
  - Mon Tuần 1: Sprint Planning (90 phút) — Claude chia task cho Gemini/CodeX.
  - Daily standup: 15 phút (text-based, qua Slack/Teams) — Gemini/CodeX → Claude.
  - Wed Tuần 2: Mid-sprint check (30 phút) — Claude review progress.
  - Fri Tuần 2: Sprint Demo + Retrospective (60 phút) — Demo cho System Manager.
- **Capacity**: 2 dev × 10 ngày × ~6h hiệu quả = **~120 giờ/sprint** (≈ 15 人日).
- **Reserve 20%** cho code review, bug fix, support → Effective output ≈ **12 人日/sprint**.

### 4.2. Sprint Backlog tổng thể

| Sprint | Tuần | Theme | Gemini Track (Task A) | CodeX Track (Task B) | Sprint Goal |
|--------|------|-------|----------------------|----------------------|-------------|
| **S1** | 1–2 | Discovery | Research user, BJT spec, competitor analysis | UX wireframe sơ bộ (Lo-fi) | Hiểu domain, có wireframe sơ bộ |
| **S2** | 3 | Design | Hi-fi Figma + Design system (color/typo) | Tech architecture + DB schema design | Design + Architecture approved (M0) |
| **S3** | 4–5 | Foundation A | Setup mono-repo, CI/CD pipeline | Auth module (signup/login/social) | Repo + auth chạy |
| **S4** | 6–7 | Foundation B | Navigation + i18n (3 languages) + base UI components | User profile + onboarding flow | Skeleton chạy được (M1) |
| **S5** | 8–9 | Content Engine | Content management backend (admin upload câu hỏi) | Vocabulary module (list + flashcard SRS) | Có 100 câu hỏi mẫu trong DB + flashcard chạy |
| **S6** | 10–11 | Practice 1 | 読解 (Reading) practice screen | 聴解 (Listening) practice screen + audio player | 2 section reading & listening chạy được |
| **S7** | 12–13 | Practice 2 | 聴読解 (Listening & Reading) screen | Grammar module + progress tracking | Đủ 3 section + Grammar (M2) |
| **S8** | 14–15 | Mock Test | Mock test framework (timer 105 phút, save/resume) | Scoring engine (0–800 + J5–J1+ rank) | Mock test full chạy được |
| **S9** | 16–17 | AI Tutor | AI explain answer (LLM integration) | Weak point analysis + recommendation engine | AI tutor demo (M3) |
| **S10** | 18–19 | Gamification + Payment | Streak, XP, badge, leaderboard | Subscription (Stripe + IAP iOS/Android) | Có thể trả phí |
| **S11** | 20–21 | Polish | Performance optimize + offline mode | Bug fix from internal QA + i18n review | Beta ready candidate |
| **S12** | 22 | Beta + Store Prep | Beta test với 30 user, fix critical | Store listing (App Store + Google Play) | Beta release (M4) |
| **S13** | 23–24 | Launch | Production deploy + monitoring setup | Marketing landing + onboarding email | v1.0 Live (M5) |

> Note: S2 chỉ 1 tuần (W3) vì là design sprint ngắn. S12 cũng 1 tuần (W22). Tổng = 24 tuần.

### 4.3. Sprint chi tiết — Sample (S5: Content Engine)

Để minh hoạ format chi tiết tôi dùng cho các sprint. Format này áp dụng cho mọi sprint khác.

```
Sprint 5 — Content Engine
Period: Tuần 8–9 (10 working days)
Capacity: 12 人日 effective

Sprint Goal:
Có hệ thống quản lý câu hỏi (admin nhập được câu hỏi 3 section)
+ Vocabulary module với SRS flashcard chạy trên app.

────────────────────────────────────────────────
Track A — Gemini: Content Management Backend
────────────────────────────────────────────────
Tasks:
  A1. Schema thiết kế bảng questions (3 section, 4 đáp án)  — 1人日
  A2. CRUD API cho admin (create/update/delete question)    — 2人日
  A3. Bulk import từ CSV/JSON                                — 1.5人日
  A4. Admin web UI cho upload (Next.js)                      — 2人日
  A5. Unit test + integration test                           — 1人日
  A6. Seed 100 câu mẫu                                       — 0.5人日
Total: 8 人日

Acceptance:
  ✓ Admin login → upload CSV 100 câu → câu hỏi hiển thị trên app
  ✓ Test coverage ≥80%
  ✓ Postman collection delivered

────────────────────────────────────────────────
Track B — CodeX: Vocabulary + SRS
────────────────────────────────────────────────
Tasks:
  B1. SRS algorithm (SM-2 modified)                          — 1.5人日
  B2. Vocab data model + API (GET/POST review result)        — 1人日
  B3. Flashcard screen (Tap to flip + audio play)            — 2人日
  B4. Daily review queue logic                               — 1人日
  B5. Progress saving (offline-capable, sync khi online)     — 1.5人日
  B6. Unit test SRS algorithm (TDD)                          — 1人日
Total: 8 人日

Acceptance:
  ✓ User học 20 từ → review schedule tự động cho ngày sau
  ✓ Offline review chạy được, sync khi online
  ✓ SRS test cover ≥90%

────────────────────────────────────────────────
Cross-team / Claude:
  C1. Code review (5h)
  C2. Sprint demo prep (3h)
  C3. Update CLAUDE.md nếu cần
────────────────────────────────────────────────

Risk:
  ⚠️ R-S5-1: SRS algorithm phức tạp → buffer +0.5人日 cho B1
  ⚠️ R-S5-2: Audio playback lỗi platform → test sớm trên cả iOS/Android

Definition of Done:
  □ Code merged to main
  □ CI passed
  □ Unit test ≥80% (general) / ≥90% (core algorithm)
  □ Demo video 3 phút
  □ Updated documentation
```

### 4.4. Velocity tracking

| Sprint | Plan (人日) | Actual | Variance | Status | Note |
|--------|-------------|--------|----------|--------|------|
| S1 | 12 | TBD | - | ⚪ | |
| S2 | 6 | TBD | - | ⚪ | Design sprint ngắn |
| S3–13 | 12 each | TBD | - | ⚪ | Steady state |

→ Cập nhật weekly.

---

## 5. Requirement Spec tổng thể (要件定義)

### 5.1. Functional Requirements (機能要件)

| ID | Module | Requirement | Priority | Phase |
|----|--------|-------------|----------|-------|
| **FR-AUTH** | Authentication |  |  |  |
| FR-AUTH-01 | Auth | Đăng ký bằng email + password | MUST | P1 |
| FR-AUTH-02 | Auth | Đăng nhập Google / Apple / LINE (Nhật) | MUST | P1 |
| FR-AUTH-03 | Auth | Quên mật khẩu (email reset link) | MUST | P1 |
| FR-AUTH-04 | Auth | Đăng xuất, xoá tài khoản (GDPR/APPI) | MUST | P1 |
| **FR-USER** | User Profile |  |  |  |
| FR-USER-01 | User | Xem/sửa profile (tên, avatar, target rank) | MUST | P1 |
| FR-USER-02 | User | Setting ngôn ngữ UI (JP/EN/VI) | MUST | P1 |
| FR-USER-03 | User | Theme (light/dark/auto) | SHOULD | P1 |
| FR-USER-04 | User | Notification setting (daily reminder time) | SHOULD | P2 |
| **FR-LEARN** | Core Learning |  |  |  |
| FR-LEARN-01 | Learn | Practice 聴解 (Listening) — câu hỏi audio + 4 lựa chọn | MUST | P2 |
| FR-LEARN-02 | Learn | Practice 聴読解 (Listening + Reading) — audio + biểu đồ/text | MUST | P2 |
| FR-LEARN-03 | Learn | Practice 読解 (Reading) — đoạn văn + câu hỏi | MUST | P2 |
| FR-LEARN-04 | Learn | Vocabulary module (business keywords J5–J1+) | MUST | P2 |
| FR-LEARN-05 | Learn | Grammar module (business expressions) | MUST | P2 |
| FR-LEARN-06 | Learn | SRS flashcard cho vocab/grammar | MUST | P2 |
| FR-LEARN-07 | Learn | Filter câu hỏi theo level (J5→J1+), topic | SHOULD | P2 |
| FR-LEARN-08 | Learn | Bookmark/flag câu sai để review sau | SHOULD | P2 |
| FR-LEARN-09 | Learn | Audio playback (1.0x / 1.25x / 1.5x speed) | MUST | P2 |
| FR-LEARN-10 | Learn | Furigana toggle on/off | SHOULD | P2 |
| **FR-MOCK** | Mock Test |  |  |  |
| FR-MOCK-01 | Mock | Mock test full 105 phút (3 section liên tục) | MUST | P3 |
| FR-MOCK-02 | Mock | Mini test (1 section riêng) | SHOULD | P3 |
| FR-MOCK-03 | Mock | Timer + auto submit khi hết giờ | MUST | P3 |
| FR-MOCK-04 | Mock | Save & resume (nếu app crash) | MUST | P3 |
| FR-MOCK-05 | Mock | Auto scoring (0–800) + level prediction (J5–J1+) | MUST | P3 |
| FR-MOCK-06 | Mock | Detailed result: % theo section, top weak area | MUST | P3 |
| FR-MOCK-07 | Mock | Lịch sử mock test, biểu đồ tiến bộ | SHOULD | P3 |
| **FR-AI** | AI Tutor |  |  |  |
| FR-AI-01 | AI | Giải thích đáp án bằng ngôn ngữ user (JP/EN/VI) | MUST | P3 |
| FR-AI-02 | AI | Phân tích điểm yếu sau mock test | MUST | P3 |
| FR-AI-03 | AI | Đề xuất bài học cá nhân hoá | SHOULD | P3 |
| FR-AI-04 | AI | Hỏi ngữ pháp tự do (chat) | COULD | P3 |
| **FR-GAME** | Gamification |  |  |  |
| FR-GAME-01 | Game | Daily streak + reminder | MUST | P4 |
| FR-GAME-02 | Game | XP system + level up | MUST | P4 |
| FR-GAME-03 | Game | Achievement badges (≥20 badge) | SHOULD | P4 |
| FR-GAME-04 | Game | Weekly leaderboard (opt-in) | COULD | P4 |
| **FR-PAY** | Subscription |  |  |  |
| FR-PAY-01 | Pay | Free tier (giới hạn 5 câu/ngày) | MUST | P4 |
| FR-PAY-02 | Pay | Premium tier (unlimited + AI tutor) | MUST | P4 |
| FR-PAY-03 | Pay | In-app purchase (iOS/Android) | MUST | P4 |
| FR-PAY-04 | Pay | Stripe (web) | MUST | P4 |
| FR-PAY-05 | Pay | Quản lý subscription (cancel/restore) | MUST | P4 |
| **FR-OFF** | Offline |  |  |  |
| FR-OFF-01 | Offline | Practice offline (cache 50 câu mới nhất) | MUST | P4 |
| FR-OFF-02 | Offline | Sync progress khi online lại | MUST | P4 |
| **FR-ADM** | Admin |  |  |  |
| FR-ADM-01 | Admin | Dashboard số liệu user/revenue | MUST | P2 |
| FR-ADM-02 | Admin | CRUD câu hỏi 3 section | MUST | P2 |
| FR-ADM-03 | Admin | Bulk import (CSV/JSON) | MUST | P2 |
| FR-ADM-04 | Admin | Quản lý user (suspend/refund) | SHOULD | P4 |

> **Priority**: MUST (MVP) > SHOULD (nice-to-have, có thì thêm) > COULD (Phase 2).
> **Phase**: P1 (Foundation) / P2 (Core) / P3 (Mock+AI) / P4 (Polish).

### 5.2. Non-Functional Requirements (非機能要件)

| ID | Category | Requirement | Target |
|----|---------|-------------|--------|
| NFR-PERF-01 | Performance | Cold start time | <3s on mid-range device |
| NFR-PERF-02 | Performance | Screen transition | <300ms |
| NFR-PERF-03 | Performance | Audio play latency | <500ms |
| NFR-PERF-04 | Performance | API response (p95) | <800ms |
| NFR-SCALE-01 | Scalability | Concurrent users | 10,000 (Year 1 target) |
| NFR-SEC-01 | Security | Password storage | bcrypt cost ≥12 |
| NFR-SEC-02 | Security | API auth | JWT + refresh token |
| NFR-SEC-03 | Security | HTTPS only | TLS 1.2+ |
| NFR-SEC-04 | Security | OWASP Top 10 compliance | Pass automated scan |
| NFR-PRIV-01 | Privacy | Data residency | AWS Tokyo region |
| NFR-PRIV-02 | Privacy | GDPR + APPI compliant | Privacy policy + data export |
| NFR-AVAIL-01 | Availability | Uptime SLA | 99.5% |
| NFR-LOC-01 | Localization | Languages | JP / EN / VI |
| NFR-A11Y-01 | Accessibility | Web WCAG | 2.1 AA |
| NFR-A11Y-02 | Accessibility | Mobile A11y | iOS VoiceOver + Android TalkBack |
| NFR-DEV-01 | DevOps | CI/CD | Auto deploy on merge to main |
| NFR-DEV-02 | DevOps | Rollback time | <15 phút |
| NFR-MON-01 | Monitoring | APM | Sentry + Datadog |
| NFR-COMP-01 | Compliance | App Store guideline | Apple + Google + COPPA |

### 5.3. Use case chính (主要ユースケース)

```
UC-01: Đăng ký mới + Onboarding
  Actor: Guest user
  Flow:
    1. Mở app → tap "Get started"
    2. Chọn target level (J5/J4/J3/J2/J1/J1+)
    3. Setup goal (số phút học/ngày, ngày thi target)
    4. Đăng ký email/Google/Apple
    5. Diagnostic mini test (10 câu) → suggest learning path
    6. Đến home screen

UC-02: Daily practice (returning user)
  Actor: Logged-in user
  Flow:
    1. Mở app → home screen hiển thị "Today's plan"
    2. SRS review (vocab cần ôn) → 5–10 phút
    3. Practice 1 section random hoặc chọn → 10–20 phút
    4. Result + AI explain các câu sai
    5. Streak +1, XP +N

UC-03: Take mock test
  Actor: Premium user
  Flow:
    1. Tap "Mock test"
    2. Confirm: 105 phút không nghỉ, không thoát
    3. Bắt đầu → timer countdown
    4. Hoàn tất → auto scoring
    5. Result: tổng điểm + rank J5–J1+ + breakdown 3 section
    6. AI weak point analysis + recommendation

UC-04: Subscribe Premium
  Actor: Free user hit limit
  Flow:
    1. Hit free limit (5 câu/ngày)
    2. Upsell screen → chọn plan (monthly/yearly)
    3. IAP flow (iOS/Android) hoặc Stripe (web)
    4. Confirm → unlock Premium feature

UC-05: Admin upload câu hỏi
  Actor: Admin
  Flow:
    1. Login admin web
    2. Vào Question Manager
    3. Upload CSV (template chuẩn) hoặc tạo từng câu
    4. Preview → publish → câu hỏi xuất hiện trên app
```

### 5.4. Definition of Done (完了の定義)

Một task được coi là **Done** khi:

```
□ Code đã merge vào main branch
□ Pass CI (lint + build + test)
□ Unit test coverage:
   - General code: ≥80%
   - Core algorithm (scoring, SRS): ≥90%
□ Đã pass code review của Claude (≥1 approval)
□ Đã test trên cả iOS + Android (cho mobile feature)
□ Đã update document liên quan (API spec, README)
□ Đã có demo video / GIF (ngắn 1-3 phút)
□ Không có bug critical/high open
□ i18n keys đã add cho cả 3 ngôn ngữ
□ Accessibility cơ bản đã check (label, contrast)
```

---

## 6. Function / Screen List (機能・画面一覧)

> Map 1-1 với Section 5.1. Mỗi screen có ID dạng `S-XXX-NN`.

### 6.1. Mobile App (iOS + Android)

| Screen ID | Screen Name | Module | Linked FR | Priority | Phase |
|-----------|-------------|--------|-----------|----------|-------|
| **Onboarding & Auth** |  |  |  |  |  |
| S-AUTH-01 | Splash Screen | Auth | FR-AUTH | MUST | P1 |
| S-AUTH-02 | Welcome / Get Started | Auth | FR-AUTH | MUST | P1 |
| S-AUTH-03 | Sign Up (email) | Auth | FR-AUTH-01 | MUST | P1 |
| S-AUTH-04 | Sign In (email) | Auth | FR-AUTH-01 | MUST | P1 |
| S-AUTH-05 | Social Login (Google/Apple/LINE) | Auth | FR-AUTH-02 | MUST | P1 |
| S-AUTH-06 | Forgot Password | Auth | FR-AUTH-03 | MUST | P1 |
| S-AUTH-07 | Onboarding — Set Target Level | Onboarding | FR-USER-01 | MUST | P1 |
| S-AUTH-08 | Onboarding — Daily Goal | Onboarding | FR-USER-04 | SHOULD | P1 |
| S-AUTH-09 | Onboarding — Diagnostic Mini Test | Onboarding | FR-LEARN | SHOULD | P2 |
| **Home & Navigation** |  |  |  |  |  |
| S-HOME-01 | Home / Dashboard | Home | - | MUST | P1 |
| S-HOME-02 | Today's Plan widget | Home | FR-LEARN | MUST | P2 |
| S-HOME-03 | Streak Calendar | Home | FR-GAME-01 | SHOULD | P4 |
| S-HOME-04 | Notification Center | Home | FR-USER-04 | SHOULD | P2 |
| **Learning Section — 聴解 (Listening)** |  |  |  |  |  |
| S-LEAR-L-01 | Listening Section Selector | Listen | FR-LEARN-01 | MUST | P2 |
| S-LEAR-L-02 | Listening Practice — Question | Listen | FR-LEARN-01 | MUST | P2 |
| S-LEAR-L-03 | Audio Player (with speed control) | Listen | FR-LEARN-09 | MUST | P2 |
| S-LEAR-L-04 | Listening Result + Explanation | Listen | FR-AI-01 | MUST | P2 |
| **Learning Section — 聴読解 (Listening+Reading)** |  |  |  |  |  |
| S-LEAR-LR-01 | LR Section Selector | LR | FR-LEARN-02 | MUST | P2 |
| S-LEAR-LR-02 | LR Practice (audio + chart/image) | LR | FR-LEARN-02 | MUST | P2 |
| S-LEAR-LR-03 | LR Result | LR | FR-AI-01 | MUST | P2 |
| **Learning Section — 読解 (Reading)** |  |  |  |  |  |
| S-LEAR-R-01 | Reading Section Selector | Read | FR-LEARN-03 | MUST | P2 |
| S-LEAR-R-02 | Reading Passage + Question | Read | FR-LEARN-03 | MUST | P2 |
| S-LEAR-R-03 | Reading Result | Read | FR-AI-01 | MUST | P2 |
| **Vocabulary** |  |  |  |  |  |
| S-VOC-01 | Vocab List (by level) | Vocab | FR-LEARN-04 | MUST | P2 |
| S-VOC-02 | Vocab Detail | Vocab | FR-LEARN-04 | MUST | P2 |
| S-VOC-03 | Flashcard Review (SRS) | Vocab | FR-LEARN-06 | MUST | P2 |
| S-VOC-04 | Vocab Search | Vocab | FR-LEARN-04 | SHOULD | P2 |
| **Grammar** |  |  |  |  |  |
| S-GRM-01 | Grammar List | Grammar | FR-LEARN-05 | MUST | P2 |
| S-GRM-02 | Grammar Detail (pattern + example) | Grammar | FR-LEARN-05 | MUST | P2 |
| S-GRM-03 | Grammar Quiz | Grammar | FR-LEARN-06 | MUST | P2 |
| **Mock Test** |  |  |  |  |  |
| S-MOCK-01 | Mock Test List | Mock | FR-MOCK-01 | MUST | P3 |
| S-MOCK-02 | Mock Test Pre-flight (rules confirm) | Mock | FR-MOCK-03 | MUST | P3 |
| S-MOCK-03 | Mock Test In-progress (timer) | Mock | FR-MOCK-01 | MUST | P3 |
| S-MOCK-04 | Mock Test Result Detail | Mock | FR-MOCK-05,06 | MUST | P3 |
| S-MOCK-05 | Mock Test History | Mock | FR-MOCK-07 | SHOULD | P3 |
| **AI Tutor** |  |  |  |  |  |
| S-AI-01 | AI Explanation (popup overlay) | AI | FR-AI-01 | MUST | P3 |
| S-AI-02 | Weak Point Analysis | AI | FR-AI-02 | MUST | P3 |
| S-AI-03 | AI Chat | AI | FR-AI-04 | COULD | P3 |
| **Profile & Settings** |  |  |  |  |  |
| S-PROF-01 | Profile View | Profile | FR-USER-01 | MUST | P1 |
| S-PROF-02 | Edit Profile | Profile | FR-USER-01 | MUST | P1 |
| S-PROF-03 | Settings (language, theme, notification) | Profile | FR-USER-02,03,04 | MUST | P1 |
| S-PROF-04 | Stats / Progress Chart | Profile | FR-LEARN | SHOULD | P3 |
| S-PROF-05 | Achievements / Badges | Profile | FR-GAME-03 | SHOULD | P4 |
| S-PROF-06 | About / Privacy Policy / Terms | Profile | NFR-PRIV-02 | MUST | P1 |
| **Subscription** |  |  |  |  |  |
| S-PAY-01 | Paywall / Plan Selection | Pay | FR-PAY-01,02 | MUST | P4 |
| S-PAY-02 | Subscription Detail | Pay | FR-PAY-05 | MUST | P4 |
| S-PAY-03 | Restore Purchase | Pay | FR-PAY-05 | MUST | P4 |
| **System** |  |  |  |  |  |
| S-SYS-01 | Offline Banner | System | FR-OFF-01 | MUST | P4 |
| S-SYS-02 | Error / Empty State | System | - | MUST | P1 |
| S-SYS-03 | Loading State | System | - | MUST | P1 |

**Tổng mobile screens**: ~45 màn hình.

### 6.2. Web Admin Console

| Screen ID | Screen Name | Linked FR | Priority |
|-----------|-------------|-----------|----------|
| S-ADM-01 | Admin Login | FR-AUTH | MUST |
| S-ADM-02 | Admin Dashboard (KPI overview) | FR-ADM-01 | MUST |
| S-ADM-03 | Question List | FR-ADM-02 | MUST |
| S-ADM-04 | Question Create/Edit | FR-ADM-02 | MUST |
| S-ADM-05 | Bulk Import (CSV/JSON) | FR-ADM-03 | MUST |
| S-ADM-06 | Vocabulary Manager | FR-ADM-02 | MUST |
| S-ADM-07 | Grammar Manager | FR-ADM-02 | MUST |
| S-ADM-08 | User List + Search | FR-ADM-04 | SHOULD |
| S-ADM-09 | User Detail (refund / suspend) | FR-ADM-04 | SHOULD |
| S-ADM-10 | Revenue Report | FR-ADM-01 | SHOULD |

### 6.3. Web Marketing / User Portal

| Screen ID | Screen Name | Priority |
|-----------|-------------|----------|
| S-WEB-01 | Landing Page | MUST |
| S-WEB-02 | Pricing Page | MUST |
| S-WEB-03 | About / FAQ | MUST |
| S-WEB-04 | Blog / SEO Articles | SHOULD |
| S-WEB-05 | Web Practice (responsive of mobile) | SHOULD |

### 6.4. Function modules (Backend)

| Module | Description |
|--------|-------------|
| auth-service | Đăng ký/đăng nhập/JWT/social OAuth |
| user-service | Profile, setting, target |
| content-service | Question, vocab, grammar CRUD |
| learning-service | SRS engine, progress tracking |
| mock-service | Mock test session, scoring engine |
| ai-service | LLM integration (OpenAI/Claude API), explain & analyze |
| payment-service | Stripe + IAP receipt validation |
| notification-service | Push notification + email |
| analytics-service | Event tracking |
| admin-service | Admin operations |

---

## 7. Coding Convention (コーディング規約)

### 7.1. Tech Stack

| Layer | Tech | Version | Lý do chọn |
|-------|------|---------|-----------|
| Mobile | React Native | 0.74+ | Cross-platform, code share với web |
| Web | Next.js | 14+ App Router | SSR/SEO cho landing |
| Shared | TypeScript | 5.4+ | Type safety, share code |
| State | Zustand | 4+ | Đơn giản hơn Redux, đủ dùng |
| Server State | TanStack Query | 5+ | Caching, sync server state |
| Form | React Hook Form + Zod | latest | Validation type-safe |
| Style | Tailwind CSS (web) + NativeWind (RN) | latest | Consistent giữa web & mobile |
| Backend | Node.js + NestJS | 20+, 10+ | Cấu trúc, DI, testing tốt |
| DB Primary | PostgreSQL | 16+ | RDBMS chuẩn |
| Cache | Redis | 7+ | Session, leaderboard |
| Search | OpenSearch | 2+ | Vocab/grammar full-text |
| Storage | AWS S3 | - | Audio, image |
| Cloud | AWS Tokyo | - | Data residency Nhật |
| CI/CD | GitHub Actions | - | Tích hợp tốt với GitHub |
| Mobile Build | EAS (Expo) | - | OTA update, build cloud |
| Monitoring | Sentry + Datadog | - | Error + APM |
| Analytics | Mixpanel | - | Event tracking |

### 7.2. Repository Structure (Monorepo)

```
bjt/
├── apps/
│   ├── mobile/          # React Native app
│   ├── web/             # Next.js (landing + admin)
│   └── api/             # NestJS backend
├── packages/
│   ├── core/            # Business logic shared (SRS, scoring)
│   ├── ui/              # Shared UI components
│   ├── types/           # Shared TypeScript types
│   ├── i18n/            # Translation files
│   └── config/          # Shared eslint, tsconfig, prettier
├── docs/
│   ├── api/             # API spec (OpenAPI)
│   ├── adr/             # Architecture Decision Records
│   └── runbook/         # Ops runbook
├── .github/
│   └── workflows/
├── CLAUDE.md            # Master doc (this file)
├── README.md
└── package.json         # pnpm workspace root
```

**Package manager**: `pnpm` (faster, less disk).

### 7.3. Naming Convention

| Item | Rule | Ví dụ |
|------|------|-------|
| Folder | kebab-case | `mock-test/`, `ai-tutor/` |
| File (component) | PascalCase + .tsx | `MockTestScreen.tsx` |
| File (util) | kebab-case + .ts | `srs-algorithm.ts` |
| Component | PascalCase | `MockTestScreen` |
| Function | camelCase | `calculateScore()` |
| Constant | UPPER_SNAKE | `MAX_QUESTIONS_PER_DAY` |
| Type/Interface | PascalCase | `Question`, `UserProfile` |
| Enum value | PascalCase | `QuestionType.Listening` |
| Hook | use + camelCase | `useSRSReview` |
| Test file | mirror + `.test.ts` | `srs-algorithm.test.ts` |
| API route | kebab-case + REST | `/api/v1/mock-tests` |
| DB table | snake_case plural | `mock_test_sessions` |
| DB column | snake_case | `created_at`, `user_id` |
| Env var | UPPER_SNAKE | `JWT_SECRET` |
| i18n key | dot.notation | `home.todays_plan.title` |

**Branch / Commit**:
- Branch: `feature/<jira-or-task-id>-short-desc`, e.g. `feature/S5-A1-question-schema`
- Commit (Conventional Commits):
  ```
  feat(scope): subject
  fix(scope): subject
  refactor(scope): subject
  test(scope): subject
  docs(scope): subject
  chore(scope): subject
  ```
- PR title: same format as commit. PR description: link to task ID + screenshots/video.

### 7.4. Code Style

- **Formatter**: Prettier (config in `packages/config/prettier`).
- **Linter**: ESLint (TypeScript strict + React + Tailwind plugin).
- **Pre-commit hook**: husky + lint-staged → run lint + format + tsc.
- **Typescript**: strict mode = true, no `any` (dùng `unknown` rồi narrow).

**General rules**:
1. Function dài tối đa 50 dòng. Quá → tách.
2. Component dài tối đa 200 dòng. Quá → tách.
3. Cyclomatic complexity ≤10.
4. Nesting tối đa 3 levels.
5. Magic numbers cấm — dùng const có tên.
6. Comment: chỉ giải thích "why", không giải thích "what" (code đã rõ rồi).
7. Tiếng Anh cho code/comment. Tiếng Nhật/Việt chỉ trong i18n string.

### 7.5. React / React Native Convention

```tsx
// ✅ Good
type Props = {
  question: Question;
  onAnswer: (choice: number) => void;
};

export function QuestionCard({ question, onAnswer }: Props) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selected !== null) onAnswer(selected);
  };

  return (
    <View className="p-4">
      <Text className="text-lg font-bold">{question.title}</Text>
      {/* ... */}
    </View>
  );
}

// ❌ Bad
export default function (props: any) {  // any, default export, no types
  // 300 lines of inline logic...
}
```

**Rules**:
- Named export, không default export (trừ Next.js page).
- Props phải có type rõ ràng, không `any`.
- Hook custom prefix `use`.
- Side effect → `useEffect` rõ deps.
- Performance: `useMemo`/`useCallback` chỉ khi cần (không premature optimize).

### 7.6. Backend (NestJS) Convention

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── dto/
│   │   │   ├── sign-in.dto.ts
│   │   │   └── sign-up.dto.ts
│   │   ├── guards/
│   │   └── auth.service.spec.ts
│   ├── question/
│   ├── mock-test/
│   └── ...
├── common/
│   ├── interceptors/
│   ├── filters/
│   └── decorators/
├── config/
└── main.ts
```

**Rules**:
- 1 module = 1 domain.
- Controller chỉ làm: validate input, gọi service, return response. Không có business logic.
- Service chứa business logic, gọi repository.
- DTO + Zod validation cho mọi input.
- Repository pattern cho DB access (không gọi ORM trực tiếp từ service).

### 7.7. Database Convention

- Primary key: `id` UUID v7 (sortable theo time).
- Mọi bảng có: `id`, `created_at`, `updated_at`, `deleted_at` (soft delete).
- FK rõ ràng: `user_id`, `question_id`.
- Index: mọi FK + cột query thường xuyên.
- Migration đặt trong `apps/api/migrations/`, tên `<timestamp>-<description>.ts`.
- Không bao giờ DROP/ALTER mà không có migration.

### 7.8. API Convention

- REST, version trong URL: `/api/v1/...`.
- Response chuẩn:
  ```json
  // Success
  { "data": { ... }, "meta": { ... } }
  // Error
  { "error": { "code": "QUESTION_NOT_FOUND", "message": "..." } }
  ```
- HTTP status:
  - 200 OK / 201 Created / 204 No Content
  - 400 Bad Request / 401 Unauthorized / 403 Forbidden / 404 Not Found / 409 Conflict
  - 422 Validation Error
  - 500 Internal Server Error
- Pagination: cursor-based (`?cursor=xxx&limit=20`).
- OpenAPI spec auto-generate từ NestJS, public ở `/api/docs`.

### 7.9. Security

- Không bao giờ commit secret. Dùng `.env.example` + Doppler/AWS Secrets Manager.
- Password: bcrypt cost 12.
- JWT: short-lived access (15 phút) + refresh token (30 ngày, rotation).
- Rate limit: 100 req/phút/user (login: 5 req/phút/IP).
- Input validation: Zod ở backend, type-safe ở frontend.
- SQL injection: dùng ORM parameterized query, tuyệt đối không string concat.
- XSS: escape output, dùng React (auto escape).
- CORS: whitelist domain, không `*` ở production.
- Audit log cho admin action.

### 7.10. Internationalization (i18n)

- Library: `i18next` (web + RN).
- Format key: `<screen>.<section>.<element>`, e.g. `home.todays_plan.title`.
- Source language: tiếng Anh (en).
- File: `packages/i18n/locales/{en,ja,vi}.json`.
- Quy tắc: KHÔNG hardcode string trực tiếp trong component.
- Plurals + interpolation: dùng i18next tính năng built-in.
- Tiếng Nhật: ưu tiên kanji + hiragana, có furigana toggle ở các trường hợp cần.

---

## 8. Phương châm Test (テスト方針)

### 8.1. Test Pyramid

```
              ┌─────────┐
              │   E2E   │   ~10%  — critical user flows
              │  (5–10) │
              ├─────────┤
              │   Int   │   ~20%  — API + DB integration
              │ (50–80) │
              ├─────────┤
              │  Unit   │   ~70%  — business logic, util
              │  (500+) │
              └─────────┘
```

### 8.2. Testing Strategy

| Layer | Tool | Coverage Target | When |
|-------|------|----------------|------|
| **Unit** | Jest + Vitest | ≥80% (general), ≥90% (core algo) | Mỗi commit |
| **Component** | React Testing Library | Smoke test major component | Mỗi PR |
| **Integration** | Jest + Supertest | All API endpoints | Mỗi PR |
| **E2E Mobile** | Maestro | Critical flows (UC-01 to UC-04) | Pre-release |
| **E2E Web** | Playwright | Admin + Landing flows | Pre-release |
| **Performance** | k6 | API load test | Pre-release |
| **Accessibility** | axe-core | WCAG 2.1 AA | Mỗi PR (web) |
| **Security** | OWASP ZAP, Snyk | Top 10 + dependency scan | Weekly + pre-release |

### 8.3. Phương châm test theo loại

#### Unit Test
- **TDD bắt buộc** cho: SRS algorithm, scoring engine, level prediction.
- **AAA pattern**: Arrange / Act / Assert.
- **1 test = 1 assertion logic** (có thể nhiều `expect` nhưng cùng 1 ý).
- **Test name**: `should <expected behavior> when <condition>`.
- **No magic** trong test: dữ liệu test rõ ràng, không phụ thuộc external.

#### Integration Test
- Dùng test DB (PostgreSQL container qua Testcontainers).
- Reset DB giữa các test (transaction rollback).
- Test happy path + ít nhất 1 error case mỗi endpoint.
- Mock external service (Stripe, OpenAI) bằng MSW.

#### E2E Test
- Tập trung **critical path**, không cố cover toàn bộ.
- Critical flows MVP:
  1. Sign up → onboarding → first practice
  2. Returning user → daily review → result
  3. Take mock test full → see result
  4. Free user → upsell → subscribe → unlock Premium
- Chạy trên CI ít nhất 1 lần/ngày + trước mỗi release.

### 8.4. Test data

- **Fixture**: `__fixtures__/` folder, không hardcode trong test file.
- **Factory**: dùng pattern factory để tạo test object.
  ```ts
  const question = makeQuestion({ section: 'reading', level: 'J3' });
  ```
- **Seed test DB**: 100 câu hỏi mẫu cho integration test, fixed ID để assert.
- **Audio test**: dùng file ngắn 1s (silent/tone) thay file thật.

### 8.5. Quy trình QA

#### Trong sprint
- Dev tự test (unit + manual smoke) trước khi PR.
- Reviewer test khi review code.
- Merge → auto deploy staging → Claude smoke test trên staging.

#### Pre-release (Cuối phase)
1. **Functional test**: Run full E2E + manual test theo checklist.
2. **Regression**: Test các feature cũ vẫn chạy.
3. **Compatibility**:
   - iOS: 2 phiên bản gần nhất (hiện tại + 1 trước).
   - Android: API level 24+.
   - Web: Chrome / Safari / Firefox / Edge (2 phiên bản gần nhất).
4. **Performance**: 
   - Cold start <3s.
   - API p95 <800ms.
   - Memory leak check (long session).
5. **Security**: OWASP ZAP scan + Snyk audit.
6. **Accessibility**: axe-core + manual screen reader test.
7. **i18n**: 3 ngôn ngữ render đúng, không overflow.

#### Beta test (S12)
- 30 user thật (mix Việt/Nhật/khác).
- Form feedback có cấu trúc.
- Tracking event qua Mixpanel.
- Bug nhận → triage → fix critical/high trước launch.

### 8.6. Bug Triage

| Severity | Định nghĩa | SLA fix |
|----------|-----------|---------|
| **Critical** | Crash, data loss, payment fail, security | 24h |
| **High** | Major feature broken, no workaround | 3 ngày |
| **Medium** | Feature broken có workaround | 1 sprint |
| **Low** | UI nhỏ, edge case hiếm | Backlog |

### 8.7. Acceptance Test cho từng feature

Mỗi user story đi kèm Acceptance Criteria dạng Given-When-Then:

```gherkin
Feature: Mock test scoring

Scenario: Auto submit khi hết giờ
  Given user đang làm mock test còn 30 câu chưa trả lời
  When timer hit 0
  Then mock test tự động submit
  And các câu chưa trả lời tính 0 điểm
  And kết quả được hiển thị trong <2s
```

### 8.8. Test ownership

- **Dev viết**: Unit + integration cho code mình viết.
- **Claude review**: Đảm bảo coverage + test quality.
- **Claude/QA chạy**: E2E + regression pre-release.
- **System Manager approve**: Beta test report.

---

## 9. Architecture Overview (アーキテクチャ概要)

### 9.1. High-level diagram

```
┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│  Mobile (RN)   │     │   Web (Next)   │     │  Admin (Next)  │
└───────┬────────┘     └───────┬────────┘     └───────┬────────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │ HTTPS
                       ┌───────▼───────┐
                       │  CloudFront   │
                       │  (CDN + WAF)  │
                       └───────┬───────┘
                               │
                       ┌───────▼────────┐
                       │  API Gateway   │
                       └───────┬────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
       ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
       │ Auth Service│  │Learn Service│  │ AI Service  │
       │  (NestJS)   │  │  (NestJS)   │  │  (Lambda)   │
       └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
       ┌──────▼─────┐   ┌──────▼─────┐   ┌──────▼─────┐
       │ PostgreSQL │   │   Redis    │   │     S3     │
       │   (RDS)    │   │ElastiCache │   │ (audio/img)│
       └────────────┘   └────────────┘   └────────────┘
```

### 9.2. Key data models (DB)

```
users (id, email, password_hash, locale, target_rank, ...)
user_profiles (user_id, name, avatar_url, daily_goal_min, ...)
questions (id, section, level, type, content_ja, audio_url, ...)
question_choices (id, question_id, content_ja, is_correct)
vocab_items (id, term_ja, reading, meaning_en, meaning_vi, level, ...)
grammar_items (id, pattern_ja, meaning_en, meaning_vi, level, examples)
srs_reviews (id, user_id, item_id, item_type, ease_factor, interval, due_at, ...)
mock_test_sessions (id, user_id, started_at, ended_at, total_score, rank, ...)
mock_test_answers (id, session_id, question_id, choice_id, is_correct, time_taken_ms)
subscriptions (id, user_id, plan, status, started_at, expires_at, store_receipt)
streaks (user_id, current_streak, longest_streak, last_active_at)
```

### 9.3. Critical algorithms

- **SRS**: SM-2 modified (xem `packages/core/srs.ts`). Test cover ≥90%.
- **Scoring**: BJT scaled scoring 0–800 — chuẩn theo độ khó từng câu (Item Response Theory simplified).
- **Level prediction**: Mapping điểm → J5/J4/J3/J2/J1/J1+ theo official BJT band.
- **Weak point detection**: Phân tích pattern lỗi (section, topic, grammar pattern) → top 3 weak area.

---

## 10. Risk Log (リスク管理)

| ID | Risk | Impact | Likelihood | Mitigation | Owner | Status |
|----|------|--------|-----------|-----------|-------|--------|
| R-01 | Nội dung BJT thật bị hạn chế bản quyền (đề thi) | High | High | Tự soạn nội dung theo format BJT, không copy đề thật. Hire Japanese reviewer. | Claude | 🟡 Active |
| R-02 | LLM API cost tăng đột biến (AI tutor) | Med | Med | Cache response phổ biến + giới hạn free tier 5 query/day. | Claude | 🟢 Mitigated |
| R-03 | App Store rejection (Apple guideline 4.2) | High | Med | Đảm bảo subscription flow chuẩn, có restore purchase, terms rõ ràng. | Claude | 🟡 Active |
| R-04 | Audio bandwidth cost cao | Med | Med | Compress audio (Opus 32kbps), CDN cache aggressive. | CodeX | 🟢 Mitigated |
| R-05 | Thiếu native Japanese reviewer | High | Med | Hire freelancer JP từ đầu phase 2. | Sys Mgr | 🟡 Active |
| R-06 | Gemini và CodeX block lẫn nhau | Med | Low | Task assignment trong CLAUDE.md đảm bảo độc lập. | Claude | 🟢 Mitigated |
| R-07 | Scope creep từ feedback beta test | Med | High | Lock scope ở M3, mọi request mới → backlog Phase 2. | Sys Mgr | 🟡 Active |
| R-08 | Privacy compliance (GDPR + APPI Nhật) | High | Low | Privacy lawyer review trước launch. AWS Tokyo region. | Claude | ⚪ To do |

**Status legend**: 🟢 Mitigated / 🟡 Active monitoring / 🔴 Critical / ⚪ Not started

---

## 11. Changelog

| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | 2026-05-09 | Claude | Initial master document |

---

## 12. Open questions cho System Manager

> Các câu này cần System Manager quyết để Claude tiến hành phase tiếp.

1. **Budget cho LLM API** (AI tutor): OpenAI GPT-4o vs Claude Sonnet vs self-hosted? Cost ước tính mỗi user Premium ~$0.5–2/tháng.
2. **Native Japanese content reviewer**: Hire freelancer hay partner với Japanese language school?
3. **Pricing**: Đã có ý tưởng giá chưa? Recommend: Free + $9.99/tháng hoặc $79/năm (theo benchmark Bunpro/JLPTLord).
4. **Launch geography**: Đầu tiên launch toàn cầu hay focus VN/JP/CN trước?
5. **Branding**: Đã có tên app + logo chưa? Cần brief design trong S2.
6. **Compliance Nhật**: Có cần lawyer Nhật review terms/privacy không? Recommend: có.

---

## 13. Glossary (用語集)

| Term | Định nghĩa |
|------|-----------|
| BJT | Business Japanese Proficiency Test |
| 聴解 (Chōkai) | Listening Comprehension |
| 聴読解 (Chōdokkai) | Listening + Reading Comprehension |
| 読解 (Dokkai) | Reading Comprehension |
| Keigo (敬語) | Honorific Japanese |
| SRS | Spaced Repetition System |
| MVP | Minimum Viable Product |
| IAP | In-App Purchase |
| WCAG | Web Content Accessibility Guidelines |
| APPI | Act on Protection of Personal Information (Nhật) |
| 報・連・相 | Hō-Ren-Sō: Report-Contact-Consult (Japanese work culture) |

---

## 14. Curriculum — Nội dung học tập (カリキュラム)

> Được xác nhận bởi System Manager ngày 2026-05-10.
> **Điểm xuất phát**: Module **A2 — 敬語システム** (ưu tiên #1 khi bắt đầu soạn nội dung).
> **Ưu tiên thấp nhất**: Listening có video (B1 dạng 場面把握 + 状況把握) — làm sau cùng trong phần mobile.

### 14.0. Kiến trúc 3 Track

```
Track A: 知識ベース   — Kiến thức nền (Vocab, Keigo, Grammar, Business Culture)
Track B: Section Practice — Luyện từng phần thi (Reading, Listening, LR)
Track C: 模試         — Mock test tổng hợp (Mini / Half / Full)
```

---

### Track A — 知識ベース (Kiến thức nền)

#### Module A1 — ビジネス語彙 (Từ vựng thương mại)
> **Priority**: #2 | **Phase**: P2

| Chủ đề | Ví dụ từ | Target level |
|--------|----------|--------------|
| 組織・人事 | 取締役、監査役、昇進、異動 | J3→J2 |
| 会議・交渉 | 議題、合意、折衝、根回し | J2→J1 |
| 財務・経営 | 売上高、損益、黒字、赤字転落 | J2→J1 |
| 契約・法務 | 締結、覚書、違約金、瑕疵担保 | J1→J1+ |
| IT・テクノロジー | 納期、仕様変更、バグ、リリース | J2→J1 |
| マーケティング | シェア、ブランディング、リード | J2→J1 |

- Format học: SRS flashcard (term ↔ meaning JP/EN/VI + audio)
- Mục tiêu: ≥500 từ trong DB khi launch

#### Module A2 — 敬語システム (Keigo) ⭐ BẮT ĐẦU TẠI ĐÂY
> **Priority**: #1 (KHỞI ĐỘNG) | **Phase**: P2
> Đây là module **khác biệt nhất** của BJT so với JLPT và là nội dung soạn **đầu tiên**.

- 尊敬語 vs 謙譲語 vs 丁寧語 — phân biệt cơ bản
- 謙譲語Ⅰ vs 謙譲語Ⅱ (丁重語) — phân biệt nâng cao
- Keigo theo từng tình huống: 電話、訪問、メール、会議
- Lỗi keigo phổ biến người nước ngoài hay mắc (trap questions BJT)
- Chuẩn tham chiếu: 文化庁「敬語の指針」
- Format học: Quiz điền vào chỗ trống + tình huống hội thoại

#### Module A3 — ビジネス文法表現 (Ngữ pháp thương mại)
> **Priority**: #3 | **Phase**: P2

Các mẫu câu đặc trưng trong đề đọc hiểu:
- ～に際して、～を踏まえて、～を受けて
- ～を余儀なくされる、～にほかならない
- ～に伴い、～を契機に、～を皮切りに
- Văn phong: báo cáo / email / hợp đồng

#### Module A4 — ビジネス文化・慣習
> **Priority**: #4 | **Phase**: P3

- 報・連・相 (Hō-Ren-Sō)
- 根回し (nemawashi) — vận động trước
- 名刺交換、訪問マナー、席順
- Cách đọc biểu đồ kinh doanh (グラフ読解) — xuất hiện nhiều trong 聴読解

---

### Track B — Section Practice (Luyện đề)

#### Module B1 — 聴解 (Listening) ⚠️ PRIORITY THẤP NHẤT (Mobile)
> **Priority**: LAST cho mobile | Phần có video/audio → làm sau cùng

Cấu trúc: 場面把握5問 + 発言聴解10問 + 総合聴解10問

- **場面把握** ⛔ VIDEO — Làm sau cùng: Xem ảnh → nghe 4 câu → chọn câu mô tả đúng
- **発言聴解**: Nghe hội thoại → ý định/hành động người nói
  - Focus: keigo phức tạp trong thời gian thực
- **総合聴解**: Nghe hội thoại dài (họp, báo cáo) → nhiều câu hỏi
  - Ví dụ: nghe hội thoại tái cơ cấu ban lãnh đạo → key words: 「スリム化」「社外から役員を入れる」

**MVP scope**: Chỉ làm 発言聴解 + 総合聴解 (audio thuần). 場面把握 (có video) → Phase 2.

#### Module B2 — 聴読解 (Listening + Reading)
> **Priority**: #2 cho Practice | **Phase**: P2–P3

Cấu trúc: 状況把握5問 + 資料聴読解10問 + 総合聴読解10問

- **状況把握** ⛔ VIDEO — Làm sau cùng: Xem ảnh + nghe → chọn đáp án
- **資料聴読解**: Xem bảng/biểu đồ + nghe giải thích → trả lời
  - Key vocab: 前年比、増減、推移
- **総合聴読解**: Văn bản dài + audio → câu hỏi tổng hợp

**MVP scope**: 資料聴読解 + 総合聴読解. 状況把握 (có video) → Phase 2.

#### Module B3 — 読解 (Reading) ⭐ PRACTICE ĐẦU TIÊN
> **Priority**: #1 cho Practice | **Phase**: P2 | Không cần audio/video

Cấu trúc: 語彙文法10問 + 表現読解10問 + 総合読解10問

- **語彙・文法問題**: Điền vào chỗ trống
  - Trap thường gặp: せい／おかげ, こそ／のみ／だけ／まで, 使いきり／使いよう
- **表現読解**: Đoạn văn ngắn → hiểu hàm ý, sắc thái
- **総合読解**: Văn bản dài (email, báo cáo, thông báo nội bộ) → câu hỏi tổng hợp

---

### Track C — 模試 (Mock Test)

| Loại | Thời gian | Section | Phase |
|------|-----------|---------|-------|
| Mini mock | 30 phút | 1 section | P3 |
| Half mock | 50 phút | 2 section | P3 |
| Full mock | 105 phút | 3 section | P3 |
| Weak point drill | Không giới hạn | AI-recommended | P3 |

---

### 14.1. Lộ trình học theo level người dùng

| Level hiện tại | Mục tiêu | Thời gian ước tính | Focus chính |
|---|---|---|---|
| N3 / J4 | J3 (320+) | 2–3 tháng | A1 từ vựng + B3 Reading cơ bản |
| N2 / J3 | J2 (420+) | 2–3 tháng | A2 Keigo + B2 + B3 nâng cao |
| N1 / J2 | J1 (530+) | 1–2 tháng | A3 văn pháp + C Mock Test |
| N1 / J1 | J1+ (600+) | 1–2 tháng | A4 văn hóa + C Full Mock intensive |

---

### 14.2. Thứ tự soạn nội dung (Content Priority)

```
1. A2 — Keigo System      ← BẮT ĐẦU NGAY (khởi động)
2. B3 — Reading Practice  ← Practice đầu tiên (không cần audio)
3. A1 — Business Vocab    ← Kết hợp với B3
4. A3 — Business Grammar  ← Hỗ trợ B3 + B2
5. B2 — Listening+Reading ← Cần audio (không cần video)
6. A4 — Business Culture  ← Bổ sung cho mock test
7. C  — Mock Test         ← Cần đủ câu hỏi 3 section
8. B1 — Listening         ← Audio + video, làm sau cùng
```

---

## 15. Mobile Code Roadmap (コードロードマップ)

> Kick-off: **2026-05-10**. Timeline: 24 tuần → Launch Q3 2026.
> Thứ tự ưu tiên phản ánh curriculum: Reading & Keigo trước, Listening video sau cùng.

### 15.1. Schedule tổng thể

```
TUẦN  1- 3  ▓▓▓░░░░░░░░░░░░░░░░░░░░░  Phase 0: Design + Architecture
TUẦN  4- 7  ░░░▓▓▓▓░░░░░░░░░░░░░░░░░  Phase 1: Foundation (Auth + Base UI)
TUẦN  8-11  ░░░░░░░▓▓▓▓░░░░░░░░░░░░░  Phase 2A: A2 Keigo + B3 Reading + A1 Vocab
TUẦN 12-15  ░░░░░░░░░░░▓▓▓▓░░░░░░░░░  Phase 2B: B2 LR + A3 Grammar + SRS
TUẦN 16-19  ░░░░░░░░░░░░░░░▓▓▓▓░░░░░  Phase 3: Mock Test + AI Tutor
TUẦN 20-21  ░░░░░░░░░░░░░░░░░░░▓▓░░░  Phase 3B: B1 Listening (audio only)
TUẦN 22-23  ░░░░░░░░░░░░░░░░░░░░░▓▓░  Phase 4: Polish + Payment + Gamification
TUẦN 24     ░░░░░░░░░░░░░░░░░░░░░░░▓  Phase 5: Launch
(Phase 2+) ░░░░░░░░░░░░░░░░░░░░░░░░░  B1 Video (場面把握・状況把握) — sau launch
```

### 15.2. Chi tiết từng Phase

---

#### Phase 0 — Discovery & Design (Tuần 1–3) 🟡 IN PROGRESS

> Khởi động: 2026-05-10. Documents tại `docs/phase0/`

```
Tuần 1–2: Research + Wireframe
  [x] Phân tích 6 app benchmark          → docs/phase0/01-competitive-analysis.md
  [x] DB schema draft (full schema)       → docs/phase0/02-db-schema.md
  [x] Design system spec                  → docs/phase0/03-design-system.md
  [x] Tech architecture (ADR-001)         → docs/phase0/04-adr-001-architecture.md
  [x] Screen wireframes (57 screens)      → docs/phase0/05-screen-wireframes.md
  [x] Design prototype (React JSX)        → docs/design/index.html (mở trực tiếp browser)
  [x] Xác định 80 câu hỏi mẫu BJT        → docs/phase0/06,07,08 (30 Reading + 20 Keigo + 20 Vocab + 10 LR). Nội dung gốc, không vi phạm bản quyền (R-01 mitigated).

Tuần 3: Design Sprint
  [ ] Review + finalize design prototype
  [ ] Xác nhận 5 tech decisions (ADR-001 Section 10)
  ✅ MILESTONE M0: System Manager approve → sang Phase 1

> **Cost policy (confirmed 2026-05-10)**:
> Free/local trong suốt development. Cloud + paid services đầu tư sau khi hoàn thiện app mobile.
> Local stack: Docker (PostgreSQL + Redis + MinIO + Mailhog). AI = mock mode. Payment = defer.
```

---

#### Phase 1 — Foundation (Tuần 4–7)

```
Sprint 3 — Tuần 4–5: Monorepo + CI/CD + Auth
  Gemini:
  [ ] Init monorepo pnpm + Turborepo
  [ ] GitHub Actions CI (lint + test + build)
  [ ] EAS (Expo) build setup iOS + Android

  CodeX:
  [ ] NestJS auth-service (sign-up, sign-in, refresh, OAuth Google/Apple)
  [ ] PostgreSQL migration #001: users, user_profiles
  [ ] Unit test ≥80%

Sprint 4 — Tuần 6–7: Navigation + Base UI + Onboarding
  Gemini:
  [ ] React Navigation v6 (AuthStack, MainTab, Modal)
  [ ] i18n: i18next + en/ja/vi locale files
  [ ] Base UI components (Button, Input, Card, AudioPlayer, Loading, Error)

  CodeX:
  [ ] User profile API (GET/PATCH /api/v1/users/me)
  [ ] Onboarding screens (target rank, daily goal, diagnostic 10 câu)
  [ ] Push notification setup (Expo Notifications)
  ✅ MILESTONE M1: Skeleton chạy được
```

---

#### Phase 2A — Core Content: Keigo + Reading + Vocab (Tuần 8–11)

> **Đây là sprint quan trọng nhất về nội dung — A2 Keigo khởi động tại đây.**

```
Sprint 5 — Tuần 8–9: Content Engine + A2 Keigo Module
  Gemini:
  [ ] NestJS content-service (CRUD questions, vocab, keigo_items)
  [ ] Admin web UI: Question Manager + Bulk import CSV/JSON
  [ ] Seed content: 50 câu Keigo (A2) + 30 câu Reading (B3)
  [ ] Keigo item schema:
      keigo_items(id, base_form, sonkeigo, kenjougo, teineigo,
                  situation, trap_note, level)

  CodeX:
  [ ] A2 Keigo Module screens:
      - Keigo System overview (尊敬語/謙譲語/丁寧語 selector)
      - Keigo situation drill (電話/訪問/メール/会議)
      - Quiz: điền keigo đúng vào hội thoại
      - Trap question mode (lỗi phổ biến người nước ngoài)
  [ ] SRS cho keigo items (dùng packages/core/srs.ts)

Sprint 6 — Tuần 10–11: B3 Reading Practice + A1 Vocab
  Gemini:
  [ ] B3 Reading Practice screens:
      - S-LEAR-R-01: Section selector (filter J-level/topic)
      - S-LEAR-R-02: Đoạn văn + 4 lựa chọn + furigana toggle
      - S-LEAR-R-03: Result + highlight câu sai + bookmark
  [ ] packages/core/srs.ts — SM-2 algorithm (TDD ≥90%)

  CodeX:
  [ ] A1 Vocab Module:
      - S-VOC-01: Danh sách theo chủ đề (組織/会議/財務/...)
      - S-VOC-02: Chi tiết từ (kanji, reading, meaning, example)
      - S-VOC-03: Flashcard SRS (tap-to-flip + audio)
  [ ] Offline cache: WatermelonDB sync vocab + SRS queue
```

---

#### Phase 2B — A3 Grammar + B2 LR Practice (Tuần 12–15)

```
Sprint 7 — Tuần 12–13: A3 Grammar + Progress Tracking
  Gemini:
  [ ] A3 Grammar Module:
      - S-GRM-01: Danh sách pattern theo level
      - S-GRM-02: Chi tiết pattern + examples + usage note
      - S-GRM-03: Grammar quiz (SRS-based)
  [ ] S-HOME-02: Today's plan widget (SRS due + suggested)

  CodeX:
  [ ] learning-service API:
      - GET /api/v1/learning/progress
      - GET /api/v1/learning/weak-areas
  [ ] Daily streak logic (streaks table)
  [ ] S-PROF-04: Stats / Progress chart

Sprint 8 — Tuần 14–15: B2 Listening+Reading Practice
  Gemini:
  [ ] B2 LR Module (audio + chart — KHÔNG CÓ VIDEO):
      - S-LEAR-LR-01: Selector
      - S-LEAR-LR-02: Audio player + biểu đồ/bảng số liệu
        (layout: top=chart, bottom=audio controls + choices)
      - S-LEAR-LR-03: Result
  [ ] Graph vocabulary drill (前年比、増減、推移)

  CodeX:
  [ ] Audio streaming từ S3 + expo-av (speed 1x/1.25x/1.5x)
  [ ] Image loader cho biểu đồ kinh doanh (S3 presigned URL)
  [ ] POST /api/v1/learning/answers (track answer history)
  ✅ MILESTONE M2: Reading + Keigo + Vocab + Grammar + LR chạy được
```

---

#### Phase 3 — Mock Test + AI Tutor (Tuần 16–19)

```
Sprint 9 — Tuần 16–17: Mock Test Engine
  Gemini:
  [ ] Mock test framework:
      - S-MOCK-01: Danh sách mock test
      - S-MOCK-02: Pre-flight confirm (rules, timer warning)
      - S-MOCK-03: In-progress (countdown 105p, navigate sections,
                   auto-submit, save & resume)
  [ ] mock-service API:
      - POST /api/v1/mock-tests/sessions
      - PATCH /api/v1/mock-tests/sessions/:id/answers
      - POST /api/v1/mock-tests/sessions/:id/submit

  CodeX:
  [ ] packages/core/scoring.ts (TDD ≥90%):
      - calculateScore(answers) → {total: 0-800, rank: J5..J1+, bySection}
      - IRT simplified: weight theo độ khó từng câu
  [ ] S-MOCK-04: Result (tổng điểm + rank badge + breakdown 3 section)
  [ ] S-MOCK-05: History + biểu đồ tiến bộ (line chart)

Sprint 10 — Tuần 18–19: AI Tutor + Weak Point Analysis
  Gemini:
  [ ] ai-service (Lambda + Claude Sonnet API):
      - POST /api/v1/ai/explain (explain đáp án JP/EN/VI)
      - Cache Redis 24h (same question → same response)
      - Rate limit free: 5 query/ngày/user
  [ ] S-AI-01: Explanation overlay (bottom sheet, loading skeleton)

  CodeX:
  [ ] S-AI-02: Weak Point Analysis (sau mock test):
      - Radar chart 3 section
      - Deeplink → section/level bổ sung
  [ ] Recommendation engine:
      - GET /api/v1/ai/recommendations (top 3 bài học đề xuất)
  ✅ MILESTONE M3: Mock test full + scoring + AI tutor demo
```

---

#### Phase 3B — B1 Listening Audio (Tuần 20–21)

> ⚠️ Làm sau mock test. Chỉ audio thuần (発言聴解 + 総合聴解). Video → Phase 2 post-launch.

```
Sprint 11 — Tuần 20–21: B1 Listening (Audio Only)
  Gemini:
  [ ] B1 Listening Module (KHÔNG CÓ VIDEO):
      - S-LEAR-L-01: Selector (chỉ 発言聴解 + 総合聴解)
      - S-LEAR-L-02: Audio player + 4 lựa chọn
      - S-LEAR-L-03: Speed control (1x/1.25x/1.5x)
      - S-LEAR-L-04: Result + AI explanation
  [ ] Audio cache offline (50 file nhất)

  CodeX:
  [ ] Performance: lazy load screens, image/audio preload WiFi
  [ ] Offline mode: WatermelonDB sync 50 câu mới nhất
  [ ] S-SYS-01: Offline banner
  [ ] Accessibility: label + contrast check
  [ ] i18n review 3 ngôn ngữ

  ❌ CHƯA LÀM (Phase 2 post-launch):
      - 場面把握 (ảnh + audio)
      - 状況把握 (ảnh + audio trong B2)
```

---

#### Phase 4 — Polish + Payment + Gamification (Tuần 22–23)

```
Sprint 12 — Tuần 22: Gamification + Subscription
  Gemini:
  [ ] Gamification: streak calendar, XP, level, 20 achievement badges
  [ ] Weekly leaderboard (opt-in, Redis sorted set)
  [ ] Push notification daily reminder

  CodeX:
  [ ] S-PAY-01: Paywall (free vs premium)
  [ ] expo-iap: iOS + Android in-app purchase
  [ ] Stripe web payment
  [ ] S-PAY-02,03: Manage + Restore purchase

Sprint 13 — Tuần 23: Beta + Store Prep
  [ ] Beta release (TestFlight + Play Store internal, 30 users)
  [ ] Maestro E2E: UC-01→UC-04 critical flows
  [ ] Store listing: screenshots, description EN/JA/VI, keywords
  [ ] Fix bug Critical/High từ beta
  ✅ MILESTONE M4: Beta ready (0 critical bug)
```

---

#### Phase 5 — Launch (Tuần 24)

```
  [ ] AWS Tokyo production: RDS + ElastiCache + S3 + CloudFront
  [ ] Sentry + Datadog APM setup
  [ ] EAS Submit → App Store + Google Play
  [ ] Domain + SSL + landing page live
  [ ] Monitor 72h post-launch (p95 <800ms, crash <1%, uptime 99.5%)
  ✅ MILESTONE M5: v1.0 Live
```

---

#### Post-Launch — Phase 2 (Video Listening)

```
  [ ] B1 場面把握: Video player + 4 audio choices (React Native Video)
  [ ] B2 状況把握: Video + audio overlay
  [ ] Video streaming từ S3/CloudFront
  [ ] Corporate plan (B2B)
  [ ] Speaking practice
```

---

### 15.3. Thứ tự ưu tiên code (dependency order)

```
1.  Monorepo setup + CI/CD
2.  Auth (login trước khi làm gì)
3.  Content API + Admin (cần trước khi seed data)
4.  A2 Keigo content + Quiz screen     ← KHỞI ĐỘNG
5.  packages/core/srs.ts (TDD ≥90%)   ← dùng cho mọi module
6.  B3 Reading Practice                ← practice đầu tiên (không cần audio)
7.  A1 Vocab + Flashcard SRS
8.  A3 Grammar module
9.  B2 LR Practice (audio + chart)
10. packages/core/scoring.ts (TDD ≥90%)
11. Mock Test framework
12. AI Tutor (cần mock test có data)
13. B1 Listening Audio (発言 + 総合)
14. Gamification + Payment
15. Offline sync + Performance polish
16. [Post-launch] B1/B2 Video sections
```

### 15.4. Milestone Summary

| Milestone | Tuần | Deliverable | Gate |
|-----------|------|------------|------|
| M0: Design Approved | End W3 | Figma + Architecture doc | System Manager |
| M1: Skeleton | End W7 | Auth + Navigate + DB | System Manager |
| M2: Practice MVP | End W15 | Keigo + Reading + Vocab + Grammar + LR | System Manager |
| M3: Mock Test + AI | End W19 | Full mock + scoring + AI tutor | System Manager |
| M4: Beta Ready | End W23 | 0 critical bug, store-ready | System Manager |
| M5: Launch | End W24 | v1.0 Live | System Manager |

---

## 11. Changelog (更新履歴)

| Version | Date | Author | Change |
|---------|------|--------|--------|
| v1.0 | 2026-05-09 | Claude | Initial master document |
| v1.1 | 2026-05-10 | Claude | Cập nhật tên app "BJT Master"; thêm Section 14 Curriculum; thêm Section 15 Mobile Code Roadmap + Schedule tổng thể 24 tuần; xác nhận thứ tự ưu tiên: bắt đầu A2 Keigo, Listening video sau cùng |
| v1.2 | 2026-05-10 | Claude | Phase 0 khởi động: tạo 5 deliverables trong docs/phase0/ (competitive analysis, DB schema, design system, ADR-001 architecture, screen wireframes 57 screens) |
| v1.3 | 2026-05-10 | Claude | Tổ chức design files → docs/design/ + index.html (chạy local browser). Cập nhật ADR-001: free/local-first stack (Docker: PG+Redis+MinIO+Mailhog). Tạo docker-compose.yml + .env.example. AI mock mode, payment deferred. |
| v1.4 | 2026-05-10 | Claude | Soạn 80 câu hỏi mẫu gốc (30 Reading B3 + 20 Keigo A2 + 20 Vocab A1 + 10 LR B2) → docs/phase0/06,07,08,09. Phase 0 checklist hoàn tất 100%. Sẵn sàng cho M0 Approval. |

---

**END OF CLAUDE.md v1.1**

> Chú ý cho team: Đọc lại file này TRƯỚC khi bắt đầu mỗi sprint. Mọi quyết định phải reference được về các Section ở trên. Nếu có conflict — cập nhật file này trước, code sau.
> **Kick-off ngày mai 2026-05-10 — Sprint đầu tiên bắt đầu với Phase 0: Design & Architecture.**
