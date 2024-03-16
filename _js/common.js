// // 게임에서 사용자의 특정 행동이 발생했을 때 호출되는 함수
// function recordGameAction(playerId, playerX, playerY, mapId, eventType) {
//     const apiUrl = "https://js259xm2sc.execute-api.ap-northeast-2.amazonaws.com/test_stage/test";

//     // 타임스탬프 생성
//     const timestamp = new Date().toISOString();

//     // 게임에서 전송할 JSON 데이터 구성
//     const postData = {
//         player_id: playerId,
//         player: {
//             x: playerX,
//             y: playerY
//         },
//         map_id: mapId,
//         event_type: eventType,
//         timestamp: timestamp
//     };

//     // API Gateway로 HTTP POST 요청 보내기
//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(postData)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('API Gateway response:', data);
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });
// }
// ------------------------------- //
// 변수 선언
let player_config = {
    player_speed: 150,
    player_jumpspeed: -500,
    deathCount: 0, // 죽은 회수
    SnakedeathCount: 0,
    MobdeathCount: 0,
    FalldeathCount: 0,
    TreedeathCount: 0,
    initialPosition: { x: 100, y: 700 }, // 캐릭터 초기위치
    initialFrame: 'player'
};
let deathCount = [];
let SnakedeathCount = [];
let MobdeathCount = [];
let FalldeathCount = [];
let TreedeathCount = [];
let ClouddeathCount = [];
let blockHs = []; // 블록들을 담을 배열
let startTime = 0;
let timeText;
let isGamePaused = false; // 게임 일시정지 상태 변수
let savePoint; // 세이브 포인트 관련 변수
let savePointCoordinates = { x: 0, y: 0 }; // 세이브 포인트 좌표 저장
let W, H;
let Trees1, Trees2, Trees3, Trees4, Trees5;
let transparentBlock1, transparentBlock2, transparentBlock3, transparentBlock4, transparentBlock5, transparentBlock6,
transparentBlock7, transparentBlock8, transparentBlock9, transparentBlock10, transparentBlock11, transparentBlock12, transparentBlock13,
transparentBlock14, transparentBlock15, transparentBlock16, transparentBlock17,transparentBlock18,transparentBlock19,transparentBlock20,transparentBlock21,transparentBlock22,transparentBlock23, transparentBlock24, transparentBlock25,transparentBlock26,transparentBlock27,transparentBlock28,transparentBlock29,transparentBlock30,transparentBlock31,transparentBlock32,transparentBlock33,transparentBlock34,transparentBlock35,transparentBlock36,transparentBlock37,transparentBlock38,transparentBlock39,transparentBlock40,transparentBlock41,transparentBlock42,transparentBlock43,transparentBlock44;
let blockA1, blockA2, blockA3, blockA4, blockA5, blockA6, blockA7, blockA8, blockA9, blockA10, blockA11, blockA12, blockA13, blockA14, blockA15, blockA16, blockA17, blockA18;
let mobb0, mobb1, mobb2, mobb3, mobb4, mobb5, mobb6, mobb7, mobb8, mobb9, mobb10, mobb11, mobb12, mobb13, mobb14, mobb15, mobb16, mobb17, mobb18, mobb19, mobb20, mobb21, mobb22, mobb23, mobb24, mobb25, mobb26, mobb27, mobb28, mobb29, mobb30, mobb31, mobb32, mobb33, mobb34, mobb35;
let Cloud1;
let isTimeStopped = false; // 시간을 멈추기 위한 플래그
let hasExecutedCallback = false; // 충돌 콜백이 실행되었는지 여부 확인을 위한 플래그
let playerFacingLeft = false;

// ------------------------------- //
// 적 관련 함수. 
class Enemy {
    direction;
    enemyObject;

    constructor() {
        this.direction = -1;
        this.enemyObject = {};
    }

    createObject(parent, w, h, sprite) {
        this.enemyObject = parent.physics.add.sprite(w, h, sprite).setScale(1, 1);
        this.enemyObject.setVelocityX(50 * this.direction);
    }

    changeDirection() {
        this.direction *= -1;
    }

