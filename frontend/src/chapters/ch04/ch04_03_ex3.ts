import { Lesson } from '../../courses';

export const ch04_03_ex3: Lesson = {
    id: 'ch04_03_ex3',
    title: 'Bài tập Khó: Longest Substring Without Repeating',
    duration: '15 phút',
    type: 'practice',
    content: `
<p>Đã đến lúc dùng các kỹ năng của dòng lệnh kết hợp lại! Bạn hãy tìm thuật toán trả về <strong>độ dài</strong> của phần cắt mảng (substring / slice ngắn) dài nhất không lặp lại bất kì kí tự nào.</p>

<h3 class="task-heading">Yêu cầu:</h3>
<p>Hàm <code>length_of_longest_substring</code> sẽ nhận một <code>&str</code>. Bạn cần duyệt qua chuỗi bằng <code>.as_bytes()</code> để kiểm tra. Cụ thể với chuỗi <code>"abcabcbb"</code>, đáp án là <code>"abc"</code> nên có chiều dài là 3. Với <code>"pwwkew"</code>, đáp án là <code>"wke"</code> nên chiều dài là 3.</p>
`,
  defaultCode: `fn main() {
    let test_str = "abcabcbb";
    let test_str2 = "pwwkew";
    
    println!("Độ dài dài nhất (abcabcbb): {}", length_of_longest_substring(test_str));
    println!("Độ dài dài nhất (pwwkew): {}", length_of_longest_substring(test_str2));
}

fn length_of_longest_substring(s: &str) -> usize {
    let bytes = s.as_bytes();
    let mut max_len = 0;
    
    // Gợi ý thuật toán: Sliding window (Hai con trỏ)
    for i in 0..bytes.len() {
        let mut curr_window_chars = [0; 256];
        let mut current_len = 0;
        
        for j in i..bytes.len() {
            let char_idx = bytes[j] as usize;
            if curr_window_chars[char_idx] == 1 {
                break;
            }
            curr_window_chars[char_idx] = 1;
            current_len += 1;
        }
        
        // Cập nhật max_len nếu current_len lớn hơn
    }
    
    max_len
}
`,
  expectedOutput: 'Độ dài dài nhất (abcabcbb): 3\nĐộ dài dài nhất (pwwkew): 3'
};
