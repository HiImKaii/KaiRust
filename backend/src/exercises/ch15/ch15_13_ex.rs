// Exercise - ch15_13_ex: Trait Objects and Dyn Trait

trait Draw {
    fn draw(&self);
}

struct Circle {
    radius: i32,
}

struct Square {
    side: i32,
}

impl Draw for Circle {
    fn draw(&self) {
        println!("Vẽ hình tròn với bán kính {}", self.radius);
    }
}

impl Draw for Square {
    fn draw(&self) {
        println!("Vẽ hình vuông với cạnh {}", self.side);
    }
}

fn draw_all(items: Vec<&dyn Draw>) {
    for item in items {
        item.draw();
    }
}

fn main() {
    let circle = Circle { radius: 5 };
    let square = Square { side: 10 };

    let shapes: Vec<&dyn Draw> = vec![&circle, &square];
    draw_all(shapes);
}
