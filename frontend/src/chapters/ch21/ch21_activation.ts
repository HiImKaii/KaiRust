// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Activation Functions chi tiết
// =====================================================

import { Lesson, Chapter } from '../../courses';

const activation_lessons: Lesson[] = [
  {
    id: 'ch21_activation_01',
    title: '1. Activation Functions - Tại sao cần thiết?',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">network_ping</span> 13. Activation Functions - Tại sao cần thiết?</h2>

  <h3>13.1. Vấn đề: Không có activation function</h3>
  <p>Nếu không có activation function, Neural Network chỉ là một phép <strong>biến đổi tuyến tính</strong> (linear transformation). Dù bạn có xếp 1000 layer lên nhau thì kết quả cuối cùng vẫn chỉ tương đương với 1 layer duy nhất!</p>

  <div class="formula-block">
    <p>Giả sử không có activation:</p>
    <code>a = W2 * (W1 * x + b1) + b2</code><br/>
    <code>&nbsp;&nbsp;= (W2 * W1) * x + (W2 * b1 + b2)</code><br/>
    <code class="text-blue-600 font-bold">&nbsp;&nbsp;= W' * x + b'</code>
    <p class="mt-2 text-red-500">→ Vẫn là một đường thẳng! Không thể học patterns phức tạp!</p>
  </div>

  <h3>13.2. Giải pháp: Activation Functions</h3>
  <div class="callout callout-info mt-4 mb-4">
    <div class="callout-icon"><span class="material-symbols-outlined">functions</span></div>
    <div class="callout-content">
      <strong>Đưa vào tính phi tuyến (Non-linearity):</strong>
      <p><code>a = σ(W2 * σ(W1 * x + b1) + b2)</code></p>
      <p>Nhờ có hàm <code>σ</code>, hàm số bị bẻ cong, từ đó mạng Neural có thể xấp xỉ MỌI HÀM SỐ trên đời (Universal Approximation Theorem).</p>
    </div>
  </div>

  <h3>13.3. Các loại Activation Functions</h3>
  <div class="image-showcase mt-4 mb-4">
    <img src="/assets/ch21/activation_functions_1773152787399.png" alt="Các hàm kích hoạt phổ biến" style="width: 100%; border-radius: 8px;">
    <p class="image-caption">Bản đồ hình dáng các hàm kích hoạt (Sigmoid, Tanh, ReLU)</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr><th>Tên</th><th>Công thức</th><th>Output Range</th><th>Thường dùng ở</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Step</strong></td><td><code>1 (z≥0), 0 (z&lt;0)</code></td><td>{0, 1}</td><td>Perceptron cổ điển</td></tr>
      <tr><td><strong>Sigmoid</strong></td><td><code>1 / (1 + e⁻ᶻ)</code></td><td>(0, 1)</td><td>Output Layer (Binary Classification)</td></tr>
      <tr><td><strong>Tanh</strong></td><td><code>(eᶻ-e⁻ᶻ)/(eᶻ+e⁻ᶻ)</code></td><td>(-1, 1)</td><td>Hidden Layers (RNN, LSTM)</td></tr>
      <tr class="highlight"><td><strong>ReLU</strong></td><td><code>max(0, z)</code></td><td>[0, +∞)</td><td>Hidden Layers (CNN, Feedforward NN)</td></tr>
      <tr><td><strong>Leaky ReLU</strong></td><td><code>z (z>0), 0.01z (z≤0)</code></td><td>(-∞, +∞)</td><td>Tránh lỗi Dying ReLU</td></tr>
      <tr><td><strong>Softmax</strong></td><td><code>eᶻ / Σ(eᶻ)</code></td><td>(0, 1), Tổng=1</td><td>Output Layer (Multi-class Classification)</td></tr>
    </tbody>
  </table>

  <h3>13.4. GELU - Activation của Transformers/BERT</h3>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">hub</span></div>
      <h4>GELU (Gaussian Error Linear Unit)</h4>
      <p><code>GELU(x) = x × Φ(x)</code></p>
      <p class="text-sm mt-2 text-gray-600">Với Φ(x) là hàm phân phối chuẩn.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">trending_flat</span></div>
      <h4>Đặc điểm</h4>
      <ul class="text-sm">
        <li>Mượt (Smooth) hơn ReLU.</li>
        <li>Cho phép một chút giá trị âm thấm qua mượt mà.</li>
        <li>Là "quốc thực" của các mô hình LLM hiện nay (GPT, BERT).</li>
      </ul>
    </div>
  </div>

  <h3>13.5. Ý nghĩa hình học - Activation "bẻ cong" không gian</h3>
  <div class="concept-grid mt-4">
    <div class="concept-card">
      <div class="concept-icon text-gray-500"><span class="material-symbols-outlined">straight</span></div>
      <h4>KHÔNG CÓ ACTIVATION</h4>
      <p>Mỗi layer chỉ xoay, co hoặc dãn không gian một cách rập khuôn. Dữ liệu phức tạp như đồ thị XOR mãi mãi không thể kẻ một đường thẳng để cắt.</p>
    </div>
    <div class="concept-card highlight-success">
      <div class="concept-icon"><span class="material-symbols-outlined">waves</span></div>
      <h4>CÓ ACTIVATION</h4>
      <p>Nhào nặn không gian dữ liệu như đất sét. Bẻ cong, cắt dán giúp những điểm dữ liệu vốn đan xen nhau nay có thể dễ dàng tách biệt bởi một đường cắt phẳng lì.</p>
    </div>
  </div>

  <h3>13.6. Dead Neuron Problem (Đặc biệt với ReLU)</h3>
  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">heart_broken</span></div>
    <div class="callout-content">
      <strong>VẤN ĐỀ: Dying ReLU</strong>
      <p>Nếu trọng số vô tình khiến z luôn < 0 cho toàn bộ tập training, hàm ReLU sẽ trả về 0. Lúc này Gradient = 0, Weight TỊT luôn KHÔNG update nữa. Neuron đó chính thức "đã chết" (Dead Neuron).</p>
      <p class="mt-2 text-blue-600 font-bold">Giải Pháp:</p>
      <ul>
        <li>Dùng <strong>Leaky ReLU</strong>: Cho rỉ một xíu giá trị (0.01) khi âm.</li>
        <li>Dùng <strong>ELU / GELU</strong>: Làm mềm đường cong tiếp cận số 0.</li>
        <li>Khởi tạo weight và thiết lập Learning Rate kỹ lưỡng.</li>
      </ul>
    </div>
  </div>

  <h3>13.7. Hướng dẫn chọn Activation nhanh gọn</h3>
  <ul class="steps-container mt-4">
    <li class="step-card">
      <div class="step-number" style="background-color: var(--primary-gray);">1</div>
      <p>Model thông thường (Hidden Layers)? → Nhắm mắt chọn <strong>ReLU</strong>.</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--primary-gray);">2</div>
      <p>Train LLM hoặc Transformer? → Xin mời xài <strong>GELU/Swish</strong>.</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--primary-gray);">3</div>
      <p>Dự đoán Xác suất Có/Không? (Output layer) → Về đội <strong>Sigmoid</strong>.</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--primary-gray);">4</div>
      <p>Phân loại Hình ảnh Chó/Mèo/Lợn/Gà? (Output layer) → Chốt đơn <strong>Softmax</strong>.</p>
    </li>
  </ul>
