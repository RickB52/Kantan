# Design System — BJT Master
> Phase 0 Deliverable | Created: 2026-05-10
> Implementation: NativeWind (React Native) + Tailwind CSS (Web)

---

## 1. Brand Identity

### Positioning
> Professional, focused, trustworthy — không playful như Duolingo, không austere như Bunpro.
> "Công cụ của người đi làm nghiêm túc, được thiết kế đẹp."

### Personality
| Trait | Biểu hiện trong UI |
|-------|--------------------|
| Chuyên nghiệp | Typography rõ ràng, spacing thở, không clutter |
| Tin cậy | Màu navy/xanh đậm — liên tưởng doanh nghiệp Nhật |
| Hiện đại | Corners bo tròn nhẹ, shadow tinh tế, không flat hoàn toàn |
| Accessible | Contrast ratio ≥4.5:1, font size đủ lớn |

---

## 2. Color System

### Primary Palette

```
Primary Blue (Brand)
  --color-primary-50:  #EFF6FF
  --color-primary-100: #DBEAFE
  --color-primary-200: #BFDBFE
  --color-primary-300: #93C5FD
  --color-primary-400: #60A5FA
  --color-primary-500: #3B82F6   ← main brand color
  --color-primary-600: #2563EB   ← CTA buttons
  --color-primary-700: #1D4ED8   ← hover states
  --color-primary-800: #1E40AF
  --color-primary-900: #1E3A8A   ← headers, nav
```

```
Navy (Business / Premium)
  --color-navy-50:  #F0F4FF
  --color-navy-100: #E0E9FF
  --color-navy-500: #3B4B8C
  --color-navy-700: #1E2D6B
  --color-navy-900: #0F1A47   ← J1+ rank color, premium badge
```

```
Success Green (Correct answer, streak)
  --color-success-400: #4ADE80
  --color-success-500: #22C55E
  --color-success-600: #16A34A
```

```
Error Red (Wrong answer)
  --color-error-400: #F87171
  --color-error-500: #EF4444
  --color-error-600: #DC2626
```

```
Warning Amber (Timer warning, due SRS)
  --color-warning-400: #FBBF24
  --color-warning-500: #F59E0B
  --color-warning-600: #D97706
```

```
Neutral Gray
  --color-gray-50:  #F9FAFB   ← page background
  --color-gray-100: #F3F4F6   ← card background
  --color-gray-200: #E5E7EB   ← dividers
  --color-gray-400: #9CA3AF   ← placeholder text
  --color-gray-600: #4B5563   ← secondary text
  --color-gray-800: #1F2937   ← body text
  --color-gray-900: #111827   ← heading text
```

### J-Level Colors (badge, rank indicator)

| Level | Color | Hex | Usage |
|-------|-------|-----|-------|
| J5 | Slate | `#64748B` | Entry level |
| J4 | Teal | `#0D9488` | Beginner+ |
| J3 | Blue | `#2563EB` | Intermediate |
| J2 | Violet | `#7C3AED` | Upper-intermediate |
| J1 | Amber | `#D97706` | Advanced |
| J1+ | Navy/Gold | `#1E3A8A` + `#F59E0B` | Expert — gradient badge |

### Dark Mode

Dark mode dùng `dark:` prefix (NativeWind/Tailwind). Key overrides:
```
Background:  gray-900 (#111827)
Card:        gray-800 (#1F2937)
Text:        gray-100 (#F3F4F6)
Border:      gray-700 (#374151)
Primary:     primary-400 (sáng hơn để đủ contrast)
```

---

## 3. Typography

### Font Family

```
Heading (JP + EN):  Noto Sans JP (Google Fonts)
Body (EN/VI):       Inter
Body (JP):          Noto Sans JP
Monospace (code):   JetBrains Mono (admin only)
```

**Rationale**: Noto Sans JP cover đủ kanji/hiragana/katakana, legible nhỏ, miễn phí.  
Inter là standard cho product UI. Cả hai đều có weight variable.

