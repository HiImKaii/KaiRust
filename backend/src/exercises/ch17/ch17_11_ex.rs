// Exercise - ch17_11_ex: dyn Trait Syntax

use std::collections::HashMap;

trait Serializable {
    fn serialize(&self) -> String;
}

struct Point {
    x: i32,
    y: i32,
}

impl Serializable for Point {
    fn serialize(&self) -> String {
        format!("({}, {})", self.x, self.y)
    }
}

fn main() {
    let mut map: HashMap<String, Box<dyn Serializable>> = HashMap::new();
    map.insert("point".to_string(), Box::new(Point { x: 10, y: 20 }));
    println!("{}", map.get("point").unwrap().serialize());
}
