import { Lesson, Chapter } from '../../courses';

const ch23_06_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: LOSS FUNCTION & LABEL SMOOTHING
  // ==========================================================
  {
    id: 'ch23_06_01',
    title: '1. Loss Function & Label Smoothing',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Hàm Loss và Label Smoothing</h2>

  <p>Để huấn luyện Transformer, ta sử dụng hàm mất mát <strong>Cross-Entropy Loss</strong> truyền thống, tuy nhiên tác giả paper gốc áp dụng thêm một kỹ thuật gọi là <strong>Label Smoothing</strong> để giúp mô hình không quá "tự tin" vào dự đoán của mình.</p>

  <h3>1.1. Cross-Entropy Loss</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Cross-Entropy Loss cơ bản</span>
    <p>Loss tiêu chuẩn đo lường sự chênh lệch giữa phân phối dự đoán (softmax probabilities) và phân phối thực tế (ground truth - one-hot vector).</p>
    <p class="font-mono text-center my-3">$L_{CE} = - \\sum_{i=1}^{V} y_i \\log(p_i)$</p>
    <p>Trong đó: $V$ là kích thước từ vựng (vocab size), $y_i$ là nhãn thực tế (1 cho từ đúng, 0 cho từ sai) và $p_i$ là xác suất mô hình dự đoán từ thứ $i$.</p>
  </div>

  <h3>1.2. Label Smoothing</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Vấn đề của Label cứng (Hard Labels)</span>
      <p>Khi sử dụng nhãn one-hot (ví dụ: $[0, 0, 1, 0]$), mô hình bị ép phải đẩy xác suất của từ đúng lên càng sát $1.0$ càng tốt, và các từ khác xuống $0.0$. Điều này dẫn đến:</p>
      <ul class="list-disc pl-6 mt-2">
        <li><strong>Overfitting:</strong> Mô hình học thuộc lòng tập train.</li>
        <li><strong>Thất thoát gradient:</strong> Khi xác suất tiến quá gần 1, gradient trở nên rất nhỏ, khó tiếp tục học.</li>
      </ul>
    </div>
  </div>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Công thức Label Smoothing</h4>
    <p>Ta thay thế nhãn cứng $y_i$ bằng một nhãn "mềm" $y_i'$:</p>
    <p class="font-mono text-lg text-center my-3">$y_i' = (1 - \\epsilon) y_i + \\frac{\\epsilon}{V}$</p>
    <p>Thay vì hội tụ về Cross-Entropy truyền thống, hàm Loss mới được viết thành:</p>
    <p class="font-mono text-lg text-center my-3">$L = - \\sum_{i=1}^{V} y_i' \\log(p_i)$</p>
    <p class="mt-2">Trong paper gốc, <strong>$\\epsilon = 0.1$</strong>. Ý nghĩa:</p>
    <ul class="list-disc pl-6 mt-1">
      <li>Từ đúng không còn được gắn nhãn $1.0$ mà chỉ là $0.9 + \\frac{0.1}{V}$</li>
      <li>Tất cả các từ sai không bị ép về $0.0$ mà được "chia đều" một lượng xác suất nhỏ $\\frac{0.1}{V}$</li>
    </ul>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Kết quả đạt được</span>
      <p>Việc này làm giảm perplexity trên tập train, vì model khó dự đoán chắc chắn 100%, nhưng lại <strong>cải thiện accuracy và BLEU score đáng kể trên tập test</strong> nhờ tính generalized (tổng quát hóa) cao hơn.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: OPTIMIZER (ADAM)
  // ==========================================================
  {
    id: 'ch23_06_02',
    title: '2. Optimizer: Adam với siêu tham số tùy chỉnh',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Optimizer: Trình tối ưu hóa Adam</h2>

  <p>Transformer không dùng SGD hay RMSprop. Lựa chọn mặc định và hiệu quả nhất là <strong>Adam Optimizer</strong>, kết hợp được ưu điểm của việc tính trung bình động của Gradient (Momentum) và bình phương Gradient (RMSprop).</p>

  <h3>2.1. Thiết lập tham số (Hyperparameters)</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Tham số đặc biệt cho Transformer</span>
    <p>Paper gốc sử dụng các tham số $\\beta_1, \\beta_2$ hơi khác biệt một chút so với mặc định của Adam trong các thư viện (ví dụ PyTorch mặc định $\\beta_1=0.9, \\beta_2=0.999$).</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tham số</th>
        <th>Giá trị trong Paper</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$\\beta_1$</td>
        <td><strong>0.9</strong></td>
        <td>Độ phân rã trung bình động bậc 1 (Momentum - quá khứ gần)</td>
      </tr>
      <tr>
        <td>$\\beta_2$</td>
        <td><strong>0.98</strong></td>
        <td>Độ phân rã trung bình động bậc 2. <br/>Dùng 0.98 thay vì 0.999 giúp mô hình phản ứng nhạy hơn với những biến động cục bộ của gradient.</td>
      </tr>
      <tr>
        <td>$\\epsilon$</td>
        <td><strong>$10^{-9}$</strong></td>
        <td>Hằng số nhỏ thêm vào thân mẫu để tránh chia cho 0.</td>
      </tr>
    </tbody>
  </table>

  <h3>2.2. Tại sao lại là Adam?</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Momentum (Từ $\\beta_1$)</h4>
      <p>Giúp mạng đi qua các điểm saddle point (yên ngựa) hoặc shallow local minima bằng cách duy trì gia tốc quán tính theo các bước hội tụ trước đó.</p>
    </div>
    <div class="concept-card">
      <h4>Adaptive Learning Rate (Từ $\\beta_2$)</h4>
      <p>Tự động điều chỉnh tỷ lệ học cho từng tham số (weight/bias) riêng biệt. Tham số nào ít được cập nhật thì learning rate sẽ lớn để hội tụ nhanh hơn, ngược lại sẽ bị kìm giảm.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: LEARNING RATE SCHEDULE
  // ==========================================================
  {
    id: 'ch23_06_03',
    title: '3. Learning Rate Warmup & Decay',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Chiến lược Learning Rate (Noam Scheme)</h2>

  <p>Đây là một trong những <strong>BÍ QUYẾT CỐT LÕI</strong> giúp Transformer thành công! Thay vì giữ learning rate cố định hoặc giảm dần đều đặn ngay từ đầu, tác giả áp dụng một thủ thuật kết hợp <strong>Warm-up (làm nóng)</strong> và <strong>Decay (phân rã)</strong>.</p>

  <h3>3.1. Công thức Lịch trình Learning Rate</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Noam Learning Rate Schedule:</h4>
    <p class="font-mono text-center my-3 text-lg">$lr = d_{model}^{-0.5} \\cdot \\min\\Big(\\text{step\\_num}^{-0.5},\\; \\text{step\\_num} \\cdot \\text{warmup\\_steps}^{-1.5}\\Big)$</p>
    <ul class="list-disc pl-6 mt-2">
      <li>$\\text{step\\_num}$: Số step đang huấn luyện</li>
      <li>$d_{model}$: Kích thước embedding vector (ví dụ 512). Giúp tự động scale $lr$ phù hợp độ lớn model.</li>
      <li>$\\text{warmup\\_steps}$: Số step làm nóng (ví dụ $4000$).</li>
    </ul>
  </div>

  <h3>3.2. Hình ảnh trực quan</h3>

  <div class="image-showcase">
    <img src="/images/ch23/lr_warmup_schedule.png" alt="Learning Rate Warmup Schedule" />
    <div class="image-caption">Hình 1: Đồ thị thể hiện LR vs Train Steps với $\\text{warmup\\_steps}=4000$</div>
  </div>

  <h3>3.3. Cơ chế hoạt động</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">2 Giai đoạn chính:</span>
    <ol class="list-decimal pl-6 mt-2 space-y-2">
      <li><strong>Giai đoạn Tăng dần (Linear Warmup):</strong> Khi $\\text{step\\_num} < \\text{warmup\\_steps}$.<br/>Biểu thức $\\min()$ sẽ chọn $\\text{step\\_num} \\cdot \\text{warmup\\_steps}^{-1.5}$. Điều này có nghĩa là mức $lr$ tăng thốc tuyến tính từ $0$ tới đỉnh. Giúp các tham số khởi tạo rác (random) không phá vỡ liên kết ngay lần đầu học.</li>
      <li><strong>Giai đoạn Giảm Dần (Inverse Square Root Decay):</strong> Khi $\\text{step\\_num} \\geq \\text{warmup\\_steps}$.<br/>Biểu thức $\\min()$ chuyển sang chọn $\\text{step\\_num}^{-0.5}$. Khi đó $lr$ sẽ rơi theo rễ vuông nghịch đảo, giảm từ từ. Điều này hữu ích để model hội tụ nhuyễn tại cuối quá trình.</li>
    </ol>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Tại sao cần Warmup cho Transformer?</span>
      <p>Transformer không có Batch Normalization hay RNN state để làm mịn flow gradient qua nhiều lớp. Ở vòng lặp đầu tiên, attention sẽ gần như chia đều (uniform) do weight random. Viết gradient bùng nổ (exploding gradient) rất dễ xảy ra. Việc dùng $lr$ sát vạch 0 lúc ban đầu giúp model học "từng chút một" quỹ đạo an toàn trước khi chạy tăng tốc cực đại!</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: REGULARIZATION (DROPOUT)
  // ==========================================================
  {
    id: 'ch23_06_04',
    title: '4. Chống Overfitting bằng Dropout',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Bổ sung Dropout cho Regularization</h2>

  <p>Với lượng tham số khổng lồ (65 triệu tham số cho Base và 213 triệu cho Big model), hiện tượng Overfit là khó tránh khỏi. Do đó Dropout được đặt "dày đặc" trong cấu trúc tổng thể.</p>

  <h3>4.1. Thông số Dropout 10%</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p>Toàn bộ các lớp Dropout trong Base Transformer đều được gán chung một hệ số: <strong>$P_{drop} = 0.1$</strong> (tức là 10% neuron ngẫu nhiên sẽ bị tắt ở mỗi forward pass).</p>
  </div>

  <h3>4.2. Vị trí đặt Dropout</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>1. Sau Attention Weights</h4>
      <p>$\\text{softmax}(QK^T / \\sqrt{d_k})$. Trước khi nhân với ma trận Value $V$, ma trận xác suất Attention này được drop 10%. Ép model không tập trung quá mức chỉ vào 1 vài specific token nổi bật.</p>
    </div>
    <div class="concept-card">
      <h4>2. Output của Sub-Layers</h4>
      <p>Sau mỗi Sub-Layer (Self-Attention, Cross-Attention, FFN) và TRƯỚC khi cộng Add (Residual Connection). Tức là $\\text{LayerNorm}(x + \\text{Dropout}(\\text{SubLayer}(x)))$.</p>
    </div>
    <div class="concept-card">
      <h4>3. Embedding & Positional Encoding</h4>
      <p>Ngay ở bước Input: Sau khi lấy Token Embedding cộng thẳng với Positional Encoding, vector tổng hợp này bị qua Dropout trước khi đẩy lên tầng Layer 1 đầu tiên.</p>
    </div>
  </div>

  <hr />

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 23.6 — Cơ chế Huấn luyện</h3>
    <ul>
      <li><strong>Label Smoothing ($0.1$):</strong> Giảm tự mãn, tăng tính khái quát, label cứng giảm thành soft prob.</li>
      <li><strong>Optimizer Adam:</strong> Tùy biến $\\beta_1 = 0.9, \\beta_2 = 0.98$ giữ cân bằng quán tính cực tốt.</li>
      <li><strong>LR Warmup & Decay:</strong> Noam Scheme tăng $lr$ tuyến tính ở $4000$ bước đầu tiên giúp thoát vũng lầy khởi tạo rỗng, sau đó giảm để đi vào quỹ đạo tụ.</li>
      <li><strong>Dropout $0.1$:</strong> Chèn trước Residual add, sau Attention và Input Embeddings.</li>
    </ul>
  </div>
</div>
    `,
    defaultCode: ''
  }
];

const ch23_06: Chapter = {
  id: 'ch23_06',
  title: '23.6. Training Transformer',
  introduction: 'Tìm hiểu cách Paper gốc đã huấn luyện mạng Transformer với hàm kích Loss mịn (Label Smoothing), Optimizer bẻ lái Adam, cách múa Learning Rate Warmup, và Dropout giảm Overfit.',
  lessons: ch23_06_lessons,
};

export default ch23_06;
