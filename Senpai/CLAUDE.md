# CLAUDE.md — Senpai | Tiếng Nhật Thực Chiến

## Project
**Senpai** — "Học từ người đã trải qua"  
Nền tảng học tiếng Nhật công sở thực chiến cho dân IT làm dự án Nhật.

**Triết lý:** Học theo tình huống thực tế — không dạy ngữ pháp, dạy cách sống sót trong dự án.  
**Định dạng bài học:** Text → Audio → **Video** (lộ trình dài hạn, cấu trúc sẵn từ đầu).  
**Target users:** Comtor, BA, Dev, BRSE, PM đang làm việc trực tiếp với khách Nhật.  
**MVP language:** Tiếng Việt duy nhất.

---

## Tech Stack
- HTML5 + CSS3 (Custom Properties, Flexbox, Grid) + Vanilla JS (ES6+)
- Font: Inter (Việt) + Noto Sans JP (Nhật) — Google Fonts
- Video: YouTube / Vimeo embed — không self-host ở MVP
- Hosting: GitHub Pages — static only, không backend
- **M4 Future:** Vercel + Supabase — auth + premium video access

---

## Design Tokens
```css
--color-primary:    #EF4444;  /* Red — Japanese brand */
--color-accent:     #4F46E5;  /* Indigo — UI accent */
--color-success:    #10B981;
--color-warning:    #F59E0B;
--color-background: #F8FAFC;
--color-surface:    #FFFFFF;
--color-text:       #1E293B;
--color-text-muted: #64748B;
```
Font scale: 4px base. Radius: 8px card / 12px button / 999px pill.

---

