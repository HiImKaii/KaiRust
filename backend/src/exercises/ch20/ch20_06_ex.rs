// Exercise - ch20_06_ex: Method Syntax
struct Circle { radius: f64 }

impl Circle {
    fn new(radius: f64) -> Circle { Circle { radius } }
    fn area(&self) -> f64 { 3.14 * self.radius * self.radius }
}

fn main() { let c = Circle::new(5.0); println!("{}", c.area()); }
