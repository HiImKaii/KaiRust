// Exercise - ch18_14_ex: Send and Sync with Unsafe

use std::rc::Rc;

fn main() {
    let rc = Rc::new(5);
    println!("Rc value: {}", rc);
}
