import { Lesson } from '../../courses';

export const ch13_03: Lesson = {
            id: 'ch13-03',
            title: '13.3 Cải thiện Project I/O',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Với kiến thức mới về iterators, chúng ta có thể cải thiện project I/O trong Chương 12 bằng cách sử dụng iterators để làm cho các đoạn code rõ ràng và súc tích hơn. Hãy xem cách iterators có thể cải thiện implementation của hàm Config::build và hàm search như thế nào.</p>

<h3 class="task-heading">Loại bỏ clone Sử dụng Iterator</h3>
<p>Trong Listing 12-6, chúng ta đã thêm code nhận một slice của các giá trị String và tạo một instance của struct Config bằng cách index vào slice và clone các giá trị, cho phép struct Config sở hữu các giá trị đó. Trong Listing 13-17, chúng ta tái tạo implementation của hàm Config::build như trong Listing 12-23.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Config {
    fn build(args: &[String]) -> Result&lt;Config, &'static str> {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let file_path = args[2].clone();

        let ignore_case = env::var("IGNORE_CASE").is_ok();

        Ok(Config {
            query,
            file_path,
            ignore_case,
        })
    }
}</code></pre>
</div>
<p><em>Listing 13-17: Tái tạo hàm Config::build từ Listing 12-23</em></p>

<p>Vào thời điểm đó, chúng ta đã nói đừng lo về các lời gọi clone không hiệu quả vì chúng ta sẽ loại bỏ chúng trong tương lai. Chà, thời điểm đó đến rồi!</p>

<p>Chúng ta cần clone ở đây vì chúng ta có một slice với các phần tử String trong tham số args, nhưng hàm build không sở hữu args. Để trả về ownership của một instance Config, chúng ta phải clone các giá trị từ các fields query và file_path của Config để instance Config có thể sở hữu các giá trị của nó.</p>

<p>Với kiến thức mới về iterators, chúng ta có thể thay đổi hàm build để lấy ownership của một iterator làm argument thay vì borrow một slice. Chúng ta sẽ sử dụng chức năng iterator thay vì code kiểm tra độ dài của slice và index vào các vị trí cụ thể. Điều này sẽ làm rõ hơn những gì hàm Config::build đang làm vì iterator sẽ truy cập các giá trị.</p>

<p>Một khi Config::build lấy ownership của iterator và ngừng sử dụng các thao tác indexing mà borrow, chúng ta có thể di chuyển các giá trị String từ iterator vào Config thay vì gọi clone và tạo một allocation mới.</p>

