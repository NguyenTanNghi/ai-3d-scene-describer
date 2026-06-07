# REPORT

## 1. Chức năng đã làm

- Xây dựng frontend React + TypeScript bằng Vite.
- Tạo form tiếng Việt gồm Tên dự án, Loại không gian, Mô tả ngắn, Khách hàng mục tiêu.
- Space Type dùng select với các lựa chọn tiếng Việt: Căn hộ, Văn phòng, Cửa hàng bán lẻ, Showroom, Triển lãm, Khách sạn, Nhà hàng, Khác.
- Validation bắt buộc cho từng field và hiển thị lỗi ngay bên dưới field.
- Loading state khi gọi API: disable button, spinner, text `Đang tạo nội dung AI...`.
- Error handling khi backend lỗi: hiển thị `Không thể tạo nội dung. Vui lòng thử lại.`
- Hiển thị kết quả AI bằng tiếng Việt theo card riêng: Tiêu đề dự án, Mô tả marketing, Điểm nổi bật, Lưu ý khi scan 3D.
- Xây dựng backend Node.js + Express + TypeScript.
- Gọi OpenRouter API từ backend, không gọi trực tiếp từ frontend.
- Tách code theo clean architecture cơ bản: routes, controllers, services, clients, validators, types.

## 2. AI Tool sử dụng

- ChatGPT: hỗ trợ phân tích yêu cầu, đề xuất cấu trúc project, sinh code và viết tài liệu.
- GitHub Copilot: hỗ trợ gợi ý code/autocomplete trong quá trình phát triển.

## 3. Prompt mẫu

```text
Hãy tạo nội dung marketing chuyên nghiệp bằng tiếng Việt cho một dự án số hóa không gian 3D.

Thông tin đầu vào:
- Tên dự án: Căn hộ mẫu The River View
- Loại không gian: Căn hộ
- Mô tả ngắn: Không gian cao cấp với khu vực mở, ánh sáng hiện đại và nhiều chi tiết nội thất cần thể hiện rõ trong tour 3D.
- Nhóm khách hàng mục tiêu: Khách mua bất động sản và đội ngũ môi giới

Chỉ trả về JSON hợp lệ bằng tiếng Việt với:
- title
- marketingDescription
- keyHighlights: 3 to 5 items
- scanningRecommendations: 3 items
```

## 4. Cách kiểm tra output AI

- Kiểm tra response có đúng JSON shape gồm `title`, `marketingDescription`, `keyHighlights`, `scanningRecommendations`.
- Đảm bảo `keyHighlights` có từ 3 đến 5 item.
- Đảm bảo `scanningRecommendations` có 3 item.
- Đọc nội dung để xác nhận AI trả lời bằng tiếng Việt và phù hợp với Tên dự án, Loại không gian, Mô tả ngắn và Khách hàng mục tiêu đã nhập.
- Thử nhiều loại không gian khác nhau để kiểm tra AI có thay đổi văn phong và nội dung theo input.

## 5. Khó khăn gặp phải

- Cần thiết kế prompt để AI trả về JSON ổn định thay vì văn bản tự do.
- Cần xử lý trường hợp AI trả JSON trong markdown code fence.
- Cần tách logic validation ở frontend và backend để vừa thân thiện với người dùng, vừa đảm bảo API an toàn.
- Cần giữ OpenRouter API key chỉ ở backend, tránh lộ key ra frontend.

## 6. Ba điểm UX/UI chưa tối ưu

### Điểm 1: Chưa có chức năng lưu lịch sử kết quả

- Mô tả vấn đề: Mỗi lần generate thành công, kết quả cũ bị thay thế bởi kết quả mới.
- Mức độ ảnh hưởng: Trung bình, vì người dùng khó so sánh nhiều phiên bản nội dung.
- Hướng cải thiện: Thêm history panel lưu 5-10 kết quả gần nhất trong localStorage hoặc database.

### Điểm 2: Chưa có nút copy/export nội dung

- Mô tả vấn đề: Người dùng phải copy thủ công từng phần kết quả.
- Mức độ ảnh hưởng: Trung bình, ảnh hưởng đến tốc độ làm việc khi cần đưa nội dung vào proposal hoặc CMS.
- Hướng cải thiện: Thêm nút copy cho từng card và export Markdown/PDF.

### Điểm 3: Chưa có tùy chỉnh tone of voice

- Mô tả vấn đề: AI hiện tạo nội dung theo tone marketing chuyên nghiệp mặc định.
- Mức độ ảnh hưởng: Thấp đến trung bình, vì một số dự án cần tone sang trọng, ngắn gọn, kỹ thuật hoặc thân thiện hơn.
- Hướng cải thiện: Thêm select Tone of Voice và truyền vào prompt backend.

## 7. Hướng mở rộng tương lai

- Thêm đăng nhập và lưu dự án theo user.
- Thêm database để lưu input/output AI.
- Thêm chức năng regenerate từng phần: title, description, highlights, recommendations.
- Hỗ trợ đa ngôn ngữ, đặc biệt tiếng Việt và tiếng Anh.
- Thêm upload ảnh mặt bằng/không gian để AI tạo mô tả theo visual context.
- Thêm export sang Markdown, PDF hoặc Google Docs.
