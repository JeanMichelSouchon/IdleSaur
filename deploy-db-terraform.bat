@echo off
chcp 65001
setlocal enabledelayedexpansion

REM -----------------------------
REM 1) Charger les vars depuis .env.prod
REM -----------------------------
for /f "tokens=1,2 delims==" %%A in ('findstr "^DB_NAME" .env.prod') do set "DB_NAME=%%B"
for /f "tokens=1,2 delims==" %%A in ('findstr "^DB_USER" .env.prod') do set "DB_USER=%%B"
for /f "tokens=1,2 delims==" %%A in ('findstr "^DB_PASSWORD" .env.prod') do set "TF_VAR_db_password=%%B"

REM Vérifions qu’on a bien récupéré
if "%DB_NAME%"==""  echo ERREUR: DB_NAME introuvable dans .env.prod & pause & exit /b 1
if "%DB_USER%"==""  echo ERREUR: DB_USER introuvable dans .env.prod & pause & exit /b 1
if "%TF_VAR_db_password%"==""  echo ERREUR: DB_PASSWORD introuvable & pause & exit /b 1

REM -----------------------------
REM 2) Terraform (infra/prod)
REM -----------------------------
pushd infra\prod

echo ================================================
echo [Terraform] Initialisation…
terraform init -input=false
if errorlevel 1 echo ERREUR: terraform init & pause & exit /b 2

echo [Terraform] Déploiement (apply)…
terraform apply -auto-approve -var="db_name=%DB_NAME%" -var="db_user=%DB_USER%"
if errorlevel 1 echo ERREUR: terraform apply & pause & exit /b 3

echo [Terraform] Récupération de l'endpoint…
for /f "tokens=*" %%E in ('terraform output -raw db_endpoint') do set "DB_ENDPOINT=%%E"
if "%DB_ENDPOINT%"=="" echo ERREUR: impossible de récupérer db_endpoint & pause & exit /b 4

popd

echo Endpoint RDS = %DB_ENDPOINT%
echo.

REM -----------------------------
REM 3) Mettre à jour .env.prod
REM -----------------------------
echo [Mise à jour] DB_HOST dans .env.prod…
powershell -Command ^
  "(gc .env.prod) -replace '^DB_HOST=.*$', 'DB_HOST=%DB_ENDPOINT%' | Out-File -Encoding UTF8 .env.prod"
if errorlevel 1 echo ERREUR: impossible de mettre à jour .env.prod & pause & exit /b 5

echo Ligne DB_HOST mise à jour :
findstr /B "DB_HOST" .env.prod
echo.

REM -----------------------------
REM 4) Initialiser la DB
REM -----------------------------
echo [Init SQL] Exécution de init.sql via Docker MySQL client…
docker run --rm -v "%CD%\database\scripts:/scripts" mysql:5.7 sh -c ^
  "mysql -h %DB_ENDPOINT% -u %DB_USER% -p%TF_VAR_db_password% < /scripts/init.sql"
if errorlevel 1 echo ERREUR: échec de init.sql & pause & exit /b 6

echo.
echo ================================================
echo 🎉 Base MariaDB deployée et initialisée !
echo ================================================
pause
endlocal
exit /b 0
