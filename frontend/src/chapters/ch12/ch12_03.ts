import { Lesson } from '../../courses';

export const ch12_03: Lesson = {
            id: 'ch12-03',
            title: '12.3 Refactor để cải thiện tính Module hóa và xử lý lỗi',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Để cải thiện chương trình của chúng ta, chúng ta sẽ sửa bốn vấn đề liên quan đến cấu trúc của chương trình và cách nó đang xử lý các lỗi tiềm năng. Đầu tiên, function main hiện tại thực hiện hai nhiệm vụ: Nó parse arguments và đọc files. Khi chương trình của chúng ta phát triển, số lượng các nhiệm vụ riêng biệt mà main xử lý sẽ tăng lên. Khi một function có thêm responsibilities, nó trở nên khó reason about, khó test hơn, và khó thay đổi mà không phá vỡ một trong các phần của nó. Tốt nhất là tách functionality để mỗi function chịu trách nhiệm cho một nhiệm vụ.</p>

<p>Vấn đề này cũng liên quan đến vấn đề thứ hai: Mặc dù query và file_path là các configuration variables cho chương trình của chúng ta, các variables như contents được sử dụng để thực hiện logic của chương trình. main càng dài, chúng ta cần đưa vào scope nhiều variables hơn; các variables chúng ta có trong scope càng nhiều, sẽ càng khó theo dõi mục đích của mỗi cái. Tốt nhất là nhóm các configuration variables thành một structure để làm rõ mục đích của chúng.</p>

<p>Vấn đề thứ ba là chúng ta đã sử dụng expect để in một error message khi đọc file thất bại, nhưng error message chỉ in "Should have been able to read the file". Đọc file có thể thất bại theo nhiều cách: Ví dụ, file có thể bị missing, hoặc chúng ta có thể không có quyền mở nó. Hiện tại, bất kể tình huống nào, chúng ta sẽ in cùng một error message cho mọi thứ, điều đó sẽ không cho người dùng bất kỳ thông tin nào!</p>

<p>Vấn đề thứ tư, chúng ta sử dụng expect để xử lý một lỗi, và nếu người dùng chạy chương trình của chúng ta mà không chỉ đủ arguments, họ sẽ get một index out of bounds error từ Rust mà không rõ ràng giải thích vấn đề. Tốt nhất là tất cả error-handling code nên ở một chỗ để các maintainers tương lai chỉ cần consult một chỗ nếu error-handling logic cần thay đổi. Có tất cả error-handling code ở một chỗ cũng sẽ đảm bảo rằng chúng ta đang in messages có ý nghĩa cho end users của chúng ta.</p>

<p>Hãy giải quyết bốn vấn đề này bằng cách refactoring project của chúng ta.</p>

<h3 class="task-heading">Tách biệt Concerns trong Binary Projects</h3>
<p>Vấn đề tổ chức về việc phân bổ responsibility cho nhiệm vụ nhiều cho function main là phổ biến trong nhiều binary projects. Kết quả là, nhiều Rust programmers thấy hữu ích khi tách các concerns riêng biệt của một binary program khi function main bắt đầu trở nên lớn. Quá trình này có các bước sau:</p>

<ol>
  <li>Tách chương trình thành file main.rs và file lib.rs và di chuyển logic của chương trình vào lib.rs.</li>
  <li>Miễn là command line parsing logic còn nhỏ, nó có thể ở trong function main.</li>
  <li>Khi command line parsing logic bắt đầu phức tạp, tách nó khỏi function main thành các functions hoặc types khác.</li>
</ol>

<p>Các responsibilities còn lại trong main sau quá trình này nên giới hạn ở:</p>

<ul>
  <li>Gọi command line parsing logic với các giá trị arguments</li>
  <li>Thiết lập bất kỳ configuration nào khác</li>
  <li>Gọi một function run trong lib.rs</li>
  <li>Xử lý lỗi nếu run trả về một error</li>
</ul>

<p>Pattern này là về việc tách biệt concerns: main.rs xử lý việc chạy chương trình và lib.rs xử lý tất cả logic của task hiện tại. Vì bạn không thể test function main trực tiếp, cấu trúc này cho phép bạn test tất cả logic của chương trình bằng cách di chuyển nó ra khỏi function main. Code còn lại trong main sẽ đủ nhỏ để verify correctness của nó bằng cách đọc. Hãy rework chương trình của chúng ta bằng cách làm theo quá trình này.</p>

<h3 class="task-heading">Trích xuất Argument Parser</h3>
<p>Chúng ta sẽ trích xuất functionality để parse arguments thành một function mà main sẽ gọi. Listing 12-5 cho thấy phần bắt đầu mới của main function gọi một function mới là parse_config, mà chúng ta sẽ định nghĩa trong src/main.rs.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();

    let (query, file_path) = parse_config(&args);

    // --snip--
}

