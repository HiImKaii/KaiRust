import { Lesson } from '../../courses';

export const ch10_02: Lesson = {
            id: 'ch10-02',
            title: '10.2 Traits: Định nghĩa hành vi chung',
            duration: '30 phút',
            type: 'practice',
            content: `
<p>Traits cho phép bạn định nghĩa một tập hợp các methods mà nhiều kiểu dữ liệu khác nhau có thể implement. Điều này cho phép bạn định nghĩa behavior mà có thể chia sẻ giữa các types mà không cần biết chính xác type đó là gì.</p>

<h3 class="task-heading">Định nghĩa một Trait</h3>
<p>Trait tương tự như interface trong các ngôn ngữ khác. Trait định nghĩa method signatures mà một type phải implement:</p>

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

<p>Default implementation có thể gọi các methods khác trong cùng trait, ngay cả khi methods đó không có default implementation.</p>

<h3 class="task-heading">Implement Trait cho một Type</h3>
<p>Sau khi định nghĩa trait, bạn có thể implement nó cho bất kỳ type nào:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}</code></pre>
</div>

<p>Việc implement trait tương tự như implement regular methods. Bên trong impl block, chúng ta định nghĩa behavior mà code gọi trait method sẽ nhận được.</p>

<h3 class="task-heading">Sử dụng Traits làm Parameters</h3>
<p>Traits cho phép bạn định nghĩa functions accept nhiều kiểu khác nhau miễn là chúng implement một trait nhất định:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}</code></pre>
</div>

<p>Thay vì accept một type cụ thể như NewsArticle hoặc Tweet, parameter item có kiểu impl Summary, có nghĩa là "bất kỳ type nào có implement Summary".</p>

<h3 class="task-heading">Trait Bound Syntax</h3>
<p>Cú pháp <code>impl Trait</code> là syntactic sugar cho trait bound. Dưới đây là hai cách viết tương đương:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Cú pháp ngắn gọn
pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}

// Trait bound đầy đủ
pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}</code></pre>
</div>

<p>Cú pháp trait bound cho phép bạn linh hoạt hơn, đặc biệt khi làm việc với nhiều parameters.</p>

<h3 class="task-heading">Nhiều Trait Bounds với +</h3>
<p>Bạn có thể specify nhiều trait bounds cho một type:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn notify(item: &(impl Summary + Display)) {
    println!("Breaking news! {}", item.summarize());
}

pub fn notify<T: Summary + Display>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}</code></pre>
</div>

<h3 class="task-heading">Trait Bounds với where Clause</h3>
<p>Đối với complex cases, bạn có thể sử dụng where clause để code dễ đọc hơn:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{
    // ...
}</code></pre>
</div>

<h3 class="task-heading">Returning Types that Implement Traits</h3>
<p>Bạn cũng có thể sử dụng impl Trait trong return position để return một type mà bạn không specify rõ ràng:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    }
}</code></pre>
</div>

<p>Điều này hữu ích khi bạn muốn return một type từ function mà không cần specify chính xác type đó là gì, miễn là nó implement một trait nhất định.</p>

<h3 class="task-heading">Sử dụng Trait Bounds để Conditionally Implement Methods</h3>
<p>Bạn có thể conditionally implement methods cho types dựa trên việc chúng có implement một trait nhất định hay không. Pattern này được gọi là "blanket implementations":</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fmt::Display;

struct Pair&lt;T&gt; {
    x: T,
    y: T,
}

impl&lt;T&gt; Pair&lt;T&gt; {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

// Chỉ implement display_pair nếu T: Display + PartialOrd
impl&lt;T: Display + PartialOrd&gt; Pair&lt;T&gt; {
    fn display_pair(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}</code></pre>
</div>

<p>Blanket implementations cũng được sử dụng rộng rãi trong Rust's standard library. Ví dụ, standard library implement trait Display cho bất kỳ type nào cũng implement trait ToString:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl&lt;T: Display&gt; ToString for T {
    // ToString implementation
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Tóm tắt Traits:</strong>
  <ul>
    <li><strong>Định nghĩa:</strong> trait định nghĩa method signatures</li>
    <li><strong>Default implementations:</strong> có thể có default method bodies</li>
    <li><strong>impl Trait for Type:</strong> implement trait cho một type cụ thể</li>
    <li><strong>Trait parameters:</strong> fn notify(item: &impl Trait)</li>
    <li><strong>Trait bounds:</strong> fn notify&lt;T: Trait&gt;(item: &T)</li>
    <li><strong>Multiple bounds:</strong> T: Trait1 + Trait2</li>
    <li><strong>where clause:</strong> cú pháp thay thế cho readability</li>
    <li><strong>Conditional implementations:</strong> impl&lt;T: Trait&gt; cho blanket implementations</li>
  </ul>
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
        };
