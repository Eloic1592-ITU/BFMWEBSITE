@echo off
set CONTAINER=1ac2d70d5882
set SOURCE=/app/dist/front
set DEST=dist-from-docker

echo.
echo ==========================================
echo   Compilation Angular en production...
echo ==========================================
docker exec %CONTAINER% ng build --prod

if errorlevel 1 (
    echo.
    echo ERREUR : La compilation Angular a echoue.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo   Verification des fichiers compiles...
echo ==========================================
docker exec %CONTAINER% ls %SOURCE%

if errorlevel 1 (
    echo.
    echo ERREUR : Le dossier %SOURCE% est introuvable dans le conteneur.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo   Suppression de l'ancien build...
echo ==========================================
if exist "%DEST%" (
    rmdir /s /q "%DEST%"
)

echo.
echo ==========================================
echo   Recuperation du nouveau build...
echo ==========================================
docker cp %CONTAINER%:%SOURCE% ./%DEST%

if errorlevel 1 (
    echo.
    echo ERREUR : Impossible de recuperer les fichiers.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo   SUCCES !
echo   Les fichiers sont disponibles dans :
echo   %DEST%
echo ==========================================
pause