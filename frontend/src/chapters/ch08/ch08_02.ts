import { Lesson } from '../../courses';

export const ch08_02: Lesson = {
            id: 'ch08-02',
            title: '8.2 Storing UTF-8 Encoded Text with Strings',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Chúng ta đã nói về strings trong Chương 4, nhưng bây giờ chúng ta sẽ xem xét chúng chi tiết hơn. Những người mới học Rust thường bị stuck với strings vì ba lý do kết hợp: xu hướng của Rust trong việc phơi bày các lỗi có thể xảy ra, strings là một cấu trúc dữ liệu phức tạp hơn nhiều người nghĩ, và UTF-8. Những yếu tố này kết hợp theo cách có vẻ khó khăn khi bạn đến từ các ngôn ngữ lập trình khác.</p>

<p>Chúng ta thảo luận về strings trong bối cảnh collections vì strings được triển khai như một collection của bytes, cộng với một số methods để cung cấp chức năng hữu ích khi những bytes đó được interpret như text. Trong phần này, chúng ta sẽ nói về các thao tác trên String mà mọi collection type đều có, như tạo, cập nhật, và đọc. Chúng ta cũng sẽ nói về những cách String khác với các collections khác, cụ thể là việc indexing vào String phức tạp như thế nào giữa việc con người và máy tính interpret String data.</p>

<h3 class="task-heading">Định Nghĩa Strings</h3>
<p>Chúng ta sẽ đầu tiên định nghĩa thuật ngữ "string". Rust chỉ có một string type trong core language, đó là string slice str mà thường được thấy ở dạng borrowed của nó là &str. Trong Chương 4, chúng ta đã nói về string slices, là các tham chiếu đến một số UTF-8 encoded string data được lưu trữ ở nơi khác. String literals, ví dụ, được lưu trữ trong binary của chương trình và do đó là string slices.</p>

<p>String type, được cung cấp bởi thư viện chuẩn của Rust thay vì được code trong core language, là một UTF-8 encoded string type có thể grow, mutable, owned. Khi những người học Rust nói về "strings" trong Rust, họ có thể đề cập đến String hoặc string slice &str types, không chỉ một trong những types đó. Mặc dù phần này chủ yếu nói về String, cả hai types đều được sử dụng nhiều trong thư viện chuẩn của Rust, và cả String và string slices đều được UTF-8 encode.</p>

<h3 class="task-heading">Tạo Một String Mới</h3>
<p>Nhiều thao tác giống như với Vec&lt;T&gt; đều có sẵn với String vì String thực ra được triển khai như một wrapper around một vector của bytes với một số guarantees, restrictions, và capabilities bổ sung. Một ví dụ về function hoạt động giống nhau với Vec&lt;T&gt; và String là function new để tạo một instance.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s = String::new();</code></pre>
</div>
<p><em>Ví dụ 8-11: Tạo một String rỗng mới</em></p>

<p>Dòng này tạo một string rỗng mới tên là s, vào đó chúng ta có thể load data. Thông thường, chúng ta sẽ có một số initial data mà chúng ta muốn bắt đầu string. Để làm điều đó, chúng ta sử dụng method to_string, có sẵn trên bất kỳ type nào implement Display trait, như string literals. Ví dụ 8-12 cho thấy hai ví dụ.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let data = "initial contents";

let s = data.to_string();

// The method also works on a literal directly:
let s = "initial contents".to_string();</code></pre>
</div>
<p><em>Ví dụ 8-12: Sử dụng method to_string để tạo String từ string literal</em></p>

<p>Code này tạo một string chứa "initial contents".</p>

<p>Chúng ta cũng có thể sử dụng function String::from để tạo String từ một string literal. Code trong Ví dụ 8-13 tương đương với code trong Ví dụ 8-12 sử dụng to_string.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s = String::from("initial contents");</code></pre>
</div>
<p><em>Ví dụ 8-13: Sử dụng function String::from để tạo String từ string literal</em></p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Vì strings được sử dụng cho rất nhiều thứ, chúng ta có thể sử dụng nhiều generic APIs khác nhau cho strings, cung cấp cho chúng ta nhiều options. Trong trường hợp này, String::from và to_string làm cùng một việc, vậy bạn chọn cái nào là vấn đề về style và readability.
</div>

<p>Hãy nhớ rằng strings được UTF-8 encode, vì vậy chúng ta có thể include bất kỳ properly encoded data nào trong chúng, như trong Ví dụ 8-14.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let hello = String::from("السلام عليكم");
let hello = String::from("Dobrý den");
let hello = String::from("Hello");
let hello = String::from("שלום");
let hello = String::from("नमस्ते");
let hello = String::from("こんにちは");
let hello = String::from("안녕하세요");
let hello = String::from("你好");
let hello = String::from("Olá");
let hello = String::from("Здравствуйте");
let hello = String::from("Hola");</code></pre>
</div>
<p><em>Ví dụ 8-14: Lưu trữ lời chào bằng các ngôn ngữ khác nhau trong strings</em></p>

<p>Tất cả đều là các giá trị String hợp lệ.</p>

<h3 class="task-heading">Cập Nhật Một String</h3>
<p>Một String có thể tăng kích thước và nội dung của nó có thể thay đổi, giống như nội dung của Vec&lt;T&gt;, nếu bạn push thêm data vào. Ngoài ra, bạn có thể tiện lợi sử dụng toán tử + hoặc macro format! để nối String values.</p>

<h4>Append với push_str hoặc push</h4>
<p>Chúng ta có thể grow một String bằng cách sử dụng method push_str để append một string slice, như trong Ví dụ 8-15.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s = String::from("foo");
s.push_str("bar");</code></pre>
</div>
<p><em>Ví dụ 8-15: Appending một string slice vào String bằng method push_str</em></p>

<p>Sau hai dòng này, s sẽ chứa "foobar". Method push_str lấy một string slice vì chúng ta không nhất thiết muốn take ownership của parameter. Ví dụ, trong code trong Ví dụ 8-16, chúng ta muốn có thể sử dụng s2 sau khi append nội dung của nó vào s1.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s1 = String::from("foo");
let s2 = "bar";
s1.push_str(s2);
println!("s2 is {s2}");</code></pre>
</div>
<p><em>Ví dụ 8-16: Sử dụng một string slice sau khi append nội dung vào String</em></p>

<p>Nếu method push_str take ownership của s2, chúng ta sẽ không thể in giá trị của nó trên dòng cuối cùng. Tuy nhiên, code này hoạt động như chúng ta mong đợi!</p>

<p>Method push lấy một single character làm parameter và thêm nó vào String. Ví dụ 8-17 thêm chữ 'l' vào String bằng method push.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut s = String::from("lo");
s.push('l');</code></pre>
</div>
<p><em>Ví dụ 8-17: Thêm một character vào String value bằng push</em></p>

<p>Kết quả, s sẽ chứa "lol".</p>

<h4>Nối với + hoặc format!</h4>
<p>Thông thường, bạn sẽ muốn kết hợp hai strings có sẵn. Một cách để làm điều đó là sử dụng toán tử +, như trong Ví dụ 8-18.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; // note s1 has been moved here and can no longer be used</code></pre>
</div>
<p><em>Ví dụ 8-18: Sử dụng toán tử + để kết hợp hai String values thành một String mới</em></p>

<p>String s3 sẽ chứa "Hello, world!". Lý do s1 không còn hợp lệ sau phép cộng, và lý do chúng ta sử dụng một tham chiếu đến s2, có liên quan đến signature của method được gọi khi chúng ta sử dụng toán tử +. Toán tử + sử dụng method add, có signature trông như thế này:</p>

<pre><code>fn add(self, s: &str) -> String {</code></pre>

<div class="cyber-alert info">
  <strong>Giải thích signature:</strong> Đầu tiên, s2 có &, có nghĩa là chúng ta đang thêm một tham chiếu của string thứ hai vào string thứ nhất. Điều này là vì tham số s trong function add: chúng ta chỉ có thể thêm một string slice vào một String; chúng ta không thể cộng hai String values với nhau. Nhưng hãy đợi đã — kiểu của &s2 là &String, không phải &str, như được chỉ định trong tham số thứ hai của add. Vậy tại sao Ví dụ 8-18 biên dịch được?
</div>

<p>Lý do chúng ta có thể sử dụng &s2 trong lời gọi add là vì compiler có thể coerce argument &String thành &str. Khi chúng ta gọi method add, Rust sử dụng deref coercion, ở đây biến &s2 thành &s2[..]. Vì add không take ownership của tham số s, s2 vẫn sẽ là một String hợp lệ sau thao tác này.</p>

<p>Thứ hai, chúng ta có thể thấy trong signature rằng add take ownership của self vì self không có &. Điều này có nghĩa là s1 trong Ví dụ 8-18 sẽ được move vào lời gọi add và không còn hợp lệ sau đó. Vì vậy, mặc dù let s3 = s1 + &s2; trông như thể nó sẽ copy cả hai strings và tạo một cái mới, câu lệnh này thực sự take ownership của s1, append một bản copy của nội dung s2, và sau đó trả về ownership của kết quả. Nói cách khác, nó trông như thể đang tạo rất nhiều bản copy, nhưng thực tế không phải vậy; việc triển khai hiệu quả hơn việc copying.</p>

<p>Nếu chúng ta cần nối nhiều strings, behavior của toán tử + trở nên unwieldy:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = s1 + "-" + &s2 + "-" + &s3;</code></pre>
</div>

<p>Tại thời điểm này, s sẽ là "tic-tac-toe". Với tất cả các ký tự + và ", khó có thể thấy điều gì đang xảy ra. Để kết hợp strings trong những cách phức tạp hơn, chúng ta có thể sử dụng macro format!:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = format!("{s1}-{s2}-{s3}");</code></pre>
</div>

<p>Code này cũng đặt s thành "tic-tac-toe". Macro format! hoạt động như println!, nhưng thay vì in output ra màn hình, nó trả về một String với nội dung. Phiên bản code sử dụng format! dễ đọc hơn nhiều, và code được tạo bởi macro format! sử dụng các tham chiếu để lời gọi này không take ownership của bất kỳ tham số nào.</p>

<h3 class="task-heading">Indexing Vào Strings</h3>
<p>Trong nhiều ngôn ngữ lập trình khác, việc truy cập các ký tự riêng lẻ trong một string bằng cách tham chiếu chúng bằng index là một thao tác hợp lệ và phổ biến. Tuy nhiên, nếu bạn cố gắng truy cập các phần của String bằng indexing syntax trong Rust, bạn sẽ nhận được một lỗi. Hãy xem code không hợp lệ trong Ví dụ 8-19.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này KHÔNG biên dịch được!
let s1 = String::from("hi");
let h = s1[0];</code></pre>
</div>
<p><em>Ví dụ 8-19: Cố gắng sử dụng indexing syntax với String</em></p>

<p>Code này sẽ dẫn đến lỗi sau:</p>
<pre><code>error[E0277]: the type \`str\` cannot be indexed by \`{integer}\`
 --> src/main.rs:3:16
  |
3 |     let h = s1[0];
  |                ^ string indices are ranges of \`usize\`
  |
  = help: the trait \`SliceIndex<str>\` is not implemented for \`{integer}\`
  = note: you can use \`.chars().nth()\` or \`.bytes().nth()\`
          for more information, see chapter 8 in The Book</code></pre>

<div class="cyber-alert warning">
  <strong>Rust strings không hỗ trợ indexing!</strong> Lỗi này cho biết: Rust strings không hỗ trợ indexing. Nhưng tại sao? Để trả lời câu hỏi đó, chúng ta cần thảo luận về cách Rust lưu trữ strings trong bộ nhớ.
</div>

<h4>Biểu Diễn Nội Bộ</h4>
<p>Một String là một wrapper over Vec&lt;u8&gt;. Hãy xem một số ví dụ strings UTF-8 được encode đúng từ Ví dụ 8-14. Đầu tiên, cái này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let hello = String::from("Hola");</code></pre>
</div>

<p>Trong trường hợp này, len sẽ là 4, có nghĩa là vector lưu trữ string "Hola" dài 4 bytes. Mỗi chữ cái này chiếm 1 byte khi được encode trong UTF-8. Tuy nhiên, dòng sau có thể khiến bạn bất ngờ (lưu ý rằng string này bắt đầu bằng chữ Z viết hoa Cyrillic, không phải số 3):</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let hello = String::from("Здравствуйте");</code></pre>
</div>

<p>Nếu bạn được hỏi string này dài bao nhiêu, bạn có thể nói 12. Thực tế, câu trả lời của Rust là 24: Đó là số bytes cần để encode "Здравствуйте" trong UTF-8, vì mỗi Unicode scalar value trong string đó chiếm 2 bytes lưu trữ. Do đó, một index vào bytes của string không phải lúc nào cũng tương ứng với một Unicode scalar value hợp lệ.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này KHÔNG biên dịch được!
let hello = "Здравствуйте";
let answer = &hello[0];</code></pre>
</div>

<p>Bạn đã biết rằng answer sẽ không phải là З, chữ cái đầu tiên. Khi được encode trong UTF-8, byte đầu tiên của З là 208 và byte thứ hai là 151, vì vậy có vẻ như answer thực ra nên là 208, nhưng 208 không phải là một ký tự hợp lệ một mình. Việc trả về 208 có lẽ không phải là điều người dùng muốn nếu họ yêu cầu chữ cái đầu tiên của string này; tuy nhiên, đó là data duy nhất mà Rust có tại byte index 0. Người dùng thường không muốn trả về giá trị byte, ngay cả khi string chỉ chứa các chữ cái Latin: Nếu &"hi"[0] là code hợp lệ trả về giá trị byte, nó sẽ trả về 104, không phải h.</p>

<div class="cyber-alert warning">
  <strong>Lý do Rust không cho phép indexing:</strong> Để tránh trả về một giá trị không mong muốn và gây ra bugs có thể không được phát hiện ngay lập tức, Rust không biên dịch code này và ngăn hiểu nhầm sớm trong quá trình phát triển.
</div>

<h4>Bytes, Scalar Values, và Grapheme Clusters</h4>
<p>Một điểm khác về UTF-8 là thực tế có ba cách quan trọng để nhìn vào strings từ góc độ của Rust: như bytes, như scalar values, và như grapheme clusters (cái gần nhất với những gì chúng ta sẽ gọi là chữ cái).</p>

<p>Nếu chúng ta nhìn vào từ tiếng Hindi "नमस्ते" được viết bằng script Devanagari, nó được lưu trữ như một vector của các giá trị u8 trông như thế này:</p>

<pre><code>[224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164, 224, 165, 135]</code></pre>

<p>Đó là 18 bytes và là cách máy tính cuối cùng lưu trữ data này. Nếu chúng ta nhìn chúng như Unicode scalar values, là những gì Rust's char type, những bytes đó trông như thế này:</p>

<pre><code>['न', 'म', 'स', '्', 'त', 'े']</code></pre>

<p>Có sáu giá trị char ở đây, nhưng thứ tư và thứ sáu không phải là chữ cái: Chúng là dấu phụ độc lập không có ý nghĩa. Cuối cùng, nếu chúng ta nhìn chúng như grapheme clusters, chúng ta sẽ được những gì một người sẽ gọi là bốn chữ cái tạo thành từ tiếng Hindi:</p>

<pre><code>["न", "म", "स्", "ते"]</code></pre>

<p>Rust cung cấp các cách khác nhau để interpret raw string data mà máy tính lưu trữ để mỗi program có thể chọn interpretation nó cần, bất kể ngôn ngữ của data là gì.</p>

<div class="cyber-alert info">
  <strong>Lý do cuối cùng Rust không cho phép indexing vào String:</strong> Các thao tác indexing được kỳ vọng luôn mất thời gian không đổi (O(1)). Nhưng không thể đảm bảo hiệu suất đó với String, vì Rust phải đi qua nội dung từ đầu đến index để xác định có bao nhiêu ký tự hợp lệ.
</div>

<h3 class="task-heading">Slicing Strings</h3>
<p>Indexing vào một string thường là một ý tưởng tồi vì không rõ ràng kiểu trả về của thao tác indexing string nên là gì: giá trị byte, một ký tự, một grapheme cluster, hay một string slice. Nếu bạn thực sự cần sử dụng indices để tạo string slices, do đó, Rust yêu cầu bạn phải cụ thể hơn.</p>

<p>Thay vì indexing sử dụng [] với một số đơn, bạn có thể sử dụng [] với một range để tạo một string slice chứa các bytes cụ thể:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let hello = "Здравствуйте";

let s = &hello[0..4];</code></pre>
</div>

<p>Ở đây, s sẽ là một &str chứa 4 bytes đầu tiên của string. Trước đó, chúng ta đề cập rằng mỗi ký tự trong số này là 2 bytes, có nghĩa s sẽ là "Зд".</p>

<p>Nếu chúng ta cố gắng slice chỉ một phần của bytes của một ký tự với &hello[0..1], Rust sẽ panic tại runtime theo cách tương tự như khi một index không hợp lệ được truy cập trong một vector.</p>

<div class="cyber-alert warning">
  <strong>Cẩn thận khi tạo string slices với ranges:</strong> Làm như vậy có thể crash chương trình của bạn. Hãy đảm bảo bạn slice tại các character boundaries hợp lệ.
</div>

<h3 class="task-heading">Duyệt Qua Strings</h3>
<p>Cách tốt nhất để thao tác trên các mảnh của strings là phải rõ ràng về việc bạn muốn characters hay bytes. Đối với các Unicode scalar values riêng lẻ, sử dụng method chars. Gọi chars trên "Зд" tách ra và trả về hai giá trị kiểu char, và bạn có thể iterate over result để truy cập từng element:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>for c in "Зд".chars() {
    println!("{c}");
}</code></pre>
</div>

<p>Code này sẽ in:</p>
<pre><code>З
д</code></pre>

<p>Ngoài ra, method bytes trả về mỗi byte thô, có thể phù hợp cho domain của bạn:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>for b in "Зд".bytes() {
    println!("{b}");
}</code></pre>
</div>

<p>Code này sẽ in 4 bytes tạo thành string này:</p>
<pre><code>208
151
208
180</code></pre>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Hãy nhớ rằng các Unicode scalar values hợp lệ có thể được tạo thành từ hơn 1 byte.
</div>

<p>Lấy grapheme clusters từ strings, như với script Devanagari, phức tạp, vì vậy chức năng này không được cung cấp bởi thư viện chuẩn. Các crates có sẵn trên crates.io nếu đây là chức năng bạn cần.</p>

<h3 class="task-heading">Xử Lý Sự Phức Tạp Của Strings</h3>
<p>Tóm lại, strings phức tạp. Các ngôn ngữ lập trình khác nhau đưa ra các lựa chọn khác nhau về cách trình bày sự phức tạp này cho lập trình viên. Rust đã chọn để làm cho việc xử lý đúng String data là behavior mặc định cho tất cả các chương trình Rust, có nghĩa là các lập trình viên phải suy nghĩ nhiều hơn về việc xử lý UTF-8 data ngay từ đầu. Sự đánh đổi này phơi bày nhiều sự phức tạp của strings hơn so với các ngôn ngữ lập trình khác, nhưng nó ngăn bạn phải xử lý các lỗi liên quan đến non-ASCII characters sau này trong vòng đời phát triển.</p>

<p>Tin tốt là thư viện chuẩn cung cấp rất nhiều chức năng được xây dựng trên các types String và &str để giúp xử lý các tình huống phức tạp này một cách chính xác. Hãy chắc chắn xem tài liệu cho các methods hữu ích như contains để tìm kiếm trong một string và replace để thay thế các phần của một string bằng một string khác.</p>

<h3 class="task-heading">Tiếp Theo</h3>
<p>Hãy chuyển sang một thứ ít phức tạp hơn: hash maps!</p>
`,
            defaultCode: `fn main() {
    // Tạo và nối String
    let greeting = String::from("Xin chào");
    let name = String::from("Rust");
    let message = format!("{greeting}, {name}!");
    println!("{message}");

    // push_str và push
    let mut s = String::from("Hello");
    s.push_str(", World");
    s.push('!');
    println!("{s}");

    // Duyệt chars
    let word = "Việt Nam";
    print!("Các ký tự: ");
    for c in word.chars() {
        print!("[{c}]");
    }
    println!();

    // Đếm
    println!("Số ký tự: {}", word.chars().count());
    println!("Số bytes: {}", word.len());
}
`,
            expectedOutput: 'Xin chào, Rust!\nHello, World!\nCác ký tự: [V][i][ệ][t][ ][N][a][m]\nSố ký tự: 8\nSố bytes: 10'
        };