## File Structure
```
senpai/
├── index.html                      # Landing page
├── japanese/
│   ├── index.html                  # Japanese Hub — chọn giai đoạn
│   ├── stage1/                     # N3 Nâng cao (4–6 tuần)
│   │   ├── index.html
│   │   ├── grammar/                # M1.1: Ngữ pháp N3 công sở
│   │   ├── vocabulary/             # M1.2: Từ vựng 250 từ + SRS
│   │   ├── phone/                  # M1.3: Điện thoại & hội thoại
│   │   └── reading/                # M1.4: Đọc email, thông báo, memo
│   ├── stage2/                     # N2 Business Foundation (6–8 tuần)
│   │   ├── index.html              # ✅ Tổng quan 6 modules + progress
│   │   ├── keigo/                  # M2.1: 丁寧語 → 尊敬語 (chưa có)
│   │   ├── email/                  # M2.2: Email công sở
│   │   │   ├── index.html          # ✅ Danh sách 4 bài
│   │   │   ├── lesson-01.html      # ✅ Xin chào khi join dự án mới
│   │   │   ├── lesson-02.html      # ✅ Báo cáo tiến độ 週次報告
│   │   │   └── lesson-03.html      # ✅ Báo delay — xin lỗi + giải pháp
│   │   ├── meeting/                # M2.3: Họp hành 会議
│   │   │   ├── index.html          # ✅ Danh sách 3 bài
│   │   │   ├── lesson-01.html      # ✅ Mở đầu & kết thúc cuộc họp
│   │   │   └── lesson-02.html      # ✅ Đặt câu hỏi, xin xác nhận
│   │   ├── reporting/              # M2.4: Báo cáo 進捗報告
│   │   │   ├── index.html          # ✅ Danh sách 3 bài
│   │   │   └── lesson-01.html      # ✅ Báo cáo bug / issue
│   │   ├── grammar/                # M2.5: Ngữ pháp N2 (chưa có)
│   │   └── reception/              # M2.6: Tiếp khách 接待 (chưa có)
│   ├── stage3/                     # N1 Business Advanced (8–10 tuần)
│   │   ├── index.html
│   │   ├── keigo-advanced/         # M3.1: 謙譲語 & 丁重語
│   │   ├── presentation/           # M3.2: プレゼン
│   │   ├── trouble/                # M3.3: Xử lý vấn đề, delay, bug
│   │   ├── negotiation/            # M3.4: Đàm phán 交渉
│   │   ├── reading/                # M3.5: Đọc tài liệu N1
│   │   └── email-advanced/         # M3.6: Email keigo hoàn chỉnh
│   ├── stage4/                     # Business Pro (6–8+ tuần)
│   │   ├── index.html
│   │   ├── it-japanese/            # M4.1: IT Japanese chuyên sâu
│   │   ├── documents/              # M4.2: 稟議書・報告書・提案書
│   │   ├── test-prep/              # M4.3: BJT & JLPT N1
│   │   └── culture/                # M4.4: Văn hóa (報連相, Nemawashi)
│   └── vocabulary/                 # Từ vựng xuyên suốt
│       ├── index.html              # ✅ Flashcard hub + word list + SRS rating
│       └── phrases.html            # ✅ 37 mẫu câu / 6 nhóm + search realtime
├── assets/
│   ├── css/
│   │   ├── main.css                # Global styles, design tokens
│   │   ├── lesson.css              # Layout bài học + video embed
│   │   └── components.css          # Card, quiz, flashcard, badge
│   ├── js/
│   │   ├── progress.js             # ✅ LocalStorage + global API (xem bên dưới)
│   │   ├── quiz.js                 # Quiz logic + score
│   │   ├── flashcard.js            # Spaced repetition + SenpaiFlashcard.getAll/save
│   │   └── theme.js                # Dark mode toggle + scroll reveal tự động
│   ├── audio/                      # File âm thanh phát âm (pre-recorded)
│   └── screenshots/                # Chụp sau thay đổi lớn
└── docs/
    ├── japanese-content.md         # Nội dung chi tiết từng module
    ├── lesson-template.md          # HTML template chuẩn cho bài học
    ├── design-system.md            # Component library, spacing rules
    ├── session-notes.md            # Ghi chú giữa các session làm việc
    └── video-script-{m}-{l}.md    # Kịch bản video — per-scene format cho AI gen
```
## Key Files (load khi cần)
- Content plan: `@docs/japanese-content.md`
- Lesson HTML template: `@docs/lesson-template.md`
- Design system: `@docs/design-system.md`
- Session notes: `@docs/session-notes.md`
- **Learning roadmap đầy đủ: `@senpai-learning-roadmap.md`**
- **Video script mẫu: `@docs/video-script-m2.2-email-lesson-01.md`**
- **Video production workflow: `@docs/sagyobuntan.md`**

---

## Video Script Format (cho AI video gen)

**Naming:** `docs/video-script-{module-id}-{lesson-id}.md`
Ví dụ: `docs/video-script-m2.2-email-lesson-02.md`

**Cấu trúc mỗi file:**
```
YAML frontmatter     # video_id, platform, duration, culture_points
CAST table           # định nghĩa nhân vật 1 lần
SCENES (full)        # mỗi scene: TYPE · TIMESTAMP · DURATION
  - VOICEOVER / DIALOGUE
  - TEXT_OVERLAY, SFX, MOOD, CAMERA
  - ```ai-prompt``` block  ← Claude extract batch này
SHORT VERSION        # Reels/Shorts — reuse scenes full
CLAUDE AUTO-GEN      # prompt sẵn để gọi Claude xử lý
```

**Characters chuẩn (dùng lại xuyên suốt):**
| ID | Mô tả |
|---|---|
| DYNH | Nam Việt, 25–28, áo sơ mi xanh nhạt, nhân vật chính |
| ONG_CHON | Nam Việt, 45–50, áo polo tối, mentor thực dụng |
| HONDA | Nam Nhật, 40–45, suit tối, PM phía khách Nhật |

