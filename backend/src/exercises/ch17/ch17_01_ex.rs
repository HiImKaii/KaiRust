// Exercise - ch17_01_ex: Basic Lifetime Annotation

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let string1 = String::from("Hello World");
    let string2 = String::from("Hi");
    let result = longest(&string1, &string2);
    println!("Chuỗi dài nhất: {}", result);
}
