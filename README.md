# AI 3D Scene Describer

AI 3D Scene Describer là web app hỗ trợ tạo nội dung mô tả tiếng Việt cho các dự án số hóa không gian 3D. Người dùng nhập tên dự án, loại không gian, mô tả ngắn và nhóm khách hàng mục tiêu; backend sẽ gọi OpenRouter để sinh tiêu đề, mô tả marketing, điểm nổi bật và khuyến nghị khi scan 3D.

## Công nghệ sử dụng

- Frontend: React, TypeScript, Vite, Axios
- Backend: Node.js, Express, TypeScript
- AI: OpenRouter Chat Completions API
- Architecture: Tách frontend API/components/types/constants và backend routes/controllers/services/clients/validators

## Cài đặt frontend

```bash
cd frontend
npm install
```

Tạo file môi trường nếu cần tùy chỉnh API URL:

```bash
cp .env.example .env
```

Giá trị mặc định:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Cài đặt backend

```bash
cd backend
npm install
```

Backend cần file `.env`:

```env
AI_KEY=your_openrouter_api_key_here
OPENROUTER_MODEL=openai/gpt-4o-mini
PORT=5000
```

## Cách chạy local

Chạy backend:

```bash
cd backend
npm run dev
```

Chạy frontend trong terminal khác:

```bash
cd frontend
npm run dev
```

Mở trình duyệt tại:

```text
http://localhost:5173
```

## API Endpoint

### `POST /api/generate-description`

Request body:

```json
{
  "projectName": "Căn hộ mẫu The River View",
  "spaceType": "Căn hộ",
  "description": "Không gian cao cấp với khu vực mở, ánh sáng hiện đại và nhiều chi tiết nội thất cần thể hiện rõ trong tour 3D.",
  "targetCustomer": "Khách mua bất động sản và đội ngũ môi giới"
}
```

Success response:

```json
{
  "data": {
    "title": "Tiêu đề dự án chuyên nghiệp",
    "marketingDescription": "Mô tả marketing bằng tiếng Việt...",
    "keyHighlights": ["Điểm nổi bật 1", "Điểm nổi bật 2", "Điểm nổi bật 3"],
    "scanningRecommendations": ["Lưu ý 1", "Lưu ý 2", "Lưu ý 3"]
  }
}
```

Validation error response:

```json
{
  "message": "Validation failed",
  "errors": {
    "projectName": "Tên dự án không được để trống."
  }
}
```

Server error response:

```json
{
  "message": "Failed to generate content"
}
```

## AI Tool sử dụng trong quá trình làm bài

### ChatGPT

- Dùng để phân tích yêu cầu đề bài và chia cấu trúc source code frontend/backend.
- Dùng để hỗ trợ sinh code React, TypeScript, Express, validation, API integration và tài liệu README/REPORT.
- Dùng để rà lại checklist chức năng, clean architecture cơ bản và cách mô tả phần hạn chế UX/UI.

### GitHub Copilot

- Dùng để hỗ trợ autocomplete các đoạn code lặp lại như interface/type, component props, hàm validation và cấu trúc response.
- Dùng để tăng tốc khi viết boilerplate TypeScript nhưng vẫn kiểm tra lại bằng build và đọc code thủ công.

## Prompt mẫu đã dùng

Prompt 1:

```text
Hãy xây dựng một web app tên AI 3D Scene Describer bằng React, TypeScript, Vite, Axios ở frontend và Node.js, Express, TypeScript ở backend. App có form nhập tên dự án, loại không gian, mô tả ngắn, khách hàng mục tiêu; gọi OpenRouter để sinh tiêu đề, mô tả marketing, 3-5 điểm nổi bật và 3 khuyến nghị scan 3D.
```

Prompt 2:

