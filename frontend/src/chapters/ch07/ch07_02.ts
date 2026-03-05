import { Lesson } from '../../courses';

export const ch07_02: Lesson = {
      id: 'ch07-02',
      title: '7.2 Định nghĩa Modules & Điều khiển Phạm vi (Scope/Privacy)',
      duration: '40 phút',
      type: 'practice',
      content: `
<p>Bây giờ chúng mình sẽ bàn bạc kĩ về <strong>Modules</strong> và các thành phần thuộc hệ thống modules khác — đáng phải kể đến nhất là các path mà bạn phải xài liên tục để reference tới các thẻ item; từ khóa <code>use</code> thần thánh giúp mình đem cả path vô scope rút gọn; và chốt hạ là bộ tứ keyword <code>pub</code> giúp đồ chơi của bạn trở thành dạng Lộ Thiên (public) được cho phép các bên ngoài dùng!!</p>
<p>Các Modules chắp cánh cho việc tổ chức source code trong từng khía cạnh của cái Crate thành các Group (khối nhóm) để quản lý readability (dễ đọc) và reuse (dễ xài lại). Không chỉ vậy Module con kiểm soát cái gọi la <strong>privacy</strong> của những dòng code đó. Tức là những logic mã nào thì người đời được đụng vô, còn cái nào là Private giấu kĩ vào trong (để dấu mấy chi tiết rườm rà ko bảo mật ko cho can thiệp linh tinh).</p>

<h3 class="task-heading">Khai báo Modules để sắp xếp sảnh hệ thống</h3>
<p>Ráng tượng tưởng chúng mình đang code lib phục vụ cái Nhà Hàng (restaurant). Nhà hàng có một sảnh đón khách lớn (front of house): host đón gác, xếp ghế, bồi bàn. Bếp đằng sau (back of house) thì nấu, sửa bill.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}
        fn serve_order() {}
        fn take_payment() {}
    }
}</code></pre>
</div>
<p>Tương tự như OOP, modules được định nghĩa vô cùng nhanh nhờ bằng chặng keyword <code>mod</code> theo sau bởi cái Tên của module!. Sau đó nhét thân hàm nằm gọn gàng bên trong hai cái Cặp ngoặc nhọn <code>{}</code> là hoàn tất cấu trúc lồng tree.</p>

<h3 class="task-heading">Hệ thống Paths cho Modules trong Tree Navigation</h3>
<p>Việc định vị đường đi tới các Functions trong ruột module thì Rust sử dụng một chuỗi khái niệm gọi là <strong>path</strong> y đúc lúc bạn lướt cây Folder trong máy móc tính. Hệ Cây Paths chia thành 2 phe:</p>
<ul class="task-list">
  <li><strong>Absolute path (Đường dẫn Tuyệt Đối):</strong> Bắt đầu một mạch từ tận <code>crate</code> root, khởi đầu bằng Keyword thần thánh tên <code>crate</code>.</li>
  <li><strong>Relative path (Đường dẫn Tương Đối):</strong> Xuất phát ngay lúc tại địa điểm module vắng mặt, xài thông qua <code>self</code>, <code>super</code> hoặc ngay tên thư viện của module ở bên.</li>
</ul>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}
pub fn eat_at_restaurant() {
    // Gọi theo Absolute path 
    crate::front_of_house::hosting::add_to_waitlist();
    // Gọi theo Relative path
    front_of_house::hosting::add_to_waitlist();
}</code></pre>
</div>

<h3 class="task-heading">Bật Công Tắc bằng pub keyword</h3>
<p>Code Rust làm cực kì Găt về Privacy: MỌI ITEM LÀ PRIVATE MỘT CÁCH MẶC ĐỊNH BẤT DI BẤT DỊCH (bao gồm function, method, struct, enum, module...). Tức là các items ở modules dạng Cấp Cha không thể nào thò tay mò đụng trọt các items bên rỗng Module con của nó (Trừ phi đồ dùng <code>pub</code>!!!).</p>

<div class="cyber-alert info">
  <strong>Mẹo hệ thống:</strong> Đừng hiểu nhầm nhầm! Module Cấp Con lại vương miện quyền năng NHÌN THẤY MỌI THỨ của Module cha (cho dù private). Do Rust nói rằng con cái thì nên biết mọi chi tiết dơ bẩn của cha chú mình mà giấu kín trước public xã hội.
</div>
  
<h3 class="task-heading">Bắt rớt xuống Module Cha bằng super</h3>
<p>Rust tạo ra Relative Path theo cách xài <code>super</code> để lấy từ cha trở đi. Điều này giống trò <code>..</code> syntax lúc bạn lướt Path hệ điều hành filesystem để đi ra sau 1 cấp.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn deliver_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order(); // Lấy hàm deliver_order ở cha Crate!!!
    }
    fn cook_order() {}
}</code></pre>
</div>
`,
      defaultCode: `mod math {
    pub fn add(a: i32, b: i32) -> i32 {
        a + b
    }

    pub fn multiply(a: i32, b: i32) -> i32 {
        a * b
    }

    pub mod advanced {
        pub fn power(base: i32, exp: u32) -> i32 {
            let mut result = 1;
            for _ in 0..exp {
                result = super::multiply(result, base);
            }
            result
        }
    }
}

fn main() {
    let sum = math::add(5, 3);
    let product = math::multiply(4, 7);
    let pow = math::advanced::power(2, 10);

    println!("5 + 3 = {sum}");
    println!("4 × 7 = {product}");
    println!("2^10 = {pow}");
}
`,
      expectedOutput: '5 + 3 = 8\n4 × 7 = 28\n2^10 = 1024'
    };
