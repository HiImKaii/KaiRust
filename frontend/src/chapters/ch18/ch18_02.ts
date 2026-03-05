import { Lesson } from '../../courses';

export const ch18_02: Lesson = {
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
        };