    addCollider(parent, secondObject, thirdObject) {
        parent.physics.add.collider(this.enemyObject, secondObject);
        parent.physics.add.collider(this.enemyObject, thirdObject, () => {
            this.changeDirection();
        });
    }

    collideWithPlayer(parent, player, restartFunction) {
        // 콜라이더 생성 및 크기 조절
        const collider = parent.physics.add.collider(this.enemyObject, player);
        collider.setSize(0.1, 0.1); // 너비 20, 높이 20 (적절한 값으로 조절)

        // 충돌 콜백 함수
        collider.collideCallback = () => {
            if (player.y +3 > this.enemyObject.y) {
                player_config.deathCount++;
                restartFunction(parent);
            } else {
                this.enemyObject.active = false;
                this.enemyObject.disableBody(true, true);
            }
            collider.setSize(0.01, 0.01);
        };
    }

    flipImage() {
        const currentScalesX = this.enemyObject.scaleX;
        this.enemyObject.setScale(-currentScalesX, 1);
    }
}
// 투명한 블록 생성 함수
function createTransparentBlock(parent, x, y, textureKey) {
    let transparentBlock = parent.physics.add.sprite(x, y, textureKey).setScale(1, 1);
    transparentBlock.setData('isHidden', true);
    transparentBlock.setAlpha(0);
    transparentBlock.initialAlpha = 0; // 초기 알파값 저장
    transparentBlock.setSize(32, 16);
    transparentBlock.setDisplaySize(32, 32);
    transparentBlock.setCollideWorldBounds(true);
    transparentBlock.setImmovable(true);
    transparentBlock.body.allowGravity = false;

    return transparentBlock;
}

function resetPlayerPosition(parent) {
    parent.player.setPosition(player_config.initialPosition.x, player_config.initialPosition.y);
    parent.player.setTexture('player1'); // 이미지 키값으로 변경
    parent.player.setVelocity(0, 0);
}

function playerHitBlock(player, block) {
    // 플레이어가 블록을 위로 밟았을 때 블록을 아래로 떨어뜨리는 로직
    block.body.allowGravity = true; // 블록에 중력 적용
    block.body.velocity.y = 1500; // 아래로 떨어지는 속도 설정
}

