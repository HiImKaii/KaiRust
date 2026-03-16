// Exercise - ch20_13_ex: Supertraits
trait Printable { fn print(&self) { println!("Printable"); } }
trait Display: Printable { fn show(&self) { println!("Display"); } }
struct MyStruct;
impl Printable for MyStruct {}
impl Display for MyStruct {}
fn main() { let m = MyStruct; m.show(); }
