import { Id, toast } from "react-toastify";
import { boardState, simulationLoop } from "./simLoop";
import { useRef } from "react";

type _Board = boolean[][];

interface _settings{
	poused:boolean;
	speed:number;
	timeToWait:number;
	aliveColor:string;
	deadColor:string;
}
export interface _boardState{
	needToRefresh:boolean;
	lastUpdate:number;
}

interface _simulationAttr {
	canva: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	cellSize:number;
	board:_Board;
	tmpBoard:_Board;
	maxCols:number;
	maxRows:number;
	heightOffset:number;
	widthOffset:number;
}

export let SimAttr:_simulationAttr = {} as _simulationAttr;
export let settings:_settings = {} as _settings;

let mouseDown = false;
let valToUse = false;

function AttributesInit(){
	SimAttr.cellSize = Math.floor(SimAttr.canva.width / 100);
	SimAttr.maxCols = Math.floor(SimAttr.canva.width / SimAttr.cellSize);
	SimAttr.maxRows = Math.floor(SimAttr.canva.height / SimAttr.cellSize);
	SimAttr.widthOffset = Math.floor((SimAttr.canva.width - (SimAttr.cellSize * SimAttr.maxCols)) / 2);
	SimAttr.heightOffset = Math.floor((SimAttr.canva.height - (SimAttr.cellSize * SimAttr.maxRows)) / 2);
}

export function boardsInit(){
	SimAttr.board = new Array(SimAttr.maxRows);
	SimAttr.tmpBoard = new Array(SimAttr.maxRows);
	for (let i = 0; i < SimAttr.maxRows; i++){
		SimAttr.board[i] = new Array(SimAttr.maxCols).fill(0);
		SimAttr.tmpBoard[i] = new Array(SimAttr.maxCols).fill(0);
	}
}

function settingsInit(){
	settings.aliveColor = "#2659ab";
	settings.deadColor = "white";
	settings.poused = true;
	settings.speed = 1;
	settings.timeToWait = 500;
}

function showTostify(msg:string){
	let id:Id = -1;
	const existingToast = toast.isActive(id);

	if (!existingToast)
		toast(msg, {toastId:id});
	else
		toast.update(id, {render: msg});
}

function handleCLick(e:MouseEvent){
	e.stopPropagation();
	e.preventDefault();
	if (!settings.poused || !mouseDown)
		return ;
	
	let x = e.clientX - SimAttr.canva.offsetLeft;
	let y = e.clientY - SimAttr.canva.offsetTop;
	
	x = Math.floor(x / SimAttr.cellSize);
	y = Math.floor(y / SimAttr.cellSize);
	if (x >= 0 && x < SimAttr.maxCols && 
		  y >= 0 && y < SimAttr.maxRows) {
		SimAttr.board[y][x] = valToUse;
		boardState.needToRefresh = true;
	}
}

function handlekeyPress(e:KeyboardEvent){
	e.stopPropagation();
	e.preventDefault();
	if (e.key == ' '){
		settings.poused = !settings.poused, boardState.needToRefresh = true;
		showTostify(settings.poused ? "POUSED" : "RUNNING");
	}
	else if (e.key == '+' || e.key == '-'){
		e.key == '+' ? settings.speed += 0.5 : e.key == '-' ? settings.speed -= 0.5 : settings.speed;
		settings.speed = settings.speed > 10 ? 10 : settings.speed < 0.5 ? 0.5 : settings.speed;
		settings.timeToWait = 1000 / settings.speed;
		showTostify("SPEED: " + settings.speed);
	}
}

export	function initCanvas(canva: HTMLCanvasElement, ctx:CanvasRenderingContext2D){
	SimAttr.canva = canva;
	SimAttr.ctx = ctx;

	canva.width = window.innerWidth;
  	canva.height = window.innerHeight;
	AttributesInit();
	boardsInit();
	settingsInit();
	requestAnimationFrame(simulationLoop);

	canva.addEventListener("mousedown", (e) =>{
		mouseDown = true;
		valToUse = true;
		handleCLick(e);
	});
	canva.addEventListener("mouseup",   (e) =>{
		mouseDown = false;
	});

	canva.addEventListener("mousemove", handleCLick);
	canva.addEventListener("contextmenu", (e) => {
		valToUse = false;
		mouseDown = true;
		handleCLick(e);
	});
	window.addEventListener("keypress", handlekeyPress);
}
