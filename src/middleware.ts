import express, { Application } from "express";

export class Middleware{
    constructor(app:Application){
        app.use(express.json())
    }
}