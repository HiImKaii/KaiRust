import { Lesson } from '../../courses';

export const ch06_01: Lesson = {
            id: 'ch06-01',
            title: '6.1 Định nghĩa Enum',
            duration: '40 phút',
            type: 'theory',
            content: `
<p>Trong khi các struct đóng gói đống dữ liệu riêng lẻ liên kết lại với nhau thì <strong>Enums</strong> (viết tắt của <em>enumerations</em>) cho phép bạn liệt kê ra các trường hợp (variants) có thể có của một giá trị. Đây là một chức năng cực kì xịn xò của Rust mà nhiều ngôn ngữ khác không có (hoặc có nhưng không mạnh bằng).</p>

<p>Hãy xem một ví dụ mà chúng ta phải khai báo địa chỉ IP. Hiện tại thì chuẩn IP đang dùng có hai loại (variant): IPv4 hoặc IPv6. Không có lựa chọn khác cho một địa chỉ IP, thêm vào đó, địa chỉ không thể nào mang 2 loại cùng một lúc!</p>

<h3 class="task-heading">Cơ bản về định nghĩa Enum</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum IpAddrKind {
    V4,
    V6,
}</code></pre>
</div>
<p>Bây giờ thì giá trị <code>IpAddrKind::V4</code> và <code>IpAddrKind::V6</code> đều là các type của <code>IpAddrKind</code>. Ta có thể xài nó làm parameter hoặc variable.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let four = IpAddrKind::V4;
let six = IpAddrKind::V6;

fn route(ip_kind: IpAddrKind) { }
route(IpAddrKind::V4); // Hàm chấp nhận bất kì variant nào</code></pre>
</div>

<h3 class="task-heading">Tích hợp Data vào trong Variant của Enum</h3>
<p>Nghĩ kĩ hơn về địa chỉ IP. Nếu ta xài struct thì mình phải làm ra hai cột là loại và type.</p>
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
<p>Nhưng đây đúng là dư thừa khi dùng code của Rust ngầu hơn rất nhiều: chúng ta có quyền ép Data chực tiếp vô từng khía cạnh variant trong Enum mà ko cần phải tốn công setup một bảng Struct riêng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum IpAddr {
    V4(String), // Khai báo luôn V4 là một object nắm data kiểu String
    V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));</code></pre>
</div>
<p>Điểm lộng lẫy nhất của tính năng nhúng Data vào bên trong variant của Enum là <strong>Mỗi variant được tuỳ nghi nắm một loại data có Type và số lượng hoàn toàn khác nhau</strong>. Chẳng hạng IPv4 là tập hợp của 4 mảng <code>u8</code> từ 0-255, vậy ta sẽ gán cho V4 một Tuple nắm 4 ô u8, trong khi gán chuỗi String cho V6!</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));</code></pre>
</div>

<h3 class="task-heading">Methods ở trên Enum</h3>
<p>Sốc chưa? Bạn còn có quyền nhúng hàm <code>impl</code> vô Enum như mình từng làm với Struct - với sức mạnh có thể gọi hàm từ bất cứ Variant được phát ra nào.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Message {
    Quit,
    Move { x: i32, y: i32 }, // như cái struct bthg
    Write(String), // Tuple kiểu
    ChangeColor(i32, i32, i32), // Giống trên
}

impl Message {
    fn call(&self) {
        // do something inside!
    }
}

let m = Message::Write(String::from("hello"));
m.call();</code></pre>
</div>

<h3 class="task-heading">Kiểu siêu đẳng Option&lt;T&gt; (Lệnh Cấm Xài Null của Rust!!)</h3>
<p>Trong các dòng ngôn ngữ phổ biến bạn từng xài, khái niệm <code>null</code> là một thứ rất đỗi rác rưởi - nó ám chỉ biến đó rỗng. Bác Tony Hoare cha đẻ khái niệm Null năm 1965 đã gọi phát minh ra Null của mình là <strong>"Sai lầm tỉ đôla"</strong>. Bạn sẽ hay gặp lỗi chương trình bị sập khi ngốc ngếch lôi một giá trị tưởng là có Data nhưng thực ra là <code>null</code>.</p>

<p>Rust giải quyết lỗi Tỷ Đô này bằng cách đấm chết Null! Không có null. Thay vào đó, Rust tự định nghĩa sẵn vào trong core chuẩn của engine bằng một Enum tên là <code>Option&lt;T&gt;</code> (nắm giữ hai Variant là Some - nắm 1 giá trị của T, hoặc None - Rỗng - không tồn tại).</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Option&lt;T&gt; {
    None,
    Some(T),
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Về mặt bản tính, tại sao Option&lt;T&gt; tuyệt vời hơn null?</strong> Option&lt;T&gt; đại diện cho một Kiểu mà có khi sẽ có giá trị và có khi sẽ bị rỗng. Khi bạn xài một type T thông thường (chẳng hạn u8). Rust máy compiler hiểu và tự tin 100% rắng kiểu T sẽ có một value đúng đắn. Nhưng một khi dùng Option&lt;T&gt;, mọi sự tự tin biến mất, lúc này đây trình compiler Rust BẮT BẠN PHẢI CHECK XEM CÓ GIÁ TRỊ KHÔNG TRƯỚC KHI RÚT VALUE BÊN TRONG RA XÀI! Điều này diệt Null dứt điểm và triệt để tận nguồn!
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
        };
