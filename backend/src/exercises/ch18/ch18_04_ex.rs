// Exercise - ch18_04_ex: Calling C Functions

unsafe extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        let result = abs(-5);
        println!("Giá trị tuyệt đối: {}", result);
    }
}
