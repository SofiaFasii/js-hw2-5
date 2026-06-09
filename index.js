//1

const gameBtn = document.getElementById('game-btn')
const box2 = document.querySelector('.box-2')
const scoreSuccess = document.getElementById('score-success')
const scoreError = document.getElementById('score-error')
const scoreTime = document.getElementById('score-time')
const timeFill = document.querySelector('.time-fill')
const outputWord = document.getElementById('output-word')
const enterWord = document.getElementById('enter-word')
const box3 = document.querySelector('.box-3')
const userResult = document.getElementById('user-result')


const words = [
  "cat", "dog", "sun", "sky", "pen",
  "cup", "hat", "box", "run", "red",
  "big", "toy", "map", "bed", "car",
  "apple", "water", "house", "green", "light",
  "music", "happy", "table", "chair", "phone",
  "window", "garden", "summer", "winter", "coffee",
  "school", "friend", "family", "travel", "market",
  "computer", "keyboard", "internet", "developer", "function",
  "variable", "project", "design", "creative", "learning",
  "javascript", "application", "performance", "experience", "technology"
]

let currentWord = ''
let correct = 0
let wrong = 0
let time = 30
let maxTime = 30
let timeInterval

function startGame() {
  gameBtn.style.display = 'none'
  box2.style.display = 'flex'

  correct = 0
  wrong = 0
  time = 30
  maxTime = 30

  scoreSuccess.textContent = `кількість правильних слів: ${correct}`
  scoreError.textContent = `кількість не правильних слів: ${wrong}`
  scoreTime.textContent = time

  showWord()

  enterWord.value = ''
  enterWord.focus()

  if (timeInterval) clearInterval(timeInterval)
  timeInterval = setInterval(timer, 1000)
}
function getRandomWord() {
  const index = Math.floor(Math.random() * words.length)
  return words[index]
}
function showWord() {
  currentWord = getRandomWord()
  outputWord.textContent = currentWord
}
enterWord.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkWord()
  }
})
function checkWord() {
  let inputValue = enterWord.value.trim()
  inputValue = inputValue.toLowerCase()

  if (inputValue === currentWord) {
    correct++
    time += 3
    if (time > maxTime) maxTime = time
    PNotify.success({
      text: '+3 секунди!',
      delay: 500,
      closer: false,
      sticker: false
    });
  } else {
    wrong++
    time -= 3
    PNotify.error({
      text: 'Неправильно! -3',
      delay: 500,
      closer: false,
      sticker: false
    });
  }

  scoreSuccess.textContent = `кількість правильних слів: ${correct}`
  scoreError.textContent = `кількість не правильних слів: ${wrong}`
  enterWord.value = ''
  showWord()
  updateTimeFill()
}
function timer() {
  time--
  if (time < 0) time = 0
  scoreTime.textContent = time
  updateTimeFill()
  if (time <= 0) {
    endGame()
  }
}
function updateTimeFill() {
  const percent = (time / maxTime) * 100
  timeFill.style.width = percent + '%'
  if (percent > 50) {
    timeFill.style.background = 'green'
  } else if (percent > 20) {
    timeFill.style.background = 'orange'
  } else {
    timeFill.style.background = 'red'
  }
}
function endGame() {
  clearInterval(timeInterval)
  userResult.innerHTML = `Ваші результати: <br> кількість правильних слів: ${correct} <br> кількість не правильних слів: ${wrong}`
  box2.style.display = 'none'
  box3.style.display = 'flex'
}
function restart() {
  gameBtn.style.display = 'flex'
  box3.style.display = 'none'
}

gameBtn.addEventListener('click', startGame)

//2
const canvas = document.querySelector("#sales-chart");

const chartData = {
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
  datasets: [
    {
      label: "Продажі за останній місяць",
      data: [150, 220, 180, 200, 250, 300, 280, 350, 400, 380, 420, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350],
      backgroundColor: "#2196f3",
      borderColor: "#2196f3",
      borderWidth: 1,
    },
  ],
};
const salesChart = new Chart(canvas, {
  type: "line",
  data: chartData,
});