import { Lesson } from '../../courses';

export const ch04_01_ex1: Lesson = {
    id: 'ch04-01-ex1',
    title: 'Bài tập 4.1.1: Lỗi Di chuyển (Move Error)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Lỗi Di chuyển (Move Error)',
    memoryLimit: '256MB',
    timeLimit: '1s',

    // Đề bài chi tiết
    problemDescription: `Trong Rust, khi gán giá trị kiểu String từ biến này sang biến khác, giá trị sẽ bị "di chuyển" (move) thay vì "sao chép" (copy).

Cho đoạn code sau:
<pre><code>let s1 = String::from("Rust");
let s2 = s1;
println!("{}", s2);
println!("{}", s1);  // LỖI: s1 đã bị move</code></pre>

Hãy sửa code trên bằng cách xóa hoặc comment dòng in s1 để tránh lỗi move.

Yêu cầu: Không sử dụng .clone() để sao chép dữ liệu.`,

    // Định dạng input
    inputFormat: 'Không có input',

    // Định dạng output
    outputFormat: 'In ra một dòng: Rust',

    // Các ràng buộc
    constraints: [
        { field: 'Yêu cầu', condition: 'Không dùng .clone()' },
        { field: 'Cách sửa', condition: 'Xóa hoặc comment dòng in s1' }
    ],

    // Ví dụ minh họa
    examples: [
        {
            input: '',
            output: 'Rust',
            explanation: 'In ra giá trị của s2, không in s1 vì s1 đã bị move'
        }
    ],

    // Nội dung lý thuyết
    content: `
<h3>Tìm hiểu về Move trong Rust</h3>

<p>Trong Rust, các kiểu dữ liệu như <code>String</code>, <code>Vec</code>, và các kiểu tự định nghĩa không implement <code>Copy</code> sẽ bị <strong>move</strong> khi gán sang biến mới.</p>

<h4>Điều gì xảy ra khi move:</h4>
<ul>
    <li>Giá trị từ biến cũ chuyển sang biến mới</li>
    <li>Biến cũ trở nên <strong>không hợp lệ</strong> (invalid)</li>
    <li>Không thể sử dụng biến cũ sau khi move</li>
</ul>

<h4>Ví dụ về lỗi move:</h4>
<pre><code>let s1 = String::from("hello");
let s2 = s1;
// LỖI: s1 đã bị move, không thể dùng ở đây
println!("{}", s1);</code></pre>

<h4>Cách sửa (không dùng clone):</h4>
<pre><code>let s1 = String::from("hello");
let s2 = s1;
println!("{}", s2);  // Chỉ in s2</code></pre>
`,

    // Code mẫu
    defaultCode: `fn main() {
    let s1 = String::from("Rust");
    let s2 = s1;

    // TODO: In giá trị của s2
    // println!("{}", s2);

    // TODO: Xóa hoặc comment dòng dưới đây vì s1 đã bị move
    // println!("{}", s1);
}
`,

    // Test case
    testCases: [
        {
            input: '',
            expectedOutput: 'Rust',
            description: 'In giá trị của s2'
        }
    ]
};
