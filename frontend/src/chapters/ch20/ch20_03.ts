import { Lesson } from '../../courses';

export const ch20_03: Lesson = {
            id: '20-03',
            title: '20.3 Advanced Types và Macros',
            duration: '40 phút',
            type: 'theory',
            content: `
<h3 class="task-heading">Type Safety và Abstraction với Newtype Pattern</h3>
<p>Phần này giả định bạn đã đọc phần trước "Implementing External Traits with the Newtype Pattern". Newtype pattern cũng hữu ích cho các tác vụ ngoài những gì chúng ta đã thảo luận, bao gồm tĩnh đảm bảo rằng các giá trị không bao giờ bị nhầm lẫn và chỉ ra các đơn vị của một giá trị. Bạn đã thấy một ví dụ về việc sử dụng newtypes để chỉ ra đơn vị trong Listing 20-16: Nhớ rằng các structs Millimeters và Meters bọc các giá trị u32 trong một newtype. Nếu chúng ta viết một function với một parameter có kiểu Millimeters, chúng ta sẽ không thể biên dịch một chương trình vô tình cố gắng gọi function đó với một giá trị có kiểu Meters hoặc một u32 đơn thuần.</p>

<p>Chúng ta cũng có thể sử dụng newtype pattern để trừu tượng hóa một số implementation details của một type: Type mới có thể expose một public API khác với API của inner type private.</p>

<p>Newtypes cũng có thể hide internal implementation. Ví dụ, chúng ta có thể cung cấp một People type để bọc một HashMap&lt;i32, String&gt; lưu trữ ID của một person liên kết với tên của họ. Code sử dụng People sẽ chỉ tương tác với public API mà chúng ta cung cấp, chẳng hạn như một method để thêm một string name vào People collection; code đó không cần biết rằng chúng ta gán một i32 ID cho names nội bộ. Newtype pattern là một cách nhẹ để đạt được encapsulation để hide implementation details.</p>

<h3 class="task-heading">Type Synonyms và Type Aliases</h3>
<p>Rust cung cấp khả năng khai báo một type alias để đặt cho một type hiện có một tên khác. Ví dụ, chúng ta có thể tạo alias Kilometers thành i32 như sau:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>type Kilometers = i32;</code></pre>
</div>

<p>Bây giờ alias Kilometers là một đồng nghĩa cho i32; không giống như các types Millimeters và Meters chúng ta đã tạo trong Listing 20-16, Kilometers không phải là một type mới, riêng biệt. Các giá trị có kiểu Kilometers sẽ được đối xử giống như các giá trị có kiểu i32:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>type Kilometers = i32;

let x: i32 = 5;
let y: Kilometers = 5;

println!("x + y = {}", x + y);</code></pre>
</div>

<p>Vì Kilometers và i32 là cùng một kiểu, chúng ta có thể cộng các giá trị của cả hai kiểu và có thể truyền các giá trị Kilometers cho các functions nhận parameters i32.</p>

<p>Use case chính cho type synonyms là để giảm sự lặp lại. Ví dụ, chúng ta có thể có một kiểu dài như Box&lt;dyn Fn() + Send + 'static&gt;</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>type Thunk = Box&lt;dyn Fn() + Send + 'static&gt;;

let f: Thunk = Box::new(|| println!("hi"));

fn takes_long_type(f: Thunk) {
    // --snip--
}

fn returns_long_type() -> Thunk {
    // --snip--
}</code></pre>
</div>

<p>Type aliases cũng thường được sử dụng với Result&lt;T, E&gt; để giảm sự lặp lại. Xem xét std::io module trong thư viện chuẩn. Các operations I/O thường trả về Result&lt;T, E&gt; để xử lý các tình huống khi operations thất bại. Thư viện này có std::io::Error struct đại diện cho tất cả các I/O errors có thể.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>type Result&lt;T&gt; = std::result::Result&lt;T, std::io::Error&gt;;</code></pre>
</div>

<h3 class="task-heading">The Never Type That Never Returns</h3>
<p>Rust có một kiểu đặc biệt tên là ! được biết trong lý thuyết kiểu như empty type vì nó không có giá trị. Chúng ta thích gọi nó là never type vì nó đứng thay cho return type khi một function sẽ không bao giờ return. Đây là một ví dụ:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn bar() -> ! {
    // --snip--
}</code></pre>
</div>

<p>Đọc code này là "function bar returns never". Các functions return never được gọi là diverging functions. Chúng ta không thể tạo các giá trị của type !, nên bar không thể nào return.</p>

<p>Nhưng một type mà bạn không thể tạo giá trị có ích gì? Nhớ lại code từ Listing 2-5, một phần của number-guessing game:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue,
};</code></pre>
</div>

<p>Continue có một giá trị !. Tức là, khi Rust tính toán kiểu của guess, nó nhìn cả hai match arms, cái trước với giá trị u32 và cái sau với giá trị !. Vì ! không thể có giá trị, Rust quyết định rằng kiểu của guess là u32.</p>

<p>Never type hữu ích với panic! macro. Recall unwrap function mà chúng ta gọi trên Option&lt;T&gt; values để tạo một giá trị hoặc panic:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl&lt;T&gt; Option&lt;T&gt; {
    pub fn unwrap(self) -> T {
        match self {
            Some(val) => val,
            None => panic!("called \`Option::unwrap()\` on a \`None\` value"),
        }
    }
}</code></pre>
</div>

<p>Một expression cuối cùng có type ! là một loop:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>print!("forever ");

loop {
    print!("and ever ");
}</code></pre>
</div>

<p>Ở đây, loop không bao giờ kết thúc, nên ! là giá trị của expression.</p>

<h3 class="task-heading">Dynamically Sized Types và the Sized Trait</h3>
<p>Rust cần biết một số chi tiết về các kiểu của nó, chẳng hạn như bao nhiêu bộ nhớ để cấp phát cho một giá trị của một kiểu cụ thể. Điều này để lại một góc hơi confuse của hệ thống kiểu: khái niệm về dynamically sized types. Đôi khi được gọi là DSTs hoặc unsized types, các kiểu này cho phép chúng ta viết code sử dụng các giá trị mà kích thước của chúng chúng ta chỉ có thể biết tại runtime.</p>

<p>Hãy đi sâu vào chi tiết của một dynamically sized type gọi là str, mà chúng ta đã sử dụng xuyên suốt cuốn sách. Đúng vậy, không phải &str, mà là str một mình, là một DST.</p>

<p>Chúng ta không thể tạo một biến có kiểu str, cũng không thể lấy một argument có kiểu str. Xem xét code sau, không hoạt động:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Mã này không biên dịch được!]
let s1: str = "Hello there!";
let s2: str = "How's it going?";</code></pre>
</div>

<p>Vậy chúng ta làm gì? Trong trường hợp này, bạn đã biết câu trả lời: Chúng ta làm cho kiểu của s1 và s2 thành string slices (&amp;str) thay vì str. Nhớ rằng slice data structure chỉ lưu trữ vị trí bắt đầu và độ dài của slice.</p>

<p>Quy tắc vàng của dynamically sized types là chúng ta phải luôn đặt các giá trị của dynamically sized types đằng sau một pointer nào đó.</p>

<p>Chúng ta có thể kết hợp str với tất cả các loại pointers: ví dụ, Box&lt;str&gt; hoặc Rc&lt;str&gt;. Thực tế, bạn đã thấy điều này trước đây nhưng với một dynamically sized type khác: traits. Mỗi trait là một dynamically sized type mà chúng ta có thể tham chiếu bằng cách sử dụng tên của trait. Để sử dụng traits như trait objects, chúng ta phải đặt chúng đằng sau một pointer, chẳng hạn như &amp;dyn Trait hoặc Box&lt;dyn Trait&gt;.</p>

<p>Để làm việc với DSTs, Rust cung cấp Sized trait để xác định liệu kích thước của một kiểu có được biết tại compile time hay không. Trait này được tự động implement cho mọi thứ có kích thước được biết tại compile time. Ngoài ra, Rust ngầm thêm một bound trên Sized cho mọi generic function.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn generic&lt;T: Sized&gt;(t: T) {
    // --snip--
}</code></pre>
</div>

<p>Tuy nhiên, bạn có thể sử dụng cú pháp đặc biệt sau để thư giãn hạn chế này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn generic&lt;T: ?Sized&gt;(t: &amp;T) {
    // --snip--
}</code></pre>
</div>

<p>Một trait bound trên ?Sized có nghĩa là "T có thể hoặc không thể Sized", và ký hiệu này ghi đè mặc định rằng các generic types phải có kích thước được biết tại compile time.</p>

<h3 class="task-heading">Macros</h3>
<p>Macros là một dạng metaprogramming — viết code tạo ra code. Rust có 2 loại: declarative macros và procedural macros.</p>

<h4 class="task-heading">Declarative Macros (macro_rules!)</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}</code></pre>
</div>

<h4 class="task-heading">Procedural Macros</h4>
<p>3 loại:</p>
<ul>
  <li><strong>Custom derive</strong>: <code>#[derive(MyMacro)]</code></li>
  <li><strong>Attribute-like</strong>: <code>#[route(GET, "/")]</code></li>
  <li><strong>Function-like</strong>: <code>sql!(SELECT * FROM users)</code></li>
</ul>

<div class="cyber-alert info">
  <strong>Macros vs Functions:</strong> Macros hoạt động trên <em>syntax tree</em> tại compile time. Chúng có thể nhận số lượng tham số không cố định (<code>println!</code>) và tạo code mới.
</div>

<h3 class="task-heading">Chúc mừng! 🎉</h3>
<p>Bạn đã hoàn thành toàn bộ 20 chương của "The Rust Programming Language"! Đây là nền tảng vững chắc để bắt đầu xây dựng các dự án Rust thực tế.</p>
`,
            defaultCode: `// Advanced Types Examples

// Type Alias
type Kilometers = i32;
type Thunk = Box<dyn Fn() + Send + 'static>;

// Never Type - functions that never return
fn diverge() -> ! {
    panic!("This function never returns!");
}

// Never type in match - continue has type !
fn example_never_type() {
    let guess: u32 = match "5".trim().parse() {
        Ok(num) => num,
        Err(_) => continue, // continue has type !
    };
}

// Dynamically Sized Type - str behind a pointer
fn example_dst() {
    let s: &str = "Hello, world!"; // &str = pointer to str
    println!("String slice: {s}");
}

// Generic with ?Sized
fn generic_function<T: ?Sized>(item: &T) {
    println!("Got: {item:?}");
}

// Newtype Pattern
struct Millimeters(u32);
struct Meters(u32);

impl Meters {
    fn to_millimeters(&self) -> Millimeters {
        Millimeters(self.0 * 1000)
    }
}

// Macros
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

macro_rules! say_hello {
    () => { println!("Hello!"); };
    ($name:expr) => { println!("Hello, {}!", $name); };
}

fn main() {
    // Type alias
    let distance: Kilometers = 100;
    println!("Distance: {} km", distance);

    // Never type
    // diverge(); // Would panic!

    // DST
    let s = "Hello, Rust!";
    println!("DST: {s}");

    // Generic with ?Sized
    let v = vec![1, 2, 3];
    generic_function(&v);

    // Newtype
    let m = Meters(2);
    let mm = m.to_millimeters();
    println!("2 meters = {} mm", mm.0);

    // Macros
    say_hello!();
    say_hello!("World");

    println!("\\n🎉 Hoan thanh Chuong 20!");
}
`,
            expectedOutput: `Distance: 100 km
DST: Hello, Rust!
2 meters = 2000 mm
Hello!
Hello, World!

🎉 Hoan thanh Chuong 20!`
        };
