import { Chapter } from '../courses';

export const ch06: Chapter = {
    id: 'ch06',
    title: 'Chương 6: Enums và Pattern Matching',
    lessons: [
        {
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
        },
        {
            id: 'ch06-02',
            title: '6.2 Sức mạnh của match Control Flow',
            duration: '40 phút',
            type: 'practice',
            content: `
<p>Rust có một cấu trúc điều khiển luồng (Control flow construct) cực kì mạnh tên là <strong>match</strong>. Nó so sánh đối sánh giá trị của mình với một loạt các pattern khác và dùng code bên trong pattern tương đồng. Pattern được cung cấp có thể là literal, có thể là biến variable bình thường, wildcard,... Bạn có thể coi nó tương tự như bộ định tuyến tiền đúc (Coin Sorting Machine), nếu kích thước của tiền xu nào thả vào mà vừa vặn nhất cho nó, xu đó rớt vô chiếc rổ đó. Máy compile sẽ đi kiểm tra MỌI CÂU CHI TIẾT TỪ TRÊN XUỐNG DƯỚI nếu thấy trúng phóc thì chạy, ko trúng phóc thì xuống pattern tiếp.</p>

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

<h3 class="task-heading">Giải Phóng Value bằng Match đối với Data Enum</h3>
<p>Điểm đáng sợ và mạnh chà bá của Match là mình có thể xài nó để Extract nốt các Data đang mắc kẹt nùi trong Variant của Enum.</p>
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
    Quarter(UsState), // Bây giờ Quarter nó nắm môt cái data UsState
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => { // Pattern bắt lấy cục state đem ra rút ruột và in
            println!("Quater này có nắm state là {:?}", state);
            25
        }
    }
}</code></pre>
</div>

<h3 class="task-heading">Matching cho Option&lt;T&gt;</h3>
<p>Như nãy mình có bàn thì Option&lt;T&gt; giấu giá trị của T vào bên trong Variant <code>Some</code>, do đó để rút value ra thì cái Match giải quyết cái rột!!!</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn plus_one(x: Option&lt;i32&gt;) -> Option&lt;i32&gt; {
    match x {
        None => None, // Nếu x truyền vào rỗng thì return nguyên bộ none
        Some(i) => Some(i + 1), // Nếu Some có value i32, tao bắt giá trị biến đó làm param cho i, rồi cộng i+1 sau đó nhét nó lại thành một Variant Some(i+1)
    }
}

let five = Some(5);
let six = plus_one(five); // ra Some(6)
let none = plus_one(None); // ra None
</code></pre>
</div>
<div class="cyber-alert info">
  <strong>Ghi nhớ siêu to khổng lồ của Option Match:</strong> Rust <strong>KHÔNG CHO PHÉP XÓT.</strong> Nếu bạn <code>match</code> một biến Option&lt;T&gt; mà quên không định nghĩa cái pattern Catch cho <code>None =&gt;</code>, Máy Compiler auto ERROR sập cấm Biên Dịch. Rust đã đánh hơi việc nếu ko có <code>None =&gt;</code> thì sẽ gây ra NullPtrError (thứ đã huỷ diệt tỷ đôla) ở runtime!!!!
</div>

<h3 class="task-heading">Pattern Catch-All</h3>
<p>Khi mà những biến mình ko cần check (nhiều quá). Tụi mình được quyền gom lại thành cái pattern bắt tụi còn dư (Catch-all) bằng việc đặt cho cái còn lại một cái tên rồi chạy nó ở Cuối Cùng. (Để ko cần xài lại biến dư - ta ghi bằng <code>_</code> Placeholder để vứt nó đi).</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let dice_roll = 9; // Biến xí ngầu
match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    other => move_player(other), // nếu tui roll ra số 9, nó sẽ gọi move_player(9)
    // _ => reroll_dice(), // nếu tao ko cần xài số dư kia tui gán biến vô danh _ (tránh compiler error)
    // _ => (), // Nếu tụi bây muốn những con số kì lạ (không phải 3-7) bị bỏ rơi, trả về hàm () vô danh!
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
        },
        {
            id: 'ch06-03',
            title: '6.3 Cú pháp siêu tắt: if let',
            duration: '15 phút',
            type: 'practice',
            content: `
<p>Cú pháp kiểm soát <code>if let</code> là chiếc phao cứu sinh ngắn gọn nhất để giúp mấy ông lười code có thể xài <code>match</code> mà chỉ muốn match ra MỘT TRƯỜNG HỢP DUY NHẤT và bắt lại Data của cái duy nhất đó (bỏ qua mặc kệ các Variant còn dư).</p>

<h3 class="task-heading">Vì sao ra đời if let</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let config_max = Some(3u8);
match config_max {
    Some(max) => println!("The maximum is configured to be {max}"),
    _ => (), // NẾU CHỈ CẦN XÀI DÒNG TRÊN, THẾ NHÉT DÒNG NÀY ĐỂ PASS COMPILER QUÁ TỐN KÉM CHỖ VÀ LÀM RỐI
}</code></pre>
</div>

<p>Đúng thế! Ta đã phải khai <code>_ =&gt; ()</code> để vui lòng cái gã Compiler. Nếu chúng ta dùng <strong><code>if let</code></strong> cấu trúc sẽ được tối ưu!</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let config_max = Some(3u8);
if let Some(max) = config_max {
    println!("The maximum is configured to be {max}");
}</code></pre>
</div>

<p>Cú pháp của <code>if let</code> cần một cái Pattern ở đầu, sau đó là dấu phẩy <code>=</code> và Expression ở đuôi . Cú pháp hoạt động y chang như một cái <code>match</code> có expression được tuôn từ nhánh đầu, nhưng nó chỉ chạy nếu nhánh đó khớp. Còn lại nó sẽ bỏ đi bỏ qua các phiền toái Exhaustive Checking (kiểm tra ngặt nghèo các variant còn dư từ compiler).</p>

<h3 class="task-heading">if let với else</h3>
<p>Nếu bạn muốn bắt nhánh phụ rớt khi không lọt vào nhánh lớn chính, ta hoàn toàn có thể append vào bằng block <code>else</code> thần thánh.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let coin = Coin::Quarter(UsState::Alabama);
let mut count = 0;
if let Coin::Quarter(state) = coin { // Match trúng thì xử lý state ở đây (do coin là Quarter)
    println!("Dữ liệu state lấy ra ở trong quarter: {:?}!", state);
} else { // Không vô thì nhảy xuống đếm cho biến counter!
    count += 1;
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Khi nào dùng if let?</strong> Khi logic chương trình của bạn cô đọng mà chả cần xử lý quá nhiều logic rườm rà. Bạn trade an toàn exhaustive control check của <code>match</code> để lấy sự súc tích code cho <code>if let</code>.
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
