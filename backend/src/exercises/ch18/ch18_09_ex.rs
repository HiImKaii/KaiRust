// Exercise - ch18_09_ex: Unsafe Trait

unsafe trait Danger {
    fn danger(&self);
}

struct DangerStruct;

unsafe impl Danger for DangerStruct {
    fn danger(&self) {
        println!("Danger!");
    }
}

fn main() {
    let ds = DangerStruct;
    unsafe {
        ds.danger();
    }
}
