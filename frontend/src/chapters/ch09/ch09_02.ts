import { Lesson } from '../../courses';

export const ch09_02: Lesson = {
            id: 'ch09-02',
            title: '9.2 Recoverable Errors with Result',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Hầu hết các lỗi không nghiêm trọng đến mức yêu cầu chương trình phải dừng hoàn toàn. Đôi khi khi một hàm thất bại, đó là vì một lý do mà bạn có thể dễ dàng diễn giải và phản hồi. Ví dụ, nếu bạn cố gắng mở một file và thao tác đó thất bại vì file không tồn tại, bạn có thể muốn tạo file đó thay vì terminate process.</p>

<h3 class="task-heading">Giới thiệu Result Enum</h3>
<p>Hãy nhớ lại từ phần "Xử lý Lỗi Tiềm Năng với Result" trong Chương 2 rằng enum Result được định nghĩa có hai variants, Ok và Err, như sau:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Result&lt;T, E&gt; {
    Ok(T),
    Err(E),
}</code></pre>
</div>

<p>T và E là các generic type parameters: Chúng ta sẽ thảo luận về generics chi tiết hơn trong Chương 10. Điều bạn cần biết ngay bây giờ là T đại diện cho kiểu của giá trị sẽ được trả về trong trường hợp thành công bên trong variant Ok, và E đại diện cho kiểu của lỗi sẽ được trả về trong trường hợp thất bại bên trong variant Err. Vì Result có các generic type parameters này, chúng ta có thể sử dụng kiểu Result và các hàm được định nghĩa trên nó trong nhiều tình huống khác nhau mà giá trị thành công và giá trị lỗi chúng ta muốn trả về có thể khác nhau.</p>

<h3 class="task-heading">Gọi Một Hàm Trả Về Result</h3>
<p>Hãy gọi một hàm trả về giá trị Result vì hàm đó có thể thất bại. Trong Ví dụ 9-3, chúng ta cố gắng mở một file.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");
}</code></pre>
</div>
<p><em>Ví dụ 9-3: Mở một file</em></p>

<p>Return type của File::open là Result&lt;T, E&gt;. Generic parameter T đã được điền bởi implementation của File::open với kiểu của giá trị thành công, std::fs::File, là một file handle. Kiểu của E được sử dụng trong giá trị lỗi là std::io::Error. Return type này có nghĩa là lời gọi đến File::open có thể thành công và trả về một file handle mà chúng ta có thể đọc từ đó hoặc ghi vào đó. Lời gọi hàm cũng có thể thất bại: Ví dụ, file có thể không tồn tại, hoặc chúng ta có thể không có quyền truy cập file. Hàm File::open cần có cách để cho chúng ta biết nó đã thành công hay thất bại và đồng thời cho chúng ta hoặc là file handle hoặc là thông tin lỗi. Thông tin này chính xác là những gì Result enum truyền tải.</p>

<p>Trong trường hợp File::open thành công, giá trị trong biến greeting_file_result sẽ là một instance của Ok chứa một file handle. Trong trường hợp nó thất bại, giá trị trong greeting_file_result sẽ là một instance của Err chứa thêm thông tin về loại đã xảy ra.</p>

<h3 class="task-heading">Xử Lý Result Với Match</h3>
<p>Chúng ta cần thêm vào code trong Ví dụ 9-3 để thực hiện các hành động khác nhau tùy thuộc vào giá trị mà File::open trả về. Ví dụ 9-4 cho thấy một cách để xử lý Result sử dụng một công cụ cơ bản, match expression mà chúng ta đã thảo luận trong Chương 6.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs::File;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => panic!("Problem opening the file: {error:?}"),
    };
}</code></pre>
</div>
<p><em>Ví dụ 9-4: Sử dụng match expression để xử lý các variant của Result có thể được trả về</em></p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Giống như enum Option, enum Result và các variants của nó đã được đưa vào scope bởi prelude, vì vậy chúng ta không cần chỉ định Result:: trước các variants Ok và Err trong các nhánh của match.
</div>

<p>Khi result là Ok, code này sẽ trả về giá trị file bên trong từ variant Ok, và sau đó chúng ta gán giá trị file handle đó cho biến greeting_file. Sau match, chúng ta có thể sử dụng file handle để đọc hoặc ghi.</p>

<p>Nhánh khác của match xử lý trường hợp chúng ta nhận được giá trị Err từ File::open. Trong ví dụ này, chúng ta đã chọn gọi macro panic!. Nếu không có file tên là hello.txt trong thư mục hiện tại và chúng ta chạy code này, chúng ta sẽ thấy output sau từ macro panic!:</p>

