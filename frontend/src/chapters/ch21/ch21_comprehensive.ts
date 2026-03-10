// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài: Neural Networks từ cơ bản đến nâng cao
// Phiên bản CỰC KỲ CHI TIẾT
// =====================================================

import { Lesson, Chapter } from '../../courses';

// =====================================================
// PHẦN: TỔNG HỢP - NEURAL NETWORKS CHI TIẾT
// =====================================================

const comprehensive_lessons: Lesson[] = [
  {
    id: 'ch21_comp_01',
    title: '1. Neural Network hoạt động như thế nào? Giải thích toàn bộ',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">hub</span> 1. Neural Network hoạt động như thế nào?</h2>

  <h3>1.1. Tổng quan kiến trúc</h3>
  <p>Neural Network là một hệ thống tính toán được lấy cảm hứng từ cấu trúc phân tầng của não bộ sinh học. Nó bao gồm nhiều <strong>"Neurons"</strong> (đơn vị tính toán vô cơ) được kết nối chằng chịt với nhau thông qua các <strong>"Weights"</strong> (trọng số).</p>

  <h3>1.2. Giải phẫu một Neural Network</h3>
  <div class="image-showcase mt-4 mb-4">
    <pre class="bg-slate-100 p-4 rounded-lg font-mono text-sm leading-relaxed overflow-x-auto text-center mx-auto w-max text-blue-900 border border-slate-200 shadow-sm">
      [INPUT LAYER]                [HIDDEN LAYER 1]               [OUTPUT LAYER]

         x₁ ──┐               h₁ = f(w₁₁x₁ + w₂₁x₂ + b₁)         
              │                            │                     
         x₂ ──┼──► [N] ───────────────►   [N]   ───────────────►  [N] ──► y (Dự đoán)
              │                            │                     
         x₃ ──┘               h₂ = f(w₁₂x₁ + w₂₂x₂ + b₂)         
    </pre>
    <p class="image-caption">Sơ đồ luân chuyển dữ liệu (Forward Pass) của một Neural Network cơ bản</p>
  </div>

  <h3>1.3. Nhiệm vụ của từng Layer</h3>
  <div class="features-grid">
    <div class="feature-card highlight-info">
      <div class="feature-icon"><span class="material-symbols-outlined">login</span></div>
      <h4>Input Layer (Đầu vào)</h4>
      <p>Gateway đón nhận dữ liệu. Số lượng neuron đúng bằng số Features (Đặc trưng) của Data. Ví dụ: Ảnh 28x28 pixels → cần 784 Input Neurons.</p>
    </div>
    <div class="feature-card highlight-warning">
      <div class="feature-icon"><span class="material-symbols-outlined">layers</span></div>
      <h4>Hidden Layers (Lớp ẩn)</h4>
      <p>Nơi "Ma thuật" xuất hiện. Chịu trách nhiệm trích xuất từ các Feature thô ráp ra các Pattern phức tạp siêu hình. Càng nhiều Layer thì Network càng "Sâu" (Deep Learning).</p>
    </div>
    <div class="feature-card highlight-success">
      <div class="feature-icon"><span class="material-symbols-outlined">logout</span></div>
      <h4>Output Layer (Đầu ra)</h4>
      <p>Chốt hạ phán quyết cuối cùng thành hình hài con người hiểu được. Phân loại Chó/Mèo thì có 2 Neurons, dự đoán Giá Nhà thì có 1 Neuron.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// NEURAL NETWORK HOẠT ĐỘNG NHƯ THẾ NÀO?
// Minh họa chi tiết từng bước
// =====================================================

fn sigmoid(x: f64) -> f64 {
    1.0 / (1.0 + (-x).exp())
}

struct NeuralNetwork {
    w1: f64, w2: f64,
    w3: f64, w4: f64,
    b1: f64, b2: f64,
    w5: f64, w6: f64,
    b3: f64,
}

impl NeuralNetwork {
    fn new() -> Self {
        NeuralNetwork {
            w1: 0.5, w2: 0.7,
            w3: 0.3, w4: 0.9,
            b1: 0.1, b2: 0.2,
            w5: 0.8, w6: 0.4,
            b3: 0.1,
        }
    }

    fn forward(&self, x1: f64, x2: f64) -> (f64, f64, f64, f64, f64, f64) {
        let z1 = self.w1 * x1 + self.w2 * x2 + self.b1;
        let h1 = sigmoid(z1);
        let z2 = self.w3 * x1 + self.w4 * x2 + self.b2;
        let h2 = sigmoid(z2);
        let z3 = self.w5 * h1 + self.w6 * h2 + self.b3;
        let output = sigmoid(z3);
        (z1, h1, z2, h2, z3, output)
    }
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║     NEURAL NETWORK HOẠT ĐỘNG NHƯ THẾ NÀO?                      ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    let nn = NeuralNetwork::new();

    println!("\\n=== VÍ DỤ: DỰ ĐOÁN MUA NHÀ ===");
    println!("Input 1 (x1): Thu nhập (1 = cao, 0 = thấp)");
    println!("Input 2 (x2): Đã có nhà chưa (1 = có, 0 = chưa)");
    println!("Output: Có mua nhà không (1 = mua, 0 = không)");

    let test_cases = vec![
        (0.0, 0.0, "Thu nhập thấp, chưa có nhà"),
        (0.0, 1.0, "Thu nhập thấp, đã có nhà"),
        (1.0, 0.0, "Thu nhập cao, chưa có nhà"),
        (1.0, 1.0, "Thu nhập cao, đã có nhà"),
    ];

    println!("\\n=== KẾT QUẢ ===");
    for (x1, x2, desc) in &test_cases {
        let (_, h1, _, h2, _, output) = nn.forward(*x1, *x2);
        let prediction = if output > 0.5 { "MUA" } else { "KHÔNG MUA" };
        println!("{}: h1={:.3}, h2={:.3}, output={:.3} → {}",
                 desc, h1, h2, output, prediction);
    }

    println!("\\n=== TỔNG KẾT ===");
    println!("1. Input → Hidden: Tính weighted sum + activation");
    println!("2. Hidden → Output: Tính weighted sum + activation");
    println!("3. Output: Kết quả dự đoán");
    println!("\\n→ Đây là FORWARD PASS!");
}`,
  },
  {
    id: 'ch21_comp_02',
    title: '2. Backpropagation - Cách Neural Networks HỌC',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">psychology</span> 2. Backpropagation - Cách Neural Networks thức tỉnh</h2>

  <h3>2.1. Tại sao cần Backpropagation?</h3>
  <div class="definition-block mb-4">
    <p>Sau Forward Pass, mạng chốt xong câu trả lời. Nhưng nếu trả lời SAI thì sao? Làm sao để tự thân Network biết sửa sai chỗ nào trong hàng triệu <strong>Weights</strong> đang hoạt động dưới gầm xe? Đó là lúc <strong>Backpropagation</strong> (Lan truyền ngược) xuất hiện.</p>
    <hr class="my-2 border-gray-300">
    <p>Thuật toán này chỉ có 3 mục đích tồn tại:</p>
    <ol class="list-decimal pl-5 mt-2 space-y-1 text-sm font-semibold">
      <li>Tính mức độ sai trái (Loss).</li>
      <li>Tính xem AI đó sai là do "thằng Weight" nào gây ra nhiều nhất (Gradient).</li>
      <li>Phết một cái tát sửa lưng đám Weights (Cập nhật Weights).</li>
    </ol>
  </div>

  <h3>2.2. Chain Rule - Trái tim toán học</h3>
  <div class="formula-block text-center mb-4">
    <p>Output phụ thuộc vào Weights thông qua nhiều lớp trung gian. Chain Rule cho phép truy ngược trách nhiệm:</p>
    <code class="text-blue-700 block mt-2 text-sm bg-blue-50 p-2 rounded">∂Loss / ∂Weight(in) = (∂Loss / ∂Output) × (∂Output / ∂Hidden) × (∂Hidden / ∂Weight(in))</code>
  </div>

  <h3>2.3. Cập nhật Weights bằng Optimizer</h3>
  <p class="mb-4">Theo phương pháp Gradient Descent:</p>
  <div class="formula-block mb-6 border-l-4 border-green-500 bg-green-50">
    <code>Weight_mới = Weight_cũ - (Learning_Rate × Gradient)</code>
  </div>

  <h3>2.4. Overfitting vs Underfitting - Ngã rẽ sinh tử</h3>
  <div class="concept-grid">
    <div class="concept-card highlight-danger">
      <div class="concept-icon text-red-500"><span class="material-symbols-outlined">sentiment_dissatisfied</span></div>
      <h4>UNDERFITTING (Học dốt)</h4>
      <p>Model quá hời hợt, không bắt được quy luật (Ví dụ đem đường thẳng đi fit vòng tròn).</p>
      <ul class="text-xs mt-2 list-disc pl-4 text-red-700 space-y-1">
        <li>Loss lúc train RẤT CAO.</li>
        <li>Loss lúc test cũng RẤT CAO.</li>
        <li><strong>Đơn thuốc:</strong> Làm Model to lên (thêm Layer), nhồi thêm Data Feature, Train lâu hơn.</li>
      </ul>
    </div>
    <div class="concept-card highlight-warning">
      <div class="concept-icon text-yellow-600"><span class="material-symbols-outlined">sentiment_very_dissatisfied</span></div>
      <h4>OVERFITTING (Học vẹt)</h4>
      <p>Model quá thông minh nên mắc bệnh... học thuộc lòng cả nhiễu thay vì hiểu quy luận gốc.</p>
      <ul class="text-xs mt-2 list-disc pl-4 text-yellow-800 space-y-1">
        <li>Loss lúc train GẦN NHƯ BẰNG 0.</li>
        <li>Loss lúc test CAO ĐỤNG NÓC.</li>
        <li><strong>Đơn thuốc:</strong> Thêm Regularization, Dropout, Early Stopping.</li>
      </ul>
    </div>
    <div class="concept-card highlight-success">
      <div class="concept-icon text-green-500"><span class="material-symbols-outlined">sentiment_very_satisfied</span></div>
      <h4>JUST RIGHT (Điểm vàng)</h4>
      <p>Tìm được sự cân bằng, Model khái quát hóa (Generalize) cực tốt lên dữ liệu ngoài đời thực chưa bao giờ thấy.</p>
      <ul class="text-xs mt-2 list-disc pl-4 text-green-700 space-y-1">
        <li>Train Loss & Test Loss SÁT NHAU.</li>
        <li>Cả hai đều NHỎ.</li>
      </ul>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">shield_locked</span> 2.5. Regularization - Vắc xin chống Overfitting</h3>
  <div class="steps-container mt-4">
    <div class="step-card">
      <div class="step-number" style="background-color: var(--secondary-blue);">1</div>
      <div>
        <strong>L2 Regularization (Weight Decay)</strong>
        <p>Cộng thêm tham số <code>λ × Σ(w²)</code> vào hàm Loss. Nghĩa là cố tình răn đe Model, <em>"đứa nào Weight quá lớn sẽ ăn phạt vỡ đầu"</em>. Buộc tất cả Weights phải nén lại ngoan ngoãn, không được phép bùng nổ quá khích.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number" style="background-color: var(--secondary-blue);">2</div>
      <div>
        <strong>Dropout (Ma thuật của rèn luyện)</strong>
        <p>Trong lúc Train, cứ mải mốt ngẫu nhiên <em>rúm cổ ném ra ngoài</em> 20%-50% số Neuron khiến đội hình rớt lả tả. Buộc những Neuron còn lại phải "tự cường" gánh team, thoát khỏi lối làm việc ăn bám lẫn nhau (co-dependency).</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number" style="background-color: var(--secondary-blue);">3</div>
      <div>
        <strong>Early Stopping</strong>
        <p>Đơn giản là rút điện cái phích giữa chừng nếu thấy Loss lúc Test bắt đầu có dấu hiệu ngoi đầu tăng lên trở lại trong khi chữ cái Train vẫn cố lùi xuống sâu.</p>
      </div>
    </div>
  </div>

  <h3>2.6. Định luật Bias-Variance Tradeoff</h3>
  <div class="callout callout-info">
    <div class="callout-icon"><span class="material-symbols-outlined">balance</span></div>
    <div class="callout-content">
      <strong>Sự đánh đổi không thể tránh khỏi:</strong>
      <ul class="mt-2 text-sm pl-4 list-disc space-y-1">
        <li><strong>Bias (Thiên kiến):</strong> Mức độ bảo thủ (Underfitting). Model càng bé, Bias càng bự.</li>
        <li><strong>Variance (Phương sai):</strong> Mức độ lả lơi chạy theo lời đường mật của Data nhiễu (Overfitting). Model càng chằng chịt siêu to khổng lồ, Variance càng dễ vọt xà.</li>
      </ul>
      <p class="mt-2 text-center font-bold text-red-600 bg-red-50 py-1 rounded border border-red-200">Trò chơi của Kỹ Sư AI chính là đi tìm Điểm Chạm Cân Bằng nằm giữa 2 đường chéo Bias - Variance.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// BACKPROPAGATION - MINH HỌA CHI TIẾT
// =====================================================

fn sigmoid(x: f64) -> f64 { 1.0 / (1.0 + (-x).exp()) }
fn sigmoid_deriv(x: f64) -> f64 { let s = sigmoid(x); s * (1.0 - s) }

struct SimpleNN { w: f64, b: f64 }

impl SimpleNN {
    fn new() -> Self { SimpleNN { w: 0.0, b: 0.0 } }

    fn forward(&self, x: f64) -> f64 {
        sigmoid(self.w * x + self.b)
    }

    fn train(&mut self, x: f64, y_true: f64, lr: f64) {
        // Forward
        let z = self.w * x + self.b;
        let y_pred = sigmoid(z);
        let loss = (y_pred - y_true).powi(2);

        // Backward - Chain Rule
        // dL/dy * dy/dz * dz/dw
        let dL_dy = 2.0 * (y_pred - y_true);
        let dy_dz = sigmoid_deriv(z);
        let dL_dz = dL_dy * dy_dz;
        let dL_dw = dL_dz * x;
        let dL_db = dL_dz;

        // Update
        self.w -= lr * dL_dw;
        self.b -= lr * dL_db;

        println!("x={}, y_true={}, loss={:.4}, dL/dw={:.4}, w={:.4}",
                 x, y_true, loss, dL_dw, self.w);
    }
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              BACKPROPAGATION - CÁCH HỌC                          ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    let mut nn = SimpleNN::new();

    println!("\\n=== TRAIN ĐỂ HỌC y = 1 KHI x=1 ===");
    println!("Input x=1, Target y=1");
    println!("Loss, Gradient, Updated weight:");
    println!("");

    for i in 0..10 {
        nn.train(1.0, 1.0, 0.5);
    }

    println!("\\n=== TEST ===");
    println!("x=0 → y={:.4} (nên ~0)", nn.forward(0.0));
    println!("x=1 → y={:.4} (nên ~1)", nn.forward(1.0));

    println!("\\n=== Ý NGHĨA ===");
    println!("1. Forward: Tính output");
    println!("2. Loss: Đo sai số");
    println!("3. Backward: Tính gradient (Chain Rule)");
    println!("4. Update: Điều chỉnh weights");
    println!("\\n→ Đây là cách Neural Networks HỌC!");
}`,
  },
  {
    id: 'ch21_comp_03',
    title: '3. Training Loop hoàn chỉnh',
    duration: '60 phút',
    type: 'practice',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">autorenew</span> 3. Training Loop hoàn chỉnh (Bánh xe luân hồi)</h2>

  <h3>3.1. Vòng lặp vĩnh cửu của trí tuệ</h3>
  <div class="steps-container mt-4 mb-4">
    <div class="step-card">
      <div class="step-number" style="background-color: var(--primary-color);">1</div>
      <div>
        <strong>Forward Pass (Tiến lên)</strong>
        <p>Bơm Data qua mạng nhện các Layers, đi qua các Activate Functions để mài dũa tín hiệu cho đến khi ra được Output cuối cùng.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number" style="background-color: var(--accent-red);">2</div>
      <div>
        <strong>Compute Loss (Đo lường tội lỗi)</strong>
        <p>So sánh Output vừa tính với Ground Truth bằng các hàm Loss (BCE, MSE...). Ghi nhận khoản nợ học phí này.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number" style="background-color: var(--secondary-blue);">3</div>
      <div>
        <strong>Backward Pass (Quay đầu là bờ)</strong>
        <p>Tính Gradient bằng Chain Rule từ Output ngược về Input. Truy tìm "thủ phạm" gây ra số Loss ban nãy. Đây là khâu tốn xăng nhất.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number" style="background-color: var(--success-green);">4</div>
      <div>
        <strong>Update Weights (Cải tà quy chính)</strong>
        <p>Dùng Optimizer (SGD, Adam...) trừ Gradient khỏi Weights hiện tại để nhích dần về đáy của thung lũng Loss.</p>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">repeat</span></div>
    <div class="callout-content">
      <strong>Vòng lặp (Epochs)</strong>
      <p class="mb-2">4 bước trên diễn ra trên một tập dữ liệu nhỏ gọi là <strong>Batch</strong>. Toàn bộ dataset đi qua đủ 4 bước n lần tính là 1 <strong>Epoch</strong>.</p>
      <pre class="bg-yellow-50 p-2 text-sm text-yellow-900 border border-yellow-200"><code>FOR epoch = 1 TO num_epochs:
    FOR each batch IN dataset:
        1. Forward Pass
        2. Compute Loss
        3. Backward Pass
        4. Update Weights
    END FOR
END FOR</code></pre>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// FULL TRAINING LOOP - AND GATE
// =====================================================

fn sigmoid(x: f64) -> f64 { 1.0 / (1.0 + (-x).exp()) }
fn sigmoid_deriv(x: f64) -> f64 { let s = sigmoid(x); s * (1.0 - s) }

struct NN { w1: f64, w2: f64, b1: f64, w3: f64, w4: f64, b2: f64, w5: f64, b3: f64 }

impl NN {
    fn new() -> Self {
        NN { w1: 0.5, w2: 0.5, b1: 0.0, w3: 0.5, w4: 0.5, b2: 0.0, w5: 0.5, b3: 0.0 }
    }

    fn forward(&self, x1: f64, x2: f64) -> f64 {
        let h1 = sigmoid(self.w1 * x1 + self.w2 * x2 + self.b1);
        let h2 = sigmoid(self.w3 * x1 + self.w4 * x2 + self.b2);
        sigmoid(self.w5 * h1 + self.b3)
    }

    fn train(&mut self, x1: f64, x2: f64, y: f64, lr: f64) {
        // Forward
        let z1 = self.w1 * x1 + self.w2 * x2 + self.b1;
        let h1 = sigmoid(z1);
        let z2 = self.w3 * x1 + self.w4 * x2 + self.b2;
        let h2 = sigmoid(z2);
        let z3 = self.w5 * h1 + self.b3;
        let out = sigmoid(z3);

        // Backward
        let dL = 2.0 * (out - y);
        let dL_dz3 = dL * sigmoid_deriv(z3);

        let dL_dw5 = dL_dz3 * h1;
        let dL_db3 = dL_dz3;
        let dL_dh1 = dL_dz3 * self.w5;
        let dL_dz1 = dL_dh1 * sigmoid_deriv(z1);
        let dL_dw1 = dL_dz1 * x1;
        let dL_dw2 = dL_dz1 * x2;
        let dL_db1 = dL_dz1;

        self.w1 -= lr * dL_dw1;
        self.w2 -= lr * dL_dw2;
        self.b1 -= lr * dL_db1;
        self.w5 -= lr * dL_dw5;
        self.b3 -= lr * dL_db3;
    }
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              FULL TRAINING LOOP - AND GATE                        ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    let mut nn = NN::new();
    let data = vec![(0.0,0.0,0.0), (0.0,1.0,0.0), (1.0,0.0,0.0), (1.0,1.0,1.0)];

    println!("\\n=== TRAINING ===");
    for epoch in 0..=1000 {
        for (x1, x2, y) in &data {
            nn.train(*x1, *x2, *y, 1.0);
        }
        if epoch % 200 == 0 {
            let mut loss = 0.0;
            for (x1, x2, y) in &data {
                let p = nn.forward(*x1, *x2);
                loss += (p - y).powi(2);
            }
            println!("Epoch {:4}: avg loss = {:.4}", epoch, loss / 4.0);
        }
    }

    println!("\\n=== TEST ===");
    for (x1, x2, y) in &data {
        let p = nn.forward(*x1, *x2);
        println!("AND({}, {}) = {} (expected {})", x1 as i32, x2 as i32,
                 if p > 0.5 { 1 } else { 0 }, y as i32);
    }
}`,
  },
];

// Export
export const ch21_comprehensive: Chapter = {
  id: 'ch21_comp',
  title: '21. Neural Networks - Chi tiết',
  introduction: `<h2>Neural Networks - Từ cơ bản đến nâng cao</h2>`,
  lessons: comprehensive_lessons,
};

export default ch21_comprehensive;
