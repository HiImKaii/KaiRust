// Exercise - ch28_b2_10_ex: 599A - Đường đi ngắn nhất
use std::io;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let mut iter = input.split_whitespace();
    let d1: i64 = iter.next().unwrap().parse().unwrap();
    let d2: i64 = iter.next().unwrap().parse().unwrap();
    let d3: i64 = iter.next().unwrap().parse().unwrap();

    // Các tuyến đường có thể
    let route1 = 2 * (d1 + d2);              // Home->S1->Home->S2->Home
    let route2 = d1 + d2 + d3;                // Home->S1->S2->Home
    let route3 = 2 * (d1 + d3);              // Home->S1->S2->S1->Home
    let route4 = 2 * (d2 + d3);              // Home->S2->S1->S2->Home

    let result = route1.min(route2).min(route3).min(route4);
    println!("{}", result);
}
