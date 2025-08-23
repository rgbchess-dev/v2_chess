// /data/traxler-data.js - FIXED exercises to start with White test moves
export const traxlerData = {
    theory: {
        name: "Traxler Theory Lines",
        playerColor: 'black',
        orientation: 'black',
        startingFen: "r1bqk2r/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 4 5",
        
        // Opening setup moves (for learning mode - shows complete context)
        openingSetup: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5"],
        
        lines: [
            {
                name: "Line 1: Kxf2 Main (Kf3)",
                moves: ["Nxf7", "Bxf2+", "Kxf2", "Nxe4+", "Kf3", "Qf6+", "Kxe4", "d5+", "Bxd5", "Qf4+", "Kd3", "Qd4+", "Ke2", "Qxd5", "Kf1", "Qxf7+"],
                description: "The main line where White takes on f2 and walks into the king hunt. Critical line for both sides.",
                category: "Nxf7 Sacrifice Lines"
            },
            {
                name: "Line 1.1: Kxf2 | Ke1",
                moves: ["Nxf7", "Bxf2+", "Kxf2", "Nxe4+", "Ke1", "Qh4+", "g3", "Nxg3", "hxg3", "Qxh1+", "Bf1", "O-O"],
                description: "White tries Ke1 to escape. Black gets excellent compensation with the rook on h1.",
                category: "Nxf7 Sacrifice Lines"
            },
            {
                name: "Line 1.2: Kxf2 | Kf1", 
                moves: ["Nxf7", "Bxf2+", "Kxf2", "Nxe4+", "Kf1", "Qh4", "Qf3", "Nd4", "g3", "Qh3+", "Qg2", "d5", "Bxd5", "Qf5+", "Ke1", "Nxc2+"],
                description: "Kf1 leads to complex tactics. Black maintains strong pressure with tactical shots.",
                category: "Nxf7 Sacrifice Lines"
            },
            {
                name: "Line 1.3: King Hunt (Ke2)",
                moves: ["Nxf7", "Bxf2+", "Kxf2", "Nxe4+", "Ke2", "Nd4+", "Ke3", "Qh4", "g3", "Nxg3", "hxg3", "Qxg3+", "Ke4", "d5+", "Kxd5", "c6+", "Kd6", "Nf5+", "Kc5", "b6+", "Kb4", "a5+", "Ka4", "b5+", "Bxb5", "cxb5+", "Kxb5", "Bd7+", "Kc5", "Rc8+", "Kb6", "Qg6+", "Nd6+", "Qxd6+", "Ka7", "Qc7+", "Ka6", "Ra8#"],
                description: "The famous king hunt! White's king gets mated in the center of the board. A masterpiece of tactics.",
                category: "Nxf7 Sacrifice Lines"
            },
            {
                name: "Line 1.4: Kxf2 | Ke3",
                moves: ["Nxf7", "Bxf2+", "Kxf2", "Nxe4+", "Ke3", "Qh4", "g3", "Nxg3", "hxg3", "Qd4+", "Ke2", "Qxc4+"],
                description: "Ke3 is another try but Black gets excellent play with the centralized queen.",
                category: "Nxf7 Sacrifice Lines"
            },
            {
                name: "Line 2: Kf1 Variation",
                moves: ["Nxf7", "Bxf2+", "Kf1", "Qe7", "Nxh8", "d5", "exd5", "Nd4", "c3", "Bg4", "Qa4+", "Nd7", "cxd4", "Qf6", "dxe5", "Qf4", "g3", "Bxg3+", "Kg2", "Qf2#"],
                description: "If White refuses the bishop sacrifice with Kf1, Black gets a beautiful mating attack.",
                category: "Nxf7 Sacrifice Lines"
            },
            {
                name: "Line 3: Bxf7+ Bishop Sacrifice",
                moves: ["Bxf7+", "Ke7", "Bb3", "Rf8", "Nc3", "Qe8", "O-O", "d6", "d3", "Qg6", "Nf3", "Bg4", "Bd2", "Nd4"],
                description: "White can try the bishop sacrifice instead. Black gets good compensation but it's more complex.",
                category: "Bxf7+ Bishop Sacrifice"
            },
            {
                name: "Line 4: Quiet Retreat (Nf3)",
                moves: ["Nf3", "d5", "exd5", "Nxd5", "O-O", "O-O", "d3", "f5", "Ng5", "Qd6", "f4", "exf4", "Bxf4", "Nxf4", "Rxf4", "Bd6"],
                description: "If White retreats quietly, Black gets excellent central control and attacking chances.",
                category: "Quiet Development"
            },
            {
                name: "Line 5: d4 Variation",
                moves: ["d4", "exd4", "O-O", "dxc3", "bxc3", "d6", "Re1+", "Kf8", "Nh3", "h6", "Nf4", "g5", "Nd5", "Nxd5", "Bxd5", "c6"],
                description: "White can try d4 to open the center, but Black gets good piece play.",
                category: "d4 Variations"
            }
        ]
    },
    
    exercises: {
        name: "Tactical Exercises",
        playerColor: 'black',
        orientation: 'black',
        startingFen: "r1bqk2r/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 4 5",
        
        // Same opening setup for exercises
        openingSetup: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5"],
        
        lines: [
            {
                name: "Exercise 1: Basic Traxler Sacrifice",
                description: "White just played Ng5. How should Black respond with the Traxler?",
                fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 4 5",
                // FIXED: Added White's test move first, then Black's responses
                moves: ["Nxf7", "Bxf2+", "Kxf2", "Nxe4+"],
                hint: "Sacrifice the bishop to deflect the king and attack e4!",
                instruction: "This is the starting position of the Traxler. Black sacrifices the bishop to drag the white king forward."
            },
            {
                name: "Exercise 2: Find the Correct King Move", 
                description: "After Bxf2+ Kxf2 Nxe4+, White tries Kf3. How should Black continue?",
                fen: "r1bqk2r/pppp1ppp/2n5/4p3/2B1n3/5K2/PPPP2PP/RNBQ3R w kq - 1 6",
                // FIXED: Added White's test move Kf3, then Black's continuation
                moves: ["Kf3", "Qf6+", "Kxe4", "d5+"],
                hint: "Bring the queen into the attack with check!",
                instruction: "After Kf3, Black brings the queen into the attack to hunt the white king."
            },
            {
                name: "Exercise 3: King Hunt Continuation",
                description: "White played Ke2 instead. Find Black's powerful continuation!",
                fen: "r1bqk2r/pppp1ppp/2n5/4p3/2B1n3/8/PPPPK1PP/RNBQ3R w kq - 1 6",
                // FIXED: Added White's test move Ke2, then Black's tactical sequence
                moves: ["Ke2", "Nd4+", "Ke3", "Qh4"],
                hint: "Force the king forward with checks, then bring the queen into the attack!",
                instruction: "Ke2 allows the famous king hunt. Black can force the white king into the center."
            },
            {
                name: "Exercise 4: Alternative Defense",
                description: "What if White doesn't take the bishop and plays Kf1 instead?",
                fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P1b1/8/PPPP1KPP/RNBQ3R w kq - 0 6",
                // FIXED: Added White's test move Kf1, then Black's response
                moves: ["Kf1", "Qe7", "Nxh8", "d5"],
                hint: "If White refuses the bishop, develop the queen and attack the center!",
                instruction: "Against Kf1, Black gets excellent compensation by developing actively."
            },
            {
                name: "Exercise 5: Quiet Defense Test",
                description: "White retreats the knight quietly with Nf3. How should Black respond?",
                fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 5 5",
                // FIXED: Added White's test move Nf3, then Black's central response  
                moves: ["Nf3", "d5", "exd5", "Nxd5"],
                hint: "If White retreats quietly, strike in the center immediately!",
                instruction: "Against quiet moves, Black should seize the initiative with central action."
            },
            {
                name: "Exercise 6: Bishop Sacrifice Alternative",
                description: "White tries the bishop sacrifice Bxf7+ instead. How should Black respond?",
                fen: "r1bqk2r/pppp1Bpp/2n2n2/2b1p1N1/4P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5",
                // FIXED: Added White's test move Bxf7+, then Black's response
                moves: ["Bxf7+", "Ke7", "Bb3", "Rf8"],
                hint: "Accept the sacrifice and develop actively!",
                instruction: "The bishop sacrifice is less dangerous than Nxf7. Black gets good compensation."
            }
        ]
    }
};