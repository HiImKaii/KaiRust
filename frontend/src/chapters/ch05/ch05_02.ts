import { Lesson } from '../../courses';

export const ch05_02: Lesson = {
  id: 'ch05-02',
  title: '5.2 Ví dụ về Structs',
  duration: '35 phút',
  type: 'theory',
  content: `
<p>Để hiểu khi nào chúng ta có thể muốn sử dụng structs, hãy viết một chương trình tính diện tích của một hình chữ nhật. Chúng ta sẽ bắt đầu bằng cách sử dụng các biến đơn lẻ và sau đó tái cấu trúc chương trình cho đến khi chúng ta sử dụng structs.</p>

<p>Hãy tạo một binary project mới với Cargo tên là <em>rectangles</em> sẽ lấy chiều rộng và chiều cao của một hình chữ nhật được chỉ định bằng pixels và tính diện tích của hình chữ nhật. Listing 5-8 cho thấy một chương trình ngắn với một cách để làm điều đó chính xác trong <em>src/main.rs</em> của project.</p>

<p><strong>Filename: src/main.rs</strong></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let width1 = 30;
    let height1 = 50;

    println!(
        "The area of the rectangle is {} square pixels.",
        area(width1, height1)
    );
}

fn area(width: u32, height: u32) -> u32 {
    width * height
}</code></pre>
</div>

<p><strong>[Listing 5-8](#listing-5-8): Tính diện tích hình chữ nhật được chỉ định bằng các biến width và height riêng biệt</strong></p>

<p>Bây giờ, hãy chạy chương trình này bằng <code>cargo run</code>:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling rectangles v0.1.0 (file:///projects/rectangles)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.42s
     Running \`target/debug/rectangles\`
The area of the rectangle is 1500 square pixels.</code></pre>
</div>

<p>Code này đã thành công trong việc tính diện tích hình chữ nhật bằng cách gọi function <code>area</code> với mỗi kích thước, nhưng chúng ta có thể làm thêm để làm cho code này rõ ràng và dễ đọc hơn.</p>

<p>Vấn đề với code này được thể hiện rõ trong signature của <code>area</code>:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn area(width: u32, height: u32) -> u32 {
    width * height
}</code></pre>
</div>

<p>Function <code>area</code> được cho là tính diện tích của một hình chữ nhật, nhưng function chúng ta viết có hai tham số, và không rõ ràng ở bất kỳ đâu trong chương trình rằng các tham số có liên quan với nhau. Nó sẽ dễ đọc và dễ quản lý hơn nếu nhóm width và height lại với nhau. Chúng ta đã thảo luận một cách chúng ta có thể làm điều đó trong phần "Tuple Type" của Chương 3: bằng cách sử dụng tuples.</p>

<h3 class="task-heading">Refactoring với Tuples</h3>
<p>Listing 5-9 cho thấy một phiên bản khác của chương trình sử dụng tuples.</p>

<p><strong>Filename: src/main.rs</strong></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let rect1 = (30, 50);

    println!(
        "The area of the rectangle is {} square pixels.",
        area(rect1)
    );
}

fn area(dimensions: (u32, u32)) -> u32 {
    dimensions.0 * dimensions.1
}</code></pre>
</div>

<p><strong>[Listing 5-9](#listing-5-9): Chỉ định chiều rộng và chiều cao của hình chữ nhật bằng một tuple</strong></p>

<div class="cyber-alert info">
<strong>Đánh giá:</strong> Theo một cách nào đó, chương trình này tốt hơn. Tuples cho phép chúng ta thêm một chút cấu trúc, và bây giờ chúng ta chỉ truyền một argument. Nhưng theo một cách khác, phiên bản này kém rõ ràng hơn: Tuples không đặt tên cho các phần tử của chúng, vì vậy chúng ta phải index vào các phần của tuple, làm cho phép tính của chúng ta kém rõ ràng hơn.
</div>

<p>Hoán đổi width và height sẽ không quan trọng cho việc tính diện tích, nhưng nếu chúng ta muốn vẽ hình chữ nhật lên màn hình, nó sẽ quan trọng! Chúng ta sẽ phải nhớ rằng <code>width</code> là tuple index <code>0</code> và <code>height</code> là tuple index <code>1</code>. Điều này sẽ còn khó hơn cho người khác để tìm ra và ghi nhớ nếu họ sử dụng code của chúng ta. Bởi vì chúng ta đã không truyền tải ý nghĩa của dữ liệu trong code, bây giờ dễ dàng hơn để mắc lỗi.</p>

<h3 class="task-heading">Refactoring với Structs</h3>
<p>Chúng ta sử dụng structs để thêm ý nghĩa bằng cách gắn nhãn dữ liệu. Chúng ta có thể transform tuple mà chúng ta đang sử dụng thành một struct với một tên cho toàn bộ cũng như các tên cho các phần, như trong Listing 5-10.</p>

<p><strong>Filename: src/main.rs</strong></p>

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

    println!(
        "The area of the rectangle is {} square pixels.",
        area(&rect1)
    );
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}</code></pre>
</div>

<p><strong>[Listing 5-10](#listing-5-10): Định nghĩa một struct <code>Rectangle</code></strong></p>

<div class="cyber-alert info">
<strong>Giải thích:</strong> Ở đây, chúng ta đã định nghĩa một struct và đặt tên nó là <code>Rectangle</code>. Bên trong dấu ngoặc nhọn, chúng ta định nghĩa các fields là <code>width</code> và <code>height</code>, cả hai đều có kiểu <code>u32</code>. Sau đó, trong <code>main</code>, chúng ta đã tạo một instance cụ thể của <code>Rectangle</code> có chiều rộng là <code>30</code> và chiều cao là <code>50</code>.
</div>

<p>Function <code>area</code> của chúng ta bây giờ được định nghĩa với một tham số, mà chúng ta đã đặt tên là <code>rectangle</code>, có kiểu là một immutable borrow của một instance struct <code>Rectangle</code>. Như đã đề cập trong Chương 4, chúng ta muốn borrow struct thay vì chiếm quyền sở hữu nó. Bằng cách này, <code>main</code> giữ quyền sở hữu của nó và có thể tiếp tục sử dụng <code>rect1</code>, đó là lý do chúng ta sử dụng <code>&</code> trong function signature và nơi chúng ta gọi function.</p>

<p>Function <code>area</code> truy cập các fields <code>width</code> và <code>height</code> của instance <code>Rectangle</code> (lưu ý rằng việc truy cập các fields của một instance struct được borrow không di chuyển các giá trị của fields, đó là lý do tại sao bạn thường thấy các borrows của structs). Signature function của chúng ta cho <code>area</code> bây giờ nói chính xác những gì chúng ta có nghĩa: Tính diện tích của <code>Rectangle</code>, sử dụng các fields <code>width</code> và <code>height</code> của nó. Điều này thể hiện rằng chiều rộng và chiều cao liên quan với nhau, và nó cung cấp các tên mô tả cho các giá trị thay vì sử dụng các giá trị index của tuple là <code>0</code> và <code>1</code>. Đây là một chiến thắng cho sự rõ ràng.</p>

<h3 class="task-heading">Thêm chức năng với Derived Traits</h3>
<p>Sẽ hữu ích nếu có thể in một instance của <code>Rectangle</code> trong khi chúng ta đang debug chương trình và xem các giá trị của tất cả các fields của nó. Listing 5-11 cố gắng sử dụng macro <code>println!</code> như chúng ta đã sử dụng trong các chương trước. Tuy nhiên, điều này sẽ không hoạt động.</p>

<p><strong>Filename: src/main.rs</strong></p>

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

    println!("rect1 is {rect1}");
}</code></pre>
</div>

<p><strong>[Listing 5-11](#listing-5-11): Cố gắng in một instance <code>Rectangle</code></strong></p>

<p>Khi chúng ta compile code này, chúng ta nhận được một lỗi với thông báo lỗi cốt lõi này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>error[E0277]: \`Rectangle\` doesn't implement \`std::fmt::Display\`</code></pre>
</div>

<p>Macro <code>println!</code> có thể làm nhiều loại formatting, và theo mặc định, các dấu ngoặc nhọn bảo <code>println!</code> sử dụng formatting được gọi là <code>Display</code>: output dành cho người dùng cuối trực tiếp sử dụng. Các kiểu primitive mà chúng ta đã thấy cho đến nay triển khai <code>Display</code> theo mặc định vì chỉ có một cách bạn muốn hiển thị <code>1</code> hoặc bất kỳ kiểu primitive nào khác cho người dùng. Nhưng với structs, cách <code>println!</code> nên format output ít rõ ràng hơn vì có nhiều khả năng hiển thị hơn: Bạn có muốn dấu phẩy không? Bạn có muốn in dấu ngoặc nhọn không? Tất cả các fields có nên được hiển thị không? Do sự mơ hồ này, Rust không cố gắng đoán những gì chúng ta muốn, và structs không có implementation được cung cấp của <code>Display</code> để sử dụng với <code>println!</code> và placeholder <code>{}</code>.</p>

<p>Nếu chúng ta tiếp tục đọc các lỗi, chúng ta sẽ tìm thấy ghi chú hữu ích này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>       |                        |\`Rectangle\` cannot be formatted with the default formatter
       |                        | required by this formatting parameter</code></pre>
</div>

<div class="cyber-alert info">
<strong>Mẹo:</strong> Hãy thử đi! Lời gọi macro <code>println!</code> bây giờ sẽ trông như <code>println!("rect1 is {rect1:?}");</code>. Đặt specifier <code>:?</code> bên trong dấu ngoặc nhọn bảo <code>println!</code> chúng ta muốn sử dụng định dạng output được gọi là <code>Debug</code>. Trait <code>Debug</code> cho phép chúng ta in struct của mình theo cách hữu ích cho developers để chúng ta có thể thấy giá trị của nó trong khi đang debug code.
</div>

<p>Hãy compile code với thay đổi này. Ôi! Chúng ta vẫn nhận được một lỗi:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>error[E0277]: \`Rectangle\` doesn't implement \`Debug\`</code></pre>
</div>

<p>Nhưng một lần nữa, compiler đưa cho chúng ta một ghi chú hữu ích:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>       |                        | required by this formatting parameter
       |</code></pre>
</div>

<p>Rust <em>thực sự</em> bao gồm chức năng để in thông tin debug, nhưng chúng ta phải opt-in một cách rõ ràng để làm cho chức năng đó có sẵn cho struct của chúng ta. Để làm điều đó, chúng ta thêm attribute <code>#[derive(Debug)]</code> ngay trước định nghĩa struct, như trong Listing 5-12.</p>

<p><strong>Filename: src/main.rs</strong></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {rect1:?}");
}</code></pre>
</div>

<p><strong>[Listing 5-12</strong>: Thêm attribute để derive trait <code>Debug</code> và in instance <code>Rectangle</code> sử dụng debug formatting</p>

<p>Bây giờ khi chạy chương trình, chúng ta sẽ không nhận được bất kỳ lỗi nào, và chúng ta sẽ thấy output sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling rectangles v0.1.0 (file:///projects/rectangles)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.48s
     Running \`target/debug/rectangles\`
rect1 is Rectangle { width: 30, height: 50 }</code></pre>
</div>

<div class="cyber-alert info">
<strong>Đánh giá:</strong> Tuyệt vời! Nó không phải là output đẹp nhất, nhưng nó hiển thị các giá trị của tất cả các fields cho instance này, điều này chắc chắn sẽ hữu ích trong khi debug. Khi chúng ta có các structs lớn hơn, có output dễ đọc hơn một chút là hữu ích; trong những trường hợp đó, chúng ta có thể sử dụng <code>{:#?}</code> thay vì <code>{:?}</code> trong chuỗi <code>println!</code>.
</div>

<p>Trong ví dụ này, việc sử dụng style <code>{:#?}</code> sẽ output như sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling rectangles v0.1.0 (file:///projects/rectangles)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.48s
     Running \`target/debug/rectangles\`
rect1 is Rectangle {
    width: 30,
    height: 50,
}</code></pre>
</div>

<h3 class="task-heading">Macro dbg!</h3>
<p>Một cách khác để in giá trị sử dụng định dạng <code>Debug</code> là sử dụng macro <code>dbg!</code>, macro này chiếm quyền sở hữu của một expression (không giống như <code>println!</code>, nhận một tham chiếu), in tên file và số dòng nơi lời gọi macro <code>dbg!</code> xảy ra trong code cùng với giá trị kết quả của expression đó, và trả về quyền sở hữu của giá trị.</p>

<div class="cyber-alert warning">
<strong>Lưu ý:</strong> Gọi macro <code>dbg!</code> in ra standard error console stream (<code>stderr</code>), không giống như <code>println!</code>, in ra standard output console stream (<code>stdout</code>). Chúng ta sẽ nói thêm về <code>stderr</code> và <code>stdout</code> trong phần "Redirecting Errors to Standard Error" ở Chương 12.
</div>

<p>Đây là một ví dụ nơi chúng ta quan tâm đến giá trị được gán cho field <code>width</code>, cũng như giá trị của toàn bộ struct trong <code>rect1</code>:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale),
        height: 50,
    };

    dbg!(&rect1);
}</code></pre>
</div>

<div class="cyber-alert info">
<strong>Giải thích:</strong> Chúng ta có thể đặt <code>dbg!</code> xung quanh expression <code>30 * scale</code> và, bởi vì <code>dbg!</code> trả về quyền sở hữu của giá trị expression, field <code>width</code> sẽ nhận cùng giá trị như thể chúng ta không có lời gọi <code>dbg!</code> ở đó. Chúng ta không muốn <code>dbg!</code> chiếm quyền sở hữu của <code>rect1</code>, vì vậy chúng ta sử dụng một tham chiếu đến <code>rect1</code> trong lời gọi tiếp theo.
</div>

<p>Đây là output của ví dụ này trông như thế nào:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling rectangles v0.1.0 (file:///projects/rectangles)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.61s
     Running \`target/debug/rectangles\"
[src/main.rs:10:16] 30 * scale = 60
[src/main.rs:14:5] &rect1 = Rectangle {
    width: 60,
    height: 50,
}</code></pre>
</div>

<div class="cyber-alert info">
<strong>Phân tích output:</strong> Chúng ta có thể thấy phần output đầu tiên đến từ <em>src/main.rs</em> dòng 10 nơi chúng ta đang debug expression <code>30 * scale</code>, và giá trị kết quả của nó là <code>60</code> (formatting <code>Debug</code> được triển khai cho integers là chỉ in giá trị của chúng). Lời gọi <code>dbg!</code> trên dòng 14 của <em>src/main.rs</em> outputs giá trị của <code>&rect1</code>, đó là struct <code>Rectangle</code>. Output này sử dụng formatting <code>Debug</code> đẹp của kiểu <code>Rectangle</code>. Macro <code>dbg!</code> có thể thực sự hữu ích khi bạn đang cố tìm hiểu code của mình đang làm gì!
</div>

<p>Ngoài trait <code>Debug</code>, Rust đã cung cấp một số traits để chúng ta sử dụng với attribute <code>derive</code> có thể thêm hành vi hữu ích cho các kiểu tùy chỉnh của chúng ta. Các traits đó và hành vi của chúng được liệt kê trong Phụ lục C. Chúng ta sẽ cover cách triển khai các traits này với hành vi tùy chỉnh cũng như cách tạo traits của riêng bạn trong Chương 10. Có also nhiều attributes khác ngoài <code>derive</code>; để biết thêm thông tin, hãy xem phần "Attributes" trong Rust Reference.</p>

<p>Function <code>area</code> của chúng ta rất cụ thể: Nó chỉ tính diện tích các hình chữ nhật. Sẽ hữu ích nếu gắn hành vi này chặt chẽ hơn với struct <code>Rectangle</code> của chúng ta vì nó sẽ không hoạt động với bất kỳ kiểu nào khác. Hãy xem cách chúng ta có thể tiếp tục refactor code này bằng cách biến function <code>area</code> thành một method <code>area</code> được định nghĩa trên kiểu <code>Rectangle</code> của chúng ta.</p>
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
