// Exercise - ch13_12_ex: any(), all(), none()
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let has_even = numbers.iter().any(|&&x| x % 2 == 0);
    println!("Has even: {}", has_even);
    let all_positive = numbers.iter().all(|&&x| x > 0);
    println!("All positive: {}", all_positive);
    let none_zero = numbers.iter().none(|&&x| x == 0);
    println!("None zero: {}", none_zero);
}
