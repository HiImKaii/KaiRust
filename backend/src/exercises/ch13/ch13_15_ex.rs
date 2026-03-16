// Exercise - ch13_15_ex: Tổng hợp Closure
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let result: i32 = numbers.iter().filter(|&&x| x > 3).map(|x| x * x).sum();
    println!("Sum of squares > 3: {}", result);
}
