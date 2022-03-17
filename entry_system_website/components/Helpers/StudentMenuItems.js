import MenuItem  from './menuItemObject';


export default function menuItems(isProfileView, isStudentView){
    return ([
        MenuItem("Profile", "/dashboard/student/Profile", "profile", isProfileView),
        MenuItem("Student View", "/dashboard/student/StudentView", "eye", isStudentView),
    ]);
}