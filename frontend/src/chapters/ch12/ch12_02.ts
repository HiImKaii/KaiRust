import { Lesson } from '../../courses';

export const ch12_02: Lesson = {
            id: 'ch12-02',
            title: '12.2 Đọc File',
            duration: '25 phút',
            type: 'theory',
            content: `
<p>Bây giờ chúng ta sẽ thêm chức năng đọc file được chỉ định trong argument file_path. Trước tiên, chúng ta cần một file mẫu để test: Chúng ta sẽ sử dụng một file với một lượng nhỏ text trên nhiều dòng với một số từ lặp lại. Listing 12-3 có một bài thơ Emily Dickinson sẽ hoạt động tốt! Tạo một file tên là poem.txt ở root level của project của bạn, và nhập bài thơ "I'm Nobody! Who are you?"</p>
<p>Filename: poem.txt</p>

<div class="code-snippet">
  <span class="code-lang">text</span>
  <pre><code>I'm nobody! Who are you?
Are you nobody, too?
Then there's a pair of us - don't tell!
They'd banish us, you know.

How dreary to be somebody!
How public, like a frog
To tell your name the livelong day
To an admiring bog!</code></pre>
</div>
<p><em>Listing 12-3: A poem by Emily Dickinson makes a good test case.</em></p>

<p>Với text đã có, edit src/main.rs và thêm code để đọc file, như được hiển thị trong Listing 12-4.</p>
<p>Filename: src/main.rs</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::env;
use std::fs;

fn main() {
    // --snip--
    println!("In file {file_path}");

    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");

    println!("With text:\n{contents}");
}</code></pre>
</div>
<p><em>Listing 12-4: Reading the contents of the file specified by the second argument</em></p>

<p>Trước tiên, chúng ta đưa một phần relevant của standard library với một use statement: Chúng ta cần std::fs để xử lý files.</p>

<p>Trong main, statement mới fs::read_to_string lấy file_path, mở file đó, và trả về một giá trị kiểu std::io::Result<String> chứa nội dung của file.</p>

<p>Sau đó, chúng ta lại thêm một temporary println! statement in giá trị của contents sau khi file được đọc để chúng ta có thể kiểm tra chương trình đang hoạt động cho đến giờ.</p>

<p>Hãy chạy code này với bất kỳ chuỗi nào làm command line argument đầu tiên (vì chúng ta chưa implement phần tìm kiếm) và file poem.txt làm argument thứ hai:</p>

<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo run -- the poem.txt
   Compiling minigrep v0.1.0 (file:///projects/minigrep)
    Finished \`dev\` profile [unoptimized + debuginfo] target(s) in 0.0s
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

<p>Tuyệt vời! Code đã đọc và sau đó in nội dung của file. Nhưng code có một vài nhược điểm. Hiện tại, function main có nhiều responsibilities: Nói chung, functions rõ ràng và dễ maintain hơn nếu mỗi function chịu trách nhiệm cho chỉ một ý tưởng. Vấn đề khác là chúng ta không xử lý errors tốt như có thể. Chương trình vẫn còn nhỏ, vì vậy những nhược điểm này không phải là vấn đề lớn, nhưng khi chương trình phát triển, sẽ khó sửa chúng một cách sạch sẽ. Đó là một thực hành tốt để bắt đầu refactoring sớm khi phát triển một chương trình vì nó dễ dàng hơn nhiều để refactor một lượng nhỏ code. Chúng ta sẽ làm điều đó tiếp theo.</p>

<div class="cyber-alert info">
  <strong>Tóm tắt đọc File:</strong>
  <ul>
    <li><strong>std::fs::read_to_string(path)</strong> - Đọc toàn bộ file thành String</li>
    <li><strong>std::io::Result&lt;String&gt;</strong> - Kiểu trả về chứa nội dung file</li>
    <li><strong>.expect()</strong> - Xử lý lỗi với panic message</li>
    <li><strong>Refactoring</strong> - Tách main thành nhiều functions nhỏ</li>
  </ul>
</div>
`,
            defaultCode: `use std::fs;

fn main() {
    let file_path = "poem.txt";

    // Đọc nội dung file
    let contents = fs::read_to_string(file_path)
        .expect("Khong the doc duoc file");

    println!("=== Noi dung file {} ===", file_path);
    println!("{}", contents);

    // Tìm kiếm đơn giản
    let query = "nobody";
    println!("\\n=== Tim kiem '{}' ===", query);

    for line in contents.lines() {
        if line.to_lowercase().contains(&query.to_lowercase()) {
            println!("  > {}", line);
        }
    }
}
`,
            expectedOutput: '=== Noi dung file poem.txt ===\nI\'m nobody! Who are you?\nAre you nobody, too?\nThen there\'s a pair of us - don\'t tell!\nThey\'d banish us, you know.\n\nHow dreary to be somebody!\nHow public, like a frog\nTo tell your name the livelong day\nTo an admiring bog!\n\n=== Tim kiem \'nobody\' ===\n  > I\'m nobody! Who are you?\n  > Are you nobody, too?'
        };
