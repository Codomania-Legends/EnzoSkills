import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useCourse } from '../../../Utility/Course';

const finalQuestionsMap = {
  "1": {
    id: "final",
    title: "Advanced CSS & Tailwind Final Exam",
    timeLimit: "45 Mins",
    questions: [
      { question: "Which CSS property is used to align items along the main axis in a Flexbox container?", options: ["align-items", "justify-content", "align-content", "justify-items"], correctAnswer: "justify-content" },
      { question: "In CSS Grid, which property specifies the size of grid columns?", options: ["grid-column-gap", "grid-template-columns", "grid-auto-columns", "grid-column-template"], correctAnswer: "grid-template-columns" },
      { question: "What does Tailwind CSS's utility class 'flex-1' do?", options: ["Sets flex grow, shrink, and basis", "Sets width to 100%", "Sets flex-direction to row", "Aligns items to the start"], correctAnswer: "Sets flex grow, shrink, and basis" },
      { question: "Which CSS selector has the highest specificity?", options: ["Class selector (.class)", "Element selector (div)", "ID selector (#id)", "Attribute selector ([type='text'])"], correctAnswer: "ID selector (#id)" },
      { question: "What does the 'box-sizing: border-box' property do?", options: ["Includes padding and border in the element's total width and height", "Excludes padding and border from width and height", "Draws a border around the element", "Hides the content overflow"], correctAnswer: "Includes padding and border in the element's total width and height" },
      { question: "What is the Tailwind utility for 'position: absolute'?", options: ["pos-abs", "absolute", "position-absolute", "abs"], correctAnswer: "absolute" },
      { question: "How does CSS custom properties (variables) syntax look like?", options: ["$my-var", "var-my-var", "--my-var", "@my-var"], correctAnswer: "--my-var" },
      { question: "In grid layout, what does 'grid-area: 1 / 2 / 3 / 4' mean?", options: ["grid-row-start / grid-column-start / grid-row-end / grid-column-end", "grid-row-end / grid-column-end / grid-row-start / grid-column-start", "grid-column-start / grid-row-start / grid-column-end / grid-row-end", "grid-margin / grid-padding / grid-border / grid-outline"], correctAnswer: "grid-row-start / grid-column-start / grid-row-end / grid-column-end" },
      { question: "What is the correct Tailwind class for a responsive element visible on medium screens and larger?", options: ["sm:block", "md:block", "lg:block", "xl:block"], correctAnswer: "md:block" },
      { question: "Which CSS display property creates a grid container?", options: ["display: grid-layout", "display: grid", "display: grid-box", "display: grid-flex"], correctAnswer: "display: grid" },
      { question: "Which pseudo-class is used to style an element when focused?", options: [":hover", ":active", ":focus", ":visited"], correctAnswer: ":focus" },
      { question: "What does z-index control in CSS?", options: ["Horizontal positioning", "Vertical positioning", "Stack order of positioned elements", "Font sizing"], correctAnswer: "Stack order of positioned elements" },
      { question: "What is the Tailwind class for adding horizontal padding?", options: ["py-x", "px-x", "padding-x", "pl-x"], correctAnswer: "px-x" },
      { question: "Which layout technique is best suited for 1-dimensional layouts?", options: ["CSS Grid", "Flexbox", "Floats", "Absolute positioning"], correctAnswer: "Flexbox" },
      { question: "What does the CSS property 'object-fit: cover' do?", options: ["Stretches the image to fill", "Resizes the content to fit its container while maintaining aspect ratio, cropping if needed", "Shrinks the image", "Repeats the image pattern"], correctAnswer: "Resizes the content to fit its container while maintaining aspect ratio, cropping if needed" }
    ]
  },
  "2": {
    id: "final",
    title: "React.js Front-End Mastery Final Exam",
    timeLimit: "45 Mins",
    questions: [
      { question: "What is the main purpose of the virtual DOM in React?", options: ["A complete copy of the browser's DOM", "To optimize UI updates by minimizing direct manipulation of the browser DOM", "A backend database", "A CSS framework"], correctAnswer: "To optimize UI updates by minimizing direct manipulation of the browser DOM" },
      { question: "Which hook should be used to memoize a computationally expensive function's return value?", options: ["useCallback", "useMemo", "useRef", "useEffect"], correctAnswer: "useMemo" },
      { question: "What is the correct way to handle side effects in functional React components?", options: ["useState", "useContext", "useEffect", "useReducer"], correctAnswer: "useEffect" },
      { question: "Which React hook is used to access values from a Context?", options: ["useState", "useContext", "useReducer", "useCallback"], correctAnswer: "useContext" },
      { question: "What happens when a component's state updates?", options: ["Nothing happens", "The component and its children re-render", "The entire page refreshes", "The backend is notified"], correctAnswer: "The component and its children re-render" },
      { question: "Why is a 'key' prop required when rendering lists of elements?", options: ["To define inline styles", "To help React identify which items have changed, been added, or removed", "To pass props to children", "To cache the elements"], correctAnswer: "To help React identify which items have changed, been added, or removed" },
      { question: "What does the 'useCallback' hook return?", options: ["A memoized value", "A memoized version of the callback function", "A new state variable", "A reference to a DOM node"], correctAnswer: "A memoized version of the callback function" },
      { question: "How can you lazily load a React component?", options: ["Using setTimeout", "Using React.lazy() and Suspense", "Using Redux", "Using normal imports"], correctAnswer: "Using React.lazy() and Suspense" },
      { question: "What is the primary purpose of Redux or Context API?", options: ["Routing", "Styling", "Global state management", "API testing"], correctAnswer: "Global state management" },
      { question: "Which function is used to update state in class components?", options: ["updateState", "changeState", "setState", "set"], correctAnswer: "setState" },
      { question: "In React Router, which hook is used to get the dynamic parameters from the URL?", options: ["useLocation", "useParams", "useNavigate", "useRoutes"], correctAnswer: "useParams" },
      { question: "Which hook is a suitable alternative to 'useState' for managing complex state objects?", options: ["useReducer", "useRef", "useMemo", "useContext"], correctAnswer: "useReducer" },
      { question: "What are controlled components in React?", options: ["Components that control other components", "Components strictly wrapped in error boundaries", "Components whose value is controlled by React state", "Components managed by the DOM"], correctAnswer: "Components whose value is controlled by React state" },
      { question: "What does 'React.memo' do?", options: ["Memoizes the whole application", "Memoizes a component to prevent unnecessary re-renders if props don't change", "Memoizes a state variable", "Caches API responses"], correctAnswer: "Memoizes a component to prevent unnecessary re-renders if props don't change" },
      { question: "Which lifecycle method corresponds to 'useEffect' with an empty dependency array?", options: ["componentWillMount", "componentDidMount", "componentDidUpdate", "componentWillUnmount"], correctAnswer: "componentDidMount" }
    ]
  },
  "3": {
    id: "final",
    title: "Node.js & Express Backend Final Exam",
    timeLimit: "45 Mins",
    questions: [
      { question: "What is Node.js?", options: ["A frontend JS library", "A database engine", "A JavaScript runtime built on Chrome's V8 engine", "A CSS compiler"], correctAnswer: "A JavaScript runtime built on Chrome's V8 engine" },
      { question: "What does the Express 'app.use()' method do?", options: ["Sets up connection to MongoDB", "Registers middleware functions", "Renders HTML templates", "Starts the server listener"], correctAnswer: "Registers middleware functions" },
      { question: "What is the purpose of the Node.js event loop?", options: ["To run synchronous tasks synchronously", "To handle asynchronous callbacks non-blockingly", "To connect to external databases", "To handle CSS compression"], correctAnswer: "To handle asynchronous callbacks non-blockingly" },
      { question: "Which HTTP method is typically used to create a new resource?", options: ["GET", "PUT", "DELETE", "POST"], correctAnswer: "POST" },
      { question: "What does JWT stand for in backend authentication?", options: ["Java Web Token", "JSON Web Token", "JS Web Token", "Just Web Token"], correctAnswer: "JSON Web Token" },
      { question: "How do you access path parameters in Express routing (e.g. '/users/:id')?", options: ["req.body.id", "req.query.id", "req.params.id", "req.headers.id"], correctAnswer: "req.params.id" },
      { question: "What is CORS in web API development?", options: ["Cross-Origin Resource Sharing", "Common Object Routing System", "Client-side Object Rendering Schema", "Compiled Object Resource Syncing"], correctAnswer: "Cross-Origin Resource Sharing" },
      { question: "Which Node.js module is used to handle file system operations?", options: ["path", "fs", "http", "os"], correctAnswer: "fs" },
      { question: "What is a 'middleware' function in Express?", options: ["A route handler for the backend database", "A function that has access to request, response, and the next middleware function", "A package manager configuration", "A frontend React helper"], correctAnswer: "A function that has access to request, response, and the next middleware function" },
      { question: "Which status code represents a successful resource creation?", options: ["200 OK", "201 Created", "204 No Content", "302 Found"], correctAnswer: "201 Created" },
      { question: "What is the purpose of 'npm' or 'yarn'?", options: ["Database caching", "Package management", "Styling web elements", "Testing APIs"], correctAnswer: "Package management" },
      { question: "How do you handle asynchronous errors in Express?", options: ["By wrapping them in try-catch and passing the error to the next() function", "By crashing the server", "Using alert() box", "Express handles async errors automatically without any code changes"], correctAnswer: "By wrapping them in try-catch and passing the error to the next() function" },
      { question: "Which header is commonly used to send JWT tokens to the server?", options: ["Authentication", "Authorization", "Access-Token", "Bearer-Token"], correctAnswer: "Authorization" },
      { question: "What is the default port range for local development in Node.js?", options: ["There is no default, but developer-defined ports are usually 3000-8000", "Strictly port 80", "Strictly port 443", "Always port 27017"], correctAnswer: "There is no default, but developer-defined ports are usually 3000-8000" },
      { question: "Which HTTP status code represents 'Unauthorized' access?", options: ["400 Bad Request", "401 Unauthorized", "403 Forbidden", "404 Not Found"], correctAnswer: "401 Unauthorized" }
    ]
  },
  "4": {
    id: "final",
    title: "Database Design with MongoDB Final Exam",
    timeLimit: "45 Mins",
    questions: [
      { question: "What is MongoDB?", options: ["A relational SQL database", "A document-oriented NoSQL database", "A spreadsheet server", "A vector drawing tool"], correctAnswer: "A document-oriented NoSQL database" },
      { question: "What format does MongoDB use to store documents?", options: ["JSON", "XML", "BSON", "YAML"], correctAnswer: "BSON" },
      { question: "In MongoDB, what is the equivalent of a row in a relational database?", options: ["A collection", "A field", "A document", "An index"], correctAnswer: "A document" },
      { question: "What is Mongoose?", options: ["An Object Data Modeling library for MongoDB and Node.js", "A relational database manager", "A security framework", "A template engine"], correctAnswer: "An Object Data Modeling library for MongoDB and Node.js" },
      { question: "Which query operator is used to match values greater than a specified value?", options: ["$gte", "$gt", "$lt", "$ne"], correctAnswer: "$gt" },
      { question: "What is the purpose of indexing in MongoDB?", options: ["To secure connection to the database", "To improve query performance and execution speed", "To encrypt user passwords", "To automatically sync collections"], correctAnswer: "To improve query performance and execution speed" },
      { question: "What does the MongoDB Aggregation Pipeline do?", options: ["Manages user authentication", "Processes documents sequentially through multiple filtering, grouping, and transforming stages", "Connects different MongoDB servers", "Optimizes static image routes"], correctAnswer: "Processes documents sequentially through multiple filtering, grouping, and transforming stages" },
      { question: "In MongoDB, what is the default primary key field name?", options: ["id", "uid", "_id", "mongodb_id"], correctAnswer: "_id" },
      { question: "Which method is used to add a new document in MongoDB/Mongoose?", options: ["insertOne or create/save", "add()", "insertRow()", "push()"], correctAnswer: "insertOne or create/save" },
      { question: "What does '$lookup' do in an aggregation pipeline?", options: ["Finds the database size", "Performs a left outer join to a collection in the same database", "Finds the execution time", "Deletes redundant indexes"], correctAnswer: "Performs a left outer join to a collection in the same database" },
      { question: "What is a collection in MongoDB?", options: ["A single database row", "A grouping of MongoDB documents, equivalent to a table", "A list of database indexes", "A server configuration file"], correctAnswer: "A grouping of MongoDB documents, equivalent to a table" },
      { question: "What does the 'unique' validation option in Mongoose do?", options: ["Restricts the value to strings only", "Ensures no two documents have the same value for that field by creating a unique index", "Makes the field required", "Converts the value to uppercase"], correctAnswer: "Ensures no two documents have the same value for that field by creating a unique index" },
      { question: "How do you specify that a field is required in a Mongoose schema?", options: ["{ type: String, required: true }", "{ type: String, validate: 'required' }", "{ type: String, notNull: true }", "{ type: String, essential: true }"], correctAnswer: "{ type: String, required: true }" },
      { question: "Which command is used to delete a single document in Mongoose?", options: ["drop()", "deleteOne or findOneAndDelete", "clear()", "removeTable()"], correctAnswer: "deleteOne or findOneAndDelete" },
      { question: "What is the difference between SQL and NoSQL databases?", options: ["SQL is relational with fixed schemas, NoSQL is non-relational with dynamic schemas", "SQL databases are cloud-only, NoSQL databases are local-only", "NoSQL does not support query filtering", "SQL is faster in all scenarios"], correctAnswer: "SQL is relational with fixed schemas, NoSQL is non-relational with dynamic schemas" }
    ]
  }
};

