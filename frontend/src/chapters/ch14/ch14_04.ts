import { Lesson } from '../../courses';

export const ch14_04: Lesson = {
            id: 'ch14-04',
            title: '14.4 Cài đặt Binaries với cargo install',
            duration: '15 phút',
            type: 'theory',
            content: `
<p>Lệnh cargo install cho phép bạn cài đặt và sử dụng binary crates locally. Điều này không nhằm thay thế các system packages; nó được dự định như một cách tiện lợi cho các Rust developers để cài đặt các tools mà người khác đã chia sẻ trên crates.io. Lưu ý rằng bạn chỉ có thể cài đặt các packages có binary targets. Một binary target là chương trình runnable được tạo nếu crate có file src/main.rs hoặc một file khác được chỉ định làm binary, trái ngược với một library target không thể runnable một mình nhưng phù hợp để include trong các chương trình khác. Thông thường, crates có thông tin trong file README về việc crate là một library, có binary target, hoặc cả hai.</p>

<p>Tất cả các binaries được cài đặt với cargo install được lưu trữ trong thư mục bin của thư mục cài đặt root. Nếu bạn cài đặt Rust bằng rustup.rs và không có bất kỳ cấu hình tùy chỉnh nào, thư mục này sẽ là $HOME/.cargo/bin. Đảm bảo rằng thư mục này nằm trong $PATH của bạn để có thể chạy các chương trình bạn đã cài đặt với cargo install.</p>

<p>Ví dụ, trong Chương 12 chúng ta đã đề cập rằng có một implementation Rust của công cụ grep gọi là ripgrep để tìm kiếm files. Để cài đặt ripgrep, chúng ta có thể chạy như sau:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo install ripgrep
    Updating crates.io index
  Downloaded ripgrep v14.1.1
  Downloaded 1 crate (213.6 KB) in 0.40s
  Installing ripgrep v14.1.1
--snip--
   Compiling grep v0.3.2
    Finished \`release\` profile [optimized + debuginfo] target(s) in 6.73s
  Installing ~/.cargo/bin/rg
   Installed package \`ripgrep v14.1.1\` (executable \`rg\`)</code></pre>
</div>

<p>Dòng thứ hai từ cuối của output cho thấy vị trí và tên của binary đã cài đặt, trong trường hợp của ripgrep là rg. Miễn là thư mục cài đặt nằm trong $PATH của bạn, như đã đề cập trước đó, bạn có thể chạy rg --help và bắt đầu sử dụng một công cụ nhanh hơn, mang phong cách Rust hơn để tìm kiếm files!</p>

<div class="cyber-alert info">
  <strong>Tóm tắt cargo install:</strong>
  <ul>
    <li><strong>cargo install</strong> - Cài đặt binary crates locally</li>
    <li><strong>Binary target</strong> - Chương trình runnable (src/main.rs)</li>
    <li><strong>$HOME/.cargo/bin</strong> - Thư mục cài đặt mặc định</li>
    <li><strong>$PATH</strong> - Thêm thư mục bin để chạy commands</li>
  </ul>
</div>
`,
            defaultCode: `// Lệnh cargo install được sử dụng trong terminal
// Không thể chạy trong Rust code thông thường

fn main() {
    println!("Các lệnh cargo install phổ biến:");
    println!("");
    println!("# Cài đặt ripgrep (công cụ tìm kiếm)");
    println!("cargo install ripgrep");
    println!("");
    println!("# Cài đặt một phiên bản cụ thể");
    println!("cargo install ripgrep --version 14.0.0");
    println!("");
    println!("# Liệt kê các packages đã cài đặt");
    println!("cargo install --list");
}
`,
            expectedOutput: 'Các lệnh cargo install phổ biến:\n\n# Cài đặt ripgrep (công cụ tìm kiếm)\ncargo install ripgrep\n\n# Cài đặt một phiên bản cụ thể\ncargo install ripgrep --version 14.0.0\n\n# Liệt kê các packages đã cài đặt\ncargo install --list'
        };
