import type { SceneFormValues } from '../types/scene'

export const SPACE_TYPE_OPTIONS = [
  'Căn hộ',
  'Văn phòng',
  'Cửa hàng bán lẻ',
  'Showroom',
  'Triển lãm',
  'Khách sạn',
  'Nhà hàng',
  'Khác',
] as const

export const INITIAL_FORM_VALUES: SceneFormValues = {
  projectName: '',
  spaceType: '',
  description: '',
  targetCustomer: '',
}

export const FIELD_LABELS: Record<keyof SceneFormValues, string> = {
  projectName: 'Tên dự án',
  spaceType: 'Loại không gian',
  description: 'Mô tả ngắn',
  targetCustomer: 'Khách hàng mục tiêu',
}
