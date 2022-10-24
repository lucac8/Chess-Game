let board = document.querySelector('#board')
let columns = ["H", "G", "F", "E", 'D', "C", "B", "A"]
let turn = "white"

//FUNCTION CHOICE VARIABLE
let state = false
let selectedPiece = []
let selectedPieceX
let selectedPieceY

//Roi en echec?
let check = false

//Test si parti est fini
let noMove = true

//Stocke les coup d'une pieces selectionner
let modifSquare = []



function restart() {
    location.reload();
}


//BLACK
let Bking = { pos: [4, 0], icon: "king", color: "black", move: [], neverMove: true }
let Bqueen = { pos: [3, 0], icon: "queen", color: "black", move: [] }
let Bbishop_1 = { pos: [5, 0], icon: "bishop", color: "black", move: [] }
let Bbishop_2 = { pos: [2, 0], icon: "bishop", color: "black", move: [] }
let Bknight_1 = { pos: [6, 0], icon: "knight", color: "black", move: [] }
let Bknight_2 = { pos: [1, 0], icon: "knight", color: "black", move: [] }
let Brook_1 = { pos: [7, 0], icon: "rook", color: "black", move: [], neverMove: true }
let Brook_2 = { pos: [0, 0], icon: "rook", color: "black", move: [], neverMove: true }


let Bpawn_1 = { pos: [7, 1], icon: "pawn", color: "black", move: [], enpassant: [] }
let Bpawn_2 = { pos: [6, 1], icon: "pawn", color: "black", move: [], enpassant: [] }
let Bpawn_3 = { pos: [5, 1], icon: "pawn", color: "black", move: [], enpassant: [] }
let Bpawn_4 = { pos: [4, 1], icon: "pawn", color: "black", move: [], enpassant: [] }
let Bpawn_5 = { pos: [3, 1], icon: "pawn", color: "black", move: [], enpassant: [] }
let Bpawn_6 = { pos: [2, 1], icon: "pawn", color: "black", move: [], enpassant: [] }
let Bpawn_7 = { pos: [1, 1], icon: "pawn", color: "black", move: [], enpassant: [] }
let Bpawn_8 = { pos: [0, 1], icon: "pawn", color: "black", move: [], enpassant: [] }

//WHITE
let Wrook_2 = { pos: [7, 7], icon: "rook", color: "white", move: [], neverMove: true }
let Wknight_2 = { pos: [6, 7], icon: "knight", color: "white", move: [] }
let Wbishop_2 = { pos: [5, 7], icon: "bishop", color: "white", move: [] }
let Wking = { pos: [4, 7], icon: "king", color: "white", move: [], neverMove: true }
let Wqueen = { pos: [3, 7], icon: "queen", color: "white", move: [] }
let Wbishop_1 = { pos: [2, 7], icon: "bishop", color: "white", move: [] }
let Wknight_1 = { pos: [1, 7], icon: "knight", color: "white", move: [] }
let Wrook_1 = { pos: [0, 7], icon: "rook", color: "white", move: [], neverMove: true }

let Wpawn_1 = { pos: [0, 6], icon: "pawn", color: "white", move: [], enpassant: [] }
let Wpawn_2 = { pos: [1, 6], icon: "pawn", color: "white", move: [], enpassant: [] }
let Wpawn_3 = { pos: [2, 6], icon: "pawn", color: "white", move: [], enpassant: [] }
let Wpawn_4 = { pos: [3, 6], icon: "pawn", color: "white", move: [], enpassant: [] }
let Wpawn_5 = { pos: [4, 6], icon: "pawn", color: "white", move: [], enpassant: [] }
let Wpawn_6 = { pos: [5, 6], icon: "pawn", color: "white", move: [], enpassant: [] }
let Wpawn_7 = { pos: [6, 6], icon: "pawn", color: "white", move: [], enpassant: [] }
let Wpawn_8 = { pos: [7, 6], icon: "pawn", color: "white", move: [], enpassant: [] }

// "n" case vide

