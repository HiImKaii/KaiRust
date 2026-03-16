// Exercise - ch12_03_ex: File Writing

use std::fs::File;
use std::io::Write;

fn main() -> std::io::Result<()> {
    let mut file = File::create("output.txt")?;

    file.write_all(b"Hello, Rust!\n")?;
    file.write_all(b"This is a test file.\n")?;
    file.write_all(b"Writing to files is easy.")?;

    println!("Đã ghi file thành công!");
    Ok(())
}
