import { Lesson } from '../../courses';

export const ch01_04_05: Lesson = {
    id: 'ch01-04-05',
    title: '1.4.5 Tổng hợp: Đọc họ tên và tuổi',
    duration: '15 phút',
    type: 'practice',
    content: `
<p>Viết chương trình đọc họ tên và tuổi từ người dùng, sau đó in thông tin kèm tuổi + 10 năm sau.</p>

<h3 class="task-heading">Yêu cầu</h3>
<ul class="task-list">
  <li>Đọc họ tên (dòng 1), dùng <code>.trim()</code></li>
  <li>Đọc tuổi (dòng 2), dùng <code>.parse::&lt;u32&gt;()</code></li>
  <li>In họ tên và tuổi</li>
  <li>In thêm dòng <code>"Tuoi sau 10 nam: [tuoi + 10]"</code></li>
</ul>

<h3 class="task-heading">Ví dụ</h3>
<div class="code-snippet">
  <span class="code-lang">input</span>
  <pre><code>Nguyen Van A
25</code></pre>
</div>
<div class="code-snippet output">
  <span class="code-lang">output</span>
  <pre><code>Nguyen Van A
25
Tuoi sau 10 nam: 35</code></pre>
</div>

<h3 class="task-heading">Gợi ý</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    let mut name = String::new();
    let mut age_str = String::new();

    io::stdin().read_line(&mut name).unwrap();
    io::stdin().read_line(&mut age_str).unwrap();

    let name = name.trim();
    let age: u32 = age_str.trim().parse().unwrap();

    println!("{}", name);
    println!("{}", age);
    println!("Tuoi sau 10 nam: {}", age + 10);
}</code></pre>
</div>
`,
    defaultCode: `use std::io;

fn main() {
    let mut name = String::new();
    let mut age_str = String::new();

    // TODO: Đọc họ tên vào biến name
    // TODO: Đọc tuổi vào biến age_str
    // TODO: trim() tên, parse() tuổi thành u32
    // TODO: In họ tên, tuổi, và tuổi sau 10 năm
}
`,
    testCases: [
        {
            input: 'Nguyen Van A\n25',
            expectedOutput: 'Nguyen Van A\n25\nTuoi sau 10 nam: 35',
            hidden: false
        },
        {
            input: 'Kai\n18',
            expectedOutput: 'Kai\n18\nTuoi sau 10 nam: 28',
            hidden: false
        },
        {
            input: 'Teo\n30',
            expectedOutput: 'Teo\n30\nTuoi sau 10 nam: 40',
            hidden: true
        },
        {
            input: 'Ti\n5',
            expectedOutput: 'Ti\n5\nTuoi sau 10 nam: 15',
            hidden: true
        }
    ]
};
