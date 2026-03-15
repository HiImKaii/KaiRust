import { Lesson } from '../../courses';

export const ch19_01: Lesson = {
            id: '19-01',
            title: '19.1 Tất cả các nơi có thể sử dụng Patterns',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Patterns xuất hiện ở nhiều nơi trong Rust, và bạn đã sử dụng chúng rất nhiều mà có thể không nhận ra! Phần này sẽ thảo luận về tất cả các vị trí mà patterns có hiệu lực.</p>

<h3 class="task-heading">Match Arms</h3>
<p>Như đã thảo luận trong Chương 6, chúng ta sử dụng patterns trong các arms của biểu thức match. Về mặt hình thức, biểu thức match được định nghĩa bao gồm từ khóa match, giá trị để so khớp, và một hoặc nhiều match arms bao gồm một pattern và một biểu thức để chạy nếu giá trị khớp với pattern của arm đó, như sau:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>match VALUE {
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
}</code></pre>
</div>

<p>Ví dụ, đây là biểu thức match từ Listing 6-5 so khớp với giá trị Option&lt;i32&gt; trong biến x:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>match x {
    None => None,
    Some(i) => Some(i + 1),
}</code></pre>
</div>

<p>Các patterns trong biểu thức match này là None và Some(i) ở bên trái của mỗi mũi tên.</p>

<p>Một yêu cầu đối với biểu thức match là chúng cần phải exhaustive (toàn diện) theo nghĩa rằng tất cả các khả năng cho giá trị trong biểu thức match phải được xử lý. Một cách để đảm bảo bạn đã bao quát mọi khả năng là có một catch-all pattern cho arm cuối cùng: Ví dụ, một tên biến khớp với bất kỳ giá trị nào không bao giờ thất bại và do đó bao quát mọi trường hợp còn lại.</p>

<p>Pattern đặc biệt _ sẽ khớp với bất cứ thứ gì, nhưng nó không bind đến biến nào, vì vậy nó thường được sử dụng trong arm match cuối cùng. Pattern _ có thể hữu ích khi bạn muốn bỏ qua bất kỳ giá trị nào không được chỉ định, ví dụ. Chúng ta sẽ tìm hiểu chi tiết hơn về pattern _ trong phần "Ignoring Values in a Pattern" (Bỏ qua giá trị trong Pattern) ở phần sau trong chương này.</p>

<h3 class="task-heading">let Statements</h3>
<p>Trước chương này, chúng ta mới chỉ thảo luận rõ ràng về việc sử dụng patterns với match và if let, nhưng thực tế chúng ta đã sử dụng patterns ở những nơi khác nữa, bao gồm trong các câu lệnh let. Ví dụ, hãy xem xét phép gán biến đơn giản này với let:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 5;</code></pre>
</div>

<p>Mỗi khi bạn đã sử dụng câu lệnh let như thế này, bạn đã sử dụng patterns, mặc dù có thể bạn không nhận ra! Một cách chính thức hơn, câu lệnh let có dạng như sau:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let PATTERN = EXPRESSION;</code></pre>
</div>

<p>Trong các câu lệnh như let x = 5; với một tên biến ở vị trí PATTERN, tên biến chỉ là một dạng đặc biệt đơn giản nhất của một pattern. Rust so sánh biểu thức với pattern và gán bất kỳ tên nào nó tìm thấy. Vì vậy, trong ví dụ let x = 5;, x là một pattern có nghĩa là "bind cái gì khớp ở đây vào biến x". Vì tên x là toàn bộ pattern, pattern này thực tế có nghĩa là "bind mọi thứ vào biến x, bất kể giá trị là gì".</p>

<p>Để thấy rõ hơn khía cạnh pattern-matching của let, hãy xem Listing 19-1, sử dụng một pattern với let để destructure một tuple.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let (x, y, z) = (1, 2, 3);</code></pre>
</div>
<p><em>Listing 19-1: Sử dụng pattern để destructure một tuple và tạo ba biến cùng lúc</em></p>

<p>Ở đây, chúng ta khớp một tuple với một pattern. Rust so sánh giá trị (1, 2, 3) với pattern (x, y, z) và thấy rằng giá trị khớp với pattern—nghĩa là, nó thấy rằng số lượng phần tử giống nhau trong cả hai, nên Rust bind 1 vào x, 2 vào y, và 3 vào z. Bạn có thể coi pattern tuple này như lồng ba pattern biến đơn lẻ bên trong nó.</p>

<p>Nếu số lượng phần tử trong pattern không khớp với số lượng phần tử trong tuple, kiểu tổng thể sẽ không khớp và chúng ta sẽ nhận được một lỗi compiler. Ví dụ, Listing 19-2 cho thấy một nỗ lực destructure một tuple có ba phần tử thành hai biến, điều này sẽ không hoạt động.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Mã này không biên dịch được!]
let (x, y) = (1, 2, 3);</code></pre>
</div>
<p><em>Listing 19-2: Tạo pattern không chính xác với số biến không khớp với số phần tử trong tuple</em></p>

