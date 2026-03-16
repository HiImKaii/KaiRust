// Exercise - ch20_11_ex: Default Implementation in Traits
trait Describable {
    fn describe(&self) -> String { String::from("Object") }
}

struct Item;
impl Describable for Item {}

fn main() { let i = Item; println!("{}", i.describe()); }
