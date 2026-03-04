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
  <strong>Lưu ý:</strong> Nếu bạn không muốn sử dụng rustup vì lý do nào đó, vui lòng xem trang Other Rust Installation Methods để biết thêm tùy chọn.
</div>

<p>Các bước sau đây sẽ cài đặt phiên bản ổn định mới nhất của trình biên dịch Rust. Các đảm bảo về tính ổn định của Rust đảm bảo rằng tất cả các ví dụ trong sách có thể biên dịch được sẽ tiếp tục biên dịch được với các phiên bản Rust mới hơn. Output có thể khác một chút giữa các phiên bản vì Rust thường cải thiện các thông báo lỗi và cảnh báo. Nói cách khác, bất kỳ phiên bản Rust ổn định, mới hơn nào mà bạn cài đặt bằng các bước này đều sẽ hoạt động như mong đợi với nội dung của cuốn sách này.</p>

<h3 class="task-heading">Ký hiệu dòng lệnh (Command Line Notation)</h3>
<p>Trong chương này và xuyên suốt cuốn sách, chúng tôi sẽ hiển thị một số lệnh được sử dụng trong terminal. Các dòng mà bạn nên nhập vào terminal đều bắt đầu bằng <code>$</code>. Bạn không cần phải nhập ký tự <code>$</code>; đó là dấu nhắc dòng lệnh được hiển thị để biểu thị sự bắt đầu của mỗi lệnh. Các dòng không bắt đầu bằng <code>$</code> thường hiển thị output của lệnh trước đó. Ngoài ra, các ví dụ dành riêng cho PowerShell sẽ sử dụng <code>&gt;</code> thay vì <code>$</code>.</p>

<h3 class="task-heading">Cài đặt rustup trên Linux hoặc macOS</h3>
<p>Nếu bạn đang sử dụng Linux hoặc macOS, hãy mở terminal và nhập lệnh sau:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh</code></pre>
</div>
<p>Lệnh này sẽ tải xuống một đoạn script và bắt đầu cài đặt công cụ rustup, công cụ này sẽ cài đặt phiên bản ổn định mới nhất của Rust. Bạn có thể được nhắc nhập mật khẩu. Nếu cài đặt thành công, dòng sau sẽ xuất hiện:</p>
<div class="code-snippet">
  <span class="code-lang">output</span>
  <pre><code>Rust is installed now. Great!</code></pre>
</div>
<p>Bạn cũng sẽ cần một linker, đây là một chương trình mà Rust sử dụng để nối các output đã biên dịch của nó thành một file. Nhiều khả năng là bạn đã có sẵn. Nếu bạn gặp lỗi linker, bạn nên cài đặt một trình biên dịch C, nó thường sẽ bao gồm một linker. Trình biên dịch C cũng hữu ích vì một số package Rust phổ biến phụ thuộc vào mã C và sẽ cần trình biên dịch C.</p>
<p>Trên macOS, bạn có thể tải trình biên dịch C bằng cách chạy:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ xcode-select --install</code></pre>
</div>
<p>Người dùng Linux thường nên cài đặt GCC hoặc Clang, tùy theo tài liệu của bản phân phối của họ. Ví dụ: nếu bạn sử dụng Ubuntu, bạn có thể cài đặt package <code>build-essential</code>.</p>

<h3 class="task-heading">Cài đặt rustup trên Windows</h3>
<p>Trên Windows, đi tới <a href="https://www.rust-lang.org/tools/install" target="_blank">https://www.rust-lang.org/tools/install</a> và làm theo hướng dẫn để cài đặt Rust. Tại một thời điểm nào đó trong quá trình cài đặt, bạn sẽ được nhắc cài đặt Visual Studio. Bước này cung cấp trình liên kết (linker) và các thư viện hệ thống cần thiết để biên dịch (compile) chương trình. Nếu bạn cần trợ giúp thêm với bước này, xem <a href="https://rust-lang.github.io/rustup/installation/windows-msvc.html" target="_blank">https://rust-lang.github.io/rustup/installation/windows-msvc.html</a>.</p>
<p>Phần còn lại của cuốn sách này sử dụng các lệnh hoạt động trong cả <code>cmd.exe</code> và PowerShell. Nếu có những điểm khác biệt cụ体, chúng tôi sẽ giải thích nên sử dụng cái nào.</p>

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
<p>Trong CMD của Windows, sử dụng: <code>&gt; echo %PATH%</code></p>
<p>Trong PowerShell, sử dụng: <code>&gt; echo $env:Path</code></p>
<p>Trong Linux và macOS, sử dụng: <code>$ echo $PATH</code></p>
<p>Nếu tất cả đều đúng mà Rust vẫn không hoạt động, có một số nơi bạn có thể nhận được trợ giúp. Tìm hiểu cách liên lạc với các Rustacean (một biệt danh ngớ ngẩn mà chúng tôi tự gọi mình) khác trên <a href="https://www.rust-lang.org/community" target="_blank">trang cộng đồng</a>.</p>

