import { Chapter } from '../../courses';
import { ch11_01 } from './ch11_01';
import { ch11_02 } from './ch11_02';
import { ch11_03 } from './ch11_03';

export const ch11: Chapter = {
  id: 'ch11',
  title: 'Chương 11: Viết Automated Tests',
  introduction: `
    <h2>Giới thiệu về Automated Testing</h2>
    <p>Trong bài viết năm 1972 "The Humble Programmer," Edsger W. Dijkstra đã nói rằng "program testing can be a very effective way to show the presence of bugs, but it is hopelessly inadequate for showing their absence." Điều đó không có nghĩa là chúng ta không nên cố gắng test càng nhiều càng tốt!</p>

    <p>Độ chính xác (correctness) trong chương trình của chúng ta là mức độ mà code của chúng ta làm được những gì chúng ta định làm. Rust được thiết kế với mức độ quan tâm cao về tính đúng đắn của các chương trình, nhưng tính đúng đắn là phức tạp và không dễ để chứng minh. Rust's type system gánh vác phần lớn gánh nặng này, nhưng type system không thể bắt được tất cả mọi thứ. Do đó, Rust bao gồm hỗ trợ cho việc viết automated software tests.</p>

    <p>Giả sử chúng ta viết một function add_two cộng 2 vào bất kỳ số nào được truyền vào. Signature của function này chấp nhận một integer làm parameter và trả về một integer làm kết quả. Khi chúng ta implement và compile function đó, Rust làm tất cả type checking và borrow checking mà bạn đã học để đảm bảo, ví dụ, chúng ta không truyền String value hoặc invalid reference vào function này. Nhưng Rust không thể kiểm tra rằng function này sẽ làm chính xác những gì chúng ta định, đó là trả về parameter cộng 2 thay vì, ví dụ, parameter cộng 10 hoặc parameter trừ 50! Đó là nơi tests come in.</p>

    <p>Chúng ta có thể viết tests để assert, ví dụ, rằng khi chúng ta truyền 3 vào function add_two, giá trị trả về là 5. Chúng ta có thể chạy những tests này bất cứ khi nào chúng ta thay đổi code để đảm bảo rằng bất kỳ correct behavior hiện có nào không bị thay đổi.</p>

    <p>Testing là một kỹ năng phức tạp: Mặc dù chúng ta không thể cover trong một chương mọi chi tiết về cách viết good tests, trong chương này chúng ta sẽ thảo luận về cơ chế của Rust's testing facilities. Chúng ta sẽ nói về các annotations và macros có sẵn cho bạn khi viết tests, default behavior và options được cung cấp để chạy tests, và cách tổ chức tests thành unit tests và integration tests.</p>

    <h3>Nội dung chương</h3>
    <ul>
      <li>→ <strong>Test Anatomy:</strong> Cách viết test với #[test] và assert!</li>
      <li>→ <strong>Running Tests:</strong> Chạy tests với cargo test</li>
      <li>→ <strong>Unit Tests:</strong> Viết test trong cùng file với code</li>
      <li>→ <strong>Integration Tests:</strong> Test tương tác giữa các modules</li>
      <li>→ <strong>Test Organization:</strong> Tổ chức test hiệu quả</li>
    </ul>

    <p>Viết test giúp code của bạn đáng tin cậy và dễ refactor hơn.</p>
  `,
  lessons: [ch11_01, ch11_02, ch11_03]
};
