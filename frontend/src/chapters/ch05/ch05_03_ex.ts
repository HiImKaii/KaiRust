import { Lesson } from '../../courses';

export const ch05_03_ex: Lesson = {
    id: 'ch05-03-ex',
    title: 'Bài tập 5.3: Method Syntax',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Method Syntax - Circle',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Định nghĩa struct Circle với các method: area, circumference, scale, và associated function: new, from_diameter.',
    inputFormat: 'Không có input',
    outputFormat: 'In thông tin hình tròn',
    constraints: [
        { field: 'radius', condition: 'f64' }
    ],
    examples: [
        {
            input: '(không có)',
            output: '78.54\n31.42'
        }
    ],

    content: `
<p>Hãy thực hành định nghĩa Methods và Associated Functions!</p>
`,
    defaultCode: `#[derive(Debug)]
struct Circle {
    radius: f64,
}

impl Circle {
    fn new(radius: f64) -> Self {
        Self { radius }
    }

    fn from_diameter(diameter: f64) -> Self {
        Self { radius: diameter / 2.0 }
    }

    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }

    fn circumference(&self) -> f64 {
        2.0 * std::f64::consts::PI * self.radius
    }

    fn scale(&mut self, factor: f64) {
        self.radius *= factor;
    }
}

fn main() {
    let circle = Circle::new(5.0);
    println!("{:.2}", circle.area());
    println!("{:.2}", circle.circumference());

    let mut circle3 = Circle::new(2.0);
    circle3.scale(2.0);
    println!("{:.2}", circle3.radius);
}
`,
    expectedOutput: '78.54\n31.42\n4.00'
};