**Claude auto-gen commands (dán vào chat):**
- Extract batch Kling AI prompts: `"extract tất cả \`\`\`ai-prompt\`\`\` blocks, format numbered list với SCENE-XX | platform | duration"`
- Export voiceover script: `"extract VOICEOVER và DIALOGUE theo thứ tự scene, plain text"`
- Gen missing prompt: `"SCENE-XX chưa có ai-prompt, gen theo style file này, characters: DYNH/ONG_CHON/HONDA"`
- Tạo production checklist: `"tạo checklist: SCENE-XX | platform | duration | [ ] status"`

---

## JS API — progress.js (global functions)
```js
isLessonComplete(lessonId)        // → boolean
markLessonComplete(lessonId)      // lưu vào LocalStorage
calculateProgress(lessonIds[])    // → number (0–100)
```
**Lesson ID convention:** `s{stage}-{module}-{nn}` — ví dụ:
- `s2-email-01`, `s2-email-02`, `s2-email-03`
- `s2-meeting-01`, `s2-meeting-02`
- `s2-reporting-01`

> `theme.js` đã xử lý scroll reveal tự động cho `.reveal` — không cần thêm `IntersectionObserver` thủ công trong từng page.

---

## Dark Mode — Lưu ý CSS
Nếu dùng **gradient màu cố định** (không dùng CSS variable), phải override trong dark mode:
```css
.my-element { background: linear-gradient(#FEF2F2, #EEF2FF); color: #1D1D1F; }
[data-theme="dark"] .my-element { background: linear-gradient(rgba(...), rgba(...)); color: #F5F5F7; }
```

---

## Lesson Page Structure (mọi bài học PHẢI theo template này)
```
1. [Hero]       Tình huống — bối cảnh dự án IT cụ thể, ngắn gọn
2. [Video]      YouTube/Vimeo embed (placeholder đẹp nếu chưa có video)
3. [Notes]      Transcript tóm tắt + điểm chính từ video
4. [Vocab]      3–5 từ chính, furigana + phiên âm + audio button
5. [Pattern]    Mẫu câu cốt lõi + 2–3 biến thể hoàn cảnh khác nhau
6. [Example]    Email / hội thoại đầy đủ, chú thích từng phần quan trọng
7. [Practice]   Fill-in-the-blank interactive (Vanilla JS)
8. [Quiz]       3–5 câu trắc nghiệm, feedback ngay, lưu score LocalStorage
9. [Nav]        Progress bar module + nút "Bài tiếp theo →"
```
> Phần `[Video]` phải có **fallback placeholder** (ảnh thumbnail + text) khi chưa upload video.  
> Khi có video thật: chỉ thay src embed, không cần đụng layout.

---

## Learning Roadmap (4 giai đoạn)
> Full detail: `@senpai-learning-roadmap.md` · Tổng thời gian ước tính: 24–32 tuần

```
N3 Nâng cao  →  N2 Business Foundation  →  N1 Business Advanced  →  Business Pro
  Stage 1          Stage 2                    Stage 3                  Stage 4
  4–6 tuần         6–8 tuần                   8–10 tuần                6–8+ tuần
```

**Stage 1 — N3 Nâng cao** (Nghe 30% · Đọc 30% · Nói 20% · Từ vựng 20%)
- M1.1 Ngữ pháp N3: `〜ていただく`, `〜ようだ`, `〜らしい`
- M1.2 Từ vựng 250 từ công sở + Flashcard SRS
- M1.3 Điện thoại — nghe máy, chuyển máy, nhắn lại, hẹn lịch
- M1.4 Đọc email nội bộ, thông báo, lịch họp, memo

**Stage 2 — N2 Business Foundation** (Keigo 25% · Email 25% · Họp 25% · Báo cáo 25%)
- M2.1 Keigo: `丁寧語` → `尊敬語` (いらっしゃる, おっしゃる, なさる)
- M2.2 Email chuẩn: cảm ơn, xác nhận, đề nghị, đính kèm
- M2.3 Họp hành `会議`: mở đầu, thảo luận, phản đối lịch sự, kết thúc
- M2.4 Báo cáo `進捗報告`, weekly report
- M2.5 Ngữ pháp N2: `〜に伴い`, `〜に関して`, `〜を踏まえて`
- M2.6 Tiếp khách `接待`: đón khách, `名刺交換`, ăn cơm công tác

