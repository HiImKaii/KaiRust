import { Lesson } from '../../courses';

export const ch10_02_ex: Lesson = {
    id: 'ch10-02-ex',
    title: '10.2 Thực hành: Generic Structs',
    duration: '20 phút',
    type: 'exercise',
    content: `
<h2>Thực hành Generic Structs</h2>
<p>Định nghĩa một struct generic để lưu trữ cặp key-value.</p>

<h3>Yêu cầu</h3>
<ul>
  <li>Tạo struct <code>Pair&lt;T, U&gt;</code> với hai trường: first (T), second (U)</li>
  <li>Viết method <code>both_equal()</code> kiểm tra xem cả hai giá trị có bằng nhau không</li>
  <li>Viết method <code>both_different()</code> kiểm tra xem cả hai giá trị có khác nhau không</li>
</ul>
`,
    defaultCode: `struct Pair<T, U> {
    first: T,
    second: U,
}

impl<T, U> Pair<T, U> {
    fn new(first: T, second: U) -> Self {
        // TODO: Khởi tạo Pair
        unimplemented!()
    }

    fn both_equal(&self) -> bool {
        // TODO: Kiểm tra first == second (cần T, U implements PartialEq)
        unimplemented!()
    }
}

impl<T: PartialEq, U: PartialEq> Pair<T, U> {
    fn both_different(&self) -> bool {
        // TODO: Kiểm tra first != second
        unimplemented!()
    }
}

fn main() {
    let p1 = Pair::new(5, 5);
    println!("p1 both_equal: {}", p1.both_equal());

    let p2 = Pair::new("hello", "world");
    println!("p2 both_different: {}", p2.both_different());
}
`,
    expectedOutput: 'p1 both_equal: true\np2 both_different: true'
};
