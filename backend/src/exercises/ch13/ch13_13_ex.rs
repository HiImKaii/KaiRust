// Exercise - ch13_13_ex: flatten()
fn main() {
    let nested = vec![vec![1, 2], vec![3, 4], vec![5]];
    let flat: Vec<i32> = nested.iter().flatten().copied().collect();
    println!("Flattened: {:?}", flat);
}
