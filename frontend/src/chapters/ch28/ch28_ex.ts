import { Lesson } from '../../courses';

// ==== BUỔI 7-8: Struct ====
export const ch28_01_ex: Lesson = {
    id: 'ch28-01-ex',
    title: 'Bài tập 28.1: Struct Sinh viên',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ sử dụng struct để quản lý thông tin sinh viên.</p>
<h3 class="task-heading">Yêu cầu</h3>
<ol class="task-list">
  <li>Định nghĩa struct SinhVien gồm: mã SV, tên, điểm trung bình</li>
  <li>Nhập thông tin n sinh viên</li>
  <li>In danh sách sinh viên</li>
</ol>
`,
    defaultCode: `#include <iostream>
#include <string>
using namespace std;

// Định nghĩa struct SinhVien

int main() {
    int n;
    cin >> n;
    // Nhập và in danh sách sinh viên

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '2\n1\nNguyen Van A\n8.5\n2\nLe Thi B\n9.0',
            expectedOutput: '1 Nguyen Van A 8.5\n2 Le Thi B 9.0',
            description: 'In danh sách sinh viên'
        }
    ]
};

export const ch28_02_ex: Lesson = {
    id: 'ch28-02-ex',
    title: 'Bài tập 28.2: Struct Điểm',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ sử dụng struct để quản lý điểm thi của sinh viên.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Định nghĩa struct Diem

int main() {
    int n;
    cin >> n;
    // Nhập và xử lý điểm

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '3\n8.5 7.5 9.0',
            expectedOutput: '8.33',
            description: 'Tính điểm trung bình'
        }
    ]
};

export const ch28_03_ex: Lesson = {
    id: 'ch28-03-ex',
    title: 'Bài tập 28.3: Struct Phân số',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ sử dụng struct để quản lý phân số và thực hiện các phép toán.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Định nghĩa struct PhanSo

int main() {
    // Khai báo và thao tác với phân số

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '1 2 3 4',
            expectedOutput: '5/4',
            description: 'Cộng hai phân số 1/2 + 3/4 = 5/4'
        }
    ]
};

export const ch28_04_ex: Lesson = {
    id: 'ch28-04-ex',
    title: 'Bài tập 28.4: Struct Điểm trong không gian',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ sử dụng struct để quản lý điểm trong không gian 2D/3D.</p>
`,
    defaultCode: `#include <iostream>
#include <cmath>
using namespace std;

// Định nghĩa struct Diem2D

int main() {
    // Tính khoảng cách

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '0 0 3 4',
            expectedOutput: '5',
            description: 'Khoảng cách từ (0,0) đến (3,4)'
        }
    ]
};

export const ch28_05_ex: Lesson = {
    id: 'ch28-05-ex',
    title: 'Bài tập 28.5: Mảng struct',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ sử dụng mảng struct để quản lý danh sách sản phẩm.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Định nghĩa struct SanPham

int main() {
    int n;
    cin >> n;
    // Nhập và xử lý danh sách sản phẩm

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '2\nApples 100\nBananas 50',
            expectedOutput: 'Apples',
            description: 'Tìm sản phẩm có giá cao nhất'
        }
    ]
};

export const ch28_06_ex: Lesson = {
    id: 'ch28-06-ex',
    title: 'Bài tập 28.6: Sắp xếp mảng struct',
    duration: '20 phút',
    type: 'practice',
    isExercise: true,
    content: `
<p>Viết chương trình C++ sắp xếp mảng struct theo một tiêu chí nào đó.</p>
`,
    defaultCode: `#include <iostream>
using namespace std;

// Định nghĩa struct

int main() {
    int n;
    cin >> n;
    // Nhập và sắp xếp

    return 0;
}`,
    expectedOutput: '',
    testCases: [
        {
            input: '3\nB 5\nA 3\nC 7',
            expectedOutput: 'A 3\nB 5\nC 7',
            description: 'Sắp xếp theo tên tăng dần'
        }
    ]
};
