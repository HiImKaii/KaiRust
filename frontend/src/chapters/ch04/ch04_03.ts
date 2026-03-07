import { Lesson } from '../../courses';

export const ch04_03: Lesson = {
  id: 'ch04-03',
  title: '4.3 Kiểu Slice (Slice Type)',
  duration: '25 phút',
  type: 'practice',
  content: `
<p><strong>Slices</strong> (Phần cắt/mảnh cắt) cho phép bạn tham chiếu đến một chuỗi các phần tử liền kề nhau bên trong một tập hợp (collection) thay vì tham chiếu đến toàn bộ tập hợp đó. Slice là một kiểu tham chiếu, do đó nó không có quyền sở hữu (ownership).</p>

<p>Hãy xem xét một bài toán lập trình nhỏ: Viết một hàm nhận vào một chuỗi các từ phân tách nhau bằng dấu cách và trả về từ đầu tiên nó tìm thấy trong chuỗi đó. Nếu hàm không tìm thấy khoảng trắng nào, nghĩa là toàn bộ chuỗi chỉ có một từ, thì nó sẽ trả về toàn bộ chuỗi.</p>

<p>Chúng ta thử viết hàm này mà không dùng slice, kết quả trả về là một chỉ số (index) kết thúc chữ:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn first_word(s: &String) -> usize {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return i;
        }
    }
    s.len()
}</code></pre>
</div>
<p>Bởi vì chúng ta cần duyệt qua <code>String</code> từng phần tử một để kiểm tra khoảng trắng, chúng ta chuyển <code>String</code> thành một mảng các byte bằng phương thức <code>as_bytes</code>. Sau đó tạo một iterator trên mảng byte bằng <code>iter().enumerate()</code> để lấy ra tuple chứa (vị trí_index, tham_chiếu_đến_phần_tử).</p>
<p>Bây giờ chúng ta đã có cách tìm ra chỉ số kết thúc của từ đầu tiên, nhưng có một vấn đề: hàm đang trả về một số <code>usize</code> độc lập. Nó chỉ mang ý nghĩa khi đi kèm với <code>&String</code> ban đầu. Nếu <code>String</code> gốc bị xóa đi (ví dụ gọi <code>s.clear()</code>), số <code>usize</code> này vẫn không thay đổi, mặc dù nó đã hoàn toàn vô giá trị và việc sử dụng nó có thể dẫn đến bug.</p> 

<h3 class="task-heading">String Slices (Slice Chuỗi)</h3>
<p>Một <strong>string slice</strong> (slice của chuỗi) là một tham chiếu đến một phần các phần tử liên tiếp của một <code>String</code>, nó trông như thế này:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];</code></pre>
</div>
<p>Thay vì tham chiếu đến toàn bộ <code>String</code>, <code>hello</code> là tham chiếu đến một phần được chỉ định trong khoảng <code>[0..5]</code>. Chúng ta tạo ra slice bằng cách sử dụng dấu ngoặc vuông <code>[starting_index..ending_index]</code>, trong đó điểm bắt đầu (starting_index) là phần tử đầu tiên của slice, còn điểm kết thúc (ending_index) sẽ bằng phần tử cuối của slice cộng thêm 1. Về mặt cấu trúc, một string slice lưu trữ vị trí bắt đầu và độ dài (bằng ending_index trừ starting_index).</p>

<p>Cú pháp dãy <code>..</code> (range) trong Rust có một số cú pháp viết tắt:</p>
<ul class="task-list">
  <li>Nếu muốn bắt đầu từ index 0, bạn có thể bỏ qua số đằng trước hai dấu chấm: <code>&s[..2]</code> bằng với <code>&s[0..2]</code>.</li>
  <li>Nếu slice của bạn bao gồm byte cuối cùng của <code>String</code>, bạn có thể bỏ số đằng sau: <code>&s[3..]</code> bằng với <code>&s[3..s.len()]</code>.</li>
  <li>Bạn có thể bỏ cả hai giá trị để slice toàn bộ chuỗi: <code>&s[..]</code>.</li>
</ul>

<h3 class="task-heading">Giải thoát bài toán ban đầu</h3>
<p>Với các thông tin này, hãy viết lại hàm <code>first_word</code> để trả về một slice. Kiểu dữ liệu đại diện cho "string slice" được viết là <code>&str</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}</code></pre>
</div>
<p>Khi gọi hàm này, chúng ta nhận được một giá trị duy nhất liên kết chặt chẽ với dữ liệu gốc. Giờ đây, compiler sẽ đảm bảo các tham chiếu này luôn hợp lệ! Nếu chúng ta cố tình "clear" chuỗi sau khi đã lấy slice từ nó, chương trình sẽ báo lỗi tại lúc compile do quy tắc mượn: ta không thể dùng tham chiếu thay đổi (ở phương thức clear) khi đang có tham chiếu bất biến (ở slice) hiện diện.</p>

<div class="cyber-alert info">
  <strong>Mẹo: Chuỗi ký tự (String Literals) cũng chính là Slices!</strong><br>
  Khi bạn khai báo <code>let s = "Hello, world!";</code>, kiểu của <code>s</code> chính là <code>&str</code>. Nó là một slice trỏ đến vùng dữ liệu cứng đặc thù nằm bên trong file nhị phân của chương trình. Điều này giải thích tại sao string literal lại là bất biến: <code>&str</code> là một tham chiếu bất biến (immutable reference).
</div>

<h4>Slices dưới dạng Tham Số</h4>
<p>Thay vì dùng <code>&String</code> làm tham số, thực ra dùng <code>&str</code> cho hàm của bạn lại tốt hơn rất nhiều:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn first_word(s: &str) -> &str { ... }</code></pre>
</div>
<p>Cách viết này linh hoạt hơn (vì nó cho phép truyền <code>&str</code> lẩn <code>&String</code>) mà hoàn toàn không đánh đổi bất kỳ tính năng nảo.</p>

<h3 class="task-heading">Các Loại Slices Khác (Other Slices)</h3>
<p>String slice hiển nhiên được sinh ra cho các chuỗi. Nhưng có một kiểu slice tổng quát (generic) hơn. Hãy xem xét mảng (array) này:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let a = [1, 2, 3, 4, 5]; // Mảng i32
let slice = &a[1..3];
assert_eq!(slice, &[2, 3]);</code></pre>
</div>
<p><code>slice</code> ở đây có kiểu <code>&[i32]</code>. Nó hoạt động y hệt string slice, bằng cách lưu trữ một tham chiếu tới phần tử đầu tiên và thông tin chiều dài. Bạn sẽ dùng loại slice này cho đủ các kiểu Collection khác (sẽ đi sâu vào Chương 8 Vector).</p>
`,
  defaultCode: `fn main() {
    // 1. String Slices
    let s = String::from("hello world");
    
    let hello = &s[0..5]; // Lấy slice "hello"
    let world = &s[6..11]; // Lấy slice "world"
    
    // Viết tắt
    let hello_fast = &s[..5]; 
    let world_fast = &s[6..];
    
    println!("Slices: {hello} and {world}");
    println!("Fast Slices: {hello_fast} and {world_fast}");

    // 2. Calling first_word
    let my_str = String::from("Rust programming is fun");
    let word1 = first_word(&my_str); // truyền &String
    println!("Từ đầu tiên của my_str: {word1}");

    let literal_str = "Kaitovu là đỉnh cao";
    let word2 = first_word(literal_str); // truyền &str (literal)
    println!("Từ đầu tiên của string literal: {word2}");

    // 3. Array Slices
    let numbers = [10, 20, 30, 40, 50];
    let slice_of_nums = &numbers[1..4]; // từ index 1 tới 3
    println!("Array slice: {:?}", slice_of_nums);
}

// Chấp nhận &str sẽ tốt hơn &String (linh hoạt hơn)
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}
`,
  expectedOutput: 'Slices: hello and world\nFast Slices: hello and world\nTừ đầu tiên của my_str: Rust\nTừ đầu tiên của string literal: Kaitovu\nArray slice: [20, 30, 40]'
};
