// Buổi 17: XÂY DỰNG CÁC HÀM XỬ LÝ CHUỖI CƠ BẢN

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi17_lessons: Lesson[] = [
  {
    id: 'ch28_b17_01',
    title: '1. Đếm ký tự in thường',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Đếm ký tự in thường</h2>
      <p>Đếm số ký tự in thường trong chuỗi (a-z).</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi (có thể chứa dấu cách).</p>
      <h3>Output</h3>
      <p>Số ký tự in thường.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Ngon NGU LAP Trinh</td><td>7</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Ngon NGU LAP Trinh', expectedOutput: '7' },
      { input: 'HELLO', expectedOutput: '0', hidden: true },
      { input: 'hello world', expectedOutput: '10', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_02',
    title: '2. Chuyển chuỗi thành in thường',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Chuyển thành in thường</h2>
      <p>Chuyển toàn bộ chuỗi thành chữ thường.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Chuỗi in thường.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>LAP trINH c</td><td>lap trinh c</td></tr>
      </table>
    `,
    testCases: [
      { input: 'LAP trINH c', expectedOutput: 'lap trinh c' },
      { input: 'HELLO', expectedOutput: 'hello', hidden: true },
      { input: 'PyThOn', expectedOutput: 'python', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_03',
    title: '3. Chuyển chuỗi thành in hoa',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Chuyển thành in hoa</h2>
      <p>Chuyển toàn bộ chuỗi thành chữ hoa.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Chuỗi in hoa.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Python java c c++</td><td>PYTHON JAVA C C++</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Python java c c++', expectedOutput: 'PYTHON JAVA C C++' },
      { input: 'hello', expectedOutput: 'HELLO', hidden: true },
      { input: 'mixed Case', expectedOutput: 'MIXED CASE', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_04',
    title: '4. Chuyển một ký tự hoa thành thường',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Chuyển hoa thành thường</h2>
      <p>Nếu ký tự là chữ hoa thì chuyển thành thường, ngược lại giữ nguyên.</p>
      <h3>Input</h3>
      <p>Một ký tự.</p>
      <h3>Output</h3>
      <p>Ký tự đã chuyển đổi.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Z</td><td>z</td></tr>
        <tr><td>a</td><td>a</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Z', expectedOutput: 'z' },
      { input: 'a', expectedOutput: 'a', hidden: true },
      { input: 'M', expectedOutput: 'm', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_05',
    title: '5. Chuyển một ký tự thường thành hoa',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Chuyển thường thành hoa</h2>
      <p>Nếu ký tự là chữ thường thì chuyển thành hoa, ngược lại giữ nguyên.</p>
      <h3>Input</h3>
      <p>Một ký tự.</p>
      <h3>Output</h3>
      <p>Ký tự đã chuyển đổi.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>a</td><td>A</td></tr>
        <tr><td>Z</td><td>Z</td></tr>
      </table>
    `,
    testCases: [
      { input: 'a', expectedOutput: 'A' },
      { input: 'Z', expectedOutput: 'Z', hidden: true },
      { input: 'm', expectedOutput: 'M', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_06',
    title: '6. Kiểm tra chữ cái',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra chữ cái</h2>
      <p>Kiểm tra ký tự có phải là chữ cái (a-z hoặc A-Z) hay không. In 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một ký tự.</p>
      <h3>Output</h3>
      <p>1 hoặc 0.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>A</td><td>1</td></tr>
        <tr><td>5</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: 'A', expectedOutput: '1' },
      { input: '5', expectedOutput: '0', hidden: true },
      { input: 'z', expectedOutput: '1', hidden: true },
      { input: ' ', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_07',
    title: '7. Kiểm tra chữ thường',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra chữ thường</h2>
      <p>Kiểm tra ký tự có phải là chữ thường (a-z) hay không. In 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một ký tự.</p>
      <h3>Output</h3>
      <p>1 hoặc 0.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>a</td><td>1</td></tr>
        <tr><td>A</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: 'a', expectedOutput: '1' },
      { input: 'A', expectedOutput: '0', hidden: true },
      { input: 'z', expectedOutput: '1', hidden: true },
      { input: '5', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_08',
    title: '8. Kiểm tra chữ hoa',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra chữ hoa</h2>
      <p>Kiểm tra ký tự có phải là chữ hoa (A-Z) hay không. In 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một ký tự.</p>
      <h3>Output</h3>
      <p>1 hoặc 0.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>A</td><td>1</td></tr>
        <tr><td>a</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: 'A', expectedOutput: '1' },
      { input: 'a', expectedOutput: '0', hidden: true },
      { input: 'Z', expectedOutput: '1', hidden: true },
      { input: '5', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_09',
    title: '9. Kiểm tra chữ số',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra chữ số</h2>
      <p>Kiểm tra ký tự có phải là chữ số (0-9) hay không. In 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một ký tự.</p>
      <h3>Output</h3>
      <p>1 hoặc 0.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>8</td><td>1</td></tr>
        <tr><td>a</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: '8', expectedOutput: '1' },
      { input: 'a', expectedOutput: '0', hidden: true },
      { input: '0', expectedOutput: '1', hidden: true },
      { input: 'Z', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_10',
    title: '10. Kiểm tra chữ cái hoặc chữ số',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra chữ cái hoặc chữ số</h2>
      <p>Kiểm tra ký tự có phải là chữ cái hoặc chữ số hay không. In 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một ký tự.</p>
      <h3>Output</h3>
      <p>1 hoặc 0.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>L</td><td>1</td></tr>
        <tr><td>#</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: 'L', expectedOutput: '1' },
      { input: '#', expectedOutput: '0', hidden: true },
      { input: '5', expectedOutput: '1', hidden: true },
      { input: ' ', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_11',
    title: '11. Độ dài chuỗi',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Độ dài chuỗi</h2>
      <p>Tính độ dài chuỗi (không dùng hàm có sẵn để tính độ dài).</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi (có thể chứa dấu cách).</p>
      <h3>Output</h3>
      <p>Độ dài chuỗi.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Ngon ngu lap trinh</td><td>18</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Ngon ngu lap trinh', expectedOutput: '18' },
      { input: 'hello', expectedOutput: '5', hidden: true },
      { input: 'a b c', expectedOutput: '5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_12',
    title: '12. Mezo và Zoma',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Mezo và Zoma</h2>
      <p>Zoma bắt đầu ở x=0. Mỗi lệnh L giảm x 1, R tăng x 1. Mỗi lệnh có thể được thực hiện hoặc bị bỏ qua. Đếm số vị trí khác nhau Zoma có thể kết thúc.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: chuỗi n ký tự L hoặc R.</p>
      <h3>Output</h3>
      <p>Số vị trí khác nhau có thể.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\nLRLR</td><td>5</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Với LRLR: vị trí có thể là {-2,-1,0,1,2} → 5 vị trí.</p>
    `,
    testCases: [
      { input: '4\nLRLR', expectedOutput: '5' },
      { input: '1\nL', expectedOutput: '2', hidden: true },
      { input: '3\nRRR', expectedOutput: '4', hidden: true },
      { input: '2\nLL', expectedOutput: '3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_13',
    title: '13. Giải mã Polycarp',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Giải mã Polycarp</h2>
      <p>Mã hóa: ký tự i được lặp i lần. Cho chuỗi đã mã hóa t, giải mã để tìm chuỗi gốc s.</p>
      <h3>Input</h3>
      <p>Dòng 1: n (độ dài chuỗi đã mã hóa). Dòng 2: chuỗi t.</p>
      <h3>Output</h3>
      <p>Chuỗi gốc.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6\nbaabbb</td><td>Bab</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>baabbb = b(aa)(bbb) = b a a bbb → s = Bab</p>
    `,
    testCases: [
      { input: '6\nbaabbb', expectedOutput: 'Bab' },
      { input: '10\naaabaaaab', expectedOutput: 'abab', hidden: true },
      { input: '3\naaa', expectedOutput: 'a', hidden: true },
      { input: '15\naaaaaabbbbbbb', expectedOutput: 'ab', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_14',
    title: '14. Viết tắt từ dài',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Viết tắt từ dài</h2>
      <p>Từ có độ dài > 10: viết tắt thành: ký tự đầu + số ký tự giữa + ký tự cuối. Từ ≤ 10 giữ nguyên.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo: mỗi dòng một từ.</p>
      <h3>Output</h3>
      <p>Mỗi dòng một kết quả.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4\nword\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis</td><td>word\nl10n\ni18n\np43s</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\nword\nlocalization\ninternationalization\npneumonoultramicroscopicsilicovolcanoconiosis', expectedOutput: 'word\nl10n\ni18n\np43s' },
      { input: '2\nab\nabcde', expectedOutput: 'ab\nabcde', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_15',
    title: '15. Đội thắng trận bóng đá',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đội thắng</h2>
      <p>Cho n dòng ghi tên các đội ghi bàn. Tìm tên đội có số bàn thắng nhiều nhất.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo: tên đội.</p>
      <h3>Output</h3>
      <p>Tên đội thắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5\nA\nABA\nA\nABA\nA</td><td>A</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\nA\nABA\nA\nABA\nA', expectedOutput: 'A' },
      { input: '3\nTeamA\nTeamB\nTeamA', expectedOutput: 'TeamA', hidden: true },
      { input: '4\nX\nY\nY\nY', expectedOutput: 'Y', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_16',
    title: '16. Mã hóa Bit ++',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Mã hóa Bit++</h2>
      <p>Đếm số lệnh ++ (tăng X) và -- (giảm X). Mỗi dòng là một lệnh. Kết quả = số ++ trừ số --. X ban đầu = 0.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. n dòng tiếp theo: lệnh (X++, ++X, X--, --X).</p>
      <h3>Output</h3>
      <p>Giá trị cuối cùng của X.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2\nX++\n--X</td><td>0</td></tr>
      </table>
    `,
    testCases: [
      { input: '2\nX++\n--X', expectedOutput: '0' },
      { input: '3\n++X\n++X\n--X', expectedOutput: '1', hidden: true },
      { input: '1\n--X', expectedOutput: '-1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_17',
    title: '17. So sánh 2 chuỗi',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>So sánh 2 chuỗi</h2>
      <p>So sánh hai chuỗi không phân biệt hoa thường. In -1 nếu s1 < s2, 1 nếu s1 > s2, 0 nếu bằng nhau.</p>
      <h3>Input</h3>
      <p>Dòng 1: chuỗi 1. Dòng 2: chuỗi 2.</p>
      <h3>Output</h3>
      <p>-1, 0 hoặc 1.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>abcdefg\nAbCdEfF</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: 'abcdefg\nAbCdEfF', expectedOutput: '1' },
      { input: 'hello\nHELLO', expectedOutput: '0', hidden: true },
      { input: 'abc\nabd', expectedOutput: '-1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b17_18',
    title: '18. Tình huống nguy hiểm',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tình huống nguy hiểm</h2>
      <p>Cho chuỗi 0 và 1 mô tả vị trí cầu thủ 2 đội. Nếu có ít nhất 7 cầu thủ cùng đội đứng liền kề nhau thì "YES", ngược lại "NO".</p>
      <h3>Input</h3>
      <p>Dòng 1: n (1 ≤ n ≤ 100). Dòng 2: chuỗi n ký tự 0 hoặc 1.</p>
      <h3>Output</h3>
      <p>YES hoặc NO.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>9\n001001111</td><td>YES</td></tr>
        <tr><td>5\n01110</td><td>NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '9\n001001111', expectedOutput: 'YES' },
      { input: '5\n01110', expectedOutput: 'NO', hidden: true },
      { input: '10\n0000000000', expectedOutput: 'YES', hidden: true },
      { input: '6\n101010', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
