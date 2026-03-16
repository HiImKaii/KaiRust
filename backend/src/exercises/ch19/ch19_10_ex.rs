// Exercise - ch19_10_ex: Destructuring Nested Structs
struct Inner { value: i32 }
struct Outer { inner: Inner }

fn main() {
    let o = Outer { inner: Inner { value: 5 } };
    if let Outer { inner: Inner { value } } = o {
        println!("Value: {}", value);
    }
}
