/**
 * @author Olivier Lamiraux
 */
define(["danoni/sequencer", "danoni/sequencer2"], function(Sequencer, Sequencer2){
    return function(Q) {
        
        var laneX = [25, 70, 120, 170, 215],
            arrows = [];
        
        Q.scene("test", function(stage, options) {
            var S = new Sequencer2({
                height : Q.height
            });
            stage.insert(new Q.Background());
            createReceptors(stage, S.receptorRevert());
            
            
            stage.on("step", function(dt) {
                destroyAllArrow();
                createArrow(stage, 0, 100);
                createArrow(stage, 1, 100);
                createArrow(stage, 2, 100);
                createArrow(stage, 3, 100);
                createArrow(stage, 4, 100);
            });
        });
        
        var destroyAllArrow = function() {
            var i, arrowsLength = arrows.length;
            for (i = 0; i < arrowsLength; i += 1) {
                arrows[i].destroy();
            }
            arrows = [];
        };
        
        var createArrow = function(stage, lane, y) {
            var props = {x:laneX[lane], y:y};
            
            switch(lane) {
                case 0 :
                    arrows.push(stage.insert(new Q.ArrowLeft(props)));
                    break;
                case 1 :
                    arrows.push(stage.insert(new Q.ArrowDown(props)));
                    break;
                case 2 :
                    arrows.push(stage.insert(new Q.Origini(props)));
                    break;
                case 3 :
                    arrows.push(stage.insert(new Q.ArrowUp(props)));
                    break;
                case 4 :
                    arrows.push(stage.insert(new Q.ArrowRight(props)));
                    break;
            }
        };
        
        var createReceptors = function(stage, receptorY) {
            var ry = receptorY || Q.height-50,
                x = 50,
                options = function(pos) {
                    return {x: laneX[pos], y: ry};
                };
                
            stage.insert(new Q.ArrowReceptorLeft(options(0)));
            stage.insert(new Q.ArrowReceptorDown(options(1)));
            stage.insert(new Q.OnigiriReceptor(options(2)));
            stage.insert(new Q.ArrowReceptorUp(options(3)));
            stage.insert(new Q.ArrowReceptorRight(options(4)));
        };
   }; 
});
