/**
 * @author Olivier Lamiraux
 */
requirejs.config({
    baseUrl: "../js",
    shim: {
        'quintus/quintus': {
            exports: 'Quintus'
        }
    }
});

require(["danoni/sequencer2"], function(Sequencer) {    
    module( "Sequencer" );
    
    test( "define height and display by getters and setters", function() {
        var s = new Sequencer();
        
        // Height define the height of screen play
        s.height(400);
        
        // Number of millisecond display to screen
        s.display(1500);
        
        // Assert
        equal(s.height(), 400, "height getter and setter is ok");
        equal(s.display(), 1500, "display getter and setter is ok" );
        
        // Exception
        throws(
            function () { s.height("Test") }, 
            "height setter throw exeception when argument is not a number"
        );
        
        throws(
            function () { s.display("Test") }, 
            "display setter throw exeception when argument is not a number"
        );
        
        throws(
            function () { s.height(-10) }, 
            "height setter throw exeception when argument is < 0"
        );
        
        throws(
            function () { s.display(-10) }, 
            "display setter throw exeception when argument is < 0"
        );
    });
    
    test( "define height and display by options in constuctor", function() {
        var s = new Sequencer({height:400, display: 1500});
        
        // Assert
        equal(s.height(), 400, "height by options is ok");
        equal(s.display(), 1500, "display by options is ok" );
    });
    
    test( "define position of the receptor", function() {
        var s = new Sequencer({height:400, display: 1500});
        
        // Possision of the receptor
        s.receptor(350);
        
        // Assert
        equal(s.receptor(), 350, "display by options is ok" );
        
        // Exception
        throws(
            function () { s.receptor("Test") }, 
            "receptor setter throw exeception when argument is not a number"
        );
        
        throws(
            function () { s.receptor(-10) }, 
            "receptor setter throw exeception when argument is < 0"
        );
        
        throws(
            function () { s.receptor(1000) }, 
            "receptor setter throw exeception when argument is > height"
        );
    });
    
    test( "define receptor by options in constuctor", function() {
        var s = new Sequencer({receptor:380});
        
        equal(s.receptor(), 380, "receptor by options is ok");
    });
    
    test( "method receptorTime give the time relative to display options", function() {
        var s = new Sequencer(
                    {
                        height:500,
                        display:1000,
                        receptor:450
                    }
                );
        
        equal(s.receptorTime(), 900, "receptorTime is ok");
    });
    
    test("", function() {
        var s = new Sequencer();
        
        s.sequence({
           0 : [125, 2000, ],
           0 : [125, 2000, ],
           0 : [125, 2000, ],
           0 : [125, 2000, ],
           0 : [125, 2000, ], 
        });
    });
    
});

require(["danoni/sequencer2"], function(Sequencer) {
    module("Sequencer");
    
});