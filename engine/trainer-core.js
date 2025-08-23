// /engine/trainer-core.js - Complete rewrite with proper spaced repetition
import { ChessEngine } from './chess-engine.js';
import { SpacedRepetitionManager } from './spaced-repetition.js';

export class ChessTrainer {
    constructor(boardId, openingData, spacedRepetitionData = null, options = {}) {
        this.boardId = boardId;
        this.openingData = openingData;
        this.spacedRepetitionData = spacedRepetitionData;
        this.chessEngine = null;
        
        // Spaced Repetition System - Properly initialized
        this.srManager = new SpacedRepetitionManager(openingData.name || 'opening');
        this.currentCard = null;
        
        // Training state
        this.currentMode = "theory";
        this.currentCategory = this.getDefaultCategory();
        this.currentLine = 0;
        this.moveIndex = 0;
        this.isExerciseMode = false;
        this.isSpacedRepetitionMode = false;
        
        // UI elements
        this.elements = {};
        
        // Options
        this.options = {
            autoStart: true,
            showHints: true,
            ...options
        };
    }
    
    getDefaultCategory() {
        if (this.openingData.theory && this.openingData.theory.lines.length > 0) {
            return this.openingData.theory.lines[0].category || "Main Lines";
        }
        return "Main Lines";
    }
    
    init() {
        this.initChessEngine();
        this.initUIElements();
        
        // Initialize spaced repetition system properly
        const dataForCards = this.spacedRepetitionData || this.openingData;
        this.srManager.generateCardsFromOpening(dataForCards);
        
        // Setup UI and event listeners
        this.initializeButtonText();
        this.updateModeInterface();
        this.updateCategorySelect();
        this.updateLineSelect();
        this.setupEventListeners();
        this.loadPosition();
        
        console.log('ChessTrainer initialized successfully');
    }
    
    initChessEngine() {
        this.chessEngine = new ChessEngine(this.boardId);
        this.chessEngine.onMove((move) => {
            this.handleUserMove(move);
        });
    }
    
    initUIElements() {
        this.elements = {
            modeSelect: document.getElementById('modeSelect'),
            categorySelect: document.getElementById('categorySelect'),
            categoryLabel: document.getElementById('categoryLabel'),
            lineSelect: document.getElementById('lineSelect'),
            colorSelect: document.getElementById('colorSelect'),
            prevLineBtn: document.getElementById('prevLineBtn'),
            nextLineBtn: document.getElementById('nextLineBtn'),
            hintBtn: document.getElementById('hintBtn'),
            resetBtn: document.getElementById('resetBtn'),
            flipBtn: document.getElementById('flipBtn'),
            positionInfo: document.getElementById('positionInfo'),
            challengeBox: document.getElementById('challengeBox'),
            status: document.getElementById('status'),
            movesList: document.getElementById('movesList'),
            successMessage: document.getElementById('successMessage'),
            errorMessage: document.getElementById('errorMessage'),
            progressFill: document.getElementById('progressFill')
        };
    }
    
    initializeButtonText() {
        if (this.elements.hintBtn) {
            this.elements.hintBtn.textContent = '💡 Show Hint';
        }
    }
    
