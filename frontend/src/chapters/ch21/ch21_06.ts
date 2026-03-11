// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 6: BACKPROPAGATION & COMPUTATIONAL GRAPH
//
// Mục tiêu học thuật:
// 1. Phân tích Chain Rule (Đạo Hàm Hợp) từ Nền Tảng tới Ma Trận.
// 2. Định nghĩa Computational Graph (Đồ thị Tính toán DAG).
// 3. Cơ chế Forward Pass và Cất Giữ Bộ Nhớ (Cache).
// 4. Cơ chế Backward Pass (Reverse Auto-diff mô phỏng PyTorch).
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_06_lessons: Lesson[] = [
  {
    id: 'ch21_06_01',
    title: '1. Chain Rule (Đạo Hàm Hợp) Dạng Cổ Điển',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">account_tree</span> 1. Chain Rule - Trái Tim của Backpropagation</h2>

  <h3>1.1. Tại sao cần Chain Rule?</h3>
  <div class="definition-block mb-4">
    <p>Thuật toán <strong>Lan truyền ngược (Backpropagation)</strong> có mục tiêu tối hậu: Tìm ra đạo hàm của hàm Loss ($L$) LÊN TỪNG $Weight$ MỘT từ tầng Output về tận tầng Input. Câu hỏi Toán Học đặt ra là:</p>
    <p class="font-bold text-red-700 italic mt-2 text-center">"Đạo hàm $\\frac{\\partial L}{\\partial W_1}$ (Sức ảnh hưởng của Trọng số lớp 1 lên Tội lỗi ở Lớp cuối cùng) là bao nhiêu?"</p>
    <p>Trọng số $W_1$ rúc sâu đằng sau Lớp 1, bị vùi lấp bởi Lớp 2, Lớp 3, Lớp 4... Ta không thể tính trực tiếp được. Phải dùng Chain Rule để <strong>Bắc Cầu</strong> cưa đổ từng lớp một.</p>
  </div>

  <h3>1.2. Phép Tính Cổ Điển (Scalar)</h3>
  <div class="image-showcase my-4">
    <div class="bg-gray-900 border-gray-700 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto text-center font-bold">
      <pre>
   (x) --- [ * w ] ---> (z) --- [ Sigmoid ] ---> (a) --- [ Loss() ] ---> (L)
      </pre>
    </div>
  </div>

  <p>Muốn tính $\\frac{\\partial L}{\\partial w}$, ta đi ngược từ $L$ bóc vỏ từng lớp hành đến cuối đường hầm $w$ dựa theo sơ đồ nhánh phía trên:</p>
  
  <div class="formula-block text-lg mt-2 mb-4 p-4 text-center">
    $\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial a} \\times \\frac{\\partial a}{\\partial z} \\times \\frac{\\partial z}{\\partial w}$
  </div>

  <ul class="steps-container">
    <li class="step-card">
      <div class="step-number" style="background-color: var(--danger-red);">Bước 1</div>
      <p>$\\frac{\\partial L}{\\partial a}$ (Gradient của Output so với Loss): Nếu xài MSE Loss $L = (a - y)^2$, đạo hàm sẽ là $2(a - y)$. Vỏ hành đầu tiên đã vỡ.</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--warning-yellow);">Bước 2</div>
      <p>$\\frac{\\partial a}{\\partial z}$ (Gradient của Activation): Tùy thuộc vào cửa chớp. Nếu lớp đó xài Sigmoid, đạo hàm của Sigmoid $f'(z) = a(1-a)$. Tín hiệu lỗi bị bóp méo khi xuyên qua vỏ hành thứ 2.</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--secondary-blue);">Bước 3</div>
      <p>$\\frac{\\partial z}{\\partial w}$ (Gradient của Thuần Linear): Hàm $z = w \\cdot x + b$, đạo hàm theo $w$ đơn giản nảy ra chính Input ban đầu là $x$. Vỏ hành cuối cùng lộ diện!</p>
    </li>
  </ul>
