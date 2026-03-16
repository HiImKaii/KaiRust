// Exercise - ch17_12_ex: Function with dyn Trait Parameter

trait Describable {
    fn describe(&self) -> String;
}

struct Book {
    title: String,
    pages: u32,
}

struct Car {
    model: String,
    year: u32,
}

impl Describable for Book {
    fn describe(&self) -> String {
        format!("{} - {} trang", self.title, self.pages)
    }
}

impl Describable for Car {
    fn describe(&self) -> String {
        format!("{} - {}", self.model, self.year)
    }
}

fn print_description(item: &dyn Describable) {
    println!("{}", item.describe());
}

fn main() {
    let book = Book { title: String::from("Rust Programming"), pages: 350 };
    let car = Car { model: String::from("Toyota"), year: 2020 };

    print_description(&book);
    print_description(&car);
}
