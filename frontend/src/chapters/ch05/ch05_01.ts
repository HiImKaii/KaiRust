import { Lesson } from '../../courses';

export const ch05_01: Lesson = {
            id: 'ch05-01',
            title: '5.1 Định nghĩa và Khởi tạo Structs',
            duration: '40 phút',
            type: 'theory',
            content: `
<p>Một <strong>struct</strong> (cấu trúc) là một kiểu dữ liệu tùy chỉnh (custom data type) cho phép bạn đóng gói (package) và đặt tên cho nhiều giá trị liên quan với nhau để tạo ra một nhóm có ý nghĩa chung. Nếu bạn quen thuộc với các ngôn ngữ hướng đối tượng (object-oriented language), struct tương tự như các thuộc tính dữ liệu (data attributes) của một <strong>đối tượng</strong> (object).</p>

<p>Trong Chương 3, chúng ta đã dùng một loại struct đơn giản đó là kiểu Tuple. Tuple hữu ích nhưng các phần tử của nó không có tên riêng, bạn phải truy cập chúng thông qua vị trí index. Bằng cách dùng structs, ta gán mỗi mảnh dữ liệu với một cái tên rõ ràng để ý nghĩa của đoạn dữ liệu đó trở nên rõ ràng hơn. Vì có tên nên cấu trúc structs cực kì linh hoạt và mạnh mẽ hơn tuple rất nhiều: bạn không cần phải phụ thuộc vào thứ tự khai báo ban đầu hoặc truy cập giá trị thành phần một cách mù quáng qua index.</p>

<h3 class="task-heading">Khai báo Struct (Defining a Struct)</h3>
<p>Để định nghĩa một struct, chúng ta sử dụng từ khóa <code>struct</code> và đặt tên (Name) cho toàn bộ struct đó. Tên của struct nên mô tả được ý nghĩa bao hàm các thành phần bên trong nó. Sau đó, bên trong hai dấu ngoặc nhọn (curly brackets), ta định nghĩa tên các thành phần và kiểu (type) của chúng, các thành phần này được gọi là <strong>fields</strong> (trường).</p>

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
<p>Để sử dụng một struct sau khi đã định nghĩa xong, chúng ta tạo một <strong>instance</strong> (thể hiện) bằng cách ghi tên Struct và mở hai dấu ngoặc nhọn, sau đó khai báo các cặp key và giá trị (<code>key: value</code>) mà ta đã định nghĩa trước đó trong Struct. Chúng ta không bị bắt buộc phải sắp xếp các thành phần của struct theo đúng thứ tự mà ta đã khai báo. Struct giống như một template thôi, và các Instance lấy template đó điền giá trị để tạo thành dữ liệu cụ thể.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let user1 = User {
    active: true,
    email: String::from("someusername123@example.com"),
    username: String::from("someusername123"),
    sign_in_count: 1,
};</code></pre>
</div>

<p>Chúng ta lấy một giá trị từ Struct thông qua dấu chấm (<strong>dot notation</strong>). Ví dụ để lấy email của một User, ta gọi <code>user1.email</code>. Và tất nhiên nếu instance của user là dạng mutable (<code>mut</code>), ta cũng có thể thay đổi những thứ bên trong thông qua dấu chấm luôn.</p>

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
  <strong>Lưu ý:</strong> Chúng ta bắt buộc toàn bộ Struct Instance phải là <strong>mutable</strong> nhé. Rust không cho phép chỉ có một vài field nhất định (ví dụ field active) được coi là có quyền thay đổi (mut). Vì vậy nếu sử dụng Struct ta phải cân nhắc kỹ xem thứ chúng ta tạo ra có cần thay đổi được không ngay từ lúc khởi tạo Instance.
</div>

<h3 class="task-heading">Cú pháp Rút gọn Field (Field Init Shorthand)</h3>
<p>Rất vô nghĩa khi phải lặp đi lặp lại chữ <code>email: email</code> và <code>username: username</code> bởi vì tên biến truyền vào hàm trùng tên với những field ta định nghĩa trên struct. Rust cho phép sử dụng cú pháp rút gọn!</p>

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
<p>Nhiều khi chúng ta muốn lấy một Struct cũ và chỉnh sửa một số thứ, còn lại thì vẫn muốn giữ nguyên từ phiên bản cũ để tạo một instance struct mới. Ta có thể sử dụng cú pháp <strong>Struct Update</strong>.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let user2 = User {
    email: String::from("another@example.com"),
    ..user1   // Dấu .. sao chép tất cả các field không được khai báo từ user1
};</code></pre>
</div>

<div class="cyber-alert warning">
  <strong>Quan trọng:</strong> Cú pháp Struct Update thực hiện thông qua phép gán <code>=</code> thông thường, điều này có nghĩa là sẽ <strong>move</strong> giá trị giống như trong Chương 4 (Ownership). Khi sử dụng <code>..user1</code> với các trường có kiểu String, điều này sẽ chuyển quyền sở hữu từ user1 sang user2, khiến user1 không còn hợp lệ! (Tuy nhiên, với các kiểu như <code>bool</code> và <code>u64</code> thuộc loại Copy, chúng sẽ được sao chép thay vì move).
</div>

<h3 class="task-heading">Các dạng Struct khác</h3>
<p>Bên cạnh kiểu thông thường có các named fields, Rust còn hỗ trợ một số dạng struct đặc biệt khác:</p>

<h4>Tuple Structs</h4>
<p>Tuple structs là một dạng trung gian giữa tuple và struct. Nó có tên nhưng các field không có tên - thay vào đó truy cập bằng index. Dạng này hữu ích khi bạn muốn tạo một kiểu dữ liệu có ý nghĩa nhưng không cần đặt tên cho từng field, hoặc khi bạn muốn nhóm một vài giá trị lại với nhau.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);  // Truy cập bằng index: black.0
    let origin = Point(0, 0, 0); // Point tại gốc tọa độ

    println!("Red = {}", black.0);
    println!("X = {}", origin.0);
}</code></pre>
</div>
<div class="cyber-alert info">
  <strong>Khi nào dùng Tuple Struct?</strong>
  <ul>
    <li>Khi bạn muốn đặt tên cho kiểu dữ liệu nhưng không cần đặt tên cho từng field</li>
    <li>Khi muốn phân biệt hai kiểu dữ liệu có cùng cấu trúc tuple (như Color và Point ở trên)</li>
  </ul>
</div>

<h4>Unit-Like Structs (Struct không có dữ liệu)</h4>
<p>Bạn vẫn có thể tạo struct trống không chứa bất kỳ dữ liệu nào! Dạng này gọi là <strong>unit-like structs</strong> vì nó tương tự như kiểu đơn vị <code>()</code>. Nó thường được dùng khi muốn implement một trait cho một kiểu dữ liệu mà không cần lưu trữ bất kỳ thuộc tính nào, hoặc dùng như marker types.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
    // Có thể dùng cho trait implementation
}</code></pre>
</div>

<h3 class="task-heading">Ownership và Structs</h3>
<p>Khi một struct chứa dữ liệu kiểu sở hữu (như <code>String</code>), struct đó sẽ sở hữu dữ liệu đó. Điều này có nghĩa là khi struct được drop, dữ liệu bên trong cũng sẽ được giải phóng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    name: String,
    age: u32,
}

fn main() {
    let user = User {
        name: String::from("Alice"),
        age: 25,
    };
    // Khi user ra khỏi scope, name sẽ được giải phóng
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Struct với tham chiếu:</strong> Nếu bạn muốn struct giữ tham chiếu đến dữ liệu thay vì sở hữu, bạn cần sử dụng lifetime (sẽ học ở Chương 10). Ví dụ: <code>struct User { name: &amp;str }</code> sẽ không biên dịch được nếu không có lifetime.
</div>

<h3 class="task-heading">Ví dụ thực tế: Struct User</h3>
<p>Hãy xem một ví dụ thực tế hơn về cách sử dụng struct trong ứng dụng thực tế:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    id: u32,
    username: String,
    email: String,
    active: bool,
    sign_in_count: u64,
}

fn main() {
    // Tạo user mới
    let user1 = User {
        id: 1,
        username: String::from("rustacean"),
        email: String::from("rust@example.com"),
        active: true,
        sign_in_count: 1,
    };

    // Truy cập các trường
    println!("User: {}", user1.username);
    println!("Email: {}", user1.email);

    // Tạo user mới từ user cũ (struct update)
    let user2 = User {
        email: String::from("newemail@example.com"),
        ..user1.clone() // Lưu ý: cần clone vì String không Copy
    };

    println!("User2: {}", user2.username);
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
        };
