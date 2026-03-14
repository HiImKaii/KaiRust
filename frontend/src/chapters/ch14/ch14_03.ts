import { Lesson } from '../../courses';

export const ch14_03: Lesson = {
            id: 'ch14-03',
            title: '14.3 Cargo Workspaces',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Trong Chương 12, chúng ta đã xây dựng một package bao gồm một binary crate và một library crate. Khi project phát triển, bạn có thể thấy rằng library crate tiếp tục lớn hơn và bạn muốn chia package thành nhiều library crates hơn. Cargo cung cấp một tính năng gọi là workspaces có thể giúp quản lý nhiều packages liên quan được phát triển đồng thời.</p>

<h3 class="task-heading">Tạo một Workspace</h3>
<p>Một workspace là một tập hợp các packages chia sẻ cùng một Cargo.lock và thư mục output. Hãy tạo một project sử dụng workspace - chúng ta sẽ sử dụng code đơn giản để có thể tập trung vào cấu trúc của workspace. Có nhiều cách để cấu trúc một workspace, vì vậy chúng ta sẽ chỉ hiển thị một cách phổ biến. Chúng ta sẽ có một workspace chứa một binary và hai libraries. Binary, sẽ cung cấp chức năng chính, sẽ phụ thuộc vào hai libraries. Một library sẽ cung cấp hàm add_one và library kia hàm add_two. Ba crates này sẽ là một phần của cùng một workspace.</p>

<p>Đầu tiên, hãy tạo một thư mục mới cho workspace:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ mkdir add
$ cd add</code></pre>
</div>

<p>Tiếp theo, trong thư mục add, chúng ta tạo file Cargo.toml để cấu hình toàn bộ workspace. File này sẽ không có phần [package]. Thay vào đó, nó sẽ bắt đầu với phần [workspace] cho phép chúng ta thêm members vào workspace. Chúng ta cũng nhớ sử dụng phiên bản mới nhất của thuật toán resolver của Cargo trong workspace bằng cách đặt giá trị resolver thành "3":</p>

<p>Filename: Cargo.toml</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[workspace]
resolver = "3"</code></pre>
</div>

<p>Tiếp theo, chúng ta sẽ tạo binary crate adder bằng cách chạy cargo new trong thư mục add:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new adder
     Created binary (application) \`adder\` package
      Adding \`adder\` as member of workspace at \`file:///projects/add\`</code></pre>
</div>

<p>Chạy cargo new bên trong một workspace cũng tự động thêm package mới tạo vào key members trong định nghĩa [workspace] trong Cargo.toml của workspace:</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[workspace]
resolver = "3"
members = ["adder"]</code></pre>
</div>

<p>Tại thời điểm này, chúng ta có thể build workspace bằng cách chạy cargo build. Các file trong thư mục add của bạn sẽ trông như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>├── Cargo.lock
├── Cargo.toml
├── adder
│   ├── Cargo.toml
│   └── src
│       └── main.rs
└── target</code></pre>
</div>

<p>Workspace có một thư mục target ở cấp cao nhất mà các artifact đã biên dịch sẽ được đặt vào; package adder không có thư mục target riêng. Ngay cả khi chúng ta chạy cargo build từ bên trong thư mục adder, các artifact đã biên dịch vẫn sẽ kết thúc trong add/target thay vì add/adder/target. Cargo cấu trúc thư mục target trong workspace theo cách này bởi vì các crates trong workspace được cho là phụ thuộc lẫn nhau. Nếu mỗi crate có thư mục target riêng, mỗi crate sẽ phải biên dịch lại mỗi crate khác trong workspace để đặt artifact vào thư mục target của riêng nó. Bằng cách chia sẻ một thư mục target, các crates có thể tránh rebuild không cần thiết.</p>

<h3 class="task-heading">Tạo Package Thứ hai trong Workspace</h3>
<p>Tiếp theo, hãy tạo một package member khác trong workspace và gọi nó là add_one. Tạo một library crate mới tên là add_one:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new add_one --lib
     Created library \`add_one\` package
      Adding \`add_one\` as member of workspace at \`file:///projects/add\`</code></pre>
</div>

<p>File Cargo.toml cấp cao nhất bây giờ sẽ bao gồm đường dẫn add_one trong danh sách members:</p>

<p>Filename: Cargo.toml</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[workspace]
resolver = "3"
members = ["adder", "add_one"]</code></pre>
</div>

<p>Trong file add_one/src/lib.rs, hãy thêm một hàm add_one:</p>

<p>Filename: add_one/src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn add_one(x: i32) -> i32 {
    x + 1
}</code></pre>
</div>

<p>Bây giờ chúng ta có thể có package adder với binary của chúng ta phụ thuộc vào package add_one với library của chúng ta. Đầu tiên, chúng ta cần thêm một path dependency vào add_one trong adder/Cargo.toml.</p>

<p>Filename: adder/Cargo.toml</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[dependencies]
add_one = { path = "../add_one" }</code></pre>
</div>

<p>Cargo không giả định rằng các crates trong workspace sẽ phụ thuộc lẫn nhau, vì vậy chúng ta cần rõ ràng về mối quan hệ phụ thuộc.</p>

<p>Tiếp theo, hãy sử dụng hàm add_one (từ crate add_one) trong crate adder. Mở file adder/src/main.rs và thay đổi hàm main để gọi hàm add_one:</p>

<p>Filename: adder/src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let num = 10;
    println!("Hello, world! {num} plus one is {}!", add_one::add_one(num));
}</code></pre>
</div>

<p>Hãy build workspace bằng cách chạy cargo build trong thư mục add cấp cao nhất!</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
   Compiling add_one v0.1.0 (file:///projects/add/add_one)
   Compiling adder v0.1.0 (file:///projects/add/adder)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.22s</code></pre>
</div>

<p>Để chạy binary crate từ thư mục add, chúng ta có thể chỉ định package nào trong workspace chúng ta muốn chạy bằng cách sử dụng argument -p và tên package với cargo run:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run -p adder
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.00s
     Running \`target/debug/adder\`
Hello, world! 10 plus one is 11!</code></pre>
</div>

<p>Điều này chạy code trong adder/src/main.rs, phụ thuộc vào crate add_one.</p>

<h3 class="task-heading">Phụ thuộc vào Package Bên ngoài</h3>
<p>Lưu ý rằng workspace chỉ có một file Cargo.lock ở cấp cao nhất, thay vì có một Cargo.lock trong mỗi thư mục crate. Điều này đảm bảo tất cả các crates đang sử dụng cùng một phiên bản của tất cả các dependencies. Nếu chúng ta thêm package rand vào các file adder/Cargo.toml và add_one/Cargo.toml, Cargo sẽ resolve cả hai thành một phiên bản của rand và ghi lại trong một Cargo.lock. Việc làm cho tất cả các crates trong workspace sử dụng các dependencies giống nhau có nghĩa là các crates sẽ luôn tương thích với nhau.</p>

<p>Hãy thêm crate rand vào phần [dependencies] trong file add_one/Cargo.toml để chúng ta có thể sử dụng crate rand trong crate add_one:</p>

<p>Filename: add_one/Cargo.toml</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[dependencies]
rand = "0.8.5"</code></pre>
</div>

<p>Bây giờ chúng ta có thể thêm use rand; vào file add_one/src/lib.rs, và việc build toàn bộ workspace bằng cách chạy cargo build trong thư mục add sẽ tải về và biên dịch crate rand.</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
    Updating crates.io index
  Downloaded rand v0.8.5
   --snip--
   Compiling rand v0.8.5
   Compiling add_one v0.1.0 (file:///projects/add/add_one)
warning: unused import: \`rand\`
 --> add_one/src/lib.rs:1:5
  |
1 | use rand;
  |     ^^^^
  |
  = note: \`#[warn(unused_imports)]\` on by default

warning: \`add_one\` (lib) generated 1 warning
   Compiling adder v0.1.0 (file:///projects/add/adder)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.95s</code></pre>
</div>

<p>File Cargo.lock cấp cao nhất bây giờ chứa thông tin về dependency của add_one vào rand. Tuy nhiên, mặc dù rand được sử dụng ở đâu đó trong workspace, chúng ta không thể sử dụng nó trong các crates khác trong workspace trừ khi chúng ta thêm rand vào file Cargo.toml của chúng.</p>

<h3 class="task-heading">Thêm Test vào Workspace</h3>
<p>Để tăng cường thêm, hãy thêm một test cho hàm add_one::add_one trong crate add_one:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn add_one(x: i32) -> i32 {
    x + 1
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(3, add_one(2));
    }
}</code></pre>
</div>

<p>Bây giờ chạy cargo test trong thư mục add cấp cao nhất. Chạy cargo test trong một workspace được cấu trúc như thế này sẽ chạy tests cho tất cả các crates trong workspace:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling add_one v0.1.0 (file:///projects/add/add_one)
   Compiling adder v0.1.0 (file:///projects/add/adder)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.20s
     Running unittests src/lib.rs (target/debug/deps/add_one-93c49ee75dc46543)

running 1 test
test tests::it_works ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running unittests src/main.rs (target/debug/deps/adder-3a47283c568d2b6a)

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests add_one

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Chúng ta cũng có thể chạy tests cho một crate cụ thể trong workspace từ thư mục cấp cao nhất bằng cách sử dụng flag -p và chỉ định tên của crate chúng ta muốn test:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test -p add_one
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.00s
     Running unittests src/lib.rs (target/debug/deps/add_one-93c49ee75dc46543)

running 1 test
test tests::it_works ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests add_one

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Nếu bạn publish các crates trong workspace lên crates.io, mỗi crate trong workspace sẽ cần được publish riêng.</p>

<p>Khi project của bạn phát triển, hãy cân nhắc sử dụng workspace: Nó cho phép bạn làm việc với các thành phần nhỏ hơn, dễ hiểu hơn là một khối code lớn! Hơn nữa, việc giữ các crates trong workspace có thể làm việc điều phối giữa các crates dễ dàng hơn nếu chúng thường xuyên được thay đổi cùng lúc.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Cargo Workspaces:</strong>
  <ul>
    <li><strong>[workspace]</strong> - Định nghĩa workspace trong Cargo.toml</li>
    <li><strong>members</strong> - Danh sách các crates trong workspace</li>
    <li><strong>Cargo.lock</strong> - Một file duy nhất cho toàn bộ workspace</li>
    <li><strong>target/</strong> - Thư mục output dùng chung</li>
    <li><strong>path dependency</strong> - Tham chiếu crate trong workspace</li>
    <li><strong>cargo build</strong> - Build tất cả crates</li>
    <li><strong>cargo run -p name</strong> - Chạy package cụ thể</li>
    <li><strong>cargo test -p name</strong> - Test package cụ thể</li>
  </ul>
</div>
`,
            defaultCode: `// Không thể tạo workspace thực trong một file Rust đơn lẻ
// Đây là mô phỏng cấu trúc workspace

mod adder {
    pub fn main() {
        let num = 10;
        let result = super::add_one::add_one(num);
        println!("Hello, world! {num} plus one is {}!", result);
    }
}

mod add_one {
    pub fn add_one(x: i32) -> i32 {
        x + 1
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[test]
        fn it_works() {
            assert_eq!(3, add_one(2));
        }
    }
}

fn main() {
    adder::main();
}
`,
            expectedOutput: 'Hello, world! 10 plus one is 11!'
        };
