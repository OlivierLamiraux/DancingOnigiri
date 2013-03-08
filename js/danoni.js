/**
 * @author Olivier Lamiraux
 */
requirejs.config({
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
     "danoni/sprites", "danoni/scenes",
     "quintus/quintus_scenes", "quintus/quintus_sprites", "quintus/quintus_input"], 

function(doc, Quintus, sprites, scenes) {
    var Q = Quintus()                         
              .include("Sprites, Scenes, Input") 
              .setup()                           
              .controls();
    
    // Init Quintus Sprites
    sprites(Q);
    
    // Init Quintus Scenes
    scenes(Q);
    
    // Load Asset and launch the game
    Q.load(["arrow_down.png","arrow_down_active.png",
            "arrow_down_green.png","arrow_down_red.png",
            "onigiri.png","onigiri_active.png", "onigiri_play.png"], function() {

        Q.stageScene("test");
    });
});
