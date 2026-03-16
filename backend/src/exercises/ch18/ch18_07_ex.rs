// Exercise - ch18_07_ex: External Functions

unsafe extern "C" {
    fn puts(s: *const i8) -> i32;
}

fn main() {
    let s = b"Hello from C\0".as_ptr() as *const i8;
    unsafe {
        puts(s);
    }
}
