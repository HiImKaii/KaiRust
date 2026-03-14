import { Lesson } from '../../courses';

export const ch10_03: Lesson = {
            id: 'ch10-03',
            title: '10.3 Validating References with Lifetimes',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Lifetimes là một loại generic khác mà chúng ta đã sử dụng. Thay vì đảm bảo rằng một type có behavior mà chúng ta muốn, lifetimes đảm bảo rằng references hợp lệ chúng ta cần chúng.</p>

<p>Một chi tiết mà chúng ta đã không thảo luận trong phần "References and Borrowing" trong Chương 4 là mọi reference trong Rust đều có một lifetime, đó là scope mà reference đó hợp lệ. Hầu hết thời gian, lifetimes được implicit và inferred, giống như hầu hết thời gian, types được inferred. Chúng ta chỉ required để annotate types khi nhiều types là possible. Theo cách tương tự, chúng ta phải annotate lifetimes khi lifetimes của references có thể related theo một vài cách khác nhau. Rust yêu cầu chúng ta annotate các relationships sử dụng generic lifetime parameters để đảm bảo rằng các references thực tế được sử dụng tại runtime sẽ definitely valid.</p>

<p>Annotating lifetimes không phải là một concept mà hầu hết các ngôn ngữ lập trình khác có, vì vậy điều này sẽ cảm thấy unfamiliar. Mặc dù chúng ta sẽ không cover lifetimes toàn bộ trong chương này, chúng ta sẽ thảo luận về những cách phổ biến mà bạn có thể gặp lifetime syntax để bạn có thể quen với concept.</p>

<h3 class="task-heading">Dangling References</h3>
<p>Main aim của lifetimes là ngăn chặn dangling references, mà nếu chúng được phép tồn tại, sẽ khiến program reference data khác với data nó intended để reference. Consider program trong Listing 10-16, có một outer scope và một inner scope.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này không compile!
fn main() {
    let r;

    {
        let x = 5;
        r = &x;
    }

    println!("r: {r}");
}</code></pre>
</div>
<p><em>Listing 10-16: An attempt to use a reference whose value has gone out of scope</em></p>

<p>Outer scope khai báo một variable tên là r mà không có initial value, và inner scope khai báo một variable tên là x với initial value là 5. Bên trong inner scope, chúng ta attempt để set value của r như một reference đến x. Sau đó, inner scope kết thúc, và chúng ta attempt để print value trong r. Code này sẽ không compile, bởi vì value mà r đang refer đến đã đi out of scope trước khi chúng ta try để use nó. Đây là error message:</p>

<pre><code>error[E0597]: \`x\` does not live long enough
  --> src/main.rs:6:13
   |
5 |         let x = 5;
  |             - binding \`x\` declared here
6 |         r = &x;
  |             ^^ borrowed value does not live long enough
7 |     }
  |     - \`x\` dropped here while still borrowed
8 |
9 |     println!("r: {r}");
  |                   - borrow later used here</code></pre>

<p>Error message nói rằng variable x "does not live long enough". Lý do là vì x sẽ out of scope khi inner scope kết thúc ở line 7. Nhưng r vẫn valid cho outer scope; bởi vì scope của nó lớn hơn, chúng ta nói rằng nó "lives longer." Nếu Rust cho phép code này work, r sẽ referencing memory đã được deallocated khi x went out of scope, và bất cứ điều gì chúng ta try để làm với r sẽ không work đúng.</p>

<h3 class="task-heading">The Borrow Checker</h3>
<p>Rust compiler có một borrow checker so sánh các scopes để determine whether all borrows are valid. Listing 10-17 cho thấy code tương tự như Listing 10-16 nhưng với annotations showing lifetimes của các variables.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này không compile!
fn main() {
    let r;                // ---------+-- 'a
                          //          |
    {                     //          |
        let x = 5;        // -+-- 'b  |
        r = &x;           //  |       |
    }                     // -+       |
                          //          |
    println!("r: {r}");   //          |
}                         // ---------+</code></pre>
</div>
<p><em>Listing 10-17: Annotations of the lifetimes of r and x, named 'a and 'b, respectively</em></p>

<p>Ở đây, chúng ta đã annotate lifetime của r với 'a và lifetime của x với 'b. Như bạn có thể thấy, inner 'b block nhỏ hơn nhiều so với outer 'a lifetime block. Tại compile time, Rust compares size của hai lifetimes và thấy r có lifetime của 'a nhưng nó refer đến memory với lifetime của 'b. Program bị reject vì 'b ngắn hơn 'a: Subject của reference không sống lâu như reference.</p>

<p>Listing 10-18 fixes code để nó không có dangling reference và compile without any errors.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {r}");   //   |       |
                          // --+       |
}                         // ----------+</code></pre>
</div>
<p><em>Listing 10-18: A valid reference because the data has a longer lifetime than the reference</em></p>

<p>Ở đây, x có lifetime 'b, lớn hơn 'a trong trường hợp này. Điều này có nghĩa là r có thể reference x vì Rust biết rằng reference trong r sẽ always valid trong khi x valid.</p>

<h3 class="task-heading">Generic Lifetimes in Functions</h3>
<p>Chúng ta sẽ viết một function trả về string dài hơn trong hai string slices. Function này sẽ take hai string slices và return một string slice đơn. Sau khi chúng ta implement longest function, code trong Listing 10-19 nên in "The longest string is abcd".</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {result}");
}</code></pre>
</div>
<p><em>Listing 10-19: A main function that calls the longest function</em></p>

<p>Lưu ý rằng chúng ta muốn function take string slices, là references, hơn là strings, bởi vì chúng ta không muốn longest function take ownership của parameters.</p>

<p>Nếu chúng ta try để implement longest function như trong Listing 10-20, nó sẽ không compile.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này không compile!
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() { x } else { y }
}</code></pre>
</div>
<p><em>Listing 10-20: An implementation of the longest function</em></p>

<p>Thay vào đó, chúng ta get error như sau:</p>

<pre><code>error[E0106]: missing lifetime specifier
  --> src/main.rs:9:33
   |
9 | fn longest(x: &str, y: &str) -> &str {
  |               ----     ----     ^ expected named lifetime parameter
   |
  = help: this function's return type contains a borrowed value, but the signature does not say whether it is borrowed from \`x\` or \`y\`
help: consider introducing a named lifetime parameter
  |
9 | fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
  |           ++++     ++          ++          ++</code></pre>

<p>Help text reveals rằng return type cần một generic lifetime parameter vì Rust không thể tell whether reference being returned refers to x hay y. Thực tế, chúng ta cũng không biết, bởi vì if block trong function body returns một reference đến x và else block returns một reference đến y!</p>

<p>Để fix error này, chúng ta sẽ add generic lifetime parameters để define relationship giữa các references để borrow checker có thể perform analysis của nó.</p>

<h3 class="task-heading">Lifetime Annotation Syntax</h3>
<p>Lifetime annotations không thay đổi reference sống bao lâu. Thay vào đó, chúng describe relationships của lifetimes của nhiều references với nhau mà không affect lifetimes. Giống như functions có thể accept any type khi signature specifies một generic type parameter, functions có thể accept references với any lifetime bằng cách specifying một generic lifetime parameter.</p>

<p>Lifetime annotations có một cú pháp hơi unusual: Tên của lifetime parameters phải bắt đầu bằng một apostrophe (') và thường là all lowercase và rất ngắn, như generic types. Hầu hết mọi người sử dụng tên 'a cho lifetime annotation đầu tiên. Chúng ta đặt lifetime parameter annotations sau & của một reference, sử dụng một space để separate annotation khỏi reference's type.</p>

<p>Đây là một số ví dụ:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>&i32        // một reference
&'a i32     // một reference với explicit lifetime
&'a mut i32 // một mutable reference với explicit lifetime</code></pre>
</div>

<h3 class="task-heading">Trong Function Signatures</h3>
<p>Để sử dụng lifetime annotations trong function signatures, chúng ta cần declare generic lifetime parameters inside angle brackets giữa function name và parameter list, giống như chúng ta làm với generic type parameters.</p>

<p>Chúng ta muốn signature express constraint sau: Returned reference sẽ valid chừng nào cả hai parameters đều valid. Đây là relationship giữa lifetimes của parameters và return value. Chúng ta sẽ đặt tên lifetime là 'a và sau đó add nó vào mỗi reference, như trong Listing 10-21.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}</code></pre>
</div>
<p><em>Listing 10-21: The longest function definition specifying that all the references in the signature must have the same lifetime 'a</em></p>

<p>Function signature bây giờ nói với Rust rằng for some lifetime 'a, function takes hai parameters, cả hai đều là string slices sống at least as long as lifetime 'a. Function signature cũng nói với Rust rằng string slice returned từ function sẽ live at least as long as lifetime 'a.</p>

<p>Khi chúng ta pass concrete references vào longest, concrete lifetime được substituted cho 'a là phần của scope của x mà overlaps với scope của y. Nói cách khác, generic lifetime 'a sẽ get concrete lifetime bằng với nhỏ hơn của lifetimes của x và y.</p>

<h3 class="task-heading">Ví dụ với Different Concrete Lifetimes</h3>
<p>Listing 10-22 là một ví dụ straightforward.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let string1 = String::from("long string is long");

    {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("The longest string is {result}");
    }
}</code></pre>
</div>

<p>Trong ví dụ này, string1 valid cho đến end của outer scope, string2 valid cho đến end của inner scope, và result references something valid cho đến end của inner scope. Run code này và bạn sẽ thấy nó compile và print.</p>

<p>Listing 10-23 sẽ không compile vì result được sử dụng sau khi string2 đã out of scope.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// Code này không compile!
fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {result}");
}</code></pre>
</div>
<p><em>Listing 10-23: Attempting to use result after string2 has gone out of scope</em></p>

<h3 class="task-heading">Lifetime Annotations trong Struct Definitions</h3>
<p>Chúng ta có thể define structs để hold references, nhưng trong trường hợp đó, chúng ta cần add một lifetime annotation trên mỗi reference trong struct's definition. Listing 10-24 có một struct tên là ImportantExcerpt holds một string slice.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.').next().unwrap();
    let i = ImportantExcerpt {
        part: first_sentence,
    };
}</code></pre>
</div>
<p><em>Listing 10-24: A struct that holds a reference, requiring a lifetime annotation</em></p>

<p>Struct này có một field part hold một string slice. Instance của ImportantExcerpt không thể outlive reference nó hold trong part field.</p>

<h3 class="task-heading">Lifetime Elision</h3>
<p>Chúng ta đã học rằng mỗi reference có một lifetime và chúng ta cần specify lifetime parameters cho functions hoặc structs sử dụng references. Tuy nhiên, chúng ta đã có một function trong Listing 4-9 compile without lifetime annotations.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }

    &s[..]
}</code></pre>
</div>
<p><em>Listing 10-25: A function that compiled without lifetime annotations</em></p>

<p>Lý do function này compile without lifetime annotations là historical: Trong early versions (pre-1.0) của Rust, code này sẽ không compile, bởi vì mỗi reference cần một explicit lifetime.</p>

<p>Patterns được program vào Rust's analysis của references được gọi là lifetime elision rules. Đây không phải là rules cho programmers follow; chúng là một set của particular cases mà compiler sẽ consider.</p>

<p>Compiler sử dụng ba rules để figure out lifetimes của references khi không có explicit annotations:</p>

<ol>
  <li><strong>Rule 1:</strong> Compiler assigns một lifetime parameter cho mỗi parameter là một reference.</li>
  <li><strong>Rule 2:</strong> Nếu có đúng một input lifetime parameter, lifetime đó được assign cho tất cả output lifetime parameters.</li>
  <li><strong>Rule 3:</strong> Nếu có nhiều input lifetime parameters, nhưng một trong chúng là &self hoặc &mut self (vì đây là một method), lifetime của self được assign cho tất cả output lifetime parameters.</li>
</ol>

<h3 class="task-heading">In Method Definitions</h3>
<p>Khi chúng ta implement methods trên một struct với lifetimes, chúng ta sử dụng cú pháp tương tự như generic type parameters. Lifetime names cho struct fields luôn cần được declare sau impl keyword.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}</code></pre>
</div>

<p>Đây là một ví dụ where third lifetime elision rule applies:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {announcement}");
        self.part
    }
}</code></pre>
</div>

<h3 class="task-heading">The Static Lifetime</h3>
<p>Một special lifetime chúng ta cần thảo luận là 'static, denotes rằng affected reference có thể live cho entire duration của program. Tất cả string literals có 'static lifetime:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let s: &'static str = "I have a static lifetime.";</code></pre>
</div>

<p>Text của string này được stored directly trong program's binary, luôn available.</p>

<div class="cyber-alert warning">
  <strong>Lưu ý:</strong> Trước khi specify 'static làm lifetime cho một reference, hãy think about whether reference thực sự lives entire lifetime của program. Hầu hết thời gian, error message suggesting 'static lifetime results from attempting create một dangling reference hoặc mismatch của available lifetimes.
</div>

<h3 class="task-heading">Generic Type Parameters, Trait Bounds, và Lifetimes</h3>
<p>Chúng ta có thể specify generic type parameters, trait bounds, và lifetimes all trong một function!</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(
    x: &'a str,
    y: &'a str,
    ann: T,
) -> &'a str
where
    T: Display,
{
    println!("Announcement! {ann}");
    if x.len() > y.len() { x } else { y }
}</code></pre>
</div>

<p>Function này là longest function với một extra parameter named ann của generic type T, which can be filled in by any type that implements Display trait.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Lifetimes:</strong>
  <ul>
    <li><strong>Dangling References:</strong> Lifetime ngăn chặn references đến data đã bị drop</li>
    <li><strong>Borrow Checker:</strong> So sánh các scopes để validate borrows</li>
    <li><strong>Lifetime Annotations:</strong> &lt;'a&gt; mô tả mối quan hệ giữa references</li>
    <li><strong>Syntax:</strong> fn longest&lt;'a&gt;(x: &amp;'a str, y: &amp;'a str) -> &amp;'a str</li>
    <li><strong>Struct với references:</strong> struct ImportantExcerpt&lt;'a&gt;</li>
    <li><strong>Elision rules:</strong> Compiler tự suy luận trong hầu hết trường hợp</li>
    <li><strong>Static lifetime:</strong> 'static sống suốt chương trình</li>
    <li><strong>Kết hợp:</strong> Có thể dùng với generic types và trait bounds</li>
  </ul>
</div>
`,
            defaultCode: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

fn main() {
    let string1 = String::from("chuỗi dài hơn");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
        println!("Chuỗi dài hơn: {result}");
    }

    // first_word — lifetime elision
    let sentence = "Hello beautiful world";
    let word = first_word(sentence);
    println!("Từ đầu: {word}");

    // Static lifetime
    let s: &'static str = "Tôi tồn tại suốt chương trình";
    println!("{s}");
}
`,
            expectedOutput: 'Chuỗi dài hơn: chuỗi dài hơn\nTừ đầu: Hello\nTôi tồn tại suốt chương trình'
        };
