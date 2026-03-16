// Exercise - ch15_09_ex: Mutable borrowing
fn main() { let mut s = String::from("hello"); s.push_str(", world"); println!("{}", s); }
