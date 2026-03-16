// Exercise - ch14_02_ex: into_iter()
fn main() {
    let v = vec![1, 2, 3];
    for val in v.into_iter() {
        println!("{}", val);
    }
}
