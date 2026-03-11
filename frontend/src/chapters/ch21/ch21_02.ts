// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 2: PERCEPTRON & FORWARD PASS
//
// Mục tiêu:
// 1. Cấu tạo của Perceptron - Đơn vị tính toán nhỏ nhất.
// 2. Linear Separability & Cái chết của Perceptron (Vấn đề XOR).
// 3. Multi-Layer Perceptron (MLP) - Sự trỗi dậy của Mạng Nơ-ron.
// 4. Forward Pass bằng Toán học Ma Trận (Matrix Form).
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_02_lessons: Lesson[] = [
  {
    id: 'ch21_02_01',
    title: '1. Perceptron - Tế bào nhân tạo đầu tiên',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">radio_button_checked</span> 1. Perceptron - Tế bào nhân tạo đầu tiên</h2>

  <h3>1.1. Cấu trúc học phỏng sinh học</h3>
  <div class="definition-block mb-4">
    <p>Năm 1957, Frank Rosenblatt tạo ra <strong>Perceptron</strong> - thuật toán đầu tiên mô phỏng lại cách một Nơ-ron não bộ đánh giá thông tin và đưa ra quyết định (0 hoặc 1). Nó là viên gạch nền móng lót đường cho kỷ nguyên Deep Learning hôm nay.</p>
  </div>

  <div class="grid grid-cols-2 gap-4 my-6">
    <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <h4 class="font-bold text-blue-800 border-b pb-2 mb-2">Thành phần cấu tạo</h4>
      <ul class="text-sm space-y-2 list-disc pl-4 text-blue-900">
        <li><strong>Inputs ($x_1, x_2, \dots$):</strong> Các tín hiệu đầu vào (Ví dụ: Pixel ảnh).</li>
        <li><strong>Weights ($w_1, w_2, \dots$):</strong> Trọng số đo lường độ quan trọng của từng Input. AI học là học cái này.</li>
        <li><strong>Bias ($b$):</strong> Định kiến cá nhân. Giúp Nơ-ron dễ vấp ngã (kích hoạt) hoặc lầm lì hơn. Kéo dịch ranh giới phân loại.</li>
      </ul>
    </div>
    <div class="bg-indigo-50 p-4 rounded-lg border border-indigo-100 flex flex-col justify-center">
      <h4 class="font-bold text-indigo-800 border-b pb-2 mb-2">Quy trình tính toán (Forward)</h4>
      <p class="font-mono text-sm bg-indigo-100 p-2 rounded text-indigo-900 mb-2">Bước 1: Tính Tổng $z = (w_1x_1 + w_2x_2) + b$</p>
      <p class="font-mono text-sm bg-indigo-100 p-2 rounded text-indigo-900">Bước 2: Kích hoạt $y = f(z)$</p>
      <p class="text-xs text-indigo-700 italic mt-2">Hàm f() kinh điển của Perceptron là hàm Step (Bước nhảy): z > 0 thì Output = 1, ngược lại = 0.</p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">join_left</span> 1.2. Mạch Logic AND, OR bằng Perceptron</h3>
  <p>Chỉ với 1 cục Nơ-ron đơn giản, máy tính đã có thể tự "học" lại các bảng chân trị Logic cơ bản:</p>
  
  <div class="features-grid mt-4">
    <div class="feature-card highlight-success">
        <h4 class="font-bold">Cổng AND (Bắt buộc cả 2 cùng đúng)</h4>
        <p class="text-xs mt-2 text-gray-600">Nếu Mưa ($x_1=1$) VÀ Lạnh ($x_2=1$) thì Nghỉ Học ($y=1$).</p>
        <p class="font-mono bg-white p-2 text-sm border mt-2">Weights: [w₁=1, w₂=1]<br/>Bias: b = -1.5</p>
        <p class="text-xs mt-1">Chỉ khi $1+1-1.5 = 0.5 > 0$ thì $y=1$.</p>
    </div>
    <div class="feature-card highlight-info">
        <h4 class="font-bold">Cổng OR (Chỉ cần 1 cái đúng)</h4>
        <p class="text-xs mt-2 text-gray-600">Nếu Ốm ($x_1=1$) HOẶC Nhà có việc ($x_2=1$) thì Nghỉ ($y=1$).</p>
        <p class="font-mono bg-white p-2 text-sm border mt-2">Weights: [w₁=1, w₂=1]<br/>Bias: b = -0.5</p>
        <p class="text-xs mt-1">Chỉ cần $1+0-0.5 = 0.5 > 0$ thì $y=1$.</p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">warning</span> 1.3. Cái chết mùa đông của AI (The XOR Problem)</h3>
  <div class="callout callout-danger mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">dangerous</span></div>
    <div class="callout-content">
      <strong>Vấn đề kinh điển Marvin Minsky vạch mặt (Năm 1969)</strong>
      <p>Perceptron về bản chất đang vẽ một <strong>Đường Thẳng</strong> vạch mặt hai cực Âm-Dương (Linear Separability).</p>
      <p>Tuy nhiên với cổng <code>XOR (Chỉ 1 trong 2 đúng, không được cả 2)</code>, các điểm dữ liệu nằm chéo góc nhau như bàn cờ caro. <strong>Không có bất kỳ một đường thẳng nào (Linear)</strong> có thể chia cắt được bàn cờ caro này. </p>
      <p class="text-sm italic mt-2 text-red-700">Tuyên bố này đã khai tử tiền tài trợ cho Mạng Nơ-ron trong ròng rã 20 năm rốt (AI Winter) trước khi người ta tìm ra cách nối chúng lại.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// PERCEPTRON GIẢI QUYẾT BÀI TOÁN LOGIC
// =====================================================

// Hàm Kích Hoạt Bước Nhảy (Step Function của Frank Rosenblatt)
fn step_activation(z: f64) -> i32 {
    if z >= 0.0 { 1 } else { 0 }
}

// Bộ não mầm non: Perceptron
struct Perceptron {
    w1: f64,
    w2: f64,
    b: f64,
}

impl Perceptron {
    fn forward(&self, x1: f64, x2: f64) -> i32 {
        let z = (self.w1 * x1) + (self.w2 * x2) + self.b;
        step_activation(z)
    }
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║                    PERCEPTRON - MÔ PHỎNG CỔNG LOGIC                  ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    let inputs = vec![(0.0, 0.0), (0.0, 1.0), (1.0, 0.0), (1.0, 1.0)];

    // 1. CỔNG AND: Bias âm sâu, đòi hỏi cả 2 input phải gồng mới qua được ngưỡng 0
    let and_gate = Perceptron { w1: 1.0, w2: 1.0, b: -1.5 };
    println!("\\n[1] TEST CỔNG AND (Weights=[1, 1], Bias=-1.5)");
    println!("x1 | x2 | Output");
    println!("---|----|-------");
    for (x1, x2) in &inputs {
        println!(" {} |  {} |   {}", x1, x2, and_gate.forward(*x1, *x2));
    }

    // 2. CỔNG OR: Bias cực nhẹ, chỉ cần 1 cú huých x1 hoặc x2 là vọt qua 0
    let or_gate = Perceptron { w1: 1.0, w2: 1.0, b: -0.5 };
    println!("\\n[2] TEST CỔNG OR (Weights=[1, 1], Bias=-0.5)");
    for (x1, x2) in &inputs {
        println!(" {} |  {} |   {}", x1, x2, or_gate.forward(*x1, *x2));
    }

    // 3. CỔNG XOR: Bất Khả Thi!
    println!("\\n[3] THỬ NGHIỆM CỔNG XOR (Nỗ lực trong tuyệt vọng)");
    println!("Thực tế: Dù bạn có chỉnh Weight/Bias kiểu gì cho 1 Nơ-ron, nó CŨNG KHÔNG THỂ chia tách XOR.");
    println!("Lý do: XOR không thể bị cắt đôi bởi 1 ĐƯỜNG THẲNG TRÊN MẶT PHẲNG.");
    println!("Giải pháp: Chúng ta cần bẻ cong không gian! (Thêm Tầng Ẩn - Hidden Layers).");
}`,
  },
  {
    id: 'ch21_02_02',
    title: '2. Multi-Layer Perceptron (MLP) & Ma trận',
    duration: '55 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">layers</span> 2. Multi-Layer Perceptron (MLP) - Bẻ Cong Không Gian</h2>

  <h3>2.1. Cấu trúc Deep Learning Cổ Điển</h3>
  <p>Để giải bài toán XOR (hoặc phân biệt chó/mèo tỉ mỉ), chúng ta kết nối hàng ngàn con Perceptron lại với nhau dệt thành <strong>Mạng Nơ-ron Nhân Tạo (Neural Network)</strong>. Khi mạng có từ 1 "Lớp Ẩn" (Hidden Layer) trở lên, ta gọi nó là Multi-Layer Perceptron (MLP).</p>

  <div class="image-showcase my-4">
    <pre class="bg-gray-900 border-gray-700 text-green-400 p-4 rounded-lg font-mono text-sm leading-relaxed overflow-x-auto mx-auto w-max shadow-xl">
[INPUT] ─── (W₁) ───> [HIDDEN LAYER 1] ─── (W₂) ───> [OUTPUT]

   X₁  ──/──────────> [ Nơ-ron H₁ ]  ───\\──────────> [ Dự Đoán ]
       /   \\        /                 /   \\        /
   X₂  ─────\\──────>  [ Nơ-ron H₂ ]  ──────\\───────
             ...              ...              ... 
    </pre>
  </div>

  <h3><span class="material-symbols-outlined">view_cozy</span> 2.2. Biểu diễn Bằng Ma Trận (Trái tim Toán Học)</h3>
  <div class="definition-block mb-4">
    <p>Ở bài 1 chúng ta viết công thức $z = w_1x_1 + w_2x_2 + b$. Giờ hãy tưởng tượng Lớp Ẩn có 100 nơ-ron, Input có 1000 pixels. Số lượng đường dẫn (Weights) là $1000 \\times 100 = 100,000$ đường. Coder không rảnh mà gõ thủ công!</p>
    <p>Toàn bộ kiến trúc mạng có thể gộp thành phương trình đại số tuyến tính thanh lịch:</p>
    <div class="formula-block text-xl">
      $Z = X \cdot W + b$<br/>
      $A = \text{Activation}(Z)$
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div class="bg-purple-50 p-4 rounded border border-purple-200">
      <h4 class="font-bold text-purple-900 border-b pb-2 mb-2">Đọc kĩ các chiều (Dimensions)</h4>
      <ul class="text-xs space-y-2 list-disc pl-4 text-purple-800">
        <li><strong>X (1 $\\times$ M):</strong> Ma trận Input (Dữ liệu vào có M features).</li>
        <li><strong>W (M $\\times$ N):</strong> Ma trận Weights giăng từ M inputs sang N nơ rôn ẩn (Chứa $M \\times N$ trọng số cần học).</li>
        <li><strong>b (1 $\\times$ N):</strong> Cục bướu Bias (Mỗi nơ-ron có 1 bias).</li>
        <li><strong>Z (1 $\\times$ N):</strong> Kết quả sau khi lấy $X$ dot $W$, chưa bị uốn cong.</li>
      </ul>
    </div>
    <div class="bg-green-50 p-4 rounded border border-green-200">
      <h4 class="font-bold text-green-900 border-b pb-2 mb-2">Quy luật Phép Nhân Ma Trận</h4>
      <p class="text-sm">Muốn nhân được 2 Ma trận, <strong>Cột của đứa trước phải khớp với Hàng của đứa sau.</strong></p>
      <p class="font-mono bg-white p-2 text-xs border border-green-300 mt-2 text-center text-gray-700">
        $(1 \times \mathbf{M}) \cdot (\mathbf{M} \times N) \Rightarrow (1 \times N)$
      </p>
      <p class="text-xs mt-2 italic text-green-800">Các lỗi báo crash "Size Mismatch" kinh hoàng trong Pytorch/TensorFlow thường xuất phát từ việc thiết kế sai Ma trận Weights này.</p>
    </div>
  </div>

  <h3>2.3. Quy trình Forward Pass Xuyên Thấu</h3>
  <p>Dữ liệu tràn gõ nhịp điệu toán học chạy tuột từ Input đến Output được gọi là <strong>Forward Propagation (Lan truyền thuận)</strong>:</p>
  <ul class="steps-container mt-2">
    <li class="step-card">
      <div class="step-number" style="background-color: var(--secondary-blue);">H₁</div>
      <p>$Z^{[1]} = X \cdot W^{[1]} + b^{[1]}$ <br/><span class="text-xs text-gray-500">$\rightarrow$ Tính tổng có trọng số ở Lớp 1. Lọc qua màng Activation để bẻ cong hình học: $A^{[1]} = ReLU(Z^{[1]})$</span></p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--warning-yellow);">H₂</div>
      <p>$Z^{[2]} = A^{[1]} \cdot W^{[2]} + b^{[2]}$ <br/><span class="text-xs text-gray-500">$\rightarrow$ Đem output lớp 1 $A^{[1]}$ làm Input cho layer 2. Tiếp tục bóp nặn: $A^{[2]} = ReLU(Z^{[2]})$</span></p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--danger-red);">Out</div>
      <p>$Z^{[3]} = A^{[2]} \cdot W^{[3]} + b^{[3]}$ <br/><span class="text-xs text-gray-500">$\rightarrow$ Chốt ra dự đoán cuối cùng: $\hat{y} = Sigmoid(Z^{[3]})$</span></p>
    </li>
  </ul>
</div>
    `,
    defaultCode: `// =====================================================
// FORWARD PASS - SỨC MẠNH CỦA MA TRẬN
// =====================================================

// Một cái Sigmoid cong nhẹ để bẻ gãy tính "Phẳng" của Linear (bẻ cong bàn cờ XOR)
fn sigmoid(x: f64) -> f64 { 1.0 / (1.0 + (-x).exp()) }

struct MLP_MatrixForm {
    // Không thèm khai báo w1, w2 lắt nhắt nữa. Chúng ta gộp hết thành Matrix (Mảng 2D)!
    w1: Vec<Vec<f64>>, // Ma trận Lớp 1 (Từ 2 Input -> 2 Nơ-ron Ẩn)
    b1: Vec<f64>,      // Bias Lớp 1
    w2: Vec<Vec<f64>>, // Ma trận Lớp 2 (Từ 2 Nơ-ron Ẩn -> 1 Output)
    b2: Vec<f64>,      // Bias Lớp 2
}

impl MLP_MatrixForm {
    fn new() -> Self {
        MLP_MatrixForm {
            // Khởi tạo các mặt phẳng dao phay đã được huấn luyện sẳn để giã cục XOR
            w1: vec![
                vec![ 20.0, -20.0], // Weights từ x1
                vec![ 20.0, -20.0], // Weights từ x2
            ],
            b1: vec![-10.0,  30.0], // b1 cho H1 và H2
            w2: vec![
                vec![ 20.0], // Weights từ H1 to Out
                vec![ 20.0], // Weights từ H2 to Out
            ],
            b2: vec![-30.0], // b2 cho Output
        }
    }

    // Mô phỏng (1 x M) m-dot (M x N) -> (1 x N)
    fn dense_forward(&self, input: &[f64], w_matrix: &Vec<Vec<f64>>, bias: &[f64]) -> Vec<f64> {
        let in_features = input.len();     // M
        let out_neurons = bias.len();      // N
        
        let mut z = vec![0.0; out_neurons];
        
        for n in 0..out_neurons {
            for m in 0..in_features {
                // Tích vô hướng (Dot product): x_m * W_m_n
                z[n] += input[m] * w_matrix[m][n]; 
            }
            z[n] += bias[n];
        }
        z
    }

    fn predict(&self, x: &[f64]) -> f64 {
        // --- LAYER 1 ---
        // z_1 = X.W1 + b1
        let z1 = self.dense_forward(x, &self.w1, &self.b1);
        // a_1 = Sigmoid(z_1)
        let a1: Vec<f64> = z1.iter().map(|&val| sigmoid(val)).collect();
        
        // --- LAYER 2 (OUTPUT) ---
        // z_2 = A1.W2 + b2
        let z2 = self.dense_forward(&a1, &self.w2, &self.b2);
        // y_hat = Sigmoid(z_2)
        sigmoid(z2[0])
    }
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║             MLP TIÊU DIỆT XOR BẰNG FORWARD PASS MA TRẬN              ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    let network = MLP_MatrixForm::new();
    let data_xor = vec![
        vec![0.0, 0.0], // Ra 0
        vec![0.0, 1.0], // Ra 1
        vec![1.0, 0.0], // Ra 1
        vec![1.0, 1.0], // Ra 0
    ];

    println!("\\nTEST XOR BẰNG MẠNG NƠ-RON 2 LỚP BẺ CONG KHÔNG GIAN:");
    println!("Input X1 | Input X2 | Máy Nhả Ra");
    println!("---------|----------|----------------------");
    for x in &data_xor {
        let prediction = network.predict(x);
        println!("   {}   |   {}    |  {:.4} (~{})", 
            x[0] as i32, x[1] as i32, prediction, prediction.round() as i32);
    }
    println!("\\n>>> Mạng Neural Network ĐÃ CRACK được XOR!");
    println!("Chỉ bằng việc chèn thêm Layer vào giữa (A1) và xếp đống công thức thành Toán Matrices. Quá ảo diệu!");
}`,
  },
];

export const ch21_02: Chapter = {
  id: 'ch21_02',
  title: '21.2. Perceptron & Forward Pass',
  introduction: `
    <h2>Bình minh của Deep Learning</h2>
    <ul>
      <li>Đi lại từ nền móng: Perceptron cổ đại học Logic Gate.</li>
      <li>Vấn nạn XOR tử địa giam cầm phát triển AI.</li>
      <li>Cách MLP tái sinh với Hidden Layers.</li>
      <li>Formalize toán học với Matrix Multiplication (Nhân Ma trận).</li>
    </ul>
  `,
  lessons: ch21_02_lessons,
};

export default ch21_02;
