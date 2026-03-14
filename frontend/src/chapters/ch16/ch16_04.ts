import { Lesson } from '../../courses';

export const ch16_04: Lesson = {
            id: 'ch16-04',
            title: '16.4 Extensible Concurrency với Send và Sync',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Thú vị là, hầu hết các concurrency features chúng ta đã nói đến trong chương này đã là một phần của standard library, không phải ngôn ngữ. Các lựa chọn của bạn để handle concurrency không giới hạn ở ngôn ngữ hoặc standard library; bạn có thể viết các concurrency features của riêng mình hoặc sử dụng những cái được viết bởi người khác.</p>

<p>Tuy nhiên, trong số các concurrency concepts quan trọng được nhúng trong ngôn ngữ thay vì standard library là các std::marker traits Send và Sync.</p>

<h3 class="task-heading">Transferring Ownership Between Threads</h3>
<p>Send marker trait chỉ ra rằng ownership của các values của type implementing Send có thể được transfer giữa các threads. Hầu hết mọi Rust type đều implement Send, nhưng có một số exceptions, bao gồm Rc&lt;T&gt;: Điều này không thể implement Send vì nếu bạn clone một Rc&lt;T&gt; value và cố transfer ownership của clone đến một thread khác, cả hai threads có thể update reference count cùng một lúc.</p>

<p>Do đó, Rust's type system và trait bounds đảm bảo rằng bạn không bao giờ có thể accidentally send một Rc&lt;T&gt; value across threads một cách unsafe. Khi chúng ta cố làm điều này trong Listing 16-14, chúng ta nhận được error "the trait Send is not implemented for Rc&lt;Mutex&lt;i32&gt;&gt;". Khi chúng ta chuyển sang Arc&lt;T&gt;, code compiled.</p>

<p>Bất kỳ type nào được compose hoàn toàn bởi các Send types đều được tự động marked là Send. Hầu hết các primitive types đều là Send, ngoại trừ raw pointers.</p>

<h3 class="task-heading">Accessing from Multiple Threads</h3>
<p>Sync marker trait chỉ ra rằng nó an toàn cho type implementing Sync được referenced từ nhiều threads. Nói cách khác, bất kỳ type T nào implement Sync nếu &T (một immutable reference đến T) implements Send, có nghĩa là reference có thể được gửi an toàn đến một thread khác.</p>

<p>Giống như Send, primitive types đều implement Sync, và các types được compose hoàn toàn bởi các types implement Sync cũng implement Sync.</p>

<p>Smart pointer Rc&lt;T&gt; cũng không implement Sync vì những lý do tương tự như nó không implement Send. Type RefCell&lt;T&gt; và family của các Cell&lt;T&gt; types không implement Sync. Implementation của borrow checking mà RefCell&lt;T&gt; làm tại runtime không phải là thread-safe. Smart pointer Mutex&lt;T&gt; implements Sync và có thể được sử dụng để share access với nhiều threads.</p>

<h3 class="task-heading">Implementing Send và Sync Manually Is Unsafe</h3>
<p>Bởi vì các types được compose hoàn toàn bởi các types implement Send và Sync traits cũng tự động implement Send và Sync, chúng ta không phải implement các traits đó manually. Như marker traits, chúng thậm chí không có bất kỳ methods nào để implement. Chúng chỉ hữu ích để enforcing invariants liên quan đến concurrency.</p>

<p>Implementing manually các traits này involves implementing unsafe Rust code. Chúng ta sẽ nói về việc sử dụng unsafe Rust code trong Chương 20; for now, thông tin quan trọng là building new concurrent types không made up of Send và Sync parts requires careful thought để uphold the safety guarantees.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Send và Sync:</strong>
  <ul>
    <li><strong>Send</strong> - Type có thể transfer ownership giữa các threads</li>
    <li><strong>Sync</strong> - Type có thể share reference qua các threads an toàn</li>
    <li><strong>Auto implementation</strong> - Types composed of Send/Sync cũng tự động là Send/Sync</li>
    <li><strong>Marker traits</strong> - Không có methods, chỉ để enforce invariants</li>
    <li><strong>Unsafe</strong> - Manual implementation đòi hỏi unsafe Rust</li>
  </ul>
</div>
`,
            defaultCode: `// Kiểm tra xem type có implement Send và Sync không

use std::marker::Send;
use std::marker::Sync;

// Struct custom - mặc định không implement Send/Sync
struct MyStruct {
    data: i32,
}

// Kiểm tra tại compile time
fn check_send_sync<T: Send + Sync>() {}

fn main() {
    // i32 là Send và Sync
    check_send_sync::<i32>();

    // String là Send và Sync
    check_send_sync::<String>();

    // Vec<T> là Send và Sync
    check_send_sync::<Vec<i32>>();

    // Mutex<T> là Send và Sync (có thể share across threads)
    use std::sync::Mutex;
    check_send_sync::<Mutex<i32>>();

    // Arc<T> là Send và Sync
    use std::sync::Arc;
    check_send_sync::<Arc<i32>>();

    println!("Tất cả các type trên đều là Send và Sync!");
}
`,
            expectedOutput: `Tất cả các type trên đều là Send và Sync!`
        };