    setupEventListeners() {
        // Mode selection
        if (this.elements.modeSelect) {
            this.elements.modeSelect.addEventListener('change', () => {
                this.currentMode = this.elements.modeSelect.value;
                this.isExerciseMode = (this.currentMode === 'exercises');
                this.isSpacedRepetitionMode = (this.currentMode === 'spaced_repetition');
                this.updateModeInterface();
                this.loadPosition();
            });
        }
        
        // Category selection
        if (this.elements.categorySelect) {
            this.elements.categorySelect.addEventListener('change', () => {
                this.currentCategory = this.elements.categorySelect.value;
                this.updateLineSelect();
                this.currentLine = 0;
                this.loadPosition();
            });
        }
        
        // Line selection
        if (this.elements.lineSelect) {
            this.elements.lineSelect.addEventListener('change', () => {
                this.currentLine = parseInt(this.elements.lineSelect.value);
                this.loadPosition();
            });
        }
        
        // Color selection
        if (this.elements.colorSelect) {
            this.elements.colorSelect.addEventListener('change', () => {
                this.applyColorSelection();
            });
        }
        
        // Navigation buttons
        if (this.elements.prevLineBtn) {
            this.elements.prevLineBtn.addEventListener('click', () => this.prevLine());
        }
        if (this.elements.nextLineBtn) {
            this.elements.nextLineBtn.addEventListener('click', () => this.nextLine());
        }
        
        // Action buttons
        if (this.elements.hintBtn) {
            this.elements.hintBtn.addEventListener('click', () => this.showHint());
        }
        if (this.elements.resetBtn) {
            this.elements.resetBtn.addEventListener('click', () => this.loadPosition());
        }
        if (this.elements.flipBtn) {
            this.elements.flipBtn.addEventListener('click', () => this.chessEngine.flipBoard());
        }
    }
    
    updateModeInterface() {
        const isSpacedMode = this.isSpacedRepetitionMode;
        
        // Hide/show controls based on mode
        if (this.elements.categorySelect) {
            this.elements.categorySelect.style.display = isSpacedMode ? 'none' : 'inline';
        }
        if (this.elements.categoryLabel) {
            this.elements.categoryLabel.style.display = isSpacedMode ? 'none' : 'inline';
        }
        if (this.elements.lineSelect) {
            this.elements.lineSelect.style.display = isSpacedMode ? 'none' : 'inline';
        }
        if (this.elements.prevLineBtn) {
            this.elements.prevLineBtn.style.display = isSpacedMode ? 'none' : 'inline';
        }
        if (this.elements.nextLineBtn) {
            this.elements.nextLineBtn.style.display = isSpacedMode ? 'none' : 'inline';
        }
        if (this.elements.hintBtn) {
            this.elements.hintBtn.style.display = isSpacedMode ? 'none' : 'inline';
        }
    }
    
