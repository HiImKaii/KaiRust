// Exercise - ch15_14_ex: Using trait bounds with generics

fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn summarize_all<T: std::fmt::Debug + Clone, U: Clone + std::fmt::Debug>(item: T, pair: (U, U)) {
    println!("{:?}", item);
    println!("{:?}", pair);
}

#[derive(Debug, Clone)]
struct Pair<T> {
    first: T,
    second: T,
}

impl<T> Pair<T> {
    fn new(first: T, second: T) -> Self {
        Pair { first, second }
    }
}

impl<T: std::fmt::Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.first >= self.second {
            println!("Lớn nhất: {}", self.first);
        } else {
            println!("Lớn nhất: {}", self.second);
        }
    }
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    let result = largest(&numbers);
    println!("Số lớn nhất: {}", result);

    let chars = vec!['y', 'm', 'a', 'q'];
    let result = largest(&chars);
    println!("Ký tự lớn nhất: {}", result);

    let pair = Pair::new(5, 10);
    pair.cmp_display();
}
