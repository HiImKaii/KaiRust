// Exercise - ch13_08_ex: fold() với closure
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let sum = numbers.iter().fold(0, |acc, x| acc + x);
    println!("Sum: {}", sum);
    let product = numbers.iter().fold(1, |acc, x| acc * x);
    println!("Product: {}", product);
    let max = numbers.iter().fold(i32::MIN, |acc, &x| acc.max(x));
    println!("Max: {}", max);
}
