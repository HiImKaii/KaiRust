import { Chapter } from '../courses';

export const ch10: Chapter = {
    id: 'ch10',
    title: 'Chương 10: Generics, Traits, Lifetimes',
    lessons: [
        {
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
        },
        {
            id: 'ch10-02',
            title: '10.2 Traits: Định nghĩa hành vi chung',
            duration: '30 phút',
            type: 'practice',
            content: `
<p><strong>Trait</strong> định nghĩa một tập hợp methods mà kiểu dữ liệu phải implement. Tương tự interface (Java) nhưng mạnh hơn.</p>

<h3 class="task-heading">Định nghĩa Trait</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Summary {
    fn summarize(&self) -> String;

    // Default implementation
    fn preview(&self) -> String {
        format!("(Đọc thêm: {}...)", self.summarize())
    }
}</code></pre>
</div>

<h3 class="task-heading">Implement Trait</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct NewsArticle {
    headline: String,
    author: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {}", self.headline, self.author)
    }
}</code></pre>
</div>

<h3 class="task-heading">Traits làm parameters</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Syntax sugar
fn notify(item: &impl Summary) {
    println!("Breaking: {}", item.summarize());
}

// Trait bound syntax (tương đương)
fn notify&lt;T: Summary&gt;(item: &T) {
    println!("Breaking: {}", item.summarize());
}

// Nhiều trait bounds
fn notify(item: &(impl Summary + Display)) {}

// where clause (dễ đọc hơn)
fn some_fn&lt;T, U&gt;(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{ ... }</code></pre>
</div>
`,
            defaultCode: `trait Describable {
    fn describe(&self) -> String;

    fn short(&self) -> String {
        String::from("...")
    }
}

struct Dog {
    name: String,
    breed: String,
}

struct Cat {
    name: String,
    indoor: bool,
}

impl Describable for Dog {
    fn describe(&self) -> String {
        format!("🐕 {} (giống {})", self.name, self.breed)
    }
}

impl Describable for Cat {
    fn describe(&self) -> String {
        let location = if self.indoor { "trong nhà" } else { "ngoài trời" };
        format!("🐱 {} (sống {})", self.name, location)
    }
}

fn print_info(item: &impl Describable) {
    println!("{}", item.describe());
}

fn main() {
    let dog = Dog {
        name: String::from("Rex"),
        breed: String::from("Husky"),
    };
    let cat = Cat {
        name: String::from("Miu"),
        indoor: true,
    };

    print_info(&dog);
    print_info(&cat);
}
`,
            expectedOutput: '🐕 Rex (giống Husky)\n🐱 Miu (sống trong nhà)'
        },
        {
            id: 'ch10-03',
            title: '10.3 Lifetimes',
            duration: '30 phút',
            type: 'theory',
            content: `
<p><strong>Lifetimes</strong> là hệ thống unique của Rust đảm bảo mọi reference đều hợp lệ. Lifetime annotation cho bạn biết reference sống bao lâu.</p>

<h3 class="task-heading">Vấn đề: Dangling References</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// LỖI COMPILE!
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() { x } else { y }
}
// Compiler không biết return value sống bao lâu!</code></pre>
</div>

<h3 class="task-heading">Lifetime Annotations</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
// 'a nghĩa là: return value sống ít nhất bằng
// lifetime ngắn nhất của x và y</code></pre>
</div>

<h3 class="task-heading">Lifetime trong Structs</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct ImportantExcerpt<'a> {
    part: &'a str,
}

let novel = String::from("Call me Ishmael. Some years ago...");
let first_sentence = novel.split('.').next().unwrap();
let i = ImportantExcerpt {
    part: first_sentence,
};</code></pre>
</div>

<h3 class="task-heading">Lifetime Elision Rules</h3>
<p>Compiler tự suy luận lifetime trong 3 trường hợp:</p>
<ol>
  <li>Mỗi reference parameter nhận lifetime riêng</li>
  <li>Nếu chỉ có 1 input lifetime → output dùng lifetime đó</li>
  <li>Nếu có <code>&self</code> → output dùng lifetime của self</li>
</ol>

<h3 class="task-heading">Static Lifetime</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// 'static sống suốt chương trình
let s: &'static str = "Tôi sống mãi mãi";</code></pre>
</div>
`,
            defaultCode: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

fn main() {
    let string1 = String::from("chuỗi dài hơn");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
        println!("Chuỗi dài hơn: {result}");
    }

    // first_word — lifetime elision
    let sentence = "Hello beautiful world";
    let word = first_word(sentence);
    println!("Từ đầu: {word}");

    // Static lifetime
    let s: &'static str = "Tôi tồn tại suốt chương trình";
    println!("{s}");
}
`,
            expectedOutput: 'Chuỗi dài hơn: chuỗi dài hơn\nTừ đầu: Hello\nTôi tồn tại suốt chương trình'
        }
    ]
};
