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
      <h2>1. Neural Network là gì? Giải thích bằng ví dụ thực tế</h2>

      <h3>1.1. Định nghĩa đơn giản nhất</h3>
      <p>Hãy tưởng tượng bạn đang dạy một đứa trẻ nhận biết con mèo. Bạn chỉ cho nó xem nhiều hình ảnh con mèo và nói "Đây là mèo". Sau đó, khi gặp một con mèo chưa từng thấy, đứa trẻ vẫn nhận ra "À, đây cũng là mèo".</p>

      <p><strong>Neural Network hoạt động tương tự!</strong> Nó "học" từ nhiều ví dụ và sau đó có thể nhận ra những ví dụ mới chưa từng thấy.</p>

      <h3>1.2. So sánh giữa não bộ và máy tính</h3>
      <table class="comparison-table">
        <tr><th>Não bộ con người</th><th>Neural Network (máy tính)</th><th>Ý nghĩa</th></tr>
        <tr><td>Neuron (tế bào thần kinh)</td><td>Node / Neuron</td><td>Đơn vị tính toán cơ bản</td></tr>
        <tr><td>Synapse (khớp thần kinh)</td><td>Weight (trọng số)</td><td>Độ mạnh của kết nối giữa các neuron</td></tr>
        <tr><td>Tín hiệu điện</td><td>Số (giá trị)</td><td>Thông tin được truyền đi</td></tr>
        <tr><td>Khoảng 86 tỷ neurons</td><td>Từ vài đến hàng tỷ</td><td>Số lượng đơn vị tính toán</td></tr>
        <tr><td>Học trong vài giây</td><td>Cần hàng triệu phép tính</td><td>Tốc độ xử lý</td></tr>
      </table>

      <h3>1.3. Neural Network giải quyết những bài toán gì?</h3>
      <p>Neural Network có thể giải quyết rất nhiều loại bài toán, được chia thành 4 nhóm chính:</p>

      <h4>a) Classification (Phân loại)</h4>
      <pre><code>Bài toán: Đưa vào dữ liệu, dự đoán nó thuộc loại nào?

Ví dụ thực tế:
- Email → Spam hoặc Không phải Spam
- Ảnh → Con mèo hoặc Con chó hoặc Con chim
- Tin nhắn → Tích cực / Tiêu cực / Trung tính
- Chữ viết tay → Số 0, 1, 2, ..., 9</code></pre>

      <h4>b) Regression (Hồi quy)</h4>
      <pre><code>Bài toán: Dự đoán một giá trị số liên tục

Ví dụ thực tế:
- Diện tích nhà → Giá nhà (triệu đồng)
- Tuổi, sức khỏe → Tuổi thọ (năm)
- Quảng cáo → Doanh số (triệu đồng)
- Nhiệt độ, độ ẩm → Lượng mưa (mm)</code></pre>

      <h4>c) Generation (Sinh dữ liệu)</h4>
      <pre><code>Bài toán: Tạo ra dữ liệu mới dựa trên những gì đã học

Ví dụ thực tế:
- Văn bản: ChatGPT viết bài, dịch thuật
- Hình ảnh: Deepfake, AI vẽ tranh
- Âm nhạc: AI sáng tác nhạc
- Code: GitHub Copilot viết code</code></pre>

      <h4>d) Clustering (Gom cụm)</h4>
      <pre><code>Bài toán: Nhóm các dữ liệu giống nhau lại

