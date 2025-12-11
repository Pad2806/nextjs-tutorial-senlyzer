## Week 1 - Day 1:

### Xem lại các kiến thức tổng quan về React

- Ôn tập lại React: components, props, useState, useEffect, event handling

### Tìm hiểu NextJS, cài đặt môi trường và chạy dự án demo

- Cài đặt NextJS app, chạy demo dự án, tìm hiểu cấu trúc thư mục cơ bản
- Setup baseURL, paths

### Tìm hiểu về Routing Fundamentals

- Hiểu và tạo được nested route cơ bản
- Hiểu và tạo được nested layout cơ bản
- Hiểu và tạo được dynamic segment cơ bản

### Tìm hiểu Route Groups cơ bản

- Route Groups là quy ước đặt tên thư mục giúp tổ chức các route theo nhóm và không làm ảnh hưởng đến đường dẫn
- Route Groups cho phép định nghĩa nhiều root layout cho từng thư mục
- Route Groups cho phép các route trong cùng thư mục chia sẻ layout nhưng nếu khác thì không
- Trang sẽ reload nếu chuyển trang với các route có root layout khác nhau
- Các route trong nhóm khác nhau không được trùng URL ((marketing)/about/page.js và (shop)/about/page.js)

### Tìm hiểu về Linking, Navigating và Prefetch

- Server Rendering: Static vs Dynamic
  - Static Rendering là render lúc build hoặc lúc revalidate và cache kết quả để dùng lại
  - Dynamic Rendering là render với mỗi request
- Prefetch là tải trước route, NextJS sẽ tự động prefetch route khi hover/enter viewport
  - Với Static Route thường sẽ prefetch đầy đủ
  - Với Dynamic Route có thể bị skip hoặc chỉ prefetch 1 phần để tránh server render những trang mà người dùng có thể không
    bao giờ truy cập
- Streaming là đẩy UI từng phần, thay vì đợi server render toàn trang
  - Với Dynamic Routes thì steaming giúp render layout và loading skeletons trước còn dữ liệu sẽ render sau
- Client-side transitions là chuyển trang kh reload toàn bộ
  - Khi sử dụng <Link> thì khi chuyển trang, thay vì reload lại toàn bộ trang thì chỉ load nội dung mới
