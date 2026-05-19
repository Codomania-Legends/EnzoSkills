import React from "react";
import "./Records.css";

function Card(props) {
  return (
    <div className="boxes">
      <div className="top">
        <span className="day">
          <b>
            {props.day} <br />
            {props.course}
          </b>
        </span>

        <i className="fa-solid fa-bars"></i>
      </div>

      <div className="line"></div>

      <div className="taskSection">
        <span className="tasks">
          <i
            className="fa-solid fa-check"
            style={{ color: "rgb(0, 139, 2)" }}
          ></i>
          5/6 Tasks
        </span>

        <span className="badges">
          <img className="badgeImg" src={props.badgeImage} />
          <b>{props.badge}</b>
        </span>
      </div>

      <div className="level">
        <div className="levels"></div>
      </div>

      <div className="scoreSection">
        <span className="score">
          <i className="fa-regular fa-calendar"></i> Score
        </span>

        <span className="percent">82%</span>
      </div>

      <div className="star">
        <img id="star" src="/Records/star.svg" />
        <img id="star" src="/Records/star.svg" />
        <img id="star" src="/Records/star.svg" />
        <img id="star" src="/Records/star.svg" />
        <img id="star" src="/Records/star.svg" />

        <b>4.0</b>
      </div>

      <span className="review">Review: Good understanding</span>
    </div>
  );
}

function Records() {
  const data = [
    {
      day: "Day 1",
      course: "C/C++",
      badge: "Silver",
      badgeImage: "/Records/silver.png",
    },

    {
      day: "Day 2",
      course: "JavaScript",
      badge: "Silver",
      badgeImage: "/Records/silver.png",
    },

    {
      day: "Day 3",
      course: "Java (Core+Advance)",
      badge: "Gold",
      badgeImage: "/Records/gold.png",
    },

    {
      day: "Day 4",
      course: "Node js",
      badge: "Gold",
      badgeImage: "/Records/gold.png",
    },

    {
      day: "Day 5",
      course: "React js",
      badge: "Bronze",
      badgeImage: "/Records/bronze.png",
    },

    {
      day: "Day 6",
      course: "Web Development",
      badge: "Bronze",
      badgeImage: "/Records/bronze.png",
    },

    {
      day: "Day 7",
      course: "Database Management",
      badge: "Silver",
      badgeImage: "/Records/silver.png",
    },

    {
      day: "Weekly",
      course: "Assessment",
      badge: "Silver",
      badgeImage: "/Records/silver.png",
    },
  ];

  return (
    <>
      <div className="re">
        <span id="history">
          <i className="fa-solid fa-arrow-left" id="arrow"></i>
          <b>History</b>
        </span>

        <div className="record">
          {data.map((item, index) => (
            <Card
              key={index}
              day={item.day}
              course={item.course}
              badge={item.badge}
              badgeImage={item.badgeImage}
            />
          ))}
        </div>

        <div className="records">
          <span id="reward">
            <b>Recent Achievement</b>
          </span>

          <img className="image" src="/Records/badges.png" />

          <img id="image" src="/Records/java.png" />

          <b id="earned">You earned the Gold Badge in JavaScript</b>

          <p id="key">Consistency is the key!</p>

          <p id="view">View all accomplishments</p>
        </div>

        <div id="many">
          <button>
            <i
              className="fa-solid fa-angles-down"
              style={{ color: "white" }}
            ></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Records;