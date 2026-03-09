import * as monaco from 'monaco-editor';
import { courseData, type Lesson, type Chapter, generateCPContent } from './courses';
import { ProgressManager } from './progress';

// =====================================================
// KaiRust - Main Application Logic
// =====================================================

let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null;
let flatLessons: Lesson[] = [];
let currentLessonIndex = -1;
let lessonStartTime = 0;
const readLessons = new Set<string>();

// ---- Monaco Editor Setup ----
const initEditor = () => {
    const container = document.getElementById('editor');
    if (!container) return;

    // Define NEON FUTURIST Dark theme (for dark mode)
    monaco.editor.defineTheme('neuro-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', foreground: 'e8e8e8' },
            { token: 'keyword', foreground: '00f5a0', fontStyle: 'bold' },
            { token: 'number', foreground: '7b61ff' },
            { token: 'string', foreground: 'ffd60a' },
            { token: 'comment', foreground: '606060', fontStyle: 'italic' },
            { token: 'type', foreground: 'ffd60a' },
            { token: 'function', foreground: '00f5a0' },
            { token: 'variable', foreground: 'e8e8e8' },
            { token: 'constant', foreground: '7b61ff' },
        ],
        colors: {
            'editor.background': '#0a0a0f',
            'editor.foreground': '#e8e8e8',
            'editor.lineHighlightBackground': '#12121a',
            'editorCursor.foreground': '#00f5a0',
            'editor.selectionBackground': 'rgba(0, 245, 160, 0.2)',
            'editorLineNumber.foreground': '#606060',
            'editorLineNumber.activeForeground': '#00f5a0',
            'editor.inactiveSelectionBackground': '#0f0f14',
            'editorIndentGuide.background': '#1a1a24',
            'editorIndentGuide.activeBackground': '#2a2a34',
        }
    });

    // Define a custom Modern Light theme
    monaco.editor.defineTheme('modern-light', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: '', foreground: '1c1917' },
            { token: 'keyword', foreground: 'a855f7', fontStyle: 'bold' },
            { token: 'number', foreground: '3b82f6' },
            { token: 'string', foreground: '27e627' },
            { token: 'comment', foreground: 'a8a29e', fontStyle: 'italic' },
            { token: 'type', foreground: 'ec4899' },
            { token: 'function', foreground: 'a855f7' },
            { token: 'variable', foreground: '1c1917' },
            { token: 'constant', foreground: 'f59e0b' },
        ],
        colors: {
            'editor.background': '#ffffff',
            'editor.foreground': '#1c1917',
            'editor.lineHighlightBackground': '#fafaf9',
            'editorCursor.foreground': '#a67c52',
            'editor.selectionBackground': '#e0e7ff',
            'editorLineNumber.foreground': '#a8a29e',
            'editorLineNumber.activeForeground': '#a67c52',
            'editor.inactiveSelectionBackground': '#f5f5f4',
            'editorIndentGuide.background': '#e5e5e5',
            'editorIndentGuide.activeBackground': '#d4d4d4',
        }
    });

    const defaultCode = `// Chào mừng đến với KaiRust!
// Hãy chọn một bài học để bắt đầu.

fn main() {
    println!("Hello, KaiRust!");
}
`;

    editorInstance = monaco.editor.create(container, {
        value: defaultCode,
        language: 'rust',
        theme: 'modern-light',
        automaticLayout: true,
        minimap: { enabled: false },
        fontFamily: "'DM Sans', monospace",
        fontSize: 14,
        lineHeight: 24,
        padding: { top: 16 }
    });
};

// ---- Curriculum Sidebar Rendering ----
const renderCurriculum = () => {
    const list = document.getElementById('curriculum-list');
    if (!list) return;

    list.innerHTML = '';
    flatLessons = [];
    courseData.forEach(chapter => {
        // Chapter header (accordion toggle)
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-group';

        const chapterHeader = document.createElement('div');
        chapterHeader.className = 'chapter-header';
        chapterHeader.innerHTML = `
        <span class="material-symbols-outlined chapter-arrow">expand_more</span>
        <span class="chapter-title">${chapter.title}</span>
        <span class="chapter-count">${chapter.lessons.length}</span>
    `;

        const lessonList = document.createElement('div');
        lessonList.className = 'lesson-list';

        // Default first chapter open
        if (chapter.id === 'ch01') {
            chapterHeader.classList.add('open');
            lessonList.classList.add('open');
        }

        chapter.lessons.forEach(lesson => {
            flatLessons.push(lesson);
            const lessonItem = document.createElement('div');
            lessonItem.className = 'lesson-item';
            lessonItem.dataset.lessonId = lesson.id;

            const typeIcon = lesson.type === 'theory' ? 'article' :
                lesson.type === 'practice' ? 'code' : 'quiz';

            lessonItem.innerHTML = `
        <span class="material-symbols-outlined lesson-icon">${typeIcon}</span>
        <span class="lesson-name">${lesson.title}</span>
        <span class="lesson-time">${lesson.duration}</span>
      `;

            if (ProgressManager.isCompleted(lesson.id)) {
                lessonItem.classList.add('completed');
            }

            lessonItem.addEventListener('click', () => selectLesson(lesson));
            lessonList.appendChild(lessonItem);
        });

        // If no lessons, show "coming soon"
        if (chapter.lessons.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.className = 'lesson-placeholder';
            placeholder.textContent = 'Sắp ra mắt...';
            lessonList.appendChild(placeholder);
        }

        chapterHeader.addEventListener('click', () => {
            chapterHeader.classList.toggle('open');
            lessonList.classList.toggle('open');
            // Show chapter introduction when opened
            if (chapterHeader.classList.contains('open')) {
                showChapterIntroduction(chapter);
            }
        });

        chapterDiv.appendChild(chapterHeader);
        chapterDiv.appendChild(lessonList);
        list.appendChild(chapterDiv);
    });
};

