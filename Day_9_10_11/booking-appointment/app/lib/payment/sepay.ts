export async function createSepayPayment({
  bookingId,
  amount,
}: {
  bookingId: string;
  amount: number;
}) {
  const res = await fetch("https://api.sepay.vn/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey ${process.env.SEPAY_API_KEY}`,
    },
    body: JSON.stringify({
      amount,
      description: `DATLICH_${bookingId}`,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("SEPAY_CREATE_FAILED: " + text);
  }

  return res.json(); 
  /**
   * Expected:
   * {
   *   qr_url: string,
   *   payment_code: string
   * }
   */
}
