import { Chapter } from '../courses';

export const ch15: Chapter = {
    id: 'ch15',
    title: 'Chương 15: Smart Pointers',
    lessons: [
        {
            id: 'ch15-01',
            title: '15.1 Box<T> — Dữ liệu trên Heap',
            duration: '20 phút',
            type: 'theory',
            content: `
<p><strong>Smart Pointers</strong> là kiểu dữ liệu hoạt động như pointer nhưng có thêm metadata và capabilities. Phổ biến nhất là <code>Box&lt;T&gt;</code>, <code>Rc&lt;T&gt;</code>, và <code>RefCell&lt;T&gt;</code>.</p>

<h3 class="task-heading">Box&lt;T&gt;</h3>
<p>Lưu trữ dữ liệu trên heap thay vì stack. Hữu ích khi:</p>
<ul class="task-list">
  <li>Kiểu có kích thước không biết tại compile time</li>
  <li>Dữ liệu lớn muốn transfer ownership mà không copy</li>
  <li>Trait objects</li>
</ul>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let b = Box::new(5);
println!("b = {b}");

// Recursive types (cần Box vì size không biết trước)
enum List {
    Cons(i32, Box&lt;List&gt;),
    Nil,
}

use List::{Cons, Nil};
let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));</code></pre>
</div>

<h3 class="task-heading">Deref trait</h3>
<p>Cho phép dùng <code>*</code> để dereference:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 5;
let y = Box::new(x);
assert_eq!(5, *y);</code></pre>
</div>

<h3 class="task-heading">Drop trait</h3>
<p>Customize code chạy khi giá trị ra khỏi scope:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping: {}", self.data);
    }
}</code></pre>
</div>
`,
            defaultCode: `// Linked List với Box
#[derive(Debug)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn list_to_vec(list: &List) -> Vec<i32> {
    let mut result = Vec::new();
    let mut current = list;
    loop {
        match current {
            Cons(val, next) => {
                result.push(*val);
                current = next;
            }
            Nil => break,
        }
    }
    result
}

fn main() {
    // Box cơ bản
    let boxed = Box::new(42);
    println!("Boxed value: {}", *boxed);

    // Linked List
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
    let vec = list_to_vec(&list);
    println!("List -> Vec: {:?}", vec);

    // Box cho trait objects
    let animals: Vec<Box<dyn std::fmt::Display>> = vec![
        Box::new("Mèo"),
        Box::new(42),
        Box::new(3.14),
    ];
    print!("Mixed types: ");
    for a in &animals {
        print!("{a} ");
    }
    println!();
}
`,
            expectedOutput: 'Boxed value: 42\nList -> Vec: [1, 2, 3]\nMixed types: Mèo 42 3.14 '
        },
        {
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
        }
    ]
};