let chessBoard = [
    [Brook_2, Bknight_2, Bbishop_2, Bqueen, Bking, Bbishop_1, Bknight_1, Brook_1],
    [Bpawn_8, Bpawn_7, Bpawn_6, Bpawn_5, Bpawn_4, Bpawn_3, Bpawn_2, Bpawn_1],
    ["n", "n", "n", "n", "n", "n", "n", "n"],
    ["n", "n", "n", "n", "n", "n", "n", "n"],
    ["n", "n", "n", "n", "n", "n", "n", "n"],
    ["n", "n", "n", "n", "n", "n", "n", "n"],
    [Wpawn_1, Wpawn_2, Wpawn_3, Wpawn_4, Wpawn_5, Wpawn_6, Wpawn_7, Wpawn_8],
    [Wrook_1, Wknight_1, Wbishop_1, Wqueen, Wking, Wbishop_2, Wknight_2, Wrook_2]
];

let checkChessBoard = JSON.parse(JSON.stringify(chessBoard));

createBoard()
game()

function game() {
    piecesStart()
    legalMoves()
    kingCheck()
    endGame()
    let square = document.querySelectorAll('.square')
    square.forEach(s => {
        s.addEventListener("click", choice)
    })
}

//Creation des cases du plateau
function createBoard() {
    for (let r = 0; r < 8; r++) {

        let test = r % 2 == 0 ? true : false;

        for (let i = 0; i < 8; i++) {
            let squareColor
            if (test) {
                squareColor = i % 2 == 0 ? 'beige' : 'brown';
            } else {
                squareColor = i % 2 == 0 ? 'brown' : 'beige';
            }
            const square = document.createElement('div')
            square.id = `${[i, r]}`
            square.classList.add(squareColor)
            square.classList.add("square")
            board.appendChild(square)
        }
    }
}


//Met en place les images des pieces sur le board
function piecesStart() {
    chessBoard.map(function (row) {
        return row.map(function (cell) {
            if (cell == "n") return
            let square = document.getElementById(`${cell.pos}`)
            square.style.backgroundImage = `url('./pieces/${cell.color}/${cell.icon}.png')`;
        });
    })
}

//Recupere tt les coups possible (sauf roque/en passant)
function legalMoves() {
    chessBoard.map(function (row) {
        return row.map(function (cell) {
            if (cell.color == `${turn}`) {
                cell.move = []
                pieceMovements(cell)
            }
        });
    })
}

function pieceMovements(cell) {
    let y = cell.pos[1]
    let x = cell.pos[0]

    switch (cell.icon) {
        case "pawn":
            let t
            turn == 'white' ? t = 1 : t = -1
            pawnMove(cell, t)
            if (cell.enpassant.length > 0) enpassantF(cell, cell.enpassant)
            break;
        case "rook":
            rookMouvement(cell, 1, 0, 7 - y) //DOWN 
            rookMouvement(cell, -1, 0, y) // UP
            rookMouvement(cell, 0, 1, 7 - x) //RIGHT
            rookMouvement(cell, 0, -1, x) //LEFT

            break;
        case "bishop":
            bishopMove(cell, -1, 1, Math.min(7 - x, y)) //RIGHT UP
            bishopMove(cell, -1, -1, Math.min(x, y)) //LEFT UP
            bishopMove(cell, 1, -1, 7 - Math.max(7 - x, y))    // LEFT DOWN
            bishopMove(cell, 1, 1, 7 - Math.max(x, y)) //RIGHT DOWN

            break;
        case "knight":
            knightMove(cell, -2, 1)
            knightMove(cell, -2, -1)
            knightMove(cell, -1, 2)
            knightMove(cell, -1, -2)
            knightMove(cell, 2, 1)
            knightMove(cell, 2, -1)
            knightMove(cell, 1, 2)
            knightMove(cell, 1, -2)

            break;
        case "queen":
            rookMouvement(cell, 1, 0, 7 - y) //DOWN 
            rookMouvement(cell, -1, 0, y) // UP
            rookMouvement(cell, 0, 1, 7 - x) //RIGHT
            rookMouvement(cell, 0, -1, x) //LEFT
            bishopMove(cell, -1, 1, Math.min(7 - x, y)) //RIGHT UP
            bishopMove(cell, -1, -1, Math.min(x, y)) //LEFT UP
            bishopMove(cell, 1, -1, 7 - Math.max(7 - x, y))    // LEFT DOWN
            bishopMove(cell, 1, 1, 7 - Math.max(x, y)) //RIGHT DOWN

            break;
        case "king":
            kingMove(cell, -1, 0)
            kingMove(cell, -1, 1)
            kingMove(cell, -1, -1)
            kingMove(cell, 0, -1)
            kingMove(cell, 0, 1)
            kingMove(cell, 1, 0)
            kingMove(cell, 1, 1)
            kingMove(cell, 1, -1)

            break;
    }
}


