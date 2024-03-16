// ================================================================== //
// 게임 코드 
// MAP 특정 코드
const map_id = 2;

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
    backgroundColor: "#F38A6E",
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

    timeText = this.add.text(670, 170, '시간: 0 초', {
        fontSize: '20px',
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
    W = 8000;
    H = game.config.height;

    // 나무
    let trees = this.physics.add.staticGroup();
    trees.create(3850, H - 78, 'tree1').setScale(1.4, 1);

    // 풀
    let bushs = this.physics.add.staticGroup();
    bushs.create(450, H - 62, 'bush');
    bushs.create(500, H - 62, 'bush');
    bushs.create(1950, H - 62, 'bush');
    bushs.create(2550, H - 62, 'bush');
    bushs.create(3800, H - 62, 'bush');

    bushs.create(4900, H - 62, 'bush');

    bushs.create(6700, H - 62, 'bush');
    
    bushs.create(7232, H - 62, 'bush');
    bushs.create(7300, H - 62, 'bush');


    // 구름, 얼굴 구름
    let clouds = this.physics.add.staticGroup();
    clouds.create(700, 450, 'cloud1').setScale(1.3, 1.1);
    clouds.create(1150, 400, 'cloud1').setScale(1.2, 1);
    clouds.create(2775, 650, 'cloud1').setScale(1.5, 1.2);
    clouds.create(1600, 400, 'cloud1').setScale(1.5, 1.2);
    clouds.create(4336, 400, 'cloud1').setScale(1.6, 1.4);    
    clouds.create(5760, 400, 'cloud2').setScale(1.7, 1.5);
    clouds.create(7397, 400, 'cloud1').setScale(1.5, 1.3);
    
    
    // Player 스프라이트 생성 및 설정
    this.player = this.physics.add.sprite(100, 700, 'player1');
    this.player.setCollideWorldBounds(false);
    this.cursors = this.input.keyboard.createCursorKeys()


    // END
    let End = this.physics.add.staticGroup();
    End.create(7824, 735, 'end').setScale(1.5, 1.5);
    let collisionCallback = function () {
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

            
            // 5초 뒤에 stage1.5.html로 이동
            this.time.delayedCall(5000, function () {
                window.location.href = 'stage2.5.html';
            }, [], this);
    
            hasExecutedCallback = true; 
        }
    };

    let collision = this.physics.add.collider(this.player, End, collisionCallback, null, this);

    // 바닥 플랫폼
    let block1 = this.add.tileSprite(0, H - 48, 1300, 32, 'block8');
    block1.setOrigin(0, 0);
    this.physics.add.existing(block1, true);

    let block2 = this.add.tileSprite(1465, H - 48, 224, 32, 'block8');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block3 = this.add.tileSprite(2850, H - 480, 800, 32, 'block8');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block4 = this.add.tileSprite(2750, H - 32, 700, 32, 'block8');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block5 = this.add.tileSprite(3870, H - 32, 900, 32, 'block8');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block6 = this.add.tileSprite(4907, H - 32, 152, 32, 'block8');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block7 = this.add.tileSprite(6190, H - 32, 700, 32, 'block8');
    block2.setOrigin(0, 0);
    this.physics.add.existing(block2, true);

    let block8 = this.add.tileSprite(7497, H - 32, 500, 32, 'block8');
    block2.setOrigin(0, 0);
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

// ================================================================== //

    // 투명한 블록
    transparentBlock1 = createTransparentBlock(this, 864, 446.5, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock1, playerHitTransparentBlock, null, this);

    transparentBlock2 = createTransparentBlock(this, 832, 716.5, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock2, playerHitTransparentBlock, null, this);
    
    transparentBlock3 = createTransparentBlock(this, 896, 716.5, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock3, playerHitTransparentBlock, null, this);

    transparentBlock4 = createTransparentBlock(this, 980, 550, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock4, playerHitTransparentBlock, null, this);

    transparentBlock5 = createTransparentBlock(this, 1325, 685, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock5, playerHitTransparentBlock, null, this);
    
    transparentBlock6 = createTransparentBlock(this, 1632, 656.5, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock6, playerHitTransparentBlock, null, this);

    transparentBlock7 = createTransparentBlock(this, 1728, 656.5, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock7, playerHitTransparentBlock, null, this);

    transparentBlock8 = createTransparentBlock(this, 3350, 200, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock8, playerHitTransparentBlock, null, this);

    transparentBlock9 = createTransparentBlock(this, 3350, 232, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock9, playerHitTransparentBlock, null, this);

    transparentBlock10 = createTransparentBlock(this, 3350, 264, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock10, playerHitTransparentBlock, null, this);

    transparentBlock11 = createTransparentBlock(this, 3350, 296, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock11, playerHitTransparentBlock, null, this);

    transparentBlock12 = createTransparentBlock(this, 3350, 328, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock12, playerHitTransparentBlock, null, this);

    transparentBlock13 = createTransparentBlock(this, 3350, 360, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock13, playerHitTransparentBlock, null, this);

    transparentBlock14 = createTransparentBlock(this, 6090, 690, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock14, playerHitTransparentBlock, null, this);

    transparentBlock15 = createTransparentBlock(this, 6122, 690, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock15, playerHitTransparentBlock, null, this);

    transparentBlock16 = createTransparentBlock(this, 6154, 690, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock16, playerHitTransparentBlock, null, this);

    transparentBlock17 = createTransparentBlock(this, 205, 600, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock17, playerHitTransparentBlock, null, this);

    transparentBlock18 = createTransparentBlock(this, 5000, 639, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock18, playerHitTransparentBlock, null, this);

    transparentBlock19 = createTransparentBlock(this, 5000, 669, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock19, playerHitTransparentBlock, null, this);
    
    transparentBlock20 = createTransparentBlock(this, 5000, 700, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock20, playerHitTransparentBlock, null, this);

    transparentBlock21 = createTransparentBlock(this, 4910, 670, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock21, playerHitTransparentBlock, null, this);

    transparentBlock22 = createTransparentBlock(this, 5414, H - 332, 'block11').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock22, playerHitTransparentBlock, null, this);

    transparentBlock23 = createTransparentBlock(this, 5444, H - 332, 'block11').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock23, playerHitTransparentBlock, null, this);

    transparentBlock24 = createTransparentBlock(this, 5474, H - 332, 'block11').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock24, playerHitTransparentBlock, null, this);

    transparentBlock25 = createTransparentBlock(this, 5000, 609, 'block10').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock25, playerHitTransparentBlock, null, this);

