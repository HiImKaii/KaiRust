import { Lesson } from '../../courses';

export const ch11_03: Lesson = {
            id: 'ch11-03',
            title: '11.3 Tổ chức Tests',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Như đã đề cập ở đầu chương, testing là một môn học phức tạp, và những người khác nhau sử dụng các thuật ngữ và tổ chức khác nhau. Cộng đồng Rust nghĩ về tests theo hai loại chính: unit tests và integration tests. Unit tests nhỏ và tập trung hơn, test một module tại một thời điểm, và có thể test các private interfaces. Integration tests hoàn toàn external đối với library của bạn và sử dụng code của bạn theo cùng cách như bất kỳ code external nào khác, chỉ sử dụng public interface và có thể test nhiều modules mỗi test.</p>

<p>Viết cả hai loại tests đều quan trọng để đảm bảo các mảnh của library của bạn đang làm những gì bạn mong đợi, riêng lẻ và cùng nhau.</p>

<h3 class="task-heading">Unit Tests</h3>
<p>Mục đích của unit tests là test mỗi đơn vị code tách biệt với phần còn lại của code để nhanh chóng xác định nơi code đang và không hoạt động như mong đợi. Bạn sẽ đặt unit tests trong thư mục src trong mỗi file với code mà chúng đang test. Quy ước là tạo một module tên là tests trong mỗi file để chứa các test functions và annotate module với cfg(test).</p>

<h4>Module tests và #[cfg(test)]</h4>
<p>Annotation #[cfg(test)] trên module tests yêu cầu Rust chỉ compile và chạy test code khi bạn chạy cargo test, không phải khi bạn chạy cargo build. Điều này tiết kiệm thời gian compile khi bạn chỉ muốn build library và tiết kiệm không gian trong artifact được compile vì tests không được bao gồm. Bạn sẽ thấy rằng vì integration tests đi trong một thư mục khác, chúng không cần annotation #[cfg(test)]. Tuy nhiên, vì unit tests đi trong cùng files với code, bạn sẽ sử dụng #[cfg(test)] để chỉ định rằng chúng không nên được bao gồm trong kết quả compile.</p>

<p>Nhớ lại rằng khi chúng ta tạo project adder mới trong phần đầu của chương này, Cargo đã generate code này cho chúng ta:</p>

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

<p>Trên module tests được tự động generate, thuộc tính cfg viết tắt cho configuration và nói cho Rust biết rằng item sau chỉ nên được bao gồm với một tùy chọn configuration nhất định. Trong trường hợp này, tùy chọn configuration là test, được cung cấp bởi Rust để compile và chạy tests. Bằng cách sử dụng thuộc tính cfg, Cargo compile test code của chúng ta chỉ khi chúng ta chủ động chạy tests với cargo test. Điều này bao gồm bất kỳ helper functions nào có thể nằm trong module này, ngoài các functions được annotate với #[test].</p>

<h4>Tests cho Private Functions</h4>
<p>Có tranh luận trong cộng đồng testing về việc liệu private functions có nên được test trực tiếp hay không, và các ngôn ngữ khác làm cho việc test private functions khó hoặc không thể. Bất kể ideology testing nào bạn theo, Rust's privacy rules cho phép bạn test private functions. Hãy xem code trong Listing 11-12 với private function internal_adder.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn add_two(a: u64) -> u64 {
    internal_adder(a, 2)
}

fn internal_adder(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn internal() {
        let result = internal_adder(2, 2);
        assert_eq!(result, 4);
    }
}</code></pre>
</div>
<p><em>Listing 11-12: Testing một private function</em></p>

<p>Lưu ý rằng function internal_adder không được đánh dấu là pub. Tests chỉ là Rust code, và module tests chỉ là một module khác. Như chúng ta đã thảo luận trong "Paths for Referring to an Item in the Module Tree", các items trong child modules có thể sử dụng các items trong ancestor modules của chúng. Trong test này, chúng ta đưa tất cả các items thuộc về parent của module tests vào scope với use super::* , và sau đó test có thể gọi internal_adder. Nếu bạn nghĩ rằng private functions không nên được test, không có gì trong Rust sẽ buộc bạn phải làm như vậy.</p>

