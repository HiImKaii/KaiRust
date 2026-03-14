import { Lesson } from '../../courses';

export const ch10_02: Lesson = {
    id: 'ch10-02',
    title: '10.2 Traits: Định nghĩa hành vi chung',
    duration: '30 phút',
    type: 'theory',
    content: `
<p>Một trait định nghĩa functionality mà một type cụ thể có thể có và có thể chia sẻ với các types khác. Chúng ta có thể sử dụng traits để định nghĩa shared behavior một cách trừu tượng. Chúng ta có thể sử dụng trait bounds để specify rằng một generic type có thể là bất kỳ type nào có certain behavior.</p>

<p>Lưu ý: Traits tương tự như feature thường được gọi là interfaces trong các ngôn ngữ khác, mặc dù có một số khác biệt.</p>

<h3 class="task-heading">Định nghĩa một Trait</h3>
<p>Behavior của một type bao gồm các methods mà chúng ta có thể gọi trên type đó. Các types khác nhau share cùng behavior nếu chúng ta có thể gọi cùng methods trên tất cả các types đó. Trait definitions là một cách để group method signatures lại với nhau để define một tập hợp các behaviors cần thiết để đạt được một mục đích nào đó.</p>

<p>Ví dụ, giả sử chúng ta có nhiều structs lưu trữ các loại và số lượng văn bản khác nhau: một struct NewsArticle lưu trữ một tin tức được đăng ở một location cụ thể và một struct SocialPost có thể có tối đa 280 ký tự cùng với metadata cho biết đó là bài đăng mới, repost hay reply.</p>

<p>Chúng ta muốn tạo một thư viện media aggregator tên là aggregator có thể hiển thị summaries của data có thể được lưu trữ trong NewsArticle hoặc SocialPost instance. Để làm điều này, chúng ta cần một summary từ mỗi type, và chúng ta sẽ yêu cầu summary đó bằng cách gọi method summarize trên một instance.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Summary {
    fn summarize(&self) -> String;
}</code></pre>
</div>

<p>Ở đây, chúng ta khai báo một trait sử dụng từ khóa trait và sau đó là tên của trait, trong trường hợp này là Summary. Chúng ta cũng khai báo trait là pub để các crates phụ thuộc vào crate này có thể sử dụng trait này. Bên trong curly brackets, chúng ta khai báo các method signatures mô tả behaviors của các types sẽ implement trait này, trong trường hợp này là fn summarize(&self) -> String.</p>

<p>Sau method signature, thay vì cung cấp implementation bên trong curly brackets, chúng ta sử dụng một semicolon. Mỗi type implement trait này phải cung cấp custom behavior riêng cho method body. Compiler sẽ enforce rằng bất kỳ type nào có Summary trait sẽ có method summarize được định nghĩa với signature này chính xác.</p>

<p>Một trait có thể có nhiều methods trong body: Các method signatures được liệt kê một dòng mỗi dòng, và mỗi dòng kết thúc bằng một semicolon.</p>

<h3 class="task-heading">Implement một Trait trên một Type</h3>
<p>Bây giờ chúng ta đã định nghĩa desired signatures của Summary trait's methods, chúng ta có thể implement nó trên các types trong media aggregator của chúng ta. Listing 10-13 cho thấy việc implement Summary trait trên struct NewsArticle sử dụng headline, author và location để tạo return value cho summarize. Đối với SocialPost struct, chúng ta định nghĩa summarize là username followed by toàn bộ text của post.</p>

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

pub struct SocialPost {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub repost: bool,
}

impl Summary for SocialPost {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}</code></pre>
</div>

<p>Implement một trait trên một type tương tự như implement regular methods. Điểm khác biệt là sau impl, chúng ta đặt tên trait muốn implement, sau đó sử dụng từ khóa for, và sau đó specify tên type muốn implement trait đó.</p>

<p>Bây giờ thư viện đã implement Summary trait trên NewsArticle và SocialPost, users của crate có thể gọi các trait methods trên instances giống như cách gọi regular methods. Điểm khác biệt là user phải đưa trait vào scope cũng như các types.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use aggregator::{SocialPost, Summary};

fn main() {
    let post = SocialPost {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        repost: false,
    };

    println!("1 new post: {}", post.summarize());
}</code></pre>
</div>

<p>Code này in ra: 1 new post: horse_ebooks: of course, as you probably already know, people</p>

<p>Các crates khác phụ thuộc vào aggregator crate cũng có thể đưa Summary trait vào scope để implement Summary trên các types của riêng họ. Một restriction cần lưu ý là chúng ta chỉ có thể implement một trait trên một type nếu either trait hoặc type, hoặc cả hai, đều là local đối với crate của chúng ta.</p>

<p>Nhưng chúng ta không thể implement external traits trên external types. Ví dụ, chúng ta không thể implement Display trait trên Vec<T> trong aggregator crate của chúng ta, bởi vì Display và Vec<T> đều được định nghĩa trong standard library và không phải là local đối với aggregator crate của chúng ta. Restriction này là một phần của property gọi là coherence, và cụ thể hơn là orphan rule.</p>

<h3 class="task-heading">Sử dụng Default Implementations</h3>
<p>Đôi khi hữu ích khi có default behavior cho một số hoặc tất cả các methods trong một trait thay vì require implementations cho tất cả methods trên mỗi type. Sau đó, khi chúng ta implement trait trên một particular type, chúng ta có thể giữ lại hoặc override default behavior của mỗi method.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}</code></pre>
</div>

<p>Để sử dụng một default implementation để summarize instances của NewsArticle, chúng ta specify một empty impl block với impl Summary for NewsArticle {}.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let article = NewsArticle {
    headline: String::from("Penguins win the Stanley Cup Championship!"),
    location: String::from("Pittsburgh, PA, USA"),
    author: String::from("Iceburgh"),
    content: String::from(
        "The Pittsburgh Penguins once again are the best \
         hockey team in the NHL.",
    ),
};

println!("New article available! {}", article.summarize());</code></pre>
</div>

<p>Code này in ra: New article available! (Read more...)</p>

<p>Default implementations có thể gọi các methods khác trong cùng một trait, ngay cả khi các methods khác đó không có default implementation. Theo cách này, một trait có thể cung cấp rất nhiều useful functionality và chỉ require implementors specify một phần nhỏ của nó.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}</code></pre>
</div>

<div class="cyber-alert warning">
  <strong>Lưu ý:</strong> Không thể gọi default implementation từ một overriding implementation của cùng một method.
</div>

<h3 class="task-heading">Sử dụng Traits làm Parameters</h3>
<p>Chúng ta có thể sử dụng traits để định nghĩa functions accept nhiều types khác nhau. Để làm điều này, chúng ta sử dụng cú pháp impl Trait:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}</code></pre>
</div>

<p>Thay vì một concrete type cho item parameter, chúng ta specify từ khóa impl và tên trait. Parameter này accept bất kỳ type nào implement specified trait.</p>

<h3 class="task-heading">Trait Bound Syntax</h3>
<p>Cú pháp impl Trait thực ra là syntactic sugar cho một form dài hơn được gọi là trait bound:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn notify<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}</code></pre>
</div>

<p>Nếu chúng ta muốn force cả hai parameters có cùng type, chúng ta phải sử dụng một trait bound:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn notify<T: Summary>(item1: &T, item2: &T) {

}</code></pre>
</div>

<h3 class="task-heading">Multiple Trait Bounds với + Syntax</h3>
<p>Chúng ta có thể specify nhiều hơn một trait bound sử dụng cú pháp +:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn notify(item: &(impl Summary + Display)) {

}

pub fn notify<T: Summary + Display>(item: &T) {

}</code></pre>
</div>

<h3 class="task-heading">Clearer Trait Bounds với where Clauses</h3>
<p>Sử dụng quá nhiều trait bounds có những downside. Rust có cú pháp thay thế để specify trait bounds bên trong một where clause sau function signature:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn some_function<T, U>(t: &T, u: &U) -> i32
where
    T: Display + Clone,
    U: Clone + Debug,
{

}</code></pre>
</div>

<h3 class="task-heading">Returning Types That Implement Traits</h3>
<p>Chúng ta cũng có thể sử dụng cú pháp impl Trait trong return position để return một giá trị của một số type implement một trait:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn returns_summarizable() -> impl Summary {
    SocialPost {
        username: String::from("horse_ebooks"),
        content: String::from(
            "of course, as you probably already know, people",
        ),
        reply: false,
        repost: false,
    }
}</code></pre>
</div>

<p>Tuy nhiên, bạn chỉ có thể sử dụng impl Trait nếu bạn đang return một single type.</p>

<h3 class="task-heading">Sử dụng Trait Bounds để Conditionally Implement Methods</h3>
<p>Bằng cách sử dụng một trait bound với một impl block sử dụng generic type parameters, chúng ta có thể implement methods conditionally cho các types implement specified traits.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}</code></pre>
</div>

<p>Chúng ta cũng có thể conditionally implement một trait cho bất kỳ type nào implement một trait khác. Implementations của một trait trên bất kỳ type nào satisfy trait bounds được gọi là blanket implementations và được sử dụng rộng rãi trong Rust standard library.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl<T: Display> ToString for T {
    // --snip--
}

let s = 3.to_string();</code></pre>
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
