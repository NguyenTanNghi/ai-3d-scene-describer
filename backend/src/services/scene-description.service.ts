import { requestOpenRouterCompletion } from '../clients/openrouter.client.js';
import type { SceneDescriptionRequest, SceneDescriptionResult } from '../types/scene.js';
import { parseSceneDescriptionResult } from './result-parser.js';

const buildPrompt = (payload: SceneDescriptionRequest): string => `
Hãy tạo nội dung marketing chuyên nghiệp bằng tiếng Việt cho một dự án số hóa không gian 3D.

Thông tin đầu vào:
- Tên dự án: ${payload.projectName}
- Loại không gian: ${payload.spaceType}
- Mô tả ngắn: ${payload.description}
- Nhóm khách hàng mục tiêu: ${payload.targetCustomer}

Yêu cầu:
- Toàn bộ nội dung trong các giá trị JSON phải viết bằng tiếng Việt tự nhiên, chuyên nghiệp.
- Không dịch tên key JSON.
- Chỉ trả về JSON hợp lệ, không thêm markdown hay giải thích.

Trả về đúng cấu trúc JSON sau:
{
  "title": "Tiêu đề dự án chuyên nghiệp bằng tiếng Việt",
  "marketingDescription": "Mô tả marketing hấp dẫn khoảng 80-120 từ bằng tiếng Việt",
  "keyHighlights": ["3 đến 5 điểm nổi bật ngắn gọn bằng tiếng Việt"],
  "scanningRecommendations": ["3 lưu ý thực tế khi scan 3D bằng tiếng Việt"]
}
`;

export const generateSceneDescription = async (
  payload: SceneDescriptionRequest,
): Promise<SceneDescriptionResult> => {
  const aiContent = await requestOpenRouterCompletion([
    {
      role: 'system',
      content:
        'Bạn là copywriter marketing senior trong lĩnh vực scan 3D, virtual tour, digital twin và số hóa không gian. Luôn trả lời bằng tiếng Việt tự nhiên, rõ ràng, thực tế và phù hợp ngữ cảnh kinh doanh tại Việt Nam.',
    },
    {
      role: 'user',
      content: buildPrompt(payload),
    },
  ]);

  return parseSceneDescriptionResult(aiContent);
};
