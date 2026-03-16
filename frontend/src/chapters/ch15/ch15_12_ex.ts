import { Lesson } from '../../courses';

export const ch15_12_ex: Lesson = {
    id: 'ch15-12-ex',
    title: 'Bài tập 15.12: Default Trait Implementation',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về default trait implementation!</p>`,
    defaultCode: `trait Summary {
    fn summarize(&self) -> String;
    fn default_summary(&self) -> String {
        String::from("(Không có tóm tắt)")
    }
}

struct Article {
    title: String,
    author: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{} - bởi {}", self.title, self.author)
    }
}

fn main() {
    let article = Article {
        title: String::from("Bài học Rust"),
        author: String::from("Nguyễn Văn A"),
    };
    println!("{}", article.summarize());
    println!("{}", article.default_summary());
}
`,
    expectedOutput: 'Bài học Rust - bởi Nguyễn Văn A\n(Không có tóm tắt)',
    testCases: [{ input: 'summarize()', expectedOutput: 'Bài học Rust', description: 'Summary works' }]
};
