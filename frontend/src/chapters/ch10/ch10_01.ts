import { Lesson } from '../../courses';

export const ch10_01: Lesson = {
            id: 'ch10-01',
            title: '10.1 Generic Data Types',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Chúng ta sử dụng generics để tạo định nghĩa có thể tái sử dụng cho các items như functions hoặc structs, sau đó có thể sử dụng với nhiều kiểu dữ liệu khác nhau thay vì chỉ một. Trước khi diving vào cú pháp generics, trước tiên hãy xem cách loại bỏ sự trùng lặp code mà không cần generics, và sau đó chúng ta sẽ thảo luận cách làm điều tương tự bằng generics! Điều này cũng sẽ cung cấp động lực mạnh mẽ cho việc tại sao generics cần thiết.</p>

<h3 class="task-heading">Loại bỏ sự trùng lặp bằng cách trích xuất Function</h3>
<p> ban đầu có các functions này đều tìm giá trị lớn nhất trong một mảng:</p>

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
}</code></pre>
</div>

<p>Cả hai functions đều có cùng logic, chỉ khác kiểu dữ liệu. Để loại bỏ sự trùng lặp này, chúng ta có thể tạo một generic function!</p>

<h3 class="task-heading">Generic Functions</h3>
<p>Function generic dưới đây tìm giá trị lớn nhất trong một mảng bất kỳ kiểu nào có thể so sánh được:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn largest&lt;T: std::cmp::PartialOrd&gt;(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}</code></pre>
</div>

<p>Giải thích:</p>
<ul class="task-list">
  <li><code>fn largest&lt;T&gt;</code> - khai báo type parameter T</li>
  <li><code>T: std::cmp::PartialOrd</code> - trait bound để so sánh</li>
  <li><code>&[T]</code> - slice chứa các phần tử kiểu T</li>
  <li><code>&T</code> - trả về tham chiếu đến giá trị lớn nhất</li>
</ul>

<h3 class="task-heading">Generic Structs</h3>
<p>Struct có thể generic với một hoặc nhiều type parameters:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Cùng kiểu cho cả x và y
struct Point&lt;T&gt; {
    x: T,
    y: T,
}

// Hai kiểu khác nhau
struct Point2&lt;T, U&gt; {
    x: T,
    y: U,
}

impl&lt;T&gt; Point&lt;T&gt; {
    fn x(&self) -> &T {
        &self.x
    }
}

// Method đặc biệt cho kiểu cụ thể
impl Point&lt;f64&gt; {
    fn distance_from_origin(&self) -> f64 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}</code></pre>
</div>

<h3 class="task-heading">Generic Enums</h3>
<p>Rust đã định nghĩa sẵn các generic enums rất hữu ích:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Option&lt;T&gt; - có thể có giá trị hoặc không
enum Option&lt;T&gt; {
    Some(T),
    None,
}

// Result&lt;T, E&gt; - cho xử lý lỗi
enum Result&lt;T, E&gt; {
    Ok(T),
    Err(E),
}</code></pre>
</div>

<h3 class="task-heading">Performance của Generics</h3>
<p>Một câu hỏi thường gặp: generics có làm chậm program không? Câu trả lời là KHÔNG! Rust sử dụng <strong>monomorphization</strong> tại compile time.</p>

<p>Monomorphization là quá trình chuyển đổi generic code thành code cụ thể cho mỗi kiểu dữ liệu. Compiler thay thế T bằng các kiểu cụ thể mà bạn thực sự sử dụng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let integer = Point { x: 5, y: 10 };
let float = Point { x: 1.0, y: 4.0 };</code></pre>
</div>

<p>Compiler sẽ tạo ra:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Point_i32 { x: i32, y: i32 }
struct Point_f64 { x: f64, y: f64 }</code></pre>
</div>

<p>Điều này có nghĩa là không có runtime overhead khi sử dụng generics - bạn nhận được cả tính linh hoạt của dynamic typing và hiệu suất của static typing!</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Generics:</strong>
  <ul>
    <li><strong>Type parameters:</strong> &lt;T&gt;, &lt;T, U&gt; đại diện cho kiểu</li>
    <li><strong>Trait bounds:</strong> &lt;T: Trait&gt; giới hạn kiểu có khả năng</li>
    <li><strong>Generic functions:</strong> fn name&lt;T&gt;(list: &[T])</li>
    <li><strong>Generic structs:</strong> struct Point&lt;T&gt; { x: T, y: T }</li>
    <li><strong>Monomorphization:</strong> Compile-time expansion, không runtime cost</li>
  </ul>
</div>
`,
            defaultCode: `#[derive(Debug)]
struct Point<T> {
    x: T,
    y: T,
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
    let int_point = Point { x: 5, y: 10 };
    let float_point = Point { x: 3.0, y: 4.0 };

    int_point.display();
    float_point.display();
    println!("Khoảng cách: {:.2}", float_point.distance_from_origin());

    let numbers = vec![34, 50, 25, 100, 65];
    println!("Số lớn nhất: {}", largest(&numbers));

    let chars = vec!['y', 'm', 'a', 'q'];
    println!("Char lớn nhất: {}", largest(&chars));
}
`,
            expectedOutput: 'Point(5, 10)\nPoint(3, 4)\nKhoảng cách: 5.00\nSố lớn nhất: 100\nChar lớn nhất: y'
        };
