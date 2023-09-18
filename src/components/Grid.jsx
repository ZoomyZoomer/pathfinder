import React from 'react'

var divArray = [];
var gridHeight = 30;
var gridLength = 70;
var flexArray = [];
var startNode = '5-16';
var endNode = '20-20';
var endx;
var endy;

var startClicked = false;
var endClicked = false;

var isAnimated = true;
let shortestPath = [];
let visitedNodes = [];
let blockedNodes = [];

let programRun = 'none';



const Grid = () => {
  


  makeGrid();


  return (
    <div id='gridWrapper' className='noEvent'>
      <main id='mainGrid' className="gridGrid">
        {flexArray}
      </main>
    </div>
  )
}

const makeGrid = () => {
    flexArray = [];

    for (var i = 0; i < gridHeight; i++){
        for (var j = 0; j < gridLength; j++){
            divArray.push(i + '-' + j);
        }
        var divElements = divArray.map(element => element === startNode ? React.createElement("div", {id: element, onClick: setBlocked, onMouseOver: dragImage, className: "unvisited"}, 
              React.createElement("img", {src: "startNode.png", className: "imageNode", id: "startNode", onClick: clickedSwitch}, null)) : 
              
              (element === endNode ? React.createElement("div", {id: element, onClick: setBlocked, onMouseOver: dragImage, className: "unvisited"}, 
              React.createElement("img", {src: "endNode.png", className: "imageNode", id: "endNode", onClick: clickedSwitch}, null)) : 
              
              <div id={element} onClick={setBlocked} onMouseOver={dragImage} className="unvisited"></div>));
  
        var tempFlex = React.createElement("div", {className: "gridFlexBox"}, divElements);

        flexArray.push(tempFlex);
        divArray = [];
    }

    endx = endNode.substring(0,endNode.indexOf('-'));
    endy = endNode.substring(endNode.indexOf('-') + 1);
    

  } 
  
  const clickedSwitch = (e) => {
    e.target.id === "startNode" ? startClicked = !startClicked : endClicked = !endClicked;
  }

  const setBlocked = (e) => {
    if (!(e.target.classList.contains("imageNode")) && !(e.target.classList.contains('visitedNoAnimation'))) {
      e.target.classList.add("blocked");
      e.target.classList.remove("unvisited");
      blockedNodes.push(e.target);
      document.getElementById('clear').classList.add('pointerEventReset');
    }
      
  }

  const clearTiles = (buttonClicked) => {
    shortestPath.map(element =>{ 
        element.classList.remove('shortestPathStatic');
        element.classList.remove('endNode');
        element.classList.remove('visitedNoAnimation');
        element.classList.remove('goal');
        element.classList.add('unvisited')
    });

    visitedNodes.map(element => {
        element.classList.remove('visited');
        element.classList.remove('visitedNoAnimation');
        element.classList.remove('endNode');
        element.classList.add('unvisited');
    });

    if (buttonClicked) {
      isAnimated = true;
      document.getElementById('clear').classList.remove('pointerEventReset');
        blockedNodes.map(element =>{
        element.classList.remove('blocked');
        element.classList.add('unvisited');
      })
    }
    
  }

  const dragImage = (e) => {
    console.log('running');
    if (!document.getElementById(startNode).classList.contains('undraggable')){
        var element = e.target.classList;
      if (!(element.contains("imageNode")) && !(element.contains("blocked"))){
        if (startClicked){
          e.target.appendChild(document.getElementById("startNode"));
          startNode = e.target.id;
          if (!isAnimated){
            clearTiles(false);
            if (programRun === 'BFS'){
              BFS();
            } else {
              AStar();
            }
          }

        } else if (endClicked){
          e.target.appendChild(document.getElementById("endNode"));
          endNode = e.target.id;
          endx = endNode.substring(0,endNode.indexOf('-'));
          endy = endNode.substring(endNode.indexOf('-') + 1);
          if (!isAnimated){
            clearTiles(false);
            if (programRun === 'BFS'){
              BFS();
            } else {
              AStar();
            }
          }
        }
      }
    }
    
  }

  async function BFS(){

    shortestPath = [];
    visitedNodes = [];
    queue = [];

    programRun = 'BFS';
  
    document.getElementById(startNode).classList.add('undraggable');
  
    console.log(document.getElementById('startNode'));
  
    document.getElementById(endNode).classList.add('endNode');
    document.getElementById(endNode).classList.remove('unvisited');
        
      var Node = {
        topDistance: startNode.substring(0,startNode.indexOf('-')),
        leftDistance: startNode.substring(startNode.indexOf('-') + 1),
        status: 'start',
        path: []
      };
  
      var elem = document.getElementById(startNode);
      elem.classList.remove('unvisited');
      isAnimated ? elem.classList.add('visited') : elem.classList.add('visitedNoAnimation');
  
      var queue = [];
      queue.push(Node);
  
      while (queue.length > 0){
  
        var queuedNode = queue.shift();
  
        var newNode = checkDirection(queuedNode, 'north');
        if (newNode.status === 'goal'){
          showPath(newNode.path);
          document.getElementById('startNode').classList.remove('undraggable');
          return newNode.path;
        } else if (newNode.status === 'valid'){
          if (isAnimated){
            await sleep(20);
          }
          queue.push(newNode);
        }
  
        var newNode = checkDirection(queuedNode, 'east');
        if (newNode.status === 'goal'){
          showPath(newNode.path);
          document.getElementById('startNode').classList.remove('undraggable');
          return newNode.path;
        } else if (newNode.status === 'valid'){
          if (isAnimated){
            await sleep(20);
          }
          queue.push(newNode);
        }
  
        var newNode = checkDirection(queuedNode, 'south');
        if (newNode.status === 'goal'){
          showPath(newNode.path);
          document.getElementById('startNode').classList.remove('undraggable');
          return newNode.path;
        } else if (newNode.status === 'valid'){
          if (isAnimated){
            await sleep(20);
          }
          queue.push(newNode);
        }
  
        var newNode = checkDirection(queuedNode, 'west');
        if (newNode.status === 'goal'){
          showPath(newNode.path);
          document.getElementById('startNode').classList.remove('undraggable');
          return newNode.path;
        } else if (newNode.status === 'valid'){
          if (isAnimated){
            await sleep(20);
          }
          queue.push(newNode);
        }
  
      }
  
      console.log("NO PATH FOUND");
      return false;
  
    }
  
    function checkDirection(Node, direction){
      var td = Node.topDistance;
      var ld = Node.leftDistance;
  
      if (direction === 'north'){
        td--;
      } else if (direction === 'south'){
        td++;
      } else if (direction === 'east'){
        ld++;
      } else {
        ld--;
      }
  
      var tempPath = Node.path.slice();
      tempPath.push(direction);
  
      var newNode = {
        topDistance: td,
        leftDistance: ld,
        status: "unknown",
        path: tempPath
      };
  
      newNode.status = setStatus(newNode);
  
      return newNode;
  
    }
  
    function setStatus(newNode){
  
      if (newNode.topDistance < 0 || newNode.leftDistance < 0 || newNode.topDistance > gridHeight -1 || newNode.leftDistance > gridLength - 1){
        return 'outOfBounds';
    }
  
    var elem = document.getElementById(newNode.topDistance + '-' + newNode.leftDistance);
    console.log(elem);
    if (elem.classList.contains('blocked')){
        return 'blocked';
    } else if (elem.classList.contains('visited')){
        return 'visited';
    } else if (elem.classList.contains('visitedNoAnimation')){
        return 'visited';
    }else if (elem.classList.contains('unvisited')){    
        isAnimated ? elem.classList.add('visited') : elem.classList.add('visitedNoAnimation');
        elem.classList.remove('unvisited');
        visitedNodes.push(elem);
        return 'valid';
    } else if (elem.classList.contains('endNode')){
        console.log('goal is found');
        isAnimated ? elem.classList.add('visited') : elem.classList.add('visitedNoAnimation');
        return 'goal';
    } else {
        return 'outofbounds';
    }
  
    }
  
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
  
    async function showPath(path){
      var td = 0;
      var ld = 0;
  
      var elem = document.getElementById(parseInt(parseInt(startNode.substring(0, startNode.indexOf('-'))) + td) + "-" + parseInt(parseInt(startNode.substring(startNode.indexOf('-') + 1)) + ld));
          shortestPath.push(elem);
  
          if (isAnimated){
            elem.classList.add('shortestPath');
            var audio = new Audio('bubble.wav');
                audio.play();  
            await sleep(500);
          } else {
            elem.classList.add('shortestPathStatic');
          }
  
          elem.classList.remove('visited');
  
      for (var i = 0; i < path.length; i++){
  
          var direction = path[i];
          
          if (direction === 'north'){
            td--;
          } else if (direction === 'south'){
            td++;
          } else if (direction === 'east'){
            ld++;
          } else if (direction === 'west'){
            ld--;
          } else if (direction === 'northEast'){
            td--;
            ld++;
          } else if (direction === 'northWest'){
            td--;
            ld--;
          } else if (direction === 'southEast'){
            td++;
            ld++;
          } else {
            td++;
            ld--;
          }
  
          var elem = document.getElementById(parseInt(parseInt(startNode.substring(0, startNode.indexOf('-'))) + td) + "-" + parseInt(parseInt(startNode.substring(startNode.indexOf('-') + 1)) + ld));
          shortestPath.push(elem);
  
          if (isAnimated){
            elem.classList.add('shortestPath');
            
              var audio = new Audio('bubble.wav');
                audio.play();  
            await sleep(500);
            var audio = new Audio('bubblefinal.wav');
                audio.play();
          } else {
            elem.classList.add('shortestPathStatic');
          }
  
          elem.classList.remove('visited');


          if (i === path.length -1) {
          if (isAnimated){
            document.getElementById(endNode).classList.add('endNode');
            document.getElementById(endNode).classList.add('goal');
            await sleep(200);
          }
          }
          
  
      }
  
      for (var i = 0; i < shortestPath.length; i++){
        shortestPath[i].classList.add('shortestPathStatic');
        shortestPath[i].classList.remove('shortestPath');
      }
  
      document.getElementById(startNode).classList.remove('undraggable');
      document.getElementById('clear').classList.add('notInvisible');
      document.getElementById('clear').classList.add('pointerEventReset');
      isAnimated = false;
    }


    let nodedNodes = [];


    const AStar = async() => {
      shortestPath = [];
      visitedNodes = [];
      queue = [];
      var closedQueue = [];
      nodedNodes = [];
      

      programRun = 'AStar';

      console.log(endx + " " + endy);
      document.getElementById(startNode).classList.add('undraggable');
  
      document.getElementById(endNode).classList.add('endNode');
      document.getElementById(endNode).classList.remove('unvisited');
        
          
        var Node = {
          topDistance: startNode.substring(0,startNode.indexOf('-')),
          leftDistance: startNode.substring(startNode.indexOf('-') + 1),
          status: 'start',
          path: []
        };
    
        var queue = [];
        queue.push(Node);
    
        while (queue.length > 0){
    
          var queuedNode = queue.shift();
          nodedNodes.push(queuedNode);
    
          var newNode = checkDirectionAStar(queuedNode, 'north');

          if (newNode.status === 'goal'){
            showPath(newNode.path);
            return newNode.path;
          }

          if (isAnimated){
            await sleep(20);
          }
          closedQueue.push(newNode);
        
          var newNode = checkDirectionAStar(queuedNode, 'northEast');

          if (newNode.status === 'goal'){
            showPath(newNode.path);
            return newNode.path;
          }
          
          if (isAnimated){
            await sleep(20);
          }
          closedQueue.push(newNode);
    
          var newNode = checkDirectionAStar(queuedNode, 'east');

          if (newNode.status === 'goal'){
            showPath(newNode.path);
            return newNode.path;
          }

          if (isAnimated){
            await sleep(20);
          }
          closedQueue.push(newNode);

          var newNode = checkDirectionAStar(queuedNode, 'southEast');

          if (newNode.status === 'goal'){
            showPath(newNode.path);
            return newNode.path;
          }

          if (isAnimated){
            await sleep(20);
          }
          closedQueue.push(newNode);
    
          var newNode = checkDirectionAStar(queuedNode, 'south');

          if (newNode.status === 'goal'){
            showPath(newNode.path);
            return newNode.path;
          }

          if (isAnimated){
            await sleep(20);
          }
          closedQueue.push(newNode);

          var newNode = checkDirectionAStar(queuedNode, 'southWest');

          if (newNode.status === 'goal'){
            showPath(newNode.path);
            return newNode.path;
          }

          if (isAnimated){
            await sleep(20);
          }
          closedQueue.push(newNode);
    
          var newNode = checkDirectionAStar(queuedNode, 'west');

          if (newNode.status === 'goal'){
            showPath(newNode.path);
            return newNode.path;
          }

          if (isAnimated){
            await sleep(20);
          }
          closedQueue.push(newNode);

          var newNode = checkDirectionAStar(queuedNode, 'northWest');

          if (newNode.status === 'goal'){
            showPath(newNode.path);
            return newNode.path;
          }

          if (isAnimated){
            await sleep(20);
          }
          closedQueue.push(newNode);
    
          var bestNode = lowestFValue(closedQueue);
          console.log(bestNode);

          closedQueue = [];
        
          queue.push(bestNode);
        }
    
        console.log("NO PATH FOUND");
        return false;

    }

    const checkDirectionAStar = (Node, direction) => {
      var td = Node.topDistance;
      var ld = Node.leftDistance;
      var isDiagonal = false;
  
      if (direction === 'north'){
        td--;
      } else if (direction === 'south'){
        td++;
      } else if (direction === 'east'){
        ld++;
      } else if (direction === 'west'){
        ld--;
      } else if (direction === 'northEast'){
        td--;
        ld++;
        isDiagonal = true;
      } else if (direction === 'northWest'){
        td--;
        ld--;
        isDiagonal = true;
      } else if (direction === 'southEast'){
        td++;
        ld++;
        isDiagonal = true;
      } else {
        td++;
        ld--;
        isDiagonal = true;
      }
        
      
  
      var tempPath = Node.path.slice();
      tempPath.push(direction);
  
      var newNode = {
        topDistance: td,
        leftDistance: ld,
        status: "unknown",
        path: tempPath,
        hValue: 100,
        gValue: 100,
        fValue: 100
      };
  
      newNode.status = setStatus(newNode);
      var isDoneAlready = false;

      if (newNode.status !== 'blocked' && newNode.status !== 'outOfBounds'){
          newNode.hValue = setHValue(newNode);

          newNode.gValue = setGValue (isDiagonal);
  
          newNode.fValue = newNode.gValue + newNode.hValue;

      }   
      

      return newNode;
    }

    const setGValue = (isDiagonal) => {
      if (isDiagonal){
        return 1.4;
      } else {
        return 1;
      }
    }


    const setHValue = (node) => {
      return (Math.sqrt(Math.pow(node.leftDistance - endy, 2) + Math.pow(node.topDistance-endx, 2)));
    }

    const lowestFValue = (queue) => {
      var nono = false;
      var minF = {
        fValue: 1000
      };

      for (var i = 0; i < queue.length; i++){
        if (queue[i].fValue <= minF.fValue){
          if (queue[i].status !== 'outofbounds' && queue[i].status !== 'outOfBounds'){
            for (var k = 0; k < nodedNodes.length; k++){
              if (nodedNodes[k].topDistance === queue[i].topDistance && nodedNodes[k].leftDistance === queue[i].leftDistance){
                nono = true;
              }
            }
            if (!nono){
              minF = queue[i];
            } else {
              nono = false;
            }
          }

        }
      }
      console.log(nodedNodes);
      console.log(queue);
      return minF;
    }

    const DFS = async() => {

      var path = [];

      var newNode = '';

      document.getElementById(startNode).classList.add('undraggable');
  
      document.getElementById(endNode).classList.add('endNode');
      document.getElementById(endNode).classList.remove('unvisited');
        

      for (var i = startNode.substring(0,startNode.indexOf('-')); i >= 0; i--){
        var element = document.getElementById(i + '-' + startNode.substring(startNode.indexOf('-') + 1));
        if (!element.classList.contains('blocked')){
          element.classList.add('visited');
          element.classList.remove('unvisited');
          path.push(element);
        }
        await sleep (20);
        newNode = element.id;
      }

      for (var k = newNode.substring(newNode.indexOf('-') + 1); k >= 0; k--){
        var element = document.getElementById(newNode.substring(0, newNode.indexOf('-')) + '-' + k);
        if (!element.classList.contains('blocked')){
          element.classList.add('visited');
          element.classList.remove('unvisited');
          path.push(element);
        }
        await sleep (20);
      }


      for (var i = 0; i < gridLength; i++){
        for (var k = 0; k < gridHeight; k++){
          var element = document.getElementById(k + '-' + i);
          if (!element.classList.contains('blocked')){
            element.classList.add('visited');
            element.classList.remove('unvisited');
            path.push(element);
          }
          await sleep (20);
          if (element.classList.contains('endNode')){
            showPathDFS(path);
            return;
          }
        }
      }


    }

    const showPathDFS = async(path) => {

      for (var i = 0; i < path.length; i++){
        path[i].classList.remove('visited');
        path[i].classList.add('shortestPath');
        await sleep(20);
      }

      document.getElementById(endNode).classList.remove('visited');
      document.getElementById(endNode).classList.remove('endNode');
      document.getElementById(endNode).classList.add('goal');
    }



export{
    Grid,
    BFS,
    AStar,
    DFS,
    clearTiles

};