define(["scripts/app/controllers/renderView"], function (renderView) {
   
    function render() {
        renderView.render();
    }
    return {
        render: render
    };
});