<p>Cố gắng biên dịch mã này sẽ dẫn đến lỗi kiểu này:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>$ cargo run
   Compiling patterns v0.1.0 (file:///projects/patterns)
error[E0308]: mismatched types
 --> src/main.rs:2:9
  |
2 |     let (x, y) = (1, 2, 3);
  |         ^^^^^^   --------- this expression has type \`({integer}, {integer}, {integer})\`
  |         |
  |         expected a tuple with 3 elements, found one with 2 elements
  |
  = note: expected tuple \`({integer}, {integer}, {integer})\`
             found tuple \`(_, _)\`

For more information about this error, try \`rustc --explain E0308\`.
error: could not compile \`patterns\` (bin "patterns") due to 1 previous error</code></pre>
</div>

<p>Để sửa lỗi này, chúng ta có thể bỏ qua một hoặc nhiều giá trị trong tuple bằng cách sử dụng _ hoặc .., như bạn sẽ thấy trong phần "Ignoring Values in a Pattern". Nếu vấn đề là chúng ta có quá nhiều biến trong pattern, giải pháp là làm cho các kiểu khớp bằng cách loại bỏ các biến để số lượng biến bằng số lượng phần tử trong tuple.</p>

<h3 class="task-heading">Conditional if let Expressions</h3>
<p>Trong Chương 6, chúng ta đã thảo luận cách sử dụng biểu thức if let chủ yếu như một cách ngắn hơn để viết tương đương với match chỉ khớp một trường hợp. Tùy chọn, if let có thể có một else tương ứng chứa code để chạy nếu pattern trong if let không khớp.</p>

<p>Listing 19-3 cho thấy cũng có thể trộn lẫn if let, else if, và else if let. Làm như vậy cho chúng ta linh hoạt hơn so với biểu thức match trong đó chúng ta chỉ có thể biểu thị một giá trị để so sánh với các patterns. Ngoài ra, Rust không yêu cầu các điều kiện trong một chuỗi if let, else if, và else if let arms phải liên quan đến nhau.</p>

<p>Code trong Listing 19-3 xác định màu nào để làm màu nền dựa trên một chuỗi các điều kiện. Ví dụ này, chúng ta đã tạo các biến với các giá trị cố định mà một chương trình thực có thể nhận được từ đầu vào của người dùng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let favorite_color: Option<&str> = None;
    let is_tuesday = false;
    let age: Result<u8, _> = "34".parse();

    if let Some(color) = favorite_color {
        println!("Using your favorite color, {color}, as the background");
    } else if is_tuesday {
        println!("Tuesday is green day!");
    } else if let Ok(age) = age {
        if age > 30 {
            println!("Using purple as the background color");
        } else {
            println!("Using orange as the background color");
        }
    } else {
        println!("Using blue as the background color");
    }
}</code></pre>
</div>
<p><em>Listing 19-3: Trộn lẫn if let, else if, else if let, và else</em></p>

<p>Nếu người dùng chỉ định một màu yêu thích, màu đó được sử dụng làm màu nền. Nếu không có màu yêu thích nào được chỉ định và hôm nay là thứ Ba, màu nền là màu xanh lục. Nếu người dùng chỉ định tuổi của họ dưới dạng chuỗi và chúng ta có thể phân tích nó thành số thành công, màu là màu tím hoặc màu cam tùy thuộc vào giá trị của số đó. Nếu không có điều kiện nào trong số này áp dụng, màu nền là màu xanh lam.</p>

<p>Cấu trúc điều kiện này cho phép chúng ta hỗ trợ các yêu cầu phức tạp. Với các giá trị cố định chúng ta có ở đây, ví dụ này sẽ in "Using purple as the background color".</p>

<p>Bạn có thể thấy rằng if let cũng có thể tạo các biến mới shadow các biến hiện có theo cách tương tự như các match arms: Dòng if let Ok(age) = age tạo một biến age mới chứa giá trị bên trong variant Ok, shadow biến age hiện có. Điều này có nghĩa là chúng ta cần đặt điều kiện if age > 30 trong khối đó: Chúng ta không thể kết hợp hai điều kiện này thành if let Ok(age) = age && age > 30. Biến age mới mà chúng ta muốn so sánh với 30 không hợp lệ cho đến khi phạm vi mới bắt đầu với dấu ngoặc nhọn.</p>

<p>Nhược điểm của việc sử dụng biểu thức if let là compiler không kiểm tra tính exhaustive, trong khi với các biểu thức match thì nó có. Nếu chúng ta bỏ qua khối else cuối cùng và do đó bỏ sót một số trường hợp, compiler sẽ không cảnh báo chúng ta về logic bug có thể xảy ra.</p>

<h3 class="task-heading">while let Conditional Loops</h3>
<p>Tương tự về cấu trúc với if let, vòng lặp while let cho phép vòng while chạy miễn là pattern tiếp tục khớp. Trong Listing 19-4, chúng ta cho thấy một vòng lặp while let đợi các tin nhắn được gửi giữa các threads, nhưng trong trường hợp này kiểm tra một Result thay vì Option.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let (tx, rx) = std::sync::mpsc::channel();
std::thread::spawn(move || {
    for val in [1, 2, 3] {
        tx.send(val).unwrap();
    }
});

while let Ok(value) = rx.recv() {
    println!("{value}");
}</code></pre>
</div>
<p><em>Listing 19-4: Sử dụng vòng lặp while let để in các giá trị miễn là rx.recv() trả về Ok</em></p>

<p>Ví dụ này in 1, 2, và sau đó 3. Phương thức recv lấy tin nhắn đầu tiên ra khỏi phía receiver của channel và trả về Ok(value). Khi chúng ta lần đầu tiên thấy recv trong Chương 16, chúng ta unwrap lỗi trực tiếp, hoặc chúng ta tương tác với nó như một iterator sử dụng vòng lặp for. Tuy nhiên, như Listing 19-4 cho thấy, chúng ta cũng có thể sử dụng while let, vì phương thức recv trả về Ok mỗi khi một tin nhắn đến, miễn là sender tồn tại, và sau đó tạo ra một Err một khi phía sender ngắt kết nối.</p>

<h3 class="task-heading">for Loops</h3>
<p>Trong vòng lặp for, giá trị ngay sau từ khóa for là một pattern. Ví dụ, trong for x in y, x là pattern. Listing 19-5 minh họa cách sử dụng pattern trong vòng lặp for để destructure, hoặc tách ra, một tuple như một phần của vòng lặp for.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v = vec!['a', 'b', 'c'];

for (index, value) in v.iter().enumerate() {
    println!("{value} is at index {index}");
}</code></pre>
</div>
<p><em>Listing 19-5: Sử dụng pattern trong vòng lặp for để destructure một tuple</em></p>

<p>Code trong Listing 19-5 sẽ in ra như sau:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>$ cargo run
   Compiling patterns v0.1.0 (file:///projects/patterns)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.52s
     Running \`target/debug/patterns\`
a is at index 0
b is at index 1
c is at index 2</code></pre>
</div>

<p>Chúng ta điều chỉnh một iterator bằng phương thức enumerate để nó tạo ra một giá trị và chỉ mục cho giá trị đó, được đặt vào một tuple. Giá trị đầu tiên được tạo ra là tuple (0, 'a'). Khi giá trị này được khớp với pattern (index, value), index sẽ là 0 và value sẽ là 'a', in ra dòng đầu tiên của kết quả.</p>

<h3 class="task-heading">Function Parameters</h3>
<p>Tham số hàm cũng có thể là patterns. Code trong Listing 19-6, khai báo một hàm tên là foo nhận một tham số tên là x có kiểu i32, bây giờ nên trông quen thuộc.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn foo(x: i32) {
    // code goes here
}</code></pre>
</div>
<p><em>Listing 19-6: Chữ ký hàm sử dụng patterns trong các tham số</em></p>

<p>Phần x là một pattern! Giống như với let, chúng ta có thể khớp một tuple trong các đối số của hàm với pattern. Listing 19-7 tách các giá trị trong một tuple khi chúng ta truyền nó cho một hàm.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn print_coordinates(&(x, y): &(i32, i32)) {
    println!("Current location: ({x}, {y})");
}

fn main() {
    let point = (3, 5);
    print_coordinates(&point);
}</code></pre>
</div>
<p><em>Listing 19-7: Một hàm với các tham số destructure một tuple</em></p>

<p>Code này in "Current location: (3, 5)". Các giá trị &(3, 5) khớp với pattern &(x, y), nên x là giá trị 3 và y là giá trị 5.</p>

<p>Chúng ta cũng có thể sử dụng patterns trong danh sách tham số closure theo cùng cách như trong danh sách tham số hàm vì closures tương tự như các hàm, như đã thảo luận trong Chương 13.</p>

<p>Đến đây, bạn đã thấy một số cách để sử dụng patterns, nhưng patterns không hoạt động giống nhau ở mọi nơi chúng ta có thể sử dụng chúng. Ở một số vị trí, patterns phải là irrefutable; trong các trường hợp khác, chúng có thể là refutable. Chúng ta sẽ thảo luận hai khái niệm này tiếp theo.</p>
`,
            defaultCode: `// Demo: Tất cả các nơi sử dụng Patterns

fn print_coords(&(x, y): &(i32, i32)) {
    println!("Vị trí hiện tại: ({x}, {y})");
}

fn main() {
    // 1. let statements với destructuring
    let (x, y, z) = (1, 2, 3);
    println!("Tuple: x={x}, y={y}, z={z}");

    // 2. match arms
    let number = 5;
    match number {
        1 => println!("Một"),
        2 => println!("Hai"),
        3 => println!("Ba"),
        _ => println!("Khác"),
    }

    // 3. if let
    let config: Option<&str> = Some("dark-mode");
    if let Some(theme) = config {
        println!("Theme: {theme}");
    }

    // 4. while let
    let mut stack = vec![1, 2, 3];
    while let Some(top) = stack.pop() {
        println!("Pop: {top}");
    }

    // 5. for loops
    let colors = vec!["red", "green", "blue"];
    for (i, color) in colors.iter().enumerate() {
        println!("{i}: {color}");
    }

    // 6. function parameters
    let point = (3, 5);
    print_coords(&point);
}
`,
            expectedOutput: `Tuple: x=1, y=2, z=3
Một
Hai
Ba
Khác
Theme: dark-mode
Pop: 3
Pop: 2
Pop: 1
0: red
1: green
2: blue
Vị trí hiện tại: (3, 5)`
        };
