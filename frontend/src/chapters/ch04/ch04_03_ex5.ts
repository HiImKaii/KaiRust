import { Lesson } from '../../courses';

export const ch04_03_ex5: Lesson = {
    id: 'ch04_03_ex5',
    title: 'Bài tập Khó: Text Alignment & Trimming Mini',
    duration: '20 phút',
    type: 'practice',
    content: `
<p>Việc format văn bản là một kĩ năng rất quan trọng của String và Slice trên hệ thống backend. Lần này bạn phải xử lý bài đếm độ dài đoạn từ.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Bạn sẽ nhận một đoạn text <code>&str</code> dài và một độ dài giới hạn <code>n</code>. Hãy đếm xem có bao nhiêu từ "word" (cách nhau bởi khoảng trắng đơn) trong câu có độ dài chữ (số byte) lớn hơn hoặc bằng <code>n</code>. (Không sử dụng hàm String.split).</p>
`,
  defaultCode: `fn main() {
    let essay = "Rust is blazingly fast and memory efficient";
    let n = 4;
    
    // Các từ có chiều dài >= 4: "Rust" (4), "blazingly" (9), "fast" (4), "memory" (6), "efficient" (9). Suy ra có 5 từ.
    let count = count_long_words(essay, n);
    println!("Số từ dài hơn hoặc bằng {n} chữ cái là: {count}");
}

fn count_long_words(text: &str, n: usize) -> usize {
    let bytes = text.as_bytes();
    let mut word_count = 0;
    let mut current_word_len = 0;

    for &b in bytes.iter() {
        if b == b' ' {
            // Khi kết thúc khoảng trắng, kiểm tra lẹ cái nào lớn hơn hoặc bằng n thì ghi lại!
            if current_word_len >= n {
                word_count += 1;
            }
            current_word_len = 0;
        } else {
            // Đang nằm trong từ thì cộng dần chiều dài
            current_word_len += 1;
        }
    }
    
    // Nhớ kiểm tra vòng từ cuối cùng (coi chừng nó không kết thúc bằng khoảng trắng!)

    word_count
}
`,
  expectedOutput: 'Số từ dài hơn hoặc bằng 4 chữ cái là: 5'
};
