import { Lesson } from '../../courses';

export const ch17_04: Lesson = {
            id: '17-04',
            title: '17.4 Streams: Futures Theo Thứ Tự',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Hãy nhớ lại cách chúng ta sử dụng receiver cho async channel của mình trước đó trong chương này ở phần "Message Passing". Method async recv tạo ra một chuỗi các items theo thời gian. Đây là một instance của một pattern tổng quát hơn nhiều được gọi là stream. Nhiều khái niệm được biểu diễn tự nhiên dưới dạng streams: các items trở nên có sẵn trong một hàng đợi, các chunks của data được pull từng phần từ filesystem khi tập data quá lớn cho bộ nhớ của máy tính, hoặc data đến qua network theo thời gian. Vì streams là futures, chúng ta có thể sử dụng chúng với bất kỳ loại future nào khác và kết hợp chúng theo những cách thú vị. Ví dụ, chúng ta có thể batch các events để tránh kích hoạt quá nhiều network calls, đặt timeouts trên các chuỗi các operations chạy trong thời gian dài, hoặc throttle các events của user interface để tránh làm công việc không cần thiết.</p>

<p>Chúng ta đã thấy một chuỗi các items ở Chương 13, khi chúng ta xem xét Iterator trait trong phần "The Iterator Trait and the next Method", nhưng có hai sự khác biệt giữa iterators và async channel receiver. Sự khác biệt đầu tiên là thời gian: iterators là synchronous, trong khi channel receiver là asynchronous. Sự khác biệt thứ hai là API. Khi làm việc trực tiếp với Iterator, chúng ta gọi method synchronous next của nó. Với trpl::Receiver stream cụ thể, chúng ta gọi một method asynchronous recv thay vì. Ngoài ra, các APIs này cảm thấy rất giống nhau, và sự tương đồng đó không phải là ngẫu nhiên. Một stream giống như một dạng asynchronous của iteration. Tuy nhiên, trong khi trpl::Receiver cụ thể đợi để nhận messages, general-purpose stream API thì rộng hơn: nó cung cấp item tiếp theo theo cách Iterator làm, nhưng một cách asynchronous.</p>

<p>Sự tương đồng giữa iterators và streams trong Rust có nghĩa là chúng ta thực sự có thể tạo một stream từ bất kỳ iterator nào. Giống như với một iterator, chúng ta có thể làm việc với một stream bằng cách gọi method next của nó và sau đó awaiting output, như trong Listing 17-21, code này chưa biên dịch được.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code> [Mã này không biên dịch được!]
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let iter = values.iter().map(|n| n * 2);
        let mut stream = trpl::stream_from_iter(iter);

        while let Some(value) = stream.next().await {
            println!("The value was: {value}");
        }</code></pre>
</div>
<p><em>Listing 17-21: Tạo một stream từ một iterator và in các giá trị của nó</em></p>

<p>Chúng ta bắt đầu với một mảng các số, mà chúng ta chuyển đổi thành một iterator và sau đó gọi map để nhân đôi tất cả các giá trị. Sau đó chúng ta chuyển đổi iterator thành một stream sử dụng hàm trpl::stream_from_iter. Tiếp theo, chúng ta loop qua các items trong stream khi chúng đến với vòng lặp while let.</p>

<p>Thật không may, khi chúng ta cố chạy code, nó không biên dịch được mà thay vào đó báo cáo rằng không có method next available:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>error[E0599]: no method named \`next\` found for struct \`tokio_stream::iter::Iter\` in the current scope
  --> src/main.rs:10:40
   |
10 |         while let Some(value) = stream.next().await {
   |                                        ^^^^
   |
   = help: items from traits can only be used if the trait is in scope
help: the following traits which provide \`next\` are implemented but not in scope; perhaps you want to import one of them
   |
1  + use crate::trpl::StreamExt;
   |
1  + use futures_util::stream::stream::StreamExt;
   |
1  + use std::iter::Iterator;
   |
1  + use std::str::pattern::Searcher;
   |
help: there is a method \`try_next\` with a similar name
   |
10 |         while let Some(value) = stream.try_next().await;
   |                                        ~~~~~~~~

Như output này giải thích, lý do cho compiler error là chúng ta cần đúng trait trong scope để có thể sử dụng method next. Với cuộc thảo luận của chúng ta cho đến nay, bạn có thể hợp lý mong đợi trait đó là Stream, nhưng thực tế là StreamExt. Viết tắt của extension, Ext là một pattern phổ biến trong cộng đồng Rust để mở rộng một trait bằng một trait khác.</p>

<p>Trait Stream định nghĩa một interface cấp thấp kết hợp hiệu quả các traits Iterator và Future. StreamExt cung cấp một bộ APIs cấp cao hơn trên cùng Stream, bao gồm method next cũng như các utility methods khác tương tự như các methods được cung cấp bởi Iterator trait. Stream và StreamExt vẫn chưa là một phần của thư viện tiêu chuẩn của Rust, nhưng hầu hết các crates trong hệ sinh thái sử dụng các định nghĩa tương tự.</p>

<p>Cách sửa cho compiler error là thêm một câu lệnh use cho trpl::StreamExt, như trong Listing 17-22.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use trpl::StreamExt;

fn main() {
    trpl::block_on(async {
        let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        // --snip--
    })
}</code></pre>
</div>
<p><em>Listing 17-22: Sử dụng thành công một iterator làm cơ sở cho một stream</em></p>

<p>Với tất cả các mảnh ghép lại với nhau, code này hoạt động theo cách chúng ta muốn! Hơn nữa, bây giờ khi chúng ta có StreamExt trong scope, chúng ta có thể sử dụng tất cả các utility methods của nó, giống như với iterators.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Streams:</strong>
  <ul>
    <li><strong>Stream</strong> - Một chuỗi các items theo thời gian (giống như async iterator)</li>
    <li><strong>StreamExt</strong> - Extension trait cung cấp các utility methods</li>
    <li><strong>stream_from_iter</strong> - Tạo stream từ iterator</li>
    <li><strong>next</strong> - Method để lấy item tiếp theo từ stream</li>
    <li><strong>Async recv</strong> - Tạo stream từ async channel</li>
    <li><strong>Kết hợp với futures</strong> - Streams có thể kết hợp với các futures khác</li>
  </ul>
</div>
`,
            defaultCode: `// Demo concepts - cần tokio để chạy thực tế

fn main() {
    println!("=== Streams: Futures Theo Thứ Tự ===");
    println!();
    println!("1. Stream - Chuỗi items theo thời gian (async iterator)");
    println!("2. StreamExt - Trait mở rộng với các utility methods");
    println!("3. stream_from_iter - Tạo stream từ iterator");
    println!("4. next - Lấy item tiếp theo (await)");
    println!();
    println!("💡 Cần async runtime (tokio) để chạy thực tế!");
}
`,
            expectedOutput: `=== Streams: Futures Theo Thứ Tự ===

1. Stream - Chuỗi items theo thời gian (async iterator)
2. StreamExt - Trait mở rộng với các utility methods
3. stream_from_iter - Tạo stream từ iterator
4. next - Lấy item tiếp theo (await)

💡 Cần async runtime (tokio) để chạy thực tế!`
        };
