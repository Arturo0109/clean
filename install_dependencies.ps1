Write-Host "Starting installation process..." -ForegroundColor Cyan

# Check Node.js version
$nodeVersion = node -v
Write-Host "Node.js version detected: $nodeVersion" -ForegroundColor Green

# Install Backend Dependencies
Write-Host "Installing Backend Dependencies..." -ForegroundColor Yellow
cd backend
if ($?) {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to install backend dependencies."
        exit 1
    }
    
    # Generate Prisma Client
    Write-Host "Generating Prisma Client..." -ForegroundColor Yellow
    npx prisma generate
    
    cd ..
} else {
    Write-Error "Backend directory not found!"
    exit 1
}

# Install Frontend Dependencies
Write-Host "Installing Frontend Dependencies..." -ForegroundColor Yellow
cd frontend
if ($?) {
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to install frontend dependencies."
        exit 1
    }
    cd ..
} else {
    Write-Error "Frontend directory not found!"
    exit 1
}

Write-Host "All dependencies installed successfully!" -ForegroundColor Green
Write-Host "To start the backend: cd backend; npm run start:dev"
Write-Host "To start the frontend: cd frontend; npm run dev"
