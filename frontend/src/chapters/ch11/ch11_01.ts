import { Lesson } from '../../courses';

export const ch11_01: Lesson = {
            id: 'ch11-01',
            title: '11.1 Cách viết Tests',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Tests trong Rust là các hàm xác minh rằng code không phải test đang hoạt động đúng như mong đợi. Các bodies của test functions thường thực hiện ba hành động sau:</p>

<ol>
  <li>Thiết lập bất kỳ dữ liệu hoặc trạng thái cần thiết.</li>
  <li>Chạy code bạn muốn test.</li>
  <li>Assert rằng kết quả là những gì bạn mong đợi.</li>
</ol>

<p>Hãy xem các tính năng mà Rust cung cấp specifically cho việc viết tests thực hiện các hành động này, bao gồm test attribute, một số macros, và should_panic attribute.</p>

<h3 class="task-heading">Cấu trúc Test Functions</h3>
<p>Ở dạng đơn giản nhất, một test trong Rust là một hàm được annotate với test attribute. Attributes là metadata về các mảnh code Rust; một ví dụ là derive attribute mà chúng ta đã sử dụng với structs trong Chương 5. Để thay đổi một hàm thành một test function, thêm #[test] trên dòng trước fn. Khi bạn chạy tests với cargo test command, Rust builds một test runner binary chạy các annotated functions và báo cáo về việc mỗi test function pass hay fail.</p>

<p>Bất cứ khi nào chúng ta tạo một library project mới với Cargo, một test module với một test function được tự động generate cho chúng ta. Module này cho bạn một template để viết tests để bạn không phải tra cứu cấu trúc và cú pháp chính xác mỗi khi bạn bắt đầu một project mới. Bạn có thể thêm bao nhiêu test functions và test modules tùy thích!</p>

<p>Chúng ta sẽ khám phá một số khía cạnh về cách tests hoạt động bằng cách thử nghiệm với template test trước khi thực sự test bất kỳ code nào. Sau đó, chúng ta sẽ viết một số tests thực tế gọi một số code mà chúng ta đã viết và assert rằng behavior của nó là đúng.</p>

<p>Hãy tạo một library project mới có tên là adder để cộng hai số:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new adder --lib
     Created library \`adder\` project
$ cd adder</code></pre>
</div>

<p>Nội dung của file src/lib.rs trong adder library của bạn sẽ như Listing 11-1.</p>
<p>Filename: src/lib.rs</p>

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

<p>Trước mắt, hãy tập trung vào hàm it_works. Chú ý annotation #[test]: Attribute này biểu thị đây là một test function, vì vậy test runner biết xử lý hàm này như một test. Chúng ta cũng có thể có các non-test functions trong tests module để giúp set up các scenarios thông thường hoặc thực hiện các operations thông thường, vì vậy chúng ta luôn cần chỉ ra functions nào là tests.</p>

<p>Function body sử dụng assert_eq! macro để assert rằng result chứa kết quả của việc gọi add với 2 và 2 bằng 4. Assertion này đóng vai trò như một ví dụ về định dạng cho một test thông thường. Hãy chạy nó để xem test này pass.</p>

<p>Command cargo test chạy tất cả tests trong project của chúng ta, như được hiển thị trong Listing 11-2.</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
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
<p><em>Listing 11-2: Output từ việc chạy test được tự động generate</em></p>

<p>Cargo compiled và ran test. Chúng ta thấy dòng running 1 test. Dòng tiếp theo cho thấy tên của test function được generate, gọi là tests::it_works, và kết quả của việc chạy test đó là ok. Tổng kết test result: ok có nghĩa là tất cả tests passed, và phần đọc 1 passed; 0 failed tổng hợp số lượng tests đã pass hoặc fail.</p>

<p>Có thể đánh dấu một test là ignored để nó không chạy trong một trường hợp cụ thể; chúng ta sẽ cover điều đó trong phần "Ignoring Tests Unless Specifically Requested" sau trong chương này. Vì chúng ta chưa làm điều đó ở đây, summary cho thấy 0 ignored. Chúng ta cũng có thể truyền một argument cho cargo test command để chỉ chạy tests có tên matches một string; điều này gọi là filtering, và chúng ta sẽ cover nó trong phần "Running a Subset of Tests by Name". Ở đây, chúng ta chưa lọc các tests đang chạy, vì vậy cuối summary cho thấy 0 filtered out.</p>

<p>Thống kê 0 measured dành cho benchmark tests đo hiệu suất. Benchmark tests, tính đến thời điểm viết bài này, chỉ available trong nightly Rust. Xem tài liệu về benchmark tests để tìm hiểu thêm.</p>

<p>Phần tiếp theo của test output bắt đầu từ Doc-tests adder là cho kết quả của bất kỳ documentation tests nào. Chúng ta chưa có documentation tests nào, nhưng Rust có thể compile bất kỳ code examples nào xuất hiện trong API documentation của chúng ta. Tính năng này giúp giữ docs và code của bạn đồng bộ! Chúng ta sẽ thảo luận cách viết documentation tests trong phần "Documentation Comments as Tests" của Chương 14. Bây giờ, chúng ta sẽ bỏ qua Doc-tests output.</p>

<p>Hãy bắt đầu customize test theo nhu cầu của chúng ta. Trước tiên, đổi tên của hàm it_works thành một tên khác, chẳng hạn như exploration, như sau:</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn exploration() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}</code></pre>
</div>

<p>Sau đó, chạy cargo test lại. Output bây giờ cho thấy exploration thay vì it_works:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.59s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 1 test
test tests::exploration ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Bây giờ chúng ta sẽ thêm một test khác, nhưng lần này chúng ta sẽ tạo một test fail! Tests fail khi có điều gì đó trong test function panics. Mỗi test được chạy trong một thread mới, và khi main thread thấy rằng một test thread đã chết, test được đánh dấu là failed. Trong Chương 9, chúng ta đã nói về cách đơn giản nhất để panic là gọi panic! macro. Nhập test mới như một function tên là another, để file src/lib.rs của bạn như Listing 11-3.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn exploration() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }

    #[test]
    fn another() {
        panic!("Make this test fail");
    }
}</code></pre>
</div>
<p><em>Listing 11-3: Thêm một test thứ hai sẽ fail vì chúng ta gọi panic! macro</em></p>

<p>Chạy tests lại bằng cargo test. Output nên như Listing 11-4, cho thấy test exploration của chúng ta pass và another fail.</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
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
<p><em>Listing 11-4: Kết quả test khi một test pass và một test fail</em></p>

<p>Thay vì ok, dòng test tests::another cho thấy FAILED. Hai sections mới xuất hiện giữa các kết quả individual và summary: Đầu tiên hiển thị lý do chi tiết cho mỗi test failure. Trong trường hợp này, chúng ta nhận được chi tiết rằng tests::another fail vì nó panicked với message Make this test fail ở dòng 17 trong file src/lib.rs. Section tiếp theo liệt kê chỉ tên của tất cả các failing tests, điều này hữu ích khi có nhiều tests và nhiều failing test output chi tiết. Chúng ta có thể sử dụng tên của một failing test để chỉ chạy test đó để debug dễ dàng hơn; chúng ta sẽ nói thêm về các cách chạy tests trong phần "Controlling How Tests Are Run".</p>

<p>Dòng summary hiển thị ở cuối: Nhìn chung, test result của chúng ta là FAILED. Chúng ta có một test pass và một test fail.</p>

<p>Bây giờ bạn đã thấy kết quả test trông như thế nào trong các scenarios khác nhau, hãy xem một số macros khác ngoài panic! hữu ích trong tests.</p>

<h3 class="task-heading">Kiểm tra kết quả với assert!</h3>
<p>assert! macro, được cung cấp bởi standard library, hữu ích khi bạn muốn đảm bảo một điều kiện nào đó trong test evaluate thành true. Chúng ta cho assert! macro một argument evaluate thành Boolean. Nếu giá trị là true, không có gì xảy ra và test passes. Nếu giá trị là false, assert! macro gọi panic! để cause test fail. Sử dụng assert! macro giúp chúng ta kiểm tra rằng code của chúng ta đang hoạt động theo cách chúng ta định.</p>

<p>Trong Chương 5, Listing 5-15, chúng ta đã sử dụng một Rectangle struct và một phương thức can_hold, được lặp lại ở đây trong Listing 11-5. Hãy đặt code này vào file src/lib.rs, sau đó viết một số tests cho nó sử dụng assert! macro.</p>
<p>Filename: src/lib.rs</p>

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
}</code></pre>
</div>
<p><em>Listing 11-5: Rectangle struct và phương thức can_hold từ Chương 5</em></p>

<p>Phương thức can_hold trả về một Boolean, có nghĩa là nó là một use case hoàn hảo cho assert! macro. Trong Listing 11-6, chúng ta viết một test exercises phương thức can_hold bằng cách tạo một Rectangle instance có width là 8 và height là 7 và assert rằng nó có thể hold một Rectangle instance khác có width là 5 và height là 1.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        assert!(larger.can_hold(&smaller));
    }
}</code></pre>
</div>
<p><em>Listing 11-6: Một test cho can_hold kiểm tra xem rectangle lớn hơn có thể hold rectangle nhỏ hơn không</em></p>

<p>Chú ý dòng use super::*; bên trong tests module. Tests module là một module thông thường tuân theo các visibility rules thông thường mà chúng ta đã cover trong Chương 7 ở phần "Paths for Referring to an Item in the Module Tree". Vì tests module là một inner module, chúng ta cần đưa code under test trong outer module vào scope của inner module. Chúng ta sử dụng glob ở đây, vì vậy bất cứ điều gì chúng ta định nghĩa trong outer module đều available cho tests module này.</p>

<p>Chúng ta đặt tên test là larger_can_hold_smaller, và chúng ta đã tạo hai Rectangle instances mà chúng ta cần. Sau đó, chúng ta gọi assert! macro và truyền cho nó kết quả của việc gọi larger.can_hold(&smaller). Expression này được cho là return true, vì vậy test của chúng ta nên pass. Hãy tìm hiểu!</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling rectangle v0.1.0 (file:///projects/rectangle)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.66s
     Running unittests src/lib.rs (target/debug/deps/rectangle-6584c4561e48942e)

running 1 test
test tests::larger_can_hold_smaller ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests rectangle

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Nó pass! Hãy thêm một test khác, lần này assert rằng một rectangle nhỏ hơn không thể hold một rectangle lớn hơn:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        // --snip--
    }

    #[test]
    fn smaller_cannot_hold_larger() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        assert!(!smaller.can_hold(&larger));
    }
}</code></pre>
</div>

<p>Vì kết quả đúng của hàm can_hold trong trường hợp này là false, chúng ta cần negate kết quả đó trước khi truyền nó cho assert! macro. Kết quả là, test của chúng ta sẽ pass nếu can_hold returns false:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling rectangle v0.1.0 (file:///projects/rectangle)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.66s
     Running unittests src/lib.rs (target/debug/deps/rectangle-6584c4561e48942e)

running 2 tests
test tests::larger_can_hold_smaller ... ok
test tests::smaller_cannot_hold_larger ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests rectangle

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Hai tests pass! Bây giờ hãy xem điều gì xảy ra với kết quả test khi chúng ta introduce một bug trong code của chúng ta. Chúng ta sẽ thay đổi implementation của phương thức can_hold bằng cách thay thế dấu lớn hơn (>) bằng dấu nhỏ hơn (<) khi nó so sánh các widths:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// --snip--
impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width < other.width && self.height > other.height
    }
}</code></pre>
</div>

<p>Chạy tests bây giờ produces output sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling rectangle v0.1.0 (file:///projects/rectangle)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.66s
     Running unittests src/lib.rs (target/debug/deps/rectangle-6584c4561e48942e)

running 2 tests
test tests::larger_can_hold_smaller ... FAILED
test tests::smaller_cannot_hold_larger ... ok

failures:

---- tests::larger_can_hold_smaller stdout ----

thread 'tests::larger_can_hold_smaller' panicked at src/lib.rs:28:9:
assertion failed: larger.can_hold(&smaller)
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace


failures:
    tests::larger_can_hold_smaller

test result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass \`--lib\`</code></pre>
</div>

<p>Tests của chúng ta đã bắt được bug! Vì larger.width là 8 và smaller.width là 5, so sánh các widths trong can_hold bây giờ returns false: 8 không nhỏ hơn 5.</p>

<h3 class="task-heading">Testing Equality với assert_eq! và assert_ne!</h3>
<p>Một cách phổ biến để verify functionality là test equality giữa kết quả của code under test và giá trị mong đợi code return. Bạn có thể làm điều này bằng cách sử dụng assert! macro và truyền cho nó một expression sử dụng == operator. Tuy nhiên, đây là một test phổ biến đến mức standard library cung cấp một cặp macros—assert_eq! và assert_ne!—để thực hiện test này tiện lợi hơn. Các macros này so sánh hai arguments cho equality hoặc inequality, tương ứng. Chúng cũng sẽ in hai giá trị nếu assertion fails, điều này giúp dễ dàng hơn để xem tại sao test fail; ngược lại, assert! macro chỉ cho biết rằng nó nhận được một giá trị false cho == expression, mà không in các giá trị dẫn đến giá trị false đó.</p>

<p>Trong Listing 11-7, chúng ta viết một function tên là add_two cộng 2 vào parameter của nó, sau đó chúng ta test function này sử dụng assert_eq! macro.</p>
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
    fn it_adds_two() {
        let result = add_two(2);
        assert_eq!(result, 4);
    }
}</code></pre>
</div>
<p><em>Listing 11-7: Testing function add_two sử dụng assert_eq! macro</em></p>

<p>Hãy kiểm tra xem nó pass!</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.58s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 1 test
test tests::it_adds_two ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Chúng ta tạo một biến tên là result chứa kết quả của việc gọi add_two(2). Sau đó, chúng ta truyền result và 4 như các arguments cho assert_eq! macro. Output line cho test này là test tests::it_adds_two ... ok, và text ok cho thấy test của chúng ta đã pass!</p>

<p>Hãy introduce một bug vào code của chúng ta để xem assert_eq! trông như thế nào khi nó fail. Thay đổi implementation của function add_two để thay vì cộng 3:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn add_two(a: u64) -> u64 {
    a + 3
}</code></pre>
</div>

<p>Chạy tests lại:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.61s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 1 test
test tests::it_adds_two ... FAILED

failures:

---- tests::it_adds_two stdout ----

thread 'tests::it_adds_two' panicked at src/lib.rs:12:9:
assertion \`left == right\` failed
  left: 5
 right: 4
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace


failures:
    tests::it_adds_two

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass \`--lib\`</code></pre>
</div>

<p>Test của chúng ta đã bắt được bug! Test tests::it_adds_two fail, và message cho chúng ta biết rằng assertion fail là left == right và các giá trị left và right là gì. Message này giúp chúng ta bắt đầu debug: Argument left, nơi chúng ta có kết quả của việc gọi add_two(2), là 5, nhưng argument right là 4. Bạn có thể tưởng tượng điều này sẽ đặc biệt hữu ích khi chúng ta có nhiều tests đang chạy.</p>

<p>Lưu ý rằng trong một số ngôn ngữ và test frameworks, các parameters cho equality assertion functions được gọi là expected và actual, và thứ tự trong đó chúng ta specify các arguments quan trọng. Tuy nhiên, trong Rust, chúng được gọi là left và right, và thứ tự trong đó chúng ta specify giá trị chúng ta expect và giá trị code produces không quan trọng. Chúng ta có thể viết assertion trong test này là assert_eq!(4, result), điều này sẽ result trong cùng một failure message hiển thị assertion \`left == right\` failed.</p>

<p>assert_ne! macro sẽ pass nếu hai giá trị chúng ta cho nó không bằng nhau và sẽ fail nếu chúng bằng nhau. Macro này hữu ích nhất cho các cases khi chúng ta không chắc chắn giá trị sẽ là gì, nhưng chúng ta biết giá trị chắc chắn không nên là gì. Ví dụ, nếu chúng ta đang test một function được đảm bảo sẽ thay đổi input của nó theo một cách nào đó, nhưng cách input được thay đổi phụ thuộc vào ngày trong tuần mà chúng ta chạy tests, điều tốt nhất để assert có thể là output của function không bằng input.</p>

<p>Bên dưới, assert_eq! và assert_ne! macros sử dụng các operators == và !=, tương ứng. Khi các assertions fail, các macros này in các arguments của chúng sử dụng debug formatting, có nghĩa là các giá trị được so sánh phải implement các traits PartialEq và Debug. Tất cả primitive types và hầu hết các standard library types implement các traits này. Đối với structs và enums mà bạn tự định nghĩa, bạn sẽ cần implement PartialEq để assert equality của các types đó. Bạn cũng sẽ cần implement Debug để in các giá trị khi assertion fail. Vì cả hai traits đều là derivable traits, như đề cập trong Listing 5-12 trong Chương 5, điều này thường đơn giản như thêm annotation #[derive(PartialEq, Debug)] vào struct hoặc enum definition của bạn. Xem Appendix C, "Derivable Traits," để biết thêm chi tiết về các traits này và các derivable traits khác.</p>

<h3 class="task-heading">Thêm Custom Failure Messages</h3>
<p>Bạn cũng có thể thêm custom message để được in cùng với failure message như optional arguments cho assert!, assert_eq!, và assert_ne! macros. Bất kỳ arguments nào được specify sau các required arguments được truyền along đến format! macro (được thảo luận trong "Concatenating with + or format!" ở Chương 8), vì vậy bạn có thể truyền một format string chứa các {} placeholders và các values để điền vào các placeholders đó. Custom messages hữu ích cho việc document một assertion có nghĩa gì; khi một test fail, bạn sẽ có ý tưởng tốt hơn về vấn đề là gì với code.</p>

<p>Ví dụ, giả sử chúng ta có một function chào người bằng tên và chúng ta muốn test rằng tên chúng ta truyền vào function xuất hiện trong output:</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn greeting(name: &str) -> String {
    format!("Hello {name}!")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(result.contains("Carol"));
    }
}</code></pre>
</div>

<p>Các requirements cho program này vẫn chưa được agree upon, và chúng ta khá chắc chắn rằng text Hello ở đầu greeting sẽ thay đổi. Chúng ta quyết định không muốn phải update test khi requirements thay đổi, vì vậy thay vì check exact equality đến giá trị returned từ greeting function, chúng ta sẽ chỉ assert rằng output chứa text của input parameter.</p>

<p>Bây giờ hãy introduce một bug vào code này bằng cách thay đổi greeting để exclude name để xem default test failure trông như thế nào:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn greeting(name: &str) -> String {
    String::from("Hello!")
}</code></pre>
</div>

<p>Chạy test này produces output sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling greeter v0.1.0 (file:///projects/greeter)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.91s
     Running unittests src/lib.rs (target/debug/deps/greeter-170b942eb5bf5e3a)

running 1 test
test tests::greeting_contains_name ... FAILED

failures:

---- tests::greeting_contains_name stdout ----

thread 'tests::greeting_contains_name' panicked at src/lib.rs:12:9:
assertion failed: result.contains("Carol")
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace


failures:
    tests::greeting_contains_name

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass \`--lib\`</code></pre>
</div>

<p>Kết quả này chỉ cho biết rằng assertion fail và dòng nào assertion đó ở đó. Một failure message hữu ích hơn sẽ in giá trị từ greeting function. Hãy thêm một custom failure message composed của một format string với một placeholder filled in với giá trị thực tế chúng ta nhận được từ greeting function:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(
            result.contains("Carol"),
            "Greeting did not contain name, value was \`{result}\`"
        );
    }</code></pre>
</div>

<p>Bây giờ khi chúng ta chạy test, chúng ta sẽ nhận được một error message informative hơn:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling greeter v0.1.0 (file:///projects/greeter)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.93s
     Running unittests src/lib.rs (target/debug/deps/greeter-170b942eb5bf5e3a)

running 1 test
test tests::greeting_contains_name ... FAILED

failures:

---- tests::greeting_contains_name stdout ----

thread 'tests::greeting_contains_name' panicked at src/lib.rs:12:9:
Greeting did not contain name, value was \`Hello!\`
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace


failures:
    tests::greeting_contains_name

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass \`--lib\`</code></pre>
</div>

<p>Chúng ta có thể thấy giá trị thực tế chúng ta nhận được trong test output, điều này sẽ giúp chúng ta debug điều gì đã xảy ra thay vì điều chúng ta mong đợi xảy ra.</p>

<h3 class="task-heading">Kiểm tra Panics với should_panic</h3>
<p>Ngoài việc check return values, cũng quan trọng để check rằng code của chúng ta xử lý error conditions như mong đợi. Ví dụ, xem xét type Guess mà chúng ta đã tạo trong Chương 9, Listing 9-13. Các code khác sử dụng Guess phụ thuộc vào guarantee rằng Guess instances sẽ chỉ chứa các giá trị giữa 1 và 100. Chúng ta có thể viết một test đảm bảo rằng việc cố gắng tạo một Guess instance với giá trị ngoài phạm vi đó panics.</p>

<p>Chúng ta làm điều này bằng cách thêm attribute should_panic vào test function của chúng ta. Test pass nếu code bên trong function panics; test fail nếu code bên trong function không panic.</p>

<p>Listing 11-8 cho thấy một test kiểm tra rằng các error conditions của Guess::new xảy ra khi chúng ta mong đợi.</p>
<p>Filename: src/lib.rs</p>

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
<p><em>Listing 11-8: Testing rằng một condition sẽ cause một panic!</em></p>

<p>Chúng ta đặt #[should_panic] attribute sau #[test] attribute và trước test function nó apply. Hãy xem kết quả khi test này pass:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.58s
     Running unittests src/lib.rs (target/debug/deps/guessing_game-57d70c3acb738f4d)

running 1 test
test tests::greater_than_100 - should panic ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests guessing_game

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Looks good! Bây giờ hãy introduce một bug trong code của chúng ta bằng cách loại bỏ condition rằng function new sẽ panic nếu giá trị lớn hơn 100:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// --snip--
impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
            panic!("Guess value must be between 1 and 100, got {value}.");
        }

        Guess { value }
    }
}</code></pre>
</div>

<p>Khi chúng ta chạy test trong Listing 11-8, nó sẽ fail:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.62s
     Running unittests src/lib.rs (target/debug/deps/guessing_game-57d70c3acb738f4d)

running 1 test
test tests::greater_than_100 - should panic ... FAILED

failures:

---- tests::greater_than_100 stdout ----
note: test did not panic as expected at src/lib.rs:21:8

failures:
    tests::greater_than_100

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass \`--lib\`</code></pre>
</div>

<p>Chúng ta không nhận được một message rất hữu ích trong trường hợp này, nhưng khi chúng ta nhìn vào test function, chúng ta thấy nó được annotate với #[should_panic]. Failure chúng ta nhận được có nghĩa là code trong test function không cause một panic.</p>

<p>Tests sử dụng should_panic có thể không chính xác. Một should_panic test sẽ pass ngay cả khi test panics với một lý do khác với cái chúng ta mong đợi. Để làm cho should_panic tests chính xác hơn, chúng ta có thể thêm một optional expected parameter vào should_panic attribute. Test harness sẽ đảm bảo rằng failure message chứa provided text. Ví dụ, xem xét code đã sửa đổi cho Guess trong Listing 11-9 nơi function new panics với các messages khác nhau tùy thuộc vào việc giá trị quá nhỏ hay quá lớn.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// --snip--

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
            panic!(
                "Guess value must be greater than or equal to 1, got {value}."
            );
        } else if value > 100 {
            panic!(
                "Guess value must be less than or equal to 100, got {value}."
            );
        }

        Guess { value }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic(expected = "less than or equal to 100")]
    fn greater_than_100() {
        Guess::new(200);
    }
}</code></pre>
</div>
<p><em>Listing 11-9: Testing cho một panic! với một panic message chứa một specified substring</em></p>

<p>Test này sẽ pass vì giá trị chúng ta đặt trong expected parameter của should_panic attribute là một substring của message mà Guess::new function panics với. Chúng ta có thể specify entire panic message mà chúng ta expect, trong trường hợp này sẽ là Guess value must be less than or equal to 100, got 200. Điều bạn chọn specify phụ thuộc vào phần nào của panic message là unique hoặc dynamic và bạn muốn test của bạn chính xác đến mức nào. Trong trường hợp này, một substring của panic message là đủ để đảm bảo rằng code trong test function executes else if value > 100 case.</p>

<p>Để xem điều gì xảy ra khi một should_panic test với expected message fail, hãy lại introduce một bug vào code của chúng ta bằng cách swap bodies của if value < 1 và else if value > 100 blocks:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        if value < 1 {
            panic!(
                "Guess value must be less than or equal to 100, got {value}."
            );
        } else if value > 100 {
            panic!(
                "Guess value must be greater than or equal to 1, got {value}."
            );
        }</code></pre>
</div>

<p>Lần này khi chúng ta chạy should_panic test, nó sẽ fail:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.66s
     Running unittests src/lib.rs (target/debug/deps/guessing_game-57d70c3acb738f4d)

running 1 test
test tests::greater_than_100 - should panic ... FAILED

failures:

---- tests::greater_than_100 stdout ----

thread 'tests::greater_than_100' panicked at src/lib.rs:12:13:
Guess value must be greater than or equal to 1, got 200.
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace
note: panic did not contain expected string
      panic message: "Guess value must be greater than or equal to 1, got 200."
 expected substring: "less than or equal to 100"

failures:
    tests::greater_than_100

test result: FAILED. 0 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

error: test failed, to rerun pass \`--lib\`</code></pre>
</div>

<p>Failure message chỉ ra rằng test này đúng như chúng ta expect đã panic, nhưng panic message không bao gồm expected string less than or equal to 100. Panic message mà chúng ta thực sự nhận được trong trường hợp này là Guess value must be greater than or equal to 1, got 200. Bây giờ chúng ta có thể bắt đầu tìm ra bug ở đâu!</p>

<h3 class="task-heading">Sử dụng Result&lt;T, E&gt; trong Tests</h3>
<p>Tất cả tests của chúng ta cho đến giờ panic khi fail. Chúng ta cũng có thể viết tests sử dụng Result&lt;T, E&gt;! Đây là test từ Listing 11-1, được viết lại để sử dụng Result&lt;T, E&gt; và return một Err thay vì panicking:</p>

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

<p>Function it_works bây giờ có Result&lt;(), String&gt; return type. Trong body của function, thay vì gọi assert_eq! macro, chúng ta return Ok(()) khi test pass và một Err với String bên trong khi test fail.</p>

<p>Viết tests để chúng return Result&lt;T, E&gt; cho phép bạn sử dụng question mark operator trong body của tests, điều này có thể là một cách tiện lợi để viết tests nên fail nếu bất kỳ operation nào bên trong chúng returns một Err variant.</p>

<p>Bạn không thể sử dụng #[should_panic] annotation trên tests sử dụng Result&lt;T, E&gt;. Để assert rằng một operation returns một Err variant, đừng sử dụng question mark operator trên Result&lt;T, E&gt; value. Thay vào đó, sử dụng assert!(value.is_err()).</p>

<p>Bây giờ bạn đã biết một số cách để viết tests, hãy xem điều gì đang xảy ra khi chúng ta chạy tests của chúng ta và khám phá các options khác nhau chúng ta có thể sử dụng với cargo test.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt cách viết Tests:</strong>
  <ul>
    <li><strong>#[test]</strong> - Annotate một hàm thành test</li>
    <li><strong>#[cfg(test)]</strong> - Module chỉ được compile khi chạy tests</li>
    <li><strong>assert!(condition)</strong> - Assert true/false</li>
    <li><strong>assert_eq!(left, right)</strong> - Assert equality</li>
    <li><strong>assert_ne!(left, right)</strong> - Assert inequality</li>
    <li><strong>#[should_panic]</strong> - Test phải panic</li>
    <li><strong>#[should_panic(expected = "...")]</strong> - Test phải panic với message chứa text</li>
    <li><strong>Result&lt;(), String&gt;</strong> - Tests có thể return Result</li>
    <li><strong>Custom messages</strong> - Thêm message vào assert</li>
    <li><strong>use super::*;</strong> - Import code từ outer module vào tests module</li>
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
