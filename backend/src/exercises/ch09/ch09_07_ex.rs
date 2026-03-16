// Exercise - ch09_07_ex: ? với Option

fn get_first(v: &[i32]) -> Option<i32> {
    v.first().copied()
}

fn double_first(v: &[i32]) -> Option<i32> {
    let first = v.first()?;
    Some(first * 2)
}

fn add_first_two(v: &[i32]) -> Option<i32> {
    let first = v.first()?;
    let second = v.get(1)?;
    Some(first + second)
}

fn main() {
    let numbers = vec![10, 20, 30];

    match get_first(&numbers) {
        Some(n) => println!("First: {}", n),
        None => println!("Empty"),
    }

    match double_first(&numbers) {
        Some(n) => println!("Double first: {}", n),
        None => println!("Empty"),
    }

    let empty: Vec<i32> = vec![];
    match double_first(&empty) {
        Some(n) => println!("Double first: {}", n),
        None => println!("Empty vector"),
    }
}
