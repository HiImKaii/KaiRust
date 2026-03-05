import { Lesson } from '../../courses';

export const ch10_03: Lesson = {
            id: 'ch10-03',
            title: '10.3 Lifetimes',
            duration: '30 phút',
            type: 'theory',
            content: `
<p><strong>Lifetimes</strong> là hệ thống unique của Rust đảm bảo mọi reference đều hợp lệ. Lifetime annotation cho bạn biết reference sống bao lâu.</p>

<h3 class="task-heading">Vấn đề: Dangling References</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// LỖI COMPILE!
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() { x } else { y }
}
// Compiler không biết return value sống bao lâu!</code></pre>
</div>

<h3 class="task-heading">Lifetime Annotations</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
// 'a nghĩa là: return value sống ít nhất bằng
// lifetime ngắn nhất của x và y</code></pre>
</div>

<h3 class="task-heading">Lifetime trong Structs</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct ImportantExcerpt<'a> {
    part: &'a str,
}

let novel = String::from("Call me Ishmael. Some years ago...");
let first_sentence = novel.split('.').next().unwrap();
let i = ImportantExcerpt {
    part: first_sentence,
};</code></pre>
</div>

<h3 class="task-heading">Lifetime Elision Rules</h3>
<p>Compiler tự suy luận lifetime trong 3 trường hợp:</p>
<ol>
  <li>Mỗi reference parameter nhận lifetime riêng</li>
  <li>Nếu chỉ có 1 input lifetime → output dùng lifetime đó</li>
  <li>Nếu có <code>&self</code> → output dùng lifetime của self</li>
</ol>

<h3 class="task-heading">Static Lifetime</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>// 'static sống suốt chương trình
let s: &'static str = "Tôi sống mãi mãi";</code></pre>
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
