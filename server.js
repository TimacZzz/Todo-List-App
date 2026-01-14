import express from "express"
import { authRouter } from "./routes/authentication.js"
import { userRouter } from "./routes/user.js"
import session from 'express-session'
import dotenv from 'dotenv'

dotenv.config();

// Initialize an instance of express & PORT
const app = express();
const PORT = 8000;
const secret = process.env.SESSION_SECRET;

app.use(express.json());

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }
}))

app.use(express.static('public'));

app.use("/api/auth", authRouter);

app.use("/userHomepage", userRouter);

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
}).on("error", (err) => {
    console.error("Failed to start the server: ", err)
});