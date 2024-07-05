import Board from "./Board";
import GameOver from "./GameOver";
import Strike from "./Strike";
import GameState from "./GameState";
import WinCounter from "./WinCounter";
import Reset from './Reset'

import { useState, useEffect } from "react";

const PLAYER_X = 'X'
const PLAYER_O = 'O'

const winningCombos = [
    {combo: [0, 1, 2], strikeClass: 'strike-row-1'},
    {combo: [3, 4, 5], strikeClass: 'strike-row-2'},
    {combo: [6, 7, 8], strikeClass: 'strike-row-3'},
    {combo: [6, 7, 8], strikeClass: 'strike-row-3'},

    {combo: [0, 3, 6], strikeClass: 'strike-column-1'},
    {combo: [1, 4, 7], strikeClass: 'strike-column-2'},
    {combo: [2, 5, 8], strikeClass: 'strike-column-3'},

    {combo: [0, 4, 8], strikeClass: 'strike-diagonal-1'},
    {combo: [2, 4, 6], strikeClass: 'strike-diagonal-2'}
];

function checkWinner (tiles, setStrikeClass, setGameState) {
    for(const {combo, strikeClass} of winningCombos){
        const tile1 = tiles[combo[0]];
        const tile2 = tiles[combo[1]];
        const tile3 = tiles[combo[2]];
        
        if(tile1 !== null && tile1 === tile2 && tile1 === tile3){
            setStrikeClass(strikeClass);
            setGameState(tile1===PLAYER_X ? GameState.xWins : GameState.oWins);
            return;
        }
    }
    if(tiles.every((tile)=>tile!==null)){
        setGameState(GameState.draw);
    }
}

function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState()
    const [gameState, setGameState] = useState(GameState.inProgress)

    const handleTileClick = (index: number)=>{
        if(tiles[index] !== null || gameState!==GameState.inProgress) return
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        setPlayerTurn(playerTurn===PLAYER_X ? PLAYER_O : PLAYER_X)
    }

    const handleReset = ()=>{
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    }

    useEffect(()=>{
        checkWinner(tiles, setStrikeClass, setGameState);
    }, [tiles])

    return (<div className="game">
        <h1>Tic Tac Toe</h1>
        <Board 
        playerTurn={playerTurn} 
        tiles={tiles} 
        onTileClick={handleTileClick} 
        strikeClass={strikeClass}
        />
        <WinCounter/>
        <GameOver gameState={gameState}/>
        <Reset gameState={gameState} onReset={handleReset}/>
    </div>);
}

export default TicTacToe
