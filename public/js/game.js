//Main logic of the GAME

(function(){
	
	$(document).ready(function(){
		
		var socket = io();
		
		var seqNum;
		
		var token,user,color,isHost;
		token = $('#mainScreen').attr('data-token'); 
		user = $('#mainScreen').attr('data-user');
		isHost = $('#mainScreen').attr('data-host');
		
		//bind startGame
		$('#startGame').click(startGame);
		
		//join the game
		if(isHost){
			rows = $('#gameInfo').attr('data-rows');
			cols = $('#gameInfo').attr('data-cols');
			minPlayers = $('#gameInfo').attr('data-minPlayers');
			freezeTime = $('#gameInfo').attr('data-freezeTime');
			
			socket.emit('join',{
				'name' : user,
				'token' : token,
				'rows' : rows,
				'cols' : cols,
				'minPlayers' : minPlayers,
				'freezeTime' : freezeTime
			});
		}
		else{
			socket.emit('join',{
				'name' : user,
				'token' : token
			});
		}
		
		//waiting for other users to join
		socket.on('wait',function(data){
			displayData(data);
		});
		
		//if user missed the game
		socket.on('missed',function(data){
			displayData(data);
		});
		
		//if another player joined
		socket.on('player-joined',function(data){
			displayDataScreenR(data);
		});
		
		//if no other players are there
		socket.on('no_players',function(data){
			displayData(data);
		});
		
		//start the game
		socket.on('start',function(data){
			var players_info = data.players_info;
			var rows = data.rows;
			var cols = data.cols;
			var freezeTime = data.freezeTime;
			
			seqNum = 0;
			
			var color = players_info[user].color;
			$('#mainScreen').html('');
			
			//disable start button
			$('#startGame').text('Game has Started');
			$('#startGame').prop('disabled',true);
			
			//generate grid
			$('#mainScreen').append('<table class="table table-bordered"><tbody></tbody></table>');
			var count = 1;
			for(var i=0;i<rows;i++){
				$('#mainScreen > table > tbody').append('<tr id="'+i+'-tr"><tr/>');
				for(var j=0;j<cols;j++){
					$('#mainScreen > table > tbody > #'+i+'-tr').append('<td class="grid_cell" data-i="'+i+'" data-j="'+j+'" id="'+i+'-'+j+'">'+(count++)+'</td>');
				}
			}
			//console.log("grid generated...");
			
			$('.grid_cell').hover(
				function(e){
					var cellId = e.target.id;
					if(!$('#'+cellId).hasClass("done")){
						console.log("sending onHoverOn");
						socket.emit('cell_hoverOn',{
							'token' : token,
							'cellId' : cellId,
							'color' : color
						});
					}
				},
				function(e){
					var cellId = e.target.id;
					if(!$('#'+cellId).hasClass("done")){
						console.log("sending onHoverOff");
						socket.emit('cell_hoverOff',{
							'token' : token,
							'cellId' : cellId,
							'color' : color
						});
					}
				}
			);
			
			$('.grid_cell').click(function(e){
				var cellId = e.target.id;
				if(!$('#'+cellId).hasClass("done")){
					console.log("sending click");
					socket.emit('cell_click',{
						'token' : token,
						'user' : user,
						'color' : color,
						'cellId' : cellId,
						'seqNum' : seqNum
					});
					//freeze this client
					console.log("Overlay showing in client");
					$("#overlay").show();
				}
			});
		});
		
		//freeze the screen
		socket.on('freeze',function(data){
			console.log("freeze");
			console.log("Overlay showing after server");
			$("#overlay").show();
		});
		
		//unfreeze the screen
		socket.on('unfreeze',function(data){
			console.log("unfreeze");
			seqNum = data.counter;
			$("#overlay").hide();
		});
		
		//color a cell onHover
		socket.on('onHoverOn',function(data){
			var cellId = data.cellId;
			$('#'+cellId).css("background-color",data.color);
		});
		//remove color from cell onHoverOff
		socket.on('onHoverOff',function(data){
			var cellId = data.cellId;
			console.log("background-color : change to #fff");
			if(!$('#'+cellId).hasClass("done")){
				$('#'+cellId).css("background-color","#fff");
			}
		});
		
		//onClick
		socket.on('onClick',function(data){
			console.log("onClick - color : "+data.color);
			var cellId = data.cellId;
			$('#'+cellId).css("background-color",data.color);
			$('#'+cellId).addClass("done");
		});
		
		//display scores
		socket.on('score_update',function(data){
			displayDataScreenL(data);
		});
		
		//game completed
		socket.on('game_done',function(data){
			gameDone(data);
		});
		
		//player disconnected
		socket.on('player-disconnected',function(data){
			displayDataScreenR(data);
		});
		//end game --- if only one player left
		socket.on('abort',function(data){
			displayData(data);
		});
		
		function startGame(){
			socket.emit('start_game',{
				'token' : token
			});
		}
		
		function displayData(data){
			if('display_data' in data){
				$('#mainScreen').html(data.display_data);
			}
		}
		
		function displayDataScreenR(data){
			if('display_data' in data){
				$('#sideScreenR').append('<li class="list-group-item"><font color="'+(("color"in data)? data.color : color)+'">'+data.display_data+'</font></li>');
			}
		}
		
		function displayDataScreenL(data){
			var html = '<ul class="list-group">';
			for(var player in data){
				//html += "Player : "+player+" Color : "+data[player].color+" Score : "+data[player].score+"<br/>";
				html += '<li class="list-group-item"><span class="badge">'+data[player].score+'</span><b>'+player+'</b><div class="color" style="width:20px;height:20px;background-color:'+data[player].color+';display: inline-block;float: right;margin-right: 10px;"></div></li>';
			}
			html += '</ul>';
			$('#sideScreenL').html(html);
		}
		
		function gameDone(data){
			$("#overlay").hide();
			displayData(data);
			var html = '<p><b>Winners :</b></p>';
			console.log(data.winners);
			for(var i=0;i<data.winners.length;i++){
				html += '<p>'+data.winners[i].name+' : '+data.winners[i].score+'</p>';
			}
			/*for(var player in data.winners){
				html += '<p>'+player+' : '+data.winners[player].score+'</p>';
			}*/
			$('#mainScreen').append(html);
		}
		
	});
})();