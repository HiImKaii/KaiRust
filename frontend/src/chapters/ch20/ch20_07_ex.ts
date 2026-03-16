import { Lesson } from '../../courses';

export const ch20_07_ex: Lesson = {
    id: 'ch20-07-ex',
    title: 'Bài tập 20.7',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Borrow</p>',
    defaultCode: `struct R { w: u32, h: u32 }\nimpl R { fn w(&self) -> u32 { self.w } }\nfn main() { let r = R { w: 30, h: 50 }; println!("{}", r.w()); }`,
    expectedOutput: '30',
    testCases: [{ input: 'w()', expectedOutput: '30' }]
};

export const ch20_08_ex: Lesson = {
    id: 'ch20-08-ex',
    title: 'Bài tập 20.8',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Mutable ref</p>',
    defaultCode: `struct R { w: u32, h: u32 }\nimpl R { fn resize(&mut self, w: u32, h: u32) { self.w = w; self.h = h; } }\nfn main() { let mut r = R { w: 30, h: 50 }; r.resize(10,20); println!("{} {}", r.w, r.h); }`,
    expectedOutput: '10 20',
    testCases: [{ input: 'w', expectedOutput: '10' }]
};

export const ch20_09_ex: Lesson = {
    id: 'ch20-09-ex',
    title: 'Bài tập 20.9',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: '<p>Ownership</p>',
    defaultCode: `struct S { s: String }\nimpl S { fn take(self) -> String { self.s } }\nfn main() { let sw = S { s: String::from("Hello") }; println!("{}", sw.take()); }`,
    expectedOutput: 'Hello',
    testCases: [{ input: 'take()', expectedOutput: 'Hello' }]
};
