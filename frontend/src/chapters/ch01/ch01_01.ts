import { Lesson } from '../../courses';

export const ch01_01: Lesson = {
    id: 'ch01-01',
    title: '1.1 Cài đặt Rust',
    duration: '10 phút',
    type: 'theory',
    content: `
<p>Bước đầu tiên là cài đặt Rust. Chúng ta sẽ tải Rust thông qua <code>rustup</code>, một công cụ dòng lệnh để quản lý các phiên bản Rust và các công cụ liên quan. Bạn sẽ cần kết nối internet để tải xuống.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>dòng lệnh</em> là giao diện dựa trên văn bản được sử dụng để tương tác với máy tính và chạy các chương trình, thay vì giao diện đồ họa (GUI). Trong Rust, <code>rustup</code> là một công cụ dòng lệnh thiết yếu phục vụ cho việc quản lý các phiên bản Rust.
</div>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Nếu bạn không muốn sử dụng rustup vì lý do nào đó, vui lòng xem trang <a href="https://forge.rust-lang.org/infra/other-installation-methods.html">Các phương pháp cài đặt Rust khác</a> để biết thêm tùy chọn.
</div>

<p>Các bước sau đây sẽ cài đặt phiên bản ổn định mới nhất của trình biên dịch Rust. Tính ổn định của Rust đảm bảo rằng tất cả các ví dụ trong course này có thể biên dịch được sẽ tiếp tục biên dịch được với các phiên bản Rust mới hơn. Output có thể khác một chút giữa các phiên bản vì Rust thường cải thiện các thông báo lỗi và cảnh báo. Nói cách khác, bất kỳ phiên bản Rust mới hơn nào mà bạn cài đặt bằng các bước này đều sẽ hoạt động như mong đợi.</p>

<h3 class="task-heading">Ký hiệu Dòng lệnh</h3>
<p>Trong chương này và xuyên suốt cuốn sách, chúng tôi sẽ hiển thị một số lệnh được sử dụng trong terminal. Các dòng mà bạn nên nhập vào terminal đều bắt đầu bằng <code>$</code>. Bạn không cần phải nhập ký tự <code>$</code>; đó là dấu nhắc dòng lệnh được hiển thị để biểu thị sự bắt đầu của mỗi lệnh. Các dòng không bắt đầu bằng <code>$</code> thường hiển thị output của lệnh trước đó. Ngoài ra, các ví dụ dành riêng cho PowerShell sẽ sử dụng <code>&gt;</code> thay vì <code>$</code>.</p>

<h3 class="task-heading">Cài đặt rustup trên Linux hoặc macOS</h3>
<p>Nếu bạn đang sử dụng Linux hoặc macOS, hãy mở terminal và nhập lệnh sau:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh</code></pre>
</div>
<p>Lệnh này sẽ tải xuống một đoạn script và bắt đầu cài đặt công cụ <code>rustup</code>, công cụ này sẽ cài đặt phiên bản ổn định mới nhất của Rust. Bạn có thể được nhắc nhập mật khẩu. Nếu cài đặt thành công, dòng sau sẽ xuất hiện:</p>
<div class="code-snippet">
  <span class="code-lang">output</span>
  <pre><code>Rust is installed now. Great!</code></pre>
</div>
<p>Bạn cũng sẽ cần một linker, đây là một chương trình mà Rust sử dụng để nối các output đã biên dịch của nó thành một file. Nhiều khả năng là bạn đã có sẵn. Nếu bạn gặp lỗi linker, bạn nên cài đặt một trình biên dịch C, nó thường sẽ bao gồm một linker. Trình biên dịch C cũng hữu ích vì một số package Rust phổ biến phụ thuộc vào mã C và sẽ cần trình biên dịch C.</p>


<p>Trên macOS, bạn có thể nhận được trình biên dịch C bằng cách chạy:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ xcode-select --install</code></pre>
</div>
<p>Người dùng Linux thường nên cài đặt GCC hoặc Clang, tùy theo tài liệu của bản phân phối của họ. Ví dụ: nếu bạn sử dụng Ubuntu, bạn có thể cài đặt package <code>build-essential</code>.</p>

<h3 class="task-heading">Cài đặt rustup trên Windows</h3>
<p>Trên Windows, đi tới <a href="https://www.rust-lang.org/tools/install" target="_blank">https://www.rust-lang.org/tools/install</a> và làm theo hướng dẫn để cài đặt Rust. Tại một thời điểm nào đó trong quá trình cài đặt, bạn sẽ được nhắc cài đặt Visual Studio. Bước này cung cấp trình liên kết (linker) và các thư viện hệ thống cục bộ (native libraries) cần thiết để biên dịch (compile) chương trình. Nếu bạn cần trợ giúp thêm với bước này, xem <a href="https://rust-lang.github.io/rustup/installation/windows-msvc.html" target="_blank">https://rust-lang.github.io/rustup/installation/windows-msvc.html</a>.</p>
<p>Phần còn lại của cuốn sách này sử dụng các lệnh hoạt động trong cả <code>cmd.exe</code> và PowerShell. Nếu có những điểm khác biệt cụ thể, chúng tôi sẽ giải thích nên sử dụng cái nào.</p>

<h3 class="task-heading">Xử lý sự cố</h3>
<p>Để kiểm tra xem bạn đã cài đặt Rust chính xác chưa, hãy mở một shell và nhập dòng này:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ rustc --version</code></pre>
</div>
<p>Bạn sẽ thấy số phiên bản, mã hash của commit, và ngày commit cho phiên bản ổn định (stable) mới nhất đã được phát hành, theo định dạng sau:</p>
<div class="code-snippet">
  <span class="code-lang">output</span>
  <pre><code>rustc x.y.z (abcabcabc yyyy-mm-dd)</code></pre>
</div>
<p>Nếu bạn thấy thông tin này, bạn đã cài đặt Rust thành công! Nếu bạn không thấy thông tin này, hãy kiểm tra xem Rust có ở trong biến hệ thống <code>%PATH%</code> của bạn theo các cách sau.</p>
<p>Trong CMD của Windows, sử dụng:</p>
<div class="code-snippet">
  <span class="code-lang">cmd</span>
  <pre><code>&gt; echo %PATH%</code></pre>
</div>
<p>Trong PowerShell, sử dụng:</p>
<div class="code-snippet">
  <span class="code-lang">powershell</span>
  <pre><code>&gt; echo $env:Path</code></pre>
</div>
<p>Trong Linux và macOS, sử dụng:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ echo $PATH</code></pre>
</div>
<p>Nếu tất cả đều đúng mà Rust vẫn không hoạt động, có một số nơi bạn có thể nhận được trợ giúp. Tìm hiểu cách trao đổi với các Rustacean (một biệt danh ngớ ngẩn mà chúng tôi tự gọi mình) trên <a href="https://www.rust-lang.org/community" target="_blank">trang cộng đồng (community page)</a>.</p>

<h3 class="task-heading">Cập nhật và Gỡ cài đặt</h3>
<p>Khi Rust đã được cài đặt thông qua <code>rustup</code>, việc cập nhật lên phiên bản mới phát hành rất dễ dàng. Từ shell của bạn, chạy lệnh cập nhật sau:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ rustup update</code></pre>
</div>
<p>Để gỡ cài đặt Rust và <code>rustup</code>, chạy lệnh gỡ cài đặt sau từ shell của bạn:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ rustup self uninstall</code></pre>
</div>

<h3 class="task-heading">Đọc Tài liệu Ngoại tuyến</h3>
<p>Việc cài đặt Rust cũng bao gồm một bản sao cục bộ của tài liệu để bạn có thể đọc offline. Chạy lệnh <code>rustup doc</code> để mở tài liệu nội bộ trong trình duyệt của bạn.</p>
<p>Bất kỳ lúc nào, khi một kiểu (type) hoặc hàm (function) được cung cấp bởi thư viện chuẩn (standard library) và bạn không chắc chắn nó làm gì hoặc cách sử dụng nó, hãy sử dụng tài liệu giao diện lập trình ứng dụng (API) để tìm hiểu!</p>

<h3 class="task-heading">Sử dụng Trình Soạn thảo Văn bản và IDE</h3>
<p>Cuốn sách này không có giả định nào về những công cụ bạn sử dụng để viết mã Rust. Hầu hết bất kỳ trình soạn thảo văn bản nào cũng sẽ làm được việc! Tuy nhiên, nhiều trình soạn thảo văn bản và môi trường phát triển tích hợp (IDE) có hỗ trợ sẵn cho Rust. Bạn luôn có thể tìm thấy danh sách khá cập nhật của nhiều trình soạn thảo và IDE trên <a href="https://www.rust-lang.org/tools">trang công cụ</a> thuộc website của Rust.</p>

<h3 class="task-heading">Làm việc Ngoại tuyến với Cuốn Sách Này</h3>
<p>Trong một vài ví dụ, chúng ta sẽ sử dụng các package của Rust nằm ngoài standard library (thư viện chuẩn). Để thực hành qua những ví dụ đó, bạn sẽ cần kết nối internet HOẶC tải sẵn các thư viện phụ thuộc đó từ trước. Để tải các thư viện phụ thuộc đó, bạn có thể chạy các command sau. (Chúng tôi sẽ giải thích chi tiết cargo là gì và những command này để làm gì ở phần sau.)</p>
  <div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new get-dependencies
$ cd get-dependencies
$ cargo add rand@0.8.5 trpl@0.2.0</code></pre>
</div>
<p>Lệnh này sẽ lưu bộ nhớ đệm (cache) việc tải xuống cho những packages nói trên, qua đó bạn sẽ không phải cần tải lại chúng vào thời điểm sau này nữa.nh công những lệnh vừa rồi, bạn không cần phải giữ lại thư mục <code>get-dependencies</code> nữa.</p>
`,
    defaultCode: `// Hãy thử chạy lệnh này trong terminal của bạn:
// $ rustc --version
// $ cargo --version

fn main() {
    println!("Rust đã được cài đặt thành công!");
    println!("Phiên bản rustc: kiểm tra bằng lệnh rustc --version");
}
`,
    expectedOutput: 'Rust đã được cài đặt thành công!\nPhiên bản rustc: kiểm tra bằng lệnh rustc --version'
};
