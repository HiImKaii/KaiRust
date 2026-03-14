import { Lesson } from '../../courses';

export const ch11_01: Lesson = {
            id: 'ch11-01',
            title: '11.1 Cách viết Tests',
            duration: '25 phút',
            type: 'practice',
            content: `
<p>Tests trong Rust là các hàm xác minh rằng non-test code đang hoạt động đúng như mong đợi. Các bodies của test functions thường thực hiện ba hành động sau:</p>

<ol>
  <li>Thiết lập bất kỳ dữ liệu hoặc trạng thái cần thiết.</li>
  <li>Chạy code bạn muốn test.</li>
  <li>Assert rằng kết quả là những gì bạn mong đợi.</li>
</ol>

<h3 class="task-heading">Structuring Test Functions</h3>
<p>Ở dạng đơn giản nhất, một test trong Rust là một hàm được annotate với test attribute. Attributes là metadata về các mảnh code Rust; một ví dụ là derive attribute mà chúng ta đã sử dụng với structs trong Chương 5. Để thay đổi một hàm thành một test function, thêm #[test] trên dòng trước fn. Khi bạn chạy tests với cargo test command, Rust builds một test runner binary chạy các annotated functions và báo cáo về việc mỗi test function pass hay fail.</p>

<p>Bất cứ khi nào chúng ta tạo một library project mới với Cargo, một test module với một test function được tự động generate cho chúng ta. Module này cho bạn một template để viết tests để bạn không phải tra cứu cấu trúc và cú pháp chính xác mỗi khi bạn bắt đầu một project mới. Bạn có thể thêm bao nhiêu test functions và test modules tùy thích!</p>

<p>Chúng ta sẽ khám phá một số khía cạnh về cách tests hoạt động bằng cách thử nghiệm với template test trước khi thực sự test bất kỳ code nào.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>$ cargo new adder --lib
     Created library \`adder\` project</code></pre>
</div>

<p>File src/lib.rs có dạng như Listing 11-1:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}</code></pre>
</div>
<p><em>Listing 11-1: Code được tự động generate bởi cargo new</em></p>

<p>File bắt đầu với một hàm add example để chúng ta có thứ gì đó để test.</p>

<p>Chú ý annotation #[test]: Attribute này biểu thị đây là một test function, vì vậy test runner biết xử lý hàm này như một test. Chúng ta cũng có thể có các non-test functions trong tests module để giúp set up các scenarios thông thường hoặc thực hiện các operations thông thường, vì vậy chúng ta luôn cần chỉ ra functions nào là tests.</p>

<p>Function body sử dụng assert_eq! macro để assert rằng result chứa kết quả của việc gọi add với 2 và 2 bằng 4. Assertion này đóng vai trò như một ví dụ về định dạng cho một test thông thường.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.57s
     Running unittests src/lib.rs (target/debug/deps/adder-01ad14159ff659ab)

running 1 test
test tests::it_works ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Cargo compiled và ran test. Chúng ta thấy dòng running 1 test. Dòng tiếp theo cho thấy tên của test function được generate, gọi là tests::it_works, và kết quả của việc chạy test đó là ok. Tổng kết test result: ok có nghĩa là tất cả tests passed.</p>

<h3 class="task-heading">Tests Fail Khi Function Panics</h3>
<p>Tests fail khi có điều gì đó trong test function panics. Mỗi test chạy trong một thread mới, và khi main thread thấy rằng một test thread đã chết, test được đánh dấu là failed.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[test]
fn another() {
    panic!("Make this test fail");
}</code></pre>
</div>

<p>Khi chạy tests, output cho thấy exploration test passed và another failed:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.72s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 2 tests
test tests::another ... FAILED
test tests::exploration ... ok

failures:

---- tests::another stdout ----

thread 'tests::another' panicked at src/lib.rs:17:9:
Make this test fail
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace


failures:
    tests::another

test result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass \`--lib\`</code></pre>
</div>

<h3 class="task-heading">Checking Results với assert!</h3>
<p>assert! macro, được cung cấp bởi standard library, hữu ích khi bạn muốn đảm bảo một điều kiện nào đó trong test evaluate thành true. Chúng ta cho assert! macro một argument evaluate thành Boolean. Nếu giá trị là true, không có gì xảy ra và test passes. Nếu giá trị là false, assert! macro gọi panic! để cause test fail.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle { width: 8, height: 7 };
        let smaller = Rectangle { width: 5, height: 1 };

        assert!(larger.can_hold(&smaller));
    }

    #[test]
    fn smaller_cannot_hold_larger() {
        let larger = Rectangle { width: 8, height: 7 };
        let smaller = Rectangle { width: 5, height: 1 };

        assert!(!smaller.can_hold(&larger));
    }
}</code></pre>
</div>

<p>Chú ý use super::*; bên trong tests module. Vì tests module là một inner module, chúng ta cần bring code under test vào scope của inner module.</p>

<h3 class="task-heading">Testing Equality với assert_eq! và assert_ne!</h3>
<p>Một cách phổ biến để verify functionality là test equality giữa kết quả của code under test và giá trị mong đợi. assert_eq! và assert_ne! macros compare hai arguments cho equality hoặc inequality. Chúng cũng in hai giá trị nếu assertion fails.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn add_two(a: u64) -> u64 {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_adds_two() {
        let result = add_two(2);
        assert_eq!(result, 4);
    }
}</code></pre>
</div>

<p>Khi test fails, output cho biết giá trị left và right:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>failures:

---- tests::it_adds_two stdout ----

thread 'tests::it_adds_two' panicked at src/lib.rs:12:9:
assertion \`left == right\` failed
  left: 5
 right: 4</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Trong một số ngôn ngữ và test frameworks, các parameters được gọi là expected và actual, và thứ tự quan trọng. Trong Rust, chúng được gọi là left và right.
</div>

<p>assert_eq! và assert_ne! macros sử dụng == và != operators. Khi assertions fail, chúng in arguments sử dụng debug formatting, có nghĩa là các giá trị cần implement PartialEq và Debug traits. Bạn có thể thêm #[derive(PartialEq, Debug)] vào struct hoặc enum definitions.</p>

<h3 class="task-heading">Adding Custom Failure Messages</h3>
<p>Bạn cũng có thể thêm custom message với failure message như optional arguments cho assert!, assert_eq!, và assert_ne! macros.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[test]
fn greeting_contains_name() {
    let result = greeting("Carol");
    assert!(
        result.contains("Carol"),
        "Greeting did not contain name, value was \`{result}\`"
    );
}</code></pre>
</div>

<h3 class="task-heading">Checking for Panics với should_panic</h3>
<p>Ngoài việc check return values, cũng quan trọng để check rằng code xử lý error conditions như mong đợi. Chúng ta làm điều này bằng cách thêm attribute should_panic vào test function.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {value}.");
        }

        Guess { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic]
    fn greater_than_100() {
        Guess::new(200);
    }
}</code></pre>
</div>

<p>Để test more precise, có thể thêm expected parameter vào should_panic:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[test]
#[should_panic(expected = "less than or equal to 100")]
fn greater_than_100() {
    Guess::new(200);
}</code></pre>
</div>

<h3 class="task-heading">Using Result&lt;T, E&gt; in Tests</h3>
<p>Tất cả tests của chúng ta cho đến giờ panic khi fail. Chúng ta cũng có thể viết tests sử dụng Result&lt;T, E&gt;!</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() -> Result<(), String> {
        let result = add(2, 2);

        if result == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        }
    }
}</code></pre>
</div>

<p>Viết tests để chúng return Result&lt;T, E&gt; cho phép bạn sử dụng ? operator trong body của tests.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt cách viết Tests:</strong>
  <ul>
    <li><strong>#[test]</strong> - Annotate một hàm thành test</li>
    <li><strong>assert!(condition)</strong> - Assert true/false</li>
    <li><strong>assert_eq!(left, right)</strong> - Assert equality</li>
    <li><strong>assert_ne!(left, right)</strong> - Assert inequality</li>
    <li><strong>#[should_panic]</strong> - Test phải panic</li>
    <li><strong>Result&lt;(), String&gt;</strong> - Tests có thể return Result</li>
    <li><strong>Custom messages</strong> - Thêm message vào assert</li>
  </ul>
</div>
`,
            defaultCode: `fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn is_positive(n: i32) -> bool {
    n > 0
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add_positive() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    fn test_add_negative() {
        assert_eq!(add(-1, 1), 0);
    }

    #[test]
    fn test_is_positive_true() {
        assert!(is_positive(5));
    }

    #[test]
    fn test_is_positive_false() {
        assert!(!is_positive(-3));
    }
}

fn main() {
    println!("Testing add function:");
    println!("2 + 3 = {}", add(2, 3));
    println!("-1 + 1 = {}", add(-1, 1));

    println!("\\nTesting is_positive:");
    println!("is_positive(5) = {}", is_positive(5));
    println!("is_positive(-3) = {}", is_positive(-3));
}
`,
            expectedOutput: 'Testing add function:\n2 + 3 = 5\n-1 + 1 = 0\n\nTesting is_positive:\nis_positive(5) = true\nis_positive(-3) = false'
        };
