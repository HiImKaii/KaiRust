import { Lesson } from '../../courses';

// ==== BUỔI 5-6: Ma trận (Matrix) ====
export const ch27_01_ex: Lesson = {
    id: 'ch27-01-ex',
    title: 'Bài tập 27.1: Nhập xuất ma trận',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để nhập và xuất ma trận vuông cấp n.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập n và các phần tử của ma trận n x n</li>
  <li>In ra ma trận theo định dạng</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[100][100];
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            cin >> a[i][j];

    // In ma trận

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '2\n1 2\n3 4',
            expectedOutput: '1 2\n3 4',
            description: 'In ma trận 2x2'
        }
    ]
};

export const ch27_02_ex: Lesson = {
    id: 'ch27-02-ex',
    title: 'Bài tập 27.2: Tổng các phần tử trên đường chéo chính',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tính tổng các phần tử trên đường chéo chính của ma trận vuông.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[100][100];
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            cin >> a[i][j];

    // Tính tổng đường chéo chính

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '3\n1 2 3\n4 5 6\n7 8 9',
            expectedOutput: '15',
            description: 'Tổng = 1 + 5 + 9 = 15'
        }
    ]
};

export const ch27_03_ex: Lesson = {
    id: 'ch27-03-ex',
    title: 'Bài tập 27.3: Ma trận chuyển vị',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tìm ma trận chuyển vị của một ma trận.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[100][100];
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            cin >> a[i][j];

    // Tìm ma trận chuyển vị

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '2\n1 2\n3 4',
            expectedOutput: '1 3\n2 4',
            description: 'Ma trận chuyển vị'
        }
    ]
};

export const ch27_04_ex: Lesson = {
    id: 'ch27-04-ex',
    title: 'Bài tập 27.4: Tổng hai ma trận',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để cộng hai ma trận cùng cấp.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[100][100], b[100][100], c[100][100];
    // Nhập ma trận A
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            cin >> a[i][j];
    // Nhập ma trận B
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            cin >> b[i][j];

    // Cộng hai ma trận

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '2\n1 2\n3 4\n5 6\n7 8',
            expectedOutput: '6 8\n10 12',
            description: 'A + B'
        }
    ]
};

export const ch27_05_ex: Lesson = {
    id: 'ch27-05-ex',
    title: 'Bài tập 27.5: Tích hai ma trận',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để nhân hai ma trận vuông cùng cấp.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[100][100], b[100][100], c[100][100];
    // Nhập ma trận A
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            cin >> a[i][j];
    // Nhập ma trận B
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            cin >> b[i][j];

    // Nhân hai ma trận

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '2\n1 2\n3 4\n5 6\n7 8',
            expectedOutput: '19 22\n43 50',
            description: 'A x B'
        }
    ]
};

export const ch27_06_ex: Lesson = {
    id: 'ch27-06-ex',
    title: 'Bài tập 27.6: Ma trận xoáy ốc',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tạo ma trận xoáy ốc cấp n.</p>
<h3 class="task-heading">Yêu cầu</h3>
<p>Các số được điền vào ma trận theo chiều kim đồng hồ bắt đầu từ 1.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    // Tạo ma trận xoáy ốc

    // In ma trận

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '3',
            expectedOutput: '1 2 3\n8 9 4\n7 6 5',
            description: 'Ma trận xoáy ốc 3x3'
        }
    ]
};
