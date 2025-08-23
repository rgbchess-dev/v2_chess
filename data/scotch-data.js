// /data/scotch-data.js - FIXED to match Traxler format
export const scotchData = {
    theory: {
        name: "Scotch Game Theory Lines",
        playerColor: 'white',
        orientation: 'white',
        startingFen: "rnbqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3",
        
        // Opening setup moves (for learning mode)
        openingSetup: ["e4", "e5", "Nf3", "Nc6", "d4"],
        
        lines: [
            // SCOTCH MAIN LINE (4.Nxd4)
            {
                name: "Main Line: Classical Defense",
                // FIXED: Removed opening setup moves, starts from FEN continuation
                moves: ["exd4", "Nxd4", "Bc5", "Be3", "Qf6", "c3", "Nge7", "Bc4", "Ne5", "Be2", "Qg6", "O-O", "O-O", "f4", "Ng4"],
                description: "The main line where Black develops classically with ...Bc5. Sharp middlegame positions.",
                category: "Scotch Main Line"
            },
            {
                name: "Main Line: Mieses Variation",
                moves: ["exd4", "Nxd4", "Bb4+", "c3", "Be7", "Bc4", "Nf6", "O-O", "O-O", "h3", "d6", "Re1", "Bd7"],
                description: "Black plays the solid Mieses with ...Bb4+ and early ...Be7. Positional play.",
                category: "Scotch Main Line"
            },
            {
                name: "Main Line: Malaniuk Variation",
                moves: ["exd4", "Nxd4", "Bb4+", "c3", "Be7", "Bc4", "Nf6", "Ng5", "O-O", "Nxf7", "Rxf7", "Bxf7+", "Kxf7"],
                description: "White sacrifices the knight on f7 for attacking chances. Very sharp!",
                category: "Scotch Main Line"
            },
            {
                name: "Main Line: Steinitz Variation", 
                moves: ["exd4", "Nxd4", "Qh4", "Nc3", "Bb4", "Be2", "Qxe4", "Nb5", "Bxc3+", "bxc3", "Kd8"],
                description: "Black's aggressive queen sortie with ...Qh4. Double-edged play.",
                category: "Scotch Main Line"
            },
            
            // SCOTCH GAMBIT (4.Bc4)
            {
                name: "Scotch Gambit: Main Line",
                moves: ["exd4", "Bc4", "Be7", "c3", "Nf6", "e5", "Nd5", "cxd4", "Nxc7+", "Kf8", "Nxa8", "b5"],
                description: "The main Scotch Gambit line. White sacrifices a pawn for rapid development.",
                category: "Scotch Gambit"
            },
            {
                name: "Scotch Gambit: Advance Variation",
                moves: ["exd4", "Bc4", "f5", "e5", "d6", "exd6", "Bxd6", "Qe2+", "Qe7", "Qxe7+", "Bxe7"],
                description: "Black plays the aggressive ...f5 advance. Sharp tactical complications.",
                category: "Scotch Gambit"
            },
            {
                name: "Scotch Gambit: Dubois Variation",
                moves: ["exd4", "Bc4", "Nf6", "e5", "d5", "Bb5", "Ne4", "Nxd4", "Bd7", "Bxc6", "bxc6", "O-O"],
                description: "Black defends with ...Nf6. Positional complications with central tension.",
                category: "Scotch Gambit"
            },
            
            // ALTERNATIVE DEFENSES
            {
                name: "Alternative: Schmidt Variation",
                moves: ["Nf6", "dxe5", "Nxe4", "Nbd2", "Nxd2", "Bxd2", "d6", "exd6", "Bxd6"],
                description: "Black plays 3...Nf6 instead of capturing on d4. Early queen trade leads to equal endgames.",
                category: "Alternative Defenses"
            },
            {
                name: "Alternative: Modern Defense",
                moves: ["Bb4+", "c3", "Ba5", "dxe5", "Nxe5", "Nxe5", "Qh5+", "Ng6", "Qe5+", "Qe7"],
                description: "Immediate bishop check followed by tactical complications.",
                category: "Alternative Defenses"
            }
        ]
    },
    
    exercises: {
        name: "Tactical Exercises",
        playerColor: 'white',
        orientation: 'white',
        startingFen: "rnbqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3",
        
        // Same opening setup for exercises
        openingSetup: ["e4", "e5", "Nf3", "Nc6", "d4"],
        
        lines: [
            {
                name: "Exercise 1: Central Break",
                description: "Black just played 2...Nc6. Continue with the Scotch!",
                fen: "rnbqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
                // FIXED: Exercise starts from different FEN, so moves should be just the continuation
                moves: ["d4"],
                hint: "Strike in the center immediately!",
                instruction: "The Scotch Game begins with this central pawn break.",
                category: "Opening Principles"
            },
            {
                name: "Exercise 2: Gambit Sacrifice",
                description: "In the Scotch Gambit, how should White continue after 4...Be7?",
                fen: "r1bqk1nr/ppppbppp/2n5/8/2BPp3/8/PPP2PPP/RNBQK1NR w KQkq - 2 5",
                moves: ["c3", "Nf6", "e5"],
                hint: "Advance the center pawn to gain space and attack!",
                instruction: "In gambits, rapid development and central control are key.",
                category: "Gambit Play"
            },
            {
                name: "Exercise 3: Tactical Shot",
                description: "White has Nxf7 available. Should you take it?",
                fen: "r1bqk2r/pppp1ppp/2n5/2b1n3/2B1P3/8/PPP2PPP/RNBQK1NR w KQkq - 0 6",
                moves: ["Nxf7", "Kxf7", "Qf3+"],
                hint: "Sometimes a knight sacrifice opens the enemy king!",
                instruction: "Calculate forcing moves carefully - they often lead to advantage.",
                category: "Tactical Shots"
            },
            {
                name: "Exercise 4: Development Race",
                description: "After 5.Ng5, how should White develop quickly?",
                fen: "r1bqk1nr/pppp1ppp/2n5/4p1N1/2B1P3/8/PPP2PPP/RNBQK2R w KQkq - 3 5",
                moves: ["O-O", "Be6", "d3"],
                hint: "Castle to safety and prepare your pieces for attack!",
                instruction: "In sharp positions, king safety comes first.",
                category: "Development"
            }
        ]
    }
};