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

    // EDIT handler
    $('.change-item').on('click', function (e){
        // get item data
        let itemId = e.target.getAttribute('data-itemId');
        let title = $(this).parent().parent().find('.card-title').text();
        let description = $(this).parent().parent().find('.description').text();
        // set data to form
        $('form[name="edit-item-form"] input[name="id"]').val(itemId);
        $('form[name="edit-item-form"] input[name="title"]').val(title);
        $('form[name="edit-item-form"] textarea[name="description"]').val(description);
    })

}


