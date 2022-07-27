window.onload = () => {

    // DELETE handler
    $('.delete-item').on('click', function (e){
        e.preventDefault();
        let itemId = e.target.getAttribute('data-itemId');

        $.ajax({
            type:'DELETE',
            url:'/quests/delete/',
            data:{id:itemId},
            success: function(response){
                window.location = '/quests';
            },error: function(err){
                console.log(err);
            }
        })
    })
}


