export interface SepayQRPayload {
  bankCode: string;
  accountNo: string;
  amount: number;
  description: string;
}

export function generateSepayQR({
  bankCode,
  accountNo,
  amount,
  description,
}: SepayQRPayload) {
  return `https://qr.sepay.vn/img?bank=${bankCode}&acc=${accountNo}&amount=${amount}&des=${encodeURIComponent(
    description
  )}`;
}
