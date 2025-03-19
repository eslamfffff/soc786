
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which country won the 2022 FIFA World Cup?",
    options: ["France", "Brazil", "Argentina", "Germany"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Who holds the record for most goals in a single calendar year?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Pelé", "Robert Lewandowski"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Which player scored the 'Hand of God' goal?",
    options: ["Diego Maradona", "Pelé", "Zinedine Zidane", "Ronaldo"],
    correctAnswer: 0
  },
  {
    id: 4,
    question: "Which club has won the most UEFA Champions League titles?",
    options: ["Barcelona", "Bayern Munich", "Liverpool", "Real Madrid"],
    correctAnswer: 3
  },
  {
    id: 5,
    question: "Who is the all-time top scorer in World Cup history?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Miroslav Klose", "Gerd Müller"],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Which country has won the most FIFA World Cup titles?",
    options: ["Germany", "Italy", "Argentina", "Brazil"],
    correctAnswer: 3
  },
  {
    id: 7,
    question: "Which player has won the most Ballon d'Or awards?",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Michel Platini", "Johan Cruyff"],
    correctAnswer: 1
  },
  {
    id: 8,
    question: "In which year was the first World Cup held?",
    options: ["1926", "1930", "1934", "1938"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "Which team is known as 'The Red Devils'?",
    options: ["Liverpool", "Manchester United", "Arsenal", "Bayern Munich"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "Who is the manager who has won the most Premier League titles?",
    options: ["José Mourinho", "Arsène Wenger", "Pep Guardiola", "Sir Alex Ferguson"],
    correctAnswer: 3
  },
  {
    id: 11,
    question: "Which player scored the fastest hat-trick in Premier League history?",
    options: ["Sergio Agüero", "Sadio Mané", "Alan Shearer", "Robbie Fowler"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "Which club did Pep Guardiola manage before joining Manchester City?",
    options: ["Barcelona", "Bayern Munich", "Real Madrid", "Juventus"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "Who was the first player to score 100 Premier League goals?",
    options: ["Alan Shearer", "Wayne Rooney", "Thierry Henry", "Michael Owen"],
    correctAnswer: 0
  },
  {
    id: 14,
    question: "Which country won the first ever FIFA World Cup?",
    options: ["Brazil", "Uruguay", "Italy", "Argentina"],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "Which player is known as 'The Egyptian King'?",
    options: ["Sadio Mané", "Mohamed Salah", "Riyad Mahrez", "Pierre-Emerick Aubameyang"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "Which stadium is known as 'The Theatre of Dreams'?",
    options: ["Old Trafford", "Anfield", "Camp Nou", "Santiago Bernabéu"],
    correctAnswer: 0
  },
  {
    id: 17,
    question: "Who scored the winning goal in the 2014 World Cup final?",
    options: ["Lionel Messi", "Thomas Müller", "Mario Götze", "Miroslav Klose"],
    correctAnswer: 2
  },
  {
    id: 18,
    question: "Which club has won the most English Premier League titles?",
    options: ["Chelsea", "Manchester City", "Liverpool", "Manchester United"],
    correctAnswer: 3
  },
  {
    id: 19,
    question: "Which player has scored the most goals in a single Premier League season (38 games)?",
    options: ["Cristiano Ronaldo", "Alan Shearer", "Mohamed Salah", "Luis Suárez"],
    correctAnswer: 2
  },
  {
    id: 20,
    question: "Which country won the UEFA Euro 2020 (played in 2021)?",
    options: ["England", "Italy", "Spain", "France"],
    correctAnswer: 1
  },
  {
    id: 21,
    question: "Who is the youngest player to score in a World Cup?",
    options: ["Pelé", "Kylian Mbappé", "Michael Owen", "Lionel Messi"],
    correctAnswer: 0
  },
  {
    id: 22,
    question: "Which player has the most assists in Premier League history?",
    options: ["Ryan Giggs", "Frank Lampard", "Cesc Fàbregas", "Kevin De Bruyne"],
    correctAnswer: 0
  },
  {
    id: 23,
    question: "Which team has never been relegated from the Premier League since its formation in 1992?",
    options: ["Manchester United", "Arsenal", "Chelsea", "Liverpool"],
    correctAnswer: 0
  },
  {
    id: 24,
    question: "Who is the only player to have won the Champions League with three different clubs?",
    options: ["Cristiano Ronaldo", "Clarence Seedorf", "Zlatan Ibrahimović", "Thierry Henry"],
    correctAnswer: 1
  },
  {
    id: 25,
    question: "Which footballer has the most Instagram followers?",
    options: ["Lionel Messi", "Neymar Jr.", "Cristiano Ronaldo", "David Beckham"],
    correctAnswer: 2
  }
];

export default questions;