Ví dụ thực tế:
- Khách hàng → Nhóm người mua sắm giống nhau
- Bài báo → Chủ đề tương tự
- Ảnh → Khuôn mặt giống nhau</code></pre>

      <h3>1.4. Lịch sử phát triển của Neural Networks</h3>
      <p>Neural Networks không phải là công nghệ mới, nó đã được nghiên cứu từ rất lâu:</p>

      <h4>1943 - Khởi nguồn</h4>
      <p><strong>Warren McCulloch và Walter Pitts</strong> đề xuất mô hình toán học đầu tiên của neuron. Họ chứng minh rằng một mạng các neuron nhân tạo có thể tính toán bất kỳ phép toán logic nào.</p>

      <h4>1958 - Perceptron ra đời</h4>
      <p><strong>Frank Rosenblatt</strong> (nhà tâm lý học người Mỹ) giới thiệu Perceptron - phiên bản đầu tiên của neuron nhân tạo có thể học được. Ông còn chế tạo một máy tính vật lý có tên "Mark I" để thực hiện thuật toán này.</p>

      <h4>1969 - Mùa đông AI</h4>
      <p><strong>Marvin Minsky và Seymour Papert</strong> chứng minh rằng Perceptron (1 lớp) không thể giải quyết được bài toán XOR. Điều này dẫn đến sự suy giảm nghiên cứu Neural Networks trong gần 20 năm!</p>

      <h4>1986 - Sự hồi sinh</h4>
      <p><strong>David Rumelhart, Geoffrey Hinton, và Ronald Williams</strong> phổ biến thuật toán Backpropagation (lan truyền ngược), cho phép Neural Networks có nhiều lớp học được. Đây là bước ngoặt quan trọng!</p>

      <h4>2012 - Kỷ nguyên Deep Learning</h4>
      <p><strong>AlexNet</strong> (của Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton) chiến thắng cuộc thi ImageNet với cách biệt lớn. Thuật ngữ "Deep Learning" (Học sâu) trở nên phổ biến.</p>

      <h4>2020 - Transformers</h4>
      <p><strong>Attention is All You Need</strong> (Vaswani et al., 2017) dẫn đến BERT, GPT, và các mô hình ngôn ngữ lớn. ChatGPT ra đời năm 2022.</p>

      <h3>1.5. Tại sao Neural Networks quan trọng đến vậy?</h3>
      <ol>
        <li><strong>Tự động học features</strong>: Thay vì phải viết code để trích xuất đặc điểm (features), Neural Networks tự học chúng từ dữ liệu thô.</li>
        <li><strong>Khả năng tổng quát hóa</strong>: Có thể áp dụng cho nhiều loại bài toán khác nhau với cùng một cách tiếp cận.</li>
        <li><strong>Scale vô hạn</strong>: Càng nhiều dữ liệu, càng nhiều parameters → càng chính xác (với điều kiện đủ compute).</li>
        <li><strong>Giải quyết bài toán phức tạp</strong>: Nhận dạng hình ảnh, xử lý ngôn ngữ tự nhiên, chơi game - những gì trước đây máy tính không làm được.</li>
      </ol>

      <h3>1.6. Các thành phần cơ bản của Neural Network</h3>
      <pre><code>Cấu trúc của một Neural Network điển hình:

         ┌─────────────────────────────────────┐
         │         INPUT LAYER                │  ← Lớp đầu vào (dữ liệu)
         │   (x₁)    (x₂)    (x₃)   ...      │
         └──────────┬──────────┬─────────────┘
                    │          │
         ┌──────────▼──────────▼─────────────┐
         │        HIDDEN LAYER 1              │  ← Lớp ẩn (xử lý trung gian)
         │   (h¹₁)  (h¹₂)  (h¹₃)  (h¹₄)    │
         └──────────┬──────────┬─────────────┘
                    │          │
         ┌──────────▼──────────▼─────────────┐
         │        HIDDEN LAYER 2              │  ← Lớp ẩn thứ 2
         │   (h²₁)  (h²₂)  (h²₃)            │
         └──────────┬──────────┬─────────────┘
                    │          │
         ┌──────────▼──────────▼─────────────┐
         │        OUTPUT LAYER               │  ← Lớp đầu ra (kết quả)
         │      (y₁)    (y₂)   ...          │
         └─────────────────────────────────────┘

