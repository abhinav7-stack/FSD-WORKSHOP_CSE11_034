import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ApiTester() {

  const navigate = useNavigate();

  // =========================
  // STATE
  // =========================

  const [method, setMethod] = useState("GET");

  const [url, setUrl] = useState(
    "http://localhost:3000/user"
  );

  const [body, setBody] = useState("");

  const [response, setResponse] = useState("");

  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);


  // =========================
  // SEND REQUEST
  // =========================

  const sendRequest = async () => {

    setLoading(true);

    setResponse("");
    setStatus("");

    try {

      let data = undefined;


      // =========================
      // HANDLE REQUEST BODY
      // =========================

      if (
        ["POST", "PUT", "PATCH"].includes(method)
      ) {

        if (body.trim() !== "") {

          try {

            data = JSON.parse(body);

          } catch (error) {

            setStatus("Error");

            setResponse(
              "Invalid JSON in request body.\n\n" +
              error.message
            );

            setLoading(false);

            return;
          }
        }
      }


      // =========================
      // AXIOS REQUEST
      // =========================

      const result = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          "Content-Type": "application/json"
        }
      });


      // =========================
      // SUCCESS RESPONSE
      // =========================

      setStatus(result.status);

      setResponse(
        JSON.stringify(
          result.data,
          null,
          2
        )
      );


    } catch (error) {

      console.error(
        "API Request Error:",
        error
      );


      // =========================
      // SERVER RESPONSE ERROR
      // =========================

      if (error.response) {

        setStatus(
          error.response.status
        );

        setResponse(
          JSON.stringify(
            error.response.data,
            null,
            2
          )
        );

      }

      // =========================
      // REQUEST SENT BUT NO RESPONSE
      // =========================

      else if (error.request) {

        setStatus("No Response");

        setResponse(
          "The request was sent, but the server did not respond.\n\n" +
          "Make sure your backend is running on:\n" +
          "http://localhost:3000"
        );

      }

      // =========================
      // OTHER ERROR
      // =========================

      else {

        setStatus("Error");

        setResponse(
          error.message
        );

      }

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // CLEAR RESPONSE
  // =========================

  const clearResponse = () => {

    setResponse("");
    setStatus("");

  };


  // =========================
  // UI
  // =========================

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        padding: "30px",
        boxSizing: "border-box"
      }}
    >

      {/* =========================
          HEADER
      ========================= */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px"
          }}
        >

          <div>

            <h1
              style={{
                margin: 0
              }}
            >
              API Tester
            </h1>

            <p
              style={{
                color: "#666"
              }}
            >
              Test your REST APIs
            </p>

          </div>


          <button
            onClick={() =>
              navigate("/dashboard")
            }
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "6px",
              background: "#555",
              color: "white",
              cursor: "pointer"
            }}
          >
            ← Dashboard
          </button>

        </div>


        {/* =========================
            REQUEST BAR
        ========================= */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "0 3px 15px rgba(0,0,0,0.08)",
            marginBottom: "20px"
          }}
        >

          <div
            style={{
              display: "flex",
              gap: "10px"
            }}
          >

            {/* METHOD */}

            <select
              value={method}
              onChange={(e) =>
                setMethod(e.target.value)
              }
              style={{
                width: "120px",
                padding: "12px",
                border:
                  "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "15px"
              }}
            >

              <option value="GET">
                GET
              </option>

              <option value="POST">
                POST
              </option>

              <option value="PUT">
                PUT
              </option>

              <option value="PATCH">
                PATCH
              </option>

              <option value="DELETE">
                DELETE
              </option>

            </select>


            {/* URL */}

            <input
              type="text"
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              placeholder="http://localhost:3000/user"
              style={{
                flex: 1,
                padding: "12px",
                border:
                  "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "15px"
              }}
            />


            {/* SEND */}

            <button
              onClick={sendRequest}
              disabled={loading}
              style={{
                padding:
                  "12px 25px",
                border: "none",
                borderRadius: "6px",
                background:
                  loading
                    ? "#999"
                    : "#2563eb",
                color: "white",
                cursor:
                  loading
                    ? "not-allowed"
                    : "pointer",
                fontSize: "15px"
              }}
            >

              {loading
                ? "Sending..."
                : "Send"}

            </button>

          </div>

        </div>


        {/* =========================
            REQUEST + RESPONSE
        ========================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "20px"
          }}
        >


          {/* =========================
              REQUEST BODY
          ========================= */}

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow:
                "0 3px 15px rgba(0,0,0,0.08)"
            }}
          >

            <h2>
              Request Body
            </h2>

            <p
              style={{
                color: "#666"
              }}
            >
              Use JSON for POST, PUT
              and PATCH requests.
            </p>

            <textarea
              value={body}
              onChange={(e) =>
                setBody(e.target.value)
              }
              placeholder={`{
  "name": "Abhinav",
  "class": "CSE-11",
  "reg": "12345"
}`}
              style={{
                width: "100%",
                height: "350px",
                padding: "15px",
                boxSizing: "border-box",
                border:
                  "1px solid #ccc",
                borderRadius: "6px",
                resize: "vertical",
                fontFamily:
                  "monospace",
                fontSize: "14px"
              }}
            />

          </div>


          {/* =========================
              RESPONSE
          ========================= */}

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow:
                "0 3px 15px rgba(0,0,0,0.08)"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center"
              }}
            >

              <h2>
                Response
              </h2>

              <button
                onClick={clearResponse}
                style={{
                  padding:
                    "6px 12px",
                  border:
                    "1px solid #ccc",
                  borderRadius: "5px",
                  background:
                    "white",
                  cursor: "pointer"
                }}
              >
                Clear
              </button>

            </div>


            {/* STATUS */}

            <p>

              Status:{" "}

              <strong
                style={{
                  color:
                    status >= 200 &&
                    status < 300
                      ? "green"
                      : status
                      ? "red"
                      : "#555"
                }}
              >
                {status ||
                  "Waiting..."}

              </strong>

            </p>


            {/* RESPONSE DATA */}

            <pre
              style={{
                background:
                  "#f1f1f1",
                padding: "15px",
                borderRadius: "6px",
                height: "350px",
                overflow: "auto",
                whiteSpace:
                  "pre-wrap",
                wordBreak:
                  "break-word",
                fontFamily:
                  "monospace"
              }}
            >

              {response ||
                "Response will appear here..."}

            </pre>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ApiTester;