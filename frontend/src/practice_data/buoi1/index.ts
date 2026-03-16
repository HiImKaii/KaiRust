// Buổi 1: KIỂU DỮ LIỆU, TOÁN TỬ, IF ELSE

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code ở đây
}
`;

export const buoi1_lessons: Lesson[] = [
  {
    id: 'ch28_b1_01',
    title: '1. Phần nguyên, phần dư',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Phần nguyên, phần dư</h2>
      <p>Viết chương trình nhập vào hai số nguyên a và b (b ≠ 0), tính và in ra phần nguyên và phần dư khi chia a cho b, cách nhau một khoảng trắng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a và b, cách nhau bởi khoảng trắng (b ≠ 0)</p>
      <h3>Output</h3>
      <p>Một dòng chứa phần nguyên và phần dư, cách nhau một khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>100 5</td><td>20 0</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>100 ÷ 5 = 20 dư 0 → In ra: 20 0</p>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: '100 5', expectedOutput: '20 0' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_02',
    title: '2. Tính giá trị biểu thức',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tính giá trị biểu thức</h2>
      <p>Viết chương trình nhập vào một số nguyên x, tính và in ra giá trị của biểu thức:</p>
      <p style="font-size:1.2rem; font-weight:bold; text-align:center; margin:16px 0;">A(x) = x³ + 3x² + x + 1</p>
      <h3>Input</h3>
      <p>Một dòng chứa số nguyên x (0 ≤ x ≤ 10⁵)</p>
      <h3>Output</h3>
      <p>Một dòng chứa kết quả của biểu thức A(x)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2</td><td>23</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>A(2) = 2³ + 3×2² + 2 + 1 = 8 + 12 + 2 + 1 = 23</p>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: '2', expectedOutput: '23' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_03',
    title: '3. Tính tổng, hiệu, tích, thương',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tính tổng, hiệu, tích, thương</h2>
      <p>Viết chương trình nhập vào hai số nguyên a và b (b ≠ 0), tính và in ra lần lượt tổng, hiệu, tích, thương của a và b. Thương lấy 2 chữ số sau dấu phẩy.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên a và b, cách nhau bởi khoảng trắng (b ≠ 0)</p>
      <h3>Output</h3>
      <p>Một dòng chứa 4 giá trị: tổng, hiệu, tích, thương (lấy 2 decimal), cách nhau bởi khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10 2</td><td>12 8 20 5.00</td></tr>
      </table>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: '10 2', expectedOutput: '12 8 20 5.00' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_04',
    title: '4. Tính chu vi, diện tích hình tròn',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tính chu vi, diện tích hình tròn</h2>
      <p>Viết chương trình nhập vào bán kính r của hình tròn, tính và in ra chu vi và diện tích của hình tròn đó. Lấy π = 3.14 và lấy 2 chữ số sau dấu phẩy.</p>
      <h3>Input</h3>
      <p>Một dòng chứa số nguyên r (1 ≤ r ≤ 10⁹)</p>
      <h3>Output</h3>
      <p>Một dòng chứa chu vi và diện tích (lấy 2 decimal), cách nhau bởi khoảng trắng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10</td><td>62.80 314.00</td></tr>
      </table>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: '10', expectedOutput: '62.80 314.00' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_05',
    title: '5. Kiểm tra số chia hết cho 3 và 5',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra số chia hết cho 3 và 5</h2>
      <p>Viết chương trình nhập vào một số nguyên n, kiểm tra xem n có chia hết cho cả 3 và 5 hay không. In ra 1 nếu đúng, 0 nếu sai.</p>
      <h3>Input</h3>
      <p>Một dòng chứa số nguyên n (-10¹⁸ ≤ n ≤ 10¹⁸)</p>
      <h3>Output</h3>
      <p>In ra 1 nếu n chia hết cho cả 3 và 5, ngược lại in 0</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>30</td><td>1</td></tr>
        <tr><td>25</td><td>0</td></tr>
      </table>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: '30', expectedOutput: '1' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_06',
    title: '6. Kiểm tra năm nhuận',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra năm nhuận</h2>
      <p>Viết chương trình nhập vào một số nguyên n là năm, kiểm tra xem năm đó có phải là năm nhuận hay không.</p>
      <ul>
        <li>Nếu n ≤ 0: in ra "INVALID"</li>
        <li>Nếu là năm nhuận: in ra "YES"</li>
        <li>Nếu không phải năm nhuận: in ra "NO"</li>
      </ul>
      <p><em>Năm nhuận là năm chia hết cho 400, hoặc chia hết cho 4 nhưng không chia hết cho 100.</em></p>
      <h3>Input</h3>
      <p>Một dòng chứa số nguyên n (năm)</p>
      <h3>Output</h3>
      <p>"INVALID", "YES", hoặc "NO"</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2020</td><td>YES</td></tr>
        <tr><td>2021</td><td>NO</td></tr>
      </table>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: '2020', expectedOutput: 'YES' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_07',
    title: '7. Số ngày trong tháng',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Số ngày trong tháng</h2>
      <p>Viết chương trình nhập vào tháng t và năm n, tính và in ra số ngày của tháng đó trong năm đó.</p>
      <ul>
        <li>Nếu tháng hoặc năm không hợp lệ: in ra "INVALID"</li>
        <li>Ngược lại: in ra số ngày</li>
      </ul>
      <h3>Input</h3>
      <p>Một dòng chứa tháng t (1-12) và năm n, cách nhau bởi khoảng trắng</p>
      <h3>Output</h3>
      <p>"INVALID" nếu không hợp lệ, ngược lại in số ngày</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 2021</td><td>28</td></tr>
        <tr><td>2 2020</td><td>29</td></tr>
      </table>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: '2 2021', expectedOutput: '28' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_08',
    title: '8. Kiểm tra chữ in thường',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra chữ in thường</h2>
      <p>Viết chương trình nhập vào một ký tự, kiểm tra xem ký tự đó có phải là chữ cái in thường (a-z) hay không.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một ký tự</p>
      <h3>Output</h3>
      <p>In ra "YES" nếu là chữ in thường, "NO" nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>a</td><td>YES</td></tr>
        <tr><td>A</td><td>NO</td></tr>
      </table>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: 'a', expectedOutput: 'YES' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_09',
    title: '9. Kiểm tra chữ in hoa',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra chữ in hoa</h2>
      <p>Viết chương trình nhập vào một ký tự, kiểm tra xem ký tự đó có phải là chữ cái in hoa (A-Z) hay không.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một ký tự</p>
      <h3>Output</h3>
      <p>In ra "YES" nếu là chữ in hoa, "NO" nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>A</td><td>YES</td></tr>
        <tr><td>a</td><td>NO</td></tr>
      </table>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: 'A', expectedOutput: 'YES' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_10',
    title: '10. Kiểm tra chữ số',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Kiểm tra chữ số</h2>
      <p>Viết chương trình nhập vào một ký tự, kiểm tra xem ký tự đó có phải là chữ số (0-9) hay không.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một ký tự</p>
      <h3>Output</h3>
      <p>In ra "YES" nếu là chữ số, "NO" nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>YES</td></tr>
        <tr><td>a</td><td>NO</td></tr>
      </table>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: '5', expectedOutput: 'YES' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_11',
    title: '11. Chuyển hoa thành thường',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Chuyển chữ hoa thành chữ thường</h2>
      <p>Viết chương trình nhập vào một ký tự. Nếu ký tự đó là chữ in hoa (A-Z), chuyển thành chữ in thường tương ứng. Nếu không phải chữ in hoa, giữ nguyên.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một ký tự</p>
      <h3>Output</h3>
      <p>Chữ thường tương ứng nếu là chữ hoa, giữ nguyên nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>A</td><td>a</td></tr>
        <tr><td>%</td><td>%</td></tr>
      </table>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: 'A', expectedOutput: 'a' }],
    isExercise: true,
  },
  {
    id: 'ch28_b1_12',
    title: '12. Tam giác hợp lệ',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Tam giác hợp lệ</h2>
      <p>Viết chương trình nhập vào 3 số a, b, c là độ dài 3 cạnh của một tam giác. Kiểm tra xem 3 cạnh đó có thể tạo thành một tam giác hợp lệ hay không.</p>
      <p><em>Điều kiện để 3 cạnh tạo thành tam giác: tổng 2 cạnh bất kỳ lớn hơn cạnh còn lại, và tất cả các cạnh đều dương.</em></p>
      <h3>Input</h3>
      <p>Một dòng chứa 3 số a, b, c, cách nhau bởi khoảng trắng</p>
      <h3>Output</h3>
      <p>In ra "YES" nếu hợp lệ, "NO" nếu không</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 4 5</td><td>YES</td></tr>
        <tr><td>1 1 5</td><td>NO</td></tr>
      </table>
    `,
    defaultCode: DEFAULT_CODE,
    testCases: [{ input: '3 4 5', expectedOutput: 'YES' }],
    isExercise: true,
  },
];
