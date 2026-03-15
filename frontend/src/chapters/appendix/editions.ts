import { Lesson } from '../../courses';

export const editions: Lesson = {
            id: 'appendix-e',
            title: 'Appendix E: Editions',
            duration: '20 phút',
            type: 'theory',
            content: `
<p>Trong Chương 1, bạn đã thấy rằng cargo new thêm một chút metadata vào file Cargo.toml của bạn về một edition. Phụ lục này nói về điều đó có nghĩa gì!</p>

<p>Ngôn ngữ Rust và compiler có một chu kỳ release sáu tuần, có nghĩa là users nhận được một luồng liên tục các tính năng mới. Các ngôn ngữ lập trình khác release các thay đổi lớn hơn ít thường xuyên hơn; Rust release các cập nhật nhỏ hơn thường xuyên hơn. Sau một thời gian, tất cả những thay đổi nhỏ này tích lũy lại. Nhưng từ release này đến release khác, có thể khó nhìn lại và nói, "Wow, giữa Rust 1.10 và Rust 1.31, Rust đã thay đổi rất nhiều!"</p>

<p>Cứ khoảng ba năm một lần, Rust team produces một edition mới của Rust. Mỗi edition brings together các features đã landed thành một package rõ ràng với documentation và tooling được cập nhật đầy đủ. New editions ship như một phần của quá trình release sáu tuần thông thường.</p>

<p>Editions phục vụ các mục đích khác nhau cho những người khác nhau:</p>

<ul>
  <li>Cho những người đang sử dụng Rust tích cực, một edition mới brings together các thay đổi tăng dần thành một package dễ hiểu.</li>
  <li>Cho những người không sử dụng, một edition mới signals rằng một số tiến bộ lớn đã được thực hiện, điều này có thể khiến Rust đáng để thử lại.</li>
  <li>Cho những người đang phát triển Rust, một edition mới cung cấp một điểm rallying cho project nói chung.</li>
</ul>

<p>Tại thời điểm viết bài này, bốn Rust editions có sẵn: Rust 2015, Rust 2018, Rust 2021, và Rust 2024. Cuốn sách này được viết sử dụng Rust 2024 edition idioms.</p>

<p>Edition key trong Cargo.toml chỉ định edition nào mà compiler nên sử dụng cho code của bạn. Nếu key không tồn tại, Rust sử dụng 2015 làm edition value vì lý do backward compatibility.</p>

<p>Mỗi project có thể opt in vào một edition khác với edition mặc định 2015. Editions có thể chứa các thay đổi không tương thích, chẳng hạn như bao gồm một keyword mới xung đột với identifiers trong code. Tuy nhiên, trừ khi bạn opt in vào những thay đổi đó, code của bạn sẽ tiếp tục compile ngay cả khi bạn nâng cấp Rust compiler version bạn sử dụng.</p>

<p>Tất cả Rust compiler versions support bất kỳ edition nào tồn tại trước release của compiler đó, và chúng có thể link crates của bất kỳ supported editions nào cùng nhau. Edition changes chỉ affect cách compiler ban đầu parse code. Do đó, nếu bạn đang sử dụng Rust 2015 và một trong các dependencies của bạn sử dụng Rust 2018, project của bạn sẽ compile và có thể sử dụng dependency đó. Tình huống ngược lại, nơi project của bạn sử dụng Rust 2018 và một dependency sử dụng Rust 2015, cũng hoạt động.</p>

<p>Để rõ ràng: Hầu hết các features sẽ có sẵn trên tất cả các editions. Các developers sử dụng bất kỳ Rust edition nào sẽ tiếp tục thấy improvements khi các stable releases mới được thực hiện. Tuy nhiên, trong một số trường hợp, chủ yếu là khi các keywords mới được thêm vào, một số features mới có thể chỉ có sẵn trong các editions sau. Bạn sẽ cần chuyển editions nếu bạn muốn tận dụng những features đó.</p>

<p>Để biết thêm chi tiết, xem The Rust Edition Guide. Đây là một cuốn sách hoàn chỉnh liệt kê sự khác biệt giữa các editions và giải thích cách tự động upgrade code của bạn sang một edition mới qua cargo fix.</p>
`,
            defaultCode: `// Rust Editions Example
// Để sử dụng edition mới, thêm vào Cargo.toml:
// [package]
// edition = "2021"

// Các features có sẵn qua các editions:
// - 2015: Rust ban đầu
// - 2018: Iterators, async/await, etc.
// - 2021: None, try blocks, etc.
// - 2024: Latest features

fn main() {
    println!("Rust Editions Example");
    println!("This code works in all editions!");

    // Ví dụ: Option::map là available trong tất cả editions
    let x = Some(5);
    let y = x.map(|v| v * 2);
    println!("Result: {:?}", y);

    // Để sử dụng features của edition mới,
    // cần update Cargo.toml
}
`,
            expectedOutput: `Rust Editions Example
This code works in all editions!
Result: Some(10)`
        };
