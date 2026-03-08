import { Lesson } from '../../courses';

export const ch03_02_ex: Lesson = {
  id: 'ch03-02-ex',
  title: 'Bài tập 3.2: Kiểu dữ liệu (Data Types)',
  duration: '10 phút',
  type: 'practice',
  isExercise: true,

  // Competitive Programming Format
  problemTitle: 'Kiểu dữ liệu - Tuple và Array',
  timeLimit: '1s',
  memoryLimit: '256MB',
  problemDescription: 'Tạo tuple và array với các giá trị cụ thể, sau đó destructure tuple.',
  inputFormat: 'Không có input',
  outputFormat: 'In ra tất cả các phần tử theo thứ tự',
  constraints: [
    { field: 'Tuple', condition: 'Chứa: i32=500, f64=6.4, char=Z' },
    { field: 'Array', condition: 'Chứa: [1, 2, 3, 4, 5]' }
  ],
  examples: [
    {
      input: '(không có)',
      output: '500 6.4 Z [1, 2, 3, 4, 5]'
    }
  ],

  content: `
<div class="cyber-alert info">
  Sau khi code xong, hãy nhấn <strong>Run</strong> để vượt qua bài kiểm tra!
</div>
`,
  defaultCode: `fn main() {
    // Tạo tuple: (i32, f64, char)
    let my_tuple = (500, 6.4, 'Z');

    // Destructure tuple
    let (x, y, z) = my_tuple;

    // Tạo array
    let my_array = [1, 2, 3, 4, 5];

    println!("{} {} {}", x, y, z);
    println!("{:?}", my_array);
}
`
};
