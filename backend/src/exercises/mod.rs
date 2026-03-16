pub mod ch01;
pub mod ch02;
pub mod ch03;
pub mod ch04;
pub mod ch05;
pub mod ch06;
pub mod ch07;
pub mod ch08;
pub mod ch09;
pub mod ch10;
pub mod ch11;
pub mod ch12;
pub mod ch13;

/// Giới hạn của bài tập
#[derive(Debug, Clone, Copy)]
#[allow(dead_code)]
pub struct ExerciseLimits {
    /// Time limit in seconds
    pub time_limit_secs: f64,
    /// Memory limit in MB
    pub memory_limit_mb: u32,
}

impl Default for ExerciseLimits {
    fn default() -> Self {
        // Default limits if not specified
        Self {
            time_limit_secs: 10.0,
            memory_limit_mb: 256,
        }
    }
}

/// Tra cứu giới hạn time/memory cho bài tập
pub fn get_exercise_limits(lesson_id: &str) -> ExerciseLimits {
    let name = lesson_id.replace('-', "_");
    match name.as_str() {
        // ch02
        "ch02_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch02_02_ex" => ExerciseLimits { time_limit_secs: 0.5, memory_limit_mb: 256 },
        "ch02_03_ex" => ExerciseLimits { time_limit_secs: 0.5, memory_limit_mb: 256 },
        "ch02_04_ex" => ExerciseLimits { time_limit_secs: 0.5, memory_limit_mb: 256 },
        "ch02_05_ex" => ExerciseLimits { time_limit_secs: 0.5, memory_limit_mb: 256 },
        "ch02_06_ex" => ExerciseLimits { time_limit_secs: 0.5, memory_limit_mb: 256 },
        "ch02_07_ex" => ExerciseLimits { time_limit_secs: 0.5, memory_limit_mb: 256 },
        // ch03
        "ch03_01" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_02" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_03" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_04" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_05" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_01_ex2" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_01_ex3" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_02_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_02_ex2" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_02_ex3" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_03_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_03_ex2" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_05_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_05_ex2" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_05_ex3" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_05_ex4" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_05_ex5" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_05_ex6" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_05_ex7" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch03_05_ex8" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch04 - Using 1s for simplicity
        // ch04 theory
        "ch04_01" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_02" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_03" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch04 exercise
        "ch04_01_ex1" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_01_ex2" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_01_ex3" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_02_ex1" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_02_ex2" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_02_ex3" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_03_ex1" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_03_ex2" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_03_ex3" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_03_ex4" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_03_ex5" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch04_03_ex6" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch05 theory
        "ch05_01" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_02" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_03" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch05 exercise
        "ch05_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_02_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_03_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_04_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_05_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_06_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_07_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_08_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_09_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch05_10_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch06 theory
        "ch06_01" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_02" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_03" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch06 exercise
        "ch06_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_02_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_03_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_04_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_05_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_06_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_07_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_08_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_09_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch06_10_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch07 theory
        "ch07_01" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch07_02" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch07_03" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch07_04" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch07_05" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch07 exercise
        "ch07_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch07_02_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch07_03_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch07_04_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch07_05_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch08 theory
        "ch08_01" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch08_02" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch08_03" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch08 exercise
        "ch08_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch08_02_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch08_03_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch08_04_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch08_05_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch08_06_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch09 theory
        "ch09_01" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_02" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_03" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch09 exercise
        "ch09_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_02_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_03_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_04_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_05_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_06_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_07_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_08_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_09_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_10_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_11_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_12_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_13_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_14_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch09_15_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch10 theory
        "ch10_01" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch10_02" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch10_03" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch10 exercise
        "ch10_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch10_02_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch10_03_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch10_04_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch10_05_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch11 exercise
        "ch11_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_02_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_03_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_04_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_05_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_06_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_07_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_08_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_09_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_10_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_11_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_12_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_13_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_14_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch11_15_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch12 exercise
        "ch12_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_02_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_03_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_04_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_05_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_06_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_07_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_08_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_09_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_10_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_11_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_12_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_13_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_14_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch12_15_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // ch13 exercise
        "ch13_01_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_02_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_03_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_04_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_05_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_06_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_07_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_08_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_09_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_10_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_11_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_12_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_13_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_14_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        "ch13_15_ex" => ExerciseLimits { time_limit_secs: 1.0, memory_limit_mb: 256 },
        // Default
        _ => ExerciseLimits::default(),
    }
}

