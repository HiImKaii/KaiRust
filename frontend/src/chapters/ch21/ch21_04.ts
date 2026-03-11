// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 4: LOSS FUNCTIONS - THƯỚC ĐO TỘI LỖI CỦA AI
//
// Mục tiêu học thuật:
// 1. Bản chất Maximum Likelihood Estimation (MLE) giải thích cho Loss.
// 2. Regression Losses: MSE, MAE và Huber Loss (Toán học và Đạo hàm).
// 3. Classification Losses: BCE, CCE và KL Divergence.
// 4. Kỹ thuật nâng cao: Focal Loss - Diệt trừ Imbalanced Data.
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_04_lessons: Lesson[] = [
  {
    id: 'ch21_04_01',
    title: '1. Góc nhìn Thống kê: Maximum Likelihood Estimation (MLE)',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">analytics</span> 1. Maximum Likelihood Estimation (MLE) - Nguồn cội của Mọi Hàm Loss</h2>

  <h3>1.1. Tại sao máy lại cần Hàm Loss (Hàm Suy Hao)?</h3>
  <div class="definition-block mb-4">
    <p>Thuật ngữ "Loss" đo lường "mức độ ngu ngốc" của mạng Nơ-ron tại thời điểm hiện tại. Tại sao ta không thể đánh giá máy bằng độ phán đoán Đúng/Sai (Ví dụ: Accuracy = 90%)?</p>
    <p>Đáp án nằm ở <strong>Calculus (Giải tích)</strong>. Accuracy (Độ chính xác) là một đại lượng bậc thang rời rạc (step-like), <strong>Nó KHÔNG THỂ ĐẠO HÀM ĐƯỢC</strong>. Mà Backpropagation sống nhờ Đạo hàm (Derivatives / Gradients). Do đó, trí tuệ nhân tạo phải viện cầu đến Thống kê học để tạo ra các hàm số trơn tru (Smooth Curves), đạo hàm được mọi lúc mọi nơi.</p>
  </div>

  <h3>1.2. MLE (Cực đại Hóa Khả năng)</h3>
  <p>Toàn bộ ngành Deep Learning đứng trên vai của định lý <strong>Maximum Likelihood Estimation (MLE)</strong>. Thay vì ép máy "Trả lời Mèo", ta ép máy: <em>"Làm sao tinh chỉnh $W$ để Xác suất $P$ (Predict=Mèo | Ảnh) là LỚN NHẤT!"</em></p>
  
  <div class="formula-block mb-4 p-4 text-center rounded border shadow-sm">
    <p class="font-bold mb-2 text-blue-900">Tính Likelihood trên toàn Dataset có N ảnh:</p>
    $L(W) = P_{data1} \\times P_{data2} \\times \\dots \\times P_{dataN} = \\prod_{i=1}^{N} P(y_i | x_i; W)$
  </div>
  
  <p>Nhân hàng triệu xác suất ($0.9 \\times 0.2 \\times \\dots$) thì CPU sẽ bị tràn số (Underflow) gãy vụn về 0. Lối thoát duy nhất là lấy <strong>Logarithm</strong> hai vế, biến phép Nhân $\\prod$ thành phép Cộng $\\sum$!</p>
  
  <div class="callout callout-warning mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">calculate</span></div>
    <div class="callout-content">
      <strong>Negative Log-Likelihood (NLL) ra đời</strong>
      <p>Logarithm là hàm đồng biến, nên <strong>Cực Đại Likelihood</strong> cũng chính là <strong>Cực Đại Log-Likelihood</strong>.</p>
      <p>Nhưng Deep Learning thích "Giảm" Gradient (Descent) để thả dốc tìm cực đáy, nên các nhà khoa học vả thêm dấu trừ (Negative) đằng trước: <code>-Log(Likelihood)</code>.</p>
      <p class="font-bold text-red-700 mt-2 text-center text-lg bg-red-50 p-2 border-red-200 border rounded">Kết luận: Giảm thiểu NLL Loss $\\iff$ Tối đa hóa MLE (Khả năng đúng).</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// THÍ NGHIỆM ĐÁNH SẬP KIẾN TRÚC MÁY TÍNH (UNDERFLOW) KHI KHÔNG CÓ LOGARITHM
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              Quyền Lực Của Logarithm trong Loss Functions            ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Giả sử có 1000 bức ảnh Mèo, và AI lúc mới sinh ra dự đoán được Mèo với xác suất = 0.5 (hên xui 50/50).
    // Phép tính MLE: L = 0.5 * 0.5 * 0.5 ... (1000 lần)
    
    let probability: f64 = 0.5;
    let n_images = 1000;
    
    // CÁCH 1: NHÂN TRUYỀN THỐNG (Likelihood)
    let mut total_likelihood = 1.0;
    for _ in 0..n_images {
        total_likelihood *= probability;
    }
    
    println!("\\n[1] Tính Likelihood Thô (Nhân Xác Suất):");
    println!("Xác suất dự đoán đúng cả 1000 ảnh: {}", total_likelihood);
    if total_likelihood == 0.0 {
        println!(">>> MÁY TÍNH BÁO BẰNG 0.0! Sập Nguồn (Numerical Underflow) bởi vì 0.5 mũ 1000 quá rớt lồng f64!");
        println!(">>> Đạo hàm ở vùng 0.0 sẽ tịt. Backpropagation ngủ đông!");
    }

    // CÁCH 2: CỘNG LOGARITHM (Log-Likelihood)
    let mut log_likelihood = 0.0;
    for _ in 0..n_images {
        // Logarithm tự nhiên (Logarit nê-pe)
        log_likelihood += probability.ln(); 
    }
    let nll_loss = -log_likelihood; // Thêm dấu trừ để thành hàm đi VỀ ĐÁY.
    
    println!("\\n[2] Tính bằng Negative Log-Likelihood (NLL):");
    println!("Tổng NLL Loss: {:.4}", nll_loss);
    println!(">>> GỌN GÀNG! Loss là con số 693.14 khổng lồ, đạo hàm thoải mái, không sợ Underflow.");
    println!(">>> Đây là lý do Mọi Framework Deep Learning đều nhúng hàm ln() vào tận lõi Loss!");
}`
  },
  {
    id: 'ch21_04_02',
    title: '2. Nhóm Regression: L1, L2 và Huber',
    duration: '50 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">trending_flat</span> 2. Nhóm Suy Hao Hồi Quy (Regression Losses)</h2>

  <p class="mb-4">Dùng khi Output của AI là <strong>Trục số Thực liên tục</strong> (Dự báo Giá Bitcoin, Tuổi tác, Mét vuông). Không thể xài Log Xác suất vì Dự đoán Giá Nhà \$100k, thực tế giá \$99k không có nghĩa là AI "Sai Hoàn Toàn".</p>

  <h3>2.1. MSE (L2 Loss) - Mean Squared Error</h3>
  <div class="grid grid-cols-2 gap-4 my-2">
    <div class="bg-blue-50 p-4 border rounded">
      <h4 class="font-bold text-blue-800 border-b pb-2 mb-2">Toán học</h4>
      <p class="font-mono text-sm">Công thức: $L = \\frac{1}{n} \\sum (y - \\hat{y})^2$</p>
      <p class="font-mono text-sm mt-2 text-red-600">Đạo hàm: $\\frac{\\partial L}{\\partial \\hat{y}} = 2(\\hat{y} - y)$</p>
      <ul class="text-xs list-disc pl-4 mt-2 text-gray-700">
        <li>Bình phương $\\to$ Phạt Cực Kì Nặng các ngoại lệ (Outliers). Sai 1 đền 1. Sai 10 đền 100!</li>
        <li>Hội tụ tại một Điểm duy nhất dưới đáy Parabol mịn màng (Convex func). Đạo hàm tuyến tính nên tìm cực tiểu cực dễ.</li>
      </ul>
    </div>
    <div class="bg-gray-900 border-gray-700 text-blue-400 p-4 rounded font-mono text-xs flex items-center justify-center font-bold">
      <pre>
        |    .       .
   Loss |     .     .
        |       _-_
   ---- + --------|-------
                  0  (Error)
      </pre>
    </div>
  </div>

  <h3>2.2. MAE (L1 Loss) - Mean Absolute Error</h3>
  <div class="grid grid-cols-2 gap-4 my-2">
    <div class="bg-green-50 p-4 border rounded">
      <h4 class="font-bold text-green-800 border-b pb-2 mb-2">Toán học</h4>
      <p class="font-mono text-sm">Công thức: $L = \\frac{1}{n} \\sum |y - \\hat{y}|$</p>
      <p class="font-mono text-sm mt-2 text-red-600">Đạo hàm: $\\frac{\\partial L}{\\partial \\hat{y}} = sign(\\hat{y} - y)$</p>
      <ul class="text-xs list-disc pl-4 mt-2 text-gray-700">
        <li>Hàm trị tuyệt đối $\\to$ Miễn nhiễm với Outliers. Đồ thị chữ V đanh thép. Đi chệch sai bao nhiêu thì phạt đúng bấy nhiêu.</li>
        <li><strong>Điểm yếu chết bò:</strong> Phần chóp chữ V dưới đáy 0 nhọn hoắt (Pointy). Không có đạo hàm tại cực tiểu $\\implies$ Gradient Descent sụp hầm dao động dữ dội khi chạm đáy.</li>
      </ul>
    </div>
    <div class="bg-gray-900 border-gray-700 text-green-400 p-4 rounded font-mono text-xs flex items-center justify-center font-bold">
      <pre>
        |    \\       /
   Loss |     \\     /
        |      \\   /
   ---- + ------\\-/-------
                  0  (Error)
      </pre>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">hub</span> 2.3. Huber Loss (Smooth L1 Loss)</h3>
  <div class="callout callout-info mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">handshake</span></div>
    <div class="callout-content">
      <strong>Tinh Hoa Hội Tụ: Con Lai Của Toán Học</strong>
      <p>Bọn Object Detection (Nhận diện vật thể Yolo/R-CNN) rất ghét Outliers, nhưng lại cần xuống đáy mượt mà.</p>
      <p>Huber Loss dùng một Ngưỡng cản ($\\delta$ Delta).</p>
      <ul class="text-sm list-disc pl-4 mt-2 mb-2 font-mono bg-blue-50 p-2">
        <li>Nếu Error $\\le \\delta$: Áp dụng một nửa MAE $\\to (0.5 \\times Error^2)$ $\\to$ Hoạt động như <strong>MSE Parabol</strong> mượt mà đáy.</li>
        <li>Nếu Error $> \\delta$: Áp dụng L1 phạt sương sương $\\to (\\delta \\times |Error| - 0.5\\delta^2)$ $\\to$ Hoạt động như <strong>MAE đường thẳng</strong> bẻ gãy đà leo thang khủng khiếp.</li>
      </ul>
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
    
    println!("\\n[1] Thấy gì khi gặp Outlier = 100.0?");
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
        
    println!("\\n>>> BÀI HỌC: Mã nguồn Object Detection toàn cắm cọc Huber (Smooth L1) để chống móp Bounding Box vì những bức ảnh nhiễu ác đạn!");
}`
  },
  {
    id: 'ch21_04_03',
    title: '3. Phân Loại Xác Suất: BCE, CCE & Focal Loss',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">scatter_plot</span> 3. Nhóm Suy Hao Thể Loại (Classification Losses)</h2>

  <h3>3.1. Binary Cross-Entropy (BCE) & KL Divergence</h3>
  <div class="definition-block mb-4">
    <p>Như đã giải thích từ chương Information Theory, <strong>Cross-Entropy</strong> đo lường <em>Độ Lệch Pha (KL Divergence)</em> giữa 2 bức tranh Phân Phối Xác Suất: Dữ liệu thực tế $P_{Data}$ (One-hot, chắc chắn 100%) và Dự báo $P_{Model}$ (Hên xui rải rác kiểu Softmax).</p>
  </div>
  
  <div class="formula-block mb-4 text-center text-sm md:text-base">
    $L_{BCE} = -[y \cdot \log(\hat{y}) + (1-y) \cdot \log(1-\hat{y})]$
  </div>
  <p>Toán học sâu xa: Công thức trên CHÍNH LÀ <strong>Negative Log-Likelihood của phân phối nhị thức (Bernoulli Distribution)</strong>. $y=1$ thì cụm bên phải bốc hơi, máy bị tra khảo <code>Log(y_hat)</code>. $y=0$ thì cụm bên trái tàng hình, máy bị cưa sừng <code>Log(1 - y_hat)</code>.</p>

  <h3><span class="material-symbols-outlined">groups</span> 3.2. Categorical Cross Entropy (CCE)</h3>
  <p>BCE xài cho 1 nơ-ron đánh giá Chó (True/False). Còn CCE xài cho Softmax đánh giá Đa Lớp (Chó, Mèo, Vịt).</p>
  <div class="formula-block mb-4 text-center">
    $L_{CCE} = - \sum_{i=1}^{C} y_i \cdot \log(\hat{y}_i)$
  </div>
  <p class="text-sm italic text-gray-600">Chú ý: Vì Vector sự thật $y$ là one-hot (ví dụ $y_{cat} = [0, 1, 0]$), mọi con số 0 đứng nhân với log đều câm nín. CCE thu gọi lẹ lại thành <strong>Đúng 1 phép tính Log duy nhất</strong> nhắm vào Class đúng. (Negative Log Likelihood thuần túy mộc mạc).</p>

  <h3><span class="material-symbols-outlined">cruelty_free</span> 3.3. Siêu Đẳng Cứu Thế: Focal Loss (Kaiming He)</h3>
  <div class="callout callout-warning mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">smart_toy</span></div>
    <div class="callout-content">
      <strong>Kẻ Diệt Trừ Data Bất Bình Đẳng (Class Imbalance)</strong>
      <p><strong>Nỗi Đau Lịch Sử:</strong> Ảnh chụp X-quang ung thư: 100,000 ảnh nội tạng khỏe, chỉ lọt thỏm 100 tấm có khối u ung thư. Máy AI khôn vặt, nếu nó cứ MẮT NHẮM MẮT MỞ phán: "MỌI KHÁCH HÀNG ĐỀU KHỎE", nó ĐÚNG tới 99.9%! Loss của nó cực thấp. Nó lười không chịu học tiếp. Và Bệnh Nhân Chết.</p>
      
      <p>Thuật toán <strong>Focal Loss (Bẻ Gãy BCE bằng hệ số tiêu cự Gamma $\gamma$)</strong></p>
      <div class="font-mono text-center p-2 mb-2 bg-yellow-100 text-yellow-900 border border-yellow-300">
        $FL(p_t) = - (1 - p_t)^{\gamma} \log(p_t)$
      </div>
      
      <p>Cơ chế Phép thuật: Cụm $(1 - p_t)^{\gamma}$ là cái Tát Tỉnh Cơn. 
      <br/>Nếu $p_t=0.99$ (AI thừa sức nhắm mắt đoán bừa bức ảnh khỏe mạnh này dễ quá), $(1-0.99)^2 = 0.0001 \to$ <strong>Ép trọng lượng bóp nát Loss tịt mòi</strong>. AI không học gì từ ảnh Khỏe. 
      <br/>Nhưng gặp bức Ung thư khó (nó rụt rè đoán $p_t=0.1$), $(1-0.1)^2 = 0.81 \to$ <strong>Giật Loss lên cực khủng vả mạnh vào Gradient Descend</strong>, ép Network phải dồn 100% tài nguyên CPU băm vằm tấm Ung thư bằng được!</p>
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
    
    println!("\\n[BCE Cổ Điển] Học mọi thứ cào bằng:");
    println!("- Ảnh Dễ (p=0.95) tạo Loss: {:.4}", bce_pure(p_de_ec));
    println!("- Ảnh Khó (p=0.10) tạo Loss: {:.4}", bce_pure(p_sieu_kho));
    println!("-> Tỉ lệ độ ưu tiên (Khó/Dễ): Gấp ~{} lần.", (bce_pure(p_sieu_kho)/bce_pure(p_de_ec)).round());
    println!("-> Hàng TRIỆU ảnh dễ nhạt toẹt sẽ lấn át, đè bẹp xô đổ hoàn toàn mảng Gradient của vài tấm ảnh Ung Thư hiểm.");

    println!("\\n[Focal Loss] Người Loe Tắt Kẻ Mạnh, Bơm Cho Kẻ Yếu:");
    let f_loss_de = focal_loss(p_de_ec, gamma);
    let f_loss_kho = focal_loss(p_sieu_kho, gamma);
    println!("- Ảnh Dễ tạo Loss: {:.6} (Bị Bóp vụn triệt tiêu!)", f_loss_de); // 0.0001
    println!("- Ảnh Khó tạo Loss: {:.4} (Được giữ nguyên uy lực!)", f_loss_kho); 
    println!("-> Tỉ lệ TẬP TRUNG CHUYÊN MÔN (Khó/Dễ): Gấp ~{} lần!!!", (f_loss_kho/f_loss_de).round());
    println!("\\n>>> VỚI FOCAL LOSS, Mạng Nơ-ron vứt sạch râu ria thừa dồn tài nguyên bắt các khuyết tật ẩn tàng. Giải xong bài Imbalance rúng động toàn cầu!");
}`
  }
];

export const ch21_04: Chapter = {
  id: 'ch21_04',
  title: '21.4. Loss Functions',
  introduction: `
    <h2>Thước Đo Tội Lỗi (MLE)</h2>
    <ul>
      <li>Hiểu Thống kê học nhúng lưng cho AI (Maximum Likelihood/NLL).</li>
      <li>Regression: Tại sao RCNN xài Huber Loss cứu sống Bounding Boxes.</li>
      <li>Classification: Bí kíp Focal Loss tiêu diệt dữ liệu Imbalance.</li>
    </ul>
  `,
  lessons: ch21_04_lessons,
};

export default ch21_04;
