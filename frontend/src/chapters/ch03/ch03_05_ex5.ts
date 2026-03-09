import { Lesson } from '../../courses';

export const ch03_05_ex5: Lesson = {
    id: 'ch03-05-ex5',
    title: 'Bài tập 3.5.5: Tổng hợp - Máy tính Mini (Mini Calculator)',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Máy tính Mini',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Viết hàm calculate(a, b, op) trả về tuple (has_error, result). Hỗ trợ +, -, *, /. Xử lý lỗi chia cho 0 và toán tử không hợp lệ.',
    inputFormat: 'Gọi hàm với các test case',
    outputFormat: 'In kết quả và trạng thái lỗi',
    constraints: [
        { field: 'a, b', condition: 'f64' },
        { field: 'op', condition: 'char: +, -, *, /' }
    ],
    examples: [
        {
            input: '10.0 5.0 +',
            output: '15.0 false'
        },
        {
            input: '10.0 0.0 /',
            output: '0.0 true'
        }
    ],

    content: `
<div class="cyber-alert warning">
  <strong>Cảnh báo (Panic):</strong> Nếu bạn chia đại một số cho <code>0.0</code> (f64), Rust sẽ sinh ra kết quả vô cực (<code>inf</code>) chứ không bị crash giống như số nguyên đâu nhé! Nhưng với yêu cầu bài này, bạn bắt buộc phải kiểm tra thủ công mẫu số <code>b == 0.0</code> khi <code>op == '/'</code>, nếu đúng thì coi là có lỗi (<code>has_error = true</code>).
</div>
`,
    defaultCode: `fn main() {
    let (err1, res1) = calculate(10.0, 5.0, '+');
    println!("{} {}", res1, err1);

    let (err2, res2) = calculate(10.0, 0.0, '/');
    println!("{} {}", res2, err2);

    let (err3, res3) = calculate(5.0, 2.0, '%');
    println!("{} {}", res3, err3);
}

fn calculate(a: f64, b: f64, op: char) -> (bool, f64) {
    if op == '+' {
        (false, a + b)
    } else if op == '-' {
        (false, a - b)
    } else if op == '*' {
        (false, a * b)
    } else if op == '/' {
        if b == 0.0 {
            (true, 0.0)
        } else {
            (false, a / b)
        }
    } else {
        (true, 0.0)
    }
}
`
};
