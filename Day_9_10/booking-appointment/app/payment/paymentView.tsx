import { generateSepayQR } from '@/app/lib/payment/vietqr';
import { usePayment } from './usePayment';

export default function PaymentView() {
  const { name, phone, service, amount } = usePayment();

  const qrUrl = generateSepayQR({
    bankCode: 'VCB',
    accountNo: '0123456789',
    amount,
    description: `DATLICH_${phone}`,
  });

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-lg shadow-blue-100 p-8 space-y-6 text-center">
      
      <h1 className="text-xl font-semibold text-slate-900">
        Thanh toán giữ lịch
      </h1>

      <div className="bg-blue-50 rounded-xl p-4 text-sm text-left space-y-1">
        <p>
          <span className="text-slate-500">Khách hàng:</span>{' '}
          <b>{name}</b>
        </p>
        <p>
          <span className="text-slate-500">Dịch vụ:</span>{' '}
          <b>{service}</b>
        </p>
        <p>
          <span className="text-slate-500">Số tiền:</span>{' '}
          <b className="text-blue-600">{amount.toLocaleString()}đ</b>
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <img src={qrUrl} alt="QR thanh toán" className="w-64 h-64" />
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 space-y-1">
        <p className="font-medium text-slate-800">VIETCOMBANK</p>
        <p className="text-base">0123456789</p>
        <p className="text-blue-600">
          Nội dung: <b>DATLICH_{phone}</b>
        </p>
      </div>
    </div>
  );
}
