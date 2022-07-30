window.onload = () => {
    // CREATE  handler
    $('#create-quest').on('submit', function (e){
        e.preventDefault();
        let formData = new FormData(this);

        $.ajax({
            method:'POST',
            url:'/quests/create/',
            data:{
                title:formData.get('title'),
                description:formData.get('description')
            },
            success: function(response){
                window.location = '/quests';
            },error: function(err){
                console.log(err);
            }
        })
    })

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
        $('#edit-item-form input[name="id"]').val(itemId);
        $('#edit-item-form input[name="title"]').val(title);
        $('#edit-item-form textarea[name="description"]').val(description);
    })

    // EDIT form handler
    $('#edit-item-form').on('submit', function (e){
        e.preventDefault();
        let formData = new FormData(this);

        $.ajax({
            method:'POST',
            url:'/quests/edit/',
            data:{
                id:formData.get('id'),
                title:formData.get('title'),
                description:formData.get('description')
            },
            success: function(response){
                window.location = '/quests';
            },error: function(err){
                console.log(err);
            }
        })
    })
}


