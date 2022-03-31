/*
This function returns a MenuItem object that which is used in the Layout Provider to create
buttons to link to pages.
*/
export default function MenuItem(title,href,iconType, isActive) {
    return({
        title: title,
        href: href,
        iconType: iconType,
        isActive: isActive
        }
    )
}