## Week 1 - Day 3:

### Tìm hiểu về CSS Styling

- Global CSS
  - Ta có thể áp dụng style cho toàn cục khi import CSS file trong app/layout.tsx
- CSS Module
  - Khi muốn style chỉ ảnh hưởng đến 1 component cụ thể, ta dùng .module.css
  - Mỗi file sẽ tự động có phạm vị riêng, tránh việc các class bị đè style
- Tailwind CSS
  - Là một framework CSS giúp coding nhanh gọn, style nhất quán
  - Tailwind CSS kết hợp rất tốt với kiến trúc component của React

### Tìm hiểu về Optimizing Fonts and Images

- Image Optimization
  - Giúp tối ưu kích thước ảnh theo thiết bị, hỗ trợ format hiện đại như WebP
  - Giữ giao diện ổn định, tránh layout shift bằng cách biết trước tỉ lệ ảnh
  - Tăng tốc độ load trang với lazy-loading và blur placeholder
  - Có thể resize ảnh theo yêu cầu mặc dù ảnh nằm trên remote servers
- Font Optimization
  - Module next/font sẽ tự động tối ưu hoá font và loại bỏ các yêu cầu mạng bên ngoài để cải thiện quyền riêng tư và hiệu suất
  - Giúp giảm layout shift, và có thể dùng nhiều font khác nhau trong 1 app

### Tìm hiểu về Fetching Data

- Fetching trong Server Components
  - Nguồn data hợp lệ: mọi I/O async (fetch API, ORM/DB client, đọc file hệ thống).
  - Fetch API: component async, await fetch().
    - Mặc định: pre-render + cache HTML output.
    - Muốn dynamic: dùng { cache: 'no-store' }.
  - ORM/Database: gọi DB trực tiếp trong Server Component, không cần API trung gian.
    - Có thể kết hợp cache() để tránh query trùng lặp.
- Fetching trong Client Components
  - Streaming với React use() hook:
    - Server khởi tạo Promise, truyền xuống Client.
    - Client dùng use(promise) + <Suspense> để hiển thị fallback trong lúc chờ.
- Deduplicate & Cache
  - Request memoization: nhiều fetch cùng URL trong 1 render pass → gộp thành 1 request.
  - Data Cache: chia sẻ data giữa render hiện tại và các request tương lai.
  - cache() cho ORM/DB: tránh query trùng lặp trong cùng request.
- Streaming
  - Để cải thiện tốc độ load và trải nghiệm ngươi dùng, ta có thể dùng streaming để chia nhỏ trang thành các khối nhỏ và gửi dần các khối từ server về client
  - Có 2 cách dùng streaming:
    - Bọc trang với 1 file loading.tsx
    - Bọc 1 component với <Suspense>
- Sequential data fetching: diễn ra khi có 1 request phụ thuộc vào dữ liệu của 1 request khác
- Parallel data fetching: diễn ra khi khởi tạo nhiều request cùng 1 lúc, dùng Promise.all
- Preloading data: khởi chạy request trước khi render component, kết hợp cache() để tái sử dụng.

### Tìm hiểu về Static and Dynamic Rendering

Static Rendering

- Dữ liệu sẽ được fetch và render trên server khi build hoặc khi revalidate data và lưu cache
- Khi người dùng vào trang, cache sẽ trả kết quả ra giao diện
- Giúp trang tải nhanh, hiệu năng cao
- Giảm tải server, vì nội dung đã được cache nên server kh cần render lại mỗi khi có request
- Giúp tăng SEO
- Không phù hợp với các trang quản lý cần cập nhật thường xuyên
  Dynamic Rendering
- Nội dung sẽ được render lại trên server với mỗi request
- Cho phép ứng dụng hiển thị dữ liệu cập nhật thường xuyên hoặc theo thời gian thực
- Phù hợp với các nội dung cá nhân như trang người dùng hoặc quản lý có thể cập nhật dữ liệu dựa trên tương tác người dùng
- Cho phép truy cập thông tin chỉ có thể được biết tại thời điểm yêu cầu, chẳng hạn như cookie hoặc tham số tìm kiếm URL
- Với dynamic rendering, ứng dụng chỉ có thể nhanh bằng dữ liệu được trả chậm nhất

### Deploy

https://nextjs-tutorial-senlyzer-fihb.vercel.app/
