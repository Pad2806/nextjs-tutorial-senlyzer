## Week 1 - Day 6

### Tìm hiểu về Web Crawlers, Crawling and Indexing

- Web crawler là một dạng bot mô phỏng hành vi người dùng và điều hướng qua các liên kết trên website để lập chỉ mục các trang
- Các crawler thường tự nhận diện bằng user-agent riêng
- Google có nhiều crawler, nhưng phổ biến nhất là Googlebot Desktop và Googlebot Smartphone
- Tổng quan quy trình làm việc của Googlebot:
  - Tìm URL: Google lấy danh sách URL từ nhiều nguồn như Google Search Console, các liên kết giữa các website, hoặc XML sitemap
  - Đưa vào hàng đợi crawl: các URL được đưa vào Crawl Queue để Googlebot xử lý, sau đó trang sẽ chuyển sang Render Queue
  - Gửi yêu cầu HTTP: Crawler gửi request HTTP để lấy header và xử lý theo mã trạng thái
    - 200: Crawl và phân tích HTML
    - 30X: Theo dõi và xử lý chuyển hướng (redirect)
    - 40X: Ghi nhận lỗi và không tải HTML
    - 50X: Có thể quay lại sau để kiểm tra xem lỗi còn không
  - Hàng đợi render: các thành phần trong hệ thống xử lý HTML và phân tích nội dung.
    - Nếu trang dùng JS để render ở client thì URL sẽ được đưa vào Render Queue
    - Ở đây, Google chạy JavaScript để thấy nội dung thật sự người dùng nhìn thấy
    - Việc này tốn tài nguyên, nên có thể chậm và không phải trang nào cũng được render ngay
    - Vì vậy, đây là nơi mà NextJS có thể hỗ trợ chiến lược render
  - Sẵn sàng để indexed: Nếu đáp ứng đủ tiêu chí, trang sẽ đủ điều kiện để được index và hiển thị trong kết quả tìm kiếm
- Tóm lại, Crawling là Google sẽ truy cập vào URL, tải HTML, và render nội dung (nếu cần), Indexing là Google sẽ phân tích nội dung đã crawl và quyết định nó có lưu trang đó vào mục tìm kiếm hay không

### Tìm hiểu về HTTP Status Code và robots.txt File

- HTTP response status code cho biết một yêu cầu HTTP cụ thể có được xử lý thành công hay không.
- Có rất nhiều status code, nhưng chỉ một số ít thực sự quan trọng trong bối cảnh SEO
- HTTP 200 OK cho biết yêu cầu đã được xử lý thành công. Để một trang được index trên Google, trang đó bắt buộc phải trả về status code 200
- HTTP 301 Moved Permanently cho biết tài nguyên được yêu cầu đã được chuyển vĩnh viễn sang một URL khác
- Next.js mặc định sử dụng 308 thay vì 301 vì đây là phiên bản mới hơn và được xem là tốt hơn
- Sự khác biệt chính giữa 301 và 308 là 301 cho phép thay đổi phương thức request từ POST sang GET, còn 308 thì không
- HTTP 302 Found cho biết tài nguyên chỉ được chuyển tạm thời sang URL khác
- Trong đa số trường hợp SEO, redirect 302 nên được thay bằng 301
- HTTP 404 Not Found cho biết server không tìm thấy tài nguyên được yêu cầu
- Nếu một trang đã bị di chuyển, ta nên dùng redirect 301 thay vì để 404.
- 404 không phải lúc nào cũng xấu, nếu người dùng truy cập URL không tồn tại thì đó là kết quả đúng
- Nhưng 404 không nên xuất hiện thường xuyên vì nó có thể ảnh hưởng tiêu cực đến SEO
- HTTP 410 Gone cho biết tài nguyên đã bị xóa vĩnh viễn và sẽ không bao giờ quay lại
- Status code này ít được dùng, nhưng rất hữu ích khi cần chủ động xóa nội dung
- 410 nên dùng khi:
  - E-commerce: sản phẩm bị ngừng bán vĩnh viễn
  - Forum: Bài viết bị xoá bởi người dùng
  - Blog: Bài viết bị xoá khỏi trang
- HTTP 500 Internal Server Error cho biết server gặp lỗi không xác định và không thể xử lý request
- Next.js sẽ tự động trả về 500 nếu xảy ra lỗi ứng dụng không mong muốn
- HTTP 503 Service Unavailable cho biết server tạm thời không sẵn sàng xử lý request
- robots.txt cho các crawler của công cụ tìm kiếm biết trang hoặc tệp nào được phép hoặc không được phép truy cập từ website
- robots.txt là một chuẩn web mà hầu hết các good bot sẽ dùng trước khi bắt đầu thu thập dữ liệu trong một domain

### Tìm hiểu về XML Sitemaps, Special Meta Tags và Canonial Tags

- Sitemap là cách đơn giản và hiệu quả nhất để giao tiếp với Google
- Sitemap cho biết URL nào thuộc về website và khi nào chúng được cập nhật, nhờ vậy Google có thể dễ dàng phát hiện nội dung mới và crawl web hiệu quả hơn
- Sitemap là một file cung cấp thông tin về các trang, video, hình ảnh và các tài nguyên khác trên website, cũng như mối quan hệ giữa chúng
- Các công cụ tìm kiếm như Google sẽ đọc file này để crawl website thông minh hơn
- Nên sử dụng Sitemap nếu:
  - Website rất lớn
  - Website có một nhiều trang có nội dung bị cô lập hoặc không được liên kết tốt với nhau
  - Website mới và có ít liên kết bên ngoài tới
  - Website có nhiều nội dung rich media như video, hình ảnh, hoặc được xuất hiện ở Google News
