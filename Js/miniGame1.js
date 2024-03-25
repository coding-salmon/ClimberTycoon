
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


        //돌 관리할 그룹 생성
        this.rocks = this.physics.add.group({
            setCollideWorldBounds:true,
            bounceX:0.5,
            bounceY:0.5
        });

         //게임오버 지점에 실선 그리기
         let lineY = this.cameras.main.height * 0.7;
        this.add.graphics().lineStyle(2, 0xff0000,1).lineBetween(0, lineY, this.cameras.main.width, lineY)

        //게임오버 텍스트 생성 
        this.gameOverText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Game Over', { fontSize: '3rem', fill: '#ffffff' }).setOrigin(0.5);
        this.gameOverText.setVisible(false);

        this.spawnRandomRock();// 첫돌 랜덤 생성

        //화면 중앙 y축 위치 설정
        const startX = this.cameras.main.width /2;


        //드래그 이벤트 처리
        this.input.on('drag', (pointer, gameObject, dragX, dragY) =>{
            if(gameObject.getData('draggable')){
                gameObject.x =dragX; // 드래그하여 x축 위치 조정
            }
        });

        //드래그 종료 이벤트 
        this.input.on('dragend', (pointer, gameObject) => {
            if (gameObject.getData('draggable')) {
                gameObject.setData('draggable', false); // 드래그 끝날 때 드래그 불가능으로 설정
                gameObject.body.setAllowGravity(true); // 중력 활성화하여 자유 낙하 시작
            }
        });


        //왼쪽 클릭 이벤트 처리 
        this.input.on('pointerdown',(pointer, gameObject)=>{
            let rock = this.rocks.getChildren().find(rock => rock.getData('isInitial'));    
            if (rock && !rock.body.allowGravity) {
                rock.x = pointer.x; // 클릭 위치로 돌 이동
                rock.setData('isInitial', false); // 클릭으로 이동 완료 상태 표시
                rock.body.setAllowGravity(true); // 중력 활성화
            }
        });
    }
    spawnRandomRock(){

        let x = this.cameras.main.width / 2;
        let y = 100; // 시작 Y 위치는 필요에 따라 조정
        let rock = this.rocks.create(x, y, 'rockTexture');
        rock.setData('isInitial', true); // 초기 생성된 돌임을 표시
        rock.setData('draggable', true); // 드래그 가능 상태로 설정
        rock.body.setAllowGravity(false); // 처음에는 중력 비활성화
        this.input.setDraggable(rock, true); // 돌을 드래그 가능하게 설정

        //돌 번호에 대한 확률 가중치 설정
        let rocksProbabilities = [  '1', '1', '1', '1', '1', '1',
                                    '2', '2', '2', '2', '2',
                                    '3', '3', '3', '3',
                                    '4', '4', '4',
                                    '5', '5',
                                    '6'];

        let randomIndex = Math.floor(Math.random() * rocksProbabilities.length);
        let rockNumber = parseInt(rocksProbabilities[randomIndex]); // 예: '1', '2', '3', ...    
        let rockKey = 'rock' + rockNumber; // 예: 'rock1', 'rock2', ...

         // 돌 번호에 따른 크기 계산 (1돌 10px, 2돌 20px, ..., 6돌 60px)
         let desiredSize = rockNumber * 10; // 문자열을 숫자로 변환 후 크기 계산
        
        //선택된 돌 생성
        this.spawnRock(this.cameras.main.width / 2, 0, rockKey, rockNumber,desiredSize);
    
    }

    spawnRock(x, y, key,  rockNumber, desiredSize){
    let rock = this.physics.add.image(x, y, key).setInteractive();
    rock.setData('rockNumber', rockNumber);
    rock.setData('draggable', true); // 드래그 가능 상태로 설정

    //원본 이미지 크기 대비 원하는 크기로 스케일 조정
    let scale = desiredSize / 300; //원본 크기가 300*300 픽셀
    rock.setScale(scale).setCircle(desiredSize / 2); // 돌의 원형 충돌 범위 설정
    rock.setBounce(0.5).setCollideWorldBounds(true); // 바운스 설정 및 화면 경계와의 충돌 활성화
    rock.body.setAllowGravity(false); //처음에는 중력 비활성화
    this.input.setDraggable(rock);    
      // 생성된 돌을 그룹에 추가
    this.rocks.add(rock);
    


    //모든 돌들이 서로 충돌할 수 있도록 설정
    this.physics.add.collider(this.rocks, this.rocks, this.mergeRocks, null, this);

    
    //다음 돌 생성 준비
    rock.body.onWorldBounds =true; //화면 경계와 닿았는지 감지
    this.physics.world.on('worldbounds', (body) => {
        if (!this.gameOver && body.gameObject === rock) {
            this.spawnRandomRock();
        }
    });
    return rock;
}

    mergeRocks(rock1, rock2){

        //돌의 번호를 기준으로 합체 검사
        let rockNumber1 = rock1.getData('rockNumber');
        let rockNumber2 = rock2.getData('rockNumber');
        
        //같은 번호의 돌일 경우에만 합체
        if(rockNumber1 === rockNumber2){
            //새로운 돌의 번호 계산

            let newRockNumber = rockNumber1 +1;
            let rockKey = 'rock' + newRockNumber;

            //새로운 돌의 위치를 계산 (먼저 떨어진 돌의 위치와 새돌의 약간 중간쯤)
            let newX = (rock1.x +rock2.x)/2; 
            let newY = Math.min(rock1.y, rock2.y)-20;

            //기존 두돌을 제거
            rock1.destroy();
            rock2.destroy();

            //새로운 번호의 돌생성
            this.spawnRock(newX, newY, rockKey, newRockNumber,newRockNumber * 10);
        }
    }


    update(){
        if(this.gameOver){
            return; // 게임 오버 상태면 추가 로직을 수행하지 않음
        }

        // 모든 돌의 위치 체크하여 70% 이상에 도달했는지 확인
        let rocksAboveLine = this.rocks.getChildren().filter(rock => rock.y < this.cameras.main.height * 0.3);
        if (rocksAboveLine.length> 0){
            this.gameOver = true;
            this.physics.pause(); //모든 물리적인 움직인 멈춤
            this.gameOverText.setVisible(true); //게임 오버 텍스트 표시
        }

    };
};