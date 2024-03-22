
document.getElementById("startGame1").addEventListener("click", function() {
    document.getElementById("gameMenu").style.display = "none"; // 메뉴 숨기기
    document.getElementById("miniGame-Container1").style.display = "block"; // 게임 컨테이너 보이기
    startGame1(); // 게임 시작 함수 호출
});


function startGame1() {
    // 여기에 게임 시작 로직을 구현합니다.
        var config1 = {
            type: Phaser.AUTO,
            width: window.innerWidth > 800 ? 800 :350, 
            height: window.innerHeight > 800 ? 600 : 600,
            parent: "gameWindow1",
            physics: {
                default:"arcade",
                arcade: {
                    gravity: {y : 200}, //Y축 중력 설정
                    debug: false // 물리 엔진 디버그 모드 활성화 여부부
                }
            },
            scene: {
                // preload: preload, 오디오 주석처리
                create: create1,
                // update: update
        }
    };

    var game1 = new Phaser.Game(config1);
} 

function create1() {
    
}