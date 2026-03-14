import { Lesson } from '../../courses';

export const ch14_01: Lesson = {
            id: 'ch14-01',
            title: '14.1 Tùy chỉnh Build với Release Profiles',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Trong Rust, release profiles là các profiles được định nghĩa trước, có thể tùy chỉnh với các cấu hình khác nhau cho phép lập trình viên có nhiều quyền kiểm soát hơn đối với các tùy chọn khác nhau để biên dịch code. Mỗi profile được cấu hình độc lập với các profile khác.</p>

<p>Cargo có hai profile chính: profile dev mà Cargo sử dụng khi bạn chạy cargo build, và profile release mà Cargo sử dụng khi bạn chạy cargo build --release. Profile dev được định nghĩa với các defaults tốt cho development, và profile release có defaults tốt cho release builds.</p>

<p>Các tên profile này có thể quen thuộc từ output của các builds của bạn:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.00s
$ cargo build --release
    Finished \`release\` profile [optimized] target(s) in 0.32s</code></pre>
</div>

<p>dev và release là các profile khác nhau được sử dụng bởi compiler.</p>

<p>Cargo có các cài đặt mặc định cho mỗi profile áp dụng khi bạn chưa thêm bất kỳ phần [profile.*] nào trong file Cargo.toml của project. Bằng cách thêm các phần [profile.*] cho bất kỳ profile nào bạn muốn tùy chỉnh, bạn có thể override bất kỳ tập con nào của các cài đặt mặc định. Ví dụ, đây là các giá trị mặc định cho cài đặt opt-level cho các profile dev và release:</p>

<p>Filename: Cargo.toml</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[profile.dev]
opt-level = 0

[profile.release]
opt-level = 3</code></pre>
</div>

<p>Cài đặt opt-level kiểm soát số lượng tối ưu hóa mà Rust sẽ áp dụng cho code của bạn, với phạm vi từ 0 đến 3. Áp dụng nhiều tối ưu hóa hơn kéo dài thời gian biên dịch, vì vậy nếu bạn đang trong quá trình phát triển và thường xuyên biên dịch code, bạn sẽ muốn ít tối ưu hóa hơn để biên dịch nhanh hơn ngay cả khi code kết quả chạy chậm hơn. Do đó, opt-level mặc định cho dev là 0. Khi bạn đã sẵn sàng để release code, tốt nhất là dành nhiều thời gian hơn để biên dịch. Bạn sẽ chỉ biên dịch trong release mode một lần, nhưng bạn sẽ chạy chương trình đã biên dịch nhiều lần, vì vậy release mode đánh đổi thời gian biên dịch lâu hơn để code chạy nhanh hơn. Đó là lý do tại sao opt-level mặc định cho profile release là 3.</p>

<p>Bạn có thể override một cài đặt mặc định bằng cách thêm một giá trị khác cho nó trong Cargo.toml. Ví dụ, nếu chúng ta muốn sử dụng mức tối ưu hóa 1 trong development profile, chúng ta có thể thêm hai dòng này vào file Cargo.toml của project:</p>

<p>Filename: Cargo.toml</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[profile.dev]
opt-level = 1</code></pre>
</div>

<p>Code này override cài đặt mặc định là 0. Bây giờ khi chúng ta chạy cargo build, Cargo sẽ sử dụng các defaults cho profile dev cộng với tùy chỉnh của chúng ta cho opt-level. Vì chúng ta đặt opt-level là 1, Cargo sẽ áp dụng nhiều tối ưu hóa hơn default, nhưng không nhiều như trong release build.</p>

<p>Để có danh sách đầy đủ các tùy chọn cấu hình và defaults cho mỗi profile, hãy xem tài liệu của Cargo.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Release Profiles:</strong>
  <ul>
    <li><strong>dev profile</strong> - cho development, opt-level = 0</li>
    <li><strong>release profile</strong> - cho production, opt-level = 3</li>
    <li><strong>opt-level</strong> - 0 đến 3, càng cao càng tối ưu nhưng compile chậm hơn</li>
    <li><strong>Tùy chỉnh</strong> - thêm [profile.*] trong Cargo.toml</li>
  </ul>
</div>
`,
            defaultCode: `// Không thể chạy Cargo config trong Rust code thông thường
// Đây là ví dụ về cấu hình Cargo.toml

/*
[package]
name = "my_project"
version = "0.1.0"

[profile.dev]
opt-level = 0      # Không tối ưu, compile nhanh
debug = true       # Bao gồm debug symbols

[profile.release]
opt-level = 3     # Tối ưu tối đa
lto = true        # Link Time Optimization
codegen-units = 1 # Giảm song song để tối ưu hơn

[dependencies]
rand = "0.8"
*/

fn main() {
    println!("Hãy xem file Cargo.toml để xem cấu hình release profiles!");
}
`,
            expectedOutput: 'Hãy xem file Cargo.toml để xem cấu hình release profiles!'
        };
