import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState, useEffect } from "react";

function App() {
  const [classnam, setClassNam] = useState("");
  const [currindex, setCurrIndex] = useState(0);

  const [arr, setArr] = useState(["A", "B", "C", "D", "E", "F", "G", "H", "I"]);

  const [ballsarr, setBallsArr] = useState([
    { ballid: 0, status: "open", color: "green" },
    { ballid: 1, status: "open", color: "violet" },
    { ballid: 2, status: "open", color: "pink" },
    { ballid: 3, status: "open", color: "red" },
    { ballid: 4, status: "open", color: "orange" },
    { ballid: 5, status: "open", color: "lightgreen" },
    { ballid: 6, status: "open", color: "darkgreen" },
    { ballid: 7, status: "open", color: "skyblue" },
    { ballid: 8, status: "open", color: "unknown" },
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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container-lg"
        style={{
          width: "70vw",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={require("../src/assets/jar-removebg-preview.png")}
          alt="cricketball"
          style={{ width: "60%", height: "100%" }}
        />

        {/* balls container */}
        <div
          style={{
            position: "absolute",
            width: "18%",
            height: "36%",
            bottom: "20%",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column-reverse",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "10px",
            overflow: "hidden",
          }}
          data-bs-toggle={ballsarr.length != 0 ? "modal" : ""}
          data-bs-target={ballsarr.length != 0 ? "#exampleModal" : ""}
        >
          {ballsarr.map((ball, index) => {
            const randomX = Math.random() * 30 + 20; // Adjusted X range for better centering
            const randomY = Math.random() * 50 + 30; // Y position within the jar

            return (
              <img
                onClick={() => selectball(index)}
                className={ball.color}
                src={require("../src/assets/ball.png")}
                key={ball.ballid}
                style={{
                  // position: "absolute",
                  width: "85px",
                  height: "85px",
                  top: `${randomY}%`,
                  left: `${randomX}%`, // Changed from right to left for better centering
                }}
              />
            );
          })}
        </div>
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
              width: "25vw",
              height: "45vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              className={classnam}
              src={require("../src/assets/ball.png")}
              alt="Cricket ball"
              style={{ width: "60%", height: "70%" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            />
            <div
              style={{
                width: "25vw",
                height: "45vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              <h1
                style={{ fontSize: 160, fontWeight: "bold", color: "yellow" }}
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
