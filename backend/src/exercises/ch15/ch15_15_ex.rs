// Exercise - ch15_15_ex: Advanced Trait Patterns

trait MyTrait {
    type Output;

    fn process(&self) -> Self::Output;
}

struct Data {
    value: i32,
}

impl MyTrait for Data {
    type Output = String;

    fn process(&self) -> Self::Output {
        format!("Xử lý: {}", self.value)
    }
}

fn factory<T: MyTrait>(item: T) -> <T as MyTrait>::Output {
    item.process()
}

trait Printable {
    fn format(&self) -> String;
}

impl<T: std::fmt::Debug> Printable for T {
    fn format(&self) -> String {
        format!("{:?}", self)
    }
}

fn main() {
    let data = Data { value: 42 };
    let result = factory(data);
    println!("{}", result);

    let num = 100;
    println!("{}", num.format());

    let text = String::from("Hello");
    println!("{}", text.format());
}
