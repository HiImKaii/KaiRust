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
      <h2>1. Activation Functions - Tại sao cần thiết?</h2>

      <h3>1.1. Vấn đề không có Activation</h3>
      <p>Nếu không có activation function, Neural Network chỉ là một phép biến đổi tuyến tính (linear transformation):</p>

      <pre><code>Giả sử không có activation:
  a = W2 * (W1 * x + b1) + b2
    = (W2 * W1) * x + (W2 * b1 + b2)
    = W' * x + b'

→ Vẫn là đường thẳng! Không thể học patterns phức tạp!</code></pre>

      <h3>1.2. Với Activation Function</h3>
      <pre><code>Với activation:
  a = σ(W2 * σ(W1 * x + b1) + b2)

→ Đây là hàm PHI TUYẾN!
→ Có thể học bất kỳ pattern nào!</code></pre>

      <h3>1.3. Các loại Activation</h3>
      <table class="comparison-table">
        <tr><th>Tên</th><th>Công thức</th><th>Output</th><th>Dùng khi</th></tr>
        <tr><td>Step</td><td>1 nếu z≥0, 0 nếu z&lt;0</td><td>{0, 1}</td><td>Perceptron gốc</td></tr>
        <tr><td>Sigmoid</td><td>1/(1+e^(-z))</td><td>(0, 1)</td><td>Binary output</td></tr>
        <tr><td>Tanh</td><td>(e^z-e^(-z))/(e^z+e^(-z))</td><td>(-1, 1)</td><td>Hidden layers</td></tr>
        <tr><td>ReLU</td><td>max(0, z)</td><td>[0, +∞)</td><td>Hidden layers (phổ biến)</td></tr>
        <tr><td>Leaky ReLU</td><td>z nếu z>0, 0.01z nếu z≤0</td><td>(-∞, +∞)</td><td>Tránh dying ReLU</td></tr>
        <tr><td>Softmax</td><td>e^z / Σe^z</td><td>(0, 1), sum=1</td><td>Multi-class output</td></tr>
      </table>
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
      <h2>2. Vanishing Gradient - Vấn đề lớn</h2>

      <h3>2.1. Vấn đề là gì?</h3>
      <p>Khi mạng quá sâu, gradient "biến mất" (→ 0) khi lan truyền ngược về các lớp đầu. Điều này khiến weights ở lớp đầu không được cập nhật!</p>

      <h3>2.2. Nguyên nhân</h3>
      <p>Sigmoid và Tanh có derivative ≤ 1:</p>
      <pre><code>Sigmoid derivative max = 0.25
Tanh derivative max = 1

Khi nhân nhiều số &lt; 1 qua nhiều layers:
  0.25 × 0.25 × 0.25 × ... → 0

Gradient → 0 → Không học được!</code></pre>

      <h3>2.3. Giải pháp</h3>
      <ul>
        <li><strong>ReLU</strong>: Gradient = 1 khi x > 0</li>
        <li><strong>Residual Connections</strong>: Skip connections</li>
        <li><strong>Batch Normalization</strong>: Chuẩn hóa activations</li>
        <li><strong>Better initialization</strong>: Khởi tạo weights tốt hơn</li>
      </ul>
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
  title: '21.X. Activation Functions',
  introduction: `<h2>Activation Functions chi tiết</h2>`,
  lessons: activation_lessons,
};

export default ch21_activation;
