import { Lesson } from '../../courses';

export const ch07_04: Lesson = {
            id: '07-04',
            title: '7.4 Bringing Paths into Scope with the use Keyword',
            duration: '35 phút',
            type: 'theory',
            content: `
<p>Việc phải viết ra paths để gọi functions có thể cảm thấy bất tiện và lặp lại. Trong Listing 7-7, cho dù chúng ta chọn absolute hay relative path đến function add_to_waitlist, mỗi lần chúng ta muốn gọi add_to_waitlist chúng ta phải chỉ định front_of_house và hosting nữa. May mắn thay, có một cách để đơn giản hóa quy trình này: Chúng ta có thể tạo một shortcut cho một path với từ khóa use một lần và sau đó sử dụng tên ngắn hơn ở mọi nơi khác trong scope.</p>

<h3 class="task-heading">Sử dụng use để đưa module vào scope</h3>
<p>Trong Listing 7-11, chúng ta đưa module crate::front_of_house::hosting vào scope của function eat_at_restaurant để chúng ta chỉ phải chỉ định hosting::add_to_waitlist để gọi function add_to_waitlist trong eat_at_restaurant.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}</code></pre>
</div>

<p>Thêm use và một path trong một scope tương tự như tạo một symbolic link trong filesystem. Bằng cách thêm use crate::front_of_house::hosting trong crate root, hosting bây giờ là một tên hợp lệ trong scope đó, như thể module hosting đã được định nghĩa trong crate root. Paths được đưa vào scope với use cũng kiểm tra privacy, như bất kỳ paths nào khác.</p>

<p>Lưu ý rằng use chỉ tạo shortcut cho particular scope trong which use xảy ra. Listing 7-12 di chuyển function eat_at_restaurant vào một child module mới tên là customer, sau đó là một scope khác với câu lệnh use, vì vậy function body sẽ không compile.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

mod customer {
    pub fn eat_at_restaurant() {
        hosting::add_to_waitlist();
    }
}</code></pre>
</div>

<h3 class="task-heading">Tạo Idiomatic use Paths</h3>
<p>Trong Listing 7-11, bạn có thể đã tự hỏi tại sao chúng ta chỉ định use crate::front_of_house::hosting và sau đó gọi hosting::add_to_waitlist trong eat_at_restaurant, thay vì chỉ định use path tất cả đến function add_to_waitlist để đạt được kết quả tương tự.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting::add_to_waitlist;

pub fn eat_at_restaurant() {
    add_to_waitlist();
}</code></pre>
</div>

<p>Mặc dù cả Listing 7-11 và Listing 7-13 đều hoàn thành cùng một task, nhưng Listing 7-11 là cách idiomatic để đưa một function vào scope với use. Việc đưa parent module của function vào scope với use có nghĩa là chúng ta phải chỉ định parent module khi gọi function. Việc chỉ định parent module khi gọi function làm rõ rằng function không được định nghĩa locally trong khi vẫn giảm thiểu sự lặp lại của full path.</p>

<p>Mặt khác, khi đưa structs, enums, và các items khác vào scope với use, thông thường nên chỉ định full path. Listing 7-14 cho thấy cách idiomatic để đưa HashMap của thư viện chuẩn vào scope của một binary crate.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}</code></pre>
</div>

<h3 class="task-heading">Xung đột tên với as Keyword</h3>
<p>Ngoại lệ cho idiom này là nếu chúng ta đưa hai items với cùng tên vào scope với use statements, vì Rust không cho phép điều đó. Listing 7-15 cho thấy cách đưa hai kiểu Result vào cùng scope có cùng tên nhưng parent modules khác nhau.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fmt;
use std::io;

fn function1() -> fmt::Result {
    // ...
}

fn function2() -> io::Result&lt;()&gt; {
    // ...
}</code></pre>
</div>

<p>Có một giải pháp khác cho vấn đề đưa hai kiểu cùng tên vào cùng scope với use: Sau path, chúng ta có thể chỉ định as và một tên mới local, hoặc alias, cho kiểu đó. Listing 7-16 cho thấy cách khác để viết code trong Listing 7-15 bằng cách đổi tên một trong hai kiểu Result sử dụng as.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // ...
}

fn function2() -> IoResult&lt;()&gt; {
    // ...
}</code></pre>
</div>

<h3 class="task-heading">Re-exporting Names với pub use</h3>
<p>Khi chúng ta đưa một tên vào scope với từ khóa use, tên là private đối với scope mà chúng ta import nó. Để cho phép code bên ngoài scope đó refer đến tên đó như thể nó đã được định nghĩa trong scope đó, chúng ta có thể kết hợp pub và use. Kỹ thuật này được gọi là re-exporting vì chúng ta đưa một item vào scope nhưng cũng làm cho item đó có sẵn cho người khác đưa vào scope của họ.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}</code></pre>
</div>

<p>Trước sự thay đổi này, code bên ngoài phải gọi function add_to_waitlist bằng cách sử dụng path restaurant::front_of_house::hosting::add_to_waitlist(), điều này cũng yêu cầu module front_of_house được đánh dấu là pub. Bây giờ với pub use đã re-export module hosting từ root module, code bên ngoài có thể sử dụng path restaurant::hosting::add_to_waitlist() thay vì.</p>

<h3 class="task-heading">Sử dụng External Packages</h3>
<p>Trong Chương 2, chúng ta đã lập trình một guessing game project sử dụng một external package gọi là rand để lấy số ngẫu nhiên. Để sử dụng rand trong project của chúng ta, chúng ta thêm dòng này vào Cargo.toml:</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>rand = "0.8.5"</code></pre>
</div>

<p>Thêm rand như một dependency trong Cargo.toml tells Cargo to download the rand package and any dependencies from crates.io and make rand available to our project.</p>

<p>Để đưa rand definitions vào scope của package, chúng ta thêm một dòng use bắt đầu với tên của crate, rand, và liệt kê các items chúng ta muốn đưa vào scope.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use rand::Rng;

fn main() {
    let secret_number = rand::thread_rng().gen_range(1..=100);
}</code></pre>
</div>

<h3 class="task-heading">Sử dụng Nested Paths để Clean Up use Lists</h3>
<p>Nếu chúng ta đang sử dụng nhiều items được định nghĩa trong cùng crate hoặc cùng module, liệt kê mỗi item trên dòng riêng của nó có thể chiếm nhiều không gian vertical trong files của chúng ta. Thay vào đó, chúng ta có thể sử dụng nested paths để đưa cùng items vào scope trong một dòng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::{cmp::Ordering, io};</code></pre>
</div>

<p>Chúng ta có thể sử dụng nested path ở bất kỳ level nào trong một path, hữu ích khi kết hợp hai use statements chia sẻ một subpath.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io::{self, Write};</code></pre>
</div>

<h3 class="task-heading">Importing Items với Glob Operator</h3>
<p>Nếu chúng ta muốn đưa tất cả public items được định nghĩa trong một path vào scope, chúng ta có thể chỉ định path đó followed by the * glob operator:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::*;</code></pre>
</div>

<p>Hãy cẩn thận khi sử dụng glob operator! Glob có thể làm cho việc nói tên nào đang trong scope và tên được sử dụng trong program của bạn được định nghĩa ở đâu trở nên khó hơn.</p>
`,
            defaultCode: `// use keyword Examples

mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {
            println!("Added to waitlist!");
        }

        pub fn seat_at_table() {
            println!("Seated at table!");
        }
    }
}

// Idiomatic: đưa parent module vào scope
use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::seat_at_table();
}

// Nested paths
mod nested {
    use std::{collections::HashMap, io::{self, Write}};

    pub fn demo() {
        let _map: HashMap<String, i32> = HashMap::new();
        let _output: io::Write = io::stdout();
    }
}

// Alias với as
mod alias {
    use std::fmt::Result;
    use std::io::Result as IoResult;

    pub fn fmt_result() -> Result {
        Ok(())
    }

    pub fn io_result() -> IoResult {
        Ok(())
    }
}

// pub use - re-exporting
pub mod library {
    pub mod inner {
        pub fn function() {
            println!("Inner function called!");
        }
    }

    pub use inner::function;
}

fn main() {
    println!("=== use keyword examples ===");

    // Gọi function thông qua use
    eat_at_restaurant();

    // Nested paths
    nested::demo();

    // Alias
    alias::fmt_result();
    alias::io_result();

    // pub use (re-export)
    library::function();
}
`,
            expectedOutput: `=== use keyword examples ===
Added to waitlist!
Seated at table!
Inner function called!`
        };
