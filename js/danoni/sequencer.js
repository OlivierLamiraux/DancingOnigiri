/**
 * @author Olivier Lamiraux
 */
/*global define */
define(function () {
    "use strict";
    return function (options) {
        options = options || {};
        // Private
        var $ = this,
            screenHeight = options.height || 420,
            display = options.display || 1000,
            receptor = options.receptor || 50,
            sequences = {},
            currentLongNotes = {},
            missedLongNotes = {},
            maxTime = 0,
            score = {
                boo: 0,
                good: 0,
                great: 0,
                perfect: 0,
                marvelous: 0,
                miss: 0
            };

        function timeToHeightRevert(time, origin) {
            var relatif = time - origin;

            return $.receptorRevert() - ((relatif / $.receptorTime()) * $.receptorHeight());
        }

        function isLongNote(note) {
            return Array.isArray(note);
        }

        $.height = function (h) {
            if (h === undefined) { return screenHeight; }
            if (typeof h !== "number") { throw "must be a number"; }
            if (h < 0) { throw "must be greater than 0"; }

            screenHeight = h;
        };

        $.display = function (d) {
            if (d === undefined) { return display; }
            if (typeof d !== "number") { throw "must be a number"; }
            if (d < 0) { throw "must be greater than 0"; }

            display = d;
        };

        $.receptor = function (r) {
            if (r === undefined) { return receptor; }
            if (typeof r !== "number") { throw "must be a number"; }
            if (r < 0) { throw "must be greater than 0"; }
            if (r > screenHeight) { throw "must be lower than height"; }

            receptor = r;
        };

        $.receptorRevert = function () {
            return screenHeight - receptor;
        };

        $.receptorHeight = function () {
            return screenHeight - receptor;
        };

        $.receptorTime = function () {
            return (screenHeight - receptor) / screenHeight * display;
        };

        $.sequences = function (seq) {
            var i, lane, track, trackLength, time = 0;

            if (seq === undefined) { return sequences; }

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
        $.heightNotes = function (time) {
            var i,
                lane,
                begin = time + $.receptorTime(),
                end = time - (display - $.receptorTime()),
                track,
                trackLength,
                isLongNote = false,
                result = {};

            for (lane in sequences) {
                if (sequences.hasOwnProperty(lane)) {
                    track = $.availableNotes(lane, time);
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

        $.missedHeightLongNotes = function (time) {
            var lane,
                track,
                trackLength,
                i,
                result = {},
                begin = time + $.receptorTime(),
                end = time - (display - $.receptorTime());

            for (lane in missedLongNotes) {
                if (missedLongNotes.hasOwnProperty(lane)) {
                    track = missedLongNotes[lane];
                    trackLength = track.length;
                    result[lane] = [];
                    for (i = 0; i < trackLength; i += 1) {
                        if ((track[i][0] >= end && track[i][0] <= begin)
                                || (track[i][1] >= end && track[i][1] <= begin)) {
                            result[lane].push([
                                timeToHeightRevert(track[i][0], time),
                                timeToHeightRevert(track[i][1], time)
                            ]);
                        }
                    }
                }
            }
            return result;

        };

        $.hit = function (lane, time) {
            var track = $.availableNotes(lane, time, true),
                trackLength = track.length,
                i,
                timeDiff,
                isLongNote = false,
                result,
                boo = 180,
                good = 135,
                great = 102,
                perfect = 43,
                marvelous = 21.5;

            if ($.hasHoldNote(lane, time)) {
                return false;
            }

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
                if (result !== undefined && isLongNote === false) {
                    sequences[lane].splice(track[i].index, 1);
                }

                if (result !== undefined && isLongNote === true) {
                    currentLongNotes[lane] = track[i].time;
                }

                if (result !== undefined) {
                    return result;
                }
            }

            return false;
        };

        $.release = function (lane, time) {
            var track = sequences[lane],
                trackLength = track.length,
                longNote = currentLongNotes[lane],
                i;

            if (longNote === undefined) {
                return false;
            }

            for (i = 0; i < trackLength; i += 1) {
                if (Array.isArray(track[i]) &&
                        (
                            track[i][0] === longNote[0] &&
                            track[i][1] === longNote[1]
                        )) {

                    sequences[lane].splice(i, 1);
                }
            }

            if (longNote[1] <= time) {
                return "Ok";
            }
            currentLongNotes[lane] = undefined;
            return false;
        };

        $.availableNotes = function (lane, time, hasIndex) {
            hasIndex = hasIndex || false;

            var i, result = [],
                begin = time + $.receptorTime(),
                end = time - (display - $.receptorTime()),
                track = sequences[lane],
                trackLength = track.length,
                isRegularNoteOk = false,
                isLongNoteOk = false;

            for (i = 0; i < trackLength; i += 1) {
                isRegularNoteOk = track[i] >= end && track[i] <= begin;
                isLongNoteOk = isLongNote(track[i])
                                && ((track[i][0] >= end && track[i][0] <= begin)
                                        || (track[i][1] >= end && track[i][1] <= begin));

                if (isRegularNoteOk || isLongNoteOk) {
                    if (hasIndex) {
                        result.push({
                            time: track[i],
                            index: i
                        });
                    } else {
                        result.push(track[i]);
                    }

                }
            }

            return result;
        };

        $.maxTime = function () {
            return maxTime;
        };

        $.hasHoldNote = function (lane, time) {
            var longNote = currentLongNotes[lane];
            if (longNote === undefined) {
                return false;
            }

            return longNote[0] <= time && longNote[1] >= time;
        };

        $.checkMiss = function (time) {
            var i,
                lane,
                track,
                trackLength,
                isMissed,
                recordIndex = [];

            time = time + 180; // 180 = Boo TODO variable de class
            for (lane in sequences) {
                if (sequences.hasOwnProperty(lane)) {
                    track = sequences[lane];
                    trackLength = track.length;
                    for (i = 0; i < trackLength; i += 1) {
                        isMissed = false;
                        if (isLongNote(track[i]) && track[i][1] < time) {
                            isMissed = true;
                            missedLongNotes[lane] = missedLongNotes[lane] || [];
                            missedLongNotes[lane].push(track[i]);
                        } else if (track[i] < time) {
                            isMissed = true;
                        }

                        if (isMissed) {
                            track.splice(i, 1);
                            score.miss += 1;
                            i = -1;
                        }
                    }
                }
            }
        };

        $.score = function (type) {
            return score[type] || 0;
        };
    };
});
