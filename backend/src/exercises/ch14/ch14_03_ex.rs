// Exercise - ch14_03_ex: iter() vs iter_mut()
fn main() {
    let mut v = vec![1, 2, 3];
    for val in v.iter_mut() { *val *= 2; }
    println!("{:?}", v);
}
