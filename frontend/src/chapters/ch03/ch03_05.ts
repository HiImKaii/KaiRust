import { Lesson } from '../../courses';

export const ch03_05: Lesson = {
  id: 'ch03-05',
  title: '3.5 Luồng điều khiển (Control Flow)',
  duration: '30 phút',
  type: 'theory',
  content: `
<p>Khả năng chạy một đoạn code dựa trên điều kiện đúng (true) và khả năng chạy một đoạn code lặp đi lặp lại trong khi điều kiện đúng là những khối xây dựng cơ bản trong hầu hết các ngôn ngữ lập trình. Các cấu trúc phổ biến nhất cho phép bạn kiểm soát luồng thực thi trong Rust là <strong>biểu thức if</strong> và <strong>các vòng lặp</strong>.</p>

<h3 class="task-heading">Biểu thức if (if Expressions)</h3>

<p>Một biểu thức <code>if</code> cho phép bạn phân nhánh mã tùy thuộc vào các điều kiện. Bạn đưa ra một điều kiện và sau đó chỉ định: "Nếu điều kiện này được đáp ứng, hãy chạy khối mã này. Nếu điều kiện không được đáp ứng, không chạy khối mã này."</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let number = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}</code></pre>
</div>

<p>Tất cả các biểu thức <code>if</code> bắt đầu bằng từ khóa <code>if</code>, tiếp theo là một điều kiện. Khối mã thực thi nằm ngay sau điều kiện trong dấu ngoặc nhọn. Tùy chọn, ta có thể kết hợp với biểu thức <code>else</code> để tạo một khối mã thay thế khi điều kiện đánh giá là <code>false</code>.</p>

<div class="cyber-alert warning">
  <strong>Quan trọng:</strong> Điều kiện trong Rust <strong>bắt buộc phải là kiểu <code>bool</code></strong>. Nếu điều kiện không phải là <code>bool</code>, chúng ta sẽ gặp lỗi ngay lúc biên dịch. Trái ngược với các ngôn ngữ như Ruby hay JavaScript, Rust sẽ không bao giờ tự động cố chuyển đổi các kiểu non-Boolean sang Boolean. Bạn luôn phải cung cấp rõ ràng một Boolean. Ví dụ <code>if number != 0</code> thay vì <code>if number</code>.
</div>

<h4>Xử lý Nhiều Điều kiện với else if</h4>

<p>Bạn có thể sử dụng nhiều điều kiện bằng cách kết hợp <code>if</code> và <code>else</code> trong một biểu thức <code>else if</code>:</p>

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
}</code></pre>
</div>

<p>Khi thực thi, chương trình sẽ kiểm tra từng biểu thức <code>if</code> theo thứ tự và chỉ thực hiện phần thân mã cho nhánh <strong>đầu tiên</strong> có kết quả đánh giá điều kiện là true. Kể cả khi 6 chia hết cho 2 (điều kiện thứ ba là đúng), Rust sẽ không hiển thị chuỗi của nhánh 3 vì cấu trúc rẽ nhánh đã dừng lại ngay ở nhánh 2.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Sử dụng quá nhiều chuỗi <code>else if</code> có thể làm mã rườm rà. Rust cung cấp một cấu trúc rẽ nhánh cực mạnh khác tên là <code>match</code> (sẽ học ở Chương 6).
</div>

<h4>Sử dụng if trong câu lệnh let</h4>

<p>Bởi vì <code>if</code> là một expression (biểu thức trả về giá trị), chúng ta có thể sử dụng biểu thức này ở bên phải của lệnh khai báo <code>let</code> để gán kết quả đầu ra cho một biến.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };
    println!("The value of number is: {number}"); // 5
}</code></pre>
</div>

<div class="cyber-alert warning">
  <strong>Lưu ý quan trọng:</strong> Khi dùng <code>if</code> trong <code>let</code>, giá trị được trả về từ cả nhánh <code>if</code> và nhánh <code>else</code> <strong>bắt buộc phải có cùng kiểu dữ liệu</strong>. Nếu các kiểu khác nhau, trình biên dịch sẽ báo lỗi <code>if and else have incompatible types</code>.
</div>

<h3 class="task-heading">Lặp lại với Vòng lặp (Repetition with Loops)</h3>

<p>Sẽ thường rất hữu ích khi thực hiện một khối mã nhiều lần. Rust có 3 loại vòng lặp: <code>loop</code>, <code>while</code>, và <code>for</code>.</p>

<h4>Vòng lặp loop</h4>

<p>Từ khóa <code>loop</code> yêu cầu Rust thực hiện một khối mã vô hạn lần, hoặc cho đến khi bạn bắt nó phải dừng lại.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    loop {
        println!("again!");
    }
}</code></pre>
</div>

<p>Để thoát khỏi vòng lặp vô hạn, bạn dùng từ khóa <code>break</code>. Bạn cũng có thể dùng từ khóa <code>continue</code> để bỏ qua đoạn code còn lại của vòng lặp hiện hành và bắt đầu bước lặp mới.</p>

<h5>Trả về giá trị từ loop</h5>

<p>Một trong những ứng dụng chủ chốt của <code>loop</code> là để thử lại một hành động có thể tốn thời gian như kiểm tra xem một thread đã thực hiện xong job chưa. Bạn có thể truyền kết quả từ vòng lặp ra bên ngoài bằng cách đặt giá trị trả về ngay đằng sau biểu thức <code>break</code>:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };
    println!("The result is {result}"); // In ra 20
}</code></pre>
</div>

<h5>Phân biệt vòng lặp lồng bằng Nhãn (Loop Labels)</h5>

<p>Nếu bạn có nhiều vòng lặp lồng nhau, mặc định từ khóa <code>break</code> và <code>continue</code> sẽ tác động đến vòng lặp sâu nhất (gần nó nhất). Tuy nhiên, nếu bạn muốn chỉ định chính xác vòng lặp để <code>break</code> hoặc <code>continue</code> ở cấp cao hơn, bạn có thể thiết lập một <strong>Nhãn Vòng Lặp</strong> (loop label). Nhãn vòng lặp trong Rust bắt buộc bắt đầu bằng một dấu nháy đơn <code>'</code>:</p>

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
                break; // chỉ thoát vòng lặp trong
            }
            if count == 2 {
                break 'counting_up; // thoát toàn bộ đến 'counting_up
            }
            remaining -= 1;
        }
        count += 1;
    }
    println!("End count = {count}");
}</code></pre>
</div>

<h4>Vòng lặp while</h4>

<p>Thường thì chương trình sẽ cần thực thi lặp lại chừng nào một điều kiện vẫn đang đúng (true). Rust cung cấp cấu trúc <code>while</code> để làm điều này.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");
        number -= 1;
    }
    println!("LIFTOFF!!!");
}</code></pre>
</div>

<h4>Vòng lặp for</h4>

<p>Bạn có thể dùng <code>while</code> để duyệt qua các phần tử của một tập hợp (collection) như mảng. Nhưng cách tiếp cận đó dễ sinh ra lỗi. Giả sử mảng có 4 phần tử nhưng ta lỡ viết điều kiện là <code>index < 5</code>, chương trình sẽ panic khi vòng lặp cố gọi <code>a[4]</code>. Cách này cũng chậm hơn vì trình biên dịch phải chèn thêm mã kiểm tra giới hạn ở mỗi vòng lặp.</p>

<p>Duyệt gọn gàng an toàn hơn là dùng <code>for</code>:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}</code></pre>
</div>

<p>Sự an toàn và súc tích của vòng lặp <code>for</code> khiến nó trở thành cấu trúc vòng lặp được sử dụng phổ biến nhất trong Rust. Ngay cả trong tình huống bạn muốn chạy một đoạn code một số lần nhất định, như ví dụ đếm ngược dùng vòng lặp <code>while</code> ở trên, đa số các Rustaceans sẽ dùng vòng lặp <code>for</code> kết hợp với <code>Range</code> và phương thức <code>.rev()</code> để đảo ngược dải số:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    // 1..=5 là tập số {1, 2, 3, 4, 5}
    // Rev nghịch đảo tập số
    for number in (1..=5).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}</code></pre>
</div>

<h3 class="task-heading">Tổng kết</h3>

<table class="comparison-table">
  <tr>
    <th>Cấu trúc</th>
    <th>Mô tả</th>
  </tr>
  <tr>
    <td><code>if</code></td>
    <td>Rẽ nhánh theo điều kiện (điều kiện phải là bool)</td>
  </tr>
  <tr>
    <td><code>else if</code></td>
    <td>Nhiều điều kiện</td>
  </tr>
  <tr>
    <td><code>if</code> trong <code>let</code></td>
    <td>Expression trả về giá trị (các nhánh phải cùng kiểu)</td>
  </tr>
  <tr>
    <td><code>loop</code></td>
    <td>Vòng lặp vô hạn, dùng <code>break</code> để thoát</td>
  </tr>
  <tr>
    <td><code>while</code></td>
    <td>Vòng lặp theo điều kiện</td>
  </tr>
  <tr>
    <td><code>for</code></td>
    <td>Duyệt collection (an toàn, khuyên dùng)</td>
  </tr>
</table>
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
