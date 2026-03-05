import { Lesson } from '../../courses';

export const ch04_03: Lesson = {
      id: 'ch04-03',
      title: '4.3 Kiểu Slice (Slice Type)',
      duration: '25 phút',
      type: 'practice',
      content: `
<p><strong>Slices</strong> (cắt mảng) cho phép bạn reference (tham chiếu) đến một chuỗi phân tử liên tiếp bên trong collection chứ không phải đến toàn bộ collection. Slice là một kiểu tham chiếu, do đó nó tuân theo ownership flow ở 4.2 và nó không có Ownership của dữ liệu gốc.</p>

<p>Hãy xem xét một bài toán đơn giản: viết hàm để nhận vào một string và trả về một từ đầu tiên nó tìm thấy trong string đó. (Từ là các kí tự ngăn cách với nhau bởi dấu cách). Nếu từ không có dấu cách nào có nghĩa là cả string là một từ, hàm trả vể trả string thay đó.</p>

<h3 class="task-heading">String Slices (Kiểu đoạn String: &str)</h3>
<p>Một <strong>string slice</strong> cũng là môt chiếc reference đến một thành phần bên trong một <code>String</code>. Nhìn như vầy:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];</code></pre>
</div>
<p>Thay vì Reference trên toàn bộ <code>String</code> s thông thường, thì nó tạo một thẻ từ index thứ 0 đến 5. Vùng tham chiếu được truyền vào thông qua cú pháp <code>[starting_index..ending_index]</code> (bắt đầu từ starting_index và chạy đến trước ending_index). Kích thước của mảng slice (cắt) là ending_index - starting_index. </p>

<p>Chú ý đến dấu bằng:</p>
<ul class="task-list">
  <li>Nếu đi từ element bắt đầu (Index = 0), bạn có thể lờ đi 0. Viết cho nhanh: <code>&s[..5]</code> bằng với <code>&s[0..5]</code>.</li>
  <li>Giống như, nếu bỏ index điểm kết thúc, mảng sẽ slice đến độ dài string hiện có. Viết <code>&s[6..]</code> bằng với <code>&s[6..len]</code>.</li>
  <li>Để lấy hết mảng từ đầu tới cuổi, có thể lờ đi cả hai: <code>&s[..]</code></li>
</ul>

<h3 class="task-heading">Giải thoát bài toán ban đầu</h3>
<p>Bằng cách sử dụng Slice (đại diện <code>&str</code>), chung ta có thể viết được một function trả về "từ đầu tiên" cực ngon và hiệu quả:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes(); // chuyển thành mảng bytes để dễ tìm kiếm ' ' hơn
    
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' { // b' ' là byte literal đại diện dấu khoảng trắng
            return &s[0..i];
        }
    }
    &s[..] // không có khoảng trắng thì trả về nguyên chuỗi ban đầu
}</code></pre>
</div>
<p>Sử dụng string slice giúp chúng ta tránh phải truyển tham biến index (ví dụ: dùng <code>usize</code> để return index của dấu cách tìm thâý - điều này gây lỗi cực kì cao nếu String bị edit).</p>

<div class="cyber-alert info">
  <strong>Mẹo:</strong> String literal (như <code>let s = "Hello, world!";</code>) vốn dĩ là một kiểu Slice (<code>&str</code>) trỏ trực tiếp đến binary memory. Đó là lý do literal string là Immutable! Nên khi sử dụng <code>&str</code> làm đối số cho function của bạn, thì Function bạn viết cực kì linh hoạt — bởi vì nó nhận vào cả <code>&String</code> lẫn string literal (<code>&str</code>) !
</div>

<h3 class="task-heading">Các Slices khác (Other Slices)</h3>
<p>Slice không chỉ dành cho <code>String</code>, nó dùng cho mọi loại Array / Vector khác.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let a = [1, 2, 3, 4, 5]; // Array
let slice = &a[1..3];
assert_eq!(slice, &[2, 3]);</code></pre>
</div>
<p>Slice <code>slice</code> có type là <code>&[i32]</code>. Nó hoạt động với cơ chế giống hêt: lấy một reference chỉ đến phần tử bắt đầu của mảng, kèm với chiều dài của đoạn Slice. Tất cả nhung Collection Arrays/Vectors đêù dùng y chan nhau.</p>
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
