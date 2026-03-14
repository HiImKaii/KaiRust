import { Chapter } from '../courses';
import { ch04_01_ex1 } from '../chapters/ch04/ch04_01_ex1';
import { ch04_01_ex2 } from '../chapters/ch04/ch04_01_ex2';
import { ch04_01_ex3 } from '../chapters/ch04/ch04_01_ex3';
import { ch04_02_ex1 } from '../chapters/ch04/ch04_02_ex1';
import { ch04_02_ex2 } from '../chapters/ch04/ch04_02_ex2';
import { ch05_01_ex } from '../chapters/ch05/ch05_01_ex';
import { ch05_02_ex } from '../chapters/ch05/ch05_02_ex';
import { ch06_01_ex } from '../chapters/ch06/ch06_01_ex';
import { ch06_02_ex } from '../chapters/ch06/ch06_02_ex';

export const ownership_structs_assignment: Chapter = {
    id: 'assign-ownership-structs',
    title: 'Luyện tập: Ownership & Structs',
    introduction: 'Các bài tập nâng cao về quản lý bộ nhớ, quyền sở hữu và cấu trúc dữ liệu trong Rust.',
    lessons: [
        ch04_01_ex1, ch04_01_ex2, ch04_01_ex3,
        ch04_02_ex1, ch04_02_ex2,
        ch05_01_ex, ch05_02_ex,
        ch06_01_ex, ch06_02_ex
    ]
};
