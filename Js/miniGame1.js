
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
        this.nextRock = 1; //다음에 생성될 돌의 번호 초기화
        this.gameOver = false; // 게임 오버 상태를 추적하는 변수 추가
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

        //화면 중앙 y축 위치 설정
        const startX = this.cameras.main.width /2;

        // 돌 생성 및 드래그 가능 설정
        this.rock = this.physics.add.image(startX, 0, 'rock1').setInteractive();
        this.input.setDraggable(this.rock);
        this.rock.body.setAllowGravity(false);

        //드래그 이벤트 처리
    this.input.setDraggable(this.rock);    
    this.input.on('drag', (pointer, gameObject, dragX, dragY) =>{
        gameObject.x =dragX; // 드래그하여 x축 위치 조정
        if(!gameObject.body.setAllowGravity){
            gameObject.body.setAllowGravity(true); //중력작용
        }
    });


    //왼쪽 클릭 이벤트 처리 
    this.input.on('pointerdown',(pointer)=>{
        if(!this.rock.body.setAllowGravity){
            this.rock.x =pointer.x;
            this.rock.body.setAllowGravity(true); // 중력작용
        }
    });



    this.spawnRandomRock();// 첫돌 랜덤 생성

    //게임오버 텍스트 생성 
    this.gameOverText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Game Over', { fontSize: '3rem', fill: '#ffffff' }).setOrigin(0.5);
    this.gameOverText.setVisible(false);
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
        let rockNumber = rocksProbabilities[randomIndex]; // 예: '1', '2', '3', ...    
        let rockKey = 'rock' + rockNumber; // 예: 'rock1', 'rock2', ...

         // 돌 번호에 따른 크기 계산 (1돌 10px, 2돌 20px, ..., 6돌 60px)
         let desiredSize = parseInt(rockNumber) * 10; // 문자열을 숫자로 변환 후 크기 계산
        
        //선택된 돌 생성
        this.spawnRock(this.cameras.main.width / 2, 0, rockKey, desiredSize);
    }

    spawnRock(x, y, key, desiredSize){
    let rock = this.physics.add.image(x, y, key).setInteractive();
    rock.setScale(desiredSize / 300);
    rock.body.setEnable(false); // 물리 시스템 비활성화로 시작
    
    this.input.setDraggable(rock);
    rock.on('dragstart', (pointer)=> {
        rock.body.setEnable(true); // 드래그 시작 시 물리 시스템 활성화
    });
        rock.setCircle(rock.width / 2);
        rock.setCollideWorldBounds(true); // 화면 경계와의 충돌 활성화
        rock.setBounce(0.5); // 바운스 설정

        //원본 이미지 크기 대비 원하는 크기로 스케일 조정
        let scale = desiredSize / 300; //원본 크기가 300*300 픽셀
        rock.setScale(scale);


    //돌이 탭되면 아래로 이동    
    rock.on('pointerdown', (pointer) => {
        this.physics.moveTo(rock, pointer.x, this.sys.game.config.height, 200); 
    });

    rock.body.setCollideWorldBounds(true);

    //다음 돌 생성 준비
    rock.body.onWorldBounds =true; //화면 경계와 닿았는지 감지
    
    this.physics.world.on('worldbounds', (body) => {
        //현재 돌이 화면 하단에 닿았는지 확인

        if(body.gameObject === rock && this.nextRock <=6){
            this.nextRock++; // 다음 돌 준비
            this.time.delayedCall(100,() => {
                if(this.nextRock<6){
                this.spawnRandomRock(window.innerWidth /2, 100, 'rock' + this.nextRock, this.nextRock * 10); //다음 돌 생성
                }
            },[], this);
           
        }
    }, this);
}



    update(){

    
    // this.rock = setInteractive(); //돌이 인터렉티브하도록 설정

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

