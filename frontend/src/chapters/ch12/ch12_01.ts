import { Lesson } from '../../courses';

export const ch12_01: Lesson = {
            id: 'ch12-01',
            title: '12.1 Nhận tham số command line',
            duration: '15 phút',
            type: 'practice',
            content: `
<p>Chương này build dự án thực tế: công cụ CLI tìm kiếm text trong file, tương tự <code>grep</code>. Qua đó áp dụng nhiều khái niệm đã học.</p>

<h3 class="task-heading">Đọc command line arguments</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::env;

fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();
    let query = &args[1];
    let file_path = &args[2];
    println!("Tìm: {query}");
    println!("Trong file: {file_path}");
}</code></pre>
</div>

<h3 class="task-heading">Đọc file</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs;

fn main() {
    let contents = fs::read_to_string(file_path)
        .expect("Không đọc được file");
    println!("Nội dung:\\n{contents}");
}</code></pre>
</div>
`,
            defaultCode: `// Mô phỏng minigrep - tìm kiếm text
fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();
    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }
    results
}

fn main() {
    let poem = "Tôi yêu Rust,
Rust rất an toàn,
Memory safety tuyệt vời,
Rust giúp tôi code tốt hơn,
Không lo null pointer!";

    let query = "Rust";
    println!("Tìm '{query}' trong poem:");
    println!("---");

    let results = search(query, poem);
    for line in results {
        println!("  > {line}");
    }
}
`,
            expectedOutput: 'Tìm \'Rust\' trong poem:\n---\n  > Tôi yêu Rust,\n  > Rust rất an toàn,\n  > Rust giúp tôi code tốt hơn,'
        };
