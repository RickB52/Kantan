# BJT Master — Design Prototype

## Cách mở

Mở trực tiếp trên browser — **không cần build, không cần server**:

```
Mở file: D:\Dynh\BJT\docs\design\index.html
→ Kéo thả vào Chrome/Edge/Firefox là chạy được
```

> ⚠️ Một số browser chặn load file JSX local. Nếu gặp lỗi, chạy server nhỏ:
> ```bash
> cd D:\Dynh\BJT\docs\design
> npx serve .
> # Mở http://localhost:3000
> ```

## Cấu trúc files

| File | Nội dung |
|------|----------|
| `index.html` | Entry point — load tất cả, toolbar filter section |
| `styles.css` | Design tokens (colors, spacing, components) |
| `shared.jsx` | Icon set + utility components dùng chung |
| `ios-frame.jsx` | iOS device frame (status bar, nav bar, glass pill) |
| `design-canvas.jsx` | Canvas wrapper — artboard layout, fullscreen view |
| `screens-auth.jsx` | Welcome, SignUp, SignIn, Onboarding (2 steps) |
| `screens-home.jsx` | Home Dashboard, Profile |
| `screens-learn.jsx` | Keigo Overview, Keigo Drill, Reading, Vocab Flashcard |
| `screens-mock.jsx` | Mock Test, Result, AI Explanation, Paywall |

## Screens có trong prototype

| Section | Screens |
|---------|---------|
| Auth / Onboarding | Welcome · Sign Up · Sign In · Target Rank · Daily Goal |
| Home | Dashboard · Profile |
| Learn | Keigo Overview · Keigo Drill · Reading Practice · Vocab Flashcard |
| Mock + AI | Mock Test · Result · AI Explanation · Paywall |

## Liên kết tài liệu

- Design System spec: `../phase0/03-design-system.md`
- Screen wireframes full list: `../phase0/05-screen-wireframes.md`
- Architecture: `../phase0/04-adr-001-architecture.md`
