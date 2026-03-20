pub mod ch01_01;
pub mod ch01_02;
pub mod ch01_03;
pub mod ch01_04;
pub mod ch01_04_01;
pub mod ch01_04_02;
pub mod ch01_04_03;
pub mod ch01_04_04;
pub mod ch01_04_05;

#[cfg(test)]
mod tests {
    use std::process::Command;

    #[test]
    fn test_hello_world_macro() {
        let compile = Command::new("rustc")
            .arg("main.rs")
            .arg("-o").arg("student_main")
            .output()
            .expect("Failed to execute rustc");

        assert!(compile.status.success(), "Không thể biên dịch mã nguồn của bạn.");

        let run = Command::new("./student_main")
            .output()
            .expect("Failed to run the program");

        let stdout = String::from_utf8_lossy(&run.stdout);
        let output_trimmed = stdout.trim();
        assert_eq!(output_trimmed, "Hello, world!", "Chương trình của bạn chưa in ra đúng 'Hello, world!'");
    }
}
