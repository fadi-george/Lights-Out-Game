# Lights Out Game
Old incompelte LightsOut game. Fun a little experiment in playing with binary matrices. 

![Lights Out](https://dl.dropboxusercontent.com/s/jah471rdswki66a/LightsOutGame.png?dl=0)

<h2>Solving LightsOut</h2>
For solving this type a game, you can express each button press at some corner as a vector with entries 0 or 1. 0 corresponds to not changing the state of the elements arround it, and 1 corresponds to toggling the surrounding state (including itself).

After you generate this matrix, you can then proceed to an RREF in modulo 2, to obtain a sequance of button presses to some tile that should result in clearing the board.
