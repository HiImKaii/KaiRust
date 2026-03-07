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
<h3 class="task-heading">Ví dụ Test Cases (LeetCode/HackerRank Style)</h3>
<div class="test-case">
  <h4>Test Case 1: guess &lt; secret_number</h4>
  <pre><code>Input: guess = 50, secret_number = 77
Expected Output: Too small!</code></pre>
</div>
<div class="test-case">
  <h4>Test Case 2: guess &gt; secret_number</h4>
  <pre><code>Input: guess = 100, secret_number = 50
Expected Output: Too big!</code></pre>
</div>
<div class="test-case">
  <h4>Test Case 3: guess == secret_number</h4>
  <pre><code>Input: guess = 42, secret_number = 42
Expected Output: You win!</code></pre>
</div>
`,
      defaultCode: `use std::cmp::Ordering;

fn main() {
    let guess = 50;
    let secret_number = 77;

    // TODO: Dùng biểu thức match để so sánh guess với secret_number:
    // match guess.cmp(&secret_number) {
    //     Ordering::Less => println!("Too small!"),
    //     Ordering::Greater => println!("Too big!"),
    //     Ordering::Equal => println!("You win!"),
    // }

}
`,
      expectedOutput: 'Too small!',
      testCases: [
        {
          input: 'guess = 50, secret_number = 77',
          expectedOutput: 'Too small!',
          description: 'Khi guess nhỏ hơn secret_number, in "Too small!"'
        },
        {
          input: 'guess = 100, secret_number = 50',
          expectedOutput: 'Too big!',
          description: 'Khi guess lớn hơn secret_number, in "Too big!"'
        },
        {
          input: 'guess = 42, secret_number = 42',
          expectedOutput: 'You win!',
          description: 'Khi guess bằng secret_number, in "You win!"'
        }
      ]
    };
