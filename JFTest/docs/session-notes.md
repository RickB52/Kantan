# JFTest Session Notes

## Cập nhật lần cuối: 2026-05-09

---

## Trạng thái hiện tại ✅

### Data files
- `js/data/roleplay.js`: **10 entries JF3** — tiếng Nhật N2-N1, đã restore từ encoding corruption
- `js/data/presentation.js`: **10 entries JF3** — tiếng Nhật N2-N1, đã restore
- JF2: **CHƯA CÓ DATA** (0 entries)

### Routing (`js/app.js`)
- JF3 detail routes: ✅ có `#/jf3/roleplay/:id` và `#/jf3/presentation/:id`
- JF2 detail routes: ❌ **THIẾU** — `#/jf2/roleplay/:id` và `#/jf2/presentation/:id` chưa có

### UI
- Exam detail: All-in-one page (question + toggle-reveal answer) — **chưa có slide**
- `css/style.css`: Đã thêm Noto Sans JP explicit font override

### Landing page (`/landing/index.html`)
- ✅ JFTest card: `href="../JFTest/index.html"` + status "Live (Internal)"
- ✅ JFTest hero card: onclick navigate + badge "Live"

---

## Kế hoạch v2.0 — CHƯA DISPATCH

### Phase 1 — Round 1 (song song, dispatch cùng lúc)

#### GeminiUltra: JF2 Content + Route Fix
**Task file**: `task-geminiultra-jftest.md`
**Project**: `jftest`

**Việc cần làm:**
1. Thêm **10 roleplay JF2** vào `js/data/roleplay.js` (append, không overwrite JF3)
2. Thêm **10 presentation JF2** vào `js/data/presentation.js` (append)
3. Thêm JF2 detail routes vào `js/app.js`:
   ```js
   '#/jf2/roleplay/:id': 'renderRolePlayDetail',
   '#/jf2/presentation/:id': 'renderPresentationDetail',
   ```

**JF2 spec (Foundation N3-N2)** — đơn giản hơn JF3:
- Script ngắn hơn, từ vựng N3-N2
- Không cần Memo card (JF2 không có 2分準備)
- Thêm field `timings` vào data để slide timer biết phase times

Data structure cho JF2 (có `timings` field):
```js
{
  id: 1,
  titleJP: "上司への欠勤連絡",
  theme: "電話・メールでの欠勤連絡",
  level: "N3-N2",
  type: "roleplay",
  program: "jf2",
  estimatedTime: "8 min",
  category: "Keigo",
  timings: { prep: 60, perform: 120 },  // seconds
  tags: ["敬語", "電話", "欠勤"],
  question: {
    situation: "...",
    role: { you: "...", partner: "..." },
    tasks: ["...", "..."]
  },
  answer: {
    // KHÔNG có memo (JF2 không cần)
    script: { opening: "...", main: "...", closing: "..." },
    qa: [...],
    vocabulary: [...5],
    phrases: [...5],
    whyGood: [...],
    tips: [...]
  }
}
```

JF3 data cũng cần thêm `timings` field:
```js
// Roleplay JF3:
timings: { prep: 120, perform: 180 }  // 2+3 phút

// Presentation JF3:
timings: { prep: 120, present: 180, qa: 240 }  // 2+3+4 phút
```

**10 JF2 Roleplay scenarios:**
| id | category | theme |
|----|----------|-------|
| 1 | Keigo | Báo cáo nghỉ ốm qua điện thoại |
| 2 | Email | Xin lỗi khách vì gửi nhầm tài liệu |
| 3 | Meeting | Đặt lịch họp với khách |
| 4 | Report | Báo cáo tiến độ tuần với leader |
| 5 | Phone | Tiếp nhận điện thoại và nhắn lại |
| 6 | Greeting | Chào hỏi lần đầu, tự giới thiệu |
| 7 | Request | Nhờ đồng nghiệp check document |
| 8 | Trouble | Báo lỗi nhỏ với senior |
| 9 | Keigo | Từ chối lịch họp lịch sự |
| 10 | Meeting | Xác nhận lại nội dung họp |

