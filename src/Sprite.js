var isNumber = require("@nathanfaucett/is_number"),
    isNullOrUndefined = require("@nathanfaucett/is_null_or_undefined"),
    sceneGraph = require("@nathanfaucett/scene_graph"),
    SpriteManager = require("./SpriteManager");


var Component = sceneGraph.Component,
    ComponentPrototype = Component.prototype,
    SpritePrototype;


module.exports = Sprite;


function Sprite() {

    Component.call(this);

    this.visible = true;

    this.layer = 0;
    this.z = 0;

    this.alpha = 1;

    this.material = null;

    this.width = 1;
    this.height = 1;

    this.x = 0;
    this.y = 0;

    this.w = 1;
    this.h = 1;
}
Component.extend(Sprite, "sprite.Sprite", SpriteManager);
SpritePrototype = Sprite.prototype;

SpritePrototype.construct = function(options) {

    ComponentPrototype.construct.call(this);

    if (options) {
        this.visible = isNullOrUndefined(options.visible) ? true : !!options.visible;

        this.layer = isNumber(options.layer) ? (options.layer < 0 ? 0 : options.layer) : 0;
        this.z = isNumber(options.z) ? options.z : 0;

        this.alpha = isNullOrUndefined(options.alpha) ? 1 : options.alpha;

        this.material = isNullOrUndefined(options.material) ? null : options.material;

        this.width = isNumber(options.width) ? options.width : 1;
        this.height = isNumber(options.height) ? options.height : 1;

        this.x = isNumber(options.x) ? options.x : 0;
        this.y = isNumber(options.y) ? options.y : 0;
        this.w = isNumber(options.w) ? options.w : 1;
        this.h = isNumber(options.h) ? options.h : 1;
    }

    return this;
};

SpritePrototype.destructor = function() {

    ComponentPrototype.destructor.call(this);

    this.visible = true;

    this.layer = 0;
    this.z = 0;

    this.alpha = 1;

    this.material = null;

    this.width = 1;
    this.height = 1;

    this.x = 0;
    this.y = 0;
    this.w = 1;
    this.h = 1;

    return this;
};

SpritePrototype.setLayer = function(layer) {
    var manager = this.manager;

    if (manager) {
        layer = isNumber(layer) ? (layer < 0 ? 0 : layer) : this.layer;

        if (layer !== this.layer) {
            manager.removeComponent(this);
            this.layer = layer;
            manager.addComponent(this);
            manager.setLayerAsDirty(layer);
        }
    } else {
        this.layer = isNumber(layer) ? (layer < 0 ? 0 : layer) : this.layer;
    }

    return this;
};

SpritePrototype.setZ = function(z) {
    var manager = this.manager;

    if (manager) {
        z = isNumber(z) ? z : this.z;

        if (z !== this.z) {
            this.z = z;
            manager.setLayerAsDirty(this.layer);
        }
    } else {
        this.z = isNumber(z) ? z : this.z;
    }

    return this;
};

SpritePrototype.setMaterial = function(material) {
    this.material = material;
    return this;
};