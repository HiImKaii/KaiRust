import { Lesson } from '../../courses';

export const ch12_05: Lesson = {
            id: 'ch12-05',
            title: '12.5 Làm việc với Environment Variables',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Chúng ta sẽ cải thiện minigrep binary bằng cách thêm một feature extra: một option cho case-insensitive searching mà người dùng có thể bật qua một environment variable. Chúng ta có thể làm feature này là một command line option và yêu cầu người dùng nhập nó mỗi khi họ muốn nó apply, nhưng bằng cách làm nó thành một environment variable, chúng ta cho phép người dùng set environment variable một lần và có tất cả searches của họ case insensitive trong terminal session đó.</p>

<h3 class="task-heading">Viết một Failing Test cho Case-Insensitive Search</h3>
<p>Đầu tiên, chúng ta thêm một function search_case_insensitive mới vào minigrep library sẽ được gọi khi environment variable có một giá trị. Chúng ta sẽ tiếp tục follow TDD process, vì vậy bước đầu tiên là again viết một failing test. Chúng ta sẽ thêm một test mới cho function search_case_insensitive mới và rename test cũ của chúng ta từ one_result thành case_sensitive để làm rõ sự khác biệt giữa hai tests, như được hiển thị trong Listing 12-20.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case_sensitive() {
        let query = "duct";
        let contents = "\\
Rust:
safe, fast, productive.
Pick three.
Duct tape.";

        assert_eq!(vec!["safe, fast, productive."], search(query, contents));
    }

    #[test]
    fn case_insensitive() {
        let query = "rUsT";
        let contents = "\\
Rust:
safe, fast, productive.
Pick three.
Trust me.";

        assert_eq!(
            vec!["Rust:", "Trust me."],
            search_case_insensitive(query, contents)
        );
    }
}</code></pre>
</div>
<p><em>Listing 12-20: Adding a new failing test for the case-insensitive function we're about to add</em></p>

<p>Lưu ý rằng chúng ta đã edit old test's contents. Chúng ta đã thêm một dòng mới với text "Duct tape." sử dụng chữ D hoa không nên match query "duct" khi chúng ta đang searching theo case-sensitive manner. Thay đổi old test theo cách này giúp ensure rằng chúng ta không vô tình break case-sensitive search functionality mà chúng ta đã implement. Test này nên pass bây giờ và nên tiếp tục pass khi chúng ta làm việc trên case-insensitive search.</p>

<p>Test mới cho case-insensitive search sử dụng "rUsT" làm query của nó. Trong function search_case_insensitive chúng ta sắp thêm, query "rUsT" nên match dòng chứa "Rust:" với chữ R hoa và match dòng "Trust me." mặc dù cả hai đều có casing khác với query. Đây là failing test của chúng ta, và nó sẽ fail để compile vì chúng ta chưa define function search_case_insensitive. Feel free thêm một skeleton implementation luôn trả về một empty vector, tương tự như cách chúng ta làm cho search function trong Listing 12-16 để see test compile và fail.</p>

<h3 class="task-heading">Implement Function search_case_insensitive</h3>
<p>Function search_case_insensitive, được hiển thị trong Listing 12-21, sẽ gần như giống như search function. Chỉ khác là chúng ta sẽ lowercase query và mỗi dòng để cho dù case của input arguments là gì, chúng sẽ cùng case khi chúng ta check xem dòng có chứa query không.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn search_case_insensitive&lt;'a&gt;(
    query: &str,
    contents: &amp;'a str,
) -> Vec&lt;&amp;'a str&gt; {
    let query = query.to_lowercase();
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.to_lowercase().contains(&query) {
            results.push(line);
        }
    }

    results
}</code></pre>
</div>
<p><em>Listing 12-21: Defining the search_case_insensitive function to lowercase the query and the line before comparing them</em></p>

<p>Đầu tiên, chúng ta lowercase query string và lưu vào một biến mới với cùng tên, shadowing original query. Gọi to_lowercase trên query là cần thiết để cho dù query của người dùng là "rust", "RUST", "Rust", hay "rUsT", chúng ta sẽ treat query như thể nó là "rust" và insensitive với case. Trong khi to_lowercase sẽ handle basic Unicode, nó sẽ không chính xác 100 phần trăm. Nếu chúng ta đang viết một real application, chúng ta sẽ muốn làm thêm một chút work ở đây, nhưng section này là về environment variables, không phải Unicode, vì vậy chúng ta sẽ để ở đó.</p>

