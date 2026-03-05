import { Lesson } from '../../courses';

export const ch07_03: Lesson = {
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
    };