<h3 class="task-heading">Integration Tests</h3>
<p>Trong Rust, integration tests hoàn toàn external đối với library của bạn. Chúng sử dụng library của bạn theo cùng cách như bất kỳ code nào khác, có nghĩa là chúng chỉ có thể gọi các functions là một phần của public API của library của bạn. Mục đích của chúng là test whether nhiều parts của library của bạn hoạt động cùng nhau đúng cách. Các units of code hoạt động đúng một mình có thể có vấn đề khi tích hợp, vì vậy test coverage của integrated code cũng quan trọng. Để tạo integration tests, trước tiên bạn cần một thư mục tests.</p>

<h4>Thư mục tests</h4>
<p>Chúng ta tạo một thư mục tests ở top level của thư mục project, bên cạnh src. Cargo biết tìm các integration test files trong thư mục này. Sau đó, chúng ta có thể tạo bao nhiêu test files tùy thích, và Cargo sẽ compile mỗi file như một crate riêng lẻ.</p>

<p>Hãy tạo một integration test. Với code trong Listing 11-12 vẫn trong file src/lib.rs, tạo một thư mục tests, và tạo một file mới tên là tests/integration_test.rs. Cấu trúc thư mục của bạn nên trông như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>adder
├── Cargo.lock
├── Cargo.toml
├── src
│   └── lib.rs
└── tests
    └── integration_test.rs</code></pre>
</div>

<p>Nhập code trong Listing 11-13 vào file tests/integration_test.rs.</p>
<p>Filename: tests/integration_test.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use adder::add_two;

#[test]
fn it_adds_two() {
    let result = add_two(2);
    assert_eq!(result, 4);
}</code></pre>
</div>
<p><em>Listing 11-13: Một integration test của một function trong adder crate</em></p>

<p>Mỗi file trong thư mục tests là một crate riêng biệt, vì vậy chúng ta cần đưa library của mình vào scope của mỗi test crate. Vì lý do đó, chúng ta thêm use adder::add_two; ở đầu code, điều mà chúng ta không cần trong unit tests.</p>

<p>Chúng ta không cần annotate bất kỳ code nào trong tests/integration_test.rs với #[cfg(test)]. Cargo đối xử với thư mục tests đặc biệt và compile các files trong thư mục này chỉ khi chúng ta chạy cargo test. Chạy cargo test ngay bây giờ:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 1.31s
     Running unittests src/lib.rs (target/debug/deps/adder-1082c4b063a8fbe6)

running 1 test
test tests::internal ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running tests/integration_test.rs (target/debug/deps/integration_test-1082c4b063a8fbe6)

running 1 test
test it_adds_two ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Ba phần của output bao gồm unit tests, integration test, và doc tests. Lưu ý rằng nếu bất kỳ test nào trong một phần fail, các phần sau sẽ không chạy. Ví dụ, nếu một unit test fail, sẽ không có output nào cho integration và doc tests, vì những tests đó sẽ chỉ chạy nếu tất cả unit tests đang pass.</p>

<p>Phần đầu tiên cho unit tests giống như chúng ta đã thấy: một dòng cho mỗi unit test (một tên internal mà chúng ta đã thêm trong Listing 11-12) và sau đó là một dòng tóm tắt cho unit tests.</p>

<p>Phần integration tests bắt đầu với dòng Running tests/integration_test.rs. Tiếp theo, có một dòng cho mỗi test function trong integration test đó và một dòng tóm tắt cho kết quả của integration test ngay trước khi phần Doc-tests adder bắt đầu.</p>

<p>Mỗi integration test file có phần riêng của nó, vì vậy nếu chúng ta thêm nhiều files hơn trong thư mục tests, sẽ có nhiều phần integration test hơn.</p>

