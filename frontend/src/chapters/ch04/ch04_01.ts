import { Lesson } from '../../courses';

export const ch04_01: Lesson = {
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
    };
