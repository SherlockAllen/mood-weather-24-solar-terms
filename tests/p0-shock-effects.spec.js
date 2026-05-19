// @ts-check
import { test, expect } from '@playwright/test';

test.describe('P0 Shock Effects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.slides-container .slide', { state: 'visible' });
  });

  test('summer solstice - no shadow effect', async ({ page }) => {
    for (let i = 0; i < 9; i++) {
      await page.getByLabel('Next Solar Term').click();
      await page.waitForTimeout(200);
    }
    await expect(page.locator('.slide.active .term-name')).toHaveText('夏至');

    const skyLayer = page.locator('#sky-layer');
    await expect(skyLayer).toBeVisible();

    const svgContent = await skyLayer.innerHTML();
    expect(svgContent.length).toBeGreaterThan(0);
  });

  test('winter solstice - aurora effect', async ({ page }) => {
    for (let i = 0; i < 21; i++) {
      await page.getByLabel('Next Solar Term').click();
      await page.waitForTimeout(200);
    }
    await expect(page.locator('.slide.active .term-name')).toHaveText('冬至');

    const seasonalEffects = page.locator('#seasonal-effects');
    await expect(seasonalEffects).toBeVisible();

    const effectCount = await seasonalEffects.locator('> *').count();
    expect(effectCount).toBeGreaterThan(0);
  });

  test('qingming - misty rain effect', async ({ page }) => {
    for (let i = 0; i < 4; i++) {
      await page.getByLabel('Next Solar Term').click();
      await page.waitForTimeout(200);
    }
    await expect(page.locator('.slide.active .term-name')).toHaveText('清明');

    const seasonalEffects = page.locator('#seasonal-effects');
    await expect(seasonalEffects).toBeVisible();

    const effectCount = await seasonalEffects.locator('> *').count();
    expect(effectCount).toBeGreaterThan(0);
  });

  test('season theme colors change on navigation', async ({ page }) => {
    await expect(page.locator('body')).toHaveCSS('background-color', /rgb\(.+\)/);

    await page.getByLabel('Next Solar Term').click();
    await page.waitForTimeout(400);

    const carousel = page.locator('#carousel');
    await expect(carousel).toHaveAttribute('class', /season-/);
  });

  test('mountain silhouette updates per term', async ({ page }) => {
    const mountainBack = page.locator('#mountain-back');
    const initialD = await mountainBack.getAttribute('d');

    await page.getByLabel('Next Solar Term').click();
    await page.waitForTimeout(400);

    const newD = await mountainBack.getAttribute('d');
    expect(newD).not.toBe(initialD);
  });
});
