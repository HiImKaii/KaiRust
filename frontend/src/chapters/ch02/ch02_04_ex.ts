import { Lesson } from '../../courses';

export const ch02_04_ex: Lesson = {
      id: 'ch02-04-ex',
      title: 'Bài tập 2.4: Shadowing và Ép kiểu',
      duration: '10 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy thực hành Shadowing để chuyển đổi kiểu dữ liệu!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tôi có sẵn biến <code>guess</code> là một chuỗi <code>"  42  "</code>.</li>
  <li>Bạn hãy tạo một biến <code>guess</code> mới (shadowing) với kiểu <code>u32</code>.</li>
  <li>Sử dụng các phương thức <code>.trim()</code> và <code>.parse()</code> để chuyển đổi chuỗi đó thành số.</li>
  <li>Sử dụng <code>.expect()</code> để xử lý lỗi nếu không parse được.</li>
</ol>
`,
      defaultCode: `fn main() {
    let guess = "  42  ";
    
    // TODO: Khai báo lại (shadowing) biến \`guess\` thành kiểu u32
    //       Dùng .trim().parse() để chuyển đổi, và .expect() để báo lỗi nếu sai
    // let guess: u32 = ...
    
    println!("Số đã parse: {}", guess);
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_shadowing_parse() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "");
        
        let has_shadowing = code_clean.contains("letguess:u32=guess.trim().parse().expect(");
        assert!(has_shadowing, "Bạn chưa thực hiện shadowing đúng cách: 'let guess: u32 = guess.trim().parse().expect(...);'");
    }
}
`
    };
