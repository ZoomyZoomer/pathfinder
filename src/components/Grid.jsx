import React from 'react'

var divArray = [];
var gridHeight = 30;
var gridLength = 70;
var flexArray = [];
var startNode = '5-16';
var endNode = '20-20';

var startClicked = false;
var endClicked = false;

var isAnimated = true;
let shortestPath = [];
let visitedNodes = [];



const Grid = () => {
  


  makeGrid();

  return (
    <div className="gridGrid">
      {flexArray}
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


  } 
  
  const clickedSwitch = (e) => {
    e.target.id === "startNode" ? startClicked = !startClicked : endClicked = !endClicked;
  }

  const setBlocked = (e) => {
    if (!(e.target.classList.contains("imageNode")) && !(e.target.classList.contains('visitedNoAnimation'))) e.target.classList.add("blocked");
  }

  const clearTiles = () => {
    shortestPath.map(element =>{ 
        element.classList.remove('shortestPathStatic');
        element.classList.remove('endNode');
        element.classList.remove('visitedNoAnimation');
        element.classList.add('unvisited')
    });

    visitedNodes.map(element => {
        element.classList.remove('visited');
        element.classList.remove('visitedNoAnimation');
        element.classList.add('unvisited');
    });

    
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
            clearTiles();
            BFS();
            return;
          }

        } else if (endClicked){
          e.target.appendChild(document.getElementById("endNode"));
          endNode = e.target.id;
          if (!isAnimated){
            clearTiles();
            BFS();
            return;
          }
        }

      }
    }
    
  }

  async function BFS(){
    console.log('u');

    shortestPath = [];
    visitedNodes = [];
    queue = [];
  
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
  
      if (newNode.topDistance < 0 || newNode.leftDistance < 0 || newNode.topDistance > gridHeight -1 || newNode.leftDistance > gridLength -1){
        return 'outOfBounds';
    }
  
  
    var elem = document.getElementById(newNode.topDistance + '-' + newNode.leftDistance);
    if (elem.classList.contains('blocked')){
        return 'blocked';
    } else if (elem.classList.contains('visited')){
        return 'visited';
    } else if (elem.classList.contains('unvisited')){    
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
          } else if (direction === 'east'){
              ld++;
          } else if (direction === 'south'){
              td++;
          } else if (direction === 'west'){
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
            document.getElementById(endNode).classList.add('endNode');
            document.getElementById(endNode).classList.add('goal');
            await sleep(200);
          }
          
  
      }
  
      for (var i = 0; i < shortestPath.length; i++){
        shortestPath[i].classList.add('shortestPathStatic');
        shortestPath[i].classList.remove('shortestPath');
      }
  
      document.getElementById(startNode).classList.remove('undraggable');
      isAnimated = false;
    }

    const AStar = () => {

    }

    const DFS = () => {

    }


export{
    Grid,
    BFS,
    AStar,
    DFS
};