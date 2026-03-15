import { Lesson } from '../../courses';

export const ch20_01: Lesson = {
            id: '20-01',
            title: '20.1 Unsafe Rust',
            duration: '35 phút',
            type: 'theory',
            content: `
<p>Tất cả code chúng ta đã thảo luận cho đến giờ đều có các đảm bảo an toàn bộ nhớ của Rust được thực thi tại thời điểm biên dịch. Tuy nhiên, Rust có một ngôn ngữ thứ hai ẩn bên trong không thực thi các đảm bảo an toàn bộ nhớ này: Nó được gọi là unsafe Rust và hoạt động giống như Rust thông thường nhưng cung cấp cho chúng ta những siêu năng lực bổ sung.</p>

<p>Unsafe Rust tồn tại bởi vì, theo bản chất, phân tích tĩnh là bảo thủ. Khi compiler cố gắng xác định liệu code có duy trì các đảm bảo hay không, tốt hơn cho nó từ chối một số chương trình hợp lệ hơn là chấp nhận một số chương trình không hợp lệ. Mặc dù code có thể ổn, nếu Rust compiler không có đủ thông tin để tự tin, nó sẽ từ chối code. Trong những trường hợp này, bạn có thể sử dụng unsafe code để nói với compiler, "Hãy tin tôi, tôi biết tôi đang làm gì." Tuy nhiên, hãy cảnh báo rằng bạn sử dụng unsafe Rust có nguy cơ riêng: Nếu bạn sử dụng unsafe code không đúng cách, các vấn đề có thể xảy ra do không an toàn bộ nhớ, chẳng hạn như null pointer dereferencing.</p>

<p>Lý do khác mà Rust có một alter ego unsafe là vì phần cứng máy tính cơ bản là không an toàn theo bản chất. Nếu Rust không cho phép bạn thực hiện các operations không an toàn, bạn không thể thực hiện một số tác vụ nhất định. Rust cần cho phép bạn thực hiện lập trình hệ thống mức thấp, chẳng hạn như tương tác trực tiếp với hệ điều hành hoặc thậm chí viết hệ điều hành của riêng bạn. Làm việc với lập trình hệ thống mức thấp là một trong các mục tiêu của ngôn ngữ. Hãy khám phá những gì chúng ta có thể làm với unsafe Rust và cách thực hiện.</p>

<h3 class="task-heading">Thực Hiện Các Siêu Năng Lực Unsafe</h3>
<p>Để chuyển sang unsafe Rust, sử dụng từ khóa unsafe và sau đó bắt đầu một block mới chứa unsafe code. Bạn có thể thực hiện năm actions trong unsafe Rust mà bạn không thể làm trong safe Rust, được gọi là các siêu năng lực unsafe. Các siêu năng lực đó bao gồm khả năng:</p>

<ul>
  <li>Dereference một raw pointer.</li>
  <li>Gọi một unsafe function hoặc method.</li>
  <li>Truy cập hoặc sửa đổi một mutable static variable.</li>
  <li>Implement một unsafe trait.</li>
  <li>Truy cập các fields của một union.</li>
</ul>

<p>Điều quan trọng cần hiểu là unsafe không tắt borrow checker hoặc vô hiệu hóa bất kỳ kiểm tra an toàn nào khác của Rust: Nếu bạn sử dụng một reference trong unsafe code, nó vẫn sẽ được kiểm tra. Từ khóa unsafe chỉ cung cấp cho bạn quyền truy cập vào năm tính năng này sau đó không được compiler kiểm tra về an toàn bộ nhớ. Bạn vẫn sẽ có một mức độ an toàn nào đó bên trong một unsafe block.</p>

<p>Ngoài ra, unsafe không có nghĩa là code bên trong block nhất thiết là nguy hiểm hoặc sẽ chắc chắn có các vấn đề an toàn bộ nhớ: Mục đích là với tư cách là programmer, bạn sẽ đảm bảo rằng code bên trong unsafe block sẽ truy cập bộ nhớ theo cách hợp lệ.</p>

<p>Con người có thể mắc sai lầm và nhầm lẫn sẽ xảy ra, nhưng bằng cách yêu cầu năm operations unsafe này phải nằm trong các blocks được chú thích bằng unsafe, bạn sẽ biết rằng bất kỳ lỗi nào liên quan đến an toàn bộ nhớ phải nằm trong một unsafe block. Giữ các unsafe blocks nhỏ; bạn sẽ biết ơn sau này khi điều tra các memory bugs.</p>

<p>Để cô lập unsafe code càng nhiều càng tốt, tốt nhất là bao gọm code đó trong một safe abstraction và cung cấp một safe API, mà chúng ta sẽ thảo luận sau trong chương khi chúng ta xem xét các unsafe functions và methods. Các phần của thư viện chuẩn được triển khai như các safe abstractions trên unsafe code đã được audit. Bọc unsafe code trong một safe abstraction ngăn chặn việc sử dụng unsafe rò rỉ ra tất cả các nơi mà bạn hoặc người dùng có thể muốn sử dụng chức năng được triển khai với unsafe code, bởi vì việc sử dụng một safe abstraction là an toàn.</p>

<h3 class="task-heading">Dereferencing a Raw Pointer</h3>
<p>Trong Chương 4, ở phần "Dangling References", chúng ta đề cập rằng compiler đảm bảo các references luôn hợp lệ. Unsafe Rust có hai kiểu mới được gọi là raw pointers tương tự như references. Cũng như với references, raw pointers có thể là immutable hoặc mutable và được viết lần lượt là *const T và *mut T. Dấu hoa thị không phải là toán tử dereference; nó là một phần của tên kiểu. Trong ngữ cảnh của raw pointers, immutable có nghĩa là pointer không thể được gán trực tiếp sau khi bị dereferenced.</p>

<p>Khác với references và smart pointers, raw pointers:</p>

<ul>
  <li>Được phép bỏ qua các borrowing rules bằng cách có cả immutable và mutable pointers hoặc nhiều mutable pointers đến cùng một vị trí</li>
  <li>Không được đảm bảo trỏ đến bộ nhớ hợp lệ</li>
  <li>Được phép là null</li>
  <li>Không triển khai bất kỳ cleanup tự động nào</li>
</ul>

<p>Bằng cách từ chối việc Rust thực thi các đảm bảo này, bạn có thể từ bỏ an toàn được đảm bảo để đổi lấy hiệu suất lớn hơn hoặc khả năng giao diện với ngôn ngữ hoặc phần cứng khác nơi các đảm bảo của Rust không áp dụng.</p>

<p>Listing 20-1 cho thấy cách tạo một immutable và một mutable raw pointer.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut num = 5;

let r1 = &raw const num;
let r2 = &raw mut num;</code></pre>
</div>
<p><em>Listing 20-1: Tạo raw pointers với các raw borrow operators</em></p>

<p>Lưu ý rằng chúng ta không bao gồm từ khóa unsafe trong code này. Chúng ta có thể tạo raw pointers trong safe code; chúng ta chỉ không thể dereference raw pointers bên ngoài một unsafe block, như bạn sẽ thấy một chút.</p>

<p>Chúng ta đã tạo raw pointers bằng cách sử dụng các raw borrow operators: &raw const num tạo một *const i32 immutable raw pointer, và &raw mut num tạo một *mut i32 mutable raw pointer. Vì chúng ta tạo chúng trực tiếp từ một local variable, chúng ta biết các raw pointers cụ thể này là hợp lệ, nhưng chúng ta không thể giả định điều đó về bất kỳ raw pointer nào.</p>

<p>Để minh họa điều này, tiếp theo chúng ta sẽ tạo một raw pointer mà chúng ta không thể chắc chắn về tính hợp lệ, sử dụng từ khóa as để cast một giá trị thay vì sử dụng raw borrow operator. Listing 20-2 cho thấy cách tạo một raw pointer đến một vị trí tùy ý trong bộ nhớ. Cố gắng sử dụng bộ nhớ tùy ý là undefined: Có thể có dữ liệu tại địa chỉ đó hoặc có thể không, compiler có thể tối ưu hóa code sao cho không có truy cập bộ nhớ, hoặc chương trình có thể kết thúc với segmentation fault. Thông thường, không có lý do tốt để viết code như thế này, đặc biệt trong các trường hợp bạn có thể sử dụng một raw borrow operator thay vào đó, nhưng nó là có thể.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let address = 0x012345usize;
let r = address as *const i32;</code></pre>
</div>
<p><em>Listing 20-2: Tạo một raw pointer đến một địa chỉ bộ nhớ tùy ý</em></p>

<p>Nhớ rằng chúng ta có thể tạo raw pointers trong safe code, nhưng chúng ta không thể dereference raw pointers và đọc dữ liệu được trỏ đến. Trong Listing 20-3, chúng ta sử dụng toán tử dereference * trên một raw pointer đòi hỏi một unsafe block.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut num = 5;

let r1 = &raw const num;
let r2 = &raw mut num;

unsafe {
    println!("r1 is: {}", *r1);
    println!("r2 is: {}", *r2);
}</code></pre>
</div>
<p><em>Listing 20-3: Dereferencing raw pointers trong một unsafe block</em></p>

<p>Tạo một pointer không gây hại; chỉ khi chúng ta cố gắng truy cập giá trị mà nó trỏ đến chúng ta có thể kết thúc việc xử lý một giá trị không hợp lệ.</p>

<p>Cũng lưu ý rằng trong Listings 20-1 và 20-3, chúng ta đã tạo *const i32 và *mut i32 raw pointers cùng trỏ đến một vị trí bộ nhớ, nơi num được lưu trữ. Nếu thay vào đó chúng ta cố gắng tạo một immutable và một mutable reference đến num, code sẽ không biên dịch vì các quy tắc ownership của Rust không cho phép một mutable reference cùng lúc với bất kỳ immutable references nào. Với raw pointers, chúng ta có thể tạo một mutable pointer và một immutable pointer đến cùng một vị trí và thay đổi dữ liệu thông qua mutable pointer, có khả năng tạo ra một data race. Hãy cẩn thận!</p>

<h3 class="task-heading">Calling an Unsafe Function or Method</h3>
<p>Loại thứ hai của operation bạn có thể thực hiện trong một unsafe block là gọi unsafe functions. Unsafe functions và methods trông hoàn toàn giống các functions và methods thông thường, nhưng có một unsafe bổ sung trước phần còn lại của định nghĩa. Từ khóa unsafe trong ngữ cảnh này cho biết function có các yêu cầu mà chúng ta cần duy trì khi gọi function này, vì Rust không thể đảm bảo chúng ta đã đáp ứng các yêu cầu này. Bằng cách gọi một unsafe function trong một unsafe block, chúng ta nói rằng chúng ta đã đọc tài liệu của function và chịu trách nhiệm duy trì hợp đồng của function.</p>

<p>Đây là một unsafe function tên là dangerous không làm gì trong body của nó:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>unsafe fn dangerous() {}

unsafe {
    dangerous();
}</code></pre>
</div>

<p>Chúng ta phải gọi dangerous function trong một unsafe block riêng biệt. Nếu chúng ta cố gắng gọi dangerous mà không có unsafe block, chúng ta sẽ nhận được một lỗi:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>$ cargo run
   Compiling unsafe-example v0.1.0 (file:///projects/unsafe-example)
error[E0133]: call to unsafe function \`dangerous\` is unsafe and requires unsafe block
 --> src/main.rs:4:5
  |
4 |     dangerous();
  |     ^^^^^^^^^^^ call to unsafe function
  |
  = note: consult the function's documentation for information on how to avoid undefined behavior

For more information about this error, try \`rustc --explain E0133\`.
error: could not compile \`unsafe-example\` (bin "unsafe-example") due to 1 previous error</code></pre>
</div>

<p>Với unsafe block, chúng ta khẳng định với Rust rằng chúng ta đã đọc tài liệu của function, chúng ta hiểu cách sử dụng nó đúng cách, và chúng ta đã xác minh rằng chúng ta đang thực hiện hợp đồng của function.</p>

<h3 class="task-heading">Accessing or Modifying a Mutable Static Variable</h3>
<p>Trong cuốn sách này, chúng ta chưa nói về các biến toàn cục, mà Rust hỗ trợ nhưng có thể gây ra vấn đề với các quy tắc ownership của Rust. Nếu hai threads truy cập cùng một mutable global variable, nó có thể gây ra một data race.</p>

<p>Trong Rust, các biến toàn cục được gọi là các static variables. Listing 20-10 cho thấy một ví dụ khai báo và sử dụng một static variable với một string slice làm giá trị.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>static HELLO_WORLD: &str = "Hello, world!";

fn main() {
    println!("value is: {HELLO_WORLD}");
}</code></pre>
</div>
<p><em>Listing 20-10: Định nghĩa và sử dụng một immutable static variable</em></p>

<p>Static variables tương tự như constants, mà chúng ta đã thảo luận trong phần "Declaring Constants" ở Chương 3. Các tên của static variables theo quy ước là SCREAMING_SNAKE_CASE. Static variables chỉ có thể lưu trữ các references với lifetime 'static, có nghĩa là compiler có thể tìm ra lifetime và chúng ta không cần phải chú thích nó một cách rõ ràng. Truy cập một immutable static variable là an toàn.</p>

<p>Một sự khác biệt tinh tế giữa constants và immutable static variables là các giá trị trong một static variable có địa chỉ cố định trong bộ nhớ. Sử dụng giá trị sẽ luôn truy cập cùng một dữ liệu. Một sự khác biệt khác là các static variables có thể là mutable. Truy cập và sửa đổi các mutable static variables là unsafe.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>static mut COUNTER: u32 = 0;

/// SAFETY: Calling this from more than a single thread at a time is undefined
/// behavior, so you *must* guarantee you only call it from a single thread at
/// a time.
unsafe fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    unsafe {
        // SAFETY: This is only called from a single thread in \`main\`.
        add_to_count(3);
        println!("COUNTER: {}", *(&raw const COUNTER));
    }
}</code></pre>
</div>
<p><em>Listing 20-11: Đọc hoặc ghi vào một mutable static variable là unsafe.</em></p>

<h3 class="task-heading">Implementing an Unsafe Trait</h3>
<p>Chúng ta có thể sử dụng unsafe để implement một unsafe trait. Một trait là unsafe khi ít nhất một trong các methods của nó có một invariant mà compiler không thể xác minh. Chúng ta khai báo rằng một trait là unsafe bằng cách thêm từ khóa unsafe trước trait và đánh dấu việc implement trait đó cũng là unsafe.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>unsafe trait Foo {
    // methods go here
}

unsafe impl Foo for i32 {
    // method implementations go here
}</code></pre>
</div>
<p><em>Listing 20-12: Định nghĩa và implement một unsafe trait</em></p>

<p>Bằng cách sử dụng unsafe impl, chúng ta hứa rằng chúng ta sẽ duy trì các invariants mà compiler không thể xác minh.</p>

<h3 class="task-heading">Accessing Fields of a Union</h3>
<p>Action cuối cùng chỉ hoạt động với unsafe là truy cập các fields của một union. Một union tương tự như một struct, nhưng chỉ một declared field được sử dụng trong một instance cụ thể tại một thời điểm. Unions chủ yếu được sử dụng để giao diện với unions trong code C. Truy cập các union fields là unsafe vì Rust không thể đảm bảo kiểu của dữ liệu hiện đang được lưu trữ trong union instance.</p>

<h3 class="task-heading">Using Miri to Check Unsafe Code</h3>
<p>Khi viết unsafe code, bạn có thể muốn kiểm tra những gì bạn đã viết thực sự an toàn và đúng. Một trong những cách tốt nhất để làm điều đó là sử dụng Miri, một công cụ chính thức của Rust để phát hiện undefined behavior. Trong khi borrow checker là một công cụ tĩnh hoạt động tại thời điểm biên dịch, Miri là một công cụ động hoạt động tại runtime. Nó kiểm tra code của bạn bằng cách chạy chương trình của bạn và phát hiện khi bạn vi phạm các quy tắc mà nó hiểu về cách Rust nên hoạt động.</p>

<p>Sử dụng Miri yêu cầu một nightly build của Rust. Bạn có thể cài đặt cả phiên bản nightly của Rust và công cụ Miri bằng cách gõ rustup +nightly component add miri. Bạn có thể chạy Miri trên một dự án bằng cách gõ cargo +nightly miri run hoặc cargo +nightly miri test.</p>
`,
            defaultCode: `fn main() {
    // Raw pointers (cần unsafe để dereference)
    let x = 42;
    let r = &x as *const i32;

    unsafe {
        println!("Raw pointer value: {}", *r);
    }

    // Safe wrapper cho unsafe operation
    let v = vec![1, 2, 3, 4, 5, 6];
    let (left, right) = split_at(&v, 3);
    println!("Left: {:?}", left);
    println!("Right: {:?}", right);

    // Gọi unsafe function
    unsafe {
        dangerous();
    }
}

unsafe fn dangerous() {
    println!("Unsafe function called!");
}

fn split_at(slice: &[i32], mid: usize) -> (&[i32], &[i32]) {
    assert!(mid <= slice.len());
    (&slice[..mid], &slice[mid..])
}
`,
            expectedOutput: `Raw pointer value: 42
Left: [1, 2, 3]
Right: [4, 5, 6]
Unsafe function called!`
        };
