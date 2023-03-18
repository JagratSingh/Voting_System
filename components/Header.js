import React, {Component} from 'react';
import { Menu} from 'semantic-ui-react';
import vote from './/image/Vote5.png';
import finger from './/image/finger.png';
import Image from 'next/image';
import {Link} from '../routes';

class Header extends Component {
    render() {
        return (
            //class="ui top aligned tiny image"
            <Menu style={{ marginTop: "10px" }}>
                <Menu.Item>  
                        <Image src={vote} height='50' width='50' verticalAlign='middle'/>
                    <Link route="/voting-sytem">
                        <span style={{marginLeft: '10px', fontWeight:'bold', color:'#2E8BC0', fontSize:'17px'}}>Voting System</span>
                    </Link>
                </Menu.Item>

                <Menu.Item position='right'>
                    <Image src={finger} height='60' width='128'/>
                </Menu.Item>
            </Menu>
        );
    }
}

export default Header;