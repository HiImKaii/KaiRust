// Exercise - ch13_09_ex: filter_map()
fn main() {
    let strings = vec!["1", "two", "3", "four", "5"];
    let numbers: Vec<i32> = strings.iter().filter_map(|s| s.parse::<i32>().ok()).collect();
    println!("Parsed numbers: {:?}", numbers);
}
