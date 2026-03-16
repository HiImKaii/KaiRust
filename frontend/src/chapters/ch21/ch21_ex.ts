import { Lesson } from '../../courses';

export const ch21_01_ex: Lesson = {
    id: 'ch21-01-ex',
    title: 'Bài tập 21.1: Tính tổng 2 số',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tính tổng của hai số nguyên.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập vào hai số nguyên a và b</li>
  <li>Tính và in ra tổng của hai số</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // Tính tổng và in ra

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '3 5',
            expectedOutput: '8',
            description: 'Tổng của 3 + 5 = 8'
        },
        {
            input: '10 20',
            expectedOutput: '30',
            description: 'Tổng của 10 + 20 = 30'
        }
    ]
};

export const ch21_02_ex: Lesson = {
    id: 'ch21-02-ex',
    title: 'Bài tập 21.2: Tính chu vi hình chữ nhật',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tính chu vi hình chữ nhật.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập vào chiều dài và chiều rộng của hình chữ nhật</li>
  <li>Tính và in ra chu vi: P = 2 * (dài + rộng)</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int chieu_dai, chieu_rong;
    cin >> chieu_dai >> chieu_rong;
    // Tính chu vi và in ra

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5 3',
            expectedOutput: '16',
            description: 'Chu vi = 2 * (5 + 3) = 16'
        }
    ]
};

export const ch21_03_ex: Lesson = {
    id: 'ch21-03-ex',
    title: 'Bài tập 21.3: Kiểm tra số chẵn/lẻ',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để kiểm tra một số là chẵn hay lẻ.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập vào một số nguyên n</li>
  <li>In ra "chan" nếu n là số chẵn, "le" nếu n là số lẻ</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // Kiểm tra và in ra kết quả

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '4',
            expectedOutput: 'chan',
            description: '4 là số chẵn'
        },
        {
            input: '7',
            expectedOutput: 'le',
            description: '7 là số lẻ'
        }
    ]
};

export const ch21_04_ex: Lesson = {
    id: 'ch21-04-ex',
    title: 'Bài tập 21.4: Tìm giá trị lớn nhất',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tìm giá trị lớn nhất của hai số.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập vào hai số nguyên a và b</li>
  <li>Tìm và in ra số lớn hơn</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // Tìm số lớn hơn và in ra

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5 8',
            expectedOutput: '8',
            description: 'Số lớn hơn là 8'
        }
    ]
};

export const ch21_05_ex: Lesson = {
    id: 'ch21-05-ex',
    title: 'Bài tập 21.5: Tính giai thừa',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tính giai thừa của một số nguyên dương.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập vào một số nguyên dương n (n <= 20)</li>
  <li>Tính và in ra n! = 1 * 2 * ... * n</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // Tính giai thừa và in ra

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5',
            expectedOutput: '120',
            description: '5! = 120'
        }
    ]
};

export const ch21_06_ex: Lesson = {
    id: 'ch21-06-ex',
    title: 'Bài tập 21.6: In bảng cửu chương',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để in bảng cửu chương của một số.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Nhập vào một số nguyên n (1 <= n <= 10)</li>
  <li>In ra bảng cửu chương n: n*1 đến n*10</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // In bảng cửu chương n

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '5',
            expectedOutput: '5 10 15 20 25 30 35 40 45 50',
            description: 'Bảng cửu chương 5'
        }
    ]
};