    updateCategorySelect() {
        if (!this.elements.categorySelect) return;
        
        const currentData = this.getCurrentData();
        const categories = [...new Set(currentData.lines.map(line => line.category || "Main Lines"))];
        
        this.elements.categorySelect.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            if (category === this.currentCategory) option.selected = true;
            this.elements.categorySelect.appendChild(option);
        });
    }
    
    updateLineSelect() {
        if (!this.elements.lineSelect) return;
        
        const currentData = this.getCurrentData();
        const filteredLines = this.isExerciseMode ? 
            currentData.lines : 
            currentData.lines.filter(line => 
                (line.category || "Main Lines") === this.currentCategory
            );
        
        this.elements.lineSelect.innerHTML = '';
        filteredLines.forEach((line, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = line.name;
            if (index === this.currentLine) option.selected = true;
            this.elements.lineSelect.appendChild(option);
        });
    }
    
    getCurrentData() {
        if (this.isSpacedRepetitionMode && this.spacedRepetitionData) {
            return this.spacedRepetitionData;
        }
        if (this.isSpacedRepetitionMode) {
            return this.openingData.theory;
        }
        return this.openingData[this.currentMode] || this.openingData.theory;
    }
    
    getCurrentLine() {
        if (this.isSpacedRepetitionMode && this.currentCard) {
            return this.currentCard;
        }
        
        const currentData = this.getCurrentData();
        const filteredLines = this.isExerciseMode ? 
            currentData.lines : 
            currentData.lines.filter(line => 
                (line.category || "Main Lines") === this.currentCategory
            );
        
        return filteredLines[this.currentLine];
    }
    
    prevLine() {
        if (this.isSpacedRepetitionMode) return;
        
        const currentData = this.getCurrentData();
        const filteredLines = this.isExerciseMode ? 
            currentData.lines : 
            currentData.lines.filter(line => 
                (line.category || "Main Lines") === this.currentCategory
            );
        
        this.currentLine = Math.max(0, this.currentLine - 1);
        this.updateLineSelect();
        this.loadPosition();
    }
    
    nextLine() {
        if (this.isSpacedRepetitionMode) return;
        
        const currentData = this.getCurrentData();
        const filteredLines = this.isExerciseMode ? 
            currentData.lines : 
            currentData.lines.filter(line => 
                (line.category || "Main Lines") === this.currentCategory
            );
        
        this.currentLine = Math.min(filteredLines.length - 1, this.currentLine + 1);
        this.updateLineSelect();
        this.loadPosition();
    }
    
    // Core turn detection methods
    getFENTurn() {
        const gameState = this.chessEngine.getGameState();
        return gameState.turn;
    }
    
    getPlayerColor() {
        return this.chessEngine.playerColor;
    }
    
    canHumanMove() {
        const currentTurn = this.getFENTurn();
        const playerColor = this.getPlayerColor();
        
        if (playerColor === 'both') return true;
        if (playerColor === currentTurn) return true;
        return false;
    }
    
    shouldComputerMove() {
        if (this.isExerciseMode) return false;
        if (this.isSpacedRepetitionMode) return !this.canHumanMove();
        return !this.canHumanMove();
    }
    
    applyColorSelection() {
        if (!this.elements.colorSelect) return;
        
        const selectedColor = this.elements.colorSelect.value;
        
        if (selectedColor === 'both') {
            this.chessEngine.setPlayerColor('both');
        } else {
            this.chessEngine.setPlayerColor(selectedColor);
        }
        
        if (selectedColor === 'white') {
            this.chessEngine.setOrientation('white');
        } else {
            const currentData = this.getCurrentData();
            const orientation = currentData.orientation || 'black';
            this.chessEngine.setOrientation(orientation);
        }
    }
    
    loadPosition() {
        if (this.isSpacedRepetitionMode) {
            this.loadNextSpacedRepetitionCard();
            return;
        }
        
        const line = this.getCurrentLine();
        if (!line) {
            this.showMessage('No line available', false);
            return;
        }
        
        // Load FEN position
        if (!this.isExerciseMode) {
            const currentData = this.getCurrentData();
            const startingFen = currentData.startingFen || this.openingData.theory.startingFen;
            this.chessEngine.loadPosition(startingFen);
            this.moveIndex = 0;
        } else {
            this.chessEngine.loadPosition(line.fen);
            this.moveIndex = 0;
        }
        
        this.applyColorSelection();
        this.updateMoveHistory();
        this.updatePositionInfo();
        this.updateStatus();
        this.updateProgress(0);
        
        if (this.shouldComputerMove() && this.options.autoStart) {
            setTimeout(() => {
                this.makeComputerMoveIfNeeded();
            }, 1000);
        }
        
        if (this.isExerciseMode) {
            this.showMessage(`🎯 EXERCISE READY: ${line.name}`, true);
        } else {
            this.showMessage(`📚 THEORY LOADED: ${line.name}`, true);
        }
    }
    
    // SPACED REPETITION SYSTEM - Complete rewrite
    loadNextSpacedRepetitionCard() {
        console.log('=== LOADING SPACED REPETITION CARD ===');
        
        this.currentCard = this.srManager.getNextCard();
        
        if (!this.currentCard) {
            console.error('No cards available for spaced repetition');
            this.showMessage('🚫 No spaced repetition cards available!', false, true);
            return;
        }

        console.log(`Selected card: ${this.currentCard.name}`);
        console.log(`Line completions: ${this.currentCard.lineCompletions}`);
        console.log(`Moves in line: ${this.currentCard.moves.length}`);

        // Reset position to start of line
        this.currentCard.currentMoveInLine = 0;
        this.moveIndex = 0;

        // Load starting position
        const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        this.chessEngine.loadPosition(startingFen);

        // Set player configuration
        const playerColor = this.currentCard.playerColor || 'black';
        this.chessEngine.setPlayerColor(playerColor);
        this.chessEngine.setOrientation(this.currentCard.orientation || 'black');

        // Update UI
        this.updateSpacedRepetitionInfo();
        this.updateStatus();
        this.updateMoveHistory();

        // Start the line
        this.proceedWithNextMove();
    }
    
    proceedWithNextMove() {
        if (!this.currentCard) return;
        
        const lineMoves = this.currentCard.moves || [];
        let currentMoveIndex = this.currentCard.currentMoveInLine;
        
        if (currentMoveIndex === undefined || currentMoveIndex === null) {
            currentMoveIndex = 0;
            this.currentCard.currentMoveInLine = 0;
        }
        
        console.log(`Processing move ${currentMoveIndex + 1}/${lineMoves.length}`);
        
        if (!lineMoves || lineMoves.length === 0) {
            console.error('ERROR: No moves in current card!');
            this.showMessage('Error: No moves found for this line', false, true);
            return;
        }
        
        if (currentMoveIndex >= lineMoves.length) {
            console.log('Line completed!');
            this.completeCurrentLine();
            return;
        }
        
        const nextMove = lineMoves[currentMoveIndex];
        const playerColor = this.currentCard.playerColor || 'black';
        const isPlayerMove = playerColor === 'black' ? 
            (currentMoveIndex % 2 === 1) : (currentMoveIndex % 2 === 0);
        
        if (isPlayerMove) {
            const isLearningPhase = this.currentCard.lineCompletions < 2;
            
            if (isLearningPhase) {
                this.showMessage(`📚 LEARNING: The correct move is ${nextMove}. Play it!`, true);
            } else {
                this.showMessage(`🧠 TESTING: What's the best move?`, true);
            }
        } else {
            console.log('Computer auto-playing move:', nextMove);
            setTimeout(() => {
                this.makeSpacedRepetitionComputerMove();
            }, 1000);
        }
    }
    
    makeSpacedRepetitionComputerMove() {
        if (!this.currentCard) return;
        
        const lineMoves = this.currentCard.moves || [];
        let currentMoveIndex = this.currentCard.currentMoveInLine;
        
        if (currentMoveIndex === undefined || currentMoveIndex === null) {
            currentMoveIndex = 0;
            this.currentCard.currentMoveInLine = 0;
        }
        
        if (currentMoveIndex >= lineMoves.length) {
            this.completeCurrentLine();
            return;
        }
        
        const nextMove = lineMoves[currentMoveIndex];
        console.log(`Computer making move ${currentMoveIndex + 1}: ${nextMove}`);
        
        const moveResult = this.chessEngine.makeMove(nextMove);
        if (moveResult) {
            console.log(`Computer played: ${moveResult.san}`);
            
            this.currentCard.currentMoveInLine++;
            this.moveIndex++;
            
            this.updateMoveHistory();
            this.updateStatus();
            
            setTimeout(() => {
                this.proceedWithNextMove();
            }, 1000);
        } else {
            console.error(`Failed to make computer move: ${nextMove}`);
        }
    }
    
    completeCurrentLine() {
        if (!this.currentCard) return;
        
        console.log('=== LINE COMPLETED ===');
        console.log('Line completions before:', this.currentCard.lineCompletions);
        
        const isLearningPhase = this.currentCard.lineCompletions < 2;
        
        if (isLearningPhase) {
            // CRITICAL: INCREMENT line completions
            this.currentCard.lineCompletions++;
            this.currentCard.currentMoveInLine = 0;
            
            console.log('Learning phase completed, new lineCompletions:', this.currentCard.lineCompletions);
            this.showMessage(`✅ Learning run ${this.currentCard.lineCompletions}/2 completed!`, true);
            this.updateCardPerformance(3);
        } else {
            console.log('Testing phase completed successfully');
            this.showMessage(`🎉 Testing completed successfully!`, true);
            this.updateCardPerformance(3);
            this.currentCard.currentMoveInLine = 0;
        }
        
        setTimeout(() => {
            this.loadNextSpacedRepetitionCard();
        }, 2000);
    }
    
    handleSpacedRepetitionMove(move) {
        if (!this.currentCard) return;
        
        const lineMoves = this.currentCard.moves || [];
        const currentMoveIndex = this.currentCard.currentMoveInLine || 0;
        const expectedMove = lineMoves[currentMoveIndex];
        
        if (move.san === expectedMove || move.lan === expectedMove) {
            console.log(`✅ Correct move: ${move.san}`);
            
            this.currentCard.currentMoveInLine++;
            this.moveIndex++;
            
            this.updateMoveHistory();
            this.updateStatus();
            
            setTimeout(() => {
                this.proceedWithNextMove();
            }, 1000);
        } else {
            const isLearningPhase = this.currentCard.lineCompletions < 2;
            
            if (isLearningPhase) {
                this.showMessage(`❌ Try again!`, false);
                this.chessEngine.undoMove();
            } else {
                this.showMessage(`❌ INCORRECT! Expected: ${expectedMove}. Restarting line...`, false);
                this.currentCard.currentMoveInLine = 0;
                this.updateCardPerformance(0);
                
                setTimeout(() => {
                    this.loadNextSpacedRepetitionCard();
                }, 2000);
            }
        }
    }
    
    updateCardPerformance(quality) {
        if (this.currentCard) {
            this.srManager.updateCardAfterReview(this.currentCard.id, quality);
        }
    }
    
    updateSpacedRepetitionInfo() {
        if (!this.elements.positionInfo || !this.currentCard) return;
        
        const stats = this.srManager.getStats();
        const isLearningPhase = this.currentCard.lineCompletions < 2;
        
        let currentMoveIndex = this.currentCard.currentMoveInLine;
        if (currentMoveIndex === undefined || currentMoveIndex === null) {
            currentMoveIndex = 0;
            this.currentCard.currentMoveInLine = 0;
        }
        
        const lineProgress = currentMoveIndex + 1;
        const totalMoves = this.currentCard.moves.length;
        
        const phaseText = isLearningPhase ? 
            `📚 Learning Phase (Run ${this.currentCard.lineCompletions + 1}/2)` : 
            `🧠 Testing Phase (Attempt ${this.currentCard.totalTestAttempts + 1})`;
        
        const html = `
            <h4>🧠 Spaced Repetition: ${this.currentCard.name}</h4>
            <div style="background-color: ${isLearningPhase ? '#e8f5e8' : '#fff3e0'}; padding: 10px; border-radius: 5px; margin: 10px 0;">
                <strong>${phaseText}</strong><br>
                Move: ${lineProgress}/${totalMoves}<br>
                Description: ${this.currentCard.description}
            </div>
            <div style="background-color: #f5f5f5; padding: 8px; border-radius: 5px; font-size: 14px;">
                📊 Session: ${stats.session.studied} studied, ${stats.session.correct} correct (${stats.session.successRate}%)<br>
                📚 Learning: ${stats.learningCards} | 🧠 Testing: ${stats.testingCards} | ✅ Mastered: ${stats.masteredCards}
            </div>
        `;
        
        this.elements.positionInfo.innerHTML = html;
    }
    
    // Regular move handling and UI methods
    updateMoveHistory() {
        if (!this.elements.movesList) return;
        
        let movesHtml = '';
        
        if (this.isSpacedRepetitionMode && this.currentCard) {
            const cardMoves = this.currentCard.moves || [];
            const playedMoves = cardMoves.slice(0, this.moveIndex);
            
            for (let i = 0; i < playedMoves.length; i += 2) {
                const moveNumber = Math.floor(i / 2) + 1;
                movesHtml += `${moveNumber}. ${playedMoves[i]}`;
                if (playedMoves[i + 1]) {
                    movesHtml += ` ${playedMoves[i + 1]}`;
                }
                movesHtml += '<br>';
            }
            
            this.elements.movesList.innerHTML = movesHtml;
            return;
        }
        
        // Normal mode move history logic remains the same
        const currentData = this.getCurrentData();
        const history = this.chessEngine.getMoveHistory();
        const setupLength = currentData.openingSetup ? currentData.openingSetup.length : 0;
        
        if (setupLength > 0) {
            for (let i = 0; i < setupLength; i += 2) {
                const moveNumber = Math.floor(i / 2) + 1;
                movesHtml += `${moveNumber}. ${currentData.openingSetup[i]}`;
                if (currentData.openingSetup[i + 1]) {
                    movesHtml += ` ${currentData.openingSetup[i + 1]}`;
                    movesHtml += '<br>';
                }
            }
        }
        
        if (history.length > 0) {
            const setupIsOdd = (setupLength % 2 === 1);
            let historyIndex = 0;
            
            if (setupIsOdd && history.length > 0) {
                movesHtml += ` ${history[0]}`;
                movesHtml += '<br>';
                historyIndex = 1;
            }
            
            const startingMoveNumber = Math.floor(setupLength / 2) + 1;
            
            for (let i = historyIndex; i < history.length; i += 2) {
                const pairIndex = Math.floor((i - historyIndex) / 2);
                const moveNumber = startingMoveNumber + (setupIsOdd ? 1 : 0) + pairIndex;
                
                movesHtml += `${moveNumber}. ${history[i]}`;
                if (history[i + 1]) {
                    movesHtml += ` ${history[i + 1]}`;
                }
                movesHtml += '<br>';
            }
        }
        
        this.elements.movesList.innerHTML = movesHtml;
    }
    
    handleUserMove(move) {
        if (this.isSpacedRepetitionMode) {
            this.handleSpacedRepetitionMove(move);
            return;
        }
        
        const line = this.getCurrentLine();
        if (!line || !line.moves) {
            this.showMessage('No moves available for this line', false);
            return;
        }
        
        const expectedMove = line.moves[this.moveIndex];
        
        if (move.san === expectedMove || move.lan === expectedMove) {
            console.log(`✅ Correct move: ${move.san} (expected: ${expectedMove})`);
            
            this.moveIndex++;
            this.updateMoveHistory();
            this.updateProgress((this.moveIndex / line.moves.length) * 100);
            
            if (this.moveIndex >= line.moves.length) {
                this.showMessage(`🎉 Line completed! ${line.name}`, true, true);
            } else {
                this.showMessage(`✅ Correct!`, true);
                setTimeout(() => {
                    this.makeComputerMoveIfNeeded();
                }, 800);
            }
        } else {
            this.chessEngine.undoMove();
            this.showMessage(`❌ Wrong move! Expected: ${expectedMove}${this.isExerciseMode ? ' (Try the hint!)' : ''}`, false);
        }
    }
    
    // ADD THESE ADDITIONAL FUNCTIONS if they're missing from your trainer-core.js:

    // Theory move handling
    handleTheoryMove(move) {
        const line = this.getCurrentLine();
        if (!line || !line.moves) return;
        
        const expectedMove = line.moves[this.moveIndex];
        if (move.san === expectedMove || move.lan === expectedMove) {
            this.moveIndex++;
            this.updateMoveHistory();
            this.updateStatus();
            this.updateProgress((this.moveIndex / line.moves.length) * 100);
            
            if (this.moveIndex >= line.moves.length) {
                this.showMessage('🎉 Line completed!', true);
            } else {
                setTimeout(() => {
                    this.makeComputerMoveIfNeeded();
                }, 1000);
            }
        } else {
            this.showMessage(`❌ Expected: ${expectedMove}`, false);
            this.chessEngine.undoMove();
        }
    }

    // Exercise move handling
    handleExerciseMove(move) {
        const line = this.getCurrentLine();
        if (!line) return;
        
        if (line.solution && line.solution.includes(move.san)) {
            this.showMessage('🎉 Correct!', true);
            this.moveIndex++;
            this.updateMoveHistory();
        } else {
            this.showMessage('❌ Try another move', false);
            this.chessEngine.undoMove();
        }
    }

    // ENHANCED updateSpacedRepetitionInfo function (replace if yours is incomplete):
    updateSpacedRepetitionInfo() {
        if (!this.elements.positionInfo || !this.currentCard) return;
        
        const stats = this.srManager.getStats();
        const isLearningPhase = this.currentCard.lineCompletions < 2;
        
        let currentMoveIndex = this.currentCard.currentMoveInLine || 0;
        const totalMoves = this.currentCard.moves ? this.currentCard.moves.length : 0;
        
        const phaseText = isLearningPhase ? 
            `📚 Learning Phase (Run ${(this.currentCard.lineCompletions || 0) + 1}/2)` : 
            `🧠 Testing Phase (Attempt ${(this.currentCard.totalTestAttempts || 0) + 1})`;
        
        const html = `
            <h4>🧠 Spaced Repetition: ${this.currentCard.name}</h4>
            <div style="background-color: ${isLearningPhase ? '#e8f5e8' : '#fff3e0'}; padding: 10px; border-radius: 5px; margin: 10px 0;">
                <strong>${phaseText}</strong><br>
                Move: ${currentMoveIndex + 1}/${totalMoves}<br>
                Description: ${this.currentCard.description || 'Practice this line'}
            </div>
            <div style="background-color: #f5f5f5; padding: 8px; border-radius: 5px; font-size: 14px;">
                📊 Session: ${stats.session.studied} studied, ${stats.session.correct} correct (${stats.session.successRate}%)<br>
                📚 Learning: ${stats.learningCards} | 🧠 Testing: ${stats.testingCards} | ✅ Mastered: ${stats.masteredCards}
            </div>
        `;
        
        this.elements.positionInfo.innerHTML = html;
    }

    // ENHANCED updateMoveHistory for spaced repetition (replace if incomplete):
    updateMoveHistory() {
        if (!this.elements.movesList) return;
        
        let movesHtml = '';
        
        if (this.isSpacedRepetitionMode && this.currentCard) {
            const cardMoves = this.currentCard.moves || [];
            const playedMoves = cardMoves.slice(0, this.moveIndex);
            
            for (let i = 0; i < playedMoves.length; i += 2) {
                const moveNumber = Math.floor(i / 2) + 1;
                movesHtml += `${moveNumber}. ${playedMoves[i] || ''} ${playedMoves[i + 1] || ''}<br>`;
            }
        } else {
            const line = this.getCurrentLine();
            if (line && line.moves) {
                const playedMoves = line.moves.slice(0, this.moveIndex);
                for (let i = 0; i < playedMoves.length; i += 2) {
                    const moveNumber = Math.floor(i / 2) + 1;
                    movesHtml += `${moveNumber}. ${playedMoves[i] || ''} ${playedMoves[i + 1] || ''}<br>`;
                }
            }
        }
        
        this.elements.movesList.innerHTML = movesHtml;
    }

    // ENHANCED updatePositionInfo function:
    updatePositionInfo() {
        if (!this.elements.positionInfo) return;
        
        if (this.isSpacedRepetitionMode) {
            this.updateSpacedRepetitionInfo();
            return;
        }
        
        const line = this.getCurrentLine();
        if (!line) return;
        
        const info = `
            <h4>${line.name}</h4>
            <p>${line.description || ''}</p>
            ${line.analysis ? `<div class="analysis">${line.analysis}</div>` : ''}
        `;
        
        this.elements.positionInfo.innerHTML = info;
    }

    // Utility functions that might be missing:
    updateProgress(percentage) {
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = `${percentage}%`;
        }
    }

    showHint() {
        const expectedMove = this.getNextExpectedMove();
        if (expectedMove) {
            this.showMessage(`💡 Hint: Try ${expectedMove}`, true);
        }
    }

    showMessage(message, isSuccess = true) {
        const element = isSuccess ? this.elements.successMessage : this.elements.errorMessage;
        const otherElement = isSuccess ? this.elements.errorMessage : this.elements.successMessage;
        
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
            setTimeout(() => {
                element.style.display = 'none';
            }, 3000);
        }
        
        if (otherElement) {
            otherElement.style.display = 'none';
        }
    }

    makeComputerMoveIfNeeded() {
        if (this.shouldComputerMove()) {
            setTimeout(() => {
                this.makeComputerMove();
            }, 500);
        }
    }
    
    makeComputerMove() {
        const line = this.getCurrentLine();
        if (!line || !line.moves || this.moveIndex >= line.moves.length) return;
        
        const computerMove = line.moves[this.moveIndex];
        const move = this.chessEngine.makeMove(computerMove);
        
        if (move) {
            this.moveIndex++;
            this.updateStatus();
            this.updateMoveHistory();
            this.showMessage(`Computer plays: ${move.san}`, true);
            
            setTimeout(() => {
                if (this.moveIndex < line.moves.length && this.shouldComputerMove()) {
                    this.makeComputerMove();
                }
            }, 500);
        }
    }
    
    updatePositionInfo() {
        if (!this.elements.positionInfo) return;
        
        if (this.isSpacedRepetitionMode && this.currentCard) {
            this.updateSpacedRepetitionInfo();
            return;
        }
        
        let html = '';
        const line = this.getCurrentLine();
        
        if (line) {
            html = `
                <h4>${line.name}</h4>
                <p><strong>Description:</strong> ${line.description || 'No description available.'}</p>
            `;
            
            if (this.isExerciseMode && line.instruction) {
                html += `
                    <div style="background-color: #f0f8ff; padding: 10px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #4CAF50;">
                        <strong>INSTRUCTION:</strong> ${line.instruction}
                    </div>
                `;
            }
            
            const currentData = this.getCurrentData();
            const filteredLines = this.isExerciseMode ? 
                currentData.lines : 
                currentData.lines.filter(line => 
                    (line.category || "Main Lines") === this.currentCategory
                );
            
            html += `<p><em>Progress: Line ${this.currentLine + 1} of ${filteredLines.length}</em></p>`;
        }
        
        this.elements.positionInfo.innerHTML = html;
        
        if (this.elements.challengeBox) this.elements.challengeBox.style.display = 'none';
        if (this.elements.hintBtn) this.elements.hintBtn.style.display = this.isExerciseMode ? 'inline' : 'none';
    }
    
    updateStatus() {
        if (!this.elements.status) return;
        
        if (this.isSpacedRepetitionMode) {
            if (this.currentCard) {
                const isLearningPhase = this.currentCard.lineCompletions < 2;
                if (this.canHumanMove()) {
                    this.elements.status.textContent = isLearningPhase ? 
                        `📚 Learning: Follow the moves...` : 
                        `🧠 Testing: Find the best move...`;
                } else {
                    this.elements.status.textContent = `Computer is thinking...`;
                }
            }
            return;
        }
        
        const line = this.getCurrentLine();
        if (!line) {
            this.elements.status.textContent = 'No line loaded';
            return;
        }
        
        const currentTurn = this.getFENTurn();
        const canMove = this.canHumanMove();
        
        if (this.isExerciseMode) {
            this.elements.status.textContent = `Exercise: ${line.name} - Your move!`;
        } else if (canMove) {
            const nextMove = line.moves[this.moveIndex];
            this.elements.status.textContent = nextMove ? 
                `Your turn as ${currentTurn}! Find the next move...` : 
                'Line completed!';
        } else {
            this.elements.status.textContent = `Computer playing as ${currentTurn}...`;
        }
    }
    
    showHint() {
        const line = this.getCurrentLine();
        if (!line) return;
        
        if (this.isExerciseMode && line.hint) {
            this.showMessage(`💡 HINT: ${line.hint}`, true);
        } else if (!this.isExerciseMode && line.moves && this.moveIndex < line.moves.length) {
            const nextMove = line.moves[this.moveIndex];
            this.showMessage(`💡 HINT: Next move is ${nextMove}`, true);
        }
    }
    
    showMessage(message, isSuccess, isPersistent = false) {
        if (!this.elements.successMessage || !this.elements.errorMessage) return;
        
        this.elements.successMessage.style.display = 'none';
        this.elements.errorMessage.style.display = 'none';
        
        const messageElement = isSuccess ? this.elements.successMessage : this.elements.errorMessage;
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        
        if (!isPersistent) {
            setTimeout(() => {
                messageElement.style.display = 'none';
            }, 3000);
        }
    }
    
    updateProgress(percentage) {
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = `${percentage}%`;
        }
    }
}