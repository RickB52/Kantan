# JFTest Session Notes

## Cập nhật lần cuối: 2026-05-09

---

## Trạng thái hiện tại

### Data files
- `js/data/roleplay.js`: **10 entries JF3** (id 1-10, program:"jf3") ✅
- `js/data/presentation.js`: **10 entries JF3** ✅
- JF2 roleplay: ✅ **HOÀN TẤT** — Đã thêm thành công 20 entries (id 1-20, program:"jf2") với encoding UTF-8 chuẩn.
- JF2 presentation: ❌ Chưa có source docx → để sau

### Routing (`js/app.js`)
- JF2 & JF3 detail routes: ✅ đều có
- Router program filter bug: 🔄 **ĐANG FIX** — CodeX đang sửa `find(e => e.id === examId && e.program === pathSegments[0])`

### UI
- Exam detail: All-in-one page — **Slide Deck UI + Timer**: 🔄 **ĐANG BUILD** (CodeX)
- `css/style.css`: ✅ Noto Sans JP font override, bỏ nested glass-card

### Landing page (`/landing/index.html`)
- ✅ JFTest card → link + status "Live (Internal)"

---

## Kết quả Round 1 (2026-05-09)

| Worker | Task | Status | Notes |
|--------|------|--------|-------|
| GeminiUltra (cũ, `1e1c368`) | JF2 data 10+10 entries | ✅ Merged | id 11-20, encoding OK |
| GeminiUltra (mới, `dae762f`) | 20 JF2 roleplay từ docx | ❌ Reverted | Encoding corrupted (?????). Reverted `6828956` |
| Antigravity (mới nhất) | 20 JF2 roleplay từ docx | ✅ Merged | Đã thêm 20 entries JF2 (id 1-20), encoding UTF-8 chuẩn |
| CodeX (`906685d`) | Router fix + Slide Deck UI | ✅ Merged | Tất cả 3 files OK |

**State hiện tại:**
- roleplay.js: 10 JF3 (id 1-10) + 10 JF2 cũ (id 11-20) + 20 JF2 mới (id 1-20) = 40 entries, encoding ✅
- presentation.js: 10 JF3 (id 1-10) + 10 JF2 (id 11-20) = 20 entries, encoding ✅
- app.js: router filter `e.program === pathSegments[0]` ✅ + initSlider call ✅
- components.js: slide deck UI ✅ + initSlider/startCountdown/formatTime ✅
- style.css: slide + timer CSS appended ✅

**ID scheme thực tế:**
- JF2 entries dùng id 11-20 (từ run cũ) — không phải 1-20 như dự kiến
- URL: `#/jf2/roleplay/11` ... `#/jf2/roleplay/20`
- Router filter theo program → không conflict với JF3

**Encoding issue với GeminiUltra:**
- Lần này CŨNG bị corrupted mặc dù task file đã có warning rõ ràng
- Cần thêm hướng dẫn cụ thể hơn: thử dùng `-Encoding utf8NoBOM` hoặc dùng `[System.Text.Encoding]::new(65001, $false)`

---

## Kế hoạch v2.0 — ĐÃ DISPATCH ROUND 1

### Phase 1 — Round 1 (đã dispatch 2026-05-09)

#### Antigravity / GeminiUltra — JF2 Roleplay Data ✅ Hoàn tất
- 20 entries JF2 (id 1-20, program:"jf2") — từ source `Source/JF2/JF2_Roleplay/JF2_Roleplay.docx`
- Categories: Horenso, BusinessManners, Punctuality, Communication, TeamCulture, Keigo, Preparation, Reporting
- Timings: `{ prep: 60, perform: 120 }` (JF2 = 1 + 2 phút)
- Không có `memo` field (JF2 đặc điểm)

#### CodeX — Router Fix + Slide UI ✅ Dispatched
- Fix `app.js`: `find(e => e.id === examId && e.program === pathSegments[0])`
- Refactor `components.js`: renderRolePlayDetail + renderPresentationDetail → slide deck
- Thêm `css/style.css`: slide/timer CSS
- Timer logic: JF2 (60s prep + 120s perform), JF3 (120s + 180s), Presentation JF3 (+240s Q&A)

---

### Phase 2 — Round 2 (sau khi review Round 1)

- GeminiUltra: JF2 Presentation data (10 entries) — cần tạo source docx trước
- GeminiUltra: +10 JF3 roleplay + +10 JF3 presentation (→ 20 mỗi loại)
- GeminiUltra: Thêm `timings` field vào 10 entries JF3 hiện có
- CodeX: Keyboard navigation (←→ arrows), mobile touch swipe

---

## Target cuối cùng

```
JF2: 20 roleplay + 20 presentation = 40 đề
JF3: 20 roleplay + 20 presentation = 40 đề
Tổng: 80 đề, đầy đủ timer, slide UI, tiếng Nhật chuẩn N3-N1
```

---

## Files đã thay đổi trong session này

| File | Thay đổi |
|------|---------|
| `landing/index.html` | JFTest card → link tới app, status Live |
| `js/data/roleplay.js` | Restore 10 JF3 scenarios (UTF-8) |
| `js/data/presentation.js` | Restore 10 JF3 scenarios (UTF-8) |
| `css/style.css` | Thêm Noto Sans JP font override, bỏ nested glass-card |
| `js/components.js` | Bỏ glass-card khỏi vocab/phrase items |

## Git commits
```
9a3419e [jftest] fix: restore Japanese content + Noto Sans JP CSS
e8e7002 [landing] fix: link JFTest card to actual local app
c041422 feat: initial commit
```

---

## Ghi chú kỹ thuật

- `assign.ps1` naming convention: `task-{worker}-{project}.md`  
  → Để dispatch CodeX cho jftest: cần `task-codex-jftest.md` + `-Project jftest`
- Luôn dùng `-ExecutionPolicy Bypass` khi call assign.ps1
- GeminiUltra phải write file với `[System.IO.File]::WriteAllText(..., [Encoding]::UTF8)` để tránh encoding corruption
