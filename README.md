Samutprakan
===========

A 2D Shooter Game engine written in JavasScript with a help from CreateJS. This engine is a port from Fish & Chips II's engine (Charlotte). It is a lot less powerful than Charlotte though to make sure that it is accessible to various circumstance.

How to Use
==========

Currently, documentation is poor. However, since the code is simple enough, you can get started right now with some patience. The main class of the game is Level, Enemy and Cutscene. You need to inherits these three classes in order to create your own game. You can see some samples in these files: level.js, enemy.js and cutscene.js. They are pretty straightforward. There's a quirk though, if you create an object from a Cutscene class (or its derivative), you must put this line cutscene.updateCommands(); after when you initialize a new scene.
