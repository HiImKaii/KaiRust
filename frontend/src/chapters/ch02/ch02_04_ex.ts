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
<h3 class="task-heading">Ví dụ Test Cases (LeetCode/HackerRank Style)</h3>
<div class="test-case">
  <h4>Test Case 1: Input với khoảng trắng</h4>
  <pre><code>Input: "  42  "
Expected Output: Số đã parse: 42</code></pre>
</div>
<div class="test-case">
  <h4>Test Case 2: Input không có khoảng trắng</h4>
  <pre><code>Input: "100"
Expected Output: Số đã parse: 100</code></pre>
</div>
<div class="test-case">
  <h4>Test Case 3: Input với newline</h4>
  <pre><code>Input: "7\\n"
Expected Output: Số đã parse: 7</code></pre>
</div>
`,
      defaultCode: `fn main() {
    let guess = "  42  ";

    // TODO: Khai báo lại (shadowing) biến \`guess\` thành kiểu u32
    //       Dùng .trim().parse() để chuyển đổi, và .expect() để báo lỗi nếu sai
    // let guess: u32 = guess.trim().parse().expect("...");

    println!("Số đã parse: {}", guess);
}
`,
      expectedOutput: 'Số đã parse: 42',
      testCases: [
        {
          input: '"  42  "',
          expectedOutput: 'Số đã parse: 42',
          description: 'Parse chuỗi có khoảng trắng thành u32'
        },
        {
          input: '"100"',
          expectedOutput: 'Số đã parse: 100',
          description: 'Parse chuỗi không có khoảng trắng'
        },
        {
          input: '"7\\n"',
          expectedOutput: 'Số đã parse: 7',
          description: 'Parse chuỗi có newline'
        }
      ]
    };
