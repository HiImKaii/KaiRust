// Exercise - ch12_05_ex: Standard Error (eprintln!)

fn main() {
    println!("Đây là stdout");

    eprintln!("Đây là stderr - dòng lỗi!");

    eprintln!("Error: Không tìm thấy file!");
    eprintln!("Error code: {}", 404);

    println!("Chương trình kết thúc");
}
