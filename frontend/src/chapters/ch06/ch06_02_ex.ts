import { Lesson } from '../../courses';

export const ch06_02_ex: Lesson = {
    id: 'ch06-02-ex',
    title: 'Bài tập 6.2: Pattern Matching với match',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành sử dụng match expression để xử lý các variant của Enum!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa enum <code>Message</code> với các variants:
    <ul>
      <li><code>Quit</code> - không có dữ liệu</li>
      <li><code>Move { x: i32, y: i32 }</code> - có dữ liệu struct</li>
      <li><code>Write(String)</code> - có dữ liệu String</li>
      <li><code>ChangeColor(i32, i32, i32)</code> - có dữ liệu tuple</li>
    </ul>
  </li>
  <li>Tạo hàm <code>process_message(msg: &Message)</code> sử dụng match để xử lý từng variant</li>
  <li>Trích xuất dữ liệu từ các variant và in ra màn hình</li>
</ol>
<h3 class="task-heading">Gợi ý</h3>
<ul>
  <li>Dùng <code>match</code> để xử lý từng variant</li>
  <li>Với mỗi variant, trích xuất dữ liệu và in ra</li>
</ul>
`,
    defaultCode: `// Định nghĩa enum Message

// Tạo hàm process_message

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Message::Write(String::from("Hello"))',
            expectedOutput: 'tin nhắn: Hello',
            description: 'Xử lý message Write'
        },
        {
            input: 'Message::Move { x: 10, y: 20 }',
            expectedOutput: 'di chuyển đến: x=10, y=20',
            description: 'Xử lý message Move với dữ liệu'
        }
    ]
};
