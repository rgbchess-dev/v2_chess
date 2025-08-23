/**
 * Simplified Trainer Core
 * File: /engine/trainer-core.js
 * 
 * Responsibilities:
 * - Mode management (theory/exercise/spaced)
 * - Course and line selection
 * - Progress tracking
 * - Orchestrating between chess-engine and UI events
 * 
 * NO DOM MANIPULATION - only emits events
 */

import { ChessEngine } from './chess-engine.js';
import { SpacedRepetitionManager } from './spaced-repetition.js';

export class ChessTrainer extends EventTarget {
    constructor(boardId, courseData, options = {}) {
        super();
        
        this.boardId = boardId;
        this.courseData = this.normalizeCourseData(courseData);
        this.options = {
            autoStart: true,
            showHints: true,
            defaultColor: options.defaultColor || 'white',
            ...options
        };
        
        // Core components
        this.chessEngine = null;
        this.srManager = null;
        
        // Training state
        this.currentMode = 'theory';
        this.currentCategory = null;
        this.currentLineIndex = 0;
        this.currentCard = null;
        
        // Initialize
        this.init();
    }
    
    init() {
        // Initialize chess engine with the correct player color
        this.chessEngine = new ChessEngine(this.boardId, {
            playerColor: this.options.defaultColor,
            orientation: this.courseData.orientation || this.options.defaultColor
        });
        
        console.log('Trainer initialized with playerColor:', this.options.defaultColor);
        
        // Set up chess engine callbacks
        this.chessEngine.onMove((move, validation) => this.handleMove(move, validation));
        this.chessEngine.onLineComplete((data) => this.handleLineComplete(data));
        this.chessEngine.onComputerMove((move) => this.handleComputerMove(move));
        
        // Initialize spaced repetition if available
        if (this.courseData.spacedRepetition) {
            this.srManager = new SpacedRepetitionManager(this.courseData.name);
            this.srManager.generateCardsFromOpening(this.courseData.spacedRepetition);
        }
        
        // Set initial category
        this.currentCategory = this.getDefaultCategory();
        
        // Emit initialization event
        this.emit('initialized', {
            courseData: this.courseData,
            mode: this.currentMode,
            category: this.currentCategory,
            options: this.options  // Include options so UI can sync
        });
        
        // Load first position
        this.loadCurrentPosition();
    }
    
    // ============================================
    // DATA NORMALIZATION
    // ============================================
    
    normalizeCourseData(data) {
        // Handle different data structures
        const normalized = {
            name: data.name || 'Unnamed Course',
            playerColor: data.playerColor || 'white',
            orientation: data.orientation || data.playerColor || 'white',
            theory: null,
            exercises: null,
            spacedRepetition: null
        };
        
        // Normalize theory lines
        if (data.theory) {
            normalized.theory = data.theory;
        } else if (data.lines) {
            normalized.theory = {
                lines: data.lines,
                startingFen: data.startingFen
            };
        }
        
        // Normalize exercises
        if (data.exercises) {
            normalized.exercises = Array.isArray(data.exercises) ? 
                { lines: data.exercises } : data.exercises;
        }
        
        // Handle spaced repetition data
        if (data.spacedRepetition) {
            normalized.spacedRepetition = data.spacedRepetition;
        } else if (data.lines) {
            // Auto-generate from theory lines
            normalized.spacedRepetition = {
                lines: data.lines.map((line, idx) => ({
                    ...line,
                    lineIndex: idx
                }))
            };
        }
        
        return normalized;
    }
    
    // ============================================
    // MODE MANAGEMENT
    // ============================================
    
    setMode(mode) {
        const validModes = ['theory', 'exercises', 'spaced_repetition'];
        if (!validModes.includes(mode)) {
            console.error(`Invalid mode: ${mode}`);
            return;
        }
        
        this.currentMode = mode;
        this.currentLineIndex = 0;
        this.currentCard = null;
        
        this.emit('modeChanged', {
            mode: mode,
            categories: this.getAvailableCategories()
        });
        
        this.loadCurrentPosition();
    }
    
    // ============================================
    // LINE/POSITION MANAGEMENT
    // ============================================
    
