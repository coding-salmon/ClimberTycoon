const questions =[
{
    question: "오늘은 신나는 토요일! 어디로 갈까?",
    choices:["오픈페스티벌중인 New암장!", "꿀문제가 가득하다는 그곳!?", "존버문제가 기다리는 홈짐!"]
},
{
    question: "암장에 들어가기전 꼭 가는 곳은?",
    choices:["빅사이즈 아아는 필수!", "달달한 디저트간식은 필수!", "1g이라도 가볍게 바로암장으로!"]
},

{
    question: "암장에 도착했다!",
    choices:["안클이 최고 스트레칭존부터!", "크루들이 어디있나 인사부터!", "인스타에서 봤던 그 꿀 문제가 어디있지?!"]
},

{
    question: "헉, 서두르다 보니 삼각대를 놓고왔다 ㅠㅠ",
    choices:["영상도 못찍으니 대충 풀자", "이미 들찍해줄 클친들이 줄을 섰다.", "영상을 못찍어도 최선을 다한다!"]
},

{
    question: "어느벽부터 도전해볼까?",
    choices:["일단 사람없는 곳부터 차근차근!", "인스타에서 본 꿀문제부터!", "다이노 or 코디 or 벨런스 내가 잘하는것부터!"]
},

{
    question: "나랑 같은 문제를 존버하는 클라이머 발견!",
    choices:["내가 먼저 풀어야돼! 승부욕 발동!", "둘중 누구라도 성공하면 기쁘다!", "오! 저기서 저런방법이 바로 따라한다!"]
},

{
    question: "새로 가입한 크루원과 눈이 마주친다!",
    choices:["먼저 다가가 인사하고 같이 운동하자 말한다.", "코쓱머쓱.. 눈치만 보다가 문제를 풀러간다.", "일단 실력부터 살펴본다!"]
},

{
    question: "탑만 치면 되는데 너무 무섭다!",
    choices:["안클이 먼저다 포기한다!", "나는 할수 있다!", "내 라이벌이 그문제를 깼는지 확인부터 한다."]
},

{
    question: "전완근도 스킨도 다 털렸다...",
    choices:["5분 10분 쉬면 한문제라도 더 도전한다.", "빨리 씻고 정리하고 뒷풀이갈 준비를 한다!", "오늘도 수다80% 볼더링20% 입이 더 아프다!"]
},

{
    question: "뒷풀이도 끝나고 집으로 가는 길...",
    choices:["오늘 깬 영상을 무한반복 시청한다", "다음주는 어딜갈지 미리 고민중", "다음주는 진짜 쉬어야지!"]
}

];

let currentQuestionIndex = 0;
let choicesCounts = {}; // 사용자의 질문별 선택을 집계할 객체


function initializeChoicesCounts() {
    questions.forEach((_, index) => {
        choicesCounts[`a${index+1}`] = 0;
        choicesCounts[`b${index+1}`] = 0;
        choicesCounts[`c${index+1}`] = 0;
    });
}



function displayCurrentQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        const gameGoScreen = document.getElementById("gameGoScreen");
        
        // 기존 질문과 선택지를 제거합니다.
        gameGoScreen.innerHTML = '<h1>당신의 선택은?!!</h1>';

        // 새로운 질문 텍스트를 추가합니다.
        const questionText = document.createElement("h2");
        questionText.textContent = currentQuestion.question;
        gameGoScreen.appendChild(questionText);

        currentQuestion.choices.forEach((choice, index) => {
            const choiceKey = ['a', 'b', 'c'][index] + (currentQuestionIndex + 1); // 예: a1, b1, c1
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceButton.onclick = () => selectChoice(choiceKey);
            gameGoScreen.appendChild(choiceButton);
        });
    } else {
        // 모든 질문이 완료되었을 때의 처리를 여기에 추가합니다.
        displayCompletionMessage();
    }
}

function selectChoice(choiceKey) {
    choicesCounts[choiceKey]++;
    currentQuestionIndex++;
    displayCurrentQuestion();
}

function displayCompletionMessage() {
    const gameGoScreen = document.getElementById("gameGoScreen");
    gameGoScreen.innerHTML = `<h1>결과 정리중!</h1>`;


    //istj 

    //isfj 

    //infj 

    //intj 



    //istp

    //isfp

    //infp

    //intp



    //estp

    //esfp

    //enfp
    
    const enfpCriteria = ["a1", "a2", "b3","b4", "b5","c6","a7","a8","c9","a10"]
    let enfpCount = enfpCriteria.reduce((count,criteria)=>{
        return count + (choicesCounts[criteria] >0 ? 1: 0);
    }, 0);
    let resultMessage = enfpCount >= 6 ? "결과는 ENFP입니다." :"아직 알수없음 미니게임을 진행해보세요!";

    
    
    //entp



    //estj

    //esfj

    //enfj

    //entj
    

    // <h2> 요소 생성 및 결과 메시지 설정
    const resultH2 = document.createElement("h2");
    resultH2.textContent = resultMessage;

    // <h2> 요소를 gameGoScreen에 추가
    gameGoScreen.appendChild(resultH2);

  



    // 선택 결과를 문자열로 정리
    let resultsSummary = "";
    Object.entries(choicesCounts).forEach(([key, count]) => {
        resultsSummary += `${key} 선택 횟수: ${count}\n`; // 줄바꿈 문자로 각 항목을 구분
    });

    

    // 클립보드에 복사 버튼 추가
const copyButton = document.createElement("button");
copyButton.textContent = "결과 복사하기";
copyButton.onclick = function () {
    navigator.clipboard.writeText(resultsSummary).then(() => {
            alert("결과 복사 완료. 개발자한테 결과공유하기 Ctrl + V를 해주세요!");
        })
        .catch(err => {
            console.error('클립보드 복사 실패:', err);
            alert("클립보드에 복사하는 데 실패했습니다. 브라우저가 복사 기능을 지원하지 않을 수 있습니다.");
        });
};


gameGoScreen.appendChild(copyButton);


}

// 질문별 선택지 카운트 초기화
initializeChoicesCounts();
// 최초의 질문을 화면에 표시합니다.
displayCurrentQuestion();