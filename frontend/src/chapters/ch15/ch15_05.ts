import { Lesson } from '../../courses';

export const ch15_05: Lesson = {
            id: 'ch15-05',
            title: '15.5 RefCell<T> và Pattern Interior Mutability',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Interior mutability là một design pattern trong Rust cho phép bạn mutate data ngay cả khi có immutable references đến data đó; normally, hành động này bị disallowed bởi các borrowing rules. Để mutate data, pattern sử dụng unsafe code bên trong một data structure để bend các quy tắc thông thường của Rust về mutation và borrowing. Unsafe code chỉ ra rằng chúng ta đang check các rules manually thay vì dựa vào compiler để check cho chúng ta; chúng ta sẽ thảo luận thêm về unsafe code trong Chương 20.</p>

<p>Chúng ta có thể sử dụng các kiểu sử dụng interior mutability pattern chỉ khi chúng ta có thể đảm bảo các borrowing rules sẽ được tuân thủ tại runtime, ngay cả khi compiler không thể guarantee điều đó. Unsafe code liên quan sau đó được wrap trong một safe API, và outer type vẫn là immutable.</p>

<p>Hãy khám phá khái niệm này bằng cách nhìn vào kiểu RefCell&lt;T&gt; tuân theo interior mutability pattern.</p>

<h3 class="task-heading">Enforcing Borrowing Rules tại Runtime</h3>
<p>Khác với Rc&lt;T&gt;, kiểu RefCell&lt;T&gt; đại diện cho single ownership over the data mà nó giữ. Vậy điều gì làm RefCell&lt;T&gt; khác với một kiểu như Box&lt;T&gt;? Nhớ lại các borrowing rules bạn đã học trong Chương 4:</p>

<ul>
  <li>Tại bất kỳ thời điểm nào, bạn có thể có một mutable reference hoặc bất kỳ số lượng immutable references nào (nhưng không cả hai).</li>
  <li>References phải luôn valid.</li>
</ul>

<p>Với references và Box&lt;T&gt;, các invariants của borrowing rules được enforce tại compile time. Với RefCell&lt;T&gt;, các invariants này được enforce tại runtime. Với references, nếu bạn break các rules này, bạn sẽ nhận được compiler error. Với RefCell&lt;T&gt;, nếu bạn break các rules này, chương trình của bạn sẽ panic và exit.</p>

<p>Ưu điểm của việc check borrowing rules tại compile time là các errors sẽ được catch sớm hơn trong quá trình phát triển, và không có impact trên runtime performance vì tất cả analysis đã được hoàn thành trước đó. Vì những lý do đó, việc check borrowing rules tại compile time là lựa chọn tốt nhất trong phần lớn các trường hợp, đây là lý do tại sao đây là default của Rust.</p>

<p>Ưu điểm của việc check borrowing rules tại runtime thay vào đó là một số memory-safe scenarios được phép, nơi mà chúng sẽ bị disallowed bởi compile-time checks. Static analysis, như Rust compiler, vốn dĩ conservative. Một số properties của code không thể detect bằng cách analyzing code: Ví dụ nổi tiếng nhất là Halting Problem, nằm ngoài scope của cuốn sách này nhưng là một topic thú vị để research.</p>

<p>Vì một số analysis là impossible, nếu Rust compiler không thể sure rằng code tuân thủ ownership rules, nó có thể reject một correct program; theo cách này, nó là conservative. Nếu Rust chấp nhận một incorrect program, users sẽ không thể trust các guarantees mà Rust đưa ra. Tuy nhiên, nếu Rust reject một correct program, programmer sẽ bị inconvenient, nhưng không có gì catastrophic có thể xảy ra. Kiểu RefCell&lt;T&gt; hữu ích khi bạn chắc chắn code của bạn tuân thủ các borrowing rules nhưng compiler không thể understand và guarantee điều đó.</p>

<div class="cyber-alert warning">
  <strong>Lưu ý:</strong> Tương tự như Rc&lt;T&gt;, RefCell&lt;T&gt; chỉ để sử dụng trong các kịch bản single-threaded và sẽ cho bạn một compile-time error nếu bạn cố sử dụng nó trong một multithreaded context. Chúng ta sẽ nói về cách có được functionality của RefCell&lt;T&gt; trong một chương trình multithreaded trong Chương 16.
</div>

<h3 class="task-heading">Tóm tắt Lựa chọn Box&lt;T&gt;, Rc&lt;T&gt;, hoặc RefCell&lt;T&gt;</h3>
<ul>
  <li>Rc&lt;T&gt; cho phép multiple owners của cùng một data; Box&lt;T&gt; và RefCell&lt;T&gt; có single owners.</li>
  <li>Box&lt;T&gt; cho phép immutable hoặc mutable borrows được check tại compile time; Rc&lt;T&gt; chỉ cho phép immutable borrows được check tại compile time; RefCell&lt;T&gt; cho phép immutable hoặc mutable borrows được check tại runtime.</li>
  <li>Bởi vì RefCell&lt;T&gt; cho phép mutable borrows được check tại runtime, bạn có thể mutate giá trị bên trong RefCell&lt;T&gt; ngay cả khi RefCell&lt;T&gt; là immutable.</li>
</ul>

<p>Mutating giá trị bên trong một immutable value là interior mutability pattern. Hãy nhìn vào một situation trong đó interior mutability hữu ích và xem nó có thể như thế nào.</p>

<h3 class="task-heading">Sử dụng Interior Mutability</h3>
<p>Một hậu quả của các borrowing rules là khi bạn có một immutable value, bạn không thể borrow nó mutably. Ví dụ, code này sẽ không compile:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
fn main() {
    let x = 5;
    let y = &mut x;
}</code></pre>
</div>

<p>Nếu bạn cố compile code này, bạn sẽ nhận được lỗi sau:</p>

<pre><code>$ cargo run
   Compiling borrowing v0.1.0 (file:///projects/borrowing)
error[E0596]: cannot borrow \`x\` as mutable, as it is not declared as mutable
 --&gt; src/main.rs:3:13
  |
3 |     let y = &mut x;
  |             ^^^^^^ cannot borrow as mutable
  |
help: consider changing this to be mutable
  |
2 |     let mut x = 5;
  |        +++</code></pre>

<p>Tuy nhiên, có những situations trong đó nó sẽ hữu ích cho một value để mutate chính nó trong các methods của nó nhưng appear immutable đến other code. Code bên ngoài các methods của value sẽ không thể mutate value. Sử dụng RefCell&lt;T&gt; là một cách để có khả năng có interior mutability, nhưng RefCell&lt;T&gt; không hoàn toàn get around các borrowing rules: Borrow checker trong compiler cho phép interior mutability này, và các borrowing rules được checked tại runtime thay vì. Nếu bạn vi phạm các rules, bạn sẽ nhận được một panic! thay vì compiler error.</p>

<h3 class="task-heading">Testing với Mock Objects</h3>
<p>Đôi khi trong testing, một programmer sẽ sử dụng một type thay thế cho một type khác, để observe particular behavior và assert rằng nó được implement đúng. Placeholder type này được gọi là test double. Hãy nghĩ về nó theo nghĩa của một stunt double trong filmmaking, nơi một người step in và thay thế cho một actor để làm một scene đặc biệt khó. Test doubles stand in cho các types khác khi chúng ta đang running tests. Mock objects là các types cụ thể của test doubles ghi lại những gì xảy ra trong một test để bạn có thể assert rằng các actions đúng đã xảy ra.</p>

<p>Rust không có objects theo nghĩa giống như các ngôn ngữ khác có objects, và Rust không có mock object functionality được build vào standard library như một số ngôn ngữ khác. Tuy nhiên, bạn chắc chắn có thể create một struct sẽ serve cùng purposes như một mock object.</p>

<p>Đây là scenario chúng ta sẽ test: Chúng ta sẽ tạo một library theo dõi một giá trị against một maximum value và gửi messages dựa trên mức độ gần với maximum value mà current value là. Library này có thể được sử dụng để theo dõi quota của user cho số lượng API calls họ được phép thực hiện, ví dụ.</p>

<p>Library của chúng ta sẽ chỉ cung cấp functionality của tracking xem một giá trị gần maximum bao nhiêu và messages nên là gì vào những thời điểm nào. Applications sử dụng library của chúng ta sẽ được kỳ vọng cung cấp mechanism để gửi messages: Application có thể show message trực tiếp cho user, gửi email, gửi text message, hoặc làm gì đó khác. Library không cần biết detail đó. Tất cả những gì nó cần là một cái gì đó implement một trait mà chúng ta sẽ cung cấp, gọi là Messenger.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Messenger {
    fn send(&self, msg: &str);
}

pub struct LimitTracker&lt;'a, T: Messenger&gt; {
    messenger: &amp;'a T,
    value: usize,
    max: usize,
}

impl&lt;'a, T&gt; LimitTracker&lt;'a, T&gt;
where
    T: Messenger,
{
    pub fn new(messenger: &amp;'a T, max: usize) -> LimitTracker&lt;'a, T&gt; {
        LimitTracker {
            messenger,
            value: 0,
            max,
        }
    }

    pub fn set_value(&amp;mut self, value: usize) {
        self.value = value;

        let percentage_of_max = self.value as f64 / self.max as f64;

        if percentage_of_max >= 1.0 {
            self.messenger.send("Error: You are over your quota!");
        } else if percentage_of_max >= 0.9 {
            self.messenger
                .send("Urgent warning: You've used up over 90% of your quota!");
        } else if percentage_of_max >= 0.75 {
            self.messenger
                .send("Warning: You've used up over 75% of your quota!");
        }
    }
}</code></pre>
</div>
<p><em>Listing 15-20: A library to keep track of how close a value is to a maximum value and warn when the value is at certain levels</em></p>

<p>Một phần quan trọng của code này là trait Messenger có một method gọi là send nhận một immutable reference đến self và text của message. Trait này là interface mà mock object của chúng ta cần implement để mock có thể được sử dụng theo cùng cách như một real object. Phần quan trọng khác là chúng ta muốn test behavior của method set_value trên LimitTracker. Chúng ta có thể thay đổi những gì chúng ta pass vào cho value parameter, nhưng set_value không return bất cứ thứ gì để chúng ta make assertions. Chúng ta muốn có thể nói rằng nếu chúng ta tạo một LimitTracker với một cái gì đó implement trait Messenger và một particular value cho max, messenger được told để gửi các messages thích hợp khi chúng ta pass các số khác nhau cho value.</p>

<p>Chúng ta cần một mock object mà, thay vì gửi email hoặc text message khi chúng ta gọi send, sẽ chỉ keep track of the messages nó được told để gửi. Chúng ta có thể create một instance mới của mock object, create một LimitTracker sử dụng mock object, gọi method set_value trên LimitTracker, và sau đó check rằng mock object có các messages chúng ta expect. Listing 15-21 shows một attempt để implement một mock object làm điều đó, nhưng borrow checker sẽ không cho phép.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không compile!]
#[cfg(test)]
mod tests {
    use super::*;

    struct MockMessenger {
        sent_messages: Vec&lt;String&gt;,
    }

    impl MockMessenger {
        fn new() -> MockMessenger {
            MockMessenger {
                sent_messages: vec![],
            }
        }
    }

    impl Messenger for MockMessenger {
        fn send(&amp;self, message: &amp;str) {
            self.sent_messages.push(String::from(message));
        }
    }

    #[test]
    fn it_sends_an_over_75_percent_warning_message() {
        let mock_messenger = MockMessenger::new();
        let mut limit_tracker = LimitTracker::new(&amp;mock_messenger, 100);

        limit_tracker.set_value(80);

        assert_eq!(mock_messenger.sent_messages.len(), 1);
    }
}</code></pre>
</div>
<p><em>Listing 15-21: An attempt to implement a MockMessenger that isn't allowed by the borrow checker</em></p>

<p>Test code này định nghĩa một struct MockMessenger có một trường sent_messages với một Vec của các String values để keep track of the messages nó được told để gửi. Chúng ta cũng định nghĩa một associated function new để tạo thuận tiện các MockMessenger values mới bắt đầu với một empty list of messages. Sau đó, chúng ta implement trait Messenger cho MockMessenger để chúng ta có thể give một MockMessenger cho một LimitTracker. Trong định nghĩa của method send, chúng ta take message passed in như một parameter và store nó trong list sent_messages của MockMessenger.</p>

<p>Trong test, chúng ta test điều gì xảy ra khi LimitTracker được told để set value thành một cái gì đó lớn hơn 75 percent của max value. Đầu tiên, chúng ta create một MockMessenger mới, sẽ bắt đầu với một empty list of messages. Sau đó, chúng ta create một LimitTracker mới và give nó một reference đến MockMessenger mới và một max value là 100. Chúng ta gọi method set_value trên LimitTracker với value là 80, lớn hơn 75 percent của 100. Sau đó, chúng ta assert rằng list of messages mà MockMessenger đang keep track nên có một message trong đó.</p>

<p>Tuy nhiên, có một vấn đề với test này:</p>

<pre><code>$ cargo test
   Compiling limit-tracker v0.1.0 (file:///projects/limit-tracker)
error[E0596]: cannot borrow \`self.sent_messages\` as mutable, as it is behind a \`&\` reference
  --&gt; src/lib.rs:58:13
   |
58 |             self.sent_messages.push(String::from(message));
   |             ^^^^^^^^^^^^^^^^^^ \`self\` is a \`&\` reference, so the data it refers to cannot be borrowed as mutable
   |</code></pre>

<p>Chúng ta không thể modify MockMessenger để keep track of the messages, vì method send nhận một immutable reference đến self. Chúng ta cũng không thể take suggestion từ error text để use &mut self trong cả impl method và trait definition. Chúng ta không muốn thay đổi trait Messenger chỉ vì testing. Thay vào đó, chúng ta cần tìm một cách để make test code hoạt động đúng với design hiện có.</p>

<p>Đây là một situation trong đó interior mutability có thể giúp! Chúng ta sẽ store sent_messages bên trong một RefCell&lt;T&gt;, và sau đó method send sẽ có thể modify sent_messages để store các messages chúng ta đã seen.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::RefCell;

    struct MockMessenger {
        sent_messages: RefCell&lt;Vec&lt;String&gt;&gt;,
    }

    impl MockMessenger {
        fn new() -> MockMessenger {
            MockMessenger {
                sent_messages: RefCell::new(vec![]),
            }
        }
    }

    impl Messenger for MockMessenger {
        fn send(&amp;self, message: &amp;str) {
            self.sent_messages.borrow_mut().push(String::from(message));
        }
    }

    #[test]
    fn it_sends_an_over_75_percent_warning_message() {
        // --snip--

        assert_eq!(mock_messenger.sent_messages.borrow().len(), 1);
    }
}</code></pre>
</div>
<p><em>Listing 15-22: Using RefCell&lt;T&gt; to mutate an inner value while the outer value is considered immutable</em></p>

<p>Trường sent_messages bây giờ có kiểu RefCell&lt;Vec&lt;String&gt;&gt; thay vì Vec&lt;String&gt;. Trong function new, chúng ta create một RefCell&lt;Vec&lt;String&gt;&gt; instance mới around the empty vector.</p>

<p>Cho implementation của method send, tham số đầu tiên vẫn là một immutable borrow của self, matches trait definition. Chúng ta gọi borrow_mut trên RefCell&lt;Vec&lt;String&gt;&gt; trong self.sent_messages để lấy một mutable reference đến value bên trong RefCell&lt;Vec&lt;String&gt;&gt;, đó là vector. Sau đó, chúng ta có thể gọi push trên mutable reference để keep track of the messages sent during the test.</p>

<p>Thay đổi cuối cùng chúng ta phải make là trong assertion: Để xem có bao nhiêu items trong inner vector, chúng ta gọi borrow trên RefCell&lt;Vec&lt;String&gt;&gt; để lấy một immutable reference đến vector.</p>

<h3 class="task-heading">Tracking Borrows tại Runtime</h3>
<p>Khi creating immutable và mutable references, chúng ta sử dụng & và &mut syntax. Với RefCell&lt;T&gt;, chúng ta sử dụng các methods borrow và borrow_mut, là một phần của safe API thuộc về RefCell&lt;T&gt;. Method borrow returns smart pointer type Ref&lt;T&gt;, và borrow_mut returns smart pointer type RefMut&lt;T&gt;. Cả hai types đều implement Deref, vì vậy chúng ta có thể treat chúng như regular references.</p>

<p>RefCell&lt;T&gt; keeps track of how many Ref&lt;T&gt; và RefMut&lt;T&gt; smart pointers đang active. Mỗi lần chúng ta gọi borrow, RefCell&lt;T&gt; tăng count của immutable borrows đang active. Khi một Ref&lt;T&gt; value goes out of scope, count của immutable borrows giảm đi 1. Giống như compile-time borrowing rules, RefCell&lt;T&gt; cho phép chúng ta có nhiều immutable borrows hoặc một mutable borrow tại bất kỳ điểm nào trong thời gian.</p>

<p>Nếu chúng ta cố violate these rules, thay vì nhận compiler error như với references, implementation của RefCell&lt;T&gt; sẽ panic tại runtime.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này panics!]
    impl Messenger for MockMessenger {
        fn send(&amp;self, message: &amp;str) {
            let mut one_borrow = self.sent_messages.borrow_mut();
            let mut two_borrow = self.sent_messages.borrow_mut();

            one_borrow.push(String::from(message));
            two_borrow.push(String::from(message));
        }
    }</code></pre>
</div>
<p><em>Listing 15-23: Creating two mutable references in the same scope to see that RefCell&lt;T&gt; will panic</em></p>

<p>Khi chúng ta run tests cho library, code trong Listing 15-23 sẽ compile mà không có errors, nhưng test sẽ fail:</p>

<pre><code>$ cargo test
   Compiling limit-tracker v0.1.0 (file:///projects/limit-tracker)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 0.91s
     Running unittests src/lib.rs (target/debug/deps/limit_tracker-e599811fa246dbde)

running 1 test
test tests::it_sends_an_over_75_percent_warning_message ... FAILED

failures:

---- tests::it_sends_an_over_75_percent_warning_message stdout ----

thread 'tests::it_sends_an_over_75_percent_warning_message' panicked at src/lib.rs:60:53:
RefCell already borrowed
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace</code></pre>

<p>Notice rằng code panicked với message "already borrowed: BorrowMutError". Đây là cách RefCell&lt;T&gt; handles violations của các borrowing rules tại runtime.</p>

<h3 class="task-heading">Cho phép Multiple Owners của Mutable Data</h3>
<p>Một cách phổ biến để sử dụng RefCell&lt;T&gt; là kết hợp với Rc&lt;T&gt;. Nhớ rằng Rc&lt;T&gt; cho phép bạn có multiple owners của một số data, nhưng nó chỉ cho phép immutable access đến data đó. Nếu bạn có một Rc&lt;T&gt; giữ một RefCell&lt;T&gt;, bạn có thể có một value có thể có multiple owners và bạn có thể mutate!</p>

<p>Ví dụ, nhớ lại cons list example trong Listing 15-18 nơi chúng ta sử dụng Rc&lt;T&gt; để cho phép nhiều lists share ownership của một list khác. Bởi vì Rc&lt;T&gt; chỉ giữ immutable values, chúng ta không thể change bất kỳ values nào trong list một khi chúng ta đã tạo chúng. Hãy thêm RefCell&lt;T&gt; cho khả năng change các values trong lists.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
enum List {
    Cons(Rc&lt;RefCell&lt;i32&gt;&gt;, Rc&lt;List&gt;),
    Nil,
}

use crate::List::{Cons, Nil};
use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    let value = Rc::new(RefCell::new(5));

    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));

    let b = Cons(Rc::new(RefCell::new(3)), Rc::clone(&a));
    let c = Cons(Rc::new(RefCell::new(4)), Rc::clone(&a));

    *value.borrow_mut() += 10;

    println!("a after = {a:?}");
    println!("b after = {b:?}");
    println!("c after = {c:?}");
}</code></pre>
</div>
<p><em>Listing 15-24: Using Rc&lt;RefCell&lt;i32&gt;&gt; to create a List that we can mutate</em></p>

<p>Khi chúng ta print a, b, và c, chúng ta có thể thấy chúng đều có modified value là 15 thay vì 5:</p>

<pre><code>$ cargo run
   Compiling cons-list v0.1.0 (file:///projects/cons-list)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.63s
     Running \`target/debug/cons-list\`
a after = Cons(RefCell { value: 15 }, Nil)
b after = Cons(RefCell { value: 3 }, Cons(RefCell { value: 15 }, Nil))
c after = Cons(RefCell { value: 4 }, Cons(RefCell { value: 15 }, Nil))</code></pre>

<p>Kỹ thuật này khá gọn! Bằng cách sử dụng RefCell&lt;T&gt;, chúng ta có một List value về mặt bên ngoài là immutable. Nhưng chúng ta có thể sử dụng các methods trên RefCell&lt;T&gt; cung cấp access đến interior mutability của nó để modify data khi chúng ta cần. Các runtime checks của các borrowing rules bảo vệ chúng ta khỏi data races, và đôi khi worth trading một chút speed cho sự linh hoạt này trong các data structures của chúng ta. Lưu ý rằng RefCell&lt;T&gt; không hoạt động cho multithreaded code! Mutex&lt;T&gt; là thread-safe version của RefCell&lt;T&gt;, và chúng ta sẽ thảo luận về Mutex&lt;T&gt; trong Chương 16.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt RefCell&lt;T&gt;:</strong>
  <ul>
    <li><strong>RefCell&lt;T&gt;</strong> - Cho phép mutable borrowing tại runtime</li>
    <li><strong>Interior mutability</strong> - Mutate data bên trong dù outer value là immutable</li>
    <li><strong>borrow()</strong> - Trả về Ref&lt;T&gt; (immutable)</li>
    <li><strong>borrow_mut()</strong> - Trả về RefMut&lt;T&gt; (mutable)</li>
    <li><strong>Runtime checks</strong> - Panic nếu vi phạm borrowing rules</li>
    <li><strong>Kết hợp với Rc&lt;T&gt;</strong> - Rc&lt;RefCell&lt;T&gt;&gt; cho phép multiple owners + mutable</li>
    <li><strong>Single-threaded</strong> - Không dùng cho multithread</li>
  </ul>
</div>
`,
            defaultCode: `use std::cell::RefCell;
use std::rc::Rc;

pub trait Messenger {
    fn send(&self, msg: &str);
}

pub struct LimitTracker<'a, T: Messenger> {
    messenger: &'a T,
    value: usize,
    max: usize,
}

impl<'a, T> LimitTracker<'a, T>
where
    T: Messenger,
{
    pub fn new(messenger: &'a T, max: usize) -> LimitTracker<'a, T> {
        LimitTracker { messenger, value: 0, max }
    }

    pub fn set_value(&mut self, value: usize) {
        self.value = value;
        let percentage = self.value as f64 / self.max as f64;

        if percentage >= 1.0 {
            self.messenger.send("Error: Over quota!");
        } else if percentage >= 0.75 {
            self.messenger.send("Warning: Over 75%!");
        }
    }
}

// Mock object sử dụng RefCell để có thể mutate bên trong
struct MockMessenger {
    sent_messages: RefCell<Vec<String>>,
}

impl MockMessenger {
    fn new() -> Self {
        MockMessenger { sent_messages: RefCell::new(vec![]) }
    }
}

impl Messenger for MockMessenger {
    fn send(&self, message: &str) {
        // borrow_mut() cho phép mutate bên trong immutable reference
        self.sent_messages.borrow_mut().push(message.to_string());
    }
}

fn main() {
    let mock = MockMessenger::new();
    let mut tracker = LimitTracker::new(&mock, 100);

    tracker.set_value(80);
    tracker.set_value(50);

    // borrow() để đọc giá trị bên trong RefCell
    println!("Messages: {:?}", mock.sent_messages.borrow());
}
`,
            expectedOutput: `Messages: ["Warning: Over 75%!"]`
        };