fn parse_config(args: &[String]) -> (&str, &str) {
    let query = &args[1];
    let file_path = &args[2];

    (query, file_path)
}</code></pre>
</div>
<p><em>Listing 12-5: Extracting a parse_config function from main</em></p>

<p>Chúng ta vẫn đang collect các command line arguments thành một vector, nhưng thay vì assign giá trị argument tại index 1 vào variable query và giá trị argument tại index 2 vào variable file_path trong main function, chúng ta truyền whole vector đến parse_config function. Function parse_config sau đó giữ logic xác định argument nào vào variable nào và trả các giá trị lại cho main. Chúng ta vẫn tạo các variables query và file_path trong main, nhưng main không còn có responsibility để xác định command line arguments và variables tương ứng như thế nào.</p>

<p>Rework này có vẻ overkill cho chương trình nhỏ của chúng ta, nhưng chúng ta đang refactor trong các bước nhỏ, incremental. Sau khi thay đổi này, chạy lại chương trình để verify rằng argument parsing vẫn hoạt động. Tốt để kiểm tra progress thường xuyên, để giúp identify nguyên nhân của các vấn đề khi chúng xảy ra.</p>

<h3 class="task-heading">Nhóm các Configuration Values</h3>
<p>Chúng ta có thể thực hiện một bước nhỏ khác để cải thiện parse_config function hơn nữa. Hiện tại, chúng ta đang trả về một tuple, nhưng sau đó chúng ta ngay lập tức break tuple đó thành các parts riêng lẻ. Đây là một dấu hiệu cho thấy có lẽ chúng ta chưa có abstraction đúng.</p>

<p>Một indicator khác cho thấy có room để cải thiện là phần config trong parse_config, điều đó ngụ ý rằng hai giá trị chúng ta trả về có liên quan và cả hai đều là một phần của một configuration value. Chúng ta hiện không truyền tải ý nghĩa này trong cấu trúc của data ngoài việc nhóm hai giá trị thành một tuple; thay vào đó, chúng ta sẽ đặt hai giá trị vào một struct và đặt tên có ý nghĩa cho mỗi struct field. Điều này sẽ giúp các maintainers tương lai của code này hiểu cách các giá trị khác nhau liên quan đến nhau và mục đích của chúng là gì.</p>

<p>Listing 12-6 cho thấy các cải tiến cho parse_config function.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();

    let config = parse_config(&args);

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    let contents = fs::read_to_string(config.file_path)
        .expect("Should have been able to read the file");

    // --snip--
}

struct Config {
    query: String,
    file_path: String,
}

fn parse_config(args: &[String]) -> Config {
    let query = args[1].clone();
    let file_path = args[2].clone();

    Config { query, file_path }
}</code></pre>
</div>
<p><em>Listing 12-6: Refactoring parse_config to return an instance of a Config struct</em></p>

<p>Chúng ta đã thêm một struct tên là Config được định nghĩa có các fields tên là query và file_path. Signature của parse_config bây giờ cho thấy nó trả về một giá trị Config. Trong body của parse_config, nơi chúng ta từng trả về các string slices tham chiếu đến các giá trị String trong args, bây giờ chúng ta định nghĩa Config để chứa các giá trị String được sở hữu. Biến args trong main là owner của các giá trị arguments và chỉ cho phép parse_config function borrow chúng, điều đó có nghĩa là nếu Config cố gắng lấy ownership của các giá trị trong args, chúng ta sẽ vi phạm Rust's borrowing rules.</p>

<p>Có nhiều cách chúng ta có thể quản lý dữ liệu String; cách dễ nhất, mặc dù hơi kém hiệu quả, là gọi method clone trên các giá trị. Điều này sẽ tạo một bản copy đầy đủ của dữ liệu để Config instance sở hữu, điều này mất nhiều thời gian và bộ nhớ hơn so với việc lưu trữ một reference đến dữ liệu string. Tuy nhiên, cloning dữ liệu cũng làm cho code của chúng ta rất straightforward vì chúng ta không phải quản lý lifetimes của các references; trong hoàn cảnh này, từ bỏ một chút hiệu suất để đạt được sự đơn giản là một trade-off đáng giá.</p>

