// Exercise - ch18_15_ex: Volatile Memory Access


fn main() {
    let data = vec![1i32, 2, 3, 4, 5];
    let ptr = data.as_ptr();

    unsafe {
        for i in 0..data.len() {
            println!("Value at {}: {}", i, *ptr.offset(i as isize));
        }
    }
}
