
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
                preload: preload, 
                create: create1,
                update: update
        }
    };

    var game1 = new Phaser.Game(config1);
} 

function preload(){
    //홀드 이미지 로드
    this.load.image("rock1", "../miniGameImages/hold1.jpg");
    this.load.image("rock2", "../miniGameImages/hold2.jpg");
    this.load.image("rock3", "../miniGameImages/hold3.jpg");

}

function create1() {
    //홀드 물리 객체 생성
    this.rock = this.physics.add.image(400, 0, "rock");
    this.rock =setCollideWorldBounds(true); //화면 경계와 충돌처리
    this.rock = setBounce(0.5); //돌이 바운스되는 정도 설정
    this.rock = setInteractive(); //돌이 인터렉티브하도록 설정

    //과일이 드래그해서 위치 조절 가능하게 함
    this.input.setDraggable(this.rock);
    this.input.on("drag",function (pointer,gameObject,dragX,dragY){
        gameObject.x=dragX;
    });

    
}