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