<pre><code>thread 'main' panicked at src/main.rs:8:23:
Problem opening the file: Os { code: 2, kind: NotFound, message: "No such file or directory" }</code></pre>

<h3 class="task-heading">Xử Lý Các Lỗi Khác Nhau</h3>
<p>Code trong Ví dụ 9-4 sẽ panic! không quan trọng lý do tại sao File::open thất bại. Tuy nhiên, chúng ta muốn thực hiện các hành động khác nhau cho các lý do thất bại khác nhau. Nếu File::open thất bại vì file không tồn tại, chúng ta muốn tạo file và trả về handle đến file mới. Nếu File::open thất bại vì bất kỳ lý do nào khác — ví dụ, vì chúng ta không có quyền mở file — chúng ta vẫn muốn code panic! theo cùng cách như trong Ví dụ 9-4. Để làm điều này, chúng ta thêm một inner match expression, như trong Ví dụ 9-5.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file_result = File::open("hello.txt");

    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {e:?}"),
            },
            _ => {
                panic!("Problem opening the file: {error:?}");
            }
        },
    };
}</code></pre>
</div>
<p><em>Ví dụ 9-5: Xử lý các loại lỗi khác nhau theo cách khác nhau</em></p>

<p>Kiểu của giá trị mà File::open trả về bên trong variant Err là io::Error, là một struct được cung cấp bởi thư viện chuẩn. Struct này có một method, kind, mà chúng ta có thể gọi để lấy giá trị io::ErrorKind. Enum io::ErrorKind được cung cấp bởi thư viện chuẩn và có các variants đại diện cho các loại lỗi khác nhau có thể resulting từ một io operation. Variant chúng ta muốn sử dụng là ErrorKind::NotFound, cho biết file chúng ta đang cố mở chưa tồn tại. Vì vậy, chúng ta match trên greeting_file_result, nhưng chúng ta cũng có một inner match trên error.kind().</p>

<h3 class="task-heading">Các Alternatves Cho Match Với Result</h3>
<p>Đó là rất nhiều match! Match expression rất hữu ích nhưng cũng rất primitive. Trong Chương 13, bạn sẽ tìm hiểu về closures, được sử dụng với nhiều methods được định nghĩa trên Result&lt;T, E&gt;. Các methods này có thể ngắn gọn hơn khi sử dụng match khi xử lý các giá trị Result&lt;T, E&gt; trong code của bạn.</p>

<p>Ví dụ, đây là một cách khác để viết cùng logic như trong Ví dụ 9-5, lần này sử dụng closures và method unwrap_or_else:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {error:?}");
            })
        } else {
            panic!("Problem opening the file: {error:?}");
        }
    });
}</code></pre>
</div>

<p>Mặc dù code này có cùng behavior như Ví dụ 9-5, nó không chứa bất kỳ match expression nào và sạch hơn để đọc. Hãy quay lại ví dụ này sau khi bạn đã đọc Chương 13 và tra cứu method unwrap_or_else trong tài liệu thư viện chuẩn.</p>

<h3 class="task-heading">Shortcuts Cho Panic On Error</h3>
<p>Sử dụng match hoạt động đủ tốt, nhưng nó có thể hơi verbose và không phải lúc nào cũng communicate intent tốt. Kiểu Result&lt;T, E&gt; có nhiều helper methods được định nghĩa trên nó để thực hiện các tasks cụ thể khác nhau. Method unwrap là một shortcut method được implement giống như match expression chúng ta đã viết trong Ví dụ 9-4. Nếu giá trị Result là variant Ok, unwrap sẽ trả về giá trị bên trong Ok. Nếu Result là variant Err, unwrap sẽ gọi macro panic! cho chúng ta. Đây là một ví dụ về unwrap trong thực tế:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt").unwrap();
}</code></pre>
</div>

<p>Nếu chúng ta chạy code này mà không có file hello.txt, chúng ta sẽ thấy error message từ lời gọi panic! mà unwrap method thực hiện:</p>

