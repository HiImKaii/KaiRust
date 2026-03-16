// Exercise - ch16_14_ex: RwLock for Multiple Readers

use std::sync::{Arc, RwLock};
use std::thread;

fn main() {
    let data = Arc::new(RwLock::new(5));

    let r1 = Arc::clone(&data);
    let r2 = Arc::clone(&data);
    let w = Arc::clone(&data);

    let h1 = thread::spawn(move || {
        let val = r1.read().unwrap();
        println!("Reader 1: {}", val);
    });

    let h2 = thread::spawn(move || {
        let val = r2.read().unwrap();
        println!("Reader 2: {}", val);
    });

    let h3 = thread::spawn(move || {
        let mut val = w.write().unwrap();
        *val = 10;
        println!("Writer: {}", val);
    });

    h1.join().unwrap();
    h2.join().unwrap();
    h3.join().unwrap();
}
