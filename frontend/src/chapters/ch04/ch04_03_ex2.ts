import { Lesson } from '../../courses';

export const ch04_03_ex2: Lesson = {
    id: 'ch04_03_ex2',
    title: 'Bài tập: Sử dụng Array Slice',
    duration: '10 phút',
    type: 'practice',
    content: `
<p>Các slice không chỉ giới hạn trỏ đến chuỗi <code>String</code>, nó còn trỏ đến bất kì Collection liên tục nào dưới dạng một đoạn <code>&[T]</code>. Chẳng hạn <code>&[i32]</code>.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Bạn có một mảng các số nguyên từ 1 đến 10. Hãy tạo một Array Slice lấy 5 số ở giữa (từ con số 3 đến con số 7), sau đó truyền phần cắt mảng đó cho hàm tính tổng.</p>
`,
  defaultCode: `fn main() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    // Sửa dòng dưới, cắt mảng \`numbers\` từ số '3' đến '7' (Gợi ý: Index bắt đầu từ 0)
    let middle_slice = &numbers; 

    sum_array(middle_slice);
}

// Function mong chờ một mảng số thực [i32]
fn sum_array(slice: &[i32]) {
    let mut sum = 0;
    for &num in slice {
        sum += num;
    }
    println!("Tổng đoạn giữa mảng là: {}", sum);
}
`,
  expectedOutput: 'Tổng đoạn giữa mảng là: 25'
};