Các mũi tên = weights (trọng số)
Mỗi lớp ẩn có thể có nhiều neurons</code></pre>

      <table class="comparison-table">
        <tr><th>Thành phần</th><th>Tiếng Việt</th><th>Giải thích</th></tr>
        <tr><td>Input Layer</td><td>Lớp đầu vào</td><td>Nhận dữ liệu đầu vào (ảnh, text, số...)</td></tr>
        <tr><td>Hidden Layer</td><td>Lớp ẩn</td><td>Xử lý trung gian, trích xuất features</td></tr>
        <tr><td>Output Layer</td><td>Lớp đầu ra</td><td>Đưa ra kết quả dự đoán</td></tr>
        <tr><td>Neuron/Node</td><td>Neuron</td><td>Đơn vị tính toán cơ bản</td></tr>
        <tr><td>Weight</td><td>Trọng số</td><td>Độ quan trọng của mỗi kết nối</td></tr>
        <tr><td>Bias</td><td>Hệ số điều chỉnh</td><td>Giúp model linh hoạt hơn</td></tr>
        <tr><td>Activation</td><td>Hàm kích hoạt</td><td>Thêm tính phi tuyến</td></tr>
      </table>
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
      <h2>2. Perceptron - Đơn vị cơ bản nhất của Neural Network</h2>

      <h3>2.1. Perceptron là gì?</h3>
      <p><strong>Perceptron</strong> là đơn vị tính toán cơ bản nhất của Neural Network, được phát minh bởi Frank Rosenblatt năm 1958. Nó là một mô hình toán học mô phỏng hoạt động của một neuron sinh học.</p>

      <h3>2.2. Cấu trúc của một Perceptron</h3>
      <pre><code>         ┌─────────────────────────────────────────┐
         │           PERCEPTRON                     │
         │                                         │
         │   Input x₁ ────► ┌──────────────┐       │
         │                 │  Weighted Sum │       │
         │   Input x₂ ────► │    (z = wx+b) │       │
         │                 └───────┬────────┘       │
         │                         │                │
         │                         ▼                │
         │                 ┌──────────────┐         │
         │                 │  Activation  │         │
         │                 │    f(z)      │         │
         │                 └───────┬────────┘         │
         │                         │                │
         │                         ▼                │
         │                    Output y              │
         │                                         │
         └─────────────────────────────────────────┘

Công thức toán học:
  z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b
  y = f(z)

