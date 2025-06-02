import type { EaseFunction } from './easingFunctions';
import { easeInOutCubic } from './easingFunctions'; // дефолтная кривая
import { addInteractionBlocker, removeInteractionBlocker } from './interactionBlocker';

/**
 * Плавная прокрутка страницы к позиции Y
 * @param targetY Координата Y, к которой нужно прокрутить
 * @param duration Длительность анимации в мс (по умолчанию 1000)
 * @param ease Функция easing (по умолчанию easeInOutCubic)
 */
export function smoothScrollTo(
  targetY: number,
  duration: number = 1000,
  ease: EaseFunction = easeInOutCubic
): void {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();

  addInteractionBlocker();

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = ease(progress);
    window.scrollTo(0, startY + distance * easedProgress);

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
    else {
      removeInteractionBlocker();
    }
  };

  requestAnimationFrame(step);
}
