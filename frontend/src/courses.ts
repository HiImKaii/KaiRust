// =====================================================
// KaiRust Course Data — Sourced from "The Rust Programming Language" Book
// Structure: Chapter > Lessons
// =====================================================

export interface Lesson {
  id: string;
  title: string;
  duration: string;     // estimated reading/practice time
  type: 'theory' | 'practice' | 'quiz';
  content: string;      // HTML content for instruction panel
  defaultCode?: string; // pre-filled code for Monaco editor
  expectedOutput?: string;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

// Import chapter data
import { ch02 } from './chapters/ch02';
import { ch03 } from './chapters/ch03';
import { ch04 } from './chapters/ch04';
import { ch05 } from './chapters/ch05';
import { ch06 } from './chapters/ch06';
import { ch07 } from './chapters/ch07';
import { ch08 } from './chapters/ch08';
import { ch09 } from './chapters/ch09';
import { ch10 } from './chapters/ch10';
import { ch11 } from './chapters/ch11';
import { ch12 } from './chapters/ch12';
import { ch13 } from './chapters/ch13';
import { ch14 } from './chapters/ch14';
import { ch15 } from './chapters/ch15';
import { ch16 } from './chapters/ch16';
import { ch17 } from './chapters/ch17';
import { ch18 } from './chapters/ch18';
import { ch19 } from './chapters/ch19';
import { ch20 } from './chapters/ch20';

export const courseData: Chapter[] = [
  {
    id: 'ch01',
    title: 'Chương 1: Bắt đầu với Rust',
    lessons: [
      {
        id: 'ch01-01',
        title: '1.1 Cài đặt Rust (Installation)',
        duration: '10 phút',
        type: 'theory',
        content: `
<p>Bước đầu tiên là cài đặt Rust. Chúng ta sẽ tải Rust thông qua <code>rustup</code>, một công cụ dòng lệnh để quản lý các phiên bản Rust và các công cụ liên quan. Bạn sẽ cần kết nối internet để tải xuống.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>command line</em> (dòng lệnh) là giao diện dựa trên văn bản được sử dụng để tương tác với máy tính và chạy các chương trình, thay vì giao diện đồ họa (GUI). Trong Rust, <code>rustup</code> là một công cụ dòng lệnh thiết yếu phục vụ cho việc quản lý các phiên bản Rust.
</div>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Nếu bạn không muốn sử dụng rustup vì lý do nào đó, vui lòng xem trang <a href="https://forge.rust-lang.org/infra/other-installation-methods.html">Other Rust Installation Methods (Các phương pháp cài đặt Rust khác)</a> để biết thêm tùy chọn.
</div>

<p>Các bước sau đây sẽ cài đặt phiên bản ổn định mới nhất của trình biên dịch Rust (Rust compiler). Các đảm bảo về tính ổn định của Rust đảm bảo rằng tất cả các ví dụ trong sách có thể biên dịch được sẽ tiếp tục biên dịch được với các phiên bản Rust mới hơn. Output có thể khác một chút giữa các phiên bản vì Rust thường cải thiện các thông báo lỗi và cảnh báo. Nói cách khác, bất kỳ phiên bản Rust ổn định, mới hơn nào mà bạn cài đặt bằng các bước này đều sẽ hoạt động như mong đợi với nội dung của cuốn sách này.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>compiler</em> (trình biên dịch) là một chương trình dịch mã nguồn được viết bằng ngôn ngữ lập trình (như Rust) thành mã ngôn ngữ máy nhị phân có thể thực thi được trên máy tính. Trong trường hợp của Rust, compiler là công cụ tạo ra file chương trình cuối cùng để bạn có thể chạy.
</div>

<h3 class="task-heading">Ký hiệu Dòng lệnh (Command Line Notation)</h3>
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

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>linker</em> (trình liên kết) là một chương trình lấy một hoặc nhiều object file được tạo bởi trình biên dịch (compiler) và kết hợp chúng thành một chương trình chạy được (executable) đơn nhất, thư viện (library), hoặc một "object" file (tệp nhị phân) duy nhất khác.
</div>

<p>Trên macOS, bạn có thể nhận được trình biên dịch C bằng cách chạy:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ xcode-select --install</code></pre>
</div>
<p>Người dùng Linux thường nên cài đặt GCC hoặc Clang, tùy theo tài liệu của bản phân phối của họ. Ví dụ: nếu bạn sử dụng Ubuntu, bạn có thể cài đặt package <code>build-essential</code>.</p>

<h3 class="task-heading">Cài đặt rustup trên Windows</h3>
<p>Trên Windows, đi tới <a href="https://www.rust-lang.org/tools/install" target="_blank">https://www.rust-lang.org/tools/install</a> và làm theo hướng dẫn để cài đặt Rust. Tại một thời điểm nào đó trong quá trình cài đặt, bạn sẽ được nhắc cài đặt Visual Studio. Bước này cung cấp trình liên kết (linker) và các thư viện hệ thống cục bộ (native libraries) cần thiết để biên dịch (compile) chương trình. Nếu bạn cần trợ giúp thêm với bước này, xem <a href="https://rust-lang.github.io/rustup/installation/windows-msvc.html" target="_blank">https://rust-lang.github.io/rustup/installation/windows-msvc.html</a>.</p>
<p>Phần còn lại của cuốn sách này sử dụng các lệnh hoạt động trong cả <code>cmd.exe</code> và PowerShell. Nếu có những điểm khác biệt cụ thể, chúng tôi sẽ giải thích nên sử dụng cái nào.</p>

<h3 class="task-heading">Xử lý sự cố (Troubleshooting)</h3>
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

<h3 class="task-heading">Cập nhật và Gỡ cài đặt (Updating and Uninstalling)</h3>
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

<h3 class="task-heading">Đọc Tài liệu Offline (Reading the Local Documentation)</h3>
<p>Việc cài đặt Rust cũng bao gồm một bản sao cục bộ của tài liệu để bạn có thể đọc offline. Chạy lệnh <code>rustup doc</code> để mở tài liệu nội bộ trong trình duyệt của bạn.</p>
<p>Bất kỳ lúc nào, khi một kiểu (type) hoặc hàm (function) được cung cấp bởi thư viện chuẩn (standard library) và bạn không chắc chắn nó làm gì hoặc cách sử dụng nó, hãy sử dụng tài liệu giao diện lập trình ứng dụng (API) để tìm hiểu!</p>

<h3 class="task-heading">Sử dụng Trình Soạn thảo Văn bản và IDE (Using Text Editors and IDEs)</h3>
<p>Cuốn sách này không có giả định nào về những công cụ bạn sử dụng để viết mã Rust. Hầu hết bất kỳ trình soạn thảo văn bản (text editor) nào cũng sẽ làm được việc! Tuy nhiên, nhiều text editor và môi trường phát triển tích hợp (integrated development environments - IDEs) có hỗ trợ sẵn cho Rust. Bạn luôn có thể tìm thấy danh sách khá cập nhật của nhiều trình soạn thảo và IDE trên <a href="https://www.rust-lang.org/tools">trang công cụ (tools page)</a> thuộc website của Rust.</p>

<h3 class="task-heading">Làm việc Ngoại tuyến (Offline) với Cuốn Sách Này</h3>
<p>Trong một vài ví dụ, chúng ta sẽ sử dụng các package của Rust nằm ngoài standard library (thư viện chuẩn). Để thực hành qua những ví dụ đó, bạn sẽ cần kết nối internet HOẶC tải sẵn các dependencies (các phụ thuộc) đó từ trước. Để tải các dependencies trước, bạn có thể chạy các command sau. (Chúng tôi sẽ giải thích chi tiết cargo là gì và những command này để làm gì ở phần sau.)</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new get-dependencies
$ cd get-dependencies
$ cargo add rand@0.8.5 trpl@0.2.0</code></pre>
</div>
<p>Lệnh này sẽ lưu bộ nhớ đệm (cache) việc tải xuống (downloads) cho những packages nói trên, qua đó bạn sẽ không phải cần tải lại chúng vào thời điểm sau này nữa. Một khi mà bạn đã chạy thành công những lệnh vừa rồi, bạn không cần phải giữ lại thư mục <code>get-dependencies</code> nữa. Nếu như có làm trò này nha, thì bạn có quyền cho dùng cái tham số flag là <code>--offline</code> đi cùng toàn bộ mọi lệnh có trong cargo xuyên suốt trong sách nhằm dùng đồ đã được cache sẵn trong máy mà chả thử cố gắng xài đến kết nối mạng làm gì nữa đâu.</p>
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
      },
      {
        id: 'ch01-02',
        title: '1.2 Hello, World!',
        duration: '15 phút',
        type: 'practice',
        content: `
<p>Bây giờ bạn đã cài đặt Rust, đã đến lúc viết chương trình Rust đầu tiên của bạn. Theo truyền thống khi học một ngôn ngữ mới, việc viết một chương trình nhỏ in ra văn bản <code>Hello, world!</code> lên màn hình là điều phổ biến, vì vậy chúng ta sẽ làm tương tự ở đây!</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Cuốn sách này giả định bạn đã quen thuộc cơ bản về dòng lệnh. Rust không có yêu cầu cụ thể nào về công cụ chỉnh sửa hoặc vị trí lưu trữ mã của bạn, vì vậy nếu bạn thích sử dụng IDE thay vì terminal dòng lệnh, bạn thoải mái sử dụng IDE mà bạn yêu thích. Nhiều IDE hiện nay có hỗ trợ Rust ở một mức độ nào đó; hãy kiểm tra tài liệu của IDE để biết chi tiết. Đội ngũ Rust đã tập trung vào việc kích hoạt hỗ trợ IDE tuyệt vời thông qua <code>rust-analyzer</code>. Xem Appendix D để biết thêm chi tiết.
</div>

<h3 class="task-heading">Thiết lập Thư mục Dự án (Project Directory Setup)</h3>
<p>Bạn sẽ bắt đầu bằng cách tạo một thư mục để lưu trữ mã Rust của mình. Đối với Rust, mã của bạn nằm ở đâu không quan trọng, nhưng đối với các bài tập và dự án trong cuốn sách này, chúng tôi khuyên bạn nên tạo một thư mục <code>projects</code> trong thư mục home (thư mục cá nhân) của bạn và giữ tất cả các dự án của bạn ở đó.</p>
<p>Mở một terminal và nhập các lệnh sau để tạo một thư mục <code>projects</code> và một thư mục cho dự án <code>Hello, world!</code> bên trong thư mục <code>projects</code>.</p>
<p>Đối với Linux, macOS và PowerShell trên Windows, nhập:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ mkdir ~/projects
$ cd ~/projects
$ mkdir hello_world
$ cd hello_world</code></pre>
</div>
<p>Đối với Windows CMD, nhập:</p>
<div class="code-snippet">
  <span class="code-lang">cmd</span>
  <pre><code>&gt; mkdir "%USERPROFILE%\\projects"
&gt; cd /d "%USERPROFILE%\\projects"
&gt; mkdir hello_world
&gt; cd hello_world</code></pre>
</div>

<h3 class="task-heading">Cơ bản về Chương trình Rust (Rust Program Basics)</h3>
<p>Tiếp theo, hãy tạo một source file (tệp tin mã nguồn) mới và đặt tên cho nó là <code>main.rs</code>. Các tệp Rust luôn kết thúc bằng phần mở rộng <code>.rs</code>. Nếu bạn sử dụng nhiều hơn một từ trong tên tệp của mình, theo quy ước bạn nên sử dụng dấu gạch dưới để tách chúng ra. Ví dụ: hãy sử dụng <code>hello_world.rs</code> thay vì <code>helloworld.rs</code>.</p>
<p>Bây giờ hãy mở tệp <code>main.rs</code> bạn vừa tạo và nhập đoạn code ở <em>Listing 1-1</em>.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("Hello, world!");
}</code></pre>
</div>
<p><em>Listing 1-1</em></p>

<p>Lưu file và quay lại cửa sổ terminal của bạn trong thư mục <code>~/projects/hello_world</code>. Trên Linux hoặc macOS, nhập các lệnh sau để compile (biên dịch) và chạy file:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ rustc main.rs
$ ./main
Hello, world!</code></pre>
</div>
<p>Trên Windows, nhập lệnh <code>.\\main</code> thay vì <code>./main</code>:</p>
<div class="code-snippet">
  <span class="code-lang">cmd</span>
  <pre><code>&gt; rustc main.rs
&gt; .\\main
Hello, world!</code></pre>
</div>
<p>Bất kể hệ điều hành của bạn là gì, chuỗi <code>Hello, world!</code> sẽ được in ra terminal. Nếu bạn không thấy output này, hãy tham khảo lại phần "Troubleshooting" (Xử lý sự cố) của mục Cài đặt (Installation) để biết các cách nhận trợ giúp.</p>
<p>Nếu <code>Hello, world!</code> đã được in ra, xin chúc mừng! Bạn đã chính thức viết một chương trình Rust. Điều đó làm cho bạn trở thành một lập trình viên Rust (Rust programmer) — chào mừng bạn!</p>

<h3 class="task-heading">Phân tích Cấu trúc của một Chương trình Rust (The Anatomy of a Rust Program)</h3>
<p>Hãy xem xét chương trình <code>Hello, world!</code> này một cách chi tiết. Đây là mảnh ghép đầu tiên của bài toán:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {

}</code></pre>
</div>
<p>Các dòng này định nghĩa một function (hàm) có tên là <code>main</code>. Hàm <code>main</code> rất đặc biệt: Nó luôn là mã (code) đầu tiên chạy trong mọi chương trình Rust có thể thực thi (executable Rust program). Ở đây, dòng đầu tiên khai báo (declares) một hàm tên là <code>main</code> không có tham số (parameters) nào và không trả về điều gì. Nếu nó có các tham số, chúng sẽ nằm bên trong cặp ngoặc đơn <code>()</code>.</p>
<p>Nội dung của "thân hàm" (function body) được bao bọc trong <code>{}</code>. Rust yêu cầu dấu ngoặc móc (nhọn) xung quanh mọi phần "thân" của hàm. Sẽ là phong cách lập trình tốt (good style) nếu bạn đặt dấu ngoặc móc mở trên cùng một dòng với khai báo hàm (function declaration), chỉ cách nhau một khoảng trắng (space).</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Nếu bạn muốn bám sát vào một style quy chuẩn (standard style) trên các dự án Rust, bạn có thể sử dụng một công cụ tự format mã được gọi là <code>rustfmt</code> để định dạng code của bạn theo một style cụ thể (đọc thêm chi tiết về rustfmt ở Appendix D). Đội ngũ Rust đã bao gồm công cụ này chung với công cụ Rust phân phối trực tiếp mặc định (standard Rust distribution), giống như <code>rustc</code>, điều đó có nghĩa là nó đã được cài sẵn trên thiết bị của bạn từ trước!
</div>

<p>Phần body của hàm <code>main</code> chứa đoạn mã sau:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    println!("Hello, world!");</code></pre>
</div>
<p>Dòng này thực hiện toàn bộ công việc trong chương trình nhỏ này: Nó in chữ lên màn hình máy tính. Có ba chi tiết quan trọng mà bạn cần lưu ý ở đây.</p>
<p>Thứ nhất, <code>println!</code> gọi một <em>Rust macro</em>. Nếu như nó đã từng gọi một function thay thế, nó đã phải được cung cấp là <code>println</code> (không có dấu <code>!</code>). Các Rust macro (macro của thuật Rust) là một cách để viết code mà dùng vào việc phát sinh code để tự mở rộng cho cấu trúc của hệ lệnh (syntax). Lúc bây giờ đây, ta sẽ thảo đàm thêm những chi tiết nó ở một Chapter 20 sau nhé. Bây giờ, bạn chỉ cần biết một điều rằng dùng cái dấu <code>!</code> tức là ám chỉ ta đang chạy kích hoạt một marco chứ chả phải một function quy chuẩn (normal function) gì sất và cái loại macro sẽ không có sự tuân đúng các đạo luật (rules) như mấy thẻ functions cho lắm.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>macro</em> là một đoạn mã tự động sinh (code generator) được sử dụng để giảm bớt sự lặp lại, thường kết thúc bằng dấu chấm than <code>!</code> trong Rust.
</div>

<p>Thứ hai, bạn thấy chuỗi <code>"Hello, world!"</code>. Chúng ta truyền dữ liệu chữ chuỗi này (string) sử dụng cách mà ta cho nhận thông điệp như tham số (argument) nhằm được cho lệnh <code>println!</code>, và cái dòng từ đó sẽ thực hiện hiện nó lên trên ở tại cái thiết bị này.</p>
<p>Thứ ba, chúng ta kết thúc dòng lệnh ấy cho với ký tự chấm phẩy (<code>;</code>) ở ngay chỗ sau nhất của lệnh được kết ấy nha, việc mang sự nói rằng cái điều được biểu hiện (expression) đó khi thì đến lúc đã sự có được của chấm dứt, và sự biểu thức nữa khác sẽ ngay từ phía sau nối sẵn. Khá có không ít code Rust đều là tự đều chấm rớt cho kiểu mang dấu đó nha.</p>

<h3 class="task-heading">Biên dịch (Compilation) và Thực thi (Execution)</h3>
<p>Bạn vừa khởi động thành công cho phần chạy có những mới mẻ sinh lên, vậy là hãy làm khảo một lúc cùng tại của việc từ từng lúc của mỗi nhịp đi nha.</p>
<p>Khi đó ta cho một lệnh mà chạy phần từ chương ứng như là code cho phần ngôn Rust này, bạn ở nhất bắt quyết thì sẽ lấy phần đưa ra một bản chạy thông từ hệ máy chạy là biên dịch Rust (Rust compiler) với cách của cung đi hiệu cho máy lệnh bằng nhập thông qua đây nha cho phần <code>rustc</code> sau đó với chuyển tại qua phần file mã để tại tên của bạn đấy, thí dụ là vậy đi:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ rustc main.rs</code></pre>
</div>
<p>Nếu bạn đã có "gốc" (background) bằng dùng ngôn ngữ C hoặc ngôn kiểu như C++, hẳn sẽ cũng thấy dễ thấy điểm trùng ý khá tại vì ở của định (syntax) như kiểu <code>gcc</code> hoặc như là phần <code>clang</code>. Ở ngay chỗ đi kế sau đoạn của thao chuyển hóa này nếu thực có phần tạo hiệu hiệu (compiled successfully), từ Rust tạo luôn từ xuất sẽ là được của loại file ở nhị phân để có phần để cho để máy chạy (binary executable).</p>
<p>Lúc khi trên phần này với dùng có ở ở như với Mac của macOS hay là ở những các dòng PowerShell qua phần Window thì các có bạn ở lúc đó để thấy sẽ được loại đó tại file thực hiệu khi nhập dùng đó vào bằng cho vào cái <code>ls</code> từ trên máy dùng terminal đây:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ ls
main  main.rs</code></pre>
</div>
<p>Vậy trên cho phần tại có ở máy Linux hoặc Mac đó của vậy bạn dễ cho ở nhìn thấy là một đôi từ 2 thư từ này nhé. Với PowerShell đây lúc thì giống cũng cũng với CMD ở có Window bạn khi nhìn thấy đủ ở cũng vậy đi ba thư từ như với hệ này (CMD). Và riêng đây qua trên máy ở loại của bằng CMD trên máy với Window bạn phải có ở đi tại nhập lệnh ở vậy ngay:</p>
<div class="code-snippet">
  <span class="code-lang">cmd</span>
  <pre><code>&gt; dir /B %= the /B option says to only show the file names =%
main.exe
main.pdb
main.rs</code></pre>
</div>
<p>Cách lệnh đây in được của các ở các từ ở tại thư từ gốc đó cùng chung tại phần cuối chấm đó có cho tên <code>.rs</code> kia, tại vào của loại chạy thì thấy rõ (từ này <code>main.exe</code> thì tại đó của trên Window và tại đây như là ở máy trên từ thì <code>main</code> kia với cả hệ còn). Cùng qua đi nếu có trên máy hệ (Windows), ở từ có trong để có phần mang thông có vào tin dùng xử việc debug với thư <code>.pdb</code> tại với nó. Có ở phần tiếp đi chạy lúc phần từ <code>main</code> hoặc từ lúc <code>main.exe</code> nhé, tại vậy đi nha:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ ./main # hoặc là tại .\\main với Windows đó nha</code></pre>
</div>
<p>Ở cái điều tại có tại <code>main.rs</code> kia của bạn với chính thì lúc "Hello, world!" có của loại dùng ứng trình đó nhé, lúc đó có cái khi in ở hiện kết lại phần kết quả ở đó "Hello, world!" vào màn terminal nha bạn đó.</p>
<p>Nếu bạn với thấy đã làm cũng với thông hay biết gì từ có ở phần của từ ở bằng vào của ứng kiểu động (dynamic language), như có bằng là của phần loại Ruby, hay cùng loại với nữa như dùng JavaScript hoặc có ở bằng với dạng như thế Python bạn với thì tại cũng từ đó có làm qua ở chuyện đó nhưng không thể rõ quen trong đi thì của làm phải dùng cùng đi vào đoạn là khởi biên (compilation) rồi chạy liền cùng thì làm cách có cả có hai vào nhịp luôn như nào riêng lẻ đi nhau đâu. Môn ngôn của kiểu bằng loại với như Rust là (ahead-of-time compiled language) một định ngôn được tại làm có khởi biên chạy dịch qua đi với lúc để được phần đi vào lúc với xong ở thời kì (đi trước của được thực từ nha), biểu diễn kiểu có hiểu như vậy này nè thì để bạn đó tạo làm khởi qua từ ứng xong bằng cho cái từ khi đó được là máy chạy chuyển giao mang cấp đưa đi người có một máy bên ở một đấy khác (ngay kể nếu ở bằng ở máy đó nếu họ sẽ không việc mà chả xài có của việc từ ứng Rust), ở bên kia máy kia đi đấy họ lúc cũng sử dụng ở một liền ở đấy luôn để vậy cũng còn. Nếu với khi còn những ứng hệ khác kia như có loại phần có tại những khi mà tạo từ những ở những các bản file từ cuối ở bằng: <code>.rb</code>, <code>.py</code>, của cả tại đó như <code>.js</code> có cung nha cho người sử gì bên đó bên họ cũng vẫn của vậy có việc sẽ luôn đó có điều kiện phải cài thêm bộ dùng ở bằng cái ngôn đó thì như là (Ruby/Python/JS đi...) có luôn cài trong cái hệ (ít kiểu như là ứng phần cho được chạy cài của đó) . Ở phần để đi của kia khi đó nữa những với ngôn kia thế thì luôn cũng được có một duy để mà có 1 ở từ gọi duy nha 1 lệnh thôi đã khởi chạy luôn chạy từ đoạn từ này nữa kia thôi. Cho nên do gì gì cũng thế đi thì mọi điều rồi phải làm chuyện đánh mất lúc cũng trong đổi với khi ở cả phần vào cái mảng làm cho của các ở bằng ngôn nhé. (Everything is a trade-off in language design.)</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>ahead-of-time (AOT) compiled language</em> (Ngôn ngữ được biên dịch trước thời gian thực thi) là ngôn ngữ (như C, C++, Rust) nơi bạn viết mã, sử dụng trình biên dịch để kiểm tra mã và dịch thành tệp nhị phân độc lập. Khi đó trình biên dịch không còn cần thiết nữa để chạy trên máy của khách hàng. Trái ngược hoàn toàn với các ngôn ngữ động (Ruby/Python/Node) hoặc JIT nơi máy chủ chạy mã sẽ tự động dịch nó liên tục.
</div>

<p>Một với cách là cũng cùng khởi như của dịch có bằng <code>rustc</code> cũng thế thì ổn đấy thôi với qua đoạn cho phần ứng nhỏ con kia, từ khi một hệ đấy mà càng phát đến to hơn kia, vào khi kia bạn cũng với thì phải làm đến với sử vào mọi ở phần từ chức thêm cùng làm thế nào nha tạo để lúc đưa có lúc sẽ chia lúc lại nữa code đấy của bạn đi nha dễ nhất đi đấy. Tới tới phần tại của chỗ ở vào này nữa từ của đây với chúng tôi cũng có ở bằng làm có nói đến lúc Cargo kia, đó sẽ có ở cũng vào làm cho cho những ứng tại thực kiểu (real-world Rust programs) lớn lúc của nữa này.</p>
`,
        defaultCode: `fn main() {
    // TODO: In ra "Hello, world!" bằng println! macro
    
}
`,
        expectedOutput: 'Hello, world!'
      },
      {
        id: 'ch01-03',
        title: '1.3 Hello, Cargo!',
        duration: '20 phút',
        type: 'practice',
        content: `
<p>Cargo là hệ thống build (build system) và là trình quản lý package (package manager) của ngôn ngữ Rust. Hầu hết những Rustacean sử dụng vào công cụ quản lý đây để quản lấy hệ thống Rust dự của họ tại vì là ở đâu mà thì bản Cargo cũng có luôn việc nhận phụ có trách từ ở trong các tác quản của ta làm từ vào cho chính bản ta từ trên công việc, (một như tỷ dụ là có tại chức việc từ dùng vào xây để mã để khởi từ này ở build hệ mã cho bạn), rồi là ở những lúc lấy mà để tại download ở đây được để chạy ở những thư cho các với phần từ cái phần từ tại hệ để cần phụ làm code có mà ta thì ứng phải nhờ, cho ở tới tại việc sẽ được khỏi của biên vậy để từ ở những hệ thư này đấy đấy để. (Thì và ta làm và nói như với mọi kiểu về điều các kia thư cần dùng được tại do với việc mã phải có phụ lấy vào lúc đây mà chúng mã cần có được là dependencies - của "những bộ phụ thuộc").</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>package manager</em> (trình quản lý gói) là một công cụ lập trình giúp tự động hóa quá trình xử lý việc cài đặt, cấu hình, xử lý xung đột phiên bản giữa các thư viện mã nguồn bên thứ 3 (còn gọi là third-party libraries hay dependencies).
</div>

<p>Các chương từ ở dạng kiểu chương kiểu giản như có kiểu nhất tại đây của như về chương đó chúng ở trước chúng để đã viết kiểu ra có phần kia ở xa tít xa lúc để tới trước đó kia giờ đó, đã nào thì khi này có một bất dùng kỳ thì loại là một loại 1 bộ kia cũng đã cần dependencies kia không. Mà nếu ở ta có khi giả mà ở dự cũng là kiểu từ "Hello, world!" có hệ vào từ xây để với ở việc xây là Cargo, sẽ hệ cũng sẽ thì đó do chỉ sử được cho của trong tại các từ bằng vùng bộ có việc với Cargo cho nhận việc của xử luôn đi cái chỗ hệ ở đi cho với phần để cho build cái của làm code chạy đấy thôi làm của bản. Lúc ở đến sau bạn tại đã cũng tại sẽ lên với có làm cũng code lúc trình to hơn với các trong hệ và Rust những mà ứng dụng to lớn sẽ phức ở hơn đấy rất là hơn, ở thế bạn là phải thì đấy khi sẽ dùng của cả vào bổ lúc nhiều những các bằng lúc là có loại dependencies kiểu nhiều phần hơn kia cho thế, thì đó nếu đi mà lúc ngay điểm với từ để vào mới lúc khởi có bạn cùng đã cho của tại khởi của dự với ở tại khi thế thì đã Cargo có của đó luôn thì ngay ở đó của lúc đó vào có thì là bổ của các cùng vào nhiều kiểu dependencies sẽ đi vào việc và từ đi lại thì đó trở cực vào lúc đi nha dễ lại được cho của để sử nhé.</p>

<p>Vì hấu hết (cũng với rất vast ở đa tại đại với loại này) số ở trên cũng đã đều tại trên kia với Rust của các những từ dự để hệ này trên ứng đều mọi này kiểu toàn bộ với ở thì là trên kia thế thế rồi giới toàn được đấy trên toàn luôn sẽ sử trên lúc này Cargo nha, ở phần về cho cái phía từ của các cái nơi còn chỗ cũng đều của với cuốn sẽ này tài cuốn ở đây (cũng) thì đưa như ở mặc việc đó làm nhận là bạn với đây cũng sử bạn cũng đi làm là cho đang cũng đó với tại lại đang dùng như Cargo vậy nương ở cùng với nữa này này. Cargo được luôn đi thiết bị thì cài ở trong tại phía cùng ở trong đó Rust của kia nếu có nếu đã mà ở khi kiểu trình là ở những các ứng bằng loại bạn sử từ kia sử của kia lúc hệ chính kia là official installers như làm ở kia mục lúc là đã như kiểu đã qua cùng thảo luận lúc với nhau "cài quá đã đặt" cài thảo kia trong nói đó đã mục [“Installation”] rồi đấy. Bằng ở tại đi nếu bạn cho là ở đi do dùng ở từ do cài dùng vào cài khác ngoài từ những bằng cách phần loại với phương còn với thì của tại phần ngoài từ lúc bằng vậy đi việc từ như kiểm xem cũng phải luôn thì của Cargo vậy ở chỗ đã chưa, thì chạy có phần lệnh ở để nhập có phần dòng từ dưới sau lại tại vào nha terminal đây:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo --version</code></pre>
</div>
<p>Nếu bạn thấy mã phiên bản, chứng tỏ bạn đã cài đặt! Nếu bạn gặp lỗi, như <code>command not found</code>, hãy xem phần tài liệu phương pháp cài đặt của bạn để tìm cách cài đặt lại cho Cargo một cách riêng biệt.</p>

<h3 class="task-heading">Tạo một Dự án với Cargo (Creating a Project with Cargo)</h3>
<p>Hãy cùng tạo một dự án mới sử dụng Cargo và xem cách nó khác biệt so với dự án "Hello, world!" ban đầu của chúng ta như thế nào. Trở về cái thư mục <code>projects</code> của bạn (hoặc bất kỳ nơi nào bạn quyết định đặt code cho các dự án của bạn). Sau đó, hãy chạy cái nội dung như sau, trên bất kỳ một hệ điều hành nào:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new hello_cargo
$ cd hello_cargo</code></pre>
</div>
<p>Lệnh đầu tạo ra một directory và một dự án với cái tên là <code>hello_cargo</code>. Chúng ta đã đặt tên cho dự án là <code>hello_cargo</code>, và Cargo cũng sẽ sinh ra những file bên trong của nó ở thư mục cùng tên.</p>
<p>Hãy vào thư mục <code>hello_cargo</code> và list ra các file. Bạn sẽ thấy hệ thống tự gen ra 2 tệp với 1 thư mục riêng: một file <code>Cargo.toml</code> và một directory tên là <code>src</code> có chứa tệp <code>main.rs</code> bên trong.</p>

<p>Nó cũng tự động khởi tạo luôn một Git repository mới kèm theo một file <code>.gitignore</code>. Các file Git sẽ không được tạo ra nếu bạn gọi lệnh <code>cargo new</code> bên trong một thư mục vốn dĩ đã là repository Git sẵn rồi; bạn có thể ghi đè hành vi mặc định này bằng cách xài <code>cargo new --vcs=git</code>.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Git là một version control system (hệ thống kiểm soát phiên bản) thông dụng. Bạn có thể tinh chỉnh <code>cargo new</code> để xài một hệ thống khác hoặc không dùng cái nào thông qua cờ flag tên là <code>--vcs</code>. Chạy lệnh <code>cargo new --help</code> để thấy rõ các lựa chọn tinh chỉnh nha.
</div>

<p>Mở <code>Cargo.toml</code> ở một text editor tuỳ ý bạn chọn. Nó sẽ trông tựa tựa như thế này.</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2024"

[dependencies]</code></pre>
</div>
<p>Định dạng này là loại định dạng TOML (Tom’s Obvious, Minimal Language - Ngôn ngữ tối giản hiển nhiên của Tom), là ngôn ngữ configuration mặc định của Cargo.</p>
<p>Dòng đầu là <code>[package]</code>, một header section báo hiệu rằng lệnh bên dưới là để setting package. Chúng ta có thể thêm nhiều info nữa ở file này.</p>
<p>Ba dòng tiếp là để cung cấp cho Cargo thông tin biên dịch: tên gọi, bản version cùng với loại edition Rust. Tới Appendix E ta sẽ nói sâu hơn vụ này.</p>
<p>Dòng chốt là thẻ <code>[dependencies]</code>, điểm mở màn khai báo các cục libs (thư viện). Rust xem các packages code (gói code) với cái tên mỹ miều là crates. Ta chẳng xài crate nào trong project này cả, tuy nhiên đến Chapter 2 thì sẽ cần dùng.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>crate</em> trong Rust tương tự như thư viện (library) hoặc mô-đun (module) trong ngôn ngữ không phải Rust. Tại thế giới Rust, chúng được coi là khối cơ sở đơn vị dùng trong quá trình compile và tạo dependencies. Crate chia làm 2 loại: binary crate và library crate.
</div>

<p>Bây giờ bạn đọc file ở đường dẫn <code>src/main.rs</code> này coi:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("Hello, world!");
}</code></pre>
</div>
<p>Cargo cũng build ra một file "Hello world", và bạn thấy đó! Các source files nó đều tự bốc bỏ gọn vào <code>src</code>, để thư mục cha bọc riêng rẽ chỉ chứa README rồi config, giúp nhà cửa của đồ án ngăn nắp (everything is in its place).</p>
<p>Nếu bạn muốn biến một dự án build chay bình thường thành một dự án Cargo thì bạn chỉ việc move source sang src và chạy <code>cargo init</code> là được!</p>

<h3 class="task-heading">Khởi dựng và Chạy ứng dụng (Building and Running a Cargo Project)</h3>
<p>Hãy xem có điều chi khác biệt với một lệnh Build Cargo không nào. Đứng từ thư mục <code>hello_cargo</code>, dùng lệnh sau:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
   Compiling hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 2.85s</code></pre>
</div>
<p>Câu lệnh trên thay vì vứt file ra ngay folder, thì nó đưa file exe build của bản vô <code>target/debug/hello_cargo</code> (hoặc <code>target\\debug\\hello_cargo.exe</code> nếu trên thiết bị Windows). Mặc định luôn là bản debug. Khởi chạy file này thôi:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ ./target/debug/hello_cargo # or .\\target\\debug\\hello_cargo.exe on Windows
Hello, world!</code></pre>
</div>
<p>Chạy cargo bằng lệnh lần thứ 1 giúp sinh ra thêm file <code>Cargo.lock</code> khóa dependencies của bạn với các thông số an toàn. Bạn tuyệt đối đừng đổi nó thủ công nha.</p>
<p>Vậy ta đã cargo build rồi bật tay, thật dài dòng. Tại sao không xài thẳng <code>cargo run</code> để kích chạy build và chạy liền luôn tay?</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.0s
     Running \`target/debug/hello_cargo\`
Hello, world!</code></pre>
</div>
<p>Bạn chú ý đó, nó không còn nhắc gì compile gì ráo. Hệ thống nhận diện ta chả thay đổi file nào nên chả thèm build chi cho mệt. Nếu có đổi nội dung, ta sẽ thấy tin báo Compiling bật lên tiếp.</p>
<p>Hệ thống có lệnh <code>cargo check</code>, rà soát lỗi code với tốc độ lướt nhưng không nhè ra file nào cả, rất thích hợp test nháy tay cho Rustacean:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo check
    Checking hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.32s</code></pre>
</div>
<p>Tóm lại những gì học được từ Rust Cargo:</p>
<ul>
<li>Ta tạo project bằng lệnh <code>cargo new</code>.</li>
<li>Ta có lệnh xây cấu hình build bằng <code>cargo build</code>.</li>
<li>Bao trọn 2 khâu kia trong một phát gọi tên <code>cargo run</code>.</li>
<li>Quá trình biên dịch chỉ cần test thì dùng tên <code>cargo check</code> để tăng tốc rà soát.</li>
<li>Dữ liệu luôn được cất tủ đúng chuẩn tại ngăn tên <code>target/debug</code>.</li>
</ul>

<h3 class="task-heading">Build bản Chính thức Release (Building for Release)</h3>
<p>Một khi dự án đã sẵn sàng bay cao, ta hãy build với cái gờ flag <code>--release</code>. Việc này vứt file sinh ra sang mục <code>target/release</code>. Bạo liệt xài đủ các loại báu thuật tối ưu runtime (optimizations) giúp file nhị phân chạy tốc độ hơn bao giờ hết, bù lại chi phí khởi tạo sẽ thong thả hơn một tẻo téo. Benchmark cần bật cái này mới thấy chuẩn thật của đồ xịn.</p>

<h3 class="task-heading">Tận dụng Các Quy chuẩn của Cargo (Leveraging Cargo’s Conventions)</h3>
<p>Với các app cỏn con thì Cargo chỉ ngang bằng rustc. Nhưng để code bành trướng, nhiều folder chắp vá thì có anh Cargo giúp đời là ân lớn lao. Chỉ cần kéo lệnh <code>git clone</code> tải một cục source và đập vô máy rồi gõ nhẹ chiếc <code>cargo build</code> là bao dependencies xa cõi được rinh gọn lẹ.</p>
`,
        defaultCode: `// Đây là file src/main.rs được Cargo tạo tự động
// Khi bạn chạy "cargo new hello_cargo"

fn main() {
    println!("Hello, Cargo!");
    
    // TODO: Thêm tên của bạn vào đây
    // println!("Tôi là ...");
}
`,
        expectedOutput: 'Hello, Cargo!'
      }
    ]
  },
  ch02,
  ch03,
  ch04,
  ch05,
  ch06,
  ch07,
  ch08,
  ch09,
  ch10,
  ch11,
  ch12,
  ch13,
  ch14,
  ch15,
  ch16,
  ch17,
  ch18,
  ch19,
  ch20
];
