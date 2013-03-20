/**
 * @author OLAMIRAUX
 */
define(["danoni/sequencer2", "text!datas/sequences.json"], function(Sequencer, jsonText) {
    return function() {
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
            
            // Possision of the receptor relative to edge
            s.receptor(50);
            
            // Assert
            equal(s.receptor(), 50, "receptor is ok" );
            equal(s.receptorHeight(), 350, "receptorHeight is ok" );
            
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
            var s = new Sequencer({receptor:50});
            
            equal(s.receptor(), 50, "receptor by options is ok");
            equal(s.receptorHeight(), 370, "receptorHeight is ok" );
        });
        
        test( "method receptorTime give the time relative to display options", function() {
            var s = new Sequencer(
                        {
                            height:500,
                            display:1000,
                            receptor:50
                        }
                    );
            
            equal(s.receptorTime(), 900, "receptorTime is ok");
        });
        
        test("init sequences", function() {
            var s = new Sequencer();
            
            var sequences = {
               0 : [125, 2000, ],
               1 : [125, 2000, ],
               2 : [125, 2000, ],
               3 : [125, 2000, ],
               4 : [125, 2000, ], 
            };
    
            s.sequences(sequences);
    
            equal(s.sequences(), sequences, "init sequences ok");
        });
        
        test("heightNotes", function() {
            var s = new Sequencer(
                        {
                            height:500,
                            display:1000,
                            receptor:50
                        }
                    );
            s.sequences({ 0 : [0, 200, 900] });
            var result = s.heightNotes(0);
            var expected = { 0 : [450, 350, 0]};
    
            deepEqual(result, expected, "heightNotes is ok");
        });
        
        test("init sequence from json file", function() {
            var s = new Sequencer();
            s.sequences(JSON.parse(jsonText));
            
            ok(s.heightNotes(22050));
        });
        
        test("hit", function() {
            var s = new Sequencer();
            s.sequences({ 0 : [0, 200, 880] });
            
            s.hit(0, 200);
            var result = s.availableNotes(0, 0);
            var expected = [0, 880];
            
            deepEqual(result, expected, "hit is ok");
        });
        
        test("hit with judge", function() {
            var s = new Sequencer();
            s.sequences({ 0 : [0, 200, 880] });
            
            var judge = s.hit(0, 179);
            var expectedJudge = "Marvelous";
            var result = s.availableNotes(0, 0);
            var expected = [0, 880];
            
            deepEqual(result, expected, "hit is ok");
            equal(judge, expectedJudge, "Judge is ok");
        });
        
        test("hit one at once", function() {
            var s = new Sequencer();
            s.sequences({ 0 : [0, 200, 800] });
            
            s.hit(0, 200);
            var result = s.availableNotes(0, 0);
            var expected = [0, 800];
            
            deepEqual(result, expected, "hit one at once is ok");
        });
        
        test("maxTime", function() {
            var s = new Sequencer();
            s.sequences({ 
                0 : [0, 200, 100],
                1 : [0, 200, 500],
                2 : [0, 200, 90000]
            });
            
            var expected = 90000;
            
            equal(s.maxTime(), expected, "maxTime is ok")
        })

        test("checkMiss", function() {
            var s = new Sequencer();
            s.sequences({ 0 : [0, 200, 800] });

            s.checkMiss(1500);

            deepEqual(s.heightNotes(0), { 0 : [] }, "No notes availables");
            equal(s.score("miss"), 3, "Miss 3 notes");
        });
    }
});
