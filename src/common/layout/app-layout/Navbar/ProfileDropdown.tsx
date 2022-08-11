// import { supabase } from 'src/lib/initSupabase';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

import { Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';

export const ProfileDropdown = () => {
  return (
    <>
      <Flex alignItems={'center'}>
        <Menu isLazy>
          <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'}>
            <Avatar
              size={'sm'}
              src={
                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
              }
            />
          </MenuButton>
          <MenuList>
            <MenuItem>Link 1</MenuItem>
            <MenuItem>Link 2</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => supabaseClient.auth.signOut()}>SignOut</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};
