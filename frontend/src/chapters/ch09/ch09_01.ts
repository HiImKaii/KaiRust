import { Lesson } from '../../courses';

export const ch09_01: Lesson = {
            id: 'ch09-01',
            title: '9.1 Unrecoverable Errors with panic!',
            duration: '15 phút',
            type: 'theory',
            content: `
<p>Đôi khi những điều xấu xảy ra trong code của bạn, và không có gì bạn có thể làm về điều đó. Trong những trường hợp này, Rust có macro panic!. Có hai cách để gây ra một panic trong thực tế: bằng cách thực hiện một hành động khiến code của chúng ta panic (chẳng hạn như truy cập một mảng vượt quá phạm vi) hoặc bằng cách gọi tường minh macro panic!. Trong cả hai trường hợp, chúng ta gây ra một panic trong chương trình của mình. Theo mặc định, những panics này sẽ in một thông báo lỗi, unwind, dọn dẹp stack, và thoát. Thông qua một biến môi trường, bạn cũng có thể yêu cầu Rust hiển thị call stack khi xảy ra panic để dễ dàng hơn trong việc theo dõi nguồn gốc của panic.</p>

<h3 class="task-heading">Unwinding Stack hoặc Abort khi Panic</h3>
<p>Theo mặc định, khi panic xảy ra, chương trình bắt đầu unwinding, có nghĩa là Rust đi ngược lên stack và dọn dẹp dữ liệu từ mỗi hàm mà nó gặp. Tuy nhiên, đi ngược lại và dọn dẹp là rất nhiều công việc. Rust vì vậy cho phép bạn chọn phương án abort ngay lập tức, kết thúc chương trình mà không cần dọn dẹp.</p>

<p>Bộ nhớ mà chương trình đang sử dụng sau đó sẽ cần được dọn dẹp bởi hệ điều hành. Nếu trong project của bạn bạn cần làm cho binary resultant nhỏ nhất có thể, bạn có thể chuyển từ unwinding sang abort khi panic bằng cách thêm panic = 'abort' vào các phần [profile] thích hợp trong Cargo.toml của bạn. Ví dụ, nếu bạn muốn abort on panic trong release mode, hãy thêm điều này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[profile.release]
panic = 'abort'</code></pre>
</div>

<h3 class="task-heading">Gọi panic! Macro</h3>
<p>Hãy thử gọi panic! trong một chương trình đơn giản:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    panic!("crash and burn");
}</code></pre>
</div>

<p>Khi bạn chạy chương trình, bạn sẽ thấy một cái gì đó như thế này:</p>

<pre><code>thread 'main' panicked at src/main.rs:2:5:
crash and burn
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace</code></pre>

<p>Lời gọi đến panic! gây ra thông báo lỗi chứa trong hai dòng cuối cùng. Dòng đầu tiên hiển thị panic message của chúng ta và vị trí trong source code nơi panic xảy ra: src/main.rs:2:5 cho thấy đó là dòng thứ hai, ký tự thứ năm trong file src/main.rs của chúng ta.</p>

<p>Trong trường hợp này, dòng được chỉ ra là một phần của code của chúng ta, và nếu chúng ta đến dòng đó, chúng ta sẽ thấy lời gọi macro panic!. Trong các trường hợp khác, lời gọi panic! có thể nằm trong code mà code của chúng ta gọi, và filename cũng như số dòng được báo cáo bởi error message sẽ là code của người khác nơi macro panic! được gọi, không phải dòng code của chúng ta dẫn đến lời gọi panic!.</p>

<h3 class="task-heading">Backtrace</h3>
<p>Chúng ta có thể sử dụng backtrace của các hàm mà lời gọi panic! đến từ đó để tìm ra phần code của chúng ta đang gây ra vấn đề. Để hiểu cách sử dụng panic! backtrace, hãy xem một ví dụ khác và xem điều gì sẽ xảy ra khi lời gọi panic! đến từ một thư viện do một bug trong code của chúng ta thay vì từ code của chúng ta gọi macro trực tiếp. Ví dụ 9-1 có một số code cố gắng truy cập một index trong một vector vượt quá phạm vi của các indexes hợp lệ.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let v = vec![1, 2, 3];

    v[99];
}</code></pre>
</div>
<p><em>Ví dụ 9-1: Cố gắng truy cập phần tử vượt quá cuối của vector, sẽ gây ra lời gọi đến panic!</em></p>

<p>Ở đây, chúng ta đang cố gắng truy cập phần tử thứ 100 của vector (ở index 99 vì indexing bắt đầu từ 0), nhưng vector chỉ có ba phần tử. Trong tình huống này, Rust sẽ panic. Sử dụng [] được cho là trả về một phần tử, nhưng nếu bạn truyền một index không hợp lệ, không có phần tử nào mà Rust có thể trả về ở đây sẽ đúng.</p>

<div class="cyber-alert warning">
  <strong>So sánh với C:</strong> Trong C, việc cố gắng đọc vượt quá phần cuối của một cấu trúc dữ liệu là undefined behavior. Bạn có thể nhận được bất cứ thứ gì ở vị trí trong bộ nhớ tương ứng với phần tử đó trong cấu trúc dữ liệu, ngay cả khi bộ nhớ không thuộc về cấu trúc đó. Điều này được gọi là buffer overread và có thể dẫn đến lỗ hổng bảo mật nếu kẻ tấn công có thể thao túng index theo cách để đọc dữ liệu họ không được phép đọc được lưu trữ sau cấu trúc dữ liệu.
</div>

<p>Để bảo vệ chương trình của bạn khỏi loại lỗ hổng bảo mật này, nếu bạn cố gắng đọc một phần tử tại một index không tồn tại, Rust sẽ dừng execution và từ chối tiếp tục. Hãy thử và xem:</p>

<pre><code>thread 'main' panicked at src/main.rs:4:6:
index out of bounds: the len is 3 but the index is 99
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace</code></pre>

<p>Error này trỏ đến dòng 4 của main.rs nơi chúng ta cố gắng truy cập index 99 của vector trong v.</p>

<p>Dòng note: cho chúng ta biết rằng chúng ta có thể đặt biến môi trường RUST_BACKTRACE để nhận được một backtrace của chính xác những gì đã xảy ra gây ra lỗi. Một backtrace là một danh sách tất cả các hàm đã được gọi để đến điểm này. Backtraces trong Rust hoạt động như trong các ngôn ngữ khác: Chìa khóa để đọc backtrace là bắt đầu từ trên cùng và đọc cho đến khi bạn thấy các file bạn đã viết. Đó là nơi vấn đề bắt đầu. Các dòng phía trên điểm đó là code mà code của bạn đã gọi; các dòng bên dưới là code đã gọi code của bạn.</p>

<p>Hãy thử lấy một backtrace bằng cách đặt biến môi trường RUST_BACKTRACE thành bất kỳ giá trị nào ngoại trừ 0.</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ RUST_BACKTRACE=1 cargo run</code></pre>
</div>

<p>Kết quả sẽ tương tự như sau:</p>

<pre><code>thread 'main' panicked at src/main.rs:4:6:
index out of bounds: the len is 3 but the index is 99
stack backtrace:
   0: rust_begin_unwind
             at /rustc/.../library/std/src/panicking.rs:692:5
   1: core::panicking::panic_fmt
             at /rustc/.../library/core/src/panicking.rs:75:14
   2: core::panicking::panic_bounds_check
             at /rustc/.../library/core/src/panicking.rs:273:5
   3: &lt;usize as core::slice::index::SliceIndex&lt;[T]&gt;&gt;::index
             at file:///.../core/src/slice/index.rs:274:10
   4: core::slice::index::&lt;impl core::ops::index::Index&lt;I&gt; for [T]&gt;::index
             at file:///.../core/src/slice/index.rs:16:9
   5: &lt;alloc::vec::Vec&lt;T,A&gt; as core::ops::index::Index&lt;I&gt;&gt;::index
             at file:///.../vec/mod.rs:3361:9
   6: panic::main
             at ./src/main.rs:4:6
   7: core::ops::function::FnOnce::call_once
             at file:///.../core/src/ops/function.rs:250:5</code></pre>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Để có backtraces với thông tin này, debug symbols phải được bật. Debug symbols được bật theo mặc định khi sử dụng cargo build hoặc cargo run mà không có flag --release.
</div>

<p>Trong output, dòng 6 của backtrace trỏ đến dòng trong project của chúng ta đang gây ra vấn đề: dòng 4 của src/main.rs. Nếu chúng ta không muốn chương trình của mình panic, chúng ta nên bắt đầu điều tra tại vị trí được trỏ bởi dòng đầu tiên đề cập đến một file chúng ta đã viết. Trong Ví dụ 9-1, nơi chúng ta cố ý viết code sẽ panic, cách để sửa panic là không yêu cầu một phần tử vượt quá phạm vi của các index vector.</p>

<h3 class="task-heading">Khi nào sử dụng panic?</h3>
<p>Chúng ta sẽ quay lại panic! và khi nào nên và không nên sử dụng panic! để xử lý các điều kiện lỗi trong phần "To panic! or Not to panic!" ở phần sau của chương này. Tiếp theo, chúng ta sẽ xem xét cách phục hồi từ một lỗi sử dụng Result.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt panic!:</strong>
  <ul>
    <li><strong>panic! macro:</strong> Dừng chương trình khi gặp lỗi nghiêm trọng</li>
    <li><strong>Backtrace:</strong> Sử dụng RUST_BACKTRACE=1 để debug</li>
    <li><strong>Unwind vs Abort:</strong> Có thể chuyển sang abort để giảm kích thước binary</li>
    <li><strong>Khi nào dùng:</strong> Prototype, tests, hoặc khi tiếp tục chạy không an toàn</li>
  </ul>
</div>
`,
            defaultCode: `fn main() {
    // Ví dụ panic do truy cập ngoài phạm vi mảng
    let v = vec![1, 2, 3];

    // An toàn: dùng .get()
    match v.get(99) {
        Some(val) => println!("Giá trị: {val}"),
        None => println!("Index 99 không tồn tại — xử lý an toàn!"),
    }

    println!("Chương trình vẫn chạy bình thường 👍");

    // Nếu uncomment dòng dưới, chương trình sẽ panic:
    // println!("{}", v[99]);
}
`,
            expectedOutput: 'Index 99 không tồn tại — xử lý an toàn!\nChương trình vẫn chạy bình thường 👍'
        };
