/**
 * @author Olivier Lamiraux
 */
define(["danoni/sequencer"], function(Sequencer){
   return function(Q) {
       Q.scene("test", function(stage) {
        stage.on("prerender", function(ctx) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(0,0,Q.width,Q.height);
        });
        var S = new Sequencer(Q);
        var receptorY = Q.height - 50;
        var leftReceptor = stage.insert(new Q.ArrowReceptor({x: 40*0+25, y:receptorY, angle:90}));
        var downReceptor = stage.insert(new Q.ArrowReceptor({x: 40*1+25, y:receptorY}));
        var onigiriReceptor = stage.insert(new Q.OnigiriReceptor({x: 40*2+25, y:receptorY}));
        var upReceptor = stage.insert(new Q.ArrowReceptor({x: 40*3+25, y:receptorY, angle:180}));
        var rightReceptor = stage.insert(new Q.ArrowReceptor({x: 40*4+25, y:receptorY, angle:-90}));
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

            // keyboard
            if (Q.inputs["left"]) {
                leftReceptor.p.asset = "arrow_down_active.png";
            } else {
                leftReceptor.p.asset = "arrow_down.png";
            }
            if (Q.inputs["down"]) {
                downReceptor.p.asset = "arrow_down_active.png";
            } else {
                downReceptor.p.asset = "arrow_down.png";
            }
            if (Q.inputs["fire"]) {
                onigiriReceptor.p.asset = "onigiri_active.png";
            } else {
                onigiriReceptor.p.asset = "onigiri.png";
            }
            if (Q.inputs["up"]) {
                upReceptor.p.asset = "arrow_down_active.png";
            } else {
                upReceptor.p.asset = "arrow_down.png";
            }
            if (Q.inputs["right"]) {
                rightReceptor.p.asset = "arrow_down_active.png";
            } else {
                rightReceptor.p.asset = "arrow_down.png";
            }
            
        })
    });
   }; 
});
