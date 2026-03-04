import { Chapter } from '../courses';

export const ch12: Chapter = {
    id: 'ch12',
    title: 'Chương 12: Dự án I/O: grep CLI',
    lessons: [
        {
            id: 'ch12-01',
            title: '12.1 Nhận tham số command line',
            duration: '15 phút',
            type: 'practice',
            content: `
<p>Chương này build dự án thực tế: công cụ CLI tìm kiếm text trong file, tương tự <code>grep</code>. Qua đó áp dụng nhiều khái niệm đã học.</p>

<h3 class="task-heading">Đọc command line arguments</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::env;

fn main() {
    let args: Vec&lt;String&gt; = env::args().collect();
    let query = &args[1];
    let file_path = &args[2];
    println!("Tìm: {query}");
    println!("Trong file: {file_path}");
}</code></pre>
</div>

<h3 class="task-heading">Đọc file</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::fs;

fn main() {
    let contents = fs::read_to_string(file_path)
        .expect("Không đọc được file");
    println!("Nội dung:\\n{contents}");
}</code></pre>
</div>
`,
            defaultCode: `// Mô phỏng minigrep - tìm kiếm text
fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();
    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }
    results
}

fn main() {
    let poem = "Tôi yêu Rust,
Rust rất an toàn,
Memory safety tuyệt vời,
Rust giúp tôi code tốt hơn,
Không lo null pointer!";

    let query = "Rust";
    println!("Tìm '{query}' trong poem:");
    println!("---");

    let results = search(query, poem);
    for line in results {
        println!("  > {line}");
    }
}
`,
            expectedOutput: 'Tìm \'Rust\' trong poem:\n---\n  > Tôi yêu Rust,\n  > Rust rất an toàn,\n  > Rust giúp tôi code tốt hơn,'
        },
        {
            id: 'ch12-02',
            title: '12.2 Refactor và Error Handling',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Tách logic từ <code>main</code> ra module riêng, xử lý lỗi đúng cách.</p>

<h3 class="task-heading">Tổ chức code</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// src/lib.rs
use std::error::Error;
use std::fs;

pub struct Config {
    pub query: String,
    pub file_path: String,
}

impl Config {
    pub fn build(args: &[String]) -> Result&lt;Config, &'static str&gt; {
        if args.len() < 3 {
            return Err("Cần 2 tham số: query và file_path");
        }
        Ok(Config {
            query: args[1].clone(),
            file_path: args[2].clone(),
        })
    }
}

pub fn run(config: Config) -> Result&lt;(), Box&lt;dyn Error&gt;&gt; {
    let contents = fs::read_to_string(config.file_path)?;
    for line in search(&config.query, &contents) {
        println!("{line}");
    }
    Ok(())
}</code></pre>
</div>

<h3 class="task-heading">Sử dụng process::exit</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>use std::process;

fn main() {
    let config = Config::build(&args).unwrap_or_else(|err| {
        eprintln!("Lỗi parse arguments: {err}");
        process::exit(1);
    });

    if let Err(e) = run(config) {
        eprintln!("Lỗi: {e}");
        process::exit(1);
    }
}</code></pre>
</div>

<div class="cyber-alert info">
  <strong>Best practices từ dự án:</strong>
  <ul>
    <li>Tách binary (<code>main.rs</code>) và logic (<code>lib.rs</code>)</li>
    <li>Dùng <code>eprintln!</code> cho lỗi (stderr), <code>println!</code> cho output (stdout)</li>
    <li>Trả về <code>Result</code> thay vì <code>panic!</code></li>
  </ul>
</div>
`,
            defaultCode: `use std::error::Error;

struct Config {
    query: String,
    case_insensitive: bool,
}

impl Config {
    fn new(query: &str, case_insensitive: bool) -> Self {
        Config {
            query: query.to_string(),
            case_insensitive,
        }
    }
}

fn search<'a>(query: &str, contents: &'a str, case_insensitive: bool) -> Vec<&'a str> {
    if case_insensitive {
        let query = query.to_lowercase();
        contents.lines()
            .filter(|line| line.to_lowercase().contains(&query))
            .collect()
    } else {
        contents.lines()
            .filter(|line| line.contains(query))
            .collect()
    }
}

fn main() {
    let contents = "Rust is fast
Trust the compiler
RUST handles memory safely
Learning rust is fun";

    let config = Config::new("rust", false);
    println!("Case sensitive '{}':", config.query);
    for line in search(&config.query, contents, config.case_insensitive) {
        println!("  {line}");
    }

    let config = Config::new("rust", true);
    println!("\\nCase insensitive '{}':", config.query);
    for line in search(&config.query, contents, config.case_insensitive) {
        println!("  {line}");
    }
}
`,
            expectedOutput: 'Case sensitive \'rust\':\n  Learning rust is fun\n\nCase insensitive \'rust\':\n  Rust is fast\n  Trust the compiler\n  RUST handles memory safely\n  Learning rust is fun'
        }
    ]
};
