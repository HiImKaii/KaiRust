// Exercise - ch09_01_ex: panic! cơ bản

fn divide(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("Cannot divide by zero");
    }
    a / b
}

fn main() {
    let result = divide(10, 2);
    println!("10 / 2 = {}", result);
    println!("Kết thúc chương trình!");
}
