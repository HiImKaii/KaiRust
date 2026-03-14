import { Lesson } from '../../courses';

export const ch08_03: Lesson = {
            id: 'ch08-03',
            title: '8.3 Storing Keys with Associated Values in Hash Maps',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Loại collection cuối cùng của chúng ta là hash map. Loại HashMap&lt;K, V&gt; lưu trữ một mapping từ các keys có kiểu K đến các values có kiểu V sử dụng một hashing function, function này xác định cách nó đặt các keys và values vào bộ nhớ. Nhiều ngôn ngữ lập trình hỗ trợ loại cấu trúc dữ liệu này, nhưng chúng thường sử dụng tên khác nhau, như hash, map, object, hash table, dictionary, hoặc associative array, để kể ra vài cái.</p>

<p>Hash maps hữu ích khi bạn muốn tra cứu dữ liệu không bằng cách sử dụng index, như bạn có thể với vectors, mà bằng cách sử dụng một key có thể thuộc bất kỳ kiểu nào. Ví dụ, trong một game, bạn có thể theo dõi điểm số của mỗi đội trong một hash map trong đó mỗi key là tên của đội và các values là điểm số của mỗi đội. Cho một tên đội, bạn có thể truy xuất điểm số của nó.</p>

<p>Chúng ta sẽ đi qua basic API của hash maps trong phần này, nhưng còn nhiều thứ hay ho khác đang ẩn trong các functions được định nghĩa trên HashMap&lt;K, V&gt; bởi thư viện chuẩn. Như thường lệ, hãy xem tài liệu thư viện chuẩn để biết thêm thông tin.</p>

<h3 class="task-heading">Tạo Một Hash Map Mới</h3>
<p>Một cách để tạo một hash map rỗng là sử dụng new và thêm elements với insert. Trong Ví dụ 8-20, chúng ta đang theo dõi điểm số của hai đội có tên Blue và Yellow. Đội Blue bắt đầu với 10 điểm, và đội Yellow bắt đầu với 50 điểm.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);</code></pre>
</div>
<p><em>Ví dụ 8-20: Tạo một hash map mới và chèn một số keys và values</em></p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Chúng ta cần đầu tiên sử dụng HashMap từ phần collections của thư viện chuẩn. Trong ba collections phổ biến của chúng ta, cái này là ít được sử dụng nhất, vì vậy nó không được bao gồm trong các features được đưa vào scope tự động trong prelude. Hash maps cũng có ít support hơn từ thư viện chuẩn; ví dụ, không có macro được tích hợp để construct chúng.
</div>

<p>Giống như vectors, hash maps lưu trữ dữ liệu của chúng trên heap. HashMap này có keys kiểu String và values kiểu i32. Giống như vectors, hash maps là homogeneous: Tất cả các keys phải cùng kiểu, và tất cả các values phải cùng kiểu.</p>

<h3 class="task-heading">Truy Cập Values Trong Một Hash Map</h3>
<p>Chúng ta có thể lấy một value ra khỏi hash map bằng cách cung cấp key của nó cho method get, như trong Ví dụ 8-21.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let team_name = String::from("Blue");
let score = scores.get(&team_name).copied().unwrap_or(0);</code></pre>
</div>
<p><em>Ví dụ 8-21: Truy cập điểm số cho đội Blue được lưu trữ trong hash map</em></p>

<p>Ở đây, score sẽ có value được liên kết với đội Blue, và kết quả sẽ là 10. Method get trả về một Option<&V>; nếu không có value nào cho key đó trong hash map, get sẽ trả về None. Chương trình này xử lý Option bằng cách gọi copied để lấy một Option&lt;i32&gt; thay vì Option<&i32&gt;, sau đó unwrap_or để đặt score thành zero nếu scores không có entry cho key đó.</p>

<p>Chúng ta có thể iterate over mỗi cặp key-value trong một hash map tương tự như chúng ta làm với vectors, sử dụng một vòng for:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

for (key, value) in &scores {
    println!("{key}: {value}");
}</code></pre>
</div>

<p>Code này sẽ in mỗi cặp theo một thứ tự bất kỳ:</p>
<pre><code>Yellow: 50
Blue: 10</code></pre>

<h3 class="task-heading">Quản Lý Ownership Trong Hash Maps</h3>
<p>Đối với các types implement Copy trait, như i32, các values được copy vào hash map. Đối với các owned values như String, các values sẽ được moved và hash map sẽ là owner của các values đó, như trong Ví dụ 8-22.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

let field_name = String::from("Favorite color");
let field_value = String::from("Blue");

let mut map = HashMap::new();
map.insert(field_name, field_value);
// field_name and field_value are invalid at this point, try using them and
// see what compiler error you get!</code></pre>
</div>
<p><em>Ví dụ 8-22: Cho thấy rằng keys và values được sở hữu bởi hash map một khi chúng được chèn vào</em></p>

