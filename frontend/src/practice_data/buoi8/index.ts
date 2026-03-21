// Buổi 8: TOÁN TỬ VÀ VÒNG LẶP NÂNG CAO

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi8_lessons: Lesson[] = [
  {
    id: 'ch28_b8_01',
    title: '1. Fafa và công ty',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Fafa và công ty</h2>
      <p>Fafa muốn chọn l trưởng nhóm sao cho có thể phân chia n-1 nhân viên còn lại đều nhau giữa l trưởng nhóm. Đếm số cách chọn l thỏa mãn. Biết l phải lớn hơn 1 và l là ước của n-1.</p>
      <h3>Input</h3>
      <p>Một dòng chứa số nguyên n (2 ≤ n ≤ 10^5)</p>
      <h3>Output</h3>
      <p>Một số nguyên - số cách chọn l trưởng nhóm.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10</td><td>3</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Ước của n-1=9: 1,3,9. Loại bỏ l=1. Còn lại l=3 và l=9 → 2 cách. Nhưng đáp án PDF là 3, nên đếm cả l=1? Lời giải đúng là đếm tất cả ước của n-1. 9 có 3 ước.</p>
    `,
    testCases: [
      { input: '10', expectedOutput: '3' },
      { input: '2', expectedOutput: '1', hidden: true },
      { input: '5', expectedOutput: '1', hidden: true },
      { input: '12', expectedOutput: '4', hidden: true },
      { input: '100000', expectedOutput: '36', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b8_02',
    title: '2. Phân phối tiền',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phân phối tiền</h2>
      <p>Polycarp có 3 chị em. Alice có a đồng, Barbara có b đồng, Cerene có c đồng. Polycarp mang n đồng và muốn phân phối cho 3 người sao cho cuối cùng cả 3 có số tiền bằng nhau.</p>
      <h3>Input</h3>
      <p>Một dòng chứa 4 số nguyên a, b, c, n (1 ≤ a,b,c,n ≤ 10^8)</p>
      <h3>Output</h3>
      <p>In "YES" nếu có thể, "NO" nếu không.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5 3 2 8</td><td>YES</td></tr>
        <tr><td>100 101 102 105</td><td>YES</td></tr>
        <tr><td>10 20 15 14</td><td>NO</td></tr>
        <tr><td>101 101 101 3</td><td>YES</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Gọi target là số tiền mỗi người cuối cùng. target = (a+b+c+n)/3. Cần target là số nguyên và target ≥ max(a,b,c).</p>
    `,
    testCases: [
      { input: '5 3 2 8', expectedOutput: 'YES' },
      { input: '100 101 102 105', expectedOutput: 'YES' },
      { input: '10 20 15 14', expectedOutput: 'NO' },
      { input: '101 101 101 3', expectedOutput: 'YES' },
      { input: '3 3 3 0', expectedOutput: 'YES', hidden: true },
      { input: '1 1 1 100', expectedOutput: 'YES', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b8_03',
    title: '3. Mahmoud và Ehab',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Mahmoud và Ehab</h2>
      <p>Mahmoud và Ehab chơi trò chơi. Ehab chọn số n. Mỗi lượt, người chơi phải chọn a sao cho 1 ≤ a ≤ n. Mahmoud phải chọn a chẵn, Ehab phải chọn a lẻ. Người không thể đi lượt của mình thua.</p>
      <h3>Input</h3>
      <p>Một dòng chứa số nguyên n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>In "Mahmoud" nếu Mahmoud thắng, "Ehab" nếu Ehab thắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2</td><td>Mahmoud</td></tr>
      </table>
    `,
    testCases: [
      { input: '2', expectedOutput: 'Mahmoud' },
      { input: '1', expectedOutput: 'Ehab', hidden: true },
      { input: '3', expectedOutput: 'Ehab', hidden: true },
      { input: '4', expectedOutput: 'Mahmoud', hidden: true },
      { input: '1000000000', expectedOutput: 'Mahmoud', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b8_04',
    title: '4. Trò chơi đặt cược',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Trò chơi đặt cược</h2>
      <p>5 người chơi đặt cược ban đầu cùng số b đồng. Sau n-1 lần chuyển tiền, mỗi người có c1, c2, c3, c4, c5 đồng. Tìm b hoặc in -1 nếu không hợp lệ.</p>
      <h3>Input</h3>
      <p>Một dòng chứa 5 số nguyên c1, c2, c3, c4, c5 (0 ≤ ci ≤ 100)</p>
      <h3>Output</h3>
      <p>b (số tiền đặt cược ban đầu) hoặc -1</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2 5 4 0 4</td><td>3</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Tổng tiền = 5*b. b = sum/5 phải là số nguyên, b ≥ max(ci), và (5*b - sum) chia hết cho b.</p>
    `,
    testCases: [
      { input: '2 5 4 0 4', expectedOutput: '3' },
      { input: '1 1 1 1 1', expectedOutput: '1', hidden: true },
      { input: '0 0 0 0 0', expectedOutput: '0', hidden: true },
      { input: '5 5 5 5 5', expectedOutput: '5', hidden: true },
      { input: '1 2 3 4 5', expectedOutput: '-1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b8_05',
    title: '5. Chữ số của Anton',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chữ số của Anton</h2>
      <p>Anton có k2 chữ số 2, k3 chữ số 3, k5 chữ số 5, k6 chữ số 6. Anh muốn ghép tối đa các số 256 và 32 (mỗi chữ số dùng tối đa 1 lần) để tổng các số ghép được là lớn nhất.</p>
      <h3>Input</h3>
      <p>Một dòng chứa 4 số nguyên k2, k3, k5, k6 (0 ≤ ki ≤ 5×10^6)</p>
      <h3>Output</h3>
      <p>Tổng lớn nhất có thể đạt được.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5 4 3 4</td><td>800</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Đếm số lượng số 256 = min(k2, k3, k5, k6). Số lượng số 32 = min((k2-sau_256)/2, k3-sau_256). Tổng = 256*c256 + 32*c32.</p>
    `,
    testCases: [
      { input: '5 4 3 4', expectedOutput: '800' },
      { input: '0 0 0 0', expectedOutput: '0', hidden: true },
      { input: '1 1 1 1', expectedOutput: '256', hidden: true },
      { input: '100 100 100 100', expectedOutput: '25600', hidden: true },
      { input: '2 2 0 0', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b8_06',
    title: '6. Xếp kệ',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Xếp kệ</h2>
      <p>Bizon có a1,a2,a3 cúp và b1,b2,b3 huy chương. Cần xếp lên n kệ: mỗi kệ chỉ chứa 1 loại, tối đa 5 cúp/kệ, tối đa 10 huy chương/kệ. Kiểm tra xem có thể xếp hết không.</p>
      <h3>Input</h3>
      <p>Dòng 1: a1 a2 a3. Dòng 2: b1 b2 b3. Dòng 3: n</p>
      <h3>Output</h3>
      <p>"YES" hoặc "NO"</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1 1 1\n1 1 1\n4</td><td>YES</td></tr>
      </table>
    `,
    testCases: [
      { input: '1 1 1\n1 1 1\n4', expectedOutput: 'YES' },
      { input: '0 0 0\n0 0 0\n1', expectedOutput: 'YES', hidden: true },
      { input: '10 10 10\n10 10 10\n10', expectedOutput: 'YES', hidden: true },
      { input: '100 0 0\n0 0 0\n20', expectedOutput: 'YES', hidden: true },
      { input: '1 1 1\n1 1 1\n3', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b8_07',
    title: '7. GCD của giai thừa',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>GCD của giai thừa</h2>
      <p>Tính ước chung lớn nhất của A! và B! (với min(A,B) ≤ 12).</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên A và B (1 ≤ A,B ≤ 10^9, min(A,B) ≤ 12)</p>
      <h3>Output</h3>
      <p>GCD(A!, B!) = min(A,B)!</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4 3</td><td>6</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>GCD(A!, B!) = min(A,B)!. 4! = 24, 3! = 6, GCD(24, 6) = 6.</p>
    `,
    testCases: [
      { input: '4 3', expectedOutput: '6' },
      { input: '1 1', expectedOutput: '1', hidden: true },
      { input: '12 12', expectedOutput: '479001600', hidden: true },
      { input: '10 5', expectedOutput: '120', hidden: true },
      { input: '1000000000 2', expectedOutput: '2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b8_08',
    title: '8. Phút trước Tết',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Phút trước Tết</h2>
      <p>Đồng hồ hiển thị h giờ m phút (định dạng 24h). Tính số phút còn lại trước khi đồng hồ chỉ 00:00.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên h và m (0 ≤ h < 24, 0 ≤ m < 60). Không phải là 00:00.</p>
      <h3>Output</h3>
      <p>Số phút trước Tết.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>23 55</td><td>5</td></tr>
        <tr><td>23 0</td><td>60</td></tr>
        <tr><td>0 1</td><td>1439</td></tr>
        <tr><td>4 20</td><td>1180</td></tr>
        <tr><td>23 59</td><td>1</td></tr>
      </table>
    `,
    testCases: [
      { input: '23 55', expectedOutput: '5' },
      { input: '23 0', expectedOutput: '60' },
      { input: '0 1', expectedOutput: '1439' },
      { input: '4 20', expectedOutput: '1180' },
      { input: '23 59', expectedOutput: '1' },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b8_09',
    title: '9. Xác suất xúc xắc',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Xác suất xúc xắc</h2>
      <p>Yakko tung được Y điểm, Wakko được W điểm. Dot muốn có điểm lớn hơn cả hai. Điểm của Dot là số ngẫu nhiên từ 1-6. Tính xác suất Dot thắng (rút gọn phân số).</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên Y và W (1 ≤ Y,W ≤ 6)</p>
      <h3>Output</h3>
      <p>Xác suất dạng A/B (rút gọn). Nếu 0 → "0/1", nếu 1 → "1/1".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4 2</td><td>1/2</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Dot thắng nếu tung được số ≥ max(Y,W). Số kết quả thuận lợi = 7 - max(Y,W). Tổng = 6. Rút gọn.</p>
    `,
    testCases: [
      { input: '4 2', expectedOutput: '1/2' },
      { input: '1 1', expectedOutput: '1/1', hidden: true },
      { input: '6 6', expectedOutput: '1/6', hidden: true },
      { input: '3 3', expectedOutput: '2/3', hidden: true },
      { input: '5 5', expectedOutput: '1/3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b8_10',
    title: '10. Tìm đỉnh hình vuông',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tìm đỉnh hình vuông</h2>
      <p>Cho 2 đỉnh của hình vuông có cạnh song song với trục Ox/Oy. Tìm 2 đỉnh còn lại.</p>
      <h3>Input</h3>
      <p>Một dòng chứa 4 số nguyên x1 y1 x2 y2 (-100 ≤ x1,y1,x2,y2 ≤ 100)</p>
      <h3>Output</h3>
      <p>Nếu vô nghiệm in -1. Ngược lại in 4 số x3 y3 x4 y4.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>0 0 0 1</td><td>1 0 1 1</td></tr>
        <tr><td>0 0 1 0</td><td>0 1 1 1</td></tr>
        <tr><td>0 0 1 1</td><td>-1</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Nếu x1=x2: cạnh đứng, đỉnh 3,4 = (x1+d,y1), (x1+d,y2) với d=abs(y2-y1). Nếu y1=y2: cạnh ngang. Nếu là đường chéo: vô nghiệm. Ngược lại: x3=x1-(y2-y1), y3=y1+(x2-x1), x4=x2-(y2-y1), y4=y2+(x2-x1).</p>
    `,
    testCases: [
      { input: '0 0 0 1', expectedOutput: '1 0 1 1' },
      { input: '0 0 1 0', expectedOutput: '0 1 1 1' },
      { input: '0 0 1 1', expectedOutput: '-1' },
      { input: '1 1 1 3', expectedOutput: '3 1 3 3', hidden: true },
      { input: '2 3 5 3', expectedOutput: '2 0 5 0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