<h3 class="task-heading">Sử dụng Iterator Được Trả về Trực tiếp</h3>
<p>Mở file src/main.rs của project I/O, nó sẽ trông như thế này:</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();

    let config = Config::build(&args).unwrap_or_else(|err| {
        eprintln!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    // --snip--
}</code></pre>
</div>

<p>Đầu tiên, chúng ta sẽ thay đổi phần đầu của hàm main mà chúng ta có trong Listing 12-24 thành code trong Listing 13-18, lần này sử dụng một iterator. Điều này sẽ không compile cho đến khi chúng ta cập nhật Config::build.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
fn main() {
    let config = Config::build(env::args()).unwrap_or_else(|err| {
        eprintln!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    // --snip--
}</code></pre>
</div>
<p><em>Listing 13-18: Truyền giá trị trả về của env::args cho Config::build</em></p>

<p>Hàm env::args trả về một iterator! Thay vì collect các giá trị iterator thành một vector và sau đó truyền một slice cho Config::build, bây giờ chúng ta truyền ownership của iterator được trả về từ env::args cho Config::build trực tiếp.</p>

<p>Tiếp theo, chúng ta cần cập nhật định nghĩa của Config::build. Hãy thay đổi signature của Config::build để nó trông như Listing 13-19. Điều này vẫn chưa compile, vì chúng ta cần cập nhật function body.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
impl Config {
    fn build(
        mut args: impl Iterator<Item = String>,
    ) -> Result&lt;Config, &'static str> {
        // --snip--</code></pre>
</div>
<p><em>Listing 13-19: Cập nhật signature của Config::build để nhận một iterator</em></p>

<p>Tài liệu standard library cho hàm env::args cho thấy rằng kiểu của iterator mà nó trả về là std::env::Args, và kiểu đó implement trait Iterator và trả về các giá trị String.</p>

<p>Chúng ta đã cập nhật signature của hàm Config::build để tham số args có một kiểu generic với trait bounds là impl Iterator<Item = String> thay vì &[String]. Việc sử dụng cú pháp impl Trait mà chúng ta đã thảo luận trong phần "Sử dụng Traits như Parameters" của Chương 10 có nghĩa là args có thể là bất kỳ kiểu nào implement trait Iterator và trả về các phần tử String.</p>

<p>Vì chúng ta lấy ownership của args và chúng ta sẽ mutate args bằng cách lặp qua nó, chúng ta có thể thêm từ khóa mut vào specification của tham số args để làm cho nó mutable.</p>

<h3 class="task-heading">Sử dụng các Phương thức của Iterator Trait</h3>
<p>Tiếp theo, chúng ta sẽ sửa body của Config::build. Vì args implement trait Iterator, chúng ta biết rằng chúng ta có thể gọi phương thức next trên nó! Listing 13-20 cập nhật code từ Listing 12-23 để sử dụng phương thức next.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Config {
    fn build(
        mut args: impl Iterator<Item = String>,
    ) -> Result&lt;Config, &'static str> {
        args.next();

        let query = match args.next() {
            Some(arg) => arg,
            None => return Err("Didn't get a query string"),
        };

        let file_path = match args.next() {
            Some(arg) => arg,
            None => return Err("Didn't get a file path"),
        };

        let ignore_case = env::var("IGNORE_CASE").is_ok();

        Ok(Config {
            query,
            file_path,
            ignore_case,
        })
    }
}</code></pre>
</div>
<p><em>Listing 13-20: Thay đổi body của Config::build để sử dụng các phương thức iterator</em></p>

<p>Nhớ rằng giá trị đầu tiên trong giá trị trả về của env::args là tên của chương trình. Chúng ta muốn bỏ qua giá trị đó và đến giá trị tiếp theo, vì vậy đầu tiên chúng ta gọi next và không làm gì với giá trị trả về. Sau đó, chúng ta gọi next để lấy giá trị mà chúng ta muốn đưa vào field query của Config. Nếu next trả về Some, chúng ta sử dụng match để trích xuất giá trị. Nếu nó trả về None, có nghĩa là không đủ arguments được cung cấp, và chúng ta return sớm với giá trị Err. Chúng ta làm điều tương tự cho giá trị file_path.</p>

<h3 class="task-heading">Làm rõ Code với Iterator Adapters</h3>
<p>Chúng ta cũng có thể tận dụng iterators trong hàm search của project I/O, được tái tạo ở đây trong Listing 13-21 như trong Listing 12-19.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn search&lt;'a&gt;(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }

    results
}</code></pre>
</div>
<p><em>Listing 13-21: Implementation của hàm search từ Listing 12-19</em></p>

<p>Chúng ta có thể viết code này theo cách súc tích hơn bằng cách sử dụng các phương thức iterator adapter. Làm như vậy cũng cho phép chúng ta tránh có một vector results trung gian mutable. Phong cách lập trình functional ưu tiên giảm thiểu lượng mutable state để làm cho code rõ ràng hơn. Việc loại bỏ mutable state có thể cho phép một cải tiến trong tương lai để làm cho việc search xảy ra song song vì chúng ta không cần quản lý truy cập đồng thời vào vector results. Listing 13-22 cho thấy thay đổi này.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn search&lt;'a&gt;(query: &str, contents: &'a str) -> Vec<&'a str> {
    contents
        .lines()
        .filter(|line| line.contains(query))
        .collect()
}</code></pre>
</div>
<p><em>Listing 13-22: Sử dụng các phương thức iterator adapter trong implementation của hàm search</em></p>

<p>Nhớ rằng mục đích của hàm search là trả về tất cả các dòng trong contents chứa query. Tương tự như ví dụ filter trong Listing 13-16, code này sử dụng filter adapter để chỉ giữ lại các dòng mà line.contains(query) trả về true. Sau đó chúng ta collect các dòng khớp vào một vector khác với collect. Đơn giản hơn nhiều! Hãy thoải mái thực hiện cùng thay đổi để sử dụng các phương thức iterator trong hàm search_case_insensitive.</p>

