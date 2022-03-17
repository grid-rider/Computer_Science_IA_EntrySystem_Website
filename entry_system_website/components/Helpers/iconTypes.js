import { VscGraphLine } from 'react-icons/vsc';
import { ViewIcon,} from '@chakra-ui/icons';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineTable, AiOutlineMonitor } from 'react-icons/ai';

export default function getIconFromType(iconType) {
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