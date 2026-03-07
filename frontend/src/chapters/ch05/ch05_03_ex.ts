import { Lesson } from '../../courses';

export const ch05_03_ex: Lesson = {
    id: 'ch05-03-ex',
    title: 'Bài tập 5.3: Method Syntax',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Hãy thực hành định nghĩa Methods và Associated Functions!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa struct <code>Circle</code> với field <code>radius</code> (f64)</li>
  <li>Tạo associated function <code>new(radius: f64) -> Self</code> để khởi tạo</li>
  <li>Tạo associated function <code>from_diameter(d: f64) -> Self</code> tạo Circle từ đường kính</li>
  <li>Tạo method <code>area(&self) -> f64</code> tính diện tích (π * r²)</li>
  <li>Tạo method <code>circumference(&self) -> f64</code> tính chu vi (2 * π * r)</li>
  <li>Tạo method <code>scale(&mut self, factor: f64)</code> phóng to/thu nhỏ</li>
</ol>
<h3 class="task-heading">Công thức toán học</h3>
<ul>
  <li>Diện tích: π * radius²</li>
  <li>Chu vi: 2 * π * radius</li>
  <li>Bán kính từ đường kính: diameter / 2</li>
</ul>
<h3 class="task-heading">Ví dụ Test Cases</h3>
<div class="test-case">
  <h4>Test Case 1: Tính diện tích</h4>
  <pre><code>Input: Circle với radius = 5.0
Expected Output: Diện tích ≈ 78.54</code></pre>
</div>
<div class="test-case">
  <h4>Test Case 2: Từ đường kính</h4>
  <pre><code>Input: Circle::from_diameter(10.0)
Expected Output: radius = 5.0, area ≈ 78.54</code></pre>
</div>
<div class="test-case">
  <h4>Test Case 3: Scale</h4>
  <pre><code>Input: Circle radius=2.0, scale(2.0)
Expected Output: radius = 4.0</code></pre>
</div>
`,
    defaultCode: `#[derive(Debug)]
struct Circle {
    radius: f64,
}

impl Circle {
    // Associated function: tạo Circle từ bán kính
    fn new(radius: f64) -> Self {
        Self { radius }
    }

    // Associated function: tạo Circle từ đường kính
    fn from_diameter(diameter: f64) -> Self {
        Self { radius: diameter / 2.0 }
    }

    // Method: tính diện tích
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }

    // Method: tính chu vi
    fn circumference(&self) -> f64 {
        2.0 * std::f64::consts::PI * self.radius
    }

    // Method: phóng to/thu nhỏ
    fn scale(&mut self, factor: f64) {
        self.radius *= factor;
    }
}

fn main() {
    // Tạo Circle với radius = 5.0
    let circle = Circle::new(5.0);
    println!("Circle: {:?}", circle);
    println!("Diện tích: {:.2}", circle.area());
    println!("Chu vi: {:.2}", circle.circumference());

    // Tạo từ đường kính
    let circle2 = Circle::from_diameter(10.0);
    println!("Circle từ đường kính: {:?}", circle2);

    // Scale
    let mut circle3 = Circle::new(2.0);
    circle3.scale(2.0);
    println!("Sau khi scale x2: {:?}", circle3);
}
`,
    expectedOutput: 'Circle: Circle { radius: 5.0 }\nDiện tích: 78.54\nChu vi: 31.42\nCircle từ đường kính: Circle { radius: 5.0 }\nSau khi scale x2: Circle { radius: 4.0 }',
    testCases: [
        {
            input: 'Circle::new(5.0)',
            expectedOutput: 'Diện tích: 78.54',
            description: 'Tính diện tích hình tròn'
        },
        {
            input: 'Circle::from_diameter(10.0)',
            expectedOutput: 'radius = 5.0',
            description: 'Tạo từ đường kính'
        },
        {
            input: 'Circle::new(2.0).scale(2.0)',
            expectedOutput: 'radius = 4.0',
            description: 'Phóng to hình tròn'
        }
    ]
};
