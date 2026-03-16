import { Chapter } from '../../courses';
import { ch10_01 } from './ch10_01';
import { ch10_02 } from './ch10_02';
import { ch10_03 } from './ch10_03';
import { ch10_01_ex } from './ch10_01_ex';
import { ch10_02_ex } from './ch10_02_ex';
import { ch10_03_ex } from './ch10_03_ex';
import { ch10_04_ex } from './ch10_04_ex';
import { ch10_05_ex } from './ch10_05_ex';

export const ch10: Chapter = {
  id: 'ch10',
  title: 'Chương 10: Generic Types, Traits, and Lifetimes',
  introduction: `
    <h2>Giới thiệu về Generics, Traits, và Lifetimes</h2>
    <p>Mọi ngôn ngữ lập trình đều có các công cụ để xử lý hiệu quả việc trùng lặp các khái niệm. Trong Rust, một trong những công cụ đó là generics: các abstract stand-ins cho các kiểu cụ thể hoặc các thuộc tính khác. Chúng ta có thể express behavior của generics hoặc cách chúng liên quan đến các generics khác mà không cần biết sẽ có gì trong vị trí của chúng khi biên dịch và chạy code.</p>

    <p>Functions có thể take parameters của một generic type nào đó, thay vì một kiểu cụ thể như i32 hoặc String, theo cùng cách họ take parameters với các giá trị unknown để chạy cùng code trên nhiều giá trị cụ thể. Thực tế, chúng ta đã sử dụng generics trong Chương 6 với Option&lt;T&gt;, trong Chương 8 với Vec&lt;T&gt; và HashMap&lt;K, V&gt;, và trong Chương 9 với Result&lt;T, E&gt;. Trong chương này, bạn sẽ khám phá cách định nghĩa các types, functions, và methods của riêng mình với generics!</p>

    <h3>Nội dung chương</h3>
    <ul>
      <li>→ <strong>Generics:</strong> Viết code hoạt động với nhiều kiểu dữ liệu</li>
      <li>→ <strong>Traits:</strong> Định nghĩa hành vi chia sẻ giữa các types</li>
      <li>→ <strong>Trait Bounds:</strong> Giới hạn kiểu dữ liệu generic</li>
      <li>→ <strong>Lifetimes:</strong> Đảm bảo tham chiếu luôn hợp lệ</li>
      <li>→ <strong>Advanced Patterns:</strong> Kết hợp generics với traits</li>
    </ul>

    <h3>Loại bỏ sự trùng lặp bằng cách trích xuất Function</h3>
    <p>Generics cho phép chúng ta thay thế các kiểu cụ thể bằng một placeholder đại diện cho nhiều kiểu để loại bỏ sự trùng lặp code. Trước khi đi sâu vào generics syntax, hãy xem cách loại bỏ sự trùng lặp theo cách không liên quan đến generic types bằng cách trích xuất một function thay thế các giá trị cụ thể bằng một placeholder đại diện cho nhiều giá trị.</p>

    <p>Chương trình ngắn trong Ví dụ 10-1 tìm số lớn nhất trong một danh sách.</p>

    <p>Sau đó, nhiệm vụ là tìm số lớn nhất trong hai danh sách khác nhau. Để làm điều đó, chúng ta có thể chọn cách trùng lặp code và sử dụng cùng logic ở hai nơi khác nhau trong chương trình.</p>

    <p>Để loại bỏ sự trùng lặp này, chúng ta sẽ tạo một abstraction bằng cách định nghĩa một function hoạt động trên bất kỳ danh sách integers nào được truyền vào như một parameter. Giải pháp này làm cho code của chúng ta rõ ràng hơn và cho phép chúng ta express khái niệm tìm số lớn nhất trong một danh sách một cách trừu tượng.</p>

    <p>Chúng ta có thể tạo một generic function từ hai functions chỉ khác nhau về types của parameters. Bằng cách xem xét cách nhận biết code trùng lặp mà bạn có thể trích xuất vào một function, bạn sẽ bắt đầu nhận ra code trùng lặp có thể sử dụng generics.</p>

    <h3>Kết luận</h3>
    <p>Nắm vững những khái niệm này sẽ giúp bạn viết code Rust chuyên nghiệp, linh hoạt và có thể tái sử dụng cao.</p>
  `,
  lessons: [
    ch10_01,
    ch10_01_ex,
    ch10_02,
    ch10_02_ex,
    ch10_03,
    ch10_03_ex,
    ch10_04_ex,
    ch10_05_ex,
  ]
};