Trong đó:
  - x₁, x₂, ..., xₙ: inputs (đầu vào)
  - w₁, w₂, ..., wₙ: weights (trọng số)
  - b: bias (hệ số điều chỉnh)
  - z: weighted sum (tổng có trọng số)
  - f(): activation function (hàm kích hoạt)
  - y: output (đầu ra)</code></pre>

      <h3>2.3. Giải thích từng thành phần</h3>

      <h4>a) Inputs (Đầu vào) - x</h4>
      <p>Inputs là dữ liệu đưa vào Perceptron. Có thể là:</p>
      <ul>
        <li>Pixels của một bức ảnh (mỗi pixel = 1 input)</li>
        <li>Các đặc điểm của một căn nhà (diện tích, số phòng...)</li>
        <li>Các từ trong một câu (sau khi đã mã hóa)</li>
      </ul>
      <p><strong>Quan trọng</strong>: Inputs phải là số (numerical). Nếu là text hay categorical, cần chuyển sang số trước!</p>

      <h4>b) Weights (Trọng số) - w</h4>
      <p>Weights quyết định mỗi input quan trọng như thế nào:</p>
      <ul>
        <li><strong>Weight lớn (dương)</strong>: Input này rất quan trọng, kéo output lên</li>
        <li><strong>Weight nhỏ (âm)</strong>: Input này làm giảm output</li>
        <li><strong>Weight gần 0</strong>: Input này không quan trọng, có thể bỏ qua</li>
      </ul>
      <p><strong>Ví dụ</strong>: Trong bài toán dự đoán giá nhà:</p>
      <pre><code>  - Diện tích có weight = 10 (quan trọng!)
  - Số tầng có weight = 5 (khá quan trọng)
  - Màu sơn có weight = 0.1 (không quan trọng lắm)</code></pre>

      <h4>c) Bias (Hệ số điều chỉnh) - b</h4>
      <p>Bias cho phép Perceptron linh hoạt hơn, không phụ thuộc hoàn toàn vào inputs:</p>
      <ul>
        <li><strong>Bias dương</strong>: Làm cho neuron dễ "bắn" (activate) hơn</li>
        <li><strong>Bias âm</strong>: Làm cho neuron khó "bắn" hơn</li>
        <li><strong>Bias = 0</strong>: Không có điều chỉnh</li>
      </ul>
      <p><strong>Ví dụ</strong>: Dù giá nhà phụ thuộc diện tích, luôn có giá tối thiểu (chi phí xây dựng cơ bản). Bias đại diện cho chi phí này!</p>

      <h4>d) Weighted Sum - z</h4>
      <p>z = w₁x₁ + w₂x₂ + ... + b</p>
      <p>Đây là tổng của tất cả inputs sau khi đã nhân với weights, cộng thêm bias. Nó là một con số duy nhất.</p>

      <h4>e) Activation Function - f()</h4>
      <p>Activation function biến đổi z thành output y. Tại sao cần nó?</p>
      <ol>
        <li><strong>Thêm phi tuyến</strong>: Không có activation, mạng chỉ học được quan hệ tuyến tính</li>
        <li><strong>Giới hạn output</strong>: Không cho output quá lớn</li>
        <li><strong>Quyết định neuron có "bắn" hay không</strong>: Giống neuron sinh học</li>
      </ol>

      <h3>2.4. Activation Functions phổ biến</h3>

      <h4>Step Function (Perceptron gốc)</h4>
      <pre><code>f(z) = 1 nếu z >= 0
      = 0 nếu z < 0

Đây là hàm kích hoạt đầu tiên của Rosenblatt.
Nhược điểm: Không có gradient (không thể học được!)</code></pre>

      <h4>Sigmoid</h4>
      <pre><code>        σ(z) = 1 / (1 + e^(-z))

Đặc điểm:
- Output luôn trong khoảng (0, 1)
- Có thể xem như xác suất
- Đạo hàm đẹp (phổ biến trong deep learning cũ)

Nhược điểm:
- Vanishing gradient (đạo hàm max = 0.25)</code></pre>

      <h4>ReLU (Rectified Linear Unit)</h4>
      <pre><code>        ReLU(z) = max(0, z)

Đặc điểm:
- Nếu z > 0: output = z (đường thẳng)
- Nếu z <= 0: output = 0
- Tính toán cực nhanh (chỉ so sánh với 0)
- Đạo hàm = 1 khi z > 0

Ưu điểm:
- Tránh vanishing gradient
- Học nhanh hơn sigmoid nhiều
- Đây là activation PHỔ BIẾN NHẤT hiện nay!</code></pre>

      <h3>2.5. Perceptron có thể làm gì?</h3>

      <h4>Có thể: AND, OR, NOT</h4>
      <pre><code>AND Gate:
x₁  x₂  |  y
--------------
0   0   |  0
0   1   |  0
1   0   |  0
1   1   |  1

→ Perceptron với w₁=1, w₂=1, b=-1.5
→ z = x₁ + x₂ - 1.5
→ z >= 0 khi x₁ + x₂ >= 1.5 → chỉ khi (1,1)</code></pre>

      <h4>KHÔNG thể: XOR</h4>
      <pre><code>XOR Gate:
x₁  x₂  |  y
--------------
0   0   |  0
0   1   |  1
1   0   |  1
1   1   |  0

→ KHÔNG thể vẽ một đường thẳng phân tách!
→ Đây là lý do cần HIDDEN LAYERS!</code></pre>
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
