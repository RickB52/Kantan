# Kling AI Prompts — Lesson 01 · SCENE 01/02/03
# Phong cách: 2D anime, nhẹ nhàng, tươi sáng, giáo dục

> **Setting Kling AI cho cả 3 scene:**
> - Model: **Kling 1.6 Pro** (hoặc 1.6 Standard nếu tiết kiệm credit)
> - Mode: **Text to Video**
> - Aspect Ratio: **16:9**
> - Creativity (Relevance): để **0.5** (mặc định)
> - Số clip / lần gen: **1**

---

## 🎬 SCENE-01 · 6s · Hook · Duration: 5s trên Kling

**Prompt (paste vào ô prompt chính):**

```
2D anime style, soft pastel colors, bright educational slice-of-life. Close-up of a laptop screen showing email inbox with no replies for 3 days. Camera slowly zooms out to reveal a young Vietnamese male anime character (25-28 years old, short black hair, light blue button-down shirt, gentle worried expression) staring at the screen. Soft warm office light, clean simple background, anime educational tutorial vibe. Calm slow pacing.
```

**Negative prompt (paste vào ô negative):**

```
dark, gritty, photorealistic, 3D render, horror, ugly, distorted face, deformed hands, blurry
```

**File output (đặt tên khi download):** `scene-01.mp4`

---

## 🎬 SCENE-02 · 8s · Setup · Duration: 10s trên Kling

**Prompt:**

```
2D anime style, soft pastel colors, bright educational slice-of-life. Open-plan office in Vietnam, morning. Two Vietnamese male anime characters: younger Dynh (25-28 years old, business casual light blue shirt, eager confident expression) sitting at laptop with hands on keyboard, slightly turned away. Older mentor Ong Chon (45-50 years old, dark polo shirt, slight grey hair, calm knowing expression) stands behind, glances at screen briefly with a quiet knowing smile, then walks away calmly. Subtle contrast between overconfidence and experience. Soft warm morning office light, clean simple anime background.
```

**Negative prompt:**

```
dark, gritty, photorealistic, 3D render, exaggerated angry faces, ugly, distorted face, deformed hands, blurry
```

**File output:** `scene-02.mp4`

---

## 🎬 SCENE-03 · 4s · Drama · Duration: 5s trên Kling

**Prompt:**

```
2D anime style, soft pastel colors, bright educational slice-of-life. Young Vietnamese male anime character (Dynh, 25-28 years old, light blue shirt) at laptop, finishes typing an email, gives a satisfied nod, clicks Send confidently with a small self-satisfied smile. Close-up on face, then cut to laptop screen showing 'Sent'. Soft warm office light, clean simple anime background, gentle upbeat mood.
```

**Negative prompt:**

```
dark, gritty, photorealistic, 3D render, ugly, distorted face, deformed hands, blurry
```

**File output:** `scene-03.mp4`

---

## ✅ Quy trình submit (cho mỗi scene)

1. Vào trang: https://app.klingai.com/global/text-to-video/new
2. Chọn model **Kling 1.6 Pro**, aspect **16:9**, duration tương ứng
3. Paste prompt vào ô **Prompt**
4. Mở phần **Advanced Settings** → paste negative prompt vào ô **Negative Prompt**
5. Click **Generate** (icon máy bay giấy / nút Submit)
6. Kling sẽ thêm task vào queue. Mỗi clip 1.6 Pro mất ~3-5 phút
7. Submit luôn scene 02 và 03 mà không cần chờ — Kling chạy queue song song

## 📁 Sau khi gen xong

Lưu video về thư mục:
```
D:\Dynh\Senpai\docs\videos\
├── scene-01.mp4
├── scene-02.mp4
└── scene-03.mp4
```

Update lại `scenes-lesson1.md` cột Status từ `[ ]` thành `[x]`.

---

## 📝 Ghi chú

- Script gốc viết cho phong cách **realistic cinematic** với negative `cartoon, anime` — đã đảo lại sang **anime 2D** theo yêu cầu mới
- Nếu nhân vật không nhất quán giữa các scene, có thể dùng tính năng **Image-to-Video** với 1 ảnh reference để giữ nhất quán
- Nếu Kling 1.6 không đủ chất lượng anime → upgrade lên **Kling 2.1 Master** sẽ tốt hơn cho anime style

---

*Senpai DynhNC5 | senpai.vn*
