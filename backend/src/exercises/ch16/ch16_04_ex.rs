// Exercise - ch16_04_ex: Multiple Mutex Guards

use std::sync::Mutex;

fn main() {
    let m1 = Mutex::new(5);
    let m2 = Mutex::new(10);

    {
        let mut n1 = m1.lock().unwrap();
        *n1 = 20;
    }

    {
        let mut n2 = m2.lock().unwrap();
        *n2 = 30;
    }

    println!("m1: {}, m2: {}", *m1.lock().unwrap(), *m2.lock().unwrap());
}
