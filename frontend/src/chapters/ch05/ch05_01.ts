import { Lesson } from '../../courses';

export const ch05_01: Lesson = {
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
        };
