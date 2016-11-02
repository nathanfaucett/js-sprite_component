var tape = require("tape"),
    sceneGraph = require("@nathanfaucett/scene_graph"),
    transformComponents = require("@nathanfaucett/transform_components"),
    sprite = require("..");


var Scene = sceneGraph.Scene,
    Entity = sceneGraph.Entity,
    Transform3D = transformComponents.Transform3D,
    Sprite = sprite.Sprite;


tape("Sprite", function(assert) {
    var scene = Scene.create(),
        transform = Transform3D.create(),
        sprite = Sprite.create(),
        entity = Entity.create().addComponent(transform, sprite),
        manager;

    scene.addEntity(entity);
    manager = scene.getComponentManager("sprite.Sprite");

    scene.init();

    assert.equals(sprite.layer, 0);

    assert.end();
});