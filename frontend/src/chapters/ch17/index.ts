import { Chapter } from '../../courses';
import { ch17_01 } from './ch17_01';
import { ch17_02 } from './ch17_02';
import { ch17_03 } from './ch17_03';
import { ch17_04 } from './ch17_04';
import { ch17_05 } from './ch17_05';
import { ch17_06 } from './ch17_06';
import { ch17_01_ex } from './ch17_01_ex';
import { ch17_02_ex } from './ch17_02_ex';
import { ch17_03_ex } from './ch17_03_ex';
import { ch17_04_ex } from './ch17_04_ex';
import { ch17_05_ex } from './ch17_05_ex';
import { ch17_06_ex } from './ch17_06_ex';
import { ch17_07_ex } from './ch17_07_ex';
import { ch17_08_ex } from './ch17_08_ex';
import { ch17_09_ex } from './ch17_09_ex';
import { ch17_10_ex } from './ch17_10_ex';
import { ch17_11_ex } from './ch17_11_ex';
import { ch17_12_ex } from './ch17_12_ex';
import { ch17_13_ex } from './ch17_13_ex';
import { ch17_14_ex } from './ch17_14_ex';
import { ch17_15_ex } from './ch17_15_ex';

export const ch17: Chapter = {
  id: 'ch17',
  title: 'Chương 17: Fundamentals of Asynchronous Programming',
  introduction: `
    <h2>Fundamentals of Asynchronous Programming: Async, Await, Futures, and Streams</h2>
    <p>Nhiều operations chúng ta yêu cầu máy tính thực hiện có thể mất một thời gian để hoàn thành. Thật tuyệt nếu chúng ta có thể làm những việc khác trong khi đang đợi các long-running processes hoàn thành. Máy tính hiện đại cung cấp hai kỹ thuật để làm việc trên nhiều hơn một operation cùng lúc: parallelism và concurrency.</p>
    <p>Tuy nhiên, logic của các chương trình của chúng ta được viết theo cách phần lớn là tuyến tính. Chúng ta muốn có thể specify các operations mà một chương trình nên thực hiện và các điểm tại đó một function có thể pause và một phần khác của chương trình có thể chạy thay, mà không cần specify ngay từ đầu chính xác thứ tự và cách mỗi bit của code nên chạy. Asynchronous programming là một abstraction cho phép chúng ta express code của mình theo terms của potential pausing points và eventual results.</p>
    <p>Chương này xây dựng trên việc sử dụng threads của Chương 16 cho parallelism và concurrency bằng cách giới thiệu một cách tiếp cận thay thế để viết code: Rust's futures, streams, và async và await syntax cho phép chúng ta express cách operations có thể là asynchronous.</p>
  `,
  lessons: [
    ch17_01, ch17_01_ex, ch17_02, ch17_02_ex,
    ch17_03, ch17_03_ex, ch17_04, ch17_04_ex,
    ch17_05, ch17_05_ex, ch17_06, ch17_06_ex,
    ch17_07_ex, ch17_08_ex, ch17_09_ex, ch17_10_ex,
    ch17_11_ex, ch17_12_ex, ch17_13_ex, ch17_14_ex,
    ch17_15_ex,
  ]
};