</div>
    `,
    defaultCode: `// =====================================================
// ACTIVATION FUNCTIONS - TẤT CẢ TRONG MỘT
// =====================================================

fn sigmoid(x: f64) -> f64 { 1.0 / (1.0 + (-x).exp()) }
fn tanh_fn(x: f64) -> f64 { x.tanh() }
fn relu(x: f64) -> f64 { if x > 0.0 { x } else { 0.0 } }
fn leaky_relu(x: f64) -> f64 { if x > 0.0 { x } else { 0.01 * x } }
fn elu(x: f64) -> f64 { if x > 0.0 { x } else { 1.0 * (x.exp() - 1.0) } }
fn swish(x: f64) -> f64 { x * sigmoid(x) }

fn softmax(inputs: &[f64]) -> Vec<f64> {
    let max = inputs.iter().fold(f64::NEG_INFINITY, |a, b| a.max(*b));
    let sum: f64 = inputs.iter().map(|x| (x - max).exp()).sum();
    inputs.iter().map(|x| (x - max).exp() / sum).collect()
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║           ACTIVATION FUNCTIONS - SO SÁNH CHI TIẾT                 ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    let values = vec![-3.0, -2.0, -1.0, -0.5, 0.0, 0.5, 1.0, 2.0, 3.0];

    println!("\\n╔════════════════════════════════════════════════════════════════════════╗");
    println!("║   x    │  Sigmoid  │   Tanh   │  ReLU  │ LeakyReLU │  ELU   │ Swish ║");
    println!("╠════════╪═══════════╪══════════╪════════╪═══════════╪════════╪═══════╣");

    for x in &values {
        println!("║ {:6.1} │  {:7.4}  │  {:7.4}  │ {:6.2} │   {:7.4}  │ {:6.4} │ {:5.4} ║",
                 x, sigmoid(*x), tanh_fn(*x), relu(*x),
                 leaky_relu(*x), elu(*x), swish(*x));
    }
    println!("╚════════════════════════════════════════════════════════════════════════╝");

    println!("\\n=== SOFTMAX (Multi-class) ===");
    let scores = vec![2.0, 1.0, 0.1];
    let probs = softmax(&scores);

    println!("Scores: {:?}", scores);
    println!("Probs:  ");
    for (s, p) in scores.iter().zip(probs.iter()) {
        println!("  class {}: {:.4} ({:.1}%)",
                 0, p, p * 100.0);
    }

    println!("\\n=== ĐẶC ĐIỂM CỦA TỪNG ACTIVATION ===");
    println!("");
    println!("Sigmoid:");
    println!("  ✓ Output (0,1) - như xác suất");
    println!("  ✗ Vanishing gradient (max = 0.25)");
    println!("");
    println!("Tanh:");
    println!("  ✓ Output (-1,1) - zero-centered");
    println!("  ✗ Vanishing gradient");
    println!("");
    println!("ReLU:");
    println!("  ✓ Tính nhanh (chỉ so sánh)");
    println!("  ✓ Gradient = 1 khi x > 0");
    println!("  ✗ Dying ReLU (neuron chết khi x < 0)");
    println!("");
    println!("Leaky ReLU:");
    println!("  ✓ Sửa Dying ReLU");
    println!("  ✓ Gradient nhỏ khi x < 0");
    println!("");
    println!("Softmax:");
    println!("  ✓ Tổng = 1 (phân phối xác suất)");
    println!("  ✗ Chỉ dùng ở output layer");
    println!("");
    println!("=== KẾT LUẬN ===");
    println!("• Hidden layers: Dùng ReLU (phổ biến nhất)");
    println!("• Output binary: Dùng Sigmoid");
    println!("• Output multi-class: Dùng Softmax");
}`,
  },
  {
    id: 'ch21_activation_02',
    title: '2. Vanishing Gradient - Vấn đề lớn',
    duration: '30 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">water_drop</span> 14. Vanishing Gradient - Cơn ác mộng của Deep Learning</h2>

  <h3>14.1. Vấn đề là gì?</h3>
  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">warning</span></div>
    <div class="callout-content">
      <strong>Gradient bị "bay màu":</strong>
      Khi mạng quá sâu (Deep Neural Networks có hàng chục layer), Gradient khi lội ngược dòng từ Output về Input sẽ bị teo nhỏ dần, tới mức chạm mốc 0. Hậu quả là các Layer ở phần đầu mạng "phá sản", không nhận được tí Error Signal nào để update Weights → Mạng KHÔNG HỌC ĐƯỢC!
    </div>
  </div>

  <h3>14.2. Nguyên nhân cốt lõi</h3>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">calculate</span></div>
      <h4>Phạm tội do Hàm Kích Hoạt</h4>
      <p>Do sử dụng <strong>Sigmoid/Tanh</strong> có vùng đạo hàm kịch trần rất hẹp (Max Sigmoid' = 0.25). Thử tưởng tượng: nhân liên tiếp hàng chục con số <= 0.25 vào với nhau thì kết quả sẽ tiệm cận 0 siêu nhanh.</p>
    </div>
  </div>

  <h3>14.3. Giải pháp hiệu nghiệm</h3>
  <div class="concept-grid">
    <div class="concept-card highlight-success">
      <div class="concept-icon"><span class="material-symbols-outlined">done</span></div>
      <h4>Dùng ReLU</h4>
      <p>Gradient = 1 (với x > 0). Nhân 1 ngàn lần số 1 vẫn là 1. Gradient không bao giờ suy yếu!</p>
    </div>
    <div class="concept-card highlight-success">
      <div class="concept-icon"><span class="material-symbols-outlined">tune</span></div>
      <h4>Batch Normalization</h4>
      <p>Ép Activation về vùng ổn định, không cho nó "trôi dạt" ra rìa đạo hàm = 0 của Sigmoid/Tanh.</p>
    </div>
    <div class="concept-card highlight-success">
      <div class="concept-icon"><span class="material-symbols-outlined">route</span></div>
      <h4>Skip Connections (ResNet)</h4>
      <p>Tạo "đường rẽ tắt" (Xuyên không) cho Gradient chạy phi nước đại từ cuối lên thẳng đầu mạng.</p>
    </div>
  </div>

  <hr class="my-6 border-gray-300">

  <h3><span class="material-symbols-outlined">rocket_launch</span> 14.4. Exploding Gradient - Vấn đề ngược lại</h3>
  <p>Thay vì bé đi, lần này Gradient hóa thú lớn vọt lên tới tận vũ trụ (Infinity).</p>
  <div class="features-grid mt-4">
    <div class="feature-card">
      <div class="feature-icon text-red-600"><span class="material-symbols-outlined">emergency</span></div>
      <h4>Dấu Hiệu</h4>
      <ul class="text-sm">
        <li>Loss đột ngột = NaN hoặc Inf.</li>
        <li>Weights tăng rất nhanh, văng tung tóe.</li>
        <li>Training cực kỳ thiếu ổn định (nhảy lung tung).</li>
      </ul>
    </div>
    <div class="feature-card">
      <div class="feature-icon text-blue-600"><span class="material-symbols-outlined">car_crash</span></div>
      <h4>Khắc phục</h4>
      <ul class="text-sm">
        <li><strong>Gradient Clipping:</strong> Đóng trần! Nếu gradient > 5, gọt chóp nó xuống còn 5.</li>
        <li><strong>Weight Regularization:</strong> Đội thêm hình phạt cho hàm Loss.</li>
        <li><strong>Batch Normalization.</strong></li>
      </ul>
    </div>
  </div>

  <h3>14.5. Batch Normalization (Trụ cột của Modern DL)</h3>
  <div class="definition-block">
    <p>Ép output của mỗi layer về Trung bình (Mean) = 0 và Độ lệch chuẩn (Std) = 1 ngay trước khi nạp vào Activation.</p>
    <div class="formula-block">
      z_norm = (z - μ) / √(σ² + ε)
    </div>
    <p class="mt-2"><strong>Lợi ích:</strong> Train nhanh hơn hẳn, cho phép dùng Learning Rate to đùng bão không sợ ngã, đè bẹp Vanishing / Exploding.</p>
  </div>

  <h3>14.6. Residual/Skip Connections (Cách mạng mạng rất sâu)</h3>
  <div class="callout callout-info">
    <div class="callout-icon"><span class="material-symbols-outlined">alt_route</span></div>
    <div class="callout-content">
      <strong>Bí thuật của ResNet:</strong><br/>
      Thay vì cố ép mạng học Mapping <code>F(x)</code>, ta chế đường rẽ tắt x từ ngoài vào CỘNG trực tiếp vào output: <code>output = F(x) + x</code>.
      <br/><br/>
      Khi chạy Backprop, Gradient sẽ đi thẳng qua dải phân cách rẽ tắt này nguyên vẹn về layer trước mà không bị mài mòn! Phép màu này giúp Microsoft đẻ ra mạng có tận 152 layers (ResNet-152) chiến thắng ImageNet 2015.
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// VANISHING GRADIENT - MINH HỌA VẤN ĐỀ
// =====================================================

fn sigmoid(x: f64) -> f64 { 1.0 / (1.0 + (-x).exp()) }
fn sigmoid_deriv(x: f64) -> f64 { let s = sigmoid(x); s * (1.0 - s) }

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              VANISHING GRADIENT - VẤN ĐỀ LỚN                      ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    println!("\\n=== Sigmoid Derivative ===");
    println!("Giá trị x | σ(x)    | σ'(x)");
    println!("-----------|----------|----------");
    for x in [-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0].iter() {
        println!("{:10.1} | {:8.4} | {:8.4}", x, sigmoid(*x), sigmoid_deriv(*x));
    }

    println!("\\n=== Gradient Qua Nhiều Layers ===");
    println!("Sigmoid: derivative max = 0.25");
    println!("");
    println!("Layers | Gradient");
    println!("-------|----------");
    let mut grad = 1.0;
    for n in 0..=10 {
        println!("   {}   | {:.8}", n, grad);
        grad *= 0.25;
    }

    println!("\\n=== ReLU: KHÔNG Vanishing! ===");
    println!("ReLU derivative = 1 khi x > 0");
    println!("→ Gradient KHÔNG giảm qua các layers!");
    println!("→ Đây là lý do ReLU phổ biến!");
}`,
  },
];

export const ch21_activation: Chapter = {
  id: 'ch21_activation',
  title: '21.5. Activation Functions',
  introduction: `<h2>Activation Functions chi tiết</h2>`,
  lessons: activation_lessons,
};

export default ch21_activation;
