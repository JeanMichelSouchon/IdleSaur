@echo off
:: ------------------------------------------
:: Start Script for Docker Compose
:: ------------------------------------------

:: Function to clean the database folder
set "DB_PATH=.\database\datas"

:: Vérification si un paramètre est fourni
if "%1"=="" goto menu
if "%1"=="--clean" goto clean_database_only
if "%1"=="--build" goto start_docker
if "%1"=="--clean-build" goto clean_and_build
if "%1"=="--clean-build-no-cache" goto clean_and_build_no_cache
if "%1"=="--help" goto show_help

:: Si le paramètre n'est pas reconnu, afficher l'aide
echo Invalid option. Use --help for more information.
exit /b

:: Affichage du menu principal
:menu
cls
echo ========================================
echo What would you like to do?
echo.
echo [1] CLEAN ONLY  - Clean the database folder
echo.
echo [2] CLEAN AND BUILD - Clean the database folder and start Docker Compose
echo.
echo [3] CLEAN AND BUILD (NO CACHE) - Clean the database folder, rebuild images without cache, and start Docker Compose
echo.
echo [4] BUILD ONLY - Start Docker Compose without cleaning
echo.
echo ========================================
echo.
set /p choice="Enter your choice ( 1 / 2 / 3 / 4 ) : "

if "%choice%"=="1" goto clean_database_only
if "%choice%"=="2" goto clean_and_build
if "%choice%"=="3" goto clean_and_build_no_cache
if "%choice%"=="4" goto start_docker

:: Gestion des choix invalides
echo Invalid choice. Please select 1, 2, 3, or 4.
pause
goto menu

:: Affichage de l'aide
:show_help
echo ========================================
echo Usage: start.bat [OPTION]
echo OPTIONS:
echo   --clean                Clean the database folder only
echo   --build                Start Docker Compose without cleaning
echo   --clean-build          Clean the database folder and start Docker Compose
echo   --clean-build-no-cache Clean the database folder, rebuild images without cache, and start Docker Compose
echo   --help                 Show this help message
echo ========================================
exit /b

:: Nettoyage du dossier database uniquement
:clean_database_only
echo Cleaning the database folder...
call :clean_database
goto end

:: Nettoyage et build Docker normal
:clean_and_build
echo Cleaning the database folder...
call :clean_database
goto start_docker

:: Nettoyage et build Docker avec --no-cache
:clean_and_build_no_cache
echo Cleaning the database folder...
call :clean_database
goto start_docker_no_cache

:: Fonction de nettoyage du dossier database
:clean_database
if exist "%DB_PATH%" (
    echo Removing database folder...
    rmdir /s /q "%DB_PATH%"
    if exist "%DB_PATH%" (
        echo Failed to remove the database folder. Check permissions.
        exit /b
    )
    mkdir "%DB_PATH%"
    echo Database folder cleaned and recreated successfully!
) else (
    echo Database folder not found. Creating a new one...
    mkdir "%DB_PATH%"
)
exit /b

:: Démarrer Docker Compose sans cache correctement (build séparé)
:start_docker_no_cache
echo ========================================
echo Building Docker images without cache...
echo ========================================
docker-compose build --no-cache

if %errorlevel% neq 0 (
    echo Error during image build. Aborting.
    exit /b
)

echo ========================================
echo Starting Docker Compose...
echo ========================================
docker-compose up
goto end

:: Démarrer Docker Compose normalement
:start_docker
echo ========================================
echo Starting Docker Compose...
echo ========================================
docker-compose up --build
goto end

:end
:: Garde la fenêtre ouverte si nécessaire
pause
