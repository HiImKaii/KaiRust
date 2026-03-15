import { Lesson } from '../../courses';

export const ch07_03: Lesson = {
            id: '07-03',
            title: '7.3 Paths for Referring to an Item in the Module Tree',
            duration: '40 phút',
            type: 'theory',
            content: `
<p>Để cho thấy Rust nơi tìm một item trong module tree, chúng ta sử dụng một path giống như khi điều hướng một filesystem. Để gọi một function, chúng ta cần biết path của nó.</p>

<p>Một path có thể có hai dạng:</p>

<ul>
  <li><strong>Absolute path</strong> là path đầy đủ bắt đầu từ crate root; cho code từ external crate, absolute path bắt đầu với crate name, và cho code từ crate hiện tại, nó bắt đầu với literal crate.</li>
  <li><strong>Relative path</strong> bắt đầu từ module hiện tại và sử dụng self, super, hoặc một identifier trong module hiện tại.</li>
</ul>

<p>Cả absolute và relative paths đều được theo sau bởi một hoặc nhiều identifiers phân tách bởi hai dấu hai chấm (::).</p>

<h3 class="task-heading">Ví dụ: Gọi add_to_waitlist</h3>
<p>Quay lại Listing 7-1, giả sử chúng ta muốn gọi function add_to_waitlist. Listing 7-3 chứa Listing 7-1 với một số modules và functions được loại bỏ.</p>

<p>Chúng ta sẽ cho thấy hai cách để gọi function add_to_waitlist từ một function mới, eat_at_restaurant, được định nghĩa trong crate root.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}</code></pre>
</div>

<p>Lần đầu tiên chúng ta gọi function add_to_waitlist trong eat_at_restaurant, chúng ta sử dụng một absolute path. Function add_to_waitlist được định nghĩa trong cùng crate với eat_at_restaurant, có nghĩa là chúng ta có thể sử dụng từ khóa crate để bắt đầu một absolute path. Sau đó chúng ta bao gồm mỗi successive modules cho đến khi chúng ta đến add_to_waitlist.</p>

<p>Lần thứ hai chúng ta gọi add_to_waitlist trong eat_at_restaurant, chúng ta sử dụng một relative path. Path bắt đầu với front_of_house, tên của module được định nghĩa ở cùng mức trong module tree với eat_at_restaurant.</p>

<p>Lựa chọn sử dụng absolute hay relative path là một quyết định bạn sẽ đưa ra dựa trên project của bạn, và nó phụ thuộc vào việc bạn có nhiều khả năng di chuyển item definition code riêng biệt khỏi hay cùng với code sử dụng item đó.</p>

<h3 class="task-heading">Lỗi Compile</h3>
<p>Hãy thử compile Listing 7-3 và tìm hiểu tại sao nó không compile! Các errors chúng ta nhận được:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
error[E0603]: module \`hosting\` is private
 --> src/lib.rs:9:28
  |
9 |     crate::front_of_house::hosting::add_to_waitlist();
  |                            ^^^^^^^  --------------- function \`add_to_waitlist\` is not publicly re-exported
  |                            |
  |                            private module

error[E0603]: module \`hosting\` is private</code></pre>
</div>

<p>Các error messages nói rằng module hosting là private. Nói cách khác, chúng ta có các paths đúng cho module hosting và function add_to_waitlist, nhưng Rust không cho phép chúng ta sử dụng chúng vì nó không có quyền truy cập vào các sections riêng tư. Trong Rust, tất cả items (functions, methods, structs, enums, modules, và constants) đều là private đối với parent modules theo mặc định.</p>

<p>Items trong một parent module không thể sử dụng các items riêng tư bên trong child modules, nhưng items trong child modules có thể sử dụng các items trong ancestor modules của chúng.</p>

<h3 class="task-heading">Exposing Paths với từ khóa pub</h3>
<p>Chúng ta hãy quay lại error trong Listing 7-4 nói rằng module hosting là private. Chúng ta muốn function eat_at_restaurant trong parent module có quyền truy cập function add_to_waitlist trong child module, vì vậy chúng ta đánh dấu module hosting với từ khóa pub, như trong Listing 7-5.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        fn add_to_waitlist() {}
    }
}</code></pre>
</div>

<p>Thật không may, code trong Listing 7-5 vẫn dẫn đến compiler errors. Từ khóa pub trước mod hosting làm cho module public. Nhưng nội dung của hosting vẫn là private; làm cho module public không làm cho nội dung của nó public. Từ khóa pub trên một module chỉ cho phép code trong ancestor modules refer đến nó, không truy cập vào code bên trong của nó.</p>

<p>Chúng ta cũng cần làm cho function add_to_waitlist public bằng cách thêm từ khóa pub trước định nghĩa của nó.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}</code></pre>
</div>

<h3 class="task-heading">Best Practices cho Packages với Binary và Library</h3>
<p>Chúng ta đã đề cập rằng một package có thể chứa cả src/main.rs binary crate root và src/lib.rs library crate root, và cả hai crates sẽ có package name theo mặc định. Thông thường, packages với pattern này chứa đủ code trong binary crate để bắt đầu một executable gọi code được định nghĩa trong library crate. Điều này cho phép các projects khác được hưởng lợi từ hầu hết functionality mà package cung cấp.</p>

<p>Module tree nên được định nghĩa trong src/lib.rs. Sau đó, bất kỳ public items nào có thể được sử dụng trong binary crate bằng cách bắt đầu paths với tên của package.</p>

<h3 class="task-heading">Starting Relative Paths với super</h3>
<p>Chúng ta có thể construct relative paths bắt đầu trong parent module, thay vì module hiện tại hoặc crate root, bằng cách sử dụng super ở đầu path. Điều này giống như bắt đầu một filesystem path với syntax .. có nghĩa là đi đến thư mục cha.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order();
    }

    fn cook_order() {}
}</code></pre>
</div>

<p>Function fix_incorrect_order trong module back_of_house, vì vậy chúng ta có thể sử dụng super để đi đến parent module của back_of_house, trong trường hợp này là crate, root.</p>

<h3 class="task-heading">Making Structs và Enums Public</h3>
<p>Chúng ta cũng có thể sử dụng pub để designate structs và enums là public, nhưng có một số chi tiết bổ sung về việc sử dụng pub với structs và enums. Nếu chúng ta sử dụng pub trước một struct definition, chúng ta làm cho struct public, nhưng các fields của struct sẽ vẫn là private.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod back_of_house {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}

pub fn eat_at_restaurant() {
    let mut meal = back_of_house::Breakfast::summer("Rye");
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast please", meal.toast);
}</code></pre>
</div>

<p>Trong struct back_of_house::Breakfast, field toast là public, nhưng seasonal_fruit là private. Vì struct có một private field, struct cần cung cấp một public associated function để construct một instance của Breakfast.</p>

<p>Ngược lại, nếu chúng ta làm một enum public, tất cả các variants của nó đều public. Chúng ta chỉ cần pub trước từ khóa enum.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod back_of_house {
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant() {
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}</code></pre>
</div>
`,
            defaultCode: `// Paths và Visibility Examples

mod front_of_house {
    // Public module
    pub mod hosting {
        // Public function
        pub fn add_to_waitlist() {
            println!("Added to waitlist!");
        }

        pub fn seat_at_table() {
            println!("Seated at table!");
        }
    }

    pub mod serving {
        pub fn take_order() {
            println!("Order taken!");
        }

        pub fn serve_order() {
            println!("Order served!");
        }
    }
}

// Absolute path
pub fn eat_at_restaurant() {
    crate::front_of_house::hosting::add_to_waitlist();
    front_of_house::hosting::seat_at_table();
    front_of_house::serving::take_order();
}

// Relative path với super
mod back_of_house {
    fn deliver_order() {
        println!("Order delivered!");
    }

    pub fn fix_order() {
        cook_order();
        super::deliver_order(); // Gọi function từ parent module
    }

    fn cook_order() {
        println!("Cooking...");
    }
}

fn main() {
    println!("=== Absolute & Relative Paths ===");
    eat_at_restaurant();

    println!("\\n=== Using super ===");
    back_of_house::fix_order();
}
`,
            expectedOutput: `=== Absolute & Relative Paths ===
Added to waitlist!
Seated at table!
Order taken!

=== Using super ===
Cooking...
Order delivered!`
        };
