import { Lesson } from '../../courses';

export const ch04_02_ex3: Lesson = {
    id: 'ch04_02_ex3',
    title: 'Bài tập: Tránh Xung đột Tham chiếu (Reference Rules)',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Rust rất nhạy cảm với Data Races: Bạn không thể vừa có một người đang thay đổi dữ liệu (có biến <strong>Mutable Reference</strong>), lại vừa có người đang đọc nó và chắc mẩm dữ liệu sẽ không thay đổi (có biến <strong>Immutable Reference</strong>) trong cùng một lúc.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Các biến được dùng đến ở dòng cuối là <code>println!</code> sẽ kéo dài thời gian tồn tại scope của Biến đó cho đến hàm in cuối cùng.<br>
Đoạn code đang tạo lỗi cấm tham chiếu (vì hàm in đang sử dụng <code>r1</code> cùng thời khắc với dòng tạo ra <code>r3</code>). Hãy thay đổi cấu trúc của lệnh in hoặc xoá biến thừa để chương trình biên dịch thành công.</p>
`,
  defaultCode: `fn main() {
    let mut s = String::from("Rust");

    let r1 = &s; // Nhìn không có vấn đề
    let r2 = &s; // Vẫn nhìn không có vấn đề
    
    let r3 = &mut s; // VẤN ĐỀ!!! r3 vừa thò vào lúc r1 và r2 vẫn đang được xài ở dưới

    println!("r1 và r2 là {} và {}", r1, r2); 
    println!("Sửa dữ liệu bởi mut ref r3: {}", r3);
}
`,
  expectedOutput: 'Sửa dữ liệu bởi mut ref r3: Rust'
};
