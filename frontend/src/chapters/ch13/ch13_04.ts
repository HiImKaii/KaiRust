import { Lesson } from '../../courses';

export const ch13_04: Lesson = {
            id: 'ch13-04',
            title: '13.4 Hiệu suất: Vòng lặp vs Iterators',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Để xác định nên sử dụng vòng lặp hay iterators, bạn cần biết implementation nào nhanh hơn: phiên bản của hàm search với vòng lặp for tường minh hay phiên bản sử dụng iterators.</p>

<p>Chúng ta đã chạy benchmark bằng cách tải toàn bộ nội dung của cuốn "The Adventures of Sherlock Holmes" của Sir Arthur Conan Doyle vào một String và tìm kiếm từ "the" trong nội dung. Đây là kết quả của benchmark trên phiên bản search sử dụng vòng lặp for và phiên bản sử dụng iterators:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>test bench_search_for  ... bench:  19,620,300 ns/iter (+/- 915,700)
test bench_search_iter ... bench:  19,234,900 ns/iter (+/- 657,200)</code></pre>
</div>

<p>Hai implementations có hiệu suất tương tự nhau! Chúng ta sẽ không giải thích code benchmark ở đây vì mục đích không phải để chứng minh hai phiên bản là tương đương mà để có một ý tưởng chung về cách so sánh hiệu suất của hai implementations này.</p>

<p>Để có một benchmark toàn diện hơn, bạn nên kiểm tra bằng cách sử dụng các văn bản với các kích thước khác nhau làm nội dung, các từ khác nhau và các từ có độ dài khác nhau làm query, và tất cả các loại biến thể khác. Điểm mấu chốt là: Iterators, mặc dù là một abstraction cấp cao, được compile xuống thành code gần như tương đương nếu bạn tự viết code cấp thấp. Iterators là một trong những zero-cost abstractions của Rust, theo nghĩa là việc sử dụng abstraction không gây thêm overhead runtime nào. Điều này tương tự như cách Bjarne Stroustrup, người thiết kế và implement gốc của C++, định nghĩa zero-overhead trong bài thuyết trình ETAPS năm 2012 "Foundations of C++":</p>

<blockquote>
    <p>Nói chung, các implementation C++ tuân theo nguyên tắc zero-overhead: Những gì bạn không sử dụng, bạn không phải trả tiền. Và hơn nữa: Những gì bạn sử dụng, bạn không thể tự viết code tốt hơn được.</p>
</blockquote>

<p>Trong nhiều trường hợp, code Rust sử dụng iterators compile thành cùng một assembly mà bạn sẽ tự viết bằng tay. Các tối ưu hóa như loop unrolling và loại bỏ bounds checking khi truy cập mảng áp dụng và làm cho code kết quả cực kỳ hiệu quả. Bây giờ bạn đã biết điều này, bạn có thể sử dụng iterators và closures mà không sợ! Chúng làm cho code có vẻ như cấp cao hơn nhưng không gây penalty hiệu suất runtime nào cho việc đó.</p>

<h3 class="task-heading">Tóm tắt</h3>
<p>Closures và iterators là các tính năng của Rust được lấy cảm hứng từ các ý tưởng ngôn ngữ lập trình functional. Chúng đóng góp vào khả năng của Rust trong việc thể hiện rõ ràng các ý tưởng cấp cao với hiệu suất cấp thấp. Các implementations của closures và iterators được thiết kế sao cho hiệu suất runtime không bị ảnh hưởng. Đây là một phần trong mục tiêu của Rust là nỗ lực cung cấp zero-cost abstractions.</p>

<p>Bây giờ chúng ta đã cải thiện khả năng biểu đạt của project I/O, hãy xem xét một số tính năng khác của cargo sẽ giúp chúng ta chia sẻ project với thế giới.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Hiệu suất:</strong>
  <ul>
    <li><strong>Zero-cost abstractions</strong> - Abstraction không gây overhead runtime</li>
    <li><strong>Iterators = Vòng lặp thủ công</strong> - Compile ra cùng assembly</li>
    <li><strong>Loop unrolling</strong> - Tối ưu hóa tự động</li>
    <li><strong>Bounds checking elimination</strong> - Loại bỏ kiểm tra bounds</li>
    <li><strong>Closure performance</strong> - Không ảnh hưởng runtime</li>
  </ul>
</div>
`,
            defaultCode: `use std::time::Instant;

fn main() {
    // Demo so sanh hieu suất giua vong lap va iterator

    let data: Vec<i32> = (1..=10_000_000).collect();

    // Version 1: vong lap for
    let start = Instant::now();
    let sum_for: i64 = data.iter()
        .filter(|x| *x % 2 == 0)
        .map(|x| *x as i64)
        .sum();
    let duration_for = start.elapsed();

    // Version 2: vong lap thu cong
    let start = Instant::now();
    let mut sum_manual = 0i64;
    for x in &data {
        if *x % 2 == 0 {
            sum_manual += *x as i64;
        }
    }
    let duration_manual = start.elapsed();

    println!("Iterator sum: {sum_for}");
    println!("Vong lap sum: {sum_manual}");
    println!("Iterator time: {:?}", duration_for);
    println!("Vong lap time: {:?}", duration_manual);
}
`,
            expectedOutput: 'Iterator sum: 2500000050000000\nVong lap sum: 2500000050000000\nIterator time: ~0.5s\nVong lap time: ~0.5s'
        };
