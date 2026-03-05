import { Lesson } from '../../courses';

export const ch06_03: Lesson = {
            id: 'ch06-03',
            title: '6.3 Cú pháp siêu tắt: if let',
            duration: '15 phút',
            type: 'practice',
            content: `
<p>Cú pháp kiểm soát <code>if let</code> là chiếc phao cứu sinh ngắn gọn nhất để giúp mấy ông lười code có thể xài <code>match</code> mà chỉ muốn match ra MỘT TRƯỜNG HỢP DUY NHẤT và bắt lại Data của cái duy nhất đó (bỏ qua mặc kệ các Variant còn dư).</p>

<h3 class="task-heading">Vì sao ra đời if let</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let config_max = Some(3u8);
match config_max {
    Some(max) => println!("The maximum is configured to be {max}"),
    _ => (), // NẾU CHỈ CẦN XÀI DÒNG TRÊN, THẾ NHÉT DÒNG NÀY ĐỂ PASS COMPILER QUÁ TỐN KÉM CHỖ VÀ LÀM RỐI
}</code></pre>
</div>

<p>Đúng thế! Ta đã phải khai <code>_ =&gt; ()</code> để vui lòng cái gã Compiler. Nếu chúng ta dùng <strong><code>if let</code></strong> cấu trúc sẽ được tối ưu!</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let config_max = Some(3u8);
if let Some(max) = config_max {
    println!("The maximum is configured to be {max}");
}</code></pre>
</div>

<p>Cú pháp của <code>if let</code> cần một cái Pattern ở đầu, sau đó là dấu phẩy <code>=</code> và Expression ở đuôi . Cú pháp hoạt động y chang như một cái <code>match</code> có expression được tuôn từ nhánh đầu, nhưng nó chỉ chạy nếu nhánh đó khớp. Còn lại nó sẽ bỏ đi bỏ qua các phiền toái Exhaustive Checking (kiểm tra ngặt nghèo các variant còn dư từ compiler).</p>

<h3 class="task-heading">if let với else</h3>
<p>Nếu bạn muốn bắt nhánh phụ rớt khi không lọt vào nhánh lớn chính, ta hoàn toàn có thể append vào bằng block <code>else</code> thần thánh.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let coin = Coin::Quarter(UsState::Alabama);
let mut count = 0;
if let Coin::Quarter(state) = coin { // Match trúng thì xử lý state ở đây (do coin là Quarter)
    println!("Dữ liệu state lấy ra ở trong quarter: {:?}!", state);
} else { // Không vô thì nhảy xuống đếm cho biến counter!
    count += 1;
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Khi nào dùng if let?</strong> Khi logic chương trình của bạn cô đọng mà chả cần xử lý quá nhiều logic rườm rà. Bạn trade an toàn exhaustive control check của <code>match</code> để lấy sự súc tích code cho <code>if let</code>.
</div>
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
