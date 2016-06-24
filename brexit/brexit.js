// (C) Coded by Ziv Barber for Kazong-Games.
var maxViewX = 400;
var maxViewY = 600;
var maxTotalX = 800;
var maxTotalY = 1920;

// Phaser.CANVAS
var game = new Phaser.Game (
	maxViewX,
	maxViewY,
	Phaser.AUTO,
	'brexit',
	{
		preload: preload,
		create: create,
		update: update,
		render: render
	}
);

function preload () {
    game.load.image ( 'tomato', 'tea.png' );
    game.load.image ( 'tomato2', 'tea2.png' );
    game.load.image ( 'back', 'back.jpg' );
	game.load.image ( 'cursor', 'cursor.png' );
	game.load.bitmapFont ( 'stack', 'desyrel.png', 'desyrel.xml' );
	game.load.spritesheet ( 'dave', 'dave.png', 211, 275, 28 );
}

var sprite1;
var sprite2;
var sprite3;
var spriteMaterial;

var cursors;
var scoreText;
var timeText;
var gameObjsList;
var gameObjsList2;
var midText = null;
var daveAn = null;
var rectA;
var hitY;
var hitX;
var hitSY;
var hitSX;
var mouseBody = null;

// game.camera.y

function create () {
	// image
	var backImg = game.add.sprite ( Math.floor ((maxTotalX - maxViewX) / 2), 0, 'back' );
	// backImg.scale.setTo ( 0.5, 0.5 );

	game.world.setBounds ( 0, 0, maxTotalX, maxTotalY );
	game.camera.x = Math.floor ((maxTotalX - maxViewX) / 2);

	// Enable p2 physics:
	game.physics.startSystem ( Phaser.Physics.P2JS );

	game.physics.p2.gravity.y = 300;

	spriteMaterial = game.physics.p2.createMaterial ( 'spriteMaterial' );
	var worldMaterial = game.physics.p2.createMaterial ( 'worldMaterial' );
	var contactMaterial = game.physics.p2.createContactMaterial ( spriteMaterial, worldMaterial, { restitution: 1.0 } );

	game.physics.p2.setWorldMaterial ( worldMaterial );

	gameObjsList = game.add.group ();
	gameObjsList2 = game.add.group ();

	// The mouse:
	/*
	mouseBody = game.add.sprite ( 100, 100, 'cursor' );
	game.physics.p2.enable ( mouseBody, true );
	mouseBody.body.static = true;
	mouseBody.body.setCircle (10);
	mouseBody.body.data.shapes[0].sensor = true;
	*/

	// The text:
	scoreText = game.add.bitmapText ( 10 + game.camera.x, 10, 'stack', '  ', 32 );
	timeText = game.add.bitmapText ( 190 + game.camera.x, 10, 'stack', '  ', 32 );

	game.input.onDown.add ( click, this );
	// game.input.onUp.add ( release, this );
	game.input.addMoveCallback ( move, this );

	hitX = 150 + game.camera.x;
	hitY = 200;
	hitSX = 100;
	hitSY = 270;
	rectA = new Phaser.Rectangle ( hitX, hitY, hitSX, hitSY );

	daveAn = game.add.sprite ( 170 + game.camera.x, 200, 'dave' );
	daveAn.scale.setTo ( 0.3, 0.3 );
	var daveAnO = daveAn.animations.add ( 'face' );
	daveAn.animations.play ( 'face', 30, true );

	// cursors = game.input.keyboard.createCursorKeys ();
	// game.input.keyboard.addCallbacks ( this, keyPress, null, null );
	setOpenScreen ();
}

var curY = 100;
var curX = 100;
var clicks = 0;
var curGateState = -1;
var timeLeft = 20;

function clearScreen () {
	gameObjsList.destroy ( true );
	gameObjsList2.destroy ( true );
	gameObjsList = game.add.group ();
	gameObjsList2 = game.add.group ();
	scoreText.text = '   ';
	timeText.text = '   ';
	if ( midText ) {
		midText.destroy ();
		midText = null;
	} // Endif.
}

function setOpenScreen () {
	curGateState = 0;
	if ( midText ) {
		midText.destroy ();
		midText = null;
	} // Endif.
	midText = game.add.bitmapText ( 30 + game.camera.x, 530, 'stack', 'Click to play Brexit!', 32 );
}

function setGameOver () {
	curGateState = 2;
	if ( midText ) {
		midText.destroy ();
		midText = null;
	} // Endif.
	midText = game.add.bitmapText ( 100 + game.camera.x, 250, 'stack', 'Game\nOver', 64 );
	setTimeout ( function () {
		checkIfHigh ( clicks );
	}, 2000 );
}

