// Exercise - ch13_14_ex: zip()
fn main() {
    let a = vec![1, 2, 3];
    let b = vec![4, 5, 6];
    let zipped: Vec<(i32, i32)> = a.iter().zip(b.iter()).map(|(&x, &y)| (x, y)).collect();
    println!("Zipped: {:?}", zipped);
}
