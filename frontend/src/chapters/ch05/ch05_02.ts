import { Lesson } from '../../courses';

export const ch05_02: Lesson = {
            id: 'ch05-02',
            title: '5.2 Debug và In ấn Structs',
            duration: '35 phút',
            type: 'practice',
            content: `
<p>Để thực sự hiểu cách hoạt động của structs khi chúng ta code thật, hãy tạo ra một ứng dụng nhỏ để tính diện tích của một hình chữ nhật! Chúng ta cũng sẽ khám phá cách mà những built-in traits của Rust giúp việc in struct ra console trở nên dễ dàng hơn.</p>

<p>Với các biến truyền thống, để tính diện tích ta phải truyền các tham số và nhận giá trị trả về.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let width1 = 30;
    let height1 = 50;
    println!("The area of the rectangle is {} square pixels.", area(width1, height1));
}

fn area(width: u32, height: u32) -> u32 {
    width * height
}</code></pre>
</div>
<p>Hàm <code>area(width: u32, height: u32) -> u32</code> ở trên có vấn đề: các tham số không có mối liên kết trực tiếp với mục đích của hàm (tính diện tích) mà thay vào đó truyền 2 biến rời rạc. Vấn đề này có thể được giải quyết bằng cách sử dụng Struct <code>Rectangle</code>!</p>

<h3 class="task-heading">Cấu trúc hóa đoạn mã với Struct</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("The area of the rectangle is {} square pixels.", area(&rect1));
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}</code></pre>
</div>
<p>Trong phiên bản struct, hàm tính diện tích được định nghĩa là <code>area(rectangle: &Rectangle) -> u32</code> với chỉ một đối số. Thay vì truyền giá trị sở hữu, chúng ta nên truyền tham chiếu <strong>borrowing</strong> đến Instance đó. Cách này không làm mất quyền sở hữu và cũng rất dễ dàng. (Chỉ cần dùng immutable borrow là đủ vì không cần thay đổi gì!).</p>

<h3 class="task-heading">Vấn đề khi in Struct ra Console</h3>
<p>Hãy cùng thử xem liệu chúng ta có thể in trực tiếp cấu trúc <code>Rectangle</code> ra <code>println!</code> không nhé.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Rectangle {
    width: u32,
    height: u32,
}
fn main() {
    let rect1 = Rectangle { width: 30, height: 50, };
    println!("rect1 is {}", rect1); // LỖI COMPILE!!!!!
}</code></pre>
</div>
<p>Lỗi này là vì <code>println!</code> sử dụng format <code>Display</code> nhưng mặc định không hỗ trợ việc in struct (đơn giản vì Rust không biết bạn muốn in struct như thế nào). Giải pháp là sử dụng format <strong>Debug <code>{:?}</code></strong> thay vì Display.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>println!("rect1 is {:?}", rect1); // Vẫn bị lỗi xíu xiu!</code></pre>
</div>
<p>Vì trait Debug không được tự động enable, để struct có thể in được ở chế độ Debug trong Rust, ta cần phải thêm <strong>derive attribute</strong>. Rất đơn giản, chỉ cần thêm <code>#[derive(Debug)]</code> ngay trước khai báo struct!</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    println!("rect1 is {:?}", rect1); // In kết quả chuẩn: "rect1 is Rectangle { width: 30, height: 50 }"
    println!("rect1 is {:#?}", rect1); // In cực chuẩn với dòng lệnh siêu bảnh xuống dòng cho từng property.
}</code></pre>
</div>

<h3 class="task-heading">Sức mạnh của Macro dbg!</h3>
<p>Khi bạn cần in giá trị để debug ngay trong dòng code mà thấy gõ <code>println!</code> mất thời gian, bạn sẽ rất thích macro <code>dbg!</code>. Nó sẽ in ra (standard error console stream) giá trị gốc + VỊ TRÍ DÒNG CODE đó. Điểm mạnh là không giống <code>println!</code> - thứ lấy reference - <code>dbg!</code> lại nhận Ownership và trả lại y chang Ownership về chỗ cũ sau khi chạy.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle { width: u32, height: u32 }

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale), // dbg! trả lại kết quả để sử dụng (30*2=60)
        height: 50,
    };
    dbg!(&rect1); // Dùng tham chiếu để không mất Ownership của rect1
}</code></pre>
</div>
<div class="cyber-alert info">
  <strong>Về output:</strong> <code>dbg!</code> xuất hiện dưới dạng <code>[src/main.rs:7] 30 * scale = 60</code> trong console. Rất hữu ích cho việc debug!
</div>

<h3 class="task-heading">Tìm hiểu sâu hơn về Derive Macros</h3>
<p>Khi sử dụng <code>#[derive(...)]</code>, Rust sẽ tự động implement các trait cơ bản cho struct của bạn. Đây là một số trait phổ biến có thể derive:</p>

<ul>
  <li><code>Debug</code> - Cho phép in debug ra console</li>
  <li><code>PartialEq</code> - Cho phép so sánh bằng (<code>==</code>, <code>!=</code>)</li>
  <li><code>Eq</code> - Cho phép so sánh bằng bắc cầu (transitive equality)</li>
  <li><code>PartialOrd</code> - Cho phép so sánh lớn nhỏ (<code>&lt;</code>, <code>&gt;</code>, etc.)</li>
  <li><code>Ord</code> - Cho phép sắp xếp (sorting)</li>
  <li><code>Clone</code> - Cho phép deep copy</li>
  <li><code>Copy</code> - Cho phép shallow copy (chỉ dành cho kiểu đơn giản)</li>
  <li><code>Default</code> - Cho phép tạo instance với giá trị mặc định</li>
</ul>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle::default();
    let rect2 = rect1; // Copy (không di chuyển!)

    println!("rect1 == rect2: {}", rect1 == rect2);
}</code></pre>
</div>

<h3 class="task-heading">So sánh Display vs Debug</h3>
<table class="comparison-table">
  <thead>
    <tr>
      <th>Trait</th>
      <th>Cú pháp</th>
      <th>Mục đích</th>
      <th>Yêu cầu</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Display</td>
      <td><code>{}</code></td>
      <td>In ra người dùng đọc được</td>
      <td>Phải tự implement</td>
    </tr>
    <tr>
      <td>Debug</td>
      <td><code>{:?}</code> hoặc <code>{:#?}</code></td>
      <td>In ra developer debug</td>
      <td>Có thể derive</td>
    </tr>
  </tbody>
</table>

<p>Để tự implement Display, bạn cần sử dụng <code>impl std::fmt::Display for YourStruct</code>. Điều này sẽ được hướng dẫn chi tiết hơn trong các chương nâng cao.</p>
`,
            defaultCode: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };
    let rect3 = Rectangle { width: 60, height: 45 };

    println!("rect1: {:?}", rect1);
    println!("Diện tích rect1: {}", area(&rect1));
    println!("Diện tích rect2: {}", area(&rect2));
    println!("Diện tích rect3: {}", area(&rect3));
}

fn area(rect: &Rectangle) -> u32 {
    rect.width * rect.height
}
`,
            expectedOutput: 'rect1: Rectangle { width: 30, height: 50 }\nDiện tích rect1: 1500\nDiện tích rect2: 400\nDiện tích rect3: 2700'
        };
