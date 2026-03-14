import { Lesson } from '../../courses';

export const ch18_02: Lesson = {
            id: '18-02',
            title: '18.2 Sử Dụng Trait Objects Để Trừu Tượng Hóa Shared Behavior',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Trong Chương 8, chúng ta đã đề cập rằng một hạn chế của vectors là chúng chỉ có thể lưu trữ elements của một type. Chúng ta đã tạo một giải pháp trong Listing 8-9 nơi chúng ta định nghĩa một enum SpreadsheetCell có các variants để lưu integers, floats, và text. Điều này có nghĩa là chúng ta có thể lưu trữ các kiểu dữ liệu khác nhau trong mỗi cell và vẫn có một vector đại diện cho một hàng các cells. Đây là một giải pháp hoàn toàn tốt khi các interchangeable items của chúng ta là một tập hợp cố định các types mà chúng ta biết khi code được biên dịch.</p>

<p>Tuy nhiên, đôi khi chúng ta muốn người dùng thư viện có thể mở rộng tập hợp các types hợp lệ trong một tình huống cụ thể. Để thể hiện cách chúng ta có thể đạt được điều này, chúng ta sẽ tạo một ví dụ về công cụ giao diện người dùng đồ họa (GUI) lặp qua danh sách các items, gọi method draw trên mỗi item để vẽ nó lên màn hình—một kỹ thuật phổ biến cho công cụ GUI. Chúng ta sẽ tạo một thư viện crate gọi là gui chứa cấu trúc của một thư viện GUI. Crate này có thể bao gồm một số types để người dùng sử dụng, như Button hoặc TextField. Ngoài ra, người dùng gui sẽ muốn tạo các types của riêng họ có thể được vẽ: Ví dụ, một lập trình viên có thể thêm một Image và một người khác có thể thêm một SelectBox.</p>

<p>Tại thời điểm viết thư viện, chúng ta không thể biết và định nghĩa tất cả các types mà các lập trình viên khác có thể muốn tạo. Nhưng chúng ta biết rằng gui cần theo dõi nhiều giá trị của các kiểu khác nhau, và nó cần gọi method draw trên mỗi giá trị có các kiểu khác nhau. Nó không cần biết chính xác điều gì sẽ xảy ra khi chúng ta gọi method draw, chỉ cần biết rằng giá trị sẽ có method đó để chúng ta gọi.</p>

<p>Để làm điều này trong một ngôn ngữ có inheritance, chúng ta có thể định nghĩa một class tên là Component có một method tên là draw. Các classes khác, như Button, Image và SelectBox, sẽ inherit từ Component và do đó inherit method draw. Mỗi class có thể override method draw để định nghĩa hành vi tùy chỉnh của chúng, nhưng framework có thể đối xử với tất cả các types như thể chúng là các Component instances và gọi draw trên chúng. Nhưng vì Rust không có inheritance, chúng ta cần một cách khác để cấu trúc thư viện gui để cho phép người dùng tạo các types mới tương thích với thư viện.</p>

<h3 class="task-heading">Định nghĩa một Trait cho Common Behavior</h3>
<p>Để implement hành vi mà chúng ta muốn gui có, chúng ta sẽ định nghĩa một trait tên là Draw sẽ có một method tên là draw. Sau đó, chúng ta có thể định nghĩa một vector nhận một trait object. Một trait object trỏ đến cả một instance của một type implement trait của chúng ta và một table được sử dụng để tra cứu trait methods trên type đó tại runtime. Chúng ta tạo một trait object bằng cách chỉ định một số loại pointer, như một reference hoặc một smart pointer Box&lt;T&gt;, sau đó từ khóa dyn, và sau đó chỉ định trait liên quan. (Chúng ta sẽ nói về lý do tại sao trait objects phải sử dụng pointer trong "Dynamically Sized Types and the Sized Trait" ở Chương 20.) Chúng ta có thể sử dụng trait objects thay vì một generic hoặc concrete type. Bất cứ nơi nào chúng ta sử dụng trait object, hệ thống kiểu của Rust sẽ đảm bảo tại thời điểm biên dịch rằng bất kỳ giá trị nào được sử dụng trong ngữ cảnh đó sẽ implement trait của trait object. Do đó, chúng ta không cần biết tất cả các possible types tại thời điểm biên dịch.</p>

<p>Chúng ta đã đề cập rằng, trong Rust, chúng ta tránh gọi structs và enums là "objects" để phân biệt chúng với objects của các ngôn ngữ khác. Trong một struct hoặc enum, dữ liệu trong các struct fields và behavior trong các impl blocks được tách biệt, trong khi trong các ngôn ngữ khác, dữ liệu và behavior kết hợp vào một concept thường được gọi là một object. Trait objects khác với objects trong các ngôn ngữ khác ở chỗ chúng ta không thể thêm dữ liệu vào một trait object. Trait objects không hữu ích tổng quát như objects trong các ngôn ngữ khác: Mục đích cụ thể của chúng là cho phép trừu tượng hóa qua behavior chung.</p>

<p>Listing 18-3 cho thấy cách định nghĩa một trait tên là Draw với một method tên là draw.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Draw {
    fn draw(&self);
}</code></pre>
</div>
<p><em>Listing 18-3: Định nghĩa của trait Draw</em></p>

<p>Cú pháp này trông quen thuộc từ các cuộc thảo luận về cách định nghĩa traits trong Chương 10. Tiếp theo là một số cú pháp mới: Listing 18-4 định nghĩa một struct tên là Screen chứa một vector tên là components. Vector này có kiểu Box&lt;dyn Draw&gt;, đây là một trait object; nó là một thay thế cho bất kỳ type nào bên trong một Box implement trait Draw.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Screen {
    pub components: Vec&lt;Box&lt;dyn Draw&gt;&gt;,
}</code></pre>
</div>
<p><em>Listing 18-4: Định nghĩa của struct Screen với một trường components chứa một vector của trait objects implement trait Draw</em></p>

<p>Trên struct Screen, chúng ta sẽ định nghĩa một method tên là run sẽ gọi method draw trên mỗi component của nó, như trong Listing 18-5.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Screen {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}</code></pre>
</div>
<p><em>Listing 18-5: Method run trên Screen gọi method draw trên mỗi component</em></p>

<p>Điều này hoạt động khác với việc định nghĩa một struct sử dụng một generic type parameter với trait bounds. Một generic type parameter chỉ có thể được thay thế bằng một concrete type tại một thời điểm, trong khi trait objects cho phép nhiều concrete types thay thế cho trait object tại runtime. Ví dụ, chúng ta có thể định nghĩa struct Screen sử dụng một generic type và một trait bound, như trong Listing 18-6.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Screen&lt;T: Draw&gt; {
    pub components: Vec&lt;T&gt;,
}

impl&lt;T&gt; Screen&lt;T&gt;
where
    T: Draw,
{
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}</code></pre>
</div>
<p><em>Listing 18-6: Một implementation thay thế của struct Screen và method run của nó sử dụng generics và trait bounds</em></p>

<p>Điều này hạn chế chúng ta đến một Screen instance có một danh sách components tất cả đều là type Button hoặc tất cả đều là type TextField. Nếu bạn chỉ có các homogeneous collections, việc sử dụng generics và trait bounds là ưu tiên vì các định nghĩa sẽ được monomorphize tại thời điểm biên dịch để sử dụng các concrete types.</p>

<p>Mặt khác, với method sử dụng trait objects, một Screen instance có thể chứa một Vec&lt;T&gt; chứa một Box&lt;Button&gt; cũng như một Box&lt;TextField&gt;. Hãy xem điều này hoạt động như thế nào, và sau đó chúng ta sẽ nói về các ảnh hưởng đến hiệu suất runtime.</p>

<h3 class="task-heading">Implementing the Trait</h3>
<p>Bây giờ chúng ta sẽ thêm một số types implement trait Draw. Chúng ta sẽ cung cấp type Button. Một lần nữa, việc implement một thư viện GUI thực sự nằm ngoài phạm vi của cuốn sách này, vì vậy method draw sẽ không có bất kỳ implementation hữu ích nào trong thân của nó. Để tưởng tượng implementation có thể trông như thế nào, một struct Button có thể có các trường cho width, height và label, như trong Listing 18-7.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Button {
    pub width: u32,
    pub height: u32,
    pub label: String,
}

impl Draw for Button {
    fn draw(&self) {
        // code to actually draw a button
    }
}</code></pre>
</div>
<p><em>Listing 18-7: Một struct Button implement trait Draw</em></p>

<p>Các trường width, height và label trên Button sẽ khác với các trường trên các components khác; ví dụ, một type TextField có thể có cùng các trường đó cộng thêm một trường placeholder. Mỗi type mà chúng ta muốn vẽ trên màn hình sẽ implement trait Draw nhưng sẽ sử dụng code khác nhau trong method draw để định nghĩa cách vẽ type cụ thể đó, như Button ở đây. Type Button, ví dụ, có thể có một impl block bổ sung chứa các methods liên quan đến điều gì xảy ra khi người dùng nhấp vào button. Những loại methods này sẽ không áp dụng cho các types như TextField.</p>

<p>Nếu ai đó sử dụng thư viện của chúng ta quyết định implement một struct SelectBox có các trường width, height và options, họ sẽ implement trait Draw trên type SelectBox cũng, như trong Listing 18-8.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use gui::Draw;

struct SelectBox {
    width: u32,
    height: u32,
    options: Vec&lt;String&gt;,
}

impl Draw for SelectBox {
    fn draw(&self) {
        // code to actually draw a select box
    }
}</code></pre>
</div>
<p><em>Listing 18-8: Một crate khác sử dụng gui và implement trait Draw trên một struct SelectBox</em></p>

<p>Người dùng thư viện của chúng ta bây giờ có thể viết main function của họ để tạo một Screen instance. Đến Screen instance, họ có thể thêm một SelectBox và một Button bằng cách đặt mỗi cái trong một Box&lt;T&gt; để trở thành một trait object. Sau đó họ có thể gọi method run trên Screen instance, sẽ gọi draw trên mỗi component. Listing 18-9 thể hiện implementation này.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use gui::{Button, Screen};

fn main() {
    let screen = Screen {
        components: vec![
            Box::new(SelectBox {
                width: 75,
                height: 10,
                options: vec![
                    String::from("Yes"),
                    String::from("Maybe"),
                    String::from("No"),
                ],
            }),
            Box::new(Button {
                width: 50,
                height: 10,
                label: String::from("OK"),
            }),
        ],
    };

    screen.run();
}</code></pre>
</div>
<p><em>Listing 18-9: Sử dụng trait objects để lưu trữ giá trị của các types khác nhau implement cùng một trait</em></p>

<p>Khi chúng ta viết thư viện, chúng ta không biết rằng ai đó có thể thêm type SelectBox, nhưng Screen implementation của chúng ta có thể hoạt động trên type mới và vẽ nó vì SelectBox implement trait Draw, có nghĩa là nó implement method draw.</p>

<p>Concept này—của việc chỉ quan tâm đến messages mà một value respond thay vì concrete type của value—tương tự với concept của duck typing trong các ngôn ngữ dynamically typed: Nếu nó đi như con vịt và kêu như con vịt, thì nó phải là con vịt! Trong implementation của run trên Screen trong Listing 18-5, run không cần biết concrete type của mỗi component là gì. Nó không kiểm tra xem một component là instance của Button hay SelectBox, nó chỉ gọi method draw trên component. Bằng cách chỉ định Box&lt;dyn Draw&gt; như type của các giá trị trong vector components, chúng ta đã định nghĩa Screen cần các giá trị mà chúng ta có thể gọi method draw trên đó.</p>

<p>Ưu điểm của việc sử dụng trait objects và hệ thống kiểu của Rust để viết code tương tự với code sử dụng duck typing là chúng ta không bao giờ phải kiểm tra xem một value implement một method cụ thể tại runtime hoặc lo lắng về việc nhận được lỗi nếu một value không implement method nhưng chúng ta gọi nó. Rust sẽ không biên dịch code của chúng ta nếu các values không implement các traits mà trait objects cần.</p>

<p>Ví dụ, Listing 18-10 cho thấy điều gì xảy ra nếu chúng ta cố gắng tạo một Screen với một String như một component.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code> [Mã này không biên dịch được!]
use gui::Screen;

fn main() {
    let screen = Screen {
        components: vec![Box::new(String::from("Hi"))],
    };

    screen.run();
}</code></pre>
</div>
<p><em>Listing 18-10: Cố gắng sử dụng một type không implement trait của trait object</em></p>

<p>Chúng ta sẽ nhận được lỗi này vì String không implement trait Draw:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>$ cargo run
   Compiling gui v0.1.0 (file:///projects/gui)
error[E0277]: the trait bound \`String: Draw\` is not satisfied
   --> src/main.rs:5:26
    |
5  |         components: vec![Box::new(String::from("Hi"))],
    |                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ the trait \`Draw\` is not implemented for \`String\`
    |
    = help: the trait \`Draw\` is implemented for \`Button\`
    = note: required for the cast from \`Box&lt;String&gt;\` to \`Box&lt;dyn Draw&gt;\`

For more information about this error, try \`rustc --explain E0277\`.
error: could not compile \`gui\` (bin "gui") due to 1 previous request_error</code></pre>
</div>

<p>Lỗi này cho chúng ta biết rằng chúng ta đang truyền thứ gì đó cho Screen mà chúng ta không có ý định truyền và nên truyền một type khác, hoặc chúng ta nên implement Draw trên String để Screen có thể gọi draw trên nó.</p>

<h3 class="task-heading">Thực Hiện Dynamic Dispatch</h3>
<p>Nhớ lại trong "Performance of Code Using Generics" ở Chương 10 cuộc thảo luận của chúng ta về quá trình monomorphization được thực hiện trên generics bởi compiler: Compiler tạo ra các implementations không generic của functions và methods cho mỗi concrete type mà chúng ta sử dụng thay vì một generic type parameter. Code kết quả từ monomorphization đang thực hiện static dispatch, là khi compiler biết bạn đang gọi method nào tại thời điểm biên dịch. Điều này đối lập với dynamic dispatch, là khi compiler không thể biết tại thời điểm biên dịch bạn đang gọi method nào. Trong các trường hợp dynamic dispatch, compiler phát ra code mà tại runtime sẽ biết method nào để gọi.</p>

<p>Khi chúng ta sử dụng trait objects, Rust phải sử dụng dynamic dispatch. Compiler không biết tất cả các types có thể được sử dụng với code đang sử dụng trait objects, vì vậy nó không biết method nào được implement trên type nào để gọi. Thay vào đó, tại runtime, Rust sử dụng các pointers bên trong trait object để biết method nào để gọi. Việc tra cứu này gây ra chi phí runtime không xảy ra với static dispatch. Dynamic dispatch cũng ngăn compiler chọn inline code của một method, điều này lại ngăn một số tối ưu hóa, và Rust có một số quy tắc về nơi bạn có thể và không thể sử dụng dynamic dispatch, được gọi là dyn compatibility. Các quy tắc đó nằm ngoài phạm vi của cuộc thảo luận này, nhưng bạn có thể đọc thêm về chúng trong tài liệu tham khảo. Tuy nhiên, chúng ta đã có được tính linh hoạt bổ sung trong code mà chúng ta viết trong Listing 18-5 và có thể hỗ trợ trong Listing 18-9, vì vậy đó là một trade-off cần xem xét.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Trait Objects:</strong>
  <ul>
    <li><strong>trait dyn Trait</strong> - Dynamic dispatch với trait objects</li>
    <li><strong>Box&lt;dyn Trait&gt;</strong> - Pointer đến bất kỳ type nào implement trait</li>
    <li><strong>Runtime lookup</strong> - Tìm method tại runtime thay vì compile time</li>
    <li><strong>Static dispatch</strong> - Generics với monomorphization (nhanh hơn)</li>
    <li><strong>Dynamic dispatch</strong> - Trait objects (linh hoạt hơn, chậm hơn)</li>
    <li><strong>Duck typing</strong> - "Nếu đi như vịt và kêu như vịt, thì là vịt"</li>
  </ul>
</div>
`,
            defaultCode: `// Demo: Trait Objects với GUI
trait Draw {
    fn draw(&self);
}

struct Button {
    width: u32,
    height: u32,
    label: String,
}

impl Draw for Button {
    fn draw(&self) {
        println!("Drawing Button: {}x{} - {}",
            self.width, self.height, self.label);
    }
}

struct SelectBox {
    width: u32,
    height: u32,
    options: Vec<String>,
}

impl Draw for SelectBox {
    fn draw(&self) {
        println!("Drawing SelectBox: {}x{} - {:?}",
            self.width, self.height, self.options);
    }
}

struct Screen {
    components: Vec<Box<dyn Draw>>,
}

impl Screen {
    fn add(&mut self, component: Box<dyn Draw>) {
        self.components.push(component);
    }

    fn run(&self) {
        for component in &self.components {
            component.draw();
        }
    }
}

fn main() {
    let mut screen = Screen {
        components: Vec::new(),
    };

    screen.add(Box::new(Button {
        width: 50,
        height: 10,
        label: "OK".to_string(),
    }));

    screen.add(Box::new(SelectBox {
        width: 75,
        height: 10,
        options: vec!["Yes".to_string(), "No".to_string()],
    }));

    screen.run();
}
`,
            expectedOutput: `Drawing Button: 50x10 - OK
Drawing SelectBox: 75x10 - ["Yes", "No"]`
        };
