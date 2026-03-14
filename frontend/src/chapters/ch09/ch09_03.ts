import { Lesson } from '../../courses';

export const ch09_03: Lesson = {
            id: 'ch09-03',
            title: '9.3 To panic! or Not to panic!',
            duration: '10 phút',
            type: 'theory',
            content: `
<p>Vậy, bạn quyết định khi nào nên gọi panic! và khi nào nên trả về Result? Khi code panics, không có cách nào để phục hồi. Bạn có thể gọi panic! cho bất kỳ tình huống lỗi nào, cho dù có cách có thể phục hồi hay không, nhưng sau đó bạn đang đưa ra quyết định rằng tình huống không thể phục hồi thay mặt cho calling code. Khi bạn chọn trả về giá trị Result, bạn cung cấp các lựa chọn cho calling code. Calling code có thể chọn cố gắng phục hồi theo cách phù hợp cho tình huống của nó, hoặc nó có thể quyết định rằng giá trị Err trong trường hợp này là không thể phục hồi, vì vậy nó có thể gọi panic! và biến lỗi có thể phục hồi của bạn thành một lỗi không thể phục hồi. Do đó, trả về Result là một lựa chọn tốt mặc định khi bạn định nghĩa một hàm có thể thất bại.</p>

<h3 class="task-heading">Examples, Prototype Code, và Tests</h3>
<p>Khi bạn đang viết một ví dụ để minh họa một số khái niệm, việc bao gồm cả robust error-handling code có thể làm cho ví dụ kém rõ ràng hơn. Trong các ví dụ, được hiểu rằng một lời gọi đến một method như unwrap có thể panic là đại diện cho cách bạn muốn ứng dụng của mình xử lý các lỗi, có thể khác nhau tùy thuộc vào phần còn lại của code bạn đang làm.</p>

<p>Tương tự, các methods unwrap và expect rất tiện dụng khi bạn đang prototype và bạn chưa sẵn sàng quyết định cách xử lý errors. Chúng để lại các markers rõ ràng trong code của bạn cho khi bạn sẵn sàng làm cho chương trình của mình robust hơn.</p>

<p>Nếu một method call thất bại trong một test, bạn muốn toàn bộ test fail, ngay cả khi method đó không phải là chức năng đang được test. Vì panic! là cách một test được đánh dấu là thất bại, gọi unwrap hoặc expect là chính xác những gì nên xảy ra.</p>

<h3 class="task-heading">Khi Bạn Có Nhiều Thông Tin Hơn Compiler</h3>
<p>Cũng sẽ phù hợp để gọi expect khi bạn có một số logic khác đảm bảo rằng Result sẽ có giá trị Ok, nhưng logic đó không phải là thứ compiler hiểu được. Bạn vẫn sẽ có một giá trị Result cần xử lý: Bất kỳ operation nào bạn đang gọi vẫn có khả năng thất bại nói chung, mặc dù về mặt logic không thể xảy ra trong tình huống cụ thể của bạn. Nếu bạn có thể đảm bảo bằng cách kiểm tra code thủ công rằng bạn sẽ không bao giờ có variant Err, thì hoàn toàn chấp nhận được để gọi expect và ghi lý do bạn nghĩ bạn sẽ không bao giờ có variant Err trong argument text. Đây là một ví dụ:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::net::IpAddr;

let home: IpAddr = "127.0.0.1"
    .parse()
    .expect("Hardcoded IP address should be valid");</code></pre>
</div>

<p>Chúng ta đang tạo một IpAddr instance bằng cách parse một string được hardcode. Chúng ta có thể thấy rằng 127.0.0.1 là một địa chỉ IP hợp lệ, vì vậy việc sử dụng expect ở đây là chấp nhận được. Tuy nhiên, việc có một string hợp lệ được hardcode không thay đổi return type của method parse: Chúng ta vẫn nhận được một giá trị Result, và compiler vẫn sẽ buộc chúng ta xử lý Result như thể variant Err là một khả năng vì compiler không đủ thông minh để thấy rằng string này luôn là một địa chỉ IP hợp lệ.</p>

<h3 class="task-heading">Guidelines cho Error Handling</h3>
<p>Khuyến nghị rằng code của bạn nên panic khi có thể kết thúc ở trạng thái xấu. Trong ngữ cảnh này, trạng thái xấu là khi một số giả định, đảm bảo, contract, hoặc invariant đã bị vi phạm, như khi các giá trị không hợp lệ, các giá trị mâu thuẫn, hoặc các giá trị thiếu được truyền cho code của bạn—cộng với một hoặc nhiều hơn sau đây:</p>

<ul class="task-list">
  <li>Trạng thái xấu là điều không mong đợi, trái ngược với điều sẽ thỉnh thoảng xảy ra, như người dùng nhập dữ liệu sai định dạng.</li>
  <li>Code của bạn sau điểm này cần dựa vào việc không ở trong trạng thái xấu này, thay vì kiểm tra vấn đề ở mỗi bước.</li>
  <li>Không có cách tốt để encode thông tin này trong các kiểu bạn sử dụng.</li>
</ul>

<p>Nếu ai đó gọi code của bạn và truyền các giá trị không hợp lý, tốt nhất là trả về error nếu bạn có thể để người dùng của thư viện có thể quyết định họ muốn làm gì trong trường hợp đó. Tuy nhiên, trong các trường hợp tiếp tục có thể không an toàn hoặc có hại, lựa chọn tốt nhất có thể là gọi panic! và alert người sử dụng thư viện của bạn về bug trong code của họ để họ có thể sửa trong quá trình phát triển. Tương tự, panic! thường phù hợp nếu bạn đang gọi external code mà bạn không kiểm soát và trả về trạng thái không hợp lệ mà bạn không có cách sửa.</p>

<p>Tuy nhiên, khi failure là expected, phù hợp hơn để trả về Result thay vì gọi panic!. Ví dụ bao gồm một parser được đưa dữ liệu sai định dạng hoặc một HTTP request trả về status cho biết bạn đã đạt đến rate limit. Trong các trường hợp này, việc trả về Result cho biết rằng failure là một khả năng expected mà calling code phải quyết định cách xử lý.</p>

<p>Khi code của bạn thực hiện một operation có thể đặt người dùng vào rủi ro nếu nó được gọi sử dụng các giá trị không hợp lệ, code của bạn nên verify các giá trị hợp lệ trước và panic nếu các giá trị không hợp lệ. Đây là vì lý do an toàn: Cố gắng operate trên dữ liệu không hợp lệ có thể expose code của bạn với vulnerabilities. Đây là lý do chính thư viện chuẩn sẽ gọi panic! nếu bạn cố gắng truy cập bộ nhớ out-of-bounds: Cố gắng truy cập bộ nhớ không thuộc về cấu trúc dữ liệu hiện tại là một vấn đề bảo mật phổ biến.</p>

<h3 class="task-heading">Custom Types cho Validation</h3>
<p>Hãy xem xét ý tưởng sử dụng type system của Rust để đảm bảo rằng chúng ta có một giá trị hợp lệ và xem xét việc tạo một custom type cho validation. Nhớ lại game đoán số trong Chương 2 trong đó code yêu cầu người dùng đoán một số giữa 1 và 100. Chúng ta không bao giờ validate rằng guess của người dùng nằm giữa các số đó trước khi kiểm tra nó với secret number; chúng ta chỉ validate rằng guess là dương. Trong trường hợp này, hậu quả không nghiêm trọng lắm: Output "Too high" hoặc "Too low" của chúng ta vẫn sẽ đúng. Nhưng đó sẽ là một cải tiến hữu ích để hướng dẫn người dùng đến các guesses hợp lệ và có behavior khác khi người dùng đoán một số ngoài phạm vi so với khi người dùng gõ, ví dụ, các chữ cái.</p>

<p>Một cách để làm điều này là parse guess như một i32 thay vì chỉ một u32 để cho phép các số tiềm năng, và sau đó thêm một check cho số nằm trong phạm vi.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>loop {
    // ...

    let guess: i32 = match guess.trim().parse() {
        Ok(num) => num,
        Err(_) => continue,
    };

    if guess < 1 || guess > 100 {
        println!("The secret number will be between 1 and 100.");
        continue;
    }

    match guess.cmp(&secret_number) {
        // ...
    }
}</code></pre>
</div>

<p>Tuy nhiên, đây không phải là giải pháp lý tưởng: Nếu điều quan trọng là chương trình chỉ operate trên các giá trị giữa 1 và 100, và nó có nhiều functions với yêu cầu này, việc có một check như thế này trong mỗi function sẽ tẻ nhạt (và có thể ảnh hưởng đến hiệu suất).</p>

<p>Thay vào đó, chúng ta có thể tạo một type mới trong một module riêng và put validations trong một function để tạo một instance của type thay vì lặp lại validations ở mọi nơi. Bằng cách đó, các functions có thể sử dụng type mới trong signatures của chúng một cách an toàn và tự tin sử dụng các giá trị họ nhận được. Ví dụ 9-13 cho thấy một cách để định nghĩa một Guess type sẽ chỉ tạo một instance của Guess nếu function new nhận được một giá trị giữa 1 và 100.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {value}.");
        }

        Guess { value }
    }

    pub fn value(&self) -> i32 {
        self.value
    }
}</code></pre>
</div>
<p><em>Ví dụ 9-13: Một Guess type sẽ chỉ tiếp tục với các giá trị giữa 1 và 100</em></p>

<p>Lưu ý rằng code này phụ thuộc vào việc thêm một khai báo module mod guessing_game; trong src/lib.rs mà chúng ta chưa show ở đây. Trong file module mới này, chúng ta định nghĩa một struct tên là Guess có một field tên là value giữ một i32. Đây là nơi số sẽ được lưu trữ.</p>

<p>Sau đó, chúng ta implement một associated function tên là new trên Guess tạo các instances của Guess values. Function new được định nghĩa có một parameter tên là value kiểu i32 và trả về một Guess. Code trong body của function new tests value để đảm bảo nó giữa 1 và 100. Nếu value không pass test này, chúng ta gọi panic!, sẽ alert programmer đang viết calling code rằng họ có một bug cần sửa, vì việc tạo một Guess với một giá trị ngoài phạm vi này sẽ vi phạm contract mà Guess::new đang dựa vào.</p>

<p>Tiếp theo, chúng ta implement một method tên là value borrow self, không có các parameters khác, và trả về một i32. Loại method này đôi khi được gọi là getter vì mục đích của nó là lấy một số data từ các fields và trả về nó. Method public này là cần thiết vì field value của Guess struct là private. Điều quan trọng là field value phải là private để code sử dụng Guess struct không được phép set value trực tiếp: Code bên ngoài guessing_game module phải sử dụng Guess::new function để tạo một instance của Guess, do đó đảm bảo rằng không có cách nào để Guess có một giá trị chưa được check bởi các điều kiện trong Guess::new function.</p>

<p>Một function có một parameter hoặc trả về chỉ các số giữa 1 và 100 sau đó có thể khai báo trong signature của nó rằng nó take hoặc trả về một Guess thay vì một i32 và không cần phải làm bất kỳ checks bổ sung nào trong body của nó.</p>

<h3 class="task-heading">Tóm tắt</h3>
<p>Các tính năng error-handling của Rust được thiết kế để giúp bạn viết robust code hơn. Macro panic! signal rằng chương trình của bạn ở trạng thái nó không thể xử lý và cho phép bạn bảo process dừng lại thay vì cố gắng tiến tục với các giá trị không hợp lệ hoặc không đúng. Enum Result sử dụng type system của Rust để indicate rằng operations có thể fail theo cách mà code của bạn có thể phục hồi. Bạn có thể sử dụng Result để nói với code gọi code của bạn rằng nó cần xử lý potential success hoặc failure. Sử dụng panic! và Result trong các tình huống phù hợp sẽ làm cho code của bạn reliable hơn trước các vấn đề không thể tránh.</p>

<p>Bây giờ bạn đã thấy các cách hữu ích mà thư viện chuẩn sử dụng generics với các enums Option và Result, chúng ta sẽ nói về generics hoạt động như thế nào và bạn có thể sử dụng chúng trong code của mình.</p>
`,
            defaultCode: `struct Percentage {
    value: f64,
}

impl Percentage {
    fn new(value: f64) -> Result<Self, String> {
        if value < 0.0 || value > 100.0 {
            Err(format!("{value} không nằm trong khoảng 0-100"))
        } else {
            Ok(Percentage { value })
        }
    }

    fn display(&self) -> String {
        format!("{:.1}%", self.value)
    }
}

fn main() {
    // Valid
    match Percentage::new(85.5) {
        Ok(p) => println!("Tỷ lệ: {}", p.display()),
        Err(e) => println!("Lỗi: {e}"),
    }

    // Invalid
    match Percentage::new(150.0) {
        Ok(p) => println!("Tỷ lệ: {}", p.display()),
        Err(e) => println!("Lỗi: {e}"),
    }

    // Invalid negative
    match Percentage::new(-5.0) {
        Ok(p) => println!("Tỷ lệ: {}", p.display()),
        Err(e) => println!("Lỗi: {e}"),
    }
}
`,
            expectedOutput: 'Tỷ lệ: 85.5%\nLỗi: 150 không nằm trong khoảng 0-100\nLỗi: -5 không nằm trong khoảng 0-100'
        };
