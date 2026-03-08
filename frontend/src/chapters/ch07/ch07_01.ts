import { Lesson } from '../../courses';

export const ch07_01: Lesson = {
      id: 'ch07-01',
      title: '7.1 Packages và Crates trong Rust',
      duration: '35 phút',
      type: 'theory',
      content: `
<p>Khi dự án ngày càng lớn, việc tổ chức code trở nên quan trọng. Bằng cách nhóm code có chức năng liên quan và tách biệt khỏi các logic khác, bạn sẽ dễ dàng quản lý và hiểu code hơn.</p>

<p>Hệ thống module của Rust bao gồm các thành phần:</p>

<ul class="task-list">
  <li><strong>Packages:</strong> Công cụ của Cargo để build, test và chia sẻ crates</li>
  <li><strong>Crates:</strong> Tập hợp các modules tạo ra thư viện hoặc file thực thi</li>
  <li><strong>Modules</strong> và <strong>use:</strong> Tổ chức code và kiểm soát visibility</li>
  <li><strong>Paths:</strong> Cách tham chiếu đến các items (struct, function, module)</li>
</ul>

<h3 class="task-heading">Crates</h3>
<p>Một <strong>crate</strong> là đơn vị biên dịch nhỏ nhất mà Rust compiler có thể xử lý. Một crate có thể chứa nhiều modules.</p>

<p>Có 2 loại crate:</p>
<ul>
  <li><strong>Binary crate:</strong> Có hàm main, tạo ra file thực thi</li>
  <li><strong>Library crate:</strong> Không có main, chỉ chứa code thư viện để tái sử dụng</li>
</ul>

<h3 class="task-heading">Packages</h3>
<p>Một <strong>package</strong> là tập hợp của một hoặc nhiều crates, cùng cung cấp một chức năng. Package được định nghĩa trong file <code>Cargo.toml</code>.</p>

<ul class="task-list">
  <li>Một package có <strong>tối đa 1</strong> library crate</li>
  <li>Một package có thể có <strong>nhiều</strong> binary crates</li>
  <li>Phải có ít nhất 1 crate (binary hoặc library)</li>
</ul>

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

<p><code>Cargo</code> tuân theo quy ước:</p>
<ul>
  <li><code>src/main.rs</code> → Binary crate root</li>
  <li><code>src/lib.rs</code> → Library crate root</li>
</ul>

<h3 class="task-heading">Cấu trúc thư mục của Package</h3>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>my-project/
├── Cargo.toml
├── src/
│   ├── main.rs     (binary crate root)
│   └── lib.rs      (library crate root)
├── examples/       (binary crates ví dụ)
├── tests/          (integration tests)
└── benches/        (benchmark tests)</code></pre>
</div>

<h3 class="task-heading">Sự khác biệt giữa Package, Crate và Module</h3>
<p>Hãy phân biệt rõ ràng:</p>
<ul>
  <li><strong>Crate:</strong> Là một thư viện hoặc file nhị phân được biên dịch</li>
  <li><strong>Package:</strong> Là một dự án có Cargo.toml, chứa một hoặc nhiều crates</li>
  <li><strong>Module:</strong> Là cách tổ chức code bên trong một crate</li>
</ul>
`,
      defaultCode: `// Cấu trúc một Cargo package điển hình:
//
// my-project/
// ├── Cargo.toml
// ├── src/
// │   ├── main.rs     (binary crate root)
// │   └── lib.rs      (library crate root)
// └── tests/

fn main() {
    println!("Crate và Package trong Rust");
    println!("- Binary crate: src/main.rs");
    println!("- Library crate: src/lib.rs");
    println!("- Package = Cargo.toml + crate(s)");
}
`,
      expectedOutput: 'Crate và Package trong Rust\n- Binary crate: src/main.rs\n- Library crate: src/lib.rs\n- Package = Cargo.toml + crate(s)'
};
