// Exercise - ch20_15_ex: Trait Methods with Generics
trait Container<T> { fn get(&self, index: usize) -> Option<&T>; }

impl<T> Container<T> for Vec<T> {
    fn get(&self, index: usize) -> Option<&T> { self.get(index) }
}

fn main() { let v = vec![1, 2, 3]; println!("{:?}", v.get(1)); }
