const apiURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/api/v1"
    : "/api/v1";

export default apiURL;
