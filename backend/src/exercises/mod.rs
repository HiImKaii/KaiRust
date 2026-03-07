pub mod ch01;
pub mod ch02;
pub mod ch03;
pub mod ch04;

/// Tra cứu test code cho bài tập theo lesson_id.
/// Dùng include_str!() để embed nội dung file lúc compile —
/// tránh lỗi "không tìm thấy file" khi chạy trên server/Docker
/// vì src/exercises/ không có trong final binary image.
pub fn get_test_code(lesson_id: &str) -> Option<&'static str> {
    let name = lesson_id.replace('-', "_");
    match name.as_str() {
        // ch01
        "ch01_02"       => Some(include_str!("ch01/ch01_02.rs")),
        // ch02
        "ch02_01_ex"    => Some(include_str!("ch02/ch02_01_ex.rs")),
        "ch02_04_ex"    => Some(include_str!("ch02/ch02_04_ex.rs")),
        "ch02_05_ex"    => Some(include_str!("ch02/ch02_05_ex.rs")),
        // ch03
        "ch03_01_ex"    => Some(include_str!("ch03/ch03_01_ex.rs")),
        "ch03_01_ex2"   => Some(include_str!("ch03/ch03_01_ex2.rs")),
        "ch03_01_ex3"   => Some(include_str!("ch03/ch03_01_ex3.rs")),
        "ch03_02_ex"    => Some(include_str!("ch03/ch03_02_ex.rs")),
        "ch03_02_ex2"   => Some(include_str!("ch03/ch03_02_ex2.rs")),
        "ch03_02_ex3"   => Some(include_str!("ch03/ch03_02_ex3.rs")),
        "ch03_03_ex"    => Some(include_str!("ch03/ch03_03_ex.rs")),
        "ch03_03_ex2"   => Some(include_str!("ch03/ch03_03_ex2.rs")),
        "ch03_05_ex"    => Some(include_str!("ch03/ch03_05_ex.rs")),
        "ch03_05_ex2"   => Some(include_str!("ch03/ch03_05_ex2.rs")),
        "ch03_05_ex3"   => Some(include_str!("ch03/ch03_05_ex3.rs")),
        "ch03_05_ex4"   => Some(include_str!("ch03/ch03_05_ex4.rs")),
        "ch03_05_ex5"   => Some(include_str!("ch03/ch03_05_ex5.rs")),
        "ch03_05_ex6"   => Some(include_str!("ch03/ch03_05_ex6.rs")),
        "ch03_05_ex7"   => Some(include_str!("ch03/ch03_05_ex7.rs")),
        "ch03_05_ex8"   => Some(include_str!("ch03/ch03_05_ex8.rs")),
        _ => None,
    }
}
