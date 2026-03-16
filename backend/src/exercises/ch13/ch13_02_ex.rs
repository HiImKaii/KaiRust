// Exercise - ch13_02_ex: Closure với type inference

fn main() {
    let add = |a, b| a + b;
    let multiply = |a, b| a * b;

    println!("5 + 3 = {}", add(5, 3));
    println!("4 * 7 = {}", multiply(4, 7));

    let x = 5;
    let double = |n| n * 2;
    println!("Double of {} = {}", x, double(x));
}
