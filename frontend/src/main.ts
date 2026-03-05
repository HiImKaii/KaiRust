import * as monaco from 'monaco-editor';
import { courseData, type Lesson } from './courses';

// =====================================================
// KaiRust - Main Application Logic
// =====================================================

let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null;
let flatLessons: Lesson[] = [];
let currentLessonIndex = -1;
const readLessons = new Set<string>();

// ---- Monaco Editor Setup ----
const initEditor = () => {
    const container = document.getElementById('editor');
    if (!container) return;

    // Define a custom Dark Sci-Fi theme
    monaco.editor.defineTheme('neuro-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: '', background: '0a0a0f' },
            { token: 'keyword', foreground: 'c87af0', fontStyle: 'italic' },
            { token: 'number', foreground: '7abfe8' },
            { token: 'string', foreground: 'e8d07a' },
            { token: 'comment', foreground: '808090', fontStyle: 'italic' },
            { token: 'type', foreground: '7af0d0' },
            { token: 'function', foreground: 'f07ab8' },
        ],
        colors: {
            'editor.background': '#0a0a0f',
            'editor.foreground': '#d0d0df',
            'editor.lineHighlightBackground': '#121216',
            'editorCursor.foreground': '#7af0d0',
            'editor.selectionBackground': '#2a2a35',
            'editorLineNumber.foreground': '#404050',
            'editorLineNumber.activeForeground': '#c87af0'
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
        theme: 'neuro-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        fontFamily: "'Space Mono', monospace",
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
        });

        chapterDiv.appendChild(chapterHeader);
        chapterDiv.appendChild(lessonList);
        list.appendChild(chapterDiv);
    });
};

