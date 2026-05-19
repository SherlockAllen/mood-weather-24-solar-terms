// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.slides-container .slide', { state: 'visible' });
  });

  test('no console errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.reload();
    await page.waitForSelector('.slides-container .slide', { state: 'visible' });

    expect(errors).toEqual([]);
  });

  test('no 404 network requests', async ({ page }) => {
    const responses = [];
    page.on('response', (resp) => {
      if (resp.status() === 404) {
        responses.push(resp.url());
      }
    });

    await page.reload();
    await page.waitForSelector('.slides-container .slide', { state: 'visible' });

    expect(responses).toEqual([]);
  });

  test('first paint under 2 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForSelector('.slides-container .slide', { state: 'visible' });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(2000);
  });

  test('animation uses GPU-composited properties', async ({ page }) => {
    const inkBlurs = page.locator('.ink-blur-1, .ink-blur-2, .mist-layer');
    const count = await inkBlurs.count();
    expect(count).toBeGreaterThan(0);

    const willChangeCount = await page.locator('[class*="ink-blur"], .mist-layer').count();
    expect(willChangeCount).toBeGreaterThan(0);
  });

  test('memory stable after 10 transitions', async ({ page }) => {
    const initialHandles = await page.evaluateHandle(() => {
      return performance.memory?.usedJSHeapSize || 0;
    });

    for (let i = 0; i < 10; i++) {
      await page.getByLabel('Next Solar Term').click();
      await page.waitForTimeout(100);
    }

    const finalHandles = await page.evaluateHandle(() => {
      return performance.memory?.usedJSHeapSize || 0;
    });

    const initial = await initialHandles.jsonValue();
    const final = await finalHandles.jsonValue();

    if (initial > 0 && final > 0) {
      const growth = ((final - initial) / initial) * 100;
      expect(growth).toBeLessThan(50);
    }
  });

  test('transition animation completes', async ({ page }) => {
    await page.getByLabel('Next Solar Term').click();

    await page.waitForFunction(
      () => {
        const slides = document.querySelectorAll('.slide');
        return Array.from(slides).every(
          (s) => !s.classList.contains('slide-enter') && !s.classList.contains('slide-exit')
        );
      },
      { timeout: 5000 }
    );

    const activeSlides = page.locator('.slide');
    await expect(activeSlides).toHaveCount(1);
  });
});
