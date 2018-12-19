var draw = (function(){
    //Get the height and width of the main we will use this set canvas to the full
    //size of the main element.
    var mWidth = document.querySelector('main').offsetWidth;
    var mHeight = document.querySelector('main').offsetHeight;

    //Create the canvas
    var canvas = document.createElement("canvas");
   
    //Create the context
    var ctx = canvas.getContext("2d");

    //Create the initial bounding rect
    var rect = canvas.getBoundingClientRect();

    //Current x, y position
    var x=0;
    var y=0;

    //starting x,y
    var x1 = 0;
    var y1 = 0;

    //ending x, y
    var x2 = 0;
    var y2 = 0;

    //last x,y
    var lx = false;
    var ly = false;


    //set what shape we are drawing
    var shape = '';

    var isDrawing = false;

    //Everything above the return statement is private
    //Access is being down through draw.init()
    return {

        setIsDrawing: function(bool){
            isDrawing = bool;
        },

        getIsDrawing: function(){
            return isDrawing;
        },

        //Set x, y cords based on current event
        setXY: function(evt) {

            //Track the last x,y position before setting the current position
            lx = x;
            ly = y;

            x = (evt.clientX - rect.left) - canvas.offsetLeft;
            y = (evt.clientY - rect.top) - canvas.offsetTop;
            
        },

        //write the x, y cords to the GUI
        writeXY: function(){

            document.getElementById('trackX').innerHTML = 'X: ' + x;
            document.getElementById('trackY').innerHTML = 'Y: ' + y;
        },

        draw: function(){
            ctx.restore();
            if(shape === 'rectangle')
            {
                this.drawRect();
            }else if(shape === 'line'){
                this.drawLine();
            }else if(shape === 'circle'){
                this.drawCircle();
            }else if(shape === 'path'){
                this.drawPath();
            }else{    
                alert('Please choose a shape!');
            }
            ctx.save();
        },

        //Draw a path
        drawPath: function(){
                //Start by using random fill colors.
                ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
                ctx.beginPath();
                ctx.moveTo(lx, ly);
                ctx.lineTo(x, y);
                ctx.lineWidth = 10;
                ctx.stroke();
        },

        //Draw a circle
        drawCircle: function(){
            ctx.strokeStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
            ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);

            let a = (x1-x2);
            let b = (y1-y2);
            let radius = Math.sqrt(a*a + b*b);

            ctx.beginPath();
            ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
            ctx.stroke()
            ctx.fill();
        },


        setStart: function(){
            x1=x;
            y1=y;
        },

        setEnd: function(){
            x2=x;
            y2=y;
        },
        
        setShape: function(shp){
            shape = shp;
        },
             
        getShape: function(){
            return shape;
        },
       
        //Draw a rect
        drawRect: function(){
            ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
            ctx.fillRect(x1, y1, (x2-x1), (y2-y1));
        },

        //Draw a line
        drawLine: function() {
            //Start by using random fill colors.
            ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineWidth = 15;
            ctx.stroke();
  },
        
        getCanvas: function(){
            return canvas;
        },

        init: function(){
            canvas.width = mWidth;
            canvas.height = mHeight;
            document.querySelector('main').appendChild(canvas);

        }
    };

})();

draw.init();

//Add a mouse move listerner to the canvas
//When mouse report a change of position use the event data
//to set and report the x,y positoin of the mouse
draw.getCanvas().addEventListener('mousemove', function(evt){
    draw.setXY(evt);
    draw.writeXY();
    if(draw.getShape()==='path' && draw.getIsDrawing() === true){
        draw.draw();
    }

});

draw.getCanvas().addEventListener('mousedown', function(evt) {
    draw.setStart();
    draw.setIsDrawing(true);
    
});

draw.getCanvas().addEventListener('mouseup', function(evt) {
    draw.setEnd();
    draw.draw();
    draw.setIsDrawing(false);

});


document.getElementById('btnRect').addEventListener('click', function(){       
    draw.setShape('rectangle');
});

document.getElementById('btnLine').addEventListener('click', function(){       
    draw.setShape('line');
});

document.getElementById('btnCircle').addEventListener('click', function(){       
    draw.setShape('circle');
});

document.getElementById('btnPath').addEventListener('click', function(){       
    draw.setShape('path');
});