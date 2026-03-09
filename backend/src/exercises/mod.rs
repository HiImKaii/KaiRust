pub mod ch01;
pub mod ch02;
pub mod ch03;
pub mod ch04;
pub mod ch05;
pub mod ch06;
pub mod ch07;
pub mod ch08;

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
        // ch05
        "ch05_01_ex"    => Some(include_str!("ch05/ch05_01_ex.rs")),
        "ch05_02_ex"    => Some(include_str!("ch05/ch05_02_ex.rs")),
        "ch05_03_ex"    => Some(include_str!("ch05/ch05_03_ex.rs")),
        "ch05_04_ex"    => Some(include_str!("ch05/ch05_04_ex.rs")),
        "ch05_05_ex"    => Some(include_str!("ch05/ch05_05_ex.rs")),
        "ch05_06_ex"    => Some(include_str!("ch05/ch05_06_ex.rs")),
        "ch05_07_ex"    => Some(include_str!("ch05/ch05_07_ex.rs")),
        "ch05_08_ex"    => Some(include_str!("ch05/ch05_08_ex.rs")),
        "ch05_09_ex"    => Some(include_str!("ch05/ch05_09_ex.rs")),
        "ch05_10_ex"    => Some(include_str!("ch05/ch05_10_ex.rs")),
        // ch06
        "ch06_01_ex"    => Some(include_str!("ch06/ch06_01_ex.rs")),
        "ch06_02_ex"    => Some(include_str!("ch06/ch06_02_ex.rs")),
        "ch06_03_ex"    => Some(include_str!("ch06/ch06_03_ex.rs")),
        "ch06_04_ex"    => Some(include_str!("ch06/ch06_04_ex.rs")),
        "ch06_05_ex"    => Some(include_str!("ch06/ch06_05_ex.rs")),
        "ch06_06_ex"    => Some(include_str!("ch06/ch06_06_ex.rs")),
        "ch06_07_ex"    => Some(include_str!("ch06/ch06_07_ex.rs")),
        "ch06_08_ex"    => Some(include_str!("ch06/ch06_08_ex.rs")),
        "ch06_09_ex"    => Some(include_str!("ch06/ch06_09_ex.rs")),
        "ch06_10_ex"    => Some(include_str!("ch06/ch06_10_ex.rs")),
        // ch07
        "ch07_01_ex"    => Some(include_str!("ch07/ch07_01_ex.rs")),
        "ch07_02_ex"    => Some(include_str!("ch07/ch07_02_ex.rs")),
        "ch07_03_ex"    => Some(include_str!("ch07/ch07_03_ex.rs")),
        "ch07_04_ex"    => Some(include_str!("ch07/ch07_04_ex.rs")),
        "ch07_05_ex"    => Some(include_str!("ch07/ch07_05_ex.rs")),
        // ch08
        "ch08_01_ex"    => Some(include_str!("ch08/ch08_01_ex.rs")),
        "ch08_02_ex"    => Some(include_str!("ch08/ch08_02_ex.rs")),
        "ch08_03_ex"    => Some(include_str!("ch08/ch08_03_ex.rs")),
        "ch08_04_ex"    => Some(include_str!("ch08/ch08_04_ex.rs")),
        "ch08_05_ex"    => Some(include_str!("ch08/ch08_05_ex.rs")),
        "ch08_06_ex"    => Some(include_str!("ch08/ch08_06_ex.rs")),
        _ => None,
    }
}
