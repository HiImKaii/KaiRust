// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài: Backpropagation - Lan truyền ngược
// Giải thích chi tiết từng bước với toán học
// =====================================================

import { Lesson, Chapter } from '../../courses';

const backprop_lessons: Lesson[] = [
  {
    id: 'ch21_backprop_01',
    title: '1. Chain Rule - Nền tảng toán học',
    duration: '45 phút',
    type: 'theory',
    content: `
      <h2>1. Chain Rule - Nền tảng toán học cho Backpropagation</h2>

      <h3>1.1. Tại sao cần Chain Rule?</h3>
      <p>Trong Neural Network, output phụ thuộc vào input qua nhiều "lớp" (layers) tính toán. Để biết thay đổi một weight ở lớp đầu ảnh hưởng như thế nào đến kết quả cuối cùng, ta cần Chain Rule.</p>

      <h3>1.2. Định lý Chain Rule</h3>
      <p>Nếu y = f(g(x)), tức là y phụ thuộc vào z = g(x), thì:</p>
      <pre><code>dy/dx = (df/dg) * (dg/dx)

Hay viết chi tiết hơn:
dy/dx = dy/dz * dz/dx</code></pre>

      <h3>1.3. Ví dụ đơn giản</h3>
      <p>Cho: x → z = 2x → y = z²</p>
      <pre><code>Tính dy/dx = ?

Bước 1: Tính dy/dz
  y = z²
  dy/dz = 2z

Bước 2: Tính dz/dx
  z = 2x
  dz/dx = 2

Bước 3: Áp dụng Chain Rule
  dy/dx = dy/dz * dz/dx
        = 2z * 2
        = 4z
        = 4(2x)
        = 8x

Kiểm tra:
  y = (2x)² = 4x²
  dy/dx = 8x ✓</code></pre>

      <h3>1.4. Chain Rule với nhiều biến</h3>
      <p>Nếu có nhiều đường đến cùng một output:</p>
      <pre><code>        x₁ ──┐
             │
        x₂ ──┼──► z ──► y
             │
        x₃ ──┘

y = f(z) = f(g₁(x₁) + g₂(x₂) + g₃(x₃))

dy/dx₁ = dy/dz * dz/dg₁ * dg₁/dx₁</code></pre>
    `,
    defaultCode: `// =====================================================
// CHAIN RULE - MINH HỌA CHI TIẾT
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              CHAIN RULE - NỀN TẢNG TOÁN HỌC                       ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // =====================================================
    // VÍ DỤ 1: f(x) = (2x + 1)³
    // =====================================================
    println!("\\n=== VÍ DỤ 1: f(x) = (2x + 1)³ ===\\n");

    // Đặt: u = 2x + 1, f = u³
    // df/du = 3u²
    // du/dx = 2
    // df/dx = df/du * du/dx = 3u² * 2 = 6u² = 6(2x+1)²

    fn f(x: f64) -> f64 {
        let u = 2.0 * x + 1.0;
        u * u * u  // u³
    }

    fn df_dx_analytical(x: f64) -> f64 {
        let u = 2.0 * x + 1.0;
        6.0 * u * u  // 6u²
    }

    // Xấp xỉ bằng số
    fn df_dx_numerical(x: f64, h: f64) -> f64 {
        (f(x + h) - f(x - h)) / (2.0 * h)
    }

    println!("x     | f(x)      | df/dx (analytical) | df/dx (numerical)");
    println!("------+------------+-------------------+-----------------");
    for x in [0.0, 1.0, 2.0, 3.0, 4.0].iter() {
        println!("{:5} | {:10.2} | {:17.4} | {:17.4}",
                 x, f(*x), df_dx_analytical(*x), df_dx_numerical(*x, 0.0001));
    }

    // =====================================================
    // VÍ DỤ 2: f(x,y) = x²y + y³
    // =====================================================
    println!("\\n\\n=== VÍ DỤ 2: f(x,y) = x²y + y³ ===\\n");

    // df/dx = 2xy
    // df/dy = x² + 3y²

    fn f_2d(x: f64, y: f64) -> f64 {
        x * x * y + y * y * y
    }

    fn df_dx(x: f64, y: f64) -> f64 {
        2.0 * x * y
    }

    fn df_dy(x: f64, y: f64) -> f64 {
        x * x + 3.0 * y * y
    }

    let (x, y) = (3.0, 2.0);
    println!("Tại x = {}, y = {}", x, y);
    println!("f(x,y) = {}", f_2d(x, y));
    println!("df/dx = {}", df_dx(x, y));
    println!("df/dy = {}", df_dy(x, y));

    println!("\\n=== Ý NGHĨA CỦA CHAIN RULE ===");
    println!("Chain rule cho phép:");
    println!("1. Tính đạo hàm của hàm phức tạp");
    println!("2. Biết mỗi biến ảnh hưởng BAO NHIÊU đến output");
    println!("3. Áp dụng trong Backpropagation!");
}`,
  },
  {
    id: 'ch21_backprop_02',
    title: '2. Backpropagation từng bước một',
    duration: '60 phút',
    type: 'theory',
    content: `
      <h2>2. Backpropagation từng bước một</h2>

      <h3>2.1. Forward Pass vs Backward Pass</h3>
      <pre><code>FORWARD PASS (Tính toán thuận):
  Input x
    → z₁ = w₁x + b₁
    → a₁ = σ(z₁)
    → z₂ = w₂a₁ + b₂
    → a₂ = σ(z₂) = Output
    → Loss

BACKWARD PASS (Lan truyền ngược):
  Loss
    → da₂
    → dz₂ = da₂ * σ'(z₂)
    → dw₂ = dz₂ * a₁
    → db₂ = dz₂
    → da₁ = dz₂ * w₂
    → dz₁ = da₁ * σ'(z₁)
    → dw₁ = dz₁ * x
    → db₁ = dz₁</code></pre>

      <h3>2.2. Công thức Backpropagation cho 1 sample</h3>

      <h4>Output Layer:</h4>
      <pre><code>Giả sử:
- Output: a (sau activation)
- Target: y
- Loss: L = (a - y)² (MSE)
- Activation: sigmoid σ(z)

Bước 1: dL/da
  L = (a - y)²
  dL/da = 2(a - y)

Bước 2: da/dz (qua activation)
  a = σ(z)
  da/dz = σ'(z) = σ(z)(1 - σ(z)) = a(1-a)

Bước 3: dz/dw (qua weighted sum)
  z = wa + b
  dz/dw = a

Kết hợp (Chain Rule):
  dL/dw = dL/da * da/dz * dz/dw
        = 2(a-y) * a(1-a) * a</code></pre>

      <h4>Hidden Layer:</h4>
      <pre><code>Gradient truyền về hidden:
  dL/dz₁ = dL/da₁ * da₁/dz₁
         = (dL/dz₂ * w₂) * σ'(z₁)</code></pre>
    `,
    defaultCode: `// =====================================================
// BACKPROPAGATION - CÀI ĐẶT CHI TIẾT
// =====================================================

// Activation: Sigmoid
fn sigmoid(x: f64) -> f64 {
    1.0 / (1.0 + (-x).exp())
}

// Đạo hàm của sigmoid: σ'(x) = σ(x)(1-σ(x))
fn sigmoid_derivative(x: f64) -> f64 {
    let s = sigmoid(x);
    s * (1.0 - s)
}

// Neural Network đơn giản: 1 input → 1 hidden → 1 output
struct SimpleNN {
    w1: f64,  // weight từ input → hidden
    b1: f64,  // bias của hidden
    w2: f64,  // weight từ hidden → output
    b2: f64,  // bias của output
}

impl SimpleNN {
    fn new() -> Self {
        SimpleNN { w1: 0.5, b1: 0.1, w2: 0.5, b2: 0.1 }
    }

    // FORWARD PASS
    fn forward(&self, x: f64) -> (f64, f64, f64, f64, f64) {
        // Hidden layer
        let z1 = self.w1 * x + self.b1;
        let a1 = sigmoid(z1);

        // Output layer
        let z2 = self.w2 * a1 + self.b2;
        let a2 = sigmoid(z2);

        (z1, a1, z2, a2, a2)  // z1, a1, z2, a2, output
    }

    // BACKPROPAGATION cho 1 sample
    fn train(&mut self, x: f64, y_true: f64, learning_rate: f64) -> f64 {
        // ═══════════════════════════════════════════════════════
        // BƯỚC 1: FORWARD PASS
        // ═══════════════════════════════════════════════════════
        let (z1, a1, z2, a2, output) = self.forward(x);

        // Tính loss (MSE)
        let loss = (output - y_true) * (output - y_true);

        // ═══════════════════════════════════════════════════════
        // BƯỚC 2: BACKWARD PASS - OUTPUT LAYER
        // ═══════════════════════════════════════════════════════
        println!("\\n--- BACKWARD PASS ---");

        // dL/da2: derivative của loss theo output
        let dL_da2 = 2.0 * (output - y_true);
        println!("1. dL/da2 = 2 * (a2 - y) = 2 * ({:.4} - {}) = {:.4}",
                 output, y_true, dL_da2);

        // da2/dz2: derivative của sigmoid
        let da2_dz2 = sigmoid_derivative(z2);
        println!("2. da2/dz2 = sigmoid'({:.4}) = {:.4}", z2, da2_dz2);

        // dL/dz2 = dL/da2 * da2/dz2
        let dL_dz2 = dL_da2 * da2_dz2;
        println!("3. dL/dz2 = dL/da2 * da2/dz2 = {:.4} * {:.4} = {:.6}",
                 dL_da2, da2_dz2, dL_dz2);

        // dz2/dw2 = a1 (hidden output)
        let dw2_dz2 = a1;
        let dL_dw2 = dL_dz2 * dw2_dz2;
        println!("4. dL/dw2 = dL/dz2 * dz2/dw2 = {:.6} * {:.4} = {:.6}",
                 dL_dz2, dw2_dz2, dL_dw2);

        // dz2/db2 = 1
        let dL_db2 = dL_dz2 * 1.0;
        println!("5. dL/db2 = dL/dz2 * dz2/db2 = {:.6}", dL_db2);

        // ═══════════════════════════════════════════════════════
        // BƯỚC 3: BACKWARD PASS - HIDDEN LAYER
        // ═══════════════════════════════════════════════════════

        // dL/da1: gradient truyền về từ output
        // a1 ảnh hưởng đến z2, z2 ảnh hưởng đến a2, a2 ảnh hưởng đến L
        let dL_da1 = dL_dz2 * self.w2;
        println!("6. dL/da1 = dL/dz2 * w2 = {:.6} * {} = {:.6}",
                 dL_dz2, self.w2, dL_da1);

        // da1/dz1: derivative của sigmoid tại hidden
        let da1_dz1 = sigmoid_derivative(z1);
        println!("7. da1/dz1 = sigmoid'({:.4}) = {:.4}", z1, da1_dz1);

        // dL/dz1
        let dL_dz1 = dL_da1 * da1_dz1;
        println!("8. dL/dz1 = dL/da1 * da1/dz1 = {:.6} * {:.4} = {:.6}",
                 dL_da1, da1_dz1, dL_dz1);

        // dz1/dw1 = x (input)
        let dw1_dz1 = x;
        let dL_dw1 = dL_dz1 * dw1_dz1;
        println!("9. dL/dw1 = dL/dz1 * dz1/dw1 = {:.6} * {} = {:.6}",
                 dL_dz1, x, dL_dw1);

        // dz1/db1 = 1
        let dL_db1 = dL_dz1 * 1.0;
        println!("10. dL/db1 = dL/dz1 * dz1/db1 = {:.6}", dL_db1);

        // ═══════════════════════════════════════════════════════
        // BƯỚC 4: CẬP NHẬT WEIGHTS
        // ═══════════════════════════════════════════════════════
        println!("\\n--- CẬP NHẬT WEIGHTS ---");

        self.w1 -= learning_rate * dL_dw1;
        self.w2 -= learning_rate * dL_dw2;
        self.b1 -= learning_rate * dL_db1;
        self.b2 -= learning_rate * dL_db2;

        println!("w1: {:.4} → {:.4}", self.w1 + learning_rate * dL_dw1, self.w1);
        println!("w2: {:.4} → {:.4}", self.w2 + learning_rate * dL_dw2, self.w2);
        println!("b1: {:.4} → {:.4}", self.b1 + learning_rate * dL_db1, self.b1);
        println!("b2: {:.4} → {:.4}", self.b2 + learning_rate * dL_db2, self.b2);

        loss
    }
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║         BACKPROPAGATION - LAN TRUYỀN NGƯỢC CHI TIẾT              ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Neural Network đơn giản
    let mut nn = SimpleNN::new();

    // Dữ liệu: AND gate
    let inputs = vec![0.0, 0.0, 1.0, 1.0];
    let targets = vec![0.0, 0.0, 0.0, 1.0];

    println!("\\n=== DỮ LIỆU: AND GATE ===");
    println!("Input | Target");
    println!("------+-------");
    for i in 0..inputs.len() {
        println!("{:5} | {}", inputs[i] as i32, targets[i] as i32);
    }

    println!("\\n=== WEIGHTS BAN ĐẦU ===");
    println!("w1 = {}, b1 = {}, w2 = {}, b2 = {}", nn.w1, nn.b1, nn.w2, nn.b2);

    // Train với 1 sample để xem chi tiết backprop
    println!("\\n=== TRAIN 1 SAMPLE (Input=1, Target=1) ===");
    println!("Đây là chi tiết BACKPROPAGATION cho 1 sample!");

    let loss = nn.train(1.0, 1.0, 0.5);
    println!("\\nLoss: {:.6}", loss);

    println!("\\n=== Ý NGHĨA CỦA BACKPROPAGATION ===");
    println!("1. Forward: Tính output từ input");
    println!("2. T Soính loss: sánh output với target");
    println!("3. Backward: Tính gradient từ output về input");
    println!("4. Chain Rule: Kết hợp các derivatives");
    println!("5. Update: Điều chỉnh weights để GIẢM loss");
    println!("\\n→ ĐÂY LÀ CÁCH NEURAL NETWORKS HỌC!");`,
  },
  {
    id: 'ch21_backprop_03',
    title: '3. Full Training Loop',
    duration: '45 phút',
    type: 'theory',
    content: `
      <h2>3. Full Training Loop - Vòng lặp huấn luyện hoàn chỉnh</h2>

      <h3>3.1. Các bước trong Training</h3>
      <pre><code>TRAINING LOOP:
  FOR epoch = 1 TO num_epochs:
    FOR each batch:
      1. FORWARD PASS
         - Tính output từ input
         - Tính loss

      2. BACKWARD PASS
         - Tính gradients cho tất cả weights

      3. UPDATE WEIGHTS
         - w = w - learning_rate * gradient

    END FOR
  END FOR</code></pre>

      <h3>3.2. Các loại Gradient Descent</h3>

      <h4>Batch Gradient Descent:</h4>
      <pre><code>- Tính gradient trên TOÀN BỘ dữ liệu
- Cập nhật weights 1 lần/epoch
- Ưu: Chính xác
- Nhược: Chậm với dữ liệu lớn</code></pre>

      <h4>Stochastic Gradient Descent (SGD):</h4>
      <pre><code>- Tính gradient trên 1 sample
- Cập nhật weights sau mỗi sample
- Ưu: Nhanh, có noise giúp thoát local minimum
- Nhược: Ồn ào, không ổn định</code></pre>

      <h4>Mini-batch Gradient Descent:</h4>
      <pre><code>- Tính gradient trên batch (32-128 samples)
- Cập nhật weights sau mỗi batch
- Ưu: Cân bằng tốt nhất → DÙNG PHỔ BIẾN NHẤT!</code></pre>
    `,
    defaultCode: `// =====================================================
// FULL TRAINING LOOP - VÒNG LẶP HUẤN LUYỆN HOÀN CHỈNH
// =====================================================

struct NeuralNetwork {
    w1: f64, b1: f64,
    w2: f64, b2: f64,
}

impl NeuralNetwork {
    fn new() -> Self {
        NeuralNetwork { w1: 0.5, b1: 0.1, w2: 0.5, b2: 0.1 }
    }

    fn sigmoid(x: f64) -> f64 {
        1.0 / (1.0 + (-x).exp())
    }

    fn forward(&self, x: f64) -> f64 {
        let h = self.sigmoid(self.w1 * x + self.b1);
        self.sigmoid(self.w2 * h + self.b2)
    }

    fn train(&mut self, x: f64, y: f64, lr: f64) {
        // Forward
        let z1 = self.w1 * x + self.b1;
        let a1 = Self::sigmoid(z1);
        let z2 = self.w2 * a1 + self.b2;
        let a2 = Self::sigmoid(z2);

        // Backward
        let dL_da2 = 2.0 * (a2 - y);
        let da2_dz2 = a2 * (1.0 - a2);
        let dL_dz2 = dL_da2 * da2_dz2;

        let dL_dw2 = dL_dz2 * a1;
        let dL_db2 = dL_dz2;

        let dL_da1 = dL_dz2 * self.w2;
        let da1_dz1 = a1 * (1.0 - a1);
        let dL_dz1 = dL_da1 * da1_dz1;

        let dL_dw1 = dL_dz1 * x;
        let dL_db1 = dL_dz1;

        // Update
        self.w1 -= lr * dL_dw1;
        self.b1 -= lr * dL_db1;
        self.w2 -= lr * dL_dw2;
        self.b2 -= lr * dL_db2;
    }
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║           FULL TRAINING LOOP - VÒNG LẶP HUẤN LUYỆN                  ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Dữ liệu: AND gate
    let x_data = vec![0.0, 0.0, 1.0, 1.0];
    let y_data = vec![0.0, 0.0, 0.0, 1.0];

    let mut nn = NeuralNetwork::new();

    println!("\\n=== DỮ LIỆU: AND GATE ===");
    println!("Epoch | Loss   | w1    | w2    | b1    | b2");
    println!("------|--------|-------|-------|-------|------");

    // Training loop
    let epochs = 1000;
    let lr = 1.0;

    for epoch in 0..epochs {
        // Mini-batch: train trên tất cả 4 samples
        for i in 0..x_data.len() {
            nn.train(x_data[i], y_data[i], lr);
        }

        // Tính loss
        let mut total_loss = 0.0;
        for i in 0..x_data.len() {
            let pred = nn.forward(x_data[i]);
            total_loss += (pred - y_data[i]).powi(2);
        }
        let loss = total_loss / x_data.len() as f64;

        if epoch % 200 == 0 || epoch == epochs - 1 {
            println!("{:5} | {:6.4} | {:.4} | {:.4} | {:.4} | {:.4}",
                     epoch, loss, nn.w1, nn.w2, nn.b1, nn.b2);
        }
    }

    // Test
    println!("\\n=== KẾT QUẢ ===");
    println!("x | y_true | y_pred | Output");
    println!("--+--------+--------+--------");
    for i in 0..x_data.len() {
        let pred = nn.forward(x_data[i]);
        let out = if pred > 0.5 { 1 } else { 0 };
        println!("{} |    {}    |  {:.4}  |    {}",
                 x_data[i] as i32, y_data[i] as i32, pred, out);
    }

    println!("\\n=== KẾT LUẬN ===");
    println!("✓ Full Training Loop hoàn chỉnh!");
    println!("✓ Backpropagation + Gradient Descent = Học được!");`,
  },
];

// Export
export const ch21_backprop: Chapter = {
  id: 'ch21_backprop',
  title: '21.X. Backpropagation',
  introduction: `<h2>Backpropagation - Lan truyền ngược</h2>`,
  lessons: backprop_lessons,
};

export default ch21_backprop;
