import { Chapter } from '../courses';

export const ch04: Chapter = {
  id: 'ch04',
  title: 'Chương 4: Hiểu về Ownership',
  lessons: [
    {
      id: 'ch04-01',
      title: '4.1 Ownership là gì?',
      duration: '45 phút',
      type: 'theory',
      content: `
<p><strong>Ownership</strong> (Quyền sở hữu) là tính năng độc đáo nhất của Rust và có ý nghĩa sâu sắc đối với phần còn lại của ngôn ngữ này. Nó cho phép Rust đảm bảo an toàn bộ nhớ (memory safety) mà không cần đến garbage collector (trình thu gom rác), vì vậy việc hiểu cách ownership hoạt động là cực kỳ quan trọng.</p>

<p>Một số ngôn ngữ có garbage collector chạy liên tục để tìm và giải phóng bộ nhớ không còn được sử dụng khi chương trình chạy; trong các ngôn ngữ khác, lập trình viên phải tự cấp phát và giải phóng bộ nhớ một cách rõ ràng. Rust sử dụng một cách tiếp cận thứ ba: bộ nhớ được quản lý thông qua một hệ thống ownership với một tập hợp các quy tắc mà trình biên dịch (compiler) kiểm tra. Nếu bất kỳ quy tắc nào bị vi phạm, chương trình sẽ không được biên dịch (compile). Không có tính năng nào của ownership làm chậm chương trình của bạn khi nó đang chạy.</p>

<h3 class="task-heading">Các quy tắc Ownership (Ownership Rules)</h3>
<p>Hãy ghi nhớ những quy tắc này khi chúng ta tìm hiểu qua các ví dụ minh họa:</p>
<ul class="task-list">
  <li>Mỗi giá trị trong Rust có một <strong>owner</strong> (chủ sở hữu).</li>
  <li>Tại một thời điểm chỉ có thể có <strong>duy nhất một owner</strong>.</li>
  <li>Khi owner ra khỏi <strong>scope</strong> (phạm vi), giá trị sẽ bị <strong>drop</strong> (bị hủy và giải phóng bộ nhớ).</li>
</ul>

<h3 class="task-heading">Stack và Heap</h3>
<p>Trong nhiều ngôn ngữ lập trình, bạn không cần phải suy nghĩ thường xuyên về stack (ngăn xếp) và heap (đống). Nhưng trong một ngôn ngữ lập trình hệ thống (systems programming language) như Rust, việc một giá trị nằm trên stack hay heap ảnh hưởng đến cách ngôn ngữ cư xử và tại sao bạn phải đưa ra những quyết định nhất định.</p>

<p>Cả stack và heap đều là những vùng bộ nhớ mà đoạn code của bạn có thể sử dụng tại thời điểm chạy (runtime), nhưng chúng được cấu trúc theo những cách khác nhau:</p>
<ul class="task-list">
  <li><strong>Stack</strong> lưu trữ các giá trị theo thứ tự mà nó nhận được và loại bỏ các giá trị theo thứ tự ngược lại (LIFO - Last In, First Out). Tất cả dữ liệu được lưu trữ trên stack phải có kích thước cố định và được biết trước.</li>
  <li><strong>Heap</strong> ít được tổ chức hơn: khi bạn đưa dữ liệu lên heap, bạn yêu cầu một lượng không gian nhất định. Bộ cấp phát (allocator) tìm một vùng trống đủ lớn trong heap, đánh dấu nó đang được sử dụng và trả về một con trỏ (pointer), đó là địa chỉ của vị trí đó. Quá trình này được gọi là <i>allocating on the heap</i>.</li>
</ul>

<p>Đẩy dữ liệu vào stack nhanh hơn cấp phát trên heap vì bộ cấp phát không bao giờ phải tìm kiếm nơi lưu trữ dữ liệu mới; dữ liệu đó luôn nằm ở vị trí trên cùng của stack. Tương tự, việc truy cập dữ liệu trong heap chậm hơn so với việc truy cập dữ liệu trên stack vì bạn phải đi theo một con trỏ để tới đó.</p>

<h3 class="task-heading">Phạm vi của Biến (Variable Scope)</h3>
<p>Một scope là phạm vi trong chương trình mà một item là hợp lệ (valid).</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>{                      // s chưa hợp lệ ở đây, nó chưa được khai báo
    let s = "hello";   // s bắt đầu hợp lệ từ điểm này trở đi

    // thực hiện các thao tác với s
}                      // scope hiện tại kết thúc, và s không còn hợp lệ</code></pre>
</div>

<h3 class="task-heading">Kiểu String và Cấp phát Bộ nhớ</h3>
<p>Các kiểu dữ liệu mà chúng ta đã thấy trước đây (như integer) đều có kích thước đã biết, có thể được lưu trữ nhanh chóng và dễ dàng trên stack, và pop khỏi stack khi variable name ra khỏi scope. Nhưng để minh họa quy tắc ownership, chúng ta cần một kiểu dữ liệu phức tạp hơn được phân bổ trên heap, ví dụ như <code>String</code>.</p>

<p>Kiểu string literal (ví dụ <code>let s = "hello";</code>) là bất biến và kích thước của nó phải được biết tại thời điểm biên dịch. Không phải mọi chuỗi giá trị đều như vậy, ví dụ như nội dung mà người dùng nhập vào. Đối với những trường hợp này, Rust có kiểu <code>String</code> thứ hai, được phân bổ trên heap và có thể mở rộng kích thước tại runtime.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s = String::from("hello");
s.push_str(", world!"); // push_str() thêm một literal vào một String
println!("{s}"); // This will print \`hello, world!\`</code></pre>
</div>

<p>Trong Rust, bộ nhớ tự động được trả lại một khi biến sở hữu nó ra khỏi scope. Trình biên dịch Rust tự động gọi một hàm đặc biệt tên là <code>drop</code> tại ký tự ngoặc nhọn đóng <code>}</code>.</p>

<h3 class="task-heading">Các cách tương tác giữa các Variable và Data: Move</h3>
<p>Nhiều biến có thể tương tác với cùng một dữ liệu theo những cách khác nhau trong Rust. Hãy xem một ví dụ bằng cách dùng kiểu integer:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 5;
let y = x;</code></pre>
</div>
<p>Đoạn code trên ràng buộc giá trị <code>5</code> vào <code>x</code>; sau đó tạo một bản sao của giá trị trong <code>x</code> và ràng buộc nó vào <code>y</code>. Chúng ta hiện có hai biến, <code>x</code> và <code>y</code>, và cả hai đều bằng <code>5</code>. Vì integers là những giá trị đơn giản có kích thước đã biết, cố định, cả hai giá trị <code>5</code> đều được đẩy vào stack.</p>

<p>Bây giờ hãy xem xét phiên bản dùng <code>String</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s1 = String::from("hello");
let s2 = s1;</code></pre>
</div>
<p>Nó trông rất giống với đoạn code trước đó, và chúng ta có thể cho rằng cách hoạt động sẽ giống nhau: sao chép giá trị của <code>s1</code> và trỏ <code>s2</code> vào đó. Việc này đúng một phần. <code>String</code> được tạo thành từ ba phần (nằm trên stack): một con trỏ trỏ đến khối nhớ chứa dữ liệu string trên heap, chiều dài (length), và dung lượng (capacity).</p>
<p>Khi ta gán <code>s1</code> cho <code>s2</code>, chỉ có phần metadata trên stack được sao chép (con trỏ, chiều dài, dung lượng). Rust không sao chép dữ liệu thật sự trên heap. Nếu cả <code>s1</code> và <code>s2</code> cùng trỏ đến cùng một vị trí heap, thì khi cả hai ra khỏi scope, cả hai sẽ cố gắng giải phóng cùng một khối nhớ, dẫn đến lỗi <strong>double free</strong> gây nguy hiểm cho an ninh.</p>
<p>Để đảm bảo an toàn bộ nhớ, sau dòng <code>let s2 = s1;</code>, Rust xem như <code>s1</code> không còn hợp lệ nữa. Nghĩa là ownership đã được <strong>move</strong> (di chuyển) từ <code>s1</code> sang <code>s2</code>.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Khái niệm này có vẻ giống <i>shallow copy</i> (sao chép nông), nhưng vì Rust vô hiệu hóa biến đầu tiên, vì vậy nó được gọi là <strong>move</strong>.
</div>

<h3 class="task-heading">Clone (Sao chép sâu)</h3>
<p>Nếu chúng ta <em>thực sự</em> muốn sao chép sâu cả dữ liệu heap của <code>String</code> chứ không chỉ phần metadata trên stack, chúng ta có thể gọi một method thông dụng tên là <code>clone</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s1 = String::from("hello");
let s2 = s1.clone();
println!("s1 = {s1}, s2 = {s2}"); // Cả hai đều hợp lệ</code></pre>
</div>

<h3 class="task-heading">Copy: Dữ liệu trên Stack</h3>
<p>Với các kiểu dữ liệu chỉ lưu trên stack (ví dụ: integer, boolean, float, char), kích thước của chúng được biết trước lúc biên dịch và lưu trữ trên stack nhanh gọn. Do đó, việc sao chép vùng nhớ này luôn nhanh chóng, nên không có lý do gì để ngăn chặn <code>x</code> không còn giá trị sau dòng lệnh <code>let y = x;</code>.</p>
<p>Rust có một trait đặc biệt gọi là <code>Copy</code> được áp đặt cho những type tương tự như integers. Nếu một type hỗ trợ trait <code>Copy</code>, những variables đã gán xong cho biến khác vẫn có thể tiếp tục sử dụng được.</p>

<h3 class="task-heading">Ownership và Functions</h3>
<p>Cơ chế truyền tham số cho function tương tự với những gì xảy ra khi chúng ta gán value cho những biến khác, hoặc là move hoặc là copy.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let s = String::from("hello");  // s trong scope
    takes_ownership(s);             // s bị move vào hàm
    // println!("{s}");             // Gọi dòng này sẽ lỗi! s không còn hợp lệ nữa!

    let x = 5;                      // x trong scope
    makes_copy(x);                  // x copy vào hàm
    println!("{x}");                // Vẫn dùng x bình thường
}

fn takes_ownership(some_string: String) { // some_string nhận ownership
    println!("{some_string}");
} // some_string drop, bộ nhớ heap được giải phóng

fn makes_copy(some_integer: i32) { // some_integer là Copy
    println!("{some_integer}");
} // some_integer đi ra ngoài scope, không có gì lớn lao xảy ra</code></pre>
</div>
`,
      defaultCode: `fn main() {
    // 1. Move
    let s1 = String::from("hello world");
    let s2 = s1; // s1 đã bị move vào s2
    // println!("s1 = {s1}"); // Nếu uncomment dòng này sẽ bị lỗi biên dịch
    println!("s2 = {s2}");

    // 2. Clone (Deep copy)
    let s3 = String::from("hello again");
    let s4 = s3.clone(); 
    println!("s3 = {s3}, s4 = {s4}"); // Cả hai đều in ra kết quả

    // 3. Copy (Stack types)
    let x = 5;
    let y = x; // Copy (vì là kiểu i32)
    println!("x = {x}, y = {y}");

    // 4. Ownership với Functions
    let msg = String::from("Rustacean");
    takes_ownership(msg); // Ownership chuyển sang function
    // println!("msg = {msg}"); // LỖI

    let num = 42;
    makes_copy(num); // Copy vào function, num vẫn dùng được
    println!("num sau khi gọi hàm = {num}");
}

fn takes_ownership(some_string: String) {
    println!("hàm takes_ownership nhận: {some_string}");
}

fn makes_copy(some_i32: i32) {
    println!("hàm makes_copy nhận: {some_i32}");
}
`,
      expectedOutput: 's2 = hello world\ns3 = hello again, s4 = hello again\nx = 5, y = 5\nhàm takes_ownership nhận: Rustacean\nhàm makes_copy nhận: 42\nnum sau khi gọi hàm = 42'
    },
    {
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
    },
    {
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
    }
  ]
};
