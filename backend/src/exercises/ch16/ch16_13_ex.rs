// Exercise - ch16_13_ex: Barrier for Synchronization

use std::sync::{Arc, Barrier};
use std::thread;

fn main() {
    let barrier = Arc::new(Barrier::new(3));
    let mut handles = vec![];

    for i in 0..3 {
        let b = barrier.clone();
        let handle = thread::spawn(move || {
            println!("Thread {} bắt đầu", i);
            b.wait();
            println!("Thread {} tiếp tục", i);
        });
        handles.push(handle);
    }

    for h in handles {
        h.join().unwrap();
    }
}