<p>Lưu ý rằng query bây giờ là một String hơn là một string slice vì gọi to_lowercase tạo data mới thay vì referencing existing data. Nói query là "rUsT", ví dụ: string slice đó không chứa chữ thường u hoặc t để chúng ta sử dụng, vì vậy chúng ta phải allocate một String mới chứa "rust". Khi chúng ta pass query như một argument đến contains method bây giờ, chúng ta cần thêm một ampersand vì signature của contains được define để take một string slice.</p>

<p>Tiếp theo, chúng ta thêm một call đến to_lowercase trên mỗi dòng để lowercase tất cả các ký tự. Bây giờ chúng ta đã convert line và query sang lowercase, chúng ta sẽ find matches không matter case của query là gì.</p>

<p>Hãy xem liệu implementation này có pass các tests không:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo test
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`test\` profile [unoptimized + debuginfo] target(s) in 1.33s
     Running unittests src/lib.rs (target/debug/deps/minigrep-9cd200e5fac0fc94)

running 2 tests
test tests::case_insensitive ... ok
test tests::case_sensitive ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running unittests src/main.rs (target/debug/deps/minigrep-9cd200e5fac0fc94)

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 thành công filtered out; finished in 0.00s

   Doc-tests minigrep

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s</code></pre>
</div>

<p>Tuyệt vời! Chúng pass. Bây giờ hãy gọi function search_case_insensitive mới từ run function. Đầu tiên, chúng ta sẽ thêm một configuration option vào Config struct để switch giữa case-sensitive và case-insensitive search. Thêm field này sẽ cause compiler errors vì chúng ta chưa initialize field này ở bất cứ đâu:</p>

<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub struct Config {
    pub query: String,
    pub file_path: String,
    pub ignore_case: bool,
}</code></pre>
</div>

<p>Chúng ta đã thêm ignore_case field giữ một Boolean. Tiếp theo, chúng ta cần run function check giá trị của ignore_case field và use that để decide whether gọi search function hoặc search_case_insensitive function, như được hiển thị trong Listing 12-22. Điều này vẫn sẽ chưa compile.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use minigrep::{search, search_case_insensitive};

// --snip--

fn run(config: Config) -> Result&lt;(), Box&lt;dyn Error&gt;&gt; {
    let contents = fs::read_to_string(config.file_path)?;

    let results = if config.ignore_case {
        search_case_insensitive(&config.query, &contents)
    } else {
        search(&config.query, &contents)
    };

    for line in results {
        println!("{line}");
    }

    Ok(())
}</code></pre>
</div>
<p><em>Listing 12-22: Calling either search or search_case_insensitive based on the value in config.ignore_case</em></p>

<p>Cuối cùng, chúng ta cần check cho environment variable. Các functions để làm việc với environment variables nằm trong module env trong standard library, đã được in scope ở đầu src/main.rs. Chúng ta sẽ sử dụng function var từ env module để check xem bất kỳ giá trị nào đã được set cho một environment variable tên là IGNORE_CASE, như được hiển thị trong Listing 12-23.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>impl Config {
    fn build(args: &[String]) -> Result&lt;Config, &'static str&gt; {
        if args.len() < 3 {
            return Err("not enough arguments");
        }

        let query = args[1].clone();
        let file_path = args[2].clone();

        let ignore_case = env::var("IGNORE_CASE").is_ok();

        Ok(Config {
            query,
            file_path,
            ignore_case,
        })
    }
}</code></pre>
</div>
<p><em>Listing 12-23: Checking for any value in an environment variable named IGNORE_CASE</em></p>

<p>Ở đây, chúng ta tạo một biến mới, ignore_case. Để set giá trị của nó, chúng ta gọi function env::var và truyền cho nó tên của environment variable IGNORE_CASE. Function env::var trả về một Result sẽ là Ok variant thành công chứa giá trị của environment variable nếu environment variable được set thành bất kỳ giá trị nào. Nó sẽ trả về Err variant nếu environment variable không được set.</p>

<p>Chúng ta đang sử dụng method is_ok trên Result để check xem environment variable có được set không, có nghĩa là program nên làm một case-insensitive search. Nếu environment variable IGNORE_CASE không được set thành bất kỳ giá trị nào, is_ok sẽ return false và program sẽ perform một case-sensitive search. Chúng ta không quan tâm đến giá trị của environment variable, chỉ là nó được set hay unset, vì vậy chúng ta đang check is_ok thay vì sử dụng unwrap, expect, hoặc bất kỳ methods nào khác mà chúng ta đã thấy trên Result.</p>

<p>Chúng ta pass giá trị trong ignore_case variable đến Config instance để run function có thể read giá trị đó và decide whether gọi search_case_insensitive hoặc search, như chúng ta đã implement trong Listing 12-22.</p>

<p>Hãy thử nó! Đầu tiên, chúng ta sẽ chạy program của mình không có environment variable set và với query là to, nên match bất kỳ dòng nào chứa từ to trong tất cả lowercase:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run -- to poem.txt
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.0s
     Running \`target/debug/minigrep to poem.txt\`
Are you nobody, too?
How dreary to be somebody!</code></pre>
</div>

<p>Looks like that still works! Bây giờ hãy chạy program với IGNORE_CASE set thành 1 nhưng với cùng query là to:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ IGNORE_CASE=1 cargo run -- to poem.txt</code></pre>
</div>

<p>Nếu bạn đang sử dụng PowerShell, bạn sẽ cần set environment variable và chạy program như các commands riêng biệt:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>PS> $Env:IGNORE_CASE=1; cargo run -- to poem.txt</code></pre>
</div>

<p>Điều này sẽ làm IGNORE_CASE persist cho phần còn lại của shell session của bạn. Nó có thể được unset với Remove-Item cmdlet:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>PS> Remove-Item Env:IGNORE_CASE</code></pre>
</div>

<p>Chúng ta nên get các dòng chứa to có thể có uppercase letters:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>Are you nobody, too?
How dreary to be somebody!
To tell your name the livelong day
To an admiring bog!</code></pre>
</div>

<p>Tuyệt vời, chúng ta cũng get các dòng chứa To! Program minigrep của chúng ta bây giờ có thể làm case-insensitive searching được control bởi một environment variable. Bây giờ bạn biết cách manage options set sử dụng hoặc command line arguments hoặc environment variables.</p>

<p>Một số programs cho phép arguments và environment variables cho cùng một configuration. Trong những cases đó, programs decide rằng một hoặc cái kia takes precedence. Để có thêm exercise cho bạn, thử control case sensitivity thông qua hoặc một command line argument hoặc một environment variable. Decide whether command line argument hoặc environment variable nên take precedence nếu program được chạy với một set thành case sensitive và một set thành ignore case.</p>

<p>Module std::env chứa nhiều features hữu ích hơn để deal với environment variables: Check out documentation của nó để xem cái gì available.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Environment Variables:</strong>
  <ul>
    <li><strong>env::var("NAME")</strong> - Đọc environment variable</li>
    <li><strong>.is_ok()</strong> - Check xem variable có được set không</li>
    <li><strong>ignore_case: bool</strong> - Config option cho case insensitive</li>
    <li><strong>query.to_lowercase()</strong> - Chuyển query sang chữ thường</li>
    <li><strong>line.to_lowercase()</strong> - Chuyển dòng sang chữ thường</li>
    <li><strong>IGNORE_CASE=1</strong> - Set environment variable trong bash</li>
    <li><strong>$Env:IGNORE_CASE=1</strong> - Set trong PowerShell</li>
  </ul>
</div>
`,
            defaultCode: `use std::env;

struct Config {
    query: String,
    file_path: String,
    ignore_case: bool,
}

impl Config {
    fn new(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("Khong du tham so");
        }

        let query = args[1].clone();
        let file_path = args[2].clone();

        // Doc environment variable
        let ignore_case = env::var("IGNORE_CASE").is_ok();

        Ok(Config {
            query,
            file_path,
            ignore_case,
        })
    }
}

fn search(query: &str, contents: &str) -> Vec<&str> {
    contents.lines()
        .filter(|line| line.contains(query))
        .collect()
}

fn search_case_insensitive(query: &str, contents: &str) -> Vec<&str> {
    let query = query.to_lowercase();
    contents.lines()
        .filter(|line| line.to_lowercase().contains(&query))
        .collect()
}

fn run(config: Config) {
    let contents = std::fs::read_to_string(&config.file_path)
        .expect("Khong doc duoc file");

    let results = if config.ignore_case {
        search_case_insensitive(&config.query, &contents)
    } else {
        search(&config.query, &contents)
    };

    for line in results {
        println!("{}", line);
    }
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let config = Config::new(&args).unwrap_or_else(|err| {
        eprintln!("Loi: {}", err);
        std::process::exit(1);
    });

    run(config);
}
`,
            expectedOutput: 'Line 1: content with query\nLine 2: content with query'
        };