    loadCurrentPosition() {
        if (this.currentMode === 'spaced_repetition') {
            this.loadSpacedRepetitionCard();
        } else {
            const line = this.getCurrentLine();
            if (!line) {
                this.emit('error', { message: 'No line available' });
                return;
            }
            
            const startingFen = this.getStartingFen();
            this.chessEngine.loadLine(line, startingFen);
            
            this.emit('positionLoaded', {
                mode: this.currentMode,
                line: line,
                lineIndex: this.currentLineIndex,
                totalLines: this.getCurrentLines().length
            });
        }
    }
    
    loadSpacedRepetitionCard() {
        if (!this.srManager) {
            this.emit('error', { message: 'Spaced repetition not available' });
            return;
        }
        
        this.currentCard = this.srManager.getNextCard();
        
        if (!this.currentCard) {
            this.emit('spacedRepetitionComplete', {
                stats: this.srManager.getStats()
            });
            return;
        }
        
        // Load the card's line
        this.chessEngine.loadLine(this.currentCard);
        
        this.emit('spacedRepetitionCardLoaded', {
            card: this.currentCard,
            stats: this.srManager.getStats()
        });
    }
    
    // ============================================
    // MOVE HANDLING
    // ============================================
    
    handleMove(move, validation) {
        if (validation.freePlay) {
            // Not in a training line
            this.emit('freePlayMove', { move });
            return;
        }
        
        if (validation.valid) {
            this.emit('correctMove', {
                move: move,
                isComplete: validation.isComplete,
                progress: this.chessEngine.getLineProgress()
            });
            
            // Update spaced repetition if active
            if (this.currentMode === 'spaced_repetition' && this.currentCard) {
                if (validation.isComplete) {
                    this.handleSpacedRepetitionSuccess();
                }
            }
        } else {
            this.emit('incorrectMove', {
                move: move,
                expected: validation.expected,
                mode: this.currentMode
            });
            
            // Handle spaced repetition failure
            if (this.currentMode === 'spaced_repetition' && this.currentCard) {
                this.handleSpacedRepetitionFailure();
            }
        }
    }
    
    handleComputerMove(move) {
        this.emit('computerMove', {
            move: move,
            progress: this.chessEngine.getLineProgress()
        });
    }
    
    handleLineComplete(data) {
        this.emit('lineComplete', {
            line: data.line,
            totalMoves: data.totalMoves,
            mode: this.currentMode
        });
        
        // Auto-advance in theory mode if enabled
        if (this.currentMode === 'theory' && this.options.autoAdvance) {
            setTimeout(() => this.nextLine(), 2000);
        }
    }
    
    // ============================================
    // SPACED REPETITION
    // ============================================
    
    handleSpacedRepetitionSuccess() {
        if (!this.currentCard) return;
        
        const isLearningPhase = this.currentCard.lineCompletions < 2;
        
        if (isLearningPhase) {
            this.currentCard.lineCompletions++;
            this.srManager.updateCardAfterReview(this.currentCard.id, 3);
            
            this.emit('spacedRepetitionProgress', {
                card: this.currentCard,
                phase: 'learning',
                completed: this.currentCard.lineCompletions
            });
        } else {
            this.srManager.updateCardAfterReview(this.currentCard.id, 3);
            
            this.emit('spacedRepetitionProgress', {
                card: this.currentCard,
                phase: 'testing',
                success: true
            });
        }
        
        // Load next card after delay
        setTimeout(() => this.loadSpacedRepetitionCard(), 2000);
    }
    
    handleSpacedRepetitionFailure() {
        if (!this.currentCard) return;
        
        const isLearningPhase = this.currentCard.lineCompletions < 2;
        
        if (!isLearningPhase) {
            // Testing phase failure - reset card
            this.currentCard.lineCompletions = 0;
            this.currentCard.currentMoveInLine = 0;
            this.srManager.updateCardAfterReview(this.currentCard.id, 0);
            
            this.emit('spacedRepetitionProgress', {
                card: this.currentCard,
                phase: 'testing',
                success: false
            });
            
            // Reload card after delay
            setTimeout(() => this.loadSpacedRepetitionCard(), 2000);
        }
    }
    
    // ============================================
    // NAVIGATION
    // ============================================
    
