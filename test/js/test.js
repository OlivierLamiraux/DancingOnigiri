/**
 * @author Olivier Lamiraux
 */
requirejs.config({
    baseUrl: "../js",
    paths: {
        unit : '../test/js/unit',
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
    [ "unit/sequencer", "unit/sequencer_LongNotes" ],
    function(unit0, unit1) {
        QUnit.start();
        unit0();
        unit1();
    }
);
