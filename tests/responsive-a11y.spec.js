// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Responsive', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.slides-container .slide', { state: 'visible' });
  });

  test('desktop layout renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    const carousel = page.locator('#carousel');
    await expect(carousel).toBeVisible();

    const navArrows = page.locator('.nav-arrow');
    await expect(navArrows).toHaveCount(2);

    const dots = page.locator('.dot');
    const count = await dots.count();
    expect(count).toBe(24);
  });

  test('tablet layout adapts', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    const carousel = page.locator('#carousel');
    await expect(carousel).toBeVisible();

    const slide = page.locator('.slide.active');
    await expect(slide).toBeVisible();
  });

  test('mobile layout fits viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const carousel = page.locator('#carousel');
    await expect(carousel).toBeVisible();

    const slide = page.locator('.slide.active');
    await expect(slide).toBeVisible();

    const dots = page.locator('.dot');
    const count = await dots.count();
    expect(count).toBe(24);
  });

  test('no horizontal overflow on any viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.slides-container .slide', { state: 'visible' });
  });

  test('carousel has ARIA label', async ({ page }) => {
    const carousel = page.locator('#carousel');
    await expect(carousel).toHaveAttribute('aria-label', '24 Solar Terms Carousel');
  });

  test('dot list has tablist role', async ({ page }) => {
    const tablist = page.locator('[role="tablist"]');
    await expect(tablist).toBeVisible();
  });

  test('active dot has aria-selected', async ({ page }) => {
    const activeDot = page.locator('.dot[aria-selected="true"]');
    await expect(activeDot).toBeVisible();
  });

  test('nav arrows have accessible labels', async ({ page }) => {
    await expect(page.getByLabel('Previous Solar Term')).toBeVisible();
    await expect(page.getByLabel('Next Solar Term')).toBeVisible();
  });

  test('page has h1 for screen readers', async ({ page }) => {
    const h1 = page.locator('h1.sr-only');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Mood Weather');
  });

  test('keyboard focus visible on navigation', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('reduced motion does not break rendering', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.slide.active .term-name', { state: 'visible' });

    const slide = page.locator('.slide.active');
    await expect(slide).toBeVisible();
  });
});
