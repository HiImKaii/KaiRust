import { Lesson } from '../../courses';

export const ch03_01_ex: Lesson = {
  id: 'ch03-01-ex',
  title: 'Bài tập 3.1: Biến (Variables)',
  duration: '10 phút',
  type: 'practice',
  isExercise: true,

  // Competitive Programming Format
  problemTitle: 'Biến và Tính bất biến',
  timeLimit: '1s',
  memoryLimit: '256MB',
  problemDescription: 'Viết chương trình tạo biến bất biến x = 5 và biến khả biến y = 10, sau đó thay đổi y thành 20.',
  inputFormat: 'Không có input',
  outputFormat: 'In ra x và y theo định dạng: x, y',
  constraints: [
    { field: 'x', condition: 'bất biến (immutable), giá trị = 5' },
    { field: 'y', condition: 'khả biến (mutable), giá trị ban đầu = 10, sau đó = 20' }
  ],
  examples: [
    {
      input: '(không có)',
      output: '5, 20'
    }
  ],

  content: `
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Sử dụng từ khóa <code>mut</code> cho biến có thể thay đổi giá trị. Sau khi hoàn thành, hãy nhấn <strong>Run</strong> để hệ thống chấm điểm!
</div>
`,
  defaultCode: `fn main() {
    // TODO: Tạo biến x = 5 (bất biến)
    // TODO: Tạo biến y = 10 (khả biến)
    // TODO: Thay đổi y = 20
    // TODO: In ra: println!("{}, {}", x, y);
}
`
};
