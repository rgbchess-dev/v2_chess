/**
 * UI Manager
 * File: /engine/ui-manager.js
 * 
 * Responsibilities:
 * - All DOM manipulation
 * - User input handling
 * - Visual feedback
 * - Listening to trainer events
 */

export class UIManager {
    constructor(trainer) {
        this.trainer = trainer;
        this.elements = {};
        
        this.initializeElements();
        this.attachTrainerListeners();
        this.attachUIListeners();
    }
    
    // ============================================
    // INITIALIZATION
    // ============================================
    
    initializeElements() {
        // Cache all DOM elements
        this.elements = {
            // Controls
            modeSelect: document.getElementById('modeSelect'),
            categorySelect: document.getElementById('categorySelect'),
            categoryLabel: document.getElementById('categoryLabel'),
            lineSelect: document.getElementById('lineSelect'),
            colorSelect: document.getElementById('colorSelect'),
            
            // Buttons
            prevLineBtn: document.getElementById('prevLineBtn'),
            nextLineBtn: document.getElementById('nextLineBtn'),
            hintBtn: document.getElementById('hintBtn'),
            resetBtn: document.getElementById('resetBtn'),
            flipBtn: document.getElementById('flipBtn'),
            
            // Display areas
            positionInfo: document.getElementById('positionInfo'),
            challengeBox: document.getElementById('challengeBox'),
            status: document.getElementById('status'),
            movesList: document.getElementById('movesList'),
            
            // Feedback
            successMessage: document.getElementById('successMessage'),
            errorMessage: document.getElementById('errorMessage'),
            progressFill: document.getElementById('progressFill')
        };
    }
    
    // ============================================
    // TRAINER EVENT LISTENERS
    // ============================================
    
    attachTrainerListeners() {
        // Initialization
        this.trainer.addEventListener('initialized', (e) => {
            this.handleInitialized(e.detail);
        });
        
        // Mode changes
        this.trainer.addEventListener('modeChanged', (e) => {
            this.handleModeChanged(e.detail);
        });
        
        // Position loading
        this.trainer.addEventListener('positionLoaded', (e) => {
            this.handlePositionLoaded(e.detail);
        });
        
        // Move events
        this.trainer.addEventListener('correctMove', (e) => {
            this.handleCorrectMove(e.detail);
        });
        
        this.trainer.addEventListener('incorrectMove', (e) => {
            this.handleIncorrectMove(e.detail);
        });
        
        this.trainer.addEventListener('computerMove', (e) => {
            this.handleComputerMove(e.detail);
        });
        
        // Line events
        this.trainer.addEventListener('lineComplete', (e) => {
            this.handleLineComplete(e.detail);
        });
        
        this.trainer.addEventListener('lineChanged', (e) => {
            this.handleLineChanged(e.detail);
        });
        
        // Category events
        this.trainer.addEventListener('categoryChanged', (e) => {
            this.handleCategoryChanged(e.detail);
        });
        
        // Spaced repetition
        this.trainer.addEventListener('spacedRepetitionCardLoaded', (e) => {
            this.handleSpacedRepetitionCard(e.detail);
        });
        
        this.trainer.addEventListener('spacedRepetitionProgress', (e) => {
            this.handleSpacedRepetitionProgress(e.detail);
        });
        
        // Other events
        this.trainer.addEventListener('hint', (e) => {
            this.showHint(e.detail.hint);
        });
        
        this.trainer.addEventListener('error', (e) => {
            this.showError(e.detail.message);
        });
    }
    
    // ============================================
    // UI EVENT LISTENERS
    // ============================================
    
    attachUIListeners() {
        // Mode selection
        if (this.elements.modeSelect) {
            this.elements.modeSelect.addEventListener('change', () => {
                this.trainer.setMode(this.elements.modeSelect.value);
            });
        }
        
        // Category selection
        if (this.elements.categorySelect) {
            this.elements.categorySelect.addEventListener('change', () => {
                this.trainer.setCategory(this.elements.categorySelect.value);
            });
        }
        
        // Line selection
        if (this.elements.lineSelect) {
            this.elements.lineSelect.addEventListener('change', () => {
                this.trainer.selectLine(parseInt(this.elements.lineSelect.value));
            });
        }
        
        // Color selection
        if (this.elements.colorSelect) {
            this.elements.colorSelect.addEventListener('change', () => {
                this.trainer.setPlayerColor(this.elements.colorSelect.value);
            });
        }
        
        // Navigation buttons
        if (this.elements.prevLineBtn) {
            this.elements.prevLineBtn.addEventListener('click', () => {
                this.trainer.previousLine();
            });
        }
        
        if (this.elements.nextLineBtn) {
            this.elements.nextLineBtn.addEventListener('click', () => {
                this.trainer.nextLine();
            });
        }
        
        // Action buttons
        if (this.elements.hintBtn) {
            this.elements.hintBtn.addEventListener('click', () => {
                this.trainer.showHint();
            });
        }
        
        if (this.elements.resetBtn) {
            this.elements.resetBtn.addEventListener('click', () => {
                this.trainer.resetPosition();
            });
        }
        
        if (this.elements.flipBtn) {
            this.elements.flipBtn.addEventListener('click', () => {
                this.trainer.flipBoard();
            });
        }
    }
    
