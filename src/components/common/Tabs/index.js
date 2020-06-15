/* @flow */
import * as React from 'react';
import Nav from 'reactstrap/es/Nav';
import NavItem from 'reactstrap/es/NavItem';
import NavLink from 'reactstrap/es/NavLink';
import TabContent from 'reactstrap/es/TabContent';
import TabPane from 'reactstrap/es/TabPane';

export type Tab = {
  title: string,

  component: React.Node,
};

export type Props = {
  tabs: Array<Tab>,

  activeTab?: string,

  onChange?: (activeTab: string) => void,
};

const Tabs = (props: Props): React.Node => {
  const { tabs, activeTab, onChange } = props;

  const [active, setActive] = React.useState(activeTab || '0');

  const toggle = (tabId: string) => {
    if (active !== tabId) setActive(tabId);
  };

  return (
    <>
      <Nav tabs>
        {tabs.map((tab, i) => (
          <NavItem key={i}>
            <NavLink
              className='cursor-pointer'
              active={active === String(i)}
              onClick={() => {
                toggle(String(i));

                if (onChange) onChange(String(i));
              }}>
              {tab.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={active}>
        {tabs.map((tab, i) => (
          <TabPane tabId={String(i)} key={i}>
            {tab.component}
          </TabPane>
        ))}
      </TabContent>
    </>
  );
};

export default Tabs;
