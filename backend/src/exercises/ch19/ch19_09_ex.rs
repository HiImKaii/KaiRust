// Exercise - ch19_09_ex: Destructuring Structs
struct Point { x: i32, y: i32 }

fn main() {
    let p = Point { x: 10, y: 20 };
    let Point { x, y } = p;
    println!("x: {}, y: {}", x, y);
}
