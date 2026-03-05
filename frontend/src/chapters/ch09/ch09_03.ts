import { Lesson } from '../../courses';

export const ch09_03: Lesson = {
            id: 'ch09-03',
            title: '9.3 panic! hay Result? Khi nào dùng gì?',
            duration: '10 phút',
            type: 'theory',
            content: `
<p>Việc chọn <code>panic!</code> hay <code>Result</code> phụ thuộc vào ngữ cảnh.</p>

<h3 class="task-heading">Dùng Result khi:</h3>
<ul class="task-list">
  <li>Lỗi là <strong>có thể xảy ra</strong> và caller nên quyết định cách xử lý</li>
  <li>Viết library code — để người dùng tự chọn cách xử lý</li>
  <li>File không tìm thấy, network lỗi, parse sai format...</li>
</ul>

<h3 class="task-heading">Dùng panic! khi:</h3>
<ul class="task-list">
  <li>Ví dụ, prototype, tests</li>
  <li>Bạn có thông tin compiler không có (biết chắc sẽ thành công)</li>
  <li>Vi phạm contract/invariant — trạng thái <strong>không bao giờ nên xảy ra</strong></li>
</ul>

<h3 class="task-heading">Tạo custom types cho validation</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess phải từ 1-100, nhận {value}");
        }
        Guess { value }
    }

    pub fn value(&self) -> i32 {
        self.value
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Guidelines:</strong> Khi code có thể kết thúc ở trạng thái xấu (bad state) — state không mong đợi, vi phạm logic — hãy panic. Nếu lỗi là <em>expected</em>, dùng Result.
</div>
`,
            defaultCode: `struct Percentage {
    value: f64,
}

impl Percentage {
    fn new(value: f64) -> Result<Self, String> {
        if value < 0.0 || value > 100.0 {
            Err(format!("{value} không nằm trong khoảng 0-100"))
        } else {
            Ok(Percentage { value })
        }
    }

    fn display(&self) -> String {
        format!("{:.1}%", self.value)
    }
}

fn main() {
    // Valid
    match Percentage::new(85.5) {
        Ok(p) => println!("Tỷ lệ: {}", p.display()),
        Err(e) => println!("Lỗi: {e}"),
    }

    // Invalid
    match Percentage::new(150.0) {
        Ok(p) => println!("Tỷ lệ: {}", p.display()),
        Err(e) => println!("Lỗi: {e}"),
    }

    // Invalid negative
    match Percentage::new(-5.0) {
        Ok(p) => println!("Tỷ lệ: {}", p.display()),
        Err(e) => println!("Lỗi: {e}"),
    }
}
`,
            expectedOutput: 'Tỷ lệ: 85.5%\nLỗi: 150 không nằm trong khoảng 0-100\nLỗi: -5 không nằm trong khoảng 0-100'
        };
