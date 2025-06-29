# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY task-manager-service/task-manager-service.csproj ./task-manager-service/
RUN dotnet restore ./task-manager-service/task-manager-service.csproj

# Copy all project files
COPY . .

WORKDIR /src/task-manager-service
RUN dotnet build -c Release -o /app/build
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "task-manager-service.dll"]
