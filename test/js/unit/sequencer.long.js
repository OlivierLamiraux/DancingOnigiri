/**
 * @author OLAMIRAUX
 * 
 * Long note is array with [begin, end]
 */
define(["danoni/sequencer2"], function(Sequencer) {
    return function() {
        module( "Sequencer Long Notes", {
            setup : function() {
                this.s = new Sequencer();
                this.s.sequences({ 0 : [200, 800, [1000, 1500]] });
                console.log('setup');
            }
        });

        test("available note with long note", function() {
            var result = this.s.availableNotes(0, 1000);
            // Long not must be available during all the time
            var resultAfterBegin = this.s.availableNotes(0, 1300);

            deepEqual(result, [[1000, 1500]], "AvailableNotes is ok");
            deepEqual(resultAfterBegin, [[1000, 1500]], "AvailableNotes after begin is ok");
        });
        
        test("hit and release for long notes", function() {
            var resultHit = this.s.hit(0, 1000);
            var resultRelease = this.s.release(0, 1500);
            
            ok(resultHit, "Hit is Ok");
            equal(resultRelease, "Ok", "Release is Ok");
        });

        test("Good Hit, Bad release", function(xx) {
            var resultHit = this.s.hit(0, 1000);
            var resultRelease = this.s.release(0, 1300);
            var available = this.s.availableNotes(0, 1301); 

            ok(resultHit, "Hit is Ok");
            equal(resultRelease, false, "Bad Release is Ok");
            deepEqual(available, [], "Long note no more available");
        });

        test("Release without good hit", function() {
            ok(!this.s.release(0,10), "release is ok");
        });

        test("heightNotes for long note", function() {
            var expected = { 0 : [[this.s.receptorHeight(), 160]] };
            deepEqual(this.s.heightNotes(1000), expected, "heightNotes is ok");
        });

        test("maxTime with long note", function() {
            equal(this.s.maxTime(), 1500, "maxTime is ok");
        });

        test("hasHoldNote", function() {
            this.s.hit(0, 1000);

            ok(this.s.hasHoldNote(0,1010), "hasHoldNote Ok");

            this.s.release(0, 1300);

            ok(!this.s.hasHoldNote(0,1310), "Not hasHoldNote Ok");
        });

        test("We can't hit multi time", function () {
            this.s.hit(0, 1000);
            ok(!this.s.hit(0, 1000), "can't hit multi time ok");
        });
        
    };
});
