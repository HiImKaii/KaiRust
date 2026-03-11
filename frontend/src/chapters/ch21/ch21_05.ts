// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 5: GRADIENT DESCENT & OPTIMIZERS - LUẬT TIẾN HÓA
//
// Mục tiêu học thuật:
// 1. Bản chất Đạo hàm (Derivatives) và Gradient.
// 2. Thuật toán thả dốc BGD, SGD, Mini-batch SGD.
// 3. Tiến hóa Optimizer: Momentum -> RMSprop -> Adam.
// 4. Kỹ xảo: Learning Rate Scheduling & Gradient Clipping.
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_05_lessons: Lesson[] = [
  {
    id: 'ch21_05_01',
    title: '1. Khái niệm Gradient - Quả Táo Rơi Lên Trời',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">terrain</span> 1. Khái niệm Gradient và Sự Rơi Tự Do</h2>

  <h3>1.1. Đạo hàm (Derivative) và Gradient là gì?</h3>
  <div class="definition-block mb-4">
    <p>Nếu hàm số chỉ có 1 biến $y = f(x)$, ta gọi $f'(x)$ là <strong>Đạo hàm</strong> (Trực giác: Ở vị trí $x$ này, nếu tôi nhích $x$ lên 1 li, $y$ sẽ dốc đầu đi lên hay cắm đầu đi xuống một khoảng bao nhiêu?).</p>
    <p>Nhưng Mạng neural có hàng triệu $Weight$, hàm loss $L = f(w_1, w_2, \\dots, w_n)$ là một hàm siêu đa biến mường tượng như đỉnh núi Thái Sơn nhấp nhô. Lúc này Tập hợp tất cả các đạo hàm riêng phần của từng $Weight$ được gom vào 1 Vector chung gọi là <strong>Gradient</strong>, ký hiệu là $\\nabla L$.</p>
    
    <div class="formula-block text-center mt-2 p-2 bg-blue-50 border-blue-200 text-blue-900 border text-sm">
      $\\nabla L = \\left[ \\frac{\\partial L}{\\partial w_1}, \\frac{\\partial L}{\\partial w_2}, \\dots, \\frac{\\partial L}{\\partial w_n} \\right]$
    </div>
  </div>

  <h3><span class="material-symbols-outlined">navigation</span> 1.2. Mũi tên Phản Trắc của Gradient</h3>
  <div class="callout callout-danger mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">north_east</span></div>
    <div class="callout-content">
      <strong>Về cơ bản toán học Thuần Túy:</strong>
      <p>Vector Gradient $\\nabla L$ luôn luôn, MÃI MÃI <strong>chỉ hướng ngược dốc lên cái Đỉnh dốc nhất (Steepest Ascent)</strong>.</p>
      <p>Nghĩa là nếu để mặc tự nhiên $W = W + \\nabla L$, Loss sẽ phi mã lên trời, mô hình AI sẽ nổ tung trong vài mili-giây.</p>
      
      <p class="mt-2 border-t pt-2 border-red-200"><strong>Thủ thuật của Machine Learning (Gradient Descent):</strong></p>
      <p>Vì chúng ta muốn tìm Đáy Thung Lũng (nơi $Loss = 0$), chúng ta CHỦ ĐỘNG GẮN DẤU TRỪ vào trước Gradient. Bẻ cổ mũi tên chĩa ngược xuống vực sâu!</p>
      <div class="font-mono bg-white p-2 text-center text-red-800 mt-2 border border-red-300">
        $W_{new} = W_{old} - \\eta \\cdot \\nabla L$
      </div>
      <p class="text-xs text-right mt-1 italic text-gray-500">(Trong đó $\\eta$ hay Alpha là Learning Rate - Sải chân vạn dặm)</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// MÔ PHỎNG SỰ TRẢ THÙ CỦA GRADIENT (AI SẼ CHẾT NẾU QUÊN DẤU TRỪ)
// =====================================================

// Hàm Loss parabol đơn giản: L = W^2
fn loss(w: f64) -> f64 { w * w }

// Gradient của L = W^2 là 2W
fn gradient(w: f64) -> f64 { 2.0 * w }

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║                 GRADIENT (DẤU CỘNG) VS DESCENT (DẤU TRỪ)             ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");
    
    // Xuất phát điểm: Trọng số W = 5.0 
    // Target nhắm tới để cực tiểu Loss là W = 0 vĩnh cữu.
    
    let lr = 0.1; // Sải chân Learning Rate
    
    println!("\\n[1] Thử nghiệm NGU NGỐC (Cộng Gradient):");
    let mut w_ngu = 5.0;
    for i in 1..=10 {
        let grad = gradient(w_ngu);
        w_ngu = w_ngu + (lr * grad); // QUÊN MẤT DẤU TRỪ THÁNH THẦN!
        println!("- Bước {}: W_mới = {:.2} -> Loss Tăng Lên: {:.2}", i, w_ngu, loss(w_ngu));
    }
    println!(">>> BÙMMMM! Weights phi mã vọt lên vũ trụ -> AI phát nổ (Divergence)!");
    
    println!("\\n[2] Gradient DESCENT (Tuyệt Học Của AI):");
    let mut w_khon = 5.0;
    for i in 1..=10 {
        let grad = gradient(w_khon);
        w_khon = w_khon - (lr * grad); // DẤU TRỪ BẺ LÁI VECTOR GRADIENT
        println!("- Bước {}: W_mới = {:.4} -> Loss Hạ Rơi Phanh: {:.4}", i, w_khon, loss(w_khon));
    }
    println!(">>> CHÂN LÝ: Giảm Mất Mát (Loss) thành công tới đáy Thung Lũng (Convergence)!");
}`
  },
  {
    id: 'ch21_05_02',
    title: '2. Batch, Mini-batch và Stochastic GD (SGD)',
    duration: '50 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">dataset</span> 2. Ba cấp độ Tu Tiên của Gradient Descent</h2>

  <div class="features-grid my-4">
    <div class="feature-card highlight-danger">
      <div class="feature-icon"><span class="material-symbols-outlined">hourglass_empty</span></div>
      <h4 class="font-bold">1. Batch Gradient Descent (BGD)</h4>
      <p class="text-xs italic mb-2 text-gray-500">Người khổng lồ dậm chân.</p>
      <p class="font-mono bg-red-100 p-1 text-xs mb-2">Tính Loss cho <b>1,000,000</b> ảnh $\\to$ Trừ một nhát Gradient.</p>
      <ul class="text-xs list-disc pl-4 space-y-1">
        <li><strong>Sự tàn khốc:</strong> Tính đạo hàm cho Toàn Bộ Data mới dám nhấc chân bước một bước mảnh mai (1 Step). Rất rất là Lâu, Out of Memory VRAM ngay lặp tức.</li>
        <li><strong>Đồ thị:</strong> Đường xuống núi thẳng tắp, trơn tuột không một gợn sóng tăm tối.</li>
      </ul>
    </div>
    <div class="feature-card highlight-warning">
      <div class="feature-icon"><span class="material-symbols-outlined">speed</span></div>
      <h4 class="font-bold">2. Stochastic GD (SGD Thuần)</h4>
      <p class="text-xs italic mb-2 text-gray-500">Tên say rượu mù đường.</p>
      <p class="font-mono bg-yellow-100 p-1 text-xs mb-2">Tính Loss cho <b>1</b> bức ảnh $\\to$ Trừ một nhát Gradient.</p>
      <ul class="text-xs list-disc pl-4 space-y-1">
        <li><strong>Sự liều mạng:</strong> Xé Data thành 1 triệu nhát cắt lẻ tẻ rác bừa. Cứ nếm 1 ảnh là nhích chân. 1 Triệu ảnh là lảo đảo leo trèo lật đật 1 triệu Step.</li>
        <li><strong>Đồ thị:</strong> Chạy zig-zag nôn mửa như xe thủng xăm, nhảy ra khỏi ngõ cụt Local Minima thần tốc.</li>
      </ul>
    </div>
    <div class="feature-card highlight-success text-white" style="background-color: var(--primary-gray);">
      <div class="feature-icon text-green-400"><span class="material-symbols-outlined">group_work</span></div>
      <h4 class="font-bold">3. Mini-Batch SGD</h4>
      <p class="text-xs italic mb-2 text-gray-300">Vua chiến trường của Hiện Thực.</p>
      <p class="font-mono bg-gray-700 p-1 text-xs mb-2 text-white">Tính Loss cho <b>[32, 64, 128..]</b> ảnh $\\to$ Trừ một nhát Gradient.</p>
      <ul class="text-xs list-disc pl-4 space-y-1">
        <li><strong>Gom sức mạnh phần cứng:</strong> Đút vừa vặn miệng ăn Cuda Cores của chíp GPU RTX. Vừa lợi dụng khả năng tính ma trận SIMD 64 cái cùng lúc, vừa giữ độ "Zig-zag say xỉn" nhẹ giúp vượt ải chướng ngại vật mượt hơn BGD thuần tẻ nhạt.</li>
      </ul>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">sports_motorsports</span> 2.1. Nâng cấp Vận tốc vòng vèo bằng Momentum</h3>
  <div class="callout callout-info mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">roller_skating</span></div>
    <div class="callout-content">
      <strong>Vấn đề của SGD: Đáy rãnh yên ngựa (Saddle Points / Ravines)</strong>
      <p>Khi rơi xuống một thung lũng hẹp dài tít, SGD thuần sẽ dao động trái-phải quẫy đạp dữ dội ở thành thung lũng thay vì trôi tiến thẳng về phía trước tới đáy sâu.</p>
      
      <p class="font-bold mt-2">Tuyệt kỹ Momentum (Hòn tuyết lăn):</p>
      <div class="font-mono text-xs bg-white p-2 border border-blue-200 mt-1 mb-2">
        $V_{new} = \beta \cdot V_{old} + (1 - \beta) \cdot \nabla L$ <br/>
        $W_{new} = W_{old} - \eta \cdot V_{new}$
      </div>
      <p>Nó giống như Hòn Tuyết Lăn. Thay vì bẻ hướng đi khựng lại liên hồi theo nhát đạo hàm tịnh tiến, nó <strong>Duy Trì Vận Tốc ($\beta \sim 0.9$) của dĩ vãng</strong>. Các lực dao động trái phải cự tuyệt nhau bị triệt tiêu bằng 0; Các lực chúc đầu đi xuống tích tụ lại thành luồng đà tốc (Momentum) xuyên thủng thung lũng với gia tốc cực đại!</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// SỰ NHẢY VỌT CỦA ĐỘNG LƯỢNG (MOMENTUM) VS SGD THUẦN
// =====================================================

fn gradient_ravine(w: f64) -> f64 { 
    // Giả lập một hố sâu có độ nhấp nhô gây nhiễu cho Gradient
    w * 2.0 + (w * 10.0).sin() * 5.0 
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              SGD THUẦN (LẬT ĐẬT) VS. SGD MOMENTUM (HÒN TUYẾT)        ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    let lr = 0.05;
    
    // 1. SGD Thường: Không có trí nhớ dĩ vãng
    let mut w_sgd = 5.0;
    println!("\\n[SGD THUẦN] Tiến trình:");
    for i in 1..=5 {
        let grad = gradient_ravine(w_sgd);
        w_sgd = w_sgd - lr * grad;
        println!("- Step {}: W = {:.3} (Bị kẹt giật cục vì gặp hàm Sin nhiễu)", i, w_sgd);
    }
    
    // 2. SGD gắn Momentum: Tính Động lượng
    let mut w_mom = 5.0;
    let mut velocity = 0.0;
    let beta = 0.9; // Cố thủ 90% đà di chuyển cũ, chỉ lấy 10% ý kiến đạo hàm mới
    
    println!("\\n[SGD MOMENTUM] Tiến trình:");
    for i in 1..=5 {
        let grad = gradient_ravine(w_mom);
        
        // Cập nhật Vận tốc hòn tuyết (Trung bình mũ)
        velocity = beta * velocity + (1.0 - beta) * grad; 
        w_mom = w_mom - lr * velocity;
        
        println!("- Step {}: W = {:.3} (Tốc độ đâm mượt nhờ V = {:.3})", i, w_mom, velocity);
    }
    
    println!("\\n>>> BÀI HỌC: Momentum tích lũy vận tốc, cán qua các hố yên ngựa (Local Minima) và khử Dao động (Oscillation) thần tốc!");
}`
  },
  {
    id: 'ch21_05_03',
    title: '3. Đức Vua Adam Optimizer & Learning Rate Schedulers',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">diamond</span> 3. Thống trị của Thuật Toán ADAM và Nghệ thuật Schedulers</h2>

  <h3>3.1. Tại sao Adam là Chúa Tể? (Adaptive Moment Estimation)</h3>
  <div class="definition-block mb-4">
    <p>Adam ($~2014$) gom nhặt Hai Tinh Hoa mạnh nhất của lịch sử Tối ưu AI:</p>
    <ul class="text-sm list-decimal pl-5 mt-2 space-y-2">
      <li><strong>Momentum (Moment bậc 1 - $V$):</strong> Giữ lại Tốc Độ lăn cũ y hệt như SDG Momentum.</li>
      <li><strong>RMSprop (Moment bậc 2 - $S$):</strong> Tính Trung Bình Bình Phương (Squared) của các Gradient cũ. Nếu đạo hàm của một Weight nhảy disco điên cuồng (biến thiên khổng lồ), thuật toán sẽ LẤY LEARNING RATE CHIA CHO CĂN BẬC HAI ($S$).</li>
    </ul>
    <p class="font-bold text-red-700 bg-red-50 p-2 border border-red-200 mt-2">Kết quả Vĩ đại: Từng cái Weight một trong số 1 Tỷ Weights của mô hình sẽ tự động Rẻ Đai một Learning Rate ($\alpha$) ƯU TIÊN RIÊNG BIỆT.</p>
    <p class="text-xs">Weights lười biếng sẽ được kích cho LR bơm cao. Weights cuồng loạn sẽ bị Adam dìm LR thấp xuống cho đi bộ hòa nhã lại.</p>
  </div>

  <div class="formula-block text-xs md:text-sm font-mono my-4 p-4 text-center">
    // Update Moments<br/>
    $V_t = \beta_1 V_{t-1} + (1 - \beta_1) \nabla L$ (Tích Gió Momentum)<br/>
    $S_t = \beta_2 S_{t-1} + (1 - \beta_2) (\nabla L)^2$ (Phanh RMSprop)<br/><br/>
    
    // Bias Correction (Sửa sai khúc Start lúc V và S bằng 0)<br/>
    $V^{corrected}_t = V_t / (1 - \beta_1^t)$<br/>
    $S^{corrected}_t = S_t / (1 - \beta_2^t)$<br/><br/>

    // Cú Trốt: Adam Update!<br/>
    <span class="font-bold text-blue-900 border-b border-blue-900 pb-1">$W_t = W_{t-1} - \frac{\alpha}{\sqrt{S^{corrected}_t} + \epsilon} \cdot V^{corrected}_t$</span>
  </div>

  <hr class="my-6 border-gray-300">

  <h3><span class="material-symbols-outlined">calendar_clock</span> 3.2. Learning Rate Schedulers (Lịch trình bóp cò)</h3>
  <p>Learning rate $\alpha$ tĩnh (Static $= 0.001$) là công thức chuẩn để AI nhảy văng khỏi đài lúc gần tới đích vì... sải chân không khép lại.</p>
  
  <div class="grid grid-cols-2 gap-4 mt-4">
    <div class="border rounded p-3">
      <h4 class="font-bold text-sm text-gray-800"><span class="material-symbols-outlined align-middle mr-1">trending_down</span> Step Decay</h4>
      <p class="text-xs text-gray-600 mt-1">Cứ chạy xong 30 Epochs, tôi nhẫn tâm chia LR đi cho 10 ($LR = LR / 10$). Phù hợp cho Computer Vision kiểu cũ (ResNet).</p>
    </div>
    <div class="border rounded p-3 bg-blue-50">
      <h4 class="font-bold text-sm text-blue-800"><span class="material-symbols-outlined align-middle mr-1">waves</span> Cosine Annealing</h4>
      <p class="text-xs text-gray-600 mt-1">Ép LR giảm thoai thoải như Lượn Sóng Cosine. Lên cao uấn lượn, xuống đích ôm cua xát ván $\to 0.0$. Huyền thoại rinh cup Kaggle.</p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">content_cut</span> 3.3. Bí kíp sinh tồn: Gradient Clipping</h3>
  <div class="callout callout-warning mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">scissors</span></div>
    <div class="callout-content">
      <strong>Vá màng nhĩ cho Exploding Gradient</strong>
      <p>Với các mạng ngôn ngữ đệ quy như RNN/LSTM, Gradient qua chiều thời gian (Time-steps) nhân luỹ thừa có thể nổ lên $10^9$ (Exploding Gradients). Trọng số ra NaN, mô hình tàn phế cháy đen thui màn hình.</p>
      <div class="bg-yellow-100 border border-yellow-300 p-2 font-mono text-xs text-center my-2 text-yellow-900">
        norm = L2_Norm(Gradient_Vector) <br/>
        if norm > threshold (ví dụ: 1.0) -> Gradient = Gradient * (threshold / norm)
      </div>
      <p><b>Clipping by Norm</b>: Nắm cổ Vector mũi tên Gradient lại. Bành trướng hướng đi (Direction) thì giữ nguyên tôn trọng, nhưng nếu Cường độ lực (Magnitude/Norm) dài đến rách vũ trụ thì lấy cưa điện HƯỞNG GỌN RÚT LẠI cho Lực bằng đúng Cục Đá ngạch giới $1.0$.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// ĐỨC VUA ADAM OPTIMIZER HOẶT ĐỘNG THỰC TẾ
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║                 THUẬT TOÁN ADAM (VUA CỦA MỌI OPTIMIZERS)             ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Các tham số cấu hình tĩnh muôn đời không đổi của Adam trong PyTorch
    let lr = 0.001;
    let beta_1 = 0.9;   // Kế thừa Tốc Độ Momentum
    let beta_2 = 0.999; // Phanh Hãm RMSProp
    let epsilon = 1e-8; // Chống chia cho 0
    
    // Khởi tạo
    let mut w = 5.0; // Trọng số đang rất lệch
    let mut m = 0.0; // Kho lữu trữ Động Lượng bậc 1 (Momentum)
    let mut v = 0.0; // Kho lưu trữ Phương sai bậc 2 (RMSProp)
    let b1_t = beta_1;
    let b2_t = beta_2;

    println!("\\n[1 STEP CỦA ADAM] Khi nhận cú Gradient = 25.4 điên rồ:");
    let grad = 25.4; // Trọng số này đang ở miệng vực núi lửa chênh vênh

    // 1. Tích đà Momentum m cho tốc độ lao dốc
    m = beta_1 * m + (1.0 - beta_1) * grad; 
    
    // 2. Chụp X-quang Phương sai v (Bình phương lên cực thô bạo!)
    v = beta_2 * v + (1.0 - beta_2) * grad * grad;

    // 3. Bias Correction (Bơm cứu xét ở Epoch đầu vì m, v gốc bằng 0 quá xịt)
    let m_hat = m / (1.0 - b1_t);
    let v_hat = v / (1.0 - b2_t);

    // 4. Update Siêu Kinh Điển (Lấy Tốc độ m chia cho Rễ Độ Lệch v)!
    w = w - (lr / (v_hat.sqrt() + epsilon)) * m_hat;

    println!("Momentum (m_hat): {:.4}", m_hat);
    println!("Hãm Phanh RMSprop (v_hat.sqrt): {:.4}", v_hat.sqrt());
    println!("Vị trí Weight Cập Nhật Đẳng Cấp: {:.4}", w);
    
    println!("\\n>>> PHÂN TÍCH: Gradient nhận vào tận 25.4 (Đáng lẽ SGD sẽ phi lên trần bục máy).");
    println!("Nhưng Adam đã Tự Tính Tỷ Lệ (Adaptive)! Nó lấy lr/v_hat.sqrt() bóp giò lại. Weight chỉ dịch chuyển tẹo nhẹ cẩn trọng. Quá ảo!");
}`
  }
];

export const ch21_05: Chapter = {
  id: 'ch21_05',
  title: '21.5. Gradient Descent & Optimizers',
  introduction: `
    <h2>Luật Tiến Hóa và Tìm Đáy</h2>
    <ul>
      <li>Hiểu đúng về Giải tích Gradient $\\mathbf{\\nabla L}$ ngược dấu.</li>
      <li>So kè Batch, Mini-batch SGD. Động lượng Momentum chọc thủng cực tiểu.</li>
      <li>Tại sao Adam thống trị cả cõi Machine Learning.</li>
      <li>Đóng đinh Gradient Clipping sửa nạn ExplodingRNN.</li>
    </ul>
  `,
  lessons: ch21_05_lessons,
};

export default ch21_05;
