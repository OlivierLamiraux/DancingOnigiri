/**
 * @author Olivier Lamiraux
 */
define(function () {
    return function (Q, Sequencer, spriteCreator) {
		var stage = new Q.Stage(),
			i;
		
		// Create background
		stage.insert(spriteCreator.background());
		
		// Create receptors
		for (i = 0; i < 5; i++) {
			stage.insert(spriteCreator.receptor());
		}
		
		return stage;
    };
});
