import { Lesson } from '../../courses';

export const ch08_03: Lesson = {
            id: 'ch08-03',
            title: '8.3 Hash Maps',
            duration: '20 phút',
            type: 'practice',
            content: `
<p><strong>HashMap&lt;K, V&gt;</strong> lưu trữ cặp key-value. Tương tự dict (Python), object (JS), map (Java).</p>

<h3 class="task-heading">Tạo và thêm</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);</code></pre>
</div>

<h3 class="task-heading">Đọc giá trị</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let score = scores.get("Blue"); // Option<&V></code></pre>
</div>

<h3 class="task-heading">Cập nhật</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Ghi đè
scores.insert(String::from("Blue"), 25);

// Chỉ insert nếu key chưa tồn tại
scores.entry(String::from("Blue")).or_insert(50);

// Cập nhật dựa trên giá trị cũ
let text = "hello world wonderful world";
let mut map = HashMap::new();
for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
}</code></pre>
</div>
`,
            defaultCode: `use std::collections::HashMap;

fn main() {
    // Đếm từ
    let text = "xin chào rust xin chào thế giới rust rust";

    let mut word_count = HashMap::new();
    for word in text.split_whitespace() {
        let count = word_count.entry(word).or_insert(0);
        *count += 1;
    }

    println!("Đếm từ:");
    for (word, count) in &word_count {
        println!("  '{word}': {count} lần");
    }

    // Bảng điểm
    let mut scores = HashMap::new();
    scores.insert("Alice", 95);
    scores.insert("Bob", 87);
    scores.insert("Charlie", 92);

    let target = "Bob";
    match scores.get(target) {
        Some(score) => println!("\\n{target} được {score} điểm"),
        None => println!("\\nKhông tìm thấy {target}"),
    }
}
`,
            expectedOutput: 'Đếm từ:\n  \'xin\': 2 lần\n  \'chào\': 2 lần\n  \'rust\': 3 lần\n  \'thế\': 1 lần\n  \'giới\': 1 lần\n\nBob được 87 điểm'
        };
