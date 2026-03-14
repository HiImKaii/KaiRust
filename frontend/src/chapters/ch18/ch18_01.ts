import { Lesson } from '../../courses';

export const ch18_01: Lesson = {
            id: '18-01',
            title: '18.1 Đặc Điểm Của Ngôn Ngữ Hướng Đối Tượng',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Không có sự đồng thuận trong cộng đồng lập trình về việc ngôn ngữ phải có những tính năng nào để được coi là hướng đối tượng. Rust chịu ảnh hưởng của nhiều paradigms lập trình, bao gồm OOP; ví dụ, chúng ta đã khám phá các tính năng đến từ lập trình hàm trong Chương 13. Có thể lập luận rằng các ngôn ngữ OOP chia sẻ một số đặc điểm chung—cụ thể là objects, encapsulation, và inheritance. Hãy xem mỗi đặc điểm đó có nghĩa gì và liệu Rust có hỗ trợ nó không.</p>

<h3 class="task-heading">Objects Chứa Data và Behavior</h3>
<p>Cuốn sách Design Patterns: Elements of Reusable Object-Oriented Software của Erich Gamma, Richard Helm, Ralph Johnson, và John Vlissides (Addison-Wesley, 1994), thường được gọi là cuốn Gang of Four book, là một catalog của các object-oriented design patterns. Nó định nghĩa OOP theo cách này:</p>
<blockquote>
<p>Các chương trình hướng đối tượng được tạo thành từ các objects. Một object đóng gói cả data và các procedures hoạt động trên data đó. Các procedures thường được gọi là methods hoặc operations.</p>
</blockquote>
<p>Sử dụng định nghĩa này, Rust là hướng đối tượng: Structs và enums có data, và các impl blocks cung cấp methods trên structs và enums. Mặc dù structs và enums với methods không được gọi là objects, chúng cung cấp cùng chức năng, theo định nghĩa của Gang of Four về objects.</p>

<h3 class="task-heading">Encapsulation Ẩn Implementation Details</h3>
<p>Một khía cạnh khác thường được liên kết với OOP là ý tưởng encapsulation, có nghĩa là các implementation details của một object không accessible đối với code sử dụng object đó. Do đó, cách duy nhất để tương tác với một object là thông qua its public API; code sử dụng object không nên có khả năng reach vào internals của object và thay đổi data hoặc behavior trực tiếp. Điều này cho phép programmer thay đổi và refactor internals của object mà không cần thay đổi code sử dụng object.</p>

<p>Chúng ta đã thảo luận cách kiểm soát encapsulation trong Chương 7: Chúng ta có thể sử dụng từ khóa pub để quyết định modules, types, functions, và methods nào trong code của chúng ta nên public, và mặc định mọi thứ khác đều private. Ví dụ, chúng ta có thể định nghĩa một struct AveragedCollection có một field chứa một vector các giá trị i32. Struct cũng có thể có một field chứa trung bình của các giá trị trong vector, có nghĩa là trung bình không phải tính toán on demand bất cứ khi nào ai đó cần nó. Nói cách khác, AveragedCollection sẽ cache calculated average cho chúng ta. Listing 18-1 có định nghĩa của struct AveragedCollection.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct AveragedCollection {
    list: Vec&lt;i32&gt;,
    average: f64,
}</code></pre>
</div>
<p><em>Listing 18-1: Một struct AveragedCollection duy trì một list các integers và trung bình của các items trong collection</em></p>

<p>Struct được đánh dấu pub để code khác có thể sử dụng nó, nhưng các fields trong struct vẫn private. Điều này quan trọng trong trường hợp này vì chúng ta muốn đảm bảo rằng bất cứ khi nào một giá trị được thêm vào hoặc xóa khỏi list, average cũng được cập nhật. Chúng ta làm điều này bằng cách implement các methods add, remove, và average trên struct, như trong Listing 18-2.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl AveragedCollection {
    pub fn add(&mut self, value: i32) {
        self.list.push(value);
        self.update_average();
    }

    pub fn remove(&mut self) -> Option&lt;i32&gt; {
        let result = self.list.pop();
        match result {
            Some(value) => {
                self.update_average();
                Some(value)
            }
            None => None,
        }
    }

    pub fn average(&self) -> f64 {
        self.average
    }

    fn update_average(&mut self) {
        let total: i32 = self.list.iter().sum();
        self.average = total as f64 / self.list.len() as f64;
    }
}</code></pre>
</div>
<p><em>Listing 18-2: Implementations của các public methods add, remove, và average trên AveragedCollection</em></p>

<p>Các public methods add, remove, và average là cách duy nhất để truy cập hoặc modify data trong một instance của AveragedCollection. Khi một item được thêm vào list sử dụng method add hoặc được remove sử dụng method remove, implementations của mỗi cái gọi private method update_average xử lý việc update average field.</p>

<p>Chúng ta để các fields list và average private để không có cách nào cho external code thêm hoặc remove items vào hoặc từ field list trực tiếp; nếu không, field average có thể trở nên out of sync khi list thay đổi. Method average trả về giá trị trong field average, cho phép external code đọc average nhưng không modify nó.</p>

<p>Vì chúng ta đã encapsulate implementation details của struct AveragedCollection, chúng ta có thể dễ dàng thay đổi các khía cạnh, như data structure, trong tương lai. Ví dụ, chúng ta có thể sử dụng HashSet&lt;i32&gt; thay vì Vec&lt;i32&gt; cho field list. Miễn là signatures của các public methods add, remove, và average giữ nguyên, code sử dụng AveragedCollection sẽ không cần thay đổi. Nếu chúng ta làm cho list public thay vào đó, điều này không nhất thiết là trường hợp: HashSet&lt;i32&gt; và Vec&lt;i32&gt; có các methods khác nhau để thêm và remove items, vì vậy external code có thể phải thay đổi nếu nó đang modify list trực tiếp.</p>

<p>Nếu encapsulation là một khía cạnh bắt buộc để một ngôn ngữ được coi là hướng đối tượng, thì Rust đáp ứng yêu cầu đó. Tùy chọn sử dụng pub hoặc không cho các phần khác nhau của code cho phép encapsulation của implementation details.</p>

<h3 class="task-heading">Inheritance như một Type System và như Code Sharing</h3>
<p>Inheritance là một cơ chế mà qua đó một object có thể inherit các elements từ definition của object khác, do đó có được data và behavior của parent object mà không cần định nghĩa lại chúng.</p>

<p>Nếu một ngôn ngữ phải có inheritance để là hướng đối tượng, thì Rust không phải là ngôn ngữ như vậy. Không có cách nào để định nghĩa một struct inherit các fields và method implementations của parent struct mà không sử dụng một macro.</p>

<p>Tuy nhiên, nếu bạn đã quen có inheritance trong programming toolbox của mình, bạn có thể sử dụng các giải pháp khác trong Rust, tùy thuộc vào lý do bạn sử dụng inheritance ngay từ đầu.</p>
<p>Bạn sẽ chọn inheritance vì hai lý do chính. Một là để reuse code: Bạn có thể implement một behavior cụ thể cho một type, và inheritance cho phép bạn reuse implementation đó cho một type khác. Bạn có thể làm điều này một cách hạn chế trong Rust code sử dụng default trait method implementations, mà bạn đã thấy trong Listing 10-14 khi chúng ta thêm một default implementation của method summarize trên trait Summary. Bất kỳ type nào implement trait Summary sẽ có method summarize available mà không cần thêm code. Điều này tương tự như một parent class có một implementation của một method và một inheriting child class cũng có implementation của method đó. Chúng ta cũng có thể override default implementation của method summarize khi chúng ta implement trait Summary, tương tự như một child class override implementation của một method inherited từ một parent class.</p>

<p>Lý do khác để sử dụng inheritance liên quan đến type system: để enable một child type được sử dụng ở cùng places như parent type. Điều này cũng được gọi là polymorphism, có nghĩa là bạn có thể substitute nhiều objects cho nhau tại runtime nếu chúng chia sẻ một số đặc điểm nhất định.</p>

<h3 class="task-heading">Polymorphism</h3>
<p>Đối với nhiều người, polymorphism đồng nghĩa với inheritance. Nhưng thực tế nó là một khái niệm tổng quát hơn tham chiếu đến code có thể làm việc với data của nhiều types. Đối với inheritance, các types đó thường là subclasses.</p>
<p>Rust thay vào đó sử dụng generics để abstract over các possible types khác nhau và trait bounds để impose constraints về những gì các types đó phải cung cấp. Điều này đôi khi được gọi là bounded parametric polymorphism.</p>
<p>Rust đã chọn một tập hợp khác các trade-offs bằng cách không cung cấp inheritance. Inheritance thường có nguy cơ share nhiều code hơn cần thiết. Subclasses không nên luôn luôn share tất cả characteristics của parent class nhưng sẽ làm vậy với inheritance. Điều này có thể làm cho design của chương trình ít linh hoạt hơn. Nó cũng giới thiệu khả năng gọi methods trên subclasses mà không có ý nghĩa hoặc gây ra errors vì các methods không apply cho subclass. Ngoài ra, một số ngôn ngữ sẽ chỉ cho phép single inheritance (có nghĩa là một subclass chỉ có thể inherit từ một class), hạn chế hơn nữa sự linh hoạt của design chương trình.</p>
<p>Vì những lý do này, Rust tiếp cận theo cách khác bằng cách sử dụng trait objects thay vì inheritance để đạt được polymorphism tại runtime. Hãy xem cách trait objects hoạt động.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Đặc Điểm OOP trong Rust:</strong>
  <ul>
    <li><strong>Objects</strong> - Structs và enums với methods (theo Gang of Four)</li>
    <li><strong>Encapsulation</strong> - Sử dụng pub để kiểm soát truy cập</li>
    <li><strong>Không có Inheritance</strong> - Thay vào đó dùng Traits với default implementations</li>
    <li><strong>Polymorphism</strong> - Generics + Trait bounds (bounded parametric polymorphism)</li>
    <li><strong>Trait Objects</strong> - Dynamic dispatch với dyn Trait</li>
  </ul>
</div>
`,
            defaultCode: `// Demo: Trait với default implementation
trait Summary {
    fn summarize(&self) -> String {
        String::from("(Unknown summary)")
    }

    fn author(&self) -> &str;
}

struct Article {
    pub author: String,
    pub title: String,
}

impl Summary for Article {
    fn author(&self) -> &str {
        &self.author
    }
    // summarize() sử dụng default implementation
}

struct Tweet {
    pub username: String,
    pub content: String,
}

impl Summary for Tweet {
    fn author(&self) -> &str {
        &self.username
    }

    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

fn main() {
    let article = Article {
        author: "Alice".to_string(),
        title: "Rust Tutorial".to_string(),
    };

    let tweet = Tweet {
        username: "bob".to_string(),
        content: "Hello world!".to_string(),
    };

    println!("Article: {}", article.summarize());
    println!("Tweet: {}", tweet.summarize());
}
`,
            expectedOutput: `Article: (Unknown summary)
Tweet: bob: Hello world!`
        };
