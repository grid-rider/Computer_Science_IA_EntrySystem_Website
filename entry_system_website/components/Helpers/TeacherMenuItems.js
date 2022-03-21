import MenuItem  from './menuItemObject';


export default function menuItems(isGraphAnalytics, isRowView, isRealtimeView){
    return ([
        MenuItem("Row View", "/dashboard/teacher/RowView", "table", isRowView),
        MenuItem("Graph Analytics", "/dashboard/teacher/GraphAnalytics", "graph", isGraphAnalytics),
        MenuItem("Stations", "/dashboard/teacher/StationView", "spyGlass", isRealtimeView),
    ]);
}