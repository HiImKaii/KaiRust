import { Lesson } from '../../courses';

// ==== BUỔI 9-10: String ====
export const ch29_01_ex: Lesson = {
    id: 'ch29-01-ex',
    title: 'Bài tập 29.1: Đếm ký tự trong chuỗi',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để đếm số ký tự trong một chuỗi.</p>
`,
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    // Đếm số ký tự

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Hello',
            expectedOutput: '5',
            description: 'Chuỗi "Hello" có 5 ký tự'
        }
    ]
};

export const ch29_02_ex: Lesson = {
    id: 'ch29-02-ex',
    title: 'Bài tập 29.2: Đếm số từ trong chuỗi',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để đếm số từ trong một chuỗi.</p>
`,
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    // Đếm số từ

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Lap trinh C++',
            expectedOutput: '3',
            description: 'Có 3 từ'
        }
    ]
};

export const ch29_03_ex: Lesson = {
    id: 'ch29-03-ex',
    title: 'Bài tập 29.3: Đảo ngược chuỗi',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để đảo ngược một chuỗi.</p>
`,
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    // Đảo ngược chuỗi

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Hello',
            expectedOutput: 'olleH',
            description: 'Đảo ngược chuỗi "Hello"'
        }
    ]
};

export const ch29_04_ex: Lesson = {
    id: 'ch29-04-ex',
    title: 'Bài tập 29.4: Chuẩn hóa tên',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để chuẩn hóa tên người (viết hoa chữ cái đầu mỗi từ).</p>
`,
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    // Chuẩn hóa tên

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: 'nguyen van a',
            expectedOutput: 'Nguyen Van A',
            description: 'Chuẩn hóa tên'
        }
    ]
};

export const ch29_05_ex: Lesson = {
    id: 'ch29-05-ex',
    title: 'Bài tập 29.5: Tìm kiếm trong chuỗi',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tìm vị trí của một ký tự trong chuỗi.</p>
`,
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    char c;
    cin >> s >> c;
    // Tìm vị trí của c trong s

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Hello l',
            expectedOutput: '2',
            description: 'Vị trí của "l" trong "Hello"'
        }
    ]
};

export const ch29_06_ex: Lesson = {
    id: 'ch29-06-ex',
    title: 'Bài tập 29.6: Tách từ trong chuỗi',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ để tách các từ trong một chuỗi và in ra mỗi từ trên một dòng.</p>
`,
    defaultCode: `#include <iostream>
#include <string>
#include <sstream>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    // Tách từ và in ra

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: 'Lap trinh C++',
            expectedOutput: 'Lap\ntrinh\nC++',
            description: 'Tách các từ'
        }
    ]
};
