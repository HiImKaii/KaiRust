import { Lesson } from '../../courses';

// ==== BUỔI 2: If-else, switch-case, vòng lặp ====
export const ch24_01_ex: Lesson = {
    id: 'ch24-01-ex',
    title: 'Bài tập 24.1: Kiểm tra số dương/âm',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để kiểm tra một số là dương, âm hay bằng 0.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập vào một số nguyên n</li>
  <li>In ra "duong" nếu n > 0, "am" nếu n < 0, "0" nếu n = 0</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // Kiểm tra và in kết quả

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5',
            expectedOutput: 'duong',
            description: '5 > 0 là số dương'
        },
        {
            input: '-3',
            expectedOutput: 'am',
            description: '-3 < 0 là số âm'
        },
        {
            input: '0',
            expectedOutput: '0',
            description: '0 bằng 0'
        }
    ]
};

export const ch24_02_ex: Lesson = {
    id: 'ch24-02-ex',
    title: 'Bài tập 24.2: Tính chỉ số BMI',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tính chỉ số BMI và phân loại.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập cân nặng (kg) và chiều cao (m)</li>
  <li>Tính BMI = cân nặng / (chiều cao ^ 2)</li>
  <li>In ra phân loại: "Gay" (BMI < 18.5), "Binh thuong" (18.5-24.9), "Beo" (>= 25)</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    float weight, height;
    cin >> weight >> height;
    // Tính BMI và phân loại

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '70 1.75',
            expectedOutput: 'Binh thuong',
            description: 'BMI = 22.86, bình thường'
        }
    ]
};

export const ch24_03_ex: Lesson = {
    id: 'ch24-03-ex',
    title: 'Bài tập 24.3: Vòng lặp for - In số từ 1 đến n',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để in các số từ 1 đến n.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // In các số từ 1 đến n

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5',
            expectedOutput: '1 2 3 4 5',
            description: 'In các số từ 1 đến 5'
        }
    ]
};

export const ch24_04_ex: Lesson = {
    id: 'ch24-04-ex',
    title: 'Bài tập 24.4: Vòng lặp while - Tính tổng',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ sử dụng vòng lặp while để tính tổng các số từ 1 đến n.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // Tính tổng sử dụng while

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '10',
            expectedOutput: '55',
            description: 'Tổng 1+2+...+10 = 55'
        }
    ]
};

export const ch24_05_ex: Lesson = {
    id: 'ch24-05-ex',
    title: 'Bài tập 24.5: Switch case - Ngày trong tuần',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ sử dụng switch-case để in ra tên ngày trong tuần.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập vào một số nguyên n (1-7)</li>
  <li>In ra tên ngày tương ứng: 1=Chu Nhat, 2=Hai, ..., 7=Thu Bay</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // Sử dụng switch-case

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '3',
            expectedOutput: 'Ba',
            description: 'Ngày thứ 3 là Ba'
        }
    ]
};

export const ch24_06_ex: Lesson = {
    id: 'ch24-06-ex',
    title: 'Bài tập 24.6: Vòng lặp lồng nhau - Bảng cửu chương',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để in bảng cửu chương từ 1 đến 9.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    // In bảng cửu chương từ 1 đến 9

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '',
            expectedOutput: '1 2 3 4 5 6 7 8 9 10',
            description: 'In bảng cửu chương 1'
        }
    ]
};
