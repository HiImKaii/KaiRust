import { Chapter } from '../courses';

export const ch07: Chapter = {
  id: 'ch07',
  title: 'Chương 7: Quản lý Packages, Crates, Modules',
  lessons: [
    {
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
    },
    {
      id: 'ch07-02',
      title: '7.2 Định nghĩa Modules & Điều khiển Phạm vi (Scope/Privacy)',
      duration: '40 phút',
      type: 'practice',
      content: `
<p>Bây giờ chúng mình sẽ bàn bạc kĩ về <strong>Modules</strong> và các thành phần thuộc hệ thống modules khác — đáng phải kể đến nhất là các path mà bạn phải xài liên tục để reference tới các thẻ item; từ khóa <code>use</code> thần thánh giúp mình đem cả path vô scope rút gọn; và chốt hạ là bộ tứ keyword <code>pub</code> giúp đồ chơi của bạn trở thành dạng Lộ Thiên (public) được cho phép các bên ngoài dùng!!</p>
<p>Các Modules chắp cánh cho việc tổ chức source code trong từng khía cạnh của cái Crate thành các Group (khối nhóm) để quản lý readability (dễ đọc) và reuse (dễ xài lại). Không chỉ vậy Module con kiểm soát cái gọi la <strong>privacy</strong> của những dòng code đó. Tức là những logic mã nào thì người đời được đụng vô, còn cái nào là Private giấu kĩ vào trong (để dấu mấy chi tiết rườm rà ko bảo mật ko cho can thiệp linh tinh).</p>

<h3 class="task-heading">Khai báo Modules để sắp xếp sảnh hệ thống</h3>
<p>Ráng tượng tưởng chúng mình đang code lib phục vụ cái Nhà Hàng (restaurant). Nhà hàng có một sảnh đón khách lớn (front of house): host đón gác, xếp ghế, bồi bàn. Bếp đằng sau (back of house) thì nấu, sửa bill.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}
        fn serve_order() {}
        fn take_payment() {}
    }
}</code></pre>
</div>
<p>Tương tự như OOP, modules được định nghĩa vô cùng nhanh nhờ bằng chặng keyword <code>mod</code> theo sau bởi cái Tên của module!. Sau đó nhét thân hàm nằm gọn gàng bên trong hai cái Cặp ngoặc nhọn <code>{}</code> là hoàn tất cấu trúc lồng tree.</p>

<h3 class="task-heading">Hệ thống Paths cho Modules trong Tree Navigation</h3>
<p>Việc định vị đường đi tới các Functions trong ruột module thì Rust sử dụng một chuỗi khái niệm gọi là <strong>path</strong> y đúc lúc bạn lướt cây Folder trong máy móc tính. Hệ Cây Paths chia thành 2 phe:</p>
<ul class="task-list">
  <li><strong>Absolute path (Đường dẫn Tuyệt Đối):</strong> Bắt đầu một mạch từ tận <code>crate</code> root, khởi đầu bằng Keyword thần thánh tên <code>crate</code>.</li>
  <li><strong>Relative path (Đường dẫn Tương Đối):</strong> Xuất phát ngay lúc tại địa điểm module vắng mặt, xài thông qua <code>self</code>, <code>super</code> hoặc ngay tên thư viện của module ở bên.</li>
</ul>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}
pub fn eat_at_restaurant() {
    // Gọi theo Absolute path 
    crate::front_of_house::hosting::add_to_waitlist();
    // Gọi theo Relative path
    front_of_house::hosting::add_to_waitlist();
}</code></pre>
</div>

<h3 class="task-heading">Bật Công Tắc bằng pub keyword</h3>
<p>Code Rust làm cực kì Găt về Privacy: MỌI ITEM LÀ PRIVATE MỘT CÁCH MẶC ĐỊNH BẤT DI BẤT DỊCH (bao gồm function, method, struct, enum, module...). Tức là các items ở modules dạng Cấp Cha không thể nào thò tay mò đụng trọt các items bên rỗng Module con của nó (Trừ phi đồ dùng <code>pub</code>!!!).</p>

<div class="cyber-alert info">
  <strong>Mẹo hệ thống:</strong> Đừng hiểu nhầm nhầm! Module Cấp Con lại vương miện quyền năng NHÌN THẤY MỌI THỨ của Module cha (cho dù private). Do Rust nói rằng con cái thì nên biết mọi chi tiết dơ bẩn của cha chú mình mà giấu kín trước public xã hội.
</div>
  
<h3 class="task-heading">Bắt rớt xuống Module Cha bằng super</h3>
<p>Rust tạo ra Relative Path theo cách xài <code>super</code> để lấy từ cha trở đi. Điều này giống trò <code>..</code> syntax lúc bạn lướt Path hệ điều hành filesystem để đi ra sau 1 cấp.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order(); // Lấy hàm deliver_order ở cha Crate!!!
    }
    fn cook_order() {}
}</code></pre>
</div>
`,
      defaultCode: `mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }

    pub fn multiply(a: i32, b: i32) -> i32 {
        a * b
    }

    pub mod advanced {
        pub fn power(base: i32, exp: u32) -> i32 {
            let mut result = 1;
            for _ in 0..exp {
                result = super::multiply(result, base);
            }
            result
        }
    }
}

fn main() {
    let sum = math::add(5, 3);
    let product = math::multiply(4, 7);
    let pow = math::advanced::power(2, 10);

    println!("5 + 3 = {sum}");
    println!("4 × 7 = {product}");
    println!("2^10 = {pow}");
}
`,
      expectedOutput: '5 + 3 = 8\n4 × 7 = 28\n2^10 = 1024'
    },
    {
      id: 'ch07-03',
      title: '7.3 Rút gọn Paths lại với use và As (Cộng Modules đa file)',
      duration: '35 phút',
      type: 'theory',
      content: `
<p>Phải xài cái path liên tục rồi gọi các hàm đít một cách đầy đủ khiến code như một thảm hoạ nhức nhói (ví dụ khi phải gọi <code>crate::front_of_house::hosting::add_to_waitlist()</code> hoài mỏi tay dã man). Rất là may, ta có quyền rút ngắn tất mọi thứ trong Scope với keyword mang cái tên cúng cơm là <strong><code>use</code></strong>!</p>

<h3 class="task-heading">Đem Paths thẳng vô Scope bằng Use</h3>
<p>Đem Path vô vơi Use giống hệt tạo một chiếc Symlink (Link liên kêt giả) trong filesystem máy móc thoy:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

// Bắt gọn cái use vô nà:
use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist(); // Xài Hosting cọc lóc cực ngắn ngon ghẻ ngay!
}</code></pre>
</div>
<p>Bạn cũng lưu ý một tí tị điều chuẩn bị rât là Idiomatic (thói xài chuẩn xịn của dân Rust) khi xài <code>use</code>: Người ta ráng ko đem cụt củn luôn cái tên hàm vào <code>use carte::...::add_to_waitlist</code> thay vì thế họ mang vào chung cha nó <code>...::hosting</code>. Mặc dù cả hai đều hợp pháp nhưng đem theo hàm như thế lúc xài function local người ngoài chả hiểu cái hàm đó là Built-in hay được lôi bên module khác vô, gọi nguyên cụm cha <code>hosting::</code> khiến logic xài vô cùng sáng sửa!</p>

<h3 class="task-heading">Tránh lỗi đụng Tên (Collision) bằng As keyword</h3>
<p>Đôi khi bạn import chục cái <code>use</code> rỗng vào scope mà vô tình tụi nó Trùng Mẹ nó Tên Hàm Function với nhau. Rust cung cấp keyword Alias (vỏ bọc giả) <strong><code>as</code></strong>!</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fmt::Result;
use std::io::Result as IoResult; // Giờ đố đụng hàng luôn!! Trở thành hàm tên IoResult

fn function1() -> Result { /* ... */ }
fn function2() -> IoResult<()> { /* ... */ }</code></pre>
</div>

<h3 class="task-heading">Nested paths lồng ghép mảng</h3>
<p>Nếu bạn xài đa cấp kiểu quá nhiều module có chung một gốc rễ cha <code>std::</code>: thì import tới n dòng sẽ làm mệt nhoài con mắt. Gom tụi nó vào cấu trúc ngoặc nhọn Nest Paths để cho dễ chơi nha:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::cmp::Ordering;
use std::io;
// NGU!! THAY BẰNG:
use std::{cmp::Ordering, io};

use std::io;
use std::io::Write;
// THAY BẰNG:
use std::io::{self, Write};</code></pre>
</div>

<h3 class="task-heading">Phân tách Module Cực lơn Thành Ra Nhiều Files Cho Khoẻ Cặp Mắt</h3>
<p>Đến một lúc mà file <code>src/lib.rs</code> chứa nhiều đoạn module lồng tree quá nhiều khiến cho một file chứa đến ngàn dòng code tốn kém. Tụi mình hoàn toàn quăng cái thân nội tạng của Module vô trong một file khác rồi Import ngược bằng Path cho Rust Compile tự lắp ráp chúng.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Trong File: src/lib.rs KHAI BÁO RỖNG TÊN MODULE NHƯ NÀY
mod front_of_house; 

pub fn eat_at_restaurant() {
    front_of_house::hosting::add_to_waitlist();
}

// TRONG FILE RIÊNG BÊN CẠNH LÀ src/front_of_house.rs TA KHAI BÁO RUỘT
pub mod hosting {
    pub fn add_to_waitlist() {}
}</code></pre>
</div>
`,
      defaultCode: `use std::collections::HashMap;

fn main() {
    // HashMap demo
    let mut scores = HashMap::new();
    scores.insert("Toán", 95);
    scores.insert("Lý", 88);
    scores.insert("Hóa", 92);

    println!("Bảng điểm:");
    for (subject, score) in &scores {
        println!("  {subject}: {score}");
    }

    // Vec với iter
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Tổng: {sum}");
}
`,
      expectedOutput: 'Bảng điểm:\n  Toán: 95\n  Lý: 88\n  Hóa: 92\nTổng: 15'
    }
  ]
};