function pawnMove(cell, t) {
    let y = cell.pos[1]
    let x = cell.pos[0]

    let row
    turn == "white" ? row = 6 : row = 1

    if (chessBoard[y - 1 * t][x] == "n") {
        cell.move.push([x, y - 1 * t])
        if (y == row && chessBoard[y - 2 * t][x] == "n") {
            cell.move.push([x, y - 2 * t])
        }
    }

    //CAPTURE
    if (chessBoard[y - 1 * t][x + 1] == "n" || chessBoard[y - 1 * t][x + 1] == undefined || chessBoard[y - 1 * t][x + 1].color == cell.color) {
    }
    else {
        cell.move.push([x + 1, y - 1 * t])
    }

    if (chessBoard[y - 1 * t][x - 1] == "n" || chessBoard[y - 1 * t][x - 1] == undefined || chessBoard[y - 1 * t][x - 1].color == cell.color) {
    }
    else {
        cell.move.push([x - 1, y - 1 * t])
    }
}



function rookMouvement(cell, forY, forX, lim) { //Envoie donnee pour chaque ligne que doit parcourir et boucle suivant sa pos initial pour ne pas sortir du board
    let y = cell.pos[1]
    let x = cell.pos[0]
    for (let i = 1; i <= lim; i++) {
        if (chessBoard[y + i * forY][x + i * forX] != "n" && chessBoard[y + i * forY][x + i * forX].color == cell.color) {
            return
        } else if (chessBoard[y + i * forY][x + i * forX] != "n") {
            cell.move.push([x + i * forX, y + i * forY])
            return
        } else {
            cell.move.push([x + i * forX, y + i * forY,])
        }
    }
}


function bishopMove(cell, forY, forX, lim) {
    let y = cell.pos[1]
    let x = cell.pos[0]
    for (let i = 1; i <= lim; i++) {
        if (chessBoard[y + i * forY][x + i * forX] != "n" && chessBoard[y + i * forY][x + i * forX].color == cell.color) {
            return
        } else if (chessBoard[y + i * forY][x + i * forX] != "n") {
            cell.move.push([x + i * forX, y + i * forY])
            return
        } else {
            cell.move.push([x + i * forX, y + i * forY])
        }
    }
}

function knightMove(cell, moveY, moveX) {
    let y = cell.pos[1]
    let x = cell.pos[0]

    if (chessBoard[y + moveY] == undefined || chessBoard[y + moveY][x + moveX] == undefined || chessBoard[y + moveY][x + moveX].color == cell.color) return
    cell.move.push([x + moveX, y + moveY])
}

function kingMove(cell, moveY, moveX) {
    let y = cell.pos[1]
    let x = cell.pos[0]
    if (chessBoard[y + moveY] == undefined || chessBoard[y + moveY][x + moveX] == undefined || chessBoard[y + moveY][x + moveX].color == cell.color) return
    cell.move.push([x + moveX, y + moveY])
}


//Promu quand un pion est sur la derniere rangée

function checkPromotion() {
    let lastRow
    turn == "white" ? lastRow = 0 : lastRow = 7
    chessBoard[lastRow].some(elm => {
        if (elm.icon == "pawn") {
            elm.icon = "queen"
        }
    })
}


//Envoie comme coup possible le en passant
function enpassantF(pawn, newPos) {
    pawn.move.push([newPos[0], newPos[1], "p"])
    pawn.enpassant = []
}