// ---- Chapter Introduction Display ----
const showChapterIntroduction = (chapter: Chapter) => {
    const titleEl = document.getElementById('lesson-title');
    if (titleEl) titleEl.textContent = chapter.title;

    // Clear badge and duration for chapter intro
    const typeEl = document.getElementById('lesson-type');
    if (typeEl) {
        typeEl.textContent = 'intro';
        typeEl.className = 'lesson-badge badge-intro';
    }

    const durEl = document.getElementById('lesson-duration');
    if (durEl) durEl.textContent = '';

    // Hide submit button for chapter intro
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.classList.add('hidden');

    // Show chapter introduction content
    const contentEl = document.getElementById('lesson-content');
    if (contentEl) {
        contentEl.innerHTML = chapter.introduction;
    }

    // Reset scrolling
    const scrollArea = document.getElementById('panel-scroll-area');
    if (scrollArea) scrollArea.scrollTop = 0;

    // Clear editor
    if (editorInstance) {
        editorInstance.setValue('// Chọn một bài học để bắt đầu.\n');
    }

    // Clear terminal
    clearTerminal();

    // Clear active lesson highlight
    document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));

    // Reset current lesson index
    currentLessonIndex = -1;
    updateNavButtons();
};

// ---- Lesson Selection ----
const selectLesson = (lesson: Lesson, restoreScrollPosition: number | null = null) => {
    // Toggle Submit Button and Terminal Stdin
    const submitBtn = document.getElementById('submit-btn');
    const stdinInput = document.getElementById('terminal-stdin') as HTMLInputElement | null;

    if (lesson.type === 'practice') {
        if (submitBtn) submitBtn.classList.remove('hidden');
    } else {
        if (submitBtn) submitBtn.classList.add('hidden');
    }

    // STDIN luôn được mở khóa để học viên chạy code thử
    if (stdinInput) {
        stdinInput.disabled = false;
        stdinInput.placeholder = "Nhập chuẩn STDIN vào đây và bấm Enter...";
        stdinInput.classList.remove('disabled-input');
    }

    // Mark previous lesson as read (just for session tracking)
    if (currentLessonIndex >= 0) {
        const prevLesson = flatLessons[currentLessonIndex];
        readLessons.add(prevLesson.id);
        const prevEl = document.querySelector(`[data-lesson-id="${prevLesson.id}"]`);
        if (prevEl) prevEl.classList.add('read');
    }

    // Set new start time for the selected lesson
    lessonStartTime = Date.now();

    currentLessonIndex = flatLessons.findIndex(l => l.id === lesson.id);
    updateNavButtons();

    // Update title
    const titleEl = document.getElementById('lesson-title');
    if (titleEl) titleEl.textContent = lesson.title;

    // Update badge
    const typeEl = document.getElementById('lesson-type');
    if (typeEl) {
        typeEl.textContent = lesson.type;
        typeEl.className = `lesson-badge badge-${lesson.type}`;
    }

    // Update duration
    const durEl = document.getElementById('lesson-duration');
    if (durEl) durEl.textContent = lesson.duration;

    // Update content (use CP format if available)
    const contentEl = document.getElementById('lesson-content');
    if (contentEl) contentEl.innerHTML = generateCPContent(lesson);

    // Handle scroll position (restore if specified, otherwise reset to top)
    const scrollArea = document.getElementById('panel-scroll-area');
    if (scrollArea) {
        if (restoreScrollPosition !== null && restoreScrollPosition > 0) {
            // Restore scroll position after a short delay to ensure content is rendered
            setTimeout(() => {
                scrollArea.scrollTop = restoreScrollPosition;
            }, 100);
        } else {
            // Default: reset to top
            scrollArea.scrollTop = 0;
        }
    }

    // Re-check scroll conditions immediately after rendering
    setTimeout(() => {
        checkUnlockNext();
    }, 50);

    // Update editor
    if (editorInstance && lesson.defaultCode) {
        editorInstance.setValue(lesson.defaultCode);
    }

    // Clear terminal and reset stats
    clearTerminal();

    // Reset stats to show limits from the new lesson
    const lessonAny = lesson as any;
    const defaultMem = lessonAny.memoryLimit || '—';
    const defaultTime = lessonAny.timeLimit ? `${parseFloat(lessonAny.timeLimit.replace('s', '')) * 1000}ms` : '—';
    updateStats(defaultMem, defaultTime, lessonAny.memoryLimit, lessonAny.timeLimit);

    // Highlight active lesson in sidebar (remove active, keep read)
    document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
    const activeEl = document.querySelector(`[data-lesson-id="${lesson.id}"]`);
    if (activeEl) {
        activeEl.classList.add('active');
        activeEl.classList.remove('read'); // active overrides read visually
    }

    // Restore .read on all previously read lessons
    readLessons.forEach(id => {
        if (id !== lesson.id) {
            const el = document.querySelector(`[data-lesson-id="${id}"]`);
            if (el && !el.classList.contains('read')) el.classList.add('read');
        }
    });

    // Update progress
    updateProgress();

    // Save learning state to localStorage (with current scroll position)
    const currentScrollPosition = scrollArea ? scrollArea.scrollTop : 0;
    const currentChapter = courseData.find(ch =>
        ch.lessons.some(l => l.id === lesson.id)
    );
    if (currentChapter) {
        ProgressManager.saveLearningState(lesson.id, currentChapter.id, currentScrollPosition);
    }

    // Setup inline code runners for the new content
    setupInlineCodeRunners();
};

// ---- Terminal ----
const clearTerminal = () => {
    const log = document.getElementById('terminal-log');
    if (log) {
        log.innerHTML = `<span class="log-prompt">$</span> <span class="log-info">Chờ lệnh...</span>`;
    }
    const stdinInput = document.getElementById('terminal-stdin') as HTMLInputElement | null;
    if (stdinInput) {
        stdinInput.value = '';
    }
};

