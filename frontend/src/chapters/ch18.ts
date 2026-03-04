import { Chapter } from '../courses';

export const ch18: Chapter = {
    id: 'ch18',
    title: 'Chương 18: OOP trong Rust',
    lessons: [
        {
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
        },
        {
            id: 'ch18-02',
            title: '18.2 State Pattern trong Rust',
            duration: '20 phút',
            type: 'practice',
            content: `
<p>Ví dụ State pattern — blog post workflow qua các trạng thái: Draft → PendingReview → Published.</p>

<h3 class="task-heading">OOP approach (trait objects)</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Post {
    state: Option&lt;Box&lt;dyn State&gt;&gt;,
    content: String,
}

trait State {
    fn request_review(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt;;
    fn approve(self: Box&lt;Self&gt;) -> Box&lt;dyn State&gt;;
    fn content&lt;'a&gt;(&self, _post: &'a Post) -> &'a str { "" }
}

struct Draft {}
struct PendingReview {}
struct Published {}</code></pre>
</div>

<h3 class="task-heading">Rust-idiomatic approach (encoding states in types)</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Post { content: String }
struct DraftPost { content: String }
struct PendingReviewPost { content: String }

impl DraftPost {
    fn request_review(self) -> PendingReviewPost {
        PendingReviewPost { content: self.content }
    }
}

impl PendingReviewPost {
    fn approve(self) -> Post {
        Post { content: self.content }
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lợi thế Rust:</strong> Với type-state pattern, trạng thái không hợp lệ trở thành <strong>lỗi compile</strong>. Bạn không thể gọi <code>.approve()</code> trên Draft!
</div>
`,
            defaultCode: `// Type-state pattern
struct Draft { content: String }
struct Review { content: String }
struct Published { content: String }

impl Draft {
    fn new() -> Self {
        Draft { content: String::new() }
    }

    fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }

    fn submit(self) -> Review {
        println!("📝 Gửi review: '{}'", self.content);
        Review { content: self.content }
    }
}

impl Review {
    fn approve(self) -> Published {
        println!("✅ Đã duyệt!");
        Published { content: self.content }
    }

    fn reject(self) -> Draft {
        println!("❌ Bị từ chối, trả về Draft");
        Draft { content: self.content }
    }
}

impl Published {
    fn content(&self) -> &str {
        &self.content
    }
}

fn main() {
    // Workflow: Draft -> Review -> Published
    let mut post = Draft::new();
    post.add_text("Rust OOP thú vị!");

    let review = post.submit();
    let published = review.approve();
    println!("📰 Nội dung: {}", published.content());

    // Workflow: Draft -> Review -> Reject -> Draft -> Review -> Published
    println!("\\n--- Workflow 2 ---");
    let mut post2 = Draft::new();
    post2.add_text("Bài viết cần sửa");
    let review2 = post2.submit();
    let mut draft2 = review2.reject();
    draft2.add_text(" (đã sửa)");
    let review3 = draft2.submit();
    let published2 = review3.approve();
    println!("📰 Nội dung: {}", published2.content());
}
`,
            expectedOutput: '📝 Gửi review: \'Rust OOP thú vị!\'\n✅ Đã duyệt!\n📰 Nội dung: Rust OOP thú vị!\n\n--- Workflow 2 ---\n📝 Gửi review: \'Bài viết cần sửa\'\n❌ Bị từ chối, trả về Draft\n📝 Gửi review: \'Bài viết cần sửa (đã sửa)\'\n✅ Đã duyệt!\n📰 Nội dung: Bài viết cần sửa (đã sửa)'
        }
    ]
};
