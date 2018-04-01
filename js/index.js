
var myCanvas=document.getElementById('myCanvas');
var ctx=myCanvas.getContext('2d');
var lastPoint={x:undefined,y:undefined};
var painting=false;/*设置当前画布功能为画笔状态*/
setCanvasSize(myCanvas);/*使得画板随屏幕大小调整*/
function setCanvasSize(myCanvas){
	var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    myCanvas.width = pageWidth;
    myCanvas.height = pageHeight;
}
go(myCanvas);

function go(myCanvas){
	/*初始化*/
	$(".show span").eq(0).css("border","3px solid #fff68f");
	$("#color li").eq(0).css("border","3px solid #fff68f");
	$("#line li").eq(0).css("border-top-color","#fff68f");
	
	/*兼容移动端*/
    if (document.body.ontouchstart !== undefined) {
    // 使用touch事件
    myCanvas.ontouchstart = function (e) {
    	 
        // 开始触摸
        painting=true;
	    var x=e.targetTouches[0].clientX;
	    var y=e.targetTouches[0].clientY;
	    lastPoint={"x":x,"y":y};
	    ctx.save();
	    drawCircle(x.y,0);
    };
    myCanvas.ontouchmove = function (e) {
        // 开始滑动
            if(painting){
		    var x=e.touches[0].clientX;
		    var y=e.touches[0].clientY;
		    var newPoint={"x":x,"y":y};
		    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
		    lastPoint=newPoint;
	        
	    }
    };
    myCanvas.ontouchend = function () {
        // 滑动结束
        painting = false;
    }
     }

    else{
	/*使用mouse事件*/

	/*鼠标按下事件*/
           myCanvas.onmousedown=function(e){
	       painting=true;
	       var x=e.clientX;
	       var y=e.clientY;
	       lastPoint={"x":x,"y":y};
	       drawCircle(x.y,0);
           }
    /*鼠标移动事件*/
            myCanvas.onmousemove=function(e){
	        if(painting){
		    var x=e.clientX;
		    var y=e.clientY;
		    var newPoint={"x":x,"y":y};
		    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y,clear);
		    lastPoint=newPoint;
	        
	    }
	}
	/*鼠标松开事件*/
            myCanvas.onmouseup=function(){
	        painting=false;

           }
       
}
}
/*画点函数*/
function drawCircle(x,y,radius){
	ctx.save();
	ctx.beginPath();
	ctx.arc(x,y,radius,0,Math.PI*2);
	ctx.fill();
}
/*画线函数*/
function drawLine(x1,y1,x2,y2){
	ctx.lineCap="round";
	ctx.lineJoin="round";
	if (clear) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
        ctx.restore();
    }
    else
    {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }
	
}
var edit=document.getElementById('edit');/*获取编辑元素*/   
var black=document.getElementById('black'); 
var red=document.getElementById('red'); 
var blue=document.getElementById('blue');  
var purple=document.getElementById('purple');
var thin=document.getElementById('thin');
var thick=document.getElementById('thick');
var heavy=document.getElementById('heavy');
var clear=false;/*橡皮擦为初始状态*/
var cancel=document.getElementById('cancel');
var save=document.getElementById('save');
var green=document.getElementById('green');
var blue=document.getElementById('blue');  
var purple=document.getElementById('purple');
var thin=document.getElementById('thin');
var thick=document.getElementById('thick');
var heavy=document.getElementById('heavy');
var clear=false;/*橡皮擦为初始状态*/
var cancel=document.getElementById('cancel');
var save=document.getElementById('save');
/*进入编辑状态*/

edit.onclick=function(){
    $(".show span").css("border","3px solid #f2f2f2");
	$(".show span").eq(0).css("border","3px solid #fff68f");
	clear=false;
}
/*切换颜色*/

   black.onclick=function(){
   	$("#color li").css("border","3px solid #fff")
       $(this).css("border","3px solid #fff68f");
       ctx.fillStyle="#2f4f4f";
       ctx.strokeStyle="#2f4f4f";
   }
 
   red.onclick=function(){
   	$("#color li").css("border","3px solid #fff")
       $(this).css("border","3px solid #fff68f");
       ctx.fillStyle="#ff7256";
       ctx.strokeStyle="#ff7256";
   }  
   green.onclick=function(){
   	$("#color li").css("border","3px solid #fff")
       $(this).css("border","3px solid #fff68f");
       ctx.fillStyle="green";
       ctx.strokeStyle="green";
   }

   blue.onclick=function(){
   	$("#color li").css("border","3px solid #fff")
       $(this).css("border","3px solid #fff68f");
       ctx.fillStyle="#aeeeee";
       ctx.strokeStyle="#aeeeee";
   }

   purple.onclick=function(){
   	$("#color li").css("border","3px solid #fff")
       $(this).css("border","3px solid #fff68f");
       ctx.fillStyle="#b03060";
       ctx.strokeStyle="#b03060";
   }
      
/*调整粗细*/

thin.onclick=function(){
	$("#line li").css("border-top-color","black");
	$(this).css("border-top"," 1px solid #fff68f");
	ctx.lineWidth=3;
}

thick.onclick=function(){
    $("#line li").css("border-top-color","black");
	$(this).css("border-top"," 4px solid #fff68f");
	ctx.lineWidth=5;
}

heavy.onclick=function(){
	$("#line li").css("border-top-color","black");
	$(this).css("border-top"," 8px solid #fff68f");
	ctx.lineWidth=8;
}
/*橡皮檫功能*/

var correct=document.getElementById('correct');
correct.onclick=function(){
	$(".show span").css("border","3px solid #f2f2f2");
	$(".show span").eq(1).css("border","3px solid #fff68f");
	clear=true;
}

/*清空画布*/

cancel.onclick=function(){
	$(".show span").css("border","3px solid #f2f2f2");
	$(".show span").eq(2).css("border","3px solid #fff68f");
	ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
    $(".show span").css("border","3px solid #f2f2f2");
	$(".show span").eq(0).css("border","3px solid #fff68f");
}
/*保存成图片*/

save.onclick=function(){
	$(".show span").css("border","3px solid #f2f2f2");
	$(".show span").eq(3).css("border","3px solid #fff68f");
	var imgUrl=myCanvas.toDataURL('img/png');
	var saveA=document.createElement('a');
	document.body.appendChild(saveA);
	saveA.href=imgUrl;
	saveA.download="作业";
	saveA.click();
	$(".show span").css("border","3px solid #f2f2f2");
	$(".show span").eq(0).css("border","3px solid #fff68f");
}