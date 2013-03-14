/**
 * @author Olivier Lamiraux
 */
requirejs.config({
    baseUrl: "../js",
    paths: {
        unit : '../tests/js/unit',
        datas : '../datas'
    },
    shim: {
        'quintus/quintus': {
            exports: 'Quintus'
        }
    }
});
QUnit.stop();
require(
    [ "unit/sequencer", "unit/eventedSequencer" ],
    function(sequencerTest, eventedSequencer) {
        QUnit.start();
        sequencerTest();
        eventedSequencer();
    }
);
