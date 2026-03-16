// Exercise - ch16_12_ex: Thread Local Storage

use std::cell::Cell;
use std::thread;

thread_local!(static COUNTER: Cell<i32> = Cell::new(0));

fn main() {
    let handle = thread::spawn(|| {
        COUNTER.with(|c| {
            c.set(10);
            println!("Thread local: {}", c.get());
        });
    });

    handle.join().unwrap();
    COUNTER.with(|c| {
        println!("Main thread local: {}", c.get());
    });
}
