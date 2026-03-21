// Buổi 18: XỬ LÝ CHUỖI NÂNG CAO

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi18_lessons: Lesson[] = [
  {
    id: 'ch28_b18_01',
    title: '1. Phân loại ký tự',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phân loại ký tự</h2>
      <p>Đếm số chữ số, chữ cái, và ký tự đặc biệt trong chuỗi.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Dòng 1: số chữ số. Dòng 2: số chữ cái. Dòng 3: số ký tự đặc biệt.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>test@123.edu.vn</td><td>3\n9\n2</td></tr>
      </table>
    `,
    testCases: [
      { input: 'test@123.edu.vn', expectedOutput: '3\n9\n2' },
      { input: 'Hello123!', expectedOutput: '3\n5\n1', hidden: true },
      { input: 'abc', expectedOutput: '0\n3\n0', hidden: true },
      { input: '!!!', expectedOutput: '0\n0\n3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_02',
    title: '2. Chuyển hoa ↔ thường',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Chuyển hoa ↔ thường</h2>
      <p>Chuyển chữ hoa thành thường và chữ thường thành hoa.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Chuỗi đã chuyển đổi.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>nguYen Canh HUNG</td><td>NGUyEN cANH hung</td></tr>
      </table>
    `,
    testCases: [
      { input: 'nguYen Canh HUNG', expectedOutput: 'NGUyEN cANH hung' },
      { input: 'Hello', expectedOutput: 'hELLO', hidden: true },
      { input: 'AbC', expectedOutput: 'aBc', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_03',
    title: '3. Đếm số từ trong chuỗi',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Đếm số từ</h2>
      <p>Đếm số từ trong chuỗi (từ = dãy ký tự liên tiếp không có khoảng trắng).</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Số từ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Lap

trinh ngon ngu

C</td><td>5</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Lap\n\ntrinh ngon ngu\n\nC', expectedOutput: '5' },
      { input: 'one two three', expectedOutput: '3', hidden: true },
      { input: 'single', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_04',
    title: '4. Chuẩn hóa tên 1 (Họ, Tên đệm, Tên)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuẩn hóa tên 1</h2>
      <p>Chuẩn hóa: Họ viết hoa toàn bộ, Tên đệm và Tên viết hoa chữ cái đầu. Họ được viết sau cùng, phân cách bởi dấu phẩy.</p>
      <h3>Input</h3>
      <p>Dòng 1: Họ. Dòng 2: Tên đệm. Dòng 3: Tên.</p>
      <h3>Output</h3>
      <p>Chuỗi đã chuẩn hóa.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>ngUYEN

van nam</td><td>Van Nam, NGUYEN</td></tr>
      </table>
    `,
    testCases: [
      { input: 'ngUYEN\n\nvan nam', expectedOutput: 'Van Nam, NGUYEN' },
      { input: 'TRAN\n\nThi\nHanh', expectedOutput: 'Thi Hanh, TRAN', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_05',
    title: '5. Tạo địa chỉ email',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tạo địa chỉ email</h2>
      <p>Tạo email theo quy tắc: tên + chữ cái đầu họ + chữ cái đầu tên đệm @gmail.com. Viết thường.</p>
      <h3>Input</h3>
      <p>Dòng 1: Họ. Dòng 2: Tên đệm. Dòng 3: Tên.</p>
      <h3>Output</h3>
      <p>Địa chỉ email.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>ngUYEN

van binh</td><td>binhnv@gmail.com</td></tr>
      </table>
    `,
    testCases: [
      { input: 'ngUYEN\n\nvan binh', expectedOutput: 'binhnv@gmail.com' },
      { input: 'TRAN\n\nThi\nHanh', expectedOutput: 'hanht@gmail.com', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_06',
    title: '6. Tách và đảo ngược chuỗi',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tách và đảo ngược</h2>
      <p>Tách chuỗi thành các ký tự riêng rẽ, đảo ngược thứ tự và nối lại thành chuỗi mới.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Chuỗi đã đảo ngược.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Ngon ngu lap trinh C</td><td>ChnIrtpalugnnogN</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Ngon ngu lap trinh C', expectedOutput: 'ChnIrtpalugnnogN' },
      { input: 'abc', expectedOutput: 'cba', hidden: true },
      { input: 'Hello', expectedOutput: 'olleH', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_07',
    title: '7. Chuẩn hóa tên 2 (Họ, Tên đệm, Tên - viết hoa)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuẩn hóa tên 2</h2>
      <p>Chuẩn hóa: Tên đệm và Tên viết hoa chữ cái đầu, Họ viết hoa toàn bộ. Họ được viết sau cùng.</p>
      <h3>Input</h3>
      <p>Dòng 1: Họ. Dòng 2: Tên đệm. Dòng 3: Tên.</p>
      <h3>Output</h3>
      <p>Chuỗi đã chuẩn hóa.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>ngUYEN

van binh</td><td>Nguyen Van, BINH</td></tr>
      </table>
    `,
    testCases: [
      { input: 'ngUYEN\n\nvan binh', expectedOutput: 'Nguyen Van, BINH' },
      { input: 'TRAN\n\nThi\nHanh', expectedOutput: 'Tran Thi, HANH', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_08',
    title: '8. Chuẩn hóa tên 3 (Tên trước, Họ sau)',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuẩn hóa tên 3</h2>
      <p>Chuẩn hóa: Tên đệm và Tên viết hoa chữ cái đầu. Họ viết hoa toàn bộ, đặt sau cùng, phân cách bởi dấu phẩy.</p>
      <h3>Input</h3>
      <p>Dòng 1: Họ. Dòng 2: Tên đệm. Dòng 3: Tên.</p>
      <h3>Output</h3>
      <p>Tên đệm + Tên, HỌ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>ngUYEN

van binh</td><td>Binh, Nguyen Van</td></tr>
      </table>
    `,
    testCases: [
      { input: 'ngUYEN\n\nvan binh', expectedOutput: 'Binh, Nguyen Van' },
      { input: 'TRAN\n\nThi\nHanh', expectedOutput: 'Hanh, Tran Thi', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_09',
    title: '9. Tách từ trong chuỗi',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tách từ</h2>
      <p>Tách chuỗi thành các từ, mỗi từ trên một dòng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Mỗi từ trên một dòng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Ngon ngu lap trinh C</td><td>Ngon\nngu\nlap\ntrinh\nC</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Ngon ngu lap trinh C', expectedOutput: 'Ngon\nngu\nlap\ntrinh\nC' },
      { input: 'one two three', expectedOutput: 'one\ntwo\nthree', hidden: true },
      { input: 'single', expectedOutput: 'single', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_10',
    title: '10. Chèn chuỗi',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Chèn chuỗi</h2>
      <p>Chèn chuỗi b vào chuỗi a tại vị trí p (1-indexed, chèn trước ký tự tại vị trí p).</p>
      <h3>Input</h3>
      <p>Dòng 1: chuỗi a. Dòng 2: chuỗi b. Dòng 3: vị trí p.</p>
      <h3>Output</h3>
      <p>Chuỗi kết quả.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Ngon ngu lap trinh c<br>ngon ngu C.<br>1</td><td>ngon ngu C.Ngon ngu lap trinh c</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Ngon ngu lap trinh c\nngon ngu C.\n1', expectedOutput: 'ngon ngu C.Ngon ngu lap trinh c' },
      { input: 'abc\nXYZ\n2', expectedOutput: 'aXYZbc', hidden: true },
      { input: 'test\nINSERT\n4', expectedOutput: 'testINSERT', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_11',
    title: '11. Liệt kê từ in hoa',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Liệt kê từ in hoa</h2>
      <p>Tìm các từ in hoa toàn bộ trong chuỗi, in theo thứ tự xuất hiện.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Các từ in hoa cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Lap TRINH NGON Ngu c</td><td>TRINH NGON</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Lap TRINH NGON Ngu c', expectedOutput: 'TRINH NGON' },
      { input: 'Hello World', expectedOutput: 'WORLD', hidden: true },
      { input: 'no uppercase', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_12',
    title: '12. Từ dài nhất và ngắn nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Từ dài nhất và ngắn nhất</h2>
      <p>Tìm từ dài nhất và từ ngắn nhất trong chuỗi. Nếu có nhiều, lấy từ xuất hiện trước.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Dòng 1: từ dài nhất. Dòng 2: từ ngắn nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Lap trinh ngon ngu c</td><td>trinh\nLap</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Lap trinh ngon ngu c', expectedOutput: 'trinh\nLap' },
      { input: 'a ab abc', expectedOutput: 'abc\na', hidden: true },
      { input: 'hello world', expectedOutput: 'hello\nhello', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_13',
    title: '13. Loại bỏ khoảng trắng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Loại bỏ khoảng trắng</h2>
      <p>Loại bỏ tất cả khoảng trắng giữa các từ trong chuỗi.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Chuỗi không có khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Nguyen van binh</td><td>Nguyenvanbinh</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Nguyen van binh', expectedOutput: 'Nguyenvanbinh' },
      { input: 'hello world test', expectedOutput: 'helloworldtest', hidden: true },
      { input: 'abc', expectedOutput: 'abc', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_14',
    title: '14. Tạo email 2',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tạo email 2</h2>
      <p>Tạo email: chữ cái đầu họ + tên đệm + tên @gmail.com. Viết thường toàn bộ.</p>
      <h3>Input</h3>
      <p>Dòng 1: Họ. Dòng 2: Tên đệm. Dòng 3: Tên.</p>
      <h3>Output</h3>
      <p>Địa chỉ email.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>ngUYEN

van BInh</td><td>nvbinh@gmail.com</td></tr>
      </table>
    `,
    testCases: [
      { input: 'ngUYEN\n\nvan BInh', expectedOutput: 'nvbinh@gmail.com' },
      { input: 'TRAN\n\nLe\nMinh', expectedOutput: 'lmtran@gmail.com', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_15',
    title: '15. Tách ký tự',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tách ký tự</h2>
      <p>Nhập các dòng chứa ký tự (hoặc chuỗi), ghép tất cả lại rồi in ra một dòng không có khoảng trắng.</p>
      <h3>Input</h3>
      <p>Nhiều dòng, mỗi dòng một ký tự hoặc chuỗi.</p>
      <h3>Output</h3>
      <p>Chuỗi ghép không có khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Tran

van

bINH</td><td>tranvanbinh</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Tran\n\nvan\n\nbINH', expectedOutput: 'tranvanbinh' },
      { input: 'H\ne\nl\nl\no', expectedOutput: 'hello', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_16',
    title: '16. Chuyển chuỗi thành in hoa',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Chuyển thành in hoa</h2>
      <p>Chuyển toàn bộ chuỗi thành in hoa.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Chuỗi in hoa.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Lap trinh c</td><td>LAP TRINH C</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Lap trinh c', expectedOutput: 'LAP TRINH C' },
      { input: 'hello', expectedOutput: 'HELLO', hidden: true },
      { input: 'Mixed Case 123', expectedOutput: 'MIXED CASE 123', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_17',
    title: '17. Loại bỏ từ trùng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Loại bỏ từ trùng</h2>
      <p>Loại bỏ các từ trùng lặp trong chuỗi, giữ thứ tự xuất hiện đầu tiên.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Chuỗi đã loại bỏ từ trùng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>lap trinh c la mot mon hoc lap trinh c mon</td><td>lap trinh c la mot mon hoc</td></tr>
      </table>
    `,
    testCases: [
      { input: 'lap trinh c la mot mon hoc lap trinh c mon', expectedOutput: 'lap trinh c la mot mon hoc' },
      { input: 'a a a a a', expectedOutput: 'a', hidden: true },
      { input: 'one two three one', expectedOutput: 'one two three', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_18',
    title: '18. Từ xuất hiện nhiều nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Từ xuất hiện nhiều nhất</h2>
      <p>Tìm từ xuất hiện nhiều nhất (không phân biệt hoa thường). In từ đó (viết thường) và số lần.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Từ và số lần xuất hiện.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>aaa bbb ccc AA bb aa ccc aa cc dd ff aa AA</td><td>aa 5</td></tr>
      </table>
    `,
    testCases: [
      { input: 'aaa bbb ccc AA bb aa ccc aa cc dd ff aa AA', expectedOutput: 'aa 5' },
      { input: 'one One ONE two two', expectedOutput: 'one 3', hidden: true },
      { input: 'a a b b c', expectedOutput: 'a 2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_19',
    title: '19. Đếm tần suất từ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đếm tần suất từ</h2>
      <p>Đếm số lần xuất hiện của mỗi từ (không phân biệt hoa thường). In từ (thường) và số lần, theo thứ tự xuất hiện đầu tiên.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Mỗi dòng: từ và số lần xuất hiện.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>aaa bbb ccc AA bb aa ccc aa</td><td>aaa 1\nbbb 1\nccc 2\naa 3</td></tr>
      </table>
    `,
    testCases: [
      { input: 'aaa bbb ccc AA bb aa ccc aa', expectedOutput: 'aaa 1\nbbb 1\nccc 2\naa 3' },
      { input: 'one one one', expectedOutput: 'one 3', hidden: true },
      { input: 'a b a c b a', expectedOutput: 'a 3\nb 2\nc 1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_20',
    title: '20. Loại bỏ từ khỏi chuỗi',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Loại bỏ từ</h2>
      <p>Loại bỏ tất cả các từ bằng từ cho trước khỏi chuỗi.</p>
      <h3>Input</h3>
      <p>Dòng 1: chuỗi ban đầu. Dòng 2: từ cần loại bỏ.</p>
      <h3>Output</h3>
      <p>Chuỗi đã loại bỏ từ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>mon thcs2 la mon 2tc<br>mon</td><td>thcs2 la 2tc</td></tr>
      </table>
    `,
    testCases: [
      { input: 'mon thcs2 la mon 2tc\nmon', expectedOutput: 'thcs2 la 2tc' },
      { input: 'hello world hello\nhello', expectedOutput: 'world ', hidden: true },
      { input: 'abc def abc\nabc', expectedOutput: 'def ', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b18_21',
    title: '21. Codeforces - Chuỗi đơn giản',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuỗi đơn giản</h2>
      <p>Chuyển chuỗi: xóa tất cả nguyên âm (a, o, y, e, u, i), thêm '.' trước mỗi phụ âm còn lại, viết thường.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi (chỉ chứa chữ cái Latin).</p>
      <h3>Output</h3>
      <p>Chuỗi đã xử lý.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Codeforces</td><td>.c.d.f.r.c.s</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Codeforces', expectedOutput: '.c.d.f.r.c.s' },
      { input: 'aBAcAba', expectedOutput: '.b.c.b', hidden: true },
      { input: 'abc', expectedOutput: '.b.c', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
