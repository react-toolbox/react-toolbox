import React from 'react';
import { AppBar, Checkbox, Dropdown, IconButton, RadioGroup, RadioButton } from '../../components';
import { Layout, NavDrawer, Panel, Sidebar } from '../../components';

const dummyText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

const drawerItems = dummyText.split(/\s/).map(function (word, index) {
    return (<li key={index}>{word}</li>);
});

const sidebarWidths = [
    { value: 4, label: '4 incr' },
    { value: 5, label: '5 incr' },
    { value: 6, label: '6 incr' },
    { value: 7, label: '7 incr' },
    { value: 8, label: '8 incr' },
    { value: 9, label: '9 incr' },
    { value: 10, label: '10 incr' },
    { value: 25, label: '25%'},
    { value: 33, label: '33%'},
    { value: 50, label: '50%'},
    { value: 66, label: '66%'},
    { value: 75, label: '75%'}
];

class LayoutTest extends React.Component {

    state = {
        permanentAt: 'lg',
        drawerOpen: false,
        drawerPinned: false,
        sidebarPinned: false,
        sidebarWidth: 5,
        loremIpsums: 1
    };

    toggleDrawer = (event) => {
        event.stopPropagation();
        this.setState({ drawerOpen: !this.state.drawerOpen });
    };

    toggleDrawerPinned = () => {
        this.setState({ drawerPinned: !this.state.drawerPinned });
    };

    changeDrawerPermanentAt = (value) => {
        this.setState({ permanentAt: value });
    };

    toggleSidebar = (value) => {
        this.setState({ sidebarPinned: (value === true) });
    };

    changeSidebarWidth = (value) => {
        this.setState({ sidebarWidth: value });
    };

    fewer = (event) => {
        event.preventDefault();
        this.setState({ loremIpsums: Math.max(0, this.state.loremIpsums - 1) });
    };

    more = (event) => {
        event.preventDefault();
        this.setState({ loremIpsums: this.state.loremIpsums + 1 });
    };

    render () {

        const rng = Array.from(new Array(this.state.loremIpsums), (x, i) => i);

        return (
            <section>
                <h5>Layout</h5>
                <div style={{ width: '100%', height: '60rem', margin: '1.8rem 0' }}>
                    <Layout>
                        <NavDrawer active={this.state.drawerOpen} pinned={this.state.drawerPinned} permanentAt={this.state.permanentAt} onOverlayClick={this.toggleDrawer}>
                          <AppBar title='Drawer'/>
                            <ul style={{ listStyle: 'none', overflowY: 'auto', flex: 1, padding: '1.6rem' }}>
                                {drawerItems}
                            </ul>
                        </NavDrawer>
                        <Panel>
                            <AppBar leftIcon='menu' onLeftIconClick={this.toggleDrawer}/>
                            <div style={{ flex: 1, overflowY: 'auto' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <section style={{ margin: '1.8rem'}}>
                                        <h5>NavDrawer State</h5>
                                        <p>Drawer becomes permanent when window is....</p>
                                        <RadioGroup name='permanentAt' value={this.state.permanentAt} onChange={this.changeDrawerPermanentAt}>
                                          <RadioButton label='Small' value='sm'/>
                                          <RadioButton label='Medium' value='md' />
                                          <RadioButton label='Large' value='lg' />
                                          <RadioButton label='Extra Large' value='xl' />
                                          <RadioButton label='Never' value={undefined} />
                                        </RadioGroup>
                                        <Checkbox label='Pin drawer' checked={this.state.drawerPinned} onChange={this.toggleDrawerPinned} />
                                    </section>

                                    <section style={{ margin: '1.8rem'}}>
                                        <h5>Sidebar State</h5>
                                        <RadioGroup name='sidebarPinned' value={this.state.sidebarPinned} onChange={this.toggleSidebar}>
                                            <RadioButton label='Pinned' value />
                                            <RadioButton label='Unpinned' value={false} />
                                        </RadioGroup>
                                        <h5>Sidebar Width</h5>
                                            <Dropdown
                                                auto
                                                onChange={this.changeSidebarWidth}
                                                source={sidebarWidths}
                                                value={this.state.sidebarWidth}
                                              />
                                    </section>
                                </div>

                                <section style={{ margin: '1.8rem' }}>
                                    <h5>Scrollable Content</h5>
                                    <p>
                                        The center pane should scroll independently from
                                        the sides. Show
                                        [<a href='#' onClick={this.fewer}>-</a>]
                                        {`${this.state.loremIpsums}`}
                                        [<a href='#' onClick={this.more}>+</a>] paragraph(s) below this one.
                                    </p>
                                    {rng.map((x, i) => <p key={i}>{dummyText}</p>)}
                                </section>
                            </div>
                        </Panel>
                        <Sidebar pinned={this.state.sidebarPinned} width={Number(this.state.sidebarWidth)}>
                            <div><IconButton icon='close' onClick={this.toggleSidebar}/></div>
                            <div style={{ flex: 1, margin: '1.8rem' }}>
                                <h5>Sidebar</h5>
                                <p>
                                    Sidebar content should be secondary to the main content on a page.
                                </p>
                                <p>
                                    The width of the sidebar can be set either in <em>increments</em>
                                    (where 1 increment = height of the app bar) or in percentages.
                                </p>
                                <p>
                                    As per the spec, the right sidebar expands to cover the entire
                                    screen at small screen sizes.
                                </p>
                            </div>
                        </Sidebar>
                    </Layout>
                </div>
            </section>
        );
    }
}

export default LayoutTest;
