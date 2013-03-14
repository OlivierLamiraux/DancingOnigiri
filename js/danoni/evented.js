/**
 * @author OLAMIRAUX
 */
define(["danoni/sequencer2"], function(Sequencer) {
    return function(Q) {
        Q.Evented.extend("Sequencer", {
            init : function (options) {
                options = options || {};
                this.s = new Sequencer();
                
            },
            hit : function (lane, time) {
                console.log({ debug : "hit", lane : lane, time : time });
            }
        });
    };
});