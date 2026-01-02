import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import ConnectionTest from "@/components/ConnectionTest";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-text-primary">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Connection Test (Temporary) */}
        <div className="container mx-auto px-4 py-8">
           <ConnectionTest />
        </div>
        
        {/* Feature 1: Multi-channel */}
        <FeatureSection
          title="Quản lý bán hàng đa kênh"
          description="Tất cả các kênh bán hàng của bạn được quản lý tập trung tại một nơi. Đồng bộ tồn kho, đơn hàng và khách hàng theo thời gian thực."
          features={[
            "Đồng bộ Shopee, Lazada, TikTok Shop, Tiki",
            "Quản lý hàng ngàn mã sản phẩm dễ dàng",
            "Báo cáo doanh thu chi tiết theo từng kênh"
          ]}
          imageContent={
            <div className="p-8 w-full h-full flex items-center justify-center bg-blue-50/50">
               {/* Illustration Placeholder */}
               <div className="text-center space-y-4">
                  <div className="flex justify-center gap-4">
                     <span className="p-3 bg-white rounded-lg shadow-sm text-orange-500 font-bold">Shopee</span>
                     <span className="p-3 bg-white rounded-lg shadow-sm text-blue-600 font-bold">Lazada</span>
                     <span className="p-3 bg-white rounded-lg shadow-sm text-black font-bold">TikTok</span>
                  </div>
                  <div className="w-1 h-8 bg-gray-300 mx-auto"></div>
                  <div className="p-4 bg-white rounded-xl shadow-lg border border-blue-100">
                     <p className="font-bold text-primary">Pancake POS Hub</p>
                  </div>
               </div>
            </div>
          }
        />
        
        {/* Feature 2: Shipping (Reversed) */}
        <FeatureSection
          reversed
          title="Kết nối vận chuyển tự động"
          description="Tích hợp sẵn các đơn vị vận chuyển hàng đầu. So sánh giá, đẩy đơn và theo dõi hành trình vận đơn tự động."
          features={[
            "Kết nối GHN, GHTK, Viettel Post, J&T...",
            "Tự động tính phí vận chuyển",
            "Đối soát COD minh bạch, chính xác"
          ]}
          imageContent={
            <div className="p-8 w-full h-full flex items-center justify-center bg-green-50/50">
               <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  {['GHN', 'GHTK', 'Viettel', 'J&T', 'Grab', 'Ahamove'].map((shipper) => (
                    <div key={shipper} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center font-medium text-gray-600">
                      {shipper}
                    </div>
                  ))}
               </div>
            </div>
          }
        />
        
        {/* Feature 3: Chat & Care */}
        <FeatureSection
          title="Chăm sóc và Re-marketing"
          description="Lưu trữ lịch sử mua hàng, phân nhóm khách hàng để gửi tin nhắn chăm sóc và tiếp thị lại hiệu quả."
          features={[
            "Lưu trữ lịch sử chat và đơn hàng",
            "Phân loại khách hàng VIP, Mới, Cũ",
            "Gửi tin nhắn hàng loạt (Broadcast)"
          ]}
          imageContent={
             <div className="p-6 w-full h-full bg-purple-50/50 flex flex-col gap-3 justify-center">
                <div className="bg-white p-4 rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-sm border border-gray-100 self-start max-w-[80%]">
                  <p className="text-sm text-gray-600">Chào bạn, shop đang có chương trình khuyến mãi giảm 20%...</p>
                </div>
                <div className="bg-blue-600 p-4 rounded-tl-xl rounded-tr-xl rounded-bl-xl shadow-sm self-end max-w-[80%]">
                  <p className="text-sm text-white">Mình muốn đặt hàng mẫu này ạ!</p>
                </div>
             </div>
          }
        />
        
        {/* Partners Section */}
        <section className="py-16 bg-white border-y border-gray-50">
           <div className="container mx-auto px-4 text-center space-y-8">
              <h3 className="text-xl font-semibold text-text-secondary">Được tin dùng bởi hơn 100.000+ nhà bán hàng</h3>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                 {/* Placeholders for Partner Logos */}
                 {['Coolmate', 'Yody', 'Gumina', 'Hnoss', 'Juno'].map(brand => (
                    <span key={brand} className="text-2xl font-bold font-serif text-gray-400">{brand}</span>
                 ))}
              </div>
           </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-primary text-white text-center">
           <div className="container mx-auto px-4 space-y-8">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
               Bắt đầu tối ưu quản lý bán hàng<br/> ngay hôm nay
             </h2>
             <p className="text-blue-100 text-lg max-w-2xl mx-auto">
               Trải nghiệm miễn phí 14 ngày đầy đủ tính năng. Không cần thẻ tín dụng.
             </p>
             <div className="flex justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-10 h-14 text-lg shadow-xl">
                  Đăng ký dùng thử
                </Button>
             </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
