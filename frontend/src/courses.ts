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
  isExercise?: boolean; // flag to mark as exercise
  testCode?: string;    // hidden test code to append for validation
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

<h3 class="task-heading">Thiết lập Thư mục Dự án</h3>
<p>Bạn sẽ bắt đầu bằng cách tạo một thư mục để lưu trữ mã Rust của mình. Đối với Rust, mã của bạn nằm ở đâu không quan trọng, nhưng đối với các bài tập và dự án trong cuốn sách này, chúng tôi khuyên bạn nên tạo một thư mục <code>projects</code> trong thư mục home (thư mục cá nhân) của bạn và giữ tất cả các dự án của bạn ở đó.</p>
<p>Mở một terminal và nhập các lệnh sau: </p>
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

<h3 class="task-heading">Cơ bản về Chương trình Rust</h3>
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
<p>Bất kể hệ điều hành của bạn là gì, chuỗi <code>Hello, world!</code> sẽ được in ra terminal. Nếu bạn không thấy output này, hãy tham khảo ChatGPT nhận trợ giúp.</p>
<p>Nếu <code>Hello, world!</code> đã được in ra, xin chúc mừng! Bạn đã chính thức viết một chương trình Rust. Chúc mừng, bạn đã trở thành một lập trình viên Rust thực thụ — chào mừng bạn!</p>

<h3 class="task-heading">Phân tích Cấu trúc của một Chương trình Rust</h3>
<p>Hãy xem xét chương trình <code>Hello, world!</code> này một cách chi tiết. Đây là mảnh ghép đầu tiên của bài toán:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {

}</code></pre>
</div>
<p>Các dòng này định nghĩa một function (hàm) có tên là <code>main</code>. Hàm <code>main</code> rất đặc biệt: Nó luôn là đoạn code đầu tiên chạy trong mọi chương trình Rust. Ở đây, dòng đầu tiên khai báo một hàm tên là <code>main</code> không có tham số nào và không trả về điều gì. Nếu nó có các tham số, chúng sẽ nằm bên trong cặp ngoặc đơn <code>()</code>.</p>
<p>Nội dung của "thân hàm" được bao bọc trong <code>{}</code>. Rust yêu cầu dấu ngoặc móc xung quanh mọi phần "thân" của hàm. Sẽ là phong cách lập trình tốt nếu bạn đặt dấu ngoặc móc mở trên cùng một dòng với khai báo hàm, chỉ cách nhau một khoảng trắng.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Nếu bạn muốn có một style chuẩn trên các dự án Rust, bạn có thể sử dụng một công cụ tự format mã được gọi là <code>rustfmt</code> để định dạng code của bạn theo một style cụ thể (đọc thêm chi tiết về rustfmt ở Appendix D). Đội ngũ Rust đã gói công cụ này chung với công cụ khác của Rust thông qua việc cài đặt bằng rustup.
</div>

<p>Phần thân hàm <code>main</code> chứa đoạn mã sau:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    println!("Hello, world!");</code></pre>
</div>
<p>Dòng này thực hiện toàn bộ công việc trong chương trình nhỏ này: Nó in chữ lên màn hình máy tính. Có ba chi tiết quan trọng mà bạn cần lưu ý ở đây.</p>
<p>Thứ nhất, <code>println!</code> gọi một <em>Rust macro</em>. Nếu như nó đã từng gọi một function thay thế, nó đã phải được cung cấp là <code>println</code> (không có dấu <code>!</code>). Các Rust macro là một cách để viết code mà dùng vào việc phát sinh code để tự mở rộng cho cấu trúc của hệ lệnh. Chúng ta sẽ nói thêm về nó ở Chapter 20. Bây giờ, bạn chỉ cần biết một điều rằng dùng cái dấu <code>!</code> tức là ám chỉ ta đang chạy kích hoạt một marco chứ không phải một function chuẩn và cái loại macro sẽ không tuân thủ các quy định như mấy functions cho lắm.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>macro</em> là một đoạn mã tự động sinh được sử dụng để giảm bớt sự lặp lại, thường kết thúc bằng dấu chấm than <code>!</code> trong Rust.
</div>

<p>Thứ hai, bạn thấy chuỗi <code>"Hello, world!"</code>. Chúng ta truyền dữ liệu chuỗi (string) sử dụng cách giống như việc chúng ta truyền tham số cho lệnh <code>println!</code>, và đó là dòng chính sẽ thực hiện lệnh của chương trình này.</p>
<p>Thứ ba, chúng ta kết thúc dòng lệnh ấy cho với ký tự chấm phẩy (<code>;</code>) ở chỗ cuối cùng của dòng lệnh, điều này nói rằng câu lệnh đến đây là kết thúc, câu lệnh mới có thể bắt đầu ngay sau nó.</p>

