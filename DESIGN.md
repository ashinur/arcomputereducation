# Design Brief: AR Computer Education

## Visual Direction
Professional educational platform with teal primary (trust, learning) and warm orange accent (engagement). Enhanced visual depth through layered cards, subtle gradients, and intentional spacing. Home page showcases institution brand, course benefits, and notices with modern card-based composition.

## Tone & Aesthetics
Trustworthy, modern, accessible. Educational context — minimize decoration, maximize clarity and visual hierarchy. Light theme with intentional surface elevation. Cards float above subtle secondary backgrounds. Student dashboards emphasize personal information and actionable items (attendance, leave requests, certificates).

## Color Palette

| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary (Teal) | `0.45 0.12 245` | Institute brand, CTAs, active states |
| Accent (Orange) | `0.65 0.18 28` | Enrollment highlights, badges, course benefits |
| Secondary (Pale Teal) | `0.92 0.04 260` | Subtle section backgrounds, hover states |
| Muted (Neutral) | `0.88 0.02 0` | Disabled states, secondary text, dividers |
| Foreground (Dark Navy) | `0.12 0.02 240` | Body text, highest contrast |
| Background (Off-white) | `0.98 0.01 0` | Page base |
| Border (Light Gray) | `0.92 0.02 0` | Card borders, structure lines |

## Typography

| Role | Font | Usage |
|------|------|-------|
| Display | Fraunces | Institute name, page titles, section headers, course titles |
| Body | DM Sans | Content, navigation, form labels, course descriptions, notices |
| Mono | Geist Mono | Course codes, certificate IDs, technical content |

## Structural Zones

| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| Header | `bg-card` | `border-b` | Logo, navigation, sticky positioning |
| Hero | `bg-background` | None | Institute tagline, address, CTA button |
| Course Grid | `bg-secondary/30` | None | 3-column layout with elevated cards, benefit badges |
| Notices | `bg-background` | `border-t` | Feed of latest announcements with date stamps |
| Student Profile | `bg-card` | `border` | Photo upload area, user info section |
| Attendance/Leave | `bg-secondary/20` | None | Card-based tracking with status indicators |
| Footer | `bg-card` | `border-t` | Contact info, links, legal |

## Spacing & Rhythm
Mobile-first: `sm:` and `md:` breakpoints. Rem-based hierarchy: 12px, 16px, 24px, 32px, 48px, 64px. Card padding: 24px. Section margins: 48px. Hero padding: 64px vertical. Course grid: 3-column desktop, 2-column tablet, 1-column mobile.

## Component Patterns
- **Buttons**: Primary teal for main CTAs, outline secondary for secondary actions, orange accent for enrollment/special offers
- **Cards**: Uniform `shadow-card`, `rounded-lg`, hover lift (+2px, enhanced shadow)
- **Course Cards**: Display benefit badges (orange accent background), course title in Fraunces, description body text
- **Notice Cards**: Date stamp (muted text), title (body bold), excerpt, read more link
- **Student Cards**: Photo placeholder with upload area, name/ID, status indicators
- **Forms**: Input borders from border token, focus ring from primary, label text body

## Motion & Interaction
- **Smooth Transition**: `transition-smooth` class (0.3s cubic) on all interactive elements
- **Card Hover**: lift via `card-hover` utility (translateY -2px, shadow enhancement)
- **Entrance**: `fade-in` (0.4s), `slide-down` (0.3s) for content reveal
- **Badges**: Pulse or fade-in on course benefit labels

## Dark Mode
Secondary palette adjusts: Primary `0.72 0.15 245`, backgrounds `0.1 0.01 0`, card `0.14 0.01 0`. Accent stays warm `0.68 0.18 28`. Borders `0.22 0.01 0`. Full contrast retained.

## Constraints & Rules
- No rounded corners > `rounded-lg` (0.625rem) except avatars/badges (full)
- Max 3-column grid on desktop course showcases
- Accent orange used sparingly: course benefits, enrollment CTAs only
- All colors meet WCAG AA+ contrast (verified at OKLCH layer)
- Cards use either `shadow-card` or `shadow-elevated` — no custom shadows
- Gradients limited to utility classes (`gradient-primary`, `gradient-subtle`, `gradient-accent`)

## Signature Detail
Floating card composition with teal-primary focus. Warm orange badges accent course benefits. Subtle secondary backgrounds (light teal) create visual zones without clutter. Motion emphasizes depth: card hover lift + shadow enhancement. Educational clarity prioritized over decoration.
