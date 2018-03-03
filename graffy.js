

//Node constructor. Top refers to top left
//Bottom refers to bottom right
function Node(top,height,width){
	this.top = top;
	let bottomX = top.x + width;
	let bottomY = top.y + height;
	this.bottom = {x:bottomX,y:bottomY};
}
//Checks if two elements overlap given their top left 
//and bottom right corners
function checkOverlap(ele1,ele2){

}

// function moveEventGenerator(e){
// 	return (event) => {
// 		console.log(event);
// 	};
// }

function moveEventEntry(event){
	let node = event.target;

	let nodeX = node.style.left;
	nodeX = Number(nodeX.substring(0,nodeX.length-2)); //convert to number by removing px ending
	
	let nodeY = node.style.top;
	nodeY = Number(nodeY.substring(0,nodeY.length-2));
	
	let nodeHeight = node.style.height;
	nodeHeight = Number(nodeHeight.substring(0,nodeHeight.length-2));
	
	let nodeWidth = node.style.width;
	nodeWidth = Number(nodeWidth.substring(0,nodeWidth.length-2));
	
	let eventX = event.clientX;
	//eventX = Number(eventX.substring(0,eventX.length-2));
	
	let eventY = event.clientY;
	//eventY = Number(eventY.substring(0,eventY.length-2));
	
	let offsetX = 0;
	let offsetY = 0;

	if(eventX > nodeX+(nodeWidth/2)){ //mouse comes from right, move element left
		offsetX = -10;
	}
	else if(eventX < nodeX+(nodeWidth/2)){//opposite
		offsetX = 10;
	}

	if(eventY > nodeY+(nodeHeight/2)){ //mouse comes from bottom, move element up
		offsetY = -10;
	}
	else if(eventY < nodeY+(nodeHeight/2)){//opposite
		offsetY = 10;
	}

	node.style.left = (nodeX + offsetX) + "px";
	node.style.top = (nodeY + offsetY) + "px";

	//console.log(event.target);
}

function moveEventExit(event){
	let node = event.target;
	let originalNode = nodeTable[node.id];
	//console.log(node.style.top,originalNode.element.style.top);
	node.style.top = originalNode.top.y + "px"; 
	node.style.left = originalNode.top.x + "px";
}

const nodeTable = {};

const container = document.getElementById("graph-container");
const containerHeight = container.offsetHeight;
const containerWidth = container.offsetWidth;
//console.log(containerHeight,containerWidth)
for(let i = 0;i < 17;i++){
	let nodeX = Math.random()*containerWidth;
	let nodeY = Math.random()*containerHeight;
	let nodeHeight = 50;
	let nodeWidth = 50;
	let node = new Node({x:nodeX,y:nodeY},nodeHeight,nodeWidth);
	//nodes.push(node);
	let nodeElement = document.createElement("div");
	nodeElement.style.left = node.top.x + "px";
	nodeElement.style.top = node.top.y + "px";
	nodeElement.style.height = nodeHeight + "px";
	nodeElement.style.width = nodeWidth + "px";
	nodeElement.classList.add("node");
	nodeElement.id = "node" + i;
	nodeElement.addEventListener('mouseover',moveEventEntry);
	nodeElement.addEventListener('mouseleave',moveEventExit); //mouse leave does not bubble up, vs mouseout
	container.appendChild(nodeElement);
	node.element = nodeElement;
	nodeTable[nodeElement.id] = node; //store element in table
	//console.log(nodeElement.style.left,nodeElement.style.top);
}




//TODO: Maybe maximize distances using Voronoi Tesselation? 