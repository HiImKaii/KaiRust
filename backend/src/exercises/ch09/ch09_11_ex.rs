// Exercise - ch09_11_ex: Combinators - unwrap_or và unwrap_or_else

fn find_element(v: &[i32], target: i32) -> Option<usize> {
    v.iter().position(|&x| x == target)
}

fn get_value(index: usize) -> Option<i32> {
    let numbers = vec![10, 20, 30, 40, 50];
    numbers.get(index).copied()
}

fn main() {
    // unwrap_or với Option
    let numbers = vec![1, 2, 3];
    let first = numbers.first().copied().unwrap_or(-1);
    println!("First element (or -1): {}", first);

    // unwrap_or_else với Option
    let empty: Vec<i32> = vec![];
    let first_empty = empty.first().copied().unwrap_or_else(|| {
        println!("Vector trống, sử dụng giá trị mặc định");
        0
    });
    println!("First from empty: {}", first_empty);

    // unwrap_or với Result
    let result: Result<i32, &str> = Err("error");
    let value = result.unwrap_or(42);
    println!("Unwrap or default: {}", value);
}
