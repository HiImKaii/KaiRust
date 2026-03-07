import { Lesson } from '../../courses';

export const ch04_01_ex1: Lesson = {
    id: 'ch04_01_ex1',
    title: 'Bài tập: Lỗi Di chuyển (Move Error)',
    duration: '5 phút',
    type: 'practice',
    content: `
<p>Hãy cùng quan sát xem hệ thống mượn bộ nhớ của Rust hoạt động ra sao. Trong đoạn code dưới đây, biến \`s1\` đang bị di chuyển (move) giá trị quản lý sang \`s2\`, thế nên \`s1\` sẽ không hợp lệ ở dòng \`println!\` thứ 2.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Bạn không được sử dụng lệnh \`.clone()\`. Việc bạn duy nhất cần làm là xoá dòng lệnh gây lỗi hoặc đưa nó vào comment <code>// </code>.</p>
`,
  defaultCode: `fn main() {
    let s1 = String::from("Rust");
    let s2 = s1;
    
    println!("Dữ liệu hiện giờ nằm ở biến: {}", s2);
    println!("Cố gắng in ra s1: {}", s1); // Sửa dòng này
}
`,
  expectedOutput: 'Dữ liệu hiện giờ nằm ở biến: Rust'
};