const appendTerminal = (html: string) => {
    const log = document.getElementById('terminal-log');
    if (log) {
        log.innerHTML += '\n' + html;
        const container = log.parentElement;
        if (container) container.scrollTop = container.scrollHeight;
    }
};

// ---- Backend Connection Config ----
const BACKEND_WS_URL = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host + '/ws/run';
let activeWs: WebSocket | null = null;
let isSubmitting = false;

// ---- Run & Submit Logic via WebSocket ----
const startCodeExecution = (is_test: boolean) => {
    if (!editorInstance) return;
    const code = editorInstance.getValue();

    // Close previous connection
    if (activeWs) {
        activeWs.close();
        activeWs = null;
    }

    clearTerminal();

    // UI state
    isSubmitting = is_test;
    const runBtn = document.getElementById('run-btn') as HTMLButtonElement | null;
    const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;
    if (runBtn) runBtn.disabled = true;
    if (submitBtn) submitBtn.disabled = true;

    if (is_test) {
        appendTerminal(`<span class="log-prompt">$</span> Chấm điểm bài làm...`);
    } else {
        appendTerminal(`<span class="log-prompt">$</span> rustc main.rs && ./main`);
    }

    const ws = new WebSocket(BACKEND_WS_URL);
    activeWs = ws;

    ws.onopen = () => {
        let payload: any = { type: 'run', code: code, is_test };

        // Gửi kèm lesson_id và stdin nếu đây là bài exercise
        if (is_test && currentLessonIndex >= 0) {
            const lesson = flatLessons[currentLessonIndex];
            if (lesson.type === 'practice') {
                payload.lesson_id = lesson.id;

                // Gửi stdin từ testCases (lấy test case đầu tiên)
                const lessonAny = lesson as any;
                if (lessonAny.testCases && lessonAny.testCases.length > 0) {
                    payload.stdin = lessonAny.testCases[0].input;
                }
            }
        }

        // Send compile/run command
        ws.send(JSON.stringify(payload));
    };

    ws.onmessage = (event) => {
        try {
            const msg = JSON.parse(event.data);
            switch (msg.type) {
                case 'compiling':
                    appendTerminal(`<span class="log-info">Compiling...</span>`);
                    break;
                case 'compile_error':
                    appendTerminal(`<span class="log-error">${escapeHtml(msg.stderr)}</span>`);
                    updateStats('—', '—');
                    ws.close();
                    // Reset test output
                    (window as any).__testOutput = '';
                    break;
                case 'running':
                    appendTerminal(`<span class="log-info">Running...</span>`);
                    break;
                case 'stdout':
                    appendTerminal(`<span class="log-success">${escapeHtml(msg.data)}</span>`);
                    // Lưu output để so sánh khi là bài tập
                    if (isSubmitting && currentLessonIndex >= 0) {
                        const lesson = flatLessons[currentLessonIndex];
                        if (lesson.type === 'practice' && (lesson as any).expectedOutput !== undefined) {
                            (window as any).__testOutput = ((window as any).__testOutput || '') + msg.data;
                        }
                    }
                    break;
                case 'stderr':
                    appendTerminal(`<span class="log-warning">${escapeHtml(msg.data)}</span>`);
                    break;
                case 'exit':
                    const exitClass = msg.code === 0 ? 'log-info' : 'log-error';
                    const memoryKb = msg.memory_usage_kb || 0;
                    const memoryStr = memoryKb > 0 ? `${Math.round(memoryKb / 1024)}MB` : '—';
                    appendTerminal(`<span class="${exitClass}">[Exited with code ${msg.code}] (${msg.execution_time_ms}ms, ${memoryStr})</span>`);

                    // Get limits from current lesson
                    const lessonAny = currentLessonIndex >= 0 ? flatLessons[currentLessonIndex] as any : null;
                    const memLimit = lessonAny?.memoryLimit;
                    const timeLimit = lessonAny?.timeLimit;
                    updateStats(memoryStr, `${msg.execution_time_ms}ms`, memLimit, timeLimit);

                    // Display Exercise result when submitting
                    if (isSubmitting && currentLessonIndex >= 0) {
                        const lesson = flatLessons[currentLessonIndex];
                        if (lesson.type === 'practice') {
                            // Lấy expected output từ lesson
                            const lessonAny = lesson as any;
                            const expectedOutput = lessonAny.expectedOutput;
                            const testOutput = (window as any).__testOutput || '';
                            const testPassed = msg.code === 0 && expectedOutput && testOutput.trim() === expectedOutput.trim();

                            if (testPassed) {
                                appendTerminal(`<br><span class="log-success" style="font-weight:bold; font-size:1.1rem">CHÚC MỪNG BẠN ĐÃ VƯỢT QUA BÀI TẬP!</span>`);
                                appendTerminal(`<span class="log-info">Bạn đã xuất sắc hoàn thành tất cả các Testcase. Tiếp tục phát huy nhé!</span>`);
                                ProgressManager.markCompleted(lesson.id);
                                const activeEl = document.querySelector(`[data-lesson-id="${lesson.id}"]`);
                                if (activeEl) {
                                    activeEl.classList.add('passed');
                                    activeEl.classList.add('completed');
                                }
                                unlockNextLesson();
                            } else {
                                appendTerminal(`<br><span class="log-error" style="font-weight:bold; font-size:1.1rem">RẤT TIẾC, CHƯA ĐẠT YÊU CẦU.</span>`);
                                if (expectedOutput) {
                                    appendTerminal(`<span class="log-warning">Expected: ${escapeHtml(expectedOutput)}</span>`);
                                    appendTerminal(`<span class="log-warning">Got: ${escapeHtml(testOutput.trim())}</span>`);
                                }
                                appendTerminal(`<span class="log-warning">Hãy đọc kỹ lỗi bên trên và kiểm tra lại mã của mình. Cố lên!</span>`);
                            }
                            // Reset test output
                            (window as any).__testOutput = '';
                        }
                    }
                    ws.close();
                    break;
                case 'error':
                    appendTerminal(`<span class="log-error">Error: ${escapeHtml(msg.message)}</span>`);
                    ws.close();
                    break;
            }
        } catch {
            // ignore parse errors
        }
    };

    ws.onerror = () => {
        appendTerminal(`<span class="log-error">Lỗi kết nối Backend. Đảm bảo bạn có kết nối internet và server đang chạy.</span>`);
    };

    ws.onclose = () => {
        activeWs = null;
        setTimeout(() => {
            const currentRunBtn = document.getElementById('run-btn') as HTMLButtonElement | null;
            const currentSubmitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;
            if (currentRunBtn) currentRunBtn.disabled = false;
            if (currentSubmitBtn) currentSubmitBtn.disabled = false;
        }, 1000);
    };
};