/// Tra cứu test code cho bài tập theo lesson_id.
/// Dùng include_str!() để embed nội dung file lúc compile —
/// tránh lỗi "không tìm thấy file" khi chạy trên server/Docker
/// vì src/exercises/ không có trong final binary image.
pub fn get_test_code(lesson_id: &str) -> Option<&'static str> {
    let name = lesson_id.replace('-', "_");
    match name.as_str() {
        // ch01
        "ch01_01"       => Some(include_str!("ch01/ch01_01.rs")),
        "ch01_02"       => Some(include_str!("ch01/ch01_02.rs")),
        "ch01_03"       => Some(include_str!("ch01/ch01_03.rs")),
        // ch02
        "ch02_01"       => Some(include_str!("ch02/ch02_01.rs")),
        "ch02_02"       => Some(include_str!("ch02/ch02_02.rs")),
        "ch02_03"       => Some(include_str!("ch02/ch02_03.rs")),
        "ch02_04"       => Some(include_str!("ch02/ch02_04.rs")),
        "ch02_05"       => Some(include_str!("ch02/ch02_05.rs")),
        "ch02_01_ex"    => Some(include_str!("ch02/ch02_01_ex.rs")),
        "ch02_02_ex"    => Some(include_str!("ch02/ch02_02_ex.rs")),
        "ch02_03_ex"    => Some(include_str!("ch02/ch02_03_ex.rs")),
        "ch02_04_ex"    => Some(include_str!("ch02/ch02_04_ex.rs")),
        "ch02_05_ex"    => Some(include_str!("ch02/ch02_05_ex.rs")),
        "ch02_06_ex"    => Some(include_str!("ch02/ch02_06_ex.rs")),
        "ch02_07_ex"    => Some(include_str!("ch02/ch02_07_ex.rs")),
        // ch03
        // ch03 theory
        "ch03_01"       => Some(include_str!("ch03/ch03_01.rs")),
        "ch03_02"       => Some(include_str!("ch03/ch03_02.rs")),
        "ch03_03"       => Some(include_str!("ch03/ch03_03.rs")),
        "ch03_04"       => Some(include_str!("ch03/ch03_04.rs")),
        "ch03_05"       => Some(include_str!("ch03/ch03_05.rs")),
        // ch03 exercise
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
        // ch04 theory
        "ch04_01"       => Some(include_str!("ch04/ch04_01.rs")),
        "ch04_02"       => Some(include_str!("ch04/ch04_02.rs")),
        "ch04_03"       => Some(include_str!("ch04/ch04_03.rs")),
        // ch04 exercise
        "ch04_01_ex1"   => Some(include_str!("ch04/ch04_01_ex1.rs")),
        "ch04_01_ex2"   => Some(include_str!("ch04/ch04_01_ex2.rs")),
        "ch04_01_ex3"   => Some(include_str!("ch04/ch04_01_ex3.rs")),
        "ch04_02_ex1"   => Some(include_str!("ch04/ch04_02_ex1.rs")),
        "ch04_02_ex2"   => Some(include_str!("ch04/ch04_02_ex2.rs")),
        "ch04_02_ex3"   => Some(include_str!("ch04/ch04_02_ex3.rs")),
        "ch04_03_ex1"   => Some(include_str!("ch04/ch04_03_ex1.rs")),
        "ch04_03_ex2"   => Some(include_str!("ch04/ch04_03_ex2.rs")),
        "ch04_03_ex3"   => Some(include_str!("ch04/ch04_03_ex3.rs")),
        "ch04_03_ex4"   => Some(include_str!("ch04/ch04_03_ex4.rs")),
        "ch04_03_ex5"   => Some(include_str!("ch04/ch04_03_ex5.rs")),
        "ch04_03_ex6"   => Some(include_str!("ch04/ch04_03_ex6.rs")),
        // ch05 theory
        "ch05_01"       => Some(include_str!("ch05/ch05_01.rs")),
        "ch05_02"       => Some(include_str!("ch05/ch05_02.rs")),
        "ch05_03"       => Some(include_str!("ch05/ch05_03.rs")),
        // ch05 exercise
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
        // ch06 theory
        "ch06_01"       => Some(include_str!("ch06/ch06_01.rs")),
        "ch06_02"       => Some(include_str!("ch06/ch06_02.rs")),
        "ch06_03"       => Some(include_str!("ch06/ch06_03.rs")),
        // ch06 exercise
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
        // ch07 theory
        "ch07_01"       => Some(include_str!("ch07/ch07_01.rs")),
        "ch07_02"       => Some(include_str!("ch07/ch07_02.rs")),
        "ch07_03"       => Some(include_str!("ch07/ch07_03.rs")),
        "ch07_04"       => Some(include_str!("ch07/ch07_04.rs")),
        "ch07_05"       => Some(include_str!("ch07/ch07_05.rs")),
        // ch07 exercise
        "ch07_01_ex"    => Some(include_str!("ch07/ch07_01_ex.rs")),
        "ch07_02_ex"    => Some(include_str!("ch07/ch07_02_ex.rs")),
        "ch07_03_ex"    => Some(include_str!("ch07/ch07_03_ex.rs")),
        "ch07_04_ex"    => Some(include_str!("ch07/ch07_04_ex.rs")),
        "ch07_05_ex"    => Some(include_str!("ch07/ch07_05_ex.rs")),
        // ch08 theory
        "ch08_01"       => Some(include_str!("ch08/ch08_01.rs")),
        "ch08_02"       => Some(include_str!("ch08/ch08_02.rs")),
        "ch08_03"       => Some(include_str!("ch08/ch08_03.rs")),
        // ch08 exercise
        "ch08_01_ex"    => Some(include_str!("ch08/ch08_01_ex.rs")),
        "ch08_02_ex"    => Some(include_str!("ch08/ch08_02_ex.rs")),
        "ch08_03_ex"    => Some(include_str!("ch08/ch08_03_ex.rs")),
        "ch08_04_ex"    => Some(include_str!("ch08/ch08_04_ex.rs")),
        "ch08_05_ex"    => Some(include_str!("ch08/ch08_05_ex.rs")),
        "ch08_06_ex"    => Some(include_str!("ch08/ch08_06_ex.rs")),
        // ch09 theory
        "ch09_01"       => Some(include_str!("ch09/ch09_01.rs")),
        "ch09_02"       => Some(include_str!("ch09/ch09_02.rs")),
        "ch09_03"       => Some(include_str!("ch09/ch09_03.rs")),
        // ch09 exercise
        "ch09_01_ex"    => Some(include_str!("ch09/ch09_01_ex.rs")),
        "ch09_02_ex"    => Some(include_str!("ch09/ch09_02_ex.rs")),
        "ch09_03_ex"    => Some(include_str!("ch09/ch09_03_ex.rs")),
        "ch09_04_ex"    => Some(include_str!("ch09/ch09_04_ex.rs")),
        "ch09_05_ex"    => Some(include_str!("ch09/ch09_05_ex.rs")),
        "ch09_06_ex"    => Some(include_str!("ch09/ch09_06_ex.rs")),
        "ch09_07_ex"    => Some(include_str!("ch09/ch09_07_ex.rs")),
        "ch09_08_ex"    => Some(include_str!("ch09/ch09_08_ex.rs")),
        "ch09_09_ex"    => Some(include_str!("ch09/ch09_09_ex.rs")),
        "ch09_10_ex"    => Some(include_str!("ch09/ch09_10_ex.rs")),
        "ch09_11_ex"    => Some(include_str!("ch09/ch09_11_ex.rs")),
        "ch09_12_ex"    => Some(include_str!("ch09/ch09_12_ex.rs")),
        "ch09_13_ex"    => Some(include_str!("ch09/ch09_13_ex.rs")),
        "ch09_14_ex"    => Some(include_str!("ch09/ch09_14_ex.rs")),
        "ch09_15_ex"    => Some(include_str!("ch09/ch09_15_ex.rs")),
        // ch10 theory
        "ch10_01"       => Some(include_str!("ch10/ch10_01.rs")),
        "ch10_02"       => Some(include_str!("ch10/ch10_02.rs")),
        "ch10_03"       => Some(include_str!("ch10/ch10_03.rs")),
        // ch10 exercise
        "ch10_01_ex"    => Some(include_str!("ch10/ch10_01_ex.rs")),
        "ch10_02_ex"    => Some(include_str!("ch10/ch10_02_ex.rs")),
        "ch10_03_ex"    => Some(include_str!("ch10/ch10_03_ex.rs")),
        "ch10_04_ex"    => Some(include_str!("ch10/ch10_04_ex.rs")),
        "ch10_05_ex"    => Some(include_str!("ch10/ch10_05_ex.rs")),
        // ch11 exercise
        "ch11_01_ex"    => Some(include_str!("ch11/ch11_01_ex.rs")),
        "ch11_02_ex"    => Some(include_str!("ch11/ch11_02_ex.rs")),
        "ch11_03_ex"    => Some(include_str!("ch11/ch11_03_ex.rs")),
        "ch11_04_ex"    => Some(include_str!("ch11/ch11_04_ex.rs")),
        "ch11_05_ex"    => Some(include_str!("ch11/ch11_05_ex.rs")),
        "ch11_06_ex"    => Some(include_str!("ch11/ch11_06_ex.rs")),
        "ch11_07_ex"    => Some(include_str!("ch11/ch11_07_ex.rs")),
        "ch11_08_ex"    => Some(include_str!("ch11/ch11_08_ex.rs")),
        "ch11_09_ex"    => Some(include_str!("ch11/ch11_09_ex.rs")),
        "ch11_10_ex"    => Some(include_str!("ch11/ch11_10_ex.rs")),
        "ch11_11_ex"    => Some(include_str!("ch11/ch11_11_ex.rs")),
        "ch11_12_ex"    => Some(include_str!("ch11/ch11_12_ex.rs")),
        "ch11_13_ex"    => Some(include_str!("ch11/ch11_13_ex.rs")),
        "ch11_14_ex"    => Some(include_str!("ch11/ch11_14_ex.rs")),
        "ch11_15_ex"    => Some(include_str!("ch11/ch11_15_ex.rs")),
        // ch12 exercise
        "ch12_01_ex"    => Some(include_str!("ch12/ch12_01_ex.rs")),
        "ch12_02_ex"    => Some(include_str!("ch12/ch12_02_ex.rs")),
        "ch12_03_ex"    => Some(include_str!("ch12/ch12_03_ex.rs")),
        "ch12_04_ex"    => Some(include_str!("ch12/ch12_04_ex.rs")),
        "ch12_05_ex"    => Some(include_str!("ch12/ch12_05_ex.rs")),
        "ch12_06_ex"    => Some(include_str!("ch12/ch12_06_ex.rs")),
        "ch12_07_ex"    => Some(include_str!("ch12/ch12_07_ex.rs")),
        "ch12_08_ex"    => Some(include_str!("ch12/ch12_08_ex.rs")),
        "ch12_09_ex"    => Some(include_str!("ch12/ch12_09_ex.rs")),
        "ch12_10_ex"    => Some(include_str!("ch12/ch12_10_ex.rs")),
        "ch12_11_ex"    => Some(include_str!("ch12/ch12_11_ex.rs")),
        "ch12_12_ex"    => Some(include_str!("ch12/ch12_12_ex.rs")),
        "ch12_13_ex"    => Some(include_str!("ch12/ch12_13_ex.rs")),
        "ch12_14_ex"    => Some(include_str!("ch12/ch12_14_ex.rs")),
        "ch12_15_ex"    => Some(include_str!("ch12/ch12_15_ex.rs")),
        // ch13 exercise
        "ch13_01_ex"    => Some(include_str!("ch13/ch13_01_ex.rs")),
        "ch13_02_ex"    => Some(include_str!("ch13/ch13_02_ex.rs")),
        "ch13_03_ex"    => Some(include_str!("ch13/ch13_03_ex.rs")),
        "ch13_04_ex"    => Some(include_str!("ch13/ch13_04_ex.rs")),
        "ch13_05_ex"    => Some(include_str!("ch13/ch13_05_ex.rs")),
        "ch13_06_ex"    => Some(include_str!("ch13/ch13_06_ex.rs")),
        "ch13_07_ex"    => Some(include_str!("ch13/ch13_07_ex.rs")),
        "ch13_08_ex"    => Some(include_str!("ch13/ch13_08_ex.rs")),
        "ch13_09_ex"    => Some(include_str!("ch13/ch13_09_ex.rs")),
        "ch13_10_ex"    => Some(include_str!("ch13/ch13_10_ex.rs")),
        "ch13_11_ex"    => Some(include_str!("ch13/ch13_11_ex.rs")),
        "ch13_12_ex"    => Some(include_str!("ch13/ch13_12_ex.rs")),
        "ch13_13_ex"    => Some(include_str!("ch13/ch13_13_ex.rs")),
        "ch13_14_ex"    => Some(include_str!("ch13/ch13_14_ex.rs")),
        "ch13_15_ex"    => Some(include_str!("ch13/ch13_15_ex.rs")),
        _ => None,
    }
}
