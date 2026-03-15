import { Lesson } from '../../courses';

export const singleThreaded: Lesson = {
            id: 'final-project-01',
            title: 'Building a Single-Threaded Web Server',
            duration: '60 phút',
            type: 'theory',
            content: `
<p>Chúng ta sẽ bắt đầu bằng việc làm cho một web server đơn luồng hoạt động. Trước khi bắt đầu, hãy xem qua một cái nhìn nhanh về các protocols liên quan đến việc xây dựng web servers. Chi tiết của các protocols này nằm ngoài phạm vi của cuốn sách này, nhưng một cái nhìn tổng quan ngắn sẽ cung cấp cho bạn thông tin cần thiết.</p>

<p>Hai protocols chính liên quan đến web servers là Hypertext Transfer Protocol (HTTP) và Transmission Control Protocol (TCP). Cả hai protocols đều là request-response protocols, có nghĩa là một client khởi tạo requests và server lắng nghe requests và cung cấp response cho client. Nội dung của những requests và responses được định nghĩa bởi các protocols.</p>

<p>TCP là protocol mức thấp hơn mô tả chi tiết về cách thông tin đi từ server này đến server khác nhưng không chỉ định thông tin đó là gì. HTTP xây dựng trên TCP bằng cách định nghĩa nội dung của requests và responses. Về mặt kỹ thuật, HTTP có thể được sử dụng với các protocols khác, nhưng trong đa số trường hợp, HTTP gửi dữ liệu của nó qua TCP. Chúng ta sẽ làm việc với các bytes thô của TCP và HTTP requests và responses.</p>

<h3 class="task-heading">Lắng nghe TCP Connection</h3>
<p>Web server của chúng ta cần lắng nghe một TCP connection, vì vậy đó là phần đầu tiên chúng ta sẽ làm việc. Thư viện chuẩn cung cấp một module std::net cho phép chúng ta làm điều này. Hãy tạo một project mới theo cách thông thường:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new hello
     Created binary (application) \`hello\` project
$ cd hello</code></pre>
</div>

<p>Nhập code trong Listing 21-1 vào src/main.rs để bắt đầu. Code này sẽ lắng nghe tại địa chỉ cục bộ 127.0.0.1:7878 cho các TCP streams đến. Khi nhận được một stream đến, nó sẽ in "Connection established!".</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::net::TcpListener;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        println!("Connection established!");
    }
}</code></pre>
</div>
<p><em>Listing 21-1: Lắng nghe các streams đến và in message khi nhận được một stream</em></p>

<p>Sử dụng TcpListener, chúng ta có thể lắng nghe TCP connections tại địa chỉ 127.0.0.1:7878. Trong địa chỉ, phần trước dấu hai chấm là địa chỉ IP đại diện cho máy tính của bạn (điều này giống nhau trên mọi máy tính và không đại diện cho máy tính của tác giả), và 7878 là cổng. Chúng ta đã chọn cổng này vì hai lý do: HTTP không được chấp nhận bình thường trên cổng này, vì vậy server của chúng ta không có khả năng xung đột với bất kỳ web server nào khác mà bạn có thể đang chạy trên máy của mình, và 7878 là "rust" khi gõ trên điện thoại.</p>

<p>Hàm bind trong trường hợp này hoạt động giống như hàm new vì nó sẽ trả về một TcpListener instance mới. Hàm được gọi là bind vì trong networking, kết nối với một cổng để lắng nghe được gọi là "binding to a port".</p>

<p>Hàm bind trả về Result<T, E>, cho thấy rằng việc binding có thể thất bại, ví dụ, nếu chúng ta chạy hai instances của chương trình và do đó có hai chương trình lắng nghe cùng một cổng. Vì chúng ta đang viết một server cơ bản chỉ để học, chúng ta sẽ không lo lắng về việc xử lý những loại lỗi này; thay vào đó, chúng ta sử dụng unwrap để dừng chương trình nếu có lỗi.</p>

<p>Phương thức incoming trên TcpListener trả về một iterator cho chúng ta một chuỗi các streams (cụ thể hơn là các streams có kiểu TcpStream). Một stream đơn lẻ đại diện cho một connection mở giữa client và server. Connection là tên cho toàn bộ request và response process trong đó client kết nối với server, server tạo response, và server đóng connection. Do đó, chúng ta sẽ đọc từ TcpStream để xem client đã gửi gì và sau đó ghi response của chúng ta vào stream để gửi dữ liệu trở lại client. Nói chung, vòng for này sẽ xử lý mỗi connection lần lượt và tạo ra một chuỗi các streams để chúng ta xử lý.</p>

<p>Hiện tại, việc xử lý stream của chúng ta bao gồm gọi unwrap để kết thúc chương trình nếu stream có bất kỳ lỗi nào; nếu không có lỗi nào, chương trình in một message. Chúng ta sẽ thêm chức năng hơn cho trường hợp thành công trong listing tiếp theo. Lý do chúng ta có thể nhận được lỗi từ phương thức incoming khi client kết nối với server là vì chúng ta thực sự không lặp qua các connections. Thay vào đó, chúng ta đang lặp qua các connection attempts. Connection có thể không thành công vì nhiều lý do, nhiều trong số đó phụ thuộc vào hệ điều hành. Ví dụ, nhiều hệ điều hành có giới hạn về số lượng connections đồng thời mà chúng có thể hỗ trợ; các connection attempts mới vượt quá số đó sẽ tạo ra lỗi cho đến khi một số connections mở được đóng.</p>

<p>Hãy thử chạy code này! Gọi cargo run trong terminal và sau đó load 127.0.0.1:7878 trong trình duyệt web. Trình duyệt sẽ hiển thị một message lỗi như "Connection reset" vì server hiện không gửi lại bất kỳ dữ liệu nào. Nhưng khi bạn nhìn vào terminal của mình, bạn sẽ thấy một số messages được in khi trình duyệt kết nối với server!</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>Running \`target/debug/hello\`
Connection established!
Connection established!
Connection established!</code></pre>
</div>

<p>Đôi khi bạn sẽ thấy nhiều messages được in cho một browser request; lý do có thể là trình duyệt đang thực hiện một request cho trang cũng như một request cho các tài nguyên khác, như favicon.ico icon xuất hiện trong tab trình duyệt.</p>

<p>Nó cũng có thể là trình duyệt đang cố kết nối với server nhiều lần vì server không phản hồi với bất kỳ dữ liệu nào. Khi stream ra khỏi phạm vi và bị drop ở cuối vòng lặp, connection được đóng như một phần của implementation drop. Đôi khi các trình duyệt xử lý các connections đã đóng bằng cách thử lại, vì vấn đề có thể tạm thời.</p>

<p>Các trình duyệt cũng đôi khi mở nhiều connections đến server mà không gửi bất kỳ requests nào để sau đó nếu chúng gửi requests, những requests đó có thể xảy ra nhanh hơn. Khi điều này xảy ra, server của chúng ta sẽ thấy mỗi connection, bất kể có bất kỳ requests nào qua connection đó hay không. Nhiều phiên bản của trình duyệt dựa trên Chrome làm điều này, ví dụ; bạn có thể tắt tối ưu hóa đó bằng cách sử dụng chế độ duyệt riêng tư hoặc sử dụng trình duyệt khác.</p>

<p>Yếu tố quan trọng là chúng ta đã thành công trong việc lấy handle của một TCP connection!</p>

<p>Nhớ dừng chương trình bằng cách nhấn ctrl-C khi bạn hoàn thành chạy một phiên bản cụ thể của code. Sau đó, khởi động lại chương trình bằng cách gọi cargo run sau khi bạn đã thực hiện mỗi bộ thay đổi code để đảm bảo bạn đang chạy code mới nhất.</p>

<h3 class="task-heading">Đọc Request</h3>
<p>Hãy implement chức năng để đọc request từ trình duyệt! Để tách biệt các concerns của việc đầu tiên là lấy connection và sau đó là thực hiện một số action với connection, chúng ta sẽ bắt đầu một function mới để xử lý connections. Trong function handle_connection mới này, chúng ta sẽ đọc dữ liệu từ TCP stream và in nó để chúng ta có thể thấy dữ liệu được gửi từ trình duyệt.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::{
    io::{BufReader, prelude::*},
    net::{TcpListener, TcpStream},
};

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let http_request: Vec<_> = buf_reader
        .lines()
        .map(|result| result.unwrap())
        .take_while(|line| !line.is_empty())
        .collect();

    println!("Request: {http_request:#?}");
}</code></pre>
</div>
<p><em>Listing 21-2: Đọc từ TcpStream và in dữ liệu</em></p>

<p>Chúng ta đưa std::io::BufReader và std::io::prelude vào scope để có quyền truy cập vào các traits và types cho phép chúng ta đọc và ghi vào stream. Trong vòng for trong function main, thay vì in một message nói rằng chúng ta đã tạo một connection, bây giờ chúng ta gọi function handle_connection mới và truyền stream cho nó.</p>

<p>Trong function handle_connection, chúng ta tạo một BufReader instance mới bao gồm một tham chiếu đến stream. BufReader thêm buffering bằng cách quản lý các calls đến các phương thức std::io::Read trait cho chúng ta.</p>

<p>Chúng ta tạo một biến tên là http_request để collect các dòng của request mà trình duyệt gửi đến server của chúng ta. Chúng ta chỉ định rằng chúng ta muốn collect các dòng này vào một vector bằng cách thêm type annotation Vec<_>.</p>

<p>BufReader implements std::io::BufRead trait, cung cấp phương thức lines. Phương thức lines trả về một iterator của Result<String, std::io::Error> bằng cách split stream của dữ liệu bất cứ khi nào nó thấy một byte newline. Để lấy mỗi String, chúng ta map và unwrap mỗi Result. Result có thể là một lỗi nếu dữ liệu không phải là UTF-8 hợp lệ hoặc nếu có vấn đề khi đọc từ stream. Một lần nữa, một chương trình production nên xử lý những lỗi này tinh tế hơn, nhưng chúng ta chọn dừng chương trình trong trường hợp lỗi để đơn giản.</p>

<p>Trình duyệt signal việc kết thúc một HTTP request bằng cách gửi hai newline characters liên tiếp, vì vậy để lấy một request từ stream, chúng ta lấy các dòng cho đến khi chúng ta nhận được một dòng là empty string. Sau khi chúng ta collect các dòng vào vector, chúng ta in chúng ra sử dụng pretty debug formatting để chúng ta có thể xem các instructions mà web browser đang gửi đến server của chúng ta.</p>

<p>Hãy thử code này! Khởi động chương trình và thực hiện một request trong trình duyệt web một lần nữa. Lưu ý rằng chúng ta vẫn sẽ nhận được một trang lỗi trong trình duyệt, nhưng output của chương trình trong terminal bây giờ sẽ trông giống như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling hello v0.1.0 (file:///projects/hello)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.42s
     Running \`target/debug/hello\`
Request: [
    "GET / HTTP/1.1",
    "Host: 127.0.0.1:7878",
    "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0",
    "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language: en-US,en;q=0.5",
    "Accept-Encoding: gzip, deflate, br",
    "DNT: 1",
    "Connection: keep-alive",
    "Upgrade-Insecure-Requests: 1",
    "Sec-Fetch-Dest: document",
    "Sec-Fetch-Mode: navigate",
    "Sec-Fetch-Site: none",
    "Sec-Fetch-User: ?1",
    "Cache-Control: max-age=0",
]</code></pre>
</div>

<p>Tùy thuộc vào trình duyệt của bạn, bạn có thể nhận được output hơi khác một chút. Bây giờ khi chúng ta in dữ liệu request, chúng ta có thể thấy tại sao chúng ta nhận được nhiều connections từ một browser request bằng cách nhìn vào path sau GET trong dòng đầu tiên của request. Nếu các connections lặp lại đều yêu cầu /, chúng ta biết trình duyệt đang cố fetch / nhiều lần vì nó không nhận được response từ chương trình của chúng ta.</p>

<h3 class="task-heading">Xem xét kỹ hơn một HTTP Request</h3>
<p>HTTP là một protocol text-based, và một request có định dạng sau:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>Method Request-URI HTTP-Version CRLF
headers CRLF
message-body</code></pre>
</div>

<p>Dòng đầu tiên là request line chứa thông tin về những gì client đang yêu cầu. Phần đầu tiên của request line chỉ định method đang được sử dụng, như GET hoặc POST, mô tả cách client đang thực hiện request này. Client của chúng ta đã sử dụng một GET request, có nghĩa là nó đang yêu cầu thông tin.</p>

<p>Phần tiếp theo của request line là /, chỉ định uniform resource identifier (URI) mà client đang yêu cầu: URI gần nhưng không hoàn toàn giống như uniform resource locator (URL). Sự khác biệt giữa URIs và URLs không quan trọng cho mục đích của chúng ta trong chương này, nhưng spec HTTP sử dụng thuật ngữ URI, vì vậy chúng ta có thể thay thế bằng URL trong đầu.</p>

<p>Phần cuối cùng là HTTP version mà client sử dụng, và sau đó request line kết thúc bằng một CRLF sequence. (CRLF viết tắt của carriage return và line feed, là các thuật ngữ từ thời máy đánh chữ!) CRLF sequence cũng có thể được viết là \r\n, trong đó \r là carriage return và \n là line feed.</p>

<p>Nhìn vào request line data mà chúng ta nhận được từ việc chạy chương trình cho đến nay, chúng ta thấy GET là method, / là request URI, và HTTP/1.1 là version.</p>

<p>Sau request line, các dòng còn lại từ Host: trở đi là các headers. GET requests không có body.</p>

<p>Thử thực hiện một request từ một trình duyệt khác hoặc yêu cầu một địa chỉ khác, như 127.0.0.1:7878/test, để xem dữ liệu request thay đổi như thế nào.</p>

<p>Bây giờ chúng ta đã biết trình duyệt đang yêu cầu gì, hãy gửi lại một số dữ liệu!</p>

<h3 class="task-heading">Viết Response</h3>
<p>Chúng ta sẽ implement việc gửi dữ liệu để phản hồi một client request. Responses có định dạng sau:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>HTTP-Version Status-Code Reason-Phrase CRLF
headers CRLF
message-body</code></pre>
</div>

<p>Dòng đầu tiên là status line chứa HTTP version được sử dụng trong response, một numeric status code tóm tắt kết quả của request, và một reason phrase cung cấp text description của status code. Sau CRLF sequence là bất kỳ headers nào, một CRLF sequence khác, và body của response.</p>

<p>Đây là một ví dụ response sử dụng HTTP version 1.1 và có status code 200, một OK reason phrase, không có headers, và không có body:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>HTTP/1.1 200 OK\r\n\r\n</code></pre>
</div>

<p>Status code 200 là standard success response. Text là một HTTP response thành công nhỏ. Hãy viết điều này vào stream như response của chúng ta cho một request thành công! Từ function handle_connection, xóa println! in dữ liệu request và thay thế bằng code trong Listing 21-3.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let http_request: Vec&lt;_&gt; = buf_reader
        .lines()
        .map(|result| result.unwrap())
        .take_while(|line| !line.is_empty())
        .collect();

    let response = "HTTP/1.1 200 OK\r\n\r\n";

    stream.write_all(response.as_bytes()).unwrap();
}</code></pre>
</div>
<p><em>Listing 21-3: Viết một HTTP response thành công nhỏ vào stream</em></p>

<p>Dòng mới đầu tiên định nghĩa biến response chứa dữ liệu của success message. Sau đó, chúng ta gọi as_bytes trên response để convert string data sang bytes. Phương thức write_all trên stream lấy một &[u8] và gửi các bytes đó trực tiếp qua connection. Vì operation write_all có thể thất bại, chúng ta sử dụng unwrap trên bất kỳ error result nào như trước. Một lần nữa, trong một ứng dụng thực tế, bạn sẽ thêm error handling ở đây.</p>

<p>Với những thay đổi này, hãy chạy code của chúng ta và thực hiện một request. Chúng ta không còn in bất kỳ dữ liệu nào ra terminal, vì vậy chúng ta sẽ không thấy bất kỳ output nào ngoại trừ output từ Cargo. Khi bạn load 127.0.0.1:7878 trong trình duyệt, bạn sẽ nhận được một trang trống thay vì lỗi. Bạn vừa mới tự viết việc nhận một HTTP request và gửi một response!</p>

<h3 class="task-heading">Trả về HTML Thực sự</h3>
<p>Hãy implement chức năng trả về nhiều hơn một trang trống. Tạo file mới hello.html trong thư mục gốc của project, không phải trong thư mục src. Bạn có thể nhập bất kỳ HTML nào bạn muốn; Listing 21-4 cho thấy một khả năng.</p>

<div class="code-snippet">
  <span class="code-lang">html</span>
  <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;Hello!&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello!&lt;/h1&gt;
    &lt;p&gt;Hi from Rust&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
</div>
<p><em>Listing 21-4: Một file HTML mẫu để trả về trong response</em></p>

<p>Đây là một tài liệu HTML5 tối thiểu với một heading và một số text. Để trả về điều này từ server khi nhận được request, chúng ta sẽ sửa đổi handle_connection như trong Listing 21-5 để đọc file HTML, thêm nó vào response như một body, và gửi nó.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::{
    fs,
    io::{BufReader, prelude::*},
    net::{TcpListener, TcpStream},
};

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let http_request: Vec&lt;_&gt; = buf_reader
        .lines()
        .map(|result| result.unwrap())
        .take_while(|line| !line.is_empty())
        .collect();

    let status_line = "HTTP/1.1 200 OK";
    let contents = fs::read_to_string("hello.html").unwrap();
    let length = contents.len();

    let response =
        format!("{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}");

    stream.write_all(response.as_bytes()).unwrap();
}</code></pre>
</div>
<p><em>Listing 21-5: Gửi nội dung của hello.html làm body của response</em></p>

<p>Chúng ta đã thêm fs vào use statement để đưa filesystem module của thư viện chuẩn vào scope. Code để đọc nội dung của một file thành string trông quen thuộc; chúng ta đã sử dụng nó khi đọc nội dung của một file cho I/O project của chúng ta.</p>

<p>Tiếp theo, chúng ta sử dụng format! để thêm nội dung của file làm body của success response. Để đảm bảo một HTTP response hợp lệ, chúng ta thêm Content-Length header, được đặt thành kích thước của response body của chúng ta - trong trường hợp này, kích thước của hello.html.</p>

<p>Chạy code này với cargo run và load 127.0.0.1:7878 trong trình duyệt của bạn; bạn sẽ thấy HTML của bạn được render!</p>

<p>Hiện tại, chúng ta đang bỏ qua dữ liệu request trong http_request và chỉ gửi lại nội dung của file HTML một cách vô điều kiện. Điều đó có nghĩa là nếu bạn cố yêu cầu 127.0.0.1:7878/something-else trong trình duyệt, bạn vẫn sẽ nhận được cùng một HTML response này. Hiện tại, server của chúng ta rất hạn chế và không làm những gì hầu hết các web servers làm. Chúng ta muốn tùy chỉnh responses của mình tùy thuộc vào request và chỉ gửi lại file HTML cho một well-formed request đến /.</p>

<h3 class="task-heading">Xác thực Request và Phản hồi Chọn lọc</h3>
<p>Ngay bây giờ, web server của chúng ta sẽ trả về HTML trong file bất kể client đã yêu cầu gì. Hãy thêm chức năng để kiểm tra xem trình duyệt có đang yêu cầu / trước khi trả về file HTML hay không và trả về lỗi nếu trình duyệt yêu cầu bất kỳ thứ gì khác. Để làm điều này chúng ta cần sửa đổi handle_connection, như trong Listing 21-6. Code mới này kiểm tra nội dung của request nhận được so với những gì chúng ta biết một request cho / trông như thế nào và thêm các khối if và else để xử lý requests khác nhau.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let request_line = buf_reader.lines().next().unwrap().unwrap();

    if request_line == "GET / HTTP/1.1" {
        let status_line = "HTTP/1.1 200 OK";
        let contents = fs::read_to_string("hello.html").unwrap();
        let length = contents.len();

        let response = format!(
            "{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}"
        );

        stream.write_all(response.as_bytes()).unwrap();
    } else {
        // some other request
    }
}</code></pre>
</div>
<p><em>Listing 21-6: Xử lý requests đến / khác với các requests khác</em></p>

<p>Chúng ta sẽ chỉ nhìn vào dòng đầu tiên của HTTP request, vì vậy thay vì đọc toàn bộ request vào một vector, chúng ta gọi next để lấy item đầu tiên từ iterator. Unwrap đầu tiên xử lý Option và dừng chương trình nếu iterator không có items. Unwrap thứ hai xử lý Result và có cùng hiệu ứng như unwrap đã có trong map được thêm trong Listing 21-2.</p>

<p>Tiếp theo, chúng ta kiểm tra request_line để xem nó có bằng request line của một GET request đến path / hay không. Nếu có, khối if trả về nội dung của file HTML của chúng ta.</p>

<p>Nếu request_line không bằng GET request đến /, có nghĩa là chúng ta đã nhận được một request khác. Chúng ta sẽ thêm code vào khối else trong giây lát để phản hồi tất cả các requests khác.</p>

<p>Chạy code này ngay bây giờ và yêu cầu 127.0.0.1:7878; bạn sẽ nhận được HTML trong hello.html. Nếu bạn thực hiện bất kỳ request nào khác, như 127.0.0.1:7878/something-else, bạn sẽ nhận được một connection error như những bạn đã thấy khi chạy code trong Listing 21-1 và Listing 21-2.</p>

<p>Bây giờ hãy thêm code trong Listing 21-7 vào khối else để trả về một response với status code 404, signal rằng nội dung cho request không được tìm thấy. Chúng ta cũng sẽ trả về một số HTML cho một trang để render trong trình duyệt indicating response cho end user.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>} else {
    let status_line = "HTTP/1.1 404 NOT FOUND";
    let contents = fs::read_to_string("404.html").unwrap();
    let length = contents.len();

    let response = format!(
        "{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}"
    );

    stream.write_all(response.as_bytes()).unwrap();
}</code></pre>
</div>
<p><em>Listing 21-7: Phản hồi với status code 404 và trang lỗi nếu có bất kỳ thứ gì khác ngoài / được yêu cầu</em></p>

<p>Ở đây, response của chúng ta có một status line với status code 404 và reason phrase NOT FOUND. Body của response sẽ là HTML trong file 404.html. Bạn sẽ cần tạo file 404.html bên cạnh hello.html cho trang lỗi; một lần nữa, bạn có thể sử dụng bất kỳ HTML nào bạn muốn.</p>

<div class="code-snippet">
  <span class="code-lang">html</span>
  <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;Hello!&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Oops!&lt;/h1&gt;
    &lt;p&gt;Sorry, I don't know what you're asking for.&lt;/p&gt;
  &lt;/body&gt&lt;/html&gt;</code></pre>
</div>
<p><em>Listing 21-8: Nội dung mẫu cho trang để gửi lại với bất kỳ 404 response nào</em></p>

<p>Với những thay đổi này, chạy server của bạn một lần nữa. Yêu cầu 127.0.0.1:7878 sẽ trả về nội dung của hello.html, và bất kỳ request nào khác, như 127.0.0.1:7878/foo, sẽ trả về error HTML từ 404.html.</p>

<h3 class="task-heading">Refactoring</h3>
<p>Hiện tại, các khối if và else có nhiều sự lặp lại: Cả hai đều đọc files và ghi nội dung của các files vào stream. Chỉ có sự khác biệt là status line và filename. Hãy làm cho code ngắn gọn hơn bằng cách kéo ra những khác biệt đó thành các dòng if và else riêng biệt sẽ assign các giá trị của status line và filename cho các biến; sau đó chúng ta có thể sử dụng các biến đó một cách vô điều kiện trong code để đọc file và viết response.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let request_line = buf_reader.lines().next().unwrap().unwrap();

    let (status_line, filename) = if request_line == "GET / HTTP/1.1" {
        ("HTTP/1.1 200 OK", "hello.html")
    } else {
        ("HTTP/1.1 404 NOT FOUND", "404.html")
    };

    let contents = fs::read_to_string(filename).unwrap();
    let length = contents.len();

    let response =
        format!("{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}");

    stream.write_all(response.as_bytes()).unwrap();
}</code></pre>
</div>
<p><em>Listing 21-9: Refactoring các khối if và else để chỉ chứa code khác nhau giữa hai trường hợp</em></p>

<p>Bây giờ các khối if và else chỉ trả về các giá trị phù hợp cho status line và filename trong một tuple; sau đó chúng ta sử dụng destructuring để assign hai giá trị này cho status_line và filename sử dụng một pattern trong câu lệnh let, như đã thảo luận trong Chương 19.</p>

<p>Code được lặp lại trước đó bây giờ nằm ngoài các khối if và else và sử dụng các biến status_line và filename. Điều này làm cho dễ dàng hơn để thấy sự khác biệt giữa hai trường hợp, và nó có nghĩa là chúng ta chỉ có một nơi để cập nhật code nếu chúng ta muốn thay đổi cách file reading và response writing hoạt động.</p>

<p>Tuyệt vời! Bây giờ chúng ta có một web server đơn giản trong khoảng 40 dòng code Rust phản hồi một request với một trang nội dung và phản hồi tất cả các requests khác với một 404 response.</p>

<p>Hiện tại, server của chúng ta chạy trong một luồng đơn, có nghĩa là nó chỉ có thể phục vụ một request tại một thời điểm. Hãy xem điều đó có thể là vấn đề như thế nào bằng cách mô phỏng một số slow requests. Sau đó, chúng ta sẽ sửa nó để server của chúng ta có thể xử lý nhiều requests cùng lúc.</p>
`,
            defaultCode: `use std::{
    fs,
    io::{BufReader, prelude::*},
    net::{TcpListener, TcpStream},
};

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&stream);
    let request_line = buf_reader.lines().next().unwrap().unwrap();

    let (status_line, filename) = if request_line == "GET / HTTP/1.1" {
        ("HTTP/1.1 200 OK", "hello.html")
    } else {
        ("HTTP/1.1 404 NOT FOUND", "404.html")
    };

    let contents = fs::read_to_string(filename).unwrap();
    let length = contents.len();

    let response =
        format!("{status_line}\\r\\nContent-Length: {length}\\r\\n\\r\\n{contents}");

    stream.write_all(response.as_bytes()).unwrap();
}
`,
            expectedOutput: ``
        };
