// Exercise - ch20_09_ex: Ownership in Methods
struct StringWrapper { s: String }

impl StringWrapper {
    fn take(self) -> String { self.s }
}

fn main() { let sw = StringWrapper { s: String::from("Hello") }; println!("{}", sw.take()); }
