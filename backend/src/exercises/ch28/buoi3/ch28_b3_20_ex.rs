// Exercise - ch28_b3_20: Mishka và Chris
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: u32 = input.trim().parse().unwrap();

    let mut mishka_wins = 0u32;
    let mut chris_wins = 0u32;

    for _ in 0..n {
        let mut line = String::new();
        io::stdin().read_line(&mut line).unwrap();
        let mut iter = line.split_whitespace();
        let m: u32 = iter.next().unwrap().parse().unwrap();
        let c: u32 = iter.next().unwrap().parse().unwrap();

        if m > c {
            mishka_wins += 1;
        } else if c > m {
            chris_wins += 1;
        }
    }

    if mishka_wins > chris_wins {
        println!("Mishka");
    } else if chris_wins > mishka_wins {
        println!("Chris");
    } else {
        println!("Friendship is magic! ^^");
    }
}
