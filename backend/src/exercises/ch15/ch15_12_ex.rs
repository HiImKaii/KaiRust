// Exercise - ch15_12_ex: Default Trait Implementation

trait Summary {
    fn summarize(&self) -> String;
    fn default_summary(&self) -> String {
        String::from("(Không có tóm tắt)")
    }
}

struct Article {
    title: String,
    author: String,
    content: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{} - bởi {}", self.title, self.author)
    }
}

struct Post {
    author: String,
    content: String,
}

impl Summary for Post {
    fn summarize(&self) -> String {
        format!("Post by {}", self.author)
    }
}

fn main() {
    let article = Article {
        title: String::from("Bài học Rust"),
        author: String::from("Nguyễn Văn A"),
        content: String::from("Nội dung bài viết..."),
    };

    let post = Post {
        author: String::from("Trần Văn B"),
        content: String::from("Nội dung bài đăng..."),
    };

    println!("{}", article.summarize());
    println!("{}", article.default_summary());
    println!("{}", post.default_summary());
}
