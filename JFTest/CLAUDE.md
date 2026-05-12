# CLAUDE.md — JFTest

> Đọc `D:\Kantan\CLAUDE.md` TRƯỚC — ecosystem rules, multi-agent workflow, backup rule.

---

## 🧠 Multi-Agent Context (project này)

```
Claude      → PO / Architect / Reviewer (KHÔNG tự code)
CodeX       → UI/JS, fix nhỏ, precision (task-codex-jftest.md)
GeminiUltra → Data files, multi-file, content heavy (task-geminiultra-jftest.md)
```

Dispatch:
```powershell
powershell -ExecutionPolicy Bypass -File "D:\Dynh\Claude-Gemini\scripts\assign.ps1" `
    -Engineers <codex|geminiultra|codex,geminiultra> -Project jftest
```

Task files: `D:\Dynh\Claude-Gemini\current\task-{worker}-jftest.md`
⚠️ Overwrite task file cũ trước khi dispatch!

---

## Tổng quan

**JFTest** — Luyện thi JF Standard Test (日本語スタンダードテスト) nội bộ GLS  
URL local: `file:///D:/Kantan/JFTest/index.html`  
Subdomain target: `jftest.kantan.app`  
Trạng thái: **In progress** — SPA đang hoạt động, đang hoàn thiện content + UI

### Về kỳ thi JF Standard Test
- 2 cấp độ: **JF2** (Foundation N3-N2) và **JF3** (Advanced N2-N1)
- 2 hình thức: **RolePlay** (hội thoại) và **Presentation** (thuyết trình)
- Thời gian theo cấp:
  - JF2 RolePlay: 1 phút chuẩn bị + 2 phút thực hiện
  - JF3 RolePlay: 2 phút chuẩn bị + 3 phút thực hiện
  - JF3 Presentation: 2 phút chuẩn bị + 3 phút thuyết trình + 4 phút Q&A

---

## Tech Stack

- **Vanilla JS SPA** — hash-based routing, không framework, không build tool
- **CSS**: Glassmorphism (navy background), custom properties, reveal animations
- **Font**: Inter + Noto Sans JP (Google Fonts)
- **Deploy**: Static file, chạy local hoặc GitHub Pages

---

## Cấu trúc file

```
JFTest/
├── index.html              ← Homepage static (6 sections) + SPA mount point
├── css/
│   └── style.css           ← Toàn bộ styles (glassmorphism)
├── js/
│   ├── app.js              ← Hash router, initPage()
│   ├── components.js       ← Render functions (SPA views)
│   └── data/
│       ├── roleplay.js     ← window.ROLEPLAY_DATA (JF2: 0, JF3: 10 entries)
│       └── presentation.js ← window.PRESENTATION_DATA (JF2: 0, JF3: 10 entries)
├── docs/
│   └── session-notes.md    ← Kế hoạch v2.0 + context cho session tiếp
└── history/                ← Backup diffs (auto-created)
```

---

## Routing (app.js)

```
#/jf2                    → renderProgramDetail (JF2 overview)
#/jf3                    → renderProgramDetail (JF3 overview)
#/jf2/roleplay           → renderExamList (JF2 roleplay list)
#/jf3/roleplay           → renderExamList (JF3 roleplay list)
#/jf2/presentation       → renderExamList (JF2 presentation list)
#/jf3/presentation       → renderExamList (JF3 presentation list)
#/jf3/roleplay/:id       → renderRolePlayDetail
#/jf3/presentation/:id   → renderPresentationDetail
✅ JF2 detail routes đã có — /jf2/roleplay/:id và /jf2/presentation/:id
```

---

## Data Schema

