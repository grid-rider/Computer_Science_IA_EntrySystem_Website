//The MenuItem object is imported for code maintainance
import MenuItem  from './menuItemObject';

/*
This function returns a MenuItem object that which is used in the Layout Provider to create
buttons to link to pages.
*/
export default function menuItems(isGraphAnalytics, isRowView, isRealtimeView){
    return ([
        MenuItem("Acess Table", "/dashboard/teacher/AcessTable", "table", isRowView),
        MenuItem("Graph Analytics", "/dashboard/teacher/GraphAnalytics", "graph", isGraphAnalytics),
        MenuItem("Station Table", "/dashboard/teacher/StationView", "spyGlass", isRealtimeView),
    ]);
}