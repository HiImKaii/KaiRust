// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 6: BACKPROPAGATION & COMPUTATIONAL GRAPH
//
// Mục tiêu học thuật:
// 1. Phân tích Chain Rule (Đạo Hàm Hợp) từ Nền Tảng tới Ma Trận.
// 2. Định nghĩa Computational Graph (Đồ thị Tính toán DAG).
// 3. Cơ chế Forward Pass và Cất Giữ Bộ Nhớ (Cache).
// 4. Cơ chế Backward Pass (Reverse Auto-diff mô phỏng PyTorch).
//
// Nội dung bổ sung:
// - Giải thích rõ ràng các thuật ngữ chuyên ngành
// - Liên kết mạch lạc giữa các khái niệm
// - Ví dụ chi tiết và phân tích
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
  <h2>1. Chain Rule - Nền Tảng Của Backpropagation</h2>

  <!-- MỞ ĐẦU -->
  <div class="story-intro mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-r">
    <p class="italic text-blue-900">
      Ở bài trước, chúng ta đã học về Gradient Descent và cách cập nhật weights để giảm Loss. Nhưng còn một câu hỏi quan trọng chưa được trả lời: <strong>Làm thế nào để tính được gradient của Loss theo từng weight?</strong>
    </p>
    <p class="mt-2 text-blue-800">
      Câu trả lời nằm trong <strong>Chain Rule</strong> (Quy tắc dây chuyền) - công cụ toán học cho phép tính đạo hàm của hàm hợp qua nhiều lớp biến đổi. Đây là nền tảng của thuật toán <strong>Backpropagation</strong> (Lan truyền ngược) - "trái tim" của mọi Neural Network.
    </p>
  </div>

  <h3>1.1. Tại sao cần Chain Rule?</h3>
  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa Backpropagation</span>
    <p><strong>Backpropagation</strong> (Lan truyền ngược) là thuật toán tính gradient của hàm Loss theo từng Weight trong mạng Neural. Gradient này cho biết "nếu tăng weight lên một chút thì Loss sẽ tăng hay giảm bao nhiêu".</p>

    <p class="mt-3"><strong>Thuật ngữ chuyên ngành:</strong></p>
    <ul class="list-disc pl-5 mt-1 text-sm">
      <li><strong>Backpropagation (Lan truyền ngược):</strong> Thuật toán tính gradient bằng cách truyền tín hiệu lỗi từ output ngược về input qua các lớp.</li>
      <li><strong>Forward pass (Lan truyền thuận):</strong> Quá trình tính toán từ input qua các lớp để ra output.</li>
      <li><strong>Weight (Trọng số):</strong> Tham số của mạng được học từ dữ liệu.</li>
    </ul>

    <p class="font-bold text-red-700 italic mt-4 text-center">"Đạo hàm $\\frac{\\partial L}{\\partial W_1}$ (ảnh hưởng của trọng số lớp 1 lên loss) là bao nhiêu?"</p>
    <p class="mt-3">Trọng số $W_1$ nằm sâu trong lớp đầu tiên, bị ẩn bởi các lớp tiếp theo. Nó không trực tiếp ảnh hưởng đến Loss mà phải qua nhiều "trạm trung gian": đầu ra của lớp 1 → đầu vào lớp 2 → ... → Loss. Chain Rule cho phép tính đạo hàm qua nhiều lớp bằng cách nhân các đạo hàm cục bộ.</p>
  </div>

  <!-- CHUYỂN TIẾP -->
  <div class="my-4 p-3 bg-gray-50 border-l-4 border-gray-400 rounded">
    <p class="text-sm"><strong>Từ lý thuyết đến thực hành:</strong> Vậy Chain Rule hoạt động như thế nào trong một neuron đơn giản? Hãy xem ví dụ cụ thể dưới đây.</p>
  </div>

  <h3>1.2. Phép Tính Cơ Bản (Scalar)</h3>
  <div class="image-showcase my-4">
    <div class="bg-gray-900 border-gray-700 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto text-center font-bold">
      <pre>
   (x) --- [ * w ] ---> (z) --- [ Sigmoid ] ---> (a) --- [ Loss() ] ---> (L)
      </pre>
    </div>
  </div>

  <p>Để tính $\\frac{\\partial L}{\\partial w}$, ta sử dụng Chain Rule:</p>

  <div class="formula-block text-lg mt-2 mb-4 p-4 text-center">
    $\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial a} \\times \\frac{\\partial a}{\\partial z} \\times \\frac{\\partial z}{\\partial w}$
  </div>

  <ul class="steps-container">
    <li class="step-card">
      <div class="step-number" style="background-color: var(--danger-red);">Bước 1</div>
      <p><strong>$\\frac{\\partial L}{\\partial a}$</strong> (Gradient của Output so với Loss): Với MSE Loss $L = (a - y)^2$, đạo hàm là $2(a - y)$. Đạo hàm này cho biết "nếu output tăng thì Loss tăng bao nhiêu".</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--warning-yellow);">Bước 2</div>
      <p><strong>$\\frac{\\partial a}{\\partial z}$</strong> (Gradient của Activation): Với Sigmoid, đạo hàm là $f'(z) = a(1-a)$. Đạo hàm này cho biết "nếu z tăng thì a (sau activation) tăng bao nhiêu".</p>
    </li>
    <li class="step-card">
      <div class="step-number" style="background-color: var(--secondary-blue);">Bước 3</div>
      <p><strong>$\\frac{\\partial z}{\\partial w}$</strong> (Gradient của tầng Linear): Với $z = w \\cdot x + b$, đạo hàm theo $w$ là $x$. Đạo hàm này cho biết "nếu weight w tăng thì z tăng bao nhiêu lần so với x".</p>
    </li>
  </ul>

  <!-- GIẢI THÍCH CHI TIẾT HƠN -->
  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Giải thích chi tiết: Tại sao phải nhân các gradient?</h4>
    <div class="space-y-2 text-sm">
      <p>Hãy tưởng tượng chuỗi tín hiệu: <strong>w → z → a → L</strong></p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>∂L/∂w</strong> = "Thay đổi w ảnh hưởng đến L như thế nào?"</li>
        <li>w ảnh hưởng đến z → z ảnh hưởng đến a → a ảnh hưởng đến L</li>
        <li>→ Tác động tổng = (tác động w→z) × (tác động z→a) × (tác động a→L)</li>
      </ul>
      <p class="mt-2">Đây chính là ý nghĩa của phép nhân trong Chain Rule!</p>
    </div>
  </div>

  <div class="my-4 p-4 bg-blue-50 border border-blue-300 rounded">
    <h4 class="font-bold text-blue-900 mb-3">Ví dụ số cụ thể</h4>
    <div class="space-y-2 text-sm">
      <p>Giả sử: x = 2, y = 1, w = 0.5, b = 0.1</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Forward:</strong> z = 0.5×2 + 0.1 = 1.1</li>
        <li><strong>Forward:</strong> a = sigmoid(1.1) ≈ 0.750</li>
        <li><strong>Forward:</strong> L = (0.750 - 1)² = 0.0625</li>
        <li><strong>Bước 1:</strong> ∂L/∂a = 2×(0.750-1) = -0.5</li>
        <li><strong>Bước 2:</strong> ∂a/∂z = 0.750×(1-0.750) = 0.1875</li>
        <li><strong>Bước 3:</strong> ∂z/∂w = x = 2</li>
        <li><strong>Tổng:</strong> ∂L/∂w = (-0.5) × 0.1875 × 2 = <strong>-0.1875</strong></li>
      </ul>
      <p class="mt-2">→ Gradient âm có nghĩa: tăng w sẽ <strong>giảm</strong> Loss!</p>
    </div>
  </div>

  <!-- CHUYỂN TIẾP -->
  <div class="my-4 p-3 bg-gray-50 border-l-4 border-gray-400 rounded">
    <p class="text-sm"><strong>Từ scalar đến ma trận:</strong> Ví dụ trên chỉ với một neuron đơn lẻ. Nhưng Neural Network thực tế có hàng triệu weights! Làm sao tính gradient cho tất cả? Câu trả lời nằm ở <strong>Computational Graph</strong>.</p>
  </div>
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
  <h2>2. Computational Graph (Đồ Tính Toán)</h2>

  <!-- MỞ ĐẦU -->
  <div class="story-intro mb-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-400 rounded-r">
    <p class="italic text-green-900">
      Ở bài trước, chúng ta đã học về Chain Rule với một neuron đơn giản. Nhưng Neural Network thực tế có hàng triệu weights với hàng trăm lớp. Việc tính gradient bằng tay cho tất cả là <strong>không khả thi</strong>.
    </p>
    <p class="mt-2 text-green-800">
      Giải pháp là xây dựng một <strong>Computational Graph</strong> (Đồ thị Tính toán) - biến mọi phép tính thành các node và tự động tính gradient bằng thuật toán <strong>Reverse-mode Auto-differentiation</strong>.
    </p>
  </div>

  <h3>2.1. DAG (Directed Acyclic Graph) - Nền tảng của PyTorch</h3>
  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa Computational Graph</span>
    <p><strong>Computational Graph</strong> (Đồ thị Tính toán) là biểu diễn của Neural Network dưới dạng đồ thị có hướng không chu trình (DAG), trong đó mỗi node đại diện cho một phép toán và các cạnh biểu diễn dòng dữ liệu.</p>

    <p class="mt-3"><strong>Thuật ngữ chuyên ngành:</strong></p>
    <ul class="list-disc pl-5 mt-1 text-sm">
      <li><strong>DAG (Directed Acyclic Graph):</strong> Đồ thị có hướng không chu trình - dữ liệu chỉ đi từ input đến output, không có vòng lặp.</li>
      <li><strong>Node (Đỉnh):</strong> Mỗi phép toán (cộng, nhân, sigmoid,...) được biểu diễn như một node.</li>
      <li><strong>Edge (Cạnh):</strong> Biểu diễn dòng dữ liệu giữa các node.</li>
      <li><strong>Primitive operations:</strong> Các phép toán nguyên thủy: Cộng, Trừ, Nhân, Chia, Exp, Log, Tanh, Sigmoid...</li>
    </ul>

    <p class="mt-3">Nếu Neural Network có hàng trăm lớp với hàng ngàn biểu thức phức tạp, việc tính đạo hàm theo phương pháp Chain Rule thủ công cho tất cả các phép biến đổi là không khả thi. Thuật toán <strong>Reverse-mode Auto-differentiation</strong> trong PyTorch và TensorFlow phân rã mọi phép tính thành các Node Toán học nguyên thủy nhất và xây dựng một đồ thị có hướng không chu trình gọi là Computational Graph.</p>
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

  <h3>2.2. Forward Pass - Lưu Trữ Cache</h3>
  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa Forward Pass</span>
    <p><strong>Forward Pass</strong> (Lan truyền thuận) là quá trình tính toán từ input qua các lớp để ra output. Trong quá trình này, hệ thống không chỉ tính toán kết quả mà còn lưu trữ các giá trị trung gian vào bộ nhớ cache.</p>

    <p class="mt-3"><strong>Thuật ngữ chuyên ngành:</strong></p>
    <ul class="list-disc pl-5 mt-1 text-sm">
      <li><strong>Cache (Bộ nhớ đ</strong> Lệm):ưu trữ tạm thời các giá trị trung gian trong Forward Pass để sử dụng trong Backward Pass.</li>
      <li><strong>Intermediate values:</strong> Các giá trị trung gian như z, a trong ví dụ neuron.</li>
      <li><strong>Local Gradient:</strong> Đạo hàm cục bộ của một node - cho biết output thay đổi thế nào khi input thay đổi.</li>
    </ul>
  </div>

  <p>Việc lưu cache rất quan trọng vì:</p>
  <ul class="text-sm list-disc pl-5 my-2">
    <li>Khi đi qua Node Nhân $w_1 \\cdot x_1$, đạo hàm theo $x_1$ (= w) và theo $w_1$ (= x₁) được lưu vào cache.</li>
    <li>Khi đi qua Node Cộng, đạo hàm bằng 1 được lưu vào cache.</li>
    <li>Nếu không lưu cache, ta phải tính lại tất cả từ đầu - rất tốn thời gian!</li>
  </ul>

  <div class="my-4 p-4 bg-blue-50 border border-blue-300 rounded">
    <h4 class="font-bold text-blue-900 mb-3">Ví dụ: Forward Pass với cache</h4>
    <div class="space-y-2 text-sm">
      <p>Giả sử có phép tính: z = w × x + b</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Forward:</strong> Tính z = 0.5 × 2 + 0.1 = 1.1</li>
        <li><strong>Cache:</strong> Lưu w = 0.5, x = 2, b = 0.1</li>
        <li>Sau này trong Backward Pass, khi cần ∂z/∂w, ta chỉ việc lấy x từ cache = 2!</li>
      </ul>
    </div>
  </div>

  <h3>2.3. Backward Pass - Lan Truyền Ngược</h3>
  <div class="definition-block mt-4">
    <span class="definition-term">Định nghĩa Backward Pass</span>
    <p><strong>Backward Pass</strong> (Lan truyền ngược) là quá trình tính gradient từ output (Loss) ngược về input. Đây là lúc Chain Rule được áp dụng để tính gradient cho tất cả weights.</p>

    <p class="mt-3"><strong>Thuật ngữ chuyên ngành:</strong></p>
    <ul class="list-disc pl-5 mt-1 text-sm">
      <li><strong>Upstream Gradient:</strong> Gradient đến từ phía sau (từ node tiếp theo trong đồ thị).</li>
      <li><strong>Downstream Gradient:</strong> Gradient đi về phía trước (về các node phía trước).</li>
      <li><strong>Local Gradient:</strong> Đạo hàm của node hiện tại: ∂output/∂input.</li>
    </ul>
  </div>

  <div class="callout callout-info my-4">
    <span class="callout-title">Công thức Backward Pass</span>
    <p class="mt-2"><strong>Downstream = Upstream × Local</strong></p>
    <p class="mt-2">Tại mỗi node, ta nhân gradient từ phía sau (upstream) với đạo hàm cục bộ (local gradient) để được gradient cần truyền về trước.</p>
  </div>

  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Ví dụ: Backward Pass từng bước</h4>
    <div class="space-y-2 text-sm">
      <p>Với đồ thị: w → [×] → z → [Sigmoid] → a → [Loss] → L</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Bước 1:</strong> ∂L/∂a = 2(a-y) = -0.5 (từ Loss)</li>
        <li><strong>Bước 2:</strong> ∂L/∂z = ∂L/∂a × ∂a/∂z = -0.5 × 0.1875 = -0.09375</li>
        <li><strong>Bước 3:</strong> ∂L/∂w = ∂L/∂z × ∂z/∂w = -0.09375 × 2 = -0.1875</li>
      </ul>
      <p class="mt-2">Mỗi bước đều sử dụng cache từ Forward Pass!</p>
    </div>
  </div>

  <div class="definition-block mt-4">
    <strong>Chain Rule trong Backward Pass:</strong>
    <p>Tín hiệu gradient khởi đầu từ Node Loss với giá trị 1.0. Tín hiệu này truyền ngược qua từng Node của Computational Graph. Tại mỗi Node, tín hiệu Upstream được nhân với đạo hàm cục bộ (Local Gradient) đã lưu trong cache, rồi tiếp tục truyền ngược về các Node phía trước.</p>
    <p class="mt-2">Quá trình này lặp lại cho đến khi gradient được tính cho tất cả các tham số Weight và Bias trong mạng.</p>
  </div>

  <!-- CHUYỂN TIẾP -->
  <div class="my-4 p-3 bg-gray-50 border-l-4 border-gray-400 rounded">
    <p class="text-sm"><strong>Từ lý thuyết đến ma trận:</strong> Chúng ta đã hiểu cơ chế với scalar. Nhưng Neural Network thực tế làm việc với ma trận hàng triệu phần tử! Làm sao tính gradient cho ma trận? Hãy xem phần tiếp theo.</p>
  </div>
