// Exercise - ch19_11_ex: Matching Tuples
fn main() {
    let t = (1, 2, 3);
    match t {
        (a, b, c) => println!("{} {} {}", a, b, c),
    }
}