const setupRunButton = () => {
    const runBtn = document.getElementById('run-btn');
    runBtn?.addEventListener('click', () => startCodeExecution(false));

    const submitBtn = document.getElementById('submit-btn');
    submitBtn?.addEventListener('click', () => startCodeExecution(true));
};

const setupStdinInput = () => {
    const stdin = document.getElementById('terminal-stdin') as HTMLInputElement;
    if (!stdin) return;
    stdin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = stdin.value;
            if (activeWs && activeWs.readyState === WebSocket.OPEN && !isSubmitting) {
                appendTerminal(`<span class="user-input">${escapeHtml(val)}</span>`);
                activeWs.send(JSON.stringify({ type: 'stdin', data: val + '\n' }));
                stdin.value = '';
            } else if (!activeWs) {
                appendTerminal(`<span class="log-warning">Terminal: Chưa có tiến trình nào đang chạy để nhận STDIN.</span>`);
            } else if (isSubmitting) {
                appendTerminal(`<span class="log-warning">Terminal: Đang trong quá trình tự động Chấm Điểm, không thể nhập liệu.</span>`);
            }
        }
    });
};

// ---- Inline Code Runners (inside lesson content) ----
const setupInlineCodeRunners = () => {
    const snippets = document.querySelectorAll('.code-snippet');
    snippets.forEach(snippet => {
        // Skip already processed
        if (snippet.querySelector('.code-snippet-header')) return;

        const langEl = snippet.querySelector('.code-lang');
        const preEl = snippet.querySelector('pre');
        if (!langEl || !preEl) return;

        const langText = langEl.textContent || 'code';

        // Remove old positioned lang label
        langEl.remove();

        // Create header bar
        const header = document.createElement('div');
        header.className = 'code-snippet-header';

        // Lang label (left)
        const newLang = document.createElement('span');
        newLang.className = 'code-lang';
        newLang.textContent = langText;
        header.appendChild(newLang);

        // Action group (right)
        const actionGroup = document.createElement('div');
        actionGroup.className = 'code-action-group';

        // Copy button (always show)
        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-copy-btn';
        copyBtn.innerHTML = `<span class="material-symbols-outlined">content_copy</span> Copy`;

        copyBtn.addEventListener('click', () => {
            const codeEl = preEl.querySelector('code');
            if (!codeEl) return;
            let text = codeEl.textContent || '';

            // If bash/cmd/powershell, clean prefixes like '$ ' or '> '
            if (['bash', 'cmd', 'powershell'].includes(langText.toLowerCase())) {
                text = text.split('\n').map(line => {
                    return line.replace(/^(\$|>)\s?/, '');
                }).join('\n');
            }

            navigator.clipboard.writeText(text).then(() => {
                copyBtn.classList.add('copied');
                copyBtn.innerHTML = `<span class="material-symbols-outlined">check</span> Copied!`;
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.innerHTML = `<span class="material-symbols-outlined">content_copy</span> Copy`;
                }, 2000);
            });
        });
        actionGroup.appendChild(copyBtn);

        // Run button (only for rust code)
        if (langText.toLowerCase() === 'rust') {
            const runBtn = document.createElement('button');
            runBtn.className = 'code-run-btn';
            runBtn.innerHTML = `<span class="material-symbols-outlined">play_arrow</span> Run`;

            // Create output area
            const outputArea = document.createElement('div');
            outputArea.className = 'code-output';
            snippet.appendChild(outputArea);

            runBtn.addEventListener('click', () => {
                const codeEl = preEl.querySelector('code');
                if (!codeEl) return;
                const code = codeEl.textContent || '';

                // Show loading
                outputArea.classList.add('visible');
                outputArea.innerHTML = `<span class="output-label">Output</span><span style="color:var(--text-muted)">Đang biên dịch...</span>`;
                runBtn.disabled = true;

                const ws = new WebSocket(BACKEND_WS_URL);
                let output = '';

                ws.onopen = () => {
                    ws.send(JSON.stringify({ type: 'run', code }));
                };

                ws.onmessage = (event) => {
                    try {
                        const msg = JSON.parse(event.data);
                        switch (msg.type) {
                            case 'compile_error':
                                output = msg.stderr;
                                outputArea.innerHTML = `<span class="output-label">Compiler Error</span><span class="output-error">${escapeHtml(output)}</span>`;
                                ws.close();
                                break;
                            case 'stdout':
                                output += msg.data;
                                outputArea.innerHTML = `<span class="output-label">Output</span><span class="output-success">${escapeHtml(output)}</span>`;
                                break;
                            case 'stderr':
                                output += msg.data;
                                outputArea.innerHTML = `<span class="output-label">Stderr</span><span class="output-error">${escapeHtml(output)}</span>`;
                                break;
                            case 'exit':
                                if (!output) {
                                    outputArea.innerHTML = `<span class="output-label">Output</span><span style="color:var(--text-muted)">(Không có output)</span>`;
                                }
                                ws.close();
                                break;
                            case 'error':
                                outputArea.innerHTML = `<span class="output-label">Error</span><span class="output-error">${escapeHtml(msg.message)}</span>`;
                                ws.close();
                                break;
                        }
                    } catch { /* ignore */ }
                };

                ws.onerror = () => {
                    outputArea.innerHTML = `<span class="output-label">Error</span><span class="output-error">Lỗi kết nối. Server có thể chưa chạy.</span>`;
                };

                ws.onclose = () => {
                    setTimeout(() => {
                        runBtn.disabled = false;
                    }, 1000);
                };
            });

            actionGroup.appendChild(runBtn);
        }

        header.appendChild(actionGroup);

        // Insert header before pre
        snippet.insertBefore(header, preEl);
    });
};

