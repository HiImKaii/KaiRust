import * as monaco from 'monaco-editor';
import { courseData, type Lesson } from './courses';

// =====================================================
// KaiRust - Main Application Logic
// =====================================================

let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null;
let flatLessons: Lesson[] = [];
let currentLessonIndex = -1;
// let lessonStartTime = 0; // Commented out to fix TS build error (unused)

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

    // Reset scrolling and timer
    const scrollArea = document.getElementById('panel-scroll-area');
    if (scrollArea) scrollArea.scrollTop = 0;
    // lessonStartTime = Date.now();

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

    // Highlight active lesson in sidebar
    document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
    const activeEl = document.querySelector(`[data-lesson-id="${lesson.id}"]`);
    if (activeEl) activeEl.classList.add('active');

    // Update progress
    updateProgress();
};

// ---- Terminal ----
const clearTerminal = () => {
    const log = document.getElementById('terminal-log');
    if (log) {
        log.innerHTML = `<span class="log-prompt">$</span> <span class="log-info">Chờ lệnh...</span>`;
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
const BACKEND_WS_URL = 'ws://localhost:3001/ws/run';
let activeWs: WebSocket | null = null;

// ---- Run Button (Real Backend via WebSocket) ----
const setupRunButton = () => {
    const runBtn = document.getElementById('run-btn');
    runBtn?.addEventListener('click', () => {
        if (!editorInstance) return;
        const code = editorInstance.getValue();

        // Close previous connection
        if (activeWs) {
            activeWs.close();
            activeWs = null;
        }

        clearTerminal();
        appendTerminal(`<span class="log-prompt">$</span> rustc main.rs && ./main`);

        const ws = new WebSocket(BACKEND_WS_URL);
        activeWs = ws;

        ws.onopen = () => {
            // Send code to compile & run
            ws.send(JSON.stringify({ type: 'run', code }));
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
                        break;
                    case 'error':
                        appendTerminal(`<span class="log-error">Error: ${escapeHtml(msg.message)}</span>`);
                        break;
                }
            } catch {
                // ignore parse errors
            }
        };

        ws.onerror = () => {
            appendTerminal(`<span class="log-error">Lỗi kết nối Backend. Đảm bảo server đang chạy tại port 3001.</span>`);
        };

        ws.onclose = () => {
            activeWs = null;
        };
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
            const codePercent = (newHeight / totalHeight) * 100;
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

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    initEditor();
    renderCurriculum();
    setupRunButton();
    setupClearButton();
    updateProgress();
    setupNavButtons();
    setupResizers();

    // Select the first lesson automatically if available
    if (flatLessons.length > 0) {
        selectLesson(flatLessons[0]);
    }
});
