# Database Schema — BJT Master
> Phase 0 Deliverable | Created: 2026-05-10
> DB: PostgreSQL 16+ | Region: AWS Tokyo (ap-northeast-1)

---

## Conventions

- Primary key: `id` UUID v7 (time-sortable)
- Mọi bảng có: `id`, `created_at`, `updated_at`, `deleted_at` (soft delete)
- FK: `<table_singular>_id` (e.g., `user_id`, `question_id`)
- snake_case cho tất cả tên bảng/cột
- Index: mọi FK + cột thường xuyên query/filter

---

## ERD tổng quan

```
users
  └─< user_profiles
  └─< subscriptions
  └─< streaks
  └─< srs_reviews >─ vocab_items
                  └─ grammar_items
                  └─ keigo_items
  └─< learning_answers >─ questions
  └─< mock_test_sessions
        └─< mock_test_answers >─ questions

questions >─ question_choices
questions >─ question_sections (enum)

content:
  vocab_items
  grammar_items
  keigo_items
  question_audio (S3 ref)
```

---

## Schema Chi Tiết

### 🔐 Auth & User

```sql
-- Bảng user cốt lõi
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email           VARCHAR(255) UNIQUE NOT NULL,
  password_hash   VARCHAR(255),           -- NULL nếu chỉ dùng OAuth
  email_verified  BOOLEAN DEFAULT FALSE,
  locale          VARCHAR(10) DEFAULT 'vi', -- 'ja' | 'en' | 'vi'
  role            VARCHAR(20) DEFAULT 'user', -- 'user' | 'admin'
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ             -- soft delete
);

CREATE INDEX idx_users_email ON users(email);

-- OAuth providers
CREATE TABLE oauth_accounts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider    VARCHAR(20) NOT NULL,   -- 'google' | 'apple' | 'line'
  provider_id VARCHAR(255) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(provider, provider_id)
);

-- Profile mở rộng
CREATE TABLE user_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  display_name    VARCHAR(100),
  avatar_url      VARCHAR(500),
  target_rank     VARCHAR(10),         -- 'J5'|'J4'|'J3'|'J2'|'J1'|'J1+'
  current_rank    VARCHAR(10),         -- rank ước tính từ mock test gần nhất
  daily_goal_min  SMALLINT DEFAULT 15, -- phút/ngày
  exam_target_date DATE,               -- ngày thi dự kiến
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 📚 Content (Questions, Vocab, Grammar, Keigo)

```sql
-- Section enum
CREATE TYPE exam_section AS ENUM ('listening', 'listening_reading', 'reading');
CREATE TYPE j_level AS ENUM ('J5', 'J4', 'J3', 'J2', 'J1', 'J1+');
CREATE TYPE question_type AS ENUM (
  -- Listening
  'scene_understanding',    -- 場面把握 (có video/ảnh + audio)
  'utterance_listening',    -- 発言聴解
  'comprehensive_listening',-- 総合聴解
  -- Listening+Reading
  'situation_understanding',-- 状況把握 (có video/ảnh + audio)
  'document_lr',            -- 資料聴読解 (chart + audio)
  'comprehensive_lr',       -- 総合聴読解
  -- Reading
  'vocab_grammar',          -- 語彙・文法
  'expression_reading',     -- 表現読解
  'comprehensive_reading'   -- 総合読解
);

-- Câu hỏi chính
CREATE TABLE questions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section         exam_section NOT NULL,
  question_type   question_type NOT NULL,
  level           j_level NOT NULL,
  topic           VARCHAR(50),          -- 'meeting' | 'email' | 'finance' | ...
  content_ja      TEXT NOT NULL,        -- nội dung câu hỏi tiếng Nhật
  content_en      TEXT,                 -- dịch EN (cho AI explain)
  audio_url       VARCHAR(500),         -- S3 URL (NULL nếu không có audio)
  image_url       VARCHAR(500),         -- S3 URL (NULL nếu không có ảnh/biểu đồ)
  has_video       BOOLEAN DEFAULT FALSE,-- TRUE chỉ cho 場面把握 + 状況把握
  video_url       VARCHAR(500),         -- S3 URL
  difficulty      SMALLINT DEFAULT 3,   -- 1(easy)→5(hard), dùng cho IRT scoring
  is_published    BOOLEAN DEFAULT FALSE,
  source          VARCHAR(100),         -- 'official_sample'|'created'|'adapted'
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_questions_section ON questions(section);
CREATE INDEX idx_questions_level ON questions(level);
CREATE INDEX idx_questions_type ON questions(question_type);
CREATE INDEX idx_questions_published ON questions(is_published);

