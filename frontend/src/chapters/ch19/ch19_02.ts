import { Lesson } from '../../courses';

export const ch19_02: Lesson = {
            id: '19-02',
            title: '19.2 Refutability và Pattern Syntax nâng cao',
            duration: '35 phút',
            type: 'theory',
            content: `
<h3 class="task-heading">Refutability: Liệu một Pattern có thể Không khớp</h3>
<p>Patterns có hai dạng: refutable và irrefutable. Patterns sẽ khớp với bất kỳ giá trị nào có thể được truyền vào là irrefutable. Một ví dụ sẽ là x trong câu lệnh let x = 5; vì x khớp với bất cứ thứ gì và do đó không thể không khớp. Patterns có thể không khớp với một số giá trị có thể có là refutable. Một ví dụ sẽ là Some(x) trong biểu thức if let Some(x) = a_value vì nếu giá trị trong biến a_value là None thay vì Some, pattern Some(x) sẽ không khớp.</p>

<p>Tham số hàm, câu lệnh let, và vòng lặp for chỉ có thể chấp nhận các irrefutable patterns vì chương trình không thể làm gì có ý nghĩa khi các giá trị không khớp. Các biểu thức if let và while let cùng với câu lệnh let...else chấp nhận cả refutable và irrefutable patterns, nhưng compiler sẽ cảnh báo chống lại các irrefutable patterns vì, theo định nghĩa, chúng được thiết kế để xử lý các thất bại có thể xảy ra: Chức năng của một điều kiện nằm ở khả năng thực hiện khác nhau tùy thuộc vào thành công hay thất bại.</p>

<p>Nói chung, bạn không cần lo lắng về sự khác biệt giữa refutable và irrefutable patterns; tuy nhiên, bạn cần làm quen với khái niệm về refutability để có thể phản hồi khi bạn thấy nó trong một thông báo lỗi. Trong những trường hợp đó, bạn sẽ cần thay đổi either pattern hoặc construct mà bạn đang sử dụng pattern đó, tùy thuộc vào hành vi được intended của code.</p>

<p>Hãy xem xét một ví dụ về điều gì xảy ra khi chúng ta cố gắng sử dụng một refutable pattern ở nơi Rust yêu cầu một irrefutable pattern và ngược lại. Listing 19-8 cho thấy một câu lệnh let, nhưng cho pattern, chúng ta đã chỉ định Some(x), một refutable pattern. Như bạn có thể mong đợi, code này sẽ không biên dịch.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Mã này không biên dịch được!]
let Some(x) = some_option_value;</code></pre>
</div>
<p><em>Listing 19-8: Cố gắng sử dụng một refutable pattern với let</em></p>

<p>Nếu some_option_value là một giá trị None, nó sẽ không khớp với pattern Some(x), có nghĩa là pattern là refutable. Tuy nhiên, câu lệnh let chỉ có thể chấp nhận một irrefutable pattern vì không có gì valid mà code có thể làm với giá trị None. Tại thời điểm biên dịch, Rust sẽ phàn nàn rằng chúng ta đã cố gắng sử dụng một refutable pattern ở nơi một irrefutable pattern được yêu cầu:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>$ cargo run
   Compiling patterns v0.1.0 (file:///projects/patterns)
error[E0005]: refutable pattern in local binding
 --> src/main.rs:3:9
  |
3 |     let Some(x) = some_option_value;
  |         ^^^^^^^ pattern \`None\` not covered
  |
  = note: \`let\` bindings require an "irrefutable pattern", like a \`struct\` or an \`enum\` with only one variant
  = note: for more information, visit https://doc.rust-lang.org/book/ch19-02-refutability.html
  = note: the matched value is of type \`Option<i32>\`
help: you might want to use \`let else\` to handle the variant that isn't matched
  |
3 |     let Some(x) = some_option_value else { todo!() };
  |                                     ++++++++++++++++

For more information about this error, try \`rustc --explain E0005\`.
error: could not compile \`patterns\` (bin "patterns") due to 1 previous error</code></pre>
</div>

<p>Bởi vì chúng ta không bao quát (và không thể bao quát!) mọi giá trị hợp lệ với pattern Some(x), Rust đúng ra tạo ra một lỗi compiler.</p>

<p>Nếu chúng ta có một refutable pattern ở nơi cần một irrefutable pattern, chúng ta có thể sửa nó bằng cách thay đổi code sử dụng pattern: Thay vì sử dụng let, chúng ta có thể sử dụng let...else. Sau đó, nếu pattern không khớp, code trong dấu ngoặc nhọn sẽ xử lý giá trị đó. Listing 19-9 cho thấy cách sửa code trong Listing 19-8.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let Some(x) = some_option_value else {
    return;
};</code></pre>
</div>
<p><em>Listing 19-9: Sử dụng let...else và một block với refutable patterns thay vì let</em></p>

<p>Chúng ta đã cho code một lối thoát! Code này hoàn toàn hợp lệ, mặc dù nó có nghĩa là chúng ta không thể sử dụng một irrefutable pattern mà không nhận được cảnh báo. Nếu chúng ta cho let...else một pattern sẽ luôn khớp, chẳng hạn như x, như trong Listing 19-10, compiler sẽ đưa ra một cảnh báo.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 5 else {
    return;
};</code></pre>
</div>
<p><em>Listing 19-10: Cố gắng sử dụng một irrefutable pattern với let...else</em></p>

<p>Rust phàn nàn rằng việc sử dụng let...else với một irrefutable pattern không có ý nghĩa:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>$ cargo run
   Compiling patterns v0.1.0 (file:///projects/patterns)
warning: irrefutable \`let...else\` pattern
 --> src/main.rs:2:5
  |
2 |     let x = 5 else {
  |     ^^^^^^^^^
  |
  = note: this pattern will always match, so the \`else\` clause is useless
  = help: consider removing the \`else\` clause
  = note: \`#[warn(irrefutable_let_patterns)]\` on by default

warning: \`patterns\` (bin "patterns") generated 1 warning
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.39s
     Running \`target/debug/patterns\`

For this reason, match arms must use refutable patterns, except for the last arm, which should match any remaining values with an irrefutable pattern. Rust allows us to use an irrefutable pattern in a match with only one arm, but this syntax isn’t particularly useful and could be replaced with a simpler let statement.</p>
</div>

<p>Vì lý do này, các match arms phải sử dụng refutable patterns, ngoại trừ arm cuối cùng, nên khớp với bất kỳ giá trị nào còn lại bằng một irrefutable pattern. Rust cho phép chúng ta sử dụng một irrefutable pattern trong một match chỉ với một arm, nhưng cú pháp này không đặc biệt hữu ích và có thể được thay thế bằng một câu lệnh let đơn giản hơn.</p>

<p>Bây giờ bạn đã biết nơi sử dụng patterns và sự khác biệt giữa refutable và irrefutable patterns, hãy tìm hiểu tất cả cú pháp mà chúng ta có thể sử dụng để tạo patterns.</p>

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
        Command::Quit => println!("Thoat!"),
        Command::Echo(msg) => println!("Echo: {msg}"),
        Command::Move { x, y } => println!("Di chuyen den ({x}, {y})"),
        Command::Color(r, g, b) => println!("Mau: rgb({r}, {g}, {b})"),
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
    // Refutability example
    let some_option: Option<i32> = Some(5);

    // Using refutable pattern with if let
    if let Some(x) = some_option {
        println!("Gia tri: {x}");
    }

    // Using let...else with refutable pattern
    let some_value = Some(42);
    let Some(val) = some_value else {
        println!("Khong co gia tri!");
        return;
    };
    println!("Gia tri tu let...else: {val}");

    println!("\\n=== Xu ly Command ===");
    let commands = vec![
        Command::Echo(String::from("Hello Patterns!")),
        Command::Move { x: 10, y: 20 },
        Command::Color(255, 128, 0),
        Command::Quit,
    ];

    for cmd in &commands {
        process(cmd);
    }

    println!("\\n=== Bang diem ===");
    let scores = [95, 82, 71, 65, 45];
    for s in scores {
        println!("  {s} -> {}", grade(s));
    }
}
`,
            expectedOutput: `Gia tri: 5
Gia tri tu let...else: 42

=== Xu ly Command ===
Echo: Hello Patterns!
Di chuyen den (10, 20)
Mau: rgb(255, 128, 0)
Thoat!

=== Bang diem ===
  95 -> A
  82 -> B
  71 -> C
  65 -> D
  45 -> F`
        };
