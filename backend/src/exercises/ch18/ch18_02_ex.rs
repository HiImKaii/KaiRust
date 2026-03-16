// Exercise - ch18_02_ex: Unsafe Functions

unsafe fn dangerous() {
    println!("Đây là hàm unsafe!");
}

fn main() {
    unsafe {
        dangerous();
    }
}
