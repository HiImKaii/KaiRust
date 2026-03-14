import { Chapter } from '../../courses';
import { ch12_01 } from './ch12_01';
import { ch12_02 } from './ch12_02';

export const ch12: Chapter = {
  id: 'ch12',
  title: 'Chương 12: Dự án I/O: Xây dựng Command Line Program',
  introduction: `
    <h2>Giới thiệu về dự án I/O</h2>
    <p>Chương này là một bài tổng kết về nhiều kỹ năng bạn đã học cho đến nay và một khám phá về một số tính năng standard library khác. Chúng ta sẽ xây dựng một công cụ command line tương tác với file và command line input/output để thực hành một số khái niệm Rust mà bạn bây giờ đã nắm vững.</p>

    <p>Tốc độ, sự an toàn, single binary output và cross-platform support của Rust khiến nó trở thành ngôn ngữ lý tưởng để tạo các công cụ command line, vì vậy cho project của chúng ta, chúng ta sẽ tạo phiên bản riêng của công cụ search command line kinh điển grep (globally search a regular expression and print). Trong trường hợp sử dụng đơn giản nhất, grep tìm kiếm một file được chỉ định cho một chuỗi được chỉ định. Để làm điều đó, grep lấy các arguments là một file path và một chuỗi. Sau đó, nó đọc file, tìm các dòng trong file đó chứa chuỗi argument, và in các dòng đó.</p>

    <p>Cùng với đó, chúng ta sẽ cho thấy cách làm cho công cụ command line của mình sử dụng các tính năng terminal mà nhiều công cụ command line khác sử dụng. Chúng ta sẽ đọc giá trị của một environment variable để cho phép người dùng cấu hình hành vi của công cụ của chúng ta. Chúng ta cũng sẽ in các error messages đến standard error console stream (stderr) thay vì standard output (stdout) để, ví dụ, người dùng có thể redirect successful output đến một file trong khi vẫn thấy error messages trên màn hình.</p>

    <p>Một thành viên cộng đồng Rust, Andrew Gallant, đã tạo một phiên bản đầy đủ tính năng và rất nhanh của grep, gọi là ripgrep. So với đó, phiên bản của chúng ta sẽ khá đơn giản, nhưng chương này sẽ cung cấp cho bạn một số kiến thức nền tảng cần thiết để hiểu một project thực tế như ripgrep.</p>

    <h3>Nội dung chương</h3>
    <ul>
      <li>→ <strong>Tổ chức code (Chương 7)</strong></li>
      <li>→ <strong>Sử dụng vectors và strings (Chương 8)</strong></li>
      <li>→ <strong>Xử lý errors (Chương 9)</strong></li>
      <li>→ <strong>Sử dụng traits và lifetimes khi thích hợp (Chương 10)</strong></li>
      <li>→ <strong>Viết tests (Chương 11)</strong></li>
    </ul>

    <p>Chúng ta cũng sẽ giới thiệu ngắn gọn về closures, iterators, và trait objects, mà Chương 13 và Chương 18 sẽ cover chi tiết.</p>
  `,
  lessons: [ch12_01, ch12_02]
};
