import { generateAccessToken } from "../lib/paypal";

// Test to generate access token from paypal
test('Generates token from paypal', async () => {
  const token = await generateAccessToken();
  console.log(token);
  expect(typeof token).toBe('string');
  expect(token).toBeDefined();
  expect(token.length).toBeGreaterThan(0);
  expect(token).toMatch(/^[A-Za-z0-9\-_]+$/);
});