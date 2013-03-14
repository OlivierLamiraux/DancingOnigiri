/**
 * @author Olivier Lamiraux
 */
define(function () {
    return function(options) {
        // Private
        var _ = this,
            options = options || {},
            screenHeight = options.height || 420,
            display = options.display || 1000,
            receptor = options.receptor || 50
            sequences = {},
            score = { boo : 0,
                      good : 0,
                      great :0,
                      perfect : 0,
                      marvelous : 0
                    };
            
        _.height = function(h) {
            if (h ===  undefined) return screenHeight;
            if (typeof h !== "number") throw "must be a number";
            if (h < 0) throw "must be greater than 0";
            
            screenHeight = h;
        };
        
        _.display = function(d) {
            if (d ===  undefined) return display;
            if (typeof d !== "number") throw "must be a number";
            if (d < 0) throw "must be greater than 0";
            
            display = d;
        };
        
        _.receptor = function(r) {
            if (r ===  undefined) return receptor;
            if (typeof r !== "number") throw "must be a number";
            if (r < 0) throw "must be greater than 0";
            if (r > screenHeight) throw "must be lower than height";
            
            receptor = r;
        };
        
        _.receptorRevert = function() {
            return screenHeight - receptor;
        };
        
        _.receptorHeight = function() {
            return screenHeight - receptor;
        };

        _.receptorTime = function() {
            return (screenHeight - receptor) / screenHeight * display;  
        };

        _.sequences = function(seq) {
            if (seq ===  undefined) return sequences;

            sequences = seq;
        };

        // Return all notes available for display
        _.heightNotes = function(time) {
            var prop, i,
                begin = time + _.receptorTime(),
                end = time - (display - _.receptorTime()),
                track, trackLength,
                result = {};

            for (lane in sequences) {
                if (sequences.hasOwnProperty(lane)) {
                    track = _.availableNotes(lane, time);
                    trackLength = track.length;
                    result[lane] = [];
                    for (i = 0; i < trackLength; i += 1) {
                        result[lane].push(timeToHeightRevert(track[i], time)); 
                    }
                }
            }

            return result;
        };

        var timeToHeightRevert = function (time, origin) {
            var relatif = time - origin;
            
            return _.receptorRevert() - ((relatif / _.receptorTime()) * _.receptorHeight());
        };
        
        _.hit = function (lane, time) {
            var track = _.availableNotes(lane, time, true),
                trackLength = track.length,
                i, timediff,
                result = void 0,
                boo = 180,
                good = 135,
                great = 102,
                perfect = 43,
                marvelous = 21.5;
            
            for (i = 0; i < trackLength; i += 1) {
                timeDiff = Math.abs(track[i].time - time);

                if (timeDiff <= marvelous) {
                    result = "Marvelous";
                    score.marvelous += 1;
                } else if (timeDiff <= perfect) {
                    result = "Perfect";
                    score.perfect += 1;
                } else if (timeDiff <= great) {
                    result = "Great";
                    score.great += 1;
                } else if (timeDiff <= good) {
                    result = "Good";
                    score.good += 1;
                } else if (timeDiff <= boo) {
                    result = "Boo";
                    score.boo += 1;
                }
                
                if (result !== void 0) {
                    sequences[lane].splice(track[i].index, 1);
                    return result;
                }
            }
            
            return false;
        };
        
        _.availableNotes = function (lane, time, hasIndex) {
            hasIndex = hasIndex || false;
            
            var i, result = [],
                begin = time + _.receptorTime(),
                end = time - (display - _.receptorTime()),
                track = sequences[lane],
                trackLength = track.length;
                
            for (i = 0; i < trackLength; i += 1) {
                if (track[i] >= end && track[i] <= begin) {
                    if (hasIndex) {
                        result.push( { time : track[i], index : i }); 
                    } else {
                        result.push(track[i]);
                    }
                    
                }
            }
            
            return result;
        }
    };
});
    
