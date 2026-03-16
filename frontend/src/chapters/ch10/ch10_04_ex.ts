import { Lesson } from '../../courses';

export const ch10_04_ex: Lesson = {
    id: 'ch10-04-ex',
    title: '10.4 Thực hành: Trait Bounds',
    duration: '20 phút',
    type: 'exercise',
    content: `
<h2>Thực hành Trait Bounds</h2>
<p>Sử dụng trait bounds để giới hạn generic types.</p>

<h3>Yêu cầu</h3>
<ul>
  <li>Viết function <code>largest_with_default&lt;T: PartialOrd&gt;(list: &[T], default: &T)</code></li>
  <li>Trả về giá trị lớn nhất, nếu slice rỗng thì trả về default</li>
  <li>Sử dụng trait bound <code>Copy</code> để xử lý các kiểu đơn giản</li>
</ul>
`,
    defaultCode: `use std::cmp::PartialOrd;

fn largest_with_default<T: PartialOrd + Copy>(
    list: &[T],
    default: &T
) -> T {
    // TODO: Tìm giá trị lớn nhất, nếu list rỗng trả về default
    unimplemented!()
}

fn main() {
    let numbers = vec![3, 1, 9, 5];
    let result = largest_with_default(&numbers, &0);
    println!("Largest: {result}");

    let empty: Vec<i32> = vec![];
    let result = largest_with_default(&empty, &100);
    println!("Default result: {result}");

    let chars = vec!['a', 'z', 'm'];
    let result = largest_with_default(&chars, &'x');
    println!("Largest char: {result}");
}
`,
    expectedOutput: 'Largest: 9\nDefault result: 100\nLargest char: z'
};
