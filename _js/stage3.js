// ================================================================== //
// 게임 코드
// MAP 특정 코드
const map_id = 3;

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
    backgroundColor: "#05172d",
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
        fill: '#fff',
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
    this.deathCountText = this.add.text(320, 200, '죽은 횟수: 0', { fontSize: '20px', color: 'white' });
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
    W = 7000;
    H = game.config.height;

    // 나무
    let trees = this.physics.add.staticGroup();
    trees.create(3500, H - 78, 'tree1').setScale(1.4, 1);
    trees.create(4900, H - 78, 'tree1').setScale(1.4, 1);

    // 풀
    let bushs = this.physics.add.staticGroup();
    bushs.create(700, H - 62, 'bush');

    bushs.create(1550, H - 62, 'bush');
    bushs.create(1650, H - 62, 'bush');
    bushs.create(2800, H - 62, 'bush');


    bushs.create(3450, H - 62, 'bush');

    bushs.create(5100, H - 62, 'bush');

    bushs.create(6050, H - 62, 'bush');


    // 구름, 얼굴 구름
    let clouds = this.physics.add.staticGroup();
    clouds.create(400, 500, 'cloud1').setScale(1, 0.9);
    clouds.create(1700, 400, 'cloud1').setScale(1.2, 1);
    clouds.create(2800, 300, 'cloud2').setScale(1.5, 1.2);
    clouds.create(3224, 400, 'cloud1').setScale(1.5, 1.2);

    clouds.create(4300, 500, 'cloud2').setScale(1.2, 1);
    clouds.create(5150, 400, 'cloud1').setScale(1.6, 1.4);

    clouds.create(5760, 400, 'cloud1').setScale(1.5, 1.2);
    
    clouds.create(6250, 400, 'cloud2').setScale(1.7, 1.5);
    clouds.create(6900, 500, 'cloud1').setScale(1.5, 1.3);
    
    
    // Player 스프라이트 생성 및 설정
    this.player = this.physics.add.sprite(100, 700, 'player1');
    this.player.setCollideWorldBounds(false);
    this.cursors = this.input.keyboard.createCursorKeys()


    // END
    let End = this.physics.add.staticGroup();
    End.create(6900, 735, 'end').setScale(1.5, 1.5);
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
                window.location.href = 'stage3.5.html';
                
            }, [], this);
    
            hasExecutedCallback = true; 
        }
    };

    let collision = this.physics.add.collider(this.player, End, collisionCallback, null, this);

    // 바닥 플랫폼
    let block1 = this.add.tileSprite(0, H - 48, 1250, 32, 'block15');
    block1.setOrigin(0, 0);

    let block2 = this.add.tileSprite(1466, H - 48, 700, 32, 'block15');
    block2.setOrigin(0, 0);

    let block3 = this.add.tileSprite(1832, H - 78, 224, 32, 'block18');
    block3.setOrigin(0, 0);

    let block4 = this.add.tileSprite(1864, H - 108, 192, 32, 'block18');
    block4.setOrigin(0, 0);

    let block5 = this.add.tileSprite(1896, H - 138, 160, 32, 'block18');
    block5.setOrigin(0, 0);

    let block6 = this.add.tileSprite(1928, H - 168, 128, 32, 'block18');
    block6.setOrigin(0, 0);

    let block7 = this.add.tileSprite(1960, H - 198, 96, 32, 'block18');
    block7.setOrigin(0, 0);

    let block8 = this.add.tileSprite(1992, H - 228, 64, 32, 'block18');
    block8.setOrigin(0, 0);

    let block9 = this.add.tileSprite(2024, H - 258, 32, 32, 'block18');
    block9.setOrigin(0, 0);

    let block10 = this.add.tileSprite(2698, H - 48, 480, 32, 'block15');
    block10.setOrigin(0, 0);

    let block11 = this.add.tileSprite(3320, H - 48, 800, 32, 'block15');
    block11.setOrigin(0, 0);

    let block12 = this.add.tileSprite(3684, H - 78, 158, 32, 'block18');
    block12.setOrigin(0, 0);

    let block13 = this.add.tileSprite(3716, H - 366, 384, 32, 'block18');
    block13.setOrigin(0, 0);

    let block16 = this.add.tileSprite(4248, H - 48, 1200, 32, 'block15');
    block16.setOrigin(0, 0);

    let block17 = this.add.tileSprite(5800, H - 48, 342, 32, 'block15');
    block17.setOrigin(0, 0);

    let block18 = this.add.tileSprite(6300, H - 48, 320, 32, 'block15');
    block18.setOrigin(0, 0);

    let block19 = this.add.tileSprite(6716, H - 48, 320, 32, 'block15');
    block19.setOrigin(0, 0);


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
    platforms.add(block11);
    platforms.add(block12);
    platforms.add(block13);
    // platforms.add(block14);
    // platforms.add(block15);
    platforms.add(block16);
    platforms.add(block17);
    platforms.add(block18);
    platforms.add(block19);

// 중간의 반투명 블록 구간
let blockH1 = this.physics.add.sprite(3684, H - 110, 'block18');
blockH1.setOrigin(0, 0);
blockHs.push(blockH1); // 블록들을 배열에 추가

let blockH2 = this.physics.add.sprite(3684, H - 142, 'block18');
blockH2.setOrigin(0, 0);
blockHs.push(blockH2);

let blockH3 = this.physics.add.sprite(3716, H - 110, 'block18');
blockH3.setOrigin(0, 0);
blockHs.push(blockH3);

let blockH4 = this.physics.add.sprite(3716, H - 142, 'block18');
blockH4.setOrigin(0, 0);
blockHs.push(blockH4);

let blockH5 = this.physics.add.sprite(3748, H - 110, 'block18');
blockH5.setOrigin(0, 0);
blockHs.push(blockH5);

let blockH6 = this.physics.add.sprite(3748, H - 142, 'block18');
blockH6.setOrigin(0, 0);
blockHs.push(blockH6);

let blockH7 = this.physics.add.sprite(3780, H - 110, 'block18');
blockH7.setOrigin(0, 0);
blockHs.push(blockH7);

let blockH8 = this.physics.add.sprite(3780, H - 142, 'block18');
blockH8.setOrigin(0, 0);
blockHs.push(blockH8);

let blockH9 = this.physics.add.sprite(3812, H - 110, 'block18');
blockH9.setOrigin(0, 0);
blockHs.push(blockH9);

let blockH10 = this.physics.add.sprite(3812, H - 142, 'block18');
blockH10.setOrigin(0, 0);
blockHs.push(blockH10);

let blockH11 = this.physics.add.sprite(3812, H - 174, 'block18');
blockH11.setOrigin(0, 0);
blockHs.push(blockH11);

let blockH12 = this.physics.add.sprite(3844, H - 142, 'block18');
blockH12.setOrigin(0, 0);
blockHs.push(blockH12);

let blockH13 = this.physics.add.sprite(3844, H - 174, 'block18');
blockH13.setOrigin(0, 0);
blockHs.push(blockH13);

let blockH14 = this.physics.add.sprite(3844, H - 206, 'block18');
blockH14.setOrigin(0, 0);
blockHs.push(blockH14);

let blockH15 = this.physics.add.sprite(3844, H - 238, 'block18');
blockH15.setOrigin(0, 0);
blockHs.push(blockH15);

let blockH16 = this.physics.add.sprite(3812, H - 206, 'block18');
blockH16.setOrigin(0, 0);
blockHs.push(blockH16);

let blockH17 = this.physics.add.sprite(3812, H - 238, 'block18');
blockH17.setOrigin(0, 0);
blockHs.push(blockH17);

let blockH18 = this.physics.add.sprite(3780, H - 206, 'block18');
blockH18.setOrigin(0, 0);
blockHs.push(blockH18);

let blockH19 = this.physics.add.sprite(3780, H - 238, 'block18');
blockH19.setOrigin(0, 0);
blockHs.push(blockH19);

let blockH20 = this.physics.add.sprite(3748, H - 206, 'block18');
blockH20.setOrigin(0, 0);
blockHs.push(blockH20);

let blockH21 = this.physics.add.sprite(3748, H - 238, 'block18');
blockH21.setOrigin(0, 0);
blockHs.push(blockH21);

let blockH22 = this.physics.add.sprite(3748, H - 270, 'block18');
blockH22.setOrigin(0, 0);
blockHs.push(blockH22);

let blockH23 = this.physics.add.sprite(3748, H - 302, 'block18');
blockH23.setOrigin(0, 0);
blockHs.push(blockH23);

let blockH24 = this.physics.add.sprite(3748, H - 334, 'block18');
blockH24.setOrigin(0, 0);
blockHs.push(blockH24);

let blockH25 = this.physics.add.sprite(3716, H - 206, 'block18');
blockH25.setOrigin(0, 0);
blockHs.push(blockH25);

let blockH26 = this.physics.add.sprite(3716, H - 238, 'block18');
blockH26.setOrigin(0, 0);
blockHs.push(blockH26);

let blockH27 = this.physics.add.sprite(3716, H - 270, 'block18');
blockH27.setOrigin(0, 0);
blockHs.push(blockH27);

let blockH28 = this.physics.add.sprite(3716, H - 302, 'block18');
blockH28.setOrigin(0, 0);
blockHs.push(blockH28);

let blockH29 = this.physics.add.sprite(3716, H - 334, 'block18');
blockH29.setOrigin(0, 0);
blockHs.push(blockH29);

let blockH30 = this.physics.add.sprite(3780, H - 302, 'block18');
blockH30.setOrigin(0, 0);
blockHs.push(blockH30);

let blockH31 = this.physics.add.sprite(3780, H - 334, 'block18');
blockH31.setOrigin(0, 0);
blockHs.push(blockH31);

let blockH32 = this.physics.add.sprite(3812, H - 302, 'block18');
blockH32.setOrigin(0, 0);
blockHs.push(blockH32);

let blockH33 = this.physics.add.sprite(3812, H - 334, 'block18');
blockH33.setOrigin(0, 0);
blockHs.push(blockH33);

let blockH34 = this.physics.add.sprite(3844, H - 302, 'block18');
blockH34.setOrigin(0, 0);
blockHs.push(blockH34);

let blockH35 = this.physics.add.sprite(3844, H - 334, 'block18');
blockH35.setOrigin(0, 0);
blockHs.push(blockH35);

let blockH36 = this.physics.add.sprite(3876, H - 302, 'block18');
blockH36.setOrigin(0, 0);
blockHs.push(blockH36);

let blockH37 = this.physics.add.sprite(3876, H - 334, 'block18');
blockH37.setOrigin(0, 0);
blockHs.push(blockH37);

let blockH38 = this.physics.add.sprite(3908, H - 302, 'block18');
blockH38.setOrigin(0, 0);
blockHs.push(blockH38);

let blockH39 = this.physics.add.sprite(3908, H - 334, 'block18');
blockH39.setOrigin(0, 0);
blockHs.push(blockH39);

let blockH40 = this.physics.add.sprite(3940, H - 302, 'block18');
blockH40.setOrigin(0, 0);
blockHs.push(blockH40);

