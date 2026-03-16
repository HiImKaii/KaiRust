// Exercise - ch29_05_ex: Tìm vị trí ký tự
use std::io;

fn main() {
    let mut s = String::new();
    io::stdin().read_line(&mut s).unwrap();
    let s = s.trim();

    let mut c = String::new();
    io::stdin().read_line(&mut c).unwrap();
    let c = c.trim().chars().next().unwrap();

    if let Some(pos) = s.find(c) {
        println!("{}", pos);
    } else {
        println!("-1");
    }
}
