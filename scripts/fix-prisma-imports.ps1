# PowerShell script to fix Prisma imports in all API routes

$files = Get-ChildItem -Path "app\api" -Recurse -Filter "*.ts"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace PrismaClient import and instantiation
    $content = $content -replace "import \{ PrismaClient \} from '@prisma/client'", "import { prisma } from '@/lib/prisma'"
    $content = $content -replace "const prisma = new PrismaClient\(\)", ""
    
    # Remove $disconnect() calls
    $content = $content -replace "await prisma\.\`$disconnect\(\)", ""
    $content = $content -replace "finally \{\s*\}", ""
    
    # Clean up empty finally blocks
    $content = $content -replace "\} finally \{\s*\}", "}"
    
    Set-Content -Path $file.FullName -Value $content
    Write-Host "Fixed: $($file.FullName)"
}

Write-Host "Done! All API routes optimized."