<p>Chúng ta vẫn có thể chạy một integration test function cụ thể bằng cách chỉ định tên test function như một argument cho cargo test. Để chạy tất cả tests trong một integration test file cụ thể, sử dụng argument --test của cargo test theo sau bởi tên của file:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test --test integration_test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.64s
     Running tests/integration_test.rs (target/debug/deps/integration_test-82e7799c1bc62298)

running 1 test
test it_adds_two ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Lệnh này chỉ chạy các tests trong file tests/integration_test.rs.</p>

<h4>Submodules trong Integration Tests</h4>
<p>Khi bạn thêm nhiều integration tests hơn, bạn có thể muốn tạo nhiều files hơn trong thư mục tests để giúp tổ chức chúng; ví dụ, bạn có thể nhóm các test functions theo functionality mà chúng đang test. Như đề cập trước đó, mỗi file trong thư mục tests được compile như crate riêng biệt của riêng nó, hữu ích để tạo separate scopes để gần hơn với cách end users sẽ sử dụng crate của bạn. Tuy nhiên, điều này có nghĩa là các files trong thư mục tests không chia sẻ cùng behavior như các files trong src, như bạn đã học trong Chương 7 về cách tách code thành modules và files.</p>

<p>Behavior khác biệt của các files trong thư mục tests có thể nhận thấy rõ nhất khi bạn có một tập hợp các helper functions để sử dụng trong nhiều integration test files, và bạn cố gắng làm theo các bước trong phần "Separating Modules into Different Files" của Chương 7 để trích xuất chúng thành một module chung. Ví dụ, nếu chúng ta tạo tests/common.rs và đặt một function tên là setup trong đó, chúng ta có thể thêm một số code vào setup mà chúng ta muốn gọi từ nhiều test functions trong nhiều test files:</p>

<p>Filename: tests/common.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn setup() {
    // setup code specific to your library's tests would go here
}</code></pre>
</div>

