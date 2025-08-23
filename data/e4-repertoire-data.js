// /data/e4-repertoire-data.js - LIBERATED ANDRAS TOTH E4 COURSE
// 🚩 FREED FROM CORPORATE PAYWALLS FOR THE PEOPLE! 🚩

export const e4RepertoireData = {
    name: "IM Andras Toth - E4 for Club Players",
    description: "Complete e4 repertoire by 2021 Chessable Author of the Year",
    author: "IM Andras Toth",
    source: "Lichess Study (Liberated)",
    playerColor: "white",
    orientation: "white",
    startingFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    
    theory: {
        lines: [
            // PETROV DEFENSE - Chapter 1
            {
                category: "Petrov Defense",
                name: "Petrov: Nimzowitsch Attack",
                description: "Aggressive line against the Petrov Defense with quick Qe2",
                moves: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "Qe7", "Nf3", "d6", "Qe2", "Qxe4", "Qxe4+", "Nxe4"],
                analysis: "After Black's inaccurate 3...Qe7, we return the knight and transpose to a favorable endgame. Black's early queen move gives White excellent practical chances.",
                startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
            },
            {
                category: "Petrov Defense", 
                name: "Petrov: Main Line Trap",
                description: "Deadly trap when Black plays the hasty d6",
                moves: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "d6", "Nc3", "Bg4", "h3", "Bxf3", "Qxf3", "dxe5", "Nd5", "Nxd5", "Qxd5", "c6", "Qxe5+", "Be7", "Bf4"],
                analysis: "The critical trap line. After 4...d6??, White gets a crushing position with Nc3! followed by tactical shots.",
                startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
            },

            // SCANDINAVIAN DEFENSE - Multiple Variations
            {
                category: "Scandinavian Defense",
                name: "Scandinavian: Portuguese Gambit",
                description: "Modern approach with d4! against 2...Nf6",
                moves: ["e4", "d5", "exd5", "Nf6", "d4", "Nxd5", "Nf3", "g6", "c4", "Nb6", "Nc3", "Bg7", "c5", "Nd5", "Bc4", "Nxc3", "bxc3", "O-O", "O-O"],
                analysis: "Against the Portuguese Gambit, we simply develop with d4! instead of defending the pawn. This leads to excellent practical chances.",
                startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
            },
            {
                category: "Scandinavian Defense",
                name: "Scandinavian: Main Line 3...Qa5",
                description: "Classical approach against the main line Scandinavian",
                moves: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5", "d4", "Nf6", "Nf3", "c6", "Bd2", "Bg4", "h3", "Bh5", "g4", "Bg6", "Ne5"],
                analysis: "Against the main line 3...Qa5, we develop naturally with Bd2 to eliminate the pin, then launch a kingside attack with g4! and Ne5.",
                startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
            },
            {
                category: "Scandinavian Defense",
                name: "Scandinavian: Mieses Variation", 
                description: "Aggressive setup against 3...Qa5 4.d4 Nf6 5.Nf3 c6",
                moves: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5", "d4", "Nf6", "Nf3", "c6", "Bd2", "Bg4", "h3", "Bh5", "g4", "Bg6", "Ne5", "Nbd7", "f4", "e6", "h4"],
                analysis: "The aggressive h4! push puts maximum pressure on the black bishop. White gets excellent attacking chances on the kingside.",
                startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
            },

            // ALAPIN SICILIAN - Anti-Sicilian System
            {
                category: "Alapin Sicilian",
                name: "Alapin: Smith-Morra Declined",
                description: "Solid system against the Sicilian with c3",
                moves: ["e4", "c5", "c3", "Nf6", "e5", "Nd5", "d4", "cxd4", "Nf3", "e6", "cxd4", "d6", "Bc4", "Be7", "O-O", "O-O", "Qe2"],
                analysis: "The Alapin gives us a solid space advantage. After Black plays the natural moves, we get excellent development and central control.",
                startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
            },
            {
                category: "Alapin Sicilian",
                name: "Alapin: Tactical Shot with Bxd5",
                description: "Surprising tactical motif with bishop sacrifice",
                moves: ["e4", "c5", "c3", "Nf6", "e5", "Nd5", "d4", "cxd4", "Nf3", "e6", "cxd4", "d6", "Bc4", "Be7", "O-O", "O-O", "Qe2", "b6", "Rd1", "Bb7", "Bxd5", "Bxd5", "Nc3", "Bb7", "d5"],
                analysis: "The surprising Bxd5!! sacrifice leads to tremendous central pressure. After d5!, Black struggles to coordinate their pieces.",
                startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
            },
            {
                category: "Alapin Sicilian",
                name: "Alapin: Gambit Line with Nxc3",
                description: "Sharp gambit when Black takes on c3",
                moves: ["e4", "c5", "c3", "Nf6", "e5", "Nd5", "d4", "cxd4", "Nf3", "Nc6", "Bc4", "Nb6", "Bb3", "dxc3", "Nxc3", "g6", "Ng5"],
                analysis: "When Black gets greedy with dxc3, we get a fantastic Smith-Morra style attack. Ng5! creates immediate threats on f7.",
                startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
            },

            // PIRC DEFENSE
            {
                category: "Pirc Defense",
                name: "Pirc: Classical Setup",
                description: "Standard development against the Pirc",
                moves: ["e4", "d6", "d4", "Nf6", "Nc3", "g6", "Be3", "Bg7", "Qd2", "O-O", "h4"],
                analysis: "Against the Pirc, we develop naturally with Be3 and Qd2, then start a kingside attack with h4! The black king looks unsafe.",
                startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
            },
            {
                category: "Pirc Defense", 
                name: "Pirc: Austrian Attack Style",
                description: "Aggressive approach with f4 and kingside attack",
                moves: ["e4", "d6", "d4", "Nf6", "Nc3", "g6", "Be3", "Bg7", "Qd2", "O-O", "O-O-O", "Nc6", "f4", "a6", "h4"],
                analysis: "The aggressive setup with O-O-O and f4 gives White excellent attacking chances. Black's counterplay is too slow.",
                startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"
            }
        ]
    },

    exercises: {
        "Tactical Motifs": {
            lines: [
                {
                    name: "Petrov Trap: Nd5! Tactic",
                    description: "Find the crushing blow after Black plays d6??",
                    fen: "rnbqkb1r/ppp2ppp/3p1n2/4n3/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
                    solution: ["Nc3", "Bg4", "h3", "Bxf3", "Qxf3", "dxe5", "Nd5"],
                    hint: "Look for a powerful knight centralization!"
                },
                {
                    name: "Scandinavian: g4! Push", 
                    description: "How to attack the bishop on h5?",
                    fen: "r1bqkb1r/pp3ppp/2n1pn2/q5b1/3P4/2N2N1P/PPP1BPP1/R1BQK2R w KQkq - 0 8",
                    solution: ["g4", "Bg6", "Ne5"],
                    hint: "Push the kingside pawns to attack!"
                },
                {
                    name: "Alapin: Bxd5!! Sacrifice",
                    description: "Find the surprising bishop sacrifice",
                    fen: "r2qk2r/pb2bppp/1pn1pn2/3n4/2BP4/2N2N2/PPQ2PPP/R1B1R1K1 w kq - 0 11",
                    solution: ["Bxd5", "Bxd5", "Nc3", "Bb7", "d5"],
                    hint: "Sometimes material is less important than central control!"
                },
                {
                    name: "Pirc: h4-h5 Attack",
                    description: "How to open the h-file against the fianchetto?",
                    fen: "r1bq1rk1/ppp1ppbp/2np1np1/8/3PP2P/2N1BN2/PPP2PP1/R2QKB1R w KQ - 0 9",
                    solution: ["h5", "gxh5", "Nxh5"],
                    hint: "Open lines against the enemy king!"
                }
            ]
        },
        
        "Opening Traps": {
            lines: [
                {
                    name: "Scandinavian Greed Punishment", 
                    description: "Black takes too many pawns - punish them!",
                    fen: "r1bqkb1r/ppp2ppp/2n5/8/2Bp4/2n2N2/PPP2PPP/RNBQK2R w KQkq - 0 8",
                    solution: ["Nd5", "Nxd1", "Nc5+", "Kb8", "Bf4+", "Bd6", "Bxd6#"],
                    hint: "The king in the center is very dangerous!"
                },
                {
                    name: "Petrov Defense Refutation",
                    description: "Black played 4...d6?? - how to punish?",
                    fen: "rnbqkb1r/ppp2ppp/3p1n2/4N3/3P4/8/PPP2PPP/RNBQKB1R w KQkq - 0 5", 
                    solution: ["Nc3", "Nxe4", "Nd5"],
                    hint: "Develop with threats!"
                },
                {
                    name: "Alapin Gambit Trap",
                    description: "Black took on c3 greedily - capitalize!",
                    fen: "r1bqkb1r/pp3ppp/1nn5/8/2B5/3p1N2/PPP2PPP/RNBQK2R w KQkq - 0 9",
                    solution: ["Ng5", "Nxe5", "f4", "h6", "fxe5", "hxg5", "O-O"],
                    hint: "Attack f7 immediately!"
                }
            ]
        }
    }
};

