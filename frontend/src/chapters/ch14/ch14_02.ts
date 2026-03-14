import { Lesson } from '../../courses';

export const ch14_02: Lesson = {
            id: 'ch14-02',
            title: '14.2 Đăng Package lên Crates.io',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Chúng ta đã sử dụng các packages từ crates.io như dependencies của project, nhưng bạn cũng có thể chia sẻ code của mình với người khác bằng cách publish packages của riêng bạn. Crate registry tại crates.io phân phối source code của các packages của bạn, vì vậy nó primarily host code là open source.</p>

<p>Rust và Cargo có các tính năng giúp package bạn publish dễ tìm hơn cho mọi người. Chúng ta sẽ nói về một số tính năng này tiếp theo và sau đó giải thích cách publish một package.</p>

<h3 class="task-heading">Viết Documentation Comments Hữu ích</h3>
<p>Việc document chính xác các packages của bạn sẽ giúp người dùng khác biết cách và khi nào sử dụng chúng, vì vậy đáng để đầu tư thời gian để viết documentation. Trong Chương 3, chúng ta đã thảo luận về cách comment Rust code sử dụng hai dấu gạch chéo, //. Rust cũng có một loại comment đặc biệt cho documentation, được gọi là documentation comment, sẽ generate HTML documentation. HTML hiển thị nội dung của documentation comments cho các public API items được intended cho các lập trình viên muốn biết cách sử dụng crate của bạn thay vì crate của bạn được implement như thế nào.</p>

<p>Documentation comments sử dụng ba dấu gạch chéo, ///, thay vì hai và hỗ trợ Markdown notation để format text. Đặt documentation comments ngay trước item mà chúng đang document. Listing 14-1 cho thấy documentation comments cho một hàm add_one trong một crate tên là my_crate.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>/// Adds one to the number given.
///
/// # Examples
///
/// \`\`\`
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
///
/// assert_eq!(6, answer);
/// \`\`\`
pub fn add_one(x: i32) -> i32 {
    x + 1
}</code></pre>
</div>
<p><em>Listing 14-1: A documentation comment for a function</em></p>

<p>Ở đây, chúng ta mô tả hàm add_one làm gì, bắt đầu một section với heading Examples, và sau đó cung cấp code demonstrating cách sử dụng hàm add_one. Chúng ta có thể generate HTML documentation từ documentation comment này bằng cách chạy cargo doc. Lệnh này chạy rustdoc tool được phân phối với Rust và đặt generated HTML documentation trong thư mục target/doc.</p>

<p>Để tiện lợi, chạy cargo doc --open sẽ build HTML cho documentation của crate hiện tại (cũng như documentation cho tất cả dependencies của crate) và mở kết quả trong web browser. Điều hướng đến hàm add_one và bạn sẽ thấy text trong documentation comments được render như thế nào.</p>

<h3 class="task-heading">Các Sections Thường được Sử dụng</h3>
<p>Chúng ta đã sử dụng # Examples Markdown heading trong Listing 14-1 để create một section trong HTML với title "Examples". Dưới đây là một số sections khác mà crate authors thường sử dụng trong documentation của họ:</p>

<ul>
  <li><strong>Panics:</strong> Đây là các scenarios trong đó function được document có thể panic. Những người gọi function không muốn program của họ panic nên đảm bảo họ không gọi function trong những situations này.</li>
  <li><strong>Errors:</strong> Nếu function trả về Result, việc mô tả các loại errors có thể xảy ra và điều kiện nào có thể gây ra những errors đó được return có thể hữu ích cho những người gọi để họ có thể viết code xử lý các loại errors khác nhau theo cách khác nhau.</li>
  <li><strong>Safety:</strong> Nếu function unsafe để gọi (chúng ta thảo luận về unsafety trong Chương 20), nên có một section giải thích tại sao function unsafe và covering các invariants mà function expect người gọi phải uphold.</li>
</ul>

<p>Hầu hết documentation comments không cần tất cả các sections này, nhưng đây là một checklist tốt để nhắc bạn về các aspects của code mà người dùng sẽ quan tâm.</p>

<h3 class="task-heading">Documentation Comments as Tests</h3>
<p>Thêm code blocks trong documentation comments có thể help demonstrate cách sử dụng library và có một bonus adicional: Chạy cargo test sẽ run các code examples trong documentation như tests! Không có gì tốt hơn documentation với examples. Nhưng không có gì tệ hơn examples không hoạt động vì code đã thay đổi kể từ khi documentation được viết. Nếu chúng ta chạy cargo test với documentation cho hàm add_one từ Listing 14-1, chúng ta sẽ thấy một section trong test results trông như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>   Doc-tests my_crate

running 1 test
test src/lib.rs - add_one (line 5) ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.27s</code></pre>
</div>

<h3 class="task-heading">Contained Item Comments</h3>
<p>Style của doc comment //! thêm documentation vào item chứa comments thay vì vào items theo sau comments. Chúng ta thường sử dụng những doc comments này trong crate root file (src/lib.rs by convention) hoặc trong một module để document crate hoặc module như một whole.</p>

<p>Ví dụ, để thêm documentation mô tả mục đích của crate my_crate chứa hàm add_one, chúng ta thêm documentation comments bắt đầu với //! vào đầu file src/lib.rs, như trong Listing 14-2.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>//! # My Crate
//!
//! \`my_crate\` is a collection of utilities to make performing certain
//! calculations more convenient.

/// Adds one to the number given.
// --snip--</code></pre>
</div>
<p><em>Listing 14-2: The documentation for the my_crate crate as a whole</em></p>

<p>Chú ý rằng không có code nào sau dòng cuối cùng bắt đầu bằng //! . Vì chúng ta bắt đầu comments với //! thay vì ///, chúng ta đang documenting item chứa comment này thay vì một item theo sau comment này. Trong trường hợp này, item đó là file src/lib.rs, đó là crate root. Các comments này mô tả toàn bộ crate.</p>

<h3 class="task-heading">Exporting a Convenient Public API</h3>
<p>Cấu trúc của public API của bạn là một consideration quan trọng khi publishing một crate. Những người sử dụng crate của bạn ít quen thuộc với cấu trúc hơn bạn và có thể gặp khó khăn khi tìm các pieces họ muốn sử dụng nếu crate của bạn có một module hierarchy lớn.</p>

<p>Trong Chương 7, chúng ta đã cover cách làm cho items public sử dụng từ khóa pub, và cách đưa items vào một scope với từ khóa use. Tuy nhiên, cấu trúc có ý nghĩa với bạn trong khi đang phát triển một crate có thể không tiện lợi lắm cho người dùng của bạn. Bạn có thể muốn tổ chức các structs trong một hierarchy chứa nhiều levels, nhưng sau đó những người muốn sử dụng một type bạn đã define deep trong hierarchy có thể gặp khó khăn khi tìm ra type đó tồn tại. Họ cũng có thể bị annoy khi phải nhập use my_crate::some_module::another_module::UsefulType; thay vì use my_crate::UsefulType;.</p>

<p>Tin tốt là nếu cấu trúc không tiện lợi cho người khác sử dụng từ một library khác, bạn không phải sắp xếp lại tổ chức bên trong: Thay vào đó, bạn có thể re-export items để tạo một cấu trúc public khác với cấu trúc private của bạn bằng cách sử dụng pub use. Re-exporting lấy một public item ở một location và làm cho nó public ở một location khác, như thể nó được define ở location khác thay vì.</p>

<h3 class="task-heading">Thiết lập Tài khoản Crates.io</h3>
<p>Trước khi bạn có thể publish bất kỳ crates nào, bạn cần tạo một tài khoản trên crates.io và lấy một API token. Để làm điều đó, truy cập trang chủ tại crates.io và đăng nhập qua tài khoản GitHub. Sau khi đăng nhập, truy cập account settings tại https://crates.io/me/ và lấy API key của bạn. Sau đó, chạy lệnh cargo login và dán API key của bạn khi được nhắc:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo login
abcdefghijklmnopqrstuvwxyz012345</code></pre>
</div>

<p>Lệnh này sẽ inform Cargo về API token của bạn và lưu trữ nó locally trong ~/.cargo/credentials.toml. Lưu ý rằng token này là một secret: Không chia sẻ nó với bất kỳ ai khác.</p>

<h3 class="task-heading">Thêm Metadata vào Một Crate Mới</h3>
<p>Giả sử bạn có một crate bạn muốn publish. Trước khi publish, bạn cần thêm một số metadata trong phần [package] của file Cargo.toml của crate.</p>

<p>Crate của bạn sẽ cần một cái tên unique. Trong khi bạn đang làm việc trên một crate locally, bạn có thể đặt tên crate bất cứ điều gì bạn muốn. Tuy nhiên, crate names trên crates.io được allocated trên cơ sở first-come, first-served. Một khi một crate name đã được taken, không ai khác có thể publish một crate với tên đó.</p>

<p>Ngay cả khi bạn đã chọn một cái tên unique, khi bạn chạy cargo publish để publish crate tại thời điểm này, bạn sẽ get một warning và sau đó một error:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo publish
    Updating crates.io index
warning: manifest has no description, license, license-file, documentation, homepage or repository.
See https://doc.rust-lang.org/cargo/reference/manifest.html#package-metadata for more info.
--snip--
error: failed to publish to registry at https://crates.io

Caused by:
  the remote server responded with an error (status 400 Bad Request): missing or empty metadata fields: description, license.</code></pre>
</div>

<p>Điều này results trong một error vì bạn đang missing một số thông tin quan trọng: Một description và license là required để mọi người sẽ biết crate của bạn làm gì và under what terms họ có thể sử dụng nó.</p>

<p>Trong Cargo.toml, thêm một description chỉ là một câu hoặc hai, vì nó sẽ xuất hiện với crate của bạn trong search results. Cho trường license, bạn cần cung cấp một license identifier value. Linux Foundation's Software Package Data Exchange (SPDX) lists các identifiers bạn có thể sử dụng cho giá trị này.</p>

<h3 class="task-heading">Publishing lên Crates.io</h3>
<p>Bây giờ bạn đã tạo tài khoản, lưu API token, chọn tên cho crate của bạn, và specified required metadata, bạn đã sẵn sàng để publish! Publishing một crate uploads một version cụ thể lên crates.io để người khác sử dụng.</p>

<p>Hãy cẩn thận, vì một publish là permanent. Version không bao giờ có thể được overwrite, và code không thể bị xóa trừ trong một số circumstances nhất định.</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo publish
    Updating crates.io index
   Packaging guessing_game v0.1.0 (file:///projects/guessing_game)
   Packaged 6 files, 1.2KiB (895.0B compressed)
   Verifying guessing_game v0.1.0 (file:///projects/guessing_game)
   Compiling guessing_game v0.1.0
   Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.19s
   Uploading guessing_game v0.1.0 (file:///projects/guessing_game)
   Uploaded guessing_game v0.1.0 to registry \`crates-io\`
note: waiting for \`guessing_game v0.1.0\` to be available at registry
\`crates-io\`.
   Published guessing_game v0.1.0 at registry \`crates-io\`

Congratulations! You’ve now shared your code with the Rust community.</code></pre>
</div>

<h3 class="task-heading">Publishing một Phiên bản Mới của Một Crate Hiện có</h3>
<p>Khi bạn đã thay đổi crate của mình và sẵn sàng release một version mới, bạn thay đổi giá trị version specified trong Cargo.toml file và republish. Sử dụng Semantic Versioning rules để decide appropriate next version number, based on các loại changes bạn đã thực hiện.</p>

<h3 class="task-heading">Deprecating Versions từ Crates.io</h3>
<p>Mặc dù bạn không thể remove previous versions của một crate, bạn có thể prevent bất kỳ future projects nào từ việc thêm chúng như một dependency mới. Điều này hữu ích khi một crate version bị broken vì một lý do nào đó. Trong những situations như vậy, Cargo supports yanking một crate version.</p>

<p>Yanking một version prevents new projects từ việc depending on that version trong khi allowing tất cả existing projects that depend on it to continue. Về cơ bản, một yank có nghĩa là tất cả projects với Cargo.lock sẽ không break, và bất kỳ future Cargo.lock files generated sẽ không use yanked version.</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo yank --vers 1.0.1
    Updating crates.io index
        Yank guessing_game@1.0.1

$ cargo yank --vers 1.0.1 --undo
    Updating crates.io index
      Unyank guessing_game@1.0.1</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Tóm tắt Publishing:</strong>
  <ul>
    <li><strong>///</strong> - Documentation comment cho item</li>
    <li><strong>//!</strong> - Documentation comment cho crate/module chứa nó</li>
    <li><strong>cargo doc --open</strong> - Tạo và mở HTML documentation</li>
    <li><strong>cargo test</strong> - Chạy doc tests</li>
    <li><strong>pub use</strong> - Re-export items cho public API</li>
    <li><strong>cargo login</strong> - Đăng nhập crates.io</li>
    <li><strong>cargo publish</strong> - Publish lên crates.io</li>
    <li><strong>cargo yank</strong> - Yanking một version</li>
  </ul>
</div>
`,
            defaultCode: `/// Cộng một vào số được cho.
///
/// # Examples
///
/// \`\`\`
/// let result = add_one(5);
/// assert_eq!(result, 6);
/// \`\`\`
pub fn add_one(x: i32) -> i32 {
    x + 1
}

/// Nhân hai số.
///
/// # Examples
///
/// \`\`\`
/// let result = multiply(3, 4);
/// assert_eq!(result, 12);
/// \`\`\`
pub fn multiply(a: i32, b: i32) -> i32 {
    a * b
}

fn main() {
    println!("Add one to 5: {}", add_one(5));
    println!("Multiply 3 * 4: {}", multiply(3, 4));
}
`,
            expectedOutput: 'Add one to 5: 6\nMultiply 3 * 4: 12'
        };
