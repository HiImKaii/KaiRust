// =====================================================
// Chương 21: Mạng Neural Network
// Bài 2: Cách Neural Networks HỌC - Gradient Descent
//
// Mục tiêu:
// - Hiểu Gradient Descent là gì và tại sao cần nó
// - Hiểu Loss Function (hàm mất mát)
// - Biết cách cập nhật weights để giảm sai số
// - Hiểu Learning Rate và các vấn đề liên quan
// =====================================================

import { Lesson, Chapter } from '../../courses';

// =====================================================
// PHẦN 2: GRADIENT DESCENT - CÁCH HỌC CỦA NEURAL NETWORK
// =====================================================

const ch21_02_lessons: Lesson[] = [
  {
    id: 'ch21_02_01',
    title: '1. Loss Function - Đo lường sai số',
    duration: '30 phút',
    type: 'theory',
    content: `
      <h2>1. Loss Function - Đo lường sai số</h2>

      <h3>Tại sao cần Loss Function?</h3>
      <p>Neural Network cần một cách để <strong>đo lường</strong> xem nó đang hoạt động tốt hay không. <strong>Loss Function</strong> (hàm mất mát) làm điều này.</p>

      <h3>Định nghĩa</h3>
      <p><strong>Loss Function</strong> là một hàm số nhận đầu ra của model và giá trị thực (ground truth), trả về một số duy nhất gọi là <strong>loss</strong> (sai số).</p>
      <ul>
        <li><strong>Loss cao</strong> = Model dự đoán kém</li>
        <li><strong>Loss thấp</strong> = Model dự đoán tốt</li>
        <li><strong>Loss = 0</strong> = Model hoàn hảo (lý tưởng, hiếm đạt được)</li>
      </ul>

      <h3>Các Loss Functions phổ biến</h3>

      <h4>1. Mean Squared Error (MSE)</h4>
      <pre><code>MSE = (1/n) * Σ(y_true - y_pred)²

Dùng cho: Regression (dự đoán giá trị liên tục)</code></pre>

      <h4>2. Mean Absolute Error (MAE)</h4>
      <pre><code>MAE = (1/n) * Σ|y_true - y_pred|

Dùng cho: Regression, ít nhạy cảm với outliers</code></pre>

      <h4>3. Cross Entropy (Binary)</h4>
      <pre><code>Binary Cross Entropy = -Σ[y_true * log(y_pred) + (1-y_true) * log(1-y_pred)]

Dùng cho: Binary Classification</code></pre>

      <h4>4. Cross Entropy (Multi-class)</h4>
      <pre><code>Cross Entropy = -ΣΣ y_true[i] * log(y_pred[i])

Dùng cho: Multi-class Classification</code></pre>

      <h3>Ví dụ trực quan về MSE</h3>
      <table class="comparison-table">
        <tr><th>Giá trị thực</th><th>Dự đoán</th><th>Sai số</th><th>Bình phương</th></tr>
        <tr><td>100</td><td>80</td><td>-20</td><td>400</td></tr>
        <tr><td>100</td><td>90</td><td>-10</td><td>100</td></tr>
        <tr><td>100</td><td>100</td><td>0</td><td>0</td></tr>
        <tr><td>100</td><td>120</td><td>+20</td><td>400</td></tr>
      </table>
      <p><strong>MSE = (400 + 100 + 0 + 400) / 4 = 225</strong></p>

      <h3>Tại sao dùng bình phương?</h3>
      <ol>
        <li><strong>Luôn dương</strong>: (-20)² = 400, không bị âm</li>
        <li><strong>Trừng phạt sai số lớn</strong>: (20)² = 400 gấp 4 lần (10)² = 100</li>
        <li><strong>Có đạo hàm</strong>: Dễ tối ưu bằng Gradient Descent</li>
        <li><strong>Phạt cả hai phía</strong>: Sai 20 đơn vị (dương hay âm) đều bị phạt như nhau</li>
      </ol>
    `,
    defaultCode: `// =====================================================
// LOSS FUNCTIONS - CÀI ĐẶT CHI TIẾT TỪNG DÒNG
// =====================================================

// === 1. MEAN SQUARED ERROR (MSE) ===
// Công thức: MSE = (1/n) * Σ(y_true - y_pred)²
// Dùng cho: Regression

fn mse(y_true: &[f64], y_pred: &[f64]) -> f64 {
    // Bước 1: Kiểm tra độ dài
    assert_eq!(y_true.len(), y_pred.len());

    let n = y_true.len() as f64;
    let mut sum_squared_error = 0.0;

    // Bước 2: Tính tổng bình phương sai số
    // Loop qua từng cặp giá trị
    for i in 0..y_true.len() {
        let error = y_true[i] - y_pred[i];        // Sai số = thực - dự đoán
        let squared_error = error * error;          // Bình phương để không bị âm
        sum_squared_error += squared_error;         // Cộng dồn
    }

    // Bước 3: Trả về trung bình
    sum_squared_error / n
}

// === 2. MEAN ABSOLUTE ERROR (MAE) ===
// Công thức: MAE = (1/n) * Σ|y_true - y_pred|
// Dùng cho: Regression, ít nhạy cảm với outliers

fn mae(y_true: &[f64], y_pred: &[f64]) -> f64 {
    assert_eq!(y_true.len(), y_pred.len());

    let n = y_true.len() as f64;
    let mut sum_absolute_error = 0.0;

    for i in 0..y_true.len() {
        let error = y_true[i] - y_pred[i];
        let absolute_error = error.abs();          // Giá trị tuyệt đối
        sum_absolute_error += absolute_error;
    }

    sum_absolute_error / n
}

// === 3. BINARY CROSS ENTROPY ===
// Công thức: BCE = -[y*log(y_pred) + (1-y)*log(1-y_pred)]
// Dùng cho: Binary Classification

fn binary_cross_entropy(y_true: &[f64], y_pred: &[f64]) -> f64 {
    assert_eq!(y_true.len(), y_pred.len());

    let n = y_true.len() as f64;
    let mut sum = 0.0;

    for i in 0..y_true.len() {
        let y_t = y_true[i];
        let y_p = y_pred[i].clamp(1e-15, 1.0 - 1e-15); // Tránh log(0)

        // Công thức Cross Entropy
        let term1 = y_t * y_p.ln();                    // y * log(y_pred)
        let term2 = (1.0 - y_t) * (1.0 - y_p).ln();  // (1-y) * log(1-y_pred)
        sum += term1 + term2;
    }

    // Đảo dấu vì có dấu trừ trong công thức
    -sum / n
}

// === 4. RMSE (Root Mean Squared Error) ===
// Công thức: RMSE = sqrt(MSE)
// Dùng cho: Regression, có cùng đơn vị với y

fn rmse(y_true: &[f64], y_pred: &[f64]) -> f64 {
    mse(y_true, y_pred).sqrt()
}

// === MAIN ===
fn main() {
    println!("=====================================================");
    println!("       LOSS FUNCTIONS - SO SÁNH CHI TIẾT");
    println!("=====================================================");

    // Dữ liệu mẫu: Dự đoán giá nhà (triệu đồng)
    let y_true = vec![500.0, 300.0, 450.0, 600.0, 350.0];
    let y_pred = vec![480.0, 320.0, 420.0, 650.0, 360.0];

    println!("\\n=== DỮ LIỆU MẪU: DỰ ĐOÁN GIÁ NHÀ ===");
    println!("| STT | Thực | Dự đoán | Chênh lệch |");
    println!("|-----|-------|---------|------------|");
    for i in 0..y_true.len() {
        let error = y_true[i] - y_pred[i];
        println!("|  {}  | {:5} |   {:5}  |   {:+6}   |",
                 i+1, y_true[i] as i32, y_pred[i] as i32, error as i32);
    }

    // Tính các loss functions
    let mse_result = mse(&y_true, &y_pred);
    let mae_result = mae(&y_true, &y_pred);
    let rmse_result = rmse(&y_true, &y_pred);

    println!("\\n=== KẾT QUẢ ===");
    println!("MSE (Mean Squared Error): {:.2}", mse_result);
    println!("RMSE (Root MSE): {:.2}", rmse_result);
    println!("MAE (Mean Absolute Error): {:.2}", mae_result);

    println!("\\n=== Ý NGHĨA ===");
    println!("- MSE: Phạt nặng sai số lớn (vì bình phương)");
    println!("  → Dùng khi outliers ít quan trọng");
    println!("\\n- MAE: Phạt đều sai số lớn/nhỏ");
    println!("  → Dùng khi outliers quan trọng cần tránh");
    println!("\\n- RMSE: Cùng đơn vị với y (dễ hiểu hơn)");
    println!("  → Dùng khi cần diễn giải trực quan");

    // === VÍ DỤ VỀ TÁC ĐỘNG CỦA OUTLIER ===
    println!("\\n\\n=== VÍ DỤ VỀ OUTLIER ===");

    // Dataset 1: Không có outlier
    let y_true1 = vec![10.0, 10.0, 10.0, 10.0, 10.0];
    let y_pred1 = vec![9.0, 9.0, 9.0, 9.0, 9.0];

    // Dataset 2: Có một outlier nghiêm trọng
    let y_true2 = vec![10.0, 10.0, 10.0, 10.0, 100.0];
    let y_pred2 = vec![9.0, 9.0, 9.0, 9.0, 9.0];

    println!("\\nDataset 1 (không outlier):");
    println!("  MSE = {:.2}", mse(&y_true1, &y_pred1));
    println!("  MAE = {:.2}", mae(&y_true1, &y_pred1));

    println!("\\nDataset 2 (có outlier = 100):");
    println!("  MSE = {:.2}", mse(&y_true2, &y_pred2));
    println!("  MAE = {:.2}", mae(&y_true2, &y_pred2));

    println!("\\nNHẬN XÉT:");
    println!("- MSE tăng từ 1.00 lên 1632.00 (gấp 1632 lần!)");
    println!("- MAE chỉ tăng từ 1.00 lên 19.20 (gấp 19 lần)");
    println!("→ MSE rất nhạy cảm với outliers!");
}`,
  },
  {
    id: 'ch21_02_02',
    title: '2. Gradient Descent - Leo dốc ngược',
    duration: '40 phút',
    type: 'theory',
    content: `
      <h2>2. Gradient Descent - Leo dốc ngược</h2>

      <h3>Ý tưởng cốt lõi</h3>
      <p><strong>Gradient Descent</strong> (Leo dốc ngược) là thuật toán tìm điểm thấp nhất của một hàm số bằng cách di chuyển dần theo hướng ngược của đạo hàm (gradient).</p>

      <h3>So sánh trực quan</h3>
      <pre><code>Ví dụ: Tìm đáy thung lũng

Gradient Descent:
     ▲
     │        ╱╲
     │       ╱  ╲
     │      ╱    ╲
     │     ╱      ╲
     │    ╱        ╲_______
     │   ╱
     │  ╱  ← Đi ngược gradient
     │ ╱
     └───────────────────
           Vị trí

Gradient (đạo hàm) cho biết:
- Hướng nào đi LÊN (positive gradient)
- Hướng nào đi XUỐNG (negative gradient)
- Độ dốc bao nhiêu (gradient magnitude)</code></pre>

      <h3>Công thức toán học</h3>
      <pre><code>// Cập nhật weight
w_moi = w_cu - learning_rate * gradient

// Trong đó:
// - w_cu: weight hiện tại
// - w_moi: weight mới sau khi cập nhật
// - learning_rate: kích thước bước đi
// - gradient: đạo hàm của loss theo w

// Gradient = hướng tăng nhanh nhất
// - gradient > 0: đi lên → cần trừ để đi xuống
// - gradient < 0: đi xuống → cần cộng để đi lên</code></pre>

      <h3>Learning Rate</h3>
      <table class="comparison-table">
        <tr><th>Learning Rate</th><th>Hiệu ứng</th></tr>
        <tr><td>Quá lớn (1.0)</td><td>Nhảy qua điểm tối ưu, không hội tụ</td></tr>
        <tr><td>Quá nhỏ (0.0001)</td><td>Hội tụ rất chậm</td></tr>
        <tr><td>Vừa đủ (0.01-0.1)</td><td>Hội tụ nhanh và ổn định</td></tr>
      </table>

      <h3>Các loại Gradient Descent</h3>
      <ol>
        <li><strong>Batch Gradient Descent</strong>: Dùng toàn bộ dữ liệu mỗi lần cập nhật → Chính xác nhưng chậm</li>
        <li><strong>Stochastic Gradient Descent (SGD)</strong>: Dùng 1 sample mỗi lần → Nhanh nhưng ồn ào</li>
        <li><strong>Mini-batch GD</strong>: Dùng 32-128 samples → Cân bằng tốt nhất</li>
      </ol>
    `,
    defaultCode: `// =====================================================
// GRADIENT DESCENT - CÀI ĐẶT CHI TIẾT TỪNG DÒNG
// =====================================================

// === GRADIENT DESCENT ĐƠN GIẢN ===
// Tìm minimum của f(x) = x²

fn f(x: f64) -> f64 {
    x * x  // f(x) = x²
}

// Đạo hàm của f(x) = x² là f'(x) = 2x
fn gradient(x: f64) -> f64 {
    2.0 * x
}

// Hàm Gradient Descent
fn gradient_descent(
    x_start: f64,           // Điểm bắt đầu
    learning_rate: f64,    // Kích thước bước
    n_iterations: i32      // Số vòng lặp
) -> (f64, Vec<f64>) {
    let mut x = x_start;
    let mut history = Vec::new();  // Lưu lịch sử để vẽ đồ thị

    for i in 0..n_iterations {
        // Lưu giá trị hiện tại
        history.push(x);

        // Tính gradient tại điểm hiện tại
        let grad = gradient(x);

        // Cập nhật: x = x - learning_rate * gradient
        // Di chuyển NGƯỢC hướng gradient
        x = x - learning_rate * grad;

        // In thông tin mỗi 5 vòng
        if i % 5 == 0 || i == n_iterations - 1 {
            println!("Iteration {:3}: x = {:10.6}, f(x) = {:10.6}, gradient = {:10.6}",
                     i, x, f(x), grad);
        }
    }

    (x, history)
}

// === VÍ DỤ 2: TÌM WEIGHT TỐI ƯU ===
// Giả sử: y = w * x + b (Linear Regression đơn giản)
// Dữ liệu: x = [1, 2, 3], y = [3, 5, 7]
// Mục tiêu: Tìm w tốt nhất (đáp án: w = 2, b = 1)

fn predict(x: f64, w: f64, b: f64) -> f64 {
    w * x + b
}

fn loss(y_true: f64, y_pred: f64) -> f64 {
    (y_true - y_pred) * (y_true - y_pred)
}

// Đạo hàm của loss theo w: dL/dw = -2 * x * (y_true - y_pred)
fn d_loss_dw(x: f64, y_true: f64, w: f64, b: f64) -> f64 {
    let y_pred = predict(x, w, b);
    -2.0 * x * (y_true - y_pred)
}

// Đạo hàm của loss theo b: dL/db = -2 * (y_true - y_pred)
fn d_loss_db(x: f64, y_true: f64, w: f64, b: f64) -> f64 {
    let y_pred = predict(x, w, b);
    -2.0 * (y_true - y_pred)
}

fn train_gd(
    x_data: &[f64],
    y_data: &[f64],
    mut w: f64,
    mut b: f64,
    learning_rate: f64,
    n_epochs: i32
) -> (f64, f64) {
    let n = x_data.len() as f64;

    for epoch in 0..n_epochs {
        let mut dw = 0.0;  // Tổng gradient theo w
        let mut db = 0.0;  // Tổng gradient theo b

        // Tính gradient cho từng data point
        for i in 0..x_data.len() {
            dw += d_loss_dw(x_data[i], y_data[i], w, b);
            db += d_loss_db(x_data[i], y_data[i], w, b);
        }

        // Trung bình gradient
        dw /= n;
        db /= n;

        // Cập nhật weights
        w = w - learning_rate * dw;
        b = b - learning_rate * db;

        // In loss mỗi 100 epochs
        if epoch % 100 == 0 {
            let mut total_loss = 0.0;
            for i in 0..x_data.len() {
                let y_pred = predict(x_data[i], w, b);
                total_loss += loss(y_data[i], y_pred);
            }
            total_loss /= n;
            println!("Epoch {:4}: w = {:.4}, b = {:.4}, loss = {:.4}",
                     epoch, w, b, total_loss);
        }
    }

    (w, b)
}

// === MAIN ===
fn main() {
    println!("=====================================================");
    println!("    GRADIENT DESCENT - MINH HỌA CHI TIẾT");
    println!("=====================================================");

    // === VÍ DỤ 1: TÌM MINIMUM CỦA f(x) = x² ===
    println!("\\n=== VÍ DỤ 1: TÌM MIN CỦA f(x) = x² ===\\n");
    println!("Khởi đầu: x = 10");
    println!("Learning rate: 0.1");
    println!("Số iterations: 30\\n");

    let (min_x, history) = gradient_descent(10.0, 0.1, 30);

    println!("\\n=== KẾT QUẢ ===");
    println!("Điểm minimum tìm được: x = {}", min_x);
    println!("Giá trị minimum: f(x) = {}", f(min_x));
    println!("Đáp án đúng: x = 0, f(x) = 0");

    // === VÍ DỤ 2: TRAIN LINEAR REGRESSION ===
    println!("\\n\\n=== VÍ DỤ 2: LINEAR REGRESSION ===\\n");
    println!("Dữ liệu: y = 2x + 1");
    println!("x = [1, 2, 3], y = [3, 5, 7]\\n");

    let x_data = vec![1.0, 2.0, 3.0];
    let y_data = vec![3.0, 5.0, 7.0];

    println!("Huấn luyện với Gradient Descent...");
    println!("Learning rate: 0.1, Epochs: 1000\\n");

    let (w, b) = train_gd(&x_data, &y_data, 0.0, 0.0, 0.1, 1000);

    println!("\\n=== KẾT QUẢ ===");
    println!("Weight tìm được: w = {:.4}", w);
    println!("Bias tìm được: b = {:.4}", b);
    println!("Đáp án đúng: w = 2, b = 1");

    println!("\\n=== KIỂM TRA ===");
    for i in 0..x_data.len() {
        let y_pred = predict(x_data[i], w, b);
        println!("x = {}: thực = {}, dự đoán = {:.2}, lỗi = {:.2}",
                 x_data[i] as i32, y_data[i] as i32, y_pred, (y_data[i] - y_pred).abs());
    }

    // === VÍ DỤ 3: ẢNH HƯỞNG CỦA LEARNING RATE ===
    println!("\\n\\n=== VÍ DỤ 3: ẢNH HƯỞNG CỦA LEARNING RATE ===\\n");

    let learning_rates = vec![0.001, 0.1, 0.9, 1.1];

    for lr in learning_rates {
        println!("--- Learning Rate = {} ---", lr);
        let (result, _) = gradient_descent(8.0, lr, 20);
        println!("Kết quả: x = {:.4}\\n", result);
    }

    println!("=== NHẬN XÉT ===");
    println!("- LR = 0.001: Quá nhỏ, hội tụ rất chậm");
    println!("- LR = 0.1: Tốt, hội tụ nhanh");
    println!("- LR = 0.9: Gần đúng, hội tụ");
    println!("- LR = 1.1: Quá lớn, không hội tụ (nhảy qua)!");
}`,
  },
  {
    id: 'ch21_02_03',
    title: '3. Chain Rule - Quy tắc dây chuyền',
    duration: '35 phút',
    type: 'theory',
    content: `
      <h2>3. Chain Rule - Quy tắc dây chuyền</h2>

      <h3>Tại sao cần Chain Rule?</h3>
      <p>Trong Neural Network, output phụ thuộc vào input qua nhiều lớp. Để tính đạo hàm của loss theo weights ở lớp đầu tiên, ta cần <strong>Chain Rule</strong> (quy tắc dây chuyền).</p>

      <h3>Định lý Chain Rule</h3>
      <pre><code>Nếu y = f(g(x)), thì:
dy/dx = df/dg * dg/dx

Hay viết theo ký hiệu:
∂L/∂x = ∂L/∂y * ∂y/∂z * ∂z/∂x

Tổng quát:
∂L/∂w = ∂L/∂a * ∂a/∂z * ∂z/∂w</code></pre>

      <h3>Ví dụ trực quan</h3>
      <pre><code>Giả sử ta có:
  x → z = 2x → a = z² → L = a

Tính dL/dx = ?

Bước 1: dL/da = 1      (vì L = a)
Bước 2: da/dz = 2z     (vì a = z²)
Bước 3: dz/dx = 2      (vì z = 2x)

Kết hợp:
dL/dx = dL/da * da/dz * dz/dx
      = 1 * 2z * 2
      = 4z
      = 4 * (2x)
      = 8x

Kiểm tra: L = (2x)² = 4x²
           dL/dx = 8x ✓</code></pre>

      <h3>Chain Rule trong Neural Network</h3>
      <pre><code>Forward pass:
  x → z₁ = w₁*x + b₁ → a₁ = σ(z₁) → z₂ = w₂*a₁ + b₂ → a₂ = σ(z₂) → L

Backward pass (Chain Rule):
  ∂L/∂w₂ = ∂L/∂a₂ * ∂a₂/∂z₂ * ∂z₂/∂w₂
         = (a₂ - y) * σ'(z₂) * a₁

  ∂L/∂w₁ = ∂L/∂a₂ * ∂a₂/∂z₂ * ∂z₂/∂a₁ * ∂a₁/∂z₁ * ∂z₁/∂w₁
         = (a₂ - y) * σ'(z₂) * w₂ * σ'(z₁) * x</code></pre>

      <h3>Ý nghĩa trong Backpropagation</h3>
      <p>Mỗi bước trong backpropagation là một ứng dụng của chain rule!</p>
      <ul>
        <li>Ta tính gradient từ output → input</li>
        <li>Mỗi layer "truyền" gradient cho layer trước đó</li>
        <li>Weight nào có ảnh hưởng lớn hơn → gradient lớn hơn</li>
      </ul>
    `,
    defaultCode: `// =====================================================
// CHAIN RULE - MINH HỌA TRONG NEURAL NETWORK
// =====================================================

// === CÁC HÀM KÍCH HOẠT VÀ ĐẠO HÀM ===
fn sigmoid(x: f64) -> f64 {
    1.0 / (1.0 + (-x).exp())
}

fn sigmoid_derivative(x: f64) -> f64 {
    let s = sigmoid(x);
    s * (1.0 - s)
}

fn relu(x: f64) -> f64 {
    if x > 0.0 { x } else { 0.0 }
}

fn relu_derivative(x: f64) -> f64 {
    if x > 0.0 { 1.0 } else { 0.0 }
}

// === VÍ DỤ 1: CHAIN RULE ĐƠN GIẢN ===
// Tính f(x) = (2x + 1)² và df/dx

fn f_simple(x: f64) -> f64 {
    let z = 2.0 * x + 1.0;  // z = 2x + 1
    z * z                   // f = z²
}

// Đạo hàm bằng chain rule
// f = z², z = 2x + 1
// df/dz = 2z, dz/dx = 2
// df/dx = df/dz * dz/dx = 2z * 2 = 4z = 4(2x+1)
fn df_dx(x: f64) -> f64 {
    let z = 2.0 * x + 1.0;
    2.0 * z * 2.0  // df/dz * dz/dx
}

// === VÍ DỤ 2: NEURAL NETWORK ĐƠN GIẢN ===
// x → h = σ(w1*x + b1) → y = σ(w2*h + b2)
// Loss = (y - y_true)²

struct SimpleNN {
    w1: f64,
    b1: f64,
    w2: f64,
    b2: f64,
}

impl SimpleNN {
    fn new() -> Self {
        SimpleNN { w1: 0.5, b1: 0.1, w2: 0.5, b2: 0.1 }
    }

    // Forward pass: tính output từ input
    fn forward(&self, x: f64) -> (f64, f64, f64, f64) {
        let z1 = self.w1 * x + self.b1;
        let h = sigmoid(z1);              // Hidden layer
        let z2 = self.w2 * h + self.b2;
        let y = sigmoid(z2);               // Output
        (z1, h, z2, y)
    }

    // Tính gradient bằng Chain Rule
    fn backprop(&self, x: f64, y_true: f64) -> (f64, f64, f64, f64) {
        // === FORWARD PASS ===
        let (z1, h, z2, y) = self.forward(x);

        // === BACKWARD PASS (CHAIN RULE) ===

        // Bước 1: Gradient của Loss theo output y
        // Loss = (y - y_true)²
        // dL/dy = 2 * (y - y_true)
        let dL_dy = 2.0 * (y - y_true);

        // Bước 2: Gradient qua activation của output
        // y = σ(z2)
        // dy/dz2 = σ'(z2) = σ(z2) * (1 - σ(z2)) = y * (1-y)
        let dy_dz2 = sigmoid_derivative(z2);

        // Bước 3: Gradient theo w2 và b2
        // z2 = w2*h + b2
        // dz2/dw2 = h
        // dz2/db2 = 1
        let dL_dw2 = dL_dy * dy_dz2 * h;
        let dL_db2 = dL_dy * dy_dz2 * 1.0;

        // Bước 4: Gradient truyền về hidden layer
        // dz2/dh = w2
        // dL/dh = dL/dy * dy/dz2 * dz2/dh
        let dL_dh = dL_dy * dy_dz2 * self.w2;

        // Bước 5: Gradient qua activation của hidden layer
        // h = σ(z1)
        // dh/dz1 = σ'(z1)
        let dh_dz1 = sigmoid_derivative(z1);

        // Bước 6: Gradient theo w1 và b1
        // z1 = w1*x + b1
        // dz1/dw1 = x
        // dz1/db1 = 1
        let dL_dw1 = dL_dh * dh_dz1 * x;
        let dL_db1 = dL_dh * dh_dz1 * 1.0;

        (dL_dw1, dL_db1, dL_dw2, dL_db2)
    }
}

// === MAIN ===
fn main() {
    println!("=====================================================");
    println!("       CHAIN RULE - MINH HỌA CHI TIẾT");
    println!("=====================================================");

    // === VÍ DỤ 1: CHAIN RULE CƠ BẢN ===
    println!("\\n=== VÍ DỤ 1: f(x) = (2x + 1)² ===\\n");

    let test_x = vec![0.0, 1.0, 2.0, 3.0];

    println!("|   x | f(x) = (2x+1)² | df/dx (chain rule) |");
    println!("|-----|-----------------|---------------------|");
    for &x in &test_x {
        let fx = f_simple(x);
        let df = df_dx(x);
        println!("| {:3} | {:14} | {:18.4} |", x as i32, fx as i32, df);
    }

    println!("\\nKiểm tra:");
    println!("- f(2) = (2*2+1)² = 25");
    println!("- df/dx = 4(2x+1) = 4*5 = 20 ✓");

    // === VÍ DỤ 2: NEURAL NETWORK VỚI CHAIN RULE ===
    println!("\\n\\n=== VÍ DỤ 2: NEURAL NETWORK ĐƠN GIẢN ===\\n");
    println!("Cấu trúc: x → [Hidden: σ(w1*x+b1)] → [Output: σ(w2*h+b2)] → y");
    println!("Loss: (y - y_true)²\\n");

    let nn = SimpleNN::new();

    // Test với một input
    let x = 2.0;
    let y_true = 1.0;

    println!("Input: x = {}", x);
    println!("Target: y_true = {}", y_true);
    println!("Weights ban đầu: w1={}, b1={}, w2={}, b2={}",
             nn.w1, nn.b1, nn.w2, nn.b2);

    // Forward pass
    let (z1, h, z2, y) = nn.forward(x);
    println!("\\nForward Pass:");
    println!("  z1 = w1*x + b1 = {} * {} + {} = {}", nn.w1, x, nn.b1, z1);
    println!("  h = σ(z1) = {:.4}", h);
    println!("  z2 = w2*h + b2 = {} * {:.4} + {} = {:.4}", nn.w2, h, nn.b2, z2);
    println!("  y = σ(z2) = {:.4}", y);

    // Tính loss
    let loss = (y - y_true) * (y - y_true);
    println!("\\nLoss = (y - y_true)² = ({:.4} - 1)² = {:.4}", y, loss);

    // Backward pass với Chain Rule
    let (dw1, db1, dw2, db2) = nn.backprop(x, y_true);

    println!("\\n\\n=== BACKWARD PASS (CHAIN RULE) ===\\n");

    println!("Bước 1: dL/dy = 2 * (y - y_true) = 2 * ({:.4} - 1) = {:.4}",
             y, 2.0 * (y - y_true));

    println!("\\nBước 2: Qua output activation (sigmoid):");
    println!("  dy/dz2 = σ'(z2) = σ(z2)*(1-σ(z2)) = {:.4} * {:.4} = {:.4}",
             y, 1.0-y, sigmoid_derivative(z2));

    println!("\\nBước 3: Gradient theo w2, b2:");
    println!("  dL/dw2 = dL/dy * dy/dz2 * h = {:.4} * {:.4} * {:.4} = {:.6}",
             2.0*(y-y_true), sigmoid_derivative(z2), h, dw2);
    println!("  dL/db2 = dL/dy * dy/dz2 * 1 = {:.6}", db2);

    println!("\\nBước 4: Gradient truyền về hidden:");
    println!("  dL/dh = dL/dy * dy/dz2 * w2 = {:.6} * {} = {:.6}",
             2.0*(y-y_true) * sigmoid_derivative(z2), nn.w2, dw2 * nn.w2 / h);

    println!("\\nBước 5: Qua hidden activation:");
    println!("  dh/dz1 = σ'(z1) = {:.4}", sigmoid_derivative(z1));

    println!("\\nBước 6: Gradient theo w1, b1:");
    println!("  dL/dw1 = {:.6}", dw1);
    println!("  dL/db1 = {:.6}", db1);

    println!("\\n=== TỔNG KẾT GRADIENTS ===");
    println!("| Weight | Gradient   | Cập nhật (lr=0.1) |");
    println!("|--------|------------|-------------------|");
    println!("| w1     | {:.8} | w1 - 0.1*{:.8} = {:.4} |", dw1, dw1, nn.w1 - 0.1*dw1);
    println!("| b1     | {:.8} | b1 - 0.1*{:.8} = {:.4} |", db1, db1, nn.b1 - 0.1*db1);
    println!("| w2     | {:.8} | w2 - 0.1*{:.8} = {:.4} |", dw2, dw2, nn.w2 - 0.1*dw2);
    println!("| b2     | {:.8} | b2 - 0.1*{:.8} = {:.4} |", db2, db2, nn.b2 - 0.1*db2);

    println!("\\n=== Ý NGHĨA CỦA CHAIN RULE ===");
    println!("Chain rule cho phép ta:");
    println!("1. Tính gradient cho TẤT CẢ weights trong network");
    println!("2. Biết mỗi weight ảnh hưởng BAO NHIÊU đến loss");
    println!("3. Cập nhật weights để GIẢM loss");
    println!("\\nĐÂY LÀ TRÁI TIM CỦA BACKPROPAGATION!");
}`,
  },
  {
    id: 'ch21_02_04',
    title: '4. Backpropagation - Lan truyền ngược',
    duration: '45 phút',
    type: 'theory',
    content: `
      <h2>4. Backpropagation - Lan truyền ngược</h2>

      <h3>Định nghĩa</h3>
      <p><strong>Backpropagation</strong> (lan truyền ngược) là thuật toán dùng để tính gradient của loss function theo các weights trong Neural Network. Nó kết hợp Chain Rule để tính đạo hàm từ output ngược về input.</p>

      <h3>Quy trình Backpropagation</h3>
      <pre><code>1. FORWARD PASS:
   - Input → Hidden → Output
   - Lưu tất cả activations và z values

2. TÍNH LOSS:
   - So sánh output với ground truth
   - Tính loss = (y_pred - y_true)²

3. BACKWARD PASS (từ output về input):
   - Tính gradient của loss theo output
   - Lan truyền ngược qua từng layer
   - Tính gradient cho từng weight

4. CẬP NHẬT WEIGHTS:
   - w = w - learning_rate * gradient</code></pre>

      <h3>Giải thích chi tiết từng bước</h3>

      <h4>Bước 1: Forward Pass</h4>
      <pre><code>Input x:
  z₁ = w₁*x + b₁         (weighted sum 1)
  a₁ = σ(z₁)             (activation 1)
  z₂ = w₂*a₁ + b₂        (weighted sum 2)
  a₂ = σ(z₂)             (activation 2 = output)
  Loss = (a₂ - y)²</code></pre>

      <h4>Bước 2: Tính gradient từ output</h4>
      <pre><code>∂L/∂a₂ = 2*(a₂ - y)

∂L/∂z₂ = ∂L/∂a₂ * ∂a₂/∂z₂
       = 2*(a₂ - y) * σ'(z₂)</code></pre>

      <h4>Bước 3: Lan truyền ngược</h4>
      <pre><code>∂L/∂w₂ = ∂L/∂z₂ * ∂z₂/∂w₂ = ∂L/∂z₂ * a₁
∂L/∂b₂ = ∂L/∂z₂ * ∂z₂/∂b₂ = ∂L/∂z₂ * 1

∂L/∂a₁ = ∂L/∂z₂ * ∂z₂/∂a₁ = ∂L/∂z₂ * w₂
∂L/∂z₁ = ∂L/∂a₁ * ∂a₁/∂z₁</code></pre>

      <h4>Bước 4: Cập nhật weights</h4>
      <pre><code>w₂ = w₂ - lr * ∂L/∂w₂
b₂ = b₂ - lr * ∂L/∂b₂
w₁ = w₁ - lr * ∂L/∂w₁
b₁ = b₁ - lr * ∂L/∂b₁</code></pre>

      <h3>Điểm quan trọng cần nhớ</h3>
      <ul>
        <li><strong>Forward pass</strong>: Lưu tất cả intermediate values</li>
        <li><strong>Backward pass</strong>: Dùng chain rule để tính gradient</li>
        <li><strong>Gradient</strong>: Cho biết hướng và độ lớn cần điều chỉnh</li>
        <li><strong>Learning rate</strong>: Kiểm soát tốc độ học</li>
      </ul>
    `,
    defaultCode: `// =====================================================
// BACKPROPAGATION - CÀI ĐẶT ĐẦY ĐỦ
// Neural Network với 1 Hidden Layer
// =====================================================

// === CẤU TRÚC NEURAL NETWORK ===
struct NeuralNetwork {
    // Hidden layer
    w1: f64,
    w2: f64,
    b1: f64,

    // Output layer
    w3: f64,
    w4: f64,
    b2: f64,
}

impl NeuralNetwork {
    // Khởi tạo với weights ngẫu nhiên
    fn new() -> Self {
        NeuralNetwork {
            w1: 0.5, w2: 0.5, b1: 0.1,
            w3: 0.5, w4: 0.5, b2: 0.1,
        }
    }

    // Activation functions
    fn sigmoid(x: f64) -> f64 {
        1.0 / (1.0 + (-x).exp())
    }

    fn sigmoid_derivative(x: f64) -> f64 {
        let s = Self::sigmoid(x);
        s * (1.0 - s)
    }

    // === FORWARD PASS ===
    // x → h1, h2 → output
    fn forward(&self, x1: f64, x2: f64) -> (f64, f64, f64, f64, f64) {
        // Hidden layer
        let z1 = self.w1 * x1 + self.w2 * x2 + self.b1;
        let h1 = Self::sigmoid(z1);
        let h2 = Self::sigmoid(z1);  // Simplified: dùng chung z1

        // Output layer
        let z2 = self.w3 * h1 + self.w4 * h2 + self.b2;
        let output = Self::sigmoid(z2);

        (z1, h1, h2, z2, output)
    }

    // === BACKPROPAGATION ===
    fn train(&mut self, x1: f64, x2: f64, y_true: f64, learning_rate: f64) -> f64 {
        // === FORWARD PASS ===
        let (z1, h1, h2, z2, y_pred) = self.forward(x1, x2);

        // Tính loss: MSE
        let loss = (y_pred - y_true) * (y_pred - y_true);

        // === BACKWARD PASS ===

        // Bước 1: Gradient từ output
        let dL_dy = 2.0 * (y_pred - y_true);

        // Bước 2: Qua output activation
        let dy_dz2 = Self::sigmoid_derivative(z2);
        let dL_dz2 = dL_dy * dy_dz2;

        // Bước 3: Gradient theo output weights
        let dL_dw3 = dL_dz2 * h1;
        let dL_dw4 = dL_dz2 * h2;
        let dL_db2 = dL_dz2;

        // Bước 4: Gradient truyền về hidden
        let dL_dh1 = dL_dz2 * self.w3;
        let dL_dh2 = dL_dz2 * self.w4;

        // Bước 5: Qua hidden activation
        let dh1_dz1 = Self::sigmoid_derivative(z1);
        let dL_dz1 = dL_dh1 * dh1_dz1 + dL_dh2 * dh1_dz1;

        // Bước 6: Gradient theo hidden weights
        let dL_dw1 = dL_dz1 * x1;
        let dL_dw2 = dL_dz1 * x2;
        let dL_db1 = dL_dz1;

        // === CẬP NHẬT WEIGHTS ===
        self.w1 -= learning_rate * dL_dw1;
        self.w2 -= learning_rate * dL_dw2;
        self.b1 -= learning_rate * dL_db1;
        self.w3 -= learning_rate * dL_dw3;
        self.w4 -= learning_rate * dL_dw4;
        self.b2 -= learning_rate * dL_db2;

        loss
    }
}

// === TRAINING LOOP HOÀN CHỈNH ===
fn train_full(
    nn: &mut NeuralNetwork,
    x_data: &[[f64; 2]],
    y_data: &[f64],
    learning_rate: f64,
    n_epochs: i32
) {
    let n = x_data.len();

    println!("\\n=== TRAINING LOOP ===");
    println!("Epoch | Loss    | w1     | w2     | w3     | b2");
    println!("------|---------|--------|--------|--------|-----");

    for epoch in 0..n_epochs {
        let mut total_loss = 0.0;

        // Train trên từng sample
        for i in 0..n {
            let loss = nn.train(
                x_data[i][0],
                x_data[i][1],
                y_data[i],
                learning_rate
            );
            total_loss += loss;
        }

        // In loss mỗi 100 epochs
        if epoch % 100 == 0 || epoch == n_epochs - 1 {
            let avg_loss = total_loss / n as f64;
            println!("{:5} | {:7.4} | {:.4} | {:.4} | {:.4} | {:.4}",
                     epoch, avg_loss, nn.w1, nn.w2, nn.w3, nn.b2);
        }
    }
}

// === MAIN ===
fn main() {
    println!("=====================================================");
    println!("   BACKPROPAGATION - NEURAL NETWORK HOÀN CHỈNH");
    println!("=====================================================");

    // === DỮ LIỆU: AND GATE ===
    // x1 x2 → AND → y
    println!("\\n=== DỮ LIỆU: AND GATE ===");
    let x_data = [
        [0.0, 0.0],
        [0.0, 1.0],
        [1.0, 0.0],
        [1.0, 1.0],
    ];
    let y_data = [0.0, 0.0, 0.0, 1.0];

    println!("| x1 | x2 | AND |");
    println!("|----|----|-----|");
    for i in 0..4 {
        println!("| {}  | {}  |  {}  |",
                 x_data[i][0] as i32,
                 x_data[i][1] as i32,
                 y_data[i] as i32);
    }

    // === KHỞI TẠO VÀ TRAIN ===
    let mut nn = NeuralNetwork::new();

    println!("\\n=== WEIGHTS BAN ĐẦU ===");
    println!("w1={:.4}, w2={:.4}, b1={:.4}",
             nn.w1, nn.w2, nn.b1);
    println!("w3={:.4}, w4={:.4}, b2={:.4}",
             nn.w3, nn.w4, nn.b2);

    // Train với Gradient Descent
    train_full(&mut nn, &x_data, &y_data, 1.0, 1000);

    println!("\\n=== WEIGHTS SAU KHI TRAIN ===");
    println!("w1={:.4}, w2={:.4}, b1={:.4}",
             nn.w1, nn.w2, nn.b1);
    println!("w3={:.4}, w4={:.4}, b2={:.4}",
             nn.w3, nn.w4, nn.b2);

    // === KIỂM TRA ===
    println!("\\n=== KẾT QUẢ SAU TRAIN ===");
    println!("| x1 | x2 | Dự đoán | Kết quả |");
    println!("|----|----|---------|---------|");

    for i in 0..4 {
        let (_, _, _, _, output) = nn.forward(x_data[i][0], x_data[i][1]);
        let prediction = if output > 0.5 { 1.0 } else { 0.0 };
        let correct = if prediction == y_data[i] { "✓" } else { "✗" };
        println!("| {}  | {}  |  {:.4}  |   {}    |",
                 x_data[i][0] as i32,
                 x_data[i][1] as i32,
                 output,
                 correct);
    }

    // === BACKPROPAGATION CHO 1 SAMPLE (CHI TIẾT) ===
    println!("\\n\\n=== CHI TIẾT BACKPROPAGATION CHO 1 SAMPLE ===");
    println!("Input: x1=1, x2=1, y_true=1");

    // Reset weights để demo
    let mut demo_nn = NeuralNetwork::new();

    println!("\\n--- FORWARD PASS ---");
    let (z1, h1, h2, z2, y) = demo_nn.forward(1.0, 1.0);
    println!("z1 = w1*x1 + w2*x2 + b1 = {}*1 + {}*1 + {} = {}",
             demo_nn.w1, demo_nn.w2, demo_nn.b1, z1);
    println!("h1 = σ(z1) = {:.4}", h1);
    println!("z2 = w3*h1 + w4*h2 + b2 = {}*{:.4} + {}*{:.4} + {} = {:.4}",
             demo_nn.w3, h1, demo_nn.w4, h2, demo_nn.b2, z2);
    println!("y = σ(z2) = {:.4}", y);

    let loss = (y - 1.0) * (y - 1.0);
    println!("Loss = (y - y_true)² = ({:.4} - 1)² = {:.4}", y, loss);

    println!("\\n--- BACKWARD PASS ---");
    println!("1. dL/dy = 2*(y - y_true) = 2*({:.4} - 1) = {:.4}", y, 2.0*(y-1.0));

    let dy_dz2 = NeuralNetwork::sigmoid_derivative(z2);
    println!("2. dy/dz2 = σ'(z2) = {:.4}", dy_dz2);

    let dL_dz2 = 2.0*(y-1.0) * dy_dz2;
    println!("3. dL/dz2 = dL/dy * dy/dz2 = {:.4}", dL_dz2);

    println!("4. Gradients cho output layer:");
    println!("   dL/dw3 = dL/dz2 * h1 = {:.4} * {:.4} = {:.6}",
             dL_dz2, h1, dL_dz2*h1);
    println!("   dL/db2 = dL/dz2 = {:.6}", dL_dz2);

    println!("\\n5. Gradient truyền về hidden:");
    let dL_dh1 = dL_dz2 * demo_nn.w3;
    println!("   dL/dh1 = dL/dz2 * w3 = {:.4} * {} = {:.4}",
             dL_dz2, demo_nn.w3, dL_dh1);

    let dL_dz1 = dL_dh1 * NeuralNetwork::sigmoid_derivative(z1);
    println!("   dL/dz1 = dL/dh1 * σ'(z1) = {:.4} * {:.4} = {:.4}",
             dL_dh1, NeuralNetwork::sigmoid_derivative(z1), dL_dz1);

    println!("\\n6. Gradients cho hidden layer:");
    println!("   dL/dw1 = dL/dz1 * x1 = {:.4} * 1 = {:.6}",
             dL_dz1, dL_dz1);

    println!("\\n=== Ý NGHĨA ===");
    println!("Backpropagation cho phép:");
    println!("1. Tính gradient của loss theo TỪNG weight");
    println!("2. Biết weight nào ảnh hưởng nhiều/ít đến loss");
    println!("3. Cập nhật weights để GIẢM loss (learning)");
    println!("\\nĐây là cách Neural Networks HỌC!");
}`,
  },
];

// =====================================================
// Export Bài 2
// =====================================================

export const ch21_02: Chapter = {
  id: 'ch21_02',
  title: '21.2. Cách Neural Networks Học',
  introduction: `
    <h2>Cách Neural Networks Học</h2>
    <ul>
      <li>Loss Function - Đo lường sai số</li>
      <li>Gradient Descent - Leo dốc ngược</li>
      <li>Chain Rule - Quy tắc dây chuyền</li>
      <li>Backpropagation - Lan truyền ngược</li>
    </ul>
  `,
  lessons: ch21_02_lessons,
};

export default ch21_02;