const defaultFinalQuestions = {
  id: "final",
  title: "Comprehensive Web Development Final Exam",
  timeLimit: "60 Mins",
  questions: [
    { question: "Which HTML5 element is used to define semantic navigation links?", options: ["<nav>", "<navigation>", "<links>", "<bar>"], correctAnswer: "<nav>" },
    { question: "What does HTTP stand for?", options: ["Hypertext Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Text Processor", "Hypertext Translation Protocol"], correctAnswer: "Hypertext Transfer Protocol" },
    { question: "Which CSS property is used to change the background color?", options: ["color", "background-color", "bgcolor", "background"], correctAnswer: "background-color" },
    { question: "Which JavaScript method is used to write messages to the browser console?", options: ["console.print()", "console.log()", "console.write()", "print()"], correctAnswer: "console.log()" },
    { question: "Which status code represents 'Page Not Found'?", options: ["200", "301", "404", "500"], correctAnswer: "404" },
    { question: "What is the correct syntax for referencing an external script called 'script.js'?", options: ["<script href='script.js'>", "<script name='script.js'>", "<script src='script.js'>", "<script link='script.js'>"], correctAnswer: "<script src='script.js'>" },
    { question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?", options: ["title", "alt", "src", "longdesc"], correctAnswer: "alt" },
    { question: "What is the correct way to declare a constant variable in modern JavaScript?", options: ["var", "let", "const", "constant"], correctAnswer: "const" },
    { question: "What does API stand for?", options: ["Application Programming Interface", "Application Process Integration", "App Protocol Interface", "Automated Program Interaction"], correctAnswer: "Application Programming Interface" },
    { question: "Which symbol is used for comments in CSS?", options: ["// comment", "/* comment */", "<!-- comment -->", "# comment"], correctAnswer: "/* comment */" }
  ]
};

function FinalAssessment() {
  const { currentCourse } = useCourse();
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const container = useRef(null);

  // Retrieve matching questions or default to fallback
  const assessmentData = finalQuestionsMap[String(courseId)] || defaultFinalQuestions;
  const questions = assessmentData.questions;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCircleClick = (index) => {
    if (!isSubmitted) setCurrentQIndex(index);
  };

  const handleOptionSelect = (option) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQIndex]: option
    }));
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const handleSubmitTest = async () => {
    setIsSubmitted(true);

    // Calculate Score
    let score = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        score++;
      }
    });

    // Connect to Backend
    try {
      await fetch('http://localhost:3000/courses/assessment/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_id: courseId,
          assessment_id: assessmentData.id,
          score: score
        })
      });
      console.log("Final Assessment score synced with backend!");
    } catch (error) {
      console.error("Failed to sync score to backend", error);
    }

    // Mark as complete in localStorage for instant UI feedback
    const completedTests = JSON.parse(localStorage.getItem('completed_assessments') || '{}');
    if (!completedTests[courseId]) completedTests[courseId] = [];
    if (!completedTests[courseId].includes(assessmentData.id)) {
      completedTests[courseId].push(assessmentData.id);
    }
    localStorage.setItem('completed_assessments', JSON.stringify(completedTests));

    // Wait 1.5 second (faster), then navigate to scorecard and pass data
    setTimeout(() => {
      navigate(`/dashboard/courses/scorecard/${courseId}`, {
        state: {
          score,
          total: questions.length,
          assessmentTitle: assessmentData.title || "Final Assessment"
        }
      });
    }, 1500);
  };

  const currentQ = questions[currentQIndex];
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div ref={container} className="container h-full mx-auto px-4 mt-5">
      <div className="flex justify-start gap-2 items-center w-2/10 mb-5 cursor-pointer" onClick={() => navigate(-1)}>
        <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4" />
        <h1 className="text-2xl h-[10%] font-bold">Final Assessment</h1>
      </div>
      <div className="flex h-[90%] justify-between relative items-center gap-10">
        {/* Left Nav Pane */}
        <div className="flex h-[90%] small-box-shadow rounded-[2em] white w-[25%] justify-center items-start overflow-y-auto custom-scrollbar">
          <div className='w-full grid grid-cols-5 gap-4 py-8 px-8'>
            {questions.map((_, index) => {
              const isAnswered = selectedAnswers[index] !== undefined;
              return (
                <button
                  key={index}
                  onClick={() => handleCircleClick(index)}
                  className={`w-10 h-10 rounded-full cursor-pointer transition-transform duration-150 active:scale-95 flex items-center justify-center font-bold text-sm ${currentQIndex === index ? 'text-white' : isAnswered ? 'text-white' : 'text-gray-700'}`}
                  style={{
                    background: currentQIndex === index ? '#534DB4' : isAnswered ? '#22993b' : 'radial-gradient(circle at 35% 35%, #ffffff 0%, #e2e8f0 70%, #94a3b8 100%)',
                    boxShadow: `
                                    5px 5px 20px 0px rgba(58, 62, 108, 0.25),
                                    inset 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
                                    inset -5px -5px 10px 0px rgba(58, 62, 108, 0.6)
                                `
                  }}>
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Question Pane */}
        <div className="flex h-full w-[70%] justify-center items-center">
          <div className="test-container w-full h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between font-bold mb-5">
                <div className="flex items-center text-lg">{assessmentData.title}</div>
                <div className="flex items-center text-red-500 gap-2"><i className="fa-regular fa-clock"></i> {assessmentData.timeLimit}</div>
              </div>
              <div className="test-heading font-[Syne] flex justify-center items-center mb-5">
                <h1 className="text-3xl font-[900]">Final Assessment</h1>
              </div>
            </div>

            <div className="flex justify-center flex-col items-center w-full flex-grow">
              {/* Question Box */}
              <div className="question-container mb-8 relative w-full flex justify-center">
                <div className="question-number small-box-shadow white w-12 h-12 rounded-full flex items-center justify-center font-bold text-black text-xl shrink-0 absolute -left-4 top-1/2 -translate-y-1/2 z-40">
                  {currentQIndex + 1}
                </div>
                <div className="flex items-center small-box-shadow rounded-[2em] blue text-white px-8 py-8 w-[90%] relative ">
                  <p className="font-semibold text-xl pl-6">{currentQ?.question}</p>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 w-full px-12">
                {currentQ?.options?.map((opt, i) => {
                  const isSelected = selectedAnswers[currentQIndex] === opt;
                  const isCorrect = opt === currentQ.correctAnswer;

                  let buttonClass = "white border-gray-200 text-black";
                  let iconClass = "white text-black";

                  if (!isSubmitted) {
                    if (isSelected) {
                      buttonClass = "blue text-white font-bold border-blue-500 scale-105";
                      iconClass = "blue text-white";
                    }
                  } else {
                    if (isCorrect) {
                      buttonClass = "green text-white font-bold border-green-500 scale-105";
                      iconClass = "green text-white";
                    } else if (isSelected && !isCorrect) {
                      buttonClass = "red text-white font-bold border-red-500 scale-105";
                      iconClass = "red text-white";
                    } else {
                      buttonClass = "white border-gray-200 text-black opacity-50";
                      iconClass = "white text-black opacity-50";
                    }
                  }

                  return (
                    <div key={i} className="flex justify-center items-center relative pt-4 cursor-pointer" onClick={() => handleOptionSelect(opt)}>
                      <div className={`w-12 h-12 rounded-full small-box-shadow ${iconClass} flex items-center justify-center font-bold absolute top-[30%] left-[-1%] left-1/2 -translate-x-1/2 z-10 text-lg transition-all`}>
                        {letters[i]}
                      </div>
                      <button className={`w-[80%] small-box-shadow ${buttonClass} font-medium py-6 px-6 rounded-[2em] border-b-4 text-center active:scale-95 transition-all duration-200`}>
                        <span>{opt}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="w-full flex justify-between items-center px-12 pb-8">
              <button
                onClick={handlePrev}
                disabled={currentQIndex === 0 || isSubmitted}
                className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 active:scale-95 small-box-shadow ${currentQIndex === 0 || isSubmitted ? 'bg-gray-300 opacity-50 cursor-not-allowed' : 'gray'}`}>
                <svg className="w-6 h-6 stroke-[3] text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
              </button>

              {currentQIndex === questions.length - 1 ?
                <button
                  onClick={handleSubmitTest}
                  disabled={isSubmitted}
                  className={`px-8 py-3 rounded-2xl font-bold text-white small-box-shadow transition-transform ${isSubmitted ? 'gray opacity-50 cursor-not-allowed' : 'green hover:opacity-90 active:scale-95'}`}>
                  {isSubmitted ? 'Evaluating...' : 'Submit Test ✅'}
                </button> :
                <button
                  onClick={handleNext}
                  disabled={isSubmitted}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-150 active:scale-95 small-box-shadow ${isSubmitted ? 'bg-gray-300 opacity-50 cursor-not-allowed' : 'blue'}`}>
                  <svg className="w-6 h-6 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalAssessment;