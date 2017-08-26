$(document).ready(function(){
    $('.delete-article').on('click',function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');

        $.ajax({
            type:'DELETE',
            url:'/articles/' + id,
            success: function(response){
                console.log('Deleting article' + id);
                window.location.href='/';
            },
            error:function(err){
                console.log(err);
            }
        });
    });
});