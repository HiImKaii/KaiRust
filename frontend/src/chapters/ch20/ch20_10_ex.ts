import { Lesson } from '../../courses';

export const ch20_10_ex: Lesson = {
    id: 'ch20-10-ex',
    title: 'Bài tập 20.10',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Builder</p>',
    defaultCode: `struct User { name: String, email: String }
struct UB { name: Option<String>, email: Option<String> }
impl UB { fn new() -> Self { UB { name: None, email: None } } fn name(mut self, n: String) -> Self { self.name = Some(n); self } fn email(mut self, e: String) -> Self { self.email = Some(e); self } fn build(self) -> User { User { name: self.name.unwrap(), email: self.email.unwrap() } } }
fn main() { let u = UB::new().name("John".into()).email("j@j.com".into()).build(); println!("{}", u.name); }`,
    expectedOutput: 'John',
    testCases: [{ input: 'name', expectedOutput: 'John' }]
};

export const ch20_12_ex: Lesson = {
    id: 'ch20-12-ex',
    title: 'Bài tập 20.12',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Override</p>',
    defaultCode: `trait S { fn n(&self) -> String { String::from("Shape") } fn s(&self) -> i32; }
struct T; impl S for T { fn s(&self) -> i32 { 3 } }
fn main() { let t = T; println!("{} {}", t.n(), t.s()); }`,
    expectedOutput: 'Shape 3',
    testCases: [{ input: 's()', expectedOutput: '3' }]
};

export const ch20_13_ex: Lesson = {
    id: 'ch20-13-ex',
    title: 'Bài tập 20.13',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Supertrait</p>',
    defaultCode: `trait P { fn p(&self) { println!("P"); } }
trait D: P { fn d(&self) { println!("D"); } }
struct S; impl P for S {} impl D for S {}
fn main() { let s = S; s.d(); }`,
    expectedOutput: 'D',
    testCases: [{ input: 'd()', expectedOutput: 'D' }]
};

export const ch20_14_ex: Lesson = {
    id: 'ch20-14-ex',
    title: 'Bài tập 20.14',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Generic</p>',
    defaultCode: `struct P<T> { first: T, second: T }
impl<T> P<T> { fn new(a: T, b: T) -> Self { P { first: a, second: b } } }
fn main() { let p = P::new(1, 2); println!("{} {}", p.first, p.second); }`,
    expectedOutput: '1 2',
    testCases: [{ input: 'first', expectedOutput: '1' }]
};

export const ch20_15_ex: Lesson = {
    id: 'ch20-15-ex',
    title: 'Bài tập 20.15',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Trait Generic</p>',
    defaultCode: `trait C<T> { fn get(&self, i: usize) -> Option<&T>; }
impl<T> C<T> for Vec<T> { fn get(&self, i: usize) -> Option<&T> { self.get(i) } }
fn main() { let v = vec![1,2,3]; println!("{:?}", v.get(1)); }`,
    expectedOutput: 'Some(2)',
    testCases: [{ input: 'get(1)', expectedOutput: '2' }]
};
