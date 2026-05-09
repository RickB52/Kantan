# Production Workflow — Từ Senpai lesson → Reel post

> Quy trình 7 bước · Từ idea đến post · Tận dụng tối đa content Senpai đã có để tránh duplicate effort.

---

## 🔄 Tổng quan pipeline

```
[1] Lesson Senpai (đã có)
        ↓
[2] Extract reel ideas (3–5 reel/lesson)
        ↓
[3] Viết script reel theo template
        ↓
[4] Gen video AI (Kling) + voice (ElevenLabs)
        ↓
[5] Edit + subtitle (CapCut)
        ↓
[6] Brand check + schedule
        ↓
[7] Post · Engage 2h đầu · Track metric
        ↓
[Lặp lại + tối ưu mỗi 2 tuần]
```

**Thời gian/reel:** 60–90 phút (full pipeline khi đã quen) — Tuần 3 trở đi rút xuống 45 phút/reel.

---

## 📍 Bước 1 — Source từ Senpai lesson

> Mỗi lesson Senpai đã có (HTML) là 1 mỏ vàng — extract được 3–5 reel.

### Các "extraction point" trong lesson template

| Section trong lesson | Có thể tạo reel pillar nào? |
|---|---|
| Senpai cảnh báo (3 lỗi) | Pillar #2 — mỗi lỗi 1 reel |
| Keigo matrix (3 cấp) | Pillar #3 — câu sai vs đúng |
| Email so sánh (bad vs good) | Pillar #2 hoặc #5 (drama Dynh) |
| Subject breakdown | Pillar #2 (micro tip) |
| Spot the mistake exercise | Pillar #2 (interactive — "bạn thấy lỗi nào?") |
| Quiz tình huống | Pillar #1 (decode) — câu hỏi viewer answer |
| Vocab usage notes | Pillar #3 (nuance từ vựng) |

### Ví dụ extract từ `lesson-01` (email giới thiệu)

| Reel idea | Pillar | Length | Source trong lesson |
|---|---|---|---|
| "はじめまして trong email là sai" | #2 | 30s | Senpai cảnh báo Lỗi 1 |
| "お世話になっております vs ご連絡ありがとうございます" | #3 | 45s | Context guide section |
| "Bạn quên 1 thứ trong chữ ký — Honda-san phải hỏi lại" | #2 | 30s | Quiz Q5 + signature breakdown |
| "Tại sao 'tôi tham gia dự án' phải nói là 参加することになりました" | #1 | 60s | Pattern card + Q4 |
| "Tập 1: Dynh gửi email đầu tiên — Honda-san đọc rồi im lặng" | #5 | 60s | Toàn bộ lesson, dramatized |

→ **5 reel từ 1 lesson.** Mỗi tuần cần 12 reel × 3 platform = 12 reel content gốc · trên thực tế cross-post nên chỉ cần 4 reel/tuần.

→ **4 reel/tuần ÷ 5 reel/lesson ≈ 1 lesson/tuần** là đủ source. Quá đủ nếu Senpai có 30+ lesson.

---

## 📍 Bước 2 — Viết script theo template

> Template ở `viral/scripts/template-30s.md` và `template-60s.md` (sẽ tạo sau khi confirm)

### Script template 30s (universal)

```
HOOK (0–3s): [text overlay LỚN] + [voice over LỚN]
  Format: 1 trong 5 hook formula

PROBLEM (3–8s): Diễn giải vấn đề bằng tình huống
  "Khi anh viết X..."

REVEAL (8–20s): Show câu sai vs đúng / decode hidden meaning
  Visual: split screen hoặc highlight đỏ

LESSON (20–25s): Bài học 1 câu
  "Nhớ: ___"

CTA (25–30s): Logo Senpai + 1 trong 3 CTA:
  - "Full version 7 phút trên senpai.vn"
  - "Comment 'X' để nhận template"
  - "Bài tiếp theo: ___"
```

### Script template 60s (drama / pillar #5)

