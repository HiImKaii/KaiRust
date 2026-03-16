// Exercise - ch13_07_ex: filter() với closure
fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let evens: Vec<&i32> = numbers.iter().filter(|x| *x % 2 == 0).collect();
    println!("Evens: {:?}", evens);
    let odds: Vec<&i32> = numbers.iter().filter(|x| *x % 2 != 0).collect();
    println!("Odds: {:?}", odds);
}
