# --- ETAPA 1: Build da aplicação usando Gradle ---
FROM gradle:8.10-jdk21 AS build
WORKDIR /app

# Copia os arquivos de configuração do Gradle e o código fonte
COPY build.gradle settings.gradle gradlew ./
COPY gradle gradle
COPY src src

# Compila e empacota a aplicação gerando o arquivo .jar
RUN ./gradlew bootJar -x test

# --- ETAPA 2: Execução leve com Java 21 JRE ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copia o arquivo .jar gerado na etapa anterior
COPY --from=build /app/build/libs/*.jar app.jar

# Expõe a porta padrão da aplicação
EXPOSE 8081

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]