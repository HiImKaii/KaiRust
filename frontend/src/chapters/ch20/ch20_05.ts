import { Lesson } from '../../courses';

export const ch20_05: Lesson = {
            id: '20-05',
            title: '20.5 Macros',
            duration: '45 phút',
            type: 'theory',
            content: `
<p>Chúng ta đã sử dụng các macros như println! xuyên suốt cuốn sách, nhưng chúng ta chưa khám phá đầy đủ macro là gì và nó hoạt động như thế nào. Thuật ngữ macro đề cập đến một họ các tính năng trong Rust — declarative macros với macro_rules! và ba loại procedural macros:</p>

<ul>
  <li>Custom #[derive] macros - các macro chỉ định code được thêm với thuộc tính derive được sử dụng trên structs và enums</li>
  <li>Attribute-like macros - các macro định nghĩa các thuộc tính tùy chỉnh có thể sử dụng trên bất kỳ item nào</li>
  <li>Function-like macros - các macro trông giống như function calls nhưng operate trên các tokens được chỉ định như argument của chúng</li>
</ul>

<p>Chúng ta sẽ nói về từng loại này, nhưng trước tiên, hãy xem tại sao chúng ta cần macros khi đã có functions.</p>

<h3 class="task-heading">Sự Khác Biệt Giữa Macros và Functions</h3>
<p>Về cơ bản, macros là một cách để viết code mà viết ra code khác, được gọi là metaprogramming. Trong Appendix C, chúng ta đã thảo luận về thuộc tính derive, tạo ra implementation của các traits cho bạn. Chúng ta cũng đã sử dụng các macros như println! và vec! xuyên suốt cuốn sách. Tất cả các macros này mở rộng để tạo ra nhiều code hơn so với code bạn đã viết thủ công.</p>

<p>Metaprogramming hữu ích để giảm lượng code bạn phải viết và duy trì, cũng là một trong những vai trò của functions. Tuy nhiên, macros có một số khả năng bổ sung mà functions không có.</p>

<p>Function signature phải khai báo số lượng và kiểu của các parameters mà function có. Mặt khác, macros có thể nhận số lượng parameters thay đổi: Chúng ta có thể gọi println!("hello") với một argument hoặc println!("hello {}", name) với hai arguments. Ngoài ra, macros được mở rộng trước khi compiler diễn giải ý nghĩa của code, vì vậy một macro có thể, ví dụ, implement một trait trên một kiểu cho trước. Một function không thể làm điều đó, vì nó được gọi tại runtime và một trait cần được implement tại compile time.</p>

<p>Nhược điểm của việc implement một macro thay vì một function là các định nghĩa macro phức tạp hơn các định nghĩa function vì bạn đang viết Rust code mà viết ra Rust code. Do sự gián tiếp này, các định nghĩa macro nói chung khó đọc, khó hiểu và khó duy trì hơn các định nghĩa function.</p>

<p>Một sự khác biệt quan trọng khác giữa macros và functions là bạn phải định nghĩa macros hoặc đưa chúng vào scope trước khi gọi chúng trong một file, trái ngược với functions mà bạn có thể định nghĩa ở bất kỳ đâu và gọi ở bất kỳ đâu.</p>

<h3 class="task-heading">Declarative Macros cho General Metaprogramming</h3>
<p>Dạng macros được sử dụng rộng rãi nhất trong Rust là declarative macro. Chúng còn được gọi là "macros by example," "macro_rules! macros," hoặc đơn giản là "macros." Về cốt lõi, declarative macros cho phép bạn viết một cái gì đó tương tự như một Rust match expression. Như đã thảo luận trong Chương 6, match expressions là các cấu trúc điều khiển nhận một expression, so sánh giá trị kết quả của expression với các patterns, sau đó chạy code liên kết với matching pattern. Macros cũng so sánh một giá trị với các patterns được liên kết với code cụ thể: Trong tình huống này, giá trị là literal Rust source code được truyền cho macro; các patterns được so sánh với cấu trúc của source code đó; và code liên kết với mỗi pattern, khi khớp, sẽ thay thế code được truyền cho macro. Tất cả điều này xảy ra trong quá trình biên dịch.</p>

<p>Để định nghĩa một macro, bạn sử dụng cấu trúc macro_rules!. Hãy khám phá cách sử dụng macro_rules! bằng cách xem cách macro vec! được định nghĩa. Chương 8 đã trình bày cách chúng ta có thể sử dụng macro vec! để tạo một vector mới với các giá trị cụ thể. Ví dụ, macro sau tạo một vector mới chứa ba số nguyên:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v: Vec&lt;u32&gt; = vec![1, 2, 3];</code></pre>
</div>

<p>Chúng ta cũng có thể sử dụng macro vec! để tạo một vector gồm hai số nguyên hoặc một vector gồm năm string slices. Chúng ta không thể sử dụng một function để làm điều tương tự vì chúng ta không biết trước số lượng hoặc kiểu của các giá trị.</p>

<p>Listing dưới đây cho thấy một phiên bản hơi đơn giản hóa của định nghĩa macro vec!.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}</code></pre>
</div>

<p>Ghi chú: Định nghĩa thực tế của macro vec! trong thư viện chuẩn bao gồm code để pre-allocate đúng lượng bộ nhớ từ trước. Code đó là một tối ưu hóa mà chúng ta không bao gồm ở đây, để làm cho ví dụ đơn giản hơn.</p>

<p>Chú thích #[macro_export] chỉ ra rằng macro này nên được cung cấp bất cứ khi nào crate mà macro được định nghĩa được đưa vào scope. Nếu không có chú thích này, macro không thể được đưa vào scope.</p>

<p>Sau đó chúng ta bắt đầu định nghĩa macro với macro_rules! và tên của macro mà chúng ta đang định nghĩa không có dấu chấm than. Tên, trong trường hợp này là vec, được theo sau bởi các dấu ngoặc nhọn biểu thị body của định nghĩa macro.</p>

<p>Cấu trúc trong body của vec! tương tự như cấu trúc của một match expression. Ở đây chúng ta có một arm với pattern ( $( $x:expr ),* ), theo sau bởi => và khối code liên kết với pattern này. Nếu pattern khớp, khối code liên kết sẽ được phát ra. Vì đây là pattern duy nhất trong macro này, chỉ có một cách hợp lệ để khớp; bất kỳ pattern nào khác sẽ dẫn đến lỗi. Các macros phức tạp hơn sẽ có nhiều hơn một arm.</p>

<p>Cú pháp pattern hợp lệ trong định nghĩa macro khác với cú pháp pattern được đề cập trong Chương 19 vì các macro patterns được so khớp với cấu trúc code Rust thay vì các giá trị. Hãy đi qua từng phần của pattern có nghĩa gì; để biết đầy đủ cú pháp macro pattern, hãy xem Rust Reference.</p>

<p>Đầu tiên, chúng ta sử dụng một tập hợp các dấu ngoặc đơn để bao quanh toàn bộ pattern. Chúng ta sử dụng dấu dollar ($) để khai báo một biến trong hệ thống macro sẽ chứa Rust code khớp với pattern. Dấu dollar làm rõ rằng đây là một biến macro thay vì một biến Rust thông thường. Tiếp theo là một tập hợp các dấu ngoặc đơn nắm bắt các giá trị khớp với pattern trong ngoặc để sử dụng trong code thay thế. Trong $() là $x:expr, khớp với bất kỳ Rust expression nào và đặt tên expression đó là $x.</p>

<p>Dấu phẩy theo sau $() chỉ ra rằng một ký tự dấu phẩy literal phải xuất hiện giữa mỗi instance của code khớp với code trong $(). Dấu * chỉ định rằng pattern khớp với không hoặc nhiều hơn của bất cứ điều gì đứng trước dấu *.</p>

<p>Khi chúng ta gọi macro này với vec![1, 2, 3];, pattern $x khớp ba lần với ba expressions 1, 2, và 3.</p>

<p>Bây giờ hãy xem pattern trong body của code liên kết với arm này: temp_vec.push() trong $* được tạo ra cho mỗi phần khớp với $() trong pattern không hoặc nhiều lần tùy thuộc vào số lần pattern khớp. $x được thay thế bằng mỗi expression khớp. Khi chúng ta gọi macro này với vec![1, 2, 3];, code được tạo ra thay thế cho macro call này sẽ là:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>{
    let mut temp_vec = Vec::new();
    temp_vec.push(1);
    temp_vec.push(2);
    temp_vec.push(3);
    temp_vec
}</code></pre>
</div>

<p>Chúng ta đã định nghĩa một macro có thể nhận bất kỳ số lượng arguments nào của bất kỳ kiểu nào và có thể tạo code để tạo một vector chứa các elements được chỉ định.</p>

<h3 class="task-heading">Procedural Macros để Generate Code từ Attributes</h3>
<p>Dạng thứ hai của macros là procedural macro, hoạt động giống như một function (và là một loại procedure). Procedural macros chấp nhận một số code như input, operate trên code đó, và produce một số code như output thay vì so khớp với patterns và thay thế code bằng code khác như declarative macros. Ba loại procedural macros là custom derive, attribute-like, và function-like, và tất cả đều hoạt động theo cách tương tự.</p>

<p>Khi tạo procedural macros, các định nghĩa phải nằm trong crate riêng của chúng với một loại crate đặc biệt. Điều này là vì những lý do kỹ thuật phức tạp mà chúng ta hy vọng sẽ loại bỏ trong tương lai.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use proc_macro::TokenStream;

#[some_attribute]
pub fn some_name(input: TokenStream) -> TokenStream {
}</code></pre>
</div>

<p>Function định nghĩa một procedural macro nhận một TokenStream làm input và produces một TokenStream làm output. Kiểu TokenStream được định nghĩa bởi proc_macro crate được bao gồm với Rust và đại diện cho một chuỗi các tokens. Đây là phần cốt lõi của macro: Source code mà macro đang operate trên tạo thành input TokenStream, và code mà macro produce là output TokenStream. Function cũng có một attribute gắn vào chỉ định loại procedural macro mà chúng ta đang tạo.</p>

<h4 class="task-heading">Custom Derive Macros</h4>
<p>Hãy tạo một crate tên là hello_macro định nghĩa một trait tên là HelloMacro với một associated function tên là hello_macro. Thay vì yêu cầu người dùng implement HelloMacro trait cho mỗi kiểu của họ, chúng ta sẽ cung cấp một procedural macro để người dùng có thể annotate kiểu của họ với #[derive(HelloMacro)] để có một default implementation của hello_macro function. Default implementation sẽ in "Hello, Macro! My name is TypeName!" trong đó TypeName là tên của kiểu mà trait này được định nghĩa.</p>

<p>Trước tiên, hãy định nghĩa HelloMacro trait và associated function của nó:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait HelloMacro {
    fn hello_macro();
}</code></pre>
</div>

<p>Bây giờ, chúng ta cần định nghĩa procedural macro. Tại thời điểm viết bài này, procedural macros cần phải nằm trong crate riêng của chúng. Quy ước cho cấu trúc crates và macro crates như sau: cho một crate tên là foo, custom derive procedural macro crate được gọi là foo_derive.</p>

<p>Chúng ta cần khai báo hello_macro_derive crate như một procedural macro crate. Chúng ta cũng cần chức năng từ các crates syn và quote:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Trong hello_macro_derive/Cargo.toml
[lib]
proc-macro = true

[dependencies]
syn = "2.0"
quote = "1.0"</code></pre>
</div>

<p>Định nghĩa procedural macro:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // Xây dựng một đại diện của Rust code như một syntax tree
    // mà chúng ta có thể thao tác.
    let ast = syn::parse(input).unwrap();

    // Xây dựng trait implementation.
    impl_hello_macro(&ast)
}

fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let generated = quote! {
        impl HelloMacro for #name {
            fn hello_macro() {
                println!("Hello, Macro! My name is {}!", stringify!(#name));
            }
        }
    };
    generated.into()
}</code></pre>
</div>

<p>Chúng ta nhận được một Ident struct instance chứa tên (identifier) của annotated type bằng ast.ident. Macro quote! cho phép chúng ta định nghĩa Rust code mà chúng ta muốn return. Macro này cũng cung cấp một số cơ chế templating rất thú vị: Chúng ta có thể nhập #name, và quote! sẽ thay thế nó bằng giá trị trong biến name.</p>

<h4 class="task-heading">Attribute-Like Macros</h4>
<p>Attribute-like macros tương tự như custom derive macros, nhưng thay vì tạo code cho thuộc tính derive, chúng cho phép bạn tạo các thuộc tính mới. Chúng cũng linh hoạt hơn: derive chỉ hoạt động cho structs và enums; attributes có thể được áp dụng cho các items khác, chẳng hạn như functions.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[route(GET, "/")]
fn index() {
}</code></pre>
</div>

<p>Signature của macro definition function sẽ như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[proc_macro_attribute]
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {
}</code></pre>
</div>

<p>Ở đây, chúng ta có hai tham số kiểu TokenStream. Cái đầu tiên cho nội dung của attribute: phần GET, "/". Cái thứ hai là body của item mà attribute được gắn vào: trong trường hợp này, fn index() {} và phần còn lại của function body.</p>

<h4 class="task-heading">Function-Like Macros</h4>
<p>Function-like macros định nghĩa các macros trông giống như function calls. Tương tự như macro_rules! macros, chúng linh hoạt hơn functions; ví dụ, chúng có thể nhận số lượng arguments không xác định. Tuy nhiên, macro_rules! macros chỉ có thể được định nghĩa bằng cú pháp giống như match. Function-like macros nhận một tham số TokenStream, và định nghĩa của chúng thao tác TokenStream đó bằng Rust code.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let sql = sql!(SELECT * FROM posts WHERE id=1);</code></pre>
</div>

<p>Macro này sẽ parse SQL statement bên trong nó và kiểm tra cú pháp đúng. Macro sql! sẽ được định nghĩa như sau:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {
}</code></pre>
</div>

<h3 class="task-heading">Tóm tắt</h3>
<p>Bây giờ bạn đã có một số tính năng Rust trong toolbox của mình mà bạn có thể không sử dụng thường xuyên, nhưng bạn sẽ biết chúng có sẵn trong những hoàn cảnh rất cụ thể. Chúng ta đã giới thiệu một số chủ đề phức tạp để khi bạn gặp chúng trong các đề xuất error messages hoặc trong code của người khác, bạn sẽ có thể nhận ra các khái niệm và cú pháp này. Sử dụng chương này như một tài liệu tham khảo để hướng dẫn bạn đến các giải pháp.</p>
`,
            defaultCode: `// Macro Examples

// 1. Declarative Macro with macro_rules!
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

macro_rules! print_all {
    ($($item:expr),*) => {
        $(
            println!("{}", $item);
        )*
    };
}

// 2. Function-like procedural macro simulation
// (In real code, this would be a proc_macro)
macro_rules! sql {
    ($($sql:tt)*) => {
        format!("SQL: {}", stringify!($($sql)*))
    };
}

// 3. Using Macros
fn main() {
    // Using declarative macro
    let numbers = vec![1, 2, 3, 4, 5];
    println!("Vector created by macro: {:?}", numbers);

    let strings = vec!["hello", "world", "rust"];
    println!("String vector: {:?}", strings);

    // Using print_all macro
    println!("\\nPrinting multiple items:");
    print_all!("First", "Second", "Third");

    // Using sql-like macro
    let query = sql!(SELECT * FROM users WHERE id = 1);
    println!("\\n{}", query);

    // Practical example: debug print macro
    macro_rules! debug {
        ($name:expr, $value:expr) => {
            println!("DEBUG: {} = {:?}", $name, $value);
        };
    }

    let x = 42;
    let name = "Rust";
    debug!("x", x);
    debug!("name", name);

    // Macro with repetition
    macro_rules! create_tuple {
        ($($t:ty),*) => {
            ($($t::default(),)*)
        };
    }

    let tuple: (i32, String, bool) = create_tuple!(i32, String, bool);
    println!("\\nTuple from macro: {:?}", tuple);

    println!("\\nMacros completed!");
}
`,
            expectedOutput: `Vector created by macro: [1, 2, 3, 4, 5]
String vector: ["hello", "world", "rust"]

Printing multiple items:
First
Second
Third

SQL: SELECT * FROM users WHERE id = 1
DEBUG: x = 42
DEBUG: name = "Rust"

Tuple from macro: (0, "", false)

Macros completed!`
        };
