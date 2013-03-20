/**
 * @author Olivier Lamiraux
 */
define(function () {
    return function(options) {
        options = options || {};
        // Private
        var _ = this,
            screenHeight = options.height || 420,
            display = options.display || 1000,
            receptor = options.receptor || 50,
            sequences = {},
            currentLongNotes = {},
            maxTime = 0,
            score = { boo : 0,
                      good : 0,
                      great :0,
                      perfect : 0,
                      marvelous : 0,
                      miss : 0
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
            var i, lane, track, trackLength, time = 0;
             
            if (seq ===  undefined) return sequences;

            sequences = seq;
            for (lane in sequences) {
                if (sequences.hasOwnProperty(lane)) {
                    track = sequences[lane];
                    trackLength = track.length;
                    for (i = 0; i < trackLength; i += 1) {
                        if (Array.isArray(track[i])) {
                            time = track[i][1];
                        } else {
                            time = track[i];
                        }

                        if (time > maxTime) {
                            maxTime = time;
                        }
                    }
                }
            }
        };

        // Return all notes available for display
        _.heightNotes = function(time) {
            var prop, i, lane,
                begin = time + _.receptorTime(),
                end = time - (display - _.receptorTime()),
                track, trackLength, isLongNote = false,
                result = {};

            for (lane in sequences) {
                if (sequences.hasOwnProperty(lane)) {
                    track = _.availableNotes(lane, time);
                    trackLength = track.length;
                    result[lane] = [];
                    for (i = 0; i < trackLength; i += 1) {
                        isLongNote = Array.isArray(track[i]);
                        if (isLongNote) {
                            result[lane].push([
                                timeToHeightRevert(track[i][0], time),
                                timeToHeightRevert(track[i][1], time)
                                ]);
                        } else {
                            result[lane].push(timeToHeightRevert(track[i], time));
                        }
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
                i, timediff, isLongNote = false,
                result = void 0,
                boo = 180,
                good = 135,
                great = 102,
                perfect = 43,
                marvelous = 21.5;
            
            if (_.hasHoldNote(lane, time)) return false;
            for (i = 0; i < trackLength; i += 1) {
                isLongNote = Array.isArray(track[i].time);
                if (isLongNote) {
                    timeDiff = Math.abs(track[i].time[0] - time);
                } else {
                    timeDiff = Math.abs(track[i].time - time);
                }

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
               
                // If hit have a result we remove the note
                if (result !== void 0 && !isLongNote) {
                    sequences[lane].splice(track[i].index, 1);
                }

                if (result !== void 0 && isLongNote) {
                    currentLongNotes[lane] = track[i].time;
                }

                if (result !== void 0) {
                    return result;
                }
            }
            
            return false;
        };

        _.release = function (lane, time) {
            var track = sequences[lane],
                trackLength = track.length,
                l = currentLongNotes[lane],
                i;

            if (l === void 0) return false;

            for (i = 0; i < trackLength; i += 1) {
                if (Array.isArray(track[i]) && 
                    (track[i][0] === l[0] && track[i][1] === l[1])) {
                    
                    sequences[lane].splice(i, 1);
                }
            }

            if (l[1] <= time) {
                return "Ok";
            }
            currentLongNotes[lane] = void 0;
            return false;
        };
        
        _.availableNotes = function (lane, time, hasIndex) {
            hasIndex = hasIndex || false;
            
            var i, result = [],
                begin = time + _.receptorTime(),
                end = time - (display - _.receptorTime()),
                track = sequences[lane],
                trackLength = track.length,
                isRegularNoteOk = false, 
                isLongNoteOk = false;
                
            for (i = 0; i < trackLength; i += 1) {
                isRegularNoteOk = track[i] >= end && track[i] <= begin;
                isLongNoteOk = Array.isArray(track[i]) 
                            && (  track[i][0] >= end && track[i][0] <= begin 
                               || track[i][1] >= end && track[i][1] <= begin);

                if (isRegularNoteOk || isLongNoteOk) {
                    if (hasIndex) {
                        result.push( { time : track[i], index : i }); 
                    } else {
                        result.push(track[i]);
                    }
                    
                }
            }
            
            return result;
        };
        
        _.maxTime = function() {
            return maxTime;
        };

        _.hasHoldNote = function(lane, time) {
            if (currentLongNotes[lane] === void 0) return false;
            if (currentLongNotes[lane][0] <= time && currentLongNotes[lane][1] >= time) {
                return true;
            }
            return false;
        };

        _.checkMiss = function(time) {
            var i, lane, track, trackLength,
                recordIndex = [];

            for (lane in sequences) {
                if (sequences.hasOwnProperty(lane)) {
                    track = sequences[lane];
                    trackLength = track.length;
                    for (i = 0; i < trackLength; i += 1) {
                        if (track[i] < time + 180) { // 180 = Boo TODO variable de class
                            track.splice(i, 1);
                            score.miss += 1;
                            i = -1;
                        }
                    }
                }
            }
        };

        _.score = function(type) {
            return score[type] || 0;
        };

    };
});
    
