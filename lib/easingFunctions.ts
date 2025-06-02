export type EaseFunction = (t: number) => number;

// Linear
export const linear: EaseFunction = t => t;

// Quad
export const easeInQuad: EaseFunction = t => t * t;
export const easeOutQuad: EaseFunction = t => t * (2 - t);
export const easeInOutQuad: EaseFunction = t =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// Cubic
export const easeInCubic: EaseFunction = t => t * t * t;
export const easeOutCubic: EaseFunction = t => --t * t * t + 1;
export const easeInOutCubic: EaseFunction = t =>
  t < 0.5
    ? 4 * t * t * t
    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

// Quart
export const easeInQuart: EaseFunction = t => t * t * t * t;
export const easeOutQuart: EaseFunction = t => 1 - --t * t * t * t;
export const easeInOutQuart: EaseFunction = t =>
  t < 0.5
    ? 8 * t * t * t * t
    : 1 - 8 * --t * t * t * t;

// Quint
export const easeInQuint: EaseFunction = t => t * t * t * t * t;
export const easeOutQuint: EaseFunction = t => 1 + --t * t * t * t * t;
export const easeInOutQuint: EaseFunction = t =>
  t < 0.5
    ? 16 * t * t * t * t * t
    : 1 + 16 * --t * t * t * t * t;

// Sine
export const easeInSine: EaseFunction = t => 1 - Math.cos((t * Math.PI) / 2);
export const easeOutSine: EaseFunction = t => Math.sin((t * Math.PI) / 2);
export const easeInOutSine: EaseFunction = t =>
  -(Math.cos(Math.PI * t) - 1) / 2;

// Expo
export const easeInExpo: EaseFunction = t =>
  t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
export const easeOutExpo: EaseFunction = t =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
export const easeInOutExpo: EaseFunction = t => {
  if (t === 0) return 0;
  if (t === 1) return 1;
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
};

// Circ
export const easeInCirc: EaseFunction = t => 1 - Math.sqrt(1 - t * t);
export const easeOutCirc: EaseFunction = t => Math.sqrt(1 - --t * t);
export const easeInOutCirc: EaseFunction = t =>
  t < 0.5
    ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
    : (Math.sqrt(1 - 4 * (t - 1) * (t - 1)) + 1) / 2;

// Back
export const easeInBack: EaseFunction = t => {
  const c1 = 1.70158;
  return c1 * t * t * t - c1 * t * t;
};
export const easeOutBack: EaseFunction = t => {
  const c1 = 1.70158;
  return 1 + c1 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
export const easeInOutBack: EaseFunction = t => {
  const c1 = 1.70158 * 1.525;
  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c1 + 1) * 2 * t - c1)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c1 + 1) * (t * 2 - 2) + c1) + 2) / 2;
};

// Elastic
export const easeInElastic: EaseFunction = t => {
  if (t === 0 || t === 1) return t;
  return -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
};
export const easeOutElastic: EaseFunction = t => {
  if (t === 0 || t === 1) return t;
  return Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
};
export const easeInOutElastic: EaseFunction = t => {
  if (t === 0 || t === 1) return t;
  t *= 2;
  if (t < 1) {
    return (
      -0.5 * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI)
    );
  }
  return (
    0.5 * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI) + 1
  );
};

// Bounce
export const easeOutBounce: EaseFunction = t => {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
};
export const easeInBounce: EaseFunction = t => 1 - easeOutBounce(1 - t);
export const easeInOutBounce: EaseFunction = t =>
  t < 0.5
    ? (1 - easeOutBounce(1 - 2 * t)) / 2
    : (1 + easeOutBounce(2 * t - 1)) / 2;
