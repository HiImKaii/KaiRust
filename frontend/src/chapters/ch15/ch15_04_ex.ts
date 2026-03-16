import { Lesson } from '../../courses';

export const ch15_04_ex: Lesson = {
    id: 'ch15-04-ex',
    title: 'Bài tập 15.4: Drop Trait',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu về Drop trait để tùy chỉnh khi smart pointer bị drop!</p>`,
    defaultCode: `struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer với data: {}", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer { data: String::from("Hello") };
    println!("Tạo CustomSmartPointer");
}
`,
    expectedOutput: 'Tạo CustomSmartPointer\nDropping CustomSmartPointer với data: Hello',
    testCases: [{ input: 'CustomSmartPointer', expectedOutput: 'Dropping', description: 'Drop trait works' }]
};
