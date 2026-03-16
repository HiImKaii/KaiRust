import { Lesson } from '../../courses';

// ==== BUỔI 5: Mảng 1 chiều cơ bản ====
export const ch22_01_ex: Lesson = {
    id: 'ch22-01-ex',
    title: 'Bài tập 22.1: Tìm phần tử lớn nhất',
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
    int a[n];
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

export const ch22_02_ex: Lesson = {
    id: 'ch22-02-ex',
    title: 'Bài tập 22.2: Tìm phần tử nhỏ nhất',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tìm phần tử nhỏ nhất trong mảng một chiều.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[n];
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

export const ch22_03_ex: Lesson = {
    id: 'ch22-03-ex',
    title: 'Bài tập 22.3: Tính tổng mảng',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tính tổng các phần tử trong mảng.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[n];
    for(int i = 0; i < n; i++) cin >> a[i];
    // Tính tổng các phần tử

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5\n1 2 3 4 5',
            expectedOutput: '15',
            description: 'Tổng = 15'
        }
    ]
};

export const ch22_04_ex: Lesson = {
    id: 'ch22-04-ex',
    title: 'Bài tập 22.4: Đếm số chẵn trong mảng',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để đếm số phần tử chẵn trong mảng.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[n];
    for(int i = 0; i < n; i++) cin >> a[i];
    // Đếm số phần tử chẵn

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5\n1 2 3 4 5',
            expectedOutput: '2',
            description: 'Có 2 số chẵn: 2, 4'
        }
    ]
};

export const ch22_05_ex: Lesson = {
    id: 'ch22-05-ex',
    title: 'Bài tập 22.5: Sắp xếp mảng tăng dần',
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
    int a[n];
    for(int i = 0; i < n; i++) cin >> a[i];
    // Sắp xếp mảng tăng dần

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

export const ch22_06_ex: Lesson = {
    id: 'ch22-06-ex',
    title: 'Bài tập 22.6: Tìm kiếm tuyến tính',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tìm kiếm một phần tử trong mảng (tìm kiếm tuyến tính).</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n, x;
    cin >> n >> x;
    int a[n];
    for(int i = 0; i < n; i++) cin >> a[i];
    // Tìm x trong mảng, in vị trí nếu tìm thấy

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
