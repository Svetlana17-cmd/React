require("dotenv").config();
const PORT = process.env.PORT;
const {
	MONGODB_USERNAME,
	MONGODB_PASSWORD,
	TEST_MONGODB_USERNAME,
	TEST_MONGODB_PASSWORD,
} = process.env;

const createMongoUri = (username, password) =>
	`mongodb+srv://${username}:${password}@cluster.wlz1m.mongodb.net/person?retryWrites=true&w=majority&appName=Cluster`;

const PROD_MONGODB_URI = createMongoUri(MONGODB_USERNAME, MONGODB_PASSWORD);

const TEST_MONGODB_URI = createMongoUri(
	TEST_MONGODB_USERNAME,
	TEST_MONGODB_PASSWORD,
);

const MONGODB_URI = process.env.NODE_ENV === "test"
	? TEST_MONGODB_URI
	: PROD_MONGODB_URI;

module.exports = {
	MONGODB_URI,
	PORT,
};
