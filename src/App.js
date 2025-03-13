import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState, useEffect } from "react";

function App() {
  const [classnam, setClassNam] = useState("");
  const [currindex, setCurrIndex] = useState(0);
  const [bgColor, setBgColor] = useState("red");

  const [arr, setArr] = useState(["A", "B", "C", "D", "E", "F"]);

  const [ballsarr, setBallsArr] = useState([
    { ballid: 0, status: "open", color: "green" },
    { ballid: 1, status: "open", color: "violet" },
    { ballid: 2, status: "open", color: "pink" },
    { ballid: 3, status: "open", color: "red" },
    { ballid: 4, status: "open", color: "orange" },
    { ballid: 5, status: "open", color: "lightgreen" },
  ]);

  const [configuremap, setConfiguremap] = useState({
    0: "open",
    1: "open",
    2: "open",
    3: "open",
    4: "open",
    5: "open",
    6: "open",
    7: "open",
    8: "open",
  });

  useEffect(() => {
    shuffleArr(arr, 1);
    shuffleArr(ballsarr, 2);
  }, []);

  const handleclick = () => {
    setBgColor(bgColor === "red" ? "blue" : "red");
    window.location.reload();
  };

  const shuffleArr = (val, id) => {
    let nwarr = [...val];
    // algorithm usex to shuffle..... You can create a shuffle function using the Fisher-Yates (Knuth) Shuffle Algorithm, which efficiently shuffles the array in place. Here's a simple implementation in JavaScript:
    for (let i = nwarr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nwarr[i], nwarr[j]] = [nwarr[j], nwarr[i]]; // Swap elements
    }

    if (id == 1) {
      setArr(nwarr);
    } else if (id == 2) {
      setBallsArr(nwarr);
    }
  };

  // console.log(arr);
  // console.log(ballsarr);

  // const ballclick = (name, index) => {
  //   configuremap[index] = "close";
  //   setClassNam(name);
  //   setCurrIndex(index);
  // };

  const selectball = (id) => {
    let currentball = ballsarr[id];
    let currentballid = currentball.ballid;
    setCurrIndex(currentball.ballid);
    setClassNam(currentball.color);

    let nwballarr = [...ballsarr].filter((val) => val.ballid != currentballid);
    setBallsArr(nwballarr);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container-lg d-flex justify-content-center align-items-center"
        style={{
          width: "90%",
          maxWidth: "800px",
          height: "70vh",
          minHeight: "400px",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden", // Add overflow hidden
        }}
      >
        <img
          src={require("../src/assets/jar-removebg-preview.png")}
          alt="cricketball"
          style={{
            width: "60%",
            height: "auto",
            maxHeight: "100%",
            position: "relative",
            zIndex: 1, // Ensure jar stays above other elements
          }}
        />

        {/* Balls container */}
        <div
          style={{
            position: "absolute",
            width: "22%",
            height: "45%",
            bottom: "20%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "0 10px",
            zIndex: 2, // Ensure balls appear above jar
          }}
          className="balls-container"
        >
          {/* Columns (same structure as before) */}
          {/* Left Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              gap: "8px",
              width: "48%",
            }}
          >
            {ballsarr.slice(0, 3).map((ball, index) => (
              <img
                onClick={() => selectball(index)}
                className={ball.color}
                src={require("../src/assets/ball.png")}
                key={ball.ballid}
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "85px",
                  transition: "transform 0.3s",
                }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              />
            ))}
          </div>

          {/* Right Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              gap: "8px",
              width: "48%",
            }}
          >
            {ballsarr.slice(3, 6).map((ball, index) => (
              <img
                onClick={() => selectball(index + 3)}
                className={ball.color}
                src={require("../src/assets/ball.png")}
                key={ball.ballid}
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "85px",
                  transition: "transform 0.3s",
                }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          width: "90px",
          height: "30px",
          backgroundColor: bgColor,
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          color: "white",
          fontWeight: "bold",
          userSelect: "none",
        }}
        onClick={() => handleclick()}
      >
        shuffle
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "90%", // Adjust width for mobile responsiveness
              maxWidth: "350px", // Prevent it from getting too big
              height: "45vh",
              maxHeight: "400px", // Set a max height
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
              borderRadius: "10px", // Rounded corners for better design
              padding: "20px", // Padding for better spacing
            }}
          >
            <img
              className={classnam}
              src={require("../src/assets/ball.png")}
              alt="Cricket ball"
              style={{
                width: "50%", // Adjusted for responsiveness
                maxWidth: "150px", // Prevents oversizing
                height: "auto",
              }}
            />

            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              <h1
                style={{
                  fontSize: "8vw", // Dynamic font size based on screen width
                  fontWeight: "bold",
                  color: "yellow",
                  textAlign: "center",
                }}
              >
                {arr[currindex]}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