**Stage 3 — N1 Business Advanced** (Keigo 30% · Presentation 20% · Vấn đề 25% · Đàm phán 25%)
- M3.1 Keigo hoàn chỉnh: `謙譲語` & `丁重語` (おります, 申します, 拝見する)
- M3.2 Presentation `プレゼン`: mở đầu, chuyển điểm, số liệu, Q&A
- M3.3 Xử lý: delay / bug / scope change + xin lỗi 3 cấp độ
- M3.4 Đàm phán `交渉`: đề xuất, counter-offer, nhượng bộ có điều kiện
- M3.5 Đọc tài liệu N1: `要件定義書`, hợp đồng, báo cáo kỹ thuật
- M3.6 Email keigo nâng cao: xin lỗi nghiêm trọng, escalation, follow-up

**Stage 4 — Business Pro** (Liên tục — không có điểm kết thúc)
- M4.1 IT Japanese: `報連相`, `議事録`, estimation, scope change communication
- M4.2 Văn bản chính thức: `稟議書`, `報告書`, `提案書`
- M4.3 Luyện BJT & JLPT N1 — mock test + phân tích điểm yếu
- M4.4 Văn hóa Nhật: Nemawashi, Ringi, Uchi-soto, `間 (Ma)`

---

## LocalStorage Features (không cần backend)
| Key | Kiểu | Mục đích |
|---|---|---|
| `senpai_progress` | `{lessonId: true}` | Bài đã hoàn thành |
| `senpai_scores` | `{lessonId: score}` | Điểm quiz từng bài |
| `senpai_bookmarks` | `[lessonId, ...]` | Bài yêu thích |
| `senpai_flashcards` | `[{front, back, due}]` | Deck cá nhân + spaced repetition |
| `senpai_theme` | `"light" \| "dark"` | Dark mode preference |

---

## Premium Structure (chuẩn bị HTML từ M1, không cần backend)
```html
<!-- Free lesson -->
<article class="lesson lesson--free">...</article>

<!-- Premium lesson — blur overlay, unlock khi M4 có auth -->
<article class="lesson lesson--premium">
  <div class="lesson__lock">
    🔒 Nội dung Premium — <a href="/pricing.html">Mở khóa</a>
  </div>
</article>
```
> Khi M4 lên Supabase: chỉ cần toggle class `lesson--unlocked` sau auth check.  
> Không cần rebuild UI, không cần refactor layout.

---

## Milestones (Dev phases)
| Phase | Mục tiêu | Deliverable | Learning Stages |
|---|---|---|---|
| **M1 — MVP** | Nền tảng | Landing + Japanese Hub + 2 bài học (text) + GitHub Pages | Stage 2 Email (2 bài) |
| **M2 — Content** | Nội dung | Stage 2 đầy đủ + video embed + progress tracking | Stage 2 hoàn chỉnh (6 modules) |
| **M3 — Engagement** | Tương tác | Quiz + Flashcard + Audio + Dark mode + Stage 1 & 3 | Stage 1 + Stage 3 |
| **M4 — Monetize** | Kinh doanh | Vercel + Supabase — auth + premium video + Stage 4 | Stage 4 (premium) |

---

## Navigation
```
[Senpai]  [🇯🇵 Học ngay]  [🔤 Từ vựng]  [📚 Resources]  [🔒 Premium]
```

---

