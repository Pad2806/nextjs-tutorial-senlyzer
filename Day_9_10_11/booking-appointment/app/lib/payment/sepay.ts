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

  const raw = await res.text();

  console.error("SEPAY STATUS:", res.status);
  console.error("SEPAY RESPONSE:", raw);

  if (!res.ok) {
    throw new Error("SEPAY_CREATE_FAILED");
  }

  return JSON.parse(raw);
}
