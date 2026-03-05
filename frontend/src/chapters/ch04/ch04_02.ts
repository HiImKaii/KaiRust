import { Lesson } from '../../courses';

export const ch04_02: Lesson = {
      id: 'ch04-02',
      title: '4.2 References và Borrowing',
      duration: '35 phút',
      type: 'practice',
      content: `
<p>Vấn đề lớn nhất với hệ thống ownership trước đó là việc phải trả lại ownership (bằng cách cho function return lại giá trị nó vừa nhận được) mỗi khi chúng ta muốn tiếp tục dùng các biến sau khi gọi một function. Thay vì truyền giá trị trực tiếp để gây ra <i>move</i>, chúng ta có thể dùng <strong>reference</strong> (tham chiếu).</p>

<p>Một <strong>reference</strong> (tham chiếu) giống như một cái pointer ở chỗ nó là một address (địa chỉ) mà chúng ta có thể trỏ tới để lấy nội dung của dữ liệu, dữ liệu này lại được owned (sở hữu) bởi một biến khác. Khác với pointer, một reference được đảm bảo nó đang trỏ đến một valid value với một loại dự liệu xác định của một đời sống (life) cụ thể.</p>

<h3 class="task-heading">Borrowing (Mượn)</h3>
<p>Hành động tạo ra một reference được gọi là <strong>borrowing</strong> (mượn). Giống như trong đời sống thực, nếu ai đó sở hữu một thứ gì đó, bạn có thể mượn nó từ họ. Khi bạn dùng xong, bạn phải trả lại cho họ. Bạn không sở hữu nó.</p>

<p>Đây là cách bạn định nghĩa một function mà paramater nhận reference của một <code>String</code> (tức là <code>&String</code>) thay vì chiếm lấy ownership của nó:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // Truyền reference (mượn) s1
    println!("Độ dài của '{s1}' là {len}.");
}

fn calculate_length(s: &String) -> usize {
    s.len()
} // Vì s là reference không sở hữu dữ liệu, dữ liệu không bị drop khi s ra khỏi scope.</code></pre>
</div>
<p>Các kí hiệu <code>&amp;</code> chính là reference, cho phép các phần khác nhau của code tham chiếu đến giá trị mà không lấy Ownership của nó.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Ngược lại đối với references <code>&amp;</code> chính là <em>dereferencing</em>, kí hiệu là <code>*</code> (sẽ tìm hiểu kĩ ở Chương 8).
</div>

<h3 class="task-heading">Thay đổi giá trị mượn (Mutable References)</h3>
<p>Tương tự như khi các biến bất biến một cách mặc định, reference cũng đóng vai trò là immutable (bất biến) một cách mặc định. Chúng ta không được phép modify một vài thứ mà ta reference đên. Ví dụ sau sẽ bị lỗi biên dịch:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let s = String::from("hello");
    change(&s);
}
fn change(some_string: &String) {
    some_string.push_str(", world"); // LỖI COMPILE! Không thể đổi một borrowed value.
}</code></pre>
</div>

<p>Để sửa, thay vì dùng <code>&String</code>, ta cùng dùng <strong>Mutable Reference</strong> (<code>&mut String</code>) nếu mutable reference đó trỏ đến một mutable variable.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut s = String::from("hello"); // s phải là mut
    change(&mut s); // Truyền dưới dạng &mut
}

fn change(some_string: &mut String) { // Nhận dưới dạng &mut
    some_string.push_str(", world"); // BÂY GIỜ THÌ OK
}</code></pre>
</div>

<h3 class="task-heading">Các quy tắc của Reference và Borrowing</h3>
<p>Mutable references có một giới hạn rất lớn: bạn chỉ có thể tạo <strong>một</strong> mutable reference tới một dữ liệu cụ thể trong cùng một scope. Điều này có nghĩa là bạn không thể mượn mutabel giá trị ở hai nơi cùng lúc. Code sau đây sẽ gây lỗi:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s = String::from("hello");
let r1 = &mut s;
let r2 = &mut s; // LỖI!
println!("{}, {}", r1, r2);</code></pre>
</div>
<p>Sự giới hạn này đem lợi rất nhiều lợi ích khi thay đổi dữ liệu, nhưng Rust buộc bạn phải chú ý quan tâm và cung cấp một cơ chế bảo vệ khỏi những bug cực kì tiềm tàng: <strong>data races</strong> (xung đột dữ liệu).</p>

<p>Một loại xung đột tương tự tồn tại nếu ta kết hợp giữa immutable reference (<code>&T</code>) và mutable reference (<code>&mut T</code>). Ta không thể có một mutable references trong khi có một người khác đã có một immutable reference, bởi vì vì không ai có thể làm việc một cách an toàn nếu thấy dữ liệu đằng dưới reference của mình đang bất chừa bị thay đổi!</p>

<p>Tuy vậy bạn có thể có <strong>nhiều immutable reference</strong> một cách thoải mái (với điều kiện là nó không có gán quyền cho ai mutabel reference trỏ lại vào).</p>
<ul class="task-list">
  <li>Tại mỗi thời điểm, bạn có thể có <strong>MỘT mutable reference</strong> hoặc là <strong>NHIỀU immutable references</strong>.</li>
  <li>Các reference được cam kết là các Reference HỢP LỆ.</li>
</ul>

<h3 class="task-heading">Dangling References</h3>
<p>Một lỗi phổ biến trong các ngôn ngữ có Pointer là tạo ra "Dangling Pointer", đó là một Pointer mà nó trỏ đến một vị trí trên Memory mà dã bị cho một người khác dùng (hoặc trỏ đến null). Tuy nhiên trong Rust, máy compiler đảm bảo là mọi Reference đều không bao giờ "Dangling".</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let reference_to_nothing = dangle();
}
// Trình biên dịch sẽ báo lỗi khi cố trả về một reference tới biến cục bộ s (sẽ bị drop khi dangle kết thúc).
fn dangle() -> &String { 
    let s = String::from("hello");
    &s
}</code></pre>
</div>
`,
      defaultCode: `fn main() {
    // 1. Immutable Borrowing
    let s1 = String::from("Xin chào");
    let len = get_length(&s1); // Mượn s1
    println!("Chiều dài của chuỗi '{s1}' là: {len}"); // Vẫn in được s1 vì nó chỉ được mượn

    // 2. Mutable Borrowing
    let mut s2 = String::from("Xin chao"); // bắt buộc s2 phải là biến mut
    append_world(&mut s2); // Mượn under mutable reference
    println!("Chuỗi s2 sau khi modify: {s2}");

    // 3. Multipe Borrow Rules
    let s3 = String::from("Rustacean");
    let ref1 = &s3; // OK: immutable
    let ref2 = &s3; // OK: immutable
    // let ref3 = &mut s3; // LỖI: Không thể vừa mượn mut, vừa mượn immutable 
    println!("Nhiều borrows: ref1 = {ref1}, ref2 = {ref2}");
    
    // Nếu s3 có mutable ref thì reference kia phải đi ra khỏi scope hoặc sau print
}

fn get_length(s: &String) -> usize {
    s.len()
}

fn append_world(s: &mut String) {
    s.push_str(", Vietnam!");
}
`,
      expectedOutput: 'Chiều dài của chuỗi \'Xin chào\' là: 8\nChuỗi s2 sau khi modify: Xin chao, Vietnam!\nNhiều borrows: ref1 = Rustacean, ref2 = Rustacean'
    };
