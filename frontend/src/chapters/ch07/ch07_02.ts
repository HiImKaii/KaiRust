import { Lesson } from '../../courses';

export const ch07_02: Lesson = {
            id: '07-02',
            title: '7.2 Control Scope and Privacy with Modules',
            duration: '40 phút',
            type: 'theory',
            content: `
<p>Trong phần này, chúng ta sẽ nói về modules và các phần khác của module system, cụ thể là paths, cho phép bạn đặt tên cho items; từ khóa use đưa một path vào scope; và từ khóa pub để tạo items public. Chúng ta cũng sẽ thảo luận về từ khóa as, external packages, và toán tử glob.</p>

<h3 class="task-heading">Modules Cheat Sheet</h3>
<p>Trước khi chúng ta đi vào chi tiết của modules và paths, ở đây chúng ta cung cấp một tài liệu tham khảo nhanh về cách modules, paths, từ khóa use, và từ khóa pub hoạt động trong compiler, và cách hầu hết các developers tổ chức code của họ. Chúng ta sẽ đi qua các ví dụ của mỗi quy tắc này trong suốt chương, nhưng đây là một nơi tuyệt vời để tham khảo như một lời nhắc về cách modules hoạt động.</p>

<ul>
  <li><strong>Bắt đầu từ crate root:</strong> Khi biên dịch một crate, compiler trước tiên tìm trong file crate root (thường là src/lib.rs cho một library crate và src/main.rs cho một binary crate) để tìm code để biên dịch.</li>
  <li><strong>Khai báo modules:</strong> Trong file crate root, bạn có thể khai báo các modules mới; giả sử bạn khai báo một module "garden" với mod garden;. Compiler sẽ tìm code của module trong những vị trí này:
    <ul>
      <li>Inline, trong các dấu ngoặc nhọn thay thế dấu chấm phẩy sau mod garden</li>
      <li>Trong file src/garden.rs</li>
      <li>Trong file src/garden/mod.rs</li>
    </ul>
  </li>
  <li><strong>Khai báo submodules:</strong> Trong bất kỳ file nào khác crate root, bạn có thể khai báo submodules. Ví dụ, bạn có thể khai báo mod vegetables; trong src/garden.rs. Compiler sẽ tìm code của submodule trong thư mục được đặt tên cho parent module:
    <ul>
      <li>Inline, ngay sau mod vegetables, trong các dấu ngoặc nhọn thay vì dấu chấm phẩy</li>
      <li>Trong file src/garden/vegetables.rs</li>
      <li>Trong file src/garden/vegetables/mod.rs</li>
    </ul>
  </li>
  <li><strong>Paths đến code trong modules:</strong> Khi một module là một phần của crate của bạn, bạn có thể refer đến code trong module đó từ bất kỳ đâu khác trong cùng crate đó, miễn là các quy tắc privacy cho phép, sử dụng path đến code đó. Ví dụ, một kiểu Asparagus trong module garden vegetables sẽ được tìm thấy tại crate::garden::vegetables::Asparagus.</li>
  <li><strong>Private vs. public:</strong> Code trong một module là private từ các parent modules của nó theo mặc định. Để tạo một module public, khai báo nó với pub mod thay vì mod. Để tạo các items trong một module public cũng public, sử dụng pub trước khai báo của chúng.</li>
  <li><strong>Từ khóa use:</strong> Trong một scope, từ khóa use tạo shortcuts cho items để giảm sự lặp lại của các paths dài. Trong bất kỳ scope nào có thể refer đến crate::garden::vegetables::Asparagus, bạn có thể tạo một shortcut với use crate::garden::vegetables::Asparagus;, và từ đó trở đi bạn chỉ cần viết Asparagus để sử dụng kiểu đó trong scope.</li>
</ul>

<p>Ở đây, chúng ta tạo một binary crate tên là backyard minh họa các quy tắc này. Thư mục của crate, cũng tên là backyard, chứa các files và thư mục này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>backyard
├── Cargo.lock
├── Cargo.toml
└── src
    ├── garden
    │   └── vegetables.rs
    ├── garden.rs
    └── main.rs</code></pre>
</div>

<p>File crate root trong trường hợp này là src/main.rs, và nó chứa:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use crate::garden::vegetables::Asparagus;

pub mod garden;

fn main() {
    let plant = Asparagus {};
    println!("I'm growing {plant:?}!");
}</code></pre>
</div>

<p>Dòng pub mod garden; yêu cầu compiler bao gồm code nó tìm thấy trong src/garden.rs, là:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub mod vegetables;</code></pre>
</div>

<p>Ở đây, pub mod vegetables; có nghĩa là code trong src/garden/vegetables.rs cũng được bao gồm. Code đó là:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
pub struct Asparagus {}</code></pre>
</div>

<h3 class="task-heading">Grouping Related Code in Modules</h3>
<p>Modules cho phép chúng ta tổ chức code trong một crate để dễ đọc và tái sử dụng. Modules cũng cho phép chúng ta kiểm soát privacy của items vì code trong một module là private theo mặc định. Private items là các chi tiết implementation nội bộ không có sẵn cho việc sử dụng bên ngoài. Chúng ta có thể chọn để tạo modules và các items trong đó public, expose chúng để cho phép code bên ngoài sử dụng và phụ thuộc vào chúng.</p>

<p>Như một ví dụ, hãy viết một library crate cung cấp functionality của một nhà hàng. Chúng ta sẽ định nghĩa các signatures của các functions nhưng để trống bodies để tập trung vào tổ chức code thay vì implementation của một nhà hàng.</p>

<p>Trong ngành công nghiệp nhà hàng, một số phần của nhà hàng được gọi là front of house và others as back of house. Front of house là nơi khách hàng; điều này bao gồm nơi hosts tiếp khách, servers nhận orders và thanh toán, và bartenders pha đồ uống. Back of house là nơi đầu bếp và đầu bếp làm việc trong bếp, dishwashers dọn dẹp, và managers làm công việc quản lý.</p>

<p>Để cấu trúc crate của chúng ta theo cách này, chúng ta có thể tổ chức các functions của nó vào các modules lồng nhau. Tạo một library mới tên là restaurant bằng cách chạy cargo new restaurant --lib. Sau đó, nhập code vào src/lib.rs để định nghĩa một số modules và function signatures; code này là phần front of house.</p>

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

<p>Chúng ta định nghĩa một module với từ khóa mod theo sau là tên của module (trong trường hợp này là front_of_house). Body của module sau đó đi vào trong các dấu ngoặc nhọn. Bên trong các modules, chúng ta có thể đặt các modules khác, như trong trường hợp này với các modules hosting và serving. Modules cũng có thể chứa định nghĩa cho các items khác, như structs, enums, constants, traits, và như trong ví dụ trên, functions.</p>

<p>Bằng cách sử dụng modules, chúng ta có thể nhóm các định nghĩa liên quan lại với nhau và đặt tên tại sao chúng liên quan. Các programmers sử dụng code này có thể navigate code dựa trên các nhóm thay vì phải đọc qua tất cả các định nghĩa, làm cho việc tìm các định nghĩa liên quan đến họ dễ dàng hơn. Các programmers thêm functionality mới vào code này sẽ biết nơi đặt code để giữ chương trình được tổ chức.</p>

<p>Trước đó, chúng ta đề cập rằng src/main.rs và src/lib.rs được gọi là crate roots. Lý do cho tên của chúng là nội dung của một trong hai file này tạo thành một module tên là crate ở gốc của cấu trúc module của crate, được gọi là module tree.</p>

<p>Listing 7-2 cho thấy module tree cho cấu trúc trong Listing 7-1.</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment</code></pre>
</div>

<p>Module tree này cho thấy một số modules lồng nhau như thế nào bên trong các modules khác; ví dụ, hosting lồng bên trong front_of_house. Tree cũng cho thấy một số modules là siblings, có nghĩa là chúng được định nghĩa trong cùng một module; hosting và serving là siblings được định nghĩa trong front_of_house. Nếu module A được chứa bên trong module B, chúng ta nói rằng module A là con của module B và module B là cha của module A. Lưu ý rằng toàn bộ module tree được root dưới một module ngầm định tên là crate.</p>

<p>Module tree có thể nhắc bạn về cây thư mục của filesystem trên máy tính của bạn; đây là một sự so sánh rất thích hợp! Giống như các thư mục trong một filesystem, bạn sử dụng modules để tổ chức code của mình. Và giống như các files trong một thư mục, chúng ta cần một cách để tìm các modules của mình.</p>
`,
            defaultCode: `// Modules và Visibility Examples

mod front_of_house {
    // Module con mặc định là private
    mod hosting {
        // Function private
        fn add_to_waitlist() {
            println!("Added to waitlist!");
        }

        // Function public
        pub fn seat_at_table() {
            println!("Seated at table!");
        }
    }

    // Public module
    pub mod serving {
        pub fn take_order() {
            println!("Order taken!");
        }

        pub fn serve_order() {
            println!("Order served!");
        }

        pub fn take_payment() {
            println!("Payment received!");
        }
    }
}

pub fn eat_at_restaurant() {
    // Gọi function public từ module khác
    front_of_house::hosting::seat_at_table();
    front_of_house::serving::take_order();
    front_of_house::serving::serve_order();
    front_of_house::serving::take_payment();
}

fn main() {
    eat_at_restaurant();
}
`,
            expectedOutput: `Seated at table!
Order taken!
Order served!
Payment received!`
        };
