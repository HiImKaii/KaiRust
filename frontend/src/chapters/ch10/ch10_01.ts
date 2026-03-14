import { Lesson } from '../../courses';

export const ch10_01: Lesson = {
            id: 'ch10-01',
            title: '10.1 Generic Data Types',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Chúng ta sử dụng generics để tạo định nghĩa cho các items như function signatures hoặc structs, mà sau đó chúng ta có thể sử dụng với nhiều concrete data types khác nhau. Hãy xem cách định nghĩa functions, structs, enums, và methods sử dụng generics. Sau đó, chúng ta sẽ thảo luận về cách generics ảnh hưởng đến performance của code.</p>

<h3 class="task-heading">Trong Function Definitions</h3>
<p>Khi định nghĩa một function sử dụng generics, chúng ta đặt generics trong signature của function nơi chúng ta thường specify các data types của parameters và return value. Làm như vậy làm cho code của chúng ta linh hoạt hơn và cung cấp nhiều functionality hơn cho callers của function trong khi vẫn ngăn chặn code duplication.</p>

<p>Tiếp tục với function largest của chúng ta, Listing 10-4 cho thấy hai functions đều tìm giá trị lớn nhất trong một slice. Sau đó, chúng ta sẽ kết hợp thành một single function sử dụng generics.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn largest_i32(list: &[i32]) -> &i32 {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn largest_char(list: &[char]) -> &char {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest_i32(&number_list);
    println!("The largest number is {result}");

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest_char(&char_list);
    println!("The largest char is {result}");
}</code></pre>
</div>
<p><em>Listing 10-4: Hai functions chỉ khác tên và types trong signatures</em></p>

<p>Function largest_i32 là function chúng ta đã trích xuất trong Listing 10-3 để tìm số lớn nhất trong một slice. Function largest_char tìm ký tự lớn nhất trong một slice. Function bodies có cùng code, vì vậy hãy loại bỏ sự trùng lặp bằng cách giới thiệu một generic type parameter trong một single function.</p>

<p>Để parameterize các types trong một function mới, chúng ta cần đặt tên cho type parameter, giống như chúng ta làm cho value parameters của một function. Bạn có thể sử dụng bất kỳ identifier nào làm type parameter name. Nhưng chúng ta sẽ sử dụng T bởi vì, theo convention, type parameter names trong Rust ngắn, thường chỉ một chữ cái, và Rust's type-naming convention là UpperCamelCase. Viết tắt cho type, T là lựa chọn mặc định của hầu hết Rust programmers.</p>

<p>Khi chúng ta sử dụng một parameter trong body của function, chúng ta phải declare parameter name trong signature để compiler biết điều đó có nghĩa gì. Tương tự, khi chúng ta sử dụng một type parameter name trong một function signature, chúng ta phải declare type parameter name trước khi sử dụng nó. Để định nghĩa generic largest function, chúng ta đặt type name declarations bên trong angle brackets, &lt;&gt;, giữa tên của function và parameter list:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn largest&lt;T&gt;(list: &[T]) -> &T {</code></pre>
</div>

<p>Chúng ta đọc definition này là "The function largest is generic over some type T." Function này có một parameter tên là list, là một slice của values kiểu T. Function largest sẽ trả về một reference đến một value cùng kiểu T.</p>

<p>Listing 10-5 cho thấy combined largest function definition sử dụng generic data type trong signature của nó. Listing này cũng cho thấy cách chúng ta có thể gọi function với either một slice của i32 values hoặc char values. Lưu ý rằng code này sẽ không compile ngay.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này không compile!
fn largest&lt;T&gt;(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {result}");

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest(&char_list);
    println!("The largest char is {result}");
}</code></pre>
</div>
<p><em>Listing 10-5: Function largest sử dụng generic type parameters; code này chưa biên dịch được</em></p>

<p>Nếu chúng ta compile code này ngay bây giờ, chúng ta sẽ get error này:</p>

<pre><code>error[E0369]: binary operation \`>\` cannot be applied to type \`&T\`
  |
5 |         if item > largest {
  |            ---- ^ ------- &T
  |            |
  |            &T
  |
help: consider restricting type parameter \`T\` with trait \`PartialOrd\`
  |
1 | fn largest&lt;T: std::cmp::PartialOrd&gt;(list: &[T]) -> &T {
  |             ++++++++++++++++++++++</code></pre>

<p>Help text đề cập đến std::cmp::PartialOrd, là một trait, và chúng ta sẽ nói về traits trong phần tiếp theo. Bây giờ, hãy biết rằng error này nói rằng body của largest sẽ không work cho tất cả possible types mà T có thể là. Bởi vì chúng ta muốn so sánh values của type T trong body, chúng ta chỉ có thể sử dụng các types mà values của chúng có thể được ordered. Để enable comparisons, standard library có trait std::cmp::PartialOrd mà bạn có thể implement trên các types. Để fix Listing 10-5, chúng ta có thể follow help text's suggestion và restrict các types valid cho T chỉ những types implement PartialOrd.</p>

<h3 class="task-heading">Trong Struct Definitions</h3>
<p>Chúng ta cũng có thể define structs để sử dụng một generic type parameter trong một hoặc nhiều fields sử dụng cú pháp &lt;&gt;. Listing 10-6 định nghĩa một struct Point&lt;T&gt; để hold x và y coordinate values của bất kỳ type nào.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Point&lt;T&gt; {
    x: T,
    y: T,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
}</code></pre>
</div>
<p><em>Listing 10-6: Struct Point<T> giữ các giá trị x và y kiểu T</em></p>

<p>Cú pháp để sử dụng generics trong struct definitions tương tự như trong function definitions. Đầu tiên, chúng ta declare tên của type parameter bên trong angle brackets ngay sau tên của struct. Sau đó, chúng ta sử dụng generic type trong struct definition ở nơi chúng ta sẽ specify concrete data types.</p>

<p>Lưu ý rằng vì chúng ta đã sử dụng chỉ một generic type để define Point&lt;T&gt;, definition này nói rằng Point&lt;T&gt; struct là generic over some type T, và các fields x và y đều là cùng type đó, bất kể type đó là gì. Nếu chúng ta tạo một instance của Point&lt;T&gt; có values của different types, như trong Listing 10-7, code của chúng ta sẽ không compile.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này không compile!
struct Point&lt;T&gt; {
    x: T,
    y: T,
}

fn main() {
    let wont_work = Point { x: 5, y: 4.0 };
}</code></pre>
</div>
<p><em>Listing 10-7: The fields x and y must be the same type because both have the same generic data type T.</em></p>

<p>Trong ví dụ này, khi chúng ta assign integer value 5 cho x, chúng ta để compiler biết rằng generic type T sẽ là một integer cho instance này của Point&lt;T&gt;. Sau đó, khi chúng ta specify 4.0 cho y, mà chúng ta đã define để có cùng type như x, chúng ta sẽ get một type mismatch error như sau:</p>

<pre><code>error[E0308]: mismatched types
  |
7 |     let wont_work = Point { x: 5, y: 4.0 };
  |                                      ^^^ expected integer, found floating-point number</code></pre>

<p>Để define một Point struct where x và y đều là generics nhưng có thể có different types, chúng ta có thể sử dụng nhiều generic type parameters. Ví dụ, trong Listing 10-8, chúng ta thay đổi definition của Point để generic over các types T và U where x là kiểu T và y là kiểu U.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Point&lt;T, U&gt; {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}</code></pre>
</div>
<p><em>Listing 10-8: A Point&lt;T, U&gt; generic over two types so that x and y can be values of different types</em></p>

<p>Bây giờ tất cả các instances của Point được shown đều allowed! Bạn có thể sử dụng bao nhiêu generic type parameters tùy thích trong một definition, nhưng sử dụng nhiều hơn một vài cái làm code của bạn khó đọc. Nếu bạn thấy bạn cần nhiều generic types trong code của bạn, điều đó có thể indicating rằng code của bạn cần được restructured thành các pieces nhỏ hơn.</p>

<h3 class="task-heading">Trong Enum Definitions</h3>
<p>Như chúng ta đã làm với structs, chúng ta có thể define enums để hold generic data types trong các variants của chúng. Hãy xem lại Option&lt;T&gt; enum mà standard library cung cấp, mà chúng ta đã sử dụng trong Chương 6:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Option&lt;T&gt; {
    Some(T),
    None,
}</code></pre>
</div>

<p>Definition này bây giờ nên make more sense cho bạn. Như bạn có thể thấy, Option&lt;T&gt; enum là generic over type T và có hai variants: Some, hold một value kiểu T, và None variant không hold any value. Bằng cách sử dụng Option&lt;T&gt; enum, chúng ta có thể express abstract concept của một optional value, và vì Option&lt;T&gt; là generic, chúng ta có thể use this abstraction không matter type của optional value là gì.</p>

<p>Enums có thể sử dụng nhiều generic types. Definition của Result enum mà chúng ta đã sử dụng trong Chương 9 là một ví dụ:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Result&lt;T, E&gt; {
    Ok(T),
    Err(E),
}</code></pre>
</div>

<p>Result enum là generic over hai types, T và E, và có hai variants: Ok, hold một value kiểu T, và Err, hold một value kiểu E. Definition này makes it convenient để sử dụng Result enum bất kỳ đâu chúng ta có một operation có thể succeed (return một value của some type T) hoặc fail (return một error của some type E).</p>

<h3 class="task-heading">Trong Method Definitions</h3>
<p>Chúng ta có thể implement methods trên structs và enums (như chúng ta đã làm trong Chương 5) và sử dụng generic types trong definitions của chúng nữa. Listing 10-9 cho thấy Point&lt;T&gt; struct chúng ta đã định nghĩa trong Listing 10-6 với một method tên là x implemented trên nó.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Point&lt;T&gt; {
    x: T,
    y: T,
}

impl&lt;T&gt; Point&lt;T&gt; {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}</code></pre>
</div>
<p><em>Listing 10-9: Implementing a method named x on the Point&lt;T&gt; struct</em></p>

<p>Ở đây, chúng ta đã define một method tên là x trên Point&lt;T&gt; returns một reference đến data trong field x.</p>

<p>Lưu ý rằng chúng ta phải declare T ngay sau impl để chúng ta có thể use T để specify rằng chúng ta đang implement methods trên type Point&lt;T&gt;. Bằng cách declare T như một generic type sau impl, Rust có thể identify rằng type trong angle brackets trong Point là một generic type hơn là một concrete type. Chúng ta có thể chọn một tên khác cho generic parameter này so với generic parameter declared trong struct definition, nhưng sử dụng cùng tên là conventional.</p>

<p>Chúng ta cũng có thể specify constraints trên generic types khi defining methods trên type. Ví dụ, chúng ta có thể implement methods chỉ trên Point&lt;f32&gt; instances thay vì trên Point&lt;T&gt; instances với any generic type. Trong Listing 10-10, chúng ta sử dụng concrete type f32, có nghĩa là chúng ta không declare bất kỳ types nào sau impl.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Point&lt;f32&gt; {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}</code></pre>
</div>
<p><em>Listing 10-10: An impl block that only applies to a struct with a particular concrete type for the generic type parameter T</em></p>

<p>Code này có nghĩa là type Point&lt;f32&gt; sẽ có một method distance_from_origin; other instances của Point&lt;T&gt; where T không phải là f32 sẽ không có method này defined. Method này measures khoảng cách từ điểm của chúng ta đến điểm tại tọa độ (0.0, 0.0) và sử dụng các mathematical operations chỉ available cho floating-point types.</p>

<p>Generic type parameters trong một struct definition không phải lúc nào cũng giống như những cái bạn sử dụng trong method signatures của cùng struct đó. Listing 10-11 sử dụng generic types X1 và Y1 cho Point struct và X2 và Y2 cho mixup method signature để làm ví dụ clearer. Method này tạo một Point instance mới với x value từ self Point (kiểu X1) và y value từ passed-in Point (kiểu Y2).</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Point&lt;X1, Y1&gt; {
    x: X1,
    y: Y1,
}

impl&lt;X1, Y1&gt; Point&lt;X1, Y1&gt; {
    fn mixup&lt;X2, Y2&gt;(self, other: Point&lt;X2, Y2&gt;) -> Point&lt;X1, Y2&gt; {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}

fn main() {
    let p1 = Point { x: 5, y: 10.4 };
    let p2 = Point { x: "Hello", y: 'c' };

    let p3 = p1.mixup(p2);

    println!("p3.x = {}, p3.y = {}", p3.x, p3.y);
}</code></pre>
</div>
<p><em>Listing 10-11: A method that uses generic types that are different from its struct's definition</em></p>

<p>Trong main, chúng ta đã define một Point có i32 cho x (với value 5) và f64 cho y (với value 10.4). Biến p2 là một Point struct có một string slice cho x (với value "Hello") và char cho y (với value 'c'). Calling mixup trên p1 với argument p2 cho chúng ta p3, sẽ có i32 cho x vì x đến từ p1. Biến p3 sẽ có char cho y vì y đến từ p2.</p>

<p>Mục đích của ví dụ này là demonstrate một situation trong đó some generic parameters được declared với impl và some được declared với method definition. Ở đây, generic parameters X1 và Y1 được declared sau impl vì chúng đi với struct definition. Generic parameters X2 và Y2 được declared sau fn mixup vì chúng chỉ relevant đến method.</p>

<h3 class="task-heading">Performance của Code Using Generics</h3>
<p>Bạn có thể đang tự hỏi liệu có runtime cost khi sử dụng generic type parameters không. Tin tốt là sử dụng generic types sẽ không làm chương trình của bạn chạy chậm hơn so với việc sử dụng concrete types.</p>

<p>Rust thực hiện điều này bằng cách thực hiện monomorphization của code sử dụng generics tại compile time. Monomorphization là quá trình chuyển đổi generic code thành specific code bằng cách điền vào các concrete types được sử dụng khi compile. Trong quá trình này, compiler làm opposite của các bước chúng ta đã sử dụng để tạo generic function trong Listing 10-5: Compiler looks at all the places where generic code is called và generates code cho các concrete types mà generic code được gọi với.</p>

<p>Hãy xem điều này hoạt động như thế nào bằng cách sử dụng standard library's generic Option&lt;T&gt; enum:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let integer = Some(5);
let float = Some(5.0);</code></pre>
</div>

<p>Khi Rust compile code này, nó thực hiện monomorphization. Trong quá trình đó, compiler reads các values đã được sử dụng trong Option&lt;T&gt; instances và identifies hai loại Option&lt;T&gt;: Một là i32 và một là f64. Bởi vậy, nó expands generic definition của Option&lt;T&gt; thành hai definitions specialized cho i32 và f64, thereby replacing generic definition với các specific ones.</p>

<p>Monomorphized version của code trông tương tự như sau (compiler sử dụng different names hơn những gì chúng ta đang sử dụng ở đây for illustration):</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Option_i32 {
    Some(i32),
    None,
}

enum Option_f64 {
    Some(f64),
    None,
}

fn main() {
    let integer = Option_i32::Some(5);
    let float = Option_f64::Some(5.0);
}</code></pre>
</div>

<p>Generic Option&lt;T&gt; được thay thế bằng các specific definitions được tạo bởi compiler. Bởi vì Rust compiles generic code thành code specifies the type in each instance, chúng ta không pay any runtime cost cho việc sử dụng generics. Khi code runs, nó performs giống như thể chúng ta đã duplicated mỗi definition bằng tay. Quá trình monomorphization makes Rust's generics extremely efficient at runtime.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Generics:</strong>
  <ul>
    <li><strong>Type parameters:</strong> &lt;T&gt;, &lt;T, U&gt; đại diện cho kiểu</li>
    <li><strong>Trait bounds:</strong> &lt;T: Trait&gt; giới hạn kiểu có khả năng</li>
    <li><strong>Generic functions:</strong> fn name&lt;T&gt;(list: &[T])</li>
    <li><strong>Generic structs:</strong> struct Point&lt;T&gt; { x: T, y: T }</li>
    <li><strong>Generic enums:</strong> Option&lt;T&gt;, Result&lt;T, E&gt;</li>
    <li><strong>Generic methods:</strong> impl&lt;T&gt; Point&lt;T&gt;</li>
    <li><strong>Monomorphization:</strong> Compile-time expansion, không runtime cost</li>
  </ul>
</div>
`,
            defaultCode: `#[derive(Debug)]
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

impl<T: std::fmt::Display> Point<T> {
    fn display(&self) {
        println!("Point({}, {})", self.x, self.y);
    }
}

// Method chỉ cho Point<f64>
impl Point<f64> {
    fn distance_from_origin(&self) -> f64 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

struct PointMixup<X1, Y1> {
    x: X1,
    y: Y1,
}

impl<X1, Y1> PointMixup<X1, Y1> {
    fn mixup<X2, Y2>(self, other: PointMixup<X2, Y2>) -> PointMixup<X1, Y2> {
        PointMixup {
            x: self.x,
            y: other.y,
        }
    }
}

fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    // Generic struct
    let int_point = Point { x: 5, y: 10 };
    let float_point = Point { x: 3.0, y: 4.0 };

    int_point.display();
    float_point.display();
    println!("Khoảng cách: {:.2}", float_point.distance_from_origin());

    // Mixup method
    let p1 = PointMixup { x: 5, y: 10.4 };
    let p2 = PointMixup { x: "Hello", y: 'c' };
    let p3 = p1.mixup(p2);
    println!("p3.x = {}, p3.y = {}", p3.x, p3.y);

    // Largest function
    let numbers = vec![34, 50, 25, 100, 65];
    println!("Số lớn nhất: {}", largest(&numbers));

    let chars = vec!['y', 'm', 'a', 'q'];
    println!("Char lớn nhất: {}", largest(&chars));
}
`,
            expectedOutput: 'Point(5, 10)\nPoint(3, 4)\nKhoảng cách: 5.00\np3.x = 5, p3.y = c\nSố lớn nhất: 100\nChar lớn nhất: y'
        };