// ---- Update Technical Stats ----
// Hiển thị: "Memory: X MB / Y MB" và "Time: X ms / Y ms"
// memory/execTime là giá trị thực tế, memoryLimit/timeLimit là giới hạn từ bài tập
const updateStats = (memory: string, execTime: string, memoryLimit?: string, timeLimit?: string) => {
    const memEl = document.querySelector('.highlight-blue');
    const timeEl = document.querySelector('.highlight-pink');

    // Hiển thị memory: "X MB / Y MB" hoặc "X MB" nếu không có limit
    if (memEl) {
        if (memoryLimit && memory !== '—') {
            memEl.textContent = `${memory} / ${memoryLimit}`;
        } else {
            memEl.textContent = memory;
        }
    }

    // Hiển thị time: "X ms / Y s" hoặc "X ms" nếu không có limit
    if (timeEl) {
        if (timeLimit && execTime !== '—') {
            // timeLimit format: "1s", "2s", etc - convert to ms
            const limitMs = parseFloat(timeLimit.replace('s', '')) * 1000;
            timeEl.textContent = `${execTime} / ${limitMs}ms`;
        } else {
            timeEl.textContent = execTime;
        }
    }
};

// ---- Escape HTML for safe terminal rendering ----
const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// ---- Clear Button ----
const setupClearButton = () => {
    const clearBtn = document.getElementById('clear-btn');
    clearBtn?.addEventListener('click', clearTerminal);
};

// ---- Progress ----
const updateProgress = () => {
    const totalLessons = courseData.reduce((acc, ch) => acc + ch.lessons.length, 0);
    // For now, just show total count
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    if (progressText) progressText.textContent = `${totalLessons} Bài có sẵn`;
    if (progressFill) progressFill.style.width = '0%';
};

// ---- Navigation & Resizers ----
const updateNavButtons = () => {
    const prevBtn = document.getElementById('btn-prev') as HTMLButtonElement | null;
    const nextBtn = document.getElementById('btn-next') as HTMLButtonElement | null;

    if (prevBtn) {
        prevBtn.disabled = currentLessonIndex <= 0;
    }
    if (nextBtn) {
        // Vô hiệu hóa tạm thời, nút này sẽ được bật nếu người dùng đã cuộn xuống hết bài
        nextBtn.disabled = true;
    }
};

const unlockNextLesson = () => {
    const nextBtn = document.getElementById('btn-next') as HTMLButtonElement | null;
    if (nextBtn && currentLessonIndex !== -1 && currentLessonIndex < flatLessons.length - 1) {
        nextBtn.disabled = false;
    }
};

// Helpers: parse "15 phút" -> required time in ms
const parseDurationMs = (durationStr: string): number => {
    const match = durationStr.match(/(\d+)/);
    if (match) {
        const minutes = parseInt(match[1], 10);
        return minutes * 60 * 1000;
    }
    return 0; // default 0 if can't parse
};

const checkUnlockNext = () => {
    if (currentLessonIndex === -1) return;

    const scrollArea = document.getElementById('panel-scroll-area');
    if (!scrollArea) return;

    const currentLesson = flatLessons[currentLessonIndex];

    // Nếu bài tập (practice), bắt buộc phải pass testcase mới qua bài.
    // Việc mở khóa cho bài practice được handle ở ws.onmessage exit code 0
    if (currentLesson.type === 'practice') {
        if (ProgressManager.isCompleted(currentLesson.id)) {
            unlockNextLesson();
        }
        return;
    }

    // Allow 10px buffer
    const isAtBottom = scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight <= 10;

    if (isAtBottom) {
        const reqTimeMs = parseDurationMs(currentLesson.duration) / 2;
        const timeSpent = Date.now() - lessonStartTime;

        if (timeSpent >= reqTimeMs) {
            ProgressManager.markCompleted(currentLesson.id);
            const activeEl = document.querySelector(`[data-lesson-id="${currentLesson.id}"]`);
            if (activeEl) {
                activeEl.classList.add('completed');
            }
            unlockNextLesson();
        } else {
            // Đặt lịch kiểm tra lại ngay khi thời gian đủ
            setTimeout(() => {
                // Kiểm tra lại nếu người dùng chưa chuyển bài và vẫn đang ở bottom
                if (currentLessonIndex !== -1 && flatLessons[currentLessonIndex].id === currentLesson.id) {
                    const latestIsAtBottom = scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight <= 10;
                    if (latestIsAtBottom) {
                        ProgressManager.markCompleted(currentLesson.id);
                        const activeEl = document.querySelector(`[data-lesson-id="${currentLesson.id}"]`);
                        if (activeEl) {
                            activeEl.classList.add('completed');
                        }
                        unlockNextLesson();
                    }
                }
            }, reqTimeMs - timeSpent);
        }
    }
};

const setupNavButtons = () => {
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const scrollArea = document.getElementById('panel-scroll-area');

    prevBtn?.addEventListener('click', () => {
        if (currentLessonIndex > 0) {
            selectLesson(flatLessons[currentLessonIndex - 1]);
        }
    });

    nextBtn?.addEventListener('click', () => {
        if (currentLessonIndex >= 0 && currentLessonIndex < flatLessons.length - 1) {
            selectLesson(flatLessons[currentLessonIndex + 1]);
        }
    });

    if (scrollArea) {
        scrollArea.addEventListener('scroll', checkUnlockNext);
    }
};

