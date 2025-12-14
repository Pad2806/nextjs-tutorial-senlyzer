## Week 1 - Day 5

### Tìm hiểu về Improving Accessibility

-Accesibility là thiết kế và xây dựng ứng dụng web sao cho mọi người đều có thể sử dụng

- ESLint giúp phát hiện lỗi accesibility ngay khi code, giảm rủi ro khi deploy production
- Form Validation
  - Client-side Validation dùng required, dựa vào validation của trình duyệt
  - Server-side Validation
    - Giúp chắc chắn rằng dữ liệu đúng trước khi lưu vào DB
    - Tránh người dùng có thể bypass client validation
    - Chỉ có 1 source of truth duy nhất để nhận biết dữ liệu hợp lệ
- useActionState là hook của React dùng để xử lý state khi submit form, giúp kết nối trực tiếp Client Component với Server Action
- zod giúp kiểm tra dữ liệu của form và tạo thông báo lỗi
- safeParse trả về 2 trường success hoặc lỗi { success, data | error }

### Tìm hiểu về Adding Authentication

- Authentication là quá trình xác minh danh tính người dùng, đảm bảo người dùng đúng là người họ khai báo
- Authentication xác minh danh tính người dùng
- Authorization xác định quyền truy cập của người dùng
- NextAuth.js là thử viện giúp quản lý session, đăng nhập, đăng xuất và các khía cạnh khác của xác thực
- NextAuth.js hỗ trợ nhiều provider như Credentials, Google, Github,...

### Tìm hiểu về Metadata

- Metadata cung cấp mô tả bổ sung cho trang web, nó không hiển thị trực tiếp lên trang web mà được nhúng trong thẻ <head> trong trang HTML
- Metadata thường chủ yếu dùng cho SEO và các hệ thông khác
- Metadata giúp:
  - Google và các search index trang tốt hơn
  - Ảnh hưởng trực tiếp đến thứ hạng tìm kiếm
  - Title và description là thứ thường xuất hiện trên kết quả tìm kiếm
- Open Graph metadata giúp:
  - Cải thiện hình dạng của liên kết được chia sẻ trên mạng xã hội
  - Làm trang web thêm hấp dẫn và nhiều thông tin hơn cho người dùng
  - Hiển thị tiêu dề, mô tả và ảnh preview
- Title Metadata hiển thị trên tab trình duyệt, rất quan trọng cho SEO
- Description Metadata mô tả ngắn nội dung trang và thường hiển thị trên kết quả tìm kiếm
- Keyword Metadata chứa từ khoá liên quan đến nội dung
- Open Graph Metadata dùng khi chia sẻ link trên mạng xã hội
- Favicon Metadata là link favicon trên trang web, hiển thị icon nhỏ trên tab trình duyệt
- Có 2 cách Adding Metadata vào ứng dụng:
  - Config-based: export "static metadata object" hoặc "generateMetadata"
  - File-based: NextJS có nhiều file đặc biệt được dùng cho các mục đích khác nhau:
    - favicon.ico, apple-icon.jpg, and icon.jpg: được dùng cho favicon và icon
    - opengraph-image.jpg and twitter-image.jpg: được dùng cho hình ảnh chia sẻ mạng xã hội
    - robots.txt: cung cấp hướng dẫn cho công cụ tìm kiếm crawling
    - sitemap.xml: cung nhiều thông tin hơn về cấu trúc website

### Tìm hiểu về SEO

- SEO (Search Engine Optimization) là chìa khoá giúp tăng chuyển đổi và xây dựng niềm tim cho thương hiệu
- Khi website có thứ hạng cao trên tìm kiếm đồng nghĩa với việc sẽ có nhiều người dùng truy cập vào website hơn
- Organic traffic là lượng truy cập đến từ việc người dùng nhấp và kết quả tìm kiếm và đó là chìa khoá cho nhiều doanh nghiệp với 3 lý do:
  - Chất lượng: Tăng cơ hội người dùng sẽ thành khách hàng
  - Độ tin cậy: Nâng cao niềm tin thương hiệu hoặc sứ mệnh
  - Chi phí thấp: ngoài thời gian và công sức tối ưu, có SEO tốt sẽ giúp tăng vị trí tìm kiếm một cách miễn phí
- Quy trình tối ưu 1 website thường được chia thành 3 cột chính:
  - Kỹ thuật: Tối ưu website cho việc crawl và hiệu năng
  - Nội dung: Tạo chiến lược nội dung nhắm tới từ khoá cụ thể
  - Độ phổ biến: Tăng mức độ hiện diện online để các công cụ tìm kiếm đánh giá là 1 nguồn đáng tin. Trọng tâm thường là backlinks từ các website bên thứ ba trỏ về website

### Tìm hiểu về Search Systems

- Search Systems (hệ thống tìm kiếm) chính là các nền tảng thường gọi là search engines như Google, Bing, DuckDuckGo, …
- Đây là những hệ thống cực kỳ phức tạp được xây dựng để giải quyết các bài toán lớn trong lịch sử công nghệ
- 4 trách nhiệm chính:
  - Crawling là quá trình đi khắp các web để truy cập và đọc nội dung của các website, sau đó phân tích nội dung đó.
  - Indexing là bước lưu trữ dữ liệu đã thu thập theo cách có tổ chức để có thể truy vấn nhanh khi người dùng tìm kiếm
  - Rendering là quá trình thực thi tài nguyên của trang (đặc biệt là JavaScript) để tạo ra phiên bản nội dung hoàn chỉnh như người dùng nhìn thấy trên trình duyệt.
  - Ranking là bước truy vấn dữ liệu trong index và tạo ra trang kết quả tìm kiếm phù hợp dựa trên input của người dùng
### Deploy
https://nextjs-tutorial-senlyzer-day5.vercel.app/
