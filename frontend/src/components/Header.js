import {
    Box,
    Button,
    Flex,
    Heading,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import {useState} from 'react';
import {HiMenu , HiShoppingBag , HiUser} from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import {Link as RouterLink , useNavigate} from 'react-router-dom';
import {logout} from '../actions/userActions'
import HeaderMenuItem from './HeaderMenuItem';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const [show , setShow] = useState(false);

    const userLogin = useSelector((state)=>state.userLogin);
    const {userInfo} = userLogin;

    const logoutHandler = () =>{
        dispatch(logout());
        navigate('/login');
    };


    return (
        <Flex
           as='header'
           align = 'center'
           justifyContent='space-between'
           wrap='wrap'
           py='6'
           px='6'
           bgColor = 'gray.800'
           w='100%'
           pos='fixed'
           top='0'
           left = '0'
           zIndex='999999'
        >
            {/* logo */}
            <Link as={RouterLink} to= '/'>

                <Heading
                   as='h1'
                   color = 'whiteAlpha.800'
                   size = 'md'
                   letterSpacing = 'wide'
                   fontWeight = 'bold'
                   textTransform = 'uppercase'
                
                >

                    UpTrend

                </Heading>
            
            </Link>

            {/* Hamburger */}

            <Box
              display = {{base:'block', md: 'none'}}
              onClick = {()=>setShow(!show)}
            >

            <Icon  
              as = {HiMenu}
              color = 'white' w='6' h='6'
            
            
            />

            </Box>

            {/* Menu */}

            <Box
               display = {{base: show? 'block':'none', md:'flex'}}
               width = {{base:'full',md:'auto'}}
               mt={{base:'3',md:'0'}} 
       
            >

            <HeaderMenuItem url='/cart' icon={HiShoppingBag}>
                 Cart

            </HeaderMenuItem>

            {userInfo ? (
                <Menu>
                    <MenuButton 
                        as={Button}
                        rightIcon={<IoChevronDown />}
                        _hover={{textDecor:'none', opacity : '0.7'}}
                    
                    >
                        {userInfo.name}
                    </MenuButton>

                    <MenuList>
                        <MenuItem as={RouterLink} to='/profile'>
                            Profile
                        
                        </MenuItem>

                        <MenuItem onClick = {logoutHandler}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            ) : (
                <HeaderMenuItem url='/login' icon={HiUser}>

                Login

            </HeaderMenuItem>
            )}

            {/* Admin Menu  */}
            {userInfo && userInfo.isAdmin &&(
                <Menu>
                <MenuButton
                    ml='3'
                    as={Button}
                    rightIcon={<IoChevronDown />}
                    _hover={{ textDecor: 'none', opacity: '0.7' }}>
                    Manage
                </MenuButton>
                <MenuList>
                    <MenuItem as={RouterLink} to='/admin/userlist'>
                        User List
                    </MenuItem>
                    <MenuItem as={RouterLink} to='/admin/productlist'>
                        Product List
                    </MenuItem>
                    <MenuItem as={RouterLink} to='/admin/orderlist'>
                        Order List
                    </MenuItem>
                </MenuList>
            </Menu>
        )}
            

           






            </Box>


        </Flex>
    );
};

export default Header;