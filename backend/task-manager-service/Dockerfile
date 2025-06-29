FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["task-manager-service.csproj", "."]
RUN dotnet restore "task-manager-service.csproj"
COPY . .
RUN dotnet build "task-manager-service.csproj" -c Release -o /app/build
RUN dotnet publish "task-manager-service.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "task-manager-service.dll"]