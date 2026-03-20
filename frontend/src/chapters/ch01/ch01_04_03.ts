import { Lesson } from '../../courses';

export const ch01_04_03: Lesson = {
    id: 'ch01-04-03',
    title: '1.4.3 Đọc toàn bộ stdin với read_to_string()',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Viết chương trình đọc toàn bộ dữ liệu từ stdin (nhiều dòng) bằng <code>read_to_string()</code>, sau đó in lại chính xác những gì đã nhập.</p>

<h3 class="task-heading">Yêu cầu</h3>
<ul class="task-list">
  <li>Dùng <code>io::stdin().read_to_string(&mut string)</code> để đọc toàn bộ stdin</li>
  <li>In ra đúng nội dung đã nhập (không cần trim hay xử lý gì thêm)</li>
</ul>

<h3 class="task-heading">Ví dụ</h3>
<div class="code-snippet">
  <span class="code-lang">input</span>
  <pre><code>Xin chao
Toi la Kai
Cam on!</code></pre>
</div>
<div class="code-snippet output">
  <span class="code-lang">output</span>
  <pre><code>Xin chao
Toi la Kai
Cam on!</code></pre>
</div>

<h3 class="task-heading">Gợi ý</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io::Read;

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    print!("{}", input);
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Mẹo:</strong> Dùng <code>print!()</code> thay vì <code>println!()</code> để in chính xác nội dung (không thêm dòng trắng cuối).
</div>
`,
    defaultCode: `use std::io::Read;

fn main() {
    let mut input = String::new();
    // TODO: Đọc toàn bộ stdin vào input bằng read_to_string()
    // TODO: In ra nội dung (dùng print! thay vì println!)
}
`,
    testCases: [
        {
            input: 'Xin chao\nToi la Kai\nCam on!',
            expectedOutput: 'Xin chao\nToi la Kai\nCam on!',
            hidden: false
        },
        {
            input: 'Hello\nWorld',
            expectedOutput: 'Hello\nWorld',
            hidden: true
        },
        {
            input: '123\n456\n789',
            expectedOutput: '123\n456\n789',
            hidden: true
        }
    ]
};
