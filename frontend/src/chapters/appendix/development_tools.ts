import { Lesson } from '../../courses';

export const developmentTools: Lesson = {
            id: 'appendix-d',
            title: 'Appendix D: Useful Development Tools',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Trong phụ lục này, chúng ta nói về một số công cụ phát triển hữu ích mà Rust project cung cấp. Chúng ta sẽ xem xét automatic formatting, cách nhanh để apply warning fixes, một linter, và tích hợp IDEs.</p>

<h3 class="task-heading">Automatic Formatting với rustfmt</h3>
<p>Công cụ rustfmt reformats code của bạn theo community code style. Nhiều collaborative projects sử dụng rustfmt để ngăn cãi về style nào khi viết Rust: Mọi người format code của họ bằng công cụ này.</p>

<p>Rust installations bao gồm rustfmt theo mặc định, vì vậy bạn nên có các chương trình rustfmt và cargo-fmt trên hệ thống của mình. Hai commands này tương tự như rustc và cargo vì rustfmt cho phép fine-grained control và cargo-fmt hiểu conventions của một project sử dụng Cargo. Để format bất kỳ Cargo project nào, nhập sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo fmt</code></pre>
</div>

<p>Chạy command này reformat tất cả Rust code trong crate hiện tại. Điều này chỉ nên thay đổi code style, không phải code semantics. Để biết thêm thông tin về rustfmt, xem tài liệu của nó.</p>

<h3 class="task-heading">Sửa Code của bạn với rustfix</h3>
<p>Công cụ rustfix được bao gồm với Rust installations và có thể tự động sửa compiler warnings có một cách rõ ràng để sửa vấn đề mà có lẽ là những gì bạn muốn. Bạn có lẽ đã thấy compiler warnings trước đây. Ví dụ, xem xét code này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut x = 42;
    println!("{x}");
}</code></pre>
</div>

<p>Ở đây, chúng ta định nghĩa biến x là mutable, nhưng chúng ta thực sự không bao giờ mutate nó. Rust warn chúng ta về điều đó:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
warning: variable does not need to be mutable
 --> src/main.rs:2:9
  |
2 |     let mut x = 0;
  |         ----^
  |         help: remove this \`mut\`</code></pre>
</div>

<p>Warning đề nghị rằng chúng ta remove keyword mut. Chúng ta có thể tự động apply đề nghị đó sử dụng rustfix tool bằng cách chạy command cargo fix:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo fix
    Checking myprogram v0.1.0 (file:///projects/myprogram)
      Fixing src/main.rs (1 fix)
    Finished dev [unoptimized + debuginfo] target(s) in 0.59s</code></pre>
</div>

<p>Khi chúng ta xem src/main.rs một lần nữa, chúng ta sẽ thấy rằng cargo fix đã thay đổi code:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 42;
    println!("{x}");
}</code></pre>
</div>

<p>Biến x bây giờ là immutable, và warning không còn xuất hiện nữa.</p>

<p>Bạn cũng có thể sử dụng command cargo fix để transition code của bạn giữa các Rust editions khác nhau. Editions được covered trong Appendix E.</p>

<h3 class="task-heading">Nhiều Lints hơn với Clippy</h3>
<p>Công cụ Clippy là một collection của lints để phân tích code của bạn để bạn có thể bắt common mistakes và improve Rust code của bạn. Clippy được bao gồm với standard Rust installations.</p>

<p>Để chạy Clippy's lints trên bất kỳ Cargo project nào, nhập sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo clippy</code></pre>
</div>

<p>Ví dụ, giả sử bạn viết một program sử dụng một xấp xỉ của một mathematical constant, như pi, như program này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 3.1415;
    let r = 8.0;
    println!("the area of the circle is {}", x * r * r);
}</code></pre>
</div>

<p>Chạy cargo clippy trên project này kết quả trong lỗi này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>error: approximate value of \`f{32, 64}::consts::PI\` found
 --> src/main.rs:2:13
  |
2 |     let x = 3.1415;
  |             ^^^^^^
  |
  = note: \`#[deny(clippy::approx_constant)]\` on by default
  = help: consider using the constant directly
  = help: for further information visit https://rust-lang.github.io/rust-clippy/master/index.html#approx_constant</code></pre>
</div>

<p>Lỗi này cho bạn biết rằng Rust đã có một PI constant chính xác hơn được định nghĩa, và program của bạn sẽ chính xác hơn nếu bạn sử dụng constant đó. Sau đó bạn sẽ thay đổi code của bạn để sử dụng PI constant.</p>

<p>Code sau không kết quả trong bất kỳ errors hoặc warnings nào từ Clippy:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = std::f64::consts::PI;
    let r = 8.0;
    println!("the area of the circle is {}", x * r * r);
}</code></pre>
</div>

<p>Để biết thêm thông tin về Clippy, xem tài liệu của nó.</p>

<h3 class="task-heading">IDE Integration sử dụng rust-analyzer</h3>
<p>Để giúp với IDE integration, Rust community khuyên sử dụng rust-analyzer. Công cụ này là một set của compiler-centric utilities nói Language Server Protocol, là một specification cho IDEs và programming languages để communicate với nhau. Các clients khác nhau có thể sử dụng rust-analyzer, như Rust analyzer plug-in cho Visual Studio Code.</p>

<p>Visit rust-analyzer project's home page để biết hướng dẫn cài đặt, sau đó cài đặt language server support trong IDE cụ thể của bạn. IDE của bạn sẽ có các capabilities như autocompletion, jump to definition, và inline errors.</p>
`,
            defaultCode: `// Useful Development Tools Examples

// Ví dụ về code có thể được rustfmt format
// và clippy kiểm tra

fn main() {
    // Ví dụ 1: Biến không cần mutable (sẽ có warning)
    let mut x = 42;
    println!("Giá trị: {}", x);

    // Ví dụ 2: Sử dụng PI xấp xỉ (clippy sẽ gợi ý)
    let pi = 3.1415;
    let r = 5.0;
    let area = pi * r * r;
    println!("Diện tích hình tròn: {}", area);

    // Ví dụ 3: Sử dụng std constant thay vì hardcode
    let pi_correct = std::f64::consts::PI;
    let area_correct = pi_correct * r * r;
    println!("Diện tích chính xác: {}", area_correct);
}
`,
            expectedOutput: `Giá trị: 42
Diện tích hình tròn: 78.53975
Diện tích chính xác: 78.53981633974483`
        };
