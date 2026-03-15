import { Lesson } from '../../courses';

export const ch20_02: Lesson = {
            id: '20-02',
            title: '20.2 Advanced Traits và Types',
            duration: '35 phút',
            type: 'theory',
            content: `
<p>Chúng ta đã đề cập đến traits lần đầu trong phần "Defining Shared Behavior with Traits" ở Chương 10, nhưng chúng ta chưa thảo luận về các chi tiết nâng cao hơn. Bây giờ khi bạn đã biết nhiều hơn về Rust, chúng ta có thể đi sâu vào chi tiết.</p>

<h3 class="task-heading">Defining Traits with Associated Types</h3>
<p>Associated types kết nối một type placeholder với một trait sao cho các định nghĩa method của trait có thể sử dụng các placeholder types này trong các signatures của chúng. Implementor của một trait sẽ chỉ định concrete type để sử dụng thay vì placeholder type cho implementation cụ thể đó. Bằng cách đó, chúng ta có thể định nghĩa một trait sử dụng một số types mà không cần biết chính xác những types đó là gì cho đến khi trait được implement.</p>

<p>Chúng ta đã mô tả hầu hết các tính năng nâng cao trong chương này là hiếm khi cần. Associated types ở đâu đó ở giữa: Chúng được sử dụng hiếm hơn các tính năng được giải thích trong phần còn lại của cuốn sách nhưng phổ biến hơn nhiều tính năng khác được thảo luận trong chương này.</p>

<p>Một ví dụ về một trait với associated type là Iterator trait mà thư viện chuẩn cung cấp. Associated type được đặt tên là Item và đại diện cho type của các values mà type implement Iterator trait đang iterate. Định nghĩa của Iterator trait như được hiển thị trong Listing 20-13.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option&lt;Self::Item&gt;;
}</code></pre>
</div>
<p><em>Listing 20-13: Định nghĩa của Iterator trait có associated type Item</em></p>

<p>Type Item là một placeholder, và định nghĩa của method next cho thấy nó sẽ trả về các giá trị của kiểu Option&lt;Self::Item&gt;. Implementors của Iterator trait sẽ chỉ định concrete type cho Item, và method next sẽ trả về một Option chứa một giá trị của concrete type đó.</p>

<p>Associated types có vẻ giống như một khái niệm tương tự với generics, trong đó后者 cho phép chúng ta định nghĩa một function mà không cần chỉ định nó có thể xử lý những types nào. Để xem xét sự khác biệt giữa hai khái niệm, chúng ta sẽ xem xét một implementation của Iterator trait trên một type tên là Counter chỉ định Item type là u32:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option&lt;Self::Item&gt; {
        // --snip--
    }
}</code></pre>
</div>

<p>Cú pháp này có vẻ so sánh được với generics. Vậy, tại sao không đơn giản định nghĩa Iterator trait với generics, như được hiển thị trong Listing 20-14?</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Iterator&lt;T&gt; {
    fn next(&mut self) -> Option&lt;T&gt;;
}</code></pre>
</div>
<p><em>Listing 20-14: Một định nghĩa giả thuyết của Iterator trait sử dụng generics</em></p>

<p>Sự khác biệt là khi sử dụng generics, như trong Listing 20-14, chúng ta phải chú thích types trong mỗi implementation; vì chúng ta cũng có thể implement Iterator&lt;String&gt; cho Counter hoặc bất kỳ type nào khác, chúng ta có thể có nhiều implementations của Iterator cho Counter. Nói cách khác, khi một trait có một generic parameter, nó có thể được implement cho một type nhiều lần, thay đổi concrete types của generic type parameters mỗi lần. Khi chúng ta sử dụng method next trên Counter, chúng ta sẽ phải cung cấp type annotations để chỉ định implementation nào của Iterator chúng ta muốn sử dụng.</p>

<p>Với associated types, chúng ta không cần phải chú thích types, vì chúng ta không thể implement một trait trên một type nhiều lần. Trong Listing 20-13 với định nghĩa sử dụng associated types, chúng ta có thể chọn type của Item sẽ là gì chỉ một lần vì chỉ có thể có một impl Iterator for Counter. Chúng ta không phải chỉ định rằng chúng ta muốn một iterator của u32 values ở mọi nơi chúng ta gọi next trên Counter.</p>

<p>Associated types cũng trở thành một phần của contract của trait: Implementors của trait phải cung cấp một type để đứng thay cho associated type placeholder. Associated types thường có một tên mô tả cách type sẽ được sử dụng, và việc ghi lại associated type trong tài liệu API là một thực hành tốt.</p>

<h3 class="task-heading">Using Default Generic Parameters and Operator Overloading</h3>
<p>Khi chúng ta sử dụng generic type parameters, chúng ta có thể chỉ định một default concrete type cho generic type. Điều này loại bỏ nhu cầu implementors của trait phải chỉ định một concrete type nếu default type hoạt động. Bạn chỉ định một default type khi khai báo một generic type với cú pháp &lt;PlaceholderType=ConcreteType&gt;.</p>

<p>Một ví dụ tuyệt vời về tình huống kỹ thuật này hữu ích là với operator overloading, trong đó bạn tùy chỉnh hành vi của một operator (như +) trong các tình huống cụ thể.</p>

<p>Rust không cho phép bạn tạo operators của riêng mình hoặc overload các operators tùy ý. Nhưng bạn có thể overload các operations và các traits tương ứng được liệt kê trong std::ops bằng cách implement các traits liên quan đến operator. Ví dụ, trong Listing 20-15, chúng ta overload operator + để cộng hai Point instances lại với nhau. Chúng ta làm điều này bằng cách implement Add trait trên một Point struct.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::ops::Add;

#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

fn main() {
    assert_eq!(
        Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
        Point { x: 3, y: 3 }
    );
}</code></pre>
</div>
<p><em>Listing 20-15: Implement Add trait để overload operator + cho Point instances</em></p>

<p>Method add cộng các giá trị x của hai Point instances và các giá trị y của hai Point instances để tạo một Point mới. Add trait có một associated type tên là Output xác định type được trả về từ method add.</p>

<p>Default generic type trong code này nằm trong Add trait. Đây là định nghĩa của nó:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>trait Add&lt;Rhs=Self&gt; {
    type Output;

    fn add(self, rhs: Rhs) -> Self::Output;
}</code></pre>
</div>

<p>Code này trông quen thuộc nhìn chung: một trait với một method và một associated type. Phần mới là Rhs=Self: Cú pháp này được gọi là default type parameters. Rhs generic type parameter (viết tắt của "right-hand side") định nghĩa type của rhs parameter trong method add. Nếu chúng ta không chỉ định một concrete type cho Rhs khi chúng ta implement Add trait, type của Rhs sẽ mặc định là Self, đó sẽ là type mà chúng ta đang implement Add.</p>

<p>Khi chúng ta implement Add cho Point, chúng ta sử dụng default cho Rhs vì chúng ta muốn cộng hai Point instances. Hãy xem xét một ví dụ về việc implement Add trait nơi chúng ta muốn tùy chỉnh Rhs type thay vì sử dụng default.</p>

<p>Chúng ta có hai structs, Millimeters và Meters, giữ các giá trị trong các đơn vị khác nhau. Việc bọc mỏng một type hiện có trong một struct khác được gọi là newtype pattern, mà chúng ta sẽ mô tả chi tiết hơn trong phần "Implementing External Traits with the Newtype Pattern". Chúng ta muốn thêm các giá trị trong millimeters vào các giá trị trong meters và có implementation của Add thực hiện chuyển đổi đúng. Chúng ta có thể implement Add cho Millimeters với Meters là Rhs, như được hiển thị trong Listing 20-16.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::ops::Add;

struct Millimeters(u32);
struct Meters(u32);

impl Add&lt;Meters&gt; for Millimeters {
    type Output = Millimeters;

    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}</code></pre>
</div>
<p><em>Listing 20-16: Implement Add trait trên Millimeters để cộng Millimeters và Meters</em></p>

<p>Để cộng Millimeters và Meters, chúng ta chỉ định impl Add&lt;Meters&gt; để đặt giá trị của Rhs type parameter thay vì sử dụng default của Self.</p>

<h3 class="task-heading">Disambiguating Between Identically Named Methods</h3>
<p>Không có gì trong Rust ngăn cản một trait có một method cùng tên với method của trait khác, cũng không ngăn Rust bạn implement cả hai traits trên một type. Cũng có thể implement một method trực tiếp trên type với cùng tên như methods từ các traits.</p>

<p>Khi gọi methods với cùng tên, bạn sẽ cần nói với Rust bạn muốn sử dụng cái nào. Xem xét code trong Listing 20-17 nơi chúng ta đã định nghĩa hai traits, Pilot và Wizard, cả hai đều có một method gọi là fly. Sau đó, chúng ta implement cả hai traits trên một type Human đã có một method tên là fly được implement trên nó. Mỗi fly method làm một điều khác nhau.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>trait Pilot {
    fn fly(&self);
}

trait Wizard {
    fn fly(&self);
}

struct Human;

impl Pilot for Human {
    fn fly(&self) {
        println!("This is your captain speaking.");
    }
}

impl Wizard for Human {
    fn fly(&self) {
        println!("Up!");
    }
}

impl Human {
    fn fly(&self) {
        println!("*waving arms furiously*");
    }
}</code></pre>
</div>
<p><em>Listing 20-17: Hai traits được định nghĩa có method fly và được implement trên Human type, và một fly method được implement trực tiếp trên Human.</em></p>

<p>Khi chúng ta gọi fly trên một instance của Human, compiler mặc định gọi method được implement trực tiếp trên type, như được hiển thị trong Listing 20-18.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let person = Human;
    person.fly();
}</code></pre>
</div>
<p><em>Listing 20-18: Gọi fly trên một instance của Human</em></p>

<p>Chạy code này sẽ in "*waving arms furiously*", cho thấy Rust gọi fly method được implement trực tiếp trên Human.</p>

<p>Để gọi fly methods từ Pilot trait hoặc Wizard trait, chúng ta cần sử dụng cú pháp rõ ràng hơn để chỉ định fly method nào chúng ta muốn. Listing 20-19 minh họa cú pháp này.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let person = Human;
    Pilot::fly(&person);
    Wizard::fly(&person);
    person.fly();
}</code></pre>
</div>
<p><em>Listing 20-19: Chỉ định fly method của trait nào chúng ta muốn gọi</em></p>

<p>Chạy code này in ra:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>$ cargo run
   Compiling traits-example v0.1.0 (file:///projects/traits-example)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.46s
     Running \`target/debug/traits-example\`
This is your captain speaking.
Up!
*waving arms furiously*</code></pre>
</div>

<p>Vì fly method nhận một self parameter, nếu chúng ta có hai types đều implement một trait, Rust có thể tìm ra implementation nào của trait để sử dụng dựa trên type của self.</p>

<p>Tuy nhiên, các associated functions không phải methods không có self parameter. Khi có nhiều types hoặc traits định nghĩa non-method functions với cùng function name, Rust không phải lúc nào cũng biết bạn có nghĩa type nào trừ khi bạn sử dụng fully qualified syntax. Ví dụ, trong Listing 20-20, chúng ta tạo một trait cho một animal shelter muốn đặt tên tất cả baby dogs là Spot. Chúng ta tạo một Animal trait với một associated non-method function baby_name. Animal trait được implement cho struct Dog, trên đó chúng ta cũng cung cấp một associated non-method function baby_name trực tiếp.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>trait Animal {
    fn baby_name() -> String;
}

struct Dog;

impl Dog {
    fn baby_name() -> String {
        String::from("Spot")
    }
}

impl Animal for Dog {
    fn baby_name() -> String {
        String::from("puppy")
    }
}

fn main() {
    println!("A baby dog is called a {}", Dog::baby_name());
}</code></pre>
</div>
<p><em>Listing 20-20: Một trait với associated function và một type với associated function cùng tên cũng implement trait</em></p>

<p>Chúng ta implement code để đặt tên tất cả puppies là Spot trong baby_name associated function được định nghĩa trên Dog. Type Dog cũng implement trait Animal, mô tả các đặc điểm mà tất cả animals đều có. Baby dogs được gọi là puppies, và điều đó được biểu đạt trong implementation của Animal trait trên Dog trong baby_name function liên quan đến Animal trait.</p>

<p>Trong main, chúng ta gọi Dog::baby_name function, gọi associated function được định nghĩa trực tiếp trên Dog. Code này in ra:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>A baby dog is called a Spot</code></pre>
</div>

<p>Output này không phải những gì chúng ta muốn. Chúng ta muốn gọi baby_name function là một phần của Animal trait mà chúng ta implement trên Dog để code in "A baby dog is called a puppy".</p>

<p>Để disambiguate và nói với Rust rằng chúng ta muốn sử dụng implementation của Animal cho Dog thay vì implementation của Animal cho một type nào đó, chúng ta cần sử dụng fully qualified syntax. Listing 20-22 demonstrates how to use fully qualified syntax.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("A baby dog is called a {}", &lt;Dog as Animal&gt;::baby_name());
}</code></pre>
</div>
<p><em>Listing 20-22: Sử dụng fully qualified syntax để chỉ định rằng chúng ta muốn gọi baby_name function từ Animal trait như được implement trên Dog</em></p>

<p>Chúng ta cung cấp cho Rust một type annotation trong các dấu ngoặc nhọn, cho biết chúng ta muốn gọi baby_name method từ Animal trait như được implement trên Dog bằng cách nói rằng chúng ta muốn đối xử với Dog type như một Animal cho lời gọi function này.</p>

<h3 class="task-heading">Using Supertraits</h3>
<p>Đôi khi bạn có thể viết một trait definition phụ thuộc vào một trait khác: Để một type implement trait đầu tiên, bạn muốn yêu cầu type đó cũng implement trait thứ hai. Bạn sẽ làm điều này để trait definition của bạn có thể sử dụng các associated items của trait thứ hai. Trait mà trait definition của bạn dựa vào được gọi là supertrait của trait của bạn.</p>

<p>Ví dụ, giả sử chúng ta muốn tạo một OutlinePrint trait với một outline_print method sẽ in một giá trị đã cho được định dạng sao cho nó được bao trong các dấu sao. Tức là, với một Point struct implement Display trait để result in (x, y), khi chúng ta gọi outline_print trên một Point instance có 1 cho x và 3 cho y, nó sẽ in ra:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>**********
*        *
* (1, 3) *
*        *
**********</code></pre>
</div>

<p>Trong implementation của outline_print method, chúng ta muốn sử dụng chức năng của Display trait. Do đó, chúng ta cần chỉ định rằng OutlinePrint trait sẽ chỉ hoạt động cho các types cũng implement Display và cung cấp chức năng mà OutlinePrint cần. Chúng ta có thể làm điều đó trong trait definition bằng cách chỉ định OutlinePrint: Display. Listing 20-23 cho thấy implementation của OutlinePrint trait.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fmt;

trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {output} *");
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}</code></pre>
</div>
<p><em>Listing 20-23: Implement OutlinePrint trait yêu cầu chức năng từ Display</em></p>

<h3 class="task-heading">Implementing External Traits with the Newtype Pattern</h3>
<p>Trong phần "Implementing a Trait on a Type" ở Chương 10, chúng ta đề cập đến orphan rule nói rằng chúng ta chỉ được phép implement một trait trên một type nếu hoặc trait hoặc type, hoặc cả hai, là local đối với crate của chúng ta. Có thể vượt qua hạn chế này bằng cách sử dụng newtype pattern, liên quan đến việc tạo một type mới trong một tuple struct. Tuple struct sẽ có một field và là một wrapper mỏng xung quanh type mà chúng ta muốn implement một trait. Sau đó, wrapper type là local đối với crate của chúng ta, và chúng ta có thể implement trait trên wrapper. Newtype là một thuật ngữ có nguồn gốc từ ngôn ngữ lập trình Haskell. Không có penalty hiệu suất runtime khi sử dụng pattern này, và wrapper type được bỏ qua tại thời điểm biên dịch.</p>

<p>Ví dụ, giả sử chúng ta muốn implement Display trên Vec&lt;T&gt;, mà orphan rule ngăn chúng ta làm trực tiếp vì Display trait và Vec&lt;T&gt; type được định nghĩa bên ngoài crate của chúng ta. Chúng ta có thể tạo một Wrapper struct giữ một instance của Vec&lt;T&gt;; sau đó, chúng ta có thể implement Display trên Wrapper và sử dụng giá trị Vec&lt;T&gt;, như được hiển thị trong Listing 20-24.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fmt;

struct Wrapper(Vec&lt;String&gt;);

impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}]", self.0.join(", "))
    }
}

fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {w}");
}</code></pre>
</div>
<p><em>Listing 20-24: Tạo một Wrapper type xung quanh Vec&lt;String&gt; để implement Display</em></p>

<p>Implementation của Display sử dụng self.0 để truy cập Vec&lt;T&gt; bên trong vì Wrapper là một tuple struct và Vec&lt;T&gt; là item tại index 0 trong tuple. Sau đó, chúng ta có thể sử dụng chức năng của Display trait trên Wrapper.</p>

<p>Nhược điểm của việc sử dụng kỹ thuật này là Wrapper là một type mới, vì vậy nó không có các methods của value mà nó đang giữ. Chúng ta sẽ phải implement tất cả các methods của Vec&lt;T&gt; trực tiếp trên Wrapper sao cho các methods delegate đến self.0, điều này sẽ cho phép chúng ta đối xử với Wrapper chính xác như một Vec&lt;T&gt;. Nếu chúng ta muốn type mới có mọi methods mà inner type có, implement Deref trait trên Wrapper để trả về inner type sẽ là một giải pháp.</p>
`,
            defaultCode: `use std::ops::Add;
use std::fmt;

// Associated Types - Iterator trait example
trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
}

struct Counter {
    count: u32,
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

// Operator Overloading
#[derive(Debug, Clone, Copy)]
struct Vec2 {
    x: f64,
    y: f64,
}

impl Vec2 {
    fn new(x: f64, y: f64) -> Self {
        Vec2 { x, y }
    }
}

impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, other: Vec2) -> Vec2 {
        Vec2::new(self.x + other.x, self.y + other.y)
    }
}

impl fmt::Display for Vec2 {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({:.1}, {:.1})", self.x, self.y)
    }
}

// Supertraits example
struct Point {
    x: i32,
    y: i32,
}

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}

// Newtype pattern
struct Meters(u32);
struct Millimeters(u32);

impl Add<Millimeters> for Meters {
    type Output = Millimeters;
    fn add(self, other: Millimeters) -> Millimeters {
        Millimeters(self.0 * 1000 + other.0)
    }
}

fn main() {
    // Test Associated Types
    let mut counter = Counter { count: 0 };
    println!("Counter:");
    while let Some(n) = counter.next() {
        print!("{} ", n);
    }
    println!();

    // Test Operator Overloading
    let a = Vec2::new(3.0, 4.0);
    let b = Vec2::new(1.0, 2.0);
    let c = a + b;
    println!("\\nVec2: {} + {} = {}", a, b, c);

    // Test Newtype Pattern
    let m = Meters(2);
    let mm = Millimeters(500);
    // Note: This would need both types to implement Add properly
    println!("\\nMeters + Millimeters example");
}
`,
            expectedOutput: `Counter:
1 2 3 4 5

Vec2: (3.0, 4.0) + (1.0, 2.0) = (4.0, 6.0)

Meters + Millimeters example`
        };
