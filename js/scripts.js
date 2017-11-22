$(".navbar .dropdown").on("show.bs.dropdown", function() {
    $(this).find("span.fa").removeClass("fa-angle-down");
    $(this).find("span.fa").addClass("fa-angle-up");
});

$(".navbar .dropdown").on("hidden.bs.dropdown", function() {
    $(this).find("span.fa").removeClass("fa-angle-up");
    $(this).find("span.fa").addClass("fa-angle-down");
});
