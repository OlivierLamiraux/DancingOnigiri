/**
 * @author Olivier Lamiraux
 */
/*global requirejs, require, window */
requirejs.config({
    paths: {
        datas: '../datas'
    },
    shim: {
        'quintus/quintus': {
            exports: 'Quintus'
        },
        'quintus/quintus_scenes': ['quintus/quintus'],
        'quintus/quintus_sprites': ['quintus/quintus'],
        'quintus/quintus_input': ['quintus/quintus'],
        'quintus/quintus_touch': ['quintus/quintus'],
        'quintus/quintus_ui': {
            deps: ['quintus/quintus', 'quintus/quintus_touch']
        }
    }
});


require(
    ["domReady!", "quintus/quintus",
        "danoni/sprites", "danoni/scene_playground",
        "quintus/quintus_scenes", "quintus/quintus_sprites", "quintus/quintus_input"
        ],

    function (doc, quintus, sprites, scenePlayground) {
        "use strict";
        var Q = quintus()
                .include("Sprites, Scenes, Input")
                .setup()
                .controls();

        // Init Quintus Sprites
        sprites(Q);

        // Init Quintus Scenes
        scenePlayground(Q);

        // Options for the game
        Q.danoniOptions = {
            receptorY: Q.height - 50
        };

        // Load Asset and launch the game
        Q.load(["arrow_down.png", "arrow_down_active.png",
            "arrow_down_green.png", "arrow_down_red.png",
            "onigiri.png", "onigiri_active.png", "onigiri_play.png"
            ], function () {

            //Q.stageScene("playground", {truc : 3});
            Q.stageScene("playground");
        });

        // For debug propose
        window.Q = Q;
    }
);