let blockH41 = this.physics.add.sprite(3940, H - 334, 'block18');
blockH41.setOrigin(0, 0);
blockHs.push(blockH41);

let blockH42 = this.physics.add.sprite(3972, H - 302, 'block18');
blockH42.setOrigin(0, 0);
blockHs.push(blockH42);

let blockH43 = this.physics.add.sprite(3972, H - 334, 'block18');
blockH43.setOrigin(0, 0);
blockHs.push(blockH43);

let blockH44 = this.physics.add.sprite(4004, H - 302, 'block18');
blockH44.setOrigin(0, 0);
blockHs.push(blockH44);

let blockH45 = this.physics.add.sprite(4004, H - 334, 'block18');
blockH45.setOrigin(0, 0);
blockHs.push(blockH45);

let blockH46 = this.physics.add.sprite(4004, H - 270, 'block18');
blockH46.setOrigin(0, 0);
blockHs.push(blockH46);

let blockH47 = this.physics.add.sprite(4004, H - 238, 'block18');
blockH47.setOrigin(0, 0);
blockHs.push(blockH47);

let blockH48 = this.physics.add.sprite(4004, H - 206, 'block18');
blockH48.setOrigin(0, 0);
blockHs.push(blockH48);

let blockH49 = this.physics.add.sprite(4036, H - 302, 'block18');
blockH49.setOrigin(0, 0);
blockHs.push(blockH49);

let blockH50 = this.physics.add.sprite(4036, H - 334, 'block18');
blockH50.setOrigin(0, 0);
blockHs.push(blockH50);

let blockH51 = this.physics.add.sprite(4036, H - 270, 'block18');
blockH51.setOrigin(0, 0);
blockHs.push(blockH51);

let blockH52 = this.physics.add.sprite(4036, H - 238, 'block18');
blockH52.setOrigin(0, 0);
blockHs.push(blockH52);

let blockH53 = this.physics.add.sprite(4036, H - 206, 'block18');
blockH53.setOrigin(0, 0);
blockHs.push(blockH53);

let blockH54 = this.physics.add.sprite(3972, H - 238, 'block18');
blockH54.setOrigin(0, 0);
blockHs.push(blockH54);

let blockH55 = this.physics.add.sprite(3972, H - 206, 'block18');
blockH55.setOrigin(0, 0);
blockHs.push(blockH55);

let blockH56 = this.physics.add.sprite(3940, H - 238, 'block18');
blockH56.setOrigin(0, 0);
blockHs.push(blockH56);

let blockH57 = this.physics.add.sprite(3940, H - 204, 'block18');
blockH57.setOrigin(0, 0);
blockHs.push(blockH57);

let blockH58 = this.physics.add.sprite(3940, H - 172, 'block18');
blockH58.setOrigin(0, 0);
blockHs.push(blockH58);

let blockH59 = this.physics.add.sprite(3940, H - 140, 'block18');
blockH59.setOrigin(0, 0);
blockHs.push(blockH59);

let blockH60 = this.physics.add.sprite(3940, H - 108, 'block18');
blockH60.setOrigin(0, 0);
blockHs.push(blockH60);

let blockH61 = this.physics.add.sprite(3908, H - 238, 'block18');
blockH61.setOrigin(0, 0);
blockHs.push(blockH61);

let blockH62 = this.physics.add.sprite(3908, H - 204, 'block18');
blockH62.setOrigin(0, 0);
blockHs.push(blockH62);

let blockH63 = this.physics.add.sprite(3908, H - 172, 'block18');
blockH63.setOrigin(0, 0);
blockHs.push(blockH63);

let blockH64 = this.physics.add.sprite(3908, H - 140, 'block18');
blockH64.setOrigin(0, 0);
blockHs.push(blockH64);

let blockH65 = this.physics.add.sprite(3972, H - 140, 'block18');
blockH65.setOrigin(0, 0);
blockHs.push(blockH65);

let blockH66 = this.physics.add.sprite(3972, H - 108, 'block18');
blockH66.setOrigin(0, 0);
blockHs.push(blockH66);

let blockH67 = this.physics.add.sprite(4004, H - 140, 'block18');
blockH67.setOrigin(0, 0);
blockHs.push(blockH67);

let blockH68 = this.physics.add.sprite(4004, H - 108, 'block18');
blockH68.setOrigin(0, 0);
blockHs.push(blockH68);

let blockH69 = this.physics.add.sprite(4036, H - 140, 'block18');
blockH69.setOrigin(0, 0);
blockHs.push(blockH69);

let blockH70 = this.physics.add.sprite(4036, H - 108, 'block18');
blockH70.setOrigin(0, 0);
blockHs.push(blockH70);

let blockH71 = this.physics.add.sprite(4068, H - 140, 'block18');
blockH71.setOrigin(0, 0);
blockHs.push(blockH71);

let blockH72 = this.physics.add.sprite(4068, H - 108, 'block18');
blockH72.setOrigin(0, 0);
blockHs.push(blockH72);


blockHs.forEach(block => {
    block.body.allowGravity = false; // 중력 비활성화
    block.body.immovable = true; // 움직이지 않도록 설정
    block.setAlpha(1); // 기본 투명도 설정
});


// ================================================================== //

    // 투명한 블록
    transparentBlock1 = createTransparentBlock(this, 1300, 688, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock1, playerHitTransparentBlock, null, this);

    transparentBlock2 = createTransparentBlock(this, 3130, 476.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock2, playerHitTransparentBlock, null, this);
    
    transparentBlock3 = createTransparentBlock(this, 4680, 828, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock3, playerHitTransparentBlock, null, this);

    transparentBlock4 = createTransparentBlock(this, 4680, 680, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock4, playerHitTransparentBlock, null, this);

    transparentBlock5 = createTransparentBlock(this, 4680, 648, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock5, playerHitTransparentBlock, null, this);

    transparentBlock6 = createTransparentBlock(this, 205, 688, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock6, playerHitTransparentBlock, null, this);

    transparentBlock7 = createTransparentBlock(this, 305, 776.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock7, playerHitTransparentBlock, null, this);

    transparentBlock8 = createTransparentBlock(this, 655, 688, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock8, playerHitTransparentBlock, null, this);

    transparentBlock9 = createTransparentBlock(this, 1350, 628, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock9, playerHitTransparentBlock, null, this);

    transparentBlock10 = createTransparentBlock(this, 2468, H - 152, 'block19').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock10, playerHitTransparentBlock, null, this);

    transparentBlock11 = createTransparentBlock(this, 2400, H - 207, 'block19').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock11, playerHitTransparentBlock, null, this);

    transparentBlock12 = createTransparentBlock(this, 2598, 598, 'block19').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock12, playerHitTransparentBlock, null, this);

    transparentBlock13 = createTransparentBlock(this, 4470, 688, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock13, playerHitTransparentBlock, null, this);

    transparentBlock14 = createTransparentBlock(this, 4470, 718, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock14, playerHitTransparentBlock, null, this);

    transparentBlock15 = createTransparentBlock(this, 4470, 748, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock15, playerHitTransparentBlock, null, this);

    transparentBlock16 = createTransparentBlock(this, 5090, 677, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock16, playerHitTransparentBlock, null, this);

    transparentBlock17 = createTransparentBlock(this, 5180, 718, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock17, playerHitTransparentBlock, null, this);

    transparentBlock18 = createTransparentBlock(this, 5180, 636, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock18, playerHitTransparentBlock, null, this);

    transparentBlock19 = createTransparentBlock(this, 5370, 677, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock19, playerHitTransparentBlock, null, this);

    transparentBlock20 = createTransparentBlock(this, 5370, 636, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock20, playerHitTransparentBlock, null, this);

    transparentBlock21 = createTransparentBlock(this, 5370, 605, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock21, playerHitTransparentBlock, null, this);

    transparentBlock22 = createTransparentBlock(this, 5370, 574, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock22, playerHitTransparentBlock, null, this);

    transparentBlock23 = createTransparentBlock(this, 5370, 543, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock23, playerHitTransparentBlock, null, this);

    transparentBlock24 = createTransparentBlock(this, 5500, 512, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock24, playerHitTransparentBlock, null, this);

    transparentBlock25 = createTransparentBlock(this, 5500, 430, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock25, playerHitTransparentBlock, null, this);

    transparentBlock26 = createTransparentBlock(this, 5590, 471, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock26, playerHitTransparentBlock, null, this);

    transparentBlock27 = createTransparentBlock(this, 5590, 389, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock27, playerHitTransparentBlock, null, this);

    transparentBlock28 = createTransparentBlock(this, 5665, 430, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock28, playerHitTransparentBlock, null, this);

    transparentBlock29 = createTransparentBlock(this, 5665, 348, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock29, playerHitTransparentBlock, null, this);

    transparentBlock30 = createTransparentBlock(this, 5960, H - 63.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock30, playerHitTransparentBlock, null, this);

    transparentBlock31 = createTransparentBlock(this, 5990, H - 93.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock31, playerHitTransparentBlock, null, this);

    transparentBlock32 = createTransparentBlock(this, 6020, H - 123.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock32, playerHitTransparentBlock, null, this);

    transparentBlock33 = createTransparentBlock(this, 6050, H - 153.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock33, playerHitTransparentBlock, null, this);

    transparentBlock34 = createTransparentBlock(this, 6080, H - 183.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock34, playerHitTransparentBlock, null, this);

    transparentBlock35 = createTransparentBlock(this, 6110, H - 213.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock35, playerHitTransparentBlock, null, this);

    transparentBlock36 = createTransparentBlock(this, 6110, H - 243.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock36, playerHitTransparentBlock, null, this);

    transparentBlock37 = createTransparentBlock(this, 6110, H - 273.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock37, playerHitTransparentBlock, null, this);

    transparentBlock38 = createTransparentBlock(this, 6110, H - 303.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock38, playerHitTransparentBlock, null, this);

    transparentBlock39 = createTransparentBlock(this, 6140, H - 333.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock39, playerHitTransparentBlock, null, this);

    transparentBlock40 = createTransparentBlock(this, 6170, H - 363.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock40, playerHitTransparentBlock, null, this);

    transparentBlock41 = createTransparentBlock(this, 6210, H - 393.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock41, playerHitTransparentBlock, null, this);

    transparentBlock42 = createTransparentBlock(this, 6020, H - 243.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock42, playerHitTransparentBlock, null, this);

    transparentBlock43 = createTransparentBlock(this, 6020, H - 273.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock43, playerHitTransparentBlock, null, this);

    transparentBlock44 = createTransparentBlock(this, 6050, H - 213.5, 'block17').refreshBody(); 
    this.physics.add.collider(this.player, transparentBlock44, playerHitTransparentBlock, null, this);

