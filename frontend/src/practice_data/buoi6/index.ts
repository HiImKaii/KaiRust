// Buổi 6: VẼ HÌNH

import { Lesson } from '../../courses';

const DEFAULT_CODE = `fn main() {
    // Viết code xử lý ở đây
}
`;

export const buoi6_lessons: Lesson[] = [
  {
    id: 'ch28_b6_01',
    title: '1. Hình bình hành ngược',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình bình hành ngược</h2>
      <p>Viết chương trình cho phép nhập vào hàng và cột của hình bình hành. Thực hiện in hình bình hành sao.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên dương rows và cols (số hàng và số cột)</p>
      <h3>Output</h3>
      <p>In hình bình hành sao theo quy tắc: dòng đầu tiên không có dấu ngã, các dòng tiếp theo có dấu ngã tăng dần, dòng cuối cùng không có dấu ngã, giữa các dòng có ký tự '.' để tạo hiệu ứng rỗng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 4</td><td>****\n~*..*\n~~****</td></tr>
      </table>
    `,
    testCases: [
      { input: '3 4', expectedOutput: '****\n~*..*\n~~****' },
      { input: '2 5', expectedOutput: '*****\n~****', hidden: true },
      { input: '4 6', expectedOutput: '******\n~*....*\n~~******', hidden: true },
      { input: '1 3', expectedOutput: '***', hidden: true },
      { input: '5 5', expectedOutput: '*****\n~*...*\n~~*...*\n~~~*****\n~~~~*****', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_02',
    title: '2. Hình chữ nhật số 1',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình chữ nhật số 1</h2>
      <p>Viết chương trình cho phép nhập vào số hàng và số cột, in ra hình chữ nhật các số 1.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên dương rows và cols</p>
      <h3>Output</h3>
      <p>In hình chữ nhật các số 1 tương ứng, mỗi dòng là một chuỗi các số 1.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5 5</td><td>11111\n11111\n11111\n11111\n11111</td></tr>
      </table>
    `,
    testCases: [
      { input: '5 5', expectedOutput: '11111\n11111\n11111\n11111\n11111' },
      { input: '3 4', expectedOutput: '1111\n1111\n1111', hidden: true },
      { input: '1 1', expectedOutput: '1', hidden: true },
      { input: '4 3', expectedOutput: '111\n111\n111\n111', hidden: true },
      { input: '2 6', expectedOutput: '111111\n111111', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_03',
    title: '3. Hình bình hành sao',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình bình hành sao</h2>
      <p>Viết chương trình cho phép nhập vào n là độ dài cạnh hình bình hành. Thực hiện in ra hình bình hành tương ứng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n (độ dài cạnh)</p>
      <h3>Output</h3>
      <p>In hình bình hành: dòng đầu có n-1 dấu ngã, dòng cuối không có dấu ngã, mỗi dòng có n sao.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>~~~~*****\n~~~*****\n~~*****\n~*****\n*****</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '~~~~*****\n~~~*****\n~~*****\n~*****\n*****' },
      { input: '3', expectedOutput: '~~***\n~***\n***', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '~~~****\n~~****\n~****\n****', hidden: true },
      { input: '6', expectedOutput: '*****~~~~~~\n*****~~~~~\n*****~~~~\n*****~~~\n*****~~\n*****~', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_04',
    title: '4. Tam giác vuông ngược rỗng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác vuông ngược rỗng</h2>
      <p>Viết chương trình cho phép nhập vào chiều cao của tam giác và thực hiện in ra tam giác sao ngược rỗng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n (chiều cao)</p>
      <h3>Output</h3>
      <p>In tam giác vuông sao ngược rỗng: dòng đầu có n sao, dòng giữa có dấu '*' ở hai đầu và '.' bên trong, dòng cuối có 1 sao, các dòng thu hẹp dần về phía trái.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>*****\n *..*\n  *.*\n   **\n    *</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '*****\n *..*\n  *.*\n   **\n    *' },
      { input: '3', expectedOutput: '***\n *.*\n  *', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '****\n *.*\n  **\n   *', hidden: true },
      { input: '6', expectedOutput: '******\n *....*\n  *...*\n   ****\n    **\n     *', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_05',
    title: '5. Nửa hình thoi',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Nửa hình thoi bên phải</h2>
      <p>Viết chương trình nhập vào số cột của một nửa hình thoi bên phải và in ra hình tương ứng (2n-1 dòng).</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>In nửa hình thoi: n dòng đầu tăng dần số sao từ 1 đến n, n-1 dòng sau giảm dần từ n-1 đến 1.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>*\n**\n***\n****\n*****\n****\n***\n**\n*</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '*\n**\n***\n****\n*****\n****\n***\n**\n*' },
      { input: '3', expectedOutput: '*\n**\n***\n**\n*', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '*\n**\n***\n****\n***\n**\n*', hidden: true },
      { input: '2', expectedOutput: '*\n**\n*', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_06',
    title: '6. Tam giác vuông ngược phải',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác vuông ngược phải</h2>
      <p>Viết chương trình cho phép nhập vào chiều cao của tam giác và thực hiện in ra tam giác vuông sao ngược phải.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n (chiều cao)</p>
      <h3>Output</h3>
      <p>In tam giác vuông sao ngược phải: dòng đầu có n sao không có dấu ngã, dòng tiếp theo có 1 dấu ngã và n-1 sao, cứ thế tăng dần số dấu ngã về phía phải.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>*****\n~****\n~~***\n~~~**\n~~~~*</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '*****\n~****\n~~***\n~~~**\n~~~~*' },
      { input: '3', expectedOutput: '***\n~**\n~~*', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '****\n~***\n~~**\n~~~*', hidden: true },
      { input: '6', expectedOutput: '******\n~*****\n~~****\n~~~***\n~~~~**\n~~~~~*', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_07',
    title: '7. Hình chữ nhật 1 và 0',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình chữ nhật 1 và 0</h2>
      <p>Viết chương trình cho phép nhập vào số hàng và số cột, in ra hình chữ nhật theo quy luật xen kẽ 1 và 0 theo dòng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên dương rows và cols</p>
      <h3>Output</h3>
      <p>Dòng chẵn (0-indexed) in toàn số 1, dòng lẻ in toàn số 0.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5 5</td><td>11111\n00000\n11111\n00000\n11111</td></tr>
      </table>
    `,
    testCases: [
      { input: '5 5', expectedOutput: '11111\n00000\n11111\n00000\n11111' },
      { input: '3 4', expectedOutput: '1111\n0000\n1111', hidden: true },
      { input: '1 5', expectedOutput: '11111', hidden: true },
      { input: '4 3', expectedOutput: '111\n000\n111\n000', hidden: true },
      { input: '2 2', expectedOutput: '11\n00', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_08',
    title: '8. Tam giác vuông phải ngược rỗng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác vuông phải ngược rỗng</h2>
      <p>Viết chương trình cho phép nhập vào chiều cao của tam giác và thực hiện in ra tam giác vuông sao ngược phải rỗng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n (chiều cao)</p>
      <h3>Output</h3>
      <p>In tam giác vuông sao ngược phải rỗng: dòng đầu n sao, dòng giữa có '*' ở hai đầu và '.' bên trong, dòng cuối có 1 sao, số dấu ngã tăng dần về phía phải.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>*****\n~*..*\n~~*.*\n~~~**\n~~~~*</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '*****\n~*..*\n~~*.*\n~~~**\n~~~~*' },
      { input: '3', expectedOutput: '***\n~*.*\n~~*', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '****\n~*.*\n~~**\n~~~*', hidden: true },
      { input: '6', expectedOutput: '******\n~*...*\n~~*..*\n~~~**\n~~~~*\n~~~~~*', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_09',
    title: '9. Hình chữ nhật số tăng dần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình chữ nhật số tăng dần</h2>
      <p>Viết chương trình nhập vào n và in ra hình chữ nhật n x n theo quy luật: các số từ 1 đến n*n được điền theo thứ tự từ trái sang phải, từ trên xuống dưới (không có khoảng trắng giữa các số).</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>In hình chữ nhật n dòng, mỗi dòng n số ghép liền nhau.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>12345\n678910\n1112131415\n1617181920\n2122232425</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '12345\n678910\n1112131415\n1617181920\n2122232425' },
      { input: '3', expectedOutput: '123\n456\n789', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '1234\n5678\n9101112\n13141516', hidden: true },
      { input: '2', expectedOutput: '12\n34', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_10',
    title: '10. Hình vuông rỗng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình vuông rỗng</h2>
      <p>Viết chương trình cho phép nhập vào n là cạnh của hình vuông và thực hiện in ra hình vuông rỗng các ký tự *.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n (cạnh hình vuông)</p>
      <h3>Output</h3>
      <p>Dòng đầu và dòng cuối là toàn sao, các dòng giữa có sao ở hai đầu và '.' ở giữa.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>4</td><td>****\n*..*\n*..*\n****</td></tr>
      </table>
    `,
    testCases: [
      { input: '4', expectedOutput: '****\n*..*\n*..*\n****' },
      { input: '3', expectedOutput: '***\n*.*\n***', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '5', expectedOutput: '*****\n*...*\n*...*\n*...*\n*****', hidden: true },
      { input: '2', expectedOutput: '**\n**', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_11',
    title: '11. Tam giác số zigzag',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác số zigzag</h2>
      <p>Viết chương trình nhập vào n và in ra tam giác số theo quy luật zigzag. Mỗi số cách nhau bởi một khoảng trắng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Dòng i (1-indexed) có i số tăng dần liên tiếp, cách nhau bởi khoảng trắng.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15' },
      { input: '3', expectedOutput: '1\n2 3\n4 5 6', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '1\n2 3\n4 5 6\n7 8 9 10', hidden: true },
      { input: '2', expectedOutput: '1\n2 3', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_12',
    title: '12. Tam giác vuông trái rỗng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác vuông trái rỗng</h2>
      <p>Viết chương trình cho phép nhập vào chiều cao của tam giác và in ra tam giác hình sao rỗng tương ứng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n (chiều cao)</p>
      <h3>Output</h3>
      <p>Dòng đầu có 1 sao, dòng giữa có sao ở hai đầu và '.' bên trong, dòng cuối có n sao, số sao tăng dần từ trái sang.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>*\n**\n*.*\n*..*\n*****</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '*\n**\n*.*\n*..*\n*****' },
      { input: '3', expectedOutput: '*\n**\n*.*\n***', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '*\n**\n*.*\n****', hidden: true },
      { input: '6', expectedOutput: '*\n**\n*.*\n*..*\n*****', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_13',
    title: '13. Hình thoi',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình thoi</h2>
      <p>Viết chương trình cho phép nhập vào số n và in ra hình thoi tương ứng với n.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>In hình thoi đặc: n dòng đầu (từ 1 đến n) có số sao tăng dần từ 1 đến 2n-1, n dòng sau có số sao giảm dần từ 2n-3 về 1. Dòng đầu tiên có (n-1) dấu ngã, dòng cuối có (n-1) dấu ngã.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>~~~~*\n~~~***\n~~*****\n~*******\n*********\n~*******\n~~*****\n~~~***\n~~~~*</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '~~~~*\n~~~***\n~~*****\n~*******\n*********\n~*******\n~~*****\n~~~***\n~~~~*' },
      { input: '3', expectedOutput: '~~*\n~***\n*****\n~***\n~~*', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '~~~*\n~~***\n~*****\n******', hidden: true },
      { input: '2', expectedOutput: '~*\n***\n~*', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_14',
    title: '14. Mũi tên phải',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Mũi tên sang phải</h2>
      <p>Viết chương trình nhập vào n và vẽ hình mũi tên sang phải tương ứng (2n-1 dòng).</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>n dòng đầu: dòng i có (n-i)*2 dấu ngã và (n-i) sao ghép liền. n-1 dòng sau: dòng i có (2*(i+1)) dấu ngã và (i+1) sao ghép liền.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>~~~~~~~~*****\n~~~~~~****\n~~~~***\n~~**\n*\n~~**\n~~~~***\n~~~~~~****\n~~~~~~~~*****</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '~~~~~~~~*****\n~~~~~~****\n~~~~***\n~~**\n*\n~~**\n~~~~***\n~~~~~~****\n~~~~~~~~*****' },
      { input: '3', expectedOutput: '~~~~***\n~~**\n*\n~~**\n~~~~***', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '~~~~~~****\n~~~~**\n~~*\n~~**\n~~~~****', hidden: true },
      { input: '2', expectedOutput: '~~**\n*\n~~**', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_15',
    title: '15. Tam giác số giảm dần',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác số giảm dần</h2>
      <p>Viết chương trình nhập vào n và in ra tam giác số giảm dần theo quy luật: dòng i có i chữ số n.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>Dòng đầu có n chữ số n, dòng tiếp theo có n-1 chữ số n, cứ thế giảm dần đến 1 chữ số n ở dòng cuối.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>55555\n5555\n555\n55\n5</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '55555\n5555\n555\n55\n5' },
      { input: '3', expectedOutput: '333\n33\n3', hidden: true },
      { input: '1', expectedOutput: '1', hidden: true },
      { input: '4', expectedOutput: '4444\n444\n44\n4', hidden: true },
      { input: '2', expectedOutput: '22\n2', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_16',
    title: '16. Tam giác vuông trái',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác vuông trái</h2>
      <p>Viết chương trình cho phép nhập vào chiều cao của tam giác và in ra tam giác hình sao tương ứng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n (chiều cao)</p>
      <h3>Output</h3>
      <p>Dòng i (1-indexed) có i sao, căn trái.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>*\n**\n***\n****\n*****</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '*\n**\n***\n****\n*****' },
      { input: '3', expectedOutput: '*\n**\n***', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '*\n**\n***\n****', hidden: true },
      { input: '6', expectedOutput: '*\n**\n***\n****\n*****\n******', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_17',
    title: '17. Hình bình hành sao ngược',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình bình hành sao ngược</h2>
      <p>Viết chương trình cho phép nhập vào số hàng và số cột của hình bình hành. Thực hiện in ra hình bình hành ngược.</p>
      <h3>Input</h3>
      <p>Một dòng chứa hai số nguyên dương rows và cols</p>
      <h3>Output</h3>
      <p>Dòng đầu không có dấu ngã, dòng i có i-1 dấu ngã (i từ 1), mỗi dòng có cols sao.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>3 5</td><td>*****\n~*****\n~~*****</td></tr>
      </table>
    `,
    testCases: [
      { input: '3 5', expectedOutput: '*****\n~*****\n~~*****' },
      { input: '4 4', expectedOutput: '****\n~****\n~~****\n~~~****', hidden: true },
      { input: '1 3', expectedOutput: '***', hidden: true },
      { input: '5 2', expectedOutput: '**\n~**\n~~**\n~~~**\n~~~~**', hidden: true },
      { input: '2 6', expectedOutput: '******\n~******', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_18',
    title: '18. Tam giác vuông phải rỗng',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Tam giác vuông phải rỗng</h2>
      <p>Viết chương trình cho phép nhập vào chiều cao của tam giác và thực hiện in ra tam giác vuông rỗng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n (chiều cao)</p>
      <h3>Output</h3>
      <p>Dòng đầu có (n-1) dấu ngã và 1 sao, dòng giữa có sao ở hai đầu và '.' bên trong, dòng cuối có n sao, số dấu ngã giảm dần về phía phải.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>~~~~*\n~~~**\n~~*.*\n~*..*\n*****</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '~~~~*\n~~~**\n~~*.*\n~*..*\n*****' },
      { input: '3', expectedOutput: '~~*\n~**\n***', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '~~~*\n~~**\n~*.*\n****', hidden: true },
      { input: '6', expectedOutput: '~~~~~*\n~~~~**\n~~~*.*\n~~*..*\n~*...*\n******', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_19',
    title: '19. Mũi tên trái',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Mũi tên sang trái</h2>
      <p>Viết chương trình nhập vào n và vẽ hình mũi tên sang trái tương ứng (2n-1 dòng).</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>n dòng đầu: dòng i có (n-i) dấu ngã và (n-i) sao ghép liền. n-1 dòng sau: dòng i có i dấu ngã và i sao.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>~~~~*****\n~~~****\n~~***\n~**\n*\n~**\n~~***\n~~~****\n~~~~*****</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '~~~~*****\n~~~****\n~~***\n~**\n*\n~**\n~~***\n~~~****\n~~~~*****' },
      { input: '3', expectedOutput: '~~***\n~**\n*\n~**\n~~***', hidden: true },
      { input: '1', expectedOutput: '*', hidden: true },
      { input: '4', expectedOutput: '~~~****\n~~**\n~*\n~**\n~~***', hidden: true },
      { input: '2', expectedOutput: '~**\n*\n~**', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
  {
    id: 'ch28_b6_20',
    title: '20. Hình chứa hình thoi',
    duration: '15 phút',
    type: 'practice',
    content: `
      <h2>Hình chứa hình thoi</h2>
      <p>Viết chương trình cho phép nhập n và in ra hình chứa hình thoi tương ứng.</p>
      <h3>Input</h3>
      <p>Một dòng chứa một số nguyên dương n</p>
      <h3>Output</h3>
      <p>In hình 2n dòng. Dòng đầu có 2n sao. Dòng i (1-indexed, 1≤i≤n-1) có (n-i) sao + (2*i) dấu ngã + (n-i) sao. Dòng n có n sao + (2n) dấu ngã + n sao. Dòng n+1 đến 2n-1 đối xứng với dòng n-1 đến 1. Dòng cuối có 2n sao.</p>
      <h3>Ví dụ</h3>
      <table class="comparison-table">
        <tr><th>Input</th><th>Output</th></tr>
        <tr><td>5</td><td>**********\n****~~****\n***~~~~***\n**~~~~~~**\n*~~~~~~~~*\n*~~~~~~~~*\n**~~~~~~**\n***~~~~***\n****~~****\n**********</td></tr>
      </table>
    `,
    testCases: [
      { input: '5', expectedOutput: '**********\n****~~****\n***~~~~***\n**~~~~~~**\n*~~~~~~~~*\n*~~~~~~~~*\n**~~~~~~**\n***~~~~***\n****~~****\n**********' },
      { input: '3', expectedOutput: '******\n**~~**\n*~~~~*\n*~~~~*\n**~~**\n******', hidden: true },
      { input: '1', expectedOutput: '**', hidden: true },
      { input: '4', expectedOutput: '********\n***~~***\n**~~~~**\n*~~~~~~*\n*~~~~~~*\n**~~~~**\n***~~***\n********', hidden: true },
      { input: '2', expectedOutput: '****\n**~~**\n**~~**\n****', hidden: true },
    ],
    isExercise: true,
    defaultCode: DEFAULT_CODE,
  },
];
