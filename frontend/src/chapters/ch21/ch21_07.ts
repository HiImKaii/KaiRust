// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 7: REGULARIZATION & KỸ THUẬT HUẤN LUYỆN
//
// Mục tiêu học thuật:
// 1. Phân biệt Overfitting (Học Vẹt) vs Underfitting (Học Dốt) - Bias/Variance.
// 2. Trừng phạt Weight L1 (Lasso) / L2 (Ridge/Weight Decay) bằng Giải Tích.
// 3. Phép thuật Kép chắp vá: Dropout (MC Dropout/Inverted Dropout).
// 4. Batch Normalization (Ngăn chặn Internal Covariate Shift).
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_07_lessons: Lesson[] = [
  {
    id: 'ch21_07_01',
    title: '1. Overfitting vs Underfitting (Học vẹt và Học dốt)',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">psychology_alt</span> 1. Căn bệnh Cố Hữu: Overfitting vs Underfitting</h2>

  <h3>1.1. Sự thật từ Định luật Bias-Variance</h3>
  <div class="definition-block mb-4">
    <p>Nếu bạn cho 1 mạng Nơ-ron đủ Sâu (Deep) học tập trong một khoảng thời gian Vô Hạn: Loss của dữ liệu Training KHÔNG THỂ KHÔNG VỀ MỨC $0.0$. Mạng sẽ băm nát và ghi nhớ từng hạt bụi pixel nhiễu khảm trên bức ảnh.</p>
    <p>Nhưng Cột Mốc Vinh Quang của Kỹ sư AI là khi nó phán đoán tốt trên <strong>Tập Validation/Test Set</strong> - Tức là những bức ảnh nằm ngoài Đề cương ôn thi. Đây là câu chuyện đánh đổi giữa Bias và Variance.</p>
  </div>

  <div class="grid grid-cols-2 gap-4 my-2">
    <div class="bg-red-50 p-4 border rounded">
      <h4 class="font-bold text-red-800 border-b pb-2 mb-2"><span class="material-symbols-outlined align-middle mr-1 text-red-600">sentiment_dissatisfied</span> Underfitting (Học dốt / High Bias)</h4>
      <ul class="text-xs list-disc pl-4 mt-2 text-gray-700 space-y-2">
        <li><strong>Dấu hiệu:</strong> Cả Train Loss và Valid Loss đều CAO CHÓT VÓT, phán đoán rùa bò không dính chữ nào.</li>
        <li><strong>Biểu hiện mô hình:</strong> Quá đơn giản ngây ngô. Ví dụ lấy 1 Nơ-ron linear đòi chặn mặt bàn cờ caro XOR. Sự bảo thủ (Bias) của mô hình cao lanh lảnh.</li>
        <li><strong>Đơn thuốc:</strong> Đập bỏ Network nhỏ, xây Network bự hơn, thêm Tầng Ẩn (Hidden Layers), Train lâu thêm (Epochs lớn).</li>
      </ul>
    </div>
    <div class="bg-yellow-50 p-4 border rounded">
      <h4 class="font-bold text-yellow-800 border-b pb-2 mb-2"><span class="material-symbols-outlined align-middle mr-1 text-yellow-600">sentiment_very_dissatisfied</span> Overfitting (Học Vẹt / High Variance)</h4>
      <ul class="text-xs list-disc pl-4 mt-2 text-gray-700 space-y-2">
        <li><strong>Dấu hiệu:</strong> Train Loss ĐỤNG ĐÁY BẰNG $0$, Mọi thứ trên giáo trình thi 100đ. Nhưng Validation Loss ĐẠP TRẦN ĐI LÊN $\\to$ Ngu dốt khi ra đời thực.</li>
        <li><strong>Biểu hiện mô hình:</strong> Mạng quá Khổng Lồ, chằng chịt Weight đến mức Mạng học mẹo: Nhớ vân mặt của nốt ruồi thay vì nhớ Cấu trúc Gương mặt. Phương sai (Variance) cao chấn động.</li>
        <li><strong>Đơn thuốc:</strong> Gom thêm Hàng Triệu Dữ liệu, Dahệ thống Augmentation, và đặc biệt: <strong>Regularization (L1/L2, Dropout)</strong>.</li>
      </ul>
    </div>
  </div>
</div>
    `,
    defaultCode: `// MÔ PHỎNG HIỆN TƯỢNG OVERFITTING THỰC TẾ TRÊN CON SỐ
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║       OVERFITTING: KHI AI chỉ ĐỦ KHÔN ĐỂ LỪA KỸ SƯ (HỌC BÀI)         ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Lịch sử cày cuốc (Training History) qua 50 Epochs cực điểm
    let epochs = vec![1, 10, 20, 30, 40, 50];
    
    // Mạng Nơ-ron 10 Triệu Tham số đang cố nhai 100 Bức ảnh
    let train_loss = vec![2.5, 1.2, 0.5, 0.1, 0.01, 0.0001]; // Xuống đáy
    let valid_loss = vec![2.6, 1.3, 0.6, 0.8, 1.5,   2.9];   // Khựng lại ở Epoch 20 và Nảy ngược Lên Trời!

    println!("\\n[Ghi chú Giám Thị Máy Học]");
    println!("Epoch | Train Loss | Valid Loss (Đường Đời)");
    println!("------|------------|-----------------------");
    
    for i in 0..epochs.len() {
        print!("{:5} | {:10.4} | {:10.4} -> ", epochs[i], train_loss[i], valid_loss[i]);
        if epochs[i] == 1 || epochs[i] == 10 {
            println!("Đang tốt, mạng đang nhận thức vạn vật!");
        } else if epochs[i] == 20 {
            println!("SWEET SPOT (ĐIỂM VÀNG) - Cân bằng Bias/Variance tối thượng.");
        } else {
            println!("CẢNH BÁO OVERFIT! Mô hình đang lưu Cache nốt ruồi rác vào Weight.");
        }
    }
    
    println!("\\n>>> BÀI HỌC VỠ LÒNG: Chuyện buồn nhất ngành AI không phải là Loss Càng Train Càng Cao. Chuyện kinh tởm nhất là Train Loss Về 0, mà AI ra ngoài Ngu ngốc tột độ. Nhìn Cột Valid Loss là Lệnh Sinh Tử!");
}`
  },
  {
    id: 'ch21_07_02',
    title: '2. L1, L2 Regularization & Weight Decay',
    duration: '50 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">balance</span> 2. L1/L2 Regularization (Hình phạt kìm hãm)</h2>

  <h3>2.1. Bản ngã tham lam của các cục Weights</h3>
  <p>Khi Overfitting, AI có xu hướng đẩy một vài con Weight (ví dụ $w_{nốt\\_ruồi}$) lên RẤT RẤT TO (như 300, 500) để cố nhổ ra đáp án Khẩu quyết bắt trúng nhịp cái Nốt Ruồi Nhiễu trên tấm ảnh. Do đó Output bị chao đảo bởi những thay đổi cực bé của Input. Máy tính trở nên Thần Kinh Yếu.</p>
  
  <h3>2.2. L2 Regularization (Phép thanh tẩy Ridge / Weight Decay)</h3>
  <div class="callout callout-warning my-4">
    <div class="callout-icon"><span class="material-symbols-outlined">gavel</span></div>
    <div class="callout-content">
      <strong>Vỗ mặt Nơ-ron bằng Thước kẻ:</strong>
      <p>Cách ép Weight phải "Khiêm Tốn" lại (Gần bằng 0 trơn tru) là Chèn thêm <strong>Tổng bình phương của tất cả các Weights</strong> vào sau hông của Hàm Loss!</p>
      <div class="font-mono bg-yellow-50 p-2 text-center text-sm border my-2">
        $L_{Total} = L_{Data} + \\lambda \\sum_{i=1}^{n} w_i^2$
      </div>
      <p>Lúc này để tìm Đáy Thung Lũng Cực Tiểu $L_{Total}$, Gradient Descent BUỘC PHẢI KHUẤT PHỤC ÉP ĐỒNG LOẠT VẠN TỶ $W$ Tụt Ngắn Lại Về Số Không. Chỉ những Feature Mũi Nhọn Cực Kì Quan Trọng Mới Đáng Đồng Tiền $\\lambda$ để nhô cái $W$ lên một tí.</p>
      <p class="text-xs italic text-red-700 mt-2">Toán Học: $\\lambda$ điều chỉnh "Độ tát bạo lực". Càng to $\\to$ Trọng lượng thun càng chặt. Gọi là Weight Decay vì cập nhật weight lúc nào cũng $w = w - \\ehệ thống \\cdot \\lambda \\cdot w$, cứ liên tục bị mục rữa nhỏ lại.</p>
    </div>
  </div>

  <h3>2.3. L1 Regularization (Lasso) vs L2</h3>
  <div class="features-grid">
    <div class="feature-card">
      <h4 class="font-bold text-blue-800">L1 Regularization (Trị Tuyệt Đối)</h4>
      <p class="font-mono text-xs my-2 bg-gray-100 p-1">Penalty: $\\lambda \\sum |w_i|$</p>
      <p class="text-xs">Đạo hàm của Trị Tuyệt Đối là $1$ hoặc $-1$. Nghĩa là nó Đẩy Weight Trực Chĩa Xuống số $0.0$ CHUẨN XÁC luôn. Có tác dụng <strong>Tỉa Lọc Tính Năng (Feature Selection)</strong>, vứt sạch râu ria thừa dọn dẹp RAM.</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold text-indigo-800">L2 Regularization (Bình Phương)</h4>
      <p class="font-mono text-xs my-2 bg-gray-100 p-1">Penalty: $\\lambda \\sum w_i^2$</p>
      <p class="text-xs">Đạo hàm xéo dần mượt mà ($2w$). Weight chỉ bé rũ rượi lại $\\to 0.001$ chứ hiếm khi gãy sụp tận số $0.0$ tròn trĩnh. Được ưa chuộng vô biên trong Deep Learning Đương đại.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// MÔ PHỎNG SỰ BĂM VẰN WEIGHT BẰNG WEIGHT DECAY (L2 REGULARIZATION)
// =====================================================

fn gradient_loss(w: f64) -> f64 { 
    // Giả dụ Hàm Loss sinh ra 1 đạo hàm rụt rè kéo nhỏ
    2.0 * (w - 1.0) 
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║       SỨC MẠNH CỦA WEIGHT DECAY (L2): PHẠT NHŨN TIỀN CỦA WEIGHT      ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Một thanh niên Weight Hư Hỏng bành trướng siêu khổng lồ, ôm rác overfit!
    let w_goc = 50.0;
    let lr = 0.05;
    
    println!("\\n[1] MẠNG BÌNH THƯỜNG (KHÔNG L2 PENALTY):");
    let mut w_no_reg = w_goc;
    for step in 1..=5 {
        let grad_dahệ thống = gradient_loss(w_no_reg); 
        w_no_reg = w_no_reg - lr * grad_data;
        println!("- Bước {}: Cứ thong dong giảm nhẹ còn {:.2}", step, w_no_reg);
    }
    
    println!("\\n[2] MẠNG BỊ CƯỚP TÀI SẢN BỞI WEIGHT DECAY (L2 Lambda = 0.1):");
    let mut w_l2 = w_goc;
    let lambda = 0.1; // Còng tay Weight Decay
    
    for step in 1..=5 {
        let grad_dahệ thống = gradient_loss(w_l2); 
        
        // ĐẠO HÀM CỦA CÙM L2 (W^2 / 2) CHÍNH LÀ CON SỐ W!
        // Gradient Đẩy Tổng = Đạo Hàm Dahệ thống + Cùm Phạt (Lambda * W)
        let grad_total = grad_dahệ thống + lambda * w_l2; 
        
        w_l2 = w_l2 - lr * grad_total;
        
        println!("- Bước {}: Bị trừ đau đớn tụt hạng còn {:.2}", step, w_l2);
    }
    println!("\\n>>> BÀI HỌC: L2 cộng trúng Đạo hàm bằng chính giá trị lớn tồ của W. Càng phình to, L2 tát W càng hộc máu, bắt ép nó phải lùn lại khiêm tốn. Mô hình vì vậy trở nên Êm Đềm (Smooth), KHÔNG OVERFIT!");
}`
  },
  {
    id: 'ch21_07_03',
    title: '3. Dropout & Batch Normalization',
    duration: '75 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">filter_drama</span> 3. Tinh Hoa Hack Matrix: Dropout & Batch Normalization</h2>

  <h3>3.1. Dropout (Rút Phích Cắm Mạng Ngẫu Nhiên)</h3>
  <div class="definition-block mb-4">
    <p>Thuật toán <strong>Dropout (Srivastava, 2014)</strong> chấn động giới AI vì triết lý lười biếng nhưng điên cuồng của nó: <em>"Trong quá trình huấn luyện, cứ mỗi lứa đưa Dahệ thống vào, nhắm mắt TẮT ĐI THEO XÁC SUẤT 50% số Neuron tại Hidden Layer!"</em></p>
    <p>Toán học Pytorch: Sinh ra Ma trận Cờ Nhị Phân (Mask) ngẫu nhiên 0 và 1, rồi nhân Chấm (Dot) Element-wise đè lên mặt Ma trận Feature.</p>
  </div>
  
  <ul class="text-sm list-disc pl-5 my-2">
    <li><strong>Tại sao nó xịn?</strong> Phá vỡ rễ ăn bám Đồng Cấu (Co-adaptation). Nơ-ron A lúc nào cũng ỷ lại Nơ-ron B bắt mũi, giờ B bị điện giật rớt đài $\\to$ A phải tự phồng cánh mũi tự lập bắt đặc trưng.</li>
    <li><strong>Sự diệu kì Ensemble:</strong> Phá 50% ở mỗi step tương đương bạn đang đi Train TRÔNG TREO Hàng Tỷ Mạng Neural Network gầy còm, rồi lúc đi Thi Test múc hết lên gộp lại lấy trung bình. Quá bá đạo để diệt Overfit!</li>
    <li><strong>Inverted Dropout (Tuyệt Kỹ Cân Bằng Năng Lượng):</strong> Khi cúp 50% diện tích, tín hiệu Dahệ thống đứt gánh trôi qua Lớp sẽ bị TỌP ĐI MỘT NỬA. Coder ngày xưa phải bù bù đắp đắp lúc Test $\\to$ Nguy hiểm rườm rà. Code mới lúc nén Train <strong>Chia ngay cho tỷ lệ Khép Nhắm (Keep Prob) $(y / 0.5)$</strong>, kéo tụi sống sót giương năng lượng lên Bù đắp cho bọn tử trận ngay lúc đó!</li>
  </ul>

  <h3><span class="material-symbols-outlined">layers</span> 3.2. Batch Normalization</h3>
  <div class="callout callout-success mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">health_and_safety</span></div>
    <div class="callout-content">
      <strong>Vá lỗi Internal Covariate Shift</strong>
      <p>Dahệ thống đi qua Vỏ Hành Lớp 1 bị băm vằm uốn xéo Matrix xong lại lòi ra thành Ma trận X_new dị hợm. Trọng số $W^{[2]}$ ở lớp 2 hì hục học theo X_new. Bỗng một ngày Weight $[1]$ nhảy nấc lên, X_new nổ tưng bừng thành X_Khác hên xui. Lớp 2 gục ngã ôm hận vì nền móng dưới chân cứ trượt rút mịt mù (ICS).</p>
      
      <p class="font-bold border-t border-green-200 mt-2 pt-2">Thuật Toán Trấn An:</p>
      <div class="font-mono text-center my-2 bg-white border border-green-200 p-2 text-xs md:text-sm">
        $\\mu_B = \\frac{1}{m} \\sum x_i$ <br/>
        $\\sigma_B^2 = \\frac{1}{m} \\sum (x_i - \\mu_B)^2$ <br/>
        $\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}$ <br/>
        $y_i = \\gamma \\hat{x}_i + \\beta$ 
      </div>
      <p class="text-xs">Chèn 1 lớp Trạm Thu Phí ngáng đúng khúc cuống họng xuất Tín hiệu $Z \\to Activation$. Bắt toàn bộ 64 Bức ảnh trong Lô (Mini-batch) xếp hàng Tính Trung Bình Cộng, Phương Sai, Ép lùi dẹt phẳng về Dạng Chuẩn Z-Score $(0, 1)$.</p>
      <p class="text-xs font-bold mt-1 text-red-700">Điều kinh dị: Trạm thu phí đó CÓ 2 TÊN TÀI XẾ $\\gamma$ (Kéo giãn) VÀ $\\beta$ (Đẩy Tịnh Tiến) CŨNG tự ĐỘNG CẬP NHẬT BẰNG ĐẠO HÀM BACKPROP CÙNG WEIGHT ĐỂ CÓ THỂ MỞ RỘNG VÒNG KIM CÔ CỨU SỐNG NETWORK MỘT CÁCH LINH HOẠT!</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// PANDA SIMULATION VỀ MA TRẬN DROPOUT TÀN NHẪN
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║             INVERTED DROPOUT - HIẾN TẾ ĐỂ MẠNH MẼ HƠN                ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Lớp Ẩn có 5 Nơ rôn nhả ra tín hiệu Z_output
    let hidden_output = vec![1.2, 0.8, -0.5, 3.4, 2.1];
    let keep_prob = 0.6; // Tỷ lệ SỐNG SÓT: 60%. (Rách xác 40% cúp điện)
    
    // Gacha Hên Xui từ Random (Mô phỏng 1 ván rải xúc xắc)
    // Coi như Nơ-ron 1 và 3 bị cúp điện trúng vào rọ Tử Hình (Mask = 0).
    let dropout_mask = vec![0.0, 1.0, 0.0, 1.0, 1.0];
    
    println!("Tín hiệu nguyên bản mưu sinh:      {:?}", hidden_output);
    println!("Ma trận Xúc Xắc Đao Phủ (Mask):    {:?}", dropout_mask);
    
    // TIẾN TRÌNH INVERTED DROPOUT CĂN BẢN
    let mut after_dropout = vec![];
    for i in 0..5 {
        // [1] Trảm Quyết Element-Wise (Nhân 0 hoặc 1)
        let nua_song_nua_chet = hidden_output[i] * dropout_mask[i];
        
        // [2] Bùa Phép Hồi Mã Thương (Inverted bù máu): Chi cho Tỷ lệ Sống sót
        // Vì Rớt mất 40% quân số, nên Tổng Lực tát sang Cửa Ra sẽ Bị Xẹp Hố!
        // Các Nơ-ron Sống cần Buff phình béo lên (chia cho 0.6 là số nó phình Lên)!!
        let bu_nang_luong = nua_song_nua_chet / keep_prob;
        
        after_dropout.push(bu_nang_luong);
    }
    
    println!("\\n[Sau Đao Phủ] Tín hiệu bị Lỗ thủng & Độp Phình lên bù trừ:");
    for i in 0..5 {
        println!("- Nơ-ron {}: {:.3}  (Gốc: {:.3})", i, after_dropout[i], hidden_output[i]);
    }
    
    println!("\\n>>> BÀI HỌC: Lớp Kế Hưởng Mâm Cỗ sau Dropout KHÔNG hề nhận ra là Tín hiệu bị mất gốc vì độ Tổng năng lượng Lực của Vector ĐÃ ĐƯỢC INVERTED KÉO TRUNG BÌNH KỊP THỜI (Scale Up)! Lúc Tắt mode Training sang Test đằng sau là Cứ để nguyên Chạy Mượt Rẹt Lên Không Khựng Gì Thêm!");
}`
  }
];

export const ch21_07: Chapter = {
  id: 'ch21_07',
  title: '21.7. Regularization & Kỹ thuật Train',
  introduction: `
    <h2>Vắc-xin chống sự Cám Dỗ Overfitting</h2>
    <ul>
      <li>Hiểu sinh học Mệnh đề Đánh Đổi Bias - Variance.</li>
      <li>Toán tích vi phân chặn họng Weight béo phì của L2 Weight Decay.</li>
      <li>Bản ngã của Mask Sinh Tử Inverted Dropout tàng hình cứu thế.</li>
      <li>Vòng kim cô Batch Normalization bóp nắn phân phối chệch chuẩn ICS.</li>
    </ul>
  `,
  lessons: ch21_07_lessons,
};

export default ch21_07;