### Type Scale (sp đơn vị mobile, rem cho web)

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `text-display` | 32sp | 700 | 1.2 | Mock test score (big number) |
| `text-h1` | 24sp | 700 | 1.3 | Screen titles |
| `text-h2` | 20sp | 600 | 1.3 | Section headers |
| `text-h3` | 17sp | 600 | 1.4 | Card titles |
| `text-body-lg` | 16sp | 400 | 1.6 | Question text |
| `text-body` | 15sp | 400 | 1.6 | Body text, choices |
| `text-body-sm` | 13sp | 400 | 1.5 | Secondary info, captions |
| `text-label` | 12sp | 500 | 1.4 | Labels, badges |
| `text-caption` | 11sp | 400 | 1.4 | Timestamps, footnotes |

### Japanese-specific

- Câu hỏi tiếng Nhật: `text-body-lg` (16sp) — đủ rõ kanji nhỏ
- Furigana: 9sp, color `gray-400`, hiển thị phía trên kanji
- Keigo drill text: `text-body-lg`, line-height 1.8 (Japanese cần thoáng hơn)
- Không dùng italic cho Japanese text

---

## 4. Spacing System (8pt grid)

```
--space-1:  4px   (0.25rem)  — tight gaps
--space-2:  8px   (0.5rem)   — icon padding, small gaps
--space-3:  12px  (0.75rem)  — compact items
--space-4:  16px  (1rem)     — standard padding ← default
--space-5:  20px  (1.25rem)  — card padding
--space-6:  24px  (1.5rem)   — section gaps
--space-8:  32px  (2rem)     — large gaps
--space-10: 40px  (2.5rem)   — section margins
--space-12: 48px  (3rem)     — hero spacing
--space-16: 64px  (4rem)     — page top padding
```

### Screen Margins

```
Mobile:  horizontal padding = 16px (space-4)
Tablet:  horizontal padding = 24px (space-6)
Web:     max-width = 1200px, auto margin
```

---

## 5. Border Radius

```
--radius-sm:   4px   — tags, badges nhỏ
--radius-md:   8px   — buttons, inputs
--radius-lg:   12px  — cards
--radius-xl:   16px  — bottom sheet, modal
--radius-2xl:  24px  — featured cards
--radius-full: 9999px — pill badges, avatars
```

---

## 6. Shadow System

```
--shadow-sm:  0 1px 2px rgba(0,0,0,0.05)            — subtle card
--shadow-md:  0 4px 6px rgba(0,0,0,0.07)             — default card
--shadow-lg:  0 10px 15px rgba(0,0,0,0.10)           — modal, bottom sheet
--shadow-xl:  0 20px 25px rgba(0,0,0,0.15)           — floating elements
```

---

## 7. Component Specs

### Button

```
Variants:
  primary   — bg-primary-600, text-white
              hover: bg-primary-700
              active: bg-primary-800, scale-95
  secondary — border-primary-600, text-primary-600
  ghost     — text-primary-600, no bg
  danger    — bg-error-600, text-white

Sizes:
  sm: h-8,  px-3, text-sm,   radius-md
  md: h-11, px-5, text-body, radius-md   ← default
  lg: h-14, px-6, text-h3,   radius-lg

States: loading (spinner replace label), disabled (opacity-40)
Min tap target: 44×44px (Apple HIG / Android guideline)
```

### Input

```
Height:       48px (md), 44px (sm)
Padding:      px-4 py-3
Border:       1px solid gray-300, focus: primary-500 (ring-2)
Background:   white (light) / gray-800 (dark)
Error state:  border-error-500, helper text error-600 below
Label:        text-label, gray-700, mb-1
```

### Card

```
Background:   white (light) / gray-800 (dark)
Padding:      p-4 (compact) / p-5 (default) / p-6 (feature card)
Border-radius: radius-lg
Shadow:       shadow-md
Border:       optional 1px solid gray-200
```

### Choice Button (Practice & Mock Test)

```
Default:   bg-gray-50, border gray-200, text-body
Selected:  bg-primary-50, border primary-500, text primary-700
Correct:   bg-success-50, border success-500 (show after submit)
Wrong:     bg-error-50, border error-500 (show after submit)
Height:    auto (min 52px), width: 100%, text-align: left, px-4 py-3
Radius:    radius-lg
```

