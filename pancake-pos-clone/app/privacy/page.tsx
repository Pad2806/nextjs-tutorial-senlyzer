import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white p-8 font-sans text-gray-800">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">Chính Sách Quyền Riêng Tư</h1>
            <Link href="/">
                <Button variant="outline" size="sm">Về trang chủ</Button>
            </Link>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-2">1. Thu thập dữ liệu</h2>
          <p>
            Ứng dụng Pancake POS Clone ("chúng tôi") thu thập thông tin cơ bản từ tài khoản Facebook/Google của bạn (như Tên, Email, Ảnh đại diện) chỉ nhằm mục đích xác thực và tạo tài khoản người dùng trong hệ thống.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Sử dụng dữ liệu</h2>
          <p>Dữ liệu của bạn được sử dụng để:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Cung cấp quyền truy cập vào bảng điều khiển (Dashboard).</li>
            <li>Đồng bộ hóa đơn hàng và khách hàng (nếu bạn cấp quyền).</li>
            <li>Liên lạc qua email về các vấn đề liên quan đến tài khoản.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Xóa dữ liệu</h2>
          <p>
            Nếu bạn muốn xóa toàn bộ dữ liệu của mình khỏi hệ thống của chúng tôi, vui lòng gửi email về địa chỉ: <strong>support@pancake-clone.local</strong> hoặc vào phần Cài đặt tài khoản trong Dashboard và chọn "Xóa tài khoản".
          </p>
          <p className="mt-2 text-sm text-gray-500">
            URL Hướng dẫn xóa dữ liệu: {typeof window !== 'undefined' ? window.location.href : 'http://localhost:3005/privacy'}
          </p>
        </section>

        <div className="pt-8 border-t border-gray-100 text-sm text-gray-500">
          <p>Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
        </div>
      </div>
    </div>
  );
}
