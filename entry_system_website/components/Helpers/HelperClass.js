import { VscGraphLine } from 'react-icons/vsc';
import { ViewIcon,} from '@chakra-ui/icons';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineTable, AiOutlineMonitor } from 'react-icons/ai';

export default class HelperClass{
    
    static getIconFromType(iconType) {
        switch (iconType) {
            case "graph":
                return <VscGraphLine/>
            case "eye":
                return <ViewIcon/>
            case "profile":
                return <CgProfile/>
            case "spyGlass":
                return <AiOutlineMonitor/>
            case "table":
                return <AiOutlineTable/>
        }
    }


    /*
    This function returns a MenuItem object that which is used in the Layout Provider to create
    buttons to link to pages.
    */
    static menuItems(isGraphAnalytics, isRowView, isRealtimeView){
        return ([
            this.MenuItem("Acess Table", "/dashboard/teacher/AcessTable", "table", isRowView),
            this.MenuItem("Graph Analytics", "/dashboard/teacher/GraphAnalytics", "graph", isGraphAnalytics),
            this.MenuItem("Station Table", "/dashboard/teacher/StationView", "spyGlass", isRealtimeView),
        ]);
    }

    /*
    This function returns a MenuItem object that which is used in the Layout Provider to create
    buttons to link to pages.
    */
    static MenuItem(title,href,iconType, isActive) {
        return({
            title: title,
            href: href,
            iconType: iconType,
            isActive: isActive
            }
        )
    }
}