## Rules (MUST FOLLOW)
1. Tiếng Việt trước — Nhật sau (không song ngữ ở MVP)
2. Mobile-first — test mobile trước khi báo xong
3. Mọi bài học PHẢI theo đúng **Lesson Page Structure** 9 phần ở trên
4. Furigana bắt buộc cho mọi Kanji trong bài học
5. Video section phải có **fallback placeholder** khi chưa có video thật
6. Mọi feature dùng LocalStorage — không gọi API ngoài ở MVP
7. Code đơn giản — Vanilla JS, không framework, không build tool
8. Animation scroll-in cho mọi section khi vào viewport
9. Footer mọi trang: `Copyright © 2026 DynhNC5 | senpai.vn`
10. Screenshot sau thay đổi lớn → `assets/screenshots/`
11. Chữ ký **"Senpai DynhNC5"** phải xuất hiện ở **header** (navbar brand) và **footer** (footer__bottom) của mọi trang trong dự án — không được bỏ hoặc thay đổi tên này
12. **Link path phải khớp file thực tế** — trước khi viết bất kỳ `href` nào, xác nhận file đích tồn tại đúng vị trí. Cấu trúc chuẩn: `japanese/stage{N}/{module}/lesson-{NN}.html`. Không dùng alias cũ (`business/`, `modules/`, v.v.). Sau khi thêm link mới, chạy kiểm tra: `grep -r "href=" --include="*.html" | grep -v "http" | grep -v "#"` rồi verify từng path.

## Commit Convention
`feat:` | `fix:` | `style:` | `content:` | `refactor:`

## When compacting
Preserve: tech stack, Lesson Page Structure (9 phần), LocalStorage keys, Premium Structure, Rules section.

## Task planing:
Dựa trên lộ trình Senpai hiện tại, MVP nên chia thành **6 nhóm function chính** để code theo từng sprint.
Mình đang bám theo cấu trúc dự án trong file `CLAUDE.md`: static web bằng HTML/CSS/Vanilla JS, có landing page, Japanese hub, stage/module/lesson, lesson template gồm Hero → Video → Notes → Vocab → Pattern → Example → Practice → Quiz → Nav, lưu progress bằng LocalStorage. 

## 1. Function nhóm Landing / Điều hướng chính

### Function cần có

| Function     | Mục đích                                       |
| ------------ | ---------------------------------------------- |
| Landing Page | Giới thiệu Senpai, đối tượng học, lộ trình học |
| Japanese Hub | Chọn giai đoạn học                             |
| Stage List   | Hiển thị Stage 1 → Stage 4                     |
| Module List  | Hiển thị các module trong từng stage           |
| Lesson List  | Hiển thị danh sách bài học trong module        |

### Task coding nhỏ

**Task 1.1 — Tạo layout landing page**

* Tạo `index.html`
* Tạo section hero
* Tạo section “Senpai dành cho ai”
* Tạo section “Học theo tình huống công sở”
* Tạo button “Bắt đầu học”
* Link sang `/japanese/index.html`

**Task 1.2 — Tạo Japanese Hub**

* Tạo `/japanese/index.html`
* Tạo card cho 4 stage:

  * Stage 1: N3 nâng cao
  * Stage 2: N2 Business Foundation
  * Stage 3: N1 Business Advanced
  * Stage 4: Business Pro
* Mỗi card có:

  * Tên stage
  * Mô tả ngắn
  * Số module
  * Progress %

**Task 1.3 — Tạo trang stage**

* Tạo `/japanese/stage1/index.html`
* Tạo `/japanese/stage2/index.html`
* Tạo `/japanese/stage3/index.html`
* Tạo `/japanese/stage4/index.html`
* Mỗi trang hiển thị danh sách module tương ứng

---

## 2. Function nhóm Lesson Page

Đây là phần quan trọng nhất của MVP.

### Function cần có

| Function           | Mục đích                             |
| ------------------ | ------------------------------------ |
| Lesson Hero        | Nêu tình huống thực tế               |
| Video Embed        | Nhúng YouTube/Vimeo hoặc placeholder |
| Transcript / Notes | Tóm tắt nội dung bài                 |
| Vocabulary Block   | Từ vựng chính                        |
| Pattern Block      | Mẫu câu cốt lõi                      |
| Example Block      | Hội thoại/email mẫu                  |
| Practice Block     | Bài luyện điền từ                    |
| Quiz Block         | Câu hỏi trắc nghiệm                  |
| Lesson Navigation  | Bài trước / bài tiếp theo            |
| Mark Complete      | Đánh dấu đã học                      |

