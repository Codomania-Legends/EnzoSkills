import React, { useState, useRef } from "react";
import { useCourse } from '../../Utility/Course';
import { useNavigate } from 'react-router';
import Calender from "../../Utility/Calender";



function Assessment() {
  const { currentCourse } = useCourse();
  const navigate = useNavigate();
  const container = useRef(null);

  // Selected filter states
  const [selectedWeek, setSelectedWeek] = useState("Week 1");
  const [selectedDay, setSelectedDay] = useState(null);

  const weeksData = [
  { "Week 1": ["Day 1", "Day 2", "Day 3 Test", "Day 4", "Day 5"] },
  { "Week 2": ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5 Test"] },
  { "Week 4": ["Day 1 Test", "Day 2", "Day 3", "Day 4", "Day 5"] },
  { "Week 5": ["Day 1", "Day 2", "Day 3", "Day 4 Test", "Day 5"] }];


  const calenderWeeks = weeksData.map((week) => {
    const key = Object.keys(week)[0];
    return {
      [key]: week[key].filter((day) => day.includes("Test"))
    };
  });

  const assessmentData = [
  {
    id: 1,
    week: "Week 1",
    day: "Day 3",
    title: "Fundamentals & Core Concepts",
    timeLimit: "45 Mins",
    questions: [
      { question: "What is the virtual DOM?", options: ["A copy of actual DOM", "A CSS framework", "A database", "A testing tool"], correctAnswer: "A copy of actual DOM" },
      { question: "What is JSX?", options: ["JavaScript XML", "Java XML", "JavaScript Extension", "JSON XML"], correctAnswer: "JavaScript XML" },
      { question: "How do you pass data from a parent to a child component?", options: ["Using Context", "Using state", "Using Redux", "Using props"], correctAnswer: "Using props" },
      { question: "What is the key difference between state and props?", options: ["State is immutable, props are mutable", "Props are passed down, state is managed locally", "There is no difference", "Props can only be strings"], correctAnswer: "Props are passed down, state is managed locally" },
      { question: "Which array method is commonly used to render lists in React?", options: ["filter()", "reduce()", "map()", "forEach()"], correctAnswer: "map()" },
      { question: "What is a React component?", options: ["A reusable piece of UI", "A database table", "A CSS styling rule", "An HTML document"], correctAnswer: "A reusable piece of UI" },
      { question: "How do you write comments inside JSX code?", options: ["<!-- comment -->", "// comment", "{/* comment */}", "/* comment */"], correctAnswer: "{/* comment */}" },
      { question: "Which attribute is used to assign CSS classes in JSX?", options: ["class", "className", "css", "style"], correctAnswer: "className" },
      { question: "What must every React component return?", options: ["A string", "A JSON object", "A JSX element", "An array"], correctAnswer: "A JSX element" },
      { question: "What is Babel used for in React?", options: ["To manage state", "To transpile JSX into standard JavaScript", "To style components", "To fetch data"], correctAnswer: "To transpile JSX into standard JavaScript" }
    ]
  },
  {
    id: 2,
    week: "Week 2",
    day: "Day 5",
    title: "Intermediate Applications",
    timeLimit: "60 Mins",
    questions: [
      { question: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useMemo", "useContext"], correctAnswer: "useEffect" },
      { question: "What hook returns a memoized value?", options: ["useMemo", "useCallback", "useState", "useEffect"], correctAnswer: "useMemo" },
      { question: "How do you access a DOM node directly in a functional component?", options: ["document.getElementById", "useRef", "useState", "useEffect"], correctAnswer: "useRef" },
      { question: "What happens if you omit the dependency array in useEffect?", options: ["It runs only once", "It throws an error", "It runs after every render", "It never runs"], correctAnswer: "It runs after every render" },
      { question: "What is the primary purpose of useCallback?", options: ["To fetch data", "To return a memoized callback function", "To manage global state", "To access DOM elements"], correctAnswer: "To return a memoized callback function" },
      { question: "How does the Context API solve prop drilling?", options: ["By removing all props", "By creating a global variable", "By allowing data to be accessed deeply without passing through every level", "By using Redux automatically"], correctAnswer: "By allowing data to be accessed deeply without passing through every level" },
      { question: "What is a custom hook?", options: ["A built-in React feature", "A JavaScript function whose name starts with 'use' and calls other hooks", "A class component method", "An external library"], correctAnswer: "A JavaScript function whose name starts with 'use' and calls other hooks" },
      { question: "Can a React hook be called conditionally (inside an if-statement)?", options: ["Yes, always", "Only in class components", "No, it violates the Rules of Hooks", "Yes, but only useState"], correctAnswer: "No, it violates the Rules of Hooks" },
      { question: "Which hook would you use to share complex state logic between multiple components?", options: ["useContext", "A Custom Hook", "useReducer", "useLayoutEffect"], correctAnswer: "A Custom Hook" },
      { question: "What is the cleanup function in useEffect used for?", options: ["To format the code", "To clear memory leaks, timers, or subscriptions", "To delete the component", "To reset all state variables to zero"], correctAnswer: "To clear memory leaks, timers, or subscriptions" }
    ]
  },
  {
    id: 3,
    week: "Week 4",
    day: "Day 1",
    title: "Advanced Problem Solving",
    timeLimit: "90 Mins",
    questions: [
      { question: "What is the primary purpose of Redux?", options: ["Local database", "Global state management", "Routing", "CSS Styling"], correctAnswer: "Global state management" },
      { question: "What is a Redux reducer?", options: ["A React component", "A pure function that takes previous state and an action, returning new state", "An async API call", "A Redux DevTool feature"], correctAnswer: "A pure function that takes previous state and an action, returning new state" },
      { question: "What is a Redux action?", options: ["A plain JavaScript object with a 'type' property", "A function that mutates state", "A React hook", "A middleware"], correctAnswer: "A plain JavaScript object with a 'type' property" },
      { question: "What does the Redux Store do?", options: ["It renders UI", "It holds the complete state tree of your app", "It handles routing", "It styles components"], correctAnswer: "It holds the complete state tree of your app" },
      { question: "What is Redux Thunk used for?", options: ["To write asynchronous logic that interacts with the store", "To test Redux applications", "To optimize rendering speed", "To define reducers"], correctAnswer: "To write asynchronous logic that interacts with the store" },
      { question: "How does React Router enable navigation?", options: ["By refreshing the entire page", "By conditionally rendering components based on the URL path", "By using Redux state", "By using a backend server"], correctAnswer: "By conditionally rendering components based on the URL path" },
      { question: "What is code splitting in React?", options: ["Splitting JS files into smaller chunks to load only what is necessary", "Writing code in multiple languages", "Dividing CSS from JS", "Splitting a single component into multiple files"], correctAnswer: "Splitting JS files into smaller chunks to load only what is necessary" },
      { question: "How can you implement component lazy loading in React?", options: ["Using setTimeout", "Using React.lazy() and Suspense", "Using Redux", "Using standard import statements"], correctAnswer: "Using React.lazy() and Suspense" },
      { question: "What are Error Boundaries in React?", options: ["Components that catch JavaScript errors anywhere in their child component tree", "Try-catch blocks inside useEffect", "Redux middleware for error handling", "A CSS technique to hide broken images"], correctAnswer: "Components that catch JavaScript errors anywhere in their child component tree" },
      { question: "Which hook accesses Redux store state in functional components?", options: ["useDispatch", "useStore", "useSelector", "useContext"], correctAnswer: "useSelector" }
    ]
  },
  {
    id: 4,
    week: "Week 5",
    day: "Day 4",
    title: "Architecture & Best Practices",
    timeLimit: "60 Mins",
    questions: [
      { question: "What does JWT stand for?", options: ["Java Web Token", "JSON Web Token", "JS Web Token", "Just Web Token"], correctAnswer: "JSON Web Token" },
      { question: "How do you protect routes in a React application?", options: ["By disabling the address bar", "By creating a Higher-Order Component or a wrapper that checks authentication status", "By using HTML validation", "By storing passwords in localStorage"], correctAnswer: "By creating a Higher-Order Component or a wrapper that checks authentication status" },
      { question: "Where should you securely store a JWT on the client side?", options: ["localStorage", "sessionStorage", "HttpOnly Cookies", "Redux store"], correctAnswer: "HttpOnly Cookies" },
      { question: "What is CSRF?", options: ["Cascading Style Rules Format", "Cross-Site Request Forgery", "Client-Side Rendering Framework", "Common System Request Function"], correctAnswer: "Cross-Site Request Forgery" },
      { question: "Which library is widely considered the standard for testing React components?", options: ["React Testing Library", "Mocha", "Selenium", "Puppeteer"], correctAnswer: "React Testing Library" },
      { question: "What does SSR stand for in the context of React?", options: ["Simple State Rendering", "Server-Side Rendering", "Static Site Rendering", "Synchronous State Resolution"], correctAnswer: "Server-Side Rendering" },
      { question: "What is a primary benefit of using Next.js over standard Create React App?", options: ["It uses less memory", "Out-of-the-box support for Server-Side Rendering (SSR) and SEO", "It doesn't use JavaScript", "It compiles to WebAssembly"], correctAnswer: "Out-of-the-box support for Server-Side Rendering (SSR) and SEO" },
      { question: "How should you handle environment variables (like API keys) in a React application?", options: ["Hardcode them in the components", "Store them in a .env file and access via process.env", "Put them in a global variable in index.html", "Send them from the backend on every request"], correctAnswer: "Store them in a .env file and access via process.env" },
      { question: "What is the purpose of a Linter (like ESLint)?", options: ["To format code identically", "To statically analyze code to find problems and enforce patterns", "To transpile ES6 to ES5", "To bundle assets"], correctAnswer: "To statically analyze code to find problems and enforce patterns" },
      { question: "Why is it important to prevent unnecessary re-renders in a large React application?", options: ["To save bandwidth", "To improve application performance and responsiveness", "To prevent security vulnerabilities", "Because React crashes if it renders too much"], correctAnswer: "To improve application performance and responsiveness" }
    ]
  }];


  // Logic to filter assessments when you click the calendar
  const filteredAssessments = assessmentData.filter((test) => {
    if (!selectedDay) return false; // Hide all until a day is clicked
    const cleanDay = selectedDay.replace(" Test", "");
    return test.week === selectedWeek && test.day === cleanDay;
  });

  const handleDaySelect = (weekName, dayName) => {
    setSelectedWeek(weekName);
    setSelectedDay(dayName);
  };

  const courseId = currentCourse?.course_id || currentCourse?.id;
  const completedTests = JSON.parse(localStorage.getItem('completed_assessments') || '{}')[courseId] || [];

  return (
    <div ref={container} className="w-full h-[90vh] p-5">
      <div className="w-full h-[5vh] flex items-center justify-start gap-[10px] text-[25px] mb-[30px] cursor-pointer" onClick={() => navigate(`/dashboard/courses/overview/${courseId}`)}>
        <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-6 w-6" />
        <b>{currentCourse?.course_name || "Loading..."}</b>
      </div>

      {/* Flex container holding Calendar on Left and Assessments on Right */}
      <div className="w-full flex gap-10">

        {/* Left Side: Calendar (20% width) */}
        <div className="w-[20%]">
          <Calender Weeks={calenderWeeks} onDaySelect={handleDaySelect} />
        </div>

        {/* Right Side: Assessment Details (80% width) */}
        <div className="w-[80%] flex flex-col gap-6 max-h-[70vh] h-full overflow-visible pr-4 custom-scrollbar justify-between items-center">

          {filteredAssessments.length > 0 ?
          filteredAssessments.map((assessment, index) => {
            const isCompleted = completedTests.includes(assessment.id);

            return (
              <div key={index} className={`w-full bg-white rounded-3xl p-6 flex items-center justify-between medium-box-shadow white border-2 ${isCompleted ? 'border-green-400' : 'border-transparent'}`}>
                  <div className="w-[12%] h-[15vh] rounded-[15px] bg-[#d6d8ff] flex flex-col items-center justify-center font-bold text-gray-700 relative overflow-hidden">
                    {isCompleted && <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] px-2 py-1 rounded-bl-lg">DONE</div>}
                    <span>{assessment.week}</span>
                    <span>{assessment.day}</span>
                  </div>

                  <div className="w-[75%] flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2">Test {assessment.id} : {currentCourse?.course_name || "Assessment"} - {assessment.title}</h2>

                    <div className="flex gap-6 mb-4 text-sm font-semibold text-gray-600">
                      <span className="flex items-center gap-2">
                        <i className="fa-regular fa-clock"></i> Time: {assessment.timeLimit}
                      </span>
                      <span className="flex items-center gap-2">
                        <i className="fa-solid fa-list-check"></i> Questions: {assessment.questions.length}
                      </span>
                    </div>

                    <div className="flex gap-4">
                      <button className="px-6 py-2 border-none rounded-xl bg-[#5ae45a] text-white font-bold small-box-shadow green hover:opacity-90">
                        Learn for Test
                      </button>
                      {isCompleted ?
                    <button
                      className="px-6 py-2 border-none rounded-xl bg-gray-200 text-gray-600 font-bold small-box-shadow cursor-default">
                      
                          Completed ✅
                        </button> :

                    <button
                      className="px-6 py-2 border-none rounded-xl bg-[#6c72ff] text-white font-bold small-box-shadow blue hover:opacity-90"
                      onClick={() => navigate(`/dashboard/courses/assessment/topic/${courseId}`, { state: { assessment } })}>
                      
                          Start Test
                        </button>
                    }
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button className="h-12 w-12 border-none rounded-full bg-[#7a7cff] text-white shadow-md hover:scale-105 transition-transform flex items-center justify-center small-box-shadow blue">
                      <i className="fa-solid fa-angles-right"></i>
                    </button>
                  </div>
                </div>);

          }) :
          !selectedDay ?
          <div className="w-full bg-white rounded-3xl p-10 flex items-center justify-center medium-box-shadow white text-gray-500 font-bold text-xl">
              Please select a test from the calendar to view details 📅
            </div> :

          <div className="w-full bg-white rounded-3xl p-10 flex items-center justify-center medium-box-shadow white text-gray-500 font-bold text-xl">
              No assessments scheduled for {selectedWeek} - {selectedDay} 📭
            </div>
          }

          {/* Restored the original mt-10 style for your motivational text box! */}
          <div className="w-full mt-10 flex justify-between items-center bg-white p-8 rounded-3xl medium-box-shadow white mb-10">
            <div className="finalBox">
              <button className="border-none py-4 px-8 rounded-2xl bg-[#4e53e6] text-white font-bold shadow-md hover:bg-blue-600 transition-colors small-box-shadow blue">
                Final Assessment 🏆
              </button>
            </div>

            <div className="text-right border-r-4 border-[#6c72ff] pr-6">
              <h2 className="text-xl text-gray-600 font-semibold">
                Test is about to challenge how much you have learned.
              </h2>
              <h1 className="text-4xl font-black mt-2 text-gray-800 tracking-wider">
                NOT
              </h1>
              <h2 className="text-xl text-gray-600 font-semibold mt-1">
                to judge your FUTURE.
              </h2>
            </div>
          </div>

        </div>
      </div>
    </div>);

}

export default Assessment;