```
SETUP (0–8s): Giới thiệu nhân vật + tình huống
HOOK_TWIST (8–15s): Lỗi xảy ra · cliffhanger
TENSION (15–35s): Hậu quả thực · Honda-san reaction
RESOLUTION (35–50s): Ông Chơn vào dạy / câu đúng
TAKEAWAY (50–60s): 1 câu bài học + CTA
```

---

## 📍 Bước 3 — Gen video với Kling AI

> Anh đã có sẵn workflow này trong `docs/video-script-m2.2-email-lesson-01.md` — file đó đã có ai-prompt blocks chuẩn. Tận dụng lại.

### Reuse footage rules

- Footage Dynh ngồi laptop · Honda đọc email · Ông Chơn talking head — **dùng lại** xuyên reels, không gen mới mỗi lần
- Tạo 1 thư mục `viral/assets/footage-library/` chứa b-roll tái dùng:
  - `dynh-typing.mp4` (10s)
  - `honda-reading-neutral.mp4` (5s)
  - `honda-nod-approval.mp4` (3s)
  - `ong-chon-talking.mp4` (10s loop)
  - `email-screen-mockup.mp4` (10s)
- Mỗi reel = 70% reuse + 30% scene mới (nếu cần)

### Naming convention prompt

```
[character] [age] [outfit] [setting] [emotion] [camera] [duration]
```

Ví dụ:
> "Honda Yuta, 40-45, dark suit, Japanese office desk, neutral expression with very subtle frown, medium shot, 5 seconds"

Giữ giống character trong `docs/video-script-project-instructions.md` để consistency.

---

## 📍 Bước 4 — Voice over (ElevenLabs)

### Voice library cần có

| Voice ID | Người nói | Tone |
|---|---|---|
| Voice A — Narrator | Nam Việt 25–30 | Energetic, hơi gấp gáp, hook style |
| Voice B — Ông Chơn | Nam Việt 45–50 | Slow, warm, mentor tone |
| Voice C — Female alt | Nữ Việt 25–30 | Để vary content, tránh listener fatigue |

→ Test 5 voice/người, chọn 1, lock luôn — **không đổi giữa chừng** để brand consistency.

### Tips
- Ngắt câu sau mỗi 8–10 từ để TikTok subtitle dễ tách
- Dùng SSML `<break time="0.5s"/>` để pacing đẹp
- Lưu lại voice setting (stability + similarity) ở `viral/assets/voice-config.json`

---

## 📍 Bước 5 — Edit với CapCut

### Subtitle style chuẩn

```
Font: Inter Bold (cho VN) hoặc Noto Sans JP Bold (cho JP)
Size: 64–72pt cho hook, 48–54pt cho body
Color: White với stroke đen 4px
Position: Bottom 1/3 (TikTok) hoặc center (drama scene)
Animation: Pop in từng từ (TikTok native style)
```

### Effects checklist

- [ ] Hook 3s đầu có **text overlay LỚN** (kích thước >1/3 màn hình)
- [ ] Mỗi câu Nhật có **furigana** (TikTok render OK)
- [ ] Background music nhẹ (10–15% volume) — dùng audio không bản quyền hoặc TikTok native
- [ ] Outro 3s cuối: logo Senpai + tagline + watermark
- [ ] Cut nhanh — không scene nào dài hơn 3s trừ talking head

### Timeline cut chuẩn 30s

```
0:00–0:03  Hook (text + voice + visual lớn)
0:03–0:08  Problem setup
0:08–0:13  Wrong example (highlight đỏ)
0:13–0:20  Right example (highlight xanh)
0:20–0:25  1-line takeaway (text card LỚN)
0:25–0:30  Outro logo + CTA
```

---

## 📍 Bước 6 — Brand check & schedule

### Brand check 5 phút (pre-post)

- [ ] Watermark "先 Senpai DynhNC | senpai.vn" có hiện không?
- [ ] Outro logo correct không?
- [ ] Cast Dynh/Ông Chơn/Honda mặc đúng outfit không?
- [ ] Subtitle có sai chính tả không?
- [ ] Furigana đúng không?
- [ ] CTA cuối có rõ không?

