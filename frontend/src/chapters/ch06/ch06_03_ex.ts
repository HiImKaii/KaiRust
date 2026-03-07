import { Lesson } from '../../courses';

export const ch06_03_ex: Lesson = {
    id: 'ch06-03-ex',
    title: 'Bài tập 6.3: Cú pháp if let',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng cú pháp if let để xử lý các trường hợp đơn giản!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tạo hàm <code>extract_and_double(opt: Option&lt;i32&gt;) -> Option&lt;i32&gt;</code>
    <ul>
      <li>Nếu có giá trị, nhân đôi và trả về</li>
      <li>Nếu None, trả về None</li>
    </ul>
  </li>
  <li>Tạo hàm <code>describe_age(age: Option&lt;u8&gt;)</code> sử dụng if let để in thông báo phù hợp</li>
</ol>
<h3 class="task-heading">Gợi ý</h3>
<ul>
  <li>Dùng <code>if let Some(value) = opt</code> để kiểm tra</li>
  <li>Có thể dùng <code>else</code> để xử lý trường hợp None</li>
</ul>
`,
    defaultCode: `// Hàm extract_and_double nhận Option<i32>, nhân đôi nếu có giá trị

// Hàm describe_age nhận Option<u8>, in thông báo phù hợp

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'extract_and_double(Some(5))',
            expectedOutput: 'Some(10)',
            description: 'Nhân đôi giá trị trong Some'
        },
        {
            input: 'extract_and_double(None)',
            expectedOutput: 'None',
            description: 'Trả về None khi input là None'
        }
    ]
};