    // ============================================
    // EVENT HANDLERS
    // ============================================
    
    handleInitialized(data) {
        // Update mode select
        if (this.elements.modeSelect) {
            this.elements.modeSelect.value = data.mode;
        }
        
        // Populate categories
        this.updateCategorySelect(data.courseData);
        
        // Initialize UI state
        this.updateModeInterface(data.mode);
    }
    
    handleModeChanged(data) {
        this.updateModeInterface(data.mode);
        
        // Update available categories for this mode
        if (data.categories && data.categories.length > 0) {
            this.populateCategorySelect(data.categories);
        } else {
            // Hide category select for modes without categories
            if (this.elements.categorySelect) {
                this.elements.categorySelect.style.display = 'none';
            }
            if (this.elements.categoryLabel) {
                this.elements.categoryLabel.style.display = 'none';
            }
        }
    }
    
    handlePositionLoaded(data) {
        // Update line select
        this.updateLineSelect(data);
        
        // Update position info
        this.updatePositionInfo(data.line);
        
        // Update status
        this.setStatus(`Ready: ${data.line.name}`);
        
        // Reset progress
        this.updateProgress(0);
        
        // Show/hide hint button
        if (this.elements.hintBtn) {
            this.elements.hintBtn.style.display = data.line.hint ? 'inline-block' : 'none';
        }
    }
    
    handleCorrectMove(data) {
        this.showSuccess('✅ Correct!');
        this.updateProgress((data.progress.current / data.progress.total) * 100);
        this.updateMoveHistory(data.progress.movesPlayed);
    }
    
    handleIncorrectMove(data) {
        const message = data.expected ? 
            `❌ Wrong move! Expected: ${data.expected}` : 
            '❌ Incorrect move!';
        
        this.showError(message);
        
        // Add hint suggestion in exercise mode
        if (data.mode === 'exercises') {
            setTimeout(() => {
                this.setStatus('💡 Try using the hint button!');
            }, 2000);
        }
    }
    
    handleComputerMove(data) {
        this.updateProgress((data.progress.current / data.progress.total) * 100);
        this.updateMoveHistory(data.progress.movesPlayed);
    }
    
    handleLineComplete(data) {
        this.showSuccess(`🎉 Line completed! (${data.totalMoves} moves)`);
        this.updateProgress(100);
        
        if (data.mode === 'theory') {
            this.setStatus('Well done! Press Next to continue or Reset to practice again.');
        }
    }
    
    handleLineChanged(data) {
        if (this.elements.lineSelect) {
            this.elements.lineSelect.value = data.lineIndex;
        }
    }
    
    handleCategoryChanged(data) {
        // Repopulate line select with new category's lines
        this.populateLineSelect(data.lines);
    }
    
    handleSpacedRepetitionCard(data) {
        const { card, stats } = data;
        
        // Update position info with spaced repetition details
        const isLearningPhase = card.lineCompletions < 2;
        const phaseText = isLearningPhase ? 
            `📚 Learning Phase (Run ${card.lineCompletions + 1}/2)` : 
            `🧠 Testing Phase`;
        
        const html = `
            <h4>🧠 Spaced Repetition: ${card.name}</h4>
            <div style="background-color: ${isLearningPhase ? '#e8f5e8' : '#fff3e0'}; 
                        padding: 10px; border-radius: 5px; margin: 10px 0;">
                <strong>${phaseText}</strong><br>
                ${card.description || 'Practice this line'}
            </div>
            <div style="background-color: #f5f5f5; padding: 8px; border-radius: 5px;">
                📊 Session: ${stats.session.studied} studied, 
                ${stats.session.correct} correct (${stats.session.successRate}%)
            </div>
        `;
        
        if (this.elements.positionInfo) {
            this.elements.positionInfo.innerHTML = html;
        }
    }
    
