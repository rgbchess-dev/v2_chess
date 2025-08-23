/**
 * Chess Engine Module - Reusable Chessground + Chess.js Integration
 * Place this file in: engine/chess-engine.js
 */

import { Chessground } from '../assets/js/chessground.min.js';

class ChessEngine {
    constructor(boardElementId, options = {}) {
        this.chess = new Chess();
        this.boardElement = document.getElementById(boardElementId);
        this.board = null;
        this.playerColor = options.playerColor || 'both'; // 'white', 'black', or 'both'
        this.orientation = options.orientation || 'white';
        this.onMoveCallback = null;
        this.onPromotionCallback = null;
        
        this.initializeBoard();
        this.setupPromotionHandlers();
    }

    // Core board functions
    initializeBoard() {
        this.board = Chessground(this.boardElement, {
            orientation: this.orientation,
            movable: {
                color: this.getMovableColor(),
                free: false,
                dests: this.calculateDests()
            },
            draggable: {
                showGhost: true
            }
        });

        // Set up move handling
        this.board.set({
            movable: {
                events: {
                    after: (orig, dest) => this.handleMove(orig, dest)
                }
            }
        });
    }

    // Utility functions
    calculateDests() {
        const dests = new Map();
        this.chess.SQUARES.forEach(s => {
            const ms = this.chess.moves({square: s, verbose: true});
            if (ms.length) dests.set(s, ms.map(m => m.to));
        });
        return dests;
    }

    getCurrentColor() {
        return this.chess.turn() === 'w' ? 'white' : 'black';
    }

    getMovableColor() {
        if (this.playerColor === 'both') return this.getCurrentColor();
        if (this.playerColor === this.getCurrentColor()) return this.getCurrentColor();
        return null; // Player cannot move
    }

    canPlayerMove() {
        if (this.playerColor === 'both') return true;
        return this.getCurrentColor() === this.playerColor;
    }

    // Move handling
    handleMove(orig, dest) {
        if (!this.canPlayerMove()) {
            console.log('Not your turn!');
            return;
        }

        // Check for promotion
        const piece = this.chess.get(orig);
        const isPromotion = piece && piece.type === 'p' && 
                           ((piece.color === 'w' && dest[1] === '8') || 
                            (piece.color === 'b' && dest[1] === '1'));

        if (isPromotion) {
            this.showPromotionSelector(orig, dest, piece.color);
            return;
        }

        // Try regular move
        const move = this.chess.move({from: orig, to: dest});
        
        if (move === null) {
            console.log(`Invalid move: ${orig}-${dest}`);
            return;
        }

        this.processMove(move);
    }

    processMove(move) {
        this.updateBoard();
        
        // Call callback if provided
        if (this.onMoveCallback) {
            this.onMoveCallback(move, this.chess);
        }
    }

    // Promotion handling
    showPromotionSelector(from, to, color) {
        const selector = document.getElementById('promotionSelector');
        
        // Hide ALL pieces first with !important
        const allPieces = selector.querySelectorAll('.promotion-piece');
        allPieces.forEach(piece => {
            piece.style.setProperty('display', 'none', 'important');
        });
        
        // Show ONLY the correct color pieces
        const targetClass = color === 'w' ? 'white' : 'black';
        const correctPieces = selector.querySelectorAll(`.promotion-piece.${targetClass}`);
        correctPieces.forEach(piece => {
            piece.style.setProperty('display', 'flex', 'important');
        });
        
        // Store move data
        selector.dataset.from = from;
        selector.dataset.to = to;
        
        // Show selector
        selector.style.display = 'block';
    }

    handlePromotion(promotionPiece) {
        const selector = document.getElementById('promotionSelector');
        const from = selector.dataset.from;
        const to = selector.dataset.to;
        
        // Hide selector
        selector.style.display = 'none';
        
        // Make promotion move
        const move = this.chess.move({
            from: from,
            to: to,
            promotion: promotionPiece
        });
        
        if (move) {
            this.processMove(move);
        } else {
            console.log('Promotion move failed!');
            this.updateBoard();
        }
    }

    setupPromotionHandlers() {
        // Set up promotion piece click handlers
        document.querySelectorAll('.promotion-piece').forEach(piece => {
            piece.addEventListener('click', () => {
                const promotionPiece = piece.dataset.piece;
                this.handlePromotion(promotionPiece);
            });
        });
    }

    // Board updates
    updateBoard() {
        this.board.set({
            fen: this.chess.fen(),
            turnColor: this.getCurrentColor(),
            movable: {
                color: this.getMovableColor(),
                dests: this.calculateDests()
            }
        });
    }

    // Public API methods
    loadPosition(fen) {
        if (fen) {
            this.chess.load(fen);
        } else {
            this.chess.reset();
        }
        this.updateBoard();
    }

    makeMove(move) {
        const result = this.chess.move(move);
        if (result) {
            this.updateBoard();
        }
        return result;
    }

    undoMove() {
        const move = this.chess.undo();
        if (move) {
            this.updateBoard();
        }
        return move;
    }

    getGameState() {
        return {
            fen: this.chess.fen(),
            turn: this.getCurrentColor(),
            inCheck: this.chess.in_check(),
            inCheckmate: this.chess.in_checkmate(),
            inStalemate: this.chess.in_stalemate(),
            inDraw: this.chess.in_draw(),
            gameOver: this.chess.game_over(),
            history: this.chess.history()
        };
    }

    getMoveHistory() {
        return this.chess.history();
    }

    setPlayerColor(color) {
        this.playerColor = color;
        this.updateBoard();
    }

    setOrientation(orientation) {
        this.orientation = orientation;
        this.board.set({ orientation: orientation });
    }

    flipBoard() {
        const newOrientation = this.orientation === 'white' ? 'black' : 'white';
        this.setOrientation(newOrientation);
        return newOrientation;
    }

    // Event handlers
    onMove(callback) {
        this.onMoveCallback = callback;
    }

    onPromotion(callback) {
        this.onPromotionCallback = callback;
    }

    // Testing/debug methods
    isValidMove(from, to, promotion = null) {
        const move = this.chess.move({from, to, promotion}, {dry_run: true});
        return move !== null;
    }

    getValidMoves(square = null) {
        if (square) {
            return this.chess.moves({square, verbose: true});
        }
        return this.chess.moves({verbose: true});
    }

    // Destroy
    destroy() {
        // Clean up event listeners if needed
        this.board = null;
        this.chess = null;
    }
}

// Export for use in trainers
export { ChessEngine };