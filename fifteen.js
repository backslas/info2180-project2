window.onload = (function(){
	
	let puzChild = $("#puzzlearea").children();

	puzChild.addClass("puzzlepiece");
	
	puzChild.css({cursor:"pointer"});
	
	let browseroffset=[puzChild.eq(0).offset().left,puzChild.eq(0).offset().top];
	//array of images
    let images =["background.jpg",
                 "http://time24.in/image/cache/catalog/products/hot4-400x400.jpg",
                 "https://pbs.twimg.com/profile_images/700229773432381440/-xtstJ2A_400x400.jpg",
                 "https://siliconvalley.tours/wp-content/uploads/2017/11/Tesla-red-400x400.jpg",
                 "https://private-jet-charter-flight.com/wp-content/uploads/Available-Services/S2.jpg"];
	let background = "url("+images[Math.floor(Math.random()*images.length)]+")";
	puzChild.css({backgroundImage:background});
	
	let pgridalign = setPieces(4);
	
	setPieces(pgridalign);
	
	let initsettings = getblockpositions();
	
	let moved = false;
	
	shuffle();
	
	
	puzChild.on('mouseover',function(){
		if(able($(this))){   
			$(this).addClass("movablepiece"); 
		}
		
	});
	
	puzChild.on('click',function(){
		if($(this).hasClass("movablepiece")){   
			move($(this));  
			moved=true;  
			puzChild.removeClass("movablepiece");   
			
		}
	});
	
	$('#overall').on('mouseover',function(){
		if(initsettings.toString() === getblockpositions().toString() && moved){  
				puzChild.css({backgroundImage:"url(https://static.vinepair.com/wp-content/uploads/2015/03/science-of-sound-interior-1.jpg)"}); // display winner image
		}
	});
					
	$('#shufflebutton').on('click',function(){
		shuffle();  
		moved=false; 
		
	});
	
	
	
	//FUNCTIONS
	function shuffle(){
			setPieces(pgridalign);
			puzChild.css({backgroundImage:background});
            let r;
            let piece;
		
			for(let count = 0;count<500;count++){
				r = Math.floor(Math.random()*15);	
				piece = puzChild.eq(r);
				if(able(piece)){
					piece.css({left:Math.floor((puzzledata(piece)[0])/100)*100});
					piece.css({top:Math.floor((puzzledata(piece)[1])/100)*100});
				}
				 
		    }	
	}
	
	function setPieces(size){
		let pieceCount = 0;  
		for(let y=0;y<size;y++){
			for(let x=0;x<size;x++){
				puzChild.eq(pieceCount).css({backgroundPositionX:x*-100});
				puzChild.eq(pieceCount).css({backgroundPositionY:y*-100});
				puzChild.eq(pieceCount).css({top:y*100});
				puzChild.eq(pieceCount).css({left:x*100});
				pieceCount++;
			}
		}
	}
	
	function getblockpositions(){
		let positions = [];  
		for(let p=0;p<puzChild.length;p++){
			positions.push([(puzChild.eq(p).offset().left)-browseroffset[0],
						    Math.floor((puzChild.eq(p).offset().top)-browseroffset[1])
						   ]); 
		}
		return positions;
	}
	
	function able(piece){
		return puzzledata(piece).length > 0?true:false;  
	}
	
	function move(piece){
		
		piece.animate({left:Math.floor((puzzledata(piece)[0])/100)*100}, 100);
		piece.animate({top:Math.floor((puzzledata(piece)[1])/100)*100}, 100);
	}
	
	function puzzledata(piece){
		
		let piecepos = piece.offset();  
	
		
		let movpos = [[(piecepos.left)-browseroffset[0]-100,Math.floor((piecepos.top)-browseroffset[1])],
					  [(piecepos.left)-browseroffset[0]+100,Math.floor((piecepos.top)-browseroffset[1])],
					  [(piecepos.left)-browseroffset[0],Math.floor((piecepos.top)-browseroffset[1]-100)],
					  [(piecepos.left)-browseroffset[0],Math.floor((piecepos.top)-browseroffset[1]+100)]
					 ];
		
		
		
		let posible_movpos = movpos.filter(function(counter){
			if(counter[0]<400 && counter[1]<400 && counter[0]>=0 && counter[1]>=0){
				return counter;
			}
		});
		
		
		let unmovpos = getblockpositions();
		
		let flag = true;
		
		for(let check =0;check<posible_movpos.length;check++){
			flag=true;  
			for(let checked =0;checked<unmovpos.length;checked++){
				if(posible_movpos[check][0] === unmovpos[checked][0] &&
				   posible_movpos[check][1] === unmovpos[checked][1]){
					flag = false;
				} 
			}
			if(flag === true){
				return posible_movpos[check];
			  }
		}
		if(flag === false){
			return [];  
		}	
	}	
	$(window).resize(function(){
		setPieces(pgridalign);
		browseroffset=[puzChild.eq(0).offset().left,puzChild.eq(0).offset().top];
		shuffle();
	});
	
});
