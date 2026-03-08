import { Lesson } from '../../courses';

export const ch03_03_ex: Lesson = {
  id: 'ch03-03-ex',
  title: 'Bài tập 3.3: Hàm (Functions)',
  duration: '15 phút',
  type: 'practice',
  isExercise: true,

  // Competitive Programming Format
  problemTitle: 'Tính thể tích hình hộp',
  timeLimit: '1s',
  memoryLimit: '256MB',
  problemDescription: 'Viết hàm calculate_volume nhận 3 tham số length, width, height (i32) và trả về thể tích hình hộp.',
  inputFormat: 'Không có input (gọi hàm với tham số 2, 3, 4)',
  outputFormat: 'In ra thể tích',
  constraints: [
      { field: 'Tham số', condition: '3 số nguyên i32: length, width, height' },
      { field: 'Kết quả', condition: 'Tích của 3 số (i32)' }
  ],
  examples: [
      {
          input: '2 3 4',
          output: '24'
      }
  ],

  content: `
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Ở phần thân hàm tính toán, bạn nhớ không dùng dấu chấm phẩy (;) ở cuối biểu thức để implicit return (hoặc dùng từ khóa return).
</div>
`,
  defaultCode: `fn main() {
    let vol = calculate_volume(2, 3, 4);
    println!("{}", vol);
}

fn calculate_volume(length: i32, width: i32, height: i32) -> i32 {
    length * width * height
}
`
};
