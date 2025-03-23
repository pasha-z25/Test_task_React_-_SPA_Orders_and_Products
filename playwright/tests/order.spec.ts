import { expect, test } from '@playwright/test';

test('creates an order', async ({ page }) => {
  await page.goto('/orders');
  await page.click('button.create-order');
  await expect(page.locator('.order-list')).toHaveCount(1);
});
