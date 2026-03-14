import { Lesson } from '../../courses';

export const ch12_06: Lesson = {
            id: 'ch12-06',
            title: '12.6 Chuyển hướng Errors đến Standard Error',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Hiện tại, chúng ta đang viết tất cả output của mình ra terminal sử dụng macro println!. Trong hầu hết các terminals, có hai loại output: standard output (stdout) cho thông tin chung và standard error (stderr) cho các thông báo lỗi. Sự phân biệt này cho phép người dùng chọn chuyển hướng output thành công của một program đến một file nhưng vẫn in các thông báo lỗi ra màn hình.</p>

<p>Macro println! chỉ có thể in ra standard output, vì vậy chúng ta phải sử dụng thứ khác để in ra standard error.</p>

<h3 class="task-heading">Kiểm tra nơi Errors được viết</h3>
<p>Trước tiên, hãy quan sát cách nội dung được in bởi minigrep hiện đang được viết ra standard output, bao gồm bất kỳ thông báo lỗi nào chúng ta muốn viết ra standard error. Chúng ta sẽ làm điều đó bằng cách chuyển hướng standard output stream đến một file trong khi cố tình gây ra một lỗi. Chúng ta sẽ không chuyển hướng standard error stream, vì vậy bất kỳ nội dung nào được gửi đến standard error sẽ tiếp tục hiển thị trên màn hình.</p>

<p>Các chương trình command line được kỳ vọng gửi các thông báo lỗi đến standard error stream để chúng ta vẫn có thể thấy các thông báo lỗi trên màn hình ngay cả khi chúng ta chuyển hướng standard output stream đến một file. Chương trình của chúng ta hiện không behave tốt: Chúng ta sắp thấy nó lưu output thông báo lỗi vào một file thay vì!</p>

<p>Để demonstrate behavior này, chúng ta sẽ chạy program với > và file path, output.txt, mà chúng ta muốn chuyển hướng standard output stream đến. Chúng ta sẽ không truyền bất kỳ arguments nào, điều đó sẽ gây ra một lỗi:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run > output.txt</code></pre>
</div>

<p>Cú pháp > yêu cầu shell viết contents của standard output vào output.txt thay vì màn hình. Chúng ta không thấy thông báo lỗi chúng ta mong đợi được in ra màn hình, vì vậy có nghĩa là nó đã kết thúc trong file. Đây là nội dung của output.txt:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>Problem parsing arguments: not enough arguments</code></pre>
</div>

<p>Đúng vậy, thông báo lỗi của chúng ta đang được in ra standard output. Nó hữu ích hơn nhiều cho các thông báo lỗi như thế này được in ra standard error để chỉ data từ một successful run kết thúc trong file. Chúng ta sẽ thay đổi điều đó.</p>

<h3 class="task-heading">In Errors đến Standard Error</h3>
<p>Chúng ta sẽ sử dụng code trong Listing 12-24 để thay đổi cách các thông báo lỗi được in. Do việc refactoring chúng ta đã làm trước đó trong chương này, tất cả code in các thông báo lỗi nằm trong một function, main. Standard library cung cấp macro eprintln! in ra standard error stream, vì vậy hãy thay đổi hai nơi chúng ta đang gọi println! để in các lỗi sử dụng eprintln! thay vì.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();

    let config = Config::build(&args).unwrap_or_else(|err| {
        eprintln!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    if let Err(e) = run(config) {
        eprintln!("Application error: {e}");
        process::exit(1);
    }
}</code></pre>
</div>
<p><em>Listing 12-24: Writing error messages to standard error instead of standard output using eprintln!</em></p>

<p>Bây giờ hãy chạy lại program theo cùng cách, không có arguments và chuyển hướng standard output với >:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run > output.txt
Problem parsing arguments: not enough arguments</code></pre>
</div>

<p>Bây giờ chúng ta thấy error trên màn hình và output.txt không chứa gì, đó là behavior chúng ta mong đợi của các chương trình command line.</p>

<p>Hãy chạy lại program với arguments không gây ra lỗi nhưng vẫn chuyển hướng standard output đến một file, như sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run -- to poem.txt > output.txt</code></pre>
</div>

<p>Chúng ta sẽ không thấy bất kỳ output nào ra terminal, và output.txt sẽ chứa kết quả của chúng ta:</p>

<p>Filename: output.txt</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>Are you nobody, too?
How dreary to be somebody!</code></pre>
</div>

<p>Điều này demonstrates rằng chúng ta hiện đang sử dụng standard output cho successful output và standard error cho error output khi thích hợp.</p>

<h3 class="task-heading">Tóm tắt</h3>
<p>Chương này đã tổng kết một số khái niệm chính bạn đã học cho đến nay và cover cách thực hiện các operations I/O phổ biến trong Rust. Bằng cách sử dụng command line arguments, files, environment variables, và macro eprintln! để in các lỗi, bạn bây giờ đã sẵn sàng để viết các command line applications. Kết hợp với các khái niệm trong các chương trước, code của bạn sẽ được tổ chức tốt, lưu trữ data hiệu quả trong các cấu trúc dữ liệu phù hợp, xử lý lỗi tốt, và được test kỹ lưỡng.</p>

<p>Tiếp theo, chúng ta sẽ khám phá một số tính năng Rust bị ảnh hưởng bởi các ngôn ngữ functional: closures và iterators.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Standard Error:</strong>
  <ul>
    <li><strong>stdout</strong> - Standard output cho thông tin chung</li>
    <li><strong>stderr</strong> - Standard error cho thông báo lỗi</li>
    <li><strong>println!()</strong> - In ra stdout</li>
    <li><strong>eprintln!()</strong> - In ra stderr</li>
    <li><strong>> file.txt</strong> - Chuyển hướng stdout đến file</li>
    <li><strong>2> file.txt</strong> - Chuyển hướng stderr đến file</li>
  </ul>
</div>
`,
            defaultCode: `use std::env;

fn main() {
    // Test eprintln! (in ra stderr)
    eprintln!("Day la loi: Khong tim thay file");

    // Test println! (in ra stdout)
    println!("Day la ket qua thanh cong");

    // Test chuyen huong
    println!("\\n=== Chuong trinh ket thuc ===");
}
`,
            expectedOutput: 'Day la loi: Khong tim thay file\nDay la ket qua thanh cong\n\n=== Chuong trinh ket thuc ==='
        };
