/**
 * @author OLAMIRAUX
 * 
 * Long note is array with [begin, end]
 */
define(["danoni/sequencer2"], function(Sequencer) {
    return function() {

        test("available note with long note", function() {
            var s = new Sequencer();
            s.sequences({ 0 : [200, 800, [1000, 1500]] });
            var result = s.availableNotes(0, 1000);
            // Long not must be available during all the time
            var resultAfterBegin = s.availableNotes(0, 1300);

            deepEqual(result, [[1000, 1500]], "AvailableNotes is ok");
            deepEqual(resultAfterBegin, [[1000, 1500]], "AvailableNotes after begin is ok");
        });
        
        test("hit and release for long notes", function() {
            var s = new Sequencer();
            s.sequences({ 0 : [200, 800, [1000, 1500]] });
            var resultHit = s.hit(0, 1000);
            var resultRelease = s.release(0, 1500);
            
            ok(resultHit, "Hit is Ok");
            equal(resultRelease, "Ok", "Release is Ok");
        });

        test("Good Hit, Bad release", function(xx) {
            var s = new Sequencer();
            s.sequences({ 0 : [200, 800, [1000, 1500]] });
            var resultHit = s.hit(0, 1000);
            var resultRelease = s.release(0, 1300);
            var available = s.availableNotes(0, 1301); 

            ok(resultHit, "Hit is Ok");
            equal(resultRelease, false, "Bad Release is Ok");
            deepEqual(available, [], "Long note no more available");
        });

        test("Release without good hit", function() {
            var s = new Sequencer();
            s.sequences({ 0 : [200, 800, [1000, 1500]] });
            ok(!s.release(0,10), "release is ok");
        });

        test("heightNotes for long note", function() {
            var s = new Sequencer();
            s.sequences({ 0 : [200, 800, [1000, 1500]] });
            var expected = { 0 : [[s.receptorHeight(), 160]] };
            deepEqual(s.heightNotes(1000), expected, "heightNotes is ok");
        });

        test("maxTime with long note", function() {
            var s = new Sequencer();
            s.sequences({ 0 : [200, 800, [1000, 1500]] });
            equal(s.maxTime(), 1500, "maxTime is ok");
        });

        test("hasHoldNote", function() {
            var s = new Sequencer();
            s.sequences({ 0 : [200, 800, [1000, 1500]] });
            s.hit(0, 1000);

            ok(s.hasHoldNote(0,1010), "hasHoldNote Ok");

            s.release(0, 1300);

            ok(!s.hasHoldNote(0,1310), "Not hasHoldNote Ok");
        });

        test("We can't hit multi time", function () {
            var s = new Sequencer();
            s.sequences({ 0 : [200, 800, [1000, 1500]] });
            s.hit(0, 1000);
            ok(!s.hit(0, 1000), "can't hit multi time ok");
        });
        
    };
});
