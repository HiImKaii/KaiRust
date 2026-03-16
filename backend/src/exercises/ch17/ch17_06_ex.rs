// Exercise - ch17_06_ex: Methods with Lifetimes

struct Holder<'a> {
    data: &'a str,
}

impl<'a> Holder<'a> {
    fn announce_and_return(&self, announcement: &str) -> &str {
        println!("{}", announcement);
        self.data
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let holder = Holder { data: &novel };
    let result = holder.announce_and_return("Hello");
    println!("Result: {}", result);
}
