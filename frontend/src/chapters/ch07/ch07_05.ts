import { Lesson } from '../../courses';

export const ch07_05: Lesson = {
            id: '07-05',
            title: '7.5 Tách Modules thành Các File Riêng Biệt',
            duration: '35 phút',
            type: 'theory',
            content: `
<p>Tất cả các ví dụ trong chương này đều định nghĩa nhiều modules trong một file. Khi modules trở nên lớn, bạn có thể muốn di chuyển các định nghĩa của chúng sang một file riêng biệt để làm cho code dễ điều hướng hơn.</p>

<p>Ví dụ, hãy bắt đầu từ code trong Listing 7-17 có nhiều restaurant modules. Chúng ta sẽ tách các modules thành các files riêng biệt thay vì định nghĩa tất cả các modules trong crate root file. Trong trường hợp này, crate root file là src/lib.rs, nhưng quy trình này cũng hoạt động với binary crates có crate root file là src/main.rs.</p>

<h3 class="task-heading">Tách front_of_house Module</h3>
<p>Đầu tiên, chúng ta sẽ tách module front_of_house thành file riêng của nó. Xóa code bên trong các dấu ngoặc nhọn cho module front_of_house, chỉ để lại khai báo mod front_of_house;, để src/lib.rs chứa code như trong Listing 7-21. Lưu ý rằng code này sẽ không compile cho đến khi chúng ta tạo file src/front_of_house.rs trong Listing 7-22.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}</code></pre>
</div>

<p>Tiếp theo, đặt code có trong các dấu ngoặc nhọn vào một file mới có tên src/front_of_house.rs, như trong Listing 7-22. Compiler biết tìm trong file này vì nó đã gặp khai báo module trong crate root với tên front_of_house.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub mod hosting {
    pub fn add_to_waitlist() {}
}</code></pre>
</div>

<p>Lưu ý rằng bạn chỉ cần load một file sử dụng khai báo mod một lần trong module tree của bạn. Một khi compiler biết file là một phần của project (và biết vị trí trong module tree mà code nằm ở đâu vì bạn đã đặt câu lệnh mod), các files khác trong project nên refer đến code của file đã load sử dụng một path đến nơi nó được khai báo, như đã covered trong phần "Paths for Referring to an Item in the Module Tree". Nói cách khác, mod không phải là một "include" operation mà bạn có thể đã thấy trong các ngôn ngữ lập trình khác.</p>

<h3 class="task-heading">Tách hosting Module</h3>
<p>Tiếp theo, chúng ta sẽ tách module hosting thành file riêng của nó. Quy trình hơi khác một chút vì hosting là một child module của front_of_house, không phải của root module. Chúng ta sẽ đặt file cho hosting trong một thư mục mới có tên cho các ancestors của nó trong module tree, trong trường hợp này là src/front_of_house.</p>

<p>Để bắt đầu di chuyển hosting, chúng ta thay đổi src/front_of_house.rs để chỉ chứa khai báo của module hosting:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub mod hosting;</code></pre>
</div>

<p>Sau đó, chúng ta tạo một thư mục src/front_of_house và file hosting.rs để chứa các định nghĩa được tạo trong module hosting:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn add_to_waitlist() {}</code></pre>
</div>

<p>Nếu chúng ta đặt hosting.rs trong thư mục src, compiler sẽ expect code của hosting.rs nằm trong một module hosting được khai báo trong crate root và không được khai báo như một child của module front_of_house. Các quy tắc của compiler cho việc check files nào cho code của modules nào có nghĩa là các directories và files gần hơn với module tree.</p>

<h3 class="task-heading">Các Đường dẫn File Thay thế</h3>
<p>Cho đến nay chúng ta đã cover các đường dẫn files idiomatic nhất mà Rust compiler sử dụng, nhưng Rust cũng hỗ trợ một style cũ hơn của đường dẫn file. Cho một module tên là front_of_house được khai báo trong crate root, compiler sẽ tìm code của module trong:</p>

<ul>
  <li>src/front_of_house.rs (như chúng ta đã cover)</li>
  <li>src/front_of_house/mod.rs (style cũ, vẫn được hỗ trợ)</li>
</ul>

<p>Cho một module tên là hosting là một submodule của front_of_house, compiler sẽ tìm code của module trong:</p>

<ul>
  <li>src/front_of_house/hosting.rs (như chúng ta đã cover)</li>
  <li>src/front_of_house/hosting/mod.rs (style cũ, vẫn được hỗ trợ)</li>
</ul>

<p>Nếu bạn sử dụng cả hai styles cho cùng một module, bạn sẽ nhận được một compiler error. Sử dụng mix của cả hai styles cho các modules khác nhau trong cùng một project được cho phép nhưng có thể gây confusion cho những người đang navigate trong project của bạn.</p>

<p>Main downside của style sử dụng files có tên mod.rs là project của bạn có thể kết thúc với nhiều files có tên mod.rs, điều này có thể gây confuse khi bạn mở chúng cùng lúc trong editor.</p>

<h3 class="task-heading">Tóm tắt</h3>
<p>Chúng ta đã di chuyển code của mỗi module đến một file riêng biệt, và module tree vẫn giữ nguyên. Các function calls trong eat_at_restaurant sẽ hoạt động mà không cần sửa đổi, mặc dù các định nghĩa nằm trong các files khác nhau. Kỹ thuật này cho phép bạn di chuyển modules đến các files mới khi chúng phát triển về kích thước.</p>

<p>Lưu ý rằng câu lệnh pub use crate::front_of_house::hosting trong src/lib.rs cũng không thay đổi, cũng như use không có tác động gì đến việc files nào được compile như một phần của crate. Từ khóa mod khai báo modules, và Rust tìm trong một file có cùng tên với module cho code thuộc về module đó.</p>

<p>Rust cho phép bạn tách một package thành nhiều crates và một crate thành modules để bạn có thể refer đến items được định nghĩa trong một module từ một module khác. Bạn có thể làm điều này bằng cách chỉ định absolute hoặc relative paths. Các paths này có thể được đưa vào scope với câu lệnh use để bạn có thể sử dụng một path ngắn hơn cho nhiều lần sử dụng item đó trong scope đó. Module code là private theo mặc định, nhưng bạn có thể làm cho các định nghĩa public bằng cách thêm từ khóa pub.</p>
`,
            defaultCode: `// Tách Modules thành các Files riêng biệt
// Trong thực tế, code này sẽ được tách thành nhiều files:
//
// src/lib.rs (crate root)
// src/front_of_house.rs
// src/front_of_house/hosting.rs
// src/front_of_house/serving.rs
//
// Để minh họa, chúng ta sẽ định nghĩa tất cả trong một file

mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {
            println!("Added to waitlist!");
        }

        pub fn seat_customer() {
            println!("Seating customer!");
        }
    }

    pub mod serving {
        pub fn take_order() {
            println!("Order taken!");
        }

        pub fn serve_food() {
            println!("Food served!");
        }

        pub fn take_payment() {
            println!("Payment received!");
        }
    }
}

// Tách modules:
mod back_of_house {
    pub mod kitchen {
        pub fn cook_food() {
            println!("Cooking food!");
        }

        pub fn wash_dishes() {
            println!("Washing dishes!");
        }
    }

    pub mod storage {
        pub fn get_supplies() {
            println!("Getting supplies!");
        }
    }
}

// Sử dụng pub use để re-export
pub use crate::front_of_house::hosting;
pub use crate::back_of_house::kitchen;

pub fn eat_at_restaurant() {
    // Gọi functions từ các modules đã tách
    front_of_house::hosting::add_to_waitlist();
    front_of_house::serving::take_order();
    front_of_house::serving::serve_food();

    back_of_house::kitchen::cook_food();
    back_of_house::storage::get_supplies();
}

fn main() {
    println!("=== Separating Modules Demo ===");
    eat_at_restaurant();

    // Có thể gọi trực tiếp thông qua re-export
    println!("\\n=== Via re-export ===");
    hosting::add_to_waitlist();
    kitchen::cook_food();
}
`,
            expectedOutput: `=== Separating Modules Demo ===
Added to waitlist!
Order taken!
Food served!
Cooking food!
Getting supplies!

=== Via re-export ===
Added to waitlist!
Cooking food!`
        };
