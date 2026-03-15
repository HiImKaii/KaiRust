import { Lesson } from '../../courses';

export const keywords: Lesson = {
            id: 'appendix-a',
            title: 'Appendix A: Keywords',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Dưới đây là danh sách các keywords được reserved cho việc sử dụng hiện tại hoặc tương lai bởi ngôn ngữ Rust. Do đó, chúng không thể được sử dụng làm identifiers (ngoại trừ như raw identifiers, như chúng ta thảo luận trong phần "Raw Identifiers"). Identifiers là tên của functions, variables, parameters, struct fields, modules, crates, constants, macros, static values, attributes, types, traits, hoặc lifetimes.</p>

<h3 class="task-heading">Các Keywords đang được sử dụng</h3>
<p>Dưới đây là danh sách các keywords đang được sử dụng, với chức năng của chúng được mô tả.</p>

<ul>
  <li><strong>as</strong>: Thực hiện primitive casting, disambiguate trait cụ thể chứa một item, hoặc đổi tên items trong use statements.</li>
  <li><strong>async</strong>: Trả về một Future thay vì blocking thread hiện tại.</li>
  <li><strong>await</strong>: Tạm dừng thực thi cho đến khi kết quả của một Future sẵn sàng.</li>
  <li><strong>break</strong>: Thoát khỏi loop ngay lập tức.</li>
  <li><strong>const</strong>: Định nghĩa constant items hoặc constant raw pointers.</li>
  <li><strong>continue</strong>: Tiếp tục đến iteration tiếp theo của loop.</li>
  <li><strong>crate</strong>: Trong một module path, refers đến crate root.</li>
  <li><strong>dyn</strong>: Dynamic dispatch đến một trait object.</li>
  <li><strong>else</strong>: Fallback cho if và if let control flow constructs.</li>
  <li><strong>enum</strong>: Định nghĩa một enumeration.</li>
  <li><strong>extern</strong>: Link một external function hoặc variable.</li>
  <li><strong>false</strong>: Boolean false literal.</li>
  <li><strong>fn</strong>: Định nghĩa một function hoặc function pointer type.</li>
  <li><strong>for</strong>: Loop over items từ một iterator, implement một trait, hoặc specify một higher ranked lifetime.</li>
  <li><strong>if</strong>: Branch dựa trên kết quả của một conditional expression.</li>
  <li><strong>impl</strong>: Implement inherent hoặc trait functionality.</li>
  <li><strong>in</strong>: Một phần của for loop syntax.</li>
  <li><strong>let</strong>: Bind một variable.</li>
  <li><strong>loop</strong>: Loop vô điều kiện.</li>
  <li><strong>match</strong>: Match một giá trị với patterns.</li>
  <li><strong>mod</strong>: Định nghĩa một module.</li>
  <li><strong>move</strong>: Làm cho closure take ownership của tất cả các captures của nó.</li>
  <li><strong>mut</strong>: Biểu thị mutability trong references, raw pointers, hoặc pattern bindings.</li>
  <li><strong>pub</strong>: Biểu thị public visibility trong struct fields, impl blocks, hoặc modules.</li>
  <li><strong>ref</strong>: Bind bằng reference.</li>
  <li><strong>return</strong>: Return từ function.</li>
  <li><strong>Self</strong>: Một type alias cho type mà chúng ta đang định nghĩa hoặc implement.</li>
  <li><strong>self</strong>: Method subject hoặc current module.</li>
  <li><strong>static</strong>: Global variable hoặc lifetime kéo dài toàn bộ thời gian thực thi chương trình.</li>
  <li><strong>struct</strong>: Định nghĩa một structure.</li>
  <li><strong>super</strong>: Parent module của current module.</li>
  <li><strong>trait</strong>: Định nghĩa một trait.</li>
  <li><strong>true</strong>: Boolean true literal.</li>
  <li><strong>type</strong>: Định nghĩa một type alias hoặc associated type.</li>
  <li><strong>union</strong>: Định nghĩa một union; là một keyword chỉ khi được sử dụng trong một union declaration.</li>
  <li><strong>unsafe</strong>: Biểu thị unsafe code, functions, traits, hoặc implementations.</li>
  <li><strong>use</strong>: Đưa symbols vào scope.</li>
  <li><strong>where</strong>: Biểu thị clauses constrain một type.</li>
  <li><strong>while</strong>: Loop có điều kiện dựa trên kết quả của một expression.</li>
</ul>

<h3 class="task-heading">Các Keywords Reserved cho Tương lai</h3>
<p>Các keywords dưới đây chưa có bất kỳ functionality nào nhưng được Rust reserve cho việc sử dụng tiềm năng trong tương lai:</p>

<ul>
  <li>abstract</li>
  <li>become</li>
  <li>box</li>
  <li>do</li>
  <li>final</li>
  <li>gen</li>
  <li>macro</li>
  <li>override</li>
  <li>priv</li>
  <li>try</li>
  <li>typeof</li>
  <li>unsized</li>
  <li>virtual</li>
  <li>yield</li>
</ul>

<h3 class="task-heading">Raw Identifiers</h3>
<p>Raw identifiers là syntax cho phép bạn sử dụng keywords ở những nơi chúng thường không được phép. Bạn sử dụng một raw identifier bằng cách prefix một keyword với r#.</p>

<p>Ví dụ, match là một keyword. Nếu bạn cố gắng compile function sau sử dụng match làm tên của nó:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn match(needle: &str, haystack: &str) -> bool {
    haystack.contains(needle)
}</code></pre>
</div>

<p>bạn sẽ nhận được lỗi này:</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>error: expected identifier, found keyword \`match\`
 --> src/main.rs:4:4
  |
4 | fn match(needle: &str, haystack: &str) -> bool {
  |    ^^^^^ expected identifier, found keyword</code></pre>
</div>

<p>Lỗi cho thấy bạn không thể sử dụng keyword match làm function identifier. Để sử dụng match làm tên function, bạn cần sử dụng raw identifier syntax, như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn r#match(needle: &str, haystack: &str) -> bool {
    haystack.contains(needle)
}

fn main() {
    assert!(r#match("foo", "foobar"));
}</code></pre>
</div>

<p>Code này sẽ compile mà không có bất kỳ lỗi nào. Chú ý tiền tố r# trên tên function trong định nghĩa cũng như nơi function được gọi trong main.</p>

<p>Raw identifiers cho phép bạn sử dụng bất kỳ từ nào bạn chọn làm identifier, ngay cả khi từ đó là một reserved keyword. Điều này cung cấp cho chúng ta nhiều tự do hơn để chọn tên identifier, cũng như cho phép chúng ta tích hợp với các chương trình được viết bằng ngôn ngữ mà những từ đó không phải là keywords.</p>

<p>Ngoài ra, raw identifiers cho phép bạn sử dụng các thư viện được viết bằng một Rust edition khác với edition mà crate của bạn sử dụng. Ví dụ, try không phải là keyword trong edition 2015 nhưng là trong các edition 2018, 2021, và 2024. Nếu bạn phụ thuộc vào một thư viện được viết bằng edition 2015 và có một function try, bạn sẽ cần sử dụng raw identifier syntax, r#try trong trường hợp này, để gọi function đó từ code của bạn trên các edition sau.</p>
`,
            defaultCode: `// Raw Identifiers Example
// match là một keyword, nên ta cần dùng r#match

fn r#match(needle: &str, haystack: &str) -> bool {
    haystack.contains(needle)
}

fn main() {
    // Sử dụng function với raw identifier
    assert!(r#match("foo", "foobar"));
    assert!(!r#match("baz", "foobar"));

    println!("Raw identifier example works!");
}
`,
            expectedOutput: `Raw identifier example works!`
        };