//Test si le roque est possible et l'envoie ds la liste de coup 
function checkRoque() {

    check = false
    let colorTest
    turn == "white" ? colorTest = "black" : colorTest = "white"
    checkChessBoard = JSON.parse(JSON.stringify(chessBoard))

    checkChessBoard.map(function (row) {
        return row.map(function (CheckPiece) {
            if (CheckPiece.color == `${colorTest}`) {
                pieceMovementsCheck(CheckPiece)
            }
        });
    })
    if (turn == "white") {
        //White
        if (checkChessBoard[7][5] == "n" && checkChessBoard[7][6] == "n" && check == false && Wrook_2.neverMove == true && Wking.neverMove == true) {
            Wking.move.push([6, 7, wPetitRoque])
        }
        if (checkChessBoard[7][3] == "n" && checkChessBoard[7][2] == "n" && check == false && typeof checkChessBoard[7][1] != 'object' && Wrook_1.neverMove == true && Wking.neverMove == true) {
            Wking.move.push([2, 7, wGrdRoque])
        }
    } else {
        //BLACK
        if (checkChessBoard[0][5] == "n" && checkChessBoard[0][6] == "n" && check == false && Brook_1.neverMove == true && Bking.neverMove == true) {
            Bking.move.push([6, 0, bPetitRoque])
        }
        if (checkChessBoard[0][3] == "n" && checkChessBoard[0][2] == "n" && check == false && typeof checkChessBoard[0][1] != 'object' && Brook_2.neverMove == true && Bking.neverMove == true) {
            Bking.move.push([2, 0, bGrdRoque])
        }
    }
}

//Les differents roques
function wPetitRoque() {
    document.getElementById(`${chessBoard[7][4].pos}`).style.removeProperty('background-image')
    document.getElementById(`${chessBoard[7][7].pos}`).style.removeProperty('background-image')
    chessBoard[7][4].pos = [6, 7]
    chessBoard[7][7].pos = [5, 7]
    chessBoard[7][6] = Wking
    chessBoard[7][5] = Wrook_2
    chessBoard[7][4] = "n"
    chessBoard[7][7] = "n"
}

function wGrdRoque() {
    document.getElementById(`${chessBoard[7][4].pos}`).style.removeProperty('background-image')
    document.getElementById(`${chessBoard[7][0].pos}`).style.removeProperty('background-image')
    chessBoard[7][4].pos = [2, 7]
    chessBoard[7][0].pos = [3, 7]
    chessBoard[7][2] = Wking
    chessBoard[7][3] = Wrook_1
    chessBoard[7][4] = "n"
    chessBoard[7][0] = "n"
}

function bPetitRoque() {
    document.getElementById(`${chessBoard[0][4].pos}`).style.removeProperty('background-image')
    document.getElementById(`${chessBoard[0][7].pos}`).style.removeProperty('background-image')
    chessBoard[0][4].pos = [6, 0]
    chessBoard[0][7].pos = [5, 0]
    chessBoard[0][6] = Bking
    chessBoard[0][5] = Brook_1
    chessBoard[0][4] = "n"
    chessBoard[0][7] = "n"
}

function bGrdRoque() {
    document.getElementById(`${chessBoard[0][4].pos}`).style.removeProperty('background-image')
    document.getElementById(`${chessBoard[0][0].pos}`).style.removeProperty('background-image')
    chessBoard[0][4].pos = [2, 0]
    chessBoard[0][0].pos = [3, 0]
    chessBoard[0][2] = Bking
    chessBoard[0][3] = Brook_2
    chessBoard[0][4] = "n"
    chessBoard[0][0] = "n"
}

