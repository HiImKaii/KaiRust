import { Lesson } from '../../courses';

export const ch12_04: Lesson = {
            id: 'ch12-04',
            title: '12.4 Thêm chức năng với Test-Driven Development',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Bây giờ chúng ta có search logic trong src/lib.rs tách biệt khỏi main function, viết tests cho core functionality của code dễ dàng hơn nhiều. Chúng ta có thể gọi functions trực tiếp với various arguments và check return values mà không phải call binary từ command line.</p>

<p>Trong phần này, chúng ta sẽ thêm searching logic vào program minigrep sử dụng test-driven development (TDD) process với các bước sau:</p>

<ol>
  <li>Viết một test fail và chạy nó để đảm bảo nó fail với lý do bạn mong đợi.</li>
  <li>Viết hoặc modify đủ code để làm cho test mới pass.</li>
  <li>Refactor code bạn vừa thêm hoặc thay đổi và đảm bảo tests tiếp tục pass.</li>
  <li>Lặp lại từ bước 1!</li>
</ol>

<p>Mặc dù đây chỉ là một trong nhiều cách để viết software, TDD có thể help drive code design. Viết test trước khi viết code làm test pass giúp maintain high test coverage xuyên suốt process.</p>

<p>Chúng ta sẽ test-drive implementation của functionality thực sự sẽ làm việc tìm kiếm cho query string trong file contents và produce một list of lines match với query. Chúng ta sẽ thêm functionality này trong một function gọi là search.</p>

<h3 class="task-heading">Viết một Failing Test</h3>
<p>Trong src/lib.rs, chúng ta sẽ thêm một tests module với một test function, như chúng ta đã làm trong Chương 11. Test function specifies behavior mà chúng ta muốn search function có: Nó sẽ lấy một query và text để search, và nó sẽ trả về chỉ các lines từ text chứa query. Listing 12-15 cho thấy test này.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// --snip--

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn one_result() {
        let query = "duct";
        let contents = "\\
Rust:
safe, fast, productive.
Pick three.";

        assert_eq!(vec!["safe, fast, productive."], search(query, contents));
    }
}</code></pre>
</div>
<p><em>Listing 12-15: Creating a failing test for the search function for the functionality we wish we had</em></p>

<p>Test này tìm kiếm chuỗi "duct". Text chúng ta đang search là ba dòng, chỉ một trong số đó chứa "duct" (lưu ý rằng dấu backslash sau opening double quote tells Rust không đặt newline character ở đầu của contents của string literal này). Chúng ta assert rằng giá trị được trả về từ search function chỉ chứa dòng chúng ta mong đợi.</p>

<p>Nếu chúng ta chạy test này, nó sẽ fail hiện tại vì unimplemented! macro panics với message "not implemented". Theo TDD principles, chúng ta sẽ thêm một small step của chỉ thêm đủ code để test không panic khi gọi function bằng cách define search function luôn trả về một empty vector, như được hiển thị trong Listing 12-16. Sau đó, test nên compile và fail vì empty vector không match một vector chứa dòng "safe, fast, productive.".</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn search&lt;'a&gt;(query: &str, contents: &amp;'a str) -> Vec&lt;&amp;'a str&gt; {
    vec![]
}</code></pre>
</div>
<p><em>Listing 12-16: Defining just enough of the search function so that calling it won't panic</em></p>

<p>Bây giờ hãy thảo luận tại sao chúng ta cần define một explicit lifetime 'a trong signature của search và sử dụng lifetime đó với contents argument và return value. Nhớ lại trong Chương 10 rằng lifetime parameters specify which argument lifetime được connected đến lifetime của return value. Trong trường hợp này, chúng ta indicate rằng returned vector nên chứa string slices tham chiếu đến slices của argument contents (thay vì argument query).</p>

<p>Nói cách khác, chúng ta tell Rust rằng data được trả về bởi search function sẽ live bao lâu data được truyền vào search function trong contents argument. Điều này quan trọng! Data được referenced bởi một slice cần valid để reference được valid; nếu compiler assume chúng ta đang tạo string slices của query thay vì contents, nó sẽ làm safety checking của nó không đúng.</p>

<p>Nếu chúng ta quên lifetime annotations và cố compile function này, chúng ta sẽ get error này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo build
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
error[E0106]: missing lifetime specifier
 --> src/lib.rs:1:51
  |
