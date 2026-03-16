// Exercise - ch18_06_ex: Union Types

union MyUnion {
    i: i32,
    f: f32,
}

fn main() {
    let u = MyUnion { i: 42 };
    unsafe {
        println!("Giá trị i: {}", u.i);
        println!("Giá trị f: {}", u.f);
    }
}
