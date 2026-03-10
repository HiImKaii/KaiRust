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
      <h2>1. Loss Functions - Đo lường sai số</h2>

      <h3>1.1. Tại sao cần Loss Function?</h3>
      <p>Loss Function đo lường "mức độ sai" giữa dự đoán của model và giá trị thực. Nó là "kim chỉ nam" cho việc huấn luyện model.</p>

      <h3>1.2. Các loại Loss Functions</h3>

      <h4>a) Regression Losses:</h4>
      <table class="comparison-table">
        <tr><th>Tên</th><th>Công thức</th><th>Khi nào dùng</th></tr>
        <tr><td>MSE</td><td>(y-ŷ)²</td><td>Regression, nhạy với outliers</td></tr>
        <tr><td>MAE</td><td>|y-ŷ|</td><td>Regression, ít nhạy outliers</td></tr>
        <tr><td>Huber</td><td>Kết hợp MSE + MAE</td><td>Regression, cân bằng</td></tr>
      </table>

      <h4>b) Classification Losses:</h4>
      <table class="comparison-table">
        <tr><th>Tên</th><th>Công thức</th><th>Khi nào dùng</th></tr>
        <tr><td>Binary Cross Entropy</td><td>-[ylog(ŷ) + (1-y)log(1-ŷ)]</td><td>Binary Classification</td></tr>
        <tr><td>Categorical CE</td><td>-Σyilog(ŷi)</td><td>Multi-class</td></tr>
      </table>
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
      <h2>2. Binary Cross Entropy chi tiết</h2>

      <h3>2.1. Công thức</h3>
      <pre><code>BCE = -(y * log(ŷ) + (1-y) * log(1-ŷ))

Trong đó:
- y: giá trị thực (0 hoặc 1)
- ŷ: xác suất dự đoán (0-1)</code></pre>

      <h3>2.2. Tại sao dùng Log?</h3>
      <ul>
        <li>Khi y=1, ŷ→1 → log(1) = 0 → loss = 0 (tốt!)</li>
        <li>Khi y=1, ŷ→0 → log(0) = -∞ → loss = ∞ (tệ!)</li>
        <li>Log "phạt nặng" những dự đoán sai hoàn toàn</li>
      </ul>
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
  title: '21.X. Loss Functions',
  introduction: `<h2>Loss Functions chi tiết</h2>`,
  lessons: loss_lessons,
};

export default ch21_loss;
