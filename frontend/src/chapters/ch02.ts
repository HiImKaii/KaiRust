import { Chapter } from '../courses';

export const ch02: Chapter = {
  id: 'ch02',
  title: 'Chương 2: Lập trình trò chơi đoán số (Programming a Guessing Game)',
  lessons: [
    {
      id: 'ch02-01',
      title: '2.1 Thiết lập Dự án Mới',
      duration: '15 phút',
      type: 'theory',
      content: `
<p>Hãy cùng khám phá Rust bằng cách cùng nhau thực hiện một dự án thực tế! Chương này giới thiệu cho bạn một vài khái niệm Rust phổ biến bằng cách chỉ cho bạn cách sử dụng chúng trong một chương trình thực tế. Bạn sẽ học về <code>let</code>, <code>match</code>, các phương thức, các hàm liên kết, các crate bên ngoài, và nhiều hơn nữa! Trong các chương tiếp theo, chúng ta sẽ khám phá những ý tưởng này chi tiết hơn. Trong chương này, bạn sẽ chỉ thực hành các nguyên tắc cơ bản.</p>

<p>Chúng ta sẽ thực hiện một bài toán lập trình kinh điển cho người mới bắt đầu: trò chơi đoán số. Đây là cách nó hoạt động: Chương trình sẽ tạo ra một số nguyên ngẫu nhiên từ 1 đến 100. Sau đó nó sẽ nhắc người chơi nhập vào một dự đoán. Sau khi một dự đoán được nhập vào, chương trình sẽ chỉ ra xem dự đoán đó là quá thấp hay quá cao. Nếu dự đoán là chính xác, trò chơi sẽ in ra một thông báo chúc mừng và thoát.</p>

<h3 class="task-heading">Thiết lập Dự án Mới</h3>
<p>Để thiết lập một dự án mới, hãy đi tới thư mục <code>projects</code> mà bạn đã tạo trong Chương 1 và tạo một dự án mới bằng cách sử dụng Cargo, như sau:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new guessing_game
$ cd guessing_game</code></pre>
</div>
<p>Lệnh đầu tiên, <code>cargo new</code>, nhận tên của dự án (<code>guessing_game</code>) làm đối số đầu tiên. Lệnh thứ hai chuyển sang thư mục của dự án mới.</p>

<p>Hãy nhìn vào tệp <code>Cargo.toml</code> được tạo ra:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[package]
name = "guessing_game"
version = "0.1.0"
edition = "2024"

[dependencies]</code></pre>
</div>

<p>Như bạn đã thấy trong Chương 1, <code>cargo new</code> tạo ra một chương trình “Hello, world!” cho bạn. Hãy kiểm tra tệp <code>src/main.rs</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("Hello, world!");
}</code></pre>
</div>

<p>Bây giờ hãy biên dịch chương trình “Hello, world!” này và chạy nó trong cùng một bước bằng cách sử dụng lệnh <code>cargo run</code>:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling guessing_game v0.1.0
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.08s
     Running \`target/debug/guessing_game\`
Hello, world!</code></pre>
</div>

<p>Lệnh <code>run</code> trở nên hữu ích khi bạn cần lặp lại thử nghiệm nhanh chóng trên một dự án, như chúng ta sẽ làm trong trò chơi này, nhanh chóng kiểm tra từng lần lặp lại trước khi chuyển sang lần tiếp theo.</p>
<p>Mở lại tệp <code>src/main.rs</code>. Bạn sẽ viết tất cả mã nguồn trong tệp này.</p>
`,
      defaultCode: `fn main() {
    println!("Hello, world!");
}
`,
      expectedOutput: 'Hello, world!'
    },
    {
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
    },
    {
      id: 'ch02-03',
      title: '2.3 Tạo Số Bí Mật',
      duration: '30 phút',
      type: 'theory',
      content: `
<h3 class="task-heading">Tạo một Số Bí mật</h3>
<p>Tiếp theo, chúng ta cần tạo ra một số bí mật mà người dùng sẽ cố gắng dự đoán. Số bí mật này nên khác nhau trong mỗi lần chơi nhằm mang lại sự thú vị khi chơi lại nhiều lần. Chúng ta cấu hình sử dụng một số ngẫu nhiên nằm trong khoảng từ 1 đến 100 để trò chơi không quá khó. Rust hiện tại chưa bao gồm tính năng tạo số ngẫu nhiên trong thư viện chuẩn của nó. Tuy nhiên, đội ngũ phát triển Rust có cung cấp một crate tên là <code>rand</code> được tích hợp tính năng đã đề cập trên.</p>

<h3 class="task-heading">Sử dụng một Crate để Tăng cường Chức năng</h3>
<p>Hãy nhớ rằng một <em>crate</em> là một tập hợp các tệp mã nguồn Rust. Dự án mà chúng ta đang xây dựng là một <em>crate thực thi (binary crate)</em>, là một tệp có thể chạy được. Crate <code>rand</code> là một <em>crate thư viện (library crate)</em>, chứa mã nguồn nhằm mục đích cung cấp năng lực cho các chương trình khác nhưng bản thân nó không tự thực thi được.</p>

<p>Khả năng điều phối các crate bên ngoài chính là điểm mà Cargo thực sự tỏa sáng. Trước khi có thể viết được mã sử dụng <code>rand</code>, chúng ta cần phải sửa tệp <em>Cargo.toml</em> để chỉ định crate <code>rand</code> như một phần phụ thuộc (dependency). Hãy mở tệp đó ra và thêm dòng sau vào phần dưới cùng, bên dưới tiêu đề mục <code>[dependencies]</code> mà Cargo đã tạo sẵn. Hãy chắc chắn chỉ định viết chữ <code>rand</code> chính xác như chúng tôi ghi ở đây, cùng với con số phiên bản này, nếu không thì các ví dụ mã trong bài hướng dẫn này có thể sẽ không hoạt động:</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[dependencies]
rand = "0.8.5"</code></pre>
</div>

<p>Trong tệp <em>Cargo.toml</em>, mọi thứ theo sau một tiêu đề đều thuộc về phạm vi của mục đó cho đến khi một tiêu đề mục khác bắt đầu. Trong mục <code>[dependencies]</code>, bạn cho Cargo biết dự án của bạn phụ thuộc dùng vào những thư viện ngoài nào và bạn yêu cầu phiên bản nào của chúng. Trong trường hợp này, chúng ta chỉ định dùng crate <code>rand</code> với thông số phiên bản ngữ nghĩa là <code>0.8.5</code>. Cargo hiểu Versioning Ngữ nghĩa (đôi khi gọi là SemVer), vốn là một tiêu chuẩn để viết các số phiên bản. Thông số <code>0.8.5</code> thực ra là cách viết tắt của <code>^0.8.5</code>, điều này có nghĩa là bất kỳ phiên bản nào tối thiểu là 0.8.5 nhưng thấp hơn 0.9.0.</p>

<p>Cargo coi các phiên bản này có các API công khai tương thích với phiên bản 0.8.5, và đặc tả này đảm bảo rằng bạn sẽ nhận được bản phát hành vá lỗi mới nhất mà vẫn có thể biên dịch trơn tru với mã trong chương này. Bất kỳ phiên bản 0.9.0 hoặc lớn hơn không được đảm bảo sẽ có cùng API giống như những gì các ví dụ trong hướng dẫn sau đây sử dụng.</p>

<p>Bây giờ, mà chưa cần thay đổi bất kỳ đoạn mã nào, hãy biên dịch (build) dự án:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
    Updating crates.io index
  Downloaded ppv-lite86 v0.2.17
  Downloaded rand_core v0.6.4
  Downloaded getrandom v0.2.10
  Downloaded rand_chacha v0.3.1
  Downloaded rand v0.8.5
  Downloaded libc v0.2.147
   Compiling libc v0.2.147
   Compiling getrandom v0.2.10
   Compiling rand_core v0.6.4
   Compiling ppv-lite86 v0.2.17
   Compiling rand_chacha v0.3.1
   Compiling rand v0.8.5
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 2.53s</code></pre>
</div>

<p>Bạn có thể thấy các số phiên bản khác nhau (nhưng chúng sẽ đều tương thích với mã, nhờ có SemVer!) và những dòng khác nhau (tùy thuộc vào hệ điều hành), và các dòng đấy có thể nằm ở trật tự khác nhau.</p>

<p>Khi chúng ta bao gồm một phụ thuộc bên ngoài, Cargo lấy những phiên bản mới nhất của mọi thứ mà phần phụ thuộc đó cần từ <em>registry</em> (sổ đăng ký), đây là một bản sao chép dữ liệu từ Crates.io. Crates.io là nơi mà những người trong hệ sinh thái Rust đăng tải các dự án Rust mã nguồn mở của họ để người khác có thể sử dụng.</p>

<p>Sau khi cập nhật sổ đăng ký, Cargo kiểm tra lại mục <code>[dependencies]</code> và tải bất kỳ crate nào đã được liệt kê mà chưa được tải. Trong trường hợp này, mặc dù chúng ta chỉ liệt kê mỗi <code>rand</code> với tư cách là một phụ thuộc, Cargo cũng đồng thời lấy và tải luôn các crate khác mà <code>rand</code> phụ thuộc vào để hoạt động. Sau khi tải xuống các crate, Rust biên dịch chúng và sau đó tiến hành biên dịch dự án với các phụ thuộc đã có sẵn.</p>

<p>Nếu bạn lập tức chạy lại <code>cargo build</code> mà không thực hiện bất kỳ thay đổi nào, bạn sẽ không nhận được bất cứ đầu ra nào ngoài dòng chữ <code>Finished</code>. Cargo biết rằng nó đã tải xuống và biên dịch xong các phụ thuộc, và bạn thì không sửa đổi bất cứ thứ gì về chúng trong tệp <em>Cargo.toml</em>. Cargo cũng biết rằng bạn cũng chưa thay đổi bất cứ đoạn mã nào của bản thân, nên nó không phải biên dịch lại đoạn đó. Với việc không có gì để làm, tiến trình đơn giản chỉ là tắt thoát ra.</p>

<p>Nếu bạn thực hiện một thay đổi nhỏ gọn trong tệp <em>src/main.rs</em>, sau đó lưu lại và build lại, bạn sẽ chỉ thấy vài dòng của đầu ra:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 2.53s</code></pre>
</div>

<p>Những dòng này thể hiện rằng Cargo chỉ cập nhật tiến trình build với chi tiết thay đổi nhỏ xíu của bạn trên tệp <em>src/main.rs</em>. Các phụ thuộc của bạn không hề thay đổi, nên Cargo biết nó có thể tái sử dụng dữ liệu đã biên dịch từ trước cho chúng.</p>

<h3 class="task-heading">Đảm bảo Tính Tái Lập bằng <em>Cargo.lock</em></h3>

<p>Cargo có một cơ chế đảm bảo rằng bạn hoàn toàn có thể xây dựng (rebuild) lại cùng một tạo phẩm gốc hệt như cũ mỗi lần bạn hoặc đồng đội biên dịch dự án: Cargo sẽ chỉ tận dụng các phiên bản của các thư viện phụ thuộc mà bạn đã chỉ định cho đến khi bạn ra chỉ thị thay đổi. Ví dụ: giả sử tuần sau crate <code>rand</code> ra mắt phiên bản 0.8.6 mang tới bản vá lỗi quan trọng, nhưng đồng thời lại có một thụt lùi (regression) làm cho đoạn mã của bạn chạy lỗi. Để giải quyết rủi ro này, Rust luôn tự động tạo một tệp khóa tên <code>Cargo.lock</code> ở ngay lần đầu tiên bạn kích hoạt dòng lệnh <code>cargo build</code>.</p>

<p>Khi bạn build dự án lần đầu tiên, Cargo tìm ra tất cả các phiên bản của những phụ thuộc phù hợp và ghi chúng vào <em>Cargo.lock</em>. Khi bạn build dự án vào những lần tới ở tương lai, Cargo sẽ thấy sự tồn tại của <em>Cargo.lock</em> và tự động dùng luôn thông số phiên bản được ấn định ở đó thay vì phải tính toán lại một lần nữa. Điều này mang lại cho bạn một bản dựng có khả năng tái tạo nguyên thủy. Cụ thể thì crate <code>rand</code> trong dự án của bạn sẽ duy trì mãi ở mức 0.8.5 cho đến khi bạn chỉ thị vòng nâng cấp một cách tường minh. Vì <em>Cargo.lock</em> vô cùng quan trọng cho tính ổn định nhất quán của team, tệp này luôn xuất hiện trong bộ quản lý phiên bản Git đi kèm với mã nguồn của bạn.</p>

<h3 class="task-heading">Cập nhật Crate để kéo Lên Phiên Bản Mới Mới</h3>
<p>Khi bạn thực sự muốn nâng cấp crate lên phiên bản mới, Cargo cung cấp hỗ trợ qua dòng lệnh <code>update</code>. Lệnh này sẽ bỏ qua nội dung trong tệp <em>Cargo.lock</em> và tự thân dò quét toàn bộ các phiên bản tương thích mới nhất thỏa mãn định nghĩa trong tệp <em>Cargo.toml</em>, rồi cập nhật ghi đè phiên bản mới đó vào <em>Cargo.lock</em>. Theo mặc định, do dấu ngã <code>^0.8.5</code>, ngầm định Cargo chỉ truy vết những phiên bản mới nhưng phải nhỏ hơn mức 0.9.0. Giả sử <code>rand</code> ra mắt hai bản 0.8.6 và 0.999.0, bạn sẽ thấy kết quả sau khi gọi <code>cargo update</code>:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo update
    Updating crates.io index
    Updating rand v0.8.5 -> v0.8.6</code></pre>
</div>
<p>Cargo sẽ tự động lờ đi bản 0.999.0. Vào thời điểm này, nếu để ý trong <em>Cargo.lock</em>, bạn sẽ thấy khóa tham chiếu của package rand đã nhích lên 0.8.6. Nhưng nếu bạn khao khát ứng dụng đột phá với phiên bản cấu trúc lớn phá vỡ như 0.999.0 thì sao? Lúc đó, không còn cách nào khác, bạn phải tự tay sửa file <em>Cargo.toml</em> thành như thế này:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[dependencies]
rand = "0.999.0"</code></pre>
</div>
<p>Lần tiếp theo khi bạn ra lệnh <code>cargo build</code>, cơ quan điều phối Cargo sẽ làm mới danh mục các thư viện và đi tính toán lại luồng kéo mã theo đúng con số chỉ định siêu mới mà bạn vừa cắm cờ. Ta sẽ có cơ hội thảo luận sâu hơn về hệ thống sinh thái linh hoạt của Cargo ở Chương 14. Cargo giúp công đoạn tái sử dụng code của người khác dễ dàng và thuận tiện đến mức các lập trình viên Rust thường có thói quen "lắp ráp" nên các dự án tỉ đô chỉ bằng thao tác xâu chuỗi hàng loạt các module chức năng cực nhỏ được chia sẻ miễn phí từ cộng đồng.</p>

<h3 class="task-heading">Tạo Số Ngẫu nhiên</h3>
<p>Hãy ứng dụng crate <code>rand</code> mới tải vào việc kiến trúc bộ sinh số ngẫu nhiên cho người chơi. Để làm điều đó, ta nạp các module liên quan vào khối mã nằm trong <em>src/main.rs</em>, như thiết kế ở Listing 2-3:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;
use rand::Rng;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    println!("The secret number is: {secret_number}");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}</code></pre>
</div>
<p>Đầu tiên, chúng ta mượn chức năng mở rộng từ thư viện về bằng câu lệnh đầu file <code>use rand::Rng;</code>. Lớp <code>Rng</code> là một hệ đặc tính (<em>trait</em>) quy định các phương thức chuẩn tạo ra số ngẫu nhiên mà mọi loại máy phát đều phải tuân thủ và có thể ứng dụng. Sự có mặt của thư viện này trong phạm vi làm việc của module là bắt buộc để bạn có tự do vung tay xài các hàm sinh số. Chúng ta sẽ dành một khoảng lớn thời gian chia sẻ về tầm quan trọng của các trait ở Chương 10.</p>
<p>Vào khung mã lõi chính, chúng ta đẩy thêm hai mũi câu lệnh logic ở giữa hàm <code>main</code>. Dòng lệnh mới sẽ triệu hồi <code>rand::thread_rng</code> mang lấy quyền truy cập để kích hoạt máy tạo phát sinh cấp số ngẫu nhiên riêng cho riêng luồng việc của Hệ điều hành đang chạy lúc này, và nó được khởi nguồn hạt giống mầm ngẫu nhiên hoàn toàn tự động cho bạn. Nối gót sau đuôi đó, ta áp luôn phương thức <code>gen_range</code> ngay lên trình máy phát đó. Hàm <code>gen_range</code> nuốt vào một giới hạn tầm ngắm, đóng vai trò khuôn bao, để máy nảy số ngẫu nhiên trả về không vượt quá giới hạn. Bộ khung cấu hình ở đây là mô hình đoạn với hai cái đầu chặn giới hạn bằng dấu móc kép lấp lửng <code>start..=end</code>, nó ám chỉ việc ôm trọn bao gồm luôn tính cả phần điểm chặn biên. Vì luật game giới hạn con số từ 1 chạy cho lên đến đụng rào mốc 100, nên đối số truyền vào sẽ hiển thị gọn lỏn là <code>1..=100</code>.</p>
<p>Lệnh thứ hai ở dòng dưới có nhiệm vụ in trực tiếp con số Bí mật vừa mới sinh ra kia lên màn hình để dễ dàng kiểm toán chương trình chạy xem hoạt động đúng chưa. Tuy nhiên, trước lúc chúng ta tung sản phẩm lên cho người khác chơi như một cái game thật thì phải tháo dòng in đáp án gian lận này ra!</p>
<p>Dắt lệnh vào lôi chạy lệnh chạy lôi gọi vào xem sao trò trò ở chơi bằng chạy vào thử ở coi cái bằng bộ gõ cài qua đợt với bộ:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 2.53s
     Running \`target/debug/guessing_game\`
Guess the number!
The secret number is: 7
Please input your guess.
4
You guessed: 4</code></pre>
</div>
<p>Tuyệt cú lắm! Nhờ bạn tự bạn mà đã tóm lấy cho ra lấy được được làm có mấy ra thành ngẫu từ nhiên có từ từ nhiên ra từ bộ từ mấy bộ bộ được đem lấy có một với cho tự bộ 1 thành cho lấy 1 đem 1 mấy số với cho với ngẫu nhiên!</p>
`,
      defaultCode: `use std::io;
use rand::Rng;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    println!("The secret number is: {secret_number}");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
`,
      expectedOutput: 'Guess the number!\nThe secret number is: '
    },
    {
      id: 'ch02-04',
      title: '2.4 So sánh Dự đoán',
      duration: '25 phút',
      type: 'theory',
      content: `
<h3 class="task-heading">So sánh Dự đoán với Số Bí mật</h3>
<p>Bây giờ chúng ta đã có đầu vào của người dùng và một số ngẫu nhiên, chúng ta có thể so sánh chúng. Bước đó được thể hiện trong Listing 2-4. Lưu ý rằng mã này vẫn chưa thể biên dịch được ngay, như chúng tôi sẽ giải thích.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    // --snip--
    println!("You guessed: {guess}");

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
    }
}</code></pre>
</div>
<p>Đầu tiên chúng ta thêm một lệnh <code>use</code> khác, đưa một kiểu được gọi là <code>std::cmp::Ordering</code> vào phạm vi từ thư viện chuẩn. Kiểu <code>Ordering</code> là một enum khác và có các biến thể <code>Less</code>, <code>Greater</code>, và <code>Equal</code>. Đây là ba kết quả có thể xảy ra khi bạn so sánh hai giá trị.</p>

<p>Sau đó, chúng ta thêm năm dòng mới ở dưới cùng sử dụng kiểu <code>Ordering</code>. Phương thức <code>cmp</code> so sánh hai giá trị và có thể được gọi trên bất kỳ thứ gì có thể được so sánh. Nó nhận một tham chiếu đến bất cứ thứ gì bạn muốn so sánh với: ở đây nó đang so sánh <code>guess</code> với <code>secret_number</code>. Sau đó nó trả về một biến thể của enum <code>Ordering</code> mà chúng ta đã đưa vào phạm vi bằng câu lệnh <code>use</code>. Chúng ta sử dụng một biểu thức <code>match</code> để quyết định xem làm gì tiếp theo dựa trên biến thể nào của <code>Ordering</code> được trả về từ lệnh gọi đến <code>cmp</code> với các giá trị trong <code>guess</code> và <code>secret_number</code>.</p>

<p>Một biểu thức <code>match</code> được tạo thành từ các <em>nhánh (arms)</em>. Một nhánh bao gồm một <em>mẫu (pattern)</em> để khớp với, và phần mã sẽ được chạy nếu giá trị được cung cấp cho <code>match</code> phù hợp với mẫu nhánh đó. Rust đánh giá qua lần lượt mẫu của từng nhánh. Các mẫu và cấu trúc <code>match</code> là những tính năng nền tảng mạnh mẽ của Rust: chúng cho phép bạn thể hiện hàng loạt những khả năng phân nhánh đường rẽ cho mã nguồn trong kịch bản luồng xử lý thực tiễn, và ép buộc trình biên dịch phải xác minh rằng tất cả rẽ vào phải được bạn đánh chặn gọn gàng để xử lý. Những tính năng này sẽ được giới thiệu chi tiết thêm tại Chương 6 và Chương 18.</p>

<p>Hãy xem qua một ví dụ mô phỏng biểu thức <code>match</code>. Giả sử người dùng nhập dự đoán là 50, trong khi trái tim bí mật do máy ngẫu nhiên đặt ra đang cất giữ số 38.</p>

<p>Khi mã hoạt động thao tác <code>cmp</code> lên 50 để so số nhỏ lớn với 38, phương thức báo lại kết quả cho vòng ngõ của cấu trúc lầu lệnh thông điệp cảnh báo là biến thể <code>Ordering::Greater</code> (To hơn), đơn giản là vì vế 50 to đùng hơn 38. Khối lệnh logic rẽ luồng <code>match</code> liền chộp ngay lấy biến thể đó. Rẽ đến con đường thứ nhất để gõ cửa: nó đo mẫu xem có khớp <code>Ordering::Less</code> không. Câu trả về rõ rành rành là trật chìa khóa. <code>Greater</code> không phải <code>Less</code>! Phớt lờ mọi thứ ở cửa con đường một, cánh cổng tìm ngay ngách quẹo thứ hai. Xem thử nhánh cửa này đánh trúng <code>Ordering::Greater</code> không? Thật đúng! Bộ cửa rẽ ngay vào phòng số 2 này chạy một câu chốt <code>println!("Too big!")</code>, in chưởng trực diện "Bự quá!" tung lóe lên trên màn ảnh Terminal. Biểu thức điều hướng nhánh <code>match</code> dừng việc rà soát và cho ngắt vòng logic thành tựu, thong dong bỏ hẳn luôn việc dò xem nhánh tít tận còn dưới cùng phòng sập cuối có bị đóng bụi bẩn gì nữa không.</p>

<p>Mặc dù luồng vận hành đã vạch vạch sẵn như vậy, bộ mã mà chúng ta vừa trình bày trong Listing 2-4 đáng tiếc lại chưa thể dịch và hoạt động được ngay. Trình biên dịch của Rust sẽ chặn đứng chúng ta bằng một gáo nước lạnh là cảnh báo lỗi ngay khi bạn vừa gõ lệnh <code>cargo build</code>:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
error[E0308]: mismatched types
  --> src/main.rs:22:21
   |
22 |     match guess.cmp(&secret_number) {
   |                 --- ^^^^^^^^^^^^^^ expected struct \`String\`, found integer
   |                 |
   |                 arguments to this method are incorrect
   |
   = note: expected reference \`&String\`
              found reference \`&{integer}\`
note: method defined here
  --> /rustc/d5a82bbd26e1ad8b7401f6a718a9c57c96905483/library/core/src/cmp.rs:809:8
   |
809 |     fn cmp(&self, other: &R) -> Ordering;
   |        ^^^

For more information about this error, try \`rustc --explain E0308\`.
error: could not compile \`guessing_game\` due to previous error</code></pre>
</div>


<p>Lỗi cốt lõi ở đây chỉ ra rằng có sự <em>không khớp kiểu dữ liệu (mismatched types)</em>. Rust có kiểu hệ thống tĩnh mạnh. Tuy nhiên, nó cũng bao gồm suy luận kiểu. Khi chúng ta viết <code>let mut guess = String::new()</code>, Rust đã có thể suy luận rằng <code>guess</code> nên là một <code>String</code> và không ép chúng ta phải viết ra kiểu. Mặt khác, đối với <code>secret_number</code>, nó là kiểu số. Có một vài kiểu dữ liệu số mà Rust có thể có giá trị từ 1 đến 100 bằng: <code>i32</code> một số 32-bit, <code>u32</code> số không âm 32-bit, <code>i64</code> số 64-bit hoặc các kiểu khác. Trừ khi được chỉ định theo kiểu khác, thì Rust mặc định một kiểu số là <code>i32</code>, đó là kiểu của biến <code>secret_number</code> trừ khi bạn thêm thông tin kiểu ở chỗ khác mà sẽ khiến cho Rust suy ra một kiểu số học khác.</p>

<p>Nguyên nhân của lỗi báo lỗi là Rust không thể so sánh một chuỗi <code>String</code> và một kiểu kiểu số nguyên (integer) <code>i32</code>. Cuối cùng, chúng ta muốn đổi <code>String</code> mà chương trình đọc như dữ liệu đầu vào (input) thành một kiểu kiểu số tự nhiên (number type) để chúng ta có thể so sánh toán học nó với toán số bí mật.</p>

<h3 class="task-heading">Ép kiểu Dữ liệu</h3>
<p>Chúng ta có thể làm điều đó bằng cách thêm dòng sau vào phần thân hàm <code>main</code>:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    // --snip--

    let guess: u32 = guess.trim().parse().expect("Please type a number!");

    println!("You guessed: {guess}");

    match guess.cmp(&secret_number) {
    // --snip--</code></pre>
</div>

<p>Dòng lệnh mới là:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = guess.trim().parse().expect("Please type a number!");</code></pre>
</div>

<p>Chúng ta khởi tạo một biến có tên <code>guess</code>. Nhưng chờ đã, liệu chương trình này đã không có một biến tên <code>guess</code> hay sao? Thật sự biến này ở bên trên, nhưng Rust cho phép chúng ta <em>ghi đè (shadow)</em> giá trị trước đó của <code>guess</code> với một biến sinh. Shadowing cho phép chúng ta tái sử dụng tên biến <code>guess</code> thay vì buộc chúng ta phải tạo ra hai biến khác nhau, như là <code>guess_str</code> và <code>guess</code>, chẳng hạn. Chúng ta sẽ giải thích tính năng này sâu hơn tại Chương 3, nhưng hiện tại, hãy biết rằng tính năng này thường xuyên được dùng khi bạn muốn thay đổi một giá trị từ một kiểu sang kiểu khác.</p>

<p>Chúng ta gán biến mới này với biểu thức <code>guess.trim().parse()</code>. Chữ <code>guess</code> ở trong biểu thức chỉ tới biến <code>guess</code> gốc, chứa đầu vào dưới dạng chuỗi ban nãy. Phương thức <code>trim</code> trên một thể hiện của mã <code>String</code> sẽ loại bỏ toàn bộ khoảng trắng ở phía trước và dằng sau chuỗi, điều mà chúng ta buộc phải làm để có thể so sánh chuỗi với <code>u32</code>, vốn dĩ chỉ có thể chứa dữ liệu dạng số. Người dùng buộc phải nhấn phím enter để thỏa mãn <code>read_line</code> khi nhập dự đoán của họ, điều đó vô tình thêm một ký tự báo xuống dòng vào luôn trong chuỗi. Ví dụ, nếu người dùng gõ số <code>5</code> và gõ enter, biến <code>guess</code> sẽ trông như thế này: <code>5\n</code>. Chữ <code>\n</code> đại diện cho phím "xuống dòng". (Tên trên Windows, việc gõ nhấm phím enter sẽ tạo thành cấu trúc trả về bao gồm cả lùi đầu dòng và xuống dòng, <code>\r\n</code>). Phương thức <code>trim</code> loại bỏ triệt để <code>\n</code> hoặc <code>\r\n</code>, dẫn tới kết quả chỉ còn mỗi <code>5</code>.</p>

<p>Hàm <code>parse</code> trên một chuỗi <code>String</code> làm nhiệm vụ chuyển đổi chuỗi sang một kiểu khác. Ở đây, chúng ta dùng nó để đổi từ một chuỗi thành một số. Chúng ta cần cho Rust biết chính xác kiểu số chúng ta muốn bằng cách dùng cú pháp <code>let guess: u32</code>. Dấu hai chấm (<code>:</code>) sau <code>guess</code> báo với Rust ta sẽ chủ động ghi chú loại kiểu ở biến mới. Rust mang lấy nhiều loại kiểu số nguyên thủy; ở đây <code>u32</code> là một số nguyên không dấu, 32-bit. Đây là lựa chọn mặc định tốt nhất cho một số dương nhỏ. Bạn sẽ học về các loại số khác trong Chương 3.</p>

<p>Ngoài ra, chú thích <code>u32</code> trong ví dụ này và việc đem đi so sánh với <code>secret_number</code> có nghĩa là Rust sẽ suy luận rằng <code>secret_number</code> cũng phải là một <code>u32</code>. Vì vậy hiện tại thì phép so sánh sẽ diễn ra giữa hai giá trị cùng kiểu!</p>

<p>Phương thức <code>parse</code> sẽ chỉ làm việc với các ký tự có thể dịch logic thành số nên nó rất dễ gây ra lỗi. Ví dụ, nếu chuỗi chứa chữ <code>A👍%</code>, thì không có cách nào có thể chuyển đổi thành một số được. Vì nó có thể thất bại, phương thức <code>parse</code> trả về kiểu <code>Result</code>, giống hệt với cách phương thức <code>read_line</code> hoạt động (đã thảo luận trong bài "Xử lý Rủi ro với Result"). Ta sẽ ứng xử với <code>Result</code> theo cùng một cách đó là dùng hàm <code>expect</code>. Nếu <code>parse</code> trả về <code>Err</code> là dạng biến thể của <code>Result</code> do không thể tạo được một số từ chuỗi gốc, <code>expect</code> sẽ kích hoạt làm sập chương trình và in ra tin nhắn mà chúng ta truyền cho. Nếu <code>parse</code> cấu thành chuỗi ra số thành công, nó sẽ trả về biến thể <code>Ok</code> của bộ <code>Result</code>, và <code>expect</code> sẽ trả về số nằm trong giá trị của biến thể <code>Ok</code> mà chúng ta mong muốn.</p>

<p>Chạy chương trình ngay lúc này nhé:</p>
`,
      defaultCode: `fn main() {
    let mut guess = String::from("  42  ");
    
    // Đoạn code ép kiểu String 'guess' qua u32 tại đây!
    let guess: u32 = guess.trim().parse().expect("Không phải số à nha");
    
    println!("Giá trị đoán đã thành số nguyên: {guess}");
}
`,
      expectedOutput: 'Giá trị đoán đã thành số nguyên: 42'
    },
    {
      id: 'ch02-05',
      title: '2.5 Vòng lặp và Hoàn thiện Trò chơi',
      duration: '30 phút',
      type: 'theory',
      content: `
<h3 class="task-heading">Cho phép Nhiều Dự đoán Bằng Vòng lặp</h3>
<p>Từ khóa <code>loop</code> tạo ra một vòng lặp vô hạn. Chúng ta sẽ thêm một vòng lặp để cho người dùng có thêm nhiều cơ hội đoán số hơn:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    // --snip--
    println!("The secret number is: {secret_number}");

    loop {
        println!("Please input your guess.");

        // --snip--

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => println!("You win!"),
        }
    }
}</code></pre>
</div>
<p>Như bạn có thể thấy, chúng ta đã di chuyển mọi thứ bắt đầu từ lời nhắc nhập dự đoán vào bên trong một vòng lặp. Hãy chắc chắn thụt lùi các dòng mã bên trong vòng lặp vào thêm bốn dấu cách nữa. Chương trình lúc này sẽ liên tục hỏi để nhận những dự đoán mới mãi mãi. Tuy nhiên điều này lại vô tình gây ra một vấn đề mới: Người chơi dường như không thể thoát khỏi trò chơi!</p>

<p>Người dùng tất nhiên lúc nào cũng có thể ép đóng ngắt chương trình thông qua tổ hợp phím <code>ctrl-c</code>. Nhưng có một lối rẽ khác để trốn thoát khỏi con quái vật vòng lặp vô tận này, chuyện đã từng được đề cập lúc ta mổ xẻ hàm <code>parse</code> tại phần "So sánh Dự đoán với Số Bí mật": nếu người chơi cố tình gõ vào một giá trị không phải là số, chương trình sẽ tự động ngắt sập. Chúng ta có thể tận dụng lợi thế đó để lấy cớ cho người dùng thoát ra, như ví dụ dưới:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 1.50s
     Running \`target/debug/guessing_game\`
Guess the number!
The secret number is: 59
Please input your guess.
50
You guessed: 50
Too small!
Please input your guess.
quit
thread 'main' panicked at src/main.rs:28:47:
Please type a number!: ParseIntError { kind: InvalidDigit }
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace</code></pre>
</div>
<p>Nhập chữ <code>quit</code> sẽ cho trò chơi sập chương trình. Nhưng tính năng thoát này vẫn chưa lý tưởng lắm. Tốt nhất chúng ta nên cho nó tự động dừng khi người chơi đã giành phần chiến thắng bằng cách đoán đúng.</p>

<h3 class="task-heading">Thoát trò chơi Sau khi Đoán Đúng</h3>
<p>Hãy lập trình trò chơi tự thoát khi người chơi chiến thắng, thông qua việc thêm vào câu lệnh <code>break</code>:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        // --snip--
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}</code></pre>
</div>
<p>Việc gắn câu lệnh <code>break</code> ngay sau điểm <code>You win!</code> làm cho chương trình chạy thoát vòng lặp ngay lập tức khi mà người dùng đoán đúng số. Thoát khỏi vòng lặp lúc này cũng đồng nghĩa là kết thúc phiên chạy chương trình luôn, bởi vì vòng lặp vốn đã là phần thiết lập mã chạy cuối cùng của hàm <code>main</code>.</p>

<h3 class="task-heading">Xử Lý Đầu vào Không Hợp Lệ</h3>
<p>Để đánh bóng hơn quá trình tương tác trên trò chơi, đáng ra thay vì phá sập chương trình ngay lúc người dùng lỡ nhập sai dữ liệu loại chữ, thì hãy tìm giải pháp lơ đẹp những kết quả không phải là số để qua đó mà người chơi có thể vô tư nhập đoán tiếp. Chúng ta có thể kiến thiết nó bằng qua việc căn chỉnh lại cái lúc mà <code>guess</code> gồng mình ép kiểu từ <code>String</code> qua cho <code>u32</code>.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        // --snip--

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {guess}");

        // --snip--</code></pre>
</div>
<p>Chúng ta tráo bộ gọi <code>expect</code> thành sự ứng xử bằng biểu thức <code>match</code> nhằm mục đích đổi từ trạng thái tàn sập cả máy thi đối mặt lỗi sang việc xử lý mầm lỗi êm xuôi. Chú ý rằng phương thức <code>parse</code> sẽ luôn trả kết hồi một thể loại <code>Result</code> và <code>Result</code> vốn là một enum có thêm hai người anh em thể nhánh báo <code>Ok</code> và <code>Err</code>. Ta đã và đang đưa <code>match</code> ứng dụng vào đoạn này, hệt cách mình đã làm ở trước đó khi đo sự so sánh với hàm <code>cmp</code>.</p>

<p>Nếu hàm <code>parse</code> làm phép quy đổi cấu thành dạng dạng số đúng điệu thành công tuyệt vời, kết tinh cho bạn sẽ là chắt trong tay gói phong bì trả gọi là <code>Ok</code> và trong bì chứa tấm chiếu số nguyên ta đang rất đói cần. Miếng giấy ấy là kết tinh trùng khít tương khớp hoàn toàn rẽ nhánh lệnh ngõ tiên khởi, theo cách này dòng mã lệnh trong khung <code>match</code> này sẽ trả con số thật trị mang tên biến định hình là <code>num</code>, mà sau đó biến trơn tru chuỗi <code>guess</code> mới đè xén luôn qua con biến giá trị cũ đi cho đúng cái khung mà mong chờ.</p>

<p>Hàm gọi <code>parse</code> trong trường hợp thất bại không thể chuyển đổi chữ thành một số được sẽ trả về <code>Err</code> chứa thông tin vì sao bị lỗi. Giá trị trả về <code>Err</code> sẽ không khớp với mẫu <code>Ok(num)</code> ở cành phân nhánh đầu tiên, nhưng lại vừa khít với nhánh <code>Err(_)</code> ở cành lựa chọn thứ hai. Nét gạch dưới <code>_</code> đóng vai trò chụp bắt tất cả mọi thứ; trong trường hợp tình huống này thì có nghĩa là ta đang bảo máy tính rằng ta muốn khớp giá trị với mọi mẫu <code>Err</code>, bất chấp việc trong nó có kèm theo thông tin lỗi chi tiết gì đi chăng nữa. Do đó chương trình sẽ thi triển đoạn mã ở cành lệnh thứ hai này, với lệnh <code>continue</code> khiến cho máy tính lập tức nhảy thẳng sang chu kỳ lặp mới tiếp theo của vòng lặp và đà này đòi hỏi người chơi cung cấp thêm một dự đoán nữa. Rốt cuộc lại là trò chơi của chúng ta sẽ phớt lờ và bỏ qua hết 100% mọi lỗi có thể mắc phải do hàm <code>parse</code> gây ra!</p>

<p>Bây giờ thì mọi thứ trong chương trình đáng lẽ ra phải chạy mượt mà đúng như trông đợi. Chạy thử nhé:</p>
`,
      defaultCode: `use std::io;
use std::cmp::Ordering;

fn main() {
    println!("Guess the number!");

    let secret_number = 77; // Ở phần sandbox này ta xài số trực tiếp!
    
    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {guess}");

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
`,
      expectedOutput: 'Guess the number!\nPlease input your guess.'
    },
    {
      id: 'ch02-01-ex',
      title: 'Bài tập 2.1: Khởi tạo biến String',
      duration: '5 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy khởi tạo một biến có thể thay đổi để chứa dữ liệu nhập vào!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, hãy tạo một biến <strong>khả biến (mutable)</strong> tên là <code>guess</code>.</li>
  <li>Gán cho nó một đối tượng <code>String</code> mới và rỗng bằng cách gọi <code>String::new()</code>.</li>
</ol>
`,
      defaultCode: `fn main() {
    // TODO: Tạo một biến \`guess\` khả biến (mutable) và gán cho nó một String mới
    // let mut guess = ...
    
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_guess_variable() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "");
        
        let has_mut_guess = code_clean.contains("letmutguess=String::new();") || code_clean.contains("letmutguess:String=String::new();");
        assert!(has_mut_guess, "Bạn cần khai báo 'let mut guess = String::new();'");
    }
}
`
    },
    {
      id: 'ch02-04-ex',
      title: 'Bài tập 2.4: Shadowing và Ép kiểu',
      duration: '10 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy thực hành Shadowing để chuyển đổi kiểu dữ liệu!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tôi có sẵn biến <code>guess</code> là một chuỗi <code>"  42  "</code>.</li>
  <li>Bạn hãy tạo một biến <code>guess</code> mới (shadowing) với kiểu <code>u32</code>.</li>
  <li>Sử dụng các phương thức <code>.trim()</code> và <code>.parse()</code> để chuyển đổi chuỗi đó thành số.</li>
  <li>Sử dụng <code>.expect()</code> để xử lý lỗi nếu không parse được.</li>
</ol>
`,
      defaultCode: `fn main() {
    let guess = "  42  ";
    
    // TODO: Khai báo lại (shadowing) biến \`guess\` thành kiểu u32
    //       Dùng .trim().parse() để chuyển đổi, và .expect() để báo lỗi nếu sai
    // let guess: u32 = ...
    
    println!("Số đã parse: {}", guess);
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_shadowing_parse() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "");
        
        let has_shadowing = code_clean.contains("letguess:u32=guess.trim().parse().expect(");
        assert!(has_shadowing, "Bạn chưa thực hiện shadowing đúng cách: 'let guess: u32 = guess.trim().parse().expect(...);'");
    }
}
`
    },
    {
      id: 'ch02-05-ex',
      title: 'Bài tập 2.5: So sánh Matching',
      duration: '10 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy sử dụng biểu thức <code>match</code> để so sánh hai số!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, tôi đã có <code>guess</code> và <code>secret_number</code>.</li>
  <li>Bạn hãy dùng <code>match guess.cmp(&secret_number)</code> để in ra:</li>
  <ul>
    <li><code>Ordering::Less</code> => "Too small!"</li>
    <li><code>Ordering::Greater</code> => "Too big!"</li>
    <li><code>Ordering::Equal</code> => "You win!"</li>
  </ul>
</ol>
`,
      defaultCode: `use std::cmp::Ordering;

fn main() {
    let guess = 50;
    let secret_number = 77;
    
    // TODO: Dùng biểu thức match để so sánh guess với secret_number:
    // match guess.cmp(&secret_number) {
    //     Ordering::Less => ...,
    //     Ordering::Greater => ...,
    //     Ordering::Equal => ...,
    // }
    
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_match_ordering() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "").replace("\n", "");
        
        assert!(code_clean.contains("Ordering::Less=>println!(\"Toosmall!\")"), "Thiếu trường hợp Less");
        assert!(code_clean.contains("Ordering::Greater=>println!(\"Toobig!\")"), "Thiếu trường hợp Greater");
        assert!(code_clean.contains("Ordering::Equal=>println!(\"Youwin!\")"), "Thiếu trường hợp Equal");
    }
}
`
    }
  ]
};
