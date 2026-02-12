import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [days, setDays] = useState([
    {
      date: 1,
      progress: { tasks: 2, deadlines: 0, tests: 0 },
      notes: "Semester kickoff! 🚀 Setup dev environment.",
    },
    {
      date: 2,
      progress: { tasks: 4, deadlines: 1, tests: 0 },
      notes: "Submitted React Intro assignment. ✅",
    },
    {
      date: 3,
      progress: { tasks: 1, deadlines: 0, tests: 1 },
      notes: "Pop Quiz: Data Structures (Scored 8/10) 🧠",
    },
    {
      date: 4,
      progress: { tasks: 5, deadlines: 2, tests: 0 },
      notes: "Productive day! Finished UI mockup & Database schema. 🎨",
    },
    {
      date: 5,
      progress: { tasks: 0, deadlines: 0, tests: 0 },
      notes: "Rest day 😴",
    },
    {
      date: 6,
      progress: { tasks: 3, deadlines: 1, tests: 1 },
      notes: "Math Mid-term (Hard!) 📉 + Physics Lab Report.",
    },
    {
      date: 7,
      progress: { tasks: 6, deadlines: 3, tests: 0 },
      notes: "CRUNCH TIME. 3 Project milestones hit. 🔥",
    },
    {
      date: 8,
      progress: { tasks: 2, deadlines: 0, tests: 0 },
      notes: "Light reading and documentation. 📖",
    },
    {
      date: 9,
      progress: { tasks: 4, deadlines: 1, tests: 1 },
      notes: "History Essay submitted. History Test: A- 📜",
    },
    {
      date: 10,
      progress: { tasks: 1, deadlines: 0, tests: 0 },
      notes: "Team meeting mostly. 🗣️",
    },
    {
      date: 11,
      progress: { tasks: 5, deadlines: 2, tests: 0 },
      notes: "Backend API integration complete. 🔗",
    },
    {
      date: 12,
      progress: { tasks: 3, deadlines: 0, tests: 2 },
      notes: "Double test day: Chemistry & English. 🧪",
    },
    {
      date: 13,
      progress: { tasks: 0, deadlines: 0, tests: 0 },
      notes: "Sick leave 🤒",
    },
    {
      date: 14,
      progress: { tasks: 7, deadlines: 4, tests: 0 },
      notes: "MONSTER DAY. Cleared entire backlog. ⚡",
    },
    {
      date: 15,
      progress: { tasks: 2, deadlines: 1, tests: 0 },
      notes: "Refactoring code. 🧹",
    },
    {
      date: 16,
      progress: { tasks: 4, deadlines: 0, tests: 1 },
      notes: "Mock Interview practice. 👔",
    },
    {
      date: 17,
      progress: { tasks: 3, deadlines: 1, tests: 0 },
      notes: "Submitted Internship Application. 🤞",
    },
    {
      date: 18,
      progress: { tasks: 5, deadlines: 2, tests: 1 },
      notes: "Algo Quiz: 100%. Debugging session. 🐛",
    },
    {
      date: 19,
      progress: { tasks: 1, deadlines: 0, tests: 0 },
      notes: "Planning phase for Final Project. 🗺️",
    },
    {
      date: 20,
      progress: { tasks: 6, deadlines: 3, tests: 0 },
      notes: "Sprint review. Demo went great! 🎉",
    },
    {
      date: 21,
      progress: { tasks: 2, deadlines: 0, tests: 0 },
      notes: "Watching tutorials. 📺",
    },
    {
      date: 22,
      progress: { tasks: 4, deadlines: 1, tests: 1 },
      notes: "Statistics Exam (Scored 92%). 📊",
    },
    {
      date: 23,
      progress: { tasks: 3, deadlines: 0, tests: 0 },
      notes: "Peer review of classmate's code. 🤝",
    },
    {
      date: 24,
      progress: { tasks: 0, deadlines: 0, tests: 0 },
      notes: "Campus festival. 🎈",
    },
    {
      date: 25,
      progress: { tasks: 8, deadlines: 5, tests: 0 },
      notes: "ALL DEADLINES MET. Group Project Done. 🏆",
    },
    {
      date: 26,
      progress: { tasks: 1, deadlines: 0, tests: 0 },
      notes: "Post-project recovery. 🛌",
    },
    {
      date: 27,
      progress: { tasks: 2, deadlines: 0, tests: 1 },
      notes: "Final Oral Presentation. 🗣️",
    },
    {
      date: 28,
      progress: { tasks: 3, deadlines: 1, tests: 0 },
      notes: "Returning library books. 📚",
    },
    {
      date: 29,
      progress: { tasks: 0, deadlines: 0, tests: 0 },
      notes: "Packing for break. 🧳",
    },
    {
      date: 30,
      progress: { tasks: 0, deadlines: 0, tests: 0 },
      notes: "End of Month Party! 🍕",
    },
  ]);
  const [showDetail, setShowDetail] = useState({
    state: false,
    focus: false,
    id: null,
  });
  return (
    <>
      <div className="container" style={containerStyle}>
        {days.length != 0 &&
          days.map((day, key) => (
            <div
              onMouseOver={() =>
                !showDetail.focus &&
                setShowDetail({ state: true, id: day.date, focus: false })
              }
              onClick={() => {
                setShowDetail((prev) => ({
                  state: false,
                  id: day.date,
                  focus: day.date == prev.id && prev.focus ? false : true,
                }));
              }}
              className="days"
              key={key}
              style={daysStyle}
            >
              {day.date}
              <div className="detailedDay">
                {showDetail.state && showDetail.id == day.date && (
                  <div className="allDetails">{day.date}</div>
                )}
                {showDetail.focus && showDetail.id == day.date && (
                  <div className="onlyDay">{day.notes}</div>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

const containerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gridColumnGap: "5%",
  gridRowGap: "5%",
};

const daysStyle = {
  background: "white",
  color: "#212121",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  aspectRatio: "1 / 1",
  padding: "0.5em",
};

export default App;
