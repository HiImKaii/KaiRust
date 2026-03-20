import { Lesson } from '../../courses';

export const ch01_04_01: Lesson = {
    id: 'ch01-04-01',
    title: '1.4.1 Đọc một dòng với read_line()',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Viết chương trình yêu cầu người dùng nhập tên, sau đó in ra lời chào.</p>

<h3 class="task-heading">Yêu cầu</h3>
<ul class="task-list">
  <li>Đọc một dòng từ người dùng bằng <code>io::stdin().read_line(&mut string)</code></li>
  <li>Dùng <code>.trim()</code> để loại bỏ ký tự xuống dòng <code>\\n</code></li>
  <li>In ra <code>"Xin chao, [tên]!"</code></li>
</ul>

<h3 class="task-heading">Ví dụ</h3>
<div class="code-snippet output">
  <span class="code-lang">output</span>
  <pre><code>Xin chao, Kai!</code></pre>
</div>

<h3 class="task-heading">Gợi ý</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    let mut name = String::new();
    io::stdin().read_line(&mut name).expect("Lỗi đọc");
    let name = name.trim();
    println!("Xin chao, {}!", name);
}</code></pre>
</div>
`,
    defaultCode: `use std::io;

fn main() {
    let mut name = String::new();
    // TODO: Đọc tên từ người dùng bằng read_line()
    // Gợi ý: io::stdin().read_line(&mut name)

    // TODO: Dùng .trim() để loại bỏ \\n
    // TODO: In ra "Xin chao, [tên]!"
}
`,
    testCases: [
        {
            input: 'Kai',
            expectedOutput: 'Xin chao, Kai!',
            hidden: false
        },
        {
            input: 'Nguyen',
            expectedOutput: 'Xin chao, Nguyen!',
            hidden: false
        },
        {
            input: 'Rust',
            expectedOutput: 'Xin chao, Rust!',
            hidden: true
        }
    ]
};