### Task coding nhỏ

**Task 2.1 — Tạo template bài học chuẩn**

* Tạo `docs/lesson-template.md`
* Tạo HTML mẫu gồm:

  * `.lesson-hero`
  * `.video-section`
  * `.lesson-notes`
  * `.vocab-section`
  * `.pattern-section`
  * `.example-section`
  * `.practice-section`
  * `.quiz-section`
  * `.lesson-nav`

**Task 2.2 — Tạo CSS riêng cho lesson**

* Tạo `assets/css/lesson.css`
* Style cho:

  * Lesson container
  * Video placeholder
  * Japanese sentence block
  * Vietnamese explanation block
  * Vocab card
  * Quiz card
  * Progress bar

**Task 2.3 — Tạo lesson đầu tiên**

Ví dụ:

`/japanese/stage2/email/lesson-01.html`

Chủ đề:

> Xin chào khi join dự án mới

Nội dung cần có:

* Tình huống
* Video placeholder
* 3–5 từ vựng
* 2–3 mẫu câu
* 1 email mẫu
* 3 câu quiz
* Nút hoàn thành bài học

---

## 3. Function nhóm Progress Tracking

Vì MVP static only nên dùng `LocalStorage`.

### Function cần có

| Function                  | Mục đích            |
| ------------------------- | ------------------- |
| Save Lesson Progress      | Lưu bài đã học      |
| Read Lesson Progress      | Đọc trạng thái bài  |
| Calculate Module Progress | Tính % module       |
| Calculate Stage Progress  | Tính % stage        |
| Continue Learning         | Gợi ý bài tiếp theo |
| Reset Progress            | Xóa tiến độ nếu cần |

### Task coding nhỏ

**Task 3.1 — Tạo file progress.js**

Tạo:

`assets/js/progress.js`

Các function chính:

```js
function markLessonComplete(lessonId) {}

function isLessonComplete(lessonId) {}

function getCompletedLessons() {}

function calculateProgress(lessonIds) {}

function resetProgress() {}
```

**Task 3.2 — Gắn button hoàn thành bài học**

* Thêm button “Đánh dấu đã học”
* Khi click:

  * Lưu lessonId vào LocalStorage
  * Đổi trạng thái button
  * Cập nhật progress bar

**Task 3.3 — Hiển thị progress ở module/stage**

* Ở trang stage, mỗi module có progress %
* Ở trang hub, mỗi stage có progress %
* Nếu chưa học bài nào: hiển thị `0%`
* Nếu hoàn thành: hiển thị badge `Hoàn thành`

---

## 4. Function nhóm Quiz / Practice

Đây là phần giúp phần mềm khác với web bài viết thông thường.

### Function cần có

| Function             | Mục đích               |
| -------------------- | ---------------------- |
| Multiple Choice Quiz | Trắc nghiệm 3–5 câu    |
| Instant Feedback     | Chọn xong báo đúng/sai |
| Save Score           | Lưu điểm quiz          |
| Retry Quiz           | Làm lại quiz           |
| Fill in the Blank    | Điền từ vào câu        |
| Show Answer          | Xem đáp án             |

### Task coding nhỏ

**Task 4.1 — Tạo quiz.js**

Tạo:

`assets/js/quiz.js`

Các function chính:

```js
function initQuiz(quizId, questions) {}

function selectAnswer(questionId, answerIndex) {}

function calculateQuizScore(quizId) {}

function saveQuizScore(quizId, score) {}

function showQuizResult(quizId) {}

function retryQuiz(quizId) {}
```

**Task 4.2 — Tạo component quiz HTML**

Mỗi câu gồm:

* Câu hỏi
* 4 lựa chọn
* Feedback đúng/sai
* Giải thích ngắn