// ---- Lesson Selection ----
const selectLesson = (lesson: Lesson) => {
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

    // Mark previous lesson as read
    if (currentLessonIndex >= 0) {
        const prevLesson = flatLessons[currentLessonIndex];
        readLessons.add(prevLesson.id);
        const prevEl = document.querySelector(`[data-lesson-id="${prevLesson.id}"]`);
        if (prevEl) prevEl.classList.add('read');
    }

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

    // Update content
    const contentEl = document.getElementById('lesson-content');
    if (contentEl) contentEl.innerHTML = lesson.content;

    // Reset scrolling
    const scrollArea = document.getElementById('panel-scroll-area');
    if (scrollArea) scrollArea.scrollTop = 0;

    // Re-check scroll conditions immediately after rendering
    setTimeout(() => {
        checkUnlockNext();
    }, 50);

    // Update editor
    if (editorInstance && lesson.defaultCode) {
        editorInstance.setValue(lesson.defaultCode);
    }

    // Clear terminal
    clearTerminal();

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
        let codeToSend = code;

        // Append testCode only if submitting an exercise
        if (is_test && currentLessonIndex >= 0) {
            const lesson = flatLessons[currentLessonIndex];
            if (lesson.type === 'practice' && lesson.testCode) {
                codeToSend = code + '\n' + lesson.testCode;
            }
        }

        // Send compile/run command
        ws.send(JSON.stringify({ type: 'run', code: codeToSend, is_test }));
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
                    break;
                case 'running':
                    appendTerminal(`<span class="log-info">Running...</span>`);
                    break;
                case 'stdout':
                    appendTerminal(`<span class="log-success">${escapeHtml(msg.data)}</span>`);
                    break;
                case 'stderr':
                    appendTerminal(`<span class="log-warning">${escapeHtml(msg.data)}</span>`);
                    break;
                case 'exit':
                    const exitClass = msg.code === 0 ? 'log-info' : 'log-error';
                    appendTerminal(`<span class="${exitClass}">[Exited with code ${msg.code}] (${msg.execution_time_ms}ms)</span>`);
                    updateStats('—', `${msg.execution_time_ms}ms`);

                    // Display Exercise result when submitting
                    if (isSubmitting && currentLessonIndex >= 0) {
                        const lesson = flatLessons[currentLessonIndex];
                        if (lesson.type === 'practice') {
                            if (msg.code === 0) {
                                appendTerminal(`<br><span class="log-success" style="font-weight:bold; font-size:1.1rem">CHÚC MỪNG BẠN ĐÃ VƯỢT QUA BÀI TẬP!</span>`);
                                appendTerminal(`<span class="log-info">Bạn đã xuất sắc hoàn thành tất cả các Testcase. Tiếp tục phát huy nhé!</span>`);
                                const activeEl = document.querySelector(`[data-lesson-id="${lesson.id}"]`);
                                if (activeEl) {
                                    activeEl.classList.add('passed');
                                }
                            } else {
                                appendTerminal(`<br><span class="log-error" style="font-weight:bold; font-size:1.1rem">RẤT TIẾC, CHƯA ĐẠT YÊU CẦU.</span>`);
                                appendTerminal(`<span class="log-warning">Hãy đọc kỹ lỗi bên trên và kiểm tra lại mã của mình. Cố lên!</span>`);
                            }
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
                                output += msg.data;
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
const updateStats = (memory: string, execTime: string) => {
    const memEl = document.querySelector('.highlight-blue');
    const timeEl = document.querySelector('.highlight-pink');
    if (memEl) memEl.textContent = memory;
    if (timeEl) timeEl.textContent = execTime;
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

const checkUnlockNext = () => {
    if (currentLessonIndex === -1) return;

    const scrollArea = document.getElementById('panel-scroll-area');
    if (!scrollArea) return;

    // Allow 10px buffer
    const isAtBottom = scrollArea.scrollHeight - scrollArea.scrollTop - scrollArea.clientHeight <= 10;

    if (isAtBottom) {
        // --- LOGIC TIME LOCK: (Sắp tới khi có Server & Tài khoản) ---
        // Yêu cầu thời gian học tối thiểu mỗi bài (ví dụ: 15 Giây)
        /*
        const reqTimeMs = 15000; 
        const timeSpent = Date.now() - lessonStartTime;
        const currentId = flatLessons[currentLessonIndex].id;
        
        if (timeSpent >= reqTimeMs) {
            unlockNextLesson();
        } else {
            setTimeout(() => {
                // Kiểm tra lại nếu người dùng chưa chuyển bài
                if (currentLessonIndex !== -1 && flatLessons[currentLessonIndex].id === currentId) {
                    unlockNextLesson();
                }
            }, reqTimeMs - timeSpent);
        }
        */

        // Hiện tại: Chỉ yêu cầu cuộn hết mức là MỞ KHÓA LUÔN
        unlockNextLesson();
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

const setupResizers = () => {
    const resizerSidebar = document.getElementById('resizer-sidebar');
    const resizerInstruction = document.getElementById('resizer-instruction');
    const resizerTerminal = document.getElementById('resizer-terminal');

    const sidebar = document.getElementById('sidebar-curriculum');
    const instruction = document.getElementById('instruction-panel');
    const codeWorkspace = document.getElementById('code-workspace');
    const terminalWorkspace = document.getElementById('terminal-workspace');

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
                if (editorInstance) editorInstance.layout();
            }
        });
    }

    // Instruction Resizer
    if (resizerInstruction && sidebar && instruction) {
        let isResizing = false;
        resizerInstruction.addEventListener('mousedown', (e) => { e.preventDefault(); isResizing = true; resizerInstruction.classList.add('dragging'); });
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            const sidebarWidth = sidebar.getBoundingClientRect().width;
            const resizerSidebarWidth = document.getElementById('resizer-sidebar')?.getBoundingClientRect().width || 0;
            const newWidth = e.clientX - sidebarWidth - resizerSidebarWidth;
            instruction.style.flex = `0 0 ${newWidth}px`;
            if (editorInstance) editorInstance.layout();
        });
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                resizerInstruction.classList.remove('dragging');
                if (editorInstance) editorInstance.layout();
            }
        });
    }

    // Terminal Resizer
    if (resizerTerminal && codeWorkspace && terminalWorkspace) {
        let isResizing = false;
        resizerTerminal.addEventListener('mousedown', (e) => { e.preventDefault(); isResizing = true; resizerTerminal.classList.add('dragging'); });
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            const editorPanel = codeWorkspace.parentElement;
            if (!editorPanel) return;
            const panelRect = editorPanel.getBoundingClientRect();
            const newHeight = e.clientY - panelRect.top;
            const totalHeight = panelRect.height;

            // Clamp: code min 100px, terminal min 35px
            const minCodeH = 100;
            const minTermH = 35;
            const clampedCodeH = Math.max(minCodeH, Math.min(newHeight, totalHeight - minTermH));
            const codePercent = (clampedCodeH / totalHeight) * 100;

            codeWorkspace.style.flex = `1 1 ${codePercent}%`;
            terminalWorkspace.style.flex = `1 1 ${100 - codePercent}%`;
            if (editorInstance) editorInstance.layout();
        });
        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                resizerTerminal.classList.remove('dragging');
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
    });

    btnReject.addEventListener('click', () => {
        localStorage.setItem('kairust_cookie_consent', 'rejected');
        hideBanner();
    });
};

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    initEditor();
    renderCurriculum();
    setupRunButton();
    setupStdinInput();
    setupClearButton();
    updateProgress();
    setupNavButtons();
    setupResizers();
    setupCookieBanner();

    // Select the first lesson automatically if available
    if (flatLessons.length > 0) {
        selectLesson(flatLessons[0]);
    }

    // Force terminal visible after everything is initialized
    // Monaco editor layout can push terminal out of view
    setTimeout(() => {
        const codeWs = document.getElementById('code-workspace');
        const termWs = document.getElementById('terminal-workspace');
        if (codeWs && termWs) {
            codeWs.style.flex = '1 1 auto';
            termWs.style.flex = '0 0 35px';
        }
        if (editorInstance) editorInstance.layout();
    }, 100);
});
