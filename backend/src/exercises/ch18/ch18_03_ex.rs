// Exercise - ch18_03_ex: Unsafe Trait Implementations

unsafe trait UnsafeTrait {
    fn unsafe_method(&self);
}

struct MyStruct;

unsafe impl UnsafeTrait for MyStruct {
    fn unsafe_method(&self) {
        println!("Unsafe method called");
    }
}

fn main() {
    let s = MyStruct;
    unsafe {
        s.unsafe_method();
    }
}
