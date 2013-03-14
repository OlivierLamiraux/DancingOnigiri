/**
 * @author OLAMIRAUX
 */
define(["quintus/quintus", "danoni/evented"], function(Quintus, evented) {
    return function() {
        // Initialise Quintus
        var Q = Quintus();
        
        // Insert Evened Objects in Quintus Instance
        evented(Q);
        
        module( "Evented Sequencer" );
        
        test("Quintus Sequencer Exist", function() {
            var sequencer = new Q.Sequencer();
            
            ok(sequencer, "Evented Sequencer exist");
            ok(sequencer.s, "Instance of Sequencer exist");
        });
        
        /*asyncTest("Add a timer", function() {
            var sequencer = new Q.Sequencer(),
                timer = 0;
            
            // sequencer.timer(timer);
            sequencer.on("refresh", function(notes) {
                ok(true);
                start();
            });
        });*/
        
        test("Simulate keyboard", function() {
            var s = new Q.Sequencer();
            
            s.hit("up", 20000);
            
            ok(true);
        });
        
    }
});