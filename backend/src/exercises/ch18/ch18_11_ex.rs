// Exercise - ch18_11_ex: Manual Memory Layout

use std::mem::size_of;

#[repr(C)]
struct MyStruct {
    a: i32,
    b: i64,
    c: i32,
}

fn main() {
    println!("Size of MyStruct: {}", size_of::<MyStruct>());
    println!("Size of i32: {}", size_of::<i32>());
    println!("Size of i64: {}", size_of::<i64>());
}