</div>
    `,
    defaultCode: `// MINH HỌA COMPUTATIONAL GRAPH CƠ BẢN
// =====================================================

// Mỗi Operation (Node) thực hiện hai nhiệm vụ: FORWARD và BACKWARD
struct MultiplyNode {
    cache_x: f64, // Lưu giá trị input khi Forward
    cache_w: f64,
}

impl MultiplyNode {
    fn forward(&mut self, x: f64, w: f64) -> f64 {
        self.cache_x = x; // Lưu lại để sử dụng trong Backward
        self.cache_w = w;
        x * w
    }
    
    // Khi nhận tín hiệu gradient từ phía sau,
    // Nhân với đạo hàm cục bộ (Local Gradients) rồi truyền ngược về X và W
    fn backward(&self, din: f64) -> (f64, f64) {
        let dx = din * self.cache_w; // đạo hàm theo x: d(x*w)/dx = w
        let dw = din * self.cache_x; // đạo hàm theo w: d(x*w)/dw = x
        (dx, dw)
    }
}

// Node Cộng (Bias)
struct AddNode;
impl AddNode {
    fn forward(&self, x1: f64, x2: f64) -> f64 { x1 + x2 }
    fn backward(&self, din: f64) -> (f64, f64) {
        (din * 1.0, din * 1.0) // đạo hàm bằng 1, truyền nguyên về cả hai nhánh
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
      $dW = X^T \\cdot dZ$ <br/><br/>
      $dX = dZ \\cdot W^T$
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

  <h3>3.3. Công thức Ma Trận Tổng Quát</h3>
  <div class="formula-block mb-4">
    <p>Cho một lớp Dense (Fully Connected) với:</p>
    <ul>
      <li>Input: $A^{[l-1]}$ có kích thước $(batch\\_size, n_{in})$</li>
      <li>Weight: $W^{[l]}$ có kích thước $(n_{in}, n_{out})$</li>
      <li>Bias: $b^{[l]}$ có kích thước $(1, n_{out})$</li>
      <li>Output: $Z^{[l]} = A^{[l-1]} \\cdot W^{[l]} + b^{[l]}$</li>
    </ul>

    <p><strong>Quá trình Backward Pass tính gradient như sau:</strong></p>

    <div class="font-mono text-center p-4 bg-blue-50 text-blue-900 border border-blue-300 font-bold mb-4 font-lg">
      <!-- Bước 1: Đạo hàm theo Weight -->
      $dW^{[l]} = \\frac{\\partial L}{\\partial W^{[l]}} = (A^{[l-1]})^T \\cdot dZ^{[l]}$<br/>
      <span class="text-sm">Kích thước: $(n_{in}, n_{out}) = (n_{in}, batch) \\times (batch, n_{out})$</span><br/><br/>

      <!-- Bước 2: Đạo hàm theo Bias -->
      $db^{[l]} = \\frac{\\partial L}{\\partial b^{[l]}} = \\sum_{i=1}^{batch} dZ^{[l][i]}$<br/>
      <span class="text-sm">Tổng theo chiều batch, giữ nguyên shape của bias</span><br/><br/>

      <!-- Bước 3: Đạo hàm theo Input của lớp trước -->
      $dA^{[l-1]} = \\frac{\\partial L}{\\partial A^{[l-1]}} = dZ^{[l]} \\cdot (W^{[l]})^T$<br/>
      <span class="text-sm">Lan truyền ngược về lớp trước</span>
    </div>
  </div>

  <div class="example-block mb-4">
    <h4>Ví dụ cụ thể với Batch Size = 2, Input Features = 3, Output Neurons = 4</h4>

    <p>Giả sử ta có:</p>
    <ul>
      <li>Ma trận Input $X$ (batch=2, features=3):</li>
    </ul>

    <div class="font-mono text-center p-3 bg-gray-50 border mb-3">
      X = [[1, 2, 3],<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;[4, 5, 6]]  // 2 samples, 3 features
    </div>

    <ul>
      <li>Ma trận Weight $W$ (3×4):</li>
    </ul>

    <div class="font-mono text-center p-3 bg-gray-50 border mb-3">
      W = [[0.1, 0.2, 0.3, 0.4],<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;[0.5, 0.6, 0.7, 0.8],<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;[0.9, 1.0, 1.1, 1.2]]
    </div>

    <ul>
      <li>Gradient từ lớp sau $dZ$ (2×4):</li>
    </ul>

    <div class="font-mono text-center p-3 bg-gray-50 border mb-3">
      dZ = [[0.1, 0.2, 0.3, 0.4],<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;[0.5, 0.6, 0.7, 0.8]]
    </div>

    <p><strong>Tính dW = X^T × dZ:</strong></p>
    <ul>
      <li>X^T có kích thước (3×2): [[1,4], [2,5], [3,6]]</li>
      <li>dW = X^T × dZ = (3×2) × (2×4) = (3×4)</li>
    </ul>

    <div class="font-mono text-center p-3 bg-purple-50 border border-purple-300 mb-3">
      dW = [[1×0.1+4×0.5, 1×0.2+4×0.6, 1×0.3+4×0.7, 1×0.4+4×0.8],<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;[2×0.1+5×0.5, 2×0.2+5×0.6, 2×0.3+5×0.7, 2×0.4+5×0.8],<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;[3×0.1+6×0.5, 3×0.2+6×0.6, 3×0.3+6×0.7, 3×0.4+6×0.8]]<br/>
      = [[2.1, 2.6, 3.1, 3.6],<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;[2.7, 3.4, 4.1, 4.8],<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;[3.3, 4.2, 5.1, 6.0]]
    </div>

    <p><strong>Tính dX = dZ × W^T:</strong></p>
    <ul>
      <li>W^T có kích thước (4×3)</li>
      <li>dX = dZ × W^T = (2×4) × (4×3) = (2×3)</li>
    </ul>

    <p><strong>Tính db = sum(dZ, axis=0):</strong></p>
    <div class="font-mono text-center p-3 bg-green-50 border border-green-300 mb-3">
      db = [0.1+0.5, 0.2+0.6, 0.3+0.7, 0.4+0.8] = [0.6, 0.8, 1.0, 1.2]
    </div>
  </div>

  <h3>3.4. Tại Sao Phải Transpose?</h3>
  <div class="intuition-block mb-4">
    <p><strong>Giải thích trực quan:</strong></p>
    <ul>
      <li><strong>Forward Pass:</strong> $Z = X \\cdot W$ - Input nhân với Weight để tạo Output</li>
      <li><strong>Backward Pass:</strong> Cần "đảo ngược" phép nhân để tính gradient</li>
    </ul>

    <p>Trong phép nhân ma trận $Z = X \\cdot W$:</p>
    <ul>
      <li>X (batch × n_in) "đóng góp" vào mỗi hàng của Z</li>
      <li>W (n_in × n_out) "đóng góp" vào mỗi cột của Z</li>
    </ul>

    <p>Để gradient theo X phải "đi ngược" qua W, ta cần nhân với $W^T$. Tương tự, để gradient theo W phải "đi ngược" qua X, ta cần nhân với $X^T$.</p>

    <div class="warning-box p-4 bg-yellow-50 border-l-4 border-yellow-500">
      <p><strong>Lưu ý quan trọng:</strong> Thứ tự nhân ma trận rất quan trọng! $A \\cdot B \\neq B \\cdot A$ trong ma trận. Sai thứ tự sẽ cho kết quả sai hoàn toàn.</p>
    </div>
  </div>

  <h3>3.5. Kết nối với Activation Function</h3>
  <div class="mb-4">
    <p>Sau khi tính $dZ^{[l]}$ từ $dA^{[l]}$ (qua activation derivative), ta tiếp tục quá trình lan truyền ngược:</p>

    <div class="font-mono text-center p-4 bg-indigo-50 text-indigo-900 border border-indigo-300 font-bold">
      $dA^{[l-1]} = dZ^{[l]} \\cdot (W^{[l]})^T$<br/>
      ↓<br/>
      $dZ^{[l-1]} = dA^{[l-1]} \\odot \\sigma' (Z^{[l-1]})$ (nếu dùng Sigmoid)<br/>
      ↓<br/>
      Tiếp tục với lớp $l-1$
    </div>

    <p>Quá trình này lặp lại từ lớp cuối cùng (output layer) đến lớp đầu tiên (input layer), tuân theo chain rule của đạo hàm hợp.</p>
  </div>
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
