// Exercise - ch20_08_ex: Mutable References in Methods
struct Rectangle { width: u32, height: u32 }

impl Rectangle {
    fn resize(&mut self, w: u32, h: u32) {
        self.width = w;
        self.height = h;
    }
}

fn main() { let mut r = Rectangle { width: 30, height: 50 }; r.resize(10, 20); println!("{} x {}", r.width, r.height); }
