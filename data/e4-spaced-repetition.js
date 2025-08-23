// /data/e4-spaced-repetition.js - SPACED REPETITION CARDS FOR E4 REPERTOIRE
// 🚩 OPTIMIZED LEARNING THROUGH SOVIET PSYCHOLOGICAL SCIENCE! 🚩

export const e4SpacedRepetitionData = {
    name: "IM Andras Toth - E4 Repertoire Cards",
    description: "Spaced repetition cards for complete e4 repertoire mastery",
    
    cards: [
        // PETROV DEFENSE CARDS
        {
            id: "petrov_nimzowitsch_main",
            name: "Petrov: Nimzowitsch Attack Main Line",
            description: "Learn the main line against Petrov with Qe2",
            category: "Petrov Defense",
            difficulty: "beginner",
            startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
            moves: ["e5", "Nf3", "Nf6", "Nxe5", "Qe7", "Nf3", "d6", "Qe2"],
            playerColor: "white",
            orientation: "white",
            keyIdeas: ["Return knight with Nf3", "Transpose to favorable endgame", "Exploit early queen"]
        },
        {
            id: "petrov_trap_line",
            name: "Petrov: Deadly d6 Trap",
            description: "Punish the premature d6 move with Nc3!",
            category: "Petrov Defense", 
            difficulty: "intermediate",
            startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
            moves: ["e5", "Nf3", "Nf6", "Nxe5", "d6", "Nc3", "Nxe4", "Nd5"],
            playerColor: "white",
            orientation: "white", 
            keyIdeas: ["d6 is a serious mistake", "Nc3 develops with threats", "Nd5 centralizes powerfully"]
        },

        // SCANDINAVIAN DEFENSE CARDS
        {
            id: "scandinavian_portuguese_main",
            name: "Scandinavian: Portuguese Gambit with d4",
            description: "Modern approach against 2...Nf6 Portuguese Gambit",
            category: "Scandinavian Defense",
            difficulty: "beginner", 
            startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
            moves: ["d5", "exd5", "Nf6", "d4", "Nxd5", "Nf3", "g6", "c4"],
            playerColor: "white",
            orientation: "white",
            keyIdeas: ["d4 instead of defending pawn", "Central control priority", "c4 space advantage"]
        },
        {
            id: "scandinavian_main_line",
            name: "Scandinavian: Main Line 3...Qa5",
            description: "Classical setup against main line Scandinavian",
            category: "Scandinavian Defense",
            difficulty: "intermediate",
            startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", 
            moves: ["d5", "exd5", "Qxd5", "Nc3", "Qa5", "d4", "Nf6", "Nf3", "c6", "Bd2"],
            playerColor: "white",
            orientation: "white",
            keyIdeas: ["Bd2 eliminates pin", "Natural development", "Prepare kingside attack"]
        },
        {
            id: "scandinavian_g4_attack",
            name: "Scandinavian: g4! Kingside Attack",
            description: "Learn the aggressive g4 push against Bh5",
            category: "Scandinavian Defense",
            difficulty: "intermediate",
            startingFen: "r1bqkb1r/pp3ppp/2n1pn2/q5b1/3P4/2N2N1P/PPP1BPP1/R1BQK2R w KQkq - 0 8",
            moves: ["g4", "Bg6", "Ne5"],
            playerColor: "white", 
            orientation: "white",
            keyIdeas: ["g4 attacks bishop", "Open kingside lines", "Ne5 centralizes"]
        },

        // ALAPIN SICILIAN CARDS  
        {
            id: "alapin_main_setup",
            name: "Alapin: Main Line Setup",
            description: "Standard development in Alapin Sicilian",
            category: "Alapin Sicilian",
            difficulty: "beginner",
            startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
            moves: ["c5", "c3", "Nf6", "e5", "Nd5", "d4", "cxd4", "Nf3"],
            playerColor: "white",
            orientation: "white", 
            keyIdeas: ["c3 supports center", "e5 space advantage", "Natural development"]
        },
        {
            id: "alapin_bxd5_tactic",
            name: "Alapin: Bxd5!! Tactical Shot",
            description: "Learn the surprising bishop sacrifice for central control",
            category: "Alapin Sicilian",
            difficulty: "advanced",
            startingFen: "r2qk2r/pb2bppp/1pn1pn2/3n4/2BP4/2N2N2/PPQ2PPP/R1B1R1K1 w kq - 0 11",
            moves: ["Bxd5", "Bxd5", "Nc3", "Bb7", "d5"],
            playerColor: "white",
            orientation: "white",
            keyIdeas: ["Material sacrifice for position", "Central pawn storm", "Pressure on e6"]
        },
        {
            id: "alapin_gambit_line", 
            name: "Alapin: Gambit with Ng5",
            description: "Attack f7 when Black takes on c3",
            category: "Alapin Sicilian",
            difficulty: "intermediate",
            startingFen: "r1bqkb1r/pp3ppp/1nn5/8/2B5/3p1N2/PPP2PPP/RNBQK2R w KQkq - 0 9",
            moves: ["Ng5", "Nxe5", "f4", "h6", "fxe5", "hxg5", "O-O"],
            playerColor: "white", 
            orientation: "white",
            keyIdeas: ["Ng5 attacks f7", "Sacrifice for attack", "King safety first"]
        },

        // PIRC DEFENSE CARDS
        {
            id: "pirc_classical_setup",
            name: "Pirc: Classical Development",
            description: "Standard setup against Pirc Defense",
            category: "Pirc Defense", 
            difficulty: "beginner",
            startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
            moves: ["d6", "d4", "Nf6", "Nc3", "g6", "Be3", "Bg7", "Qd2"],
            playerColor: "white",
            orientation: "white",
            keyIdeas: ["Natural development", "Central control", "Prepare kingside attack"]
        },
        {
            id: "pirc_h4_attack",
            name: "Pirc: h4! Kingside Attack",
            description: "Launch kingside attack with h4-h5",
            category: "Pirc Defense",
            difficulty: "intermediate", 
            startingFen: "r1bq1rk1/ppp1ppbp/2np1np1/8/3PP2P/2N1BN2/PPP2PP1/R2QKB1R w KQ - 0 9",
            moves: ["h5", "gxh5", "Nxh5"],
            playerColor: "white",
            orientation: "white",
            keyIdeas: ["h5 opens h-file", "Attack fianchetto", "King hunt"]
        },

        // ADVANCED TACTICAL CARDS
        {
            id: "petrov_advanced_trap",
            name: "Petrov: Advanced Trap Sequence", 
            description: "Complete trap line with all variations",
            category: "Advanced Tactics",
            difficulty: "advanced",
            startingFen: "rnbqkb1r/ppp2ppp/3p1n2/4N3/3P4/8/PPP2PPP/RNBQKB1R w KQkq - 0 5",
            moves: ["Nc3", "Bg4", "h3", "Bxf3", "Qxf3", "dxe5", "Nd5", "Nxd5", "Qxd5"],
            playerColor: "white",
            orientation: "white",
            keyIdeas: ["Force favorable trades", "Central domination", "Endgame advantage"]
        },
        {
            id: "scandinavian_endgame",
            name: "Scandinavian: Endgame Technique",
            description: "Converting advantage in Scandinavian endgames", 
            category: "Advanced Tactics",
            difficulty: "advanced",
            startingFen: "r3k2r/ppp2ppp/2n1p3/3n4/3P4/2N1BN2/PPP2PPP/R3K2R w KQkq - 0 10",
            moves: ["f4", "e6", "h4", "Nxc3", "Bxc3", "O-O-O", "Qe2"],
            playerColor: "white", 
            orientation: "white",
            keyIdeas: ["Space advantage", "Piece activity", "King safety"]
        },

        // OPENING PRINCIPLES CARDS
        {
            id: "e4_opening_principles",
            name: "E4 Opening: Core Principles",
            description: "Fundamental principles for all e4 openings",
            category: "Opening Principles",
            difficulty: "beginner",
            startingFen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
            moves: ["e5", "Nf3", "Nc6", "Bc4", "f5", "d3"],
            playerColor: "white",
            orientation: "white", 
            keyIdeas: ["Control center", "Develop knights before bishops", "King safety priority"]
        },
        {
            id: "anti_sicilian_strategy",
            name: "Anti-Sicilian: Strategic Ideas",
            description: "Key strategic concepts for Alapin and other anti-Sicilian lines",
            category: "Opening Principles", 
            difficulty: "intermediate",
            startingFen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
            moves: ["c3", "d6", "d4", "cxd4", "cxd4", "Nf6", "Nc3"],
            playerColor: "white",
            orientation: "white",
            keyIdeas: ["Space advantage", "Central control", "Avoid main theory"]
        }
    ],

    // Card generation metadata
    metadata: {
        totalCards: 15,
        categories: ["Petrov Defense", "Scandinavian Defense", "Alapin Sicilian", "Pirc Defense", "Advanced Tactics", "Opening Principles"],
        difficultyLevels: ["beginner", "intermediate", "advanced"],
        averageMovesPerCard: 8,
        estimatedStudyTime: "3-4 weeks for complete mastery"
    }
};