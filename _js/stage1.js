// ================================================================== //
// 게임 코드 
// MAP 특정 코드
const map_id = 1;

// 환경설정
let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 980,
        height: 840
    },
    backgroundColor: "#049cd8",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000,
            },
        }
    },
    scene: { preload, create, update }
};

let game = new Phaser.Game(config);
// ================================================================== //
function create() {

    timeText = this.add.text(660, 170, '시간: 0 초', {
        fontSize: '15px',
        fill: '#000',
    });
    timeText.setOrigin(0);
    timeText.setScrollFactor(0);
    timeText.setPadding(10, 5);

    // 배경 음악 재생
    var music = this.sound.add('bgm');
    music.play({
        loop: true
    });

    // 소리 볼륨 조절
    music.setVolume(0.5);

    // 죽은 횟수를 화면에 표시하는 텍스트 생성
    this.deathCountText = this.add.text(320, 200, '죽은 횟수: 0', { fontSize: '20px', color: '#000' });
    this.deathCountText.setOrigin(1.4); // 텍스트의 중앙을 기준으로 배치
    this.deathCountText.setScrollFactor(0); // 카메라에 따라 움직이지 않도록 고정

    // 이미지를 생성하고 원하는 위치에 배치
    let icon = this.add.image(350, 200, 'player4'); // 이미지의 키값으로 변경
    icon.setOrigin(0, 0.5); // 이미지의 원점 설정
    icon.setScale(1.2); // 이미지 크기 조절
    icon.setScrollFactor(0); // 카메라에 따라 움직이지 않도록 고정

    // 이미지와 텍스트를 각각 원하는 위치에 배치
    icon.x = 170; // 이미지의 x 위치 설정
    icon.y = 185; // 이미지의 y 위치 설정

    this.deathCountText.x = 320; // 텍스트의 x 위치 설정
    this.deathCountText.y = 200; // 텍스트의 y 위치 설정

    // 스테이지 맵 크기 설정
    W = 6000;
    H = game.config.height;

    // 나무
    let trees = this.physics.add.staticGroup();
    trees.create(3800, H - 78, 'tree1').setScale(1.4, 1);

    // 풀
    let bushs = this.physics.add.staticGroup();
    bushs.create(650, H - 62, 'bush');
    bushs.create(550, H - 62, 'bush');
    bushs.create(1350, H - 62, 'bush');
    bushs.create(2700, H - 62, 'bush');
    bushs.create(2732, H - 62, 'bush');
    bushs.create(3750, H - 62, 'bush');
    bushs.create(4100, H - 62, 'bush');
    bushs.create(4800, H - 62, 'bush');
    bushs.create(4900, H - 62, 'bush');
    

    // 구름, 얼굴 구름
    let clouds = this.physics.add.staticGroup();
    clouds.create(900, 400, 'cloud1').setScale(1.1, 0.9);
    clouds.create(1250, 600, 'cloud2').setScale(1.4, 1.1);
    clouds.create(1600, 400, 'cloud1').setScale(1.4, 1.1);
    clouds.create(2100, 550, 'cloud2').setScale(1.3, 1.1);
    clouds.create(2500, 400, 'cloud1').setScale(1.5, 1.3);
    clouds.create(3000, 500, 'cloud1').setScale(1.4, 1.1);
    clouds.create(3650, 400, 'cloud2').setScale(1.6, 1.4);
    clouds.create(4360, 400, 'cloud1').setScale(1.4, 1.2);
    clouds.create(5100, 400, 'cloud2').setScale(1.6, 1.4);
    
    // Player 스프라이트 생성 및 설정
    this.player = this.physics.add.sprite(100, 700, 'player1');
    this.player.setCollideWorldBounds(false);
    this.cursors = this.input.keyboard.createCursorKeys()

    // END
    let End = this.physics.add.staticGroup();
    End.create(5800, 735, 'end').setScale(1.5, 1.5);
    this.physics.add.collider(this.player, End, collisionCallback, null, this);

    // 바닥 플랫폼
    let block1 = this.add.tileSprite(0, H - 48, 300, 32, 'block1');
    block1.setOrigin(0, 0);
    this.physics.add.existing(block1, true);

    let block2 = this.add.tileSprite(1201, H - 48, 277, 32, 'block1');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block3 = this.add.tileSprite(1832, H - 32, 414 , 32, 'block1');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block4 = this.add.tileSprite(2850, H - 32, 580, 32, 'block1');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block1, true);

    let block5 = this.add.tileSprite(3317, H - 32, 485, 32, 'block1');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block6 = this.add.tileSprite(3934, H - 32, 500, 32, 'block1');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block7 = this.add.tileSprite(4904, H - 32, 672, 32, 'block1');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block8 = this.add.tileSprite(5934, H - 32, 1024, 32, 'block1');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block9 = this.add.tileSprite(425, H - 48, 641.3, 32, 'block1');
    block9.setOrigin(0, 0);
    this.physics.add.existing(block1, true);

    let block10 = this.add.tileSprite(2163, H - 48, 111+103, 32, 'block1');
    block10.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    // 바닥 플로워
    let platforms = this.physics.add.staticGroup();
    platforms.add(block1);
    platforms.add(block2);
    platforms.add(block3);
    platforms.add(block4);
    platforms.add(block5);
    platforms.add(block6);
    platforms.add(block7);
    platforms.add(block8);
    platforms.add(block9);
    platforms.add(block10);

// ================================================================== //

    // 투명한 블록
    transparentBlock1 = createTransparentBlock(this, 1200, 639, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock1, playerHitTransparentBlock, null, this);

    transparentBlock2 = createTransparentBlock(this, 1200, 669, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock2, playerHitTransparentBlock, null, this);
    
    transparentBlock3 = createTransparentBlock(this, 1200, 700, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock3, playerHitTransparentBlock, null, this);

    transparentBlock4 = createTransparentBlock(this, 1200, 731, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock4, playerHitTransparentBlock, null, this);

    transparentBlock5 = createTransparentBlock(this, 2262, 570, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock5, playerHitTransparentBlock, null, this);

    transparentBlock6 = createTransparentBlock(this, 2332, 450, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock6, playerHitTransparentBlock, null, this);

    transparentBlock7 = createTransparentBlock(this, 2025, 639, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock7, playerHitTransparentBlock, null, this);

    transparentBlock8 = createTransparentBlock(this, 2025, 669, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock8, playerHitTransparentBlock, null, this);
    
    transparentBlock9 = createTransparentBlock(this, 2025, 700, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock9, playerHitTransparentBlock, null, this);

    transparentBlock10 = createTransparentBlock(this, 2025, 731, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock10, playerHitTransparentBlock, null, this);

    transparentBlock11 = createTransparentBlock(this, 1462, 566.5, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock11, playerHitTransparentBlock, null, this);

    transparentBlock12 = createTransparentBlock(this, 5255, 626.5, 'block3').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock12, playerHitTransparentBlock, null, this);

