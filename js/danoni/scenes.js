/**
 * @author Olivier Lamiraux
 */
define(["danoni/sequencer"], function(Sequencer){
   return function(Q) {
       Q.scene("test", function(stage, options) {
           console.log(options);
           console.log(stage);
       });

       var createReceptors = function(stage) {
        var ry = Q.danoni,
            x = 50,
            options = function(pos) {
                return {x: x*pos+25, y: ry};
            };
        stage.insert(new Q.ArrowReceptorLeft(options(0)));
        stage.insert(new Q.ArrowReceptorDown(options(1)));
        stage.insert(new Q.OnigiriReceptor(options(2)));
        stage.insert(new Q.ArrowReceptorUp(options(3)));
        stage.insert(new Q.ArrowReceptorRight(options(4)));
           
       };

       Q.scene("playground", function(stage) {
        stage.on("prerender", function(ctx) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(0,0,Q.width,Q.height);
        });
        var S = new Sequencer(Q);
        
        createReceptors(stage);
        
        var current = 2800;
        stage.on("step", function(dt) {
            Q("ArrowRed").destroy();
            Q("ArrowGreen").destroy();
            Q("ArrowYellow").destroy();
            //var current = song.controller.currentTime*100+2000;
            current += dt*20;
            
            var notes = S.notes(current);
            var width = 40;
            
            var createNotes = function(pos, width, asset) {
                return function(y) {
                    stage.insert(new Q.Arrow({ x:width*pos+25, y:y, w:width}))
                };
            };
    
            Q._each(notes['0'], function(y) {
                    stage.insert(new Q.ArrowRed({x:width*0+25, y:y, angle:90}))
            });
            Q._each(notes['1'], function(y) {
                    stage.insert(new Q.ArrowGreen({x:width*1+25, y:y}))
            });
            Q._each(notes['2'], function(y) {
                    stage.insert(new Q.ArrowYellow({x:width*2+25, y:y}))
            });
            Q._each(notes['3'], function(y) {
                    stage.insert(new Q.ArrowGreen({x:width*3+25, y:y, angle:180}))
            });
            Q._each(notes['4'], function(y) {
                    stage.insert(new Q.ArrowRed({x:width*4+25, y:y, angle:-90}))
            });
        })
    });
   }; 
});
