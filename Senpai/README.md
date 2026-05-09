# 先輩 Senpai — Business Japanese for IT Professionals

> **Tiếng Nhật công sở thực chiến dành riêng cho Dev, BA, PM, Comtor làm dự án IT với khách hàng Nhật**

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue)](https://pages.github.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Giới thiệu

Senpai là nền tảng e-learning Business Japanese với focus hoàn toàn vào ngành IT offshore/nearshore. Không học tiếng Nhật phổ thông — học đúng những gì cần dùng ngay trong dự án.

**Đối tượng:** Người đi làm IT đã có N4–N3, muốn lên Business Japanese (N2/N1) để thăng tiến  
**Hình thức:** Static web — HTML/CSS/JS thuần, không cần framework, deploy dễ dàng

---

## Cấu trúc dự án

```
Senpai/
├── index.html                    # Landing page
├── japanese/
│   ├── index.html                # Japanese Hub (chọn stage)
│   ├── stage2/                   # Stage 2: N2 Business Foundation ← MVP
│   │   ├── index.html            # Stage 2 overview (6 modules)
│   │   ├── email/
│   │   │   ├── index.html        # Module: Business Email
│   │   │   ├── lesson-01.html    # Bài 1: Xin chào khi join dự án
│   │   │   ├── lesson-02.html    # Bài 2: Xác nhận sau meeting
│   │   │   └── lesson-03.html    # Bài 3: ...
│   │   ├── meeting/
│   │   │   ├── index.html        # Module: Họp hành
│   │   │   ├── lesson-01.html    # Bài 1: Khi không hiểu ý khách
│   │   │   └── lesson-02.html
│   │   └── reporting/
│   │       ├── index.html        # Module: Báo cáo tiến độ
│   │       └── lesson-01.html    # Bài 1: Báo cáo & thông báo delay
│   └── vocabulary/
│       ├── index.html            # Vocabulary hub + Flashcard
│       └── phrases.html          # Phrase bank theo tình huống
├── stage/                        # Stage landing pages (stub + coming soon)
│   ├── stage1/index.html         # N3 Nâng cao (coming soon)
│   ├── stage2/index.html         # → redirect to japanese/stage2/
│   ├── stage3/index.html         # N1 Advanced (coming soon)
│   └── stage4/index.html         # Business Pro (coming soon)
├── assets/
│   ├── css/
│   │   ├── main.css              # CSS variables, reset, typography, layout
│   │   ├── components.css        # Header, footer, cards, module items
│   │   ├── lesson.css            # Lesson page, vocab, pattern, quiz, practice
│   │   └── landing.css           # Landing page specific styles
│   ├── js/
│   │   ├── theme.js              # Dark/light mode toggle
│   │   ├── progress.js           # Progress tracking (LocalStorage)
│   │   ├── quiz.js               # Quiz/MCQ engine
│   │   └── flashcard.js          # Flashcard flip + SRS
│   └── img/                      # Images & icons
├── docs/                         # Documentation & video scripts
│   ├── lesson-template.md        # Template chuẩn để tạo bài học mới
│   └── videos/                   # Video scene files
└── viral/                        # Content marketing materials
```

---

## Lộ trình học (4 Stages)

| Stage | Tên | Thời gian | Trạng thái |
|-------|-----|-----------|------------|
| 1 | N3 Nâng cao — 職場の基礎 | 4–6 tuần | 🔜 Coming Soon |
| **2** | **N2 Business Foundation — ビジネス基礎** | **6–8 tuần** | **✅ MVP Ready** |
| 3 | N1 Business Advanced — 上級ビジネス | 8–10 tuần | 🔜 Coming Soon |
| 4 | Business Pro — プロレベル | 6–8 tuần+ | 🔜 Coming Soon |

**Stage 2 modules (MVP):**
- M2.1 Keigo Cơ Bản (丁寧語 → 尊敬語)
- **M2.2 Business Email** ✅ 3 bài học
- **M2.3 Họp hành (会議)** ✅ 2 bài học
- **M2.4 Báo cáo tiến độ** ✅ 1 bài học
- M2.5 Ngữ pháp N2 (coming)
- M2.6 Tiếp khách (coming)

---

## Deploy lên GitHub Pages

### Bước 1 — Tạo repository trên GitHub

1. Truy cập [github.com](https://github.com) → **New repository**
2. Đặt tên repo: `senpai` (hoặc tên tùy chọn)
3. Chọn **Public**
4. **Không** tick "Add README" (đã có sẵn)
5. Click **Create repository**

### Bước 2 — Push code lên GitHub

Mở terminal trong folder `D:\Senpai`:

```bash
# Khởi tạo git (nếu chưa)
git init
git add .
git commit -m "chore: initial Senpai MVP commit"

# Kết nối với GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/senpai.git
git branch -M main
git push -u origin main
```

### Bước 3 — Bật GitHub Pages

1. Vào repo trên GitHub → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **/ (root)**
4. Click **Save**
5. Đợi ~2 phút → URL demo sẽ xuất hiện: `https://YOUR_USERNAME.github.io/senpai/`

### Bước 4 — Kiểm tra sau deploy

Mở URL demo, kiểm tra:
- [ ] Landing page load đúng
- [ ] Japanese Hub có 4 stage cards
- [ ] Stage 2 → Email module → Lesson 01 accessible
- [ ] Dark mode toggle hoạt động
- [ ] Mobile responsive (dùng DevTools F12)
- [ ] Không có broken links (404)

---

## Development

### Chạy locally

```bash
# Option 1: VS Code Live Server (recommended)
# Cài extension "Live Server" → click "Go Live"

# Option 2: Python
python -m http.server 8000
# Mở http://localhost:8000

# Option 3: Node
npx serve .
```

### Tạo bài học mới

1. Copy `docs/lesson-template.md` làm reference
2. Tạo file HTML trong đúng folder (vd: `japanese/stage2/email/lesson-04.html`)
3. Update lesson list trong `japanese/stage2/email/index.html`
4. Thêm `lessonId` vào mảng `MODULE_LESSONS` trong lesson file
5. Cập nhật task plan (`senpai_mvp_task_plan.xlsx`)

### CSS Design System

Tất cả màu và spacing đều dùng CSS variables từ `assets/css/main.css`:

```css
--color-primary:   #C0392B   /* Senpai Red */
--color-accent:    #2C3E7A   /* Deep Indigo */
--color-success:   #10B981
--font-jp:         'Noto Sans JP'
--font-ui:         'Inter'
```

---

## Sprint Progress

| Sprint | Scope | Deadline | Status |
|--------|-------|----------|--------|
| Sprint 1 | Khung website + deploy lần 1 | 13/05/2026 | 🟡 In Progress |
| Sprint 2 | Lesson template + Lesson 01 | 25/05/2026 | ⚪ Pending |
| Sprint 3 | Progress tracking LocalStorage | 04/06/2026 | ⚪ Pending |
| Sprint 4 | Quiz / Practice tương tác | 14/06/2026 | ⚪ Pending |
| Sprint 5 | Vocabulary / Flashcard / Phrase Bank | 25/06/2026 | ⚪ Pending |
| Sprint 6 | Polish MVP / deploy demo | 07/07/2026 | ⚪ Pending |

---

## Tech Stack

- **HTML5** — Semantic, accessible
- **CSS3** — Custom Properties, Grid, Flexbox (no framework)
- **Vanilla JS** — No dependencies, fast load
- **Google Fonts** — Noto Sans JP + Inter
- **LocalStorage** — Progress & theme persistence
- **GitHub Pages** — Free static hosting

---

*Senpai © 2026 — Business Japanese for IT Professionals*