<p>Chúng ta không thể sử dụng các biến field_name và field_value sau khi chúng đã được moved vào hash map với lời gọi insert.</p>

<div class="cyber-alert info">
  <strong>Lưu ý về references:</strong> Nếu chúng ta chèn references đến values vào hash map, các values sẽ không được moved vào hash map. Các values mà references trỏ đến phải valid ít nhất cho đến khi hash map valid. Chúng ta sẽ nói thêm về những vấn đề này trong "Validating References with Lifetimes" ở Chương 10.
</div>

<h3 class="task-heading">Cập Nhật Một Hash Map</h3>
<p>Mặc dù số lượng cặp key và value có thể tăng, mỗi unique key chỉ có thể có một value được liên kết với nó tại một thời điểm (nhưng không ngược lại: Ví dụ, cả đội Blue và đội Yellow đều có thể có value 10 được lưu trong scores hash map).</p>

<p>Khi bạn muốn thay đổi dữ liệu trong một hash map, bạn phải quyết định cách xử lý trường hợp khi một key đã có một value được gán. Bạn có thể replace old value bằng new value, hoàn toàn bỏ qua old value. Bạn có thể giữ old value và bỏ qua new value, chỉ thêm new value nếu key chưa có value. Hoặc bạn có thể combine old value và new value. Hãy xem cách làm mỗi cái trong số này!</p>

<h4>Ghi Đè Một Value</h4>
<p>Nếu chúng ta chèn một key và một value vào một hash map và sau đó chèn cùng key đó với một value khác, value được liên kết với key đó sẽ được replace. Mặc dù code trong Ví dụ 8-23 gọi insert hai lần, hash map sẽ chỉ chứa một cặp key-value vì chúng ta đang chèn value cho key của đội Blue cả hai lần.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Blue"), 25);

println!("{scores:?}");</code></pre>
</div>
<p><em>Ví dụ 8-23: Replacing một value được lưu với một key cụ thể</em></p>

<p>Code này sẽ in {"Blue": 25}. Giá trị ban đầu của 10 đã bị ghi đè.</p>

<h4>Thêm Một Key Và Value Chỉ Khi Key Không Tồn Tại</h4>
<p>Thông thường để kiểm tra xem một key cụ thể đã tồn tại trong hash map với một value hay không và sau đó thực hiện các hành động sau: Nếu key tồn tại trong hash map, existing value nên giữ nguyên như nó vốn có; nếu key không tồn tại, hãy chèn nó và một value cho nó.</p>

<p>Hash maps có một API đặc biệt cho việc này gọi là entry nhận key bạn muốn kiểm tra làm tham số. Return value của method entry là một enum gọi là Entry đại diện cho một value có thể hoặc không thể tồn tại. Giả sử chúng ta muốn kiểm tra xem key cho đội Yellow có một value được liên kết với nó hay không. Nếu không, chúng ta muốn chèn value 50, và tương tự cho đội Blue. Sử dụng entry API, code trông như Ví dụ 8-24.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);

scores.entry(String::from("Yellow")).or_insert(50);
scores.entry(String::from("Blue")).or_insert(50);

println!("{scores:?}");</code></pre>
</div>
<p><em>Ví dụ 8-24: Sử dụng method entry để chỉ chèn nếu key chưa có value</em></p>

<p>Method or_insert trên Entry được định nghĩa để trả về một mutable reference đến value cho Entry key tương ứng nếu key đó tồn tại, và nếu không, nó chèn parameter làm new value cho key này và trả về một mutable reference đến new value. Kỹ thuật này sạch hơn nhiều so với việc tự viết logic và, ngoài ra, hoạt động tốt hơn với borrow checker.</p>

<p>Chạy code trong Ví dụ 8-24 sẽ in {"Yellow": 50, "Blue": 10}. Lời gọi entry đầu tiên sẽ chèn key cho đội Yellow với value 50 vì đội Yellow chưa có value. Lời gọi entry thứ hai sẽ không thay đổi hash map vì đội Blue đã có value 10.</p>

<h4>Cập Nhật Một Value Dựa Trên Value Cũ</h4>
<p>Một trường hợp sử dụng phổ biến khác cho hash maps là tra cứu value của một key và sau đó cập nhật nó dựa trên value cũ. Ví dụ, Ví dụ 8-25 cho thấy code đếm xem mỗi từ xuất hiện bao nhiêu lần trong một số text. Chúng ta sử dụng một hash map với các từ là keys và tăng value để theo dõi chúng ta đã thấy từ đó bao nhiêu lần. Nếu đây là lần đầu tiên chúng ta thấy một từ, chúng ta sẽ trước tiên chèn value 0.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::collections::HashMap;

let text = "hello world wonderful world";

let mut map = HashMap::new();

for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
}

println!("{map:?}");</code></pre>
</div>
<p><em>Ví dụ 8-25: Đếm số lần xuất hiện của các từ sử dụng hash map lưu trữ từ và số đếm</em></p>

