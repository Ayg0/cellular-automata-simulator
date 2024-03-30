import { SimAttr } from "./init";

export type cords = {x:number, y:number};

function getCellValue(x:number, y:number):boolean {
	if (x == -1 || x == SimAttr.maxCols || y == -1 || y == SimAttr.maxRows)
		return false;
	return SimAttr.board[y][x];
}


function updateCell(x:number, y:number): boolean {
	let livingNeighbors:number = 0;

	// above Row:
	livingNeighbors += getCellValue(x + 1, y - 1)	? 1: 0;
	livingNeighbors += getCellValue(x    , y - 1)   	? 1: 0;
	livingNeighbors += getCellValue(x - 1, y - 1)	? 1: 0;
	// buttom Row:
	livingNeighbors += getCellValue(x + 1, y + 1)	? 1: 0;
	livingNeighbors += getCellValue(x    , y + 1)	? 1: 0;
	livingNeighbors += getCellValue(x - 1, y + 1)	? 1: 0;
	// CurrentRow:
	livingNeighbors += getCellValue(x - 1, y)		? 1: 0;
	livingNeighbors += getCellValue(x + 1, y)		? 1: 0;

	// Conditions:
	if (livingNeighbors < 2 || livingNeighbors > 3)
		return false;
	else if (livingNeighbors == 3)
		return true;
	return SimAttr.board[y][x];
}

export function updateByRule(){
	for (let i = 0; i < SimAttr.maxRows; i++) {
		for (let j = 0; j < SimAttr.maxCols; j++)
			SimAttr.tmpBoard[i][j] = updateCell(j, i);
	}
	for (let i = 0; i < SimAttr.maxRows; i++) {
		for (let j = 0; j < SimAttr.maxCols; j++)
			SimAttr.board[i][j] = SimAttr.tmpBoard[i][j];
	}
}