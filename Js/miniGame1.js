
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
        super({ key: 'MainScene' }); //장면의 킬 설정
        this.nextRock = 1; //다음에 생성될 돌의 번호 초기화
        this.gameOver = false; // 게임 오버 상태를 추적하는 변수 추가
        this.readyForNextRock = true; // 다음 돌을 생성할 준비가 되었는지 나타내는 플래그입니다.
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
         let lineY = this.cameras.main.height * 0.2;
        this.add.graphics().lineStyle(2, 0xff0000,1).lineBetween(0, lineY, this.cameras.main.width, lineY)

        //게임오버 텍스트 생성 
        this.gameOverText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Game Over', { fontSize: '3rem', fill: '#ffffff' }).setOrigin(0.5);
        this.gameOverText.setVisible(false);

    

        //화면 중앙 x축 위치 설정
        const startX = this.cameras.main.width /2;
        // 화면의 가장 위에서 돌이 시작하도록 y 위치를 0으로 설정
        const startY = 0; 


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
                
                // 낙하시킨 후 5초 뒤 새 돌 생성 준비
                this.prepareForNextRock();
            }
        });
         //왼쪽 클릭 이벤트 처리 
        this.input.on('pointerdown',(pointer, gameObject)=>{
            if (this.rocks.contains(gameObject) && gameObject.getData('isInitial')) {
                gameObject.x = pointer.x; // 클릭 위치로 돌 이동
                gameObject.setData('isInitial', false); // 클릭으로 이동 완료 상태 표시
                gameObject.body.setAllowGravity(true); // 중력 활성화

                // 클릭으로 낙하시킨 후 5초 뒤 새 돌 생성 준비
                this.prepareForNextRock();
            }
        });

        // //왼쪽 클릭 이벤트 처리 
        // this.input.on('pointerdown',(pointer, gameObject)=>{
        //     let rock = this.rocks.getChildren().find(rock => rock.getData('isInitial'));    
        //     if (rock && !rock.body.allowGravity) {
        //         rock.x = pointer.x; // 클릭 위치로 돌 이동
        //         rock.setData('isInitial', false); // 클릭으로 이동 완료 상태 표시
        //         rock.body.setAllowGravity(true); // 중력 활성화

        //         // 클릭으로 낙하시킨 후 5초 뒤 새 돌 생성 준비
        //         this.prepareForNextRock();
        //     }
        // });

        // 5초 뒤 새 돌 생성 준비를 위한 함수
        this.prepareForNextRock = () => {
        // 새 돌 생성을 위한 타이머 설정
        if (this.spawnTimer) clearTimeout(this.spawnTimer); // 기존 타이머가 있다면 취소

        this.spawnTimer = setTimeout(() => {
        // 게임 오버 상태가 아니라면 새 돌 생성
        if (!this.gameOver) {
            this.spawnRandomRock(startX, startY); // 새로운 홀드 생성
        }
    }, 5000); // 5초 대기
};
 // 초기 돌 생성
 this.spawnRandomRock(startX, startY); // 화면 중앙에 돌 생성
}
    
    spawnRandomRock(xPosition, yPosition) {
        // 새 돌을 생성할 준비가 되지 않았거나 게임이 오버된 상태라면 함수 종료
        if (!this.readyForNextRock || this.gameOver) return;

        // 각 돌 번호에 대한 가중치 설정. 1번 돌이 가장 높은 확률로, 6번 돌이 가장 낮은 확률로 생성되도록 함
        const weights = [6, 5, 4, 3, 2, 1]; // 예를 들어, 1번 돌은 6/21의 확률로, 6번 돌은 1/21의 확률로 생성됨
        
        // 가중치에 따라 랜덤하게 돌 번호 선택
        const totalWeight = weights.reduce((acc, cur) => acc + cur, 0);
        let randomNum = Phaser.Math.Between(1, totalWeight);
        let selectedRock = weights.findIndex(weight => {
            randomNum -= weight;
            return randomNum <= 0;
        }) + 1;

        this.nextRock = selectedRock;


        // 현재 돌의 번호에 맞는 키와 크기를 설정합니다.
        let rockKey = 'rock' + this.nextRock; // 돌의 텍스처 키
        let desiredSize = this.nextRock * 10; // 돌의 크기
    
        // 지정된 위치에 새 돌 생성
        this.spawnRock(xPosition, yPosition, rockKey, this.nextRock, desiredSize);
    
    
        // 새 돌이 생성되었으니 다음 돌 생성 준비 상태를 false로 설정
        this.readyForNextRock = false;
    }

    //특정 위치에 돌을 생성하고 설정하는 함수
    spawnRock(x, y, key, rockNumber, desiredSize) {
         // Phaser의 물리 시스템을 사용해 이미지(돌)를 생성하고 인터랙티브하게 만듭니다.
        let rock = this.physics.add.image(x, y, key).setInteractive();
        // 돌에 고유 번호를 부여합니다. 이 번호는 돌을 식별하는 데 사용됩니다.
        rock.setData('rockNumber', rockNumber);
        // 돌을 드래그 가능하게 설정합니다. 사용자가 마우스나 터치로 돌을 이동할 수 있게 합니다.
        rock.setData('draggable', true); // 드래그 가능하게 설정

        rock.setData('isInitial', true); // 추가: 초기 홀드 식별을 위해
    
        // 원본 이미지 크기 대비 원하는 크기로 스케일 조정
        let scale = desiredSize / 300; // 가정: 원본 크기가 300x300 픽셀
        rock.setScale(scale).setCircle(desiredSize / 2); // 돌의 원형 충돌 범위 설정
    
        rock.setBounce(0.5).setCollideWorldBounds(true); // 바운스 설정 및 화면 경계 충돌 활성화
        rock.body.setAllowGravity(false); // 초기에는 중력 비활성화
    
        this.input.setDraggable(rock); // 돌을 드래그 가능하게 설정
        this.rocks.add(rock); // 생성된 돌을 그룹에 추가
    
        // 모든 돌들이 서로 충돌할 수 있도록 설정
        this.physics.add.collider(this.rocks, this.rocks, this.mergeRocks, null, this);
    
        
    }

    mergeRocks(rock1, rock2){

        // 같은 번호의 돌이 부딪혔을 때 합체하는 로직
        let rockNumber1 = parseInt(rock1.texture.key.replace('rock', ''));
        let rockNumber2 = parseInt(rock2.texture.key.replace('rock', ''));

        
        if (rockNumber1 === rockNumber2 && rockNumber1 < 6) { // 최대 번호 제한
            let newRockNumber = rockNumber1 + 1;
            let newX = (rock1.x + rock2.x) / 2;
            let newY = Math.min(rock1.y, rock2.y) - 20; // 새로운 돌의 위치 조정

            // 기존 돌 제거
            rock1.destroy();
            rock2.destroy();

            // 새로운 돌 생성
            let newRockKey = 'rock' + newRockNumber;
            let newSize = newRockNumber * 10;
            this.spawnRock(newX, newY, newRockKey, newSize);
        }
    }


    update() {
        // 게임 오버 조건 확인
        this.rocks.getChildren().forEach(rock => {
            // 특정 높이(여기서는 화면 높이의 20% 지점) 위에 도달한 돌이 있는지 확인
            if (rock.y + rock.displayHeight / 2 > this.cameras.main.height * 0.2) {
                // 해당 돌에 대해 'overLine' 데이터를 true로 설정
                rock.setData('overLine', true);
    
                // 돌이 'overLine' 상태로 설정된 시간을 추적
                if (!rock.getData('overLineTime')) {
                    rock.setData('overLineTime', this.time.now);
                }
    
                // 돌이 특정 라인 위에 3초 이상 머무른 경우 게임 오버 처리
                if (this.time.now - rock.getData('overLineTime') > 5000) {
                    this.gameOver = true;
                }
            } else {
                // 돌이 특정 라인 아래로 내려간 경우 'overLine' 상태와 타이머를 초기화
                rock.setData('overLine', false);
                rock.setData('overLineTime', null);
            }
        });
    
        if (this.gameOver) {
            this.physics.pause(); // 모든 물리적 움직임을 멈춤
            this.gameOverText.setVisible(true); // 게임 오버 텍스트 표시
        }
    }
};