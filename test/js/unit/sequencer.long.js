/**
 * @author OLAMIRAUX
 * 
 * Long note is array with [begin, end]
 */
define(["danoni/sequencer2"], function(Sequencer) {
    return function() {
        var s;
        var seq = [200, 800, [1000, 1500]];
        module( "Sequencer Long Notes", {
            setup : function() {
                s = new Sequencer();
                s.sequences({ 0 : seq });
            }
        });

        test("available note with long note", function() {
            var result = s.availableNotes(0, 1000);
            // Long not must be available during all the time
            var resultAfterBegin = s.availableNotes(0, 1300);

            deepEqual(result, [[1000, 1500]], "AvailableNotes is ok");
            deepEqual(resultAfterBegin, [[1000, 1500]], "AvailableNotes after begin is ok");
        });
        
        test("hit and release for long notes", function() {
            var resultHit = s.hit(0, 1000);
            var resultRelease = s.release(0, 1500);
            
            ok(resultHit, "Hit is Ok");
            equal(resultRelease, "Ok", "Release is Ok");
        });

        test("Good Hit, Bad release", function() {
            var resultHit = s.hit(0, 1000);
            var resultRelease = s.release(0, 1300);
            
            ok(resultHit, "Hit is Ok");
            equal(resultRelease, false, "Bad Release is Ok");
        });

        test("Release without good hit", function() {
            ok(!s.release(0,10), "release is ok");
        });

        test("heightNotes for long note", function() {
            var expected = { 0 : [[s.receptorHeight(), 160]] };
            deepEqual(s.heightNotes(1000), expected, "heightNotes is ok");
        });

        test("maxTime with long note", function() {
            equal(s.maxTime(), 1500, "maxTime is ok");
        });

        test("hasHoldNote", function() {
            s.hit(0, 1000);

            ok(s.hasHoldNote(0,1010), "hasHoldNote Ok");

            s.release(0, 1300);

            ok(!s.hasHoldNote(0,1310), "Not hasHoldNote Ok");
        });

        test("We can't hit multi time", function () {
            s.hit(0, 1000);
            ok(!s.hit(0, 1000), "can't hit multi time ok");
        });
        
    };
});
