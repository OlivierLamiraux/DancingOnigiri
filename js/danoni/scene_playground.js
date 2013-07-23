/**
 * @author Olivier Lamiraux
 */
define(["danoni/sequencer", "text!datas/sequencesTest.json"], function (Sequencer, seqJson) {
    return function (Q) {

        var laneX = [25, 70, 120, 170, 215],
            seqToLane = {
                left: 0,
                down: 1,
                onigiri: 2,
                up: 3,
                right: 4
            },
            arrows = [],
            keyReady = {
                up: true,
                down: true,
                left: true,
                right: true,
                fire: true
            };

        Q.scene("playground", function (stage, options) {
            var S = new Sequencer({
                height: Q.height
            }),
            sequences = JSON.parse(seqJson);
            // Init Sequences
            S.sequences(sequences);

            stage.insert(new Q.Background());
            createReceptors(stage, S.receptorRevert());

            var tempTimer = 0;
            stage.on("step", function (dt) {
                var currentTime = (tempTimer += dt * 90),
                    laneHit = false,
                    resultHit = false;

                // TODO Remove this Loop
                if (currentTime - 500 > S.maxTime()) {
                    tempTimer = 500;
                }

                destroyAllArrow();
                createArrows(stage, S.heightNotes(currentTime));


                keyboard(stage, S, currentTime, "left", "left");
                keyboard(stage, S, currentTime, "down", "down");
                keyboard(stage, S, currentTime, "fire", "onigiri");
                keyboard(stage, S, currentTime, "up", "up");
                keyboard(stage, S, currentTime, "right", "right");
            });
        });

        var keyboard = function (stage, s, currentTime, key, lane) {
            if (Q.inputs[key] && keyReady[key]) {
                resultHit = s.hit(lane, currentTime);
                if (resultHit && resultHit != "Boo") {
                    createHitArrow(stage, seqToLane[lane], s.receptorRevert());
                }
                keyReady[key] = false;
            } else if (!Q.inputs[key]) {
                s.release(lane, currentTime);
                keyReady[key] = true;
            }
        };

        var destroyAllArrow = function () {
            var i, arrowsLength = arrows.length;
            for (i = 0; i < arrowsLength; i += 1) {
                arrows[i].destroy();
            }
            arrows = [];
        };

        var createArrows = function (stage, notesList) {
            var i;
            motesLeft = notesList["left"],
            notesRight = notesList["right"],
            notesDown = notesList["down"],
            notesUp = notesList["up"],
            notesOrigini = notesList["onigiri"],
            motesLeftLength = motesLeft.length,
            motesRightLength = notesRight.length,
            motesDownLength = notesDown.length,
            motesUpLength = notesUp.length,
            motesOriginiLength = notesOrigini.length;

            for (i = 0; i < motesLeftLength; i += 1) {
                createArrow(stage, 0, motesLeft[i]);
            }
            for (i = 0; i < motesRightLength; i += 1) {
                createArrow(stage, 4, notesRight[i]);
            }
            for (i = 0; i < motesDownLength; i += 1) {
                createArrow(stage, 1, notesDown[i]);
            }
            for (i = 0; i < motesUpLength; i += 1) {
                createArrow(stage, 3, notesUp[i]);
            }
            for (i = 0; i < motesOriginiLength; i += 1) {
                createArrow(stage, 2, notesOrigini[i]);
            }
        };


        var createArrow = function (stage, lane, note) {
            var isLongNote = Array.isArray(note);

            if (isLongNote) {
                createLongArrow(stage, lane, note);
            } else {
                createSimpleArrow(stage, lane, note);
            }
        };

        var createLongArrow = function (stage, lane, y) {
            var propsBegin = {
                x: laneX[lane],
                y: y[0]
            },
                propsEnd = {
                    x: laneX[lane],
                    y: y[1]
                },
                propsBar = {
                    x: laneX[lane],
                    y: y[1] + ((y[0] - y[1]) / 2),
                    h: y[1] - y[0],
                    w: 30
                };

            switch (lane) {
                case 0:
                    propsBar.color = "red";
                    arrows.push(stage.insert(new Q.Bar(propsBar)));
                    arrows.push(stage.insert(new Q.ArrowLeft(propsBegin)));
                    arrows.push(stage.insert(new Q.ArrowLeft(propsEnd)));
                    break;
                case 1:
                    propsBar.color = "green";
                    arrows.push(stage.insert(new Q.Bar(propsBar)));
                    arrows.push(stage.insert(new Q.ArrowDown(propsBegin)));
                    arrows.push(stage.insert(new Q.ArrowDown(propsEnd)));
                    break;
                case 2:
                    propsBar.color = "yellow";
                    arrows.push(stage.insert(new Q.Bar(propsBar)));
                    arrows.push(stage.insert(new Q.Origini(propsBegin)));
                    arrows.push(stage.insert(new Q.Origini(propsEnd)));
                    break;
                case 3:
                    propsBar.color = "green";
                    arrows.push(stage.insert(new Q.Bar(propsBar)));
                    arrows.push(stage.insert(new Q.ArrowUp(propsBegin)));
                    arrows.push(stage.insert(new Q.ArrowUp(propsEnd)));
                    break;
                case 4:
                    propsBar.color = "red";
                    arrows.push(stage.insert(new Q.Bar(propsBar)));
                    arrows.push(stage.insert(new Q.ArrowRight(propsBegin)));
                    arrows.push(stage.insert(new Q.ArrowRight(propsEnd)));
                    break;
            }

        };

        var createSimpleArrow = function (stage, lane, y) {
            var props = {
                x: laneX[lane],
                y: y
            };

            switch (lane) {
                case 0:
                    arrows.push(stage.insert(new Q.ArrowLeft(props)));
                    break;
                case 1:
                    arrows.push(stage.insert(new Q.ArrowDown(props)));
                    break;
                case 2:
                    arrows.push(stage.insert(new Q.Origini(props)));
                    break;
                case 3:
                    arrows.push(stage.insert(new Q.ArrowUp(props)));
                    break;
                case 4:
                    arrows.push(stage.insert(new Q.ArrowRight(props)));
                    break;
            }
        };

        var createHitArrow = function (stage, lane, y) {
            var props = {
                x: laneX[lane],
                y: y
            };

            switch (lane) {
                case 0:
                    props.angle = 90;
                    stage.insert(new Q.ArrowReceptorLeftHit(props));
                    break;
                case 1:
                    stage.insert(new Q.ArrowReceptorLeftHit(props));
                    break;
                case 2:
                    stage.insert(new Q.OnigiriHit(props));
                    break;
                case 3:
                    props.angle = 180;
                    stage.insert(new Q.ArrowReceptorLeftHit(props));
                    break;
                case 4:
                    props.angle = -90;
                    stage.insert(new Q.ArrowReceptorLeftHit(props));
                    break;
            }
        };

        var createReceptors = function (stage, receptorY) {
            var ry = receptorY || Q.height - 50,
                x = 50,
                options = function (pos) {
                    return {
                        x: laneX[pos],
                        y: ry
                    };
                };

            stage.insert(new Q.ArrowReceptorLeft(options(0)));
            stage.insert(new Q.ArrowReceptorDown(options(1)));
            stage.insert(new Q.OnigiriReceptor(options(2)));
            stage.insert(new Q.ArrowReceptorUp(options(3)));
            stage.insert(new Q.ArrowReceptorRight(options(4)));
        };
    };
});
