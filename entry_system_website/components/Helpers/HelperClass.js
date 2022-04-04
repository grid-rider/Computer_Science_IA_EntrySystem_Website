import { VscGraphLine } from 'react-icons/vsc';
import { ViewIcon,} from '@chakra-ui/icons';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineTable, AiOutlineMonitor } from 'react-icons/ai';

//Helper class provides functions that are used to improve code maintaince and to simplify code 
export default class HelperClass{
    /**
     * This Function is used to make readability in layout file better by providing
     * function that returns appropriate icon from request. 
     * @param  {string} iconType - This is used to link the icon request with correct icon
     * @returns {jsx} - Icon 
    */
    static getIconFromType(iconType) {
        //using switch statement to cycle between options 
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

    /**
     * This function returns a MenuItem object that which is used in the Layout Provider to create
     * buttons to link to pages.
     * @param  {string} title - Name of button that is used for this link button
     * @param  {string} href - Link to page 
     * @param  {string} iconType - Icon type of icon function above
     * @param  {boolean} isActive - Is the background of the button highlighted to show active page
     * @returns {MenuItem Object} 
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
    /**
     * This function uses the above MenuItem object to create elements for the layout side bar.
     * @param  {boolean} isGraphAnalytics - is the graph analytics page selected 
     * @param  {boolean} isAcessTable - is the access table  page selected 
     * @param  {boolean} isStationTable - is the station table  page selected 
     * @returns {[MenuItem]} - function returns array of menuItem objects
    */
    static menuItems(isGraphAnalytics, isAcessTable, isStationTable){
        return ([
            this.MenuItem("Acess Table", "/teacher/AcessTable", "table", isAcessTable),
            this.MenuItem("Graph Analytics", "/teacher/GraphAnalytics", "graph", isGraphAnalytics),
            this.MenuItem("Station Table", "/teacher/StationTable", "spyGlass", isStationTable),
        ]);
    }
    /**
     * @param  {Date} - javasceript data object passed 
     * @return {string} - string in the form DD.MM.YYYY
     */
    static getParsedDate(date){
        return(date.getDate() + "." + (date.getMonth()+1) +"." + date.getFullYear());
    }
    /**
     * @param  {Date} - javasceript data object passed 
     * @return {string} - string in the form Hours:Minutes
     */
    static getParsedTime(date){
        return(date.getHours() + ":" + date.getMinutes());
    }

}






