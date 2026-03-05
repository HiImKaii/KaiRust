import { Lesson } from '../../courses';

export const ch02_03: Lesson = {
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
    };
