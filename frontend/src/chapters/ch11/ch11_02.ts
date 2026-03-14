import { Lesson } from '../../courses';

export const ch11_02: Lesson = {
            id: 'ch11-02',
            title: '11.2 Kiểm soát cách chạy Tests',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Cũng giống như cargo run biên dịch code của bạn và sau đó chạy binary thu được, cargo test biên dịch code của bạn ở chế độ test và chạy binary test thu được. Hành vi mặc định của binary được tạo bởi cargo test là chạy tất cả các tests song song và chặn đầu ra được tạo trong quá trình chạy test, ngăn hiển thị đầu ra và giúp đọc đầu ra liên quan đến kết quả test dễ dàng hơn. Tuy nhiên, bạn có thể chỉ định các tùy chọn dòng lệnh để thay đổi hành vi mặc định này.</p>

<p>Một số tùy chọn dòng lệnh dành cho cargo test, và một số dành cho binary test thu được. Để phân biệt hai loại đối số này, bạn liệt kê các đối số dành cho cargo test theo sau bởi dấu phân cách -- và sau đó là những đối số dành cho binary test. Chạy cargo test --help hiển thị các tùy chọn bạn có thể sử dụng với cargo test, và chạy cargo test -- --help hiển thị các tùy chọn bạn có thể sử dụng sau dấu phân cách. Các tùy chọn này cũng được ghi chú trong phần "Tests" của The rustc Book.</p>

<h3 class="task-heading">Chạy Tests Song song hoặc Liên tiếp</h3>
<p>Khi bạn chạy nhiều tests, theo mặc định chúng chạy song song sử dụng các luồng (threads), nghĩa là chúng kết thúc nhanh hơn và bạn nhận phản hồi sớm hơn. Vì các tests đang chạy cùng lúc, bạn phải đảm bảo các tests của bạn không phụ thuộc vào nhau hoặc bất kỳ trạng thái chia sẻ nào, bao gồm môi trường chia sẻ, chẳng hạn như thư mục làm việc hiện tại hoặc các biến môi trường.</p>

<p>Ví dụ, giả sử mỗi test của bạn chạy một số code tạo một file trên đĩa có tên test-output.txt và ghi một số dữ liệu vào file đó. Sau đó, mỗi test đọc dữ liệu trong file đó và xác nhận rằng file chứa một giá trị cụ thể, khác nhau trong mỗi test. Vì các tests chạy cùng lúc, một test có thể ghi đè file trong thời gian giữa khi một test khác đang ghi và đọc file. Test thứ hai sẽ thất bại, không phải vì code không đúng mà vì các tests đã can thiệp lẫn nhau khi chạy song song. Một giải pháp là đảm bảo mỗi test ghi vào một file khác; một giải pháp khác là chạy các tests một lần một.</p>

<p>Nếu bạn không muốn chạy các tests song song hoặc nếu bạn muốn kiểm soát chi tiết hơn về số lượng luồng được sử dụng, bạn có thể gửi cờ --test-threads và số lượng luồng bạn muốn sử dụng đến binary test. Hãy xem ví dụ sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test -- --test-threads=1</code></pre>
</div>

<p>Chúng ta đặt số lượng luồng test thành 1, yêu cầu chương trình không sử dụng bất kỳ song song nào. Chạy các tests sử dụng một luồng sẽ mất nhiều thời gian hơn so với chạy chúng song song, nhưng các tests sẽ không can thiệp lẫn nhau nếu chúng chia sẻ trạng thái.</p>

<h3 class="task-heading">Hiển thị Đầu ra của Function</h3>
<p>Theo mặc định, nếu một test đạt, thư viện test của Rust chặn bất cứ thứ gì được in ra standard output. Ví dụ, nếu chúng ta gọi println! trong một test và test đạt, chúng ta sẽ không thấy đầu ra của println! trong terminal; chúng ta sẽ chỉ thấy dòng cho biết test đã đạt. Nếu một test thất bại, chúng ta sẽ thấy bất cứ thứ gì được in ra standard output cùng với phần còn lại của thông báo lỗi.</p>

<p>Như một ví dụ, Listing 11-10 có một function ngớ ngẩn in giá trị của tham số của nó và trả về 10, cũng như một test đạt và một test thất bại.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn prints_and_returns_10(a: i32) -> i32 {
    println!("I got the value {a}");
    10
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn this_test_will_pass() {
        let value = prints_and_returns_10(4);
        assert_eq!(value, 10);
    }

    #[test]
    fn this_test_will_fail() {
        let value = prints_and_returns_10(8);
        assert_eq!(value, 5);
    }
}</code></pre>
</div>
<p><em>Listing 11-10: Tests cho một function gọi println!</em></p>

<p>Khi chúng ta chạy các tests này với cargo test, chúng ta sẽ thấy đầu ra sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling silly-function v0.1.0 (file:///projects/silly-function)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.58s
     Running unittests src/lib.rs (target/debug/deps/silly_function-160869f38cff9166)

running 2 tests
test tests::this_test_will_fail ... FAILED
test tests::this_test_will_pass ... ok

failures:

---- tests::this_test_will_fail stdout ----
I got the value 8

thread 'tests::this_test_will_fail' panicked at src/lib.rs:19:9:
assertion \`left == right\` failed
  left: 10
 right: 5
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace


failures:
    tests::this_test_will_fail

test result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass \`--lib\`</code></pre>
</div>

<p>Lưu ý rằng không đâu trong đầu ra này chúng ta thấy I got the value 4, được in khi test đạt chạy. Đầu ra đó đã bị chặn. Đầu ra từ test thất bại, I got the value 8, xuất hiện trong phần tóm tắt đầu ra test, phần này cũng cho thấy nguyên nhân của lỗi test.</p>

<p>Nếu chúng ta muốn thấy các giá trị được in cho các tests đạt cũng vậy, chúng ta có thể yêu cầu Rust hiển thị đầu ra của các tests thành công với --show-output:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test -- --show-output</code></pre>
</div>

<p>Khi chúng ta chạy các tests trong Listing 11-10 lại với cờ --show-output, chúng ta thấy đầu ra sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test -- --show-output
   Compiling silly-function v0.1.0 (file:///projects/silly-function)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.60s
     Running unittests src/lib.rs (target/debug/deps/silly_function-160869f38cff9166)

running 2 tests
test tests::this_test_will_fail ... FAILED
test tests::this_test_will_pass ... ok

successes:

---- tests::this_test_will_pass stdout ----
I got the value 4


successes:
    tests::this_test_will_pass

failures:

---- tests::this_test_will_fail stdout ----
I got the value 8

thread 'tests::this_test_will_fail' panicked at src/lib.rs:19:9:
assertion \`left == right\` failed
  left: 10
 right: 5
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace


failures:
    tests::this_test_will_fail

test result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass \`--lib\`</code></pre>
</div>

<h3 class="task-heading">Chạy một Tập hợp con Tests theo Tên</h3>
<p>Chạy một bộ test đầy đủ đôi khi có thể mất nhiều thời gian. Nếu bạn đang làm việc với code trong một khu vực cụ thể, bạn có thể muốn chỉ chạy các tests liên quan đến code đó. Bạn có thể chọn tests nào để chạy bằng cách truyền cho cargo test tên hoặc tên của test(s) bạn muốn chạy như một đối số.</p>

<p>Để minh họa cách chạy một tập hợp con của các tests, trước tiên chúng ta sẽ tạo ba tests cho function add_two của mình, như được hiển thị trong Listing 11-11, và chọn cái nào để chạy.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn add_two(a: u64) -> u64 {
    a + 2
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn add_two_and_two() {
        let result = add_two(2);
        assert_eq!(result, 4);
    }

    #[test]
    fn add_three_and_two() {
        let result = add_two(3);
        assert_eq!(result, 5);
    }

    #[test]
    fn one_hundred() {
        let result = add_two(100);
        assert_eq!(result, 102);
    }
}</code></pre>
</div>
<p><em>Listing 11-11: Ba tests với ba tên khác nhau</em></p>

<p>Nếu chúng ta chạy các tests mà không truyền bất kỳ đối số nào, như chúng ta đã thấy trước đó, tất cả các tests sẽ chạy song song:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.62s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 3 tests
test tests::add_three_and_two ... ok
test tests::add_two_and_two ... ok
test tests::one_hundred ... ok

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<h4>Chạy một Test Đơn lẻ</h4>
<p>Chúng ta có thể truyền tên của bất kỳ test function nào cho cargo test để chỉ chạy test đó:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test one_hundred
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.69s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 1 test
test tests::one_hundred ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 2 filtered out; finished in 0.00s</code></pre>
</div>

<p>Chỉ test với tên one_hundred chạy; hai tests khác không khớp với tên đó. Đầu ra test cho chúng ta biết chúng ta có nhiều tests hơn không chạy bằng cách hiển thị 2 filtered out ở cuối.</p>

<p>Chúng ta không thể chỉ định tên của nhiều tests theo cách này; chỉ giá trị đầu tiên được đưa cho cargo test sẽ được sử dụng. Nhưng có một cách để chạy nhiều tests.</p>

<h4>Lọc để Chạy nhiều Tests</h4>
<p>Chúng ta có thể chỉ định một phần của tên test, và bất kỳ test nào có tên khớp với giá trị đó sẽ được chạy. Ví dụ, vì hai trong số các tests của chúng ta có tên chứa add, chúng ta có thể chạy hai tests đó bằng cách chạy cargo test add:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test add
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.61s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 2 tests
test tests::add_three_and_two ... ok
test tests::add_two_and_two ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 1 filtered out; finished in 0.00s</code></pre>
</div>

<p>Lệnh này chạy tất cả tests có add trong tên và lọc ra test tên one_hundred. Cũng lưu ý rằng module trong đó một test xuất hiện trở thành một phần của tên test, vì vậy chúng ta có thể chạy tất cả tests trong một module bằng cách lọc trên tên module.</p>

<h3 class="task-heading">Bỏ qua Tests trừ khi được Yêu cầu Cụ thể</h3>
<p>Đôi khi một vài tests cụ thể có thể rất tốn thời gian để thực thi, vì vậy bạn có thể muốn loại trừ chúng trong hầu hết các lần chạy cargo test. Thay vì liệt kê như các đối số tất cả tests bạn muốn chạy, bạn có thể chú thích các tests tốn thời gian bằng cách sử dụng thuộc tính ignore để loại trừ chúng, như được hiển thị ở đây:</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }

    #[test]
    #[ignore]
    fn expensive_test() {
        // code that takes an hour to run
    }
}</code></pre>
</div>

<p>Sau #[test], chúng ta thêm dòng #[ignore] vào test chúng ta muốn loại trừ. Bây giờ khi chúng ta chạy các tests của mình, it_works chạy, nhưng expensive_test không:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.60s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 2 tests
test tests::expensive_test ... ignored
test tests::it_works ... ok

test result: ok. 1 passed; 0 failed; 1 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Function expensive_test được liệt kê là ignored. Nếu chúng ta muốn chỉ chạy các ignored tests, chúng ta có thể sử dụng cargo test -- --ignored:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test -- --ignored
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.61s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 1 test
test tests::expensive_test ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 1 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Bằng cách kiểm soát tests nào chạy, bạn có thể đảm bảo kết quả cargo test của bạn sẽ được trả về nhanh chóng. Khi bạn ở điểm mà việc kiểm tra kết quả của các ignored tests có ý nghĩa và bạn có thời gian đợi cho kết quả, bạn có thể chạy cargo test -- --ignored thay vì. Nếu bạn muốn chạy tất cả tests cho dù chúng bị ignored hay không, bạn có thể chạy cargo test -- --include-ignored.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt các tùy chọn chạy Tests:</strong>
  <ul>
    <li><strong>cargo test</strong> - Chạy tất cả tests</li>
    <li><strong>cargo test -- --test-threads=1</strong> - Chạy tests tuần tự (1 thread)</li>
    <li><strong>cargo test -- --show-output</strong> - Hiển thị output của cả passing tests</li>
    <li><strong>cargo test test_name</strong> - Chạy một test cụ thể</li>
    <li><strong>cargo test keyword</strong> - Chạy tất cả tests có chứa keyword</li>
    <li><strong>#[ignore]</strong> - Đánh dấu test bị bỏ qua</li>
    <li><strong>cargo test -- --ignored</strong> - Chỉ chạy các tests bị bỏ qua</li>
    <li><strong>cargo test -- --include-ignored</strong> - Chạy tất cả bao gồm cả ignored</li>
  </ul>
</div>
`,
            defaultCode: `// Mô phỏng test organization
fn add(a: i32, b: i32) -> i32 { a + b }
fn multiply(a: i32, b: i32) -> i32 { a * b }
fn factorial(n: u32) -> u64 {
    match n {
        0 | 1 => 1,
        _ => n as u64 * factorial(n - 1),
    }
}

fn main() {
    // Unit tests
    println!("=== Unit Tests ===");
    assert_eq!(add(1, 1), 2);
    println!("test_add_basic passed");

    assert_eq!(multiply(3, 4), 12);
    println!("test_multiply passed");

    assert_eq!(factorial(5), 120);
    println!("test_factorial passed");

    assert_eq!(factorial(0), 1);
    println!("test_factorial_zero passed");

    println!("\\n4 tests passed, 0 failed");
}
`,
            expectedOutput: '=== Unit Tests ===\ntest_add_basic passed\ntest_multiply passed\ntest_factorial passed\ntest_factorial_zero passed\n\n4 tests passed, 0 failed'
        };
