import { Lesson } from '../../courses';

export const ch05_03: Lesson = {
    id: 'ch05-03',
    title: '5.3 Cú pháp Method (Method Syntax)',
    duration: '40 phút',
    type: 'theory',
    content: `
<p>Methods (phương thức) tương tự như functions: Chúng ta khai báo chúng bằng từ khóa <code>fn</code> và đặt tên, chúng có thể có parameters và giá trị trả về, và chúng chứa một số code được chạy khi method được gọi từ một nơi nào đó. Không giống như functions, methods được định nghĩa trong ngữ cảnh của một struct (hoặc enum hoặc trait object, mà chúng ta sẽ cover trong Chương 6 và Chương 18 tương ứng), và tham số đầu tiên của chúng luôn là <code>self</code>, đại diện cho instance của struct mà method đang được gọi trên đó.</p>

<h3 class="task-heading">Cú pháp Method</h3>
<p>Hãy thay đổi function <code>area</code> có một tham số là instance <code>Rectangle</code> và thay vào đó tạo một method <code>area</code> được định nghĩa trên struct <code>Rectangle</code>, như trong Listing 5-13.</p>

<p><strong>Filename: src/main.rs</strong></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}</code></pre>
</div>

<p><strong>Listing 5-13</strong>: Định nghĩa method <code>area</code> trên struct <code>Rectangle</code></p>

<p>Để định nghĩa function trong ngữ cảnh của <code>Rectangle</code>, chúng ta bắt đầu một khối <code>impl</code> (implementation) cho <code>Rectangle</code>. Mọi thứ trong khối <code>impl</code> này sẽ được liên kết với kiểu <code>Rectangle</code>. Sau đó, chúng ta di chuyển function <code>area</code> vào trong dấu ngoặc curly của <code>impl</code> và thay đổi tham số đầu tiên (và trong trường hợp này, là tham số duy nhất) thành <code>self</code> trong signature và ở mọi nơi trong body. Trong <code>main</code>, nơi chúng ta gọi function <code>area</code> và truyền <code>rect1</code> như một argument, thay vào đó chúng ta có thể sử dụng cú pháp method để gọi method <code>area</code> trên instance <code>Rectangle</code> của chúng ta. Cú pháp method đi sau một instance: Chúng ta thêm một dấu chấm theo sau bởi tên method, dấu ngoặc đơn, và bất kỳ arguments nào.</p>

<p>Trong signature cho <code>area</code>, chúng ta sử dụng <code>&self</code> thay vì <code>rectangle: &Rectangle</code>. <code>&self</code> thực ra là viết tắt của <code>self: &Self</code>. Trong khối <code>impl</code>, kiểu <code>Self</code> là một alias cho kiểu mà khối <code>impl</code> đó dành cho. Methods phải có một tham số tên là <code>self</code> của kiểu <code>Self</code> cho tham số đầu tiên, vì vậy Rust cho phép bạn viết tắt điều này chỉ bằng tên <code>self</code> ở vị trí tham số đầu tiên. Lưu ý rằng chúng ta vẫn cần sử dụng <code>&</code> đằng trước shortcut <code>self</code> để chỉ ra rằng method này mượn (borrow) instance <code>Self</code>, giống như chúng ta đã làm trong <code>rectangle: &Rectangle</code>. Methods có thể chiếm quyền sở hữu (ownership) của <code>self</code>, mượn <code>self</code> bất biến (immutably), như chúng ta đã làm ở đây, hoặc mượn <code>&self</code> khả biến (mutably), giống như bất kỳ tham số nào khác.</p>

<div class="cyber-alert info">
<strong>Giải thích:</strong> Chúng ta chọn <code>&self</code> ở đây vì cùng lý do chúng ta sử dụng <code>&Rectangle</code> trong phiên bản function: Chúng ta không muốn chiếm quyền sở hữu, và chúng ta chỉ muốn đọc dữ liệu trong struct, không phải ghi vào đó. Nếu chúng ta muốn thay đổi instance mà chúng ta đã gọi method như một phần của những gì method làm, chúng ta sẽ sử dụng <code>&mut self</code> như tham số đầu tiên. Việc có một method chiếm quyền sở hữu của instance bằng cách sử dụng chỉ <code>self</code> như tham số đầu tiên là hiếm; kỹ thuật này thường được sử dụng khi method biến đổi <code>self</code> thành thứ khác và bạn muốn ngăn người gọi sử dụng instance gốc sau khi chuyển đổi.
</div>

<p>Lý do chính để sử dụng methods thay vì functions, ngoài việc cung cấp cú pháp method và không phải lặp lại kiểu của <code>self</code> trong mỗi signature của method, là để tổ chức. Chúng ta đã đặt tất cả những thứ chúng ta có thể làm với một instance của một kiểu vào một khối <code>impl</code> thay vì buộc những người dùng tương lai của code tìm kiếm các khả năng của <code>Rectangle</code> ở nhiều nơi khác nhau trong thư viện mà chúng ta cung cấp.</p>

<div class="cyber-alert info">
<strong>Lưu ý:</strong> Lưu ý rằng chúng ta có thể chọn đặt cho method cùng tên với một trong các fields của struct. Ví dụ, chúng ta có thể định nghĩa một method trên <code>Rectangle</code> cũng có tên là <code>width</code>.
</div>

<p><strong>Filename: src/main.rs</strong></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn width(&self) -> bool {
        self.width > 0
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    if rect1.width() {
        println!("The rectangle has a nonzero width; it is {}", rect1.width);
    }
}</code></pre>
</div>

<p>Ở đây, chúng ta chọn làm cho method <code>width</code> trả về <code>true</code> nếu giá trị trong field <code>width</code> của instance lớn hơn <code>0</code> và <code>false</code> nếu giá trị là <code>0</code>: Chúng ta có thể sử dụng một field trong một method cùng tên cho bất kỳ mục đích nào. Trong <code>main</code>, khi chúng ta theo sau <code>rect1.width</code> bằng dấu ngoặc đơn, Rust biết chúng ta có nghĩa là method <code>width</code>. Khi chúng ta không sử dụng dấu ngoặc đơn, Rust biết chúng ta có nghĩa là field <code>width</code>.</p>

<div class="cyber-alert info">
<strong>Giải thích:</strong> Thường thì, nhưng không phải luôn luôn, khi chúng ta đặt cho method cùng tên với một field, chúng ta muốn nó chỉ trả về giá trị trong field và không làm gì khác. Methods như thế được gọi là <strong>getters</strong>, và Rust không tự động triển khai chúng cho các struct fields như một số ngôn ngữ khác. Getters hữu ích vì bạn có thể làm cho field private nhưng method public và do đó cho phép truy cập chỉ đọc (read-only access) vào field đó như một phần của public API của kiểu. Chúng ta sẽ thảo luận về public và private là gì và cách chỉ định một field hoặc method là public hay private trong Chương 7.
</div>

<h3 class="task-heading">Toán tử <code>-></code> ở đâu?</h3>
<p>Trong C và C++, hai toán tử khác nhau được sử dụng để gọi methods: Bạn sử dụng <code>.</code> nếu bạn gọi method trực tiếp trên object và <code>-></code> nếu bạn gọi method trên con trỏ đến object và cần dereference con trỏ trước. Nói cách khác, nếu <code>object</code> là một con trỏ, <code>object->something()</code> tương tự như <code>(*object).something()</code>.</p>

<p>Rust không có tương đương với toán tử <code>-></code>; thay vào đó, Rust có một tính năng gọi là automatic referencing và dereferencing. Gọi methods là một trong những nơi hiếm hoi trong Rust có hành vi này.</p>

<p>Đây là cách nó hoạt động: Khi bạn gọi một method với <code>object.something()</code>, Rust tự động thêm vào <code>&</code>, <code>&mut</code>, hoặc <code>*</code> để <code>object</code> khớp với signature của method. Nói cách khác, những thứ sau đây là giống nhau:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#![allow(unused)]
fn main() {
#[derive(Debug,Copy,Clone)]
struct Point {
    x: f64,
    y: f64,
}

impl Point {
   fn distance(&self, other: &Point) -> f64 {
       let x_squared = f64::powi(other.x - self.x, 2);
       let y_squared = f64::powi(other.y - self.y, 2);

       f64::sqrt(x_squared + y_squared)
   }
}
let p1 = Point { x: 0.0, y: 0.0 };
let p2 = Point { x: 5.0, y: 6.5 };
p1.distance(&p2);
(&p1).distance(&p2);
}</code></pre>
</div>

<div class="cyber-alert info">
<strong>Giải thích:</strong> Cái đầu tiên trông sạch hơn nhiều. Hành vi automatic referencing này hoạt động vì methods có một receiver rõ ràng — kiểu của <code>self</code>. Với receiver và tên của một method, Rust có thể xác định một cách chắc chắn liệu method đang đọc (<code>&self</code>), đang thay đổi (<code>&mut self</code>), hay đang tiêu thụ (<code>self</code>). Thực tế là Rust làm cho borrowing ngầm định cho method receivers là một phần lớn trong việc làm cho ownership trở nên ergonomic trong thực tế.
</div>

<h3 class="task-heading">Methods với nhiều Parameters</h3>
<p>Hãy thực hành sử dụng methods bằng cách triển khai một method thứ hai trên struct <code>Rectangle</code>. Lần này chúng ta muốn một instance của <code>Rectangle</code> nhận một instance khác của <code>Rectangle</code> và trả về <code>true</code> nếu <code>Rectangle</code> thứ hai có thể nằm vừa hoàn toàn trong <code>self</code> (Rectangle đầu tiên); nếu không, nó nên trả về <code>false</code>. Đó là, sau khi chúng ta định nghĩa method <code>can_hold</code>, chúng ta muốn có thể viết chương trình như trong Listing 5-14.</p>

<p><strong>Filename: src/main.rs</strong></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };

    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
}</code></pre>
</div>

<p><strong>Listing 5-14</strong>: Sử dụng method <code>can_hold</code> chưa được viết</p>

<p>Kết quả mong đợi sẽ như sau vì cả hai kích thước của <code>rect2</code> đều nhỏ hơn kích thước của <code>rect1</code>, nhưng <code>rect3</code> rộng hơn <code>rect1</code>:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>Can rect1 hold rect2? true
Can rect1 hold rect3? false</code></pre>
</div>

<p>Chúng ta biết mình muốn định nghĩa một method, vì vậy nó sẽ nằm trong khối <code>impl Rectangle</code>. Tên method sẽ là <code>can_hold</code>, và nó sẽ nhận một immutable borrow của một <code>Rectangle</code> khác như một tham số. Chúng ta có thể biết kiểu của tham số sẽ là gì bằng cách nhìn vào code gọi method: <code>rect1.can_hold(&rect2)</code> truyền vào <code>&rect2</code>, đó là một immutable borrow đến <code>rect2</code>, một instance của <code>Rectangle</code>. Điều này hợp lý vì chúng ta chỉ cần đọc <code>rect2</code> (thay vì ghi, điều đó có nghĩa là chúng ta sẽ cần một mutable borrow), và chúng ta muốn <code>main</code> giữ quyền sở hữu của <code>rect2</code> để chúng ta có thể sử dụng nó lại sau khi gọi method <code>can_hold</code>. Giá trị trả về của <code>can_hold</code> sẽ là một Boolean, và implementation sẽ kiểm tra xem width và height của <code>self</code> có lớn hơn width và height của <code>Rectangle</code> kia hay không. Hãy thêm method <code>can_hold</code> mới vào khối <code>impl</code> từ Listing 5-13, như trong Listing 5-15.</p>

<p><strong>Filename: src/main.rs</strong></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };

    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
}</code></pre>
</div>

<p><strong>Listing 5-15</strong>: Triển khai method <code>can_hold</code> trên <code>Rectangle</code> nhận một instance <code>Rectangle</code> khác như một tham số</p>

<div class="cyber-alert info">
<strong>Kết quả:</strong> Khi chúng ta chạy code này với function <code>main</code> trong Listing 5-14, chúng ta sẽ có được output mong muốn. Methods có thể nhận nhiều tham số mà chúng ta thêm vào signature sau tham số <code>self</code>, và các tham số đó hoạt động giống như tham số trong functions.
</div>

<h3 class="task-heading">Associated Functions</h3>
<p>Tất cả các functions được định nghĩa trong một khối <code>impl</code> được gọi là associated functions vì chúng được liên kết với kiểu được đặt tên sau <code>impl</code>. Chúng ta có thể định nghĩa associated functions không có <codeself> làm tham số đầu tiên (và do đó không phải methods) vì chúng không cần một instance của kiểu để làm việc với. Chúng ta đã sử dụng một function như thế: function <code>String::from</code> được định nghĩa trên kiểu <code>String</code>.</p>

<p>Associated functions không phải methods thường được sử dụng cho các constructors sẽ trả về một instance mới của struct. Chúng thường được gọi là <code>new</code>, nhưng <code>new</code> không phải là tên đặc biệt và không được xây dựng vào ngôn ngữ. Ví dụ, chúng ta có thể chọn cung cấp một associated function có tên <code>square</code> sẽ có một tham số dimension và sử dụng đó cho cả width và height, do đó làm cho việc tạo một <code>Rectangle</code> hình vuông dễ dàng hơn thay vì phải chỉ định cùng một giá trị hai lần:</p>

<p><strong>Filename: src/main.rs</strong></p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let sq = Rectangle::square(3);
}</code></pre>
</div>

<div class="cyber-alert info">
<strong>Giải thích:</strong> Từ khóa <code>Self</code> trong kiểu trả về và trong body của function là aliases cho kiểu xuất hiện sau từ khóa <code>impl</code>, trong trường hợp này là <code>Rectangle</code>.
</div>

<p>Để gọi associated function này, chúng ta sử dụng cú pháp <code>::</code> với tên struct; <code>let sq = Rectangle::square(3);</code> là một ví dụ. Function này được namespaced bởi struct: Cú pháp <code>::</code> được sử dụng cho cả associated functions và namespaces được tạo bởi modules. Chúng ta sẽ thảo luận về modules trong Chương 7.</p>

<h3 class="task-heading">Nhiều khối <code>impl</code></h3>
<p>Mỗi struct được phép có nhiều khối <code>impl</code>. Ví dụ, Listing 5-15 tương đương với code được hiển thị trong Listing 5-16, trong đó mỗi method có khối <code>impl</code> riêng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rect2 = Rectangle {
        width: 10,
        height: 40,
    };
    let rect3 = Rectangle {
        width: 60,
        height: 45,
    };

    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
    println!("Can rect1 hold rect3? {}", rect1.can_hold(&rect3));
}</code></pre>
</div>

<p><strong>Listing 5-16</strong>: Viết lại Listing 5-15 sử dụng nhiều khối <code>impl</code></p>

<div class="cyber-alert info">
<strong>Đánh giá:</strong> Không có lý do gì để tách các methods này thành nhiều khối <code>impl</code> ở đây, nhưng đây là cú pháp hợp lệ. Chúng ta sẽ thấy trường hợp nhiều khối <code>impl</code> hữu ích trong Chương 10, nơi chúng ta thảo luận về generic types và traits.
</div>

<h3 class="task-heading">Tóm tắt</h3>
<p>Structs cho phép bạn tạo các kiểu tùy chỉnh có ý nghĩa cho domain của bạn. Bằng cách sử dụng structs, bạn có thể giữ các mảnh dữ liệu liên quan được kết nối với nhau và đặt tên cho mỗi mảnh để làm cho code của bạn rõ ràng. Trong các khối <code>impl</code>, bạn có thể định nghĩa các functions được liên kết với kiểu của bạn, và methods là một loại associated function cho phép bạn chỉ định hành vi mà các instances của structs của bạn có.</p>

<p>Nhưng structs không phải là cách duy nhất để bạn tạo các kiểu tùy chỉnh: Hãy chuyển sang tính năng enum của Rust để thêm một công cụ khác vào toolbox của bạn.</p>
`,
    defaultCode: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };
    let rect3 = Rectangle { width: 60, height: 45 };

    println!("Diện tích rect1: {}", rect1.area());
    println!("rect1 chứa được rect2? {}", rect1.can_hold(&rect2));
    println!("rect1 chứa được rect3? {}", rect1.can_hold(&rect3));
}
`,
    expectedOutput: 'Diện tích rect1: 1500\nrect1 chứa được rect2? true\nrect1 chứa được rect3? false'
};