<h3 class="task-heading">Cập nhật và Gỡ cài đặt (Updating and Uninstalling)</h3>
<p>Khi Rust đã được cài đặt thông qua <code>rustup</code>, việc cập nhật lên phiên bản mới phát hành rất dễ dàng. Từ shell của bạn, chạy script cập nhật sau:</p>
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
<p>Việc cài đặt Rust cũng bao gồm một bản sao cục bộ của tài liệu để bạn có thể đọc ngoại tuyến. Chạy lệnh <code>rustup doc</code> để mở tài liệu cục bộ trong trình duyệt của bạn.</p>
<p>Bất kỳ lúc nào, khi một kiểu (type) hoặc hàm (function) được cung cấp bởi thư viện chuẩn (standard library) và bạn không chắc chắn nó làm gì hoặc cách sử dụng nó, hãy sử dụng tài liệu giao diện lập trình ứng dụng (API) để tìm hiểu!</p>
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
<p>Bây giờ bạn đã cài đặt Rust, đã đến lúc viết chương trình Rust đầu tiên của bạn. Thường thì, theo truyền thống khi học một ngôn ngữ mới, việc viết một chương trình nhỏ in văn bản <code>Hello, world!</code> lên màn hình là điều phổ biến, vì vậy chúng ta sẽ làm tương tự ở đây!</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Sách này giả định bạn đã quen thuộc cơ bản về dòng lệnh. Rust không có yêu cầu cụ thể nào về việc chỉnh sửa hoặc công cụ hoặc nơi mã của bạn được lưu trữ, vì vậy nếu bạn thích sử dụng IDE thay vì dòng lệnh, bạn thoải mái hãy sử dụng IDE mà bạn yêu thích. Nhiều IDE hiện nay có hỗ trợ Rust ở một mức độ nào đó; hãy kiểm tra tài liệu của IDE để biết chi tiết. Đội ngũ Rust đã tập trung vào việc hỗ trợ IDE tuyệt vời thông qua <code>rust-analyzer</code>.
</div>

<h3 class="task-heading">Thiết lập Thư mục Dự án (Project Directory Setup)</h3>
<p>Bạn sẽ bắt đầu bằng cách tạo một thư mục để lưu trữ mã Rust của mình. Đối với Rust, mã của bạn nằm ở đâu không quan trọng, nhưng đối với các bài tập và dự án trong cuốn sách này, chúng tôi khuyên bạn nên tạo một thư mục <code>projects</code> trong thư mục home của bạn và giữ tất cả các dự án của bạn ở đó.</p>
<p>Mở một terminal và nhập các lệnh sau để tạo một thư mục <code>projects</code> và một thư mục cho dự án “Hello, world!” bên trong thư mục <code>projects</code>.</p>
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
<p>Tiếp theo, hãy tạo một source file mới và đặt tên cho nó là <code>main.rs</code>. Các tệp Rust luôn có phần mở rộng <code>.rs</code>. Nếu bạn sử dụng nhiều hơn một từ trong tên tệp của mình, theo quy ước bạn nên sử dụng dấu gạch dưới để tách chúng. Ví dụ: hãy sử dụng <code>hello_world.rs</code> thay vì <code>helloworld.rs</code>.</p>
<p>Bây giờ hãy mở tệp <code>main.rs</code> bạn vừa tạo và nhập đoạn code sau:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("Hello, world!");
}</code></pre>
</div>
<p>Lưu tệp và quay lại cửa sổ terminal trong thư mục <code>~/projects/hello_world</code>. Trên Linux hoặc macOS, nhập các lệnh sau để biên dịch và chạy file:</p>
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
<p>Bất kể hệ điều hành của bạn là gì, chuỗi <code>Hello, world!</code> sẽ in ra terminal. Nếu bạn không thấy output này, hãy tham khảo lại phần "Xử lý sự cố" của mục Cài đặt để biết các cách nhận trợ giúp.</p>

