import { Lesson } from '../../courses';

export const ch01_03: Lesson = {
        id: 'ch01-03',
        title: '1.3 Hello, Cargo!',
        duration: '20 phút',
        type: 'theory',
        content: `
<p>Cargo là hệ thống xây dựng và trình quản lý gói chính thức của Rust. Hầu hết các Rustacean đều sử dụng Cargo để quản lý dự án vì nó xử lý rất nhiều tác vụ phức tạp cho bạn, từ việc biên dịch mã nguồn, tải xuống các thư viện mà mã của bạn cần (gọi là <strong>các thư viện phụ thuộc</strong> - dependencies), đến việc xây dựng các thư viện đó.</p>

<p>Đối với các chương trình cực kỳ đơn giản như "Hello, World", bạn có thể không cần đến thư viện bên thứ ba. Tuy nhiên, khi xây dựng các ứng dụng thực tế phức tạp hơn, bạn sẽ bắt đầu cần thêm rất nhiều "dependencies". Nếu bạn khởi tạo dự án bằng Cargo ngay từ đầu, việc quản lý và thêm các thư viện này sẽ trở nên vô cùng đơn giản.</p>

<p>Vì đại đa số các dự án Rust thực tế đều sử dụng Cargo, toàn bộ cuốn sách này cũng sẽ hướng dẫn bạn dựa trên công cụ này. Cargo thường được cài đặt sẵn khi bạn cài đặt Rust thông qua các trình cài đặt chính thức (như <code>rustup</code>) mà chúng ta đã thảo luận ở phần trước. Để kiểm tra xem bạn đã có Cargo chưa, hãy nhập lệnh sau vào terminal:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo --version</code></pre>
</div>
<p>Nếu bạn thấy mã phiên bản, chứng tỏ bạn đã cài đặt! Nếu bạn gặp lỗi, như <code>command not found</code>, hãy xem phần tài liệu phương pháp cài đặt của bạn để tìm cách cài đặt lại cho Cargo một cách riêng biệt.</p>

<h3 class="task-heading">Tạo một Dự án với Cargo</h3>
<p>Hãy cùng tạo một dự án mới bằng Cargo và xem nó khác biệt như thế nào so với dự án "Hello, world!" ban đầu của chúng ta. Hãy quay trở lại thư mục <code>projects</code> (hoặc bất kỳ nơi nào bạn dùng để lưu trữ mã nguồn). Sau đó, hãy chạy các lệnh sau trên bất kỳ hệ điều hành nào:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new hello_cargo
$ cd hello_cargo</code></pre>
</div>
<p>Lệnh đầu tiên tạo ra một thư mục và dự án mới tên là <code>hello_cargo</code>. Chúng ta đặt tên dự án là <code>hello_cargo</code>, và Cargo sẽ tạo các tệp của nó trong một thư mục cùng tên.</p>
<p>Hãy vào thư mục <code>hello_cargo</code> và liệt kê các tệp. Bạn sẽ thấy Cargo đã tạo ra cho chúng ta hai tệp và một thư mục: tệp <code>Cargo.toml</code> và thư mục <code>src</code> chứa tệp <code>main.rs</code> bên trong.</p>

<p>Cargo cũng tự động khởi tạo một Git repository mới cùng với tệp <code>.gitignore</code>. Các tệp Git sẽ không được tạo nếu bạn chạy <code>cargo new</code> bên trong một Git repository hiện có; bạn có thể ghi đè hành vi này bằng cách sử dụng lệnh <code>cargo new --vcs=git</code>.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Git là một hệ thống kiểm soát phiên bản (version control system) phổ biến. Bạn có thể thay đổi để <code>cargo new</code> sử dụng một hệ thống khác hoặc không dùng hệ thống nào bằng cờ <code>--vcs</code>. Chạy <code>cargo new --help</code> để xem các tùy chọn khả dụng.
</div>

<p>Mở <code>Cargo.toml</code> bằng trình soạn thảo văn bản bạn chọn. Nó sẽ trông tương tự như mã dưới đây:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"

[dependencies]</code></pre>
</div>
<p>Tệp này sử dụng định dạng <strong>TOML</strong> (Tom’s Obvious, Minimal Language), đây là định dạng cấu hình mặc định của Cargo.</p>
<p>Dòng đầu tiên, <code>[package]</code>, là tiêu đề phần cho biết các câu lệnh tiếp theo dùng để cấu hình một gói ứng dụng (package). Khi chúng ta thêm nhiều thông tin hơn cho tệp này, chúng ta sẽ thêm các phần khác.</p>
<p>Ba dòng tiếp theo thiết lập thông tin cấu hình mà Cargo cần để biên dịch chương trình của bạn: tên gọi, phiên bản, và phiên bản Rust (edition) sẽ sử dụng. Chúng ta sẽ nói thêm về từ khóa <code>edition</code> trong Phụ lục E.</p>
<p>Dòng cuối cùng, <code>[dependencies]</code>, là điểm bắt đầu của phần liệt kê các thư viện phụ thuộc của dự án. Trong Rust, các gói mã nguồn được gọi là <strong>crates</strong>. Chúng ta chưa cần thêm crate nào khác cho dự án này, nhưng chúng ta sẽ cần đến ở dự án đầu tiên của Chương 2, vì vậy chúng ta sẽ sử dụng phần dependencies lúc đó.</p>

<p>Bây giờ hãy mở <code>src/main.rs</code> và quan sát:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("Hello, world!");
}</code></pre>
</div>
<p>Cargo đã tạo sẵn một chương trình "Hello, world!" cho bạn, giống hệt chương trình chúng ta đã viết trước đó! Điểm khác biệt lớn nhất là Cargo đặt mã nguồn trong thư mục <code>src</code> và chúng ta có tệp cấu hình <code>Cargo.toml</code> ở thư mục gốc của dự án.</p>
<p>Cargo quy định rằng các tệp mã nguồn của bạn phải nằm trong thư mục <code>src</code>. Thư mục gốc của dự án chỉ dành cho các tệp README, thông tin bản quyền, tệp cấu hình và bất kỳ thứ gì khác không liên quan trực tiếp đến mã nguồn. Sử dụng Cargo giúp bạn tổ chức dự án ngăn nắp: mọi thứ đều có vị trí riêng và ở đúng vị trí của nó.</p>
<p>Nếu bạn bắt đầu một dự án không sử dụng Cargo, bạn có thể chuyển đổi nó sang dự án Cargo bằng cách chuyển mã nguồn vào thư mục <code>src</code> và tạo tệp <code>Cargo.toml</code> phù hợp (một cách nhanh chóng là chạy lệnh <code>cargo init</code>).</p>

<h3 class="task-heading">Biên dịch và Chạy Dự án Cargo</h3>
<p>Bây giờ hãy xem điều gì khác biệt khi chúng ta biên dịch và chạy "Hello, world!" bằng Cargo! Từ thư mục <code>hello_cargo</code>, hãy xây dựng dự án bằng lệnh:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
   Compiling hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 2.85s</code></pre>
</div>
<p>Lệnh này tạo ra một tệp thực thi trong <code>target/debug/hello_cargo</code> (hoặc <code>target\\debug\\hello_cargo.exe</code> trên Windows) thay vì ở ngay thư mục hiện tại. Vì mặc định là bản build debug, Cargo đặt tệp nhị phân vào thư mục tên là <code>debug</code>. Bạn có thể chạy tệp thực thi bằng lệnh:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ ./target/debug/hello_cargo # hoặc .\\target\\debug\\hello_cargo.exe trên Windows
Hello, world!</code></pre>
</div>
<p>Lần đầu tiên chạy <code>cargo build</code>, Cargo cũng tạo ra một tệp mới ở thư mục gốc: <code>Cargo.lock</code>. Tệp này theo dõi phiên bản chính xác của các thư viện phụ thuộc trong dự án. Bạn không bao giờ cần thay đổi tệp này thủ công; Cargo sẽ quản lý nó cho bạn.</p>
<p>Chúng ta vừa build dự án bằng <code>cargo build</code> và chạy bằng đường dẫn, nhưng bạn cũng có thể sử dụng <code>cargo run</code> để vừa biên dịch vừa chạy tệp thực thi kết quả chỉ trong một lệnh:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.0s
     Running \`target/debug/hello_cargo\`
Hello, world!</code></pre>
</div>
<p>Sử dụng <code>cargo run</code> tiện lợi hơn nhiều so với việc phải nhớ lệnh build và gõ đường dẫn dài dằng dặc, vì vậy hầu hết các lập trình viên đều sử dụng lệnh này.</p>
<p>Lưu ý rằng lần này chúng ta không thấy output báo rằng Cargo đang biên dịch. Cargo nhận ra rằng tệp không thay đổi nên nó chỉ chạy tệp nhị phân sẵn có. Nếu bạn sửa mã nguồn, Cargo sẽ build lại trước khi chạy.</p>
<p>Cargo cũng cung cấp lệnh <code>cargo check</code>. Lệnh này nhanh chóng kiểm tra mã nguồn của bạn để đảm bảo nó có thể biên dịch nhưng không tạo ra tệp thực thi:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo check
   Checking hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished dev [unoptimized + debuginfo] target(s) in 0.32s</code></pre>
</div>
<p>Tại sao bạn lại không muốn có tệp thực thi? Thường thì <code>cargo check</code> nhanh hơn <code>cargo build</code> rất nhiều vì nó bỏ qua bước tạo tệp nhị phân. Nếu bạn liên tục kiểm tra công việc của mình khi đang viết mã, <code>cargo check</code> sẽ giúp quá trình phản hồi nhanh hơn!</p>

<p>Tóm tắt những gì chúng ta đã học về Cargo:</p>
<ul>
    <li>Chúng ta có thể tạo dự án bằng <code>cargo new</code>.</li>
    <li>Chúng ta có thể build dự án bằng <code>cargo build</code>.</li>
    <li>Chúng ta có thể build và chạy trong một bước bằng <code>cargo run</code>.</li>
    <li>Chúng ta có thể kiểm tra lỗi biên dịch mà không tạo file nhị phân bằng <code>cargo check</code>.</li>
    <li>Thay vì lưu kết quả build ở cùng thư mục với mã nguồn, Cargo lưu nó trong thư mục <code>target/debug</code>.</li>
</ul>

<h3 class="task-heading">Build cho bản Phát hành (Release Build)</h3>
<p>Khi dự án của bạn đã sẵn sàng phát hành, bạn có thể dùng <code>cargo build --release</code> để biên dịch với các tối ưu hóa. Lệnh này sẽ tạo tệp thực thi trong <code>target/release</code>. Các tối ưu hóa giúp mã Rust chạy nhanh hơn, nhưng việc bật chúng sẽ làm tăng thời gian biên dịch. Đó là lý do tại sao có hai cấu hình khác nhau: một cho phát triển (để build nhanh chóng) và một cho người dùng cuối (chạy nhanh nhất có thể).</p>

<h3 class="task-heading">Tận dụng Quy ước của Cargo</h3>
<p>Với các dự án đơn giản, Cargo không mang lại quá nhiều giá trị so với <code>rustc</code>, nhưng nó sẽ chứng minh giá trị khi chương trình của bạn phức tạp hơn. Một khi dự án có nhiều tệp hoặc cần thư viện bên ngoài, việc để Cargo điều phối quá trình xây dựng sẽ dễ dàng hơn nhiều.</p>

<h3 class="task-heading">Tổng kết Chương 1</h3>
<p>Bạn đã có một khởi đầu tuyệt vời trong hành trình chinh phục Rust! Trong chương này, bạn đã học cách:</p>
<ul>
    <li>Cài đặt phiên bản Rust ổn định mới nhất bằng <code>rustup</code>.</li>
    <li>Cập nhật lên phiên bản Rust mới hơn.</li>
    <li>Mở tài liệu hướng dẫn được cài đặt cục bộ.</li>
    <li>Viết và chạy chương trình "Hello, world!" sử dụng trực tiếp <code>rustc</code>.</li>
    <li>Tạo và chạy một dự án mới theo các quy ước của <code>Cargo</code>.</li>
</ul>
<p>Đây là thời điểm tuyệt vời để xây dựng một chương trình thực thụ hơn nhằm làm quen với việc đọc và viết mã Rust. Vì vậy, ở Chương 2, chúng ta sẽ xây dựng một trò chơi đoán số. Nếu bạn muốn bắt đầu bằng cách tìm hiểu về các khái niệm lập trình phổ biến trong Rust trước, hãy chuyển sang Chương 3 rồi quay lại Chương 2 sau nhé.</p>
`,
        defaultCode: `fn main() {
    println!("Hello, Cargo!");
}
`,
        expectedOutput: 'Hello, Cargo!'
      };
