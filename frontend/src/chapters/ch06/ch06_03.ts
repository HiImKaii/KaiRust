import { Lesson } from '../../courses';

export const ch06_03: Lesson = {
            id: 'ch06-03',
            title: '6.3 Cú pháp siêu tắt: if let',
            duration: '15 phút',
            type: 'practice',
            content: `
<p>Cú pháp <code>if let</code> là cách viết gọn để xử lý khi bạn chỉ quan tâm đến MỘT TRƯỜNG HỢP DUY NHẤT và muốn bỏ qua các Variant còn lại thay vì phải viết đầy đủ match expression.</p>

<h3 class="task-heading">Vì sao cần if let?</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let config_max = Some(3u8);
match config_max {
    Some(max) => println!("The maximum is configured to be {max}"),
    _ => (), // Nếu chỉ cần xử lý Some, vẫn phải thêm _ => () để thỏa mãn exhaustiveness
}</code></pre>
</div>

<p>Như bạn thấy, ta phải khai báo <code>_ =&gt; ()</code> để thỏa mãn yêu cầu exhaustiveness của compiler. Với <strong><code>if let</code></strong>, code sẽ gọn hơn!</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let config_max = Some(3u8);
if let Some(max) = config_max {
    println!("The maximum is configured to be {max}");
}</code></pre>
</div>

<p>Cú pháp <code>if let</code> gồm: pattern ở đầu, sau đó là dấu <code>=</code> và expression ở cuối. Nó hoạt động tương tự như <code>match</code>, nhưng chỉ chạy nếu pattern khớp, và bỏ qua yêu cầu exhaustiveness checking của compiler.</p>

<h3 class="task-heading">if let với else</h3>
<p>Nếu bạn muốn xử lý trường hợp không khớp pattern, có thể thêm <code>else</code> block.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let coin = Coin::Quarter(UsState::Alabama);
let mut count = 0;
if let Coin::Quarter(state) = coin { // Nếu khớp, xử lý state
    println!("State trong quarter: {:?}!", state);
} else { // Không khớp thì tăng count
    count += 1;
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Khi nào dùng if let?</strong> Dùng khi logic chương trình đơn giản và chỉ cần xử lý một trường hợp cụ thể. Bạn đánh đổi tính an toàn của exhaustiveness check trong <code>match</code> để lấy sự ngắn gọn của <code>if let</code>.
</div>

<h3 class="task-heading">So sánh: match vs if let</h3>
<p>Khi nào nên dùng match, khi nào nên dùng if let?</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Dùng match khi:
// - Cần xử lý NHIỀU trường hợp
// - Cần exhaustiveness check (đảm bảo xử lý hết)
// - Cần trả về giá trị

let msg = Message::Write(String::from("hello"));
let text = match msg {
    Message::Write(s) => s,
    Message::Quit => String::from("quit"),
    Message::Move { x, y } => format!("move to ({}, {})", x, y),
    Message::ChangeColor(_, _, _) => String::from("color"),
};

// Dùng if let khi:
// - Chỉ quan tâm MỘT trường hợp cụ thể
// - Code ngắn gọn quan trọng hơn exhaustiveness
// - Xử lý Optional values

if let Some(value) = get_optional_value() {
    println!("Got: {}", value);
}</code></pre>
</div>

<h3 class="task-heading">while let: Vòng lặp với Option</h3>
<p><code>while let</code> tiếp tục lặp miễn là pattern khớp:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut stack = vec![Some(1), Some(2), None, Some(3)];

while let Some(value) = stack.pop() {
    println!("Got: {}", value);
}</code></pre>
</div>

<h3 class="task-heading">Tổng kết</h3>
<ul>
  <li><strong>match:</strong> Xử lý nhiều case, bắt buộc exhaustiveness, trả về giá trị</li>
  <li><strong>if let:</strong> Xử lý một case, ngắn gọn, không bắt buộc exhaustiveness</li>
  <li><strong>while let:</strong> Lặp khi còn khớp pattern</li>
</ul>
`,
            defaultCode: `fn main() {
    // if let với Option
    let favorite_color: Option<&str> = Some("xanh");

    if let Some(color) = favorite_color {
        println!("Màu yêu thích: {color}");
    } else {
        println!("Không có màu yêu thích");
    }

    // So sánh: match
    let age: Option<u8> = Some(25);
    match age {
        Some(a) if a >= 18 => println!("Đủ tuổi: {a}"),
        Some(a) => println!("Chưa đủ tuổi: {a}"),
        None => println!("Không biết tuổi"),
    }

    // if let liên tiếp
    let numbers = vec![Some(1), None, Some(3)];
    for num in &numbers {
        if let Some(n) = num {
            println!("Số: {n}");
        }
    }
}
`,
            expectedOutput: 'Màu yêu thích: xanh\nĐủ tuổi: 25\nSố: 1\nSố: 3'
        };
