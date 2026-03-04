import { Chapter } from '../courses';

export const ch06: Chapter = {
    id: 'ch06',
    title: 'Chương 6: Enums và Pattern Matching',
    lessons: [
        {
            id: 'ch06-01',
            title: '6.1 Định nghĩa Enum',
            duration: '20 phút',
            type: 'theory',
            content: `
<p><strong>Enums</strong> cho phép bạn định nghĩa một kiểu bằng cách liệt kê các biến thể (variants) có thể có. Enums trong Rust mạnh hơn nhiều so với các ngôn ngữ khác.</p>

<h3 class="task-heading">Enum cơ bản</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum IpAddrKind {
    V4,
    V6,
}

let four = IpAddrKind::V4;
let six = IpAddrKind::V6;</code></pre>
</div>

<h3 class="task-heading">Enum với dữ liệu</h3>
<p>Mỗi variant có thể chứa dữ liệu khác nhau:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));</code></pre>
</div>

<h3 class="task-heading">Enum mạnh mẽ</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Message {
    Quit,                       // Không có dữ liệu
    Move { x: i32, y: i32 },   // Named fields (giống struct)
    Write(String),              // Một String
    ChangeColor(i32, i32, i32), // Ba i32
}

impl Message {
    fn call(&self) {
        // logic ở đây
    }
}</code></pre>
</div>

<h3 class="task-heading">Option&lt;T&gt;</h3>
<p>Rust không có <code>null</code>. Thay vào đó, dùng <code>Option&lt;T&gt;</code> để biểu thị giá trị có thể không tồn tại:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Option&lt;T&gt; {
    None,
    Some(T),
}

let some_number = Some(5);
let some_char = Some('e');
let absent_number: Option&lt;i32&gt; = None;</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Tại sao Option tốt hơn null?</strong> Compiler buộc bạn phải xử lý cả hai trường hợp (Some và None) trước khi dùng giá trị. Không bao giờ xảy ra NullPointerException!
</div>
`,
            defaultCode: `#[derive(Debug)]
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

#[derive(Debug)]
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: &Coin) -> u32 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}

fn main() {
    let dir = Direction::Up;
    println!("Hướng: {:?}", dir);

    let coins = [Coin::Penny, Coin::Quarter, Coin::Dime];
    for coin in &coins {
        println!("{:?} = {} cents", coin, value_in_cents(coin));
    }

    // Option
    let x: Option<i32> = Some(42);
    let y: Option<i32> = None;
    println!("x = {:?}, y = {:?}", x, y);
}
`,
            expectedOutput: 'Hướng: Up\nPenny = 1 cents\nQuarter = 25 cents\nDime = 10 cents\nx = Some(42), y = None'
        },
        {
            id: 'ch06-02',
            title: '6.2 match Control Flow',
            duration: '25 phút',
            type: 'practice',
            content: `
<p><strong>match</strong> là construct kiểm soát luồng cực kỳ mạnh mẽ. Nó so sánh giá trị với một loạt patterns và chạy code tương ứng.</p>

<h3 class="task-heading">Cú pháp match</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}</code></pre>
</div>

<h3 class="task-heading">Match phải exhaustive</h3>
<p>Bạn <strong>phải xử lý mọi variant</strong>. Dùng <code>_</code> hoặc <code>other</code> cho catch-all:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let dice = 3;
match dice {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    other => move_player(other),  // Catch-all với giá trị
    // _ => ()  // Catch-all bỏ qua
}</code></pre>
</div>

<h3 class="task-heading">Matching với Option&lt;T&gt;</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn plus_one(x: Option&lt;i32&gt;) -> Option&lt;i32&gt; {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);    // Some(6)
let none = plus_one(None);   // None</code></pre>
</div>
`,
            defaultCode: `fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

fn describe_number(n: i32) -> &'static str {
    match n {
        1 => "một",
        2 => "hai",
        3 => "ba",
        4..=10 => "từ bốn đến mười",
        _ => "khác",
    }
}

fn main() {
    // Match với Option
    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
    println!("five + 1 = {:?}", six);
    println!("None + 1 = {:?}", none);

    // Match với ranges
    for i in 0..12 {
        println!("{i} -> {}", describe_number(i));
    }
}
`,
            expectedOutput: 'five + 1 = Some(6)\nNone + 1 = None\n0 -> khác\n1 -> một\n2 -> hai\n3 -> ba\n4 -> từ bốn đến mười\n5 -> từ bốn đến mười\n6 -> từ bốn đến mười\n7 -> từ bốn đến mười\n8 -> từ bốn đến mười\n9 -> từ bốn đến mười\n10 -> từ bốn đến mười\n11 -> khác'
        },
        {
            id: 'ch06-03',
            title: '6.3 if let — Cú pháp ngắn gọn',
            duration: '10 phút',
            type: 'theory',
            content: `
<p><code>if let</code> là cú pháp rút gọn khi bạn chỉ quan tâm đến một pattern trong match.</p>

<h3 class="task-heading">So sánh match vs if let</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Dùng match — verbose
let config_max = Some(3u8);
match config_max {
    Some(max) => println!("Max: {max}"),
    _ => (),
}

// Dùng if let — ngắn gọn hơn
if let Some(max) = config_max {
    println!("Max: {max}");
}</code></pre>
</div>

<h3 class="task-heading">if let với else</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let coin = Coin::Quarter;
if let Coin::Quarter = coin {
    println!("Đồng 25 cents!");
} else {
    println!("Không phải quarter");
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Khi nào dùng if let?</strong> Khi bạn chỉ cần khớp một pattern và bỏ qua tất cả các trường hợp khác. Nếu cần xử lý nhiều patterns, hãy dùng <code>match</code>.
</div>
`,
            defaultCode: `fn main() {
    // if let với Option
    let favorite_color: Option<&str> = Some("xanh");

    if let Some(color) = favorite_color {
        println!("Màu yêu thích: {color}");
    } else {
        println!("Không có màu yêu thích");
    }

    // So sánh: match
    let age: Option<u8> = Some(25);
    match age {
        Some(a) if a >= 18 => println!("Đủ tuổi: {a}"),
        Some(a) => println!("Chưa đủ tuổi: {a}"),
        None => println!("Không biết tuổi"),
    }

    // if let liên tiếp
    let numbers = vec![Some(1), None, Some(3)];
    for num in &numbers {
        if let Some(n) = num {
            println!("Số: {n}");
        }
    }
}
`,
            expectedOutput: 'Màu yêu thích: xanh\nĐủ tuổi: 25\nSố: 1\nSố: 3'
        }
    ]
};
