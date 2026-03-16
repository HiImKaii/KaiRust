import { Lesson } from '../../courses';

// ==== BUỔI 3: Hàm (Function) ====
export const ch25_01_ex: Lesson = {
    id: 'ch25-01-ex',
    title: 'Bài tập 25.1: Hàm tính giai thừa',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ với hàm tính giai thừa.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết hàm tính giai thừa của một số nguyên dương</li>
  <li>Sử dụng hàm để tính và in kết quả</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Định nghĩa hàm tính giai thừa

int main() {
    int n;
    cin >> n;
    // Gọi hàm và in kết quả

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

export const ch25_02_ex: Lesson = {
    id: 'ch25-02-ex',
    title: 'Bài tập 25.2: Hàm tính tổng các chữ số',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ với hàm tính tổng các chữ số của một số nguyên.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Định nghĩa hàm tính tổng các chữ số

int main() {
    int n;
    cin >> n;
    // Gọi hàm và in kết quả

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '123',
            expectedOutput: '6',
            description: '1 + 2 + 3 = 6'
        }
    ]
};

export const ch25_03_ex: Lesson = {
    id: 'ch25-03-ex',
    title: 'Bài tập 25.3: Hàm kiểm tra số nguyên tố',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ với hàm kiểm tra số nguyên tố.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết hàm kiểm tra một số có phải là số nguyên tố không</li>
  <li>Hàm trả về true/false</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Định nghĩa hàm kiểm tra số nguyên tố

int main() {
    int n;
    cin >> n;
    // Gọi hàm và in kết quả

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '7',
            expectedOutput: '1',
            description: '7 là số nguyên tố'
        }
    ]
};

export const ch25_04_ex: Lesson = {
    id: 'ch25-04-ex',
    title: 'Bài tập 25.4: Hàm truyền tham chiếu',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ sử dụng hàm với tham chiếu để hoán đổi hai số.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Viết hàm hoán đổi giá trị hai số</li>
  <li>Sử dụng tham chiếu (reference) trong hàm</li>
</ol>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Định nghĩa hàm hoán đổi sử dụng tham chiếu

int main() {
    int a, b;
    cin >> a >> b;
    // Gọi hàm hoán đổi
    // In ra kết quả

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '3 5',
            expectedOutput: '5 3',
            description: 'Hoán đổi 3 và 5'
        }
    ]
};

export const ch25_05_ex: Lesson = {
    id: 'ch25-05-ex',
    title: 'Bài tập 25.5: Hàm overload - Tính diện tích',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ với các hàm overload để tính diện tích hình chữ nhật và hình tròn.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Định nghĩa các hàm overload

int main() {
    // Tính diện tích hình chữ nhật
    // Tính diện tích hình tròn

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '3 5',
            expectedOutput: '15',
            description: 'Diện tích hình chữ nhật 3x5 = 15'
        }
    ]
};

export const ch25_06_ex: Lesson = {
    id: 'ch25-06-ex',
    title: 'Bài tập 25.6: Đệ quy - Tính Fibonacci',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ sử dụng đệ quy để tính số Fibonacci thứ n.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Định nghĩa hàm đệ quy Fibonacci

int main() {
    int n;
    cin >> n;
    // Gọi hàm đệ quy và in kết quả

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '6',
            expectedOutput: '8',
            description: 'Fibonacci(6) = 8'
        }
    ]
};
