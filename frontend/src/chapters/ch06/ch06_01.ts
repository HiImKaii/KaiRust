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
<p>Điểm mạnh nhất của tính năng nhúng dữ liệu vào bên trong variant của Enum là <strong>Mỗi variant có thể chứa các kiểu dữ liệu và số lượng hoàn toàn khác nhau</strong>. Ví dụ: IPv4 là tập hợp của 4 số <code>u8</code> từ 0-255, vậy ta có thể gán cho V4 một Tuple gồm 4 ô u8, trong khi gán chuỗi String cho V6!</p>

<p>Cần lưu ý rằng mỗi tên variant của enum mà ta định nghĩa cũng trở thành một <strong>hàm tạo (constructor function)</strong> để tạo một instance của enum đó. Nghĩa là <code>IpAddr::V4()</code> là một function call nhận một tham số String và trả về một instance của kiểu <code>IpAddr</code>. Ta tự động có được function constructor này như là kết quả của việc định nghĩa enum.</p>

<h3 class="task-heading">Enum trong thư viện chuẩn</h3>
<p>Việc muốn lưu trữ địa chỉ IP và mã hóa loại IP nào thường rất phổ biến, và thư viện chuẩn của Rust cũng có định nghĩa sẵn! Hãy xem cách thư viện chuẩn định nghĩa IpAddr. Nó có enum và các variant giống như ta đã định nghĩa và sử dụng, nhưng nó nhúng dữ liệu address bên trong các variant dưới dạng hai struct khác nhau, được định nghĩa khác nhau cho mỗi variant:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Ipv4Addr {
    // --snip--
}

struct Ipv6Addr {
    // --snip--
}

enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}</code></pre>
</div>
<p>Điều này minh họa rằng bạn có thể đặt bất kỳ loại dữ liệu nào bên trong một enum variant: strings, numeric types, hoặc structs. Thậm chí bạn có thể đặt một enum khác! Các kiểu trong thư viện chuẩn thường không phức tạp hơn những gì bạn có thể tự nghĩ ra.</p>

<p>Lưu ý rằng mặc dù thư viện chuẩn có định nghĩa cho IpAddr, ta vẫn có thể tạo và sử dụng định nghĩa của riêng mình mà không bị xung đột vì ta chưa đưa định nghĩa của thư viện chuẩn vào scope. Ta sẽ nói thêm về việc đưa các kiểu vào scope trong chương sau.</p></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));</code></pre>
</div>

<h3 class="task-heading">Enum Message với nhiều kiểu dữ liệu khác nhau</h3>
<p>Hãy xem một ví dụ khác về enum với các variant chứa dữ liệu hoàn toàn khác nhau:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Message {
    Quit,                        // Không có dữ liệu
    Move { x: i32, y: i32 },    // Struct-like
    Write(String),               // Tuple-like với 1 phần tử
    ChangeColor(i32, i32, i32), // Tuple-like với 3 phần tử
}</code></pre>
</div>
<p>Các variant có thể chứa:</p>
<ul>
  <li><strong>Quit:</strong> Không có dữ liệu</li>
  <li><strong>Move:</strong> Có named fields như struct</li>
  <li><strong>Write:</strong> Chứa một String</li>
  <li><strong>ChangeColor:</strong> Chứa ba giá trị i32</li>
</ul>

<h3 class="task-heading">So sánh Enum với Struct</h3>
<p>Định nghĩa enum với các variant như trên tương tự như định nghĩa các struct khác nhau, ngoại trừ việc enum không dùng từ khóa <code>struct</code> và tất cả các variant được nhóm lại dưới một kiểu <code>Message</code>. Các struct sau đây có thể lưu trữ dữ liệu tương tự như các variant của enum:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct QuitMessage; // unit struct
struct MoveMessage {
    x: i32,
    y: i32,
}
struct WriteMessage(String); // tuple struct
struct ChangeColorMessage(i32, i32, i32); // tuple struct</code></pre>
</div>
<p>Nhưng nếu dùng các struct khác nhau như vậy, mỗi struct sẽ có kiểu riêng, và ta không thể dễ dàng định nghĩa một hàm nhận bất kỳ loại message nào như khi dùng enum Message!</p>

<h3 class="task-heading">Methods trên Enum</h3>
<p>Giống như Struct, bạn có thể định nghĩa các method cho Enum bằng <code>impl</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Message {
    fn call(&self) {
        // method body would be defined here
    }
}

