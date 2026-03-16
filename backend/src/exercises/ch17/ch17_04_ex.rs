// Exercise - ch17_04_ex: Static Lifetime

fn main() {
    let s: &'static str = "Tôi có static lifetime";
    println!("{}", s);
}
