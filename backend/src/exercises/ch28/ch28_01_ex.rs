// Exercise - ch28_01_ex: Struct Sinh viên
use std::io;

struct SinhVien {
    ma: i32,
    ten: String,
    diem: f64,
}

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: i32 = input.trim().parse().unwrap();

    for _i in 1..=n {
        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let ma: i32 = input.trim().parse().unwrap();

        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let ten = input.trim().to_string();

        input = String::new();
        io::stdin().read_line(&mut input).unwrap();
        let diem: f64 = input.trim().parse().unwrap();

        println!("{} {} {:.1}", ma, ten, diem);
    }
}
