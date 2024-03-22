
document.getElementById("startGame2").addEventListener("click", function() {
    document.getElementById("gameMenu").style.display = "none"; // 메뉴 숨기기
    document.getElementById("miniGame-Container2").style.display = "block"; // 게임 컨테이너 보이기
    startGame2(); // 게임 시작 함수 호출
});


function startGame2() {
    // 여기에 게임 시작 로직을 구현합니다.
        var config = {
            type: Phaser.AUTO,
            width: window.innerWidth > 800 ? 800 :350, 
            height: window.innerHeight > 800 ? 600 : 600,
            parent: "gameWindow2", 
            scene: {
                // preload: preload, 오디오 주석처리
                create: create
        }
    };
} 