// ================================================================== //
    
    let blocks = this.physics.add.staticGroup();
    blocks.create(300, 684, 'block5').refreshBody();
    blocks.create(331.7, 684, 'block2').refreshBody();
    blocks.create(362.5, 684, 'block5').refreshBody();
    blocks.create(394.5, 684, 'block2').refreshBody();
    blocks.create(425, 684, 'block5').refreshBody();
    blocks.create(361, 565, 'block5').refreshBody();

    blocks.create(1400, H - 63.5, 'block4').refreshBody();
    blocks.create(1431, H - 63.5, 'block4').refreshBody();
    blocks.create(1431, H - 93.5, 'block4').refreshBody();
    blocks.create(1462, H - 63.5, 'block4').refreshBody();
    blocks.create(1462, H - 93.5, 'block4').refreshBody();
    blocks.create(1462, H - 123.5, 'block4').refreshBody();

    blocks.create(1641, H - 123.5, 'block4').refreshBody();
    blocks.create(1641, H - 93.5, 'block4').refreshBody();
    blocks.create(1641, H - 63.5, 'block4').refreshBody();
    blocks.create(1672, H - 63.5, 'block4').refreshBody();
    blocks.create(1672, H - 93.5, 'block4').refreshBody();
    blocks.create(1703, H - 63.5, 'block4').refreshBody();

    blocks.create(2200, 684, 'block4').refreshBody();
    blocks.create(2232, 684, 'block4').refreshBody();
    blocks.create(2262, 684, 'block4').refreshBody();

    blocks.create(2360, H - 63.5, 'block4').refreshBody();

    blocks.create(3660, H - 32, 'block1').refreshBody();

    blocks.create(4168, H - 32, 'block1').refreshBody();

    blocks.create(4200, H - 32, 'block1').refreshBody();
    blocks.create(4200, H - 64, 'block4').refreshBody();

    blocks.create(4232, H - 32, 'block1').refreshBody();
    blocks.create(4232, H - 64, 'block4').refreshBody();
    blocks.create(4232, H - 96, 'block4').refreshBody();
    
    blocks.create(4264, H - 32, 'block1').refreshBody();
    blocks.create(4264, H - 64, 'block4').refreshBody();
    blocks.create(4264, H - 96, 'block4').refreshBody();
    blocks.create(4264, H - 128, 'block4').refreshBody();

    blocks.create(4296, H - 32, 'block1').refreshBody();
    blocks.create(4296, H - 64, 'block4').refreshBody();
    blocks.create(4296, H - 96, 'block4').refreshBody();
    blocks.create(4296, H - 128, 'block4').refreshBody();
    blocks.create(4296, H - 160, 'block4').refreshBody();

    blocks.create(4328, H - 32, 'block1').refreshBody();
    blocks.create(4328, H - 64, 'block4').refreshBody();
    blocks.create(4328, H - 96, 'block4').refreshBody();
    blocks.create(4328, H - 128, 'block4').refreshBody();
    blocks.create(4328, H - 160, 'block4').refreshBody();
    blocks.create(4328, H - 192, 'block4').refreshBody();

    blocks.create(4360, H - 32, 'block1').refreshBody();
    blocks.create(4360, H - 64, 'block4').refreshBody();
    blocks.create(4360, H - 96, 'block4').refreshBody();
    blocks.create(4360, H - 128, 'block4').refreshBody();
    blocks.create(4360, H - 160, 'block4').refreshBody();
    blocks.create(4360, H - 192, 'block4').refreshBody();
    blocks.create(4360, H - 224, 'block4').refreshBody();

    blocks.create(4392, H - 32, 'block1').refreshBody();
    blocks.create(4392, H - 64, 'block4').refreshBody();
    blocks.create(4392, H - 96, 'block4').refreshBody();
    blocks.create(4392, H - 128, 'block4').refreshBody();
    blocks.create(4392, H - 160, 'block4').refreshBody();
    blocks.create(4392, H - 192, 'block4').refreshBody();
    blocks.create(4392, H - 224, 'block4').refreshBody();
    blocks.create(4392, H - 256, 'block4').refreshBody();

    blocks.create(4520, H - 32, 'block1').refreshBody();
    blocks.create(4520, H - 64, 'block4').refreshBody();
    blocks.create(4520, H - 96, 'block4').refreshBody();
    blocks.create(4520, H - 128, 'block4').refreshBody();
    blocks.create(4520, H - 160, 'block4').refreshBody();
    blocks.create(4520, H - 192, 'block4').refreshBody();
    blocks.create(4520, H - 224, 'block4').refreshBody();
    blocks.create(4520, H - 256, 'block4').refreshBody();
    blocks.create(4520, H - 288, 'block4').refreshBody();
    blocks.create(4520, H - 320, 'block4').refreshBody();
    blocks.create(4520, H - 352, 'block4').refreshBody();

    blocks.create(4552, H - 32, 'block1').refreshBody();
    blocks.create(4552, H - 64, 'block4').refreshBody();
    blocks.create(4552, H - 96, 'block4').refreshBody();
    blocks.create(4552, H - 128, 'block4').refreshBody();
    blocks.create(4552, H - 160, 'block4').refreshBody();
    blocks.create(4552, H - 192, 'block4').refreshBody();
    blocks.create(4552, H - 224, 'block4').refreshBody();
    blocks.create(4552, H - 256, 'block4').refreshBody();
    blocks.create(4552, H - 288, 'block4').refreshBody();
    blocks.create(4552, H - 320, 'block4').refreshBody();
    blocks.create(4552, H - 352, 'block4').refreshBody();

    blocks.create(5255, H - 32, 'block1').refreshBody();
    blocks.create(5255, H - 64, 'block4').refreshBody();

    function onPlayerBlockCollision(player, block) {
        if (block.texture.key === 'block2') {
            var hintSound = this.sound.add('hintblock');
            hintSound.play();
        }
    }
    // 충돌 감지 설정
    this.physics.add.collider(this.player, blocks, onPlayerBlockCollision, null, this);

    
    // 함정나무
    Trees1 = this.physics.add.sprite(2850, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees1, playerHitTree, null, this);
    Trees1.setCollideWorldBounds(false);
    Trees1.body.allowGravity = false;
    Trees1.setImmovable(true);

    Trees2 = this.physics.add.sprite(1900, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees2, playerHitTree, null, this);
    Trees2.setCollideWorldBounds(false);
    Trees2.body.allowGravity = false;
    Trees2.setImmovable(true);

    Trees3 = this.physics.add.sprite(4750, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees3, playerHitTree, null, this);
    Trees3.setCollideWorldBounds(false);
    Trees3.body.allowGravity = false;
    Trees3.setImmovable(true);

    Trees4 = this.physics.add.sprite(2970, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees4, playerHitTree, null, this);
    Trees4.setCollideWorldBounds(false);
    Trees4.body.allowGravity = false;
    Trees4.setImmovable(true);

    Trees5 = this.physics.add.sprite(3920, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees5, playerHitTree, null, this);
    Trees5.setCollideWorldBounds(false);
    Trees5.body.allowGravity = false;
    Trees5.setImmovable(true);

    // 토관
    blocks.create(700, 690, 'dokan1').refreshBody();
    blocks.create(700, H - 91.5, 'dokan2').setScale(1, 3).refreshBody();
    blocks.create(950, 690, 'dokan1').refreshBody();
    blocks.create(950, H - 91.5, 'dokan2').setScale(1, 3).refreshBody();

    blocks.create(3218, 719, 'dokan1').refreshBody();
    blocks.create(3218, H - 77.3, 'dokan2').setScale(1, 2).refreshBody();
    blocks.create(3450, 690, 'dokan1').refreshBody();
    blocks.create(3450, H - 91.5, 'dokan2').setScale(1, 3).refreshBody();

    // 함정구름
    Cloud1 = this.physics.add.sprite(300, 580, 'cloud1').setScale(0.8, 0.7);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    Cloud1 = this.physics.add.sprite(500, 500, 'cloud1').setScale(1.3, 1.1);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    // 세이브 포인트 생성
    savePoint = this.physics.add.sprite(2600, 757, 'savepoint').setScale(1, 1.2);
    savePoint.setCollideWorldBounds(true);

    // 세이브 포인트와 플레이어의 충돌 감지
    this.physics.add.collider(this.player, savePoint, savePlayerPosition, null, this);
    this.physics.add.overlap(this.player, savePoint, savePlayerPosition, null, this);
    savePoint.setCollideWorldBounds(false);
    savePoint.body.allowGravity = false;
    savePoint.setImmovable(true);

    // End Point
    let EndPoint = this.physics.add.staticGroup();
    EndPoint.create(5500, 757, 'endpoint').setScale(1, 1.2).refreshBody();