<h4>Trade-Offs của việc sử dụng clone</h4>
<p>Có xu hướng trong nhiều Rustaceans tránh sử dụng clone để fix ownership problems vì chi phí runtime của nó. Trong Chương 13, bạn sẽ học cách sử dụng các methods hiệu quả hơn trong loại tình huống này. Nhưng hiện tại, okay để copy một vài strings để tiếp tục tiến triển vì bạn sẽ chỉ thực hiện các copies này một lần và file path và query string của bạn rất nhỏ. Tốt hơn là có một chương trình hoạt động hơi kém hiệu quả so với việc cố gắng hyperoptimize code trong first pass của bạn. Khi bạn trở nên có kinh nghiệm hơn với Rust, sẽ dễ dàng hơn để bắt đầu với giải pháp hiệu quả nhất, nhưng hiện tại, hoàn toàn acceptable để gọi clone.</p>

<p>Chúng ta đã update main để đặt instance của Config được trả về từ parse_config vào một biến tên là config, và chúng ta đã update code mà trước đó sử dụng các variables query và file_path riêng biệt để nó bây giờ sử dụng các fields trên Config struct thay vì.</p>

<p>Bây giờ code của chúng ta rõ ràng hơn là query và file_path có liên quan và mục đích của chúng là để configure cách chương trình sẽ hoạt động. Bất kỳ code nào sử dụng các giá trị này đều biết tìm chúng trong config instance ở các fields được đặt tên cho mục đích của chúng.</p>

<h3 class="task-heading">Tạo Constructor cho Config</h3>
<p>Cho đến nay, chúng ta đã trích xuất logic chịu trách nhiệm parsing command line arguments từ main và đặt nó trong function parse_config. Làm như vậy giúp chúng ta thấy rằng các giá trị query và file_path có liên quan, và mối quan hệ đó nên được truyền tải trong code của chúng ta. Sau đó, chúng ta đã thêm một Config struct để đặt tên cho mục đích liên quan của query và file_path và để có thể trả về các tên của các giá trị như struct field names từ parse_config function.</p>

<p>Vậy, bây giờ mục đích của parse_config function là tạo một Config instance, chúng ta có thể thay đổi parse_config từ một plain function thành một function tên là new được associated với Config struct. Thay đổi này sẽ làm cho code idiomatic hơn. Chúng ta có thể create instances của các types trong standard library, chẳng hạn như String, bằng cách gọi String::new. Tương tự, bằng cách thay đổi parse_config thành một new function associated với Config, chúng ta sẽ có thể create instances của Config bằng cách gọi Config::new. Listing 12-7 cho thấy các thay đổi chúng ta cần thực hiện.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();

    let config = Config::new(&args);

    // --snip--
}

// --snip--

impl Config {
    fn new(args: &[String]) -> Config {
        let query = args[1].clone();
        let file_path = args[2].clone();

        Config { query, file_path }
    }
}</code></pre>
</div>
<p><em>Listing 12-7: Changing parse_config into Config::new</em></p>

<p>Chúng ta đã update main nơi chúng ta gọi parse_config để thay vào đó gọi Config::new. Chúng ta đã thay đổi tên của parse_config thành new và di chuyển nó vào một impl block, điều này associates function new với Config. Thử compile code này lại để đảm bảo nó hoạt động.</p>