// ================================================================== //
    
    let blocks = this.physics.add.staticGroup();

    blocks.create(450, H - 153.5, 'block12').refreshBody();

    blocks.create(800, H - 153.5, 'block12').refreshBody();
    blocks.create(832, H - 153.5, 'block9').refreshBody();
    blocks.create(863, H - 153.5, 'block12').refreshBody();
    
    blocks.create(864, H - 273.5, 'block9').refreshBody();

    blocks.create(896, H - 153.5, 'block9').refreshBody();
    blocks.create(927, H - 153.5, 'block12').refreshBody();

    blocks.create(1450, H - 32, 'block8').refreshBody();

    blocks.create(1600, H - 153.5, 'block12').refreshBody();
    blocks.create(1664, H - 213.5, 'block12').refreshBody();
    blocks.create(1696, H - 213.5, 'block12').refreshBody();

    blocks.create(1801, H - 32, 'block8').refreshBody();
    blocks.create(1833, H - 32, 'block8').refreshBody();
    blocks.create(1865, H - 32, 'block8').refreshBody();
    blocks.create(1897, H - 32, 'block8').refreshBody();
    blocks.create(1929, H - 32, 'block8').refreshBody();
    blocks.create(1961, H - 32, 'block8').refreshBody();
    blocks.create(1993, H - 32, 'block8').refreshBody();

    blocks.create(2128, H - 93.5, 'block12').refreshBody();
    blocks.create(2160, H - 123.5, 'block12').refreshBody();

    blocks.create(1968, H - 213.5, 'block12').refreshBody();
    blocks.create(2000, H - 213.5, 'block12').refreshBody();
    blocks.create(2128, H - 303.5, 'block12').refreshBody();
    blocks.create(2160, H - 303.5, 'block12').refreshBody();
    blocks.create(2192, H - 303.5, 'block12').refreshBody();

    blocks.create(2288, H - 213.5, 'block12').refreshBody();
    blocks.create(2320, H - 213.5, 'block12').refreshBody();

    blocks.create(2320, H - 363.5, 'block9').refreshBody();
    blocks.create(2352, H - 393.5, 'block12').refreshBody();

    blocks.create(2384, H - 32, 'block8').refreshBody();

    blocks.create(3116, H - 32, 'block8').refreshBody();
    blocks.create(3148, H - 32, 'block8').refreshBody();
    blocks.create(3180, H - 32, 'block8').refreshBody();
    blocks.create(3212, H - 32, 'block8').refreshBody();
    blocks.create(3244, H - 32, 'block8').refreshBody();
    blocks.create(3276, H - 32, 'block8').refreshBody();
    blocks.create(3308, H - 32, 'block8').refreshBody();
    blocks.create(3340, H - 32, 'block8').refreshBody();
    blocks.create(3372, H - 32, 'block8').refreshBody();
    blocks.create(3404, H - 32, 'block8').refreshBody();


    blocks.create(3212, H - 63, 'block11').refreshBody();
    blocks.create(3212, H - 95, 'block11').refreshBody();
    blocks.create(3212, H - 127, 'block11').refreshBody();

    blocks.create(3244, H - 63, 'block11').refreshBody();
    blocks.create(3244, H - 95, 'block11').refreshBody();

    blocks.create(3276, H - 63, 'block11').refreshBody();

    blocks.create(3982, H - 150, 'block11').refreshBody();
    blocks.create(4014, H - 150, 'block11').refreshBody();
    blocks.create(4046, H - 150, 'block11').refreshBody();

    blocks.create(4336, H - 32, 'block8').refreshBody();

    blocks.create(4336, H - 150, 'block11').refreshBody();
    blocks.create(4496, H - 220, 'block11').refreshBody();

    blocks.create(4656, H - 32, 'block8').refreshBody();
    
    blocks.create(4816, H - 32, 'block8').refreshBody();
    blocks.create(4996, H - 32, 'block8').refreshBody();

    blocks.create(5124, H - 122, 'block11').refreshBody();
    blocks.create(5154, H - 122, 'block11').refreshBody();
    blocks.create(5154, H - 152, 'block11').refreshBody();
    blocks.create(5184, H - 152, 'block11').refreshBody();
    blocks.create(5184, H - 182, 'block11').refreshBody();

    blocks.create(5344, H - 182, 'block11').refreshBody();

    blocks.create(5504, H - 272, 'block11').refreshBody();
    blocks.create(5504, H - 302, 'block11').refreshBody();
    blocks.create(5504, H - 332, 'block11').refreshBody();

    blocks.create(5664, H - 182, 'block11').refreshBody();
    blocks.create(5824, H - 122, 'block11').refreshBody();

    blocks.create(5824, H - 32, 'block8').refreshBody();

    blocks.create(6500, H - 152, 'block12').refreshBody();
    blocks.create(6531, H - 152, 'block12').refreshBody();

    blocks.create(6540, H - 32, 'block8').refreshBody();
    blocks.create(6571, H - 32, 'block8').refreshBody();
    blocks.create(6602, H - 32, 'block8').refreshBody();    
    
    blocks.create(6593, H - 272, 'block12').refreshBody();

    blocks.create(6632, H - 32, 'block8').refreshBody();
    blocks.create(6662, H - 32, 'block8').refreshBody();
    blocks.create(6692, H - 32, 'block8').refreshBody();
    blocks.create(6722, H - 32, 'block8').refreshBody();
    blocks.create(6752, H - 32, 'block8').refreshBody();
    blocks.create(6782, H - 32, 'block8').refreshBody();
    blocks.create(6812, H - 32, 'block8').refreshBody();
    blocks.create(6842, H - 32, 'block8').refreshBody();
    blocks.create(6872, H - 32, 'block8').refreshBody();
    blocks.create(6902, H - 32, 'block8').refreshBody();
    blocks.create(6932, H - 32, 'block8').refreshBody();
    blocks.create(6962, H - 32, 'block8').refreshBody();
    blocks.create(6992, H - 32, 'block8').refreshBody();
    blocks.create(7022, H - 32, 'block8').refreshBody();
    blocks.create(7142, H - 32, 'block8').refreshBody();
    blocks.create(7172, H - 32, 'block8').refreshBody();
    blocks.create(7202, H - 32, 'block8').refreshBody();
    blocks.create(7232, H - 32, 'block8').refreshBody();
    blocks.create(7762, H - 32, 'block8').refreshBody();
    blocks.create(7792, H - 32, 'block8').refreshBody();
    blocks.create(7822, H - 32, 'block8').refreshBody();
    blocks.create(7852, H - 32, 'block8').refreshBody();
    blocks.create(7882, H - 32, 'block8').refreshBody();
    blocks.create(7912, H - 32, 'block8').refreshBody();
    blocks.create(7942, H - 32, 'block8').refreshBody();
    blocks.create(7972, H - 32, 'block8').refreshBody();
    blocks.create(8002, H - 32, 'block8').refreshBody();

    function onPlayerBlockCollision(player, block) {
        if (block.texture.key === 'block9') {
            var hintSound = this.sound.add('hintblock');
            hintSound.play();
        }
    }
    // 충돌 감지 설정
    this.physics.add.collider(this.player, blocks, onPlayerBlockCollision, null, this);
    

    
    // 함정나무
    Trees1 = this.physics.add.sprite(600, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees1, playerHitTree, null, this);
    Trees1.setCollideWorldBounds(false);
    Trees1.body.allowGravity = false;
    Trees1.setImmovable(true);

    Trees2 = this.physics.add.sprite(2700, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees2, playerHitTree, null, this);
    Trees2.setCollideWorldBounds(false);
    Trees2.body.allowGravity = false;
    Trees2.setImmovable(true);

    Trees3 = this.physics.add.sprite(6872, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees3, playerHitTree, null, this);
    Trees3.setCollideWorldBounds(false);
    Trees3.body.allowGravity = false;
    Trees3.setImmovable(true);

    Trees4 = this.physics.add.sprite(1000, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees4, playerHitTree, null, this);
    Trees4.setCollideWorldBounds(false);
    Trees4.body.allowGravity = false;
    Trees4.setImmovable(true);

    // 함정구름
    Cloud1 = this.physics.add.sprite(300, 500, 'cloud1').setScale(1, 0.9);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    Cloud1 = this.physics.add.sprite(1792, H - 333.5, 'cloud1').setScale(1.2, 0.9);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    Cloud1 = this.physics.add.sprite(2500, 550, 'cloud1').setScale(1.5, 1.2);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    Cloud1 = this.physics.add.sprite(3300, 450, 'cloud1').setScale(1.2, 0.9);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    Cloud1 = this.physics.add.sprite(3700, 550, 'cloud1').setScale(1.2, 1);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    Cloud1 = this.physics.add.sprite(5000, 400, 'cloud1').setScale(1.5, 1.2);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    Cloud1 = this.physics.add.sprite(6750, 500, 'cloud1').setScale(1.6, 1.4);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    // 토관
    blocks.create(1792, 690, 'dokan1').refreshBody();
    blocks.create(1792, H - 91.5, 'dokan2').setScale(1, 3).refreshBody();
    
    blocks.create(2900, 719, 'dokan1').refreshBody();
    blocks.create(2900, H - 77, 'dokan2').setScale(1, 2).refreshBody();

    blocks.create(3600, 719, 'dokan1').refreshBody();
    blocks.create(3600, H - 77.3, 'dokan2').setScale(1, 2).refreshBody();

    blocks.create(6200, 690, 'dokan1').refreshBody();
    blocks.create(6200, H - 91.5, 'dokan2').setScale(1, 3).refreshBody();

    blocks.create(6350, 719, 'dokan1').refreshBody();
    blocks.create(6350, H - 77.3, 'dokan2').setScale(1, 2).refreshBody();


    // 세이브 포인트 생성
    savePoint = this.physics.add.sprite(4026, 638, 'savepoint').setScale(1, 1.2);
    savePoint.setCollideWorldBounds(true);

    // 세이브 포인트와 플레이어의 충돌 감지
    this.physics.add.collider(this.player, savePoint, savePlayerPosition, null, this);
    this.physics.add.overlap(this.player, savePoint, savePlayerPosition, null, this);
    savePoint.setCollideWorldBounds(false);
    savePoint.body.allowGravity = false;
    savePoint.setImmovable(true);

    // End Point
    let EndPoint = this.physics.add.staticGroup();
    EndPoint.create(7500, 757, 'endpoint').setScale(1, 1.2).refreshBody();


