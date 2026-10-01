import { useState } from "react";
import axios from "axios";

function ApiTester() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = async () => {
    if (!url) {
      setError("Please enter an API URL");
      return;
    }

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const result = await axios({
        method: method,
        url: url,
      });

      setResponse(result.data);
    } catch (err) {
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data, null, 2)
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>API Tester</h1>

      <div style={styles.form}>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={styles.select}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          placeholder="Enter API URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />

        <button onClick={sendRequest} style={styles.button}>
          {loading ? "Sending..." : "Send Request"}
        </button>
      </div>

      {error && (
        <div style={styles.error}>
          <h3>Error</h3>
          <pre>{error}</pre>
        </div>
      )}

      {response && (
        <div style={styles.response}>
          <h3>Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "1000px",
    margin: "auto",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },

  select: {
    padding: "12px",
    fontSize: "16px",
  },

  input: {
    flex: 1,
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },

  button: {
    padding: "12px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  response: {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "8px",
    overflow: "auto",
  },

  error: {
    background: "#ffe5e5",
    color: "#b00020",
    padding: "20px",
    borderRadius: "8px",
    overflow: "auto",
  },
};

export default ApiTester;