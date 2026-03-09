import { Lesson } from '../../courses';

export const ch03_02_ex3: Lesson = {
    id: 'ch03-02-ex3',
    title: 'Bài tập 3.2.3: Truy cập phần tử Mảng (Array)',
    duration: '10 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Truy cập phần tử mảng',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Tính tổng số ngày của tháng đầu tiên và tháng cuối cùng trong năm.',
    inputFormat: 'Không có input (đã cho sẵn mảng)',
    outputFormat: 'In ra tổng số ngày',
    constraints: [
        { field: 'months[0]', condition: '31 (Tháng 1)' },
        { field: 'months[11]', condition: '31 (Tháng 12)' }
    ],
    examples: [
        {
            input: '',
            output: '62'
        }
    ],

    content: `
<div class="cyber-alert info">
  <strong>Chỉ mục (Index):</strong> Dùng cặp ngoặc vuông <code>[]</code> để truy cập. Ví dụ: <code>my_array[0]</code>. Lưu ý: mảng có 12 phần tử thì phần tử cuối cùng sẽ ở vị trí nào?
</div>
`,
    defaultCode: `fn main() {
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Lấy số ngày tháng đầu tiên (index 0)
    let first_month_days = months[0];

    // Lấy số ngày tháng cuối cùng (index 11)
    let last_month_days = months[11];

    // Tính tổng
    let total = first_month_days + last_month_days;

    println!("{}", total);
}
`
};
