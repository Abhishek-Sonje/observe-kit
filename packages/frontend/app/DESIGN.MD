---
name: The Observability System
colors:
  surface: '#faf9f8'
  surface-dim: '#dadad9'
  surface-bright: '#faf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f2'
  surface-container: '#eeeeed'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e1'
  on-surface: '#1a1c1c'
  on-surface-variant: '#46464d'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f0f0'
  outline: '#76767e'
  outline-variant: '#c6c6cd'
  surface-tint: '#575d76'
  primary: '#181e34'
  on-primary: '#ffffff'
  primary-container: '#2d334a'
  on-primary-container: '#969bb7'
  inverse-primary: '#c0c5e2'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#1c1f20'
  on-tertiary: '#ffffff'
  tertiary-container: '#313435'
  on-tertiary-container: '#9a9c9d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#c0c5e2'
  on-primary-fixed: '#141a30'
  on-primary-fixed-variant: '#40465e'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#faf9f8'
  on-background: '#1a1c1c'
  surface-variant: '#e3e2e1'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 42px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  h1:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style
The design system is anchored in a philosophy of **Subtle Precision**. It addresses the high-density information needs of developers by providing a workspace that feels calm, intentional, and expensive. The aesthetic is a fusion of **Refined Minimalism** and **Editorial Layout**, prioritizing clarity over decoration.

The brand personality is that of a "sophisticated instrument"—reliable, quiet, and deeply capable. It avoids the aggressive, high-contrast tropes of typical monitoring tools in favor of a human-centric experience inspired by the utility of Notion and the technical polish of Linear. The layout intentionally employs asymmetrical whitespace to create a natural "rhythm" that guides the eye through complex telemetry data without causing fatigue.

## Colors
The palette is built on a foundation of **Soft Warm Whites** (`#FDFCFB`) to reduce screen glare during long debugging sessions. Surfaces are layered using subtle shifts in gray and blue-gray to create a sense of structural depth without relying on heavy shadows.

Text uses a **Muted Navy** (`#1E293B`) instead of pure black to maintain a softer, premium feel. Telemetry indicators—Success, Warning, and Error—are desaturated to integrate harmoniously with the light theme, ensuring they stand out through color recognition rather than overwhelming brightness. Borders are kept exceptionally light (`#E2E4E9`) to define boundaries with a "ghost" effect.

## Typography
The typography strategy employs an **Editorial Hierarchy**. **Hanken Grotesk** is used for headlines to provide a sharp, contemporary character with its unique geometric terminals. For the core reading experience, **Inter** provides utilitarian clarity and exceptional legibility at small sizes.

A technical layer is added using **JetBrains Mono** for telemetry data, IDs, and code snippets, grounding the system in its developer context. Large headings feature tight letter-spacing and generous leading below them to create the "magazine" feel, while body copy is given ample line-height to ensure technical documentation remains approachable.

## Layout & Spacing
This design system utilizes a **Dynamic Fixed Grid** (12 columns). While the container is centered at a maximum width of 1280px, internal elements use an 8px rhythmic scale.

To avoid the "boxed-in" feel of traditional dashboards, the layout leverages **Intentional Asymmetry**. Primary content columns are often flanked by wider-than-normal margins or offset by smaller utility sidebars. Generous whitespace (40px+) is used between major sections to allow the UI to "breathe," ensuring that the density of the data doesn't translate into visual clutter.

## Elevation & Depth
Elevation is achieved through **Tonal Layering** and **Soft Plurality**. Rather than using high-offset shadows, this design system communicates depth by stacking surfaces of slightly different warm grays.

When shadows are necessary (e.g., for detached popovers or menus), they are "Ambient Shadows"—extremely diffused, with a blur radius of 20px+ and an opacity below 5%. Most "cards" or containers do not have shadows; instead, they are defined by a 1px solid border in a shade only slightly darker than the background. This creates a flat, professional architectural feel reminiscent of modern industrial design.

## Shapes
The shape language is **Softly Squared**. A standard radius of 4px (`roundedness: 1`) is applied to buttons, input fields, and small components to maintain a disciplined, professional look. Larger containers like cards or panels may use 8px (`rounded-lg`) to feel slightly more approachable, but the system strictly avoids "pill" shapes for anything other than status badges or tags. This maintains a structured, technical atmosphere.

## Components

### Buttons
Primary buttons use the Muted Navy (`#1E293B`) with white text, featuring a very subtle top-edge highlight. Secondary buttons use the `surface-alt` background with a thin border, creating a seamless blend with the layout.

### Input Fields
Inputs are rendered with a solid white background and the system's standard 1px border. On focus, the border transitions to a subtle blue-gray accent with a 2px soft outer glow (non-neon). Labels are always positioned above the field in `label-caps` for maximum scanning speed.

### Cards & Containers
Cards are typically unbordered on the `surface` background, defined only by a change in fill color, or they use the 1px border on the `background` white. Headers within cards use `h3` or `label-caps` to distinguish sections clearly.

### Telemetry & Data
*   **Charts:** Use thin, 1.5pt lines with desaturated versions of the telemetry palette.
*   **Status Dots:** Small 6px circles with a soft "bloom" (2px blur) of the same color to indicate activity.
*   **Logs:** Displayed in `code` typography on a slightly darker `surface-alt` background to differentiate from the primary UI.

### Navigation
The navigation is minimalist, utilizing high-quality iconography (2pt stroke) and `body-md` text. Active states are indicated by a simple weight change or a 2px vertical line to the left, rather than large color blocks.