# QR.Social - Next.js QR Code Generator

<p align="center">
  A modern, sleek, and highly customizable QR code generator built with the latest web technologies.
</p>

## Giới thiệu (Overview)

**QR.Social** là hệ thống tạo mã QR trực tuyến với giao diện Glassmorphism tuyệt đẹp. Ứng dụng không chỉ giúp người dùng chuyển đổi các liên kết hay văn bản thành mã QR một cách nhanh chóng, mà còn hỗ trợ tùy biến màu sắc, sao chép hình ảnh trực tiếp, và cung cấp một trang xem trước (preview) dành riêng cho việc chia sẻ.

## Tính năng nổi bật (Features)

- **Trình tạo QR Tốc độ cao**: Nhập liệu và xem trước mã QR theo thời gian thực.
- **Tùy chỉnh màu sắc**: Hỗ trợ bộ chọn màu (color picker) cho cả màu mã QR (Foreground) và màu nền (Background).
- **Sao chép & Tải xuống dễ dàng**:
  - Tải mã QR dưới định dạng ảnh `.png` chất lượng cao.
  - Hỗ trợ API `navigator.clipboard` để copy trực tiếp hình ảnh QR vào bộ nhớ tạm để dễ dàng dán vào các ứng dụng khác.
- **Smart Redirect & Search**:
  - Nhập **URL hợp lệ** (http/https): QR Code khi quét sẽ dẫn trực tiếp tới trang web đó.
  - Nhập **Văn bản thường**: QR Code khi quét sẽ tự động chuyển hướng tới kết quả tìm kiếm Google cho đoạn văn bản đó.
- **Trang chia sẻ độc lập (`/img`)**: Cung cấp giao diện "Ready to scan" tối giản và bắt mắt để chia sẻ cho người khác xem và quét.
- **Giao diện Premium**: Sử dụng hiệu ứng Ambient Gradients, Glassmorphism, và Responsive Design mượt mà trên mọi thiết bị.

## Công nghệ sử dụng (Tech Stack)

- **Framework**: Next.js (App Router, Server Components & API Routes)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Thư viện QR**: `qrcode` (Tạo ảnh buffer PNG trên server)

## Hướng dẫn cài đặt và Cách chạy dự án

Đảm bảo bạn đã cài đặt Node.js (phiên bản >= 18).

### 1. Cài đặt các gói phụ thuộc (Dependencies)
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### 2. Chạy môi trường phát triển (Development)
Sử dụng lệnh sau để chạy dự án trong quá trình code, ứng dụng sẽ tự động tải lại (hot-reload) khi bạn có thay đổi:
```bash
npm run dev
# hoặc
yarn dev
```
Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để sử dụng.

### 3. Chạy môi trường thực tế (Production)
Sử dụng lệnh sau để tối ưu hóa mã nguồn và chạy ứng dụng ở chế độ thực tế:
```bash
# Bước 1: Build dự án
npm run build
# hoặc yarn build

# Bước 2: Chạy server production
npm run start
# hoặc yarn start
```
Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt để kiểm tra thành quả với hiệu năng tốt nhất.

## Cấu trúc hệ thống (Project Structure)

```text
qrcode-generator-nextjs/
├── app/
│   ├── api/qr/route.ts       # API sinh ảnh QR Code từ văn bản & màu sắc
│   ├── components/
│   │   ├── QRGenerator.tsx   # Client component xử lý logic nhập liệu và actions
│   │   └── QRPreview.jsx     # Component phụ trợ giao diện
│   ├── img/page.tsx          # Trang chuyên biệt để hiển thị và chia sẻ QR Code
│   ├── r/route.ts            # API xử lý điều hướng thông minh (redirect)
│   ├── globals.css           # CSS tổng quan và Tailwind configuration
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page chính của ứng dụng
├── public/                   # Chứa hình ảnh tĩnh (logo, v.v.)
└── package.json              # Thông tin cấu hình và thư viện
```

## Cách thức hoạt động (How it works)

1. Người dùng nhập thông tin vào thẻ **Nội dung** tại giao diện.
2. Form sẽ gửi các thông số (văn bản, màu mã, màu nền) lên server thông qua `app/api/qr/route.ts`.
3. Server-side sử dụng thư viện `qrcode` để tạo bộ đệm hình ảnh (PNG buffer) và trả về ngay lập tức với định dạng `image/png`.
4. Ảnh xem trước được cập nhật liên tục (Reactive) mà không cần tải lại trang.

---
*Paduy2806*
