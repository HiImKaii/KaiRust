// Exercise - ch17_08_ex: Trait Objects Basics

trait Draw {
    fn draw(&self);
}

struct Circle {
    radius: f64,
}

struct Square {
    side: f64,
}

impl Draw for Circle {
    fn draw(&self) {
        println!("Vẽ hình tròn bán kính {}", self.radius);
    }
}

impl Draw for Square {
    fn draw(&self) {
        println!("Vẽ hình vuông cạnh {}", self.side);
    }
}

fn main() {
    let shapes: Vec<Box<dyn Draw>> = vec![
        Box::new(Circle { radius: 5.0 }),
        Box::new(Square { side: 10.0 }),
    ];

    for shape in shapes {
        shape.draw();
    }
}
