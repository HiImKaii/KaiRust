import { Lesson } from '../../courses';

export const ch04_01_ex3: Lesson = {
    id: 'ch04_01_ex3',
    title: 'Bài tập: Trả lại Ownership',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Khi một function kết thúc, tất cả các biến local (trong scope) có ownership của dữ liệu heap sẽ rơi vào trạng thái <strong>drop</strong> và biến mất. Nếu chúng ta pass 1 biến string cho một function không trả về Reference, coi như chúng ta mất string đó ở vòng đời hiện tại.</p>
<p>Giải pháp thô sơ không dùng Reference là bắt cái hàm kia phải \`return\` luôn cái chuỗi mà nó đã cướp quyền ownership để gán lại cho chúng ta.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Sửa lại hàm <code>takes_and_returns</code> để hàm này không chiếm luôn ownership nữa mà ngoan ngoãn trả về. Cập nhật lại trong hàm <code>main</code> để gán luồng dữ liệu trả về đó vào một biến tên là <code>s2</code>.</p>
`,
  defaultCode: `fn main() {
    let s1 = String::from("hello");
    
    // Khai báo một biến chặn lấy kết quả String return (Gợi ý: let s2 = ...)
    takes_and_returns(s1);
    
    // Uncomment dòng dưới khi đã có biến chứa chuỗi trở về
    // println!("Đã lấy lại quyền sở hữu: {}", s2);
}

// Sửa lại kiểu trả về trong definition này
fn takes_and_returns(a_string: String) {
    // Để có thể truyền về thì chỉ việc return nó 
}
`,
  expectedOutput: 'Đã lấy lại quyền sở hữu: hello'
};
