// Exercise - ch15_11_ex: Derivable traits
#[derive(Debug, Clone, Copy, PartialEq)] struct Point { x: i32, y: i32 }
fn main() { let p1 = Point { x: 1, y: 2 }; let p2 = p1; println!("{:?}", p2); }
