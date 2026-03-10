// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Loss Functions chi tiết
// =====================================================

import { Lesson, Chapter } from '../../courses';

const loss_lessons: Lesson[] = [
  {
    id: 'ch21_loss_01',
    title: '1. Loss Functions - Đo lường sai số',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">query_stats</span> 15. Loss Functions - Đo lường sai số</h2>

  <h3>15.1. Tại sao cần Loss Function?</h3>
  <div class="definition-block mb-4">
    <p><strong>Loss Function (Hàm Mất Mát)</strong> đo lường "mức độ sai" giữa dự đoán của model và giá trị thực tế. Nó đóng vai trò là "kim chỉ nam" định hướng cho toàn bộ quá trình huấn luyện: Loss càng nhỏ, model càng thông minh.</p>
  </div>

  <h3>15.2. Các loại Loss Functions cơ bản</h3>

  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon text-blue-600"><span class="material-symbols-outlined">show_chart</span></div>
      <h4>a) Regression Losses</h4>
      <p class="text-sm text-gray-600 mb-2">Dùng cho bài toán dự đoán số thực (VD: Giá nhà, Nhiệt độ)</p>
      <table class="comparison-table text-sm">
        <tr><th>Viết tắt</th><th>Công thức</th><th>Đặc điểm</th></tr>
        <tr><td><strong>MSE</strong></td><td><code>(y-ŷ)²</code></td><td>Phạt rất nặng sai số lớn (Nhạy Outlier)</td></tr>
        <tr><td><strong>MAE</strong></td><td><code>|y-ŷ|</code></td><td>Phạt đều, lì lợm với Outlier</td></tr>
        <tr><td><strong>Huber</strong></td><td>Lai MSE & MAE</td><td>Cân bằng cả hai ưu điểm</td></tr>
      </table>
    </div>

    <div class="feature-card">
      <div class="feature-icon text-green-600"><span class="material-symbols-outlined">category</span></div>
      <h4>b) Classification Losses</h4>
      <p class="text-sm text-gray-600 mb-2">Dùng cho bài toán phân loại (VD: Chó/Mèo, Spam email)</p>
      <table class="comparison-table text-sm">
        <tr><th>Tên gọi</th><th>Công thức rút gọn</th><th>Dùng khi</th></tr>
        <tr><td><strong>BCE</strong></td><td><code>-ylog(ŷ) - (1-y)log(1-ŷ)</code></td><td>Phân loại Nhị phân (Có/Không)</td></tr>
        <tr><td><strong>CCE</strong></td><td><code>-Σ y_i * log(ŷ_i)</code></td><td>Phân loại Đa lớp (Nhiều nhãn)</td></tr>
      </table>
    </div>
  </div>

  <h3>15.3. Huber Loss - Đứa con lai hoàn hảo</h3>
  <div class="callout callout-info">
    <div class="callout-icon"><span class="material-symbols-outlined">hub</span></div>
    <div class="callout-content">
      <strong>Huber Loss (Smooth L1 Loss)</strong> kết hợp cả MSE và MAE thông qua tham số ngưỡng <code>δ</code> (delta).
      <ul class="mt-2 text-sm">
        <li><strong>Khi sai số nhỏ (≤ δ):</strong> Áp dụng công thức <code>0.5 × (y - ŷ)²</code> → Cư xử như MSE, giúp hội tụ mượt mà quanh đáy.</li>
        <li><strong>Khi sai số lớn (> δ):</strong> Áp dụng công thức <code>δ × |y - ŷ| - 0.5δ²</code> → Cư xử như MAE, giúp model không bị "tẩu hỏa nhập ma" bởi các điểm dữ liệu nhiễu (Outliers).</li>
      </ul>
      <p class="mt-2 border-t pt-2 border-blue-200"><strong>Ứng dụng:</strong> Đặc biệt phổ biến trong các mô hình Object Detection (như Faster R-CNN) để vẽ bounding box chính xác.</p>
    </div>
  </div>

  <h3>15.4. Bảng cửu chương chọn Loss Function</h3>
  <table class="comparison-table mt-4">
    <thead>
      <tr><th>Bài Toán Của Bạn</th><th>Đặc Điểm Dữ Liệu</th><th>Loss Function Cần Dùng</th></tr>
    </thead>
    <tbody>
      <tr><td>Dự đoán số (Regression)</td><td>Sạch, ít nhiễu (Outliers)</td><td><strong>MSE</strong> (Mean Squared Error)</td></tr>
      <tr><td>Dự đoán số (Regression)</td><td>Nhiều dữ liệu nhiễu chọc trời</td><td><strong>MAE</strong> hoặc <strong>Huber Loss</strong></td></tr>
      <tr><td>Phân loại (Classification)</td><td>Chỉ có 2 lớp (Có Mưa / Không Mưa)</td><td><strong>Binary Cross-Entropy (BCE)</strong></td></tr>
      <tr><td>Phân loại (Classification)</td><td>Từ 3 lớp trở lên (Nhận diện chữ số 0-9)</td><td><strong>Categorical Cross-Entropy (CCE)</strong></td></tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: `// =====================================================
// LOSS FUNCTIONS - TẤT CẢ TRONG MỘT
// =====================================================

fn mse(y_true: &[f64], y_pred: &[f64]) -> f64 {
    assert_eq!(y_true.len(), y_pred.len());
    let n = y_true.len() as f64;
    y_true.iter().zip(y_pred.iter())
        .map(|(t, p)| (t - p).powi(2))
        .sum::<f64>() / n
}

fn mae(y_true: &[f64], y_pred: &[f64]) -> f64 {
    assert_eq!(y_true.len(), y_pred.len());
    let n = y_true.len() as f64;
    y_true.iter().zip(y_pred.iter())
        .map(|(t, p)| (t - p).abs())
        .sum::<f64>() / n
}

fn binary_cross_entropy(y_true: &[f64], y_pred: &[f64]) -> f64 {
    assert_eq!(y_true.len(), y_pred.len());
    let n = y_true.len() as f64;
    let mut sum = 0.0;
    for (t, p) in y_true.iter().zip(y_pred.iter()) {
        let p = p.clamp(1e-15, 1.0 - 1e-15);
        sum += t * p.ln() + (1.0 - t) * (1.0 - p).ln();
    }
    -sum / n
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              LOSS FUNCTIONS - SO SÁNH CHI TIẾT                   ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Dữ liệu: Dự đoán giá nhà
    let y_true = vec![500.0, 300.0, 450.0, 600.0, 350.0];
    let y_pred = vec![480.0, 320.0, 420.0, 650.0, 360.0];

    println!("\\n=== REGRESSION LOSSES ===");
    println!("Data: y_true = {:?}\\n       y_pred = {:?}", y_true, y_pred);

    println!("MSE  = {:.2}", mse(&y_true, &y_pred));
    println!("MAE  = {:.2}", mae(&y_true, &y_pred));

    // Binary Classification
    println!("\\n=== CLASSIFICATION LOSSES ===");
    let y_true_bin = vec![0.0, 0.0, 1.0, 1.0, 1.0];
    let y_pred_bin = vec![0.1, 0.3, 0.8, 0.7, 0.9];

    println!("BCE  = {:.4}", binary_cross_entropy(&y_true_bin, &y_pred_bin));

    println!("\\n=== SO SÁNH MSE vs MAE ===");
    println!("MSE: Phạt nặng outliers (bình phương)");
    println!("MAE: Phạt đều outliers");
}`,
  },
  {
    id: 'ch21_loss_02',
    title: '2. Binary Cross Entropy chi tiết',
    duration: '30 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">splitscreen</span> 16. Binary Cross Entropy (BCE) & Lý thuyết thông tin</h2>

  <h3>16.1. Chiêm ngưỡng công thức</h3>
  <div class="formula-block">
    <p><code>BCE = -[ y * log(ŷ) + (1-y) * log(1-ŷ) ]</code></p>
    <div class="mt-2 text-sm text-gray-700 text-left w-max mx-auto">
      <p><strong>y:</strong> Giá trị thực tế (Ground truth) ∈ {0, 1}</p>
      <p><strong>ŷ:</strong> Xác suất dự đoán của model ∈ (0, 1)</p>
    </div>
  </div>

  <h3>16.2. Phép màu của Logarit</h3>
  <div class="concept-grid">
    <div class="concept-card highlight-success">
      <div class="concept-icon"><span class="material-symbols-outlined">sentiment_satisfied</span></div>
      <h4>Khi dự đoán ĐÚNG</h4>
      <p>Thực tế <code>y=1</code>, dự đoán <code>ŷ → 1</code>.</p>
      <p>Ta có: <code>log(1) = 0</code> → <strong>Loss = 0</strong>.</p>
      <p class="text-sm mt-2 text-green-700">Mô hình không bị phạt!</p>
    </div>
    <div class="concept-card highlight-danger">
      <div class="concept-icon text-red-500"><span class="material-symbols-outlined">sentiment_dissatisfied</span></div>
      <h4>Khi dự đoán SAI</h4>
      <p>Thực tế <code>y=1</code>, nhưng bảo thủ dự đoán <code>ŷ → 0</code>.</p>
      <p>Ta có: <code>log(0) = -∞</code> → <strong>Loss = +∞</strong>.</p>
      <p class="text-sm mt-2 text-red-700">Phạt cực nặng sự ảo tưởng!</p>
    </div>
  </div>

  <hr class="my-6 border-gray-300">

  <h3><span class="material-symbols-outlined">science</span> 16.3. Information Theory (Lý thuyết thông tin Shannon)</h3>
  <div class="callout callout-info mb-4">
    <div class="callout-icon"><span class="material-symbols-outlined">help_center</span></div>
    <div class="callout-content">
      <strong>ENTROPY (H) - Đo lường độ "Bất định" (Uncertainty):</strong>
      <p><code>H(p) = -Σ p(x) × log(p(x))</code></p>
      <ul class="mt-2 space-y-1">
        <li>Tung đồng xu chuẩn <code>p=[0.5, 0.5]</code> → Đoán kiểu gì cũng hên xui → Entropy lớn nhất (Bất định cao).</li>
        <li>Đồng xu gian lận <code>p=[0.99, 0.01]</code> → Biết chắc 99% ra ngửa → Entropy gần bằng 0 (Ít bất định).</li>
      </ul>
    </div>
  </div>

  <div class="definition-block">
    <p><strong>CROSS-ENTROPY (CE) - So sánh 2 phân phối:</strong></p>
    <p><code>CE(p, q) = -Σ p(x) × log(q(x))</code></p>
    <div class="text-sm mt-2">
      <p>Với <code>p</code> là sự thật (Mẹ thiên nhiên), <code>q</code> là dự đoán của máy.</p>
      <p><strong>Mục tiêu:</strong> Làm cho <code>CE</code> nhỏ nhất có thể, tức là ép <code>q</code> (máy) suy nghĩ y chang <code>p</code> (Thiên nhiên).</p>
    </div>
  </div>

  <h3>16.4. KL Divergence (Kullback-Leibler) - Ý nghĩa thật sự</h3>
  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">architecture</span></div>
    <div class="callout-content">
      <strong>KL Divergence đo LỆCH PHA giữa 2 phân phối:</strong>
      <p class="mb-2"><code>KL(p || q) = CE(p, q) - H(p)</code></p>
      <p><strong>Bí mật của Deep Learning:</strong></p>
      <p>Vì Entropy của tự nhiên <code>H(p)</code> là một hằng số bất biến (Ta không thể thay đổi dữ liệu gốc), do đó:</p>
      <p class="mt-2 text-center text-lg font-bold text-red-600 bg-red-50 p-2 rounded">Giảm CE Loss ⇔ Giảm khoảng cách KL</p>
      <p class="mt-2 text-sm italic">"Chạy Gradient Descent để hạ CE Loss thực chất là đang bóp méo não bộ trinh nguyên của model (q) cho đến khi nó ép sát và khớp hoàn toàn với thực tại (p)."</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// BINARY CROSS ENTROPY - CHI TIẾT
// =====================================================

fn bce(y: f64, y_hat: f64) -> f64 {
    let y_hat = y_hat.clamp(1e-15, 1.0 - 1e-15);
    -(y * y_hat.ln() + (1.0 - y) * (1.0 - y_hat).ln())
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║           BINARY CROSS ENTROPY - CHI TIẾT                         ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    println!("\\n=== VÍ DỤ ===");
    println!("y=1, p=0.9 → BCE = {:.4}", bce(1.0, 0.9));
    println!("y=1, p=0.5 → BCE = {:.4}", bce(1.0, 0.5));
    println!("y=1, p=0.1 → BCE = {:.4}", bce(1.0, 0.1));
    println!("\\n→ Dự đoán càng sai (p=0.1), loss càng lớn!");
}`,
  },
];

export const ch21_loss: Chapter = {
  id: 'ch21_loss',
  title: '21.6. Loss Functions',
  introduction: `<h2>Loss Functions chi tiết</h2>`,
  lessons: loss_lessons,
};

export default ch21_loss;
