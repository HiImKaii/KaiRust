// Exercise - ch14_01_ex: Iterator cơ bản
fn main() {
    let v = vec![1, 2, 3, 4, 5];
    let mut iter = v.iter();
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
    println!("{:?}", iter.next());
}
