// Exercise - ch13_04_ex: Closure as parameter
fn apply<F>(x: i32, f: F) -> i32
where F: Fn(i32) -> i32 {
    f(x)
}

fn main() {
    let double = |n: i32| n * 2;
    let square = |n: i32| n * n;
    println!("Double of 5: {}", apply(5, double));
    println!("Square of 5: {}", apply(5, square));
    let add_10 = |n: i32| n + 10;
    println!("Add 10 to 5: {}", apply(5, add_10));
}