let m = Message::Write(String::from("hello"));
m.call();</code></pre>
</div>

<h3 class="task-heading">Option&lt;T&gt; trong thư viện chuẩn Rust</h3>
<p>Enum <code>Option&lt;T&gt;</code> được định nghĩa sẵn trong thư viện chuẩn (prelude), bạn không cần import:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Option&lt;T&gt; {
    None,
    Some(T),
}</code></pre>
</div>
<p>Các variants <code>Some</code> và <code>None</code> cũng được include trong prelude, nên bạn có thể dùng trực tiếp mà không cần viết <code>Option::</code></p>

<p><code>&lt;T&gt;</code> là một tính năng của Rust mà chúng ta chưa nói đến - đó là <strong>generic type parameter</strong> (tham số kiểu generic). Nói đơn giản, <code>&lt;T&gt;</code> có nghĩa là variant <code>Some</code> có thể chứa dữ liệu của bất kỳ kiểu nào, và mỗi kiểu cụ thể thay thế cho T sẽ tạo ra một kiểu Option&lt;T&gt; khác nhau.</p>

<p>Dưới đây là ví dụ sử dụng Option với các kiểu dữ liệu khác nhau:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let some_number = Some(5);
let some_char = Some('e');

let absent_number: Option&lt;i32&gt; = None;</code></pre>
</div>
<p>Kiểu của <code>some_number</code> là <code>Option&lt;i32&gt;</code>. Kiểu của <code>some_char</code> là <code>Option&lt;char&gt;</code>, là hai kiểu khác nhau. Rust có thể suy ra các kiểu này vì chúng ta đã chỉ định giá trị bên trong variant Some. Với <code>absent_number</code>, Rust yêu cầu ta phải khai báo kiểu Option rõ ràng: vì compiler không thể suy ra kiểu mà variant Some sẽ chứa chỉ từ giá trị None.</p>

<h3 class="task-heading">Tại sao Option&lt;T&gt; an toàn hơn null?</h3>
<p>Vì Option&lt;T&gt; và T (bất kỳ kiểu nào) là các kiểu KHÁC NHAU, compiler sẽ không cho phép bạn sử dụng Option&lt;T&gt; như một giá trị thông thường. Ví dụ code sau sẽ KHÔNG compile được:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x: i8 = 5;
let y: Option&lt;i8&gt; = Some(5);

let sum = x + y; // LỖI COMPILE!</code></pre>
</div>
<p>Khi compile sẽ báo lỗi:</p>
<pre><code>error[E0277]: cannot add Option to i8
  |
5 |     let sum = x + y;
  |                 ^ no implementation for i8 + Option
</code></pre>
<p>Compiler báo lỗi vì không thể cộng i8 với Option&lt;i8&gt;. Bạn phải xử lý trường hợp None trước khi sử dụng giá trị. Điều này ngăn chặn vấn đề null phổ biến trong các ngôn ngữ khác!</p>

<p>Vấn đề với giá trị null là khi bạn cố sử dụng một giá trị null như thể nó không phải null, bạn sẽ gặp lỗi nào đó. Vì tính chất null hay không-null phổ biến khắp nơi, rất dễ để mắc phải loại lỗi này.</p>

<p>Tuy nhiên, khái niệm mà null đang cố biểu đạt vẫn hữu ích: null là một giá trị hiện tại không hợp lệ hoặc vắng mặt vì một lý do nào đó. Vấn đề không thực sự nằm ở khái niệm mà ở cách triển khai cụ thể. Do đó, Rust không có null, nhưng có một enum có thể biểu đạt khái niệm giá trị có mặt hoặc vắng mặt - đó là Option&lt;T&gt;.</p>

<p>Khi có giá trị Some, ta biết có giá trị hợp lệ bên trong. Khi có None, về mặt khái niệm nó giống như null: không có giá trị hợp lệ. Nhưng với Option&lt;T&gt;, compiler bắt buộc ta phải xử lý cả hai trường hợp trước khi sử dụng.</p>

<p>Nói tóm lại, để sử dụng một giá trị Option&lt;T&gt;, bạn cần code xử lý từng variant. Bạn muốn một đoạn code chỉ chạy khi có giá trị Some(T), và đoạn code khác chạy khi có None. Cấu trúc điều khiển <code>match</code> làm được điều này với enums - nó sẽ chạy code khác nhau tùy thuộc vào variant nào của enum, và code đó có thể sử dụng dữ liệu bên trong giá trị khớp.</p>

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
