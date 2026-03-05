import { Lesson } from '../../courses';

export const ch02_05: Lesson = {
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
    };
