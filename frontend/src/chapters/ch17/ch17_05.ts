import { Lesson } from '../../courses';

export const ch17_05: Lesson = {
            id: '17-05',
            title: '17.5 Nhìn Sâu Hơn Vào Các Traits Cho Async',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Trong suốt chương, chúng ta đã sử dụng các Future, Stream, và StreamExt traits theo nhiều cách khác nhau. Tuy nhiên, cho đến bây giờ, chúng ta đã tránh đi quá sâu vào chi tiết về cách chúng hoạt động hoặc cách chúng kết hợp với nhau, điều này ổn hầu hết thời gian cho công việc Rust hàng ngày của bạn. Tuy nhiên, đôi khi bạn sẽ gặp tình huống cần hiểu thêm một số chi tiết về các traits này, cùng với kiểu Pin và trait Unpin. Trong phần này, chúng ta sẽ đào sâu đủ để giúp trong những tình huống đó, vẫn để lại phần đào sâu thực sự cho tài liệu khác.</p>

<h3 class="task-heading">Trait Future</h3>
<p>Hãy bắt đầu bằng cách xem xét kỹ hơn cách trait Future hoạt động. Đây là cách Rust định nghĩa nó:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::pin::Pin;
use std::task::{Context, Poll};

pub trait Future {
    type Output;

    fn poll(self: Pin&lt;&mut Self&gt;, cx: &mut Context&lt;'_&gt;) -> Poll&lt;Self::Output&gt;;
}</code></pre>
</div>

<p>Định nghĩa trait đó bao gồm một loạt các kiểu mới và cũng một số cú pháp chúng ta chưa thấy trước đây, vì vậy hãy đi qua định nghĩa từng phần.</p>

<p>Đầu tiên, associated type Output của Future nói future resolve thành cái gì. Điều này tương tự như associated type Item cho trait Iterator. Thứ hai, Future có method poll, nhận một tham chiếu Pin đặc biệt cho tham số self và một tham chiếu mutable đến kiểu Context, và trả về Poll&lt;Self::Output&gt;. Chúng ta sẽ nói thêm về Pin và Context sau. Bây giờ, hãy tập trung vào những gì method trả về, kiểu Poll:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub enum Poll&lt;T&gt; {
    Ready(T),
    Pending,
}</code></pre>
</div>

<p>Kiểu Poll này tương tự như Option. Nó có một variant có giá trị, Ready(T), và một variant không có, Pending. Tuy nhiên, Poll có nghĩa khác biệt đáng kể so với Option! Variant Pending chỉ ra rằng future vẫn còn công việc phải làm, vì vậy caller sẽ cần kiểm tra lại sau. Variant Ready chỉ ra rằng Future đã hoàn thành công việc và giá trị T đã có sẵn.</p>

<div class="cyber-alert warning">
  <strong>Lưu ý:</strong> Hiếm khi cần gọi poll trực tiếp, nhưng nếu bạn cần, hãy nhớ rằng với hầu hết futures, caller không nên gọi poll again sau khi future đã trả về Ready. Nhiều futures sẽ panic nếu được poll lại sau khi đã ready. Những futures an toàn để poll lại sẽ nói rõ điều đó trong tài liệu của chúng. Điều này tương tự như cách Iterator::next hoạt động.
</div>

<p>Khi bạn thấy code sử dụng await, Rust biên dịch nó ở hậu trường thành code gọi poll. Nếu bạn xem lại Listing 17-4, nơi chúng ta in ra page title cho một URL sau khi nó resolve, Rust biên dịch nó thành một cái gì đó (mặc dù không chính xác) như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>match page_title(url).poll() {
    Ready(page_title) => match page_title {
        Some(title) => println!("The title for {url} was {title}"),
        None => println!("{url} had no title"),
    }
    Pending => {
        // Nhưng cái gì ở đây?
    }
}</code></pre>
</div>

<p>Chúng ta nên làm gì khi future vẫn Pending? Chúng ta cần một cách để thử lại, và lặp đi lặp lại, cho đến khi future cuối cùng ready. Nói cách khác, chúng ta cần một vòng lặp:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut page_title_fut = page_title(url);
loop {
    match page_title_fut.poll() {
        Ready(value) => match page_title {
            Some(title) => println!("The title for {url} was {title}"),
            None => println!("{url} had no title"),
        }
        Pending => {
            // tiếp tục
        }
    }
}</code></pre>
</div>

<p>Tuy nhiên, nếu Rust biên dịch chính xác thành code đó, mọi await sẽ là blocking—chính xác là điều ngược lại với những gì chúng ta hướng tới! Thay vào đó, đảm bảo rằng vòng lặp có thể trao quyền điều khiển cho một thứ có thể tạm dừng công việc trên future này để làm việc trên các futures khác và sau đó kiểm tra future này lại sau. Như chúng ta đã thấy, đó là một async runtime, và công việc lập lịch và phối hợp này là một trong những công việc chính của nó.</p>

<p>Trong phần "Gửi Data Giữa Hai Tasks Sử dụng Message Passing", chúng ta đã mô tả việc đợi trên rx.recv. Lời gọi recv trả về một future, và awaiting future poll nó. Chúng ta lưu ý rằng một runtime sẽ tạm dừng future cho đến khi nó ready với một số message hoặc None khi channel đóng. Với hiểu biết sâu hơn về trait Future, và cụ thể là Future::poll, chúng ta có thể thấy điều đó hoạt động như thế nào. Runtime biết future không ready khi nó trả về Poll::Pending. Ngược lại, runtime biết future ready và tiến triển nó khi poll trả về Poll::Ready(Some(message)) hoặc Poll::Ready(None).</p>

<p>Các chi tiết chính xác của cách runtime làm điều đó nằm ngoài phạm vi của cuốn sách này, nhưng điểm quan trọng là thấy cơ bản của futures: một runtime poll mỗi future mà nó chịu trách nhiệm, đưa future trở lại ngủ khi nó chưa ready.</p>

<h3 class="task-heading">Kiểu Pin và Trait Unpin</h3>
<p>Trở lại Listing 17-13, chúng ta đã sử dụng macro trpl::join! để await ba futures. Tuy nhiên, thường có một collection như một vector chứa một số futures không biết cho đến runtime. Hãy thay đổi Listing 17-13 thành code trong Listing 17-23 đặt ba futures vào một vector và gọi hàm trpl::join_all thay vì, code này chưa biên dịch được.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code> [Mã này không biên dịch được!]
        let tx_fut = async move {
            // --snip--
        };

        let futures: Vec&lt;Box&lt;dyn Future&lt;Output = ()&gt;&gt;&gt; =
            vec![Box::new(tx1_fut), Box::new(rx_fut), Box::new(tx_fut)];

        trpl::join_all(futures).await;</code></pre>
</div>
<p><em>Listing 17-23: Awaiting futures trong một collection</em></p>

<p>Chúng ta đặt mỗi future trong một Box để biến chúng thành trait objects, giống như chúng ta đã làm trong phần "Returning Errors from run" ở Chương 12. (Chúng ta sẽ cover trait objects chi tiết trong Chương 18.) Sử dụng trait objects cho phép chúng ta đối xử với mỗi anonymous future được tạo bởi các kiểu này cùng một kiểu, vì tất cả đều implement trait Future.</p>

<p>Điều này có thể gây ngạc nhiên. Sau tất cả, không có async blocks nào trả về bất cứ thứ gì, vì vậy mỗi cái tạo ra một Future&lt;Output = ()&gt;. Nhớ rằng Future là một trait, và compiler tạo một enum duy nhất cho mỗi async block, ngay cả khi chúng có output types giống nhau. Giống như bạn không thể đặt hai handwritten structs khác nhau vào một Vec, bạn không thể trộn lẫn các enums được compiler tạo.</p>

<p>Sau đó chúng ta truyền collection của futures cho hàm trpl::join_all và await kết quả. Tuy nhiên, điều này không biên dịch; đây là phần liên quan của các thông báo lỗi.</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>error[E0277]: \`dyn Future&lt;Output = ()&gt;\` cannot be unpinned
  --> src/main.rs:48:33
   |
48 |         trpl::join_all(futures).await;
   |                                 ^^^^^ the trait \`Unpin\` is not implemented for \`dyn Future&lt;Output = ()&gt;\`
   |
   = note: consider using the \`pin!\` macro
           consider using \`Box::pin\` if you need to access the pinned value outside of the current scope
   = note: required for \`Box&lt;dyn Future&lt;Output = ()&gt;&gt;\` to implement \`Future\`
note: required by a bound in \`futures_util::future::join_all::JoinAll\`</code></pre>
</div>

<p>Lưu ý trong thông báo lỗi này cho chúng ta biết nên sử dụng macro pin! để pin các giá trị, có nghĩa là đặt chúng bên trong kiểu Pin đảm bảo các giá trị sẽ không được di chuyển trong bộ nhớ. Thông báo lỗi nói rằng pinning là cần thiết vì dyn Future&lt;Output = ()&gt; cần implement trait Unpin và hiện tại không có.</p>

<p>Hàm trpl::join_all trả về một struct gọi là JoinAll. Struct đó là generic over một kiểu F, bị ràng buộc implement trait Future. Directly awaiting một future với await pins future một cách implicit. Đó là lý do tại sao chúng ta không cần sử dụng pin! ở mọi nơi chúng ta muốn await futures.</p>

<p>Tuy nhiên, chúng ta không directly await một future ở đây. Thay vào đó, chúng ta construct một future mới, JoinAll, bằng cách truyền một collection của futures cho hàm join_all. Signature cho join_all yêu cầu các kiểu của các items trong collection đều implement trait Future, và Box&lt;T&gt; chỉ implement Future nếu T nó bọc là một future implement trait Unpin.</p>

<p>Đó là nhiều thứ để tiếp thu! Để thực sự hiểu điều đó, hãy đào sâu hơn một chút vào cách trait Future thực sự hoạt động, đặc biệt là xung quanh pinning. Hãy xem lại định nghĩa của trait Future:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::pin::Pin;
use std::task::{Context, Poll};

pub trait Future {
    type Output;

    // Required method
    fn poll(self: Pin&lt;&mut Self&gt;, cx: &mut Context&lt;'_&gt;) -> Poll&lt;Self::Output&gt;;
}</code></pre>
</div>

<p>Tham số cx và kiểu Context là chìa khóa để một runtime thực sự biết khi nào kiểm tra bất kỳ future nào trong khi vẫn lazy. Một lần nữa, chi tiết về cách điều đó hoạt động nằm ngoài phạm vi của chương này, và bạn thường chỉ cần nghĩ về điều này khi viết một triển khai Future tùy chỉnh. Thay vào đó, chúng ta sẽ tập trung vào kiểu cho self, vì đây là lần đầu tiên chúng ta thấy một method nơi self có một annotation kiểu. Annotation kiểu cho self hoạt động như các annotations kiểu cho các tham số function khác nhưng với hai khác biệt chính:</p>
<ul>
    <li>Nó cho Rust biết self phải là kiểu gì để method được gọi.</li>
    <li>Nó không thể chỉ là bất kỳ kiểu nào. Nó bị hạn chế với kiểu mà method được triển khai, một tham chiếu hoặc smart pointer đến kiểu đó, hoặc một Pin bọc một tham chiếu đến kiểu đó.</li>
</ul>

<p>Chúng ta sẽ thấy thêm về cú pháp này trong Chương 18. Bây giờ, biết đủ là nếu chúng ta muốn poll một future để kiểm tra nó là Pending hay Ready(Output), chúng ta cần một Pin-wrapped mutable reference đến kiểu.</p>

<p>Pin là một wrapper cho các kiểu pointer-like như &, &mut, Box, và Rc. (Về mặt kỹ thuật, Pin hoạt động với các kiểu implement các traits Deref hoặc DerefMut, nhưng điều này tương đương hiệu quả với việc chỉ làm việc với các tham chiếu và smart pointers.) Pin bản thân không phải là một pointer và không có bất kỳ hành vi nào của riêng nó như Rc và Arc với việc đếm tham chiếu; nó đơn thuần là một công cụ compiler có thể sử dụng để thực thi các ràng buộc về việc sử dụng pointer.</p>

<p>Nhớ rằng await được triển khai dưới dạng các lời gọi đến poll bắt đầu giải thích thông báo lợi chúng ta đã thấy trước đó, nhưng đó là về Unpin, không phải Pin. Vậy Pin liên quan đến Unpin như thế nào, và tại sao Future cần self ở trong một kiểu Pin để gọi poll?</p>

<p>Nhớ lại từ đầu chương này rằng một chuỗi các điểm await trong một future được biên dịch thành một state machine, và compiler đảm bảo state machine đó tuân theo tất cả các quy tắc bình thường của Rust về an toàn, bao gồm borrowing và ownership. Để làm điều đó, Rust xem xét data nào cần thiết giữa một điểm await và điểm await tiếp theo hoặc cuối async block. Sau đó nó tạo một variant tương ứng trong state machine được biên dịch. Mỗi variant có quyền truy cập vào data sẽ được sử dụng trong phần đó của source code, bằng cách take ownership của data đó hoặc bằng cách lấy một tham chiếu mutable hoặc immutable đến nó.</p>

<p>Cho đến nay, thật tốt: nếu chúng ta sai bất cứ điều gì về ownership hoặc references trong một async block nhất định, borrow checker sẽ nói cho chúng ta. Khi chúng ta muốn di chuyển future tương ứng với block đó—như di chuyển nó vào một Vec để sử dụng với join_all—mọi thứ trở nên khó hơn.</p>

<p>Khi chúng ta di chuyển một future—dù bằng cách đẩy nó vào một cấu trúc dữ liệu để sử dụng như một iterator với join_all hoặc bằng cách trả về nó từ một function—điều đó thực sự có nghĩa là di chuyển state machine Rust tạo cho chúng ta. Và không giống như hầu hết các kiểu khác trong Rust, các futures Rust tạo cho async blocks có thể kết thúc với các references đến chính nó trong các fields của bất kỳ variant nào, như được hiển thị trong hình minh họa đơn giản trong Hình 17-4.</p>

<p style="text-align: center;">
  <img src="/images/ch17/fig17-4.png" alt="Figure 17-4: A self-referential data type" style="max-width: 100%; height: auto;" />
</p>
<p style="text-align: center;"><em>Hình 17-4: Một kiểu dữ liệu tự tham chiếu</em></p>

<p>Theo mặc định, bất kỳ đối tượng nào có tham chiếu đến chính nó đều unsafe để di chuyển, vì các references luôn trỏ đến địa chỉ bộ nhớ thực tế của bất cứ thứ gì chúng tham chiếu đến (xem Hình 17-5). Nếu bạn di chuyển chính cấu trúc dữ liệu, các tham chiếu nội bộ đó sẽ bị bỏ qua trỏ đến vị trí cũ. Tuy nhiên, vị trí bộ nhớ đó bây giờ không hợp lệ. Một mặt, giá trị của nó sẽ không được cập nhật khi bạn thay đổi cấu trúc dữ liệu. Mặt khác—quan trọng hơn—máy tính giờ tự do tái sử dụng bộ nhớ đó cho các mục đích khác! Bạn có thể kết thúc đọc dữ liệu hoàn toàn không liên quan sau đó.</p>

<p style="text-align: center;">
  <img src="/images/ch17/fig17-5.png" alt="Figure 17-5: The unsafe result of moving a self-referential data type" style="max-width: 100%; height: auto;" />
</p>
<p style="text-align: center;"><em>Hình 17-5: Kết quả unsafe khi di chuyển một kiểu dữ liệu tự tham chiếu</em></p>

<p>Về mặt lý thuyết, Rust compiler có thể cố cập nhật mọi reference đến một đối tượng bất cứ khi nào nó được di chuyển, nhưng điều đó có thể thêm nhiều overhead về hiệu suất, đặc biệt nếu một mạng lưới các references cần cập nhật. Nếu chúng ta có thể thay vào đó đảm bảo cấu trúc dữ liệu không di chuyển trong bộ nhớ, chúng ta sẽ không phải cập nhật bất kỳ references nào. Đây chính xác là những gì borrow checker của Rust làm: trong safe code, nó ngăn bạn di chuyển bất kỳ item nào có tham chiếu đang hoạt động đến nó.</p>

<p>Pin xây dựng trên đó để cho chúng ta đảm bảo chính xác những gì chúng ta cần. Khi chúng ta pin một giá trị bằng cách bọc một pointer đến giá trị đó trong Pin, nó không thể di chuyển được nữa. Như vậy, nếu bạn có Pin&lt;Box&lt;SomeType&gt;&gt;, bạn thực sự pin giá trị SomeType, không phải Box pointer. Hình 17-6 minh họa quá trình này.</p>

<p style="text-align: center;">
  <img src="/images/ch17/fig17-6.png" alt="Figure 17-6: Pinning a Box that points to a self-referential future type" style="max-width: 100%; height: auto;" />
</p>
<p style="text-align: center;"><em>Hình 17-6: Pinning một Box trỏ đến một kiểu future tự tham chiếu</em></p>

<p>Thực tế, Box pointer vẫn có thể di chuyển tự do. Nhớ: chúng ta quan tâm đến việc đảm bảo data cuối cùng được tham chiếu giữ nguyên vị trí. Nếu một pointer di chuyển xung quanh, nhưng data nó trỏ đến ở cùng một vị trí, như trong Hình 17-7, không có vấn đề tiềm năng nào. (Như một bài tập độc lập, hãy xem docs cho các kiểu cũng như module std::pin và cố gắng tìm ra cách bạn sẽ làm điều này với một Pin bọc một Box.) Điểm quan trọng là kiểu tự tham chiếu bản thân không thể di chuyển, vì nó vẫn được pinned.</p>

<p style="text-align: center;">
  <img src="/images/ch17/fig17-7.png" alt="Figure 17-7: Moving a Box which points to a self-referential future type" style="max-width: 100%; height: auto;" />
</p>
<p style="text-align: center;"><em>Hình 17-7: Di chuyển một Box trỏ đến một kiểu future tự tham chiếu</em></p>

<p>Tuy nhiên, hầu hết các kiểu hoàn toàn an toàn để di chuyển, ngay cả khi chúng tình cờ đứng sau một Pin pointer. Chúng ta chỉ cần nghĩ về pinning khi các items có tham chiếu nội bộ. Các giá trị nguyên thủy như số và Booleans là an toàn vì chúng rõ ràng không có bất kỳ tham chiếu nội bộ nào. Cũng không có các kiểu bạn thường làm việc trong Rust. Bạn có thể di chuyển một Vec, ví dụ, mà không phải lo lắng. Với những gì chúng ta đã thấy cho đến nay, nếu bạn có Pin&lt;Vec&lt;String&gt;&gt;, bạn sẽ phải làm mọi thứ qua các APIs an toàn nhưng hạn chế được cung cấp bởi Pin, mặc dù một Vec&lt;String&gt; luôn an toàn để di chuyển nếu không có tham chiếu nào khác đến nó. Chúng ta cần một cách để nói với compiler rằng hoàn toàn ổn để di chuyển các items xung quanh trong các trường hợp như thế này—và đó là nơi Unpin xuất hiện.</p>

<p>Unpin là một marker trait, tương tự như các traits Send và Sync chúng ta đã thấy trong Chương 16, và do đó không có chức năng của riêng nó. Marker traits chỉ tồn tại để nói với compiler rằng an toàn để sử dụng kiểu implement một trait nhất định trong một bối cảnh cụ thể. Unpin thông báo cho compiler rằng một kiểu nhất định không cần duy trì bất kỳ đảm bảo nào về việc liệu giá trị có thể được di chuyển an toàn.</p>

<p>Giống như với Send và Sync, compiler tự động implement Unpin cho tất cả các kiểu nơi nó có thể chứng minh là an toàn. Một trường hợp đặc biệt, một lần nữa tương tự như Send và Sync, là nơi Unpin không được implement cho một kiểu. Ký hiệu cho điều này là impl !Unpin for SomeType, trong đó SomeType là tên của một kiểu cần duy trì các đảm bãọ để an toàn bất cứ khi nào một pointer đến kiểu đó được sử dụng trong một Pin.</p>

<p>Nói cách khác, có hai điều cần nhớ về mối quan hệ giữa Pin và Unpin. Thứ nhất, Unpin là trường hợp "bình thường", và !Unpin là trường hợp đặc biệt. Thứ hai, việc một kiểu implement Unpin hay !Unpin chỉ quan trọng khi bạn đang sử dụng một pinned pointer đến kiểu đó như Pin&lt;&mut SomeType&gt;.</p>

<p>Để cụ thể hóa, hãy nghĩ về một String: nó có một độ dài và các ký tự Unicode tạo nên nó. Chúng ta có thể bọc một String trong Pin, như thấy trong Hình 17-8. Tuy nhiên, String tự động implement Unpin, như hầu hết các kiểu khác trong Rust.</p>

<p style="text-align: center;">
  <img src="/images/ch17/fig17-8.png" alt="Figure 17-8: Pinning a String" style="max-width: 100%; height: auto;" />
</p>
<p style="text-align: center;"><em>Hình 17-8: Pinning một String; đường chấm chỉ ra rằng String implement trait Unpin và do đó không được pinned</em></p>

<p>Kết quả là, chúng ta có thể làm những điều sẽ illegal nếu String implement !Unpin thay vào đó, như thay thế một string bằng một string khác ở chính xác cùng một vị trí trong bộ nhớ như trong Hình 17-9. Điều này không vi phạm hợp đồng Pin, vì String không có tham chiếu nội bộ khiến nó unsafe để di chuyển. Đó chính xác là lý do nó implement Unpin thay vì !Unpin.</p>

<p style="text-align: center;">
  <img src="/images/ch17/fig17-9.png" alt="Figure 17-9: Replacing the String with an entirely different String in memory" style="max-width: 100%; height: auto;" />
</p>
<p style="text-align: center;"><em>Hình 17-9: Thay thế String bằng một String hoàn toàn khác trong bộ nhớ</em></p>

<p>Bây giờ chúng ta biết đủ để hiểu các lỗi được báo cáo cho lời gọi join_all đó từ Listing 17-23. Ban đầu chúng ta cố gắng di chuyển các futures được tạo bởi async blocks vào một Vec&lt;Box&lt;dyn Future&lt;Output = ()&gt;&gt;&gt;, nhưng như chúng ta đã thấy, những futures đó có thể có tham chiếu nội bộ, vì vậy chúng không tự động implement Unpin. Khi chúng ta pin chúng, chúng ta có thể truyền kiểu Pin kết quả vào Vec, tự tin rằng data bên dưới trong futures sẽ không được di chuyển. Listing 17-24 cho thấy cách sửa code bằng cách gọi macro pin! nơi mỗi futures được định nghĩa và điều chỉnh kiểu trait object.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::pin::{Pin, pin};

// --snip--

        let tx1_fut = pin!(async move {
            // --snip--
        });

        let rx_fut = pin!(async {
            // --snip--
        });

        let tx_fut = pin!(async move {
            // --snip--
        });

        let futures: Vec&lt;Pin&lt;&mut dyn Future&lt;Output = ()&gt;&gt;&gt; =
            vec![tx1_fut, rx_fut, tx_fut];</code></pre>
</div>
<p><em>Listing 17-24: Pinning các futures để cho phép di chuyển chúng vào vector</em></p>

<p>Ví dụ này bây giờ biên dịch và chạy, và chúng ta có thể thêm hoặc xóa futures khỏi vector tại runtime và join tất cả.</p>

<p>Pin và Unpin chủ yếu quan trọng cho việc xây dựng các thư viện cấp thấp, hoặc khi bạn đang xây dựng một runtime chính它, thay vì cho code Rust hàng ngày. Tuy nhiên, khi bạn thấy các traits này trong thông báo lỗi, bây giờ bạn sẽ có ý tưởng tốt hơn về cách sửa code!</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Sự kết hợp này của Pin và Unpin làm cho việc triển khai an toàn một lớp hoàn chỉnh các kiểu phức tạp trong Rust có thể thực hiện được, những kiểu nếu không sẽ chứng minh là thách thức vì chúng tự tham chiếu. Các kiểu yêu cầu Pin phổ biến nhất trong async Rust ngày nay, nhưng thỉnh thoảng, bạn có thể thấy chúng trong các bối cảnh khác.
</div>

<p>Các chi tiết cụ thể về cách Pin và Unpin hoạt động, và các quy tắc chúng được yêu cầu duy trì, được cover rộng rãi trong tài liệu API cho std::pin, vì vậy nếu bạn quan tâm tìm hiểu thêm, đó là một nơi tuyệt vời để bắt đầu.</p>

<h3 class="task-heading">Trait Stream</h3>
<p>Bây giờ bạn có hiểu biết sâu hơn về các Future, Pin, và Unpin traits, chúng ta có thể chuyển sự chú ý đến trait Stream. Như bạn đã học ở đầu chương, streams tương tự như asynchronous iterators. Tuy nhiên, không giống như Iterator và Future, Stream không có định nghĩa trong thư viện tiêu chuẩn tính đến thời điểm viết này, nhưng có một định nghĩa rất phổ biến từ futures crate được sử dụng xung quanh hệ sinh thái.</p>

<p>Hãy xem lại định nghĩa của các traits Iterator và Future trước khi xem xét cách một trait Stream có thể kết hợp chúng. Từ Iterator, chúng ta có ý tưởng về một chuỗi: method next của nó cung cấp một Option&lt;Self::Item&gt;. Từ Future, chúng ta có ý tưởng về sự sẵn sàng theo thời gian: method poll của nó cung cấp một Poll&lt;Self::Output&gt;. Để đại diện cho một chuỗi các items trở nên sẵn sàng theo thời gian, chúng ta định nghĩa một trait Stream kết hợp những features đó:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::pin::Pin;
use std::task::{Context, Poll};

trait Stream {
    type Item;

    fn poll_next(
        self: Pin&lt;&mut Self&gt;,
        cx: &mut Context&lt;'_&gt;
    ) -> Poll&lt;Option&lt;Self::Item&gt;&gt;;
}</code></pre>
</div>

<p>Trait Stream định nghĩa một associated type gọi là Item cho kiểu của các items được tạo bởi stream. Điều này tương tự như Iterator, nơi có thể có từ 0 đến nhiều items, và không giống như Future, nơi luôn có một Output duy nhất, ngay cả khi đó là kiểu unit ().</p>

<p>Stream cũng định nghĩa một method để lấy những items đó. Chúng ta gọi nó là poll_next, để làm rõ rằng nó poll theo cùng cách Future::poll làm và tạo ra một chuỗi items theo cùng cách Iterator::next làm. Kiểu trả về của nó kết hợp Poll với Option. Kiểu ngoài là Poll, vì nó phải được kiểm tra sự sẵn sàng, giống như một future. Kiểu trong là Option, vì nó cần tín hiệu liệu có nhiều messages, giống như một iterator.</p>

<p>Một cái gì đó rất giống định nghĩa này có thể sẽ trở thành một phần của thư viện tiêu chuẩn Rust. Trong thời gian chờ đợi, nó là một phần của toolkit của hầu hết các runtimes, vì vậy bạn có thể dựa vào nó, và mọi thứ chúng ta cover tiếp theo nên áp dụng!</p>

<p>Tuy nhiên, trong các ví dụ chúng ta đã thấy trong phần "Streams: Futures in Sequence", chúng ta không sử dụng poll_next hoặc Stream, mà thay vào đó sử dụng next và StreamExt. Chúng ta có thể làm việc trực tiếp với API poll_next bằng cách tự viết các state machines Stream của mình, tất nhiên, giống như chúng ta có thể làm việc với futures trực tiếp qua method poll của chúng. Sử dụng await thì tốt hơn nhiều, và trait StreamExt cung cấp method next để chúng ta có thể làm điều đó:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>trait StreamExt: Stream {
    async fn next(&mut self) -> Option&lt;Self::Item&gt;
    where
        Self: Unpin;

    // other methods...
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Định nghĩa thực tế chúng ta sử dụng trước đó trong chương hơi khác so với điều này, vì nó hỗ trợ các phiên bản Rust chưa hỗ trợ việc sử dụng các async functions trong traits. Kết quả là, nó trông như thế này:

fn next(&mut self) -> Next&lt;'_ , Self&gt; where Self: Unpin;

Kiểu Next đó là một struct implement Future và cho phép chúng ta đặt tên cho lifetime của tham chiếu đến self với Next&lt;'_ , Self&gt;, để await có thể hoạt động với method này.
</div>

<p>Trait StreamExt cũng là nơi của tất cả các methods thú vị có sẵn để sử dụng với streams. StreamExt được tự động implement cho mọi kiểu implement Stream, nhưng các traits này được định nghĩa riêng để cho phép cộng đồng iterate trên các convenience APIs mà không ảnh hưởng đến trait nền tảng.</p>

<p>Trong phiên bản của StreamExt được sử dụng trong crate trpl, trait không chỉ định nghĩa method next mà còn cung cấp một implementation mặc định của next xử lý đúng các chi tiết của việc gọi Stream::poll_next. Điều này có nghĩa là ngay cả khi bạn cần viết kiểu data streaming của riêng bạn, bạn chỉ phải implement Stream, và sau đó bất ai sử dụng kiểu data của bạn có thể sử dụng StreamExt và các methods của nó một cách tự động.</p>

<p>Đó là tất cả những gì chúng ta sẽ cover cho các chi tiết cấp thấp về các traits này. Để kết thúc, hãy xem xét futures (bao gồm streams), tasks, và threads kết hợp với nhau như thế nào!</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Traits Cho Async:</strong>
  <ul>
    <li><strong>Future trait</strong> - Định nghĩa polling mechanism</li>
    <li><strong>Poll</strong> - Enum với Ready và Pending variants</li>
    <li><strong>Pin</strong> - Wrapper ngăn cản di chuyển giá trị</li>
    <li><strong>Unpin</strong> - Marker trait cho biết kiểu có thể di chuyển an toàn</li>
    <li><strong>Stream</strong> - Kết hợp Iterator và Future</li>
    <li><strong>StreamExt</strong> - Extension trait với các utility methods</li>
    <li><strong>pin!</strong> - Macro để pin giá trị</li>
    <li><strong>join_all</strong> - Join nhiều futures từ collection</li>
  </ul>
</div>
`,
            defaultCode: `// Demo concepts - cần tokio để chạy thực tế

fn main() {
    println!("=== Nhìn Sâu Hơn Vào Traits Cho Async ===");
    println!();
    println!("1. Future - Trait cơ bản với poll method");
    println!("2. Poll   - Ready(T) hoặc Pending");
    println!("3. Pin    - Ngăn di chuyển giá trị");
    println!("4. Unpin  - Marker trait cho phép di chuyển");
    println!("5. Stream - Kết hợp Iterator + Future");
    println!("6. StreamExt - Extension với next method");
    println!();
    println!("💡 Cần async runtime (tokio) để chạy thực tế!");
}
`,
            expectedOutput: `=== Nhìn Sâu Hơn Vào Traits Cho Async ===

1. Future - Trait cơ bản với poll method
2. Poll   - Ready(T) hoặc Pending
3. Pin    - Ngăn di chuyển giá trị
4. Unpin  - Marker trait cho phép di chuyển
5. Stream - Kết hợp Iterator + Future
6. StreamExt - Extension với next method

💡 Cần async runtime (tokio) để chạy thực tế!`
        };
