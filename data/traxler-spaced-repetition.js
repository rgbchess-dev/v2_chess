// /data/traxler-spaced-repetition.js - Complete move sequences for spaced repetition
export const traxlerSpacedRepetitionData = {
    name: "Traxler Counter-Attack",
    playerColor: 'black',
    orientation: 'black',
    
    lines: [
        {
            name: "Line 1: Kxf2 Main (Kf3)",
            moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5", "Nxf7", "Bxf2+", "Kxf2", "Nxe4+", "Kf3", "Qf6+", "Kxe4", "d5+", "Bxd5", "Qf4+", "Kd3", "Qd4+", "Ke2", "Qxd5", "Kf1", "Qxf7+"],
            description: "The main line where White takes on f2 and walks into the king hunt. Critical line for both sides.",
            category: "Nxf7 Sacrifice Lines"
        },
        {
            name: "Line 1.1: Kxf2 | Ke1",
            moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5", "Nxf7", "Bxf2+", "Kxf2", "Nxe4+", "Ke1", "Qh4+", "g3", "Nxg3", "hxg3", "Qxh1+", "Bf1", "O-O"],
            description: "White tries Ke1 to escape. Black gets excellent compensation with the rook on h1.",
            category: "Nxf7 Sacrifice Lines"
        },
        {
            name: "Line 1.2: Kxf2 | Kf1", 
            moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5", "Nxf7", "Bxf2+", "Kxf2", "Nxe4+", "Kf1", "Qh4", "Qf3", "Nd4", "g3", "Qh3+", "Qg2", "d5", "Bxd5", "Qf5+", "Ke1", "Nxc2+"],
            description: "Kf1 leads to complex tactics. Black maintains strong pressure with tactical shots.",
            category: "Nxf7 Sacrifice Lines"
        },
        {
            name: "Line 1.3: King Hunt (Ke2)",
            moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5", "Nxf7", "Bxf2+", "Kxf2", "Nxe4+", "Ke2", "Nd4+", "Ke3", "Qh4", "g3", "Nxg3", "hxg3", "Qxg3+", "Ke4", "d5+", "Kxd5", "c6+", "Kd6", "Nf5+", "Kc5", "b6+", "Kb4", "a5+", "Ka4", "b5+", "Bxb5", "cxb5+", "Kxb5", "Bd7+", "Kc5", "Rc8+", "Kb6", "Qg6+", "Nd6+", "Qxd6+", "Ka7", "Qc7+", "Ka6", "Ra8#"],
            description: "The famous king hunt! White's king gets mated in the center of the board. A masterpiece of tactics.",
            category: "Nxf7 Sacrifice Lines"
        },
        {
            name: "Line 1.4: Kxf2 | Ke3",
            moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5", "Nxf7", "Bxf2+", "Kxf2", "Nxe4+", "Ke3", "Qh4", "g3", "Nxg3", "hxg3", "Qd4+", "Ke2", "Qxc4+"],
            description: "Ke3 is another try but Black gets excellent play with the centralized queen.",
            category: "Nxf7 Sacrifice Lines"
        },
        {
            name: "Line 2: Kf1 Variation",
            moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5", "Nxf7", "Bxf2+", "Kf1", "Qe7", "Nxh8", "d5", "exd5", "Nd4", "c3", "Bg4", "Qa4+", "Nd7", "cxd4", "Qf6", "dxe5", "Qf4", "g3", "Bxg3+", "Kg2", "Qf2#"],
            description: "If White refuses the bishop sacrifice with Kf1, Black gets a beautiful mating attack.",
            category: "Nxf7 Sacrifice Lines"
        },
        {
            name: "Line 3: Bxf7+ Bishop Sacrifice",
            moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5", "Bxf7+", "Ke7", "Bb3", "Rf8", "Nc3", "Qe8", "O-O", "d6", "d3", "Qg6", "Nf3", "Bg4", "Bd2", "Nd4"],
            description: "White can try the bishop sacrifice instead. Black gets good compensation but it's more complex.",
            category: "Bxf7+ Bishop Sacrifice"
        },
        {
            name: "Line 4: Quiet Retreat (Nf3)",
            moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5", "Nf3", "d5", "exd5", "Nxd5", "O-O", "O-O", "d3", "f5", "Ng5", "Qd6", "f4", "exf4", "Bxf4", "Nxf4", "Rxf4", "Bd6"],
            description: "If White retreats quietly, Black gets excellent central control and attacking chances.",
            category: "Quiet Development"
        },
        {
            name: "Line 5: d4 Variation",
            moves: ["e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "Bc5", "d4", "exd4", "O-O", "dxc3", "bxc3", "d6", "Re1+", "Kf8", "Nh3", "h6", "Nf4", "g5", "Nd5", "Nxd5", "Bxd5", "c6"],
            description: "White can try d4 to open the center, but Black gets good piece play.",
            category: "d4 Variations"
        }
    ]
};