-- Đáp án (4 lựa chọn)
CREATE TABLE question_choices (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id  UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  choice_order SMALLINT NOT NULL,    -- 1, 2, 3, 4
  content_ja   TEXT NOT NULL,
  content_en   TEXT,
  is_correct   BOOLEAN DEFAULT FALSE,
  explain_ja   TEXT,                 -- giải thích tại sao đúng/sai
  explain_en   TEXT,
  explain_vi   TEXT
);

CREATE INDEX idx_choices_question ON question_choices(question_id);

-- ====== VOCABULARY ======
CREATE TABLE vocab_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_ja      VARCHAR(100) NOT NULL,  -- 取締役
  reading      VARCHAR(100),           -- とりしまりやく
  meaning_ja   TEXT,
  meaning_en   TEXT NOT NULL,
  meaning_vi   TEXT,
  example_ja   TEXT,                   -- câu ví dụ kinh doanh
  example_en   TEXT,
  example_vi   TEXT,
  audio_url    VARCHAR(500),           -- S3 URL phát âm
  topic        VARCHAR(50),            -- 'organization' | 'finance' | 'meeting' | ...
  level        j_level NOT NULL,
  jlpt_level   VARCHAR(5),             -- 'N1'|'N2'|... (tham chiếu)
  tags         TEXT[],                 -- ['keigo','formal','meeting']
  is_published BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  deleted_at   TIMESTAMPTZ
);

CREATE INDEX idx_vocab_level ON vocab_items(level);
CREATE INDEX idx_vocab_topic ON vocab_items(topic);

-- ====== GRAMMAR ======
CREATE TABLE grammar_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_ja      VARCHAR(200) NOT NULL, -- ～を踏まえて
  meaning_en      TEXT NOT NULL,
  meaning_vi      TEXT,
  usage_note_ja   TEXT,                  -- khi nào dùng, formal/informal
  usage_note_en   TEXT,
  usage_note_vi   TEXT,
  examples        JSONB,                 -- [{ja:'...', en:'...', vi:'...'}]
  level           j_level NOT NULL,
  topic           VARCHAR(50),
  is_published    BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);

