import { Lesson } from '../../courses';

export const ch03_05_ex: Lesson = {
  id: 'ch03-05-ex',
  title: 'Bài tập 3.5: Luồng điều khiển (Control Flow)',
  duration: '15 phút',
  type: 'practice',
  isExercise: true,

  // Competitive Programming Format
  problemTitle: 'Kiểm tra số chẵn',
  timeLimit: '1s',
  memoryLimit: '256MB',
  problemDescription: 'Viết hàm is_even nhận số nguyên n và trả về true nếu n là số chẵn, false nếu là số lẻ.',
  inputFormat: 'Gọi hàm với n = 4 và n = 7',
  outputFormat: 'In kết quả kiểm tra',
  constraints: [
      { field: 'n', condition: 'i32 (số nguyên)' }
  ],
  examples: [
      {
          input: '4',
          output: 'true'
      },
      {
          input: '7',
          output: 'false'
      }
  ],

  content: `
<div class="cyber-alert info">
  <strong>Toán tử Modulo:</strong> Sử dụng <code>n % 2 == 0</code> để kiểm tra số chẵn nhé.
</div>
`,
  defaultCode: `fn main() {
    println!("{}", is_even(4));
    println!("{}", is_even(7));
}

fn is_even(n: i32) -> bool {
    n % 2 == 0
}
`
};
