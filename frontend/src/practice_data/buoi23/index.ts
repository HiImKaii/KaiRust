// Buổi 23: CON TRỎ (POINTERS)

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi23_lessons: Lesson[] = [
  {
    id: 'ch28_b23_01',
    title: '1. Con trỏ - Gán giá trị',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Con trỏ - Gán giá trị</h2>
      <p>Nhập hai số nguyên a và b. Gán địa chỉ của chúng cho hai con trỏ, in giá trị thông qua con trỏ.</p>
      <h3>Input</h3>
      <p>Hai số nguyên a và b trên một dòng.</p>
      <h3>Output</h3>
      <p>Giá trị của a và b (cách nhau khoảng trắng).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5 10</td><td>5 10</td></tr>
      </table>
    `,
    testCases: [
      { input: '5 10', expectedOutput: '5 10' },
      { input: '-3 7', expectedOutput: '-3 7', hidden: true },
      { input: '0 0', expectedOutput: '0 0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b23_02',
    title: '2. Hoán đổi bằng con trỏ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hoán đổi bằng con trỏ</h2>
      <p>Nhập hai số nguyên a và b. Hoán đổi giá trị của chúng bằng con trỏ (hoặc tham chiếu) và in kết quả.</p>
      <h3>Input</h3>
      <p>Hai số nguyên a và b.</p>
      <h3>Output</h3>
      <p>Giá trị sau khi hoán đổi: a b (cách nhau khoảng trắng).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5 10</td><td>10 5</td></tr>
      </table>
    `,
    testCases: [
      { input: '5 10', expectedOutput: '10 5' },
      { input: '1 2', expectedOutput: '2 1', hidden: true },
      { input: '-5 3', expectedOutput: '3 -5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b23_03',
    title: '3. Con trỏ - Chọn phát biểu sai',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Con trỏ - Chọn phát biểu sai</h2>
      <p>Cho đoạn code C sau:<br>
      <code>int *pint; float a; char c; double *pd;</code><br>
      Chọn phát biểu SAI về kiểu dữ liệu:</p>
      <ul>
        <li>a. a = *pint; (gán giá trị int cho float)</li>
        <li>b. c = *pd; (gán giá trị double cho char)</li>
        <li>c. *pint = *pd; (gán giá trị double cho int*)</li>
        <li>d. pd = a; (gán float cho double*)</li>
      </ul>
      <p>Nhập vào một trong 4 lựa chọn (a, b, c hoặc d). In ra nội dung phát biểu sai đó.</p>
      <h3>Input</h3>
      <p>Một ký tự: a, b, c hoặc d.</p>
      <h3>Output</h3>
      <p>In phát biểu tương ứng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>a</td><td>a = *pint;</td></tr>
      </table>
    `,
    testCases: [
      { input: 'a', expectedOutput: 'a = *pint;' },
      { input: 'd', expectedOutput: 'pd = a;', hidden: true },
      { input: 'c', expectedOutput: '*pint = *pd;', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b23_04',
    title: '4. Tổng mảng bằng con trỏ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng mảng bằng con trỏ</h2>
      <p>Nhập một mảng n số nguyên. Tính tổng các phần tử sử dụng con trỏ (duyệt mảng qua con trỏ).</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Tổng các phần tử.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5<br>1 2 3 4 5</td><td>15</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n1 2 3 4 5', expectedOutput: '15' },
      { input: '3\n10 20 30', expectedOutput: '60', hidden: true },
      { input: '4\n-1 -2 -3 -4', expectedOutput: '-10', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b23_05',
    title: '5. Độ dài chuỗi bằng con trỏ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Độ dài chuỗi bằng con trỏ</h2>
      <p>Tính độ dài chuỗi (không dùng hàm có sẵn) sử dụng con trỏ để duyệt.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi.</p>
      <h3>Output</h3>
      <p>Độ dài chuỗi.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>hello</td><td>5</td></tr>
      </table>
    `,
    testCases: [
      { input: 'hello', expectedOutput: '5' },
      { input: 'Lap trinh C', expectedOutput: '11', hidden: true },
      { input: 'a', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b23_06',
    title: '6. Tổng số nguyên tố trong mảng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng số nguyên tố</h2>
      <p>Nhập mảng n số nguyên. Tính tổng các phần tử là số nguyên tố. Duyệt mảng bằng con trỏ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: n số nguyên.</p>
      <h3>Output</h3>
      <p>Tổng các số nguyên tố.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5<br>2 4 6 7 10</td><td>9</td></tr>
      </table>
    `,
    testCases: [
      { input: '5\n2 4 6 7 10', expectedOutput: '9' },
      { input: '4\n1 2 3 4', expectedOutput: '5', hidden: true },
      { input: '3\n4 6 8', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b23_07',
    title: '7. Tổng nguyên tố trong ma trận',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tổng nguyên tố ma trận</h2>
      <p>Nhập ma trận n×m. Tính tổng các phần tử là số nguyên tố. Duyệt ma trận bằng con trỏ.</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. n dòng tiếp theo: m số nguyên.</p>
      <h3>Output</h3>
      <p>Tổng các số nguyên tố trong ma trận.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 3<br>1 2 3<br>4 5 6</td><td>10</td></tr>
      </table>
    `,
    testCases: [
      { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '10' },
      { input: '2 2\n2 4\n6 8', expectedOutput: '2', hidden: true },
      { input: '1 3\n3 5 7', expectedOutput: '15', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b23_08',
    title: '8. Nhập/xuất ma trận bằng con trỏ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Nhập/xuất ma trận bằng con trỏ</h2>
      <p>Nhập và xuất ma trận n×m. Sử dụng con trỏ để duyệt và xuất các phần tử (mỗi hàng trên một dòng, cách nhau khoảng trắng).</p>
      <h3>Input</h3>
      <p>Dòng 1: n m. n dòng tiếp theo: m số nguyên.</p>
      <h3>Output</h3>
      <p>Ma trận đã nhập (định dạng như input).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 3<br>1 2 3<br>4 5 6</td><td>1 2 3\n4 5 6</td></tr>
      </table>
    `,
    testCases: [
      { input: '2 3\n1 2 3\n4 5 6', expectedOutput: '1 2 3\n4 5 6' },
      { input: '1 1\n42', expectedOutput: '42', hidden: true },
      { input: '3 2\n1 2\n3 4\n5 6', expectedOutput: '1 2\n3 4\n5 6', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b23_09',
    title: '9. Viết hoa chuỗi bằng con trỏ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Viết hoa bằng con trỏ</h2>
      <p>Viết hàm viết hoa toàn bộ chuỗi và trả về con trỏ tới chuỗi đã viết hoa. Duyệt và biến đổi chuỗi bằng con trỏ.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi (chỉ chứa chữ cái Latin).</p>
      <h3>Output</h3>
      <p>Chuỗi viết hoa.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Hello World</td><td>HELLO WORLD</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Hello World', expectedOutput: 'HELLO WORLD' },
      { input: 'lap trinh c', expectedOutput: 'LAP TRINH C', hidden: true },
      { input: 'python', expectedOutput: 'PYTHON', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b23_10',
    title: '10. Chuyển chuỗi thành in thường bằng con trỏ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuyển in thường bằng con trỏ</h2>
      <p>Viết hàm chuyển chuỗi thành in thường và trả về con trỏ tới chuỗi đã chuyển. Duyệt và biến đổi chuỗi bằng con trỏ.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi (chỉ chứa chữ cái Latin).</p>
      <h3>Output</h3>
      <p>Chuỗi in thường.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>LAP TRINH C</td><td>lap trinh c</td></tr>
      </table>
    `,
    testCases: [
      { input: 'LAP TRINH C', expectedOutput: 'lap trinh c' },
      { input: 'Hello World', expectedOutput: 'hello world', hidden: true },
      { input: 'PYTHON', expectedOutput: 'python', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
