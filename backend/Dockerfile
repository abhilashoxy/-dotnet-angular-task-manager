# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Step 1: Copy only the .csproj and restore
COPY ./backend/task-manager-service/task-manager-service.csproj ./task-manager-service/
RUN dotnet restore ./task-manager-service/task-manager-service.csproj

# Step 2: Copy the rest of the backend code
COPY ./backend/task-manager-service/ ./task-manager-service/

WORKDIR /src/task-manager-service
RUN dotnet build --no-restore
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "task-manager-service.dll"]
