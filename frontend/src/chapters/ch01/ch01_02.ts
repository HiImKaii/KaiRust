import { Lesson } from '../../courses';

export const ch01_02: Lesson = {
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
};
