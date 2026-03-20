import { Lesson } from '../../courses';

export const ch01_04_04: Lesson = {
    id: 'ch01-04-04',
    title: '1.4.4 Đếm dòng và từ với lines()',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Viết chương trình đọc toàn bộ stdin, sau đó với <strong>mỗi dòng</strong>, in ra số từ trong dòng đó (các từ cách nhau bởi khoảng trắng).</p>

<h3 class="task-heading">Yêu cầu</h3>
<ul class="task-list">
  <li>Đọc toàn bộ stdin bằng <code>read_to_string()</code></li>
  <li>Tách thành các dòng bằng <code>.lines()</code></li>
  <li>Với mỗi dòng, đếm số từ bằng <code>.split_whitespace().count()</code></li>
  <li>In số từ của mỗi dòng trên một dòng riêng</li>
</ul>

<h3 class="task-heading">Ví dụ</h3>
<div class="code-snippet">
  <span class="code-lang">input</span>
  <pre><code>Hello world
Good morning
Rust programming</code></pre>
</div>
<div class="code-snippet output">
  <span class="code-lang">output</span>
  <pre><code>2
2
2</code></pre>
</div>

<h3 class="task-heading">Gợi ý</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io::Read;

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();

    for line in input.lines() {
        let word_count = line.split_whitespace().count();
        println!("{}", word_count);
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Phân biệt:</strong>
  <ul>
    <li><code>.split_whitespace()</code> — tách theo khoảng trắng, bỏ khoảng trắng thừa</li>
    <li><code>.split(' ')</code> — tách theo dấu cách cố định, giữ chuỗi rỗng nếu có nhiều dấu cách liên tiếp</li>
  </ul>
  Luôn dùng <code>split_whitespace()</code> để đếm từ chính xác hơn.
</div>
`,
    defaultCode: `use std::io::Read;

fn main() {
    let mut input = String::new();
    // TODO: Đọc toàn bộ stdin bằng read_to_string()

    // TODO: Duyệt qua từng dòng bằng .lines()
    // TODO: Với mỗi dòng, đếm số từ bằng .split_whitespace().count()
    // TODO: In ra số từ
}
`,
    testCases: [
        {
            input: 'Hello world\nGood morning\nRust programming',
            expectedOutput: '2\n2\n2',
            hidden: false
        },
        {
            input: 'Mot hai ba bon nam\nXin chao the gioi',
            expectedOutput: '5\n3',
            hidden: false
        },
        {
            input: 'One\nTwo\nThree\nFour\nFive',
            expectedOutput: '1\n1\n1\n1\n1',
            hidden: true
        }
    ]
};
