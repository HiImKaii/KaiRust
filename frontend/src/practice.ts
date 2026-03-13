import * as monaco from 'monaco-editor';
import { type Lesson, generateCPContent } from './courses';
import { ProgressManager } from './progress';
import { ch28_chapters } from './chapters/ch28/index';

// =====================================================
// KaiRust - Practice Page Logic (Luyện Tập)
// =====================================================

let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null;
let flatLessons: Lesson[] = [];
let currentLessonIndex = -1;
let isSubmitting = false;

// ---- Helper: Render Math ----
const renderMath = (el: HTMLElement) => {
    if ((window as any).renderMathInElement) {
        (window as any).renderMathInElement(el, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false},
                {left: '\\(', right: '\\)', display: false},
                {left: '\\[', right: '\\]', display: true}
            ],
            throwOnError: false
        });
    }
};

// ---- Monaco Editor Setup ----
const initEditor = () => {
    const container = document.getElementById('editor');
    if (!container) return;

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

    const defaultCode = `// Chào mừng đến với KaiRust - Luyện Tập!
// Hãy chọn một bài tập để bắt đầu.

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

const escapeHtml = (text: string): string => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// ---- Backend Connection Config ----
const BACKEND_WS_URL = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.host + '/ws/run';
let activeWs: WebSocket | null = null;

// ---- Update Technical Stats ----
const updateStats = (memory: string, execTime: string, memoryLimit?: string, timeLimit?: string) => {
    const memEl = document.querySelector('.highlight-blue');
    const timeEl = document.querySelector('.highlight-pink');

    if (memEl) {
        if (memoryLimit && memory !== '—') {
            memEl.textContent = `${memory} / ${memoryLimit}`;
        } else {
            memEl.textContent = memory;
        }
    }

    if (timeEl) {
        if (timeLimit && execTime !== '—') {
            const limitMs = parseFloat(timeLimit.replace('s', '')) * 1000;
            timeEl.textContent = `${execTime} / ${limitMs}ms`;
        } else {
            timeEl.textContent = execTime;
        }
    }
};

// ---- Run & Submit Logic via WebSocket ----
const startCodeExecution = (is_test: boolean) => {
    if (!editorInstance) return;
    const code = editorInstance.getValue();

    if (activeWs) {
        activeWs.close();
        activeWs = null;
    }

    clearTerminal();

    isSubmitting = is_test;
    const runBtn = document.getElementById('run-btn') as HTMLButtonElement | null;
    const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement | null;
    if (runBtn) runBtn.disabled = true;
    if (submitBtn) submitBtn.disabled = true;

    if (is_test) {
        appendTerminal(`<span class="log-prompt">></span> Đang chấm bài...`);
    }

    const ws = new WebSocket(BACKEND_WS_URL);
    activeWs = ws;

    ws.onopen = () => {
        let payload: any = { type: 'run', code: code, is_test };

        if (is_test && currentLessonIndex >= 0) {
            const lesson = flatLessons[currentLessonIndex];
            if (lesson.type === 'practice') {
                payload.lesson_id = lesson.id;
                const lessonAny = lesson as any;
                if (lessonAny.testCases && lessonAny.testCases.length > 0) {
                    payload.stdin = lessonAny.testCases[0].input;
                }
            }
        }

        ws.send(JSON.stringify(payload));
    };

    ws.onmessage = (event) => {
        try {
            const msg = JSON.parse(event.data);
            switch (msg.type) {
                case 'compile_error':
                    appendTerminal(`<span style="color:#ef4444">${escapeHtml(msg.stderr)}</span>`);
                    break;
                case 'stdout':
                    appendTerminal(escapeHtml(msg.data));
                    if (isSubmitting && currentLessonIndex >= 0) {
                        const lesson = flatLessons[currentLessonIndex];
                        const lessonAny = lesson as any;
                        const hasExpected = lessonAny.expectedOutput !== undefined ||
                            (lessonAny.testCases && lessonAny.testCases[0]?.expectedOutput);
                        if (lesson.type === 'practice' && hasExpected) {
                            (window as any).__testOutput = ((window as any).__testOutput || '') + msg.data;
                        }
                    }
                    break;
                case 'stderr':
                    appendTerminal(`<span style="color:#f59e0b">${escapeHtml(msg.data)}</span>`);
                    break;
                case 'exit':
                    const exitClass = msg.code === 0 ? 'log-info' : 'log-error';
                    appendTerminal(`<span class="${exitClass}">[${msg.code}] ${msg.execution_time_ms}ms</span>`);

                    if (isSubmitting && currentLessonIndex >= 0) {
                        const lesson = flatLessons[currentLessonIndex];
                        if (lesson.type === 'practice') {
                            const lessonAny = lesson as any;
                            const expectedOutput = lessonAny.expectedOutput ||
                                (lessonAny.testCases && lessonAny.testCases[0]?.expectedOutput);
                            const testOutput = (window as any).__testOutput || '';
                            const testPassed = msg.code === 0 && expectedOutput && testOutput.trim() === expectedOutput.trim();

                            if (testPassed) {
                                appendTerminal(`<br><span style="color:#22c55e;font-weight:bold">✓ Đạt</span>`);
                                ProgressManager.markCompleted(lesson.id);
                                const activeEl = document.querySelector(`[data-lesson-id="${lesson.id}"]`);
                                if (activeEl) {
                                    activeEl.classList.add('passed');
                                    activeEl.classList.add('completed');
                                }
                            } else {
                                appendTerminal(`<br><span style="color:#ef4444;font-weight:bold">✗ Chưa đạt</span>`);
                                if (expectedOutput) {
                                    appendTerminal(`<span style="color:#f59e0b">Đúng: ${escapeHtml(expectedOutput)}</span>`);
                                    appendTerminal(`<span style="color:#ef4444">Sai: ${escapeHtml(testOutput.trim())}</span>`);
                                }
                            }
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

// ---- Lesson Selection (Practice) ----
const selectLesson = (lesson: Lesson) => {
    const submitBtn = document.getElementById('submit-btn');
    const stdinInput = document.getElementById('terminal-stdin') as HTMLInputElement | null;

    // Practice lessons always show submit button
    if (submitBtn) submitBtn.classList.remove('hidden');

    if (stdinInput) {
        stdinInput.disabled = false;
        stdinInput.placeholder = "Nhập chuẩn STDIN vào đây và bấm Enter...";
        stdinInput.classList.remove('disabled-input');
    }

    currentLessonIndex = flatLessons.findIndex(l => l.id === lesson.id);

    // Update title
    const titleEl = document.getElementById('lesson-title');
    if (titleEl) titleEl.textContent = lesson.title;

    // Update badge
    const typeEl = document.getElementById('lesson-type');
    if (typeEl) {
        typeEl.textContent = 'practice';
        typeEl.className = 'lesson-badge badge-practice';
    }

    // Update duration
    const durEl = document.getElementById('lesson-duration');
    if (durEl) durEl.textContent = lesson.duration;

    // Update content
    const contentEl = document.getElementById('lesson-content');
    if (contentEl) {
        contentEl.innerHTML = generateCPContent(lesson);
        renderMath(contentEl);
    }

    // Reset scroll
    const scrollArea = document.getElementById('panel-scroll-area');
    if (scrollArea) scrollArea.scrollTop = 0;

    // Update editor
    if (editorInstance && lesson.defaultCode) {
        editorInstance.setValue(lesson.defaultCode);
    }

    // Clear terminal and reset stats
    clearTerminal();
    const lessonAny = lesson as any;
    const defaultMem = lessonAny.memoryLimit || '—';
    const defaultTime = lessonAny.timeLimit ? `${parseFloat(lessonAny.timeLimit.replace('s', '')) * 1000}ms` : '—';
    updateStats(defaultMem, defaultTime, lessonAny.memoryLimit, lessonAny.timeLimit);

    // Highlight active lesson in sidebar
    document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
    const activeEl = document.querySelector(`[data-lesson-id="${lesson.id}"]`);
    if (activeEl) activeEl.classList.add('active');
};

// ---- Render Practice Curriculum ----
const renderPracticeCurriculum = () => {
    const curriculumList = document.getElementById('curriculum-list');
    if (!curriculumList) return;

    curriculumList.innerHTML = '';
    flatLessons = [];

    ch28_chapters.forEach((chapter, chapterIndex) => {
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
        if (chapterIndex === 0) {
            chapterHeader.classList.add('open');
            lessonList.classList.add('open');
        }

        chapter.lessons.forEach(lesson => {
            flatLessons.push(lesson);
            const lessonItem = document.createElement('div');
            lessonItem.className = 'lesson-item';
            lessonItem.dataset.lessonId = lesson.id;

            if (ProgressManager.isCompleted(lesson.id)) {
                lessonItem.classList.add('completed');
            }

            lessonItem.innerHTML = `
                <span class="material-symbols-outlined lesson-icon">code</span>
                <span class="lesson-name">${lesson.title}</span>
                <span class="lesson-time">${lesson.duration}</span>
            `;

            lessonItem.addEventListener('click', () => selectLesson(lesson));
            lessonList.appendChild(lessonItem);
        });

        chapterHeader.addEventListener('click', () => {
            chapterHeader.classList.toggle('open');
            lessonList.classList.toggle('open');
        });

        chapterDiv.appendChild(chapterHeader);
        chapterDiv.appendChild(lessonList);
        curriculumList.appendChild(chapterDiv);
    });
};

// ---- Setup Buttons ----
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

const setupClearButton = () => {
    const clearBtn = document.getElementById('clear-btn');
    clearBtn?.addEventListener('click', clearTerminal);
};

// ---- Theme Toggle ----
const setupThemeToggle = () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

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
            if (editorInstance) monaco.editor.setTheme('modern-light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('kairust-theme', 'dark');
            updateThemeIcons(true);
            if (editorInstance) monaco.editor.setTheme('neuro-dark');
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

// ---- Resizers ----
const setupResizers = () => {
    const resizerSidebar = document.getElementById('resizer-sidebar');
    const resizerInstruction = document.getElementById('resizer-instruction');
    const resizerEditorTerminal = document.getElementById('resizer-editor-terminal');

    const sidebar = document.getElementById('sidebar-curriculum');
    const instruction = document.getElementById('instruction-panel');
    const codeWorkspace = document.getElementById('code-workspace');
    const terminalPanel = document.getElementById('terminal-panel');

    if (resizerSidebar && sidebar) {
        let isResizing = false;
        resizerSidebar.addEventListener('mousedown', (e) => { e.preventDefault(); isResizing = true; resizerSidebar.classList.add('dragging'); });
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            sidebar.style.flex = `0 0 ${e.clientX}px`;
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

    if (resizerInstruction && sidebar && instruction) {
        let isResizing = false;
        resizerInstruction.addEventListener('mousedown', (e) => { e.preventDefault(); isResizing = true; resizerInstruction.classList.add('dragging'); });
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            const sidebarRect = sidebar.getBoundingClientRect();
            const editorColumn = document.getElementById('editor-column');
            let newWidth = e.clientX - sidebarRect.width;
            newWidth = Math.max(250, Math.min(newWidth, window.innerWidth - 300));
            instruction.style.width = `${newWidth}px`;
            instruction.style.flex = '0 0 none';
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
                if (editorInstance) editorInstance.layout();
            }
        });
    }

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
                if (editorInstance) editorInstance.layout();
            }
        });
    }
};

// =====================================================
// Main Init for Practice Page
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    // Update sidebar title for practice
    const sidebarTitle = document.querySelector('.sidebar-title');
    if (sidebarTitle) sidebarTitle.textContent = '28Tech - Luyện Tập';

    initEditor();
    renderPracticeCurriculum();
    setupRunButton();
    setupStdinInput();
    setupClearButton();
    setupThemeToggle();
    setupResizers();

    // Show submit button by default on practice page
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.classList.remove('hidden');

    // Select first practice lesson
    if (flatLessons.length > 0) {
        selectLesson(flatLessons[0]);
    }

    // Monaco editor layout after everything is initialized
    setTimeout(() => {
        if (editorInstance) editorInstance.layout();
    }, 100);
});
