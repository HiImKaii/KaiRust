import { Lesson } from '../../courses';

export const ch12_01: Lesson = {
            id: 'ch12-01',
            title: '12.1 Nhận tham số Command Line',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Hãy tạo một project mới với cargo new như thường lệ. Chúng ta sẽ gọi project của mình là minigrep để phân biệt với grep tool mà bạn có thể đã có trên hệ thống của mình:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new minigrep
     Created binary (application) \`minigrep\` project
$ cd minigrep</code></pre>
</div>

<p>Nhiệm vụ đầu tiên là làm cho minigrep chấp nhận hai command line arguments: file path và một chuỗi để tìm kiếm. Đó là, chúng ta muốn có thể chạy chương trình với cargo run, hai dấu gạch ngang để chỉ ra các arguments sau là cho chương trình của chúng ta chứ không phải cho cargo, một chuỗi để tìm kiếm, và một path đến file để tìm kiếm, như sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run -- searchstring example-filename.txt</code></pre>
</div>

<p>Hiện tại, chương trình được tạo bởi cargo new không thể xử lý arguments chúng ta cho nó. Một số thư viện hiện có trên crates.io có thể giúp viết một chương trình chấp nhận command line arguments, nhưng vì bạn đang học khái niệm này, hãy tự implement khả năng này.</p>

<h3 class="task-heading">Đọc giá trị Arguments</h3>
<p>Để cho phép minigrep đọc các giá trị của command line arguments mà chúng ta truyền cho nó, chúng ta cần function std::env::args được cung cấp trong standard library của Rust. Function này trả về một iterator của các command line arguments được truyền cho minigrep. Chúng ta sẽ cover iterators đầy đủ trong Chương 13. Hiện tại, bạn chỉ cần biết hai chi tiết về iterators: Iterators tạo ra một series of values, và chúng ta có thể gọi method collect trên một iterator để biến nó thành một collection, chẳng hạn như một vector, chứa tất cả các elements mà iterator tạo ra.</p>

<p>Code trong Listing 12-1 cho phép chương trình minigrep của bạn đọc bất kỳ command line arguments nào được truyền cho nó và sau đó collect các giá trị thành một vector.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::env;

fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();
    dbg!(args);
}</code></pre>
</div>
<p><em>Listing 12-1: Collecting the command line arguments into a vector and printing them</em></p>

<p>Trước tiên, chúng ta đưa module std::env vào scope với một use statement để chúng ta có thể sử dụng function args của nó. Lưu ý rằng function std::env::args được lồng trong hai cấp độ modules. Như chúng ta đã thảo luận trong Chương 7, trong các cases nơi function mong muốn được lồng trong nhiều hơn một module, chúng ta đã chọn đưa parent module vào scope thay vì function. Bằng cách làm như vậy, chúng ta có thể dễ dàng sử dụng các functions khác từ std::env. Nó cũng ít ambiguous hơn là thêm use std::env::args và sau đó gọi function với chỉ args, vì args có thể dễ bị nhầm lẫn với một function được định nghĩa trong module hiện tại.</p>

<h4>Function args và Invalid Unicode</h4>
<p>Lưu ý rằng std::env::args sẽ panic nếu bất kỳ argument nào chứa invalid Unicode. Nếu chương trình của bạn cần chấp nhận arguments chứa invalid Unicode, hãy sử dụng std::env::args_os thay vì. Function đó trả về một iterator tạo ra các giá trị OsString thay vì String values. Chúng ta đã chọn sử dụng std::env::args ở đây vì sự đơn giản vì các giá trị OsString khác nhau cho mỗi platform và phức tạp hơn để làm việc so với các giá trị String.</p>

<p>Trên dòng đầu tiên của main, chúng ta gọi env::args, và chúng ta ngay lập tức sử dụng collect để biến iterator thành một vector chứa tất cả các giá trị được tạo ra bởi iterator. Chúng ta có thể sử dụng function collect để tạo ra nhiều loại collections, vì vậy chúng ta explicitly annotate type của args để chỉ định rằng chúng ta muốn một vector of strings. Mặc dù bạn rất hiếm khi cần annotate types trong Rust, collect là một function bạn thường cần annotate vì Rust không thể infer loại collection bạn muốn.</p>

<p>Cuối cùng, chúng ta in vector sử dụng debug macro. Hãy thử chạy code trước với không có arguments và sau đó với hai arguments:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.61s
     Running \`target/debug/minigrep\`
[src/main.rs:5:5] args = [
    "target/debug/minigrep",
]

$ cargo run -- needle haystack
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 1.57s
     Running \`target/debug/minigrep needle haystack\`
[src/main.rs:5:5] args = [
    "target/debug/minigrep",
    "needle",
    "haystack",
]</code></pre>
</div>

<p>Lưu ý rằng giá trị đầu tiên trong vector là "target/debug/minigrep", đây là tên của binary của chúng ta. Điều này matches behavior của arguments list trong C, cho phép programs sử dụng tên mà chúng được gọi trong execution của chúng. Thường thuận tiện để có quyền truy cập vào program name trong trường hợp bạn muốn in nó trong messages hoặc thay đổi hành vi của chương trình dựa trên command line alias nào được sử dụng để gọi chương trình. Nhưng cho mục đích của chương này, chúng ta sẽ bỏ qua nó và chỉ lưu hai arguments mà chúng ta cần.</p>

<h3 class="task-heading">Lưu giá trị Arguments trong Variables</h3>
<p>Chương trình hiện tại có thể truy cập các giá trị được chỉ định là command line arguments. Bây giờ chúng ta cần lưu các giá trị của hai arguments trong variables để chúng ta có thể sử dụng các giá trị trong phần còn lại của chương trình. Chúng ta làm điều đó trong Listing 12-2.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::env;

fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();

    let query = &args[1];
    let file_path = &args[2];

    println!("Searching for {query}");
    println!("In file {file_path}");
}</code></pre>
</div>
<p><em>Listing 12-2: Creating variables to hold the query argument and file path argument</em></p>

<p>Như chúng ta đã thấy khi in vector, tên của chương trình chiếm giá trị đầu tiên trong vector tại args[0], vì vậy chúng ta bắt đầu arguments tại index 1. Argument đầu tiên mà minigrep nhận là chuỗi mà chúng ta đang tìm kiếm, vì vậy chúng ta put một reference đến argument đầu tiên trong variable query. Argument thứ hai sẽ là file path, vì vậy chúng ta put một reference đến argument thứ hai trong variable file_path.</p>

<p>Chúng ta tạm thời in các giá trị của các variables này để chứng minh code đang hoạt động như chúng ta định. Hãy chạy lại chương trình này với các arguments là test và sample.txt:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run -- test sample.txt
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.0s
     Running \`target/debug/minigrep test sample.txt\`
Searching for test
In file sample.txt</code></pre>
</div>

<p>Tuyệt vời, chương trình đang hoạt động! Các giá trị của các arguments mà chúng ta cần đang được lưu vào đúng variables. Sau đó chúng ta sẽ thêm một số error handling để xử lý một số potential erroneous situations, chẳng hạn như khi người dùng không cung cấp arguments; bây giờ, chúng ta sẽ bỏ qua tình huống đó và thay vào đó tập trung vào việc thêm khả năng đọc file.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt nhận Command Line Arguments:</strong>
  <ul>
    <li><strong>std::env::args()</strong> - Trả về iterator của command line arguments</li>
    <li><strong>.collect()</strong> - Chuyển iterator thành collection</li>
    <li><strong>args[0]</strong> - Tên chương trình (binary)</li>
    <li><strong>args[1]</strong> - Argument đầu tiên (query)</li>
    <li><strong>args[2]</strong> - Argument thứ hai (file path)</li>
    <li><strong>std::env::args_os()</strong> - Cho phép invalid Unicode</li>
  </ul>
</div>
`,
            defaultCode: `use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    // Lấy query và file path từ command line arguments
    let query = &args[1];
    let file_path = &args[2];

    println!("=== Minigrep CLI ===");
    println!("Searching for: {}", query);
    println!("In file: {}", file_path);

    // Đọc nội dung file
    let contents = std::fs::read_to_string(file_path)
        .expect("Khong the doc file");

    println!("\\n=== File Contents ===");
    println!("{}", contents);
}
`,
            expectedOutput: '=== Minigrep CLI ===\nSearching for: test\nIn file: sample.txt\n\n=== File Contents ===\n[file contents]'
        };
