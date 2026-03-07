import { Lesson } from '../../courses';

export const ch04_03_ex6: Lesson = {
    id: 'ch04_03_ex6',
    title: 'Bài tập Khó: CSV Parser Mini',
    duration: '20 phút',
    type: 'practice',
    content: `
<p>CSV là dạng format dữ liệu được phân cách bằng dấu phẩy <code>,</code>. Hãy thử sức bóc tách các giá trị CSV và in ra nó bằng Slice nhé!</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Nhận vào 1 dòng CSV <code>&str</code> nội dung <code>Id,Tên,Tuổi</code>, ví dụ <code>"101,Nguyen Van A,25"</code>. Viết hàm cắt Slice chia dữ liệu csv và in ra output dạng: <code>ID: ... | Tên: ... | Tuổi: ...</code> một cách thủ công qua <code>as_bytes()</code> (KHÔNG YÊU CẦU DÙNG HÀM <code>split(',')</code> của ngôn ngữ có sẵn ở vòng này!).</p>
`,
  defaultCode: `fn main() {
    let csv_row = "101,Nguyen Van A,25";
    parse_csv(csv_row);
}

fn parse_csv(s: &str) {
    let bytes = s.as_bytes();
    
    let mut first_comma = 0;
    let mut second_comma = 0;
    
    // Vòng lặp tìm 2 dấu phẩy
    for (i, &item) in bytes.iter().enumerate() {
        if item == b',' {
            if first_comma == 0 {
                first_comma = i;
            } else {
                second_comma = i;
            }
        }
    }
    
    // Tạo 3 Slices tương ứng: Id, Name, Age bằng Index của 2 dấu phẩy
    let id_slice = &s[0..first_comma];
    // Điền slice cho name
    // Điền slice cho age
    
    // println!("ID: {} | Tên: {} | Tuổi: {}", id_slice, name_slice, age_slice);
}
`,
  expectedOutput: 'ID: 101 | Tên: Nguyen Van A | Tuổi: 25'
};
