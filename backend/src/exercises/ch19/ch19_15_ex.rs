// Exercise - ch19_15_ex: Match Expression Returns Value
fn main() {
    let x = 5;
    let result = match x {
        1 => "One",
        2 => "Two",
        _ => "Other",
    };
    println!("{}", result);
}
