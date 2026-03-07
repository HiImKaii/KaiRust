import { Lesson } from '../../courses';

export const ch06_02: Lesson = {
            id: 'ch06-02',
            title: '6.2 Sức mạnh của match Control Flow',
            duration: '40 phút',
            type: 'practice',
            content: `
<p>Rust có một cấu trúc điều khiển luồn (Control flow construct) cực kì mạnh tên là <strong>match</strong>. Nó so sánh giá trị với một loạt các pattern khác nhau và thực thi code tương ứng. Pattern có thể là literal, biến, wildcard,... Bạn có thể tưởng tượng nó như một máy phân loại tiền xu: nếu kích thước của đồng xu nào vừa với khe của máy, nó sẽ rơi vào rổ tương ứng. Trình biên dịch sẽ kiểm tra MỌI PATTERN TỪ TRÊN XUỐNG DƯỚI, nếu khớp thì chạy code của pattern đó.</p>

<h3 class="task-heading">Cú pháp cấu trúc Match</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin { // So sánh với Coin enum
        Coin::Penny => { // Chạy một cặp ngoặc nhọn thực thi
            println!("Lucky penny!");
            1 // Implicit return
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}</code></pre>
</div>

<h3 class="task-heading">Trích xuất Value từ Enum với Match</h3>
<p>Một tính năng mạnh mẽ của Match là khả năng trích xuất dữ liệu đang được giữ bên trong Variant của Enum.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState), // Quarter chứa dữ liệu UsState
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => { // Pattern bắt lấy giá trị state và in ra
            println!("Quarter này có state là {:?}", state);
            25
        }
    }
}</code></pre>
</div>

<h3 class="task-heading">Pattern Matching với Option&lt;T&gt;</h3>
<p>Như đã đề cập, Option&lt;T&gt; giấu giá trị của T bên trong Variant <code>Some</code>. Để trích xuất giá trị đó, ta sử dụng match!</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn plus_one(x: Option&lt;i32&gt;) -> Option&lt;i32&gt; {
    match x {
        None => None, // Nếu x là None, trả về None
        Some(i) => Some(i + 1), // Trích xuất giá trị i, cộng 1 và bọc lại trong Some
    }
}

let five = Some(5);
let six = plus_one(five); // Some(6)
let none = plus_one(None); // None
</code></pre>
</div>
<div class="cyber-alert info">
  <strong>Lưu ý quan trọng về Option Match:</strong> Rust <strong>BUỘC PHẢI XỬ LÝ TẤT CẢ</strong> các Variant. Nếu bạn <code>match</code> một biến Option&lt;T&gt; mà quên không xử lý <code>None</code>, trình biên dịch sẽ BÁO LỖI. Điều này giúp ngăn ngừa NullPointerException (thứ đã gây ra nhiều lỗi nghiêm trọng) ở runtime!
</div>

<h3 class="task-heading">Pattern Catch-All (Wildcard)</h3>
<p>Khi có nhiều giá trị cần xử lý giống nhau, ta có thể dùng pattern bắt tất cả (Catch-all) bằng cách đặt tên cho giá trị còn lại hoặc dùng <code>_</code> như placeholder.</p>

<h3 class="task-heading">Match với Ranges và Guards</h3>
<p>Match còn hỗ trợ pattern với khoảng (ranges) và điều kiện (guards):</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let number = 13;

// Match với ranges
match number {
    1..=5 => println!("Từ 1 đến 5"),
    6..=10 => println!("Từ 6 đến 10"),
    _ => println!("Khác"),
}

// Match với if let (guards)
let x = Some(5);
let y = 10;
match x {
    Some(n) if n < y => println!("n nhỏ hơn y"),
    Some(n) => println!("n lớn hơn hoặc bằng y"),
    None => println!("None"),
}</code></pre>
</div>

<h3 class="task-heading">Tổng kết: Ưu điểm của match</h3>
<ul>
  <li><strong>Exhaustive (toàn diện):</strong> Phải xử lý TẤT CẢ các trường hợp</li>
  <li><strong>Pattern matching:</strong> Trích xuất dữ liệu từ enum</li>
  <li><strong>Expression:</strong> Trả về giá trị</li>
  <li><strong>Binding:</strong> Gán giá trị vào biến trong pattern</li>
</ul>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let dice_roll = 9; // Giá trị xúc xắc
match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    other => move_player(other), // Các số khác sẽ gọi move_player với giá trị đó
    // _ => reroll_dice(), // Dùng _ nếu không cần sử dụng giá trị
    // _ => (), // Bỏ qua các trường hợp còn lại
}</code></pre>
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
        _ => "khác", // wildcard (bắt mọi kết quả khác, nếu ko thì lỗi compile liền)
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
        };