**Task 4.3 — Tạo practice fill-in-the-blank**

Ví dụ:

```html
<input data-answer="お世話になります">
<button class="check-answer">Kiểm tra</button>
<p class="feedback"></p>
```

Function JS:

```js
function checkBlankAnswer(inputElement) {}
```

---

## 5. Function nhóm Vocabulary / Flashcard

Phần này nên làm sớm vì có thể tái sử dụng xuyên suốt các stage.

### Function cần có

| Function       | Mục đích                |
| -------------- | ----------------------- |
| Vocabulary Hub | Trang tổng hợp từ vựng  |
| Flashcard      | Lật thẻ Nhật ↔ Việt     |
| Audio Button   | Nghe phát âm            |
| Favorite Word  | Đánh dấu từ cần học lại |
| Simple SRS     | Ôn lại từ khó           |
| Phrase Bank    | Kho mẫu câu cố định     |

### Task coding nhỏ

**Task 5.1 — Tạo vocabulary hub**

Tạo:

`/japanese/vocabulary/index.html`

Hiển thị:

* Từ theo stage
* Từ theo chủ đề
* Từ đã lưu
* Từ cần ôn lại

**Task 5.2 — Tạo flashcard.js**

Tạo:

`assets/js/flashcard.js`

Các function chính:

```js
function initFlashcards(cards) {}

function flipCard(cardId) {}

function markWordKnown(wordId) {}

function markWordDifficult(wordId) {}

function getReviewWords() {}
```

**Task 5.3 — Tạo phrase bank**

Tạo:

`/japanese/vocabulary/phrases.html`

Nhóm mẫu câu theo tình huống:

* Chào hỏi
* Báo cáo tiến độ
* Xác nhận
* Xin lỗi
* Nhờ hỗ trợ
* Từ chối mềm
* Báo lỗi
* Delay
* Meeting
* Email

---

## 6. Function nhóm UI / Theme / Component

### Function cần có

| Function          | Mục đích                     |
| ----------------- | ---------------------------- |
| Global Header     | Điều hướng chính             |
| Breadcrumb        | Biết đang ở stage/module nào |
| Card Component    | Dùng cho stage/module/lesson |
| Badge Component   | Level, status, progress      |
| Button Component  | CTA thống nhất               |
| Dark Mode         | Toggle sáng/tối              |
| Responsive Layout | Mobile-friendly              |
| Video Placeholder | Khi chưa có video            |

### Task coding nhỏ

**Task 6.1 — Tạo main.css**

Tạo:

`assets/css/main.css`

Bao gồm:

* Design tokens
* Reset CSS
* Typography
* Layout container
* Header
* Footer

**Task 6.2 — Tạo components.css**

Tạo:

`assets/css/components.css`

Bao gồm:

* `.card`
* `.badge`
* `.button`
* `.progress-bar`
* `.lesson-card`
* `.stage-card`
* `.video-placeholder`
* `.quiz-option`

**Task 6.3 — Tạo theme.js**

Tạo:

`assets/js/theme.js`

Các function:

```js
function toggleTheme() {}

function saveTheme(theme) {}

function loadTheme() {}
```

---

# Đề xuất chia Sprint coding

## Sprint 1 — Build khung website

Mục tiêu: có web chạy được.

Task:

* Tạo folder structure
* Tạo `index.html`
* Tạo `/japanese/index.html`
* Tạo 4 trang stage
* Tạo `main.css`
* Tạo `components.css`
* Tạo header/footer
* Deploy GitHub Pages lần 1

Kết quả:

> Người dùng vào được web, xem được lộ trình, click qua các stage/module.

---

## Sprint 2 — Build lesson template

Mục tiêu: có bài học mẫu hoàn chỉnh.

Task:

* Tạo `lesson.css`
* Tạo `lesson-template.md`
* Tạo `lesson-01.html`
* Tạo video placeholder
* Tạo vocab block
* Tạo pattern block
* Tạo example block
* Tạo nav bài trước/bài sau

