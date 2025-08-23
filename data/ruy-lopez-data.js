/**
 * Ruy Lopez Test Course
 * File: /data/ruy-lopez-data.js
 * 
 * Simple 4-move opening to test the refactored architecture
 */

export const ruyLopezData = {
    name: "Ruy Lopez",
    playerColor: "both",  // Can play both sides
    orientation: "white",
    
    theory: {
        startingFen: null,  // Start from initial position
        lines: [
            {
                name: "Main Line - Morphy Defense",
                category: "Main Lines",
                moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6"],
                description: "The most common response to the Ruy Lopez. Black immediately challenges the bishop.",
                hint: "Black puts the question to the bishop immediately with a6",
                evaluation: "Leads to rich middlegame positions"
            },
            {
                name: "Berlin Defense",
                category: "Main Lines",
                moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6"],
                description: "The Berlin Defense - solid and popular at top level since Kramnik used it against Kasparov.",
                hint: "Black develops the knight to f6 instead of playing a6",
                evaluation: "Very solid, often leads to an endgame"
            },
            {
                name: "Classical Defense",
                category: "Classical Lines",
                moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Bc5"],
                description: "Black develops the bishop actively. Less common but fully playable.",
                hint: "Black mirrors White's development with Bc5",
                evaluation: "Sharp play possible"
            },
            {
                name: "Schliemann Defense",
                category: "Gambits",
                moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "f5"],
                description: "An aggressive gambit where Black immediately counterattacks in the center.",
                hint: "Black plays f5!? for immediate counterplay",
                evaluation: "Very sharp and tactical"
            }
        ]
    },
    
    exercises: {
        lines: [
            {
                name: "Identify the Ruy Lopez",
                description: "White has just played Bb5. What opening is this?",
                fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
                moves: ["a6"],  // Expected response
                hint: "This is the Ruy Lopez! Black usually plays a6 or Nf6",
                category: "Recognition"
            },
            {
                name: "Find the Berlin Defense",
                description: "How does Black play the Berlin Defense here?",
                fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
                moves: ["Nf6"],  // Berlin Defense move
                hint: "The Berlin Defense develops the knight to f6",
                category: "Defense Choice"
            }
        ]
    },
    
    // Auto-generate spaced repetition from theory lines
    spacedRepetition: {
        lines: [
            {
                name: "Main Line - Morphy Defense",
                moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6"],
                description: "Practice the Morphy Defense",
                lineIndex: 0
            },
            {
                name: "Berlin Defense",
                moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6"],
                description: "Practice the Berlin Defense",
                lineIndex: 1
            }
        ]
    }
};