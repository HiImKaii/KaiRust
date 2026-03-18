// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 5: GRADIENT DESCENT & OPTIMIZERS - LUẬT TIẾN HÓA
//
// Mục tiêu học thuật:
// 1. Bản chất Đạo hàm (Derivatives) và Gradient.
// 2. Thuật toán thả dốc BGD, SGD, Mini-batch SGD.
// 3. Tiến hóa Optimizer: Momentum -> RMSprop -> Adam.
// 4. Kỹ xảo: Learning Rate Scheduling & Gradient Clipping.
//
// Nội dung bổ sung (Phần 1 - Lesson 1):
// - Giải thích rõ ràng các thuật ngữ chuyên ngành
// - Liên kết mạch lạc giữa các khái niệm
// - Thêm hình ảnh minh họa trực quan
// =====================================================

import { Lesson, Chapter } from '../../courses';

const ch21_05_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: KHÁI NIỆM GRADIENT - QUẢ TÁO RƠI LÊN TRỜI
  // ==========================================================
  {
    id: 'ch21_05_01',
    title: '1. Gradient - Từ Vật Lý Đến Machine Learning',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Gradient - Kỳ Tích Của Dấu Trừ</h2>

  <!-- MỞ ĐẦU -->
  <div class="story-intro mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-r">
    <p class="italic text-amber-900">
      Trong Machine Learning, mục tiêu chính là tìm các tham số của mô hình sao cho hàm mất mát (Loss) đạt giá trị nhỏ nhất.
    </p>
    <p class="mt-2 text-amber-800">
      Để giải quyết bài toán tối ưu này, hệ thống sử dụng <strong>Gradient Descent</strong> - một thuật toán lặp dựa trên đạo hàm để tìm cực tiểu của hàm số.
    </p>
  </div>

  <!-- 1.1. ĐẠO HÀM VÀ GRADIENT LÀ GÌ? -->
  <h3>1.1. Đạo hàm (Derivative) - Độ Dốc Tại Một Điểm</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa Đạo hàm</span>
    <p>Nếu bạn đang đứng trên một ngọn núi và muốn biết <em>"Nếu tôi bước về phía trước 1 mét, tôi sẽ cao lên hay thấp đi bao nhiêu?"</em> - câu trả lời chính là <strong>đạo hàm</strong>.</p>
    <p>Trong toán học, đạo hàm của hàm số f(x) tại điểm x cho biết <strong>tốc độ thay đổi</strong> của f khi x thay đổi.</p>
    <p class="mt-2"><strong>Thuật ngữ chuyên ngành:</strong></p>
    <ul class="list-disc pl-5 mt-1 text-sm">
      <li><strong>Derivative (Đạo hàm):</strong> Đại lượng toán học đo lường mức độ thay đổi của một hàm số tại một điểm cụ thể.</li>
      <li><strong>Slope (Độ dốc):</strong> Hệ số góc của tiếp tuyến tại điểm đó - cho biết hàm đang tăng (+) hay giảm (-).</li>
      <li><strong>Tangent (Tiếp tuyến):</strong> Đường thẳng tiếp xúc với đồ thị tại một điểm, có hướng trùng với hướng biến thiên cục bộ của hàm.</li>
    </ul>
  </div>

  <div class="formula-block my-4 p-4 bg-blue-50 border-blue-300">
    <h4 class="font-bold text-blue-900 mb-2">Công thức đạo hàm:</h4>
    <p class="text-lg font-mono">$$f'(x) = \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$</p>
    <p class="text-sm text-blue-700 mt-2">
      Trực giác: Đạo hàm = "Nếu nhích x lên một chút, y thay đổi bao nhiêu?"
    </p>
    <p class="text-xs text-blue-600 mt-2">
      <strong>Giải thích:</strong> h → 0 có nghĩa là chúng ta đang xem xét sự thay đổi ở mức RẤT NHỎ (infinitesimal), gần như tại một điểm duy nhất.
    </p>
  </div>

  <div class="features-grid my-4">
    <div class="feature-card">
      <h4 class="font-bold text-lg mb-2">Ví dụ trực quan: f(x) = x²</h4>
      <p class="text-sm text-gray-600 mb-3">Hàm số f(x) = x² có dạng hình parabol (chỏm chảo ngược) với đáy tại x = 0. Hãy xem đạo hàm thay đổi như thế nào tại các vị trí khác nhau:</p>
      <table class="comparison-table text-sm">
        <thead>
          <tr><th>Vị trí x</th><th>f(x) = x²</th><th>Đạo hàm f'(x) = 2x</th><th>Giải thích</th></tr>
        </thead>
        <tbody>
          <tr><td>x = -3</td><td>9</td><td>-6</td><td>Đang ở sườn trái → đi xuống</td></tr>
          <tr><td>x = -2</td><td>4</td><td>-4</td><td>Đi xuống, nhưng chậm hơn</td></tr>
          <tr><td>x = -1</td><td>1</td><td>-2</td><td>Vẫn đi xuống</td></tr>
          <tr><td><strong>x = 0</strong></td><td><strong>0</strong></td><td><strong>0</strong></td><td><strong>Đáy! Không lên không xuống</strong></td></tr>
          <tr><td>x = 1</td><td>1</td><td>+2</td><td>Sườn phải → đi lên</td></tr>
          <tr><td>x = 2</td><td>4</td><td>+4</td><td>Đi lên nhanh hơn</td></tr>
          <tr><td>x = 3</td><td>9</td><td>+6</td><td>Sườn dốc nhất</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- HÌNH ẢNH MINH HỌA ĐẠO HÀM -->
  <div class="image-showcase">
    <img src="/images/ch21/gradient_descent_3d_1773152807591.png" alt="Gradient Descent Visualization" />
    <div class="image-caption">Gradient Descent: Từ đỉnh xuống cực tiểu</div>
  </div>

  <!-- CHUYỂN TIẾP: Từ đạo hàm sang gradient -->
  <div class="my-4 p-3 bg-gray-50 border-l-4 border-gray-400 rounded">
    <p class="text-sm"><strong>Từ đạo hàm đến gradient:</strong> Phần trên hệ thống đã học về đạo hàm với hàm 1 biến. Tuy nhiên, Neural Network có hàng triệu weights - tức là hàng triệu biến. Vậy làm sao tính đạo hàm cho tất cả? Câu trả lời là <strong>Gradient</strong> - vector chứa tất cả đạo hàm riêng phần!</p>
  </div>

  <!-- 1.2. GRADIENT - TẬP HỢP TẤT CẢ ĐẠO HÀM -->
  <h3>1.2. Gradient - Vector Của Mọi Độ Dốc</h3>

  <div class="callout callout-warning my-4">
    <span class="callout-title">Sự khác biệt quan trọng</span>
    <ul class="mt-2">
      <li><strong>Đạo hàm (Derivative):</strong> Áp dụng cho hàm 1 biến f(x) → được 1 số</li>
      <li><strong>Gradient (∇):</strong> Áp dụng cho hàm nhiều biến f(x₁, x₂, ..., xₙ) → được một <strong>vector</strong></li>
    </ul>
  </div>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa Gradient</span>
    <p>Hãy tưởng tượng bạn đang đứng trên một ngọn núi phức tạp có hàng triệu chiều (giống như không gian weights trong Neural Network). Tại một điểm, bạn có thể đi theo hàng triệu hướng khác nhau. Gradient tại điểm đó là một <strong>vector chứa tất cả các đạo hàm riêng phần</strong>, cho biết <em>"Nếu đi theo hướng nào thì sẽ leo lên nhanh nhất?"</em></p>
    <p class="mt-2"><strong>Thuật ngữ chuyên ngành:</strong></p>
    <ul class="list-disc pl-5 mt-1 text-sm">
      <li><strong>Partial Derivative (Đạo hàm riêng phần):</strong> Đạo hàm của hàm nhiều biến theo một biến, khi các biến khác được giữ cố định. Ký hiệu: ∂f/∂x₁</li>
      <li><strong>Gradient Vector (Vector Gradient):</strong> Vector chứa tất cả đạo hàm riêng phần của hàm số theo các biến.</li>
      <li><strong>Nabla (∇):</strong> Ký hiệu toán học hình tam giác ngược, đọc là "del" hoặc "nabla", dùng để ký hiệu toán tử gradient.</li>
      <li><strong>Direction of Steepest Ascent (Hướng dốc nhất):</strong> Hướng mà theo đó hàm số tăng nhanh nhất. Gradient luôn chỉ hướng này.</li>
      <li><strong>Dimension (Chiều):</strong> Số lượng biến độc lập trong hàm số. Neural Network với 1 triệu weights có không gian 1 triệu chiều!</li>
    </ul>
  </div>

  <div class="formula-block my-4 p-4 bg-purple-50 border-purple-300">
    <h4 class="font-bold text-purple-900 mb-2">Công thức Gradient:</h4>
    <p class="text-lg font-mono">$$\\nabla L = [\\frac{\\partial L}{\\partial w_1}, \\frac{\\partial L}{\\partial w_2}, ..., \\frac{\\partial L}{\\partial w_n}]$$</p>
    <p class="text-sm text-purple-700 mt-2">
      Trong đó ∇ (nabla) là ký hiệu toán học cho gradient. Với Neural Network có hàng triệu weights, gradient là một vector hàng triệu chiều!
    </p>
  </div>

  <!-- VÍ DỤ CHI TIẾT VỀ ĐẠO HÀM RIÊNG PHẦN -->
  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Ví dụ chi tiết: Đạo hàm riêng phần trong Neural Network</h4>
    <p class="text-sm mb-3">Giả sử hệ thống có hàm mất mát đơn giản với 2 weights:</p>
    <p class="font-mono text-center my-2">$$L(w_1, w_2) = w_1^2 + 2w_2^2$$</p>
    <p class="text-sm mb-3">Hãy tính đạo hàm riêng phần tại điểm (w₁ = 1, w₂ = 2):</p>

    <div class="space-y-2 text-sm">
      <div class="p-2 bg-white rounded">
        <p class="font-bold">Tính ∂L/∂w₁ (theo w₁, giữ w₂ cố định):</p>
        <p class="font-mono">∂L/∂w₁ = 2w₁ = 2 × 1 = 2</p>
        <p class="text-xs text-gray-600">Ý nghĩa: Nếu tăng w₁ lên một chút trong khi giữ w₂ không đổi, Loss sẽ tăng gấp đôi (hệ số 2).</p>
      </div>

      <div class="p-2 bg-white rounded">
        <p class="font-bold">Tính ∂L/∂w₂ (theo w₂, giữ w₁ cố định):</p>
        <p class="font-mono">∂L/∂w₂ = 4w₂ = 4 × 2 = 8</p>
        <p class="text-xs text-gray-600">Ý nghĩa: Nếu tăng w₂ lên một chút trong khi giữ w₁ không đổi, Loss sẽ tăng gấp 8 lần! w₂ có ảnh hưởng mạnh hơn nhiều.</p>
      </div>

      <div class="p-2 bg-purple-100 rounded">
        <p class="font-bold">Gradient tại điểm (1, 2):</p>
        <p class="font-mono">∇L = [∂L/∂w₁, ∂L/∂w₂] = [2, 8]</p>
        <p class="text-xs text-purple-700">Vector này cho biết: "Hướng leo lên nhanh nhất là tăng cả w₁ và w₂, nhưng tăng w₂ sẽ làm Loss tăng nhanh hơn gấp 4 lần so với tăng w₁!"</p>
      </div>
    </div>
  </div>

  <!-- Ý NGHĨA TRONG NEURAL NETWORK -->
  <div class="my-4 p-4 bg-indigo-50 border border-indigo-300 rounded">
    <h4 class="font-bold text-indigo-900 mb-3">Ý nghĩa của Gradient trong Neural Network</h4>
    <p class="text-sm mb-3">Trong Neural Network, Gradient có vai trò cực kỳ quan trọng:</p>

    <div class="space-y-3 text-sm">
      <div>
        <p class="font-bold">1. Backpropagation (Lan truyền ngược):</p>
        <p class="text-indigo-800">Gradient được tính từ output ngược về input, cho biết mỗi weight ảnh hưởng bao nhiêu đến Loss. Quá trình này giống như "đi ngược dòng nước" từ cửa sông đến nguồn.</p>
      </div>

      <div>
        <p class="font-bold">2. Weight Update (Cập nhật trọng số):</p>
        <p class="text-indigo-800">Sau khi có gradient, hệ thống biết cần điều chỉnh mỗi weight bao nhiêu để giảm Loss. Weight nào có gradient lớn (tuyệt đối) → ảnh hưởng mạnh → cần điều chỉnh nhiều.</p>
      </div>

      <div>
        <p class="font-bold">3. Vanishing Gradient (Biến mất gradient):</p>
        <p class="text-indigo-800">Khi mạng quá sâu, gradient có thể nhân qua nhiều lớp và "co lại" gần 0 → các lớp đầu không được cập nhật → mô hình không học được. Đây là vấn đề cơ bản của RNN và mạng sâu thuần túy.</p>
      </div>

      <div>
        <p class="font-bold">4. Exploding Gradient (Nổ gradient):</p>
        <p class="text-indigo-800">Ngược lại với vanishing, gradient có thể <strong>tăng vô hạn</strong> (10^100) khi nhân qua nhiều lớp → weights trở thành NaN → mô hình sụp đổ hoàn toàn.</p>
      </div>
    </div>
  </div>

  <!-- SO SÁNH VỚI ĐẠO HÀM THƯỜNG -->
  <div class="callout callout-info my-4">
    <span class="callout-title">Tại sao cần Gradient thay vì đạo hàm thường?</span>
    <ul class="mt-2 text-sm">
      <li>Neural Network có <strong>HÀNG TRIỆU weights</strong>, không phải 1 biến</li>
      <li>Mỗi weight đều cần được cập nhật dựa trên ảnh hưởng của nó đến Loss</li>
      <li>Gradient tổng hợp tất cả thông tin này thành một vector → hệ thống biết cần điều chỉnh <strong>từng weight</strong> bao nhiêu</li>
      <li>Không có gradient, hệ thống như "mù" trong không gian hàng triệu chiều!</li>
    </ul>
  </div>

  <!-- CHUYỂN TIẾP: Từ gradient sang gradient descent -->
  <div class="my-4 p-3 bg-gray-50 border-l-4 border-gray-400 rounded">
    <p class="text-sm"><strong>Từ gradient đến Gradient Descent:</strong> Ta đã biết gradient chỉ hướng "dốc lên" - tức làm Loss tăng. Nhưng hệ thống muốn GIẢM Loss! Làm sao đây? Câu trả lời nằm ở <strong>dấu trừ</strong> trong công thức!</p>
  </div>

  <!-- 1.3. MŨI TÊN NGƯỢC - GRADIENT DESCENT -->
  <h3>1.3. Gradient Descent - Kỳ Tích Của Dấu Trừ</h3>

  <div class="callout callout-danger mt-4">
    <span class="callout-title">Câu hỏi triệu đô: Tại sao Gradient lại "nguy hiểm"?</span>
    <p class="mt-2">
      Về mặt toán học thuần túy, vector Gradient ∇L <strong>luôn luôn chỉ hướng dốc lên</strong> - tức là hướng làm cho Loss TĂNG lên chứ không phải giảm!
    </p>
    <p class="mt-2 font-bold text-red-800">
      Nếu bạn để mô hình tự nhiên cập nhật: W = W + ∇L, thì Loss sẽ <strong>phi mã lên trời</strong> và mô hình AI sẽ nổ tung trong vài miligiây!
    </p>
    <p class="mt-2 text-red-700"><strong>Đây là lỗi phổ biến nhất của người mới học Machine Learning!</strong></p>
  </div>

  <div class="definition-block my-4">
    <span class="definition-term">Giải pháp - Gradient DESCENT (Thả dốc)</span>
    <p>Vì chúng ta muốn tìm <strong>cực tiểu</strong> (nơi Loss nhỏ nhất), chúng ta phải <strong>gắn dấu trừ</strong> vào trước Gradient để đảo ngược hướng:</p>
  </div>

  <div class="formula-block my-4 p-4 bg-red-50 border-red-300 text-center">
    <p class="text-xl font-bold text-red-900 mb-2">Công thức Gradient Descent</p>
    <p class="text-2xl font-mono my-4">$$W_{new} = W_{old} - \\ehệ thống \\times \\nabla L$$</p>
    <div class="text-sm text-red-700 space-y-1">
      <p>Trong đó:</p>
      <ul class="inline-block text-left">
        <li>η (eta) = <strong>Learning Rate</strong> - độ dài bước đi</li>
        <li>∇L = Gradient của hàm Loss</li>
        <li>Dấu <strong>-</strong> (trừ) = đảo ngược hướng từ "lên" thành "xuống"</li>
      </ul>
    </div>
  </div>

  <!-- GIẢI THÍCH CHI TIẾT CÔNG THỨC -->
  <div class="my-4 p-4 bg-blue-50 border border-blue-300 rounded">
    <h4 class="font-bold text-blue-900 mb-3">Giải thích từng thành phần trong công thức</h4>

    <div class="space-y-3 text-sm">
      <div class="p-2 bg-white rounded">
        <p class="font-bold">1. W (Weight - Trọng số):</p>
        <p>Là các tham số của Neural Network cần tìm. Mỗi neural network có thể có hàng triệu weights: w₁, w₂, ..., wₙ</p>
      </div>

      <div class="p-2 bg-white rounded">
        <p class="font-bold">2. ∇L (Gradient của Loss):</p>
        <p>Vector chỉ hướng "dốc lên" - hướng làm Loss TĂNG. Đây là "la bàn" cho hệ thống biết hướng nào làm mô hình kém hơn.</p>
      </div>

      <div class="p-2 bg-white rounded">
        <p class="font-bold">3. η (Learning Rate - Tốc độ học):</p>
        <p>Quyết định "bước đi" bao xa. Giống như khi leo núi:
        <br>• Bước nhỏ = cẩn thận nhưng chậm
        <br>• Bước lớn = nhanh nhưng dễ vấp ngã</p>
      </div>

      <div class="p-2 bg-white rounded">
        <p class="font-bold">4. Dấu trừ (-):</p>
        <p>"Kỳ tích" quan trọng nhất! Đảo ngược hướng từ "lên đỉnh" thành "xuống thung lũng". Không có dấu này, mô hình sẽ đi LÊN thay vì XUỐNG!</p>
      </div>
    </div>
  </div>

  <!-- VÍ DỤ TÍNH TOÁN CỤ THỂ -->
  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Ví dụ tính toán cụ thể</h4>
    <p class="text-sm mb-3">Giả sử hệ thống có một Neural Network đơn giản với 1 weight w, và hàm mất mát L = w²</p>

    <div class="space-y-3 text-sm">
      <p class="font-bold">Tính gradient: ∂L/∂w = 2w</p>

      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="bg-yellow-100">
              <th class="border p-2">Bước</th>
              <th class="border p-2">w hiện tại</th>
              <th class="border p-2">∇L = 2w</th>
              <th class="border p-2">w mới (η=0.1)</th>
              <th class="border p-2">Loss mới</th>
              <th class="border p-2">Giảm?</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="border p-2">0</td><td class="border p-2">5.0</td><td class="border p-2">10</td><td class="border p-2">5 - 0.1×10 = 4.0</td><td class="border p-2">16</td><td class="border p-2">✓ 25→16</td></tr>
            <tr><td class="border p-2">1</td><td class="border p-2">4.0</td><td class="border p-2">8</td><td class="border p-2">4 - 0.1×8 = 3.2</td><td class="border p-2">10.24</td><td class="border p-2">✓ 16→10.24</td></tr>
            <tr><td class="border p-2">2</td><td class="border p-2">3.2</td><td class="border p-2">6.4</td><td class="border p-2">3.2 - 0.1×6.4 = 2.56</td><td class="border p-2">6.55</td><td class="border p-2">✓</td></tr>
            <tr><td class="border p-2">3</td><td class="border p-2">2.56</td><td class="border p-2">5.12</td><td class="border p-2">2.05</td><td class="border p-2">4.20</td><td class="border p-2">✓</td></tr>
            <tr><td class="border p-2">4</td><td class="border p-2">2.05</td><td class="border p-2">4.10</td><td class="border p-2">1.64</td><td class="border p-2">2.69</td><td class="border p-2">✓</td></tr>
            <tr><td class="border p-2">...</td><td class="border p-2">...</td><td class="border p-2">...</td><td class="border p-2">...</td><td class="border p-2">→0</td><td class="border p-2">Hội tụ</td></tr>
          </tbody>
        </table>
      </div>

      <p class="mt-2">Nhận xét: Sau mỗi bước, weight w tiến gần về 0 (cực tiểu), và Loss giảm dần từ 25 → 0!</p>
    </div>
  </div>

  <!-- Ý NGHĨA HÌNH HỌC -->
  <div class="callout callout-info my-4">
    <span class="callout-title">Ý nghĩa hình học: Leo núi trong sương mù</span>
    <p class="mt-2">Hãy tưởng tượng bạn đang leo núi trong sương mù dày:</p>
    <ul class="mt-2">
      <li>Bạn <strong>không nhìn thấy</strong> đỉnh núi hay thung lũng ở đâu</li>
      <li>Bạn chỉ cảm nhận được <strong>độ dốc dưới chân</strong> (gradient)</li>
      <li>Nếu đang dốc lên → bạn đi <strong>NGƯỢC</strong> lại hướng đó để xuống núi</li>
      <li>Learning rate quyết định bạn đi <strong>bao xa</strong> trong mỗi bước</li>
    </ul>
    <p class="mt-2 font-bold">Gradient Descent chính là thuật toán "leo núi trong sương mù" cho mô hình tính!</p>
  </div>

  <!-- CÁC ĐIỀU KIỆN DỪNG -->
  <div class="my-4 p-4 bg-gray-50 border border-gray-300 rounded">
    <h4 class="font-bold text-gray-900 mb-3">Khi nào Gradient Descent DỪNG?</h4>

    <div class="space-y-2 text-sm">
      <p><strong>Gradient Descent là thuật toán lặp (iterative)</strong> - nó tiếp tục cho đến khi một trong các điều kiện sau được thỏa:</p>

      <div class="p-2 bg-white rounded">
        <p class="font-bold">1. Đạt số bước tối đa (max epochs):</p>
        <p class="text-gray-600">Đặt trước giới hạn số vòng lặp, ví dụ 1000 epochs.</p>
      </div>

      <div class="p-2 bg-white rounded">
        <p class="font-bold">2. Loss đủ nhỏ (convergence):</p>
        <p class="text-gray-600">Khi Loss < 0.001 hoặc ngưỡng nào đó do bạn đặt.</p>
      </div>

      <div class="p-2 bg-white rounded">
        <p class="font-bold">3. Gradient đủ nhỏ:</p>
        <p class="text-gray-600">Khi ||∇L|| < ε (ví dụ 0.0001) → có nghĩa là đã gần đến "đáy" rồi!</p>
      </div>

      <div class="p-2 bg-white rounded">
        <p class="font-bold">4. Loss không giảm thêm (early stopping):</p>
        <p class="text-gray-600">Khi Loss giảm rất ít qua nhiều bước liên tiếp.</p>
      </div>
    </div>
  </div>

  <!-- CÁC LOẠI CỰC TIỂU -->
  <div class="callout callout-warning my-4">
    <span class="callout-title">Cực tiểu cục bộ vs Cực tiểu toàn cục</span>
    <ul class="mt-2">
      <li><strong>Global Minimum (Cực tiểu toàn cục):</strong> Điểm thấp nhất trên toàn bộ đồ thị - mục tiêu lý tưởng</li>
      <li><strong>Local Minimum (Cực tiểu cục bộ):</strong> Điểm thấp nhất trong một vùng lân cận - có thể "mắc kẹt" ở đây</li>
      <li>Gradient Descent có thể <strong>mắc kẹt</strong> ở local minimum thay vì đến global minimum!</li>
      <li><strong>Giải pháp:</strong> Thử nhiều điểm bắt đầu khác nhau, hoặc dùng Momentum</li>
    </ul>
  </div>

  <!-- THUẬT NGỮ BỔ SUNG -->
  <div class="my-4 p-4 bg-green-50 border border-green-300 rounded">
    <h4 class="font-bold text-green-900 mb-3">Thuật ngữ bổ sung</h4>
    <ul class="list-disc pl-5 text-sm space-y-1">
      <li><strong>Convergence (Hội tụ):</strong> Khi thuật toán dần tiến đến một điểm ổn định, Loss không giảm đáng kể nữa.</li>
      <li><strong>Local Minimum:</strong> Cực tiểu trong một vùng cục bộ, không phải điểm thấp nhất toàn cục.</li>
      <li><strong>Global Minimum:</strong> Điểm thấp nhất tuyệt đối của hàm mất mát.</li>
      <li><strong>Saddle Point (Điểm yên ngựa):</strong> Điểm mà gradient bằng 0 nhưng không phải cực tiểu (giống yên ngựa - lên 1 hướng, xuống hướng khác).</li>
      <li><strong>Plateau (Vùng cao nguyên):</strong> Vùng mà gradient gần như bằng 0 → mô hình học rất chậm.</li>
    </ul>
  </div>


  <!-- CHỨNG MINH TOÁN HỌC -->
  <div class="my-6 p-5 bg-slate-50 border-l-4 border-slate-500">
    <h4 class="font-bold text-slate-900 mb-4">Chứng minh: Tại sao đi ngược gradient sẽ giảm Loss?</h4>
    <p class="text-sm text-slate-700 mb-4">Phần này giải thích tại sao công thức Gradient Descent hoạt động về mặt toán học. Nếu bạn muốn hiểu sâu hơn, hãy đọc kỹ từng bước.</p>

    <div class="space-y-4 text-sm">
      <!-- Bước 1: Định nghĩa đạo hàm -->
      <div>
        <p class="font-bold text-blue-800">Bước 1: Định nghĩa đạo hàm (Derivative)</p>
        <p class="mt-2">Theo <strong>định nghĩa đạo hàm bằng giới hạn</strong>:</p>
        <div class="formula-block my-3 p-3 bg-white border border-blue-300">
          <p class="font-mono text-base text-center">$$f'(x) = \\lim_{\\Delhệ thống x \\to 0} \\frac{f(x + \\Delhệ thống x) - f(x)}{\\Delhệ thống x}$$</p>
        </div>
        <p>Đạo hàm $f'(x)$ cho biết <strong>tốc độ thay đổi</strong> của hàm số tại điểm $x$.</p>
      </div>

      <!-- Bước 2: Xấp xỉ -->
      <div>
        <p class="font-bold text-blue-800">Bước 2: Xấp xỉ với bước nhỏ</p>
        <p class="mt-2">Với $\\Delhệ thống x$ nhỏ, hệ thống có thể xấp xỉ:</p>
        <div class="formula-block my-3 p-3 bg-white border border-blue-300">
          <p class="font-mono text-base text-center">$$\\Delhệ thống f = f(x + \\Delhệ thống x) - f(x) \\approx f'(x) \\cdot \\Delhệ thống x$$</p>
        </div>
        <p>Trong đó:</p>
        <ul class="list-disc pl-5 mt-1">
          <li>$\\Delhệ thống f$ = độ thay đổi của hàm số</li>
          <li>$\\Delhệ thống x$ = độ dài bước di chuyển</li>
          <li>$f'(x)$ = đạo hàm tại điểm $x$</li>
        </ul>
      </div>

      <!-- Bước 3: Phân tích dấu -->
      <div>
        <p class="font-bold text-blue-800">Bước 3: Phân tích dấu của $\\Delhệ thống f$</p>
        <p class="mt-2">Ta có: $\\Delhệ thống f \\approx f'(x) \\cdot \\Delhệ thống x$</p>
        <p class="mt-2">Để hàm số <strong>giảm</strong> ($\\Delhệ thống f < 0$), cần:</p>
        <div class="formula-block my-3 p-3 bg-white border border-blue-300">
          <p class="font-mono text-base text-center">$$f'(x) \\cdot \\Delhệ thống x < 0$$</p>
        </div>
        <p>Tức là <strong>$f'(x)$ và $\\Delhệ thống x$ phải trái dấu nhau</strong>.</p>
      </div>

      <!-- Bước 4: Hai trường hợp -->
      <div>
        <p class="font-bold text-blue-800">Bước 4: Hai trường hợp cụ thể</p>
        <div class="mt-2 p-3 bg-yellow-50 border border-yellow-300 rounded">
          <p class="font-bold">Trường hợp 1: $f'(x) > 0$ (đang leo lên dốc)</p>
          <p>Đạo hàm dương → hàm đang tăng tại điểm này.</p>
          <p>Để giảm: cần $\\Delhệ thống x < 0$ → <strong>đi về bên trái</strong>.</p>
        </div>
        <div class="mt-2 p-3 bg-blue-50 border border-blue-300 rounded">
          <p class="font-bold">Trường hợp 2: $f'(x) < 0$ (đang xuống dốc)</p>
          <p>Đạo hàm âm → hàm đang giảm tại điểm này.</p>
          <p>Để giảm: cần $\\Delhệ thống x > 0$ → <strong>đi về bên phải</strong>.</p>
        </div>
      </div>

      <!-- Bước 5: Kết luận -->
      <div>
        <p class="font-bold text-green-800">Bước 5: Kết luận</p>
        <div class="mt-2 p-3 bg-green-50 border border-green-300 rounded">
          <p class="font-bold">Quy tắc:</p>
          <div class="formula-block my-3 p-3 bg-white border border-green-300">
            <p class="font-mono text-lg text-center">$$\\Delhệ thống x = -\\ehệ thống \\cdot f'(x)$$</p>
          </div>
          <p>với $\\ehệ thống > 0$ là learning rate.</p>
          <p class="mt-2">Khi đó:</p>
          <div class="formula-block my-3 p-3 bg-white border border-green-300">
            <p class="font-mono text-base text-center">$$\\Delhệ thống f \\approx f'(x) \\cdot (-\\ehệ thống \\cdot f'(x)) = -\\ehệ thống \\cdot [f'(x)]^2 \\leq 0$$</p>
          </div>
          <p class="font-bold">Vì $[f'(x)]^2 \\geq 0$ và $\\ehệ thống > 0$, nên $\\Delhệ thống f \\leq 0$:</p>
          <p><strong>Hàm số LUÔN giảm</strong> khi di chuyển ngược hướng đạo hàm!</p>
        </div>
      </div>

      <!-- Trường hợp đặc biệt -->
      <div class="mt-4">
        <p class="font-bold text-orange-800">Trường hợp đặc biệt:</p>
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li>Khi $f'(x) = 0$: Đạo hàm bằng 0 → Đã đến <strong>điểm dừng</strong> (cực tiểu hoặc yên ngựa)</li>
          <li>Khi $\\eta$ quá lớn: $\\Delhệ thống x$ quá lớn → có thể "nhảy qua" điểm cực tiểu → <strong>divergence</strong></li>
        </ul>
        <p class="text-xs text-orange-700 mt-2"><strong>Thuật ngữ:</strong> <strong>Divergence</strong> (Phân kỳ) là hiện tượng mô hình không hội tụ mà ngược lại, Loss tăng dần đến vô cùng.</p>
      </div>
    </div>
  </div>

  <!-- CHUYỂN TIẾP: Từ gradient descent sang learning rate -->
  <div class="my-4 p-3 bg-gray-50 border-l-4 border-gray-400 rounded">
    <p class="text-sm"><strong>Công thức đã có, nhưng cần thêm một yếu tố:</strong> Chúng hệ thống đã biết <strong>W_new = W_old - η × ∇L</strong>. Nhưng <strong>η (Learning Rate)</strong> - độ lớn bước đi - quyết định TA ĐI BAO XA trong mỗi bước. Nếu bước quá lớn → nhảy qua đích; bước quá nhỏ → đi quá chậm!</p>
  </div>

  <!-- 1.4. LEARNING RATE -->
  <h3>1.4. Learning Rate (η) - Độ Lớn Bước</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa Learning Rate</span>
    <p><strong>Learning Rate (LR)</strong> là siêu tham số (hyperparameter) quyết định độ lớn của bước cập nhật trong mỗi vòng lặp Gradient Descent. Nó kiểm soát mức độ thay đổi của weights trong mỗi lần cập nhật.</p>
    <p class="mt-2"><strong>Thuật ngữ chuyên ngành:</strong></p>
    <ul class="list-disc pl-5 mt-1 text-sm">
      <li><strong>Hyperparameter (Siêu tham số):</strong> Tham số được đặt TRƯỚC khi huấn luyện, không được học từ dữ liệu.</li>
      <li><strong>Epoch:</strong> Một vòng lặp huấn luyện qua toàn bộ tập dữ liệu.</li>
      <li><strong>Iteration/Batch step:</strong> Một lần cập nhật weights (có thể trong 1 epoch có nhiều iteration).</li>
    </ul>
  </div>


  <div class="concept-grid my-4">
    <div class="concept-card">
      <h4>Learning Rate nhỏ (η = 0.001)</h4>
      <p><strong>Ưu điểm:</strong> Hội tụ ổn định, ít bị miss cực tiểu</p>
      <p><strong>Nhược điểm:</strong> Rất chậm, có thể mắc kẹt ở cực tiểu địa phương</p>
    </div>
    <div class="concept-card">
      <h4>Learning Rate vừa (η = 0.1)</h4>
      <p><strong>Ưu điểm:</strong> Cân bằng giữa tốc độ và độ ổn định</p>
      <p><strong>Nhược điểm:</strong> Cần điều chỉnh thủ công</p>
    </div>
    <div class="concept-card">
      <h4>Learning Rate lớn (η = 1.0)</h4>
      <p><strong>Ưu điểm:</strong> Nhanh chóng vượt qua cực tiểu địa phương</p>
      <p><strong>Nhược điểm:</strong> Có thể vượt qua điểm cực tiểu, hoặc divergence</p>
    </div>
  </div>


  <!-- TÓM TẮT -->
  <div class="key-takeaway mt-8">
    <h3>Tóm tắt bài 1: Gradient và Gradient Descent</h3>
    <ul class="space-y-2 mt-4">
      <li><strong>Đạo hàm (Derivative)</strong> = độ dốc tại một điểm - cho biết hàm đang tăng (+) hay giảm (-)</li>
      <li><strong>Gradient (∇L)</strong> = vector chứa tất cả đạo hàm riêng phần, luôn chỉ hướng <strong>dốc lên</strong> (làm Loss tăng)</li>
      <li><strong>Gradient Descent</strong> = dùng dấu trừ để đảo ngược hướng, đi từ đỉnh về cực tiểu: $W_{new} = W_{old} - \\ehệ thống \\times \\nabla L$</li>
      <li><strong>Learning Rate (η)</strong> = độ dài bước đi - siêu tham số quan trọng cần điều chỉnh</li>
    </ul>
  </div>

  <div class="callout callout-tip mt-6">
    <span class="callout-title">Chuẩn bị cho bài tiếp theo</span>
    <p>Trong bài tiếp theo, chúng ta sẽ học cách áp dụng Gradient Descent vào thực tế với 3 phiên bản: <strong>Batch GD</strong>, <strong>Stochastic GD</strong>, và <strong>Mini-batch GD</strong>.</p>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// VÍ DỤ MINH HỌA: GRADIENT DESCENT TRONG RUST
// Bài toán: Tìm cực tiểu của hàm L = w^2
// =====================================================

fn loss(w: f64) -> f64 { w * w }
fn gradient(w: f64) -> f64 { 2.0 * w }

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║     GRADIENT DESCENT: TÌM CỰC TIỂU                          ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // KHÁM PHÁ 1: Gradient luôn chỉ hướng LÊN
    println!("\\n🔍 KHÁM PHÁ 1: Gradient luôn chỉ hướng LÊN!");
    let positions = [-4.0, -2.0, -1.0, 0.0, 1.0, 2.0, 4.0];
    println!("\\n  Vị trí w  │  Loss L=w²  │  Gradient 2w  │  Hướng đi");
    println!("─────────────┼─────────────┼──────────────┼─────────────────");
    for &w in &positions {
        let l = loss(w);
        let grad = gradient(w);
        let direction = if grad > 0.0 { "LÊN (tăng)" }
                       else if grad < 0.0 { "XUỐNG (giảm)" }
                       else { "ĐÁY!" };
        println!("  {:>8.1}  │  {:>8.1}  │   {:>8.1}   │  {}", w, l, grad, direction);
    }

    // KHÁM PHÁ 2: CỘNG Gradient = NỔ
    println!("\\n\\n🔍 KHÁM PHÁ 2: CỘNG Gradient → MÔ HÌNH NỔ!");
    let mut w_explodes = 5.0;
    let learning_rate = 1.0;
    println!("\\n  Bước │   w cũ   │  Gradient  │   w mới  │   Loss");
    for step in 1..=6 {
        let grad = gradient(w_explodes);
        w_explodes = w_explodes + learning_rate * grad;
        let l = loss(w_explodes);
        println!("   {}    │  {:>7.2}  │   {:>7.2}  │  {:>7.2} │  {:>7.2}",
                 step, w_explodes - learning_rate * grad, grad, w_explodes, l);
        if l > 1000.0 { println!("\\n💥 BOOM! Loss vượt quá 1000 - Mô hình NỔ!"); break; }
    }

    // KHÁM PHÁ 3: TRỪ Gradient = HỘI TỤ
    println!("\\n\\n🔍 KHÁM PHÁ 3: TRỪ Gradient = Tìm cực tiểu! ✅");
    let mut w_converge = 5.0;
    let learning_rate_good = 0.1;
    println!("\\n  Bước │   w mới  │   Loss");
    println!("────────┼──────────┼───────────");
    for step in 1..=15 {
        let grad = gradient(w_converge);
        w_converge = w_converge - learning_rate_good * grad;
        let l = loss(w_converge);
        println!("   {}    │  {:>7.3}  │  {:>7.4}", step, w_converge, l);
        if l < 0.001 { println!("\\n🎉 HOÀN THÀNH! Đã tìm đến cực tiểu!"); break; }
    }

    println!("\\n╔══════════════════════════════════════════════════════════════════════╗");
    println!("║  1. Gradient LUÔN chỉ hướng dốc LÊN                                ║");
    println!("║  2. Để GIẢM loss → dùng dấu TRỪ                                   ║");
    println!("║  3. Công thức: W_new = W_old - η × ∇L                              ║");
    println!("║  4. Learning Rate quá lớn → NỔ                                      ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");
}
`
  },

  // ==========================================================
  // LESSON 2: BA CẤP ĐỘ TU TIÊN CỦA GRADIENT DESCENT
  // ==========================================================
  {
    id: 'ch21_05_02',
    title: '2. Ba Cấp Độ Tu Tiên Của Gradient Descent',
    duration: '50 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Các Phiên Bản Của Gradient Descent</h2>

  <!-- MỞ ĐẦU -->
  <div class="story-intro mb-6 p-4 bg-gradient-to-r from-slate-50 to-gray-50 border-l-4 border-slate-400 rounded-r">
    <p class="italic text-slate-900">
      Ở bài trước, chúng ta đã học về Gradient Descent cơ bản với công thức <strong>W_new = W_old - η × ∇L</strong>. Tuy nhiên, đó mới chỉ là phiên bản đơn giản nhất.
    </p>
    <p class="mt-2 text-slate-800">
      Trong thực tế, với tập dữ liệu có hàng triệu mẫu, hệ thống cần các phiên bản tối ưu hơn để tăng tốc độ huấn luyện. Có ba cách chính để tính gradient: sử dụng toàn bộ dữ liệu (Batch), sử dụng từng mẫu một (Stochastic), hoặc sử dụng một mini-batch. Mỗi phương pháp có ưu và nhược điểm riêng về tốc độ tính toán và chất lượng hội tụ.
    </p>
  </div>

  <!-- 2.1. BATCH GRADIENT DESCENT -->
  <h3>2.1. Batch Gradient Descent (BGD)</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa</span>
    <p><strong>Batch Gradient Descent</strong> (còn gọi là Vanilla Gradient Descent) là thuật toán tính gradient trên <em>toàn bộ</em> tập dữ liệu huấn luyện trước khi cập nhật weights một lần. Nói cách khác, trong mỗi epoch (một lần duyệt qua toàn bộ dữ liệu), hệ thống chỉ cập nhật weights một lần duy nhất sau khi đã tính toán gradient cho tất cả n mẫu dữ liệu.</p>
  </div>

  <div class="formula-block my-4 p-4 bg-blue-50 border-blue-300">
    <h4 class="font-bold text-blue-900 mb-2">Công thức Batch GD:</h4>
    <p class="text-lg font-mono">$\\nabla L = \\frac{1}{n} \\times \\sum_{i=1}^{n} \\nabla L(x_i, y_i)$</p>
    <p class="text-lg font-mono mt-2">$W_{new} = W_{old} - \\ehệ thống \\times \\nabla L$</p>
  </div>

  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Giải thích chi tiết</h4>
    <div class="space-y-2 text-sm">
      <p>Trong công thức trên:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>n</strong>: Số lượng mẫu dữ liệu trong tập huấn luyện</li>
        <li><strong>∇L(x_i, y_i)</strong>: Gradient của hàm mất mát tính được từ mẫu dữ liệu thứ i</li>
        <li><strong>∑</strong>: Tổng tất cả các gradient riêng lẻ</li>
        <li><strong>1/n</strong>: Trung bình cộng của tất cả gradient</li>
      </ul>
      <p class="mt-2">Quy trình hoạt động: (1) Lấy toàn bộ n mẫu dữ liệu (2) Tính gradient cho từng mẫu (3) Lấy trung bình cộng (4) Cập nhật weights một lần duy nhất.</p>
    </div>
  </div>

  <div class="features-grid my-4">
    <div class="feature-card">
      <h4 class="font-bold mb-2">Ưu điểm của Batch GD:</h4>
      <p><strong>Đường đi mượt mà:</strong> Vì tính gradient trên toàn bộ dữ liệu nên đướng đi rất "trơn", ít bị dao động. Gradient trung bình từ nhiều mẫu giúp giảm nhiễu.</p>
      <p class="mt-2"><strong>Chắc chắn hội tụ:</strong> Với điều kiện learning rate phù hợp, Batch GD hội tụ về cực tiểu toàn cục (global minimum) một cách đảm bảo về mặt toán học.</p>
      <p class="mt-2"><strong>Dễ hiểu, dễ cài đặt:</strong> Đây là phiên bản cơ bản nhất của Gradient Descent, phù hợp để học và hiểu bản chất thuật toán.</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold mb-2">Nhược điểm của Batch GD:</h4>
      <p><strong>Rất chậm với dữ liệu lớn:</strong> Nếu tập dữ liệu có 1 triệu mẫu, mỗi epoch phải tính 1 triệu gradient trước khi cập nhật một lần!</p>
      <p class="mt-2"><strong>Tốn bộ nhớ:</strong> Cần load toàn bộ dữ liệu vào bộ nhớ để tính gradient cùng lúc. Với tập dữ liệu cực lớn, có thể không đủ RAM.</p>
      <p class="mt-2"><strong>Không thể huấn luyện online:</strong> Không thể thêm dữ liệu mới trong quá trình huấn luyện mà phải huấn luyện lại từ đầu.</p>
    </div>
  </div>

  <div class="callout callout-warning my-4">
    <span class="callout-title">Khi nào dùng Batch GD?</span>
    <p class="mt-2">Batch GD phù hợp khi: (1) Tập dữ liệu nhỏ (vài nghìn mẫu trở xuống) (2) Cần độ chính xác cao và ổn định (3) Dùng để nghiên cứu, thử nghiệm thuật toán cơ bản.</p>
  </div>

  <!-- 2.2. STOCHASTIC GD -->
  <h3>2.2. Stochastic Gradient Descent (SGD)</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa</span>
    <p><strong>Stochastic Gradient Descent (SGD)</strong> - hay còn gọi là "Gradient Descent ngẫu nhiên" - là phiên bản mà hệ thống tính gradient và cập nhật weights cho <em>từng mẫu dữ liệu một một</em>, ngay lập tức sau khi xử lý mỗi mẫu. Từ "stochastic" có nghĩa là "ngẫu nhiên", phản ánh việc hệ thống không duyệt tuần tự mà thường xáo trộn (shuffle) dữ liệu trước khi huấn luyện.</p>
  </div>

  <div class="formula-block my-4 p-4 bg-green-50 border-green-300">
    <h4 class="font-bold text-green-900 mb-2">Công thức SGD:</h4>
    <p class="text-lg font-mono">$\\nabla L_i = \\nabla L(x_i, y_i)$</p>
    <p class="text-lg font-mono mt-2">$W_{new} = W_{old} - \\ehệ thống \\times \\nabla L_i$</p>
    <p class="text-sm text-green-700 mt-2">Trong đó i là chỉ số của mẫu dữ liệu hiện tại đang được xử lý.</p>
  </div>

  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Giải thích chi tiết</h4>
    <div class="space-y-2 text-sm">
      <p>SGD khác với Batch GD ở chỗ: thay vì đợi xử lý hết tất cả n mẫu rồi mới cập nhật, SGD cập nhật ngay sau mỗi mẫu. Điều này có nghĩa là trong một epoch, hệ thống sẽ có n lần cập nhật weights thay vì chỉ 1 lần!</p>
      <p class="mt-2">Quy trình hoạt động: (1) Xáo trộn ngẫu nhiên n mẫu dữ liệu (2) Với mỗi mẫu: tính gradient của mẫu đó → cập nhật weights ngay lập tức → chuyển sang mẫu tiếp theo.</p>
    </div>
  </div>

  <div class="features-grid my-4">
    <div class="feature-card">
      <h4 class="font-bold mb-2">Ưu điểm của SGD:</h4>
      <p><strong>Cực kỳ nhanh:</strong> Mỗi mẫu chỉ cần tính một gradient nên tốc độ rất nhanh. Trong thời gian Batch GD xử lý 1 epoch, SGD có thể xử lý được hàng chục甚至 hàng trăm epochs.</p>
      <p class="mt-2"><strong>Có thể thoát local minima:</strong> Vì gradient của từng mẫu có thể "nhiễu" (không chính xác bằng gradient thực), SGD tạo ra dao động giúp "nhảy" ra khỏi các cực tiểu cục bộ.</p>
      <p class="mt-2"><strong>Huấn luyện online:</strong> Có thể thêm dữ liệu mới liên tục mà không cần huấn luyện lại từ đầu.</p>
      <p class="mt-2"><strong>Tiết kiệm bộ nhớ:</strong> Chỉ cần load một mẫu dữ liệu vào bộ nhớ tại mỗi thời điểm.</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold mb-2">Nhược điểm của SGD:</h4>
      <p><strong>Đường đi rất zigzag:</strong> Vì gradient của một mẫu đơn lẻ có thể rất khác so với gradient thực (trung bình của toàn bộ dữ liệu), nên đường đi "zic-zac" rất mạnh, không mượt.</p>
      <p class="mt-2"><strong>Không ổn định:</strong> Loss có thể tăng giảm thất thường, khó dự đoán. Đôi khi có thể "bật lại" sau khi đã tiến gần đích.</p>
      <p class="mt-2"><strong>Khó hội tụ chính xác:</strong> Vì dao động quá lớn, SGD thường "dao động" quanh cực tiểu thay vì hội tụ chính xác vào điểm đó.</p>
    </div>
  </div>

  <div class="callout callout-info my-4">
    <span class="callout-title">Tại sao SGD lại "ngẫu nhiên"?</span>
    <p class="mt-2">Tên gọi "ngẫu nhiên" (stochastic) đến từ việc hệ thống sử dụng gradient của một mẫu đơn lẻ như một "ước lượng nhiễu" (noisy estimate) của gradient thực. Ước lượng này có giá trị kỳ vọng đúng (expected value) bằng gradient thực, nhưng có phương sai (variance) lớn - chính vì vậy đường đi không mượt.</p>
  </div>

  <!-- 2.3. MINI-BATCH GD -->
  <h3>2.3. Mini-Batch Gradient Descent - Chuẩn Vàng Của Thực Tế</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Định nghĩa</span>
    <p><strong>Mini-Batch Gradient Descent</strong> là phiên bản kết hợp giữa Batch GD và SGD. Thay vì dùng toàn bộ dữ liệu (Batch) hoặc chỉ một mẫu (SGD), hệ thống chia dữ liệu thành các "batch" (lô) nhỏ, mỗi batch thường có kích thước từ 32, 64, 128 đến 256 mẫu. Gradient được tính trên mỗi batch và weights được cập nhật sau mỗi batch.</p>
  </div>

  <div class="formula-block my-4 p-4 bg-purple-50 border-purple-300">
    <h4 class="font-bold text-purple-900 mb-2">Công thức Mini-Batch GD:</h4>
    <p class="text-lg font-mono">$\\nabla L_{batch} = \\frac{1}{B} \\times \\sum_{i=1}^{B} \\nabla L(x_i, y_i)$</p>
    <p class="text-lg font-mono mt-2">$W_{new} = W_{old} - \\ehệ thống \\times \\nabla L_{batch}$</p>
    <p class="text-sm text-purple-700 mt-2">Trong đó B là kích thước batch (batch size), thường là 32, 64, 128 hoặc 256.</p>
  </div>

  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Ví dụ cụ thể</h4>
    <div class="space-y-2 text-sm">
      <p>Giả sử hệ thống có tập dữ liệu 10,000 mẫu và batch size = 32:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Mỗi epoch sẽ có: 10,000 / 32 = 312 batches (1 batch dư 16 mẫu)</li>
        <li>Mỗi epoch sẽ có 312 lần cập nhật weights</li>
        <li>Batch đầu tiên: mẫu 1-32 → tính gradient trung bình → cập nhật weights</li>
        <li>Batch thứ hai: mẫu 33-64 → tính gradient trung bình → cập nhật weights</li>
        <li>Cứ tiếp tục cho đến hết dữ liệu</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-success my-4">
    <span class="callout-title">Tại sao Mini-Batch là "chuẩn vàng"?</span>
    <ul class="mt-2 space-y-2">
      <li><strong>Tốc độ:</strong> Sử dụng được vectorization (tính toán nhiều phép tính cùng lúc trên GPU). Batch size càng lớn, hiệu năng tính toán trên GPU càng tốt.</li>
      <li><strong>Ổn định:</strong> Gradient trung bình từ 32-256 mẫu đủ "mượt" để đường đi không zigzag quá mạnh, nhưng vẫn đủ "nhiễu" để thoát local minima.</li>
      <li><strong>Hiệu quả bộ nhớ:</strong> Không cần load toàn bộ dữ liệu (như Batch GD), chỉ cần load một batch tại mỗi thời điểm.</li>
      <li><strong>Hội tụ tốt:</strong> Kích thước batch đủ lớn để gradient ước lượng gần với gradient thực, nhưng đủ nhỏ để tạo nhiễu giúp thoát local minima.</li>
    </ul>
  </div>

  <div class="my-4 p-4 bg-blue-50 border border-blue-300 rounded">
    <h4 class="font-bold text-blue-900 mb-3">Cách chọn Batch Size</h4>
    <div class="space-y-2 text-sm">
      <p>Batch size là một siêu tham số (hyperparameter) quan trọng cần điều chỉnh:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>32:</strong> Thường là lựa chọn mặc định tốt, đủ nhỏ để nhiễu giúp thoát local minima.</li>
        <li><strong>64-128:</strong> Phổ biến nhất trong thực tế, cân bằng giữa tốc độ và ổn định.</li>
        <li><strong>256:</strong> Tốc độ nhanh nhất trên GPU, nhưng nhiễu ít hơn.</li>
        <li>Lưu ý: Batch size quá lớn (> 2048) có thể làm giảm chất lượng model do nhiễu quá ít.</li>
      </ul>
    </div>
  </div>

  <!-- SO SÁNH -->
  <h3>2.4. So Sánh Chi Tiết</h3>

  <div class="image-showcase">
    <img src="/images/ch21/gd_methods_comparison.png" alt="So sánh Batch vs SGD vs Mini-Batch" />
    <div class="image-caption">So sánh 3 phương pháp: Batch GD, SGD, Mini-Batch</div>
  </div>

  <table class="comparison-table my-4">
    <thead>
      <tr><th>Tiêu chí</th><th>Batch GD</th><th>SGD</th><th>Mini-Batch GD</th></tr>
    </thead>
    <tbody>
      <tr><td>Kích thước batch</td><td>n (toàn bộ)</td><td>1</td><td>32-256</td></tr>
      <tr><td>Tốc độ</td><td>Rất chậm</td><td>Nhanh nhất</td><td>Nhanh</td></tr>
      <tr><td>Ổn định</td><td>Rất mượt</td><td>Zigzag</td><td>Cân bằng</td></tr>
      <tr><td>Thực tế</td><td>Hiếm khi dùng</td><td>Hiếm khi dùng</td><td><strong>CHUẨN VÀNG</strong></td></tr>
    </tbody>
  </table>

  <!-- TÓM TẮT -->
  <div class="key-takeaway mt-8">
    <h3>Tóm tắt bài 2</h3>
    <ul class="space-y-2">
      <li><strong>Batch GD:</strong> Tính toàn bộ rồi mới cập nhật - chậm nhưng ổn định</li>
      <li><strong>SGD:</strong> Từng mẫu rồi cập nhật ngay - nhanh nhưng zigzag</li>
      <li><strong>Mini-Batch GD:</strong> Kết hợp cả hai - ĐÂY LÀ CHUẨN TRONG THỰC TẾ!</li>
    </ul>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// SO SÁNH BA PHƯƠNG PHÁP GRADIENT DESCENT
// =====================================================

fn loss(x: f64) -> f64 { x * x }
fn gradient(x: f64) -> f64 { 2.0 * x }

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║     SO SÁNH BA PHƯƠNG PHÁP GRADIENT DESCENT                      ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    let data: Vec<f64> = vec![-4.0, -3.0, -2.0, -1.0, 1.0, 2.0, 3.0, 4.0];
    let learning_rate = 0.1;

    // BATCH GD
    println!("\\n\\n1. BATCH GD: Tính tất cả rồi mới đi");
    let mut x_batch = 4.0;
    for epoch in 1..=5 {
        let sum_grad: f64 = data.iter().map(|&xi| gradient(xi)).sum();
        let avg_grad = sum_grad / data.len() as f64;
        x_batch = x_batch - learning_rate * avg_grad;
        println!("  Epoch {}: x = {:.3}, Loss = {:.4}", epoch, x_batch, loss(x_batch));
    }

    // SGD
    println!("\\n\\n2. SGD: Từng người một, đi ngay");
    let mut x_sgd = 4.0;
    for epoch in 1..=3 {
        for &xi in &dahệ thống {
            let grad = gradient(x_sgd);
            x_sgd = x_sgd - learning_rate * grad;
        }
        println!("  Epoch {}: x = {:.3}, Loss = {:.4}", epoch, x_sgd, loss(x_sgd));
    }

    // MINI-BATCH GD
    println!("\\n\\n3. MINI-BATCH GD: Gom nhóm 4 mẫu");
    let mut x_mini = 4.0;
    let batch_size = 4;
    for epoch in 1..=5 {
        for i in (0..data.len()).step_by(batch_size) {
            let batch = &data[i..i+batch_size.min(data.len()-i)];
            let avg_grad: f64 = batch.iter().map(|&xi| gradient(x_mini)).sum::<f64>() / batch.len() as f64;
            x_mini = x_mini - learning_rate * avg_grad;
        }
        println!("  Epoch {}: x = {:.3}, Loss = {:.4}", epoch, x_mini, loss(x_mini));
    }

    println!("\\n╔══════════════════════════════════════════════════════════════════════╗");
    println!("║  Batch GD: Chuẩn, mượt nhưng CHẬM                                    ║");
    println!("║  SGD: Nhanh nhưng ZIGZAG                                            ║");
    println!("║  Mini-Batch: ✅ CÂN BẰNG - Chuẩn vàng trong thực tế!              ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");
}
`
  },

  // ==========================================================
  // LESSON 3: MOMENTUM, RMSPROP & ADAM
  // ==========================================================
  {
    id: 'ch21_05_03',
    title: '3. Momentum, RMSprop & Adam - Tiến Hóa Vượt Bậc',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Tiến Hóa Optimizer</h2>

  <!-- MỞ ĐẦU - KẾT NỐI TỪ BÀI TRƯỚC -->
  <div class="story-intro mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 rounded-r">
    <p class="italic text-indigo-900">
      Ở bài trước, chúng ta đã học về ba phiên bản của Gradient Descent: Batch GD, SGD, và Mini-Batch GD. Tuy nhiên, dù dùng phiên bản nào, SGD cơ bản vẫn có một <strong>nhược điểm cố hữu</strong>: dao động mạnh theo hướng vuông góc với độ dốc chính, dẫn đến hội tụ chậm.
    </p>
    <p class="mt-2 text-indigo-800">
      Để khắc phục nhược điểm này, các thuật toán tối ưu nâng cao như <strong>Momentum</strong>, <strong>RMSprop</strong>, và <strong>Adam</strong> ra đời. Đây là những "tiến hóa" giúp Gradient Descent hoạt động hiệu quả và mạnh mẽ hơn trong Deep Learning hiện đại.
    </p>
  </div>

  <!-- MỞ ĐẦU -->
  <div class="story-intro mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 rounded-r">
    <p class="italic text-indigo-900">
      SGD cơ bản có nhược điểm: dao động mạnh theo hướng vuông góc với độ dốc chính, dẫn đến hội tụ chậm.
    </p>
    <p class="mt-2 text-indigo-800">
      Các thuật toán tối ưu nâng cao như <strong>Momentum</strong>, <strong>RMSprop</strong>, và <strong>Adam</strong> ra đời để khắc phục nhược điểm này, giúp hội tụ nhanh hơn và ổn định hơn.
    </p>
  </div>

  <!-- VẤN ĐỀ CỦA SGD CƠ BẢN -->
  <div class="my-4 p-4 bg-red-50 border border-red-300 rounded">
    <h4 class="font-bold text-red-900 mb-3">Vấn đề của SGD cơ bản</h4>
    <div class="space-y-2 text-sm">
      <p>Hãy tưởng tượng bạn đang ở trên một ngọn núi có hình dạng kỳ lạ:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Một chiều (hướng xuống đáy) rất dốc</li>
        <li>Chiều vuông góc (hướng ngang) chỉ hơi dốc</li>
      </ul>
      <p class="mt-2">Khi sử dụng SGD cơ bản:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Theo chiều dốc chính: di chuyển nhanh xuống đáy</li>
        <li>Theo chiều ngang: dao động trái-phải liên tục (zigzag)</li>
      </ul>
      <p class="mt-2">Kết quả: Thay vì đi thẳng xuống đáy, bạn "đi vòng vòng" rất mất thời gian! Đây gọi là <strong>hiệu ứng ravine</strong> (hiệu ứng rãnh hẹp).</p>
    </div>
  </div>

  <!-- 3.1. MOMENTUM -->
  <h3>3.1. Momentum - Thêm "Đà" Để Vượt Qua Rãnh</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Ý tưởng</span>
    <p><strong>Momentum</strong> (hay còn gọi là Classical Momentum hoặc Polyak Momentum) lấy cảm hứng từ vật lý: khi một quả bóng lăn xuống dốc, nó tích lũy <strong>đà (momentum)</strong> - càng lăn nhanh hơn theo thời gian. Tương tự, Momentum trong Gradient Descent tích lũy "đà" từ các bước trước để di chuyển nhanh hơn theo hướng đúng.</p>
  </div>

  <div class="formula-block my-4 p-4 bg-blue-50 border-blue-300">
    <h4 class="font-bold text-blue-900 mb-2">Công thức Momentum:</h4>
    <p class="text-lg font-mono">$V_t = \\behệ thống \\times V_{t-1} + \\nabla L$</p>
    <p class="text-lg font-mono mt-2">$W_{new} = W_{old} - \\ehệ thống \\times V_t$</p>
    <p class="text-sm text-blue-700 mt-2">β (beta) = 0.9: Hệ số momentum, quyết định mức độ "đà" được giữ lại từ bước trước</p>
  </div>

  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Giải thích chi tiết từng bước</h4>
    <div class="space-y-2 text-sm">
      <p><strong>Bước 1: Cập nhật Velocity (Vận tốc)</strong></p>
      <p class="font-mono">V_t = β × V_{t-1} + ∇L</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>V_{t-1}: Vận tốc ở bước trước</li>
        <li>∇L: Gradient hiện tại</li>
        <li>β = 0.9: Giữ lại 90% vận tốc từ bước trước + thêm 100% gradient hiện tại</li>
      </ul>

      <p class="mt-3"><strong>Bước 2: Cập nhật Weights</strong></p>
      <p class="font-mono">W_new = W_old - η × V_t</p>
      <p>Thay vì cập nhật theo gradient, hệ thống cập nhật theo vận tốc đã tích lũy!</p>

      <p class="mt-3"><strong>Ví dụ số:</strong></p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Bước 1: V_1 = 0.9 × 0 + 1 = 1</li>
        <li>Bước 2: V_2 = 0.9 × 1 + 1 = 1.9</li>
        <li>Bước 3: V_3 = 0.9 × 1.9 + 1 = 2.71</li>
        <li>Bước 4: V_4 = 0.9 × 2.71 + 1 = 3.44</li>
      </ul>
      <p class="mt-2">→ Vận tốc tăng dần = "đà" ngày càng lớn!</p>
    </div>
  </div>

  <div class="callout callout-info my-4">
    <span class="callout-title">Cơ chế hoạt động</span>
    <p class="mt-2"><strong>Tại sao Momentum giúp giảm dao động?</strong></p>
    <ul class="mt-2 space-y-1">
      <li>Các dao động ngang (trái-phải) ở các bước trước có xu hướng triệt tiêu lẫn nhau</li>
      <li>Chuyển động xuống dốc (hướng chính) được tích lũy và cộng dồn</li>
      <li>Kết quả: Đi thẳng xuống nhanh hơn, ít zigzag hơn!</li>
    </ul>
    <p class="mt-2"><strong>Hiệu ứng "quá đà":</strong> Cũng giống như xe chạy quá nhanh sẽ khó dừng lại đúng điểm, Momentum có thể "lướt qua" cực tiểu. Đây là đánh đổi cần lưu ý.</p>
  </div>

  <div class="features-grid my-4">
    <div class="feature-card">
      <h4 class="font-bold mb-2">Ưu điểm:</h4>
      <p><strong>Giảm dao động:</strong> Đường đi mượt hơn, ít zigzag hơn SGD</p>
      <p class="mt-2"><strong>Hội tụ nhanh hơn:</strong> Nhờ tích lũy đà, đặc biệt trên các rãnh hẹp dài</p>
      <p class="mt-2"><strong>Thoát local minima tốt hơn:</strong> Đà giúp vượt qua các cực tiểu nông</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold mb-2">Nhược điểm:</h4>
      <p><strong>Có thể "lướt qua" đích:</strong> Đà quá lớn khiến hệ thống "nhảy qua" cực tiểu</p>
      <p class="mt-2"><strong>Cần điều chỉnh thêm tham số:</strong> Thêm β cần tuning</p>
      <p class="mt-2"><strong>Không điều chỉnh được learning rate:</strong> Vẫn dùng chung η cho tất cả weights</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/ch21_05_momentum.png" alt="Momentum Visualization" />
    <div class="image-caption">Momentum: Tích lũy đà để tăng tốc độ hội tụ</div>
  </div>

  <!-- 3.2. RMSPROP -->
  <h3>3.2. RMSprop - Adaptive Learning Rate Cho Từng Weight</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Ý tưởng</span>
    <p><strong>RMSprop</strong> (Root Mean Square Propagation) được Geoffrey Hinton đề xuất trong bài giảng Coursera nổi tiếng. Ý tưởng chính: thay vì dùng chung một learning rate cho tất cả weights, RMSprop <strong>tự điều chỉnh learning rate cho từng weight</strong> dựa trên lịch sử gradient của nó.</p>
    <p class="mt-2">Weight nào có gradient lớn (thường xuyên thay đổi mạnh) → giảm learning rate. Weight nào có gradient nhỏ → tăng learning rate.</p>
  </div>

  <div class="formula-block my-4 p-4 bg-yellow-50 border-yellow-300">
    <h4 class="font-bold text-yellow-900 mb-2">Công thức RMSprop:</h4>
    <p class="text-lg font-mono">$S_t = \\behệ thống \\times S_{t-1} + (1 - \\beta) \\times (\\nabla L)^2$</p>
    <p class="text-lg font-mono mt-2">$W_{new} = W_{old} - \\ehệ thống \\times \\nabla L / \\sqrt{S_t + \\varepsilon}$</p>
    <p class="text-sm text-yellow-700 mt-2">β = 0.99 (thường dùng), ε = 1e-8 (tránh chia cho 0)</p>
  </div>

  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Giải thích chi tiết</h4>
    <div class="space-y-2 text-sm">
      <p><strong>Bước 1: Tính bình phương gradient</strong></p>
      <p class="font-mono">(∇L)²</p>
      <p>Lấy bình phương để được giá trị dương và "phóng đại" gradient lớn</p>

      <p class="mt-3"><strong>Bước 2: Cập nhật moving average</strong></p>
      <p class="font-mono">S_t = β × S_{t-1} + (1 - β) × (∇L)²</p>
      <p>S_t lưu trữ trung bình bình phương gradient gần đây (exponential moving average)</p>

      <p class="mt-3"><strong>Bước 3: Chia learning rate</strong></p>
      <p class="font-mono">η_t = η / √(S_t + ε)</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Nếu gradient thường lớn → S_t lớn → η_t nhỏ → cập nhật chậm hơn</li>
        <li>Nếu gradient thường nhỏ → S_t nhỏ → η_t lớn → cập nhật nhanh hơn</li>
      </ul>

      <p class="mt-3"><strong>Ví dụ:</strong></p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Weight w1: gradient thường = 0.01 → S nhỏ → η lớn → cập nhật nhanh</li>
        <li>Weight w2: gradient thường = 1.0 → S lớn → η nhỏ → cập nhật chậm</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-warning my-4">
    <span class="callout-title">Tại sao gọi là "Adaptive"?</span>
    <p class="mt-2">Từ "adaptive" có nghĩa là "thích ứng". RMSprop tự động điều chỉnh learning rate cho từng weight dựa trên lịch sử gradient của chính weight đó. Điều này đặc biệt hữu ích khi:</p>
    <ul class="mt-2 space-y-1">
      <li>Mạng có nhiều weights với magnitudes khác nhau</li>
      <li>Dữ liệu thưa (sparse data)</li>
      <li>Cần training nhanh cho các features ít quan trọng</li>
    </ul>
  </div>

  <div class="features-grid my-4">
    <div class="feature-card">
      <h4 class="font-bold mb-2">Ưu điểm:</h4>
      <p><strong>Adaptive learning rate:</strong> Mỗi weight có η riêng, phù hợp với đặc tính riêng</p>
      <p class="mt-2"><strong>Hoạt động tốt với sparse data:</strong> Phù hợp với NLP, recommender systems</p>
      <p class="mt-2"><strong>Không cần tuning thủ công nhiều:</strong> β = 0.99 thường làm việc tốt</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold mb-2">Nhược điểm:</h4>
      <p><strong>Không có "đà":</strong> Vẫn dao động như SGD trên các rãnh hẹp</p>
      <p class="mt-2"><strong>Cần thêm bộ nhớ:</strong> Lưu trữ S_t cho mỗi weight</p>
    </div>
  </div>

  <!-- 3.3. ADAM -->
  <h3>3.3. Adam - Kết Hợp Tinh Hoa</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Ý tưởng</span>
    <p><strong>Adam</strong> (Adaptive Moment Estimation) = <strong>Momentum + RMSprop</strong>. Thuật toán này kế thừa ưu điểm của cả hai: có "đà" như Momentum (giúp đi thẳng, giảm dao động) và có adaptive learning rate như RMSprop (điều chỉnh η cho từng weight).</p>
    <p class="mt-2">Adam được giới thiệu năm 2015 và nhanh chóng trở thành <strong>optimizer phổ biến nhất</strong> trong Deep Learning hiện nay, được sử dụng mặc định trong hầu hết các framework như TensorFlow, PyTorch, Keras.</p>
  </div>

  <div class="formula-block my-4 p-4 bg-green-50 border-green-300">
    <h4 class="font-bold text-green-900 mb-2">Công thức Adam:</h4>
    <p class="text-lg font-mono">// Momentum (first moment)</p>
    <p class="text-lg font-mono">$V_t = \\beta_1 \\times V_{t-1} + (1 - \\beta_1) \\times \\nabla L$</p>
    <p class="text-lg font-mono mt-2">// RMSprop (second moment)</p>
    <p class="text-lg font-mono">$S_t = \\beta_2 \\times S_{t-1} + (1 - \\beta_2) \\times (\\nabla L)^2$</p>
    <p class="text-lg font-mono mt-2">// Bias correction</p>
    <p class="text-lg font-mono">$\\hat{V}_t = V_t / (1 - \\beta_1^t), \\hat{S}_t = S_t / (1 - \\beta_2^t)$</p>
    <p class="text-lg font-mono mt-2">// Update weights</p>
    <p class="text-lg font-mono">$W_{new} = W_{old} - \\ehệ thống \\times \\hat{V}_t / (\\sqrt{\\hat{S}_t + \\varepsilon})$</p>
    <p class="text-sm text-green-700 mt-2">β₁ = 0.9, β₂ = 0.999, ε = 1e-8</p>
  </div>

  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Giải thích chi tiết</h4>
    <div class="space-y-2 text-sm">
      <p><strong>1. Momentum (V_t):</strong></p>
      <p class="font-mono">V_t = β₁ × V_{t-1} + (1 - β₁) × ∇L</p>
      <p>Lưu trữ "đà" - giống như Momentum, giúp đi thẳng hơn, giảm dao động</p>

      <p class="mt-3"><strong>2. RMSprop (S_t):</strong></p>
      <p class="font-mono">S_t = β₂ × S_{t-1} + (1 - β₂) × (∇L)²</p>
      <p>Lưu trữ bình phương gradient - giống như RMSprop, điều chỉnh η cho từng weight</p>

      <p class="mt-3"><strong>3. Bias Correction (Hiệu chỉnh sai số):</strong></p>
      <p class="font-mono">V̂_t = V_t / (1 - β₁^t), Ŝ_t = S_t / (1 - β₂^t)</p>
      <p>Ở các bước đầu tiên, V_t và S_t bị "thiên lệch" về 0. Phép chia này để "hiệu chỉnh" sai số này. Khi t lớn, β^t ≈ 0 nên hiệu chỉnh không đáng kể.</p>

      <p class="mt-3"><strong>4. Cập nhật cuối cùng:</strong></p>
      <p class="font-mono">W_new = W_old - η × V̂_t / √(Ŝ_t + ε)</p>
      <p>Kết hợp cả "đà" (từ V) và "adaptive" (từ S) để cập nhật weights</p>
    </div>
  </div>

  <div class="callout callout-success my-4">
    <span class="callout-title">Tại sao Adam được sử dụng rộng rãi nhất?</span>
    <ul class="mt-2 space-y-2">
      <li><strong>Đơn giản, ít cần tuning:</strong> Chỉ cần đặt η = 0.001, các tham số mặc định đã hoạt động tốt</li>
      <li><strong>Hiệu quả cao:</strong> Hội tụ nhanh trên hầu hết các bài toán</li>
      <li><strong>Ổn định:</strong> Ít bị ảnh hưởng bởi scale khác nhau của weights</li>
      <li><strong>Thoát local minima tốt:</strong> Kết hợp cả đà và nhiễu</li>
      <li><strong>Hỗ trợ sparse gradients:</strong> Tốt cho NLP, embeddings</li>
    </ul>
  </div>

  <div class="features-grid my-4">
    <div class="feature-card">
      <h4 class="font-bold mb-2">Ưu điểm của Adam:</h4>
      <p><strong>Kết hợp ưu điểm:</strong> Có cả Momentum + RMSprop</p>
      <p class="mt-2"><strong>Hiệu quả:</strong> Hội tụ nhanh, ít cần tuning</p>
      <p class="mt-2"><strong>Ổn định:</strong> Hoạt động tốt trên nhiều loại dữ liệu</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold mb-2">Nhược điểm của Adam:</h4>
      <p><strong>Tốn bộ nhớ hơn:</strong> Cần lưu V_t và S_t cho mỗi weight</p>
      <p class="mt-2"><strong>Có thể overfit:</strong> Đôi khi SGD with momentum tổng quát hơn</p>
    </div>
  </div>

  <div class="my-4 p-4 bg-blue-50 border border-blue-300 rounded">
    <h4 class="font-bold text-blue-900 mb-3">So sánh nhanh các Optimizers</h4>
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="bg-blue-100">
            <th class="border p-2">Optimizer</th>
            <th class="border p-2">Cơ chế</th>
            <th class="border p-2">Ưu điểm</th>
            <th class="border p-2">Sử dụng khi</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border p-2"><strong>SGD</strong></td><td class="border p-2">Cơ bản</td><td class="border p-2">Đơn giản</td><td class="border p-2">Học thuật</td></tr>
          <tr><td class="border p-2"><strong>Momentum</strong></td><td class="border p-2">+ Đà</td><td class="border p-2">Giảm zigzag</td><td class="border p-2">Rãnh hẹp</td></tr>
          <tr><td class="border p-2"><strong>RMSprop</strong></td><td class="border p-2">+ Adaptive LR</td><td class="border p-2">Từng weight</td><td class="border p-2">Sparse data</td></tr>
          <tr><td class="border p-2"><strong>Adam</strong></td><td class="border p-2">+ Cả hai</td><td class="border p-2">Tốt nhất</td><td class="border p-2"><strong>Mặc định!</strong></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/ch21_05_adam.png" alt="Adam Optimizer Comparison" />
    <div class="image-caption">Adam: Kết hợp Momentum và RMSprop</div>
  </div>

  <!-- TÓM TẮT -->
  <div class="key-takeaway mt-8">
    <h3>Tóm tắt bài 3</h3>
    <ul class="space-y-2">
      <li><strong>Momentum:</strong> Thêm "đà" để đi nhanh hơn</li>
      <li><strong>RMSprop:</strong> Adaptive LR cho từng weight</li>
      <li><strong>Adam:</strong> Kết hợp Momentum + RMSprop</li>
    </ul>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// SO SÁNH: SGD vs MOMENTUM vs RMSPROP vs ADAM
// =====================================================

fn loss_with_ravine(w1: f64, w2: f64) -> f64 { 0.1 * w1 * w1 + w2 * w2 }
fn gradient(w1: f64, w2: f64) -> (f64, f64) { (0.2 * w1, 2.0 * w2) }

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║          SO SÁNH: SGD vs MOMENTUM vs RMSPROP vs ADAM              ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    let lr = 0.1;

    // SGD
    println!("\\n\\n1. SGD THUẦN:");
    let (mut w1, mut w2) = (4.0, 4.0);
    for _ in 1..=5 {
        let (g1, g2) = gradient(w1, w2);
        w1 -= lr * g1; w2 -= lr * g2;
        println!("  w1={:.3}, w2={:.3}, Loss={:.4}", w1, w2, loss_with_ravine(w1, w2));
    }

    // Momentum
    println!("\\n\\n2. MOMENTUM (β=0.9):");
    let (mut w1, mut w2) = (4.0, 4.0);
    let (mut v1, mut v2) = (0.0, 0.0);
    let behệ thống = 0.9;
    for _ in 1..=5 {
        let (g1, g2) = gradient(w1, w2);
        v1 = behệ thống * v1 + (1.0 - beta) * g1;
        v2 = behệ thống * v2 + (1.0 - beta) * g2;
        w1 -= lr * v1; w2 -= lr * v2;
        println!("  w1={:.3}, w2={:.3}, Loss={:.4}", w1, w2, loss_with_ravine(w1, w2));
    }

    // RMSprop
    println!("\\n\\n3. RMSPROP:");
    let (mut w1, mut w2) = (4.0, 4.0);
    let (mut s1, mut s2) = (0.0, 0.0);
    let beta_r = 0.99;
    for _ in 1..=5 {
        let (g1, g2) = gradient(w1, w2);
        s1 = beta_r * s1 + (1.0 - beta_r) * g1 * g1;
        s2 = beta_r * s2 + (1.0 - beta_r) * g2 * g2;
        w1 -= lr * g1 / (s1.sqrt() + 1e-8);
        w2 -= lr * g2 / (s2.sqrt() + 1e-8);
        println!("  w1={:.3}, w2={:.3}, Loss={:.4}", w1, w2, loss_with_ravine(w1, w2));
    }

    // Adam
    println!("\\n\\n4. ADAM (Momentum + RMSprop):");
    let (mut w1, mut w2) = (4.0, 4.0);
    let (mut m1, mut m2, mut v1, mut v2) = (0.0, 0.0, 0.0, 0.0);
    let (b1, b2, eps) = (0.9, 0.999, 1e-8);
    for t in 1..=5 {
        let (g1, g2) = gradient(w1, w2);
        m1 = b1 * m1 + (1.0 - b1) * g1;
        m2 = b1 * m2 + (1.0 - b1) * g2;
        v1 = b2 * v1 + (1.0 - b2) * g1 * g1;
        v2 = b2 * v2 + (1.0 - b2) * g2 * g2;
        let m1h = m1 / (1.0 - b1.powi(t));
        let m2h = m2 / (1.0 - b1.powi(t));
        let v1h = v1 / (1.0 - b2.powi(t));
        let v2h = v2 / (1.0 - b2.powi(t));
        w1 -= lr * m1h / (v1h.sqrt() + eps);
        w2 -= lr * m2h / (v2h.sqrt() + eps);
        println!("  w1={:.3}, w2={:.3}, Loss={:.4}", w1, w2, loss_with_ravine(w1, w2));
    }

    println!("\\n╔══════════════════════════════════════════════════════════════════════╗");
    println!("║  SGD: Đơn giản, chậm, zigzag                                       ║");
    println!("║  Momentum: Nhanh hơn, ổn định hơn                                   ║");
    println!("║  RMSprop: Adaptive LR                                               ║");
    println!("║  ADAM: ✅ TỐT NHẤT! Kết hợp cả hai                                   ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");
}
`
  },

  // ==========================================================
  // LESSON 4: LR SCHEDULING & GRADIENT CLIPPING
  // ==========================================================
  {
    id: 'ch21_05_04',
    title: '4. LR Scheduling & Gradient Clipping - Kỹ Thuật Tinh Hoa',
    duration: '45 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Learning Rate Scheduling & Gradient Clipping</h2>

  <!-- MỞ ĐẦU - KẾT NỐI TỪ BÀI TRƯỚC -->
  <div class="story-intro mb-6 p-4 bg-gradient-to-r from-rose-50 to-orange-50 border-l-4 border-rose-400 rounded-r">
    <p class="italic text-rose-900">
      Ở bài trước, chúng ta đã học về các optimizer nâng cao: Momentum, RMSprop, và Adam. Tuy nhiên, dù dùng optimizer nào, <strong>Learning Rate (LR)</strong> vẫn là một siêu tham số (hyperparameter) cực kỳ quan trọng ảnh hưởng trực tiếp đến quá trình huấn luyện.
    </p>
    <p class="mt-2 text-rose-800">
      LR quá lớn dẫn đến dao động mạnh hoặc divergence (phân kỳ); LR quá nhỏ dẫn đến hội tụ cực chậm. Để tận dụng tối đa sức mạnh của Adam và các optimizer khác, chúng ta cần <strong>LR Scheduling</strong> để điều chỉnh LR theo thời gian, và <strong>Gradient Clipping</strong> để xử lý exploding gradient trong RNN/LSTM.
    </p>
  </div>

  <!-- 4.1. LEARNING RATE SCHEDULING -->
  <h3>4.1. Learning Rate Scheduling - Điều Chỉnh Tốc Độ Học Theo Thời Gian</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Tại sao cần LR Scheduling?</span>
    <p><strong>Learning Rate Scheduling</strong> (hay còn gọi là Learning Rate Decay) là kỹ thuật thay đổi learning rate theo thời gian trong quá trình huấn luyện. Thay vì giữ LR cố định suốt quá trình huấn luyện, hệ thống điều chỉnh LR để đạt hiệu quả tối ưu ở từng giai đoạn.</p>
    <p class="mt-2">LR cố định có hai vấn đề cơ bản:</p>
    <ul class="list-disc pl-5 mt-2 space-y-1">
      <li><strong>LR lớn:</strong> Ban đầu giúp hội tụ nhanh, nhưng khi gần đích sẽ "nhảy qua" cực tiểu, dao động không hội tụ</li>
      <li><strong>LR nhỏ:</strong> Hội tụ ổn định nhưng rất CHẬM, có thể mắc kẹt ở local minimum mà không thoát ra được</li>
    </ul>
    <p class="mt-2">Giải pháp: <strong>Ban đầu dùng LR lớn để đi nhanh, sau đó giảm dần LR để "tinh chỉnh" chính xác hơn.</strong></p>
  </div>

  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Nguyên lý hoạt động</h4>
    <div class="space-y-2 text-sm">
      <p>Hãy tưởng tượng bạn đang tìm đường trong bóng tối:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li><strong>Đầu:</strong> Bạn đi nhanh, bước lớn để khám phá rộng - LR lớn</li>
        <li><strong>Giữa:</strong> Bạn đã gần đích, cần đi chậm lại để không bỏ lỡ</li>
        <li><strong>Cuối:</strong> Bạn cần đi từng bước nhỏ để tìm chính xác điểm đích - LR nhỏ</li>
      </ul>
      <p class="mt-2">Learning Rate Scheduling chính là "kế hoạch đi" cho thuật toán!</p>
    </div>
  </div>

  <!-- CÁC CHIẾN LƯỢC LR SCHEDULING -->
  <h4 class="font-bold text-lg mt-6 mb-3">4.1.1. Các chiến lược LR Scheduling</h4>

  <div class="features-grid my-4">
    <div class="feature-card">
      <h4>1. Step Decay (Giảm từng bước)</h4>
      <p class="font-mono text-sm mb-2">LR = LR × γ sau N epochs</p>
      <p class="text-sm">Cứ sau mỗi N epochs, nhân LR với một hệ số γ (thường là 0.5 hoặc 0.1).</p>
      <p class="text-xs mt-2 text-gray-600">Ví dụ: LR = 0.1 → sau 30 epochs: 0.05 → sau 60 epochs: 0.025 → ...</p>
    </div>
    <div class="feature-card">
      <h4>2. Exponential Decay (Giảm theo hàm mũ)</h4>
      <p class="font-mono text-sm mb-2">LR(t) = LR₀ × e^(-kt)</p>
      <p class="text-sm">LR giảm theo hàm mũ, mượt hơn Step Decay. k là hằng số衰减.</p>
      <p class="text-xs mt-2 text-gray-600">Ví dụ: LR = 0.1 × e^(-0.05t)</p>
    </div>
    <div class="feature-card">
      <h4>3. Cosine Annealing (Giảm theo Cosine)</h4>
      <p class="font-mono text-sm mb-2">LR(t) = LR_min + 0.5 × (LR_max - LR_min) × (1 + cos(π × t / T))</p>
      <p class="text-sm">Giảm LR theo hình cosin - được coi là "chuẩn vàng" trong các cuộc thi Kaggle!</p>
      <p class="text-xs mt-2 text-gray-600">Ưu điểm: LR giảm mượt, có thể tăng lại sau mỗi cycle</p>
    </div>
    <div class="feature-card">
      <h4>4. Warmup (Khởi động)</h4>
      <p class="font-mono text-sm mb-2">Tăng từ 0 → LR_max, rồi giảm dần</p>
      <p class="text-sm">Đầu tiên tăng LR từ 0 lên giá trị max, sau đó giảm dần. Giúp mô hình ổn định ban đầu.</p>
      <p class="text-xs mt-2 text-gray-600">Hữu ích với mạng lớn, transformer, BERT, GPT</p>
    </div>
  </div>

  <div class="my-4 p-4 bg-blue-50 border border-blue-300 rounded">
    <h4 class="font-bold text-blue-900 mb-3">Chi tiết từng chiến lược</h4>
    <div class="space-y-3 text-sm">
      <div>
        <p class="font-bold">Step Decay:</p>
        <p>Đơn giản, dễ cài đặt. Phù hợp khi bạn biết rõ "điểm" cần giảm LR. Nhược điểm: LR giảm đột ngột, có thể làm training unstable.</p>
      </div>
      <div>
        <p class="font-bold">Exponential Decay:</p>
        <p>Giảm mượt hơn Step. Tuy nhiên có thể giảm quá nhanh ở giai đoạn sau. Thường dùng khi không biết rõ số epochs cần thiết.</p>
      </div>
      <div>
        <p class="font-bold">Cosine Annealing:</p>
        <p>Được nghiên cứu và chứng minh hiệu quả trong nhiều bài toán. Đặc biệt tốt với các mô hình deep learning hiện đại. Có thể kết hợp với Warmup (Cosine Annealing with Warm Restarts).</p>
      </div>
      <div>
        <p class="font-bold">Warmup:</p>
        <p>Rất quan trọng với Transformer và các mô hình lớn. Lý do: ban đầu weights ngẫu nhiên, dùng LR lớn ngay có thể làm mô hình unstable. Warmup giúp weights ổn định trước khi học mạnh.</p>
      </div>
    </div>
  </div>

  <div class="callout callout-info my-4">
    <span class="callout-title">Khi nào dùng LR Scheduling?</span>
    <ul class="mt-2 space-y-1">
      <li>Khi huấn luyện > 30-50 epochs</li>
      <li>Khi muốn cải thiện chất lượng model</li>
      <li>Đặc biệt quan trọng với: Transformer, BERT, mạng GAN</li>
      <li>Cosine Annealing + Warmup = combo phổ biến nhất trong thực tế</li>
    </ul>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/ch21_05_lr_scheduling.png" alt="Learning Rate Scheduling" />
    <div class="image-caption">Các chiến lược Learning Rate Scheduling: Step, Exponential, Cosine Annealing, Warmup</div>
  </div>

  <!-- 4.2. GRADIENT CLIPPING -->
  <h3>4.2. Gradient Clipping - Xử Lý Gradient Nổ Tung</h3>

  <div class="callout callout-danger my-4">
    <span class="callout-title">Vấn đề: Exploding Gradient</span>
    <p class="mt-2"><strong>Exploding Gradient</strong> (Gradient nổ tung) là hiện tượng gradient trở nên cực lớn (có thể lên đến 10^100 hoặc hơn), khiến weights trở thành NaN (Not a Number) và mô hình <strong>hoàn toàn sụp đổ</strong>.</p>
  </div>

  <div class="my-4 p-4 bg-red-50 border border-red-300 rounded">
    <h4 class="font-bold text-red-900 mb-3">Tại sao Gradient lại "nổ tung"?</h4>
    <div class="space-y-2 text-sm">
      <p><strong>Trong RNN/LSTM:</strong></p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Gradient cần "nhân" qua nhiều timesteps (10, 20, 100 bước)</li>
        <li>Nếu mỗi bước gradient > 1, sau 100 bước: 1.01^100 ≈ 2.7 (ổn), nhưng 1.1^100 ≈ 13780 (bắt đầu lớn), 1.5^100 = 4×10^17 (nổ tung!)</li>
      </ul>
      <p class="mt-2"><strong>Hậu quả:</strong></p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Weights trở thành NaN</li>
        <li>Loss trở thành NaN</li>
        <li>Training hoàn toàn dừng lại</li>
        <li>Không thể tiếp tục huấn luyện</li>
      </ul>
    </div>
  </div>

  <div class="formula-block my-4 p-4 bg-red-50 border-red-300">
    <h4 class="font-bold text-red-900 mb-2">Gradient Clipping by Norm:</h4>
    <p class="text-lg font-mono">// Bước 1: Tính norm của gradient</p>
    <p class="text-lg font-mono">$g_{norm} = ||\\nabla L||_2 = \\sqrt{\\sum_i (\\frac{\\partial L}{\\partial w_i})^2}$</p>
    <p class="text-lg font-mono mt-2">// Bước 2: Nếu norm > threshold, scale gradient</p>
    <p class="text-lg font-mono">Nếu $g_{norm} > threshold$: $\\nabla L_{clipped} = \\nabla L \\times (threshold / g_{norm})$</p>
    <p class="text-sm text-red-700 mt-2">Threshold thường dùng: 1.0, 5.0, 10.0</p>
  </div>

  <div class="my-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
    <h4 class="font-bold text-yellow-900 mb-3">Giải thích chi tiết</h4>
    <div class="space-y-2 text-sm">
      <p><strong>Gradient Norm là gì?</strong></p>
      <p>Norm (chuẩn) là độ lớn của vector gradient. Với vector gradient n chiều, norm = √(g₁² + g₂² + ... + gₙ²). Nó cho biết gradient "lớn" bao nhiêu tổng thể.</p>

      <p class="mt-3"><strong>Ví dụ số:</strong></p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Gradient = [2, 3] → norm = √(4 + 9) = √13 ≈ 3.6</li>
        <li>Gradient = [100, 200] → norm = √(10000 + 40000) = √50000 ≈ 224</li>
        <li>Nếu threshold = 5: gradient thứ 2 sẽ được scale: 224/5 = 44.8 → scale về 5</li>
      </ul>

      <p class="mt-3"><strong>Điều quan trọng:</strong></p>
      <p>Gradient Clipping <strong>không làm mất thông tin</strong> về hướng. Nếu gradient chỉ hướng "đi xuống", sau clipping vẫn chỉ hướng đi xuống, chỉ có độ lớn bị giảm!</p>
    </div>
  </div>

  <div class="features-grid my-4">
    <div class="feature-card">
      <h4 class="font-bold mb-2">Ưu điểm:</h4>
      <p><strong>Ngăn chặn NaN:</strong> Không cho gradient vượt quá ngưỡng → tránh NaN</p>
      <p class="mt-2"><strong>Đơn giản:</strong> Chỉ cần thêm một dòng code</p>
      <p class="mt-2"><strong>Hiệu quả:</strong> Cứu hàng triệu model RNN/LSTM mỗi ngày!</p>
    </div>
    <div class="feature-card">
      <h4 class="font-bold mb-2">Nhược điểm:</h4>
      <p><strong>Hyperparameter thêm:</strong> Cần chọn threshold phù hợp</p>
      <p class="mt-2"><strong>Giảm tốc độ học:</strong> Khi clipping quá nhiều, model học chậm hơn</p>
      <p class="mt-2"><strong>Che dấu vấn đề:</strong> Nếu gradient liên tục clip, có thể có lỗi khác trong model</p>
    </div>
  </div>

  <div class="callout callout-warning my-4">
    <span class="callout-title">Khi nào cần Gradient Clipping?</span>
    <ul class="mt-2 space-y-2">
      <li><strong>RNN/LSTM/GRU:</strong> Bắt buộc phải dùng! Gradient qua nhiều timesteps rất dễ explode</li>
      <li><strong>Sequence-to-sequence models:</strong> Machine translation, text generation</li>
      <li><strong>Mạng sâu quá sâu:</strong> > 50 layers có thể gặp vấn đề</li>
      <li><strong>Lưu ý quan trọng:</strong> Với Adam optimizer, gradient clipping ít cần thiết hơn vì Adam tự điều chỉnh learning rate!</li>
      <li><strong>Thường dùng:</strong> RNN/LSTM: clip_norm = 1.0 hoặc 5.0</li>
    </ul>
  </div>

  <div class="my-4 p-4 bg-purple-50 border border-purple-300 rounded">
    <h4 class="font-bold text-purple-900 mb-3">So sánh: LR Scheduling vs Gradient Clipping</h4>
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="bg-purple-100">
            <th class="border p-2">Tiêu chí</th>
            <th class="border p-2">LR Scheduling</th>
            <th class="border p-2">Gradient Clipping</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border p-2"><strong>Mục đích</strong></td><td class="border p-2">Giảm LR theo thời gian</td><td class="border p-2">Giới hạn độ lớn gradient</td></tr>
          <tr><td class="border p-2"><strong>Áp dụng khi</strong></td><td class="border p-2">Mọi model, mọi bài toán</td><td class="border p-2">RNN/LSTM, mạng sâu</td></tr>
          <tr><td class="border p-2"><strong>Vấn đề giải quyết</strong></td><td class="border p-2">Dao động, hội tụ chậm</td><td class="border p-2">Exploding gradient, NaN</td></tr>
          <tr><td class="border p-2"><strong>Kết hợp được?</strong></td><td class="border p-2">✅ Có</td><td class="border p-2">✅ Có</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/ch21_05_gradient_clipping.png" alt="Gradient Clipping Visualization" />
    <div class="image-caption">Gradient Clipping: Cắt gradient khi quá lớn để tránh exploding gradient</div>
  </div>

  <!-- COMBO KHUYÊN DÙNG -->
  <div class="callout callout-success my-6">
    <span class="callout-title">Combo khuyên dùng trong thực tế</span>
    <ul class="mt-2 space-y-2">
      <li><strong>Thường:</strong> Adam + Cosine Annealing</li>
      <li><strong>Transformer/BERT:</strong> AdamW + Cosine Annealing + Warmup</li>
      <li><strong>RNN/LSTM:</strong> Adam + Gradient Clipping (clip_norm=1.0)</li>
      <li><strong>Cuộc thi Kaggle:</strong> Adam + Cosine Annealing with Warm Restarts</li>
    </ul>
  </div>

  <!-- TÓM TẮT -->
  <div class="key-takeaway mt-8">
    <h3>Tóm tắt bài 4</h3>
    <ul class="space-y-2">
      <li><strong>LR Scheduling:</strong> Giảm dần LR theo thời gian</li>
      <li><strong>Step Decay:</strong> Giảm LR sau N epochs</li>
      <li><strong>Cosine Annealing:</strong> Giảm theo cosine - chuẩn Kaggle</li>
      <li><strong>Warmup:</strong> Tăng dần LR ở đầu training</li>
      <li><strong>Gradient Clipping:</strong> Cắt gradient khi quá lớn - cứu RNN/LSTM</li>
    </ul>
  </div>

  <div class="callout callout-tip mt-6">
    <span class="callout-title">Chúc mừng!</span>
    <p>Bạn đã hoàn thành <strong>Chương 21 - Bài 5: Gradient Descent & Optimizers</strong>!</p>
    <p class="mt-2"><strong>Adam + Cosine Annealing = combo mạnh nhất!</strong></p>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// VÍ DỤ: LR SCHEDULING & GRADIENT CLIPPING
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║    LEARNING RATE SCHEDULING & GRADIENT CLIPPING                    ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // 1. LR SCHEDULING
    println!("\\n\\n1. LEARNING RATE SCHEDULING:");
    println!("\\nEpoch │  Step   │  Exp    │  Cosine");
    println!("───────┼─────────┼─────────┼──────────");
    let (lr0, total) = (0.1, 50);
    for epoch in 1..=total {
        let step_lr = if epoch % 20 == 0 { lr0 * 0.5_f64.powi(epoch / 20) } else { lr0 * 0.5_f64.powi(epoch / 20) };
        let exp_lr = lr0 * (-0.05 * epoch as f64).exp();
        let cosine_lr = 0.01 + 0.5 * (lr0 - 0.01) * (1.0 + (std::f64::consts::PI * epoch as f64 / total as f64).cos());
        if epoch <= 10 || epoch == 50 {
            println!("  {:>4}  │  {:>6.4} │ {:>7.4} │  {:>7.4}", epoch, step_lr, exp_lr, cosine_lr);
        } else if epoch == 11 {
            println!("  ...   │   ...   │   ...   │   ...");
        }
    }

    // 2. GRADIENT CLIPPING
    println!("\\n\\n2. GRADIENT CLIPPING:");
    println!("\\n  Gradient  │  Clipped  │ Giam?");
    println!("─────────────┼───────────┼────────");
    let max_norm = 1.0;
    for g in [0.5, 1.0, 2.0, 5.0, 10.0, 50.0, 100.0] {
        let clipped = if g.abs() > max_norm { g * (max_norm / g.abs()) } else { g };
        println!("    {:>6.1}   │  {:>6.2}   │ {}", g, clipped, if g.abs() > max_norm { "YES" } else { "NO" });
    }

    println!("\\n╔══════════════════════════════════════════════════════════════════════╗");
    println!("║  LR Scheduling: Step, Exponential, Cosine Annealing, Warmup         ║");
    println!("║  Gradient Clipping: Cứu RNN/LSTM khỏi exploding gradient           ║");
    println!("║  💡 Tip: Adam + Cosine Annealing = combo mạnh nhất!               ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");
}
`
  },
];

export const ch21_05: Chapter = {
  id: 'ch21_05',
  title: '21.5. Gradient Descent & Optimizers',
  introduction: `
    <h2>Luật Tiến hóa và Tìm Đáy</h2>
    <ul>
      <li>Hiểu đúng về Giải tích Gradient ∇L ngược dấu.</li>
      <li>So sánh Batch, Mini-batch SGD. Động lượng Momentum chọc thủng cực tiểu.</li>
      <li>Tại sao Adam thống trị cả cõi Machine Learning.</li>
      <li>Đóng đinh Gradient Clipping sửa nạn Exploding Gradient.</li>
    </ul>
  `,
  lessons: ch21_05_lessons,
};

export default ch21_05;
