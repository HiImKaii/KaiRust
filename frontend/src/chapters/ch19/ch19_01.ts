import { Lesson } from '../../courses';

export const ch19_01: Lesson = {
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
        };
