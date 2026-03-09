import { Lesson } from '../../courses';

export const ch05_01: Lesson = {
  id: 'ch05-01',
  title: '5.1 Định nghĩa và Khởi tạo Structs',
  duration: '40 phút',
  type: 'theory',
  content: `
<p>Structs tương tự như tuples, được thảo luận trong phần "Tuple Type", ở chỗ cả hai đều chứa nhiều giá trị liên quan. Giống như tuples, các thành phần của struct có thể là các kiểu khác nhau. Không giống như tuples, trong struct bạn sẽ đặt tên cho mỗi phần dữ liệu để rõ ràng ý nghĩa của các giá trị là gì. Việc thêm những tên này có nghĩa là structs linh hoạt hơn tuples: Bạn không phải dựa vào thứ tự của dữ liệu để chỉ định hoặc truy cập các giá trị của một instance.</p>

<p>Để định nghĩa một struct, chúng ta nhập từ khóa <code>struct</code> và đặt tên cho toàn bộ struct. Tên của struct nên mô tả ý nghĩa của các phần dữ liệu được nhóm lại với nhau. Sau đó, bên trong dấu ngoặc nhọn, chúng ta định nghĩa tên và kiểu của các phần dữ liệu, mà chúng ta gọi là <strong>fields</strong>. Ví dụ, Listing 5-1 cho thấy một struct lưu trữ thông tin về tài khoản người dùng.</p>

<h3 class="task-heading">Định nghĩa một Struct</h3>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {}</code></pre>
</div>

<p><strong>Listing 5-1</strong>: Định nghĩa một struct <code>User</code></p>

<p>Để sử dụng một struct sau khi chúng ta đã định nghĩa nó, chúng ta tạo một <strong>instance</strong> của struct đó bằng cách chỉ định các giá trị cụ thể cho mỗi field. Chúng ta tạo một instance bằng cách nêu tên của struct và sau đó thêm dấu ngoặc nhọn chứa các cặp <strong><code>key: value</code></strong>, trong đó các keys là tên của các fields và các values là dữ liệu chúng ta muốn lưu trữ trong các fields đó. Chúng ta không phải chỉ định các fields theo cùng thứ tự mà chúng ta đã khai báo trong struct. Nói cách khác, định nghĩa struct giống như một template tổng quát cho kiểu, và các instances điền vào template đó với dữ liệu cụ thể để tạo các giá trị của kiểu. Ví dụ, chúng ta có thể khai báo một người dùng cụ thể như trong Listing 5-2.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };
}</code></pre>
</div>

<p><strong>Listing 5-2</strong>: Tạo một instance của struct <code>User</code></p>

<p>Để lấy một giá trị cụ thể từ một struct, chúng ta sử dụng dot notation. Ví dụ, để truy cập địa chỉ email của người dùng này, chúng ta sử dụng <code>user1.email</code>. Nếu instance là mutable (có thể thay đổi), chúng ta có thể thay đổi một giá trị bằng cách sử dụng dot notation và gán vào một field cụ thể. Listing 5-3 cho thấy cách thay đổi giá trị trong field <code>email</code> của một instance <code>User</code> mutable.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let mut user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };

    user1.email = String::from("anotheremail@example.com");
}</code></pre>
</div>

<p><strong>Listing 5-3</strong>: Thay đổi giá trị trong field <code>email</code> của một instance <code>User</code></p>

<div class="cyber-alert warning">
<strong>Lưu ý:</strong> Lưu ý rằng toàn bộ instance phải là mutable; Rust không cho phép chúng ta đánh dấu chỉ một số fields nhất định là mutable. Giống như bất kỳ expression nào, chúng ta có thể tạo một instance mới của struct như là expression cuối cùng trong function body để ngầm định trả về instance mới đó.
</div>

<p>Giống như bất kỳ expression nào, chúng ta có thể tạo một instance mới của struct như là expression cuối cùng trong function body để ngầm định trả về instance mới đó.</p>

<p>Listing 5-4 cho thấy một function <code>build_user</code> trả về một instance <code>User</code> với email và username được cung cấp. Field <code>active</code> nhận giá trị <code>true</code>, và <code>sign_in_count</code> nhận giá trị <code>1</code>.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username: username,
        email: email,
        sign_in_count: 1,
    }
}

fn main() {
    let user1 = build_user(
        String::from("someone@example.com"),
        String::from("someusername123"),
    );
}</code></pre>
</div>

<p><strong>Listing 5-4</strong>: Một function <code>build_user</code> nhận email và username và trả về một instance <code>User</code></p>

<p>Có lý khi đặt tên tham số của function giống như tên các fields của struct, nhưng việc phải lặp lại tên các fields <code>email</code> và <code>username</code> và các biến hơi tẻ nhạt. Nếu struct có nhiều fields hơn, việc lặp lại mỗi tên sẽ còn khó chịu hơn. May mắn thay, có một cách viết tắt tiện lợi!</p>

<h3 class="task-heading">Sử dụng Field Init Shorthand</h3>
<p>Bởi vì tên tham số và tên field của struct hoàn toàn giống nhau trong Listing 5-4, chúng ta có thể sử dụng cú pháp <strong>field init shorthand</strong> để viết lại <code>build_user</code> để nó hoạt động hoàn toàn giống nhau nhưng không có sự lặp lại của <code>username</code> và <code>email</code>, như trong Listing 5-5.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username,
        email,
        sign_in_count: 1,
    }
}

fn main() {
    let user1 = build_user(
        String::from("someone@example.com"),
        String::from("someusername123"),
    );
}</code></pre>
</div>

<p><strong>Listing 5-5</strong>: Một function <code>build_user</code> sử dụng field init shorthand vì các tham số <code>username</code> và <code>email</code> có cùng tên với các fields của struct</p>

<p>Ở đây, chúng ta đang tạo một instance mới của struct <code>User</code>, có một field tên là <code>email</code>. Chúng ta muốn đặt giá trị của field <code>email</code> thành giá trị trong tham số <code>email</code> của function <code>build_user</code>. Bởi vì field <code>email</code> và tham số <code>email</code> có cùng tên, chúng ta chỉ cần viết <code>email</code> thay vì <code>email: email</code>.</p>

<h3 class="task-heading">Tạo Instances với Struct Update Syntax</h3>
<p>Thường thì hữu ích khi tạo một instance mới của một struct bao gồm hầu hết các giá trị từ một instance khác cùng kiểu, nhưng thay đổi một số trong đó. Bạn có thể làm điều này bằng cách sử dụng <strong>struct update syntax</strong>.</p>

<p>Trước tiên, trong Listing 5-6 chúng ta cho thấy cách tạo một instance <code>User</code> mới trong <code>user2</code> theo cách thông thường, không có update syntax. Chúng ta đặt giá trị mới cho <code>email</code> nhưng ngoài ra sử dụng các giá trị từ <code>user1</code> mà chúng ta đã tạo trong Listing 5-2.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    // --snip--

    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    let user2 = User {
        active: user1.active,
        username: user1.username,
        email: String::from("another@example.com"),
        sign_in_count: user1.sign_in_count,
    };
}</code></pre>
</div>

<p><strong>Listing 5-6</strong>: Tạo một instance <code>User</code> mới sử dụng tất cả trừ một giá trị từ <code>user1</code></p>

<p>Sử dụng struct update syntax, chúng ta có thể đạt được hiệu quả tương tự với ít code hơn, như trong Listing 5-7. Cú pháp <code>..</code> chỉ định rằng các fields còn lại không được đặt rõ ràng nên có cùng giá trị với các fields trong instance đã cho.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    // --snip--

    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    let user2 = User {
        email: String::from("another@example.com"),
        ..user1
    };
}</code></pre>
</div>

<p><strong>Listing 5-7</strong>: Sử dụng struct update syntax để đặt giá trị <code>email</code> mới cho một instance <code>User</code> nhưng sử dụng các giá trị còn lại từ <code>user1</code></p>

<div class="cyber-alert warning">
<strong>Quan trọng về Ownership:</strong> Code trong Listing 5-7 cũng tạo một instance trong <code>user2</code> có giá trị khác cho <code>email</code> nhưng có cùng giá trị cho các fields <code>username</code>, <code>active</code>, và <code>sign_in_count</code> từ <code>user1</code>. <code>..user1</code> phải đứng cuối cùng để chỉ định rằng bất kỳ fields nào còn lại nên lấy giá trị từ các fields tương ứng trong <code>user1</code>, nhưng chúng ta có thể chọn để chỉ định giá trị cho bao nhiêu fields tùy thích theo bất kỳ thứ tự nào, bất kể thứ tự của các fields trong định nghĩa struct.
</div>

<p>Lưu ý rằng struct update syntax sử dụng <code>=</code> giống như một phép gán; điều này là vì nó di chuyển (move) dữ liệu, giống như chúng ta đã thấy trong phần "Variables and Data Interacting with Move". Trong ví dụ này, chúng ta không thể sử dụng <code>user1</code> nữa sau khi tạo <code>user2</code> vì <code>String</code> trong field <code>username</code> của <code>user1</code> đã được move vào <code>user2</code>. Nếu chúng ta cho <code>user2</code> các giá trị <code>String</code> mới cho cả <code>email</code> và <code>username</code>, và do đó chỉ sử dụng các giá trị <code>active</code> và <code>sign_in_count</code> từ <code>user1</code>, thì <code>user1</code> vẫn sẽ hợp lệ sau khi tạo <code>user2</code>. Cả <code>active</code> và <code>sign_in_count</code> đều là các kiểu triển khai trait <code>Copy</code>, vì vậy hành vi mà chúng ta đã thảo luận trong phần "Stack-Only Data: Copy" sẽ áp dụng. Chúng ta cũng có thể vẫn sử dụng <code>user1.email</code> trong ví dụ này, vì giá trị của nó không bị move ra khỏi <code>user1</code>.</p>

<h3 class="task-heading">Tạo các kiểu khác nhau với Tuple Structs</h3>
<p>Rust cũng hỗ trợ structs trông tương tự như tuples, gọi là <strong>tuple structs</strong>. Tuple structs có ý nghĩa bổ sung mà tên struct cung cấp nhưng không có tên liên kết với các fields của chúng; thay vào đó, chúng chỉ có các kiểu của các fields. Tuple structs hữu ích khi bạn muốn đặt tên cho toàn bộ tuple và làm cho tuple trở thành một kiểu khác với các tuples khác, và khi việc đặt tên cho mỗi field như trong một struct thông thường sẽ dài dòng hoặc thừa thãi.</p>

<p>Để định nghĩa một tuple struct, bắt đầu với từ khóa <code>struct</code> và tên struct theo sau bởi các kiểu trong tuple. Ví dụ, ở đây chúng ta định nghĩa và sử dụng hai tuple structs tên là <code>Color</code> và <code>Point</code>:</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}</code></pre>
</div>

<div class="cyber-alert info">
<strong>Đặc điểm của Tuple Structs:</strong> Lưu ý rằng các giá trị <code>black</code> và <code>origin</code> là các kiểu khác nhau vì chúng là instances của các tuple structs khác nhau. Mỗi struct bạn định nghĩa là kiểu của riêng nó, ngay cả khi các fields bên trong struct có thể có cùng các kiểu. Ví dụ, một function nhận tham số kiểu <code>Color</code> không thể nhận <code>Point</code> như một argument, mặc dù cả hai kiểu đều được tạo từ ba giá trị <code>i32</code>. Ngoài ra, các instances của tuple struct tương tự như tuples ở chỗ bạn có thể destructure chúng thành các phần riêng lẻ, và bạn có thể sử dụng <code>.</code> theo sau bởi index để truy cập một giá trị riêng lẻ. Không giống như tuples, tuple structs yêu cầu bạn đặt tên kiểu của struct khi bạn destructure chúng. Ví dụ, chúng ta sẽ viết <code>let Point(x, y, z) = origin;</code> để destructure các giá trị trong điểm <code>origin</code> thành các biến tên là <code>x</code>, <code>y</code>, và <code>z</code>.
</div>

<h3 class="task-heading">Định nghĩa Unit-Like Structs</h3>
<p>Bạn cũng có thể định nghĩa structs không có bất kỳ fields nào! Chúng được gọi là <strong>unit-like structs</strong> vì chúng hoạt động tương tự như <code>()</code>, kiểu unit mà chúng ta đề cập trong phần "Tuple Type". Unit-like structs có thể hữu ích khi bạn cần triển khai một trait trên một số kiểu nhưng không có dữ liệu nào bạn muốn lưu trữ trong chính kiểu đó. Chúng ta sẽ thảo luận về traits trong Chương 10. Đây là một ví dụ về việc khai báo và tạo một unit struct tên là <code>AlwaysEqual</code>:</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}</code></pre>
</div>

<div class="cyber-alert info">
<strong>Giải thích:</strong> Để định nghĩa <code>AlwaysEqual</code>, chúng ta sử dụng từ khóa <code>struct</code>, tên chúng ta muốn, và sau đó là một dấu chấm phẩy. Không cần dấu ngoặc nhọn hoặc dấu ngoặc đơn! Sau đó, chúng ta có thể lấy một instance của <code>AlwaysEqual</code> trong biến <code>subject</code> theo cách tương tự: sử dụng tên chúng ta đã định nghĩa, không có dấu ngoặc nhọn hoặc dấu ngoặc đơn. Hãy tưởng tượng rằng sau này chúng ta sẽ triển khai hành vi cho kiểu này sao cho mọi instance của <code>AlwaysEqual</code> luôn bằng mọi instance của bất kỳ kiểu nào khác, có thể để có một kết quả đã biết cho mục đích kiểm tra. Chúng ta không cần bất kỳ dữ liệu nào để triển khai hành vi đó! Bạn sẽ thấy trong Chương 10 cách định nghĩa traits và triển khai chúng trên bất kỳ kiểu nào, bao gồm unit-like structs.
</div>

<h3 class="task-heading">Ownership của Struct Data</h3>
<p>Trong định nghĩa struct <code>User</code> trong Listing 5-1, chúng ta đã sử dụng kiểu <code>String</code> thay vì kiểu string slice <code>&str</code>. Đây là một lựa chọn có chủ đích vì chúng ta muốn mỗi instance của struct này sở hữu tất cả dữ liệu của nó và dữ liệu đó hợp lệ chừng nào toàn bộ struct còn hợp lệ.</p>

<p>Structs cũng có thể lưu trữ tham chiếu đến dữ liệu thuộc sở hữu của thứ khác, nhưng để làm điều đó cần sử dụng <strong>lifetimes</strong>, một tính năng của Rust mà chúng ta sẽ thảo luận trong Chương 10. Lifetimes đảm bảo rằng dữ liệu được tham chiếu bởi một struct hợp lệ chừng nào struct còn hợp lệ. Giả sử bạn cố gắng lưu trữ một tham chiếu trong một struct mà không chỉ định lifetimes, như sau trong <em>src/main.rs</em>; điều này sẽ không hoạt động:</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct User {
    active: bool,
    username: &str,
    email: &str,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        active: true,
        username: "someusername123",
        email: "someone@example.com",
        sign_in_count: 1,
    };
}</code></pre>
</div>

<p>Compiler sẽ phàn nàn rằng nó cần lifetime specifiers:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling structs v0.1.0 (file:///projects/structs)
error[E0106]: missing lifetime specifier
 --> src/main.rs:3:15
  |
3 |     username: &str,
  |               ^ expected named lifetime parameter
  |
help: consider introducing a named lifetime parameter
  |
1 ~ struct User<'a> {
2 |     active: bool,
3 ~     username: &'a str,
  |

error[E0106]: missing lifetime specifier
 --> src/main.rs:4:12
  |
4 |     email: &str,
  |            ^ expected named lifetime parameter
  |
help: consider introducing a named lifetime parameter
  |
1 ~ struct User<'a> {
2 |     active: bool,
3 ~     username: &'a str,
4 ~     email: &'a str,
  |

For more information about this error, try \`rustc --explain E0106\`.
error: could not compile \`structs\` (bin "structs") due to 2 previous errors</code></pre>
</div>

<div class="cyber-alert warning">
<strong>Lưu ý quan trọng:</strong> Trong Chương 10, chúng ta sẽ thảo luận cách sửa các lỗi này để bạn có thể lưu trữ tham chiếu trong structs, nhưng hiện tại, chúng ta sẽ sửa các lỗi như thế này bằng cách sử dụng các kiểu sở hữu như <code>String</code> thay vì các tham chiếu như <code>&str</code>.
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