// ================================================================== //
    
    let blocks = this.physics.add.staticGroup();

    blocks.create(450, H - 152, 'block19').refreshBody();
    blocks.create(482, H - 152, 'block19').refreshBody();

    blocks.create(550, H - 212, 'block19').refreshBody();

    blocks.create(650, H - 302, 'block19').refreshBody();
    blocks.create(681, H - 302, 'block19').refreshBody();
    blocks.create(713, H - 302, 'block19').refreshBody();

    blocks.create(681, H - 422, 'block16').refreshBody();

    blocks.create(853, H - 212, 'block16').refreshBody();

    blocks.create(1450, H - 32, 'block15').refreshBody();

    blocks.create(1840, H - 32.2, 'block15').refreshBody();

    blocks.create(2180, H - 32, 'block15').refreshBody();
    blocks.create(2308, H - 32, 'block15').refreshBody();

    blocks.create(2438, H - 122, 'block19').refreshBody();
    blocks.create(2568, H - 212, 'block19').refreshBody();
    blocks.create(2698, H - 302, 'block19').refreshBody();

    blocks.create(2683, H - 32, 'block15').refreshBody();

    blocks.create(3320, H - 32, 'block15').refreshBody();

    blocks.create(3700, H - 190, 'block18').refreshBody();
    blocks.create(3700, H - 222, 'block18').refreshBody();
    blocks.create(3700, H - 254, 'block18').refreshBody();
    blocks.create(3700, H - 286, 'block18').refreshBody();
    blocks.create(3700, H - 318, 'block18').refreshBody();
    blocks.create(3700, H - 350, 'block18').refreshBody();

    blocks.create(3700, H - 158, 'block18').refreshBody();
    blocks.create(3732, H - 158, 'block18').refreshBody();
    blocks.create(3764, H - 158, 'block18').refreshBody();
    blocks.create(3796, H - 158, 'block18').refreshBody();

    blocks.create(3796, H - 254, 'block18').refreshBody();
    blocks.create(3828, H - 254, 'block18').refreshBody();
    blocks.create(3860, H - 254, 'block18').refreshBody();

    blocks.create(3922, H - 254, 'block18').refreshBody();
    blocks.create(3954, H - 254, 'block18').refreshBody();
    blocks.create(3986, H - 254, 'block18').refreshBody();
    
    blocks.create(3858, H - 62, 'block18').refreshBody();
    blocks.create(3858, H - 94, 'block18').refreshBody();


    blocks.create(3890, H - 62, 'block18').refreshBody();
    blocks.create(3890, H - 94, 'block18').refreshBody();
    blocks.create(3890, H - 126, 'block18').refreshBody();
    blocks.create(3890, H - 158, 'block18').refreshBody();
    blocks.create(3890, H - 190, 'block18').refreshBody();
    blocks.create(3890, H - 222, 'block18').refreshBody();
    blocks.create(3890, H - 254, 'block18').refreshBody();

    blocks.create(4084, H - 318, 'block18').refreshBody();
    blocks.create(4084, H - 286, 'block18').refreshBody();
    blocks.create(4084, H - 254, 'block18').refreshBody();
    blocks.create(4084, H - 222, 'block18').refreshBody();
    blocks.create(4084, H - 190, 'block18').refreshBody();
    blocks.create(4084, H - 158, 'block18').refreshBody();

    blocks.create(4084, H - 158, 'block18').refreshBody();
    blocks.create(4052, H - 158, 'block18').refreshBody();
    blocks.create(4020, H - 158, 'block18').refreshBody();
    blocks.create(3988, H - 158, 'block18').refreshBody();

    blocks.create(3922, H - 94, 'block18').refreshBody();
    blocks.create(3922, H - 62, 'block18').refreshBody();

    blocks.create(3954, H - 62, 'block18').refreshBody();
    blocks.create(3986, H - 62, 'block18').refreshBody();
    blocks.create(4018, H - 62, 'block18').refreshBody();
    blocks.create(4050, H - 62, 'block18').refreshBody();
    blocks.create(4082, H - 62, 'block18').refreshBody();
    
    blocks.create(4800, H - 144, 'block18').refreshBody();
    blocks.create(4832, H - 144, 'block18').refreshBody();

    blocks.create(5768, H - 32, 'block15').refreshBody();

    blocks.create(6132, H - 32, 'block15').refreshBody();

    blocks.create(5540, H - 204, 'block18').refreshBody();

    function onPlayerBlockCollision(player, block) {
        if (block.texture.key === 'block16') {
            var hintSound = this.sound.add('hintblock');
            hintSound.play();
        }
    }
    // 충돌 감지 설정
    this.physics.add.collider(this.player, blocks, onPlayerBlockCollision, null, this);

    
    // 함정나무
    Trees1 = this.physics.add.sprite(3550, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees1, playerHitTree, null, this);
    Trees1.setCollideWorldBounds(false);
    Trees1.body.allowGravity = false;
    Trees1.setImmovable(true);

    Trees2 = this.physics.add.sprite(4500, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees2, playerHitTree, null, this);
    Trees2.setCollideWorldBounds(false);
    Trees2.body.allowGravity = false;
    Trees2.setImmovable(true);

    Trees3 = this.physics.add.sprite(1000, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees3, playerHitTree, null, this);
    Trees3.setCollideWorldBounds(false);
    Trees3.body.allowGravity = false;
    Trees3.setImmovable(true);

    Trees4 = this.physics.add.sprite(2120, H - 78, 'tree1').setScale(1.4, 1);
    this.physics.add.collider(this.player, Trees4, playerHitTree, null, this);
    Trees4.setCollideWorldBounds(false);
    Trees4.body.allowGravity = false;
    Trees4.setImmovable(true);

    // 함정구름
    Cloud1 = this.physics.add.sprite(1200, 550, 'cloud1').setScale(1.3, 1.1);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    Cloud1 = this.physics.add.sprite(800, H - 380, 'cloud1').setScale(1.2, 0.9);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    Cloud1 = this.physics.add.sprite(2200, 450, 'cloud1').setScale(1.6, 1.4);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    Cloud1 = this.physics.add.sprite(5760, 400, 'cloud1').setScale(1.5, 1.2);
    this.physics.add.collider(this.player, Cloud1, playerHitCloud, null, this);
    Cloud1.setCollideWorldBounds(false);
    Cloud1.body.allowGravity = false;
    Cloud1.setImmovable(true);

    // 토관
    blocks.create(2950, 690, 'dokan1').refreshBody();
    blocks.create(2950, H - 91.5, 'dokan2').setScale(1, 3).refreshBody();

    blocks.create(3080, 603, 'dokan1').refreshBody();
    blocks.create(3080, H - 135, 'dokan2').setScale(1, 6).refreshBody();
    
    blocks.create(5400, 690, 'dokan1').refreshBody();
    blocks.create(5400, H - 91.5, 'dokan2').setScale(1, 3).refreshBody();

    blocks.create(6500, 719, 'dokan1').refreshBody();
    blocks.create(6500, H - 77.3, 'dokan2').setScale(1, 2).refreshBody();

    // 세이브 포인트 생성
    savePoint = this.physics.add.sprite(4400, 755, 'savepoint').setScale(1, 1.2);
    savePoint.setCollideWorldBounds(true);
    // 세이브 포인트와 플레이어의 충돌 감지
    this.physics.add.collider(this.player, savePoint, savePlayerPosition, null, this);
    this.physics.add.overlap(this.player, savePoint, savePlayerPosition, null, this);
    savePoint.setCollideWorldBounds(false);
    savePoint.body.allowGravity = false;
    savePoint.setImmovable(true);

    // End Point
    let EndPoint = this.physics.add.staticGroup();
    EndPoint.create(6700, 757, 'endpoint').setScale(1, 1.2).refreshBody();

// ================================================================== //

    // 그냥 보이는 블록 (No 밟음)
    let noblock = this.physics.add.staticGroup();
    noblock.create(2828, H - 392, 'block19').refreshBody();
    noblock.create(2828, H - 212, 'block19').refreshBody();

    noblock.create(3230, H - 250, 'block18').refreshBody();

    noblock.create(4136, H - 32, 'block15').refreshBody();
    noblock.create(4168, H - 32, 'block15').refreshBody();
    noblock.create(4200, H - 32, 'block15').refreshBody();
    noblock.create(4232, H - 32, 'block15').refreshBody();

    noblock.create(4896, H - 244, 'block18').refreshBody();
    noblock.create(4928, H - 244, 'block18').refreshBody();

    noblock.create(5464, H - 32, 'block16').refreshBody();
    noblock.create(5496, H - 32, 'block16').refreshBody();
    noblock.create(5528, H - 32, 'block16').refreshBody();
    noblock.create(5560, H - 32, 'block16').refreshBody();
    noblock.create(5592, H - 32, 'block16').refreshBody();
    noblock.create(5624, H - 32, 'block16').refreshBody();
    noblock.create(5656, H - 32, 'block16').refreshBody();
    noblock.create(5688, H - 32, 'block16').refreshBody();
    noblock.create(5720, H - 32, 'block16').refreshBody();
    noblock.create(5752, H - 32, 'block16').refreshBody();
    noblock.create(5784, H - 32, 'block16').refreshBody();

    noblock.create(6636, H - 32, 'block15').refreshBody();
    noblock.create(6668, H - 32, 'block15').refreshBody();
    noblock.create(6700, H - 32, 'block15').refreshBody();
    


// ================================================================== //

    // 떨어지는 블록 
    blockA1 = this.physics.add.sprite(2212, H - 32, 'block15');
    blockA1.setCollideWorldBounds(false);
    blockA1.body.allowGravity = false;
    blockA1.setImmovable(true);

    blockA2 = this.physics.add.sprite(2244, H - 32, 'block15');
    blockA2.setCollideWorldBounds(false);
    blockA2.body.allowGravity = false;
    blockA2.setImmovable(true);

    blockA3 = this.physics.add.sprite(2276, H - 32, 'block15');
    blockA3.setCollideWorldBounds(false);
    blockA3.body.allowGravity = false;
    blockA3.setImmovable(true);

    blockA4 = this.physics.add.sprite(3192, H - 32, 'block15');
    blockA4.setCollideWorldBounds(false);
    blockA4.body.allowGravity = false;
    blockA4.setImmovable(true);

    blockA5 = this.physics.add.sprite(3224, H - 32, 'block15');
    blockA5.setCollideWorldBounds(false);
    blockA5.body.allowGravity = false;
    blockA5.setImmovable(true);

    blockA6 = this.physics.add.sprite(3256, H - 32, 'block15').refreshBody();
    blockA6.setCollideWorldBounds(false);
    blockA6.body.allowGravity = false;
    blockA6.setImmovable(true);

    blockA7 = this.physics.add.sprite(3288, H - 32, 'block15');
    blockA7.setCollideWorldBounds(false);
    blockA7.body.allowGravity = false;
    blockA7.setImmovable(true);

    blockA8 = this.physics.add.sprite(5680, H - 274, 'block18');
    blockA8.setCollideWorldBounds(false);
    blockA8.body.allowGravity = false;
    blockA8.setImmovable(true);

    // 플레이어와 블록A의 충돌 감지
    this.physics.add.collider(this.player, blockA1, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA2, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA3, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA4, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA5, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA6, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA7, playerHitBlock, null, this);
    this.physics.add.collider(this.player, blockA8, playerHitBlock, null, this);