Kết quả:

> Có 1 bài học mẫu đúng format chuẩn.

---

## Sprint 3 — Build progress tracking

Mục tiêu: học viên biết mình đã học tới đâu.

Task:

* Tạo `progress.js`
* Lưu bài đã học vào LocalStorage
* Hiển thị progress ở lesson
* Hiển thị progress ở module
* Hiển thị progress ở stage
* Tạo nút reset progress

Kết quả:

> Học viên học xong bài nào thì hệ thống nhớ bài đó.

---

## Sprint 4 — Build quiz/practice

Mục tiêu: bài học có tương tác.

Task:

* Tạo `quiz.js`
* Tạo multiple choice quiz
* Tạo feedback đúng/sai
* Lưu điểm quiz
* Tạo fill-in-the-blank
* Gắn quiz vào lesson đầu tiên

Kết quả:

> Bài học không chỉ đọc, mà có luyện tập.

---

## Sprint 5 — Build vocabulary/flashcard

Mục tiêu: học viên ôn mẫu câu và từ vựng.

Task:

* Tạo vocabulary hub
* Tạo flashcard UI
* Tạo `flashcard.js`
* Lật thẻ Nhật/Vietnamese
* Đánh dấu “đã nhớ”
* Đánh dấu “cần ôn”
* Tạo phrase bank

Kết quả:

> Có kho mẫu câu/từ vựng dùng lại xuyên suốt lộ trình.

---

## Sprint 6 — Polish MVP

Mục tiêu: đủ đẹp để demo.

Task:

* Responsive mobile
* Dark mode
* Cải thiện landing page
* Thêm animation nhẹ
* Kiểm tra link toàn bộ site
* Chụp screenshot lưu vào `/assets/screenshots`
* Deploy bản demo MVP

Kết quả:

> Có bản demo Senpai MVP có thể cho người khác dùng thử.

---

# Thứ tự ưu tiên nên code

Nên làm theo thứ tự này:

1. `main.css`
2. `components.css`
3. `index.html`
4. `/japanese/index.html`
5. `/japanese/stage2/index.html`
6. `/japanese/stage2/email/index.html`
7. `/japanese/stage2/email/lesson-01.html`
8. `lesson.css`
9. `progress.js`
10. `quiz.js`
11. `flashcard.js`
12. `theme.js`

# MVP tối thiểu nên có

Để ra bản đầu tiên nhanh, chỉ cần làm trước:

| Hạng mục     | Cần có trong MVP                       |
| ------------ | -------------------------------------- |
| Landing page | Có                                     |
| Japanese hub | Có                                     |
| Stage page   | Có Stage 2 trước                       |
| Module page  | Có Email / Meeting / Reporting         |
| Lesson page  | Có 3 bài mẫu                           |
| Progress     | Có LocalStorage                        |
| Quiz         | Có 3 câu mỗi bài                       |
| Flashcard    | Có bản đơn giản                        |
| Video        | Placeholder trước, chưa cần video thật |
| Backend      | Chưa cần                               |

# Gợi ý scope MVP đầu tiên

Không nên build hết 4 stage ngay.
Nên chọn **Stage 2 — N2 Business Foundation** làm MVP trước, vì sát nhu cầu “tiếng Nhật công sở thực chiến” nhất.

MVP đầu tiên nên có 3 module:

| Module    | Bài đầu tiên nên làm                  |
| --------- | ------------------------------------- |
| Email     | Xin chào khi join dự án mới           |
| Meeting   | Cách phát biểu khi không hiểu ý khách |
| Reporting | Báo cáo tiến độ và báo delay          |

Sau khi MVP này ổn, mới mở rộng sang Stage 1, Stage 3, Stage 4.


## Cập nhật tiến độ công việc
Sau môi lần đối ứng task coding. Hãy cập nhật tiến độ đã đối ứng vào file senpai_mvp_task_plan