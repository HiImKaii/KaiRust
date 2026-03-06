import { Lesson } from '../../courses';

export const ch03_05: Lesson = {
  id: 'ch03-05',
  title: '3.5 Luồng điều khiển (Control Flow)',
  duration: '30 phút',
  type: 'theory',
  content: `
<p>Khả năng chạy một đoạn code dựa trên điều kiện đúng (true) hay sai (false), và chạy đoạn code lặp đi lặp lại trong khi điều kiện đúng, là các khối xây dựng cơ bản trong hầu hết ngôn ngữ lập trình. Các cấu trúc phổ biến nhất cho phép bạn kiểm soát luồng thực thi (control flow) trong Rust là <strong>biểu thức if</strong> và <strong>các vòng lặp</strong>.</p>

<h3 class="task-heading">Biểu thức if (if Expressions)</h3>
<p>Biểu thức <code>if</code> cho phép bạn phân nhánh code dựa trên điều kiện. Bạn cung cấp một điều kiện và nói: "Nếu điều kiện này được đáp ứng, hãy chạy block code này. Nếu không, đừng chạy block code này."</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let number = 7;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Quan trọng:</strong> Điều kiện trong Rust <strong>bắt buộc phải là <code>bool</code></strong>. Rust không tự động chuyển đổi kiểu non-Boolean sang Boolean. Nếu bạn viết <code>if number { ... }</code>, sẽ bị lỗi biên dịch. Bạn phải viết rõ ràng: <code>if number != 0 { ... }</code>.
</div>

<h4>Xử lý Nhiều Điều kiện với else if</h4>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}
// Output: number is divisible by 3</code></pre>
</div>

<h4>Sử dụng if trong lệnh let</h4>
<p>Vì <code>if</code> là expression, chúng ta có thể sử dụng nó bên phải của lệnh <code>let</code> để gán kết quả vào biến:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let condition = true;
let number = if condition { 5 } else { 6 };
println!("The value of number is: {number}"); // 5</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Khi dùng <code>if</code> trong <code>let</code>, cả hai nhánh <strong>phải trả về cùng kiểu dữ liệu</strong>. Nếu không, trình biên dịch sẽ báo lỗi <code>if and else have incompatible types</code>.
</div>

<h3 class="task-heading">Lặp lại với Vòng lặp (Repetition with Loops)</h3>
<p>Rust có ba loại vòng lặp: <code>loop</code>, <code>while</code>, và <code>for</code>.</p>

<h4>Vòng lặp loop</h4>
<p><code>loop</code> thực thi một block code lặp đi lặp lại mãi mãi hoặc cho đến khi bạn nói rõ ràng nó phải dừng bằng <code>break</code>. Bạn cũng có thể dùng <code>continue</code> để bỏ qua code còn lại trong lần lặp hiện tại và bắt đầu lần lặp tiếp theo.</p>

<h4>Trả về Giá trị từ loop</h4>
<p>Một trong những cách dùng hay nhất của <code>loop</code> là thử lại một thao tác có thể thất bại, ví dụ kiểm tra xem thread đã hoàn thành công việc chưa. Bạn có thể trả về giá trị từ vòng lặp bằng cách đặt giá trị sau biểu thức <code>break</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;  // result = 20
        }
    };

    println!("The result is {result}");
}
// Output: The result is 20</code></pre>
</div>

<h4>Nhãn vòng lặp (Loop Labels)</h4>
<p>Nếu bạn có vòng lặp bên trong vòng lặp, <code>break</code> và <code>continue</code> mặc định áp dụng cho vòng lặp trong cùng. Bạn có thể sử dụng <em>loop label</em> (nhãn vòng lặp) bắt đầu bằng dấu nháy đơn để chỉ định muốn <code>break</code> hoặc <code>continue</code> vòng lặp nào:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;  // thoát vòng lặp trong
            }
            if count == 2 {
                break 'counting_up;  // thoát vòng lặp ngoài
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>Loop label</em> (nhãn vòng lặp) bắt đầu bằng dấu nháy đơn <code>'</code> (ví dụ <code>'counting_up</code>) giúp bạn kiểm soát chính xác vòng lặp nào bị <code>break</code> hoặc <code>continue</code> khi có vòng lặp lồng nhau (nested loops).
</div>

<h4>Vòng lặp while (Conditional Loops)</h4>
<p>Thường hữu ích khi đánh giá điều kiện trong vòng lặp. Thay vì dùng <code>loop</code> + <code>if</code> + <code>break</code>, Rust cung cấp <code>while</code> ngắn gọn hơn:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");
        number -= 1;
    }

    println!("LIFTOFF!!!");
}
// Output: 3! 2! 1! LIFTOFF!!!</code></pre>
</div>

<h4>Vòng lặp for (Looping Through a Collection)</h4>
<p>Bạn có thể dùng <code>while</code> để lặp qua mảng, nhưng cách an toàn và ngắn gọn nhất là dùng vòng lặp <code>for</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}</code></pre>
</div>

<p><code>for</code> cũng thường được dùng với <code>Range</code> (một kiểu do thư viện chuẩn cung cấp). Kết hợp <code>.rev()</code> để đảo ngược:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
// Output: 3! 2! 1! LIFTOFF!!!</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong>
  <br>• <em>Range</em> <code>(1..4)</code> tạo dãy số 1, 2, 3 (không bao gồm 4). Dùng <code>(1..=4)</code> nếu muốn bao gồm cả 4.
  <br>• <code>.rev()</code> đảo ngược thứ tự lặp.
  <br>• Vòng lặp <code>for</code> là cách an toàn và quen thuộc nhất để duyệt collection vì Rust tự động xử lý chỉ mục, tránh lỗi <em>index out of bounds</em>.
</div>
`,
  defaultCode: `fn main() {
    // if expression
    let number = 7;
    if number % 2 == 0 {
        println!("{number} là số chẵn");
    } else {
        println!("{number} là số lẻ");
    }

    // if trong let
    let condition = true;
    let x = if condition { 5 } else { 6 };
    println!("x = {x}");

    // loop với break trả về giá trị
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };
    println!("Result từ loop: {result}");

    // while loop
    let mut n = 3;
    while n != 0 {
        println!("{n}...");
        n -= 1;
    }

    // for loop với range
    println!("Đếm ngược:");
    for i in (1..=5).rev() {
        println!("  {i}...");
    }
    println!("  🚀 GO!");
}
`,
  expectedOutput: '7 là số lẻ\nx = 5\nResult từ loop: 20\n3...\n2...\n1...\nĐếm ngược:\n  5...\n  4...\n  3...\n  2...\n  1...\n  🚀 GO!'
};
