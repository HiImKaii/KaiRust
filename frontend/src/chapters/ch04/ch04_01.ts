import { Lesson } from '../../courses';

export const ch04_01: Lesson = {
  id: 'ch04-01',
  title: '4.1 Ownership là gì?',
  duration: '45 phút',
  type: 'theory',
  content: `
<h3 class="task-heading">Ownership Là Gì? (What Is Ownership?)</h3>
<p><em>Ownership</em> (Quyền sở hữu) là một tập hợp các quy tắc chi phối cách một chương trình Rust quản lý bộ nhớ. Tất cả các chương trình đều phải quản lý cách chúng sử dụng bộ nhớ của máy tính trong khi chạy. Một số ngôn ngữ có tính năng thu gom rác (garbage collection) liên tục tìm kiếm bộ nhớ không còn được sử dụng khi chương trình chạy; ở các ngôn ngữ khác, lập trình viên phải tự cấp phát và giải phóng bộ nhớ một cách tường minh. Rust sử dụng một cách tiếp cận thứ ba: Bộ nhớ được quản lý thông qua một hệ thống ownership với một bộ quy tắc mà trình biên dịch (compiler) kiểm tra. Nếu bất kỳ quy tắc nào bị vi phạm, chương trình sẽ không thể biên dịch. Không có tính năng nào của ownership sẽ làm chậm chương trình của bạn trong khi nó đang chạy.</p>
<p>Vì ownership là một khái niệm mới đối với nhiều lập trình viên, nó đòi hỏi một chút thời gian để làm quen. Tin tốt là khi bạn càng có kinh nghiệm với Rust và các quy tắc của hệ thống ownership, bạn sẽ càng thấy dễ dàng hơn trong việc phát triển các đoạn code vừa an toàn vừa hiệu quả một cách tự nhiên. Hãy kiên trì nhé!</p>
<p>Khi bạn hiểu về ownership, bạn sẽ có một nền tảng vững chắc để hiểu các tính năng làm nên sự độc đáo của Rust. Trong chương này, bạn sẽ học về ownership thông qua một số ví dụ tập trung vào một cấu trúc dữ liệu rất phổ biến: chuỗi (strings).</p>

<div class="cyber-alert info">
  <strong>Stack và Heap</strong><br>
  Nhiều ngôn ngữ lập trình không yêu cầu bạn phải suy nghĩ về stack và heap quá thường xuyên. Nhưng trong một ngôn ngữ lập trình hệ thống như Rust, việc một giá trị nằm trên stack (ngăn xếp) hay heap (đống bộ nhớ) ảnh hưởng đến cách ngôn ngữ hoạt động và lý do tại sao bạn phải đưa ra những quyết định nhất định.
  <br><br>
  Cả stack và heap đều là những phần của bộ nhớ có sẵn cho code của bạn sử dụng tại runtime, nhưng chúng được tổ chức theo những cách khác nhau. Stack lưu trữ các giá trị theo thứ tự nó nhận được và loại bỏ theo thứ tự ngược lại (LIFO - Last In, First Out). Mọi dữ liệu lưu trên stack phải có <strong>kích thước cố định và được biết trước</strong>. Dữ liệu có kích thước không xác định tại thời điểm biên dịch hoặc có kích thước có thể thay đổi phải được lưu trữ trên heap.
  <br><br>
  Heap thì ít quy củ hơn: Khi bạn đưa dữ liệu lên heap, bạn yêu cầu một lượng không gian nhất định. Bộ cấp phát bộ nhớ (memory allocator) tìm một khoảng trống đủ lớn trong heap, đánh dấu nó đang được sử dụng và trả về một <em>pointer</em> (con trỏ), là địa chỉ của vị trí đó. Việc đẩy dữ liệu vào stack nhanh hơn cấp phát trên heap. Truy cập dữ liệu trong heap cũng chậm hơn so với stack vì bạn phải đi theo con trỏ.
</div>

<h3 class="task-heading">Các Quy Tắc Ownership (Ownership Rules)</h3>
<p>Đầu tiên, hãy xem qua các quy tắc của ownership. Hãy ghi nhớ những quy tắc này khi chúng ta làm việc qua các ví dụ minh họa:</p>
<ul class="task-list">
  <li>Mỗi giá trị trong Rust có một <strong>owner</strong> (chủ sở hữu).</li>
  <li>Tại một thời điểm chỉ có thể có <strong>duy nhất một owner</strong>.</li>
  <li>Khi owner đi ra khỏi <strong>scope</strong> (phạm vi), giá trị sẽ bị <strong>drop</strong> (bị huỷ/giải phóng).</li>
</ul>

<h4>Phạm Vi Biến (Variable Scope)</h4>
<p>Một scope (phạm vi) là khoảng mã trong chương trình mà một mục (item) là hợp lệ.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>{                      // s không hợp lệ ở đây, vì nó chưa được khai báo
    let s = "hello";   // s hợp lệ từ điểm này trở đi

    // làm gì đó với s
}                      // scope này lúc này đã kết thúc, và s không còn hợp lệ nữa</code></pre>
</div>
<p>Có hai mốc thời gian quan trọng: Khi <code>s</code> đi vào scope, nó hợp lệ. Nó vẫn hợp lệ cho đến khi đi ra khỏi scope.</p>

<h3 class="task-heading">Kiểu Dữ Liệu String</h3>
<p>Để minh họa các quy tắc về ownership, chúng ta cần một kiểu dữ liệu phức tạp hơn những kiểu ta đã đề cập ở Chương 3. Các kiểu trước đó đều có kích thước đã biết, có thể lưu trữ trên stack, và có thể sao chép nhanh chóng, đơn giản. Chúng ta muốn xem xét dữ liệu được lưu trữ trên heap và khám phá cách Rust biết khi nào cần làm sạch dữ liệu đó, và kiểu <code>String</code> là một ví dụ tuyệt vời.</p>
<p>Chúng ta đã thấy các chuỗi ký tự dạng chữ (string literals) <code>"hello"</code> ở nơi giá trị chuỗi được gõ cứng (hardcoded) vào chương trình. String literal rất tiện lợi, nhưng không thể thoả mãn mọi tình huống dùng chuỗi, vì nó <em>bất biến</em> (immutable) và chỉ dành cho dạng văn bản đã biết trước khi biên dịch. Nếu ta muốn lưu lại nhập liệu của người dùng thì sao? Rust hỗ trợ kiểu <code>String</code> thứ hai, quản lý dữ liệu trên heap, vì vậy nó có thể lưu trữ lượng văn bản chưa biết trước.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s = String::from("hello");
s.push_str(", world!"); // push_str() thêm string literal vào một String
println!("{s}"); // In ra \`hello, world!\`</code></pre>
</div>

<h4>Bộ Nhớ và Cấp Phát (Memory and Allocation)</h4>
<p>Trong trường hợp của <code>String</code>, để hỗ trợ một đoạn văn bản có thể thay đổi và mở rộng, chúng ta cần cấp phát một lượng bộ nhớ trên heap (chưa biết ở thời điểm compile) để chứa nội dung. Điều này có nghĩa là:</p>
<ul class="task-list">
  <li>Bộ nhớ phải được yêu cầu từ bộ cấp phát bộ nhớ tại runtime. (Ta làm điều này qua <code>String::from</code>)</li>
  <li>Chúng ta cần một mốc để <strong>trả lại</strong> bộ nhớ này cho bộ cấp phát khi chúng ta dùng xong <code>String</code>.</li>
</ul>
<p>Trong hầu hết các ngôn ngữ không có GC (Garbage Collector), chúng ta phải tự code thủ công lệnh gọi hàm giải phóng (như <code>free</code>). Rust đi theo một con đường khác: Bộ nhớ tự động được trả lại khi biến sở hữu nó đi ra khỏi scope. Tại dấu ngoặc nhọn đóng, Rust tự động gọi một hàm đặc biệt mang tên <code>drop</code> để đưa cho tác giả của String thực thi code trả lại bộ nhớ vào đó.</p>

<h3 class="task-heading">Sự Tương Tác Của Biến Với Dữ Liệu: Move</h3>
<p>Nhiều biến có thể tương tác với cùng một dữ liệu theo những cách khác nhau trong Rust. Hãy xem một ví dụ bằng số nguyên:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 5;
let y = x;</code></pre>
</div>
<p>Đoạn code trên "Gắn giá trị 5 cho <code>x</code>; sau đó tạo một bản sao của <code>x</code> và gắn vào <code>y</code>". Bây giờ ta có <code>x</code> và <code>y</code> đều bằng 5, được đẩy lên stack do kiểu số nguyên có kích thước nhỏ cố định.</p>

<p>Giờ hãy xem phiên bản dùng <code>String</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s1 = String::from("hello");
let s2 = s1;</code></pre>
</div>
<p>Nó trông rất giống, nhưng cách hoạt động lại khác. <code>String</code> được tạo thành từ 3 phần nằm trên stack: một con trỏ (pointer) trỏ tới bộ nhớ heap chứa nội dung, phần chiều dài (length) và phần dung lượng (capacity). Dữ liệu văn bản "hello" thực sự nằm trên heap.</p>
<p>Khi ta gán <code>s1</code> cho <code>s2</code>, dữ liệu của <code>String</code> được sao chép. Nghĩa là chúng ta sao chép pointer, length và capacity trên stack. Chúng ta <strong>không</strong> sao chép dữ liệu trên heap mà con trỏ đang trỏ tới. Nếu Rust copy cả dữ liệu trên heap, khi chuỗi rất dài độ trễ phép gán sẽ rất kinh khủng!</p>
<p>Tuy nhiên, vì có 2 con trỏ cùng chỉ vào một khối heap, nếu cả <code>s1</code> và <code>s2</code> đi ra ngoài scope và cố gắng gọi hàm <code>drop</code> giải phóng vùng nhớ, nó sẽ tạo ra kẹt bộ nhớ tên là <em>lỗi giải phóng kép (double free error)</em> gây hỏng bộ nhớ và nguy cơ bảo mật. Để giải quyết, sau khi lệnh <code>let s2 = s1;</code> chạy, Rust xem như <code>s1</code> <strong>không còn hợp lệ (invalidated)</strong>. Nhờ vậy, đi ra khỏi scope <code>s1</code> không cần giải phóng bộ nhớ gì cả.</p>

<p>Việc sao chép con trỏ, length và capacity mà không sao chép dữ liệu có vẻ giống "shallow copy" (sao chép nông), nhưng vì Rust vô hiệu hóa luôn biến đầu tiên, quá trình này gọi là <strong>Move (Di chuyển)</strong>. Ta nói <code>s1</code> đã bị di chuyển vào <code>s2</code>.</p>

<h4>Sự Tương Tác Của Biến Với Dữ Liệu: Clone</h4>
<p>Nếu chúngtrong ta <em>thực sự</em> muốn sao chép sâu (deep copy) dữ liệu trên heap của <code>String</code>, ta có thể dùng phương thức mang tên <code>clone</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s1 = String::from("hello");
let s2 = s1.clone();
println!("s1 = {s1}, s2 = {s2}");</code></pre>
</div>
<p>Phương thức này sẽ tốn tài nguyên runtime nếu đoạn text dài thòng lòng, nhưng là cách để bạn nói rõ "Tôi thực sự muốn một vùng nhớ heap độc lập mới".</p>

<h4>Dữ Liệu Chỉ Trên Stack: trait Copy</h4>
<p>Quay lại với ví dụ <code>let x = 5; let y = x;</code>. Giá trị số nguyên có kích thước đã biết lúc compile, nó nằm hoàn toàn trên stack, nên copy dữ liệu trên stack cũng nhanh y chang chép pointer con trỏ vậy. Chẳng có lý do tại sao Rust phải vô hiệu lực biến <code>x</code> sau khi gán. Do đó, các kiểu dữ liệu trên stack của Rust được gắn một <em>Trait</em> có tên <code>Copy</code>. Các kiểu biến vô biến như số tham chiếu (như các kiểu số nguyên, boolean, ký tự char, hay tuple chứa chúng) như mang dòng máu bất biến, nó sẽ tự động được copy mà biến cũ vẫn giữ nguyên tính hợp lệ.</p>

<h3 class="task-heading">Ownership và Hàm (Functions)</h3>
<p>Cơ chế truyền một giá trị cho đối số của hàm tương tự với việc gán một giá trị vào một biến. Truyền biến vào hàm sẽ kéo theo hành động copy hoặc move, y chang như phép gán.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let s = String::from("hello");  // s đi vào scope
    takes_ownership(s);             // s's value HOÀN TOÀN di chuyển vào (move) hàm...
                                    // ... thế nên s KHÔNG CÒN hợp lệ ở dòng sau nữa.
                                    
    let x = 5;                      // x đi vào scope
    makes_copy(x);                  // Bởi vì i32 có trait Copy, giá trị x được copy,
                                    // thế nên x vẫn rất hợp lệ và xài thoải mái ở dưới.
} 

fn takes_ownership(some_string: String) { // some_string đi vào scope
    println!("{some_string}");
} // ở đây, some_string đi ra khỏi scope và hàm \`drop\` được gọi.
  // Bộ nhớ heap phía sau được giải phóng.

fn makes_copy(some_integer: i32) { // some_integer đi vào scope
    println!("{some_integer}");
} // ở đây, some_integer đi ra khỏi scope. Không có chuyện gì xảy ra cả.</code></pre>
</div>

<h3 class="task-heading">Giá Trị Trả Về và Scope (Return Values and Scope)</h3>
<p>Trả về một giá trị từ hàm cũng tuân thủ việc trao đổi (transfer) ownership và move một biến bình thường ra khỏi scope nó đang nằm.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let s1 = gives_ownership();         // gives_ownership return và move kết quả vào s1
    let s2 = String::from("hello");     // s2 đi vào scope
    let s3 = takes_and_gives_back(s2);  // s2 bị di chuyển vào hàm, hàm sau đó di chuyển giá trị trả về vào s3
} // s3 drop. s2 từng bị di chuyển nên ko có gì xảy ra. s1 drop.

fn gives_ownership() -> String {
    let some_string = String::from("yours");
    some_string                         // trả ra và move thẳng ra hàm bên ngoài gọi nó
}

fn takes_and_gives_back(a_string: String) -> String {
    a_string                            // a_string được move trả hẳn ra ngoài
}</code></pre>
</div>
<p>Mỗi lần đưa giá trị vào hàm rồi lại phải bắt hàm nhả ra để lấy lại ownership thật mệt mỏi! Nếu muốn hàm dùng giá trị mà không lấy ownership thì sao? Rust cho phép lấy kết quả bằng tham chiếu mà không chuyển ownership: tính năng đó gọi là References. Ta sẽ học ở bài sau.</p>
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