//Test pour chaquue coup recuperer ds legalmoves() si le roi se trouve encore en echec apres celui-ci si oui le supprime de la liste de coup
function kingCheck() {

    checkChessBoard = JSON.parse(JSON.stringify(chessBoard))
    let colorTest
    turn == "white" ? colorTest = "black" : colorTest = "white"

    chessBoard.map(function (row) {
        return row.map(function (cell) {
            if (cell.color == `${turn}`) {
                let y = cell.pos[1]
                let x = cell.pos[0]
                for (let i = 0; i < cell.move.length; i++) {

                    checkChessBoard[y][x] = "n"
                    checkChessBoard[cell.move[i][1]][cell.move[i][0]] = cell

                    checkChessBoard.map(function (row) {
                        return row.map(function (CheckPiece) {
                            if (CheckPiece.color == `${colorTest}`) {
                                pieceMovementsCheck(CheckPiece) //Recupere si le roi est menace pour chaque coup possiblement joue 
                            }
                        });
                    })
                    if (check) { //Si il est menace supp le coup 
                        cell.move.splice(i, 1)
                        i -= 1
                    } else {
                    }
                    checkChessBoard = JSON.parse(JSON.stringify(chessBoard))
                    CheckPiece = []
                    check = false
                }
            }
        });
    })
    checkRoque()
}

function pieceMovementsCheck(cell) {
    let y = cell.pos[1]
    let x = cell.pos[0]
    let king
    turn == "white" ? king = Wking : king = Bking

    switch (cell.icon) {
        case "pawn":
            let t
            turn == 'white' ? t = -1 : t = 1
            pawnMoveCheck(cell, t, king)
            break;
        case "rook":
            rookMouvementCheck(cell, 1, 0, 7 - y, king) //DOWN 
            rookMouvementCheck(cell, -1, 0, y, king) // UP
            rookMouvementCheck(cell, 0, 1, 7 - x, king) //RIGHT
            rookMouvementCheck(cell, 0, -1, x, king) //LEFT
            break;
        case "bishop":
            bishopMoveCheck(cell, -1, 1, Math.min(7 - x, y), king) //RIGHT UP
            bishopMoveCheck(cell, -1, -1, Math.min(x, y), king) //LEFT UP
            bishopMoveCheck(cell, 1, -1, 7 - Math.max(7 - x, y), king)    // LEFT DOWN
            bishopMoveCheck(cell, 1, 1, 7 - Math.max(x, y), king) //RIGHT DOWN
            break;
        case "knight":
            knightMoveCheck(cell, -2, 1, king)
            knightMoveCheck(cell, -2, -1, king)
            knightMoveCheck(cell, -1, 2, king)
            knightMoveCheck(cell, -1, -2, king)
            knightMoveCheck(cell, 2, 1, king)
            knightMoveCheck(cell, 2, -1, king)
            knightMoveCheck(cell, 1, 2, king)
            knightMoveCheck(cell, 1, -2, king)
            break;
        case "queen":
            rookMouvementCheck(cell, 1, 0, 7 - y, king) //DOWN 
            rookMouvementCheck(cell, -1, 0, y, king) // UP
            rookMouvementCheck(cell, 0, 1, 7 - x, king) //RIGHT
            rookMouvementCheck(cell, 0, -1, x, king) //LEFT
            bishopMoveCheck(cell, -1, 1, Math.min(7 - x, y), king) //RIGHT UP
            bishopMoveCheck(cell, -1, -1, Math.min(x, y), king) //LEFT UP
            bishopMoveCheck(cell, 1, -1, 7 - Math.max(7 - x, y), king)    // LEFT DOWN
            bishopMoveCheck(cell, 1, 1, 7 - Math.max(x, y), king) //RIGHT DOWN
            break;
        case "king":
            kingMoveCheck(cell, -1, 0)
            kingMoveCheck(cell, -1, 1)
            kingMoveCheck(cell, -1, -1)
            kingMoveCheck(cell, 0, -1)
            kingMoveCheck(cell, 0, 1)
            kingMoveCheck(cell, 1, 0)
            kingMoveCheck(cell, 1, 1)
            kingMoveCheck(cell, 1, -1)
            break;
    }
}


//PAWN regle
function pawnMoveCheck(cell, t) {
    let y = cell.pos[1]
    let x = cell.pos[0]
    //CAPTURE
    if (checkChessBoard[y - 1 * t][x + 1] == undefined) {
    } else if (checkChessBoard[y - 1 * t][x + 1].icon == "king" && checkChessBoard[y - 1 * t][x + 1].color == turn) return check = true

    if (checkChessBoard[y - 1 * t][x - 1] == undefined) {
    } else if (checkChessBoard[y - 1 * t][x - 1].icon == "king" && checkChessBoard[y - 1 * t][x - 1].color == turn) return check = true
}



