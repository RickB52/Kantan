# 作業分担 — Video Production Workflow

Phân công giữa Claude và người dùng để auto-gen video từ kịch bản.

---

## Bước 1 — Extract batch AI prompts

**Người làm:** Claude
**Input:** File kịch bản `docs/video-script-{module}-{lesson}.md`
**Output:** Danh sách prompts đánh số, ready để paste vào Kling AI

**Lệnh gọi Claude:**
```
Đọc @docs/video-script-m2.2-email-lesson-01.md
Extract tất cả ```ai-prompt``` blocks theo thứ tự SCENE.
Format: SCENE-XX | platform | duration → prompt text
```

**Bạn làm:** Paste từng prompt vào Kling AI → download clip về máy
**Đặt tên file clip:** `scene-01.mp4`, `scene-02.mp4`, ...

---

## Bước 2 — Export voiceover script

**Người làm:** Claude
**Input:** File kịch bản
**Output:** Plain text script theo thứ tự scene, có label speaker

**Lệnh gọi Claude:**
```
Đọc @docs/video-script-m2.2-email-lesson-01.md
Extract toàn bộ VOICEOVER và DIALOGUE theo thứ tự scene.
Format: plain text, label SCENE-XX + speaker name.
```

**Bạn làm:** Record giọng thật HOẶC paste vào ElevenLabs / Google TTS → export file audio
**Đặt tên file:** `vo-scene-01.mp3`, `vo-scene-02.mp3`, ...

---

## Bước 3 — Export text overlay list

**Người làm:** Claude
**Input:** File kịch bản
**Output:** Bảng text overlays theo từng scene

**Lệnh gọi Claude:**
```
Đọc @docs/video-script-m2.2-email-lesson-01.md
Extract tất cả TEXT_OVERLAY theo thứ tự scene.
Format: SCENE-XX | timestamp | nội dung overlay | style note
```

**Bạn làm:** Làm motion graphics trong CapCut / After Effects / Canva theo danh sách

---

## Bước 4 — Tạo edit timeline

**Người làm:** Claude
**Input:** File kịch bản + danh sách clip đã có
**Output:** Cut list dạng bảng để ghép trong editor

**Lệnh gọi Claude:**
```
Đọc @docs/video-script-m2.2-email-lesson-01.md
Tạo edit timeline cho CapCut/DaVinci:
- SCENE-XX | duration | clip file | voiceover cue | text overlay cue | sfx cue
Format: bảng markdown, thứ tự thời gian
```

**Bạn làm:** Ghép clip theo timeline trong CapCut / DaVinci Resolve

---

## Bước 5 — Viết kịch bản bài tiếp theo

**Người làm:** Claude
**Input:** Tên bài, module, chủ đề
**Output:** File kịch bản mới đúng format

**Lệnh gọi Claude:**
```
Tạo video script cho lesson-02 (Báo cáo tiến độ 週次報告)
Dùng đúng format của @docs/video-script-m2.2-email-lesson-01.md
Characters: DYNH, ONG_CHON, HONDA — giữ nguyên personality
Lưu vào: docs/video-script-m2.2-email-lesson-02.md
```

---

## Tool cần chuẩn bị (1 lần)

| Tool | Dùng cho | Chi phí |
|---|---|---|
| Kling AI | Gen cảnh live-action từ prompt | Freemium |
| CapCut / DaVinci Resolve | Edit + ghép clip + text overlay | Free |
| ElevenLabs | TTS voiceover tiếng Việt | Freemium |
| After Effects / Canva | Motion graphics (scene education) | Trả phí / Free |

---

## Phân công tổng hợp

| Claude làm | Bạn làm |
|---|---|
| Extract prompts → numbered list | Paste vào Kling AI, download clip |
| Export voiceover script | Record hoặc chạy TTS |
| Export text overlay list | Làm motion graphics trong editor |
| Tạo edit timeline / cut list | Ghép clip trong CapCut / DaVinci |
| Viết kịch bản bài mới | Review + approve nội dung |
| Gen prompt cho scene còn thiếu | — |
| Kiểm tra consistency toàn file | — |

---

## Naming convention

```
docs/
├── video-script-m2.2-email-lesson-01.md   # kịch bản
├── video-script-m2.2-email-lesson-02.md
└── sagyobuntan.md                          # file này

assets/video/
├── raw/
│   ├── scene-01.mp4
│   ├── scene-02.mp4
│   └── ...
├── audio/
│   ├── vo-scene-01.mp3
│   └── ...
└── export/
    ├── m2.2-email-lesson-01-full.mp4
    └── m2.2-email-lesson-01-short.mp4
```

---

*Senpai DynhNC5 | senpai.vn*
