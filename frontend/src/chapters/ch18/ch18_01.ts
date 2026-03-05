import { Lesson } from '../../courses';

export const ch18_01: Lesson = {
            id: 'ch18-01',
            title: '18.1 Đặc điểm OOP của Rust',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Rust có một số tính năng OOP nhưng cũng khác biệt đáng kể so với OOP truyền thống.</p>

<h3 class="task-heading">Encapsulation</h3>
<p>Rust hỗ trợ encapsulation qua <code>pub</code> keyword:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct AveragedCollection {
    list: Vec&lt;i32&gt;,        // private
    average: f64,           // private
}

impl AveragedCollection {
    pub fn add(&mut self, value: i32) {
        self.list.push(value);
        self.update_average();
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

<h3 class="task-heading">Không có Inheritance!</h3>
<p>Rust <strong>không có inheritance</strong>. Thay vào đó dùng:</p>
<ul class="task-list">
  <li><strong>Traits</strong> — chia sẻ behavior (thay thế interface)</li>
  <li><strong>Default implementations</strong> — code reuse trong traits</li>
  <li><strong>Composition</strong> — struct chứa struct khác</li>
</ul>

<h3 class="task-heading">Trait Objects cho Polymorphism</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Draw {
    fn draw(&self);
}

// Trait object: dyn Draw
pub struct Screen {
    pub components: Vec&lt;Box&lt;dyn Draw&gt;&gt;,
}

impl Screen {
    pub fn run(&self) {
        for component in &self.components {
            component.draw();
        }
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Generics vs Trait Objects:</strong>
  <ul>
    <li>Generics: monomorphization, nhanh hơn (static dispatch)</li>
    <li>Trait objects (<code>dyn Trait</code>): linh hoạt, chậm hơn (dynamic dispatch)</li>
  </ul>
</div>
`,
            defaultCode: `trait Shape {
    fn area(&self) -> f64;
    fn name(&self) -> &str;

    // Default implementation
    fn describe(&self) -> String {
        format!("{}: diện tích = {:.2}", self.name(), self.area())
    }
}

struct Circle { radius: f64 }
struct Rectangle { width: f64, height: f64 }
struct Triangle { base: f64, height: f64 }

impl Shape for Circle {
    fn area(&self) -> f64 { std::f64::consts::PI * self.radius * self.radius }
    fn name(&self) -> &str { "Hình tròn" }
}

impl Shape for Rectangle {
    fn area(&self) -> f64 { self.width * self.height }
    fn name(&self) -> &str { "Hình chữ nhật" }
}

impl Shape for Triangle {
    fn area(&self) -> f64 { 0.5 * self.base * self.height }
    fn name(&self) -> &str { "Tam giác" }
}

fn print_shapes(shapes: &[Box<dyn Shape>]) {
    for shape in shapes {
        println!("  {}", shape.describe());
    }
}

fn main() {
    let shapes: Vec<Box<dyn Shape>> = vec![
        Box::new(Circle { radius: 5.0 }),
        Box::new(Rectangle { width: 10.0, height: 3.0 }),
        Box::new(Triangle { base: 8.0, height: 6.0 }),
    ];

    println!("Các hình:");
    print_shapes(&shapes);

    let total: f64 = shapes.iter().map(|s| s.area()).sum();
    println!("\\nTổng diện tích: {total:.2}");
}
`,
            expectedOutput: 'Các hình:\n  Hình tròn: diện tích = 78.54\n  Hình chữ nhật: diện tích = 30.00\n  Tam giác: diện tích = 24.00\n\nTổng diện tích: 132.54'
        };
