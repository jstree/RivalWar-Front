$(document).ready(function(){

    $("a[data-toggle='sns_share']").click(function(e){
        e.preventDefault();

        var _this = $(this);
        var sns_type = _this.attr('data-service');
        var href = current_url;
        var title = _this.attr('data-title');
        var loc = "";
        var img = $("meta[name='og:image']").attr('content');

        if( ! sns_type || !href || !title) return;

        if( sns_type == 'facebook' ) {
            loc = '//www.facebook.com/sharer/sharer.php?u='+href+'&t='+title;
        }
        else if ( sns_type == 'twitter' ) {
            loc = '//twitter.com/home?status='+encodeURIComponent(title)+' '+href;
        }
        else if ( sns_type == 'google' ) {
            loc = '//plus.google.com/share?url='+href;
        }
        else if ( sns_type == 'pinterest' ) {

            loc = '//www.pinterest.com/pin/create/button/?url='+href+'&media='+img+'&description='+encodeURIComponent(title);
        }
        else if ( sns_type == 'kakaostory') {
            loc = 'https://story.kakao.com/share?url='+encodeURIComponent(href);
        }
        else if ( sns_type == 'band' ) {
            loc = 'http://www.band.us/plugin/share?body='+encodeURIComponent(title)+'%0A'+encodeURIComponent(href);
        }
        else if ( sns_type == 'naver' ) {
            loc = "http://share.naver.com/web/shareView.nhn?url="+encodeURIComponent(href)+"&title="+encodeURIComponent(title);
        }
        else {
            return false;
        }

        window.open(loc);
        return false;
    });


});