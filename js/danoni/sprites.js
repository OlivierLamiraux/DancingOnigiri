/**
 * @author Olivier Lamiraux
 */
define(function() {
    
    return function(Q) {
      
        Q.Sprite.extend("Arrow", {
          init: function(p) {
            this._super(p,{
              x: 100,
              y: 0,
              scale : 0.4,
            });
          }
        });
    
        Q.Arrow.extend("ArrowRed", {
          init: function(p) {
            this._super(p,{
              x: 100,
              y: 0,
              scale : 0.4,
              asset: "arrow_down_red.png"
            });
          }
        });
        Q.Sprite.extend("ArrowGreen", {
          init: function(p) {
            this._super(p,{
              x: 100,
              y: 0,
              scale : 0.4,
              asset: "arrow_down_green.png"
            });
          }
        });
    
        Q.Sprite.extend("ArrowYellow", {
          init: function(p) {
            this._super(p,{
              x: 100,
              y: 0,
              scale : 0.4,
              asset: "onigiri_play.png"
            });
          }
        });
    
        Q.Sprite.extend("ArrowReceptor", {
          init: function(p) {
            this._super(p,{
              x: 100,
              y: 0,
              scale : 0.4,
              asset: "arrow_down.png",
              isActive : false
            });
          }
         });
    
    
        Q.Sprite.extend("OnigiriReceptor", {
          init: function(p) {
            this._super(p,{
              x: 100,
              y: 0,
              scale : 0.4,
              asset: "onigiri.png"
            });
          }
        }); 
    };
});
