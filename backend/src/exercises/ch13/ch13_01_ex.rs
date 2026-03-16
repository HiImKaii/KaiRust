// Exercise - ch13_01_ex: Closure cơ bản

fn main() {
    let add = |a: i32, b: i32| -> i32 { a + b };
    let multiply = |a: i32, b: i32| -> i32 { a * b };

    let result1 = add(5, 3);
    let result2 = multiply(4, 7);

    println!("5 + 3 = {}", result1);
    println!("4 * 7 = {}", result2);
}
