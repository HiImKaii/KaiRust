import { Lesson } from '../../courses';

export const ch19_03: Lesson = {
            id: '19-03',
            title: '19.3 Cú pháp Pattern',
            duration: '45 phút',
            type: 'theory',
            content: `
<p>Trong phần này, chúng ta tổng hợp tất cả cú pháp hợp lệ trong patterns và thảo luận tại sao và khi nào bạn có thể muốn sử dụng từng loại.</p>

<h3 class="task-heading">Matching Literals</h3>
<p>Như bạn đã thấy trong Chương 6, bạn có thể khớp patterns với các literals trực tiếp. Đoạn code sau đây cung cấp một số ví dụ:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 1;

match x {
    1 => println!("one"),
    2 => println!("two"),
    3 => println!("three"),
    _ => println!("anything"),
}</code></pre>
</div>

<p>Code này in "one" vì giá trị trong x là 1. Cú pháp này hữu ích khi bạn muốn code thực hiện một hành động cụ thể nếu nó nhận được một giá trị cụ thể.</p>

<h3 class="task-heading">Matching Named Variables</h3>
<p>Các named variables là irrefutable patterns khớp với bất kỳ giá trị nào, và chúng ta đã sử dụng chúng nhiều lần trong cuốn sách này. Tuy nhiên, có một sự phức tạp khi bạn sử dụng named variables trong match, if let, hoặc while let expressions. Bởi vì mỗi loại expression này bắt đầu một scope mới, các variables được khai báo như một phần của pattern bên trong các expressions này sẽ shadow các variables cùng tên bên ngoài các constructs, giống như với tất cả các variables. Trong Listing 19-11, chúng ta khai báo một variable tên là x với giá trị Some(5) và một variable y với giá trị 10. Sau đó, chúng ta tạo một match expression trên giá trị x. Hãy nhìn vào các patterns trong các match arms và println! ở cuối, và cố gắng tìm ra code sẽ in gì trước khi chạy code này hoặc đọc thêm.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = Some(5);
let y = 10;

match x {
    Some(50) => println!("Got 50"),
    Some(y) => println!("Matched, y = {y}"),
    _ => println!("Default case, x = {x:?}"),
}

println!("at the end: x = {x:?}, y = {y}");</code></pre>
</div>
<p><em>Listing 19-11: Một match expression với một arm giới thiệu một biến mới shadow biến y hiện có</em></p>

<p>Hãy đi qua những gì xảy ra khi match expression chạy. Pattern trong arm match đầu tiên không khớp với giá trị đã định nghĩa của x, nên code tiếp tục.</p>

<p>Pattern trong arm match thứ hai giới thiệu một biến mới tên là y sẽ khớp với bất kỳ giá trị nào bên trong một Some value. Bởi vì chúng ta đang ở trong một scope mới bên trong match expression, đây là một biến y mới, không phải y mà chúng ta đã khai báo ở đầu với giá trị 10. Binding y mới này sẽ khớp với bất kỳ giá trị nào bên trong Some, là những gì chúng ta có trong x. Do đó, y mới này bind với giá trị bên trong Some trong x. Giá trị đó là 5, vì vậy expression cho arm đó thực thi và in "Matched, y = 5".</p>

<p>Nếu x là giá trị None thay vì Some(5), các patterns trong hai arm đầu tiên sẽ không khớp, nên giá trị sẽ khớp với dấu gạch dưới. Chúng ta không giới thiệu biến x trong pattern của arm dấu gạch dưới, nên x trong expression vẫn là x bên ngoài chưa bị shadow. Trong trường hợp giả định này, match sẽ in "Default case, x = None".</p>

<p>Khi match expression kết thúc, scope của nó kết thúc, và scope của y bên trong cũng kết thúc. println! cuối cùng tạo ra "at the end: x = Some(5), y = 10".</p>

<p>Để tạo một match expression so sánh các giá trị của x và y bên ngoài, thay vì giới thiệu một biến mới shadow biến y hiện có, chúng ta sẽ cần sử dụng một match guard conditional thay vì. Chúng ta sẽ nói về match guards sau trong phần "Adding Conditionals with Match Guards".</p>

<h3 class="task-heading">Matching Multiple Patterns</h3>
<p>Trong match expressions, bạn có thể khớp nhiều patterns bằng cú pháp |, là toán tử or pattern. Ví dụ, trong đoạn code sau, chúng ta khớp giá trị của x với các match arms, arm đầu tiên có tùy chọn or, có nghĩa là nếu giá trị của x khớp với bất kỳ giá trị nào trong arm đó, code của arm đó sẽ chạy:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 1;

match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("anything"),
}</code></pre>
</div>

<p>Code này in "one or two".</p>

<h3 class="task-heading">Matching Ranges of Values with ..=</h3>
<p>Cú pháp ..= cho phép chúng ta khớp với một khoảng giá trị bao gồm cả hai đầu mút. Trong đoạn code sau, khi một pattern khớp với bất kỳ giá trị nào trong khoảng cho trước, arm đó sẽ thực thi:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 5;

match x {
    1..=5 => println!("one through five"),
    _ => println!("something else"),
}</code></pre>
</div>

<p>Nếu x là 1, 2, 3, 4, hoặc 5, arm đầu tiên sẽ khớp. Cú pháp này tiện lợi hơn cho nhiều giá trị match so với việc sử dụng toán tử | để biểu đạt cùng một ý tưởng; nếu chúng ta sử dụng |, chúng ta phải chỉ định 1 | 2 | 3 | 4 | 5. Việc chỉ định một khoảng ngắn hơn nhiều, đặc biệt nếu chúng ta muốn khớp, ví dụ, bất kỳ số nào giữa 1 và 1.000!</p>

<p>Compiler kiểm tra rằng khoảng không rỗng tại thời điểm biên dịch, và bởi vì các loại duy nhất mà Rust có thể cho biết khoảng có rỗng hay không là char và các giá trị số, các khoảng chỉ được phép với các giá trị số hoặc char.</p>

<p>Đây là một ví dụ sử dụng các khoảng giá trị char:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 'c';

match x {
    'a'..='j' => println!("early ASCII letter"),
    'k'..='z' => println!("late ASCII letter"),
    _ => println!("something else"),
}</code></pre>
</div>

<p>Rust có thể cho biết 'c' nằm trong khoảng của pattern đầu tiên và in "early ASCII letter".</p>

<h3 class="task-heading">Destructuring to Break Apart Values</h3>
<p>Chúng ta cũng có thể sử dụng patterns để destructure structs, enums, và tuples để sử dụng các phần khác nhau của các giá trị này. Hãy đi qua từng loại giá trị.</p>

<h4 class="task-heading">Structs</h4>
<p>Listing 19-12 cho thấy một Point struct với hai trường, x và y, mà chúng ta có thể tách ra bằng cách sử dụng một pattern với câu lệnh let.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x: a, y: b } = p;
    assert_eq!(0, a);
    assert_eq!(7, b);
}</code></pre>
</div>
<p><em>Listing 19-12: Destructure các trường của struct thành các biến riêng biệt</em></p>

<p>Code này tạo các biến a và b khớp với các giá trị của các trường x và y của struct p. Ví dụ này cho thấy rằng tên của các biến trong pattern không nhất thiết phải trùng với tên trường của struct. Tuy nhiên, việc khớp tên biến với tên trường là phổ biến để dễ nhớ biến nào đến từ trường nào. Bởi vì cách sử dụng phổ biến này, và bởi vì viết let Point { x: x, y: y } = p; chứa nhiều sự lặp lại, Rust có một cú pháp tắt cho các patterns khớp với các trường struct: Bạn chỉ cần liệt kê tên trường struct, và các biến được tạo từ pattern sẽ có cùng tên. Listing 19-13 hoạt động giống như code trong Listing 19-12, nhưng các biến được tạo trong let pattern là x và y thay vì a và b.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x, y } = p;
    assert_eq!(0, x);
    assert_eq!(7, y);
}</code></pre>
</div>
<p><em>Listing 19-13: Destructure các trường struct bằng cú pháp tắt tên trường</em></p>

<p>Chúng ta cũng có thể destructure với các giá trị literal như một phần của struct pattern thay vì tạo biến cho tất cả các trường. Làm như vậy cho phép chúng ta kiểm tra một số trường cho các giá trị cụ thể trong khi tạo biến để destructure các trường khác.</p>

<p>Trong Listing 19-14, chúng ta có một match expression tách các giá trị Point thành ba trường hợp: các điểm nằm trực tiếp trên trục x (đúng khi y = 0), trên trục y (x = 0), hoặc trên không trục nào.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let p = Point { x: 0, y: 7 };

    match p {
        Point { x, y: 0 } => println!("On the x axis at {x}"),
        Point { x: 0, y } => println!("On the y axis at {y}"),
        Point { x, y } => {
            println!("On neither axis: ({x}, {y})");
        }
    }
}</code></pre>
</div>
<p><em>Listing 19-14: Destructure và khớp các giá trị literal trong một pattern</em></p>

<p>Arm đầu tiên sẽ khớp với bất kỳ điểm nào trên trục x bằng cách chỉ định rằng trường y khớp nếu giá trị của nó khớp với literal 0. Pattern vẫn tạo một biến x mà chúng ta có thể sử dụng trong code cho arm này.</p>

<p>Tương tự, arm thứ hai khớp với bất kỳ điểm nào trên trục y bằng cách chỉ định rằng trường x khớp nếu giá trị của nó là 0 và tạo một biến y cho giá trị của trường y. Arm thứ ba không chỉ định bất kỳ literal nào, nên nó khớp với bất kỳ Point nào khác và tạo các biến cho cả trường x và y.</p>

<p>Trong ví dụ này, giá trị p khớp với arm thứ hai vì x chứa 0, nên code này sẽ in "On the y axis at 7".</p>

<p>Nhớ rằng một match expression dừng kiểm tra arms ngay khi nó tìm thấy pattern khớp đầu tiên, vì vậy mặc dù Point { x: 0, y: 0 } nằm trên cả trục x và trục y, code này chỉ sẽ in "On the x axis at 0".</p>

<h4 class="task-heading">Enums</h4>
<p>Chúng ta đã destructure enums trong cuốn sách này (ví dụ, Listing 6-5 trong Chương 6), nhưng chúng ta chưa thảo luận rõ ràng rằng pattern để destructure một enum tương ứng với cách dữ liệu được lưu trữ trong enum được định nghĩa. Ví dụ, trong Listing 19-15, chúng ta sử dụng Message enum từ Listing 6-2 và viết một match với các patterns sẽ destructure mỗi giá trị bên trong.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Message::ChangeColor(0, 160, 255);

    match msg {
        Message::Quit => {
            println!("The Quit variant has no data to destructure.");
        }
        Message::Move { x, y } => {
            println!("Move in the x direction {x} and in the y direction {y}");
        }
        Message::Write(text) => {
            println!("Text message: {text}");
        }
        Message::ChangeColor(r, g, b) => {
            println!("Change color to red {r}, green {g}, and blue {b}");
        }
    }
}</code></pre>
</div>
<p><em>Listing 19-15: Destructure các enum variants chứa các loại giá trị khác nhau</em></p>

<p>Code này sẽ in "Change color to red 0, green 160, and blue 255". Thay đổi giá trị của msg để xem code từ các arms khác chạy.</p>

<p>Đối với các enum variants không có dữ liệu, như Message::Quit, chúng ta không thể destructure giá trị thêm nữa. Chúng ta chỉ có thể khớp trên giá trị literal Message::Quit, và không có biến nào trong pattern đó.</p>

<p>Đối với các struct-like enum variants, như Message::Move, chúng ta có thể sử dụng một pattern tương tự như pattern chỉ định để khớp với structs. Sau tên variant, chúng ta đặt dấu ngoặc nhọn và sau đó liệt kê các trường với các biến để chúng ta tách các phần ra để sử dụng trong code cho arm này. Ở đây chúng ta sử dụng dạng tắt như trong Listing 19-13.</p>

<p>Đối với các tuple-like enum variants, như Message::Write chứa một tuple với một phần tử và Message::ChangeColor chứa một tuple với ba phần tử, pattern tương tự như pattern chỉ định để khớp với tuples. Số lượng biến trong pattern phải khớp với số lượng phần tử trong variant mà chúng ta đang khớp.</p>

<h4 class="task-heading">Nested Structs and Enums</h4>
<p>Cho đến nay, tất cả các ví dụ của chúng ta đều là khớp structs hoặc enums một cấp độ, nhưng khớp cũng có thể hoạt động trên các mục lồng nhau! Ví dụ, chúng ta có thể refactor code trong Listing 19-15 để hỗ trợ các màu RGB và HSV trong thông điệp ChangeColor, như được hiển thị trong Listing 19-16.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Color {
    Rgb(i32, i32, i32),
    Hsv(i32, i32, i32),
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(Color),
}

fn main() {
    let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));

    match msg {
        Message::ChangeColor(Color::Rgb(r, g, b)) => {
            println!("Change color to red {r}, green {g}, and blue {b}");
        }
        Message::ChangeColor(Color::Hsv(h, s, v)) => {
            println!("Change color to hue {h}, saturation {s}, value {v}");
        }
        _ => (),
    }
}</code></pre>
</div>
<p><em>Listing 19-16: Khớp trên các enums lồng nhau</em></p>

<p>Pattern của arm đầu tiên trong match expression khớp với một Message::ChangeColor enum variant chứa một Color::Rgb variant; sau đó, pattern bind với ba giá trị i32 bên trong. Pattern của arm thứ hai cũng khớp với một Message::ChangeColor enum variant, nhưng enum bên trên khớp với Color::Hsv thay vì. Chúng ta có thể chỉ định các điều kiện phức tạp này trong một match expression, ngay cả khi hai enums liên quan.</p>

<h4 class="task-heading">Structs and Tuples</h4>
<p>Chúng ta có thể trộn, khớp, và lồng các destructuring patterns theo những cách phức tạp hơn nữa. Ví dụ sau đây cho thấy một destructure phức tạp nơi chúng ta lồng structs và tuples bên trong một tuple và destructure tất cả các giá trị nguyên thủy ra:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let ((feet, inches), Point { x, y }) = ((3, 10), Point { x: 3, y: -10 });</code></pre>
</div>

<p>Code này cho phép chúng ta tách các loại phức tạp thành các phần cấu thành để chúng ta có thể sử dụng các giá trị chúng ta quan tâm một cách riêng biệt.</p>

<h3 class="task-heading">Ignoring Values in a Pattern</h3>
<p>Bạn đã thấy rằng đôi khi việc bỏ qua các giá trị trong một pattern hữu ích, chẳng hạn như trong arm cuối cùng của một match, để có một catch-all thực sự không làm gì cả nhưng tính đến tất cả các giá trị có thể còn lại. Có một số cách để bỏ qua toàn bộ giá trị hoặc các phần của giá trị trong một pattern: sử dụng pattern _ (bạn đã thấy), sử dụng pattern _ bên trong một pattern khác, sử dụng một tên bắt đầu bằng dấu gạch dưới, hoặc sử dụng .. để bỏ qua các phần còn lại của một giá trị. Hãy khám phá cách và lý do để sử dụng từng pattern này.</p>

<h4 class="task-heading">An Entire Value with _</h4>
<p>Chúng ta đã sử dụng dấu gạch dưới như một wildcard pattern sẽ khớp với bất kỳ giá trị nào nhưng không bind vào giá trị. Điều này đặc biệt hữu ích như là arm cuối cùng trong một match expression, nhưng chúng ta cũng có thể sử dụng nó trong bất kỳ pattern nào, bao gồm cả tham số hàm, như được hiển thị trong Listing 19-17.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {y}");
}

fn main() {
    foo(3, 4);
}</code></pre>
</div>
<p><em>Listing 19-17: Sử dụng _ trong chữ ký hàm</em></p>

<p>Code này sẽ hoàn toàn bỏ qua giá trị 3 được truyền như tham số đầu tiên, và sẽ in "This code only uses the y parameter: 4".</p>

<p>Trong hầu hết các trường hợp khi bạn không còn cần một tham số hàm cụ thể nữa, bạn sẽ thay đổi chữ ký để nó không bao gồm tham số không sử dụng. Việc bỏ qua một tham số hàm có thể đặc biệt hữu ích trong các trường hợp, ví dụ, khi bạn đang triển khai một trait khi bạn cần một chữ ký kiểu nhất định nhưng function body trong triển khai của bạn không cần một trong các tham số. Sau đó, bạn tránh được cảnh báo compiler về các tham số hàm không sử dụng, như bạn sẽ làm nếu bạn sử dụng một tên thay vì.</p>

<h4 class="task-heading">Parts of a Value with a Nested _</h4>
<p>Chúng ta cũng có thể sử dụng _ bên trong một pattern khác để bỏ qua chỉ một phần của một giá trị, ví dụ, khi chúng ta chỉ muốn kiểm tra một phần của giá trị nhưng không có sử dụng các phần khác trong code tương ứng mà chúng ta muốn chạy. Listing 19-18 cho thấy code chịu trách nhiệm quản lý giá trị của một cài đặt. Yêu cầu kinh doanh là người dùng không được phép ghi đè một tùy chỉnh hiện có của một cài đặt nhưng có thể bỏ đặt cài đặt và cho nó một giá trị nếu hiện tại nó chưa được đặt.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut setting_value = Some(5);
let new_setting_value = Some(10);

match (setting_value, new_setting_value) {
    (Some(_), Some(_)) => {
        println!("Can't overwrite an existing customized value");
    }
    _ => {
        setting_value = new_setting_value;
    }
}

println!("setting is {setting_value:?}");</code></pre>
</div>
<p><em>Listing 19-18: Sử dụng dấu gạch dưới trong các patterns khớp với Some variants khi chúng ta không cần sử dụng giá trị bên trong Some</em></p>

<p>Code này sẽ in "Can't overwrite an existing customized value" và sau đó "setting is Some(5)". Trong arm match đầu tiên, chúng ta không cần khớp hoặc sử dụng các giá trị bên trong bất kỳ Some variant nào, nhưng chúng ta cần kiểm tra trường hợp khi setting_value và new_setting_value đều là Some variant. Trong trường hợp đó, chúng ta in lý do không thay đổi setting_value, và nó không bị thay đổi.</p>

<p>Trong tất cả các trường hợp khác (nếu setting_value hoặc new_setting_value là None) được biểu thị bằng pattern _ trong arm thứ hai, chúng ta muốn cho phép new_setting_value trở thành setting_value.</p>

<p>Chúng ta cũng có thể sử dụng dấu gạch dưới ở nhiều vị trí trong một pattern để bỏ qua các giá trị cụ thể. Listing 19-19 cho thấy một ví dụ về việc bỏ qua phần tử thứ hai và thứ tư trong một tuple có năm phần tử.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let numbers = (2, 4, 8, 16, 32);

match numbers {
    (first, _, third, _, fifth) => {
        println!("Some numbers: {first}, {third}, {fifth}");
    }
}</code></pre>
</div>
<p><em>Listing 19-19: Bỏ qua nhiều phần của một tuple</em></p>

<p>Code này sẽ in "Some numbers: 2, 8, 32", và các giá trị 4 và 16 sẽ bị bỏ qua.</p>

<h4 class="task-heading">An Unused Variable by Starting Its Name with _</h4>
<p>Nếu bạn tạo một biến nhưng không sử dụng nó ở bất kỳ đâu, Rust thường sẽ đưa ra cảnh báo vì một biến không sử dụng có thể là một bug. Tuy nhiên, đôi khi hữu ích khi có thể tạo một biến bạn chưa sử dụng, chẳng hạn như khi bạn đang tạo nguyên mẫu hoặc chỉ bắt đầu một dự án. Trong tình huống này, bạn có thể yêu cầu Rust không cảnh báo bạn về biến không sử dụng bằng cách bắt đầu tên biến bằng dấu gạch dưới. Trong Listing 19-20, chúng ta tạo hai biến không sử dụng, nhưng khi chúng ta biên dịch code này, chúng ta chỉ nên nhận được cảnh báo về một trong số chúng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let _x = 5;
    let y = 10;
}</code></pre>
</div>
<p><em>Listing 19-20: Bắt đầu tên biến bằng dấu gạch dưới để tránh cảnh báo biến không sử dụng</em></p>

<p>Ở đây, chúng ta nhận được cảnh báo về việc không sử dụng biến y, nhưng chúng ta không nhận được cảnh báo về việc không sử dụng _x.</p>

<p>Lưu ý rằng có một sự khác biệt tinh tế giữa việc chỉ sử dụng _ và sử dụng một tên bắt đầu bằng dấu gạch dưới. Cú pháp _x vẫn bind giá trị vào biến, trong khi _ không bind gì cả. Để cho thấy một trường hợp mà sự phân biệt này quan trọng, Listing 19-21 sẽ cung cấp cho chúng ta một lỗi.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Mã này không biên dịch được!]
let s = Some(String::from("Hello!"));

if let Some(_s) = s {
    println!("found a string");
}

println!("{s:?}");</code></pre>
</div>
<p><em>Listing 19-21: Một biến không sử dụng bắt đầu bằng dấu gạch dưới vẫn bind giá trị, điều này có thể chiếm ownership của giá trị.</em></p>

<p>Chúng ta sẽ nhận được một lỗi vì giá trị s sẽ vẫn được move vào _s, điều này ngăn chúng ta sử dụng s một lần nữa. Tuy nhiên, việc sử dụng dấu gạch dưới một mình không bao giờ bind vào giá trị. Listing 19-22 sẽ biên dịch mà không có lỗi vì s không được move vào _.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s = Some(String::from("Hello!"));

if let Some(_) = s {
    println!("found a string");
}

println!("{s:?}");</code></pre>
</div>
<p><em>Listing 19-22: Sử dụng dấu gạch dưới không bind giá trị.</em></p>

<p>Code này hoạt động tốt vì chúng ta không bao giờ bind s vào bất cứ thứ gì; nó không bị move.</p>

<h4 class="task-heading">Remaining Parts of a Value with ..</h4>
<p>Với các giá trị có nhiều phần, chúng ta có thể sử dụng cú pháp .. để sử dụng các phần cụ thể và bỏ qua phần còn lại, tránh cần liệt kê dấu gạch dưới cho mỗi giá trị được bỏ qua. Pattern .. bỏ qua bất kỳ phần nào của một giá trị mà chúng ta chưa khớp rõ ràng trong phần còn lại của pattern. Trong Listing 19-23, chúng ta có một Point struct chứa một tọa độ trong không gian ba chiều. Trong match expression, chúng ta chỉ muốn thao tác trên tọa độ x và bỏ qua các giá trị trong các trường y và z.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Point {
    x: i32,
    y: i32,
    z: i32,
}

let origin = Point { x: 0, y: 0, z: 0 };

match origin {
    Point { x, .. } => println!("x is {x}"),
}</code></pre>
</div>
<p><em>Listing 19-23: Bỏ qua tất cả các trường của Point ngoại trừ x bằng cách sử dụng ..</em></p>

<p>Chúng ta liệt kê giá trị x và sau đó chỉ bao gồm pattern .. Điều này nhanh hơn là phải liệt kê y: _ và z: _, đặc biệt khi chúng ta làm việc với các structs có nhiều trường trong các tình huống chỉ một hoặc hai trường liên quan.</p>

<p>Cú pháp .. sẽ mở rộng thành bao nhiêu giá trị tùy thuộc vào nhu cầu. Listing 19-24 cho thấy cách sử dụng .. với một tuple.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (first, .., last) => {
            println!("Some numbers: {first}, {last}");
        }
    }
}</code></pre>
</div>
<p><em>Listing 19-24: Chỉ khớp giá trị đầu tiên và cuối cùng trong một tuple và bỏ qua tất cả các giá trị khác</em></p>

<p>Trong code này, các giá trị đầu tiên và cuối cùng được khớp với first và last. .. sẽ khớp và bỏ qua mọi thứ ở giữa.</p>

<p>Tuy nhiên, việc sử dụng .. phải rõ ràng. Nếu không rõ ràng giá trị nào dành cho việc khớp và giá trị nào nên bị bỏ qua, Rust sẽ đưa ra cho chúng ta một lỗi. Listing 19-25 cho thấy một ví dụ về việc sử dụng .. một cách mơ hồ, vì vậy nó sẽ không biên dịch.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Mã này không biên dịch được!]
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (.., second, ..) => {
            println!("Some numbers: {second}")
        },
    }
}</code></pre>
</div>
<p><em>Listing 19-25: Một nỗ lực sử dụng .. một cách mơ hồ</em></p>

<p>Khi chúng ta biên dịch ví dụ này, chúng ta nhận được lỗi này:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>$ cargo run
   Compiling patterns v0.1.0 (file:///projects/patterns)
error: \`..\` can only be used once per tuple pattern
 --> src/main.rs:5:22
  |
5 |         (.., second, ..) => {
  |          --          ^^ can only be used once per tuple pattern
  |          |
  |          previously used here

error: could not compile \`patterns\` (bin "patterns") due to 1 previous error</code></pre>
</div>

<p>Không thể xác định được Rust có bao nhiêu giá trị trong tuple cần bỏ qua trước khi khớp một giá trị với second và sau đó bao nhiêu giá trị tiếp theo để bỏ qua. Code này có thể có nghĩa là chúng ta muốn bỏ qua 2, bind second thành 4, và sau đó bỏ qua 8, 16 và 32; hoặc chúng ta muốn bỏ qua 2 và 4, bind second thành 8, và sau đó bỏ qua 16 và 32; và vân vân. Biến second không có ý nghĩa đặc biệt gì với Rust, vì vậy chúng ta nhận được một lỗi compiler vì việc sử dụng .. ở hai vị trí như thế này là mơ hồ.</p>

<h3 class="task-heading">Adding Conditionals with Match Guards</h3>
<p>Một match guard là một điều kiện if bổ sung, được chỉ định sau pattern trong một match arm, mà cũng phải khớp để arm đó được chọn. Match guards hữu ích để biểu đạt các ý tưởng phức tạp hơn một pattern đơn thuần. Tuy nhiên, lưu ý rằng chúng chỉ có sẵn trong match expressions, không phải trong if let hoặc while let expressions.</p>

<p>Điều kiện có thể sử dụng các biến được tạo trong pattern. Listing 19-26 cho thấy một match nơi arm đầu tiên có pattern Some(x) và cũng có một match guard là if x % 2 == 0 (sẽ đúng nếu số đó là số chẵn).</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let num = Some(4);

match num {
    Some(x) if x % 2 == 0 => println!("The number {x} is even"),
    Some(x) => println!("The number {x} is odd"),
    None => (),
}</code></pre>
</div>
<p><em>Listing 19-26: Thêm một match guard vào một pattern</em></p>

<p>Ví dụ này sẽ in "The number 4 is even". Khi num được so sánh với pattern trong arm đầu tiên, nó khớp vì Some(4) khớp với Some(x). Sau đó, match guard kiểm tra xem phần dư của việc chia x cho 2 có bằng 0 không, và vì nó bằng 0, arm đầu tiên được chọn.</p>

<p>Nếu num là Some(5) thay vì, match guard trong arm đầu tiên sẽ là false vì phần dư của 5 chia cho 2 là 1, không bằng 0. Rust sau đó sẽ đến arm thứ hai, arm đó sẽ khớp vì arm thứ hai không có match guard và do đó khớp với bất kỳ Some variant nào.</p>

<p>Không có cách nào để biểu đạt điều kiện if x % 2 == 0 trong một pattern, vì vậy match guard cho chúng ta khả năng biểu đạt logic này. Nhược điểm của sự biểu đạt bổ sung này là compiler không cố gắng kiểm tra tính exhaustive khi các match guard expressions được liên quan.</p>

<p>Khi thảo luận về Listing 19-11, chúng ta đề cập rằng chúng ta có thể sử dụng match guards để giải quyết vấn đề pattern-shadowing của chúng ta. Hãy nhớ rằng chúng ta đã tạo một biến mới bên trong pattern trong match expression thay vì sử dụng biến bên ngoài match. Biến mới đó có nghĩa là chúng ta không thể kiểm tra đối với giá trị của biến bên ngoài. Listing 19-27 cho thấy cách chúng ta có thể sử dụng một match guard để sửa vấn đề này.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(n) if n == y => println!("Matched, n = {n}"),
        _ => println!("Default case, x = {x:?}"),
    }

    println!("at the end: x = {x:?}, y = {y}");
}</code></pre>
</div>
<p><em>Listing 19-27: Sử dụng match guard để kiểm tra sự bằng với một biến bên ngoài</em></p>

<p>Code này bây giờ sẽ in "Default case, x = Some(5)". Pattern trong arm match thứ hai không giới thiệu một biến y mới sẽ shadow y bên ngoài, có nghĩa là chúng ta có thể sử dụng y bên ngoài trong match guard. Thay vì chỉ định pattern là Some(y), điều đó sẽ shadow y bên ngoài, chúng ta chỉ định Some(n). Điều này tạo một biến mới n không shadow bất cứ thứ gì vì không có biến n nào bên ngoài match.</p>

<p>Match guard if n == y không phải là một pattern và do đó không giới thiệu các biến mới. Đây là y bên ngoài thay vì một y mới shadow nó, và chúng ta có thể tìm kiếm một giá trị có cùng giá trị với y bên ngoài bằng cách so sánh n với y.</p>

<p>Bạn cũng có thể sử dụng toán tử or | trong một match guard để chỉ định nhiều patterns; điều kiện match guard sẽ áp dụng cho tất cả các patterns. Listing 19-28 cho thấy mức độ ưu tiên khi kết hợp một pattern sử dụng | với một match guard. Phần quan trọng của ví dụ này là match guard if y áp dụng cho 4, 5, và 6, mặc dù có thể trông như if y chỉ áp dụng cho 6.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 4;
let y = false;

match x {
    4 | 5 | 6 if y => println!("yes"),
    _ => println!("no"),
}</code></pre>
</div>
<p><em>Listing 19-28: Kết hợp nhiều patterns với một match guard</em></p>

<p>Điều kiện match nói rằng arm chỉ khớp nếu giá trị của x bằng 4, 5, hoặc 6 và nếu y là true. Khi code này chạy, pattern của arm đầu tiên khớp vì x là 4, nhưng match guard if y là false, vì vậy arm đầu tiên không được chọn. Code chuyển sang arm thứ hai, arm đó khớp, và chương trình này in "no". Lý do là điều kiện if áp dụng cho toàn bộ pattern 4 | 5 | 6, không chỉ cho giá trị cuối cùng 6. Nói cách khác, mức độ ưu tiên của một match guard liên quan đến một pattern hoạt động như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>(4 | 5 | 6) if y => ...</code></pre>
</div>

<p>thay vì thế này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>4 | 5 | (6 if y) => ...</code></pre>
</div>

<p>Sau khi chạy code, hành vi mức độ ưu tiên rõ ràng: Nếu match guard chỉ được áp dụng cho giá trị cuối cùng trong danh sách các giá trị được chỉ định bằng toán tử |, arm đã khớp và chương trình đã in "yes".</p>

<h3 class="task-heading">Using @ Bindings</h3>
<p>Toán tử @ cho phép chúng ta tạo một biến giữ một giá trị cùng lúc với việc chúng ta kiểm tra giá trị đó để khớp với một pattern. Trong Listing 19-29, chúng ta muốn kiểm tra trường id của Message::Hello nằm trong khoảng 3..=7. Chúng ta cũng muốn bind giá trị vào biến id để chúng ta có thể sử dụng nó trong code liên quan đến arm.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Message {
    Hello { id: i32 },
}

let msg = Message::Hello { id: 5 };

match msg {
    Message::Hello { id: id @ 3..=7 } => {
        println!("Found an id in range: {id}")
    }
    Message::Hello { id: 10..=12 } => {
        println!("Found an id in another range")
    }
    Message::Hello { id } => println!("Found some other id: {id}"),
}</code></pre>
</div>
<p><em>Listing 19-29: Sử dụng @ để bind vào một giá trị trong một pattern trong khi cũng kiểm tra nó</em></p>

<p>Ví dụ này sẽ in "Found an id in range: 5". Bằng cách chỉ định id @ trước khoảng 3..=7, chúng ta capture bất kỳ giá trị nào khớp với khoảng trong một biến tên là id trong khi cũng kiểm tra rằng giá trị khớp với pattern khoảng.</p>

<p>Trong arm thứ hai, nơi chúng ta chỉ có một khoảng được chỉ định trong pattern, code liên quan đến arm không có biến chứa giá trị thực của trường id. Giá trị của trường id có thể là 10, 11, hoặc 12, nhưng code đi với pattern đó không biết đó là giá trị nào. Code pattern không thể sử dụng giá trị từ trường id vì chúng ta chưa lưu giá trị id vào một biến.</p>

<p>Trong arm cuối cùng, nơi chúng ta đã chỉ định một biến mà không có khoảng, chúng ta có giá trị để sử dụng trong code của arm trong một biến tên là id. Lý do là vì chúng ta đã sử dụng cú pháp tắt trường struct. Nhưng chúng ta không áp dụng bất kỳ kiểm tra nào vào giá trị trong trường id trong arm này, như chúng ta đã làm với hai arm đầu tiên: Bất kỳ giá trị nào sẽ khớp với pattern này.</p>

<p>Sử dụng @ cho phép chúng ta kiểm tra một giá trị và lưu nó vào một biến trong một pattern.</p>

<h3 class="task-heading">Summary</h3>
<p>Patterns của Rust rất hữu ích trong việc phân biệt giữa các loại dữ liệu khác nhau. Khi được sử dụng trong match expressions, Rust đảm bảo rằng patterns của bạn bao quát mọi giá trị có thể, hoặc chương trình của bạn sẽ không biên dịch. Patterns trong câu lệnh let và tham số hàm làm cho các constructs đó hữu ích hơn, cho phép destructure các giá trị thành các phần nhỏ hơn và gán các phần đó vào các biến. Chúng ta có thể tạo các patterns đơn giản hoặc phức tạp để phù hợp với nhu cầu của mình.</p>

<p>Tiếp theo, cho chương gần cuối của cuốn sách, chúng ta sẽ xem xét một số khía cạnh nâng cao của nhiều tính năng khác nhau của Rust.</p>
`,
            defaultCode: `// Demo: Pattern Syntax

struct Point {
    x: i32,
    y: i32,
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    // 1. Matching Literals
    let x = 1;
    match x {
        1 => println!("Mot"),
        2 => println!("Hai"),
        3 => println!("Ba"),
        _ => println!("Khac"),
    }

    // 2. Matching Ranges
    let x = 5;
    match x {
        1..=5 => println!("Mot den nam"),
        _ => println!("Khac"),
    }

    // 3. Destructuring Struct
    let p = Point { x: 0, y: 7 };
    let Point { x, y } = p;
    println!("Point: x={x}, y={y}");

    // 4. Destructuring Enum
    let msg = Message::Move { x: 10, y: 20 };
    match msg {
        Message::Quit => println!("Quit"),
        Message::Move { x, y } => println!("Move to ({x}, {y})"),
        Message::Write(text) => println!("Write: {text}"),
        Message::ChangeColor(r, g, b) => println!("Color: {r},{g},{b}"),
    }

    // 5. Ignoring with _
    let numbers = (1, 2, 3, 4, 5);
    let (first, _, third, _, fifth) = numbers;
    println!("{first}, {third}, {fifth}");

    // 6. Match Guards
    let num = Some(4);
    match num {
        Some(x) if x % 2 == 0 => println!("{x} la so chan"),
        Some(x) => println!("{x} la so le"),
        None => println!("None"),
    }

    // 7. @ Bindings
    let msg = Message::ChangeColor(0, 160, 255);
    match msg {
        Message::ChangeColor(r, g, b) => println!("RGB: {r},{g},{b}"),
        _ => (),
    }
}
`,
            expectedOutput: `Mot
Mot den nam
Point: x=0, y=7
Move to (10, 20)
1, 3, 5
4 la so chan
RGB: 0,160,255`
        };
