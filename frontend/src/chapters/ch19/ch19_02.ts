import { Lesson } from '../../courses';

export const ch19_02: Lesson = {
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
        };
