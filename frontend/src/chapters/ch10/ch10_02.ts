import { Lesson } from '../../courses';

export const ch10_02: Lesson = {
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
        };
