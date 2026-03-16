// Exercise - ch16_10_ex: Sync Trait

use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let data = Arc::new(Mutex::new(0));

    let handles: Vec<_> = (0..3).map(|_| {
        let data = Arc::clone(&data);
        thread::spawn(move || {
            let mut d = data.lock().unwrap();
            *d += 1;
        })
    }).collect();

    for h in handles {
        h.join().unwrap();
    }

    println!("Kết quả: {}", *data.lock().unwrap());
}
