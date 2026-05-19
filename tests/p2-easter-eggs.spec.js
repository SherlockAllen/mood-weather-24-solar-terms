// @ts-check
import { test, expect } from '@playwright/test';

test.describe('P2 Easter Eggs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.slides-container .slide', { state: 'visible' });
  });

  test('lichun - spring wind effect', async ({ page }) => {
    await expect(page.locator('.slide.active .term-name')).toHaveText('立春');

    const poem = page.locator('.slide.active .term-poem');
    await expect(poem).toBeVisible();
    await expect(poem).toContainText('spring breeze');
  });

  test('qingming - rain alley atmosphere', async ({ page }) => {
    for (let i = 0; i < 4; i++) {
      await page.getByLabel('Next Solar Term').click();
      await page.waitForTimeout(250);
    }
    await expect(page.locator('.slide.active .term-name')).toHaveText('清明');

    const poem = page.locator('.slide.active .term-poem');
    await expect(poem).toContainText('rain');

    const seasonalEffects = page.locator('#seasonal-effects');
    const children = await seasonalEffects.locator('> *').count();
    expect(children).toBeGreaterThan(0);
  });

  test('xiazhi - solar eclipse hint', async ({ page }) => {
    for (let i = 0; i < 9; i++) {
      await page.getByLabel('Next Solar Term').click();
      await page.waitForTimeout(250);
    }
    await expect(page.locator('.slide.active .term-name')).toHaveText('夏至');

    const skyLayer = page.locator('#sky-layer');
    await expect(skyLayer).toBeVisible();

    const poem = page.locator('.slide.active .term-poem');
    await expect(poem).toContainText('Sunrise');
  });

  test('qiufen - full moon', async ({ page }) => {
    for (let i = 0; i < 15; i++) {
      await page.getByLabel('Next Solar Term').click();
      await page.waitForTimeout(250);
    }
    await expect(page.locator('.slide.active .term-name')).toHaveText('秋分');

    const seasonalEffects = page.locator('#seasonal-effects');
    await expect(seasonalEffects).toBeVisible();

    const svgContent = await seasonalEffects.innerHTML();
    expect(svgContent).toContain('deco-pulse');
  });

  test('dongzhi - aurora borealis', async ({ page }) => {
    for (let i = 0; i < 21; i++) {
      await page.getByLabel('Next Solar Term').click();
      await page.waitForTimeout(250);
    }
    await expect(page.locator('.slide.active .term-name')).toHaveText('冬至');

    const skyLayer = page.locator('#sky-layer');
    await expect(skyLayer).toBeVisible();

    const seasonalEffects = page.locator('#seasonal-effects');
    const children = await seasonalEffects.locator('> *').count();
    expect(children).toBeGreaterThan(0);
  });
});
