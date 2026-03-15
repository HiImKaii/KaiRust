import { Lesson } from '../../courses';

export const ch07_01: Lesson = {
            id: '07-01',
            title: '7.1 Packages and Crates',
            duration: '35 phút',
            type: 'theory',
            content: `
<p>Các phần đầu tiên của module system mà chúng ta sẽ cover là packages và crates.</p>

<h3 class="task-heading">Crates</h3>
<p>Một <strong>crate</strong> là lượng nhỏ nhất của code mà Rust compiler xem xét tại một thời điểm. Ngay cả khi bạn chạy rustc thay vì cargo và truyền một source code file đơn lẻ (như chúng ta đã làm từ "Rust Program Basics" trong Chương 1), compiler coi file đó là một crate. Crates có thể chứa modules, và các modules có thể được định nghĩa trong các files khác được biên dịch cùng với crate, như chúng ta sẽ thấy trong các sections sắp tới.</p>

<p>Một crate có thể ở một trong hai dạng: binary crate hoặc library crate. Binary crates là các programs bạn có thể compile thành executable mà bạn có thể chạy, như một command line program hoặc một server. Mỗi crate phải có một function gọi là main định nghĩa điều gì xảy ra khi executable chạy. Tất cả các crates chúng ta đã tạo cho đến nay đều là binary crates.</p>

<p>Library crates không có main function, và chúng không compile thành executable. Thay vào đó, chúng định nghĩa functionality được chia sẻ với nhiều projects. Ví dụ, crate rand mà chúng ta đã sử dụng trong Chương 2 cung cấp functionality tạo ra các số ngẫu nhiên. Hầu hết thời gian khi các Rustaceans nói "crate", họ muốn nói library crate, và họ sử dụng "crate" thay thế cho khái niệm lập trình chung của một "library".</p>

<p>Crate root là một source file mà Rust compiler bắt đầu từ đó và tạo thành root module của crate của bạn (chúng ta sẽ giải thích modules sâu hơn trong "Control Scope and Privacy with Modules").</p>

<h3 class="task-heading">Packages</h3>
<p>Một <strong>package</strong> là một bundle của một hoặc nhiều crates cung cấp một tập hợp các functionality. Một package chứa một file Cargo.toml mô tả cách build những crates đó. Cargo thực chất là một package chứa binary crate cho command line tool mà bạn đã sử dụng để build code của mình. Package Cargo cũng chứa một library crate mà binary crate phụ thuộc vào. Các projects khác có thể phụ thuộc vào Cargo library crate để sử dụng cùng logic mà Cargo command line tool sử dụng.</p>

<p>Một package có thể chứa bao nhiêu binary crates tùy thích, nhưng chỉ có thể có nhiều nhất một library crate. Một package phải chứa ít nhất một crate, cho dù đó là library hay binary crate.</p>

<h3 class="task-heading">Ví dụ: Tạo một Package</h3>
<p>Hãy đi qua điều gì xảy ra khi chúng ta tạo một package. Đầu tiên, chúng ta nhập command cargo new my-project:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new my-project
     Created binary (application) \`my-project\` package
$ ls my-project
Cargo.toml
src
$ ls my-project/src
main.rs</code></pre>
</div>

<p>Sau khi chạy cargo new my-project, chúng ta sử dụng ls để xem Cargo tạo ra gì. Trong thư mục my-project, có một file Cargo.toml, cho chúng ta một package. Cũng có một thư mục src chứa main.rs. Mở Cargo.toml trong text editor của bạn và lưu ý rằng không có đề cập đến src/main.rs. Cargo tuân theo quy ước rằng src/main.rs là crate root của một binary crate có cùng tên với package. Tương tự, Cargo biết rằng nếu thư mục package chứa src/lib.rs, package chứa một library crate có cùng tên với package, và src/lib.rs là crate root của nó. Cargo truyền các crate root files cho rustc để build library hoặc binary.</p>

<p>Ở đây, chúng ta có một package chỉ chứa src/main.rs, có nghĩa là nó chỉ chứa một binary crate tên là my-project. Nếu một package chứa src/main.rs và src/lib.rs, nó có hai crates: một binary và một library, cả hai đều có cùng tên với package. Một package có thể có nhiều binary crates bằng cách đặt files trong thư mục src/bin: Mỗi file sẽ là một binary crate riêng biệt.</p>

<h3 class="task-heading">Tóm tắt cấu trúc Package</h3>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>my-project/
├── Cargo.toml          # Package manifest
├── src/
│   ├── main.rs        # Binary crate root (có hàm main)
│   ├── lib.rs         # Library crate root (tùy chọn)
│   └── bin/           # Binary crates khác (tùy chọn)
│       └── ...
├── examples/           # Example binaries
├── tests/             # Integration tests
└── benches/           # Benchmark tests</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Quy ước quan trọng:</strong>
  <ul>
    <li><code>src/main.rs</code> → Binary crate root, compile thành executable</li>
    <li><code>src/lib.rs</code> → Library crate root, dùng làm thư viện</li>
    <li>Cả hai đều có cùng tên với package trong Cargo.toml</li>
  </ul>
</div>
`,
            defaultCode: `// Ví dụ về cấu trúc Package trong Rust
//
// my-project/
// ├── Cargo.toml          # Package manifest
// ├── src/
// │   ├── main.rs        # Binary crate root
// │   └── lib.rs         # Library crate root (optional)
// └── ...

fn main() {
    println!("Packages and Crates trong Rust");
    println!("");
    println!("- Crate: đơn vị biên dịch nhỏ nhất");
    println!("- Binary crate: có main(), tạo executable");
    println!("- Library crate: chia sẻ code, không có main()");
    println!("- Package: bundle crates + Cargo.toml");
    println!("");
    println!("Quy ước:");
    println!("  src/main.rs -> binary crate root");
    println!("  src/lib.rs  -> library crate root");
}
`,
            expectedOutput: `Packages and Crates trong Rust

- Crate: đơn vị biên dịch nhỏ nhất
- Binary crate: có main(), tạo executable
- Library crate: chia sẻ code, không có main()
- Package: bundle crates + Cargo.toml

Quy ước:
  src/main.rs -> binary crate root
  src/lib.rs  -> library crate root`
        };
