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
    
        Q.Sprite.extend("ArrowReceptorDown", {
          init: function(p) {
            this._super(p,{
              x: 100,
              y: 0,
              scale : 0.4,
              asset: "arrow_down.png",
              key : "down"
            });
            this.p.activeAsset = "arrow_down_active.png";
            this.p.inactiveAsset = this.p.asset;
          },
          step: function(ct) {
            var p = this.p;
            if (Q.inputs[p.key]) {
                p.asset = p.activeAsset;
            } else {
                p.asset = p.inactiveAsset;
            }
          }
         });
    
    
        Q.ArrowReceptorDown.extend("ArrowReceptorLeft", {
          init: function(p) {
            Q._defaults(p,{ key: "left", angle: 90 });
            this._super(p);
          }
        });
        
        Q.ArrowReceptorDown.extend("ArrowReceptorRight", {
          init: function(p) {
            Q._defaults(p,{ key: "right", angle: -90 });
            this._super(p);
          }
        });
        
        Q.ArrowReceptorDown.extend("ArrowReceptorUp", {
          init: function(p) {
            Q._defaults(p,{ key: "up", angle: 180 });
            this._super(p);
          }
        });

        Q.ArrowReceptorDown.extend("OnigiriReceptor", {
          init: function(p) {
            Q._defaults(p,{
              asset: "onigiri.png",
              key: "fire"
            });
            this._super(p);
            this.p.activeAsset = "onigiri_active.png";
          }
        });

        Q.Sprite.extend("ArrowReceptorLeftHit", {
          init: function(p) {
            this._super(p,{
              x: 100,
              y: 100,
              scale : 0.4,
              asset: "arrow_down.png",
              opacity : 0.4
            });
          },
            step: function(dt) {
                this.p.scale += dt*4;
                if (this.p.scale > 1.5) {
                    this.destroy();
                }
            }
        });
    };
});
