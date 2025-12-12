## Week 1 - Day 4

### Tìm hiểu về Streaming

- Khi lấy dữ liệu từ server về với từng request, đôi khi sẽ có một vài request chậm và điều đó gây cho ứng dụng có thể bị render chậm đến khi dữ liệu được lấy xong
- Để cải thiện tốc độ tải trang và trải nghiệm người dùng thì ta có thể stream trang web thành từng phần nhỏ và đưa chúng từ server vào client từ từ
- Có 2 cách áp dụng stream vào ứng dụng:
  - Gói 1 trang với 1 file loading.tsx
  - Gói 1 component với <Suspense>
- Ta có thể stream cả trang với loading.tsx nhưng điều này có thể mất thời gian hiển thị giao diện khi có 1 component render chậm (dữ liệu lớn)
- Ta có thể stream từng component riêng lẻ nhưng từng component sẽ render riêng khi mỗi khi nó lấy dữ liệu xong, điều này có thể gây khó chịu cho người dùng khi từng phần nhỏ trong ứng dụng nhảy hiển thị không đồng đều
- Để giải quyết điều đó ta có thể tạo hiệu ứng straggered với stream từng sections của trang, nhưng ta phải tạo thêm các wrapper để bọc các cụm component

### Adding Search and Pagination

- Lý do sử dụng URL search params
  - Người dùng có thể lưu trang với URL có đầy đủ trạng thái
  - Server có thể đọc trực tiếp các tham số từ URL để render nội dung chính xác
  - Thông qua URL có thể dễ dàng theo dõi hành vi người dùng mà không cần các logic ở phía client
- Search Functionality
  - useSearchParams cho phép truy cập các tham số của URL hiện tại
  - usePathname cho phép đọc đường dẫn của URL hiện tại
  - useRouter cho phép chuyển hướng giữa các route trong client components
- URLSearchParams là 1 Web API cung cấp các phương thức tiện ích cho việc thao tác với các tham số truy vấn URL mà không cần viết các chuỗi ký tự phức tạp
- Để chắc chắn các trường input đang đồng bộ với URL và sẽ được phổ biến khi chia sẻ, ta có thể dùng "defaultValue" để khởi tạo giá trị input được đọc từ searchParams
- Sử dụng "value" khi dùng state để quản lý các giá trị của input (React sẽ quản lý các state của input)
- Ngược lại, sử dụng "defaultValue" khi không dùng state, các input sẽ tự quản lý state riêng của nó, điều này ổn nếu ta lưu search query vào URL thay vì state
- Debouncing giới hạn tỉ lệ mà function hoạt động. Trong trường hợp với <Search/>, ta chỉ muốn truy vấn DB khi người dùng dừng nhập.
- Với debouncin, ta có thể giảm số lượng request gửi đến DB, từ đó tiết kiệm bộ nhớ
- Adding Pagination giúp gới hạn số lượng bản ghi được tải trong mỗi request, giúp giảm thời gian response server, giảm tải cho DB

### Tìm hiểu về Mutating Data

- React Server Actions cho phép chạy các hàm bất đồng bộ trực tiếp trên server, thay vì phải tạo các API endpoints riêng biệt
- Server Acions gồm các đặc trưng như encrypted closures, kiểm tra đầu vào nghiêm ngặt, mã hoá tin nhắn lỗi, hạn chế máy chủ, ... và tất cả đặc trưng đều hoạt động cùng nhau để tăng cường bảo mật cho ứng dụng
- Mutating data là quá trình thay đổi dữ liệu hiện có trong hệ thống gồm CRUD
- Mutating data không chỉ đọc dữ liệu mà còn có thể thay đổi trạng thái của DB và ảnh hưởng trực tiếp đến nghiệp vụ của ứng dụng

### Tìm hiểu về Error Handling

- Handling Errors tập trung xử lý lỗi 1 cách có kiểm soát và thân thiện với người dùng đặc biệt trong những tình huống:
  - Lỗi khi mutate dữ liệu bằng Server Actions
  - Lỗi không mong muốn (uncaught exceptions)
  - Truy cập tài nguyên không tồn tại (404)
- Handling Errors giúp ứng dụng không bị "crash", hiển thị giao diện và thông tin phù hợp với từng lỗi
- redirect() hoạt động bằng cách throw error, không nên đặt trong try/catch
- error.tsx bắt buộc là Client Component
- reset() giúp người dùng thử tải lại trang nếu lỗi, phục hồi trang sau lỗi tạm thời(network, timeout)
- error.tsx chỉ dùng cho:
  - Lỗi hệ thống
  - Lỗi không mong muốn
  - Exception runtime
- error.tsx không dùng cho:
  - Lỗi nghiệp vụ
  - Tài nguyên không tồn tại
- notFound() giúp xử lý lỗi 404 có chủ đích
- notFound() dùng khi:
  - Dữ liệu không tồn tại trong db
  - Người dùng truy cập resource không hợp lệ
- not-found.tsx giúp hiển thị UI cho lỗi 404, có thể đặt theo route segment

### Deploy