<h3 class="task-heading">Phân tích Cấu trúc một Chương trình Rust (The Anatomy of a Rust Program)</h3>
<p>Hãy xem xét chương trình “Hello, world!” này một cách chi tiết. Đây là mảnh ghép đầu tiên:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {

}</code></pre>
</div>
<p>Các dòng này định nghĩa một hàm (function) có tên <code>main</code>. Hàm <code>main</code> là đặc biệt: Nó luôn là đoạn code đầu tiên chạy trong mọi chương trình Rust có thể thực thi. Ở đây, dòng đầu tiên khai báo một hàm tên là <code>main</code> không có tham số (parameters) và không trả về giá trị nào. Nếu có các tham số, chúng sẽ nằm bên trong cặp ngoặc đơn <code>()</code>.</p>
<p>Nội dung hàm được bao bọc trong <code>{}</code>. Rust yêu cầu ngoặc nhọn xung quanh mọi nội dung hàm. Tốt nhất là đặt ngoặc nhọn mở trên cùng một dòng với khai báo hàm, chỉ cách nhau một khoảng trắng.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Nếu bạn muốn bám vào một kiểu tiêu chuẩn trên các dự án Rust, bạn có thể sử dụng một công cụ format mã tự động được gọi là <code>rustfmt</code> để định dạng code của bạn theo một kiểu cụ thể. Đội ngũ Rust đã bao gồm công cụ này chung với phần phân phối Rust chuẩn, giống như <code>rustc</code>, điều đó có nghĩa là nó đã được cài đặt sẵn trên máy tính của bạn!
</div>

<p>Phần body của hàm <code>main</code> chứa đoạn mã sau:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    println!("Hello, world!");</code></pre>
</div>
<p>Dòng này thực hiện toàn bộ công việc trong chương trình nhỏ này: Nó in văn bản lên màn hình. Có ba chi tiết quan trọng cần lưu ý ở đây.</p>
<p>Thứ nhất, <code>println!</code> gọi một Rust macro. Nếu nó gọi một hàm thay thế, nó sẽ được nhập là <code>println</code> (không có dấu <code>!</code>). Các Rust macro là một cách để viết mã nhằm tạo ra mã để mở rộng cú pháp Rust. Bây giờ, bạn chỉ cần biết rằng việc sử dụng dấu <code>!</code> có nghĩa là bạn đang gọi một macro thay vì một hàm thông thường và macro không luôn tuân theo các quy tắc giống như các hàm.</p>
<p>Thứ hai, bạn thấy chuỗi <code>"Hello, world!"</code>. Chúng ta truyền chuỗi này dưới vai trò tham số (argument) cho <code>println!</code>, và chuỗi này được hiển thị lên màn hình.</p>
<p>Thứ ba, chúng ta kết thúc dòng lệnh bằng dấu chấm phẩy (<code>;</code>), biểu thị rằng biểu thức (expression) này đã kết thúc và biểu thức tiếp theo đã sẵn sàng để bắt đầu. Hầu hết các dòng lệnh Rust đều kết thúc bằng dấu chấm phẩy.</p>

