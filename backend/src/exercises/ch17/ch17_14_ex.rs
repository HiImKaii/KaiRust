// Exercise - ch17_14_ex: Sized vs dyn Sized

trait Calculator {
    fn calculate(&self, a: i32, b: i32) -> i32;
}

struct Add;
struct Multiply;

impl Calculator for Add {
    fn calculate(&self, a: i32, b: i32) -> i32 {
        a + b
    }
}

impl Calculator for Multiply {
    fn calculate(&self, a: i32, b: i32) -> i32 {
        a * b
    }
}

fn compute<T: Calculator>(calc: &T, a: i32, b: i32) -> i32 {
    calc.calculate(a, b)
}

fn main() {
    let add = Add {};
    let multiply = Multiply {};
    println!("{}", compute(&add, 5, 3));
    println!("{}", compute(&multiply, 5, 3));
}