// ---- Layout Settings - Save/Load from localStorage ----
const LAYOUT_STORAGE_KEY = 'kairust_layout_settings';

interface LayoutSettings {
    sidebarWidth: number;
    instructionWidth: number;
    editorColumnWidth: number;
    terminalHeight: number;
}

const saveLayoutSettings = () => {
    const sidebar = document.getElementById('sidebar-curriculum');
    const instruction = document.getElementById('instruction-panel');
    const editorColumn = document.getElementById('editor-column');
    const terminalPanel = document.getElementById('terminal-panel');

    const settings: LayoutSettings = {
        sidebarWidth: sidebar?.getBoundingClientRect().width || 240,
        instructionWidth: instruction?.getBoundingClientRect().width || 400,
        editorColumnWidth: editorColumn?.getBoundingClientRect().width || 200,
        terminalHeight: terminalPanel?.getBoundingClientRect().height || 100,
    };

    localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(settings));
};

const loadLayoutSettings = () => {
    const settingsJson = localStorage.getItem(LAYOUT_STORAGE_KEY);
    if (!settingsJson) return;

    try {
        const settings: LayoutSettings = JSON.parse(settingsJson);

        const sidebar = document.getElementById('sidebar-curriculum');
        const instruction = document.getElementById('instruction-panel');
        const editorColumn = document.getElementById('editor-column');
        const terminalPanel = document.getElementById('terminal-panel');

        // Only apply reasonable values (min 180px for sidebar)
        if (sidebar && settings.sidebarWidth >= 180) {
            sidebar.style.width = `${settings.sidebarWidth}px`;
            sidebar.style.flex = '0 0 auto';
        }

        // Apply instruction width if saved
        if (instruction && settings.instructionWidth >= 250) {
            instruction.style.width = `${settings.instructionWidth}px`;
            instruction.style.flex = '0 0 auto';
        }

        // Editor column tự tính dựa trên window width
        if (editorColumn && settings.editorColumnWidth >= 100) {
            editorColumn.style.width = `${settings.editorColumnWidth}px`;
            editorColumn.style.flex = '0 0 auto';
        }

        // Terminal height
        if (terminalPanel && settings.terminalHeight >= 80) {
            terminalPanel.style.height = `${settings.terminalHeight}px`;
            terminalPanel.style.flex = '0 0 auto';
        }

        // Apply CSS variables
        if (settings.sidebarWidth >= 180) {
            document.documentElement.style.setProperty('--sidebar-width', `${settings.sidebarWidth}px`);
        }
    } catch (e) {
        console.error('Failed to load layout settings:', e);
    }
};

// ---- Theme Toggle Setup ----
const setupThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('kairust-theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcons(true);
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('kairust-theme', 'light');
            updateThemeIcons(false);
            if (editorInstance) {
                monaco.editor.setTheme('modern-light');
            }
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('kairust-theme', 'dark');
            updateThemeIcons(true);
            if (editorInstance) {
                monaco.editor.setTheme('neuro-dark');
            }
        }
    });
};

const updateThemeIcons = (isDark: boolean) => {
    const lightIcon = document.querySelector('.theme-toggle .light-icon') as HTMLElement;
    const darkIcon = document.querySelector('.theme-toggle .dark-icon') as HTMLElement;
    if (lightIcon && darkIcon) {
        lightIcon.style.display = isDark ? 'none' : 'inline';
        darkIcon.style.display = isDark ? 'inline' : 'none';
    }
};

const setupResizers = () => {
    const resizerSidebar = document.getElementById('resizer-sidebar');
    const resizerInstruction = document.getElementById('resizer-instruction');
    const resizerEditorTerminal = document.getElementById('resizer-editor-terminal');

    const sidebar = document.getElementById('sidebar-curriculum');
    const instruction = document.getElementById('instruction-panel');
    const codeWorkspace = document.getElementById('code-workspace');
    const terminalPanel = document.getElementById('terminal-panel');

    // Sidebar Resizer
    if (resizerSidebar && sidebar) {
        let isResizing = false;
        resizerSidebar.addEventListener('mousedown', (e) => { e.preventDefault(); isResizing = true; resizerSidebar.classList.add('dragging'); });
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            const newWidth = e.clientX;
            sidebar.style.flex = `0 0 ${newWidth}px`;
            if (editorInstance) editorInstance.layout();
        });
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                resizerSidebar.classList.remove('dragging');
                saveLayoutSettings();
                if (editorInstance) editorInstance.layout();
            }
        });
    }

    // Instruction Resizer - chỉ resize cột instruction
    if (resizerInstruction && sidebar && instruction) {
        let isResizing = false;
        resizerInstruction.addEventListener('mousedown', (e) => { e.preventDefault(); isResizing = true; resizerInstruction.classList.add('dragging'); });
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            const sidebarRect = sidebar.getBoundingClientRect();
            const editorColumn = document.getElementById('editor-column');

            // Tính width mới cho instruction
            let newWidth = e.clientX - sidebarRect.width;
            newWidth = Math.max(250, Math.min(newWidth, window.innerWidth - 300));

            instruction.style.width = `${newWidth}px`;
            instruction.style.flex = '0 0 none';

            // Editor column sẽ tự động fill phần còn lại
            if (editorColumn) {
                editorColumn.style.flex = '1';
                editorColumn.style.minWidth = '100px';
            }

            if (editorInstance) editorInstance.layout();
        });
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                resizerInstruction.classList.remove('dragging');
                saveLayoutSettings();
                if (editorInstance) editorInstance.layout();
            }
        });
    }

    // Editor-Terminal Resizer (stacked vertically)
    if (resizerEditorTerminal && codeWorkspace && terminalPanel) {
        let isResizing = false;
        resizerEditorTerminal.addEventListener('mousedown', (e) => { e.preventDefault(); isResizing = true; resizerEditorTerminal.classList.add('dragging'); });
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            const codeColumn = document.getElementById('editor-column');
            if (!codeColumn) return;
            const columnRect = codeColumn.getBoundingClientRect();
            const newHeight = e.clientY - columnRect.top;
            const totalHeight = columnRect.height;

            // Min heights: code 150px, terminal 80px
            const minCodeH = 150;
            const minTermH = 80;
            const clampedCodeH = Math.max(minCodeH, Math.min(newHeight, totalHeight - minTermH));

            codeWorkspace.style.flex = `0 0 ${clampedCodeH}px`;
            codeWorkspace.style.height = `${clampedCodeH}px`;
            terminalPanel.style.flex = `0 0 auto`;
            terminalPanel.style.height = `${totalHeight - clampedCodeH}px`;

            if (editorInstance) editorInstance.layout();
        });
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                resizerEditorTerminal.classList.remove('dragging');
                saveLayoutSettings();
                if (editorInstance) editorInstance.layout();
            }
        });
    }
};