function rookMouvementCheck(cell, forY, forX, lim, king) {
    let y = cell.pos[1]
    let x = cell.pos[0]
    for (let i = 1; i <= lim; i++) {
        if (typeof checkChessBoard[y + i * forY][x + i * forX] == "object") {
            if (checkChessBoard[y + i * forY][x + i * forX].icon == "king" && checkChessBoard[y + i * forY][x + i * forX].color == turn)
                return check = true
            else return
        } else {
            checkChessBoard[y + i * forY][x + i * forX] = "A"
        }
    }
}


function bishopMoveCheck(cell, forY, forX, lim) {
    let y = cell.pos[1]
    let x = cell.pos[0]

    for (let i = 1; i <= lim; i++) {
        if (typeof checkChessBoard[y + i * forY][x + i * forX] == "object") {
            if (checkChessBoard[y + i * forY][x + i * forX].icon == "king" && checkChessBoard[y + i * forY][x + i * forX].color == turn)
                return check = true
            else return
        }
        else {
            checkChessBoard[y + i * forY][x + i * forX] = "A"
        }
    }
}

function knightMoveCheck(cell, moveY, moveX) {
    let y = cell.pos[1]
    let x = cell.pos[0]

    if (checkChessBoard[y + moveY] == undefined || checkChessBoard[y + moveY][x + moveX] == undefined || checkChessBoard[y + moveY][x + moveX].color == cell.color) return
    else if (checkChessBoard[y + moveY][x + moveX].color == turn && checkChessBoard[y + moveY][x + moveX].icon == "king")
        return check = true
    checkChessBoard[y + moveY][x + moveX] = "A"
}

function kingMoveCheck(cell, moveY, moveX) {
    let y = cell.pos[1]
    let x = cell.pos[0]
    if (checkChessBoard[y + moveY] == undefined || checkChessBoard[y + moveY][x + moveX] == undefined || checkChessBoard[y + moveY][x + moveX].color == cell.color) return
    else if (checkChessBoard[y + moveY][x + moveX].icon == "king") return check = true
    checkChessBoard[y + moveY][x + moveX] = "A"
}



//MOUVEMENT DECIDE PAR JOUEUR



