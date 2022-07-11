import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { useRecoilState } from 'recoil';
import { authAtom } from '../state/auth';
import { AuthenticationService } from '../api/auth/authService';
import { BsThreeDotsVertical, BsFillPersonFill } from 'react-icons/bs';
import { RiLogoutCircleRLine } from 'react-icons/ri';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [ client ] = useRecoilState(authAtom);

  const handleLogOut = () => {
    AuthenticationService.logout()
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
          
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            Bongritic Admin view
          <Flex display={{ base: 'none', md: 'flex' }} ml={5}>
            { client && <DesktopNav /> }
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 1 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>

          <ColorModeSwitcher justifySelf="flex-end" />
          { client && (
            <>
              <Flex justifyContent="center" mt={4}>
                <Popover placement="bottom" isLazy>
                  <PopoverTrigger>
                    <IconButton
                      aria-label="More server options"
                      icon={<BsThreeDotsVertical />}
                      variant="solid"
                      w="fit-content"
                    />
                  </PopoverTrigger>
                  <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                    <PopoverArrow />
                    <PopoverBody>
                      <Stack>
                        <Button
                          w="194px"
                          variant="ghost"
                          rightIcon={<BsFillPersonFill />}
                          justifyContent="space-between"
                          fontWeight="normal"
                          fontSize="sm"
                          as="a"
                          href={`/critic/reviews?name=${client.name}&email=${client.email}`}>
                          Profile
                        </Button>
                        <Button
                          w="194px"
                          variant="ghost"
                          rightIcon={<RiLogoutCircleRLine />}
                          justifyContent="space-between"
                          fontWeight="normal"
                          fontSize="sm"
                          onClick={handleLogOut}>
                          Sign out
                        </Button>
                      </Stack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            </>
          )}
          {!client && (
            <>
              <Button
                as={'a'}
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
                href={'/login'}>
                Sign In
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {client && <MobileNav /> }
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.400', 'green.400');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'green.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'green.900'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      { NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
  },
  {
    label: 'Critic reviews',
    href: '/reviews/critics',
  },
  {
    label: 'Reviewers',
    children: [
      {
        label: 'View reviewers',
        subLabel: 'See and if needed, block reviewers',
        href: '/critics/view',
      },
      {
        label: 'Registration requests',
        subLabel: 'Approve or deny reviwer registration requests',
        href: '/critics/view/registration',
      },
      {
        label: 'Comment approval',
        subLabel: 'See and approve or deny reviewer comments',
        href: '/critics/comment/approval',
      },
    ],
  },
  {
    label: 'Users',
    children: [
      {
        label: 'View users',
        subLabel: 'See and if needed, block users',
        href: '/users/view',
      },
      {
        label: 'Flaged comments',
        subLabel: 'See and manage flaged user comments',
        href: '/users/flagged/comments',
      },
    ],
  },
  {
    label: 'Statistics',
    href: '/statistics',
  },
];