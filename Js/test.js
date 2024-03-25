const questions =[
{
    question: "오늘은 신나는 토요일! 어디로 갈까?",
    choices:["오픈페스티벌중인 New암장!", "꿀문제가 가득하다는 그곳!?", "존버문제가 기다리는 홈짐!"]
},
{
    question: "내가 클라이밍을 좋아하는 이유는?",
    choices:["그레이드가 하나씩 올라가는 성취감", "꽉찬 전완근과 쫙쫙 갈라지는 등근육!", "다양한크루원들과의 교류!"]
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
{   question: "처음 보는 문제를 발견했다!",
choices:["일단 붙고 나서 생각해보자ㅎ", "루트파인딩을 시작한다", "인스타에서 답안지를 찾아본다"],
},
{
    question: "나랑 같은 문제를 존버하는 클라이머 발견!",
    choices:["내가 먼저 풀어야돼! 승부욕 발동!", "크럭스부분을 공략할 방법을 생각한다.", "오! 저기서 저런방법이 바로 따라한다!"]
},

{
    question: "새로 가입한 크루원과 눈이 마주친다!",
    choices:["먼저 다가가 인사하고 같이 운동하자 말한다.", "코쓱머쓱.. 눈치만 보다가 문제를 풀러간다.", "일단 실력부터 살펴본다!"]
},

{
    question: "탑만 치면 되는데 너무 무섭다!",
    choices:["안클이 먼저다 포기한다!", "나는 할수 있다!", "고수에게 도움을 요청한다!"]
},

{
    question: "전완근도 스킨도 다 털렸다...",
    choices:["5분 10분 쉬면 한문제라도 더 도전한다.", "빨리 씻고 정리하고 뒷풀이갈 준비를 한다!", "오늘도 수다70% 볼더링30% 입이 더 아프다!"]
},


{
    question: "뒷풀이도 끝나고 집으로 가는 길...",
    choices:["오늘 깬 영상을 무한반복 시청한다", "다음주는 어딜갈지 미리 고민중", "다음주는 진짜 쉬어야지!"]
},

{
    question: "친한 친구가 클라이밍을 알려달라고한다!",
    choices:["클라이밍 개꿀잼이야 내일 당장가자!", "너 운동해본적 있어?", "클라이밍하다가 다칠수도 있어 조심해야돼"]
},

{
    question: "평소에 클라이밍이 끝나면 마무리는?!",
    choices:["지구력, 풀업, 마무리 스트레칭까지 완벽하게", "아 힘들어 빨리 집에 가자", "오늘 못푼 문제들을 한번 더 째려보고 온다"]
},

{
    question: "클라이밍화를 살때 나만의 기준은?",
    choices:["유명한 선수가 신는 걸로", "디자인과 색상이 맘에 드는 걸로", "많은 사람들이 선택한 걸로"]
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


    const types = [
        
        { type: 'ISTJ', criteria: ["c1", "a2", "b2", "b3", "c3", "a4", "c5", "a1", "c6", "b7", "c7", "b8", "c8", "b9", "c9", "a10", "a11", "a12","c12","b13","a14", "a15", "b15", "c15"] },
        { type: 'ISFJ', criteria: ["c1", "a2", "b2", "b3", "c3", "a4", "b5", "c5", "a6", "c6", "c7", "c8", "b9", "a10","c10", "a11", "c12", "c13","a14", "b15", "c15"] },
        { type: 'INFJ', criteria: ["b1", "c1", "a2", "c2", "c3", "c4", "b5", "c5", "a6", "b6", "c7", "c8", "b9", "a10", "c10", "a11", "b12", "c12", "c13","a14", "c14", "c15"] },
        { type: 'INTJ', criteria: ["b1", "c1", "a2", "c3", "c4", "c5", "a6", "b6", "b7", "c7", "b8", "c8", "b9", "c9", "a10", "a11", "b12", "c12", "b13","a14", "c14", "c15"] },
        { type: 'ISTP', criteria: ["c1", "b2", "b3", "c3", "a5", "a6", "c6", "a7", "b7", "b8", "c8", "b9", "c9", "a10", "b11", "c12", "b13", "b14", "b15"] },
        { type: 'ISFP', criteria: ["c1", "b2", "c2", "b3", "c3", "a4", "a5", "b5", "a6", "a7", "c8", "b9", "a10", "c10", "b11", "a12", "c12", "c13", "b14", "b15"] },
        { type: 'INFP', criteria: ["b1", "c1", "c2", "c4", "b5", "c5", "a6", "b6", "a7", "c8", "b9", "a10", "c10", "b11", "b12", "c12", "b13", "b14", "c14"] },
        { type: 'INTP', criteria: ["b1", "c1", "c3", "c4", "a5", "a6", "b6", "a7", "b7", "b8", "c8", "b9", "c9",  "a10", "b11", "b12", "c12", "b13", "b14", "c14"] },
        { type: 'ESTP', criteria: ["a1", "b2", "a3", "b3", "a4", "b4", "a5", "c6", "a7", "b7", "a8", "b8", "a9", "a9", "b10", "b11", "a12", "a13", "b13", "b14", "a15", "b15"] },
        { type: 'ESFP', criteria: ["a1", "b2", "c2", "a3", "b3", "a4", "b4", "a5", "b5", "c6", "a7", "a8", "b9", "b10", "c10", "b11", "c11", "a12", "a13", "c13", "b14", "a15", "b15"] },
        { type: 'ENFP', criteria: ["a1", "b1", "c2", "a3", "b4", "c4", "a5", "b5", "b6", "a7", "a8", "a9", "b10", "c10", "b11", "c11", "b12", "a13", "c13", "b14", "c14", "a15"] },
        { type: 'ENTP', criteria: ["a1", "b1", "a3", "b4", "c4", "a5", "b6", "a7", "b7", "a8", "b8", "a9", "c9", "b10", "c10", "b11", "b12", "a13", "b13", "c13", "b14", "c14", "c15"] },
        { type: 'ESTJ', criteria: ["a1", "a2", "b2", "a3", "b3", "a4", "b4", "c5", "c6", "b7", "c7", "a8", "b8", "a9", "c9", "b10", "a11","c11", "c12", "a13", "b13", "a15", "b15", "c15"] },
        { type: 'ESFJ', criteria: ["a1", "a2", "b2", "c2", "a3", "b3", "a4", "b4", "b5", "c5", "c6", "c7", "a8", "a9", "b10", "c10", "a11", "c11", "a12", "a13", "c13","a14", "a15", "b15", "c15"] },
        { type: 'ENFJ', criteria: ["a1"," b1", "a2", "c2", "a3", "b4", "c4", "b5", "c5", "b6", "c7", "a8", "a9", "b10", "c10", "a11", "c11", "b12", "a13", "c13","a14", "c14", "a15", "c15"] },
        { type: 'ENTJ', criteria: ["a1", "b1", "a2", "a3", "b4", "c4", "c5", "b6", "b7", "c7", "a8", "b8", "a9", "c9", "b10", "a11", "c11", "b12", "a13", "b13" ,"a14", "c14", "a15", "c15"] }

        ];

        let highestMatch = { type: '', count: 0 };

        types.forEach(type => {
            let count = calculateCount(type.criteria);
            if (count > highestMatch.count) {
                highestMatch = { type: type.type, count: count };
            }
        });

        let resultMessage = generateMessageForType(highestMatch.type);
        const resultH2 = document.createElement("h2");
        resultH2.innerHTML = resultMessage; 
        gameGoScreen.innerHTML = ""; 
        gameGoScreen.appendChild(resultH2);
    }

    function generateMessageForType(type) {
        switch (type) {

                case 'ISTJ':
                return  `결과는 ISTJ입니다.<br> "규칙이 세상을 지배한다"<br>
                <br>스타일: 모든 루트를 외우고, 모든 움직임을 계획하여 체계적으로 클라이밍하기(열정적이진 않음). 
                    <br><br>자주하는말: "스트레칭하고 쉬운난이도로 몸부터 풀고 금방 올게!(금방 안옴)"`;
            
                
                case 'ISFJ':
                return `결과는 ISFJ입니다.<br> "돌보는 마음의 클라이머"<br>
                <br>스타일: 클라이밍계의 도라에몽 손톱깍기,굳은살제거기,메디폼, 마사지건 등등 없는게 없다.
                    <br><br>자주하는말: "헉 다쳤어? 여기 소독약이랑 메디폼!"`;
            
                case 'INFJ':
                    return `결과는 INFJ입니다.<br> "의미 있는 올라가기"<br>
                    <br>스타일: 오늘의 목표를 정하고 실행한다. 그런데 다른사람들의 목표도 체크한다.
                    <br><br>자주하는말: "나는 빨강2개, 파랑 5개 풀었어 너는 몇개 풀었어?"`;
        
                case 'INTJ':
                    return `결과는 INTJ입니다.<br> "계획적인 마스터마인드"<br>
                    <br>스타일: 가장 최적의 루트와 움직임을 찾으려 한다.
                    <br><br>자주하는말: "내가 말한대로 해봐, 거기선 손이랑 발을 ~해야 힘이 안들어"`;
        
                case 'ISTP':
                    return `결과는 ISTP입니다.<br> "즉흥적인 스턴트맨"<br>
                    <br>스타일: 새로운 루트에 도전적이다. 일단 부딪혀본다(재밌어보이는건 꼭함).
                    <br><br>자주하는말: "저기 새 문제가 보이는데 한 번 가볼래?"`;
        
                case 'ISFP':
                    return `결과는 ISFP입니다.<br> "자유분방한 아티스트"<br>
                    <br>스타일: 자신의 스타일대로 자유로운 움직임을 추구한다(잘 다침).
                    <br><br>자주하는말: "여기는 이렇게 갈수도 있어!(나만)"`;
        
                case 'INFP':
                    return `결과는 INFP입니다.<br> "꿈꾸는 철학자"<br>
                    <br>스타일: 클라이밍을 하는 나, 어려운 문제를 푸는 나, 본인에게 집중한다.
                    <br><br>자주하는말: "클라이밍은 재밌어!"`;
        
                case 'INTP':
                    return `결과는 INTP입니다.<br> "논리적인 해결사"<br>
                    <br>스타일: 이론적으로 문제를 풀려고 시도한다.
                    <br><br>자주하는말: "거기는 ~해서 ~하면 가능할 것 같은데?"(불가능)`;
        
                case 'ESTP':
                    return `결과는 ESTP입니다.<br> "과감한 모험가"<br>
                    <br>스타일: 위험을 감수하고 동적이고 스릴 넘치는 클라이밍 도전하기.
                    <br><br>자주하는말: "봐바 이 문제 쉽지? 이렇게 하면 돼(안쉬움)"`;  
                
                    case 'ESFP':
                        return `결과는 ESFP입니다.<br> "볼더링의 엔터테이너"<br>
                        <br>스타일: 클라이밍을 할 때 흥겹고 즐거운 분위기를 만들고, 모두가 활기차게 참여하게 하기.
                        <br><br>자주하는말: "들찍해줘! 클라이밍하는 나를 봐! 나를 응원해줘!"`;
            
                    case 'ENFP':
                        return `결과는 ENFP입니다.<br> "볼더링의 꿈나그네"<br>
                        <br>스타일: 재미있고 창의적인 클라이밍 루트를 찾아 여러 시도를 하며, 다양한 사람들과 교류하기.
                        <br><br>자주하는말: "뭘 해볼까? 저 문제도 좋고, 이 문제도 좋고 아니면 그냥 새로운 문제 풀까?"`;
            
                    case 'ENTP':
                        return `결과는 ENTP입니다.<br> "끊임없이 탐구하는 발명가"<br>
                        <br>스타일: 클라이밍 문제를 해결하는 독특한 방식을 찾고, 비표준적인 접근법을 시도하기.
                        <br><br>자주하는말: "저 문제 신기하네. 잠깐만, 뭔가 다른 방법으로 풀 수 있을 것 같아"(기괴함)`;
            
                    case 'ESTJ':
                        return `결과는 ESTJ입니다.<br> "목표 지향적 코치"<br>
                        <br>스타일: 목표 설정을 하고, 체계적인 훈련을 통해 점진적으로 실력 향상시키기.
                        <br><br>자주하는말: "이번주 클라이밍 일정표 확인해! 오늘은 끝나고 지구력도 할 거야."`;
            
                    case 'ESFJ':
                        return `결과는 ESFJ입니다.<br> "팀의 모티베이터"<br>
                        <br>스타일: 클라이밍 커뮤니티를 만들고, 모두가 함께 즐길 수 있는 분위기 조성하기.
                        <br><br>자주하는말: "모두들 빨리 모여봐! 여기서 사진 찍자(수십 장)"`;
            
                    case 'ENFJ':
                        return `결과는 ENFJ입니다.<br> "볼더링의 영감 메이커"<br>
                        <br>스타일: 동료 클라이머들을 격려하고, 긍정적인 영향을 미치며 리더십을 발휘하기.
                        <br><br>자주하는말: "너는 할 수 있어. 너라면 저 문제도 풀 수 있어!"`;
            
                    case 'ENTJ':
                        return `결과는 ENTJ입니다.<br> "목표를 향해 추진하는 지도자"<br>
                        <br>스타일: 클라이밍 목표를 설정하고, 주도적으로 그 목표를 달성하기 위해 자신과 팀을 이끌기.
                        <br><br>자주하는말: "이 문제는 이렇게 푸는 거래(인스타를 보여주며). 지금 시작해!"`;
                        
                    default:
                        return "아직 분석할 수 없는 유형입니다. 더 많은 정보가 필요해요!";
                }
            }    


    function calculateCount(criteria) {
        return criteria.reduce((count, criterion) => {
            return count + (choicesCounts[criterion] > 0 ? 1 : 0);
        }, 0);
    }





    // 클립보드에 결과를 복사하는 함수
function feedback() {
    // 선택 결과를 문자열로 정리
    let resultsSummary = "";
    Object.entries(choicesCounts).forEach(([key, count]) => {
        resultsSummary += `${key} 선택 횟수: ${count}\n`; // 줄바꿈 문자로 각 항목을 구분
    });

    // 클립보드에 복사
    navigator.clipboard.writeText(resultsSummary).then(() => {
        alert("결과가 클립보드에 복사되었습니다. 개발자에게 공유해주세요!");
        window.open("https://open.kakao.com/o/sHLQrBhg", "_blank");
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
        alert("결과를 클립보드에 복사하는 데 실패했습니다. 브라우저가 클립보드 기능을 지원하지 않을 수 있습니다.");
    });
}

// 질문별 선택지 카운트 초기화
initializeChoicesCounts();
// 최초의 질문을 화면에 표시합니다.
displayCurrentQuestion();