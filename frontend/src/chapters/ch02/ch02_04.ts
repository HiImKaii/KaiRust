import { Lesson } from '../../courses';

export const ch02_04: Lesson = {
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
    };