<h3 class="task-heading">Sửa Error Handling</h3>
<p>Bây giờ chúng ta sẽ làm việc để sửa error handling của chúng ta. Nhớ lại rằng việc cố gắng truy cập các giá trị trong args vector tại index 1 hoặc index 2 sẽ cause program để panic nếu vector chứa ít hơn ba items. Thử chạy chương trình mà không có arguments; nó sẽ trông như thế này:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.0s
     Running \`target/debug/minigrep\`

thread 'main' panicked at src/main.rs:27:21:
index out of bounds: the len is 1 but the index is 1
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace</code></pre>
</div>

<p>Dòng "index out of bounds: the len is 1 but the index is 1" là một error message dành cho programmers. Nó sẽ không giúp end users của chúng ta hiểu họ nên làm gì thay vào đó. Hãy sửa điều đó bây giờ.</p>

<h4>Cải thiện Error Message</h4>
<p>Trong Listing 12-8, chúng ta thêm một check trong function new để verify rằng slice đủ dài trước khi truy cập index 1 và index 2. Nếu slice không đủ dài, program panics và displays một error message tốt hơn.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    // --snip--
    fn new(args: &[String]) -> Config {
        if args.len() < 3 {
            panic!("not enough arguments");
        }
        // --snip--</code></pre>
</div>
<p><em>Listing 12-8: Adding a check for the number of arguments</em></p>

<p>Code này tương tự như Guess::new function chúng ta đã viết trong Listing 9-13, nơi chúng ta gọi panic! khi argument value nằm ngoài phạm vi của các giá trị valid. Thay vì check cho một range of values ở đây, chúng ta đang check rằng length của args ít nhất là 3 và phần còn lại của function có thể operate với giả định rằng điều kiện này đã được meet. Nếu args có ít hơn ba items, điều kiện này sẽ true, và chúng ta gọi panic! macro để end program ngay lập tức.</p>

<p>Với những dòng code extra này trong new, hãy chạy lại program mà không có arguments để xem error trông như thế nào bây giờ:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.0s
     Running \`target/debug/minigrep\`

thread 'main' panicked at src/main.rs:26:13:
not enough arguments
note: run with \`RUST_BACKTRACE=1\` environment variable to display a backtrace</code></pre>
</div>

<p>Output này tốt hơn: Bây giờ chúng ta có một error message hợp lý. Tuy nhiên, chúng ta cũng có thông tin extra mà chúng ta không muốn cung cấp cho người dùng. Có lẽ kỹ thuật chúng ta sử dụng trong Listing 9-13 không phải là best one ở đây: Một call đến panic! phù hợp hơn cho một programming problem hơn là một usage problem, như đã thảo luận trong Chương 9. Thay vào đó, chúng ta sẽ sử dụng kỹ thuật khác mà bạn đã học trong Chương 9 - trả về một Result cho biết thành công hoặc lỗi.</p>

<h4>Trả về Result thay vì gọi panic!</h4>
<p>Chúng ta có thể trả về một giá trị Result sẽ chứa một Config instance trong trường hợp thành công và sẽ mô tả vấn đề trong trường hợp lỗi. Chúng ta cũng sẽ thay đổi function name từ new thành build vì nhiều programmers mong đợi new functions không bao giờ fail. Khi Config::build communicate với main, chúng ta có thể sử dụng Result type để signal rằng có một vấn đề. Sau đó, chúng ta có thể change main để convert một Err variant thành một error practical hơn cho người dùng mà không có surrounding text về thread 'main' và RUST_BACKTRACE mà một call đến panic! causes.</p>
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

        Ok(Config { query, file_path })
    }
}</code></pre>
</div>
<p><em>Listing 12-9: Returning a Result from Config::build</em></p>

<p>Build function của chúng ta trả về một Result với một Config instance trong trường hợp thành công và một string literal trong trường hợp lỗi. Các error values của chúng ta sẽ luôn là string literals có lifetime 'static.</p>

<p>Chúng ta đã thực hiện hai thay đổi trong body của function: Thay vì gọi panic! khi người dùng không truyền đủ arguments, bây giờ chúng ta trả về một giá trị Err, và chúng ta đã wrap giá trị Config return trong một Ok. Những thay đổi này làm function conform với type signature mới của nó.</p>

<p>Trả về một giá trị Err từ Config::build cho phép main function xử lý giá trị Result được trả về từ build function và exit process sạch hơn trong trường hợp lỗi.</p>

<h4>Gọi Config::build và xử lý Errors</h4>
<p>Để xử lý trường hợp lỗi và in một user-friendly message, chúng ta cần update main để xử lý Result được trả về bởi Config::build, như được hiển thị trong Listing 12-10. Chúng ta cũng sẽ lấy responsibility của việc exiting command line tool với một nonzero error code khỏi panic! và thay vào đó implement nó bằng tay. Một nonzero exit status là một convention để signal cho process gọi chương trình của chúng ta rằng chương trình đã exit với một error state.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::process;

fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();

    let config = Config::build(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {err}");
        process::exit(1);
    });

    // --snip--</code></pre>
</div>
<p><em>Listing 12-10: Exiting with an error code if building a Config fails</em></p>

<p>Trong listing này, chúng ta đã sử dụng một method chúng ta chưa cover chi tiết: unwrap_or_else, được định nghĩa trên Result&lt;T, E&gt; bởi standard library. Sử dụng unwrap_or_else cho phép chúng ta define một số custom, non-panic! error handling. Nếu Result là một giá trị Ok, behavior của method này tương tự như unwrap: Nó trả về inner value mà Ok đang wrap. Tuy nhiên, nếu giá trị là một giá trị Err, method này gọi code trong closure, đó là một anonymous function mà chúng ta define và pass như một argument đến unwrap_or_else. Chúng ta sẽ cover closures chi tiết hơn trong Chương 13. Hiện tại, bạn chỉ cần biết rằng unwrap_or_else sẽ pass inner value của Err, trong trường hợp này là static string "not enough arguments" mà chúng ta thêm trong Listing 12-9, đến closure của chúng ta trong argument err xuất hiện giữa các vertical pipes. Code trong closure sau đó có thể sử dụng giá trị err khi nó chạy.</p>

<p>Chúng ta đã thêm một dòng use mới để đưa process từ standard library vào scope. Code trong closure sẽ được chạy trong trường hợp lỗi chỉ là hai dòng: Chúng ta in giá trị err và sau đó gọi process::exit. Function process::exit sẽ dừng chương trình ngay lập tức và trả về số được passed như exit status code. Điều này tương tự như panic!-based handling chúng ta sử dụng trong Listing 12-8, nhưng chúng ta không còn nhận được tất cả output extra nữa. Hãy thử nó:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.48s
     Running \`target/debug/minigrep\`
Problem parsing arguments: not enough arguments</code></pre>
</div>

<p>Tuyệt vời! Output này thân thiện hơn nhiều cho người dùng của chúng ta.</p>

<h3 class="task-heading">Trích xuất Logic từ main</h3>
<p>Bây giờ chúng ta đã hoàn thành việc refactoring configuration parsing, hãy turn đến logic của chương trình. Như chúng ta đã nói trong "Separating Concerns in Binary Projects", chúng ta sẽ trích xuất một function tên là run sẽ giữ tất cả logic hiện tại trong main function không liên quan đến việc setting up configuration hoặc handling errors. Khi chúng ta hoàn thành, main function sẽ ngắn gọn và dễ verify bằng inspection, và chúng ta sẽ có thể viết tests cho tất cả logic khác.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    // --snip--

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    run(config);
}

fn run(config: Config) {
    let contents = fs::read_to_string(config.file_path)
        .expect("Should have been able to read the file");

    println!("With text:\n{contents}");
}

// --snip--</code></pre>
</div>
<p><em>Listing 12-11: Extracting a run function containing the rest of the program logic</em></p>

<p>Run function bây giờ chứa tất cả logic còn lại từ main, bắt đầu từ việc đọc file. Function run lấy Config instance làm argument.</p>

<h4>Trả về Errors từ run</h4>
<p>Với logic chương trình còn lại được tách vào function run, chúng ta có thể cải thiện error handling, như chúng ta đã làm với Config::build trong Listing 12-9. Thay vì cho phép chương trình panic bằng cách gọi expect, function run sẽ trả về một Result&lt;T, E&gt; khi có điều gì đó sai. Điều này sẽ cho phép chúng ta tiếp tục consolidate logic xung quanh việc xử lý errors vào main theo cách user-friendly. Listing 12-12 cho thấy các thay đổi chúng ta cần thực hiện đối với signature và body của run.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::error::Error;

// --snip--

fn run(config: Config) -> Result&lt;(), Box&lt;dyn Error&gt;&gt; {
    let contents = fs::read_to_string(config.file_path)?;

    println!("With text:\n{contents}");

    Ok(())
}</code></pre>
</div>
<p><em>Listing 12-12: Changing the run function to return Result</em></p>

<p>Chúng ta đã thực hiện ba thay đổi đáng kể ở đây. Thứ nhất, chúng ta đã thay đổi return type của run function thành Result&lt;(), Box&lt;dyn Error&gt;&gt;. Function này trước đó trả về unit type, (), và chúng ta giữ điều đó như giá trị được trả về trong trường hợp Ok.</p>

<p>Cho error type, chúng ta đã sử dụng trait object Box&lt;dyn Error&gt; (và chúng ta đã đưa std::error::Error vào scope với một use statement ở đầu). Chúng ta sẽ cover trait objects trong Chương 18. Hiện tại, chỉ cần biết rằng Box&lt;dyn Error&gt; có nghĩa là function sẽ trả về một type implement Error trait, nhưng chúng ta không phải specify cụ thể loại nào mà return value sẽ là. Điều này cho chúng ta flexibility để trả về error values có thể là các types khác nhau trong các trường hợp lỗi khác nhau. Từ khóa dyn là viết tắt cho dynamic.</p>

<p>Thứ hai, chúng ta đã remove call đến expect thay vào đó sử dụng ? operator, như chúng ta đã nói trong Chương 9. Thay vì panic! khi có lỗi, ? sẽ trả về giá trị lỗi từ function hiện tại cho caller để xử lý.</p>

<p>Thứ ba, function run bây giờ trả về một giá trị Ok trong trường hợp thành công. Chúng ta đã khai báo success type của run function là () trong signature, có nghĩa là chúng ta cần wrap giá trị unit type trong giá trị Ok. Cú pháp Ok(()) có vẻ hơi lạ lúc đầu. Nhưng sử dụng () như thế này là cách idiomatic để chỉ ra rằng chúng ta gọi run vì side effects của nó; nó không trả về một giá trị mà chúng ta cần.</p>

<p>Khi bạn chạy code này, nó sẽ compile nhưng sẽ hiển thị một warning:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run -- the poem.txt
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
warning: unused \`Result\` that must be used
  --> src/main.rs:19:5
   |
19 |     run(config);
   |     ^^^^^^^^^^^
   |
   = note: this \`Result\` may be an \`Err\` variant, which should be handled
   = note: \`#[warn(unused_must_use)]\` on by default
help: use \`let _ = ...\` to ignore the resulting value
   |
19 |     let _ = run(config);
   |     +++++++

warning: \`minigrep\` (bin "minigrep") generated 1 warning
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.71s
     Running \`target/debug/minigrep the poem.txt\`
Searching for the
In file poem.txt
With text:
I'm nobody! Who are you?
Are you nobody, too?
Then there's a pair of us - don't tell!
They'd banish us, you know.

How dreary to be somebody!
How public, like a frog
To tell your name the livelong day
To an admiring bog!</code></pre>
</div>

<p>Rust nói cho chúng ta biết rằng code của chúng ta đã ignore giá trị Result và giá trị Result có thể indicate rằng một lỗi đã xảy ra. Nhưng chúng ta đang không check xem có lỗi hay không, và compiler nhắc nhở chúng ta rằng có lẽ chúng ta đã meant để có một số error-handling code ở đây! Hãy fix vấn đề đó bây giờ.</p>

<h4>Xử lý Errors được trả về từ run trong main</h4>
<p>Chúng ta sẽ check các errors và xử lý chúng bằng một kỹ thuật tương tự như một chúng ta đã sử dụng với Config::build trong Listing 12-10, nhưng với một slight difference:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    // --snip--

    println!("Searching for {}", config.query);
    println!("In file {}", config.file_path);

    if let Err(e) = run(config) {
        println!("Application error: {e}");
        process::exit(1);
    }
}</code></pre>
</div>

<p>Chúng ta sử dụng if let thay vì unwrap_or_else để check xem run có trả về giá trị Err không và gọi process::exit(1) nếu có. Function run không trả về một giá trị mà chúng ta muốn unwrap theo cùng cách Config::build trả về Config instance. Vì run trả về () trong trường hợp thành công, chúng ta chỉ quan tâm đến việc detect một lỗi, vì vậy chúng ta không cần unwrap_or_else để trả về unwrapped value, điều đó chỉ là ().</p>

<h3 class="task-heading">Tách Code thành Library Crate</h3>
<p>Project minigrep của chúng ta đang trông tốt cho đến giờ! Bây giờ chúng ta sẽ tách file src/main.rs và đặt một số code vào file src/lib.rs. Bằng cách đó, chúng ta có thể test code và có file src/main.rs với fewer responsibilities.</p>

<p>Trước tiên, hãy định nghĩa function search signature trong src/lib.rs như được hiển thị trong Listing 12-13, với một body gọi macro unimplemented!. Chúng ta sẽ giải thích signature chi tiết hơn khi fill in implementation.</p>
<p>Filename: src/lib.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>pub fn search&lt;'a&gt;(query: &str, contents: &'a str) -> Vec&lt;&'a str&gt; {
    unimplemented!();
}</code></pre>
</div>
<p><em>Listing 12-13: Defining the search function in src/lib.rs</em></p>

<p>Chúng ta đã sử dụng từ khóa pub trên function definition để designate search như một phần của public API của library crate của chúng ta. Bây giờ chúng ta có một library crate mà chúng ta có thể sử dụng từ binary crate và mà chúng ta có thể test!</p>

<p>Bây giờ chúng ta cần đưa code được định nghĩa trong src/lib.rs vào scope của binary crate trong src/main.rs và gọi nó, như được hiển thị trong Listing 12-14.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// --snip--
use minigrep::search;

fn main() {
    // --snip--
}

// --snip--

fn run(config: Config) -> Result&lt;(), Box&lt;dyn Error&gt;&gt; {
    let contents = fs::read_to_string(config.file_path)?;

    for line in search(&config.query, &contents) {
        println!("{line}");
    }

    Ok(())
}</code></pre>
</div>
<p><em>Listing 12-14: Using the minigrep library crate's search function in src/main.rs</em></p>

<p>Chúng ta thêm một dòng use minigrep::search để đưa function search từ library crate vào scope của binary crate. Sau đó, trong function run, thay vì in ra nội dung của file, chúng ta gọi function search và truyền config.query value và contents như arguments. Sau đó, run sẽ sử dụng một vòng lặp for để in mỗi line được trả về từ search mà matched với query. Đây cũng là thời điểm tốt để remove các println! calls trong main function hiển thị query và file path để chương trình của chúng ta chỉ in các kết quả tìm kiếm (nếu không có lỗi xảy ra).</p>

<p>Lưu ý rằng function search sẽ collect tất cả các results vào một vector nó trả về trước khi bất kỳ printing nào xảy ra. Implementation này có thể chậm để display results khi tìm kiếm các files lớn, vì results không được in khi chúng được tìm thấy; chúng ta sẽ thảo luận về một cách có thể để fix điều này bằng cách sử dụng iterators trong Chương 13.</p>

<p>Wow! Đó là nhiều công việc, nhưng chúng ta đã set ourselves up cho thành công trong tương lai. Bây giờ việc xử lý errors dễ dàng hơn nhiều, và chúng ta đã làm cho code modular hơn. Hầu hết tất cả công việc của chúng ta sẽ được thực hiện trong src/lib.rs từ đây trở đi.</p>

<p>Hãy tận dụng sự modularity mới tìm được bằng cách làm điều gì đó sẽ khó với code cũ nhưng dễ với code mới: Hãy viết một số tests!</p>

<div class="cyber-alert info">
  <strong>Tóm tắt Refactoring:</strong>
  <ul>
    <li><strong>Tách binary và library</strong> - main.rs và lib.rs</li>
    <li><strong>Config struct</strong> - Nhóm query và file_path</li>
    <li><strong>Config::new/build</strong> - Constructor cho Config</li>
    <li><strong>Result&lt;T, E&gt;</strong> - Trả về lỗi thay vì panic!</li>
    <li><strong>process::exit(1)</strong> - Thoát với error code</li>
    <li><strong>run function</strong> - Tách logic khỏi main</li>
    <li><strong>Box&lt;dyn Error&gt;</strong> - Trait object cho errors</li>
    <li><strong>? operator</strong> - Propagate errors</li>
  </ul>
</div>
`,
            defaultCode: `use std::error::Error;

struct Config {
    query: String,
    file_path: String,
}

impl Config {
    fn new(args: &[String]) -> Result<Config, &'static str> {
        if args.len() < 3 {
            return Err("Khong du tham so!");
        }
        Ok(Config {
            query: args[1].clone(),
            file_path: args[2].clone(),
        })
    }
}

fn search(query: &str, contents: &str) -> Vec<&str> {
    let mut results = Vec::new();
    for line in contents.lines() {
        if line.to_lowercase().contains(&query.to_lowercase()) {
            results.push(line);
        }
    }
    results
}

fn run(config: Config) -> Result<(), Box<dyn Error>> {
    let contents = std::fs::read_to_string(&config.file_path)?;
    let results = search(&config.query, &contents);

    for line in results {
        println!("{}", line);
    }
    Ok(())
}

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let config = Config::new(&args).unwrap_or_else(|err| {
        eprintln!("Loi: {}", err);
        std::process::exit(1);
    });

    if let Err(e) = run(config) {
        eprintln!("Loi ung dung: {}", e);
        std::process::exit(1);
    }
}
`,
            expectedOutput: 'Line 1: content with query\nLine 2: content with query'
        };
