import { SimAttr } from "./init";

export type cords = {x:number, y:number};

type CellUpdateFunction = (x: number, y: number) => boolean;


interface functionsToUse {
	defaultFunc:CellUpdateFunction;
	currentUpdateFunc:CellUpdateFunction;
}
export let cellUpdateFunctions:functionsToUse = {
	defaultFunc:updateCell,
	currentUpdateFunc:updateCell,
}
export let defaultUpdateFunction = "\n\
	let livingNeighbors:number = 0\n\
\n\
	// CurrentRow:\n\
	livingNeighbors += (getCellValue(x - 1, y) ? 1: 0)\n\
	livingNeighbors += (getCellValue(x + 1, y) ? 1: 0)\n\
	// above Row:\n\
	livingNeighbors += (getCellValue(x + 1, y - 1) ? 1: 0)\n\
	livingNeighbors += (getCellValue(x    , y - 1) ? 1: 0)\n\
	livingNeighbors += (getCellValue(x - 1, y - 1) ? 1: 0)\n\
	// buttom Row:\n\
	livingNeighbors += (getCellValue(x + 1, y + 1) ? 1: 0)\n\
	livingNeighbors += (getCellValue(x    , y + 1) ? 1: 0)\n\
	livingNeighbors += (getCellValue(x - 1, y + 1) ? 1: 0)\n\
\n\
	// Conditions:\n\
	if (livingNeighbors < 2 || livingNeighbors > 3)\n\
		return false\n\
	else if (livingNeighbors == 3)\n\
		return true\n\
	return SimAttr.board[y][x]";
  
export function setCurrentCellFunction(cellFunc: string) {  
	try {
		const myFunction: CellUpdateFunction = new Function(

			`return (${cellFunc});`
		  ) as CellUpdateFunction;
		cellUpdateFunctions.currentUpdateFunc = myFunction;
	  } catch (error) {
		console.log("Error occurred while parsing the function:", error);
		console.log("Function string:", cellFunc);
	  }
  }

function getCellValue(x:number, y:number):boolean {
	if (x == -1 || x == SimAttr.maxCols || y == -1 || y == SimAttr.maxRows)
		return false;
	return SimAttr.board[y][x];
}


function updateCell(x:number, y:number): boolean {
	let livingNeighbors:number = 0;

	// above Row:
	livingNeighbors += (getCellValue(x + 1, y - 1)	? 1: 0)
	livingNeighbors += (getCellValue(x    , y - 1)   ? 1: 0)
	livingNeighbors += (getCellValue(x - 1, y - 1)	? 1: 0)
	// buttom Row:
	livingNeighbors += (getCellValue(x + 1, y + 1)	? 1: 0)
	livingNeighbors += (getCellValue(x    , y + 1)	? 1: 0)
	livingNeighbors += (getCellValue(x - 1, y + 1)	? 1: 0)
	// CurrentRow:
	livingNeighbors += (getCellValue(x - 1, y)		? 1: 0)
	livingNeighbors += (getCellValue(x + 1, y)		? 1: 0)

	// Conditions:
	if (livingNeighbors < 2 || livingNeighbors > 3)
		return false
	else if (livingNeighbors == 3)
		return true
	return SimAttr.board[y][x]
}

export function updateByRule(){
	for (let i = 0; i < SimAttr.maxRows; i++) {
		for (let j = 0; j < SimAttr.maxCols; j++)
			SimAttr.tmpBoard[i][j] = cellUpdateFunctions.currentUpdateFunc(j, i);
	}
	for (let i = 0; i < SimAttr.maxRows; i++) {
		for (let j = 0; j < SimAttr.maxCols; j++)
			SimAttr.board[i][j] = SimAttr.tmpBoard[i][j];
	}
}