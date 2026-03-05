import { Lesson } from '../../courses';

export const ch15_02: Lesson = {
            id: 'ch15-02',
            title: '15.2 Rc<T> và RefCell<T>',
            duration: '25 phút',
            type: 'theory',
            content: `
<h3 class="task-heading">Rc&lt;T&gt; — Reference Counting</h3>
<p>Cho phép <strong>nhiều owner</strong> cùng sở hữu dữ liệu. Chỉ dùng cho single-threaded.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::rc::Rc;

let a = Rc::new(Cons(5, Rc::new(Nil)));
let b = Cons(3, Rc::clone(&a));  // Clone tăng ref count
let c = Cons(4, Rc::clone(&a));
println!("Ref count: {}", Rc::strong_count(&a)); // 3</code></pre>
</div>

<h3 class="task-heading">RefCell&lt;T&gt; — Interior Mutability</h3>
<p>Cho phép mutate dữ liệu ngay cả khi có immutable references. Kiểm tra borrowing rules tại <strong>runtime</strong> thay vì compile time.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::cell::RefCell;

let data = RefCell::new(5);

// Borrow mutable tại runtime
*data.borrow_mut() += 1;
println!("{}", data.borrow()); // 6</code></pre>
</div>

<h3 class="task-heading">Kết hợp Rc và RefCell</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::cell::RefCell;
use std::rc::Rc;

let value = Rc::new(RefCell::new(5));

let a = Rc::clone(&value);
let b = Rc::clone(&value);

*a.borrow_mut() += 10;

println!("{}", value.borrow()); // 15</code></pre>
</div>

<div class="cyber-alert info">
  <strong>So sánh:</strong>
  <ul>
    <li><code>Box&lt;T&gt;</code> — 1 owner, mutable/immutable borrow tại compile time</li>
    <li><code>Rc&lt;T&gt;</code> — nhiều owners, chỉ immutable borrow</li>
    <li><code>RefCell&lt;T&gt;</code> — 1 owner, mutable/immutable borrow tại runtime</li>
  </ul>
</div>
`,
            defaultCode: `use std::cell::RefCell;

fn main() {
    // RefCell demo
    let data = RefCell::new(vec![1, 2, 3]);

    // Thêm phần tử dù data không khai báo mut
    data.borrow_mut().push(4);
    data.borrow_mut().push(5);

    println!("Data: {:?}", data.borrow());
    println!("Len: {}", data.borrow().len());

    // Counter pattern
    let counter = RefCell::new(0);

    for _ in 0..10 {
        *counter.borrow_mut() += 1;
    }

    println!("Counter: {}", counter.borrow());
}
`,
            expectedOutput: 'Data: [1, 2, 3, 4, 5]\nLen: 5\nCounter: 10'
        };
