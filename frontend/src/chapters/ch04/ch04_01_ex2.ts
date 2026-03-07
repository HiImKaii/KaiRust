import { Lesson } from '../../courses';

export const ch04_01_ex2: Lesson = {
    id: 'ch04_01_ex2',
    title: 'Bài tập: Move vs Clone',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Trong một số trường hợp, chúng ta <em>thực sự</em> muốn sao chép cả dữ liệu trên bộ nhớ heap để có 2 phiên bản làm việc độc lập.</p>
<p>Trong Rust, để có được một bản sao toàn bộ (deep copy) thay vì Move, bạn dùng phương thức <code>.clone()</code>.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Sử dụng cơ chế clone trên chuỗi <code>hello</code> và gán vào <code>world</code> để đoạn code bên dưới có thể biên dịch và chạy thành công, tức là in ra được cả \`hello\` và \`world\`.</p>
`,
  defaultCode: `fn main() {
    let hello = String::from("Chào buổi sáng");
    
    // Sửa dòng dưới đây, sử dụng clone() thay vì move
    let world = hello;

    println!("Biến 1 (Gốc): {}", hello);
    println!("Biến 2 (Bản sao): {}", world);
}
`,
  expectedOutput: 'Biến 1 (Gốc): Chào buổi sáng\nBiến 2 (Bản sao): Chào buổi sáng'
};
