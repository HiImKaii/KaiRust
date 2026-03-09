import { Lesson } from '../../courses';

export const ch06_03_ex: Lesson = {
    id: 'ch06-03-ex',
    title: 'Bài tập 6.3: Cú pháp if let',
    duration: '15 phút',
    type: 'practice',
    isExercise: true,

    problemTitle: 'Cú pháp if let',
    memoryLimit: '256MB',
    timeLimit: '1s',

    // Đề bài chi tiết
    problemDescription: `Thực hành sử dụng cú pháp if let để xử lý Option<T> một cách ngắn gọn.

Yêu cầu:
1. Viết hàm extract_and_double(opt: Option<i32>) -> Option<i32>
   - Nếu có giá trị (Some), nhân đôi và trả về
   - Nếu None, trả về None
2. Viết hàm describe_age(age: Option<u8>) sử dụng if let để in thông báo phù hợp`,

    // Định dạng input
    inputFormat: 'Gọi hàm với các giá trị Option khác nhau',

    // Định dạng output
    outputFormat: 'In ra kết quả tương ứng',

    // Các ràng buộc
    constraints: [
        { field: 'extract_and_double', condition: 'Nhận Option<i32>, trả về Option<i32>' },
        { field: 'describe_age', condition: 'Sử dụng if let để xử lý Option<u8>' }
    ],

    // Ví dụ minh họa
    examples: [
        {
            input: 'extract_and_double(Some(5))',
            output: 'Some(10)',
            explanation: 'Nhân đôi giá trị 5 x 2 = 10'
        },
        {
            input: 'extract_and_double(None)',
            output: 'None',
            explanation: 'Trả về None khi input là None'
        }
    ],

    // Nội dung lý thuyết và hướng dẫn
    content: `
<h3>Hướng dẫn</h3>

<h4>Hàm extract_and_double:</h4>
<pre><code>fn extract_and_double(opt: Option<i32>) -> Option<i32> {
    if let Some(value) = opt {
        Some(value * 2)
    } else {
        None
    }
}</code></pre>

<h4>Hàm describe_age với if let:</h4>
<pre><code>fn describe_age(age: Option<u8>) {
    if let Some(a) = age {
        if a >= 18 {
            println!("Người lớn, tuổi: {}", a);
        } else {
            println!("Trẻ em, tuổi: {}", a);
        }
    } else {
        println!("Không biết tuổi");
    }
}</code></pre>
`,

    // Code mẫu có sẵn
    defaultCode: `// TODO: Viết hàm extract_and_double nhận Option<i32>, trả về Option<i32>

// TODO: Viết hàm describe_age nhận Option<u8>, sử dụng if let

fn main() {
    // Test
    println!("{:?}", extract_and_double(Some(5)));
    println!("{:?}", extract_and_double(None));

    describe_age(Some(25));
    describe_age(None);
}
`,

    // Test case để chấm bài
    testCases: [
        {
            input: 'extract_and_double(Some(5))',
            expectedOutput: 'Some(10)',
            description: 'Nhân đôi giá trị trong Some'
        },
        {
            input: 'extract_and_double(None)',
            expectedOutput: 'None',
            description: 'Trả về None khi input là None'
        },
        {
            input: 'extract_and_double(Some(0))',
            expectedOutput: 'Some(0)',
            description: 'Nhân đôi giá trị 0'
        }
    ]
};
