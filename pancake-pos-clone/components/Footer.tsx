import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">Pancake POS</h3>
            <div className="text-sm text-text-secondary space-y-2">
              <p><strong className="text-text-primary">Trụ sở chính:</strong> Tầng 3, Tòa nhà Golden West, số 2 Lê Văn Thiêm, Thanh Xuân, Hà Nội.</p>
              <p><strong className="text-text-primary">CN HCM:</strong> Khu đô thị Sala, Số 56-58 Đường B4, Phường An Lợi Đông, TP. Thủ Đức, TP. Hồ Chí Minh.</p>
              <p><strong className="text-text-primary">CN Singapore:</strong> 68 Circular Road, #02-01, 049422, Singapore.</p>
              <p><strong className="text-text-primary">Hotline:</strong> 1900 888 619</p>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-4">
            <h4 className="font-bold text-text-primary">Sản phẩm</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-primary transition-colors">Tính năng</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Bảng giá</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Khách hàng</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Đối tác</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h4 className="font-bold text-text-primary">Về Pancake</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-primary transition-colors">Giới thiệu</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Tuyển dụng</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</Link></li>
            </ul>
          </div>

          {/* Column 4: Download */}
          <div className="space-y-4">
            <h4 className="font-bold text-text-primary">Tải ứng dụng</h4>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors w-fit">
                 {/* Apple Icon */}
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-2.96-.9-3.91-.9-1.35 0-2.43.9-3.32.9-1.92.05-3.38-1.57-3.38-1.57-.04.03-3.64-4.23-3.03-7.79.52-3.07 3.01-4.78 5.48-4.82 1.34-.04 2.87.89 3.75.89.88 0 2.21-1.09 3.93-.9 3.12.24 4.54 2.15 4.54 2.15-2.61 1.23-2.93 4.1-1.37 5.75-.49 1.44-1.12 2.87-1.96 4.12zm-3.85-15.02c.76-1 1.32-2.33 1.18-3.68-1.2.06-2.67.87-3.48 1.83-.73.86-1.34 2.27-1.19 3.61 1.35.1 2.73-.78 3.49-1.76z"/></svg>
                 <div className="text-left">
                   <div className="text-[10px] leading-none">Download on the</div>
                   <div className="text-sm font-bold leading-tight">App Store</div>
                 </div>
              </button>
              
              <button className="flex items-center gap-3 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors w-fit">
                 {/* Google Play Icon */}
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.17,10.87C21.17,11.25 21.17,12.75 20.17,13.13L17.89,16.2L15.39,13.7L17.89,11.2L20.17,10.87M9.61,2.96L16.81,8.88L14.54,11.15L6.05,2.66L9.61,2.96Z" /></svg>
                 <div className="text-left">
                   <div className="text-[10px] leading-none">GET IT ON</div>
                   <div className="text-sm font-bold leading-tight">Google Play</div>
                 </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 text-center text-sm text-text-secondary">
          <p>&copy; {new Date().getFullYear()} Pancake POS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
