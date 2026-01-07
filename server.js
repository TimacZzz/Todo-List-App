import express from "express"

// Initialize an instance of express & PORT
const app = express();
const PORT = 8000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
}).on("error", (err) => {
    console.error("Failed to start the server: ", err)
});