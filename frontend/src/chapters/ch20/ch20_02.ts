import { Lesson } from '../../courses';

export const ch20_02: Lesson = {
            id: 'ch20-02',
            title: '20.2 Advanced Traits & Types',
            duration: '25 phút',
            type: 'theory',
            content: `
<h3 class="task-heading">Associated Types</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Iterator {
    type Item;  // Associated type
    fn next(&mut self) -> Option&lt;Self::Item&gt;;
}</code></pre>
</div>

<h3 class="task-heading">Operator Overloading</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::ops::Add;

#[derive(Debug)]
struct Point { x: i32, y: i32 }

impl Add for Point {
    type Output = Point;
    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

let p = Point { x: 1, y: 0 } + Point { x: 2, y: 3 };</code></pre>
</div>

<h3 class="task-heading">Newtype Pattern</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Meters(f64);
struct Kilometers(f64);

impl Meters {
    fn to_km(&self) -> Kilometers {
        Kilometers(self.0 / 1000.0)
    }
}</code></pre>
</div>

<h3 class="task-heading">Type Aliases</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>type Thunk = Box&lt;dyn Fn() + Send + 'static&gt;;
type Result&lt;T&gt; = std::result::Result&lt;T, std::io::Error&gt;;</code></pre>
</div>

<h3 class="task-heading">Never type (!) và Dynamically Sized Types</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// ! nghĩa là hàm không bao giờ return
fn diverges() -> ! {
    panic!("This function never returns!");
}

// str là DST, luôn dùng qua &str hoặc Box&lt;str&gt;</code></pre>
</div>
`,
            defaultCode: `use std::ops::Add;
use std::fmt;

#[derive(Debug, Clone, Copy)]
struct Vec2 {
    x: f64,
    y: f64,
}

impl Vec2 {
    fn new(x: f64, y: f64) -> Self {
        Vec2 { x, y }
    }

    fn magnitude(&self) -> f64 {
        (self.x * self.x + self.y * self.y).sqrt()
    }
}

impl Add for Vec2 {
    type Output = Vec2;
    fn add(self, other: Vec2) -> Vec2 {
        Vec2::new(self.x + other.x, self.y + other.y)
    }
}

impl fmt::Display for Vec2 {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({:.1}, {:.1})", self.x, self.y)
    }
}

fn main() {
    let a = Vec2::new(3.0, 4.0);
    let b = Vec2::new(1.0, 2.0);
    let c = a + b;

    println!("a = {a}");
    println!("b = {b}");
    println!("a + b = {c}");
    println!("|a| = {:.2}", a.magnitude());
    println!("|c| = {:.2}", c.magnitude());
}
`,
            expectedOutput: 'a = (3.0, 4.0)\nb = (1.0, 2.0)\na + b = (4.0, 6.0)\n|a| = 5.00\n|c| = 7.21'
        };
