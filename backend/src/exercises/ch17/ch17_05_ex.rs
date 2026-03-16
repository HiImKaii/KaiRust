// Exercise - ch17_05_ex: Lifetime Elision

fn first_word(s: &str) -> &str {
    s.split_whitespace().next().unwrap()
}

fn main() {
    let s = String::from("Hello World");
    let word = first_word(&s);
    println!("Từ đầu tiên: {}", word);
}
