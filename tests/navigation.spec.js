// @ts-check
import { test, expect } from '@playwright/test';

const TERMS = [
  '立春',
  '雨水',
  '惊蛰',
  '春分',
  '清明',
  '谷雨',
  '立夏',
  '小满',
  '芒种',
  '夏至',
  '小暑',
  '大暑',
  '立秋',
  '处暑',
  '白露',
  '秋分',
  '寒露',
  '霜降',
  '立冬',
  '小雪',
  '大雪',
  '冬至',
  '小寒',
  '大寒',
];

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.slides-container .slide', { state: 'visible' });
  });

  test('arrow buttons switch solar terms', async ({ page }) => {
    await page.getByLabel('Next Solar Term').click();
    await expect(page.locator('.slide.active .term-name')).toHaveText(TERMS[1]);

    await page.getByLabel('Previous Solar Term').click();
    await expect(page.locator('.slide.active .term-name')).toHaveText(TERMS[0]);
  });

  test('dot navigation jumps to correct term', async ({ page }) => {
    const dots = page.locator('.dot');
    await dots.nth(5).click();
    await expect(page.locator('.slide.active .term-name')).toHaveText(TERMS[5]);

    await dots.nth(10).click();
    await expect(page.locator('.slide.active .term-name')).toHaveText(TERMS[10]);
  });

  test('keyboard left/right arrows navigate', async ({ page }) => {
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.slide.active .term-name')).toHaveText(TERMS[1]);

    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.slide.active .term-name')).toHaveText(TERMS[0]);
  });

  test('Home key returns to first term', async ({ page }) => {
    await page.getByLabel('Next Solar Term').click();
    await page.getByLabel('Next Solar Term').click();
    await expect(page.locator('.slide.active .term-name')).toHaveText(TERMS[2]);

    await page.locator('.dot.active').focus();
    await page.keyboard.press('Home');
    await page.waitForTimeout(400);
    await expect(page.locator('.slide.active .term-name')).toHaveText(TERMS[0]);
  });

  test('End key jumps to last term', async ({ page }) => {
    await page.locator('.dot.active').focus();
    await page.keyboard.press('End');
    await page.waitForTimeout(400);
    await expect(page.locator('.slide.active .term-name')).toHaveText(TERMS[23]);
  });

  test('Esc key returns to first term', async ({ page }) => {
    await page.getByLabel('Next Solar Term').click();
    await page.locator('body').click();
    await page.keyboard.press('Escape');
    await expect(page.locator('.slide.active .term-name')).toHaveText(TERMS[0]);
  });

  test('dot active state updates on navigation', async ({ page }) => {
    const firstDot = page.locator('.dot.active');
    await expect(firstDot).toHaveAttribute('aria-label', TERMS[0]);

    await page.getByLabel('Next Solar Term').click();
    await expect(page.locator('.dot.active')).toHaveAttribute('aria-label', TERMS[1]);
  });

  test('page title updates on navigation', async ({ page }) => {
    await page.getByLabel('Next Solar Term').click();
    await expect(page).toHaveTitle(`Mood Weather — ${TERMS[1]}`);
  });
});
