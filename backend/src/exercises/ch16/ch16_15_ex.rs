// Exercise - ch16_15_ex: Once Lock for Initialization

use std::sync::OnceLock;
use std::thread;

static INIT: OnceLock<i32> = OnceLock::new();

fn get_value() -> &'static i32 {
    INIT.get_or_init(|| {
        println!("Khởi tạo một lần");
        42
    })
}

fn main() {
    let h1 = thread::spawn(|| {
        println!("Thread 1: {}", get_value());
    });

    let h2 = thread::spawn(|| {
        println!("Thread 2: {}", get_value());
    });

    h1.join().unwrap();
    h2.join().unwrap();
}