// ---- Cookie Banner Setup ----
const setupCookieBanner = () => {
    const banner = document.getElementById('cookie-banner');
    const btnAccept = document.getElementById('btn-accept-cookie');
    const btnReject = document.getElementById('btn-reject-cookie');

    if (!banner || !btnAccept || !btnReject) return;

    // Check if user already made a choice
    const consent = localStorage.getItem('kairust_cookie_consent');
    if (!consent) {
        // Delay slight to allow CSS transition to feel like a pop-up after load
        setTimeout(() => {
            banner.classList.remove('hidden');
        }, 500);
    }

    const hideBanner = () => {
        banner.classList.add('hidden');
    };

    btnAccept.addEventListener('click', () => {
        localStorage.setItem('kairust_cookie_consent', 'accepted');
        hideBanner();
        // Check and show resume popup after accepting cookies
        checkAndShowResumePopup();
    });

    btnReject.addEventListener('click', () => {
        localStorage.setItem('kairust_cookie_consent', 'rejected');
        hideBanner();
    });
};

// ---- Resume Learning Popup Helper ----
const checkAndShowResumePopup = () => {
    const popup = document.getElementById('resume-popup');
    if (!popup) return;

    // Get saved learning state
    const savedState = ProgressManager.getLearningState();

    // Check if user has visited before and has a saved lesson
    if (savedState.hasVisited && savedState.currentLessonId) {
        // Find the saved lesson and chapter
        const savedLesson = flatLessons.find(l => l.id === savedState.currentLessonId);
        const savedChapter = savedLesson
            ? courseData.find(ch => ch.lessons.some(l => l.id === savedLesson.id))
            : null;

        if (savedLesson && savedChapter) {
            // Update popup content
            const chapterNameEl = document.getElementById('resume-chapter-name');
            const lessonNameEl = document.getElementById('resume-lesson-name');

            if (chapterNameEl) {
                chapterNameEl.textContent = savedChapter.title;
            }
            if (lessonNameEl) {
                lessonNameEl.textContent = savedLesson.title;
            }

            // Show popup
            popup.classList.remove('hidden');
        }
    }
};

// ---- Resume Learning Popup Setup ----
const setupResumePopup = (): boolean => {
    const popup = document.getElementById('resume-popup');
    const closeBtn = document.getElementById('resume-popup-close');
    const btnContinue = document.getElementById('btn-continue-learning');
    const btnStartFresh = document.getElementById('btn-start-fresh');

    if (!popup || !closeBtn || !btnContinue || !btnStartFresh) return false;

    let shouldResume = false;

    // Only show resume popup if user has accepted cookies
    const cookieConsent = localStorage.getItem('kairust_cookie_consent');
    if (cookieConsent !== 'accepted') {
        return false; // Skip showing resume popup if cookies not accepted
    }

    // Get saved learning state
    const savedState = ProgressManager.getLearningState();

    // Check if user has visited before and has a saved lesson
    if (savedState.hasVisited && savedState.currentLessonId) {
        // Find the saved lesson and chapter
        const savedLesson = flatLessons.find(l => l.id === savedState.currentLessonId);
        const savedChapter = savedLesson
            ? courseData.find(ch => ch.lessons.some(l => l.id === savedLesson.id))
            : null;

        if (savedLesson && savedChapter) {
            // Update popup content
            const chapterNameEl = document.getElementById('resume-chapter-name');
            const lessonNameEl = document.getElementById('resume-lesson-name');

            if (chapterNameEl) {
                chapterNameEl.textContent = savedChapter.title;
            }
            if (lessonNameEl) {
                lessonNameEl.textContent = savedLesson.title;
            }

            // Show popup after a short delay
            setTimeout(() => {
                popup.classList.remove('hidden');
            }, 800);

            // Mark that popup is shown
            shouldResume = true;
        }
    }

    // Close button handler
    closeBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    // Continue learning button
    btnContinue.addEventListener('click', () => {
        popup.classList.add('hidden');

        // Find and select the saved lesson
        const savedState = ProgressManager.getLearningState();
        const savedLesson = flatLessons.find(l => l.id === savedState.currentLessonId);

        if (savedLesson) {
            // First expand the chapter in sidebar
            const chapterElement = document.querySelector(`[data-chapter-id="${savedState.currentChapterId}"]`);
            if (chapterElement) {
                const chapterHeader = chapterElement.querySelector('.chapter-header');
                const lessonList = chapterElement.querySelector('.lesson-list');
                if (chapterHeader) chapterHeader.classList.add('open');
                if (lessonList) lessonList.classList.add('open');
            }

            // Then select the lesson with restored scroll position
            selectLesson(savedLesson, savedState.scrollPosition);
        }
    });

    // Start fresh button
    btnStartFresh.addEventListener('click', () => {
        // Clear saved learning state
        ProgressManager.clearLearningState();
        popup.classList.add('hidden');

        // Show chapter 1 introduction by default
        if (courseData.length > 0) {
            showChapterIntroduction(courseData[0]);
        }
    });

    return shouldResume;
};

// ---- Init ----
// =====================================================
// Auth Module
// =====================================================

