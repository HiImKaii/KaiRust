import { Lesson } from '../../courses';

export const ch05_02: Lesson = {
            id: 'ch05-02',
            title: '5.2 Ví dụ thực tế với Structs',
            duration: '35 phút',
            type: 'practice',
            content: `
<p>Để thực sự hiểu cách hoạt động của structs khi chúng ta code thật, hãy tạo ra một ứng dụng siêu nhỏ để tính tổng mảng diện tích của một hình chữ nhật nào đó! Chúng ta cũng khám phá ra cách mà những built-in traits của Rust giúp việc in struct một cách xinh đẹp ra command prompt.</p>

<p>Xài các variables truyền thống, để tính một cái hàm thì phải quăng parameter vô và nhận return value qua bên kia.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn main() {
    let width1 = 30;
    let height1 = 50;
    println!("The area of the rectangle is {} square pixels.", area(width1, height1));
}

fn area(width: u32, height: u32) -> u32 {
    width * height
}</code></pre>
</div>
<p>Hàm <code>area(width: u32, height: u32) -> u32</code> ở trên bị vấn đề với việc những param không có tính móc nối chặt chẽ trực tiếp đối với cái mục đích để sinh hàm (tìm diện tích) mà thay vì đó truyền 2 cái biến rời rạc. Vấn đề chỉ có thể tối ưa bằng xài cái Struct <code>Rectangle</code>!</p>

<h3 class="task-heading">Cấu trúc hóa đoạn mã với Struct</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("The area of the rectangle is {} square pixels.", area(&rect1));
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}</code></pre>
</div>
<p>Trong phiên bản struct thì hàm tính diện tích của ta được fix <code>area(rectangle: &Rectangle) -> u32</code> truyền mỗi 1 đối số. Thay vì truyền giá trị ownership nguyên gốc vào, chúng ra nên truyền qua cái <strong>borrowing</strong> reference của Instance đó, việc in giá trị và trả vế sẽ ko mất mát gì mà cũng cực kì dễ dàng. (Chỉ xài Immutable borrow là quá đủ tại vì ko cần thay đổi gì!).</p>

<h3 class="task-heading">Vấn đề kinh điển của Struct khi xài debug Println</h3>
<p>Hãy cùng test coi liệu một ngày đẹp trới tui có thể show hẳn luôn cái Cấu trúc <code>Rectangle</code> của mình ra <code>println!</code> không nè.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>struct Rectangle {
    width: u32,
    height: u32,
}
fn main() {
    let rect1 = Rectangle { width: 30, height: 50, };
    println!("rect1 is {}", rect1); // LỖI COMPILE!!!!!
}</code></pre>
</div>
<p>Lỗi tại vì <code>println!</code> xài format <code>Display</code> nhưng mà format Default là không support việc in struct ra (đơn giản vì ko biết cấu trúc user định xài in sao). Do đó chỉ việc đổi một format mới thay thế Display đi là cái <strong>format <code>Debug {:?}</code></strong>.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>println!("rect1 is {:?}", rect1); // Vẫn bị lỗi xíu xiu!</code></pre>
</div>
<p>Tại vì Print debug nó ko có được auto enable cái thuộc tích, để cho struct bật được in Debug ở Rust ta phải cấp cho nó thứ gọi là một tính tăng derive. Khá đơn giải để dùng bằng cách chèn lên code tên struct đoạn <code>#[derive(Debug)]</code> trước khai báo!</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    println!("rect1 is {:?}", rect1); // In kết quả chuẩn: "rect1 is Rectangle { width: 30, height: 50 }"
    println!("rect1 is {:#?}", rect1); // In cực chuẩn với dòng lệnh siêu bảnh xuống dòng cho từng property.
}</code></pre>
</div>

<h3 class="task-heading">Sức mạnh của Dbg! macro</h3>
<p>Khi bạn cần in gì đó trong một dòng code hoặc debug mà thấy gõ lệnh <code>println!</code> mỏi tay quá, bạn sẽ cực khoái xài cái marco siêu việt <code>dbg!</code>. Nó sẽ in vào (standard error console stream) giá trình nguyên bản + VỊ TRÍ DÒNG CODE đó. Điểm mạnh ở chỗ không giống <code>println!</code> - thứ lấy reference - <code>dbg!</code> lại take luôn Ownership và trả lại y chang Ownership về chỗ cũ sau cú nhấp run.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
struct Rectangle { width: u32, height: u32 }

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale), // dbg! return lại kết quả để xài gán như cũ (30*2=60)
        height: 50,
    };
    dbg!(&rect1); // Dùng tham chiếu để không dính Ownership cho rect1 (nếu ko xài reference rớt mất value ráng chịu)
}</code></pre>
</div>
<div class="cyber-alert info">
  <strong>Về output:</strong> <code>dbg!</code> xuất hiện dưới mẫu <code>[src/main.rs:7] 30 * scale = 60</code> ngay khu vực command. Khá ngon cho bug finder!
</div>
`,
            defaultCode: `#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };
    let rect3 = Rectangle { width: 60, height: 45 };

    println!("rect1: {:?}", rect1);
    println!("Diện tích rect1: {}", area(&rect1));
    println!("Diện tích rect2: {}", area(&rect2));
    println!("Diện tích rect3: {}", area(&rect3));
}

fn area(rect: &Rectangle) -> u32 {
    rect.width * rect.height
}
`,
            expectedOutput: 'rect1: Rectangle { width: 30, height: 50 }\nDiện tích rect1: 1500\nDiện tích rect2: 400\nDiện tích rect3: 2700'
        };
