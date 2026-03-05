import { Lesson } from '../../courses';

export const ch07_01: Lesson = {
      id: 'ch07-01',
      title: '7.1 Packages và Crates trong Rust',
      duration: '35 phút',
      type: 'theory',
      content: `
<p>Khi bạn bắt đầu viết một chương trình càng lúc càng phình to, thì việc tổ chức và sắp xếp mã nguồn code của mình trở nên mang tính sống còn. Bằng cách gộp nhóm mã nguồn có cùng một tính năng liên quan và gom chia nó ra khỏi các chức năng mang logic khác, bạn sẽ dễ dàng quản lý để biết đoạn code nào đang làm trò gì trên hệ thống.</p>

<p>Hệ thống module đóng gói độc đáo của Rust thường được gọi là <strong>module system</strong>, dùng để xác định phần tử nào được phép lộ diện với bên ngoài public và cái nào thuộc bí mật private ở tuốt bên trong. Nó bao gồm nhiều tính năng:</p>

<ul class="task-list">
  <li><strong>Packages:</strong> Một công cụ tiện v ích của Cargo cho phép mình Build, Test và Chia sẻ các crates.</li>
  <li><strong>Crates:</strong> Một nhánh cây (tree) lồng nhau của tập hợp hàng ngàn modules mà cho ra lò được một file thư viện library hoặc file thực thi executable binary.</li>
  <li><strong>Modules</strong> và <strong>use:</strong> Bộ đôi cho phép quản lý chi tiết tổ chức phạm vi scope, cũng như thiết lập tính bảo vệ (privacy) cho các paths.</li>
  <li><strong>Paths:</strong> Một phương thức tìm định đường dẫn đến phần tử như struct, function, hoặc module.</li>
</ul>

<h3 class="task-heading">Crates</h3>
<p>Một <strong>crate</strong> là đơn vị biên dịch (compilation unit) nhỏ nhất là Rust compiler có thể làm việc vào một lúc. Kể cả khi chúng ta xài file <code>rustc</code> chứ không phải cài lệnh <code>cargo</code> thì compiler nó cũng coi chiếc file đó bỗng dưng trở thành một cái Crate lớn nhất. Crate có thể nạm thêm vô kể module vào chung mình nó.</p>

<p>Một crate có 2 thể thức (dạng loại): <strong>binary crate</strong> (thứ để build ra file chạy exe do có hàm main) và <strong>library crates</strong> (không có hàm main, chỉ để chứa code thư viện hỗ trợ tái sử dụng cho Project người khác nhúng vô).</p>

<h3 class="task-heading">Packages</h3>
<p>Một <strong>package</strong> (Gói / Kiện hàng) bản chất sẽ có cấu trúc là một đống lộn xộn từ 1 hay nhiều crate cộng lại mà cung cấp chung một bộ source làm ra cái app nào đó. Package chứa cực kì ngặt nghèo luật lệ nằm trong file <code>Cargo.toml</code> nhằm miêu tả cách các crates cấu thành.</p>
<ul class="task-list">
  <li>Một package có <strong>tối đa 1</strong> thư viện (library crate).</li>
  <li>Một package có thể cho chứa bao nhiêu <strong>chương trình binary (binary crates)</strong> tùy thích.</li>
  <li>Nhưng tối thiểu ít nhất một crate bất kì phải tồn tại trong Package (binary hay library cũng được).</li>
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

<p>Bạn thấy gì kì lạ không? <strong>Trong thư mục không hề đề cập đến <code>main.rs</code> trong <code>Cargo.toml</code></strong> Nhưng mà <code>Cargo</code> nó lại tuân theo một quy tắc hệ thống chung ngầm định của Rust (convention) đó là nếu có file <code>src/main.rs</code> nằm đâu đó chung mâm với gói <code>Cargo.toml</code> thì suy luận ngầm ra ở đấy đang cấu trúc theo dạng ra mắt "Binary crate". Tương tự nếu Package có file <code>src/lib.rs</code> thì nó suy luận crate này đang chứa Library Crate cùng tên. Sau đó ông nội Cargo sẽ hốt đóng này quăng thẳng vô <code>rustc</code> để xây dựng file binary hay library.</p>
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
