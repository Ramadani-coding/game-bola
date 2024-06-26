const instructionSection = document.getElementById('instruction');
const closeBtn = document.getElementById('close');
const instructionBtn = document.getElementById('instruction-btn');

// Toggle the display of the instruction section
closeBtn.addEventListener('click', () => {
    instructionSection.style.display = instructionSection.style.display === 'block' ? 'none' : 'block';
});
instructionBtn.addEventListener('click', () => {
    instructionSection.style.display = 'block';
});

$('.select ul li.option').click(function () {
    $(this).siblings().addBack().children().remove();
    var a = $(this).siblings().toggle();
    $(this).siblings().append('<img src="https://cdn4.iconfinder.com/data/icons/6x16-free-application-icons/16/Delete.png" style="float:right; width:12px; height:12px;">');
    $(this).parent().prepend(this); // Move the clicked element to the top
});
