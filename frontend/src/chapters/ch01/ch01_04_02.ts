import { Lesson } from '../../courses';

export const ch01_04_02: Lesson = {
    id: 'ch01-04-02',
    title: '1.4.2 Đọc số với parse()',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Viết chương trình đọc hai số nguyên từ người dùng (mỗi số trên một dòng) và in ra tổng của chúng.</p>

<h3 class="task-heading">Yêu cầu</h3>
<ul class="task-list">
  <li>Đọc dòng đầu tiên, chuyển sang số nguyên bằng <code>.parse::&lt;i32&gt;()</code></li>
  <li>Đọc dòng thứ hai, chuyển sang số nguyên</li>
  <li>In ra tổng (không cần in thêm chữ gì, chỉ in số)</li>
</ul>

<h3 class="task-heading">Ví dụ</h3>
<div class="code-snippet">
  <span class="code-lang">input</span>
  <pre><code>5
3</code></pre>
</div>
<div class="code-snippet output">
  <span class="code-lang">output</span>
  <pre><code>8</code></pre>
</div>

<h3 class="task-heading">Gợi ý</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    let mut s1 = String::new();
    let mut s2 = String::new();
    io::stdin().read_line(&mut s1).unwrap();
    io::stdin().read_line(&mut s2).unwrap();

    let a: i32 = s1.trim().parse().unwrap();
    let b: i32 = s2.trim().parse().unwrap();

    println!("{}", a + b);
}</code></pre>
</div>
`,
    defaultCode: `use std::io;

fn main() {
    let mut s1 = String::new();
    let mut s2 = String::new();

    // TODO: Đọc dòng đầu tiên vào s1
    // TODO: Đọc dòng thứ hai vào s2
    // TODO: Chuyển thành số, tính tổng, in ra
}
`,
    testCases: [
        {
            input: '5\n3',
            expectedOutput: '8',
            hidden: false
        },
        {
            input: '10\n20',
            expectedOutput: '30',
            hidden: false
        },
        {
            input: '0\n0',
            expectedOutput: '0',
            hidden: true
        },
        {
            input: '-5\n7',
            expectedOutput: '2',
            hidden: true
        }
    ]
};
