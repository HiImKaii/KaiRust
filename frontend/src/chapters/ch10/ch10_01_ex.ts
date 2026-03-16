import { Lesson } from '../../courses';

export const ch10_01_ex: Lesson = {
    id: 'ch10-01-ex',
    title: '10.1 Thực hành: Generic Functions',
    duration: '20 phút',
    type: 'practice',
    content: `
<h2>Thực hành Generic Functions</h2>
<p>Viết một function generic để tìm giá trị lớn nhất trong một slice.</p>

<h3>Yêu cầu</h3>
<ul>
  <li>Viết function <code>largest&lt;T&gt;</code> nhận vào một slice của kiểu T</li>
  <li>Sử dụng trait <code>PartialOrd</code> để so sánh</li>
  <li>Trả về tham chiếu đến giá trị lớn nhất</li>
</ul>

<h3>Ví dụ</h3>
<pre><code>let numbers = vec![1, 5, 3, 9, 2];
let result = largest(&numbers);
// result = 9</code></pre>
`,
    defaultCode: `fn largest<T: PartialOrd>(list: &[T]) -> Option<&T> {
    // TODO: Viết function tìm giá trị lớn nhất
    unimplemented!()
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    if let Some(result) = largest(&numbers) {
        println!("Giá trị lớn nhất: {result}");
    }

    let chars = vec!['y', 'm', 'a', 'q'];
    if let Some(result) = largest(&chars) {
        println!("Ký tự lớn nhất: {result}");
    }
}
`,
    expectedOutput: 'Giá trị lớn nhất: 100\nKý tự lớn nhất: y'
};
