import { Lesson } from '../../courses';

export const ch15_01: Lesson = {
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
        };
