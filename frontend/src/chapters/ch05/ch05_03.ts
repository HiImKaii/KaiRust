import { Lesson } from '../../courses';

export const ch05_03: Lesson = {
            id: 'ch05-03',
            title: '5.3 Cú pháp Method (Method Syntax)',
            duration: '40 phút',
            type: 'practice',
            content: `
<p><strong>Methods</strong> tương tự như các functions thông thường. Chúng ta sử dụng từ khóa <code>fn</code> và đặt tên cho nó. Chúng ta có thể truyền tham số và trả về các giá trị. Điểm khác biệt DUY NHẤT VÀ QUAN TRỌNG: method được định nghĩa bên trong context của kiểu Struct (hoặc enums, hay các type khác). Điểm thiết yếu là tham số đầu tiên của Method (tham số này luôn đại diện cho instance mà ta đang sử dụng) là <strong>self</strong>.</p>

<h3 class="task-heading">Định nghĩa Methods (Defining Methods)</h3>
<p>Hãy tưởng tượng đoạn code ở phần 5.2 được viết lại theo phong cách Object-Oriented: chuyển <code>fn area(rectangle: &Rectangle) -> u32</code> thành method <code>area</code> cho struct <code>Rectangle</code>!</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 { // thay rectangle: &Rectangle = &self (đại diện cái Rectangle)
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50, };
    println!("The area of the rectangle is {}", rect1.area()); // Gọi bằng dot notation
}</code></pre>
</div>
<p>Cú pháp để định nghĩa một function thành method yêu cầu đặt nó bên trong một khối <code>impl</code> (Implementation - triển khai) cùng với tên Type.</p>
<p>Thay vì sử dụng <code>rectangle: &Rectangle</code>, chúng ta có thể dùng tên rút gọn: <code>&self</code>. Trong method, từ khóa <code>self</code> đề cập đến instance Rectangle hiện tại. Chúng ta hoàn toàn có thể sử dụng các quyền tương tự như trong function: <code>&self</code> (99% dùng), <code>&mut self</code> (khi cần thay đổi giá trị mà không cần trả về), <code>self</code> (khi cần chiếm quyền sở hữu object).</p>

<div class="cyber-alert info">
  <strong>Về Automatic Referencing trong Rust:</strong> Khi một object gọi method <code>object.something()</code>, Rust sẽ tự động xác định method đó nhận <code>self</code>, <code>&self</code>, hay <code>&mut self</code> và TỰ ĐỘNG THÊM reference vào đầu. Ví dụ: thay vì viết <code>(&rect1).area()</code>, ta chỉ cần viết <code>rect1.area()</code> và Rust sẽ tự hiểu!
</div>

<h3 class="task-heading">Methods với nhiều Parameters (Methods with More Parameters)</h3>
<p>Ví dụ chúng ta cần một method để kiểm tra xem Rectangle hiện tại có thể chứa được Rectangle khác hay không, trả về giá trị boolean.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool { // Vẫn truyền struct thứ 2 vào parameter sau self!
        self.width > other.width && self.height > other.height
    }
}
fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };

    // dùng self trỏ đến rect1 và other trỏ đến rect2!
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
}</code></pre>
</div>

<h3 class="task-heading">Associated Functions (Hàm liên kết - Không cần Instance)</h3>
<p>Nhiều hàm được định nghĩa bên trong block <code>impl</code> có thể KHÔNG CÓ tham số <code>self</code>. Vì không gắn với instance cụ thể nào, chúng được gọi là các hàm <strong>associated functions</strong> (hàm liên kết). Một ví dụ phổ biến là hàm tạo <code>String::from()</code> - sử dụng <code>::</code> để gọi hàm liên kết thay vì dấu chấm.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Rectangle {
    fn square(size: u32) -> Self { // Hàm khởi tạo trả về kiểu Self (đại diện cho kiểu Rectangle)
        Self { width: size, height: size }
    }
}

// Sử dụng associated function
let sq = Rectangle::square(3);</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Từ khóa Self:</strong> <code>Self</code> (viết hoa S) là alias cho kiểu hiện tại (trong trường hợp này là <code>Rectangle</code>). Còn <code>self</code> (viết thường) là tham chiếu đến instance hiện tại.
</div>

<h3 class="task-heading">Các loại self trong Methods</h3>
<p>Rust cung cấp 3 cách để nhận self trong method:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // 1. &self - Chỉ đọc (không sở hữu, không thay đổi)
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // 2. &mut self - Thay đổi được (mutable borrow)
    fn scale(&mut self, factor: u32) {
        self.width *= factor;
        self.height *= factor;
    }

    // 3. self - Chiếm dụng (ownership)
    fn transform(self) -> String {
        format!("Rectangle {}x{}", self.width, self.height)
    }
}

fn main() {
    let rect = Rectangle { width: 10, height: 5 };

    // Dùng &self
    println!("Area: {}", rect.area());

    // Dùng &mut self
    let mut rect2 = Rectangle { width: 10, height: 5 };
    rect2.scale(2);
    println!("After scale: {:?}", rect2);

    // Dùng self (chiếm dụng)
    let rect3 = Rectangle { width: 10, height: 5 };
    let info = rect3.transform();
    println!("{}", info);
    // rect3 không còn hợp lệ ở đây!
}</code></pre>
</div>

<h3 class="task-heading">Tổng kết: impl Blocks</h3>
<p>Một struct có thể có nhiều khối <code>impl</code>. Điều này hữu ích khi bạn muốn tổ chức code theo nhóm chức năng:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Rectangle {
    // Nhóm 1: Constructor
    fn new(w: u32, h: u32) -> Self {
        Self { width: w, height: h }
    }

    fn square(size: u32) -> Self {
        Self { width: size, height: size }
    }
}

impl Rectangle {
    // Nhóm 2: Methods tính toán
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn perimeter(&self) -> u32 {
        2 * (self.width + self.height)
    }
}

impl Rectangle {
    // Nhóm 3: Methods so sánh
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    fn is_square(&self) -> bool {
        self.width == self.height
    }
}</code></pre>
</div>
`,
            defaultCode: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Associated function (constructor)
    fn new(width: u32, height: u32) -> Self {
        Self { width, height }
    }

    fn square(size: u32) -> Self {
        Self { width: size, height: size }
    }

    // Methods
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn perimeter(&self) -> u32 {
        2 * (self.width + self.height)
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle::new(30, 50);
    let rect2 = Rectangle::square(20);

    println!("rect1: {:?}", rect1);
    println!("Diện tích: {}", rect1.area());
    println!("Chu vi: {}", rect1.perimeter());
    println!("rect1 chứa được rect2? {}", rect1.can_hold(&rect2));
}
`,
            expectedOutput: 'rect1: Rectangle { width: 30, height: 50 }\nDiện tích: 1500\nChu vi: 160\nrect1 chứa được rect2? true'
        };
