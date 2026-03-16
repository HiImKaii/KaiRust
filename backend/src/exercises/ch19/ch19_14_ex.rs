// Exercise - ch19_14_ex: Match with Struct and Binding
struct Point { x: i32, y: i32 }

fn main() {
    let p = Point { x: 5, y: 10 };
    match p {
        Point { x, y: 10 } => println!("y is 10, x is {}", x),
        _ => println!("Other"),
    }
}
