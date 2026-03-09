import { Lesson } from '../../courses';

export const ch06_02: Lesson = {
            id: 'ch06-02',
            title: '6.2 Sức mạnh của match Control Flow',
            duration: '40 phút',
            type: 'theory',
            content: `
<p>Rust có một cấu trúc điều khiển luồn (Control flow construct) cực kì mạnh tên là <strong>match</strong>. Nó cho phép bạn so sánh một giá trị với một chuỗi các pattern và thực thi code dựa trên pattern nào khớp. Pattern có thể là literal values, variable names, wildcards, và nhiều thứ khác. Sức mạnh của match đến từ tính biểu đạt của các patterns và thực tế là compiler xác nhận rằng tất cả các trường hợp có thể đều được xử lý.</p>

<p>Hãy tưởng tượng một biểu thức match như một máy phân loại tiền xu: Các đồng xu trượt xuống một ray với các lỗ có kích thước khác nhau dọc theo đó, và mỗi đồng xu rơi qua lỗ đầu tiên mà nó vừa. Tương tự, các giá trị đi qua mỗi pattern trong match, và tại pattern đầu tiên mà giá trị "vừa", giá trị rơi vào khối code liên kết để sử dụng trong quá trình thực thi.</p>

<h3 class="task-heading">Giải thích chi tiết về Match</h3>
<p>Hãy phân tích chi tiết hàm <code>value_in_cents</code>. Đầu tiên, chúng ta liệt kê từ khóa match theo sau bởi một expression, trong trường hợp này là giá trị <code>coin</code>. Điều này có vẻ rất giống với một biểu thức điều kiện được sử dụng với <code>if</code>, nhưng có một điểm khác biệt lớn: Với <code>if</code>, điều kiện cần đánh giá thành giá trị Boolean, nhưng ở đây nó có thể là bất kỳ kiểu nào. Kiểu của <code>coin</code> trong ví dụ này là enum <code>Coin</code> mà ta đã định nghĩa.</p>

<p>Tiếp theo là các nhánh của match (match arms). Một nhánh có hai phần: một pattern và một đoạn code. Nhánh đầu tiên ở đây có pattern là giá trị <code>Coin::Penny</code> và sau đó là toán tử <code>=&gt;</code> để phân tách pattern và code cần chạy. Code trong trường hợp này chỉ là giá trị 1. Mỗi nhánh được phân tách với nhau bằng dấu phẩy.</p>

<p>Khi biểu thức match thực thi, nó so sánh giá trị thu được với pattern của mỗi nhánh, theo thứ tự. Nếu pattern khớp với giá trị, code liên kết với pattern đó được thực thi. Nếu pattern đó không khớp, việc thực thi tiếp tục đến nhánh tiếp theo, giống như trong máy phân loại tiền. Chúng ta có thể có bao nhiêu nhánh tùy thích.</p>

<p>Code liên kết với mỗi nhánh là một biểu thức (expression), và giá trị kết quả của biểu thức trong nhánh khớp là giá trị được trả về cho toàn bộ biểu thức match.</p>

<p>Chúng ta thường không dùng dấu ngoặc nhọn nếu code của nhánh match ngắn, như trong ví dụ trên nơi mỗi nhánh chỉ trả về một giá trị. Nếu bạn muốn chạy nhiều dòng code trong một nhánh match, bạn phải sử dụng dấu ngoặc nhọn, và dấu phẩy sau nhánh là tùy chọn.</p>

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

<p>Hãy xem phiên bản sau đây của hàm <code>plus_one</code> có bug và sẽ không compile:</p>
<pre>fn plus_one(x: Option&lt;i32&gt;) -> Option&lt;i32&gt; {
    match x {
        Some(i) => Some(i + 1),
    }
}</pre>
<p>Chúng ta đã không xử lý trường hợp None, nên code này sẽ gây bug. May mắn thay, đây là bug mà Rust biết cách bắt. Nếu ta cố compile code này, ta sẽ nhận được lỗi:</p>
<pre>error[E0004]: non-exhaustive patterns: None not covered
 --> src/main.rs:3:15
  |
3 |         match x {
  |               ^ pattern None not covered
  |
note: Option defined here
note: the matched value is of type Option
help: ensure that all possible cases are being handled
  |
4 ~             Some(i) => Some(i + 1),
5 ~             None => todo!(),</pre>
<p>Rust biết rằng chúng ta đã không cover mọi trường hợp và thậm chí còn biết pattern nào ta đã quên! Matches trong Rust là exhaustive (toàn diện): Chúng ta phải exhaust mọi khả năng cuối cùng để code hợp lệ. Đặc biệt trong trường hợp Option, khi Rust ngăn chúng ta quên xử lý rõ ràng trường hợp None, nó bảo vệ chúng ta khỏi việc giả định rằng ta có một giá trị khi thực tế có thể là null - làm cho "sai lầm tỉ đô" không thể xảy ra.</p>

<h3 class="task-heading">Pattern Catch-All (Wildcard)</h3>
<p>Khi có nhiều giá trị cần xử lý giống nhau, ta có thể dùng pattern bắt tất cả (Catch-all) bằng cách đặt tên cho giá trị còn lại hoặc dùng <code>_</code> như placeholder.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let dice_roll = 9;

match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    other => move_player(other), // Gán giá trị vào biến other
}</code></pre>
</div>
<p>Biến <code>other</code> sẽ nhận mọi giá trị không khớp với 3 hoặc 7. Nếu không cần sử dụng giá trị, dùng <code>_</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    _ => reroll_dice(), // Bỏ qua, không dùng giá trị
}</code></pre>
</div>
<p>Nếu muốn không làm gì cả:</p>
<pre><code>_ => ()</code></pre>

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
