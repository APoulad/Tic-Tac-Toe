import GameState from "./GameState"
function Reset({gameState, onReset}) {
    if (gameState===GameState.inProgress){
        return;
    }
    return ( <div onClick={onReset} className="reset-button">Reset</div> );
}

export default Reset;