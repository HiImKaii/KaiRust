import { Lesson, Chapter } from '../../courses';

const ch22_03_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: BACKPROPAGATION THROUGH TIME (BPTT)
  // ==========================================================
  {
    id: 'ch22_03_01',
    title: '1. Backpropagation Through Time (BPTT)',
    duration: '30 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Backpropagation Through Time (BPTT)</h2>

  <p>Ở Bài 22.2, ta đã biết cách <strong>forward pass</strong> tính loss. Bây giờ câu hỏi là: <strong>làm sao cập nhật weights để loss giảm?</strong> Đáp án là thuật toán <strong>Backpropagation Through Time (BPTT)</strong> — mở rộng của backpropagation thông thường, áp dụng cho RNN bằng cách "quay ngược thời gian" để tính gradient.</p>

  <div class="image-showcase">
    <img src="/images/ch22/bptt_gradient_flow.png" alt="BPTT Gradient Flow" />
    <div class="image-caption">Sơ đồ BPTT: Forward pass đi thuận (trái→phải), Backward pass truyền gradient ngược (phải→trái) qua chuỗi thời gian</div>
  </div>

  <h3>1.1. Ý tưởng cốt lõi: Unrolling + Backprop</h3>

  <div class="definition-block">
    <span class="definition-term">BPTT = Backprop trên RNN đã "mở cuộn"</span>
    <p>RNN được "unroll" (mở cuộn) thành một mạng feedforward sâu, mỗi bước thời gian tương ứng 1 layer. Tất cả các layer này <strong>chia sẻ chung bộ weights</strong> (W_xh, W_hh, W_hy). Sau đó, áp dụng backpropagation bình thường trên mạng đã mở cuộn này.</p>
  </div>

  <p>Quá trình BPTT gồm 3 bước:</p>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Forward Pass toàn bộ chuỗi</h4>
        <p>Tính $h_1, h_2, ..., h_T$ và $y_1, y_2, ..., y_T$. Tính loss tại mỗi bước: $L_t = -\\log(\\hat{y}_t[\\text{target}_t])$. Tổng loss: $L = \\frac{1}{T}\\sum_{t=1}^{T} L_t$.</p>
        <p><strong>Lưu ý:</strong> Phải lưu tất cả $h_t$ trung gian vì cần cho backward pass.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Backward Pass — Truyền gradient ngược thời gian</h4>
        <p>Bắt đầu từ $t = T$, tính gradient $\\frac{\\partial L}{\\partial W}$ bằng chain rule. Gradient "chảy ngược" qua từng bước thời gian: $t=T \\rightarrow t=T{-}1 \\rightarrow ... \\rightarrow t=1$.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Tổng hợp gradient và cập nhật</h4>
        <p>Vì weights được chia sẻ qua tất cả bước thời gian, gradient tổng = <strong>tổng gradient tại mỗi bước</strong>: $\\frac{\\partial L}{\\partial W} = \\sum_{t=1}^{T} \\frac{\\partial L_t}{\\partial W}$. Sau đó cập nhật: $W \\leftarrow W - \\eta \\cdot \\frac{\\partial L}{\\partial W}$.</p>
      </div>
    </div>
  </div>

  <h3>1.2. Chain Rule qua thời gian — "Chuỗi xích" gradient</h3>

  <p>Phần phức tạp nhất của BPTT là tính $\\frac{\\partial L_t}{\\partial W_{hh}}$, vì $W_{hh}$ ảnh hưởng đến $h_t$ không chỉ trực tiếp, mà còn gián tiếp qua $h_{t-1}, h_{t-2}, ..., h_1$.</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Gradient của $L_t$ theo $W_{hh}$:</h4>
    <p class="font-mono text-lg">$\\frac{\\partial L_t}{\\partial W_{hh}} = \\sum_{k=1}^{t} \\frac{\\partial L_t}{\\partial h_t} \\cdot \\frac{\\partial h_t}{\\partial h_k} \\cdot \\frac{\\partial h_k}{\\partial W_{hh}}$</p>
    <p>Trong đó, <strong>chuỗi xích gradient</strong> từ $h_t$ về $h_k$:</p>
    <p class="font-mono text-lg">$\\frac{\\partial h_t}{\\partial h_k} = \\prod_{i=k+1}^{t} \\frac{\\partial h_i}{\\partial h_{i-1}}$</p>
  </div>

  <p>Mỗi thừa số $\\frac{\\partial h_i}{\\partial h_{i-1}}$ trong tích trên chính là:</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-mono text-lg">$\\frac{\\partial h_i}{\\partial h_{i-1}} = \\text{diag}(1 - h_i^2) \\cdot W_{hh}$</p>
    <p>Với $\\text{diag}(1 - h_i^2)$ là đạo hàm của hàm tanh (dạng ma trận đường chéo). Mỗi phần tử $(1 - h_i^2) \\in [0, 1]$.</p>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Tại sao chuỗi tích này quan trọng?</span>
      <p>Gradient tổng phải tính <strong>tích liên tiếp</strong> (product) của $(t - k)$ ma trận. Khi chuỗi dài ($t - k$ lớn), tích này sẽ bị nhân liên tục nhiều lần → dẫn đến 2 vấn đề nghiêm trọng: <strong>Vanishing Gradient</strong> (gradient biến mất) hoặc <strong>Exploding Gradient</strong> (gradient bùng nổ).</p>
    </div>
  </div>

  <h3>1.3. diag() — Ma trận đường chéo</h3>

  <p>Trong công thức BPTT, $\\text{diag}(1 - h_i^2)$ xuất hiện liên tục. Hãy hiểu rõ nó:</p>

  <div class="definition-block">
    <span class="definition-term">diag(v) biến 1 vector thành ma trận đường chéo</span>
    <p>Nếu $v = [a, b, c]$, thì:</p>
    <p>$\\text{diag}(v) = \\begin{bmatrix} a & 0 & 0 \\\\ 0 & b & 0 \\\\ 0 & 0 & c \\end{bmatrix}$</p>
    <p>Chỉ có giá trị trên đường chéo chính, tất cả ô khác bằng 0.</p>
  </div>

  <p>Ví dụ: nếu $h^{(t)} = [0.5, -0.3, 0.8]$:</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-mono">$1 - h^2 = [1 - 0.25,\\; 1 - 0.09,\\; 1 - 0.64] = [0.75,\\; 0.91,\\; 0.36]$</p>
    <p class="font-mono">$\\text{diag}(1 - h^2) = \\begin{bmatrix} 0.75 & 0 & 0 \\\\ 0 & 0.91 & 0 \\\\ 0 & 0 & 0.36 \\end{bmatrix}$</p>
    <p>Tại sao là ma trận đường chéo? Vì mỗi $h_i$ chỉ phụ thuộc $a_i$ (pre-activation) của chính nó — không ảnh hưởng lẫn nhau → các ô ngoài đường chéo = 0.</p>
  </div>

  <h3>1.4. Gradient của $h^{(t)}$ — Có 2 nguồn!</h3>

  <p>Đây là điểm khác biệt lớn so với Feedforward NN. Gradient tại $h^{(t)}$ đến từ <strong>2 con đường</strong>:</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>2 nguồn gradient cho $h^{(t)}$:</h4>
    <p class="font-mono text-lg">$\\nabla_{h^{(t)}} L = \\underbrace{V^T \\frac{\\partial L^{(t)}}{\\partial o^{(t)}}}_{ \\text{① từ output tại t}} + \\underbrace{W^T \\text{diag}(1 - h^{(t+1)\\,2}) \\nabla_{h^{(t+1)}} L}_{ \\text{② từ bước t+1}}$</p>
    <p><strong>Nguồn ①:</strong> gradient chảy từ output/loss tại bước t hiện tại.</p>
    <p><strong>Nguồn ②:</strong> gradient "chảy ngược" từ bước t+1 (recursive — phải tính từ cuối về đầu).</p>
  </div>

  <p>Tính từ cuối về đầu:</p>
  <ul>
    <li><strong>t=T</strong> (bước cuối): chỉ có nguồn ① (không có bước t+1): $\\nabla_{h^{(T)}} L = V^T \\frac{\\partial L^{(T)}}{\\partial o^{(T)}}$</li>
    <li><strong>t=T-1:</strong> cả ① lẫn ② (dùng $\\nabla_{h^{(T)}}$ vừa tính)</li>
    <li><strong>...ngược dần về t=1</strong></li>
  </ul>

  <h3>1.5. Thứ tự tính BPTT — 5 bước</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">①</div>
      <div class="step-content">
        <h4>$\\frac{\\partial L^{(t)}}{\\partial o^{(t)}} = \\hat{y}^{(t)} - y^{(t)}$ ← tính trước</h4>
        <p>Gradient tại output — đơn giản nhất. Ví dụ: $\\hat{y} = [0.66, 0.05, 0.29]$, đáp án đúng $y = [0, 1, 0]$ → gradient = $[0.66, -0.95, 0.29]$.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">②</div>
      <div class="step-content">
        <h4>$\\frac{\\partial L}{\\partial V} = \\sum_t \\frac{\\partial L^{(t)}}{\\partial o^{(t)}} \\cdot h^{(t)\\,T}$ ← không phụ thuộc thời gian</h4>
        <p>V chỉ kết nối h→output, không liên quan đến recurrence.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">③</div>
      <div class="step-content">
        <h4>$\\nabla_{h^{(t)}} L$ ← tính từ t=T ngược về t=1</h4>
        <p>Dùng công thức 2 nguồn ở trên. Đây là bước tốn thời gian nhất.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">④</div>
      <div class="step-content">
        <h4>$\\frac{\\partial L}{\\partial W} = \\sum_t \\text{diag}(1 - h^{(t)\\,2}) \\cdot \\nabla_{h^{(t)}} L \\cdot h^{(t-1)\\,T}$ ← gom từ mọi bước</h4>
        <p>Đạo hàm $W \\cdot h^{(t-1)}$ theo $W$ ra $h^{(t-1)\\,T}$ — tương tự FNN.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">⑤</div>
      <div class="step-content">
        <h4>$\\frac{\\partial L}{\\partial U} = \\sum_t \\text{diag}(1 - h^{(t)\\,2}) \\cdot \\nabla_{h^{(t)}} L \\cdot x^{(t)\\,T}$ ← giống W, thay $h^{(t-1)}$ bằng $x^{(t)}$</h4>
        <p>Vì $U$ nhân với $x^{(t)}$ trong forward pass.</p>
      </div>
    </div>
  </div>

  <h3>1.6. So sánh Backprop thường vs BPTT</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>Backprop (FNN)</th>
        <th>BPTT (RNN)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Cấu trúc</strong></td>
        <td>Layer 1 → Layer 2 → ... → Output</td>
        <td>t=1 → t=2 → ... → t=T (unrolled)</td>
      </tr>
      <tr>
        <td><strong>Weights</strong></td>
        <td>Mỗi layer có weights riêng</td>
        <td>Tất cả bước chia sẻ chung 1 bộ weights</td>
      </tr>
      <tr>
        <td><strong>Gradient</strong></td>
        <td>Tính qua các layers</td>
        <td>Tính qua các layers + qua thời gian</td>
      </tr>
      <tr>
        <td><strong>Gradient accumulation</strong></td>
        <td>Gradient mỗi layer tính riêng</td>
        <td>Gradient = tổng qua T bước thời gian</td>
      </tr>
      <tr>
        <td><strong>Complexity</strong></td>
        <td>O(depth)</td>
        <td>O(T × depth) — T = chiều dài chuỗi</td>
      </tr>
      <tr>
        <td><strong>Memory</strong></td>
        <td>Lưu activations mỗi layer</td>
        <td>Lưu tất cả $h_t$ qua T bước</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: VANISHING GRADIENT PROBLEM
  // ==========================================================
  {
    id: 'ch22_03_02',
    title: '2. Vanishing Gradient — Gradient biến mất',
    duration: '25 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Vanishing Gradient Problem — Khi RNN "mất trí nhớ"</h2>

  <p>Đây là vấn đề <strong>nghiêm trọng nhất</strong> của Vanilla RNN, được phát hiện bởi <strong>Hochreiter (1991)</strong> và phân tích kỹ bởi <strong>Bengio et al. (1994)</strong>. Nó giải thích tại sao RNN thất bại với chuỗi dài.</p>

  <div class="image-showcase">
    <img src="/images/ch22/vanishing_exploding_gradient.png" alt="Vanishing vs Exploding Gradient" />
    <div class="image-caption">So sánh Vanishing Gradient (gradient suy giảm theo cấp số nhân) và Exploding Gradient (gradient tăng theo cấp số nhân)</div>
  </div>

  <h3>2.1. Nguồn gốc toán học</h3>

  <p>Từ công thức BPTT, gradient chứa tích chuỗi:</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-mono text-lg">$\\frac{\\partial h_t}{\\partial h_k} = \\prod_{i=k+1}^{t} \\text{diag}(1 - h_i^2) \\cdot W_{hh}$</p>
  </div>

  <p>Xét norm (độ lớn) của tích này:</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-mono text-lg">$\\left\\| \\frac{\\partial h_t}{\\partial h_k} \\right\\| \\leq \\prod_{i=k+1}^{t} \\| \\text{diag}(1 - h_i^2) \\| \\cdot \\| W_{hh} \\|$</p>
  </div>

  <p>Ta có 2 yếu tố nhân liên tục:</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Yếu tố 1: Đạo hàm tanh</h4>
      <p>$\\text{tanh}'(z) = 1 - \\tanh^2(z) \\in [0, 1]$</p>
      <p>Giá trị $\\tanh'(z) = 1$ chỉ khi $z = 0$. Thực tế, hầu hết các phần tử $h_i$ khác 0, nên $\\tanh'$ thường <strong>nhỏ hơn 1 đáng kể</strong>.</p>
      <p>Ví dụ: nếu $h_i = 0.9$ thì $1 - 0.9^2 = 0.19$.</p>
    </div>
    <div class="concept-card">
      <h4>Yếu tố 2: Ma trận $W_{hh}$</h4>
      <p>Nếu <strong>eigenvalue lớn nhất</strong> (giá trị riêng) của $W_{hh}$ nhỏ hơn 1, thì phép nhân liên tục sẽ khiến gradient <strong>co lại theo cấp số nhân</strong>.</p>
      <p>Điều kiện: $\\|W_{hh}\\| \\cdot \\max(\\tanh') < 1$ → gradient vanishes.</p>
    </div>
  </div>

  <h3>2.2. Ví dụ số minh họa</h3>

  <p>Giả sử mỗi bước thời gian, gradient bị nhân với hệ số $\\gamma = 0.5$:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Khoảng cách (t − k)</th>
        <th>Hệ số gradient $\\gamma^{t-k}$</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1</strong></td>
        <td>0.5</td>
        <td>Gradient giảm 50% — vẫn có tín hiệu</td>
      </tr>
      <tr>
        <td><strong>5</strong></td>
        <td>$0.5^5$ = 0.031</td>
        <td>Chỉ còn 3% tín hiệu gốc</td>
      </tr>
      <tr>
        <td><strong>10</strong></td>
        <td>$0.5^{10}$ ≈ 0.001</td>
        <td>Gần như triệt tiêu — 0.1%</td>
      </tr>
      <tr>
        <td><strong>20</strong></td>
        <td>$0.5^{20}$ ≈ $10^{-6}$</td>
        <td>Biến mất hoàn toàn</td>
      </tr>
      <tr>
        <td><strong>50</strong></td>
        <td>$0.5^{50}$ ≈ $10^{-15}$</td>
        <td>Nhỏ hơn precision của float64</td>
      </tr>
    </tbody>
  </table>

  <h3>2.3. Hệ quả thực tế</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>RNN "quên" thông tin xa</h4>
      <p>Câu: <em>"Tôi lớn lên ở <strong>Pháp</strong>, học đại học ở Mỹ, làm việc tại Nhật, và bây giờ tôi nói tiếng ___"</em></p>
      <p>Đáp án: "Pháp" — nhưng thông tin này cách xa 15+ từ. Gradient từ vị trí "___" truyền ngược về "Pháp" gần như bằng 0 → RNN <strong>không thể học</strong> được liên kết này.</p>
    </div>
    <div class="concept-card">
      <h4>Chỉ học được pattern ngắn</h4>
      <p>Vanilla RNN thường chỉ "nhớ" được <strong>5-10 bước thời gian</strong> gần nhất. Mọi thông tin trước đó đều bị "quên". Đây là lý do Vanilla RNN thất bại trong các bài toán cần long-range dependency.</p>
      <p>Ví dụ thất bại: dịch máy câu dài, tóm tắt văn bản, phân tích cảm xúc đoạn dài.</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Giải pháp: LSTM và GRU</span>
      <p>Vấn đề Vanishing Gradient chính là lý do <strong>LSTM</strong> (1997) và <strong>GRU</strong> (2014) được phát minh. Cả hai dùng cơ chế "cổng" (gate) để kiểm soát dòng gradient, cho phép thông tin "chảy xuyên" qua nhiều bước thời gian mà không bị triệt tiêu. Chi tiết ở Bài 22.4 và 22.5.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: EXPLODING GRADIENT PROBLEM
  // ==========================================================
  {
    id: 'ch22_03_03',
    title: '3. Exploding Gradient — Gradient bùng nổ',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Exploding Gradient Problem — Khi Gradient "Phát Nổ"</h2>

  <p>Ngược lại với vanishing gradient: nếu tích $\\prod \\| \\text{diag}(1 - h_i^2) \\cdot W_{hh} \\|$ lớn hơn 1 tại mỗi bước, thì gradient sẽ <strong>tăng theo cấp số nhân</strong> khi truyền ngược qua thời gian.</p>

  <h3>3.1. Điều kiện xảy ra</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Exploding khi:</h4>
    <p class="font-mono text-lg">$\\| W_{hh} \\| \\cdot \\max(\\tanh') > 1$</p>
    <p>Với $\\| W_{hh} \\|$ là spectral norm (eigenvalue lớn nhất) của $W_{hh}$. Nếu eigenvalues > 1 và đạo hàm tanh chưa kịp "bù" (ở vùng gần 0, $\\tanh' \\approx 1$), gradient sẽ bùng nổ.</p>
  </div>

  <h3>3.2. Ví dụ số minh họa</h3>

  <p>Giả sử gradient được nhân với hệ số $\\gamma = 2.0$ mỗi bước:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Khoảng cách (t − k)</th>
        <th>Hệ số gradient $\\gamma^{t-k}$</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>5</strong></td>
        <td>$2^5$ = 32</td>
        <td>Tăng gấp 32 lần</td>
      </tr>
      <tr>
        <td><strong>10</strong></td>
        <td>$2^{10}$ = 1,024</td>
        <td>Gradient lớn gấp 1000 lần</td>
      </tr>
      <tr>
        <td><strong>20</strong></td>
        <td>$2^{20}$ ≈ $10^6$</td>
        <td>Triệu lần — weights update cực lớn</td>
      </tr>
      <tr>
        <td><strong>50</strong></td>
        <td>$2^{50}$ ≈ $10^{15}$</td>
        <td>Vượt quá phạm vi số thực — NaN / Inf</td>
      </tr>
    </tbody>
  </table>

  <h3>3.3. Triệu chứng nhận biết</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Trong quá trình training</h4>
      <ul>
        <li><strong>Loss = NaN hoặc Inf:</strong> Giá trị loss đột ngột nhảy lên vô cực</li>
        <li><strong>Loss dao động mạnh:</strong> Thay vì giảm dần, loss nhảy lên xuống thất thường</li>
        <li><strong>Weights phát nổ:</strong> Giá trị weights → ±∞, có thể kiểm tra bằng print max(abs(W))</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Hậu quả</h4>
      <ul>
        <li><strong>Model không hội tụ:</strong> Training thất bại hoàn toàn</li>
        <li><strong>Overflow số thực:</strong> float32 có max ≈ $3.4 \\times 10^{38}$, vượt quá sẽ thành Inf</li>
        <li><strong>Lan truyền NaN:</strong> Một khi xuất hiện NaN, nó lan sang tất cả weights → không thể recovery</li>
      </ul>
    </div>
  </div>

  <h3>3.4. So sánh: Vanishing vs Exploding</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>Vanishing Gradient</th>
        <th>Exploding Gradient</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Điều kiện</strong></td>
        <td>$\\|W_{hh}\\| \\cdot \\max(\\tanh') < 1$</td>
        <td>$\\|W_{hh}\\| \\cdot \\max(\\tanh') > 1$</td>
      </tr>
      <tr>
        <td><strong>Gradient</strong></td>
        <td>→ 0 theo cấp số nhân</td>
        <td>→ ∞ theo cấp số nhân</td>
      </tr>
      <tr>
        <td><strong>Dễ phát hiện?</strong></td>
        <td>Khó — model chỉ "học chậm"</td>
        <td>Dễ — model "nổ tung" (NaN, Inf)</td>
      </tr>
      <tr>
        <td><strong>Hậu quả</strong></td>
        <td>Không học được long-range dependency</td>
        <td>Training fail hoàn toàn</td>
      </tr>
      <tr>
        <td><strong>Giải pháp chính</strong></td>
        <td>LSTM / GRU (thay đổi kiến trúc)</td>
        <td>Gradient Clipping (kỹ thuật đơn giản)</td>
      </tr>
      <tr>
        <td><strong>Xảy ra phổ biến?</strong></td>
        <td>Rất phổ biến với Vanilla RNN</td>
        <td>Ít phổ biến hơn nhưng nghiêm trọng hơn</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Tại sao Exploding dễ sửa hơn Vanishing?</span>
      <p><strong>Exploding gradient</strong> có giải pháp đơn giản: <strong>gradient clipping</strong> — giới hạn gradient không vượt quá ngưỡng. Chỉ cần 1 dòng code. Nhưng <strong>vanishing gradient</strong> phải thay đổi hoàn toàn kiến trúc (LSTM/GRU) mới giải quyết được. Đó là lý do vanishing gradient là vấn đề "sinh tử" hơn.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: GRADIENT CLIPPING
  // ==========================================================
  {
    id: 'ch22_03_04',
    title: '4. Gradient Clipping — Kìm cương Gradient',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Gradient Clipping — Giải pháp cho Exploding Gradient</h2>

  <p>Gradient Clipping là kỹ thuật <strong>đơn giản nhưng cực kỳ hiệu quả</strong> để ngăn gradient bùng nổ. Ý tưởng: nếu gradient quá lớn, <strong>thu nhỏ nó</strong> về mức cho phép trước khi cập nhật weights. Kỹ thuật này được đề xuất bởi <strong>Pascanu, Mikolov, Bengio (2013)</strong>.</p>

  <h3>4.1. Hai cách Gradient Clipping</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Cách 1: Clip by Value</h4>
      <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
        <p class="font-mono text-lg">$g_i = \\text{clip}(g_i, -\\theta, \\theta)$</p>
      </div>
      <p>Từng phần tử gradient bị giới hạn trong khoảng $[-\\theta, \\theta]$.</p>
      <ul>
        <li>$g_i > \\theta$ → $g_i = \\theta$</li>
        <li>$g_i < -\\theta$ → $g_i = -\\theta$</li>
        <li>Ngược lại: giữ nguyên</li>
      </ul>
      <p><strong>Nhược điểm:</strong> Thay đổi hướng (direction) của gradient vector → có thể ảnh hưởng tới chất lượng optimization.</p>
    </div>
    <div class="concept-card">
      <h4>Cách 2: Clip by Norm (Phổ biến hơn)</h4>
      <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
        <p class="font-mono text-lg">Nếu $\\|g\\| > \\theta$:&nbsp; $g = g \\times \\frac{\\theta}{\\|g\\|}$</p>
      </div>
      <p>Nếu norm (độ dài) của gradient vector vượt ngưỡng $\\theta$, <strong>scale toàn bộ vector</strong> về độ dài $\\theta$.</p>
      <ul>
        <li>Giữ nguyên <strong>hướng</strong> (direction) của gradient</li>
        <li>Chỉ giảm <strong>độ lớn</strong> (magnitude)</li>
        <li>Nếu $\\|g\\| \\leq \\theta$: không thay đổi gì</li>
      </ul>
      <p><strong>Đây là phương pháp tiêu chuẩn</strong>, được dùng trong hầu hết framework (PyTorch, TensorFlow).</p>
    </div>
  </div>

  <h3>4.2. Trực giác: Hình dung Gradient Clipping</h3>

  <div class="definition-block">
    <span class="definition-term">Ẩn dụ: Tốc độ xe trên đường đèo</span>
    <p>Gradient = "tốc độ" cập nhật weights. Trên đường bằng phẳng (gradient nhỏ), xe chạy bình thường. Nhưng khi đổ dốc (gradient lớn), xe cần <strong>phanh</strong> để không lao xuống vực. Gradient clipping = <strong>giới hạn tốc độ tối đa</strong>: xe vẫn chạy đúng hướng (xuống dốc), nhưng không vượt quá tốc độ an toàn.</p>
  </div>

  <h3>4.3. Giá trị ngưỡng $\\theta$ thường dùng</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Giá trị $\\theta$</th>
        <th>Ngữ cảnh sử dụng</th>
        <th>Ghi chú</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1.0</strong></td>
        <td>Phổ biến nhất, mặc định trong nhiều paper</td>
        <td>Điểm bắt đầu tốt cho hầu hết bài toán</td>
      </tr>
      <tr>
        <td><strong>5.0</strong></td>
        <td>Language modeling (Merity et al., AWD-LSTM)</td>
        <td>Cho phép gradient lớn hơn → update mạnh hơn</td>
      </tr>
      <tr>
        <td><strong>0.25</strong></td>
        <td>VD: Transformer, fine-tuning nhỏ</td>
        <td>Conservative — ổn định nhưng chậm hội tụ</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Thực hành: RNN gần như LUÔN cần Gradient Clipping</span>
      <p>Khác với CNN hay FNN, <strong>RNN/LSTM/GRU cần gradient clipping như một thao tác bắt buộc</strong>. Nếu train RNN mà quên gradient clipping, model rất dễ bị NaN loss sau vài epoch. Đây là lý do mọi tutorial/framework đều mặc định bật clipping cho RNN.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// GRADIENT CLIPPING: Clip by Value vs Clip by Norm
// =====================================================
// Minh họa 2 cách clip gradient trong Rust
// =====================================================

fn main() {
    // Gradient vector (giả lập — gradient rất lớn do exploding)
    let gradient = vec![100.0, -200.0, 50.0, -150.0, 300.0];
    let threshold = 5.0;
    
    println!("╔═══════════════════════════════════════════════════╗");
    println!("║         GRADIENT CLIPPING DEMONSTRATION          ║");
    println!("╠═══════════════════════════════════════════════════╣");
    println!("║ Original gradient: {:?}", gradient);
    println!("║ Threshold θ = {}", threshold);
    println!("╠═══════════════════════════════════════════════════╣");
    
    // === CÁCH 1: Clip by Value ===
    let clipped_by_value: Vec<f64> = gradient.iter()
        .map(|&g| g.max(-threshold).min(threshold))
        .collect();
    
    let norm_original: f64 = gradient.iter().map(|g| g * g).sum::<f64>().sqrt();
    let norm_by_value: f64 = clipped_by_value.iter().map(|g| g * g).sum::<f64>().sqrt();
    
    println!("║");
    println!("║ [1] CLIP BY VALUE:");
    println!("║   Clipped: {:?}", clipped_by_value);
    println!("║   Norm trước: {:.2} → sau: {:.2}", norm_original, norm_by_value);
    println!("║   ⚠ Hướng gradient BỊ THAY ĐỔI!");
    
    // === CÁCH 2: Clip by Norm ===
    let norm: f64 = gradient.iter().map(|g| g * g).sum::<f64>().sqrt();
    let clipped_by_norm: Vec<f64> = if norm > threshold {
        let scale = threshold / norm;
        gradient.iter().map(|&g| g * scale).collect()
    } else {
        gradient.clone()
    };
    
    let norm_by_norm: f64 = clipped_by_norm.iter().map(|g| g * g).sum::<f64>().sqrt();
    
    println!("║");
    println!("║ [2] CLIP BY NORM:");
    println!("║   Clipped: [{:.4}, {:.4}, {:.4}, {:.4}, {:.4}]",
             clipped_by_norm[0], clipped_by_norm[1], clipped_by_norm[2],
             clipped_by_norm[3], clipped_by_norm[4]);
    println!("║   Norm trước: {:.2} → sau: {:.2}", norm, norm_by_norm);
    println!("║   ✓ Hướng gradient GIỮA NGUYÊN, chỉ scale magnitude!");
    
    // === So sánh hướng (cosine similarity) ===
    let dot_value: f64 = gradient.iter().zip(clipped_by_value.iter())
        .map(|(a, b)| a * b).sum();
    let cos_value = dot_value / (norm_original * norm_by_value);
    
    let dot_norm: f64 = gradient.iter().zip(clipped_by_norm.iter())
        .map(|(a, b)| a * b).sum();
    let cos_norm = dot_norm / (norm_original * norm_by_norm);
    
    println!("║");
    println!("╠═══════════════════════════════════════════════════╣");
    println!("║ Cosine similarity (1.0 = cùng hướng):");
    println!("║   Clip by Value: cos = {:.4}", cos_value);
    println!("║   Clip by Norm:  cos = {:.4} ← giữ nguyên hướng!", cos_norm);
    println!("╚═══════════════════════════════════════════════════╝");
}`
  },
  // ==========================================================
  // LESSON 5: TRUNCATED BPTT
  // ==========================================================
  {
    id: 'ch22_03_05',
    title: '5. Truncated BPTT & Tóm tắt',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. Truncated BPTT — Giải pháp thực tế cho chuỗi dài</h2>

  <p>Full BPTT yêu cầu backprop qua <strong>toàn bộ T bước thời gian</strong>. Với chuỗi dài (T = 1000+), đây là bất khả thi về cả bộ nhớ lẫn tốc độ. <strong>Truncated BPTT</strong> là giải pháp thực tiễn: chỉ backprop qua <strong>k bước gần nhất</strong> thay vì toàn bộ chuỗi.</p>

  <h3>5.1. Cách hoạt động</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Chia chuỗi thành các đoạn (chunks)</h4>
        <p>Chuỗi dài T bước được chia thành các đoạn, mỗi đoạn dài $k$ bước. Ví dụ: T=100, k=20 → 5 đoạn.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Forward pass liên tục</h4>
        <p>Forward pass vẫn chạy xuyên suốt: hidden state $h_t$ được truyền <strong>liên tục</strong> từ đoạn này sang đoạn sau (không reset). Điều này giúp mô hình <strong>vẫn "nhớ"</strong> thông tin từ các đoạn trước.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Backward pass bị cắt (truncated)</h4>
        <p>Gradient chỉ được truyền ngược <strong>trong phạm vi k bước</strong> của mỗi đoạn. Gradient KHÔNG chảy ngược qua ranh giới đoạn. Cập nhật weights sau mỗi đoạn.</p>
      </div>
    </div>
  </div>

  <h3>5.2. Trade-off: k nhỏ vs k lớn</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>k nhỏ (5-10)</th>
        <th>k trung bình (20-50)</th>
        <th>k lớn (100+)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Tốc độ</strong></td>
        <td>Nhanh</td>
        <td>Vừa phải</td>
        <td>Chậm</td>
      </tr>
      <tr>
        <td><strong>Bộ nhớ</strong></td>
        <td>Ít (chỉ lưu k hidden states)</td>
        <td>Vừa phải</td>
        <td>Nhiều</td>
      </tr>
      <tr>
        <td><strong>Long-range learning</strong></td>
        <td>Kém — chỉ "nhìn" 5-10 bước</td>
        <td>Khá — đủ cho hầu hết bài toán</td>
        <td>Tốt — gần bằng full BPTT</td>
      </tr>
      <tr>
        <td><strong>Gradient quality</strong></td>
        <td>Xấp xỉ thô — bias lớn</td>
        <td>Xấp xỉ tốt — bias nhỏ</td>
        <td>Gần chính xác — bias rất nhỏ</td>
      </tr>
      <tr>
        <td><strong>Vanishing gradient</strong></td>
        <td>Ít ảnh hưởng (k nhỏ)</td>
        <td>Ảnh hưởng vừa phải</td>
        <td>Ảnh hưởng lớn (cần LSTM/GRU)</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Giá trị k phổ biến trong thực tế</span>
      <ul>
        <li><strong>k = 20-35:</strong> Language modeling (Merity et al., 2017 — AWD-LSTM)</li>
        <li><strong>k = 50-100:</strong> Machine translation (trước thời Transformer)</li>
        <li><strong>k = 200:</strong> Music generation (cần pattern dài)</li>
      </ul>
      <p>Thông thường, <strong>k = 20-50</strong> là điểm cân bằng tốt giữa hiệu suất và khả năng học.</p>
    </div>
  </div>

  <h3>5.3. So sánh 3 phương pháp BPTT</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Phương pháp</th>
        <th>Gradient qua bao nhiêu bước?</th>
        <th>Ưu điểm</th>
        <th>Nhược điểm</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Full BPTT</strong></td>
        <td>Toàn bộ T bước</td>
        <td>Gradient chính xác</td>
        <td>Tốn bộ nhớ O(T), chậm, dễ vanish/explode</td>
      </tr>
      <tr>
        <td><strong>Truncated BPTT</strong></td>
        <td>k bước gần nhất</td>
        <td>Thực tế, kiểm soát được memory</td>
        <td>Gradient xấp xỉ, mất long-range info</td>
      </tr>
      <tr>
        <td><strong>BPTT + LSTM/GRU</strong></td>
        <td>k bước, nhưng cell state "nhớ" xa hơn</td>
        <td>Thực tế + hiệu quả nhất</td>
        <td>Kiến trúc phức tạp hơn Vanilla RNN</td>
      </tr>
    </tbody>
  </table>

  <hr />

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 22.3 — BPTT & Vấn Đề Gradient</h3>
    <ul>
      <li><strong>BPTT:</strong> Backprop trên RNN đã unroll. Gradient = tổng qua tất cả bước thời gian. Chain rule tạo ra tích chuỗi $\\prod \\frac{\\partial h_i}{\\partial h_{i-1}}$</li>
      <li><strong>Vanishing Gradient:</strong> Khi $\\|W_{hh}\\| \\cdot \\max(\\tanh') < 1$, gradient → 0 theo cấp số nhân. RNN "quên" thông tin xa. Giải pháp: LSTM/GRU</li>
      <li><strong>Exploding Gradient:</strong> Khi $\\|W_{hh}\\| \\cdot \\max(\\tanh') > 1$, gradient → ∞. Training fail (NaN). Giải pháp: Gradient Clipping</li>
      <li><strong>Gradient Clipping:</strong> Clip by norm — giữ hướng gradient, chỉ giảm magnitude. Ngưỡng phổ biến: $\\theta = 1.0$ hoặc $5.0$</li>
      <li><strong>Truncated BPTT:</strong> Chỉ backprop k bước gần nhất. Forward pass vẫn liên tục. k=20-50 là giá trị thường dùng</li>
    </ul>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Bài tiếp theo</span>
      <p>Bài 22.4 sẽ giải phẫu <strong>LSTM (Long Short-Term Memory)</strong> — kiến trúc được thiết kế đặc biệt để giải quyết vanishing gradient bằng cơ chế <strong>Cell State</strong> và 3 cổng: <strong>Forget Gate, Input Gate, Output Gate</strong>.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch22_03: Chapter = {
  id: 'ch22_03',
  title: '22.3. BPTT & Vấn Đề Gradient — Nút Thắt Sinh Tử',
  introduction: 'Thuật toán Backpropagation Through Time, Vanishing & Exploding Gradient, Gradient Clipping, và Truncated BPTT.',
  lessons: ch22_03_lessons,
};

export default ch22_03;
