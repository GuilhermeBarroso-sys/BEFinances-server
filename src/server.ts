import "dotenv/config";
import express from "express";
const app = express();
app.use(express.json());
const {PORT} = process.env;

app.get("/ping", (request, response) => {
	return response.status(200).json("pong");
});


app.listen(PORT || 3333, () => {
	console.log(`Server running on port ${PORT} 🚀`);
});