import { useEffect, useRef } from "react";
import { initCanvas } from "./logic/init";

function Playground() {
	const CanvaRef = useRef<HTMLCanvasElement | null>(null);
	useEffect(() => {
		// canvas
		if (!CanvaRef.current)
			return;
		const ctxref = CanvaRef.current.getContext("2d");
		if (!ctxref)
			return;
		initCanvas(CanvaRef.current, ctxref);
	}, []);
	return (<>
    	<canvas className="canvas" ref={CanvaRef} id="Canv"></canvas>
		</>
  )
}

export default Playground;
