import { Lesson } from '../../courses';

export const ch08_01: Lesson = {
            id: 'ch08-01',
            title: '8.1 Storing Lists of Values with Vectors',
            duration: '45 phút',
            type: 'theory',
            content: `
<p>Loại collection đầu tiên chúng ta sẽ xem xét là Vec<T>, còn được gọi là vector. Vector cho phép bạn lưu trữ nhiều hơn một giá trị trong một cấu trúc dữ liệu duy nhất, đặt tất cả các giá trị cạnh nhau trong bộ nhớ. Vector chỉ có thể lưu trữ các giá trị cùng kiểu. Chúng hữu ích khi bạn có danh sách các mục, như các dòng văn bản trong một file hoặc giá của các mặt hàng trong giỏ mua sắm.</p>

<h3 class="task-heading">Tạo Một Vector Mới</h3>
<p>Để tạo một vector rỗng mới, chúng ta gọi hàm Vec::new(), như trong Ví dụ 8-1.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v: Vec&lt;i32&gt; = Vec::new();</code></pre>
</div>
<p><em>Ví dụ 8-1: Tạo một vector rỗng mới để lưu trữ các giá trị kiểu i32</em></p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Ở đây chúng ta đã thêm một type annotation. Vì chúng ta không chèn bất kỳ giá trị nào vào vector này, Rust không biết chúng ta định lưu trữ loại phần tử nào. Đây là một điểm quan trọng. Vector được triển khai sử dụng generics; chúng ta sẽ cover cách sử dụng generics với các kiểu của riêng bạn trong Chương 10. Hiện tại, hãy biết rằng kiểu Vec&lt;T&gt; do thư viện chuẩn cung cấp có thể lưu trữ bất kỳ kiểu nào. Khi chúng ta tạo một vector để lưu trữ một kiểu cụ thể, chúng ta có thể chỉ định kiểu đó trong dấu ngoặc nhọn.
</div>

<p>Thông thường hơn, bạn sẽ tạo một Vec&lt;T&gt; với các giá trị ban đầu, và Rust sẽ suy luận kiểu giá trị bạn muốn lưu trữ, vì vậy bạn hiếm khi cần làm type annotation này. Rust cung cấp macro vec! một cách tiện lợi, macro này sẽ tạo một vector mới chứa các giá trị bạn cung cấp. Ví dụ 8-2 tạo một Vec&lt;i32&gt; mới chứa các giá trị 1, 2 và 3.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v = vec![1, 2, 3];</code></pre>
</div>
<p><em>Ví dụ 8-2: Tạo một vector mới chứa các giá trị</em></p>

<p>Vì chúng ta đã cho các giá trị i32 ban đầu, Rust có thể suy luận rằng kiểu của v là Vec&lt;i32&gt;, và type annotation là không cần thiết. Tiếp theo, chúng ta sẽ xem xét cách modify một vector.</p>

<h3 class="task-heading">Cập Nhật Một Vector</h3>
<p>Để tạo một vector và sau đó thêm các phần tử vào nó, chúng ta có thể sử dụng method push, như trong Ví dụ 8-3.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut v = Vec::new();

v.push(5);
v.push(6);
v.push(7);
v.push(8);</code></pre>
</div>
<p><em>Ví dụ 8-3: Sử dụng method push để thêm giá trị vào vector</em></p>

<p>Cũng như với bất kỳ biến nào, nếu chúng ta muốn có thể thay đổi giá trị của nó, chúng ta cần làm cho nó mutable bằng từ khóa mut. Các số chúng ta đặt bên trong đều thuộc kiểu i32, và Rust suy ra điều này từ dữ liệu, vì vậy chúng ta không cần annotation Vec&lt;i32&gt;.</p>

<h3 class="task-heading">Đọc Các Phần Tử Của Vector</h3>
<p>Có hai cách để tham chiếu một giá trị được lưu trữ trong vector: thông qua indexing hoặc bằng cách sử dụng method get. Trong các ví dụ sau, chúng ta đã annotate các kiểu của các giá trị được trả về từ các hàm này để làm rõ thêm.</p>

<p>Ví dụ 8-4 cho thấy cả hai phương pháp truy cập một giá trị trong vector, với indexing syntax và method get.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v = vec![1, 2, 3, 4, 5];

let third: &i32 = &v[2];
println!("The third element is {third}");

let third: Option<&i32> = v.get(2);
match third {
    Some(third) => println!("The third element is {third}"),
    None => println!("There is no third element."),
}</code></pre>
</div>
<p><em>Ví dụ 8-4: Sử dụng indexing syntax và method get để truy cập một phần tử trong vector</em></p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Chúng ta sử dụng giá trị index là 2 để lấy phần tử thứ ba vì vector được index bắt đầu từ 0. Sử dụng & và [] cho chúng ta một tham chiếu đến phần tử tại giá trị index. Khi chúng ta sử dụng method get với index được truyền như một tham số, chúng ta nhận được một Option<&T> mà chúng ta có thể sử dụng với match.
</div>

<p>Rust cung cấp hai cách này để tham chiếu một phần tử để bạn có thể chọn cách chương trình hoạt động khi bạn cố gắng sử dụng giá trị index ngoài phạm vi của các phần tử hiện có. Ví dụ, hãy xem điều gì sẽ xảy ra khi chúng ta có một vector gồm năm phần tử và sau đó cố gắng truy cập một phần tử tại index 100 với mỗi kỹ thuật, như trong Ví dụ 8-5.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này sẽ PANIC!
let v = vec![1, 2, 3, 4, 5];

let does_not_exist = &v[100];
let does_not_exist = v.get(100);</code></pre>
</div>
<p><em>Ví dụ 8-5: Cố gắng truy cập phần tử tại index 100 trong một vector chứa năm phần tử</em></p>

<p>Khi chúng ta chạy code này, method [] đầu tiên sẽ gây panic vì nó tham chiếu đến một phần tử không tồn tại. Method này được sử dụng tốt nhất khi bạn muốn chương trình của bạn crash nếu có nỗ lực truy cập một phần tử vượt quá cuối vector.</p>

<p>Khi method get được truyền một index nằm ngoài vector, nó trả về None mà không panic. Bạn nên sử dụng method này nếu việc truy cập một phần tử vượt quá phạm vi của vector đôi khi có thể xảy ra trong các trường hợp bình thường. Code của bạn sau đó sẽ có logic để xử lý có Some(&element) hoặc None. Ví dụ, index có thể đến từ một người đang nhập một số. Nếu họ vô tình nhập một số quá lớn và chương trình nhận được giá trị None, bạn có thể cho họ biết có bao nhiêu mục trong vector hiện tại và cho họ cơ hội khác để nhập một giá trị hợp lệ. Điều đó sẽ thân thiện hơn với người dùng so với việc crash chương trình do lỗi chính tả!</p>

<div class="cyber-alert warning">
  <strong>Quy tắc Borrow:</strong> Khi chương trình có một tham chiếu hợp lệ, borrow checker sẽ thực thi các quy tắc sở hữu và mượn để đảm bảo rằng tham chiếu này và bất kỳ tham chiếu nào khác đến nội dung của vector vẫn hợp lệ.
</div>

<p>Hãy xem điều gì xảy ra khi chương trình có một tham chiếu bất biến đến phần tử đầu tiên trong một vector và cố gắng thêm một phần tử vào cuối. Chương trình này sẽ không hoạt động nếu chúng ta cũng cố gắng tham chiếu đến phần tử đó sau này trong hàm.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này KHÔNG biên dịch được!
let mut v = vec![1, 2, 3, 4, 5];

let first = &v[0];

v.push(6);

println!("The first element is: {first}");</code></pre>
</div>
<p><em>Ví dụ 8-6: Cố gắng thêm một phần tử vào vector trong khi giữ tham chiếu đến một mục</em></p>

<p>Khi biên dịch code này, bạn sẽ nhận được lỗi:</p>
<pre><code>error[E0502]: cannot borrow \`v\` as mutable because it is also borrowed as immutable
 --> src/main.rs:6:5
  |
4 |     let first = &v[0];
  |                  - immutable borrow occurs here
5 |
6 |     v.push(6);
  |     ^^^^^^^^^ mutable borrow occurs here
7 |
8 |     println!("The first element is: {first}");
  |                                      ----- immutable borrow later used here
</code></pre>

<p>Code trong Ví dụ 8-6 có vẻ như nó nên hoạt động: Tại sao một tham chiếu đến phần tử đầu tiên lại quan tâm đến việc thay đổi ở cuối vector? Lỗi này là do cách vector hoạt động: Vì vector đặt các giá trị cạnh nhau trong bộ nhớ, việc thêm một phần tử mới vào cuối vector có thể yêu cầu cấp phát bộ nhớ mới và sao chép các phần tử cũ sang không gian mới, nếu không có đủ chỗ để đặt tất cả các phần tử cạnh nhau ở nơi vector hiện đang được lưu trữ. Trong trường hợp đó, tham chiếu đến phần tử đầu tiên sẽ trỏ đến bộ nhớ đã được giải phóng. Các quy tắc borrowing ngăn các chương trình kết thúc trong tình huống đó.</p>

<h3 class="task-heading">Duyệt Qua Các Giá Trị Trong Vector</h3>
<p>Để truy cập từng phần tử trong một vector lần lượt, chúng ta sẽ duyệt qua tất cả các phần tử thay vì sử dụng index để truy cập từng cái một. Ví dụ 8-7 cho thấy cách sử dụng vòng for để lấy tham chiếu bất biến đến từng phần tử trong một vector các giá trị i32 và in chúng ra.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v = vec![100, 32, 57];
for i in &v {
    println!("{i}");
}</code></pre>
</div>
<p><em>Ví dụ 8-7: In từng phần tử trong vector bằng cách duyệt qua các phần tử sử dụng vòng for</em></p>

<p>Chúng ta cũng có thể duyệt qua các tham chiếu có thể thay đổi (mutable references) đến từng phần tử trong một vector có thể thay đổi để thay đổi tất cả các phần tử. Vòng for trong Ví dụ 8-8 sẽ thêm 50 vào mỗi phần tử.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut v = vec![100, 32, 57];
for i in &mut v {
    *i += 50;
}</code></pre>
</div>
<p><em>Ví dụ 8-8: Duyệt qua các tham chiếu có thể thay đổi đến các phần tử trong một vector</em></p>

<p>Để thay đổi giá trị mà tham chiếu có thể thay đổi đề cập đến, chúng ta phải sử dụng toán tử * dereference để lấy giá trị trong i trước khi có thể sử dụng toán tử +=.</p>

<div class="cyber-alert info">
  <strong>An toàn:</strong> Duyệt qua một vector, whether immutably hoặc mutably, là an toàn nhờ các quy tắc của borrow checker. Nếu chúng ta cố gắng chèn hoặc xóa các mục trong thân vòng for, chúng ta sẽ nhận được một lỗi compiler tương tự như code trong Ví dụ 8-6.
</div>

<h3 class="task-heading">Sử Dụng Enum Để Lưu Trữ Nhiều Kiểu</h3>
<p>Vector chỉ có thể lưu trữ các giá trị cùng kiểu. Điều này có thể bất tiện; có những trường hợp sử dụng cần lưu trữ danh sách các mục của các kiểu khác nhau. May mắn thay, các variant của một enum được định nghĩa cùng một kiểu enum, vì vậy khi chúng ta cần một kiểu để đại diện cho các phần tử của các kiểu khác nhau, chúng ta có thể định nghĩa và sử dụng một enum!</p>

<p>Ví dụ, giả sử chúng ta muốn lấy các giá trị từ một hàng trong bảng tính trong đó một số cột trong hàng chứa số nguyên, một số số thập phân và một số chuỗi. Chúng ta có thể định nghĩa một enum có các variant sẽ chứa các kiểu giá trị khác nhau, và tất cả các variant enum sẽ được coi là cùng một kiểu: kiểu của enum. Sau đó, chúng ta có thể tạo một vector để lưu enum đó và do đó, cuối cùng lưu trữ các kiểu khác nhau.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];</code></pre>
</div>
<p><em>Ví dụ 8-9: Định nghĩa một enum để lưu trữ các giá trị của nhiều kiểu trong một vector</em></p>

<p>Rust cần biết những kiểu nào sẽ có trong vector tại thời điểm compile để nó biết chính xác bao nhiêu bộ nhớ heap sẽ cần để lưu trữ mỗi phần tử. Chúng ta cũng phải rõ ràng về những kiểu nào được phép trong vector này. Nếu Rust cho phép một vector lưu trữ bất kỳ kiểu nào, có thể có cơ hội rằng một hoặc nhiều kiểu sẽ gây ra lỗi với các thao tác được thực hiện trên các phần tử của vector. Việc sử dụng một enum cộng với một match expression có nghĩa là Rust sẽ đảm bảo tại thời điểm compile rằng mọi trường hợp có thể xảy ra đều được xử lý.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Nếu bạn không biết tập hợp đầy đủ các kiểu mà chương trình sẽ nhận được tại runtime để lưu trữ trong một vector, kỹ thuật enum sẽ không hoạt động. Thay vào đó, bạn có thể sử dụng một trait object, mà chúng ta sẽ cover trong Chương 18.
</div>

<h3 class="task-heading">Xóa Vector Xóa Các Phần Tử Của Nó</h3>
<p>Giống như bất kỳ struct nào khác, một vector được giải phóng khi nó ra khỏi phạm vi, như trong Ví dụ 8-10.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>{
    let v = vec![1, 2, 3, 4];

    // do stuff with v
} // <- v goes out of scope and is freed here</code></pre>
</div>
<p><em>Ví dụ 8-10: Hiển thị nơi vector và các phần tử của nó bị xóa</em></p>

<p>Khi vector bị drop, tất cả nội dung của nó cũng bị drop, nghĩa là các số nguyên nó giữ sẽ được dọn dẹp. Borrow checker đảm bảo rằng bất kỳ tham chiếu nào đến nội dung của vector chỉ được sử dụng trong khi bản thân vector còn hợp lệ.</p>

<h3 class="task-heading">Các Method Phổ Biến Của Vector</h3>
<p>Ngoài push, vector còn cung cấp nhiều method hữu ích. Dưới đây là một số method phổ biến:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v = vec![1, 2, 3, 4, 5];

// Truy cập
v.len();           // Số phần tử: 5
v.is_empty();      // false
v.contains(&3);    // true
v.first();         // Some(&1)
v.last();          // Some(&5)
v.get(2);          // Some(&3)

// Thao tác
let mut v = vec![1, 2, 3];
v.pop();           // Some(3) - xóa phần tử cuối
v.remove(0);      // 1 - xóa theo index
v.clear();        // Xóa tất cả
v.extend([6, 7, 8]);  // Thêm nhiều phần tử

// Capacity
let mut v = Vec::with_capacity(10);
v.push(1);
v.capacity();     // 10</code></pre>
</div>

<p>Đảm bảo xem tài liệu API để biết tất cả các method hữu ích được định nghĩa trên Vec&lt;T&gt; bởi thư viện chuẩn.</p>

<h3 class="task-heading">Tiếp Theo</h3>
<p>Bây giờ chúng ta đã thảo luận về một số cách phổ biến nhất để sử dụng vectors, hãy chuyển sang loại collection tiếp theo: String!</p>
`,
            defaultCode: `fn main() {
    // === Tạo Vector với Capacity ===
    let mut numbers = Vec::with_capacity(5);
    numbers.push(10);
    numbers.push(20);
    numbers.push(30);
    println!("Len: {}, Cap: {}", numbers.len(), numbers.capacity());

    // === Các Methods phổ biến ===
    let v = vec![1, 2, 3, 4, 5];
    println!("\\n--- Methods ---");
    println!("is_empty: {}", v.is_empty());
    println!("contains(&3): {}", v.contains(&3));
    println!("first: {:?}", v.first());
    println!("last: {:?}", v.last());

    // === Vector Slicing ===
    let slice = &v[1..4];
    println!("\\n--- Slice [1..4] ---");
    println!("slice: {:?}", slice);

    // === Iterators ===
    let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();
    println!("\\n--- Iterator (.map) ---");
    println!("doubled: {:?}", doubled);

    let sum: i32 = v.iter().sum();
    println!("sum: {}", sum);

    // === Enum + Pattern Matching ===
    enum Cell {
        Int(i32),
        Float(f64),
        Text(String),
    }

    let row = vec![
        Cell::Int(3),
        Cell::Float(10.12),
        Cell::Text(String::from("blue")),
    ];

    println!("\\n--- Enum + Match ---");
    for cell in &row {
        match cell {
            Cell::Int(n) => println!("Integer: {n}"),
            Cell::Float(f) => println!("Float: {f}"),
            Cell::Text(s) => println!("Text: {s}"),
        }
    }
}
`,
            expectedOutput: 'Len: 3, Cap: 5\n\n--- Methods ---\nis_empty: false\ncontains(&3): true\nfirst: Some(1)\nlast: Some(5)\n\n--- Slice [1..4] ---\nslice: [2, 3, 4]\n\n--- Iterator (.map) ---\ndoubled: [2, 4, 6, 8, 10]\nsum: 15\n\n--- Enum + Match ---\nInteger: 3\nFloat: 10.12\nText: blue'
        };
