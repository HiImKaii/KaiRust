// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 8: KIẾN TRÚC MẠNG HIỆN ĐẠI (CNN, RNN & TRANSFORMERS)
//
// Mục tiêu học thuật:
// 1. Phân tích tại sao MLP Mù Lòa với Hình ảnh -> Convolution (CNN).
// 2. Ý niệm Không Gian Thời Gian (Sequential) của RNN, LSTM, GRU.
// 3. Quyền Lực Đấng Cứu Thế: Sự Chú Ý (Self-Attention & Transformers).
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_08_lessons: Lesson[] = [
  {
    id: 'ch21_08_01',
    title: '1. CNN (Convolutional Neural Networks) - Mắt Thần Thay Thế Đui Mù',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">visibility</span> 1. Sự mù lòa của Mạng Dày Đặc (Dense/MLP)</h2>

  <h3>1.1. Thảm họa Bức tranh Vỡ Nát</h3>
  <div class="definition-block mb-4">
    <p>Thuật toán cốt lõi của MLP là: Kéo giãn Bức ảnh vuông (Ví dụ: 28x28 pixel) thành 1 đường chỉ cuộn thẳng đứng (784 pixel). Sau đó nối chằng chịt $784$ sợi dây điện này tới các Nơ-ron tầng sau.</p>
    <p><strong>Sai lầm Ngớ Ngẩn:</strong> Khuôn mặt con mèo có Mắt Mũi Miệng nằm sát cạnh nhau. Việc Hủy hoại Hệ Quy Chiếu 2D (Trái Phải Trên Dưới) để ép thành 1D đã làm mất TÍNH LÂN CẬN (Cục bộ). Mạng dốt đặc không hiểu Mắt nằm trên Mũi, mà chỉ thấy 784 biến số Toán Học vô hồn độc lập!</p>
  </div>

  <h3><span class="material-symbols-outlined">filter_frames</span> 1.2. Giải pháp CNN: Ma Trận Trượt (Convolution)</h3>
  <p>LeCun (1989) đề xuất: Không đập vỡ ảnh tĩnh nữa. Hãy cầm chiếc kính lúp 3x3 (Gọi là Filter/Kernel) trượt khắp bức ảnh 2D, quét từ trái sang phải, từ trên xuống dưới. Nơi nào có Gốc nhọn, Kernel sẽ loé sáng.</p>
  
  <div class="features-grid my-4">
    <div class="feature-card">
      <h4 class="font-bold text-blue-800">1. Local Connectivity</h4>
      <p class="text-xs mt-2">Nơ-ron tầng ẩn giờ đây Không Còn Nhìn Toàn Cục (784 pixel), mà nó Giới hạn Tầm Nhìn cục bộ (Chỉ nhìn 1 lọt Kính Lúp 3x3). Trọng tâm sự chú ý: Đỉnh Tai Mèo.</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold text-indigo-800">2. Weight Sharing (Bí thuật dọn RAM)</h4>
      <p class="text-xs mt-2">Thay vì 784 điểm Weight, Cả Mạng chỉ học duy nhất 9 Con Số bên trong chiếc Kính Lúp 3x3 đó. Nó bò trượt đi khắp mọi nơi tìm Tai Mèo chung 1 công thức đạo hàm. Số lượng parameter sụp giảm hàng ngàn Lần!</p>
    </div>
        <div class="feature-card">
      <h4 class="font-bold text-red-800">3. Pooling (Chiết Xuất cô đọng)</h4>
      <p class="text-xs mt-2">Dùng Max-Pooling (2x2) xén bớt tấm ảnh nhỏ lại một nửa (Lấy đỉnh pixel chói nhất). Mạng lùi xa lại, lờ mờ hình dung được Cả Con Mèo thay vì Cắm mắt tịt vào cái móng chân.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// MÔ PHỎNG SỰ TRƯỢT CONVOLUTION 2D (Bản chất Toán Học của Kính Lúp)
// =====================================================

fn convolve_2d(image: &Vec<Vec<f64>>, kernel: &Vec<Vec<f64>>) -> f64 {
    let mut sum = 0.0;
    for i in 0..3 {
        for j in 0..3 {
            sum += image[i][j] * kernel[i][j]; // Phép Tích Chập (Lấy Kính Lúp đè lên Ánh Sáng)
        }
    }
    sum
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║       CONVOLUTION FILTER - THỢ SĂN ĐƯỜNG NÉT (EDGE DETECTOR)         ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Tưởng tượng 1 bức ảnh chụp Biên Giới: Bên trái Tối thui (0), Bên Phải Sáng Trắng (255)
    let image_patch = vec![
        vec![0.0, 0.0, 255.0],
        vec![0.0, 0.0, 255.0],
        vec![0.0, 0.0, 255.0]
    ];
    
    // Kernel 3x3 này chuyên đi Săn Cạnh Dọc (Vertical Edge) - Phát kiến của Sobel
    let sobel_vertical = vec![
        vec![-1.0, 0.0, 1.0],
        vec![-2.0, 0.0, 2.0],
        vec![-1.0, 0.0, 1.0]
    ];
    
    // Trượt kẹp Kính Lúp lên mảnh Ảnh
    let activation_signal = convolve_2d(&image_patch, &sobel_vertical);
    
    println!("\\nMảnh ảnh đang xét (Vực tối - Vực Sáng):");
    println!("{:?}", image_patch[0]);
    println!("{:?}", image_patch[1]);
    println!("{:?}", image_patch[2]);
    
    println!("\\nKính Lúp (Vertical Edge Detector) đè vào tính Tích phân...");
    println!("=> Nơ-ron loé sáng với cường độ khổng lồ: Tín hiệu = {}", activation_signal);
    
    println!("\\n>>> PHÂN TÍCH: Tín hiệu vọt lên 1020! Máy tính phát hoảng: 'À Há! Ở đây CÓ MỘT CÁI VIỀN DỌC CẮT NGANG!' Cấu trúc Bộ Não Người (V1 Visual Cortex) cũng nhìn vạn vật bắt đầu bằng Các Ngấn Cạnh (Edges) y hệt phương pháp Toán Học này.");
}`
  },
  {
    id: 'ch21_08_02',
    title: '2. Nhớ lại Lời nói Dĩ Vãng với RNN / LSTM / GRU',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">history</span> 2. Trí Nhớ và Dòng Thời Gian của RNN</h2>

  <h3>2.1. Nỗi đau của MLP: Cá vàng 3 giây</h3>
  <div class="definition-block mb-4">
    <p>Nếu bạn đưa vào mạng chữ "Tôi", nó dự đoán chữ "yêu". Đưa tiếp chữ "em", nó đóan chữ "múa". MLP mù tịt khái niệm Chuỗi Dữ Liệu Lịch Sử (Sequence).</p>
    <p><strong>Recurrent Neural Networks (RNN)</strong> thay đổi định mệnh bằng một mũi tên Vòng Lặp Tâm Linh: Nơ-ron không chỉ ăn Input hiện tại, nó còn Tự nhả Ngược Trạng Thái của Mình (Hidden State $h_{t-1}$) cắn lại vào hàm Input cho Bước thứ $t$.</p>
    <p class="font-mono bg-blue-50 text-center border p-2 text-sm text-blue-800"> $h_t = tanh(W_{xh} \cdot x_t + W_{hh} \cdot h_{t-1} + b)$ </p>
  </div>

  <h3><span class="material-symbols-outlined">water_drop</span> 2.2. Sự chết đuối Dĩ Vãng: Biến cố Vanishing Gradient</h2>
  <p>RNN rất đỉnh. Nhưng hãy tưởng tượng đoạn văn dài 100 chữ. Để học sự liên kết giữa chữ 1 và chữ 100, Đạo hàm Chain Rule phải đi xuyên Lùi Qua 100 Vòng Lặp Thời Gian (BPTT - Backprop Through Time). 100 lần nhân với 1 con số $< 1.0$ (Đạo hàm của Tanh/Sigmoid) $\to$ Gradients Rơi Về $0.0$. RNN mắc bệnh bẩm sinh quên cmn đầu câu chuyện!</p>
  
  <h3><span class="material-symbols-outlined">dns</span> 2.3. Băng qua vết mòn thời gian với LSTM & GRU</h3>
  <p>Long Short-Term Memory (LSTM) và anh em họ GRU ra đời để gỡ quả bom này.</p>
  <ul class="text-sm list-disc pl-5 mt-2 space-y-2">
    <li><strong>Kênh Cao Tốc Băng Tuyền (Cell State $C_t$):</strong> LSTM mở một băng chuyền chạy vắt ngang qua trên nóc 100 tế bào RNN. Tín hiệu chạy trên rãnh cao tốc này Cực Kì Mượt, đạo hàm Gradient chảy lùi trên đường cao tốc là bằng $1.0$, thoát trói triệt tiêu!</li>
    <li><strong>Cửa Xả Rác (Forget Gate):</strong> Nếu vừa qua hết dấu "." ngắt đoạn văn, Cửa (Được khóa bằng Sigmoid $0$) Tự động mở sập Phễu Cao Tốc xả hết Ký ức bài cũ đi để nhường trỗ dung nạp khái niệm chương mới.</li>
  </ul>
</div>
    `,
    defaultCode: `// MÔ PHỎNG NỖI ĐAU "CÁ VÀNG TRÍ NHỚ" CỦA RNN QUA THỜI GIAN
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║       RECURRENT NEURAL NETWORKS (RNN): VÒNG LẶP & SỰ LÃNG QUÊN       ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Từ thời gian t=1 đến t=5
    let words_stream = vec!["Đám", "mây", "đen", "kéo", "mưa"];
    
    // Giả sử W_hh (Sức mạnh lưu giữ trớn dĩ vãng) là 0.5 (Tồn đọng hẻo lánh)
    let w_hh = 0.5;   
    let mut hidden_state = 1.0; // Não bộ ở t=0 tinh khôi
    
    println!("Trải qua Dòng Thời Gian (Time-steps):");
    for (t, word) in words_stream.iter().enumerate() {
        // Tóm lược Toán học cốt lõi: Não mới = Chữ Hiện Tại + (Trí nhớ cũ * Mức mài mòn Dĩ vãng)
        // (Để mô phỏng độ rỉ máu kí ức, ta cho nó mòn liên tục)
        hidden_state = hidden_state * w_hh; 
        
        println!("  Time {}: Nhận thẻ bài '{}' -> Cường độ Ký Yức Gốc bấu víu: {:.4}", t+1, word, hidden_state);
        
        if hidden_state < 0.1 {
            println!("  >>> [CẢNH BÁO]: Tới đây Mạng NN đã vứt sạch Dĩ Vãng về chữ 'Đám'. Não rỗng tuếch!");
        }
    }
    
    println!("\\n>>> BÀI HỌC: Gradient của RNN lùi qua Time-steps nhân lũy thừa rụng lả tả. Đó là tại sao LSTM ra đời Mở Ngàm Cao Tốc Cell-State cho Gradients trượt vút đi không bị đứt đoạn!");
}`
  },
  {
    id: 'ch21_08_03',
    title: '3. Transformer: "Attention is All You Need"',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">insights</span> 3. Quyền trượng của Kỷ Nguyên Generative AI: TRANSFORMERS</h2>

  <h3>3.1. Hủy Duyệt Khái Niệm Tuần Tự</h3>
  <div class="definition-block mb-4">
    <p>RNN/LSTM quá chậm chạp vì phải nếm Chữ thứ 1, lết tới chữ thứ 2, rồi mới lột mở Chữ thứ 10. Chạy tuần tự không thể ăn GPU song song (Parallel computation).</p>
    <p>Năm 2017, Google quặc ra Sấm truyền <strong>"Attention Is All You Need"</strong>. Không thèm lặp RNN nữa. Tống toàn bộ 1000 chữ vào ngọng Matrix Tát một Phát Ăn Ngay. Siêu thần tốc, siêu song song.</p>
  </div>
  
  <h3>3.2. Cơ chế Self-Attention: Bộ Não Thấu Cảm</h3>
  <p>Câu văn: <em>"Ngân hàng bờ sông, tôi ra rút <strong>chi nhánh</strong>."</em> Chữ "chi nhánh" đang dòm ngó ai? Nó không ngu ngơ xếp hàng vòng lặp. Nó sinh ra 3 phân thân (Q, K, V):</p>
  
  <ul class="text-sm list-disc pl-5 mt-2 space-y-2">
    <li><strong>Query ($Q$ - Câu hỏi khát vọng):</strong> "chi nhánh" la lên "Tao cần tính từ thuộc thể chế Tổ Chức!"</li>
    <li><strong>Key ($K$ - Thẻ tên Đặc Cáo):</strong> Chữ "Ngân hàng" móc thẻ tên ra: "Tao đây, danh từ Tổ Chức". Chữ "Bờ Sông" lú thẻ tên ra báo "Tao là địa lý Cát sỏi".</li>
    <li><strong>Phép chấm Dot-Product Kì Diệu ($Q \cdot K^T$):</strong> Lấy Câu Hỏi Khát Vọng của "chi nhánh" tát mặt (Nhân chập) vào Mọi Thẻ Tên của 100 chữ khác. Cặp ghép $Q_{chi\\,nhánh} \cdot K_{ngân\\,hàng}$ bùng nổ điểm số (Score = Cao nghều). Cặp với $K_{bờ\\,sông}$ tịt mòi.</li>
    <li><strong>Value ($V$ - Sinh khí Lõi):</strong> Hàm Softmax đóng nắp Tỉ lệ Điểm Số này. Cuối cùng đem Xác suất Tỉ lệ khổng lồ của Ngân Hàng ép lấy Value cốt tủy của Ngân hàng châm vào người "chi nhánh". Vậy là "Chi Nhánh Ngân Hàng" quyện hòa Nhận Thức Chéo Lẫn Nhau! <strong>Context is Born!</strong></li>
  </ul>
  
  <div class="formula-block text-center mt-4 p-4 mb-2">
    $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) V$
  </div>

  <div class="callout callout-success mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">webhook</span></div>
    <div class="callout-content">
      <strong>Mảnh ghép Multi-Head Attention dời non lấp bể</strong>
      <p>Một cái đầu Attention chú ý móc nối Từ Vựng (Chi nhánh - Ngân Hàng). Cắm song song 8 CÁI ĐẦU Multi-Head: Một đầu soi Lữ Pháp, Một đầu soi Thì Tương Lai, Một đầu Soi Ngữ Điệu Giận dữ. Chúng gom cục lại Nhồi vào Linear Layer thành Siêu Thần LLM (ChatGPT/Claude/Gemini ngày nay).</p>
      <p class="font-bold text-red-800">Không có Time-steps? Vậy vị trí nằm ở đâu? -> Trả Lời: Positional Encoding! AI tự Cấy Ghép một mã vạch Sóng (Sin/Cos) có dao động tần số nhợt nhạt gài kẹp vào Dữ Liệu Chữ để Không Quên Bối Cảnh của Thứ tự Trước Sau.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// PHÂN TÍCH TÂM LINH CỦA DOT-PRODUCT ATTENTION (Bản Rút Gọn)
// =====================================================

// Phép giả lập mộc mạc của Ma trận Tính Điểm Attention
fn dot_product(q: &[f64], k: &[f64]) -> f64 {
    q.iter().zip(k.iter()).map(|(a, b)| a * b).sum()
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║       CƠ CHẾ SELF-ATTENTION (BÍ QUYẾT TẠO RA TRÁI TIM CHATGPT)       ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // Vector đặc điểm của 3 từ (Chỉ 2 chiều để minh họa)
    // - "Bank":  Cốt Tài Chính[1.0], Cốt Địa Lý bờ sông[0.2]
    // - "River": Cốt Tài Chính[0.0], Cốt Địa Lý bờ sông[1.0]
    // - "Money": Cốt Tài Chính[1.0], Cốt Địa Lý bờ sông[0.0]
    
    let k_bank  = vec![1.0, 0.2];
    let k_river = vec![0.0, 1.0];
    
    println!("\\n[NGỮ CẢNH 1] Tôi đi nộp tiền ở [Bank]...");
    // Truy vấn "Money" đang khát ráo vặn hỏi vòng quanh
    let q_money = vec![1.0, 0.0]; 
    
    let score_bank  = dot_product(&q_money, &k_bank); // 1.0*1.0 + 0.0*0.2 = 1.0
    let score_river = dot_product(&q_money, &k_river); // 1.0*0.0 + 0.0*1.0 = 0.0
    
    println!("-> 'Money' chọc vô thẻ tên 'Bank' : ĐỘ LIÊN KẾT = {:.2} (Khớp cạ dính cứng!)", score_bank);
    println!("-> 'Money' chọc vô thẻ tên 'River': ĐỘ LIÊN KẾT = {:.2} (Rời rạc cự tuyệt)", score_river);
    
    println!("\\n[NGỮ CẢNH 2] Tôi vác xuồng ra leo bãi [Bank]...");
    // Truy vấn "Xuồng/Gỗ" xục xạo đánh Mùi sinh thái Dòng Sông
    let q_boat = vec![0.0, 1.0]; 
    
    let score2_bank  = dot_product(&q_boat, &k_bank); // 0.0*1.0 + 1.0*0.2 = 0.2
    let score2_river = dot_product(&q_boat, &k_river); // 0.0*0.0 + 1.0*1.0 = 1.0
    
    println!("-> 'Boat' chọc vô thẻ tên 'Bank' : ĐỘ LIÊN KẾT = {:.2} (Nhè nhẹ lót nền)", score2_bank);
    println!("-> 'Boat' chọc vô thẻ tên 'River': ĐỘ LIÊN KẾT = {:.2} (Nhận trúng đích đâm nách!)", score2_river);
    
    println!("\\n>>> BÀI HỌC: Cơ chế Q*K giúp Từ Khoá Góp Chợ Điểm Nháp nhặt Hút Tinh Hoa (Value) Từ Kẻ Khác Đắp Vô Mình. Context thấu cảm ngút ngàn, dập nát Cỗ Máy lặp lì lợm của RNN!");
}`
  }
];

export const ch21_08: Chapter = {
  id: 'ch21_08',
  title: '21.8. Kiến Trúc Neural Đương Đại',
  introduction: `
    <h2>Vua Của Mọi Cuộc Chơi (CNN - RNN - Transformers)</h2>
    <ul>
      <li>Bi kịch Lôi dẹp đập Cục Bộ mạng MLP và quyền năng Tích chập CNN 2D.</li>
      <li>Hoàn cảnh ra đời Hốc Thời gian RNN, và Khắc phục Quên Lãng GRU/LSTM.</li>
      <li>Chạm ngưỡng quyền lực LLM Đại Ngôn Ngữ: Self-Attention đè ép Vector Ma Trận Đa Đầu dập tắt tuần tự cũ kỹ.</li>
    </ul>
  `,
  lessons: ch21_08_lessons,
};

export default ch21_08;
