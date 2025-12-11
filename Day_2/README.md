## Week 1 - Day 2:

### Tìm hiểu về Server, Client Components

- Trong App Router, page và layout mặc định là Server Component
- Dùng Client Component khi:
  - State + event handlers: useState, onClick, onChange
  - Lifecycle/hook phía client: useEffect, useLayoutEffect
  - Browser APIs
  - Custom hooks
- Dùng Server Component khi:
  - Fetch data gần nguồn (DB, internal API) và tối ưu hiệu năng
  - Dùng secrets (API key, token) an toàn (không lộ ra browser)
  - Giảm JS gửi xuống client
  - Streaming nội dung dần dần
- Nếu muốn 1 file trở thành Client Component ở đầu file, trên các import thêm 'use client'

### Tìm hiểu về Dynamic Routes

- Giúp tạo route động bằng cách đặt tên thư mục trong dấu ngoặc vuông (/app/blog/[slug]/page.tsx)
- Trong Client Components, có thể truy cập segment động bằng hook "use" hoặc useParams
- Catch-all Segments
  - Với [slug] (dynamic segment)
    - app/blog/[slug]/page.tsx nếu url "/blog/senlyzer"
    - thì slug sẽ là string "senlyzer"
  - Với [..slug] (catch-all segment)
    - app/shop/[...slug]/page.tsx
    - Nếu url "/shop/clothes" thì slug sẽ là 1 mảng string { slug: ["clothes"] }
    - Nếu url "/shop/clothes/tshirts" thì slug sẽ là 1 mảng string { slug: ["clothes"], ["tshirts"] }
- Optional Catch-all Segments
  - [...slug] bắt buộc phải có ít nhất 1 segment nếu url "/shop" không khớp app/shop/[...slug]/page.tsx thì sẽ 404
  - Còn đối với Optional Catch-all Segments sẽ phải thêm 1 cặp ngoặc vuông [[...slug]]
    - app/shop/[[...slug]]/page.tsx
    - Nếu url "/customers" thì trang vẫn load nhưng slug có thể là { slug: ["undefined"] } hoặc { slug: [""] }
    - Nếu url "/customers/a/b/c" thì trang sẽ hiển thị { slug: ["a","b","c"] }

### Tìm hiểu về Loading UI theo segment

- Loading UI giúp tạo Instant Loading State (trạng thái loading) thay vì chỉ hiển thị màn hình trắng chờ server render
- Nếu trong App Router có file loading.tsx thì khi người dùng chuyển trang sang route có chưa loading.tsx thì giao diện "Loading" sẽ hiển thị
- Đồng thời server sẽ render nội dung và stream về, khi hoàn thành nội trang sẽ được render
- Loading UI component sẽ không nhận bất kì params nào
- Khác nhau giữa Loading UI và Suspense Fallback:
  - Loading UI sẽ tự wrap của route segment, nó sẽ loading toàn trang
  - Suspense fallback sẽ wrap cho 1 componet cụ thể, được dùng khi trong 1 trang có nhiều phần load độc lập

### Tìm hiểu về Error handling

- Error UI giúp bắt các lỗi runtimes không mong muốn và hiển thị giao diện dự phòng
- Error UI thường bắt:
  - Lỗi throw trong quá trình render / lifecycle phía client.
  - Lỗi phát sinh trong quá trình render route segment (bao gồm lỗi từ Server Component)
- Error Boundary trong React hiện tại phải chạy phía client để:
  - Render fallback UI khi có lỗi,
  - Cung cấp nút “Try again” gọi reset() để re-render segment.
- Hàm error
  - Là instance Error
  - Dev: thường thấy message đầy đủ để debug
  - Prod: lỗi từ Server Components sẽ có message “chung chung” để tránh leak; bạn dùng error.digest để đối chiếu log server
- Hàm reset()
  - Là “nút thử lại”
  - Gọi reset() sẽ yêu cầu Next render lại route segment đó.
  - Hữu ích khi lỗi là tạm thời (API timeout, mạng chập chờn, cache lỗi…).
- Ta có thể bắt lỗi ở root layout hoặc một trang lỗi chung cho toàn app với global-error.tsx
- Nhưng global-error.tsx phải tự khai báo <html><body>.

### Link Demo

https://nextjs-tutorial-senlyzer-6t98.vercel.app/