// ================================================================== //

    // 그냥 보이는 블록 (No 밟음)
    let noblock = this.physics.add.staticGroup();
    noblock.create(2500, H - 32, 'block1').refreshBody();
    noblock.create(2532, H - 32, 'block1').refreshBody();    
    noblock.create(2555, H - 32, 'block1').refreshBody();    
    noblock.create(2555, H - 32, 'block1').refreshBody();    
    noblock.create(2532, H - 32, 'block1').refreshBody();    
    noblock.create(2555, H - 32, 'block1').refreshBody();    
    noblock.create(2555, H - 32, 'block1').refreshBody();

    noblock.create(3636, H - 32, 'block1').refreshBody();
    noblock.create(3668, H - 32, 'block1').refreshBody();

    noblock.create(4424, H - 32, 'block1').refreshBody();
    noblock.create(4424, H - 64, 'block4').refreshBody();
    noblock.create(4424, H - 96, 'block4').refreshBody();
    noblock.create(4424, H - 128, 'block4').refreshBody();
    noblock.create(4424, H - 160, 'block4').refreshBody();
    noblock.create(4424, H - 192, 'block4').refreshBody();
    noblock.create(4424, H - 224, 'block4').refreshBody();
    noblock.create(4424, H - 256, 'block4').refreshBody();
    noblock.create(4424, H - 288, 'block4').refreshBody();
    
    noblock.create(4456, H - 32, 'block1').refreshBody();
    noblock.create(4456, H - 64, 'block4').refreshBody();
    noblock.create(4456, H - 96, 'block4').refreshBody();
    noblock.create(4456, H - 128, 'block4').refreshBody();
    noblock.create(4456, H - 160, 'block4').refreshBody();
    noblock.create(4456, H - 192, 'block4').refreshBody();
    noblock.create(4456, H - 224, 'block4').refreshBody();
    noblock.create(4456, H - 256, 'block4').refreshBody();
    noblock.create(4456, H - 288, 'block4').refreshBody();
    noblock.create(4456, H - 320, 'block4').refreshBody();

    noblock.create(4488, H - 32, 'block1').refreshBody();
    noblock.create(4488, H - 64, 'block4').refreshBody();
    noblock.create(4488, H - 96, 'block4').refreshBody();
    noblock.create(4488, H - 128, 'block4').refreshBody();
    noblock.create(4488, H - 160, 'block4').refreshBody();
    noblock.create(4488, H - 192, 'block4').refreshBody();
    noblock.create(4488, H - 224, 'block4').refreshBody();
    noblock.create(4488, H - 256, 'block4').refreshBody();
    noblock.create(4488, H - 288, 'block4').refreshBody();
    noblock.create(4488, H - 320, 'block4').refreshBody();
    noblock.create(4488, H - 352, 'block4').refreshBody();

// ================================================================== //

    // 떨어지는 블록
    blockA1 = this.physics.add.sprite(1066.3, H - 32, 'block1');
    blockA1.setCollideWorldBounds(false);
    blockA1.body.allowGravity = false;
    blockA1.setImmovable(true);

    blockA2 = this.physics.add.sprite(1097.3, H - 32, 'block1');
    blockA2.setCollideWorldBounds(false);
    blockA2.body.allowGravity = false;
    blockA2.setImmovable(true);

    blockA3 = this.physics.add.sprite(1128.3, H - 32, 'block1');
    blockA3.setCollideWorldBounds(false);
    blockA3.body.allowGravity = false;
    blockA3.setImmovable(true);

    blockA4 = this.physics.add.sprite(1159.3, H - 32, 'block1');
    blockA4.setCollideWorldBounds(false);
    blockA4.body.allowGravity = false;
    blockA4.setImmovable(true);

    blockA5 = this.physics.add.sprite(1190.3, H - 32, 'block1');
    blockA5.setCollideWorldBounds(false);
    blockA5.body.allowGravity = false;
    blockA5.setImmovable(true);

    blockA6 = this.physics.add.sprite(3572, H - 32, 'block1').refreshBody();
    blockA6.setCollideWorldBounds(false);
    blockA6.body.allowGravity = false;
    blockA6.setImmovable(true);

    blockA7 = this.physics.add.sprite(3604, H - 32, 'block1');
    blockA7.setCollideWorldBounds(false);
    blockA7.body.allowGravity = false;
    blockA7.setImmovable(true);

    blockA8 = this.physics.add.sprite(300, H - 32, 'block1');
    blockA8.setCollideWorldBounds(false);
    blockA8.body.allowGravity = false;
    blockA8.setImmovable(true);

    blockA9 = this.physics.add.sprite(331, H - 32, 'block1');
    blockA9.setCollideWorldBounds(false);
    blockA9.body.allowGravity = false;
    blockA9.setImmovable(true);

    blockA10 = this.physics.add.sprite(362, H - 32, 'block1');
    blockA10.setCollideWorldBounds(false);
    blockA10.body.allowGravity = false;
    blockA10.setImmovable(true);

    blockA11 = this.physics.add.sprite(392, H - 32, 'block1');
    blockA11.setCollideWorldBounds(false);
    blockA11.body.allowGravity = false;
    blockA11.setImmovable(true);

    blockA12 = this.physics.add.sprite(423, H - 32, 'block1');
    blockA12.setCollideWorldBounds(false);
    blockA12.body.allowGravity = false;
    blockA12.setImmovable(true);

    blockA13 = this.physics.add.sprite(3541, H - 32, 'block1').refreshBody();
    blockA13.setCollideWorldBounds(false);
    blockA13.body.allowGravity = false;
    blockA13.setImmovable(true);

    blockA14 = this.physics.add.sprite(3510, H - 32, 'block1').refreshBody();
    blockA14.setCollideWorldBounds(false);
    blockA14.body.allowGravity = false;
    blockA14.setImmovable(true);

    blockA15 = this.physics.add.sprite(2085, H - 32, 'block1').refreshBody();
    blockA15.setCollideWorldBounds(false);
    blockA15.body.allowGravity = false;
    blockA15.setImmovable(true);

    blockA16 = this.physics.add.sprite(2116, H - 32, 'block1').refreshBody();
    blockA16.setCollideWorldBounds(false);
    blockA16.body.allowGravity = false;
    blockA16.setImmovable(true);

    blockA17 = this.physics.add.sprite(2147, H - 32, 'block1').refreshBody();
    blockA17.setCollideWorldBounds(false);
    blockA17.body.allowGravity = false;
    blockA17.setImmovable(true);

    blockA18 = this.physics.add.sprite(2054, H - 32, 'block1').refreshBody();
    blockA18.setCollideWorldBounds(false);
    blockA18.body.allowGravity = false;
    blockA18.setImmovable(true);

    // 플레이어와 블록A의 충돌 감지
    this.physics.add.collider(this.player, blockA1, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA2, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA3, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA4, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA5, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA6, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA7, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA8, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA9, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA10, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA11, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA12, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA13, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA14, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA15, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA16, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA17, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA18, playerHitBlock, null, this);


// ================================================================== //

    // 뱀
    this.e1 = new Enemy();
    this.e1.createObject(this, 680, 777, 'snake1');

    this.e2 = new Enemy();
    this.e2.createObject(this, 780, 777, 'snake1');
    
    this.e3 = new Enemy();
    this.e3.createObject(this, 930, 777, 'snake1');

    this.e4 = new Enemy();
    this.e4.createObject(this, 2062, H - 96, 'snake1');

    this.e5 = new Enemy();
    this.e5.createObject(this, 2162, H - 96, 'snake1');

    this.e6 = new Enemy();
    this.e6.createObject(this, 2262, H - 96, 'snake1');

    this.e7 = new Enemy();
    this.e7.createObject(this, 3350, H - 96, 'snake1');

    this.e8 = new Enemy();
    this.e8.createObject(this, 4000, H - 96, 'snake1');

    this.e9 = new Enemy();
    this.e9.createObject(this, 4100, H - 96, 'snake1');

    this.e10 = new Enemy();
    this.e10.createObject(this, 5200, H - 96, 'snake1');

    // Mob
    mobb1 = this.physics.add.sprite(360, 270, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb1, playerHitMob, null, this);
    mobb1.body.allowGravity = false;
    mobb1.setImmovable(true);

    mobb2 = this.physics.add.sprite(1567, 270, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb2, playerHitMob, null, this);
    mobb2.body.allowGravity = false;
    mobb2.setImmovable(true);

    mobb3 = this.physics.add.sprite(3850, 240, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb3, playerHitMob, null, this);
    mobb3.body.allowGravity = false;
    mobb3.setImmovable(true);

    mobb4 = this.physics.add.sprite(5100, 270, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb4, playerHitMob, null, this);
    mobb4.body.allowGravity = false;
    mobb4.setImmovable(true);

    mobb5 = this.physics.add.sprite(695, 270, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb5, playerHitMob, null, this);
    mobb5.body.allowGravity = false;
    mobb5.setImmovable(true);

    mobb6 = this.physics.add.sprite(1705, 270, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb6, playerHitMob, null, this);
    mobb6.body.allowGravity = false;
    mobb6.setImmovable(true);

    mobb7 = this.physics.add.sprite(2500, 230, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb7, playerHitMob, null, this);
    mobb7.body.allowGravity = false;
    mobb7.setImmovable(true);

    mobb8 = this.physics.add.sprite(3650, 240, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb8, playerHitMob, null, this);
    mobb8.body.allowGravity = false;
    mobb8.setImmovable(true);

    mobb9 = this.physics.add.sprite(4650, 260, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb9, playerHitMob, null, this);
    mobb9.body.allowGravity = false;
    mobb9.setImmovable(true);

    mobb10 = this.physics.add.sprite(5355, 260, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb10, playerHitMob, null, this);
    mobb10.body.allowGravity = false;
    mobb10.setImmovable(true);

    mobb11 = this.physics.add.sprite(3218, 260, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb11, playerHitMob, null, this);
    mobb11.body.allowGravity = false;
    mobb11.setImmovable(true);

    mobb12 = this.physics.add.sprite(5305, 260, 'mob1').refreshBody();
    this.physics.add.collider(this.player, mobb12, playerHitMob, null, this);
    mobb12.body.allowGravity = false;
    mobb12.setImmovable(true);

