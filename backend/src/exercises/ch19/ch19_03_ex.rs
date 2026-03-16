// Exercise - ch19_03_ex: Matching with Enums
enum Direction {
    North,
    South,
    East,
    West,
}

fn main() {
    let dir = Direction::North;
    match dir {
        Direction::North => println!("Đi lên"),
        Direction::South => println!("Đi xuống"),
        Direction::East => println!("Đi sang phải"),
        Direction::West => println!("Đi sang trái"),
    }
}