// ------------------------------- //
// 플레이어와 투명한 블록 충돌 시 동작 함수
function playerHitTransparentBlock(player, transparentBlock) {
    const playerTop = player.y - player.displayHeight;
    const blockBottom = transparentBlock.y + transparentBlock.displayHeight;
    if (playerTop <= blockBottom && transparentBlock.getData('isHidden')) {
        transparentBlock.setAlpha(1);
        transparentBlock.setSize(32, 32);
        transparentBlock.setData('isHidden', false);
    }
}
// ========================================================== //
// 이미지 로드 
function preload(){

    // Player
    this.load.image('player1', 'res/player/player1.png');
    this.load.image('player2', 'res/player/player2.png');
    this.load.image('player3', 'res/player/player3.png');
    this.load.image('player4', 'res/player/player4.png');
    this.load.image('dead', 'res/player/dead.png');

    // Item
    this.load.image('huku1', 'res/item/huku1.png')
    this.load.image('huku2', 'res/item/huku2.png')
    this.load.image('huku3', 'res/item/huku3.png')

    // ========================================================== //
    // 1 Stage
    
    // Block
    this.load.image("block1", "res/block/block1.png");
    this.load.image("block2", "res/block/block1.png");
    this.load.image("block3", "res/block/block1.png");
    this.load.image("block4", "res/block/block1.png");
    this.load.image("block5", "res/block/block1.png");
    this.load.image("block6", "res/block/block1.png");
    this.load.image("block7", "res/block/block1.png");

    // 떨어지는 블록
    this.load.image("blockA", "res/block/block1.png");
    // Snake
    this.load.image('snake1', 'res/enemy/snake1.png')
    // Mob
    this.load.image('mob2', 'res/enemy/mob2.png')

    // ========================================================== //    
    // 2 Stage
    
    // Block
    this.load.image("block8", "res/block/block8.png");
    this.load.image("block9", "res/block/block9.png");
    this.load.image("block10", "res/block/block10.png");
    this.load.image("block11", "res/block/block11.png");
    this.load.image("block12", "res/block/block12.png");
    this.load.image("block13", "res/block/block13.png");
    this.load.image("block14", "res/block/block14.png");

    this.load.image("blockB", "res/block/block8.png");
    // Snake
    this.load.image('snake2', 'res/enemy/snake2.png')
    // Mob
    this.load.image('mob3', 'res/enemy/mob3.png')    

    // ========================================================== //    
    // 3 Stage

    // Block
    this.load.image("block15", "res/block/block15.png");
    this.load.image("block16", "res/block/block16.png");
    this.load.image("block17", "res/block/block17.png");
    this.load.image("block18", "res/block/block18.png");
    this.load.image("block19", "res/block/block19.png");
    this.load.image("block20", "res/block/block20.png");
    this.load.image("block21", "res/block/block21.png");

    this.load.image("blockC", "res/block/block15.png");
    // Snake
    this.load.image('snake3', 'res/enemy/snake3.png')
    // Mob
    this.load.image('mob4', 'res/enemy/mob4.png')

    // ========================================================== //

    // 미스테리 박스
    this.load.image("blockm", "res/block/block16.png");

    // Tree
    this.load.image('tree1', 'res/bg/tree1.png')
    this.load.image('tree2', 'res/bg/tree2.png')

    // Cloud
    this.load.image('cloud1', 'res/bg/cloud1.png')
    this.load.image('cloud2', 'res/bg/cloud2.png')
    this.load.image('cloud3', 'res/bg/cloud3.png')

    // Dokan
    this.load.image('dokan1', 'res/bg/dokan1.png')
    this.load.image('dokan2', 'res/bg/dokan2.png')

    // SavePoint
    this.load.image("savepoint", "res/bg/flag9.png")

    // EndPoint
    this.load.image('endpoint', 'res/bg/flag8.png')

    // End
    this.load.image('end', 'res/bg/end.png')

    // Bush
    this.load.image('bush', 'res/bg/bush.png')

    // Heart
    this.load.image('heart', 'res/item/heart.png')

    // Kinoko(Doku)
    this.load.image('kinoko', 'res/item/kinoko1.png')
    
    // Up Mob
    this.load.image('mob1', 'res/enemy/mob1.png')


    // BGM
    this.load.audio('bgm', 'BGM/bgm.wav')
    this.load.audio('death', 'BGM/death.wav')
    this.load.audio('hintblock', 'BGM/hintBlock.wav')
    this.load.audio('humi', 'BGM/humi.wav')
    this.load.audio('jump', 'BGM/jump.wav')
}
// ========================================================== //
// 플레이어 초기 위치 설정 함수 (세이브 포인트에서 재시작)
function resetPlayerToSavePoint() {
    if (savePointCoordinates.x !== 0 && savePointCoordinates.y !== 0) {
        // 저장된 좌표가 있을 경우 해당 좌표로 플레이어 이동
        this.player.setPosition(savePointCoordinates.x, savePointCoordinates.y);
    } else {
        // 저장된 좌표가 없을 경우 초기 위치로 이동
        this.player.setPosition(player_config.initialPosition.x, player_config.initialPosition.y);
    }
}
// ========================================================== //
// 비정상 종료 강제금지
document.addEventListener("keydown", function(e) {
    // Command + R 또는 Ctrl + R 또는 F5 키를 눌렀을 때
    if ((e.metaKey || e.ctrlKey) && (e.key === "r" || e.code === "KeyR") || e.key === "F5" || e.code === "F5") {
        e.preventDefault();
    }
});

document.addEventListener("mousedown", function(e) {
    // 브라우저 오른쪽 버튼 클릭 시
    if (e.button === 2) {
        e.preventDefault();
    }
});

document.addEventListener("contextmenu", function(e) {
    // 컨텍스트 메뉴(오른쪽 클릭 메뉴) 열림 방지
    e.preventDefault();
});