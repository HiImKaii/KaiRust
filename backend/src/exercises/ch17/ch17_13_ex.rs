// Exercise - ch17_13_ex: Returning dyn Trait

trait Stringifier {
    fn to_string(&self) -> String;
}

struct Person {
    name: String,
}

struct Number(i32);

impl Stringifier for Person {
    fn to_string(&self) -> String {
        format!("Person: {}", self.name)
    }
}

impl Stringifier for Number {
    fn to_string(&self) -> String {
        format!("Number: {}", self.0)
    }
}

fn factory<T: Stringifier + 'static>(val: T) -> Box<dyn Stringifier> {
    Box::new(val)
}

fn main() {
    let p = factory(Person { name: String::from("Alice") });
    let n = factory(Number(42));
    println!("{}", p.to_string());
    println!("{}", n.to_string());
}
