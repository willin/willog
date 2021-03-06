Array.prototype.S = String.fromCharCode(2);
Array.prototype.in_array = function(e) {
    var r = new RegExp(this.S+e+this.S);
    return (r.test(this.S+this.join(this.S)+this.S));
};

jQuery(document).ready(function(w){
    if(typeof terms!='undefined'){
        w('#city option').each(function(i,d){
            if(terms.in_array(w(d).val())){
                w(d).attr('selected','selected');
                w('#city').next('div').children('.current').html(w(d).text());
            }
        });
        w('input[type=checkbox]').each(function(i,d){
            if(terms.in_array(w(d).val())){
                w(d).attr('checked','checked');
                w(d).next('span').addClass('checked');
            }
        });
    }

    w('#editor_switch a').click(function(){
        var editor_switch_li = w(this).parent('li');
        if(w(this).data('lang')!=w('#'+tinyMCE.activeEditor.id).data('lang')){
            w('#content_'+w('#'+tinyMCE.activeEditor.id).data('lang')).val(tinyMCE.activeEditor.getContent());
            w('#'+tinyMCE.activeEditor.id).data('lang',w(this).data('lang'));
            tinyMCE.activeEditor.setContent(w('#content_'+w(this).data('lang')).val());
            tinyMCE.activeEditor.nodeChanged();
            editor_switch_li.children('a').addClass('current').removeClass('secondary');
            editor_switch_li.siblings('li').children('a').addClass('secondary').removeClass('current');
        }
        return false;
    });

    w('#slug').blur(function(){
        if(w(this).val()!='' && w.trim(w(this).val())!=''){

            var post_id = 0;
            if(typeof w(this).data('id') != 'undefined')
                post_id = w(this).data('id');
            var msg_span = w(this).next('span');
            w.ajax({
                url:base_url+'admin/posts/slug/'+post_id+'/'+w.trim(w(this).val()),
                dataType:'json',
                type:'get',
                success:function(j){
                    if(j.status=="0")
                    {
                        msg_span.addClass('error');
                    }
                    else
                    {
                        msg_span.removeClass('error');
                    }
               }
            });
        }
        return false;
    });

    w('#post_submit').click(function(){
        w('#content_'+w('#'+tinyMCE.activeEditor.id).data('lang')).val(tinyMCE.activeEditor.getContent());
        w.ajax({
            url:w('#post_form').attr('action'),
            type:w('#post_form').attr('method'),
            data:w('#post_form').serialize(),
            dataType:'json',
            success:function(j){
                if(j.status){
                    window.location=base_url+'/admin/posts';
                }else{
                    alert(j.msg);
                }
            }
        });
        return false;
    })

    loadScript();
    w('#search_place_button').click(function(){
        showAddress(w('#search_place').val());
    });
});

/*Google Maps*/
var map = null;
var geocoder = null;
var markersArray = [];


function initialize() {
    var mapOptions = {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    google.maps.event.addListener(map, 'click', function(e) {
        //console.log(e.latLng.lat()+" "+ e.latLng.lng());
        jQuery('#lat').val(e.latLng.lat().toFixed(6));
        jQuery('#lng').val(e.latLng.lng().toFixed(6));
        clearOverlays();
        createMarker(e.latLng);
    });
    // Try HTML5 geolocation
    if(jQuery('#lat').val() != '' && jQuery.trim(jQuery('#lat').val())!=''){
        var pos = new google.maps.LatLng(jQuery('#lat').val(),
            jQuery('#lng').val());

        map.setCenter(pos);
    }else{
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                    position.coords.longitude);
                jQuery('#lat').val(position.coords.latitude.toFixed(6));
                jQuery('#lng').val(position.coords.longitude.toFixed(6));
                map.setCenter(pos);
            }, function() {
                handleNoGeolocation(true);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }
    }

    geocoder = new google.maps.Geocoder(map);
}

function showAddress(address) {
    if (geocoder) {
        request = new Object();
        request.address = address;
        geocoder.geocode(
            request,
            function(result,status){
                map.setCenter(result[0].geometry.location, 15);
                callback(result,status);
            }
        );
    }
}

function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(32.060255, 118.796877),
        content: content
    };

    //var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}


function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://maps.googleapis.com/maps/api/js?sensor=true&' +
        'callback=initialize';
    document.body.appendChild(script);
}

function callback(results, status) {
    if (status == 'OK') {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i].geometry.location);
        }
    }
}

function createMarker(latLng) {
    var marker = new google.maps.Marker({
        map: map,
        position: latLng
    });
    markersArray.push(marker);
}
