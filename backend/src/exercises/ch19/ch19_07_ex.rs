// Exercise - ch19_07_ex: For let Pattern
fn main() {
    let v = vec![1, 2, 3];
    for (i, val) in v.iter().enumerate() {
        println!("{}: {}", i, val);
    }
}
