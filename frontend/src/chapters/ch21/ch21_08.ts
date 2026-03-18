// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 8: KIẾN TRÚC MẠNG HIỆN ĐẠI (CNN, RNN & TRANSFORMERS)
//
// Mục tiêu học thuật:
// 1. Phân tích lý do MLP gặp hạn chế với hình ảnh -> Convolution (CNN)
// 2. Khái niệm về dữ liệu tuần tự (Sequential) của RNN, LSTM, GRU
// 3. Cơ chế Self-Attention trong Transformers
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_08_lessons: Lesson[] = [
  {
    id: 'ch21_08_01',
    title: '1. CNN (Convolutional Neural Networks) - Kiến trúc hình ảnh',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">visibility</span> 1. Hạn chế của Mạng Dày Đặc (Dense/MLP) với hình ảnh</h2>

  <h3>1.1. Vấn đề khi sử dụng MLP cho hình ảnh</h3>
  <div class="definition-block mb-4">
    <p>Thuật toán cốt lõi của MLP: Kéo giãn bức ảnh vuông (ví dụ: 28x28 pixel) thành một vector (784 pixel). Sau đó kết nối 784 điểm ảnh này tới các neuron ở tầng tiếp theo.</p>
    <p><strong>Vấn đề:</strong> Khuôn mặt mèo có mắt, mũi, miệng nằm gần nhau. Việc phá vỡ cấu trúc không gian 2D thành vector 1D đã làm mất thông tin vị trí không gian. Mạng Dense không thể nhận biết mối quan hệ không gian giữa các đặc trưng.</p>
  </div>

  <h3><span class="material-symbols-outlined">filter_frames</span> 1.2. Giải pháp CNN: Tích chập (Convolution)</h3>
  <p>LeCun (1989) đề xuất: Thay vì san phẳng ảnh, sử dụng bộ lọc (Filter/Kernel) 3x3 trượt trên ảnh 2D, quét từ trái sang phải, từ trên xuống dưới. Nơi nào có đặc trưng phù hợp, kernel sẽ kích hoạt.</p>

  <div class="features-grid my-4">
    <div class="feature-card">
      <h4 class="font-bold text-blue-800">1. Local Connectivity</h4>
      <p class="text-xs mt-2">Neuron tầng ẩn không còn nhìn toàn bộ 784 pixel, mà chỉ nhìn vùng cục bộ 3x3. Điều này cho phép mạng tập trung vào các đặc trưng cục bộ như cạnh, góc.</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold text-indigo-800">2. Weight Sharing</h4>
      <p class="text-xs mt-2">Thay vì 784 tham số, mạng chỉ cần học 9 tham số trong kernel 3x3. Các trọng số này được chia sẻ khi trượt qua toàn bộ ảnh. Số lượng tham số giảm đáng kể!</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold text-red-800">3. Pooling</h4>
      <p class="text-xs mt-2">Dùng Max-Pooling (2x2) giảm kích thước ảnh. Điều này giúp mạng nhìn được toàn cảnh thay vì chi tiết quá mức.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// MÔ PHỎNG SỰ TRƯỢT CONVOLUTION 2D (Bản chất Toán Học của Kính Lúp)
// =====================================================

fn convolve_2d(image: &Vec<Vec<f64>>, kernel: &Vec<Vec<f64>>) -> f64 {
    let mut sum = 0.0;
    for i in 0..3 {
        for j in 0..3 {
            sum += image[i][j] * kernel[i][j]; // Phép Tích Chập (Lấy Kính Lúp đè lên Ánh Sáng)
        }
    }
    sum
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║       CONVOLUTION FILTER - PHÁT HIỆN CẠNH (EDGE DETECTOR)             ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Giả sử 1 bức ảnh có vùng biên: Bên trái Tối (0), Bên Phải Sáng (255)
    let image_patch = vec![
        vec![0.0, 0.0, 255.0],
        vec![0.0, 0.0, 255.0],
        vec![0.0, 0.0, 255.0]
    ];
    
    // Kernel 3x3 phát hiện cạnh dọc (Vertical Edge) - Bộ lọc Sobel
    let sobel_vertical = vec![
        vec![-1.0, 0.0, 1.0],
        vec![-2.0, 0.0, 2.0],
        vec![-1.0, 0.0, 1.0]
    ];
    
    // Áp dụng kernel lên mảnh ảnh
    let activation_signal = convolve_2d(&image_patch, &sobel_vertical);
    
    println!("\\nMảnh ảnh đang xét (Vực tối - Vực Sáng):");
    println!("{:?}", image_patch[0]);
    println!("{:?}", image_patch[1]);
    println!("{:?}", image_patch[2]);
    
    println!("\\nKính Lúp (Vertical Edge Detector) đè vào tính Tích phân...");
    println!("=> Tín hiệu kích hoạt = {}", activation_signal);
    
    println!("\\n>>> PHÂN TÍCH: Tín hiệu vọt lên 1020! Máy tính phát hoảng: 'À Há! Ở đây CÓ MỘT CÁI VIỀN DỌC CẮT NGANG!' Cấu trúc Bộ Não Người (V1 Visual Cortex) cũng nhìn vạn vật bắt đầu bằng Các Ngấn Cạnh (Edges) y hệt phương pháp Toán Học này.");
}`
  },
  {
    id: 'ch21_08_02',
    title: '2. RNN, LSTM, GRU - Xử lý dữ liệu tuần tự',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">history</span> 2. RNN và xử lý dữ liệu tuần tự</h2>

  <h3>2.1. Nỗi đau của MLP: Cá vàng 3 giây</h3>
  <div class="definition-block mb-4">
    <p>MLP không có khái niệm về chuỗi dữ liệu tuần tự (Sequence).</p>
    <p><strong>Recurrent Neural Networks (RNN)</strong> thay đổi định mệnh bằng một mũi tên Vòng Lặp Tâm Linh: Nơ-ron không chỉ ăn Input hiện tại, nó còn Tự nhả Ngược Trạng Thái của Mình (Hidden State $h_{t-1}$) cắn lại vào hàm Input cho Bước thứ $t$.</p>
    <p class="font-mono bg-blue-50 text-center border p-2 text-sm text-blue-800"> $h_t = tanh(W_{xh} \\cdot x_t + W_{hh} \\cdot h_{t-1} + b)$ </p>
  </div>

  <h3><span class="material-symbols-outlined">water_drop</span> 2.2. Sự biến mất Gradient qua thời gian: Vanishing Gradient</h3>
  <p>RNN có khả năng xử lý chuỗi dữ liệu. Tuy nhiên, hãy tưởng tượng đoạn văn dài 100 từ. Để học sự liên kết giữa từ thứ 1 và từ thứ 100, Đạo hàm Chain Rule phải truyền ngược qua 100 vòng lặp thời gian (BPTT - Backpropagation Through Time). 100 lần nhân với một giá trị nhỏ hơn 1.0 (đạo hàm của Tanh/Sigmoid) dẫn đến Gradient tiến về 0. RNN gặp vấn đề bẩm sinh về việc giữ thông tin từ đầu chuỗi!</p>
  
  <h3><span class="material-symbols-outlined">dns</span> 2.3. Khắc phục vấn đề Gradient với LSTM & GRU</h3>
  <p>Long Short-Term Memory (LSTM) và Gated Recurrent Unit (GRU) ra đời để giải quyết vấn đề này.</p>
  <ul class="text-sm list-disc pl-5 mt-2 space-y-2">
    <li><strong>Kênh trạng thái (Cell State $C_t$):</strong> LSTM sử dụng một đường truyền thẳng xuyên qua toàn bộ các tế bào RNN. Tín hiệu truyền qua đường này với đạo hàm gần bằng 1.0, cho phép Gradient truyền ngược mà không bị suy giảm.</li>
    <li><strong>Cửa quên (Forget Gate):</strong> Khi gặp dấu câu kết thúc đoạn văn, Cửa (điều khiển bởi Sigmoid) sẽ xóa bỏ thông tin cũ để chuẩn bị cho đoạn mới.</li>
  </ul>
</div>
    `,
    defaultCode: `// MÔ PHỎNG NỖI ĐAU "CÁ VÀNG TRÍ NHỚ" CỦA RNN QUA THỜI GIAN
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║       RECURRENT NEURAL NETWORKS (RNN): VÒNG LẶP & SỰ LÃNG QUÊN       ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Từ thời gian t=1 đến t=5
    let words_stream = vec!["Đám", "mây", "đen", "kéo", "mưa"];
    
    // Hệ số W_hh (trọng số kết nối giữa các trạng thái ẩn)
    let w_hh = 0.5;
    let mut hidden_state = 1.0; // Trạng thái ẩn ban đầu tại t=0
    
    println!("Trải qua các bước thời gian (Time-steps):");
    for (t, word) in words_stream.iter().enumerate() {
        // Trạng thái ẩn mới = Trạng thái cũ * hệ số suy giảm
        hidden_state = hidden_state * w_hh;

        println!("  Time {}: Từ '{}' -> Cường độ Gradient: {:.4}", t+1, word, hidden_state);

        if hidden_state < 0.1 {
            println!("  >>> [CẢNH BÁO]: Gradient đã suy giảm gần như hoàn toàn. Mạng không còn giữ được thông tin từ đầu chuỗi!");
        }
    }

    println!("\\n>>> BÀI HỌC: Gradient của RNN suy giảm theo cấp số nhân qua các Time-steps. LSTM giải quyết vấn đề này bằng Cell State với đường truyền gradient gần như không đổi!");
}`
  },
  {
    id: 'ch21_08_03',
    title: '3. Transformer: "Attention is All You Need"',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">insights</span> 3. Transformer: Kiến trúc của Kỷ Nguyên Generative AI</h2>

  <h3>3.1. Vượt qua giới hạn tuần tự</h3>
  <div class="definition-block mb-4">
    <p>RNN/LSTM có nhược điểm là phải xử lý tuần tự từng phần tử: từ thứ 1, rồi từ thứ 2, và cuối cùng mới đến từ thứ 10. Điều này không tận dụng được khả năng tính toán song song của GPU.</p>
    <p>Năm 2017, Google công bố bài báo <strong>"Attention Is All You Need"</strong>. Kiến trúc này không sử dụng vòng lặp RNN. Thay vào đó, toàn bộ 1000 từ được đưa vào ma trận một lúc, cho phép tính toán song song hiệu quả.</p>
  </div>
  
  <h3>3.2. Cơ chế Self-Attention</h3>
  <p>Xét câu: <em>"Ngân hàng bờ sông, tôi ra rút <strong>chi nhánh</strong>."</em> Từ "chi nhánh" cần xác định nó đang thuộc về ngữ cảnh nào. Self-Attention sử dụng 3 ma trận (Q, K, V):</p>

  <ul class="text-sm list-disc pl-5 mt-2 space-y-2">
    <li><strong>Query ($Q$ - Truy vấn):</strong> "chi nhánh" đại diện cho yêu cầu tìm kiếm thông tin về tổ chức.</li>
    <li><strong>Key ($K$ - Khóa):</strong> "Ngân hàng" có đặc điểm là danh từ tổ chức. "Bờ sông" có đặc điểm là địa lý.</li>
    <li><strong>Phép nhân Dot-Product ($Q \\cdot K^T$):</strong> Tính độ tương quan giữa Query của "chi nhánh" với Key của các từ khác. Cặp $Q_{chi\\,nhánh} \\cdot K_{ngân\\,hàng}$ có điểm cao. Cặp với $K_{bờ\\,sông}$ có điểm thấp.</li>
    <li><strong>Value ($V$ - Giá trị):</strong> Hàm Softmax chuẩn hóa điểm số thành xác suất. Giá trị của "Ngân hàng" được sử dụng để tạo biểu diễn mới cho "chi nhánh". Điều này tạo ra ngữ cảnh (Context) cho từ.</li>
  </ul>
  
  <div class="formula-block text-center mt-4 p-4 mb-2">
    $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V$
  </div>

  <div class="callout callout-success mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">webhook</span></div>
    <div class="callout-content">
      <strong>Multi-Head Attention</strong>
      <p>Một đầu Attention chú ý đến mối quan hệ từ vựng (Chi nhánh - Ngân hàng). Multi-Head sử dụng song song nhiều đầu Attention: một đầu phân tích ngữ pháp, một đầu phân tích thì, một đầu phân tích ngữ điệu. Kết quả được kết hợp và đưa vào Linear Layer tạo thành các mô hình LLM hiện đại (ChatGPT/Claude/Gemini).</p>
      <p class="font-bold text-red-800">Không có Time-steps? Vậy vị trí nằm ở đâu? -> Trả lời: Positional Encoding! Mã vị trí (Sin/Cos) được cộng vào dữ liệu để mô hình không quên thứ tự của các từ.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// MÔ PHỎNG DOT-PRODUCT ATTENTION
// =====================================================

// Hàm tính tích vô hướng
fn dot_product(q: &[f64], k: &[f64]) -> f64 {
    q.iter().zip(k.iter()).map(|(a, b)| a * b).sum()
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║       CƠ CHẾ SELF-ATTENTION (MINH HỌA)                              ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Vector đặc điểm của các từ (2 chiều để minh họa)
    // - "Bank":  Tài chính[1.0], Địa lý bờ sông[0.2]
    // - "River": Tài chính[0.0], Địa lý bờ sông[1.0]
    
    let k_bank  = vec![1.0, 0.2];
    let k_river = vec![0.0, 1.0];
    
    println!("\\n[NGỮ CẢNH 1] Tôi đi nộp tiền ở [Bank]...");
    // Query của từ "Money"
    let q_money = vec![1.0, 0.0];

    let score_bank  = dot_product(&q_money, &k_bank);  // 1.0
    let score_river = dot_product(&q_money, &k_river); // 0.0

    println!("-> 'Money' với 'Bank' : Điểm = {:.2}", score_bank);
    println!("-> 'Money' với 'River': Điểm = {:.2}", score_river);
    
    println!("\n[NGỮ CẢNH 2] Tôi chèo thuyền ra bãi [Bank]...");
    // Query của từ "Boat"
    let q_boat = vec![0.0, 1.0];

    let score2_bank  = dot_product(&q_boat, &k_bank);  // 0.2
    let score2_river = dot_product(&q_boat, &k_river); // 1.0

    println!("-> 'Boat' với 'Bank' : Điểm = {:.2}", score2_bank);
    println!("-> 'Boat' với 'River': Điểm = {:.2}", score2_river);

    println!("\n>>> BÀI HỌC: Cơ chế Q*K tính độ tương quan giữa các từ. Điểm cao hơn cho thấy mối liên hệ ngữ cảnh mạnh hơn, cho phép mô hình hiểu nghĩa của từ trong từng ngữ cảnh cụ thể.");
}`
  }
];

export const ch21_08: Chapter = {
  id: 'ch21_08',
  title: '21.8. Kiến Trúc Neural Đương Đại',
  introduction: `
    <h2>Kiến trúc Mạng Neural Hiện đại (CNN - RNN - Transformers)</h2>
    <ul>
      <li>Hạn chế của mạng MLP với dữ liệu hình ảnh và giải pháp tích chập CNN 2D.</li>
      <li>Xử lý dữ liệu tuần tự với RNN và cải thiện bằng GRU/LSTM.</li>
      <li>Kiến trúc Transformer và cơ chế Self-Attention trong các mô hình ngôn ngữ lớn (LLM) hiện đại.</li>
    </ul>
  `,
  lessons: ch21_08_lessons,
};

export default ch21_08;
