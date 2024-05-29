FROM maven:3.8.3-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/grade_calculator-0.0.1-SNAPSHOT.jar grade_calculator.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","grade_calculator.jar"]