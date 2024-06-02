import React from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem,} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (

      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/app/reservas" className="text-decoration-none" style={{ color: 'inherit' }}>
            HOME
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/app/reservas" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">RESERVAS</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/app/crear" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus">NUEVA RESERVA</CDBSidebarMenuItem>
              </NavLink> 
             <NavLink exact to="/app/usuarios" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">USUARIOS</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>

  );
};

export default Sidebar;