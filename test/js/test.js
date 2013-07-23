/**
 * @author Olivier Lamiraux
 */
requirejs.config({
    baseUrl: "../js",
    paths: {
        unit : '../test/js/unit',
        test : '../test/js',
        datas : '../datas'
    },
    map: {
    	'*' : {
    		'test/sinon': 'test/sinon-1.7.1'
    	}
    },
    shim: {
        'quintus/quintus': {
            exports: 'Quintus'
        },
        'quintus/quintus_scenes'  : ['quintus/quintus'],
        'quintus/quintus_sprites'  : ['quintus/quintus'],
        'test/sinon-1.7.1': {
        	exports: 'sinon'
        }
    }
});
QUnit.stop();
require(
    [ "unit/sequencer", "unit/sequencer_LongNotes", "unit/scene_playground" ],
    function(unit0, unit1, unit2) {
        QUnit.start();
        unit0();
        unit1();
        unit2();
    }
);
