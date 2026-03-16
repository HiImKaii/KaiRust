// Exercise - ch18_08_ex: Unsafe Block

fn main() {
    let text = String::from("Hello");
    let chars: Vec<char> = text.chars().collect();
    println!("Chars: {:?}", chars);
}
