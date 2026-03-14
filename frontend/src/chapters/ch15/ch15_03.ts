import { Lesson } from '../../courses';

export const ch15_03: Lesson = {
            id: 'ch15-03',
            title: '15.3 Chạy Code khi Cleanup với Drop Trait',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Trait thứ hai quan trọng đối với smart pointer pattern là Drop, cho phép bạn tùy chỉnh điều gì xảy ra khi một giá trị sắp ra khỏi phạm vi. Bạn có thể cung cấp một implementation cho trait Drop trên bất kỳ kiểu nào, và code đó có thể được sử dụng để giải phóng các tài nguyên như files hoặc network connections.</p>

<p>Chúng ta giới thiệu Drop trong ngữ cảnh của smart pointers vì chức năng của trait Drop hầu như luôn được sử dụng khi implement một smart pointer. Ví dụ, khi một Box&lt;T&gt; được dropped, nó sẽ giải phóng không gian trên heap mà box trỏ đến.</p>

<p>Trong một số ngôn ngữ, với một số kiểu, lập trình viên phải gọi code để giải phóng bộ nhớ hoặc tài nguyên mỗi khi họ hoàn thành việc sử dụng một instance của các kiểu đó. Ví dụ bao gồm file handles, sockets, và locks. Nếu lập trình viên quên, hệ thống có thể bị quá tải và crash. Trong Rust, bạn có thể chỉ định rằng một đoạn code cụ thể được chạy bất cứ khi nào một giá trị ra khỏi phạm vi, và compiler sẽ chèn code này một cách tự động. Kết quả là, bạn không cần phải cẩn thận đặt cleanup code ở khắp nơi trong chương trình mà một instance của một kiểu cụ thể được hoàn thành—bạn vẫn sẽ không leak tài nguyên!</p>

<h3 class="task-heading">Định nghĩa Drop Trait Cho Custom Type</h3>
<p>Bạn chỉ định code để chạy khi một giá trị ra khỏi phạm vi bằng cách implement trait Drop. Trait Drop yêu cầu bạn implement một phương thức tên là drop nhận một mutable reference đến self. Để xem khi nào Rust gọi drop, hãy implement drop với các câu lệnh println! trước.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data \`{}\`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    let d = CustomSmartPointer {
        data: String::from("other stuff"),
    };
    println!("CustomSmartPointers created");
}</code></pre>
</div>
<p><em>Listing 15-14: A CustomSmartPointer struct that implements the Drop trait where we would put our cleanup code</em></p>

<p>Trait Drop được bao gồm trong prelude, vì vậy chúng ta không cần phải đưa nó vào scope. Chúng ta implement trait Drop trên CustomSmartPointer và cung cấp implementation cho phương thức drop gọi println!. Body của phương thức drop là nơi bạn sẽ đặt bất kỳ logic nào bạn muốn chạy khi một instance của kiểu của bạn ra khỏi scope. Chúng ta đang in một số text ở đây để demonstrate visually khi Rust sẽ gọi drop.</p>

<p>Trong main, chúng ta tạo hai instance của CustomSmartPointer và sau đó in CustomSmartPointers created. Ở cuối main, các instance của CustomSmartPointer sẽ ra khỏi scope, và Rust sẽ gọi code chúng ta đặt trong phương thức drop, in final message của chúng ta. Lưu ý rằng chúng ta không cần phải gọi phương thức drop một cách explicit.</p>

<h3 class="task-heading">Khi Chạy Sẽ In Ra</h3>
<p>Khi chúng ta chạy chương trình này, chúng ta sẽ thấy output sau:</p>

<pre><code>$ cargo run
   Compiling drop-example v0.1.0 (file:///projects/drop-example)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.60s
     Running \`target/debug/drop-example\`
CustomSmartPointers created
Dropping CustomSmartPointer with data \`other stuff\`!
Dropping CustomSmartPointer with data \`my stuff\`!</code></pre>

<p>Rust automatically called drop cho chúng ta khi các instances của chúng ta ra khỏi scope, gọi code chúng ta đã chỉ định. Các variables được dropped theo thứ tự ngược lại của việc tạo chúng, vì vậy d được dropped trước c. Mục đích của ví dụ này là cung cấp cho bạn một visual guide về cách phương thức drop hoạt động; thông thường bạn sẽ chỉ định cleanup code mà kiểu của bạn cần chạy thay vì một print message.</p>

<h3 class="task-heading">Drop Value Sớm với std::mem::drop</h3>
<p>Thật không may, không có cách đơn giản để vô hiệu hóa chức năng drop tự động. Disabling drop không phải lúc nào cũng cần thiết; toàn bộ điểm của trait Drop là nó được tự động xử lý. Tuy nhiên, đôi khi bạn có thể muốn clean up một giá trị sớm. Một ví dụ là khi sử dụng smart pointers quản lý locks: Bạn có thể muốn force phương thức drop để giải phóng lock để code khác trong cùng scope có thể acquire lock. Rust không cho phép bạn gọi phương thức drop của trait Drop một cách thủ công; thay vào đó, bạn phải gọi hàm std::mem::drop được cung cấp bởi standard library nếu bạn muốn force một giá trị được dropped trước khi kết thúc scope của nó.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
fn main() {
    let c = CustomSmartPointer {
        data: String::from("some data"),
    };
    println!("CustomSmartPointer created");
    c.drop();
    println!("CustomSmartPointer dropped before the end of main");
}</code></pre>
</div>
<p><em>Listing 15-15: Attempting to call the drop method from the Drop trait manually to clean up early</em></p>

<p>Khi chúng ta cố compile code này, chúng ta sẽ nhận được lỗi này:</p>

<pre><code>$ cargo run
   Compiling drop-example v0.1.0 (file:///projects/drop-example)
error[E0040]: explicit use of destructor method
  --&gt; src/main.rs:16:7
   |
16 |     c.drop();
   |       ^^^^ explicit destructor calls not allowed
   |
help: consider using \`drop\` function
   |
16 -     c.drop();
16 +     drop(c);
   |

For more information about this error, try \`rustc --explain E0040\`.
error: could not compile \`drop-example\` (bin "drop-example") due to 1 previous error</code></pre>

<p>Error message này nói rằng chúng ta không được phép gọi drop một cách explicit. Error message sử dụng thuật ngữ destructor, là thuật ngữ lập trình chung cho một function dọn dẹp một instance. Destructor tương tự như một constructor, tạo ra một instance. Hàm drop trong Rust là một destructor cụ thể.</p>

<p>Rust không cho phép chúng ta gọi drop một cách explicit, vì Rust vẫn sẽ tự động gọi drop trên giá trị ở cuối main. Điều này sẽ gây ra lỗi double free vì Rust sẽ cố gắng dọn dẹp cùng một giá trị hai lần.</p>

<p>Chúng ta không thể disable việc tự động chèn drop khi một giá trị ra khỏi scope, và chúng ta không thể gọi phương thức drop một cách explicit. Vì vậy, nếu chúng ta cần force một giá trị được cleaned up sớm, chúng ta sử dụng hàm std::mem::drop.</p>

<p>Hàm std::mem::drop khác với phương thức drop trong trait Drop. Chúng ta gọi nó bằng cách truyền như một argument giá trị mà chúng ta muốn force-drop. Hàm này nằm trong prelude, vì vậy chúng ta có thể modify main trong Listing 15-15 để gọi hàm drop, như trong Listing 15-16.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let c = CustomSmartPointer {
        data: String::from("some data"),
    };
    println!("CustomSmartPointer created");
    drop(c);
    println!("CustomSmartPointer dropped before the end of main");
}</code></pre>
</div>
<p><em>Listing 15-16: Calling std::mem::drop to explicitly drop a value before it goes out of scope</em></p>

<h3 class="task-heading">Kết Quả Khi Chạy</h3>
<p>Chạy code này sẽ in ra như sau:</p>

<pre><code>$ cargo run
   Compiling drop-example v0.1.0 (file:///projects/drop-example)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.73s
     Running \`target/debug/drop-example\`
CustomSmartPointer created
Dropping CustomSmartPointer with data \`some data\`!
CustomSmartPointer dropped before the end of main</code></pre>

<p>Text Dropping CustomSmartPointer with data \`some data\`! được in giữa CustomSmartPointer created và CustomSmartPointer dropped before the end of main, cho thấy phương thức drop code được gọi để drop c tại thời điểm đó.</p>

<h3 class="task-heading">Tại Sao Sử Dụng Drop Trait?</h3>
<p>Bạn có thể sử dụng code được chỉ định trong một Drop trait implementation theo nhiều cách khác nhau để làm cho cleanup tiện lợi và an toàn: Ví dụ, bạn có thể sử dụng nó để tạo memory allocator của riêng bạn! Với Drop trait và hệ thống ownership của Rust, bạn không cần phải nhớ để dọn dẹp, vì Rust làm điều đó một cách tự động.</p>

<p>Bạn cũng không cần phải lo lắng về các vấn đề resulting từ việc accidentally cleaning up các giá trị vẫn đang được sử dụng: Hệ thống ownership đảm bảo các references luôn valid cũng đảm bảo rằng drop được gọi chỉ một lần khi giá trị không còn được sử dụng.</p>

<h3 class="task-heading">Tóm Tắt</h3>
<p>Bây giờ chúng ta đã xem xét Box&lt;T&gt; và một số đặc điểm của smart pointers, hãy nhìn vào một số smart pointers khác được định nghĩa trong standard library.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Drop Trait:</strong>
  <ul>
    <li><strong>Drop trait</strong> - Cho phép tùy chỉnh code khi giá trị ra khỏi scope</li>
    <li><strong>drop() method</strong> - Được gọi tự động khi value bị dropped</li>
    <li><strong>Tự động gọi</strong> - Rust tự động gọi khi instance ra khỏi scope</li>
    <li><strong>Thứ tự ngược</strong> - Variables được dropped theo thứ tự ngược lại của việc tạo</li>
    <li><strong>std::mem::drop</strong> - Hàm để force drop sớm trước khi kết thúc scope</li>
    <li><strong>Không leak tài nguyên</strong> - Rust tự động dọn dẹp, không cần gọi thủ công</li>
  </ul>
</div>
`,
            defaultCode: `struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data \`{}\`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    let d = CustomSmartPointer {
        data: String::from("other stuff"),
    };
    println!("CustomSmartPointers created");
    // Khi kết thụt main, cả c và d sẽ tự động được dropped
    // Thứ tự: d trước, sau đó c (ngược với thứ tự tạo)
}
`,
            expectedOutput: `CustomSmartPointers created
Dropping CustomSmartPointer with data \`other stuff\`!
Dropping CustomSmartPointer with data \`my stuff\`!`
        };