    handleSpacedRepetitionProgress(data) {
        if (data.phase === 'learning') {
            this.showSuccess(`✅ Learning run ${data.completed}/2 completed!`);
        } else if (data.phase === 'testing') {
            if (data.success) {
                this.showSuccess('🎉 Testing completed successfully!');
            } else {
                this.showError('❌ Incorrect! Restarting line...');
            }
        }
    }
    
    // ============================================
    // UI UPDATE METHODS
    // ============================================
    
    updateModeInterface(mode) {
        const isExerciseMode = (mode === 'exercises');
        const isSpacedMode = (mode === 'spaced_repetition');
        
        // Show/hide category select based on mode
        if (this.elements.categorySelect) {
            this.elements.categorySelect.style.display = 
                isExerciseMode || isSpacedMode ? 'none' : 'inline-block';
        }
        if (this.elements.categoryLabel) {
            this.elements.categoryLabel.style.display = 
                isExerciseMode || isSpacedMode ? 'none' : 'inline-block';
        }
        
        // Show/hide line navigation for spaced repetition
        if (this.elements.lineSelect) {
            this.elements.lineSelect.style.display = isSpacedMode ? 'none' : 'inline-block';
        }
        if (this.elements.prevLineBtn) {
            this.elements.prevLineBtn.style.display = isSpacedMode ? 'none' : 'inline-block';
        }
        if (this.elements.nextLineBtn) {
            this.elements.nextLineBtn.style.display = isSpacedMode ? 'none' : 'inline-block';
        }
    }
    
    updateCategorySelect(courseData) {
        if (!this.elements.categorySelect) return;
        
        const categories = this.trainer.getAvailableCategories();
        this.populateCategorySelect(categories);
    }
    
    populateCategorySelect(categories) {
        if (!this.elements.categorySelect) return;
        
        this.elements.categorySelect.innerHTML = categories.map(cat => 
            `<option value="${cat}">${cat}</option>`
        ).join('');
    }
    
    updateLineSelect(data) {
        if (!this.elements.lineSelect) return;
        
        // Clear and repopulate
        this.elements.lineSelect.innerHTML = '';
        
        for (let i = 0; i < data.totalLines; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Line ${i + 1}`;
            
            if (i === data.lineIndex) {
                option.selected = true;
            }
            
            this.elements.lineSelect.appendChild(option);
        }
    }
    
    populateLineSelect(lines) {
        if (!this.elements.lineSelect) return;
        
        this.elements.lineSelect.innerHTML = lines.map((line, idx) => 
            `<option value="${idx}">${line.name || `Line ${idx + 1}`}</option>`
        ).join('');
    }
    
    updatePositionInfo(line) {
        if (!this.elements.positionInfo) return;
        
        const html = `
            <h4>${line.name}</h4>
            <p>${line.description || ''}</p>
            ${line.evaluation ? `<p><em>${line.evaluation}</em></p>` : ''}
        `;
        
        this.elements.positionInfo.innerHTML = html;
    }
    
    updateMoveHistory(moves) {
        if (!this.elements.movesList) return;
        
        let movesHtml = '';
        for (let i = 0; i < moves.length; i += 2) {
            const moveNumber = Math.floor(i / 2) + 1;
            movesHtml += `${moveNumber}. ${moves[i] || ''} ${moves[i + 1] || ''}<br>`;
        }
        
        this.elements.movesList.innerHTML = movesHtml;
    }
    
    updateProgress(percentage) {
        if (this.elements.progressFill) {
            this.elements.progressFill.style.width = `${percentage}%`;
        }
    }
    
    // ============================================
    // FEEDBACK METHODS
    // ============================================
    
    showSuccess(message) {
        if (this.elements.successMessage) {
            this.elements.successMessage.textContent = message;
            this.elements.successMessage.style.display = 'block';
            
            setTimeout(() => {
                this.elements.successMessage.style.display = 'none';
            }, 3000);
        }
    }
    
    showError(message) {
        if (this.elements.errorMessage) {
            this.elements.errorMessage.textContent = message;
            this.elements.errorMessage.style.display = 'block';
            
            setTimeout(() => {
                this.elements.errorMessage.style.display = 'none';
            }, 3000);
        }
    }
    
    showHint(hint) {
        // Could show in a modal or alert for now
        alert(`💡 Hint: ${hint}`);
    }
    
    setStatus(message) {
        if (this.elements.status) {
            this.elements.status.textContent = message;
        }
    }
    
    // ============================================
    // CLEANUP
    // ============================================
    
    destroy() {
        // Remove all event listeners if needed
        // This would require tracking them, which we can add if necessary
    }
}