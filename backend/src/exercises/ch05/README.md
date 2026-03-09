# Chương 5: Using Structs to Structure Related Data

## Giới thiệu

Một **struct** (structure) là một custom data type cho phép bạn gộp together và đặt tên cho nhiều giá trị liên quan tạo thành một nhóm có ý nghĩa. Nếu bạn quen thuộc với ngôn ngữ hướng đối tượng, struct giống như data attributes của object.

---

## Phần 1: Defining and Instantiating Structs

### 1.1. Định nghĩa Struct

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

- `struct` keyword + tên struct
- Bên trong `{}`: định nghĩa các **fields** (tên + kiểu dữ liệu)

### 1.2. Tạo Instance

```rust
fn main() {
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };
}
```

- Không cần theo thứ tự khi định nghĩa
- Truy cập field qua **dot notation**: `user1.email`

### 1.3. Mutable Struct

```rust
fn main() {
    let mut user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };

    user1.email = String::from("anotheremail@example.com");
}
```

**Lưu ý**: Toàn bộ instance phải mutable, không thể chỉ mark riêng một field.

### 1.4. Function trả về Struct

```rust
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username: username,
        email: email,
        sign_in_count: 1,
    }
}
```

### 1.5. Field Init Shorthand

Khi **parameter name** = **field name**, có thể viết gọn:

```rust
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username,      // thay vì username: username,
        email,         // thay vì email: email,
        sign_in_count: 1,
    }
}
```

### 1.6. Struct Update Syntax

Tạo instance mới từ instance cũ, chỉ thay đổi một số fields:

```rust
fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };

    let user2 = User {
        email: String::from("another@example.com"),
        ..user1
    };
}
```

- `..user1` phải đặt **cuối cùng**
- Các field còn lại lấy từ `user1`

**Quan trọng về Ownership**:
- `..user1` **moves** dữ liệu
- `user1` không còn sử dụng được sau khi tạo `user2` (vì `String` được move)
- Các field có `Copy` trait (như `bool`, `u64`) vẫn sử dụng được

### 1.7. Tuple Structs

Đặt tên cho tuple nhưng không đặt tên cho từng field:

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}
```

- Mỗi tuple struct là một **type riêng**
- `Color` ≠ `Point` dù cùng có 3 i32
- Destructure: `let Point(x, y, z) = origin;`
- Truy cập: `black.0`, `origin.1`

### 1.8. Unit-Like Structs

Struct không có fields nào:

```rust
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}
```

- Dùng khi cần implement trait mà không cần data
- Tương tự như `()` (unit type)

### 1.9. Ownership trong Struct

**Nên dùng owned types** (`String`) thay vì references (`&str`):

```rust
// ✅ Đúng
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
```

```rust
// ❌ Sai - cần lifetime specifiers
struct User {
    active: bool,
    username: &str,
    email: &str,
    sign_in_count: u64,
}
```

Để store references trong struct, cần **lifetimes** (sẽ học ở Chapter 10).

---

## Phần 2: An Example Program - Using Structs

### 2.1. Vấn đề ban đầu - Tính diện tích hình chữ nhật

```rust
fn main() {
    let width1 = 30;
    let height1 = 50;

    println!(
        "The area of the rectangle is {} square pixels.",
        area(width1, height1)
    );
}

fn area(width: u32, height: u32) -> u32 {
    width * height
}
```

**Vấn đề:** Hàm `area` có hai tham số không rõ ràng về mối quan hệ.

### 2.2. Refactoring với Structs

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        area(&rect1)
    );
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}
```

### 2.3. Debug Trait và Derived Traits

Để in struct ra màn hình:

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}
```

Sử dụng:
- `println!("{:?}", rect1)` - Debug format
- `println!("{:#?}", rect1)` - Pretty debug format

### 2.4. Macro `dbg!`

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale),
        height: 50,
    };

    dbg!(&rect1);
}
```

**Đặc điểm của `dbg!`:**
- In ra file và số dòng nơi macro được gọi
- In ra giá trị biểu thức
- In ra stderr (khác với `println!` in ra stdout)
- Trả về ownership của giá trị

---

## Phần 3: Method Syntax

### 3.1. Định nghĩa Method với `impl` Block

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

**Điểm quan trọng:**
- `&self` là viết tắt của `self: &Self`
- Rust tự động xác định method borrows (`&self`), mutably borrows (`&mut self`), hoặc consumes (`self`)

### 3.2. Automatic Referencing and Dereferencing

Rust KHÔNG có toán tử `->` như C/C++. Thay vào đó, Rust tự động thêm `&`, `&mut`, hoặc `*` để object khớp với signature của method.

```rust
let p1 = Point { x: 0.0, y: 0.0 };
let p2 = Point { x: 5.0, y: 6.5 };

// Hai cách gọi sau đây TƯƠNG ĐƯƠNG:
p1.distance(&p2);
(&p1).distance(&p2);
```

### 3.3. Methods với nhiều Parameters

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    let rect2 = Rectangle { width: 10, height: 40 };

    println!("Can rect1 hold rect2? {}", rect1.can_hold(&rect2));
}
```

### 3.4. Associated Functions

Functions trong `impl` block KHÔNG có `self` gọi là **associated functions** - thường dùng làm constructors:

```rust
impl Rectangle {
    // Associated function (không phải method vì không có self)
    fn square(size: u32) -> Self {
        Self {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let sq = Rectangle::square(3);  // Gọi với :: syntax
}
```

**Chú ý:** `Self` là alias cho type trong `impl` block (ví dụ: `Rectangle`)

### 3.5. Multiple `impl` Blocks

Một struct có thể có nhiều `impl` blocks:

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```

### 3.6. Method trùng tên với Field

```rust
impl Rectangle {
    fn width(&self) -> bool {
        self.width > 0
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    // rect1.width() - gọi method
    // rect1.width - truy cập field
    if rect1.width() {
        println!("Width is nonzero: {}", rect1.width);
    }
}
```

Methods như thế này gọi là **getters** - hữu ích để expose field private như read-only.

---

## Tóm tắt

| Concept | Cú pháp |
|---------|---------|
| Định nghĩa | `struct Name { field: Type }` |
| Tạo instance | `Name { field: value }` |
| Truy cập field | `instance.field` |
| Mutable | `let mut instance = ...` |
| Field shorthand | `username,` (khi param = field) |
| Update syntax | `..other_instance` |
| Tuple struct | `struct Name(Type, Type)` |
| Unit struct | `struct Name;` |
| Method | `fn method(&self) -> Type { ... }` |
| Associated function | `fn new(...) -> Self { ... }` |
| Gọi method | `instance.method()` |
| Gọi associated function | `Name::function()` |

**Key takeaways:**
- Structs cho phép gộp nhóm các dữ liệu liên quan với tên rõ ràng
- Methods được định nghĩa trong `impl` blocks với `&self` là tham số đầu tiên
- Rust tự động xử lý referencing/dereferencing cho method calls
- Associated functions không có `self`, thường dùng làm constructors
- Sử dụng `#[derive(Debug)]` để có thể in struct ra màn hình
