import { Lesson } from '../../courses';

export const ch09_02: Lesson = {
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
        };
