import React, { useState, useEffect } from 'react';


import { useLocation, useNavigate } from 'react-router';

function TopicAssessment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Read the assessment data passed from Assessment.jsx
  const assessmentData = location.state?.assessment || {
    title: "Default Test",
    timeLimit: "30 Mins",
    questions: [
    { question: "No questions provided.", options: ["A", "B", "C", "D"], correctAnswer: "A" }]

  };

  const questions = assessmentData.questions;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const container = React.useRef(null);





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

    const courseId = location.pathname.split('/').pop();

    // Connect to Backend
    try {
      await fetch('http://localhost:3000/course/assessment/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_id: courseId,
          assessment_id: assessmentData.id,
          score: score
        })
      });
      console.log("Score synced with backend!");
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
          assessmentTitle: assessmentData.title || "Topic Assessment"
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
            <h1 className="text-2xl h-[10%] font-bold">Topic Assessment</h1>
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
                        </button>);

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
                            <h1 className="text-3xl font-[900]">Topic Assessment</h1>
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
                                    </div>);

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
    </div>);

}

export default TopicAssessment;