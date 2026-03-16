// Exercise - ch17_03_ex: Multiple Lifetimes

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let string1 = String::from("Hello");
    let string2 = String::from("Hi");
    let result = longest(&string1, &string2);
    println!("{}", result);
}
