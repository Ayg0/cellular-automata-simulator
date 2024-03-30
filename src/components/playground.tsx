import { useEffect, useRef } from "react";
import { initCanvas } from "./logic/init";
import { ToastContainer } from "react-toastify";

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
