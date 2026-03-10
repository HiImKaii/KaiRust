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
      <h2>1. Neural Network hoạt động như thế nào? Giải thích toàn bộ</h2>

      <h3>1.1. Tổng quan kiến trúc</h3>
      <p>Neural Network là một hệ thống tính toán được lấy cảm hứng từ cách hoạt động của não bộ sinh học. Nó bao gồm nhiều "neurons" (đơn vị tính toán) được kết nối với nhau thông qua các "weights" (trọng số).</p>

      <h3>1.2. Cấu trúc của một Neural Network</h3>
      <pre><code>                    ┌─────────────────────────────────────────────┐
                    │            INPUT LAYER (Lớp đầu vào)           │
                    │                                              │
                    │    x₁ ──┐                                    │
                    │    x₂ ──┼──►  [Input Neurons]              │
                    │    x₃ ──┤     Nhận dữ liệu đầu vào         │
                    │    ...  ──┤                                    │
                    └──────────┼────────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────────────────────────────┐
                    │          HIDDEN LAYER 1 (Lớp ẩn 1)          │
                    │    h₁¹ = f(w₁₁¹x₁ + w₂₁¹x₂ + ... + b₁¹)   │
                    │    h₂¹ = f(w₁₂¹x₁ + w₂₂¹x₂ + ... + b₂¹)   │
                    │    ...                                        │
                    └──────────┬────────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────────────────────────────┐
                    │           OUTPUT LAYER (Lớp đầu ra)        │
                    │    y₁ ──┐                                    │
                    │    y₂ ──┼──►  Kết quả dự đoán              │
                    │    ...  ──┘                                    │
                    └─────────────────────────────────────────────┘</code></pre>

      <h3>1.3. Mỗi thành phần có nhiệm vụ gì?</h3>

      <h4>Input Layer (Lớp đầu vào)</h4>
      <p>Nhận dữ liệu từ bên ngoài và đưa vào mạng. Mỗi neuron trong lớp này đại diện cho một feature (đặc điểm) của dữ liệu.</p>

      <h4>Hidden Layers (Lớp ẩn)</h4>
      <p>Xử lý trung gian, trích xuất features từ dữ liệu thô. Đây là nơi "học" diễn ra.</p>

      <h4>Output Layer (Lớp đầu ra)</h4>
      <p>Đưa ra kết quả dự đoán cuối cùng.</p>
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
      <h2>2. Backpropagation - Cách Neural Networks HỌC</h2>

      <h3>2.1. Tại sao cần Backpropagation?</h3>
      <p>Sau Forward Pass, ta có được kết quả dự đoán. Nhưng làm sao để biết weights có tốt không? Và làm sao để CẢI THIỆN weights?</p>

      <p><strong>Backpropagation</strong> là thuật toán để:</p>
      <ol>
        <li>Tính sai số (loss) giữa dự đoán và giá trị thực</li>
        <li>Tính gradient của loss theo từng weight</li>
        <li>Cập nhật weights để GIẢM sai số</li>
      </ol>

      <h3>2.2. Chain Rule - Công cụ toán học</h3>
      <p>Trong Neural Network, output phụ thuộc vào weights qua nhiều lớp. Chain Rule cho phép tính đạo hàm tổng hợp.</p>

      <pre><code>Ví dụ:
  Loss → Output → Hidden → Input

∂Loss/∂w = ∂Loss/∂Output × ∂Output/∂Hidden × ∂Hidden/∂w</code></pre>

      <h3>2.3. Cập nhật Weights</h3>
      <pre><code>w_moi = w_cu - learning_rate × gradient</code></pre>
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
      <h2>3. Training Loop hoàn chỉnh</h2>

      <h3>3.1. Các bước</h3>
      <pre><code>FOR epoch = 1 TO num_epochs:
    FOR each sample:
        1. Forward Pass
        2. Compute Loss
        3. Backward Pass
        4. Update Weights
    END FOR
END FOR</code></pre>
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
