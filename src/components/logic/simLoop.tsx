import { drawBoard } from "./draw";
import { _boardState, settings } from "./init";
import { updateByRule } from "./rule";
//import { updateByRule } from "./rule";


export const boardState: _boardState = {
	needToRefresh: true,
	lastUpdate:0,
};

function updateBoard(){
	const now = performance.now();
	if (now - boardState.lastUpdate >= settings.timeToWait){
		console.log('updated');
		boardState.needToRefresh = true;
		updateByRule();
	}
	else
		return ;
	boardState.lastUpdate = now;
}


export function simulationLoop() {
	if (settings.poused == false)
		updateBoard();
	if (boardState.needToRefresh)
		drawBoard(), boardState.needToRefresh = false;
	requestAnimationFrame(simulationLoop);
}