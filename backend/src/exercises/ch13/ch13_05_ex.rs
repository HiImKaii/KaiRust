// Exercise - ch13_05_ex: Closure returning closure
fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n
}

fn main() {
    let add_5 = make_adder(5);
    let add_10 = make_adder(10);
    let add_100 = make_adder(100);
    println!("5 + 3 = {}", add_5(3));
    println!("10 + 7 = {}", add_10(7));
    println!("100 + 50 = {}", add_100(50));
}
