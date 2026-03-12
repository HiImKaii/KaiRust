// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 4: LOSS FUNCTIONS - HÀM MẤT MÁT
//
// Mục tiêu học thuật:
// 1. Bản chất Maximum Likelihood Estimation (MLE) - nền tảng của mọi hàm Loss.
// 2. Regression Losses: MSE, MAE và Huber Loss (Công thức và Đạo hàm).
// 3. Classification Losses: BCE, CCE và KL Divergence.
// 4. Kỹ thuật nâng cao: Focal Loss - Xử lý dữ liệu mất cân bằng.
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_04_lessons: Lesson[] = [
  {
    id: 'ch21_04_01',
    title: '1. Maximum Likelihood Estimation - Nguồn gốc mọi hàm Loss',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Maximum Likelihood Estimation (MLE) - Nguồn gốc mọi hàm Loss</h2>

  <!-- ========================================= -->
  <!-- 1.1. TẠI SAO CẦN HÀM LOSS?               -->
  <!-- ========================================= -->
  <h3>1.1. Tại sao máy tính cần Hàm Loss?</h3>

  <p>Khi Neural Network đưa ra dự đoán, ta cần một cách để đánh giá mức độ sai lệch giữa dự đoán đó và kết quả thực tế. <strong>Loss Function (Hàm Suy Hao)</strong> chính là thước đo này.</p>

  <div class="definition-block">
    <span class="definition-term">Loss Function (Hàm Suy Hao / Hàm Mất mát)</span>
    <p>Là một hàm số đo lường <strong>mức độ sai lệch</strong> giữa dự đoán của mô hình và giá trị thực tế. Loss càng nhỏ → mô hình càng tốt.</p>
  </div>

  <h4>Tại sao không dùng Accuracy (Độ chính xác)?</h4>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon">✓</div>
      <h4>Accuracy</h4>
      <p>Đếm số lần đúng / tổng số lần</p>
      <p><strong>Là số rời rạc</strong>: 0%, 1%, 2%...</p>
      <p class="text-red-600 font-bold">KHÔNG THỂ đạo hàm được!</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon">✓</div>
      <h4>Loss</h4>
      <p>Là số thực liên tục</p>
      <p>Có thể lấy đạo hàm: ∂L/∂w</p>
      <p class="text-green-600 font-bold">CÓ THỂ tối ưu bằng Gradient Descent!</p>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-icon">⚠</div>
    <div class="callout-content">
      <strong>Vấn đề cốt lõi: Backpropagation cần Gradient</strong>
      <p>Thuật toán <strong>Backpropagation</strong> (Lan truyền ngược) sử dụng đạo hàm để tính toán mức độ điều chỉnh cho mỗi trọng số. Tuy nhiên, Accuracy là một hàm rời rạc dạng bậc thang nên đạo hàm gần như bằng 0 ở mọi nơi - thuật toán không biết phải học theo hướng nào!</p>
    </div>
  </div>

  <p>Vậy ta cần một hàm số <strong>liên tục và có đạo hàm</strong> để thay thế cho Accuracy. Đây chính là lý do <strong>Likelihood</strong> xuất hiện trong lý thuyết Machine Learning.</p>

  <!-- ========================================= -->
  <!-- 1.2. KHÁI NIỆM LIKELIHOOD                 -->
  <!-- ========================================= -->
  <h3>1.2. Likelihood - Xác suất xảy ra dữ liệu</h3>

  <div class="image-showcase">
    <img src="/images/ch21/loss_mle_concept.png" alt="MLE Concept Visualization" />
    <div class="image-caption">Hình 1: MLE tìm tham số θ để maximize likelihood</div>
  </div>

  <p><strong>Hãy quan sát Hình 1 để hiểu MLE hoạt động như thế nào:</strong></p>
  <ul>
    <li><strong>Trục x:</strong> Giá trị tham số θ có thể (ví dụ: xác suất sấp của đồng xu)</li>
    <li><strong>Trục y:</strong> Giá trị Likelihood - xác suất quan sát được dữ liệu với tham số đó</li>
    <li><strong>Đỉnh cao nhất:</strong> Tham số θ tốt nhất - giá trị mà tại đó likelihood đạt maximum</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <strong>Ý nghĩa trực quan:</strong>
      <p>MLE tìm θ sao cho dữ liệu quan sát được có xác suất xuất hiện cao nhất. Tưởng tượng bạn có nhiều đường cong likelihood khác nhau (cho các dataset khác nhau), MLE chọn đỉnh của mỗi đường để tìm θ tối ưu.</p>
    </div>
  </div>

  <p><strong>Likelihood</strong> (độ hợp lý) đo lường xác suất của việc quan sát được dữ liệu hiện tại khi biết trước bộ tham số θ (trọng số).</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-bold mb-2 text-center">Công thức Likelihood cho N mẫu dữ liệu:</p>
    <p class="font-mono text-lg text-center">$L(\theta) = P(data | \theta) = \prod_{i=1}^{N} P(x_i, y_i | \theta)$</p>
    <p class="text-sm text-gray-600 mt-2">Trong đó: θ là bộ trọng số của mạng neural</p>
  </div>

  <h4>Ví dụ minh họa: Ước lượng xác suất sấp của đồng xu</h4>

  <div class="definition-block">
    <span class="definition-term">Bài toán ước lượng xác suất sấp (p) của đồng xu</span>
    <p>Ta tung đồng xu 10 lần, thu được 7 lần sấp (H), 3 lần ngửa (T). Hỏi xác suất sấp thực sự p bằng bao nhiêu?</p>
    <ul>
      <li>Nếu p = 0.7: Likelihood = 0.7^7 × 0.3^3 = 0.0042</li>
      <li>Nếu p = 0.5: Likelihood = 0.5^10 = 0.001</li>
      <li>Nếu p = 0.9: Likelihood = 0.9^7 × 0.1^3 = 0.00005</li>
    </ul>
    <p class="font-bold text-green-700 mt-2">→ MLE chọn p = 0.7 vì đây là giá trị có likelihood cao nhất!</p>
  </div>

  <p>Tuy nhiên, khi áp dụng vào Neural Network thực tế với hàng triệu mẫu dữ liệu, Likelihood gặp một vấn đề nghiêm trọng về mặt tính toán.</p>

  <!-- ========================================= -->
  <!-- 1.3. VẤN ĐỀ UNDERFLOW                     -->
  <!-- ========================================= -->
  <h3>1.3. Vấn đề Underflow - Tại sao cần Logarithm?</h3>

  <div class="image-showcase">
    <img src="/images/ch21/loss_underflow.png" alt="Underflow Problem" />
    <div class="image-caption">Hình 2: Nhân nhiều xác suất nhỏ gây ra underflow</div>
  </div>

  <p><strong>Hãy quan sát Hình 2 để hiểu vấn đề underflow:</strong></p>
  <ul>
    <li><strong>Trục x:</strong> Số lần nhân (số mẫu dữ liệu)</li>
    <li><strong>Trục y:</strong> Kết quả sau khi nhân</li>
    <li><strong>Đường màu đỏ:</strong> Kết quả nhân trực tiếp - nhanh chóng giảm về 0</li>
    <li><strong>Đường màu xanh:</strong> Kết quả sau khi log - vẫn ổn định</li>
  </ul>

  <div class="callout callout-warning">
    <div class="callout-icon">⚠</div>
    <div class="callout-content">
      <strong>Vấn đề cốt lõi:</strong>
      <p>Chỉ cần nhân 0.9 với chính nó 100 lần, kết quả đã là ~2.7×10⁻⁵. Nhân 1000 lần → ~10⁻⁴⁴ (gần như bằng 0). Máy tính không thể lưu trữ những số quá nhỏ này → <strong>UNDERFLOW</strong>.</p>
    </div>
  </div>

  <p>Trong thực tế, Neural Network xử lý hàng triệu mẫu dữ liệu. Mỗi mẫu có xác suất dự đoán đúng thường nhỏ hơn 1 (ví dụ: 0.9). Khi nhân hàng triệu số nhỏ với nhau, kết quả sẽ <strong>tràn số (overflow)</strong> về 0!</p>

  <div class="callout callout-warning">
    <div class="callout-icon">⚠</div>
    <div class="callout-content">
      <strong>Ví dụ Underflow:</strong>
      <p>0.9 × 0.9 × 0.9 × ... (100 lần) = 0.9^100 ≈ 2.7 × 10^-5</p>
      <p>0.9 × 0.9 × 0.9 × ... (1000 lần) ≈ 10^-44</p>
      <p>0.9 × 0.9 × 0.9 × ... (10000 lần) → <strong>UNDERFLOW!</strong> (số quá nhỏ không lưu được trong float64)</p>
    </div>
  </div>

  <h4>Giải pháp: Dùng Logarithm</h4>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-bold mb-2 text-center">Logarithm biến phép nhân thành phép cộng:</p>
    <p class="font-mono text-lg text-center">$\log(A \times B \times C) = \log(A) + \log(B) + \log(C)$</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Cách tính</th>
        <th>100 samples</th>
        <th>1000 samples</th>
        <th>Kết quả</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Nhân trực tiếp</strong></td>
        <td>0.9^100 = 2.7e-5</td>
        <td>0.9^1000 ≈ 0</td>
        <td class="text-red-600">UNDERFLOW!</td>
      </tr>
      <tr>
        <td><strong>Cộng Log</strong></td>
        <td>100 × log(0.9) = -10.5</td>
        <td>1000 × log(0.9) = -105</td>
        <td class="text-green-600">An toàn!</td>
      </tr>
    </tbody>
  </table>

  <p>Vậy là Logarithm đã giải quyết được vấn đề Underflow. Tuy nhiên, vẫn còn một vấn đề cần giải quyết: <strong>Gradient Descent tìm cực tiểu (minimum)</strong>, trong khi với Likelihood ta cần <strong>cực đại (maximum)</strong>.</p>

  <!-- ========================================= -->
  <!-- 1.4. NEGATIVE LOG-LIKELIHOOD (NLL)       -->
  <!-- ========================================= -->
  <h3>1.4. Negative Log-Likelihood (NLL) - Hàm Loss hoàn hảo</h3>

  <div class="image-showcase">
    <img src="/images/ch21/loss_mle_vs_nll.png" alt="NLL Transformation" />
    <div class="image-caption">Hình 3: Từ Likelihood → Log-Likelihood → NLL Loss</div>
  </div>

  <p><strong>Hãy quan sát Hình 3 để hiểu quá trình chuyển đổi:</strong></p>
  <ul>
    <li><strong>Đường màu xanh (Likelihood):</strong> Maximum ở θ=0.7 (đỉnh cao nhất). Ta cần TÌM ĐƯỢC đỉnh này.</li>
    <li><strong>Đường màu cam (Log-Likelihood):</strong> Cùng hình dạng nhưng "nén lại" - không bị underflow!</li>
    <li><strong>Đường màu đỏ (NLL = -Log):</strong> Lật ngược đỉnh xuống đáy. Từ bài toán MAXIMIZE (tìm đỉnh) → MINIMIZE (tìm đáy).</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <strong>Điểm mấu chốt:</strong>
      <p>Minimize NLL = Maximize Likelihood. Gradient Descent tìm minimum (đáy), nên ta cần "lật" đồ thị để đỉnh cao nhất trở thành điểm thấp nhất. Đó là lý do có dấu "-" trong NLL.</p>
    </div>
  </div>

  <p>Tuy nhiên, vẫn còn một vấn đề cần giải quyết: <strong>Gradient Descent tìm cực tiểu (minimum)</strong>, trong khi với Likelihood ta cần <strong>cực đại (maximum)</strong>.</p>

  <div class="definition-block">
    <span class="definition-term">Negative Log-Likelihood (NLL)</span>
    <p><strong>NLL = -Log(Likelihood)</strong></p>
    <ul>
      <li>Log: Tránh underflow, biến phép nhân thành phép cộng</li>
      <li>Dấu trừ (-): Biến bài toán cực đại thành bài toán cực tiểu</li>
    </ul>
  </div>

  <div class="callout callout-important">
    <div class="callout-icon">✓</div>
    <div class="callout-content">
      <strong>Kết luận quan trọng nhất:</strong>
      <p class="text-xl text-center font-bold text-blue-700 my-4">Minimize NLL Loss ⇔ Maximize Likelihood ⇔ Tìm mô hình tốt nhất</p>
      <p>Đây là nền tảng toán học của <strong>mọi</strong> hàm Loss trong Deep Learning!</p>
    </div>
  </div>

  <h4>So sánh:</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Hàm</th>
        <th>Công thức</th>
        <th>Mục tiêu</th>
        <th>Đạo hàm được?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Likelihood</td>
        <td>$\prod P(x_i | \theta)$</td>
        <td>MAXIMIZE</td>
        <td>Khó (underflow)</td>
      </tr>
      <tr>
        <td>Log-Likelihood</td>
        <td>$\sum \log P(x_i | \theta)$</td>
        <td>MAXIMIZE</td>
        <td>✓</td>
      </tr>
      <tr>
        <td><strong>NLL (Loss)</strong></td>
        <td><strong>$-\sum \log P(x_i | \theta)$</strong></td>
        <td><strong>MINIMIZE</strong></td>
        <td>✓✓ Rất tốt!</td>
      </tr>
    </tbody>
  </table>

  <p>Bây giờ ta đã có hàm Loss hoàn hảo. Tiếp theo, ta cần tìm hiểu <strong>cách tối ưu hóa</strong> hàm Loss này - đó chính là <strong>Gradient Descent</strong>.</p>

  <!-- ========================================= -->
  <!-- 1.5. GRADIENT DESCENT                     -->
  <!-- ========================================= -->
  <h3>1.5. Gradient Descent - Cách AI học</h3>

  <div class="image-showcase">
    <img src="/images/ch21/loss_gradient_descent.png" alt="Gradient Descent Visualization" />
    <div class="image-caption">Hình 4: Gradient Descent tìm minimum bằng cách đi theo hướng ngược gradient</div>
  </div>

  <p><strong>Hãy quan sát Hình 4 để hiểu Gradient Descent hoạt động:</strong></p>
  <ul>
    <li><strong>Đường cong:</strong> Hàm Loss - một parabol lồi</li>
    <li><strong>Các chấm đỏ:</strong> Các bước của Gradient Descent từ điểm bắt đầu đến điểm minimum</li>
    <li><strong>Mũi tên:</strong> Hướng di chuyển - luôn ngược với gradient (đạo hàm)</li>
    <li><strong>Quan sát:</strong> Mỗi bước, model di chuyển về phía đáy. Các bước đầu lớn (gradient lớn), các bước sau nhỏ dần (gradient giảm khi gần đáy)</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <strong>Tại sao "ngược gradient"?</strong>
      <p>Gradient chỉ hướng TĂNG (đi lên). Để GIẢM Loss, ta đi ngược lại → trừ đi gradient. Công thức: $w_{new} = w_{old} - \eta \times gradient$</p>
    </div>
  </div>

  <p><strong>Gradient Descent (Giảm dần Gradient)</strong> là thuật toán tối ưu cốt lõi: từ một điểm bất kỳ trên đồ thị hàm Loss, thuật toán di chuyển dần về phía có gradient âm (hướng đi xuống) cho đến khi tìm được điểm cực tiểu.</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-bold mb-2 text-center">Công thức cập nhật trọng số:</p>
    <p class="font-mono text-lg text-center">$w_{new} = w_{old} - \eta \times \frac{\partial L}{\partial w}$</p>
    <p class="text-sm text-gray-600 mt-2">Trong đó: η (eta) là tốc độ học (learning rate), ∂L/∂w là gradient của Loss theo trọng số w</p>
  </div>

  <h4>Các bước của Gradient Descent:</h4>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Khởi tạo</h4>
        <p>Khởi tạo ngẫu nhiên các trọng số w ban đầu</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Tính Loss</h4>
        <p>Truyền dữ liệu qua mạng (forward pass), tính giá trị Loss L = NLL(y_pred, y_true)</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Tính Gradient</h4>
        <p>Lan truyền ngược (backpropagation): tính ∂L/∂w cho mỗi trọng số</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>Cập nhật</h4>
        <p>w = w - η × gradient</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">5</div>
      <div class="step-content">
        <h4>Lặp lại</h4>
        <p>Lặp lại từ bước 2 cho đến khi Loss đạt giá trị đủ nhỏ</p>
      </div>
    </div>
  </div>

  <p>Một yếu tố quan trọng ảnh hưởng đến khả năng tìm được nghiệm tối ưu của Gradient Descent là <strong>dạng của hàm Loss</strong>.</p>

  <!-- ========================================= -->
  <!-- 1.6. CONVEX VS NON-CONVEX                 -->
  <!-- ========================================= -->
  <h3>1.6. Hàm Loss lồi và không lồi</h3>

  <div class="image-showcase">
    <img src="/images/ch21/loss_landscape.png" alt="Loss Landscape" />
    <div class="image-caption">Hình 5: Loss landscape có thể có nhiều local minima</div>
  </div>

  <p><strong>Hãy quan sát Hình 5 để hiểu về local vs global minimum:</strong></p>
  <ul>
    <li><strong>Bề mặt gồ ghề:</strong> Địa hình Loss của Neural Network thực tế - rất phức tạp!</li>
    <li><strong>Điểm A (Global Minimum):</strong> Điểm thấp nhất - mục tiêu tìm được</li>
    <li><strong>Điểm B, C (Local Minima):</strong> Các "đáy" cục bộ - nơi Gradient Descent có thể bị kẹt</li>
    <li><strong>Vấn đề:</strong> Nếu model rơi vào local minimum, nó sẽ dừng lại dù chưa tìm được điểm tốt nhất!</li>
  </ul>

  <div class="callout callout-warning">
    <div class="callout-icon">⚠</div>
    <div class="callout-content">
      <strong>Thực tế:</strong>
      <p>May mắn thay, các local minima trong Neural Networks thường không quá "sâu" và gradient vẫn đủ lớn để model vượt qua. Hơn nữa, local minima thường cũng đủ tốt cho ứng dụng thực tế.</p>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon">✓</div>
      <h4>Convex (Lồi)</h4>
      <p>Chỉ có 1 global minimum duy nhất</p>
      <p>Gradient Descent chắc chắn tìm được đáy</p>
      <p><em>Ví dụ: Linear Regression, Logistic Regression</em></p>
    </div>
    <div class="concept-card">
      <div class="concept-icon">!</div>
      <h4>Non-Convex (Không lồi)</h4>
      <p>Có nhiều local minima</p>
      <p>Gradient Descent có thể mắc kẹt ở local minimum</p>
      <p><em>Ví dụ: Neural Networks</em></p>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-icon">i</div>
    <div class="callout-content">
      <strong>Lưu ý thực tế:</strong>
      <p>Mặc dù Neural Networks có hàm Loss non-convex với nhiều điểm cực tiểu cục bộ, trong thực tế Gradient Descent thường tìm được các nghiệm đủ tốt (không nhất thiết là global minimum nhưng vẫn đáp ứng được yêu cầu ứng dụng).</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.7. TÓM TẮT                              -->
  <!-- ========================================= -->
  <h3>1.7. Tóm tắt</h3>

  <div class="key-takeaway">
    <div class="key-takeaway-icon">📝</div>
    <div class="key-takeaway-content">
      <h4>Tổng kết:</h4>
      <ol>
        <li><strong>Loss</strong> đo lường mức độ sai lệch giữa dự đoán và giá trị thực tế - cần được tối thiểu hóa</li>
        <li><strong>Accuracy</strong> không thể sử dụng trực tiếp vì không thể tính đạo hàm</li>
        <li><strong>Likelihood</strong> đo xác suất của dữ liệu khi biết trước tham số θ</li>
        <li><strong>Logarithm</strong> giải quyết vấn đề underflow khi nhân nhiều xác suất nhỏ</li>
        <li><strong>NLL = -Log(Likelihood)</strong> là hàm Loss hoàn hảo: trơn, có thể đạo hàm, cực tiểu hóa NLL tương đương với cực đại hóa likelihood</li>
        <li><strong>Gradient Descent</strong> tìm điểm cực tiểu bằng cách di chuyển ngược hướng gradient</li>
      </ol>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// THUC HANH: TINH TOAN MLE VA NLL
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║          THUC HANH: MAXIMUM LIKELIHOOD ESTIMATION (MLE)             ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // ==========================================================================
    // BAI TOAN: Tung dong xu 10 lan, duoc 7 sap (H), 3 ngua (T)
    // Tim xac suat that cua dong xu (p = ?)
    // ==========================================================================

    let n_heads = 7;
    let n_tails = 3;

    println!("\n📊 Du lieu: {} lan sap, {} lan ngua trong {} lan tung",
             n_heads, n_tails, n_heads + n_tails);

    // ==========================================================================
    // CACH 1: Tinh truc tiep (Likelihood) - KHONG DUNG DUOC!
    // ==========================================================================
    println!("\n--- CACH 1: Tinh LIKELIHOOD truc tiep ---");

    let test_probs = [0.3, 0.5, 0.7, 0.9];

    for &p in &test_probs {
        // Likelihood = p^n_heads * (1-p)^n_tails
        let likelihood = (p as f64).powi(n_heads) * (1.0 - p as f64).powi(n_tails);
        println!("  p = {} → Likelihood = {:.6}", p, likelihood);
    }

    // ==========================================================================
    // CACH 2: Tinh LOG-LIKELIHOOD - An toan, khong underflow!
    // ==========================================================================
    println!("\n--- CACH 2: Tinh LOG-LIKELIHOOD ---");

    for &p in &test_probs {
        // log_likelihood = n_heads * log(p) + n_tails * log(1-p)
        let log_likelihood = n_heads as f64 * (p as f64).ln() +
                             n_tails as f64 * (1.0 - p as f64).ln();
        println!("  p = {} → Log-Likelihood = {:.4}", p, log_likelihood);
    }

    // ==========================================================================
    // CACH 3: Tinh NLL (Negative Log-Likelihood) - DAY LA LOSS!
    // ==========================================================================
    println!("\n--- CACH 3: Tinh NLL (Negative Log-Likelihood = LOSS) ---");

    let mut best_p = 0.0;
    let mut min_nll = f64::MAX;

    // Thu nhieu gia tri p de tim minimum
    for i in 1..100 {
        let p = i as f64 / 100.0;
        let nll = -(n_heads as f64 * p.ln() + n_tails as f64 * (1.0 - p).ln());
        if nll < min_nll {
            min_nll = nll;
            best_p = p;
        }
    }

    println!("  → p toi uu (MLE): {:.2}", best_p);
    println!("  → NLL Loss nho nhat: {:.4}", min_nll);

    // ==========================================================================
    // BAI HOC: Tai sao NLL tot hon Likelihood?
    // ==========================================================================
    println!("\n╔══════════════════════════════════════════════════════════════════════╗");
    println!("║                    BAI HOC QUAN TRONG                                ║");
    println!("╠══════════════════════════════════════════════════════════════════════╣");
    println!("║ 1. Likelihood: Nhan nhieu so nho → UNDERFLOW!                      ║");
    println!("║ 2. Log-Likelihood: Cong cac log → KHONG BAO GIO underflow!        ║");
    println!("║ 3. NLL = -Log-Likelihood: Minimize → Tuong duong Maximize          ║");
    println!("║ 4. Gradient Descent CAN NLL vi:                                    ║");
    println!("║    - La ham tron (smooth), dao ham duoc moi noi                    ║");
    println!("║    - Minimum cua NLL = Maximum cua Likelihood                       ║");
    println!("║    - Gia tri Loss cu the, dung de so sanh mo hinh                 ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");
}`
  },
  {
    id: 'ch21_04_02',
    title: '2. Nhóm Regression: L1, L2 và Huber',
    duration: '50 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Nhóm Suy Hao Hồi Quy (Regression Losses)</h2>

  <!-- ========================================= -->
  <!-- 2.1. GIỚI THIỆU REGRESSION               -->
  <!-- ========================================= -->
  <h3>2.1. Khi nào dùng Regression Loss?</h3>

  <p><strong>Regression</strong> (Hồi quy) là bài toán dự đoán một <strong>giá trị liên tục</strong> (continuous value), khác với Classification (phân loại rời rạc).</p>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon">📊</div>
      <h4>Ví dụ Regression</h4>
      <ul>
        <li>Dự đoán giá nhà: \$350,000</li>
        <li>Dự đoán nhiệt độ: 25.5°C</li>
        <li>Dự đoán lượng mưa: 120mm</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon">🏷️</div>
      <h4>Ví dụ Classification</h4>
      <ul>
        <li>Email là Spam/Không Spam</li>
        <li>Ảnh là Chó/Mèo/Vịt</li>
        <li>Giá lên/xuống</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-icon">i</div>
    <div class="callout-content">
      <strong>Tại sao không dùng Cross-Entropy cho Regression?</strong>
      <p>Cross-Entropy yêu cầu output là xác suất (tổng = 1). Trong khi Regression dự đoán giá trị thực không giới hạn. Hơn nữa, dự đoán giá nhà \$100k mà thực tế \$99k <strong>không phải là sai hoàn toàn</strong> - đây là "mức độ sai lệch" chứ không phải "đúng/sai".</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 2.2. MSE (L2 LOSS)                       -->
  <!-- ========================================= -->
  <h3>2.2. MSE (L2 Loss) - Mean Squared Error</h3>

  <div class="image-showcase">
    <img src="/images/ch21/loss_regression_comparison.png" alt="MSE vs MAE Comparison" />
    <div class="image-caption">Hình 1: So sánh đồ thị MSE (parabol màu xanh) vs MAE (chữ V màu cam)</div>
  </div>

  <p><strong>Hãy quan sát Hình 1 để hiểu sự khác biệt cơ bản:</strong></p>
  <ul>
    <li><strong>Đường màu xanh (MSE):</strong> Dạng <strong>parabol</strong> - mượt mà, không có điểm gãy
      <ul>
        <li>Tại 0 (sai số = 0): Loss = 0</li>
        <li>Càng xa 0: Loss tăng <strong>nhanh</strong> (bình phương)</li>
        <li>Ví dụ: Sai 1 → Loss = 1, Sai 2 → Loss = 4, Sai 3 → Loss = 9</li>
      </ul>
    </li>
    <li><strong>Đường màu cam (MAE):</strong> Dạng <strong>chữ V</strong> - có điểm gãy tại 0
      <ul>
        <li>Tại 0 (sai số = 0): Loss = 0</li>
        <li>Càng xa 0: Loss tăng <strong>tuyến tính</strong></li>
        <li>Ví dụ: Sai 1 → Loss = 1, Sai 2 → Loss = 2, Sai 3 → Loss = 3</li>
      </ul>
    </li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <strong>Điểm quan trọng cần nhớ:</strong>
      <p>MSE phạt nặng các sai số lớn (outliers), trong khi MAE phạt đều nhau. Đây là lý do MSE nhạy cảm với outliers còn MAE thì "miễn nhiễm".</p>
    </div>
  </div>

  <p><strong>MSE</strong> (Mean Squared Error) là hàm Loss phổ biến nhất cho Regression. Nó tính <strong>bình phương</strong> của sai số, nhấn mạnh các ngoại lệ (outliers).</p>

  <div class="formula-block my-4 p-4 bg-blue-50 border-blue-300">
    <p class="font-bold mb-2 text-center">Công thức MSE:</p>
    <p class="font-mono text-lg text-center">$MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$</p>
    <p class="text-sm text-gray-600 mt-2">Trong đó: $y_i$ là giá trị thực tế, $\hat{y}_i$ là dự đoán của model</p>
  </div>

  <h4>Đạo hàm của MSE:</h4>

  <div class="formula-block my-4 p-4 bg-red-50 border-red-300">
    <p class="font-bold mb-2 text-center">Đạo hàm theo prediction $\hat{y}$:</p>
    <p class="font-mono text-lg text-center">$\frac{\partial L_{MSE}}{\partial \hat{y}} = \frac{2}{n} \sum_{i=1}^{n} (\hat{y}_i - y_i)$</p>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/loss_regression_derivatives.png" alt="MSE Derivative Visualization" />
    <div class="image-caption">Hình 2: Đạo hàm MSE = 2 × (prediction - target)</div>
  </div>

  <p><strong>Phân tích đạo hàm (Hình 2):</strong></p>
  <ul>
    <li><strong>Trục x:</strong> Sai số (prediction - target)</li>
    <li><strong>Trục y:</strong> Giá trị đạo hàm</li>
    <li><strong>Đường thẳng đi qua gốc:</strong> Đạo hàm tỷ lệ tuyến tính với sai số</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <strong>Tại sao đạo hàm tuyến tính quan trọng?</strong>
      <p>Với MSE, gradient tỷ lệ trực tiếp với sai số:
        <ul>
          <li>Sai số lớn → Gradient lớn → Cập nhật mạnh</li>
          <li>Sai số nhỏ → Gradient nhỏ → Cập nhật nhẹ</li>
        </ul>
      Model tự động điều chỉnh "sức học" tùy theo mức độ sai! Đây là tính chất rất quan trọng giúp MSE hội tụ nhanh.
      </p>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon">✓</div>
      <h4>Ưu điểm</h4>
      <ul>
        <li><strong>Khả năng tối ưu:</strong> Hàm parabol lồi (convex) chỉ có 1 điểm minimum duy nhất → Gradient Descent chắc chắn tìm được đáy</li>
        <li><strong>Đạo hàm mượt:</strong> Gradient thay đổi liên tục, không có "điểm gãy"</li>
        <li><strong>Nhạy với sai số:</strong> Phạt nặng các dự đoán sai xa</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon">✗</div>
      <h4>Nhược điểm</h4>
      <ul>
        <li><strong>Nhạy cảm quá mức với Outliers:</strong> Sai 10 đền 100! Một ngoại lệ có thể "phá hủy" toàn bộ training</li>
        <li><strong>Đơn vị khó hiểu:</strong> Giá trị Loss = (đơn vị)², khó diễn giải trực tiếp</li>
      </ul>
    </div>
  </div>

  <h4>Khi nào dùng MSE?</h4>
  <ul>
    <li>Khi dữ liệu <strong>không có nhiễu</strong> (outliers ít)</li>
    <li>Khi cần model <strong>hội tụ nhanh và ổn định</strong></li>
    <li>Các bài toán như: Dự đoán giá cổ phiếu, phân tích xu hướng</li>
  </ul>

  <!-- ========================================= -->
  <!-- 2.3. MAE (L1 LOSS)                       -->
  <!-- ========================================= -->
  <h3>2.3. MAE (L1 Loss) - Mean Absolute Error</h3>

  <p><strong>MAE</strong> (Mean Absolute Error) tính <strong>giá trị tuyệt đối</strong> của sai số, cho mức phạt tuyến tính.</p>

  <div class="formula-block my-4 p-4 bg-green-50 border-green-300">
    <p class="font-bold mb-2 text-center">Công thức MAE:</p>
    <p class="font-mono text-lg text-center">$MAE = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|$</p>
  </div>

  <h4>Đạo hàm của MAE:</h4>

  <div class="formula-block my-4 p-4 bg-red-50 border-red-300">
    <p class="font-bold mb-2 text-center">Đạo hàm theo prediction $\hat{y}$:</p>
    <p class="font-mono text-lg text-center">$\frac{\partial L_{MAE}}{\partial \hat{y}} = \frac{1}{n} \sum_{i=1}^{n} \text{sign}(\hat{y}_i - y_i)$</p>
    <p class="text-sm text-gray-600 mt-2">Trong đó: sign(x) = +1 nếu x > 0, -1 nếu x < 0, 0 nếu x = 0</p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-icon">⚠</div>
    <div class="callout-content">
      <strong>Vấn đề của MAE tại điểm 0:</strong>
      <p>Hàm |x| có <strong>đạo hàm không xác định</strong> tại x = 0 (điểm gãy). Gradient Descent sẽ "dao động dữ dội" (oscillate) khi gần điểm minimum, không biết nên đi lên hay đi xuống.</p>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon">✓</div>
      <h4>Ưu điểm</h4>
      <ul>
        <li><strong>Miễn nhiễm với Outliers:</strong> Sai 10 phạt 10, không bị "bình phương" phóng đại</li>
        <li><strong>Đơn vị trực quan:</strong> Loss = đơn vị gốc, dễ hiểu</li>
        <li><strong>Robust:</strong> Ổn định khi dữ liệu có nhiễu</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon">✗</div>
      <h4>Nhược điểm</h4>
      <ul>
        <li><strong>Gradient không smooth:</strong> Dao động tại điểm 0</li>
        <li><strong>Hội tụ chậm:</strong> Gradient không tỷ lệ với sai số → học chậm khi gần đáp án</li>
      </ul>
    </div>
  </div>

  <h4>Khi nào dùng MAE?</h4>
  <ul>
    <li>Khi dữ liệu <strong>có nhiều outliers</strong> (giá nhà có vài căn siêu đắt)</li>
    <li>Khi cần model <strong>không bị kéo bởi các điểm bất thường</strong></li>
    <li>Các bài toán như: Dự đoán giá bất động sản, phát hiện gian lận</li>
  </ul>

  <!-- ========================================= -->
  <!-- 2.4. SO SÁNH MSE vs MAE                  -->
  <!-- ========================================= -->
  <h3>2.4. So sánh MSE và MAE</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>MSE (L2)</th>
        <th>MAE (L1)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Công thức</strong></td>
        <td>$(y - \hat{y})^2$</td>
        <td>$|y - \hat{y}|$</td>
      </tr>
      <tr>
        <td><strong>Đồ thị</strong></td>
        <td>Parabol (mượt)</td>
        <td>Chữ V (điểm gãy tại 0)</td>
      </tr>
      <tr>
        <td><strong>Đạo hàm</strong></td>
        <td>$\partial L/\partial \hat{y} = 2(\hat{y} - y)$</td>
        <td>$\partial L/\partial \hat{y} = sign(\hat{y} - y)$</td>
      </tr>
      <tr>
        <td><strong>Outliers</strong></td>
        <td class="text-red-600">Rất nhạy cảm (phạt nặng)</td>
        <td class="text-green-600">Miễn nhiễm (phạt tuyến tính)</td>
      </tr>
      <tr>
        <td><strong>Hội tụ</strong></td>
        <td class="text-green-600">Nhanh, ổn định</td>
        <td class="text-red-600">Chậm, dao động</td>
      </tr>
      <tr>
        <td><strong>Điểm cực tiểu</strong></td>
        <td>1 điểm (duy nhất)</td>
        <td>1 điểm (nhưng gradient không xác định tại đó)</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 2.5. HUBER LOSS                          -->
  <!-- ========================================= -->
  <h3>2.5. Huber Loss - Kết hợp tốt nhất của hai thế giới</h3>

  <div class="image-showcase">
    <img src="/images/ch21/loss_regression_comparison.png" alt="Huber Loss Visualization" />
    <div class="image-caption">Hình 3: Huber Loss (đường màu xanh lá) kết hợp MSE (trong) và MAE (ngoài)</div>
  </div>

  <p><strong>Hãy quan sát Hình 3 để hiểu Huber Loss hoạt động:</strong></p>
  <ul>
    <li><strong>Đường màu xanh dương (MSE):</strong> Parabol - phạt nặng khi sai số lớn</li>
    <li><strong>Đường màu cam (MAE):</strong> Chữ V - phạt đều nhưng có điểm gãy</li>
    <li><strong>Đường màu xanh lá (Huber):</strong>
      <ul>
        <li>Gần tâm (sai số nhỏ): Dùng <strong>MSE</strong> → mượt mà, hội tụ nhanh</li>
        <li>Xa tâm (sai số lớn): Chuyển sang <strong>MAE</strong> → giới hạn phạt tối đa</li>
      </ul>
    </li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <strong>Điểm mấu chốt:</strong>
      <p>Huber Loss dùng một <strong>ngưỡng δ (delta)</strong> để quyết định khi nào chuyển từ MSE sang MAE. Thường δ = 1.0 hoặc 1.5. Điểm chuyển (khoảng [-δ, δ]) thể hiện rõ trên hình.</p>
    </div>
  </div>

  <p><strong>Huber Loss</strong> được thiết kế để <strong>kết hợp ưu điểm</strong> của cả MSE và MAE:</p>

  <ul>
    <li>Dùng <strong>MSE</strong> khi sai số nhỏ (hội tụ mượt mà)</li>
    <li>Dùng <strong>MAE</strong> khi sai số lớn (không bị outlier phá hủy)</li>
  </ul>

  <div class="formula-block my-4 p-4 bg-purple-50 border-purple-300">
    <p class="font-bold mb-2 text-center">Công thức Huber Loss:</p>
    <p class="font-mono text-lg text-center">$L_{\delta}(y, \hat{y}) = \frac{1}{n} \sum_{i=1}^{n} L_{\delta}(e_i)$</p>
    <p class="font-mono text-center mt-2">với $e_i = y_i - \hat{y}_i$</p>
    <p class="font-mono text-center mt-2">$L_{\delta}(e) = \\begin{cases} \\frac{1}{2}e^2 & \\text{nếu } |e| \\le \delta \\\\ \\delta|e| - \\frac{1}{2}\\delta^2 & \\text{nếu } |e| > \\delta \\end{cases}$</p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon">✓</div>
      <h4>Ưu điểm</h4>
      <ul>
        <li><strong>Tại nhỏ (|e| ≤ δ):</strong> Như MSE - mượt, hội tụ nhanh</li>
        <li><strong>Tại lớn (|e| > δ):</strong> Như MAE - giới hạn phạt, không bị outlier kéo</li>
        <li><strong>Đạo hàm xác định mọi nơi:</strong> Không có điểm gãy</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon">⚙️</div>
      <h4>Tham số δ (delta)</h4>
      <ul>
        <li><strong>δ nhỏ:</strong> Gần MAE hơn, ít nhạy với outliers</li>
        <li><strong>δ lớn:</strong> Gần MSE hơn, hội tụ nhanh</li>
        <li>Thường chọn δ ≈ 1.0 hoặc δ ≈ 1.5</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-icon"><span class="material-symbols-outlined">auto_awesome</span></div>
    <div class="callout-content">
      <strong>Ứng dụng thực tế: Object Detection</strong>
      <p>Các model Object Detection nổi tiếng như <strong>YOLO, R-CNN, Fast R-CNN</strong> đều sử dụng <strong>Huber Loss (Smooth L1)</strong> để dự đoán tọa độ Bounding Box.</p>
      <p>Lý do: Tọa độ bounding box có thể bị nhiễu (annotation không chính xác), Huber Loss giúp model không bị "phá hủy" bởi các nhãn nhiễu.</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 2.6. TÓM TẮT                              -->
  <!-- ========================================= -->
  <h3>2.6. Tóm tắt</h3>

  <div class="key-takeaway">
    <div class="key-takeaway-icon">📝</div>
    <div class="key-takeaway-content">
      <h4>Tổng kết Regression Losses:</h4>
      <ol>
        <li><strong>MSE (L2):</strong> Phạt bình phương → Nhạy cảm với outliers, hội tụ nhanh. Dùng khi dữ liệu sạch.</li>
        <li><strong>MAE (L1):</strong> Phạt tuyến tính → Miễn nhiễm với outliers, gradient có vấn đề tại 0. Dùng khi dữ liệu nhiễu.</li>
        <li><strong>Huber Loss:</strong> Kết hợp cả hai - MSE cho sai số nhỏ, MAE cho sai số lớn. Đặc biệt tốt cho Object Detection.</li>
        <li><strong>Quy tắc chọn:</strong> Thử MSE trước → Nếu có vấn đề với outliers → Chuyển MAE hoặc Huber.</li>
      </ol>
    </div>
  </div>
</div>
    `,
    defaultCode: `// MÔ PHỎNG HUBER LOSS LINH HOẠT TRONG THỰC TẾ
// =====================================================

fn mse(e: f64) -> f64 { e * e }
fn mae(e: f64) -> f64 { e.abs() }

fn huber_loss(error: f64, delta: f64) -> f64 {
    let abs_err = error.abs();
    if abs_err <= delta {
        0.5 * error * error                        // Nhánh MSE (Đầu mượt)
    } else {
        delta * abs_err - 0.5 * delta * delta      // Nhánh MAE (Chống bạo động đỉnh)
    }
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║       SO SÁNH CÁC HÀM LOSS REGRESSION BẰNG BỘ DỮ LIỆU ĐIÊN           ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Giả sử có MỘT TÊN DỮ LIỆU NHIỄU (OUTLIER) Sai lệch tới 100.0 đơn vị!
    let normal_error_1 = 0.5;
    let normal_error_2 = -1.2;
    let outlier_error  = 100.0;

    println!("\n[1] Thấy gì khi gặp Outlier = 100.0?");
    println!("- L1 (MAE)  phạt: {:.1}", mae(outlier_error));
    // MSE phạt = 100.0 ^ 2 = 10,000. Cú nổ này sẽ nướng chín Graidient vọt cả nghìn dặm, làm bay màu Weight!
    println!("- L2 (MSE)  phạt: {:.1} (BÙM CÚ TÁT NGÀN CÂN!)", mse(outlier_error));

    // Huber với ngưỡng bẻ lái = 1.0
    let delta = 1.0;
    println!("\n[2] HUBER LOSS (Delta={}) - Kẻ Cân Bằng:", delta);

    println!("   + Sai số Mượt ({:.1}) -> Huber phán: {:.3} (Mượt như nhung chảo parabol)",
        normal_error_1, huber_loss(normal_error_1, delta));

    println!("   + Khủng bố ({:.1}) -> Huber phán: {:.3} (Tách sang MAE chặn đứng cháy nổ)",
        outlier_error, huber_loss(outlier_error, delta));

    println!("\n>>> BÀI HỌC: Mã nguồn Object Detection toàn cắm cọc Huber (Smooth L1) để chống móp Bounding Box vì những bức ảnh nhiễu ác đạn!");
}`
  },
  {
    id: 'ch21_04_03',
    title: '3. Phân Loại Xác Suất: BCE, CCE & Focal Loss',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Nhóm Suy Hao Phân Loại (Classification Losses)</h2>

  <!-- ========================================= -->
  <!-- 3.1. GIỚI THIỆU CLASSIFICATION           -->
  <!-- ========================================= -->
  <h3>3.1. Khi nào dùng Classification Loss?</h3>

  <p><strong>Classification</strong> (Phân loại) là bài toán dự đoán một <strong>nhãn rời rạc</strong> (discrete label), khác với Regression (giá trị liên tục).</p>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon">🔴</div>
      <h4>Binary Classification</h4>
      <ul>
        <li>Email: Spam / Không Spam</li>
        <li>Tin tức: Thật / Giả</li>
        <li>Y tế: Có bệnh / Không bệnh</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon">🔢</div>
      <h4>Multi-class Classification</h4>
      <ul>
        <li>Ảnh: Chó / Mèo / Vịt</li>
        <li>Ngôn ngữ: EN / FR / DE / VI</li>
        <li>Chữ số: 0-9</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-icon">i</div>
    <div class="callout-content">
      <strong>Từ MLE đến Cross-Entropy:</strong>
      <p>Như đã học ở mục 1, <strong>Negative Log-Likelihood (NLL)</strong> là nền tảng của mọi hàm Loss. Cross-Entropy chính là NLL được viết dưới dạng "đo khoảng cách giữa hai phân phối xác suất".</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 3.2. BINARY CROSS-ENTROPY (BCE)         -->
  <!-- ========================================= -->
  <h3>3.2. Binary Cross-Entropy (BCE)</h3>

  <div class="image-showcase">
    <img src="/images/ch21/loss_bce.png" alt="BCE Loss Visualization" />
    <div class="image-caption">Hình 1: BCE Loss cho binary classification - Trục x là prediction, trục y là Loss</div>
  </div>

  <p><strong>Hãy quan sát Hình 1 để hiểu bản chất của BCE:</strong></p>
  <ul>
    <li><strong>Trục hoành (x):</strong> Giá trị dự đoán $\hat{y}$ từ model (từ 0 đến 1)</li>
    <li><strong>Trục tung (y):</strong> Giá trị Loss tương ứng</li>
    <li><strong>Đường màu xanh dương (y=1):</strong> Khi nhãn thực tế là <strong>Positive (1)</strong>: Loss = $-\log(\hat{y})$
      <ul>
        <li>Nếu $\hat{y}=1$ (đoán chắc chắn đúng) → Loss = 0</li>
        <li>Nếu $\hat{y}=0$ (đoán hoàn toàn sai) → Loss = $\infty$ (vô cùng)</li>
      </ul>
    </li>
    <li><strong>Đường màu cam (y=0):</strong> Khi nhãn thực tế là <strong>Negative (0)</strong>: Loss = $-\log(1-\hat{y})$
      <ul>
        <li>Nếu $\hat{y}=0$ (đoán chắc chắn đúng) → Loss = 0</li>
        <li>Nếu $\hat{y}=1$ (đoán hoàn toàn sai) → Loss = $\infty$</li>
      </ul>
    </li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <strong>Nhận xét quan trọng:</strong>
      <p>Cả hai đường cong đều có dạng giảm dần. Model càng tự tin (gần 0 hoặc 1 tùy theo nhãn), Loss càng thấp. <strong>Loss bằng 0 chỉ khi model đoán chính xác 100%.</strong></p>
    </div>
  </div>

  <p><strong>Binary Cross-Entropy (BCE)</strong> dùng cho bài toán phân loại nhị phân (2 lớp). Đây chính là <strong>Negative Log-Likelihood của phân phối Bernoulli</strong>.</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-bold mb-2 text-center">Công thức BCE:</p>
    <p class="font-mono text-lg text-center">$L_{BCE} = -\frac{1}{n} \sum_{i=1}^{n} [y_i \cdot \log(\hat{y}_i) + (1-y_i) \cdot \log(1-\hat{y}_i)]$</p>
    <p class="text-sm text-gray-600 mt-2">Trong đó: $y_i \in \{0, 1\}$ là nhãn thực tế, $\hat{y}_i \in [0, 1]$ là xác suất dự đoán</p>
  </div>

  <h4>Giải thích công thức:</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Trường hợp</th>
        <th>Giá trị y</th>
        <th>Công thức rút gọn</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Label = 1 (Positive)</strong></td>
        <td>y = 1</td>
        <td>$-\log(\hat{y})$</td>
        <td>Muốn $\hat{y}$ càng gần 1 càng tốt</td>
      </tr>
      <tr>
        <td><strong>Label = 0 (Negative)</strong></td>
        <td>y = 0</td>
        <td>$-\log(1-\hat{y})$</td>
        <td>Muốn $\hat{y}$ càng gần 0 càng tốt</td>
      </tr>
    </tbody>
  </table>

  <h4>Đạo hàm của BCE:</h4>

  <div class="formula-block my-4 p-4 bg-red-50 border-red-300">
    <p class="font-bold mb-2 text-center">Đạo hàm theo z (trước sigmoid):</p>
    <p class="font-mono text-lg text-center">$\frac{\partial L_{BCE}}{\partial z} = \hat{y} - y$</p>
    <p class="text-sm text-gray-600 mt-2">Đạo hàm rất đẹp! Đơn giản = (prediction - target)</p>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/loss_bce_derivative.png" alt="BCE Derivative Visualization" />
    <div class="image-caption">Hình 2: Đạo hàm BCE = prediction - target</div>
  </div>

  <p><strong>Phân tích đạo hàm (Hình 2):</strong></p>
  <ul>
    <li><strong>Đường màu xanh:</strong> Đạo hàm khi y=1 (positive). Gradient dương khi $\hat{y} > 1$ → cần giảm prediction. Gradient âm khi $\hat{y} < 1$ → cần tăng prediction.</li>
    <li><strong>Đường màu cam:</strong> Đạo hàm khi y=0 (negative). Ngược lại với trường hợp trên.</li>
    <li><strong>Điểm quan trọng:</strong> Tại $\hat{y}=y$ (đoán đúng), gradient = 0 → Không cập nhật weights!</li>
  </ul>

  <div class="callout callout-warning">
    <div class="callout-icon">⚠</div>
    <div class="callout-content">
      <strong>Vấn đề Vanishing Gradient:</strong>
      <p>Khi $\hat{y}$ gần 0 hoặc 1 (model rất tự tin), đạo hàm rất nhỏ → Gradient gần như bằng 0 → Model học rất chậm. Đây là lý do cần initialization tốt và activation functions phù hợp.</p>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon">✓</div>
      <h4>Ưu điểm</h4>
      <ul>
        <li><strong>Đạo hàm đẹp:</strong> $\hat{y} - y$ cực kỳ đơn giản!</li>
        <li><strong>Xác suất:</strong> Output là [0,1] - có ý nghĩa rõ ràng</li>
        <li><strong>Từ MLE:</strong> Có nền tảng toán học vững chắc</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon">✗</div>
      <h4>Nhược điểm</h4>
      <ul>
        <li><strong>Vanishing gradient:</strong> Khi $\hat{y}$ gần 0 hoặc 1, gradient rất nhỏ</li>
        <li><strong>Imbalanced data:</strong> Như Focal Loss sẽ giải quyết</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 3.3. CATEGORICAL CROSS-ENTROPY (CCE)     -->
  <!-- ========================================= -->
  <h3>3.3. Categorical Cross-Entropy (CCE)</h3>

  <div class="image-showcase">
    <img src="/images/ch21/loss_cross_entropy.png" alt="CCE Loss Visualization" />
    <div class="image-caption">Hình 3: CCE Loss cho multi-class classification - Mỗi đường là một class</div>
  </div>

  <p><strong>Hãy quan sát Hình 3 để hiểu CCE hoạt động như thế nào:</strong></p>
  <ul>
    <li><strong>Trục hoành (x):</strong> Xác suất mà model dự đoán cho class đúng</li>
    <li><strong>Trục tung (y):</strong> Giá trị Loss</li>
    <li><strong>Mỗi đường cong</strong> tương ứng với một class (Class 0, Class 1, Class 2...)</li>
    <li><strong>Tương tự BCE:</strong> Loss = 0 khi $\hat{y}=1$ (model chắc chắn đúng), Loss tăng khi model đoán sai</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <strong>Điểm khác biệt với BCE:</strong>
      <p>Trong CCE, ta không chỉ có 1 prediction mà có N predictions (một cho mỗi class). Tổng của chúng = 1 (nhờ Softmax). Loss chỉ phụ thuộc vào xác suất của class <strong>đúng</strong>.</p>
    </div>
  </div>

  <p><strong>Categorical Cross-Entropy (CCE)</strong> dùng cho bài toán phân loại đa lớp. Kết hợp với <strong>Softmax</strong> để tạo phân phối xác suất.</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-bold mb-2 text-center">Công thức CCE:</p>
    <p class="font-mono text-lg text-center">$L_{CCE} = -\frac{1}{n} \sum_{i=1}^{n} \sum_{c=1}^{C} y_{i,c} \cdot \log(\hat{y}_{i,c})$</p>
    <p class="text-sm text-gray-600 mt-2">Trong đó: C = số lớp, $y_{i,c} \in \{0, 1\}$ (one-hot), $\hat{y}_{i,c}$ là xác suất dự đoán</p>
  </div>

  <h4>Tại sao CCE hiệu quả với One-hot?</h4>

  <div class="callout callout-info">
    <div class="callout-icon"><span class="material-symbols-outlined">lightbulb</span></div>
    <div class="callout-content">
      <strong>Magic của One-hot Encoding:</strong>
      <p>Ví dụ với 3 lớp: Chó(0), Mèo(1), Vịt(2)</p>
      <p>Giả sử label thực là <strong>Mèo</strong>: $y = [0, 1, 0]$</p>
      <p>Model dự đoán: $\hat{y} = [0.1, 0.7, 0.2]$</p>
      <p class="font-mono mt-2">$L = -[0 \cdot \log(0.1) + 1 \cdot \log(0.7) + 0 \cdot \log(0.2)]$</p>
      <p class="font-mono">$L = -\log(0.7) \approx 0.357$</p>
      <p class="mt-2"><strong>Chỉ có term của class đúng được tính!</strong> Các term nhân với 0 đều = 0.</p>
    </div>
  </div>

  <h4>Softmax + CCE:</h4>

  <div class="formula-block my-4 p-4 bg-blue-50 border-blue-300">
    <p class="font-bold mb-2 text-center">Softmax function:</p>
    <p class="font-mono text-lg text-center">$\text{Softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{C} e^{z_j}}$</p>
    <p class="text-sm text-gray-600 mt-2">Biến logits thành phân phối xác suất (tổng = 1)</p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon">✓</div>
      <h4>Ưu điểm</h4>
      <ul>
        <li><strong>Tự nhiên:</strong> Xử lý multi-class một cách tự nhiên</li>
        <li><strong>One-hot:</strong> Chỉ tính loss cho class đúng</li>
        <li><strong>Phổ biến:</strong> Tiêu chuẩn cho mọi bài toán classification</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon">⚠️</div>
      <h4>Lưu ý</h4>
      <ul>
        <li>Cần <strong>Softmax</strong> làm activation layer cuối</li>
        <li>Tránh overflow: trừ max(z) trước khi exp</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 3.4. BCE vs CCE                          -->
  <!-- ========================================= -->
  <h3>3.4. So sánh BCE và CCE</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>BCE</th>
        <th>CCE</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Số lớp</strong></td>
        <td>2 lớp (Binary)</td>
        <td>Nhiều lớp (Multi-class)</td>
      </tr>
      <tr>
        <td><strong>Activation</strong></td>
        <td>Sigmoid</td>
        <td>Softmax</td>
      </tr>
      <tr>
        <td><strong>Công thức</strong></td>
        <td>$-\[y\log\hat{y} + (1-y)\log(1-\hat{y})\]</td>
        <td>$-\sum y_c \log(\hat{y}_c)$</td>
      </tr>
      <tr>
        <td><strong>Output shape</strong></td>
        <td>1 giá trị [0,1]</td>
        <td>N giá trị (tổng = 1)</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 3.5. FOCAL LOSS                         -->
  <!-- ========================================= -->
  <h3>3.5. Focal Loss - Giải quyết Class Imbalance</h3>

  <div class="image-showcase">
    <img src="/images/ch21/loss_focal.png" alt="Focal Loss Visualization" />
    <div class="image-caption">Hình 4: So sánh BCE (đường nét đứt) và Focal Loss (đường liền) với γ=2</div>
  </div>

  <p><strong>Hãy quan sát Hình 4 để hiểu sức mạnh của Focal Loss:</strong></p>
  <ul>
    <li><strong>Đường nét đứt (BCE):</strong> Loss cao ngay cả khi model đã "dễ dàng" đoán đúng (p cao)</li>
    <li><strong>Đường liền (Focal Loss, γ=2):</strong> Loss gần như bằng 0 khi p > 0.5</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-icon">💡</div>
    <div class="callout-content">
      <strong>Ý nghĩa trực quan:</strong>
      <p>Khi model đã "học tốt" một mẫu (p cao → easy example), BCE vẫn "yêu cầu" model tiếp tục học từ mẫu đó. Focal Loss <strong>giảm weight</strong> xuống gần 0, cho phép model <strong>tập trung</strong> vào các mẫu khó (hard examples) mà nó chưa học tốt.</p>
    </div>
  </div>

  <h4>Vấn đề Class Imbalance:</h4>

  <div class="callout callout-warning">
    <div class="callout-icon">⚠</div>
    <div class="callout-content">
      <strong>Ví dụ thực tế: Y tế</strong>
      <p>Giả sử dữ liệu X-quang ung thư:</p>
      <ul>
        <li>100,000 ảnh bình thường (khỏe mạnh)</li>
        <li>100 ảnh có khối u (ung thư)</li>
      </ul>
      <p class="mt-2"><strong>Vấn đề:</strong> Model "lười" có thể đoán tất cả là "khỏe mạnh" → Accuracy = 99.9%! Nhưng thực tế model vô dụng!</p>
    </div>
  </div>

  <p><strong>Focal Loss</strong> được thiết kế bởi <strong>Kaiming He</strong> et al. để giải quyết vấn đề mất cân bằng lớp nghiêm trọng.</p>

  <div class="formula-block my-4 p-4 bg-yellow-50 border-yellow-300">
    <p class="font-bold mb-2 text-center">Công thức Focal Loss:</p>
    <p class="font-mono text-lg text-center">$FL(p_t) = -(1 - p_t)^{\gamma} \log(p_t)$</p>
    <p class="text-sm text-gray-600 mt-2">Trong đó: $p_t$ là xác suất của lớp đúng, $\gamma$ (gamma) là tham số tiêu cự</p>
  </div>

  <h4>Cơ chế hoạt động:</h4>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon">🎯</div>
      <h4>Easy Example (pₜ cao)</h4>
      <p>Ví dụ: AI đoán 99% là ảnh khỏe mạnh</p>
      <p class="font-mono">$(1 - 0.99)^2 = 0.0001$</p>
      <p class="text-green-600"><strong>Loss gần như = 0!</strong></p>
      <p>Model không học gì từ ảnh quá dễ</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon">💪</div>
      <h4>Hard Example (pₜ thấp)</h4>
      <p>Ví du: AI chỉ đoán 10% là ung thư</p>
      <p class="font-mono">$(1 - 0.10)^2 = 0.81$</p>
      <p class="text-red-600"><strong>Loss vẫn lớn!</strong></p>
      <p>Model tập trung học từ ảnh khó</p>
    </div>
  </div>

  <h4>Tham số γ (gamma):</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Gamma</th>
        <th>Hành vi</th>
        <th>Ứng dụng</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>γ = 0</td>
        <td>FL = BCE (không có effect)</td>
        <td>Dữ liệu cân bằng</td>
      </tr>
      <tr>
        <td>γ = 1</td>
        <td>Nhẹ nhàng</td>
        <td>Imbalance nhẹ</td>
      </tr>
      <tr>
        <td>γ = 2</td>
        <td><strong>Phổ biến nhất</strong></td>
        <td>Imbalance nặng ( RetinaNet)</td>
      </tr>
      <tr>
        <td>γ > 2</td>
        <td>Rất mạnh</td>
        <li>Extreme imbalance</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-info">
    <div class="callout-icon"><span class="material-symbols-outlined">auto_awesome</span></div>
    <div class="callout-content">
      <strong>Ứng dụng lịch sử:</strong>
      <p>Focal Loss được giới thiệu trong paper <strong>"Focal Loss for Dense Object Detection" (RetinaNet)</strong> - đã thay đổi hoàn toàn cách chúng ta xử lý Object Detection!</p>
      <p>Trước Focal Loss, các method phải dùng Two-stage detectors (R-CNN) để tránh imbalance. Sau Focal Loss, One-stage detectors (YOLO, SSD) trở nên competitive!</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 3.6. TÓM TẮT                              -->
  <!-- ========================================= -->
  <h3>3.6. Tóm tắt</h3>

  <div class="key-takeaway">
    <div class="key-takeaway-icon">📝</div>
    <div class="key-takeaway-content">
      <h4>Tổng kết Classification Losses:</h4>
      <ol>
        <li><strong>BCE (Binary Cross-Entropy):</strong> Dùng cho 2 lớp, kết hợp Sigmoid. Đạo hàm đẹp = prediction - target.</li>
        <li><strong>CCE (Categorical Cross-Entropy):</strong> Dùng cho nhiều lớp, kết hợp Softmax. Tiêu chuẩn cho Image Classification.</li>
        <li><strong>Focal Loss:</strong> Giải quyết class imbalance bằng cách giảm weight cho "easy examples".</li>
        <li><strong>Quy tắc chọn:</strong> 2 lớp → BCE | Nhiều lớp → CCE | Imbalance nặng → Focal Loss.</li>
      </ol>
    </div>
  </div>
</div>
    `,
    defaultCode: `// MÔ PHỎNG SỰ TRỪNG PHẠT ÁC QUỶ CỦA FOCAL LOSS
// =====================================================

fn bce_pure(p_t: f64) -> f64 {
    -p_t.ln()
}

fn focal_loss(p_t: f64, gamma: f64) -> f64 {
    // Dấu - đứng đầu, Modulating factor = (1-p_t)^gamma
    - (1.0 - p_t).powf(gamma) * p_t.ln()
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║       FOCAL LOSS - NHÀ HOẠT ĐỘNG NHÂN QUYỀN TRÊN BỘ DATA BẤT CÔNG    ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Tấm X-quang cực dễ (Dễ đoán, AI phán 95% Đúng luôn)
    let p_de_ec = 0.95;

    // Tấm X-quang mập mờ, khối u lặn sau màng phổ (Khó đoán, AI lúng túng 10% Đúng)
    let p_sieu_kho = 0.10;

    let gamma = 2.0; // Sức nén Tiêu Cự phổ biến của Kaiming He dâng cho võ lâm AI

    println!("\n[BCE Cổ Điển] Học mọi thứ cào bằng:");
    println!("- Ảnh Dễ (p=0.95) tạo Loss: {:.4}", bce_pure(p_de_ec));
    println!("- Ảnh Khó (p=0.10) tạo Loss: {:.4}", bce_pure(p_sieu_kho));
    println!("-> Tỉ lệ độ ưu tiên (Khó/Dễ): Gấp ~{} lần.", (bce_pure(p_sieu_kho)/bce_pure(p_de_ec)).round());
    println!("-> Hàng TRIỆU ảnh dễ nhạt toẹt sẽ lấn át, đè bẹp xô đổ hoàn toàn mảng Gradient của vài tấm ảnh Ung Thư hiểm.");

    println!("\n[Focal Loss] Người Loe Tắt Kẻ Mạnh, Bơm Cho Kẻ Yếu:");
    let f_loss_de = focal_loss(p_de_ec, gamma);
    let f_loss_kho = focal_loss(p_sieu_kho, gamma);
    println!("- Ảnh Dễ tạo Loss: {:.6} (Bị Bóp vụn triệt tiêu!)", f_loss_de); // 0.0001
    println!("- Ảnh Khó tạo Loss: {:.4} (Được giữ nguyên uy lực!)", f_loss_kho);
    println!("-> Tỉ lệ TẬP TRUNG CHUYÊN MÔN (Khó/Dễ): Gấp ~{} lần!!!", (f_loss_kho/f_loss_de).round());
    println!("\n>>> VỚI FOCAL LOSS, Mạng Nơ-ron vứt sạch râu ria thừa dồn tài nguyên bắt các khuyết tật ẩn tàng. Giải xong bài Imbalance rúng động toàn cầu!");
}`
  }
];

export const ch21_04: Chapter = {
  id: 'ch21_04',
  title: '21.4. Loss Functions',
  introduction: `
    <h2>Hàm Mất Mát</h2>
    <ul>
      <li>Hiểu nền tảng thống kê của AI: Maximum Likelihood Estimation và NLL.</li>
      <li>Regression: MSE, MAE, Huber Loss - khi nào sử dụng loại nào?</li>
      <li>Classification: BCE, CCE, Focal Loss - xử lý các bài toán phân loại.</li>
    </ul>
  `,
  lessons: ch21_04_lessons,
};

export default ch21_04;
