import { Lesson } from '../../courses';

export const ch06_08_ex: Lesson = {
    id: 'ch06-08-ex',
    title: 'Bài tập 6.8: Kết hợp Enum và Pattern Matching',
    duration: '30 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Kết hợp Enum và Pattern Matching',
    memoryLimit: '256MB',
    timeLimit: '1s',

    problemDescription: `Bài tập tổng hợp: Kết hợp Enum, Pattern Matching, Option và Result.

Yêu cầu:
1. Định nghĩa enum PaymentMethod: Cash, CreditCard, DebitCard, Wallet
2. Định nghĩa enum PaymentStatus: Pending, Completed, Failed(String)
3. Viết hàm process_payment(method: PaymentMethod, amount: f64) -> PaymentStatus
4. Viết hàm calculate_fee(method: &PaymentMethod, amount: f64) -> Option<f64>

Phí thanh toán:
- Cash: 0%
- Wallet: 1%
- DebitCard: 2%
- CreditCard: 3%`,

    inputFormat: 'Gọi hàm với các PaymentMethod khác nhau',
    outputFormat: 'In ra PaymentStatus hoặc phí thanh toán',

    constraints: [
        { field: 'PaymentMethod', condition: '4 variant: Cash, CreditCard, DebitCard, Wallet' },
        { field: 'PaymentStatus', condition: '3 variant: Pending, Completed, Failed(String)' },
        { field: 'calculate_fee', condition: 'Trả về Option<f64>, Some(phí) hoặc None' }
    ],

    examples: [
        {
            input: 'process_payment(PaymentMethod::Cash, 100.0)',
            output: 'Completed',
            explanation: 'Thanh toán tiền mặt luôn thành công'
        },
        {
            input: 'calculate_fee(&PaymentMethod::CreditCard, 100.0)',
            output: 'Some(3)',
            explanation: 'Phí thẻ tín dụng 3%'
        }
    ],

    content: `
<h3>Phí thanh toán</h3>
<ul>
  <li>Cash: 0%</li>
  <li>Wallet: 1%</li>
  <li>DebitCard: 2%</li>
  <li>CreditCard: 3%</li>
</ul>
`,

    defaultCode: `// TODO: Định nghĩa enum PaymentMethod

// TODO: Định nghĩa enum PaymentStatus

// TODO: Viết hàm process_payment

// TODO: Viết hàm calculate_fee

fn main() {
    println!("{:?}", process_payment(PaymentMethod::Cash, 100.0));
    println!("{:?}", calculate_fee(&PaymentMethod::CreditCard, 100.0));
}
`,

    testCases: [
        {
            input: 'process_payment(PaymentMethod::Cash, 100.0)',
            expectedOutput: 'Completed',
            description: 'Thanh toán tiền mặt'
        },
        {
            input: 'calculate_fee(&PaymentMethod::CreditCard, 100.0)',
            expectedOutput: 'Some(3)',
            description: 'Phí thẻ tín dụng 3%'
        },
        {
            input: 'calculate_fee(&PaymentMethod::Wallet, 100.0)',
            expectedOutput: 'Some(1)',
            description: 'Phí wallet 1%'
        }
    ]
};
