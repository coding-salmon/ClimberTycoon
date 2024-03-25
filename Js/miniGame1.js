
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
            height: window.innerHeight > 800 ? 650 : 500,
            parent: "gameWindow1",
            physics: {
                default:"arcade",
                arcade: {
                    gravity: {y : 200}, //Y축 중력 설정
                    debug: false // 물리 엔진 디버그 모드 활성화 여부부
                }
            },
            scene: MainScene
        };
    

    var game1 = new Phaser.Game(config1);
}

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload(){
    //홀드 이미지 로드
    this.load.image("rock1", "../miniGameImages/hold1.jpg");
    this.load.image("rock2", "../miniGameImages/hold2.jpg");
    this.load.image("rock3", "../miniGameImages/hold3.jpg");
    this.load.image("rock4", "../miniGameImages/hold4.jpg");
    this.load.image("rock5", "../miniGameImages/hold5.jpg");
    this.load.image("rock6", "../miniGameImages/hold6.jpg");

}

    create() {
    this.input.on('drag', (pninter, gameObject, dragX, dragY) =>{
        gameObject.x =dragX; // 드래그하여 x축 위치 조정
    });

    this.spawnRandomRock();// 첫돌 랜덤 생성
}
    spawnRandomRock(){

        //돌 번호에 대한 확률 가중치 설정
        let rocksProbabilities = [  '1', '1', '1', '1', '1', '1',
                                    '2', '2', '2', '2', '2',
                                    '3', '3', '3', '3',
                                    '4', '4', '4',
                                    '5', '5',
                                    '6'];

        let randomIndex = Math.floor(Math.random() * rocksProbabilities.length);    
        let rockKey = 'rock' + rocksProbabilities[randomIndex]; //예 : rock1 rock2 rock3 ...
        
        //선택된 돌 생성
        this.spawnRock(window.innerWidht / 2, 0, rockKey);
    }

    spawnRock(x, y, key){
    let rock = this.physics.add.image(x, y, key).setInteractive();
    this.input.setDraggable(rock);
        rock.setCircle(rock.width /2); // 원형 물리 바디 설정
        rock.setCollideWorldBounds(true); // 화면 경계와의 충돌 활성화
        rock.setBounce(0.5); // 바운스 설정

        //원본 이미지 크기 대비 원하는 크기로 스케일 조정
        let scale = desiredSize / 300; //원본 크기가 300*300 픽셀
        rock.setScale(scale);


    //돌이 탭되면 아래로 이동    
    rock.on('pointerdown', (pointer) => {
        this.physics.moveTo(rock, pointer.x, this.sys.game.config.height, 200); 
    });

    //다음 돌 생성 준비
    rock.body.onWorldBounds =true; //화면 경계와 닿았는지 감지
    this.physics.world.on('worldbounds', (body) => {
        //현재 돌이 화면 하단에 닿았는지 확인

        if(body.gameObject === rock && this.nextRock <=3){
            this.nextRock++; // 다음 돌 준비
            this.spawnRock(window.innerWidth /2, 100, 'rock' + this.nextRock); //다음 돌 생성
        }
    });
}



    update(){

    
    this.rock = setInteractive(); //돌이 인터렉티브하도록 설정

    //돌을 드래그해서 위치 조절 가능하게 함
    this.input.setDraggable(this.rock);
    this.input.on("drag",function (pointer,gameObject,dragX,dragY){
        gameObject.x=dragX;


        // 돌이 다른 돌과 충돌했을 때의 처리
        rock.body.onCollide = true;
        this.physics.world.on('collide', (bodyA, bodyB) => {
        // bodyA와 bodyB가 충돌했을 때의 로직 구현
        // 예: 돌들이 합체되어 사이즈가 커지는 로직
        })
    
        
    });

    
    }

}

