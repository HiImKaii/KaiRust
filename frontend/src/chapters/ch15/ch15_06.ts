import { Lesson } from '../../courses';

export const ch15_06: Lesson = {
            id: 'ch15-06',
            title: '15.6 Reference Cycles Có Thể Gây Leak Memory',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Các memory safety guarantees của Rust làm cho việc accidentally create memory mà không bao giờ được cleaned up (known as a memory leak) trở nên khó, nhưng không phải là impossible. Preventing memory leaks hoàn toàn không phải là một trong các guarantees của Rust, có nghĩa là memory leaks là memory safe trong Rust. Chúng ta có thể thấy rằng Rust cho phép memory leaks bằng cách sử dụng Rc&lt;T&gt; và RefCell&lt;T&gt;: Có thể tạo references nơi các items refer to each other trong một cycle. Điều này tạo ra memory leaks vì reference count của mỗi item trong cycle sẽ không bao giờ đạt 0, và các values sẽ không bao giờ được dropped.</p>

<h3 class="task-heading">Tạo một Reference Cycle</h3>
<p>Hãy nhìn vào cách một reference cycle có thể xảy ra và cách ngăn chặn nó, bắt đầu với định nghĩa của List enum và một tail method trong Listing 15-25.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use crate::List::{Cons, Nil};
use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
enum List {
    Cons(i32, RefCell&lt;Rc&lt;List&gt;&gt;),
    Nil,
}

impl List {
    fn tail(&self) -> Option&lt;&RefCell&lt;Rc&lt;List&gt;&gt;&gt; {
        match self {
            Cons(_, item) =&gt; Some(item),
            Nil =&gt; None,
        }
    }
}</code></pre>
</div>
<p><em>Listing 15-25: A cons list definition that holds a RefCell&lt;T&gt; so that we can modify what a Cons variant is referring to</em></p>

<p>Chúng ta đang sử dụng một biến thể khác của List definition từ Listing 15-5. Phần tử thứ hai trong Cons variant bây giờ là RefCell&lt;Rc&lt;List&gt;&gt;, có nghĩa là thay vì có khả năng modify i32 value như trong Listing 15-24, chúng ta muốn modify List value mà một Cons variant đang trỏ đến. Chúng ta cũng đang thêm một tail method để thuận tiện cho chúng ta truy cập second item nếu chúng ta có một Cons variant.</p>

<p>Trong Listing 15-26, chúng ta đang thêm một main function sử dụng các definitions trong Listing 15-25. Code này tạo một list trong a và một list trong b trỏ đến list trong a. Sau đó, nó modify list trong a để trỏ đến b, tạo một reference cycle. Có các câu lệnh println! dọc đường để show các reference counts tại các điểm khác nhau trong quá trình này.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let a = Rc::new(Cons(5, RefCell::new(Rc::new(Nil))));

    println!("a initial rc count = {}", Rc::strong_count(&a));
    println!("a next item = {:?}", a.tail());

    let b = Rc::new(Cons(10, RefCell::new(Rc::clone(&a))));

    println!("a rc count after b creation = {}", Rc::strong_count(&a));
    println!("b initial rc count = {}", Rc::strong_count(&b));
    println!("b next item = {:?}", b.tail());

    if let Some(link) = a.tail() {
        *link.borrow_mut() = Rc::clone(&b);
    }

    println!("b rc count after changing a = {}", Rc::strong_count(&b));
    println!("a rc count after changing a = {}", Rc::strong_count(&a));

    // Uncomment the next line to see that we have a cycle;
    // it will overflow the stack.
    // println!("a next item = {:?}", a.tail());
}</code></pre>
</div>
<p><em>Listing 15-26: Creating a reference cycle of two List values pointing to each other</em></p>

<p>Chúng ta tạo một Rc&lt;List&gt; instance giữ một List value trong biến a với một initial list là 5, Nil. Sau đó, chúng ta tạo một Rc&lt;List&gt; instance giữ một List value khác trong biến b chứa value 10 và trỏ đến list trong a.</p>

<p>Chúng ta modify a để nó trỏ đến b thay vì Nil, tạo một cycle. Chúng ta làm điều đó bằng cách sử dụng tail method để lấy một reference đến RefCell&lt;Rc&lt;List&gt;&gt; trong a, mà chúng ta put trong biến link. Sau đó, chúng ta sử dụng borrow_mut method trên RefCell&lt;Rc&lt;List&gt;&gt; để change value bên trong từ một Rc&lt;List&gt; giữ một Nil value thành Rc&lt;List&gt; trong b.</p>