// ================================================================== //

    // Platforms
    this.physics.add.collider(platforms, this.player);
    this.physics.add.collider(platforms, blocks);

    // Blocks
    this.physics.add.collider(blocks, this.player);

    // Player
    this.physics.add.collider(this.player, blocks);

    // Snake
    this.physics.add.collider(this.player, this.e1.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e2.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e3.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e4.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e5.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e6.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e7.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e8.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e9.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e10.enemyObject, playerHitEnemy, null, this);

    this.e1.addCollider(this, platforms, blocks);
    this.e2.addCollider(this, platforms, blocks);
    this.e3.addCollider(this, platforms, blocks);
    this.e4.addCollider(this, platforms, blocks);
    this.e5.addCollider(this, platforms, blocks);
    this.e6.addCollider(this, platforms, blocks);
    this.e7.addCollider(this, platforms, blocks);
    this.e8.addCollider(this, platforms, blocks);
    this.e9.addCollider(this, platforms, blocks);
    this.e10.addCollider(this, platforms, blocks);

    // 카메라 설정
    this.cameras.main.setBounds(0, 0, W, H);
    this.physics.world.setBounds(0, 0, W, H);
    this.cameras.main.startFollow(this.player, true, true);
    this.cameras.main.setZoom(1.5);

    // StartLogEvent
    recordGameAction(player_id, this.player.x, this.player.y, map_id, "game start");

}

