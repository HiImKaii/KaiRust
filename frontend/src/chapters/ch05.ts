import { Chapter } from '../courses';

export const ch05: Chapter = {
    id: 'ch05',
    title: 'Chương 5: Sử dụng Structs',
    lessons: [
        {
            id: 'ch05-01',
            title: '5.1 Định nghĩa và Khởi tạo Structs',
            duration: '40 phút',
            type: 'theory',
            content: `
<p>Một <strong>struct</strong> (cấu trúc) là một kiểu dữ liệu tùy chỉnh (custom data type) cho phép bạn gói gọn (package) và đặt tên cho nhiều giá trị liên quan với nhau để tạo ra một nhóm có ý nghĩa chung. Nếu bạn quen thuộc với các ngôn ngữ hướng đối tượng (object-oriented language), struct giống với các thuộc tính dữ liệu (data attributes) của một <strong>đối tượng</strong> (object).</p>

<p>Trong Chương 3, chúng ta đã dùng một loại hình struct đơn giản đó là kiểu Tuple. Tuple hữu ích nhưng các phần của nó không có tên riêng, bạn phải truy cập chúng thông qua vị trí index. Bằng cách dùng structs, ta gán mỗi mảnh dữ liệu với một cái tên rõ ràng để ý nghĩa của đoạn dữ liệu đó trở nên sáng sủa hơn. Vì có tên nên cấu trúc structs cực kì linh hoạt mãnh mẽ hơn tuple rất nhiều: bạn không cần thiết phải dựa dẫm vô thứ tự khai báo thành phần ban đầu hoặc sửa đổi giá trị thành phần một cách mù quáng qua index.</p>

<h3 class="task-heading">Khai báo Struct (Defining a Struct)</h3>
<p>Để định nghĩa một struct, chúng ta sử dụng từ khóa <code>struct</code> và đặt tên (Name) toàn cục cho toàn bộ struct đó. Tên của struct nên miêu tả được ý nghĩa bao hàm các mảnh ghép bên dưới nó. Sau đó, bên trong hai dấu ngoặc nhọn (curly brackets), ta định nghĩa tên các mảnh ghép và loại (type) của nó, các mảnh này được gọi là <strong>fields</strong> (trường).</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}</code></pre>
</div>

<h3 class="task-heading">Tạo Instance (Instantiating a Struct)</h3>
<p>Để dùng một struct sau khi đã define xong, chúng ta tạo một <strong>instance</strong> (thể hiện) bằng cách ghi tên Struct và mở hai dấu ngoặc nhọn bổ sung các cặp key và giá trị (<code>key: value</code>) mà ta đã define trước đó trong Struct. Chúng ta không bị bắt buộc phải sắp xếp các elements của struct phải đứng y hệt vị trí mà ta đã khai báo. Struct giống như template thôi, và các Instance lấy template đó điền giá trị dể tạo thành data cụ thể.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let user1 = User {
    active: true,
    email: String::from("someusername123@example.com"),
    username: String::from("someusername123"),
    sign_in_count: 1,
};</code></pre>
</div>

<p>Chúng ta lấy một giá trị tĩnh nào đó từ cái Struct thông qua dấu chấm (<strong>dot notation</strong>). Ví dụ để lấy email của một User, ta gọi <code>user1.email</code>. Và đương nhiên nếu instance của user của bạn là dạng mutable (<code>mut</code>), ta cũng có thể edit lại những thứ bên trong thông qua dấu chấm luôn.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut user1 = User {
    active: true,
    email: String::from("someusername123@example.com"),
    username: String::from("someusername123"),
    sign_in_count: 1,
};

user1.email = String::from("anotheremail@example.com");</code></pre>
</div>
<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Chúng ta bắt buộc toàn thể Struct Instance phải là <strong>mutable</strong> nha. Rust không hề cho việc chỉ có vài thành phần field nhất định (vd field active) được xem là có quyền edit (là mut). Cho nên nếu xài Struct ta phải cân nhắc cực chuẩn coi thứ chúng ta tạo có cần edit được không ngay từ lúc khởi tạo Instance.
</div>

<h3 class="task-heading">Cú pháp Rút ngắn Cấp biến (Field Init Shorthand)</h3>
<p>Rất là vô nghĩa khi phải lặp đi lặp lại chữ <code>email: email</code> và <code>username: username</code> bởi vì biến truyền vào trong hàm trùng tên y đúc với những thứ ta define trên struct.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username,   // Field Init Shorthand! (Chỉ cần ghi tên field khi field name và biến trùng tên!)
        email,      // Field Init Shorthand!
        sign_in_count: 1,
    }
}</code></pre>
</div>

<h3 class="task-heading">Cú pháp Cập nhật Struct (Struct Update Syntax)</h3>
<p>Nhiều khi chúng ta muốn lấy một cái Struct cũ đi và edit lại một số thứ, còn lại thì vẫn muốn giữ cái ruột từ chiếc cũ qua một instance struct CỰC MỚI. Ta có thể xài cú pháp <strong>Struct Update</strong>.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let user2 = User {
    email: String::from("another@example.com"),
    ..user1   // Dấu .. đi kèm user1 bắt hệ thống copy hết các giá trị những field ko dc khai báo bên phía trên qua
};</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Quan trọng:</strong> Cú pháp Update Struct được thực hiện thông qua con đường phân bổ <code>=</code> thông thường, có nghĩa việc này sẽ move value giống như phần Ownership (Chapter 4). Khi xài <code>..user1</code> đối với những phần tử dạng String, điều này sẽ vĩnh viễn Move user1 vào user2, là nguyên nhân làm mất hiệu lực xài cho chiếc Struct 1! (Tuy nhiên, do Active và SignIn_Count kiểu <code>bool</code> và <code>u64</code> vốn là dạng kiểu tự động Copy, thì việc ta update lại 2 field chuỗi string để sinh ra field riêng thì việc dùng Update Struct cho các thứ này vô cùng bình thường mà không hề sợ mất user1).
</div>

<h3 class="task-heading">Các dạng Struct khác</h3>
<p>Bên cạnh kiểu thông thường có các Named fields, chúng ta vẫn có quyền sài Struct cực kì độc đáo của riêng Rust như:</p>

<h4>Tuple Structs</h4>
<p>Như mình biết thì xài theo index sẽ chán hơn tên field. Việc áp đặt Struct theo dạng Named Function ở tuple có khi lại là sức mạnh mà những kiểu bình thường ko có - giúp code clear, đẹp, mang tính chuyên biệt. Cấu trúc tuple có cái tên y đúc struct bthg, được theo đuổi bởi một list các Type của field bên trong (không cần đặt tên cho field).</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);  // struct tên Color, các properties truy cập bằng index: black.0
    let origin = Point(0, 0, 0); // struct tên Point
}</code></pre>
</div>

<h4>Unit-Like Structs (struct không có data)</h4>
<p>Bạn vẫn có thể đẻ ra struct trống không chứa bất cứu data list nào! Dạng gọi tên là <strong>unit-like structs</strong> bởi vì nó mang cái vibe hơi giống chức nawg <code>()</code>. Nó thường dùng khi muốn gán một vài hành vi cụ thể (traits) mà không cần bận tâm khai báo bất kì property nào.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct AlwaysEqual;
fn main() {
    let subject = AlwaysEqual;
}</code></pre>
</div>
`,
            defaultCode: `struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect = Rectangle {
        width: 30,
        height: 50,
    };

    println!("Width: {}", rect.width);
    println!("Height: {}", rect.height);
    println!(
        "Diện tích hình chữ nhật: {} px vuông",
        area(&rect)
    );
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}
`,
            expectedOutput: 'Width: 30\nHeight: 50\nDiện tích hình chữ nhật: 1500 px vuông'
        },
        {
            id: 'ch05-02',
            title: '5.2 Ví dụ thực tế với Structs',
            duration: '35 phút',
            type: 'practice',
            content: `
<p>Để thực sự hiểu cách hoạt động của structs khi chúng ta code thật, hãy tạo ra một ứng dụng siêu nhỏ để tính tổng mảng diện tích của một hình chữ nhật nào đó! Chúng ta cũng khám phá ra cách mà những built-in traits của Rust giúp việc in struct một cách xinh đẹp ra command prompt.</p>

<p>Xài các variables truyền thống, để tính một cái hàm thì phải quăng parameter vô và nhận return value qua bên kia.</p>

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
<p>Hàm <code>area(width: u32, height: u32) -> u32</code> ở trên bị vấn đề với việc những param không có tính móc nối chặt chẽ trực tiếp đối với cái mục đích để sinh hàm (tìm diện tích) mà thay vì đó truyền 2 cái biến rời rạc. Vấn đề chỉ có thể tối ưa bằng xài cái Struct <code>Rectangle</code>!</p>

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
<p>Trong phiên bản struct thì hàm tính diện tích của ta được fix <code>area(rectangle: &Rectangle) -> u32</code> truyền mỗi 1 đối số. Thay vì truyền giá trị ownership nguyên gốc vào, chúng ra nên truyền qua cái <strong>borrowing</strong> reference của Instance đó, việc in giá trị và trả vế sẽ ko mất mát gì mà cũng cực kì dễ dàng. (Chỉ xài Immutable borrow là quá đủ tại vì ko cần thay đổi gì!).</p>

<h3 class="task-heading">Vấn đề kinh điển của Struct khi xài debug Println</h3>
<p>Hãy cùng test coi liệu một ngày đẹp trới tui có thể show hẳn luôn cái Cấu trúc <code>Rectangle</code> của mình ra <code>println!</code> không nè.</p>
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
<p>Lỗi tại vì <code>println!</code> xài format <code>Display</code> nhưng mà format Default là không support việc in struct ra (đơn giản vì ko biết cấu trúc user định xài in sao). Do đó chỉ việc đổi một format mới thay thế Display đi là cái <strong>format <code>Debug {:?}</code></strong>.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>println!("rect1 is {:?}", rect1); // Vẫn bị lỗi xíu xiu!</code></pre>
</div>
<p>Tại vì Print debug nó ko có được auto enable cái thuộc tích, để cho struct bật được in Debug ở Rust ta phải cấp cho nó thứ gọi là một tính tăng derive. Khá đơn giải để dùng bằng cách chèn lên code tên struct đoạn <code>#[derive(Debug)]</code> trước khai báo!</p>

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

<h3 class="task-heading">Sức mạnh của Dbg! macro</h3>
<p>Khi bạn cần in gì đó trong một dòng code hoặc debug mà thấy gõ lệnh <code>println!</code> mỏi tay quá, bạn sẽ cực khoái xài cái marco siêu việt <code>dbg!</code>. Nó sẽ in vào (standard error console stream) giá trình nguyên bản + VỊ TRÍ DÒNG CODE đó. Điểm mạnh ở chỗ không giống <code>println!</code> - thứ lấy reference - <code>dbg!</code> lại take luôn Ownership và trả lại y chang Ownership về chỗ cũ sau cú nhấp run.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle { width: u32, height: u32 }

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale), // dbg! return lại kết quả để xài gán như cũ (30*2=60)
        height: 50,
    };
    dbg!(&rect1); // Dùng tham chiếu để không dính Ownership cho rect1 (nếu ko xài reference rớt mất value ráng chịu)
}</code></pre>
</div>
<div class="cyber-alert info">
  <strong>Về output:</strong> <code>dbg!</code> xuất hiện dưới mẫu <code>[src/main.rs:7] 30 * scale = 60</code> ngay khu vực command. Khá ngon cho bug finder!
</div>
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
        },
        {
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
        }
    ]
};
