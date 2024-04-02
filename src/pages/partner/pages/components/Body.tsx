import React, { useState } from 'react'
import Menu from './Menu';
import { Outlet } from 'react-router-dom';

export default function Body() {
    const [menus, setMenus] = useState<{
        title: string;
        link: string;
    }[]>([
        {
            title: "Thông Tin Shop",
            link: ""
        },
        {
            title: "Create Hotel",
            link: ""
        },
        {
            title: "Danh mục",
            link: ""
        },
    ])
    return (
        <div className='admin_body'>
            <div className='menu'>
                <Menu></Menu>
            </div>
            <div className='content'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