<p>Khi chúng ta chạy tests lại, chúng ta sẽ thấy một phần mới trong test output cho file common.rs, mặc dù file này không chứa bất kỳ test functions nào và chúng ta cũng không gọi function setup từ bất kỳ đâu:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling adder v0.1.0 (file:///projects/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.89s
     Running unittests src/lib.rs (target/debug/deps/adder-92948b65e88960b4)

running 1 test
test tests::internal ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running tests/common.rs (target/debug/deps/common-92948b65e88960b4)

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running tests/integration_test.rs (target/debug/deps/integration_test-92948b65e88960b4)

running 1 test
test it_adds_two ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Việc có common xuất hiện trong test results với running 0 tests displayed cho nó không phải là điều chúng ta muốn. Chúng ta chỉ muốn share một số code với các integration test files khác. Để tránh có common xuất hiện trong test output, thay vì tạo tests/common.rs, chúng ta sẽ tạo tests/common/mod.rs. Thư mục project bây giờ trông như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>├── Cargo.lock
├── Cargo.toml
├── src
│   └── lib.rs
└── tests
    ├── common
    │   └── mod.rs
    └── integration_test.rs</code></pre>
</div>

<p>Đây là quy ước đặt tên cũ hơn mà Rust cũng hiểu mà chúng ta đã đề cập trong "Alternate File Paths" ở Chương 7. Đặt tên file theo cách này nói cho Rust không đối xử với module common như một integration test file. Khi chúng ta di chuyển function setup code vào tests/common/mod.rs và xóa file tests/common.rs, phần trong test output sẽ không còn xuất hiện. Các files trong subdirectories của thư mục tests không được compile như separate crates hoặc có các phần trong test output.</p>

<p>Sau khi chúng ta đã tạo tests/common/mod.rs, chúng ta có thể sử dụng nó từ bất kỳ integration test file nào. Đây là một ví dụ về việc gọi function setup từ test it_adds_two trong tests/integration_test.rs:</p>

<p>Filename: tests/integration_test.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use adder::add_two;

mod common;

#[test]
fn it_adds_two() {
    common::setup();

    let result = add_two(2);
    assert_eq!(result, 4);
}</code></pre>
</div>

<p>Lưu ý rằng khai báo mod common; giống như module declaration mà chúng ta đã trình bày trong Listing 7-21. Sau đó, trong test function, chúng ta có thể gọi function common::setup().</p>

<h4>Integration Tests cho Binary Crates</h4>
<p>Nếu project của chúng ta là một binary crate chỉ chứa file src/main.rs và không có file src/lib.rs, chúng ta không thể tạo integration tests trong thư mục tests và đưa các functions được định nghĩa trong file src/main.rs vào scope với một use statement. Chỉ library crates expose các functions mà các crates khác có thể sử dụng; binary crates được dự định để chạy tự chủ.</p>

<p>Đây là một trong những lý do mà các Rust projects cung cấp một binary có một file src/main.rs đơn giản gọi logic nằm trong file src/lib.rs. Sử dụng cấu trúc đó, integration tests có thể test library crate với use để làm cho functionality quan trọng có sẵn. Nếu functionality quan trọng hoạt động, một lượng nhỏ code trong file src/main.rs cũng sẽ hoạt động, và lượng nhỏ code đó không cần được test.</p>

<h3 class="task-heading">Tóm tắt</h3>
<p>Các tính năng testing của Rust cung cấp một cách để chỉ định code nên hoạt động như thế nào để đảm bảo nó tiếp tục hoạt động như bạn mong đợi, ngay cả khi bạn thực hiện các thay đổi. Unit tests exercise các parts khác nhau của một library riêng lẻ và có thể test các private implementation details. Integration tests kiểm tra nhiều parts của library hoạt động cùng nhau đúng cách, và chúng sử dụng public API của library để test code theo cùng cách như external code sẽ sử dụng nó. Mặc dù type system của Rust và các quy tắc ownership giúp ngăn ngừa một số loại bugs, tests vẫn quan trọng để giảm logic bugs liên quan đến cách code của bạn được mong đợi hoạt động.</p>

<p>Hãy kết hợp kiến thức bạn đã học trong chương này và trong các chương trước để làm việc trên một project!</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Tổ chức Tests:</strong>
  <ul>
    <li><strong>Unit Tests</strong> - Test từng đơn vị code, có thể test private functions</li>
    <li><strong>#[cfg(test)]</strong> - Module chỉ được compile khi chạy tests</li>
    <li><strong>Integration Tests</strong> - Test nhiều modules cùng nhau, sử dụng public API</li>
    <li><strong>tests/ directory</strong> - Thư mục chứa integration tests</li>
    <li><strong>use crate::function</strong> - Import public API trong integration tests</li>
    <li><strong>cargo test --test filename</strong> - Chạy integration test cụ thể</li>
    <li><strong>tests/common/mod.rs</strong> - Tạo helper module không bị coi là test</li>
  </ul>
</div>
`,
            defaultCode: `// Mô phỏng cấu trúc test
// Trong thực tế, dùng #[cfg(test)] và cargo test

fn add_two(n: i32) -> i32 {
    n + 2
}

fn is_positive(n: i32) -> bool {
    n > 0
}

fn main() {
    // Giả lập Unit Tests
    println!("=== Unit Tests (src/lib.rs) ===");
    assert_eq!(add_two(2), 4);
    println!("test_add_two passed");
    assert_eq!(add_two(-1), 1);
    println!("test_add_two_negative passed");

    // Giả lập Integration Tests
    println!("\\n=== Integration Tests (tests/) ===");
    let result = add_two(40);
    assert!(is_positive(result));
    println!("test_add_two_is_positive passed");

    println!("\\nKet qua: 3 passed, 0 failed");
}
`,
            expectedOutput: '=== Unit Tests (src/lib.rs) ===\ntest_add_two passed\ntest_add_two_negative passed\n\n=== Integration Tests (tests/) ===\ntest_add_two_is_positive passed\n\nKet qua: 3 passed, 0 failed'
        };
