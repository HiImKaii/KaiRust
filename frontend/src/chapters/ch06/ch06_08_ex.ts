import { Lesson } from '../../courses';

export const ch06_08_ex: Lesson = {
    id: 'ch06-08-ex',
    title: 'Bài tập 6.8: Kết hợp Enum và Pattern Matching',
    duration: '30 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Bài tập tổng hợp: Kết hợp Enum, Pattern Matching, Option và Result!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa enum <code>PaymentMethod</code>: Cash, creditCard, DebitCard, Wallet</li>
  <li>Định nghĩa enum <code>PaymentStatus</code>: Pending, Completed, Failed(String)</li>
  <li>Tạo hàm <code>process_payment(method: PaymentMethod, amount: f64) -> PaymentStatus</code></li>
  <li>Tạo hàm <code>calculate_fee(method: &PaymentMethod, amount: f64) -> Option&lt;f64&gt;</code></li>
</ol>
<h3 class="task-heading">Phí thanh toán</h3>
<ul>
  <li>Cash: 0%</li>
  <li>Wallet: 1%</li>
  <li>DebitCard: 2%</li>
  <li>CreditCard: 3%</li>
</ul>
`,
    defaultCode: `// Định nghĩa enum PaymentMethod

// Định nghĩa enum PaymentStatus

// Hàm xử lý thanh toán

// Hàm tính phí thanh toán

fn main() {
}
`,
    expectedOutput: '',
    testCases: [
        {
            input: 'PaymentMethod::Cash',
            expectedOutput: 'Completed',
            description: 'Thanh toán tiền mặt luôn thành công'
        },
        {
            input: 'calculate_fee(&PaymentMethod::CreditCard, 100.0)',
            expectedOutput: 'Some(3.0)',
            description: 'Phí thẻ tín dụng 3%'
        }
    ]
};
