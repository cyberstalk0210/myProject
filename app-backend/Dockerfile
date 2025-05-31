# Stage 1: Build the Spring Boot app
FROM gradle:8.6-jdk21 AS build

WORKDIR /app

# Copy Gradle build files
COPY app-backend/build.gradle app-backend/settings.gradle ./
COPY app-backend/gradle ./gradle

# Copy the rest of the backend code
COPY app-backend/src ./src

# Build the app (this will generate the JAR file)
RUN gradle build --no-daemon

# Stage 2: Run the Spring Boot app
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose the port Spring Boot runs on (default is 8080)
EXPOSE 8080

# Run the Spring Boot app
CMD ["java", "-jar", "app.jar"]