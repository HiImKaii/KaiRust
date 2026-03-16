// Exercise - ch20_10_ex: Builder Pattern
struct User {
    name: String,
    email: String,
}

struct UserBuilder { name: Option<String>, email: Option<String> }

impl UserBuilder {
    fn new() -> Self { UserBuilder { name: None, email: None } }
    fn name(mut self, n: String) -> Self { self.name = Some(n); self }
    fn email(mut self, e: String) -> Self { self.email = Some(e); self }
    fn build(self) -> User { User { name: self.name.unwrap(), email: self.email.unwrap() } }
}

fn main() { let u = UserBuilder::new().name("John".into()).email("john@example.com".into()).build(); println!("{} {}", u.name, u.email); }
