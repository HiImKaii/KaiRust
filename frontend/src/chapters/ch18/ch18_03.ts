import { Lesson } from '../../courses';

export const ch18_03: Lesson = {
            id: '18-03',
            title: '18.3 Triển Khai Một Object-Oriented Design Pattern',
            duration: '35 phút',
            type: 'theory',
            content: `
<p>State pattern là một object-oriented design pattern. Trọng tâm của pattern là chúng ta định nghĩa một tập hợp các trạng thái mà một giá trị có thể có bên trong. Các trạng thái được đại diện bởi một tập hợp các state objects, và hành vi của giá trị thay đổi dựa trên trạng thái của nó. Chúng ta sẽ đi qua một ví dụ về một blog post struct có một trường để giữ trạng thái của nó, sẽ là một state object từ tập hợp "draft," "review," hoặc "published."</p>

<p>Các state objects chia sẻ functionality: Trong Rust, tất nhiên, chúng ta sử dụng structs và traits thay vì objects và inheritance. Mỗi state object chịu trách nhiệm cho hành vi của chính nó và cho việc quản lý khi nào nó nên chuyển đổi sang một trạng thái khác. Giá trị giữ một state object không biết gì về các hành vi khác nhau của các trạng thái hoặc khi nào chuyển đổi giữa các trạng thái.</p>

<p>Ưu điểm của việc sử dụng state pattern là, khi các yêu cầu kinh doanh của chương trình thay đổi, chúng ta sẽ không cần thay đổi code của giá trị giữ trạng thái hoặc code sử dụng giá trị đó. Chúng ta sẽ chỉ cần cập nhật code bên trong một trong các state objects để thay đổi các quy tắc của nó hoặc có thể thêm các state objects khác.</p>

<p>Đầu tiên, chúng ta sẽ implement state pattern theo cách object-oriented truyền thống. Sau đó, chúng ta sẽ sử dụng một cách tiếp cận tự nhiên hơn trong Rust. Hãy đi vào implement một blog post workflow sử dụng state pattern.</p>

<p>Chức năng cuối cùng sẽ như thế này:</p>
<ul>
    <li>Một blog post bắt đầu như một bản nháp trống.</li>
    <li>Khi bản nháp hoàn thành, một review của post được yêu cầu.</li>
    <li>Khi post được duyệt, nó được xuất bản.</li>
    <li>Chỉ các blog posts đã xuất bản trả về content để in để các posts chưa được duyệt không thể vô tình được xuất bản.</li>
</ul>

<p>Bất kỳ thay đổi nào khác được thử nghiệm trên một post nên không có hiệu lực. Ví dụ, nếu chúng ta cố gắng duyệt một blog post bản nháp trước khi yêu cầu review, post nên vẫn là một bản nháp chưa xuất bản.</p>

<h3 class="task-heading">Thử Nghiệm Object-Oriented Style Truyền Thống</h3>
<p>Có vô số cách để cấu trúc code để giải quyết cùng một vấn đề, mỗi cái có các trade-offs khác nhau. Implementation trong phần này là hơn một object-oriented style truyền thống, có thể viết trong Rust, nhưng không tận dụng một số điểm mạnh của Rust. Sau đó, chúng ta sẽ trình bày một giải pháp khác vẫn sử dụng object-oriented design pattern nhưng được cấu trúc theo cách có thể trông quen thuộc hơn với các lập trình viên có kinh nghiệm object-oriented. Chúng ta sẽ so sánh hai giải pháp để trải nghiệm các trade-offs của việc thiết kế code Rust khác với code trong các ngôn ngữ khác.</p>

<p>Listing 18-11 cho thấy workflow này dưới dạng code: Đây là một ví dụ sử dụng API mà chúng ta sẽ implement trong một thư viện crate tên là blog. Điều này sẽ không biên dịch được vì chúng ta chưa implement crate blog.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code> [Mã này không biên dịch được!]
use blog::Post;

fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");
    assert_eq!("", post.content());

    post.request_review();
    assert_eq!("", post.content());

    post.approve();
    assert_eq!("I ate a salad for lunch today", post.content());
}</code></pre>
</div>
<p><em>Listing 18-11: Code minh họa hành vi mong muốn mà chúng ta muốn crate blog có</em></p>

<p>Chúng ta muốn cho phép người dùng tạo một blog post bản nháp mới với Post::new. Chúng ta muốn cho phép text được thêm vào blog post. Nếu chúng ta cố gắng lấy content của post ngay lập tức, trước khi duyệt, chúng ta không nên nhận được bất kỳ text nào vì post vẫn là một bản nháp. Chúng ta đã thêm assert_eq! trong code cho mục đích minh họa. Một unit test xuất sắc cho điều này sẽ là assert rằng một blog post bản nháp trả về một chuỗi rỗng từ method content, nhưng chúng ta sẽ không viết tests cho ví dụ này.</p>

<p>Tiếp theo, chúng ta muốn cho phép yêu cầu review cho post, và chúng ta muốn content trả về một chuỗi rỗng trong khi chờ review. Khi post nhận được sự chấp thuận, nó sẽ được xuất bản, có nghĩa là text của post sẽ được trả về khi content được gọi.</p>

<p>Lưu ý rằng type duy nhất chúng ta đang tương tác từ crate là type Post. Type này sẽ sử dụng state pattern và sẽ giữ một giá trị sẽ là một trong ba state objects đại diện cho các trạng thái khác nhau mà một post có thể có—draft, review, hoặc published. Thay đổi từ một trạng thái sang trạng thái khác sẽ được quản lý bên trong type Post. Các trạng thái thay đổi để đáp ứng các methods được gọi bởi người dùng thư viện trên Post instance, nhưng họ không phải quản lý các thay đổi trạng thái trực tiếp. Ngoài ra, người dùng không thể mắc sai lầm với các trạng thái, như xuất bản một post trước khi được review.</p>

<h3 class="task-heading">Định nghĩa Post và Tạo Instance Mới</h3>
<p>Hãy bắt đầu implement thư viện! Chúng ta biết chúng ta cần một public Post struct giữ một số content, vì vậy chúng ta sẽ bắt đầu với định nghĩa của struct và một function new liên quan công khai để tạo một Post instance, như trong Listing 18-12. Chúng ta cũng sẽ tạo một State trait private sẽ định nghĩa hành vi mà tất cả state objects cho Post phải có.</p>

<p>Sau đó, Post sẽ giữ một trait object của Box&lt;dyn State&gt; bên trong một Option&lt;T&gt; trong một trường private tên là state. Bạn sẽ thấy tại sao Option&lt;T&gt; là cần thiết.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Post {
    state: Option&lt;Box&lt;dyn State&gt;&gt;,
    content: String,
}

impl Post {
    pub fn new() -> Post {
        Post {
            state: Some(Box::new(Draft {})),
            content: String::new(),
        }
    }
}

trait State {}

struct Draft {}

impl State for Draft {}</code></pre>
</div>
<p><em>Listing 18-12: Định nghĩa của struct Post và function new, State trait, và Draft struct</em></p>

<p>State trait định nghĩa hành vi được chia sẻ bởi các trạng thái post khác nhau. Các state objects là Draft, PendingReview, và Published, và tất cả sẽ implement State trait. Bây giờ, trait không có bất kỳ methods nào, và chúng ta sẽ bắt đầu bằng cách chỉ định nghĩa Draft state vì đó là trạng thái mà chúng ta muốn post bắt đầu.</p>

<p>Khi chúng ta tạo một Post mới, chúng ta đặt trường state thành một Some value giữ một Box. Box này trỏ đến một instance mới của Draft struct. Điều này đảm bảo rằng bất cứ khi nào chúng ta tạo một Post instance mới, nó sẽ bắt đầu như một bản nháp. Vì trường state của Post là private, không có cách nào để tạo Post trong bất kỳ trạng thái nào khác! Trong function Post::new, chúng ta đặt trường content thành một String mới, trống.</p>

<h3 class="task-heading">Lưu Trữ Text của Post Content</h3>
<p>Chúng ta đã thấy trong Listing 18-11 rằng chúng ta muốn có thể gọi một method tên là add_text và truyền cho nó một &str được thêm làm text content của blog post. Chúng ta implement điều này như một method, thay vì để trường content là pub, để sau này chúng ta có thể implement một method sẽ kiểm soát cách đọc dữ liệu của trường content. Method add_text khá đơn giản, vì vậy hãy thêm implementation trong Listing 18-13 vào impl Post block.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Post {
    // --snip--
    pub fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }
}</code></pre>
</div>
<p><em>Listing 18-13: Implement method add_text để thêm text vào content của post</em></p>

<p>Method add_text nhận một tham chiếu mutable đến self vì chúng ta đang thay đổi Post instance mà chúng ta gọi add_text. Sau đó, chúng ta gọi push_str trên String trong content và truyền text argument để thêm vào content đã lưu. Hành vi này không phụ thuộc vào trạng thái mà post đang ở, vì vậy nó không phải là một phần của state pattern. Method add_text không tương tác với trường state, nhưng nó là một phần của hành vi chúng ta muốn hỗ trợ.</p>

<h3 class="task-heading">Đảm Bảo Content của Draft Post Là Rỗng</h3>
<p>Ngay cả sau khi chúng ta gọi add_text và thêm một số content vào post, chúng ta vẫn muốn method content trả về một chuỗi slice rỗng vì post vẫn ở trạng thái draft, như được hiển thị bởi assert_eq! đầu tiên trong Listing 18-11. Bây giờ, hãy implement method content với điều đơn giản nhất sẽ đáp ứng yêu cầu này: luôn trả về một chuỗi slice rỗng. Chúng ta sẽ thay đổi điều này sau khi implement khả năng thay đổi trạng thái của post để nó có thể được xuất bản. Cho đến nay, posts chỉ có thể ở trạng thái draft, vì vậy content của post luôn nên trống. Listing 18-14 cho thấy implementation placeholder này.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Post {
    // --snip--
    pub fn content(&self) -> &str {
        ""
    }
}</code></pre>
</div>
<p><em>Listing 18-14: Thêm implementation placeholder cho method content trên Post luôn trả về chuỗi slice rỗng</em></p>

<p>Với method content này được thêm, mọi thứ trong Listing 18-11 qua assert_eq! đầu tiên hoạt động như mong đợi.</p>

<h3 class="task-heading">Yêu Cầu Review, Thay Đổi Trạng Thái của Post</h3>
<p>Tiếp theo, chúng ta cần thêm chức năng yêu cầu review của một post, nên thay đổi trạng thái của nó từ Draft sang PendingReview. Listing 18-15 cho thấy code này.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Post {
    // --snip--
    pub fn request_review(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.request_review())
        }
    }
}

trait State {
    fn request_review(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt;;
}

struct Draft {}

impl State for Draft {
    fn request_review(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt; {
        Box::new(PendingReview {})
    }
}

struct PendingReview {}

impl State for PendingReview {
    fn request_review(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt; {
        self
    }
}</code></pre>
</div>
<p><em>Listing 18-15: Implement request_review methods trên Post và State trait</em></p>

<p>Chúng ta cho Post một public method tên là request_review sẽ nhận một tham chiếu mutable đến self. Sau đó, chúng ta gọi một internal request_review method trên trạng thái hiện tại của Post, và method request_review thứ hai tiêu thụ trạng thái hiện tại và trả về một trạng thái mới.</p>

<p>Chúng ta thêm method request_review vào State trait; tất cả các types implement trait bây giờ sẽ cần implement method request_review. Lưu ý rằng thay vì có self, &self, hoặc &mut self như tham số đầu tiên của method, chúng ta có self: Box&lt;Self&gt;. Cú pháp này có nghĩa là method chỉ hợp lệ khi được gọi trên một Box giữ type. Cú pháp này lấy ownership của Box&lt;Self&gt;, làm mất hiệu lực trạng thái cũ để giá trị state của Post có thể chuyển đổi thành một trạng thái mới.</p>

<p>Để tiêu thụ giá trị trạng thái cũ, method request_review cần lấy ownership của giá trị state. Đây là nơi Option trong trường state của Post xuất hiện: Chúng ta gọi method take để lấy Some value ra khỏi trường state và để lại một None thay vì vì Rust không cho phép chúng ta có các trường không được điền trong structs. Điều này cho phép chúng ta di chuyển giá trị state ra khỏi Post thay vì borrow nó. Sau đó, chúng ta sẽ đặt giá trị state của post thành kết quả của operation này.</p>

<p>Method request_review trên Draft trả về một instance mới, boxed của struct PendingReview mới, đại diện cho trạng thái khi một post đang chờ review. Struct PendingReview cũng implement method request_review nhưng không thực hiện bất kỳ chuyển đổi nào. Thay vào đó, nó trả về chính nó vì khi chúng ta yêu cầu review trên một post đã ở trạng thái PendingReview, nó nên ở trong trạng thái PendingReview.</p>

<p>Bây giờ chúng ta có thể thấy ưu điểm của state pattern: Method request_review trên Post giống nhau bất kể giá trị trạng thái. Mỗi trạng thái chịu trách nhiệm cho các quy tắc của chính nó.</p>

<p>Chúng ta sẽ để method content trên Post như cũ, trả về một chuỗi slice rỗng. Bây giờ chúng ta có thể có một Post ở trạng thái PendingReview cũng như trạng thái Draft, nhưng chúng ta muốn cùng hành vi trong trạng thái PendingReview. Listing 18-11 bây giờ hoạt động đến assert_eq! thứ hai!</p>

<h3 class="task-heading">Thêm approve để Thay đổi Behavior của content</h3>
<p>Method approve sẽ tương tự như method request_review: Nó sẽ đặt state thành giá trị mà trạng thái hiện tại nói nó nên có khi trạng thái đó được duyệt, như trong Listing 18-16.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Post {
    // --snip--
    pub fn approve(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.approve())
        }
    }
}

trait State {
    fn request_review(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt;;
    fn approve(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt;;
}

struct Draft {}

impl State for Draft {
    // --snip--
    fn approve(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt; {
        self
    }
}

struct PendingReview {}

impl State for PendingReview {
    // --snip--
    fn approve(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt; {
        Box::new(Published {})
    }
}

struct Published {}

impl State for Published {
    fn request_review(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt; {
        self
    }

    fn approve(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt; {
        self
    }
}</code></pre>
</div>
<p><em>Listing 18-16: Implement approve method trên Post và State trait</em></p>

<p>Chúng ta thêm method approve vào State trait và thêm một struct mới implement State, trạng thái Published.</p>

<p>Tương tự như cách request_review trên PendingReview hoạt động, nếu chúng ta gọi approve method trên Draft, nó sẽ không có hiệu lực vì approve sẽ trả về self. Khi chúng ta gọi approve trên PendingReview, nó trả về một instance mới, boxed của struct Published. Struct Published implement State trait, và cho cả method request_review và approve, nó trả về chính nó vì post nên ở trong trạng thái Published trong những trường hợp đó.</p>

<p>Bây giờ chúng ta cần cập nhật method content trên Post. Chúng ta muốn giá trị được trả về từ content phụ thuộc vào trạng thái hiện tại của Post, vì vậy chúng ta sẽ để Post delegate đến một method content được định nghĩa trên state của nó, như trong Listing 18-17.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code> [Mã này không biên dịch được!]
impl Post {
    // --snip--
    pub fn content(&self) -> &str {
        self.state.as_ref().unwrap().content(self)
    }
    // --snip--
}</code></pre>
</div>
<p><em>Listing 18-17: Cập nhật method content trên Post để delegate đến method content trên State</em></p>

<p>Vì mục tiêu là giữ tất cả các quy tắc này bên trong các structs implement State, chúng ta gọi method content trên giá trị trong state và truyền post instance (tức là self) như một argument. Sau đó, chúng ta trả về giá trị được trả về từ việc sử dụng method content trên giá trị state.</p>

<p>Chúng ta gọi method as_ref trên Option vì chúng ta muốn một tham chiếu đến giá trị bên trong Option thay vì ownership của giá trị. Vì state là một Option&lt;Box&lt;dyn State&gt;&gt;, khi chúng ta gọi as_ref, một Option&lt;&Box&lt;dyn State&gt;&gt; được trả về. Nếu chúng ta không gọi as_ref, chúng ta sẽ nhận được một error vì chúng ta không thể move state ra khỏi borrowed &self của function parameter.</p>

<p>Sau đó chúng ta gọi method unwrap, mà chúng ta biết sẽ không bao giờ panic vì chúng ta biết các methods trên Post đảm bảo rằng state sẽ luôn chứa một Some value khi các methods đó hoàn thành. Đây là một trong những cases chúng ta đã nói đến trong phần "When You Have More Information Than the Compiler" của Chương 9 khi chúng ta biết rằng một giá trị None không bao giờ có thể xảy ra, ngay cả khi compiler không thể hiểu điều đó.</p>

<p>Tại thời điểm này, khi gọi content trên &Box&lt;dyn State&gt;, deref coercion sẽ có hiệu lực trên & và Box để method content cuối cùng được gọi trên type implement State trait. Điều đó có nghĩa là chúng ta cần thêm content vào định nghĩa State trait, và đó là nơi chúng ta sẽ đặt logic cho content nào trả về tùy thuộc vào trạng thái chúng ta có, như trong Listing 18-18.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>trait State {
    // --snip--
    fn content&lt;'a&gt;(&self, post: &amp;'a Post) -> &amp;'a str {
        ""
    }
}

// --snip--
struct Published {}

impl State for Published {
    // --snip--
    fn content&lt;'a&gt;(&self, post: &amp;'a Post) -> &amp;'a str {
        &amp;post.content
    }
}</code></pre>
</div>
<p><em>Listing 18-18: Thêm method content vào State trait</em></p>

<p>Chúng ta thêm một default implementation cho method content trả về một chuỗi slice rỗng. Điều đó có nghĩa là chúng ta không cần implement content trên Draft và PendingReview structs. Struct Published sẽ override method content và trả về giá trị trong post.content. Tiện lợi thay, việc có method content trên State xác định content của Post làm mờ ranh giới trách nhiệm giữa State và Post.</p>

<p>Lưu ý rằng chúng ta cần các lifetime annotations trên method này, như chúng ta đã thảo luận trong Chương 10. Chúng ta lấy một tham chiếu đến một post như một argument và trả về một tham chiếu đến một phần của post đó, vì vậy lifetime của tham chiếu được trả về liên quan đến lifetime của argument post.</p>

<p>Và chúng ta đã hoàn thành—tất cả Listing 18-11 bây giờ hoạt động! Chúng ta đã implement state pattern với các quy tắc của blog post workflow. Logic liên quan đến các quy tắc nằm trong các state objects thay vì bị phân tán khắp Post.</p>

<h3 class="task-heading">Tại Sao Không Dùng Enum?</h3>
<p>Bạn có thể đã tự hỏi tại sao chúng ta không sử dụng một enum với các possible post states làm variants. Đó chắc chắn là một giải pháp có thể; hãy thử và so sánh kết quả cuối cùng để xem bạn thích cái nào! Một nhược điểm của việc sử dụng enum là mọi nơi kiểm tra giá trị của enum sẽ cần một match expression hoặc tương tự để xử lý mọi variant có thể. Điều này có thể trở nên lặp lại hơn giải pháp trait object này.</p>

<h3 class="task-heading">Đánh Giá State Pattern</h3>
<p>Chúng ta đã chỉ ra rằng Rust có thể implement object-oriented state pattern để encapsulate các loại hành vi khác nhau mà một post nên có trong mỗi trạng thái. Các methods trên Post không biết gì về các hành vi khác nhau. Vì cách chúng ta tổ chức code, chúng ta chỉ cần nhìn vào một nơi để biết các cách khác nhau mà một published post có thể hành xử: implementation của State trait trên Published struct.</p>

<p>Nếu chúng ta tạo một implementation thay thế không sử dụng state pattern, chúng ta có thể thay vào đó sử dụng match expressions trong các methods trên Post hoặc thậm chí trong main code kiểm tra trạng thái của post và thay đổi hành vi trong những nơi đó. Điều đó có nghĩa là chúng ta phải nhìn vào một số nơi để hiểu tất cả các hàm ý của việc một post ở trạng thái published.</p>

<p>Với state pattern, các Post methods và các nơi chúng ta sử dụng Post không cần match expressions, và để thêm một trạng thái mới, chúng ta chỉ cần thêm một struct mới và implement các trait methods trên struct đó tại một vị trí.</p>

<p>Implementation sử dụng state pattern dễ dàng mở rộng để thêm chức năng hơn. Để thấy sự đơn giản của việc maintain code sử dụng state pattern, hãy thử một số đề xuất này:</p>
<ul>
    <li>Thêm một reject method thay đổi trạng thái của post từ PendingReview về Draft.</li>
    <li>Yêu cầu hai lần gọi approve trước khi trạng thái có thể thay đổi thành Published.</li>
    <li>Cho phép người dùng thêm text content chỉ khi một post ở trạng thái Draft. Gợi ý: để state object chịu trách nhiệm về những gì có thể thay đổi về content nhưng không chịu trách nhiệm về việc sửa đổi Post.</li>
</ul>

<p>Một nhược điểm khác của state pattern là, vì các trạng thái implement các chuyển đổi giữa các trạng thái, một số trạng thái được couple với nhau. Nếu chúng ta thêm một trạng thái khác giữa PendingReview và Published, như Scheduled, chúng ta sẽ phải thay đổi code trong PendingReview để chuyển sang Scheduled thay vì. Sẽ ít công việc hơn nếu PendingReview không cần thay đổi với việc thêm một trạng thái mới, nhưng điều đó có nghĩa là chuyển sang một design pattern khác.</p>

<h3 class="task-heading">Encoding States và Behavior as Types</h3>
<p>Chúng ta sẽ chỉ cho bạn cách suy nghĩ lại về state pattern để có một tập hợp khác các trade-offs. Thay vì encapsulate các trạng thái và chuyển đổi hoàn toàn để code bên ngoài không có kiến thức về chúng, chúng ta sẽ encode các trạng thái thành các types khác nhau. Do đó, Rust's type-checking system sẽ ngăn cản các nỗ lực sử dụng draft posts ở nơi chỉ các published posts được cho phép bằng cách đưa ra một compiler error.</p>

<p>Hãy xem xét phần đầu tiên của main trong Listing 18-11:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");
    assert_eq!("", post.content());
}</code></pre>
</div>

<p>Chúng ta vẫn cho phép tạo posts mới trong trạng thái draft sử dụng Post::new và khả năng thêm text vào content của post. Nhưng thay vì có một method content trên một draft post trả về một chuỗi rỗng, chúng ta sẽ làm cho draft posts không có method content. Bằng cách đó, nếu chúng ta cố gắng lấy content của một draft post, chúng ta sẽ nhận được một compiler error cho chúng ta biết method không tồn tại. Kết quả là, sẽ không thể vô tình hiển thị content của draft post trong production vì code đó sẽ không biên dịch. Listing 18-19 cho thấy định nghĩa của Post struct và DraftPost struct, cũng như methods trên mỗi cái.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Post {
    content: String,
}

pub struct DraftPost {
    content: String,
}

impl Post {
    pub fn new() -> DraftPost {
        DraftPost {
            content: String::new(),
        }
    }

    pub fn content(&self) -> &str {
        &self.content
    }
}

impl DraftPost {
    pub fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }
}</code></pre>
</div>
<p><em>Listing 18-19: Post với method content và DraftPost không có method content</em></p>

<p>Cả Post và DraftPost structs đều có một trường content private lưu text của blog post. Các structs không còn có trường state vì chúng ta đang chuyển việc encoding của trạng thái vào các types của structs. Post struct sẽ đại diện cho một post đã xuất bản, và nó có một method content trả về content.</p>

<p>Chúng ta vẫn có một function Post::new, nhưng thay vì trả về một instance của Post, nó trả về một instance của DraftPost. Vì content là private và không có bất kỳ functions nào trả về Post, không thể tạo một instance của Post ngay bây giờ.</p>

<p>DraftPost struct có một method add_text, vì vậy chúng ta có thể thêm text vào content như trước, nhưng lưu ý rằng DraftPost không có method content được định nghĩa! Vì vậy bây giờ chương trình đảm bảo rằng tất cả posts bắt đầu như draft posts, và draft posts không có content của chúng có sẵn để hiển thị. Bất kỳ nỗ lực nào để vượt qua các ràng buộc này sẽ dẫn đến một compiler error.</p>

<p>Vậy làm thế nào để có một published post? Chúng ta muốn thực thi quy tắc rằng một draft post phải được review và duyệt trước khi nó có thể được xuất bản. Một post trong trạng thái pending review vẫn không nên hiển thị bất kỳ content nào. Hãy implement các ràng buộc này bằng cách thêm một struct khác, PendingReviewPost, định nghĩa request_review method trên DraftPost để trả về PendingReviewPost và định nghĩa một approve method trên PendingReviewPost để trả về Post, như trong Listing 18-20.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl DraftPost {
    // --snip--
    pub fn request_review(self) -> PendingReviewPost {
        PendingReviewPost {
            content: self.content,
        }
    }
}

pub struct PendingReviewPost {
    content: String,
}

impl PendingReviewPost {
    pub fn approve(self) -> Post {
        Post {
            content: self.content,
        }
    }
}</code></pre>
</div>
<p><em>Listing 18-20: PendingReviewPost được tạo bằng cách gọi request_review trên DraftPost và một approve method chuyển PendingReviewPost thành một published Post</em></p>

<p>Các methods request_review và approve lấy ownership của self, do đó tiêu thụ các DraftPost và PendingReviewPost instances và chuyển đổi chúng thành một PendingReviewPost và một published Post. Bằng cách này, chúng ta sẽ không có bất kỳ DraftPost instances còn lại sau khi gọi request_review, v.v. Struct PendingReviewPost không có method content được định nghĩa trên nó, vì vậy việc cố gắng đọc content của nó dẫn đến một compiler error, như với DraftPost. Vì cách duy nhất để có một Post instance đã xuất bản có method content được định nghĩa là gọi approve method trên một PendingReviewPost, và cách duy nhất để có một PendingReviewPost là gọi request_review method trên một DraftPost, chúng ta đã encode blog post workflow vào type system.</p>

<p>Nhưng chúng ta cũng phải thực hiện một số thay đổi nhỏ đối với main. Các methods request_review và approve trả về các instances mới thay vì sửa đổi struct chúng được gọi, vì vậy chúng ta cần thêm các gán shadowing để lưu các instances được trả về. Chúng ta cũng không thể có các assertions về content của draft và pending review posts là chuỗi rỗng, cũng không cần chúng: Chúng ta không thể biên dịch code cố gắng sử dụng content của posts trong các trạng thái đó nữa. Code được cập nhật trong main được hiển thị trong Listing 18-21.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use blog::Post;

fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");

    let post = post.request_review();

    let post = post.approve();

    assert_eq!("I ate a salad for lunch today", post.content());
}</code></pre>
</div>
<p><em>Listing 18-21: Sửa đổi main để sử dụng implementation mới của blog post workflow</em></p>

<p>Các thay đổi chúng ta cần thực hiện đối với main để reassign post có nghĩa là implementation này không hoàn toàn tuân theo object-oriented state pattern nữa: Các chuyển đổi giữa các trạng thái không còn được encapsulate hoàn toàn trong implementation Post. Tuy nhiên, lợi ích của chúng ta là các trạng thái không hợp lệ bây giờ không thể có vì type system và type checking xảy ra tại thời điểm biên dịch! Điều này đảm bảo rằng một số bugs, như hiển thị content của một post chưa xuất bản, sẽ được phát hiện trước khi chúng đến production.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt State Pattern:</strong>
  <ul>
    <li><strong>State Pattern</strong> - Đại diện trạng thái như objects</li>
    <li><strong>Trait Objects</strong> - Dynamic dispatch với Box&lt;dyn State&gt;</li>
    <li><strong>Encoding States as Types</strong> - Sử dụng Rust type system để đảm bảo invalid states</li>
    <li><strong>Type-state Pattern</strong> - Mỗi trạng thái là một type riêng biệt</li>
    <li><strong>Compile-time Safety</strong> - Không thể sử dụng sai trạng thái</li>
  </ul>
</div>
`,
            defaultCode: `// State Pattern Demo
trait State {
    fn request_review(self: Box<Self>) -> Box<dyn State>;
    fn approve(self: Box<Self>) -> Box<dyn State>;
}

struct Draft;
struct PendingReview;
struct Published;

impl State for Draft {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        Box::new(PendingReview)
    }
    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }
}

impl State for PendingReview {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }
    fn approve(self: Box<Self>) -> Box<dyn State> {
        Box::new(Published)
    }
}

impl State for Published {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }
    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }
}

struct Post {
    state: Option<Box<dyn State>>,
    content: String,
}

impl Post {
    fn new() -> Self {
        Post {
            state: Some(Box::new(Draft)),
            content: String::new(),
        }
    }

    fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }

    fn request_review(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.request_review());
        }
    }

    fn approve(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.approve());
        }
    }

    fn content(&self) -> &str {
        &self.content
    }
}

fn main() {
    let mut post = Post::new();
    post.add_text("Hello world");
    println!("Draft: '{}'", post.content());

    post.request_review();
    println!("Pending: '{}'", post.content());

    post.approve();
    println!("Published: '{}'", post.content());
}
`,
            expectedOutput: `Draft: 'Hello world'
Pending: 'Hello world'
Published: 'Hello world'`
        };
