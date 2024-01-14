import { useState } from "react";

const quizData = [
  {
    question: "Where is the correct place to insert a JavaScript?",
    options: {
      a: "The <head> section",
      b: "The <body> section",
      c: "Both the <head> and the <body> section are correct",
      d: "none of the above",
    },
    correct: "c",
  },
  {
    question: "Which language runs in a web browser?",
    options: {
      a: "Java",
      b: "C",
      c: "Python",
      d: "JavaScript",
    },
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    options: {
      a: "Central Style Sheets",
      b: "Cascading Style Sheets",
      c: "Cascading Simple Sheets",
      d: "Cars SUVs Sailboats",
    },
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    options: {
      a: "Hypertext Markup Language",
      b: "Hypertext Markdown Language",
      c: "Hyperloop Machine Language",
      d: "Helicopters Terminals Motorboats Lamborginis",
    },
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    options: {
      a: "1996",
      b: "1995",
      c: "1994",
      d: "none of the above",
    },
    correct: "b",
  },
];

export default function App() {
  const [isStarted, setIsStarted] = useState(false);

  function handleStart() {
    setIsStarted((st) => !st);
  }

  return (
    <>
      {isStarted ? (
        <Quiz questions={quizData} onRestart={handleStart} />
      ) : (
        <Start onStart={handleStart} />
      )}
    </>
  );
}

function Start({ onStart }) {
  return (
    <button className="start" onClick={onStart}>
      Start
    </button>
  );
}

function Quiz({ questions, onRestart }) {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const totalQuestions = quizData.length;
  const isQuizEnd = currentQuestionNumber > totalQuestions;
  const footerBtn =
    currentQuestionNumber === totalQuestions
      ? "Submit"
      : isQuizEnd
      ? "Restart"
      : "Next";

  function handleSelect(opt) {
    setSelectedOption(opt);
  }

  function handleFooterButtonClick() {
    if (selectedOption) {
      const question = questions[currentQuestionNumber - 1];
      setScore((score) => score + Number(selectedOption === question.correct));

      setCurrentQuestionNumber((curQuesNum) => curQuesNum + 1);
      setSelectedOption(null);
    }
  }

  return (
    <div className="quiz-container">
      <Header>
        {!isQuizEnd && `Que. ${currentQuestionNumber} of ${totalQuestions}`}
      </Header>

      {isQuizEnd ? (
        <Score score={score} totalQuestions={totalQuestions} />
      ) : (
        <Content
          question={questions[currentQuestionNumber - 1]}
          selectedOption={selectedOption}
          onSelect={handleSelect}
        />
      )}

      <Footer
        isSelected={Boolean(selectedOption)}
        onClick={footerBtn === "Restart" ? onRestart : handleFooterButtonClick}
      >
        {footerBtn}
      </Footer>
    </div>
  );
}

function Header({ children }) {
  return (
    <div className="quiz-header">
      <h2 className="header-txt">React JS Quiz</h2>
      <h3 className="header-txt">{children}</h3>
    </div>
  );
}

function Content({ question, selectedOption, onSelect }) {
  return (
    <div className="quiz-body">
      <h2>{question.question}</h2>
      <ul>
        {Object.entries(question.options).map(([opt, text]) => (
          <li
            className={opt === selectedOption ? "active" : ""}
            key={opt}
            onClick={() => onSelect(opt)}
          >
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer({ isSelected, onClick, children }) {
  return (
    <div className="quiz-footer">
      <button
        type="button"
        disabled={!isSelected && children !== "Restart"}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

function Score({ score, totalQuestions }) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="single-chart">
      <svg
        viewBox="0 0 36 36"
        className={`circular-chart ${
          percentage <= 33 ? "red" : percentage >= 80 ? "green" : "blue"
        }`}
      >
        <path
          className="circle-bg"
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle"
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="22.85" className="percentage">
          {score}/{totalQuestions}
        </text>
      </svg>
    </div>
  );
}