    nextLine() {
        const lines = this.getCurrentLines();
        if (this.currentLineIndex < lines.length - 1) {
            this.currentLineIndex++;
            this.loadCurrentPosition();
            
            this.emit('lineChanged', {
                lineIndex: this.currentLineIndex,
                line: this.getCurrentLine()
            });
        }
    }
    
    previousLine() {
        if (this.currentLineIndex > 0) {
            this.currentLineIndex--;
            this.loadCurrentPosition();
            
            this.emit('lineChanged', {
                lineIndex: this.currentLineIndex,
                line: this.getCurrentLine()
            });
        }
    }
    
    selectLine(index) {
        const lines = this.getCurrentLines();
        if (index >= 0 && index < lines.length) {
            this.currentLineIndex = index;
            this.loadCurrentPosition();
            
            this.emit('lineChanged', {
                lineIndex: this.currentLineIndex,
                line: this.getCurrentLine()
            });
        }
    }
    
    setCategory(category) {
        this.currentCategory = category;
        this.currentLineIndex = 0;
        
        this.emit('categoryChanged', {
            category: category,
            lines: this.getCurrentLines()
        });
        
        this.loadCurrentPosition();
    }
    
    // ============================================
    // ACTIONS
    // ============================================
    
    resetPosition() {
        this.chessEngine.resetCurrentLine();
        
        this.emit('positionReset', {
            progress: this.chessEngine.getLineProgress()
        });
    }
    
    flipBoard() {
        const newOrientation = this.chessEngine.flipBoard();
        
        this.emit('boardFlipped', {
            orientation: newOrientation
        });
    }
    
    setPlayerColor(color) {
        this.chessEngine.setPlayerColor(color);
        
        // Update orientation based on color selection
        if (color === 'white') {
            this.chessEngine.setOrientation('white');
        } else if (color === 'black') {
            this.chessEngine.setOrientation('black');
        }
        // Keep current orientation for 'both'
        
        // Reload current position with new color setting
        this.loadCurrentPosition();
        
        this.emit('playerColorChanged', {
            color: color
        });
    }
    
    showHint() {
        const line = this.getCurrentLine();
        if (line && line.hint) {
            this.emit('hint', {
                hint: line.hint,
                line: line
            });
        }
    }
    
    // ============================================
    // UTILITIES
    // ============================================
    
    getCurrentLine() {
        const lines = this.getCurrentLines();
        return lines[this.currentLineIndex] || null;
    }
    
    getCurrentLines() {
        if (this.currentMode === 'theory') {
            return this.getCategoryLines(this.currentCategory);
        } else if (this.currentMode === 'exercises') {
            return this.courseData.exercises?.lines || [];
        }
        return [];
    }
    
    getCategoryLines(category) {
        if (!this.courseData.theory) return [];
        
        const allLines = this.courseData.theory.lines || [];
        
        if (!category || category === 'all') {
            return allLines;
        }
        
        return allLines.filter(line => line.category === category);
    }
    
    getAvailableCategories() {
        if (!this.courseData.theory) return [];
        
        const categories = new Set();
        const lines = this.courseData.theory.lines || [];
        
        lines.forEach(line => {
            if (line.category) {
                categories.add(line.category);
            }
        });
        
        return Array.from(categories);
    }
    
    getDefaultCategory() {
        const categories = this.getAvailableCategories();
        return categories[0] || null;
    }
    
    getStartingFen() {
        if (this.currentMode === 'exercises') {
            const line = this.getCurrentLine();
            return line?.fen || null;
        }
        
        return this.courseData.theory?.startingFen || null;
    }
    
    getProgress() {
        return {
            mode: this.currentMode,
            category: this.currentCategory,
            lineIndex: this.currentLineIndex,
            totalLines: this.getCurrentLines().length,
            chessProgress: this.chessEngine.getLineProgress(),
            spacedRepetition: this.srManager?.getStats() || null
        };
    }
    
    // ============================================
    // EVENT EMITTER
    // ============================================
    
    emit(eventName, detail) {
        this.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
    
    // ============================================
    // CLEANUP
    // ============================================
    
    destroy() {
        if (this.chessEngine) {
            this.chessEngine.destroy();
            this.chessEngine = null;
        }
        
        this.srManager = null;
        this.courseData = null;
        
        this.emit('destroyed');
    }
}