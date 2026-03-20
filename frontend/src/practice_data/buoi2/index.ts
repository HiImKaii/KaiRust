// Buổi 2: IF ELSE, SWITCH CASE, VÒNG LẶP

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code ở đây
}
`;

export const buoi2_lessons: Lesson[] = [
  {
    id: 'ch28_b2_01',
    title: '1. 224A - Tổng độ dài các cạnh hình hộp',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>224A - Tổng độ dài các cạnh hình hộp chữ nhật</h2>
      <p>Cho biết diện tích của ba mặt có chung đỉnh của hình hộp chữ nhật, tính tổng độ dài 12 cạnh của hình hộp chữ nhật đó.</p>
      <h3>Input</h3>
      <p>3 số nguyên dương không vượt quá 10^4 là diện tích của ba mặt có chung đỉnh.</p>
      <h3>Output</h3>
      <p>Tổng của tất cả các cạnh của hình hộp chữ nhật.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4 6 6</td><td>28</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Cho 3 mặt có diện tích S1, S2, S3. Gọi 3 cạnh là a, b, c. Ta có: a*b=S1, b*c=S2, c*a=S3. Tổng 12 cạnh = 4*(a+b+c).</p>
    `,
    testCases: [
      { input: '4 6 6', expectedOutput: '28' },
      { input: '4 2 3', expectedOutput: '26', hidden: true },
      { input: '1 1 1', expectedOutput: '12', hidden: true },
      { input: '100 100 10000', expectedOutput: '4800', hidden: true },
      { input: '3 5 15', expectedOutput: '64', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b2_02',
    title: '2. 50A - Domino',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>50A - Đặt Domino</h2>
      <p>Bạn được cung cấp một bảng hình chữ nhật có kích thước M × N hình vuông đơn vị. Bạn được cung cấp một số lượng không giới hạn các mảnh domino tiêu chuẩn kích thước 2 × 1. Tìm số lượng domino tối đa có thể đặt trên bảng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên M và N (1 ≤ M, N ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Số lượng domino tối đa có thể đặt</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 3</td><td>4</td></tr>
        <tr><td>1 1</td><td>0</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Mỗi domino phủ 2 ô. Tổng số ô là M*N. Số domino tối đa = (M*N)/2 (lấy phần nguyên).</p>
    `,
    testCases: [
      { input: '3 3', expectedOutput: '4' },
      { input: '2 4', expectedOutput: '4', hidden: true },
      { input: '3 5', expectedOutput: '7', hidden: true },
      { input: '1000000 2', expectedOutput: '1000000', hidden: true },
      { input: '1 2', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b2_03',
    title: '3. 1A - Lát gạch',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>1A - Lát gạch</h2>
      <p>Một quảng trường hình chữ nhật kích thước n × m mét. Cần lát bằng các viên gạch hình vuông kích thước a × a mét. Tìm số lượng gạch tối thiểu cần dùng. Các viên gạch có thể vượt quá biên nhưng không được phép cắt.</p>
      <h3>Input</h3>
      <p>Một dòng chứa ba số nguyên n, m, a (1 ≤ n, m, a ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Số lượng gạch tối thiểu cần dùng</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6 6 4</td><td>4</td></tr>
        <tr><td>5 3 2</td><td>6</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Số gạch cần theo chiều dài = ceil(n/a) = (n+a-1)/a. Số gạch cần theo chiều rộng = ceil(m/a) = (m+a-1)/a. Tổng = tích của hai số này.</p>
    `,
    testCases: [
      { input: '6 6 4', expectedOutput: '4' },
      { input: '3 3 2', expectedOutput: '4', hidden: true },
      { input: '10 5 3', expectedOutput: '8', hidden: true },
      { input: '7 4 2', expectedOutput: '16', hidden: true },
      { input: '1000000000 1000000000 1000000000', expectedOutput: '1', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b2_04',
    title: '4. Frog - Ếch nhảy',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Frog - Ếch nhảy</h2>
      <p>Một con ếch ở vị trí 0 trên trục Ox. Nó nhảy theo thuật toán sau:
      - Nhảy lần đầu a đơn vị sang phải
      - Nhảy lần thứ 2 b đơn vị sang trái
      - Nhảy lần thứ 3 a đơn vị sang phải
      - Tiếp tục luân phiên phải-trái
      Tìm vị trí của ếch sau khi nhảy k lần.</p>
      <h3>Input</h3>
      <p>Một dòng chứa ba số nguyên a, b, k (1 ≤ a, b, k ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Vị trí của ếch sau k lần nhảy</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5 2 3</td><td>8</td></tr>
        <tr><td>5 2 4</td><td>6</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Vị trí = số lần nhảy phải * a - số lần nhảy trái * b. Với k lần: nếu k chẵn, số lần phải = số lần trái = k/2; nếu k lẻ, số lần phải = k/2 + 1, số lần trái = k/2.</p>
    `,
    testCases: [
      { input: '5 2 3', expectedOutput: '8' },
      { input: '1 1 1', expectedOutput: '1', hidden: true },
      { input: '10 5 5', expectedOutput: '20', hidden: true },
      { input: '7 3 6', expectedOutput: '7', hidden: true },
      { input: '1 1 2', expectedOutput: '0', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b2_05',
    title: '5. 515A - Draxil và Varda',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>515A - Draxil và Varda</h2>
      <p>Xác định xem Draxil có thể đi từ nhà mình tại (0,0) đến nhà Varda tại (a,b) trong đúng s bước hay không. Mỗi bước di chuyển 1 đơn vị theo chiều ngang hoặc dọc.</p>
      <h3>Input</h3>
      <p>Một dòng chứa ba số nguyên a, b, s (-10^9 ≤ a, b ≤ 10^9, 1 ≤ s ≤ 2×10^9)</p>
      <h3>Output</h3>
      <p>In "YES" nếu có thể, "NO" nếu không thể</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5 5 11</td><td>NO</td></tr>
        <tr><td>-5 5 12</td><td>YES</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Số bước tối thiểu cần thiết = |a| + |b|. Để đi được trong đúng s bước: s >= min_steps VÀ (s - min_steps) phải là số chẵn.</p>
    `,
    testCases: [
      { input: '5 5 11', expectedOutput: 'NO' },
      { input: '-5 5 12', expectedOutput: 'YES' },
      { input: '0 0 0', expectedOutput: 'YES', hidden: true },
      { input: '3 4 5', expectedOutput: 'YES', hidden: true },
      { input: '5 3 7', expectedOutput: 'NO', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b2_06',
    title: '6. Mua nước',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Mua nước</h2>
      <p>Polycarp cần mua đúng n lít nước. Cửa hàng bán hai loại chai: chai 1 lít giá a burles, chai 2 lít giá b burles. Tìm số tiền tối thiểu cần trả để mua đúng n lít.</p>
      <h3>Input</h3>
      <p>Một dòng chứa ba số nguyên n, a, b (1 ≤ n ≤ 10^12, 1 ≤ a, b ≤ 1000)</p>
      <h3>Output</h3>
      <p>Số tiền tối thiểu cần trả</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>1000000000000 42 88</td><td>42000000000000</td></tr>
        <tr><td>3 1 3</td><td>3</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>So sánh giá của 2 chai 1 lít (2*a) với giá của 1 chai 2 lít (b). Chọn loại chai rẻ hơn để tối ưu chi phí.</p>
    `,
    testCases: [
      { input: '3 1 3', expectedOutput: '3' },
      { input: '1 5 1', expectedOutput: '5', hidden: true },
      { input: '2 100 50', expectedOutput: '50', hidden: true },
      { input: '10 1 100', expectedOutput: '10', hidden: true },
      { input: '5 10 5', expectedOutput: '25', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b2_07',
    title: '7. 1061A - Đổi tiền',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>1061A - Đổi tiền</h2>
      <p>Bạn có các đồng xu với mệnh giá 1, 2, 3, ..., n (mỗi loại có thể dùng nhiều đồng). Tìm số lượng đồng xu tối thiểu để tổng giá trị đúng bằng S.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên n và S (1 ≤ n ≤ 100000, 1 ≤ S ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Số lượng đồng xu tối thiểu</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>6 16</td><td>3</td></tr>
        <tr><td>5 11</td><td>3</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Luôn dùng đồng xu có mệnh giá lớn nhất có thể (tối đa là n và không vượt quá S). Số lượng đồng xu = S/n (lấy phần nguyên) + phần dư (nếu có).</p>
    `,
    testCases: [
      { input: '6 16', expectedOutput: '3' },
      { input: '10 15', expectedOutput: '2', hidden: true },
      { input: '1 100', expectedOutput: '100', hidden: true },
      { input: '100 500', expectedOutput: '5', hidden: true },
      { input: '1000 1234', expectedOutput: '8', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b2_08',
    title: '8. 996A - Rút tiền',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>996A - Rút tiền</h2>
      <p>Allen có n đô trong ngân hàng. Các mệnh giá tiền có: 1, 5, 10, 20, 100 đô. Tìm số lượng tờ tiền tối thiểu mà Allen nhận được khi rút toàn bộ số dư.</p>
      <h3>Input</h3>
      <p>Một dòng chứa số nguyên n (1 ≤ n ≤ 10^9)</p>
      <h3>Output</h3>
      <p>Số lượng tờ tiền tối thiểu</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>125</td><td>3</td></tr>
        <tr><td>43</td><td>5</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Dùng thuật toán greedy: luôn dùng mệnh giá lớn nhất có thể trước. 125 = 100 + 20 + 5 → 3 tờ.</p>
    `,
    testCases: [
      { input: '125', expectedOutput: '3' },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '500', expectedOutput: '5', hidden: true },
      { input: '1000000000', expectedOutput: '10000000', hidden: true },
      { input: '999', expectedOutput: '14', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b2_09',
    title: '9. 476A - Leo cầu thang',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>476A - Leo cầu thang</h2>
      <p>Dreamoon muốn leo lên cầu thang n bước. Mỗi lần di chuyển có thể leo 1 hoặc 2 bước. Dreamoon muốn số lần di chuyển là bội số của m. Tìm số lần di chuyển tối thiểu thỏa mãn điều kiện. Nếu không có cách nào, in -1.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên n và m (1 ≤ n ≤ 10000, 2 ≤ m ≤ 10)</p>
      <h3>Output</h3>
      <p>Số lần di chuyển tối thiểu là bội của m, hoặc -1 nếu không thể</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10 2</td><td>6</td></tr>
        <tr><td>3 4</td><td>-1</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Số bước tối thiểu = ceil(n/2) (vì dùng toàn 2 bước). Tìm số bước nhỏ nhất >= min_steps và là bội của m. Nếu không có, in -1.</p>
    `,
    testCases: [
      { input: '10 2', expectedOutput: '6' },
      { input: '1 2', expectedOutput: '1', hidden: true },
      { input: '3 4', expectedOutput: '-1', hidden: true },
      { input: '7 5', expectedOutput: '5', hidden: true },
      { input: '10000 10', expectedOutput: '5000', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b2_10',
    title: '10. 599A - Đường đi ngắn nhất',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>599A - Đường đi ngắn nhất</h2>
      <p>Patrick cần đến cả hai cửa hàng và quay về nhà. Biết khoảng cách:
      - Từ nhà đến cửa hàng 1: d1
      - Từ nhà đến cửa hàng 2: d2
      - Giữa hai cửa hàng: d3
      Tìm khoảng cách tối thiểu để đi từ nhà, qua cả hai cửa hàng và quay về nhà.</p>
      <h3>Input</h3>
      <p>Một dòng chứa ba số nguyên d1, d2, d3 (1 ≤ d1, d2, d3 ≤ 1000)</p>
      <h3>Output</h3>
      <p>Khoảng cách tối thiểu</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>10 20 30</td><td>60</td></tr>
        <tr><td>1 3 2</td><td>6</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Các tuyến đường có thể: 2*(d1+d2), d1+d2+d3, 2*(d1+d3), 2*(d2+d3). Chọn min của 4 giá trị này.</p>
    `,
    testCases: [
      { input: '10 20 30', expectedOutput: '60' },
      { input: '1 3 2', expectedOutput: '6' },
      { input: '5 5 5', expectedOutput: '20', hidden: true },
      { input: '100 200 300', expectedOutput: '600', hidden: true },
      { input: '1 1 1', expectedOutput: '4', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b2_11',
    title: '11. 546A - Mua chuối',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>546A - Mua chuối</h2>
      <p>Một người lính muốn mua w quả chuối. Quả đầu tiên giá k đô, quả thứ 2 giá 2k đô, quả thứ i giá i*k đô. Người lính có n đô. Tính số tiền cần mượn thêm. Nếu đủ tiền, in 0.</p>
      <h3>Input</h3>
      <p>Một dòng chứa ba số nguyên k, n, w (1 ≤ k ≤ 1000, 0 ≤ n ≤ 10^9, 1 ≤ w ≤ 1000)</p>
      <h3>Output</h3>
      <p>Số tiền cần mượn (0 nếu đủ)</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 17 4</td><td>13</td></tr>
        <tr><td>3 30 4</td><td>0</td></tr>
      </table>
      <h3>Giải thích</h3>
      <p>Tổng tiền = k * (1 + 2 + ... + w) = k * w * (w+1) / 2. Số tiền cần mượn = max(0, total - n).</p>
    `,
    testCases: [
      { input: '3 17 4', expectedOutput: '13' },
      { input: '3 30 4', expectedOutput: '0' },
      { input: '1 100 1', expectedOutput: '0', hidden: true },
      { input: '1 0 1', expectedOutput: '1', hidden: true },
      { input: '10 50 5', expectedOutput: '100', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
