/**
 * Copyright (c) 2008 The Open Planning Project
 */


Ext.namespace("Styler");

Styler.SliderTip = Ext.extend(Ext.Tip, {

    /**
     * Property: hover
     * {Boolean} Display the tip when hovering over the thumb.  If false, tip
     *     will only be displayed while dragging.  Default is true.
     */
    hover: true,

    /**
     * Property: dragging
     * {Boolean} The thumb is currently being dragged.
     */
    dragging: false,

    minWidth: 10,
    offsets : [0, -10],
    init : function(slider){
        slider.on('dragstart', this.onSlide, this);
        slider.on('drag', this.onSlide, this);
        slider.on('dragend', this.hide, this);
        slider.on('destroy', this.destroy, this);
        if(this.hover) {
            slider.on('render', this.registerThumbListeners, this);
        }
        this.slider = slider;
    },

    registerThumbListeners: function() {
        this.slider.thumb.on({
            "mouseover": function() {
                this.onSlide(this.slider);
                this.dragging = false;
            },
            "mouseout": function() {
                if(!this.dragging) {
                    this.hide.apply(this, arguments);
                }
            },
            scope: this
        });
    },

    onSlide : function(slider) {
        this.dragging = true;
        this.show();
        this.body.update(this.getText(slider));
        this.doAutoWidth();
        this.el.alignTo(slider.thumb, 'b-t?', this.offsets);
    },

    getText : function(slider) {
        return slider.getValue();
    }
});
