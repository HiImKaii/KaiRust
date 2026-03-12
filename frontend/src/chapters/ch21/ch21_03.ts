// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 3: ACTIVATION FUNCTIONS - THÀNH PHẦN CỐT LÕI CỦA MẠNG NƠ-RON
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
    <div class="formula-block-small my-4 p-4 bg-blue-50 text-center">
      $$Z = X \cdot W + b$$
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

  <div class="my-6 p-5 bg-red-50 border-l-4 border-red-500">
    <p class="font-bold text-red-800 mb-3">⚠️ HIỆN TƯỢNG LINEAR COLLAPSE - MẠNG SỤP ĐỔ VỀ TUYẾN TÍNH!</p>
    <p class="text-blue-600 font-bold mb-2">Lớp 1 (Hidden Layer 1):</p>
    <div class="formula-block-small my-2 p-3 bg-white border border-slate-300 rounded text-center font-mono">
      $$H_1 = X \cdot W_1 + b_1$$
    </div>

    <p class="text-blue-600 font-bold mb-2 mt-4">Lớp 2 (Hidden Layer 2):</p>
    <div class="formula-block-small my-2 p-3 bg-white border border-slate-300 rounded text-center font-mono">
      $$H_2 = H_1 \cdot W_2 + b_2$$
    </div>
    <div class="formula-block-small my-2 p-3 bg-white border border-slate-300 rounded text-center font-mono">
      $$= (X \cdot W_1 + b_1) \cdot W_2 + b_2$$
    </div>
    <div class="formula-block-small my-2 p-3 bg-white border border-slate-300 rounded text-center font-mono">
      $$= X \cdot (W_1 \cdot W_2) + (b_1 \cdot W_2 + b_2)$$
    </div>

    <p class="text-blue-600 font-bold mb-2 mt-4">Lớp 3 (Hidden Layer 3):</p>
    <div class="formula-block-small my-2 p-3 bg-white border border-slate-300 rounded text-center font-mono">
      $$H_3 = H_2 \cdot W_3 + b_3$$
    </div>
    <div class="formula-block-small my-2 p-3 bg-white border border-slate-300 rounded text-center font-mono">
      $$= X \cdot (W_1 \cdot W_2 \cdot W_3) + ...$$
    </div>

    <p class="text-yellow-800 font-bold mb-2 mt-4">RÚT GỌN TỔNG QUÁT:</p>
    <div class="formula-block-small my-2 p-3 bg-yellow-100 border border-yellow-400 rounded text-center font-mono">
      $$H_n = X \cdot W_{gop} + b_{gop}$$
    </div>
    <p class="mt-2">Trong đó: $W_{gop} = W_1 \cdot W_2 \cdot ... \cdot W_n$</p>
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
  <!-- 1.2. VAI TRÒ THIẾT YẾU CỦA ACTIVATION FUNCTION -->
  <!-- ========================================= -->
  <h3>1.2. Vai trò thiết yếu của Activation Function</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa: Activation Function (Hàm kích hoạt)</span>
    <p>Là một <strong>hàm phi tuyến tính</strong> được áp dụng sau mỗi neuron. Nó "bẻ cong" không gian tuyến tính — biến đường thẳng thành đường cong, cho phép mạng mô hình hóa các quan hệ phức tạp.</p>
    <p class="mt-2">Nó tạo ra các <strong>đa tạp cong</strong> (curved manifold) trong không gian ẩn (latent space), cho phép mạng nắm bắt được các quy luật phức tạp.</p>
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
      <p>Chính tính phi tuyến <strong>gấp khúc</strong> (dạng điểm gãy của ReLU) hay <strong>cong mượt</strong> (đường cong chữ S của Sigmoid) cho phép biến đổi không gian vector, tạo ra các vùng quyết định phi tuyến.</p>
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
// Hệ quả Toán học: Mạng nhiều lớp không có Activation = Mạng 1 lớp.
// Chứng minh bằng Rust: Giả lập 2 Layer không có hàm phi tuyến.
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

  <!-- DERIVATIVE DERIVATION FOR SIGMOID -->
  <div class="derivative-block my-6 p-5 bg-slate-50 border-2 border-slate-300 rounded-lg">
    <h4 class="font-bold text-slate-800 mb-4">📐 Đạo hàm của Sigmoid - Chi tiết từng bước</h4>

    <div class="space-y-4 text-sm">
      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 1: Viết lại hàm số dưới dạng hàm hợp</p>
        <p class="text-gray-600">Ta viết dưới dạng hàm hợp để áp dụng chain rule:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\sigma(x) = (1 + e^{-x})^{-1}$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 2: Áp dụng Chain Rule</p>
        <p class="text-gray-600">Chain rule (quy tắc dây chuyền):</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$y = f(g(x))$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$y' = f'(g(x)) \\cdot g'(x)$$
        </div>
        <p class="text-gray-600 mt-2">Áp dụng:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\sigma'(x) = -1 (1 + e^{-x})^{-2} (-e^{-x})$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 3: Tính đạo hàm của mẫu số</p>
        <p class="text-gray-600">Đạo hàm của $e^u$ với $u = -x$:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\frac{d(e^u)}{dx} = e^u \cdot u' = e^{-x} \cdot (-1) = -e^{-x}$$
        </div>
        <p class="text-gray-600 mt-2">Vậy:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\frac{d}{dx}(1 + e^{-x}) = 0 + (-e^{-x}) = -e^{-x}$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 4: Kết hợp các thành phần</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\sigma'(x) = -1 (1 + e^{-x})^{-2} (-e^{-x})$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\sigma'(x) = e^{-x} (1 + e^{-x})^{-2}$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 5: Biến đổi về dạng gọn hơn</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\sigma'(x) = \frac{e^{-x}}{(1 + e^{-x})^2}$$
        </div>
        <p class="text-gray-600 mt-2">Nhân tử và mẫu với $e^x$:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\sigma'(x) = \frac{1 \cdot e^{-x}}{e^x \cdot (1 + e^{-x})^2} = \frac{1}{e^x + 1} \cdot \frac{e^x}{e^x + 1}$$
        </div>
        <p class="text-gray-600 mt-2">Vì $\sigma(x) = \frac{1}{1+e^{-x}} = \frac{e^x}{e^x+1}$, ta có:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\sigma'(x) = \sigma(x) \cdot (1 - \sigma(x))$$
        </div>
      </div>
    </div>

    <div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500">
      <p class="font-semibold">Ý nghĩa:</p>
      <p class="text-sm mt-1">Đạo hàm σ'(x) được biểu diễn hoàn toàn qua σ(x), không cần tính riêng. Trong code, ta chỉ cần lưu output σ(x) từ forward pass để tính đạo hàm ở backward pass.</p>
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

  <!-- DERIVATIVE DERIVATION FOR TANH -->
  <div class="derivative-block my-6 p-5 bg-slate-50 border-2 border-slate-300 rounded-lg">
    <h4 class="font-bold text-slate-800 mb-4">📐 Đạo hàm của Tanh - Chi tiết từng bước</h4>

    <div class="space-y-4 text-sm">
      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 1: Viết tanh dưới dạng thương</p>
        <p class="text-gray-600">Tanh là hàm phân thức, áp dụng quotient rule:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\tanh(x) = \frac{u(x)}{v(x)}$$ với $u(x) = e^x - e^{-x}$, $v(x) = e^x + e^{-x}$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 2: Áp dụng Quotient Rule</p>
        <p class="text-gray-600">Quotient rule (quy tắc thương):</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\frac{d}{dx}\left(\frac{u}{v}\right) = \frac{u'v - uv'}{v^2}$$
        </div>
        <p class="text-gray-600 mt-2">Áp dụng vào tanh:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\tanh'(x) = \frac{(e^x + e^{-x})(e^x + e^{-x}) - (e^x - e^{-x})(e^x - e^{-x})}{(e^x + e^{-x})^2}$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 3: Khai triển tử số</p>
        <p class="text-gray-600">Tử số = $(e^x + e^{-x})^2 - (e^x - e^{-x})^2$</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$= (e^{2x} + 2 + e^{-2x}) - (e^{2x} - 2 + e^{-2x})$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$= e^{2x} + 2 + e^{-2x} - e^{2x} + 2 - e^{-2x}$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$= 4$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 4: Rút gọn</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\tanh'(x) = \frac{4}{(e^x + e^{-x})^2}$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 5: Biến đổi về dạng gọn</p>
        <p class="text-gray-600">Từ định nghĩa $\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$, ta có:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\tanh^2(x) = \left(\frac{e^x - e^{-x}}{e^x + e^{-x}}\right)^2 = \frac{e^{2x} - 2 + e^{-2x}}{e^{2x} + 2 + e^{-2x}}$$
        </div>
        <p class="text-gray-600 mt-2">Suy ra:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$1 - \tanh^2(x) = \frac{4}{e^{2x} + 2 + e^{-2x}}$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\tanh'(x) = 1 - \tanh^2(x)$$
        </div>
      </div>
    </div>

    <div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500">
      <p class="font-semibold">Ý nghĩa:</p>
      <p class="text-sm mt-1">Tương tự Sigmoid, đạo hàm tanh'(x) chỉ cần tanh(x) từ forward pass. Đặc biệt, max của tanh'(x) = 1 tại x = 0, lớn hơn Sigmoid (max = 0.25), nên gradient truyền tốt hơn nhưng vẫn bị vanishing khi |x| lớn.</p>
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

  <!-- DERIVATIVE DERIVATION FOR RELU -->
  <div class="derivative-block my-6 p-5 bg-slate-50 border-2 border-slate-300 rounded-lg">
    <h4 class="font-bold text-slate-800 mb-4">📐 Đạo hàm của ReLU - Chi tiết từng bước</h4>

    <div class="space-y-4 text-sm">
      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 1: Phân tích hàm số</p>
        <p class="text-gray-600">ReLU là hàm max của hai hàm tuyến tính: g(x) = 0 và h(x) = x</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$f(x) = \max(0, x)$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 2: Xét từng khoảng</p>
        <p class="text-gray-600">Khi x > 0: f(x) = x</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$f'(x) = \frac{d(x)}{dx} = 1$$
        </div>
        <p class="text-gray-600 mt-2">Khi x ≤ 0: f(x) = 0</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$f'(x) = \frac{d(0)}{dx} = 0$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 3: Xét tại x = 0</p>
        <p class="text-gray-600">Tính giới hạn hai phía:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\lim_{x \to 0^+} f'(x) = \lim_{x \to 0^+} 1 = 1$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\lim_{x \to 0^-} f'(x) = \lim_{x \to 0^-} 0 = 0$$
        </div>
        <p class="text-gray-600 mt-2">Hai giới hạn một phía khác nhau → hàm không khả vi tại x = 0</p>
        <p class="text-gray-600 mt-2">Trong thực tế, ta quy ước đạo hàm tại x = 0 bằng 0 hoặc 1</p>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 4: Tổng hợp</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$f'(x) = \begin{cases} 1 & x > 0 \\ 0 & x \leq 0 \end{cases}$$
        </div>
      </div>
    </div>

    <div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500">
      <p class="font-semibold">Điểm quan trọng:</p>
      <ul class="text-sm mt-1 list-disc pl-4">
        <li>ReLU <strong>không khả vi</strong> tại x = 0 (điểm gãy)</li>
        <li>Trong deep learning, ta thường <strong>quy ướt</strong> f'(0) = 0 hoặc f'(0) = 1 (không ảnh hưởng đáng kể)</li>
        <li>Đạo hàm = 1 cho x > 0 → <strong>không có vanishing gradient</strong></li>
        <li>Đạo hàm = 0 cho x ≤ 0 → <strong>gradient bị chặn đứng</strong> (nguyên nhân của Dead ReLU)</li>
      </ul>
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
      <p class="mt-2">Neuron đó không bao giờ được cập nhật lại và mất hoàn toàn khả năng học.</p>
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
  // =====================================================
  // BÀI 5: GELU - Hàm Kích Hoạt Của Transformers
  // =====================================================
  {
    id: 'ch21_03_04',
    title: '4. GELU - Hàm Kích Hoạt Của Transformers',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">auto_awesome</span> 4. GELU - Hàm Kích Hoạt Của Transformers</h2>

  <p>GELU (Gaussian Error Linear Unit) là hàm kích hoạt được sử dụng rộng rãi trong các mô hình Transformer hiện đại như BERT, GPT, RoBERTa. Hàm này có gradient trơn và thường có hiệu suất tốt hơn ReLU trong các tác vụ NLP.</p>

  <!-- ========================================= -->
  <!-- 4.1. ĐỊNH NGHĨA VÀ CÔNG THỨC -->
  <!-- ========================================= -->
  <h3>4.1. Định nghĩa và Công thức</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa</span>
    <p>GELU (Gaussian Error Linear Unit) là hàm kích hoạt kết hợp tính chất của phân phối chuẩn (Gaussian) với đơn vị tuyến tính (Linear Unit). Hàm này trơn tại mọi điểm, không có điểm gãy như ReLU.</p>
  </div>

  <div class="formula-block my-6 p-5 bg-purple-50 border-l-4 border-purple-500">
    <p class="font-bold text-purple-800 mb-3">Công thức GELU:</p>
    <div class="space-y-2 font-mono text-sm">
      <p class="text-lg">$\\text{GELU}(x) = x \\cdot \\Phi(x)$</p>
      <p class="text-gray-600">Trong đó Φ(x) là Cumulative Distribution Function (CDF) của phân phối chuẩn tiêu chuẩn</p>
      <hr class="my-2"/>
      <p class="text-gray-600">Công thức xấp xỉ (dùng trong code thực tế):</p>
      <p class="text-lg">$\\text{GELU}(x) \\approx 0.5x(1 + \\tanh(\\sqrt{2/\\pi}(x + 0.044715x^3)))$</p>
      <hr class="my-2"/>
      <p class="text-gray-600">Đạo hàm (với công thức xấp xỉ):</p>
      <p class="text-lg">$\\text{GELU}'(x) \\approx 0.5(1 + \\tanh(u)) + 0.5x(1 - \\tanh^2(u)) \\cdot \\sqrt{\\frac{2}{\\pi}}(1 + 3(0.044715)x^2)$</p>
      <p class="text-gray-600 text-xs mt-1">với $u = \\sqrt{2/\\pi}(x + 0.044715x^3)$</p>
    </div>
  </div>

  <!-- DERIVATIVE DERIVATION FOR GELU -->
  <div class="derivative-block my-6 p-5 bg-slate-50 border-2 border-slate-300 rounded-lg">
    <h4 class="font-bold text-slate-800 mb-4">📐 Đạo hàm của GELU - Chi tiết từng bước</h4>

    <div class="space-y-4 text-sm">
      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 1: Xác định hàm số</p>
        <p class="text-gray-600">GELU sử dụng công thức xấp xỉ:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $\text{GELU}(x) \approx 0.5x(1 + \tanh(u))$
        </div>
        <p class="text-gray-600 mt-2">với $u = \sqrt{\frac{2}{\pi}}(x + 0.044715x^3)$</p>
        <p class="text-gray-600">Đây là hàm hợp dạng tích: f(x) = 0.5x · (1 + tanh(u(x)))</p>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 2: Áp dụng Product Rule</p>
        <p class="text-gray-600">Product rule (quy tắc tích):</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\frac{d}{dx}[f \cdot g] = f' \cdot g + f \cdot g'$$
        </div>
        <p class="text-gray-600 mt-2">Đặt: $f(x) = 0.5x$, $g(x) = 1 + \tanh(u)$</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\text{GELU}'(x) = f'(x) \cdot g(x) + f(x) \cdot g'(x)$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 3: Tính f'(x)</p>
        <p class="text-gray-600">f(x) = 0.5x là hàm tuyến tính:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$f'(x) = 0.5$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 4: Tính g'(x) = (1 + tanh(u))'</p>
        <p class="text-gray-600">Áp dụng chain rule:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$g'(x) = \tanh'(u) \cdot u'$$
        </div>
        <p class="text-gray-600 mt-2">Với đạo hàm tanh: $\tanh'(u) = 1 - \tanh^2(u)$</p>
        <p class="text-gray-600 mt-2">Tính u': vì d(x³)/dx = 3x²</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$u' = \sqrt{\frac{2}{\pi}} (1 + 3 \cdot 0.044715 x^2)$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 5: Kết hợp</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\text{GELU}'(x) = 0.5(1 + \tanh(u)) + 0.5x(1 - \tanh^2(u)) \sqrt{\frac{2}{\pi}}(1 + 0.134145x^2)$$
        </div>
        <p class="text-gray-600 mt-2">với $u = \sqrt{2/\pi}(x + 0.044715x^3)$</p>
      </div>
    </div>

    <div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500">
      <p class="font-semibold">Điểm quan trọng:</p>
      <ul class="text-sm mt-1 list-disc pl-4">
        <li>GELU <strong>khả vi tại mọi điểm</strong> (trơn hoàn toàn)</li>
        <li>Đạo hàm tính phức tạp hơn ReLU nhiều (cần tanh, x²)</li>
        <li>Trong code, ta thường tính GELU và GELU' cùng lúc</li>
        <li>Với x lớn dương: GELU'(x) → 1; với x lớn âm: GELU'(x) → 0</li>
      </ul>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Ý nghĩa toán học</h4>
      <ul>
        <li>Φ(x) là xác suất để một biến ngẫu nhiên chuẩn nhỏ hơn x</li>
        <li>Khi x lớn dương → Φ(x) ≈ 1 → GELU(x) ≈ x</li>
        <li>Khi x lớn âm → Φ(x) ≈ 0 → GELU(x) ≈ 0</li>
        <li>Với x gần 0 → GELU(x) ≈ 0.5x (hàm linear)</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 5.2. SO SÁNH VỚI RELU -->
  <!-- ========================================= -->
  <h3>4.2. So sánh với ReLU</h3>

  <table class="comparison-table mb-6">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>ReLU</th>
        <th>GELU</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Công thức</td>
        <td>max(0, x)</td>
        <td>0.5x(1 + tanh(...))</td>
      </tr>
      <tr>
        <td>Đường cong</td>
        <td>Có điểm gãy tại x=0</td>
        <td>Mượt mà, khả vi tại mọi điểm</td>
      </tr>
      <tr>
        <td>Giá trị âm</td>
        <td>Luôn bằng 0</td>
        <td>Có thể âm nhẹ (≈ -0.17x)</td>
      </tr>
      <tr>
        <td>Tốc độ tính toán</td>
        <td>Rất nhanh</td>
        <td>Chậm hơn (cần tanh, exp)</td>
      </tr>
      <tr>
        <td>Hiệu năng NLP</td>
        <td>Tốt</td>
        <td>Tốt hơn</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-icon"><span class="material-symbols-outlined">lightbulb</span></div>
    <div class="callout-content">
      <span class="callout-title">Tại sao GELU tốt hơn cho NLP?</span>
      <p>GELU cho phép một lượng nhỏ tín hiệu âm đi qua ở vùng gần 0. Điều này giúp mô hình học được các pattern tinh tế hơn trong dữ liệu văn bản, nơi sự khác biệt giữa các từ/cụm từ rất nhỏ.</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 5.3. ỨNG DỤNG TRONG THỰC TẾ -->
  <!-- ========================================= -->
  <h3>4.3. Ứng dụng trong Thực tế</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Các Model sử dụng GELU</h4>
      <ul>
        <li><strong>BERT</strong> (Google)</li>
        <li><strong>GPT-2, GPT-3</strong> (OpenAI)</li>
        <li><strong>RoBERTa</strong> (Facebook)</li>
        <li><strong>DistilBERT</strong></li>
        <li><strong>T5</strong> (Text-to-Text)</li>
        <li><strong>ViT</strong> (Vision Transformer)</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Khi nào dùng GELU?</h4>
      <ul>
        <li>Transformer-based models</li>
        <li>Các bài toán NLP state-of-the-art</li>
        <li>Khi cần smooth gradient</li>
        <li>Thay thế ReLU trong hidden layers</li>
      </ul>
    </div>
  </div>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">school</span></div>
    <h3>Key Takeaway</h3>
    <ol class="list-decimal pl-6 space-y-2">
      <li><strong>GELU là lựa chọn mặc định</strong> cho các Transformer models hiện đại</li>
      <li><strong>Đặc điểm:</strong> Gradient trơn, cho phép giá trị âm nhẹ, hiệu suất cao trong NLP</li>
      <li><strong>Hạn chế:</strong> Tính toán phức tạp hơn ReLU</li>
      <li><strong>Chỉ dùng trong hidden layers</strong>, không dùng ở output layer</li>
    </ol>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// Rust Implementation: GELU Activation
// =====================================================

use ndarray::Array2;

/// GELU: Gaussian Error Linear Unit
/// GELU(x) = x * Phi(x) ≈ 0.5 * x * (1 + tanh(sqrt(2/π) * (x + 0.044715 * x^3)))
fn gelu(x: &Array2<f64>) -> Array2<f64> {
    let sqrt_2_over_pi = (2.0_f64 / std::f64::consts::PI).sqrt();

    x.mapv(|v| {
        let x3 = v * v * v;
        let inner = sqrt_2_over_pi * (v + 0.044715 * x3);
        0.5 * v * (1.0 + inner.tanh())
    })
}

fn main() {
    println!("=== GELU Activation Function Demo ===\\n");

    let x_values = vec![-3.0, -2.0, -1.0, -0.5, 0.0, 0.5, 1.0, 2.0, 3.0];

    println!("Input (x)    | ReLU(x)    | GELU(x)");
    println!("-------------|------------|-------------");

    for &x in &x_values {
        let relu = x.max(0.0);

        // Calculate GELU manually
        let sqrt_2_over_pi = (2.0_f64 / std::f64::consts::PI).sqrt();
        let x3 = x * x * x;
        let inner = sqrt_2_over_pi * (x + 0.044715 * x3);
        let gelu = 0.5 * x * (1.0 + inner.tanh());

        println!("{:>10.2}  | {:>10.4} | {:>10.4}", x, relu, gelu);
    }

    println!("\\n=== Key Observations ===");
    println!("- GELU(x) ≈ x for large positive x (like ReLU)");
    println!("- GELU(x) ≈ 0 for large negative x (like ReLU)");
    println!("- GELU has SMOOTH transition at x=0 (unlike ReLU's hard cut)");
    println!("- GELU allows small NEGATIVE values for near-zero inputs");
}
`
  },
  // =====================================================
  // BÀI 6: Swish/SiLU - Self-Gated Activation
  // =====================================================
  {
    id: 'ch21_03_05',
    title: '5. Swish/SiLU - Hàm Tự-Điều',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">auto_awesome</span> 5. Swish / SiLU - Hàm Tự-Điều Khiển (Self-Gated)</h2>

  <p>Swish được Google Research giới thiệu năm 2017 là hàm kích hoạt sử dụng cơ chế "self-gated" - sử dụng chính giá trị đầu vào để điều khiển mức kích hoạt mà không cần tham số bổ sung.</p>

  <!-- ========================================= -->
  <!-- 6.1. ĐỊNH NGHĨA -->
  <!-- ========================================= -->
  <h3>5.1. Định nghĩa và Công thức</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa</span>
    <p>Swish là hàm "self-gated" sử dụng chính giá trị đầu vào để điều khiển mức kích hoạt, thông qua phép nhân x với sigmoid(x).</p>
  </div>

  <div class="formula-block my-6 p-5 bg-pink-50 border-l-4 border-pink-500">
    <p class="font-bold text-pink-800 mb-3">Công thức Swish:</p>
    <div class="space-y-2 font-mono text-sm">
      <p class="text-lg">$\\text{Swish}(x) = x \\cdot \\sigma(\\beta x)$</p>
      <p class="text-gray-600">Trong đó σ là sigmoid: $\\sigma(x) = \\frac{1}{1 + e^{-x}}$</p>
      <hr class="my-2"/>
      <p class="text-gray-600">Dạng đơn giản (β = 1) - gọi là SiLU:</p>
      <p class="text-lg">$\\text{SiLU}(x) = \\frac{x}{1 + e^{-x}}$</p>
      <hr class="my-2"/>
      <p class="text-gray-600">Đạo hàm (với β = 1, SiLU):</p>
      <p class="text-lg">$\\text{SiLU}'(x) = \\sigma(x) + x \\cdot \\sigma(x)(1 - \\sigma(x))$</p>
      <p class="text-gray-600 text-xs mt-1">hoặc: $\\text{SiLU}'(x) = \\sigma(x)(1 + x(1 - \\sigma(x)))$</p>
    </div>
  </div>

  <!-- DERIVATIVE DERIVATION FOR SWISH/SILU -->
  <div class="derivative-block my-6 p-5 bg-slate-50 border-2 border-slate-300 rounded-lg">
    <h4 class="font-bold text-slate-800 mb-4">📐 Đạo hàm của SiLU (Swish với β=1) - Chi tiết từng bước</h4>

    <div class="space-y-4 text-sm">
      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 1: Xác định hàm số</p>
        <p class="text-gray-600">SiLU là hàm tích của x và sigmoid:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $\text{SiLU}(x) = x \cdot \sigma(x)$
        </div>
        <p class="text-gray-600 mt-2">với $\sigma(x) = \frac{1}{1 + e^{-x}}$ (sigmoid)</p>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 2: Áp dụng Product Rule</p>
        <p class="text-gray-600">Product rule (quy tắc tích):</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\frac{d}{dx}[f \cdot g] = f' \cdot g + f \cdot g'$$
        </div>
        <p class="text-gray-600 mt-2">Đặt: $f(x) = x$, $g(x) = \sigma(x)$</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\text{SiLU}'(x) = f'(x) \cdot g(x) + f(x) \cdot g'(x)$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 3: Tính f'(x) và g'(x)</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$f'(x) = \frac{dx}{dx} = 1$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$g'(x) = \sigma'(x) = \sigma(x)(1 - \sigma(x))$$ (đạo hàm sigmoid)
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 4: Kết hợp</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\text{SiLU}'(x) = 1 \cdot \sigma(x) + x \cdot \sigma(x)(1 - \sigma(x))$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\text{SiLU}'(x) = \sigma(x) + x \cdot \sigma(x)(1 - \sigma(x))$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\text{SiLU}'(x) = \sigma(x)[1 + x(1 - \sigma(x))]$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 5: Phân tích đạo hàm</p>
        <p class="text-gray-600">Đạo hàm SiLU gồm 2 term:</p>
        <p class="text-gray-600 mt-2">Term 1: $\sigma(x)$ - luôn dương</p>
        <p class="text-gray-600">Term 2: $x \cdot \sigma(x)(1 - \sigma(x))$ - có thể âm hoặc dương</p>
        <p class="text-gray-600 mt-2">Đây là lý do SiLU là <strong>non-monotonic</strong>: derivative có thể âm với x âm</p>
      </div>
    </div>

    <div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500">
      <p class="font-semibold">Điểm quan trọng:</p>
      <ul class="text-sm mt-1 list-disc pl-4">
        <li>Đạo hàm SiLU phức tạp hơn ReLU nhưng đơn giản hơn GELU</li>
        <li>Term thứ 2 ($x \cdot \sigma(x)(1-\sigma(x))$) cho phép gradient âm → <strong>non-monotonic</strong></li>
        <li>Với x = 0: SiLU'(0) = σ(0) + 0 = 0.5</li>
        <li>Với x lớn dương: SiLU'(x) → 1; với x lớn âm: SiLU'(x) → 0</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-icon"><span class="material-symbols-outlined">lightbulb</span></div>
    <div class="callout-content">
      <span class="callout-title">Swish vs SiLU</span>
      <p>Khi β = 1 (tham số cố định), Swish trở thành SiLU (Sigmoid Linear Unit). Trong thực tế, SiLU được sử dụng rộng rãi hơn vì hiệu suất tương đương mà không cần học tham số β.</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 6.2. TẠI SAO GỌI LÀ SELF-GATED? -->
  <!-- ========================================= -->
  <h3>5.2. Cơ chế "Self-Gated"</h3>

  <p>Thuật ngữ "gated" bắt nguồn từ kiến trúc LSTM/GRU, nơi các "cổng" quyết định lượng thông tin được truyền qua. Với Swish:</p>

  <ul class="steps-container">
    <li class="step-card">
      <div class="step-number" style="background-color: var(--primary-blue);">Bước 1</div>
      <p>Tính σ(x) = sigmoid(x) - giá trị từ 0 đến 1, đóng vai trò như "cổng" (gate)</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--secondary-blue);">Bước 2</div>
      <p>Nhân x với σ(x) - "cổng" này tự động điều chỉnh dựa trên x</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--warning-yellow);">Bước 3</div>
      <p>Kết quả: x lớn → cổng mở (σ ≈ 1); x nhỏ → cổng đóng (σ ≈ 0)</p>
    </li>
  </ul>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>So sánh với các hàm khác</h4>
      <ul>
        <li><strong>vs ReLU:</strong> Swish mượt mà hơn, có giá trị âm nhẹ</li>
        <li><strong>vs GELU:</strong> Công thức đơn giản hơn, hiệu suất tương đương</li>
        <li><strong>vs Sigmoid:</strong> Không bị vanishing gradient nghiêm trọng</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 6.3. ỨNG DỤNG -->
  <!-- ========================================= -->
  <h3>5.3. Ứng dụng trong Thực tế</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Các Model sử dụng Swish/SiLU</h4>
      <ul>
        <li><strong>Swish</strong> (Google, 2017) - nghiên cứu gốc</li>
        <li><strong>Swin Transformer</strong></li>
        <li><strong>EfficientNet</strong></li>
        <li><strong>MobileNetV3</strong></li>
        <li><strong>Mish</strong> (biến thể của Swish)</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Khi nào dùng Swish/SiLU?</h4>
      <ul>
        <li>Thay thế ReLU trong hidden layers</li>
        <li>Vision models (CNNs)</li>
        <li>Khi cần smooth non-monotonic activation</li>
        <li>Mobile/Edge models (MobileNetV3)</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 6.4. MISH - BIẾN THỂ -->
  <!-- ========================================= -->
  <h3>5.4. Biến thể: Mish</h3>

  <div class="formula-block my-6 p-5 bg-orange-50 border-l-4 border-orange-500">
    <p class="font-bold text-orange-800 mb-3">Mish = Self-Regularizing Swish:</p>
    <div class="space-y-2 font-mono text-sm">
      <p class="text-lg">$\\text{Mish}(x) = x \\cdot \\tanh(\\ln(1 + e^x))$</p>
      <p class="text-gray-600">Đây là biến thể tự-regularize của Swish, đôi khi cho hiệu suất tốt hơn</p>
    </div>
  </div>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">school</span></div>
    <h3>Key Takeaway</h3>
    <ol class="list-decimal pl-6 space-y-2">
      <li><strong>Swish/SiLU</strong> là hàm self-gated - tự điều chỉnh không cần tham số</li>
      <li><strong>Đặc điểm:</strong> Trơn, non-monotonic, hiệu suất tốt</li>
      <li><strong>Hạn chế:</strong> Tính toán phức tạp hơn ReLU</li>
      <li><strong>SiLU (β=1)</strong> được sử dụng phổ biến hơn Swish</li>
      <li><strong>Mish</strong> là biến thể tự-regularize của Swish</li>
    </ol>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// Rust Implementation: Swish/SiLU Activation
// =====================================================

use ndarray::Array2;

/// Swish: x * sigmoid(beta * x)
/// When beta = 1, this is SiLU (Sigmoid Linear Unit)
fn swish(x: &Array2<f64>, beta: f64) -> Array2<f64> {
    x.mapv(|v| {
        v * (beta * v).exp() / (1.0 + (beta * v).exp())
    })
}

/// SiLU: Swish with beta = 1 (most common in practice)
fn silu(x: &Array2<f64>) -> Array2<f64> {
    x.mapv(|v| {
        v / (1.0 + (-v).exp())
    })
}

/// Mish: x * tanh(softplus(x))
fn mish(x: &Array2<f64>) -> Array2<f64> {
    x.mapv(|v| {
        let softplus = (1.0 + (-v).exp()).ln();
        v * softplus.tanh()
    })
}

fn main() {
    println!("=== Swish/SiLU/Mish Activation Functions Demo ===\\n");

    let x_values = vec![-3.0, -2.0, -1.0, -0.5, 0.0, 0.5, 1.0, 2.0, 3.0];

    println!("Input(x) |  ReLU  |  SiLU  |  Mish  | Swish(β=2)");
    println!("---------|--------|--------|--------|------------");

    for &x in &x_values {
        let relu = x.max(0.0);
        let silu_val = x / (1.0 + (-x).exp());
        let softplus = (1.0 + (-x).exp()).ln();
        let mish_val = x * softplus.tanh();
        let swish_val = x * (2.0 * x).exp() / (1.0 + (2.0 * x).exp());

        println!("{:>7.2} | {:>6.3} | {:>6.3} | {:>6.3} | {:>9.3}",
                 x, relu, silu_val, mish_val, swish_val);
    }

    println!("\\n=== Key Observations ===");
    println!("- SiLU(x) = Swish(x) with beta = 1 (most common)");
    println!("- SiLU has SMOOTH curve unlike ReLU's hard cut");
    println!("- SiLU allows NEGATIVE values for small negative inputs");
    println!("- Mish is a self-regularizing variant of SiLU");
    println!("- Swish/SiLU are NON-MONOTONIC (can decrease then increase)");
}
`
  },
  {
    id: 'ch21_03_06',
    title: '6. Softmax - Hàm Kích Hoạt Output Layer',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">auto_awesome</span> 6. Softmax - Hàm Kích Hoạt Cho Lớp Xuất (Output Layer)</h2>

  <p>Phần này sẽ khám phá Softmax — hàm activation không thể thiếu ở output layer cho bài toán phân loại đa lớp (multi-class classification).</p>

  <!-- ========================================= -->
  <!-- 6.1. SOFTMAX -->
  <!-- ========================================= -->
  <h3>6.1. Softmax - Hàm kích hoạt cho lớp Output</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa</span>
    <p>Softmax là hàm kích hoạt biến đổi một vector thành phân phối xác suất, trong đó tổng các giá trị output bằng 1. Hàm này được sử dụng chủ yếu cho bài toán phân loại đa lớp (multi-class classification).</p>
  </div>

  <div class="formula-block my-6 p-5 bg-blue-50 border-l-4 border-blue-500">
    <p class="font-bold text-blue-800 mb-3">Công thức Softmax:</p>
    <div class="space-y-2 font-mono text-sm">
      <p class="text-lg">$\\text{softmax}(x)_i = \\frac{e^{x_i}}{\\sum_j e^{x_j}}$</p>
      <p class="text-gray-600 mt-2">Với i chạy qua tất cả các lớp. Output nằm trong khoảng (0, 1) và tổng = 1.</p>
      <hr class="my-2"/>
      <p class="text-gray-600">Đạo hàm (Jacobian):</p>
      <p class="text-lg">$\\frac{\\partial \\text{softmax}_i}{\\partial x_j} = \\text{softmax}_i \\cdot (\\delta_{ij} - \\text{softmax}_j)$</p>
      <p class="text-gray-600 text-xs mt-1">δ_ij = 1 nếu i = j, = 0 nếu i ≠ j</p>
    </div>
  </div>

  <!-- DERIVATIVE DERIVATION FOR SOFTMAX -->
  <div class="derivative-block my-6 p-5 bg-slate-50 border-2 border-slate-300 rounded-lg">
    <h4 class="font-bold text-slate-800 mb-4">📐 Đạo hàm của Softmax - Chi tiết từng bước</h4>

    <div class="space-y-4 text-sm">
      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 1: Xác định đây là hàm vector</p>
        <p class="text-gray-600">Softmax là hàm từ $\mathbb{R}^n \to \mathbb{R}^n$:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\text{softmax}(x) = [\text{softmax}_1, \text{softmax}_2, ..., \text{softmax}_n]$$
        </div>
        <p class="text-gray-600 mt-2">Đạo hàm của hàm vector là <strong>ma trận Jacobian</strong></p>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 2: Xét trường hợp i = j</p>
        <p class="text-gray-600">Áp dụng Quotient Rule:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\frac{\partial \text{softmax}_i}{\partial x_i} = \frac{e^{x_i} \cdot \sum_j e^{x_j} - e^{x_i} \cdot e^{x_i}}{(\sum_j e^{x_j})^2}$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$= \frac{e^{x_i}(\sum_j e^{x_j} - e^{x_i})}{(\sum_j e^{x_j})^2}$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$= \text{softmax}_i \cdot (1 - \text{softmax}_i)$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 3: Xét trường hợp i ≠ j</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\frac{\partial \text{softmax}_i}{\partial x_j} = \frac{0 \cdot \sum - e^{x_i} \cdot e^{x_j}}{(\sum e^{x_j})^2}$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$= -\frac{e^{x_i} \cdot e^{x_j}}{(\sum_j e^{x_j})^2}$$
        </div>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$= -\text{softmax}_i \cdot \text{softmax}_j$$
        </div>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 4: Tổng hợp bằng Kronecker Delta</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$\frac{\partial \text{softmax}_i}{\partial x_j} = \text{softmax}_i \cdot (\delta_{ij} - \text{softmax}_j)$$
        </div>
        <p class="text-gray-600 mt-2">với $\delta_{ij} = \begin{cases} 1 & i = j \\ 0 & i \neq j \end{cases}$</p>
      </div>

      <div class="step-derivation">
        <p class="font-semibold text-slate-700 mb-2">Bước 5: Ma trận Jacobian</p>
        <p class="text-gray-600">Ma trận Jacobian có dạng:</p>
        <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
          $$J = \begin{pmatrix} \text{softmax}_1(1-\text{softmax}_1) & -\text{softmax}_1\text{softmax}_2 & \cdots \\ -\text{softmax}_2\text{softmax}_1 & \text{softmax}_2(1-\text{softmax}_2) & \cdots \\ \vdots & \vdots & \ddots \end{pmatrix}$$
        </div>
      </div>
    </div>

    <div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500">
      <p class="font-semibold">Điểm quan trọng:</p>
      <ul class="text-sm mt-1 list-disc pl-4">
        <li>Đạo hàm Softmax phụ thuộc <strong>tất cả các phần tử</strong> trong vector (không như Sigmoid/Tanh)</li>
        <li>Đường chéo chính: softmax_i(1 - softmax_i) > 0</li>
        <li>Ngoài đường chéo: -softmax_i · softmax_j < 0</li>
        <li>Trong code, thường tính kết hợp với Cross-Entropy Loss: đạo hàm = softmax_i - y_i</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">warning</span></div>
    <div class="callout-content">
      <span class="callout-title">Lưu ý quan trọng về Softmax</span>
      <p>Softmax khuếch đại sự chênh lệch giữa các lớp: lớp có giá trị lớn nhất sẽ có xác suất cao hơn đáng kể. Hàm này không phù hợp cho bài toán hồi quy hay phân loại nhị phân.</p>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Ứng dụng</h4>
      <ul>
        <li>Multi-class Classification (C > 2)</li>
        <li>Output Layer duy nhất</li>
        <li>Output layer activation cho mạng phân loại ảnh, ngôn ngữ</li>
        <li>Kết hợp với Cross-Entropy Loss</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Hạn chế</h4>
      <ul>
        <li>Phân loại nhị phân (nên dùng Sigmoid)</li>
        <li>Bài toán hồi quy (Regression)</li>
        <li>Hidden Layers</li>
        <li>Phân loại đa nhãn (Multi-label)</li>
      </ul>
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
      <li>GELU/Swish — thế hệ activation phổ biến trong Transformers và LLM hiện đại.</li>
      <li>Softmax — hàm kích hoạt chuẩn cho lớp Output trong phân loại đa lớp.</li>
    </ul>
  `,
  lessons: ch21_03_lessons,
};

export default ch21_03;
