// =====================================================
// Chapter 28: 28Tech - Luyện Tập
// Structure: Each "Buổi" is a Chapter, containing multiple lessons
// =====================================================

import { Lesson, Chapter } from '../../courses';

// =====================================================
// Buổi 1: KIỂU DỮ LIỆU, TOÁN TỬ, IF ELSE
// =====================================================

const buoi1_lessons: Lesson[] = [
  {
    id: 'ch28_b1_01',
    title: '1. Phần nguyên, phần dư',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 1: Phần nguyên, phần dư</h2>
      <p>Tính và in ra phần nguyên và phần dư khi chia a cho b.</p>
      <h3>Input</h3>
      <p>Hai số nguyên a và b (b != 0)</p>
      <h3>Output</h3>
      <p>Phần nguyên và phần dư, cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>100 5</td><td>20 0</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut parts = input.split_whitespace();
    let a: i64 = parts.next().unwrap().parse().unwrap();
    let b: i64 = parts.next().unwrap().parse().unwrap();

    println!("{} {}", a / b, a % b);
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_02',
    title: '2. Tính giá trị biểu thức',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 2: Tính giá trị biểu thức</h2>
      <p>Cho biểu thức A(x) = x³ + 3x² + x + 1</p>
      <h3>Input</h3>
      <p>Số nguyên dương x không quá 10⁵</p>
      <h3>Output</h3>
      <p>Kết quả của biểu thức A(x)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2</td><td>23</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let x: i64 = input.trim().parse().unwrap();
    let result = x * x * x + 3 * x * x + x + 1;
    println!("{}", result);
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_03',
    title: '3. Tính tổng, hiệu, tích, thương',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 3: Tính tổng, hiệu, tích, thương</h2>
      <h3>Input</h3>
      <p>Hai số nguyên a, b (b ≠ 0)</p>
      <h3>Output</h3>
      <p>Tổng, hiệu, tích, thương (lấy 2 decimal)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10 2</td><td>12 8 20 5.00</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut parts = input.split_whitespace();
    let a: i64 = parts.next().unwrap().parse().unwrap();
    let b: i64 = parts.next().unwrap().parse().unwrap();

    println!("{} {} {} {:.2}", a + b, a - b, a * b, a as f64 / b as f64);
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_04',
    title: '4. Tính chu vi, diện tích hình tròn',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 4: Tính chu vi, diện tích hình tròn</h2>
      <h3>Input</h3>
      <p>Bán kính r (số nguyên, 1 ≤ r ≤ 10⁹)</p>
      <h3>Output</h3>
      <p>Chu vi và diện tích (lấy 2 decimal)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10</td><td>62.80 314.00</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let r: f64 = input.trim().parse().unwrap();
    println!("{:.2} {:.2}", 2.0 * 3.14 * r, 3.14 * r * r);
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_05',
    title: '5. Kiểm tra số chia hết cho 3 và 5',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 5: Kiểm tra số chia hết cho 3 và 5</h2>
      <h3>Input</h3>
      <p>Số nguyên n (-10¹⁸ ≤ n ≤ 10¹⁸)</p>
      <h3>Output</h3>
      <p>In 1 nếu chia hết cho cả 3 và 5, ngược lại in 0</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>30</td><td>1</td></tr>
        <tr><td>25</td><td>0</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i64 = input.trim().parse().unwrap();
    if n % 3 == 0 && n % 5 == 0 { println!("1"); }
    else { println!("0"); }
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_06',
    title: '6. Kiểm tra năm nhuận',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 6: Kiểm tra năm nhuận</h2>
      <h3>Input</h3>
      <p>Số nguyên n là năm</p>
      <h3>Output</h3>
      <p>"INVALID" nếu n ≤ 0, "YES" nếu năm nhuận, "NO" nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2020</td><td>YES</td></tr>
        <tr><td>2021</td><td>NO</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i64 = input.trim().parse().unwrap();
    if n <= 0 { println!("INVALID"); return; }
    let leap = (n % 400 == 0) || (n % 4 == 0 && n % 100 != 0);
    if leap { println!("YES"); } else { println!("NO"); }
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_07',
    title: '7. Số ngày trong tháng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 7: Số ngày trong tháng</h2>
      <h3>Input</h3>
      <p>Tháng t và năm n</p>
      <h3>Output</h3>
      <p>"INVALID" nếu không hợp lệ, ngược lại in số ngày</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 2021</td><td>28</td></tr>
        <tr><td>2 2020</td><td>29</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut parts = input.split_whitespace();
    let t: i32 = parts.next().unwrap().parse().unwrap();
    let n: i32 = parts.next().unwrap().parse().unwrap();
    if t < 1 || t > 12 || n <= 0 { println!("INVALID"); return; }
    let leap = (n % 400 == 0) || (n % 4 == 0 && n % 100 != 0);
    let days = match t {
        1|3|5|7|8|10|12 => 31, 4|6|9|11 => 30, 2 => if leap {29} else {28}, _ => 0
    };
    println!("{}", days);
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_08',
    title: '8. Kiểm tra chữ in thường',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 8: Kiểm tra chữ in thường</h2>
      <h3>Input</h3>
      <p>Một ký tự</p>
      <h3>Output</h3>
      <p>"YES" nếu là chữ in thường, "NO" nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>a</td><td>YES</td></tr>
        <tr><td>A</td><td>NO</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let c: char = input.trim().chars().next().unwrap();
    if c >= 'a' && c <= 'z' { println!("YES"); } else { println!("NO"); }
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_09',
    title: '9. Kiểm tra chữ in hoa',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 9: Kiểm tra chữ in hoa</h2>
      <h3>Input</h3>
      <p>Một ký tự</p>
      <h3>Output</h3>
      <p>"YES" nếu là chữ in hoa, "NO" nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>A</td><td>YES</td></tr>
        <tr><td>a</td><td>NO</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let c: char = input.trim().chars().next().unwrap();
    if c >= 'A' && c <= 'Z' { println!("YES"); } else { println!("NO"); }
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_10',
    title: '10. Kiểm tra chữ số',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 10: Kiểm tra chữ số</h2>
      <h3>Input</h3>
      <p>Một ký tự</p>
      <h3>Output</h3>
      <p>"YES" nếu là chữ số, "NO" nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>YES</td></tr>
        <tr><td>a</td><td>NO</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let c: char = input.trim().chars().next().unwrap();
    if c >= '0' && c <= '9' { println!("YES"); } else { println!("NO"); }
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_11',
    title: '11. Chuyển hoa thành thường',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 11: Chuyển chữ hoa thành thường</h2>
      <h3>Input</h3>
      <p>Một ký tự</p>
      <h3>Output</h3>
      <p>Chữ thường tương ứng nếu là chữ hoa, giữ nguyên nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>A</td><td>a</td></tr>
        <tr><td>%</td><td>%</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let c: char = input.trim().chars().next().unwrap();
    if c >= 'A' && c <= 'Z' {
        println!("{}", (c as u8 + 32) as char);
    } else {
        println!("{}", c);
    }
}`,
    isExercise: true,
  },
  {
    id: 'ch28_b1_12',
    title: '12. Tam giác hợp lệ',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bài 12: Tam giác hợp lệ</h2>
      <h3>Input</h3>
      <p>Ba số a, b, c</p>
      <h3>Output</h3>
      <p>"YES" nếu hợp lệ, "NO" nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 4 5</td><td>YES</td></tr>
        <tr><td>1 1 5</td><td>NO</td></tr>
      </table>
    `,
    defaultCode: `use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut parts = input.split_whitespace();
    let a: i64 = parts.next().unwrap().parse().unwrap();
    let b: i64 = parts.next().unwrap().parse().unwrap();
    let c: i64 = parts.next().unwrap().parse().unwrap();
    if a <= 0 || b <= 0 || c <= 0 { println!("NO"); return; }
    if a + b > c && a + c > b && b + c > a { println!("YES"); }
    else { println!("NO"); }
}`,
    isExercise: true,
  },
];

// =====================================================
// Export all chapters
// =====================================================

export const ch28_chapters: Chapter[] = [
  {
    id: 'ch28_buoi1',
    title: 'Buổi 1: Kiểu dữ liệu, Toán tử, If Else',
    introduction: '<p>Buổi 1 - Các bài tập cơ bản về kiểu dữ liệu, toán tử và cấu trúc rẽ nhánh</p>',
    lessons: buoi1_lessons,
  },
  // More chapters will be added as we read more PDFs
];

export default ch28_chapters;
