jQuery(document).ready( function($) {
    //console.log("getting here - document ready");
    var container = $('#loadCards');
    var pageNo = 1;
    var output = '';

    $.ajax({
        url: 'https://api.magicthegathering.io/v1/cards?type=creature&orderBy=name&contains=imageUrl&pageSize=20&page=' + pageNo,
        type: 'get',
        data: {'page': $(this).attr('href')},
        cache: false,
        success: function (json) {
            $.each(json, function (i, cardarr) {
                if (typeof cardarr == 'object') {

                    $.each(cardarr, function (i, card) {
                        //console.log(card);
                        output += '<div class="d-flex-row col-md-6">';
                        output += '<div class="card w-sm-50 w-md-100 mt-2 mb-2">';
                        output += '<div class="card-header">' + card.name + '</div>';
                        output += '<img class="card-img-top" src="' + card.imageUrl + '" alt="' + card.name + '">';
                        output += '<div class="card-body">';
                        output += '<h5 class="card-title">' + card.name + '</h5>';

                        // not all of these things will be present.
                        if (card.artist != '') {
                            output += '<p class="card-text cardnote">Artist: ' + card.artist + '</p>';
                        } else {
                            output += '<p class="card-text cardnote">Artist: anonymous</p>';
                        }


                        // if the card type is the same as it's original, just print one of these things
                        if (card.type != '' && card.originalType != '') {

                            if (card.type === card.originalType) {
                                output += '<p class="card-text">Type: ' + card.type + '<br/>';
                            } else {
                                output += '<p class="card-text">Type: ' + card.type + '<br/>';
                                output += '<span class="cad-text cardnote">(Original Type: ' + card.originalType + ')</span><br/>';
                            }
                        } else if (card.type === '') {
                            output += '<p class="card-text">Type: unknown<br/>';

                        } else if (card.originalType === '') {
                            output += '<span class="cad-text cardnote">(Original Type: unknown </span>';
                        }

                        output += 'Power: ' + card.power + '<br/>';
                        output += 'Set Name: ' + card.setName + '</p>';

                        output += '</div></div>';
                        output += '</div>';
                    })
                } else {
                    return false;
                }

            });

            // hide the loading image now that we're done loading
            //console.log('hiding loading img');
            container.hide();

            container.data('pagenum', pageNo);

            //console.log('pagenum is: ' + container.data('pagenum'));

            $('#magic_cards_grid').append(output)

            $(document).on('scroll', checkForBottom );

        }
    });



    function load_next_results() {
        //console.log("getting here - loading next results");

        //stop more from loading while we load these results
        $(document).off( 'scroll', checkForBottom );

        var container = $('#loadCards');
        var output = '';
        var pageNo = (container.data('pagenum') + 1);

        //console.log('pagenum is now: ' + pageNo);

        // show the loading container while we get the next results
        container.show();

        $.ajax({
            url: 'https://api.magicthegathering.io/v1/cards?type=creature&orderBy=name&contains=imageUrl&pageSize=20&page=' + pageNo,
            type: 'get',
            data: {'page': $(this).attr('href')},
            cache: false,
            success: function (json) {
                $.each(json, function (i, cardarr) {
                    if (typeof cardarr == 'object') {

                        $.each(cardarr, function (i, card) {
                            //console.log(card);
                            output += '<div class="d-flex-row col-md-6">';
                            output += '<div class="card w-sm-50 w-md-100 mt-2 mb-2">';
                            output += '<div class="card-header">' + card.name + '</div>';
                            output += '<img class="card-img-top" src="' + card.imageUrl + '" alt="' + card.name + '">';
                            output += '<div class="card-body">';
                            output += '<h5 class="card-title">' + card.name + '</h5>';

                            // not all of these things will be present.
                            if (card.artist != '') {
                                output += '<p class="card-text cardnote">Artist: ' + card.artist + '</p>';
                            } else {
                                output += '<p class="card-text cardnote">Artist: anonymous</p>';
                            }


                            // if the card type is the same as it's original, just print one of these things
                            if (card.type != '' && card.originalType != '') {

                                if (card.type === card.originalType) {
                                    output += '<p class="card-text">Type: ' + card.type + '<br/>';
                                } else {
                                    output += '<p class="card-text">Type: ' + card.type + '<br/>';
                                    output += '<span class="cad-text cardnote">(Original Type: ' + card.originalType + ')</span><br/>';
                                }
                            } else if (card.type === '') {
                                output += '<p class="card-text">Type: unknown<br/>';

                            } else if (card.originalType === '') {
                                output += '<span class="cad-text cardnote">(Original Type: unknown </span>';
                            }

                            output += 'Power: ' + card.power + '<br/>';
                            output += 'Set Name: ' + card.setName + '</p>';

                            output += '</div></div>';
                            output += '</div>';
                        })
                    } else {
                        return false;
                    }

                });

                // hide the loading image now that we're done loading
                //console.log('hiding loading img');
                container.hide();

                // set the page number so we can get the next page next time
                container.data('pagenum', pageNo);
                //console.log('testing - pagenum is: ' + container.data('pagenum') );

                // add the next set of results
                $('#magic_cards_grid').append(output);

            }


        });

        // re-bind the scroll listener so we can load another page after this one
        $(document).on('scroll', checkForBottom );
    }


    function checkForBottom() {

        // Load the next set of results when we're almost at the bottom of the window:
        if (($(window).scrollTop() + $(window).height() + 10 ) >= $(document).height()) {
            //console.log('at the bottom!');
            load_next_results();
        }
    }

});

