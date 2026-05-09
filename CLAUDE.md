# Kantan — Hệ sinh thái học tiếng Nhật

## Tổng quan

Monorepo chứa 1 Landing Page + 3 app học tiếng Nhật độc lập, mỗi app chạy trên subdomain riêng.

| Thư mục    | App      | Subdomain (tạm)       | Tech stack                        | Trạng thái  |
|------------|----------|-----------------------|-----------------------------------|-------------|
| `/landing` | Landing  | `kantan.app`          | HTML/CSS/JS vanilla               | Chưa tạo    |
| `/JF`      | JFTest   | `jftest.kantan.app`   | TBD                               | Planned     |
| `/BJTMaster`     | BJTMaster      | `bjtMaster.kantan.app`      | NestJS + Next.js + Docker         | Phase 0     |
| `/Senpai`  | Senpai   | `senpai.kantan.app`   | HTML/CSS/JS → Vercel + Supabase   | MVP ready   |

> Khi có domain thật: thay toàn bộ `kantan.app` trong file này và các config deploy.

---

## ⚠️ QUY TẮC QUAN TRỌNG

### 0. File lịch sử thay đổi (BẮT BUỘC trước mọi update/overwrite)

Trước khi overwrite hoặc sửa đổi bất kỳ file nào trong một dự án:

1. **Get diff** — lấy nội dung khác biệt giữa phiên bản cũ và mới
2. **Backup log** — lưu diff vào `<project>/history/YYYY-MM-DD_HH-MM_<filename>.diff`
3. **Chỉ sau khi backup xong** mới được ghi đè file

```
Kantan/
├── JFTest/history/
│   └── 2026-05-09_14-30_index.html.diff
├── Senpai/history/
├── BJTMaster/history/
└── landing/history/
```

Mục đích: tránh mất file như đã xảy ra với `JFTest/index.html` (534 dòng bị overwrite không recover được).

**Lệnh backup mẫu (PowerShell):**
```powershell
$date = Get-Date -Format "yyyy-MM-dd_HH-mm"
git diff HEAD -- <file> > "<project>/history/${date}_<filename>.diff"
# Hoặc nếu file chưa trong git:
Copy-Item <file> "<project>/history/${date}_<filename>.bak"
```

---

### 1. Cô lập tuyệt đối giữa các app

- **KHÔNG** import, copy, hay symlink file qua lại giữa các app
- **KHÔNG** tạo thư mục `shared/`, `common/`, hay `utils/` ở root
- Mỗi app có CSS, JS, config, dependency **riêng hoàn toàn**
- Thay đổi ở app này **không được** ảnh hưởng app khác

### 2. Khi làm việc với một app

1. **Đọc `D:\Kantan\CLAUDE.md` (file này) trước** — quy tắc hệ sinh thái, backup rule, commit convention
2. **Đọc `CLAUDE.md` của app đó** — mỗi app có context riêng, stack, trạng thái
3. Chỉ đọc/sửa file **trong thư mục của app đó**
4. Không mở hay sửa file của app khác dù tiện tay
5. **Trước khi overwrite**: backup diff vào `<app>/history/` theo Rule 0

### 3. Commit convention

```
[landing] feat: add hero section
[bjtmaster]     fix: docker compose postgres port
[senpai]  content: lesson-04 email bounce
[jftest]  init: project scaffold
```

### 4. Mỗi app = deploy pipeline riêng

- Subdomain riêng → deploy riêng → sự cố 1 app không kéo app khác xuống
- Không block deploy của app này vì app khác chưa xong
- CI/CD (nếu có) chạy theo từng thư mục, không chạy chung

---

## Cấu trúc thư mục

```
D:\Kantan\
├── CLAUDE.md           ← file này (bản đồ hệ sinh thái)
├── landing/            ← tạo mới: Landing Page tĩnh
│   ├── CLAUDE.md
│   ├── index.html
│   └── assets/
│       ├── css/
│       └── js/
├── JFTest/                 ← JFTest (planned, chờ scaffold)
├── BJTMaster/                ← Business Japanese Test app
│   └── CLAUDE.md ✅
└── Senpai/             ← Học tiếng Nhật thực chiến
    └── CLAUDE.md ✅
```

---

## Landing Page — Spec tóm tắt

Mục đích: giới thiệu hệ sinh thái Kantan và điều hướng vào 3 app.

- **Static HTML** — không framework, deploy bất cứ đâu
- **Sections**: Hero → 3 App Cards → Footer
- **Mỗi card**: tên app, mô tả 1 câu, CTA button → subdomain
- **Design token**: đồng bộ với Senpai

```css
--color-primary:    #EF4444;   /* đỏ */
--color-accent:     #4F46E5;   /* indigo */
--color-background: #F8FAFC;
--color-text:       #1E293B;
```

---

## Ghi chú phát triển

- `BJTMaster/CLAUDE.md` — đọc khi làm việc với BJTMaster (NestJS, Docker, React Native)
- `Senpai/CLAUDE.md` — đọc khi làm việc với Senpai (HTML/JS thuần, LocalStorage)
- `JFTest/` — trống, tạo `JFTest/CLAUDE.md` trước khi bắt đầu code JFTest
- Landing page tạo trong `/landing` — không dùng root `index.html`
