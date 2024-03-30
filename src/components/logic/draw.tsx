import { SimAttr, settings } from "./init";

function drawCell(y:number, x:number){
	let lenght = SimAttr.cellSize;
	if (settings.poused)
		lenght--;
	SimAttr.ctx.fillStyle = settings.aliveColor;
	if (!SimAttr.board[y][x])
		SimAttr.ctx.fillStyle = settings.deadColor;
	SimAttr.ctx.fillRect((x * SimAttr.cellSize) + SimAttr.widthOffset, 
						 (y * SimAttr.cellSize) + SimAttr.heightOffset, lenght, lenght);
}

export function clearBoard(){
	for (let i = 0; i < SimAttr.maxRows; i++)
		SimAttr.board[i].fill(false);
}

export function drawBoard() {
	SimAttr.ctx.fillStyle = "black";
	SimAttr.ctx.fillRect(0, 0, SimAttr.canva.width, SimAttr.canva.height);
	for (let i = 0; i < SimAttr.maxRows; i++) {
		for (let j = 0; j < SimAttr.maxCols; j++) {
			drawCell(i, j);
		}
	}
}