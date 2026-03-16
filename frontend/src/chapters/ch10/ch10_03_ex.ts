import { Lesson } from '../../courses';

export const ch10_03_ex: Lesson = {
    id: 'ch10-03-ex',
    title: '10.3 Thực hành: Traits',
    duration: '25 phút',
    type: 'exercise',
    content: `
<h2>Thực hành Traits</h2>
<p>Định nghĩa và implement traits cho các kiểu dữ liệu.</p>

<h3>Yêu cầu</h3>
<ul>
  <li>Tạo trait <code>Description</code> với method <code>get_description()</code></li>
  <li>Implement trait cho struct <code>Book</code> và <code>Person</code></li>
  <li>Viết function <code>print_info&lt;T: Description&gt;(item: &T)</code> để in thông tin</li>
</ul>
`,
    defaultCode: `// Định nghĩa trait Description
trait Description {
    fn get_description(&self) -> String;
}

struct Book {
    title: String,
    author: String,
}

struct Person {
    name: String,
    age: u32,
}

// Implement trait Description cho Book
impl Description for Book {
    fn get_description(&self) -> String {
        // TODO: Trả về "Book: {title} by {author}"
        unimplemented!()
    }
}

// Implement trait Description cho Person
impl Description for Person {
    fn get_description(&self) -> String {
        // TODO: Trả về "Person: {name}, {age} years old"
        unimplemented!()
    }
}

fn print_info<T: Description>(item: &T) {
    // TODO: In ra description
    unimplemented!()
}

fn main() {
    let book = Book {
        title: String::from("The Rust Programming Language"),
        author: String::from("Steve Klabnik"),
    };

    let person = Person {
        name: String::from("Alice"),
        age: 25,
    };

    print_info(&book);
    print_info(&person);
}
`,
    expectedOutput: 'Book: The Rust Programming Language by Steve Klabnik\nPerson: Alice, 25 years old'
};
