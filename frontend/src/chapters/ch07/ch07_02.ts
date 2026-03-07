import { Lesson } from '../../courses';

export const ch07_02: Lesson = {
      id: 'ch07-02',
      title: '7.2 Định nghĩa Modules & Kiểm soát Visibility',
      duration: '40 phút',
      type: 'practice',
      content: `
<p>Modules cho phép tổ chức code trong crate thành các nhóm để dễ quản lý và tái sử dụng. Module còn kiểm soát <strong>privacy</strong> - xác định code nào được public, code nào là private.</p>

<h3 class="task-heading">Khai báo Modules</h3>
<p>Modules được khai báo bằng từ khóa <code>mod</code> theo sau là tên module:</p>

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

<h3 class="task-heading">Paths để truy cập Modules</h3>
<p>Có 2 cách để truy cập items trong module:</p>

<ul>
  <li><strong>Absolute path:</strong> Bắt đầu từ crate root (dùng <code>crate::</code>)</li>
  <li><strong>Relative path:</strong> Bắt đầu từ module hiện tại</li>
</ul>

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

<h3 class="task-heading">Từ khóa pub để Public</h3>
<p>Trong Rust, <strong>mọi item đều là PRIVATE mặc định</strong>. Để cho phép truy cập từ bên ngoài, dùng <code>pub</code>:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod my_module {
    // Private function (mặc định)
    fn private_function() {}

    // Public function
    pub fn public_function() {}

    // Public const
    pub const MAX_SIZE: u32 = 100;

    // Public struct (nhưng fields vẫn private)
    pub struct Config {
        pub name: String,   // public field
        age: u32,           // private field
    }

    // Public enum (tất cả variants đều public)
    pub enum Status {
        Active,
        Inactive,
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý quan trọng:</strong> Module con có thể truy cập mọi thứ trong module cha (kể cả private). Điều này cho phép code trong module con biết các chi tiết bên trong của module cha.
</div>

<h3 class="task-heading">Từ khóa super để truy cập module cha</h3>
<p><code>super</code> cho phép truy cập items từ module cha:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order(); // Gọi hàm từ module cha
    }
    fn cook_order() {}
}</code></pre>
</div>

<h3 class="task-heading">Từ khóa self</h3>
<p><code>self</code> tham chiếu đến module hiện tại:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod my_module {
    pub fn function1() {}
    pub fn function2() {
        self::function1(); // Gọi hàm trong cùng module
    }
}</code></pre>
</div>

<h3 class="task-heading">Struct với pub trong Enum</h3>
<p>Khi struct có <code>pub</code>, các variant enum cũng cần <code>pub</code> để truy cập:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod example {
    pub enum Message {
        Quit,
        Move { x: i32, y: i32 },
    }

    pub fn process(msg: Message) {
        match msg {
            Message::Quit => println!("Quit"),
            Message::Move { x, y } => println!("Move to {}, {}", x, y),
        }
    }
}

fn main() {
    example::process(example::Message::Move { x: 10, y: 20 });
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
};