function collisionCallback() {
    if (!hasExecutedCallback) { 
        let currentTime = this.time.now;
        let elapsedMilliseconds = currentTime - startTime; // 밀리초 단위로 경과 시간 계산
        
        // 밀리초를 분과 초로 변환
        let minutes = Math.floor(elapsedMilliseconds / (1000 * 60));
        let seconds = Math.floor((elapsedMilliseconds % (1000 * 60)) / 1000);

        // seconds를 2자리로 표현
        let formattedMinutes = String(minutes).padStart(2, '0');
        let formattedSeconds = String(seconds).padStart(2, '0');

        // 경과된 시간을 화면에 표시
        let displayTime = this.add.text(400, 250, 'Clear!!\n\n' + formattedMinutes + ' : ' + formattedSeconds, {
            fontSize: '40px',
            fill: '#fff'
        });
        displayTime.setOrigin(1.4); // 텍스트의 중앙을 기준으로 배치
        displayTime.setScrollFactor(0);
        displayTime.setOrigin(0);
        displayTime.setScrollFactor(0);
        displayTime.setPadding(10, 10);
        
        // 시간을 멈춤
        isTimeStopped = true;

        // clear Log
        recordGameAction(player_id, this.player.x, this.player.y, map_id, "game clear");
        
        // 5초 뒤에 stage1.5.html로 이동
        this.time.delayedCall(5000, function () {
            const player_id_beforeRedirect = getCookie('player_id');
            if (player_id_beforeRedirect) {
                console.log('Player ID before redirect:', player_id_beforeRedirect);
                window.location.href = 'stage1.5.html';
            } else {
                console.log('Player ID not found before redirect.');
                // player_id가 없으면 에러 처리 또는 새로 생성
            }
        }, [], this);

        hasExecutedCallback = true; 
    }
}
// ================================================================== //
// 뱀 초기화
function resetEnemyPosition1(enemy) {
    // 적의 초기 위치로 리셋
    enemy.enemyObject.x = 500; // 적의 초기 X 위치
    enemy.enemyObject.y = H - 96; // 적의 초기 Y 위치
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true); // 적 활성화
}
function resetEnemyPosition2(enemy) {
    enemy.enemyObject.x = 800;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition3(enemy) {
    enemy.enemyObject.x = 750;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition4(enemy) {
    enemy.enemyObject.x = 2062;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition5(enemy) {
    enemy.enemyObject.x = 2162;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition6(enemy) {
    enemy.enemyObject.x = 2262;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition7(enemy) {
    enemy.enemyObject.x = 3350;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition8(enemy) {
    enemy.enemyObject.x = 4100;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition9(enemy) {
    enemy.enemyObject.x = 4150;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition10(enemy) {
    enemy.enemyObject.x = 5200;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}

// 슬라임 초기화
function resetMob1(mobb1) {
    mobb1.x = 360;
    mobb1.y = 270;
    mobb1.enableBody(true, mobb1.x, mobb1.y, true, true);
    mobb1.body.allowGravity = false;
    mobb1.setImmovable(true);
}

function resetMob2(mobb2) {
    mobb2.x = 1567;
    mobb2.y = 270;
    mobb2.enableBody(true, mobb2.x, mobb2.y, true, true);
    mobb2.body.allowGravity = false;
    mobb2.setImmovable(true);
}
function resetMob3(mobb3) {
    mobb3.x = 3850;
    mobb3.y = 240;
    mobb3.enableBody(true, mobb3.x, mobb3.y, true, true);
    mobb3.body.allowGravity = false;
    mobb3.setImmovable(true);
}
function resetMob4(mobb4) {
    mobb4.x = 5100;
    mobb4.y = 265;
    mobb4.enableBody(true, mobb4.x, mobb4.y, true, true);
    mobb4.body.allowGravity = false;
    mobb4.setImmovable(true);
}

function resetMob5(mobb5) {
    mobb5.x = 695;
    mobb5.y = 270;
    mobb5.enableBody(true, mobb5.x, mobb5.y, true, true);
    mobb5.body.allowGravity = false;
    mobb5.setImmovable(true);
}

function resetMob6(mobb6) {
    mobb6.x = 1705;
    mobb6.y = 270;
    mobb6.enableBody(true, mobb6.x, mobb6.y, true, true);
    mobb6.body.allowGravity = false;
    mobb6.setImmovable(true);
}

function resetMob7(mobb7) {
    mobb7.x = 2500;
    mobb7.y = 230;
    mobb7.enableBody(true, mobb7.x, mobb7.y, true, true);
    mobb7.body.allowGravity = false;
    mobb7.setImmovable(true); 
}

function resetMob8(mobb8) {
    mobb8.x = 3650;
    mobb8.y = 240;
    mobb8.enableBody(true, mobb8.x, mobb8.y, true, true);
    mobb8.body.allowGravity = false;
    mobb8.setImmovable(true);
}

function resetMob9(mobb9) {
    mobb9.x = 4650;
    mobb9.y = 260;
    mobb9.enableBody(true, mobb9.x, mobb9.y, true, true);
    mobb9.body.allowGravity = false;
    mobb9.setImmovable(true);
}

function resetMob10(mobb10) {
    mobb10.x = 5355;
    mobb10.y = 260;
    mobb10.enableBody(true, mobb10.x, mobb10.y, true, true);
    mobb10.body.allowGravity = false;
    mobb10.setImmovable(true);
}

function resetMob11(mobb11) {
    mobb11.x = 3218;
    mobb11.y = 260;
    mobb11.enableBody(true, mobb11.x, mobb11.y, true, true);
    mobb11.body.allowGravity = false;
    mobb11.setImmovable(true);
}

function resetMob12(mobb12) {
    mobb12.x = 5305;
    mobb12.y = 260;
    mobb12.enableBody(true, mobb12.x, mobb12.y, true, true);
    mobb12.body.allowGravity = false;
    mobb12.setImmovable(true);
}
// ================================================================== //
// 밟으면 떨어지는 블록 초기화
function resetBlockA1(blockA1) {
    blockA1.x = 1066.3;
    blockA1.y = H - 32;
    blockA1.enableBody(true, blockA1.x, blockA1.y, true, true);
    blockA1.body.allowGravity = false; 
    blockA1.body.velocity.y = 0;
};
function resetBlockA2(blockA2) {
    blockA2.x = 1097.3;
    blockA2.y = H - 32;
    blockA2.enableBody(true, blockA2.x, blockA2.y, true, true);
    blockA2.body.allowGravity = false; 
    blockA2.body.velocity.y = 0;

};
function resetBlockA3(blockA3) {
    blockA3.x = 1128.3;
    blockA3.y = H - 32;
    blockA3.enableBody(true, blockA3.x, blockA3.y, true, true);
    blockA3.body.allowGravity = false; 
    blockA3.body.velocity.y = 0;

};
function resetBlockA4(blockA4) {
    blockA4.x = 1159.3;
    blockA4.y = H - 32;
    blockA4.enableBody(true, blockA4.x, blockA4.y, true, true);
    blockA4.body.allowGravity = false; 
    blockA4.body.velocity.y = 0;

};
function resetBlockA5(blockA5) {
    blockA5.x = 1190.3;
    blockA5.y = H - 32;
    blockA5.enableBody(true, blockA5.x, blockA5.y, true, true);
    blockA5.body.allowGravity = false; 
    blockA5.body.velocity.y = 0;
};
function resetBlockA6(blockA6) {
    blockA6.x = 3572;
    blockA6.y = H - 32;
    blockA6.enableBody(true, blockA6.x, blockA6.y, true, true);
    blockA6.body.allowGravity = false; 
    blockA6.body.velocity.y = 0;
};
function resetBlockA7(blockA7) {
    blockA7.x = 3604;
    blockA7.y = H - 32;
    blockA7.enableBody(true, blockA7.x, blockA7.y, true, true);
    blockA7.body.allowGravity = false; 
    blockA7.body.velocity.y = 0;
};
function resetBlockA8(blockA8) {
    blockA8.x = 300;
    blockA8.y = H - 32;
    blockA8.enableBody(true, blockA8.x, blockA8.y, true, true);
    blockA8.body.allowGravity = false; 
    blockA8.body.velocity.y = 0;
};
function resetBlockA9(blockA9) {
    blockA9.x = 331;
    blockA9.y = H - 32;
    blockA9.enableBody(true, blockA9.x, blockA9.y, true, true);
    blockA9.body.allowGravity = false; 
    blockA9.body.velocity.y = 0;
};
function resetBlockA10(blockA10) {
    blockA10.x = 362;
    blockA10.y = H - 32;
    blockA10.enableBody(true, blockA10.x, blockA10.y, true, true);
    blockA10.body.allowGravity = false; 
    blockA10.body.velocity.y = 0;
};

function resetBlockA11(blockA11) {
    blockA11.x = 393;
    blockA11.y = H - 32;
    blockA11.enableBody(true, blockA11.x, blockA11.y, true, true);
    blockA11.body.allowGravity = false; 
    blockA11.body.velocity.y = 0;
};

function resetBlockA12(blockA12) {
    blockA12.x = 420;
    blockA12.y = H - 32;
    blockA12.enableBody(true, blockA12.x, blockA12.y, true, true);
    blockA12.body.allowGravity = false; 
    blockA12.body.velocity.y = 0;
};

function resetBlockA13(blockA13) {
    blockA13.x = 3541;
    blockA13.y = H - 32;
    blockA13.enableBody(true, blockA13.x, blockA13.y, true, true);
    blockA13.body.allowGravity = false; 
    blockA13.body.velocity.y = 0;
};

function resetBlockA14(blockA14) {
    blockA14.x = 3510;
    blockA14.y = H - 32;
    blockA14.enableBody(true, blockA14.x, blockA14.y, true, true);
    blockA14.body.allowGravity = false; 
    blockA14.body.velocity.y = 0;
};

function resetBlockA15(blockA15) {
    blockA15.x = 2085;
    blockA15.y = H - 32;
    blockA15.enableBody(true, blockA15.x, blockA15.y, true, true);
    blockA15.body.allowGravity = false; 
    blockA15.body.velocity.y = 0;
};

function resetBlockA16(blockA16) {
    blockA16.x = 2116;
    blockA16.y = H - 32;
    blockA16.enableBody(true, blockA16.x, blockA16.y, true, true);
    blockA16.body.allowGravity = false; 
    blockA16.body.velocity.y = 0;
};

function resetBlockA17(blockA17) {
    blockA17.x = 2147;
    blockA17.y = H - 32;
    blockA17.enableBody(true, blockA17.x, blockA17.y, true, true);
    blockA17.body.allowGravity = false; 
    blockA17.body.velocity.y = 0;
};

function resetBlockA18(blockA18) {
    blockA18.x = 2054;
    blockA18.y = H - 32;
    blockA18.enableBody(true, blockA18.x, blockA18.y, true, true);
    blockA18.body.allowGravity = false; 
    blockA18.body.velocity.y = 0;
};
// ================================================================== //
// 히든 블록 초기화
function resetHiddenBlock1(transparentBlock1) {
    transparentBlock1.x = 1200;
    transparentBlock1.y = 639;
    transparentBlock1.alpha = transparentBlock1.initialAlpha; // 초기 알파값으로 설정
    transparentBlock1.setData('isHidden', true); // 다시 숨겨진 상태로 설정
    transparentBlock1.enableBody(true, transparentBlock1.x, transparentBlock1.y, true, true);
    transparentBlock1.body.allowGravity = false;
    transparentBlock1.body.velocity.y = 0;
}
function resetHiddenBlock2(transparentBlock2) {
    transparentBlock2.x = 1200;
    transparentBlock2.y = 669;
    transparentBlock2.alpha = transparentBlock2.initialAlpha;
    transparentBlock2.setData('isHidden', true);
    transparentBlock2.enableBody(true, transparentBlock2.x, transparentBlock2.y, true, true);
    transparentBlock2.body.allowGravity = false;
    transparentBlock2.body.velocity.y = 0;
}
function resetHiddenBlock3(transparentBlock3) {
    transparentBlock3.x = 1200;
    transparentBlock3.y = 700;
    transparentBlock3.alpha = transparentBlock3.initialAlpha;
    transparentBlock3.setData('isHidden', true);
    transparentBlock3.enableBody(true, transparentBlock3.x, transparentBlock3.y, true, true);
    transparentBlock3.body.allowGravity = false;
    transparentBlock3.body.velocity.y = 0;
}
function resetHiddenBlock4(transparentBlock4) {
    transparentBlock4.x = 1200;
    transparentBlock4.y = 731;
    transparentBlock4.alpha = transparentBlock4.initialAlpha;
    transparentBlock4.setData('isHidden', true);
    transparentBlock4.enableBody(true, transparentBlock4.x, transparentBlock4.y, true, true);
    transparentBlock4.body.allowGravity = false;
    transparentBlock4.body.velocity.y = 0;
}
function resetHiddenBlock5(transparentBlock5) {
    transparentBlock5.x = 2262;
    transparentBlock5.y = 570;
    transparentBlock5.alpha = transparentBlock5.initialAlpha;
    transparentBlock5.setData('isHidden', true);
    transparentBlock5.enableBody(true, transparentBlock5.x, transparentBlock5.y, true, true);
    transparentBlock5.body.allowGravity = false;
    transparentBlock5.body.velocity.y = 0;
}
function resetHiddenBlock6(transparentBlock6) {
    transparentBlock6.x = 2332;
    transparentBlock6.y = 450;
    transparentBlock6.alpha = transparentBlock6.initialAlpha;
    transparentBlock6.setData('isHidden', true);
    transparentBlock6.enableBody(true, transparentBlock6.x, transparentBlock6.y, true, true);
    transparentBlock6.body.allowGravity = false;
    transparentBlock6.body.velocity.y = 0;
}
function resetHiddenBlock7(transparentBlock7) {
    transparentBlock7.x = 2025;
    transparentBlock7.y = 639;
    transparentBlock7.alpha = transparentBlock7.initialAlpha; // 초기 알파값으로 설정
    transparentBlock7.setData('isHidden', true); // 다시 숨겨진 상태로 설정
    transparentBlock7.enableBody(true, transparentBlock7.x, transparentBlock7.y, true, true);
    transparentBlock7.body.allowGravity = false;
    transparentBlock7.body.velocity.y = 0;
}
function resetHiddenBlock8(transparentBlock8) {
    transparentBlock8.x = 2025;
    transparentBlock8.y = 669;
    transparentBlock8.alpha = transparentBlock8.initialAlpha; // 초기 알파값으로 설정
    transparentBlock8.setData('isHidden', true); // 다시 숨겨진 상태로 설정
    transparentBlock8.enableBody(true, transparentBlock8.x, transparentBlock8.y, true, true);
    transparentBlock8.body.allowGravity = false;
    transparentBlock8.body.velocity.y = 0;
}
function resetHiddenBlock9(transparentBlock9) {
    transparentBlock9.x = 2025;
    transparentBlock9.y = 700;
    transparentBlock9.alpha = transparentBlock9.initialAlpha; // 초기 알파값으로 설정
    transparentBlock9.setData('isHidden', true); // 다시 숨겨진 상태로 설정
    transparentBlock9.enableBody(true, transparentBlock9.x, transparentBlock9.y, true, true);
    transparentBlock9.body.allowGravity = false;
    transparentBlock9.body.velocity.y = 0;
}
function resetHiddenBlock10(transparentBlock10) {
    transparentBlock10.x = 2025;
    transparentBlock10.y = 731;
    transparentBlock10.alpha = transparentBlock10.initialAlpha; // 초기 알파값으로 설정
    transparentBlock10.setData('isHidden', true); // 다시 숨겨진 상태로 설정
    transparentBlock10.enableBody(true, transparentBlock10.x, transparentBlock10.y, true, true);
    transparentBlock10.body.allowGravity = false;
    transparentBlock10.body.velocity.y = 0;
}
function resetHiddenBlock11(transparentBlock11) {
    transparentBlock11.x = 1462;
    transparentBlock11.y = 566.5;
    transparentBlock11.alpha = transparentBlock11.initialAlpha; // 초기 알파값으로 설정
    transparentBlock11.setData('isHidden', true); // 다시 숨겨진 상태로 설정
    transparentBlock11.enableBody(true, transparentBlock11.x, transparentBlock11.y, true, true);
    transparentBlock11.body.allowGravity = false;
    transparentBlock11.body.velocity.y = 0;
}
function resetHiddenBlock12(transparentBlock12) {
    transparentBlock12.x = 5255;
    transparentBlock12.y = 626.5;
    transparentBlock12.alpha = transparentBlock12.initialAlpha; // 초기 알파값으로 설정
    transparentBlock12.setData('isHidden', true); // 다시 숨겨진 상태로 설정
    transparentBlock12.enableBody(true, transparentBlock12.x, transparentBlock12.y, true, true);
    transparentBlock12.body.allowGravity = false;
    transparentBlock12.body.velocity.y = 0;
}
// ================================================================== //
// 뿔나무 초기화
function resetTrees1(Trees1) {
    Trees1.x = 2850;
    Trees1.y = H - 78;
    Trees1.enableBody(true, Trees1.x, Trees1.y, true, true);
    Trees1.body.allowGravity = false; 
    Trees1.body.velocity.y = 0;
};

function resetTrees2(Trees2) {
    Trees2.x = 1900;
    Trees2.y = H - 78;
    Trees2.enableBody(true, Trees2.x, Trees2.y, true, true);
    Trees2.body.allowGravity = false; 
    Trees2.body.velocity.y = 0;
};

function resetTrees3(Trees3) {
    Trees3.x = 4750;
    Trees3.y = H - 78;
    Trees3.enableBody(true, Trees3.x, Trees3.y, true, true);
    Trees3.body.allowGravity = false; 
    Trees3.body.velocity.y = 0;
};

function resetTrees4(Trees4) {
    Trees4.x = 2970;
    Trees4.y = H - 78;
    Trees4.enableBody(true, Trees4.x, Trees4.y, true, true);
    Trees4.body.allowGravity = false; 
    Trees4.body.velocity.y = 0;
};

function resetTrees5(Trees5) {
    Trees5.x = 3920;
    Trees5.y = H - 78;
    Trees5.enableBody(true, Trees5.x, Trees5.y, true, true);
    Trees5.body.allowGravity = false; 
    Trees5.body.velocity.y = 0;
};
// ================================================================== //
// 게임 실행 함수
function update() {
    
    if (!isTimeStopped) { 
        let currentTime = this.time.now;
        let elapsedMilliseconds = currentTime - startTime;
    
        // 밀리초를 분, 초로 변환
        let minutes = Math.floor(elapsedMilliseconds / (1000 * 60));
        let seconds = Math.floor((elapsedMilliseconds % (1000 * 60)) / 1000);
    
        // 시간 형식 지정
        let formattedTime = String(minutes).padStart(2, '0') + ' : ' +
                            String(seconds).padStart(2, '0');
    
        timeText.setFontSize(25); // 텍스트의 크기를 25px로 변경, 원하는 크기로 조절 가능
        timeText.setText(formattedTime);
    }
    
    // 텍스트 내용 업데이트
    this.deathCountText.setText(`          : ${player_config.deathCount}`);

    // 플레이어 이미지가 바뀔 때마다 콜라이더도 업데이트
    if (this.cursors.left.isDown || this.cursors.right.isDown) {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-player_config.player_speed);
            this.player.anims.play('walkLeft', true);
            // 플레이어 이미지가 오른쪽을 보고 있다면 좌우 반전
            if (!playerFacingLeft) {
                this.player.setFlipX(true); // 이미지를 X축 방향으로 반전
                playerFacingLeft = true; // 이미지가 왼쪽을 보도록 설정
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(player_config.player_speed);
            this.player.anims.play('walkRight', true);
            // 플레이어 이미지가 왼쪽을 보고 있다면 좌우 반전
            if (playerFacingLeft) {
                this.player.setFlipX(false); // 이미지를 원래대로 복구
                playerFacingLeft = false; // 이미지가 오른쪽을 보도록 설정
            }
        }
    } else {
        this.player.setVelocityX(0);
        this.player.anims.stop();
    }
    
    // 플레이어가 바닥에 닿지 않으면 점프 가능
    if ((this.cursors.up.isDown || this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown) && this.player.body.touching.down) {
        this.player.setVelocityY(player_config.player_jumpspeed);
        // 플레이어가 점프하는 이미지로 변경
        this.player.setTexture('player3');
        var jumpSound = this.sound.add('jump');
        jumpSound.play();
    } else if (this.player.body.touching.down) {
        // 바닥에 닿아 있을 때 기본 이미지로 변경
        this.player.setTexture('player1');
    }
    
// ================================================================== //

    // 위에서 떨어지는 몬스터
    // 플레이어 좌표
    const mobbs = [mobb1, mobb2, mobb3, mobb4, mobb5, mobb6, mobb7, mobb8, mobb9, mobb10, mobb11, mobb12];
    // const mobbs2 = [mobb11]

    const playerX = this.player.x;
    const playerY = this.player.y;
    
    const gravityValue = 550; // 중력 값
    
    // 각 몬스터에 대해 처리
    mobbs.forEach((mobb) => {
        const mobbX = mobb.x; // 몬스터의 X 좌표
    
        // 플레이어와 몬스터 간의 거리 계산
        const distance = Math.abs(playerX - mobbX);
    
        if (distance <= 90) {
            mobb.body.allowGravity = true;
            mobb.body.gravity.y = gravityValue;
        } else {
            mobb.body.allowGravity = false;
            mobb.body.gravity.y = 0;
        }
    });

// ================================================================== //

    // 적이 자동으로 움직이고 이미지를 반전시키기 위한 로직

    const enemies = [this.e1, this.e2, this.e3, this.e4, this.e5, this.e6, this.e7, this.e8, this.e9,
                    this.e10, ];

    enemies.forEach(enemy => {
        enemy.enemyObject.setVelocityX(50 * enemy.direction);
    
        if (enemy.direction === 1) {
            enemy.enemyObject.setFlipX(false); // 이미지 원래대로
        } else {
            enemy.enemyObject.setFlipX(true); // 이미지를 X축 방향으로 반전
        }
    });
    
    // 게임 화면에서 떨어지면 게임 재시작
    if (this.player.y > this.physics.world.bounds.height) {
        player_config.deathCount--;
        player_config.FalldeathCount++;

        // 배경 음악을 찾아서 일시 정지
        var bgm = this.sound.get('bgm');
        bgm.pause();

        // death 음악 재생
        var deathSound = this.sound.add('death');
        deathSound.play();

        // FallingDeathLogEvent
        recordGameAction(player_id, this.player.x, this.player.y, map_id, "Fall deaths");

        const hitText1 = this.add.text(this.player.x + 10, this.player.y - 50, 'ㅋㅋ', { 
            fontSize: '15px', 
            fill: '#fff', 
            stroke: '#000', // 테두리 색상
            strokeThickness: 3 // 테두리 두께
        });

        // 일시정지
        this.scene.pause();
        
        // 시간 지연 함수 (3초 후에 재시작)
        setTimeout(() => {
            hitText1.setVisible(false);
            resetPlayerPosition(this); // 플레이어 위치를 초기화
            resetPlayerToSavePoint.call(this); // 세이브 포인트 좌표로 플레이어 이동    
            // 초기화
            resetEnemyPosition1(this.e1);
            resetEnemyPosition2(this.e2);
            resetEnemyPosition3(this.e3);
            resetEnemyPosition4(this.e4);
            resetEnemyPosition5(this.e5);
            resetEnemyPosition6(this.e6);
            resetEnemyPosition7(this.e7);
            resetEnemyPosition8(this.e8);
            resetEnemyPosition9(this.e9);
            resetEnemyPosition10(this.e10);

            resetMob1(mobb1)
            resetMob2(mobb2)
            resetMob3(mobb3)
            resetMob4(mobb4)
            resetMob5(mobb5)
            resetMob6(mobb6)
            resetMob7(mobb7)
            resetMob8(mobb8)
            resetMob9(mobb9)
            resetMob10(mobb10)
            resetMob11(mobb11)
            resetMob12(mobb12)
            
            resetBlockA1(blockA1);
            resetBlockA2(blockA2);
            resetBlockA3(blockA3);
            resetBlockA4(blockA4);
            resetBlockA5(blockA5);
            resetBlockA6(blockA6);
            resetBlockA7(blockA7);
            resetBlockA8(blockA8);
            resetBlockA9(blockA9);
            resetBlockA10(blockA10);
            resetBlockA11(blockA11);
            resetBlockA12(blockA12);
            resetBlockA13(blockA13);
            resetBlockA14(blockA14);
            resetBlockA15(blockA15);
            resetBlockA16(blockA16);
            resetBlockA17(blockA17);
            resetBlockA18(blockA18);



            resetHiddenBlock1(transparentBlock1);
            resetHiddenBlock2(transparentBlock2);
            resetHiddenBlock3(transparentBlock3);
            resetHiddenBlock4(transparentBlock4);
            resetHiddenBlock5(transparentBlock5);
            resetHiddenBlock6(transparentBlock6);
            resetHiddenBlock7(transparentBlock7);
            resetHiddenBlock8(transparentBlock8);
            resetHiddenBlock9(transparentBlock9);
            resetHiddenBlock10(transparentBlock10);
            resetHiddenBlock11(transparentBlock11);
            resetHiddenBlock12(transparentBlock12);


            resetTrees1(Trees1);
            resetTrees2(Trees2);
            resetTrees3(Trees3);
            resetTrees4(Trees4);
            resetTrees5(Trees5);



            // death 음악 정지
            deathSound.stop();

            // 배경 음악 다시 재생
            bgm.resume(); 

            // 일시정지 해제하여 게임 재개
            this.scene.resume();
        }, 3000); // 3초 후에 실행됩니다. 3000은 밀리초 단위로 3초를 의미합니다.

        
    }
}
// ================================================================== //
// 플레이어가 뱀과 충돌했을 때 실행되는 함수
function playerHitEnemy(player, enemy) {
    if (player.y + 7 > enemy.y) {
        
        player_config.deathCount--;
        player_config.SankedeathCount++;

        // enemyDeathLogEvent
        recordGameAction(player_id, this.player.x, this.player.y, map_id, "enemy deaths");

        var bgm = this.sound.get('bgm');
        bgm.pause();

        var deathSound = this.sound.add('death');
        deathSound.play();

        const hitText2 = this.add.text(player.x + 10, player.y - 50, '?', { 
            fontSize: '15px', 
            fill: '#fff', 
            stroke: '#000',
            strokeThickness: 3
        });

        this.scene.pause();

        setTimeout(() => {
            hitText2.setVisible(false);

            resetPlayerPosition(this);
            resetPlayerToSavePoint.call(this);

            resetEnemyPosition1(this.e1);
            resetEnemyPosition2(this.e2);
            resetEnemyPosition3(this.e3);
            resetEnemyPosition4(this.e4);
            resetEnemyPosition5(this.e5);
            resetEnemyPosition6(this.e6);
            resetEnemyPosition7(this.e7);
            resetEnemyPosition8(this.e8);
            resetEnemyPosition9(this.e9);
            resetEnemyPosition10(this.e10);

            resetMob1(mobb1);
            resetMob2(mobb2);
            resetMob3(mobb3);
            resetMob4(mobb4);
            resetMob5(mobb5);
            resetMob6(mobb6);
            resetMob7(mobb7);
            resetMob8(mobb8);
            resetMob9(mobb9);
            resetMob10(mobb10);
            resetMob11(mobb11);
            resetMob12(mobb12);

            resetBlockA1(blockA1);
            resetBlockA2(blockA2);
            resetBlockA3(blockA3);
            resetBlockA4(blockA4);
            resetBlockA5(blockA5);
            resetBlockA6(blockA6);
            resetBlockA7(blockA7);
            resetBlockA8(blockA8);
            resetBlockA9(blockA9);
            resetBlockA10(blockA10);
            resetBlockA11(blockA11);
            resetBlockA12(blockA12);
            resetBlockA13(blockA13);
            resetBlockA14(blockA14);
            resetBlockA15(blockA15);
            resetBlockA16(blockA16);
            resetBlockA17(blockA17);
            resetBlockA18(blockA18);

            resetHiddenBlock1(transparentBlock1);
            resetHiddenBlock2(transparentBlock2);
            resetHiddenBlock3(transparentBlock3);
            resetHiddenBlock4(transparentBlock4);
            resetHiddenBlock5(transparentBlock5);
            resetHiddenBlock6(transparentBlock6);
            resetHiddenBlock7(transparentBlock7);
            resetHiddenBlock8(transparentBlock8);
            resetHiddenBlock9(transparentBlock9);
            resetHiddenBlock10(transparentBlock10);
            resetHiddenBlock11(transparentBlock11);
            resetHiddenBlock12(transparentBlock12);

            resetTrees1(Trees1);
            resetTrees2(Trees2);
            resetTrees3(Trees3);
            resetTrees4(Trees4);
            resetTrees5(Trees5);

            deathSound.stop();
            bgm.resume();
            this.scene.resume();
        }, 3000);
    } else {
        var humiSound = this.sound.add('humi');
        humiSound.play();
        enemy.disableBody(true, true);
    }
}
// 플레이어가 나무와 충돌했을 때 실행되는 함수
function playerHitTree(player, tree) {
        player_config.deathCount--;
        player_config.TreedeathCount++;
        tree.setTexture('tree2');

        // TreeDeathLogEvent
        recordGameAction(player_id, this.player.x, this.player.y, map_id, "Tree deaths");
        
        // 배경 음악을 찾아서 일시 정지
        var bgm = this.sound.get('bgm');
        bgm.pause();

        // death 음악 재생
        var deathSound = this.sound.add('death');
        deathSound.play();

        const hitText3 = this.add.text(player.x + 10, player.y - 50, '엥', { 
            fontSize: '15px', 
            fill: '#fff', 
            stroke: '#000', // 테두리 색상
            strokeThickness: 3 // 테두리 두께
        });

        this.scene.pause();

        setTimeout(() => {
            hitText3.setVisible(false);
            // 초기화
            resetPlayerPosition(this);
            resetPlayerToSavePoint.call(this);

            resetEnemyPosition1(this.e1);
            resetEnemyPosition2(this.e2);
            resetEnemyPosition3(this.e3);
            resetEnemyPosition4(this.e4);
            resetEnemyPosition5(this.e5);
            resetEnemyPosition6(this.e6);
            resetEnemyPosition7(this.e7);
            resetEnemyPosition8(this.e8);
            resetEnemyPosition9(this.e9);
            resetEnemyPosition10(this.e10);

            resetMob1(mobb1)
            resetMob2(mobb2)
            resetMob3(mobb3)
            resetMob4(mobb4)
            resetMob5(mobb5)
            resetMob6(mobb6)
            resetMob7(mobb7)
            resetMob8(mobb8)
            resetMob9(mobb9)
            resetMob10(mobb10)
            resetMob11(mobb11)
            resetMob12(mobb12)

            resetBlockA1(blockA1);
            resetBlockA2(blockA2);
            resetBlockA3(blockA3);
            resetBlockA4(blockA4);
            resetBlockA5(blockA5);
            resetBlockA6(blockA6);
            resetBlockA7(blockA7);
            resetBlockA8(blockA8);
            resetBlockA9(blockA9);
            resetBlockA10(blockA10);
            resetBlockA11(blockA11);
            resetBlockA12(blockA12);
            resetBlockA13(blockA13);
            resetBlockA14(blockA14);
            resetBlockA15(blockA15);
            resetBlockA16(blockA16);
            resetBlockA17(blockA17);
            resetBlockA18(blockA18);

            resetHiddenBlock1(transparentBlock1);
            resetHiddenBlock2(transparentBlock2);
            resetHiddenBlock3(transparentBlock3);
            resetHiddenBlock4(transparentBlock4);
            resetHiddenBlock5(transparentBlock5);
            resetHiddenBlock6(transparentBlock6);
            resetHiddenBlock7(transparentBlock7);
            resetHiddenBlock8(transparentBlock8);
            resetHiddenBlock9(transparentBlock9);
            resetHiddenBlock10(transparentBlock10);
            resetHiddenBlock11(transparentBlock11);
            resetHiddenBlock12(transparentBlock12);

            resetTrees1(Trees1);
            resetTrees2(Trees2);
            resetTrees3(Trees3);
            resetTrees4(Trees4);
            resetTrees5(Trees5);

            // death 음악 정지
            deathSound.stop();

            // 배경 음악 다시 재생
            bgm.resume();

            tree.setTexture('tree1');

            this.scene.resume();
        }, 3000);

}
// 플레이어가 슬라임과 충돌했을 때 실행되는 함수
function playerHitMob(player, mob) {
    player_config.deathCount--;
    player_config.MobdeathCount++;

    // MobDeathLogEvent
    recordGameAction(player_id, this.player.x, this.player.y, map_id, "Mob deaths");

    // 배경 음악을 찾아서 일시 정지
    var bgm = this.sound.get('bgm');
    bgm.pause();

    // death 음악 재생
    var deathSound = this.sound.add('death');
    deathSound.play();

    const hitText = this.add.text(player.x + 10, player.y - 50, '?', { 
        fontSize: '15px', 
        fill: '#fff', 
        stroke: '#000', // 테두리 색상
        strokeThickness: 3 // 테두리 두께
    });

    // 일시정지
    this.scene.pause();

    // 시간 지연 함수 (3초 후에 재시작)
    setTimeout(() => {
        hitText.setVisible(false);
        // 초기화
        resetPlayerPosition(this);
        resetPlayerToSavePoint.call(this);

        resetEnemyPosition1(this.e1);
        resetEnemyPosition2(this.e2);
        resetEnemyPosition3(this.e3);
        resetEnemyPosition4(this.e4);
        resetEnemyPosition5(this.e5);
        resetEnemyPosition6(this.e6);
        resetEnemyPosition7(this.e7);
        resetEnemyPosition8(this.e8);
        resetEnemyPosition9(this.e9);
        resetEnemyPosition10(this.e10);

        resetMob1(mobb1)
        resetMob2(mobb2)
        resetMob3(mobb3)
        resetMob4(mobb4)
        resetMob5(mobb5)
        resetMob6(mobb6)
        resetMob7(mobb7)
        resetMob8(mobb8)
        resetMob9(mobb9)
        resetMob10(mobb10)
        resetMob11(mobb11)
        resetMob12(mobb12)

        resetBlockA1(blockA1);
        resetBlockA2(blockA2);
        resetBlockA3(blockA3);
        resetBlockA4(blockA4);
        resetBlockA5(blockA5);
        resetBlockA6(blockA6);
        resetBlockA7(blockA7);
        resetBlockA8(blockA8);
        resetBlockA9(blockA9);
        resetBlockA10(blockA10);
        resetBlockA11(blockA11);
        resetBlockA12(blockA12);
        resetBlockA13(blockA13);
        resetBlockA14(blockA14);
        resetBlockA15(blockA15);
        resetBlockA16(blockA16);
        resetBlockA17(blockA17);
        resetBlockA18(blockA18);

        resetHiddenBlock1(transparentBlock1);
        resetHiddenBlock2(transparentBlock2);
        resetHiddenBlock3(transparentBlock3);
        resetHiddenBlock4(transparentBlock4);
        resetHiddenBlock5(transparentBlock5);
        resetHiddenBlock6(transparentBlock6);
        resetHiddenBlock7(transparentBlock7);
        resetHiddenBlock8(transparentBlock8);
        resetHiddenBlock9(transparentBlock9);
        resetHiddenBlock10(transparentBlock10);
        resetHiddenBlock11(transparentBlock11);
        resetHiddenBlock12(transparentBlock12);

        resetTrees1(Trees1);
        resetTrees2(Trees2);
        resetTrees3(Trees3);
        resetTrees4(Trees4);
        resetTrees5(Trees5);

        // death 음악 정지
        deathSound.stop();

        // 배경 음악 다시 재생
        bgm.resume();

        
        this.scene.resume();
    }, 3000);
    

    
}
// 플레이어가 구름과 충돌했을 때 실행되는 함수
function playerHitCloud(player, cloud){
    player_config.deathCount--;
    player_config.ClouddeathCount++;
    cloud.setTexture('cloud3');

    // cloud death Log
    recordGameAction(player_id, this.player.x, this.player.y, map_id, "cloud deaths");

    // 배경 음악을 찾아서 일시 정지
    var bgm = this.sound.get('bgm');
    bgm.pause();

    // death 음악 재생
    var deathSound = this.sound.add('death');
    deathSound.play();
    
    const hitText4 = this.add.text(player.x + 10, player.y - 50, 'ㅋㅋ', { 
        fontSize: '15px', 
        fill: '#fff', 
        stroke: '#000', // 테두리 색상
        strokeThickness: 3 // 테두리 두께
    });
    this.scene.pause();
        
    setTimeout(() => {
        hitText4.setVisible(false);
        // 초기화
        resetPlayerPosition(this);
        resetPlayerToSavePoint.call(this);

        resetEnemyPosition1(this.e1);
        resetEnemyPosition2(this.e2);
        resetEnemyPosition3(this.e3);
        resetEnemyPosition4(this.e4);
        resetEnemyPosition5(this.e5);
        resetEnemyPosition6(this.e6);
        resetEnemyPosition7(this.e7);
        resetEnemyPosition8(this.e8);
        resetEnemyPosition9(this.e9);
        resetEnemyPosition10(this.e10);

        resetMob1(mobb1)
        resetMob2(mobb2)
        resetMob3(mobb3)
        resetMob4(mobb4)
        resetMob5(mobb5)
        resetMob6(mobb6)
        resetMob7(mobb7)
        resetMob8(mobb8)
        resetMob9(mobb9)
        resetMob10(mobb10)
        resetMob11(mobb11)
        resetMob12(mobb12)

        resetBlockA1(blockA1);
        resetBlockA2(blockA2);
        resetBlockA3(blockA3);
        resetBlockA4(blockA4);
        resetBlockA5(blockA5);
        resetBlockA6(blockA6);
        resetBlockA7(blockA7);
        resetBlockA8(blockA8);
        resetBlockA9(blockA9);
        resetBlockA10(blockA10);
        resetBlockA11(blockA11);
        resetBlockA12(blockA12);
        resetBlockA13(blockA13);
        resetBlockA14(blockA14);
        resetBlockA15(blockA15);
        resetBlockA16(blockA16);
        resetBlockA17(blockA17);
        resetBlockA18(blockA18);

        resetHiddenBlock1(transparentBlock1);
        resetHiddenBlock2(transparentBlock2);
        resetHiddenBlock3(transparentBlock3);
        resetHiddenBlock4(transparentBlock4);
        resetHiddenBlock5(transparentBlock5);
        resetHiddenBlock6(transparentBlock6);
        resetHiddenBlock7(transparentBlock7);
        resetHiddenBlock8(transparentBlock8);
        resetHiddenBlock9(transparentBlock9);
        resetHiddenBlock10(transparentBlock10);
        resetHiddenBlock11(transparentBlock11);
        resetHiddenBlock12(transparentBlock12);

        resetTrees1(Trees1);
        resetTrees2(Trees2);
        resetTrees3(Trees3);
        resetTrees4(Trees4);
        resetTrees5(Trees5);

        // death 음악 정지
        deathSound.stop();

        // 배경 음악 다시 재생
        bgm.resume();

        cloud.setTexture('cloud1');

        this.scene.resume();
    }, 3000);
}
// 세이브 포인트와 충돌했을 때 실행되는 함수
function savePlayerPosition(player, savePoint) {
    // 세이브 포인트의 좌표를 저장
    savePointCoordinates.x = savePoint.x;
    savePointCoordinates.y = savePoint.y;

    // save point Log
    recordGameAction(player_id, this.player.x, this.player.y, map_id, "save point");

    // 세이브 포인트 이미지 없애기
    savePoint.disableBody(true, true);
}