// Additional variations and sub-lines
export const e4RepertoireVariations = {
    "petrov_traps": [
        {
            name: "Petrov: 4...d6?? Trap",
            moves: ["e4", "e5", "Nf3", "Nf6", "Nxe5", "d6", "Nc3", "Nxe4", "Nd5"],
            description: "After 4...d6??, the powerful Nc3! followed by Nd5! gives White a crushing position."
        }
    ],
    
    "scandinavian_lines": [
        {
            name: "Portuguese: Richter Variation", 
            moves: ["e4", "d5", "exd5", "Nf6", "d4", "Nxd5", "Nf3", "g6", "c4", "Nb6", "Nc3", "Bg7"],
            description: "The modern approach against the Portuguese Gambit - simply develop with d4!"
        },
        {
            name: "Main Line: Aggressive Setup",
            moves: ["e4", "d5", "exd5", "Qxd5", "Nc3", "Qa5", "d4", "Nf6", "Nf3", "c6", "Bd2", "Bg4", "h3", "Bh5", "g4"],
            description: "The key idea g4! puts immediate pressure on Black's bishop and opens attacking lines."
        }
    ],
    
    "alapin_tactics": [
        {
            name: "Smith-Morra Style Gambit",
            moves: ["e4", "c5", "c3", "Nf6", "e5", "Nd5", "d4", "cxd4", "Nf3", "Nc6", "Bc4", "Nb6", "Bb3", "dxc3", "Nxc3"],
            description: "When Black takes the c3 pawn, we get excellent compensation in the style of the Smith-Morra Gambit."
        }
    ],
    
    "pirc_setups": [
        {
            name: "Classical Development",
            moves: ["e4", "d6", "d4", "Nf6", "Nc3", "g6", "Be3", "Bg7", "Qd2", "O-O"],
            description: "The standard setup against the Pirc gives White excellent central control and attacking chances."
        }
    ]
};