<h3 class="task-heading">Biên dịch và Thực thi</h3>
<p>Bạn vừa khởi tạo thành công một chương trình mới, giờ là lúc chúng ta xem xét lại từng bước trong quy trình này.</p>
<p>Trước khi có thể chạy 1 chương trình Rust, bạn phải biên dịch nó sang mã máy, công cụ bạn đã sử dụng là <code>rustc</code>:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ rustc main.rs</code></pre>
</div>
<p>Nếu bạn đã có nền tảng ngôn ngữ C hoặc C++, hẳn sẽ cũng thấy thấy điểm giống nhau giữa các ngôn ngữ này, sau khi sử dụng <code>gcc</code> hoặc <code>clang</code>. Các ngôn ngữ này luôn luôn tạo ra 1 tệp mã nhị phân đi kèm.</p>
<p>Trên Linux, macOS và PowerShell trên Windows, bạn có thể xem tệp thực thi bằng cách nhập lệnh <code>ls</code> trong terminal:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ ls
main  main.rs</code></pre>
</div>
<p>Trên Linux và macOS, bạn sẽ thấy hai tệp. Với PowerShell trên Windows, bạn sẽ thấy ba tệp tương tự như khi dùng CMD. Với máy ảo hoặc CMD trên Windows, bạn sử dụng lệnh <code>dir</code>:</p>
<div class="code-snippet">
  <span class="code-lang">cmd</span>
  <pre><code>> dir /B %= Tùy chọn /B yêu cầu chỉ hiển thị tên tệp =%
main.exe
main.pdb
main.rs</code></pre>
</div>
<p>Kết quả này hiển thị tệp mã nguồn có phần mở rộng <code>.rs</code>, tệp thực thi (<code>main.exe</code> trên Windows, hoặc <code>main</code> trên các nền tảng khác), và nếu dùng Windows, bạn sẽ thấy thêm tệp <code>.pdb</code> chứa thông tin gỡ lỗi. Từ đây, bạn có thể thực thi chương trình bằng cách chạy tệp <code>main</code> hoặc <code>main.exe</code>:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ ./main # hoặc .\\main trên Windows</code></pre>
</div>
<p>Nếu tệp <code>main.rs</code> là chương trình "Hello, world!", dòng lệnh này sẽ in chuỗi <code>Hello, world!</code> ra terminal của bạn.</p>
<p>Nếu bạn đã quen thuộc với các ngôn ngữ động như Ruby, Python hoặc JavaScript, bạn có thể thấy lạ lẫm với việc biên dịch và chạy chương trình là hai bước tách biệt. Rust là một ngôn ngữ biên dịch trước, nghĩa là bạn có thể biên dịch chương trình và đưa tệp thực thi cho người khác để họ chạy ngay cả khi không cài đặt Rust trên máy. Ngược lại, nếu bạn đưa cho ai đó một tệp <code>.rb</code>, <code>.py</code> hoặc <code>.js</code>, họ buộc phải cài đặt trình thông dịch tương ứng. Tuy nhiên, trong các ngôn ngữ đó, bạn chỉ cần một lệnh duy nhất để chạy chương trình. Mọi thiết kế ngôn ngữ đều là một sự đánh đổi.</p>

<p>Việc biên dịch trực tiếp bằng <code>rustc</code> là ổn đối với các chương trình đơn giản. Tuy nhiên, khi dự án lớn dần, bạn sẽ cần một công cụ mạnh mẽ hơn để quản lý các tùy chọn và chia sẻ mã nguồn. Tiếp theo, chúng ta sẽ làm quen với <strong>Cargo</strong> — trợ thủ đắc lực trong việc phát triển các dự án Rust thực thụ.</p>
`,
        defaultCode: `fn main() {
    // TODO: In ra "Hello, world!" bằng println! macro
    
}
`,
        expectedOutput: 'Hello, world!',
        testCode: `
#[cfg(test)]
mod tests {
    use std::process::Command;

    #[test]
    fn test_hello_world_macro() {
        let compile = Command::new("rustc")
            .arg("main.rs")
            .arg("-o").arg("student_main")
            .output()
            .expect("Failed to execute rustc");
            
        assert!(compile.status.success(), "Không thể biên dịch mã nguồn của bạn.");

        let run = Command::new("./student_main")
            .output()
            .expect("Failed to run the program");

        let stdout = String::from_utf8_lossy(&run.stdout);
        let output_trimmed = stdout.trim();

        assert_eq!(output_trimmed, "Hello, world!", "Output sinh ra là '{}' chứ không phải 'Hello, world!'", output_trimmed);
    }
}
`
      },
      {
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
