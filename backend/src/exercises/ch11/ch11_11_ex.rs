// Exercise - ch11_11_ex: Testing Enums

#[derive(Debug, PartialEq)]
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

impl Message {
    fn call(&self) -> String {
        match self {
            Message::Quit => "Quit".to_string(),
            Message::Move { x, y } => format!("Move to ({}, {})", x, y),
            Message::Write(s) => format!("Write: {}", s),
            Message::ChangeColor(r, g, b) => format!("Color: {}, {}, {}", r, g, b),
        }
    }
}

fn main() {
    // Test Quit
    let msg1 = Message::Quit;
    assert_eq!(msg1.call(), "Quit");

    // Test Move
    let msg2 = Message::Move { x: 10, y: 20 };
    assert_eq!(msg2.call(), "Move to (10, 20)");

    // Test Write
    let msg3 = Message::Write("Hello".to_string());
    assert_eq!(msg3.call(), "Write: Hello");

    // Test ChangeColor
    let msg4 = Message::ChangeColor(255, 0, 0);
    assert_eq!(msg4.call(), "Color: 255, 0, 0");

    // Test equality
    let msg5 = Message::Move { x: 10, y: 20 };
    assert_eq!(msg2, msg5);

    println!("Enum tests passed!");
}
