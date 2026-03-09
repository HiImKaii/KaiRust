import { Lesson } from '../../courses';

export const ch03_05_ex8: Lesson = {
    id: 'ch03-05-ex8',
    title: 'Bài tập 3.5.8: Cellular Automaton 1D',
    duration: '45 phút',
    type: 'practice',
    isExercise: true,

    // Competitive Programming Format
    problemTitle: 'Cellular Automaton 1D',
    memoryLimit: '256MB',
    timeLimit: '1s',
    problemDescription: 'Mô phỏng Cellular Automaton 1D với 3 thế hệ. Quần thể ban đầu: [0, 0, 1, 0, 1, 0, 0, 1, 0].',
    inputFormat: 'Cho sẵn mảng 9 phần tử',
    outputFormat: 'In ra trạng thái các thế hệ',
    constraints: [
        { field: 'Cells', condition: '9 phần tử, giá trị 0 hoặc 1' },
        { field: 'Generations', condition: '3' }
    ],
    examples: [
        {
            input: '[0, 0, 1, 0, 1, 0, 0, 1, 0]',
            output: 'Gen 0: [0, 0, 1, 0, 1, 0, 0, 1, 0]\nGen 1: ...'
        }
    ],

    content: `
<div class="cyber-alert info">
  <strong>Vòng lặp bên ngoài, vòng lặp bên trong:</strong> Một bài tập rèn tư duy đỉnh cao! Đừng để bị loạn số index của mảng nhé. Dùng <code>if</code> lồng trong <code>loop/while</code>.
</div>
`,
    defaultCode: `fn main() {
    let mut cells = [0, 0, 1, 0, 1, 0, 0, 1, 0];
    let generations = 3;

    println!("Gen 0: {:?}", cells);

    let mut gen_count = 1;
    while gen_count <= generations {
        let mut next_cells = cells;

        let mut i = 0;
        while i < 9 {
            let left = if i == 0 { 0 } else { cells[i - 1] };
            let right = if i == 8 { 0 } else { cells[i + 1] };
            let sum = left + right;

            if cells[i] == 1 && sum == 1 {
                next_cells[i] = 1;
            } else if cells[i] == 0 && sum == 1 {
                next_cells[i] = 1;
            } else {
                next_cells[i] = 0;
            }

            i += 1;
        }

        cells = next_cells;
        println!("Gen {}: {:?}", gen_count, cells);
        gen_count += 1;
    }
}
`
};
