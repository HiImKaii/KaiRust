import { Chapter } from '../courses';
import { ch02_01_ex } from '../chapters/ch02/ch02_01_ex';
import { ch02_02_ex } from '../chapters/ch02/ch02_02_ex';
import { ch02_03_ex } from '../chapters/ch02/ch02_03_ex';
import { ch02_04_ex } from '../chapters/ch02/ch02_04_ex';
import { ch02_05_ex } from '../chapters/ch02/ch02_05_ex';
import { ch02_06_ex } from '../chapters/ch02/ch02_06_ex';
import { ch02_07_ex } from '../chapters/ch02/ch02_07_ex';

import { ch03_01_ex } from '../chapters/ch03/ch03_01_ex';
import { ch03_01_ex2 } from '../chapters/ch03/ch03_01_ex2';
import { ch03_01_ex3 } from '../chapters/ch03/ch03_01_ex3';
import { ch03_02_ex } from '../chapters/ch03/ch03_02_ex';
import { ch03_02_ex2 } from '../chapters/ch03/ch03_02_ex2';
import { ch03_02_ex3 } from '../chapters/ch03/ch03_02_ex3';
import { ch03_03_ex } from '../chapters/ch03/ch03_03_ex';
import { ch03_03_ex2 } from '../chapters/ch03/ch03_03_ex2';
import { ch03_05_ex } from '../chapters/ch03/ch03_05_ex';
import { ch03_05_ex2 } from '../chapters/ch03/ch03_05_ex2';

export const basics_assignment: Chapter = {
    id: 'assign-basics',
    title: 'Luyện tập: Cơ bản về Rust',
    introduction: 'Tổng hợp các bài tập về biến, kiểu dữ liệu, và hàm cơ bản trong Rust.',
    lessons: [
        ch02_01_ex, ch02_02_ex, ch02_03_ex, ch02_04_ex, ch02_05_ex, ch02_06_ex, ch02_07_ex,
        ch03_01_ex, ch03_01_ex2, ch03_01_ex3, ch03_02_ex, ch03_02_ex2, ch03_02_ex3,
        ch03_03_ex, ch03_03_ex2, ch03_05_ex, ch03_05_ex2
    ]
};