```text
Hãy tạo prompt backend để AI luôn trả về JSON hợp lệ bằng tiếng Việt, gồm các key: title, marketingDescription, keyHighlights, scanningRecommendations. Nội dung cần chuyên nghiệp, phù hợp dự án số hóa không gian 3D và khách hàng mục tiêu.
```

## Cách kiểm tra lại output của AI

- Kiểm tra response backend có đúng JSON shape: `title`, `marketingDescription`, `keyHighlights`, `scanningRecommendations`.
- Kiểm tra `keyHighlights` có từ 3 đến 5 ý và `scanningRecommendations` có đúng 3 ý.
- Kiểm tra nội dung AI trả về bằng tiếng Việt, không bị lẫn markdown hoặc text ngoài JSON.
- So sánh nội dung sinh ra với input đã nhập để đảm bảo tiêu đề, mô tả, điểm nổi bật và khuyến nghị phù hợp với loại không gian.
- Chạy thử nhiều bộ input khác nhau như căn hộ, văn phòng, showroom, nhà hàng để quan sát độ ổn định.

## Deliverables

- Source code hoàn chỉnh cho frontend và backend.
- `README.md` hướng dẫn cài đặt, cấu hình môi trường, chạy local, build production và API endpoint.
- `REPORT.md` ngắn gồm mô tả chức năng đã làm, cách dùng AI/LLM, khó khăn gặp phải, 3 điểm UX/UI chưa tối ưu và hướng cải thiện.
- Video demo ngắn 3-5 phút hoặc ảnh chụp màn hình minh họa luồng nhập form, loading, gọi AI và hiển thị kết quả.

## Tóm tắt nội dung REPORT

### Mô tả chức năng đã làm

- Form nhập thông tin dự án bằng tiếng Việt.
- Validation cho từng field bắt buộc.
- Loading state khi gọi API.
- Error handling khi backend hoặc AI lỗi.
- Hiển thị kết quả AI theo từng card rõ ràng.
- Backend gọi OpenRouter và chuẩn hóa output trước khi trả về frontend.

### Cách dùng AI/LLM

- LLM được dùng ở runtime thông qua OpenRouter API.
- Backend gửi prompt gồm thông tin dự án, loại không gian, mô tả ngắn và khách hàng mục tiêu.
- AI trả về JSON hợp lệ để frontend render thành nội dung mô tả dự án.

### Khó khăn gặp phải

- Cần thiết kế prompt để AI trả JSON ổn định.
- Cần xử lý trường hợp AI bọc JSON trong markdown code fence.
- Cần giữ API key ở backend để tránh lộ key ra frontend.

### 3 lỗi/điểm chưa hợp lý đã quan sát

1. Luồng thao tác chưa có lịch sử kết quả.
   Mức độ ảnh hưởng: Trung bình, vì người dùng khó so sánh nhiều phiên bản nội dung AI.
   Đề xuất cải thiện: Thêm history panel lưu các lần generate gần nhất bằng localStorage hoặc database.

2. UX thao tác với nội dung đầu ra chưa tiện.
   Mức độ ảnh hưởng: Trung bình, vì người dùng phải copy thủ công từng phần để đưa vào proposal, CMS hoặc email.
   Đề xuất cải thiện: Thêm nút copy cho từng card và export toàn bộ kết quả sang Markdown/PDF.

3. Nội dung AI chưa có tùy chỉnh giọng văn.
   Mức độ ảnh hưởng: Thấp đến trung bình, vì mỗi loại dự án có thể cần tone chuyên nghiệp, cao cấp, kỹ thuật hoặc thân thiện.
   Đề xuất cải thiện: Thêm select `Giọng văn` và truyền lựa chọn này vào prompt backend.

### Hướng cải thiện nếu có thêm thời gian

- Thêm lịch sử generate và lưu localStorage/database.
- Thêm copy/export Markdown/PDF.
- Thêm tùy chọn tone of voice, độ dài nội dung và ngôn ngữ output.
- Thêm test cho validator, parser AI response và API endpoint.