1 | pub fn search(query: &str, contents: &str) -> Vec<&str> {
  |                      ----            ----         ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but the signature does not say whether it is borrowed from \`query\` or \`contents\`
help: consider introducing a named lifetime parameter
  |
1 | pub fn search&lt;'a&gt;(query: &'a str, contents: &'a str) -> Vec<&'a str> {
  |              ++++         ++                 ++              ++

For more information about this error, try \`rustc --explain E0106\`.
error: could not compile \`minigrep\` (lib) due to 1 previous error</code></pre>
</div>

<p>Rust không biết parameter nào trong hai cái chúng ta cần cho output, vì vậy chúng ta cần tell nó explicitly. Lưu ý rằng help text suggests specifying cùng lifetime parameter cho tất cả parameters và output type, điều đó không đúng! Vì contents là parameter chứa tất cả text của chúng ta và chúng ta muốn return các parts của text đó match, chúng ta biết contents là parameter duy nhất nên được connected đến return value sử dụng lifetime syntax.</p>

<p>Các ngôn ngữ lập trình khác không yêu cầu bạn connect arguments với return values trong signature, nhưng thực hành này sẽ dễ dàng hơn theo thời gian. Bạn có thể so sánh ví dụ này với các examples trong phần "Validating References with Lifetimes" trong Chương 10.</p>

<h3 class="task-heading">Viết Code để Pass Test</h3>
<p>Hiện tại, test của chúng ta đang fail vì chúng ta luôn trả về một empty vector. Để fix đó và implement search, chương trình của chúng ta cần làm theo các bước sau:</p>

<ol>
  <li>Iterate qua mỗi dòng của contents.</li>
  <li>Check xem dòng có chứa query string của chúng ta không.</li>
  <li>Nếu có, add nó vào list of values mà chúng ta đang trả về.</li>
  <li>Nếu không, không làm gì cả.</li>
  <li>Return list of results match.</li>
</ol>

<p>Hãy làm qua mỗi bước, bắt đầu với iterating qua các dòng.</p>

<h4>Iterating Through Lines với lines Method</h4>
<p>Rust có một method hữu ích để handle line-by-line iteration của strings, conveniently tên là lines, hoạt động như được hiển thị trong Listing 12-17. Lưu ý rằng điều này sẽ chưa compile.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn search&lt;'a&gt;(query: &str, contents: &amp;'a str) -> Vec&lt;&amp;'a str&gt; {
    for line in contents.lines() {
        // do something with line
    }
}</code></pre>
</div>
<p><em>Listing 12-17: Iterating through each line in contents</em></p>

<p>Method lines trả về một iterator. Chúng ta sẽ nói về iterators chi tiết trong Chương 13. Nhưng nhớ lại rằng bạn đã thấy cách sử dụng iterator này trong Listing 3-5, nơi chúng ta sử dụng một for loop với một iterator để chạy một số code trên mỗi item trong một collection.</p>

<h4>Searching Each Line for the Query</h4>
<p>Tiếp theo, chúng ta sẽ check xem dòng hiện tại có chứa query string của chúng ta không. May mắn thay, strings có một method hữu ích tên là contains làm điều này cho chúng ta! Thêm một call đến contains method trong search function, như được hiển thị trong Listing 12-18. Lưu ý rằng điều này vẫn chưa compile.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn search&lt;'a&gt;(query: &str, contents: &amp;'a str) -> Vec&lt;&amp;'a str&gt; {
    for line in contents.lines() {
        if line.contains(query) {
            // do something with line
        }
    }
}</code></pre>
</div>
<p><em>Listing 12-18: Adding functionality to see whether the line contains the string in query</em></p>

<p>Hiện tại, chúng ta đang build up functionality. Để get code compile, chúng ta cần return một value từ body như chúng ta đã indicate chúng ta sẽ làm trong function signature.</p>

<h4>Storing Matching Lines</h4>
<p>Để finish function này, chúng ta cần một cách để store các matching lines mà chúng ta muốn return. Để làm điều đó, chúng ta có thể tạo một mutable vector trước for loop và gọi push method để store một line trong vector. Sau for loop, chúng ta return vector, như được hiển thị trong Listing 12-19.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn search&lt;'a&gt;(query: &str, contents: &amp;'a str) -> Vec&lt;&amp;'a str&gt; {
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }

    results
}</code></pre>
</div>
<p><em>Listing 12-19: Storing the lines that match so that we can return them</em></p>

<p>Bây giờ search function nên return chỉ các lines chứa query, và test của chúng ta nên pass. Hãy chạy test:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 1.22s
     Running unittests src/lib.rs (target/debug/deps/minigrep-9cd200e5fac0fc94)

running 1 test
test tests::one_result ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running unittests src/main.rs (target/debug/deps/minigrep-9cd200e5fac0fc94)

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

   Doc-tests minigrep

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Test của chúng ta pass, vì vậy chúng ta biết nó hoạt động!</p>

<p>Tại điểm này, chúng ta có thể consider opportunities cho refactoring implementation của search function trong khi giữ tests pass để maintain cùng functionality. Code trong search function không quá tệ, nhưng nó không tận dụng một số features hữu ích của iterators. Chúng ta sẽ quay lại ví dụ này trong Chương 13, nơi chúng ta sẽ explore iterators chi tiết, và xem cách cải thiện nó.</p>

<p>Bây giờ toàn bộ program nên hoạt động! Hãy thử nó, đầu tiên với một word nên return chính xác một dòng từ bài thơ Emily Dickinson: frog.</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run -- frog poem.txt
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.38s
     Running \`target/debug/minigrep frog poem.txt\`
How public, like a frog</code></pre>
</div>

<p>Tuyệt vời! Bây giờ hãy thử một word sẽ match nhiều dòng, như body:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run -- body poem.txt
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.0s
     Running \`target/debug/minigrep body poem.txt\`
I'm nobody! Who are you?
Are you nobody, too?
How dreary to be somebody!</code></pre>
</div>

<p>Và cuối cùng, hãy đảm bảo rằng chúng ta không get bất kỳ dòng nào khi tìm kiếm một word không ở bất cứ đâu trong bài thơ, như monomorphization:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run -- monomorphization poem.txt
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.0s
     Running \`target/debug/minigrep monomorphization poem.txt\`</code></pre>
</div>

<p>Tuyệt vời! Chúng ta đã build phiên bản mini của một công cụ cổ điển và học được nhiều về cách structure applications. Chúng ta cũng đã học một chút về file input và output, lifetimes, testing, và command line parsing.</p>

<p>Để hoàn thiện project này, chúng ta sẽ briefly demonstrate cách làm việc với environment variables và cách print đến standard error, cả hai đều hữu ích khi bạn viết command line programs.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Test-Driven Development:</strong>
  <ul>
    <li><strong>Viết test fail trước</strong> - Theo TDD principles</li>
    <li><strong>Viết đủ code để pass</strong> - Không thêm features thừa</li>
    <li><strong>Refactor</strong> - Cải thiện code giữ tests pass</li>
    <li><strong>Lifetime 'a</strong> - Kết nối contents với return value</li>
    <li><strong>contents.lines()</strong> - Iterator qua các dòng</li>
    <li><strong>line.contains(query)</strong> - Kiểm tra khớp</li>
    <li><strong>results.push(line)</strong> - Lưu các dòng match</li>
  </ul>
</div>
`,
            defaultCode: `fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.to_lowercase().contains(&query.to_lowercase()) {
            results.push(line);
        }
    }

    results
}

fn main() {
    let contents = "I'm nobody! Who are you?
Are you nobody, too?
Then there's a pair of us - don't tell!
They'd banish us, you know.

How dreary to be somebody!
How public, like a frog
To tell your name the livelong day
To an admiring bog!";

    // Test với "frog"
    let query = "frog";
    let results = search(query, contents);
    println!("Tim kiem '{}':", query);
    for line in &results {
        println!("  {}", line);
    }

    // Test với "body"
    let query = "body";
    let results = search(query, contents);
    println!("\\nTim kiem '{}':", query);
    for line in &results {
        println!("  {}", line);
    }

    // Test với "rust" (khong co)
    let query = "rust";
    let results = search(query, contents);
    println!("\\nTim kiem '{}': {} ket qua", query, results.len());
}
`,
            expectedOutput: 'Tim kiem \'frog\':\n  How public, like a frog\n\nTim kiem \'body\':\n  I\'m nobody! Who are you?\n  Are you nobody, too?\n  How dreary to be somebody!\n\nTim kiem \'rust\': 0 ket qua'
        };
