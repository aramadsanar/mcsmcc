$(document).ready(loadCourseIntoView)

function loadCourseIntoView() {
    let course_id = window.location.href[window.location.href.length-1];
    console.log(course_id)
    $.ajax({
        url: 'http://127.0.0.1:5000/course_detail',
        method: 'POST',
        //data, just use dict!
        data: {
            'course_id': course_id
        },
        success: renderCourseData
    })
}

function renderCourseData(result) {
    let parsedJSON = JSON.parse(result);

    let courseView = $('#courseView');
    let mainCourseTitle = $('#mainCourseTitle');
    let courseTitle = $('#courseTitle');
    let courseDescription = $('#courseDescription');
    let courseVideoIframe = $('#courseVideoIframe');

    courseVideoIframe.attr('src', parsedJSON['link'])
    mainCourseTitle.html(parsedJSON['main_course_name']);
    courseTitle.html(parsedJSON['course_name']);
    courseDescription.html(parsedJSON['description'])
    

    courseView.listview('refresh');
}
