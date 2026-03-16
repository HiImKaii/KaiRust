// Exercise - ch17_07_ex: Generic Types, Bounds, and Lifetimes

use std::fmt::Display;

fn longest_with_announcement<'a, T>(x: &'a str, y: &'a str, ann: T) -> &'a str
where
    T: Display,
{
    println!("Announcement: {}", ann);
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let result = longest_with_announcement("Hello", "World", "So sánh");
    println!("Kết quả: {}", result);
}
