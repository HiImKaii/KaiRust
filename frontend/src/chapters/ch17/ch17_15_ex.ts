import { Lesson } from '../../courses';

export const ch17_15_ex: Lesson = {
    id: 'ch17-15-ex',
    title: 'Bài tập 17.15: Advanced Trait Objects',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `<p>Hãy thực hành nâng cao với trait objects!</p>`,
    defaultCode: `trait Shape { fn area(&self) -> f64; fn name(&self) -> &str; }
struct Rectangle { width: f64, height: f64 }
struct Circle { radius: f64 }
impl Shape for Rectangle { fn area(&self) -> f64 { self.width * self.height } fn name(&self) -> &str { "Hình chữ nhật" } }
impl Shape for Circle { fn area(&self) -> f64 { std::f64::consts::PI * self.radius * self.radius } fn name(&self) -> &str { "Hình tròn" } }
fn print_area(shape: &dyn Shape) { println!("{} có diện tích: {:.2}", shape.name(), shape.area()); }
fn main() { let rect = Rectangle { width: 5.0, height: 3.0 }; print_area(&rect); }
`,
    expectedOutput: 'Hình chữ nhật',
    testCases: [{ input: 'area()', expectedOutput: '15', description: 'Advanced trait objects work' }]
};
