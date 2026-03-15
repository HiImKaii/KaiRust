import { Chapter } from '../../courses';
import { singleThreaded } from './single_threaded';
import { multithreaded } from './multithreaded';
import { gracefulShutdown } from './graceful_shutdown';

export const finalProject: Chapter = {
  id: 'final_project',
  title: 'Dự Án Cuối Cùng: Xây Dựng Web Server Đa Luồng',
  introduction: `
    <h2>Dự Án Cuối Cùng: Xây Dựng Web Server Đa Luồng</h2>
    <p>Đã là một hành trình dài, nhưng chúng ta đã đến cuối cuốn sách. Trong chương này, chúng ta sẽ cùng xây dựng một dự án khác để trình bày một số khái niệm chúng ta đã đề cập trong các chương cuối, cũng như ôn lại một số bài học trước đó.</p>
    <p>Cho dự án cuối cùng, chúng ta sẽ tạo một web server nói "Hello!" và trông như hình dưới đây trong trình duyệt web.</p>
    <p>Kế hoạch xây dựng web server của chúng ta:</p>
    <ul>
      <li>→ Tìm hiểu một chút về TCP và HTTP</li>
      <li>→ Lắng nghe TCP connections trên một socket</li>
      <li>→ Parse một số nhỏ HTTP requests</li>
      <li>→ Tạo một HTTP response đúng cách</li>
      <li>→ Cải thiện throughput của server với một thread pool</li>
    </ul>
    <p>Trước khi bắt đầu, cần lưu ý hai chi tiết. Thứ nhất, phương pháp chúng ta sử dụng không phải là cách tốt nhất để xây dựng web server với Rust. Các thành viên cộng đồng đã publish nhiều crates sẵn sàng cho production tại crates.io cung cấp các implementations web server và thread pool đầy đủ hơn những gì chúng ta sẽ xây dựng. Tuy nhiên, ý định của chương này là giúp bạn học, không phải đi theo con đường dễ dàng. Vì Rust là một ngôn ngữ lập trình hệ thống, chúng ta có thể chọn mức độ trừu tượng mà mình muốn làm việc và có thể đi đến mức thấp hơn so với các ngôn ngữ khác.</p>
    <p>Thứ hai, chúng ta sẽ không sử dụng async và await ở đây. Xây dựng một thread pool đã là một thách thức đủ lớn rồi! Tuy nhiên, chúng ta sẽ lưu ý cách async và await có thể áp dụng cho một số vấn đề tương tự mà chúng ta sẽ thấy trong chương này. Cuối cùng, như chúng ta đã lưu ý trong Chương 17, nhiều async runtimes sử dụng thread pools để quản lý công việc của họ.</p>
    <p>Chúng ta sẽ viết HTTP server và thread pool cơ bản thủ công để bạn có thể học các ý tưởng và kỹ thuật chung đằng sau các crates bạn có thể sử dụng trong tương lai.</p>
  `,
  lessons: [singleThreaded, multithreaded, gracefulShutdown]
};
