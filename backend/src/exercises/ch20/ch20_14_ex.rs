// Exercise - ch20_14_ex: Generic Methods
struct Pair<T> { first: T, second: T }

impl<T> Pair<T> {
    fn new(a: T, b: T) -> Self { Pair { first: a, second: b } }
}

fn main() { let p = Pair::new(1, 2); println!("{} {}", p.first, p.second); }