### RolePlay entry
```js
{
  id: Number,
  titleJP: String,          // Tiêu đề tiếng Nhật
  theme: String,            // Chủ đề ngắn
  level: "N2-N1"|"N3-N2",
  type: "roleplay",
  program: "jf2"|"jf3",
  estimatedTime: "15 min",
  category: String,         // HR | PM | Quality | Client | Delivery | Keigo | ...
  timings: {                // seconds — dùng cho slide timer
    prep: 120,              // JF3: 120, JF2: 60
    perform: 180            // JF3: 180, JF2: 120
  },
  tags: [String],
  question: {
    situation: String,
    role: { you: String, partner: String },
    tasks: [String]
  },
  answer: {
    memo: { conclusion, basis, risk, countermeasure }, // JF3 only
    script: { opening, explanation, risk, proposal, closing },
    qa: [{ q, a }],
    vocabulary: [{ term, meaning }],     // term: JP, meaning: VN
    phrases: [{ phrase, usage }],        // phrase: JP, usage: VN
    whyGood: [String],                   // tiếng Việt
    tips: [{ title, example }]           // title: VN, example: JP
  }
}
```

### Presentation entry
```js
{
  // ... (giống trên nhưng)
  type: "presentation",
  timings: { prep: 120, present: 180, qa: 240 },  // JF3
  question: {
    roleCard: { you, audience, situation, task },
    givenInfo: { currentStatus, deadline, constraints, expectedOutcome }
  },
  answer: {
    outline: [String],   // 7-8 bước, tiếng Nhật
    script: { opening, background, issue, proposal, effect, riskHandling, closing },
    summary: { conclusion, reason, countermeasure, effect },
    // ... qa, vocabulary, phrases, whyGood, tips giống trên
  }
}
```

---

## Trạng thái hiện tại

| Hạng mục | Trạng thái |
|----------|-----------|
| JF3 RolePlay data | ✅ 10 entries (id 1-10, N2-N1, encoding OK) |
| JF3 Presentation data | ✅ 10 entries (id 1-10) |
| JF2 RolePlay data | ✅ 10 entries (id 11-20, N3-N2, encoding OK) |
| JF2 Presentation data | ✅ 10 entries (id 11-20) |
| JF2 detail routes | ✅ `/jf2/roleplay/:id` và `/jf2/presentation/:id` có trong app.js |
| Router program filter | ✅ `find(e => e.id === examId && e.program === pathSegments[0])` |
| Slide UI + Timer | ✅ Slide deck với dots, countdown timer, JF2/JF3 adaptive |
| `timings` field | ✅ Có trong tất cả entries |
| CSS Noto Sans JP | ✅ đã thêm explicit font override + slide/timer CSS |
| Landing link | ✅ JFTest card → ../JFTest/index.html |
| initSlider() | ✅ Gọi trong initPage(scope) |

**⚠️ ID scheme hiện tại:**
- JF2 entries dùng id 11-20 (cùng mảng với JF3 id 1-10)
- Router filter theo `program` → không conflict
- URL: `#/jf2/roleplay/11` ... `#/jf2/roleplay/20`

---

## Kế hoạch tiếp theo

Xem chi tiết: `docs/session-notes.md`

**Round 2 — Nội dung:**
- GeminiUltra: Thêm 10 JF2 roleplay entries từ source docx (id 21-30 hoặc id 1-10 nếu đổi scheme)
  - Source: `D:\Kantan\JFTest\Source\JF2\JF2_Roleplay\JF2_Roleplay.docx` (20 scenarios)
  - Lần trước bị encoding corrupt → cần thử cách khác (xem ghi chú bên dưới)
- GeminiUltra: JF2 Presentation data (cần tạo source docx)
- GeminiUltra: +10 JF3 roleplay + +10 JF3 presentation (→ 20 mỗi loại)

**Target cuối:** JF2 + JF3 = 20 mỗi loại → 80 đề tổng

---

## Ghi chú kỹ thuật quan trọng

- **Encoding (CRITICAL)**: GeminiUltra ĐÃ bị corrupt 2 lần dù có warning. Thử dùng:
  ```powershell
  $utf8NoBom = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
  ```
  Hoặc dùng Gemini CLI với `--output` flag thay vì PowerShell write.
- **Nested glass-card**: Không dùng `.glass-card` bên trong `.glass-card` — đã fix
- **initSlider()**: Gọi trong `initPage(scope)` sau khi render — đã implement
- **Slide timer flow**: Timer slide hiển thị `--:--` mặc định; bắt đầu đếm khi user bấm nút start-timer
- **JF2 không có memo**: `renderRolePlayDetail` kiểm tra `isJF3 && exam.answer.memo` trước khi render slide memo
