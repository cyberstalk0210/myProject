# Use an official Gradle image to build the app
FROM gradle:8.1.1-jdk17-alpine AS build

WORKDIR /app

# Copy Gradle wrapper and build files
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .

# Copy source code
COPY src ./src

# Make gradlew executable (if on Linux host)
RUN chmod +x ./gradlew

# Build the project and create the executable jar (skip tests to speed up if you want)
RUN ./gradlew clean bootJar --no-daemon

# Use a lightweight OpenJDK image to run the app
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy jar file from build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose port your app listens on (default 8080)
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java","-jar","app.jar"]
