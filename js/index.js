
class Creation {
    constructor() {
        'use strict';

        //Déclaration des variables de filtre
        let filter_tank = {
            0 : false,
            1 : "tank"
        };
        let filter_dps = {
            0 : false,
            1 : "dps"
        };
        let filter_support = {
            0 : false,
            1 : "support"
        };
        let filter = {
            0 : false,
            1 : ""
        };

        //Fonctions de click sur les filtres
        $('#tank').click(function(){
            if(filter_tank[0] === false) {
                filter_tank[0] = true;
                filter_dps[0] = false;
                filter_support[0] = false;
            }
            else{filter_tank[0] = false;}
            filter[0] = filter_tank[0];
            filter[1] = filter_tank[1];
            main();
        });
        $('#dps').click(function(){
            if(filter_dps[0] === false) {
                filter_tank[0] = false;
                filter_dps[0] = true;
                filter_support[0] = false;
            }
            else{filter_dps[0] = false;}
            filter[0] = filter_dps[0];
            filter[1] = filter_dps[1];
            main();
        });
        $('#support').click(function(){
            if(filter_support[0] === false) {
                filter_tank[0] = false;
                filter_dps[0] = false;
                filter_support[0] = true;
            }
            else{filter_support[0] = false;}
            filter[0] = filter_support[0];
            filter[1] = filter_support[1];
            main();
        });

        //Fonction écrivant dans le json pour changer la popularitée
        let changePopularity = function(name, popularity){
            $.ajax({
                url: '/php/rate.php',
                method: 'post',
                data: {
                    popularity:popularity,
                    name:name
                }
            });
            $('#popularity').empty();
            $('#popularity').html('Popularity : ' + popularity);
        };


        //Fonction affichant la liste des éléments et definissant ce qu'il faut afficher en cas de click
        let displaywarframe = function(key, data){
            $('.photos').append(
                $('<div />').append(
                    $('<div class="subtitle"/>')
                    .html(data[key].name),
                    $('<img class="profilimg"/>')
                    .attr({
                        'src' : 'https://n9e5v4d8.ssl.hwcdn.net/uploads/' + data[key].image + '.png',
                    })
                    .click(function(){
                        $('#acceuil').fadeOut("slow");
                        $('#warframe').fadeIn("slow");
                        $('#return').fadeIn("slow");
                        $('#warframe').append(
                            $('<button class="switch" name="button" id="return">Back</button>\n')
                            .click(function () {
                                $('#warframe').fadeOut("slow");
                                $('#acceuil').fadeIn("slow");
                                $('#warframe').empty();
                            })
                        ).append(
                            $(
                                '<ul id="liste">\n' +
                                '<li id="warframename"class="title">' + data[key].name +'</li>\n'+
                                '<li><img id="warframeimg"class="profilimg" src="https://n9e5v4d8.ssl.hwcdn.net/uploads/' + data[key].image + '.png"/></li>\n' +
                                '<li class="subtitle">Health : '+data[key].health+'</li>\n' +
                                '<li class="subtitle">Shield : '+data[key].shield+'</li>\n' +
                                '<li class="subtitle">Armor : '+data[key].armor+'</li>\n' +
                                '<li class="subtitle">Energy : '+data[key].energy+'</li>\n' +
                                '</ul>'
                            ),
                            //Boutton affichant la description
                            $('<button class="switch">Description</button><br/> \n').click(function(){
                                $('#description').slideDown();
                            }),
                            $('<p class="subtitle" id="description" style="display:none">'+data[key].description+'</p>'),
                            $(
                                '<video autoplay="" loop="" muted="">'+
                                '<source src="//n9e5v4d8.ssl.hwcdn.net/uploads/warframes/videos/'+ data[key].name + '.webm" type="video/webm;codecs=&quot;vp8, vorbis&quot;">' +
                                '<source src="//n9e5v4d8.ssl.hwcdn.net/uploads/warframes/videos/'+ data[key].name + '.mp4" type="video/mp4;codecs=&quot;avc1.42E01E, mp4a.40.2&quot;">'+
                                '</video>\n'+
                                '<br/>'
                            )
                        ).append(
                            //Boutton rate déroulant le menu de notes
                            $('<button class="switch">Rate</button>\n').click(function(){
                                $.ajax({
                                    url: '/json/warframe.json',
                                    method: 'get',
                                }).done(function(data) {
                                    $('#popularity').empty();
                                    $('#popularity').html('Popularity : '+data[key].popularity);
                                }).fail(function() {
                                    $('body').html('Fatal Error');
                                });
                                $('#rate').slideDown();
                            }),
                            $('<div id="rate" style="display:none">').append(
                                $('<li id="popularity" class="subtitle" style="text-align:left"></li>\n'),

                                $('<button class="switch">1</button>\n').click(function(){
                                    changePopularity(data[key].name,1);
                                }),

                                $('<button class="switch">2</button>\n').click(function(){
                                    changePopularity(data[key].name,2);
                                }),

                                $('<button class="switch">3</button>\n').click(function(){
                                    changePopularity(data[key].name,3);
                                }),

                                $('<button class="switch">4</button>\n').click(function(){
                                    changePopularity(data[key].name,4);
                                }),

                                $('<button class="switch">5</button>\n').click(function(){
                                    changePopularity(data[key].name,5);
                                })
                            )
                        );
                    })
                )
            );
        };

        //Fonction créant la page d'affichage des warframes en fonction du filtre
        let createwarframe = function(filter, data){
            if (filter[0]===true){
                for (let key in data) {
                    if (data.hasOwnProperty(key) && data[key].class === filter[1] ) {
                        $('#filter').html(filter[1]);
                        displaywarframe(key, data);
                    }
                }
            }
            else {
                for (let key in data) {
                    $('#filter').html("No filter");
                    displaywarframe(key, data);
                }
            }
        };


        let main = function() {
            $.ajax({
                url: '/json/warframe.json',
                method: 'get',
            }).done(function(data) {
                $('.photos').empty();
                createwarframe(filter, data);
            }).fail(function() {
                $('body').html('Fatal Error');
            });
        };


        main();
    }
}

(function () {
    $(document).ready(function() {
        new Creation();
    });
}) ();
