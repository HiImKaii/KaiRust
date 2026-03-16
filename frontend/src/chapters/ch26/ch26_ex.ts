import { Lesson } from '../../courses';

// ==== BUỔI 4: Mảng 1 chiều - Tìm kiếm, sắp xếp ====
export const ch26_01_ex: Lesson = {
    id: 'ch26-01-ex',
    title: 'Bài tập 26.1: Tìm phần tử lớn nhất trong mảng',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tìm phần tử lớn nhất trong mảng một chiều.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập n và n phần tử của mảng</li>
  <li>Tìm và in ra phần tử lớn nhất</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for(int i = 0; i < n; i++) cin >> a[i];

    // Tìm phần tử lớn nhất

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5\n1 5 3 9 2',
            expectedOutput: '9',
            description: 'Phần tử lớn nhất là 9'
        }
    ]
};

export const ch26_02_ex: Lesson = {
    id: 'ch26-02-ex',
    title: 'Bài tập 26.2: Tìm kiếm tuyến tính',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tìm kiếm một phần tử trong mảng (Linear Search).</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n, x;
    cin >> n >> x;
    int a[1000];
    for(int i = 0; i < n; i++) cin >> a[i];

    // Tìm x trong mảng

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5 3\n1 2 3 4 5',
            expectedOutput: '2',
            description: 'Vị trí của 3 là 2 (0-indexed)'
        }
    ]
};

export const ch26_03_ex: Lesson = {
    id: 'ch26-03-ex',
    title: 'Bài tập 26.3: Sắp xếp mảng tăng dần',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để sắp xếp mảng theo thứ tự tăng dần.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for(int i = 0; i < n; i++) cin >> a[i];

    // Sắp xếp mảng tăng dần

    // In mảng sau khi sắp xếp

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5\n5 3 1 4 2',
            expectedOutput: '1 2 3 4 5',
            description: 'Mảng sau khi sắp xếp'
        }
    ]
};

export const ch26_04_ex: Lesson = {
    id: 'ch26-04-ex',
    title: 'Bài tập 26.4: Tìm phần tử nhỏ nhất',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tìm phần tử nhỏ nhất trong mảng.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for(int i = 0; i < n; i++) cin >> a[i];

    // Tìm phần tử nhỏ nhất

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5\n1 5 3 9 2',
            expectedOutput: '1',
            description: 'Phần tử nhỏ nhất là 1'
        }
    ]
};

export const ch26_05_ex: Lesson = {
    id: 'ch26-05-ex',
    title: 'Bài tập 26.5: Đếm số nguyên tố trong mảng',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để đếm số lượng số nguyên tố trong mảng.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Hàm kiểm tra số nguyên tố

int main() {
    int n;
    cin >> n;
    int a[1000];
    for(int i = 0; i < n; i++) cin >> a[i];

    // Đếm số nguyên tố

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '6\n1 5 3 19 18 25',
            expectedOutput: '3',
            description: 'Có 3 số nguyên tố: 5, 3, 19'
        }
    ]
};

export const ch26_06_ex: Lesson = {
    id: 'ch26-06-ex',
    title: 'Bài tập 26.6: Sắp xếp mảng giảm dần',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để sắp xếp mảng theo thứ tự giảm dần.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for(int i = 0; i < n; i++) cin >> a[i];

    // Sắp xếp mảng giảm dần

    // In mảng sau khi sắp xếp

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5\n1 2 3 4 5',
            expectedOutput: '5 4 3 2 1',
            description: 'Mảng sau khi sắp xếp giảm dần'
        }
    ]
};