<p>Để cải tiến thêm, hãy trả về một iterator từ hàm search bằng cách loại bỏ lời gọi collect và thay đổi kiểu trả về thành impl Iterator<Item = &'a str> để hàm trở thành một iterator adapter. Lưu ý rằng bạn cũng cần cập nhật các tests! Tìm kiếm qua một file lớn bằng công cụ minigrep của bạn trước và sau khi thực hiện thay đổi này để quan sát sự khác biệt trong hành vi. Trước thay đổi này, chương trình sẽ không in kết quả nào cho đến khi nó đã collect tất cả các kết quả, nhưng sau thay đổi này, các kết quả sẽ được in khi mỗi dòng khớp được tìm thấy vì vòng lặp for trong hàm run có thể tận dụng tính lazy của iterator.</p>

<h3 class="task-heading">Chọn giữa Vòng lặp và Iterators</h3>
<p>Câu hỏi logic tiếp theo là bạn nên chọn phong cách nào trong code của riêng bạn và tại sao: implementation gốc trong Listing 13-21 hay phiên bản sử dụng iterators trong Listing 13-22 (giả sử chúng ta collect tất cả các kết quả trước khi trả về thay vì trả về iterator). Hầu hết các lập trình viên Rust thích sử dụng phong cách iterator. Khó nắm bắt hơn một chút lúc đầu, nhưng một khi bạn nắm bắt được cảm giác về các iterator adapters khác nhau và những gì chúng làm, iterators có thể dễ hiểu hơn. Thay vì vọc vạch các bits khác nhau của vòng lặp và tạo các vectors mới, code tập trung vào mục tiêu cấp cao của vòng lặp. Điều này trừu tượng hóa một số code thông thường để dễ dàng hơn trong việc thấy các khái niệm độc đáo cho code này, như điều kiện lọc mà mỗi phần tử trong iterator phải vượt qua.</p>

<p>Nhưng hai implementations có thực sự tương đương không? Giả định trực quan có thể là vòng lặp cấp thấp hơn sẽ nhanh hơn. Hãy nói về hiệu suất.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Cải thiện I/O Project:</strong>
  <ul>
    <li><strong>env::args()</strong> - Trả về một iterator</li>
    <li><strong>impl Iterator&lt;Item = String&gt;</strong> - Generic iterator type</li>
    <li><strong>args.next()</strong> - Lấy phần tử tiếp theo</li>
    <li><strong>.lines()</strong> - Tạo iterator over các dòng</li>
    <li><strong>.filter().collect()</strong> - Thay thế vòng lặp for</li>
    <li><strong>Zero-cost abstraction</strong> - Iterators có hiệu suất tương đương vòng lặp thủ công</li>
  </ul>
</div>
`,
            defaultCode: `use std::env;

struct Config {
    query: String,
    file_path: String,
    ignore_case: bool,
}

impl Config {
    // Sử dụng iterator thay vì slice
    fn build(mut args: impl Iterator<Item = String>) -> Result<Config, &'static str> {
        args.next(); // Bỏ qua tên chương trình

        let query = match args.next() {
            Some(arg) => arg,
            None => return Err("Khong co query"),
        };

        let file_path = match args.next() {
            Some(arg) => arg,
            None => return Err("Khong co duong dan file"),
        };

        let ignore_case = env::var("IGNORE_CASE").is_ok();

        Ok(Config { query, file_path, ignore_case })
    }
}

fn search(query: &str, contents: &str) -> Vec<&str> {
    // Sử dụng iterator adapter methods
    contents
        .lines()
        .filter(|line| line.contains(query))
        .collect()
}

fn main() {
    let config = Config::build(env::args()).unwrap_or_else(|err| {
        eprintln!("Loi: {err}");
        std::process::exit(1);
    });

    // Doc file va tim kiem
    if let Ok(contents) = std::fs::read_to_string(&config.file_path) {
        let results = search(&config.query, &contents);
        for line in results {
            println!("{line}");
        }
    }
}
`,
            expectedOutput: 'Ket qua tim kiem se duoc in ra neu tim thay'
        };
