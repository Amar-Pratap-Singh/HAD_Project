package com.had.opd.models;

public class Vitals {
    private double weight;
    private double height;
    private double temperature;
    private int lowBP;
    private int highBP;

    // Getter and setter methods for 'weight'
    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    // Getter and setter methods for 'height'
    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    // Getter and setter methods for 'temperature'
    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    // Getter and setter methods for 'lowBP'
    public int getLowBP() {
        return lowBP;
    }

    public void setLowBP(int lowBP) {
        this.lowBP = lowBP;
    }

    // Getter and setter methods for 'highBP'
    public int getHighBP() {
        return highBP;
    }

    public void setHighBP(int highBP) {
        this.highBP = highBP;
    }
}