// ================================================================== //

    // 그냥 보이는 블록 (No 밟음)
    let noblock = this.physics.add.staticGroup();
    noblock.create(600, H - 153.5, 'block12').refreshBody();
    noblock.create(4496, H - 32, 'block8').refreshBody();

    noblock.create(5504, H - 182, 'block11').refreshBody();
    noblock.create(5504, H - 212, 'block11').refreshBody();
    noblock.create(5504, H - 242, 'block11').refreshBody();
    noblock.create(5504, H - 122, 'block11').refreshBody();
    noblock.create(5504, H - 152, 'block11').refreshBody();

    noblock.create(7052, H - 32, 'block8').refreshBody();
    noblock.create(7082, H - 32, 'block8').refreshBody();
    noblock.create(7112, H - 32, 'block8').refreshBody();


// ================================================================== //

    // 떨어지는 블록
    blockA1 = this.physics.add.sprite(1705, H - 32, 'block8');
    blockA1.setCollideWorldBounds(false);
    blockA1.body.allowGravity = false;
    blockA1.setImmovable(true);

    blockA2 = this.physics.add.sprite(1737, H - 32, 'block8');
    blockA2.setCollideWorldBounds(false);
    blockA2.body.allowGravity = false;
    blockA2.setImmovable(true);

    blockA3 = this.physics.add.sprite(1769, H - 32, 'block8');
    blockA3.setCollideWorldBounds(false);
    blockA3.body.allowGravity = false;
    blockA3.setImmovable(true);

    blockA4 = this.physics.add.sprite(4680, H - 150, 'block11');
    blockA4.setCollideWorldBounds(false);
    blockA4.body.allowGravity = false;
    blockA4.setImmovable(true);

    blockA5 = this.physics.add.sprite(4688, H - 32, 'block8');
    blockA5.setCollideWorldBounds(false);
    blockA5.body.allowGravity = false;
    blockA5.setImmovable(true);

    blockA6 = this.physics.add.sprite(4720, H - 32, 'block8').refreshBody();
    blockA6.setCollideWorldBounds(false);
    blockA6.body.allowGravity = false;
    blockA6.setImmovable(true);

    blockA7 = this.physics.add.sprite(4752, H - 32, 'block8');
    blockA7.setCollideWorldBounds(false);
    blockA7.body.allowGravity = false;
    blockA7.setImmovable(true);

    blockA8 = this.physics.add.sprite(4784, H - 32, 'block8');
    blockA8.setCollideWorldBounds(false);
    blockA8.body.allowGravity = false;
    blockA8.setImmovable(true);

    blockA9 = this.physics.add.sprite(5504, H - 92, 'block11');
    blockA9.setCollideWorldBounds(false);
    blockA9.body.allowGravity = false;
    blockA9.setImmovable(true);

    blockA10 = this.physics.add.sprite(5474, H - 92, 'block11');
    blockA10.setCollideWorldBounds(false);
    blockA10.body.allowGravity = false;
    blockA10.setImmovable(true);

    blockA11 = this.physics.add.sprite(5534, H - 92, 'block11');
    blockA11.setCollideWorldBounds(false);
    blockA11.body.allowGravity = false;
    blockA11.setImmovable(true);

    // // 플레이어와 블록A의 충돌 감지
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