interface UserInfo {
    id: number;
    username: string;
    email: string;
}

interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: UserInfo;
}

let currentUser: UserInfo | null = null;

const API_BASE = '/api/auth';

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    // Try to parse JSON response
    const data = await response.json().catch(() => ({ success: false, message: 'Lỗi phản hồi từ server' }));

    // If response is not OK, throw error with message
    if (!response.ok) {
        throw new Error(data.message || `Lỗi ${response.status}: ${response.statusText}`);
    }

    return data;
}

function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function showForm(formId: string) {
    const forms = ['login-form', 'register-form', 'forgot-password-form'];
    forms.forEach(id => {
        const form = document.getElementById(id);
        if (form) {
            form.classList.toggle('hidden', id !== formId);
        }
    });

    const titles: Record<string, string> = {
        'login-form': 'Đăng nhập',
        'register-form': 'Đăng ký',
        'forgot-password-form': 'Quên mật khẩu'
    };
    const titleEl = document.getElementById('auth-modal-title');
    if (titleEl) {
        titleEl.textContent = titles[formId] || 'Đăng nhập';
    }
}

function updateAuthUI() {
    const settingsBtn = document.getElementById('settings-btn');
    if (!settingsBtn) return;

    if (currentUser) {
        // User is logged in - show user info
        settingsBtn.innerHTML = `
            <div class="user-info">
                <div class="user-avatar">${currentUser.username.charAt(0).toUpperCase()}</div>
                <span class="user-name">${currentUser.username}</span>
            </div>
        `;
    } else {
        settingsBtn.textContent = 'Đăng nhập';
    }
}

function saveAuth(token: string, user: UserInfo) {
    localStorage.setItem('kairust_token', token);
    localStorage.setItem('kairust_user', JSON.stringify(user));
    currentUser = user;
    updateAuthUI();
    hideAuthModal();
}

function clearAuth() {
    localStorage.removeItem('kairust_token');
    localStorage.removeItem('kairust_user');
    currentUser = null;
    updateAuthUI();
}

function loadAuth() {
    const token = localStorage.getItem('kairust_token');
    const userStr = localStorage.getItem('kairust_user');
    if (token && userStr) {
        try {
            currentUser = JSON.parse(userStr);
            updateAuthUI();
        } catch {
            clearAuth();
        }
    }
}

function setupAuthModal() {
    const settingsBtn = document.getElementById('settings-btn');
    const modalClose = document.getElementById('auth-modal-close');
    const modal = document.getElementById('auth-modal');

    // Open modal on settings button click
    settingsBtn?.addEventListener('click', () => {
        if (currentUser) {
            // If logged in, could show user menu or logout option
            if (confirm('Bạn có muốn đăng xuất?')) {
                clearAuth();
            }
        } else {
            showForm('login-form');
            showAuthModal();
        }
    });

    // Close modal
    modalClose?.addEventListener('click', hideAuthModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) hideAuthModal();
    });

    // Form switching
    document.getElementById('show-register')?.addEventListener('click', (e) => {
        e.preventDefault();
        showForm('register-form');
    });
    document.getElementById('show-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        showForm('login-form');
    });
    document.getElementById('show-forgot-password')?.addEventListener('click', (e) => {
        e.preventDefault();
        showForm('forgot-password-form');
    });
    document.getElementById('show-login-from-forgot')?.addEventListener('click', (e) => {
        e.preventDefault();
        showForm('login-form');
    });

    // Login form
    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (document.getElementById('login-email') as HTMLInputElement).value;
        const password = (document.getElementById('login-password') as HTMLInputElement).value;
        const submitBtn = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;

        // Disable button and show loading
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang đăng nhập...';

        try {
            const response = await apiCall<AuthResponse>('/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (response.success && response.token && response.user) {
                saveAuth(response.token, response.user);
            } else {
                alert(response.message || 'Đăng nhập thất bại');
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Lỗi kết nối';
            alert(errorMessage);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    // Register form
    document.getElementById('register-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = (document.getElementById('register-username') as HTMLInputElement).value;
        const email = (document.getElementById('register-email') as HTMLInputElement).value;
        const password = (document.getElementById('register-password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('register-confirm-password') as HTMLInputElement).value;
        const submitBtn = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;

        if (password !== confirmPassword) {
            alert('Mật khẩu không khớp');
            return;
        }

        // Disable button and show loading
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang đăng ký...';

        try {
            const response = await apiCall<AuthResponse>('/register', {
                method: 'POST',
                body: JSON.stringify({ username, email, password })
            });

            if (response.success && response.token && response.user) {
                saveAuth(response.token, response.user);
            } else {
                alert(response.message || 'Đăng ký thất bại');
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Lỗi kết nối';
            alert(errorMessage);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    // Forgot password form
    document.getElementById('forgot-password-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = (document.getElementById('forgot-email') as HTMLInputElement).value;
        const submitBtn = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;

        // Disable button and show loading
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';

        try {
            const response = await apiCall<AuthResponse>('/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            alert(response.message);
            if (response.success) {
                showForm('login-form');
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Lỗi kết nối';
            alert(errorMessage);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });

    // Load existing auth
    loadAuth();
}

// =====================================================
// Main Init
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    initEditor();
    renderCurriculum();
    setupRunButton();
    setupStdinInput();
    setupClearButton();
    updateProgress();
    setupNavButtons();
    setupThemeToggle();
    setupResizers();
    setupCookieBanner();
    setupAuthModal();

    // Setup resume popup and check if we should resume
    const shouldResume = setupResumePopup();

    // Only select first lesson if NOT resuming from saved state
    if (!shouldResume && flatLessons.length > 0) {
        selectLesson(flatLessons[0]);
    }

    // Load saved layout settings from localStorage
    loadLayoutSettings();

    // Monaco editor layout after everything is initialized
    setTimeout(() => {
        if (editorInstance) editorInstance.layout();
    }, 100);
});
