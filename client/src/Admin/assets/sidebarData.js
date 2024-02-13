// Import the icons you need
import { SpaceDashboard, Person, Logout, CloudUpload } from '@mui/icons-material';


export const sidebarData = [
    {
        "title": "Main",
        "items": [
            {
                "icon": <SpaceDashboard />,
                "text": "Dashboard",
                "link": '/admin/dashboard'
            },
            {
                "icon": <Person />,
                "text": "Users",
                "link": "/admin/dashboard/users"
            },
            {
                "icon": <CloudUpload />,
                "text": "Upload Movies",
                "link": "/admin/dashboard/upload"
            }
        ]
    },
    {
        "title": "User",
        "items": [
            {
                "icon": <Logout />,
                "text": "Logout",
                "link": "/admin/login"
            }
        ]
    }

]
