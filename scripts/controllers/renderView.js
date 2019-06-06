define(['hbs!templates/nav'], function (template) {
    var $ = Framework7.$;

    function render(params) {
        $('.navCurrent').html(template({ m: "" }));
    }

    return {
        render: render
    };
});