-- ====== KEIGO (Module A2 — ưu tiên #1) ======
CREATE TABLE keigo_items (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_form       VARCHAR(100) NOT NULL,  -- いる / 言う / 食べる
  -- Ba loại chính
  sonkeigo        VARCHAR(200),           -- 尊敬語: いらっしゃる
  kenjougo_1      VARCHAR(200),           -- 謙譲語Ⅰ: おる (hành động hướng về người)
  kenjougo_2      VARCHAR(200),           -- 謙譲語Ⅱ/丁重語: おります (lịch sự đơn thuần)
  teineigo        VARCHAR(200),           -- 丁寧語: います
  -- Tình huống
  situation       VARCHAR(50),            -- 'phone'|'visit'|'email'|'meeting'|'general'
  situation_note_ja TEXT,                 -- giải thích dùng khi nào
  situation_note_en TEXT,
  situation_note_vi TEXT,
  -- Bẫy thường gặp
  common_mistake  TEXT,                   -- lỗi người nước ngoài hay mắc
  trap_question_ja TEXT,                  -- câu hỏi trap dạng BJT
  correct_answer  VARCHAR(200),
  wrong_options   TEXT[],                 -- các đáp án sai phổ biến
  -- Tham chiếu
  source_reference VARCHAR(100),          -- '敬語の指針 p.xx'
  level           j_level NOT NULL,
  is_published    BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_keigo_situation ON keigo_items(situation);
CREATE INDEX idx_keigo_level ON keigo_items(level);
```

---

### 🧠 Learning & SRS

```sql
-- SRS review records (dùng SM-2 modified)
CREATE TABLE srs_reviews (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id         UUID NOT NULL,        -- FK tới vocab/grammar/keigo (polymorphic)
  item_type       VARCHAR(20) NOT NULL, -- 'vocab'|'grammar'|'keigo'
  -- SM-2 fields
  ease_factor     DECIMAL(4,2) DEFAULT 2.5, -- độ dễ, ban đầu 2.5
  interval_days   INTEGER DEFAULT 1,         -- số ngày tới lần review tiếp
  repetitions     SMALLINT DEFAULT 0,        -- số lần review thành công liên tiếp
  due_at          TIMESTAMPTZ NOT NULL,      -- thời điểm cần review tiếp
  last_quality    SMALLINT,                  -- 0–5 (chất lượng lần review trước)
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

CREATE INDEX idx_srs_user_due ON srs_reviews(user_id, due_at);
CREATE INDEX idx_srs_item ON srs_reviews(item_id, item_type);

-- Lịch sử từng lần trả lời practice
CREATE TABLE learning_answers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id  UUID NOT NULL REFERENCES questions(id),
  choice_id    UUID REFERENCES question_choices(id),
  is_correct   BOOLEAN NOT NULL,
  time_taken_ms INTEGER,              -- thời gian trả lời (ms)
  session_type VARCHAR(20),           -- 'practice'|'mini_mock'|'full_mock'
  answered_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_answers_user ON learning_answers(user_id, answered_at DESC);
CREATE INDEX idx_answers_question ON learning_answers(question_id);

-- Streak tracking
CREATE TABLE streaks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  current_streak  INTEGER DEFAULT 0,
  longest_streak  INTEGER DEFAULT 0,
  last_active_at  DATE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- XP & Level
CREATE TABLE user_xp (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  total_xp    INTEGER DEFAULT 0,
  level       SMALLINT DEFAULT 1,   -- app level (1–50), khác J-level
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements
CREATE TABLE achievements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code        VARCHAR(50) UNIQUE NOT NULL, -- '7_day_streak', 'first_mock', 'j3_rank'
  name_ja     VARCHAR(100),
  name_en     VARCHAR(100),
  name_vi     VARCHAR(100),
  icon_url    VARCHAR(500),
  xp_reward   INTEGER DEFAULT 0
);

CREATE TABLE user_achievements (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id),
  earned_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);
```

---

### 🎯 Mock Test

```sql
CREATE TYPE mock_type AS ENUM ('mini', 'half', 'full');
CREATE TYPE j_rank AS ENUM ('J5', 'J4', 'J3', 'J2', 'J1', 'J1+', 'below_J5');

-- Session mock test
CREATE TABLE mock_test_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mock_type       mock_type DEFAULT 'full',
  status          VARCHAR(20) DEFAULT 'in_progress', -- 'in_progress'|'submitted'|'expired'
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  ended_at        TIMESTAMPTZ,
  time_limit_sec  INTEGER DEFAULT 6300,  -- 105 phút = 6300s
  -- Kết quả
  total_score     SMALLINT,              -- 0–800
  predicted_rank  j_rank,
  score_listening SMALLINT,             -- điểm section 聴解
  score_lr        SMALLINT,             -- điểm section 聴読解
  score_reading   SMALLINT,             -- điểm section 読解
  -- Resume support
  last_question_idx SMALLINT DEFAULT 0,
  snapshot_data   JSONB,               -- state để resume khi crash
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mock_user ON mock_test_sessions(user_id, started_at DESC);

-- Từng câu trả lời trong mock test
CREATE TABLE mock_test_answers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    UUID NOT NULL REFERENCES mock_test_sessions(id) ON DELETE CASCADE,
  question_id   UUID NOT NULL REFERENCES questions(id),
  choice_id     UUID REFERENCES question_choices(id), -- NULL = chưa trả lời
  is_correct    BOOLEAN,
  time_taken_ms INTEGER,
  answered_at   TIMESTAMPTZ
);

CREATE INDEX idx_mock_answers_session ON mock_test_answers(session_id);

-- Weak point analysis (sau mock test)
CREATE TABLE weak_point_analyses (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     UUID NOT NULL REFERENCES mock_test_sessions(id),
  user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  -- Top 3 điểm yếu
  weak_area_1    JSONB, -- {section, question_type, topic, error_rate, recommend_module}
  weak_area_2    JSONB,
  weak_area_3    JSONB,
  ai_summary_ja  TEXT,  -- AI generated summary tiếng Nhật
  ai_summary_en  TEXT,
  ai_summary_vi  TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 💳 Subscription & Payment

```sql
CREATE TYPE subscription_plan AS ENUM ('free', 'premium_monthly', 'premium_annual');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'trial');

CREATE TABLE subscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan            subscription_plan DEFAULT 'free',
  status          subscription_status DEFAULT 'active',
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  expires_at      TIMESTAMPTZ,
  -- Payment provider
  store           VARCHAR(20),   -- 'ios_iap'|'android_iap'|'stripe'
  store_product_id VARCHAR(100),
  store_receipt   TEXT,          -- encrypted receipt
  stripe_customer_id VARCHAR(100),
  stripe_subscription_id VARCHAR(100),
  cancelled_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_sub_user ON subscriptions(user_id);
CREATE INDEX idx_sub_status ON subscriptions(status, expires_at);

-- Free tier usage tracking
CREATE TABLE free_tier_usage (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  usage_date   DATE NOT NULL,
  questions_answered SMALLINT DEFAULT 0, -- max 5/ngày cho free user
  ai_queries   SMALLINT DEFAULT 0,       -- max 0/ngày cho free user
  UNIQUE(user_id, usage_date)
);
```

---

### 📊 Analytics & AI

```sql
-- AI explanation cache
CREATE TABLE ai_explanations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id   UUID NOT NULL REFERENCES questions(id),
  locale        VARCHAR(5) NOT NULL,   -- 'ja'|'en'|'vi'
  explanation   TEXT NOT NULL,
  model_used    VARCHAR(50),           -- 'claude-sonnet-4-5' v.v.
  token_count   INTEGER,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  expires_at    TIMESTAMPTZ,           -- cache TTL
  UNIQUE(question_id, locale)
);

-- AI recommendation log
CREATE TABLE ai_recommendations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id      UUID REFERENCES mock_test_sessions(id),
  recommendations JSONB,              -- [{module, reason, priority}]
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Event tracking (raw events, Mixpanel supplement)
CREATE TABLE analytics_events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES users(id),
  event_name VARCHAR(100) NOT NULL,  -- 'practice_started', 'mock_submitted', ...
  properties JSONB,
  platform   VARCHAR(20),            -- 'ios'|'android'|'web'
  app_version VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_user ON analytics_events(user_id, created_at DESC);
CREATE INDEX idx_events_name ON analytics_events(event_name, created_at DESC);
```

---

## Migration Order

```
001_create_users_auth.sql
002_create_content_questions.sql
003_create_vocab_grammar_keigo.sql
004_create_srs_learning.sql
005_create_mock_test.sql
006_create_subscriptions.sql
007_create_analytics_ai.sql
008_seed_achievements.sql
009_seed_keigo_items_batch1.sql   ← Phase 2A, A2 Keigo
010_seed_vocab_business_batch1.sql
011_seed_questions_reading_batch1.sql
```

---

## Index Strategy

```sql
-- Performance critical queries
-- 1. SRS daily queue (query thường xuyên nhất)
CREATE INDEX CONCURRENTLY idx_srs_daily_queue
  ON srs_reviews(user_id, due_at)
  WHERE due_at <= NOW();

-- 2. Mock test in progress (cần fast resume)
CREATE INDEX CONCURRENTLY idx_mock_in_progress
  ON mock_test_sessions(user_id, status)
  WHERE status = 'in_progress';

-- 3. Question filter (practice screen)
CREATE INDEX CONCURRENTLY idx_questions_practice
  ON questions(section, level, is_published)
  WHERE is_published = TRUE AND has_video = FALSE;
```

---

## Estimated Data Volume (Year 1)

| Bảng | Ước tính rows | Note |
|------|--------------|------|
| users | 10,000 | Target MAU Y1 |
| questions | 500+ | MVP target |
| vocab_items | 500+ | J5→J1+ |
| keigo_items | 150+ | A2 module |
| grammar_items | 200+ | A3 module |
| srs_reviews | 2,000,000 | ~200 items × 10,000 users |
| learning_answers | 5,000,000 | ~500 answers/user |
| mock_test_sessions | 50,000 | ~5 mock/user |
| ai_explanations | 500 | cache per question |
