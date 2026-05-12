# Kantan — Hệ sinh thái học tiếng Nhật

## Tổng quan

Monorepo chứa 1 Landing Page + 3 app học tiếng Nhật độc lập, mỗi app chạy trên subdomain riêng.

| Thư mục      | App        | Subdomain               | Tech stack                  | Trạng thái      |
|--------------|------------|-------------------------|-----------------------------|-----------------|
| `/landing`   | Landing    | `kantan.app`            | HTML/CSS/JS vanilla         | ✅ Live          |
| `/JFTest`    | JFTest     | `jftest.kantan.app`     | HTML/CSS/JS vanilla SPA     | 🔧 In progress  |
| `/BJTMaster` | BJTMaster  | `bjtmaster.kantan.app`  | NestJS + Next.js + Docker   | Phase 0         |
| `/Senpai`    | Senpai     | `senpai.kantan.app`     | HTML/CSS/JS vanilla         | ✅ MVP ready     |

> Khi có domain thật: thay toàn bộ `kantan.app` trong file này và các config deploy.

---

## 🧠 THỂ CHẾ MULTI-AGENT (ĐỌC TRƯỚC KHI LÀM BẤT CỨ ĐIỀU GÌ)

**Claude = Bộ não / PO / Tech Lead / Reviewer** — KHÔNG tự implement code (trừ fix cực nhỏ < 2000 token, 1 file, root cause rõ).

Hai workers thực thi:

| Worker | CLI | Mạnh nhất | Dùng khi |
|--------|-----|-----------|----------|
| **CodeX** | `codex` | Precision, speed, logic | Task ngắn, 1-2 file, phức tạp |
| **GeminiUltra** | `gemini` | Long-context, multi-file | Task dài, nhiều file, heavy token |

### Dispatch command

```powershell
# Chạy từ thư mục D:\Dynh\Claude-Gemini
powershell -ExecutionPolicy Bypass -File ".\scripts\assign.ps1" `
    -Engineers <codex|geminiultra|codex,geminiultra> `
    -Project   <kantan|jftest|senpai|bjtmaster>
```

### Task file naming convention (BẮT BUỘC)
```
D:\Dynh\Claude-Gemini\current\task-{worker}-{project}.md
```
Ví dụ: `task-codex-jftest.md`, `task-geminiultra-kantan.md`

> ⚠️ Luôn OVERWRITE file cũ trước khi dispatch — tránh chạy nhầm task từ session trước.

### Quy trình chuẩn khi nhận task mới

```
1. Claude phân tích → chia task → viết task file(s)
2. Dispatch worker(s) — song song nếu boundary rõ, không overlap file
3. Chờ complete → Claude review output thực tế (đọc file, không tin log)
4. Nếu PASS → commit. Nếu FAIL → Claude dispatch fix hoặc tự fix nhỏ.
```

### Parallel execution
- 2 task KHÔNG được đụng cùng file → dispatch song song
- 2 task có thể đụng cùng file → sequential

**Full spec**: `D:\Dynh\Claude-Gemini\CLAUDE.md`

---

## ⚠️ QUY TẮC QUAN TRỌNG

### Rule 0 — Backup trước mọi overwrite (BẮT BUỘC)

Trước khi overwrite hoặc sửa đổi bất kỳ file nào:

1. **Get diff**: `git -C "D:\Kantan" diff HEAD -- <relative-path>`
2. **Lưu vào**: `<project>/history/YYYY-MM-DD_HH-MM_<filename>.diff`
3. **Nếu diff rỗng** (file mới chưa tracked): `Copy-Item` → `.bak`
4. **Chỉ sau backup xong** mới ghi đè

```powershell
$date = Get-Date -Format "yyyy-MM-dd_HH-mm"
# File đã trong git:
git -C "D:\Kantan" diff HEAD -- <rel-path> | Out-File "D:\Kantan\<app>\history\${date}_<file>.diff" -Encoding UTF8
# File chưa trong git:
Copy-Item "<filepath>" "D:\Kantan\<app>\history\${date}_<file>.bak"
```

Lý do: JFTest/index.html (534 dòng) bị GeminiUltra overwrite không recover được.

Task file gửi cho worker **PHẢI có section "Pre-task backup"** với lệnh backup cụ thể.

---

### Rule 1 — Cô lập tuyệt đối giữa các app

- **KHÔNG** import, copy, hay symlink file qua lại giữa các app
- **KHÔNG** tạo thư mục `shared/`, `common/`, hay `utils/` ở root
- Mỗi app có CSS, JS, config, dependency **riêng hoàn toàn**
- Thay đổi ở app này **không được** ảnh hưởng app khác

### Rule 2 — Trình tự đọc khi làm việc với app

1. Đọc **file này** (`D:\Kantan\CLAUDE.md`) — ecosystem rules, multi-agent workflow
2. Đọc **`CLAUDE.md` của app đó** — context riêng, stack, trạng thái
3. Chỉ đọc/sửa file **trong thư mục của app đó**
4. Không mở hay sửa file của app khác
5. **Trước khi overwrite**: backup theo Rule 0

### Rule 3 — Commit convention

```
[landing]    feat: add hero section
[bjtmaster]  fix: docker compose postgres port
[senpai]     content: lesson-04 email bounce
[jftest]     fix: restore Japanese encoding in data files
```

### Rule 4 — Mỗi app = deploy pipeline riêng

- Subdomain riêng → deploy riêng → sự cố 1 app không kéo app khác
- Không block deploy app này vì app khác chưa xong

---

## Cấu trúc thư mục

```
D:\Kantan\
├── CLAUDE.md              ← file này (bản đồ hệ sinh thái + multi-agent rules)
├── landing/               ← Landing Page tĩnh (Live)
│   ├── CLAUDE.md
│   ├── index.html
│   └── history/
├── JFTest/                ← JFTest SPA (In progress)
│   ├── CLAUDE.md
│   ├── index.html
│   ├── css/style.css
│   ├── js/app.js
│   ├── js/components.js
│   ├── js/data/
│   │   ├── roleplay.js    ← 10 JF3 (id 1-10) + 10 JF2 (id 11-20)
│   │   └── presentation.js← 10 JF3 (id 1-10) + 10 JF2 (id 11-20)
│   ├── docs/session-notes.md
│   └── history/
├── BJTMaster/             ← BJT exam app (Phase 0)
│   └── CLAUDE.md
└── Senpai/                ← Tiếng Nhật công sở (MVP ready)
    └── CLAUDE.md
```

---

## Ghi chú worker context

- **GeminiUltra**: Phải write file bằng `[System.IO.File]::WriteAllText(..., [Encoding]::UTF8)` — tránh encoding corruption (bài học từ JFTest data files bị `?`)
- **Task file**: Phải include `timings`, `level`, boundary rõ để worker không đụng file khác
- **Review**: Sau khi worker xong, Claude PHẢI đọc file thực tế — không tin vào log tự báo cáo
