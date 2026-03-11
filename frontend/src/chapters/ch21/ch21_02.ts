import { Chapter } from '../../courses';

export const ch21_02: Chapter = {
    id: 'ch21_02',
    title: '21.2. Kiến Trúc Mạng Nơ-ron Nhân Tạo Chi Tiết Từ Số 0',
    introduction: 'Trong chương này, chúng ta sẽ khám phá toàn bộ nền tảng toán học, kiến trúc, và quy trình huấn luyện mạng nơ-ron nhân tạo một cách chi tiết.',
    lessons: [
{
    id: 'ch21_02_01',
    title: '1. Nền Tảng Của Kỷ Nguyên Trí Tuệ: Perceptron & The Artificial Neuron',
    duration: '24 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <!--================================================-->
  <!-- LỊCH SỬ PERCEPTRON                              -->
  <!--================================================-->
  <h2>1. Các Cột Mốc Quá Khứ Của Perceptron</h2>
  <div class="callout callout-info">
    <div class="callout-content">
      <span class="callout-title">KHỞI NGUYÊN TỪ PHÒNG THÍ NGHIỆM CORNELL (1943 - 1957)</span>
      <p>Lịch sử của Mạng Nơ-ron Nhân tạo (Artificial Neural Networks - ANN) bắt đầu từ rất lâu trước khi khái niệm "Trí tuệ Nhân tạo" trở nên phổ biến.</p>
      <p><strong>Cột mốc 1943:</strong> Nhà thần kinh học Warren McCulloch và nhà toán học Walter Pitts đã viết bài báo khoa học: "A Logical Calculus of the Ideas Immanent in Nervous Activity". Trong đó, họ chứng minh rằng tập hợp các tế bào thần kinh kết nối với nhau có khả năng thực hiện bất kỳ phép tính logic nào. Mô hình "McCulloch-Pitts Neuron" ra đời, chỉ nhận đầu vào 0 và 1. Tuy là một bước tiến, mô hình này thiếu khả năng <strong>Học Hỏi (Learning)</strong> — trọng số phải được thiết lập thủ công.</p>
      <p><strong>Cột mốc 1957: Sự ra đời của Perceptron:</strong><br/>
      Năm 1957, tại Phòng Không gian Vật lý Hàng không Cornell, nhà tâm lý học <strong>Frank Rosenblatt</strong> đã tạo ra bước nhảy vọt. Được tài trợ bởi Hải quân Hoa Kỳ, ông chế tạo cỗ máy <strong>Mark I Perceptron</strong>.</p>
      <p>Đây là một thiết bị cơ khí nặng 5 tấn, với ma trận các điện trở chiết áp (potentiometers) được điều khiển bằng motor. Đầu vào là 400 tế bào quang điện cadmium sulfide, đóng vai trò như võng mạc. Điều quan trọng nhất: nó có thể <strong>tự động điều chỉnh</strong> các điện trở (tức Trọng số — Weights) để "học" cách phân biệt hình vuông và hình tam giác.<br/>
      Khái niệm <strong>Machine Learning</strong> chính thức ra đời. Tờ New York Times đã đăng trang bìa: <em>"Hải quân vinh danh cỗ máy có thể nhìn và tự nhận thức!"</em></p>
    </div>
  </div>

  <!--================================================-->
  <!-- SO SÁNH SINH HỌC VÀ TOÁN HỌC                   -->
  <!--================================================-->
  <h3>1.1. Giải phẫu Tế bào Thần kinh — Từ Sinh học đến Toán học</h3>
  
  <p>Để hiểu cốt lõi của Trí tuệ Nhân tạo, ta bắt đầu từ cấu trúc bộ não con người (chứa ~86 tỷ neuron). Rosenblatt đã mô phỏng cấu trúc này để tạo ra Perceptron.</p>

  <div class="image-showcase">
    <img src="/images/ch21/perceptron_model_1773152558045.png" alt="Sơ đồ Mô hình Toán học Perceptron" />
    <div class="image-caption">Sơ đồ Mô hình Toán học của Perceptron với Weights, Bias và Activation Function</div>
  </div>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">Sinh Học</div>
      <div class="step-content">
        <h4>Neuron Sinh Học</h4>
        <p>Một tế bào thần kinh gồm 4 thành phần chính:</p>
        <ol>
          <li><strong>Dendrites (Sợi nhánh):</strong> Các nhánh nhận tín hiệu hóa học (neurotransmitters) và xung điện từ các neuron lân cận. Tương ứng với các đầu vào $X_1, X_2, \dots$</li>
          <li><strong>Synapses (Khớp thần kinh):</strong> Mỗi khớp nối có độ dẫn điện khác nhau. Độ dẫn này tương ứng với <strong>Weight (W)</strong> trong toán học.</li>
          <li><strong>Soma (Thân tế bào):</strong> Nơi tổng hợp tất cả tín hiệu từ các nhánh. Đóng vai trò Hàm Tổng (Summing Junction) trong toán.</li>
          <li><strong>Axon (Sợi trục):</strong> Khi điện tích trong Soma vượt ngưỡng (threshold), neuron "phóng điện" (fire action potential) truyền tín hiệu tới neuron tiếp theo. Đây là bước ra quyết định.</li>
        </ol>
      </div>
    </div>
    
    <div class="step-card">
      <div class="step-number">Toán Học</div>
      <div class="step-content">
        <h4>Neuron Nhân Tạo (Perceptron)</h4>
        <p>Rosenblatt đã chuyển đổi mô hình sinh học thành đại số tuyến tính:</p>
        <ol>
          <li><strong>Inputs $[X_1, X_2, \dots X_n]$:</strong> Các đặc trưng (features) của dữ liệu. Ví dụ: diện tích, giá tiền, độ cao.</li>
          <li><strong>Weights $[W_1, W_2, \dots W_n]$:</strong> Mức độ quan trọng của từng đặc trưng. Weight lớn = ảnh hưởng lớn. Weight âm = ảnh hưởng ngược chiều.</li>
          <li><strong>Summing Function (Σ):</strong> Tổng tuyến tính $Z = \sum_{i=1}^{n} W_i X_i$.</li>
          <li><strong>Activation Function $f(Z)$:</strong> Hàm kích hoạt bước nhảy (Step Function). Trong Perceptron gốc: nếu tổng $Z$ vượt ngưỡng $\to$ output = 1, ngược lại $\to$ output = 0.</li>
        </ol>
      </div>
    </div>
  </div>

  <!-- Chứng minh Threshold → Bias -->
  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Tại sao dùng Bias thay vì Threshold?</h4>
    <p>Phương trình gốc của Rosenblatt:</p>
    <p class="font-mono text-lg">$\text{Output} = 1 \text{ NẾU } (W_1 X_1 + W_2 X_2) \geq T$</p>
    <p class="font-mono text-lg">$\text{Output} = 0 \text{ NẾU } (W_1 X_1 + W_2 X_2) < T$</p>
    <br/>
    <p>Các nhà toán học chuyển T sang vế trái bằng phép trừ:</p>
    <p class="font-mono text-lg">$(W_1 X_1 + W_2 X_2) - T \geq 0$</p>
    <p>Đặt $B = -T$, gọi là <strong>Bias (Độ lệch)</strong>. Phương trình trở thành dạng quen thuộc:</p>
    <p class="font-mono text-lg text-indigo-700 font-bold">$Z = W_1 X_1 + W_2 X_2 + B \geq 0$</p>
    <p>Đây chính là phương trình siêu phẳng (Hyperplane) phân tách không gian tuyến tính: điểm nằm phía dương $\to$ Class 1, phía âm $\to$ Class 0.</p>
  </div>


  <!--================================================-->
  <!-- THUẬT TOÁN PERCEPTRON LEARNING RULE             -->
  <!--================================================-->
  <h3>1.2. Thuật toán học của Perceptron (Perceptron Learning Algorithm)</h3>
  
  <p>Làm cách nào máy tự tìm được bộ tham số <strong>$[W, B]$</strong> phù hợp? Perceptron sử dụng quy tắc học (Learning Rule) gồm các bước sau:</p>
  
  <div class="concept-grid">
    <div class="concept-card">
      <h4>Bước 1: Khởi Tạo Ngẫu Nhiên</h4>
      <p>Ban đầu chưa biết W và B là bao nhiêu, nên khởi tạo ngẫu nhiên: $[0.1, -0.4, 0.2, \dots]$. Mục đích là cho mô hình một điểm xuất phát bất kỳ để bắt đầu học.</p>
    </div>
    <div class="concept-card">
      <h4>Bước 2: Dự Đoán (Forward Pass)</h4>
      <p>Đưa vào 1 mẫu dữ liệu đã có sẵn đáp án. Mô hình dựa vào W hiện tại để đưa ra dự đoán $(\hat{Y})$. Sau đó so sánh với đáp án thật $(Y)$.</p>
    </div>
    <div class="concept-card">
      <h4>Bước 3: Tính Sai Số (Error)</h4>
      <p>$\text{Error} = Y_{true} - \hat{Y}_{pred}$<br/>
      Nếu đúng: $\to \text{Error} = 0$, không cần cập nhật.<br/>
      Nếu sai: $Y=1, \hat{Y}=0 \to \text{Error} = 1$. $Y=0, \hat{Y}=1 \to \text{Error} = -1$.</p>
    </div>
    <div class="concept-card">
      <h4>Bước 4: Cập Nhật Trọng Số</h4>
      <p>Công thức cập nhật:<br/>
      <span class="font-mono text-lg">$W_{new} = W_{old} + \alpha \times \text{Error} \times X_i$</span><br/>
      (Với $\alpha$ là Learning Rate rất nhỏ để tránh dao động mạnh).</p>
    </div>
  </div>


  <!--================================================-->
  <!-- ĐỊNH LÝ HỘI TỤ NOVIKOFF                        -->
  <!--================================================-->
  <h3>1.3. Định Lý Hội Tụ Novikoff (1962)</h3>
  <p>Câu hỏi quan trọng: <em>"Làm sao biết thuật toán sẽ dừng lại và cho kết quả đúng, hay sẽ chạy mãi?"</em></p>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">ĐỊNH LÝ HỘI TỤ NOVIKOFF (PERCEPTRON CONVERGENCE THEOREM)</span>
      <p>Năm 1962, Albert Novikoff đã chứng minh:</p>
      <ul>
        <li><strong>Điều kiện:</strong> Cho một tập dữ liệu phân tách tuyến tính được (linearly separable).</li>
        <li><strong>Kết luận:</strong> Thuật toán Perceptron <strong>chắc chắn sẽ tìm ra</strong> một siêu phẳng phân tách hoàn hảo, trong một số bước hữu hạn $M$.</li>
      </ul>
      <p>Giới hạn số lần cập nhật ($M$):</p>
      <p class="font-mono text-lg">$M \leq \frac{R^2 \times \|W_{opt}\|^2}{\gamma^2}$</p>
      <p>Trong đó: $R$ là bán kính chứa toàn bộ dữ liệu, $\gamma$ là khoảng cách biên (margin) giữa hai lớp. Margin lớn $\to$ ít vòng lặp. Nhưng nếu dữ liệu <strong>không phân tách tuyến tính được</strong>, thuật toán sẽ lặp vô hạn và không bao giờ hội tụ.</p>
    </div>
  </div>


</div>
`,
    defaultCode: `// =================================================================
// PERCEPTRON: MÔ PHỎNG TẾ BÀO THẦN KINH NHÂN TẠO (1957)
// =================================================================

// -----------------------------------------------------------------
// PHẦN 1: Bộ tạo số ngẫu nhiên (Linear Congruential Generator)
// Không sử dụng crate rand, tự implement LCG.
// -----------------------------------------------------------------

pub struct SimpleRng {
    seed: u64,
}

impl SimpleRng {
    pub fn new(seed: u64) -> Self {
        Self { seed }
    }

    /// Trả về số thực ngẫu nhiên trong khoảng [0.0, 1.0)
    pub fn next_f64(&mut self) -> f64 {
        let multiplier: u64 = 1103515245;
        let increment: u64 = 12345;
        let modulus = 1_u64 << 31;
        self.seed = (multiplier.wrapping_mul(self.seed).wrapping_add(increment)) % modulus;
        (self.seed as f64) / (modulus as f64)
    }

    /// Trả về số thực ngẫu nhiên trong khoảng [-1.0, 1.0)
    pub fn next_weight(&mut self) -> f64 {
        (self.next_f64() * 2.0) - 1.0
    }
}


// -----------------------------------------------------------------
// PHẦN 2: Struct Perceptron (Binary Classifier)
// -----------------------------------------------------------------

pub struct Perceptron {
    weights: Vec<f64>,
    bias: f64,
    learning_rate: f64,
    update_count: usize,
}

impl Perceptron {
    /// Khởi tạo Perceptron với trọng số ngẫu nhiên
    pub fn new(num_features: usize, learning_rate: f64) -> Self {
        let mut rng = SimpleRng::new(1957); // Seed: năm sinh Perceptron
        let mut weights = Vec::with_capacity(num_features);
        
        for _ in 0..num_features {
            weights.push(rng.next_weight());
        }
        
        println!("  [+] Khởi tạo Perceptron với {} trọng số ngẫu nhiên", num_features);
        
        Self {
            weights,
            bias: 0.1,
            learning_rate,
            update_count: 0,
        }
    }
    
    /// Forward pass: tính dự đoán
    /// f(z) = Step(W·X + B) → 1.0 nếu z >= 0, ngược lại 0.0
    pub fn predict(&self, input: &Vec<f64>) -> f64 {
        if input.len() != self.weights.len() {
            panic!("Lỗi: số chiều input ({}) khác số weights ({})", 
                input.len(), self.weights.len());
        }
        
        // Tính tổng tuyến tính: z = W·X + B
        let mut z = self.bias;
        for i in 0..self.weights.len() {
            z += self.weights[i] * input[i];
        }
        
        // Hàm kích hoạt Step (Heaviside)
        if z >= 0.0 { 1.0 } else { 0.0 }
    }
    
    /// Huấn luyện theo Perceptron Learning Algorithm
    pub fn train(&mut self, data: &Vec<Vec<f64>>, labels: &Vec<f64>, epochs: usize) {
        let n = data.len();
        println!("\\n>>> Bắt đầu huấn luyện ({} epochs, {} mẫu) <<<", epochs, n);
        
        for epoch in 1..=epochs {
            let mut errors = 0;
            
            for i in 0..n {
                let prediction = self.predict(&data[i]);
                let error = labels[i] - prediction;
                
                if error != 0.0 {
                    errors += 1;
                    self.update_count += 1;
                    
                    // Cập nhật trọng số: W_new = W_old + lr * error * X
                    for j in 0..self.weights.len() {
                        self.weights[j] += self.learning_rate * error * data[i][j];
                    }
                    // Cập nhật bias: B_new = B_old + lr * error
                    self.bias += self.learning_rate * error;
                }
            }
            
            if epoch % 10 == 0 || epoch == 1 {
                println!("    Epoch {:03}: {} lỗi, W = {:?}", epoch, errors, self.weights);
            }
            
            // Định lý hội tụ: nếu không còn lỗi → dừng
            if errors == 0 {
                println!("    [HỘI TỤ] Hoàn thành sau {} epochs!", epoch);
                break;
            }
        }
    }
}


// -----------------------------------------------------------------
// PHẦN 3: Kiểm thử
// -----------------------------------------------------------------
pub fn main() {
    println!("========================================");
    println!("  PERCEPTRON - Machine Learning cơ bản  ");
    println!("========================================\\n");
    
    // Dữ liệu: Dự đoán duyệt học bổng
    // X1 = Điểm Toán, X2 = Điểm IELTS
    // Y = 1 (Đỗ), 0 (Trượt)
    let data: Vec<Vec<f64>> = vec![
        vec![ 3.5 , 4.0 ],   // Trượt
        vec![ 4.0 , 4.5 ],   // Trượt
        vec![ 5.0 , 5.0 ],   // Trượt
        vec![ 8.0 , 7.5 ],   // Đỗ
        vec![ 9.5 , 8.0 ],   // Đỗ
        vec![ 6.5 , 6.0 ],   // Trượt
        vec![ 7.5 , 7.0 ],   // Đỗ
    ];
    
    let labels: Vec<f64> = vec![0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0];
    
    println!("[*] Tạo Perceptron: 2 features, learning rate = 0.05");
    let mut model = Perceptron::new(2, 0.05);
    model.train(&data, &labels, 150);
    
    // Kiểm thử với dữ liệu mới
    println!("\\n====================================================================");
    println!("=> Kiểm thử với dữ liệu mới (unseen data):");
    
    let test1 = vec![9.0, 8.5];
    let result1 = model.predict(&test1);
    println!(" - Toán 9.0, IELTS 8.5 => Dự đoán: {:.1} (Kỳ vọng: 1.0 - Đỗ)", result1);
    
    let test2 = vec![3.0, 5.0];
    let result2 = model.predict(&test2);
    println!(" - Toán 3.0, IELTS 5.0 => Dự đoán: {:.1} (Kỳ vọng: 0.0 - Trượt)", result2);
    
    println!("\\n=> Hoàn thành kiểm thử Perceptron!");
}`
},
{
    id: 'ch21_02_02',
    title: '2. Bách Khoa Toàn Thư Về Activation Functions — Chìa Khóa Phi Tuyến Tính',
    duration: '240 phút',
    type: 'theory',
    content: `
<div class="article-content">

  <!--==========================================================-->
  <!-- VÌ SAO PHẢI CÓ HÀM KÍCH HOẠT?                           -->
  <!--==========================================================-->
  <h2>2.1. Tại Sao Mạng Nhiều Lớp Không Có Activation Lại Vô Dụng?</h2>
  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">LUẬT NHÂN MA TRẬN TUYẾN TÍNH</span>
      <p>Nếu bạn tạo một mạng nơ-ron có 1 triệu lớp ẩn nhưng <strong>không sử dụng hàm kích hoạt phi tuyến</strong> xen giữa các lớp, thì toàn bộ mạng chỉ tương đương với <strong>đúng 1 lớp duy nhất</strong>.</p>
      <p>Lý do: <strong>Tính chất nhân ma trận tuyến tính (Linear Matrix Composition)</strong>. Hãy xét một mạng 3 lớp không có activation:</p>
      <ul>
        <li><strong>Tầng 1:</strong> $H_1 = W_1 \times X + b_1$</li>
        <li><strong>Tầng 2:</strong> $H_2 = W_2 \times H_1 + b_2$</li>
        <li><strong>Tầng Output:</strong> $Y = W_3 \times H_2 + b_3$</li>
      </ul>
      <p>Thay ngược lại, ta có:</p>
      <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
        <p class="font-mono text-lg">$Y = W_3 \times [ W_2 \times (W_1 \times X + b_1) + b_2 ] + b_3$</p>
        <p class="font-mono text-lg">$Y = (W_3 \times W_2 \times W_1) \times X + (W_3 W_2 b_1 + W_3 b_2 + b_3)$</p>
        <p class="font-mono text-lg text-indigo-700 font-bold">$Y = W_{total} \times X + B_{total}$</p>
      </div>
      <p><strong>Kết luận:</strong> Dù có bao nhiêu lớp, tích các ma trận W vẫn chỉ cho ra 1 ma trận mới, và tổng các bias cho ra 1 vector bias mới. Kết quả vẫn là <strong>một phép biến đổi tuyến tính</strong> — không thể học được các mẫu hình phi tuyến (đường cong, xoắn ốc...). Vì vậy, <strong>chúng ta cần hàm phi tuyến (Activation Function) xen giữa các lớp</strong>.</p>
    </div>
  </div>

  <!--==========================================================-->
  <!-- CÁC LOẠI HÀM KÍCH HOẠT                                  -->
  <!--==========================================================-->
  <h2>2.2. Các Hàm Kích Hoạt Quan Trọng Qua Các Thời Kỳ</h2>
  
  <p>Mỗi hàm kích hoạt đánh dấu một giai đoạn phát triển của AI. Chúng ta sẽ phân tích từ góc độ Đại số Giải tích (Calculus), vì quá trình <strong>Backpropagation</strong> bắt buộc phải sử dụng đạo hàm của hàm kích hoạt.</p>

  <div class="image-showcase">
    <img src="/images/ch21/ch21_02_activation_funcs.png" alt="Đồ thị các Hàm Kích Hoạt" />
    <div class="image-caption">Hình ảnh trực quan của 6 Hàm Kích Hoạt cốt lõi trong Deep Learning</div>
  </div>

  <div class="concept-grid">
    <!-- 1. STEP FUNCTION -->
    <div class="concept-card">
      <h4>1. Step Function (Hàm Bước Nhảy)</h4>
      <p><strong>Lịch sử:</strong> Được Rosenblatt sử dụng trong Perceptron đầu tiên. Lấy cảm hứng trực tiếp từ cơ chế neuron: hoặc tắt (0) hoặc bật (1).</p>
      <div class="formula-block my-2 p-3 bg-gray-50 border-gray-300">
        <p class="font-mono">$f(x) = 1$ nếu $x \geq 0$</p>
        <p class="font-mono">$f(x) = 0$ nếu $x < 0$</p>
      </div>
      <p><strong>Vấn đề chí mạng:</strong> Đạo hàm $f'(x) = 0$ ở mọi nơi (ngoại trừ x=0 không xác định). Do gradient bằng không, quá trình Backpropagation bị chặn đứng (Vanishing Gradient tuyệt đối), mạng sâu không thể truyền gradient để học.</p>
    </div>

    <!-- 2. SIGMOID -->
    <div class="concept-card">
      <h4>2. Sigmoid</h4>
      <p><strong>Bản chất:</strong> Biến đổi hàm nhị phân gãy khúc thành đường cong chữ S, cho phép tính đạo hàm tại mọi điểm.</p>
      <div class="formula-block my-2 p-3 bg-gray-50 border-gray-300">
        <p class="font-mono">$f(x) = \frac{1}{1 + e^{-x}}$</p>
        <p class="font-mono">$f'(x) = f(x) \times (1 - f(x))$</p>
      </div>
      <p><strong>Hai nhược điểm nghiêm trọng:</strong></p>
      <ul>
        <li><strong>Vanishing Gradient:</strong> Đạo hàm cực đại chỉ đạt 0.25. Qua nhiều lớp, gradient giảm nhanh theo hàm mũ (ví dụ: $0.25^{50} \approx 10^{-30}$).</li>
        <li><strong>Không zero-centered:</strong> Output luôn dương (0 đến 1) khiến quá trình tối ưu bị zig-zag, chậm hội tụ.</li>
      </ul>
    </div>

    <!-- 3. TANH -->
    <div class="concept-card">
      <h4>3. Tanh (Hyperbolic Tangent)</h4>
      <p><strong>Bản chất:</strong> Là phiên bản co giãn và dịch chuyển của Sigmoid để đưa output về khoảng [-1, 1], giúp zero-centered.</p>
      <div class="formula-block my-2 p-3 bg-gray-50 border-gray-300">
        <p class="font-mono">$f(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$</p>
        <p class="font-mono">$f'(x) = 1 - \tanh^2(x)$</p>
      </div>
      <p><strong>Ưu điểm:</strong> Zero-centered loại bỏ zig-zag. Đạo hàm cực đại là 1.0 (gấp 4 lần Sigmoid).</p>
      <p><strong>Nhược điểm:</strong> Tại hai đầu của đồ thị (ví dụ x = ±5), gradient vẫn tiến về 0, gây ra Vanishing Gradient trong các mạng quá sâu.</p>
    </div>

    <!-- 4. RELU -->
    <div class="concept-card">
      <h4>4. ReLU (Rectified Linear Unit)</h4>
      <p><strong>Sự trỗi dậy:</strong> Năm 2012, AlexNet dùng ReLU để chiến thắng ImageNet, mở ra kỷ nguyên Deep Learning.</p>
      <div class="formula-block my-2 p-3 bg-gray-50 border-gray-300">
        <p class="font-mono">$f(x) = \max(0, x)$</p>
      </div>
      <p><strong>Tại sao ReLU thống trị:</strong></p>
      <ol>
        <li>Tốc độ tính toán siêu nhanh (chỉ cần lấy max, không dùng hàm exp tốn kém).</li>
        <li>Khi $x > 0$, đạo hàm $f'(x) = 1$, không bao giờ suy giảm $\to$ giải quyết triệt để Vanishing Gradient cho miền dương.</li>
      </ol>
      <p class="mt-2 text-red-600 font-semibold">Nhược điểm: Dying ReLU</p>
      <p>Nếu $x < 0$, đạo hàm bằng 0 triệt để. Neuron bị đẩy vào vùng âm có thể "chết" vĩnh viễn không bao giờ cập nhật lại trọng số.</p>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-content">
      <span class="callout-title">GELU VÀ LEAKY RELU - BẢN NÂNG CẤP TỪ RELU</span>
      <p><strong>Leaky ReLU:</strong> Khắc phục Dying ReLU bằng cách cho phép một độ dốc vô cùng nhỏ (vd: $\alpha = 0.01$) khi $x < 0$. Công thức: $f(x) = \max(0.01x, x)$. Có giá trị gradient bằng 0.01 ở miền âm, cứu sống neuron.</p>
      <p><strong>GELU (Gaussian Error Linear Unit):</strong> Là bản làm trơn (smooth) của ReLU. Nó nhân $x$ với hàm phân bố chuẩn tích lũy. Thường được sử dụng trong các hệ thống xử lý ngôn ngữ NLP lớn như GPT, BERT. Đạo hàm trơn hơn và ít gây sốc cho mạng.</p>
    </div>
  </div>

</div>
`,
    defaultCode: `// =================================================================
// CÁC HÀM KÍCH HOẠT VÀ ĐẠO HÀM (ACTIVATION FUNCTIONS)
// Forward (tính giá trị) + Backward (tính đạo hàm cho Backprop)
// =================================================================

#[allow(dead_code)]
pub mod ActivationFunctions {

    use std::f64;

    // ---------------------------------------------------------
    // 1. Step Function (Heaviside) — Perceptron 1957
    // ---------------------------------------------------------
    pub fn step_forward(z: f64) -> f64 {
        if z >= 0.0 { 1.0 } else { 0.0 }
    }

    /// Đạo hàm = 0 ở mọi nơi → không dùng được cho Backprop
    pub fn step_backward(_z: f64) -> f64 {
        0.0
    }


    // ---------------------------------------------------------
    // 2. Sigmoid — Đường cong S, output trong (0, 1)
    // Nhược điểm: đạo hàm max = 0.25 → Vanishing Gradient
    // ---------------------------------------------------------
    pub fn sigmoid_forward(z: f64) -> f64 {
        1.0 / (1.0 + (-z).exp())
    }

    /// f'(z) = sigmoid(z) × (1 - sigmoid(z)), max = 0.25
    pub fn sigmoid_backward(z: f64) -> f64 {
        let s = sigmoid_forward(z);
        s * (1.0 - s)
    }


    // ---------------------------------------------------------
    // 3. Tanh — Zero-centered, output trong (-1, 1)
    // Đạo hàm max = 1.0 (tại x = 0)
    // ---------------------------------------------------------
    pub fn tanh_forward(z: f64) -> f64 {
        z.tanh()
    }

    /// f'(z) = 1 - tanh²(z)
    pub fn tanh_backward(z: f64) -> f64 {
        let t = z.tanh();
        1.0 - (t * t)
    }


    // ---------------------------------------------------------
    // 4. ReLU — max(0, x), hàm kích hoạt phổ biến nhất
    // Đạo hàm = 1 khi x > 0, = 0 khi x ≤ 0
    // ---------------------------------------------------------
    pub fn relu_forward(z: f64) -> f64 {
        if z > 0.0 { z } else { 0.0 }
    }

    pub fn relu_backward(z: f64) -> f64 {
        if z > 0.0 { 1.0 } else { 0.0 }
    }


    // ---------------------------------------------------------
    // 5. Leaky ReLU — Khắc phục Dying ReLU
    // Cho phép gradient nhỏ (α = 0.01) khi x < 0
    // ---------------------------------------------------------
    pub const LEAKY_ALPHA: f64 = 0.01;

    pub fn leaky_relu_forward(z: f64) -> f64 {
        if z > 0.0 { z } else { LEAKY_ALPHA * z }
    }

    pub fn leaky_relu_backward(z: f64) -> f64 {
        if z > 0.0 { 1.0 } else { LEAKY_ALPHA }
    }


    // ---------------------------------------------------------
    // 6. GELU (Gaussian Error Linear Unit)
    // Sử dụng trong GPT, BERT. Xấp xỉ bằng Tanh.
    // ---------------------------------------------------------
    pub fn gelu_forward(x: f64) -> f64 {
        let sqrt_2_over_pi = (2.0 / std::f64::consts::PI).sqrt();
        let inner = sqrt_2_over_pi * (x + 0.044715 * x.powi(3));
        0.5 * x * (1.0 + inner.tanh())
    }

}


// =================================================================
// KIỂM THỬ: So sánh các hàm kích hoạt
// =================================================================
pub fn main() {
    println!("============================================================");
    println!("  SO SÁNH CÁC HÀM KÍCH HOẠT (ACTIVATION FUNCTIONS)");
    println!("============================================================\\n");

    use ActivationFunctions::*;

    let test_values = vec![-5.0, -2.5, -0.1, 0.0, 0.1, 1.25, 5.0];
    
    // Bảng Forward
    println!(">> PHẦN 1: GIÁ TRỊ FORWARD");
    println!("{:-<110}", "");
    println!("{:<8} | {:<15} | {:<15} | {:<15} | {:<15} | {:<15}", 
        "X", "SIGMOID", "TANH", "RELU", "LEAKY RELU", "GELU");
    println!("{:-<110}", "");
    
    for &x in &test_values {
        println!("{:<8.2} | {:<15.5} | {:<15.5} | {:<15.5} | {:<15.5} | {:<15.5}", 
            x, 
            sigmoid_forward(x), 
            tanh_forward(x), 
            relu_forward(x), 
            leaky_relu_forward(x), 
            gelu_forward(x));
    }
    
    // Bảng Backward (đạo hàm)
    println!("\\n\\n>> PHẦN 2: GIÁ TRỊ ĐẠO HÀM (BACKWARD)");
    println!("{:-<110}", "");
    println!("{:<8} | {:<18} | {:<18} | {:<15} | {:<15}", 
        "X", "SIGMOID' (max 0.25)", "TANH' (max 1.0)", "RELU' (0/1)", "LEAKY' (α/1)");
    println!("{:-<110}", "");
    
    for &x in &test_values {
        println!("{:<8.2} | {:<18.5} | {:<18.5} | {:<15.5} | {:<15.5}", 
            x, 
            sigmoid_backward(x), 
            tanh_backward(x), 
            relu_backward(x), 
            leaky_relu_backward(x));
    }
    
    println!("\\n[Nhận xét]");
    println!("  - x = 5.0: Sigmoid' = 0.00669 (gần 0) → Vanishing Gradient");
    println!("  - x = 0.0: Tanh' = 1.0 (cực đại) → dùng tốt cho RNN/LSTM");
    println!("  - x = -2.5: ReLU' = 0 (neuron chết), Leaky ReLU' = 0.01 (vẫn cập nhật)");
}`
},
{
    id: 'ch21_02_03',
    title: '3. Nút Thắt Sinh Tử: XOR Problem, AI Winter và Backpropagation',
    duration: '280 phút',
    type: 'theory',
    content: `
<div class="article-content">

  <!--==========================================================-->
  <!-- AI WINTER                                                -->
  <!--==========================================================-->
  <h2>3.1. Sự Sụp Đổ Được Chứng Minh Bằng Toán Học (The AI Winter)</h2>
  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">AI WINTER (MÙA ĐÔNG AI)</span>
      <p>Cuối thập niên 1950 và đầu 1960, Perceptron của Rosenblatt tạo ra làn sóng lạc quan. Các viện nghiên cứu, quân đội Mỹ đổ hàng triệu đô-la vì tin rằng máy móc sẽ sớm có trí tuệ như con người.</p>
      <p>Năm 1969, hai nhà khoa học từ MIT — <strong>Marvin Minsky và Seymour Papert</strong> — xuất bản cuốn sách <strong>"Perceptrons: An Introduction to Computational Geometry"</strong>.</p>
      <p>Thay vì tranh luận triết lý, họ chứng minh bằng hình học tọa độ rằng: Perceptron chỉ là một bộ phân tách tuyến tính (single linear separator). Nó có thể giải cổng AND, OR, <strong>nhưng vĩnh viễn không thể giải bài toán XOR</strong>.</p>
      <p>Hậu quả: DARPA cắt toàn bộ ngân sách cho Neural Networks. Các phòng thí nghiệm đóng cửa, giảng viên né tránh môn Machine Learning. <strong>AI Winter (Mùa Đông AI)</strong> kéo dài 15 năm (1969 – 1986).</p>
    </div>
  </div>

  <!--==========================================================-->
  <!-- PHÂN TÍCH BÀI TOÁN XOR                                  -->
  <!--==========================================================-->
  <h3>3.2. Tại Sao Bài Toán XOR LÀ Bất Khả Thi Với Perceptron?</h3>
  
  <p>XOR (Exclusive OR) trả về 1 <strong>chỉ khi hai đầu vào khác nhau</strong>. Giống nhau thì trả về 0.</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>$X_1$</th>
        <th>$X_2$</th>
        <th>XOR Output</th>
        <th>Vị trí trên mặt phẳng 2D</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>Gốc tọa độ (0,0) — Đỏ</td>
      </tr>
      <tr>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>Trục tung (0,1) — Xanh</td>
      </tr>
      <tr>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>Trục hoành (1,0) — Xanh</td>
      </tr>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>Góc đối diện (1,1) — Đỏ</td>
      </tr>
    </tbody>
  </table>

  <div class="image-showcase">
    <img src="/images/ch21/mlp_xor_correct.png" alt="XOR Problem Không Gian 2D" />
    <div class="image-caption">Bài toán XOR: Không thể vẽ một đường thẳng chia tách chấm Xanh khỏi chấm Đỏ</div>
  </div>

  <p><strong>Vấn đề hình học:</strong> Perceptron sử dụng phương trình <strong>$W_1 X_1 + W_2 X_2 + B = 0$</strong> (một đường thẳng) để phân tách. Hai điểm Xanh (0,1) và (1,0) nằm đan chéo với hai điểm Đỏ (0,0) và (1,1). Không thể vẽ được <strong>một đường thẳng</strong> nào tách hoàn toàn Xanh khỏi Đỏ. Cần đường cong (phi tuyến) $\to$ mạng 1 lớp bất lực.</p>

  <!--==========================================================-->
  <!-- BACKPROPAGATION VÀ MLP                                   -->
  <!--==========================================================-->
  <h3>3.3. Sự Phục Sinh Năm 1986: MLP và Backpropagation</h3>
  
  <div class="callout callout-info">
    <div class="callout-content">
      <span class="callout-title">CHAIN RULE (QUY TẮC ĐẠO HÀM CHUỖI) VÀ BACKPROPAGATION</span>
      <p>Trong 15 năm AI Winter, các nhà nghiên cứu đã biết rằng nếu thêm một lớp ẩn (Hidden Layer), mạng có thể bẻ cong không gian 2D thành 3D, giải được XOR. <strong>Nhưng không ai biết cách cập nhật trọng số cho lớp ẩn</strong> — khi tính error ở output và truyền ngược, gradient bị "mất dấu" giữa các biến ẩn.</p>
      <p>Năm 1986, <strong>David Rumelhart, Geoffrey Hinton và Ronald Williams</strong> công bố bài báo: <em>"Learning representations by back-propagating errors"</em>. Họ sử dụng <strong>Chain Rule (Quy tắc đạo hàm chuỗi)</strong> từ toán giải tích.</p>
      <p>Ý tưởng cốt lõi: Sai số (Error) được tính ở output, sau đó nhân với gradient của hàm kích hoạt, và truyền <strong>ngược về từng lớp</strong> bằng Chain Rule. Mỗi lớp nhận được "phần lỗi" của mình và cập nhật trọng số tương ứng.</p>
      <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
        <h4>Chain Rule — Công thức truyền ngược gradient</h4>
        <p>Cho hàm hợp $L = L(\hat{y})$ với $\hat{y} = f(z)$ và $z = W \cdot x + b$:</p>
        <p class="font-mono text-lg">$\frac{\partial L}{\partial W} = \frac{\partial L}{\partial \hat{y}} \times \frac{\partial \hat{y}}{\partial z} \times \frac{\partial z}{\partial W}$</p>
        <p>Tổng quát cho mạng $n$ lớp:</p>
        <p class="font-mono text-lg text-indigo-700 font-bold">$\frac{\partial L}{\partial W_k} = \frac{\partial L}{\partial a_n} \prod_{i=k}^{n} \frac{\partial a_i}{\partial z_i} \cdot \frac{\partial z_i}{\partial a_{i-1}} \cdot \frac{\partial z_k}{\partial W_k}$</p>
        <p>Trong đó $a_i = f_i(z_i)$ là output sau activation tại lớp $i$.</p>
      </div>
      <p>Phát minh này chấm dứt AI Winter. Hệ đa lớp nhiều tầng (MLP) với hàm phi tuyến kích hoạt thực sự đã chứng minh sức mạnh giải quyết XOR trong chớp nhoáng.</p>
    </div>
  </div>

</div>
`,
    defaultCode: `// =================================================================
// MLP VỚI BACKPROPAGATION — GIẢI BÀI TOÁN XOR
// Kiến trúc: Input(2) -> Hidden(2, Sigmoid) -> Output(1, Sigmoid)
// =================================================================
use std::f64;

// Bộ tạo số ngẫu nhiên LCG
pub struct Rng { seed: u64 }
impl Rng {
    pub fn new(seed: u64) -> Self { Self { seed } }
    pub fn next_f64(&mut self) -> f64 {
        let m: u64 = 1664525;
        let c: u64 = 1013904223;
        let modulus = 1_u64 << 31;
        self.seed = (m.wrapping_mul(self.seed).wrapping_add(c)) % modulus;
        (self.seed as f64) / (modulus as f64)
    }
    pub fn next_weight(&mut self) -> f64 {
        (self.next_f64() * 2.0) - 1.0
    }
}

// -----------------------------------------------------------------
// MLP cho bài toán XOR
// -----------------------------------------------------------------
pub struct MlpXor {
    // Lớp Hidden: 2 neuron, mỗi neuron nhận 2 input → W1[2][2]
    w_hidden: Vec<Vec<f64>>,
    b_hidden: Vec<f64>,
    // Lớp Output: 1 neuron nhận 2 input từ hidden → W2[2]
    w_output: Vec<f64>,
    b_output: f64,
    learning_rate: f64,
    // Cache: lưu output hidden layer cho Backward
    cache_hidden_out: Vec<f64>,
}

impl MlpXor {
    pub fn new(lr: f64) -> Self {
        let mut rng = Rng::new(1986); // Năm ra đời Backprop
        Self {
            w_hidden: vec![
                vec![rng.next_weight(), rng.next_weight()], // H1 ← X1, X2
                vec![rng.next_weight(), rng.next_weight()], // H2 ← X1, X2
            ],
            b_hidden: vec![rng.next_weight(), rng.next_weight()],
            w_output: vec![rng.next_weight(), rng.next_weight()], // O ← H1, H2
            b_output: rng.next_weight(),
            learning_rate: lr,
            cache_hidden_out: vec![0.0, 0.0],
        }
    }

    fn sigmoid(z: f64) -> f64 { 1.0 / (1.0 + (-z).exp()) }

    /// Đạo hàm Sigmoid từ giá trị đã activated: a × (1 - a)
    fn sigmoid_derivative(a: f64) -> f64 { a * (1.0 - a) }

    /// Forward pass: Input → Hidden (Sigmoid) → Output (Sigmoid)
    pub fn forward(&mut self, x: &Vec<f64>) -> f64 {
        // Hidden layer
        let mut h_out = vec![0.0, 0.0];
        for i in 0..2 {
            let z = self.b_hidden[i]
                + self.w_hidden[i][0] * x[0]
                + self.w_hidden[i][1] * x[1];
            h_out[i] = Self::sigmoid(z);
        }
        self.cache_hidden_out = h_out.clone();

        // Output layer
        let z_out = self.b_output
            + self.w_output[0] * h_out[0]
            + self.w_output[1] * h_out[1];
        Self::sigmoid(z_out)
    }

    /// Backpropagation: tính gradient và cập nhật trọng số
    pub fn backward(&mut self, x: &Vec<f64>, prediction: f64, target: f64) {
        // [A] Gradient tại Output
        let loss_grad = prediction - target;
        let delta_output = loss_grad * Self::sigmoid_derivative(prediction);

        // Lưu W2 cũ trước khi cập nhật (Chain Rule cần W2 gốc)
        let w2_old = self.w_output.clone();

        // Cập nhật W2 và B2
        for k in 0..2 {
            self.w_output[k] -= self.learning_rate * delta_output * self.cache_hidden_out[k];
        }
        self.b_output -= self.learning_rate * delta_output;

        // [B] Gradient tại Hidden (Chain Rule)
        // delta_hidden[i] = (delta_output × W2_old[i]) × sigmoid'(h_out[i])
        let mut delta_hidden = vec![0.0, 0.0];
        for i in 0..2 {
            let grad_from_output = delta_output * w2_old[i];
            delta_hidden[i] = grad_from_output * Self::sigmoid_derivative(self.cache_hidden_out[i]);
        }

        // Cập nhật W1 và B1
        for i in 0..2 {
            for j in 0..2 {
                self.w_hidden[i][j] -= self.learning_rate * delta_hidden[i] * x[j];
            }
            self.b_hidden[i] -= self.learning_rate * delta_hidden[i];
        }
    }

    /// Vòng lặp huấn luyện
    pub fn train(&mut self, data: &Vec<Vec<f64>>, labels: &Vec<f64>, epochs: usize) {
        let n = data.len();
        for epoch in 1..=epochs {
            let mut total_loss = 0.0;
            for i in 0..n {
                let pred = self.forward(&data[i]);
                total_loss += (labels[i] - pred).powi(2);
                self.backward(&data[i], pred, labels[i]);
            }
            let mse = total_loss / (n as f64);
            if epoch <= 5 || epoch % 2000 == 0 || epoch == epochs {
                println!("  Epoch {:05} | MSE Loss: {:.7}", epoch, mse);
            }
        }
    }
}


pub fn main() {
    println!("============================================================");
    println!("  XOR PROBLEM — MLP + BACKPROPAGATION");
    println!("============================================================\\n");

    // Dữ liệu XOR
    let data = vec![
        vec![0.0, 0.0],  // → 0
        vec![0.0, 1.0],  // → 1
        vec![1.0, 0.0],  // → 1
        vec![1.0, 1.0],  // → 0
    ];
    let labels = vec![0.0, 1.0, 1.0, 0.0];
    
    println!("[!] Kiến trúc: INPUT(2) -> HIDDEN(2, Sigmoid) -> OUTPUT(1, Sigmoid)");
    println!("[!] Learning Rate = 0.5, Epochs = 10000\\n");
    
    let mut model = MlpXor::new(0.5);
    model.train(&data, &labels, 10000);
    
    // Kiểm thử
    println!("\\n==============================================================");
    println!(">> Kết quả dự đoán XOR sau huấn luyện:\\n");
    
    for i in 0..4 {
        let pred = model.forward(&data[i]);
        let class = if pred > 0.5 { "1 (True)" } else { "0 (False)" };
        println!(" - Input {:?} (Label = {}) => Prediction = {:.5} => {}", 
            data[i], labels[i], pred, class);
    }
    
    println!("\\n=> MLP + Backpropagation đã giải được XOR — chấm dứt AI Winter!");
}`
},
{
    id: 'ch21_02_04',
    title: '4. Giải Phẫu MLP 3 Tầng: Forward Pass & Loss Functions / Optimizers',
    duration: '220 phút',
    type: 'theory',
    content: `
<div class="article-content">

  <!--==========================================================-->
  <!-- KIẾN TRÚC MLP FULLY CONNECTED                            -->
  <!--==========================================================-->
  <h2>4.1. Kiến Trúc Mạng Đa Tầng Fully Connected (MLP)</h2>
  
  <p>Khi ghép nhiều Perceptron lại, ta được <strong>MLP (Multi-Layer Perceptron)</strong>, còn gọi là <strong>Dense Network</strong> hoặc <strong>Fully-Connected Network</strong>. "Fully connected" nghĩa là: mỗi neuron ở tầng sau kết nối với <strong>tất cả</strong> neuron ở tầng trước.</p>
  
  <p>Ví dụ: tầng Input có 784 pixels (ảnh 28x28), tầng Hidden có 100 neuron. Số lượng trọng số required cho lớp đó: $784 \times 100 = 78,400$ weights. Đây là kích thước thực tế của ma trận trọng số $W_1$.</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>(1) Tầng Input</h4>
      <p>Không có activation. Chỉ đóng vai trò nhận dữ liệu thô X và chuyển tiếp cho tầng tiếp theo. Số lượng neuron bằng số features của bài toán.</p>
    </div>
    <div class="concept-card">
      <h4>(2) Tầng Hidden (Lớp Ẩn)</h4>
      <p>Bắt buộc phải gắn hàm phi tuyến (ReLU, Sigmoid, Tanh). Tập hợp các tầng này quyết định "độ sâu" (Deep) của mạng. Số lượng ẩn quá nhiều gây ra hiện tượng học vẹt (Overfitting). Quá ít thì không đủ khả năng nhận diện quy luật chìm (Underfitting).</p>
    </div>
    <div class="concept-card">
      <h4>(3) Tầng Output</h4>
      <p>Số neuron và loại activation đi kèm hoàn toàn phụ thuộc vào mục đích của mô hình và hàm Loss Function chọn lựa.</p>
    </div>
  </div>


  <!--==========================================================-->
  <!-- 3 LOẠI BÀI TOÁN VÀ LOSS FUNCTION TƯƠNG ỨNG              -->
  <!--==========================================================-->
  <h3>4.2. Tầng Output Và Các Hàm Loss Functions Cốt Lõi</h3>
  
  <p>Việc chọn sai cấu hình Output và Loss Function sẽ khiến mạng không thể học. Có 3 bộ cấu hình chuẩn hóa thường gặp:</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Hồi Quy (Regression)</h4>
      <p><strong>Mục tiêu:</strong> Dự đoán giá trị liên tục (VD: giá nhà 6.5 tỷ).</p>
      <p><strong>Số nút Output:</strong> 1 (để trả về giá trị số thực).</p>
      <p><strong>Activation Output:</strong> Không dùng (Linear, $y = x$). Vì nếu dùng Sigmoid, giá nhà 6.5 tỷ sẽ bị ép về cận 1.0.</p>
      <div class="formula-block my-2 p-3 bg-gray-50 border-gray-300">
        <p class="font-mono"><strong>Loss Function — MSE (Mean Squared Error):</strong></p>
        <p class="font-mono text-lg">$\text{MSE} = \frac{1}{N} \sum_{i=1}^{N} (Y_{pred}^{(i)} - Y_{true}^{(i)})^2$</p>
      </div>
      <p>Sai số càng lớn, hệ thống phạt càng mạnh (bình phương khuếch đại sai lệch).</p>
    </div>
    
    <div class="concept-card">
      <h4>Phân Lớp Nhị Phân (Binary)</h4>
      <p><strong>Mục tiêu:</strong> Phân loại 2 lớp (VD: Cười tươi / Không cười).</p>
      <p><strong>Số nút Output:</strong> 1 (đóng vai trò xác suất từ 0.0 đến 1.0).</p>
      <p><strong>Activation Output:</strong> <strong>Sigmoid</strong> (Cần thiết ép xác suất về vùng $[0, 1]$).</p>
      <div class="formula-block my-2 p-3 bg-gray-50 border-gray-300">
        <p class="font-mono"><strong>Loss Function — Binary Cross-Entropy (BCE):</strong></p>
        <p class="font-mono text-lg">$\text{BCE} = -\frac{1}{N} \sum_{i=1}^{N} [y_i \ln(\hat{y}_i) + (1-y_i) \ln(1-\hat{y}_i)]$</p>
      </div>
      <p>Phạt nặng sai số bằng cấu trúc logarithm khi mạng dự đoán "tự tin" nghiêng về phía sai.</p>
    </div>
    
    <div class="concept-card">
      <h4>Phân Lớp Đa Lớp (Multi-Class)</h4>
      <p><strong>Mục tiêu:</strong> Nhận định đối tượng thuộc dòng/lớp nào (VD: Nhận diện chữ số từ 0 đến 9).</p>
      <p><strong>Số nút Output:</strong> Tùy chọn $N$ (với 10 chữ số thì $N=10$). Mỗi nút thể hiện xác suất của 1 item.</p>
      <p><strong>Activation Output:</strong> <strong>Softmax</strong> — Đảm bảo tính toán tổng các tỷ lệ = 100%.</p>
      <div class="formula-block my-2 p-3 bg-gray-50 border-gray-300">
        <p class="font-mono"><strong>Loss Function — Categorical Cross-Entropy (CCE):</strong></p>
        <p class="font-mono text-lg">$\text{CCE} = -\sum_{c=1}^{C} y_c \ln(\hat{y}_c)$</p>
        <p class="font-mono">Trong đó $C$ là số lớp, $y_c$ là one-hot label, $\hat{y}_c$ là output từ Softmax.</p>
      </div>
    </div>
  </div>

  <!--==========================================================-->
  <!-- OPTIMIZERS                                                -->
  <!--==========================================================-->
  <h3>4.3. Các Thuật Toán Tối Ưu (Optimizers)</h3>
  
  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">OPTIMIZER</span>
      <p>Sau khi Backprop tính xong gradient, Optimizer quyết định <strong>cách cập nhật</strong> trọng số. Chọn đúng optimizer ảnh hưởng rất lớn đến tốc độ và chất lượng huấn luyện mạng Nơ-ron.</p>
      <ul>
        <li><strong>SGD (Stochastic Gradient Descent):</strong> Cập nhật đơn giản: $W = W - \alpha \times \nabla W$. Dễ bị mắc kẹt do đạo hàm triệt tiêu theo không gian zig-zag của thuật toán.</li>
        <li><strong>Momentum (1999):</strong> Thêm "quán tính" giúp vượt qua local minima nhỏ. Giống hệt một viên bi đẩy dốc: dù gặp rãnh hẹp, độ trượt Momentum vẫn giúp bi lăn tuột lên tới điểm đáy global. Công thức quán tính: $V_{new} = \gamma \cdot V_{old} - \alpha \times \nabla W$.</li>
        <li><strong>Adam (2014 — Kingma & Ba):</strong> Kết hợp cả Momentum và Adaptive Learning Rate. Trọng lượng tính toán thích nghi cá thể đối với mọi nút: Nút ít được kích hoạt $\to$ tự tăng learning rate. Adam hiện tại đại diện cho chuẩn mặc định (Gold Standard) cho các model hiện thời.</li>
      </ul>
    </div>
  </div>

</div>
`,
    defaultCode: `// =================================================================
// LOSS FUNCTIONS VÀ OPTIMIZER (SGD) — RUST IMPLEMENTATION
// =================================================================

#[allow(dead_code)]
pub mod LossAndOptimizer {

    use std::f64;

    // ---------------------------------------------------------
    // MSE Loss — cho bài Hồi Quy (Regression)
    // Loss = Σ(y_pred - y_true)² / N
    // ---------------------------------------------------------
    pub struct MseLoss;
    impl MseLoss {
        pub fn compute(predictions: &Vec<f64>, targets: &Vec<f64>) -> f64 {
            let n = predictions.len();
            let mut loss = 0.0;
            for i in 0..n {
                let diff = predictions[i] - targets[i];
                loss += diff * diff;
            }
            loss / (n as f64)
        }

        /// Gradient: d_Loss/d_pred = 2 × (pred - target) / N
        pub fn gradient(predictions: &Vec<f64>, targets: &Vec<f64>) -> Vec<f64> {
            let n = predictions.len();
            let mut grads = Vec::with_capacity(n);
            for i in 0..n {
                grads.push(2.0 * (predictions[i] - targets[i]) / (n as f64));
            }
            grads
        }
    }


    // ---------------------------------------------------------
    // BCE Loss — cho bài Phân lớp nhị phân
    // Loss = -1/N × Σ[ y×ln(ŷ) + (1-y)×ln(1-ŷ) ]
    // ---------------------------------------------------------
    pub struct BceLoss;
    impl BceLoss {
        pub fn compute(predictions: &Vec<f64>, targets: &Vec<f64>) -> f64 {
            let n = predictions.len();
            let eps: f64 = 1e-15; // Tránh ln(0)
            let mut loss = 0.0;
            
            for i in 0..n {
                let p = predictions[i].max(eps).min(1.0 - eps);
                let y = targets[i];
                loss += y * p.ln() + (1.0 - y) * (1.0 - p).ln();
            }
            -(loss / (n as f64))
        }

        /// Gradient BCE: (pred - target) / [pred × (1 - pred)]
        pub fn gradient(predictions: &Vec<f64>, targets: &Vec<f64>) -> Vec<f64> {
            let n = predictions.len();
            let eps: f64 = 1e-15;
            let mut grads = Vec::with_capacity(n);
            
            for i in 0..n {
                let p = predictions[i].max(eps).min(1.0 - eps);
                let g = (p - targets[i]) / (p * (1.0 - p));
                grads.push(g / (n as f64));
            }
            grads
        }
    }


    // ---------------------------------------------------------
    // SGD Optimizer
    // W_new = W_old - lr × gradient
    // ---------------------------------------------------------
    pub struct SgdOptimizer {
        pub learning_rate: f64,
    }

    impl SgdOptimizer {
        pub fn new(lr: f64) -> Self {
            Self { learning_rate: lr }
        }

        /// Cập nhật ma trận 2D
        pub fn update_weights_2d(&self, weights: &mut Vec<Vec<f64>>, grads: &Vec<Vec<f64>>) {
            for i in 0..weights.len() {
                for j in 0..weights[i].len() {
                    weights[i][j] -= self.learning_rate * grads[i][j];
                }
            }
        }

        /// Cập nhật vector bias
        pub fn update_bias(&self, bias: &mut Vec<f64>, grads: &Vec<f64>) {
            for i in 0..bias.len() {
                bias[i] -= self.learning_rate * grads[i];
            }
        }
    }

}


// =================================================================
// KIỂM THỬ LOSS FUNCTIONS
// =================================================================
pub fn main() {
    println!("============================================================");
    println!("  LOSS FUNCTIONS — MSE vs BCE");
    println!("============================================================\\n");

    use LossAndOptimizer::*;

    // 1. MSE cho Hồi Quy (giá nhà)
    let pred_house = vec![ 6.5, 3.2, 9.1 ];
    let true_house = vec![ 7.0, 3.0, 9.0 ];
    
    let mse = MseLoss::compute(&pred_house, &true_house);
    let mse_grad = MseLoss::gradient(&pred_house, &true_house);
    
    println!("=> [MSE - Hồi Quy Giá Nhà]");
    println!("   Dự đoán: {:?}  |  Thực tế: {:?}", pred_house, true_house);
    println!("   MSE Loss: {:.6}", mse);
    println!("   Gradient: {:?}\\n", mse_grad);
    
    // 2. BCE cho Phân lớp (Spam Detection)
    let pred_spam = vec![ 0.98, 0.05, 0.85 ];
    let true_spam = vec![ 1.0 , 0.0 , 0.0 ];  // Mẫu 3: thực tế Sạch nhưng đoán 85% Spam
    
    let bce = BceLoss::compute(&pred_spam, &true_spam);
    let bce_grad = BceLoss::gradient(&pred_spam, &true_spam);
    
    println!("=> [BCE - Phân Loại Spam]");
    println!("   Xác suất Spam: {:?}  |  Nhãn thật: {:?}", pred_spam, true_spam);
    println!("   BCE Loss: {:.6} (cao vì mẫu 3 đoán sai nghiêm trọng)", bce);
    println!("   Gradient: {:?}", bce_grad);
}`
},
{
    id: 'ch21_02_05',
    title: '5. Từ Số Lượng Lớn Đến Đa Chiều: Tensors & Ma Trận Hóa Mạng Nơ-ron',
    duration: '210 phút',
    type: 'theory',
    content: `
<div class="article-content">

  <!--==========================================================-->
  <!-- TENSORS LÀ GÌ?                                           -->
  <!--==========================================================-->
  <h2>5.1. Tensor Trí Tạo — Ngôn Ngữ Hình Học Của Dữ Liệu</h2>
  
  <p>Toàn bộ ngành Deep Learning được định nghĩa dựa trên <strong>Tensor</strong> (điều làm nên cái tên TensorFlow của Google). Tensor đơn giản là một cấu trúc dữ liệu đa chiều, được chuẩn hóa để GPU và TPU có thể nhân hàng triệu phép tính cùng lúc.</p>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">0D</div>
      <div class="step-content">
        <h4>Scalar (Đại lượng vô hướng)</h4>
        <p>Ví dụ: <code>let x: f32 = 7.5;</code>. Đại diện cho điểm trên một trục. Dùng trong <strong>Loss value</strong>, <strong>Learning Rate</strong>.</p>
      </div>
    </div>
    
    <div class="step-card">
      <div class="step-number">1D</div>
      <div class="step-content">
        <h4>Vector (Mảng 1 chiều)</h4>
        <p>Ví dụ: <code>vec![1.0, 2.5, 3.2]</code>. Chuỗi dữ liệu số. Dùng biểu diễn 1 học sinh với Điểm Văn, Toán, Anh hoặc mảng <strong>Bias (B)</strong>.</p>
      </div>
    </div>
    
    <div class="step-card">
      <div class="step-number">2D</div>
      <div class="step-content">
        <h4>Matrix (Ma trận ngang dọc)</h4>
        <p>Ví dụ: Bảng tính Excel, ảnh Grayscale. Ma trận là cốt lõi của <strong>Weights (W)</strong>. Một ma trận 1000x2000 mô tả trọng số kết nối 2 lớp cực lớn.</p>
      </div>
    </div>
    
    <div class="step-card">
      <div class="step-number">3D</div>
      <div class="step-content">
        <h4>3D Tensor (Khối ma trận)</h4>
        <p>Ví dụ: Hình ảnh RGB (gồm 3 ma trận Red, Green, Blue xếp chồng lên nhau). Dùng chủ yếu trong <strong>Mạng Tích Chập (CNN)</strong> để phân tích ảnh.</p>
      </div>
    </div>
    
    <div class="step-card">
      <div class="step-number">4D</div>
      <div class="step-content">
        <h4>4D Tensor (Batch of 3D)</h4>
        <p>Ví dụ: Một mẻ (batch) gồm 128 bức ảnh RGB được đưa vào GPU cùng một lúc. Shape: <code>(128, 224, 224, 3)</code>.</p>
      </div>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">TẠI SAO LẠI BẮT BUỘC DÙNG MA TRẬN 2D (TENSORS)?</span>
      <p>Việc tính toán từng neuron một thông qua vòng lặp <code>for</code> là một thảm họa về tốc độ thời gian chạy trên vi xử lý thông thường. Bằng cách thiết lập Weights thành ma trận 2D $[W_{i j}]$, và biến 1 batch dữ liệu thành 1 khối ma trận, toàn bộ mạng 1 tỷ phép tính được rút gọn thành đúng 1 dòng phương trình:</p>
      <div class="formula-block my-2 p-3 bg-gray-50 border-gray-300 font-bold text-center">
        $Z = X \times W^T + B$
      </div>
      <p>Các thư viện tính toán chuẩn lõi dưới (như BLAS/cuBLAS) chạy hàm Vector Multiplication nhanh gấp <strong>10,000 lần</strong> so với vòng lặp <code>for</code> bình thường.</p>
    </div>
  </div>


  <!--==========================================================-->
  <!-- SOFTMAX MAX THE BUGS                                     -->
  <!--==========================================================-->
  <h3>5.2. Sự Quá Độ Của Softmax Và Sự Mất Ổn Định Số Học</h3>
  
  <p>Khi dùng mạng nơ-ron để phân lớp đa danh mục (ví dụ đoán ảnh chó, mèo, ngựa), ta dùng hàm kích hoạt Softmax ở lớp cuối. Gọi là "Soft" Max để phân biệt "Hard" Max. Thay vì chỉ chọn ra 1 điểm lớn nhất thành 1, nó tạo ra phân phối phần trăm cho toàn bộ các tập hợp cộng lại = 1.</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p>Công thức gốc của Softmax cho lớp thứ $i$:</p>
    <p class="font-mono text-lg text-center">$P(i) = \frac{e^{Z_i}}{\sum e^{Z_j}}$</p>
  </div>
  
  <p><strong>Hiểm họa (Numerical Stability - Tràn số):</strong> Nếu kết quả dự đoán của mô hình chưa tốt, và $Z_i$ ra giá trị 1000. Lệnh code <code>Math.exp(1000)</code> kết quả $= \infty$ (Infinity). Các số chia Infinity $\to$ lỗi NaN lây lan xé bung sập cả chương trình luyện mô hình!</p>
  
  <p><strong>Giải pháp Toán Học — Stable Softmax:</strong></p>
  <p>Theo giải tích, khi chia phân thức trên dưới cùng cơ số, nếu ta nhân cả 2 vế với cùng hệ số $e^{-C}$, kết quả Toán Học vĩnh viễn không thay đổi.</p>
  <div class="formula-block my-4 p-4 border-indigo-300 bg-gray-50">
    <p class="font-mono">$P(i) = \frac{e^{Z_i - C}}{\sum e^{Z_j - C}}$</p>
    <p>Thuật toán <strong>Stable Softmax</strong> chọn $C = \max(Z)$.</p>
    <p>Nếu $Z = [1000, 1001, 1002]$ $\to C = 1002$.</p>
    <p>Tập giá trị mới: $Z - C = [-2, -1, 0]$. Toán tử <code>exp(0) = 1</code>, hoàn toàn an toàn, dập tắt tận gốc nguyên căn NaN (Not a Number).</p>
  </div>

</div>
`,
    defaultCode: `// =================================================================
// ĐẠI SỐ ĐA CHIỀU — MATRIX MULTIPLICATION VÀ STABLE SOFTMAX
// =================================================================

#[allow(dead_code)]
pub mod TensorMath {
    use std::f64;

    /// Ma trận 2D thô sơ: Vec<Vec<f64>> (Để hiểu quy trình bên dưới Tensor)
    /// Ma trận thực tế được lưu 1D liên tục trên RAM (Vec<f64>) để cache-friendly.
    pub type Matrix = Vec<Vec<f64>>;


    // ---------------------------------------------------------
    // 1. Phép nhân ma trận thô (O(N^3)) — Cốt lõi của Deep Learning
    // z = X * W + b
    // ---------------------------------------------------------
    pub fn linear_layer_forward(input_x: &Matrix, weights_w: &Matrix, bias_b: &Vec<f64>) -> Matrix {
        let x_rows = input_x.len();
        let x_cols = input_x[0].len();
        let w_rows = weights_w.len();
        let w_cols = weights_w[0].len();

        // Kiểm tra điều kiện Matrix Multiplication: Số cột X = Số hàng W
        if x_cols != w_rows {
            panic!("Lỗi không khớp chiều: X(_, {}) * W({}, _)", x_cols, w_rows);
        }
        
        // Khởi tạo ma trận kết quả Zero
        let mut output_z = vec![vec![0.0; w_cols]; x_rows];

        // O(N^3) standard multiplication
        for i in 0..x_rows {          // Duyệt từng sample (batch size)
            for j in 0..w_cols {      // Duyệt từng neuron ẩn
                
                let mut sum = 0.0;
                for k in 0..x_cols {  // Dòm kết nối (inputs to that neuron)
                    sum += input_x[i][k] * weights_w[k][j];
                }
                
                // Cộng Bias Broadcast: Bias 1D chuyển thành từng hàng ma trận
                output_z[i][j] = sum + bias_b[j];
            }
        }
        output_z
    }


    // ---------------------------------------------------------
    // 2. Stable Softmax — Chống tràn số (Numerical Stability)
    // ---------------------------------------------------------
    pub fn stable_softmax(logits_z: &Vec<f64>) -> Vec<f64> {
        // [A] Hàm Max - Tìm số cực đại
        let mut max_z = logits_z[0];
        for &val in logits_z.iter() {
            if val > max_z { max_z = val; }
        }

        // [B] Trừ giá trị logit đi Max_Z (Dịch toàn bộ giá trị về vùng âm)
        let mut exp_values = Vec::with_capacity(logits_z.len());
        let mut sum_exp = 0.0;

        for &val in logits_z.iter() {
            // exp(val - max_z): An toàn tuyệt đối, vì (val - max_z) <= 0
            // Nghĩa là exp(...) chỉ nằm vùng 0.000... đến 1.0 (không bao giờ vượt 1.0)
            let exp_val = (val - max_z).exp();
            exp_values.push(exp_val);
            sum_exp += exp_val;
        }

        // [C] Chia tổng (Normalization về 100%)
        let mut probabilities = Vec::with_capacity(logits_z.len());
        for &ev in exp_values.iter() {
            probabilities.push(ev / sum_exp);
        }

        probabilities
    }
}


// =================================================================
// KIỂM THỬ: HIỂU VỀ BUGS DO KHÔNG STABLE THUẬT TOÁN SOFTMAX
// =================================================================
pub fn main() {
    println!("============================================================");
    println!("  PHÂN TÍCH TENSORS & STABLE SOFTMAX");
    println!("============================================================\\n");

    // Tái tạo lại sự cố do Over-confidence (Giá trị Logits lớn khủng khiếp)
    // Giả sử ta đang có Logits cho dự đoán 3 classes (Chó, Mèo, Gà) 
    
    let raw_logits = vec![ 1205.0, 1000.0, 750.0 ];
    
    // [1] CÁCH TÍNH DẠI DỘT (SOFTMAX KHÔNG AN TOÀN)
    println!(">> TRƯỜNG HỢP 1: SOFTMAX CƠ BẢN (CHƯA STABLE)");
    println!("Tính e^(1205.0)...");
    let dumb_exp: Vec<f64> = raw_logits.iter().map(|z| z.exp()).collect();
    println!("- Mảng e^Z: {:?}", dumb_exp);
    // Lưu ý: Kết quả Rust in ra "inf" (Infinity), Mất đi quyền kiểm soát!

    // [2] CÁCH TÍNH THỰC TẾ (STABLE SOFTMAX CO MAX)
    println!("\\n>> TRƯỜNG HỢP 2: STABLE SOFTMAX TỪ THƯ VIỆN CÔNG NGHIỆP");
    let probs = TensorMath::stable_softmax(&raw_logits);
    
    println!("- Kết quả trả lại chuẩn:");
    println!("   > Chó (1205) = {:.6}%", probs[0] * 100.0);
    println!("   > Mèo (1000) = {:.6}%", probs[1] * 100.0);
    println!("   > Gà ( 750) = {:.6}%", probs[2] * 100.0);
    
    println!("\\n[Bài học] Softmax Stable dịch dải giá trị từ [1205, 1000, 750] thành [0, -205, -455].");
    println!("e^0.0 = 1. Đây là cách toán học cứu sống toàn bộ Deep Learning từ đống lỗi Infinity!");
}`
},
{
    id: 'ch21_02_06',
    title: '6. Tối Ưu Hóa Dataloader & Batching: Không Nấu Soup Bằng Cốc Cà Phê',
    duration: '220 phút',
    type: 'theory',
    content: `
<div class="article-content">

  <!--==========================================================-->
  <!-- HIỆN TƯỢNG BOTTLE-NECK BĂNG THÔNG                        -->
  <!--==========================================================-->
  <h2>6.1. Băng Thông IO Phím Lệnh Bóp Nghẹt Tốc Độ Tensor</h2>
  
  <p>Cho dù GPU (Card đồ họa) của bạn nhanh đến 10 Nghìn Tỷ phép tính trên giây đi thì sao? Nếu bộ phận cung cấp dữ liệu RAM (CPU) đi theo luồng tốc độ rùa, thì GPU buộc phải ngừng chờ. Không thể đưa từng bức ảnh 1 cho GPU. Đó gọi là hiện tượng nghẽn cổ chai I/O.</p>

  <div class="callout callout-info">
    <div class="callout-content">
      <span class="callout-title">KHÁI NIỆM BATCHING (GÓI TẬP)</span>
      <p>Giải pháp: Thay vì dạy mô hình từng dữ liệu một (1), người kỹ sư ghép 64 bức ảnh chụp chung thành 1 tập Tensor Ma trận. Gọi nó là một mẻ <strong>(Minibatch size = 64)</strong>.</p>
      <p>Việc tải chung 1 cục 64 file ảnh lên thẻ nhớ V-RAM vào GPU, giúp cho GPU chỉ đọc đúng 1 lệnh IO. Tính toán ra 64 lần error, cộng giá trị Gradient trung bình thành 1 cục, rồi backprop Update đúng một lần. Vừa êm mượt, vừa tăng tốc 10x-50x lần.</p>
    </div>
  </div>

  <!--==========================================================-->
  <!-- BGD vs SGD vs MINI-BATCH                                  -->
  <!--==========================================================-->
  <h3>6.2. Kì Thư 3 Phiên Bản Gradient Descent</h3>
  
  <div class="image-showcase">
    <img src="/images/ch21/gradient_descent_valley_1773153973142.png" alt="Phân tách các dạng Gradient Descent Optimizer" />
    <div class="image-caption">Đồng mức Contour: Đường vẽ của Batch GD, SGD và Mini-Batch Gradient Descent</div>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Loại Thuật Toán</th>
        <th>Xử lý Size</th>
        <th>Độ trơn học tập</th>
        <th>Bộ nhớ cần dùng</th>
        <th>Tốc độ hội tụ / bước</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Batch Gradient Descent</strong></td>
        <td>Nguyên kho DATA</td>
        <td>Rất mượt, dốc thoai thoải thẳng đích</td>
        <td>Siêu Lớn (Vượt VRAM là Crash Out of Mem)</td>
        <td>Cực kì chậm - mất hàng tuần update 1 lệnh</td>
      </tr>
      <tr>
        <td><strong>Stochastic GD (SGD)</strong></td>
        <td>Chỉ 1 mẫu duy nhất</td>
        <td>Góc cạnh, nảy sinh ngẫu nhiên zig zag (noisy)</td>
        <td>Nhỏ gọn xíu 1KB RAM</td>
        <td>Gây loạn trí mạng, cực nhanh nhưng ko chuẩn</td>
      </tr>
      <tr>
        <td><strong>Mini-Batch GD</strong></td>
        <td>Batch Size = [16, 32, 64, 256]</td>
        <td>Mượt Tốt</td>
        <td>Cân đối cho hệ V-RAM (vài GBs)</td>
        <td>Gold Standard (Sử dụng 100% hiện nay)</td>
      </tr>
    </tbody>
  </table>

  <!--==========================================================-->
  <!-- DATALOADER HOẠT ĐỘNG THẾ NÀO?                            -->
  <!--==========================================================-->
  <h3>6.3. Giải Phẫu Dataloader Shuffle & Quản Lý Epoch</h3>
  
  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Shuffle (Xào trộn mảng bộ dư liệu)</h4>
        <p>Nếu không xào trộn, mạng sẽ học 100 ảnh chó, rồi 100 ảnh mèo. Khi nó tới tập lớp mèo, tính năng Backprop "xóa não" các thuộc tính hệ chó vì hàm loss chỉ phạt chó nên thay đổi trọng số chó bằng O. Buộc <strong>bắt buộc phải Shuffle ngẫu nhiên</strong> toàn độ kho data cho mỗi tập Epoch Training ngẫu nhiên.</p>
      </div>
    </div>
    
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Epoch Control (Tráo vòng liên hoàn)</h4>
        <p>1 Epoch là mạng đã nuốt sạch kho data cũ. Cần 1 vòng lệnh vòng ngoài tiếp cận việc cấp nạp theo index. Nó cũng ném phần lẻ không chẵn của batch count vứt bỏ dọn dẹp.</p>
      </div>
    </div>
  </div>

</div>
`,
    defaultCode: `// =================================================================
// BATCHING DATALOADER VÀ SHUFFLE
// =================================================================

#[allow(dead_code)]
pub mod DataSetCore {
    use std::f64;

    // Linear Congruential Generator tự chế lấy seed ngẫu nhiên
    pub struct AutoRng { seed: u64 }
    impl AutoRng {
        pub fn new(seed: u64) -> Self { Self { seed } }
        pub fn next_u32(&mut self) -> u32 {
            self.seed = self.seed.wrapping_mul(6364136223846793005).wrapping_add(1442695040888963407);
            (self.seed >> 32) as u32
        }
        
        /// Tráo Random Fisher-Yates shuffle algorithm
        pub fn shuffle_array<T>(&mut self, arr: &mut Vec<T>) {
            let n = arr.len();
            if n <= 1 { return; }
            for i in (1..n).rev() {
                // random bound từ 0 đến i inclusive
                let id = (self.next_u32() as usize) % (i + 1);
                arr.swap(i, id);
            }
        }
    }


    // ---------------------------------------------------------
    // Mini-Batch Dataloader Engine
    // ---------------------------------------------------------
    pub struct SuperDataLoader {
        pub inputs: Vec<Vec<f64>>,
        pub labels: Vec<f64>,
        pub batch_size: usize,
        pub drop_last: bool,       // Vứt dòng lẻ cuối khi batch size dư
        current_indices: Vec<usize>,
    }

    impl SuperDataLoader {
        pub fn new(inps: Vec<Vec<f64>>, lbls: Vec<f64>, b_size: usize, drop_last: bool) -> Self {
            let n = inps.len();
            let mut indices = Vec::with_capacity(n);
            for i in 0..n { indices.push(i); }
            
            Self {
                inputs: inps,
                labels: lbls,
                batch_size: b_size,
                drop_last,
                current_indices: indices,
            }
        }

        /// Xào trộn bộ index trước khi thả batch mới cho 1 vòng Epoch mới
        pub fn epoch_shuffle(&mut self, seed: u64) {
             let mut rng = AutoRng::new(seed);
             rng.shuffle_array(&mut self.current_indices);
        }

        /// Cắt mẻ ra thành nhiều List (Batch 1, Batch 2...) trả về Model đào tạo
        pub fn acquire_batches(&self) -> Vec<(Vec<Vec<f64>>, Vec<f64>)> {
            let total = self.current_indices.len();
            let mut result = Vec::new();
            
            let mut start_id = 0;
            while start_id < total {
                let mut end_id = start_id + self.batch_size;
                
                // Nếu vượt khung total
                if end_id > total {
                    if self.drop_last {
                        break; // Bỏ lẻ mẻ
                    }
                    end_id = total; 
                }
                
                // Thu gom
                let mut batch_dx = Vec::new();
                let mut batch_lb = Vec::new();
                for i in start_id..end_id {
                    let map_id = self.current_indices[i];
                    batch_dx.push(self.inputs[map_id].clone());
                    batch_lb.push(self.labels[map_id]);
                }
                result.push((batch_dx, batch_lb));
                
                start_id = end_id;
            }
            result
        }
    }
}

// =================================================================
// KIỂM THỬ: XEM KHẢ NĂNG SINH 3 BATCH KÍCH THƯỚC BATCH = 2 MẶC ĐỊNH
// =================================================================
pub fn main() {
    println!("============================================================");
    println!("  MINI-BATCH DATALOADER VÀ CƠ CHẾ SHUFFLE CHỐNG OVERFIT");
    println!("============================================================\\n");

    let core_truedata = vec![
        vec![ 1.0, 1.0 ], // Nước chấm 0
        vec![ 2.0, 2.0 ], // Nước chấm 1
        vec![ 3.0, 3.0 ], // Nước chấm 2
        vec![ 4.0, 4.0 ], // Nước chấm 3
        vec![ 5.0, 5.0 ], // Nước chấm 4
    ];
    let tag_truedata = vec![ 10.0, 20.0, 30.0, 40.0, 50.0 ];

    println!("[*] KHỞI TẠO: DATA 5 HÀNG, BATCH SIZE YÊU CẦU = 2 (Lẻ 1 mẫu cuối)");
    let mut loader = DataSetCore::SuperDataLoader::new(core_truedata, tag_truedata, 2, false);

    // Xào bài Epoch 1
    loader.epoch_shuffle(999);
    println!(">> Gọi lấy mẻ Epoch (1), Shuffle ngẫu nhiên khóa [999]:");
    let ep1_batches = loader.acquire_batches();
    
    for (i, (dx_bat, lb_bat)) in ep1_batches.iter().enumerate() {
        println!(" - Mẻ {} chứa {} items (Nhãn mục: {:?})", i+1, dx_bat.len(), lb_bat);
    }
    
    // Xào bài vòng Epoch 2
    loader.epoch_shuffle(9009);
    println!("\\n>> Chạy Epoch mới vòng (2). Tráo khóa biến thiên [9009] MỚI:");
    let ep2_batches = loader.acquire_batches();
    for (i, (dx_bat, lb_bat)) in ep2_batches.iter().enumerate() {
        println!(" - Mẻ {} (Nhãn mục mới xếp rải rác: {:?})", i+1, lb_bat);
    }
    
    println!("\\n[Kết luận] Shuffle thay đổi liên tục giúp hệ thống Mạng Nơron ăn lượng Data lộn xộn, ko dự đoán được chu kỳ và ko học vẹt pattern hàng dòng thô rác!");
}`
}
]};

export default ch21_02;
