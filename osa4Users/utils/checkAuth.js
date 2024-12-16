const jwt = require("jsonwebtoken");

const CheckAuth = (request, response, next) => {
	const token = (request.headers.authorization || "").replace(/Bearer\s?/, "");

	if (token) {
		try {
			const decoded = jwt.verify(token, "secret123");

			request.userId = decoded._id;
			next();
		} catch (e) {
			return response.status(404).json({
				message: "No access",
			});
		}
	} else {
		return response.status(403).json({
			message: "No access",
		});
	}
};
module.exports = CheckAuth;