// ================================================================== //

    // 뱀
    this.e1 = new Enemy();
    this.e1.createObject(this, 600, H - 96, 'snake3');

    this.e2 = new Enemy();
    this.e2.createObject(this, 400, H - 96, 'snake3');
    
    this.e3 = new Enemy();
    this.e3.createObject(this, 1050, H - 96, 'snake3');

    this.e4 = new Enemy();
    this.e4.createObject(this, 1250, H - 96, 'snake3');

    this.e5 = new Enemy();
    this.e5.createObject(this, 1700, H - 200, 'snake3');

    this.e6 = new Enemy();
    this.e6.createObject(this, 1600, H - 200, 'snake3');

    this.e7 = new Enemy();
    this.e7.createObject(this, 2900, H - 96, 'snake3');

    this.e8 = new Enemy();
    this.e8.createObject(this, 5200, H - 96, 'snake3');

    this.e9 = new Enemy();
    this.e9.createObject(this, 5300, H - 96, 'snake3');

    this.e10 = new Enemy();
    this.e10.createObject(this, 6000, H - 96, 'snake3');

    // Mob
    mobb1 = this.physics.add.sprite(1400, 270, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb1, playerHitMob, null, this);
    mobb1.body.allowGravity = false;
    mobb1.setImmovable(true);

    mobb2 = this.physics.add.sprite(1775, 270, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb2, playerHitMob, null, this);
    mobb2.body.allowGravity = false;
    mobb2.setImmovable(true);

    mobb3 = this.physics.add.sprite(3080, 178, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb3, playerHitMob, null, this);
    mobb3.body.allowGravity = false;
    mobb3.setImmovable(true);

    mobb4 = this.physics.add.sprite(4650, 250, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb4, playerHitMob, null, this);
    mobb4.body.allowGravity = false;
    mobb4.setImmovable(true);

    mobb5 = this.physics.add.sprite(4928, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb5, playerHitMob, null, this);
    mobb5.body.allowGravity = false;
    mobb5.setImmovable(true);

    mobb6 = this.physics.add.sprite(5050, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb6, playerHitMob, null, this);
    mobb6.body.allowGravity = false;
    mobb6.setImmovable(true);

    mobb7 = this.physics.add.sprite(5680, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb7, playerHitMob, null, this);
    mobb7.body.allowGravity = false;
    mobb7.setImmovable(true);

    mobb8 = this.physics.add.sprite(205, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb8, playerHitMob, null, this);
    mobb8.body.allowGravity = false;
    mobb8.setImmovable(true);

    mobb9 = this.physics.add.sprite(355, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb9, playerHitMob, null, this);
    mobb9.body.allowGravity = false;
    mobb9.setImmovable(true);

    mobb10 = this.physics.add.sprite(454, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb10, playerHitMob, null, this);
    mobb10.body.allowGravity = false;
    mobb10.setImmovable(true);

    mobb11 = this.physics.add.sprite(655, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb11, playerHitMob, null, this);
    mobb11.body.allowGravity = false;
    mobb11.setImmovable(true);

    mobb12 = this.physics.add.sprite(855, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb12, playerHitMob, null, this);
    mobb12.body.allowGravity = false;
    mobb12.setImmovable(true);

    mobb13 = this.physics.add.sprite(1100, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb13, playerHitMob, null, this);
    mobb13.body.allowGravity = false;
    mobb13.setImmovable(true);

    mobb14 = this.physics.add.sprite(1454, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb14, playerHitMob, null, this);
    mobb14.body.allowGravity = false;
    mobb14.setImmovable(true);

    mobb15 = this.physics.add.sprite(1655, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb15, playerHitMob, null, this);
    mobb15.body.allowGravity = false;
    mobb15.setImmovable(true);

    mobb16 = this.physics.add.sprite(2454, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb16, playerHitMob, null, this);
    mobb16.body.allowGravity = false;
    mobb16.setImmovable(true);

    mobb17 = this.physics.add.sprite(2830, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb17, playerHitMob, null, this);
    mobb17.body.allowGravity = false;
    mobb17.setImmovable(true);

    mobb18 = this.physics.add.sprite(3000, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb18, playerHitMob, null, this);
    mobb18.body.allowGravity = false;
    mobb18.setImmovable(true);

    mobb19 = this.physics.add.sprite(3054, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb19, playerHitMob, null, this);
    mobb19.body.allowGravity = false;
    mobb19.setImmovable(true);

    mobb20 = this.physics.add.sprite(4100, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb20, playerHitMob, null, this);
    mobb20.body.allowGravity = false;
    mobb20.setImmovable(true);

    mobb21 = this.physics.add.sprite(4500, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb21, playerHitMob, null, this);
    mobb21.body.allowGravity = false;
    mobb21.setImmovable(true);

    mobb22 = this.physics.add.sprite(5100, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb22, playerHitMob, null, this);
    mobb22.body.allowGravity = false;
    mobb22.setImmovable(true);

    mobb23 = this.physics.add.sprite(5280, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb23, playerHitMob, null, this);
    mobb23.body.allowGravity = false;
    mobb23.setImmovable(true);

    mobb24 = this.physics.add.sprite(5400, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb24, playerHitMob, null, this);
    mobb24.body.allowGravity = false;
    mobb24.setImmovable(true);

    mobb25 = this.physics.add.sprite(5505, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb25, playerHitMob, null, this);
    mobb25.body.allowGravity = false;
    mobb25.setImmovable(true);

    mobb26 = this.physics.add.sprite(5555, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb26, playerHitMob, null, this);
    mobb26.body.allowGravity = false;
    mobb26.setImmovable(true);

    mobb27 = this.physics.add.sprite(5605, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb27, playerHitMob, null, this);
    mobb27.body.allowGravity = false;
    mobb27.setImmovable(true);

    mobb28 = this.physics.add.sprite(5654, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb28, playerHitMob, null, this);
    mobb28.body.allowGravity = false;
    mobb28.setImmovable(true);

    mobb29 = this.physics.add.sprite(6235, 1000, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb29, playerHitMob, null, this);
    mobb29.body.allowGravity = false;
    mobb29.setImmovable(true);

    mobb30 = this.physics.add.sprite(5200, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb30, playerHitMob, null, this);
    mobb30.body.allowGravity = false;
    mobb30.setImmovable(true);

    mobb31 = this.physics.add.sprite(5630, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb31, playerHitMob, null, this);
    mobb31.body.allowGravity = false;
    mobb31.setImmovable(true);

    mobb32 = this.physics.add.sprite(5645, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb32, playerHitMob, null, this);
    mobb32.body.allowGravity = false;
    mobb32.setImmovable(true);

    mobb33 = this.physics.add.sprite(6120, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb33, playerHitMob, null, this);
    mobb33.body.allowGravity = false;
    mobb33.setImmovable(true);

    mobb34 = this.physics.add.sprite(6190, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb34, playerHitMob, null, this);
    mobb34.body.allowGravity = false;
    mobb34.setImmovable(true);

    mobb35 = this.physics.add.sprite(6350, 200, 'mob4').refreshBody();
    this.physics.add.collider(this.player, mobb35, playerHitMob, null, this);
    mobb35.body.allowGravity = false;
    mobb35.setImmovable(true);
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

    // 옷 이미지 추가
    let huku1 = this.add.image(100, 200, 'huku1'); // 이미지의 키값으로 변경
    huku1.setOrigin(0, 0.5); // 이미지의 원점 설정
    huku1.setScale(0.4); // 이미지 크기 조절
    huku1.setScrollFactor(0); // 카메라에 따라 움직이지 않도록 고정
    huku1.x = 170; // 이미지의 x 위치 설정
    huku1.y = 230; // 이미지의 y 위치 설정

    let huku2 = this.add.image(100, 200, 'huku2'); // 이미지의 키값으로 변경
    huku2.setOrigin(0, 0.5); // 이미지의 원점 설정
    huku2.setScale(0.4); // 이미지 크기 조절
    huku2.setScrollFactor(0); // 카메라에 따라 움직이지 않도록 고정
    huku2.x = 210; // 이미지의 x 위치 설정
    huku2.y = 230; // 이미지의 y 위치 설정
    // StartLogEvent 생성
    const StartLogEvent = {
        playerID: "PLAYER " + player_id,
        event: 'game start',
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
        position: { playerX: this.player.x, playerY: this.player.y },
        mapID: map_id
    };
}
// ================================================================== //
// 뱀 초기화
function resetEnemyPosition1(enemy) {
    // 적의 초기 위치로 리셋
    enemy.enemyObject.x = 600; // 적의 초기 X 위치
    enemy.enemyObject.y = H - 96; // 적의 초기 Y 위치
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true); // 적 활성화
}
function resetEnemyPosition2(enemy) {
    enemy.enemyObject.x = 400;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition3(enemy) {
    enemy.enemyObject.x = 1050;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition4(enemy) {
    enemy.enemyObject.x = 1250;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition5(enemy) {
    enemy.enemyObject.x = 1700;
    enemy.enemyObject.y = H - 200;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition6(enemy) {
    enemy.enemyObject.x = 1600;
    enemy.enemyObject.y = H - 200;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition7(enemy) {
    enemy.enemyObject.x = 2900;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition8(enemy) {
    enemy.enemyObject.x = 5200;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition9(enemy) {
    enemy.enemyObject.x = 5300;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
function resetEnemyPosition10(enemy) {
    enemy.enemyObject.x = 6000;
    enemy.enemyObject.y = H - 96;
    enemy.enemyObject.enableBody(true, enemy.enemyObject.x, enemy.enemyObject.y, true, true);
}
// ================================================================== //
// 슬라임 초기화
function resetMob1(mobb1) {
    mobb1.x = 1400;
    mobb1.y = 270;
    mobb1.enableBody(true, mobb1.x, mobb1.y, true, true);
    mobb1.body.allowGravity = false;
    mobb1.setImmovable(true);
}
function resetMob2(mobb2) {
    mobb2.x = 1775;
    mobb2.y = 270;
    mobb2.enableBody(true, mobb2.x, mobb2.y, true, true);
    mobb2.body.allowGravity = false;
    mobb2.setImmovable(true);
}
function resetMob3(mobb3) {
    mobb3.x = 3080;
    mobb3.y = 178;
    mobb3.enableBody(true, mobb3.x, mobb3.y, true, true);
    mobb3.body.allowGravity = false;
    mobb3.setImmovable(true);
}
function resetMob4(mobb4) {
    mobb4.x = 4650;
    mobb4.y = 250;
    mobb4.enableBody(true, mobb4.x, mobb4.y, true, true);
    mobb4.body.allowGravity = false;
    mobb4.setImmovable(true);
}
function resetMob5(mobb5) {
    mobb5.x = 4928;
    mobb5.y = 200;
    mobb5.enableBody(true, mobb5.x, mobb5.y, true, true);
    mobb5.body.allowGravity = false;
    mobb5.setImmovable(true);
}
function resetMob6(mobb6) {
    mobb6.x = 5050;
    mobb6.y = 200;
    mobb6.enableBody(true, mobb6.x, mobb6.y, true, true);
    mobb6.body.allowGravity = false;
    mobb6.setImmovable(true);
}
function resetMob7(mobb7) {
    mobb7.x = 5680;
    mobb7.y = 200;
    mobb7.enableBody(true, mobb7.x, mobb7.y, true, true);
    mobb7.body.allowGravity = false;
    mobb7.setImmovable(true);
}
function resetMob8(mobb8) {
    mobb8.x = 205;
    mobb8.y = 1000;
    mobb8.enableBody(true, mobb8.x, mobb8.y, true, true);
    mobb8.body.allowGravity = false;
    mobb8.setImmovable(true);
}
function resetMob9(mobb9) {
    mobb9.x = 355;
    mobb9.y = 200;
    mobb9.enableBody(true, mobb9.x, mobb9.y, true, true);
    mobb9.body.allowGravity = false;
    mobb9.setImmovable(true);
}
function resetMob10(mobb10) {
    mobb10.x = 454;
    mobb10.y = 1000;
    mobb10.enableBody(true, mobb10.x, mobb10.y, true, true);
    mobb10.body.allowGravity = false;
    mobb10.setImmovable(true);
}
function resetMob11(mobb11) {
    mobb11.x = 655;
    mobb11.y = 1000;
    mobb11.enableBody(true, mobb11.x, mobb11.y, true, true);
    mobb11.body.allowGravity = false;
    mobb11.setImmovable(true);
}
function resetMob12(mobb12) {
    mobb12.x = 855;
    mobb12.y = 200;
    mobb12.enableBody(true, mobb12.x, mobb12.y, true, true);
    mobb12.body.allowGravity = false;
    mobb12.setImmovable(true);
}
function resetMob13(mobb13) {
    mobb13.x = 1100;
    mobb13.y = 1000;
    mobb13.enableBody(true, mobb13.x, mobb13.y, true, true);
    mobb13.body.allowGravity = false;
    mobb13.setImmovable(true);
}
function resetMob14(mobb14) {
    mobb14.x = 1454;
    mobb14.y = 200;
    mobb14.enableBody(true, mobb14.x, mobb14.y, true, true);
    mobb14.body.allowGravity = false;
    mobb14.setImmovable(true);
}
function resetMob15(mobb15) {
    mobb15.x = 1655;
    mobb15.y = 1000;
    mobb15.enableBody(true, mobb15.x, mobb15.y, true, true);
    mobb15.body.allowGravity = false;
    mobb15.setImmovable(true);
}
function resetMob16(mobb16) {
    mobb16.x = 2454;
    mobb16.y = 1000;
    mobb16.enableBody(true, mobb16.x, mobb16.y, true, true);
    mobb16.body.allowGravity = false;
    mobb16.setImmovable(true);
}
function resetMob17(mobb17) {
    mobb17.x = 2830;
    mobb17.y = 1000;
    mobb17.enableBody(true, mobb17.x, mobb17.y, true, true);
    mobb17.body.allowGravity = false;
    mobb17.setImmovable(true);
}
function resetMob18(mobb18) {
    mobb18.x = 3000;
    mobb18.y = 1000;
    mobb18.enableBody(true, mobb18.x, mobb18.y, true, true);
    mobb18.body.allowGravity = false;
    mobb18.setImmovable(true);
}
function resetMob19(mobb19) {
    mobb19.x = 3054;
    mobb19.y = 200;
    mobb19.enableBody(true, mobb19.x, mobb19.y, true, true);
    mobb19.body.allowGravity = false;
    mobb19.setImmovable(true);
}
function resetMob20(mobb20) {
    mobb20.x = 4100;
    mobb20.y = 1000;
    mobb20.enableBody(true, mobb20.x, mobb20.y, true, true);
    mobb20.body.allowGravity = false;
    mobb20.setImmovable(true);
}
function resetMob21(mobb21) {
    mobb21.x = 4500;
    mobb21.y = 1000;
    mobb21.enableBody(true, mobb21.x, mobb21.y, true, true);
    mobb21.body.allowGravity = false;
    mobb21.setImmovable(true);
}

function resetMob22(mobb22) {
    mobb22.x = 5100;
    mobb22.y = 1000;
    mobb22.enableBody(true, mobb22.x, mobb22.y, true, true);
    mobb22.body.allowGravity = false;
    mobb22.setImmovable(true);
}
function resetMob23(mobb23) {
    mobb23.x = 5280;
    mobb23.y = 1000;
    mobb23.enableBody(true, mobb23.x, mobb23.y, true, true);
    mobb23.body.allowGravity = false;
    mobb23.setImmovable(true);
}
function resetMob24(mobb24) {
    mobb24.x = 5400;
    mobb24.y = 1000;
    mobb24.enableBody(true, mobb24.x, mobb24.y, true, true);
    mobb24.body.allowGravity = false;
    mobb24.setImmovable(true);
}
function resetMob25(mobb25) {
    mobb25.x = 5655;
    mobb25.y = 1000;
    mobb25.enableBody(true, mobb25.x, mobb25.y, true, true);
    mobb25.body.allowGravity = false;
    mobb25.setImmovable(true);
}
function resetMob26(mobb26) {
    mobb26.x = 5555;
    mobb26.y = 1000;
    mobb26.enableBody(true, mobb26.x, mobb26.y, true, true);
    mobb26.body.allowGravity = false;
    mobb26.setImmovable(true);
}
function resetMob27(mobb27) {
    mobb27.x = 5605;
    mobb27.y = 1000;
    mobb27.enableBody(true, mobb27.x, mobb27.y, true, true);
    mobb27.body.allowGravity = false;
    mobb27.setImmovable(true);
}
function resetMob28(mobb28) {
    mobb28.x = 5654;
    mobb28.y = 1000;
    mobb28.enableBody(true, mobb28.x, mobb28.y, true, true);
    mobb28.body.allowGravity = false;
    mobb28.setImmovable(true);
}
function resetMob29(mobb29) {
    mobb29.x = 6235;
    mobb29.y = 1000;
    mobb29.enableBody(true, mobb29.x, mobb29.y, true, true);
    mobb29.body.allowGravity = false;
    mobb29.setImmovable(true);
}
function resetMob30(mobb30) {
    mobb30.x = 5200;
    mobb30.y = 200;
    mobb30.enableBody(true, mobb30.x, mobb30.y, true, true);
    mobb30.body.allowGravity = false;
    mobb30.setImmovable(true);
}
function resetMob31(mobb31) {
    mobb31.x = 5630;
    mobb31.y = 200;
    mobb31.enableBody(true, mobb31.x, mobb31.y, true, true);
    mobb31.body.allowGravity = false;
    mobb31.setImmovable(true);
}
function resetMob32(mobb32) {
    mobb32.x = 5645;
    mobb32.y = 200;
    mobb32.enableBody(true, mobb32.x, mobb32.y, true, true);
    mobb32.body.allowGravity = false;
    mobb32.setImmovable(true);
}
function resetMob33(mobb33) {
    mobb33.x = 6120;
    mobb33.y = 200;
    mobb33.enableBody(true, mobb33.x, mobb33.y, true, true);
    mobb33.body.allowGravity = false;
    mobb33.setImmovable(true);
}
function resetMob34(mobb34) {
    mobb34.x = 6190;
    mobb34.y = 200;
    mobb34.enableBody(true, mobb34.x, mobb34.y, true, true);
    mobb34.body.allowGravity = false;
    mobb34.setImmovable(true);
}
function resetMob35(mobb35) {
    mobb35.x = 6350;
    mobb35.y = 200;
    mobb35.enableBody(true, mobb35.x, mobb35.y, true, true);
    mobb35.body.allowGravity = false;
    mobb35.setImmovable(true);
}
// ================================================================== //
// 밟으면 떨어지는 블록 초기화
function resetBlockA1(blockA1) {
    blockA1.x = 2212;
    blockA1.y = H - 32;
    blockA1.enableBody(true, blockA1.x, blockA1.y, true, true);
    blockA1.body.allowGravity = false; 
    blockA1.body.velocity.y = 0;
};
function resetBlockA2(blockA2) {
    blockA2.x = 2244;
    blockA2.y = H - 32;
    blockA2.enableBody(true, blockA2.x, blockA2.y, true, true);
    blockA2.body.allowGravity = false; 
    blockA2.body.velocity.y = 0;

};
function resetBlockA3(blockA3) {
    blockA3.x = 2276;
    blockA3.y = H - 32;
    blockA3.enableBody(true, blockA3.x, blockA3.y, true, true);
    blockA3.body.allowGravity = false; 
    blockA3.body.velocity.y = 0;

};
function resetBlockA4(blockA4) {
    blockA4.x = 3192;
    blockA4.y = H - 32;
    blockA4.enableBody(true, blockA4.x, blockA4.y, true, true);
    blockA4.body.allowGravity = false; 
    blockA4.body.velocity.y = 0;

};
function resetBlockA5(blockA5) {
    blockA5.x = 3224;
    blockA5.y = H - 32;
    blockA5.enableBody(true, blockA5.x, blockA5.y, true, true);
    blockA5.body.allowGravity = false; 
    blockA5.body.velocity.y = 0;
};
function resetBlockA6(blockA6) {
    blockA6.x = 3256;
    blockA6.y = H - 32;
    blockA6.enableBody(true, blockA6.x, blockA6.y, true, true);
    blockA6.body.allowGravity = false; 
    blockA6.body.velocity.y = 0;
};
function resetBlockA7(blockA7) {
    blockA7.x = 3288;
    blockA7.y = H - 32;
    blockA7.enableBody(true, blockA7.x, blockA7.y, true, true);
    blockA7.body.allowGravity = false; 
    blockA7.body.velocity.y = 0;
};
function resetBlockA8(blockA8) {
    blockA8.x = 5680;
    blockA8.y = H - 274;
    blockA8.enableBody(true, blockA8.x, blockA8.y, true, true);
    blockA8.body.allowGravity = false; 
    blockA8.body.velocity.y = 0;
};
// ================================================================== //
// 히든 블록 초기화
function resetHiddenBlock1(transparentBlock1) {
    transparentBlock1.x = 1300;
    transparentBlock1.y = H - 152;
    transparentBlock1.alpha = transparentBlock1.initialAlpha; // 초기 알파값으로 설정
    transparentBlock1.setData('isHidden', true); // 다시 숨겨진 상태로 설정
    transparentBlock1.enableBody(true, transparentBlock1.x, transparentBlock1.y, true, true);
    transparentBlock1.body.allowGravity = false;
    transparentBlock1.body.velocity.y = 0;
}
function resetHiddenBlock2(transparentBlock2) {
    transparentBlock2.x = 3130;
    transparentBlock2.y = H - 363.5;
    transparentBlock2.alpha = transparentBlock2.initialAlpha;
    transparentBlock2.setData('isHidden', true);
    transparentBlock2.enableBody(true, transparentBlock2.x, transparentBlock2.y, true, true);
    transparentBlock2.body.allowGravity = false;
    transparentBlock2.body.velocity.y = 0;
}
function resetHiddenBlock3(transparentBlock3) {
    transparentBlock3.x = 4680;
    transparentBlock3.y = H - 128;
    transparentBlock3.alpha = transparentBlock3.initialAlpha;
    transparentBlock3.setData('isHidden', true);
    transparentBlock3.enableBody(true, transparentBlock3.x, transparentBlock3.y, true, true);
    transparentBlock3.body.allowGravity = false;
    transparentBlock3.body.velocity.y = 0;
}
function resetHiddenBlock4(transparentBlock4) {
    transparentBlock4.x = 4680;
    transparentBlock4.y = H - 160;
    transparentBlock4.alpha = transparentBlock4.initialAlpha;
    transparentBlock4.setData('isHidden', true);
    transparentBlock4.enableBody(true, transparentBlock4.x, transparentBlock4.y, true, true);
    transparentBlock4.body.allowGravity = false;
    transparentBlock4.body.velocity.y = 0;
}
function resetHiddenBlock5(transparentBlock5) {
    transparentBlock5.x = 4680;
    transparentBlock5.y = H - 192;
    transparentBlock5.alpha = transparentBlock5.initialAlpha;
    transparentBlock5.setData('isHidden', true);
    transparentBlock5.enableBody(true, transparentBlock5.x, transparentBlock5.y, true, true);
    transparentBlock5.body.allowGravity = false;
    transparentBlock5.body.velocity.y = 0;
}
function resetHiddenBlock6(transparentBlock6) {
    transparentBlock6.x = 205;
    transparentBlock6.y = 688;
    transparentBlock6.alpha = transparentBlock6.initialAlpha;
    transparentBlock6.setData('isHidden', true);
    transparentBlock6.enableBody(true, transparentBlock6.x, transparentBlock6.y, true, true);
    transparentBlock6.body.allowGravity = false;
    transparentBlock6.body.velocity.y = 0;
}
function resetHiddenBlock7(transparentBlock7) {
    transparentBlock7.x = 305;
    transparentBlock7.y = 776.5;
    transparentBlock7.alpha = transparentBlock7.initialAlpha;
    transparentBlock7.setData('isHidden', true);
    transparentBlock7.enableBody(true, transparentBlock7.x, transparentBlock7.y, true, true);
    transparentBlock7.body.allowGravity = false;
    transparentBlock7.body.velocity.y = 0;
}
function resetHiddenBlock8(transparentBlock8) {
    transparentBlock8.x = 4680;
    transparentBlock8.y = 688;
    transparentBlock8.alpha = transparentBlock8.initialAlpha;
    transparentBlock8.setData('isHidden', true);
    transparentBlock8.enableBody(true, transparentBlock8.x, transparentBlock8.y, true, true);
    transparentBlock8.body.allowGravity = false;
    transparentBlock8.body.velocity.y = 0;
}
function resetHiddenBlock9(transparentBlock9) {
    transparentBlock9.x = 1350;
    transparentBlock9.y = 628;
    transparentBlock9.alpha = transparentBlock9.initialAlpha;
    transparentBlock9.setData('isHidden', true);
    transparentBlock9.enableBody(true, transparentBlock9.x, transparentBlock9.y, true, true);
    transparentBlock9.body.allowGravity = false;
    transparentBlock9.body.velocity.y = 0;
}
function resetHiddenBlock10(transparentBlock10) {
    transparentBlock10.x = 2468;
    transparentBlock10.y = H - 152;
    transparentBlock10.alpha = transparentBlock10.initialAlpha;
    transparentBlock10.setData('isHidden', true);
    transparentBlock10.enableBody(true, transparentBlock10.x, transparentBlock10.y, true, true);
    transparentBlock10.body.allowGravity = false;
    transparentBlock10.body.velocity.y = 0;
}
function resetHiddenBlock11(transparentBlock11) {
    transparentBlock11.x = 2400;
    transparentBlock11.y = H - 207;
    transparentBlock11.alpha = transparentBlock11.initialAlpha;
    transparentBlock11.setData('isHidden', true);
    transparentBlock11.enableBody(true, transparentBlock11.x, transparentBlock11.y, true, true);
    transparentBlock11.body.allowGravity = false;
    transparentBlock11.body.velocity.y = 0;
}
function resetHiddenBlock12(transparentBlock12) {
    transparentBlock12.x = 2598;
    transparentBlock12.y = 598;
    transparentBlock12.alpha = transparentBlock12.initialAlpha;
    transparentBlock12.setData('isHidden', true);
    transparentBlock12.enableBody(true, transparentBlock12.x, transparentBlock12.y, true, true);
    transparentBlock12.body.allowGravity = false;
    transparentBlock12.body.velocity.y = 0;
}

function resetHiddenBlock13(transparentBlock13) {
    transparentBlock13.x = 4470;
    transparentBlock13.y = 688;
    transparentBlock13.alpha = transparentBlock13.initialAlpha;
    transparentBlock13.setData('isHidden', true);
    transparentBlock13.enableBody(true, transparentBlock13.x, transparentBlock13.y, true, true);
    transparentBlock13.body.allowGravity = false;
    transparentBlock13.body.velocity.y = 0;
}
function resetHiddenBlock14(transparentBlock14) {
    transparentBlock14.x = 4470;
    transparentBlock14.y = 718;
    transparentBlock14.alpha = transparentBlock14.initialAlpha;
    transparentBlock14.setData('isHidden', true);
    transparentBlock14.enableBody(true, transparentBlock14.x, transparentBlock14.y, true, true);
    transparentBlock14.body.allowGravity = false;
    transparentBlock14.body.velocity.y = 0;
}
function resetHiddenBlock15(transparentBlock15) {
    transparentBlock15.x = 4470;
    transparentBlock15.y = 748;
    transparentBlock15.alpha = transparentBlock15.initialAlpha;
    transparentBlock15.setData('isHidden', true);
    transparentBlock15.enableBody(true, transparentBlock15.x, transparentBlock15.y, true, true);
    transparentBlock15.body.allowGravity = false;
    transparentBlock15.body.velocity.y = 0;
}
function resetHiddenBlock16(transparentBlock16) {
    transparentBlock16.x = 5090;
    transparentBlock16.y = 677;
    transparentBlock16.alpha = transparentBlock16.initialAlpha;
    transparentBlock16.setData('isHidden', true);
    transparentBlock16.enableBody(true, transparentBlock16.x, transparentBlock16.y, true, true);
    transparentBlock16.body.allowGravity = false;
    transparentBlock16.body.velocity.y = 0;
}
function resetHiddenBlock17(transparentBlock17) {
    transparentBlock17.x = 5180;
    transparentBlock17.y = 718;
    transparentBlock17.alpha = transparentBlock17.initialAlpha;
    transparentBlock17.setData('isHidden', true);
    transparentBlock17.enableBody(true, transparentBlock17.x, transparentBlock17.y, true, true);
    transparentBlock17.body.allowGravity = false;
    transparentBlock17.body.velocity.y = 0;
}
function resetHiddenBlock18(transparentBlock18) {
    transparentBlock18.x = 5180;
    transparentBlock18.y = 636;
    transparentBlock18.alpha = transparentBlock18.initialAlpha;
    transparentBlock18.setData('isHidden', true);
    transparentBlock18.enableBody(true, transparentBlock18.x, transparentBlock18.y, true, true);
    transparentBlock18.body.allowGravity = false;
    transparentBlock18.body.velocity.y = 0;
}
function resetHiddenBlock19(transparentBlock19) {
    transparentBlock19.x = 5370;
    transparentBlock19.y = 677;
    transparentBlock19.alpha = transparentBlock19.initialAlpha;
    transparentBlock19.setData('isHidden', true);
    transparentBlock19.enableBody(true, transparentBlock19.x, transparentBlock19.y, true, true);
    transparentBlock19.body.allowGravity = false;
    transparentBlock19.body.velocity.y = 0;
}
function resetHiddenBlock20(transparentBlock20) {
    transparentBlock20.x = 5370;
    transparentBlock20.y = 636;
    transparentBlock20.alpha = transparentBlock20.initialAlpha;
    transparentBlock20.setData('isHidden', true);
    transparentBlock20.enableBody(true, transparentBlock20.x, transparentBlock20.y, true, true);
    transparentBlock20.body.allowGravity = false;
    transparentBlock20.body.velocity.y = 0;
}
function resetHiddenBlock21(transparentBlock21) {
    transparentBlock21.x = 5370;
    transparentBlock21.y = 605;
    transparentBlock21.alpha = transparentBlock21.initialAlpha;
    transparentBlock21.setData('isHidden', true);
    transparentBlock21.enableBody(true, transparentBlock21.x, transparentBlock21.y, true, true);
    transparentBlock21.body.allowGravity = false;
    transparentBlock21.body.velocity.y = 0;
}
function resetHiddenBlock22(transparentBlock22) {
    transparentBlock22.x = 5370;
    transparentBlock22.y = 574;
    transparentBlock22.alpha = transparentBlock22.initialAlpha;
    transparentBlock22.setData('isHidden', true);
    transparentBlock22.enableBody(true, transparentBlock22.x, transparentBlock22.y, true, true);
    transparentBlock22.body.allowGravity = false;
    transparentBlock22.body.velocity.y = 0;
}
function resetHiddenBlock23(transparentBlock23) {
    transparentBlock23.x = 5370;
    transparentBlock23.y = 543;
    transparentBlock23.alpha = transparentBlock23.initialAlpha;
    transparentBlock23.setData('isHidden', true);
    transparentBlock23.enableBody(true, transparentBlock23.x, transparentBlock23.y, true, true);
    transparentBlock23.body.allowGravity = false;
    transparentBlock23.body.velocity.y = 0;
}
function resetHiddenBlock24(transparentBlock24) {
    transparentBlock24.x = 5500;
    transparentBlock24.y = 512;
    transparentBlock24.alpha = transparentBlock24.initialAlpha;
    transparentBlock24.setData('isHidden', true);
    transparentBlock24.enableBody(true, transparentBlock24.x, transparentBlock24.y, true, true);
    transparentBlock24.body.allowGravity = false;
    transparentBlock24.body.velocity.y = 0;
}
function resetHiddenBlock25(transparentBlock25) {
    transparentBlock25.x = 5500;
    transparentBlock25.y = 430;
    transparentBlock25.alpha = transparentBlock25.initialAlpha;
    transparentBlock25.setData('isHidden', true);
    transparentBlock25.enableBody(true, transparentBlock25.x, transparentBlock25.y, true, true);
    transparentBlock25.body.allowGravity = false;
    transparentBlock25.body.velocity.y = 0;
}
function resetHiddenBlock26(transparentBlock26) {
    transparentBlock26.x = 5590;
    transparentBlock26.y = 471;
    transparentBlock26.alpha = transparentBlock26.initialAlpha;
    transparentBlock26.setData('isHidden', true);
    transparentBlock26.enableBody(true, transparentBlock26.x, transparentBlock26.y, true, true);
    transparentBlock26.body.allowGravity = false;
    transparentBlock26.body.velocity.y = 0;
}
function resetHiddenBlock27(transparentBlock27) {
    transparentBlock27.x = 5590;
    transparentBlock27.y = 389;
    transparentBlock27.alpha = transparentBlock27.initialAlpha;
    transparentBlock27.setData('isHidden', true);
    transparentBlock27.enableBody(true, transparentBlock27.x, transparentBlock27.y, true, true);
    transparentBlock27.body.allowGravity = false;
    transparentBlock27.body.velocity.y = 0;
}
function resetHiddenBlock28(transparentBlock28) {
    transparentBlock28.x = 5665;
    transparentBlock28.y = 430;
    transparentBlock28.alpha = transparentBlock28.initialAlpha;
    transparentBlock28.setData('isHidden', true);
    transparentBlock28.enableBody(true, transparentBlock28.x, transparentBlock28.y, true, true);
    transparentBlock28.body.allowGravity = false;
    transparentBlock28.body.velocity.y = 0;
}
function resetHiddenBlock29(transparentBlock29) {
    transparentBlock29.x = 5665;
    transparentBlock29.y = 348;
    transparentBlock29.alpha = transparentBlock29.initialAlpha;
    transparentBlock29.setData('isHidden', true);
    transparentBlock29.enableBody(true, transparentBlock29.x, transparentBlock29.y, true, true);
    transparentBlock29.body.allowGravity = false;
    transparentBlock29.body.velocity.y = 0;
}
function resetHiddenBlock30(transparentBlock30) {
    transparentBlock30.x = 5960;
    transparentBlock30.y = H - 63.5;
    transparentBlock30.alpha = transparentBlock30.initialAlpha;
    transparentBlock30.setData('isHidden', true);
    transparentBlock30.enableBody(true, transparentBlock30.x, transparentBlock30.y, true, true);
    transparentBlock30.body.allowGravity = false;
    transparentBlock30.body.velocity.y = 0;
}
function resetHiddenBlock31(transparentBlock31) {
    transparentBlock31.x = 5990;
    transparentBlock31.y = H - 93.5;
    transparentBlock31.alpha = transparentBlock31.initialAlpha;
    transparentBlock31.setData('isHidden', true);
    transparentBlock31.enableBody(true, transparentBlock31.x, transparentBlock31.y, true, true);
    transparentBlock31.body.allowGravity = false;
    transparentBlock31.body.velocity.y = 0;
}
function resetHiddenBlock32(transparentBlock32) {
    transparentBlock32.x = 6020;
    transparentBlock32.y = H - 123.5;
    transparentBlock32.alpha = transparentBlock32.initialAlpha;
    transparentBlock32.setData('isHidden', true);
    transparentBlock32.enableBody(true, transparentBlock32.x, transparentBlock32.y, true, true);
    transparentBlock32.body.allowGravity = false;
    transparentBlock32.body.velocity.y = 0;
}
function resetHiddenBlock33(transparentBlock33) {
    transparentBlock33.x = 6050;
    transparentBlock33.y = H - 153.5;
    transparentBlock33.alpha = transparentBlock33.initialAlpha;
    transparentBlock33.setData('isHidden', true);
    transparentBlock33.enableBody(true, transparentBlock33.x, transparentBlock33.y, true, true);
    transparentBlock33.body.allowGravity = false;
    transparentBlock33.body.velocity.y = 0;
}
function resetHiddenBlock34(transparentBlock34) {
    transparentBlock34.x = 6080;
    transparentBlock34.y = H - 183.5;
    transparentBlock34.alpha = transparentBlock34.initialAlpha;
    transparentBlock34.setData('isHidden', true);
    transparentBlock34.enableBody(true, transparentBlock34.x, transparentBlock34.y, true, true);
    transparentBlock34.body.allowGravity = false;
    transparentBlock34.body.velocity.y = 0;
}
function resetHiddenBlock35(transparentBlock35) {
    transparentBlock35.x = 6110;
    transparentBlock35.y = H - 213.5;
    transparentBlock35.alpha = transparentBlock35.initialAlpha;
    transparentBlock35.setData('isHidden', true);
    transparentBlock35.enableBody(true, transparentBlock35.x, transparentBlock35.y, true, true);
    transparentBlock35.body.allowGravity = false;
    transparentBlock35.body.velocity.y = 0;
}
function resetHiddenBlock36(transparentBlock36) {
    transparentBlock36.x = 6110;
    transparentBlock36.y = H - 243.5;
    transparentBlock36.alpha = transparentBlock36.initialAlpha;
    transparentBlock36.setData('isHidden', true);
    transparentBlock36.enableBody(true, transparentBlock36.x, transparentBlock36.y, true, true);
    transparentBlock36.body.allowGravity = false;
    transparentBlock36.body.velocity.y = 0;
}
function resetHiddenBlock37(transparentBlock37) {
    transparentBlock37.x = 6110;
    transparentBlock37.y = H - 273.5;
    transparentBlock37.alpha = transparentBlock37.initialAlpha;
    transparentBlock37.setData('isHidden', true);
    transparentBlock37.enableBody(true, transparentBlock37.x, transparentBlock37.y, true, true);
    transparentBlock37.body.allowGravity = false;
    transparentBlock37.body.velocity.y = 0;
}
function resetHiddenBlock38(transparentBlock38) {
    transparentBlock38.x = 6110;
    transparentBlock38.y = H - 303.5;
    transparentBlock38.alpha = transparentBlock38.initialAlpha;
    transparentBlock38.setData('isHidden', true);
    transparentBlock38.enableBody(true, transparentBlock38.x, transparentBlock38.y, true, true);
    transparentBlock38.body.allowGravity = false;
    transparentBlock38.body.velocity.y = 0;
}
function resetHiddenBlock39(transparentBlock39) {
    transparentBlock39.x = 6140;
    transparentBlock39.y = H - 333.5;
    transparentBlock39.alpha = transparentBlock39.initialAlpha;
    transparentBlock39.setData('isHidden', true);
    transparentBlock39.enableBody(true, transparentBlock39.x, transparentBlock39.y, true, true);
    transparentBlock39.body.allowGravity = false;
    transparentBlock39.body.velocity.y = 0;
}
function resetHiddenBlock40(transparentBlock40) {
    transparentBlock40.x = 6170;
    transparentBlock40.y = H - 363.5;
    transparentBlock40.alpha = transparentBlock40.initialAlpha;
    transparentBlock40.setData('isHidden', true);
    transparentBlock40.enableBody(true, transparentBlock40.x, transparentBlock40.y, true, true);
    transparentBlock40.body.allowGravity = false;
    transparentBlock40.body.velocity.y = 0;
}
function resetHiddenBlock41(transparentBlock41) {
    transparentBlock41.x = 6210;
    transparentBlock41.y = H - 393.5;
    transparentBlock41.alpha = transparentBlock41.initialAlpha;
    transparentBlock41.setData('isHidden', true);
    transparentBlock41.enableBody(true, transparentBlock41.x, transparentBlock41.y, true, true);
    transparentBlock41.body.allowGravity = false;
    transparentBlock41.body.velocity.y = 0;
}
function resetHiddenBlock42(transparentBlock42) {
    transparentBlock42.x = 6020;
    transparentBlock42.y = H - 243.5;
    transparentBlock42.alpha = transparentBlock42.initialAlpha;
    transparentBlock42.setData('isHidden', true);
    transparentBlock42.enableBody(true, transparentBlock42.x, transparentBlock42.y, true, true);
    transparentBlock42.body.allowGravity = false;
    transparentBlock42.body.velocity.y = 0;
}
function resetHiddenBlock43(transparentBlock43) {
    transparentBlock43.x = 6020;
    transparentBlock43.y = H - 273.5;
    transparentBlock43.alpha = transparentBlock43.initialAlpha;
    transparentBlock43.setData('isHidden', true);
    transparentBlock43.enableBody(true, transparentBlock43.x, transparentBlock43.y, true, true);
    transparentBlock43.body.allowGravity = false;
    transparentBlock43.body.velocity.y = 0;
}
function resetHiddenBlock44(transparentBlock44) {
    transparentBlock44.x = 6050;
    transparentBlock44.y = H - 213.5;
    transparentBlock44.alpha = transparentBlock44.initialAlpha;
    transparentBlock44.setData('isHidden', true);
    transparentBlock44.enableBody(true, transparentBlock44.x, transparentBlock44.y, true, true);
    transparentBlock44.body.allowGravity = false;
    transparentBlock44.body.velocity.y = 0;
}
// // ================================================================== //
// 뿔나무 초기화
function resetTrees1(Trees1) {
    Trees1.x = 3550;
    Trees1.y = H - 78;
    Trees1.enableBody(true, Trees1.x, Trees1.y, true, true);
    Trees1.body.allowGravity = false; 
    Trees1.body.velocity.y = 0;
};
function resetTrees2(Trees2) {
    Trees2.x = 4500;
    Trees2.y = H - 78;
    Trees2.enableBody(true, Trees2.x, Trees2.y, true, true);
    Trees2.body.allowGravity = false; 
    Trees2.body.velocity.y = 0;
};
function resetTrees3(Trees3) {
    Trees3.x = 1000;
    Trees3.y = H - 78;
    Trees3.enableBody(true, Trees3.x, Trees3.y, true, true);
    Trees3.body.allowGravity = false; 
    Trees3.body.velocity.y = 0;
};
function resetTrees4(Trees4) {
    Trees4.x = 2120;
    Trees4.y = H - 78;
    Trees4.enableBody(true, Trees4.x, Trees4.y, true, true);
    Trees4.body.allowGravity = false; 
    Trees4.body.velocity.y = 0;
};
//  =================================================================== //
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
    const mobbs = [mobb2, mobb3,mobb5, mobb6, mobb9, mobb12, mobb14, mobb19, mobb30, mobb31, mobb32, mobb33, mobb34, mobb35];//위에서 아래-난이도 하
    const mobbs1 = [mobb1, mobb4, mobb7];//위에서 아래-난이도 상
    const mobbs2 = [mobb8,mobb10, mobb11, mobb13, mobb15, mobb16, mobb17, mobb18, mobb20, mobb21, mobb22, mobb23, mobb24, mobb25, mobb26, mobb27, mobb28, mobb29]; // 아래에서 위로
    const playerX = this.player.x;
    const gravityValue = 800; // 중력 값
    
    // 각 몬스터에 대해 처리
    mobbs.forEach((mobb) => {
        const mobbX = mobb.x; // 몬스터의 X 좌표
    
        // 플레이어와 몬스터 간의 거리 계산
        const distance = Math.abs(playerX - mobbX);
    
        if (distance <= 85) {
            mobb.body.allowGravity = true;
            mobb.body.gravity.y = gravityValue;
        } else {
            mobb.body.allowGravity = false;
            mobb.body.gravity.y = 0;
        }
    });

    const gravityValue1 = 1000;
    mobbs1.forEach((mobb) => {
        const mobbX = mobb.x;
        const distance = Math.abs(playerX - mobbX);
        if (distance <= 80) {
            mobb.body.allowGravity = true;
            mobb.body.gravity.y = gravityValue1;
        } else {
            mobb.body.allowGravity = false;
            mobb.body.gravity.y = 0;
        }
    });

    mobbs2.forEach((mobb) => {
        const mobbX = mobb.x; // 몬스터의 X 좌표
    
        // 플레이어와 몬스터 간의 거리 계산
        const distance = Math.abs(playerX - mobbX);
    
        if (distance <= 85) {
            mobb.body.allowGravity = true;
            mobb.body.gravity.y = gravityValue;
            mobb.body.velocity.y = -900; 
        } else {
            mobb.body.allowGravity = false;
            mobb.body.gravity.y = 0;
        }
    });

// ================================================================== //

    blockHs.forEach(block => {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), block.getBounds())) {
            block.alpha = 0.5; // 플레이어와 블록이 충돌하면 반투명하게 설정
        } else {
            block.alpha = 1; // 그렇지 않으면 블록을 다시 투명하게 설정
        }
    });


// ================================================================== //

    // 적이 자동으로 움직이고 이미지를 반전시키기 위한 로직
    const enemies = [this.e1, this.e2, this.e3, this.e4, this.e5, this.e6, this.e7,
                    this.e8, this.e9, this.e10];

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
            resetMob20(mobb20)
            resetMob21(mobb21)
            resetMob22(mobb22)
            resetMob23(mobb23)
            resetMob24(mobb24)
            resetMob25(mobb25)
            resetMob26(mobb26)
            resetMob27(mobb27)
            resetMob28(mobb28)
            resetMob29(mobb29)
            resetMob30(mobb30)
            resetMob31(mobb31)
            resetMob32(mobb32)
            resetMob33(mobb33)
            resetMob34(mobb34)
            resetMob35(mobb35)
            
            resetBlockA1(blockA1);
            resetBlockA2(blockA2);
            resetBlockA3(blockA3);
            resetBlockA4(blockA4);
            resetBlockA5(blockA5);
            resetBlockA6(blockA6);
            resetBlockA7(blockA7);
            resetBlockA8(blockA8);

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
            resetHiddenBlock26(transparentBlock26);
            resetHiddenBlock27(transparentBlock27);
            resetHiddenBlock28(transparentBlock28);
            resetHiddenBlock29(transparentBlock29);
            resetHiddenBlock30(transparentBlock30);
            resetHiddenBlock31(transparentBlock31);
            resetHiddenBlock32(transparentBlock32);
            resetHiddenBlock33(transparentBlock33);
            resetHiddenBlock34(transparentBlock34);
            resetHiddenBlock35(transparentBlock35);
            resetHiddenBlock36(transparentBlock36);
            resetHiddenBlock37(transparentBlock37);
            resetHiddenBlock38(transparentBlock38);
            resetHiddenBlock39(transparentBlock39);
            resetHiddenBlock40(transparentBlock40);
            resetHiddenBlock41(transparentBlock41);
            resetHiddenBlock42(transparentBlock42);
            resetHiddenBlock43(transparentBlock43);
            resetHiddenBlock44(transparentBlock44);


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
            resetMob20(mobb20)
            resetMob21(mobb21)
            resetMob22(mobb22)
            resetMob23(mobb23)
            resetMob24(mobb24)
            resetMob25(mobb25)
            resetMob26(mobb26)
            resetMob27(mobb27)
            resetMob28(mobb28)
            resetMob29(mobb29)
            resetMob30(mobb30)
            resetMob31(mobb31)
            resetMob32(mobb32)
            resetMob33(mobb33)
            resetMob34(mobb34)
            resetMob35(mobb35)

            resetBlockA1(blockA1);
            resetBlockA2(blockA2);
            resetBlockA3(blockA3);
            resetBlockA4(blockA4);
            resetBlockA5(blockA5);
            resetBlockA6(blockA6);
            resetBlockA7(blockA7);
            resetBlockA8(blockA8);

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
            resetHiddenBlock26(transparentBlock26);
            resetHiddenBlock27(transparentBlock27);
            resetHiddenBlock28(transparentBlock28);
            resetHiddenBlock29(transparentBlock29);
            resetHiddenBlock30(transparentBlock30);
            resetHiddenBlock31(transparentBlock31);
            resetHiddenBlock32(transparentBlock32);
            resetHiddenBlock33(transparentBlock33);
            resetHiddenBlock34(transparentBlock34);
            resetHiddenBlock35(transparentBlock35);
            resetHiddenBlock36(transparentBlock36);
            resetHiddenBlock37(transparentBlock37);
            resetHiddenBlock38(transparentBlock38);
            resetHiddenBlock39(transparentBlock39);
            resetHiddenBlock40(transparentBlock40);
            resetHiddenBlock41(transparentBlock41);
            resetHiddenBlock42(transparentBlock42);
            resetHiddenBlock43(transparentBlock43);
            resetHiddenBlock44(transparentBlock44);

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
            resetMob20(mobb20)
            resetMob21(mobb21)
            resetMob22(mobb22)
            resetMob23(mobb23)
            resetMob24(mobb24)
            resetMob25(mobb25)
            resetMob26(mobb26)
            resetMob27(mobb27)
            resetMob28(mobb28)
            resetMob29(mobb29)
            resetMob30(mobb30)
            resetMob31(mobb31)
            resetMob32(mobb32)
            resetMob33(mobb33)
            resetMob34(mobb34)
            resetMob35(mobb35)

            resetBlockA1(blockA1);
            resetBlockA2(blockA2);
            resetBlockA3(blockA3);
            resetBlockA4(blockA4);
            resetBlockA5(blockA5);
            resetBlockA6(blockA6);
            resetBlockA7(blockA7);
            resetBlockA8(blockA8);

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
            resetHiddenBlock26(transparentBlock26);
            resetHiddenBlock27(transparentBlock27);
            resetHiddenBlock28(transparentBlock28);
            resetHiddenBlock29(transparentBlock29);
            resetHiddenBlock30(transparentBlock30);
            resetHiddenBlock31(transparentBlock31);
            resetHiddenBlock32(transparentBlock32);
            resetHiddenBlock33(transparentBlock33);
            resetHiddenBlock34(transparentBlock34);
            resetHiddenBlock35(transparentBlock35);
            resetHiddenBlock36(transparentBlock36);
            resetHiddenBlock37(transparentBlock37);
            resetHiddenBlock38(transparentBlock38);
            resetHiddenBlock39(transparentBlock39);
            resetHiddenBlock40(transparentBlock40);
            resetHiddenBlock41(transparentBlock41);
            resetHiddenBlock42(transparentBlock42);
            resetHiddenBlock43(transparentBlock43);
            resetHiddenBlock44(transparentBlock44);

            resetTrees1(Trees1);
            resetTrees2(Trees2);
            resetTrees3(Trees3);
            resetTrees4(Trees4);

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
        resetMob20(mobb20)
        resetMob21(mobb21)
        resetMob22(mobb22)
        resetMob23(mobb23)
        resetMob24(mobb24)
        resetMob25(mobb25)
        resetMob26(mobb26)
        resetMob27(mobb27)
        resetMob28(mobb28)
        resetMob29(mobb29)
        resetMob30(mobb30)
        resetMob31(mobb31)
        resetMob32(mobb32)
        resetMob33(mobb33)
        resetMob34(mobb34)
        resetMob35(mobb35)

        resetBlockA1(blockA1);
        resetBlockA2(blockA2);
        resetBlockA3(blockA3);
        resetBlockA4(blockA4);
        resetBlockA5(blockA5);
        resetBlockA6(blockA6);
        resetBlockA7(blockA7);
        resetBlockA8(blockA8);

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
        resetHiddenBlock26(transparentBlock26);
        resetHiddenBlock27(transparentBlock27);
        resetHiddenBlock28(transparentBlock28);
        resetHiddenBlock29(transparentBlock29);
        resetHiddenBlock30(transparentBlock30);
        resetHiddenBlock31(transparentBlock31);
        resetHiddenBlock32(transparentBlock32);
        resetHiddenBlock33(transparentBlock33);
        resetHiddenBlock34(transparentBlock34);
        resetHiddenBlock35(transparentBlock35);
        resetHiddenBlock36(transparentBlock36);
        resetHiddenBlock37(transparentBlock37);
        resetHiddenBlock38(transparentBlock38);
        resetHiddenBlock39(transparentBlock39);
        resetHiddenBlock40(transparentBlock40);
        resetHiddenBlock41(transparentBlock41);
        resetHiddenBlock42(transparentBlock42);
        resetHiddenBlock43(transparentBlock43);
        resetHiddenBlock44(transparentBlock44);

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


    // 배경 음악을 찾아서 일시 정지
    var bgm = this.sound.get('bgm');
    bgm.pause();

    // death 음악 재생
    var deathSound = this.sound.add('death');
    deathSound.play();

    cloud.setTexture('cloud3');
    
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
        resetMob20(mobb20)
        resetMob21(mobb21)
        resetMob22(mobb22)
        resetMob23(mobb23)
        resetMob24(mobb24)
        resetMob25(mobb25)
        resetMob26(mobb26)
        resetMob27(mobb27)
        resetMob28(mobb28)
        resetMob29(mobb29)
        resetMob30(mobb30)
        resetMob31(mobb31)
        resetMob32(mobb32)
        resetMob33(mobb33)
        resetMob34(mobb34)
        resetMob35(mobb35)

        resetBlockA1(blockA1);
        resetBlockA2(blockA2);
        resetBlockA3(blockA3);
        resetBlockA4(blockA4);
        resetBlockA5(blockA5);
        resetBlockA6(blockA6);
        resetBlockA7(blockA7);
        resetBlockA8(blockA8);

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
        resetHiddenBlock26(transparentBlock26);
        resetHiddenBlock27(transparentBlock27);
        resetHiddenBlock28(transparentBlock28);
        resetHiddenBlock29(transparentBlock29);
        resetHiddenBlock30(transparentBlock30);
        resetHiddenBlock31(transparentBlock31);
        resetHiddenBlock32(transparentBlock32);
        resetHiddenBlock33(transparentBlock33);
        resetHiddenBlock34(transparentBlock34);
        resetHiddenBlock35(transparentBlock35);
        resetHiddenBlock36(transparentBlock36);
        resetHiddenBlock37(transparentBlock37);
        resetHiddenBlock38(transparentBlock38);
        resetHiddenBlock39(transparentBlock39);
        resetHiddenBlock40(transparentBlock40);
        resetHiddenBlock41(transparentBlock41);
        resetHiddenBlock42(transparentBlock42);
        resetHiddenBlock43(transparentBlock43);
        resetHiddenBlock44(transparentBlock44);

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