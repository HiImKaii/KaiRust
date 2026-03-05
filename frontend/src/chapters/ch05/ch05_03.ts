import { Lesson } from '../../courses';

export const ch05_03: Lesson = {
            id: 'ch05-03',
            title: '5.3 Cú pháp Method (Method Syntax)',
            duration: '40 phút',
            type: 'practice',
            content: `
<p><strong>Methods</strong> cực giống các functions thông thường mình làm trc đây. Chúng ta nhúng từ khóa <code>fn</code> và đặt tên cho nó. Chúng ta sẽ ném tham số parameter và trả về các giá trị return value ở đít hàm. Điểm khác biệt DUY NHẤT VÀ SIÊU QUAN TRỌNG: method được cài đặt cấu trúc hoàn toàn nằm bên trong các định nghĩ context của kiểu Struct (hoặc enums, hay types..). Điểm thiết yếu là lúc luôn cái parameter đầu tiên tiên của Method (Cốt lõi parameter này luôn là đại diện cho instance mình xài) là <strong>self</strong>.</p>

<h3 class="task-heading">Định nghĩa Methods (Defining Methods)</h3>
<p>Hãy tưởng tượng đoạn code ở phần 5.2 muốn viết cho nó ngầu lòi chuẩn Object-Oriented thì hãy chuyển <code>fn area(rectangle: &Rectangle) -> u32</code> làm phương thức <code>area</code> cực chuẩn chỉ cho chiếc method có Type của struct là <code>Rectangle</code>!</p>
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
    println!("The area of the rectangle is {}", rect1.area()); // Goi giống Java (dot method syntax)
}</code></pre>
</div>
<p>Cú pháp để bao một functions lại trở thành form methods yêu cầu nằm bên trong 1 khối ngoặc nhọn kèm keyword tên là <code>impl</code> (Implementation - cài đặt / triển khai) cùng với tên Type.</p>
<p>Hàm của mình giờ thay vì xài <code>rectangle: &Rectangle</code> mình có thể xài lén thông quan tên cho mượn ngắn siêu cấp: <code>&self</code>. Trong nội hàm, keyword <code>self</code> ám chỉ bản thân cho object Rectangle hiện tại. Note ra tí là tụi mình hoàn toàn có thể dùng các quyền như ownership y trang xài function bao gồm chọn 1 tỏng các quyền này: (<code>&self</code> 99% dùng, <code>&mut self</code> dành khi edit gán value lúc run properties mà ko cần return, <code>self</code> để chiếm đoạt lun object).</p>

<div class="cyber-alert info">
  <strong>Về C/C++ Deref pointer tự động (Automatic Referencing and Dereferencing):</strong> Khi mà một obj chạy hàm kiểu <code>object.something()</code>, rust sẽ tự coi coi cái method something đang nhận <code>self</code> bthg hay có mượn <code>&</code> hay mượn edit <code>&mut</code> để nó TỰ THÊM VÀO ĐẦU chữ gọi method (vd: thay vì ghi <code>(&rect1).area()</code> thì mình ghi <code>rect1.area()</code> tự hiểu và pass con trỏ luôn). Siêu xịn trong OOP!!
</div>

<h3 class="task-heading">Methods có nhiều Parameters (Methods with More Parameters)</h3>
<p>Ví dụ mình cần 1 hàm cho 1 cái Struct (gọi hàm cha) có thể check coi có rỗng đủ diện tích cho cái Struct số 2 (hàm con) truyền vào trong bằng cách boolean trả ra.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    } // được quyền nhiều hàm methods trong 1 Impl blck

    fn can_hold(&self, other: &Rectangle) -> bool { // Vẫn truyền struct thứ 2 vào parameter thêm ở ngoài sau param đầu self !
        self.width > other.width && self.height > other.height
    }
}
fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };
    
    // dùng self trỏ qua rect1 và other trỏ ngược vào rect2! 
    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
}</code></pre>
</div>

<h3 class="task-heading">Associated Functions (Hàm không cần Object khởi tạo)</h3>
<p>Rất nhiều các hàm khi thiết lập bên trong block <code>impl</code> có thể KHÔNG ĐƯA VÀO VALUE <code>self</code> ngay ở list tham số ban đầu. Do đặc quyền không dính đén instance cụ thể nào, tụi này được call là các hàm <strong>associated functions</strong>. Một ví dụ điển đình kinh viện siêu kinh là một cái hàm mang type trả về object chính nó là <code>String::from()</code> (Sử dụng <code>::</code> để gọi hàm liên kêt chứ không trõ bằng point được, vì point chỉ được tạo từ những biến sau khi có Instance).</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Rectangle {
    fn square(size: u32) -> Self { // hàm khởi tạo trả về một cái form instance type Self (đại diên chiếc Type chính Rectangle)
        Self { width: size, height: size }
    }
}

// Bắt đầu dùng Associative
let sq = Rectangle::square(3);</code></pre>
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
