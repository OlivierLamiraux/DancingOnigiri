/**
 * @author o.lamiraux-ext
 * 
 * Test for a stage with 5 lanes
 */
define(["danoni/scene_playground2", "danoni/sequencer", "quintus/quintus", "test/sinon", "quintus/quintus_scenes", "quintus/quintus_sprites"], function(playground, Sequencer, quintus, sinon) {
    return function() {
    	var Q = quintus().include("Sprites, Scenes");
    	
    	function fakeSpriteCreator() {
    		var spriteCreator = {},
    			fake = function (className) {
    				var fake = new Q.Sprite();
    				fake.className = className;
    				return fake;
    			}
    		
    		
    		spriteCreator.receptor = sinon.stub().returns(fake("Receptor"));
    		spriteCreator.background = sinon.stub().returns(fake("Background"));
    		
    		return spriteCreator;
    	}
    	module("Stage : Playground", {
            setup : function() {
                var sequencer = new Sequencer();
    			
    			sequencer.sequences({ 0 : [200, 800, [1000, 1500]] });
    			this.spriteCreator = fakeSpriteCreator();
    			this.playground = playground(Q, sequencer, this.spriteCreator);
            }
        });
    	
    		

    	test("Stage creation",function() {
    		
    		ok(this.playground);
    	});
    	
    	test("Initialize Stage with receptor",function() {
    		var receptors = new Q.StageSelector(this.playground, "Receptor");
    		
    		equal(this.spriteCreator.receptor.callCount, 5);
    		equal(receptors.length, 5);
    	});
    	
    	test("Initialize Stage with background",function() {
    		var background = new Q.StageSelector(this.playground, "Background");
    		
    		ok(this.spriteCreator.background.calledOnce);
    		equal(background.length, 1);
    	});
    };
});