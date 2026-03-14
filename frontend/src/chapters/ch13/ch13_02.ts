import { Lesson } from '../../courses';

export const ch13_02: Lesson = {
            id: 'ch13-02',
            title: '13.2 Iterators: Lặp qua Collection',
            duration: '35 phút',
            type: 'theory',
            content: `
<p>Iterator pattern cho phép bạn thực hiện một số tác vụ trên một chuỗi các phần tử lần lượt. Iterator chịu trách nhiệm về logic của việc lặp qua từng phần tử và xác định khi nào chuỗi đã kết thúc. Khi bạn sử dụng iterators, bạn không cần phải tự implement logic đó.</p>

<p>Trong Rust, iterators là lazy, có nghĩa là chúng không có hiệu lực cho đến khi bạn gọi các phương thức tiêu thụ iterator để sử dụng hết chúng. Ví dụ, code trong Listing 13-10 tạo một iterator over các phần tử trong vector v1 bằng cách gọi phương thức iter được định nghĩa trên Vec<T>. Code này tự nó không làm gì hữu ích cả.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v1 = vec![1, 2, 3];

let v1_iter = v1.iter();</code></pre>
</div>
<p><em>Listing 13-10: Tạo một iterator</em></p>

<p>Iterator được lưu trong biến v1_iter. Sau khi tạo iterator, chúng ta có thể sử dụng nó theo nhiều cách khác nhau. Trong Listing 3-5, chúng ta đã lặp qua một mảng sử dụng vòng lặp for để thực thi một số code trên mỗi phần tử. Bên dưới, điều này đã ngầm tạo và sau đó tiêu thụ một iterator, nhưng chúng ta đã bỏ qua việc chính xác điều đó hoạt động như thế nào cho đến bây giờ.</p>

<p>Trong ví dụ trong Listing 13-11, chúng ta tách biệt việc tạo iterator khỏi việc sử dụng iterator trong vòng lặp for. Khi vòng lặp for được gọi sử dụng iterator trong v1_iter, mỗi phần tử trong iterator được sử dụng trong một lần lặp của vòng lặp, in ra mỗi giá trị.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v1 = vec![1, 2, 3];

let v1_iter = v1.iter();

for val in v1_iter {
    println!("Got: {val}");
}</code></pre>
</div>
<p><em>Listing 13-11: Sử dụng iterator trong vòng lặp for</em></p>

<p>Trong các ngôn ngữ không có iterators được cung cấp bởi standard library, bạn có thể phải viết cùng chức năng này bằng cách bắt đầu một biến tại index 0, sử dụng biến đó để index vào vector để lấy giá trị, và tăng giá trị biến trong một vòng lặp cho đến khi nó đạt đến tổng số phần tử trong vector.</p>

<p>Iterators xử lý tất cả logic đó cho bạn, giảm bớt code lặp đi lặp lại mà bạn có thể mắc lỗi. Iterators cho bạn nhiều linh hoạt hơn để sử dụng cùng logic với nhiều loại chuỗi khác nhau, không chỉ các cấu trúc dữ liệu có thể index được như vectors. Hãy xem xét cách iterators làm điều đó.</p>

<h3 class="task-heading">Trait Iterator và Phương thức next</h3>
<p>Tất cả các iterators đều implement một trait tên là Iterator được định nghĩa trong standard library. Định nghĩa của trait trông như sau:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option&lt;Self::Item&gt;;

    // các phương thức với các implementation mặc định được bỏ qua
}</code></pre>
</div>

<p>Lưu ý rằng định nghĩa này sử dụng một số cú pháp mới: type Item và Self::Item, là các định nghĩa cho một associated type với trait này. Chúng ta sẽ nói sâu về associated types trong Chương 20. Bây giờ, tất cả những gì bạn cần biết là code này nói rằng việc implement trait Iterator yêu cầu bạn cũng phải định nghĩa một kiểu Item, và kiểu Item này được sử dụng trong kiểu trả về của phương thức next. Nói cách khác, kiểu Item sẽ là kiểu được trả về từ iterator.</p>

<p>Trait Iterator chỉ yêu cầu implementors định nghĩa một phương thức: phương thức next, trả về một phần tử của iterator tại một thời điểm, được bọc trong Some, và khi lặp kết thúc, trả về None.</p>

<p>Chúng ta có thể gọi phương thức next trực tiếp trên iterators; Listing 13-12 minh họa các giá trị được trả về từ các lần gọi next liên tiếp trên iterator được tạo từ vector.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[test]
fn iterator_demonstration() {
    let v1 = vec![1, 2, 3];

    let mut v1_iter = v1.iter();

    assert_eq!(v1_iter.next(), Some(&1));
    assert_eq!(v1_iter.next(), Some(&2));
    assert_eq!(v1_iter.next(), Some(&3));
    assert_eq!(v1_iter.next(), None);
}</code></pre>
</div>
<p><em>Listing 13-12: Gọi phương thức next trên một iterator</em></p>

<p>Lưu ý rằng chúng ta cần làm cho v1_iter mutable: Gọi phương thức next trên một iterator thay đổi trạng thái nội bộ mà iterator sử dụng để theo dõi vị trí của nó trong chuỗi. Nói cách khác, code này tiêu thụ, hoặc sử dụng hết, iterator. Mỗi lần gọi next "ăn" một phần tử khỏi iterator. Chúng ta không cần làm cho v1_iter mutable khi sử dụng vòng lặp for, vì vòng lặp lấy ownership của v1_iter và làm cho nó mutable ở phía sau.</p>

<p>Cũng lưu ý rằng các giá trị chúng ta nhận được từ các lần gọi next là các tham chiếu bất biến đến các giá trị trong vector. Phương thức iter tạo ra một iterator over các tham chiếu bất biến. Nếu chúng ta muốn tạo một iterator sở hữu v1 và trả về các giá trị owned, chúng ta có thể gọi into_iter thay vì iter. Tương tự, nếu chúng ta muốn lặp qua các tham chiếu mutable, chúng ta có thể gọi iter_mut thay vì iter.</p>

<h3 class="task-heading">Các Phương thức Tiêu thụ Iterator</h3>
<p>Trait Iterator có một số phương thức khác nhau với các implementation mặc định được cung cấp bởi standard library; bạn có thể tìm hiểu về các phương thức này bằng cách xem trong tài liệu API standard library cho trait Iterator. Một số phương thức trong số này gọi phương thức next trong định nghĩa của chúng, đó là lý do tại sao bạn phải implement phương thức next khi implement trait Iterator.</p>

<p>Các phương thức gọi next được gọi là các consuming adapters vì việc gọi chúng tiêu thụ iterator. Một ví dụ là phương thức sum, lấy ownership của iterator và lặp qua các phần tử bằng cách gọi next nhiều lần, do đó tiêu thụ iterator. Khi lặp qua, nó cộng mỗi phần tử vào một tổng tích lũy và trả về tổng khi lặp hoàn tất. Listing 13-13 có một test minh họa việc sử dụng phương thức sum.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[test]
fn iterator_sum() {
    let v1 = vec![1, 2, 3];

    let v1_iter = v1.iter();

    let total: i32 = v1_iter.sum();

    assert_eq!(total, 6);
}</code></pre>
</div>
<p><em>Listing 13-13: Gọi phương thức sum để lấy tổng của tất cả phần tử trong iterator</em></p>

<p>Chúng ta không được phép sử dụng v1_iter sau khi gọi sum, vì sum lấy ownership của iterator mà chúng ta gọi nó trên đó.</p>

<h3 class="task-heading">Các Phương thức Tạo Iterator Khác</h3>
<p>Iterator adapters là các phương thức được định nghĩa trên trait Iterator không tiêu thụ iterator. Thay vào đó, chúng tạo ra các iterators khác bằng cách thay đổi một số khía cạnh của iterator gốc.</p>

<p>Listing 13-14 minh họa ví dụ về việc gọi phương thức iterator adapter map, nhận một closure để gọi trên mỗi phần tử khi các phần tử được lặp qua. Phương thức map trả về một iterator mới tạo ra các phần tử đã được sửa đổi. Closure ở đây tạo một iterator mới trong đó mỗi phần tử từ vector sẽ được tăng thêm 1.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>[Code này không tạo ra hành vi mong muốn.]
let v1: Vec&lt;i32&gt; = vec![1, 2, 3];

v1.iter().map(|x| x + 1);</code></pre>
</div>
<p><em>Listing 13-14: Gọi iterator adapter map để tạo một iterator mới</em></p>

<p>Tuy nhiên, code này tạo ra một warning:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling iterators v0.1.0 (file:///projects/iterators)
warning: unused \`Map\` that must be used
 --> src/main.rs:4:5
  |
4 |     v1.iter().map(|x| x + 1);
  |     ^^^^^^^^^^^^^^^^^^^^^^^^
  |
  = note: iterators are lazy and do nothing unless consumed
  = note: \`#[warn(unused_must_use)]\` on by default
help: use \`let _ = ...\` to ignore the resulting value
  |
4 |     let _ = v1.iter().map(|x| x + 1);
  |     +++++++

warning: \`iterators\` (bin "iterators") generated 1 warning
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.47s
     Running \`target/debug/iterators\`</code></pre>
</div>

<p>Code trong Listing 13-14 không làm gì cả; closure chúng ta đã chỉ định không bao giờ được gọi. Warning nhắc nhở chúng ta tại sao: Iterator adapters là lazy, và chúng ta cần tiêu thụ iterator ở đây.</p>

<p>Để sửa warning này và tiêu thụ iterator, chúng ta sẽ sử dụng phương thức collect, mà chúng ta đã sử dụng với env::args trong Listing 12-1. Phương thức này tiêu thụ iterator và thu thập các giá trị kết quả vào một kiểu dữ liệu collection.</p>

<p>Trong Listing 13-15, chúng ta thu thập các kết quả của việc lặp qua iterator được trả về từ lệnh gọi map vào một vector. Vector này sẽ chứa mỗi phần tử từ vector gốc, được tăng thêm 1.</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let v1: Vec&lt;i32&gt; = vec![1, 2, 3];

let v2: Vec&lt;_&gt; = v1.iter().map(|x| x + 1).collect();

assert_eq!(v2, vec![2, 3, 4]);</code></pre>
</div>
<p><em>Listing 13-15: Gọi phương thức map để tạo một iterator mới, và sau đó gọi phương thức collect để tiêu thụ iterator mới và tạo một vector</em></p>

<p>Bởi vì map nhận một closure, chúng ta có thể chỉ định bất kỳ operation nào chúng ta muốn thực hiện trên mỗi phần tử. Đây là một ví dụ tuyệt vời về cách closures cho phép bạn tùy chỉnh một số hành vi trong khi tái sử dụng hành vi lặp mà trait Iterator cung cấp.</p>

<p>Bạn có thể chain nhiều lời gọi đến iterator adapters để thực hiện các hành động phức tạp theo cách dễ đọc. Nhưng bởi vì tất cả iterators là lazy, bạn phải gọi một trong các consuming adapter methods để lấy kết quả từ các lời gọi đến iterator adapters.</p>

<h3 class="task-heading">Closures Capture Môi trường</h3>
<p>Nhiều iterator adapters nhận closures như arguments, và thông thường các closures chúng ta sẽ chỉ định như arguments cho iterator adapters sẽ là các closures capture môi trường của chúng.</p>

<p>Cho ví dụ này, chúng ta sẽ sử dụng phương thức filter nhận một closure. Closure nhận một phần tử từ iterator và trả về một bool. Nếu closure trả về true, giá trị sẽ được bao gồm trong iteration được tạo bởi filter. Nếu closure trả về false, giá trị sẽ không được bao gồm.</p>

<p>Trong Listing 13-16, chúng ta sử dụng filter với một closure capture biến shoe_size từ môi trường của nó để lặp qua một collection các instances của struct Shoe. Nó sẽ chỉ trả về những đôi giày có kích thước được chỉ định.</p>

<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(PartialEq, Debug)]
struct Shoe {
    size: u32,
    style: String,
}

fn shoes_in_size(shoes: Vec&lt;Shoe&gt;, shoe_size: u32) -> Vec&lt;Shoe&gt; {
    shoes.into_iter().filter(|s| s.size == shoe_size).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn filters_by_size() {
        let shoes = vec![
            Shoe {
                size: 10,
                style: String::from("sneaker"),
            },
            Shoe {
                size: 13,
                style: String::from("sandal"),
            },
            Shoe {
                size: 10,
                style: String::from("boot"),
            },
        ];

        let in_my_size = shoes_in_size(shoes, 10);

        assert_eq!(
            in_my_size,
            vec![
                Shoe {
                    size: 10,
                    style: String::from("sneaker")
                },
                Shoe {
                    size: 10,
                    style: String::from("boot")
                },
            ]
        );
    }
}</code></pre>
</div>
<p><em>Listing 13-16: Sử dụng phương thức filter với một closure capture shoe_size</em></p>

<p>Hàm shoes_in_size lấy ownership của một vector giày và một kích thước giày làm parameters. Nó trả về một vector chỉ chứa các giày có kích thước được chỉ định.</p>

<p>Trong body của shoes_in_size, chúng ta gọi into_iter để tạo một iterator sở hữu vector. Sau đó, chúng ta gọi filter để adapt iterator đó thành một iterator mới chỉ chứa các phần tử mà closure trả về true.</p>

<p>Closure capture tham số shoe_size từ môi trường và so sánh giá trị đó với kích thước của mỗi đôi giày, chỉ giữ lại các giày có kích thước được chỉ định. Cuối cùng, gọi collect gather các giá trị được trả về bởi adapted iterator thành một vector được trả về bởi hàm.</p>

<p>Test cho thấy rằng khi chúng ta gọi shoes_in_size, chúng ta chỉ nhận lại các giày có cùng kích thước với giá trị chúng ta đã chỉ định.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Iterators:</strong>
  <ul>
    <li><strong>iter()</strong> - Tạo iterator trả về tham chiếu bất biến (&T)</li>
    <li><strong>into_iter()</strong> - Tạo iterator sở hữu giá trị (T)</li>
    <li><strong>iter_mut()</strong> - Tạo iterator trả về tham chiếu mutable (&mut T)</li>
    <li><strong>map()</strong> - Biến đổi mỗi phần tử (iterator adapter)</li>
    <li><strong>filter()</strong> - Lọc phần tử theo điều kiện (iterator adapter)</li>
    <li><strong>collect()</strong> - Thu thập vào collection (consuming adapter)</li>
    <li><strong>sum()</strong> - Tính tổng (consuming adapter)</li>
    <li><strong>enumerate()</strong> - Thêm index</li>
    <li><strong>zip()</strong> - Kết hợp hai iterators</li>
    <li><strong>take(), skip()</strong> - Lấy/bỏ qua n phần tử đầu</li>
    <li><strong>Lazy</strong> - Iterators không thực thi cho đến khi tiêu thụ</li>
  </ul>
</div>
`,
            defaultCode: `fn main() {
    // Iterator chain
    let words = vec!["hello", "world", "rust", "is", "awesome"];

    let result: String = words.iter()
        .map(|w| {
            let mut chars = w.chars();
            match chars.next() {
                None => String::new(),
                Some(c) => c.to_uppercase().to_string() + chars.as_str(),
            }
        })
        .collect::<Vec<String>>()
        .join(" ");

    println!("Capitalize: {result}");

    // enumerate
    println!("\\nDanh sách:");
    for (i, word) in words.iter().enumerate() {
        println!("  {}: {word}", i + 1);
    }

    // Tính toán với ranges
    let fib_sum: i32 = (1..=10)
        .filter(|x| x % 2 != 0)
        .map(|x| x * x)
        .sum();
    println!("\\nTổng bình phương số lẻ (1-10): {fib_sum}");
}
`,
            expectedOutput: 'Capitalize: Hello World Rust Is Awesome\n\nDanh sách:\n  1: hello\n  2: world\n  3: rust\n  4: is\n  5: awesome\n\nTổng bình phương số lẻ (1-10): 165'
        };
