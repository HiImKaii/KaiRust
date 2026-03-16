import { Lesson } from '../../courses';

export const ch10_05_ex: Lesson = {
    id: 'ch10-05-ex',
    title: '10.5 Thực hành: Lifetimes',
    duration: '25 phút',
    type: 'exercise',
    content: `
<h2>Thực hành Lifetimes</h2>
<p>Sử dụng lifetimes để đảm bảo tham chiếu luôn hợp lệ.</p>

<h3>Yêu cầu</h3>
<ul>
  <li>Viết function <code>longest&lt;'a&gt;(x: &amp;'a str, y: &amp;'a str) -> &amp;'a str</code></li>
  <li>Trả về tham chiếu đến chuỗi dài hơn</li>
  <li>Function này cần lifetime annotation vì nó trả về tham chiếu</li>
</ul>

<h3>Lưu ý</h3>
<p>Lifetime 'a đảm bảo rằng tham chiếu trả về sẽ hợp lệ ít nhất bằng thời gian sống ngắn nhất của hai tham chiếu đầu vào.</p>
`,
    defaultCode: `// TODO: Định nghĩa function longest với lifetime annotation
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    // TODO: Trả về chuỗi dài hơn
    unimplemented!()
}

fn main() {
    let string1 = String::from("hello world");
    let string2 = String::from("rust");

    let result = longest(string1.as_str(), string2.as_str());
    println!("Chuỗi dài hơn: {}", result);

    // Test với string ngắn hơn
    let string3 = "short";
    let string4 = "longer string";
    let result2 = longest(string3, string4);
    println!("Chuỗi dài hơn: {}", result2);
}
`,
    expectedOutput: 'Chuỗi dài hơn: hello world\nChuỗi dài hơn: longer string'
};
