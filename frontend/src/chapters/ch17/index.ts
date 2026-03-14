import { Chapter } from '../../courses';
import { ch17_01 } from './ch17_01';
import { ch17_02 } from './ch17_02';
import { ch17_03 } from './ch17_03';

export const ch17: Chapter = {
  id: 'ch17',
  title: 'Chương 17: Fundamentals of Asynchronous Programming',
  introduction: `
    <h2>Fundamentals of Asynchronous Programming: Async, Await, Futures, and Streams</h2>
    <p>Nhiều operations chúng ta yêu cầu máy tính thực hiện có thể mất một thời gian để hoàn thành. Thật tuyệt nếu chúng ta có thể làm những việc khác trong khi đang đợi các long-running processes hoàn thành. Máy tính hiện đại cung cấp hai kỹ thuật để làm việc trên nhiều hơn một operation cùng lúc: parallelism và concurrency.</p>
    <p>Tuy nhiên, logic của các chương trình của chúng ta được viết theo cách phần lớn là tuyến tính. Chúng ta muốn có thể specify các operations mà một chương trình nên thực hiện và các điểm tại đó một function có thể pause và một phần khác của chương trình có thể chạy thay, mà không cần specify ngay từ đầu chính xác thứ tự và cách mỗi bit của code nên chạy. Asynchronous programming là một abstraction cho phép chúng ta express code của mình theo terms của potential pausing points và eventual results.</p>
    <p>Chương này xây dựng trên việc sử dụng threads của Chương 16 cho parallelism và concurrency bằng cách giới thiệu một cách tiếp cận thay thế để viết code: Rust's futures, streams, và async và await syntax cho phép chúng ta express cách operations có thể là asynchronous.</p>
    <h3>Hãy xem xét một ví dụ</h3>
    <p>Giả sử bạn đang export một video bạn đã tạo của một buổi lễ gia đình, một operation có thể mất bất cứ đâu từ phút đến giờ. Video export sẽ sử dụng nhiều CPU và GPU power nhất có thể. Nếu bạn chỉ có một CPU core và operating system của bạn không pause export đó cho đến khi nó completed—tức là nếu nó execute export một cách synchronous—bạn không thể làm bất cứ điều gì khác trên máy tính trong khi task đó đang chạy.</p>
    <p>Giả sử bạn đang download một video được chia sẻ bởi người khác, cũng có thể mất một thời gian nhưng không chiếm nhiều CPU time. Trong trường hợp này, CPU phải đợi data đến từ network. Ngay cả khi data đã hiện đầy đủ, nếu video khá lớn, có thể mất ít nhất một hoặc hai giây để load tất cả.</p>
    <p>Video export là một ví dụ của một CPU-bound hoặc compute-bound operation. Video download là một ví dụ của một I/O-bound operation, vì nó bị giới hạn bởi tốc độ input và output của máy tính.</p>
    <h3>Async trong Rust</h3>
    <p>Đó chính xác là những gì Rust's async (viết tắt của asynchronous) abstraction cung cấp cho chúng ta. Trong chương này, bạn sẽ học tất cả về async khi chúng ta cover các chủ đề sau:</p>
    <ul>
      <li>→ <strong>Cách sử dụng async và await syntax</strong> và execute các asynchronous functions với một runtime</li>
      <li>→ <strong>Cách sử dụng async model</strong> để giải quyết một số thách thức tương tự như trong Chương 16</li>
      <li>→ <strong>Cách multithreading và async</strong> cung cấp các giải pháp bổ sung có thể kết hợp trong nhiều trường hợp</li>
    </ul>
    <h3>Parallelism và Concurrency</h3>
    <p>Chúng ta đã đối xử với parallelism và concurrency như interchangeable. Bây giờ chúng ta cần phân biệt chính xác hơn giữa chúng.</p>
    <p>Hãy xem xét các cách khác nhau mà một team có thể chia công việc trên một dự án phần mềm. Bạn có thể assign một member nhiều tasks, assign mỗi member một task, hoặc sử dụng kết hợp cả hai cách.</p>
    <p>Khi một cá nhân làm việc trên nhiều tasks khác nhau trước khi bất kỳ task nào trong số chúng hoàn thành, đây là concurrency. Một cách để implement concurrency tương tự như có hai dự án khác nhau được checkout trên máy tính của bạn, và khi bạn chán hoặc stuck trên một dự án, bạn chuyển sang dự án khác. Bạn chỉ là một người, vì vậy bạn không thể tiến triển trên cả hai tasks cùng một lúc chính xác, nhưng bạn có thể multitask.</p>
    <p>Khi team chia nhóm các tasks bằng cách mỗi member take một task và làm việc một mình, đây là parallelism. Mỗi người trong team có thể tiến triển cùng một lúc chính xác.</p>
    <p>Chạy async code trong Rust thường xảy ra concurrently. Tùy thuộc vào hardware, operating system, và async runtime chúng ta đang sử dụng, concurrency đó cũng có thể sử dụng parallelism bên dưới.</p>
  `,
  lessons: [ch17_01, ch17_02, ch17_03]
};
