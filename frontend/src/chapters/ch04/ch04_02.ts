import { Lesson } from '../../courses';

export const ch04_02: Lesson = {
  id: 'ch04-02',
  title: '4.2 References và Borrowing',
  duration: '35 phút',
  type: 'practice',
  content: `
<h3 class="task-heading">Tham chiếu và Mượn (References and Borrowing)</h3>
<p>Vấn đề lớn với code sử dụng tuple ở bài trước là chúng ta phải trả lại <code>String</code> cho hàm gọi để chúng ta vẫn có thể sử dụng <code>String</code> sau khi gọi <code>calculate_length</code>, bởi vì <code>String</code> đó đã bị di chuyển (move) vào trong <code>calculate_length</code>. Thay vào đó, chúng ta có thể cung cấp một <em>tham chiếu</em> (reference) tới <code>String</code>.</p>
<p>Một <strong>tham chiếu</strong> giống như một con trỏ ở chỗ nó là một địa chỉ mà chúng ta có thể đi theo để truy cập dữ liệu được lưu trữ tại địa chỉ đó; dữ liệu đó thuộc sở hữu của một biến khác. Không giống như con trỏ, một tham chiếu được đảm bảo trỏ tới một giá trị hợp lệ của một kiểu dữ liệu cụ thể trong suốt vòng đời của tham chiếu đó.</p>

<p>Đây là cách bạn định nghĩa và sử dụng hàm <code>calculate_length</code> có tham số là tham chiếu tới đối tượng, thay vì chiếm quyền sở hữu (ownership) của giá trị đó:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("Chiều dài của '{s1}' là {len}.");
}

fn calculate_length(s: &String) -> usize {
    s.len()
}</code></pre>
</div>
<p>Trước tiên, lưu ý rằng tất cả mã code tuple cũ trong khai báo biến và giá trị trả về của hàm đã biến mất. Thứ hai, chúng ta truyền <code>&s1</code> vào <code>calculate_length</code> và trong định nghĩa của nó, chúng ta dùng kiểu <code>&String</code> thay vì <code>String</code>. Các dấu và (ampersands) <code>&</code> này đại diện cho <em>tham chiếu</em> (references), cho phép bạn tham chiếu đến một giá trị nào đó mà không chiếm quyền sở hữu của nó.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Ngược lại với tham chiếu bằng <code>&</code> là <em>giải tham chiếu</em> (dereferencing), được thực hiện bằng toán tử giải tham chiếu là dấu sao <code>*</code> (Chúng ta sẽ tìm hiểu kỹ ở Chương 8).
</div>

<p>Cú pháp <code>&s1</code> cho phép ta tạo một tham chiếu nhưng không sở hữu nó. Do không bị sở hữu, giá trị mà nó trỏ tới sẽ không bị drop khi biến tham chiếu đi ra khỏi scope (ngừng sử dụng).</p>
<p>Chúng ta gọi hành động tạo một tham chiếu là <strong>borrowing</strong> (mượn). Giống như trong đời thực, nếu một người sở hữu một thứ gì đó, bạn có thể mượn nó từ họ. Khi dùng xong, bạn phải trả lại. Bạn không hề sở hữu nó.</p>

<p>Vậy điều gì xảy ra nếu chúng ta cố sửa đổi thứ mà chúng ta đang mượn? Phá hỏng cốt truyện: Nó sẽ báo lỗi!</p>
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
<p>Giống như biến (variable) mặc định là bất biến, các tham chiếu cũng vậy. Chúng ta không được phép sửa đổi thứ mà ta đang có tham chiếu tới.</p>

<h3 class="task-heading">Tham chiếu Có thể thay đổi (Mutable References)</h3>
<p>Chúng ta có thể sửa đoạn mã trên để cho phép sửa đổi giá trị đang mượn với một số tinh chỉnh nhỏ, sử dụng tham chiếu có thể thay đổi (mutable reference):</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world"); // BÂY GIỜ THÌ OK
}</code></pre>
</div>
<p>Đầu tiên, chúng ta đổi biến <code>s</code> thành biến <code>mut</code>. Đổi tham chiếu thành <code>&mut s</code> và cập nhật chữ ký hàm (function signature) thành tham số <code>some_string: &mut String</code>.</p>

<p>Tuy nhiên, <strong>Mutable references</strong> (Tham chiếu có thể thay đổi) có một giới hạn rất lớn: Nếu bạn đã có một mutable reference tới một dữ liệu cụ thể, bạn <strong>không thể có thêm bất kỳ</strong> tham chiếu nào khác tới dữ liệu đó trong cùng một scope. Đoạn mã sau đây cố gắng tạo ra hai mutable reference tới <code>s</code> sẽ thất bại:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s = String::from("hello");
let r1 = &mut s;
let r2 = &mut s; // LỖI COMPILE!
println!("{r1}, {r2}");</code></pre>
</div>
<p>Rust ngăn chặn lỗi sử dụng song song cực kì sớm (ở lúc compile). Sự giới hạn này giúp Rust ngăn chặn rủi ro <strong>data races</strong> (xung đột dữ liệu). Xung đột dữ liệu giống như race condition và xảy ra khi thoả mãn đủ 3 điều kiện:</p>
<ul class="task-list">
  <li>Hai hoặc nhiều con trỏ cùng truy cập vào một dữ liệu tại một thời điểm.</li>
  <li>Ít nhất một trong số các con trỏ đang được dùng để ghi (write) vào dữ liệu.</li>
  <li>Không có cơ chế nào để đồng bộ hóa quyền truy cập dữ liệu.</li>
</ul>

<p>Rust cũng áp dụng một quy định tương tự khi kết hợp reference bất biến (immutable) và reference có thể thay đổi (mutable). Mã này cũng sẽ gặp lỗi:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s = String::from("hello");
let r1 = &s; // Không vấn đề (immutable)
let r2 = &s; // Không vấn đề (immutable)
let r3 = &mut s; // VẤN ĐỀ LỚN: vừa mượn bất biến, vừa mượn mutable!
println!("{r1}, {r2}, and {r3}");</code></pre>
</div>
<p>Whew! Ta không thể có một mutable reference trong khi ta đang gửi gắm một immutable reference của chính giá trị ấy cho biến khác. Những người đang sử dụng immutable reference chẳng bao giờ ngờ tới đùng một cái giá trị bên dưới sự bảo hộ của họ bị đổi cái rẹt! Tuy nhiên việc có nhiều immutable reference là hoàn toàn ổn vì chẳng ai đọc dữ liệu mà có thể gây ảnh hưởng đến ai cả.</p>
<div class="cyber-alert info">
  <strong>Vòng đời Reference:</strong> Trình biên dịch Rust rất thông minh, scope của 1 refrence chỉ tính từ lúc nó sinh ra cho đến lần cuối nó bị gọi. Nếu gọi \`println!\` xong đối với các biến bất biến, rồi sau đó mới xài mutable reference thì trình biên dịch vẫn hoan hoan nghênh cho chạy!
</div>

<h3 class="task-heading">Dangling References</h3>
<p>Trong các ngôn ngữ có pointer, rất dễ vô tình tạo ra một <em>dangling pointer</em> (con trỏ lơ lửng) — một con trỏ tham chiếu đến một vị trí trong bộ nhớ đã được chia cho người khác — chỉ vì bạn giải phóng bộ nhớ mà vẫn giữ lại cái pointer đó. Ngược lại trong Rust, compiler đảm bảo reference không bao giờ bị "dangling" lơ lửng: Trình dịch sẽ đảm bảo dữ liệu kia sẽ không bao giờ được ra khỏi scope trước cả cái tham chiếu trỏ tới nó.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String { // dangle hứa trả về reference của 1 chuỗi
    let s = String::from("hello"); // s được sinh ra ở đây
    &s // trả ra tham chiếu của chuỗi này
} // Đoạn cuối hàm: biến s chính thức chết đi vì hết scope, và bộ giữ vùng nhớ heap bị \`drop\` thả về allocator!
  // NGHIÊM TRỌNG: cái được trả ra đang trỏ vào chỗ hư vô! Sẽ bị Compiler Rust ngăn cấm chạy ngay!</code></pre>
</div>
<p>Rust sẽ báo lỗi <code>missing lifetime specifier</code> ngăn cấm lỗi bộ nhớ nghiêm trọng này xảy ra lúc chạy (Runtime) và cấm cản từ trong trứng (Compile time). Giải pháp đúng là hàm trên trả về một String hoàn chỉnh như <code>-> String</code> và bỏ qua bước dùng tham chiếu, quyền sở hữu sẽ theo đúng ý bạn được bắn trả về cái block cha.</p>

<h3 class="task-heading">Các Quy Tắc Cố Định Cần Nhớ Của Tham Chiếu</h3>
<ul class="task-list">
  <li>Tại một thời điểm bất kỳ, bạn có thể có <strong>MỘT</strong> mutable reference (có thể thay đổi), hoặc có <strong>NHIỀU</strong> immutable references (bất biến).</li>
  <li>Các Reference luôn chắc chắn HỢP LỆ (valid).</li>
</ul>
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
