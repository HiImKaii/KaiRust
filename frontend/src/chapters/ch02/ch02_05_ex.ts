import { Lesson } from '../../courses';

export const ch02_05_ex: Lesson = {
      id: 'ch02-05-ex',
      title: 'Bài tập 2.5: So sánh Matching',
      duration: '10 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy sử dụng biểu thức <code>match</code> để so sánh hai số!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, tôi đã có <code>guess</code> và <code>secret_number</code>.</li>
  <li>Bạn hãy dùng <code>match guess.cmp(&secret_number)</code> để in ra:</li>
  <ul>
    <li><code>Ordering::Less</code> => "Too small!"</li>
    <li><code>Ordering::Greater</code> => "Too big!"</li>
    <li><code>Ordering::Equal</code> => "You win!"</li>
  </ul>
</ol>
`,
      defaultCode: `use std::cmp::Ordering;

fn main() {
    let guess = 50;
    let secret_number = 77;
    
    // TODO: Dùng biểu thức match để so sánh guess với secret_number:
    // match guess.cmp(&secret_number) {
    //     Ordering::Less => ...,
    //     Ordering::Greater => ...,
    //     Ordering::Equal => ...,
    // }
    
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_match_ordering() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "").replace("\n", "");
        
        assert!(code_clean.contains("Ordering::Less=>println!(\"Toosmall!\")"), "Thiếu trường hợp Less");
        assert!(code_clean.contains("Ordering::Greater=>println!(\"Toobig!\")"), "Thiếu trường hợp Greater");
        assert!(code_clean.contains("Ordering::Equal=>println!(\"Youwin!\")"), "Thiếu trường hợp Equal");
    }
}
`
    };