// ================================================================== //

    // 뱀
    this.e1 = new Enemy();
    this.e1.createObject(this, 440, H - 96, 'snake2');

    this.e2 = new Enemy();
    this.e2.createObject(this, 570, H - 96, 'snake2');
    
    this.e3 = new Enemy();
    this.e3.createObject(this, 1100, H - 96, 'snake2');

    this.e4 = new Enemy();
    this.e4.createObject(this, 1250, H - 96, 'snake2');

    this.e5 = new Enemy();
    this.e5.createObject(this, 3000, H - 96, 'snake2');

    this.e6 = new Enemy();
    this.e6.createObject(this, 3500, H - 96, 'snake2');

    this.e7 = new Enemy();
    this.e7.createObject(this, 4150, H - 96, 'snake2');

    this.e8 = new Enemy();
    this.e8.createObject(this, 4300, H - 96, 'snake2');

    this.e9 = new Enemy();
    this.e9.createObject(this, 4880, H - 96, 'snake2');

    this.e10 = new Enemy();
    this.e10.createObject(this, 6000, H - 96, 'snake2');

    this.e11 = new Enemy();
    this.e11.createObject(this, 6150, H - 96, 'snake2');

    this.e12 = new Enemy();
    this.e12.createObject(this, 2800, H - 96, 'snake2');
    this.e13 = new Enemy();
    this.e13.createObject(this, 2600, H - 96, 'snake2');

    // Mob
    mobb1 = this.physics.add.sprite(3000, 20, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb1, playerHitMob, null, this);
    mobb1.body.allowGravity = false;
    mobb1.setImmovable(true);

    mobb2 = this.physics.add.sprite(3900, 260, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb2, playerHitMob, null, this);
    mobb2.body.allowGravity = false;
    mobb2.setImmovable(true);

    mobb3 = this.physics.add.sprite(4656, 178, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb3, playerHitMob, null, this);
    mobb3.body.allowGravity = false;
    mobb3.setImmovable(true);

    mobb4 = this.physics.add.sprite(5424, 210, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb4, playerHitMob, null, this);
    mobb4.body.allowGravity = false;
    mobb4.setImmovable(true);

    mobb5 = this.physics.add.sprite(7000, 260, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb5, playerHitMob, null, this);
    mobb5.body.allowGravity = false;
    mobb5.setImmovable(true);

    mobb6 = this.physics.add.sprite(305, 260, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb6, playerHitMob, null, this);
    mobb6.body.allowGravity = false;
    mobb6.setImmovable(true);

    mobb7 = this.physics.add.sprite(1400, 260, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb7, playerHitMob, null, this);
    mobb7.body.allowGravity = false;
    mobb7.setImmovable(true);

    mobb8 = this.physics.add.sprite(1792, 1000, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb8, playerHitMob, null, this);
    mobb8.body.allowGravity = false;
    mobb8.setImmovable(true);

    mobb9 = this.physics.add.sprite(2355, 260, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb9, playerHitMob, null, this);
    mobb9.body.allowGravity = false;
    mobb9.setImmovable(true);

    mobb10 = this.physics.add.sprite(3160, 1000, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb10, playerHitMob, null, this);
    mobb10.body.allowGravity = false;
    mobb10.setImmovable(true);

    mobb11 = this.physics.add.sprite(1304, 1000, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb11, playerHitMob, null, this);
    mobb11.body.allowGravity = false;
    mobb11.setImmovable(true);

    mobb12 = this.physics.add.sprite(2255, 1000, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb12, playerHitMob, null, this);
    mobb12.body.allowGravity = false;
    mobb12.setImmovable(true);

    mobb13 = this.physics.add.sprite(3700, 260, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb13, playerHitMob, null, this);
    mobb13.body.allowGravity = false;
    mobb13.setImmovable(true);

    mobb14 = this.physics.add.sprite(4200, 1000, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb14, playerHitMob, null, this);
    mobb14.body.allowGravity = false;
    mobb14.setImmovable(true);

    mobb15 = this.physics.add.sprite(4336, 260, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb15, playerHitMob, null, this);
    mobb15.body.allowGravity = false;
    mobb15.setImmovable(true);

    mobb16 = this.physics.add.sprite(6430, 260, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb16, playerHitMob, null, this);
    mobb16.body.allowGravity = false;
    mobb16.setImmovable(true);

    mobb17 = this.physics.add.sprite(6700, 1000, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb17, playerHitMob, null, this);
    mobb17.body.allowGravity = false;
    mobb17.setImmovable(true);

    mobb18 = this.physics.add.sprite(7280, 260, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb18, playerHitMob, null, this);
    mobb18.body.allowGravity = false;
    mobb18.setImmovable(true);

    mobb19 = this.physics.add.sprite(205, 1000, 'mob3').refreshBody();
    this.physics.add.collider(this.player, mobb19, playerHitMob, null, this);
    mobb19.body.allowGravity = false;
    mobb19.setImmovable(true);