### Progress Bar

```
Track:    bg-gray-200, h-2, radius-full
Fill:     bg-primary-500, transition 300ms ease
Variants:
  - section progress (top of practice screen)
  - SRS mastery (vocab card)
  - daily goal (home widget)
```

### J-Level Badge

```
Shape:     pill (radius-full)
Size:      px-2 py-0.5, text-label
Colors:    theo bảng 2.3 J-Level Colors
J1+:       gradient border (navy → gold)
```

### Bottom Sheet (AI Explanation, etc.)

```
Background:  white / gray-800
Handle:      4×32px rounded-full, gray-300, centered, mt-3
Padding:     px-5 py-4
Border-radius top: 24px
Shadow:      shadow-xl
Backdrop:    rgba(0,0,0,0.4)
Animation:   slide up 250ms ease-out
```

### Audio Player Component

```
Layout:     horizontal, full width
Elements:   [Play/Pause] [Waveform/Progress bar] [Time] [Speed selector]
Play btn:   48×48px circle, bg-primary-600
Speed:      pill button group "1x | 1.25x | 1.5x"
Progress:   slider, thumb 20px circle
Colors:     played portion: primary-500, unplayed: gray-200
```

---

## 8. Icons

**Library**: `@expo/vector-icons` (Ionicons set) + custom SVGs cho app-specific icons.

| Context | Icon set |
|---------|----------|
| Navigation | Ionicons (outline style) |
| Action | Ionicons (outline, filled for active) |
| J-level badges | Custom SVG |
| Achievement badges | Custom SVG |
| Business topics | Custom SVG (meeting, finance, email, phone) |

**Size system**:
```
xs:  16px  — inline, label
sm:  20px  — button leading icon
md:  24px  — nav, toolbar (default)
lg:  32px  — feature icon
xl:  48px  — empty state illustration
```

---

## 9. Motion & Animation

**Principle**: Functional animation only. Không animation vì đẹp — chỉ animation khi giúp user hiểu context.

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Screen transition | Slide right (push) / Slide left (pop) | 300ms | ease-in-out |
| Modal open | Fade + scale 0.95→1 | 250ms | ease-out |
| Bottom sheet open | Slide up | 250ms | ease-out |
| Button press | scale 0.97 | 100ms | ease-in |
| Correct answer | Flash success-50 + checkmark | 400ms | spring |
| Wrong answer | Shake (horizontal, 3×) | 300ms | linear |
| Streak fire | Scale pulse 1→1.2→1 | 500ms | spring |
| Card flip (flashcard) | rotateY 180deg | 400ms | ease-in-out |
| Score counter | Count up animation | 1500ms | ease-out |
| Progress bar fill | Width transition | 300ms | ease-out |

**Reduced motion**: Respect `prefers-reduced-motion`. Tất cả animation có fallback instant.

---

## 10. NativeWind Config

```js
// tailwind.config.js
module.exports = {
  content: ['./apps/mobile/src/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A8A',
        },
        navy: {
          500: '#3B4B8C',
          700: '#1E2D6B',
          900: '#0F1A47',
        },
        // ... (đầy đủ theo section 2)
      },
      fontFamily: {
        sans: ['Inter', 'NotoSansJP', 'sans-serif'],
        jp: ['NotoSansJP', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'sheet': '24px',
      },
    },
  },
};
```

---

## 11. Accessibility Checklist

```
[ ] Contrast ratio ≥4.5:1 (normal text), ≥3:1 (large text / UI elements)
[ ] Minimum tap target: 44×44px tất cả interactive elements
[ ] accessibilityLabel cho mọi icon button
[ ] accessibilityHint cho actions không rõ ràng
[ ] Focus order logical trên màn hình
[ ] Error message không chỉ dùng màu (phải có text/icon)
[ ] Furigana mode giúp screen reader đọc đúng kanji
[ ] Audio player: accessible controls, time display
```
