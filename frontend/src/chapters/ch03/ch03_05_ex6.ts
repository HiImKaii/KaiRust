import { Lesson } from '../../courses';

export const ch03_05_ex6: Lesson = {
    id: 'ch03-05-ex6',
    title: 'Bài tập 3.5.6: Tổng hợp - Phân tích thừa số nguyên tố',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Một bài toán kinh điển trong khoa học máy tính: Phân tích một số nguyên thành tích các thừa số nguyên tố của nó!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết hàm <code>is_prime(n: u32) -&gt; bool</code>. Hàm này dùng vòng lặp <code>while</code> hoặc <code>loop</code> để kiểm tra n. Nếu có bất kỳ số <code>i</code> nào từ <code>2</code> đến <code>n - 1</code> là ước số của <code>n</code> (tức là <code>n % i == 0</code>), hàm phải trả về <code>false</code>. Nếu không, n là số nguyên tố, trả về <code>true</code>. (Lưu ý: 0 và 1 không phải số nguyên tố).</li>
  <li>Viết hàm <code>print_prime_factors(mut n: u32)</code>:
    <ul>
      <li>Nếu <code>n &lt;= 1</code>, in ra <code>"Không có thừa số"</code> và kết thúc sớm (dùng <code>return</code>).</li>
      <li>Bắt đầu với một biến chia (với <code>mut divisor = 2;</code>).</li>
      <li>Tạo một vòng lặp <code>loop</code> hoặc <code>while</code>, chừng nào <code>n &gt; 1</code>.</li>
      <li>Sử dụng vòng lặp:
        <ul>
           <li>Kiểm tra xem <code>divisor</code> có phải là số nguyên tố không (gọi hàm <code>is_prime</code>).</li>
           <li>Nếu <code>divisor</code> là số nguyên tố và <code>n % divisor == 0</code>: In ra <code>divisor</code> (kèm dấu *, ví dụ print!("{divisor} * ")). Sau đó chia <code>n</code> cho <code>divisor</code> (<code>n = n / divisor</code>).</li>
           <li>Nếu số này không chia hết cho <code>divisor</code>, tăng <code>divisor</code> lên 1.</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Sử dụng <code>print!("{divisor}");</code> (thay vì <code>println!</code>) để các phần tử in trên cùng một hàng. (Bạn có thể bỏ qua việc căn chỉnh dấu * thừa thãi ở cuối chuỗi).</li>
</ol>
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Thuật toán là cứ thử chia số <code>n</code> cho các số nguyên tố tăng dần. Hễ chia hết, cập nhật lại biến <code>n</code>, đến bao giờ thương còn lại bằng 1 thì vòng lặp sẽ dừng! 
</div>
`,
    defaultCode: `fn main() {
    println!("Phân tích 12:");
    print_prime_factors(12);
    // Kết quả mong đợi in ra: 2 * 2 * 3
    
    println!("\\nPhân tích 315:");
    print_prime_factors(315);
}

// 1. Viết hàm is_prime(n: u32) -> bool
fn is_prime(n: u32) -> bool {
    
    return true; // placeholder
}

// 2. Viết hàm print_prime_factors(mut n: u32)
fn print_prime_factors(mut n: u32) {
    
}
`
};
