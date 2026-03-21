// Buổi 19: XỬ LÝ CHUỖI - CODEFORCES PROBLEMS

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi19_lessons: Lesson[] = [
  {
    id: 'ch28_b19_01',
    title: '1. Bàn phím',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Bàn phím</h2>
      <p>Một bàn phím QWERTY đơn giản có hai hàng: hàng trên chứa các phím có ký tự thường, hàng dưới chứa các phím có ký tự hoa tương ứng. Cho một ký tự đã nhấn, xác định ký tự ở vị trí đối diện trên bàn phím.</p>
      <h3>Input</h3>
      <p>Dòng 1: phím đã nhấn (ký tự 'a' hoặc 'A').</p>
      <h3>Output</h3>
      <p>Ký tự ở vị trí đối diện trên bàn phím.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>a</td><td>z</td></tr>
        <tr><td>G</td><td>t</td></tr>
      </table>
    `,
    testCases: [
      { input: 'a', expectedOutput: 'z' },
      { input: 'G', expectedOutput: 't', hidden: true },
      { input: 'm', expectedOutput: 'n', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_02',
    title: '2. Đá quý',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Đá quý</h2>
      <p>Đếm số viên đá quý lấy được nếu mỗi viên đá quý có thể được lấy khi hai viên đá cùng màu đặt cạnh nhau. Cho một chuỗi màu, đếm số đá tối thiểu cần loại bỏ để không có hai viên cùng màu liền kề.</p>
      <h3>Input</h3>
      <p>Dòng 1: số nguyên n (độ dài chuỗi). Dòng 2: chuỗi gồm R, G, B.</p>
      <h3>Output</h3>
      <p>Số viên đá cần loại bỏ.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>RRRGGGBBB</td><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: 'RRRGGGBBB', expectedOutput: '3' },
      { input: 'RGB', expectedOutput: '0', hidden: true },
      { input: 'RRRRR', expectedOutput: '4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_03',
    title: '3. Trai hay gái',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Trai hay gái</h2>
      <p>Nếu số ký tự riêng biệt trong tên người dùng là số lẻ → in "IGNORE HIM", ngược lại → in "CHAT WITH HER".</p>
      <h3>Input</h3>
      <p>Một dòng chứa tên người dùng (chỉ chứa chữ cái Latin).</p>
      <h3>Output</h3>
      <p>"IGNORE HIM" hoặc "CHAT WITH HER".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>Wjmzbmr</td><td>CHAT WITH HER</td></tr>
      </table>
    `,
    testCases: [
      { input: 'Wjmzbmr', expectedOutput: 'CHAT WITH HER' },
      { input: 'abc', expectedOutput: 'IGNORE HIM', hidden: true },
      { input: 'aaaa', expectedOutput: 'IGNORE HIM', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_04',
    title: '4. Phòng chat',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Phòng chat</h2>
      <p>Kiểm tra xem từ "hello" có thể được tạo từ chuỗi đã cho bằng cách xóa một số ký tự (giữ thứ tự). In "YES" nếu có, "NO" nếu không.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi s (chỉ chứa chữ cái Latin thường, độ dài 1-100).</p>
      <h3>Output</h3>
      <p>"YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>ahhellllou</td><td>YES</td></tr>
        <tr><td>hlelo</td><td>NO</td></tr>
      </table>
    `,
    testCases: [
      { input: 'ahhellllou', expectedOutput: 'YES' },
      { input: 'hlelo', expectedOutput: 'NO', hidden: true },
      { input: 'hello', expectedOutput: 'YES', hidden: true },
      { input: 'abcllllo', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_05',
    title: '5. Dịch thuật',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Dịch thuật</h2>
      <p>Cho hai từ s và t. Kiểm tra xem t có phải là s viết ngược không. In "YES" hoặc "NO".</p>
      <h3>Input</h3>
      <p>Dòng 1: từ s. Dòng 2: từ t. (Chỉ chứa chữ cái Latin thường)</p>
      <h3>Output</h3>
      <p>"YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>code<br>edoc</td><td>YES</td></tr>
      </table>
    `,
    testCases: [
      { input: 'code\nedoc', expectedOutput: 'YES' },
      { input: 'cat\ndog', expectedOutput: 'NO', hidden: true },
      { input: 'ab\nba', expectedOutput: 'YES', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_06',
    title: '6. Từ',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Từ</h2>
      <p>Cho một từ, biến đổi nó sao cho: nếu có nhiều chữ hoa hơn → viết HOA, ngược lại → viết thường.</p>
      <h3>Input</h3>
      <p>Một dòng chứa từ s (1-100 ký tự, chữ hoa/thường).</p>
      <h3>Output</h3>
      <p>Từ đã biến đổi.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>codE</td><td>code</td></tr>
        <tr><td>HoUse</td><td>house</td></tr>
      </table>
    `,
    testCases: [
      { input: 'codE', expectedOutput: 'code' },
      { input: 'HoUse', expectedOutput: 'house', hidden: true },
      { input: 'VIP', expectedOutput: 'VIP', hidden: true },
      { input: 'maTRIx', expectedOutput: 'matrix', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_07',
    title: '7. Anton và Danik',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Anton và Danik</h2>
      <p>Đếm số lần Anton thắng ('A') và Danik thắng ('D'). In người thắng nhiều hơn.</p>
      <h3>Input</h3>
      <p>Dòng 1: n. Dòng 2: chuỗi s gồm n ký tự 'A' và 'D'.</p>
      <h3>Output</h3>
      <p>"Anton", "Danik" hoặc "Friendship".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6<br>ADAAAA</td><td>Anton</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\nADAAAA', expectedOutput: 'Anton' },
      { input: '3\nDDD', expectedOutput: 'Danik', hidden: true },
      { input: '4\nADAD', expectedOutput: 'Friendship', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_08',
    title: '8. Dr. Banner',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Dr. Banner</h2>
      <p>Sinh ra chuỗi cảm xúc: lớp lẻ → "I hate it", lớp chẵn → "I love it". Xen kẽ giữa ghét và yêu.</p>
      <h3>Input</h3>
      <p>Một số nguyên n (1 ≤ n ≤ 100).</p>
      <h3>Output</h3>
      <p>Chuỗi cảm xúc. Kết thúc bằng dấu chấm.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1</td><td>I hate it.</td></tr>
        <tr><td>2</td><td>I hate that I love it.</td></tr>
        <tr><td>3</td><td>I hate that I love that I hate it.</td></tr>
      </table>
    `,
    testCases: [
      { input: '1', expectedOutput: 'I hate it.' },
      { input: '2', expectedOutput: 'I hate that I love it.', hidden: true },
      { input: '3', expectedOutput: 'I hate that I love that I hate it.', hidden: true },
      { input: '5', expectedOutput: 'I hate that I love that I hate that I love that I hate it.', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_09',
    title: '9. Shapur',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Shapur</h2>
      <p>Cho hai số nhị phân cùng độ dài. Tạo số mới: bit i = 1 khi và chỉ khi hai số khác nhau tại bit i (XOR).</p>
      <h3>Input</h3>
      <p>Dòng 1: số thứ nhất (dãy 0/1). Dòng 2: số thứ hai (dãy 0/1, cùng độ dài).</p>
      <h3>Output</h3>
      <p>Số nhị phân kết quả (giữ các số 0 đầu).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1100<br>0011</td><td>1111</td></tr>
      </table>
    `,
    testCases: [
      { input: '1100\n0011', expectedOutput: '1111' },
      { input: '1010\n0101', expectedOutput: '1111', hidden: true },
      { input: '1111\n1111', expectedOutput: '0000', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_10',
    title: '10. Anton và bộ ký tự',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Anton và bộ ký tự</h2>
      <p>Cho một chuỗi có dạng {a, b, c}, đếm số chữ cái riêng biệt trong bộ.</p>
      <h3>Input</h3>
      <p>Một dòng chứa tập hợp có dạng {x, y, z} (chữ thường, cách nhau bởi ", ").</p>
      <h3>Output</h3>
      <p>Số chữ cái riêng biệt.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>{a, b, c}</td><td>3</td></tr>
        <tr><td>{b, a, b, a}</td><td>2</td></tr>
      </table>
    `,
    testCases: [
      { input: '{a, b, c}', expectedOutput: '3' },
      { input: '{b, a, b, a}', expectedOutput: '2', hidden: true },
      { input: '{a}', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_11',
    title: '11. Pangram',
    duration: '10 phút',
    type: 'practice',
    content: `
      <h2>Pangram</h2>
      <p>Kiểm tra xem chuỗi có chứa đủ 26 chữ cái tiếng Anh (hoa hoặc thường) không. In "YES" hoặc "NO".</p>
      <h3>Input</h3>
      <p>Dòng 1: n (1-100). Dòng 2: chuỗi.</p>
      <h3>Output</h3>
      <p>"YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>35<br>TheQuickBrownFoxJumpsOverTheLazyDog</td><td>YES</td></tr>
      </table>
    `,
    testCases: [
      { input: '35\nTheQuickBrownFoxJumpsOverTheLazyDog', expectedOutput: 'YES' },
      { input: '10\nabcdefghij', expectedOutput: 'NO', hidden: true },
      { input: '26\nTheQuickBrownFoxJumpsOver</td><td>NO', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_12',
    title: '12. Giáng sinh',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Giáng sinh</h2>
      <p>Cho tên khách, tên chủ nhà và một chuỗi ký tự. Kiểm tra xem chuỗi có thể là hoán vị của tổng hai tên không (không phân biệt thứ tự).</p>
      <h3>Input</h3>
      <p>Dòng 1: tên khách. Dòng 2: tên chủ nhà. Dòng 3: chuỗi ký tự.</p>
      <h3>Output</h3>
      <p>"YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>SANTACLAUS<br>DEDMOROZ<br>SANTAMOROZDEDCLAUS</td><td>YES</td></tr>
      </table>
    `,
    testCases: [
      { input: 'SANTACLAUS\nDEDMOROZ\nSANTAMOROZDEDCLAUS', expectedOutput: 'YES' },
      { input: 'AA\nBB\nABAB', expectedOutput: 'NO', hidden: true },
      { input: 'ABC\nDEF\nFEDCBA', expectedOutput: 'YES', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_13',
    title: '13. Đoạn liền kề',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Đoạn liền kề</h2>
      <p>Cho t test cases, mỗi là chuỗi 0/1. Đếm số 0 tối thiểu cần xóa để tất cả các số 1 tạo thành một đoạn liền kề.</p>
      <h3>Input</h3>
      <p>Dòng 1: t (1-100). t dòng tiếp theo, mỗi dòng chứa chuỗi s (độ dài 1-100, gồm 0 và 1).</p>
      <h3>Output</h3>
      <p>Với mỗi test case, in một dòng: số 0 tối thiểu cần xóa.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4<br>aaa bbb ccc abc bca bca aabb bbaa baba imi mii iim</td><td>NO YES YES NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n010011\n0011\n1111\n010', expectedOutput: '1\n0\n0\n0' },
      { input: '3\n0101\n100001\n010', expectedOutput: '2\n3\n0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_14',
    title: '14. Số điện thoại',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Số điện thoại</h2>
      <p>Kiểm tra xem chuỗi có thể trở thành số điện thoại (bắt đầu bằng 8, đủ 11 chữ số) bằng cách xóa một số ký tự không.</p>
      <h3>Input</h3>
      <p>Dòng 1: t (1-100). Mỗi test: dòng 1 chứa n, dòng 2 chứa chuỗi s (độ dài n, gồm chữ số).</p>
      <h3>Output</h3>
      <p>Mỗi test: "YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>2</td></tr>
      </table>
    `,
    testCases: [
      { input: '2\n13\n31415926535\n11\n80011223388', expectedOutput: 'NO\nYES' },
      { input: '2\n5\n80000\n11\n70011223388', expectedOutput: 'NO\nNO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_15',
    title: '15. Chuỗi con chẵn',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuỗi con chẵn</h2>
      <p>Cho chuỗi s chỉ gồm chữ số 1-9. Đếm số chuỗi con có số cuối cùng là chữ số chẵn.</p>
      <h3>Input</h3>
      <p>Dòng 1: n (1-65000). Dòng 2: chuỗi s (độ dài n, gồm 1-9).</p>
      <h3>Output</h3>
      <p>Số chuỗi con có chữ số cuối chẵn.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4<br>aaa bbb ccc abc bca bca aabb bbaa baba imi mii iim</td><td>NO YES YES NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\n1234', expectedOutput: '6' },
      { input: '1\n3', expectedOutput: '0', hidden: true },
      { input: '3\n246', expectedOutput: '6', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_16',
    title: '16. Match ba chuỗi',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Match ba chuỗi</h2>
      <p>Cho ba chuỗi a, b, c cùng độ dài n. Tại mỗi vị trí i, hoán đổi c[i] với a[i] hoặc b[i]. Kiểm tra xem có thể ghép được chuỗi mới không.</p>
      <h3>Input</h3>
      <p>Dòng 1: t (số test). Mỗi test: dòng 1 = n, dòng 2 = a, dòng 3 = b, dòng 4 = c. (chỉ chứa chữ thường)</p>
      <h3>Output</h3>
      <p>Mỗi test: "YES" hoặc "NO".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4<br>aaa bbb ccc abc bca bca aabb bbaa baba imi mii iim</td><td>NO YES YES NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\naaa\nbbb\nccc\nabc\nbca\nbca\naabb\nbbaa\nbaba\nimi\nmii\niim', expectedOutput: 'NO\nYES\nYES\nNO' },
      { input: '1\n3\nabc\nabc\nabc', expectedOutput: 'YES', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_17',
    title: '17. Chuỗi a-b',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuỗi a-b</h2>
      <p>Cho chuỗi s gồm 'a' và 'b' (độ dài chẵn). Biến đổi tối thiểu để mỗi tiền tố có độ dài chẵn có số 'a' = số 'b'.</p>
      <h3>Input</h3>
      <p>Dòng 1: n (2-200000, chẵn). Dòng 2: chuỗi s (chỉ 'a' và 'b').</p>
      <h3>Output</h3>
      <p>Dòng 1: số phép biến đổi tối thiểu. Dòng 2: chuỗi kết quả.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4<br>aaa bbb ccc abc bca bca aabb bbaa baba imi mii iim</td><td>NO YES YES NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\nbbbb', expectedOutput: '2\nabab' },
      { input: '2\naa', expectedOutput: '1\nab', hidden: true },
      { input: '6\nabbbbb', expectedOutput: '2\naababb', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_18',
    title: '18. Siêu anh hùng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Siêu anh hùng</h2>
      <p>Cho hai tên s và t (chỉ chữ thường). Kiểm tra xem có thể biến s thành t bằng cách đổi nguyên âm → nguyên âm, phụ âm → phụ âm không. Hai chuỗi khác nhau.</p>
      <h3>Input</h3>
      <p>Dòng 1: chuỗi s. Dòng 2: chuỗi t.</p>
      <h3>Output</h3>
      <p>"Yes" hoặc "No".</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>abc</td></tr>
      </table>
    `,
    testCases: [
      { input: 'abc\nukm', expectedOutput: 'Yes' },
      { input: 'aAe\nuUe', expectedOutput: 'Yes', hidden: true },
      { input: 'abc\nab', expectedOutput: 'No', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_19',
    title: '19. Alice',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Alice</h2>
      <p>Cho chuỗi s (có ít nhất một 'a'). Xóa ký tự để được chuỗi "tốt" dài nhất (chuỗi gọi là tốt nếu số 'a' > nửa độ dài, tức chứa nhiều 'a' hơn các ký tự khác). In độ dài chuỗi tốt dài nhất.</p>
      <h3>Input</h3>
      <p>Một dòng chứa chuỗi s (1-50, chỉ chữ thường, có ít nhất một 'a').</p>
      <h3>Output</h3>
      <p>Độ dài chuỗi tốt dài nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>xaxxxxa</td><td>3</td></tr>
      </table>
    `,
    testCases: [
      { input: 'xaxxxxa', expectedOutput: '3' },
      { input: 'aaab', expectedOutput: '4', hidden: true },
      { input: 'a', expectedOutput: '1', hidden: true },
      { input: 'baaaa', expectedOutput: '5', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_20',
    title: '20. Cắt chuỗi',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Cắt chuỗi</h2>
      <p>Chia chuỗi 0/1 thành số chuỗi con tối thiểu sao cho mỗi chuỗi con có số lượng 0 và 1 khác nhau. Mỗi chuỗi con gọi là "tốt" nếu số 0 ≠ số 1.</p>
      <h3>Input</h3>
      <p>Dòng 1: n (1-100). Dòng 2: chuỗi s (độ dài n, gồm 0 và 1).</p>
      <h3>Output</h3>
      <p>Dòng 1: số chuỗi con k. Dòng 2: k chuỗi cách nhau khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6<br>100011</td><td>2 100 011</td></tr>
      </table>
    `,
    testCases: [
      { input: '6\n100011', expectedOutput: '2\n100 011' },
      { input: '2\n01', expectedOutput: '2\n0 1', hidden: true },
      { input: '4\n0011', expectedOutput: '1\n0011', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_21',
    title: '21. Chuỗi con cân bằng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Chuỗi con cân bằng</h2>
      <p>Cho chuỗi s (chữ hoa, chỉ gồm k chữ cái đầu bảng). Tìm độ dài chuỗi con dài nhất sao cho mỗi k chữ cáı đầu xuất hiện cùng số lần.</p>
      <h3>Input</h3>
      <p>Dòng 1: n (1-100000) và k (1-26). Dòng 2: chuỗi s (độ dài n, chữ hoa A-Z).</p>
      <h3>Output</h3>
      <p>Độ dài chuỗi con cân bằng dài nhất.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>9 3<br>ACAABCCAB</td><td>6</td></tr>
      </table>
    `,
    testCases: [
      { input: '9 3\nACAABCCAB', expectedOutput: '6' },
      { input: '5 2\nAAAAA', expectedOutput: '4', hidden: true },
      { input: '3 1\nABC', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b19_22',
    title: '22. Bàn phím trục trặc',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Bàn phím trục trặc</h2>
      <p>Nếu phím hoạt động → chỉ xuất hiện 1 lần; nếu trục trặc → xuất hiện 2 lần liên tiếp. Tìm các phím hoạt động đúng (theo thứ tự bảng chữ cái, không lặp).</p>
      <h3>Input</h3>
      <p>Dòng 1: t (1-100). t dòng tiếp theo: mỗi dòng chứa chuỗi s (1-500 ký tự thường).</p>
      <h3>Output</h3>
      <p>Mỗi test: chuỗi các phím hoạt động đúng (theo thứ tự bảng chữ cái, không lặp).</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4<br>aaa bbb ccc abc bca bca aabb bbaa baba imi mii iim</td><td>NO YES YES NO</td></tr>
      </table>
    `,
    testCases: [
      { input: '4\na\nzzaaz\nccff\ncbddbb', expectedOutput: 'a\nz\na\nc' },
      { input: '2\naa\nab', expectedOutput: '\na', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