function choice(e) {

    if (chessBoard[e.target.id[2]][e.target.id[0]] == "n" || chessBoard[e.target.id[2]][e.target.id[0]].color != turn) {
        if (state) {

            let move = [parseInt(e.target.id[0]), parseInt(e.target.id[2])]
            let STRseletedPieceMove = JSON.stringify(selectedPiece.move)

            for (var i = 0; i < selectedPiece.move.length; i++) {
                if (selectedPiece.move[i][0] == move[0] && selectedPiece.move[i][1] == move[1]) {
                    if (typeof selectedPiece.move[i][2] == 'function') {
                        selectedPiece.move[i][2]()
                    }
                    if (selectedPiece.move[i][2] == 'p') {
                        let t
                        turn == "white" ? t = 1 : t = -1
                        let y = selectedPiece.move[i][1] + t
                        document.getElementById(`${[selectedPiece.move[i][0], y]}`).style.removeProperty('background-image')
                        chessBoard[y][selectedPiece.move[i][0]] = "n"
                    }
                }
            }

            if (STRseletedPieceMove.indexOf(move) != -1) {

                switch (selectedPiece.icon) {
                    case "king":
                        selectedPiece.neverMove = false
                        break
                    case "rook":
                        selectedPiece.neverMove = false
                        break
                    case "pawn":
                        if (selectedPieceY == parseInt(e.target.id[2]) + 2 || selectedPieceY == parseInt(e.target.id[2]) - 2) {

                            let t
                            turn == "white" ? t = 1 : t = -1

                            if (chessBoard[parseInt(e.target.id[2])][parseInt(e.target.id[0]) + 1] != undefined && chessBoard[parseInt(e.target.id[2])][parseInt(e.target.id[0]) + 1].icon == "pawn" && chessBoard[parseInt(e.target.id[2])][parseInt(e.target.id[0]) + 1].color != turn) {
                                chessBoard[parseInt(e.target.id[2])][parseInt(e.target.id[0]) + 1].enpassant.push(parseInt(e.target.id[0]), parseInt(e.target.id[2]) + t)
                            }
                            else if (chessBoard[parseInt(e.target.id[2])][parseInt(e.target.id[0]) - 1] != undefined && chessBoard[parseInt(e.target.id[2])][parseInt(e.target.id[0]) - 1].icon == "pawn" && chessBoard[parseInt(e.target.id[2])][parseInt(e.target.id[0]) - 1].color != turn) {
                                chessBoard[parseInt(e.target.id[2])][parseInt(e.target.id[0]) - 1].enpassant.push(parseInt(e.target.id[0]), parseInt(e.target.id[2]) + t)
                            }
                        }
                        break
                }

                document.getElementById(`${selectedPiece.pos}`).style.removeProperty('background-image')

                selectedPiece.pos = [parseInt(e.target.id[0]), parseInt(e.target.id[2])]
                chessBoard[parseInt(e.target.id[2])][parseInt(e.target.id[0])] = selectedPiece
                chessBoard[selectedPieceY].splice((selectedPieceX), 1, "n");
                state = false

                checkPromotion()
                turn == "white" ? clearInterval(timer1) : clearInterval(timer2)
                turn == "white" ? turn = "black" : turn = "white"
                turn == "white" ? timer1 = setInterval(clockW, 1000) : timer2 = setInterval(clockB, 1000)

                modifSquare.forEach(elm => {
                    document.getElementById(`${elm[0]},${elm[1]}`).classList.remove('selected')
                })
                modifSquare = []
                check = false
                game()
            }
        }
    } else {
        state = true
        selectedPiece = chessBoard[e.target.id[2]][e.target.id[0]]
        selectedPieceX = parseInt(e.target.id[0])
        selectedPieceY = parseInt(e.target.id[2])

        modifSquare.forEach(elm => {
            document.getElementById(`${elm[0]},${elm[1]}`).classList.remove('selected')
        })

        modifSquare = []

        selectedPiece.move.forEach(element => {
            document.getElementById(`${element[0]},${element[1]}`).classList.add('selected')
            modifSquare.push(element)
        })
    }
}




//TIMER

let time = 10
let tempsW = time * 60
let tempsB = time * 60

let timerMin1 = document.getElementById("min1")
let timerSec1 = document.getElementById("sec1")

let timerMin2 = document.getElementById("min2")
let timerSec2 = document.getElementById("sec2")




function clockW() {
    let minutes = parseInt(tempsW / 60, 10)
    let secondes = parseInt(tempsW % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes

    timerMin1.innerText = `${minutes}`
    timerSec1.innerText = `${secondes}`
    tempsW = tempsW <= 0 ? endGame(true) : tempsW - 1
}

function clockB() {
    let minutes = parseInt(tempsB / 60, 10)
    let secondes = parseInt(tempsB % 60, 10)

    minutes = minutes < 10 ? "0" + minutes : minutes
    secondes = secondes < 10 ? "0" + secondes : secondes

    timerMin2.innerText = `${minutes}`
    timerSec2.innerText = `${secondes}`

    tempsB = tempsB <= 0 ? endGame(true) : tempsB - 1
}

let timer1
let timer2

let message = document.getElementById('message')
let end = document.getElementById('end')


function endGame(time) {
    chessBoard.map(function (row) {
        return row.map(function (cell) {
            if (cell.color == `${turn}`) {
                if (cell.move.length != 0) noMove = false
            }
        });
    })

    if (time) {
        message.innerHTML = `${turn} lost`
        end.classList.add('show')
        return
    }

    if (noMove == true && check == true) {
        message.innerHTML = `${turn} lost`
        end.classList.add('show')

    } else if (noMove == true && check == false) {
        message.innerHTML = "Draw"
        end.classList.add('show')
    }
    else noMove = true
}