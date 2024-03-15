// 게임에서 사용자의 특정 행동이 발생했을 때 호출되는 함수
function recordGameAction(playerId, playerX, playerY, mapId, eventType) {
    const apiUrl = "https://js259xm2sc.execute-api.ap-northeast-2.amazonaws.com/test_stage/test";

    // 타임스탬프 생성
    const timestamp = new Date().toISOString();

    // 게임에서 전송할 JSON 데이터 구성
    const postData = {
        player_id: playerId,
        player: {
            x: playerX,
            y: playerY
        },
        map_id: mapId,
        event_type: eventType,
        timestamp: timestamp
    };

    // API Gateway로 HTTP POST 요청 보내기
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('API Gateway response:', data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
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
    this.load.image('player1', 'https://i.imgur.com/cwVGJ9P.png');
    this.load.image('player2', 'https://i.imgur.com/sKqF0NN.png');
    this.load.image('player3', 'https://i.imgur.com/WDLM02U.png');
    this.load.image('player4', 'https://i.imgur.com/gJzDW4g.png');
    this.load.image('dead', 'https://i.imgur.com/SbQBD7E.png');

    // Item
    this.load.image('huku1', 'https://i.imgur.com/kNq718y.png')
    this.load.image('huku2', 'https://i.imgur.com/E6ZZeop.png')
    this.load.image('huku3', 'https://i.imgur.com/2YSaiFn.png')

    // ========================================================== //
    // 1 Stage
    
    // Block
    this.load.image("block1", "https://i.imgur.com/YA0CBBi.png");
    this.load.image("block2", "https://i.imgur.com/uqoEVFr.png");
    this.load.image("block3", "https://i.imgur.com/wV38SJh.png");
    this.load.image("block4", "https://i.imgur.com/ttUEx6r.png");
    this.load.image("block5", "https://i.imgur.com/5GbCxw0.png");
    this.load.image("block6", "https://i.imgur.com/pzploNE.png");
    this.load.image("block7", "https://i.imgur.com/Y7BbFr1.png");

    // 떨어지는 블록
    this.load.image("blockA", "https://i.imgur.com/YA0CBBi.png");
    // Snake
    this.load.image('snake1', 'https://i.imgur.com/hB7SPMW.png')
    // Mob
    this.load.image('mob2', 'https://i.imgur.com/EMwNRKo.png')

    // ========================================================== //    
    // 2 Stage
    
    // Block
    this.load.image("block8", "https://i.imgur.com/KlZ5o4G.png");
    this.load.image("block9", "https://i.imgur.com/zhNmjPP.png");
    this.load.image("block10", "https://i.imgur.com/aawJkyv.png");
    this.load.image("block11", "https://i.imgur.com/WQ1S16s.png");
    this.load.image("block12", "https://i.imgur.com/TuM9kvg.png");
    this.load.image("block13", "https://i.imgur.com/aTSnSJU.png");
    this.load.image("block14", "https://i.imgur.com/cACgdU3.png");

    this.load.image("blockB", "https://i.imgur.com/KlZ5o4G.png");
    // Snake
    this.load.image('snake2', 'https://i.imgur.com/WnDwuHU.png')
    // Mob
    this.load.image('mob3', 'https://i.imgur.com/pkV1kyH.png')    

    // ========================================================== //    
    // 3 Stage

    // Block
    this.load.image("block15", "https://i.imgur.com/cCeVRvq.png");
    this.load.image("block16", "https://i.imgur.com/2DRl7MA.png");
    this.load.image("block17", "https://i.imgur.com/Q080tug.png");
    this.load.image("block18", "https://i.imgur.com/JS2bzB0.png");
    this.load.image("block19", "https://i.imgur.com/HnnKmNy.png");
    this.load.image("block20", "https://i.imgur.com/0Ovr3fo.png");
    this.load.image("block21", "https://i.imgur.com/oZCgH7T.png");

    this.load.image("blockC", "https://i.imgur.com/cCeVRvq.png");
    // Snake
    this.load.image('snake3', 'https://i.imgur.com/AtEgxPo.png')
    // Mob
    this.load.image('mob4', 'https://i.imgur.com/elBOCZY.png')

    // ========================================================== //

    // 미스테리 박스
    this.load.image("blockm", "https://i.imgur.com/uqoEVFr.png");

    // Tree
    this.load.image('tree1', 'https://i.imgur.com/pAa3Rm6.png')
    this.load.image('tree2', 'https://i.imgur.com/FtxyfYS.png')

    // Cloud
    this.load.image('cloud1', 'https://i.imgur.com/ufS1LDh.png')
    this.load.image('cloud2', 'https://i.imgur.com/YYgLXTP.png')
    this.load.image('cloud3', 'https://i.imgur.com/XeM90ha.png')

    // Dokan
    this.load.image('dokan1', 'https://i.imgur.com/cPQm8iV.png')
    this.load.image('dokan2', 'https://i.imgur.com/nJ5KrHh.png')

    // SavePoint
    this.load.image("savepoint", "https://i.imgur.com/zPREjQW.png")

    // EndPoint
    this.load.image('endpoint', 'https://i.imgur.com/zMJQm72.png')

    // End
    this.load.image('end', 'https://i.imgur.com/yV03vm0.png')

    // Bush
    this.load.image('bush', 'https://i.imgur.com/NM8Ol98.png')

    // Heart
    this.load.image('heart', 'https://i.imgur.com/uJdmzXn.png')

    // Kinoko(Doku)
    this.load.image('kinoko', 'https://i.imgur.com/ajaal1B.png')
    
    // Up Mob
    this.load.image('mob1', 'https://i.imgur.com/b1DICjo.png')


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