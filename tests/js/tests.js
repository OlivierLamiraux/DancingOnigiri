/**
 * @author Olivier Lamiraux
 */
requirejs.config({
    baseUrl: "../js",
    paths: {
        unit : '../tests/js/unit'
    },
    shim: {
        'quintus/quintus': {
            exports: 'Quintus'
        }
    }
});
QUnit.stop();
require(
    [ "unit/sequencer" ],
    function(sequencerTest) {
        QUnit.start();
        sequencerTest();
    }
);
