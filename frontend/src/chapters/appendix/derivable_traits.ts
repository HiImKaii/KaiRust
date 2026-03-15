import { Lesson } from '../../courses';

export const derivableTraits: Lesson = {
            id: 'appendix-c',
            title: 'Appendix C: Derivable Traits',
            duration: '40 phút',
            type: 'theory',
            content: `
<p>Ở nhiều vị trí trong cuốn sách, chúng ta đã thảo luận về thuộc tính derive, có thể apply cho struct hoặc enum definition. Thuộc tính derive generate code sẽ implement một trait với implementation mặc định của riêng nó trên type bạn đã annotate với derive syntax.</p>

<p>Trong phụ lục này, chúng ta cung cấp một tài liệu tham khảo của tất cả các traits trong thư viện chuẩn mà bạn có thể sử dụng với derive. Mỗi phần covers:</p>

<ul>
  <li>Operators và methods nào mà deriving trait này sẽ enable</li>
  <li>Implementation của trait được provide bởi derive làm gì</li>
  <li>Implementing the trait có nghĩa gì về type</li>
  <li>Các điều kiện mà bạn được phép hoặc không được phép implement trait</li>
  <li>Ví dụ về các operations yêu cầu trait</li>
</ul>

<p>Nếu bạn muốn behavior khác với behavior được provide bởi thuộc tính derive, hãy tham khảo tài liệu thư viện chuẩn cho mỗi trait để biết chi tiết về cách manually implement chúng.</p>

<p>Các traits được liệt kê ở đây là những traits duy nhất được định nghĩa bởi thư viện chuẩn có thể được implement trên types của bạn sử dụng derive. Các traits khác được định nghĩa trong thư viện chuẩn không có default behavior hợp lý, vì vậy bạn phải tự implement chúng theo cách hợp lý cho những gì bạn đang cố gắng đạt được.</p>

<p>Một ví dụ về trait không thể derive là Display, xử lý formatting cho end users. Bạn nên luôn cân nhắc cách thích hợp để hiển thị một type cho end user. Những phần nào của type nên được phép hiển thị? Họ sẽ thấy phần nào liên quan? Định dạng nào của dữ liệu sẽ liên quan nhất? Rust compiler không có insight này, vì vậy nó không thể provide default behavior phù hợp cho bạn.</p>

<p>Danh sách các derivable traits được cung cấp trong phụ lục này không toàn diện: Libraries có thể implement derive cho các traits của riêng họ, làm cho danh sách các traits bạn có thể sử dụng với derive thực sự mở rộng. Implementing derive involves using a procedural macro, which is covered in the "Custom derive Macros" section in Chapter 20.</p>

<h3 class="task-heading">Debug cho Programmer Output</h3>
<p>Trait Debug enable debug formatting trong format strings, được chỉ ra bằng cách thêm :? trong {} placeholders.</p>

<p>Trait Debug cho phép bạn print các instances của một type cho mục đích debugging, để bạn và các programmers khác sử dụng type của bạn có thể inspect một instance tại một điểm cụ thể trong quá trình thực thi chương trình.</p>

<p>Trait Debug được yêu cầu, ví dụ, trong việc sử dụng macro assert_eq!. Macro này in các giá trị của các instances được đưa ra làm arguments nếu equality assertion thất bại để programmers có thể thấy tại sao hai instances không bằng nhau.</p>

<h3 class="task-heading">PartialEq và Eq cho Equality Comparisons</h3>
<p>Trait PartialEq cho phép bạn so sánh các instances của một type để kiểm tra equality và enable việc sử dụng các operators == và !=.</p>

<p>Deriving PartialEq implement method eq. Khi PartialEq được derive trên structs, hai instances chỉ bằng nhau nếu tất cả các fields bằng nhau, và các instances không bằng nhau nếu bất kỳ fields nào không bằng nhau. Khi được derive trên enums, mỗi variant bằng chính nó và không bằng các variants khác.</p>

<p>Trait PartialEq được yêu cầu, ví dụ, với việc sử dụng macro assert_eq!, cần có khả năng so sánh hai instances của một type cho equality.</p>

<p>Trait Eq không có methods. Mục đích của nó là signal rằng cho mỗi giá trị của annotated type, giá trị bằng chính nó. Trait Eq chỉ có thể được apply cho các types cũng implement PartialEq, mặc dù không phải tất cả các types implement PartialEq đều có thể implement Eq. Một ví dụ về điều này là floating-point number types: Implementation của floating-point numbers nói rằng hai instances của giá trị not-a-number (NaN) không bằng nhau.</p>

<p>Một ví dụ về khi Eq được yêu cầu là cho keys trong một HashMap<K, V> để HashMap<K, V> có thể nói hai keys có giống nhau không.</p>

<h3 class="task-heading">PartialOrd và Ord cho Ordering Comparisons</h3>
<p>Trait PartialOrd cho phép bạn so sánh các instances của một type cho mục đích sorting. Một type implement PartialOrd có thể được sử dụng với các operators <, >, <=, và >=. Bạn chỉ có thể apply trait PartialOrd cho các types cũng implement PartialEq.</p>

<p>Deriving PartialOrd implement method partial_cmp, trả về một Option&lt;Ordering&gt; sẽ là None khi các giá trị được cho không tạo ra một ordering. Một ví dụ về giá trị không tạo ra ordering, mặc dù hầu hết các giá trị của type đó có thể được so sánh, là giá trị NaN floating point. Gọi partial_cmp với bất kỳ floating-point number nào và NaN floating-point value sẽ trả về None.</p>

<p>Khi được derive trên structs, PartialOrd so sánh hai instances bằng cách so sánh giá trị trong mỗi field theo thứ tự mà các fields xuất hiện trong struct definition. Khi được derive trên enums, các variants của enum được declare sớm hơn trong enum definition được coi là nhỏ hơn các variants được liệt kê sau đó.</p>

<p>Trait PartialOrd được yêu cầu, ví dụ, cho method gen_range từ rand crate generates a random value trong range được chỉ định bởi một range expression.</p>

<p>Trait Ord cho phép bạn biết rằng cho bất kỳ hai giá trị nào của annotated type, một ordering hợp lệ sẽ tồn tại. Trait Ord implement method cmp, trả về một Ordering thay vì Option&lt;Ordering&gt; vì một ordering hợp lệ sẽ luôn có thể. Bạn chỉ có thể apply trait Ord cho các types cũng implement PartialOrd và Eq (và Eq requires PartialEq). Khi được derive trên structs và enums, cmp behave giống như derived implementation cho partial_cmp với PartialOrd.</p>

<p>Một ví dụ về khi Ord được yêu cầu là khi storing values trong một BTreeSet&lt;T&gt;, một data structure stores data dựa trên sort order của các values.</p>

<h3 class="task-heading">Clone và Copy cho Duplicating Values</h3>
<p>Trait Clone cho phép bạn explicitly create một deep copy của một value, và quá trình duplication có thể involve running arbitrary code và copying heap data. Xem phần "Variables and Data Interacting with Clone" trong Chương 4 để biết thêm thông tin về Clone.</p>

<p>Deriving Clone implement method clone, khi được implement cho toàn bộ type, gọi clone trên mỗi phần của type. Điều này có nghĩa là tất cả các fields hoặc values trong type cũng phải implement Clone để derive Clone.</p>

<p>Một ví dụ về khi Clone được yêu cầu là khi gọi method to_vec trên một slice. Slice không sở hữu các type instances mà nó chứa, nhưng vector được trả về từ to_vec sẽ cần sở hữu các instances của nó, vì vậy to_vec gọi clone trên mỗi item. Do đó, type được lưu trữ trong slice phải implement Clone.</p>

<p>Trait Copy cho phép bạn duplicate một value chỉ bằng cách copying bits được lưu trữ trên stack; không cần arbitrary code. Xem phần "Stack-Only Data: Copy" trong Chương 4 để biết thêm thông tin về Copy.</p>

<p>Trait Copy không định nghĩa bất kỳ methods nào để ngăn programmers overloading những methods đó và violate giả định rằng không có arbitrary code đang được chạy. Bằng cách đó, tất cả programmers có thể assume rằng copying một value sẽ rất nhanh.</p>

<p>Bạn có thể derive Copy trên bất kỳ type nào mà các parts của nó đều implement Copy. Một type implement Copy cũng phải implement Clone vì một type implement Copy có một implementation đơn giản của Clone thực hiện cùng task với Copy.</p>

<p>Trait Copy hiếm khi được yêu cầu; các types implement Copy có optimizations available, có nghĩa là bạn không phải gọi clone, làm cho code ngắn gọn hơn.</p>

<p>Mọi thứ có thể làm với Copy bạn cũng có thể accomplish với Clone, nhưng code có thể chậm hơn hoặc phải sử dụng clone ở những nơi khác.</p>

<h3 class="task-heading">Hash cho Mapping một Value sang Value có Fixed Size</h3>
<p>Trait Hash cho phép bạn lấy một instance của một type có kích thước tùy ý và map instance đó sang một giá trị có kích thước cố định sử dụng một hash function. Deriving Hash implement method hash. Derived implementation của method hash combines kết quả của việc gọi hash trên mỗi phần của type, có nghĩa là tất cả các fields hoặc values cũng phải implement Hash để derive Hash.</p>

<p>Một ví dụ về khi Hash được yêu cầu là trong việc storing keys trong một HashMap&lt;K, V&gt; để lưu trữ dữ liệu hiệu quả.</p>

<h3 class="task-heading">Default cho Default Values</h3>
<p>Trait Default cho phép bạn tạo một default value cho một type. Deriving Default implement function default. Derived implementation của function default gọi function default trên mỗi phần của type, có nghĩa là tất cả các fields hoặc values trong type cũng phải implement Default để derive Default.</p>

<p>Function Default::default thường được sử dụng kết hợp với struct update syntax được thảo luận trong phần "Creating Instances from Other Instances with Struct Update Syntax" trong Chương 5. Bạn có thể customize một số fields của một struct và sau đó set và sử dụng default value cho phần còn lại bằng cách sử dụng ..Default::default().</p>

<p>Trait Default được yêu cầu khi bạn sử dụng method unwrap_or_default trên Option&lt;T&gt; instances, ví dụ. Nếu Option&lt;T&gt; là None, method unwrap_or_default sẽ trả về kết quả của Default::default cho type T được lưu trữ trong Option&lt;T&gt;.</p>
`,
            defaultCode: `// Derivable Traits Examples

#[derive(Debug, PartialEq, Eq, Clone, Copy, Hash, Default)]
struct Point {
    x: i32,
    y: i32,
}

#[derive(Debug, PartialEq, Clone)]
enum Status {
    Active,
    Inactive,
    Pending,
}

fn main() {
    // Debug trait
    let p1 = Point { x: 5, y: 10 };
    println!("Debug: {:?}", p1);

    // PartialEq trait
    let p2 = Point { x: 5, y: 10 };
    let p3 = Point { x: 5, y: 20 };
    println!("p1 == p2: {}", p1 == p2);
    println!("p1 == p3: {}", p1 == p3);

    // Clone and Copy traits
    let p4 = p1.clone();
    println!("Cloned: {:?}", p4);

    let p5 = p1; // Copy (no move)
    println!("Copied: {:?}", p5);

    // Default trait
    let default_point = Point::default();
    println!("Default: {:?}", default_point);

    // Using Default with struct update syntax
    let p6 = Point { x: 100, ..Default::default() };
    println!("Partial default: {:?}", p6);

    // Hash trait
    use std::collections::HashMap;
    let mut map: HashMap<Point, &str> = HashMap::new();
    map.insert(p1, "Origin nearby");
    println!("HashMap: {:?}", map);

    // PartialOrd and Ord for enums
    let statuses = vec![
        Status::Pending,
        Status::Active,
        Status::Inactive,
    ];
    println!("Statuses: {:?}", statuses);

    println!("\\nDerivable traits example completed!");
}
`,
            expectedOutput: `Debug: Point { x: 5, y: 10 }
p1 == p2: true
p1 == p3: false
Cloned: Point { x: 5, y: 10 }
Copied: Point { x: 5, y: 10 }
Default: Point { x: 0, y: 0 }
Partial default: Point { x: 100, y: 0 }
HashMap: {Point { x: 5, y: 10 }: "Origin nearby"}
Statuses: [Pending, Active, Inactive]

Derivable traits example completed!`
        };
