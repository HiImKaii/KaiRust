// Exercise - ch20_12_ex: Default and Override
trait Shape {
    fn name(&self) -> String { String::from("Shape") }
    fn sides(&self) -> i32;
}

struct Triangle;
impl Shape for Triangle { fn sides(&self) -> i32 { 3 } }

fn main() { let t = Triangle; println!("{} {}", t.name(), t.sides()); }
