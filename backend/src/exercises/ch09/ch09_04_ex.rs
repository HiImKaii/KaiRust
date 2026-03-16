// Exercise - ch09_04_ex: unwrap và expect

fn get_first_element(v: &[i32]) -> &i32 {
    v.first().unwrap()
}

fn safe_get_element(v: &[i32], index: usize) -> &i32 {
    v.get(index).expect(&format!("Index {} out of bounds", index))
}

fn main() {
    let numbers = vec![10, 20, 30];
    let first = get_first_element(&numbers);
    println!("Phần tử đầu tiên: {}", first);

    let element = safe_get_element(&numbers, 1);
    println!("Phần tử thứ 1: {}", element);

    println!("Chương trình chạy thành công!");
}