<p>Khi chúng ta run code này, giữ last println! được comment out, chúng ta sẽ get output này:</p>

<pre><code>$ cargo run
   Compiling cons-list v0.1.0 (file:///projects/cons-list)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.53s
     Running \`target/debug/cons-list\`
a initial rc count = 1
a next item = Some(RefCell { value: Nil })
a rc count after b creation = 2
b initial rc count = 1
b next item = Some(RefCell { value: Cons(5, RefCell { value: Nil }) })
b rc count after changing a = 2
a rc count after changing a = 2</code></pre>

<p>Reference count của Rc&lt;List&gt; instances trong cả a và b là 2 sau khi chúng ta change list trong a để trỏ đến b. Ở cuối main, Rust drops biến b, làm giảm reference count của b Rc&lt;List&gt; instance từ 2 xuống 1. Memory mà Rc&lt;List&gt; có trên heap sẽ không được dropped tại thời điểm này vì reference count của nó là 1, không phải 0. Sau đó, Rust drops a, làm giảm reference count của a Rc&lt;List&gt; instance từ 2 xuống 1. Instance này's memory cũng không thể được dropped, vì instance Rc&lt;List&gt; khác vẫn refer đến nó. Memory allocated to the list sẽ remain uncollected mãi mãi.</p>

<p>Nếu bạn uncomment last println! và run program, Rust sẽ cố print cycle này với a trỏ đến b trỏ đến a và cứ thế cho đến khi nó overflow the stack.</p>

<div class="cyber-alert warning">
  <strong>Lưu ý:</strong> So với một real-world program, hậu quả của việc tạo một reference cycle trong ví dụ này không quá nghiêm trọng: Ngay sau khi chúng ta tạo reference cycle, program kết thúc. Tuy nhiên, nếu một program phức tạp hơn allocated nhiều memory trong một cycle và giữ nó trong một thời gian dài, program sẽ sử dụng nhiều memory hơn mà nó cần và có thể overwhelm hệ thống, gây ra việc hết memory available.
</div>

<p>Việc tạo reference cycles không dễ dàng, nhưng cũng không phải là impossible. Nếu bạn có RefCell&lt;T&gt; values chứa Rc&lt;T&gt; values hoặc các nested combinations tương tự của các types với interior mutability và reference counting, bạn phải ensure rằng bạn không tạo cycles; bạn không thể dựa vào Rust để catch chúng. Tạo một reference cycle sẽ là một logic bug trong program của bạn mà bạn nên sử dụng automated tests, code reviews, và các software development practices khác để minimize.</p>

<p>Một giải pháp khác để tránh reference cycles là reorganize các data structures của bạn để một số references express ownership và một số references không. Kết quả là, bạn có thể có cycles được tạo bởi một số ownership relationships và một số non-ownership relationships, và chỉ các ownership relationships ảnh hưởng đến việc một value có thể được dropped hay không.</p>

<h3 class="task-heading">Ngăn chặn Reference Cycles Sử dụng Weak&lt;T&gt;</h3>
<p>Cho đến nay, chúng ta đã demonstrate rằng calling Rc::clone tăng strong_count của một Rc&lt;T&gt; instance, và một Rc&lt;T&gt; instance chỉ được cleaned up nếu strong_count của nó là 0. Bạn cũng có thể tạo một weak reference đến value bên trong một Rc&lt;T&gt; instance bằng cách gọi Rc::downgrade và truyền một reference đến Rc&lt;T&gt;. Strong references là cách bạn có thể share ownership của một Rc&lt;T&gt; instance. Weak references không express một ownership relationship, và count của chúng không ảnh hưởng đến việc một Rc&lt;T&gt; instance được cleaned up. Chúng sẽ không gây ra một reference cycle, vì bất kỳ cycle nào liên quan đến một số weak references sẽ bị broken một khi strong reference count của các values liên quan là 0.</p>

<p>Khi bạn gọi Rc::downgrade, bạn nhận được một smart pointer của type Weak&lt;T&gt;. Thay vì tăng strong_count trong Rc&lt;T&gt; instance lên 1, gọi Rc::downgrade tăng weak_count lên 1. Kiểu Rc&lt;T&gt; sử dụng weak_count để keep track of how many Weak&lt;T&gt; references exist, tương tự như strong_count. Sự khác biệt là weak_count không cần phải là 0 để Rc&lt;T&gt; instance được cleaned up.</p>

<p>Bởi vì value mà Weak&lt;T&gt; references có thể đã bị dropped, để làm bất cứ điều gì với value mà một Weak&lt;T&gt; đang trỏ đến, bạn phải ensure rằng value vẫn tồn tại. Làm điều này bằng cách gọi method upgrade trên một Weak&lt;T&gt; instance, sẽ trả về một Option&lt;Rc&lt;T&gt;&gt;. Bạn sẽ nhận được một result của Some nếu Rc&lt;T&gt; value vẫn chưa được dropped và một result của None nếu Rc&lt;T&gt; value đã được dropped. Bởi vì upgrade trả về một Option&lt;Rc&lt;T&gt;&gt;, Rust sẽ ensure rằng cả Some case và None case được handled, và sẽ không có invalid pointer.</p>

<h3 class="task-heading">Tạo một Tree Data Structure</h3>
<p>Ví dụ, thay vì sử dụng một list mà các items chỉ biết về next item, chúng ta sẽ tạo một tree mà các items biết về child items và parent items của chúng.</p>

<p>Để bắt đầu, chúng ta sẽ build một tree với các nodes biết về child nodes của chúng. Chúng ta sẽ create một struct tên là Node giữ i32 value của chính nó cũng như references đến child Node values:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::cell::RefCell;
use std::rc::Rc;

#[derive(Debug)]
struct Node {
    value: i32,
    children: RefCell&lt;Vec&lt;Rc&lt;Node&gt;&gt;&gt;,
}</code></pre>
</div>

<p>Chúng ta muốn một Node sở hữu children của nó, và chúng ta muốn share ownership đó với các variables để chúng ta có thể access mỗi Node trong tree một cách trực tiếp. Để làm điều này, chúng ta định nghĩa các Vec&lt;T&gt; items để làm values của type Rc&lt;Node&gt;. Chúng ta cũng muốn modify nodes nào là children của một node khác, vì vậy chúng ta có một RefCell&lt;T&gt; trong children around the Vec&lt;Rc&lt;Node&gt;&gt;.</p>

<p>Tiếp theo, chúng ta sẽ sử dụng struct definition của chúng ta và create một Node instance tên là leaf với value 3 và không có children, và một instance khác tên là branch với value 5 và leaf như một trong các children của nó, như trong Listing 15-27.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        children: RefCell::new(vec![]),
    });

    let branch = Rc::new(Node {
        value: 5,
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });
}</code></pre>
</div>
<p><em>Listing 15-27: Creating a leaf node with no children and a branch node with leaf as one of its children</em></p>

<p>Chúng ta clone Rc&lt;Node&gt; trong leaf và store đó trong branch, có nghĩa là Node trong leaf bây giờ có hai owners: leaf và branch. Chúng ta có thể get từ branch đến leaf thông qua branch.children, nhưng không có cách nào để get từ leaf đến branch. Lý do là leaf không có reference đến branch và không biết chúng liên quan. Chúng ta muốn leaf biết rằng branch là parent của nó. Chúng ta sẽ làm điều đó tiếp theo.</p>

<h3 class="task-heading">Thêm một Reference từ Child đến Parent</h3>
<p>Để làm cho child node aware của parent của nó, chúng ta cần thêm một parent field vào Node struct definition. Vấn đề là quyết định type của parent nên là gì. Chúng ta biết nó không thể chứa một Rc&lt;T&gt;, vì điều đó sẽ tạo một reference cycle với leaf.parent trỏ đến branch và branch.children trỏ đến leaf, điều sẽ làm cho strong_count values của chúng không bao giờ là 0.</p>

<p>Nghĩ về các relationships theo cách khác, một parent node nên sở hữu children của nó: Nếu một parent node được dropped, các child nodes của nó cũng nên được dropped. Tuy nhiên, một child không nên sở hữu parent của nó: Nếu chúng ta drop một child node, parent vẫn nên tồn tại. Đây là một case cho weak references!</p>

<p>Vì vậy, thay vì Rc&lt;T&gt;, chúng ta sẽ make type của parent sử dụng Weak&lt;T&gt;, cụ thể là một RefCell&lt;Weak&lt;Node&gt;&gt;. Bây giờ Node struct definition của chúng ta trông như sau:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::cell::RefCell;
use std::rc::{Rc, Weak};

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell&lt;Weak&lt;Node&gt;&gt;,
    children: RefCell&lt;Vec&lt;Rc&lt;Node&gt;&gt;&gt;,
}</code></pre>
</div>

<p>Một node sẽ có thể refer đến parent node của nó nhưng không sở hữu parent của nó. Trong Listing 15-28, chúng ta update main để sử dụng definition mới này để leaf node sẽ có cách để refer đến parent của nó, branch.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
}</code></pre>
</div>
<p><em>Listing 15-28: A leaf node with a weak reference to its parent node, branch</em></p>

<p>Việc tạo leaf node trông tương tự như Listing 15-27 ngoại trừ parent field: leaf bắt đầu mà không có parent, vì vậy chúng ta tạo một Weak&lt;Node&gt; reference instance mới, empty.</p>

<p>Tại thời điểm này, khi chúng ta cố get một reference đến parent của leaf bằng cách sử dụng upgrade method, chúng ta nhận được một None value. Chúng ta thấy điều này trong output từ câu lệnh println! đầu tiên:</p>

<pre><code>leaf parent = None</code></pre>

<p>Khi chúng ta create branch node, nó cũng sẽ có một Weak&lt;Node&gt; reference mới trong parent field vì branch không có parent node. Chúng ta vẫn có leaf như một trong các children của branch. Một khi chúng ta có Node instance trong branch, chúng ta có thể modify leaf để give nó một Weak&lt;Node&gt; reference đến parent của nó. Chúng ta sử dụng borrow_mut method trên RefCell&lt;Weak&lt;Node&gt;&gt; trong parent field của leaf, và sau đó chúng ta sử dụng Rc::downgrade function để tạo một Weak&lt;Node&gt; reference đến branch từ Rc&lt;Node&gt; trong branch.</p>

<p>Khi chúng ta print parent của leaf một lần nữa, lần này chúng ta sẽ nhận được một Some variant giữ branch: Bây giờ leaf có thể access parent của nó! Khi chúng ta print leaf, chúng ta cũng tránh được cycle mà cuối cùng dẫn đến stack overflow như trong Listing 15-26; các Weak&lt;T&gt; references được in như (Weak):</p>

<pre><code>leaf parent = Some(Node { value: 5, parent: RefCell { value: (Weak) },
children: RefCell { value: [Node { value: 3, parent: RefCell { value: (Weak) },
children: RefCell { value: [] } }] } })</code></pre>

<p>Sự lack of infinite output cho thấy rằng code này không tạo một reference cycle. Chúng ta cũng có thể tell điều này bằng cách nhìn vào các values chúng ta nhận được từ calling Rc::strong_count và Rc::weak_count.</p>

<h3 class="task-heading">Trực quan hóa Changes đến strong_count và weak_count</h3>
<p>Hãy nhìn vào cách strong_count và weak_count values của Rc&lt;Node&gt; instances thay đổi bằng cách create một inner scope mới và move việc tạo branch vào trong scope đó. Bằng cách làm điều đó, chúng ta có thể see điều gì xảy ra khi branch được tạo và sau đó dropped khi nó ra khỏi scope. Các modifications được show trong Listing 15-29.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!(
        "leaf strong = {}, weak = {}",
        Rc::strong_count(&leaf),
        Rc::weak_count(&leaf),
    );

    {
        let branch = Rc::new(Node {
            value: 5,
            parent: RefCell::new(Weak::new()),
            children: RefCell::new(vec![Rc::clone(&leaf)]),
        });

        *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

        println!(
            "branch strong = {}, weak = {}",
            Rc::strong_count(&branch),
            Rc::weak_count(&branch),
        );

        println!(
            "leaf strong = {}, weak = {}",
            Rc::strong_count(&leaf),
            Rc::weak_count(&leaf),
        );
    }

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
    println!(
        "leaf strong = {}, weak = {}",
        Rc::strong_count(&leaf),
        Rc::weak_count(&leaf),
    );
}</code></pre>
</div>
<p><em>Listing 15-29: Creating branch in an inner scope and examining strong and weak reference counts</em></p>

<p>Sau khi leaf được tạo, Rc&lt;Node&gt; của nó có strong count là 1 và weak count là 0. Trong inner scope, chúng ta create branch và associate nó với leaf, tại thời điểm đó khi chúng ta print counts, Rc&lt;Node&gt; trong branch sẽ có strong count là 1 và weak count là 1 (for leaf.parent pointing to branch với một Weak&lt;T&gt;). Khi chúng ta print counts trong leaf, chúng ta sẽ thấy nó sẽ có strong count là 2 vì branch bây giờ có một clone của Rc&lt;Node&gt; của leaf được stored trong branch.children nhưng vẫn sẽ có weak count là 0.</p>

<p>Khi inner scope kết thúc, branch ra khỏi scope và strong count của Rc&lt;Node&gt; giảm xuống 0, vì vậy Node của nó được dropped. Weak count của 1 từ leaf.parent không ảnh hưởng đến việc Node có được dropped hay không, vì vậy chúng ta không có bất kỳ memory leaks nào!</p>

<p>Nếu chúng ta cố access parent của leaf sau khi kết thúc scope, chúng ta sẽ nhận được None một lần nữa. Ở cuối program, Rc&lt;Node&gt; trong leaf có strong count là 1 và weak count là 0 vì biến leaf bây giờ là reference duy nhất đến Rc&lt;Node&gt; một lần nữa.</p>

<p>Tất cả logic quản lý counts và value dropping được built vào Rc&lt;T&gt; và Weak&lt;T&gt; và các implementations của trait Drop của chúng. Bằng cách specify rằng relationship từ child đến parent nên là một Weak&lt;T&gt; reference trong định nghĩa của Node, bạn có thể có các parent nodes trỏ đến child nodes và ngược lại mà không tạo reference cycles và memory leaks.</p>

<h3 class="task-heading">Tóm tắt Chương 15</h3>
<p>Chương này đã cover cách sử dụng smart pointers để tạo các guarantees và trade-offs khác nhau từ những gì Rust làm mặc định với regular references. Kiểu Box&lt;T&gt; có một known size và trỏ đến data allocated trên heap. Kiểu Rc&lt;T&gt; keeps track of the number of references đến data trên heap để data có thể có nhiều owners. Kiểu RefCell&lt;T&gt; với interior mutability cung cấp cho chúng ta một type mà chúng ta có thể sử dụng khi chúng ta cần một immutable type nhưng cần thay đổi một inner value của type đó; nó cũng enforce các borrowing rules tại runtime thay vì tại compile time.</p>

<p>Cũng đã thảo luận về các trait Deref và Drop, cho phép nhiều functionality của smart pointers. Chúng ta đã explore các reference cycles có thể gây ra memory leaks và cách ngăn chặn chúng sử dụng Weak&lt;T&gt;.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Reference Cycles và Weak&lt;T&gt;:</strong>
  <ul>
    <li><strong>Reference Cycle</strong> - Khi các references trỏ vòng tròn, không bao giờ được dropped</li>
    <li><strong>Rc&lt;T&gt; + RefCell&lt;T&gt;</strong> - Có thể tạo reference cycle</li>
    <li><strong>Weak&lt;T&gt;</strong> - Reference không ownership, không tính vào cleanup</li>
    <li><strong>Rc::downgrade</strong> - Tạo Weak&lt;T&gt; từ Rc&lt;T&gt;</li>
    <li><strong>Weak::upgrade</strong> - Chuyển Weak&lt;T&gt; thành Option&lt;Rc&lt;T&gt;&gt;</li>
    <li><strong>Tree structure</strong> - Parent sử dụng Weak&lt;T&gt;, children sử dụng Rc&lt;T&gt;</li>
  </ul>
</div>
`,
            defaultCode: `use std::cell::RefCell;
use std::rc::{Rc, Weak};

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}

fn main() {
    // Tạo leaf node - không có parent, không có children
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("Leaf ban đầu - parent: {:?}", leaf.parent.borrow().upgrade());

    // Tạo branch node - có một child là leaf
    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    // Leaf trỏ đến branch như parent (weak reference - không ownership)
    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    // In kết quả
    println!("Leaf sau khi có parent: {:?}", leaf.parent.borrow().upgrade());
    println!("Branch children: {:?}", branch.children.borrow().len());

    // Khi branch ra khỏi scope, leaf vẫn tồn tại
    // Không có memory leak vì Weak<T> không tính vào ownership
}
`,
            expectedOutput: `Leaf ban đầu - parent: None
Leaf sau khi có parent: Some(Node { value: 5, parent: RefCell { value: (Weak) }, children: RefCell { value: [] } })
Branch children: 1`
        };
