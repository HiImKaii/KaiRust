// Exercise - ch13_10_ex: Method chaining
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let result: i32 = numbers.iter().filter(|&&x| x % 2 == 0).map(|x| x * 2).sum();
    println!("Sum of doubled evens: {}", result);
}
