import { Lesson } from '../../courses';

export const ch06_01: Lesson = {
            id: 'ch06-01',
            title: '6.1 Định nghĩa Enum',
            duration: '40 phút',
            type: 'theory',
            content: `
<p>Trong khi các struct đóng gói dữ liệu riêng lẻ liên kết lại với nhau thì <strong>Enums</strong> (viết tắt của <em>enumerations</em>) cho phép bạn liệt kê ra các trường hợp (variants) có thể có của một giá trị. Đây là một tính năng cực kỳ mạnh mẽ của Rust mà nhiều ngôn ngữ khác không có (hoặc có nhưng không mạnh bằng).</p>

<p>Hãy xem một ví dụ mà chúng ta cần khai báo địa chỉ IP. Hiện tại có hai loại (variant) IP: IPv4 hoặc IPv6. Không có lựa chọn khác cho một địa chỉ IP, và địa chỉ không thể mang cả hai loại cùng một lúc!</p></p>

<h3 class="task-heading">Cơ bản về định nghĩa Enum</h3>
<p>Enum cho phép định nghĩa một kiểu dữ liệu với các giá trị cố định (variants). Mỗi variant là một tùy chọn hợp lệ của kiểu đó.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum IpAddrKind {
    V4,
    V6,
}</code></pre>
</div>
<p>Bây giờ giá trị <code>IpAddrKind::V4</code> và <code>IpAddrKind::V6</code> đều là các kiểu (type) của <code>IpAddrKind</code>. Ta có thể sử dụng nó làm tham số hoặc kiểu biến.</p></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let four = IpAddrKind::V4;
let six = IpAddrKind::V6;

fn route(ip_kind: IpAddrKind) { }
route(IpAddrKind::V4); // Hàm chấp nhận bất kì variant nào</code></pre>
</div>

<h3 class="task-heading">Tích hợp dữ liệu vào trong Variant của Enum</h3>
<p>Nghĩ kĩ hơn về địa chỉ IP. Nếu ta dùng struct thì phải tạo ra hai trường: loại và địa chỉ.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct IpAddr {
    kind: IpAddrKind,
    address: String,
}
let home = IpAddr {
    kind: IpAddrKind::V4,
    address: String::from("127.0.0.1"),
};</code></pre>
</div>
<p>Nhưng đây đúng là dư thừa khi dùng code của Rust: chúng ta có thể đặt dữ liệu trực tiếp vào từng variant của Enum mà không cần phải tạo một Struct riêng.</p></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum IpAddr {
    V4(String), // V4 chứa dữ liệu kiểu String
    V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));</code></pre>
</div>
<p>Điểm mạnh nhất của tính năng nhúng dữ liệu vào bên trong variant của Enum là <strong>Mỗi variant có thể chứa các kiểu dữ liệu và số lượng hoàn toàn khác nhau</strong>. Ví dụ: IPv4 là tập hợp của 4 số <code>u8</code> từ 0-255, vậy ta có thể gán cho V4 một Tuple gồm 4 ô u8, trong khi gán chuỗi String cho V6!</p></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));</code></pre>
</div>

<h3 class="task-heading">Ba loại Variant trong Enum</h3>
<p>Enum trong Rust có thể chứa dữ liệu theo 3 cách:</p>

<h4>1. Unit-like (không có dữ liệu)</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Color {
    Red,
    Green,
    Blue,
}</code></pre>
</div>

<h4>2. Tuple-like (tuple)</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Result&lt;T, E&gt; {
    Ok(T),
    Err(E),
}</code></pre>
</div>

<h4>3. Struct-like (giống struct)</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum User {
    Anonymous,
    Registered { id: u32, name: String },
}</code></pre>
</div>

<h3 class="task-heading">Methods trên Enum</h3>
<p>Giống như Struct, bạn có thể định nghĩa các method cho Enum bằng <code>impl</code>. Method có thể được gọi từ bất kỳ Variant nào và có quyền truy cập đến dữ liệu bên trong.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Message {
    Quit,
    Move { x: i32, y: i32 }, // giống struct
    Write(String), // tuple
    ChangeColor(i32, i32, i32), // tương tự
}

impl Message {
    fn call(&self) {
        // do something inside!
    }
}

let m = Message::Write(String::from("hello"));
m.call();</code></pre>
</div>

<h3 class="task-heading">Kiểu Option&lt;T&gt; - Thay thế an toàn cho Null</h3>
<p>Trong nhiều ngôn ngữ lập trình phổ biến, khái niệm <code>null</code> là một giá trị đặc biệt ám chỉ biến đó không có giá trị. Ông Tony Hoare - người phát minh ra Null năm 1965 - gọi đó là <strong>"Sai lầm tỉ đô"</strong>. Bạn sẽ thường gặp lỗi chương trình bị sập khi cố sử dụng một giá trị mà thực ra là <code>null</code>.</p>

<p>Rust giải quyết vấn đề này bằng cách KHÔNG có null! Thay vào đó, Rust định nghĩa sẵn trong thư viện chuẩn một Enum tên là <code>Option&lt;T&gt;</code> với hai Variant: Some (chứa một giá trị T), hoặc None (không có giá trị).</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Option&lt;T&gt; {
    None,
    Some(T),
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Vì sao Option&lt;T&gt; tốt hơn null?</strong> Option&lt;T&gt; đại diện cho một kiểu có thể có giá trị hoặc không. Khi dùng type T thông thường (ví dụ u8), compiler hiểu rằng kiểu T luôn có giá trị hợp lệ. Nhưng khi dùng Option&lt;T&gt;, trình compiler Rust BẮT BẠN PHẢI KIỂM TRA xem có giá trị hay không TRƯỚC KHI SỬ DỤNG! Điều này ngăn chặn NullPointerException từ gốc!
</div>

<h3 class="task-heading">Cách sử dụng Option&lt;T&gt;</h3>
<p>Để lấy giá trị từ Option, bạn có nhiều cách:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x: Option&lt;i32&gt; = Some(5);

// Cách 1: match (an toàn nhất)
match x {
    Some(v) => println!("Giá trị: {}", v),
    None => println!("Không có giá trị"),
}

// Cách 2: unwrap - panics nếu None
let v = x.unwrap(); // 5

// Cách 3: unwrap_or - trả về giá trị mặc định
let v = x.unwrap_or(0); // 5

// Cách 4: expect - với thông báo lỗi tùy chỉnh
let v = x.expect("Có lỗi xảy ra");

// Cách 5: if let (ngắn gọn)
if let Some(v) = x {
    println!("Giá trị: {}", v);
}</code></pre>
</div>

<p>Lưu ý: <code>unwrap()</code> và <code>expect()</code> sẽ gây panic (crash) nếu giá trị là None. Hãy cẩn thận khi sử dụng!</p>
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
        };