</div>
    `,
    defaultCode: `// MINH HỌA BACKPROPAGATION CHAIN RULE BẰNG TAY (Toán Phức Hợp)
// =====================================================

fn sigmoid_deriv(a: f64) -> f64 { 
    a * (1.0 - a) 
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              GIẢI PHẪU CHAIN RULE TỪNG LỚP HÀNH MỘT                  ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");
    
    // Một Nơ-ron ảo duy nhất.
    let x = 2.0;    // Dữ liệu đầu vào
    let y = 1.0;    // Target nhắm tới
    let w = 0.5;    // Weight ngẫu nhiên lúc chưa học
    let b = 0.1;    // Bias

    println!("\\n[FORWARD PASS] - Đâm Tới:");
    let z = w * x + b; // z = 0.5*2 + 0.1 = 1.1
    let a = 1.0 / (1.0 + (-z).exp()); // Sigmoid activation
    let loss = (a - y) * (a - y);     // Phạt theo độ chênh
    println!("- Tín hiệu z: {:.4}", z);
    println!("- Dự đoán a: {:.4}", a);
    println!("- Tội lỗi Loss: {:.4}", loss);

    println!("\\n[BACKWARD PASS - CHAIN RULE] - Lan Lùi Bắc Cầu:");
    
    // Bước 1: Vỏ Loss đo xem Cửa Lớp (a) đang bóp méo mình thế nào? 
    let dl_da = 2.0 * (a - y); 
    println!("1. Đạo hàm Loss / Cửa Ra (a): {:.4}", dl_da);
    
    // Bước 2: Vỏ Activation Sigmoid (a) tính xem Bản lề Nhập (z) làm nó uốn khúc thế nào?
    let da_dz = sigmoid_deriv(a);
    println!("2. Đạo hàm của Cửa Ra (a) / Bản lề (z): {:.4}", da_dz);
    
    // Bước 3: Cán cân Linear (z) xoi móc xem tên Weight thọc gậy vô mức nào?
    let dz_dw = x;
    println!("3. Đạo hàm Bản lề (z) / Trọng số (w): {:.4}", dz_dw);
    
    let dl_dw = dl_da * da_dz * dz_dw;
    println!("\\n>>> TỔNG LƯỚI ĐIỆN VỀ ĐẾN ĐÍCH W (Nhân Cả 3 lại): {:.4}", dl_dw);
    println!("(Đây chính là Tín Hiệu Gradient cực kì chính xác gõ vào đầu Weight!)");
}`
  },
  {
    id: 'ch21_06_02',
    title: '2. Computational Graph & Auto-Differentiation',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">bubble_chart</span> 2. Đồ Khảo Tính Toán (Computational Graphs)</h2>

  <h3>2.1. DAG (Directed Acyclic Graph) - Bộ Não của PyTorch</h3>
  <div class="definition-block mb-4">
    <p>Nếu Neural Network có Cả Trăm lớp với hàng ngàn biểu thức tạp nham. Con người không rảnh tay viết toán giải tích Chain rule thủ công cho cả ngàn phép biến hóa được!</p>
    <p>Thuật toán <strong>Reverse-mode Auto-differentiation</strong> của Pytorch hay Tensorflow bẻ nát vạn vật thành những Node Toán Học nguyên thủy nhất <em>(Cộng, Trừ, Nhân, Chia, Exp, Log, Tanh)</em> và vẽ một sơ đồ gọi là Computational Graph.</p>
  </div>
  
  <div class="image-showcase my-4 p-4 border border-dashed border-gray-400 bg-gray-50 flex justify-center">
    <pre class="font-mono text-xs font-bold text-gray-800">
    w1  --- [*] ---
             |     |
            x1     |--- [+] --- z --- [Sigmoid] --- a --- [MSE] --- Loss
    w2  --- [*] ---      |
             |           |
            x2           |
    b   -----------------
    </pre>
  </div>

  <h3>2.2. Giai Đoạn Nhớ Trí Nhớ Thuận (Forward Tracking)</h3>
  <p>Lúc mạng chạy Lan truyền Thuận tính ra đáp án Phía Trước, GPU không xoá trống RAM mà lẳng lặng <strong>Tính Luôn Các Đạo Hàm Cấp Thấp Nhất tại chỗ (Local Gradients) lưu lại Thành Các Băng Keo Caches.</strong></p>
  <ul class="text-sm list-disc pl-5 my-2">
    <li>Khi đi qua Node Nhân <code>[*]</code> của $w_1 \\cdot x_1$, đạo hàm $x_1$ được Cất giấu Vào Kho chờ sẵn mòn mỏi.</li>
    <li>Khi đi qua Node Cộng <code>[+]</code>, đạo hàm số $1$ được Cất giấu.</li>
  </ul>

  <h3><span class="material-symbols-outlined">rotate_left</span> 2.3. Làn Sóng Thần Chạy Xuyên Ngược Lại (Backward Pass)</h3>
  <div class="callout callout-success mt-4">
    <div class="callout-icon"><span class="material-symbols-outlined">electric_bolt</span></div>
    <div class="callout-content">
      <strong>Chain Rule Biến Thành Phép Giao Hàng Chuyển Phát:</strong>
      <p>Một tín hiệu $Gradient=1.0$ sinh ra từ tận cùng rễ của Node Loss. Nó đi lùi thục mạng theo từng Node Cầu của Computational Graph. Đi qua Node nào, Tín hiệu Upstream này <strong>Lập tức NHÂN GỘP (Dot Product) với Băng Keo Local Gradient cất giấu khi nãy</strong>, rồi lại truyền ngược Downstream tiếp tục xé rách lớp vỏ đằng sau.</p>
      <p>Cứ như thế, một vụ nổ Lỗi văng từ Loss lụi cụi nhân chuyền tay nhau về gõ văng đầu tất cả Weight, Bias tận cùng ngõ ngách sâu thẳm nhất.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// MÔ PHỎNG MỘT COMPUTATIONAL GRAPH MINI (Kiểu dáng nguyên thủy của Auto-Grad Framework)
// =====================================================

// Mỗi Operation (Node) luôn mang trong mình nhiệm vụ làm 2 việc: FORWARD và BACKWARD
struct MultiplyNode {
    cache_x: f64, // Bộ nhớ cục bộ khi Forward
    cache_w: f64,
}

impl MultiplyNode {
    fn forward(&mut self, x: f64, w: f64) -> f64 {
        self.cache_x = x; // Lưu lại để tí hồi quang phản chiếu
        self.cache_w = w;
        x * w
    }
    
    // Khi nhận tín hiệu Upstream từ tương lai dội về,
    // Nhân nó với Đạo hàm Cục bộ (Local Grads) rồi tẽ nhánh lùi lại về X và Trọng Số W!
    fn backward(&self, din: f64) -> (f64, f64) {
        let dx = din * self.cache_w; // local grad của x*w theo x là w
        let dw = din * self.cache_x; // local grad của x*w theo w là x
        (dx, dw)
    }
}

// Node Cộng (Bias)
struct AddNode;
impl AddNode {
    fn forward(&self, x1: f64, x2: f64) -> f64 { x1 + x2 }
    fn backward(&self, din: f64) -> (f64, f64) { 
        (din * 1.0, din * 1.0) // Local grad là 1.0, Giao nguyên đai nguyên kiện về 2 nhánh!
    }
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║                 COMPUTATIONAL GRAPH - TẾ BÀO PYTORCH                 ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");
    
    let x = 3.0;
    let w = 4.0;
    let b = -2.0;

    let mut mul_node = MultiplyNode { cache_x: 0.0, cache_w: 0.0 };
    let add_node = AddNode;

    // --- TRACKING FORWARD (Lưu trí nhớ Cục Bộ) ---
    let xw = mul_node.forward(x, w); // Tới Node Nhân (12.0)
    let z = add_node.forward(xw, b); // Tới Node Cộng (10.0)
    println!("Output Forward z: {}", z);

    // --- LÀN SÓNG THẦN BACKWARD (Dội Nước Xuyên Time) ---
    // Giả sử có MỘT TÊN Loss dội nước Gradient (din = 1.0) từ Z về.
    let din = 1.0; 
    
    // Sóng trúng Node Cộng (Tẽ ra xw và b làm đôi)
    let (d_xw, d_b) = add_node.backward(din); 
    
    // Sóng hất văng trúng Node Nhân (Lôi Caches lật lại)
    let (d_x, d_w) = mul_node.backward(d_xw);
    
    println!("\\n>>> Gradient Đã Dội Thành Công Truy Ngược Toán Học:");
    println!("Gradient Lên b: {} (Loss đẻ ra 1 đấm b bao nhiêu)", d_b);
    println!("Gradient Lên w: {} (Loss đẻ ra 1 đấm w tận {})", d_w, d_w);
}`
  },
  {
    id: 'ch21_06_03',
    title: '3. Full Backprop với Dạng Ma Trận (Matrix Form)',
    duration: '60 phút',
    type: 'practice',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">table_chart</span> 3. Tối thượng Backpropagation: Chuyển Dịch Lên Ma Trận</h2>

  <h3>3.1. Phép màu của Ma trận chuyển vị (Transpose)</h3>
  <div class="definition-block mb-4">
    <p>Ở Bài 2 (Forward Pass), ta đã nâng cấp Tín hiệu thành dạng Ma trận Batch $Z = X \\cdot W + b$. Điều này đồng nghĩa với việc Backward Pass (Chain rule) cũng bị ép chuyển hệ từ Phép Nhân Điểm Sinh Viên chán ngắt lên <strong>Ma Trận Đạo Hàm Cấp Cao (Jacobian matrix)</strong>.</p>
    <p>Thay vì $dL / dW = Lỗi \\times X$, giờ đây để Nhân ma trận với kích cỡ khớp lọt lòng với nhau, ta sẽ CẦN ĐẢO NGƯỢC X (Chuyển vị ma trận $X^T$) để cân bằng phép tính.</p>
    
    <div class="font-mono text-center p-4 bg-purple-50 text-purple-900 border border-purple-300 font-bold mb-4 font-lg">
      $dW = X^T \cdot dZ$ <br/><br/>
      $dX = dZ \cdot W^T$
    </div>
  </div>

  <h3>3.2. Cấu trúc Hình Chóp Ma trận Deep Learning</h3>
  <ul class="steps-container">
    <li class="step-card">
      <div class="step-number" style="background-color: var(--secondary-blue);">Layer N</div>
      <p>Lớp Mạng N nhận đạn Chùm $dZ^{[n]}$ từ Loss dội vào. Nó Lập tức Đảo chữ Thập (Transpose $\\cdot$) với $A^{[n-1]}$ để nhổ văng túi $dW^{[n]}$ đút cập nhật Trọng số riêng.</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--warning-yellow);">Lan truyền</div>
      <p>Tiếp theo, múc tàn tro $dZ^{[n]}$ nhân Đảo ngược $W^{[n]^T}$ ném quẳng ngược vào khe cửa của Lớp $N-1$ tạo đâm rách rào để lấy Lỗi cục bộ $dA^{[n-1]}$.</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--danger-red);">Layer N-1</div>
      <p>Lớp N-1 Nhận lỗi dội thẳng vào Activation (Sigmoid'/ReLU'). Kết quả lột gỡ $dZ^{[n-1]}$ tung toé rồi xoạc 2 cẳng truyền rỗng Cấu trúc Nhị thức Tương đồng đệ quy Lùi Về Input $X$.</p>
    </li>
  </ul>