<h3 class="task-heading">Biên dịch và Thực thi là Hai Bước Riêng Biệt</h3>
<p>Bạn vừa chạy một chương trình vừa được tạo ra, vì vậy hãy phân tích từng bước trong quy trình này.</p>
<p>Trước khi chạy một chương trình Rust, bạn phải biên dịch nó bằng trình biên dịch (compiler) Rust bằng cách nhập lệnh <code>rustc</code> và truyền cho nó tên tệp nguồn, như sau:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ rustc main.rs</code></pre>
</div>
<p>Nếu có nền tảng C hoặc C++, bạn sẽ nhận thấy cú pháp này rất giống với <code>gcc</code> hoặc <code>clang</code>. Sau khi compile thành công, Rust xuất file nhị phân (binary executable). Trên Linux, macOS, và PowerShell của Windows, bạn có thể xem tệp khả thi bằng cách nhập lệnh <code>ls</code> trong shell của bạn.</p>
<p>Rust là một ngôn ngữ "ahead-of-time compiled" (biên dịch trước/biên dịch trước khi thực thi), có nghĩa là bạn có thể biên dịch một chương trình và gửi file có thể thực thi (executable file) đó cho người khác, và họ có thể chạy nó ngay cả khi không có cài đặt Rust trên thiết bị của họ.</p>
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
<p>Cargo là hệ thống build (xây dựng) và là trình quản lý package (gói) của Rust. Hầu hết các Rustacean sử dụng công cụ này để quản lý các dự án Rust của họ vì Cargo xử lý rất nhiều tác vụ cho bạn, như xây dựng code, tải xuống các thư viện mà code của bạn phụ thuộc vào, và biên dịch các thư viện đó. (Chúng ta gọi các thư viện mà mã của bạn cần là dependencies (phụ thuộc)).</p>
<p>Các chương trình Rust đơn giản nhất, như chương trình chúng ta vừa viết, không có bất kỳ thư viện phụ thuộc nào. Nếu chúng ta đã build dự án "Hello, world!" bằng Cargo, nó chỉ sử dụng phần của Cargo xử lý việc build code của bạn. Khi bạn viết các chương trình Rust phức tạp hơn, bạn sẽ bổ sung thêm các dependencies, và nếu bạn bắt đầu một project sử dụng Cargo, việc thêm các dependencies này sẽ dễ dàng hơn rất nhiều.</p>
<p>Vì hấu hết các dự án Rust trên thế giới sẽ sử dụng Cargo, nên phần còn lại của cuốn sách này giả định rằng bạn cũng đang sử dụng Cargo. Cargo được cài đặt sẵn cùng với Rust nếu bạn đã sử dụng trình cài đặt chính thức như được thảo luận trong mục "Cài đặt". Nếu bạn cài đặt Rust thông qua các phương tiện khác, bạn có thể kiểm tra xem Cargo đã được cài đặt chưa bằng cách nhập lệnh sau vào terminal của bạn:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo --version</code></pre>
</div>
<p>Nếu bạn thấy mã phiên bản, chứng tỏ bạn đã cài đặt! Nếu bạn gặp lỗi, như <code>command not found</code>, hãy xem phần tài liệu phương pháp cài đặt của bạn để tìm cách cài đặt lại cho Cargo một cách riêng biệt.</p>

<h3 class="task-heading">Tạo một Dự án với Cargo (Creating a Project with Cargo)</h3>
<p>Hãy cùng tạo một dự án mới sử dụng Cargo và xem cách nó khác biệt so với dự án "Hello, world!" ban đầu của chúng ta như thế nào. Trở về cái thư mục <code>projects</code> của bạn (hoặc bất kỳ nơi nào bạn quyết định đặt code cho các dự án của bạn). Sau đó, hãy chạy cái nội dung như sau, trên bất kỳ một hệ thống điều hành nào:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new hello_cargo
$ cd hello_cargo</code></pre>
</div>
<p>Lệnh đầu tạo ra một directory và một dự án với cái tên là <code>hello_cargo</code>. Chúng ta đã đặt tên cho dự án là <code>hello_cargo</code>, và tương ứng thì ta cũng sẽ thấy được hệ thống Cargo cũng đã khởi tạo ra những nội dung với cái cùng y một cái tên tại đó.</p>
<p>Hãy vào thử trong thư mục của <code>hello_cargo</code> rồi tự kiểm tra, ta thấy Cargo đã sinh ra được cho ta một thư mục cùng với lại hai file khác: là thư mục <code>src</code> với <code>main.rs</code> tại trong đó, cùng là cả file <code>Cargo.toml</code> nữa.</p>
<p>Điều này cũng tương đương với nó cũng đã khởi tạo luôn cho ta một cái git cùng file <code>.gitignore</code> rồi. Git đương nhiên sẽ chỉ tự động sinh nếu như ta thao tác tạo bằng lệnh của <code>cargo new</code> này trên một chỗ mà chưa từng tồn tại gì thì thôi; tuy nhiên bạn vẫn có thể để đè ghi những thao tác như một cơ chế sử dụng bằng phương thức là <code>cargo new --vcs=git</code>.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Git là hệ thống quản lý các bản lưu thông dụng nhất ở hiện nay. Ngươi có thế sửa đổi cho <code>cargo new</code> chạy hệ thống khác thay vì Git, hoặc thay vì thế là không dùng bất kỳ các cách thức lưu file nhờ chỉ dùng cú flag này <code>--vcs</code>. Chỉ một việc nhỏ dùng <code>cargo new --help</code> là ta đã để xem có những phương chọn như sao.
</div>

