import { Lesson } from '../../courses';

export const ch20_03: Lesson = {
            id: 'ch20-03',
            title: '20.3 Macros',
            duration: '20 phút',
            type: 'theory',
            content: `
<p><strong>Macros</strong> là một dạng metaprogramming — viết code tạo ra code. Rust có 2 loại: declarative macros và procedural macros.</p>

<h3 class="task-heading">Declarative Macros (macro_rules!)</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}</code></pre>
</div>

<h3 class="task-heading">Procedural Macros</h3>
<p>3 loại:</p>
<ul class="task-list">
  <li><strong>Custom derive</strong>: <code>#[derive(MyMacro)]</code></li>
  <li><strong>Attribute-like</strong>: <code>#[route(GET, "/")]</code></li>
  <li><strong>Function-like</strong>: <code>sql!(SELECT * FROM users)</code></li>
</ul>

<h3 class="task-heading">Ví dụ Custom Derive</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Sử dụng derive macro
#[derive(Debug, Clone, Serialize, Deserialize)]
struct User {
    name: String,
    age: u32,
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Macros vs Functions:</strong> Macros hoạt động trên <em>syntax tree</em> tại compile time. Chúng có thể nhận số lượng tham số không cố định (<code>println!</code>) và tạo code mới.
</div>

<h3 class="task-heading">Chúc mừng! 🎉</h3>
<p>Bạn đã hoàn thành toàn bộ 20 chương của "The Rust Programming Language"! Đây là nền tảng vững chắc để bắt đầu xây dựng các dự án Rust thực tế.</p>
`,
            defaultCode: `// Custom macro ví dụ
macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
    ($name:expr) => {
        println!("Hello, {}!", $name);
    };
}

macro_rules! create_map {
    ($( $key:expr => $val:expr ),* $(,)?) => {
        {
            let mut map = std::collections::HashMap::new();
            $( map.insert($key, $val); )*
            map
        }
    };
}

fn main() {
    // Macro không tham số
    say_hello!();

    // Macro với tham số
    say_hello!("Rust Developer");

    // Custom HashMap macro
    let scores = create_map! {
        "Alice" => 95,
        "Bob" => 87,
        "Charlie" => 92,
    };

    println!("\\nBảng điểm:");
    for (name, score) in &scores {
        println!("  {name}: {score}");
    }

    // vec! macro (built-in)
    let nums = vec![1, 2, 3, 4, 5];
    println!("\\nVec: {:?}", nums);

    println!("\\n🎉 Chúc mừng hoàn thành Rust Book!");
}
`,
            expectedOutput: 'Hello!\nHello, Rust Developer!\n\nBảng điểm:\n  Alice: 95\n  Bob: 87\n  Charlie: 92\n\nVec: [1, 2, 3, 4, 5]\n\n🎉 Chúc mừng hoàn thành Rust Book!'
        };
