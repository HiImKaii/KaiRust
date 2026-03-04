import { Chapter } from '../courses';

export const ch19: Chapter = {
    id: 'ch19',
    title: 'Chương 19: Patterns và Matching',
    lessons: [
        {
            id: 'ch19-01',
            title: '19.1 Các nơi dùng Patterns',
            duration: '15 phút',
            type: 'theory',
            content: `
<p><strong>Patterns</strong> xuất hiện ở nhiều nơi trong Rust, không chỉ trong <code>match</code>.</p>

<h3 class="task-heading">Patterns ở đâu?</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// 1. match arms
match x {
    1 => println!("one"),
    2 => println!("two"),
    _ => println!("other"),
}

// 2. if let
if let Some(x) = option { /* ... */ }

// 3. while let
while let Some(top) = stack.pop() { /* ... */ }

// 4. for loops
for (index, value) in v.iter().enumerate() { /* ... */ }

// 5. let statements
let (x, y, z) = (1, 2, 3);

// 6. function parameters
fn print_coords(&(x, y): &(i32, i32)) { /* ... */ }</code></pre>
</div>

<h3 class="task-heading">Refutable vs Irrefutable</h3>
<ul class="task-list">
  <li><strong>Irrefutable</strong>: luôn match (dùng trong <code>let</code>, <code>for</code>, function params)</li>
  <li><strong>Refutable</strong>: có thể không match (dùng trong <code>if let</code>, <code>while let</code>, <code>match</code>)</li>
</ul>
`,
            defaultCode: `fn classify_number(n: i32) -> &'static str {
    match n {
        i32::MIN..=-1 => "âm",
        0 => "không",
        1..=100 => "nhỏ",
        _ => "lớn",
    }
}

fn main() {
    // match
    let numbers = [-5, 0, 42, 200];
    for n in numbers {
        println!("{n} là số {}", classify_number(n));
    }

    // if let
    let config: Option<&str> = Some("dark-mode");
    if let Some(theme) = config {
        println!("\\nTheme: {theme}");
    }

    // let destructuring
    let (name, age) = ("Rust", 10);
    println!("{name} ra đời {age} năm trước");

    // for with pattern
    let colors = vec!["red", "green", "blue"];
    for (i, color) in colors.iter().enumerate() {
        println!("  {}: {color}", i + 1);
    }
}
`,
            expectedOutput: '-5 là số âm\n0 là số không\n42 là số nhỏ\n200 là số lớn\n\nTheme: dark-mode\nRust ra đời 10 năm trước\n  1: red\n  2: green\n  3: blue'
        },
        {
            id: 'ch19-02',
            title: '19.2 Pattern Syntax nâng cao',
            duration: '25 phút',
            type: 'practice',
            content: `
<h3 class="task-heading">Multiple patterns (|)</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>match x {
    1 | 2 => println!("một hoặc hai"),
    3..=5 => println!("ba đến năm"),
    _ => println!("khác"),
}</code></pre>
</div>

<h3 class="task-heading">Destructuring</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Struct
let Point { x, y } = point;

// Enum
match msg {
    Message::Quit => println!("Quit"),
    Message::Move { x, y } => println!("Move to {x},{y}"),
    Message::Write(text) => println!("{text}"),
}

// Nested
let ((a, b), Point { x, y }) = ((1, 2), Point { x: 3, y: 4 });</code></pre>
</div>

<h3 class="task-heading">Ignoring với _ và ..</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let (first, .., last) = (1, 2, 3, 4, 5);
let Point { x, .. } = point; // Bỏ qua y</code></pre>
</div>

<h3 class="task-heading">Match Guards</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>match num {
    Some(x) if x < 5 => println!("nhỏ hơn 5: {x}"),
    Some(x) => println!("{x}"),
    None => (),
}</code></pre>
</div>

<h3 class="task-heading">@ Bindings</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>match age {
    n @ 0..=12 => println!("Trẻ em {n} tuổi"),
    n @ 13..=17 => println!("Thiếu niên {n} tuổi"),
    n => println!("Người lớn {n} tuổi"),
}</code></pre>
</div>
`,
            defaultCode: `#[derive(Debug)]
enum Command {
    Quit,
    Echo(String),
    Move { x: i32, y: i32 },
    Color(u8, u8, u8),
}

fn process(cmd: &Command) {
    match cmd {
        Command::Quit => println!("👋 Thoát!"),
        Command::Echo(msg) => println!("🔊 Echo: {msg}"),
        Command::Move { x, y } => println!("🏃 Di chuyển đến ({x}, {y})"),
        Command::Color(r, g, b) => println!("🎨 Màu: rgb({r}, {g}, {b})"),
    }
}

fn grade(score: u32) -> &'static str {
    match score {
        90..=100 => "A",
        80..=89 => "B",
        70..=79 => "C",
        60..=69 => "D",
        _ => "F",
    }
}

fn main() {
    let commands = vec![
        Command::Echo(String::from("Hello Patterns!")),
        Command::Move { x: 10, y: 20 },
        Command::Color(255, 128, 0),
        Command::Quit,
    ];

    for cmd in &commands {
        process(cmd);
    }

    println!("\\n=== Bảng điểm ===");
    let scores = [95, 82, 71, 65, 45];
    for s in scores {
        println!("  {s} -> {}", grade(s));
    }
}
`,
            expectedOutput: '🔊 Echo: Hello Patterns!\n🏃 Di chuyển đến (10, 20)\n🎨 Màu: rgb(255, 128, 0)\n👋 Thoát!\n\n=== Bảng điểm ===\n  95 -> A\n  82 -> B\n  71 -> C\n  65 -> D\n  45 -> F'
        }
    ]
};