<p>Hãy thử vào đọc file <code>Cargo.toml</code> này với cái khung cho các chỉnh sửa nội dung văn bản mà dùng bạn ưa thích, bạn xem nội dụng như vậy thì coi ra có như vầy không:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2024"

[dependencies]</code></pre>
</div>
<p>Đấy chính là các định dạng từ TOML thế này (Tom’s Obvious, Minimal Language), đó cũng là một khung dùng chuyên việc setting cho hệ thống từ cái Cargo có này đấy.</p>
<p>Với ở đầu thì, <code>[package]</code>, đó làm một định để nhằm cho báo cáo việc những phát biểu đi dưới nhằm setting cho cái package này. Khi mà mình bổ sung các nội dụng ở nội file thế đó, mình rồi đó mà cũng thì sẽ có đi nhiều dạng kiểu tương dương y.</p>
<p>Ở đây ba dòng, sẽ thực báo thiết đặt này là hệ thống với việc sử dụng Cargo phải được báo: là tên cùng loại phiên, cùng một định dùng từ cái Rust để thế nào nha cho tương đương thế thôi.</p>
<p>Cái khung cùng thì vậy ở <code>[dependencies]</code> nhé bạn. Với như những loại khung setting cho hệ thống sẽ tạo nên một việc để cho cái ứng dụng của tớ cho ra đời. Trong ứng dụng, Rust chỉ luôn quy chuẩn tất các gói ứng dụng theo dạng kiểu làm để nó là crates. Ở trong dự tính đây, những phần ứng dụng về lúc như này đây và không dùng một crate này vậy đâu.</p>

<h3 class="task-heading">Khởi dựng (Build) và Chạy (Run) Dự án Cargo</h3>
<p>Vậy thì sẽ thế xem ra như nào đây mà giờ để được việc sử khởi tạo cùng dùng chạy cái kiểu về lúc dự "Hello, world!" dùng với là từ tại của Cargo đây nè! Ở vào khu chỗ mục từ thư có ở tại nơi bạn gọi ở <code>hello_cargo</code> vào ngay, xây thử một lần hệ dụng của các loại code nhờ cái báo hiệu trên đây để bạn đây này:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
   Compiling hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 1.89s</code></pre>
</div>
<p>Chính lệnh làm được như này việc đó sẽ đưa lại một dạng chạy ở trên có <code>target/debug/hello_cargo</code> (vào việc trên thì hệ đó tạo trên thư Windows thì bạn báo hiệu là <code>target\\debug\\hello_cargo.exe</code> ở tại thế này đó rồi nha) với cả là thay là trên khu hệ từ ở dự đang thì là tại như này. Ở đây hệ đó đều dùng lúc cho lúc ở đó định dạng của debug thôi do default, thì do đấy thì lúc cho từ tại là cái xuất bản là ở trong <code>debug</code> này này. Có dùng cho từ file thể đây như báo lệnh vào lúc đây:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ ./target/debug/hello_cargo # or .\\target\\debug\\hello_cargo.exe on Windows
Hello, world!</code></pre>
</div>
<p>Mỗi khi việc như chúng đều vậy đều được việc dùng với <code>cargo run</code> thì sao cũng đều xây hệ khởi dụng (compile) vào tại như chỉ với một tại trong mã vào này thôi được nhé:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.0s
     Running \`target/debug/hello_cargo\`
Hello, world!</code></pre>
</div>
<p>Bên phía đó một cái của Cargo này thì nó cũng hỗ dụng một dùng tên được <code>cargo check</code> nha bạn. Khung này chỉ làm vào một nhanh cho mục là từ cái mã nó có được khởi dụng nhưng mà nó sẽ từ đấy sẽ không dùng tạo đến cho việc làm file đây nhé:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo check
    Checking hello_cargo v0.1.0 (file:///projects/hello_cargo)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.32s</code></pre>
</div>
<p>Bởi như sao cơ để có mà không làm cho file luôn đó hả? Đều gì chứ <code>cargo check</code> là thì đều hay làm quá mức việc đó vì tốc nó chạy đó là nó cũng chả tới độ nó làm tới cái file nó tạo ra cái kiểu đó nữa nè vì so như với chỉ mỗi <code>cargo build</code> thôi. Bởi khi ở cái lúc mà tại mình có kiểm qua có để đó hay thôi ở lúc để rồi nha tớ tại cái đấy thì dùng <code>cargo check</code> đây thì tốc lại cao cho cái độ từ đấy ở có phải tại đấy là xây xong thôi đấy nữa nha!</p>
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
