// Exercise - ch16_09_ex: Send Trait

use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        println!("Thread hoạt động");
    });
    handle.join().unwrap();
}