// ================================================================== //

    // Platforms
    this.physics.add.collider(platforms, this.player);
    // this.physics.add.collider(platforms, kinoko);
    this.physics.add.collider(platforms, blocks);

    // Blocks
    // this.physics.add.collider(blocks, kinoko);
    this.physics.add.collider(blocks, this.player);

    // Player
    this.physics.add.collider(this.player, blocks);
    // this.physics.add.overlap(this.player, kinoko, eatKinoko, null, this);

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
    this.physics.add.collider(this.player, this.e11.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e12.enemyObject, playerHitEnemy, null, this);
    this.physics.add.collider(this.player, this.e13.enemyObject, playerHitEnemy, null, this);

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
    this.e11.addCollider(this, platforms, blocks);
    this.e12.addCollider(this, platforms, blocks);
    this.e13.addCollider(this, platforms, blocks);

    // 카메라 설정
    this.cameras.main.setBounds(0, 0, W, H);
    this.physics.world.setBounds(0, 0, W, H);
    this.cameras.main.startFollow(this.player, true, true);
    this.cameras.main.setZoom(1.5);

    // 옷 이미지 추가
    let huku1 = this.add.image(100, 200, 'huku1'); // 이미지의 키값으로 변경
    huku1.setOrigin(0, 0.5); // 이미지의 원점 설정
    huku1.setScale(0.3); // 이미지 크기 조절
    huku1.setScrollFactor(0); // 카메라에 따라 움직이지 않도록 고정
    huku1.x = 170; // 이미지의 x 위치 설정
    huku1.y = 230; // 이미지의 y 위치 설정
}
// ================================================================== //
// 뱀 초기화
function resetEnemyPosition1(enemy) {
    // 적의 초기 위치로 리셋
    enemy.enemyObject.x = 440; // 적의 초기 X 위치
    enemy.enemyObject.y = H - 96; // 적의 초기 Y 위치
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true); // 적 활성화
}
function resetEnemyPosition2(enemy) {
    enemy.enemyObject.x = 570;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition3(enemy) {
    enemy.enemyObject.x = 1100;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition4(enemy) {
    enemy.enemyObject.x = 1250;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition5(enemy) {
    enemy.enemyObject.x = 3000;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition6(enemy) {
    enemy.enemyObject.x = 3500;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition7(enemy) {
    enemy.enemyObject.x = 4150;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition8(enemy) {
    enemy.enemyObject.x = 4300;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition9(enemy) {
    enemy.enemyObject.x = 4880;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition10(enemy) {
    enemy.enemyObject.x = 6000;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition11(enemy) {
    enemy.enemyObject.x = 6150;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition12(enemy) {
    enemy.enemyObject.x = 2800;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition13(enemy) {
    enemy.enemyObject.x = 2600;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
// ================================================================== //
// 슬라임 초기화
function resetMob1(mobb1) {
    mobb1.x = 3000;
    mobb1.y = 20;
    mobb1.enableBody(true, mobb1.x, mobb1.y, true, true);
    mobb1.body.allowGravity = false;
    mobb1.setImmovable(true);
}
function resetMob2(mobb2) {
    mobb2.x = 3900;
    mobb2.y = 260;
    mobb2.enableBody(true, mobb2.x, mobb2.y, true, true);
    mobb2.body.allowGravity = false;
    mobb2.setImmovable(true);
}
function resetMob3(mobb3) {
    mobb3.x = 4656;
    mobb3.y = 178;
    mobb3.enableBody(true, mobb3.x, mobb3.y, true, true);
    mobb3.body.allowGravity = false;
    mobb3.setImmovable(true);
}
function resetMob4(mobb4) {
    mobb4.x = 5424;
    mobb4.y = 210;
    mobb4.enableBody(true, mobb4.x, mobb4.y, true, true);
    mobb4.body.allowGravity = false;
    mobb4.setImmovable(true);
}
function resetMob5(mobb5) {
    mobb5.x = 7000;
    mobb5.y = 260;
    mobb5.enableBody(true, mobb5.x, mobb5.y, true, true);
    mobb5.body.allowGravity = false;
    mobb5.setImmovable(true);
}
function resetMob6(mobb6) {
    mobb6.x = 305;
    mobb6.y = 260;
    mobb6.enableBody(true, mobb6.x, mobb6.y, true, true);
    mobb6.body.allowGravity = false;
    mobb6.setImmovable(true);
}
function resetMob7(mobb7) {
    mobb7.x = 1400;
    mobb7.y = 260;
    mobb7.enableBody(true, mobb7.x, mobb7.y, true, true);
    mobb7.body.allowGravity = false;
    mobb7.setImmovable(true);
}
function resetMob8(mobb8) {
    mobb8.x = 1792;
    mobb8.y = 1000;
    mobb8.enableBody(true, mobb8.x, mobb8.y, true, true);
    mobb8.body.allowGravity = false;
    mobb8.setImmovable(true);
}
function resetMob9(mobb9) {
    mobb9.x = 2355;
    mobb9.y = 260;
    mobb9.enableBody(true, mobb9.x, mobb9.y, true, true);
    mobb9.body.allowGravity = false;
    mobb9.setImmovable(true);
}
function resetMob10(mobb10) {
    mobb10.x = 3160;
    mobb10.y = 1000;
    mobb10.enableBody(true, mobb10.x, mobb10.y, true, true);
    mobb10.body.allowGravity = false;
    mobb10.setImmovable(true);
}
function resetMob11(mobb11) {
    mobb11.x = 1304;
    mobb11.y = 1000;
    mobb11.enableBody(true, mobb11.x, mobb11.y, true, true);
    mobb11.body.allowGravity = false;
    mobb11.setImmovable(true);
}
function resetMob12(mobb12) {
    mobb12.x = 2255;
    mobb12.y = 1000;
    mobb12.enableBody(true, mobb12.x, mobb12.y, true, true);
    mobb12.body.allowGravity = false;
    mobb12.setImmovable(true);
}
function resetMob13(mobb13) {
    mobb13.x = 3700;
    mobb13.y = 260;
    mobb13.enableBody(true, mobb13.x, mobb13.y, true, true);
    mobb13.body.allowGravity = false;
    mobb13.setImmovable(true);
}
function resetMob14(mobb14) {
    mobb14.x = 4200;
    mobb14.y = 1000;
    mobb14.enableBody(true, mobb14.x, mobb14.y, true, true);
    mobb14.body.allowGravity = false;
    mobb14.setImmovable(true);
}
function resetMob15(mobb15) {
    mobb15.x = 4336;
    mobb15.y = 260;
    mobb15.enableBody(true, mobb15.x, mobb15.y, true, true);
    mobb15.body.allowGravity = false;
    mobb15.setImmovable(true);
}
function resetMob16(mobb16) {
    mobb16.x = 6430;
    mobb16.y = 260;
    mobb16.enableBody(true, mobb16.x, mobb16.y, true, true);
    mobb16.body.allowGravity = false;
    mobb16.setImmovable(true);
}
function resetMob17(mobb17) {
    mobb17.x = 6700;
    mobb17.y = 1000;
    mobb17.enableBody(true, mobb17.x, mobb17.y, true, true);
    mobb17.body.allowGravity = false;
    mobb17.setImmovable(true);
}
function resetMob18(mobb18) {
    mobb18.x = 7280;
    mobb18.y = 260;
    mobb18.enableBody(true, mobb18.x, mobb18.y, true, true);
    mobb18.body.allowGravity = false;
    mobb18.setImmovable(true);
}
function resetMob19(mobb19) {
    mobb19.x = 205;
    mobb19.y = 1000;
    mobb19.enableBody(true, mobb19.x, mobb19.y, true, true);
    mobb19.body.allowGravity = false;
    mobb19.setImmovable(true);
}
// ================================================================== //
// 밟으면 떨어지는 블록 초기화
function resetBlockA1(blockA1) {
    blockA1.x = 1705;
    blockA1.y = H - 32;
    blockA1.enableBody(true, blockA1.x, blockA1.y, true, true);
    blockA1.body.allowGravity = false; 
    blockA1.body.velocity.y = 0;
};
function resetBlockA2(blockA2) {
    blockA2.x = 1737;
    blockA2.y = H - 32;
    blockA2.enableBody(true, blockA2.x, blockA2.y, true, true);
    blockA2.body.allowGravity = false; 
    blockA2.body.velocity.y = 0;

};
function resetBlockA3(blockA3) {
    blockA3.x = 1769;
    blockA3.y = H - 32;
    blockA3.enableBody(true, blockA3.x, blockA3.y, true, true);
    blockA3.body.allowGravity = false; 
    blockA3.body.velocity.y = 0;

};
function resetBlockA4(blockA4) {
    blockA4.x = 4680;
    blockA4.y = H - 150;
    blockA4.enableBody(true, blockA4.x, blockA4.y, true, true);
    blockA4.body.allowGravity = false; 
    blockA4.body.velocity.y = 0;

};
function resetBlockA5(blockA5) {
    blockA5.x = 4688;
    blockA5.y = H - 32;
    blockA5.enableBody(true, blockA5.x, blockA5.y, true, true);
    blockA5.body.allowGravity = false; 
    blockA5.body.velocity.y = 0;
};
function resetBlockA6(blockA6) {
    blockA6.x = 4720;
    blockA6.y = H - 32;
    blockA6.enableBody(true, blockA6.x, blockA6.y, true, true);
    blockA6.body.allowGravity = false; 
    blockA6.body.velocity.y = 0;
};
function resetBlockA7(blockA7) {
    blockA7.x = 4752;
    blockA7.y = H - 32;
    blockA7.enableBody(true, blockA7.x, blockA7.y, true, true);
    blockA7.body.allowGravity = false; 
    blockA7.body.velocity.y = 0;
};
function resetBlockA8(blockA8) {
    blockA8.x = 4784;
    blockA8.y = H - 32;
    blockA8.enableBody(true, blockA8.x, blockA8.y, true, true);
    blockA8.body.allowGravity = false; 
    blockA8.body.velocity.y = 0;
};
function resetBlockA9(blockA9) {
    blockA9.x = 5504;
    blockA9.y = H - 92;
    blockA9.enableBody(true, blockA9.x, blockA9.y, true, true);
    blockA9.body.allowGravity = false; 
    blockA9.body.velocity.y = 0;
};
function resetBlockA10(blockA10) {
    blockA10.x = 5474;
    blockA10.y = H - 92;
    blockA10.enableBody(true, blockA10.x, blockA10.y, true, true);
    blockA10.body.allowGravity = false; 
    blockA10.body.velocity.y = 0;
};
function resetBlockA11(blockA11) {
    blockA11.x = 5534;
    blockA11.y = H - 92;
    blockA11.enableBody(true, blockA11.x, blockA11.y, true, true);
    blockA11.body.allowGravity = false; 
    blockA11.body.velocity.y = 0;
};
// ================================================================== //
// 히든 블록 초기화
function resetHiddenBlock1(transparentBlock1) {
    transparentBlock1.x = 864;
    transparentBlock1.y = H - 393.5;
    transparentBlock1.alpha = transparentBlock1.initialAlpha; // 초기 알파값으로 설정
    transparentBlock1.setData('isHidden', true); // 다시 숨겨진 상태로 설정
    transparentBlock1.enableBody(true, transparentBlock1.x, transparentBlock1.y, true, true);
    transparentBlock1.body.allowGravity = false;
    transparentBlock1.body.velocity.y = 0;
}
function resetHiddenBlock2(transparentBlock2) {
    transparentBlock2.x = 832;
    transparentBlock2.y = H - 123.5;
    transparentBlock2.alpha = transparentBlock2.initialAlpha;
    transparentBlock2.setData('isHidden', true);
    transparentBlock2.enableBody(true, transparentBlock2.x, transparentBlock2.y, true, true);
    transparentBlock2.body.allowGravity = false;
    transparentBlock2.body.velocity.y = 0;
}
function resetHiddenBlock3(transparentBlock3) {
    transparentBlock3.x = 896;
    transparentBlock3.y = H - 123.5;
    transparentBlock3.alpha = transparentBlock3.initialAlpha;
    transparentBlock3.setData('isHidden', true);
    transparentBlock3.enableBody(true, transparentBlock3.x, transparentBlock3.y, true, true);
    transparentBlock3.body.allowGravity = false;
    transparentBlock3.body.velocity.y = 0;
}
function resetHiddenBlock4(transparentBlock4) {
    transparentBlock4.x = 980;
    transparentBlock4.y = 550;
    transparentBlock4.alpha = transparentBlock4.initialAlpha;
    transparentBlock4.setData('isHidden', true);
    transparentBlock4.enableBody(true, transparentBlock4.x, transparentBlock4.y, true, true);
    transparentBlock4.body.allowGravity = false;
    transparentBlock4.body.velocity.y = 0;
}
function resetHiddenBlock5(transparentBlock5) {
    transparentBlock5.x = 1325;
    transparentBlock5.y = H - 155;
    transparentBlock5.alpha = transparentBlock5.initialAlpha;
    transparentBlock5.setData('isHidden', true);
    transparentBlock5.enableBody(true, transparentBlock5.x, transparentBlock5.y, true, true);
    transparentBlock5.body.allowGravity = false;
    transparentBlock5.body.velocity.y = 0;
}
function resetHiddenBlock6(transparentBlock6) {
    transparentBlock6.x = 1632;
    transparentBlock6.y = H - 183.5;
    transparentBlock6.alpha = transparentBlock6.initialAlpha;
    transparentBlock6.setData('isHidden', true);
    transparentBlock6.enableBody(true, transparentBlock6.x, transparentBlock6.y, true, true);
    transparentBlock6.body.allowGravity = false;
    transparentBlock6.body.velocity.y = 0;
}
function resetHiddenBlock7(transparentBlock7) {
    transparentBlock7.x = 1728;
    transparentBlock7.y = H - 183.5;
    transparentBlock7.alpha = transparentBlock7.initialAlpha;
    transparentBlock7.setData('isHidden', true);
    transparentBlock7.enableBody(true, transparentBlock7.x, transparentBlock7.y, true, true);
    transparentBlock7.body.allowGravity = false;
    transparentBlock7.body.velocity.y = 0;
}
function resetHiddenBlock8(transparentBlock8) {
    transparentBlock8.x = 3350;
    transparentBlock8.y = 200;
    transparentBlock8.alpha = transparentBlock8.initialAlpha;
    transparentBlock8.setData('isHidden', true);
    transparentBlock8.enableBody(true, transparentBlock8.x, transparentBlock8.y, true, true);
    transparentBlock8.body.allowGravity = false;
    transparentBlock8.body.velocity.y = 0;
}
function resetHiddenBlock9(transparentBlock9) {
    transparentBlock9.x = 3350;
    transparentBlock9.y = 232;
    transparentBlock9.alpha = transparentBlock9.initialAlpha;
    transparentBlock9.setData('isHidden', true);
    transparentBlock9.enableBody(true, transparentBlock9.x, transparentBlock9.y, true, true);
    transparentBlock9.body.allowGravity = false;
    transparentBlock9.body.velocity.y = 0;
}
function resetHiddenBlock10(transparentBlock10) {
    transparentBlock10.x = 3350;
    transparentBlock10.y = 264;
    transparentBlock10.alpha = transparentBlock10.initialAlpha;
    transparentBlock10.setData('isHidden', true);
    transparentBlock10.enableBody(true, transparentBlock10.x, transparentBlock10.y, true, true);
    transparentBlock10.body.allowGravity = false;
    transparentBlock10.body.velocity.y = 0;
}
function resetHiddenBlock11(transparentBlock11) {
    transparentBlock11.x = 3350;
    transparentBlock11.y = 296;
    transparentBlock11.alpha = transparentBlock11.initialAlpha;
    transparentBlock11.setData('isHidden', true);
    transparentBlock11.enableBody(true, transparentBlock11.x, transparentBlock11.y, true, true);
    transparentBlock11.body.allowGravity = false;
    transparentBlock11.body.velocity.y = 0;
}
function resetHiddenBlock12(transparentBlock12) {
    transparentBlock12.x = 3350;
    transparentBlock12.y = 328;
    transparentBlock12.alpha = transparentBlock12.initialAlpha;
    transparentBlock12.setData('isHidden', true);
    transparentBlock12.enableBody(true, transparentBlock12.x, transparentBlock12.y, true, true);
    transparentBlock12.body.allowGravity = false;
    transparentBlock12.body.velocity.y = 0;
}
function resetHiddenBlock13(transparentBlock13) {
    transparentBlock13.x = 3350;
    transparentBlock13.y = 360;
    transparentBlock13.alpha = transparentBlock13.initialAlpha;
    transparentBlock13.setData('isHidden', true);
    transparentBlock13.enableBody(true, transparentBlock13.x, transparentBlock13.y, true, true);
    transparentBlock13.body.allowGravity = false;
    transparentBlock13.body.velocity.y = 0;
}
function resetHiddenBlock14(transparentBlock14) {
    transparentBlock14.x = 6090;
    transparentBlock14.y = 690;
    transparentBlock14.alpha = transparentBlock14.initialAlpha;
    transparentBlock14.setData('isHidden', true);
    transparentBlock14.enableBody(true, transparentBlock14.x, transparentBlock14.y, true, true);
    transparentBlock14.body.allowGravity = false;
    transparentBlock14.body.velocity.y = 0;
}
function resetHiddenBlock15(transparentBlock15) {
    transparentBlock15.x = 6122;
    transparentBlock15.y = 690;
    transparentBlock15.alpha = transparentBlock15.initialAlpha;
    transparentBlock15.setData('isHidden', true);
    transparentBlock15.enableBody(true, transparentBlock15.x, transparentBlock15.y, true, true);
    transparentBlock15.body.allowGravity = false;
    transparentBlock15.body.velocity.y = 0;
}
function resetHiddenBlock16(transparentBlock16) {
    transparentBlock16.x = 6154;
    transparentBlock16.y = 690;
    transparentBlock16.alpha = transparentBlock16.initialAlpha;
    transparentBlock16.setData('isHidden', true);
    transparentBlock16.enableBody(true, transparentBlock16.x, transparentBlock16.y, true, true);
    transparentBlock16.body.allowGravity = false;
    transparentBlock16.body.velocity.y = 0;
}
function resetHiddenBlock17(transparentBlock17) {
    transparentBlock17.x = 205;
    transparentBlock17.y = 630;
    transparentBlock17.alpha = transparentBlock17.initialAlpha;
    transparentBlock17.setData('isHidden', true);
    transparentBlock17.enableBody(true, transparentBlock17.x, transparentBlock17.y, true, true);
    transparentBlock17.body.allowGravity = false;
    transparentBlock17.body.velocity.y = 0;
}
function resetHiddenBlock18(transparentBlock18) {
    transparentBlock18.x = 5000;
    transparentBlock18.y = 639;
    transparentBlock18.alpha = transparentBlock18.initialAlpha;
    transparentBlock18.setData('isHidden', true);
    transparentBlock18.enableBody(true, transparentBlock18.x, transparentBlock18.y, true, true);
    transparentBlock18.body.allowGravity = false;
    transparentBlock18.body.velocity.y = 0;
}
function resetHiddenBlock19(transparentBlock19) {
    transparentBlock19.x = 5000;
    transparentBlock19.y = 669;
    transparentBlock19.alpha = transparentBlock19.initialAlpha;
    transparentBlock19.setData('isHidden', true);
    transparentBlock19.enableBody(true, transparentBlock19.x, transparentBlock19.y, true, true);
    transparentBlock19.body.allowGravity = false;
    transparentBlock19.body.velocity.y = 0;
}
function resetHiddenBlock20(transparentBlock20) {
    transparentBlock20.x = 5000;
    transparentBlock20.y = 700;
    transparentBlock20.alpha = transparentBlock20.initialAlpha;
    transparentBlock20.setData('isHidden', true);
    transparentBlock20.enableBody(true, transparentBlock20.x, transparentBlock20.y, true, true);
    transparentBlock20.body.allowGravity = false;
    transparentBlock20.body.velocity.y = 0;
}
function resetHiddenBlock21(transparentBlock21) {
    transparentBlock21.x = 4910;
    transparentBlock21.y = 670;
    transparentBlock21.alpha = transparentBlock21.initialAlpha;
    transparentBlock21.setData('isHidden', true);
    transparentBlock21.enableBody(true, transparentBlock21.x, transparentBlock21.y, true, true);
    transparentBlock21.body.allowGravity = false;
    transparentBlock21.body.velocity.y = 0;
}
function resetHiddenBlock22(transparentBlock22) {
    transparentBlock22.x = 5414;
    transparentBlock22.y = H - 332;
    transparentBlock22.alpha = transparentBlock22.initialAlpha;
    transparentBlock22.setData('isHidden', true);
    transparentBlock22.enableBody(true, transparentBlock22.x, transparentBlock22.y, true, true);
    transparentBlock22.body.allowGravity = false;
    transparentBlock22.body.velocity.y = 0;
}
function resetHiddenBlock23(transparentBlock23) {
    transparentBlock23.x = 5444;
    transparentBlock23.y = H - 332;
    transparentBlock23.alpha = transparentBlock23.initialAlpha;
    transparentBlock23.setData('isHidden', true);
    transparentBlock23.enableBody(true, transparentBlock23.x, transparentBlock23.y, true, true);
    transparentBlock23.body.allowGravity = false;
    transparentBlock23.body.velocity.y = 0;
}
function resetHiddenBlock24(transparentBlock24) {
    transparentBlock24.x = 5474;
    transparentBlock24.y = H - 332;
    transparentBlock24.alpha = transparentBlock24.initialAlpha;
    transparentBlock24.setData('isHidden', true);
    transparentBlock24.enableBody(true, transparentBlock24.x, transparentBlock24.y, true, true);
    transparentBlock24.body.allowGravity = false;
    transparentBlock24.body.velocity.y = 0;
}
function resetHiddenBlock25(transparentBlock25) {
    transparentBlock25.x = 6000;
    transparentBlock25.y = 609;
    transparentBlock25.alpha = transparentBlock25.initialAlpha;
    transparentBlock25.setData('isHidden', true);
    transparentBlock25.enableBody(true, transparentBlock25.x, transparentBlock25.y, true, true);
    transparentBlock25.body.allowGravity = false;
    transparentBlock25.body.velocity.y = 0;
}
// ================================================================== //
// 뿔나무 초기화
function resetTrees1(Trees1) {
    Trees1.x = 600;
    Trees1.y = H - 78;
    Trees1.enableBody(true, Trees1.x, Trees1.y, true, true);
    Trees1.body.allowGravity = false; 
    Trees1.body.velocity.y = 0;
};
function resetTrees2(Trees2) {
    Trees2.x = 2700;
    Trees2.y = H - 78;
    Trees2.enableBody(true, Trees2.x, Trees2.y, true, true);
    Trees2.body.allowGravity = false; 
    Trees2.body.velocity.y = 0;
};
function resetTrees3(Trees3) {
    Trees3.x = 6872;
    Trees3.y = H - 78;
    Trees3.enableBody(true, Trees3.x, Trees3.y, true, true);
    Trees3.body.allowGravity = false; 
    Trees3.body.velocity.y = 0;
};
function resetTrees4(Trees4) {
    Trees4.x = 1000;
    Trees4.y = H - 78;
    Trees4.enableBody(true, Trees4.x, Trees4.y, true, true);
    Trees4.body.allowGravity = false; 
    Trees4.body.velocity.y = 0;
};
// =================================================================== //
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
    const mobbs = [mobb1, mobb2, mobb3, mobb5, mobb6, mobb7, mobb9, mobb13, mobb15, mobb16, mobb18]; // 내려오는 슬라임
    const mobbs1 = [mobb4]; // 가까이 가야 떨어지는 슬라임
    const mobbs2 = [mobb8, mobb10, mobb11, mobb12, mobb14, mobb17, mobb19] // 올라가는 슬라임

    const playerX = this.player.x;
    const gravityValue = 800; // 중력 값
    
    // 각 몬스터에 대해 처리
    mobbs.forEach((mobb) => {
        const mobbX = mobb.x; // 몬스터의 X 좌표
    
        // 플레이어와 몬스터 간의 거리 계산
        const distance = Math.abs(playerX - mobbX);
    
        if (distance <= 100) {
            mobb.body.allowGravity = true;
            mobb.body.gravity.y = gravityValue;
        } else {
            mobb.body.allowGravity = false;
            mobb.body.gravity.y = 0;
        }
    });

    mobbs1.forEach((mobb) => {
        const mobbX = mobb.x;
        const distance = Math.abs(playerX - mobbX);
        if (distance <= 70) {
            mobb.body.allowGravity = true;
            mobb.body.gravity.y = gravityValue;
        } else {
            mobb.body.allowGravity = false;
            mobb.body.gravity.y = 0;
        }
    });

    mobbs2.forEach((mobb) => {
        const mobbX = mobb.x; // 몬스터의 X 좌표
    
        // 플레이어와 몬스터 간의 거리 계산
        const distance = Math.abs(playerX - mobbX);
    
        if (distance <= 90) {
            mobb.body.allowGravity = true;
            mobb.body.gravity.y = gravityValue;
            mobb.body.velocity.y = -900; 
        } else {
            mobb.body.allowGravity = false;
            mobb.body.gravity.y = 0;
        }
    });

// ================================================================== //

    // 적이 자동으로 움직이고 이미지를 반전시키기 위한 로직
    const enemies = [ this.e1, this.e2, this.e3, this.e4, this.e5, this.e6, this.e7, this.e8, this.e9, this.e10,
                     this.e11, this.e12, this.e13];

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

        const hitText1 = this.add.text(this.player.x + 10, this.player.y - 50, 'ㅋㅋ', { 
            fontSize: '15px', 
            fill: '#fff', 
            stroke: '#000', // 테두리 색상
            strokeThickness: 3 // 테두리 두께
        });

        this.scene.pause();

        setTimeout(() => {
            hitText1.setVisible(false);
            resetPlayerPosition(this);
            resetPlayerToSavePoint.call(this);

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
            resetEnemyPosition11(this.e11);
            resetEnemyPosition12(this.e12);
            resetEnemyPosition13(this.e13);

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
            resetMob13(mobb13)
            resetMob14(mobb14)
            resetMob15(mobb15)
            resetMob16(mobb16)
            resetMob17(mobb17)
            resetMob18(mobb18)
            resetMob19(mobb19)
            
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
            resetHiddenBlock13(transparentBlock13);
            resetHiddenBlock14(transparentBlock14);
            resetHiddenBlock15(transparentBlock15);
            resetHiddenBlock16(transparentBlock16);
            resetHiddenBlock17(transparentBlock17);
            resetHiddenBlock18(transparentBlock18);
            resetHiddenBlock19(transparentBlock19);
            resetHiddenBlock20(transparentBlock20);
            resetHiddenBlock21(transparentBlock21);
            resetHiddenBlock22(transparentBlock22);
            resetHiddenBlock23(transparentBlock23);
            resetHiddenBlock24(transparentBlock24);
            resetHiddenBlock25(transparentBlock25);

            resetTrees1(Trees1);
            resetTrees2(Trees2);
            resetTrees3(Trees3);
            resetTrees4(Trees4);

            // death 음악 정지
            deathSound.stop();

            // 배경 음악 다시 재생
            bgm.resume();
        

            this.scene.resume();
        }, 3000);
    }
}
// ================================================================== //
// 플레이어가 뱀과 충돌했을 때 실행되는 함수
function playerHitEnemy(player, enemy) {
    if (player.y + 7 > enemy.y) {
        player_config.deathCount--;
        player_config.SankedeathCount++;

        // 배경 음악을 찾아서 일시 정지
        var bgm = this.sound.get('bgm');
        bgm.pause();

        // death 음악 재생
        var deathSound = this.sound.add('death');
        deathSound.play();
        

        const hitText2 = this.add.text(player.x + 10, player.y - 50, '?', { 
            fontSize: '15px', 
            fill: '#fff', 
            stroke: '#000', // 테두리 색상
            strokeThickness: 3 // 테두리 두께
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
            resetEnemyPosition11(this.e11);
            resetEnemyPosition12(this.e12);
            resetEnemyPosition13(this.e13);

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
            resetMob13(mobb13)
            resetMob14(mobb14)
            resetMob15(mobb15)
            resetMob16(mobb16)
            resetMob17(mobb17)
            resetMob18(mobb18)
            resetMob19(mobb19)

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
            resetHiddenBlock13(transparentBlock13);
            resetHiddenBlock14(transparentBlock14);
            resetHiddenBlock15(transparentBlock15);
            resetHiddenBlock16(transparentBlock16);
            resetHiddenBlock17(transparentBlock17);
            resetHiddenBlock18(transparentBlock18);
            resetHiddenBlock19(transparentBlock19);
            resetHiddenBlock20(transparentBlock20);
            resetHiddenBlock21(transparentBlock21);
            resetHiddenBlock22(transparentBlock22);
            resetHiddenBlock23(transparentBlock23);
            resetHiddenBlock24(transparentBlock24);
            resetHiddenBlock25(transparentBlock25);

            resetTrees1(Trees1);
            resetTrees2(Trees2);
            resetTrees3(Trees3);
            resetTrees4(Trees4);

            // death 음악 정지
            deathSound.stop();

            // 배경 음악 다시 재생
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

        // 배경 음악을 찾아서 일시 정지
        var bgm = this.sound.get('bgm');
        bgm.pause();

        // death 음악 재생
        var deathSound = this.sound.add('death');
        deathSound.play();

        tree.setTexture('tree2');

        const hitText3 = this.add.text(player.x + 10, player.y - 50, '엥', { 
            fontSize: '15px', 
            fill: '#fff', 
            stroke: '#000', // 테두리 색상
            strokeThickness: 3 // 테두리 두께
        });

        this.scene.pause();

        setTimeout(() => {
            hitText3.setVisible(false);

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
            resetEnemyPosition11(this.e11);
            resetEnemyPosition12(this.e12);
            resetEnemyPosition13(this.e13);

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
            resetMob13(mobb13)
            resetMob14(mobb14)
            resetMob15(mobb15)
            resetMob16(mobb16)
            resetMob17(mobb17)
            resetMob18(mobb18)
            resetMob19(mobb19)

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
            resetHiddenBlock13(transparentBlock13);
            resetHiddenBlock14(transparentBlock14);
            resetHiddenBlock15(transparentBlock15);
            resetHiddenBlock16(transparentBlock16);
            resetHiddenBlock17(transparentBlock17);
            resetHiddenBlock18(transparentBlock18);
            resetHiddenBlock19(transparentBlock19);
            resetHiddenBlock20(transparentBlock20);
            resetHiddenBlock21(transparentBlock21);
            resetHiddenBlock22(transparentBlock22);
            resetHiddenBlock23(transparentBlock23);
            resetHiddenBlock24(transparentBlock24);
            resetHiddenBlock25(transparentBlock25);

            resetTrees1(Trees1);
            resetTrees2(Trees2);
            resetTrees3(Trees3);
            resetTrees4(Trees4);
            tree.setTexture('tree1');

            // death 음악 정지
            deathSound.stop();

            // 배경 음악 다시 재생
            bgm.resume();

            this.scene.resume();
        }, 3000);
}
// 플레이어가 슬라임과 충돌했을 때 실행되는 함수
function playerHitMob(player, mob) {
    player_config.deathCount--;
    player_config.MobdeathCount++;


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

    this.scene.pause();

    setTimeout(() => {
        hitText.setVisible(false);

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
        resetEnemyPosition11(this.e11);
        resetEnemyPosition12(this.e12);
        resetEnemyPosition13(this.e13);

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
        resetMob13(mobb13)
        resetMob14(mobb14)
        resetMob15(mobb15)
        resetMob16(mobb16)
        resetMob17(mobb17)
        resetMob18(mobb18)
        resetMob19(mobb19)

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
        resetHiddenBlock13(transparentBlock13);
        resetHiddenBlock14(transparentBlock14);
        resetHiddenBlock15(transparentBlock15);
        resetHiddenBlock16(transparentBlock16);
        resetHiddenBlock17(transparentBlock17);
        resetHiddenBlock18(transparentBlock18);
        resetHiddenBlock19(transparentBlock19);
        resetHiddenBlock20(transparentBlock20);
        resetHiddenBlock21(transparentBlock21);
        resetHiddenBlock22(transparentBlock22);
        resetHiddenBlock23(transparentBlock23);
        resetHiddenBlock24(transparentBlock24);
        resetHiddenBlock25(transparentBlock25);

        resetTrees1(Trees1);
        resetTrees2(Trees2);
        resetTrees3(Trees3);
        resetTrees4(Trees4);
        
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
        
        resetPlayerPosition(this);
        resetPlayerToSavePoint.call(this)

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
        resetEnemyPosition11(this.e11);
        resetEnemyPosition12(this.e12);
        resetEnemyPosition13(this.e13);

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
        resetMob13(mobb13)
        resetMob14(mobb14)
        resetMob15(mobb15)
        resetMob16(mobb16)
        resetMob17(mobb17)
        resetMob18(mobb18)
        resetMob19(mobb19)

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
        resetHiddenBlock13(transparentBlock13);
        resetHiddenBlock14(transparentBlock14);
        resetHiddenBlock15(transparentBlock15);
        resetHiddenBlock16(transparentBlock16);
        resetHiddenBlock17(transparentBlock17);
        resetHiddenBlock18(transparentBlock18);
        resetHiddenBlock19(transparentBlock19);
        resetHiddenBlock20(transparentBlock20);
        resetHiddenBlock21(transparentBlock21);
        resetHiddenBlock22(transparentBlock22);
        resetHiddenBlock23(transparentBlock23);
        resetHiddenBlock24(transparentBlock24);
        resetHiddenBlock25(transparentBlock25);

        resetTrees1(Trees1);
        resetTrees2(Trees2);
        resetTrees3(Trees3);
        resetTrees4(Trees4);

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

    // 세이브 포인트 이미지 없애기
    savePoint.disableBody(true, true);
}