// Exercise - ch16_07_ex: Multiple Producers

use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    let tx1 = tx.clone();
    thread::spawn(move || {
        tx1.send("Từ thread 1".to_string()).unwrap();
    });

    thread::spawn(move || {
        tx.send("Từ thread 2".to_string()).unwrap();
    });

    for msg in rx {
        println!("Nhận: {}", msg);
    }
}
