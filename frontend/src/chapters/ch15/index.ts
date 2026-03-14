import { Chapter } from '../../courses';
import { ch15_01 } from './ch15_01';
import { ch15_02 } from './ch15_02';

export const ch15: Chapter = {
  id: 'ch15',
  title: 'Chương 15: Smart Pointers',
  introduction: `
    <h2>Giới thiệu về Smart Pointers</h2>
    <p>Một pointer là một khái niệm chung cho một biến chứa một địa chỉ trong bộ nhớ. Địa chỉ này tham chiếu đến, hoặc "trỏ đến," một số dữ liệu khác. Loại pointer phổ biến nhất trong Rust là một reference, mà bạn đã học trong Chương 4. References được biểu thị bằng ký hiệu & và mượn giá trị mà chúng trỏ đến. Chúng không có bất kỳ khả năng đặc biệt nào khác ngoài việc tham chiếu đến dữ liệu, và chúng không có overhead.</p>
    <p>Mặt khác, smart pointers là các cấu trúc dữ liệu hoạt động giống như một pointer nhưng cũng có thêm metadata và capabilities. Khái niệm smart pointers không độc nhất với Rust: Smart pointers bắt nguồn từ C++ và tồn tại trong các ngôn ngữ khác. Rust có nhiều loại smart pointers được định nghĩa trong standard library cung cấp chức năng vượt xa những gì được cung cấp bởi references.</p>
    <p>Để khám phá khái niệm chung, chúng ta sẽ xem xét một số ví dụ khác nhau về smart pointers, bao gồm một loại smart pointer đếm tham chiếu (reference counting). Pointer này cho phép dữ liệu có nhiều owners bằng cách theo dõi số lượng owners, và khi không còn owners nào, dọn dẹp dữ liệu.</p>
    <p>Trong Rust, với khái niệm ownership và borrowing, có một sự khác biệt bổ sung giữa references và smart pointers: Trong khi references chỉ mượn dữ liệu, trong nhiều trường hợp smart pointers sở hữu dữ liệu mà chúng trỏ đến.</p>
    <p>Smart pointers thường được implement sử dụng structs. Không giống như một struct thông thường, smart pointers implement các trait Deref và Drop. Trait Deref cho phép một instance của smart pointer struct behave giống như một reference để bạn có thể viết code của mình để làm việc với cả references hoặc smart pointers. Trait Drop cho phép bạn tùy chỉnh code được chạy khi một instance của smart pointer ra ngoài phạm vi (out of scope).</p>
    <p>Vì smart pointer pattern là một design pattern chung được sử dụng thường xuyên trong Rust, chương này sẽ không cover mọi smart pointer hiện có. Nhiều libraries có smart pointers của riêng họ, và bạn thậm chí có thể viết smart pointer của riêng bạn. Chúng ta sẽ cover các smart pointers phổ biến nhất trong standard library:</p>
    <ul>
      <li>→ <strong>Box&lt;T&gt;</strong>, để allocate các giá trị trên heap</li>
      <li>→ <strong>Rc&lt;T&gt;</strong>, một loại đếm tham chiếu cho phép multiple ownership</li>
      <li>→ <strong>Ref&lt;T&gt; và RefMut&lt;T&gt;</strong>, được truy cập thông qua RefCell&lt;T&gt;, một loại thực thi các borrowing rules tại runtime thay vì compile time</li>
    </ul>
    <p>Ngoài ra, chúng ta sẽ cover interior mutability pattern nơi một loại bất biến expose một API để mutate một giá trị interior. Chúng ta cũng sẽ thảo luận về reference cycles: chúng có thể leak memory như thế nào và cách ngăn chặn chúng.</p>
  `,
  lessons: [ch15_01, ch15_02]
};
