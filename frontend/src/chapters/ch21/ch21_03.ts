// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 3: ACTIVATION FUNCTIONS - TẾ BÀO LINH HỒN CỦA AI
//
// Mục 1: BẢN CHẤT TOÁN HỌC CỦA SỰ PHI TUYẾN TÍNH
// Phiên bản mở rộng chi tiết - VERBOSE VERSION
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_03_lessons: Lesson[] = [
  {
    id: 'ch21_03_01',
    title: '1. Bản chất Toán học của Sự Phi Tuyến Tính',
    duration: '30 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">network_ping</span> 1. Bản chất Toán học của Sự Phi Tuyến Tính (Non-linearity)</h2>

  <p>Đây là bài học <strong>CỐT LÕI NHẤT</strong> để hiểu tại sao Neural Network hoạt động. Nếu bạn chỉ hiểu một điều duy nhất về Deep Learning, hãy hiểu kỹ bài này!</p>

  <!-- ========================================= -->
  <!-- 1.1. TẠI SAO KHÔNG THỂ DÙNG HÀM TUYẾN TÍNH? -->
  <!-- ========================================= -->
  <h3>1.1. Tại sao không thể dùng hàm Tuyến Tính (Linear)?</h3>

  <div class="definition-block mb-4">
    <p class="font-semibold text-lg mb-3">Định nghĩa cơ bản:</p>
    <p>Thuật toán cốt lõi của mỗi Nơ-ron là phép tính:</p>
    <div class="formula-block my-4 p-4 bg-blue-50 text-center">
      <p class="text-xl font-mono">$Z = X \\cdot W + b$</p>
    </div>
    <p>Đây là một <strong>phương trình tuyến tính</strong> (Linear) thuần túy:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>Trong 2D: là đường thẳng</li>
      <li>Trong 3D: là mặt phẳng</li>
      <li>Trong không gian nhiều chiều: là <strong>siêu phẳng (Hyperplane)</strong></li>
    </ul>
  </div>

  <div class="callout callout-important">
    <div class="callout-icon"><span class="material-symbols-outlined">help</span></div>
    <div class="callout-content">
      <span class="callout-title">Câu hỏi triệu đô:</span>
      <p>"Điều gì xảy ra nếu ta chồng 100 lớp ẩn (Hidden Layers) lên nhau nhưng <strong>KHÔNG dùng hàm Activation nào</strong> (hoặc dùng hàm identity $f(x) = x$)?"</p>
    </div>
  </div>

  <h4>1.1.1. Chứng minh bằng Toán học: Linear Collapse</h4>

  <div class="image-showcase">
    <img src="/images/ch21/linear_collapse_diagram.png" alt="Linear Collapse - Multiple Layers Equivalent to One" />
    <div class="image-caption">Hình 0: Linear Collapse - Nhiều lớp Linear chỉ như một lớp</div>
  </div>

  <p>Giả sử ta có mạng Neural với 3 lớp, mỗi lớp chỉ thực hiện phép nhân ma trận cộng bias (không có activation):</p>

  <div class="formula-block my-6 p-5 bg-red-50 border-l-4 border-red-500">
    <p class="font-bold text-red-800 mb-3">⚠️ HIỆN TƯỢNG LINEAR COLLAPSE - MẠNG SỤP ĐỔ VỀ TUYẾN TÍNH!</p>
    <div class="space-y-3 font-mono text-sm">
      <div class="bg-white p-3 rounded">
        <p class="text-blue-600 font-bold">Lớp 1 (Hidden Layer 1):</p>
        <p>$H_1 = X \\cdot W_1 + b_1$</p>
      </div>
      <div class="bg-white p-3 rounded">
        <p class="text-blue-600 font-bold">Lớp 2 (Hidden Layer 2):</p>
        <p>$H_2 = H_1 \\cdot W_2 + b_2$</p>
        <p class="text-gray-500 mt-1">$= (X \\cdot W_1 + b_1) \\cdot W_2 + b_2$</p>
        <p class="text-gray-500">$= X \\cdot (W_1 \\cdot W_2) + (b_1 \\cdot W_2 + b_2)$</p>
      </div>
      <div class="bg-white p-3 rounded">
        <p class="text-blue-600 font-bold">Lớp 3 (Hidden Layer 3):</p>
        <p>$H_3 = H_2 \\cdot W_3 + b_3$</p>
        <p class="text-gray-500 mt-1">$= X \\cdot (W_1 \\cdot W_2 \\cdot W_3) + ...$</p>
      </div>
      <div class="bg-yellow-100 p-3 rounded border border-yellow-400">
        <p class="text-yellow-800 font-bold">RÚT GỌN TỔNG QUÁT:</p>
        <p>$H_n = X \\cdot W_{gop} + b_{gop}$</p>
        <p class="mt-2">Trong đó: $W_{gop} = W_1 \\cdot W_2 \\cdot ... \\cdot W_n$</p>
      </div>
    </div>
  </div>

  <div class="definition-block mb-4">
    <span class="definition-term">Định lý: Tính chất kết hợp của phép nhân ma trận</span>
    <p>Do tính chất kết hợp (Associative Property):</p>
    <p class="font-mono text-center my-2">$(A \\cdot B) \\cdot C = A \\cdot (B \\cdot C)$</p>
    <p>Nên vô vàn các ma trận W nhân nhau cũng chỉ tự triệt tiêu, gộp chung lại thành <strong>ĐÚNG MỘT Ma trận $W_{gop}$ duy nhất</strong>.</p>
    <p class="mt-3">Nghĩa là mạng 100 lớp của bạn <strong>vô dụng không khác gì mạng 1 lớp</strong>. Nó quay về mốc ban đầu: chỉ vẽ được 1 đường thẳng, vĩnh viễn không thể giải quyết bài toán XOR!</p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">warning</span></div>
    <div class="callout-content">
      <span class="callout-title">HẬU QUẢ NGHIÊM TRỌNG!</span>
      <p class="font-bold text-lg">Mạng 100 lớp của bạn <span class="text-red-600">VÔ DỤNG</span>, không khác gì mạng 1 lớp!</p>
      <p class="mt-2">Nó quay về mốc ban đầu: <strong>Vẽ 1 đường thẳng duy nhất</strong>, vĩnh viễn không thể giải quyết các bài toán phức tạp.</p>
    </div>
  </div>

  <h4>1.1.2. Trực quan hóa: Tại sao đường thẳng không đủ?</h4>

  <div class="image-showcase">
    <img src="/images/ch21/linear_vs_nonlinear_boundaries.png" alt="Linear vs Non-Linear Decision Boundaries" />
    <div class="image-caption">Hình 1: So sánh ranh giới quyết định tuyến tính và phi tuyến tính</div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">show_chart</span></div>
      <h4>ĐƯỜNG THẲNG (Linear)</h4>
      <ul class="list-disc pl-4">
        <li>Chỉ chia không gian thành 2 nửa</li>
        <li>Không thể phân tách XOR</li>
        <li>Không thể vẽ đường cong</li>
        <li>Chỉ giải được linearly separable problems</li>
      </ul>
      <div class="mt-3 p-2 bg-red-50 rounded">
        <p class="text-red-800 font-bold">Ví dụ thất bại:</p>
        <p class="font-mono">●(0,0), ●(1,1) = Lớp A</p>
        <p class="font-mono">●(0,1), ●(1,0) = Lớp B</p>
        <p class="text-red-600 text-sm mt-1">→ Không thể tách bằng 1 đường thẳng!</p>
      </div>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">area_chart</span></div>
      <h4>ĐƯỜNG CONG (Non-Linear)</h4>
      <ul class="list-disc pl-4">
        <li>Có thể uốn cong tùy ý</li>
        <li>Phân tách không gian phức tạp</li>
        <li>Giải quyết mọi pattern</li>
        <li>Universal Approximation</li>
      </ul>
      <div class="mt-3 p-2 bg-green-50 rounded">
        <p class="text-green-800 font-bold">Ví dụ thành công:</p>
        <p class="font-mono">●(0,0), ●(1,1) = Lớp A</p>
        <p class="font-mono">●(0,1), ●(1,0) = Lớp B</p>
        <p class="text-green-600 text-sm mt-1">✓ Với đường cong chữ S!</p>
      </div>
    </div>
  </div>

  <h4>1.1.3. Bảng tóm tắt: Những gì Linear KHÔNG THỂ làm</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Bài toán</th>
        <th>Linear có thể?</th>
        <th>Lý do</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>XOR Pattern</td>
        <td class="text-red-600 font-bold">KHÔNG</td>
        <td>Không linearly separable</td>
      </tr>
      <tr>
        <td>Circle/Ellipse</td>
        <td class="text-red-600 font-bold">KHÔNG</td>
        <td>Cần đường cong</td>
      </tr>
      <tr>
        <td>Complex shapes</td>
        <td class="text-red-600 font-bold">KHÔNG</td>
        <td>Chỉ vẽ đường thẳng</td>
      </tr>
      <tr>
        <td>Image recognition</td>
        <td class="text-red-600 font-bold">KHÔNG</td>
        <td>Quá phức tạp</td>
      </tr>
      <tr>
        <td>Language understanding</td>
        <td class="text-red-600 font-bold">KHÔNG</td>
        <td>Patterns không tuyến tính</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 1.2. CÔNG DỤNG CỨU RỖI CỦA ACTIVATION FUNCTION -->
  <!-- ========================================= -->
  <h3>1.2. Công dụng cứu rỗi của Activation Function</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa: Activation Function (Hàm kích hoạt)</span>
    <p>Là một <strong>hàm phi tuyến tính</strong> được áp dụng sau mỗi neuron. Nó "bẻ cong" không gian tuyến tính — biến đường thẳng thành đường cong, cho phép mạng mô hình hóa các quan hệ phức tạp.</p>
    <p class="mt-2">Nó tạo ra <strong>quỹ tích cong</strong> (curved manifold) trong không gian latent, cho phép mạng học được các pattern phức tạp.</p>
  </div>

  <h4>1.2.1. Sơ đồ kiến trúc Neural Network với Activation</h4>

  <div class="image-showcase">
    <img src="/images/ch21/neural_network_with_activation.png" alt="Neural Network Architecture with Activation Functions" />
    <div class="image-caption">Hình 2: Sơ đồ Neural Network với Activation Functions</div>
  </div>

  <div class="formula-block my-6 p-5 bg-green-50 border-l-4 border-green-500">
    <p class="font-bold text-green-800 mb-3">Công thức Forward Pass với Activation:</p>
    <div class="space-y-2 font-mono text-sm">
      <p>$Z_1 = X \\cdot W_1 + b_1$</p>
      <p>$A_1 = f(Z_1)$ ← <span class="text-green-600 font-bold">ÁP DỤNG ACTIVATION!</span></p>
      <p class="mt-2">$Z_2 = A_1 \\cdot W_2 + b_2$</p>
      <p>$A_2 = f(Z_2)$ ← <span class="text-green-600 font-bold">ÁP DỤNG ACTIVATION!</span></p>
      <p class="mt-2">...</p>
      <p>$Output = A_n = f(Z_n)$</p>
    </div>
  </div>

  <h4>1.2.2. Ba công dụng chính của Activation Function</h4>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">change_history</span></div>
      <h4>Công dụng 1: XOR Problem</h4>
      <p>Chính sự <strong>bẻ gãy</strong> (khuỷu tay của ReLU) hay <strong>uốn lượn</strong> (đường lượn sóng chữ S của Sigmoid) ép không gian Vector cuộn tròn hình vòng cung.</p>
      <p class="mt-2">Nhờ đó đường ranh giới cắt qua XOR (Non-linearly separable) mới được khắc họa.</p>
      <div class="mt-3 p-2 bg-blue-50 rounded">
        <p class="font-bold">Không có Activation:</p>
        <p>Tất cả điểm nằm cùng 1 phía của đường thẳng</p>
        <p class="font-bold mt-2">Có Activation:</p>
        <p>Đường cong uốn theo hình chữ S, tách được 4 điểm XOR</p>
      </div>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">gate</span></div>
      <h4>Công dụng 2: Gate (Cổng)</h4>
      <p>Tương tự như Neuron thần kinh sinh học: Nó quyết định <em>"Liệu tín hiệu này đủ mạnh để truyền sang Neuron kế tiếp hay bị triệt tiêu?"</em></p>
      <p class="mt-2">Nó hoạt động như một <strong>cổng (gate)</strong> — chỉ những tín hiệu đủ điều kiện mới được truyền qua.</p>
      <div class="mt-3 p-2 bg-yellow-50 rounded">
        <p class="font-bold">Đây là tính kích hoạt (firing):</p>
        <ul class="list-disc pl-4">
          <li>ReLU: nếu x > 0 thì cho qua (fire)</li>
          <li>Sigmoid: x càng lớn, xác suất fire càng cao</li>
          <li>Threshold: chỉ fire khi vượt ngưỡng</li>
        </ul>
      </div>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">sync</span></div>
      <h4>Công dụng 3: Gradient Flow</h4>
      <p>Quan trọng không kém: Hàm Activation quyết định <strong>luồng gradient</strong> chảy ngược (Backpropagation).</p>
      <div class="mt-3 p-2 bg-red-50 rounded">
        <p class="font-bold text-red-800">Sigmoid:</p>
        <p>"bóp nghẹt" gradient về 0 → Vanishing Gradient</p>
      </div>
      <div class="mt-2 p-2 bg-green-50 rounded">
        <p class="font-bold text-green-800">ReLU:</p>
        <p>"thông thoáng" hơn nhưng "chết" (Dead Neuron) khi input âm</p>
      </div>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.3. CÁC LOẠI ACTIVATION PHỔ BIẾN -->
  <!-- ========================================= -->
  <h3>1.3. Các loại Activation Function phổ biến</h3>

  <div class="image-showcase">
    <img src="/images/ch21/activation_functions_comparison.png" alt="Comparison of Activation Functions" />
    <div class="image-caption">Hình 3: So sánh các hàm Activation phổ biến</div>
  </div>

  <div class="features-grid">
    <div class="feature-card">
      <h4 class="font-bold">ReLU</h4>
      <p class="font-mono text-sm">$f(x) = \\max(0, x)$</p>
      <p class="text-xs mt-2">Đơn giản, nhanh, hiệu quả. Tạo "khuỷu tay" trong không gian.</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold">Sigmoid</h4>
      <p class="font-mono text-sm">$f(x) = \\frac{1}{1 + e^{-x}}$</p>
      <p class="text-xs mt-2">Đường cong chữ S. Output trong (0,1). Dùng cho binary classification.</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold">Tanh</h4>
      <p class="font-mono text-sm">$f(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}$</p>
      <p class="text-xs mt-2">Giống Sigmoid nhưng output trong (-1,1). Centered hơn.</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold">Softmax</h4>
      <p class="font-mono text-sm">$\\sigma(x)_i = \\frac{e^{x_i}}{\\sum_j e^{x_j}}$</p>
      <p class="text-xs mt-2">Chuyển vector thành phân phối xác suất. Dùng ở output layer.</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.4. VÍ DỤ THỰC TẾ: XOR VỚI VÀ KHÔNG CÓ ACTIVATION -->
  <!-- ========================================= -->
  <h3>1.4. Ví dụ thực tế: Bài toán XOR</h3>

  <div class="image-showcase">
    <img src="/images/ch21/xor_problem.png" alt="XOR Problem - Linear vs Non-Linear Separation" />
    <div class="image-caption">Hình 4: Bài toán XOR - Không thể tách bằng đường thẳng</div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-icon"><span class="material-symbols-outlined">history_edu</span></div>
    <div class="callout-content">
      <span class="callout-title">Bài toán XOR - Thử thách lịch sử của AI</span>
      <p>Năm 1969, Minsky và Papert chứng minh Perceptron (Linear) <strong>KHÔNG THỂ</strong> giải quyết bài toán XOR. Đây là một trong những lý do dẫn đến "AI Winter" đầu tiên!</p>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">table_chart</span></div>
      <h4>Bài toán XOR:</h4>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b">
            <th class="p-2">Input A</th>
            <th class="p-2">Input B</th>
            <th class="p-2">Output A XOR B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-2 text-center">0</td>
            <td class="p-2 text-center">0</td>
            <td class="p-2 text-center font-bold">0</td>
          </tr>
          <tr>
            <td class="p-2 text-center">0</td>
            <td class="p-2 text-center">1</td>
            <td class="p-2 text-center font-bold">1</td>
          </tr>
          <tr>
            <td class="p-2 text-center">1</td>
            <td class="p-2 text-center">0</td>
            <td class="p-2 text-center font-bold">1</td>
          </tr>
          <tr>
            <td class="p-2 text-center">1</td>
            <td class="p-2 text-center">1</td>
            <td class="p-2 text-center font-bold">0</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">block</span></div>
      <h4>Tại sao Linear thất bại?</h4>
      <div class="bg-red-50 p-3 rounded">
        <p>Không thể vẽ 1 đường thẳng mà:</p>
        <p class="mt-2">● (0,0) và (1,1) ở một bên</p>
        <p>● (0,1) và (1,0) ở bên còn lại</p>
      </div>
      <div class="bg-green-50 p-3 rounded mt-2">
        <p>Cần Activation!</p>
        <p class="mt-2">Với ReLU hoặc Sigmoid, đường cong có thể uốn tách 4 điểm này.</p>
      </div>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.5. UNIVERSAL APPROXIMATION THEOREM -->
  <!-- ========================================= -->
  <h3>1.5. Định lý Universal Approximation</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định lý Universal Approximation (1989 - Cybenko)</span>
    <p>Một mạng Neural Feedforward với:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>1 lớp Input</li>
      <li>1 lớp ẩn (Hidden Layer) với số lượng neuron hữu hạn</li>
      <li>1 hàm Activation phi tuyến tính (không phải đa thức)</li>
      <li>1 lớp Output</li>
    </ul>
    <p class="mt-3">Có thể xấp xỉ <strong>bất kỳ</strong> hàm số liên tục nào trên một compact set với độ chính xác tùy ý!</p>
  </div>

  <div class="callout callout-important">
    <div class="callout-icon"><span class="material-symbols-outlined">lightbulb</span></div>
    <div class="callout-content">
      <span class="callout-title">Ý nghĩa của Định lý:</span>
      <p>Về mặt lý thuyết, chỉ cần <strong>1 hidden layer</strong> với đủ neuron và 1 activation function phi tuyến, mạng Neural có thể học <strong>bất kỳ</strong> pattern nào!</p>
      <p class="mt-2">Tuy nhiên, trong thực tế, mạng sâu (nhiều hidden layers) học hiệu quả hơn vì:</p>
      <ul class="list-disc pl-6 mt-2">
        <li>Cần ít neuron hơn</li>
        <li>Học được features ở nhiều mức trừu tượng</li>
        <li>Tối ưu hóa tốt hơn với gradient descent</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.6. SO SÁNH WEIGHT VÀ BIAS TRONG LINEAR VS NON-LINEAR -->
  <!-- ========================================= -->
  <h3>1.6. Vai trò của Weights và Bias trong Linear vs Non-Linear</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">tune</span></div>
      <h4>Weights (Trọng số)</h4>
      <p>Quyết định <strong>hướng</strong> và <strong>độ dốc</strong> của đường thẳng:</p>
      <ul class="list-disc pl-4 mt-2">
        <li>Weight lớn → đường dốc</li>
        <li>Weight nhỏ → đường thoải</li>
        <li>Weight âm → đường đi xuống</li>
      </ul>
      <p class="mt-2">Trong Linear: chỉ xoay/translate đường thẳng.</p>
      <p>Trong Non-Linear: kết hợp với activation để tạo đường cong!</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">shift</span></div>
      <h4>Bias (Độ lệch)</h4>
      <p>Quyết định <strong>vị trí</strong> của đường thẳng:</p>
      <ul class="list-disc pl-4 mt-2">
        <li>Bias dương → đẩy đường sang trái/lên</li>
        <li>Bias âm → đẩy đường sang phải/xuống</li>
      </ul>
      <p class="mt-2">Cho phép đường thẳng dịch chuyển mà không thay đổi độ dốc.</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-icon"><span class="material-symbols-outlined">info</span></div>
    <div class="callout-content">
      <span class="callout-title">Tóm lại:</span>
      <p><strong>Linear:</strong> Weights + Bias chỉ có thể vẽ đường thẳng. Dù có bao nhiêu layer đi nữa!</p>
      <p><strong>Non-Linear:</strong> Thêm Activation = "bẻ gãy" không gian → vẽ được đường cong bất kỳ!</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.7. TÓM TẮT VÀ KEY TAKEAWAY -->
  <!-- ========================================= -->
  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">school</span></div>
    <h3>Key Takeaway - Tóm tắt bài học</h3>
    <ol class="list-decimal pl-6 space-y-2">
      <li><strong>Linear = Đường thẳng:</strong> Chỉ vẽ được đường thẳng, không thể giải quyết 99% bài toán thú vị.</li>
      <li><strong>Linear Collapse:</strong> Không có activation, mạng 100 lớp = 1 lớp. Phí công sức!</li>
      <li><strong>Activation Function:</strong> Thêm "độ cong" vào mạng, cho phép học patterns phức tạp.</li>
      <li><strong>3 công dụng:</strong> Giải XOR + Gate + Gradient Flow.</li>
      <li><strong>Universal Approximation:</strong> Chỉ cần 1 layer + non-linear activation = học được mọi thứ!</li>
    </ol>
    <p class="mt-4 font-bold text-lg">KHÔNG CÓ NON-LINEARITY = chỉ là phép tính tuyến tính đơn giản. CÓ NON-LINEARITY = sức mạnh xấp xỉ mọi hàm số!</p>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// Hệ quả Toán học: Mạng Sâu + Không bẻ lượn = Nông cạn.
// Phép chứng minh bằng Rust: Giả lập 2 Layer không có Phi tuyến tính.
// =====================================================

// --- Mạng chỉ có Linear transformation (KHÔNG có activation) ---
// Điều này minh họa tại sao mạng nhiều lớp không có activation
// chẳng khác gì mạng 1 lớp!
fn linear_stacked_layers(
    x: &Array2<f64>,
    weights: &[Array2<f64>],
    biases: &[Array2<f64>]
) -> Array2<f64> {
    assert_eq!(weights.len(), biases.len());

    let mut h = x.clone();
    for (w, b) in weights.iter().zip(biases.iter()) {
        // Z = X · W + b (chỉ là linear transformation)
        h = h.dot(w) + b;
    }
    h
}

// Vì: (X · W1) · W2 = X · (W1 · W2)
// Nên: Mạng nhiều lớp = 1 lớp với W_gộp = W1 · W2 · ... · Wn

// --- Non-Linear với Activation ---
// ReLU: f(x) = max(0, x)
// Tạo "khuỷu tay" trong không gian - điểm bẻ gãy tại x=0
fn relu(x: &Array2<f64>) -> Array2<f64> {
    x.mapv(|v| v.max(0.0))
}

// Sigmoid: f(x) = 1 / (1 + e^(-x))
// Tạo đường cong "chữ S" mượt mà
fn sigmoid(x: &Array2<f64>) -> Array2<f64> {
    x.mapv(|v| 1.0 / (1.0 + (-v).exp()))
}

// Mạng với Non-Linear Activation
// Đây là loại mạng THỰC SỰ có thể học patterns phức tạp!
fn nonlinear_stacked_layers(
    x: &Array2<f64>,
    weights: &[Array2<f64>],
    biases: &[Array2<f64>],
    activation: ActivationType
) -> Array2<f64> {
    assert_eq!(weights.len(), biases.len());

    let mut h = x.clone();
    for (w, b) in weights.iter().zip(biases.iter()) {
        // Bước 1: Linear transformation
        let z = h.dot(w) + b;

        // Bước 2: ÁP DỤNG NON-LINEAR ACTIVATION!
        // ĐÂY LÀ ĐIỂM QUAN TRỌNG NHẤT!
        h = match activation {
            ActivationType::ReLU => relu(&z),
            ActivationType::Sigmoid => sigmoid(&z),
        };
    }
    h
}

enum ActivationType {
    ReLU,
    Sigmoid,
}

fn main() {
    println!("=== CHỨNG MINH: MẠNG KHÔNG CÓ ACTIVATION SỤP ĐỔ VỀ TUYẾN TÍNH ===");

    // Ma trận (Để đơn giản ta cho X=1, W là số vô hướng)
    let x = 5.0;
    let w1 = 2.0;
    let b1 = 1.0;

    let w2 = 3.0;
    let b2 = -2.0;

    // Forward Pass qua 2 lớp (Không hàm Activation)
    let z1 = x * w1 + b1;      // Tầng 1 (Ẩn)
    let z2 = z1 * w2 + b2;     // Tầng 2 (Output)

    println!("Output khi qua 2 lớp (No activation): {}", z2);

    // RÚT GỌN MẶT TOÁN HỌC: z2 = (x * w1 + b1) * w2 + b2
    // z2 = x * (w1 * w2) + (b1 * w2 + b2)
    // Đặt W_gop = (w1 * w2) = 2*3 = 6
    // Đặt B_gop = (b1 * w2 + b2) = 1*3 - 2 = 1
    let w_gop = w1 * w2;
    let b_gop = b1 * w2 + b2;
    let z_rut_gon = x * w_gop + b_gop;

    println!("Output khi qua 1 Lớp Gộp Duy Nhất: {}", z_rut_gon);

    println!("\\n>>> KẾT LUẬN: 2 == 1. Mọi Layer chỉ như 1 Layer. Sụp đổ kiến trúc Deep Learning!");

    // =========================================================
    // VỚI ACTIVATION - XOR PROBLEM
    // =========================================================
    println!("\\n=== VỚI ACTIVATION - GIẢI QUYẾT XOR ===");

    // Input XOR
    let x_xor = array![
        [0.0, 0.0],
        [0.0, 1.0],
        [1.0, 0.0],
        [1.0, 1.0],
    ];

    println!("Input: [[0,0], [0,1], [1,0], [1,1]]");
    println!("Expected XOR output: [0, 1, 1, 0]");

    // Weights đã được "hard-coded" để hoạt động với XOR
    // (Trong thực tế, mạng sẽ tự học weights này qua training!)
    let w1 = array![[1.0, 1.0], [1.0, 1.0]];
    let b1 = array![[-0.5], [-0.5]];
    let w2 = array![[1.0, -2.0], [-2.0, 1.0]];
    let b2 = array![[0.0], [0.0]];

    // Forward pass: 2 layers VỚI ReLU activation
    let out = nonlinear_stacked_layers(
        &x_xor,
        &[w1, w2],
        &[b1, b2],
        ActivationType::ReLU
    );

    println!("\\nOutput với ReLU:");
    println!("{:?}", out);

    println!("\\n>>> PHÂN TÍCH:");
    println!("   - Output [0,0] = {:.4} (≈ 0 → Lớp 0)", out[[0, 0]]);
    println!("   - Output [0,1] = {:.4} (≈ 1 → Lớp 1)", out[[1, 0]]);
    println!("   - Output [1,0] = {:.4} (≈ 1 → Lớp 1)", out[[2, 0]]);
    println!("   - Output [1,1] = {:.4} (≈ 0 → Lớp 0)", out[[3, 0]]);
    println!("\\n   ✅ Mạng đã HỌC được pattern XOR!");

    // =========================================================
    // GIẢI THÍCH: TẠI SAO ReLU HOẠT ĐỘNG?
    // =========================================================
    println!("\\n=== GIẢI THÍCH: TẠI SAO ReLU HOẠT ĐỘNG? ===");

    println!("\\nReLU f(x) = max(0, x) tạo ra 'khuỷu tay' tại x=0:");
    println!("  - Khi x > 0: f(x) = x (đường thẳng đi lên)");
    println!("  - Khi x ≤ 0: f(x) = 0 (đường thẳng nằm ngang)");
    println!("\\nĐiểm bẻ gãy này cho phép mạng:");
    println!("  1. Vẽ đường cong thay vì chỉ đường thẳng");
    println!("  2. Tách các điểm XOR ra riêng biệt");
    println!("  3. Học được mọi pattern phức tạp!");

    // =========================================================
    // SO SÁNH VỚI SIGMOID
    // =========================================================
    println!("\\n=== SO SÁNH: VỚI SIGMOID ACTIVATION ===");

    let sigmoid_out = nonlinear_stacked_layers(
        &x_xor,
        &[
            array![[1.0, 1.0], [1.0, 1.0]],
            array![[1.0, -2.0], [-2.0, 1.0]]
        ],
        &[
            array![[-0.5], [-0.5]],
            array![[0.0], [0.0]]
        ],
        ActivationType::Sigmoid
    );

    println!("\\nOutput với Sigmoid:");
    println!("{:?}", sigmoid_out);

    println!("\\n>>> Nhận xét:");
    println!("   - Sigmoid 'nén' output về (0, 1)");
    println!("   - Vẫn phân biệt được XOR!");
    println!("   - Nhưng gradient sẽ 'vanish' khi mạng sâu");

    // =========================================================
    // KẾT LUẬN
    // =========================================================
    println!("\\n╔══════════════════════════════════════════════════════════════════════╗");
    println!("║                          KẾT LUẬN                                    ║");
    println!("╠══════════════════════════════════════════════════════════════════════╣");
    println!("║  1. LINEAR (không activation):                                        ║");
    println!("║     → Mạng 100 lớp = 1 lớp (Linear Collapse!)                        ║");
    println!("║     → Không thể giải XOR                                             ║");
    println!("║                                                                        ║");
    println!("║  2. NON-LINEAR (có activation):                                        ║");
    println!("║     → Mỗi lớp thực sự khác nhau                                      ║");
    println!("║     → Có thể giải XOR và mọi pattern phức tạp                        ║");
    println!("║     → Đây là nền tảng KIẾN TRÚC của Neural Network!                     ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");
}`
  },
  {
    id: 'ch21_03_02',
    title: '2. Các Hàm Cổ Điển: Sigmoid và Tanh',
    duration: '80 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">ssid_chart</span> 2. Các Hàm Cổ Điển: Sigmoid và Tanh</h2>

  <p>Sigmoid và Tanh là hai hàm activation "cổ điển" nhất trong lịch sử Neural Network. Dù không còn được ưu tiên cho hidden layers, chúng vẫn đóng vai trò quan trọng ở output layers, và việc hiểu chúng giúp bạn nắm vững bản chất của gradient.</p>

  <!-- ========================================= -->
  <!-- 2.1. SIGMOID -->
  <!-- ========================================= -->
  <h3>2.1. Sigmoid (Logistic Function)</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa</span>
    <p>Sigmoid (còn gọi là Logistic Function) là hàm kích hoạt "nén" mọi giá trị đầu vào về khoảng <strong>(0, 1)</strong>. Nó có hình dạng chữ S đặc trưng.</p>
  </div>

  <div class="formula-block my-6 p-5 bg-blue-50 border-l-4 border-blue-500">
    <p class="font-bold text-blue-800 mb-3">Công thức toán học:</p>
    <div class="space-y-3 font-mono text-lg">
      <p class="text-center">$\\sigma(x) = \\frac{1}{1 + e^{-x}}$</p>
      <hr class="my-2"/>
      <p class="text-sm text-gray-600">Đạo hàm:</p>
      <p class="text-center">$\\sigma'(x) = \\sigma(x) \\cdot (1 - \\sigma(x))$</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/act_sigmoid.png" alt="Sigmoid Function" />
    <div class="image-caption">Hình 5: Đồ thị hàm Sigmoid</div>
  </div>

  <h4>2.1.1. Đặc điểm của Sigmoid</h4>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">check_circle</span></div>
      <h4>Ưu điểm</h4>
      <ul class="list-disc pl-4">
        <li><strong>Output bounded:</strong> Luôn nằm trong (0, 1) - dễ interpret</li>
        <li><strong>Derivative nice:</strong> Đạo hàm tính được "đẹp" từ chính output</li>
        <li><strong>Binary Classification:</strong> Phù hợp cho output layer</li>
        <li><strong>Smooth gradient:</strong> Không có "bước nhảy" đột ngột</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">cancel</span></div>
      <h4>Nhược điểm</h4>
      <ul class="list-disc pl-4">
        <li><strong>Vanishing Gradient:</strong> Khi |x| lớn, gradient → 0</li>
        <li><strong>Not zero-centered:</strong> Output (0, 1) → khó học</li>
        <li><strong>Exp() slow:</strong> Tính toán chậm hơn ReLU</li>
        <li><strong>Deep networks:</strong> Không phù hợp cho mạng sâu</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">warning</span></div>
    <div class="callout-content">
      <span class="callout-title">Vanishing Gradient - Kẻ thù số 1 của Sigmoid!</span>
      <p>Khi xung gradient truyền ngược qua nhiều lớp Sigmoid, mỗi lớp đều nhân với $\\sigma'(x) \\in (0, 0.25]$.</p>
      <p class="mt-2">Kết quả: gradient giảm theo cấp số nhân:</p>
      <p class="font-mono text-center my-2">$\\frac{\\partial L}{\\partial W_1} = \\frac{\\partial L}{\\partial W_n} \\cdot \\prod_{i=1}^{n} \\sigma'(z_i)$</p>
      <p>Sau 10 layers: gradient chỉ còn $0.25^{10} \\approx 0.000095\\%$ của gradient ban đầu!</p>
    </div>
  </div>

  <h4>2.1.2. Khi nào dùng Sigmoid?</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Use Case</th>
        <th>Dùng Sigmoid?</th>
        <th>Lý do</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Output Layer - Binary Classification</td>
        <td class="text-green-600 font-bold">YES</td>
        <td>Output trong (0,1) = xác suất</td>
      </tr>
      <tr>
        <td>Output Layer - Multi-class</td>
        <td class="text-red-600 font-bold">NO</td>
        <td>Dùng Softmax</td>
      </tr>
      <tr>
        <td>Hidden Layers</td>
        <td class="text-red-600 font-bold">NO</td>
        <td>Vanishing Gradient</td>
      </tr>
      <tr>
        <td>Regression (giá trị > 1)</td>
        <td class="text-red-600 font-bold">NO</td>
        <td>Output bị giới hạn</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 2.2. TANH -->
  <!-- ========================================= -->
  <h3>2.2. Hyperbolic Tangent (Tanh)</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa</span>
    <p>Tanh (Hyperbolic Tangent) là phiên bản "nâng cấp" của Sigmoid với output nằm trong <strong>(-1, 1)</strong>, centered ở 0.</p>
  </div>

  <div class="formula-block my-6 p-5 bg-purple-50 border-l-4 border-purple-500">
    <p class="font-bold text-purple-800 mb-3">Công thức toán học:</p>
    <div class="space-y-3 font-mono text-lg">
      <p class="text-center">$\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}$</p>
      <hr class="my-2"/>
      <p class="text-sm text-gray-600">Đạo hàm:</p>
      <p class="text-center">$\\tanh'(x) = 1 - \\tanh^2(x)$</p>
      <hr class="my-2"/>
      <p class="text-sm text-gray-600">Quan hệ với Sigmoid:</p>
      <p class="text-center">$\\tanh(x) = 2 \\cdot \\sigma(2x) - 1$</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/act_tanh.png" alt="Tanh Function" />
    <div class="image-caption">Hình 6: Đồ thị hàm Tanh</div>
  </div>

  <h4>2.2.1. So sánh Sigmoid vs Tanh</h4>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Giống nhau</h4>
      <ul class="list-disc pl-4">
        <li>Đều có hình chữ S (Sigmoid curve)</li>
        <li>Đều bị Vanishing Gradient</li>
        <li>Đều dùng exp() → tính toán chậm</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Khác nhau</h4>
      <ul class="list-disc pl-4">
        <li><strong>Output range:</strong> Sigmoid (0,1) vs Tanh (-1,1)</li>
        <li><strong>Zero-centered:</strong> Tanh có, Sigmoid không</li>
        <li><strong>Gradient strength:</strong> Tanh max=1, Sigmoid max=0.25</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-icon"><span class="material-symbols-outlined">lightbulb</span></div>
    <div class="callout-content">
      <span class="callout-title">Tại sao Tanh tốt hơn Sigmoid cho Hidden Layers?</span>
      <p>Vì Tanh có output centered ở 0, gradient có cả giá trị dương và âm. Điều này giúp:</p>
      <ul class="list-disc pl-4 mt-2">
        <li>Hội tụ nhanh hơn</li>
        <li>Gradient "đối xứng" hơn</li>
        <li>Tránh được bias theo một hướng</li>
      </ul>
    </div>
  </div>

  <h4>2.2.2. Khi nào dùng Tanh?</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Use Case</th>
        <th>Dùng Tanh?</th>
        <th>Lý do</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>RNN / LSTM / GRU</td>
        <td class="text-green-600 font-bold">YES</td>
        <td>Tính đối xứng tốt</td>
      </tr>
      <tr>
        <td>Hidden Layers (cũ)</td>
        <td class="text-yellow-600 font-bold">~ OK</td>
        <td>Giờ dùng ReLU/GELU nhiều hơn</td>
      </tr>
      <tr>
        <td>Autoencoders</td>
        <td class="text-green-600 font-bold">YES</td>
        <td>Cần output có cả âm/dương</td>
      </tr>
      <tr>
        <td>Output Binary Classification</td>
        <td class="text-red-600 font-bold">NO</td>
        <td>Dùng Sigmoid</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 2.3. SO SÁNH TRỰC QUAN -->
  <!-- ========================================= -->
  <h3>2.3. So sánh trực quan Sigmoid vs Tanh</h3>

  <div class="image-showcase">
    <img src="/images/ch21/activation_functions_comparison.png" alt="Sigmoid vs Tanh vs ReLU" />
    <div class="image-caption">Hình 7: So sánh Sigmoid, Tanh và ReLU</div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Sigmoid</h4>
      <ul class="list-disc pl-4">
        <li>Output: (0, 1)</li>
        <li>Zero-centered: Không</li>
        <li>Max derivative: 0.25</li>
        <li>Dùng cho: Binary output</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Tanh</h4>
      <ul class="list-disc pl-4">
        <li>Output: (-1, 1)</li>
        <li>Zero-centered: Có</li>
        <li>Max derivative: 1.0</li>
        <li>Dùng cho: RNN/LSTM</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>ReLU (sau)</h4>
      <ul class="list-disc pl-4">
        <li>Output: [0, ∞)</li>
        <li>Zero-centered: Không</li>
        <li>Max derivative: 1.0</li>
        <li>Dùng cho: Hidden layers</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 2.4. VÍ DỤ CODE -->
  <!-- ========================================= -->
  <h3>2.4. Ví dụ Code Rust</h3>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">code</span></div>
    <h3>Code Demo: Sigmoid vs Tanh</h3>
    <p>Xem trong phần defaultCode bên dưới!</p>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// Rust Implementation: Sigmoid and Tanh
// =====================================================

use ndarray::Array2;

/// Sigmoid: σ(x) = 1 / (1 + e^(-x))
/// Output range: (0, 1)
fn sigmoid(x: &Array2<f64>) -> Array2<f64> {
    x.mapv(|v| 1.0 / (1.0 + (-v).exp()))
}

/// Sigmoid derivative: σ'(x) = σ(x) * (1 - σ(x))
fn sigmoid_derivative(sigma_x: &Array2<f64>) -> Array2<f64> {
    sigma_x.mapv(|v| v * (1.0 - v))
}

/// Tanh: tanh(x) = (e^x - e^(-x)) / (e^x + e^(-x))
/// Output range: (-1, 1)
fn tanh_activation(x: &Array2<f64>) -> Array2<f64> {
    x.mapv(|v| v.tanh())
}

/// Tanh derivative: tanh'(x) = 1 - tanh²(x)
fn tanh_derivative(tanh_x: &Array2<f64>) -> Array2<f64> {
    tanh_x.mapv(|v| 1.0 - v * v)
}

/// Demonstrate Vanishing Gradient
fn demonstrate_vanishing_gradient() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              VANISHING GRADIENT DEMO                            ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Test at different input magnitudes
    let test_inputs = vec![-10.0, -5.0, -2.0, -1.0, 0.0, 1.0, 2.0, 5.0, 10.0];

    println!("\\nInput x    | Sigmoid σ'(x) | Tanh tanh'(x)");
    println!("-----------|---------------|---------------");
    for &x in &test_inputs {
        let sigma = 1.0 / (1.0 + (-x).exp());
        let sigma_grad = sigma * (1.0 - sigma);
        let tanh_val = x.tanh();
        let tanh_grad = 1.0 - tanh_val * tanh_val;
        println!("{:>9.1f} | {:>13.6f} | {:>13.6f}", x, sigma_grad, tanh_grad);
    }

    println!("\\n>>> NHẬN XÉT:");
    println!("   - Sigmoid max gradient = 0.25 (tại x=0)");
    println!("   - Tanh max gradient = 1.0 (tại x=0)");
    println!("   - Cả hai đều -> 0 khi |x| lớn (Vanishing Gradient!)");
}

fn main() {
    // Demo basic activation
    let x = array![
        [-2.0, -1.0, 0.0, 1.0, 2.0],
        [-1.0, 0.0, 1.0, 2.0, 3.0]
    ];

    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              SIGMOID vs TANH DEMO                              ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    println!("\\nInput:");
    println!("{:?}\\n", x);

    // Sigmoid
    let sig = sigmoid(&x);
    println!("Sigmoid output (0 to 1):");
    println!("{:?}\\n", sig);

    // Tanh
    let tanh_act = tanh_activation(&x);
    println!("Tanh output (-1 to 1):");
    println!("{:?}\\n", tanh_act);

    // Show derivatives
    let sig_deriv = sigmoid_derivative(&sig);
    println!("Sigmoid derivative (max = 0.25):");
    println!("{:?}\\n", sig_deriv);

    let tanh_deriv = tanh_derivative(&tanh_act);
    println!("Tanh derivative (max = 1.0):");
    println!("{:?}", tanh_deriv);

    // Demonstrate vanishing gradient
    demonstrate_vanishing_gradient();

    // =========================================================
    // So sánh practical
    // =========================================================
    println!("\\n╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              SO SÁNH PRACTICAL                                ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    println!("\\n>>> KHI NÀO DÙNG NÀO?");
    println!("\\n1. Sigmoid:");
    println!("   - Output layer cho Binary Classification");
    println!("   - Probability output");
    println!("   - KHÔNG dùng cho hidden layers (Vanishing!)");

    println!("\\n2. Tanh:");
    println!("   - Hidden layers trong RNN/LSTM");
    println!("   - Autoencoders");
    println!("   - Giờ ít dùng, ưu tiên ReLU/GELU");

    println!("\\n3. ReLU (sẽ học ở phần sau):");
    println!("   - Hidden layers (mặc định)");
    println!("   - Tính toán nhanh, gradient tốt");
    println!("   - Vẫn có vấn đề Dying ReLU");
}`
  },
  {
    id: 'ch21_03_03',
    title: '3. Kỷ nguyên của ReLU và The Dead ReLU Problem',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">electric_bolt</span> 3. Kỷ nguyên của ReLU và The Dead ReLU Problem</h2>

  <p>ReLU (Rectified Linear Unit) là hàm activation đơn giản nhất nhưng hiệu quả nhất. Nó đã tạo bước ngoặt cho Deep Learning và đến nay vẫn là lựa chọn mặc định cho hidden layers.</p>

  <!-- ========================================= -->
  <!-- 3.1. RELU - REVOLUTIONARY ACTIVATION -->
  <!-- ========================================= -->
  <h3>3.1. ReLU - Revolutionary Activation</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa</span>
    <p>ReLU (Rectified Linear Unit) là hàm kích hoạt đơn giản nhất: <strong>f(x) = max(0, x)</strong>. Nó "chỉnh lại" (rectify) đầu vào âm về 0, giữ nguyên đầu ra dương.</p>
  </div>

  <div class="formula-block my-6 p-5 bg-green-50 border-l-4 border-green-500">
    <p class="font-bold text-green-800 mb-3">Công thức ReLU:</p>
    <div class="space-y-2 font-mono text-sm">
      <p class="text-lg">$f(x) = \\max(0, x)$</p>
      <hr class="my-2"/>
      <p class="text-gray-600">Hoặc viết gọn:</p>
      <p class="text-lg">$f(x) = \\begin{cases} x & \\text{nếu } x > 0 \\\\ 0 & \\text{nếu } x \\leq 0 \\end{cases}$</p>
      <hr class="my-2"/>
      <p class="text-gray-600">Đạo hàm:</p>
      <p class="text-lg">$f'(x) = \\begin{cases} 1 & \\text{nếu } x > 0 \\\\ 0 & \\text{nếu } x \\leq 0 \\end{cases}$</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/act_relu.png" alt="ReLU Function" />
    <div class="image-caption">Hình 8: Đồ thị hàm ReLU</div>
  </div>

  <h4>3.1.1. Tại sao ReLU là Game Changer?</h4>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">speed</span></div>
      <h4>No Vanishing Gradient!</h4>
      <p>Gradient = 1 khi x > 0 → gradient truyền ngược ổn định, không bị suy giảm qua các lớp.</p>
      <div class="mt-3 p-2 bg-green-50 rounded">
        <p class="font-bold">So sánh:</p>
        <ul class="list-disc pl-4 text-sm">
          <li>Sigmoid max gradient: 0.25</li>
          <li>Tanh max gradient: 1.0</li>
          <li>ReLU max gradient: 1.0 (và luôn = 1!)</li>
        </ul>
      </div>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">bolt</span></div>
      <h4>Tính toán cực nhanh</h4>
      <p>max(0, x) nhanh hơn exp() gấp nhiều lần. Với hàng triệu neurons, đây là yếu tố quyết định!</p>
      <div class="mt-3 p-2 bg-blue-50 rounded">
        <p class="font-bold">Benchmark:</p>
        <p>ReLU: ~5ns vs Sigmoid: ~50ns</p>
      </div>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">filter_list</span></div>
      <h4>Sparse Representation</h4>
      <p>Khoảng 50% neurons "tắt" tự nhiên → đại diện thưa (sparse representation) → giảm overfitting!</p>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">warning</span></div>
    <div class="callout-content">
      <span class="callout-title">Dead ReLU Problem - Khi Neuron "chết" không sống lại được!</span>
      <p>Khi một neuron có output luôn ≤ 0 (do weights/bias không tốt từ đầu), gradient khi truyền qua nó = 0. Kết quả: weights không bao giờ được cập nhật.</p>
      <p class="mt-2">Neuron đó "chết" vĩnh viễn như thằng mê tín!</p>
      <p class="mt-2 font-bold">→ Còn tệ hơn Sigmoid vì gradient = 0 TUYỆT ĐỐI (không phải nhỏ dần)!</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/dying_relu.png" alt="Dying ReLU Problem" />
    <div class="image-caption">Hình 9: Minh họa Dead ReLU - neuron không bao giờ học được</div>
  </div>

  <!-- ========================================= -->
  <!-- 3.2. CÁC BIẾN THỂ CỦA RELU -->
  <!-- ========================================= -->
  <h3>3.2. Các Biến thể của ReLU</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">water_drop</span></div>
      <h4>Leaky ReLU</h4>
      <p class="font-mono">f(x) = x nếu x > 0, αx nếu x ≤ 0</p>
      <p class="text-sm mt-2">Thường α = 0.01</p>
      <p class="mt-2">Cho phép gradient "rò rỉ" (leak) qua khi x < 0 → Neuron không bao giờ "chết" hoàn toàn.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">tune</span></div>
      <h4>PReLU (Parametric ReLU)</h4>
      <p class="font-mono">f(x) = x nếu x > 0, αx nếu x ≤ 0</p>
      <p class="text-sm mt-2">α là tham số học được!</p>
      <p class="mt-2">Cho mạng tự học α tốt nhất. Nhưng dễ overfit nếu data không đủ.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">functions</span></div>
      <h4>ELU (Exponential Linear Unit)</h4>
      <p class="font-mono">f(x) = x nếu x > 0, α(e^x - 1) nếu x ≤ 0</p>
      <p class="text-sm mt-2">Thường α = 1.0</p>
      <p class="mt-2">Mượt mà hơn Leaky ReLU, output gần 0 hơn. Nhưng tính toán chậm hơn vì có exp().</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/relu_variants.png" alt="ReLU Variants Comparison" />
    <div class="image-caption">Hình 10: So sánh các biến thể của ReLU</div>
  </div>

  <h4>3.2.1. Bảng so sánh các ReLU variants</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Loại</th>
        <th>Công thức</th>
        <th>Ưu điểm</th>
        <th>Nhược điểm</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ReLU</td>
        <td>$\max(0,x)$</td>
        <td>Nhanh, đơn giản</td>
        <td>Dead neurons</td>
      </tr>
      <tr>
        <td>Leaky ReLU</td>
        <td>$\max(0.01x,x)$</td>
        <td>Không dead</td>
        <td>Thêm hyperparameter</td>
      </tr>
      <tr>
        <td>PReLU</td>
        <td>$\max(\alpha x,x)$</td>
        <td>Tự học α</td>
        <td>Dễ overfit</td>
      </tr>
      <tr>
        <td>ELU</td>
        <td>$x>0?x:\alpha(e^x-1)$</td>
        <td>Smooth, near zero</td>
        <td>Chậm (exp)</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 3.3. TẠI SAO RELU VẪN LÀ LỰA CHỌN SỐ 1 -->
  <!-- ========================================= -->
  <h3>3.3. Tại sao ReLU vẫn là lựa chọn số 1?</h3>

  <div class="callout callout-tip">
    <div class="callout-icon"><span class="material-symbols-outlined">lightbulb</span></div>
    <div class="callout-content">
      <span class="callout-title">Khuyến nghị thực tế:</span>
      <p>Bắt đầu với ReLU. Nếu thấy có hiện tượng "chết" neuron quá nhiều (dead neurons > 20%), thử Leaky ReLU hoặc ELU. Với classification, đừng bao giờ dùng ReLU ở output layer!</p>
    </div>
  </div>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">school</span></div>
    <h3>Key Takeaway - ReLU</h3>
    <ol class="list-decimal pl-6 space-y-2">
      <li><strong>ReLU = max(0, x):</strong> Đơn giản, nhanh, hiệu quả</li>
      <li><strong>Gradient = 1:</strong> Không vanishing gradient như Sigmoid/Tanh</li>
      <li><strong>Dead ReLU:</strong> Neuron "chết" khi x ≤ 0 → gradient = 0 vĩnh viễn</li>
      <li><strong>Leaky ReLU:</strong> Giải quyết Dead ReLU bằng cách cho gradient "rò rỉ"</li>
      <li><strong>Hidden layer:</strong> ReLU là default, output layer dùng Sigmoid/Softmax</li>
    </ol>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// Rust Implementation: ReLU and Variants
// =====================================================

use ndarray::Array2;

/// ReLU: f(x) = max(0, x)
/// Simple, fast, and effective!
fn relu(x: &Array2<f64>) -> Array2<f64> {
    x.mapv(|v| v.max(0.0))
}

/// ReLU derivative: 1 if x > 0, 0 otherwise
fn relu_derivative(x: &Array2<f64>) -> Array2<f64> {
    x.mapv(|v| if v > 0.0 { 1.0 } else { 0.0 })
}

/// Leaky ReLU: f(x) = x if x > 0, alpha * x if x <= 0
/// Prevents "dying ReLU" by allowing small gradient for negative inputs
fn leaky_relu(x: &Array2<f64>, alpha: f64) -> Array2<f64> {
    x.mapv(|v| if v > 0.0 { v } else { alpha * v })
}

/// Leaky ReLU derivative: 1 if x > 0, alpha otherwise
fn leaky_relu_derivative(x: &Array2<f64>, alpha: f64) -> Array2<f64> {
    x.mapv(|v| if v > 0.0 { 1.0 } else { alpha })
}

/// ELU (Exponential Linear Unit): f(x) = x if x > 0, alpha * (e^x - 1) if x <= 0
/// Smoother than Leaky ReLU, but slower due to exp()
fn elu(x: &Array2<f64>, alpha: f64) -> Array2<f64> {
    x.mapv(|v| if v > 0.0 { v } else { alpha * (v.exp() - 1.0) })
}

/// ELU derivative: 1 if x > 0, alpha * e^x if x <= 0
fn elu_derivative(x: &Array2<f64>, alpha: f64) -> Array2<f64> {
    x.mapv(|v| if v > 0.0 { 1.0 } else { alpha * v.exp() })
}

/// Demonstrate the Dying ReLU problem
fn demonstrate_dying_relu() {
    println!("=== Dying ReLU Problem ===\\n");

    let x = array![[-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0]];

    let relu_out = relu(&x);
    let relu_deriv = relu_derivative(&x);

    println!("Input: {:?}", x);
    println!("ReLU output: {:?}", relu_out);
    println!("ReLU derivative: {:?}", relu_deriv);

    println!("\\n=> Notice: For x <= 0, gradient is EXACTLY 0!");
    println!("=> This neuron will NEVER learn from negative inputs!");
    println!("=> This is the 'Dying ReLU' problem!");
}

fn demonstrate_relu_vs_leaky() {
    println!("\\n=== ReLU vs Leaky ReLU ===\\n");

    let alpha = 0.01; // Typical leaky value
    let x = array![[-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0]];

    let relu_out = relu(&x);
    let leaky_out = leaky_relu(&x, alpha);

    let relu_deriv = relu_derivative(&x);
    let leaky_deriv = leaky_relu_derivative(&x, alpha);

    println!("Input: {:?}", x.row(0).unwrap());
    println!("\\nReLU output:      {:?}", relu_out.row(0).unwrap());
    println!("Leaky ReLU output: {:?}", leaky_out.row(0).unwrap());
    println!("\\nReLU derivative:      {:?}", relu_deriv.row(0).unwrap());
    println!("Leaky ReLU derivative: {:?}", leaky_deriv.row(0).unwrap());

    println!("\\n=> Leaky ReLU has non-zero gradient for negative inputs!");
    println!("=> Neuron will continue learning even with negative inputs!");
}

fn main() {
    // Test basic ReLU
    let x = array![[-2.0, -1.0, 0.0, 1.0, 2.0],
                   [-3.0, -0.5, 0.0, 0.5, 3.0]];

    println!("Input:");
    println!("{:?}\\n", x);

    let relu_out = relu(&x);
    println!("ReLU output (max(0, x)):");
    println!("{:?}\\n", relu_out);

    let leaky_out = leaky_relu(&x, 0.01);
    println!("Leaky ReLU output (alpha=0.01):");
    println!("{:?}\\n", leaky_out);

    let elu_out = elu(&x, 1.0);
    println!("ELU output (alpha=1.0):");
    println!("{:?}\\n", elu_out);

    // Demonstrate problems
    demonstrate_dying_relu();
    demonstrate_relu_vs_leaky();

    // =========================================================
    // Summary
    // =========================================================
    println!("\\n=== RECOMMENDATIONS ===");
    println!("1. Start with ReLU as default for hidden layers");
    println!("2. If you see >20% dead neurons, try Leaky ReLU or ELU");
    println!("3. NEVER use ReLU at output layer!");
    println!("   - Binary: Use Sigmoid");
    println!("   - Multi-class: Use Softmax");
    println!("   - Regression: Use Linear (no activation)");
}`
  },
  {
    id: 'ch21_03_04',
    title: '4. Softmax và Activation Thế hệ mới (GELU, Swish)',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">auto_awesome</span> 4. Softmax và Activation Thế hệ mới (GELU, Swish)</h2>

  <p>Phần này sẽ khám phá Softmax — hàm activation không thể thiếu ở output layer, cùng các activation function thế hệ mới đang thống trị trong kiến trúc Transformers và LLM.</p>

  <!-- ========================================= -->
  <!-- 4.1. SOFTMAX -->
  <!-- ========================================= -->
  <h3>4.1. Softmax - King of Output Layer</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa</span>
    <p>Softmax không phải là activation function thông thường. Nó "chuyển đổi" một vector thành phân phối xác suất - tổng các output = 1. Dùng cho multi-class classification.</p>
  </div>

  <div class="formula-block my-6 p-5 bg-blue-50 border-l-4 border-blue-500">
    <p class="font-bold text-blue-800 mb-3">Công thức Softmax:</p>
    <div class="space-y-2 font-mono text-sm">
      <p class="text-lg">$\\text{softmax}(x)_i = \\frac{e^{x_i}}{\\sum_j e^{x_j}}$</p>
      <p class="text-gray-600 mt-2">Với i chạy qua tất cả các classes. Output nằm trong (0, 1) và tổng = 1.</p>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">warning</span></div>
    <div class="callout-content">
      <span class="callout-title">Lưu ý quan trọng về Softmax!</span>
      <p>Softmax "khuếch đại" (exaggerate) sự khác biệt giữa các classes: class có giá trị lớn nhất sẽ chiếm xác suất áp đảo. Không nên dùng cho regression hay binary classification — quá thừa thãi!</p>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Khi nào dùng Softmax?</h4>
      <ul>
        <li>Multi-class Classification (C > 2)</li>
        <li>Output Layer duy nhất</li>
        <li>Output layer activation cho mạng phân loại ảnh, ngôn ngữ</li>
        <li>Kết hợp với Cross-Entropy Loss</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Khi nào KHÔNG dùng?</h4>
      <ul>
        <li>Binary Classification (dùng Sigmoid!)</li>
        <li>Regression</li>
        <li>Hidden Layers</li>
        <li>Multi-label Classification</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 4.2. GELU -->
  <!-- ========================================= -->
  <h3>4.2. GELU - Gaussian Error Linear Unit</h3>

  <p>GELU là activation được sử dụng trong BERT, GPT, và hầu hết các Transformer models hiện đại. Nó có đường cong mượt mà hơn ReLU nhờ tích hợp Gaussian CDF vào công thức.</p>

  <div class="formula-block my-6 p-5 bg-purple-50 border-l-4 border-purple-500">
    <p class="font-bold text-purple-800 mb-3">Công thức GELU:</p>
    <div class="space-y-2 font-mono text-sm">
      <p class="text-lg">$\\text{GELU}(x) = x \\cdot \\Phi(x)$</p>
      <p class="text-gray-600">Trong đó Φ(x) là Cumulative Distribution Function (CDF) của phân phối chuẩn</p>
      <hr class="my-2"/>
      <p class="text-gray-600">Approximation (dùng trong code):</p>
      <p class="text-lg">$\\text{GELU}(x) \\approx 0.5x(1 + \\tanh(\\sqrt{2/\\pi}(x + 0.044715x^3)))$</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/act_gelu.png" alt="GELU Function" />
    <div class="image-caption">Hình 11: Đồ thị hàm GELU</div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Ưu điểm của GELU</h4>
      <ul>
        <li>Không có chuyển đổi đột ngột như ReLU</li>
        <li>Thường outperform ReLU trong NLP tasks</li>
        <li>Được dùng trong BERT, GPT, RoBERTa...</li>
        <li>Smooth gradient everywhere</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Nhược điểm</h4>
      <ul>
        <li>Tính toán chậm hơn ReLU (cần tanh, exp)</li>
        <li>Không đơn giản như ReLU</li>
        <li>Chưa có chứng minh lý thuyết rõ ràng về ưu thế</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 4.3. SWISH -->
  <!-- ========================================= -->
  <h3>4.3. Swish - Self-Gated Activation</h3>

  <p>Swish được Google Research công bố năm 2017. Đây là hàm "self-gated" — tự điều chỉnh mức kích hoạt dựa trên chính giá trị input, không cần thêm tham số ngoài.</p>

  <div class="formula-block my-6 p-5 bg-pink-50 border-l-4 border-pink-500">
    <p class="font-bold text-pink-800 mb-3">Công thức Swish:</p>
    <div class="space-y-2 font-mono text-sm">
      <p class="text-lg">$\\text{swish}(x) = x \\cdot \\sigma(\\beta x)$</p>
      <p class="text-gray-600">Trong đó σ là sigmoid, β là tham số học được hoặc cố định = 1</p>
      <hr class="my-2"/>
      <p class="text-gray-600">Simplified (β=1):</p>
      <p class="text-lg">$\\text{swish}(x) = \\frac{x}{1 + e^{-x}}$</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-icon"><span class="material-symbols-outlined">lightbulb</span></div>
    <div class="callout-content">
      <span class="callout-title">SiLU (Sigmoid Linear Unit)</span>
      <p>Swish với β = 1 chính là SiLU (Sigmoid Linear Unit). Hiệu năng gần tương đương GELU, được sử dụng trong Swin Transformer, EfficientNet...</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/act_swish.png" alt="Swish Function" />
    <div class="image-caption">Hình 12: Đồ thị hàm Swish/SiLU</div>
  </div>

  <!-- ========================================= -->
  <!-- 4.4. TÓM TẮT -->
  <!-- ========================================= -->
  <h3>4.4. Tóm tắt Activation Functions</h3>

  <table class="comparison-table" style="border-collapse: separate; border-spacing: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
    <thead>
      <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <th style="padding: 14px 18px; text-align: center; font-size: 0.95rem;">Activation</th>
        <th style="padding: 14px 18px; text-align: center; font-size: 0.95rem;">Công thức</th>
        <th style="padding: 14px 18px; text-align: center; font-size: 0.95rem;">Range</th>
        <th style="padding: 14px 18px; text-align: center; font-size: 0.95rem;">Dùng cho</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: #f0fdf4;">
        <td style="padding: 12px 16px; font-weight: 700;">
          <span style="display: inline-block; background: #22c55e; color: white; padding: 3px 10px; border-radius: 6px; font-size: 0.85rem;">ReLU</span>
        </td>
        <td style="padding: 12px 16px; text-align: center;">$f(x) = \\max(0, x)$</td>
        <td style="padding: 12px 16px; text-align: center; font-family: monospace; font-size: 0.85rem;">$[0, +\\infty)$</td>
        <td style="padding: 12px 16px;">
          <span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">Hidden layers (default)</span>
        </td>
      </tr>
      <tr style="background: #fefce8;">
        <td style="padding: 12px 16px; font-weight: 700;">
          <span style="display: inline-block; background: #eab308; color: white; padding: 3px 10px; border-radius: 6px; font-size: 0.85rem;">Leaky ReLU</span>
        </td>
        <td style="padding: 12px 16px; text-align: center;">$f(x) = \\max(0.01x, x)$</td>
        <td style="padding: 12px 16px; text-align: center; font-family: monospace; font-size: 0.85rem;">$(-\\infty, +\\infty)$</td>
        <td style="padding: 12px 16px;">
          <span style="background: #fef9c3; color: #854d0e; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">Khi có Dead ReLU</span>
        </td>
      </tr>
      <tr style="background: #eff6ff;">
        <td style="padding: 12px 16px; font-weight: 700;">
          <span style="display: inline-block; background: #3b82f6; color: white; padding: 3px 10px; border-radius: 6px; font-size: 0.85rem;">GELU</span>
        </td>
        <td style="padding: 12px 16px; text-align: center; font-size: 0.9rem;">$0.5x\\bigl(1 + \\tanh\\bigl(\\sqrt{\\tfrac{2}{\\pi}}(x + 0.044715x^3)\\bigr)\\bigr)$</td>
        <td style="padding: 12px 16px; text-align: center; font-family: monospace; font-size: 0.85rem;">$\\approx(-0.17, +\\infty)$</td>
        <td style="padding: 12px 16px;">
          <span style="background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">Transformers, BERT, GPT</span>
        </td>
      </tr>
      <tr style="background: #fdf4ff;">
        <td style="padding: 12px 16px; font-weight: 700;">
          <span style="display: inline-block; background: #a855f7; color: white; padding: 3px 10px; border-radius: 6px; font-size: 0.85rem;">Swish/SiLU</span>
        </td>
        <td style="padding: 12px 16px; text-align: center;">$f(x) = \\dfrac{x}{1 + e^{-x}}$</td>
        <td style="padding: 12px 16px; text-align: center; font-family: monospace; font-size: 0.85rem;">$\\approx(-0.28, +\\infty)$</td>
        <td style="padding: 12px 16px;">
          <span style="background: #f3e8ff; color: #6b21a8; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">SOTA models</span>
        </td>
      </tr>
      <tr style="background: #fff7ed;">
        <td style="padding: 12px 16px; font-weight: 700;">
          <span style="display: inline-block; background: #f97316; color: white; padding: 3px 10px; border-radius: 6px; font-size: 0.85rem;">Sigmoid</span>
        </td>
        <td style="padding: 12px 16px; text-align: center;">$\\sigma(x) = \\dfrac{1}{1 + e^{-x}}$</td>
        <td style="padding: 12px 16px; text-align: center; font-family: monospace; font-size: 0.85rem;">$(0, 1)$</td>
        <td style="padding: 12px 16px;">
          <span style="background: #ffedd5; color: #9a3412; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">Binary output</span>
        </td>
      </tr>
      <tr style="background: #fef2f2;">
        <td style="padding: 12px 16px; font-weight: 700;">
          <span style="display: inline-block; background: #ef4444; color: white; padding: 3px 10px; border-radius: 6px; font-size: 0.85rem;">Softmax</span>
        </td>
        <td style="padding: 12px 16px; text-align: center;">$\\mathrm{softmax}(x)_i = \\dfrac{e^{x_i}}{\\sum_j e^{x_j}}$</td>
        <td style="padding: 12px 16px; text-align: center; font-family: monospace; font-size: 0.85rem;">$(0, 1),\\ \\sum = 1$</td>
        <td style="padding: 12px 16px;">
          <span style="background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">Multi-class output</span>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">school</span></div>
    <h3>Key Takeaway - Selection Guide</h3>
    <ol class="list-decimal pl-6 space-y-2">
      <li><strong>Hidden layers:</strong> ReLU (default) → Leaky ReLU/GELU (nếu có vấn đề) → Swish/SiLU (state-of-the-art)</li>
      <li><strong>Output layer:</strong> Sigmoid (binary) → Softmax (multi-class) → Linear (regression)</li>
      <li><strong>Đừng bao giờ dùng ReLU cho output layer!</strong></li>
      <li><strong>Transformers:</strong> Dùng GELU</li>
    </ol>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// Rust Implementation: Softmax and Modern Activations
// =====================================================

use ndarray::Array2;
use ndarray::Zip;

/// Softmax: converts vector to probability distribution
/// softmax(x)_i = exp(x_i) / sum_j exp(x_j)
fn softmax(x: &Array2<f64>) -> Array2<f64> {
    // Subtract max for numerical stability (prevents overflow)
    let max_val = x.mapv(|v| v.abs());
    let max_val = max_val.iter().fold(0.0f64, |a, &b| a.max(b));

    let shifted = x.mapv(|v| (v - max_val).exp());
    let sum_exp = shifted.sum_axis(ndarray::Axis(1));
    let sum_exp = sum_exp.insert_axis(ndarray::Axis(1));

    &shifted / &sum_exp
}

/// GELU: Gaussian Error Linear Unit
/// GELU(x) ≈ 0.5 * x * (1 + tanh(sqrt(2/π) * (x + 0.044715 * x^3)))
fn gelu(x: &Array2<f64>) -> Array2<f64> {
    let sqrt_2_over_pi = (2.0_f64 / std::f64::consts::PI).sqrt();
    let coeff = 0.044715_f64;

    x.mapv(|v| {
        let inner = sqrt_2_over_pi * (v + coeff * v * v * v);
        0.5 * v * (1.0 + inner.tanh())
    })
}

/// Swish: x * sigmoid(beta * x)
/// When beta = 1, it's called SiLU
fn swish(x: &Array2<f64>, beta: f64) -> Array2<f64> {
    let sigmoid = x.mapv(|v| 1.0 / (1.0 + (-beta * v).exp()));
    x * &sigmoid
}

/// SiLU (Sigmoid Linear Unit) - Swish with beta = 1
fn silu(x: &Array2<f64>) -> Array2<f64> {
    swish(x, 1.0)
}

/// Derivative of GELU (for backprop)
fn gelu_derivative(x: &Array2<f64>) -> Array2<f64> {
    let sqrt_2_over_pi = (2.0_f64 / std::f64::consts::PI).sqrt();
    let coeff = 0.044715_f64;

    x.mapv(|v| {
        let inner = sqrt_2_over_pi * (v + coeff * v * v * v);
        let tanh_inner = inner.tanh();
        let sech_inner = 1.0 / inner.cosh();

        // GELU'(x) = 0.5 * tanh(x) + 0.5 * x * sech^2(x) * sqrt(2/π) * (1 + 3 * 0.044715 * x^2)
        0.5 * tanh_inner + 0.5 * v * sech_inner * sqrt_2_over_pi * (1.0 + 3.0 * coeff * v * v)
    })
}

fn demonstrate_softmax() {
    println!("=== Softmax Demo ===\\n");

    // Multi-class logits
    let logits = array![[2.0, 1.0, 0.1],
                         [1.0, 2.0, 0.5]];

    println!("Input logits (not probabilities):");
    println!("{:?}\\n", logits);

    let probs = softmax(&logits);
    println!("Softmax output (probabilities that sum to 1):");
    println!("{:?}", probs);

    // Verify sum = 1
    let sum_per_row = probs.sum_axis(ndarray::Axis(1));
    println!("\\nSum per row: {:?}", sum_per_row);
    println!("=> Each row sums to 1.0 as expected!");
}

fn compare_activations() {
    println!("\\n=== Comparing Modern Activations ===\\n");

    let x = array![[-3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0]];

    let relu_out = x.mapv(|v| v.max(0.0));
    let gelu_out = gelu(&x);
    let swish_out = swish(&x, 1.0);

    println!("Input:      {:?}", x.row(0).unwrap());
    println!("ReLU:       {:?}", relu_out.row(0).unwrap());
    println!("GELU:       {:?}", gelu_out.row(0).unwrap());
    println!("Swish/SiLU: {:?}", swish_out.row(0).unwrap());

    println!("\\n=> Notice:");
    println!("  - ReLU: hard cut at 0 (not smooth)");
    println!("  - GELU: smooth transition, slightly negative for small negative inputs");
    println!("  - Swish: smooth, with 'bell-shaped' curve");
}

fn main() {
    // Demo Softmax
    demonstrate_softmax();

    // Compare modern activations
    compare_activations();

    println!("\\n=== Summary ===");
    println!("- Use Softmax ONLY at output layer for multi-class classification");
    println!("- Use GELU/Swish/SiLU in hidden layers for state-of-the-art performance");
    println!("- GELU is used in BERT, GPT, and most Transformer models");
    println!("- Swish/SiLU is used in Swin Transformer, EfficientNet, etc.");
}`
  }
];

export const ch21_03: Chapter = {
  id: 'ch21_03',
  title: '21.3. Activation Functions',
  introduction: `
    <h2>Activation Functions — Bẻ Cong Không Gian Tuyến Tính</h2>
    <ul>
      <li>Bản chất toán học và vai trò cốt lõi của các hàm kích hoạt.</li>
      <li>Hiện tượng Triệt tiêu Gradient (Vanishing) và Neuron chết (Dead ReLU).</li>
      <li>GELU/Swish — thế hệ activation thống trị trong Transformers và LLM hiện đại.</li>
    </ul>
  `,
  lessons: ch21_03_lessons,
};

export default ch21_03;
