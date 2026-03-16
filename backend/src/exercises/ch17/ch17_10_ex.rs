// Exercise - ch17_10_ex: Object Safe Traits

trait Pilot {
    fn fly(&self) -> String;
}

struct Airplane;

impl Pilot for Airplane {
    fn fly(&self) -> String {
        String::from("Máy bay đang bay")
    }
}

fn main() {
    let plane = Airplane;
    println!("{}", plane.fly());
}
