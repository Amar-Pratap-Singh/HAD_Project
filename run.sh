#!/bin/sh
cd auth 
mvn spring-boot:run &
cd ../reception
mvn spring-boot:run &
cd ../opd
mvn spring-boot:run &
cd ../ipd
mvn spring-boot:run &
cd ../client
ionic serve &
