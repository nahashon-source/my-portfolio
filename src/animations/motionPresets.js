/**
 * motionPresets.js
 *
 * Centralized Framer Motion animation presets for the portfolio site.
 * Designed to be reused across Hero, About, Projects, Skills, Experience,
 * and Contact sections.
 *
 * Usage:
 *   import { fadeUp, toastAnimation, ... } from "@/animations/motionPresets";
 *   import { buildPreset } from "@/animations/motionPresets";
 *
 *   // Static preset
 *   <motion.div {...fadeUp(reduceMotion)} />
 *
 *   // With overrides (e.g. custom delay)
 *   <motion.div {...fadeUp(reduceMotion, { transition: { delay: 0.1 } })} />
 *
 * Reduced-motion contract:
 *   Every preset factory accepts `reduceMotion: boolean` as its first
 *   argument. When true, `initial` is set to `false` so Framer Motion
 *   skips the enter animation entirely — no duplicate logic in components.
 */

/* ------------------------------------------------------------------ */
/*  Shared easing curves & durations                                    */
/* ------------------------------------------------------------------ */

const EASE_SPRING = [0.16, 1, 0.3, 1]; // snappy spring used for reveals
const DURATION_REVEAL = 0.6;
const DURATION_TOAST = 0.2; // not explicitly set in original; Framer default ~0.2

/* ------------------------------------------------------------------ */
/*  Viewport defaults                                                   */
/*  Components that use whileInView share these settings.              */
/* ------------------------------------------------------------------ */

export const VIEWPORT_DEFAULT = { once: true, margin: "-100px" };
export const VIEWPORT_CARD = { once: true, margin: "-80px" };

/* ------------------------------------------------------------------ */
/*  Helper: merge override props into a preset                         */
/* ------------------------------------------------------------------ */

function mergePreset(base, overrides = {}) {
  const merged = { ...base };

  if (overrides.initial !== undefined) merged.initial = overrides.initial;
  if (overrides.animate !== undefined) merged.animate = overrides.animate;
  if (overrides.exit !== undefined) merged.exit = overrides.exit;
  if (overrides.whileInView !== undefined)
    merged.whileInView = overrides.whileInView;
  if (overrides.viewport !== undefined) merged.viewport = overrides.viewport;

  // Deep-merge transition so callers can add delay without losing duration/ease
  if (overrides.transition) {
    merged.transition = { ...(base.transition ?? {}), ...overrides.transition };
  }

  return merged;
}

/* ------------------------------------------------------------------ */
/*  fadeUp                                                              */
/*  Primary section reveal: slides up 16px while fading in.           */
/*  Used in: section headings, status strip wrapper                    */
/* ------------------------------------------------------------------ */

export function fadeUp(reduceMotion, overrides) {
  const base = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_DEFAULT,
    transition: { duration: DURATION_REVEAL },
  };
  const preset = reduceMotion ? { ...base, initial: false } : base;
  return mergePreset(preset, overrides);
}

/* ------------------------------------------------------------------ */
/*  fadeIn                                                              */
/*  Pure opacity fade — no positional shift.                           */
/*  Use for overlays, subtle background elements.                      */
/* ------------------------------------------------------------------ */

export function fadeIn(reduceMotion, overrides) {
  const base = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: VIEWPORT_DEFAULT,
    transition: { duration: DURATION_REVEAL },
  };
  const preset = reduceMotion ? { ...base, initial: false } : base;
  return mergePreset(preset, overrides);
}

/* ------------------------------------------------------------------ */
/*  cardReveal                                                          */
/*  Slides up 24px — slightly more pronounced than fadeUp.            */
/*  Used in: TerminalCard, project cards, feature cards               */
/* ------------------------------------------------------------------ */

export function cardReveal(reduceMotion, overrides) {
  const base = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_CARD,
    transition: { duration: DURATION_REVEAL, ease: EASE_SPRING },
  };
  const preset = reduceMotion ? { ...base, initial: false } : base;
  return mergePreset(preset, overrides);
}

/* ------------------------------------------------------------------ */
/*  terminalReveal                                                      */
/*  Alias for cardReveal — kept as a named export for semantic clarity */
/*  when used specifically for the terminal/code card.                 */
/* ------------------------------------------------------------------ */

export function terminalReveal(reduceMotion, overrides) {
  return cardReveal(reduceMotion, overrides);
}

/* ------------------------------------------------------------------ */
/*  slideIn                                                             */
/*  Horizontal slide — used for log lines inside the terminal card.   */
/*  Slides in 6px from the left while fading.                         */
/* ------------------------------------------------------------------ */

export function slideIn(reduceMotion, overrides) {
  const base = {
    initial: { opacity: 0, x: -6 },
    animate: { opacity: 1, x: 0 },
  };
  const preset = reduceMotion ? { ...base, initial: false } : base;
  return mergePreset(preset, overrides);
}

/* ------------------------------------------------------------------ */
/*  toastAnimation                                                      */
/*  Entrance + exit for the toast notification.                        */
/*  Scale + opacity + y shift — matched to original values.           */
/* ------------------------------------------------------------------ */

export const toastAnimation = {
  initial: { opacity: 0, y: 12, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.96 },
};

/*
 * Toast does not support reduceMotion via a factory because it is
 * always short-lived feedback — the WCAG reduced-motion guidance
 * allows brief, essential notifications to still animate.
 * If stricter compliance is needed, wrap at the call site:
 *   initial={reduceMotion ? false : toastAnimation.initial}
 */

/* ------------------------------------------------------------------ */
/*  socialHover                                                         */
/*  Micro-interaction for icon links.                                  */
/*  Used in: social rail links, nav icons                              */
/* ------------------------------------------------------------------ */

export const socialHover = {
  whileHover: { y: -3 },
  whileTap: { scale: 0.95 },
};

/* ------------------------------------------------------------------ */
/*  spinLoop                                                            */
/*  Continuous 360° rotation — used for the conic gradient glow ring. */
/*  Intentionally excluded from reduceMotion: it's a decorative blur  */
/*  element already marked aria-hidden. If stricter compliance is      */
/*  needed, gate `animate` at the call site.                           */
/* ------------------------------------------------------------------ */

export const spinLoop = {
  animate: { rotate: 360 },
  transition: { duration: 14, repeat: Infinity, ease: "linear" },
};