function click ( pointer ) {
	if ( curGateState === 0 ) {
		clearScreen ();
		clicks = 0;
		curGateState = 1;
		timeLeft = 20;
		scoreText.text = 'Clicks: ' + clicks;
		timeText.text = 'Time left: ' + timeLeft;
		if ( midText ) {
			midText.destroy ();
			midText = null;
		} // Endif.

		var timeObj = setInterval ( function () {
			timeLeft--;
			if ( timeLeft <= 0 ) {
				clearInterval ( timeObj );
				timeObj = null;
				timeLeft = 0;
				timeText.text = 'Time left: ' + timeLeft;
				setGameOver ();

			} else {
				timeText.text = 'Time left: ' + timeLeft;
			} // Endif.
		}, 1000 );

	} else if ( curGateState === 1 ) {
		var selX = Math.floor ( Math.random () * maxViewX );
		var sprite = gameObjsList.create ( selX + game.camera.x, maxViewY - 50, 'tomato' );
		sprite.scale.setTo ( 0.2, 0.2 );
		game.physics.p2.enable ( sprite );
		sprite.body.setMaterial ( spriteMaterial );
		sprite.body.data.gravityScale = 1;
		// var angle = Math.atan2 ( maxViewY * 0.66, selX );
		// var angle = game.math.degToRad ( 45 );
		var angle = selX / maxViewX;
		angle = angle >= 0.5 ? (angle - 0.5) * -1 : 0.5 - angle;
		angle *= 30;
		sprite.body.rotation = game.math.degToRad ( angle < 0 ? 360 + angle : angle ); // + game.math.degToRad ( 180 );
		// sprite.body.force.x = Math.random () * 50;
		// sprite.body.force.y = Math.random () * 50;
		sprite.body.thrust ( 70000 );
		// sprite.body.reverse ( 200 );
		clicks++;
		scoreText.text = 'Clicks: ' + clicks;
		timeText.text = 'Time left: ' + timeLeft;

	} else {
	} // Endif.
}

function keyPress ( char ) {
	click ();
}

function move ( pointer, x, y, isDown ) {
	if ( mouseBody ) {
		mouseBody.body.x = x + game.camera.x;
		mouseBody.body.y = y;
	} // Endif.

	curY = y + game.camera.x;
	curX = x;
}

function update () {
	if ( curGateState === 1 ) {
		gameObjsList.forEachAlive ( function ( sprData ) {
			if ( sprData.x >= hitX && sprData.y >= hitY && sprData.x < (hitX + hitSX) && sprData.y < (hitY + hitSY) ) {
				if ( Math.floor ( Math.random () * 100 ) > 75 ) {
					var sprite = gameObjsList2.create ( sprData.x, sprData.y, 'tomato2' );
					sprite.scale.setTo ( 0.15, 0.15 );
					// game.physics.p2.enable ( sprite );
					// sprite.body.setMaterial ( spriteMaterial );
					// sprite.body.data.gravityScale = 1;
					sprData.destroy ();
				} // Endif.
			} // Endif.
		}, this );
	} // Endif.
}

function render () {
	if ( rectA ) {
		// game.debug.geom ( rectA, 'rgba(200,0,0,0.5)' );
	} // Endif.
}

function fillHighScore () {
	$('#brexit').hide ();
	$('#submit').hide ();
	$('#gameOver').show ();
	$('#board').show ();
	sendAjaxToTheServer ( 'GET', {}, function ( code, retData ) {
		if ( code ) {
			// alert ( JSON.stringify ( retData ) );
			retData.data.forEach ( function ( value, index ) {
				$('#scoreTable').append ( '<tr><td>' + (index + 1) + '</td><td>' + value.displayName + '</td><td>' + value.highScore + '</td></tr>' );
			});
		} // Endif.
	});
}

function fillHighScoreAfter () {
	$('#board').hide ();
	$('#gameOver').hide ();
	$('#brexit').show ();
	setOpenScreen ();
}

var userCurHigh = 0;
var userCurName = null;

function checkIfHigh ( newScore ) {
	if ( newScore > userCurHigh ) {
		userCurHigh = newScore;
		$('#brexit').hide ();
		$('#gameOver').show ();
		$('#submit').show ();
		return;
	} // Endif.

	fillHighScore ();
}

function onHighScoreSubmit () {
	userCurName = $('#userIn').val ();
	// userCurHigh = newScore;
	sendAjaxToTheServer ( 'POST', { displayName: userCurName, highScore: userCurHigh }, function ( code ) {
		fillHighScore ();
	});
}

function sendAjaxToTheServer ( reqType, inData, funcend ) {
	$.ajax ({
		url: 'https://kazong-game.com/api/brexit',
		type: reqType || 'GET',
		data: inData || {},
		datatype: "json",
		retryLimit: 3,
		retryAfter: 7000,
		timeout: 20000,
		success: function ( retData, statusCode, xhr ) {
			funcend ( true, retData );

		}, error: function ( xhr, statusCode , error ) {
			// alert ( statusCode + ' ' + error );
			funcend ( false );
		}
	});
}
