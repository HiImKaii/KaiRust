import { Lesson } from '../../courses';

export const ch02_02: Lesson = {
      id: 'ch02-02',
      title: '2.2 Xử lý một Dự đoán',
      duration: '25 phút',
      type: 'theory',
      content: `
<h3 class="task-heading">Xử lý một Dự đoán</h3>
<p>Phần đầu tiên của chương trình trò chơi đoán số sẽ yêu cầu người dùng nhập đầu vào, xử lý đầu vào đó, và kiểm tra xem đầu vào có ở định dạng được mong đợi hay không. Để bắt đầu, chúng ta sẽ cho phép người chơi nhập vào một dự đoán. Nhập mã ở Listing 2-1 vào <code>src/main.rs</code>.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    println!("Guess the number!");
    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}</code></pre>
</div>

<p>Đoạn mã này chứa rất nhiều thông tin, vì vậy hãy phân tích nó theo từng dòng. Để nhận đầu vào từ người dùng và sau đó in kết quả ra dưới dạng đầu ra, chúng ta cần đưa thư viện đầu vào/đầu ra <code>io</code> vào phạm vi (scope). Thư viện <code>io</code> đến từ thư viện chuẩn (standard library), được gọi là <code>std</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;</code></pre>
</div>
<p>Theo mặc định, Rust có một tập hợp các mục được định nghĩa trong thư viện chuẩn mà nó đưa vào phạm vi của mọi chương trình. Tập hợp này được gọi là khúc dạo đầu (prelude), và bạn có thể thấy mọi thứ trong đó trong tài liệu thư viện chuẩn.</p>
<p>Nếu một kiểu dữ liệu bạn muốn sử dụng không có trong prelude, bạn phải đưa kiểu đó vào phạm vi một cách rõ ràng bằng câu lệnh <code>use</code>. Sử dụng thư viện <code>std::io</code> cung cấp cho bạn một số tính năng hữu ích, bao gồm cả khả năng chấp nhận đầu vào của người dùng.</p>
<p>Như bạn đã thấy trong Chương 1, hàm <code>main</code> là điểm bắt đầu (entry point) vào chương trình:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {</code></pre>
</div>
<p>Cú pháp <code>fn</code> khai báo một hàm mới; cặp ngoặc đơn, <code>()</code>, chỉ ra rằng không có tham số nào; và dấu ngoặc nhọn, <code>{</code>, bắt đầu phần thân của hàm.</p>
<p>Như bạn cũng đã học được trong Chương 1, <code>println!</code> là một macro in một chuỗi văn bản ra màn hình:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    println!("Guess the number!");
    println!("Please input your guess.");</code></pre>
</div>
<p>Đoạn mã này đang in ra một lời nhắc tuyên bố trò chơi là gì và yêu cầu đầu vào từ người dùng.</p>

<h3 class="task-heading">Lưu trữ Giá trị bằng Biến</h3>
<p>Tiếp theo, chúng ta sẽ tạo một biến (variable) để lưu trữ đầu vào của người dùng, như sau:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    let mut guess = String::new();</code></pre>
</div>
<p>Bây giờ chương trình đang trở nên thú vị! Có rất nhiều thứ đang diễn ra trong dòng nhỏ bé này. Chúng ta sử dụng lệnh <code>let</code> để tạo ra biến. Dưới đây là một ví dụ khác:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let apples = 5;</code></pre>
</div>
<p>Dòng này tạo ra một biến mới có tên là <code>apples</code> và gán cho nó giá trị <code>5</code>. Trong Rust, các biến theo mặc định là bất biến (immutable), nghĩa là một khi chúng ta cung cấp cho biến một giá trị, giá trị đó sẽ không thay đổi. Chúng ta sẽ thảo luận chi tiết về khái niệm này trong phần “Biến và Tính Bất biến” ở Chương 3. Để làm cho một biến có thể thay đổi (mutable), chúng ta thêm <code>mut</code> trước tên biến:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let apples = 5; // immutable
let mut bananas = 5; // mutable</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Cú pháp <code>//</code> bắt đầu một ghi chú và kéo dài cho đến khi kết thúc dòng. Rust bỏ qua mọi thứ trong các ghi chú. Chúng ta sẽ thảo luận về ghi chú chi tiết hơn ở Chương 3.
</div>

<p>Quay trở lại với chương trình trò chơi đoán số, bây giờ bạn đã biết rằng <code>let mut guess</code> sẽ đưa vào một biến có thể thay đổi có tên là <code>guess</code>. Dấu bằng (<code>=</code>) báo cho Rust biết chúng ta muốn liên kết (bind) một cái gì đó vào biến ngay bây giờ. Phía bên phải của dấu bằng là giá trị mà <code>guess</code> được liên kết vào, đó là kết quả của việc gọi <code>String::new</code>, một hàm trả về một phiên bản mới của một <code>String</code>. <code>String</code> là một kiểu chuỗi (string type) được cung cấp bởi thư viện chuẩn, nó là một đoạn văn bản có thể mở rộng, được mã hóa UTF-8.</p>
<p>Cú pháp <code>::</code> trong dòng <code>::new</code> chỉ ra rằng <code>new</code> là một hàm liên kết (associated function) của kiểu <code>String</code>. Một hàm liên kết là một hàm được triển khai trên một kiểu dữ liệu, trong trường hợp này là <code>String</code>. Hàm <code>new</code> này tạo ra một chuỗi mới, trống rỗng. Bạn sẽ thấy một hàm tên <code>new</code> trên rất nhiều kiểu dữ liệu bởi vì nó là cái tên phổ biến cho một hàm làm chức năng tạo ra một giá trị mới của loại đó.</p>
<p>Nói một cách tổng quát, dòng <code>let mut guess = String::new();</code> đã tạo ra một biến có thể thay đổi, thứ mà hiện đang được liên kết với một phiên bản hoàn toàn mới và trống rỗng của một <code>String</code>. Dài quá nhỉ!</p>

<h3 class="task-heading">Nhận đầu vào từ Người dùng</h3>
<p>Hãy nhớ lại rằng chúng ta đã bao gồm tính năng đầu vào/đầu ra từ thư viện chuẩn với dòng <code>use std::io;</code> ở ngay dòng đầu tiên của chương trình. Bây giờ chúng ta sẽ gọi hàm <code>stdin</code> từ mô-đun <code>io</code>, đây là một hàm sẽ cho phép chúng ta xử lý đầu vào của người dùng:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    io::stdin()
        .read_line(&mut guess)</code></pre>
</div>
<p>Nếu chúng ta không nhập mô-đun <code>io</code> bằng lệnh <code>use std::io;</code> ở đầu chương trình, chúng ta vẫn có thể dùng hàm này bằng cách kéo dài lời gọi thành <code>std::io::stdin</code>. Hàm <code>stdin</code> trả về một thể hiện của <code>std::io::Stdin</code>, một kiểu dữ liệu đại diện cho luồng xử lý thiết bị nhập đầu vào chuẩn (standard input) của thiết bị đầu cuối.</p>
<p>Tiếp theo, lệnh <code>.read_line(&mut guess)</code> gọi phương thức <code>read_line</code> ngay trên biến xử lý đầu vào chuẩn chuẩn để nhận dạng thông tin nhập từ người dùng. Chúng ta cũng truyền thêm tham chiếu <code>&mut guess</code> làm đối số cho hàm <code>read_line</code> để nó biết chuỗi gốc dùng để lưu văn bản nằm ở đâu. Công việc của hàm <code>read_line</code> là lấy bất cứ tổ hợp từ khóa nào người chơi gõ vào và chèn vào thêm đuôi chuỗi gốc (mà không ghi đè dữ liệu có sẵn ban đầu). Vì kết quả đầu ra là sự xáo trộn chuỗi, chúng ta phải truyền biến nhận ở định dạng tham chiếu nguyên mẫu dạng có khả năng tự biến đối <code>mut</code> thì phương thức mới có quyền tự điều chỉnh biến thuộc sở hữu của ta.</p>

<p>Ký hiệu <code>&amp;</code> chỉ ra rằng đối số này là một tham chiếu (reference), giúp bạn cho phép nhiều phần trong mã của mình truy cập vào cùng một dữ liệu mà không cần phải sao chép dữ liệu đó vào bộ nhớ nhiều lần. Tham chiếu là một tính năng phức tạp, và một trong những lợi thế chính của Rust là việc sử dụng tham chiếu rất an toàn và dễ dàng. Bạn không cần phải biết nhiều chi tiết đó để hoàn thành chương trình này. Bây giờ, tất cả những gì bạn cần biết là, giống như các biến, các tham chiếu mặc định là bất biến (immutable). Do đó, bạn cần viết <code>&amp;mut guess</code> thay vì <code>&amp;guess</code> để làm cho nó có thể thay đổi. (Chương 4 sẽ giải thích các tham chiếu kỹ hơn.)</p>

<h3 class="task-heading">Xử lý Rủi ro Thất bại với <code>Result</code></h3>
<p>Chúng ta vẫn đang thảo luận về dòng mã này. Bây giờ chúng ta đang nói về dòng thứ ba, nhưng lưu ý rằng nó vẫn là một phần của một câu lệnh liền mạch duy nhất. Phần tiếp theo là phương thức này:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        .expect("Failed to read line");</code></pre>
</div>
<p>Chúng ta có thể đã viết đoạn mã này là:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>io::stdin().read_line(&amp;mut guess).expect("Failed to read line");</code></pre>
</div>
<p>Tuy nhiên, một dòng dài rất khó đọc, vì vậy tốt nhất là chia nó ra. Người ta thường khuyên nền sử dụng ký tự dòng mới và các khoảng trắng khác để giúp chia nhỏ các dòng dài khi bạn gọi một phương thức bằng cú pháp <code>.method_name()</code>. Bây giờ hãy thảo luận xem dòng này làm gì.</p>

<p>Như đã đề cập trước đó, <code>read_line</code> đưa bất cứ thứ gì người dùng nhập vào chuỗi mà chúng ta truyền cho nó, nhưng nó cũng đồng thời trả về một giá trị <code>Result</code>. <code>Result</code> là một kiểu liệt kê (enumeration), thường được gọi là <code>enum</code>, là một kiểu có thể mang một trong nhiều trạng thái có thể có. Chúng ta gọi mỗi trạng thái có thể xảy ra đó là một biến thể (variant).</p>
<p>Chương 6 sẽ đề cập đến các <code>enum</code> chi tiết hơn. Mục đích của các kiểu <code>Result</code> này là để mã hóa thông tin xử lý lỗi.</p>
<p>Các biến thể của <code>Result</code> là <code>Ok</code> và <code>Err</code>. Biến thể <code>Ok</code> chỉ ra rằng hoạt động đã thành công và nó chứa giá trị được trả về thành công. Biến thể <code>Err</code> có nghĩa là hoạt động đã thất bại và nó chứa thông tin về việc hoạt động đã thất bại như thế nào hoặc tại sao.</p>

<p>Các giá trị của kiểu <code>Result</code>, giống như giá trị của bất kỳ kiểu nào, sẽ có các phương thức được định nghĩa tích hợp trên chúng. Một phiên bản của <code>Result</code> có một phương thức tên là <code>expect</code> mà bạn có thể gọi. Nếu phiên bản này của <code>Result</code> là một giá trị <code>Err</code>, <code>expect</code> sẽ làm cho chương trình gặp sự cố (crash) và hiển thị thông báo mà bạn đã truyền làm đối số cho <code>expect</code>. Nếu phương thức <code>read_line</code> trả về một <code>Err</code>, nó có thể là kết quả của một lỗi đến từ hệ điều hành. Nếu phiên bản này của <code>Result</code> là một giá trị <code>Ok</code>, <code>expect</code> sẽ lấy giá trị trả về mà <code>Ok</code> đang nắm giữ và chỉ trả lại giá trị đó cho bạn để bạn có thể sử dụng. Trong trường hợp này, giá trị đó là dung lượng số lượng byte trong đầu vào của người dùng.</p>

<p>Nếu bạn không cho gọi hàm <code>expect</code>, chương trình sẽ vẫn biên dịch, nhưng bạn sẽ nhận được một cảnh báo:</p>

<div class="code-snippet">
  <span class="code-lang">console</span>
  <pre><code>warning: unused \`Result\` that must be used</code></pre>
</div>
<p>Rust cảnh báo rằng bạn chưa sử dụng giá trị <code>Result</code> được trả về từ <code>read_line</code>, điều này có nghĩa là chương trình của bạn chưa xử lý một lỗi có thể xảy ra.</p>

<p>Cách đúng chuẩn để loại bỏ thông báo cảnh báo là thực sự viết phần mã xử lý lỗi chuẩn chỉnh, nhưng trong trường hợp hiện tại của chúng ta, chúng ta chỉ muốn làm sập chương trình này ngay lập tức khi có sự cố xảy ra, vì vậy chúng ta có thể sử dụng <code>expect</code>. Bạn sẽ tìm hiểu về cách phục hồi từ các lỗi trong Chương 9.</p>

<h3 class="task-heading">In Giá trị bằng bộ Giữ chỗ của <code>println!</code></h3>
<p>Bên cạnh cặp ngoặc nhọn kết thúc vòng cấu trúc hàm, chỉ còn một dòng nữa để thảo luận trong đoạn mã từ nãy đến giờ:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    println!("You guessed: {guess}");</code></pre>
</div>

<p>Dòng này in ra chuỗi đang chứa đầu vào của người dùng. Tập hợp các dấu ngoặc nhọn <code>{}</code> đóng vai trò là một nơi giữ chỗ (placeholder): Hãy tưởng tượng <code>{}</code> giống như những chiếc càng cua nhỏ xíu giữ chặt một giá trị tại chỗ. Khi in giá trị của một biến, tên biến có thể nằm bên trong dấu ngoặc nhọn. Khi đang muốn in lấy kết quả trực tiếp của việc tính toán một biểu thức, hãy đặt các cặp dấu ngoặc nhọn rỗng sẵn trong chuỗi đinh dạng, rồi sau chuỗi định dạng đó là một danh sách các biểu thức mà bạn muốn in (bị ngăn cách bằng dấu phẩy) vào mỗi cặp ngoặc nhọn rỗng lần lượt theo cùng đúng thứ tự. Việc in một biến thể cũng như in kết quả biểu thức tính toán thông qua một lời gọi hàm lệnh <code>println!</code> sẽ trông như thế này:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 5;
let y = 10;

println!("x = {x} and y + 2 = {}", y + 2);</code></pre>
</div>
<p>Mã này sẽ in dòng văn bản: <code>x = 5 and y + 2 = 12</code>.</p>

<h3 class="task-heading">Kiểm tra Phần Đầu tiên</h3>

<p>Hãy kiểm tra lại một lượt nửa đoạn đầu của trò chơi đoán số. Bạn chạy tệp bằng <code>cargo run</code>:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling guessing_game v0.1.0 
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 6.44s
     Running \`target/debug/guessing_game\`
Guess the number!
Please input your guess.
6
You guessed: 6</code></pre>
</div>

<p>Tại thời điểm này, phần đầu tiên của trò chơi đã hoàn tất: Chúng ta đang nhận đầu vào chuẩn xác từ bộ bàn phím rồi tiếp đó in nó ra màn hình ngoài.</p>
`,
      defaultCode: `use std::io;

fn main() {
    println!("Guess the number!");
    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
`,
      expectedOutput: 'Guess the number!\nPlease input your guess.\nYou guessed: '
    };
