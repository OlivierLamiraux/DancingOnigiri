/**
 * @author Olivier Lamiraux
 */
define(function() {
    
    return function(Q) {
      
        Q.Sprite.extend("Background", {
          init: function(p) {
              this._super(p);
          },
          draw : function(ctx) {
              ctx.fillStyle = "#000000";
              ctx.fillRect(0,0,Q.width,Q.height);
          }
        });

        Q.Sprite.extend("Bar", {
            init: function(p) {
                this._super(p, {
                    color: "green"
                });
            },
            draw: function(ctx) {
			    ctx.fillStyle = this.p.color;
			    // Draw a filled rectangle centered at
			    // 0,0 (i.e. from -w/2,-h2 to w/2, h/2
			    ctx.fillRect(-this.p.cx,
						     -this.p.cy,
						     this.p.w,
						     this.p.h);

            }
        });
        Q.Sprite.extend("Arrow", {
          init: function(p) {
            this._super(p,{
              x: 100,
              y: 0,
              scale : 0.4,
            });
          }
        });
    
        Q.Arrow.extend("ArrowLeft", {
          init: function(p) {
            Q._defaults(p,{ asset: "arrow_down_red.png", angle: 90 });
            this._super(p);
          }
        });
        
        Q.Arrow.extend("ArrowRight", {
          init: function(p) {
            Q._defaults(p,{ asset: "arrow_down_red.png", angle: -90 });
            this._super(p);
          }
        });
        
        Q.Arrow.extend("ArrowDown", {
          init: function(p) {
            Q._defaults(p,{ asset: "arrow_down_green.png" });
            this._super(p);
          }
        });
        
        Q.Arrow.extend("ArrowUp", {
          init: function(p) {
            Q._defaults(p,{ asset: "arrow_down_green.png", angle: 180 });
            this._super(p);
          }
        });
    
        Q.Arrow.extend("Origini", {
          init: function(p) {
            Q._defaults(p,{ asset: "onigiri_play.png" });
            this._super(p);
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
        
        Q.Sprite.extend("OnigiriHit", {
          init: function(p) {
            this._super(p,{
              x: 100,
              y: 100,
              scale : 0.4,
              asset: "onigiri.png",
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
