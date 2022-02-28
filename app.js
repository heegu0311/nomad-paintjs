// 제어할 DOM 객체 받아오기
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

// 반복 사용되는 상수값 설정
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 초기 캔버스 2D 컨텍스트의 배경 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 초기 캔버스 stroke 설정
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// 초기 캔버스 모드 설정
let painting = false;
let filling = false;

// 각종 함수 선언
const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

const onMouseMove = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const handleColorClick = (e) => {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
};

const handleRangeChange = (e) => {
  const size = e.target.value;
  ctx.lineWidth = size;
};

const handleModeClick = (e) => {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
};

const handleCanvasClick = () => {
  if (filling) ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const handleCM = (e) => {
  e.preventDefault(); // 캔버스 기본 우클릭 기능을 없애주기
};

const handleSaveClick = (e) => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a"); // 순간적으로 a 태그 만들어주기 (브라우저에 나타나진 않음)
  link.href = image; // 캔버스 데이터 URL을 href 속성에 담기
  link.download = "PaintJS[🎨]"; // anchor 태그 다운로드 파일 이름 설정
  link.click(); // link 클릭 스크립트 명령어로 바로 다운로드 실행
};

if (canvas) {
  // 캔버스 이벤트 설정
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// 색상 설정 버튼 이벤트 설정
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

// stroke 사이즈 범위 설정 버튼 이벤트 설정
// addEventListener의 첫번째 인자 'input'은 input 값에 변경이 생겼을 때 발생되는 이벤트임
if (range) {
  range.addEventListener("input", handleRangeChange);
}

// fill / paint 모드 버튼 이벤트 설정
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

// 캔버스 이미지 저장 버튼 이벤트 설정
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
