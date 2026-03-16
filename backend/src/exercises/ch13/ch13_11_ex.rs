// Exercise - ch13_11_ex: find() và position()
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let found = numbers.iter().find(|&&x| x > 3);
    println!("First > 3: {:?}", found);
    let pos = numbers.iter().position(|&&x| x == 3);
    println!("Position of 3: {:?}", pos);
}
