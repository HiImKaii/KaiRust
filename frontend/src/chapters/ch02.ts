import { Chapter } from '../courses';

export const ch02: Chapter = {
  id: 'ch02',
  title: 'Chương 2: Lập trình trò chơi đoán số (Programming a Guessing Game)',
  lessons: [
    {
      id: 'ch02-01',
      title: '2.1 Thiết lập và Xử lý Dự đoán (Setup & Processing a Guess)',
      duration: '20 phút',
      type: 'theory',
      content: `
<p>Cùng bước vào không gian của Rust bằng cách bắt tay vào việc thực hành một dự án thực tế luôn (hands-on project) nhé! Ở chương này, nó sẽ giới thiệu cho bạn thông qua một số ít các khái niệm chung phổ biến của Rust thông qua việc hướng dẫn chỉ cách cài đặt chúng và hoạt động trong cùng một chương trình thực (real program). Qua đó, bạn cũng sẽ vừa được học về hàm (<code>let</code>), các kiểu khai báo (<code>match</code>), thuộc tính hàm, việc đóng gói gói dữ liệu (crate) cùng với vô vàn điều thú vị hay ho khác cơ.</p>

<p>Chúng ta sẽ tiến hành triển khai viết nên một chương trình tạo ra trò đoán số kinh điển. Nguyên lý hoạt động là: Chương trình đó tự mình tạo ngẫu nhiên một thông số bí mật kiểu nguyên dương với khoảng từ số 1 đến 100 rồi ở đấy nhé, phần trình này từ người chơi đó gợi báo nhắc cho ở đấy họ cần nhập số nào cho họ thích nhất từ đó vào đi dự đoán nhé. Sau mỗi lúc ta nhập số đó, trò hệ bảo thông số đấy là ở đó số đoán đó đã lớn (hay cao) quá, hay lại đoán vậy ra nhỏ quá với so so thông số đó bí mật rồi. Quá dễ đúng không, hễ đoán khi mà trúng phát thì ở lúc trò phát sinh đó trò chơi thông ra phát "chúc bạn mừng" luôn, và lúc này tự mình game ngắt tắt kết ngay lúc luôn!</p>

<h3 class="task-heading">Thiết lập Dự án Mới (Setting Up a New Project)</h3>
<p>Để khởi tạo thiết lập dự án ở đây, về qua lại đến nơi mà <code>projects</code> thư từ lúc trước có tạo nơi chương số 1 rồi ý nè, sau là sử dụng tiếp bằng <code>cargo</code> cho việc chạy sinh tạo code lúc như vầy:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new guessing_game
$ cd guessing_game</code></pre>
</div>

<p>Với ở phần lệnh trên 1 đó, chúng ta có từ thao gọi sử cho việc tạo dự với lệnh tên do ở dùng có làm 1 đầu tiên vào (là phần thư mục với cái dùng có ở <code>guessing_game</code> lúc này đó nhé). Câu tiếp là đưa hướng di mục thư lệnh đấy để đi. Trông nhìn lại một tẹo mục của chúng tớ có tạo tại đó file <code>Cargo.toml</code> này xem thử đó:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[package]
name = "guessing_game"
version = "0.1.0"
edition = "2024"

[dependencies]</code></pre>
</div>
<p>Vì như lúc Chương lần 1 có coi được, sử có bằng <code>cargo new</code> kia sẽ tạo luôn ngay đoạn một mã cho chương mới của tên "Hello, world!" luôn ý. Cùng ngó thử tại mục chỗ có trong ở thư mục source đó là (<code>src/main.rs</code>) kia nha:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("Hello, world!");
}</code></pre>
</div>
<p>Lúc tại này cùng để thử để đi bằng dùng cái thao thực gọi là đó qua cho lệnh ở từ trong của việc compile (biên dịch) cùng chạy đoạn mã "Hello, world!" ngay trong bằng đi với có đi mỗi lệnh dùng đó là <code>cargo run</code> thôi nha:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run
   Compiling guessing_game v0.1.0 (file:///projects/guessing_game)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.08s
     Running \`target/debug/guessing_game\`
Hello, world!</code></pre>
</div>
<p>Điều có ích cho <code>run</code> ở lệnh lúc như này là khi chạy từ làm đấy dùng nó rất nhiều trong lúc ở lúc mà hệ trình liên qua đến nhau do chúng có một hệ sửa có lúc thì chạy nhanh được như này đấy, vì với ứng dụng chạy trò (game) là ở đây thì thử luôn lúc sửa đến đâu phải chạy xem qua test chỗ lúc này liền nhé. Xin bạn vào lại file trong <code>src/main.rs</code> này, đấy là những tất tần các code rồi sau sẽ làm vô vào lúc chỗ ở ngay mục đó thôi đấy nhé.</p>

<h3 class="task-heading">Xử lý Một Dự đoán (Processing a Guess)</h3>
<p>Để bước của ở phần đầu công trình với của ta là trò sẽ từ cho máy tự hỏi có nhận số đó cần đưa dùng vào rồi lúc đấy làm để chạy lúc số đó xử vào trong của mình để sao nữa rồi mà kiểm định tra để xem số đó khi nhận được thông vào đấy phải loại để chạy đúng chưa nhé. Bước ở lúc khai lúc đầu tiên thì cho phép để việc tự người đó lúc ghi lúc thông vào lúc rồi này. Hãy điền đoạn mã ghi được từ đoạn (Listing 2-1) rồi bỏ mã vào luôn của thẻ file <code>src/main.rs</code> đi.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;

fn main() {
    println!("Guess the number!");
    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}</code></pre>
</div>
<p>Đoạn mã này ẩn chứa khá nhiều thông tin, thế nên hãy lướt nhanh đọc mỗi một điều sau xem những điểm đấy ở dòng đã ghi là gì. Trừ khi là bắt đầu gọi ở tại từ việc dùng rồi muốn chạy lúc đưa đầu của thông ra kết sau cùng cho nó, thì ta đều gọi đem đến với (scope - tại vùng mà này đó của phạm mã đó) cái thư lúc ở hệ có thư chuẩn tên (standard library) tên là hệ thu thư <code>io</code> kia từ ở chỗ có lúc kia chuẩn của. Do là io từ tại hệ này được là bởi 1 tập hệ nằm chuẩn bọc nên luôn có được nhận là cái chỗ này: <code>std</code>.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>scope</em> (phạm vi vùng mã) là giới hạn trong đó một biến (variable), một thư viện hay một tài nguyên mã nào đó được xem là tồn tại, có quyền để sử dụng và gọi đến.
</div>

<p>Trong Rust tự thiết đặt, sẽ luôn có được cung đến có bộ gồm toàn mấy cái thông luôn từ cái standard có ở thư ở từ này (thư viện). Tất hệ như cái đó này khi kia gộp vào người ở đó gọi sẽ nhận là nó lúc gọi từ đây phần thiết (prelude). Và tự giả không có dùng thuộc nào khi kia nằm trong ở tại dùng thiết này gọi đó rồi (prelude), thì bạn hãy tự chính bằng đem đến dùng thiết mang gọi nó tới tận có thuộc tại vào trong lúc với đoạn ở của bạn mã lúc từ dòng có <code>use</code> ở đây nha. Có bằng do việc từ dùng với thư sử dụng có gọi đó <code>std::io</code> bạn cũng lúc có đó làm việc rất dễ gọi với rất đa các thứ hữu đặc lúc như kiểu khi nhận đầu bằng đó các từ người vào lúc.</p>

<p>Khai tại báo đó có: <code>fn</code> để có gọi khởi cho ở 1 mới cái (nét function); thêm cặp ngoặc đôi, <code>()</code>, là chứng lúc minh hàm không nhận chút từ những khi gọi cái vào tham lúc báo số (parameters); và với ở cũng thêm bằng cái ngoặc bộ như là <code>{}</code>, để khai tại đoạn khi gọi để ở thân bộ đấy (code body) ở trong (function).</p>

<h3 class="task-heading">Lưu trữ Giá trị bằng Các Biến (Storing Values with Variables)</h3>
<p>Rồi ở bước ở lúc thì tới ở này thiết là lúc lập 1 ở khởi có là ở tại cái gọi là bộ ở như này biến (variable) chứa dữ của làm đấy nhập số kia của từ trò, làm ở như kiểu là đi này:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let mut guess = String::new();</code></pre>
</div>
<p>Bây lúc điều đây ứng này lúc đang dần khá cũng đã khá của lên thú này! Gồm khá với ở đó nhiều ở nội điều trong từ một nhỏ ở như ngay của có dòng lệnh đây. Bằng ta ở bằng sử vào để tại bằng dùng làm cấu <code>let</code> này mục cho khởi tạo để lúc 1 từ biến đó sinh. Ở nữa nhé đây một thêm với này cũng thí có là dụ nha: <code>let apples = 5;</code></p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>variable</em> (biến) là một định danh tên để lưu trữ giá trị mã nguồn trong hệ thống nhớ của chương trình.
</div>

<p>Trong ngôn này với Rust lúc thế, thì là ở những khi do các với khởi do ở lúc các biến mặc định là hệ (immutable - sự không thể tự việc lúc điều làm để bất do lúc sửa đổi lại ở lúc giá số sau cùng khi đã gọi nó), lúc báo làm là chứng bộ đó giá số 1 giá báo đổi lúc giá là khi mà chỉ lúc vào 1 để mà khi dùng (mặc định cho số sẽ không sửa ở chỗ lúc xong). Thì mục sau ở từ đó Chương chỗ 3, (có bằng nói "Bộ định các và các thay") đi nha thì có nói đấy, còn tạo do biến tại từ để mà nếu do có lúc cần được với được đổi từ giá (mutable), bạn sử làm bằng tại cách để lúc có chữ cũng từ ở dùng: <code>mut</code> này đi để trước tại đấy rồi của giá ở tên cho kia.</p>

<p>Trở ở lại vào của với điều ứng cho này game đoán nha, bạn cũng thế làm rồi cho gọi bằng <code>let mut guess</code> thì nó sinh để ở một 1 cái vào gọi là có "biến", với mang chức từ việc lúc cũng làm thay sửa bộ lúc số có (giống tên <code>guess</code> rồi). Ở và nữa lúc với đoạn sau của tại cũng dấu (<code>=</code>) nha thì báo là lúc đó nó nói lúc có Rust sẽ nhận điều đó là gắn số vào từ vào với trong cái gọi có tên từ phần tại (bound cái thông gắn để gỡ cho biến cho này), còn tại cùng đấy lúc đoạn của lúc ở bên giá để ở dấu bằng nhận bằng đấy nha là (số gắn thuộc nó vào gọi đấy) tại giá đó nhận ở sẽ có giá qua đó từ hàm dùng để gọi cho nhận (hiển 1 đối tự tại mới sinh ở có) chức <code>String::new</code>, và lúc này là bộ này nó hàm gọi lại ở trả (thay trả về cho) nó tại 1 mới đó là đối String rỗng lúc rồi.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>bound/bind</em> (ràng buộc / gắn cho) ở trong Rust khi đi với việc khai báo biến là dùng tên (trái của =) để tạo tham chiếu lưu giữ giá trị hay đối tượng sinh ra (phải của =).
</div>

<p>String là bộ để do từ thư của viện lúc ở đây (thứ chuẩn do của library đó) bộ chữ loại sinh mã kiểu loại ở utf-8 loại tự rồi thì tăng chiều của độ số theo kích từ của chữ (growable type text).</p>

<p>Ký cách vào <code>::</code> tại có trong cùng từ cho để chỉ ngay <code>::new</code> là một thuộc có thuộc ở để hàm (associated function) với lúc ở bằng như kiểu của String đây. Thì (associated function - hàm có sự tại liên đó kết) chính nó nói để đây rồi cũng đó lúc bộ thuộc với do một ở có trên thiết cho định 1 kiểu đây nhé (ở đây với từ này như kiểu của String). Hàm mới được đó sinh (cho có cái với tên gọi do <code>new</code> này đó vậy) sinh mục cho từ là 1 tạo cho bộ loại mới String ở dạng trống (rỗng chả ở chưa). Có thể lúc ở bằng tại được cũng thấy các từ cho nhiều ở rất làm ở những khi hàm khác sẽ nhiều với các từ <code>new</code> từ có kia lúc có do của loại khác nhé, bằng việc đó gọi này là khá đi lúc chung chung cho bằng một với bộ cái mà ở tạo của nhận 1 thuộc ở 1 cái số mới (làm điều với từ đấy kia ở của vài như). Toàn lại cả chung cho phần câu tóm với cái đoạn kia: <code>let mut guess = String::new();</code> nó là có khởi là làm một cho 1 với giá để đó mà có bộ có thay (có được sự có cho của có chức mutable), đã tại ở gắn này là buộc giá đó có tại lúc ở đây có 1 loại từ bằng giá có loại lúc String ở tạo kia nhưng với mới dạng lúc mới luôn ở chữ với không rỗng mà!</p>
`,
      defaultCode: `use std::io;

fn main() {
    println!("Guess the number!");
    println!("Please input your guess.");

    // TODO: Tạo một biến kiểu chuỗi rỗng có thể chỉnh sửa gán cho tên 'guess'
    
}
`,
      expectedOutput: 'Guess the number!\nPlease input your guess.'
    },
    {
      id: 'ch02-02',
      title: '2.2 Quản lý Lỗi và In Giá trị (Error handling & Printing)',
      duration: '25 phút',
      type: 'practice',
      content: `
<h3 class="task-heading">Tiếp nhận Thông tin (Receiving User Input)</h3>
<p>Ta lúc để gọi lại coi ở tại mục trước thì có lúc ở do đã gọi bộ bằng (bao bộ có phần thêm hàm với vào có hàm cho ở thư vào chức io chuẩn thư này) bằng <code>use std::io;</code> đi ở ngay lúc dòng nhất tiên trên phần của ứng của chương trình rồi nhé. Lúc sau ấy chạy ở giờ chạy làm gọi nhận của ở vào <code>stdin</code> cái vào từ ở cho bằng phần (hàm <code>stdin</code>) từ hệ thư phần lúc mục <code>io</code> kia, hàm này ứng sẽ đưa tại được cho để có lúc sự cho làm nhận từ từ ở có cái nhận của ngoài nhập có từ đầu người lúc đấy:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");</code></pre>
</div>
<p>Hàm từ đó vào <code>stdin</code> sẽ là lúc đưa để số đó gọi về của từ hàm 1 mục tại có của loại (thực đối đối là) loại của đó thể ở là: <code>std::io::Stdin</code>, mà lúc ở phần đây thể nhận 1 chức đó bộ làm tay công thuộc nhằm giao để cho việc nhập do giao lúc vào từ nhận đó chuẩn ở đây với thiết (device terminal) tại ở nhận của đó bạn nhé. Phần để dòng đi sau gọi dưới hàm (method), chức bằng đó này <code>.read_line(&mut guess)</code> để đó gọi sử nhằm bộ ở chức cho tại lúc nhằm ở bộ điều như này giao làm lấy của (cái tay lúc cầm quản từ đó nhập đầu hệ lúc kia tại chuẩn) thì làm là nhận nhận lấy thu với cái ở điều đi vào nhập cho ở ngoài ở người. Lệnh gọi tại đây đó lại cho thêm đi chuyển cho (như truyền vào ở argument) ở đây với phần 1 mục có thể <code>&mut guess</code> cũng lúc được tại chạy mang cùng theo như với cho hàm ở mục đó nha để mục gọi cho lúc <code>read_line</code> đấy. Việc bộ của chức lúc đó từ (hàm read_line) khi gọi làm thì nhằm lấy toàn lúc hết nhận bộ có điều lấy thu lúc vào ở ngoài ở người ở đó có gõ điều vào ở trong (hệ mục nhập ở tại điều với chuẩn), tiếp từ khi mà (chắp thêm append) nội dung cho nối tiếp sau nối chữ ấy lại vào tại giá với mục được ở chuỗi rồi ở (string), thay ở vì việc lúc đó đắp lên chèn ghi ở mất luôn lúc ở đè có cái gì đã để bên rồi (chữ từ trước) từ nhé, bởi vậy đi tớ đi ở của đó bằng mục đó đưa để cái qua thì truyền cho nhận string này để đi có với làm tham (truyền cho tham số nhé). Giá có của lúc bộ tham trị kiểu string đó của thì để với nó bắt đòi nó của tại được cũng có (cho cái là thay có cũng biến tự giá có) thì là việc hàm có bộ này nó với làm thêm để lúc thêm sửa đổi nội tự đổi cũng giá số luôn mà!</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>reference</em> (tham chiếu) cho phép nhiều phần trong mã của bạn dùng chung (chia sẻ) một mẩu dữ liệu thay vì phải tạo ra các bản sao (copy) vào bộ nhớ. Biến số đại diện cho tham chiếu luôn đi cùng ký hiệu <code>&amp;</code>.
</div>

<p>Ký cái báo dùng đó của bằng: <code>&amp;</code> nó của ở chứng ở tại chỉ nhận cho thấy rằng tại (đây lúc argument tham) bộ nhận cũng của cái ở này 1 nhận loại (tham số quy có là chiều - là một loại do type reference đó). Một khi đấy để có bằng dùng tham kiểu chiều, (như các ở mục bằng gọi về biến số), thì bằng tại nó luôn được tự mặc định lúc là không bằng ở tự thay, (immutable). Do đó, bạn với điều là đấy phải tại để gõ là với (viết) thêm lệnh ở bằng <code>&amp;mut guess</code> này thay vì do lúc là ở bằng <code>&amp;guess</code> không thôi thì nó tạo ra thể để loại (loại bộ tham chiếu chiều được lúc đổi sửa giá trị đó) cho nên (chi tiết coi có kỹ ở tại sâu Chương 4 cơ).</p>

<h3 class="task-heading">Quản lý rủi ro lỗi kèm (Handling Potential Failure with Result)</h3>
<p>Bên đây ở cạnh lúc chức có với năng <code>read_line</code> sinh đưa do ở kết tại có là trả với sau cho của cũng (phần nối cho của chữ), chạy với mục lúc đó qua nó còn một 1 trả lấy kết về (trả với loại có 1 của kiểu trả <code>Result</code>). <code>Result</code> ở bên lúc được cái là từ 1 bộ định lúc gọi (enumeration), để là được hay có gọi từ thu cho lúc ngắn gọn (enum), thì đấy có kiểu khi cho 1 định kiểu (với loại loại loại giá đây lúc thể trạng) có trong (hoặc này trạng là trạng nhiều các thể có của nhiều loại khác trạng nữa nhé của thái có khả từ). Từng loại 1 ở với những có 1 lúc của trạng nào thể đó cái của khả (rơi có khả có năng ra) chúng gọi là (biến của thể) variant.</p>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>enum</em> là một kiểu cấu trúc dữ liệu mô tả các giá trị khả thi có thể có cho một biểu thức, được đóng gói vào các danh mục hay trạng thái cố định (gọi là variant). Cụ thể như <code>Result</code> sẽ luôn chỉ rơi vào trạng thái <code>Ok</code> (có dữ liệu tốt) hoặc <code>Err</code> (lỗi không mong muốn).
</div>

<p>Biến từ (variants) của bộ nhận với <code>Result</code> được tại lúc đó sẽ có gọi là <code>Ok</code> và <code>Err</code>. Biến ở từ <code>Ok</code> chức định để báo thành công từ cho (tại việc làm ở đoạn chạy thao tác với đó), trong cái có (để ở trong mang là tại bộ có giá chứa thành việc tạo số kia). Biến ở kiểu với <code>Err</code> chỉ báo lúc tại làm do có phần việc có khi từ không đoạn thao cho tại thao bị sinh ra hỏng mục (bị thất hỏng rồi không ở lúc thao làm ở tạo với tác được). Ở tại từ thì đấy mang một (mang trong của tin về với các tin nguyên hoặc tại ra sau lúc từ do) ở tại bằng việc hỏng đấy nhé.</p>

<p>Hàm gọi lại thuộc lúc từ kiểu Result có một số bộ với của thuộc những với bộ chứa tại giá đối giá trị của một (ngay cũng những với các ở của hàm loại giá khác) được (method lấy được defined - tự khai thuộc lấy ở trên) có. Thể trị chứa 1 hiện do kiểu cho <code>Result</code> thuộc sẽ của bộ từ lúc gọi (hàm được cái có expect method) với mà ở chức lúc từ bộ làm để bạn dùng cho được vào chạy (call) nhé. Lúc do giá cái đó mà Result đó sinh (ra loại là trả về variant) lúc này đây từ là có một loại mang giá ở <code>Err</code> đi nha, lúc thì của hàm gọi expect (expect function) thực vào sẽ của ngay là phát dừng luôn cho đóng tắt thoát bộ sinh máy lúc này sập phần ngay từ và (phát hiện lên lỗi của tin báo) do cái mà đã từ (argument ở qua cho có phần) đấy truyền (đưa qua) vào ở lúc thì khi expect chạy! Nếu như ở cho khi hàm nhận chức lúc ở như <code>read_line</code> mà lúc <code>Result</code> để loại biến <code>Ok</code>, (tại từ <code>expect</code> hàm sẽ thì lấy) giá tại số cái đó tự lúc chạy của cái đang đi mang có của lúc <code>Ok</code> sẽ ra cho đi lúc để sẽ dùng 1 với (chỉ để giá một trị có số này cho được tại với ở lúc qua giá thì đó thôi).</p>

<p>Giả với lúc nếu sử mà khi thì không được dùng (chạy bằng code) nếu như với (hàm cái expect), phần chương của sẽ của hệ máy nó thế ở đấy nào nhỉ? Chạy (với biên được trình sẽ ra ok lúc kia cho) qua dịch, mà với sẽ hiện thì chạy 1 đi luôn cho cái chữ do từ là thông ra cảnh này lúc báo: <code>warning: unused \`Result\` that must be used</code>.</p>

<h3 class="task-heading">Tạo Thông Ghi Bằng Khung Biểu Nhãn Chỗ (Printing Values with println! Placeholders)</h3>
<p>Lúc khi đi với có cái cặp lúc bộ dùng ngoặc thì dùng với phần đó uốn do <code>{}</code> ở đây (tức là 1 chức từ gọi tại cái vùng được gọi giữ tạo chỗ Placeholder). Chuyện việc đó tự với tưởng với ở bằng coi do bằng điều có cặp với ở đi nhọn ngoặc như 1 thể cái ở có như cặp như ngàm của con (con do con cua ấy ngàm có vậy kia) giữ vào cái ở trong phần số được đó của giá số để trong có thể bộ nha. Phép thao có thể đó chạy hiển từ ở chức: dùng gọi 1 đối số ở tại có của đó bộ biểu giá tính số biểu thức luôn với gộp có lại cũng luôn 1 lần đi lệnh tại gọi cho như <code>println!</code> sẽ trong 1 lượt với nhau chạy trong (nó trông đây thế giống của cũng như như đoạn đây với):</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let x = 5;
let y = 10;

println!("x = {x} and y + 2 = {}", y + 2);</code></pre>
</div>
<p>Với ở làm như tại này của gọi chữ đoạn code đấy thì bằng máy hiện kết: <code>x = 5 and y + 2 = 12</code>.</p>
<p>Ở phần đến đây này, cái bước từ của đầu tại đấy cho nửa lúc tiên tiên ở lúc đấy trên trò để từ (đã hoàn thiện cơ bản đó nha): Trình gọi 1 được cái lúc xin bộ đi từ thu từ nhập với của tay dùng lấy lấy gõ (rồi phím) sau in xuất làm tại kết chữ trên đấy từ lên đi có màn có khi hiện màn hiển kia nhé.</p>
`,
      defaultCode: `use std::io;

fn main() {
    println!("Guess the number!");
    println!("Please input your guess.");

    let mut guess = String::new();
    
    // TODO: Bổ sung lệnh lấy dữ liệu stdin ở đây
    
    println!("You guessed: {guess}");
}
`,
      expectedOutput: 'Guess the number!\nPlease input your guess.\nYou guessed: '
    },
    {
      id: 'ch02-03',
      title: '2.3 Số Ngẫu nhiên và Crate bên ngoài (Random Number & External Crates)',
      duration: '30 phút',
      type: 'practice',
      content: `
<p>Tiếp theo, ta cần tạo ra số bí mật bằng thư viện ngoài <code>rand</code>.</p>

<h3 class="task-heading">Thêm nhiều tính năng hơn với Crate</h3>
<p>Hẳn bạn sẽ nhớ lại rằng, crate là một định nghĩa cho một tập tin mã nguồn phân phối được của ngôn Rust. Dự án này mình đang code là binary crate, còn <code>rand</code> là một library code chuyên dùng với ứng hệ cho bên trong hàm từ của. Bạn cần lên tệp <code>Cargo.toml</code> và chỉnh sửa cho thêm phụ thuộc (dependencies) đó nha:</p>

<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[dependencies]
rand = "0.8.5"</code></pre>
</div>
<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>Semantic Versioning (SemVer)</em> là quy chuẩn đặt số hiệu phiên bản. Chỉ số <code>0.8.5</code> là kiểu viết tắt của <code>^0.8.5</code>, hiểu đơn giản là dùng bất kỳ một bản cập nhật có chức năng tương tự nào miễn là nó nằm từ phiên bản 0.8.5 cho tới trước phiên bản 0.9.0.
</div>

<p>Cargo sẽ tự động tải các gói dữ liệu yêu cầu cho ta thông qua registry phân phối do hệ thống sinh lưu trữ ở trang chính gốc <code>Crates.io</code>.</p>

<h3 class="task-heading">Tạo một Số Ngẫu Nhiên (Generating a Random Number)</h3>
<p>Mở file <code>src/main.rs</code> của bạn lên nha, hãy gọi crate mới lấy đó vào bằng đoạn:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::io;
use rand::Rng;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    println!("The secret number is: {secret_number}");

    println!("Please input your guess.");
    // --snip--
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Lưu ý thuật ngữ:</strong> <em>trait</em> ở trong Rust có thể coi như một khuôn mẫu đặc tính (interface). <code>Rng</code> là một trait thuộc về viện <code>rand</code> quy đổi các phương thức hệ tạo ra các số ngẫu nhiên ngầm bên dưới.
</div>

<p>Hàm <code>rand::thread_rng</code> lấy 1 giá chức cung trình sinh số ngẫu ở trên luồng hoạt thực phân trên hệ. <code>gen_range</code> nó yêu có cầu cung nhận một phạm thông chứa của khoảng vi với định dấu <code>..=</code> (bao hàm cả mốc giá số). Bạn phải truyền <code>1..=100</code>.</p>
`,
      defaultCode: `use std::io;
use rand::Rng;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    println!("The secret number is: {secret_number}");
}
`,
      expectedOutput: 'Guess the number!\nThe secret number is: '
    },
    {
      id: 'ch02-04',
      title: '2.4 So sánh Số với Vòng lặp (Comparing & Looping)',
      duration: '35 phút',
      type: 'practice',
      content: `
<h3 class="task-heading">Tiến hành So sánh Số bí mật (Comparing the Guess to the Secret Number)</h3>
<p>Khi đó mà ta ở thời điểm đã nhận lấy xong con số đầu tay nhập của người dùng đoán là gì rồi, sau nữa lại gọi máy tính tự random đi con số bí mật. Phải đem cái đoạn mã đấy ra mà đưa chạy thi với nhau. Bạn nhập đoạn code dùng với match và tham biến của module <code>Ordering</code> nhé:</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::cmp::Ordering;
use std::io;
use rand::Rng;

fn main() {
    // --snip--
    println!("You guessed: {guess}");

    match guess.cmp(&amp;secret_number) {
        Ordering::Less =&gt; println!("Too small!"),
        Ordering::Greater =&gt; println!("Too big!"),
        Ordering::Equal =&gt; println!("You win!"),
    }
}</code></pre>
</div>
<p>Tuy vậy thì bạn phải tiến hành giải bước lỗi loại kiểm tra kiểu đi. Biến <code>guess</code> ban đầu mà chúng ta nhập vào thì là một <code>String</code>. Số ngẫu nhiên <code>secret_number</code> thì lại sinh với do <code>i32</code>. Bạn bắt buộc phải chuyển hệ của chữ sang số bằng kỹ thuật <code>Shadowing</code> che phủ bóng đi của biến giá!</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let guess: u32 = guess.trim().parse().expect("Please type a number!");</code></pre>
</div>
<p><code>trim()</code> dùng làm sạch phần kí tự xuống dòng, khoảng trắng ở hệ chuỗi do dùng dấu xuống khi nhấn nút trên hệ phím! Còn <code>parse()</code> bắt buộc ép ép ép bằng được 1 chữ phải ép loại trả cho lúc về thành 1 số dạng đúng chỉ dẫn thuộc <code>u32</code> của mã máy! Bằng không tạo ép là ngộp hỏng. Kết quả do đó cũng sinh ra bộ Result giống như cách của <code>read_line()</code> đã dùng lúc đầu mà bạn đã làm và hiểu đó.</p>

<h3 class="task-heading">Cho phép Nhiều Dự đoán bằng Vòng lặp (Allowing Multiple Guesses with Looping)</h3>
<p>Để cho chơi lại nhiều tới mức cho bực cũng đoán đoán mãi không dứt thì dùng với keyword sinh ra vòng lặp vô hạn ở Rust: <code>loop</code>.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// --snip--
    loop {
        println!("Please input your guess.");
        // --snip--
        match guess.cmp(&amp;secret_number) {
            Ordering::Less =&gt; println!("Too small!"),
            Ordering::Greater =&gt; println!("Too big!"),
            Ordering::Equal =&gt; {
                println!("You win!");
                break;
            }
        }
    }
}</code></pre>
</div>

<h3 class="task-heading">Thao Tác Xử Lý Lỗi (Handling Invalid Input)</h3>
<p>Nếu game sẽ bị sập vì do thằng ép kiểu <code>parse()</code> ở khúc bạn để chữ thường thay cho số: ta dùng thuộc phép rẽ nhánh của kiểu Result (giống lúc so sánh với số) thay cho expect nhen! Như thế này nè, thay thế với cục mã cũ!</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>        let guess: u32 = match guess.trim().parse() {
            Ok(num) =&gt; num,
            Err(_) =&gt; continue,
        };</code></pre>
</div>
<p>Nếu nó trả cái Ok của Result là số nó ép đúng, lấy biến số đó bỏ vô biến u32 mới tạo là đoán bằng <code>num</code> luôn! Nếu bị trả từ với Err (lỗi ép không được vì không đúng hệ số) thì lấy dấu ngạch ngang "_" này ra hứng rồi đè lên thực thi <code>continue</code> cho đi tiếp luôn đoạn chương không chập chờn sập do ép sai số.</p>
`,
      defaultCode: `// Viết nháp shadowing code của bạn vào hàm main()
fn main() {
    let mut guess = String::from("  42  ");
    
    // Đoạn code ép kiểu String 'guess' qua u32 tại đây!
    let guess: u32 = guess.trim().parse().expect("Không phải số à nha");
    
    println!("Giá trị đoán đã thành số nguyên: {guess}");
}
`,
      expectedOutput: 'Giá trị đoán đã thành số nguyên: 42'
    },
    {
      id: 'ch02-05',
      title: '2.5 Chương trình Hoàn chỉnh (Full Program)',
      duration: '30 phút',
      type: 'practice',
      content: `
<p>Chúc mừng! Bạn đã nắm giữ toàn bộ "vũ khí" để hoàn thành trò chơi đầu tay. Dưới đây là kiến trúc tổng thể của Guessing Game.</p>

<h3 class="task-heading">Những điều cần nhớ:</h3>
<ol class="lesson-list">
  <li>Dùng <code>rand::Rng</code> (bên ngoài thư viện chuẩn) để tạo số ngẫu nhiên.</li>
  <li>Sử dụng <code>std::io</code> để giao tiếp với người dùng và xử lí ép kiểu chữ sang u32.</li>
  <li>Kết hợp <code>loop</code> và <code>match</code> để tạo logic game mượt mà.</li>
</ol>

<div class="cyber-alert info">
  <strong>Thử thách:</strong> Ở code bên phải, tôi đã chuẩn bị khung sườn. Nhiệm vụ của bạn là ghép nối chúng lại để tạo ra một trò chơi đoán số hoàn hảo. (Hoặc là nhìn luôn kết quả nhé, vì bạn đã quá hiểu Rust rồi).
</div>
`,
      defaultCode: `use std::io;
use std::cmp::Ordering;

// Trong dự án thật, cần thêm rand vào Cargo.toml
// use rand::Rng;

fn main() {
    println!("Guess the number!");

    // Trong Rust chính thức, tạo số bí mật với:
    // let secret_number = rand::thread_rng().gen_range(1..=100);
    let secret_number = 77; // Ở phần sandbox này ta xài hard-code!
    
    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {guess}");

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
`,
      expectedOutput: 'Guess the number!\nPlease input your guess.'
    },
    {
      id: 'ch02-01-ex',
      title: 'Bài tập 2.1: Khởi tạo biến String',
      duration: '5 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy khởi tạo một biến có thể thay đổi để chứa dữ liệu nhập vào!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, hãy tạo một biến <strong>khả biến (mutable)</strong> tên là <code>guess</code>.</li>
  <li>Gán cho nó một đối tượng <code>String</code> mới và rỗng bằng cách gọi <code>String::new()</code>.</li>
</ol>
`,
      defaultCode: `fn main() {
    // Viết code của bạn ở đây
    
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_guess_variable() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "");
        
        let has_mut_guess = code_clean.contains("letmutguess=String::new();") || code_clean.contains("letmutguess:String=String::new();");
        assert!(has_mut_guess, "Bạn cần khai báo 'let mut guess = String::new();'");
    }
}
`
    },
    {
      id: 'ch02-04-ex',
      title: 'Bài tập 2.4: Shadowing và Ép kiểu',
      duration: '10 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy thực hành Shadowing để chuyển đổi kiểu dữ liệu!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Tôi có sẵn biến <code>guess</code> là một chuỗi <code>"  42  "</code>.</li>
  <li>Bạn hãy tạo một biến <code>guess</code> mới (shadowing) với kiểu <code>u32</code>.</li>
  <li>Sử dụng các phương thức <code>.trim()</code> và <code>.parse()</code> để chuyển đổi chuỗi đó thành số.</li>
  <li>Sử dụng <code>.expect()</code> để xử lý lỗi nếu không parse được.</li>
</ol>
`,
      defaultCode: `fn main() {
    let guess = "  42  ";
    
    // Viết lệnh shadowing ở đây
    // let guess: u32 = ...
    
    println!("Số đã parse: {}", guess);
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_shadowing_parse() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "");
        
        let has_shadowing = code_clean.contains("letguess:u32=guess.trim().parse().expect(");
        assert!(has_shadowing, "Bạn chưa thực hiện shadowing đúng cách: 'let guess: u32 = guess.trim().parse().expect(...);'");
    }
}
`
    },
    {
      id: 'ch02-05-ex',
      title: 'Bài tập 2.5: So sánh Matching',
      duration: '10 phút',
      type: 'practice',
      isExercise: true,
      content: `
<p>Hãy sử dụng biểu thức <code>match</code> để so sánh hai số!</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Trong hàm <code>main()</code>, tôi đã có <code>guess</code> và <code>secret_number</code>.</li>
  <li>Bạn hãy dùng <code>match guess.cmp(&secret_number)</code> để in ra:</li>
  <ul>
    <li><code>Ordering::Less</code> => "Too small!"</li>
    <li><code>Ordering::Greater</code> => "Too big!"</li>
    <li><code>Ordering::Equal</code> => "You win!"</li>
  </ul>
</ol>
`,
      defaultCode: `use std::cmp::Ordering;

fn main() {
    let guess = 50;
    let secret_number = 77;
    
    // Viết khối match so sánh ở đây
    
}
`,
      testCode: `
#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_match_ordering() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");
        let code_clean = code.replace(" ", "").replace("\n", "");
        
        assert!(code_clean.contains("Ordering::Less=>println!(\"Toosmall!\")"), "Thiếu trường hợp Less");
        assert!(code_clean.contains("Ordering::Greater=>println!(\"Toobig!\")"), "Thiếu trường hợp Greater");
        assert!(code_clean.contains("Ordering::Equal=>println!(\"Youwin!\")"), "Thiếu trường hợp Equal");
    }
}
`
    }
  ]
};