**10 JF2 Presentation scenarios:**
| id | category | theme |
|----|----------|-------|
| 1 | Report | Báo cáo tuần trong sprint review |
| 2 | Proposal | Đề xuất cải thiện quy trình nhỏ |
| 3 | Report | Báo cáo bug/issue với team |
| 4 | Intro | Giới thiệu project mới cho member |
| 5 | Proposal | Đề xuất dùng tool mới |
| 6 | Report | Báo cáo kết quả test với PM |
| 7 | Proposal | Đề xuất training nội bộ |
| 8 | Report | Báo cáo nguyên nhân delay |
| 9 | Proposal | Đề xuất cải thiện code review |
| 10 | Report | Tổng kết sprint cho khách hàng |

---

#### CodeX: Slide UI Redesign
**Task file**: `task-codex-kantan.md` (nhớ overwrite! kantan project không đúng)
**Thực ra nên dùng**: `task-codex-jftest.md` + dispatch `-Project jftest`

> ⚠️ Hiện `task-codex-jftest.md` chưa tồn tại — phải tạo mới

**Files cần sửa:**
- `js/components.js`: Refactor `renderRolePlayDetail` và `renderPresentationDetail`
- `css/style.css`: Thêm slide CSS
- `js/app.js`: Thêm `initSlider()` hoặc đặt trong components.js

**Slide UI spec:**

Question slides (4 slides):
```
Slide 1: Cover — title, theme, category, level, timings display, [▶ Bắt đầu]
Slide 2: 状況 — situation text
Slide 3: Role — you/partner (or roleCard for presentation)
Slide 4: Tasks — task list, [⏱ Bắt đầu chuẩn bị]
```

Timer slides (sau khi bấm Start):
```
Slide 5: Timer Prep  — "Chuẩn bị" + countdown (120s JF3 / 60s JF2)
         Khi hết giờ hoặc Skip: → Slide 6
Slide 6: Timer Perform — "Roleplay/Thuyết trình" + countdown (180s)
         [Presentation only] → Slide 7: Timer Q&A (240s)
         Khi hết giờ hoặc Skip: → [Xem đáp án]
```

Answer slides (5 slides, dạng slide deck riêng):
```
Answer Slide 1: Memo (JF3 only) hoặc Script (JF2)
Answer Slide 2: Script (full script)
Answer Slide 3: Q&A
Answer Slide 4: Vocabulary + Phrases (2 columns)
Answer Slide 5: Why Good + Tips
```

CSS approach (pure CSS, no framework):
```css
.slide-deck { position: relative; }
.slide { display: none; }
.slide.active { display: block; animation: slideIn 0.3s ease; }
@keyframes slideIn {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}
.slide-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
}
.slide-dots { display: flex; gap: 8px; }
.slide-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.3); transition: all .2s; }
.slide-dot.active { background: var(--purple-600); transform: scale(1.3); }

/* Timer */
.timer-display {
  font-size: 4rem;
  font-weight: 800;
  color: white;
  text-align: center;
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
}
.timer-display.urgent { color: #f87171; animation: pulse 1s ease-in-out infinite; }
.timer-label { text-align: center; font-size: 1rem; color: var(--gray-400); margin-bottom: 1.5rem; }
```

JS timer logic:
```js
function startCountdown(seconds, displayEl, onEnd) {
  let remaining = seconds;
  displayEl.textContent = formatTime(remaining);
  const interval = setInterval(() => {
    remaining--;
    displayEl.textContent = formatTime(remaining);
    if (remaining <= 30) displayEl.classList.add('urgent');
    if (remaining <= 0) {
      clearInterval(interval);
      onEnd();
    }
  }, 1000);
  return interval; // để có thể cancel (skip)
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}
```

---

### Phase 2 — Round 2 (sau review)

- GeminiUltra: +10 JF3 roleplay + +10 JF3 presentation (→ 20 mỗi loại)
- CodeX: Keyboard navigation (←→ arrows), mobile responsive touch swipe

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
