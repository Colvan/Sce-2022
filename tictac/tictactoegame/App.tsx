import React from 'react';
import { FC, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';

const playersSetColor: number[][] = [[],[]];

const Brick: FC<{ callback: (ind: number) => void, index: number,  turn: { player: number } }> = ({ callback, index, turn }) => {
  const [player, setPlayer] = useState<number>(0)

  const clickHandler = () => {
    console.log("click Brick")
    setPlayer(turn.player)
    callback(index)
  }

  const backColors = ["white", "red", "green"]
  return (
    <View style={[styles.brick]}>
      <TouchableOpacity
        onPress={clickHandler}
        style={[styles.brick, { backgroundColor: backColors[player] }]}>
      </TouchableOpacity>
    </View>
  )
}

function arrayAlreadyHasArray(arr: any[], subarr: any[]){
  for(var i = 0; i<arr.length; i++){
      let checker = false
      for(var j = 0; j<arr[i].length; j++){
          if(arr[i][j] === subarr[j]){
              checker = true
          } else {
              checker = false
              break;
          }
      }
      if (checker){
          return true
      }
  }
  return false
}

const checkIfSomeOneWon = (setColors: any) =>{
  const possibleComibnationWins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  if(arrayAlreadyHasArray(possibleComibnationWins,setColors)){
    return true;
  }else{
    return false;
  }
}


const App: FC = () => {
  const turn = { player: 1 } //1: X , 2: O

  const clickHandler = (ind: number) => {
    console.log("click App " + ind)
    playersSetColor[turn.player-1].push(ind);
    playersSetColor[turn.player-1].sort(function(a,b){return a-b});
    let checkwinner =checkIfSomeOneWon(playersSetColor[turn.player-1]);
    if(checkwinner){
      alert("player " + turn.player + " won")
    }
    if (turn.player == 1) {
      turn.player = 2
    } else {
      turn.player = 1
    }
  }

  const reloadHandler = () => {
    console.log("click reloadHandler ")
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>X Mix Drix</Text>
      <View style={styles.rowContainer}>
        <Brick callback={clickHandler} index={0} turn={turn}></Brick>
        <Brick callback={clickHandler} index={1} turn={turn}></Brick>
        <Brick callback={clickHandler} index={2} turn={turn}></Brick>
      </View>
      <View style={styles.rowContainer}>
        <Brick callback={clickHandler} index={3} turn={turn}></Brick>
        <Brick callback={clickHandler} index={4} turn={turn}></Brick>
        <Brick callback={clickHandler} index={5} turn={turn}></Brick>
      </View>
      <View style={styles.rowContainer}>
        <Brick callback={clickHandler} index={6} turn={turn}></Brick>
        <Brick callback={clickHandler} index={7} turn={turn}></Brick>
        <Brick callback={clickHandler} index={8} turn={turn}></Brick>
      </View>
      <TouchableOpacity onPress={reloadHandler}>
        <Text style={styles.button}>RELOAD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: 'blue',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',

  },
  label: {
    flex: 1
  },
  child: {
    margin: 5,
    flex: 1,
    aspectRatio: 1,
  },
  brick: {
    backgroundColor: "white",
    margin: 5,
    flex: 1,
    aspectRatio: 1,
  },
  title: {
    fontSize: 30,
    textAlign: "center"
  },
  button: {
    margin: 5,
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "grey",
    borderRadius: 10
  }
});

export default App