- Meta robots tags là các directives mà công cụ tìm kiếm luôn tuân theo
- Việc sử dụng đúng các thẻ robots này giúp quá trình index website dễ dàng và chính xác hơn.
- Canonical tags là các khuyến nghị mà Google có thể quyết định tuân theo hoặc không
- Meta robots tags hoặc robot.txt là các directives và luôn được tuân theo
- noindex sẽ không hiển thị trong kết quả tìm kiếm, nếu bỏ qua noindex thì trang sẽ không thể được indexed và hiển thị ở tìm kiếm
- nofollow sẽ không theo dõi các đường dẫn trên trang này, nếu bỏ qua thì sẽ cho phép các robot crawl và theo dõi đường dẫn trên trang
- Google tags:
  - nositelinkssearchbox: tag này sẽ bảo Google không hiển thị sitelinks search box
  - notranslate: tag này sẽ bảo Google rằng bạn không muốn Google cung cấp bản dịch cho trang này
- Canonical URL là URL mà công cụ tìm kiếm nghĩ là đại diện tiêu biểu nhất trong số các trang trùng lặp trên website
- Nếu Google thấy 2 URL có cùng nội dung thì Google sẽ quyết định giảm thứ hạng trên kết quả tìm kiếm
- Điều này cũng xảy ra trên các domain, vì vậy Canonical Tags rất hữu dụng trong trường hợp này
- Canonical Tags cho Google biết URL nào là original source of truth và cái nào là trùng lặp

### Tìm hiểu về Rendering Strategies, AMP và URL Constructure

- Static Site Generation (SSG) là phương pháp trong đó HTML được tạo ra tại thời điểm build. HTML này sẽ được sử dụng cho mọi request sau đó
- SSG thường được xem là chiến lược render tốt nhất cho SEO vì toàn bộ HTML đã có sẵn ngay khi tải trang
- Giống như SSG, Server-Side Rendering (SSR) cũng là pre-rendered nên rất tốt cho SEO
- Thay vì được tạo lúc build như SSG, SSR được tạo vào lúc request, điều này rất tốt nếu page có dữ liệu thay đổi thường xuyên
- Incremental Static Regeneration (ISR) cho phép nhà phát triển và biên tập nội dung dùng static generation trên mỗi trang mà không cần phải rebuild lại cả trang
- Client Side Rendering (CSR) cho phép nhà phát triển tạo website hoàn toàn được hiển thị ở trình duyệt với JS
- CSR không được khuyến nghị cho tối ưu SEO
- AMP (Accelerated Mobile Pages) là một công nghệ cho phép nhà phát triển tạo trang web tải nhanh hơn trên thiết bị di động nhưng chi phí xây dựng và bảo trì cao theo thời gian
- Đối với các dự án mới, nên tập trung tối ưu Core Web Vitals trực tiếp bằng các tính năng hiệu năng sẵn có của Next.js thay vì triển khai AMP
- URL Structure là một phần quan trọng trong chiến lược SEO
- Nguyên tắc tạo URL:

  - Có ý nghĩa: URL nên dùng từ ngữ có nghĩa, thay vì ID hoặc số ngẫu nhiên
  - Các pattern có tính logic và nhất quán: URL cần tuân theo một pattern nhất quán giữa các trang
  - Tập trung từ khoá: Google vẫn dựa khá nhiều vào từ khóa xuất hiện trên website để hiểu nội dung, vậy nên phải dùng từ khoá vào URL để dễ dàng hiều mục đích của trang
  - Không dựa vào tham số: Không nên tạo URL với tham số, công cụ tìm kiếm sẽ nhầm lẫn và giảm xếp hạng

  ### Tìm hiểu về Web Performance và Core Web

- Web Vitals là một sáng kiến do Google tạo ra nhằm cung cấp hướng dẫn và số liệu thống nhất nhằm đo trải nghiệm của người dùng trên web

- Core Web Vitals là một tập hợp con của Web Vitals và hiện bao gồm 3 chỉ số chính để đo lường tốc độ tải, khả năng tương tác và độ ổn định của giao diện là Largest Contentful Paint (LCP), First Input Delay (FID), và Cumulative Layout Shift (CLS)
- Largest Contentful Paint (LCP) là tốc độ hiển thị nội dung chính dùng để đo thời gian hiển thị của phần nội dung lớn nhất trên màn hình
- First Input Delay (FID) là độ phản hồi khi người dùng tương tác dùng để đo thời gian từ khi người dùng tương tác đến khi trang web bắt đầu xử lý sự kiện
- Cumulative Layout Shift (CLS) là độ ổn định giao diện dùng để đo mức độ layout bị vỡ hoặc nhảy ngoài ý muốn
- Đạt điểm tốt ở cả ba chỉ số này sẽ mang lại trải nghiệm mượt mà hơn cho người dùng
- Các website có điểm Core Web Vitals kém sẽ bị ảnh hưởng đến thứ hạng tìm kiếm, do Google đã sử dụng Core Web Vitals như một yếu tố xếp hạng trong thuật toán tìm kiếm

### Tìm hiểu về Web Vitals Overview

- Có 3 giá trị khi đo lường Core Web Vitals là Good, Need Improvement và Poor
- Có thể tiếp cận với Core Web Vitals với 2 cách:
  - Cố gắng để đạt được điểm số cao nhất có thể trong mỗi chỉ số, cách này rất tốt về mặt kỹ thuật nhưng khó đạt tuyệt đối với các website lớn
  - Benchmark so với đối thủ trong ngành, thay vì cạnh tranh với các website được tối ứu hoá hoàn hảo trong tìm kiếm của Google mà chỉ cần cạnh tranh với các trang web đang xếp hạng cùng keyword mục tiêu
### Deploy 
https://nextjs-tutorial-senlyzer-delta.vercel.app/
