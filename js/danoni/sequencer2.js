/**
 * @author Olivier Lamiraux
 */
define(function () {
    return function(options) {
        // Private
        var options = options || {},
            screenHeight = options.height || 420,
            display = options.display || 1000,
            receptor = options.receptor || 370;
            
        this.height = function(h) {
            if (h ===  undefined) return screenHeight;
            if (typeof h !== "number") throw "must be a number";
            if (h < 0) throw "must be greater than 0";
            
            screenHeight = h;
        };
        
        this.display = function(d) {
            if (d ===  undefined) return display;
            if (typeof d !== "number") throw "must be a number";
            if (d < 0) throw "must be greater than 0";
            
            display = d;
        };
        
        this.receptor = function(r) {
            if (r ===  undefined) return receptor;
            if (typeof r !== "number") throw "must be a number";
            if (r < 0) throw "must be greater than 0";
            if (r > screenHeight) throw "must be lower than height";
            
            receptor = r;
        };
        
        this.receptorTime = function() {
            return receptor / screenHeight * display;  
        };
    };
});
    