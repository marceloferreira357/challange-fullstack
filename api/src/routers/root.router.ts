import Router from "@routers/router";
import express from "express";

class Root extends Router {
    constructor() {
        super("/");
    }
}

export default Root;