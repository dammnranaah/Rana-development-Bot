@echo off
title Ranas Development - A basic ticket bot includes what you need

: start
echo Ranas Development - Starting...

if not exist "node_modules" (
    echo Modules not installed. Modules are being installed.
    npm i
    echo Installation of modules is complete. Close and reopen the window.
    pause
)

node index.js
goto start
pause