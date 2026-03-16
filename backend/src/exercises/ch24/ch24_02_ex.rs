// Exercise - ch24_02_ex: Tính chỉ số BMI

use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let weight: f64 = input.trim().parse().unwrap();

    input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let height: f64 = input.trim().parse().unwrap();

    let bmi = weight / (height * height);

    if bmi < 18.5 {
        println!("Gay");
    } else if bmi >= 18.5 && bmi <= 24.9 {
        println!("Binh thuong");
    } else {
        println!("Beo");
    }
}
