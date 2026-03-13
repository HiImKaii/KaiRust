import { Lesson, Chapter } from '../../courses';

const ch23_02_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: TOKEN EMBEDDING
  // ==========================================================
  {
    id: 'ch23_02_01',
    title: '1. Token Embedding — Từ số nguyên tới vector',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Token Embedding trong Transformer</h2>

  <p>Transformer xử lý text bằng cách chuyển mỗi token (từ/subword) thành vector số thực. Quá trình này giống Word Embedding trong RNN (Chương 22), nhưng có vài điểm khác biệt quan trọng.</p>

  <h3>1.1. Quy trình 3 bước</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">①</div>
      <div class="step-content">
        <h4>Tokenization</h4>
        <p>Text "Tôi yêu AI" → Tokens: ["Tôi", "yêu", "AI"]. Mỗi token được gán 1 ID số nguyên từ vocabulary.</p>
        <div class="definition-block">
          <span class="definition-term">Vocabulary là gì?</span>
          <p>Tập hợp tất cả tokens có trong corpus. Ví dụ vocab có 30,000 tokens:</p>
          <p>vocab = {"[PAD]": 0, "[UNK]": 1, "[CLS]": 2, "[SEP]": 3, "Tôi": 42, "yêu": 105, "AI": 7831, ...}</p>
        </div>
        <p><strong>Special tokens:</strong></p>
        <ul>
          <li><strong>[PAD]</strong>: Padding — đệm câu ngắn cho cùng độ dài batch</li>
          <li><strong>[UNK]</strong>: Unknown — từ không có trong vocab</li>
          <li><strong>[CLS]</strong>: Classification — token đầu câu (BERT dùng)</li>
          <li><strong>[SEP]</strong>: Separator — phân cách 2 câu</li>
          <li><strong>[SOS]</strong> / <strong>[EOS]</strong>: Start/End of sequence</li>
        </ul>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">②</div>
      <div class="step-content">
        <h4>Embedding Lookup</h4>
        <p>Ma trận embedding $E \\in \\mathbb{R}^{|V| \\times d_{model}}$ với $|V|$ = vocab size, $d_{model}$ = embedding dimension.</p>
        <div class="formula-block">
          <p>$x_i = E[\\text{token\\_id}_i] \\in \\mathbb{R}^{d_{model}}$</p>
        </div>
        <p><strong>Ví dụ với $d_{model}=4$:</strong></p>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Token ID</th>
              <th>Embedding Vector</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>42 ("Tôi")</td>
              <td>[0.12, -0.34, 0.56, -0.21]</td>
            </tr>
            <tr>
              <td>105 ("yêu")</td>
              <td>[0.78, 0.23, -0.45, 0.91]</td>
            </tr>
            <tr>
              <td>7831 ("AI")</td>
              <td>[-0.11, 0.67, 0.33, -0.89]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">③</div>
      <div class="step-content">
        <h4>Scaling</h4>
        <p>Paper gốc nhân embedding với $\\sqrt{d_{model}}$:</p>
        <div class="formula-block">
          <p>$x_i = E[\\text{token\\_id}_i] \\times \\sqrt{d_{model}}$</p>
        </div>
        <div class="callout callout-tip">
          <div class="callout-content">
            <span class="callout-title">Tại sao cần scaling?</span>
            <p>Embedding values ban đầu rất nhỏ (thường từ Gaussian N(0, 0.02)). Khi $d_{model}=512$, std ≈ 0.02 → variance ≈ 0.0004.</p>
            <p>Positional Encoding có range [-1, 1]. Nhân với $\\sqrt{512} \\approx 22.6$ → embedding variance ≈ 0.0004 × 512 = 0.2, gần với PE hơn.</p>
            <p>Kết quả: embedding + PE có scale tương đương → training ổn định hơn.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h3>1.2. Tokenization chi tiết — Từ văn bản đến số nguyên</h3>

  <p>Trước khi embedding được áp dụng, văn bản đầu vào phải trải qua bước <strong>Tokenization</strong> — quá trình chia nhỏ văn bản thành các đơn vị (tokens) có ý nghĩa. Đây là bước nền tảng nhưng thường bị bỏ qua, và nó ảnh hưởng trực tiếp đến chất lượng của mô hình.</p>

  <h4>1.2.1. Tại sao Tokenization quan trọng?</h4>

  <div class="definition-block">
    <span class="definition-term">Tokenization là gì?</span>
    <p>Tokenization là quá trình chuyển đổi một chuỗi văn bản (string) thành một chuỗi các số nguyên (token IDs). Mỗi số nguyên đại diện cho một token trong <strong>Vocabulary</strong> — từ điển của mô hình.</p>
  </div>

  <!-- Sơ đồ Pipeline -->
  <div class="image-showcase">
    <svg width="800" height="180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-pipeline" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6"/>
        </marker>
      </defs>

      <!-- Step 1: Text -->
      <rect x="20" y="50" width="150" height="80" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
      <text x="95" y="80" text-anchor="middle" fill="#fff" font-family="monospace" font-size="13">Input Text</text>
      <text x="95" y="105" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="11">"Con mèo"</text>

      <!-- Arrow 1 -->
      <line x1="170" y1="90" x2="210" y2="90" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-pipeline)"/>

      <!-- Step 2: Tokens -->
      <rect x="220" y="50" width="150" height="80" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
      <text x="295" y="80" text-anchor="middle" fill="#fff" font-family="monospace" font-size="13">Tokenizer</text>
      <text x="295" y="105" text-anchor="middle" fill="#c4b5fd" font-family="monospace" font-size="11">["Con", "mèo"]</text>

      <!-- Arrow 2 -->
      <line x1="370" y1="90" x2="410" y2="90" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-pipeline)"/>

      <!-- Step 3: IDs -->
      <rect x="420" y="50" width="150" height="80" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/>
      <text x="495" y="80" text-anchor="middle" fill="#fff" font-family="monospace" font-size="13">Vocab IDs</text>
      <text x="495" y="105" text-anchor="middle" fill="#67e8f9" font-family="monospace" font-size="11">[142, 879]</text>

      <!-- Arrow 3 -->
      <line x1="570" y1="90" x2="610" y2="90" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-pipeline)"/>

      <!-- Step 4: Embeddings -->
      <rect x="620" y="50" width="160" height="80" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="700" y="80" text-anchor="middle" fill="#fff" font-family="monospace" font-size="13">Embeddings</text>
      <text x="700" y="105" text-anchor="middle" fill="#6ee7b7" font-family="monospace" font-size="11">[d_model vector]</text>

      <!-- Labels -->
      <text x="95" y="35" text-anchor="middle" fill="#64748b" font-size="10">String</text>
      <text x="295" y="35" text-anchor="middle" fill="#64748b" font-size="10">Tokens</text>
      <text x="495" y="35" text-anchor="middle" fill="#64748b" font-size="10">Token IDs</text>
      <text x="700" y="35" text-anchor="middle" fill="#64748b" font-size="10">Dense Vectors</text>
    </svg>
    <div class="image-caption">Hình 1: Tokenization Pipeline — Từ văn bản đến vector embedding</div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">text_fields</span></div>
      <h4>Input</h4>
      <p><code>"Con mèo đen ăn cá"</code></p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">transform</span></div>
      <h4>Tokenization</h4>
      <p><code>["Con", "mèo", "đen", "ăn", "cá"]</code></p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">tag</span></div>
      <h4>Vocabulary Lookup</h4>
      <p><code>[142, 879, 2341, 56, 901]</code></p>
    </div>
  </div>

  <h4>1.2.2. Các phương pháp Tokenization</h4>

  <p>Có nhiều cách để chia văn bản thành tokens, mỗi cách có ưu nhược điểm riêng:</p>

  <h5>a) Word-Level Tokenization — Chia theo từ</h5>

  <p>Phương pháp đơn giản nhất: mỗi từ trong câu trở thành một token.</p>

  <div class="formula-block-small">
    <strong>Ví dụ:</strong><br/>
    Input: <code>"unhappiness"</code><br/>
    Output: <code>["unhappiness"]</code>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Ưu điểm</h4>
      <ul>
        <li>Dễ hiểu, dễ implement</li>
        <li>Ngữ nghĩa rõ ràng (mỗi token là một từ hoàn chỉnh)</li>
        <li>Không cần xử lý phức tạp</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Nhược điểm</h4>
      <ul>
        <li><strong>Vocab cực lớn:</strong> Tiếng Anh có ~1-5 triệu từ, tiếng Việt còn nhiều hơn</li>
        <li><strong>OOV nghiêm trọng:</strong> Từ không có trong vocab → thay bằng [UNK]</li>
        <li><strong>Từ rare:</strong> Từ ít gặp khó học pattern</li>
        <li><strong>Inflection:</strong> "run", "running", "ran" → 3 tokens khác nhau</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-warning">
    <span class="material-symbols-outlined">warning</span>
    <div class="callout-content">
      <span class="callout-title">OOV — Out Of Vocabulary</span>
      <p>Đây là vấn đề lớn nhất của Word-Level. Khi gặp từ <code>"multimodal"</code> mà không có trong vocab, model phải thay bằng <code>[UNK]</code> — mất hoàn toàn thông tin.</p>
    </div>
  </div>

  <h5>b) Character-Level Tokenization — Chia theo ký tự</h5>

  <p>Mỗi ký tự (chữ cái, số, dấu câu) là một token.</p>

  <div class="formula-block-small">
    <strong>Ví dụ:</strong><br/>
    Input: <code>"hello"</code><br/>
    Output: <code>["h", "e", "l", "l", "o"]</code>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Ưu điểm</h4>
      <ul>
        <li>Vocab cực nhỏ (~50-200 ký tự)</li>
        <li>Không bao giờ gặp OOV</li>
        <li>Xử lý được mọi ngôn ngữ</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Nhược điểm</h4>
      <ul>
        <li>Sequence rất dài (1 từ → 5-10 tokens)</li>
        <li>Khó học ngữ nghĩa ở level ký tự</li>
        <li>Training chậm, tốn memory</li>
      </ul>
    </div>
  </div>

  <h5>c) Subword-Level Tokenization — Cân bằng giữa từ và ký tự</h5>

  <p>Subword tokenization là giải pháp lai: chia từ thành các đơn vị nhỏ hơn (subwords) nhưng vẫn giữ ngữ nghĩa. Đây là phương pháp <strong>tiêu chuẩn</strong> trong các mô hình Transformer hiện đại.</p>

  <div class="formula-block-small">
    <strong>Ví dụ:</strong><br/>
    Input: <code>"unhappiness"</code><br/>
    Output (BPE): <code>["un", "happi", "ness"]</code><br/>
    Output (WordPiece): <code>["un", "happi", "##ness"]</code> <span style="color: var(--text-muted); font-size: 0.85em;">(# = continue token)</span>
  </div>

  <h4>1.2.3. Thuật toán Subword phổ biến</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Thuật toán</th>
        <th>Nguyên lý</th>
        <th>Ví dụ "unhappiness"</th>
        <th>Dùng trong</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>BPE</strong><br/><em>Byte Pair Encoding</em></td>
        <td>Gộp cặp tokens phổ biến nhất</td>
        <td><code>["un", "happi", "ness"]</code></td>
        <td>GPT, GPT-2, GPT-3</td>
      </tr>
      <tr>
        <td><strong>WordPiece</strong></td>
        <td>Chọn cặp có likelihood cao nhất</td>
        <td><code>["un", "happi", "##ness"]</code></td>
        <td>BERT, DistilBERT</td>
      </tr>
      <tr>
        <td><strong>SentencePiece</strong></td>
        <td>Unigram language model</td>
        <td><code>["un", "happi", "ness"]</code></td>
        <td>T5, ALBERT, LLaMA, mBERT</td>
      </tr>
      <tr>
        <td><strong>Unigram</strong></td>
        <td>Loại bỏ tokens ít useful</td>
        <td><code>["un", "happi", "ness"]</code></td>
        <td>SentencePiece</td>
      </tr>
    </tbody>
  </table>

  <h4>1.2.4. Chi tiết thuật toán BPE</h4>

  <div class="callout callout-info">
    <span class="material-symbols-outlined">info</span>
    <div class="callout-content">
      <span class="callout-title">BPE là gì?</span>
      <p><strong>Byte Pair Encoding (BPE)</strong> là thuật toán nén dữ liệu từ năm 1994, sau đó được áp dụng cho NLP vào năm 2016 (GPT, GPT-2 dùng BPE). Thuật toán này <strong>tự động tìm ra các subword tokens tối ưu</strong> từ dữ liệu huấn luyện.</p>
    </div>
  </div>

  <div class="definition-block">
    <span class="definition-term">Ý tưởng chính</span>
    <p>BPE hoạt động bằng cách:</p>
    <ol>
      <li><strong>Đếm tần suất</strong> của tất cả các cặp ký tự/TOKEN liên tiếp trong corpus</li>
      <li><strong>Tìm cặp phổ biến nhất</strong> và <strong>gộp</strong> chúng thành một token mới</li>
      <li><strong>Lặp lại</strong> cho đến khi vocabulary đạt kích thước mong muốn</li>
    </ol>
    <p>Ví dụ: "the" xuất hiện 10000 lần → được ghép thành 1 token. "unhappiness" chỉ xuất hiện 1 lần → tách thành "un" + "happi" + "ness".</p>
  </div>

  <h5>1.2.4.1. Pseudocode</h5>

  <div class="formula-block-small" style="text-align: left;">
    <strong>Thuật toán BPE (Pseudocode)</strong>
    <pre style="background: var(--bg-soft); padding: 16px; border-radius: 8px; overflow-x: auto; margin-top: 12px; font-size: 0.8rem;"><code># Input: corpus (danh sách các từ), vocab_size (kích thước vocabulary mong muốn)
# Output: vocabulary (danh sách các tokens)

# Bước 1: Khởi tạo vocabulary với các ký tự đơn
vocabulary = get_all_unique_characters(corpus)

WHILE length(vocabulary) < vocab_size DO
    # Bước 2: Đếm tần suất của mỗi cặp tokens
    pairs = count_all_pairs(corpus)

    # Bước 3: Tìm cặp phổ biến nhất
    most_frequent_pair = find_most_frequent(pairs)

    # Bước 4: Gộp cặp đó thành token mới
    new_token = merge_pair(most_frequent_pair)
    vocabulary.add(new_token)

    # Cập nhật corpus: thay thế cặp cũ bằng token mới
    corpus = replace_pairs_in_corpus(corpus, most_frequent_pair, new_token)
END WHILE

RETURN vocabulary</code></pre>
  </div>

  <h5>1.2.4.2. Ví dụ chi tiết với Corpus gồm nhiều từ</h5>

  <p>Giả sử ta có corpus gồm các từ sau (đã được lowercase và tách thành characters):</p>

  <div class="formula-block-small" style="text-align: left;">
    <strong>Corpus ban đầu:</strong>
    <p style="margin-top: 8px; font-family: var(--font-mono); font-size: 0.85rem;">
      "low", "low", "low", "lower", "lowest", "lower"<br/>
      → Character-level: ["l","o","w"], ["l","o","w"], ["l","o","w"], ["l","o","w","e","r"], ["l","o","w","e","s","t"], ["l","o","w","e","r"]
    </p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Lần 1: Tìm cặp phổ biến nhất</h4>
      <p style="font-size: 0.9rem;">Đếm tất cả các cặp trong corpus:</p>
      <table style="width: 100%; font-size: 0.8rem; margin-top: 8px;">
        <tr><td>"lo": 6 lần</td><td>"ow": 6 lần</td></tr>
        <tr><td>"we": 3 lần</td><td>"er": 3 lần</td></tr>
        <tr><td>"st": 1 lần</td><td>"es": 1 lần</td></tr>
      </table>
      <p style="font-size: 0.85rem; color: var(--color-purple); margin-top: 8px;">→ Cặp phổ biến nhất: "lo" và "ow" (cùng 6 lần)</p>
    </div>
    <div class="concept-card">
      <h4>Lần 1: Gộp "lo" → "low"</h4>
      <p style="font-size: 0.9rem;">Gộp cặp "lo" thành token mới:</p>
      <p style="font-family: var(--font-mono); font-size: 0.85rem; margin-top: 8px;">"lo" → "low"</p>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">Vocabulary thêm: <strong>"low"</strong></p>
      <p style="font-size: 0.85rem; color: var(--text-muted);">Corpus mới: ["low","w"], ["low","w"], ["low","w"], ["low","w","e","r"], ["low","w","e","s","t"], ["low","w","e","r"]</p>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Lần 2: Tiếp tục tìm cặp</h4>
      <p style="font-size: 0.9rem;">Đếm lại các cặp:</p>
      <table style="width: 100%; font-size: 0.8rem; margin-top: 8px;">
        <tr><td>"ow": 6 lần</td><td>"we": 3 lần</td></tr>
        <tr><td>"er": 3 lần</td><td>"es": 1 lần</td></tr>
        <tr><td>"st": 1 lần</td><td></td></tr>
      </table>
      <p style="font-size: 0.85rem; color: var(--color-purple); margin-top: 8px;">→ Cặp phổ biến nhất: "ow" (6 lần)</p>
    </div>
    <div class="concept-card">
      <h4>Lần 2: Gộp "ow" → "low"</h4>
      <p style="font-size: 0.9rem;">Gộp "ow" thành token mới:</p>
      <p style="font-family: var(--font-mono); font-size: 0.85rem; margin-top: 8px;">"ow" → "low" (gộp vào token "low" đã có!)</p>
      <p style="font-size: 0.85rem; color: var(--color-purple); margin-top: 8px;">→ Từ "low" xuất hiện 6 lần, nên được giữ nguyên!</p>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">Corpus mới: ["low"], ["low"], ["low"], ["low","e","r"], ["low","e","s","t"], ["low","e","r"]</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <span class="material-symbols-outlined">lightbulb</span>
    <div class="callout-content">
      <span class="callout-title">Quan sát quan trọng!</span>
      <ul>
        <li>"low" xuất hiện 6 lần → trở thành 1 token hoàn chỉnh</li>
        <li>"er" xuất hiện 3 lần → vẫn tách riêng</li>
        <li>"est" chỉ xuất hiện 1 lần → không đủ phổ biến để gộp</li>
      </ul>
    </div>
  </div>

  <h5>1.2.4.3. Tại sao BPE hiệu quả?</h5>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Loại từ</th>
        <th>Cách xử lý</th>
        <th>Ví dụ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Từ phổ biến</strong></td>
        <td>Giữ nguyên thành 1 token</td>
        <td>"the", "is", "low" → 1 token</td>
      </tr>
      <tr>
        <td><strong>Từ hiếm</strong></td>
        <td>Tách thành subwords</td>
        <td>"unhappiness" → ["un", "happi", "ness"]</td>
      </tr>
      <tr>
        <td><strong>Từ hoàn toàn mới</strong></td>
        <td>Tách đến khi thành characters</td>
        <td>"XYZ123" → ["X", "Y", "Z", "1", "2", "3"]</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-warning">
    <span class="material-symbols-outlined">warning</span>
    <div class="callout-content">
      <span class="callout-title">Vocab Size quan trọng như thế nào?</span>
      <ul>
        <li><strong>Vocab nhỏ (10K)</strong>: Nhiều từ bị tách nhỏ → sequence dài, model khó học</li>
        <li><strong>Vocab lớn (50K)</strong>: Từ phổ biến giữ nguyên → sequence ngắn, hiệu quả</li>
        <li><strong>Vocab quá lớn (100K+)</strong>: Rare tokens chiếm memory, có thể overfit</li>
      </ul>
    </div>
  </div>

  <h4>1.2.5. So sánh chi tiết Word vs Subword</h4>

  <!-- Sơ đồ so sánh các phương pháp -->
  <div class="image-showcase">
    <svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
      <!-- Word Level -->
      <rect x="20" y="40" width="240" height="140" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
      <text x="140" y="65" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold">Word-Level</text>
      <text x="140" y="95" text-anchor="middle" fill="#fff" font-family="monospace" font-size="11">"unhappiness"</text>
      <path d="M 140 110 L 140 125" stroke="#ef4444" stroke-width="2" stroke-dasharray="4"/>
      <text x="140" y="140" text-anchor="middle" fill="#fca5a5" font-size="10">["unhappiness"]</text>
      <text x="140" y="170" text-anchor="middle" fill="#94a3b8" font-size="9">vocab: 1-5M | OOV: cao</text>

      <!-- Subword Level -->
      <rect x="280" y="40" width="240" height="140" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="400" y="65" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="bold">Subword-Level (BPE)</text>
      <text x="400" y="95" text-anchor="middle" fill="#fff" font-family="monospace" font-size="11">"unhappiness"</text>
      <path d="M 400 110 L 400 125" stroke="#10b981" stroke-width="2" stroke-dasharray="4"/>
      <text x="400" y="140" text-anchor="middle" fill="#6ee7b7" font-size="10">["un", "happi", "ness"]</text>
      <text x="400" y="170" text-anchor="middle" fill="#94a3b8" font-size="9">vocab: 30-50K | OOV: thấp</text>

      <!-- Character Level -->
      <rect x="540" y="40" width="240" height="140" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
      <text x="660" y="65" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">Character-Level</text>
      <text x="660" y="95" text-anchor="middle" fill="#fff" font-family="monospace" font-size="11">"hello"</text>
      <path d="M 660 110 L 660 125" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4"/>
      <text x="660" y="140" text-anchor="middle" fill="#93c5fd" font-size="10">["h","e","l","l","o"]</text>
      <text x="660" y="170" text-anchor="middle" fill="#94a3b8" font-size="9">vocab: 50-200 | OOV: không</text>

      <!-- Legend -->
      <text x="400" y="20" text-anchor="middle" fill="#e2e8f0" font-size="12" font-weight="bold">So sánh các phương pháp Tokenization</text>
    </svg>
    <div class="image-caption">Hình 3: So sánh Word-Level, Subword-Level và Character-Level Tokenization</div>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>Word-Level</th>
        <th>Subword-Level</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Vocabulary Size</strong></td>
        <td>~100K - 5M</td>
        <td>~30K - 50K</td>
      </tr>
      <tr>
        <td><strong>OOV Handling</strong></td>
        <td>Thay bằng [UNK]</td>
        <td>Tách thành subwords quen thuộc</td>
      </tr>
      <tr>
        <td><strong>Sequence Length</strong></td>
        <td>Ngắn (1-3 tokens/từ)</td>
        <td>Dài hơn (3-10 tokens/từ)</td>
      </tr>
      <tr>
        <td><strong>Training Data cần</strong></td>
        <td>Nhiều để cover vocab</td>
        <td>Ít hơn vì reusable subwords</td>
      </tr>
      <tr>
        <td><strong>Ngữ nghĩa</strong></td>
        <td>Rõ ràng (từ hoàn chỉnh)</td>
        <td>Cần suy luận từ subwords</td>
      </tr>
    </tbody>
  </table>

  <h4>1.2.6. Vocabulary và Special Tokens</h4>

  <p>Mỗi model có một <strong>Vocabulary cố định</strong> — danh sách tất cả tokens mà model hiểu. Ngoài các từ thông thường, vocab còn chứa các <strong>special tokens</strong>:</p>

  <div class="formula-block-small" style="text-align: left;">
    <strong>Vocabulary Structure (ví dụ GPT-2, vocab size = 50257):</strong>
    <pre style="background: var(--bg-soft); padding: 16px; border-radius: 8px; overflow-x: auto; margin-top: 12px; font-size: 0.85rem;"><code>{
  0:   "[PAD]"  # Padding - đệm câu ngắn
  1:   "[UNK]"  # Unknown - từ không nhận diện
  2:   "[BOS]"  # Beginning of Sequence
  3:   "[EOS]"  # End of Sequence
  4:   "[CLS]"  # Classification (BERT)
  5:   "[SEP]"  # Separator
  6:   "[MASK]" # Mask (BERT)
  ...
  50256: "hello"
}</code></pre>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">padding</span></div>
      <h4>[PAD] — Padding</h4>
      <p>Đệm câu ngắn để batch có cùng độ dài. Thường được bỏ qua trong attention.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">help</span></div>
      <h4>[UNK] — Unknown</h4>
      <p>Thay thế từ không có trong vocab. Subword giảm thiểu [UNK] đáng kể.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">first_page</span></div>
      <h4>[BOS] / [SOS]</h4>
      <p>Bắt đầu sequence. Cho model biết "bắt đầu từ đây".</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">last_page</span></div>
      <h4>[EOS] / [SEP]</h4>
      <p>Kết thúc sequence hoặc phân cách 2 câu (trong pair tasks).</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <span class="material-symbols-outlined">lightbulb</span>
    <div class="callout-content">
      <span class="callout-title">Tokenizer trong thực tế</span>
      <p>Các model hiện đại sử dụng pre-trained tokenizers:</p>
      <ul>
        <li><strong>GPT-2:</strong> BPE, vocab=50257</li>
        <li><strong>BERT:</strong> WordPiece, vocab=30522</li>
        <li><strong>LLaMA:</strong> SentencePiece, vocab=32000</li>
        <li><strong>T5:</strong> SentencePiece, vocab=32128</li>
      </ul>
    </div>
  </div>

  <div class="definition-block">
    <span class="definition-term">Tóm tắt luồng xử lý</span>
    <p><strong>Text → Tokenization → Token IDs → Embedding Layer → Token Embeddings</strong></p>
    <ol>
      <li>Input text: <code>"Con mèo"</code></li>
      <li>Tokenizer chia: <code>["Con", "mèo"]</code></li>
      <li>Map sang IDs: <code>[142, 879]</code></li>
      <li>Embedding lookup: <code>E[142], E[879]</code> (mỗi cái là vector $d_{model}$ chiều)</li>
      <li>Final input: <code>[embedding_142, embedding_879]</code></li>
    </ol>
  </div>

  <h3>1.3. Các tham số embedding</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tham số</th>
        <th>Giá trị (Base)</th>
        <th>Giá trị (Big)</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Vocabulary size |V|</strong></td>
        <td>~30,000-50,000</td>
        <td>~50,000-100,000</td>
        <td>Số tokens trong từ điển</td>
      </tr>
      <tr>
        <td><strong>Embedding dim</strong></td>
        <td>512</td>
        <td>1024</td>
        <td>Kích thước vector mỗi token</td>
      </tr>
      <tr>
        <td><strong>Parameters</strong></td>
        <td>~15-25M</td>
        <td>~50-100M</td>
        <td>$|V| \\times d_{model}$</td>
      </tr>
    </tbody>
  </table>

  <div class="definition-block">
    <span class="definition-term">Embedding được học như thế nào?</span>
    <p>Giống như Word2Vec, embedding matrix $E$ là <strong>learnable parameter</strong>. Trong quá trình training, gradient backpropagation qua toàn bộ network sẽ cập nhật $E$ để embedding reflect ngữ nghĩa (từ相近 có embedding gần nhau trong không gian vector).</p>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: VẤN ĐỀ VỊ TRÍ
  // ==========================================================
  {
    id: 'ch23_02_02',
    title: '2. Vấn đề vị trí — Self-Attention không biết thứ tự',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Tại sao cần Positional Encoding?</h2>

  <h3>2.1. Self-Attention là phép toán "bag of words"</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Permutation Invariance — nhược điểm ẩn</span>
      <p>Self-Attention tính $\\text{softmax}(QK^T/\\sqrt{d_k})V$ — chỉ phụ thuộc vào <strong>nội dung</strong> các token, không phụ thuộc <strong>vị trí</strong>. Nếu hoán đổi thứ tự input: "mèo cắn chó" vs "chó cắn mèo" → Self-Attention cho <strong>cùng output</strong>!</p>
    </div>
  </div>

  <div class="definition-block">
    <span class="definition-term">So sánh: RNN tự biết vị trí</span>
    <p>RNN xử lý <strong>tuần tự</strong>: $h_t = f(h_{t-1}, x_t)$. Token thứ 3 nhận hidden state đã qua 2 tokens trước → <strong>vị trí được mã hóa ngầm</strong> trong hidden state.</p>
    <p>Transformer <strong>bỏ recurrence</strong> → mất thông tin vị trí → phải <strong>thêm vào explicitly</strong>.</p>
  </div>

  <h3>2.2. Giải pháp: Cộng vị trí vào embedding</h3>

  <div class="formula-block">
    <h4>Final Input:</h4>
    <p>$\text{Input}_i = \text{TokenEmbed}(x_i) + \text{PE}(\text{pos}_i)$</p>
    <p>Cộng (element-wise addition) giữa embedding và positional encoding. Cả 2 đều có kích thước $d_{model}$.</p>
  </div>

  <div class="image-showcase">
    <img src="/images/ch23/positional_encoding_concept.png" alt="Positional Encoding Concept" />
    <div class="image-caption">Hình 1: Token Embedding + Positional Encoding = Final Input</div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: SINUSOIDAL PE
  // ==========================================================
  {
    id: 'ch23_02_03',
    title: '3. Sinusoidal Positional Encoding — Công thức sin/cos',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
<div class="article-content">
  <h2>3. Mã hóa vị trí Sinusoidal — Công thức sin/cos</h2>

  <p>Vaswani et al. (2017) đề xuất dùng hàm sin và cos với tần số khác nhau để mã hóa vị trí. Đây là phương pháp <strong>không cần học</strong> — hoàn toàn deterministic, có thể generalize cho sequences dài hơn training.</p>

  <h3>3.1. Công thức</h3>

  <div class="formula-block">
    <h4>Định nghĩa Sinusoidal PE:</h4>
    <p>$PE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)$</p>
    <p>$PE_{(pos, 2i+1)} = \\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)$</p>
    <p>Trong đó:</p>
    <ul>
      <li>$pos$ = vị trí token (0, 1, 2, ...)</li>
      <li>$i$ = chiều encoding (0, 1, ..., $d_{model}/2 - 1$)</li>
      <li>$d_{model}$ = kích thước embedding (thường là 512)</li>
    </ul>
  </div>

  <h3>3.2. Ý nghĩa hình học</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Tần số giảm theo chiều</h4>
      <p>Chiều $i=0$: period = $2\\pi$ → tần số cao, thay đổi nhanh → phù hợp với vị trí gần nhau</p>
      <p>Chiều $i=d_{model}/2-1$: period = $2\\pi \\cdot 10000$ → tần số cực thấp, thay đổi rất chậm → phù hợp với vị trí xa</p>
      <p>Giống hệ thập phân: chữ số hàng đơn vị thay đổi liên tục, hàng nghìn thay đổi chậm.</p>
    </div>
    <div class="concept-card">
      <h4>Cặp sin-cos tạo tọa độ góc</h4>
      <p>Cặp $(PE_{2i}, PE_{2i+1}) = (\\sin(\\omega), \\/cos(\\omega))$ là một điểm trên <strong>đường tròn đơn vị</strong>.</p>
      <p>$PE_{pos+k}$ có thể biểu diễn từ $PE_{pos}$ qua <strong>phép biến đổi tuyến tính</strong> → model dễ dàng học được <strong>vị trí tương đối (relative position)</strong>.</p>
    </div>
  </div>

  <h3>3.3. Relative Position qua Sinusoidal</h3>

  <div class="definition-block">
    <span class="definition-term">Tại sao Sinusoidal encode relative position tốt?</span>
    <p>Dùng công thức cộng góc:</p>
    <p>$\\sin(a+b) = \\sin(a)\\cos(b) + \\cos(a)\\sin(b)$</p>
    <p>$\\cos(a+b) = \\cos(a)\\cos(b) - \\sin(a)\\sin(b)$</p>
    <p>Điều này có nghĩa: $PE_{pos+k}$ có thể được tính từ $PE_{pos}$ nhân với ma trận xoay. Model có thể học "khoảng cách $k$" thông qua weights.</p>
  </div>

  <h3>3.4. Minh họa trực quan</h3>

  <div class="image-showcase">
    <img src="/images/ch23/positional_encoding_heatmap.png" alt="Positional Encoding Heatmap" />
    <div class="image-caption">Hình 2: Heatmap Sinusoidal PE — 128 positions × 64 dims. Trục X: chiều encoding (tần số giảm dần). Trục Y: vị trí token</div>
  </div>

  <h3>3.5. Ví dụ số cụ thể</h3>

  <div class="definition-block">
    <span class="definition-term">Tính toán với $d_{model} = 4$, positions 0, 1, 2</span>
    <p>Với $i = 0$: tần số $\\omega = 1/10000^0 = 1$</p>
    <p>Với $i = 1$: tần số $\\omega = 1/10000^{2/4} = 1/10000^{0.5} = 1/100 = 0.01$</p>
    <p><strong>Position 0:</strong></p>
    <p>$PE(0) = [\\sin(0), \\/cos(0), \\sin(0), \\cos(0)] = [0, 1, 0, 1]$</p>
    <p><strong>Position 1:</strong></p>
    <p>$PE(1) = [\\sin(1), \\/cos(1), \\sin(0.01), \\cos(0.01)] = [0.84, 0.54, 0.01, 1.00]$</p>
    <p><strong>Position 2:</strong></p>
    <p>$PE(2) = [\\sin(2), \\/cos(2), \\sin(0.02), \\cos(0.02)] = [0.91, -0.42, 0.02, 1.00]$</p>
    <p><strong>Nhận xét:</strong></p>
    <ul>
      <li>Chiều 0-1 (tần số cao): thay đổi mạnh qua mỗi position</li>
      <li>Chiều 2-3 (tần số thấp): thay đổi rất chậm</li>
    </ul>
  </div>

  <h3>3.6. Ưu và nhược điểm</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Ưu điểm</th>
        <th>Nhược điểm</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Không cần học, không tốn tham số</td>
        <td>Encode absolute position, không phải relative</td>
      </tr>
      <tr>
        <td>Extrapolate được cho sequence dài hơn training</td>
        <td>Không có bias cho position > max_len</td>
      </tr>
      <tr>
        <td>Relative position được encode ngầm qua sin/cos relationship</td>
        <td>Khó học position > 1000 hiệu quả</td>
      </tr>
    </tbody>
  </table>
</div>

    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: CÁC LOẠI PE KHÁC
  // ==========================================================
  {
    id: 'ch23_02_04',
    title: '4. Learned PE, RoPE — Xu hướng hiện đại',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Các phương pháp Positional Encoding khác</h2>

  <h3>4.1. Learned Positional Embedding</h3>

  <div class="definition-block">
    <span class="definition-term">Học vị trí thay vì tính</span>
    <p>Thay vì dùng sin/cos cố định, tạo ma trận $P \\in \\mathbb{R}^{T_{max} \\times d_{model}}$ làm <strong>learnable parameter</strong>. Mỗi hàng là PE cho 1 vị trí, được cập nhật qua SGD như weight thường.</p>
    <p>Dùng trong: <strong>BERT</strong>, <strong>GPT-2</strong>. Nhược điểm: không generalize được cho sequences dài hơn $T_{max}$ trong training.</p>
  </div>

  <h3>4.2. RoPE — Rotary Position Embedding</h3>

  <div class="definition-block">
    <span class="definition-term">Su et al., 2021 — Dùng trong LLaMA, Gemma, Mistral</span>
    <p>Thay vì <strong>cộng</strong> PE vào embedding, RoPE <strong>xoay</strong> (rotate) Q và K vectors theo vị trí:</p>
    <p>$q'_m = R_\\theta(m) \\cdot q_m$, &nbsp; $k'_n = R_\\theta(n) \\cdot k_n$</p>
    <p>Trong đó $R_\\theta(m)$ là ma trận xoay theo góc $m \\cdot \\theta_i$. Ưu điểm: $q'_m \\cdot k'_n$ chỉ phụ thuộc vào <strong>khoảng cách tương đối $m - n$</strong> → tự nhiên encode relative position.</p>
  </div>

  <h3>4.3. So sánh</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Phương pháp</th>
        <th>Dùng trong</th>
        <th>Absolute/Relative</th>
        <th>Extrapolate?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Sinusoidal</strong></td>
        <td>Transformer gốc</td>
        <td>Absolute</td>
        <td>Có (lý thuyết)</td>
      </tr>
      <tr>
        <td><strong>Learned</strong></td>
        <td>BERT, GPT-2</td>
        <td>Absolute</td>
        <td>Không</td>
      </tr>
      <tr>
        <td><strong>RoPE</strong></td>
        <td>LLaMA, Gemma, Mistral</td>
        <td>Relative</td>
        <td>Tốt hơn (với NTK scaling)</td>
      </tr>
      <tr>
        <td><strong>ALiBi</strong></td>
        <td>BLOOM</td>
        <td>Relative (bias)</td>
        <td>Tốt</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
];

const ch23_02: Chapter = {
  id: 'ch23_02',
  title: '23.2. Input Processing — Embedding & Positional Encoding',
  introduction: 'Token Embedding, Positional Encoding (Sinusoidal sin/cos), Learned PE, RoPE — cách Transformer biết thứ tự tokens.',
  lessons: ch23_02_lessons,
};

export default ch23_02;
