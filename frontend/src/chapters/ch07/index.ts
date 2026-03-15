import { Chapter } from '../../courses';
import { ch07_01 } from './ch07_01';
import { ch07_01_ex } from './ch07_01_ex';
import { ch07_02 } from './ch07_02';
import { ch07_02_ex } from './ch07_02_ex';
import { ch07_03 } from './ch07_03';
import { ch07_03_ex } from './ch07_03_ex';
import { ch07_04 } from './ch07_04';
import { ch07_04_ex } from './ch07_04_ex';
import { ch07_05_ex } from './ch07_05_ex';

export const ch07: Chapter = {
  id: 'ch07',
  title: 'Chương 7: Quản lý Packages, Crates, Modules',
  introduction: `
    <h2>Packages, Crates, and Modules</h2>
    <p>Khi bạn viết các chương trình lớn, việc tổ chức code của bạn sẽ ngày càng quan trọng. Bằng cách nhóm các chức năng liên quan và tách code với các tính năng riêng biệt, bạn sẽ làm rõ nơi tìm code implement một tính năng cụ thể và nơi để thay đổi cách một tính năng hoạt động.</p>
    <p>Các chương trình chúng ta đã viết cho đến nay đều nằm trong một module trong một file. Khi project phát triển, bạn nên tổ chức code bằng cách chia nó thành nhiều modules và sau đó thành nhiều files. Một package có thể chứa nhiều binary crates và tùy chọn một library crate. Khi package phát triển, bạn có thể trích xuất các phần thành các crates riêng biệt trở thành các external dependencies. Chương này cover tất cả các kỹ thuật này. Đối với các dự án rất lớn bao gồm một tập hợp các packages liên quan phát triển cùng nhau, Cargo cung cấp workspaces, mà chúng ta sẽ cover trong "Cargo Workspaces" ở Chương 14.</p>
    <p>Chúng ta cũng sẽ thảo luận về việc đóng gói các chi tiết implementation, cho phép bạn tái sử dụng code ở mức cao hơn: Sau khi bạn đã implement một operation, code khác có thể gọi code của bạn thông qua public interface của nó mà không cần biết implementation hoạt động như thế nào. Cách bạn viết code định nghĩa phần nào là public để code khác sử dụng và phần nào là private implementation details mà bạn giữ quyền thay đổi. Đây là một cách khác để giới hạn lượng chi tiết bạn phải giữ trong đầu.</p>
    <p>Một khái niệm liên quan là scope: Ngữ cảnh lồng nhau trong đó code được viết có một tập hợp các tên được định nghĩa là "in scope". Khi đọc, viết và biên dịch code, programmers và compilers cần biết liệu một tên cụ thể tại một vị trí cụ thể đề cập đến biến, function, struct, enum, module, constant, hay item khác và item đó có nghĩa gì. Bạn có thể tạo scopes và thay đổi tên nào đang in hoặc out of scope. Bạn không thể có hai items với cùng tên trong cùng một scope; có các tools available để resolve name conflicts.</p>
    <p>Rust có một số tính năng cho phép bạn quản lý việc tổ chức code của mình, bao gồm chi tiết nào được expose, chi tiết nào là private, và tên nào trong mỗi scope trong các chương trình của bạn. Các tính năng này, đôi khi được gọi chung là module system, bao gồm:</p>
    <ul>
      <li>Packages: Một Cargo feature cho phép bạn build, test, và share crates</li>
      <li>Crates: Một cây của modules tạo ra một library hoặc executable</li>
      <li>Modules and use: Cho phép bạn kiểm soát tổ chức, scope, và privacy của paths</li>
      <li>Paths: Một cách để đặt tên một item, như một struct, function, hoặc module</li>
    </ul>
    <p>Trong chương này, chúng ta sẽ cover tất cả các tính năng này, thảo luận cách chúng tương tác, và giải thích cách sử dụng chúng để quản lý scope. Đến cuối chương, bạn nên có một sự hiểu biết vững chắc về module system và có thể làm việc với scopes như một pro!</p>
  `,
  lessons: [
    ch07_01,           // Lý thuyết: Packages và Crates
    ch07_01_ex,        // Bài tập: Modules cơ bản
    ch07_02,           // Lý thuyết: Modules & Visibility
    ch07_02_ex,        // Bài tập: pub và Visibility
    ch07_03,           // Lý thuyết: use và Paths
    ch07_03_ex,        // Bài tập: use và Paths
    ch07_04,           // Lý thuyết: use Keyword
    ch07_04_ex,        // Bài tập: Tổ chức Library
    ch07_05_ex,        // Bài tập: Xây dựng Library hoàn chỉnh
  ]
};
