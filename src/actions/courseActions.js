import * as types from '../actions/actionTypes';
import courseApi from '../api/mockCourseApi';
export function loadCoursesSuccess(courses)
{
	//return {type: ‘CREATE_COURSE’ , course};  //type property is required on any action, I can have as much property as I want , course (course = course) as in ES6 if I write course it will match the right side with the left side
    //console.log(courses);
	return {type: types.LOAD_COURSES_SUCCESS , courses};
}
export function createCourseSuccess(course){
    return {type: types.CREATE_COURSE_SUCCESS , course};
}
export function updateCourseSuccess(course){
    return {type: types.UPDATE_COURSE_SUCCESS , course};
}
export function loadCourses()
{
    return function(dispatch)
    {
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {throw(error);});
    };
}
 
/*
export function saveCourse(course)
{
    return function(dispatch,getState){
        return courseApi.saveCourse(course).then(saveCourse => {
            course.id?dispatch(updateCourseSuccess(saveCourse)):dispatch(createCourseSuccess(SavedCourse));
        }).catch(error=>{
            throw(error);
        });        
    };
}*/