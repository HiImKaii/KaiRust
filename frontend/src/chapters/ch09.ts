import { Chapter } from '../courses';

export const ch09: Chapter = {
    id: 'ch09',
    title: 'Chương 9: Xử lý lỗi (Error Handling)',
    lessons: [
        {
            id: 'ch09-01',
            title: '9.1 Lỗi không phục hồi: panic!',
            duration: '15 phút',
            type: 'theory',
            content: `
<p>Rust chia lỗi thành 2 loại: <strong>recoverable</strong> (phục hồi được, dùng <code>Result&lt;T, E&gt;</code>) và <strong>unrecoverable</strong> (không phục hồi, dùng <code>panic!</code>).</p>

<h3 class="task-heading">panic! macro</h3>
<p>Khi gọi <code>panic!</code>, chương trình in thông báo lỗi, dọn dẹp stack, và thoát:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    panic!("crash and burn");
}</code></pre>
</div>

<h3 class="task-heading">Backtrace</h3>
<p>Đặt <code>RUST_BACKTRACE=1</code> để xem stack trace chi tiết khi panic:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ RUST_BACKTRACE=1 cargo run</code></pre>
</div>

<h3 class="task-heading">Khi nào dùng panic?</h3>
<ul class="task-list">
  <li>Ví dụ, prototype, tests</li>
  <li>Khi bạn biết chắc code sẽ không lỗi nhưng compiler không biết</li>
  <li>Khi tiếp tục chạy sẽ <strong>không an toàn</strong></li>
</ul>
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
        },
        {
            id: 'ch09-02',
            title: '9.2 Lỗi phục hồi: Result<T, E>',
            duration: '25 phút',
            type: 'practice',
            content: `
<p>Hầu hết lỗi không nghiêm trọng đến mức phải dừng chương trình. Dùng <code>Result&lt;T, E&gt;</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Result&lt;T, E&gt; {
    Ok(T),
    Err(E),
}</code></pre>
</div>

<h3 class="task-heading">Xử lý Result với match</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs::File;

fn main() {
    let file = File::open("hello.txt");
    let file = match file {
        Ok(f) => f,
        Err(error) => panic!("Không mở được file: {error:?}"),
    };
}</code></pre>
</div>

<h3 class="task-heading">Shortcuts: unwrap() và expect()</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// unwrap: panic nếu Err
let f = File::open("hello.txt").unwrap();

// expect: panic với message tùy chỉnh
let f = File::open("hello.txt")
    .expect("Không tìm thấy hello.txt");</code></pre>
</div>

<h3 class="task-heading">Toán tử ? (propagating errors)</h3>
<p>Toán tử <code>?</code> trả về Err sớm nếu lỗi, giúp code ngắn gọn hơn:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs;

fn read_username_from_file() -> Result&lt;String, std::io::Error&gt; {
    let username = fs::read_to_string("username.txt")?;
    Ok(username)
}

// Hoặc ngắn hơn:
fn read_username() -> Result&lt;String, std::io::Error&gt; {
    fs::read_to_string("username.txt")
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Toán tử ? chỉ dùng được</strong> trong hàm trả về <code>Result</code> hoặc <code>Option</code>. Nó tự động convert error type nếu <code>From</code> trait được implement.
</div>
`,
            defaultCode: `use std::num::ParseIntError;

fn parse_number(s: &str) -> Result<i32, ParseIntError> {
    let n = s.trim().parse::<i32>()?;
    Ok(n)
}

fn double_parse(s: &str) -> Result<i32, ParseIntError> {
    let n = parse_number(s)?;
    Ok(n * 2)
}

fn main() {
    // Thành công
    match double_parse("21") {
        Ok(n) => println!("21 × 2 = {n}"),
        Err(e) => println!("Lỗi: {e}"),
    }

    // Thất bại
    match double_parse("abc") {
        Ok(n) => println!("Kết quả: {n}"),
        Err(e) => println!("Lỗi parse 'abc': {e}"),
    }

    // unwrap_or
    let result = parse_number("xyz").unwrap_or(0);
    println!("unwrap_or: {result}");
}
`,
            expectedOutput: '21 × 2 = 42\nLỗi parse \'abc\': invalid digit found in string\nunwrap_or: 0'
        },
        {
            id: 'ch09-03',
            title: '9.3 panic! hay Result? Khi nào dùng gì?',
            duration: '10 phút',
            type: 'theory',
            content: `
<p>Việc chọn <code>panic!</code> hay <code>Result</code> phụ thuộc vào ngữ cảnh.</p>

<h3 class="task-heading">Dùng Result khi:</h3>
<ul class="task-list">
  <li>Lỗi là <strong>có thể xảy ra</strong> và caller nên quyết định cách xử lý</li>
  <li>Viết library code — để người dùng tự chọn cách xử lý</li>
  <li>File không tìm thấy, network lỗi, parse sai format...</li>
</ul>

<h3 class="task-heading">Dùng panic! khi:</h3>
<ul class="task-list">
  <li>Ví dụ, prototype, tests</li>
  <li>Bạn có thông tin compiler không có (biết chắc sẽ thành công)</li>
  <li>Vi phạm contract/invariant — trạng thái <strong>không bao giờ nên xảy ra</strong></li>
</ul>

<h3 class="task-heading">Tạo custom types cho validation</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess phải từ 1-100, nhận {value}");
        }
        Guess { value }
    }

    pub fn value(&self) -> i32 {
        self.value
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Guidelines:</strong> Khi code có thể kết thúc ở trạng thái xấu (bad state) — state không mong đợi, vi phạm logic — hãy panic. Nếu lỗi là <em>expected</em>, dùng Result.
</div>
`,
            defaultCode: `struct Percentage {
    value: f64,
}

impl Percentage {
    fn new(value: f64) -> Result<Self, String> {
        if value < 0.0 || value > 100.0 {
            Err(format!("{value} không nằm trong khoảng 0-100"))
        } else {
            Ok(Percentage { value })
        }
    }

    fn display(&self) -> String {
        format!("{:.1}%", self.value)
    }
}

fn main() {
    // Valid
    match Percentage::new(85.5) {
        Ok(p) => println!("Tỷ lệ: {}", p.display()),
        Err(e) => println!("Lỗi: {e}"),
    }

    // Invalid
    match Percentage::new(150.0) {
        Ok(p) => println!("Tỷ lệ: {}", p.display()),
        Err(e) => println!("Lỗi: {e}"),
    }

    // Invalid negative
    match Percentage::new(-5.0) {
        Ok(p) => println!("Tỷ lệ: {}", p.display()),
        Err(e) => println!("Lỗi: {e}"),
    }
}
`,
            expectedOutput: 'Tỷ lệ: 85.5%\nLỗi: 150 không nằm trong khoảng 0-100\nLỗi: -5 không nằm trong khoảng 0-100'
        }
    ]
};
