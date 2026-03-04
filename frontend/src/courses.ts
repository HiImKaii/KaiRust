// =====================================================
// KaiRust Course Data — Sourced from "The Rust Programming Language" Book
// Structure: Chapter > Lessons
// =====================================================

export interface Lesson {
    id: string;
    title: string;
    duration: string;     // estimated reading/practice time
    type: 'theory' | 'practice' | 'quiz';
    content: string;      // HTML content for instruction panel
    defaultCode?: string; // pre-filled code for Monaco editor
    expectedOutput?: string;
}

export interface Chapter {
    id: string;
    title: string;
    lessons: Lesson[];
}

export const courseData: Chapter[] = [
    {
        id: 'ch01',
        title: 'Chương 1: Bắt đầu với Rust',
        lessons: [
            {
                id: 'ch01-01',
                title: '1.1 Cài đặt Rust (Installation)',
                duration: '10 phút',
                type: 'theory',
                content: `
<p>Bước đầu tiên là cài đặt Rust. Chúng ta sẽ tải Rust thông qua <code>rustup</code>, một công cụ dòng lệnh để quản lý các phiên bản Rust và các công cụ liên quan.</p>

<div class="cyber-alert info">
  <strong>Lưu ý:</strong> Bạn cần có kết nối internet để tải xuống. Phiên bản Rust mới nhất được sử dụng trong khóa học là <code>Rust 1.90.0</code> trở lên.
</div>

<h3 class="task-heading">Cài đặt trên Linux hoặc macOS</h3>
<p>Mở terminal và nhập lệnh sau:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh</code></pre>
</div>
<p>Lệnh sẽ tải về một script và bắt đầu cài đặt công cụ <code>rustup</code>, sẽ cài đặt phiên bản ổn định mới nhất của Rust. Nếu cài đặt thành công, bạn sẽ thấy dòng:</p>
<div class="code-snippet">
  <span class="code-lang">output</span>
  <pre><code>Rust is installed now. Great!</code></pre>
</div>

<p>Bạn cũng cần một <strong>linker</strong> — một chương trình mà Rust sử dụng để nối các output đã biên dịch thành một file. Trên Linux, hãy cài gói <code>build-essential</code> (Ubuntu) hoặc GCC/Clang tùy theo bản phân phối.</p>

<h3 class="task-heading">Cài đặt trên Windows</h3>
<p>Truy cập <a href="https://www.rust-lang.org/tools/install" target="_blank">https://www.rust-lang.org/tools/install</a> và làm theo hướng dẫn. Bạn sẽ cần cài Visual Studio để có linker và native libraries.</p>

<h3 class="task-heading">Kiểm tra cài đặt</h3>
<p>Sau khi cài xong, mở terminal và kiểm tra:</p>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ rustc --version
rustc x.y.z (abcabcabc yyyy-mm-dd)</code></pre>
</div>
<p>Nếu bạn thấy số phiên bản, Rust đã được cài đặt thành công!</p>

<h3 class="task-heading">Cập nhật và Gỡ cài đặt</h3>
<ul class="task-list">
  <li>Cập nhật: <code>rustup update</code></li>
  <li>Gỡ cài đặt: <code>rustup self uninstall</code></li>
  <li>Xem tài liệu offline: <code>rustup doc</code></li>
</ul>
`,
                defaultCode: `// Hãy thử chạy lệnh này trong terminal của bạn:
// $ rustc --version
// $ cargo --version

fn main() {
    println!("Rust đã được cài đặt thành công!");
    println!("Phiên bản rustc: kiểm tra bằng lệnh rustc --version");
}
`,
                expectedOutput: 'Rust đã được cài đặt thành công!\nPhiên bản rustc: kiểm tra bằng lệnh rustc --version'
            },
            {
                id: 'ch01-02',
                title: '1.2 Hello, World!',
                duration: '15 phút',
                type: 'practice',
                content: `
<p>Bây giờ bạn đã cài Rust, hãy viết chương trình đầu tiên. Theo truyền thống khi học ngôn ngữ mới, ta sẽ viết chương trình in ra dòng chữ <code>Hello, world!</code> trên màn hình.</p>

<h3 class="task-heading">Tạo thư mục dự án</h3>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ mkdir ~/projects
$ cd ~/projects
$ mkdir hello_world
$ cd hello_world</code></pre>
</div>

<h3 class="task-heading">Viết chương trình</h3>
<p>Tạo file <code>main.rs</code> và nhập mã nguồn sau:</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    println!("Hello, world!");
}</code></pre>
</div>

<h3 class="task-heading">Phân tích cấu trúc chương trình Rust</h3>
<p>Hàm <code>main</code> là hàm đặc biệt — luôn luôn là đoạn code đầu tiên chạy trong mọi chương trình Rust.</p>

<div class="cyber-alert info">
  <strong>Lưu ý quan trọng:</strong> <code>println!</code> gọi một <strong>macro</strong> của Rust (chú ý dấu <code>!</code>). Macro không hoàn toàn giống hàm thông thường. Dấu chấm phẩy <code>;</code> ở cuối dòng cho biết biểu thức đã kết thúc.
</div>

<h3 class="task-heading">Biên dịch và Chạy</h3>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ rustc main.rs
$ ./main
Hello, world!</code></pre>
</div>
<p>Rust là ngôn ngữ <strong>biên dịch trước (ahead-of-time compiled)</strong>. Bạn biên dịch xong, file thực thi có thể gửi cho người khác chạy mà không cần cài Rust.</p>

<h3 class="task-heading">Bài tập:</h3>
<ul class="task-list">
  <li>Viết chương trình in ra <code>Hello, world!</code></li>
  <li>Thử thay đổi nội dung chuỗi và chạy lại</li>
</ul>
`,
                defaultCode: `fn main() {
    // TODO: In ra "Hello, world!" bằng println! macro
    
}
`,
                expectedOutput: 'Hello, world!'
            },
            {
                id: 'ch01-03',
                title: '1.3 Hello, Cargo!',
                duration: '20 phút',
                type: 'practice',
                content: `
<p><strong>Cargo</strong> là hệ thống build và quản lý package của Rust. Hầu hết lập trình viên Rust đều sử dụng Cargo vì nó xử lý nhiều tác vụ: biên dịch code, tải thư viện phụ thuộc, và build các thư viện đó.</p>

<div class="cyber-alert info">
  <strong>Kiểm tra Cargo:</strong> Cargo được cài sẵn cùng Rust nếu bạn dùng bộ cài chính thức. Kiểm tra bằng lệnh: <code>cargo --version</code>
</div>

<h3 class="task-heading">Tạo dự án với Cargo</h3>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code>$ cargo new hello_cargo
$ cd hello_cargo</code></pre>
</div>
<p>Cargo tạo ra 2 file và 1 thư mục: <code>Cargo.toml</code> (file cấu hình) và thư mục <code>src</code> chứa <code>main.rs</code>. File <code>Cargo.toml</code> sử dụng định dạng TOML:</p>
<div class="code-snippet">
  <span class="code-lang">toml</span>
  <pre><code>[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2024"

[dependencies]</code></pre>
</div>

<h3 class="task-heading">Build và Chạy với Cargo</h3>
<div class="code-snippet">
  <span class="code-lang">bash</span>
  <pre><code># Build dự án
$ cargo build

# Build và chạy cùng lúc
$ cargo run

# Kiểm tra compile mà không tạo binary
$ cargo check

# Build tối ưu cho release
$ cargo build --release</code></pre>
</div>

<h3 class="task-heading">Tóm tắt các lệnh Cargo quan trọng</h3>
<ul class="task-list">
  <li><code>cargo new</code> — Tạo dự án mới</li>
  <li><code>cargo build</code> — Build dự án</li>
  <li><code>cargo run</code> — Build và chạy ngay</li>
  <li><code>cargo check</code> — Kiểm tra lỗi compile nhanh (không tạo binary)</li>
  <li><code>cargo build --release</code> — Build tối ưu cho phát hành</li>
</ul>

<h3 class="task-heading">Bài tập:</h3>
<ul class="task-list">
  <li>Tạo một dự án Cargo mới và in ra tên của bạn</li>
  <li>Thử chạy <code>cargo run</code> hai lần liên tiếp — lần thứ hai có khác gì không?</li>
</ul>
`,
                defaultCode: `// Đây là file src/main.rs được Cargo tạo tự động
// Khi bạn chạy "cargo new hello_cargo"

fn main() {
    println!("Hello, Cargo!");
    
    // TODO: Thêm tên của bạn vào đây
    // println!("Tôi là ...");
}
`,
                expectedOutput: 'Hello, Cargo!'
            }
        ]
    },
    {
        id: 'ch02',
        title: 'Chương 2: Lập trình trò chơi đoán số',
        lessons: []
    },
    {
        id: 'ch03',
        title: 'Chương 3: Các khái niệm lập trình phổ biến',
        lessons: []
    },
    {
        id: 'ch04',
        title: 'Chương 4: Hiểu về Ownership',
        lessons: []
    },
    {
        id: 'ch05',
        title: 'Chương 5: Sử dụng Structs',
        lessons: []
    },
    {
        id: 'ch06',
        title: 'Chương 6: Enums và Pattern Matching',
        lessons: []
    },
    {
        id: 'ch07',
        title: 'Chương 7: Quản lý Packages, Crates, Modules',
        lessons: []
    },
    {
        id: 'ch08',
        title: 'Chương 8: Collections phổ biến',
        lessons: []
    },
    {
        id: 'ch09',
        title: 'Chương 9: Xử lý lỗi (Error Handling)',
        lessons: []
    },
    {
        id: 'ch10',
        title: 'Chương 10: Generics, Traits, Lifetimes',
        lessons: []
    },
    {
        id: 'ch11',
        title: 'Chương 11: Viết Automated Tests',
        lessons: []
    },
    {
        id: 'ch12',
        title: 'Chương 12: Dự án I/O: grep CLI',
        lessons: []
    },
    {
        id: 'ch13',
        title: 'Chương 13: Closures và Iterators',
        lessons: []
    },
    {
        id: 'ch14',
        title: 'Chương 14: Cargo và Crates.io',
        lessons: []
    },
    {
        id: 'ch15',
        title: 'Chương 15: Smart Pointers',
        lessons: []
    },
    {
        id: 'ch16',
        title: 'Chương 16: Concurrency (Đa luồng)',
        lessons: []
    },
    {
        id: 'ch17',
        title: 'Chương 17: Async và Await',
        lessons: []
    },
    {
        id: 'ch18',
        title: 'Chương 18: OOP trong Rust',
        lessons: []
    },
    {
        id: 'ch19',
        title: 'Chương 19: Patterns và Matching',
        lessons: []
    },
    {
        id: 'ch20',
        title: 'Chương 20: Advanced Features',
        lessons: []
    }
];
