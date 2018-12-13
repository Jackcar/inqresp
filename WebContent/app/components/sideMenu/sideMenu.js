var showMenu = "";
var hideMenu = "";
var menuisopen = "";

function startMenu() {
    $("#sidemenu").css("display", "none");
    $.get("sideMenu.html", function (data) {
        $("body").prepend(data);
        $("body").prepend("<div style = 'display: none;' class = 'click-avoid'></div>");
        $("#infoIcon").css("padding-left", "3%");
        //---------------
        $("#sidemenudismiss").bind("tap", function () {
            hideMenu();
        });

        $(".click-avoid").bind("tap", function () {
            hideMenu();
        });

        showMenu = function () {
            $("#sidemenu").show();
            $(".click-avoid").show();
            $("#sidemenu").animate({
                left: "0px"
            }, 250);

            $(".click-avoid").animate({
                opacity: 0.3,
                width: "100%"
            }, 0, function () {
            });
        }

        hideMenu = function () {

            $("#sidemenu").animate({
                left: "-240px"
            }, 250);


            $(".click-avoid").animate({
                opacity: 0.0,
                width: "0%"
            }, 250, function () {
                $(".click-avoid").hide();
            });
        }

        menuisopen = function () {
            if ($("#sidemenu").css("left") == "0px")
                return true;
            else
                return false;
        }

        jQuery.sap.require("sap.m.MessageBox");

        $("#sdeskmenubutton").bind("tap", function () {
            hideMenu();
            sap.m.MessageBox.show("", sap.m.MessageBox.Icon.INFORMATION, "Service Desk", [sap.m.MessageBox.Action.OK], function () { });
            $(".sapMDialogScrollCont").html("<img src = 'assets/img/SPLogo.png' style = 'display: block; margin-right: auto; margin-left: auto; height: auto; width: 50%' ><center >" +
                "<h3>Contact Service Desk</h3>" +
                "<center><a style = 'color: blue;' href = 'tel:3065662013'>306-566-2013</a></center>" +
                "<center><a style = 'color: blue;' href = 'mailto:servicedesk@saskpower.com'>servicedesk@saskpower.com</a></center>" +
                "</center>");
        });

        $("#infomenubutton").bind("tap", function () {
            hideMenu();
            global.onAppInfo();
        });
    });
}

startMenu();