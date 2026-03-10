// =====================================================
// Chương 21: MẠNG NEURAL NETWORK (Neural Networks)
// Bài 1: TỪNG BƯỚC MỘT - PERCEPTRON
//
// Mục tiêu của bài học này:
// Sau khi học xong bài này, bạn sẽ hiểu:
// 1. Neural Network hoạt động như thế nào về mặt toán học
// 2. Perceptron là gì và tại sao nó là đơn vị cơ bản nhất
// 3. Cách một neuron nhận input, tính toán, và cho ra output
// 4. Tại sao cần weights và bias
// 5. Activation function làm gì và tại sao phải có nó
// =====================================================

import { Lesson, Chapter } from '../../courses';

// =====================================================
// PHẦN 1: LÝ THUYẾT - GIẢI THÍCH CHI TIẾT TỪNG KHÁI NIỆM
// =====================================================

const ch21_01_lessons: Lesson[] = [
  {
    id: 'ch21_01_01',
    title: '1. Neural Network là gì? Giải thích bằng ví dụ thực tế',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">psychology</span> 1. Neural Network là gì? Giải thích bằng ví dụ thực tế</h2>

  <h3><span class="material-symbols-outlined">lightbulb</span> 1.1. Trước hết: Machine Learning (Học Máy) là gì?</h3>
  <p>Trước khi nói về Neural Network, ta cần hiểu <strong>Machine Learning (ML)</strong> - nền tảng mà Neural Network được xây dựng trên đó. <strong>Machine Learning</strong> là một nhánh của Trí Tuệ Nhân Tạo (AI), cho phép máy tính <strong>"học" từ dữ liệu</strong> mà không cần lập trình viên viết code cho từng tình huống cụ thể.</p>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">code</span></div>
      <h4>Lập trình truyền thống</h4>
      <p>Input + RULES (do con người viết) &rarr; Output</p>
      <p><em>Ví dụ:</em> Viết 100 quy tắc phân biệt email spam bằng tay.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">model_training</span></div>
      <h4>Machine Learning</h4>
      <p>Input + Output (dữ liệu mẫu) &rarr; RULES (máy tự học)</p>
      <p><em>Ví dụ:</em> Cho máy xem 10,000 email spam/không spam, máy TỰ tìm quy tắc.</p>
    </div>
  </div>

  <h4>Ba loại Machine Learning chính:</h4>
  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">school</span></div>
      <h4>Supervised Learning (Học có giám sát)</h4>
      <p>Có <strong>DỮ LIỆU</strong> và <strong>NHÃN</strong>.</p>
      <p><em>Ví dụ:</em> Dự đoán giá nhà dựa trên diện tích.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">travel_explore</span></div>
      <h4>Unsupervised Learning (Không giám sát)</h4>
      <p>Chỉ có <strong>DỮ LIỆU</strong>, không có nhãn. Tự tìm cấu trúc ẩn.</p>
      <p><em>Ví dụ:</em> Phân nhóm khách hàng.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">sports_esports</span></div>
      <h4>Reinforcement Learning (Học tăng cường)</h4>
      <p>Học bằng <strong>THỬ VÀ SAI</strong>, nhận thưởng/phạt.</p>
      <p><em>Ví dụ:</em> AI chơi game, Robot tự lái.</p>
    </div>
  </div>

  <div class="callout callout-important">
    <span class="material-symbols-outlined">stars</span>
    <div class="callout-content">
      <span class="callout-title">Neural Network nằm ở đâu?</span>
      <p>Neural Network chủ yếu thuộc <strong>Supervised Learning</strong> - ta cho nó dữ liệu và đáp án, nó tự tìm ra quy luật!</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <span class="material-symbols-outlined">dataset</span>
    <div class="callout-content">
      <span class="callout-title">Training Data vs Test Data</span>
      <p>Khi có dữ liệu (ví dụ 10,000 ảnh), ta luôn chia thành:
      <ul>
        <li><strong>Training Data (80%):</strong> Máy "học" từ đây (giống học sinh làm bài tập).</li>
        <li><strong>Test Data (20%):</strong> Kiểm tra máy học có tốt không (giống học sinh đi thi). KHÔNG ĐƯỢC để máy nhìn thấy trước!</li>
      </ul></p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">biotech</span> 1.2. Neuron sinh học - Cơ sở cảm hứng</h3>
  <p>Neural Network nhân tạo <strong>mô phỏng</strong> quá trình gửi/nhận tín hiệu của não bộ.</p>
  
  <div class="definition-block">
    <span class="definition-term">Nguyên tắc Hebb (1949): "Neurons that fire together, wire together"</span>
    <p>Những neuron cùng "bắn" tín hiệu sẽ có kết nối <strong>mạnh hơn</strong>. Ví dụ: Thấy "Lửa" &rarr; Bị "Nóng" (hai neuron cùng bắn). Sau này chỉ cần nghĩ tới "Lửa" là não tự liên kết đến "Nóng". Cơ chế này hình thành trí nhớ và học tập.</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr><th>Bộ não con người</th><th>Neural Network (Máy tính)</th><th>Vai trò</th></tr>
    </thead>
    <tbody>
      <tr><td>Dendrites (Nhánh nhận)</td><td>Inputs ($x$)</td><td>Thu thập thông tin</td></tr>
      <tr><td>Synapse</td><td>Weight ($w$)</td><td>Quản lý "Độ mạnh" của kết nối</td></tr>
      <tr><td>Cell body</td><td>Weighted Sum ($z = \\sum wx + b$)</td><td>Tổng hợp thông tin</td></tr>
      <tr><td>Ngưỡng bắn (Threshold)</td><td>Activation Function $f(z)$</td><td>Quyết định kích hoạt</td></tr>
      <tr><td>Axon (Sợi xâu)</td><td>Output ($y$)</td><td>Đưa kết quả ra ngoài</td></tr>
    </tbody>
  </table>

  <h3><span class="material-symbols-outlined">memory</span> 1.3. Universal Approximation Theorem</h3>
  <div class="definition-block">
    <span class="definition-term">Định lý Xấp xỉ Phổ quát (1989)</span>
    <p>Một Neural Network với <strong>ÍT NHẤT 1 hidden layer</strong> chứa đủ neurons có thể <strong>XẤP XỈ BẤT KỲ</strong> hàm số liên tục nào với độ chính xác tùy ý.</p>
  </div>
  <p>Tuy nhiên, định lý này chỉ nói NN <strong>có thể</strong> xấp xỉ chứ không cung cấp phương pháp <strong>làm sao để tìm</strong> weights hợp lý. Đó là lý do ta phải huấn luyện (train) mô hình.</p>

  <h3><span class="material-symbols-outlined">apps</span> 1.4. Neural Network giải quyết bài toán gì?</h3>
  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">category</span></div>
      <h4>Classification (Phân loại)</h4>
      <p>Dự đoán một loại rời rạc.</p>
      <p><em>VD:</em> Ảnh &rarr; Chó/Mèo, Email &rarr; Spam/Inb.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">ssid_chart</span></div>
      <h4>Regression (Hồi quy)</h4>
      <p>Dự đoán số thực liên tục.</p>
      <p><em>VD:</em> Kích thước nhà &rarr; Giá 5 tỷ.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">auto_fix_high</span></div>
      <h4>Generation (Sinh mới)</h4>
      <p>Sinh dữ liệu từ mẫu đã học.</p>
      <p><em>VD:</em> ChatGPT viết bài, AI vẽ ảnh.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">workspaces</span></div>
      <h4>Clustering (Gom cụm)</h4>
      <p>Gom nhóm không cần nhãn.</p>
      <p><em>VD:</em> Phân khúc khách hàng.</p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">history</span> 1.5. Lịch sử phát triển Neural Networks</h3>
  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>1943 - Khởi nguồn & Toán học</h4>
        <p>Warren McCulloch và Walter Pitts đề xuất mô hình toán học neuron đầu tiên.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>1958 - Perceptron</h4>
        <p>Frank Rosenblatt tạo ra <strong>Perceptron</strong> - neuron nhân tạo có thể học. Nhưng vướng rào cản XOR problem.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>1986 - Backpropagation (LAN TRUYỀN NGƯỢC)</h4>
        <p>Hinton, Rumelhart và Williams phổ biến Backpropagation - giúp Model có nhiều Hidden Layers học thành công!</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>HIỆN TẠI - Deep Learning</h4>
        <p>AlexNet (2012) chiến thắng ImageNet. Transformers (2017) dẫn đến LLM, ChatGPT, Copilot (AI thống trị).</p>
      </div>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">schema</span> 1.6. Cấu trúc điển hình</h3>
  <div class="image-showcase">
    <img src="/assets/ch21/neural_network_layers_1773152542781.png" alt="Neural Network Component Layers" />
    <div class="image-caption"><span class="material-symbols-outlined">info</span> Sơ đồ cấu tạo một mạng Neural Network 2 Hidden Layers</div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">login</span></div>
      <h4>Input Layer (Lớp đầu vào)</h4>
      <p>Nơi dữ liệu thô đi vào (ví dụ ảnh 28x28 có 784 biến inputs).</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">layers</span></div>
      <h4>Hidden Layer(s) (Lớp ẩn)</h4>
      <p>Làm nhiệm vụ "phần cứng" trích xuất đặc trưng và xử lý tính toán cực kì phức tạp.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">logout</span></div>
      <h4>Output Layer (Lớp đầu ra)</h4>
      <p>Lớp quyết định đưa ra dự báo cuối cùng (vd: "Số 9", "Thư Rác").</p>
    </div>
  </div>

  <div class="key-takeaway">
    <div class="key-takeaway-icon">
      <span class="material-symbols-outlined">psychology</span>
    </div>
    <h3>Quy tắc Tối Thượng</h3>
    <p>Neural Network tóm lại là một biểu thức toán khổng lồ có khả năng <strong>tự điều chỉnh các Trọng Số (Weights)</strong> để <strong>Biến Inputs &rarr; Outputs</strong> một cách chính xác nhất thông qua việc học bù trừ từ dữ liệu mẫu.</p>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// VÍ DỤ MINH HỌA: NEURAL NETWORK ĐƠN GIẢN NHẤT
// Bài toán: Dự đoán giá nhà dựa trên diện tích
// =====================================================

// Đây là ví dụ đơn giản nhất của Neural Network:
// - 1 input (diện tích)
// - 1 output (giá nhà)
// - Không có hidden layer (chỉ là linear regression)

// Cấu trúc: y = w * x + b
// Trong đó:
//   - x là input (diện tích)
//   - w là weight (trọng số - hệ số nhân)
//   - b là bias (độ lệch - hệ số cộng thêm)
//   - y là output (giá nhà dự đoán)

// =====================================================
// BƯỚC 1: CHUẨN BỊ DỮ LIỆU HUẤN LUYỆN
// =====================================================
// Chúng ta có dữ liệu về các căn nhà đã bán:
// - Diện tích (m²): x
// - Giá bán (triệu đồng): y

fn main() {
    // === KHAI BÁO DỮ LIỆU ===
    // Dữ liệu huấn luyện: cặp (input, output)
    // Ví dụ: Nhà 50m² bán 150 triệu, nhà 100m² bán 300 triệu...

    // Mảng chứa diện tích (input)
    let dien_tich = vec![50.0, 100.0, 150.0, 200.0, 250.0];

    // Mảng chứa giá nhà tương ứng (output/ground truth)
    let gia_that = vec![150.0, 300.0, 450.0, 600.0, 750.0];

    // In ra dữ liệu để xem
    println!("╔══════════════════════════════════════════════════════╗");
    println!("║       DỮ LIỆU HUẤN LUYỆN - GIÁ NHÀ                 ║");
    println!("╠══════════════════════════════════════════════════════╣");
    println!("║  STT  │  Diện tích (m²)  │  Giá (triệu)           ║");
    println!("╠══════╪═══════════════════╪════════════════════════╣");

    for i in 0..dien_tich.len() {
        // In từng dòng dữ liệu với format đẹp
        println!("║   {}   │      {:>5}        │      {:>5}            ║",
                 i + 1,
                 dien_tich[i] as i32,
                 gia_that[i] as i32);
    }
    println!("╚══════════════════════════════════════════════════════╝");

    // =====================================================
    // BƯỚC 2: KHỞI TẠO WEIGHTS VÀ BIAS
    // =====================================================
    // Neural Network cần "đoán" các tham số w và b
    // Ban đầu, ta không biết giá trị đúng, nên đặt bất kỳ

    // Weight (trọng số) - ban đầu đặt = 0
    // Ý nghĩa: Mỗi m² tăng thêm, giá tăng bao nhiêu?
    let mut w: f64 = 0.0;

    // Bias (độ lệch) - ban đầu đặt = 0
    // Ý nghĩa: Giá cơ bản của nhà (không phụ thuộc diện tích)
    let mut b: f64 = 0.0;

    // In trạng thái ban đầu
    println!("\\n╔══════════════════════════════════════════════════════╗");
    println!("║       TRẠNG THÁI BAN ĐẦU CỦA MODEL                    ║");
    println!("╠══════════════════════════════════════════════════════╣");
    println!("║  Công thức dự đoán: y = w * x + b                    ║");
    println!("║                                                          ║");
    println!("║  w (weight) = {}                                          ║", w);
    println!("║  b (bias)    = {}                                          ║", b);
    println!("║                                                          ║");
    println!("║  Với công thức này, model dự đoán TẤT CẢ các căn nhà   ║");
    println!("║  đều có giá = 0 (vì w=0, b=0)!                         ║");
    println!("╚══════════════════════════════════════════════════════╝");

    // =====================================================
    // BƯỚC 3: DỰ ĐOÁN VỚI WEIGHTS KHỞI TẠO
    // =====================================================
    println!("\\n╔══════════════════════════════════════════════════════╗");
    println!("║       DỰ ĐOÁN BAN ĐẦU (TOÀN BỘ SAI!)                 ║");
    println!("╠══════════════════════════════════════════════════════╣");
    println!("║  Diện tích │ Giá thực │ Dự đoán │ Sai số            ║");
    println!("╠════════════╪═══════════╪═════════╪══════════════════╣");

    // Tính toán dự đoán cho từng căn nhà
    for i in 0..dien_tich.len() {
        // Công thức: y = w * x + b
        // Hiện tại: y = 0 * x + 0 = 0
        let gia_du_doan = w * dien_tich[i] + b;

        // Tính sai số (error) = thực - dự đoán
        let sai_so = gia_that[i] - gia_du_doan;

        println!("║  {:>5} m²  │   {:>5}   │   {:>5}  │  {:>10}      ║",
                 dien_tich[i] as i32,
                 gia_that[i] as i32,
                 gia_du_doan as i32,
                 sai_so as i32);
    }
    println!("╚══════════════════════════════════════════════════════╝");

    // =====================================================
    // BƯỚC 4: TÍNH TỔNG SAI SỐ (LOSS)
    // =====================================================
    // Loss là một con số tổng hợp cho biết model TỆ đến mức nào
    // Ta dùng MSE (Mean Squared Error) - Sai số bình phương trung bình

    let mut tong_sai_so_binh_phuong = 0.0;

    // Cộng dồn bình phương sai số của từng căn nhà
    for i in 0..dien_tich.len() {
        let gia_du_doan = w * dien_tich[i] + b;
        let sai_so = gia_that[i] - gia_du_doan;

        // Bình phương sai số để:
        // 1. Loại bỏ dấu âm (sai cao hơn hay thấp hơn đều bad)
        // 2. Phạt nặng sai số lớn (20² = 400, 10² = 100)
        tong_sai_so_binh_phuong += sai_so * sai_so;
    }

    // Trung bình = tổng / số lượng
    let mse = tong_sai_so_binh_phuong / dien_tich.len() as f64;

    println!("\\n╔══════════════════════════════════════════════════════╗");
    println!("║       SAI SỐ (LOSS) CỦA MODEL                        ║");
    println!("╠══════════════════════════════════════════════════════╣");
    println!("║                                                          ║");
    println!("║  MSE (Mean Squared Error) = Tổng(sai²) / n            ║");
    println!("║                                                          ║");
    println!("║  MSE = {}                                              ║", mse as i32);
    println!("║                                                          ║");
    println!("║  Ý nghĩa: Trung bình mỗi căn nhà, sai số bình phương   ║");
    println!("║           là {} triệu²                                 ║", mse as i32);
    println!("║                                                          ║");
    println!("║  Mục tiêu: Giảm MSE xuống 0 (hoặc càng nhỏ càng tốt)  ║");
    println!("╚══════════════════════════════════════════════════════╝");

    println!("\\n=== KẾT LUẬN ===");
    println!("Hiện tại model của chúng ta RẤT TỆ!");
    println!("Sai số quá lớn → Cần điều chỉnh w và b");
    println!("\\nVấn đề: Làm sao biết nên ĐIỀU CHỈNH w và b như thế nào?");
    println!("→ Đáp án: GRADIENT DESCENT (sẽ học ở bài sau)");
}`,
  },
  {
    id: 'ch21_01_02',
    title: '2. Perceptron - Đơn vị cơ bản nhất của Neural Network',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">psychology</span> 2. Perceptron - Đơn vị cơ bản nhất của Neural Network</h2>

  <h3><span class="material-symbols-outlined">help</span> 2.1. Perceptron là gì?</h3>
  <div class="definition-block">
    <p><strong>Perceptron</strong> là đơn vị tính toán cơ bản nhất của Neural Network, được phát minh bởi Frank Rosenblatt năm 1958. Nó là một mô hình toán học mô phỏng hoạt động của một neuron sinh học.</p>
  </div>

  <h3><span class="material-symbols-outlined">architecture</span> 2.2. Cấu trúc của một Perceptron</h3>
  <div class="image-showcase">
    <img src="/assets/ch21/perceptron_model_1773152558045.png" alt="Sơ đồ mô hình Perceptron" />
    <div class="image-caption">Mô hình Perceptron với Inputs, Weights, Bias và Activation Function</div>
  </div>

  <div class="formula-block">
    <p><strong>Công thức toán học:</strong></p>
    <p>z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b</p>
    <p>y = f(z)</p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">input</span></div>
      <h4>Inputs (x₁, ..., xₙ)</h4>
      <p>Các giá trị đầu vào của mô hình (luôn là dạng số học).</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">fitness_center</span></div>
      <h4>Weights (w₁, ..., wₙ)</h4>
      <p>Trọng số quyết định mức độ quan trọng của từng input.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">tune</span></div>
      <h4>Bias (b)</h4>
      <p>Hệ số điều chỉnh ranh giới độc lập với input.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">functions</span></div>
      <h4>Activation Function f()</h4>
      <p>Hàm biến đổi tổng (z) thành output cuối cùng (y).</p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">info</span> 2.3. Giải thích từng thành phần</h3>
  
  <div class="features-grid">
    <div class="feature-card">
      <h4>a) Inputs (Đầu vào) - x</h4>
      <p>Dữ liệu đưa vào Perceptron (phải là số). Ví dụ: pixel của ảnh, đặc điểm ngôi nhà.</p>
    </div>
    <div class="feature-card">
      <h4>b) Weights (Trọng số) - w</h4>
      <p><strong>Dương:</strong> tỷ lệ thuận, <strong>Âm:</strong> tỷ lệ nghịch, <strong>Gần 0:</strong> không quan trọng.</p>
    </div>
    <div class="feature-card">
      <h4>c) Bias (Độ lệch) - b</h4>
      <p>Cho phép neuron dễ/khó "bắn" thông tin hơn mà không phụ thuộc vào input.</p>
    </div>
    <div class="feature-card">
      <h4>d) Weighted Sum (Tổng) - z</h4>
      <p>z = tổng của (weight × input) + bias.</p>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-icon"><span class="material-symbols-outlined">functions</span></div>
    <div class="callout-content">
      <strong>e) Activation Function - f()</strong>
      <p>Chuyển đổi z thành output y. Giúp tạo ra tính <em>phi tuyến</em> (thay vì chỉ nối các đường thẳng tuyến tính) và qua đó giới hạn mức output không bị bùng nổ quá lớn.</p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">trending_up</span> 2.4. Activation Functions phổ biến</h3>
  <div class="image-showcase">
    <img src="/assets/ch21/activation_functions_1773152787399.png" alt="Đồ thị các hàm kích hoạt (Step, Sigmoid, ReLU)" />
    <div class="image-caption">Trực quan hoá hình dáng các hàm kích hoạt phổ biến</div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Step Function (Nguyên thuỷ)</h4>
      <p>1 nếu z ≥ 0, ngược lại 0.</p>
      <p><em>Nhược điểm:</em> Đạo hàm bằng 0, không thể học bằng Gradient Descent hiệu quả.</p>
    </div>
    <div class="concept-card">
      <h4>Sigmoid</h4>
      <p>Output luôn ∈ (0, 1), đẹp như xác suất.</p>
      <p><em>Nhược điểm:</em> Triệt tiêu Gradient ở 2 đầu đuôi (Vanishing gradient).</p>
    </div>
    <div class="concept-card">
      <h4>ReLU (Rectified Linear Unit)</h4>
      <p>max(0, z). Tức là báo cáo tuyến tính với z > 0, chặn 0 với z ≤ 0.</p>
      <p><em>Ưu điểm:</em> Học cực nhanh, tránh vanishing gradient. Phổ biến nhất Deep Learning.</p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">calculate</span> 2.5. Perceptron có thể làm gì?</h3>
  
  <div class="features-grid">
    <div class="feature-card">
      <h4>Làm được: Xử lý Logic Tuyến Tính</h4>
      <p>Perceptron đơn lớp có thể giải được hoàn hảo mô phỏng các cổng logic AND, OR, NOT vì chúng có bộ Input có thể chia làm 2 nửa dễ dàng bằng một ranh giới thẳng.</p>
    </div>
    <div class="feature-card">
      <h4>Bất lực: Logic Phi Tuyến như XOR</h4>
      <p>XOR yêu cầu một đường cắt gấp gãy ranh giới. Không thể dùng một đường thẳng để chia lớp 2 nhóm chéo nhau 100% → Perceptron đơn lớp <strong>chắc chắn thất bại</strong>.</p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">shape_line</span> 2.6. Linear Separability</h3>
  
  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">warning</span></div>
    <div class="callout-content">
      <strong>Khả năng phân tách bằng đường thẳng</strong>
      <p>Perceptron thực chất đang vẽ một đường thẳng (hoặc mặt siêu phẳng với dữ liệu cao chiều) trong không gian để phân chia các lớp dữ liệu. Nếu dữ liệu không bị trộn lẫn và có thể chia bằng một đường thẳng phẳng lì (gọi là <code>Linear Separability</code>), Perceptron sẽ hoạt động. Ngược lại nó sẽ bế tắc.</p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">school</span> 2.7. Perceptron Learning Rule</h3>
  
  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Tính toán Output & Error</h4>
        <p>Tính Output hiện tại (y_pred), lấy kết quả mục tiêu trừ đi để ra chênh lệch sai số (<code>error = y_true - y_pred</code>).</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Cập nhật Tham số</h4>
        <p>Sửa lỗi Weights: <code>w_i = w_i + learning_rate × error × x_i</code>.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Hội Tụ (Convergence Theorem)</h4>
        <p>Frank Rosenblatt đã chứng minh bằng toán học: nếu dữ liệu khả thi tách bằng đường thẳng, cập nhật này sẽ hội tụ tự động và dừng lại ở đáp án chính xác sau số bước hữu hạn.</p>
      </div>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">layers</span> 2.8. Từ Perceptron đến Multi-Layer Perceptron</h3>
  <div class="image-showcase">
    <img src="/assets/ch21/neural_network_layers_1773152542781.png" alt="Sơ đồ Multi-Layer Perceptron với Hidden Layers" />
    <div class="image-caption">Từ một neuron đơn lẻ, ta xếp chúng thành các vỉ (Layer) tạo nên mạng Neural Network đồ sộ.</div>
  </div>

  <p>Giải pháp cho các giới hạn như cổng XOR là ghép thật nhiều Perceptron lại! Chẳng hạn như 1 perceptron diễn ra OR, 1 đại diện NAND, và đưa kết quả của 2 đứa đó cho 1 cục perceptron cuối làm cổng AND. Đó chính là <strong>Multi-Layer Perceptron (MLP)</strong>.</p>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">psychology</span></div>
    <h3>Từ khoá: LAYER ("Lớp ẩn", "Độ sâu")</h3>
    <p>Thuật ngữ <strong>"Deep"</strong> trong Deep Learning ám chỉ số lượng <strong>những tầng Hidden Layers trung gian này</strong>. Hidden Layer giúp "bẻ cong" không gian dữ liệu gốc ban đầu, biến một bài toán không thể chia bằng đường thẳng trong không gian cũ thành bài toán dễ dàng chia bằng đường thẳng trong một thứ nguyên cao/trừu tượng hơn. <br/><br/>Ví dụ nhận diện ảnh chó mèo: Layer 1 nhận diện góc cạnh, Layer 2 ghép cạnh thành hình khối tam giác/tròn, Layer 3 ghép tiếp thành Mắt/Mũi, Layer cuối sẽ phân loại đó là chó hay mèo.</p>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// PERCEPTRON - CÀI ĐẶT CHI TIẾT TỪNG DÒNG
// =====================================================

// =====================================================
// ĐỊNH NGHĨA CẤU TRÚC PERCEPTRON
// =====================================================
// Perceptron là một struct (cấu trúc) chứa:
// - weights: mảng các trọng số
// - bias: hệ số điều chỉnh

struct Perceptron {
    // weights: vector chứa các trọng số
    // Ví dụ: nếu có 2 inputs, weights có 2 phần tử
    // weights[0] cho input thứ 1, weights[1] cho input thứ 2...
    weights: Vec<f64>,

    // bias: hệ số điều chỉnh (một số duy nhất)
    // Cộng thêm vào tổng có trọng số trước khi qua activation
    bias: f64,
}

// =====================================================
// IMPLEMENT CÁC PHƯƠNG THỨC CỦA PERCEPTRON
// =====================================================

impl Perceptron {
    // === HÀM TẠO (CONSTRUCTOR) ===
    // Tạo một Perceptron mới với số lượng inputs cho trước
    fn new(num_inputs: usize) -> Self {
        // Tạo weights với giá trị ngẫu nhiên nhỏ
        // range: -1.0 đến 1.0
        // Tại sao ngẫu nhiên? Để bắt đầu ở trạng thái khác nhau
        // và tránh symmetry (tất cả weights giống nhau)
        let mut rng = rand_simple();
        let weights: Vec<f64> = (0..num_inputs)
            .map(|_| random_range(&mut rng, -1.0, 1.0))
            .collect();

        // Bias bắt đầu = 0
        let bias = 0.0;

        Perceptron { weights, bias }
    }

    // === HÀM KÍCH HOẠT (ACTIVATION FUNCTION) ===
    // Dùng Step Function (như Perceptron gốc của Rosenblatt)
    // Trả về 1 nếu z >= 0, 0 nếu z < 0
    fn activation(&self, z: f64) -> i32 {
        if z >= 0.0 {
            1   // Neuron "bắn" (activated)
        } else {
            0   // Neuron không bắn
        }
    }

    // === FORWARD PASS - TÍNH OUTPUT TỪ INPUT ===
    // Đây là "cuộc sống" của một Perceptron:
    // 1. Nhận inputs
    // 2. Nhân mỗi input với weight tương ứng
    // 3. Cộng tất cả lại, cộng bias
    // 4. Qua activation function
    // 5. Trả về output

    fn predict(&self, inputs: &[f64]) -> i32 {
        // Bước 1: Kiểm tra số lượng inputs
        // Phải khớp với số weights, nếu không là lỗi!
        assert_eq!(inputs.len(), self.weights.len());

        // Bước 2: Tính weighted sum (tổng có trọng số)
        // z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
        let mut z = self.bias;  // Bắt đầu với bias

        // Loop qua từng input và nhân với weight tương ứng
        for i in 0..inputs.len() {
            z += self.weights[i] * inputs[i];
        }

        // Bước 3: Qua activation function
        // Chuyển z thành output (0 hoặc 1)
        self.activation(z)
    }

    // === IN THÔNG TIN PERCEPTRON ===
    fn print_info(&self) {
        println!("=== THÔNG TIN PERCEPTRON ===");
        println!("Số inputs: {}", self.weights.len());
        print!("Weights: [");
        for (i, w) in self.weights.iter().enumerate() {
            if i > 0 { print(", "); }
            print!("{:.3}", w);
        }
        println!("]");
        println!("Bias: {:.3}", self.bias);
    }
}

// =====================================================
// HÀM PHỤ TRỢ: TẠO SỐ NGẪU NHIÊN (Đơn giản)
// =====================================================
// Vì Rust không có random mặc định, ta tự viết hàm đơn giản

struct Random {
    seed: u32,
}

fn rand_simple() -> Random {
    Random { seed: 12345 }
}

fn random_range(rng: &mut Random, min: f64, max: f64) -> f64 {
    // Linear Congruential Generator đơn giản
    rng.seed = rng.seed.wrapping_mul(1103515245).wrapping_add(12345);
    let range = max - min;
    let random_float = (rng.seed % 100000) as f64 / 100000.0;
    min + random_float * range
}

// =====================================================
// VÍ DỤ 1: PERCEPTRON CHO AND GATE
// =====================================================

fn train_and_gate() -> Perceptron {
    // AND Gate:
    // Input: [x1, x2], Output: 1 chỉ khi x1=1 VÀ x2=1

    // Tạo Perceptron với 2 inputs
    let mut p = Perceptron::new(2);

    // Đặt weights và bias để được AND:
    // z = x1*1 + x2*1 - 1.5
    // z >= 0 khi x1 + x2 >= 1.5 → chỉ (1,1)
    p.weights = vec![1.0, 1.0];
    p.bias = -1.5;

    p
}

// =====================================================
// VÍ DỤ 2: PERCEPTRON CHO OR GATE
// =====================================================

fn train_or_gate() -> Perceptron {
    // OR Gate:
    // Input: [x1, x2], Output: 1 khi x1=1 HOẶC x2=1

    let mut p = Perceptron::new(2);

    // z = x1*1 + x2*1 - 0.5
    // z >= 0 khi x1 + x2 >= 0.5 → trừ (0,0)
    p.weights = vec![1.0, 1.0];
    p.bias = -0.5;

    p
}

// =====================================================
// VÍ DỤ 3: PERCEPTRON CHO NOT GATE
// =====================================================

fn train_not_gate() -> Perceptron {
    // NOT Gate:
    // Input: [x], Output: NOT x (đảo ngược)

    let mut p = Perceptron::new(1);

    // z = x*(-1) + 0.5
    // z >= 0 khi x <= 0.5 → chỉ khi x=0
    p.weights = vec![-1.0];
    p.bias = 0.5;

    p
}

// =====================================================
// HÀM MAIN - CHẠY VÍ DỤ
// =====================================================

fn main() {
    println!("╔════════════════════════════════════════════════════════════════╗");
    println!("║        PERCEPTRON - ĐƠN VỊ CƠ BẢN CỦA NEURAL NETWORK           ║");
    println!("╚════════════════════════════════════════════════════════════════╝");

    // =====================================================
    // VÍ DỤ 1: AND GATE
    // =====================================================
    println!("\\n┌────────────────────────────────────────────────────────────────┐");
    println!("│  VÍ DỤ 1: AND GATE                                             │");
    println!("├────────────────────────────────────────────────────────────────┤");
    println!("│  Luật: Output = 1 khi TẤT CẢ inputs = 1                        │");
    println!("│                                                                │");
    println!("│  x₁  x₂  │  x₁+x₂  │  z=x1+x2-1.5  │  Output                   │");
    println!("│  ──── ───│─────────│───────────────│───────────                │");

    let and_p = train_and_gate();

    // Test tất cả 4 trường hợp
    let test_cases = vec![vec![0.0, 0.0], vec![0.0, 1.0],
                          vec![1.0, 0.0], vec![1.0, 1.0]];

    for inputs in &test_cases {
        let sum = inputs[0] + inputs[1];
        let z = sum + and_p.bias;
        let output = and_p.predict(inputs);

        println!("│  {:.0}   {:.0}   │   {:.0}    │    {:.1}        │     {}                    │",
                 inputs[0], inputs[1], sum, z, output);
    }
    println!("└────────────────────────────────────────────────────────────────┘");

    // =====================================================
    // VÍ DỤ 2: OR GATE
    // =====================================================
    println!("\\n┌────────────────────────────────────────────────────────────────┐");
    println!("│  VÍ DỤ 2: OR GATE                                              │");
    println!("├────────────────────────────────────────────────────────────────┤");
    println!("│  Luật: Output = 1 khi ÍT NHẤT một input = 1                     │");
    println!("│                                                                │");
    println!("│  x₁  x₂  │  x₁+x₂  │  z=x1+x2-0.5  │  Output                   │");
    println!("│  ──── ───│─────────│───────────────│───────────                │");

    let or_p = train_or_gate();

    for inputs in &test_cases {
        let sum = inputs[0] + inputs[1];
        let z = sum + or_p.bias;
        let output = or_p.predict(inputs);

        println!("│  {:.0}   {:.0}   │   {:.0}    │    {:.1}        │     {}                    │",
                 inputs[0], inputs[1], sum, z, output);
    }
    println!("└────────────────────────────────────────────────────────────────┘");

    // =====================================================
    // VÍ DỤ 3: NOT GATE
    // =====================================================
    println!("\\n┌────────────────────────────────────────────────────────────────┐");
    println!("│  VÍ DỤ 3: NOT GATE                                             │");
    println!("├────────────────────────────────────────────────────────────────┤");
    println!("│  Luật: Output = NOT(input)                                     │");
    println!("│                                                                │");
    println!("│   x   │  z=x*(-1)+0.5  │  Output                               │");
    println!("│  ─────│─────────────────│────────────                           │");

    let not_p = train_not_gate();

    let not_cases = vec![vec![0.0], vec![1.0]];

    for inputs in &not_cases {
        let z = inputs[0] * not_p.weights[0] + not_p.bias;
        let output = not_p.predict(inputs);

        println!("│   {:.0}   │      {:.1}         │     {}                             │",
                 inputs[0], z, output);
    }
    println!("└────────────────────────────────────────────────────────────────┘");

    // =====================================================
    // VÍ DỤ 4: KHÔNG THỂ LÀM ĐƯỢC XOR!
    // =====================================================
    println!("\\n┌────────────────────────────────────────────────────────────────┐");
    println!("│  VÍ DỤ 4: XOR GATE - KHÔNG THỂ!                               │");
    println!("├────────────────────────────────────────────────────────────────┤");
    println!("│                                                                │");
    println!("│  x₁  x₂  │  XOR Output                                         │");
    println!("│  ──── ───│────────────                                         │");
    println!("│   0   0  │     0                                                │");
    println!("│   0   1  │     1                                                │");
    println!("│   1   0  │     1                                                │");
    println!("│   1   1  │     0                                                │");
    println!("│                                                                │");
    println!("│  ⚠️  KHÔNG THỂ dùng MỘT đường thẳng để phân tách!              │");
    println!("│                                                                │");
    println!("│       x₂                                                    │");
    println!("│        │                                                      │");
    println!("│     1  │   ○ (output=1)                                        │");
    println!("│        │       ● (output=0)                                    │");
    println!("│     0  │   ● (output=0)    ○ (output=1)                       │");
    println!("│        └──────────────── x₁                                    │");
    println!("│           0              1                                     │");
    println!("│                                                                │");
    println!("│  → CẦN THÊM HIDDEN LAYERS! (sẽ học ở bài sau)                 │");
    println!("└────────────────────────────────────────────────────────────────┘");

    println!("\\n=== TỔNG KẾT ===");
    println!("✓ Perceptron có thể làm: AND, OR, NOT");
    println!("✗ Perceptron đơn lớp KHÔNG thể làm: XOR");
    println!("→ Cần Multiple Layers (nhiều lớp)!");
}`,
  },
];

// =====================================================
// Export Bài 1
// =====================================================

export const ch21_01: Chapter = {
  id: 'ch21_01',
  title: '21.1. Giới thiệu Neural Networks',
  introduction: `
    <h2>Neural Networks - Mạng Neural</h2>
    <p>Phần này giới thiệu về Neural Networks từ cơ bản nhất.</p>
    <ul>
      <li>Neural Network là gì?</li>
      <li>Perceptron - đơn vị cơ bản</li>
      <li>Vấn đề XOR và Hidden Layers</li>
      <li>Activation Functions</li>
    </ul>
  `,
  lessons: ch21_01_lessons,
};

export default ch21_01;
