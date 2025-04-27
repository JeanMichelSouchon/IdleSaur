@echo off
chcp 65001
setlocal enabledelayedexpansion

REM ==============================================
REM 1) Vérifier AWS CLI & Terraform
REM ==============================================
aws sts get-caller-identity >nul 2>&1
if errorlevel 1 (
  echo ERREUR : AWS CLI non configurée ou clés invalides.
  pause & exit /b 1
)
terraform -version >nul 2>&1
if errorlevel 1 (
  echo ERREUR : Terraform non trouvé dans le PATH.
  pause & exit /b 2
)

REM ==============================================
REM 2) Deployment DB avec Terraform + init SQL
REM ==============================================
echo.
echo [STEP 1/4] Provision et init DB
call deploy-db-terraform.bat
if errorlevel 1 (
  echo ERREUR lors du déploiement de la DB.
  pause & exit /b 3
)

REM ==============================================
REM 3) Build & Push des images Docker dans ECR
REM ==============================================
echo.
echo [STEP 2/4] Build & Push Docker images
REM Récupérer dynamiquement Account et Region
for /f "tokens=*" %%A in ('aws sts get-caller-identity --query Account --output text') do set "AWS_ACCOUNT_ID=%%A"
for /f "tokens=*" %%A in ('aws configure get region')             do set "AWS_REGION=%%A"
set "TAG=%TAG%"

REM Créer les repos ECR si besoin
for %%IMG in backend frontend do (
  aws ecr describe-repositories --repository-names iddlesaur-%%IMG >nul 2>&1 || ^
    aws ecr create-repository --repository-name iddlesaur-%%IMG --region %AWS_REGION% >nul
)

REM Authentification Docker → ECR
aws ecr get-login-password --region %AWS_REGION% | docker login --username AWS --password-stdin %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com

REM Backend
docker build -t iddlesaur-backend backend
docker tag iddlesaur-backend:latest %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/iddlesaur-backend:%TAG%
docker push %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/iddlesaur-backend:%TAG%

REM Frontend
docker build -t iddlesaur-frontend frontend
docker tag iddlesaur-frontend:latest %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/iddlesaur-frontend:%TAG%
docker push %AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/iddlesaur-frontend:%TAG%

if errorlevel 1 (
  echo ERREUR lors du build/push Docker.
  pause & exit /b 4
)

REM ==============================================
REM 4) Déploiement via App Runner + MAJ .env.prod
REM ==============================================
echo.
echo [STEP 3/4] Déploiement App Runner

REM Fonction helper pour créer ou mettre à jour un service App Runner
:deploy_apprunner
set "NAME=%~1"
set "PORT=%~2"
set "IMAGE=%AWS_ACCOUNT_ID%.dkr.ecr.%AWS_REGION%.amazonaws.com/iddlesaur-%NAME%:%TAG%"

REM Chercher l'ARN du service s'il existe
for /f "tokens=*" %%A in ('aws apprunner list-services ^
  --query "ServiceSummaryList[?ServiceName=='iddlesaur-%NAME%'].ServiceArn|[0]" ^
  --output text') do set "SRV_ARN=%%A"

if "%SRV_ARN%"=="None" (
  echo Création du service %NAME%…
  for /f "tokens=*" %%A in ('aws apprunner create-service ^
    --service-name iddlesaur-%NAME% ^
    --source-configuration ImageRepository={ImageIdentifier=%IMAGE%,ImageConfiguration={Port=%PORT%}} ^
    --instance-configuration Cpu=1024,Memory=2048 ^
    --auto-deployments-enabled \
    --query "Service.ServiceArn" ^
    --output text') do set "SRV_ARN=%%A"
) else (
  echo Mise à jour du service %NAME%…
  aws apprunner update-service --service-arn %SRV_ARN% ^
    --source-configuration ImageRepository={ImageIdentifier=%IMAGE%,ImageConfiguration={Port=%PORT%}} >nul
)

REM Attendre que le service soit RUNNING
:wait_loop_%NAME%
for /f "tokens=*" %%S in ('aws apprunner describe-service --service-arn %SRV_ARN% --query "Service.Status" --output text') do set "STATUS=%%S"
if /I not "!STATUS!"=="RUNNING" (
  timeout /t 10 >nul
  goto :wait_loop_%NAME%
)

REM Récupérer l'URL du service
for /f "tokens=*" %%U in ('aws apprunner describe-service --service-arn %SRV_ARN% --query "Service.ServiceUrl" --output text') do set "%NAME:_=-_URL%=%%U"

REM Mettre à jour .env.prod
if "%NAME%"=="backend" (
  powershell -Command ^
    "(gc .env.prod) -replace '^REACT_APP_API_URL=.*$', 'REACT_APP_API_URL=%backend_URL%' |
    Out-File -Encoding UTF8 .env.prod"
) else (
  powershell -Command ^
    "(gc .env.prod) -replace '^FRONTEND_URL=.*$', 'FRONTEND_URL=%frontend_URL%' |
    Out-File -Encoding UTF8 .env.prod"
)

echo %NAME% déployé → URL = !%NAME:_=-_URL%!  
goto :eof

REM Déployer backend (port 3000)
call :deploy_apprunner backend 3000

REM Déployer frontend (port 80)
call :deploy_apprunner frontend 80

REM ==============================================
echo.
echo [STEP 4/4] Résumé final :
echo   DB_HOST       = %DB_ENDPOINT%
echo   Backend_URL   = %backend_URL%
echo   Frontend_URL  = %frontend_URL%
echo ==============================================
pause
endlocal