<p>Code này sẽ print {"world": 2, "hello": 1, "wonderful": 1}. Bạn có thể thấy các cặp key-value giống nhau được in theo một thứ tự khác: Nhớ lại từ "Truy cập Values Trong Một Hash Map" rằng iterating over một hash map xảy ra theo một thứ tự bất kỳ.</p>

<p>Method split_whitespace trả về một iterator over các subslices, được phân tách bằng whitespace, của value trong text. Method or_insert trả về một mutable reference (&mut V) đến value cho key được chỉ định. Ở đây, chúng ta lưu mutable reference đó trong biến count, vì vậy để assign cho value đó, chúng ta phải đầu tiên dereference count bằng cách sử dụng dấu hoa thị (*). Mutable reference đi ra khỏi scope ở cuối vòng for, vì vậy tất cả các thay đổi này là an toàn và được cho phép bởi các quy tắc borrowing.</p>

<h3 class="task-heading">Hashing Functions</h3>
<p>Theo mặc định, HashMap sử dụng một hashing function gọi là SipHash có thể cung cấp khả năng chống lại các cuộc tấn công denial-of-service (DoS) liên quan đến hash tables. Đây không phải là thuật toán hashing nhanh nhất có sẵn, nhưng sự đánh đổi cho bảo mật tốt hơn đi kèm với việc giảm hiệu suất là đáng giá. Nếu bạn profile code của mình và thấy hashing function mặc định quá chậm cho mục đích của bạn, bạn có thể chuyển sang một function khác bằng cách chỉ định một hasher khác. Một hasher là một type implement BuildHasher trait. Chúng ta sẽ nói về traits và cách implement chúng trong Chương 10. Bạn không nhất thiết phải implement hasher của riêng mình từ đầu; crates.io có các thư viện được chia sẻ bởi những người dùng Rust khác cung cấp hashers implement nhiều thuật toán hashing phổ biến.</p>

<h3 class="task-heading">Tóm Tắt</h3>
<p>Vectors, strings, và hash maps sẽ cung cấp một lượng lớn chức năng cần thiết trong các chương trình khi bạn cần lưu trữ, truy cập, và sửa đổi dữ liệu. Dưới đây là một số bài tập bạn nên được trang bị để giải quyết:</p>

<ol>
  <li>Cho một danh sách các số nguyên, sử dụng một vector và trả về median (khi sắp xếp, giá trị ở vị trí giữa) và mode (giá trị xuất hiện nhiều nhất; một hash map sẽ hữu ích ở đây) của danh sách.</li>
  <li>Chuyển đổi strings sang Pig Latin. Phụ âm đầu tiên của mỗi từ được chuyển đến cuối từ và thêm "ay", vì vậy "first" trở thành "irst-fay". Các từ bắt đầu bằng nguyên âm có "hay" được thêm vào cuối thay vì ("apple" trở thành "apple-hay"). Hãy nhớ các chi tiết về UTF-8 encoding!</li>
  <li>Sử dụng một hash map và vectors, tạo một giao diện text để cho phép người dùng thêm tên nhân viên vào một phòng ban trong một công ty; ví dụ, "Add Sally to Engineering" hoặc "Add Amir to Sales". Sau đó, cho phép người dùng truy xuất danh sách tất cả mọi người trong một phòng ban hoặc tất cả mọi người trong công ty theo phòng ban, sắp xếp theo thứ tự bảng chữ cái.</li>
</ol>

<p>Tài liệu API của thư viện chuẩn mô tả các methods mà vectors, strings, và hash maps có sẽ hữu ích cho các bài tập này!</p>

<p>Chúng ta đang đi vào các chương trình phức tạp hơn trong đó các operations có thể thất bại, vì vậy đây là thời điểm hoàn hảo để thảo luận về xử lý lỗi. Chúng ta sẽ làm điều đó tiếp theo!</p>
`,
            defaultCode: `use std::collections::HashMap;

fn main() {
    // Đếm từ
    let text = "xin chào rust xin chào thế giới rust rust";

    let mut word_count = HashMap::new();
    for word in text.split_whitespace() {
        let count = word_count.entry(word).or_insert(0);
        *count += 1;
    }

    println!("Đếm từ:");
    for (word, count) in &word_count {
        println!("  '{word}': {count} lần");
    }

    // Bảng điểm
    let mut scores = HashMap::new();
    scores.insert("Alice", 95);
    scores.insert("Bob", 87);
    scores.insert("Charlie", 92);

    let target = "Bob";
    match scores.get(target) {
        Some(score) => println!("\\n{target} được {score} điểm"),
        None => println!("\\nKhông tìm thấy {target}"),
    }
}
`,
            expectedOutput: 'Đếm từ:\n  \'xin\': 2 lần\n  \'chào\': 2 lần\n  \'rust\': 3 lần\n  \'thế\': 1 lần\n  \'giới\': 1 lần\n\nBob được 87 điểm'
        };