</div>
    `,
    defaultCode: `// =====================================================
// ĐẠO HÀM DẠNG MA TRẬN BACKPROP (MATRIX FORM CHAIN RULE)
// Bí Thuật Cho Thấy Coder PyTorch Đã "Trốn Viết" Vất Vả Thế Nào
// =====================================================

fn sigmoid_deriv(x: f64) -> f64 { 
    let s = 1.0 / (1.0 + (-x).exp());
    s * (1.0 - s)
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║             LAN TRUYỀN NGƯỢC MATRIX FORM - TẬN CÙNG CÂU CHUYỆN       ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");
    
    // Tưởng tượng mẻ Data Batch Size = 2 hình (Dòng), mỗi hình 3 Features (Cột). -> Matrix (2 x 3)
    // Và Matrix Weight có chiều Size = (3 x 4) -> Đi vào Lớp Ẩn 4 Nơ-Rons.
    
    // Trực quan 1 node phép Nhân Bạo Lực Ma Trận: Z = X * W
    // Nếu Loss dội một chùm dZ (Size 2x4) lùi nhắm vào Node Nhân Z này.
    
    // Muốn tìm dW (Tức ma trận đạo hàm 3x4 đập vô Weight W)?
    // dW không thể = cọc X * dZ lởm khởm được, vì X là (2x3), dZ là (2x4). Không khớp Hàng x Cột Matrix Toán Học!
    // -> BẮT BUỘC ĐẢO CHỮ THẬP (Transpose) Lên X -> X^T trở thành (3x2).
    // Phép nhân vĩ đại đúc kết: dW (3x4) = X^T (3x2) * dZ (2x4). Mảnh Giáp Bọc Rơi khớp Kính Cực!
    
    println!("1. Đạo Hàm Ma Trận đập vô Trọng Số: dW = X^T * dZ");
    println!("   > Kích cở ăn khớp hoàn mỹ (M_In x Batch) * (Batch x M_Out) => (M_In x M_Out)");
    println!("\\n2. Đạo Hàm Ma Trận lừa vào Lùi Data ngược: dX = dZ * W^T");
    println!("   > Đi ngược lại tàn sát Lớp Layer đứng trước mình. Mạng Sâu ngàn Lớp đều bị Cầm Trịch Nhét Kẹo.");
    println!("\\n3. Đạo Hàm đập vô Bias vô dụng: db = Sum(dZ, dọc Vector Batch)");
    println!("   > Bias cưu chắp một hằng số trơ khấc cho mỗi nơ-ron, hứng đạn gom của cả Batch dồn chụm một cục.");
    
    println!("\\n>>> KẾT LUẬN TỐI THƯỢNG: Deep Learning = Véc tơ Gradient + Phép Cầm Tự Ma trận Cấp Số.");
}`
  }
];

export const ch21_06: Chapter = {
  id: 'ch21_06',
  title: '21.6. Backpropagation & Comp Graph',
  introduction: `
    <h2>Nghệ Thuật Lật Khung Vạn Vật (Backprop)</h2>
    <ul>
      <li>Hiểu cơ chế hoạt động của Đạo hàm hợp Chain Rule Toán học thuần túy.</li>
      <li>Bản ngã của Deep Learning Framework với Cấu trúc Computational Graph DAG đa biến.</li>
      <li>Hiểu vì sao Pytorch Tốn Ram: Lưu Trí Nhớ Cache khi Forward Đập Rút Backward dạt mây.</li>
      <li>Tuyệt kỹ Xoặc Chân Chuyển Thể Ma Trận: dW = Xt * dZ, Giải phẫu Code AI Bằng Tay Gạo Cộc.</li>
    </ul>
  `,
  lessons: ch21_06_lessons,
};

export default ch21_06;
