// Exercise - ch16_06_ex: Message Passing with Channels

use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send("Hello from thread".to_string()).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Nhận được: {}", received);
}