<pre><code>thread 'main' panicked at src/main.rs:4:49:
called \`Result::unwrap()\` on an \`Err\` value: Os { code: 2, kind: NotFound, message: "No such file or directory" }</code></pre>

<p>Tương tự, method expect cho phép chúng ta cũng chọn panic! error message. Sử dụng expect thay vì unwrap và cung cấp good error messages có thể convey intent của bạn và làm cho việc tracking down source của panic dễ hơn. Cú pháp của expect trông như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt")
        .expect("hello.txt should be included in this project");
}</code></pre>
</div>

<p>Chúng ta sử dụng expect theo cùng cách như unwrap: để trả về file handle hoặc gọi macro panic!. Error message được sử dụng bởi expect trong lời gọi của nó đến panic! sẽ là tham số mà chúng ta pass cho expect, thay vì panic! message mặc định mà unwrap sử dụng.</p>

<div class="cyber-alert info">
  <strong>Khuyến nghị:</strong> Trong code production-quality, hầu hết Rustaceans chọn expect thay vì unwrap và cung cấp thêm context về tại sao operation được kỳ vọng luôn thành công. Bằng cách đó, nếu giả định của bạn bị chứng minh là sai, bạn có nhiều thông tin hơn để sử dụng trong debugging.
</div>

<h3 class="task-heading">Propagating Errors</h3>
<p>Khi implementation của một hàm gọi một thứ gì đó có thể thất bại, thay vì xử lý lỗi trong chính hàm đó, bạn có thể trả về lỗi cho calling code để nó quyết định làm gì. Điều này được gọi là propagating the error và cung cấp nhiều quyền kiểm soát hơn cho calling code, nơi có thể có nhiều thông tin hoặc logic hơn quyết định cách xử lý lỗi hơn những gì bạn có trong context của code.</p>

<p>Ví dụ, Ví dụ 9-6 cho thấy một hàm đọc username từ một file. Nếu file không tồn tại hoặc không thể đọc, hàm này sẽ trả về các lỗi đó cho code gọi hàm.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result&lt;String, io::Error&gt; {
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        Ok(_) => Ok(username),
        Err(e) => Err(e),
    }
}</code></pre>
</div>
<p><em>Ví dụ 9-6: Một hàm trả về errors cho calling code sử dụng match</em></p>

<p>Hàm này có thể được viết theo cách ngắn hơn nhiều, nhưng chúng ta sẽ bắt đầu bằng việc làm nhiều thứ thủ công để khám phá error handling; ở cuối, chúng ta sẽ show cách ngắn hơn. Hãy xem return type của hàm trước: Result&lt;String, io::Error&gt;. Điều này có nghĩa là hàm đang trả về một giá trị của kiểu Result&lt;T, E&gt;, trong đó generic parameter T đã được điền với kiểu cụ thể String và generic type E đã được điền với kiểu cụ thể io::Error.</p>

<p>Nếu hàm này thành công mà không có vấn đề gì, code gọi hàm này sẽ nhận được một giá trị Ok chứa String—username mà hàm này đã đọc từ file. Nếu hàm này gặp bất kỳ vấn đề nào, calling code sẽ nhận được một giá trị Err chứa một instance của io::Error chứa thêm thông tin về những vấn đề gì đã xảy ra. Chúng ta chọn io::Error làm return type của hàm này vì đó là kiểu của giá trị lỗi được trả về từ cả hai operations mà chúng ta đang gọi trong body của hàm này có thể thất bại: hàm File::open và method read_to_string.</p>

<p>Body của hàm bắt đầu bằng việc gọi hàm File::open. Sau đó, chúng ta xử lý giá trị Result với một match tương tự như match trong Ví dụ 9-4. Nếu File::open thành công, file handle trong biến pattern file trở thành giá trị trong biến mutable username_file và hàm tiếp tục. Trong trường hợp Err, thay vì gọi panic!, chúng ta sử dụng từ khóa return để return early khỏi hàm hoàn toàn và pass giá trị lỗi từ File::open, bây giờ trong biến pattern e, trở lại calling code như là giá trị lỗi của hàm này.</p>

<p>Vì vậy, nếu chúng ta có một file handle trong username_file, hàm sau đó tạo một String mới trong biến username và gọi method read_to_string trên file handle trong username_file để đọc nội dung của file vào username. Method read_to_string cũng trả về một Result vì nó có thể thất bại, ngay cả khi File::open đã thành công. Vì vậy, chúng ta cần một match khác để xử lý Result đó: Nếu read_to_string thành công, thì hàm của chúng ta đã thành công, và chúng ta trả về username từ file bây giờ trong username được bọc trong một Ok. Nếu read_to_string thất bại, chúng ta trả về giá trị lỗi theo cùng cách mà chúng ta trả về giá trị lỗi trong match xử lý return value của File::open. Tuy nhiên, chúng ta không cần nói rõ return, vì đây là expression cuối cùng trong hàm.</p>

<p>Code gọi code này sau đó sẽ xử lý việc nhận được một giá trị Ok chứa username hoặc một giá trị Err chứa io::Error. Đó là quyền của calling code để quyết định làm gì với các giá trị đó. Nếu calling code nhận được giá trị Err, nó có thể gọi panic! và crash chương trình, sử dụng username mặc định, hoặc tra cứu username từ nơi khác không phải file, ví dụ. Chúng ta không có đủ thông tin về việc calling code thực sự đang cố làm gì, vì vậy chúng ta propagate tất cả thông tin thành công hoặc lỗi lên trên để nó xử lý một cách thích hợp.</p>

<h3 class="task-heading">Toán Tử ? Shortcut</h3>
<p>Pattern propagating errors này phổ biến đến mức trong Rust mà Rust cung cấp toán tử question mark ? để làm điều này dễ dàng hơn.</p>

<p>Ví dụ 9-7 cho thấy một implementation của read_username_from_file có cùng functionality như trong Ví dụ 9-6, nhưng implementation này sử dụng toán tử ?.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result&lt;String, io::Error&gt; {
    let mut username_file = File::open("hello.txt")?;
    let mut username = String::new();
    username_file.read_to_string(&mut username)?;
    Ok(username)
}</code></pre>
</div>
<p><em>Ví dụ 9-7: Một hàm trả về errors cho calling code sử dụng toán tử ?</em></p>

<p>Đặt ? sau một giá trị Result được định nghĩa để hoạt động gần như cùng cách như các match expressions mà chúng ta định nghĩa để xử lý các giá trị Result trong Ví dụ 9-6. Nếu giá trị của Result là một Ok, giá trị bên trong Ok sẽ được trả về từ expression này, và chương trình sẽ tiếp tục. Nếu giá trị là một Err, Err sẽ được trả về từ toàn bộ hàm như thể chúng ta đã sử dụng từ khóa return để giá trị lỗi được propagate đến calling code.</p>

<p>Có một sự khác biệt giữa những gì match expression từ Ví dụ 9-6 làm và những gì toán tử ? làm: Các giá trị lỗi mà toán tử ? được gọi trên đi qua function from, được định nghĩa trong trait From trong thư viện chuẩn, được sử dụng để convert values từ một kiểu sang kiểu khác. Khi toán tử ? gọi function from, kiểu lỗi nhận được được convert thành kiểu lỗi được định nghĩa trong return type của hàm hiện tại. Điều này hữu ích khi một hàm trả về một kiểu lỗi để đại diện cho tất cả các cách một hàm có thể thất bại, ngay cả khi các phần có thể thất bại vì nhiều lý do khác nhau.</p>

<p>Trong context của Ví dụ 9-7, ? ở cuối lời gọi File::open sẽ trả về giá trị bên trong một Ok cho biến username_file. Nếu một lỗi xảy ra, toán tử ? sẽ return early khỏi toàn bộ hàm và đưa bất kỳ giá trị Err nào cho calling code. Điều tương tự áp dụng cho ? ở cuối lời gọi read_to_string.</p>

<p>Toán tử ? loại bỏ rất nhiều boilerplate và làm cho implementation của hàm này đơn giản hơn. Chúng ta thậm chí có thể rút gọn code này hơn nữa bằng cách chaining method calls ngay sau ?, như trong Ví dụ 9-8.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs::File;
use std::io::{self, Read};

fn read_username_from_file() -> Result&lt;String, io::Error&gt; {
    let mut username = String::new();

    File::open("hello.txt")?.read_to_string(&mut username)?;

    Ok(username)
}</code></pre>
</div>
<p><em>Ví dụ 9-8: Chaining method calls sau toán tử ?</em></p>

<p>Chúng ta đã di chuyển việc tạo String mới trong username đến đầu hàm; phần đó không thay đổi. Thay vì tạo biến username_file, chúng ta đã chain lời gọi read_to_string trực tiếp vào kết quả của File::open("hello.txt")?. Chúng ta vẫn có một ? ở cuối lời gọi read_to_string, và chúng ta vẫn trả về một Ok value chứa username khi cả File::open và read_to_string thành công thay vì trả về errors. Functionality lại giống như trong Ví dụ 9-6 và 9-7; đây chỉ là một cách khác, ergonomic hơn để viết nó.</p>

<h3 class="task-heading">Sử Dụng fs::read_to_string</h3>
<p>Ví dụ 9-9 cho thấy một cách để làm điều này thậm chí ngắn hơn sử dụng fs::read_to_string.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs;
use std::io;

fn read_username_from_file() -> Result&lt;String, io::Error&gt; {
    fs::read_to_string("hello.txt")
}</code></pre>
</div>
<p><em>Ví dụ 9-9: Sử dụng fs::read_to_string thay vì mở và sau đó đọc file</em></p>

<p>Đọc một file vào một string là một operation khá phổ biến, vì vậy thư viện cung cấp function tiện lợi fs::read_to_string mở file, tạo một String mới, đọc nội dung của file, đặt nội dung vào String đó, và trả về nó. Tất nhiên, sử dụng fs::read_to_string không cho chúng ta cơ hội giải thích tất cả error handling, vì vậy chúng ta đã làm theo cách dài hơn trước.</p>

<h3 class="task-heading">Sử Dụng Toán Tử ? Ở Đâu</h3>
<p>Toán tử ? chỉ có thể được sử dụng trong các hàm có return type tương thích với giá trị ? được sử dụng. Điều này là vì toán tử ? được định nghĩa để thực hiện một early return của một giá trị ra khỏi hàm, theo cùng manner như match expression chúng ta định nghĩa trong Ví dụ 9-6. Trong Ví dụ 9-6, match đang sử dụng một giá trị Result, và early return arm trả về một giá trị Err(e). Return type của hàm phải là một Result để nó tương thích với return này.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này KHÔNG biên dịch được!
use std::fs::File;

fn main() {
    let greeting_file = File::open("hello.txt")?;
}</code></pre>
</div>
<p><em>Ví dụ 9-10: Cố gắng sử dụng ? trong main function trả về () sẽ không biên dịch</em></p>

<p>Code này mở một file, có thể thất bại. Toán tử ? theo giá trị Result được trả về bởi File::open, nhưng main function này có return type là (), không phải Result. Khi chúng ta biên dịch code này, chúng ta nhận được error message sau:</p>

<pre><code>error[E0277]: the \`?\` operator can only be used in a function that returns \`Result\` or \`Option\` (or another type that implements \`FromResidual\`)</code></pre>

<p>Để sửa lỗi, bạn có hai lựa chọn. Một lựa chọn là thay đổi return type của hàm của bạn để tương thích với giá trị bạn đang sử dụng toán tử ? miễn là bạn không có restrictions ngăn cản điều đó. Lựa chọn khác là sử dụng một match hoặc một trong các Result&lt;T, E&gt; methods để xử lý Result&lt;T, E&gt; theo cách thích hợp.</p>

<h3 class="task-heading">Sử Dụng ? Với Option</h3>
<p>Error message cũng đề cập rằng ? có thể được sử dụng với các giá trị Option&lt;T&gt;. Cũng như với việc sử dụng ? trên Result, bạn chỉ có thể sử dụng ? trên Option trong một hàm trả về Option. Behavior của toán tử ? khi được gọi trên Option&lt;T&gt; tương tự như behavior của nó khi được gọi trên Result&lt;T, E&gt;: Nếu giá trị là None, None sẽ được return early từ hàm tại thời điểm đó. Nếu giá trị là Some, giá trị bên trong Some là resultant value của expression, và hàm tiếp tục.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn last_char_of_first_line(text: &str) -> Option&lt;char&gt; {
    text.lines().next()?.chars().last()
}</code></pre>
</div>
<p><em>Ví dụ 9-11: Sử dụng toán tử ? trên giá trị Option&lt;T&gt;</em></p>

<p>Hàm này trả về Option&lt;char&gt; vì có thể có một ký tự ở đó, nhưng cũng có thể không. Code này lấy text string slice argument và gọi method lines trên nó, trả về một iterator over các dòng trong string. Vì hàm này muốn xem dòng đầu tiên, nó gọi next trên iterator để lấy giá trị đầu tiên từ iterator. Nếu text là string rỗng, lời gọi next này sẽ trả về None, trong trường hợp đó chúng ta sử dụng ? để dừng và return None từ last_char_of_first_line. Nếu text không rỗng, next sẽ trả về một Some value chứa một string slice của dòng đầu tiên trong text.</p>

<p>? extract string slice, và chúng ta có thể gọi chars trên string slice đó để lấy một iterator của các ký tự của nó. Chúng ta quan tâm đến ký tự cuối cùng trong dòng đầu tiên này, vì vậy chúng ta gọi last để trả về item cuối cùng trong iterator. Đây là một Option vì có thể dòng đầu tiên là string rỗng; ví dụ, nếu text bắt đầu bằng một dòng trống nhưng có ký tự trên các dòng khác, như "\nhi". Tuy nhiên, nếu có một ký tự cuối cùng trên dòng đầu tiên, nó sẽ được trả về trong variant Some. Toán tử ? ở giữa cung cấp cho chúng ta một cách ngắn gọn để express logic này, cho phép chúng ta implement hàm trong một dòng.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Bạn có thể sử dụng toán tử ? trên Result trong một hàm trả về Result, và bạn có thể sử dụng toán tử ? trên Option trong một hàm trả về Option, nhưng bạn không thể mix và match. Toán tử ? sẽ không tự động convert Result thành Option hoặc ngược lại; trong những trường hợp đó, bạn có thể sử dụng methods như ok method trên Result hoặc ok_or method trên Option để convert một cách explicit.
</div>

<h3 class="task-heading">Main Function Trả Về Result</h3>
<p>Cho đến nay, tất cả các main functions chúng ta đã sử dụng trả về (). Hàm main đặc biệt vì nó là entry point và exit point của một executable program, và có restrictions trên return type của nó để program hoạt động như mong đợi.</p>

<p>May mắn thay, main cũng có thể trả về Result&lt;(), E&gt;. Ví dụ 9-12 có code từ Ví dụ 9-10, nhưng chúng ta đã thay đổi return type của main thành Result&lt;(), Box&lt;dyn Error&gt;&gt; và thêm một return value Ok(()) ở cuối. Code này bây giờ sẽ biên dịch.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::error::Error;
use std::fs::File;

fn main() -> Result&lt;(), Box&lt;dyn Error&gt;&gt; {
    let greeting_file = File::open("hello.txt")?;

    Ok(())
}</code></pre>
</div>
<p><em>Ví dụ 9-12: Thay đổi main để trả về Result&lt;(), E&gt; cho phép sử dụng toán tử ? trên Result values</em></p>

<p>Kiểu Box&lt;dyn Error&gt; là một trait object, mà chúng ta sẽ nói về trong "Using Trait Objects to Abstract over Shared Behavior" trong Chương 18. Hiện tại, bạn có thể đọc Box&lt;dyn Error&gt; nghĩa là "bất kỳ loại lỗi nào". Sử dụng ? trên một giá trị Result trong một main function với error type Box&lt;dyn Error&gt; được cho phép vì nó cho phép bất kỳ giá trị Err nào được return early. Mặc dù body của main function này sẽ chỉ trả về các lỗi của kiểu std::io::Error, bằng cách chỉ định Box&lt;dyn Error&gt;, signature này sẽ tiếp tục đúng ngay cả khi nhiều code hơn trả về các lỗi khác được thêm vào body của main.</p>

<p>Khi một main function trả về Result&lt;(), E&gt;, executable sẽ exit với giá trị 0 nếu main trả về Ok(()) và sẽ exit với giá trị khác 0 nếu main trả về một giá trị Err. Executables viết bằng C trả về integers khi chúng exit: Programs exit thành công trả về integer 0, và programs có lỗi trả về một integer khác 0. Rust cũng trả về integers từ executables để tương thích với convention này.</p>

<p>Hàm main có thể trả về bất kỳ kiểu nào implement std::process::Termination trait, chứa một function report trả về ExitCode. Tham khảo tài liệu thư viện chuẩn để biết thêm thông tin về implementing Termination trait cho các kiểu của riêng bạn.</p>
`,
            defaultCode: `use std::num::ParseIntError;

fn parse_number(s: &str) -> Result<i32, ParseIntError> {
    let n = s.trim().parse::<i32>()?;
    Ok(n)
}

fn double_parse(s: &str) -> Result<i32, ParseIntError> {
    let n = parse_number(s)?;
    Ok(n * 2)
}

fn main() {
    // Thành công
    match double_parse("21") {
        Ok(n) => println!("21 × 2 = {n}"),
        Err(e) => println!("Lỗi: {e}"),
    }

    // Thất bại
    match double_parse("abc") {
        Ok(n) => println!("Kết quả: {n}"),
        Err(e) => println!("Lỗi parse 'abc': {e}"),
    }

    // unwrap_or
    let result = parse_number("xyz").unwrap_or(0);
    println!("unwrap_or: {result}");
}
`,
            expectedOutput: '21 × 2 = 42\nLỗi parse \'abc\': invalid digit found in string\nunwrap_or: 0'
        };
