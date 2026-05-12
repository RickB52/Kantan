# JFTest Session Notes

## Cập nhật lần cuối: 2026-05-12 (session 2 — BJTMaster S3 scaffold)

---

## Trạng thái hiện tại

### Data files
- `js/data/roleplay.js`: **10 JF3** (id 1-10) + **10 JF2** (id 11-20) = 20 entries ✅
- `js/data/presentation.js`: **10 JF3** (id 1-10) + **10 JF2** (id 11-20) = 20 entries ✅
- JF2 presentation: ❌ Chưa có source docx → để sau

### Routing (`js/app.js`)
- JF2 & JF3 detail routes: ✅ đều có
- Router program filter: ✅ `find(e => e.id === examId && e.program === pathSegments[0])`
- `initReveal()` thay thế `initSlider()`: ✅

### UI
- Exam detail: **Vertical Progressive Reveal** ✅ (CodeX commit `2a44653`)
  - Sections stack dọc, bấm nút reveal section tiếp theo
  - Nội dung cũ giữ nguyên trên page (scroll để xem lại)
  - Auto-scroll đến section vừa reveal
  - Timer: đếm ngược prep → perform (JF2/JF3 adaptive)
- `css/style.css`: ✅ reveal CSS (animation, timer), bỏ slide deck CSS cũ

### Landing page
- ✅ JFTest card → link + status "Live (Internal)"
- ✅ Full responsive (hamburger nav + 900px + 640px breakpoints) — commit `7298719`

---

## Kết quả Session 2026-05-12

| Worker | Task | Commit | Status |
|--------|------|--------|--------|
| CodeX | Vertical progressive reveal UI (components.js + app.js + style.css) | `2a44653` | ✅ |
| CodeX | Landing page full responsive (hamburger + 2 breakpoints) | `7298719` | ✅ |

**Thay đổi chính trong session:**
- `js/components.js`: Thay `initSlider` → `initReveal`. Render functions (`renderRolePlayDetail`, `renderPresentationDetail`) viết lại hoàn toàn theo pattern vertical reveal
- `js/app.js`: Thay `initSlider(scope)` → `initReveal(scope)`
- `css/style.css`: Bỏ toàn bộ slide deck CSS (`.slide-deck`, `.slide`, `.slide-dot`), thêm reveal CSS (`.reveal-section.hidden`, `.reveal-section.revealed`, `@keyframes revealDown`, `.timer-display`)
- `landing/index.html`: Thêm hamburger button + mobile menu + 2 media query blocks + JS toggle

**ID scheme (không đổi):**
- JF3: id 1-10, program:"jf3" → URL `#/jf3/roleplay/1` ... `/10`
- JF2: id 11-20, program:"jf2" → URL `#/jf2/roleplay/11` ... `/20`
- Router filter theo `program` → không conflict

---

## Kế hoạch Round 2

### JFTest content tiếp theo
- GeminiUltra: **20 JF2 roleplay** từ source docx (id 21-40 hoặc refactor scheme)
  - Source: `Source/JF2/JF2_Roleplay/JF2_Roleplay.docx`
  - ⚠️ Encoding issue 3 lần — cần approach mới (Antigravity hoặc Claude đọc trực tiếp)
- GeminiUltra: JF2 Presentation data (cần tạo source docx trước)
- GeminiUltra: +10 JF3 roleplay + +10 JF3 presentation (→ 20 mỗi loại)
- CodeX: Keyboard navigation (←→ arrows), mobile touch swipe

### Bổ sung `timings` vào JF3 entries
- Hiện tại 10 entries JF3 chưa có `timings` field
- Cần thêm: `{ prep: 120, perform: 180 }` (roleplay) hoặc `{ prep: 120, present: 180, qa: 240 }` (presentation)

---

## Target cuối cùng

```
JF2: 20 roleplay + 20 presentation = 40 đề
JF3: 20 roleplay + 20 presentation = 40 đề
Tổng: 80 đề, đầy đủ timer, vertical reveal UI, tiếng Nhật chuẩn N3-N1
```

---

## Git commits (chronological)

```
c041422 feat: initial commit
e8e7002 [landing] fix: link JFTest card to actual local app
9a3419e [jftest] fix: restore Japanese content + Noto Sans JP CSS
1e1c368 (prev session) JF2 data 10 entries (id 11-20, encoding OK)
dae762f (REVERTED) GeminiUltra 20 JF2 entries — encoding corrupted
6828956 revert: revert GeminiUltra corrupted JF2 data
6c63677 [kantan] docs: update CLAUDE.md to reflect current state
2a44653 [jftest] feat: vertical progressive reveal UI
7298719 [landing] feat: full responsive design - hamburger nav + mobile/tablet breakpoints
e5a7f3b [jftest] feat: exam slide card UI (roleplay + presentation)
1f88795 [bjtmaster] feat: G1 monorepo root (package.json, tsconfig.base, eslint, prettier)
1a9a8ec [bjtmaster] feat: G2+G3 packages/types + packages/core (SRS algorithm)
b788ae6 [bjtmaster] feat: G4 apps/api NestJS foundation (health + auth JWT)
ae057b3 [bjtmaster] docs: update CLAUDE.md — S3 scaffold complete (G1-G4)
```

---

## Ghi chú kỹ thuật

- **Vertical reveal pattern**: `.reveal-deck` > `.reveal-section.visible` (first visible) + `.reveal-section.hidden` (rest)
  - Actions: `data-reveal-action="show-next|start-timer|skip-timer|start-perform-timer"`
  - JS function: `initReveal(scope)` — global, gọi trong `initPage(scope)` sau render
- **Encoding (CRITICAL)**: GeminiUltra đã bị corrupt 3 lần
  - Solution tốt nhất: Claude đọc docx → viết nội dung vào task file → worker chỉ cần format JS
  - Backup: dùng `New-Object System.Text.UTF8Encoding $false` (no-BOM constructor)
- `assign.ps1` naming: `task-{worker}-{project}.md` + `-Project <project>`
- Luôn dùng `-ExecutionPolicy Bypass`