### Caption + hashtag template

**TikTok:**
```
[Hook lại bằng 1 câu]

→ Full version 7 phút: senpai.vn/lesson/...

#tiengnhatcongso #senpai #comtor #honne #keigo #lamviecvoinhat #ittiengnhat
```

**Reels FB/IG:**
```
[Hook]

[2–3 dòng giải thích context]

Comment 'X' để nhận template email mẫu — gửi vào inbox bạn miễn phí.

🎌 Senpai — Tiếng Nhật thực chiến cho dân IT offshore
🔗 senpai.vn

#tiengnhat #business #IT #comtor
```

**YouTube Shorts:**
```
Title: [Hook] | Senpai #shorts (≤60 char)

Description:
Full version: senpai.vn/[lesson-link]
Module: [tên module]

#shorts #tiengnhat #business
```

### Schedule tool

- **Buffer / Later / Hootsuite:** schedule cross-post 3 platform 1 lần
- **TikTok native scheduler:** chỉ ≤10 ngày · best for daily post
- **Notion content board:** track status mỗi reel — Idea → Script → Footage → Edit → Schedule → Posted → Reviewed

---

## 📍 Bước 7 — Post + Engage + Track

### 2 giờ đầu sau post (CRITICAL)

1. **Reply 100% comment** trong 30 phút đầu — algorithm boost mạnh
2. Pin 1 comment hay nhất + tự reply để tạo "anchor conversation"
3. Share lên FB cá nhân (nhẹ, đừng spam group) để mồi traffic
4. Theo dõi retention rate — nếu drop ở giây 3 → hook fail, ghi note để cải thiện

### Track metrics — file `metrics.md`

Update mỗi tuần:
- Views per platform
- Save rate · Share rate · Comment rate
- Click bio
- Retention curve (chỗ drop để biết viết hook tốt hơn)

---

## 🛠 Tool stack — final

| Bước | Tool | Cost | Note |
|---|---|---|---|
| Script | Notion + Claude | Free–$20/mo | Template trong `viral/scripts/` |
| Video gen | Kling AI | $10/mo | Reuse footage tối đa |
| Voice | ElevenLabs | $22/mo | Lock 2 voice ID |
| Edit | CapCut Pro | $7/mo | Subtitle auto + brand template |
| Schedule | TikTok native + Buffer | Free–$15/mo | TikTok schedule trong app |
| Analytics | Native + Notion | Free | Manual log từng tuần |

**Tổng: $50–65/tháng** — match với assumption ngân sách trong README.

---

## ⚡ Time budget từng tuần (anh tự làm 1 mình)

| Hoạt động | Thời gian |
|---|---|
| Idea + script 4 reels | 2h |
| Gen video AI 4 reels | 2h |
| Voice over | 1h |
| Edit 4 reels | 4h |
| Schedule + caption + hashtag | 1h |
| Engage post (4 reels × 2h × 3 platform) | ~6h chia trong tuần |
| Track + retro tuần | 1h |
| **TỔNG** | **~17h/tuần** |

→ ~2.5h/ngày trong 7 ngày · hoặc 3h/ngày × 5 ngày + 1 ngày off + 1 ngày retro.

> Nếu anh có editor part-time ($150/mo) → giảm xuống 8h/tuần (anh tập trung idea + script + engage).

---

## 🔑 Critical rules

1. **Đừng đợi perfect** — post 80% quality + iterate. Reel xấu cũng dạy thuật toán.
2. **Đừng skip engage 2h đầu** — đây là window quyết định reach.
3. **Đừng post ngày khác giờ** — TikTok thích consistency. 21:00 thì 21:00 mỗi ngày.
4. **Đừng đổi cast** — Dynh phải là Dynh, suốt 12 tuần.
5. **Mỗi reel có 1 message thôi** — đừng tham nhồi 2 bài học vào 30s.
6. **Mỗi tuần phải retro** — pillar nào win, hook nào hit, audio nào kéo view.

---

*Senpai DynhNC5 | senpai.vn — Production v1.0*
