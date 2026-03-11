// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 3: ACTIVATION FUNCTIONS - TẾ BÀO LINH HỒN CỦA AI
//
// Mục tiêu học thuật:
// 1. Phân tích toán học bản chất "Phi tuyến tính" (Non-linearity).
// 2. Mổ xẻ Đồ thị, Đạo hàm và đặc tính của: Sigmoid, Tanh, ReLU, Leaky ReLU.
// 3. Giải thích sâu sắc các biến cố: Vanishing Gradient, Exploding Gradient, Dead ReLU.
// 4. Các hàm kích hoạt tối tân hiện nay: SiLU (Swish), GELU, Softmax.
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_03_lessons: Lesson[] = [
  {
    id: 'ch21_03_01',
    title: '1. Bản chất Toán học của Non-linearity',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">network_ping</span> 1. Bản chất Toán học của Sự Phi Tuyến Tính (Non-linearity)</h2>

  <h3>1.1. Tại sao không thể dùng hàm Tuyến Tính (Linear)?</h3>
  <div class="definition-block mb-4">
    <p>Thuật toán cốt lõi của mỗi Nơ-ron là $Z = X \\cdot W + b$. Đây là một phương trình tuyến tính (Linear) thuần túy (đường thẳng/mặt phẳng). Điều gì xảy ra nếu ta chồng 100 lớp ẩn (Hidden Layers) lên nhau nhưng KHÔNG dùng hàm Activation nào (hoặc dùng hàm $f(x)=x$)?</p>
    
    <div class="formula-block my-4 p-4 bg-red-50 text-red-900 border-red-300">
      <p>Lớp 1: $H_1 = X \\cdot W_1$</p>
      <p>Lớp 2: $H_2 = H_1 \\cdot W_2 = (X \\cdot W_1) \\cdot W_2 = X \\cdot (W_1 \\cdot W_2)$</p>
      <p>Lớp 3: $H_3 = H_2 \\cdot W_3 = X \\cdot (W_1 \\cdot W_2 \\cdot W_3)$</p>
    </div>
    <p>Do tính chất kết hợp của Ma trận, vô vàn các mặt phẳng Linear nhân nhau $(W_1 \\cdot W_2 \\cdot W_3)$ cũng chỉ tự triệt tiêu, gộp chung lại thành <strong>ĐÚNG MỘT Ma trận $W_{gop}$ duy nhất</strong>. Nghĩa là mạng 100 lớp của bạn phế vật không khác gì mạng 1 lớp. Nó quay về mốc đầu tiên: Vẽ 1 đường thẳng, vĩnh viễn không thể cày nát bài toán XOR!</p>
  </div>

  <h3>1.2. Công dụng cứu rỗi của Activation Function</h3>
  <p>Hàm kích hoạt (Activation Function) là "chiếc bản lề" bẻ gãy đường thẳng, vò nát không gian mượt mà của Toán học Tuyến Tính.</p>
  <ul class="steps-container mt-4">
    <li class="step-card">
      <div class="step-number" style="background-color: var(--secondary-blue);">XOR</div>
      <p>Chính sự bẻ gãy (Khuỷu tay của ReLU) hay uốn lượn (Đường lượn sóng chữ S của Sigmoid) ép không gian Vector cuộn tròn hình vòng cung. Nhờ đó đường ranh giới cắt qua XOR (Non-linearly separable) mới được khắc họa.</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--warning-yellow);">Gate</div>
      <p>Tương tự như Neuron thần kinh sinh học: Nó quyết định <em>"Liệu xung điện này đủ đô để truyền sang rễ thần kinh Neuron kế tiếp hay tắt ngóm?"</em> (Tính kích hoạt).</p>
    </li>
  </ul>
</div>
    `,
    defaultCode: `// Hệ quả Toán học: Mạng Sâu + Không bẻ lượn = Nông cạn.
// Phép chứng minh bằng Rust: Giả lập 2 Layer không có Phi tuyến tính.
fn main() {
    println!("=== CHỨNG MINH: AI KHÔNG CÓ ACTIVATION LÀ AI VÔ DỤNG ===");
    
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
}`
  },
  {
    id: 'ch21_03_02',
    title: '2. Các Hàm Cổ Điển: Sigmoid và Tanh',
    duration: '80 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">ssid_chart</span> 2. Hàm kích hoạt Cổ điển: Sigmoid & Tanh</h2>

  <h3>2.1. Sigmoid (Logistic Function)</h3>
  <div class="grid grid-cols-2 gap-4 my-4">
    <div class="bg-slate-50 p-4 border rounded">
      <h4 class="font-bold border-b pb-2 mb-2">Toán học & Đạo hàm</h4>
      <p class="font-mono text-sm">Công thức: $f(x) = \\frac{1}{1 + e^{-x}}$</p>
      <p class="font-mono text-sm mt-2 text-red-600">Đạo hàm: $f'(x) = f(x)(1 - f(x))$</p>
      <ul class="text-xs list-disc pl-4 mt-2 text-gray-700">
        <li>Range (Giới hạn Output): $(0, 1)$</li>
        <li>Ý nghĩa: Ép vạn vật về dải Xác suất (Probability). Thích hợp cực độ cho Output Layer của bài toán Binary Classification.</li>
      </ul>
    </div>
    <div class="bg-gray-900 border-gray-700 text-green-400 p-4 rounded font-mono text-xs flex items-center justify-center">
      <pre>
   1.0 |         .---
       |       /
   0.5 +-----.-------
       |   /
   0.0 |---
      -5    0    5
      </pre>
    </div>
  </div>

  <div class="callout callout-danger">
    <div class="callout-icon"><span class="material-symbols-outlined">warning</span></div>
    <div class="callout-content">
      <strong>Vấn nạn tử thần: Vanishing Gradient (Triệt tiêu Đạo hàm)</strong>
      <p>Kẻ Thù Truyền Kiếp giết chết Sigmoid trên các Hidden Layers. Hãy nhìn biểu thức đạo hàm: Giá trị Lớn nhất của $f'(x)$ tại đỉnh $x=0$ chỉ vỏn vẹn $0.25$!</p>
      <p>Nằm ngoài rìa ($x > 3$ hoặc $x < -3$), đồ thị Sigmoid Cực Kỳ Bằng Phẳng. Đạo hàm (Độ dốc) tại đó rơi tõm về gần bằng $0$. Quá trình Gradient Descent nhân lùi lại (Backprop) qua Chain Rule:</p>
      <p class="font-mono text-center my-2 text-red-600 bg-red-50 p-1">$0.25 \\times 0.25 \\times 0.25 \\times \\dots \\to 0$ (Biến mất vào khoảng không)</p>
      <p>Hệ quả: Dữ liệu lan ngược qua 5-10 lớp mạng sâu bị teo tóp về Zero ($0$), các nơ-ron phần gốc bị điếc, không học lóm được con số Weights nào, đẩy mô hình vào trạng thái ngưng trệ <em>"Vanishing Gradient"</em>.</p>
    </div>
  </div>

  <h3>2.2. Hyperbolic Tangent (Tanh)</h3>
  <div class="grid grid-cols-2 gap-4 my-4">
    <div class="bg-slate-50 p-4 border rounded">
      <h4 class="font-bold border-b pb-2 mb-2">Toán học & Đạo hàm</h4>
      <p class="font-mono text-sm">Công thức: $tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}$</p>
      <p class="font-mono text-sm mt-2 text-red-600">Đạo hàm: $f'(x) = 1 - tanh(x)^2$</p>
      <ul class="text-xs list-disc pl-4 mt-2 text-gray-700">
        <li>Range (Giới hạn Output): $(-1, 1)$</li>
        <li>Bản chất: Là hàm Sigmoid được kéo giãn lên xuống và dịch qua trái. Được đánh giá là phiên bản <em>"Sigmoid Thượng đẳng"</em>.</li>
        <li>Ưu điểm: Zero-centered (Tâm Output xoay quanh số 0), đạo hàm đỉnh điểm đạt $1.0$ thay vì chỉ $0.25$, giúp gradients sống sót đi qua mạng lâu hơn.</li>
      </ul>
    </div>
    <div class="bg-gray-900 border-gray-700 text-blue-400 p-4 rounded font-mono text-xs flex items-center justify-center">
      <pre>
    1  |         .---
       |       /
    0  +-[---]---.---
       |   /
   -1  |---
      -5    0    5
      </pre>
    </div>
  </div>
</div>
    `,
    defaultCode: `// Demo Đoạn mã Sigmoid và Triệt Tiêu Đạo Hàm (Vanishing Gradient)
fn sigmoid(x: f64) -> f64 {
    1.0 / (1.0 + (-x).exp())
}

// Đạo hàm Sigmoid: y * (1 - y)
fn sigmoid_deriv(x: f64) -> f64 {
    let s = sigmoid(x);
    s * (1.0 - s)
}

fn main() {
    println!("=== THẢM HỌA VANISHING GRADIENT CỦA SIGMOID ===");
    
    // Đỉnh tại x=0 
    println!("Độ dốc cực đại tại X=0 đo được: {}", sigmoid_deriv(0.0)); // 0.25!
    
    // Lan truyền ngược (Backpropagation) qua mạng sâu 5 lớp.
    // Giả sử các weights ban đầu xung quanh 0, đạo hàm tốt nhất ở mỗi neuron đang chịu trần là ~0.25.
    let mut gradient_lan_truyen = 1.0; // Bắt đầu trừ từ Lỗi phía Output
    let so_lop = 5;
    
    for i in 1..=so_lop {
        // Chain Rule: Gradient cũ * Đạo hàm Activation * Trọng số (Giả định w=1.0)
        gradient_lan_truyen = gradient_lan_truyen * 0.25 * 1.0;
        println!("  - Lùi qua Lớp {}: sức mạnh tín hiệu học còn lại: {:.6}", so_lop - i + 1, gradient_lan_truyen);
    }
    
    println!("\\n>>> Tín hiệu học lùi về tận Input Lớp 1 chỉ còn {:.6}. Nơ-ron Lớp 1 gần như bị điếc, không cập nhật được Trọng số nữa!", gradient_lan_truyen);
    println!("=> Không thể xây mạng Deep Neural Network hàng trăm tầng nếu xài Sigmoid!");
}`
  },
  {
    id: 'ch21_03_03',
    title: '3. Kỷ nguyên của ReLU và The Dead ReLU',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">trending_up</span> 3. ReLU gia nhập giang hồ (Rectified Linear Unit)</h2>

  <h3>3.1. Sự cứu vớt Mạng Sâu</h3>
  <div class="definition-block mb-4">
    <p>Khoảng năm 2012 (Kỷ nguyên AlexNet), người ta ngán ngẩm Sigmoid tột độ. Và <strong>ReLU</strong> trở thành vị Thánh Cứu Rỗi của Deep Learning hiện đại. Thuật toán của nó dễ hều đến mức khôi hài, nhưng sự vĩ đại của nó đã định hình lại toán học của AI.</p>
  </div>

  <div class="grid grid-cols-2 gap-4 my-4">
    <div class="bg-green-50 p-4 border rounded">
      <h4 class="font-bold border-b pb-2 mb-2 border-green-200">Toán học & Đạo hàm của ReLU</h4>
      <p class="font-mono text-sm bg-white p-2">Công thức: $f(x) = max(0, x)$</p>
      <p class="font-mono text-xs mt-2 text-green-800">
        Đạo hàm: <br/>
        $f'(x) = 1$ (Nếu $x > 0$)<br/>
        $f'(x) = 0$ (Nếu $x < 0$)
      </p>
      <ul class="text-xs list-disc pl-4 mt-2 text-gray-700">
        <li><strong>Đại ưu điểm 1:</strong> Không cãi nhau với Toán vi phân nhiều ($1$ hoặc $0$), tính toán nhanh thần tốc tiết kiệm hàng ngàn TFLOP GPU.</li>
        <li><strong>Đại ưu điểm 2:</strong> Gradient cho nhánh x dương LA LUÔN LÀ $1.0$! Phá tan phong ấn <em>Vanishing Gradient</em>. Nhân đạo hàm chain rule cả 1000 lần ($1.0 \\times 1.0 \\times 1.0$) nó vẫn không bao giờ bẹp dí về $0$. Tha hồ xếp mạng lưới sâu tỉ lớp!</li>
      </ul>
    </div>
    <div class="bg-gray-900 border-gray-700 text-yellow-400 p-4 rounded font-mono text-xs flex items-center justify-center font-bold">
      <pre>
        |       / (Độ dốc = 1)
        |      /
        |     /
--------+----/--  (Trục X)
 (0)    |   /
      </pre>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">skull</span> 3.2. Cơn Ác Mộng: THE DYING RELU PROBLEM</h3>
  <div class="callout callout-danger mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">gavel</span></div>
    <div class="callout-content">
      <strong>Khi Nơ-ron tử nạn (Dead Neurons)</strong>
      <p>Khuyết điểm kinh dị nhất của ReLU nằm ngay tại nhánh Âm ($x < 0$, Output $0$, Đạo hàm $0$).</p>
      <p>Điều gì xảy ra nếu Learning Rate vớ vẩn giật một Nơ-ron văng Weight/Bias của nó xuống vùng Âm cực lớn? Dòng giá trị đi qua Nơ-ron này ngay lập tức bị hàm ReLU băm chết ($=0$). Lúc này Đạo hàm từ Backprop dội ngược lại cũng vướng <strong>$0$</strong>.</p>
      <p>Chain Rule nhân với $0$ đứt gánh <strong>$\to$</strong> Weight không hề xê dịch <strong>$\to$</strong> Nơ-ron lọt vào bẫy, chết rũ xương mãi mãi câm nín trong suốt những Epoch sau. Mạng của bạn cồng kềnh 100,000 Nơ-ron nhưng thực tế 40,000 tế bào đã... <b>Chết lâm sàng</b>.</p>
    </div>
  </div>

  <h3>3.3. Các vị thần Y thuật (Các biến thể Vá lỗi rò rỉ)</h3>
  <div class="features-grid">
    <div class="feature-card">
        <h4 class="font-bold text-sm">Leaky ReLU</h4>
        <p class="font-mono text-xs my-2 text-blue-700">$f(x) = x$ nếu $x > 0$</p>
        <p class="font-mono text-xs mb-2 text-red-700">$f(x) = 0.01x$ nếu $x < 0$</p>
        <p class="text-xs">Thay vì băm vằm nhánh âm thành mức $0$ bằng phẳng tuyệt đối, ta khoét 1 lỗ kim trích ra chút độ dốc (0.01). Gradient vẫn lách dội qua! Đỡ chết neuron.</p>
    </div>
    <div class="feature-card">
        <h4 class="font-bold text-sm">PReLU (Parametric ReLU)</h4>
        <p class="text-xs mt-2">Độ dốc $\\alpha$ dưới nhánh âm ($x < 0$) không cài cứng $0.01$ nữa, mà ném cho Neural Network tự huấn luyện $\\alpha$ lúc train lóng ngóng mưu cầu độ đốc tốt nhất.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// Mô Phỏng Hàm LEAKY RELU Cứu Sống DYING NEURONS
// =====================================================

fn relu(x: f64) -> f64 { if x > 0.0 { x } else { 0.0 } }
fn relu_deriv(x: f64) -> f64 { if x > 0.0 { 1.0 } else { 0.0 } }

fn leaky_relu(x: f64) -> f64 { if x > 0.0 { x } else { 0.01 * x } }
fn leaky_relu_deriv(x: f64) -> f64 { if x > 0.0 { 1.0 } else { 0.01 } }

fn main() {
    println!("=== DYING RELU vs. SỰ CHỮA LÀNH CỦA LEAKY RELU ===");
    
    // Một Nơ-ron lầm đường lạc lối với Output Z cực âm (-10.5).
    let z_te_hai = -10.5;
    
    println!("\\n[1] MẠNG DÙNG RELU GỐC:");
    println!("Output Forward: {}", relu(z_te_hai)); // 0 vĩnh cữu
    let grad_relu = relu_deriv(z_te_hai);
    println!("Dòng Gradient Lan Lùi về (Toán Học): {}", grad_relu);
    if grad_relu == 0.0 {
        println!(">>> Weight = Weight - (LearningRate * 0) --> WEIGHT ĐÓNG BĂNG! NƠ-RON CHẾT ĐỨNG!");
    }
    
    println!("\\n[2] MẠNG DÙNG LEAKY RELU:");
    let l_output = leaky_relu(z_te_hai);
    println!("Output Forward rò rỉ tí khí: {:.3}", l_output);
    let grad_leaky = leaky_relu_deriv(z_te_hai);
    println!("Dòng Gradient Lan Lùi về (Toán Học): {:.3}", grad_leaky);
    if grad_leaky > 0.0 {
        println!(">>> Gradient vẫn chảy rỉng rỉng được tẹo (0.01). Nơ-ron chưa chết, một ngày nào đó Lực kéo về Dương sẽ vực nó dậy!");
    }
}`
  },
  {
    id: 'ch21_03_04',
    title: '4. Softmax và Activation Thế hệ mới (GELU, Swish)',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">flare</span> 4. Cảnh Giới Tối Tân: Softmax, GELU, Swish</h2>

  <h3>4.1. Hàm Softmax - Trùm cuối lớp Output</h3>
  <div class="definition-block mb-4">
    <p>Nếu bạn phân loại chó, mèo, heo (Multi-class Classification), bạn muốn Lớp Output phun ra 3 con số Xác suất mà TỔNG CỦA CHÚNG bắt buộc bằng $1.0$ (100%).</p>
    <p>Nếu Lớp ra phun bộ điểm $Z = [2.0, 1.0, 0.1]$, Softmax sẽ cường hóa và chuẩn hóa phân cực chúng qua Logarithm số mũ $e$:</p>
  </div>
  
  <div class="formula-block mb-4 text-center">
    $Softmax(z_i) = \\frac{e^{z_i}}{\\sum_{j} e^{z_j}}$
  </div>
  
  <ul class="text-sm list-disc pl-5">
    <li>Tại sao bắt buộc xài $e$ (Số Euler)? Do đạo hàm của $e^x$ là chính nó $\to$ dễ tính toán Chain rule mỹ mãn.</li>
    <li>Thuộc tính "Hard": Phân cực sâu (Khoảng cách điểm số bị phóng đại nồng nặc khi đẩy lên mũ). Điểm 2.0 lớn hơn điểm 1.0 là 2 lần; nhưng lên $e$ sẽ biến thành $\\sim 7.3$, nhét mồm đối thủ.</li>
  </ul>

  <h3><span class="material-symbols-outlined">robot_2</span> 4.2. Activation của LLM Hiện Đại (GPT/Transformer)</h3>
  <div class="features-grid mt-4">
    <div class="feature-card">
      <h4 class="font-bold text-blue-800">GELU (Gaussian Error Linear Unit)</h4>
      <p class="text-xs underline mb-1">Mặc định của GPT, BERT.</p>
      <p class="text-xs">Không băm cụt $0$ gắt gỏng như ReLU. Nó cong mượt dẻo dai ở khúc dốc quanh trục $0$ dựa vào phân phối xác suất hình chuông. Khúc âm không những bị khóa lại mà còn võng âm xuống một tẹo trước khi tiệm cận lên 0.</p>
      <p class="font-mono mt-2 text-xs bg-gray-100 p-1">$x \cdot \Phi(x)$</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold text-indigo-800">Swish (SiLU - Sigmoid Linear Unit)</h4>
      <p class="text-xs underline mb-1">Phát kiến của Google Brain, vua của YOLOv8, Llama-3.</p>
      <p class="text-xs">Kỳ lạ thay, việc lấy $x$ nhân với độ Sigmoid của chính nó cho ra một đường cong giống in hệt GELU nhưng không cần thuật toán xác suất rườm rà. Thể hiện uy lực đào tạo Mạng Viễn Tưởng.</p>
      <p class="font-mono mt-2 text-xs bg-gray-100 p-1">$f(x) = x \cdot sigmoid(x)$</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// THÍ NGHIỆM ĐỘ "CỰC ĐOAN" CỦA SOFTMAX FUNCTION
// (Nhấn mạnh sự kiêu ngạo của Kẻ Thắng Cuộc Takes All)
// =====================================================

fn softmax(z: &[f64]) -> Vec<f64> {
    // Để chống tràn số (Numerical Instability - Exploding tới NaN)
    // Thực tế khoa học phải kéo đỉnh lùi lại chừa mặt max_val
    let max_val = z.iter().cloned().fold(f64::NEG_INFINITY, f64::max);
    
    let mut exp_vals = vec![];
    let mut sum_exp = 0.0;
    
    for &val in z {
        // Trừ max_val đi để kẹp mũ e khỏi nổ tràn 64-bit float
        let e = (val - max_val).exp(); 
        exp_vals.push(e);
        sum_exp += e;
    }
    
    exp_vals.into_iter().map(|e| e / sum_exp).collect()
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║                   SOFTMAX - KẺ MẠNH ĂN TẤT CẢ                        ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    let logits = vec![1.0, 2.0, 5.0]; // Điểm đầu ra gốc (Dog: 1, Cat: 2, Máy Bay: 5)
    let probs = softmax(&logits);
    
    println!("Biên độ thô (Logits): {:?}", logits);
    println!("Xác suất trả về sau Softmax:");
    println!("- Điểm Dog ({})     -> Tỷ lệ: {:.4}%", logits[0], probs[0]*100.0);
    println!("- Điểm Cat ({})     -> Tỷ lệ: {:.4}%", logits[1], probs[1]*100.0);
    println!("- Máy Bay ({})     -> Tỷ lệ: {:.4}%", logits[2], probs[2]*100.0);
    
    println!("\\n>>> PHÂN TÍCH QUYỀN LỰC SỐ MŨ (EXPONENTIAL):");
    println!("Có thể thấy Máy Bay (5.0) không chỉ mạnh gấp 2.5 lần Cat (2.0) như cấp số cộng tuyến tính.");
    println!("Hàm Softmax (mũ e) đã KHOẾCH ĐẠI Máy Bay lên chiếm tới {:.2}% lãnh địa, đè nát hiềm nghi còn lại!", probs[2]*100.0);
}`
  }
];

export const ch21_03: Chapter = {
  id: 'ch21_03',
  title: '21.3. Activation Functions',
  introduction: `
    <h2>Tế bào Linh hồn bóp méo Không Gian Tuyến Tính</h2>
    <ul>
      <li>Đi sâu vào cốt tủy Đỉnh và Đáy Toán học của Functions.</li>
      <li>Hiện tượng Triệt tiêu Đạo Hàm (Vanishing) & Xác Nơ-ron (Dead Relu).</li>
      <li>GELU/Swish làm mưa làm gió trong Transformers/LLM đương đại.</li>
    </ul>
  `,
  lessons: ch21_03_lessons,
};

export default ch21_03;
