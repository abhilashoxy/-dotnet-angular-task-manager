FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["task-manager-service.csproj", "."]
RUN dotnet restore "YourApp.csproj"
COPY . .
RUN dotnet build "YourApp.csproj" -c Release -o /app/build
RUN dotnet publish "YourApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "YourApp.dll"]