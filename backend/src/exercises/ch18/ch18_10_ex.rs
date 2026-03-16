// Exercise - ch18_10_ex: Raw Pointer from Reference

fn main() {
    let mut value = 10;
    let ptr = &mut value as *mut i32;

    unsafe {
        *ptr = 20;
    }

    println!("Value: {}", value);
}
