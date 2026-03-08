import { Lesson } from '../../courses';

export const ch03_05_ex6: Lesson = {
    id: 'ch03-05-ex6',
    title: 'Bài tập 3.5.6: Phân tích thừa số nguyên tố',
    duration: '25 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Phân tích thừa số nguyên tố',
    timeLimit: '1s',
    memoryLimit: '256MB',
    problemDescription: 'Phân tích một số nguyên thành tích các thừa số nguyên tố.',
    inputFormat: 'Gọi hàm với số n = 12 và n = 315',
    outputFormat: 'In các thừa số nguyên tố theo định dạng: 2 * 2 * 3',
    constraints: [
        { field: 'n', condition: 'u32' }
    ],
    examples: [
        {
            input: '12',
            output: '2 * 2 * 3'
        }
    ],

    content: `
<div class="cyber-alert info">
  <strong>Gợi ý:</strong> Thuật toán là cứ thử chia số <code>n</code> cho các số nguyên tố tăng dần. Hễ chia hết, cập nhật lại biến <code>n</code>, đến bao giờ thương còn lại bằng 1 thì vòng lặp sẽ dừng!
</div>
`,
    defaultCode: `fn main() {
    print_prime_factors(12);
    println!("");
    print_prime_factors(315);
}

fn is_prime(n: u32) -> bool {
    if n < 2 { return false; }
    let mut i = 2;
    while i * i <= n {
        if n % i == 0 { return false; }
        i += 1;
    }
    true
}

fn print_prime_factors(mut n: u32) {
    if n <= 1 {
        print!("Khong co thua so");
        return;
    }

    let mut divisor = 2;
    let mut first = true;

    while n > 1 {
        if is_prime(divisor) {
            while n % divisor == 0 {
                if !first { print!(" * "); }
                print!("{}", divisor);
                n /= divisor;
                first = false;
            }
        }
        divisor += 1;
    }
}
`
};
