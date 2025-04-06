import { generateAccessToken, paypal } from "../lib/paypal";

// Test to generate access token from paypal
test("Generates token from paypal", async () => {
  const token = await generateAccessToken();
  console.log(token);
  expect(typeof token).toBe('string');
  expect(token).toBeDefined();
  expect(token.length).toBeGreaterThan(0);
  expect(token).toMatch(/^[A-Za-z0-9\-_]+$/);
});

// Test to create a paypal order
test("Creates paypal order", async () => {
  const token = await generateAccessToken();
  const price = 10.0;

  const orderResponse = await paypal.createOrder(price);
  console.log(orderResponse);

  expect(orderResponse).toHaveProperty("id");
  expect(orderResponse).toHaveProperty("status");
  expect(orderResponse.status).toBe("CREATED");

})

// Test to capture payment with mock order
test("Simulate capturing a payment from an order", async () => {
  const orderId = "100";

  const mockCapturePayment = jest
  .spyOn(paypal, 'capturePayment')
  .mockResolvedValueOnce({
    status: 'COMPLETED',
  });

  const capturedResponse = await paypal.capturePayment(orderId);
  
  expect(capturedResponse).toHaveProperty("status", "COMPLETED");
})