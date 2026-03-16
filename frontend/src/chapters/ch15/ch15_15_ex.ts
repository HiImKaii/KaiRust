import { Lesson } from '../../courses';

export const ch15_15_ex: Lesson = {
    id: 'ch15-15-ex',
    title: 'Bài tập 15.15: Advanced Trait Patterns',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy tìm hiểu các pattern nâng cao với traits!</p>`,
    defaultCode: `trait MyTrait {
    type Output;
    fn process(&self) -> Self::Output;
}

struct Data {
    value: i32,
}

impl MyTrait for Data {
    type Output = String;

    fn process(&self) -> Self::Output {
        format!("Xử lý: {}", self.value)
    }
}

fn factory<T: MyTrait>(item: T) -> <T as MyTrait>::Output {
    item.process()
}

fn main() {
    let data = Data { value: 42 };
    let result = factory(data);
    println!("{}", result);
}
`,
    expectedOutput: 'Xử lý: 42',
    testCases: [{ input: 'factory(data)', expectedOutput: 'Xử lý: 42', description: 'Factory function works' }]
};
