// Exercise - ch16_11_ex: Atomic Types

use std::sync::atomic::{AtomicUsize, Ordering};
use std::thread;
use std::sync::Arc;

fn main() {
    let counter = Arc::new(AtomicUsize::new(0));

    let handles: Vec<_> = (0..5).map(|_| {
        let counter = Arc::clone(&counter);
        thread::spawn(move || {
            for _ in 0..1000 {
                counter.fetch_add(1, Ordering::SeqCst);
            }
        })
    }).collect();

    for h in handles {
        h.join().unwrap();
    }

    println!("Giá trị: {}", counter.load(Ordering::SeqCst));
}
