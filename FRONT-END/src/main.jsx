// // import { StrictMode } from 'react'
// // import { createRoot } from 'react-dom/client'
// // import './index.css'
// // import App from './App.jsx'
// // import home from './componets/home.jsx'

// // createRoot(document.getElementById('root')).render(
// //   <StrictMode>
// //     <App />
// //   </StrictMode>,
// // )
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import ApiTester from './components/api_tester.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ApiTester />
//   </StrictMode>,
// )
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ApiTester from "./components/api_tester.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ApiTester />
    </StrictMode>
);