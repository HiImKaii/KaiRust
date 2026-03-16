// Exercise - ch17_09_ex: Trait Object with Return Type

trait Animal {
    fn speak(&self) -> String;
}

struct Dog;
struct Cat;

impl Animal for Dog {
    fn speak(&self) -> String {
        String::from("Woof!")
    }
}

impl Animal for Cat {
    fn speak(&self) -> String {
        String::from("Meow!")
    }
}

fn create_animal(s: &str) -> Box<dyn Animal> {
    if s == "dog" {
        Box::new(Dog)
    } else {
        Box::new(Cat)
    }
}

fn main() {
    let dog = create_animal("dog");
    let cat = create_animal("cat");
    println!("{}", dog.speak());
    println!("{}", cat.speak());
}
