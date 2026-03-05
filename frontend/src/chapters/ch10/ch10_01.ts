import { Lesson } from '../../courses';

export const ch10_01: Lesson = {
            id: 'ch10-01',
            title: '10.1 Generic Data Types',
            duration: '25 phút',
            type: 'theory',
            content: `
<p><strong>Generics</strong> cho phép viết code hoạt động với nhiều kiểu dữ liệu khác nhau mà không cần lặp lại.</p>

<h3 class="task-heading">Generic Functions</h3>
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

<h3 class="task-heading">Generic Structs</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Point&lt;T&gt; {
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
}</code></pre>
</div>

<h3 class="task-heading">Generic Enums</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Quen thuộc rồi!
enum Option&lt;T&gt; { Some(T), None }
enum Result&lt;T, E&gt; { Ok(T), Err(E) }</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Performance:</strong> Rust dùng <strong>monomorphization</strong> tại compile time — mỗi kiểu cụ thể tạo ra code riêng. Không có runtime cost khi dùng generics!
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
